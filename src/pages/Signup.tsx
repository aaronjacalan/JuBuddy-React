import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';

function Signup() {
  const navigate = useNavigate();

  // TEMPORARY: Skip directly to home page for editing purposes
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/home'); // Skip to home page instead of processing signup
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header">
          <Link to="/" className="signup-logo">
            <span className="logo-text">JuBuddy</span>
          </Link>
          <h1 className="signup-title">Create Your Account</h1>
          <p className="signup-subtitle">Start your financial journey with JuBuddy today</p>
          
          {/* TEMPORARY MESSAGE FOR EDITING */}
          <div className="temp-message">
            <p><strong>Signup temporarily disabled for editing</strong></p>
            <p>Use the button below to access the app directly</p>
          </div>
        </div>
        
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input 
                type="text" 
                id="firstName" 
                name="firstName" 
                placeholder="Enter your first name"
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input 
                type="text" 
                id="lastName" 
                name="lastName" 
                placeholder="Enter your last name"
                required 
              />
            </div>
          </div>
          
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
              placeholder="Create a password"
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input 
              type="password" 
              id="confirmPassword" 
              name="confirmPassword" 
              placeholder="Confirm your password"
              required 
            />
          </div>
          
          <div className="form-options">
            <label className="checkbox-label">
              <input type="checkbox" name="terms" required />
              <span className="checkmark"></span>
              I agree to the <a href="#" className="terms-link">Terms of Service</a> and <a href="#" className="terms-link">Privacy Policy</a>
            </label>
          </div>
          
          <button type="submit" className="btn btn-primary btn-full">
            Create Account
          </button>
          
          {/* TEMPORARY: Direct link to home for editing */}
          <div className="temp-direct-access">
            <Link to="/home" className="btn btn-secondary btn-full">
              Skip to Home (Temporary)
            </Link>
          </div>
        </form>
        
        <div className="signup-footer">
          <p>Already have an account? <Link to="/login" className="login-link">Sign in</Link></p>
          {/* 
            SIGNUP FUNCTIONALITY COMMENTED OUT FOR EDITING
            To enable signup functionality, implement the full signup form processing
            and remove the temporary message and direct access button above
          */}
        </div>
      </div>
    </div>
  );
}

export default Signup;