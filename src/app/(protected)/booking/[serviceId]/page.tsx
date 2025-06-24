// app/booking/[serviceId]/page.tsx
"use client";
import { useParams, useRouter } from "next/navigation";
import BookingForm from "@/components/booking/BookingForm";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Left } from "@/components/Icons";

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();

  // Normalize serviceId into a single string
  const rawId = params.serviceId;
  const serviceId = Array.isArray(rawId) ? rawId[0] : rawId;

  // If it’s ever undefined, bail out
  if (!serviceId) {
    return <p className="p-4 text-red-600">Invalid service ID.</p>;
  }

  return (
    <div className="min-h-screen flex flex-col ">
      <header className="p-4  text-lg font-bold flex items-center">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mr-2 text-white"
        >
          <Left />
        </Button>
        <span className="font-bold self-end">Book a Service</span>
      </header>
      <main className="flex-1 overflow-y-auto p-3">
        <BookingForm
          serviceId={serviceId}
          onDone={() => {
            toast.success("Booking sent successfully!");
            router.push("/");
          }}
        />
      </main>
    </div>
  );
}
