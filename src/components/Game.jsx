import React, { useEffect, useRef, useState } from 'react';
import '../App.css';
import Modal from 'react-modal';
import candies from '../assets/images/candies.jpg';
import jar from '../assets/images/jar.jpg';
import cherry from '../assets/images/cherry.jpg';
import cupcake from '../assets/images/cupcake.jpg';
import christmasDessert from '../assets/images/christmas-dessert.jpg';
import sandwich from '../assets/images/sandwich.jpg';
import frontCard from '../assets/images/card-front.jpg';
import restart from '../assets/images/refresh.jpg';
import medal from '../assets/images/medal.jpg';
import flip from '../assets/images/flip.jpg';
import stopwatch from '../assets/images/stopwatch.jpg';
import filledstar from '../assets/images/stars-filled.jpg';
import emptystar from '../assets/images/stars-empty.jpg';

const cardCharacters = [
    { id: 1, name: 'candies', img: candies },
    { id: 2, name: 'jar', img: jar },
    { id: 3, name: 'cherry', img: cherry },
    { id: 4, name: 'cupcake', img: cupcake },
    { id: 5, name: 'christmas-dessert', img: christmasDessert },
    { id: 6, name: 'sandwich', img: sandwich }
]

// shuffle cards and duplicate for pairs
const shuffleCards = (cards) => {
    return [...cards, ...cards].sort(() => Math.random() - 0.5).map((card) => ({
        ...card,
        id: Math.random(),
    }));
};
const Game = () => {
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [moves, setMoves] = useState(0);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);

    const timerRef = useRef(null);

    // initialize the game
    useEffect(() => {
        resetGame();
    }, []);

    // Start timer when the frst card is clicked
    useEffect(() => {
        if (moves === 1 && timerRef.current === null) {
            startTimer();
        }
    }, [moves])

    // Handle timer countdown
    useEffect(() => {
        if (timeLeft === 0) {
            setGameOver(true);
            setIsModalOpen(true);
            clearInterval(timerRef.current);
        }
    }, [timeLeft]);

    // Handle card click
    const handleCardClick = (card) => {
        if (flippedCards.length < 2 && !flippedCards.includes(card) && !matchedCards.includes(card.name)) {
            setFlippedCards([...flippedCards, card]);
        }
    };

    // Check for matching cards
    useEffect(() => {
        if (flippedCards.length === 2) {
            if (flippedCards[0].name === flippedCards[1].name) {
                setMatchedCards([...matchedCards, flippedCards[0].name]);
                setScore((prevScore) => prevScore + 10);
            } else {
                setScore((prevScore) => prevScore - 5);
            }
            setTimeout(() => setFlippedCards([]), 1000);
            setMoves((prevMoves) => prevMoves + 1);
        }
    }, [flippedCards]);

    // Check for win condition: all cards matched before timer ends
    useEffect(() => {
        if (matchedCards.length === cardCharacters.length) {
            clearInterval(timerRef.current);
            setIsModalOpen(true);
            setGameWon(true);
        }
    }, [matchedCards])

    // Start Timer
    const startTimer = () => {
        timerRef.current = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);
    };

    const resetGame = () => {
        clearInterval(timerRef.current);
        setCards(shuffleCards(cardCharacters));
        setFlippedCards([]);
        setMatchedCards([]);
        setMoves(0);
        setScore(0);
        setTimeLeft(60);
        setGameOver(false);
        setGameWon(false);
        setIsModalOpen(false);
        timerRef.current = null;
    }

    return (
        <div className='container'>
            <div className='inner-container'>
                <h1>Memory Card Game</h1>
                <div className='top-header'>
                    <div className='info-card'>
                        <div className='info-icon'>
                            <img src={medal} alt="Medal" className='score' />
                        </div>
                        <div className='info-card-title'>
                            <span>Score: {score}</span>
                        </div>
                    </div>
                    <div className='info-card'>
                        <div className='info-icon'>
                            <img src={flip} alt="Flip" className='score' />
                        </div>
                        <div className='info-card-title'>
                            <span>Flips: {moves}</span>
                        </div>
                    </div>
                    <div className='info-card'>
                        <div className='info-icon'>
                            <img src={stopwatch} alt="Stopwatch" className='score' />
                        </div>
                        <div className='info-card-title'>
                            <span>Timer: {timeLeft} sec</span>
                        </div>
                    </div>
                </div>
                <div className='card-grid'>
                    {cards.map(card => (
                        <div
                            key={card.id}
                            className={`card ${flippedCards.includes(card) || matchedCards.includes(card.name) ? 'flipped' : ''}`}
                            onClick={() => handleCardClick(card)}>
                            <div className="card-front">
                                <img src={card.img} alt={card.name} />
                            </div>
                            <div className="card-back">
                                <img src={frontCard} alt="" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modal for game over or game won*/}
                {isModalOpen && (
                    <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} className='modal'>
                        <h2>{gameWon ? 'Congratulations, You Won!' : 'Game Over!'}</h2>
                        <h3>{gameWon ? 'You matched all cards before time ran out!' : 'Better luck, try again!'}</h3>
                        <div>{gameWon ? <img src={filledstar} alt='filled-star' className='star'/> : <img src={emptystar} alt='empty-star' className='star'/> }</div>
                        <div className='modal-score'>
                            <div className='info-card'>
                                <div className='info-icon'>
                                    <img src={medal} alt="Medal" className='score' />
                                </div>
                                <div className='info-card-title'>
                                    <span>Score: {score}</span>
                                </div>
                            </div>
                            <div className='info-card'>
                                <div className='info-icon'>
                                    <img src={flip} alt="Flip" className='score' />
                                </div>
                                <div className='info-card-title'>
                                    <span>Flips: {moves}</span>
                                </div>
                            </div>
                        </div>
                        <img src={restart} alt="Refresh Image" onClick={resetGame} className='reset' />

                    </Modal>
                )}
            </div>
        </div>
    )
}

export default Game