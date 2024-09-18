import React from 'react';
import { Link } from 'react-router-dom';

function FeaturedPost({ post }) {
  return (
    <Link to={`/post/${post.id}`} className="block mb-8">
      <div className="bg-gray-100 rounded-lg shadow-lg overflow-hidden">
        <div className="sm:flex lg:flex-row">
          <div className="sm:w-1/2 lg:w-2/3">
            <div className="aspect-w-16 aspect-h-9">
              <img 
                src={post.thumbnail} 
                alt={post.title} 
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          <div className="p-6 sm:w-1/2 lg:w-1/3">
            <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-4">{post.excerpt}</p>
            <p className="text-sm text-gray-500 mb-2">{post.category}</p>
            <span className="mt-4 inline-block text-blue-500 hover:underline">Read more</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default FeaturedPost;