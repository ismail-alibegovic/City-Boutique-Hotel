import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, MessageCircle, Plane } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ContactForm } from "@/components/contact/contact-form";
import { HOTEL_INFO } from "@/lib/hotel-data";

export const metadata: Metadata = {
  title: "Contact & Directions | Mula Mustafe Bašeskije 2",
  description:
    "Contact City Boutique Hotel Sarajevo at Mula Mustafe Bašeskije 2, 71000 Sarajevo. 24/7 Reception: +387 33 566 850 | Email: novicityhotel@gmail.com | WhatsApp: +90 506 745 81 20.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#FFFFFF] text-[#171715]">
      <Navbar variant="page-header" />

      <section className="max-w-[1380px] mx-auto px-5 sm:px-9 lg:px-[52px] pt-10 sm:pt-12 pb-14">
        {/* Page Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-9 sm:mb-12">
          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-[#777773] mb-2">
              24/7 Multilingual Reception &bull; Historic Center
            </p>
            <h1 className="font-editorial text-[36px] sm:text-[50px] lg:text-[58px] font-normal text-[#171715] leading-[1.06] tracking-[-0.03em]">
              Get in Touch With
              <br />
              Our Sarajevo Team.
            </h1>
          </div>
          <p className="text-xs sm:text-[13px] text-[#777773] max-w-[360px] leading-[1.65]">
            Whether you need direct room availability, late-arrival check-in
            assistance, or a private transfer from Sarajevo International
            Airport, our reception desk is open 24 hours a day.
          </p>
        </div>

        {/* Contact Details & Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left 5 Columns: Verified Contact Directory */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-[24px] bg-[#F7F7F5] border border-[#E7E7E3] p-6 space-y-5">
              <div className="flex items-start gap-3.5">
                <span className="w-9 h-9 rounded-full bg-white border border-[#E7E7E3] flex items-center justify-center text-[#171715] shrink-0">
                  <MapPin className="w-4 h-4" />
                </span>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-[#777773]">
                    Hotel Address
                  </p>
                  <p className="text-sm font-medium text-[#171715] mt-0.5">
                    {HOTEL_INFO.address.full}
                  </p>
                  <a
                    href={HOTEL_INFO.address.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-1.5 text-xs text-[#5E6B5B] font-medium hover:underline"
                  >
                    Open in Google Maps &rarr;
                  </a>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E7E7E3] flex items-start gap-3.5">
                <span className="w-9 h-9 rounded-full bg-white border border-[#E7E7E3] flex items-center justify-center text-[#171715] shrink-0">
                  <Phone className="w-4 h-4" />
                </span>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-[#777773]">
                    24/7 Front Desk Telephone
                  </p>
                  <a
                    href={`tel:${HOTEL_INFO.contact.phoneClean}`}
                    className="text-sm font-medium text-[#171715] hover:underline block mt-0.5"
                  >
                    {HOTEL_INFO.contact.phone}
                  </a>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E7E7E3] flex items-start gap-3.5">
                <span className="w-9 h-9 rounded-full bg-white border border-[#E7E7E3] flex items-center justify-center text-[#171715] shrink-0">
                  <MessageCircle className="w-4 h-4" />
                </span>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-[#777773]">
                    Instant WhatsApp Concierge (24/7)
                  </p>
                  <a
                    href={HOTEL_INFO.contact.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-[#171715] hover:underline block mt-0.5"
                  >
                    {HOTEL_INFO.contact.whatsapp}
                  </a>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E7E7E3] flex items-start gap-3.5">
                <span className="w-9 h-9 rounded-full bg-white border border-[#E7E7E3] flex items-center justify-center text-[#171715] shrink-0">
                  <Mail className="w-4 h-4" />
                </span>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-[#777773]">
                    Official Reservations Email
                  </p>
                  <a
                    href={`mailto:${HOTEL_INFO.contact.email}`}
                    className="text-sm font-medium text-[#171715] hover:underline block mt-0.5"
                  >
                    {HOTEL_INFO.contact.email}
                  </a>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E7E7E3] flex items-start gap-3.5">
                <span className="w-9 h-9 rounded-full bg-white border border-[#E7E7E3] flex items-center justify-center text-[#171715] shrink-0">
                  <Clock className="w-4 h-4" />
                </span>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-[#777773]">
                    Reception &amp; Check-In Hours
                  </p>
                  <p className="text-xs text-[#171715] mt-0.5 leading-relaxed">
                    Reception open 24/7 &bull; Check-in from 14:00 &bull;
                    Check-out until 11:00
                  </p>
                </div>
              </div>
            </div>

            {/* Arrival Directions Card */}
            <div className="rounded-[24px] bg-[#F7F7F5] border border-[#E7E7E3] p-6">
              <div className="flex items-center gap-2 text-xs font-medium text-[#171715] mb-2">
                <Plane className="w-4 h-4 text-[#5E6B5B]" />
                <span>Arriving from Sarajevo International Airport (SJJ)</span>
              </div>
              <p className="text-xs text-[#777773] leading-[1.65]">
                City Boutique Hotel is located ~9 km (20 minutes by car) from
                Sarajevo International Airport. Contact our reception via
                WhatsApp or email prior to arrival to arrange a private airport
                transfer directly to Mula Mustafe Bašeskije 2.
              </p>
            </div>
          </div>

          {/* Right 7 Columns: Functional Guest Inquiry Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>

        {/* Embedded Interactive Google Map */}
        <div className="mt-14 sm:mt-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-5">
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] text-[#777773]">
                Exact Location &bull; 43.8590512° N, 18.4226918° E
              </p>
              <h2 className="font-editorial text-2xl sm:text-3xl font-normal text-[#171715] mt-1">
                Mula Mustafe Bašeskije 2, Sarajevo
              </h2>
            </div>
            <span className="text-xs text-[#777773]">
              5 minutes walk to Baščaršija &amp; Sebilj
            </span>
          </div>

          <div className="w-full h-[380px] sm:h-[460px] rounded-[24px] overflow-hidden border border-[#E7E7E3] bg-[#F7F7F5]">
            <iframe
              title="City Boutique Hotel Sarajevo Location Map"
              src={HOTEL_INFO.address.googleMapsEmbed}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
