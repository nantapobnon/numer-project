import React, { Component } from "react";
import { Card, Input, Button, Table } from "antd";
import "antd/dist/antd.css";
const InputStyle = {
  width: "100px",
  background: "white",
  color: "black",
  fontWeight: "bold",
  fontSize: "24px",
};

var A = [],
  B = [],
  matrixA = [],
  matrixB = [],
  x,
  epsilon,
  dataInTable = [],
  count = 1,
  matrixX = [];
var columns = [
  {
    title: "Iteration",
    dataIndex: "iteration",
    key: "iteration",
  },
];
class Jacobi extends Component {
  constructor() {
    super();
    this.state = {
      row: 0,
      column: 0,
      showDimentionForm: true,
      showMatrixForm: false,
      showOutputCard: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.jacobi = this.jacobi.bind(this);
  }

  jacobi(n) {
    this.initMatrix();
    var temp;
    var xold;
    epsilon = new Array(n);
    do {
      temp = [];
      xold = JSON.parse(JSON.stringify(x));
      for (var i = 0; i < n; i++) {
        var sum = 0;
        for (var j = 0; j < n; j++) {
          if (i !== j) {
            //else i == j That is a divide number
            sum = sum + A[i][j] * x[j];
          }
        }
        temp[i] = (B[i] - sum) / A[i][i]; //update x[i]
      }
      x = JSON.parse(JSON.stringify(temp));
    } while (this.error(x, xold)); //if true , continue next iteration

    this.setState({
      showOutputCard: true,
    });
  }
  error(xnew, xold) {
    for (var i = 0; i < xnew.length; i++) {
      epsilon[i] = Math.abs((xnew[i] - xold[i]) / xnew[i]);
    }
    this.appendTable(x, epsilon);
    for (i = 0; i < epsilon.length; i++) {
      if (epsilon[i] > 0.000001) {
        return true;
      }
    }
    return false;
  }
  createMatrix(row, column) {
    A = [];
    B = [];
    matrixA = [];
    matrixB = [];
    x = [];
    dataInTable = [];
    for (var i = 1; i <= row; i++) {
      for (var j = 1; j <= column; j++) {
        matrixA.push(
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
      matrixA.push(<br />);
      matrixB.push(
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
      matrixX.push(
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
          id={"x" + i}
          key={"x" + i}
          placeholder={"x" + i}
        />
      );
    }

    this.setState({
      showDimentionForm: false,
      showMatrixForm: true,
    });
  }
  initMatrix() {
    for (var i = 0; i < this.state.row; i++) {
      A[i] = [];
      for (var j = 0; j < this.state.column; j++) {
        A[i][j] = parseFloat(
          document.getElementById("a" + (i + 1) + "" + (j + 1)).value
        );
      }
      B.push(parseFloat(document.getElementById("b" + (i + 1)).value));
      x.push(parseFloat(document.getElementById("x" + (i + 1)).value));
    }
  }
  initialSchema(n) {
    for (var i = 1; i <= n; i++) {
      columns.push({
        title: "X" + i,
        dataIndex: "x" + i,
        key: "x" + i,
      });
    }
    for (i = 1; i <= n; i++) {
      columns.push({
        title: "Error" + i,
        dataIndex: "error" + i,
        key: "error" + i,
      });
    }
  }
  appendTable(x, error) {
    var tag = "";
    tag += '{"iteration": ' + count++ + ",";
    for (var i = 0; i < x.length; i++) {
      tag +=
        '"x' +
        (i + 1) +
        '": ' +
        x[i].toFixed(6) +
        ', "error' +
        (i + 1) +
        '": ' +
        error[i].toFixed(6);
      if (i !== x.length - 1) {
        tag += ",";
      }
    }
    tag += "}";
    dataInTable.push(JSON.parse(tag));
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  render() {
    return (
      <div
        style={{ background: "#FFFF", textAlign: "center", padding: "30px" }}
      >
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
              textAlign: "center",
            }}
          >
            <Card
              bordered={true}
              style={{
                background: "rgb(75, 75, 168)",
                textAlign: "center",
                width: "70%",
                borderRadius: "15px",
                color: "#FFFFFFFF",
              }}
              onChange={this.handleChange}
            >
              {this.state.showDimentionForm && (
                <div>
                  <h2>Row</h2>
                  <Input size="large" name="row" style={InputStyle}></Input>
                  <h2>Column</h2>
                  <Input size="large" name="column" style={InputStyle}></Input>
                  <br />
                  <br />
                  <Button
                    id="dimention_button"
                    onClick={() => {
                      this.createMatrix(this.state.row, this.state.column);
                      this.initialSchema(this.state.row);
                    }}
                    style={{
                      background: "#FFFFFFFF",
                      color: "black",
                    }}
                  >
                    Enter
                  </Button>
                </div>
              )}

              {this.state.showMatrixForm && (
                <div>
                  <h2>Matrix [A]</h2>
                  <br />
                  {matrixA}
                  <h2>
                    Vector [B]
                    <br />
                  </h2>
                  {matrixB}
                  <h2>
                    Initial X<br />
                  </h2>
                  {matrixX}
                  <br />
                  <Button
                    id="matrix_button"
                    style={{
                      background: "white",
                      color: "black",
                    }}
                    onClick={() => this.jacobi(parseInt(this.state.row))}
                  >
                    Enter
                  </Button>
                  <br />
                  <br />
                </div>
              )}
              <div className="col">
                {this.state.showOutputCard && (
                  <Table
                    columns={columns}
                    bordered
                    dataSource={dataInTable}
                    bodyStyle={{
                      fontWeight: "bold",
                      fontSize: "18px",
                      color: "black",
                      overflowX: "scroll",
                      border: "2px solid white",
                    }}
                  ></Table>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}
export default Jacobi;
