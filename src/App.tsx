import React from 'react';
import Wallet from "@components/wallet";
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <button
      type="button"
      className="relative block h-screen w-screen border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
     <span className="mt-2 block text-sm font-medium text-gray-900">
        <Wallet />
      </span>
    </button>
  );
}

export default App;
