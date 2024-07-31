"use client";
import { FC } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "~/components/ui/pagination";

interface PaginationProps {
  pageCount: number;
  onPageChange: (page: number) => void;
}

interface PaginationArrowProps {
  direction: "left" | "right";
  href: string;
  isDisabled: boolean;
  onClick: () => void;
}

const PaginationArrow: FC<PaginationArrowProps> = ({
  direction,
  href,
  isDisabled,
  onClick,
}) => {
  const isLeft = direction === "left";
  const disabledClassName = isDisabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <Button
      onClick={onClick}
      className={`bg-gray-100 text-gray-500 hover:bg-gray-200 ${disabledClassName}`}
      aria-disabled={isDisabled}
      disabled={isDisabled}
    >
      {isLeft ? "«" : "»"}
    </Button>
  );
};

export function PaginationComponent({
  pageCount,
  onPageChange,
}: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const handleLeftClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleRightClick = () => {
    if (currentPage < pageCount) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationArrow
            direction="left"
            href={createPageURL(currentPage - 1)}
            isDisabled={currentPage <= 1}
            onClick={handleLeftClick}
          />
        </PaginationItem>
        <PaginationItem>
          <span className="p-2 font-semibold text-gray-500">
            Page {currentPage}
          </span>
        </PaginationItem>
        <PaginationItem>
          <PaginationArrow
            direction="right"
            href={createPageURL(currentPage + 1)}
            isDisabled={currentPage >= pageCount}
            onClick={handleRightClick}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
