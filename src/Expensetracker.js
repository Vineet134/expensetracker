import React, { useState } from 'react';
import './Expensetracker.css'; // Assuming the CSS file is already linked

const Expensetracker = () => {
  const [input, setInput] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [expenses, setExpenses] = useState([]);

  const addExpense = () => {
    if (!input || !amount || !date) return;

    const newExpense = {
      id: expenses.length + 1,
      title: input,
      amount: parseFloat(amount),
      date: new Date(date), // Store the date as a JavaScript Date object
    };

    setExpenses([...expenses, newExpense]);
    setInput('');
    setAmount('');
    setDate('');
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const getMonthlyTotal = (month, year) => {
    return expenses
      .filter((expense) => {
        const expenseDate = new Date(expense.date);
        return (
          expenseDate.getMonth() === month && expenseDate.getFullYear() === year
        );
      })
      .reduce((total, expense) => total + expense.amount, 0);
  };

  // Display expenses for the current year (you can change this to any year)
  const currentYear = new Date().getFullYear();
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="container">
      {/* Expense Form */}
      <div className="heading">
        <h2>Expense Tracker</h2>
      </div>
      <div className="form">
        <input
          type="text"
          placeholder="Enter your expense type"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter the amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button id="submit" type="submit" onClick={addExpense}>
          Add Expense
        </button>
      </div>

      {/* Display Monthly Totals */}
      <div className="monthly-expenses">
        <h3>Monthly Expenses for {currentYear}</h3>
        <ul>
          {months.map((month, index) => (
            <li key={index}>
              <span>{month}: </span>
              <span>${getMonthlyTotal(index, currentYear).toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Display All Expenses */}
      <div className="expense-list-container">
        <ul className="expenselist">
          {expenses.map((expense) => (
            <li key={expense.id}>
              <span>{expense.title}</span>
              <span>${expense.amount.toFixed(2)}</span>
              <span>{new Date(expense.date).toLocaleDateString()}</span>
              <button onClick={() => deleteExpense(expense.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Expensetracker;
