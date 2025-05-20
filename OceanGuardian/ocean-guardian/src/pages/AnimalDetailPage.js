import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAnimalContext } from '../context/AnimalContext';
import { useContentContext } from '../context/ContentContext';
import { useUserContext } from '../context/UserContext';

const PageContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #0077b6;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const HeroSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 3rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  border-radius: 12px;
  overflow: hidden;
  background-color: #90e0ef;
  min-height: 250px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const AnimalInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const AnimalName = styled.h1`
  color: #03045e;
  margin-bottom: 0.5rem;
`;

const Species = styled.div`
  color: #0077b6;
  font-size: 1.1rem;
  margin-bottom: 1rem;
`;

const ProblemLabel = styled.div`
  display: inline-block;
  background-color: #ff9800;
  color: white;
  font-size: 0.9rem;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  margin-bottom: 1.5rem;
`;

const Description = styled.p`
  color: #023e8a;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const RescueButton = styled.button`
  background-color: ${props => props.$rescued ? '#4caf50' : '#ff9800'};
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: bold;
  cursor: ${props => props.$rescued ? 'default' : 'pointer'};
  margin-top: auto;
  
  &:hover {
    background-color: ${props => props.$rescued ? '#4caf50' : '#e67e00'};
  }
`;

const SectionTitle = styled.h2`
  color: #03045e;
  margin: 2rem 0 1rem;
  font-size: 1.5rem;
`;

const FactsList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0 0 2rem;
`;

const FactItem = styled.li`
  color: #023e8a;
  padding: 0.7rem 0;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: baseline;
  
  &:before {
    content: "•";
    color: #0077b6;
    font-weight: bold;
    margin-right: 0.7rem;
  }
`;

const ContentSection = styled.section`
  background-color: #f0f9ff;
  padding: 2rem;
  border-radius: 12px;
  margin: 2rem 0;
`;

const ContentCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const ContentTitle = styled.h3`
  color: #03045e;
  margin-bottom: 1rem;
`;

const ContentText = styled.p`
  color: #023e8a;
  line-height: 1.6;
`;

const AnimalDetailPage = () => {
  const { animalId } = useParams();
  const navigate = useNavigate();
  const { getAnimalById, rescueAnimal } = useAnimalContext();
  const { getContentForAnimal } = useContentContext();
  const { user, visitAnimal } = useUserContext();
  
  const animal = getAnimalById(animalId);
  const animalContent = animal ? getContentForAnimal(animalId, user.age || 8) : [];
  
  useEffect(() => {
    if (animal) {
      visitAnimal(animal.id);
    }
  }, [animal, visitAnimal]);
  
  if (!animal) {
    return (
      <PageContainer>
        <BackButton onClick={() => navigate('/animals')}>
          &larr; Back to Animals
        </BackButton>
        <h2>Animal not found</h2>
      </PageContainer>
    );
  }
  
  const { name, species, problem, description, facts, image, rescued } = animal;
  const firstName = name.split(' ')[0];
  
  const handleRescueClick = () => {
    if (!rescued) {
      rescueAnimal(animalId);
      navigate(`/animals/${animalId}/rescue`);
    }
  };
  
  return (
    <PageContainer>
      <BackButton onClick={() => navigate('/animals')}>
        &larr; Back to Animals
      </BackButton>
      
      <HeroSection>
        <ImageContainer>
          {image && <img src={`/images/${image}`} alt={name} />}
        </ImageContainer>
        
        <AnimalInfo>
          <AnimalName>{name}</AnimalName>
          <Species>{species}</Species>
          <ProblemLabel>Problem: {problem}</ProblemLabel>
          <Description>{description}</Description>
          
          <RescueButton 
            $rescued={rescued}
            onClick={handleRescueClick}
            disabled={rescued}
          >
            {rescued ? `${firstName} has been rescued!` : `Rescue ${firstName}`}
          </RescueButton>
        </AnimalInfo>
      </HeroSection>
      
      <SectionTitle>Facts About Plastic Impact</SectionTitle>
      <FactsList>
        {facts && facts.map((fact, index) => (
          <FactItem key={index}>{fact}</FactItem>
        ))}
      </FactsList>
      
      <ContentSection>
        <SectionTitle>Learn More</SectionTitle>
        {animalContent && animalContent.map(content => (
          <ContentCard key={content.id}>
            <ContentTitle>{content.title}</ContentTitle>
            <ContentText>{content.content}</ContentText>
          </ContentCard>
        ))}
      </ContentSection>
    </PageContainer>
  );
};

export default AnimalDetailPage; 