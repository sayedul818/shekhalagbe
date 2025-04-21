import React from "react";
import { LucideProps } from "lucide-react";
import { cn } from "@/lib/utils";

const FileCheck = React.forwardRef<
  SVGSVGElement,
  React.SVGProps<SVGSVGElement> & LucideProps
>(({ className, ...props }, ref) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    ref={ref}
    className={cn("lucide lucide-file-check", className)}
    {...props}
  >
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <path d="m9 15 2 2 4-4" />
  </svg>
));

FileCheck.displayName = "FileCheck";

export { FileCheck };
