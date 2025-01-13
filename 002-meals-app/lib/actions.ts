"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

function isInvalidText(text: string) {
  return !text || text?.trim() === "";
}

interface ResSubmitForm {
  message: string | null;
}
export async function submitForm(prevState: ResSubmitForm, formData: FormData): Promise<ResSubmitForm> {
  const meal = {
    title: formData.get("title") as string,
    summary: formData.get("summary") as string,
    instructions: formData.get("instructions") as string,
    image: formData.get("image") as File,
    creator: formData.get("name") as string,
    creator_email: formData.get("email") as string,
  };

  if (
    isInvalidText(meal?.title) ||
    isInvalidText(meal?.summary) ||
    isInvalidText(meal?.instructions) ||
    isInvalidText(meal?.creator) ||
    isInvalidText(meal?.creator_email) ||
    !meal?.creator_email?.includes("@") ||
    !meal?.image ||
    meal?.image?.size === 0
  ) {
    return {
      message: "Invalid input.",
    };
  }
  await saveMeal(meal);
  revalidatePath("/meals"); // * tell nextjs to remove it's cache for the given path - accepts 'layout' | 'page' as a 2nd argument, page is the default
  // revalidatePath('/', 'layout') // ! revalidate the entire application
  redirect("/meals");
}
