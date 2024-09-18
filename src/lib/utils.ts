import { BASE_PRICE, PRODUCT_PRICES } from "@/constants";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Split samples into certain numbers of columns
export const splitArray = <T>(array: Array<T>, numParts: number) => {
  const result: Array<Array<T>> = [];

  for (let i = 0; i < array.length; i++) {
    const idx = i % numParts;

    if (!result[idx]) {
      result[idx] = [];
    }

    result[idx].push(array[i]);
  }

  return result;
};

export const calcTotalPrice = (finish: string, material: string) => {
  let price = BASE_PRICE;

  if (finish === "textured") price += PRODUCT_PRICES.finish.textured;

  if (material === "polycarbonate")
    price += PRODUCT_PRICES.material.polycarbonate;

  return price;
};

export const formatPrice = (price: number) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return formatter.format(price);
};

export const base64ToBlob = (base64: string, mimeType: string) => {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);

  return new Blob([byteArray], { type: mimeType });
};
