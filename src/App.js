import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useParams, Link, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import PostList from './components/PostList';
import PostContent from './components/PostContent';
import { posts } from './data/posts';
import CategoryPage from './components/CategoryPage';
import SearchBox from './components/SearchBox';
import PlaneAnimation from './components/PlaneAnimation';
import Footer from './components/Footer'; // Add this import
import './customFonts.css'; // Import the custom fonts CSS

function App() {
  const [searchResults, setSearchResults] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPost, setCurrentPost] = useState(null);

  const handleSearch = (term) => {
    setSearchTerm(term);
    const results = posts.filter(post => 
      post.title.toLowerCase().includes(term.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(term.toLowerCase()) ||
      post.content.toLowerCase().includes(term.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleClearSearch = () => {
    setSearchResults(null);
    setSearchTerm('');
  };

  return (
    <Router>
      <div className="App flex flex-col min-h-screen bg-[#1D2226] text-white">
        <Navbar />
        <div className="flex-grow flex">
          {/* Main content wrapper */}
          <div className="flex-grow flex flex-col overflow-x-hidden">
            {/* Plane animation container */}
            <div className="w-full">
              <PlaneAnimation currentPost={currentPost} />
            </div>
            {/* Main content */}
            <main className="flex-grow px-4 lg:px-8 pb-12">
              <div className="max-w-6xl mx-auto mt-8">
                <Routes>
                  <Route path="/" element={
                    <>
                      <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to UI Plane</h1>
                        <p className="text-xl md:text-2xl text-gray-400 mb-8">
                          A UI flight checklist and collection of best design practices!
                          <span className="custom-emoji" role="img" aria-label="Checklist">✅</span>
                        </p>
                        <div className="flex justify-center">
                          <SearchBox onSearch={handleSearch} searchTerm={searchTerm} onClear={handleClearSearch} />
                        </div>
                      </div>
                      {searchResults ? (
                        <>
                          <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold">Search Results for "{searchTerm}"</h2>
                            <button 
                              onClick={handleClearSearch}
                              className="px-3 py-1 text-sm text-white bg-gray-700 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                            >
                              Clear Search
                            </button>
                          </div>
                          <PostList posts={searchResults} />
                        </>
                      ) : (
                        <PostList posts={posts} />
                      )}
                    </>
                  } />
                  <Route path="/categories" element={<CategoryList posts={posts} />} />
                  <Route path="/category/:tag" element={<CategoryPage posts={posts} />} />
                  <Route path="/post/:slug" element={<PostPage posts={posts} setCurrentPost={setCurrentPost} />} />
                </Routes>
              </div>
            </main>
            {/* Footer container */}
            <div className="w-full">
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

function PostPage({ posts, setCurrentPost }) {
  const { slug } = useParams();
  const post = posts.find(p => p.slug === slug);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    if (post) {
      setCurrentPost(post);
    }
    return () => setCurrentPost(null);
  }, [post, setCurrentPost]);

  if (!post) {
    return <div>Post not found</div>;
  }

  return <PostContent post={post} />;
}

function CategoryList({ posts }) {
  const categories = [...new Set(posts.flatMap(post => post.tags))];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">View by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map(category => (
          <Link
            key={category}
            to={`/category/${category}`}
            className="bg-gray-100 hover:bg-gray-200 rounded-lg p-4 text-center"
          >
            {category}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default App;
