"use client";

import { formatDate } from "@/lib/format";
import LikeButton from "./like-icon";
import { togglePostLikeStatus } from "@/app/actions.ts";
import { useOptimistic } from "react";

function Post({ post, toggleLike }) {
  return (
    <article className="post">
      <div className="post-image">
        <img src={post.image} alt={post.title} />
      </div>
      <div className="post-content">
        <header>
          <div>
            <h2>{post.title}</h2>
            <p>
              Shared by {post.userFirstName} on <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
            </p>
          </div>
          <div>
            <form action={toggleLike.bind(this, post?.id)} className={post?.isLiked ? "liked" : undefined}>
              <LikeButton />
            </form>
          </div>
        </header>
        <p>{post.content}</p>
      </div>
    </article>
  );
}

export default function Posts({ posts }) {
  const [optimisticallyUpdatedPosts, optimisticallyUpdatePostsFN] = useOptimistic(posts, (prevPosts, updatedPostId) => {
    const updatedPostIndex = prevPosts.findIndex((i) => i.id === updatedPostId);

    if (updatedPostIndex === -1) return prevPosts;

    // * update the post in anm imutable way
    const updatedPost = { ...prevPosts[updatedPostIndex] };
    updatedPost.likes = updatedPost.likes + (updatedPost?.isLiked ? -1 : 1);
    updatedPost.isLiked = !updatedPost.isLiked;

    const newsPosts = [...prevPosts];
    newsPosts[updatedPostIndex] = updatedPost;

    return newsPosts;
  });

  if (!optimisticallyUpdatedPosts || optimisticallyUpdatedPosts.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }

  async function updatePost(id) {
    optimisticallyUpdatePostsFN(id);
    await togglePostLikeStatus(id);
  }

  return (
    <ul className="posts">
      {optimisticallyUpdatedPosts.map((post) => (
        <li key={post.id}>
          <Post post={post} toggleLike={updatePost} />
        </li>
      ))}
    </ul>
  );
}
