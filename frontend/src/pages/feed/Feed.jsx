import VideoCard from '../../components/VideoCard';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

export default function Feed() {
  const [videos, setVideos] = useState([]);
  const location = useLocation();

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await axios.get('http://localhost:3000/api/food', {
          withCredentials: true
        });
        setVideos(response.data.foodItems || response.data); 
      } catch (error) {
        console.error("Failed to fetch feed:", error);
      }
    }
     
    fetchVideos();
  }, []);

  return (
    <div className="h-screen w-full bg-neutral-950 flex justify-center overflow-hidden">
      
      <div className="h-full w-full max-w-md bg-black relative sm:border-x sm:border-neutral-800 shadow-2xl">
        
        {/* 
          Scrollbar Hide Fix applied here.
          [scrollbar-width:none] handles Firefox.
          [-ms-overflow-style:none] handles Edge/IE.
          [&::-webkit-scrollbar]:hidden handles Chrome/Safari.
        */}
        <div className="h-full w-full overflow-y-scroll snap-y snap-mandatory pb-14 [scrollbar-none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {videos.map((video) => (
            <VideoCard 
              key={video._id}
              videoId={video._id}
              videoUrl={video.video}
              title={video.name} 
              partner={video.foodPartner}
              likes={video.likeCount || 0}
            />
          ))}
        </div>

        <div className="absolute bottom-0 left-0 w-full bg-black/30 backdrop-blur-xl border-t border-white/10 z-50 flex justify-around items-center py-2 pb-4 shadow-[0_-10px_30px_rgba(0,0,0,0.1)]">
          
          <Link 
            to="/" 
            className={`flex flex-col items-center gap-1 transition-colors ${
              location.pathname === '/' ? 'text-white' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill={location.pathname === '/' ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            <span className="text-[10px] font-bold tracking-wider uppercase drop-shadow-md">Home</span>
          </Link>

          <Link 
            to="/saved" 
            className={`flex flex-col items-center gap-1 transition-colors ${
              location.pathname === '/saved' ? 'text-white' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill={location.pathname === '/saved' ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
            <span className="text-[10px] font-bold tracking-wider uppercase drop-shadow-md">Saved</span>
          </Link>

        </div>
      </div>
    </div>
  );
}