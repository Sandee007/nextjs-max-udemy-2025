export default async function MealDetailsPage({ params }: { params: Promise<{ mealSlug: string }> }) {
  const promisedParams = await params;
  return <h1>Meals Details Page - {promisedParams?.mealSlug} </h1>;
}
