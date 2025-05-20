import React from 'react';
import styled from 'styled-components';
import AnimalCard from '../components/Animal/AnimalCard';
import { useAnimalContext } from '../context/AnimalContext';
import { useUserContext } from '../context/UserContext';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const PageHeader = styled.header`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  color: #03045e;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  color: #023e8a;
  font-size: 1.1rem;
  max-width: 800px;
  margin: 0 auto;
`;

const ProgressSection = styled.section`
  background-color: #f0f9ff;
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  text-align: center;
`;

const ProgressTitle = styled.h2`
  color: #03045e;
  font-size: 1.3rem;
  margin-bottom: 1rem;
`;

const ProgressStats = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #0077b6;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: #023e8a;
`;

const AnimalsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const AnimalsPage = () => {
  const { user } = useUserContext();
  const { animals, rescuedAnimals, getAnimalsByAge } = useAnimalContext();
  
  // Filter animals by user's age if available
  const displayAnimals = user.age ? getAnimalsByAge(user.age) : animals;
  
  return (
    <PageContainer>
      <PageHeader>
        <Title>Meet the Animals</Title>
        <Subtitle>These marine animals need your help to escape from plastic pollution.</Subtitle>
      </PageHeader>
      
      <ProgressSection>
        <ProgressTitle>Your Rescue Progress</ProgressTitle>
        <ProgressStats>
          <StatItem>
            <StatValue>{rescuedAnimals.length}</StatValue>
            <StatLabel>Animals Rescued</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>{displayAnimals.length - rescuedAnimals.length}</StatValue>
            <StatLabel>Animals to Rescue</StatLabel>
          </StatItem>
        </ProgressStats>
      </ProgressSection>
      
      <AnimalsGrid>
        {displayAnimals.map(animal => (
          <AnimalCard key={animal.id} animal={animal} />
        ))}
      </AnimalsGrid>
    </PageContainer>
  );
};

export default AnimalsPage; 