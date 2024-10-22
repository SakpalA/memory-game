import React from 'react';
import Modal from 'react-modal';
import filledstar from '../assets/images/stars-filled.jpg';
import emptystar from '../assets/images/stars-empty.jpg';
import restart from '../assets/images/refresh.jpg';
import ScoreCard from './ScoreCard';

const GameModal = ({isModalOpen, gameWon, moves, score, setIsModalOpen, resetGame}) => {
    return (
        <div className='modal-div'>
            {isModalOpen && (
                <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} className='modal'>
                    <h2>{gameWon ? 'Congratulations, You Won!' : 'Game Over!'}</h2>
                    <h3>{gameWon ? 'You matched all cards before time ran out!' : 'Better luck, try again!'}</h3>
                    <div>{gameWon ? <img src={filledstar} alt='filled-star' className='star' /> : <img src={emptystar} alt='empty-star' className='star' />}</div>
                    <ScoreCard moves={moves} score={score} />
                    <img src={restart} alt="Refresh Image" onClick={resetGame} className='reset' />
                </Modal>
            )}
        </div>
    )
}

export default GameModal