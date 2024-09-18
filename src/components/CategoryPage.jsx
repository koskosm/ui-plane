import React from 'react';
import { useParams } from 'react-router-dom';
import PostList from './PostList';

function CategoryPage({ posts }) {
  const { tag } = useParams();
  const filteredPosts = posts.filter(post => post.tags.includes(tag));

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Posts tagged with "{tag}"</h2>
      <PostList posts={filteredPosts} />
    </>
  );
}

export default CategoryPage;