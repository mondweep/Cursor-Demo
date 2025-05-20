import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';
import './App.css';

import { UserProvider } from './context/UserContext';
import { AnimalProvider } from './context/AnimalContext';
import { ContentProvider } from './context/ContentContext';
import Navbar from './components/Navigation/Navbar';
import AppRouter from './AppRouter';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #f8f9fa;
`;

const Main = styled.main`
  padding-top: 1rem;
  min-height: calc(100vh - 60px);
`;

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <AnimalProvider>
          <ContentProvider>
            <AppContainer>
              <Navbar />
              <Main>
                <AppRouter />
              </Main>
            </AppContainer>
          </ContentProvider>
        </AnimalProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
