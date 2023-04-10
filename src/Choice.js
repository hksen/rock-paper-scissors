import React from 'react'; 


function Choice({ clickChoose, Rock, Paper, Scissors }){

    return (
        <div className="default-game">
            <div className="top">
                <div className="paper-wrapper">
                    {Paper()}
                </div>
                <div className="first-line line"></div>
                <div className="scissors-wrapper">
                    {Scissors()}
                </div>

            </div>
            <div className="bottom">
                <div className="bottom-lines">
                    <div className="nd-line line"></div>
                    <div className="third-line line"></div>
                </div>
 
                <div className="rock-wrapper">
                    {Rock()}
                </div>
            </div>
        </div>
    )
}

export default Choice;