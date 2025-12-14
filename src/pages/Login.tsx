import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/home');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <Link to="/" className="login-logo">
            <span className="logo-text">JuBuddy</span>
          </Link>
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Sign in to your account to continue your financial journey</p>
        </div>
        
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              placeholder="Enter your email"
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              placeholder="Enter your password"
              required 
            />
          </div>
          
          <div className="form-options">
            <label className="checkbox-label">
              <input type="checkbox" name="remember" />
              <span className="checkmark"></span>
              Remember me
            </label>
            <a href="#" className="forgot-password">Forgot password?</a>
          </div>
          
          <button type="submit" className="btn btn-primary btn-full">
            Sign In
          </button>
          
          {/* TEMPORARY: Direct link to home for editing */}
          <div className="temp-direct-access">
            <Link to="/home" className="btn btn-secondary btn-full">
              Skip to Home (Temporary)
            </Link>
          </div>
        </form>
        
        <div className="login-footer">
          <p>Don't have an account? <Link to="/signup" className="signup-link">Sign up</Link></p>
          {/* 
            SIGNUP FUNCTIONALITY COMMENTED OUT FOR EDITING
            To enable signup functionality, uncomment the signup link above
            and implement the signup form in Signup.tsx
          */}
        </div>
      </div>
    </div>
  );
}

export default Login;