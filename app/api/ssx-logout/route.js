import { NextResponse } from 'next/server';
import ssx from '../_ssx';

async function POST(request) {
  return NextResponse.json(
    {
      success: (await ssx.logout()) || true,
    },
    {
      status: 200,
    }
  );
}

export { POST };
