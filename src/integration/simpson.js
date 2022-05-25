import React, { useState } from "react";
import { Card, Input, Button } from "antd";
import "antd/dist/antd.css";
import { compile } from "mathjs";
import axios from "axios";
var Algebrite = require("algebrite");

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

const integrate = (fx, a, b) => {
  var expr = compile(Algebrite.integral(Algebrite.eval(fx)).toString());
  return expr.evaluate({ x: b }) - expr.evaluate({ x: a });
};

function Simpson() {
    var I;
  const [fx, setFx] = useState("");
  const [output, setOutput] = useState(null);
  const [exact, setExact] = useState(null);
  const [err, setErr] = useState(null);
  const [upper, setUpper] = useState(null);
  const [lower, setLower] = useState(null);
  const [n, setN] = useState(null);

  function cal() {
    var h = (upper - lower) / n;
    console.log(n)
    I = (h / 3) * (func(fx, lower) + func(fx, (lower+(h*n))) + (4 * summationFunction(1, n, h)) + (2 * summationFunction(2, n, h)))
    var temp = integrate(fx, lower, upper);
    setExact(temp.toFixed(6));
    setErr((Math.abs((temp - I) / temp) * 100).toFixed(2));
    setOutput(I.toFixed(6));
  }

  function summationFunction(start, n, h) {
    var sum = 0;
    var xi;
    if(start === 1){
        xi = parseInt(lower) + h;
        for (var i = 1; i < n; i += 2) {
            sum += func(fx, xi);
            xi += (h+h)
        }
    }
    else{
        xi = parseInt(lower) + h*2;
        for (i = 2; i < n-1; i += 2) {
            sum += func(fx, xi);
            xi += (h+h)
        }
    }
    //console.log(sum)
    return sum;
  }

  function callAPI() {
    const headers = {
      "x-auth-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlcyI6WyJhZG1pbiIsImVkaXRvciIsInZpZXdlciJdLCJpYXQiOjE2NTMwNjY0MzUsImV4cCI6MTY4NDYyNDAzNX0.pTeysLdrdUWa0hHVznTfMbtjoxz-a8Ae1IirCyWKqOc",
    };
    
    axios
      .get("http://localhost:4000/api/integration", { headers })
      .then((response) => {
        for (var i = 0; i < response.data.result.length; i++) {
          if (response.data.result[i].id === "compSimpson") {
            setFx(response.data.result[i].fx);
            setUpper(parseFloat(response.data.result[i].upper));
            setLower(parseFloat(response.data.result[i].lower));
            setN(parseFloat(response.data.result[i].n));
          }
        }
        
      });
      console.log(upper)
  }

  return (
    <div style={{ background: "#FFFF",textAlign: "center", padding: "30px" }}>
      <h2 style={{ color: "black", fontWeight: "bold" }}>
        Composite Simpson Rule
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
                data-testid="fx"
                value={fx}
                style={InputStyle}
                onChange={(e) => {
                  setFx(e.target.value);
                }}
              ></Input>
            </div>
            <br />
            <div>
              <h3>Upper Bound</h3>
              <Input
              data-testid="upper"
                size="large"
                value={upper}
                style={InputStyle}
                onChange={(e) => {
                  setUpper(parseFloat(e.target.value));
                }}
              ></Input>
            </div>
            <br />
            <div>
              <h3>Lower Bound</h3>
              <Input
              value={lower}
              data-testid="lower"
                size="large"
                style={InputStyle}
                onChange={(e) => {
                  setLower(parseFloat(e.target.value));
                }}
              ></Input>
            </div>
            <br />
            <div>
              <h3>N</h3>
              <Input
              value={n}
                size="large"
                data-testid="n"
                style={InputStyle}
                onChange={(e) => {
                  setN(parseFloat(e.target.value));
                }}
              ></Input>
            </div>
            <br />
            <br />
            <Button onClick={callAPI}>API</Button>
            <br />
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

export default Simpson;
