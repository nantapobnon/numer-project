// import React, { useState, useEffect, Component, Fragment } from "react";
// import { Card, Input, Button, Table } from "antd";
// import "antd/dist/antd.css";
// const InputStyle = {
//   width: "100px",
//   background: "white",
//   color: "black",
//   fontWeight: "bold",
//   fontSize: "24px",
// };

// function Spline() {
//   const [matrixSize, setMatrixSize] = useState({
//     rows: 2,
//     columns: 2,
//   });
//   const [matrixXY, setMatrixXY] = useState(null);
//   const [matrixPoint, setMatrixPoint] = useState(null);
//   const [pointNum, setPointNum] = useState(2);
//   const [target, setTarget] = useState(null);
//   const [output, setOutput] = useState(null);
//   var matrix = [];
//   var matrixP = [];
//   var x = [];
//   var y = [];
//   var fx;
//   var point = [];
//   var columns = [
//     {
//       title: "No.",
//       dataIndex: "no",
//       key: "no",
//     },
//     {
//       title: "X",
//       dataIndex: "x",
//       key: "x",
//     },
//     {
//       title: "Y",
//       dataIndex: "y",
//       key: "y",
//     },
//   ];

//   function L(X, index, n) {
//     var numerate = 1 /*ตัวเศษ*/,
//       denominate = 1; /*ตัวส่วน*/
//     for (var i = 1; i <= n; i++) {
//       if (i !== index) {
//         numerate *= x[i] - X;
//         denominate *= x[i] - x[index];
//       }
//     }
//     console.log(numerate / denominate);
//     return parseFloat(numerate / denominate);
//   }

//   function calc() {
//     x = [];
//     y = [];
//     for (var i = 1; i <= matrixSize["rows"]; i++) {
//       x[i] = parseFloat(document.getElementById("x" + i).value);
//       y[i] = parseFloat(document.getElementById("y" + i).value);
//     }
//     // for (i = 1; i <= pointNum; i++) {
//     //   point[i] = parseInt(document.getElementById("p" + i).value);
//     // }

//     var ks = x.map(function () {
//       return 0;
//     });
//     ks = getNaturalKs(x, y, ks);
//     var i = 1;
//     while (x[i] < target) i++;
//     var t = (target - x[i - 1]) / (x[i] - x[i - 1]);
//     var a = ks[i - 1] * (x[i] - x[i - 1]) - (y[i] - y[i - 1]);
//     var b = -ks[i] * (x[i] - x[i - 1]) + (y[i] - y[i - 1]);
//     var q = (1 - t) * y[i - 1] + t * y[i] + t * (1 - t) * (a * (1 - t) + b * t);

//     setOutput(q);
//   }

//   function zerosMat(r, c) {
//     var A = [];
//     for (var i = 0; i < r; i++) {
//       A.push([]);
//       for (var j = 0; j < c; j++) A[i].push(0);
//     }
//     return A;
//   }

//   function getNaturalKs(xs, ys, ks) {
//     var n = xs.length - 1;
//     var A = zerosMat(n + 1, n + 2);

//     for (
//       var i = 1;
//       i < n;
//       i++ // rows
//     ) {
//       A[i][i - 1] = 1 / (xs[i] - xs[i - 1]);
//       A[i][i] = 2 * (1 / (xs[i] - xs[i - 1]) + 1 / (xs[i + 1] - xs[i]));
//       A[i][i + 1] = 1 / (xs[i + 1] - xs[i]);
//       A[i][n + 1] =
//         3 *
//         ((ys[i] - ys[i - 1]) / ((xs[i] - xs[i - 1]) * (xs[i] - xs[i - 1])) +
//           (ys[i + 1] - ys[i]) / ((xs[i + 1] - xs[i]) * (xs[i + 1] - xs[i])));
//     }

//     A[0][0] = 2 / (xs[1] - xs[0]);
//     A[0][1] = 1 / (xs[1] - xs[0]);
//     A[0][n + 1] = (3 * (ys[1] - ys[0])) / ((xs[1] - xs[0]) * (xs[1] - xs[0]));

//     A[n][n - 1] = 1 / (xs[n] - xs[n - 1]);
//     A[n][n] = 2 / (xs[n] - xs[n - 1]);
//     A[n][n + 1] =
//       (3 * (ys[n] - ys[n - 1])) / ((xs[n] - xs[n - 1]) * (xs[n] - xs[n - 1]));

//     return solve(A, ks);
//   }

//   function swapRows(m, k, l) {
//     var p = m[k];
//     m[k] = m[l];
//     m[l] = p;
//   }

//   function solve(A, ks) {
//     var m = A.length;
//     for (
//       var k = 0;
//       k < m;
//       k++ // column
//     ) {
//       // pivot for column
//       var i_max = 0;
//       var vali = Number.NEGATIVE_INFINITY;
//       for (var i = k; i < m; i++)
//         if (A[i][k] > vali) {
//           i_max = i;
//           vali = A[i][k];
//         }
//       swapRows(A, k, i_max);

//       // for all rows below pivot
//       for (i = k + 1; i < m; i++) {
//         for (var j = k + 1; j < m + 1; j++)
//           A[i][j] = A[i][j] - A[k][j] * (A[i][k] / A[k][k]);
//         A[i][k] = 0;
//       }
//     }
//     for (
//       i = m - 1;
//       i >= 0;
//       i-- // rows = columns
//     ) {
//       var v = A[i][m] / A[i][i];
//       ks[i] = v;
//       for (
//         j = i - 1;
//         j >= 0;
//         j-- // rows
//       ) {
//         A[j][m] -= A[j][i] * v;
//         A[j][i] = 0;
//       }
//     }
//     console.log(A);
//     return ks;
//   }

//   function createMatrix() {
//     for (var i = 1; i <= matrixSize["rows"]; i++) {
//       x.push(
//         <Input
//           style={{
//             width: "100%",
//             height: "50%",
//             backgroundColor: "white",
//             marginInlineEnd: "5%",
//             marginBlockEnd: "5%",
//             color: "black",
//             fontSize: "18px",
//             fontWeight: "bold",
//           }}
//           id={"x" + i}
//           key={"x" + i}
//           placeholder={"x" + i}
//         />
//       );
//       y.push(
//         <Input
//           style={{
//             width: "100%",
//             height: "50%",
//             backgroundColor: "white",
//             marginInlineEnd: "5%",
//             marginBlockEnd: "5%",
//             color: "black",
//             fontSize: "18px",
//             fontWeight: "bold",
//           }}
//           id={"y" + i}
//           key={"y" + i}
//           placeholder={"y" + i}
//         />
//       );
//       matrix.push({
//         no: i,
//         x: x[i - 1],
//         y: y[i - 1],
//       });
//     }

//     for (var i = 1; i <= pointNum; i++) {
//       matrixP.push(
//         <Input
//           style={{
//             width: "14%",
//             height: "50%",
//             backgroundColor: "white",
//             marginInlineEnd: "5%",
//             marginBlockEnd: "5%",
//             color: "black",
//             fontSize: "18px",
//             fontWeight: "bold",
//           }}
//           id={"p" + i}
//           key={"p" + i}
//           placeholder={"p" + i}
//         />
//       );
//     }

//     setMatrixXY(matrix);
//     setMatrixPoint(matrixP);
//   }

//   return (
//     <div style={{ background: "#FFFF", padding: "30px" }}>
//       <h2 style={{ color: "black", fontWeight: "bold" }}>Spline</h2>
//       <div className="row">
//         <div
//           className="col"
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <Card
//             style={{
//               background: "rgb(75, 75, 168)",
//               width: "70%",
//               color: "#FFFFFFFF",
//               borderRadius: "10px",
//               padding: "16px",
//             }}
//           >
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//               }}
//             >
//               <div>
//                 <h3>Matrix size</h3>
//                 <Input
//                   size="large"
//                   type="number"
//                   name="XR"
//                   style={InputStyle}
//                   value={matrixSize["rows"]}
//                   defaultValue={matrixSize["rows"]}
//                   onChange={(e) => {
//                     const rows = parseInt(e.target.value);
//                     // if we only want matrix of size between 2 and 8
//                     if (2 <= rows && rows <= 10) {
//                       setMatrixSize((prevSize) => ({
//                         ...prevSize,
//                         rows: rows,
//                         columns: rows,
//                       }));
//                     }
//                   }}
//                 ></Input>
//               </div>
//               <div style={{ width: "80px" }}></div>
//               {/* <div>
//                 <h3>Points(n)</h3>
//                 <Input
//                   size="large"
//                   name="points"
//                   type="number"
//                   value={pointNum}
//                   defaultValue={pointNum}
//                   style={InputStyle}
//                   onChange={(e) => {
//                     if (2 <= e.target.value && e.target.value <= 10) {
//                       setPointNum(e.target.value);
//                     }
//                     //setPointNum(e.target.value);
//                   }}
//                 ></Input>
//               </div> */}
//               <div style={{ width: "80px" }}></div>
//               <div>
//                 <h3>X</h3>
//                 <Input
//                   size="large"
//                   name="X"
//                   value={target}
//                   style={{
//                     width: "200px",
//                     background: "white",
//                     color: "black",
//                     fontWeight: "bold",
//                     fontSize: "24px",
//                   }}
//                   onChange={(e) => {
//                     setTarget(e.target.value);
//                   }}
//                 ></Input>
//               </div>
//             </div>

//             <br />
//             <br />
//             <Button onClick={createMatrix}>Set Matrix</Button>
//             {matrixXY && (
//               <div style={{}}>
//                 <br />
//                 <br />
//                 <div
//                   style={{
//                     width: "50%",
//                     margin: "0 auto",
//                   }}
//                 >
//                   <h2>Input MatrixXY</h2>
//                   {/* <br /> */}
//                   <Table
//                     columns={columns}
//                     dataSource={matrixXY}
//                     pagination={false}
//                     bordered={true}
//                     bodyStyle={{
//                       fontWeight: "bold",
//                       fontSize: "18px",
//                       color: "white",
//                       overflowY: "scroll",
//                       minWidth: 120,
//                       maxHeight: 300,
//                     }}
//                   ></Table>
//                 </div>
//                 <br />
//                 {/* <h2>Input Point</h2>
//                 <br />
//                 {matrixPoint}
//                 <br /> */}
//                 <Button onClick={calc}>Enter</Button>
//               </div>
//             )}
//             {output && (
//               <div>
//                 <br />
//                 <br />
//                 <h2>Result</h2>
//                 <br />
//                 <h2 style={{ color: "white", fontWeight: "bold" }}>
//                   {"X(" + target + ") = " + output}
//                 </h2>
//               </div>
//             )}
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Spline;

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
var x = [],
  y = [],
  tableTag = [],
  answer;

class Spline extends Component {
  constructor() {
    super();
    this.state = {
      nPoints: 0,
      X: 0,
      showInputForm: true,
      showTableInput: false,
      showOutputCard: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  createTableInput(n) {
    for (var i = 1; i <= n; i++) {
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
      tableTag.push({
        no: i,
        x: x[i - 1],
        y: y[i - 1],
      });
    }

    this.setState({
      showInputForm: false,
      showTableInput: true,
    });
  }
  initialValue(X) {
    x = [];
    y = [];
    for (var i = 0; i < this.state.nPoints; i++) {
      x[i] = parseFloat(document.getElementById("x" + (i + 1)).value);
      y[i] = parseFloat(document.getElementById("y" + (i + 1)).value);
    }
    answer = this.spline(X, x, y);
  }
  spline(x, xs, ys) {
    var ks = xs.map(function () {
      return 0;
    });
    ks = this.getNaturalKs(xs, ys, ks);
    var i = 1;
    while (xs[i] < x) i++;
    var t = (x - xs[i - 1]) / (xs[i] - xs[i - 1]);
    var a = ks[i - 1] * (xs[i] - xs[i - 1]) - (ys[i] - ys[i - 1]);
    var b = -ks[i] * (xs[i] - xs[i - 1]) + (ys[i] - ys[i - 1]);
    var q =
      (1 - t) * ys[i - 1] + t * ys[i] + t * (1 - t) * (a * (1 - t) + b * t);
    console.log(q);
    this.setState({
      showOutputCard: true,
    });

    return q;
  }

  getNaturalKs(xs, ys, ks) {
    var n = xs.length - 1;
    var A = this.zerosMat(n + 1, n + 2);

    for (
      var i = 1;
      i < n;
      i++ // rows
    ) {
      A[i][i - 1] = 1 / (xs[i] - xs[i - 1]);
      A[i][i] = 2 * (1 / (xs[i] - xs[i - 1]) + 1 / (xs[i + 1] - xs[i]));
      A[i][i + 1] = 1 / (xs[i + 1] - xs[i]);
      A[i][n + 1] =
        3 *
        ((ys[i] - ys[i - 1]) / ((xs[i] - xs[i - 1]) * (xs[i] - xs[i - 1])) +
          (ys[i + 1] - ys[i]) / ((xs[i + 1] - xs[i]) * (xs[i + 1] - xs[i])));
    }

    A[0][0] = 2 / (xs[1] - xs[0]);
    A[0][1] = 1 / (xs[1] - xs[0]);
    A[0][n + 1] = (3 * (ys[1] - ys[0])) / ((xs[1] - xs[0]) * (xs[1] - xs[0]));

    A[n][n - 1] = 1 / (xs[n] - xs[n - 1]);
    A[n][n] = 2 / (xs[n] - xs[n - 1]);
    A[n][n + 1] =
      (3 * (ys[n] - ys[n - 1])) / ((xs[n] - xs[n - 1]) * (xs[n] - xs[n - 1]));

    return this.solve(A, ks);
  }

  solve(A, ks) {
    var m = A.length;
    for (
      var k = 0;
      k < m;
      k++ // column
    ) {
      // pivot for column
      var i_max = 0;
      var vali = Number.NEGATIVE_INFINITY;
      for (var i = k; i < m; i++)
        if (A[i][k] > vali) {
          i_max = i;
          vali = A[i][k];
        }
      this.swapRows(A, k, i_max);

      // for all rows below pivot
      for (i = k + 1; i < m; i++) {
        for (var j = k + 1; j < m + 1; j++)
          A[i][j] = A[i][j] - A[k][j] * (A[i][k] / A[k][k]);
        A[i][k] = 0;
      }
    }
    for (
      i = m - 1;
      i >= 0;
      i-- // rows = columns
    ) {
      var v = A[i][m] / A[i][i];
      ks[i] = v;
      for (
        j = i - 1;
        j >= 0;
        j-- // rows
      ) {
        A[j][m] -= A[j][i] * v;
        A[j][i] = 0;
      }
    }
    console.log(A);
    return ks;
  }

  zerosMat(r, c) {
    var A = [];
    for (var i = 0; i < r; i++) {
      A.push([]);
      for (var j = 0; j < c; j++) A[i].push(0);
    }
    return A;
  }

  swapRows(m, k, l) {
    var p = m[k];
    m[k] = m[l];
    m[l] = p;
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  render() {
    return (
      <div style={{ background: "#FFFF",textAlign: "center", padding: "30px" }}>
        <h2 style={{ color: "black", fontWeight: "bold" }}>
          Spline Interpolation
        </h2>
        <div
          className="row"
          style={{
            display: "flex",
            justifyContent: "center",textAlign: "center",
            
          }}
        >
          
          <div
            className="col"
            style={{
              display: "flex",
            justifyContent: "center",
            }}
          >
            <Card
              bordered={true}
              style={{
                background: "rgb(75, 75, 168)",
                width: "70%",
                color: "#FFFFFFFF",
                borderRadius: "10px",
                padding: "16px",
              }}
              onChange={this.handleChange}
            >
              {this.state.showTableInput && (
                <div
                style={{
                  width: "50%",
                  margin: "0 auto",
                }}>
                  <Table
                    columns={columns}
                    dataSource={tableTag}
                    pagination={false}
                    bordered={true}
                    bodyStyle={{
                      fontWeight: "bold",
                      fontSize: "18px",
                      color: "white",
                      overflowY: "scroll",
                      minWidth: 80,
                      maxHeight: 300,
                    }}
                  ></Table>
                  <br />
                  <Button
                    id="matrix_button"
                  
                    onClick={() => this.initialValue(parseFloat(this.state.X))}
                  >
                    Enter
                  </Button>
                </div>
              )}

              {this.state.showInputForm && (
                <div>
                  <h2>Number of points(n)</h2>
                  <Input size="large" name="nPoints" style={InputStyle}></Input>
                  <h2>X</h2>
                  <Input size="large" name="X" style={InputStyle}></Input>
                  <br />
                  <br />
                  
                  <Button
                    id="dimention_button"
                    onClick={() => {
                      this.createTableInput(parseInt(this.state.nPoints));
                    }}
                  >
                    Enter
                  </Button>
                </div>
              )}
              {this.state.showOutputCard && (
              <div>
              <br />
              <h2>Result</h2>
              <br />
              <h2 style={{ color: "white", fontWeight: "bold" }}>{answer}</h2>
            </div>
            )}
            </Card>
          </div>
        </div>
      </div>
    );
  }
}
export default Spline;
