import React, { useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Backwardh from './backward';

test("test backward result",()=> {
    render(<Backwardh/>);

    const fxInput = screen.getByTestId("fx");
    fireEvent.change(fxInput, {target: { value: 'e^x'}});
    expect(fxInput.value).toBe('e^x');

    const degreeInput = screen.getByTestId("degree");
    fireEvent.change(degreeInput, {target: { value: '1'}});
    expect(degreeInput.value).toBe('1');

    const xInput = screen.getByTestId("x");
    fireEvent.change(xInput, {target: { value: '2'}});
    expect(xInput.value).toBe('2');

    const hInput = screen.getByTestId("h");
    fireEvent.change(hInput, {target: { value: '1'}});
    expect(hInput.value).toBe('1');


    const enterBtn = screen.getByText(/Enter/i);
    fireEvent.click(enterBtn);

    const result = screen.getByText(/Exact/i);
    expect(result).toBeInTheDocument;
    console.log(result)
    expect(result).toHaveTextContent("Exact = 7.389056");
});