"use client";
import { type FC } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "~/components/ui/pagination";
import { useTranslations } from "next-intl";
import { PreviousIcon } from "~/app/icons/PreviousIcon";
import { NextIcon } from "~/app/icons/NextIcon";

interface PaginationProps {
  pageCount: number;
  isDisabled: boolean;
}

interface PaginationArrowProps {
  direction: "left" | "right";
  isDisabled: boolean;
  onClick: () => void;
}

const PaginationArrow: FC<PaginationArrowProps> = ({
  direction,
  isDisabled,
  onClick,
}) => {
  const isLeft = direction === "left";
  const disabledClassName = isDisabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <Button
      onClick={onClick}
      className={`bg-gray-100 text-gray-500 hover:bg-gray-200 ${disabledClassName} !p-2`}
      aria-disabled={isDisabled}
      disabled={isDisabled}
    >
      {isLeft ? (
        <PreviousIcon width={24} height={24} />
      ) : (
        <NextIcon width={24} height={24} />
      )}
    </Button>
  );
};

export function PaginationComponent({
  pageCount,
  isDisabled,
}: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = Number(searchParams.get("page")) || 1;
  const t = useTranslations("MainPage");

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const handlePageChange = (newPage: number) => {
    router.push(createPageURL(newPage));
  };

  const handleLeftClick = () => {
    if (currentPage > 1 && !isDisabled) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleRightClick = () => {
    if (currentPage < pageCount && !isDisabled) {
      handlePageChange(currentPage + 1);
    }
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationArrow
            direction="left"
            isDisabled={currentPage <= 1 || isDisabled}
            onClick={handleLeftClick}
          />
        </PaginationItem>
        <PaginationItem>
          <span className="p-2 font-semibold text-gray-500">
            {t("page")} {currentPage}
          </span>
        </PaginationItem>
        <PaginationItem>
          <PaginationArrow
            direction="right"
            isDisabled={currentPage >= pageCount || isDisabled}
            onClick={handleRightClick}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
