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

function Secant(){
    const [fx,setFx] = useState('');
    const [X1, setX1] = useState('');
    const [X2, setX2] = useState('');
    const [table,setTable] = useState(null);
    let dataTable=[];
    let X=[];
    let Y=[];
    //let table=null;

    function cal(){
        let x1=parseFloat(X1);
        let x2=parseFloat(X2);
        let x3=x2 - ((func(fx,x2)*(x2-x1))/(func(fx,x2)-func(fx,x1)));
        while(Math.abs((x3-x2)/x3)>=0.000001){
            x1=x2;
            x2=x3;
            x3=x2 - ((func(fx,x2)*(x2-x1))/(func(fx,x2)-func(fx,x1)));
            dataTable.push({
                x0: x1.toFixed(8),
                x1: x2.toFixed(8),
                xnew: x3.toFixed(8),
                Err: (Math.abs((x3-x2)/x3)).toFixed(8)
            })
            X.push(x3.toFixed(8));
            Y.push((Math.abs((x3-x2)/x3)).toFixed(8));
        }
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
                <th>X0</th>
                <th>X1</th>
                <th>Xnew</th>
                <th>Error</th>
                </tr>
            </thead>
            <tbody>
                {dataTable.map((data, i) => {
                    return (
                    <Fragment>
                        <tr>
                            <td>{i+1}</td>
                            <td>{(data.x0)}</td>
                            <td>{(data.x1)}</td>
                            <td>{(data.xnew)}</td>
                            <td>{(data.Err)}</td>
                        </tr>
                    </Fragment>
                    );
                })}  
            </tbody>
        </Table>);
    }
    


    return(
        <div style={{ background: "#FFFF", padding: "30px" }}>
            <h2 style={{ color: "black", fontWeight: "bold" }}>Secant Method</h2>
            <div className="row">
                <div className="col" style={{display: "flex", justifyContent: "center",alignItems: "center"}}>
                    <Card
                        style={{ background: "rgb(75, 75, 168)",width: "70%", color: "#FFFFFFFF", borderRadius:"10px" ,padding: "16px"}}
                    >
                        <h3>f(x)</h3>
                        <Input size="large" name="fx" style={InputStyle} onChange={(event) => setFx(event.target.value)}></Input>
                        <h3>X0</h3>
                        <Input size="large" name="XL" style={InputStyle} onChange={(event) => setX1(event.target.value)}></Input>
                        <h3>X1</h3>
                        <Input size="large" name="XR" style={InputStyle} onChange={(event) => setX2(event.target.value)}></Input>
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

    
export default Secant;