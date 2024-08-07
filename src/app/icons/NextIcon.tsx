import React from "react";
import type { SVGProps } from "react";

export function NextIcon(props: SVGProps<SVGSVGElement>) {
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
        d="M10.02 6L8.61 7.41L13.19 12l-4.58 4.59L10.02 18l6-6z"
      ></path>
    </svg>
  );
}
