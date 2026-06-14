export default {
  async fetch(request) {
    if (request.method !== "POST") {
      return new Response(JSON.stringify({ success: false, message: "Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }

    const CORS_HEADERS = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    try {
      const body = await request.json();
      const { name, email, phone, company, message, "cf-turnstile-response": token } = body;

      if (!name || !email || !phone || !message || !token) {
        return new Response(JSON.stringify({ success: false, message: "Missing required fields" }), {
          status: 400,
          headers: { "Content-Type": "application/json", ...CORS_HEADERS },
        });
      }

      const turnstileRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ secret: TURNSTILE_SECRET, response: token }),
      });
      const turnstileData = await turnstileRes.json();
      if (!turnstileData.success) {
        return new Response(JSON.stringify({ success: false, message: "Security check failed" }), {
          status: 400,
          headers: { "Content-Type": "application/json", ...CORS_HEADERS },
        });
      }

      if (RESEND_API_KEY) {
        const emailRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "SUNSTAR Contact <contact@sunstarconsultancy.in>",
            to: ["hello@sunstarconsultancy.in"],
            subject: `New Contact Form Submission from ${name}`,
            html: `
              <h2>New Contact Form Submission</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone}</p>
              <p><strong>Company:</strong> ${company || "N/A"}</p>
              <p><strong>Message:</strong></p>
              <p>${message}</p>
            `,
          }),
        });

        if (!emailRes.ok) {
          console.error("Failed to send email:", await emailRes.text());
        }
      }

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...CORS_HEADERS },
      });
    } catch {
      return new Response(JSON.stringify({ success: false, message: "Internal server error" }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...CORS_HEADERS },
      });
    }
  },
};
