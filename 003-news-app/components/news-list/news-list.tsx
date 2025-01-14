import { News } from "@/dummy-news";
import Image from "next/image";
import Link from "next/link";

interface Props {
  newsList: Array<News>;
}

export default function NewsList({ newsList }: Props) {
  return (
    <ul className="news-list">
      {newsList.map((news) => (
        <li key={news?.id}>
          <Link href={`/news/${news?.slug}`}>
            {news?.title}
            <Image src={`/images/news/${news?.image}`} alt={news?.title} width={310} height={224} />
            <span> {news?.title} </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
