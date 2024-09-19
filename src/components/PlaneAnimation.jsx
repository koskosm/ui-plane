import React from 'react';
import './PlaneAnimation.css';

function PlaneAnimation({ currentPost }) {
  // Generate random delay between -40s and 0s
  const randomDelay = () => Math.floor(Math.random() * -40) + 's';

  const emoji = currentPost ? currentPost.emoji : '✈️';
  const isPostPage = !!currentPost;

  return (
    <div className="plane-animation-container">
      <div className="clouds">
        {[...Array(12)].map((_, index) => (
          <div 
            key={index} 
            className={`cloud cloud${index + 1}`}
            style={{ animationDelay: randomDelay() }}
          >
            {[...Array(10)].map((_, i) => (
              <div key={i}></div>
            ))}
          </div>
        ))}
      </div>
      <div className={`plane ${isPostPage ? 'no-rotate' : ''}`}>{emoji}</div>
    </div>
  );
}

export default PlaneAnimation;