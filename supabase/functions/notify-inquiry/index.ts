import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const NOTIFY_EMAIL   = Deno.env.get("NOTIFY_EMAIL")!;   // 알림 받을 이메일 (관리자)
const FROM_EMAIL     = Deno.env.get("FROM_EMAIL")!;      // 발신 이메일

serve(async (req) => {
  try {
    const payload = await req.json();
    const record = payload.record;

    const html = `
<!DOCTYPE html>
<html lang="ko">
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background-color:#f4f4f4;font-family:'Apple SD Gothic Neo','Malgun Gothic',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4;padding:48px 0;">
    <tr><td align="center">
      <table width="520" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:4px;overflow:hidden;">

        <tr>
          <td style="background-color:#111111;padding:32px 48px;">
            <p style="margin:0;color:#ffffff;font-size:13px;font-weight:700;letter-spacing:0.15em;">과학기술인협동조합 기술사업화지원단</p>
          </td>
        </tr>

        <tr>
          <td style="padding:40px 48px 32px;">
            <p style="margin:0 0 6px;font-size:20px;font-weight:700;color:#111111;">새로운 상담 문의가 접수되었습니다</p>
            <p style="margin:0 0 28px;font-size:13px;color:#7c7c7c;">관리자 페이지에서 확인 후 답변해주세요.</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #eeeeee;border-radius:4px;overflow:hidden;">
              <tr style="background-color:#f9f9f9;">
                <td style="padding:10px 16px;font-size:12px;font-weight:700;color:#aaaaaa;width:80px;">이름</td>
                <td style="padding:10px 16px;font-size:13px;color:#333333;">${record.name || '-'}</td>
              </tr>
              <tr>
                <td style="padding:10px 16px;font-size:12px;font-weight:700;color:#aaaaaa;border-top:1px solid #eeeeee;">소속</td>
                <td style="padding:10px 16px;font-size:13px;color:#333333;border-top:1px solid #eeeeee;">${record.organization || '-'}</td>
              </tr>
              <tr style="background-color:#f9f9f9;">
                <td style="padding:10px 16px;font-size:12px;font-weight:700;color:#aaaaaa;border-top:1px solid #eeeeee;">연락처</td>
                <td style="padding:10px 16px;font-size:13px;color:#333333;border-top:1px solid #eeeeee;">${record.phone || '-'}</td>
              </tr>
              <tr>
                <td style="padding:10px 16px;font-size:12px;font-weight:700;color:#aaaaaa;border-top:1px solid #eeeeee;">이메일</td>
                <td style="padding:10px 16px;font-size:13px;color:#333333;border-top:1px solid #eeeeee;">${record.email || '-'}</td>
              </tr>
              <tr style="background-color:#f9f9f9;">
                <td style="padding:10px 16px;font-size:12px;font-weight:700;color:#aaaaaa;border-top:1px solid #eeeeee;">제목</td>
                <td style="padding:10px 16px;font-size:13px;color:#333333;border-top:1px solid #eeeeee;">${record.subject || '-'}</td>
              </tr>
              <tr>
                <td style="padding:10px 16px;font-size:12px;font-weight:700;color:#aaaaaa;border-top:1px solid #eeeeee;vertical-align:top;">내용</td>
                <td style="padding:10px 16px;font-size:13px;color:#333333;border-top:1px solid #eeeeee;line-height:1.7;white-space:pre-wrap;">${record.message || '-'}</td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td style="background-color:#f9f9f9;padding:20px 48px;border-top:1px solid #eeeeee;">
            <p style="margin:0;font-size:11px;color:#bbbbbb;line-height:1.7;">
              본 메일은 발신 전용입니다. 문의사항은 kisadan01@naver.com 으로 연락주세요.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: NOTIFY_EMAIL,
        subject: `[기사단] 새 상담 문의 — ${record.subject || '제목 없음'}`,
        html,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      return new Response(JSON.stringify({ error: err }), { status: 500 });
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500 });
  }
});
