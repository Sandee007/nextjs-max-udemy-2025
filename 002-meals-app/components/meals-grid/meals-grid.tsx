import MealItem, { Meal } from "./meal-item/meal-item";
import styles from "./meals-grid.module.css";

interface Props {
  meals: Array<Meal>;
}

export default function MealsGrid({ meals }: Props) {
  return (
    <ul className={styles.meals}>
      {meals.map((meal) => (
        <li key={meal?.id}>
          <MealItem {...meal} />
        </li>
      ))}
    </ul>
  );
}
