// src/App.jsx

import React from 'react';
import AdminPage from './pages/AdminPage';  // Corrected import path

const App = () => {
  return (
    <div className="App">
      <AdminPage />  {/* Rendering AdminPage here */}
    </div>
  );
}

export default App;
