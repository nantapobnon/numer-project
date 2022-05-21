import React, { useState } from "react";
import { Card, Input, Button } from "antd";
import "antd/dist/antd.css";
import { compile, derivative } from "mathjs";

const InputStyle = {
  width: "300px",
  background: "white",
  color: "black",
  fontWeight: "bold",
  fontSize: "24px",
};

const func = (fx, X) => {
  var expr = compile(fx); // f(x)
  let scope = { x: parseFloat(X) }; //f(x) ; x=input
  return expr.evaluate(scope);
};

const funcDiffDegreeN = (fx, X, degree) => {
  var temp = fx,
    expr;
  for (var i = 1; i <= degree; i++) {
    temp = derivative(temp, "x");
    expr = temp;
  }

  let scope = { x: parseFloat(X) };
  return expr.evaluate(scope);
};

function Forwardh() {
  var y;
  const [fx, setFx] = useState("");
  const [x, setX] = useState(0);
  const [h, setH] = useState(0);
  const [degree, setDegree] = useState(1);
  const [output, setOutput] = useState(null);
  const [exact, setExact] = useState(null);
  const [err, setErr] = useState(null);

  function cal() {
    console.log(degree);
    console.log(fx);
    console.log(h);
    console.log(x);
    switch (degree) {
      case 1:
        y = (func(fx, x + 1 * h) - func(fx, x)) / h;
        console.log("case");
        break;
      case 2:
        y =
          (func(fx, x + 2 * h) - 2 * func(fx, x + 1 * h) + func(fx, x)) /
          Math.pow(h, 2);
        break;
      case 3:
        y =
          (func(fx, x + 3 * h) -
            3 * func(fx, x + 2 * h) +
            3 * func(fx, x + 1 * h) -
            func(fx, x)) /
          Math.pow(h, 3);
        break;
      default:
        y =
          (func(fx, x + 4 * h) -
            4 * func(fx, x + 3 * h) +
            6 * func(fx, x + 2 * h) -
            4 * func(fx, x + 1 * h) +
            func(fx, x)) /
          Math.pow(h, 4);
    }
    setExact(funcDiffDegreeN(fx, x, degree).toFixed(6));
    setErr(
      (Math.abs((y - funcDiffDegreeN(fx, x, degree)) / y) * 100).toFixed(2)
    );
    setOutput(y.toFixed(6));
  }

  return (
    <div style={{ background: "#FFFF",textAlign: "center", padding: "30px" }}>
      <h2 style={{ color: "black", fontWeight: "bold" }}>
        forward divided-difference O(h)
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
              width: "50%",
              color: "#FFFFFFFF",
              borderRadius: "10px",
              padding: "16px",
            }}
          >
            <div>
              <h3>f(x)</h3>
              <Input
                size="large"
                style={InputStyle}
                onChange={(e) => {
                  setFx(e.target.value);
                }}
              ></Input>
            </div>
            <br />
            <div>
              <h3>Degree</h3>
              <Input
                size="large"
                type="number"
                style={InputStyle}
                value={degree}
                defaultValue={degree}
                onChange={(e) => {
                  const d = parseInt(e.target.value);
                  if (1 <= d && d <= 4) {
                    setDegree(parseFloat(d));
                  }
                }}
              ></Input>
            </div>
            <br />
            <div>
              <h3>X</h3>
              <Input
                size="large"
                style={InputStyle}
                onChange={(e) => {
                  setX(parseFloat(e.target.value));
                }}
              ></Input>
            </div>
            <br />
            <div>
              <h3>H</h3>
              <Input
                size="large"
                style={InputStyle}
                onChange={(e) => {
                  setH(parseFloat(e.target.value));
                }}
              ></Input>
            </div>

            <br />
            <Button onClick={cal}>Enter</Button>
            {output && (
              <div>
                <br />
                <br />
                <h2 style={{ color: "white", fontWeight: "bold" }}>
                  {"Result = " + output}
                </h2>
                <br />
                <h2 style={{ color: "white", fontWeight: "bold" }}>
                  {"Exact = " + exact}
                </h2>
                <br />
                <h2 style={{ color: "white", fontWeight: "bold" }}>
                  {"Error = " + err + "%"}
                </h2>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Forwardh;
