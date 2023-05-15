"use client";

const Header: React.FC<{ user: any }> = ({ user }) => {
  if (!user) return <div>not logged in</div>;

  return <div>{user.name}</div>;
};

export default Header;
