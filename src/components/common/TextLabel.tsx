import React from "react";
import { motion } from "framer-motion";

interface TextLabelProps {
  text: string | React.ReactNode;
  required?: boolean;
  color?: string;
  variant?: string;
  className?: string;
}

export default function TextLabel({
  text,
  required = false,
  color = "secondary",
  variant = "default",
  className = "",
}: TextLabelProps) {
  const getColorClass = () => {
    switch (color) {
      case "white":
        return "text-white";
      case "green":
        return "text-green-600";
      case "green-100":
        return "text-green-200";
      case "gray":
        return "text-gray-600";
      default:
        return "text-secondary";
    }
  };

  const getVariantClass = () => {
    switch (variant) {
      case "tag":
        return "text-sm font-medium";
      case "button":
        return "text-sm font-semibold";
      case "nav":
        return "text-base font-medium";
      default:
        return "text-sm sm:text-base font-medium";
    }
  };

  return (
    <label
      className={`block ${getColorClass()} ${getVariantClass()} ${className}`}
    >
      {text} {required && <span className="text-red-500">*</span>}
    </label>
  );
}
