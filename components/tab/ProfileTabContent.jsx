import React from 'react';
import CreatedList from '../profile-list/CreatedList';
import OwnedList from '../profile-list/OwnedList';
import History from '../profile-list/History';

const ProfileTabContent = ({ activeTab }) => {
  switch (activeTab) {
    case 'Owned':
      return (
        <div className="text-white ml-[20px]">
          <OwnedList />{' '}
        </div>
      );
    case 'Listed':
      return (
        <div className="ml-[200px]">
          <CreatedList />
        </div>
      );
    case 'Created':
      return (
        <div className="ml-[200px]">
          <History />
        </div>
      );
    default:
      return null;
  }
};

export default ProfileTabContent;
