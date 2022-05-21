import React, { useState,useEffect,Component } from "react";
import { Card, Input, Button, Table } from 'antd';
import { compile, derivative } from 'mathjs';

const func = (fx, X) => {
    var expr = compile(fx); 
    let scope = { x: parseFloat(X) }; 
    return expr.evaluate(scope);
}

const InputStyle = {
    background: "white",
    color: "black",
    fontWeight: "bold",
    fontSize: "24px"

};

var dataInTable;
const columns = [
    {
        title: "Iteration",
        dataIndex: "iteration",
        key: "iteration"
    },
    {
        title: "X",
        dataIndex: "x",
        key: "x"
    },
    {
        title: "Y",
        key: "y",
        dataIndex: "y"
    }
];

function Graphical(){
    const [showOutput,setShowOutput] = useState(false);
    let fx= "";
    let start= 0;
    let finish= 0;
    const [isLoading, setLoading] = useState(false);
    const [x, setX] = useState({});
    const [y, setY] = useState({});
    let table=null;

    function creatTable(x,y){
        
    }
    

    // function createTable(x,y) {
    //     dataInTable = []
    //     for (var i = 0; i <= parseInt(finish - start); i++) {
    //         dataInTable.push({
    //             iteration: i + 1,
    //             x: x[i],
    //             y: y[i]
    //         });
    //     }

    // }

    // function cal() {
    //     var data = []
    //     data['x'] = []
    //     data['y'] = []
    //     for (var i = parseInt(start); i <= parseInt(finish); i++) {
    //         data['x'].push(i);
    //         data['y'].push(func(fx, i));

    //     }
    //     createTable(data['x'], data['y']);
    //     setShowOutput(true);
    // }


    return(
        <div style={{ background: "#FFFF", padding: "30px" }}>
            <h2 style={{ color: "black", fontWeight: "bold" }}>Graphical</h2>
            

            <div className="row">
                <div className="col">
                    <Card
                        style={{ background: "rgb(75, 75, 168)", color: "#FFFFFFFF", borderRadius:"10px" ,padding: "16px"}}
                        //onChange={this.handleChange}
                    >
                        <h3>f(x)</h3><Input size="large" name="fx" style={InputStyle}></Input>
                        <h3>Start</h3><Input size="large" name="start" style={InputStyle}></Input>
                        <h3>Finish</h3><Input size="large" name="finish" style={InputStyle}></Input><br /><br />
                        {/* <Button id="submit_button" onClick={
                                () => cal(parseFloat(start), parseFloat(finish))
                            }
                            style={{ background: "#4caf50", color: "white"}}>Submit
                        </Button> */}
                        <Button variant="primary" size="lg" active>
                            Primary button
                        </Button>{' '}

                    </Card>                        
                </div>
            </div>
            <div classname="calTable">
                {table}
            </div>
            {/* <div className="row">
                {showOutput &&
                    <Card
                        title={"Output"}
                        bordered={true}
                        style={{ width: "100%", background: "#2196f3", color: "#FFFFFFFF" }}
                        id="outputCard"
                    >
                        <Table columns={columns} bordered={true} dataSource={dataInTable} bodyStyle={{ fontWeight: "bold", fontSize: "18px", color: "black" }}></Table>
                    </Card>
                }                    
            </div> */}
        </div>
        
    );
}

    
export default Graphical;