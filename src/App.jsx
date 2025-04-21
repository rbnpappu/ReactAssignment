import { useState } from 'react';
import axios from 'axios';
import './App.css';
import HomePage from './HomePage';

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post('https://fakestoreapi.com/auth/login', {
        username: email,
        password: password
      });

      if (response && response.data.token) {
        setToken(true);
        localStorage.setItem("token", response.data.token);
      } else {
        setError("Invalid credentials. Try again.");
      }
    } catch (err) {
      setError("Login failed. Check your credentials.");
      console.error(err);
    }
  };

  return (
    <>
      {!token ? (
        <div className='flex justify-center items-center bg-blue-500 h-[100vh] w-full'>
          <form onSubmit={handleSubmit} className='flex flex-col justify-center bg-white p-6 rounded-lg shadow-md w-80 gap-5'>
            <h3 className='text-center text-xl font-semibold'>Welcome</h3>

            <input
              name="email"
              placeholder='Type User Name'
              value={email}
              onChange={handleChange}
              className='p-2 border rounded'
              required
            />

            <input
              name="password"
              type="password"
              placeholder='Password'
              value={password}
              onChange={handleChange}
              className='p-2 border rounded'
              required
            />

            {error && <p className='text-red-500 text-sm text-center'>{error}</p>}

            <button
              type="submit"
              className='rounded-[10px] bg-blue-500 hover:bg-blue-600 text-white py-2 transition'
            >
              Login
            </button>
          </form>
        </div>
      ) : (
        <HomePage />
      )}
    </>
  );
}

export default App;
