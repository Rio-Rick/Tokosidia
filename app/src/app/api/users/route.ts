import { NextResponse } from "next/server";
import { createUser, getUsers } from "@/db/models/user";
import { UserModel } from "@/types/user.type";
import { UserResponse } from "@/types/user.type";

export const GET = async() => {
    const data = await getUsers()
    return NextResponse.json<UserResponse<UserModel[]>>(
        {
            statusCode: 200,
            data: data
        }
    )
}
import { z } from "zod";

const userInput = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .trim()
    .min(1, { message: "Name is required" }),
  username: z
    .string({ required_error: "Username is required" })
    .min(1, { message: "Username is required" }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z.string({ required_error: "password is required" }).trim().min(5),
});

export const POST = async (request: Request) => {
  try {
    const data = await request.json();
    const parsedData = userInput.safeParse(data);;

    if (!parsedData.success) {
      throw parsedData.error;
    }

    const user = await createUser(parsedData.data);
    return NextResponse.json<UserResponse<UserModel>>({
      statusCode: 201,
      message: "Register success",
      data: user,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errMessage = error.issues[0].message;
      return NextResponse.json<UserResponse<never>>({
        statusCode: 400,
        error: `${errMessage}`,
      },{
        status: 400
      });
    }
    return NextResponse.json<UserResponse<never>>({
      statusCode: 500,
      error: `Internal Server Error !`,
    },{
      status: 500
    });
  }
};