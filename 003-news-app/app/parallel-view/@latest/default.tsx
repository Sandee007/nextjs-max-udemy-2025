// ! this is a reserved file name

import NewsList from "@/components/news-list/news-list";
import { getLatestNews } from "@/lib/news";

export default function LatestNewsPage() {
  return (
    <>
      <h2>Latest News</h2>
      <NewsList newsList={getLatestNews()} />
    </>
  );
}
