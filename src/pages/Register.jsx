// src/pages/Register.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase-config'; // ✅ Corrected import

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const minLength = 6;
    return password.length >= minLength;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    // Check if password meets minimum length
    if (!validatePassword(password)) {
      alert('Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true); // Set loading state to true
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Create user profile in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        createdAt: serverTimestamp(),
        role: "user", // Default role
      });

      alert('Registration successful 🎉');
      navigate('/login'); // Redirect to login after successful registration
    } catch (error) {
      console.error(error);

      // Specific error handling
      if (error.code === 'auth/email-already-in-use') {
        alert('This email is already in use. Please try logging in or use a different email.');
      } else {
        alert('Registration failed ❌');
      }
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form className="bg-white p-8 rounded shadow-md w-96" onSubmit={handleRegister}>
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button 
          type="submit" 
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;
