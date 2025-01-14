"use client";

import NewsList from "@/components/news-list/news-list";
import { News } from "@/dummy-news";
import { useEffect, useState } from "react";

export default function NewsPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState<Array<News>>([]);

  useEffect(() => {
    async function fetchNews() {
      setLoading(true);
      const response = await fetch("http://localhost:8080/news");

      if (!response?.ok) {
        setError("Failed to fecth news");
      }

      const news = await response.json();
      setNews(news);
      setLoading(false);
    }

    fetchNews();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (error) return <p> {error} </p>;

  return (
    <>
      <h1>News Page</h1>
      <NewsList newsList={news} />
    </>
  );
}
