import React, { useState, useEffect, Component, Fragment } from "react";
import { Card, Input, Button } from "antd";
import "antd/dist/antd.css";
const InputStyle = {
  width: "100px",
  background: "white",
  color: "black",
  fontWeight: "bold",
  fontSize: "24px",
};

function Jacobi() {
  const [matrixSize, setMatrixSize] = useState({
    rows: 2,
    columns: 2,
  });
  const [matrixA, setMatrixA] = useState(null);
  const [matrixB, setMatrixB] = useState(null);
  const [matrixRes, setMatrixRes] = useState(null);
  var matrix = [];
  var matrixAns = [];
  var A = [];
  var B = [];
  var dataTable = [];
  var x;

  function calc() {
    for (var i = 0; i < matrixSize["rows"]; i++) {
      A[i] = [];
      for (var j = 0; j < matrixSize["rows"]; j++) {
        A[i][j] = parseFloat(
          document.getElementById("a" + (i + 1) + "" + (j + 1)).value
        );
      }
      B.push(parseFloat(document.getElementById("b" + (i + 1)).value));
      x.push(parseFloat(document.getElementById("x" + (i + 1)).value));
    }

    var temp;
    var xold;
    // do {
    //     temp = [];
    //     xold = JSON.parse(JSON.stringify(x));
    //     for (var i=0 ; i<matrixSize["rows"] ; i++) {
    //         var sum = 0;
    //         for (var j=0 ; j<matrixSize["rows"] ; j++) {
    //             if (i !== j) { //else i == j That is a divide number
    //                 sum = sum + A[i][j]*x[j];
    //             }
    //         }
    //         temp[i] = (B[i] - sum)/A[i][i]; //update x[i]
            
    //     }        
    //     x = JSON.parse(JSON.stringify(temp));
    //     dataTable.push({
    //         X1: x[0].toFixed(8),
    //         X2: x[1].toFixed(8),
    //         X3: x[2].toFixed(8),
    //         Err: sum.toFixed(8),
    //     })
    // } while(this.error(x, xold));

    //     return false;
  }

  function createMatrix() {
    for (var i = 1; i <= matrixSize["rows"]; i++) {
      for (var j = 1; j <= matrixSize["columns"]; j++) {
        matrix.push(
          <Input
            style={{
              width: "7%",
              height: "50%",
              backgroundColor: "white",
              marginInlineEnd: "5%",
              marginBlockEnd: "5%",
              color: "black",
              fontSize: "18px",
              fontWeight: "bold",
            }}
            id={"a" + i + "" + j}
            key={"a" + i + "" + j}
            placeholder={"a" + i + "" + j}
          />
        );
      }
      matrix.push(
        <Input
          style={{
            width: "7%",
            height: "50%",
            backgroundColor: "grey",
            marginInlineEnd: "5%",
            marginBlockEnd: "5%",
            color: "white",
            fontSize: "18px",
            fontWeight: "bold",
          }}
          id={"x" + i}
          key={"x" + i}
          placeholder={"x" + i}
        />
      );
      matrix.push(
        <Input
          style={{
            width: "7%",
            height: "50%",
            backgroundColor: "black",
            marginInlineEnd: "5%",
            marginBlockEnd: "5%",
            color: "white",
            fontSize: "18px",
            fontWeight: "bold",
          }}
          id={"b" + i}
          key={"b" + i}
          placeholder={"b" + i}
        />
      );
      matrix.push(<br />);
      //matrixAns.push(<br />);
    }
    //set
    console.log(matrix);
    console.log(matrixSize["rows"]);
    setMatrixA(matrix);
    setMatrixB(matrixAns);
  }

  return (
    <div style={{ background: "#FFFF", padding: "30px" }}>
      <h2 style={{ color: "black", fontWeight: "bold" }}>
        Jacobi Iteration Method
      </h2>
      <div className="row">
        <div
          className="col"
          style={{
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
                if (2 <= rows && rows <= 5) {
                  setMatrixSize((prevSize) => ({
                    ...prevSize,
                    rows: rows,
                    columns: rows,
                  }));
                }
              }}
            ></Input>
            <br />
            <br />
            <Button onClick={createMatrix}>Set Matrix</Button>
            {matrixA && (
              <div>
                <br />
                <br />
                <div>
                  <h2>Input Matrix</h2>
                  {/* <br /> */}
                  {matrixA}
                </div>

                <Button onClick={calc}>Enter</Button>
              </div>
            )}
            {matrixRes && (
              <div>
                <br />
                <br />
                <h2>Result</h2>
                <br />
                <h2 style={{ color: "black", fontWeight: "bold" }}>
                  {matrixRes}
                </h2>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Jacobi;
