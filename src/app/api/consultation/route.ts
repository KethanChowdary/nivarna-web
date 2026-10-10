import { Resend } from "resend";

const recipient = "nivarna.advisors@gmail.com";
const maxRequestSize = 8_000;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export async function POST(request: Request) {
  if (request.headers.get("origin") !== new URL(request.url).origin) {
    return Response.json({ error: "Invalid request origin." }, { status: 403 });
  }

  if (!request.headers.get("content-type")?.includes("application/json")) {
    return Response.json({ error: "Expected a JSON request." }, { status: 415 });
  }

  const contentLength = Number(request.headers.get("content-length"));
  if (contentLength > maxRequestSize) {
    return Response.json({ error: "Request is too large." }, { status: 413 });
  }

  let body: string;
  try {
    body = await request.text();
  } catch (error) {
    console.error("Failed to read consultation request.", error);
    return Response.json({ error: "Unable to read request." }, { status: 400 });
  }

  if (body.length > maxRequestSize) {
    return Response.json({ error: "Request is too large." }, { status: 413 });
  }

  let payload: unknown;
  try {
    payload = JSON.parse(body);
  } catch {
    return Response.json({ error: "Invalid JSON request." }, { status: 400 });
  }

  if (!isRecord(payload)) {
    return Response.json({ error: "Invalid consultation request." }, { status: 400 });
  }

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const service = typeof payload.service === "string" ? payload.service.trim() : "";
  const website = typeof payload.website === "string" ? payload.website.trim() : "";
  const privacyAccepted = payload.privacyAccepted === true;

  if (website) {
    return Response.json({ error: "Invalid consultation request." }, { status: 400 });
  }

  if (
    !name ||
    name.length > 120 ||
    !email ||
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    service.length > 120 ||
    !privacyAccepted
  ) {
    return Response.json({ error: "Please provide a valid name and email address." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !from) {
    console.error("Consultation email is not configured. Set RESEND_API_KEY and RESEND_FROM_EMAIL.");
    return Response.json(
      { error: "Consultation requests are temporarily unavailable." },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);
  const serviceLine = service || "Not specified";

  try {
    const { error } = await resend.emails.send({
      from,
      to: [recipient],
      replyTo: email,
      subject: "New consultation request | Nivarna Advisors",
      text: [
        "A new consultation request was submitted on nivarna.in.",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Service needed: ${serviceLine}`,
      ].join("\n"),
    });

    if (error) {
      console.error("Resend rejected a consultation email.", error);
      return Response.json({ error: "Unable to send consultation request." }, { status: 502 });
    }
  } catch (error) {
    console.error("Failed to send consultation email.", error);
    return Response.json({ error: "Unable to send consultation request." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
