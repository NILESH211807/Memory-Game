import React, { useEffect, useState } from 'react'
import GameSettings from './GameSettings';

const MemoryGame = () => {

    const [cardSize, setCardSize] = useState(4);
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);

    const [disabled, setDisabled] = useState(false);
    const [score, setScore] = useState(0);
    const [won, setWon] = useState(false);
    const [gameSettings, setGameSettings] = useState(false);
    const [maxMoves, setMaxMoves] = useState(0);

    const [movesActive, setMovesActive] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);

    const initializeCard = () => {
        // if cardSize is 4 then totalCard 16
        const totalCard = cardSize * cardSize;
        //pairCard is half of total card 8
        const pairCard = Math.floor(totalCard / 2);

        const numbers = [...Array(pairCard).keys()].map(n => n + 1);
        const shuffledNumbers = [...numbers, ...numbers]
            .sort(() => Math.random() - 0.5)
            .slice(0, totalCard)
            .map((number, index) => ({ id: index, number }));
        setCards(shuffledNumbers);
    };

    useEffect(() => {
        initializeCard();
    }, [cardSize]);

    const checkMatch = (id) => {
        const [firstid] = flippedCards;
        if (cards[firstid].number === cards[id].number) {
            setMatchedCards([...matchedCards, firstid, id]);
            setFlippedCards([]);
            setDisabled(false);
            setScore(score + 5);
        } else {
            if (movesActive) setMaxMoves(prev => prev - 1);
            setTimeout(() => {
                setFlippedCards([]);
                setDisabled(false);
            }, 300);
        }
    }

    const handleFlipCard = (id) => {
        if (disabled || won) return;

        if (flippedCards.length === 0) {
            setFlippedCards([id]);
            return;
        }

        if (flippedCards.length === 1) {
            setDisabled(true);
            if (id !== flippedCards[0]) {
                setFlippedCards([...flippedCards, id]);
                // check match 
                checkMatch(id);

            } else {
                setDisabled(false);
                setFlippedCards([]);
            }
        }
    }

    useEffect(() => {
        if (matchedCards.length === cards.length && matchedCards.length > 0) {
            setWon(true);
            setDisabled(true);
        }
    }, [matchedCards, cards]);

    const resetGame = () => {
        setFlippedCards([]);
        setMatchedCards([]);
        setWon(false);
        setDisabled(false);
        setScore(0);
        setIsGameOver(false);
        initializeCard();
    }

    useEffect(() => {
        if (movesActive && maxMoves <= 0) {
            setIsGameOver(true);
            setMovesActive(false);
        }
    }, [maxMoves]);

    const isFlipped = (id) => flippedCards.includes(id) || matchedCards.includes(id);
    const isSolved = (id) => matchedCards.includes(id);

    return (
        <>
            <div className='game__container w-full flex items-center flex-col min-h-screen relative'>
                <div className="game_card_container w-full min-h-screen p-5 flex items-center flex-col mb-20">
                    <h1 className='game__heading text-2xl font-bold text-center uppercase tracking-wider mt-10 mb-8'>Memory Game</h1>
                    <div className='w-full flex items-center justify-center gap-[100px]'>
                        <h3 className='mb-5 font-semibold tracking-wider uppercase text-[15px] text-white px-5 py-1 rounded-md bg-[#2563eb]'>Score : {score}</h3>
                        {movesActive && <h3 className='mb-5 font-semibold tracking-wider uppercase text-[15px] text-white px-5 py-1 rounded-md bg-[#2563eb]'>Moves : {maxMoves}</h3>}
                    </div>
                    <div className="game__cards grid gap-3 relative select-none" style={{
                        gridTemplateColumns: `repeat(${cardSize},minmax(0,1fr))`,
                        width: `min(100%, ${cardSize * 5.5}rem)`,
                    }}>
                        {cards.map(card => (
                            <div onClick={() => handleFlipCard(card.id)} className={`aspect-square flex items-center justify-center text-center text-xl font-bold rounded-md cursor-pointer transition-all duration-300 
                    ${isFlipped(card.id) ? isSolved(card.id) ? 'bg-green-500' : 'bg-blue-600' : 'bg-[#1f1f1f]'}
                    `} key={card.id}>
                                {isFlipped(card.id) ? card.number : "?"}
                            </div>
                        ))}
                    </div>
                    {won && <h1 className='font-bold text-center mt-8 text-xl animate-bounce text-green-500'>You Won</h1>}
                    {isGameOver && <h1 className='font-bold text-center mt-8 text-xl animate-bounce text-red-500'>Game Over</h1>}
                    {won || isGameOver && <button type='button' onClick={resetGame} className='px-10 py-2 bg-blue-500 rounded-xl font-semibold uppercase tracking-wider my-5 text-[13px] hover:bg-blue-600 active:scale-95'>Reset</button>}
                </div>

                <button onClick={() => setGameSettings(true)} className="setting-btn fixed right-10 bottom-10 active:scale-95">
                    <span className="bar bar1"></span>
                    <span className="bar bar2"></span>
                    <span className="bar bar1"></span>
                </button>

                {gameSettings && <GameSettings
                    setGameSettings={setGameSettings}
                    cardSize={cardSize}
                    setCardSize={setCardSize}
                    setMaxMoves={setMaxMoves}
                    maxMoves={maxMoves}
                    setMovesActive={setMovesActive} />}
            </div>
        </>
    )
}

export default MemoryGame