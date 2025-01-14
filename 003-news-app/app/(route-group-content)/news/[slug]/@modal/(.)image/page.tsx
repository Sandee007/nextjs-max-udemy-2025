"use client";

import { DUMMY_NEWS } from "@/dummy-news";
import { notFound, useRouter } from "next/navigation";
import React from "react";

interface Props {
  params: Promise<{ slug: string }>;
}

export default function InterceptedImagePage({ params }: Props) {
  const router = useRouter();

  const { slug } = React.use(params);
  const news = DUMMY_NEWS.find((i) => i?.slug === slug);
  if (!news) return notFound();

  return (
    <>
      <div className="modal-backdrop" onClick={router.back} />
      <dialog className="modal" open>
        <div className="fullscreen-image">
          <img src={`/images/news/${news?.image}`} alt={news?.title} />
        </div>
      </dialog>
    </>
  );
}
