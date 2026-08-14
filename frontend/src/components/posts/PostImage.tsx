interface PostImageProps {
  image: string;
  altText: string;
}

export default function PostImage({
  image,
  altText,
}: PostImageProps) {
  const imageUrl = image.startsWith("http")
    ? image
    : `http://localhost:5000${image}`;

  return (
    <figure>
      <img src={imageUrl} alt={altText} />
    </figure>
  );
}