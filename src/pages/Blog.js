import React from "react";
import blogData from "../config/blogData";
import "./Blog.css";
import { Link } from "react-router-dom";

function Blog() {
  return (
    <div className="blog-container">
      <div className="blog-header">
        <h2>Insights & Dev Log</h2>
        <p>
          Sharing technical insights and problem-solving journeys in software
          development.
        </p>
      </div>

      <div className="blog-list">
        {blogData.map((post) => (
          <article key={post.id} className="blog-card">
            <div className="blog-card-meta">
              <span className={`blog-category ${post.category.toLowerCase()}`}>
                {post.category}
              </span>
              <span className="blog-date">{post.date}</span>
            </div>
            <h3 className="blog-post-title">
              <Link to={`/blog/${post.slug}`}>{post.title}</Link>
            </h3>
            <p className="blog-summary">{post.summary}</p>
            <div className="blog-tags">
              {post.tags.map((tag, idx) => (
                <span key={idx} className="blog-tag">
                  #{tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Blog;
