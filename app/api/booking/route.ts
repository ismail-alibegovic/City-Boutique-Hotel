import { NextResponse } from "next/server";
import { HOTEL_INFO, ROOM_CATEGORIES } from "@/lib/hotel-data";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      roomSlug,
      checkIn,
      checkOut,
      guests,
      fullName,
      email,
      phone,
      airportTransfer,
      bedPreference,
      notes,
    } = body;

    if (!roomSlug || !checkIn || !checkOut || !fullName || !email || !phone) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Please complete all required reservation inquiry fields (room, check-in, check-out, full name, email, and phone).",
        },
        { status: 400 }
      );
    }

    const selectedRoom = ROOM_CATEGORIES.find((r) => r.slug === roomSlug);
    if (!selectedRoom) {
      return NextResponse.json(
        { ok: false, error: "Selected room category was not found." },
        { status: 400 }
      );
    }

    const inquiryCode = `CBH-${Date.now().toString().slice(-6)}`;

    const summaryText = [
      `Reservation Inquiry Reference: ${inquiryCode}`,
      `Hotel: ${HOTEL_INFO.fullName}`,
      `Room Category: ${selectedRoom.name} (${selectedRoom.size})`,
      `Check-In: ${checkIn}`,
      `Check-Out: ${checkOut}`,
      `Guests: ${guests}`,
      `Guest Name: ${fullName}`,
      `Email: ${email}`,
      `Phone / WhatsApp: ${phone}`,
      bedPreference ? `Bed Preference: ${bedPreference}` : null,
      airportTransfer ? `Airport Transfer Requested: Yes` : null,
      notes ? `Special Requests: ${notes}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const whatsappDirectUrl = `https://wa.me/${HOTEL_INFO.contact.whatsappClean}?text=${encodeURIComponent(
      `Hello City Boutique Hotel Sarajevo,\n\nI would like to request availability and rates for the following stay:\n\n${summaryText}`
    )}`;

    const mailtoUrl = `mailto:${HOTEL_INFO.contact.email}?subject=${encodeURIComponent(
      `Reservation Inquiry ${inquiryCode} — ${selectedRoom.name} (${checkIn} to ${checkOut})`
    )}&body=${encodeURIComponent(summaryText)}`;

    return NextResponse.json({
      ok: true,
      inquiryCode,
      status: "INQUIRY_LOGGED_PENDING_HOTEL_CONFIRMATION",
      roomName: selectedRoom.name,
      summaryText,
      whatsappDirectUrl,
      mailtoUrl,
      receivedAt: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: "Unable to process reservation inquiry. Please try again or contact +387 33 566 850.",
      },
      { status: 500 }
    );
  }
}
