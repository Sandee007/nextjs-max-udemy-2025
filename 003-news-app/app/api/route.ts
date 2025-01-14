//  ! this is a reserved filename

/**
 * NOTE
 *
 * * NextRequest extends Request
 * * NextResponse extends Response
 */

import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  console.log([request]);

  //   return NextResponse.json('data')
  return new NextResponse("Hello");
}

// export function POST() {}
