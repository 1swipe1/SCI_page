import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const NAVER_EMAIL = Deno.env.get("NAVER_EMAIL")!;
const NAVER_PASSWORD = Deno.env.get("NAVER_PASSWORD")!;
const ADMIN_EMAIL = "kisadan01@naver.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { name, organization, phone, email, subject, message } = await req.json();

    const naverUsername = NAVER_EMAIL.split("@")[0];

    const conn = await Deno.connectTls({ hostname: "smtp.naver.com", port: 465 });
    const enc = new TextEncoder();
    const dec = new TextDecoder();

    const write = async (s: string) => { await conn.write(enc.encode(s + "\r\n")); };
    const read = async () => {
      const buf = new Uint8Array(4096);
      const n = await conn.read(buf);
      return dec.decode(buf.subarray(0, n ?? 0));
    };

    await read();
    await write("EHLO client");
    await read();
    await write("AUTH LOGIN");
    await read();
    await write(btoa(naverUsername));
    await read();
    await write(btoa(NAVER_PASSWORD));
    const authResp = await read();
    if (!authResp.startsWith("235")) throw new Error("Auth failed: " + authResp);

    await write(`MAIL FROM:<${NAVER_EMAIL}>`);
    await read();
    await write(`RCPT TO:<${ADMIN_EMAIL}>`);
    await read();
    await write("DATA");
    await read();

    const subjectText = `[기사단] 새 문의 — ${subject || '(제목 없음)'}`;
    const subjectEncoded = `=?UTF-8?B?${btoa(new TextEncoder().encode(subjectText).reduce((s, b) => s + String.fromCharCode(b), ""))}?=`;

    const html = `<!DOCTYPE html>
<html lang="ko">
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#f2f2f2;font-family:'Apple SD Gothic Neo','Malgun Gothic',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f2f2f2;padding:48px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;">
        <tr>
          <td style="background:#111111;padding:28px 40px;">
            <p style="margin:0;color:#ffffff;font-size:11px;font-weight:700;letter-spacing:0.2em;">과학기술인협동조합 기술사업화지원단</p>
          </td>
        </tr>
        <tr>
          <td style="padding:36px 40px 0;">
            <p style="margin:0;font-size:20px;font-weight:700;color:#111111;">새 문의가 접수되었습니다</p>
            <p style="margin:8px 0 0;font-size:13px;color:#888888;">관리자 페이지에서 확인 후 답변해주세요.</p>
          </td>
        </tr>
        <tr><td style="padding:24px 40px 0;"><hr style="border:none;border-top:1px solid #eeeeee;margin:0;"/></td></tr>
        <tr>
          <td style="padding:24px 40px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:6px 0;font-size:13px;color:#aaaaaa;width:80px;vertical-align:top;">이름</td>
                <td style="padding:6px 0;font-size:13px;color:#222222;">${name || '-'}</td>
              </tr>
              ${organization ? `<tr>
                <td style="padding:6px 0;font-size:13px;color:#aaaaaa;vertical-align:top;">소속</td>
                <td style="padding:6px 0;font-size:13px;color:#222222;">${organization}</td>
              </tr>` : ''}
              ${phone ? `<tr>
                <td style="padding:6px 0;font-size:13px;color:#aaaaaa;vertical-align:top;">연락처</td>
                <td style="padding:6px 0;font-size:13px;color:#222222;">${phone}</td>
              </tr>` : ''}
              <tr>
                <td style="padding:6px 0;font-size:13px;color:#aaaaaa;vertical-align:top;">이메일</td>
                <td style="padding:6px 0;font-size:13px;color:#222222;">${email || '-'}</td>
              </tr>
              <tr>
                <td style="padding:6px 0;font-size:13px;color:#aaaaaa;vertical-align:top;">제목</td>
                <td style="padding:6px 0;font-size:13px;color:#222222;font-weight:700;">${subject || '-'}</td>
              </tr>
              <tr>
                <td style="padding:12px 0 6px;font-size:13px;color:#aaaaaa;vertical-align:top;">내용</td>
                <td style="padding:12px 0 6px;font-size:13px;color:#222222;line-height:1.8;white-space:pre-wrap;">${message || '-'}</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background:#f8f8f8;padding:20px 40px;border-top:1px solid #eeeeee;">
            <p style="margin:0;font-size:11px;color:#bbbbbb;">관리자 페이지에서 답변을 등록해주세요.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

    const rawEmail = [
      `From: Kisadan <${NAVER_EMAIL}>`,
      `To: ${ADMIN_EMAIL}`,
      `Subject: ${subjectEncoded}`,
      `MIME-Version: 1.0`,
      `Content-Type: text/html; charset=UTF-8`,
      `Content-Transfer-Encoding: 8bit`,
      ``,
      html,
      `.`,
    ].join("\r\n");

    await write(rawEmail);
    const dataResp = await read();
    await write("QUIT");
    conn.close();

    if (!dataResp.startsWith("250")) throw new Error("Send failed: " + dataResp);

    return new Response(JSON.stringify({ ok: true }), {
      status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Error:", String(e));
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
