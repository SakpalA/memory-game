import React from 'react';
import medal from '../assets/images/medal.jpg';
import flip from '../assets/images/flip.jpg';

const ScoreCard = ({ score, moves }) => {
    return (
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
    )
}

export default ScoreCard;