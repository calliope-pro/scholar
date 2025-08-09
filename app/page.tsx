import { getScholarshipData, type ScholarDataType } from "../lib/scholarships";
import HomeClient from "./HomeClient";

// ISR設定
export const revalidate = 3600; // 1時間ごとに再生成

export default async function Home() {
  const initialScholarData = await getScholarshipData();

  return <HomeClient initialScholarData={initialScholarData} />;
}
