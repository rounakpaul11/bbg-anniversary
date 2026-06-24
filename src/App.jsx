import React, { useRef } from 'react';
import Hero from './components/Hero';
import PhotoGallery from './components/PhotoGallery';
import MessageCard from './components/MessageCard';
import FallingTextEffect from './components/FallingTextEffect';

function App() {
  const contentRef = useRef(null);

  const handleOpen = () => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-off-white selection:bg-rose-200 selection:text-rose-900">
      <FallingTextEffect />
      
      <main className="relative z-10">
        <Hero onOpen={handleOpen} />
        
        <div ref={contentRef}>
          <PhotoGallery />
          <MessageCard />
        </div>
      </main>
    </div>
  );
}

export default App;
