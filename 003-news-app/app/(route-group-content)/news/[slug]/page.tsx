import { getNewsItem } from "@/lib/news";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const news = await getNewsItem(slug);

  if (!news) return notFound();

  return (
    <article className="news-article">
      <header>
        <Link href={`/news/${news?.slug}/image`}>
          {" "}
          <Image src={`/images/news/${news?.image}`} alt={news?.title} width={112} height={112} />
        </Link>
        <h1> {news?.title} </h1>
        <time dateTime={news?.date}> {news?.date} </time>
      </header>
      <p> {news?.content} </p>
    </article>
  );
}
