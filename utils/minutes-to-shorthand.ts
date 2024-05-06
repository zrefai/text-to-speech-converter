export function minutesToShorthand(minutes: number) {
  if (minutes < 60) {
    return minutes + 'm ago';
  } else {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (remainingMinutes === 0) {
      return hours + 'h';
    } else {
      return hours + 'h ' + remainingMinutes + 'm ago';
    }
  }
}
