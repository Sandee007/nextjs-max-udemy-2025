import Link from "next/link";
import logoImg from "@/assets/logo.png";
import Image from "next/image";
import styles from "./main-header.module.css";
import MainHeaderBackground from "../main-header-background/main-header-background";
import NavLink from "./nav-link/nav-link";

export default function MainHeader() {
  return (
    <>
      <MainHeaderBackground />
      <header className={styles.header}>
        <Link className={styles.logo} href="/">
          {/* *** in Nextjs, imported images are an object */}
          {/* ! must have src */}
          <Image src={logoImg.src} alt="Logo" width={logoImg?.width} height={logoImg.height} priority />
          NextLevel Food
        </Link>

        <nav className={styles.nav}>
          <ul>
            <li>
              <NavLink href="/meals">Browse Meals</NavLink>
            </li>
            <li>
              <NavLink href="/community">Community</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
