import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import { loginUser } from '../api/authApi';

// pretend to import react-router-dom but replaces useNavigate with a fake function 
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

// mock the loginUser function: test the success and failure without depending on the actual server
vi.mock('../api/authApi', () => ({
  loginUser: vi.fn(),
}));



const customRender = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe('Login Component', () => {
  it('renders the login form', () => {
    customRender(<Login />);
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Forgot Password?')).toBeInTheDocument();
    expect(screen.getByText('Signup here')).toBeInTheDocument();
  });

  it('allows user to type in inputs', () => {
    customRender(<Login />);
    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');

    fireEvent.change(usernameInput, { target: { value: 'adminuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(usernameInput.value).toBe('adminuser');
    expect(passwordInput.value).toBe('password123');
  });

  it('calls loginUser when form is submitted', async () => {
    loginUser.mockResolvedValueOnce({ role: 'admin' });

    customRender(<Login />);
    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'testpass' },
    });

    fireEvent.click(screen.getByText('Login'));

    expect(loginUser).toHaveBeenCalledWith('testuser', 'testpass');
  });

  it('displays error on login failure', async () => {
    loginUser.mockRejectedValueOnce({
      response: { data: { message: 'Invalid credentials' } },
    });

    customRender(<Login />);
    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'wrong' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'wrong' },
    });

    fireEvent.click(screen.getByText('Login'));

    // Wait for UI update
    await screen.findByText('Invalid credentials');
    expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
  });
});
