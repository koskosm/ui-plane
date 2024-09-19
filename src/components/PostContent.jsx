import React from 'react';

function PostContent({ post }) {
  return (
    <div className="post-container max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-500 mb-4">{post.category}</p>
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}

export default PostContent;