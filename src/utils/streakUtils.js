export function calculateCurrentStreak(checkins = []) {
  if (checkins.length === 0) return 0;

  const dates = [...checkins].sort().reverse();

  let streak = 0;
  let current = new Date();

  while (true) {
    const today = current.toISOString().split("T")[0];

    if (dates.includes(today)) {
      streak++;
      current.setDate(current.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}

export function calculateLongestStreak(checkins = []) {
  if (checkins.length === 0) return 0;

  const dates = [...checkins].sort();

  let longest = 1;
  let current = 1;

  for (let i = 1; i < dates.length; i++) {
    const previous = new Date(dates[i - 1]);
    const today = new Date(dates[i]);

    const diff =
      (today.getTime() - previous.getTime()) /
      (1000 * 60 * 60 * 24);

    if (diff === 1) {
      current++;
    } else {
      longest = Math.max(longest, current);
      current = 1;
    }
  }

  return Math.max(longest, current);
}