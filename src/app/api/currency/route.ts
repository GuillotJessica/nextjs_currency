import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest, response: NextResponse) {
  const url = `https://openexchangerates.org/api/latest.json?app_id=${process.env.CURRENCY_API_KEY}&base=EUR&symbols=Optional&prettyprint=false&show_alternative=false`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.log("ERROR", err);
  }
}
