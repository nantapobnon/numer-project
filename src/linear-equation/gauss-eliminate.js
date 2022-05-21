import React, { useState, useEffect, Component, Fragment } from "react";
import { Card, Input, Button } from "antd";
import { compile } from "mathjs";
import { det } from "mathjs";
import "antd/dist/antd.css";

const InputStyle = {
  width: "100px",
  background: "white",
  color: "black",
  fontWeight: "bold",
  fontSize: "24px",
};

function Gauss_eliminate() {
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
  var result = [];
  var X;

  function calc() {
    for (var i = 0; i < matrixSize["rows"]; i++) {
      A[i] = [];
      for (var j = 0; j < matrixSize["columns"]; j++) {
        A[i][j] = parseFloat(
          document.getElementById("a" + (i + 1) + "" + (j + 1)).value
        );
      }
      B.push(parseFloat(document.getElementById("b" + (i + 1)).value));
    }

    if (A[0][0] === 0) {
      //pivoting
      var tempRow = JSON.parse(JSON.stringify(A[0]));
      var tempColumn = B[0];
      A[0] = A[1];
      A[1] = tempRow;
      B[0] = B[1];
      B[1] = tempColumn;
    }
    //Forward eliminated
    for (var k = 0; k < matrixSize["rows"]; k++) {
      for (var i = k + 1; i < matrixSize["rows"]; i++) {
        var factor = A[i][k] / A[k][k];
        for (var j = k; j < matrixSize["rows"]; j++) {
          A[i][j] = A[i][j] - factor * A[k][j];
        }
        B[i] = B[i] - factor * B[k];
      }
    }
    //Backward Substitution
    X = new Array(matrixSize["rows"]);
    X[matrixSize["rows"] - 1] = Math.round(
      B[matrixSize["rows"] - 1] /
        A[matrixSize["rows"] - 1][matrixSize["rows"] - 1]
    ); //find Xn
    for (i = matrixSize["rows"] - 2; i >= 0; i--) {
      //find Xn-1 to X1
      var sum = B[i];
      for (j = i + 1; j < matrixSize["rows"]; j++) {
        sum = sum - A[i][j] * X[j];
      }
      X[i] = Math.round(sum / A[i][i]);
    }
    for (i = 0; i < matrixSize["rows"]; i++) {
      result.push("x" + (i + 1) + " = " + X[i]);
      result.push(<br />);
    }

    setMatrixRes(result);
  }

  function createMatrix() {
    for (var i = 1; i <= matrixSize["rows"]; i++) {
      for (var j = 1; j <= matrixSize["columns"]; j++) {
        matrix.push(
          <Input
            style={{
              width: "10%",
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
            width: "10%",
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
    <div style={{ background: "#FFFF",textAlign: "center", padding: "30px" }}>
      <h2 style={{ color: "black", fontWeight: "bold" }}>
        Gauss Elimination Method
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

export default Gauss_eliminate;
