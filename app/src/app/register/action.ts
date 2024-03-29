"use server";
import { createUser, getUserByEmail } from "@/db/models/user";
import { redirect } from "next/navigation";
import { z } from "zod";

export const onRegister = async (formdata: FormData) => {
  const url = process.env.NEXT_PUBLIC_BASE_URL;
  const registerInputSchema = z.object({
    name: z.string().trim().min(1, { message: "name is required" }),
    username: z.string().trim().min(1, { message: "username is required" }),
    email: z
      .string()
      .trim()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email addresss " }),
    password: z
      .string()
      .trim()
      .min(5, { message: "Minimum length password is 5" }),
  });

  const name = formdata.get("name");
  const username = formdata.get("username");
  const email = formdata.get("email");
  const password = formdata.get("password");

  const parsedData = registerInputSchema.safeParse({
    name,
    email,
    username,
    password,
  });

  if (!parsedData.success) {
    const errMessage = parsedData.error.issues[0].message;
    redirect(url + `/register?error=${errMessage}`);
  }

  const user = await getUserByEmail(parsedData.data.email);

  if (user?.username === parsedData.data.username) {
    redirect(url + `/register?error=Username already taken`);
  }
  if (user) {
    redirect(url + `/register?error=Email must be unique`);
  }

  const newUser = await createUser(parsedData.data);

  //   console.log(newUser);
  return redirect(url + `/login`);
};
