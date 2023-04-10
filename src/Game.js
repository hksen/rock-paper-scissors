import React, { useState, useEffect } from 'react'; 
function Game({ chosenType, resetGame, housePicks, Rock, Paper, Scissors, result, showHousePick, showResult }){

    const [showAnimation, setShowAnimation] = useState(false);
    useEffect(() => {
        if (showResult === 'win' || showResult === 'lose') {
          setTimeout(() => {
            setShowAnimation(true);
          }, 300);
        }
      }, [showResult]);


    const PickedType = () => {
        if(chosenType === 'paper'){
            return <Paper />;
        }else if(chosenType === 'rock')
        {
            return <Rock/>;
        }else if(chosenType === 'scissors')
        {
            return <Scissors/>;
        }
    }

    const HousePicked = () => {
        
        if(housePicks === 'rock'){
            return <Rock/>
        }else if(housePicks === 'paper'){
            return <Paper/>
        }else if(housePicks === 'scissors'){
            return <Scissors/>
        }
    }

    const ResultText = () => {
        if(result === 'tie'){
            return <h1>It's a tie</h1>
        }else if(result === 'win'){
            return <h1>You win</h1>
        }else if(result === 'lose'){
            return <h1>You lose</h1>
        }
    }

    const leftGlow = () => {

        return (
            <div className="glow-wrapper">
            <div className={`first-glow glow ${showAnimation ? "animateflglow" : ""}`}></div>
            <div className={`nd-glow glow ${showAnimation ? "animateslglow" : ""}`}></div>
            <div className={`third-glow glow ${showAnimation ? "animatetlglow" : ""}`}></div>
        </div>
        )
    }

    const rightGlow = () => {
        return (
            <div className="glow-wrapper">
            <div className={`first-glow glow-r ${showAnimation ? "animatefrglow" : ""}`}></div>
            <div className={`nd-glow glow-r ${showAnimation ? "animatesrglow" : ""}`}></div>
            <div className={`third-glow glow-r ${showAnimation ? "animatetrglow" : ""}`}></div>
        </div>
        )
    }

    return(
        <div className="default-game">
            <div className="default-game-wrapper">
                <div className="you-picked">
                    <h2>You Picked</h2>
                    <div className="coin-picked">
                    {showResult === 'win' ? (
                        <>
                            {leftGlow()}
                        </>
                    ) : null}
                        {PickedType()}
                    </div>
                </div>
                {showResult !== '' ? (
                        <div className="result">
                            {ResultText()}
                            <button className="play-again" onClick={resetGame}>Play again</button>
                        </div>
                    ) : null}

                <div className="house-picked">
                    <h2>The house Picked</h2>
                    {showResult === 'lose' ? (
                        <>
                            {rightGlow()}
                        </>
                    ) : null}
                    {showHousePick ? (
                        <div className="house-picked-full">
                            <HousePicked />
                        </div>
                    ) : (
                        <div className="house-picked-empty">
                            <div className="empty-pick-round"></div>
                        </div>
                    )}
                </div>

            </div>
        </div>

    )
}

export default Game;