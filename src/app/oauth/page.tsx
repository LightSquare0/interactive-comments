"use client";

import { useEffect } from "react";

const OAuth = () => {
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");

    fetch(`http://localhost:3000/api/auth?code=${code}`);
    console.log(code);
  }, []);

  return <div>maybe authenticated</div>;
};

export default OAuth;
