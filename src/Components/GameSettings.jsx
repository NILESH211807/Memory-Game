import React, { useRef, useState } from 'react'

const GameSettings = ({
    setGameSettings,
    cardSize,
    setCardSize,
    setMaxMoves,
    maxMoves,
    setMovesActive,
    initializeCard
}) => {

    const [newGridSize, setNewGridSize] = useState(cardSize);
    const [newMaxMoves, setNewMaxMoves] = useState(maxMoves);

    const saveSettings = () => {
        if (newGridSize <= 10) {
            setCardSize(newGridSize);
            setMaxMoves(newMaxMoves);
            if (newMaxMoves > 0) {
                setMovesActive(true);
            } else {
                setMovesActive(false);
            }
        }
        initializeCard();
        setGameSettings(false);
    }

    return (
        <>
            <div className='w-full h-screen fixed top-0 left-0 bg-black/70' onClick={() => setGameSettings(false)}></div>
            <div className="w-[400px] rounded-xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#333333]">
                <h1 className='text-center my-5 font-semibold tracking-wider uppercase'>Game Settings</h1>
                <div className="w-full flex items-center justify-center flex-col px-5 my-5">
                    <div className="w-full flex gap-10">
                        <div className="w-full flex-col">
                            <span className='text-sm font-semibold tracking-wide'>Grid Size</span>
                            <p className='text-[12px] font-semibold tracking-wider text-[#b1b1b1]'>Maximum grid size 10</p>
                            <input
                                type="number"
                                value={newGridSize}
                                onChange={(e) => setNewGridSize(e.target.value)}
                                className='w-full px-5 py-3 bg-[#272727] border-[1.5px] border-[#3d3d3d] text-center rounded-md outline-none focus:border-white my-2' />
                        </div>
                        <div className="w-full flex-col">
                            <span className='text-sm font-semibold tracking-wide'>Max Moves</span>
                            <p className='text-[12px] font-semibold tracking-wider text-[#b1b1b1]'>0 moves for unlimited</p>
                            <input
                                type="number"
                                value={newMaxMoves}
                                onChange={(e) => setNewMaxMoves(e.target.value)}
                                className='w-full px-5 py-3 bg-[#272727] border-[1.5px] border-[#3d3d3d] text-center rounded-md outline-none focus:border-white my-2' />
                        </div>
                    </div>
                    <button onClick={saveSettings} className='px-16 py-3 bg-green-500 text-sm font-medium rounded-md my-5 hover:bg-green-600 active:scale-95'>Save</button>
                </div>
            </div>
        </>
    )
}

export default GameSettings