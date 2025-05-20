import React, { useState } from 'react';
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

const ActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ActionCard = styled.div`
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  
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
  margin-bottom: 1rem;
`;

const ImpactText = styled.p`
  color: #0077b6;
  font-size: 0.9rem;
  font-style: italic;
  margin-bottom: 1.5rem;
`;

const DifficultyBadge = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: inline-block;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
  background-color: ${props => {
    switch (props.difficulty) {
      case 'easy':
        return '#4caf50';
      case 'medium':
        return '#ff9800';
      case 'hard':
        return '#f44336';
      default:
        return '#90e0ef';
    }
  }};
  color: white;
`;

const ActionButton = styled.button`
  background-color: ${props => props.completed ? '#4caf50' : '#0077b6'};
  color: white;
  border: none;
  padding: 0.8rem 0;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: auto;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${props => props.completed ? '#388e3c' : '#023e8a'};
  }
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

const ProgressBar = styled.div`
  background-color: white;
  border-radius: 20px;
  height: 20px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background-color: #4caf50;
  width: ${props => props.percentage}%;
  transition: width 0.3s ease;
`;

const ProgressStats = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 1rem;
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #0077b6;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: #023e8a;
`;

const ActionsPage = () => {
  const { user, addCompletedAction } = useUserContext();
  const { getActionsByAge } = useContentContext();
  
  // Local state to track newly completed actions during this session
  const [completedInSession, setCompletedInSession] = useState([]);
  
  // Get age-appropriate actions
  const actions = getActionsByAge(user.age || 8);
  
  // Check if an action is completed
  const isActionCompleted = (actionId) => {
    return user.completedActions.includes(actionId) || completedInSession.includes(actionId);
  };
  
  // Calculate progress
  const totalActions = actions.length;
  const completedCount = user.completedActions.length + completedInSession.filter(id => 
    !user.completedActions.includes(id)).length;
  const progressPercentage = totalActions > 0 ? (completedCount / totalActions) * 100 : 0;
  
  // Handle action completion
  const handleActionComplete = (actionId) => {
    if (!isActionCompleted(actionId)) {
      setCompletedInSession(prev => [...prev, actionId]);
      addCompletedAction(actionId);
    }
  };
  
  return (
    <PageContainer>
      <PageHeader>
        <Title>Take Action</Title>
        <Subtitle>
          Find out how you can help reduce plastic pollution and protect marine life.
          Every small action you take makes a difference!
        </Subtitle>
      </PageHeader>
      
      <ProgressSection>
        <ProgressTitle>Your Action Progress</ProgressTitle>
        <ProgressBar>
          <ProgressFill percentage={progressPercentage} />
        </ProgressBar>
        <ProgressStats>
          <StatItem>
            <StatValue>{completedCount}</StatValue>
            <StatLabel>Actions Completed</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>{totalActions - completedCount}</StatValue>
            <StatLabel>Actions to Go</StatLabel>
          </StatItem>
        </ProgressStats>
      </ProgressSection>
      
      <ActionsGrid>
        {actions.map(action => {
          const completed = isActionCompleted(action.id);
          
          return (
            <ActionCard key={action.id}>
              <CardImage image={action.imageUrl ? `/images/${action.imageUrl}` : null} />
              <DifficultyBadge difficulty={action.difficulty}>
                {action.difficulty.charAt(0).toUpperCase() + action.difficulty.slice(1)}
              </DifficultyBadge>
              
              <CardContent>
                <CardTitle>{action.title}</CardTitle>
                <CardText>{action.content}</CardText>
                <ImpactText>{action.impact}</ImpactText>
                
                <ActionButton 
                  completed={completed}
                  onClick={() => handleActionComplete(action.id)}
                  disabled={completed}
                >
                  {completed ? 'Completed!' : 'Mark as Completed'}
                </ActionButton>
              </CardContent>
            </ActionCard>
          );
        })}
      </ActionsGrid>
    </PageContainer>
  );
};

export default ActionsPage; 