import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAnimalContext } from '../context/AnimalContext';
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

const MissionHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: #03045e;
  margin-bottom: 1rem;
`;

const Instructions = styled.p`
  color: #023e8a;
  font-size: 1.1rem;
  max-width: 800px;
  margin: 0 auto 1.5rem;
`;

const GameContainer = styled.div`
  background-color: #caf0f8;
  border-radius: 12px;
  padding: 2rem;
  position: relative;
  min-height: 400px;
  margin-bottom: 2rem;
  overflow: hidden;
`;

const GameScene = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  min-height: 400px;
`;

const AnimalImage = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.3);
  background-image: ${props => props.image ? `url(${props.image})` : 'none'};
  background-size: cover;
  background-position: center;
  z-index: 1;
`;

const PlasticItem = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: #fff;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  opacity: ${props => props.collected ? 0 : 1};
  transition: opacity 0.3s, transform 0.3s;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const ProgressBar = styled.div`
  background-color: white;
  border-radius: 20px;
  height: 20px;
  width: 100%;
  margin: 2rem 0;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background-color: #0077b6;
  width: ${props => props.percentage}%;
  transition: width 0.3s ease;
`;

const ProgressIndicator = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
`;

const ProgressText = styled.div`
  color: #023e8a;
  font-weight: bold;
`;

const CompletionMessage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 119, 182, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  border-radius: 12px;
  z-index: 10;
`;

const MessageTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const MessageText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  max-width: 80%;
  text-align: center;
  line-height: 1.5;
`;

const ContinueButton = styled.button`
  background-color: #ff9800;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #e67e00;
  }
`;

// Plastic items - types of ocean plastic waste with emoji representations
const plasticTypes = [
  { emoji: '🥤', name: 'Plastic Cup' },
  { emoji: '🍾', name: 'Plastic Bottle' },
  { emoji: '💼', name: 'Plastic Bag' },
  { emoji: '🥡', name: 'Food Container' },
  { emoji: '🧴', name: 'Plastic Tube' },
  { emoji: '🧃', name: 'Juice Box' },
  { emoji: '🪮', name: 'Fork' },
  { emoji: '🧪', name: 'Test Tube' }
];

const RescueMissionPage = () => {
  const { animalId } = useParams();
  const navigate = useNavigate();
  const { getAnimalById } = useAnimalContext();
  const { increaseProgress } = useUserContext();
  
  const [plasticItems, setPlasticItems] = useState([]);
  const [collected, setCollected] = useState(0);
  const [completed, setCompleted] = useState(false);
  
  const animal = getAnimalById(animalId);
  
  // Generate random positions for plastic items
  useEffect(() => {
    if (animal) {
      const items = Array(8).fill().map((_, index) => {
        const randomPlastic = plasticTypes[index % plasticTypes.length];
        return {
          id: `plastic-${index}`,
          type: randomPlastic,
          top: Math.random() * 80 + 10, // 10-90%
          left: Math.random() * 80 + 10, // 10-90%
          collected: false
        };
      });
      setPlasticItems(items);
    }
  }, [animal]);
  
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
  
  const { name, image } = animal;
  const firstName = name.split(' ')[0];
  const totalItems = plasticItems.length;
  const progressPercentage = (collected / totalItems) * 100;
  
  const handlePlasticClick = (itemId) => {
    if (completed) return;
    
    const updatedItems = plasticItems.map(item => 
      item.id === itemId ? { ...item, collected: true } : item
    );
    
    const newCollected = collected + 1;
    setPlasticItems(updatedItems);
    setCollected(newCollected);
    
    // Check if all items collected
    if (newCollected >= totalItems) {
      setCompleted(true);
      increaseProgress(10); // Add to user's progress
    }
  };
  
  const handleContinue = () => {
    navigate('/animals');
  };
  
  return (
    <PageContainer>
      <BackButton onClick={() => navigate('/animals')}>
        &larr; Back to Animals
      </BackButton>
      
      <MissionHeader>
        <Title>Rescue Mission: Help {firstName}</Title>
        <Instructions>
          Help {firstName} by collecting all the plastic waste in the ocean. Click on each piece of plastic to remove it!
        </Instructions>
      </MissionHeader>
      
      <GameContainer>
        <GameScene>
          <AnimalImage image={`/images/${image}`} />
          
          {plasticItems.map(item => (
            <PlasticItem
              key={item.id}
              data-testid="plastic-item"
              collected={item.collected}
              style={{ 
                top: `${item.top}%`, 
                left: `${item.left}%` 
              }}
              onClick={() => handlePlasticClick(item.id)}
            >
              {item.type.emoji}
            </PlasticItem>
          ))}
          
          {completed && (
            <CompletionMessage>
              <MessageTitle>Great Job!</MessageTitle>
              <MessageText>
                You've removed all the plastic from {firstName}'s environment! Thanks to your 
                help, {firstName} is now safe from plastic pollution and can swim freely.
              </MessageText>
              <ContinueButton onClick={handleContinue}>
                Continue
              </ContinueButton>
            </CompletionMessage>
          )}
        </GameScene>
      </GameContainer>
      
      <div data-testid="progress-indicator">
        <ProgressBar>
          <ProgressFill percentage={progressPercentage} />
        </ProgressBar>
        <ProgressIndicator>
          <ProgressText data-testid="progress-text">{collected}</ProgressText>
          <ProgressText>of {totalItems} plastic items removed</ProgressText>
        </ProgressIndicator>
      </div>
    </PageContainer>
  );
};

export default RescueMissionPage; 