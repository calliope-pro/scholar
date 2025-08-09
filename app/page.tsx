import type { ScholarDataType } from "./api/scholarships/route";
import HomeClient from "./HomeClient";

// ISRでデータ取得
async function getScholarshipData(): Promise<ScholarDataType[]> {
  const response = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/scholarships`, {
    next: { 
      revalidate: 3600 // 1時間ごとに再生成
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch scholarship data');
  }
  
  return response.json();
}

export default async function Home() {
  const initialScholarData = await getScholarshipData();

  return <HomeClient initialScholarData={initialScholarData} />;
}
