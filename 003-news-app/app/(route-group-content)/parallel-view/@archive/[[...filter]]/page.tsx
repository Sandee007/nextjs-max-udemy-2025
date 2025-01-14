/**
 * NOTE
 *
 * ! this is a 'catch-all' routes
 * * this page will catch everything that comes after '/parallel-view'
 */

import NewsList from "@/components/news-list/news-list";
import { News } from "@/dummy-news";
import { getAvailableNewsMonths, getAvailableNewsYears, getNewsForYear, getNewsForYearAndMonth } from "@/lib/news";
import Link from "next/link";
import React from "react";

interface Props {
  params: Promise<{ filter: string }>;
}

export default function FilteredNewsPage({ params }: Props) {
  // ! filter comes in as an array because it's a catch all route
  const { filter } = React.use(params);

  const selectedYear = filter?.[0];
  const selectedMonth = filter?.[1];

  let newsList: Array<News> = [];
  let links = getAvailableNewsYears();

  if (selectedYear && !selectedMonth) {
    newsList = getNewsForYear(selectedYear);
    links = getAvailableNewsMonths(selectedYear);
  }

  if (selectedYear && selectedMonth) {
    newsList = getNewsForYearAndMonth(selectedYear, selectedMonth);
    links = [];
  }

  let newsContent = <p>No news found for the selected period.</p>;
  if (newsList && newsList?.length > 0) {
    newsContent = <NewsList newsList={newsList} />;
  }

  if (
    // ! min the +operator, converts to numbers
    (selectedYear && !(getAvailableNewsYears() as Array<number>)?.includes(+selectedYear)) ||
    (selectedMonth && !(getAvailableNewsMonths(selectedYear) as Array<number>)?.includes(+selectedMonth))
  ) {
    throw new Error("Invalid filter.");
  }
  return (
    <>
      <header id="archive-header">
        <nav>
          <ul>
            {links.map((link: string) => {
              const href = selectedYear ? `/parallel-view/${selectedYear}/${link}` : `/parallel-view/${link}`;

              return (
                <li key={link}>
                  <Link href={href}>{link}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
      {newsContent}
    </>
  );
}
