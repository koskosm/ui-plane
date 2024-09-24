import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useParams, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import PostList from './components/PostList';
import PostContent from './components/PostContent';
import { posts } from './data/posts';
import CategoryPage from './components/CategoryPage';
import SearchBox from './components/SearchBox';
import Footer from './components/Footer';
import './customFonts.css';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppContent() {
  const [searchResults, setSearchResults] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const categories = [...new Set(posts.flatMap(post => post.tags))];
  const location = useLocation();
  const [prevPathname, setPrevPathname] = useState("/");

  const [currentPostEmoji, setCurrentPostEmoji] = useState(null);

  useEffect(() => {
    if (location.pathname !== prevPathname) {
      setPrevPathname(location.pathname);
    }
  }, [location, prevPathname]);

  useEffect(() => {
    if (location.pathname.startsWith('/post/')) {
      const slug = location.pathname.split('/').pop();
      const post = posts.find(p => p.slug === slug);
      setCurrentPostEmoji(post ? post.emoji : null);
    } else {
      setCurrentPostEmoji(null);
    }
  }, [location]);

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

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const showHeaderContent = !location.pathname.startsWith('/post/');

  return (
    <div className="App flex flex-col min-h-screen bg-[#1D2226] text-white font-basier">
      <Navbar postEmoji={currentPostEmoji} />
      <div className="flex-grow flex">
        <div className="flex-grow flex flex-col overflow-x-hidden">
          <main className="flex-grow px-4 lg:px-8 pb-12">
            <div className="max-w-7xl mx-auto mt-8">
              {showHeaderContent && (
                <div className="text-left mb-12">
                  
                  <p className="text-3xl md:text-6xl mb-8 pb-20 pt-20">
                    A UI flight checklist and collection of best design practices!
                  </p>
                  <div className="flex flex-col items-start">
                    <div className="flex items-center w-full">
                      <SearchBox onSearch={handleSearch} searchTerm={searchTerm} onClear={handleClearSearch} />
                      <div className="relative ml-4 grow justify-end flex">
                        <button
                          onClick={toggleFilter}
                          className="px-4 py-2 border border-white text-white rounded-full hover:bg-white hover:text-black transition-colors duration-200"
                        >
                          Filter
                        </button>
                        {isFilterOpen && (
                          <div className="absolute right-0 mt-12 w-64 bg-white text-black rounded-md shadow-lg z-10 max-h-60 overflow-scroll">
                            <div className="py-2">
                              {categories.map((category, index) => (
                                <Link
                                  key={index}
                                  to={`/category/${encodeURIComponent(category)}`}
                                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                                  onClick={() => setIsFilterOpen(false)}
                                >
                                  {category}
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div>
                <Routes location={location}>
                  <Route path="/" element={
                    <>
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
                  <Route path="/category/:tag" element={<CategoryPage posts={posts} />} />
                  <Route path="/post/:slug" element={<PostWrapper posts={posts} />} />
                </Routes>
              </div>
            </div>
          </main>
          <div className="w-full">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

function PostWrapper({ posts }) {
  const { slug } = useParams();
  const post = posts.find(p => p.slug === slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  return <PostContent post={post} allPosts={posts} />;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;
