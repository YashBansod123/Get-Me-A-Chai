// app/api/userdata/route.js

import { NextResponse } from 'next/server';
import { fetchUser, fetchpayments } from '@/actions/useractions'; // adjust this path

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");

  try {
    const user = await fetchUser(username);
    const payments = await fetchpayments(username);

    return NextResponse.json({
      user,
      payments,
    });
  } catch (err) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
