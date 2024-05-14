import { describe, it, afterEach, expect } from "vitest";
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { useState } from "react";

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const rows = [
    [7, 8, 9],
    [4, 5, 6],
    [1, 2, 3],
    [0]
]

const operations = ['+', '-', '*', '/']
const equalSign = '='

const Calculator = () => {
    const [value, setValue] = useState('')

    // Función para manejar el click de los números y operaciones
    const handleClick = (item) => () => setValue(value.concat(item))

    return (
        <section>
            <h1>Calculator</h1>
            <input value={value} readOnly />
            <div role="grid">
                {rows.map((row, idx) => (
                    <div key={idx} role="row">
                        {row.map(number => (
                            <button onClick={handleClick(number)} key={number}>{number}</button>
                        ))}
                    </div>
                ))}
                {operations.map(operation => (
                    <button onClick={handleClick(operation)} key={operation}>{operation}</button>
                ))}
                <button onClick={handleClick(equalSign)}>{equalSign}</button>
            </div>
        </section>
    );
};

describe('Calculator', () => {
    afterEach(cleanup)

    it('should render', () => {
        render(<Calculator />)
    })

    it('should render title correctly', () => {
        render(<Calculator />)
        screen.getByText('Calculator')
    })

    it('should render numbers', () => {
        render(<Calculator />)
        numbers.forEach(number => {
            screen.getByText(number)
        })
    })

    it('should render 4 rows', () => {
        render(<Calculator />)
        expect(screen.getAllByRole('row').length).toBe(4)
    })

    it('should render operations', () => {
        render(<Calculator />)
        operations.forEach(operation => {
            screen.getByText(operation)
        })
    })

    it('should render equal sign', () => {
        render(<Calculator />)
        screen.getByText(equalSign)
    })

    it('should render an input', () => {
        render(<Calculator />)
        screen.getByRole('textbox')
    })

    it('should update user input after clicking a number', () => {
        render(<Calculator />)

        const one = screen.getByText('1')
        fireEvent.click(one)

        const input = screen.getByRole('textbox')
        expect(input.value).toBe('1')
    })

    it('should update user input after clicking several numbers', () => {
        render(<Calculator />)

        const one = screen.getByText('1')
        fireEvent.click(one)

        const two = screen.getByText('2')
        fireEvent.click(two)

        const three = screen.getByText('3')
        fireEvent.click(three)

        const input = screen.getByRole('textbox')
        expect(input.value).toBe('123')
    })

    it('should update user input after clicking numbers and operations', () => {
        render(<Calculator />)

        const one = screen.getByText('1')
        fireEvent.click(one)

        const plus = screen.getByText('+')
        fireEvent.click(plus)

        const two = screen.getByText('2')
        fireEvent.click(two)

        const input = screen.getByRole('textbox')
        expect(input.value).toBe('1+2')
    })
})
