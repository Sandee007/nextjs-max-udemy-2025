import { getNewsItem } from "@/lib/news";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ImagePage({ params }: Props) {
  const { slug } = await params;

  const news = await getNewsItem(slug);
  if (!news) return notFound();

  return (
    <div className="fullscreen-image">
      <img src={`/images/news/${news?.image}`} alt={news?.title} />
    </div>
  );
}
