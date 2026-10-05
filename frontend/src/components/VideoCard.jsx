import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function VideoCard({ videoId, videoUrl, title, partner, likes }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(likes || 0);

  const handleLike = async () => {
    try {
      // 1. Remove ${videoId} from the URL
      // 2. Pass { foodId: videoId } as the body instead of {}
      await axios.post('http://localhost:3000/api/food/like', { foodId: videoId }, {
        withCredentials: true
      });
      setIsLiked(!isLiked);
      setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
    } catch (error) {
      console.error("Error liking video:", error);
    }
  };

  const handleSave = async () => {
    try {
      // Same changes here: clean URL, ID in the body
      await axios.post('http://localhost:3000/api/food/save', { foodId: videoId }, {
        withCredentials: true
      });
      setIsSaved(!isSaved);
    } catch (error) {
      console.error("Error saving video:", error);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          videoRef.current?.play().catch(() => {});
          setIsPlaying(true);
        } else {
          videoRef.current?.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.6 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) observer.unobserve(videoRef.current);
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="h-full w-full snap-start relative flex justify-center items-center bg-neutral-900 border-b border-neutral-800">
      <video
        ref={videoRef}
        src={videoUrl}
        className="h-full w-full object-cover cursor-pointer"
        loop
        playsInline
        muted
        onClick={togglePlay}
      />
      
      <div className="absolute bottom-16 left-4 right-16 pr-20 text-white z-10 pointer-events-none flex flex-col items-start gap-1">
        <h3 className="text-lg font-bold drop-shadow-md">{title}</h3>
        <p className="text-rose-500 text-xs font-semibold drop-shadow-md mb-2 truncate w-full">Partner ID: {partner}</p>
        
        <Link 
          to={`/food-partner/${partner}`}
          className="pointer-events-auto bg-neutral-100/90 backdrop-blur-sm text-neutral-900 font-bold text-xs px-4 py-1.5 rounded-full shadow-lg hover:bg-white transition-colors"
        >
          Visit Store
        </Link>
      </div>

      <div className="absolute bottom-16 right-4 z-20 flex flex-col items-center gap-4">
        
        {/* 
          Glassmorphic Action Buttons
          bg-white/10 + backdrop-blur-md makes them frosted and see-through
        */}
        {/* Like Button */}
        <button onClick={handleLike} className="flex flex-col items-center gap-1 group pointer-events-auto">
          <div className="p-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.1)] group-active:scale-90 transition-transform">
            <svg width="24" height="24" viewBox="0 0 24 24" 
              fill={isLiked ? "#f43f5e" : "none"} // Fills red if liked
              stroke={isLiked ? "#f43f5e" : "white"} 
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
              className="group-hover:stroke-rose-500 transition-colors drop-shadow-sm"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </div>
          <span className="text-white text-[10px] font-semibold drop-shadow-md">{likesCount}</span>
        </button>

        <button className="flex flex-col items-center gap-1 group">
          <div className="p-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.1)] group-active:scale-90 transition-transform">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-blue-400 transition-colors drop-shadow-sm">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
          </div>
          <span className="text-white text-[10px] font-semibold drop-shadow-md">0</span>
        </button>

        {/* Save Button */}
        <button onClick={handleSave} className="flex flex-col items-center gap-1 group pointer-events-auto">
          <div className="p-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.1)] group-active:scale-90 transition-transform">
            <svg width="24" height="24" viewBox="0 0 24 24" 
              fill={isSaved ? "#facc15" : "none"} // Fills yellow if saved
              stroke={isSaved ? "#facc15" : "white"} 
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
              className="group-hover:stroke-yellow-400 transition-colors drop-shadow-sm"
            >
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
          <span className="text-white text-[10px] font-semibold drop-shadow-md">Save</span>
        </button>

      </div>
    </div>
  );
}