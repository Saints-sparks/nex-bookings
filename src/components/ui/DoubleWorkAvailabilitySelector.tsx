"use client";

import React, { useState, useEffect } from "react";
import { Toggle } from "@/components/ui/toggle";
import {
  getBusinessWorkingHours,
  updateBusinessWorkingHours,
} from "@/app/services/business";

interface DaySchedule {
  day: string;
  isToggled: boolean;
  startTime: string;
  endTime: string;
}

const daysOfWeek: string[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const WorkingHoursSelectorDouble = () => {
  const [schedule, setSchedule] = useState<DaySchedule[]>(
    daysOfWeek.map((day) => ({
      day,
      isToggled: false,
      startTime: "09:00",
      endTime: "17:00",
    }))
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const businessId =
      typeof window !== "undefined"
        ? localStorage.getItem("nex_businessId")
        : null;
    if (!businessId) return;
    setLoading(true);
    setError(null);
    getBusinessWorkingHours(businessId)
      .then((data) => {
        setSchedule(
          daysOfWeek.map((day) => {
            const found = data.find((d) => d.day === day);
            return found
              ? {
                  day,
                  isToggled: found.isOpen,
                  startTime: found.openTime || "09:00",
                  endTime: found.closeTime || "17:00",
                }
              : {
                  day,
                  isToggled: false,
                  startTime: "09:00",
                  endTime: "17:00",
                };
          })
        );
      })
      .catch(() => setError("Could not load working hours"))
      .finally(() => setLoading(false));
  }, []);

  const handleToggle = (dayName: string) => {
    if (!editMode) return;
    setSchedule((prevSchedule) =>
      prevSchedule.map((day) =>
        day.day === dayName ? { ...day, isToggled: !day.isToggled } : day
      )
    );
  };

  const handleTimeChange = (
    dayName: string,
    type: "startTime" | "endTime",
    value: string
  ) => {
    if (!editMode) return;
    setSchedule((prevSchedule) =>
      prevSchedule.map((day) =>
        day.day === dayName ? { ...day, [type]: value } : day
      )
    );
  };

  // Helper to ensure 24hr format (HH:mm)
  const to24Hour = (time: string) => {
    if (!time) return "";
    // If already in HH:mm, return as is
    if (/^\d{2}:\d{2}$/.test(time)) return time;
    // Try to parse and format
    const d = new Date(`1970-01-01T${time}`);
    if (isNaN(d.getTime())) return time;
    const h = d.getHours().toString().padStart(2, "0");
    const m = d.getMinutes().toString().padStart(2, "0");
    return `${h}:${m}`;
  };

  const handleEditOrSave = async () => {
    if (!editMode) {
      setEditMode(true);
      return;
    }
    // Save mode
    setSaving(true);
    setSaveError(null);
    setSaveSuccess(false);
    const businessId =
      typeof window !== "undefined"
        ? localStorage.getItem("nex_businessId")
        : null;
    if (!businessId) {
      setSaveError("Missing business ID");
      setSaving(false);
      return;
    }
    try {
      await updateBusinessWorkingHours(
        businessId,
        schedule.map((d) => ({
          day: d.day,
          isOpen: d.isToggled,
          openTime: d.isToggled ? to24Hour(d.startTime) : "",
          closeTime: d.isToggled ? to24Hour(d.endTime) : "",
        }))
      );
      setSaveSuccess(true);
      setEditMode(false);
      setTimeout(() => setSaveSuccess(false), 2000);
    } catch (err: any) {
      setSaveError(err.message || "Failed to update working hours");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading working hours…</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col gap-4 w-full max-w-full sm:grid sm:grid-cols-2">
        {schedule.map((day) => (
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
            <div className="flex items-center justify-between gap-2">
              <div className="bg-[#F6F6F6] pl-2 rounded-bl-3xl w-1/2">
                <input
                  type="time"
                  className="p-2 border border-transparent focus:outline-none focus:ring-0 focus:border-[#6C35A7] mt-2 shadow-none bg-[#F6F6F6] w-full rounded-bl-3xl"
                  value={day.startTime}
                  onChange={(e) =>
                    handleTimeChange(day.day, "startTime", e.target.value)
                  }
                  disabled={!editMode}
                />
              </div>
              <div className="bg-[#F6F6F6] pl-2 rounded-br-3xl w-1/2">
                <input
                  type="time"
                  className="p-2 border border-transparent focus:outline-none focus:ring-0 focus:border-[#6C35A7] mt-2 shadow-none bg-[#F6F6F6] w-full rounded-br-3xl gap-2"
                  value={day.endTime}
                  onChange={(e) =>
                    handleTimeChange(day.day, "endTime", e.target.value)
                  }
                  disabled={!editMode}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        className="mt-6 px-8 py-3 rounded-full bg-[#6C35A7] text-white font-semibold hover:bg-purple-700 disabled:opacity-50"
        onClick={handleEditOrSave}
        disabled={saving}
      >
        {saving
          ? "Saving..."
          : editMode
          ? "Save Working Hours"
          : "Edit Working Hours"}
      </button>
      {saveError && <div className="text-red-500 mt-2">{saveError}</div>}
      {saveSuccess && (
        <div className="text-green-600 mt-2">Working hours updated!</div>
      )}
    </div>
  );
};

export default WorkingHoursSelectorDouble;
