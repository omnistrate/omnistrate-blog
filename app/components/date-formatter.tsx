import { parseISO, format } from "date-fns";

type DateFormatterProps = {
  dateString: string;
};

export const DateFormatter: React.FC<DateFormatterProps> = ({ dateString }) => {
  if (!dateString) return <span>No date</span>;

  try {
    const date = parseISO(dateString);
    return <time dateTime={dateString}>{format(date, "LLLL	d, yyyy")}</time>;
  } catch (error) {
    return <span>Invalid date</span>;
  }
};
