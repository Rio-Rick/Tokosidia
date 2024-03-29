import { hashPassword } from "../utils/bcrypt";
import { UserModel } from "@/types/user.type";
import { getCollection } from "./getCollection";

export type Register = Omit<UserModel, "_id">;

export const getUsers = async () => {
  const db = await getCollection();
  const users = (await db
    .collection("users")
    .find()
    .project({ password: 0 })
    .toArray()) as UserModel[];

  return users;
};

export const createUser = async (payload: Register) => {
  const db = await getCollection();
  payload.password = hashPassword(payload.password);

  const addUser = await db.collection("users").insertOne(payload);

  const user = (await db.collection("users").findOne({
    _id: addUser.insertedId,
  })) as UserModel;

  return user;
};

export const getUserByEmail = async (email: string) => {
  const db = await getCollection();
  const user = (await db.collection("users").findOne({
    email,
  })) as UserModel;

  return user;
};
