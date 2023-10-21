import ssx from '../_ssx';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

async function POST(request) {
  const body = await request.json();

  const cookieStore = cookies();
  const nonce = cookieStore.get('nonce');

  return NextResponse.json(
    await ssx.login(
      body.siwe,
      body.signature,
      body.daoLogin,
      body.resolveEns,
      nonce ? nonce.value : '',
      body.resolveLens
    ),
    {
      status: 200,
    }
  );
}

export { POST };
