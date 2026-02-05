export function formatMessageTime(date?: string) {
  if (!date) return "";

  const time = new Date(date);
  const now = new Date();

  const isToday = time.toDateString() === now.toDateString();

  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);

  const isYesterday = time.toDateString() === yesterday.toDateString();

  if (isToday) {
    return time.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  if (isYesterday) {
    return "Hôm qua";
  }

  return time.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
  });
}
