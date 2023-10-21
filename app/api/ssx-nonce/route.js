import ssx from '../_ssx';

async function GET(request) {
  const nonce = ssx.generateNonce();
  return new Response(nonce, {
    status: 200,
    headers: { 'Set-Cookie': `nonce=${nonce}` },
  });
}

export { GET };
