export const formatThaiDateTime = (
  isoString: string,
  options?: {
    showWeekday?: boolean;
    showTime?: boolean;
  }
) => {
  const { showWeekday: weekday = false, showTime = true } = options || {};
  const date = new Date(isoString);
  const buddhistYear = date.getFullYear() + 543;
  const formatOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: weekday ? "long" : undefined,
    hour: showTime ? "numeric" : undefined,
    minute: showTime ? "numeric" : undefined,
    hour12: false,
  };

  const formatter = new Intl.DateTimeFormat("th-TH", formatOptions);
  const formattedDate = formatter.format(date);

  return (
    formattedDate.replace(/(\d{4})/, buddhistYear.toString()) +
    (showTime ? " น." : "")
  );
};

// Format phone number for display (0xx-xxx-xxxx)
export const formatPhoneNumber = (phone: string): string => {
  if (!phone) return "";
  if (phone.length <= 3) return phone;
  if (phone.length <= 6) return `${phone.slice(0, 3)}-${phone.slice(3)}`;
  return `${phone.slice(0, 3)}-${phone.slice(3, 6)}-${phone.slice(6, 10)}`;
};
