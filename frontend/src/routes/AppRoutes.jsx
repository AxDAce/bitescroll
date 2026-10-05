import { Routes, Route } from 'react-router-dom';

// Import your auth pages
import UserLogin from '../pages/auth/UserLogin';
import UserRegister from '../pages/auth/UserRegister';
import FoodPartnerLogin from '../pages/auth/FoodPartnerLogin';
import FoodPartnerRegister from '../pages/auth/FoodPartnerRegister';
import PartnerProfile from '../pages/feed/partnerProfile';

// 1. Import your new Feed component
import Feed from '../pages/feed/Feed'; 
import CreateFood from '../pages/food/CreateFood';

export default function AppRoutes() {
  return (
    <Routes>
      {/* 2. Add the Feed to your main home route */}
      <Route path="/" element={<Feed />} />
      
      {/* User Routes */}
      <Route path="/login" element={<UserLogin />} />
      <Route path="/register" element={<UserRegister />} />
      
      {/* Food Partner Routes */}
      <Route path="/partner/login" element={<FoodPartnerLogin />} />
      <Route path="/partner/register" element={<FoodPartnerRegister />} />

      <Route path="/food-partner/:id" element={<PartnerProfile />} />

      <Route path='/createFood' element={<CreateFood/>} />
    </Routes>
  );
}