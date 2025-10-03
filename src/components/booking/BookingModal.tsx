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
  serviceImage?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const BookingModal: FC<BookingModalProps> = ({
  trigger,
  serviceId,
  serviceImage,
  open: externalOpen,
  onOpenChange: externalOnOpenChange,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);

  const open = externalOpen !== undefined ? externalOpen : internalOpen;
  const onOpenChange = externalOnOpenChange || setInternalOpen;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="p-0 sm:max-w-[800px] max-w-screen sm:w-[800px] rounded-2xl max-h-[90vh] overflow-y-auto">
        <DialogTitle asChild>
          <span className="sr-only">Book a service</span>
        </DialogTitle>
        <BookingForm
          serviceId={serviceId}
          serviceImage={serviceImage}
          onDone={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
};
