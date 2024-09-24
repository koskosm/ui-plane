import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import TabsDemo from './TabsDemo';
import TooltipDemo from './TooltipDemo';
import RelatedPostCard from './RelatedPostCard';

function AccordionItem({ header, content }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="accordion-item">
      <button
        className={`accordion-header ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {header}
      </button>
      <div
        className="accordion-content"
        style={{ maxHeight: isOpen ? '1000px' : '0' }}
      >
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
}

function BreadcrumbDemo({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="breadcrumb-demo">
      <ol className="breadcrumb">
        {items.map((item, index) => (
          <li key={index} className="breadcrumb-item">
            {index < items.length - 1 ? (
              <button onClick={() => console.log(`Navigating to ${item.path}`)} className="breadcrumb-link">
                {item.path}
              </button>
            ) : (
              <span aria-current="page">{item.path}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

function ButtonDemo({ items }) {
  return (
    <div className="button-demo">
      {items.map((item, index) => (
        <button
          key={index}
          className={`btn btn-${item.type}`}
          disabled={item.disabled}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

function CardDemo({ items }) {
  return (
    <div className="card-demo">
      {items.map((item, index) => (
        <div key={index} className="card" style={{ backgroundColor: item.color }}>
          <div className="card-content">
            <h2 className="card-title">{item.title}</h2>
            <p className="card-text">{item.text}</p>
            <button className="card-button">{item.buttonText}</button>
          </div>
        </div>
      ))}
    </div>
  );
}

function CarouselDemo({ items }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [items.length]);

  const showSlide = (index) => {
    if (index < 0) index = items.length - 1;
    if (index >= items.length) index = 0;
    setCurrentIndex(index);
  };

  return (
    <div className="carousel">
      <div className="carousel-inner" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {items.map((item, index) => (
          <div key={index} className="carousel-item" style={{ backgroundColor: item.color }}>
            {item.content}
          </div>
        ))}
      </div>
      <button className="carousel-control prev" onClick={() => showSlide(currentIndex - 1)}>&lt;</button>
      <button className="carousel-control next" onClick={() => showSlide(currentIndex + 1)}>&gt;</button>
    </div>
  );
}

function BarChartDemo({ data }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (data && chartRef.current) {
      const margin = { top: 20, right: 20, bottom: 30, left: 40 };
      const width = 400 - margin.left - margin.right;
      const height = 300 - margin.top - margin.bottom;

      const svg = d3.select(chartRef.current)
        .append('svg')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
        .append('g')
          .attr('transform', `translate(${margin.left},${margin.top})`);

      const x = d3.scaleBand()
        .range([0, width])
        .padding(0.1);

      const y = d3.scaleLinear()
        .range([height, 0]);

      x.domain(data.map(d => d.category));
      y.domain([0, d3.max(data, d => d.value)]);

      svg.selectAll('.bar')
        .data(data)
        .enter().append('rect')
          .attr('class', 'bar')
          .attr('x', d => x(d.category))
          .attr('width', x.bandwidth())
          .attr('y', d => y(d.value))
          .attr('height', d => height - y(d.value))
          .attr('fill', '#4CAF50');

      svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x));

      svg.append('g')
        .call(d3.axisLeft(y));
    }
  }, [data]);

  return <div ref={chartRef}></div>;
}

function DropdownDemo({ items }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('Select an option');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      <button className="dropdown-toggle" onClick={handleToggle}>
        {selectedItem}
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {items.map((item, index) => (
            <li key={index} onClick={() => handleSelect(item)}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function FormValidationDemo({ fields }) {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    validateField(name, formData[name]);
  };

  const validateField = (fieldName, value) => {
    let error = '';
    const field = fields.find(f => f.type === fieldName);

    if (field.required && !value) {
      error = `${field.label} is required`;
    } else if (fieldName === 'email' && value && !isValidEmail(value)) {
      error = 'Please enter a valid email address';
    } else if (fieldName === 'password' && value && value.length < field.minLength) {
      error = `Password must be at least ${field.minLength} characters long`;
    }

    setErrors(prevErrors => ({ ...prevErrors, [fieldName]: error }));
  };

  const validateForm = () => {
    let formIsValid = true;
    fields.forEach(field => {
      const value = formData[field.type] || '';
      validateField(field.type, value);
      if (errors[field.type]) formIsValid = false;
    });
    return formIsValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allTouched = fields.reduce((acc, field) => ({ ...acc, [field.type]: true }), {});
    setTouched(allTouched);
    if (validateForm()) {
      alert('Form submitted successfully!');
    }
  };

  const isValidEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <form onSubmit={handleSubmit} className="form-validation-demo">
      {fields.map((field, index) => (
        <div key={index} className="form-group">
          <label htmlFor={field.type}>{field.label}:</label>
          <input
            type={field.type}
            id={field.type}
            name={field.type}
            required={field.required}
            minLength={field.minLength}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched[field.type] && errors[field.type] && (
            <span className="error-message">{errors[field.type]}</span>
          )}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}

function HamburgerMenuDemo({ menuItems }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="hamburger-menu-demo">
      <button className={`hamburger-button ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      <nav className={`menu ${isOpen ? 'open' : ''}`}>
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}><a href={item.url}>{item.label}</a></li>
          ))}
        </ul>
      </nav>
      <style jsx>{`
        .hamburger-menu-demo {
          position: relative;
          height: 300px;
          border: 1px solid #ddd;
          overflow: hidden;
        }
        .hamburger-button {
          position: absolute;
          top: 10px;
          left: 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          width: 2rem;
          height: 2rem;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
          z-index: 10;
        }
        .hamburger-button span {
          width: 2rem;
          height: 0.25rem;
          background: #333;
          border-radius: 10px;
          transition: all 0.3s linear;
          position: relative;
          transform-origin: 1px;
        }
        .hamburger-button.open span:first-child {
          transform: rotate(45deg);
        }
        .hamburger-button.open span:nth-child(2) {
          opacity: 0;
        }
        .hamburger-button.open span:nth-child(3) {
          transform: rotate(-45deg);
        }
        .menu {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 70%;
          max-width: 300px;
          background: #f8f8f8;
          transform: translateX(-100%);
          transition: transform 0.3s ease-in-out;
        }
        .menu.open {
          transform: translateX(0);
        }
        .menu ul {
          list-style: none;
          padding: 0;
          margin: 50px 0 0 0;
        }
        .menu li {
          padding: 1rem;
        }
        .menu a {
          text-decoration: none;
          color: #333;
          font-size: 1.2rem;
        }
      `}</style>
    </div>
  );
}

function LoadingIndicatorDemo({ indicators }) {
  const [currentIndicator, setCurrentIndicator] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndicator((prevIndex) => (prevIndex + 1) % indicators.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [indicators.length]);

  const renderIndicator = (type) => {
    switch (type) {
      case 'spinner':
        return <div className="spinner"></div>;
      case 'progress':
        return <div className="progress-bar"><div className="progress"></div></div>;
      case 'dots':
        return <div className="dots"><div></div><div></div><div></div></div>;
      default:
        return null;
    }
  };

  return (
    <div className="loading-indicator-demo">
      <div className="indicator-container">
        {renderIndicator(indicators[currentIndicator].type)}
      </div>
      <p>{indicators[currentIndicator].label}</p>
    </div>
  );
}

function PaginationDemo({ pages }) {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < pages.length) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="pagination-demo">
      <div className="pagination-content">
        <h3>{pages[currentPage].title}</h3>
        <p>{pages[currentPage].content}</p>
      </div>
      <div className="pagination-controls">
        <button 
          onClick={() => handlePageChange(currentPage - 1)} 
          disabled={currentPage === 0}
        >
          Previous
        </button>
        <span>{currentPage + 1} / {pages.length}</span>
        <button 
          onClick={() => handlePageChange(currentPage + 1)} 
          disabled={currentPage === pages.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}

function PostContent({ post, allPosts }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger the animation after a short delay
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const createMarkup = (html) => ({ __html: html });

  const relatedPosts = allPosts
    .filter(p => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  const renderDemo = () => {
    if (!post.demo) return null;

    const demoContent = typeof post.demo === 'string' ? JSON.parse(post.demo) : post.demo;
    
    if (post.slug === 'accordion-pattern') {
      return (
        <>
          <h2 className="text-2xl font-bold mt-8 mb-4">Live Demo</h2>
          <p className="mb-4">Here's a live demo of the accordion pattern. Try clicking on the headers to expand and collapse the sections:</p>
          <div className="accordion-demo">
            <div className="accordion">
              {demoContent.map((item, index) => (
                <AccordionItem key={index} header={item.header} content={item.content} />
              ))}
            </div>
          </div>
        </>
      );
    } else if (post.slug === 'breadcrumb-navigation-pattern') {
      return (
        <>
          <h2 className="text-2xl font-bold mt-8 mb-4">Live Demo</h2>
          <p className="mb-4">Here's a live demo of the breadcrumb navigation pattern:</p>
          <BreadcrumbDemo items={demoContent} />
        </>
      );
    } else if (post.slug === 'button-design') {
      return (
        <>
          <h2 className="text-2xl font-bold mt-8 mb-4">Live Demo</h2>
          <p className="mb-4">Here's a live demo of various button styles:</p>
          <ButtonDemo items={demoContent} />
        </>
      );
    } else if (post.slug === 'card-design-pattern') {
      return (
        <>
          <h2 className="text-2xl font-bold mt-8 mb-4">Live Demo</h2>
          <p className="mb-4">Here's a live demo of the card design pattern:</p>
          <CardDemo items={demoContent} />
        </>
      );
    } else if (post.slug === 'carousel-pattern') {
      return (
        <>
          <h2 className="text-2xl font-bold mt-8 mb-4">Live Demo</h2>
          <p className="mb-4">Here's a live demo of the carousel pattern:</p>
          <CarouselDemo items={demoContent} />
        </>
      );
    } else if (post.slug === 'data-visualization-patterns') {
      return (
        <>
          <h2 className="text-2xl font-bold mt-8 mb-4">Live Demo</h2>
          <p className="mb-4">Here's a live demo of a simple bar chart:</p>
          <BarChartDemo data={demoContent} />
        </>
      );
    } else if (post.slug === 'dropdown-pattern') {
      return (
        <>
          <h2 className="text-2xl font-bold mt-8 mb-4">Live Demo</h2>
          <p className="mb-4">Here's a live demo of the dropdown pattern:</p>
          <DropdownDemo items={demoContent} />
        </>
      );
    } else if (post.slug === 'form-validation-pattern') {
      return (
        <>
          <h2 className="text-2xl font-bold mt-8 mb-4">Live Demo</h2>
          <p className="mb-4">Here's a live demo of form validation:</p>
          <FormValidationDemo fields={demoContent.fields} />
        </>
      );
    } else if (post.slug === 'hamburger-menu-pattern') {
      return (
        <>
          <h2 className="text-2xl font-bold mt-8 mb-4">Live Demo</h2>
          <p className="mb-4">Click the hamburger icon to toggle the menu:</p>
          <HamburgerMenuDemo menuItems={demoContent.menuItems} />
        </>
      );
    } else if (post.slug === 'loading-indicators') {
      return (
        <>
          <h2 className="text-2xl font-bold mt-8 mb-4">Live Demo</h2>
          <p className="mb-4">Here's a live demo of various loading indicators:</p>
          <LoadingIndicatorDemo indicators={demoContent} />
        </>
      );
    } else if (post.slug === 'modal-dialog-pattern') {
      return (
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Demo</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {demoContent.buttonText}
          </button>
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg max-w-md">
                <h3 className="text-xl font-bold mb-4">{demoContent.modalTitle}</h3>
                <p className="mb-4">{demoContent.modalContent}</p>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      alert('OK clicked!');
                      setIsModalOpen(false);
                    }}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    } else if (post.slug === 'pagination-pattern') {
      return (
        <>
          <h2 className="text-2xl font-bold mt-8 mb-4">Live Demo</h2>
          <p className="mb-4">Here's a simple pagination demo with 3 pages:</p>
          <PaginationDemo pages={demoContent} />
        </>
      );
    } else if (post.slug === 'tabs-pattern') {
      return (
        <>
          <h2 className="text-2xl font-bold mt-8 mb-4">Live Demo</h2>
          <p className="mb-4">Here's a simple tabs demo with 3 tabs:</p>
          <TabsDemo />
        </>
      );
    } else if (post.slug === 'tooltip-pattern') {
      return (
        <>
          <h2 className="text-2xl font-bold mt-8 mb-4">Live Demo</h2>
          <p className="mb-4">Hover over the information icon to see the tooltip:</p>
          <div 
            onMouseEnter={() => setIsTooltipVisible(true)}
            onMouseLeave={() => setIsTooltipVisible(false)}
          >
            <TooltipDemo 
              isTooltipVisible={isTooltipVisible}
              tooltipContent={demoContent.tooltipContent}
            />
          </div>
        </>
      );
    }
    
    return null;
  };

  return (
    <div className={`post-container max-w-4xl mx-auto transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-500 mb-4">{post.category}</p>
      <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={createMarkup(post.content)} />
      {renderDemo()}
      
      {/* Related Posts Section */}
      {relatedPosts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map(relatedPost => (
              <RelatedPostCard key={relatedPost.slug} post={relatedPost} />
            ))}
          </div>
        </div>
      )}
      
      <style jsx>{`
        .accordion-item {
          border: 1px solid #ddd;
          margin-bottom: 5px;
        }
        .accordion-header {
          background-color: #f4f4f4;
          color: #444;
          cursor: pointer;
          padding: 18px;
          width: 100%;
          text-align: left;
          border: none;
          outline: none;
          transition: 0.4s;
        }
        .accordion-header:hover, .accordion-header.active {
          background-color: #ddd;
        }
        .accordion-content {
          background-color: white;
          overflow: hidden;
          transition: max-height 0.2s ease-out;
        }
        .accordion-content > div {
          padding: 18px;
        }
        .breadcrumb {
          display: flex;
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .breadcrumb-item {
          display: flex;
          align-items: center;
        }
        .breadcrumb-item:not(:last-child)::after {
          content: "/";
          margin: 0 0.5rem;
          color: #6c757d;
        }
        .breadcrumb-item a {
          color: #007bff;
          text-decoration: none;
        }
        .breadcrumb-item a:hover {
          text-decoration: underline;
        }
        .breadcrumb-item span {
          color: #6c757d;
        }
        .button-demo {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .btn {
          padding: 10px 20px;
          font-size: 16px;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s, color 0.3s, border-color 0.3s;
        }
        .btn-primary {
          background-color: #007bff;
          color: white;
          border: none;
        }
        .btn-primary:hover:not(:disabled) {
          background-color: #0056b3;
        }
        .btn-secondary {
          background-color: #6c757d;
          color: white;
          border: none;
        }
        .btn-secondary:hover:not(:disabled) {
          background-color: #545b62;
        }
        .btn-outline {
          background-color: transparent;
          color: #007bff;
          border: 1px solid #007bff;
        }
        .btn-outline:hover:not(:disabled) {
          background-color: #007bff;
          color: white;
        }
        .btn-text {
          background-color: transparent;
          color: #007bff;
          border: none;
        }
        .btn-text:hover:not(:disabled) {
          text-decoration: underline;
        }
        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .card-demo {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          justify-content: center;
        }
        .card {
          width: 300px;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          transition: transform 0.3s ease;
        }
        .card:hover {
          transform: translateY(-5px);
        }
        .card-content {
          padding: 16px;
          color: white;
        }
        .card-title {
          margin: 0 0 8px 0;
          font-size: 1.25rem;
        }
        .card-text {
          margin: 0 0 16px 0;
        }
        .card-button {
          display: inline-block;
          padding: 8px 16px;
          background-color: white;
          color: #333;
          border: none;
          text-decoration: none;
          border-radius: 4px;
          transition: background-color 0.3s ease;
          cursor: pointer;
        }
        .card-button:hover {
          background-color: #f0f0f0;
        }
        .carousel {
          position: relative;
          width: 100%;
          overflow: hidden;
        }
        .carousel-inner {
          display: flex;
          transition: transform 0.3s ease-in-out;
        }
        .carousel-item {
          flex: 0 0 100%;
          height: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          color: white;
        }
        .carousel-control {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0, 0, 0, 0.5);
          color: white;
          border: none;
          padding: 10px;
          cursor: pointer;
        }
        .carousel-control.prev { left: 10px; }
        .carousel-control.next { right: 10px; }
        .bar:hover {
          fill: #45a049;
        }
        .breadcrumb-link {
          color: #007bff;
          background: none;
          border: none;
          padding: 0;
          font: inherit;
          cursor: pointer;
          text-decoration: underline;
        }
        .breadcrumb-link:hover {
          color: #0056b3;
        }
        .custom-dropdown {
          position: relative;
          display: inline-block;
        }
        .dropdown-toggle {
          padding: 10px 15px;
          background-color: #f8f9fa;
          border: 1px solid #ced4da;
          border-radius: 4px;
          cursor: pointer;
        }
        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          z-index: 1000;
          display: block;
          min-width: 160px;
          padding: 5px 0;
          margin: 2px 0 0;
          background-color: #fff;
          border: 1px solid rgba(0,0,0,.15);
          border-radius: 4px;
          box-shadow: 0 6px 12px rgba(0,0,0,.175);
        }
        .dropdown-menu li {
          padding: 3px 20px;
          cursor: pointer;
        }
        .dropdown-menu li:hover {
          background-color: #f8f9fa;
        }
        .form-validation-demo .form-group {
          margin-bottom: 15px;
        }
        .form-validation-demo label {
          display: block;
          margin-bottom: 5px;
        }
        .form-validation-demo input {
          width: 100%;
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        .form-validation-demo input:invalid {
          border-color: #ff4136;
        }
        .form-validation-demo .error-message {
          color: #ff4136;
          font-size: 0.8em;
          margin-top: 5px;
          display: block;
        }
        .form-validation-demo button {
          background-color: #0056b3;
          color: white;
          padding: 10px 15px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .form-validation-demo button:hover {
          background-color: #003d82;
        }

        .loading-indicator-demo {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 200px;
          background-color: #f0f0f0;
          border-radius: 8px;
        }

        .indicator-container {
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .spinner {
          width: 50px;
          height: 50px;
          border: 5px solid #f3f3f3;
          border-top: 5px solid #3498db;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .progress-bar {
          width: 200px;
          height: 20px;
          background-color: #f3f3f3;
          border-radius: 10px;
          overflow: hidden;
        }

        .progress {
          width: 0;
          height: 100%;
          background-color: #3498db;
          animation: progress 3s linear infinite;
        }

        .dots {
          display: flex;
          gap: 10px;
        }

        .dots div {
          width: 20px;
          height: 20px;
          background-color: #3498db;
          border-radius: 50%;
          animation: bounce 1.4s infinite ease-in-out both;
        }

        .dots div:nth-child(1) { animation-delay: -0.32s; }
        .dots div:nth-child(2) { animation-delay: -0.16s; }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes progress {
          0% { width: 0; }
          100% { width: 100%; }
        }

        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }

        .pagination-demo {
          border: 1px solid #ddd;
          border-radius: 4px;
          padding: 20px;
          max-width: 600px;
          margin: 0 auto;
        }

        .pagination-content {
          min-height: 150px;
          margin-bottom: 20px;
        }

        .pagination-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .pagination-controls button {
          background-color: #007bff;
          color: white;
          border: none;
          padding: 10px 15px;
          border-radius: 4px;
          cursor: pointer;
        }

        .pagination-controls button:disabled {
          background-color: #cccccc;
          cursor: not-allowed;
        }

        .pagination-controls span {
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}

export default PostContent;