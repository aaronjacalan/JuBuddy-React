import { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for the back button
import './Auth.css';

interface AuthProps {
  onLoginSuccess: (user: any) => void;
  initialMode?: 'login' | 'register'; // New prop to control default view
}

function Auth({ onLoginSuccess, initialMode = 'login' }: AuthProps) {
  // Use initialMode to determine starting state
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    username: '', password: '', email: '', firstName: '', lastName: ''
  });

  const validatePassword = (password: string) => {
    if (password.length < 8) return "Password must be at least 8 characters long.";
    if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter.";
    if (!/[0-9]/.test(password)) return "Password must contain at least one number.";
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return "Password must contain at least one special character.";
    return null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isLogin) {
      const passwordError = validatePassword(formData.password);
      if (passwordError) {
        setError(passwordError);
        return;
      }
    }

    setIsLoading(true);
    
    const url = isLogin 
      ? 'http://127.0.0.1:8000/user/api/login/' 
      : 'http://127.0.0.1:8000/user/api/register/';

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || 'Request failed');

      if (isLogin) {
        onLoginSuccess(data.user);
      } else {
        alert('Account created successfully! Please log in.');
        setIsLogin(true);
        setFormData(prev => ({ ...prev, password: '' })); 
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {/* --- ADDED: Back Button --- */}
      <Link to="/" className="auth-back-button">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Back to Home
      </Link>

      <div className="auth-card">
        <h1 className="auth-title">{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
        <p className="auth-subtitle">
          {isLogin ? 'Sign in to access your finance dashboard.' : 'Join us to start tracking your savings.'}
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="auth-row">
              <div className="input-group">
                <label>First Name</label>
                <input name="firstName" required onChange={handleChange} value={formData.firstName} />
              </div>
              <div className="input-group">
                <label>Last Name</label>
                <input name="lastName" required onChange={handleChange} value={formData.lastName} />
              </div>
            </div>
          )}
          
          <div className="input-group">
            <label>Username</label>
            <input name="username" required onChange={handleChange} value={formData.username} />
          </div>

          {!isLogin && (
            <div className="input-group">
              <label>Email</label>
              <input type="email" name="email" required onChange={handleChange} value={formData.email} />
            </div>
          )}

          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              name="password" 
              required 
              onChange={handleChange} 
              value={formData.password}
              placeholder={!isLogin ? "Min 8 chars, 1 number, 1 symbol" : ""}
            />
          </div>

          {error && <div className="auth-error">{error}</div>}

          <button className="auth-btn" disabled={isLoading}>
            {isLoading ? 'Processing...' : (isLogin ? 'Sign In' : 'Register')}
          </button>
        </form>

        <p className="auth-switch">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button onClick={() => {
            setIsLogin(!isLogin);
            setError(''); 
          }}>
            {isLogin ? 'Create Account' : 'Log In'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Auth;