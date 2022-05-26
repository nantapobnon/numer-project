import React, { useState, Fragment } from "react";
import { Card, Input, Button } from "antd";
import { compile, derivative } from "mathjs";
import Table from "react-bootstrap/Table";
import "antd/dist/antd.css";
import Plotly from "plotly.js-dist";
import axios from "axios";

const func = (fx, X) => {
  var expr = compile(fx);
  let scope = { x: parseFloat(X) };
  return expr.evaluate(scope);
};

const funcDiff = (fx, X) => {
  var expr = derivative(fx, "x");
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

function Newton() {
  const [fx, setFx] = useState("");
  const [X0, setX0] = useState("");
  const [table, setTable] = useState(null);
  let dataTable = [];
  let X = [];
  let Y = [];
  //let table=null;

  function cal() {
    let x0 = parseFloat(X0);

    let x1, temp;
    do {
      x1 = x0 - func(fx, x0) / funcDiff(fx, x0);
      temp = x0;
      x0 = x1;
      dataTable.push({
        X: x1.toFixed(8),
        Err: Math.abs((x1 - temp) / x1).toFixed(8),
      });
      X.push(func(fx, x1).toFixed(8));
      Y.push(Math.abs((x1 - temp) / x1).toFixed(8));
    } while (Math.abs((x1 - temp) / x1) >= 0.000001);

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
            <th>X</th>
            <th>Error</th>
          </tr>
        </thead>
        <tbody>
          {dataTable.map((data, i) => {
            return (
              <Fragment>
                <tr>
                  <td>{i + 1}</td>
                  <td>{data.X}</td>
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
          if (response.data.result[i].id === "newton") {
            setFx(response.data.result[i].fx);
            setX0(response.data.result[i].x0);
          }
        }
      });
  }

  return (
    <div style={{ background: "#FFFF", padding: "30px", textAlign: "center" }}>
      <h2 style={{ color: "black", fontWeight: "bold" }}>
        Newton-Raphson Method
      </h2>
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
              value={X0}
              style={InputStyle}
              onChange={(event) => setX0(event.target.value)}
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

export default Newton;
