'use client';
import { SSX } from '@spruceid/ssx';
import React from 'react';
import { useState } from 'react';

const SSXComponent = () => {
  const [ssxProvider, setSSX] = useState(null);

  const ssxHandler = async () => {
    const ssx = new SSX({
      providers: {
        server: {
          host: 'http://localhost:3001/api',
        },
      },
      modules: {
        storage: {
          prefix: 'my-app',
          hosts: ['https://kepler.spruceid.xyz'],
          autoCreateNewOrbit: true,
        },
        credentials: true,
      },
    });
    await ssx.signIn();
    setSSX(ssx);
  };

  const ssxLogoutHandler = async () => {
    ssxProvider?.signOut();
    setSSX(null);
  };

  const address = ssxProvider?.address() || '';

  return (
    <div className="text-white">
      <h2 className="text-white">User Authorization Module</h2>
      <p>Authenticate and Authorize using your tBNB keys</p>
      <br></br>
      {ssxProvider ? (
        <>
          {address && (
            <p>
              <b>Ethereum Address:</b> <code>{address}</code>
            </p>
          )}
          <br />
          <button onClick={ssxLogoutHandler}>
            <span>Sign-Out</span>
          </button>
        </>
      ) : (
        <button onClick={ssxHandler}>
          <span>Sign-In with Ethereum</span>
        </button>
      )}
    </div>
  );
};

export default SSXComponent;
