import { NextResponse } from "next/server"

export async function GET() {
  const results: any = {
    timestamp: new Date().toISOString(),
    tests: [],
  }

  const serviceKey = process.env.SME_SERVICE_KEY
  
  if (!serviceKey) {
    return NextResponse.json({ error: "API 키 없음" })
  }

  const baseUrl = `https://apis.data.go.kr/1421000/mssBizService_v2/getbizList_v2?serviceKey=${serviceKey}&pageNo=1&numOfRows=3&startDate=20250101&endDate=20261231`

  // 테스트 1: 기본 호출
  try {
    const res1 = await fetch(baseUrl, { cache: "no-store" })
    const text1 = await res1.text()
    results.tests.push({
      name: "기본 호출",
      status: res1.status,
      contentType: res1.headers.get("content-type"),
      isXML: text1.includes("<response>"),
      preview: text1.substring(0, 300),
    })
  } catch (e: any) {
    results.tests.push({ name: "기본 호출", error: e.message })
  }

  // 테스트 2: User-Agent 추가
  try {
    const res2 = await fetch(baseUrl, { 
      cache: "no-store",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      }
    })
    const text2 = await res2.text()
    results.tests.push({
      name: "User-Agent 추가",
      status: res2.status,
      contentType: res2.headers.get("content-type"),
      isXML: text2.includes("<response>"),
      preview: text2.substring(0, 300),
    })
  } catch (e: any) {
    results.tests.push({ name: "User-Agent 추가", error: e.message })
  }

  // 테스트 3: Accept 헤더 변경
  try {
    const res3 = await fetch(baseUrl, { 
      cache: "no-store",
      headers: {
        "Accept": "application/xml, text/xml, */*",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      }
    })
    const text3 = await res3.text()
    results.tests.push({
      name: "Accept + User-Agent",
      status: res3.status,
      contentType: res3.headers.get("content-type"),
      isXML: text3.includes("<response>"),
      preview: text3.substring(0, 300),
    })
  } catch (e: any) {
    results.tests.push({ name: "Accept + User-Agent", error: e.message })
  }

  // 테스트 4: 전체 브라우저 헤더
  try {
    const res4 = await fetch(baseUrl, { 
      cache: "no-store",
      headers: {
        "Accept": "*/*",
        "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Referer": "https://www.data.go.kr/",
      }
    })
    const text4 = await res4.text()
    results.tests.push({
      name: "전체 브라우저 헤더",
      status: res4.status,
      contentType: res4.headers.get("content-type"),
      isXML: text4.includes("<response>"),
      preview: text4.substring(0, 500),
      success: text4.includes("<resultCode>00</resultCode>"),
    })

    // 성공 시 샘플 데이터 추출
    if (text4.includes("<resultCode>00</resultCode>")) {
      const titles = text4.match(/<title><!\[CDATA\[([^\]]+)\]\]><\/title>/g)
      if (titles) {
        results.sampleTitles = titles.slice(0, 3).map((t: string) => 
          t.replace(/<title><!\[CDATA\[/, "").replace(/\]\]><\/title>/, "")
        )
      }
      const totalMatch = text4.match(/<totalCount>(\d+)<\/totalCount>/)
      if (totalMatch) {
        results.totalCount = totalMatch[1]
      }
    }
  } catch (e: any) {
    results.tests.push({ name: "전체 브라우저 헤더", error: e.message })
  }

  return NextResponse.json(results, { status: 200 })
}