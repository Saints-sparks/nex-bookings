// components/vendor/WorkingHoursModal.tsx
"use client";
import { FC } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

interface WorkingHour {
  day: string;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
}

interface WorkingHoursModalProps {
  trigger: React.ReactNode;
  workingHours: WorkingHour[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WorkingHoursModal: FC<WorkingHoursModalProps> = ({
  trigger,
  workingHours,
  open,
  onOpenChange,
}) => {
  const formatTime = (time: string) => {
    if (!time) return "";
    const [hour, minute] = time.split(":");
    const hourNum = parseInt(hour);
    const ampm = hourNum >= 12 ? "PM" : "AM";
    const displayHour =
      hourNum > 12 ? hourNum - 12 : hourNum === 0 ? 12 : hourNum;
    return `${displayHour.toString().padStart(2, "0")}:${minute} ${ampm}`;
  };

  // Filter to only show days that are open
  const openDays = workingHours.filter((day) => day.isOpen);

  // Group open days into pairs for the 2-column layout
  const pairedDays = [];
  for (let i = 0; i < openDays.length; i += 2) {
    pairedDays.push([openDays[i], openDays[i + 1]].filter(Boolean));
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="p-0 sm:max-w-[1040px] max-w-screen rounded-3xl max-h-[90vh] overflow-y-auto">
        <DialogTitle asChild>
          <span className="sr-only">Working Hours</span>
        </DialogTitle>
        <div className="flex flex-col p-8 bg-white rounded-3xl">
          <h2 className="text-[22px] text-[#212121] font-bold mb-6">
            Working Hours
          </h2>

          <div className="space-y-4">
            {pairedDays.map((dayPair, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {dayPair.map((workingHour) => (
                  <div
                    key={workingHour.day}
                    className="bg-[#FFEAD0] rounded-3xl p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-[#6C35A7] font-semibold text-lg">
                        {workingHour.day}
                      </label>
                    </div>

                    {/* Only show open/close times since we're only displaying open days */}
                    <div className="flex items-center justify-between">
                      <div className="bg-[#F6F6F6] rounded-xl px-3 py-2 flex-1 mr-2">
                        <span className=" font-medium font-inter">
                          {formatTime(workingHour.openTime)}
                        </span>
                      </div>
                      <div className="text-gray-400 px-2">••••••••••••</div>
                      <div className="bg-[#F6F6F6] rounded-xl px-3 py-2 flex-1 ml-2">
                        <span className="text-sm font-medium font-inter">
                          {formatTime(workingHour.closeTime)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WorkingHoursModal;
