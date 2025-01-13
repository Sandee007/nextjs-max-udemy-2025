import Link from "next/link";
import styles from "./page.module.css";
import MealsGrid from "@/components/meals-grid/meals-grid";
import { getMeals } from "@/lib/meals";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse Meals",
  description: "lorem ipsum",
};

// ! this will also be treated as a different server compoennt by nextjs
async function Meals() {
  const meals = await getMeals();
  return <MealsGrid meals={meals} />;
}

export default function MealsPage() {
  return (
    <>
      <header className={styles.header}>
        <h1>
          Delicious meals, created by<span className={styles.highlight}> you</span>{" "}
        </h1>
        <p>Choose your favourite recipe and cook it yourself. </p>
        <p className={styles.cta}>
          <Link href="/meals/share">Share your favourite recipe</Link>
        </p>
      </header>
      <main className={styles.main}>
        <Suspense fallback={<p className={styles.loading}>Fetching meals....</p>}>
          <Meals />
        </Suspense>
      </main>
    </>
  );
}
