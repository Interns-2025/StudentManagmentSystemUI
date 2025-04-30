import { render, screen, fireEvent } from '@testing-library/react'; // fireEvent: simulates the user actions as click , typing in the feilds
import { describe, it, expect } from 'vitest'; // expect: checks the condition 
import { BrowserRouter } from 'react-router-dom'; // test any route dependent behaviour
import Signup from '../pages/SignUp';



const customRender = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe('Signup Component', () => {
 // test checks if the essential form feild are rendered correctly.
  it('renders signup form fields', () => {
    customRender(<Signup />);
    expect(screen.getByPlaceholderText('Choose a username')).toBeInTheDocument();// ckecks if it is indeed rendered on the page
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Choose a password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Signup' })).toBeInTheDocument();
  });

  it('allows user to type in fields', () => {
    customRender(<Signup />);
    fireEvent.change(screen.getByPlaceholderText('Choose a username'), { target: { value: 'abc' } });
    fireEvent.change(screen.getByPlaceholderText('Enter your email'), { target: { value: 'abc@sms.com' } });
    fireEvent.change(screen.getByPlaceholderText('Choose a password'), { target: { value: 'secret' } });

    expect(screen.getByPlaceholderText('Choose a username').value).toBe('abc');
    expect(screen.getByPlaceholderText('Enter your email').value).toBe('abc@sms.com');
    expect(screen.getByPlaceholderText('Choose a password').value).toBe('secret');
  });

  it('has a role dropdown if present', () => {
    customRender(<Signup />);
    const roleSelect = screen.getByRole('combobox'); // test library uses roles to find out the elements , and the role name for the dropdown is  "combobox"
    expect(roleSelect).toBeInTheDocument();
  });
});
