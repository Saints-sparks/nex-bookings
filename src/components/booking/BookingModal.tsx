// components/booking/BookingModal.tsx
"use client";
import { FC, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import BookingForm from "./BookingForm";

interface BookingModalProps {
  trigger: React.ReactNode;
  serviceId: string;
}

export const BookingModal: FC<BookingModalProps> = ({ trigger, serviceId }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="p-0 sm:max-w-[800px] max-w-screen sm:w-[800px] rounded-2xl max-h-[90vh] overflow-y-auto">
        <DialogTitle asChild>
          <span className="sr-only">Book a service</span>
        </DialogTitle>
        {/* pass onDone to close modal */}
        <BookingForm serviceId={serviceId} onDone={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};
