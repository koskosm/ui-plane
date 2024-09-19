import React, { useEffect, useState, useMemo } from 'react';
import './PlaneAnimation.css';

function PlaneAnimation({ currentPost }) {
  const [animationState, setAnimationState] = useState('default');

  useEffect(() => {
    if (currentPost) {
      setAnimationState('postEnter');
    } else {
      setAnimationState('homeReturn');
      // Reset to default state after animation completes
      const timer = setTimeout(() => setAnimationState('default'), 1200);
      return () => clearTimeout(timer);
    }
  }, [currentPost]);

  const cloudAnimations = useMemo(() => {
    return Array(12).fill().map(() => ({
      delay: `${Math.floor(Math.random() * -40)}s`,
      duration: `${30 + Math.floor(Math.random() * 20)}s`
    }));
  }, []);

  return (
    <div className="plane-animation-container">
      <div className="clouds">
        {cloudAnimations.map((animation, index) => (
          <div 
            key={index} 
            className={`cloud cloud${index + 1}`}
            style={{ 
              animationDelay: animation.delay,
              animationDuration: animation.duration
            }}
          >
            {[...Array(10)].map((_, i) => (
              <div key={i}></div>
            ))}
          </div>
        ))}
      </div>
      <div className={`plane ${animationState}`}>✈️</div>
      <div className={`post-emoji ${animationState}`}>
        {currentPost ? currentPost.emoji : '🏷️'}
      </div>
    </div>
  );
}

export default PlaneAnimation;