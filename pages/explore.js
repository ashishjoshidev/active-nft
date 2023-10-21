import React from 'react';
import Nav2 from '@/components/layout/Nav2';
import Explore from '@/components/Explore';

const explore = () => {
  return (
    <div>
      <div className="bg-[url('/bg-stars.png')] bg-repeat-y bg-center relative">
        <Nav2 />
        <Explore />
      </div>
    </div>
  );
};

export default explore;
