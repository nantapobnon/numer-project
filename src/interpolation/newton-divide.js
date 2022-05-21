import React, { useState, useEffect, Component, Fragment } from "react";
import { Card, Input, Button, Table } from "antd";
import "antd/dist/antd.css";

const InputStyle = {
  width: "100px",
  background: "white",
  color: "black",
  fontWeight: "bold",
  fontSize: "24px",
};

function NewtonDivide() {
  const [matrixSize, setMatrixSize] = useState({
    rows: 2,
    columns: 2,
  });
  const [matrixXY, setMatrixXY] = useState(null);
  const [matrixPoint, setMatrixPoint] = useState(null);
  const [pointNum, setPointNum] = useState(2);
  const [target, setTarget] = useState(null);
  const [output, setOutput] = useState(null);
  var matrix = [];
  var matrixP = [];
  var x = [];
  var y = [];
  var point = [];
  var result = null;
  var columns = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "X",
      dataIndex: "x",
      key: "x",
    },
    {
      title: "Y",
      dataIndex: "y",
      key: "y",
    },
  ];

  function C(n) {
    if (n === 1) {
      return 0;
    } else {
      return (
        (y[point[n]] - y[point[n - 1]]) / (x[point[n]] - x[point[n - 1]]) -
        C(n - 1)
      );
    }
  }

  function findX(n, X) {
    if (n < 1) {
      return 1;
    } else {
      return (X - x[point[n]]) * findX(n - 1, X);
    }
  }

  function calc() {
    x = [];
    y = [];
    for (var i = 1; i <= matrixSize["rows"]; i++) {
      x[i] = parseFloat(document.getElementById("x" + i).value);
      y[i] = parseFloat(document.getElementById("y" + i).value);
    }
    for (i = 1; i <= pointNum; i++) {
      point[i] = parseInt(document.getElementById("p" + i).value);
    }

    result = y[1];
    console.log(x);
    console.log(y);
    if (parseInt(pointNum) === 2) {
      //if linear interpolate
      result +=
        ((y[point[2]] - y[point[1]]) / (x[point[2]] - x[point[1]])) *
        (target - x[point[1]]);
    } else {
      for (var i = 2; i <= pointNum; i++) {
        result += (C(i) / (x[point[i]] - x[point[1]])) * findX(i - 1, target);
      }
    }
    setOutput(result);
  }

  function createMatrix() {
    for (var i = 1; i <= matrixSize["rows"]; i++) {
      x.push(
        <Input
          style={{
            width: "100%",
            height: "50%",
            backgroundColor: "white",
            marginInlineEnd: "5%",
            marginBlockEnd: "5%",
            color: "black",
            fontSize: "18px",
            fontWeight: "bold",
          }}
          id={"x" + i}
          key={"x" + i}
          placeholder={"x" + i}
        />
      );
      y.push(
        <Input
          style={{
            width: "100%",
            height: "50%",
            backgroundColor: "white",
            marginInlineEnd: "5%",
            marginBlockEnd: "5%",
            color: "black",
            fontSize: "18px",
            fontWeight: "bold",
          }}
          id={"y" + i}
          key={"y" + i}
          placeholder={"y" + i}
        />
      );
      matrix.push({
        no: i,
        x: x[i - 1],
        y: y[i - 1],
      });
    }

    for (var i = 1; i <= pointNum; i++) {
      matrixP.push(
        <Input
          style={{
            width: "14%",
            height: "50%",
            backgroundColor: "white",
            marginInlineEnd: "5%",
            marginBlockEnd: "5%",
            color: "black",
            fontSize: "18px",
            fontWeight: "bold",
          }}
          id={"p" + i}
          key={"p" + i}
          placeholder={"p" + i}
        />
      );
    }

    setMatrixXY(matrix);
    setMatrixPoint(matrixP);
  }

  return (
    <div style={{ background: "#FFFF",textAlign: "center", padding: "30px" }}>
      <h2 style={{ color: "black", fontWeight: "bold" }}>
        Newton's Divided Differences
      </h2>
      <div className="row">
        <div
          className="col"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",textAlign: "center",
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
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div>
                <h3>Matrix size</h3>
                <Input
                  size="large"
                  type="number"
                  name="XR"
                  style={InputStyle}
                  value={matrixSize["rows"]}
                  defaultValue={matrixSize["rows"]}
                  onChange={(e) => {
                    const rows = parseInt(e.target.value);
                    // if we only want matrix of size between 2 and 8
                    if (2 <= rows && rows <= 10) {
                      setMatrixSize((prevSize) => ({
                        ...prevSize,
                        rows: rows,
                        columns: rows,
                      }));
                    }
                  }}
                ></Input>
              </div>
              <div style={{ width: "80px" }}></div>
              <div>
                <h3>Points(n)</h3>
                <Input
                  size="large"
                  name="points"
                  type="number"
                  value={pointNum}
                  defaultValue={pointNum}
                  style={InputStyle}
                  onChange={(e) => {
                    if (2 <= e.target.value && e.target.value <= 5) {
                      setPointNum(e.target.value);
                    }
                    //setPointNum(e.target.value);
                  }}
                ></Input>
              </div>
              <div style={{ width: "80px" }}></div>
              <div>
                <h3>X</h3>
                <Input
                  size="large"
                  name="X"
                  value={target}
                  style={{
                    width: "200px",
                    background: "white",
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "24px",
                  }}
                  onChange={(e) => {
                    setTarget(e.target.value);
                  }}
                ></Input>
              </div>
            </div>

            <br />
            <br />
            <Button onClick={createMatrix}>Set Matrix</Button>
            {matrixXY && (
              <div style={{}}>
                <br />
                <br />
                <div
                  style={{
                    width: "50%",
                    margin: "0 auto",
                  }}
                >
                  <h2>Input MatrixXY</h2>
                  {/* <br /> */}
                  <Table
                    columns={columns}
                    dataSource={matrixXY}
                    pagination={false}
                    bordered={true}
                    bodyStyle={{
                      fontWeight: "bold",
                      fontSize: "18px",
                      color: "white",
                      overflowY: "scroll",
                      minWidth: 120,
                      maxHeight: 300,
                    }}
                  ></Table>
                </div>
                <br />
                <h2>Input Point</h2>
                <br />
                {matrixPoint}
                <br />
                <Button onClick={calc}>Enter</Button>
              </div>
            )}
            {output && (
              <div>
                <br />
                <br />
                <h2>Result</h2>
                <br />
                <h2 style={{ color: "white", fontWeight: "bold" }}>{output}</h2>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

export default NewtonDivide;
