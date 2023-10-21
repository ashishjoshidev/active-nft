// components/SwitchableTabs.js
import React, { useState } from 'react';
import ProfileTabContent from './ProfileTabContent';

const ProfileTab = () => {
  const [activeTab, setActiveTab] = useState('Tokens');

  const TabList = () => {
    switch (activeTab) {
      case 'Owned':
        return <div>Owned content</div>;
      case 'Listed':
        return <div>Listed content</div>;
      case 'Created':
        return <div>Created content</div>;
      default:
        return null;
    }
  };

  return (
    <>
      <div>
        <div className="flex justify-start pl-[90px] mt-[20px] space-x-4 mb-4 border-b-[1px] border-gray-700 w-full">
          {['Owned', 'Listed', 'Created'].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2  ${
                activeTab === tab
                  ? 'bg-white text-black font-bold rounded-xl'
                  : ' text-[#6C6E73] font-bold'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <ProfileTabContent activeTab={activeTab} />
    </>
  );
};

export default ProfileTab;
