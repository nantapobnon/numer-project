import React, { useState, useEffect, Component, Fragment } from "react";
import { Card, Input, Button } from "antd";
import { compile } from "mathjs";
import Table from "react-bootstrap/Table";
import "antd/dist/antd.css";
import Plotly from "plotly.js-dist";

const func = (fx, X) => {
  var expr = compile(fx);
  let scope = { x: parseFloat(X) };
  console.log("expr = "+String(expr))
  console.log("scope = "+String(scope))
  console.log("res = "+String(expr.evaluate(scope)))
  return expr.evaluate(scope);
};

const InputStyle = {
  background: "white",
  color: "black",
  fontWeight: "bold",
  fontSize: "24px",
};

function Falseposition() {
  const [fx, setFx] = useState("");
  const [Xl, setXl] = useState("");
  const [Xr, setXr] = useState("");
  const [table, setTable] = useState(null);
  const [checkFunc, setCheckfunc] = useState(false);
  let dataTable = [];
  let X = [];
  let Y = [];
  //let table=null;

  function cal() {
    let l = parseFloat(Xl);
    let r = parseFloat(Xr);

    let err = 0.000001;
    let x1 = l;
    let x_old;
    let Fl, Fr;
    if (func(fx, Xl) < func(fx, Xr)) {
      setCheckfunc(true);
      do {
        x_old = x1;
        Fl = func(fx, l);
        Fr = func(fx, r);
        x1 = (l * Fr - r * Fl) / (Fr - Fl);
        func(fx,x1) * Fr < 0 ? (l = x1) : (r = x1);
        dataTable.push({
          L: l.toFixed(8),
          R: r.toFixed(8),
          X: x1.toFixed(8),
          Err: Math.abs((x1 - x_old) / x1).toFixed(8),
        });
        X.push(func(fx,x1).toFixed(8));
        Y.push(Math.abs((x1 - x_old) / x1).toFixed(8));
      } while (Math.abs((x1 - x_old) / x1) > err);
      creatTable();
    } else {
      setCheckfunc(false);
      setTable(null);
    }
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
            <th>XL</th>
            <th>XR</th>
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
                  <td>{data.L}</td>
                  <td>{data.R}</td>
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

  return (
    <div style={{ background: "#FFFF", padding: "30px",textAlign: "center", }}>
      <h2 style={{ color: "black", fontWeight: "bold" }}>
        False Position Method
      </h2>
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
              width: "70%",
              color: "#FFFFFFFF",
              borderRadius: "10px",
              padding: "16px",
            }}
          >
            <h3>f(x)</h3>
            <Input
              size="large"
              name="fx"
              style={InputStyle}
              onChange={(event) => setFx(event.target.value)}
            ></Input>
            <h3>XL</h3>
            <Input
              size="large"
              name="XL"
              style={InputStyle}
              onChange={(event) => setXl(event.target.value)}
            ></Input>
            <h3>XR</h3>
            <Input
              size="large"
              name="XR"
              style={InputStyle}
              onChange={(event) => setXr(event.target.value)}
            ></Input>
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

export default Falseposition;
