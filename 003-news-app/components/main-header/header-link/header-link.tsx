"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  label: string;
  href: string;
}

export default function HeaderLink({ label, href }: Props) {
  const path = usePathname();
  
  return (
    <Link href={href} className={path?.startsWith(href) ? "active" : undefined}>
      {label}
    </Link>
  );
}
