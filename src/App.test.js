import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

// Mock current date to ensure consistent createdAt values
beforeAll(() => {
  jest.useFakeTimers().setSystemTime(new Date('2025-01-01').getTime());
});

afterAll(() => {
  jest.useRealTimers();
});

test('renders the main app title', () => {
  render(<App />);
  const title = screen.getByText(/Todo App/i);
  expect(title).toBeInTheDocument();
});

test('adds a new todo item', () => {
  render(<App />);
  
  const input = screen.getByPlaceholderText(/enter todo title/i);
  const select = screen.getByLabelText(/todo priority/i);
  const addButton = screen.getByRole('button', { name: /add todo/i });

  fireEvent.change(input, { target: { value: 'Test Todo' } });
  fireEvent.change(select, { target: { value: 'High' } });
  fireEvent.click(addButton);
  
  const newTodo = screen.getByText('Test Todo');
  expect(newTodo).toBeInTheDocument();
});

test('marks a todo as completed', () => {
  render(<App />);
  
  const input = screen.getByPlaceholderText(/enter todo title/i);
  fireEvent.change(input, { target: { value: 'Complete me' } });
  fireEvent.click(screen.getByRole('button', { name: /add todo/i }));

  const checkbox = screen.getByRole('checkbox');
  fireEvent.click(checkbox);
  expect(checkbox.checked).toBe(true);
});

test('filters completed todos', () => {
  render(<App />);
  
  const input = screen.getByPlaceholderText(/enter todo title/i);
  fireEvent.change(input, { target: { value: 'Completed Task' } });
  fireEvent.click(screen.getByRole('button', { name: /add todo/i }));

  fireEvent.click(screen.getByRole('checkbox')); // Mark complete

  fireEvent.change(screen.getByDisplayValue('All'), {
    target: { value: 'completed' },
  });

  expect(screen.getByText('Completed Task')).toBeInTheDocument();
});

test('deletes a todo', () => {
  render(<App />);
  
  fireEvent.change(screen.getByPlaceholderText(/enter todo title/i), {
    target: { value: 'Delete me' },
  });
  fireEvent.click(screen.getByRole('button', { name: /add todo/i }));

  fireEvent.click(screen.getByRole('button', { name: '❌' }));
  expect(screen.queryByText('Delete me')).not.toBeInTheDocument();
});
