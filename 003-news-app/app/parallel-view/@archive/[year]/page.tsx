import NewsList from "@/components/news-list/news-list";
import { getNewsForYear } from "@/lib/news";
import React from "react";

interface Props {
  params: Promise<{ year: string }>;
}

export default function FilteredNewsPage({ params }: Props) {
  const { year } = React.use(params);

  return <NewsList newsList={getNewsForYear(year)} />;
}
