export const updateUser = async (user) => {
  const response = await fetch("/api/users/settings", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: user.username
    }),
  });
  return await response.json();
}

export default updateUser