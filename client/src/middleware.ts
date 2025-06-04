import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

const isStudentRoute = createRouteMatcher(["/user/(.*)"]);
const isTeacherRoute = createRouteMatcher(["/teacher/(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  if (!userId) {
    return;
  }

  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const userRole =
    (user.publicMetadata?.userType as "student" | "teacher") || "student";

  if (isStudentRoute(req) && userRole !== "student") {
    const url = new URL("/teacher/courses", req.url);
    return NextResponse.redirect(url);
  }

  if (isTeacherRoute(req) && userRole !== "teacher") {
    const url = new URL("/user/courses", req.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
