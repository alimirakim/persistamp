export const updateUser = async (user) => {
  const response = await fetch("/api/user/edit", {
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

export const habitCreate = async (habit, description, frequency, color, stamp, userId, pid) => {
  console.log("inner pid", pid)
  const response = await fetch(`/api/habits/programs/${pid}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      habit,
      description,
      frequency,
      color,
      stamp,
      userId,
    }),
  });
  return await response.json();
}

export default updateUser;