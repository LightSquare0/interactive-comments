const OAuth = async () => {
  const code = new URLSearchParams(window.location.search).get("code");

  await fetch(`http:localhost:3000/api/auth`)


  return 
};

export default OAuth;
