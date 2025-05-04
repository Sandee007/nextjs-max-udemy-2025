"use server";

import { AuthFormMode } from "@/components/auth-form";
import { createAuthSession, destroySession } from "@/lib/auth";
import { hashUserPassword, verifyPassword } from "@/lib/hash";
import { createUser, getUserByEmail } from "@/lib/user";
import { redirect } from "next/navigation";

async function signup(prevFormState: unknown, formData: FormData) {
  console.log({ prevFormState });

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const errors: { email?: typeof email; password?: typeof password } = {};

  if (!email.includes("@")) {
    errors.email = "Invalid email.";
  }

  if (password.trim().length < 8) {
    errors.password = "Password must be at least 8 characters long.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
    };
  }

  try {
    //   * store in the db
    const userid = createUser(email, hashUserPassword(password));
    await createAuthSession(userid); // ! must use await
    redirect("/training");
  } catch (error: unknown) {
    console.log({ error });

    if ((error as { code: string }).code === "SQLITE_CONSTRAINT_UNIQUE") {
      return {
        errors: {
          email: "Email already exists.",
        },
      };
    }

    /**
     * NOTE
     * * let default nextjs error handling work
     * * closest error.ts file will take over
     */
    throw error;
  }
}

async function login(prevState: unknown, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const existingUser = getUserByEmail(email);
  if (!existingUser) {
    return {
      errors: {
        email: "Invalid Credentials.",
      },
    };
  }

  const isValidPassword = verifyPassword(existingUser.password, password);
  if (!isValidPassword) {
    return {
      errors: {
        pasword: "Invalid Credentials.",
      },
    };
  }

  await createAuthSession(existingUser.id); // ! must use await
  redirect("/training");
}

export async function handleAuth(mode: AuthFormMode["mode"], prevState: unknown, formData: FormData) {
  if (mode === "login") return login(prevState, formData);

  return signup(prevState, formData);
}

export async function logout() {
  await destroySession();
  redirect("/");
}
