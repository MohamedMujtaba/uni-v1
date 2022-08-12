import { NextResponse, NextRequest } from "next/server";
export async function middleware(req, ev) {
  const year = req.cookies["year"];
  const major = req.cookies["major"];
  const { pathname, origin } = req.nextUrl;
  if (pathname == "/timeline" && (!year || !major)) {
    return NextResponse.redirect(`${origin}`);
  }
  if (pathname == "/" && year && major) {
    return NextResponse.redirect(`${origin}/timeline`);
  }
  return NextResponse.next();
}
