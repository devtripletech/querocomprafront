import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  async function middleware(req) {
    const pathname = req.nextUrl.pathname
    const user = req.nextauth.token
    const adminPaths = [
      "/admin",
      "/admin/users",
      "/admin/negotiations",
      "/admin/categories",
    ]

    const isPathAdmin = adminPaths?.some((path) => pathname == path)

    // if (
    //   user?.activated === false &&
    //   pathname !== "/dashboard/account/personal"
    // ) {
    //   return NextResponse.redirect(
    //     new URL("/dashboard/account/personal", req.url)
    //   )
    // }

    if (isPathAdmin && user?.role !== 1) {
      return NextResponse.redirect(new URL("/dashboard/unauthorized", req.url))
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => token?.role === 2 || token?.role === 1,
    },
  }
)
export const config = { matcher: ["/dashboard/:path*", "/admin/:path*"] }
