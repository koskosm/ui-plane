import React, { useState, useEffect } from 'react';

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
              <a href={item.url}>{item.path}</a>
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
            <a href="#" className="card-button">{item.buttonText}</a>
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

function PostContent({ post }) {
  const createMarkup = (html) => ({ __html: html });

  const renderDemo = () => {
    if (!post.demo) return null;

    const demoContent = JSON.parse(post.demo);
    
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
    }
    
    return null;
  };

  return (
    <div className="post-container max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-500 mb-4">{post.category}</p>
      <div className="prose max-w-none" dangerouslySetInnerHTML={createMarkup(post.content)} />
      {renderDemo()}
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
          text-decoration: none;
          border-radius: 4px;
          transition: background-color 0.3s ease;
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
      `}</style>
    </div>
  );
}

export default PostContent;