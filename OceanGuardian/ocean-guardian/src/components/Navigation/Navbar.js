import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavContainer = styled.nav`
  background-color: #0077b6;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const AppTitle = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  
  &:hover {
    color: #caf0f8;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    color: #caf0f8;
    text-decoration: underline;
  }
  
  &.active {
    text-decoration: underline;
  }
`;

const Navbar = () => {
  return (
    <NavContainer>
      <AppTitle to="/">
        🌊 Ocean Guardian
      </AppTitle>
      
      <NavLinks>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/animals">Animals</NavLink>
        <NavLink to="/learn">Learn</NavLink>
        <NavLink to="/actions">Actions</NavLink>
      </NavLinks>
    </NavContainer>
  );
};

export default Navbar; 