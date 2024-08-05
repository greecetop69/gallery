"use client";
import { useEffect, type FC, useCallback } from "react";
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

export function PaginationComponent({ pageCount }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = Number(searchParams.get("page")) || 1;
  const t = useTranslations("MainPage");

  const createPageURL = useCallback(
    (pageNumber: number | string) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", pageNumber.toString());
      return `${pathname}?${params.toString()}`;
    },
    [pathname, searchParams],
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      router.push(createPageURL(newPage));
    },
    [createPageURL, router],
  );

  useEffect(() => {
    if (currentPage > pageCount) {
      handlePageChange(pageCount);
    }
  }, [ pageCount, currentPage, handlePageChange]);

  const handleLeftClick = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleRightClick = () => {
    if (currentPage < pageCount) {
      handlePageChange(currentPage + 1);
    }
  };

  return (
    <>
      {pageCount > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationArrow
                direction="left"
                isDisabled={currentPage <= 1}
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
                isDisabled={currentPage >= pageCount}
                onClick={handleRightClick}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
}
