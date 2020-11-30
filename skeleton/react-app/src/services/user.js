export const updateUser = async (username, firstname, lastname, color, stamp) => {
  const response = await fetch("/api/users/settings", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      firstname: firstname,
      lastname: lastname,
      color: color,
      stamp: stamp,
    }),
  });
  return await response.json();
}

export const getUser = async (id) => {
  return
}

export default updateUser