import { NextResponse } from "next/server";
import { HOTEL_INFO } from "@/lib/hotel-data";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        {
          ok: false,
          error: "Please provide your name, email address, and message.",
        },
        { status: 400 }
      );
    }

    const referenceId = `MSG-${Date.now().toString().slice(-6)}`;
    const formattedBody = [
      `Inquiry Reference: ${referenceId}`,
      `From: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      subject ? `Subject: ${subject}` : null,
      "",
      `Message:`,
      message,
    ]
      .filter((line) => line !== null)
      .join("\n");

    const whatsappUrl = `https://wa.me/${HOTEL_INFO.contact.whatsappClean}?text=${encodeURIComponent(
      `Hello City Boutique Hotel Sarajevo,\n\n${formattedBody}`
    )}`;

    const mailtoUrl = `mailto:${HOTEL_INFO.contact.email}?subject=${encodeURIComponent(
      subject || `Guest Inquiry ${referenceId} — ${name}`
    )}&body=${encodeURIComponent(formattedBody)}`;

    return NextResponse.json({
      ok: true,
      referenceId,
      whatsappUrl,
      mailtoUrl,
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: "Unable to process your message at this moment.",
      },
      { status: 500 }
    );
  }
}
