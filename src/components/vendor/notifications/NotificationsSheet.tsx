"use client";
import { useState, useEffect } from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Image from "next/image";
import { getBookingsByBusiness, Booking } from "@/app/services/bookings";
import { Notifications } from "@/components/Icons";
import { format, isToday, isAfter, startOfDay } from "date-fns";


export default function NotificationsSheet() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const businessId = localStorage.getItem("nex_businessId");
    if (!businessId) return setLoading(false);

    getBookingsByBusiness(businessId)
      .then((data) => {
        const todayStart = startOfDay(new Date());
        const upcoming = data?.filter((b) => {
          const appt = new Date(b.appointmentDate);
          // include if it's today or after today
          return isToday(appt) || isAfter(appt, todayStart);
        });
        setBookings(upcoming);
      })
      .catch((err) => {
        console.error("Failed to load bookings:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="relative hover:text-primary transition flex flex-col items-center justify-center text-[#807E7E] font-medium">
          <Notifications />

          <p className="hidden sm:block">Notifications</p>
        </button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-full lg:max-w-[520px] xl:max-w-[590px]  p-4"
      >
        <SheetHeader>
          <SheetTitle className="text-[#6C35A7] text-[22px] sm:text-[24px]">
            Notifications
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-4 overflow-y-auto">
          {loading && <p>Loading…</p>}
          {!loading && (!bookings || bookings.length === 0) && (
            <div className="flex flex-col gap-10 justify-center items-center">
              <Image
                src="/empty.svg"
                alt="No services available"
                width={347}
                height={301}
              />
              <p className="text-center max-w-[343px] md:max-w-[487px] font-inter text-[13px] md:text-[18px] leading-[28px] md:leading-[34px]">
                You have not received any notifications yet, Share your website
                link to get started
              </p>
            </div>
          )}

          {bookings?.map((b) => {
            const { service, appointmentDate, time, customerPhoneNumber } = b;
            const date = format(new Date(appointmentDate), "d MMMM yyyy");

            return (
              <div
                key={b.id}
                className="flex flex-col border rounded-lg overflow-hidden"
              >
                {/* Top: image, title, price */}
                <div className="flex bg-[#F2F2F2] p-4 items-center justify-between">
                  <div className="flex gap-4">
                    <Image
                      src={service.imageUrl} // replace with actual image path
                      alt={service.title}
                      width={56}
                      height={56}
                      className="w-14 h-14 object-cover rounded-lg"
                    />
                    <div className="flex flex-col font-bold">
                      <h2 className="text-[15px] sm:text-[18px] text-[#6C35A7]">
                        {service.title}
                      </h2>
                      <p className="text-[12px] sm:text-[14px] font-inter">
                        NGN {service.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <p className="font-medium text-[14px] sm:text-[16px]">
                    View Details
                  </p>
                </div>

                {/* Bottom: date, time, contact */}
                <div className="flex bg-[#FFB049] justify-between p-4">
                  <div className="flex flex-col">
                    <h3 className="text-[14px] sm:text-[17px] font-medium">
                      Date
                    </h3>
                    <p className="text-[#6C35A7] text-[11px] sm:text-[14px] font-bold font-inter">
                      {date}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-[14px] sm:text-[17px] font-medium">
                      Time
                    </h3>
                    <p className="text-[#6C35A7] text-[11px] sm:text-[14px] font-bold font-inter">
                      {time}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-[14px] sm:text-[17px] font-medium">
                      Contact
                    </h3>
                    <p className="text-[#6C35A7] text-[11px] sm:text-[14px] font-bold font-inter">
                      {customerPhoneNumber}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
}
