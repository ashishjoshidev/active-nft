import React from 'react';
import Nav2 from '@/components/layout/Nav2';
import ProfileHeader from '@/components/ProfileHeader';
import ProfileTab from '@/components/tab/ProfileTab';

const Profile = () => {
  return (
    <>
      <div className="bg-[url('/bg-stars.png')] bg-repeat-y bg-center relative">
        <Nav2 />
      </div>
      <ProfileHeader />
      <div className="mt-[120px]">
        <ProfileTab />
      </div>
    </>
  );
};

export default Profile;
