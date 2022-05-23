// import React, { Component } from "react";
// import { Card, Input, Button, Table } from "antd";
// import "antd/dist/antd.css";
// const InputStyle = {
//   width: "100px",
//   background: "white",
//   color: "black",
//   fontWeight: "bold",
//   fontSize: "24px",
// };

// var A = [],
//   B = [],
//   matrixA = [],
//   matrixB = [],
//   x,
//   epsilon,
//   output = [],
//   dataInTable = [],
//   count = 1,
//   matrixX = [];
// var columns = [
//   {
//     title: "Iteration",
//     dataIndex: "iteration",
//     key: "iteration",
//   },
// ];
// class Seidel extends Component {
//   constructor() {
//     super();
//     this.state = {
//       row: 0,
//       column: 0,
//       showDimentionForm: true,
//       showMatrixForm: false,
//       showOutputCard: false,
//     };
//     this.handleChange = this.handleChange.bind(this);
//     this.seidel = this.seidel.bind(this);
//   }

//   seidel(n) {
//     this.initMatrix();
//     x = new Array(n);
//     var xold;
//     epsilon = new Array(n);
//     do {
//       xold = JSON.parse(JSON.stringify(x));
//       for (var i = 0; i < n; i++) {
//         var sum = 0;
//         for (var j = 0; j < n; j++) {
//           if (i !== j) {
//             //else i == j That is a divide number
//             sum = sum + A[i][j] * x[j];
//           }
//         }
//         x[i] = (B[i] - sum) / A[i][i]; //update x[i]
//       }
//     } while (this.error(x, xold)); //if true , continue next iteration

//     for (i = 0; i < x.length; i++) {
//       output.push(x[i]);
//       output.push(<br />);
//     }
//     this.setState({
//       showOutputCard: true,
//     });
//   }

//   error(xnew, xold) {
//     for (var i = 0; i < xnew.length; i++) {
//       epsilon[i] = Math.abs((xnew[i] - xold[i]) / xnew[i]);
//     }
//     this.appendTable(x, epsilon);
//     for (i = 0; i < epsilon.length; i++) {
//       if (epsilon[i] > 0.000001) {
//         return true;
//       }
//     }
//     return false;
//   }

//   createMatrix(row, column) {
//     A = [];
//     B = [];
//     matrixA = [];
//     matrixB = [];
//     x = [];
//     dataInTable = [];
//     for (var i = 1; i <= row; i++) {
//       for (var j = 1; j <= column; j++) {
//         matrixA.push(
//           <Input
//             style={{
//               width: "10%",
//               height: "50%",
//               backgroundColor: "white",
//               marginInlineEnd: "5%",
//               marginBlockEnd: "5%",
//               color: "black",
//               fontSize: "18px",
//               fontWeight: "bold",
//             }}
//             id={"a" + i + "" + j}
//             key={"a" + i + "" + j}
//             placeholder={"a" + i + "" + j}
//           />
//         );
//       }
//       matrixA.push(<br />);
//       matrixB.push(
//         <Input
//           style={{
//             width: "10%",
//             height: "50%",
//             backgroundColor: "black",
//             marginInlineEnd: "5%",
//             marginBlockEnd: "5%",
//             color: "white",
//             fontSize: "18px",
//             fontWeight: "bold",
//           }}
//           id={"b" + i}
//           key={"b" + i}
//           placeholder={"b" + i}
//         />
//       );
//       matrixX.push(
//         <Input
//           style={{
//             width: "10%",
//             height: "50%",
//             backgroundColor: "black",
//             marginInlineEnd: "5%",
//             marginBlockEnd: "5%",
//             color: "white",
//             fontSize: "18px",
//             fontWeight: "bold",
//           }}
//           id={"x" + i}
//           key={"x" + i}
//           placeholder={"x" + i}
//         />
//       );
//     }

//     this.setState({
//       showDimentionForm: false,
//       showMatrixForm: true,
//     });
//   }

//   initMatrix() {
//     for (var i = 0; i < this.state.row; i++) {
//       A[i] = [];
//       for (var j = 0; j < this.state.column; j++) {
//         A[i][j] = parseFloat(
//           document.getElementById("a" + (i + 1) + "" + (j + 1)).value
//         );
//       }
//       B.push(parseFloat(document.getElementById("b" + (i + 1)).value));
//       x.push(parseFloat(document.getElementById("x" + (i + 1)).value));
//     }
//   }
//   initialSchema(n) {
//     for (var i = 1; i <= n; i++) {
//       columns.push({
//         title: "X" + i,
//         dataIndex: "x" + i,
//         key: "x" + i,
//       });
//     }
//     for (i = 1; i <= n; i++) {
//       columns.push({
//         title: "Error" + i,
//         dataIndex: "error" + i,
//         key: "error" + i,
//       });
//     }
//   }
//   appendTable(x, error) {
//     var tag = "";
//     tag += '{"iteration": ' + count++ + ",";
//     for (var i = 0; i < x.length; i++) {
//       tag +=
//         '"x' +
//         (i + 1) +
//         '": ' +
//         x[i].toFixed(8) +
//         ', "error' +
//         (i + 1) +
//         '": ' +
//         error[i].toFixed(8);
//       if (i !== x.length - 1) {
//         tag += ",";
//       }
//     }
//     tag += "}";
//     dataInTable.push(JSON.parse(tag));
//   }

//   handleChange(event) {
//     this.setState({
//       [event.target.name]: event.target.value,
//     });
//   }
//   render() {
//     return (
//       <div
//         style={{ background: "#FFFF", textAlign: "center", padding: "30px" }}
//       >
//         <h2 style={{ color: "black", fontWeight: "bold" }}>
//           Jacobi Iteration Method
//         </h2>
//         <div className="row">
//           <div
//             className="col"
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               textAlign: "center",
//             }}
//           >
//             <Card
//               bordered={true}
//               style={{
//                 background: "rgb(75, 75, 168)",
//                 textAlign: "center",
//                 width: "70%",
//                 borderRadius: "15px",
//                 color: "#FFFFFFFF",
//               }}
//               onChange={this.handleChange}
//             >
//               {this.state.showDimentionForm && (
//                 <div>
//                   <h2>Row</h2>
//                   <Input size="large" name="row" style={InputStyle}></Input>
//                   <h2>Column</h2>
//                   <Input size="large" name="column" style={InputStyle}></Input>
//                   <br />
//                   <br />
//                   <Button
//                     id="dimention_button"
//                     onClick={() => {
//                       this.createMatrix(this.state.row, this.state.column);
//                       this.initialSchema(this.state.row);
//                     }}
//                     style={{
//                       background: "#FFFFFFFF",
//                       color: "black",
//                     }}
//                   >
//                     Enter
//                   </Button>
//                 </div>
//               )}

//               {this.state.showMatrixForm && (
//                 <div>
//                   <h2>Matrix [A]</h2>
//                   <br />
//                   {matrixA}
//                   <h2>
//                     Vector [B]
//                     <br />
//                   </h2>
//                   {matrixB}
//                   <h2>
//                     Initial X<br />
//                   </h2>
//                   {matrixX}
//                   <br />
//                   <Button
//                     id="matrix_button"
//                     style={{
//                       background: "white",
//                       color: "black",
//                     }}
//                     onClick={() => this.seidel(parseInt(this.state.row))}
//                   >
//                     Enter
//                   </Button>
//                   <br />
//                   <br />
//                 </div>
//               )}
//               <div className="col">
//                 {this.state.showOutputCard && (
//                   <Table
//                     columns={columns}
//                     bordered
//                     dataSource={dataInTable}
//                     bodyStyle={{
//                       fontWeight: "bold",
//                       fontSize: "18px",
//                       color: "black",
//                       overflowX: "scroll",
//                       border: "2px solid white",
//                     }}
//                   ></Table>
//                 )}
//               </div>
//             </Card>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
// export default Seidel;

import React, { Component } from "react";
import { Card, Input, Button, Table } from "antd";
import "antd/dist/antd.css";
const InputStyle = {
  background: "#1890ff",
  color: "white",
  fontWeight: "bold",
  fontSize: "24px",
};

var A = [],
  B = [],
  matrixA = [],
  matrixB = [],
  x,
  epsilon,
  output = [],
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
class Seidel extends Component {
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
    this.seidel = this.seidel.bind(this);
  }

  seidel(n) {
    this.initMatrix();
    x = new Array(n);
    var xold;
    epsilon = new Array(n);
    do {
      xold = JSON.parse(JSON.stringify(x));
      for (var i = 0; i < n; i++) {
        var sum = 0;
        for (var j = 0; j < n; j++) {
          if (i !== j) {
            //else i == j That is a divide number
            sum = sum + A[i][j] * x[j];
          }
        }
        x[i] = (B[i] - sum) / A[i][i]; //update x[i]
      }
    } while (this.error(x, xold)); //if true , continue next iteration

    for (i = 0; i < x.length; i++) {
      output.push(x[i]);
      output.push(<br />);
    }
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
    matrixX = [];
    x = [];
    dataInTable = [];
    for (var i = 1; i <= row; i++) {
      for (var j = 1; j <= column; j++) {
        matrixA.push(
          <Input
            style={{
              width: "18%",
              height: "50%",
              backgroundColor: "#06d9a0",
              marginInlineEnd: "5%",
              marginBlockEnd: "5%",
              color: "white",
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
            width: "18%",
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
            width: "18%",
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
        x[i].toFixed(8) +
        ', "error' +
        (i + 1) +
        '": ' +
        error[i].toFixed(8);
      if (i !== x.length - 1) {
        tag += ",";
      }
    }
    tag += "}";
    dataInTable.push(JSON.stringify(tag));
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  render() {
    return (
      <div style={{ background: "#FFFF", padding: "30px" }}>
        <h2 style={{ color: "black", fontWeight: "bold" }}>
          Gauss-Seidel Iteration Method
        </h2>
        <div className="row">
          <div className="col">
            <Card
              bordered={true}
              style={{
                background: "gray",
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
                  <Button
                    id="dimention_button"
                    onClick={() => {
                      this.createMatrix(this.state.row, this.state.column);
                      this.initialSchema(this.state.row);
                    }}
                    style={{
                      background: "#4caf50",
                      color: "white",
                      fontSize: "20px",
                    }}
                  >
                    Submit
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
                  <Button
                    id="matrix_button"
                    style={{
                      background: "blue",
                      color: "white",
                      fontSize: "20px",
                    }}
                    onClick={() => this.seidel(parseInt(this.state.row))}
                  >
                    Submit
                  </Button>
                </div>
              )}
            </Card>
          </div>
          <div className="col">
            {this.state.showOutputCard && (
              <Card
                title={"Output"}
                bordered={true}
                style={{
                  width: "100%",
                  background: "#2196f3",
                  color: "#FFFFFFFF",
                }}
                id="outputCard"
              >
                <Table
                  columns={columns}
                  dataSource={dataInTable}
                  bordered={true}
                  bodyStyle={{
                    fontWeight: "bold",
                    fontSize: "18px",
                    color: "black",
                    overflowX: "scroll",
                  }}
                ></Table>
              </Card>
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default Seidel;

// import { Form, Button } from "react-bootstrap";
// import React, { useEffect, useState } from "react";
// import uuid from "react-uuid";
// import TeX from "@matejmazur/react-katex";
// // import "./LA_c.css";

// //* Gauss-Seidel iteration method

// const Seidal = () => {
//   const [MatrixSize, setMatrixSize] = useState(4);
//   const [Matrix, setMatrix] = useState(
//     <div className="descep">
//       <dd>
//         กดปุ่มด้านล่างเพื่อเพิ่มแมตริกซ์ (+ : เพิ่มแถว/คอลัมน์ , - :
//         ลบแถว/คอลัมน์)
//       </dd>
//     </div>
//   );
//   const [NumMatrix, setNumMatrix] = useState(null);
//   const [B, setB] = useState(null);
//   const [output, setOut] = useState(null);

//   const inputB = (event) => {
//     var temp = String(event.target.value);
//     temp = temp.toString().split(" ");
//     temp = temp.toString().split(",");
//     setB(temp);
//   };

//   useEffect(() => {
//     createMat();
//   }, [MatrixSize]);

//   function createMat() {
//     let matrix = new Array(MatrixSize);
//     for (let i = 0; i < MatrixSize; i++) {
//       matrix[i] = new Array(MatrixSize).fill(0);
//     }

//     if (MatrixSize >= 2 && MatrixSize <= 8) {
//       try {
//         setMatrix(
//           matrix.map((row, indexRow = 1) => {
//             return (
//               <div
//                 key={indexRow}
//                 style={{ display: "flex", justifyContent: "center" }}
//               >
//                 {row.map((indexColumn = 1) => {
//                   return (
//                     <input
//                       style={{ width: "10%" }}
//                       className="form-control"
//                       key={uuid()}
//                       type="text"
//                       defaultValue={0}
//                       name={indexRow + "," + indexColumn}
//                     />
//                   );
//                 })}
//               </div>
//             );
//           })
//         );
//       } catch (err) {
//         return matrix.map((row, indexRow = 1) => {
//           return (
//             <div key={indexRow} style={{ display: "flex", paddingLeft: "43%" }}>
//               {row.map((indexColumn = 1) => {
//                 return (
//                   <input
//                     style={{ width: "10%" }}
//                     className="form-control"
//                     key={uuid()}
//                     type="text"
//                     defaultValue={0}
//                     name={indexRow + "," + indexColumn}
//                   />
//                 );
//               })}
//             </div>
//           );
//         });
//       }
//     } else if (MatrixSize <= 1) {
//       setMatrix(
//         <div className="descep">
//           <dd>
//             กดปุ่มด้านล่างเพื่อเพิ่มแมตริกซ์ (+ : เพิ่มแถว/คอลัมน์ , - :
//             ลบแถว/คอลัมน์)
//           </dd>
//         </div>
//       );
//     }
//   }

//   const addSize = (event) => {
//     if (MatrixSize < 8) {
//       setMatrixSize(MatrixSize + 1);
//     }
//   };

//   const minusSize = (event) => {
//     if (MatrixSize > 1) {
//       setMatrixSize(MatrixSize - 1);
//     }
//   };

//   const handleMatrix = (event) => {
//     event.preventDefault();
//     let count = 0;
//     var matrix = new Array(MatrixSize);
//     for (let i = 0; i < MatrixSize; i++) {
//       matrix[i] = new Array(MatrixSize);
//       for (let j = 0; j < MatrixSize; j++) {
//         //? If the floating point number cannot be parsed, we set 0 for this value
//         matrix[i][j] = !isNaN(parseFloat(event.target[count].value))
//           ? parseFloat(event.target[count].value)
//           : 0;
//         count += 1;
//       }
//     }
//     setNumMatrix(matrix);

//     // console.table(NumMatrix);
//   };

//   const renderMatrix = (matrix) => {
//     return (
//       "\\begin{pmatrix}\n" +
//       matrix
//         .map((row, index) => {
//           if (index === matrix.length) return row.join(" & ") + "\n";
//           else return row.join(" & ") + "\\\\\n";
//         })
//         .join("") +
//       "\\end{pmatrix}"
//     );
//   };

//   const renderVector = (vector) => {
//     try {
//       return (
//         "\\begin{pmatrix}\n" +
//         vector
//           .map((row) => {
//             return row.toFixed(6) + "\\\\";
//           })
//           .join("") +
//         "\\end{pmatrix}"
//       );
//     } catch (error) {
//       window.alert("Have Error!");
//     }
//   };

//   //!----------------------------Calculate Module---------------------------------

//   const Seidal_M = () => {
//     const E = 0.001 * (1.0 / 100.0);

//     //*------------------------Function-------------------------------

//     var f = (b, a, x, m) => {
//       let xk_new = 0;
//       let ax = 0;
//       var temp;
//       var aii = 0;
//       for (let j = 0; j < a[0].length; j++) {
//         if (j != m) {
//           temp = "x" + j;
//           ax += a[m][j] * x[temp];
//         } else {
//           aii = a[m][j];
//         }
//       }
//       xk_new = (b[m] - ax) / aii;
//       return xk_new;
//     };

//     let check = (XK, Xi) => {
//       return Math.abs((XK - Xi) / XK);
//     };

//     let check_all = (XK_arr, Xi_arr) => {
//       var stat;
//       var temp;
//       for (let i = 0; i < XK_arr.length; i++) {
//         temp = "x" + i;
//         stat = check(XK_arr[i], Xi_arr[temp]) < E;
//         if (stat == false) {
//           break;
//         }
//       }
//       return stat;
//     };

//     //*------------------------Function-------------------------------

//     var X = {};

//     for (let i = 0; i < B.length; i++) {
//       X["x" + i] = 0;
//     }

//     let b = B.map((x) => Number(x));
//     var xk = new Array(B.length).fill(0);
//     var count = 0;
//     var temp = 0;
//     let copiedX = JSON.parse(JSON.stringify(X));

//     while (count <= 40) {
//       copiedX = JSON.parse(JSON.stringify(X));
//       for (let i = 0; i < xk.length; i++) {
//         xk[i] = f(b, NumMatrix, copiedX, i);
//         copiedX["x" + i] = xk[i];
//       }
//       count++;
//       if (check_all(xk, X) == true) {
//         console.log("check");
//         break;
//       } else {
//         for (let i = 0; i < xk.length; i++) {
//           temp = "x" + i;
//           X[temp] = xk[i];
//         }
//       }
//     }

//     console.log("finished");

//     var X_out = Object.keys(X).map(function (key) {
//       return X[key];
//     });

//   //   setOut(
//   //     <div className="OutputText" id="myout">
//   //       <h1> Summary : </h1>
//   //       <p>
//   //         <b style={{ fontSize: 22 }}>
//   //           {" "}
//   //           <TeX math="Vector_B" /> :{" "}
//   //         </b>{" "}
//   //         &#40; {B.join(",")} &#41;
//   //       </p>
//   //       <p>
//   //         <b style={{ fontSize: 22 }}>
//   //           {" "}
//   //           <TeX math="Array_X" /> :{" "}
//   //         </b>{" "}
//   //         <TeX math={"A = " + renderMatrix(NumMatrix)} />
//   //       </p>
//   //       <p style={{ borderTop: "2px solid #dedede" }}>
//   //         {" "}
//   //         <b style={{ fontSize: 30 }}> Answer : </b>
//   //       </p>
//   //       <p>
//   //         {" "}
//   //         <b style={{ fontSize: 22, textIndent: 15 }}>
//   //           {" "}
//   //           Number of Equation :{" "}
//   //         </b>{" "}
//   //         {count}{" "}
//   //       </p>
//   //       <p>
//   //         <b style={{ fontSize: 22, textIndent: 15 }}>
//   //           {" "}
//   //           <TeX math="Vector_X" /> :{" "}
//   //         </b>{" "}
//   //         <TeX math={"X = " + renderVector(X_out)} />
//   //       </p>
//   //     </div>
//   //   );
//   // };

//   setOut(
//     <div className="OutputText" id="myout">
//       <h1> Summary : </h1>
//       <p>
//         <b style={{ fontSize: 22 }}>
//           {" "}
//           <TeX math="Vector_B" /> :{" "}
//         </b>{" "}
//         &#40; {B.join(",")} &#41;
//       </p>
//       <p>
//         <b style={{ fontSize: 22 }}>
//           {" "}
//           <TeX math="Array_X" /> :{" "}
//         </b>{" "}
//         <TeX math={"A = " + renderMatrix(NumMatrix)} />
//       </p>
//       <p style={{ borderTop: "2px solid #dedede" }}>
//         {" "}
//         <b style={{ fontSize: 30 }}> Answer : </b>
//       </p>
//       <p>
//         {" "}
//         <b style={{ fontSize: 22, textIndent: 15 }}>
//           {" "}
//           Number of Equation :{" "}
//         </b>{" "}
//         {count}{" "}
//       </p>
//       <p>
//         <b style={{ fontSize: 22, textIndent: 15 }}>
//           {" "}
//           <TeX math="Vector_X" /> :{" "}
//         </b>{" "}
//         <TeX math={"X = " + renderVector(X_out)} />
//       </p>
//     </div>
//   );
// };

//   //!----------------------------Calculate Module---------------------------------

//   //! X ไม่เท่ากับ x , X ใหญ่คือ Array ค่า x คำตอบ , x เล็ก คือ arrayที่ดึง x มาคำนวณชั่วคราวเฉพาะบางตัว ห้ามสลับกันเด็ดขาด !!!

//   const confirm_Num = (event) => {
//     event.preventDefault();
//     Seidal_M();
//     setB([]);
//   };

//   return (
//     <div>
//       <h1 className="myheader">Gauss-Seidel iteration Method</h1>
//       <Form onSubmit={handleMatrix}>
//         <h1 style={{ textIndent: "15%" }}>
//           {" "}
//           <b style={{ fontSize: 30 }}> Matrix Input : </b>
//         </h1>
//         {Matrix}
//         <div style={{ display: "flex", justifyContent: "center" }}>
//           <Button
//             variant="success"
//             style={{ marginTop: "2rem", marginInlineEnd: "41px" }}
//             type="submit"
//           >
//             Confirm
//           </Button>
//           <Button
//             style={{
//               marginTop: "2rem",
//               marginInlineStart: 0,
//               marginInlineEnd: "41px",
//             }}
//             onClick={addSize}
//           >
//             {" "}
//             +{" "}
//           </Button>
//           <Button
//             style={{
//               marginTop: "2rem",
//               marginInlineStart: 0,
//               marginInlineEnd: "41px",
//             }}
//             onClick={minusSize}
//           >
//             {" "}
//             -{" "}
//           </Button>
//           <Button
//             variant="secondary"
//             style={{ marginTop: "2rem", marginInlineStart: 0 }}
//             onClick={createMat}
//           >
//             Clear
//           </Button>{" "}
//         </div>
//       </Form>

//       <br />

//       <Form onSubmit={confirm_Num} className="myform">
//         <Form.Group>
//           <Form.Label style={{ textIndent: 0, fontFamily: "FCRoundBold" }}>
//             ค่าข้อมูล B
//           </Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="ใส่ชุดตัวเลข"
//             aria-describedby="texthelp1"
//             onChange={inputB}
//             value={B}
//           />
//           <Form.Text
//             id="texthelp1"
//             muted
//             style={{ fontSize: 15, color: "silver" }}
//           >
//             ค่าข้อมูลต้องเป็นชุดตัวเลขเท่านั้น. (จำนวนไม่เกินจำนวนแถวของ Matrix)
//           </Form.Text>
//         </Form.Group>

//         <br />

//         <div>
//           <Button variant="primary" size="lg" type="summit" className="btn">
//             {" "}
//             ยืนยัน{" "}
//           </Button>{" "}
//         </div>

//         <br />

//         <div id="myout">{output}</div>
//       </Form>
//     </div>
//   );
// };

// export default Seidal;

// /*
// console.log("Number of Iteration : " + count);
// console.log("x1 = " + xk1.toFixed(6));
// console.log("x2 = " + xk2.toFixed(6));
// console.log("x3 = " + xk3.toFixed(6));
// console.log("x4 = " + xk4.toFixed(6));
// */

