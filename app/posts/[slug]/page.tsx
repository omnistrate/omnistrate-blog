const BlogPostPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  return <div>Blog Post Page</div>;
};

export default BlogPostPage;
