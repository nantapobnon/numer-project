const express = require("express");
const cors = require("cors");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

// Setup the express server
const app = express();
const port = 4000;

app.use(express.json({ limit: "100mb" }));
app.use(cors());

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Numerical Method Project API",
      version: "3.0.0"
    }
  },
  apis: ["server.js"],

};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));


// Import routes
const authRouter = require("./routes/auth");
const rootOfEquationRouter = require("./routes/rootOfEquation");
const differentiationRouter = require("./routes/differentiation");
const integrationRouter = require("./routes/integration");
const linearRouter = require("./routes/linear");
const interpolationRouter = require("./routes/interpolation");

// Setup all the routes\



/**
 * @swagger 
 * /api/auth:
 *   post:
 *     description: Get api token
 *     consumes:
 *       - application/json
 *     parameters:
 *     - in: body
 *       name: user
 *       schema: 
 *         type: object
 *         propeties: 
 *           email:
 *             type: string
 *           password:
 *             type: string
 *     responses: 
 *       200: 
 *            description: get Example Success!
 */
app.use("/api/auth", authRouter);

/**
 * @swagger 
 * /api/rootofequation:
 *   get:
 *     description: Get Root Of Equation Example
 *     parameters:
 *        - in: header
 *          name: x-auth-token
 *          schema:
 *            type: string
 *            format: uuid
 *            default: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlcyI6WyJhZG1pbiIsImVkaXRvciIsInZpZXdlciJdLCJpYXQiOjE2NTMwNjY0MzUsImV4cCI6MTY4NDYyNDAzNX0.pTeysLdrdUWa0hHVznTfMbtjoxz-a8Ae1IirCyWKqOc
 *     responses: 
 *       200: 
 *            description: get Example Success!
 */
app.use("/api/rootofequation", rootOfEquationRouter);

/**
 * @swagger 
 * /api/differentiation:
 *   get:
 *     description: Get Diffrerentiation Example
 *     parameters:
 *        - in: header
 *          name: x-auth-token
 *          schema:
 *            type: string
 *            format: uuid
 *            default: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlcyI6WyJhZG1pbiIsImVkaXRvciIsInZpZXdlciJdLCJpYXQiOjE2NTMwNjY0MzUsImV4cCI6MTY4NDYyNDAzNX0.pTeysLdrdUWa0hHVznTfMbtjoxz-a8Ae1IirCyWKqOc
 *     responses: 
 *       200: 
 *            description: get Example Success!
 */
app.use("/api/differentiation", differentiationRouter);

/**
 * @swagger 
 * /api/integration:
 *   get:
 *     description: Get Integration Example
 *     parameters:
 *        - in: header
 *          name: x-auth-token
 *          schema:
 *            type: string
 *            format: uuid
 *            default: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlcyI6WyJhZG1pbiIsImVkaXRvciIsInZpZXdlciJdLCJpYXQiOjE2NTMwNjY0MzUsImV4cCI6MTY4NDYyNDAzNX0.pTeysLdrdUWa0hHVznTfMbtjoxz-a8Ae1IirCyWKqOc
 *     responses: 
 *       200: 
 *            description: get Example Success!
 */
app.use("/api/integration", integrationRouter);

/**
 * @swagger 
 * /api/linear:
 *   get:
 *     description: Get Linear Equation Example
 *     parameters:
 *        - in: header
 *          name: x-auth-token
 *          schema:
 *            type: string
 *            format: uuid
 *            default: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlcyI6WyJhZG1pbiIsImVkaXRvciIsInZpZXdlciJdLCJpYXQiOjE2NTMwNjY0MzUsImV4cCI6MTY4NDYyNDAzNX0.pTeysLdrdUWa0hHVznTfMbtjoxz-a8Ae1IirCyWKqOc
 *     responses: 
 *       200: 
 *            description: get Example Success!
 */
app.use("/api/linear", linearRouter);

/**
 * @swagger 
 * /api/interpolation:
 *   get:
 *     description: Get Interpolation Example
 *     parameters:
 *        - in: header
 *          name: x-auth-token
 *          schema:
 *            type: string
 *            format: uuid
 *            default: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlcyI6WyJhZG1pbiIsImVkaXRvciIsInZpZXdlciJdLCJpYXQiOjE2NTMwNjY0MzUsImV4cCI6MTY4NDYyNDAzNX0.pTeysLdrdUWa0hHVznTfMbtjoxz-a8Ae1IirCyWKqOc
 *     responses: 
 *       200: 
 *            description: get Example Success!
 */
app.use("/api/interpolation", interpolationRouter);

// Start the server
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

//token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlcyI6WyJhZG1pbiIsImVkaXRvciIsInZpZXdlciJdLCJpYXQiOjE2NTMwNjY0MzUsImV4cCI6MTY4NDYyNDAzNX0.pTeysLdrdUWa0hHVznTfMbtjoxz-a8Ae1IirCyWKqOc