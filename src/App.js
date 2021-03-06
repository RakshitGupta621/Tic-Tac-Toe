import React, { useState } from 'react'
import Icon from "./components/Icon"

//From toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//From ReactStrap
import { Card, CardBody, Container, Button, Col, Row } from "reactstrap"
import 'bootstrap/dist/css/bootstrap.min.css';

import "./App.css"

const reloadsound = new Audio('../reload.wav');
const winsound = new Audio('../winsound.wav');
const backgroundsound = new Audio('../backgroundsound.mp3');

window.onload = backgroundsound.play();

backgroundsound.addEventListener("ended", () => {
    backgroundsound.play();
})

const itemArray = new Array(9).fill("empty")

const App = () => {
    const [isCross, setIsCross] = useState(false);
    const [winMessage, setWinMessage] = useState("");

    const reloadGame = () => {
        setIsCross(false); 
        setWinMessage(""); 
        itemArray.fill("empty", 0, 9); 
        backgroundsound.pause();
        reloadsound.play();
        backgroundsound.play();
    };

    const checkIsWinner = () => { 
        if(//first row
            itemArray[0] === itemArray[1] &&
            itemArray[0] === itemArray[2] && 
            itemArray[0] !== "empty"
        ) {
            setWinMessage(`${itemArray[0]} won`);
        } else if (//second row
            itemArray[3] !== "empty" &&
            itemArray[3] === itemArray[4] && 
            itemArray[4] === itemArray[5] 
        ) {
            setWinMessage(`${itemArray[3]} won`);
        } else if (//third row
            itemArray[6] !== "empty" &&
            itemArray[6] === itemArray[7] && 
            itemArray[7] === itemArray[8] 
        ) {
            setWinMessage(`${itemArray[6]} won`);
        } else if (//first column
            itemArray[0] !== "empty" &&
            itemArray[0] === itemArray[3] && 
            itemArray[3] === itemArray[6] 
        ) {
            setWinMessage(`${itemArray[0]} won`);
        } else if (//second column
            itemArray[1] !== "empty" &&
            itemArray[1] === itemArray[4] && 
            itemArray[4] === itemArray[7] 
        ) {
            setWinMessage(`${itemArray[1]} won`);
        } else if (//third column
            itemArray[2] !== "empty" &&
            itemArray[2] === itemArray[5] && 
            itemArray[5] === itemArray[8] 
        ) {
            setWinMessage(`${itemArray[2]} won`);
        } else if (//first diagonal
            itemArray[0] !== "empty" &&
            itemArray[0] === itemArray[4] && 
            itemArray[4] === itemArray[8] 
        ) {
            setWinMessage(`${itemArray[0]} won`);
        } else if (//second diagonal
            itemArray[2] !== "empty" &&
            itemArray[2] === itemArray[4] && 
            itemArray[4] === itemArray[6] 
        ) {
            setWinMessage(`${itemArray[2]} won`);
        }
    };

    /**https://fkhadra.github.io/react-toastify/introduction/ */
    const changeItem = itemNumber => {
        if (winMessage) { 
            winsound.play();
            backgroundsound.pause();
            return toast(winMessage, {type: "success", draggable: true});
        }
        if (itemArray[itemNumber] === "empty") {
            itemArray[itemNumber] = isCross ? ("cross"): ("circle")   
            setIsCross(!isCross) 
           
        } else {
            return toast("already filled ????", { type: "error",
            draggable: true })
        }
        checkIsWinner(); 
    };

    const toggleTheme = () => {
        var element = document.body;
        element.classList.toggle("dark-mode");
     }

    /**https://react-bootstrap.netlify.app/layout/grid/#row-props */
    /**https://react-bootstrap.netlify.app/components/buttons/#buttons */
    return (
        <Container className="p-5">
        <ToastContainer position="bottom-center" />
        <Row>
            <Col md="5" className="offset-md-3">
                {winMessage ? (
                    <div className="d-grid gap-3 mb-2">
                        <h1 className="text-warning text-uppercase text-center">
                            {winMessage}
                        </h1>
                        <Button color="danger" size="lg" block onClick={reloadGame}>
                             Reload the game
                        </Button>                           
                    </div>
                ) : (
                    <h1 className="text-center text-primary">
                        {isCross ? "Cross" : "Circle"} turns
                    </h1>
                )}
                <div className="grid">
                    {itemArray.map((item, index) => (
                        <Card color="info" onClick={ () => changeItem(index) }>
                            <CardBody className="box">
                                <Icon name={item} />
                            </CardBody>
                        </Card>
                    ))}
                </div>
                <div className="d-grid gap-3 mt-2">
                    <Button outline color="primary" size="sm" onClick={toggleTheme}>Toggle dark mode
                    </Button>
                </div>
            </Col>
        </Row>
    </Container>
    );
};

export default App;
