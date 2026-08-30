import { requiredUser } from "@/hooks/requiredUser";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const OrderPage = async () => {
  // const user = await requiredUser();

  return <div>OrderPage</div>;
};

export default OrderPage;
