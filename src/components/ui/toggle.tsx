"use client"

import * as React from "react"
import { ToggleLeft, ToggleRight } from "lucide-react"

import { cn } from "@/lib/utils"

interface ToggleProps {
  className?: string;
  checked?: boolean;
  onChange: (checked: boolean) => void;
}

const Toggle: React.FC<ToggleProps> = ({
  className,
  checked = false,
  onChange,
  ...props
}) => {
  return (
    <div
      onClick={() => onChange(!checked)}
      className={cn(
        "inline-flex items-center cursor-pointer transition-colors duration-200",
        className
      )}
      {...props}
    >
      {checked ? (
        <ToggleRight className="h-9 w-9 text-[#6C35A7]" />
      ) : (
        <ToggleLeft className="h-9 w-9 text-gray-400" />
      )}
    </div>
  )
}

export { Toggle }