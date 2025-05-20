import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Card = styled.div`
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }
`;

const AnimalImage = styled.div`
  height: 180px;
  background-color: #90e0ef;
  background-image: ${props => props.image ? `url(${props.image})` : 'none'};
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 1rem;
`;

const StatusBadge = styled.div`
  background-color: ${props => props.$rescued ? '#4caf50' : '#ff9800'};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
`;

const CardContent = styled.div`
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const AnimalName = styled.h3`
  margin: 0 0 0.5rem 0;
  color: #03045e;
  font-size: 1.3rem;
`;

const Species = styled.div`
  color: #0077b6;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  color: #023e8a;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
`;

const ActionButton = styled(Link)`
  background-color: #0077b6;
  color: white;
  text-decoration: none;
  padding: 0.6rem 1.2rem;
  border-radius: 25px;
  font-weight: bold;
  text-align: center;
  margin-top: auto;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #023e8a;
  }
`;

const RescuedMessage = styled.div`
  color: #4caf50;
  font-weight: bold;
  margin-top: auto;
  padding: 0.6rem 1.2rem;
  text-align: center;
`;

const StatusMessage = styled.div`
  margin-top: 0.5rem;
  font-style: italic;
  color: ${props => props.$rescued ? '#4caf50' : '#ff9800'};
`;

const AnimalCard = ({ animal }) => {
  const { id, name, species, problem, description, image, rescued } = animal;
  const firstName = name.split(' ')[0];
  
  return (
    <Card>
      <AnimalImage image={image}>
        <StatusBadge $rescued={rescued}>
          {rescued ? 'Rescued' : 'Needs Help'}
        </StatusBadge>
      </AnimalImage>
      
      <CardContent>
        <AnimalName>{name}</AnimalName>
        <Species>{species}</Species>
        <Description>{description}</Description>
        
        <StatusMessage $rescued={rescued}>
          {rescued 
            ? `${firstName} is now safe from plastic pollution!` 
            : `${firstName} needs your help to escape from plastic!`}
        </StatusMessage>
        
        {rescued ? (
          <RescuedMessage>
            {firstName} has been rescued! Thank you for your help.
          </RescuedMessage>
        ) : (
          <ActionButton to={`/animals/${id}/rescue`}>
            Help {firstName}
          </ActionButton>
        )}
      </CardContent>
    </Card>
  );
};

export default AnimalCard; 