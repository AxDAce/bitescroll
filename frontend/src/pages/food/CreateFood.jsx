import { useState, useRef, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function CreateFood() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [videoURL, setVideoURL] = useState('');
  const [fileError, setFileError] = useState('');
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!videoFile) {
      setVideoURL('');
      return;
    }
    const url = URL.createObjectURL(videoFile);
    setVideoURL(url);
    return () => URL.revokeObjectURL(url);
  }, [videoFile]);

  const onFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) {
      setVideoFile(null);
      setFileError('');
      return;
    }
    if (!file.type.startsWith('video/')) {
      setFileError('Please select a valid video file.');
      return;
    }
    setFileError('');
    setVideoFile(file);
  };

  const openFileDialog = () => fileInputRef.current?.click();

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append("video", videoFile); 

    try {
      await axios.post("http://localhost:3000/api/food", formData, {
        withCredentials: true,
      });
      navigate("/");
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  const isDisabled = useMemo(() => !name.trim() || !videoFile, [name, videoFile]);

  return (
    <div className="min-h-screen bg-neutral-950 flex justify-center text-neutral-100 font-sans">
      <div className="w-full max-w-100 p-4 pt-10">
        
        {/* Kinetic Header */}
        <motion.div 
          initial={{ opacity: 0, x: -10, filter: "blur(4px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mb-8"
        >
          <h1 className="text-4xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-rose-500 via-orange-500 to-rose-500 animate-pulse">
            Drop the Dish
          </h1>
          <p className="text-neutral-400 text-sm font-medium mt-1 tracking-wide">Upload a short reel to showcase your menu.</p>
        </motion.div>

        {/* Tactile Form Card */}
        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onSubmit={onSubmit} 
          className="relative bg-neutral-900/80 backdrop-blur-xl border border-neutral-800/60 p-6 rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Holographic Glare Effect */}
          <div className="absolute -top-20 -right-20 w-48 h-48 bg-rose-600/10 blur-[60px] rounded-full pointer-events-none" />

          <div className="flex flex-col gap-6 relative z-10">
            
            {/* Video Upload Dropzone */}
            <div>
              <input
                id="foodVideo"
                ref={fileInputRef}
                className="hidden"
                type="file"
                accept="video/*"
                onChange={onFileChange}
              />
              
              <AnimatePresence mode="wait">
                {!videoFile ? (
                  <motion.div
                    key="dropzone"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={openFileDialog}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="h-48 rounded-2xl border-2 border-dashed border-neutral-700 bg-neutral-950/50 flex flex-col items-center justify-center cursor-pointer hover:border-rose-500/50 hover:bg-rose-500/5 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rose-500">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                      </svg>
                    </div>
                    <span className="font-bold text-neutral-200">Tap to select video</span>
                    <span className="text-xs text-neutral-500 mt-1">MP4, WebM, MOV</span>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="preview"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative rounded-2xl overflow-hidden aspect-3/4 bg-black border border-neutral-800 shadow-inner"
                  >
                    <video 
                      src={videoURL} 
                      className="w-full h-full object-cover opacity-90" 
                      autoPlay 
                      muted 
                      loop 
                      playsInline 
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                    
                    <button
                      type="button"
                      onClick={() => { setVideoFile(null); setFileError(''); }}
                      className="absolute top-3 right-3 bg-black/60 backdrop-blur-md p-2 rounded-full text-white hover:bg-rose-600 transition-colors pointer-events-auto"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                    
                    <div className="absolute bottom-3 left-3 right-3 flex justify-between text-xs font-semibold text-white px-3 py-2 bg-black/40 backdrop-blur-md rounded-xl">
                      <span className="truncate max-w-30">{videoFile.name}</span>
                      <span className="text-rose-400">{(videoFile.size / 1024 / 1024).toFixed(1)} MB</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              {fileError && <p className="text-rose-500 text-sm mt-2 font-medium">{fileError}</p>}
            </div>

            {/* Name Input */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="foodName" className="text-xs font-bold text-neutral-400 uppercase tracking-wider pl-1">Dish Name</label>
              <input
                id="foodName"
                type="text"
                placeholder="e.g., Triple Truffle Burger"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-neutral-950/50 border border-neutral-800 rounded-xl px-4 py-3.5 text-neutral-100 placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all font-medium"
              />
            </div>

            {/* Description Input */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="foodDesc" className="text-xs font-bold text-neutral-400 uppercase tracking-wider pl-1">Vibe & Ingredients</label>
              <textarea
                id="foodDesc"
                rows={3}
                placeholder="What makes this special?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-neutral-950/50 border border-neutral-800 rounded-xl px-4 py-3.5 text-neutral-100 placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all font-medium resize-none"
              />
            </div>

            {/* Submit Button */}
            <motion.button
              whileTap={!isDisabled ? { scale: 0.96 } : {}}
              type="submit"
              disabled={isDisabled}
              className={`w-full py-4 rounded-xl font-black tracking-wide uppercase transition-all duration-300 mt-2 shadow-lg ${
                isDisabled 
                  ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed shadow-none' 
                  : 'bg-linear-to-r from-rose-600 to-orange-600 text-white shadow-rose-500/25 hover:shadow-rose-500/40'
              }`}
            >
              Post Reel
            </motion.button>

          </div>
        </motion.form>
      </div>
    </div>
  );
}