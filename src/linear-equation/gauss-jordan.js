import React, { useState, useEffect, Component, Fragment } from "react";
import { Card, Input, Button } from "antd";
import { compile } from "mathjs";
import { det } from "mathjs";
import "antd/dist/antd.css";
import axios from "axios";

const InputStyle = {
  width: "100px",
  background: "white",
  color: "black",
  fontWeight: "bold",
  fontSize: "24px",
};

function GaussJordan() {
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

    if (A[0][0] === 0) { //pivoting
        var tempRow = JSON.parse(JSON.stringify(A[0]));
        var tempColumn = B[0];
        A[0] = A[1];
        A[1] = tempRow;
        B[0] = B[1];
        B[1] = tempColumn;
    }
    //Forward eliminate
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
    for (k = matrixSize["rows"] - 1; k >= 0; k--) {
        for (i = k; i >= 0; i--) {

            if (i === k) {//Identity matrix
                factor = 1 / A[i][k];

                for (j = 0; j < matrixSize["rows"]; j++) {
                    A[i][j] = A[i][j] * factor;
                }
                B[i] = B[i] * factor;


            }
            else {
                factor = A[i][k] / A[k][k];
                for (j = 0; j < matrixSize["rows"]; j++) {
                    A[i][j] = A[i][j] - factor * A[k][j];
                }
                B[i] = B[i] - factor * B[k];
            }
        }
    }
    for (i = 0; i < matrixSize["rows"]; i++) {
        result.push("x" + (i + 1) + " = " + B[i]);
        result.push(<br />)
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

  function callAPI() {
    var temp
    var row
    var mat=[]
    const headers = {
      "x-auth-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlcyI6WyJhZG1pbiIsImVkaXRvciIsInZpZXdlciJdLCJpYXQiOjE2NTMwNjY0MzUsImV4cCI6MTY4NDYyNDAzNX0.pTeysLdrdUWa0hHVznTfMbtjoxz-a8Ae1IirCyWKqOc",
    };
    axios
      .get("http://localhost:4000/api/linear", { headers })
      .then((response) => {
        for (var i = 0; i < response.data.result.length; i++) {
          if (response.data.result[i].id === "cramer") {

            //var
            row = parseFloat(response.data.result[i].row);
            setMatrixSize((prevSize) => ({
              ...prevSize,
              rows: row,
              columns: row,
            }));
            
            mat.push(response.data.result[i].stRow.split(","));
            mat.push(response.data.result[i].ndRow.split(","));
            mat.push(response.data.result[i].rdRow.split(","));

            temp = response.data.result[i].b.split(",")
            // .map((doc) => {
            //   return parseFloat(doc);
            // });


            for (var i = 1; i <= row; i++) {
              for (var j = 1; j <= row; j++) {
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
                    value={mat[i-1][j-1]}
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
                  value={temp[i-1]}
                  id={"b" + i}
                  key={"b" + i}
                  placeholder={"b" + i}
                />
              );
              matrix.push(<br />);
              //matrixAns.push(<br />);
            }
            setMatrixA(matrix);
            setMatrixB(matrixAns);
          }
        }
      });
  }

  

  return (
    <div style={{ background: "#FFFF",textAlign: "center", padding: "30px" }}>
      <h2 style={{ color: "black", fontWeight: "bold" }}>
        Gauss-Jordan Method
      </h2>
      <div className="row">
        <div
          className="col"
          style={{
            display: "flex",
            justifyContent: "center",textAlign: "center",
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
            <Button onClick={callAPI}>API</Button>
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

export default GaussJordan;
