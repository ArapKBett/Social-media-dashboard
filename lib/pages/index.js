// pages/index.js
import { useEffect, useState } from 'react';
import { auth, db } from '../lib/firebase';
import { useRouter } from 'next/router';

export default function Home() {
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        fetchData();
      } else {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchData = async () => {
    const snapshot = await db.collection('socialMediaData').get();
    const data = snapshot.docs.map(doc => doc.data());
    setData(data);
  };

  return (
    <div>
      <h1>Social Media Dashboard</h1>
      {data.map((item, index) => (
        <div key={index}>
          <h2>{item.title}</h2>
          <p>{item.content}</p>
        </div>
      ))}
    </div>
  );
}
