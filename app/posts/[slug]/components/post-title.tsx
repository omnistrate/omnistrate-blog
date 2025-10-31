type PostTitleProps = {
  children?: React.ReactNode;
};

export const PostTitle: React.FC<PostTitleProps> = ({ children }) => {
  return (
    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left">
      {children}
    </h1>
  );
};
