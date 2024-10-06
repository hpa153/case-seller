"use server";

import { OrderStatus } from "@prisma/client";

import { db } from "@/db";
import { ITEMS_PER_PAGE } from "@/constants";

export const changeOrderStatus = async ({
  id,
  newStatus,
}: {
  id: string;
  newStatus: OrderStatus;
}) => {
  await db.order.update({
    where: { id },
    data: { status: newStatus },
  });
};

export const getOrders = async (
  isPaid: boolean | string,
  page: number,
  searchText?: string
) => {
  page -= 1;

  if (searchText) {
    const orders = await db.order.findMany({
      take: ITEMS_PER_PAGE,
      skip: Math.floor(ITEMS_PER_PAGE * page),
      where: {
        user: {
          email: { contains: searchText },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
        shippingAddress: true,
      },
    });

    const orderPages = await db.order.aggregate({
      _count: {
        id: true,
      },
      where: {
        user: {
          email: { contains: searchText },
        },
      },
    });

    return { orders, orderPages: orderPages._count.id / ITEMS_PER_PAGE };
  }

  if (isPaid === "all") {
    const orders = await db.order.findMany({
      take: ITEMS_PER_PAGE,
      skip: Math.floor(ITEMS_PER_PAGE * page),
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
        shippingAddress: true,
      },
    });

    const orderPages = await db.order.aggregate({
      _count: {
        id: true,
      },
    });

    return { orders, orderPages: orderPages._count.id / ITEMS_PER_PAGE };
  } else {
    const orders = await db.order.findMany({
      take: ITEMS_PER_PAGE,
      skip: Math.floor(ITEMS_PER_PAGE * page),
      where: {
        isPaid: isPaid as boolean,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
        shippingAddress: true,
      },
    });

    const orderPages = await db.order.aggregate({
      _count: {
        id: true,
      },
      where: {
        isPaid: isPaid as boolean,
      },
    });

    return { orders, orderPages: orderPages._count.id / ITEMS_PER_PAGE };
  }
};
