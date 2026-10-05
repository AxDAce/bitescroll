import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function UserRegister() {
  const navigate=useNavigate();
  const [form, setForm] = useState({
    username:"",
    email:"",
    password:"",
  })

  function handleChange(e){
    setForm({...form,[e.target.name]:e.target.value})
  }

  async function handleSubmit(e){
    
    e.preventDefault()

    await axios.post('http://localhost:3000/api/auth/user/register',{
      username:form.username,
      email:form.email,
      password:form.password
    },{
      withCredentials: true
    })
    navigate('/')
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-neutral-950 font-sans">
      <div className="bg-neutral-900 p-10 rounded-xl shadow-lg border border-neutral-800 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center text-neutral-100">Create User Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input 
            type="text"
            name="username" 
            placeholder="User Name"
            value={form.username}
            onChange={handleChange}
            className="w-full p-3 bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder-neutral-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-900"></input>
          </div>
          <div>
            <input 
            type="email"
            name="email" 
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange} 
            className="w-full p-3 bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder-neutral-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-900" />
          </div>
          <div>
            <input 
            type="password"
            name="password" 
            placeholder="Password"
            value={form.password}
            onChange={handleChange} 
            className="w-full p-3 bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder-neutral-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-900" />
          </div>
          <button type="submit" className="w-full p-3 mt-2 bg-rose-900 text-white rounded-lg font-bold hover:bg-rose-800 transition-colors">Register</button>
        </form>
        
        <div className="mt-6 text-center text-sm text-neutral-400 flex flex-col gap-2">
          <p>
            Want to list your food?{' '}
            <Link to="/partner/register" className="text-rose-600 hover:text-rose-500 font-semibold transition-colors">Register as Food Partner</Link>
          </p>
          <p>
            Already have an account?{' '}
            <Link to="/login" className="text-rose-600 hover:text-rose-500 font-semibold transition-colors">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}