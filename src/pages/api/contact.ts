import type { APIRoute } from "astro";

const TURNSTILE_SECRET = process.env.TURNSTILE_SECRET || "";
const RESEND_API_KEY = process.env.RESEND_API_KEY || "";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, email, phone, company, message, "cf-turnstile-response": token } = body;

    if (!name || !email || !phone || !message || !token) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const turnstileRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret: TURNSTILE_SECRET, response: token }),
    });
    const turnstileData = await turnstileRes.json();
    if (!turnstileData.success) {
      return new Response(JSON.stringify({ error: "Security check failed" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (RESEND_API_KEY) {
      const emailRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "SUNSTAR Contact <contact@sunstarconsultancy.com>",
          to: ["hello@sunstarconsultancy.com"],
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
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Contact API error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const ALL: APIRoute = async ({ request }) => {
  return new Response(JSON.stringify({ error: "Method not allowed" }), {
    status: 405,
    headers: { "Content-Type": "application/json", Allow: "POST" },
  });
};
