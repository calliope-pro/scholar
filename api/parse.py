import re
from typing import Optional, Literal
import unicodedata

Duplication = Literal['o', 'x', '?']

# 2
def parse_grade_mini(target: str, grade: str) -> str:
    tmp_list = []
    bool_interpolation = False

    # search numeric
    for i in range(0, len(target)):
        if target[i].isnumeric() == True:
            tmp_list.append(int(target[i]))
        elif target[i] == "~":
            bool_interpolation = True

    # interpolation
    if bool_interpolation == True:
        new_tmp_list = []
        for i in range(tmp_list[0], tmp_list[-1] + 1):
            new_tmp_list.append(i)
        tmp_list = new_tmp_list

    # B1, ..., M1, ...
    for i in range(0, len(tmp_list)):
        tmp_list[i] = grade + str(tmp_list[i])

    return tmp_list


def parse_grade(results: dict[str, str], query: str) -> list[str]:
    if query not in results:
        return []
    target1 = results[query]
    grade = []
    # zenkaku to hankaku
    target1 = unicodedata.normalize("NFKC", target1)
    target_split = target1.split("、")

    # ()
    target_split[-1] = target_split[-1].split("(")[0]

    for target in target_split:
        # bachelor
        if "学士" in target or "学部" in target:
            tmp_list = parse_grade_mini(target, "B")
            if len(tmp_list) != 0:
                grade += tmp_list
            else:
                grade += ["B1", "B2", "B3", "B4"]

        # master
        elif "修士" in target:
            tmp_list = parse_grade_mini(target, "M")
            if len(tmp_list) != 0:
                grade += tmp_list
            else:
                grade += ["M1", "M2"]

        # doctor
        elif "博士" in target:
            tmp_list = parse_grade_mini(target, "D")
            if len(tmp_list) != 0:
                grade += tmp_list
            else:
                grade += ["D1", "D2", "D3"]

        # master + doctor
        elif "大学院" in target:
            tmp_list = parse_grade_mini(target, "")
            if len(tmp_list) != 0:
                for i in range(0, len(tmp_list)):
                    if 1 <= int(tmp_list[i]) <= 2:
                        grade.append("M" + tmp_list[i])
                    else:
                        grade.append("D" + tmp_list[i])
            else:
                grade += ["M1", "M2", "D1", "D2", "D3"]
    return grade


# 3
def parse_people(results: dict[str, str], query: str) -> Optional[int]:
    if query not in results:
        return None
    target1 = results[query]

    # zenkaku to hankaku
    target1 = unicodedata.normalize("NFKC", target1)
    target1 = target1.split("(")[0]

    if "直接応募" == target1:
        people = None
    elif "若干名" == target1:
        people = 3
    else:
        people = int(re.findall(r"\d+", target1)[-1])
    return people


# 5
def parse_amount(results: dict[str, str], query: str) -> Optional[int]:
    if query not in results:
        return None
    target1 = results[query]
    # zenkaku to hankaku
    target1 = unicodedata.normalize("NFKC", target1)

    # remove command
    target1 = target1.replace(",", "")

    # replace 万 to 0000
    target1 = target1.replace("万", "0000")
    target1 = target1.replace("千", "000")
    target1 = target1.replace("百", "00")

    amount = 0
    re_results: list[str] = re.findall(r"\d+円", target1)
    if len(re_results) == 1 and "年" not in target1:
        amount = int(re_results[0].strip("円")) * 12
    elif len(re_results) == 1 and (
        "年" in target1 or "一時金" in target1 or "一括支給" in target1
    ):
        amount = int(re_results[0].strip("円"))
    elif len(re_results) != 1:
        min_amount = 1000000000000
        for i in range(0, len(re_results)):
            if min_amount >= int(re_results[i].strip("円")):
                min_amount = int(re_results[i].strip("円"))
        if "年" not in target1:
            amount = min_amount * 12
        else:
            amount = min_amount
    return amount


# 7
def parse_duplication(results: dict[str, str], query: str) -> Duplication:
    if query not in results:
        return "?"
    # zenkaku to hankaku
    target1 = results[query]
    target1 = unicodedata.normalize("NFKC", target1)
    if target1 == "可":
        duplication = "o"
    elif target1 == "不可":
        duplication = "x"
    else:
        duplication = "?"
    return duplication


# 8
def parse_deadline(results: dict[str, str], query: str) -> str:
    if query not in results:
        return "?"
    target1 = results[query]
    # zenkaku to hankaku
    target1 = unicodedata.normalize("NFKC", target1)
    re_results = re.findall(r"\d+", target1)
    deadline = ""
    deadline = "/".join(re_results)
    return deadline


def parser(results: list[dict[str, str]]) -> list[dict]:
    """
    # Input
    1. 団体名
    2. 対象者(学年)
    3. 推薦人数
    4. 出願資格
    5. 月額
    6. 支給期間
    7. 他奨学金との重複
    8. 学内選考申請締切
    9. 備考

    # Change/Add
    2. B1, ..., M1, ..., D1, ...
    3. int
    5. int
    7. o/x/?
    8. 2023/4/13
    """

    new_results = []

    for i in range(0, len(results)):
        tmp_dict = results[i]

        # 2
        query = "対象者"
        new_query = "p対象者"
        tmp_dict[new_query] = parse_grade(results[i], query)

        # 3
        query = "推薦人数"
        new_query = "p推薦人数"
        tmp_dict[new_query] = parse_people(results[i], query)

        # 5
        query = "月額"
        new_query = "p年額"
        tmp_dict[new_query] = parse_amount(results[i], query)

        # 7
        query = "他奨学金との重複"
        new_query = "p他奨学金との重複"
        tmp_dict[new_query] = parse_duplication(results[i], query)

        # 8
        query = "学内選考申請締切"
        new_query = "p学内選考申請締切"
        tmp_dict[new_query] = parse_deadline(results[i], query)

        new_results.append(tmp_dict)
    return new_results
