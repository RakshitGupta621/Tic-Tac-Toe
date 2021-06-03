import React, { useState } from 'react'
import Icon from "./components/Icon"

//From toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//From ReactStrap
import { Card, CardBody, Container, Button, Col, Row } from "reactstrap"
import 'bootstrap/dist/css/bootstrap.min.css';

import "./App.css"

const itemArray = new Array(9).fill("empty")

const App = () => {

    //Below is the use of React Hooks 
    const [isCross, setIsCross] = useState(false);
    const [winMessage, setWinMessage] = useState("");

    const reloadGame = () => {//reloads game
        setIsCross(false); //no cross by default
        setWinMessage(""); //no win message printed initially
        itemArray.fill("empty", 0, 9); //empty initially from 0 to 9
    };

    const checkIsWinner = () => { //checks winner
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
        if (winMessage) { //returns toast in color success
            return toast(winMessage, {type: "success", draggable: true});
        }
        if (itemArray[itemNumber] === "empty") {
            itemArray[itemNumber] = isCross ? "cross" : "circle"    //if isCross is true then we set it to cross else circle
            setIsCross(!isCross) //setCross initally was false so set it to cross now basically it flips intial value to circle and cross
        } else {//returns toast in color error
            return toast("already filled 👆", { type: "error",
            draggable: true })
        }
        checkIsWinner(); //checks the winner this is the main logical part
    };

    const toggleTheme = () => {
        var element = document.body;
        element.classList.toggle("dark-mode");
     }

    /**https://react-bootstrap.netlify.app/layout/grid/#row-props */
    /**https://react-bootstrap.netlify.app/components/buttons/#buttons */
    return (
        <Container className="p-5">
            <ToastContainer position="bottom-center" /> {/*This container is for the toast  */}
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
                    <div className="grid">{/*Here the grid is self defined classname whose style propertie are mentioned in the app.css*/}
                    {/*The map loops through every single item in the itemArray and returns the index also.*/}
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
