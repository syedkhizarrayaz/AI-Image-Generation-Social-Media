import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import { mainlogo } from './assets';
import { Home, CreatePost } from './page';

// create a component to render the app
const App = () => (
  // wrap the app with the BrowserRouter
  <BrowserRouter>
    <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
      <Link to="/">
        <img src={mainlogo} alt="logo" className="w-12 object-contain" />
      </Link>
      
      <Link to="/create-post" className="font-inter font-medium bg-[#5085e9] text-white px-4 py-2 rounded-md">Generate</Link>
    </header>
    <main className="sm:p-8 px-4 py-8 w-full bg-[#ebedf5] min-h-[calc(100vh-73px)]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-post" element={<CreatePost />} />
      </Routes>
    </main>
  </BrowserRouter>
);

export default App;
