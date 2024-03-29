import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyTokenJose } from "./db/utils/jwt";

export const middleware = async (request: NextRequest) => {
  // console.log(request.method, request.url);
  if (
    !request.url.includes("/api") &&
    !request.url.includes("_next/static") &&
    !request.url.includes("_next/image") &&
    !request.url.includes("favicon.ico")
  ) {
  }

  if (request.url.includes("/api/wishlist")) {
    const cookiesStore = cookies();
    const token = cookiesStore.get("access_token");
    // console.log(token);
    if (!token) {
      return NextResponse.json({
        statusCode: 401,
        error: "Unauthorized",
      });
    }

    const tokenData = await verifyTokenJose<{ id: string; email: string }>(
      token.value
    );

    const requestHeaders = new Headers(request.headers)

    requestHeaders.set('x-user-id', tokenData.id)
    requestHeaders.set('x-user-email', tokenData.email)
    
    return NextResponse.next({
        headers: requestHeaders
    })
  }

  return NextResponse.next()
};
