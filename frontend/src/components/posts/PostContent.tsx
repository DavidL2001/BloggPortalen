interface PostContentProps {
  content: string;
}

export default function PostContent({
  content,
}: PostContentProps) {
  return (
    <section>
      <h2 className="sr-only">Innehåll</h2>
      <p>{content}</p>
    </section>
  );
}