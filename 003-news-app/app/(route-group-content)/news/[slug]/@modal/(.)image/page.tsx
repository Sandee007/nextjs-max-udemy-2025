import ModalBackdrop from "@/components/modal-backdrop/modal-backdrop";
import { getNewsItem } from "@/lib/news";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function InterceptedImagePage({ params }: Props) {
  const { slug } = await params;
  const news = await getNewsItem(slug);
  if (!news) return notFound();

  return (
    <>
      <ModalBackdrop />
      <dialog className="modal" open>
        <div className="fullscreen-image">
          <img src={`/images/news/${news?.image}`} alt={news?.title} />
        </div>
      </dialog>
    </>
  );
}
