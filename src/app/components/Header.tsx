"use client";

const Header: React.FC<{ user: any }> = ({ user }) => {
  return <div>{user.name}</div>;
};

export default Header;
