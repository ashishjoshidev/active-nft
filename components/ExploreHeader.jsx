import React from 'react';
import TabHeadless from './tab/ExploreTab';

const ExploreHeader = () => {
  return (
    <div>
      <h1 className="text-center text-xl text-white mt-6 gradient-text">
        Explore Prompts
      </h1>
      <div className="ml-[60px]">
        <TabHeadless />
      </div>
    </div>
  );
};

export default ExploreHeader;
