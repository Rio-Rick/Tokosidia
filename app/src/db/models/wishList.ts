import { UserListType, WishListModel } from "@/types/wishList.type";
import { getCollection } from "./getCollection";
import { ObjectId } from "mongodb";
import { ProductModel } from "@/types/product.type";

export type NewWishList = Omit<WishListModel, "_id">;

export const getWishList = async () => {
  const db = await getCollection();
  const wishList = (await db
    .collection("wishlist")
    .find()
    .toArray()) as WishListModel[];

  return wishList;
};

export const addWishList = async (productId: ObjectId, userId: ObjectId) => {
  const db = await getCollection();
  const data = {
    productId,
    userId,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const newWishList = await db.collection("wishlist").insertOne(data);

  const wishList = (await db.collection("wishlist").findOne({
    _id: newWishList.insertedId,
  })) as WishListModel;

  return wishList;
};

export const findUserWishList = async (userId: ObjectId, productId: ObjectId) => {
  const db = await getCollection();

  const userWishList = (await db.collection("wishlist").findOne({
    userId,
    productId
  })) as WishListModel;

  return userWishList;
};

export const removeWishList = async (userId: string, productId: string) => {
  const db = await getCollection();

  let user = new ObjectId(userId)
  let product = new ObjectId(productId)
  const removeWishList = await db.collection("wishlist").deleteOne({
    userId: user,
    productId: product
  });

  return removeWishList;
};

export const wishListProducts = async (_id: string) => {
  let newId = new ObjectId(_id);
  const db = await getCollection();
  let agg = [
    {
      $match: {
        _id: newId,
      },
    },
    {
      $lookup: {
        from: "wishlist",
        localField: "_id",
        foreignField: "userId",
        as: "userWishList",
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "userWishList.productId",
        foreignField: "_id",
        as: "productWishList",
      },
    },
    { $project: { password: 0 } },
  ];
  const wishListProducts = await db
    .collection("users")
    .aggregate(agg)
    .toArray();
  let data = wishListProducts[0];

  return data as UserListType<WishListModel, ProductModel>;
};
