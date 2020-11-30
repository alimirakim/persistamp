export const updateUser = async (username, color, stamp) => {
  const response = await fetch("/api/users/settings", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      color: color,
      stamp: stamp,
    }),
  });
  return await response.json();
}

export default updateUser