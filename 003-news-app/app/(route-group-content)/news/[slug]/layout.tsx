import React from "react";

interface Props {
  children: React.ReactNode;
  modal: React.ReactNode; // ! comes from @modal identifier
}

export default function NewsDetailLayout({ children, modal }: Props) {
  return (
    <>
      {modal}
      {children}
    </>
  );
}
