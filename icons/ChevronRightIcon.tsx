const ChevronRightIcon = ({ color = "white" }) => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.2101 16.5899C5.66337 16.0432 5.66337 15.1568 6.2101 14.6101L10.8201 10L6.2101 5.38995C5.66337 4.84322 5.66337 3.95678 6.2101 3.41005C6.75683 2.86332 7.64326 2.86332 8.19 3.41005L13.79 9.01005C14.3367 9.55678 14.3367 10.4432 13.79 10.9899L8.19 16.5899C7.64326 17.1367 6.75683 17.1367 6.2101 16.5899Z"
        fill={color}
      />
    </svg>
  );
};

export default ChevronRightIcon;
