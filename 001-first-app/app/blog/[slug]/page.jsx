export default function BlogPostPage({ params }) {
  return (
    <main>
      <h1> Blog Post </h1>
      <h2>{params.slug}</h2>
    </main>
  );
}
