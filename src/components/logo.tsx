// src/components/logo.tsx
import { cn } from "@/lib/utils";
import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={cn("text-primary", props.className)}
      {...props}
    >
      <g fill="currentColor">
        {/* '4' shape */}
        <polygon points="50,10 50,50 20,50 20,60 60,60 60,10" />
        
        {/* 'A' shape */}
        <polygon points="70,90 85,50 100,90" />
        <rect x="75" y="70" width="20" height="5" />

        {/* 'I' shape */}
        <rect x="30" y="70" width="10" height="20" />
      </g>
    </svg>
  );
}
