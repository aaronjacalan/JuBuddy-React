import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import './Landing.css';

interface LandingProps {
  firstname?: string;
}

function Landing({ }: LandingProps) {
  const [navStyle, setNavStyle] = useState('light');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const sections = ['hero', 'features', 'process', 'testimonial', 'cta'];
      
      const currentSection = Math.floor(scrollTop / windowHeight);
      
      if (sections[currentSection] === 'hero' || sections[currentSection] === 'features' || sections[currentSection] === 'testimonial') {
        setNavStyle('light');
      } else {
        setNavStyle('dark');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    { 
      title: "Smart Budget Tracking", 
      icon: "💰",
      description: "Automatically categorize expenses and income with intelligent AI-powered tracking",
      color: "from-emerald-400 to-teal-500"
    },
    { 
      title: "Goal Achievement", 
      icon: "🎯",
      description: "Visualize and achieve your dreams with our innovative virtual jar savings system",
      color: "from-blue-400 to-cyan-500"
    },
    { 
      title: "Buddy System", 
      icon: "👥",
      description: "Stay accountable with friends and celebrate financial milestones together",
      color: "from-purple-400 to-pink-500"
    },
    { 
      title: "Deep Analytics", 
      icon: "📊",
      description: "Discover spending patterns with beautiful, comprehensive financial reports",
      color: "from-orange-400 to-red-500"
    },
    { 
      title: "Smart Reminders", 
      icon: "🔔",
      description: "Never miss a bill payment with intelligent, timely notifications",
      color: "from-yellow-400 to-orange-500"
    },
    { 
      title: "AI Financial Coach", 
      icon: "🤖",
      description: "Receive personalized recommendations and insights powered by advanced AI",
      color: "from-indigo-400 to-purple-500"
    }
  ];

  const stats = [
    { number: "4.9★", label: "App Rating", icon: "⭐" },
    { number: "24/7", label: "Support Available", icon: "💬" },
    { number: "100%", label: "Secure & Private", icon: "🔒" }
  ];

  return (
    <div ref={containerRef} className="landing-wrapper">
      <header className={`nav-header ${navStyle}`}>
        <Link to="/" className="brand">
          <span className="brand-text">JuBuddy</span>
        </Link>
        <Link to="/login" className="signin-btn">Sign In</Link>
      </header>

      <div className="scroll-container">
        <section className="hero-panel">
          <div className="hero-grid">
            <div className="hero-left">
              <div className="availability">
                <span className="status-dot"></span>
                <span>Available Now</span>
              </div>
              <h1 className="main-heading">
                Take Control of Your
                <span className="accent-text"> Financial Future</span>
              </h1>
              <p className="main-description">
                Join thousands of Filipinos achieving their financial goals with intelligent budgeting and social accountability.
              </p>
              <Link to="/login" className="cta-primary">Start Your Journey</Link>
              
              <div className="stats-row">
                {stats.map((stat, i) => (
                  <div key={i} className="stat-item">
                    <div className="stat-icon">{stat.icon}</div>
                    <div className="stat-num">{stat.number}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hero-right">
              <div className="phone-frame">
                <div className="phone-content">
                  <div className="app-header">JuBuddy</div>
                  <div className="balance-card">
                    <span className="balance-label">Current Balance</span>
                    <span className="balance-amount">₱25,430.50</span>
                  </div>
                  <div className="goal-card">
                    <span className="goal-name">Emergency Fund</span>
                    <div className="progress-track">
                      <div className="progress-bar" style={{width: '75%'}}></div>
                    </div>
                    <span className="goal-progress">₱15,000 / ₱20,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="features-panel">
          <div className="panel-content">
            <h2 className="panel-title">Why Choose JuBuddy?</h2>
            <div className="features-grid">
              {features.map((feature, i) => (
                <div key={i} className="feature-box">
                  <div className={`feature-icon-wrapper bg-gradient-to-br ${feature.color}`}>
                    <span className="feature-icon">{feature.icon}</span>
                  </div>
                  <span className="feature-name">{feature.title}</span>
                  <p className="feature-description">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="process-panel">
          <div className="panel-content">
            <h2 className="panel-title light">How It Works</h2>
            <div className="steps-grid">
              <div className="step-box">
                <div className="step-num">1</div>
                <h3 className="step-title">Create Account</h3>
                <p className="step-desc">Sign up and set up your financial profile</p>
              </div>
              <div className="step-box">
                <div className="step-num">2</div>
                <h3 className="step-title">Connect Accounts</h3>
                <p className="step-desc">Link your bank accounts securely</p>
              </div>
              <div className="step-box">
                <div className="step-num">3</div>
                <h3 className="step-title">Achieve Goals</h3>
                <p className="step-desc">Track progress and grow your savings</p>
              </div>
            </div>
          </div>
        </section>

        <section className="testimonial-panel">
          <div className="panel-content">
            <h2 className="panel-title">What Users Say</h2>
            <div className="testimonial-grid">
              <div className="testimonial-card">
                <div className="stars">⭐⭐⭐⭐⭐</div>
                <p className="testimonial-text">"Helped me save ₱50,000 in 6 months!"</p>
                <p className="testimonial-author">Sarah M.</p>
              </div>
              <div className="testimonial-card">
                <div className="stars">⭐⭐⭐⭐⭐</div>
                <p className="testimonial-text">"Cut my expenses by 30% with analytics"</p>
                <p className="testimonial-author">Mike R.</p>
              </div>
              <div className="testimonial-card">
                <div className="stars">⭐⭐⭐⭐⭐</div>
                <p className="testimonial-text">"Love the virtual jar system!"</p>
                <p className="testimonial-author">Lisa K.</p>
              </div>
              <div className="testimonial-card">
                <div className="stars">⭐⭐⭐⭐⭐</div>
                <p className="testimonial-text">"Best budgeting app I've ever used!"</p>
                <p className="testimonial-author">John D.</p>
              </div>
              <div className="testimonial-card">
                <div className="stars">⭐⭐⭐⭐⭐</div>
                <p className="testimonial-text">"The buddy system keeps me motivated"</p>
                <p className="testimonial-author">Anna T.</p>
              </div>
              <div className="testimonial-card">
                <div className="stars">⭐⭐⭐⭐⭐</div>
                <p className="testimonial-text">"Finally reached my savings goal!"</p>
                <p className="testimonial-author">Carlos P.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="cta-panel">
          <div className="panel-content center">
            <h2 className="panel-title light">Ready to Start?</h2>
            <p className="cta-text">Join thousands already taking control</p>
            <Link to="/login" className="cta-primary large">Start Saving Today</Link>
          </div>
          
          <footer className="site-footer">
            <div className="footer-grid">
              <div className="footer-brand">
                <h3 className="footer-logo">JuBuddy</h3>
                <p className="footer-tag">Your Financial Journey Buddy</p>
              </div>
              <div className="footer-links">
                <div className="link-col">
                  <h4>Product</h4>
                  <a href="#features">Features</a>
                  <a href="#pricing">Pricing</a>
                </div>
                <div className="link-col">
                  <h4>Support</h4>
                  <a href="#help">Help Center</a>
                  <a href="#contact">Contact</a>
                </div>
                <div className="link-col">
                  <h4>Legal</h4>
                  <a href="#privacy">Privacy</a>
                  <a href="#terms">Terms</a>
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <p>&copy; 2024 JuBuddy. All rights reserved.</p>
            </div>
          </footer>
        </section>
      </div>
    </div>
  );
}

export default Landing;