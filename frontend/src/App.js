import { useState } from 'react';
import './App.css';
import UserProfile from './components/UserProfile';

function App() {
  const [submitting, setSubmitting] = useState(false)
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>User Form</h1>
      <UserProfile setSubmitting={setSubmitting}/>
    </div>
  );
}

export default App;
