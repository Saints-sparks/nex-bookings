"use client"
// components/BookingModal.tsx
// import { FC, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
// import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { FC, useState } from "react";

interface BookingModalProps {
  trigger: React.ReactNode;
}

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00",
  "11:30", "12:00", "12:30", "13:00", "13:30",
  // …etc
];

export const BookingModal: FC<BookingModalProps> = ({ trigger }) => {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="p-0 sm:max-w-[5000px] max-w-[300px]  sm:w-[800px] rounded-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex flex-col sm:flex-row rounded-3xl">
          {/* ─── Date Picker ─── */}
          <div className="flex-1 flex flex-col justify-center sm:justify-start items-center p-6 bg-white rounded-3xl max-w-[320px]">
            <h3 className="font-[800] mb-4 text-left w-full pl-3">Select Date</h3>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={date => setSelectedDate(date ?? selectedDate)}
              className="w-full my-calendar"
            />
          </div>

          {/* ─── Time Slots ─── */}
          <div className="flex-1 border-l border-r border-gray-200 p-6 bg-white max-w-[160px]">
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

          {/* ─── Personal Details ─── */}
          <div className="flex-1 p-6 bg-white relative rounded-3xl max-w-[320px]">
            {/* <DialogClose className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              ✕
            </DialogClose> */}
            <h3 className="font-[800] mb-4">Personal Details</h3>
           <div className="group mb-2">
              <label
                htmlFor="phone"
                className="text-[#807E7E] font-medium group-focus-within:text-[#6C35A7]"
              >
                Phone Number
              </label>
              <Input
                id="phone"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="234 667 889 5667"
                required
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
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="234 667 889 5667"
                required
                className="p-5 rounded-full border border-transparent focus-visible:border-[#6C35A7] focus-visible:ring-0 mt-2 shadow-none bg-[#F6F6F6]"
              />
            </div>
            <Button
              type="submit"
              className="w-full sm:w-auto bg-[#6C35A7] hover:bg-purple-700 rounded-full py-6 px-10 font-medium text-[16px] mt-4"
            >
              Send Booking
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
