"use client";

import { handleAuth } from "@/actions/auth-actions";
import Link from "next/link";
import { useActionState } from "react";

export type AuthFormMode = { mode: "login" | "register" };

type Props = AuthFormMode;

export default function AuthForm({ mode }: Props) {
  const [formState, formAction, isFormPending] = useActionState(handleAuth.bind(null, mode), undefined);
  
  return (
    <form id="auth-form" action={formAction}>
      <div>
        <img src="/images/auth-icon.jpg" alt="A lock icon" />
      </div>
      <p>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </p>
      {formState?.errors && (
        <ul id="form-errors">
          {Object.keys(formState?.errors)?.map((key) => (
            // @ts-expect-error - reson
            <li key={key}>{formState?.errors?.[key]}</li>
          ))}
        </ul>
      )}
      <p>
        <button disabled={isFormPending} type="submit">
          {mode === "login" ? "Login" : "Create Account"}
        </button>
      </p>
      <p>
        {mode === "login" && <Link href="/?mode=register">Create and account.</Link>}
        {mode === "register" && <Link href="/?mode=login">Login with existing account.</Link>}
      </p>
    </form>
  );
}
