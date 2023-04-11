import React, { useState, useEffect } from 'react';
import Choice from './Choice';
import Game from './Game';
import Images from './Images';

function Main(){
    const [gameStep, setGameStep] = useState(0);
    const [chosenType, setChosenType] = useState("");
    const [score, setScore] = useState(() => {
        const storedScore = parseInt(localStorage.getItem('score'));
        return storedScore !== null && !isNaN(storedScore)  ? storedScore : 0;
    });
    const [result, setResult] = useState("");
    const [housePicks, setHousePick] = useState("");

    const [clickedImage, setClickedImage] = useState(false);

    const [showHousePick, setShowHousePick] = useState("");
    const [showResult, setShowResult] = useState("");

    const [showRules, setShowRules] = useState(false);

    const CHOICES = ['rock', 'paper', 'scissors'];
    const housePick = CHOICES[Math.floor(Math.random() * 3)];

    const clickChoose = (type) => {
        setChosenType(type); 
        setHousePick(housePicks => housePick);
        
        if(type === housePick){
            // It's a tie
            setResult(result => "tie");
        }else if(type === 'rock'){
            if(housePick === 'paper'){
                setResult(result => "lose");
            }else{
                setResult(result => "win");
            }
        }else if(type === 'paper'){
            if(housePick === 'scissors'){
                setResult(result => "lose");
            }else{
                setResult(result => "win");
            }
        }else if(type === 'scissors'){
            if(housePick === 'rock'){
                setResult(result => "lose");
                
            }else{
                setResult(result => "win");
            }
        }

        setGameStep(1);
        setClickedImage(true);
    }

    useEffect(() => {
        if (clickedImage) {
          const timeout = setTimeout(() => {
            setShowHousePick(true);
          }, 1000);
          return () => clearTimeout(timeout);
        }
      }, [clickedImage]);
      
      useEffect(() => {
        if (showHousePick && !showResult) { 
          const ndTimeOut = setTimeout(() => {
            setShowResult(result);

            let newScore;
            if (result === 'win') {
              newScore = score + 1;
            } else if (result === 'lose') {
              newScore = score - 1;
            } else {
              newScore = score;
            }
            setScore(newScore);
            localStorage.setItem('score', newScore);
          }, 1000);
          return () => clearTimeout(ndTimeOut);
        }
      }, [showHousePick, showResult, result, score]);
    

    const resetGame = () => {
        setGameStep(0); 
        setChosenType(""); 
        setClickedImage(false);
        setShowHousePick(false); 
        setShowResult("");
    }

    const Rock = () => {
        return (
            <div className={gameStep === 1 ? "nd-rock-round round" : "rock-round round"}  onClick={() => clickChoose("rock")}>
            <img alt="rock" className={gameStep === 1 ? "nd-fist icon" : "icon fist"} src={Images.rock}></img>
        </div>
        )
    }
    
    const Paper = () => {
        return (
            <div className={gameStep === 1 ? "nd-paper-round round" : "paper-round round"} onClick={() => clickChoose("paper")}>
            <img alt="paper" className={gameStep === 1 ? "nd-pap icon" : "icon pap"} src={Images.paper}></img>
        </div>
        )
    }
    
    const Scissors = () => {
        return (
            <div className={gameStep === 1 ? "nd-scissor-round round" : "scissor-round round"} onClick={() => clickChoose("scissors")}>
            <img alt="scissor" className={gameStep === 1 ? "nd-roc icon" : "icon roc"} src={Images.scissor}></img>
        </div>
        )
    }

    const GameStep = () => {
        if(gameStep === 0){
            return <Choice clickChoose={clickChoose} Rock={Rock} Paper={Paper} Scissors={Scissors} />
        }else if(gameStep === 1){
            return <Game chosenType={chosenType} resetGame={resetGame} housePicks={housePicks} Rock={Rock} Paper={Paper} Scissors={Scissors} result={result} showHousePick={showHousePick} showResult={showResult} />
        }
    }

    const clickRules = () => {
        setShowRules(true);
      };
    
      const closeRules = () => {
        setShowRules(false);
      };

    return (
        <>
        <main>
            <header>
                <div className="header-wrapper">
                    <div className="rps">
                        <h1>Rock</h1>
                        <h1>Paper</h1>
                        <h1>Scissors</h1>
                    </div>
                    <div className="score-block">
                        <h5>Score</h5>
                        <span>{score}</span>
                    </div>
                </div>
            </header>
            <section className="game">
                {GameStep()}
            </section>
            <div className={gameStep === 1 ? "rule-center" : "rule-wrapper"}>
                <div className="rule" onClick={() => clickRules()}>
                    <p>Rules</p>
                </div>
            </div>
        </main>
              {showRules && (
                <div className="rules-container">
                  <div className="rules-background" onClick={() => closeRules()}></div>
                  <div className="rules-content">
                    <h1>Rules</h1>
                    <div className="close-wrapper">
                      <img className="close" src={Images.close} onClick={() => closeRules()}></img>
                    </div>
                    <div className="rules-main">
                      <img className="rules-img" src={Images.rulesImg}></img>
                    </div>
                  </div>
                </div>
              )}
            </>
    )
}

export default Main; 