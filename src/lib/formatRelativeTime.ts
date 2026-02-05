/**
 * Format date to Vietnamese relative time (e.g. "1 ngày", "11 giờ", "2 phút").
 */
export function formatRelativeTime(date: string | Date): string {
  const now = new Date();
  const d = typeof date === "string" ? new Date(date) : date;
  const diffMs = now.getTime() - d.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return "vừa xong";
  if (diffMin < 60) return `${diffMin} phút`;
  if (diffHour < 24) return `${diffHour} giờ`;
  if (diffDay < 7) return `${diffDay} ngày`;
  if (diffDay < 30) return `${Math.floor(diffDay / 7)} tuần`;
  if (diffDay < 365) return `${Math.floor(diffDay / 30)} tháng`;
  return `${Math.floor(diffDay / 365)} năm`;
}
