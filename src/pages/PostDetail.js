import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import blogData from "../config/blogData";
import "./PostDetail.css";
import ReactMarkdown from "react-markdown";

function PostDetail() {
  const { postId } = useParams();
  const navigate = useNavigate();

  //find the right post
  const post = blogData.find((p) => p.slug === postId);

  if (!post) {
    return <div className="not-found">Post not found.</div>;
  }

  return (
    <div className="post-detail-container">
      <button onClick={() => navigate(-1)} className="back-button">
        ← Back
      </button>
      <header className="post-header">
        <span className="post-category">{post.category}</span>
        <h1>{post.title}</h1>
        <p className="post-date">{post.date}</p>
      </header>

      <div className="post-content">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>

      <div className="post-tags">
        {post.tags.map((tag) => (
          <span key={tag}>#{tag}</span>
        ))}
      </div>
    </div>
  );
}

export default PostDetail;
