import React, { useState, useEffect, Component, Fragment } from "react";
import { Card, Input, Button } from "antd";
import { compile } from "mathjs";
import Table from "react-bootstrap/Table";
import "antd/dist/antd.min.css";
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

function Secant() {
  const [fx, setFx] = useState("");
  const [X1, setX1] = useState("");
  const [X2, setX2] = useState("");
  const [table, setTable] = useState(null);
  let dataTable = [];
  let X = [];
  let Y = [];
  //let table=null;

  function cal() {
    let x1 = parseFloat(X1);
    let x2 = parseFloat(X2);
    let x3 = x2 - (func(fx, x2) * (x2 - x1)) / (func(fx, x2) - func(fx, x1));
    while (Math.abs((x3 - x2) / x3) >= 0.000001) {
      x1 = x2;
      x2 = x3;
      x3 = x2 - (func(fx, x2) * (x2 - x1)) / (func(fx, x2) - func(fx, x1));
      dataTable.push({
        x0: x1.toFixed(8),
        x1: x2.toFixed(8),
        xnew: x3.toFixed(8),
        Err: Math.abs((x3 - x2) / x3).toFixed(8),
      });
      X.push(func(fx, x3).toFixed(8));
      Y.push(Math.abs((x3 - x2) / x3).toFixed(8));
    }
    creatTable();
  }

  function creatTable() {
    console.log(dataTable);

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
    console.log(Y);
    Plotly.newPlot("myChart", [data], layout);

    setTable(
      <Table striped bordered hover variant="dark">
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
                  <td>{i + 1}</td>
                  <td>{data.x0}</td>
                  <td>{data.x1}</td>
                  <td>{data.xnew}</td>
                  <td>{data.Err}</td>
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
          if (response.data.result[i].id == "secant") {
            setFx(response.data.result[i].fx);
            setX1(response.data.result[i].x0);
            setX2(response.data.result[i].x1);
          }
        }
      });
  }

  return (
    <div style={{ background: "#FFFF", padding: "30px", textAlign: "center" }}>
      <h2 style={{ color: "black", fontWeight: "bold" }}>Secant Method</h2>
      <div className="row">
        <div
          className="col"
          style={{
            display: "flex",
            textAlign: "center",
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
            <h3>X0</h3>
            <Input
              size="large"
              name="XL"
              value={X1}
              style={InputStyle}
              onChange={(event) => setX1(event.target.value)}
            ></Input>
            <h3>X1</h3>
            <Input
              size="large"
              name="XR"
              value={X2}
              style={InputStyle}
              onChange={(event) => setX2(event.target.value)}
            ></Input>
            <br />
            <br />
            <Button onClick={callAPI}>API</Button>
            <br />
            <br />
            <Button onClick={cal}>Enter</Button>

            <div className="graph">
              <br />
              <div id="myChart"></div>
              <br />
              <br />
            </div>

            <div className="calTable">
              <br />
              {table}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Secant;
