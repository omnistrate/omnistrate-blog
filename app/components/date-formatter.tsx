import { parseISO, format } from "date-fns";

type Props = {
  dateString: string;
};

const DateFormatter = ({ dateString }: Props) => {
  if (!dateString) return <span>No date</span>; 
  
  try {
    const date = parseISO(dateString);
    return <time dateTime={dateString}>{format(date, "LLLL	d, yyyy")}</time>;
  } catch (error) {
    return <span>Invalid date</span>;
  }
};

export default DateFormatter;