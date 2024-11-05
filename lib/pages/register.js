// pages/register.js
import { useState } from 'react';
import { auth } from '../lib/firebase';
import { useRouter } from 'next/router';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      router.push('/');
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}
