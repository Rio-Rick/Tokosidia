"use server";

import { getUserByEmail } from "@/db/models/user";
import { addWishList, findUserWishList } from "@/db/models/wishList";
import { verifyToken } from "@/db/utils/jwt";
import { ObjectId } from "mongodb";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
type Payload = {
  id: string;
  email: string;
  iat: number;
};

export const onWishList = async (prodcutId: ObjectId) => {
  try {
    const cookiesStore = cookies();
    const access_token = cookiesStore.get("access_token");
    if (!access_token) {
      redirect("/login");
    }
    let payload = verifyToken(access_token.value) as Payload;
    const user = getUserByEmail(payload.email);
    if (!user) {
      redirect("/login");
    }
    let newProductId = new ObjectId(prodcutId);
    let userId = new ObjectId(payload.id);
    let alreadyWish = await findUserWishList(userId, newProductId);
    if (alreadyWish) {
      throw new Error("UwU");
    }
    if (!alreadyWish) {
      await addWishList(newProductId, userId);
      redirect("/wishlist");
    }
  } catch (error) {
    throw error
  } 
};
