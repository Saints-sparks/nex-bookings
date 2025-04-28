"use client";
import { FC, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "../ui/calendar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createBooking } from "@/app/services/bookings";

interface BookingModalProps {
  trigger: React.ReactNode;
  serviceId: string;
}

const timeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
];

export const BookingModal: FC<BookingModalProps> = ({ trigger, serviceId }) => {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!phone || !selectedTime) {
      setError("Please enter your phone number and pick a time slot.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Combine date + time into a single Date object
      const [hour, minute] = selectedTime.split(":").map(Number);
      const dt = new Date(selectedDate!);
      dt.setHours(hour, minute, 0, 0);

      //  Serialize to ISO 8601 (RFC 3339)
      const appointmentDateTime = dt.toISOString();

      //  Call your service
      await createBooking({
        appointmentDate: appointmentDateTime,
        bookedServiceId: serviceId,
        customerName: name,
        customerPhoneNumber: phone,
        time: selectedTime,
      });

      setOpen(false);
    } catch (err: any) {
      setError(err.message || "Failed to send booking.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="p-0 sm:max-w-[800px] max-w-[300px] sm:w-[800px] rounded-2xl max-h-[90vh] overflow-hidden">
        <DialogTitle asChild>
          <span className="sr-only">Book a service</span>
        </DialogTitle>
        <div className="flex flex-col sm:flex-row rounded-3xl">
          {/* Date Picker */}
          <div className="flex-1 p-6 bg-white rounded-3xl">
            <h3 className="font-[800] mb-4">Select Date</h3>
            <Calendar
              mode="single"
              fromDate={new Date()}
              selected={selectedDate}
              onSelect={(d) => d && setSelectedDate(d)}
              className="w-full"
            />
          </div>

          {/* Time Slots */}
          <div className="flex-1 p-6 bg-white border-t sm:border-t-0 sm:border-l sm:border-r border-gray-200">
            <h3 className="font-[800] mb-4">Select Time</h3>
            <ul className="space-y-1 max-h-[300px] overflow-y-auto">
              {timeSlots.map((slot) => (
                <li key={slot}>
                  <button
                    type="button"
                    onClick={() => setSelectedTime(slot)}
                    className={`w-full text-left px-4 py-2 rounded-md ${
                      selectedTime === slot
                        ? "bg-[#FFB049] text-black"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {slot}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Personal Details */}
          <div className="flex-1 p-6 bg-white relative rounded-3xl max-w-[320px]">
            <h3 className="font-[800] mb-4">Personal Details</h3>
            <div className="group mb-2">
              <label
                htmlFor="phone"
                className="text-[#807E7E] font-medium group-focus-within:text-[#6C35A7]"
              >
                Phone Number
              </label>
              <Input
                placeholder="Phone Number*"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="p-5 rounded-full border border-transparent focus-visible:border-[#6C35A7] focus-visible:ring-0 mt-2 shadow-none bg-[#F6F6F6]"
              />
            </div>
            <div className="group mb-6">
              <label
                htmlFor="name"
                className="text-[#807E7E] font-medium group-focus-within:text-[#6C35A7]"
              >
                Full Name (optional)
              </label>
              <Input
                placeholder="Full Name (optional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-5 rounded-full border border-transparent focus-visible:border-[#6C35A7] focus-visible:ring-0 mt-2 shadow-none bg-[#F6F6F6]"
              />
            </div>

            {/* Error Message */}

            {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-[#6C35A7] hover:bg-purple-700 py-6 px-10 font-medium text-[16px]"
            >
              {loading ? "Booking..." : "Send Booking"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
