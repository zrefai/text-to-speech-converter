export function getMinutesAgo(startTime: string) {
  return Math.floor(
    (new Date().getTime() - new Date(startTime).getTime()) / 60000
  );
}
