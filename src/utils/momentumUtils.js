export function calculateMomentum(checkins = []) {
  if (checkins.length === 0) return 0;

  const today = new Date();
  let score = 0;

  checkins.forEach((date) => {
    const checkinDate = new Date(date);
    const diffDays = Math.floor(
      (today - checkinDate) / (1000 * 60 * 60 * 24)
    );

    if (diffDays <= 7) score += 10;
    else if (diffDays <= 15) score += 5;
    else if (diffDays <= 30) score += 2;
  });

  return Math.min(score, 100);
}