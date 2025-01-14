import { DUMMY_NEWS } from "@/dummy-news";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: Promise<{ slug: string }>;
}

export default function NewsDetailPage({ params }: Props) {
  const { slug } = React.use(params);
  const news = DUMMY_NEWS.find((i) => i?.slug === slug);

  if (!news) return notFound();

  return (
    <article className="news-article">
      <header>
        <Image src={`/images/news/${news?.image}`} alt={news?.title} width={112} height={112} />
        <h1> {news?.title} </h1>
        <time dateTime={news?.date}> {news?.date} </time>
      </header>
      <p> {news?.content} </p>
    </article>
  );
}
