import React, { useState, Fragment } from "react";
import { Card, Input, Button } from "antd";
import { compile } from "mathjs";
import Table from "react-bootstrap/Table";
import "antd/dist/antd.css";
import Chart from "chart.js/auto";
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

function Bisection() {
  const [fx, setFx] = useState("");
  const [Xl, setXl] = useState("");
  const [Xr, setXr] = useState("");
  const [table, setTable] = useState(null);
  const [graph, setGraph] = useState(null);
  const [checkFunc, setCheckfunc] = useState(false);
  let dataTable = [];
  let X = [];
  let Y = [];
  //let table=null;

  function cal() {
    let sum = 0;
    let l = parseFloat(Xl);
    let r = parseFloat(Xr);
    let xm = l;
    if (func(fx, Xl) < func(fx, Xr)) {
      setCheckfunc(true);
      while (r - l >= 0.000001) {
        xm = (l + r) / 2;
        if (func(fx, xm) === 0.0) break;
        else if (func(fx, xm) * func(fx, r) > 0) {
          sum = Math.abs((xm - r) / xm);
          r = xm;
        } else {
          sum = Math.abs((xm - l) / xm);
          l = xm;
        }
        dataTable.push({
          L: l.toFixed(8),
          R: r.toFixed(8),
          M: xm.toFixed(8),
          Err: sum.toFixed(8),
        });
        X.push(func(fx, xm).toFixed(8));
        Y.push(sum.toFixed(8));
      }
      creatTable();
    } else {
      setCheckfunc(false);
      setGraph(null);
      setTable(null);
    }
    // console.log(func(fx, Xl))
    // console.log(func(fx, Xr))
    // console.log(checkFunc)
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

    // setGraph(new Chart("myChart", {
    //     type: "line",
    //     data: {
    //       labels: X,
    //       datasets: [{
    //         label: fx,
    //         fill: false,
    //         lineTension: 0,
    //         pointRadius: 2,
    //         backgroundColor: "rgba(0,0,255,1.0)",
    //         borderColor: "rgba(0,0,255,0.1)",
    //         data: Y
    //       }]
    //     },
    //     options: {
    //         legend: {display: false},
    //     //   scales: {
    //     //     yAxes: [{ticks: {min: 6, max:16}}],
    //     //   }
    //     }
    // }));

    // new Chart("myChart", {
    //     type: "line",
    //     data: {
    //       labels: X,
    //       datasets: [{
    //         fill: false,
    //         pointRadius: 2,
    //         borderColor: "rgba(0,0,255,0.5)",
    //         data: Y
    //       }]
    //     },
    //     options: {
    //         tooltips: {
    //             callbacks: {
    //                 label: function(tooltipItem, data) {
    //                     return tooltipItem.yLabel.toFixed(8).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    //                 }
    //             }
    //         },
    //       legend: {display: false},
    //       title: {
    //         display: true,
    //         text: "y = x * 2 + 7",
    //         fontSize: 16
    //       }
    //     }
    //   });

    setTable(
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Iter.</th>
            <th>XL</th>
            <th>XR</th>
            <th>XM</th>
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
                  <td>{data.M}</td>
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
          if (response.data.result[i].id === "bisection") {
            setFx(response.data.result[i].fx);
            setXl(response.data.result[i].xl);
            setXr(response.data.result[i].xr);
          }
        }
      });
  }

  return (
    <div style={{ background: "#FFFF", padding: "30px", textAlign: "center" }}>
      <h2 style={{ color: "black", fontWeight: "bold" }}>Bisection Method</h2>
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
              style={InputStyle}
              value={fx}
              onChange={(event) => setFx(event.target.value)}
            ></Input>
            <h3>XL</h3>
            <Input
              size="large"
              name="XL"
              value={Xl}
              style={InputStyle}
              onChange={(event) => setXl(event.target.value)}
            ></Input>
            <h3>XR</h3>
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

export default Bisection;
