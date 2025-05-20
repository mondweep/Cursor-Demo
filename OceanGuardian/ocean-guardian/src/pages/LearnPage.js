import React from 'react';
import styled from 'styled-components';
import { useContentContext } from '../context/ContentContext';
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

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContentCard = styled.div`
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

const CardImage = styled.div`
  height: 200px;
  background-color: #90e0ef;
  background-image: ${props => props.image ? `url(${props.image})` : 'none'};
  background-size: cover;
  background-position: center;
`;

const CardContent = styled.div`
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled.h3`
  color: #03045e;
  margin-bottom: 1rem;
`;

const CardText = styled.p`
  color: #023e8a;
  font-size: 1rem;
  line-height: 1.5;
`;

const ComplexityBadge = styled.span`
  display: inline-block;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
  margin-top: auto;
  margin-top: 1rem;
  background-color: ${props => {
    switch (props.complexity) {
      case 'beginner':
        return '#4caf50';
      case 'explorer':
        return '#2196f3';
      case 'expert':
        return '#9c27b0';
      default:
        return '#90e0ef';
    }
  }};
  color: white;
`;

const LearnPage = () => {
  const { user } = useUserContext();
  const { getContentByAge } = useContentContext();
  
  // Get age-appropriate content
  const content = getContentByAge(user.age || 8);
  
  return (
    <PageContainer>
      <PageHeader>
        <Title>Learn About Plastic Pollution</Title>
        <Subtitle>
          Discover how plastic affects our oceans and the animals that live there.
          Learn what you can do to help protect marine ecosystems.
        </Subtitle>
      </PageHeader>
      
      <ContentGrid>
        {content.map(item => (
          <ContentCard key={item.id}>
            <CardImage image={item.imageUrl ? `/images/${item.imageUrl}` : null} />
            <CardContent>
              <CardTitle>{item.title}</CardTitle>
              <CardText>{item.content}</CardText>
              <ComplexityBadge complexity={item.complexity}>
                {item.complexity.charAt(0).toUpperCase() + item.complexity.slice(1)}
              </ComplexityBadge>
            </CardContent>
          </ContentCard>
        ))}
      </ContentGrid>
    </PageContainer>
  );
};

export default LearnPage; 