import React from 'react';
import './App.css';

import { Header } from './components/header/Header';
import { DataTable } from './components/dataTable/DataTable';

function App() {
  return (
    <div className="App" style={{height: '200vh'}}>

    <Header />

    <DataTable />
    </div>
  );
}

export default App;
