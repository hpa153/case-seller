import { getOrders } from "@/app/dashboard/actions";

export const getRequestedOrders = async (
  orderType: "all" | boolean,
  setOrders: any,
  setPage: any,
  setTotalPages: any,
  page: number,
  searchText?: string
) => {
  const orders = await getOrders(orderType, page, searchText);

  setOrders(orders.orders);
  const totalPages = Math.ceil(orders.orderPages) || 1;
  setTotalPages(totalPages);

  if (page > totalPages) {
    setPage(1);
  }
};
