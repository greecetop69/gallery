import React from "react";
import type { SVGProps } from "react";

export function PreviousIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M15.61 7.41L14.2 6l-6 6l6 6l1.41-1.41L11.03 12z"
      ></path>
    </svg>
  );
}
