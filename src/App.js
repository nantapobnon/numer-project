import logo from './logo.svg'
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import { Nav,Navbar,NavDropdown } from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Graphical from './root-of-equation/graphical-method';
import Bisection from './root-of-equation/bisection-method';
import FalsePosition from './root-of-equation/falseposition';
import OnePoint from './root-of-equation/onepoint';
import Newton from './root-of-equation/newton';
import Secant from './root-of-equation/secant';
import Cramer from './linear-equation/cramer.js';
import Gauss_eliminate from './linear-equation/gauss-eliminate';
import GaussJordan from './linear-equation/gauss-jordan';
import LU from './linear-equation/LU';
import Cholesky from './linear-equation/cholesky';
import Jacobi from './linear-equation/jacobi';
import NewtonDivide from './interpolation/newton-divide';
import Lagrange from './interpolation/lagrange';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
      </header> */}
      <Router>
        <Navbar bg='myRed' variant='dark' sticky='top'>
          <Navbar.Brand>
            <img src={logo} width='60' height='60' />{' '}
          </Navbar.Brand>
          <Navbar.Brand>
            <h3 className='header'>Numerical Method</h3>
          </Navbar.Brand>
          <Nav>
            <NavDropdown title="Root of Equation">
              {/* <NavDropdown.Item as={Link} to={"/graphical"}>Graphical Method</NavDropdown.Item> */}
              <NavDropdown.Item as={Link} to={"/bisection"}>Bisection Method</NavDropdown.Item>
              <NavDropdown.Item as={Link} to={"/falseposition"}>False Position Method</NavDropdown.Item>
              <NavDropdown.Item as={Link} to={"/onepoint"}>One-Point Iteration Method</NavDropdown.Item>
              <NavDropdown.Item as={Link} to={"/newton"}>Newton-Raphson Method</NavDropdown.Item>
              <NavDropdown.Item as={Link} to={"/secant"}>Secant Method</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <NavDropdown title="Linear Algebraic Equation">
              <NavDropdown.Item as={Link} to={"/cramer"}>Cramer Rule</NavDropdown.Item>
              <NavDropdown.Item as={Link} to={"/gauss_eliminate"}>Gauss Elimination Method</NavDropdown.Item>
              <NavDropdown.Item as={Link} to={"/gaussJordan"}>Gauss-Jordan Method</NavDropdown.Item>
              <NavDropdown.Item as={Link} to={"/LU"}>LU Decomposition Method</NavDropdown.Item>
              <NavDropdown.Item as={Link} to={"/cholesky"}>Cholesky Decomposition Method</NavDropdown.Item>
              <NavDropdown.Item as={Link} to={"/jacobi"}>Jacobi Iteration Method</NavDropdown.Item>
              <NavDropdown.Item href='Linear Algebraic Equation/Gauss-Seidel Iteration Method'>Gauss-Seidel Iteration Method</NavDropdown.Item>
              <NavDropdown.Item href='Linear Algebraic Equation/Conjugate Gradient Method'>Conjugate Gradient Method</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <NavDropdown title="Interpolation">
              <NavDropdown.Item as={Link} to={"/newtonDivide"}>Newton's Divide Differences</NavDropdown.Item>
              <NavDropdown.Item as={Link} to={"/lagrange"}>Lagrange Interpolation</NavDropdown.Item>
              <NavDropdown.Item href='Linear Algebraic Equation/Conjugate Gradient Method'>Spline Interpolation</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar>
        <div>
          <Routes>
            <Route path='/' exact element={<Bisection/>} />
          </Routes>
          <Routes>
            <Route path='/graphical' element={<Graphical/>} />
          </Routes>
          <Routes>
            <Route path='/bisection' element={<Bisection/>} />
          </Routes>
          <Routes>
            <Route path='/falseposition' element={<FalsePosition/>} />
          </Routes>
          <Routes>
            <Route path='/onepoint' element={<OnePoint/>} />
          </Routes>
          <Routes>
            <Route path='/newton' element={<Newton/>} />
          </Routes>
          <Routes>
            <Route path='/secant' element={<Secant/>} />
          </Routes>
          <Routes>
            <Route path='/cramer' element={<Cramer/>} />
          </Routes>
          <Routes>
            <Route path='/gauss_eliminate' element={<Gauss_eliminate/>} />
          </Routes>
          <Routes>
            <Route path='/gaussJordan' element={<GaussJordan/>} />
          </Routes>
          <Routes>
            <Route path='/LU' element={<LU/>} />
          </Routes>
          <Routes>
            <Route path='/cholesky' element={<Cholesky/>} />
          </Routes>
          <Routes>
            <Route path='/jacobi' element={<Jacobi/>} />
          </Routes>
          <Routes>
            <Route path='/newtonDivide' element={<NewtonDivide/>} />
          </Routes>
          <Routes>
            <Route path='/lagrange' element={<Lagrange/>} />
          </Routes>
        </div>
      </Router>
      {/* <div className="content">
        numerical method
      </div> */}
    </div>
  );
}


export default App;
