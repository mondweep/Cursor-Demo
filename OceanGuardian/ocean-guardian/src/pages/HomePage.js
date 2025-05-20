import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import FeatureCard from '../components/Navigation/FeatureCard';
import { useUserContext } from '../context/UserContext';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const WelcomeSection = styled.section`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  color: #03045e;
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  color: #023e8a;
  font-size: 1.2rem;
  max-width: 800px;
  margin: 0 auto 2rem;
`;

const AgeSelectionSection = styled.section`
  text-align: center;
  margin-bottom: 3rem;
  background-color: #f0f9ff;
  padding: 2rem;
  border-radius: 12px;
`;

const AgeQuestion = styled.h2`
  color: #03045e;
  margin-bottom: 1.5rem;
`;

const AgeButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const AgeButton = styled.button`
  background-color: ${props => props.selected ? '#0077b6' : 'white'};
  color: ${props => props.selected ? 'white' : '#03045e'};
  border: 2px solid #0077b6;
  border-radius: 25px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.selected ? '#0077b6' : '#e6f5fb'};
  }
  
  &:focus {
    outline: 3px solid #90e0ef;
  }
`;

const FeaturesSection = styled.section`
  margin-top: 2rem;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const HomePage = () => {
  const navigate = useNavigate();
  const { user, setUserAge } = useUserContext();
  const [selectedAge, setSelectedAge] = useState(user.age || 0);
  
  const handleAgeSelect = (age) => {
    setSelectedAge(age);
    setUserAge(age);
  };
  
  const handleFeatureClick = (path) => {
    navigate(path);
  };
  
  return (
    <PageContainer>
      <WelcomeSection>
        <Title>Welcome to Ocean Guardian</Title>
        <Subtitle>
          Join us on a journey to discover how plastic pollution affects marine animals
          and learn what you can do to help protect our oceans.
        </Subtitle>
      </WelcomeSection>
      
      <AgeSelectionSection>
        <AgeQuestion>How old are you?</AgeQuestion>
        <AgeButtonsContainer>
          <AgeButton 
            selected={selectedAge >= 5 && selectedAge <= 8}
            onClick={() => handleAgeSelect(7)}
          >
            5-8 years
          </AgeButton>
          <AgeButton 
            selected={selectedAge >= 9 && selectedAge <= 12}
            onClick={() => handleAgeSelect(10)}
          >
            9-12 years
          </AgeButton>
          <AgeButton 
            selected={selectedAge >= 13}
            onClick={() => handleAgeSelect(13)}
          >
            13+ years
          </AgeButton>
        </AgeButtonsContainer>
      </AgeSelectionSection>
      
      <FeaturesSection>
        <FeaturesGrid>
          <FeatureCard 
            title="Meet the Animals"
            description="Learn about marine animals affected by plastic pollution"
            icon="🐢"
            backgroundColor="#caf0f8"
            onClick={() => handleFeatureClick('/animals')}
          />
          <FeatureCard 
            title="Learn About Plastic"
            description="Discover how plastic affects our oceans and marine life"
            icon="🔍"
            backgroundColor="#ade8f4"
            onClick={() => handleFeatureClick('/learn')}
          />
          <FeatureCard 
            title="Take Action"
            description="Find out how you can help reduce plastic pollution"
            icon="✨"
            backgroundColor="#90e0ef"
            onClick={() => handleFeatureClick('/actions')}
          />
        </FeaturesGrid>
      </FeaturesSection>
    </PageContainer>
  );
};

export default HomePage; 