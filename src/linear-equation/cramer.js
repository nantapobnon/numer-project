import React, { useState } from "react";
import { Card, Input, Button } from "antd";
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

function Cramer() {
  const [matrixSize, setMatrixSize] = useState({
    rows: 2,
    columns: 2,
  });
  const [matrixA, setMatrixA] = useState(null);
  const [matrixRes, setMatrixRes] = useState(null);
  var matrix = [];
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

    var counter = 0;

    while (counter !== matrixSize["rows"]) {
      var transformMatrix = JSON.parse(JSON.stringify(A));
      for (i = 0; i < matrixSize["rows"]; i++) {
        for (j = 0; j < matrixSize["columns"]; j++) {
          if (j === counter) {
            transformMatrix[i][j] = B[i];
            break;
          }
        }
      }
      counter++;
      result.push(
        <h2>
          X<sub>{counter}</sub> =&nbsp;&nbsp;
          {/* {Math.round(det(transformMatrix)) / Math.round(det(A))} */}
          {det(transformMatrix) / det(A)}
        </h2>
      );
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


            for (i = 1; i <= row; i++) {
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
          }
        }
      });
  }

  return (
    <div style={{ background: "#FFFF", textAlign: "center", padding: "30px" }}>
      <h2 style={{ color: "black", fontWeight: "bold" }}>Cramer's rule</h2>
      <div className="row">
        <div
          className="col"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
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
                {matrixRes}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Cramer;
