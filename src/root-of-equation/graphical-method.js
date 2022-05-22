import React, { useState, useEffect, Component, Fragment } from "react";
import { Card, Input, Button } from "antd";
import { compile } from "mathjs";
import Table from "react-bootstrap/Table";
import "antd/dist/antd.css";
import Plotly from "plotly.js-dist";
import axios from "axios";

const func = (fx, X) => {
  var expr = compile(fx);
  let scope = { x: parseFloat(X) };
  return expr.evaluate(scope);
};

const InputStyle = {
  background: "white",
  color: "black",
  fontWeight: "bold",
  fontSize: "24px",
  width: "50%",
};

function Graphical() {
  const [fx, setFx] = useState("");
  const [Xl, setXl] = useState("");
  const [Xr, setXr] = useState("");
  const [table, setTable] = useState(null);
  const [graph, setGraph] = useState(null);
  const [checkFunc, setCheckfunc] = useState(false);
  let dataTable = [];
  let X = [];
  let Y = [];

  function cal() {
    if (Xl < Xr) {
      for (var i = parseInt(Xl); i <= parseInt(Xr); i++) {
        dataTable.push({
          x: i,
          fx: func(fx, i),
        });
        X.push(i);
        Y.push(func(fx, i));
      }
      console.log(X)
      creatTable();
    } else {
      setCheckfunc(false);
      setGraph(null);
      setTable(null);
    }
  }

  function creatTable() {
    console.log(dataTable);
    console.log(Y);
    var data = {
      x: X,
      y: Y,
      type: "scatter",
      // mode: 'lines',
    };
    var layout = {
      xaxis: {
        //type: 'log',
        autorange: true,
        hoverformat: ".8f",
        tickformat: ".8f",
        showlegend: false,
      },
      yaxis: {
        //type: 'log',
        autorange: true,
        hoverformat: ".8f",
        tickformat: ".8f",
        showlegend: false,
      },
    };
    console.log(data);

    setGraph(Plotly.newPlot("myChart", [data], layout));

    setTable(
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Iter.</th>
            <th>X</th>
            <th>F(X)</th>
          </tr>
        </thead>
        <tbody>
          {dataTable.map((data, i) => {
            return (
              <Fragment>
                <tr>
                  <td>{i + 1}</td>
                  <td>{data.x}</td>
                  <td>{data.fx}</td>
                </tr>
              </Fragment>
            );
          })}
        </tbody>
      </Table>
    );
  }

  function callAPI() {
    const headers = {
      "x-auth-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlcyI6WyJhZG1pbiIsImVkaXRvciIsInZpZXdlciJdLCJpYXQiOjE2NTMwNjY0MzUsImV4cCI6MTY4NDYyNDAzNX0.pTeysLdrdUWa0hHVznTfMbtjoxz-a8Ae1IirCyWKqOc",
    };
    
    axios
      .get("http://localhost:4000/api/rootofequation", { headers })
      .then((response) => {
        for (var i = 0; i < response.data.result.length; i++) {
          if (response.data.result[i].id == "graphical") {
            setFx(response.data.result[i].fx);
            setXl(response.data.result[i].start);
            setXr(response.data.result[i].finish);
          }
        }
      });
  }

  return (
    <div style={{ background: "#FFFF", padding: "30px", textAlign: "center" }}>
      <h2 style={{ color: "black", fontWeight: "bold" }}>Graphical Method</h2>
      <div className="row">
        <div
          className="col"
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card
            style={{
              background: "rgb(75, 75, 168)",
              width: "50%",
              color: "#FFFFFFFF",
              borderRadius: "10px",
              padding: "16px",
            }}
          >
            <h3>f(x)</h3>
            <Input
              size="large"
              name="fx"
              value={fx}
              style={InputStyle}
              onChange={(event) => setFx(event.target.value)}
            ></Input>
            <h3>Start</h3>
            <Input
              size="large"
              name="XL"
              value={Xl}
              style={InputStyle}
              onChange={(event) => setXl(event.target.value)}
            ></Input>
            <h3>Finish</h3>
            <Input
              size="large"
              name="XR"
              value={Xr}
              style={InputStyle}
              onChange={(event) => setXr(event.target.value)}
            ></Input>
            <br />
            <br />
            <Button onClick={callAPI}>API</Button>
            <br />
            <br />
            <Button onClick={cal}>Enter</Button>
            {!checkFunc && (
              <h2 style={{ color: "red", fontWeight: "bold" }}>
                wrong or no input
              </h2>
            )}
            <div className="graph">
              <br />
              <div id="myChart"></div>
              <br />
              <br />
            </div>
            {table && (
              <div>
                <div className="calTable">
                  <br />
                  {table}
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Graphical;


