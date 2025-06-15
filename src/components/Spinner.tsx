// components/Spinner.tsx
import React from "react";

export default function Spinner() {
  return (
    <div
      className="
        animate-spin 
        h-8 w-8
        border-3 
        border-t-transparent 
        border-[#6C35A7]
        rounded-full
      "
      aria-label="Loading"
    />
  );
}
