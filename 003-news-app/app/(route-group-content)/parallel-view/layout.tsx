import React from "react";

interface Props {
  archive: React.ReactNode;
  latest: React.ReactNode;
}
export default function ArchiveLayout({ archive, latest }: Props) {
  return (
    <div>
      <h1>News Archive</h1>
      <section id="archive-filter"> {archive} </section>
      <section id="archive-latest"> {latest} </section>
    </div>
  );
}
