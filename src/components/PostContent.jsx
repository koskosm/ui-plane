import React, { useState } from 'react';

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
      `}</style>
    </div>
  );
}

export default PostContent;