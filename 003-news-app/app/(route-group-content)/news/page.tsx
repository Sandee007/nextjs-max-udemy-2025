import NewsList from "@/components/news-list/news-list";
import { DUMMY_NEWS } from "@/dummy-news";

export default function NewsPage() {
  return (
    <>
      <h1>News Page</h1>
      <NewsList newsList={DUMMY_NEWS} />
    </>
  );
}
