import React from 'react';
import styled from 'styled-components';

const Card = styled.button`
  background-color: ${props => props.bgColor || '#caf0f8'};
  border: none;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  min-height: 200px;
  width: 100%;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
  
  &:focus {
    outline: 3px solid #0077b6;
  }
`;

const IconContainer = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const Title = styled.h3`
  margin: 0.5rem 0;
  font-size: 1.25rem;
  color: #03045e;
`;

const Description = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: #023e8a;
`;

const FeatureCard = ({ 
  title, 
  description, 
  icon, 
  backgroundColor,
  onClick 
}) => {
  return (
    <Card 
      bgColor={backgroundColor}
      onClick={onClick}
      aria-label={title}
    >
      <IconContainer>
        {icon}
      </IconContainer>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </Card>
  );
};

export default FeatureCard; 