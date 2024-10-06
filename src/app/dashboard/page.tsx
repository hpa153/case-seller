import { notFound } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { db } from "@/db";
import Dashboard from "./Dashboard";
import { ITEMS_PER_PAGE } from "@/constants";

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const initialPages = await db.order.aggregate({
    _count: {
      id: true,
    },
  });

  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    return notFound();
  }

  const today = new Date();
  const weekStart = today.getDay() === 0 ? 7 : today.getDay() - 1;

  const lastWeekSum = await db.order.aggregate({
    where: {
      isPaid: true,
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - weekStart)),
      },
    },
    _sum: {
      amount: true,
    },
  });

  const lastMonthSum = await db.order.aggregate({
    where: {
      isPaid: true,
      createdAt: {
        gte: new Date(today.getFullYear(), today.getMonth(), 1),
      },
    },
    _sum: {
      amount: true,
    },
  });

  return (
    <Dashboard
      lastWeekSum={lastWeekSum._sum.amount ?? 0}
      lastMonthSum={lastMonthSum._sum.amount ?? 0}
      initialPages={initialPages._count.id / ITEMS_PER_PAGE}
    />
  );
};

export default Page;
