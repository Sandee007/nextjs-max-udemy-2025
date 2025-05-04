import AuthForm, { AuthFormMode } from "@/components/auth-form";

/**
 * NOTE
 * * seacrhParams is passed automatically into all nextjs components
 */

interface Props {
  // searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  searchParams: Promise<AuthFormMode>;
}
export default async function Home({ searchParams }: Props) {
  const { mode = "login" } = await searchParams;

  return <AuthForm mode={mode} />;
}
