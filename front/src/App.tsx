import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

import EditPage from './components/Pages/Edit';
import MainPage from './components/Pages/Main';
import NewPage from './components/Pages/New';

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <div className='App'>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='new' element={<NewPage />} />
          <Route path='edit/:id' element={<EditPage />} />
        </Routes>
      </div>
    </SnackbarProvider>
  );
}

export default App;
