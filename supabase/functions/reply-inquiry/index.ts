import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

console.log("reply-inquiry function booted");

const NAVER_EMAIL    = Deno.env.get("NAVER_EMAIL")!;
const NAVER_PASSWORD = Deno.env.get("NAVER_PASSWORD")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { name, email, subject, message, reply } = await req.json();

    if (!email) {
      return new Response(JSON.stringify({ error: "이메일 없음" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const html = `
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body style="margin:0;padding:0;background-color:#f2f2f2;font-family:'Apple SD Gothic Neo','Malgun Gothic',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f2f2f2;padding:48px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;overflow:hidden;">

        <!-- 헤더 -->
        <tr>
          <td style="background-color:#111111;padding:28px 40px;">
            <p style="margin:0;color:#ffffff;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;">과학기술인협동조합 기술사업화지원단</p>
          </td>
        </tr>

        <!-- 인사말 -->
        <tr>
          <td style="padding:40px 40px 0;">
            <p style="margin:0 0 4px;font-size:22px;font-weight:700;color:#111111;letter-spacing:-0.5px;">문의하신 내용에 답변드립니다</p>
            <p style="margin:12px 0 0;font-size:14px;color:#888888;line-height:1.7;">
              안녕하세요, <strong style="color:#333333;">${name || '고객'}</strong>님.<br/>
              기사단에 문의해 주셔서 감사합니다. 아래와 같이 답변 드립니다.
            </p>
          </td>
        </tr>

        <!-- 구분선 -->
        <tr>
          <td style="padding:28px 40px 0;">
            <hr style="border:none;border-top:1px solid #eeeeee;margin:0;"/>
          </td>
        </tr>

        <!-- 원본 문의 -->
        <tr>
          <td style="padding:28px 40px 0;">
            <p style="margin:0 0 10px;font-size:11px;font-weight:700;color:#aaaaaa;letter-spacing:0.15em;text-transform:uppercase;">문의 내용</p>
            <p style="margin:0 0 6px;font-size:15px;font-weight:700;color:#222222;">${subject || '(제목 없음)'}</p>
            <p style="margin:0;font-size:13px;color:#888888;line-height:1.8;white-space:pre-wrap;">${message || '-'}</p>
          </td>
        </tr>

        <!-- 구분선 -->
        <tr>
          <td style="padding:28px 40px 0;">
            <hr style="border:none;border-top:1px solid #eeeeee;margin:0;"/>
          </td>
        </tr>

        <!-- 답변 -->
        <tr>
          <td style="padding:28px 40px 0;">
            <p style="margin:0 0 14px;font-size:11px;font-weight:700;color:#aaaaaa;letter-spacing:0.15em;text-transform:uppercase;">답변</p>
            <div style="background-color:#f8f8f8;border-left:3px solid #111111;padding:20px 24px;">
              <p style="margin:0;font-size:14px;color:#222222;line-height:1.9;white-space:pre-wrap;">${reply}</p>
            </div>
          </td>
        </tr>

        <!-- 추가 문의 안내 -->
        <tr>
          <td style="padding:32px 40px;">
            <p style="margin:0;font-size:13px;color:#888888;line-height:1.8;">
              추가로 궁금하신 점이 있으시면 언제든지 문의해 주세요.<br/>
              <a href="mailto:kisadan01@naver.com" style="color:#111111;font-weight:700;text-decoration:none;">kisadan01@naver.com</a>
            </p>
          </td>
        </tr>

        <!-- 푸터 -->
        <tr>
          <td style="background-color:#f8f8f8;padding:20px 40px;border-top:1px solid #eeeeee;">
            <p style="margin:0;font-size:11px;color:#bbbbbb;line-height:1.8;">
              본 메일은 발신 전용입니다. 직접 회신하지 마시고 위 이메일 주소로 연락주세요.<br/>
              경기도 용인시 기흥구 강남로 12, 805호 &nbsp;|&nbsp; Tel. 031-322-2357
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

    const naverUsername = NAVER_EMAIL.split("@")[0];
    console.log("Connecting SMTP, user:", naverUsername);

    const conn = await Deno.connectTls({ hostname: "smtp.naver.com", port: 465 });
    const enc = new TextEncoder();
    const dec = new TextDecoder();

    const write = async (s: string) => { await conn.write(enc.encode(s + "\r\n")); };
    const read = async () => {
      const buf = new Uint8Array(4096);
      const n = await conn.read(buf);
      return dec.decode(buf.subarray(0, n ?? 0));
    };

    await read(); // 220 greeting
    await write("EHLO client");
    await read();
    await write("AUTH LOGIN");
    await read();
    await write(btoa(naverUsername));
    await read();
    await write(btoa(NAVER_PASSWORD));
    const authResp = await read();
    console.log("Auth response:", authResp.slice(0, 3));
    if (!authResp.startsWith("235")) throw new Error("Auth failed: " + authResp);

    await write(`MAIL FROM:<${NAVER_EMAIL}>`);
    await read();
    await write(`RCPT TO:<${email}>`);
    await read();
    await write("DATA");
    await read();

    const subjectText = `[기사단] 상담 문의 답변 — ${subject || '제목 없음'}`;
    const subjectEncoded = `=?UTF-8?B?${btoa(new TextEncoder().encode(subjectText).reduce((s, b) => s + String.fromCharCode(b), ""))}?=`;
    const rawEmail = [
      `From: Kisadan <${NAVER_EMAIL}>`,
      `To: ${email}`,
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
    console.log("Data response:", dataResp.slice(0, 3));

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
