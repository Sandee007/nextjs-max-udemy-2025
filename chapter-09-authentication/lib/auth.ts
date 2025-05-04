"use server";

import { BetterSqlite3Adapter } from "@lucia-auth/adapter-sqlite";
import { Lucia } from "lucia";
import db from "./db";
import { cookies } from "next/headers";

const adapter = new BetterSqlite3Adapter(db, {
  user: "users",
  session: "sessions",
});

const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false, // * always use false for next.js - mentioned in lucia docs
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
});

export async function createAuthSession(userId: string) {
  /** NOTE
   * * lucia will automatically create a record in sessions table
   */
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  console.log({ sessionCookie });

  //   * store cookie in the nextjs request
  const nextjsRequestCookies = await cookies();
  nextjsRequestCookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
}

export async function verifyAuth() {
  const requestCookies = await cookies();

  const sessionCookie = requestCookies.get(lucia.sessionCookieName);
  if (!sessionCookie) {
    return {
      user: null,
      session: null,
    };
  }

  const sessionValue = sessionCookie.value;
  if (!sessionValue) {
    return {
      user: null,
      session: null,
    };
  }

  //   * check if the session is valid
  const result = await lucia.validateSession(sessionValue);

  /**
   * NOTE
   * ! refresh the cookie so the user won't be logged out suddenly when the original cookie expires
   */
  if (result.session && result.session.fresh) {
    const sessionCookie = lucia.createSessionCookie(result.session.id);
    requestCookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
  }

  /**
   * NOTE
   * ! remove existing cookie if the previously set cookie is expired
   */
  if (!result.session) {
    const sessionCookie = lucia.createBlankSessionCookie();
    requestCookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
  }

  return result;
}

export async function destroySession() {
  const { session } = await verifyAuth();

  if (!session) {
    return {
      error: "Unauthorized!",
    };
  }

  await lucia.invalidateSession(session.id)

  const requestCookies = await cookies();
  const sessionCookie = lucia.createBlankSessionCookie();
  console.log({sessionCookie});
  requestCookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
}
