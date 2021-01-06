

// Destructures content data and dispatches past_week, user_data, programs_data,
// habits_data, and daily_stamps_data
export function dispatchUserContent(content) {
  const { user_data, programs_data, habits_data, daily_stamps_data, past_week } = content
  setUser(user_data)
  setWeek(past_week)
  dispatchPrograms(setPrograms(programs_data))
  dispatchHabits(setHabits(habits_data))
  dispatchDailies(setDailies(daily_stamps_data))
}