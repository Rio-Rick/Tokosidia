import { ObjectId } from "mongodb";

export type WishListModel = {
  _id: ObjectId;
  userId: ObjectId;
  productId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export type WishListResponse<T> = {
  statusCode: number;
  message?: string;
  data?: T;
  error?: string;
};

export type UserListType<T, T1> = {
  _id: ObjectId;
  name: string;
  username: string;
  email: string;
  userWishList: T[];
  productWishList: T1[];
};
