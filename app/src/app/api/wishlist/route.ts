import { removeWishList, wishListProducts } from "@/db/models/wishList";
import { MainResponse, ProductModel } from "@/types/product.type";
import { UserListType, WishListModel } from "@/types/wishList.type";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const userId = request.headers.get("x-user-id");
  if (userId) {
    const data = await wishListProducts(userId);
    return NextResponse.json<
      MainResponse<UserListType<WishListModel, ProductModel>>
    >({
      statusCode: 200,
      data: data,
    });
  }
};

export const POST = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  let userId = searchParams.get("userId");
  let productId = searchParams.get("productId");
  if (userId && productId) {
    const data = await removeWishList(userId, productId);
    return NextResponse.json({
      statusCode: 201,
      data: data,
    });
  }
};
