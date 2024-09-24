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
        <Link to={`/post/${post.slug}`} key={post.id} className="rounded-lg overflow-hidden duration-300 pt-8 pb-8 px-4 bg-gray-50 dark:bg-[#21272b] dark:hover:bg-[#1a1c1e]">
          <div className="relative w-full pb-[20%]"> 
            <div 
              className="absolute inset-0 flex items-center justify-left pl-2"
            >
              <span className="text-6xl custom-emoji">{post.emoji}</span>
            </div>
          </div>
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2">{post.title}</h2>
            <p className="text-sm text-gray-500 pb-4">{post.category}</p>
            <div className="mt-2">
              {post.tags.map(tag => (
                <Link
                  key={tag}
                  to={`/category/${tag}`}
                  className="inline-block dark:border-white rounded-full px-3 py-1 text-sm font-semibold dark:text-white border mr-2 mb-2"
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