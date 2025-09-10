"use client"

import React, { useState } from "react"
import { ToggleLeft, ToggleRight } from "lucide-react"
import { Toggle } from "@/components/ui/toggle"

interface DaySchedule {
  day: string;
  isToggled: boolean;
  startTime: string;
  endTime: string;
}

const WorkingHoursSelector = () => {
  const daysOfWeek: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  const [schedule, setSchedule] = useState<DaySchedule[]>(
    daysOfWeek.map(day => ({
      day,
      isToggled: false,
      startTime: '09:00',
      endTime: '17:00'
    }))
  );

  const handleToggle = (dayName: string) => {
    setSchedule(prevSchedule =>
      prevSchedule.map(day =>
        day.day === dayName ? { ...day, isToggled: !day.isToggled } : day
      )
    );
  };

  const handleTimeChange = (dayName: string, type: "startTime" | "endTime", value: string) => {
    setSchedule(prevSchedule =>
      prevSchedule.map(day =>
        day.day === dayName ? { ...day, [type]: value } : day
      )
    );
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-4">
        {schedule.map(day => (
          <div key={day.day} className="bg-[#FFEAD0] rounded-3xl">
            <div className="flex items-center justify-between p-2">
              <label className="text-[#6C35A7] font-semibold text-xl pl-2">
                {day.day}
              </label>
              <div className="pr-2">
                <Toggle
                  checked={day.isToggled}
                  onChange={() => handleToggle(day.day)}
                />
              </div>
            </div>
            {day.isToggled && (
              <div className="flex items-center gap-24 justify-between">
                <div className="bg-[#F6F6F6] pl-2 rounded-bl-3xl w-1/2">
                  <input
                    type="time"
                    className="p-2 border border-transparent focus:outline-none focus:ring-0 focus:border-[#6C35A7] mt-2 shadow-none bg-[#F6F6F6] w-full  rounded-bl-3xl"
                    value={day.startTime}
                    onChange={(e) => handleTimeChange(day.day, 'startTime', e.target.value)}
                  />
                </div>
               <div className="bg-[#F6F6F6] pl-2 rounded-br-3xl w-1/2">
                  <input
                    type="time"
                    className="p-2 border border-transparent focus:outline-none focus:ring-0 focus:border-[#6C35A7] mt-2 shadow-none bg-[#F6F6F6] w-full rounded-br-3xl"
                    value={day.endTime}
                    onChange={(e) => handleTimeChange(day.day, 'endTime', e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkingHoursSelector;
