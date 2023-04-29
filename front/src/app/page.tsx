const fetchScholarData = async () => {
  const response = await fetch(new URL('/api/back/', process.env.API_ORIGIN).href);
  const data: { [key: string]: string }[] = await response.json();
  return data
}

export default async function Home() {
  const scholarData = await fetchScholarData();
  return (
    <>
      <input type="text" placeholder="検索ワード" />
      <select name="対象" id="target">
        <option value="all"></option>
        <option value="B1">学士1年</option>
      </select>
      {
        scholarData.map((scholarColumn) => (
          <>
            <ul key={scholarColumn['団体名']}>
              {
                Object.keys(scholarColumn).map((key) => <li key={key}>{key}: {scholarColumn[key]}</li>)
              }
              <li>Google URL: <a href={`https://www.google.com/search?q=${scholarColumn['団体名']}`} target="_blank" rel="noopener noreferrer">{scholarColumn['団体名']}</a></li>
            </ul>
            <hr />
          </>
        ))
      }
    </>
  )
}
