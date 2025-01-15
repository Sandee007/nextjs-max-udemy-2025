"use server";

import { storePost, updatePostLikeStatus } from "@/lib/posts";
import { redirect } from "next/navigation";
import { uploadImage } from "@/lib/cloudinary";
import { revalidatePath } from "next/cache";

export interface FormResponse_createPost {
  errors: Array<string>;
}

export async function createPost(
  prevFormState: FormResponse_createPost,
  formData: FormData
): Promise<FormResponse_createPost> {
  const title = formData.get("title") as string;
  const image = formData.get("image") as File;
  const content = formData.get("content") as string;

  const errors = [];

  if (!title || title?.trim()?.length === 0) {
    errors.push("Title is required.");
  }

  if (!content || content?.trim()?.length === 0) {
    errors.push("Content is required.");
  }

  if (!image || image?.size === 0) {
    errors.push("Image is required.");
  }

  if (errors?.length > 0) return { errors };

  try {
    const imageUrl = await uploadImage(image);
    storePost({
      imageUrl,
      title,
      content,
      userId: 1,
    });
  } catch (error: unknown) {
    throw new Error(error as string);
  }

  redirect("/feed");
}

export async function togglePostLikeStatus(id: string) {
  await updatePostLikeStatus(id, 2);
  revalidatePath('/')
}
