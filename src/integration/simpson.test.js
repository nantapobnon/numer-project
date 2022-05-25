import React, { useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Simpson from './simpson';

test("test backward result",()=> {
    render(<Simpson/>);

    const fxInput = screen.getByTestId("fx");
    fireEvent.change(fxInput, {target: { value: 'x^7+2x^3-1'}});
    expect(fxInput.value).toBe('x^7+2x^3-1');

    const upperInput = screen.getByTestId("upper");
    fireEvent.change(upperInput, {target: { value: '2'}});
    expect(upperInput.value).toBe('2');

    const lowerInput = screen.getByTestId("lower");
    fireEvent.change(lowerInput, {target: { value: '1'}});
    expect(lowerInput.value).toBe('1');

    const nInput = screen.getByTestId("n");
    fireEvent.change(nInput, {target: { value: '4'}});
    expect(nInput.value).toBe('4');


    const enterBtn = screen.getByText(/Enter/i);
    fireEvent.click(enterBtn);

    const result = screen.getByText(/Result/i);
    expect(result).toBeInTheDocument;
    console.log(result)
    expect(result).toHaveTextContent("Result = 38.442139");
});