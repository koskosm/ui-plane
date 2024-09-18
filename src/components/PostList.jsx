import { Link } from 'react-router-dom';

function PostList({ posts, category, excludeLatest }) {
  let filteredPosts = category 
    ? posts.filter(post => post.category === category)
    : posts;

  if (excludeLatest && filteredPosts.length > 0) {
    filteredPosts = filteredPosts.slice(1);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredPosts.map(post => (
        <Link to={`/post/${post.slug}`} key={post.id} className="border rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <div className="aspect-w-16 aspect-h-9">
            <img 
              src={post.thumbnail} 
              alt={post.title} 
              className="object-cover w-full h-full"
            />
          </div>
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-2">{post.excerpt}</p>
            <p className="text-sm text-gray-500">{post.category}</p>
            <div className="mt-2">
              {post.tags.map(tag => (
                <Link
                  key={tag}
                  to={`/category/${tag}`}
                  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default PostList;