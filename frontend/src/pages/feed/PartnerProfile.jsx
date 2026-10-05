import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function PartnerProfile() {
  const { id } = useParams(); 
  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
      axios.get(`http://localhost:3000/api/foodPartner/${id}`,{
          withCredentials: true
      }).then(res => {
        setProfile(res.data.foodPartner);
        setVideos(res.data.foodPartner.foodItems || []);
      }).catch(error => {
        console.error("Profile fetch error:", error);
      });
  }, [id]);

  if (!profile) return <div className="min-h-screen bg-[#0f1423] text-white flex justify-center items-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#0f1423] font-sans pb-10 flex justify-center">
      
      {/* Main Mobile Container */}
      <div className="w-full max-w-md p-4 pt-8">
        
        {/* Profile Info Card */}
        <div className="bg-[#1a2235] border border-neutral-700/50 rounded-xl p-6 shadow-lg mb-6">
          <div className="flex items-center gap-5 mb-6">
            <img 
              src={profile.avatar || "https://ui-avatars.com/api/?name=Partner&background=242e47&color=fff"} 
              alt={profile.name || "Partner"} 
              className="w-20 h-20 rounded-full object-cover border-2 border-neutral-600"
            />
            <div className="flex flex-col gap-3 flex-1">
              <div className="bg-[#242e47] px-4 py-2 rounded-lg inline-block w-fit">
                <h2 className="text-white font-bold text-lg">{profile.name || "Store Name"}</h2>
              </div>
              <div className="bg-[#242e47] px-4 py-3 rounded-lg">
                <p className="text-neutral-400 text-sm leading-relaxed">{profile.address || "Address not provided"}</p>
              </div>
            </div>
          </div>

          <div className="border-t border-dashed border-neutral-600 my-4"></div>

          {/* Stats Row */}
          <div className="flex justify-around text-center pt-2">
            <div className="flex flex-col">
              <span className="text-neutral-400 text-sm mb-1">total meals</span>
              <span className="text-white font-semibold">{profile.totalMeals || 0}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-neutral-400 text-sm mb-1">customers served</span>
              <span className="text-white font-semibold">{profile.customersServed || 0}k</span>
            </div>
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-3 gap-0.5">
          {videos.map((vid) => (
            <div key={vid._id} className="aspect-3/4 bg-neutral-800 relative group cursor-pointer">
              <video 
                src={vid.video} 
                className="w-full h-full object-cover"
                muted 
                playsInline
                preload="metadata"
                onMouseEnter={(e) => e.target.play().catch(()=>{})}
                onMouseLeave={(e) => {
                  e.target.pause();
                  e.target.currentTime = 0;
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 
        Tailwind v4 Compliant Upload Button Wrapper
        fixed + left-1/2 + -translate-x-1/2 perfectly centers the wrapper on your monitor.
        w-full max-w-md matches your mobile container width.
      */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-md px-6 flex justify-end pointer-events-none z-100">
        <Link 
          to="/create-food"
          className="pointer-events-auto w-14 h-14 bg-linear-to-r from-rose-600 to-orange-600 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(225,29,72,0.4)] hover:scale-110 active:scale-95 transition-all"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </Link>
      </div>
      
    </div>
  );
}