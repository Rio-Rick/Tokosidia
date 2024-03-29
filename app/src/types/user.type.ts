import { ObjectId } from "mongodb";

export type UserModel = {
  _id: ObjectId;
  name: string;
  username: string;
  email: string;
  password: string;
};

export type UserResponse<T> = {
  statusCode: number;
  message?: string;
  data?: T;
  error?: string;
};
