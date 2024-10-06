"use client";

import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";

import { formatPrice } from "@/lib/utils";
import { getRequestedOrders } from "@/lib/queries";
import StatusDropdown from "./StatusDropdown";
import DashboardCard from "./DashboardCard";
import DashboardButton from "./DashboardButton";
import Pagination from "@/components/Pagination";
import Search from "@/components/Search";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const dashboardButtons = [
  { title: "All", orderType: "all", variant: "outline" },
  { title: "Paid", orderType: true, variant: "default" },
  { title: "Unpaid", orderType: false, variant: "destructive" },
];

const Dashboard = ({
  lastWeekSum,
  lastMonthSum,
  initialPages,
}: {
  lastWeekSum: number;
  lastMonthSum: number;
  initialPages: number;
}) => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number>(Math.ceil(initialPages));
  const [query, setQuery] = useState("");
  const [orders, setOrders] = useState([]);
  const [dropdownText, setDropdownText] = useState("All");

  useEffect(() => {
    getRequestedOrders("all", setOrders, setPage, setTotalPages, page, query);
  }, [query, page]);

  const WEEKLY_GOAL = 500;
  const MONTHLY_GOAL = 2500;

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <div className="max-w-7xl w-full mx-auto flex flex-col sm:gap-4 sm:py-4">
        <div className="flex flex-col gap-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <DashboardCard
              sum={lastWeekSum}
              title="This Week"
              goal={WEEKLY_GOAL}
            />
            <DashboardCard
              sum={lastMonthSum}
              title="This Month"
              goal={MONTHLY_GOAL}
            />
          </div>

          <h1 className="text-4xl font-bold tracking-tight">My orders</h1>

          <section className="grid grid-cols-1 w-full md:grid-cols-2 gap-2 px-8">
            <Search setQuery={setQuery} />
            <div className="flex flex-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="w-full">
                  <Button
                    variant={
                      dropdownText === "All"
                        ? "outline"
                        : dropdownText === "Paid"
                        ? "default"
                        : "destructive"
                    }
                  >
                    {dropdownText} Orders
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="flex flex-col gap-1 w-full">
                  {dashboardButtons.map((button, i) => (
                    <DashboardButton
                      key={i}
                      title={button.title}
                      orderType={button.orderType as "all" | boolean}
                      variant={
                        button.variant as "default" | "outline" | "destructive"
                      }
                      setOrders={setOrders}
                      setPage={setPage}
                      setTotalPages={setTotalPages}
                      setDropdownText={setDropdownText}
                    />
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </section>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead className="hidden sm:table-cell">
                  Order date
                </TableHead>
                <TableHead className="hidden sm:table-cell">Paid</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {orders.map((order: any) => (
                <TableRow key={order.id} className="bg-accent">
                  <TableCell>
                    <div className="font-medium">
                      {order.shippingAddress?.name}
                    </div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      {order.user.email}
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <StatusDropdown id={order.id} orderStatus={order.status} />
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {order.createdAt.toLocaleDateString()}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {order.isPaid ? (
                      <Check className="text-green-700" />
                    ) : (
                      <X className="text-red-700" />
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatPrice(order.amount)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination page={page} totalPages={totalPages} setPage={setPage} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
