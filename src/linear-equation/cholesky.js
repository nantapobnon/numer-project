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

function Cholesky() {
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

    var x = new Array(matrixSize["rows"]);
    var y = new Array(matrixSize["rows"]);

    if (matrixA[0][0] === 0) {
      for (var i = 0; i < matrixSize["rows"]; i++) {
        var temp = A[0][i];
        matrixA[0][i] = B[i][i];
        matrixB[0][i] = temp;
      }
    }
    var matrixL = new Array(matrixSize["rows"]);
    for (i = 0; i < matrixSize["rows"]; i++) {
      matrixL[i] = new Array(matrixSize["rows"]);
      for (var j = 0; j < matrixSize["rows"]; j++) {
        matrixL[i][j] = 0;
      }
      x[i] = 0;
      y[i] = 0;
    }
    matrixL[0][0] = Math.sqrt(matrixA[0][0]);
    for (var k = 1; k < matrixSize["rows"]; k++) {
      for (i = 0; i < k; i++) {
        var sum = 0;
        if (i !== 0) {
          for (j = 0; j < i; j++) {
            sum += matrixL[i][j] * matrixL[k][j];
            //console.log(sum);
          }
        }
        matrixL[k][i] = (matrixA[i][k] - sum) / matrixL[i][i]; //ได้ค่า L ที่ไม่ใช่แนวทะแยง
      }
      sum = 0;
      for (j = 0; j < k; j++) {
        sum += matrixL[k][j] * matrixL[k][j];
      }
      matrixL[k][k] = Math.sqrt(matrixA[k][k] - sum);
    }
    y[0] = matrixB[0] / matrixL[0][0];
    for (i = 1; i < matrixSize["rows"]; i++) {
      sum = 0;
      for (j = 0; j < i; j++) {
        sum += matrixL[i][j] * y[j];
      }
      y[i] = (matrixB[i] - sum) / matrixL[i][i];
    }

    x[matrixSize["rows"] - 1] =
      y[matrixSize["rows"] - 1] /
      matrixL[matrixSize["rows"] - 1][matrixSize["rows"] - 1];
    for (i = matrixSize["rows"] - 2; i >= 0; i--) {
      sum = 0;
      for (j = i + 1; j < matrixSize["rows"]; j++) {
        sum += matrixL[j][i] * x[j];
      }
      x[i] = (y[i] - sum) / matrixL[i][i];
    }

    setMatrixRes(x);
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
    }
    //set
    console.log(matrix);
    console.log(matrixSize["rows"]);
    setMatrixA(matrix);
    setMatrixB(matrixAns);
  }

  return (
    <div style={{ background: "#FFFF", padding: "30px",textAlign: "center", }}>
      <h2 style={{ color: "black", fontWeight: "bold" }}>
        Cholesky Decomposition Method
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

export default Cholesky;
