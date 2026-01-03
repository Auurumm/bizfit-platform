/**
 * 전문가 프로필 XML 파서 및 유틸리티
 * XML 파일 기반 전문가 데이터 관리
 */

import fs from "fs";
import path from "path";

// 전문가 타입 정의
export interface Expert {
  id: string;
  name: string;
  title: string;
  organization: string;
  profileImage: string;
  introduction: string;
  experience: number;
  successRate: number;
  consultingCount: number;
  specialties: string[];
  certifications: string[];
  industries: string[];
  contact: {
    email: string;
    phone: string;
  };
  availableTime: string;
  consultingFee: string;
  rating: number;
  reviewCount: number;
}

export interface ExpertsMetadata {
  lastUpdated: string;
  totalCount: number;
}

// XML에서 단일 태그 값 추출
function getTagValue(xml: string, tagName: string): string {
  const regex = new RegExp(`<${tagName}>([\\s\\S]*?)<\\/${tagName}>`, "i");
  const match = xml.match(regex);
  return match ? match[1].trim() : "";
}

// XML에서 배열 태그 값 추출
function getArrayValues(xml: string, parentTag: string, childTag: string): string[] {
  const parentRegex = new RegExp(`<${parentTag}>([\\s\\S]*?)<\\/${parentTag}>`, "i");
  const parentMatch = xml.match(parentRegex);
  if (!parentMatch) return [];

  const childRegex = new RegExp(`<${childTag}>([\\s\\S]*?)<\\/${childTag}>`, "gi");
  const matches = parentMatch[1].matchAll(childRegex);
  return Array.from(matches).map((m) => m[1].trim());
}

// XML attributes에서 값 추출
function getAttribute(attributesString: string, attrName: string): string {
  const regex = new RegExp(`${attrName}\\s*=\\s*["']([^"']*)["']`, "i");
  const match = attributesString.match(regex);
  return match ? match[1] : "";
}

// 전문가 XML 파싱
function parseExpert(expertXml: string, attributes: string): Expert {
  const contact = {
    email: "",
    phone: "",
  };

  // contact 태그 내부 파싱
  const contactMatch = expertXml.match(/<contact>([\s\S]*?)<\/contact>/i);
  if (contactMatch) {
    contact.email = getTagValue(contactMatch[1], "email");
    contact.phone = getTagValue(contactMatch[1], "phone");
  }

  return {
    id: getAttribute(attributes, "id"),
    name: getTagValue(expertXml, "name"), // XML에서는 <n> 태그 사용 (name 예약어 회피)
    title: getTagValue(expertXml, "title"),
    organization: getTagValue(expertXml, "organization"),
    profileImage: getTagValue(expertXml, "profileImage") || "/images/experts/default.png",
    introduction: getTagValue(expertXml, "introduction"),
    experience: parseInt(getTagValue(expertXml, "experience")) || 0,
    successRate: parseInt(getTagValue(expertXml, "successRate")) || 0,
    consultingCount: parseInt(getTagValue(expertXml, "consultingCount")) || 0,
    specialties: getArrayValues(expertXml, "specialties", "specialty"),
    certifications: getArrayValues(expertXml, "certifications", "certification"),
    industries: getArrayValues(expertXml, "industries", "industry"),
    contact,
    availableTime: getTagValue(expertXml, "availableTime"),
    consultingFee: getTagValue(expertXml, "consultingFee"),
    rating: parseFloat(getTagValue(expertXml, "rating")) || 0,
    reviewCount: parseInt(getTagValue(expertXml, "reviewCount")) || 0,
  };
}

// XML 파일에서 전문가 목록 로드
export async function loadExpertsFromXml(): Promise<{
  experts: Expert[];
  metadata: ExpertsMetadata;
}> {
  try {
    const xmlPath = path.join(process.cwd(), "public", "data", "experts.xml");
    const xmlContent = fs.readFileSync(xmlPath, "utf-8");

    // 메타데이터 추출
    const expertsTagMatch = xmlContent.match(/<experts\s+([^>]*)>/i);
    const attributesString = expertsTagMatch ? expertsTagMatch[1] : "";
    
    const metadata: ExpertsMetadata = {
      lastUpdated: getAttribute(attributesString, "lastUpdated"),
      totalCount: parseInt(getAttribute(attributesString, "totalCount")) || 0,
    };

    // 전문가 데이터 파싱
    const expertRegex = /<expert\s+([^>]*)>([\s\S]*?)<\/expert>/gi;
    const expertMatches = xmlContent.matchAll(expertRegex);
    
    const experts: Expert[] = [];
    for (const match of expertMatches) {
      const attributes = match[1];
      const expertXml = match[2];
      experts.push(parseExpert(expertXml, attributes));
    }

    return { experts, metadata };
  } catch (error) {
    console.error("전문가 XML 로드 오류:", error);
    return {
      experts: [],
      metadata: { lastUpdated: "", totalCount: 0 },
    };
  }
}

// ID로 전문가 조회
export async function getExpertById(id: string): Promise<Expert | null> {
  const { experts } = await loadExpertsFromXml();
  return experts.find((expert) => expert.id === id) || null;
}

// 전문분야로 전문가 필터링
export async function getExpertsBySpecialty(specialty: string): Promise<Expert[]> {
  const { experts } = await loadExpertsFromXml();
  return experts.filter((expert) =>
    expert.specialties.some((s) =>
      s.toLowerCase().includes(specialty.toLowerCase())
    )
  );
}

// 산업분야로 전문가 필터링
export async function getExpertsByIndustry(industry: string): Promise<Expert[]> {
  const { experts } = await loadExpertsFromXml();
  return experts.filter((expert) =>
    expert.industries.some(
      (ind) =>
        ind.toLowerCase().includes(industry.toLowerCase()) ||
        ind === "전 산업"
    )
  );
}

// 전문가 검색 (이름, 전문분야, 산업, 소개글 검색)
export async function searchExperts(query: string): Promise<Expert[]> {
  const { experts } = await loadExpertsFromXml();
  const lowerQuery = query.toLowerCase();
  
  return experts.filter((expert) => {
    return (
      expert.name.toLowerCase().includes(lowerQuery) ||
      expert.title.toLowerCase().includes(lowerQuery) ||
      expert.organization.toLowerCase().includes(lowerQuery) ||
      expert.introduction.toLowerCase().includes(lowerQuery) ||
      expert.specialties.some((s) => s.toLowerCase().includes(lowerQuery)) ||
      expert.industries.some((ind) => ind.toLowerCase().includes(lowerQuery)) ||
      expert.certifications.some((c) => c.toLowerCase().includes(lowerQuery))
    );
  });
}

// 사용자 진단 결과 기반 전문가 매칭
export interface DiagnosisResult {
  businessType?: string;
  industry?: string;
  challenges?: string[];
  goals?: string[];
}

export async function matchExpertsByDiagnosis(
  diagnosis: DiagnosisResult
): Promise<Expert[]> {
  const { experts } = await loadExpertsFromXml();

  // 매칭 점수 계산
  const scoredExperts = experts.map((expert) => {
    let score = 0;

    // 산업 분야 매칭 (30점)
    if (diagnosis.industry) {
      if (
        expert.industries.some(
          (ind) =>
            ind.toLowerCase().includes(diagnosis.industry!.toLowerCase()) ||
            ind === "전 산업"
        )
      ) {
        score += 30;
      }
    }

    // 목표에 따른 전문분야 매칭 (40점)
    if (diagnosis.goals) {
      const goalSpecialtyMap: Record<string, string[]> = {
        growth: ["창업지원", "TIPS", "초기창업", "예비창업", "사업계획서"],
        funding: ["R&D", "국가", "기술개발", "투자유치"],
        export: ["수출", "해외", "글로벌", "FTA"],
        innovation: ["스마트공장", "제조혁신", "기술이전"],
        employment: ["청년채용", "고용", "일자리", "직업훈련"],
        sustainability: ["ESG", "탄소", "친환경", "녹색"],
      };

      diagnosis.goals.forEach((goal) => {
        const keywords = goalSpecialtyMap[goal] || [];
        if (
          expert.specialties.some((specialty) =>
            keywords.some((kw) =>
              specialty.toLowerCase().includes(kw.toLowerCase())
            )
          )
        ) {
          score += 20;
        }
      });
    }

    // 과제에 따른 전문분야 매칭 (30점)
    if (diagnosis.challenges) {
      const challengeSpecialtyMap: Record<string, string[]> = {
        funding: ["R&D", "투자유치", "창업지원", "TIPS"],
        technology: ["R&D", "기술", "스마트공장", "기술이전"],
        marketing: ["수출", "해외", "마케팅"],
        manpower: ["고용", "채용", "인력", "직업훈련"],
        management: ["경영", "사업계획서", "비즈니스 모델"],
      };

      diagnosis.challenges.forEach((challenge) => {
        const keywords = challengeSpecialtyMap[challenge] || [];
        if (
          expert.specialties.some((specialty) =>
            keywords.some((kw) =>
              specialty.toLowerCase().includes(kw.toLowerCase())
            )
          )
        ) {
          score += 15;
        }
      });
    }

    return { expert, score };
  });

  // 점수순 정렬 후 상위 전문가 반환
  return scoredExperts
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.expert);
}

// 전문가 통계 정보
export async function getExpertsStats(): Promise<{
  totalExperts: number;
  totalConsultings: number;
  averageSuccessRate: number;
  averageRating: number;
  specialties: string[];
  industries: string[];
}> {
  const { experts } = await loadExpertsFromXml();

  const allSpecialties = new Set<string>();
  const allIndustries = new Set<string>();

  experts.forEach((expert) => {
    expert.specialties.forEach((s) => allSpecialties.add(s));
    expert.industries.forEach((ind) => allIndustries.add(ind));
  });

  return {
    totalExperts: experts.length,
    totalConsultings: experts.reduce((sum, e) => sum + e.consultingCount, 0),
    averageSuccessRate:
      experts.reduce((sum, e) => sum + e.successRate, 0) / experts.length,
    averageRating:
      experts.reduce((sum, e) => sum + e.rating, 0) / experts.length,
    specialties: Array.from(allSpecialties),
    industries: Array.from(allIndustries),
  };
}