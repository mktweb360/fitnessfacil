import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    const apiKey = process.env.MAILCHIMP_API_KEY;
    const listId = process.env.MAILCHIMP_LIST_ID;
    const server = process.env.MAILCHIMP_SERVER; // e.g. "us1"

    if (apiKey && listId && server) {
      const response = await fetch(
        `https://${server}.api.mailchimp.com/3.0/lists/${listId}/members`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            email_address: email,
            status: "subscribed",
            merge_fields: { FNAME: name || "" },
          }),
        }
      );

      const data = await response.json();

      if (!response.ok && data.title !== "Member Exists") {
        console.error("[Subscribe] Mailchimp error:", data);
        return NextResponse.json(
          { error: "Error al procesar la suscripción" },
          { status: 500 }
        );
      }
    } else {
      // No email service configured — log for development
      console.log(`[Subscribe] ${new Date().toISOString()} | ${email} | ${name || "(sin nombre)"}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Subscribe] Error:", error);
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}
