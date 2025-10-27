type ContainerProps = {
  children?: React.ReactNode;
};

export const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className="container mx-auto px-5">{children}</div>;
};
