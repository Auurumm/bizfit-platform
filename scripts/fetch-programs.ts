// scripts/fetch-programs.ts
/**
 * 중소벤처기업부 지원사업 API 연동
 * https://apis.data.go.kr/1421000/mssBizService_v2
 * 
 * 사용법:
 * npm run fetch-programs
 */

import fs from 'fs'
import path from 'path'
import { parseString } from 'xml2js'
import dotenv from 'dotenv'

// .env.local 파일 로드
dotenv.config({ path: '.env.local' })

// 환경변수에서 API 키 로드
const API_KEY = process.env.MSS_API_KEY || process.env.GOVERNMENT_API_KEY

if (!API_KEY) {
  console.error('❌ API 키가 설정되지 않았습니다.')
  console.error('💡 .env.local 파일에 다음을 추가하세요:')
  console.error('   MSS_API_KEY=your_api_key_here')
  process.exit(1)
}

// API 설정
const API_CONFIG = {
  baseUrl: 'https://apis.data.go.kr/1421000/mssBizService_v2/getBizPbancList',
  params: {
    serviceKey: API_KEY,
    pageNo: 1,
    numOfRows: 100,
    resultType: 'xml',
  }
}

interface MssProgram {
  pbancSn?: string[]          // 공고일련번호
  pbancNm?: string[]          // 공고명
  pbancBgngYmd?: string[]     // 공고시작일자
  pbancEndYmd?: string[]      // 공고종료일자
  rceptBgngYmd?: string[]     // 접수시작일자
  rceptEndYmd?: string[]      // 접수종료일자
  atchFileNm?: string[]       // 첨부파일명
  pbancUrl?: string[]         // 공고URL
  pbancDtlCn?: string[]       // 공고상세내용
  instNm?: string[]           // 기관명
  bizPrpsCn?: string[]        // 사업목적내용
  sprtTrgtCn?: string[]       // 지원대상내용
  sprtCn?: string[]           // 지원내용
  [key: string]: any
}

/**
 * 중소벤처기업부 API 호출
 */
async function fetchFromMssAPI(): Promise<MssProgram[]> {
  try {
    console.log('🔄 중소벤처기업부 API 호출 중...')
    
    const params = new URLSearchParams({
      serviceKey: decodeURIComponent(API_CONFIG.params.serviceKey),
      pageNo: API_CONFIG.params.pageNo.toString(),
      numOfRows: API_CONFIG.params.numOfRows.toString(),
      resultType: API_CONFIG.params.resultType,
    })
    
    const url = `${API_CONFIG.baseUrl}?${params.toString()}`
    
    console.log(`📡 요청 URL: ${url.replace(API_KEY!, 'API_KEY_HIDDEN')}`)
    
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`API 호출 실패: ${response.status} ${response.statusText}`)
    }
    
    const xmlData = await response.text()
    
    // XML 파싱
    const result = await parseXMLString(xmlData)
    
    // API 응답 구조 확인
    const items = result?.response?.body?.[0]?.items?.[0]?.item || []
    
    if (items.length === 0) {
      console.warn('⚠️ 데이터가 없습니다. API 키나 파라미터를 확인하세요.')
      console.log('응답 데이터:', JSON.stringify(result, null, 2))
    } else {
      console.log(`✅ ${items.length}개의 지원사업을 가져왔습니다.`)
    }
    
    return items
  } catch (error) {
    console.error('❌ API 호출 실패:', error)
    throw error
  }
}

/**
 * XML 파싱 (Promise 래퍼)
 */
function parseXMLString(xmlData: string): Promise<any> {
  return new Promise((resolve, reject) => {
    parseString(xmlData, { explicitArray: true }, (err, result) => {
      if (err) reject(err)
      else resolve(result)
    })
  })
}

/**
 * API 데이터를 programs.xml 형식으로 변환
 */
function convertToXML(programs: MssProgram[]): string {
  const now = new Date().toISOString().split('T')[0]
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<!--
  정부 지원사업 데이터
  최종 업데이트: ${now}
  데이터 소스: 중소벤처기업부 API (공공데이터포털)
  자동 생성됨
-->
<programs lastUpdated="${now}" totalCount="${programs.length}">
`

  programs.forEach((program) => {
    const id = getString(program.pbancSn) || generateId()
    const title = getString(program.pbancNm) || '제목 없음'
    const organization = getString(program.instNm) || '중소벤처기업부'
    const description = getString(program.pbancDtlCn) || getString(program.bizPrpsCn) || '상세페이지 참조'
    const deadline = formatDate(getString(program.rceptEndYmd)) || '상시접수'
    const registrationDate = formatDate(getString(program.pbancBgngYmd)) || now
    const applicationUrl = getString(program.pbancUrl) || 'https://www.mss.go.kr'
    
    xml += `
  <program id="mss-${id}">
    <title>${escapeXML(title)}</title>
    <organization>${escapeXML(organization)}</organization>
    <ministry>중소벤처기업부</ministry>
    <category>${categorize(program)}</category>
    <budget>상세페이지 확인</budget>
    <deadline>${deadline}</deadline>
    <registrationDate>${registrationDate}</registrationDate>
    <description>${escapeXML(cleanText(description))}</description>
    <requirements>
      ${extractRequirements(program).map(req => `<item>${escapeXML(req)}</item>`).join('\n      ')}
    </requirements>
    <applicationUrl>${escapeXML(applicationUrl)}</applicationUrl>
    <contactInfo>${escapeXML(organization)}</contactInfo>
    <tags>
      ${extractTags(program).map(tag => `<tag>${escapeXML(tag)}</tag>`).join('\n      ')}
    </tags>
    <region>전국</region>
    <targetCompany>${extractTargetCompany(program)}</targetCompany>
    <supportType>종합지원</supportType>
    <matching>
      <businessTypes>${extractBusinessTypes(program)}</businessTypes>
      <industries>${extractIndustries(program)}</industries>
      <challenges>${extractChallenges(program)}</challenges>
      <goals>${extractGoals(program)}</goals>
    </matching>
  </program>
`
  })

  xml += '\n</programs>'
  
  return xml
}

/**
 * 배열에서 문자열 추출
 */
function getString(value: any): string {
  if (!value) return ''
  if (Array.isArray(value)) return value[0] || ''
  return String(value)
}

/**
 * 날짜 포맷 변환 (YYYYMMDD → YYYY-MM-DD)
 */
function formatDate(dateStr: string): string {
  if (!dateStr || dateStr.length !== 8) return dateStr
  return `${dateStr.substring(0, 4)}-${dateStr.substring(4, 6)}-${dateStr.substring(6, 8)}`
}

/**
 * XML 특수문자 이스케이프
 */
function escapeXML(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

/**
 * HTML 태그 제거 및 텍스트 정리
 */
function cleanText(text: string): string {
  return text
    .replace(/<[^>]*>/g, '') // HTML 태그 제거
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .substring(0, 500) // 최대 500자
}

/**
 * 카테고리 분류
 */
function categorize(program: MssProgram): string {
  const title = getString(program.pbancNm).toLowerCase()
  const desc = getString(program.bizPrpsCn).toLowerCase()
  const text = title + ' ' + desc
  
  if (text.includes('창업') && text.includes('청년')) return '청년창업'
  if (text.includes('창업')) return '창업지원'
  if (text.includes('r&d') || text.includes('연구개발')) return 'R&D지원'
  if (text.includes('수출') || text.includes('해외')) return '수출지원'
  if (text.includes('고용') || text.includes('채용')) return '고용지원'
  if (text.includes('ict') || text.includes('디지털')) return 'ICT지원'
  if (text.includes('제조') || text.includes('스마트공장')) return '제조업지원'
  if (text.includes('여성')) return '여성기업'
  if (text.includes('사회적')) return '사회적기업'
  if (text.includes('벤처')) return '벤처인증'
  
  return '기타지원'
}

/**
 * 요건 추출
 */
function extractRequirements(program: MssProgram): string[] {
  const reqs: string[] = []
  const target = cleanText(getString(program.sprtTrgtCn))
  
  if (target) {
    // 줄바꿈이나 구분자로 분리
    const parts = target.split(/[.\n]/).filter(s => s.trim().length > 5)
    reqs.push(...parts.slice(0, 5))
  }
  
  if (reqs.length === 0) {
    reqs.push('상세 페이지 참조')
  }
  
  return reqs
}

/**
 * 태그 추출
 */
function extractTags(program: MssProgram): string[] {
  const tags = new Set<string>()
  const title = getString(program.pbancNm)
  
  // 키워드 추출
  const keywords = title.split(/[\s,\/()]+/)
    .filter(s => s.length > 1 && !s.match(/^\d+$/))
    .slice(0, 6)
  
  keywords.forEach(k => tags.add(k))
  
  return Array.from(tags).slice(0, 5)
}

/**
 * 대상 기업 추출
 */
function extractTargetCompany(program: MssProgram): string {
  const target = getString(program.sprtTrgtCn).toLowerCase()
  
  if (target.includes('예비창업')) return '예비창업자'
  if (target.includes('청년')) return '청년창업자'
  if (target.includes('중소기업')) return '중소기업'
  if (target.includes('소상공인')) return '소상공인'
  if (target.includes('스타트업')) return '스타트업'
  
  return '중소기업'
}

/**
 * 비즈니스 타입 추출
 */
function extractBusinessTypes(program: MssProgram): string {
  const types = new Set<string>()
  const text = (getString(program.pbancNm) + ' ' + getString(program.sprtTrgtCn)).toLowerCase()
  
  if (text.includes('창업') || text.includes('스타트업')) types.add('startup')
  if (text.includes('중소기업')) types.add('sme')
  if (text.includes('벤처')) types.add('venture')
  if (text.includes('청년')) types.add('youth')
  if (text.includes('여성')) types.add('women')
  if (text.includes('대학')) types.add('university')
  if (text.includes('지역')) types.add('regional')
  if (text.includes('사회적')) types.add('social')
  
  return types.size > 0 ? Array.from(types).join(',') : 'sme,startup'
}

/**
 * 산업 분야 추출
 */
function extractIndustries(program: MssProgram): string {
  const industries = new Set<string>()
  const text = (getString(program.pbancNm) + ' ' + getString(program.bizPrpsCn)).toLowerCase()
  
  if (text.includes('it') || text.includes('ict') || text.includes('소프트웨어')) industries.add('it')
  if (text.includes('제조') || text.includes('생산')) industries.add('manufacturing')
  if (text.includes('서비스')) industries.add('service')
  if (text.includes('의료') || text.includes('헬스케어')) industries.add('healthcare')
  if (text.includes('교육')) industries.add('education')
  if (text.includes('유통') || text.includes('판매')) industries.add('retail')
  if (text.includes('농업') || text.includes('농수산')) industries.add('agriculture')
  
  return industries.size > 0 ? Array.from(industries).join(',') : 'it,manufacturing,service'
}

/**
 * 해결 과제 추출
 */
function extractChallenges(program: MssProgram): string {
  const challenges = new Set<string>()
  const text = (getString(program.pbancNm) + ' ' + getString(program.sprtCn)).toLowerCase()
  
  if (text.includes('자금') || text.includes('금융')) challenges.add('funding')
  if (text.includes('마케팅') || text.includes('홍보')) challenges.add('marketing')
  if (text.includes('기술') || text.includes('r&d')) challenges.add('technology')
  if (text.includes('디지털') || text.includes('ict')) challenges.add('digital')
  if (text.includes('인력') || text.includes('채용')) challenges.add('talent')
  if (text.includes('수출') || text.includes('해외')) challenges.add('export')
  if (text.includes('확장') || text.includes('성장')) challenges.add('expansion')
  
  return challenges.size > 0 ? Array.from(challenges).join(',') : 'funding,marketing'
}

/**
 * 목표 추출
 */
function extractGoals(program: MssProgram): string {
  const goals = new Set<string>()
  const text = (getString(program.pbancNm) + ' ' + getString(program.bizPrpsCn)).toLowerCase()
  
  if (text.includes('성장') || text.includes('확대')) goals.add('growth')
  if (text.includes('혁신') || text.includes('개발')) goals.add('innovation')
  if (text.includes('시장') || text.includes('진출')) goals.add('market')
  if (text.includes('브랜드')) goals.add('brand')
  if (text.includes('디지털')) goals.add('digital')
  if (text.includes('지속')) goals.add('sustainability')
  
  return goals.size > 0 ? Array.from(goals).join(',') : 'growth,innovation'
}

/**
 * ID 생성
 */
function generateId(): string {
  return Date.now().toString()
}

/**
 * XML 파일 저장
 */
function saveXML(xmlContent: string): void {
  const outputPath = path.join(process.cwd(), 'public', 'data', 'programs.xml')
  
  // 백업 생성
  if (fs.existsSync(outputPath)) {
    const backupPath = path.join(
      process.cwd(),
      'public',
      'data',
      `programs-backup-${new Date().toISOString().split('T')[0]}.xml`
    )
    fs.copyFileSync(outputPath, backupPath)
    console.log(`📦 기존 파일 백업: ${backupPath}`)
  }
  
  // 새 파일 저장
  fs.writeFileSync(outputPath, xmlContent, 'utf-8')
  console.log(`✅ XML 파일 저장 완료: ${outputPath}`)
}

/**
 * 메인 실행
 */
async function main() {
  try {
    console.log('🚀 중소벤처기업부 지원사업 데이터 수집 시작\n')
    
    // 1. API 호출
    const programs = await fetchFromMssAPI()
    
    if (programs.length === 0) {
      console.error('❌ 수집된 데이터가 없습니다.')
      process.exit(1)
    }
    
    // 2. XML 변환
    console.log('\n🔄 XML 변환 중...')
    const xmlContent = convertToXML(programs)
    
    // 3. 파일 저장
    console.log('💾 파일 저장 중...')
    saveXML(xmlContent)
    
    console.log('\n✨ 완료!')
    console.log(`📊 총 ${programs.length}개의 지원사업이 업데이트되었습니다.`)
    
  } catch (error) {
    console.error('\n❌ 오류 발생:', error)
    process.exit(1)
  }
}

// 스크립트 실행
main()