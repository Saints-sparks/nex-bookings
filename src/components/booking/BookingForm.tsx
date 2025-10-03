// components/booking/BookingForm.tsx
"use client";
import { FC, useState } from "react";
import { Calendar } from "../ui/calendar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createBooking } from "@/app/services/bookings";
import { getPaymentSummary, PaymentSummary } from "@/app/services/payments";
import PaymentSummaryModal from "@/components/vendor/PaymentSummaryModal";
import { toast } from "sonner";

interface BookingFormProps {
  serviceId: string;
  serviceImage?: string;
  onDone?: () => void; // called after successful booking (e.g. to close modal)
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

const BookingForm: FC<BookingFormProps> = ({
  serviceId,
  serviceImage,
  onDone,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPaymentSummary, setShowPaymentSummary] = useState(false);
  const [paymentSummary, setPaymentSummary] = useState<PaymentSummary | null>(
    null
  );

  const handleContinueToPayment = async () => {
    if (!phone || !selectedTime || !name) {
      setError("Please fill in all required fields and select a time slot.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const summary = await getPaymentSummary(serviceId);
      setPaymentSummary(summary);
      setShowPaymentSummary(true);
    } catch (error) {
      console.error("Failed to fetch payment summary:", error);
      setError("Failed to load payment summary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleMakePayment = async () => {
    if (!phone || !selectedTime || !name) {
      setError("Missing booking information.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Combine selected date and time into a proper datetime
      const [hour, minute] = selectedTime.split(":").map(Number);
      const appointmentDateTime = new Date(selectedDate);
      appointmentDateTime.setHours(hour, minute, 0, 0);

      await createBooking({
        appointmentDate: appointmentDateTime.toISOString(),
        bookedServiceId: serviceId,
        customerName: name,
        customerPhoneNumber: phone,
        time: selectedTime,
      });

      toast.success("Booking created successfully!");
      onDone?.();
    } catch (err: any) {
      setError(err.message || "Failed to send booking.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PaymentSummaryModal
        trigger={<div />}
        open={showPaymentSummary}
        onOpenChange={setShowPaymentSummary}
        paymentSummary={paymentSummary}
        serviceImage={serviceImage}
        onMakePayment={handleMakePayment}
        loading={loading}
        error={error}
      />

      <div className="flex flex-col sm:flex-row rounded-3xl bg-white overflow-auto">
        {/* Date Picker */}
        <div className="flex-1 p-6">
          <h3 className="font-[800] mb-4 text-[#212121] text-[20px]">
            Select Date
          </h3>
          <Calendar
            mode="single"
            fromDate={new Date()}
            selected={selectedDate}
            onSelect={(d) => d && setSelectedDate(d)}
            className="w-full flex justify-center my-calendar"
          />
        </div>

        {/* Time Slots */}
        <div className="flex flex-col min-w-[200px] p-6 border-t sm:border-t-0 sm:border-l sm:border-r border-gray-200 border-b sm:border-b-0 ">
          <h3 className="font-[800] mb-4 text-[20px] text-[#212121]">
            Select Time
          </h3>
          <ul className="timeGrid space-y-1 max-h-[300px] overflow-y-auto">
            {timeSlots.map((slot) => (
              <li key={slot}>
                <button
                  type="button"
                  onClick={() => setSelectedTime(slot)}
                  className={`w-full text-left px-4 py-2 rounded-md flex justify-center font-inter text-[16px] font-[500] ${
                    selectedTime === slot
                      ? "bg-[#6C35A7] text-white "
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
        <div className="flex-1 p-6 md:max-w-[320px] ">
          <h3 className="font-[800] mb-4 text-[20px] text-[#212121]">
            Personal Details
          </h3>
          <div className="group mb-2">
            <label className="text-[#807E7E] font-medium group-focus-within:text-[#6C35A7]">
              Phone Number
            </label>
            <Input
              placeholder="Phone Number*"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="p-5 rounded-full border-transparent focus-visible:border-[#6C35A7] focus-visible:ring-0 mt-2 bg-[#F6F6F6]"
            />
          </div>
          <div className="group mb-6">
            <label className="text-[#807E7E] font-medium group-focus-within:text-[#6C35A7]">
              Full Name
            </label>
            <Input
              placeholder="Full Name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-5 rounded-full border-transparent focus-visible:border-[#6C35A7] focus-visible:ring-0 mt-2 bg-[#F6F6F6]"
            />
          </div>
          <div className="group mb-6">
            <label className="text-[#807E7E] font-medium group-focus-within:text-[#6C35A7]">
              Email Address
            </label>
            <Input
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-5 rounded-full border-transparent focus-visible:border-[#6C35A7] focus-visible:ring-0 mt-2 bg-[#F6F6F6]"
            />
          </div>{" "}
          {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
          <Button
            onClick={handleContinueToPayment}
            disabled={loading}
            className="w-full bg-[#6C35A7] hover:bg-purple-700 py-6 font-medium text-[16px]"
          >
            {loading ? "Loading..." : "Continue to Payment"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default BookingForm;
