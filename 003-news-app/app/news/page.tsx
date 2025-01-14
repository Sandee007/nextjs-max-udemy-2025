import { DUMMY_NEWS } from "@/dummy-news";
import Image from "next/image";
import Link from "next/link";

export default function NewsPage() {
  return (
    <>
      <h1>News Page</h1>
      <ul className="news-list">
        {DUMMY_NEWS.map((news) => (
          <li key={news?.id}>
            <Link href={`/news/${news?.slug}`}>
              {news?.title}
              <Image src={`/images/news/${news?.image}`} alt={news?.title} width={310} height={224} />
              <span> {news?.title} </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
