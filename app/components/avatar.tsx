type Props = {
  name: string;
  picture: string;
};

const Avatar = ({ name, picture }: Props) => {
  return (
    <div className="flex items-center">
      {picture && (
        <img src={picture} className="w-12 h-12 rounded-full mr-4" alt={name} />
      )}
      {!picture && (
        <div className="w-12 h-12 rounded-full mr-4 bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 font-bold">
          {name.charAt(0).toUpperCase()}
        </div>
      )}
      <div className="text-xl font-bold">{name}</div>
    </div>
  );
};

export default Avatar;