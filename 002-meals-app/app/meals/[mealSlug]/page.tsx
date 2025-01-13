import Image from "next/image";
import styles from "./page.module.css";
import { getMeal } from "@/lib/meals";
import { Meal } from "@/components/meals-grid/meal-item/meal-item";
import { notFound } from "next/navigation";

export default async function MealDetailsPage({ params }: { params: Promise<{ mealSlug: string }> }) {
  const promisedParams = await params;
  const meal: Meal = await getMeal(promisedParams?.mealSlug);

  // ! display nearest not-found error page - provided by nextjs
  if(!meal){
    notFound()
  }

  // * convert newlines into linebreaks
  meal.instructions = meal?.instructions?.replace(/\n/g, "<br/>");

  return (
    <>
      <header className={styles.header}>
        <div className={styles.image}>
          <Image src={meal?.image} alt={meal?.title} fill />
        </div>
        <div className={styles.headerText}>
          <h1>{meal?.title}</h1>
          <p className={styles.creator}>
            by <a href={`mailto:${meal?.creator_email}`}> {meal?.creator} </a>
          </p>
          <p className={styles.summary}> {meal?.summary} </p>
        </div>
      </header>
      <main>
        <p
          className={styles.instructions}
          dangerouslySetInnerHTML={{
            __html: meal?.instructions,
          }}></p>
      </main>
    </>
  );
}
