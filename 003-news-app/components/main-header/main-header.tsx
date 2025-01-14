import Link from "next/link";
import HeaderLink from "./header-link/header-link";

export default function MainHeader() {
  return (
    <header id="main-header">
      <div id="logo">
        <Link href="/">NextNews</Link>
      </div>
      <nav>
        <ul>
          <li>
            <HeaderLink label="News" href="/news" />
          </li>
          <li>
            <HeaderLink label="Archive" href="/parallel-view" />
          </li>
        </ul>
      </nav>
    </header>
  );
}
