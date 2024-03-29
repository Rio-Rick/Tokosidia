"use server";

import { getUserByEmail } from "@/db/models/user";
import { comparePassword } from "@/db/utils/bcrypt";
import { signToken } from "@/db/utils/jwt";
import { redirect } from "next/navigation";
import { z } from "zod";
import { cookies } from "next/headers";

export const onLogin = async (formData: FormData) => {
  const url = process.env.NEXT_PUBLIC_BASE_URL;
  const loginInputSchema = z.object({
    email: z
      .string()
      .trim()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email address" }),
    password: z.string().trim().min(1, { message: "Password is required" }),
  });

  const email = formData.get("email");
  const password = formData.get("password");

  const parsedData = loginInputSchema.safeParse({
    email,
    password,
  });

  if (!parsedData.success) {
    const errMessage = parsedData.error.issues[0].message;
    redirect(url +`/login?error=${errMessage}`);
  }

  const user = await getUserByEmail(parsedData.data.email);

  if (!user || !comparePassword(parsedData.data.password, user.password)) {
    redirect(url +`/login?error=Invalid%20credentials`);
  }

  const payload = {
    id: user._id,
    email: user.email,
  };

  const access_token = signToken(payload);

  cookies().set("access_token", access_token, {
    httpOnly: true,
    secure: false,
    expires: new Date(Date.now() + 24000 * 60 * 60),
    sameSite: "strict",
  });

  return redirect(`${url}`)
};
