import React from 'react';
import { FaUserShield, FaUserTie, FaUserCircle } from 'react-icons/fa';

export const UserHeader = ({ 
  userData, 
  firebaseUser, 
  role, 
  gradient, 
  title, 
  subtitle, 
  additionalInfo 
}) => {
  const RoleIcon = {
    admin: FaUserShield,
    manager: FaUserTie,
    buyer: FaUserCircle
  }[role] || FaUserCircle;

  return (
    <div className={`bg-gradient-to-r ${gradient} rounded-2xl p-6 text-white`}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <RoleIcon className="text-2xl" />
            <h1 className="text-3xl font-bold">{title}</h1>
          </div>
          <p className="opacity-90">{subtitle}</p>
          <p className="text-sm opacity-80 mt-1">{additionalInfo}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm opacity-90">Logged in as</p>
            <p className="font-semibold">{userData?.email}</p>
          </div>
          <div className="avatar">
            <div className="w-12 h-12 rounded-full border-2 border-white">
              <img 
                src={userData?.photoURL || firebaseUser?.photoURL || `https://ui-avatars.com/api/?name=${userData?.name || 'User'}&background=random`} 
                alt="User" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};