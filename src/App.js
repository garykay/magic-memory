
import { useState, useEffect } from 'react'
import './App.css'

import SingleCard  from './components/SingleCard'

const cardImages = [
  {
    "src": "/img/helmet-1.png",
    matched : false,
  },
  {
    "src": "/img/potion-1.png",
    matched : false,
  },
  {
    "src": "/img/ring-1.png",
    matched : false,
  },
  {
    "src": "/img/scroll-1.png",
    matched : false,
  },
  {
    "src": "/img/shield-1.png",
    matched : false,
  },
  {
    "src": "/img/sword-1.png",
    matched : false,
  }
]

function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setchoiceOne] = useState(null)
  const [choiceTwo, setchoiceTwo] = useState(null)

  //shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, id: Math.random() }))

    setCards(shuffledCards)
    setTurns(0)
  }

  // handle click on card

  const handleChoice = (card) => {
    choiceOne ? setchoiceTwo(card) : setchoiceOne(card)
  }

  // comapre 2 selected cards with useEffect
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true }
            } else {
            return card
            }
            
          })
        })
        resetTurn()
    } else {
      setTimeout(() => resetTurn(), 1000)
      
    }
  }

  }, [choiceOne, choiceTwo])

  console.log(cards)

  const resetTurn = () => {
    setchoiceOne(null)
    setchoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
  }

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
      {cards.map(card => (
          <SingleCard 
          card={card}  
          key={card.id} 
          handleChoice={handleChoice}
          flipped={card === choiceOne || card === choiceTwo || card.matched}
          />
          ))}
      </div>
    </div>
  );
}

export default App