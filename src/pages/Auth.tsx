import { useState } from 'react';
import './Auth.css';

interface AuthProps {
  onLoginSuccess: (user: any) => void;
}

function Auth({ onLoginSuccess }: AuthProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    username: '', password: '', email: '', firstName: '', lastName: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
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
        alert('Account created! Please log in.');
        setIsLogin(true);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
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
                <input name="firstName" required onChange={handleChange} />
              </div>
              <div className="input-group">
                <label>Last Name</label>
                <input name="lastName" required onChange={handleChange} />
              </div>
            </div>
          )}
          
          <div className="input-group">
            <label>Username</label>
            <input name="username" required onChange={handleChange} />
          </div>

          {!isLogin && (
            <div className="input-group">
              <label>Email</label>
              <input type="email" name="email" required onChange={handleChange} />
            </div>
          )}

          <div className="input-group">
            <label>Password</label>
            <input type="password" name="password" required onChange={handleChange} />
          </div>

          {error && <div className="auth-error">{error}</div>}

          <button className="auth-btn" disabled={isLoading}>
            {isLoading ? 'Processing...' : (isLogin ? 'Sign In' : 'Register')}
          </button>
        </form>

        <p className="auth-switch">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Create Account' : 'Log In'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Auth;