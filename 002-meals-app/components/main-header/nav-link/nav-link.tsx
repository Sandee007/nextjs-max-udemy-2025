"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./nav-link.module.css";

interface Props {
  href: string;
  children: React.ReactNode;
}

export default function NavLink({ href, children }: Props) {
  const path = usePathname();

  return (
    <Link href={href} className={`${styles.link} ${path?.startsWith(href) ? styles.active : ''}`}>
      {children}
    </Link>
  );
}
