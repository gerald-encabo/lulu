import { requiredUser } from "@/hooks/requiredUser";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

export const OrderPage = async () => {
  const user = await requiredUser();

  return <div>OrderPage</div>;
};
