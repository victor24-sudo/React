import React, { useState, useEffect } from 'react';
import Card from './components/Card';
import './App.css';
import CountDown from './components/CountDown';
import { saveAs } from 'file-saver';

import { images } from './import';

function App() {

  

  const [cards, setCards] = useState([]);
  const [firstCard, setFirstCard] = useState({});
  const [secondCard, setSecondCard] = useState({});

  const [unflippedCards, setUnflippedCards] = useState([]);
  const [disabledCards, setDisabledCards] = useState([]);
  const [contador, setContador] = useState(1);

  

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  useEffect(() => {
    shuffleArray(images);
    setCards(images);
  }, [])

  useEffect(() => {
    checkForMatch();
  }, [secondCard]);

  const flipCard = (dump, number) => {
    if (firstCard.dump === dump && firstCard.number === number) {
      return 0;
    }
    if (!firstCard.dump) {
      setFirstCard({ dump, number });
    }
    else if (!secondCard.dump) {
      setSecondCard({ dump, number });
    }
    return 1;
  }

  const checkForMatch = () => {
    
    if (firstCard.dump && secondCard.dump) {
      const match = firstCard.dump === secondCard.dump;
      if(match == true ){
        disableCards();
        setContador(contador + 1)
        if(contador == 6){
          const blob = new Blob([contador] , {type: 'text/plain;charset=utf-8'} );
          saveAs(blob, 'Puntuacion.xml');   
        }
      }else{
        unflipCards();
      }
      
    }
    
    
  }

  

  const disableCards = () => {
    setDisabledCards([firstCard.number, secondCard.number]);
    resetCards();
  };

  const unflipCards = () => {
    setUnflippedCards([firstCard.number, secondCard.number]);
    resetCards();
  };

  const resetCards = () => {
    setFirstCard({});
    setSecondCard({});
  }

  return (

    <div className='app'> 
      
      <div className='cards-container' >

      <div>
        <CountDown seconds={60}> </CountDown>
      </div>
        {
          cards.map((card, index) => (
            <Card
              dump={card.dump}
              number={index}
              frontFace={card.src}
              flipCard={flipCard}
              unflippedCards={unflippedCards}
              disabledCards={disabledCards}
            />
          ))
        }
      </div>
    </div>
  );
}

export default App;
