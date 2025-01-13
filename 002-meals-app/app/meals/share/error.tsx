"use client";

export default function Error({ error }: { error: Error }) {
  return (
    <main className="error">
      <h1>Failed to create meal.</h1>
      <p> {error?.message} </p>
    </main>
  );
}
