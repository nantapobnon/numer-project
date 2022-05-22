const express = require("express");
const cors = require("cors");

// Setup the express server
const app = express();
const port = 4000;

// Import middlewares into express
app.use(express.json({ limit: "100mb" }));
app.use(cors());

// Import routes
const authRouter = require("./routes/auth");
const messagesRouter = require("./routes/messages");
const rootOfEquationRouter = require("./routes/rootOfEquation");
const differentiationRouter = require("./routes/differentiation");
const integrationRouter = require("./routes/integration");
const linearRouter = require("./routes/linear");
const interpolationRouter = require("./routes/interpolation");
const { applyDependencies } = require("mathjs");

// Setup all the routes
app.use("/api/messages", messagesRouter);
app.use("/api/auth", authRouter);
app.use("/api/rootofequation", rootOfEquationRouter);
app.use("/api/differentiation", differentiationRouter);
app.use("/api/integration", integrationRouter);
app.use("/api/linear", linearRouter);
app.use("/api/interpolation", interpolationRouter);

// Start the server
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

//token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlcyI6WyJhZG1pbiIsImVkaXRvciIsInZpZXdlciJdLCJpYXQiOjE2NTMwNjY0MzUsImV4cCI6MTY4NDYyNDAzNX0.pTeysLdrdUWa0hHVznTfMbtjoxz-a8Ae1IirCyWKqOc