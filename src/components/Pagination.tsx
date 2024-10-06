"use client";

import { KeyboardEvent, useState } from "react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "@/hooks/use-toast";

const Pagination = ({
  page,
  totalPages,
  setPage,
}: {
  page: number;
  totalPages: number;
  setPage: any;
}) => {
  const [pageValue, setPageValue] = useState<string>(page.toString());

  const onMoveClick = (btnType: "prev" | "next") => {
    const nextPage = btnType === "next" ? Number(page) + 1 : Number(page) - 1;
    setPageValue(nextPage.toString());
    setPage(nextPage);
  };

  const onPageEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const numRegex = /\d$/g;

    if (e.key === "Enter") {
      if (+pageValue > totalPages || +pageValue < 1) {
        toast({
          title: "Invalid page number!",
          description: `Please enter a page number within the range of 1 and ${totalPages}.`,
          variant: "destructive",
        });
        setPageValue(page.toString());
        return;
      }

      setPage(+pageValue);
    } else if (e.key.match(numRegex)) {
      setPageValue((pre) => pre + e.key.toString());
    } else if (e.key === "Backspace") {
      setPageValue((pre) => pre.slice(0, -1));
    } else {
      toast({
        title: "Invalid page number!",
        description: `Please enter a page number within the range of 1 and ${totalPages}.`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex justify-between px-4">
      <Button
        size="lg"
        variant="outline"
        className="w-28"
        onClick={() => onMoveClick("prev")}
        disabled={Number(page) <= 1}
      >
        Previous
      </Button>
      <div className="w-fit flex flex-center justify-center border border-gray-300 rounded-md overflow-hidden">
        <Input
          type="text"
          onBlur={() => setPageValue(page.toString())}
          defaultValue={pageValue}
          onKeyDown={(e) => onPageEnter(e)}
          className="w-12 xs:w-16 sm:w-28 text-[15px] text-right h-auto border-0 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          id="search-box"
        />
        <div className="w-12 xs:w-16 sm:w-28 flex items-center bg-white">
          <p className="text-[15px]">
            /&nbsp;&nbsp;
            {totalPages}
          </p>
        </div>
      </div>

      <Button
        size="lg"
        variant="outline"
        className="w-28"
        onClick={() => onMoveClick("next")}
        disabled={Number(page) >= totalPages}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
