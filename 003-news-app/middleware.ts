// ! this is a reserved file name - so is the function name

import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  console.log({ request });

  return NextResponse.next();
}

// ! reserved object name
export const config = {
  matcher: "/news",  // * middleware only works for /news url now
};
