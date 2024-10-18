import React, { useState } from 'react';

const cardCharacters = [
    {id: 1, name: 'candies', img: 'candies.png'},
    {id: 2, name: 'jar', img: 'jar.png'},
    {id: 3, name: 'cherry', img: 'cheery.png'},
    {id: 4, name: 'cupcake', img: 'cupcake.png'},
    {id: 5, name: 'christmas-dessert', img: 'christmas-dessert.png'},
    {id: 6, name: 'sandwich', img: 'sandwich.png'}
]

// shuffle cards and duplicate for pairs
const shuffleCards = (cards) => {
    return[...cards, ...cards].sort(()=> Math.random() - 0.5).map((card)=>({
        ...card,
        id: Math.random(),
    }));
};
const Game = () => {
    const [cards, setCards] = useState([]);
    
    
  return (
    <div>
       {cards.map(card => (
        <div key={card.id}>
            <img src={require(`../assets/images/${cards.img}`)} alt={card.name} />
        </div>
       ))} 
    </div>
  )
}

export default Game