/**
 * Google Apps Script - 비즈핏 문의 접수 시스템
 * 
 * 설정 방법:
 * 1. Google Sheet 생성 후 시트 이름을 "문의접수"로 변경
 * 2. 확장 프로그램 > Apps Script 메뉴 클릭
 * 3. 이 코드를 붙여넣기
 * 4. 배포 > 새 배포 > 웹 앱 선택
 * 5. 실행 권한: 나, 액세스 권한: 모든 사용자
 * 6. 배포 후 URL을 .env 파일의 GOOGLE_SCRIPT_URL에 설정
 */

// 스프레드시트 ID (URL에서 확인 가능)
const SPREADSHEET_ID = "YOUR_SPREADSHEET_ID_HERE";
const SHEET_NAME = "문의접수";

// 이메일 알림 설정
const ADMIN_EMAILS = ["admin@bizfit.co.kr"]; // 관리자 이메일 목록
const SEND_EMAIL_NOTIFICATION = true;

/**
 * HTTP POST 요청 핸들러
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    if (data.action === "addInquiry") {
      const result = addInquiry(data.data);
      return ContentService
        .createTextOutput(JSON.stringify(result))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: "Unknown action" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * HTTP GET 요청 핸들러 (문의 목록 조회용)
 */
function doGet(e) {
  try {
    const action = e.parameter.action || "list";
    
    if (action === "list") {
      const inquiries = getInquiries();
      return ContentService
        .createTextOutput(JSON.stringify({ success: true, data: inquiries }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: "Unknown action" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * 새 문의 추가
 */
function addInquiry(inquiry) {
  const sheet = getOrCreateSheet();
  
  // 새 행 추가
  const row = [
    inquiry.inquiryId || "",
    inquiry.createdAt || new Date().toISOString(),
    inquiry.name || "",
    inquiry.email || "",
    inquiry.phone || "",
    inquiry.company || "",
    inquiry.position || "",
    inquiry.expertId || "",
    inquiry.expertName || "",
    inquiry.inquiryType || "",
    inquiry.subject || "",
    inquiry.message || "",
    inquiry.businessType || "",
    inquiry.industry || "",
    inquiry.budget || "",
    inquiry.preferredDate || "",
    inquiry.preferredTime || "",
    inquiry.diagnosisId || "",
    inquiry.recommendedPrograms || "",
    inquiry.marketingConsent || "",
    inquiry.privacyConsent || "",
    inquiry.status || "접수됨",
    "" // 메모
  ];
  
  sheet.appendRow(row);
  
  // 이메일 알림 발송
  if (SEND_EMAIL_NOTIFICATION) {
    sendEmailNotification(inquiry);
  }
  
  return { success: true, inquiryId: inquiry.inquiryId };
}

/**
 * 시트 가져오기 또는 생성
 */
function getOrCreateSheet() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    // 헤더 추가
    const headers = [
      "문의ID", "접수일시", "이름", "이메일", "연락처", 
      "회사명", "직책", "전문가ID", "전문가명", "문의유형",
      "제목", "내용", "사업유형", "산업분야", "예산",
      "선호일자", "선호시간", "진단ID", "추천사업", 
      "마케팅동의", "개인정보동의", "상태", "메모"
    ];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  
  return sheet;
}

/**
 * 문의 목록 조회
 */
function getInquiries() {
  const sheet = getOrCreateSheet();
  const data = sheet.getDataRange().getValues();
  
  if (data.length <= 1) return [];
  
  const headers = data[0];
  const inquiries = [];
  
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const inquiry = {};
    headers.forEach((header, index) => {
      inquiry[header] = row[index];
    });
    inquiries.push(inquiry);
  }
  
  return inquiries;
}

/**
 * 이메일 알림 발송
 */
function sendEmailNotification(inquiry) {
  const subject = `[비즈핏] 새 문의 접수 - ${inquiry.subject}`;
  
  const body = `
새로운 문의가 접수되었습니다.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 문의 정보
문의 ID: ${inquiry.inquiryId}
접수일시: ${inquiry.createdAt}

👤 문의자 정보
이름: ${inquiry.name}
회사: ${inquiry.company}
직책: ${inquiry.position}
이메일: ${inquiry.email}
연락처: ${inquiry.phone}

📝 문의 내용
유형: ${inquiry.inquiryType}
제목: ${inquiry.subject}
담당 전문가: ${inquiry.expertName}

내용:
${inquiry.message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

관리자 페이지에서 확인해주세요.
`;

  const htmlBody = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); padding: 30px; border-radius: 12px 12px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 24px;">새 문의 접수</h1>
    <p style="color: rgba(255,255,255,0.8); margin: 10px 0 0 0;">${inquiry.subject}</p>
  </div>
  
  <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none;">
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; width: 120px;">문의 ID</td>
        <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-family: monospace; font-size: 13px;">${inquiry.inquiryId}</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280;">문의자</td>
        <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;"><strong>${inquiry.name}</strong> (${inquiry.company})</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280;">연락처</td>
        <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;">${inquiry.phone}<br><a href="mailto:${inquiry.email}" style="color: #2563eb;">${inquiry.email}</a></td>
      </tr>
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280;">담당 전문가</td>
        <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;">${inquiry.expertName}</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280;">문의 유형</td>
        <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;">${inquiry.inquiryType}</td>
      </tr>
    </table>
    
    <div style="margin-top: 20px; padding: 20px; background: #f9fafb; border-radius: 8px;">
      <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px;">문의 내용</p>
      <p style="margin: 0; color: #374151; line-height: 1.6; white-space: pre-wrap;">${inquiry.message}</p>
    </div>
  </div>
  
  <div style="background: #f9fafb; padding: 20px; border-radius: 0 0 12px 12px; text-align: center; border: 1px solid #e5e7eb; border-top: none;">
    <p style="margin: 0; color: #6b7280; font-size: 13px;">
      관리자 페이지에서 상세 내용을 확인하세요.
    </p>
  </div>
</div>
`;

  ADMIN_EMAILS.forEach(email => {
    try {
      MailApp.sendEmail({
        to: email,
        subject: subject,
        body: body,
        htmlBody: htmlBody
      });
    } catch (e) {
      console.error("이메일 발송 실패:", email, e);
    }
  });
}

/**
 * 테스트용 함수
 */
function testAddInquiry() {
  const testData = {
    inquiryId: "INQ-TEST-001",
    createdAt: new Date().toISOString(),
    name: "테스트",
    email: "test@example.com",
    phone: "010-1234-5678",
    company: "테스트회사",
    position: "대표",
    expertId: "expert-001",
    expertName: "김정훈",
    inquiryType: "consultation",
    subject: "테스트 문의",
    message: "이것은 테스트 문의입니다.",
    status: "접수됨"
  };
  
  const result = addInquiry(testData);
  console.log(result);
}