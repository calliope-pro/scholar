import * as cheerio from 'cheerio';

export type ScholarDataType = {
    '団体名': string;
    '備考': string;
    '対象者': string[];
    '推薦人数': string;
    '月額': string;
    '他奨学金との重複': string;
    '学内選考申請締切': string;
    'p対象者': string[];
    'p推薦人数': number | null;
    'p年額': number | null;
    'p他奨学金との重複': 'o' | 'x' | '?';
    'p学内選考申請締切': string;
};

function parseGradeMini(target: string, grade: string): string[] {
    const numbers: number[] = [];
    let interpolation = false;

    for (let i = 0; i < target.length; i++) {
        if (/\d/.test(target[i])) {
            numbers.push(parseInt(target[i]));
        } else if (target[i] === '~') {
            interpolation = true;
        }
    }

    if (interpolation && numbers.length >= 2) {
        const start = numbers[0];
        const end = numbers[numbers.length - 1];
        numbers.length = 0;
        for (let i = start; i <= end; i++) {
            numbers.push(i);
        }
    }

    return numbers.map(num => `${grade}${num}`);
}

function parseGrade(results: Record<string, string>, query: string): string[] {
    if (!(query in results)) {
        return [];
    }

    let target = results[query].normalize('NFKC');
    const targetSplit = target.split('、');
    targetSplit[targetSplit.length - 1] = targetSplit[targetSplit.length - 1].split('(')[0];

    const grades: string[] = [];

    for (const target of targetSplit) {
        if (target.includes('学士') || target.includes('学部')) {
            const tmpList = parseGradeMini(target, 'B');
            if (tmpList.length > 0) {
                grades.push(...tmpList);
            } else {
                grades.push('B1', 'B2', 'B3', 'B4');
            }
        } else if (target.includes('修士')) {
            const tmpList = parseGradeMini(target, 'M');
            if (tmpList.length > 0) {
                grades.push(...tmpList);
            } else {
                grades.push('M1', 'M2');
            }
        } else if (target.includes('博士')) {
            const tmpList = parseGradeMini(target, 'D');
            if (tmpList.length > 0) {
                grades.push(...tmpList);
            } else {
                grades.push('D1', 'D2', 'D3');
            }
        } else if (target.includes('大学院')) {
            const tmpList = parseGradeMini(target, '');
            if (tmpList.length > 0) {
                for (const num of tmpList) {
                    const numVal = parseInt(num);
                    if (numVal >= 1 && numVal <= 2) {
                        grades.push(`M${numVal}`);
                    } else {
                        grades.push(`D${numVal}`);
                    }
                }
            } else {
                grades.push('M1', 'M2', 'D1', 'D2', 'D3');
            }
        }
    }

    return grades;
}

function parsePeople(results: Record<string, string>, query: string): number | null {
    if (!(query in results)) {
        return null;
    }

    let target = results[query].normalize('NFKC').split('(')[0];

    if (target === '直接応募') {
        return null;
    } else if (target === '若干名') {
        return 3;
    } else {
        const matches = target.match(/\d+/g);
        return matches ? parseInt(matches[matches.length - 1]) : null;
    }
}

function parseAmount(results: Record<string, string>, query: string): number | null {
    if (!(query in results)) {
        return null;
    }

    let target = results[query]
        .normalize('NFKC')
        .replace(/,/g, '')
        .replace(/万/g, '0000')
        .replace(/千/g, '000')
        .replace(/百/g, '00');

    const amounts = target.match(/\d+円/g);
    if (!amounts) return null;

    if (amounts.length === 1) {
        const amount = parseInt(amounts[0].replace('円', ''));
        // 「年」「回」「一時」「一括」が含まれる場合は月額×12しない
        if (!target.includes('年') && !target.includes('回') && !target.includes('一時') && !target.includes('一括')) {
            return amount * 12;
        }
        return amount;
    }

    let minAmount = Math.min(...amounts.map(a => parseInt(a.replace('円', ''))));
    return target.includes('年') ? minAmount : minAmount * 12;
}

function parseDuplication(results: Record<string, string>, query: string): 'o' | 'x' | '?' {
    if (!(query in results)) {
        return '?';
    }

    const target = results[query].normalize('NFKC');

    // 「可」が含まれる場合は重複可
    if (target.includes('可')) return 'o';

    // 「不可」が含まれ、「可」が含まれない場合は重複不可
    if (target.includes('不可')) return 'x';

    return '?';
}

function parseDeadline(results: Record<string, string>, query: string): string {
    if (!(query in results)) {
        return '?';
    }

    const target = results[query].normalize('NFKC');
    const matches = target.match(/\d+/g);
    return matches ? matches.join('/') : '?';
}

function parseScholarships(rawData: Record<string, string>[]): ScholarDataType[] {
    return rawData.map((result) => {
        const parsed = { ...result } as any;

        parsed['p対象者'] = parseGrade(result, '対象者');
        parsed['p推薦人数'] = parsePeople(result, '推薦人数');
        parsed['p年額'] = parseAmount(result, '月額');
        parsed['p他奨学金との重複'] = parseDuplication(result, '他奨学金との重複');
        parsed['p学内選考申請締切'] = parseDeadline(result, '学内選考申請締切');

        return parsed as ScholarDataType;
    });
}

async function scrapeScholarships(): Promise<Record<string, string>[]> {
    const URL = 'https://www.titech.ac.jp/students/tuition/financial-aid/scholarships';
    const response = await fetch(URL);
    const html = await response.text();
    const $ = cheerio.load(html);

    const results: Record<string, string>[] = [];

    // より堅牢なセレクタ
    const tables = $('.scholarWrap > table.table_type06');

    tables.each((_, table) => {
        const scholarData: Record<string, string> = {};

        $(table).find('tr').each((_, tr) => {
            const cells = $(tr).children();
            // 最初のセルが空でない行のみ処理
            if (cells.length >= 2) {
                const key = $(cells[0]).text().trim();
                const value = $(cells[1]).text().trim();
                if (key) {
                    scholarData[key] = value;
                }
            }
            if (cells.length >= 4) {
                const key = $(cells[2]).text().trim();
                const value = $(cells[3]).text().trim();
                if (key) {
                    scholarData[key] = value;
                }
            }
        });

        // 「団体名」が含まれている場合のみ追加
        if (scholarData['団体名']) {
            results.push(scholarData);
        }
    });

    return results;
}

export async function getScholarshipData(): Promise<ScholarDataType[]> {
    try {
        const rawData = await scrapeScholarships();
        return parseScholarships(rawData);
    } catch (error) {
        console.error('Error fetching scholarships:', error);
        return [];
    }
}