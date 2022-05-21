import React, { useState,useEffect,Component,Fragment } from "react";
import { Card, Input, Button} from 'antd';
import { compile } from 'mathjs';
import Table from 'react-bootstrap/Table'
import 'antd/dist/antd.css';
import Plotly from 'plotly.js-dist'

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

function OnePoint(){
    const [fx,setFx] = useState('');
    const [X0,setX0] = useState('');
    const [table,setTable] = useState(null);
    let dataTable=[];
    let X=[];
    let Y=[];

    function cal(){
        let x0=parseFloat(X0);

        let err = 0.000001
        let x1=0;
        var temp
        do{
            x1 = func(fx,x0);
            temp=x0;
            x0 = x1 ;
            dataTable.push({
                X: func(fx,x1).toFixed(8),
                Err: (Math.abs((x1-temp)/x1)).toFixed(8),
            })
            X.push(func(fx,x1).toFixed(8));
            Y.push((Math.abs((x1-temp)/x1)).toFixed(8));
        }while(Math.abs((x1-temp)/x1)>err)
        creatTable()
    }   

    function creatTable(){
        console.log(dataTable);
        var data = {
            x: X,
            y: Y,
            type: 'scatter',
            // mode: 'lines',
        };
        var layout = {
            xaxis: {
              //type: 'log',
              autorange: true,
              hoverformat: '.8f',
              tickformat : '.8f',
              showlegend: false
            },
            yaxis: {
              //type: 'log',
              autorange: true,
              hoverformat: '.8f',
              tickformat : '.8f',
              showlegend: false
            }
        };
        console.log(Y);
        Plotly.newPlot('myChart', [data], layout);


        setTable(<Table striped bordered hover variant="dark">
            <thead>
                <tr>
                <th>Iter.</th>
                <th>X</th>
                <th>Error</th>
                </tr>
            </thead>
            <tbody>
                {dataTable.map((data, i) => {
                    return (
                    <Fragment>
                        <tr>
                            <td>{i+1}</td>
                            <td>{(data.X)}</td>
                            <td>{(data.Err)}</td>
                        </tr>
                    </Fragment>
                    );
                })}  
            </tbody>
        </Table>);
    }
    


    return(
        <div style={{ background: "#FFFF", padding: "30px",textAlign: "center", }}>
            <h2 style={{ color: "black", fontWeight: "bold" }}>One-Point Iteration Method</h2>
            <div className="row">
                <div className="col" style={{display: "flex",textAlign: "center", justifyContent: "center",alignItems: "center"}}>
                    <Card
                        style={{ background: "rgb(75, 75, 168)",width: "70%", color: "#FFFFFFFF", borderRadius:"10px" ,padding: "16px"}}
                    >
                        <h3>f(x)</h3>
                        <Input size="large" name="fx" style={InputStyle} onChange={(event) => setFx(event.target.value)}></Input>
                        <h3>X0</h3>
                        <Input size="large" name="X0" style={InputStyle} onChange={(event) => setX0(event.target.value)}></Input>
                        {/* <h3>XR</h3>
                        <Input size="large" name="XR" style={InputStyle} onChange={(event) => setXr(event.target.value)}></Input> */}
                        <br /><br />
                        <Button onClick={cal}>Enter</Button>

                        <div className="graph">
                            <br/>  
                            <div id="myChart"></div>
                            <br/><br/>      
                        </div>
                        
                        <div className="calTable">
                            <br/>
                            {table}
                        </div>
                    </Card>                        
                </div>
            </div>
        </div>
        
    );
}

    
export default OnePoint;