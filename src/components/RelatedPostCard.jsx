import React from 'react';
import { Link } from 'react-router-dom';

function RelatedPostCard({ post }) {
  return (
    <Link to={`/post/${post.slug}`} className="bg-gray-50 dark:bg-[#21272b] rounded-lg overflow-hidden duration-300">
      <div className="bg-gray-50 dark:bg-[#21272b] rounded-lg overflow-hidden duration-300">
        <div className="p-6">
          <p className='pb-4'><span className="custom-emoji text-4xl">{post.emoji}</span></p>
          <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
          <p className="text-gray-400 mb-4">{post.excerpt}</p>
          <div className="flex items-center">
            <span className="text-sm text-gray-500">{post.category}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default RelatedPostCard;