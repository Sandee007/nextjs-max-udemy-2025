import Link from "next/link";
import Header from "@/components/header";

export default function Home() {
  return (
    <div>
      <main>
        <Header />
        <p>
          <Link replace={false} href="/about">
            About Us
          </Link>
        </p>
        <p>
          <Link replace={false} href="/blog">
            Blog
          </Link>
        </p>
      </main>
    </div>
  );  
}
