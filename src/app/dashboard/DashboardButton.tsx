"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

import { getRequestedOrders } from "@/lib/queries";

type DashboardButtonProps = {
  variant: "default" | "outline" | "destructive";
  title: string;
  orderType: boolean | "all";
  setOrders: any;
  setPage: any;
  setTotalPages: any;
  setDropdownText: any;
};

const DashboardButton = ({
  variant,
  title,
  orderType,
  setOrders,
  setPage,
  setTotalPages,
  setDropdownText,
}: DashboardButtonProps) => {
  return (
    <DropdownMenuItem
      asChild
      className="text-sm gap-1 items-center p-1.5 cursor-default w-[88vw] md:w-[45vw] lg:w-[39vw]"
    >
      <Button
        variant={variant}
        onClick={() => {
          getRequestedOrders(orderType, setOrders, setPage, setTotalPages, 1);
          setDropdownText(title);
        }}
      >
        {title}
      </Button>
    </DropdownMenuItem>
  );
};

export default DashboardButton;
