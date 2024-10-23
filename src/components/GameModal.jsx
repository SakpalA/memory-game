import React, { useEffect } from 'react';
import Modal from 'react-modal';
import filledstar from '../assets/images/stars-filled.jpg';
import emptystar from '../assets/images/stars-empty.jpg';
import restart from '../assets/images/refresh.jpg';
import ScoreCard from './ScoreCard';

const GameModal = ({ isModalOpen, gameWon, moves, score, setIsModalOpen, resetGame }) => {
    useEffect(() => {
        // Setting the app element for accessibility
        Modal.setAppElement('#root');  // Adjust this to the root element of your application
    }, []);
    return (
        <div className='modal-div'>
            {isModalOpen && (
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={() => { }}
                    ariaLabel='Game Over Modal'
                    className='modal'
                    shouldCloseOnOverlayClick={false}
                    shouldCloseOnEsc={false}>

                    <h2>{gameWon ? 'Congratulations, You Won!' : 'Game Over!'}</h2>
                    <h3>{gameWon ? 'You matched all cards before time ran out!' : 'Better luck, try again!'}</h3>
                    <img src={gameWon ? filledstar : emptystar} alt={gameWon ? 'filled-star' : 'filled-star'} className='star' />
                    <ScoreCard moves={moves} score={score} />

                    <img src={restart} alt="Refresh Image"
                        onClick={() => {
                            setIsModalOpen(false)
                            resetGame()
                        }} className='reset' />
                </Modal>
            )}
        </div>
    )
}

export default GameModal;