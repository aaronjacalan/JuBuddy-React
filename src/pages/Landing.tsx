import { Link } from 'react-router-dom';
import './Landing.css';

interface LandingProps {
  firstname?: string;
}

function Landing({ firstname = 'Friend' }: LandingProps) {
  const features = [
    {
      title: "Smart Budget Tracking",
      description: "Track your expenses and income with intelligent categorization and insights powered by AI.",
      icon: "💰"
    },
    {
      title: "Goal Achievement",
      description: "Set and achieve your financial goals with our virtual jar system and progress tracking.",
      icon: "🎯"
    },
    {
      title: "Buddy System",
      description: "Share your financial journey with friends and stay motivated together with accountability partners.",
      icon: "👥"
    },
    {
      title: "Detailed Analytics",
      description: "Get comprehensive reports and analytics to understand your spending patterns and optimize savings.",
      icon: "📊"
    },
    {
      title: "Bill Reminders",
      description: "Never miss a payment with smart reminders and automatic bill tracking features.",
      icon: "🔔"
    },
    {
      title: "Investment Insights",
      description: "Get personalized investment advice and track your portfolio performance in real-time.",
      icon: "📈"
    },
    {
      title: "Automated Savings",
      description: "Set up automatic transfers and rules to save money without thinking about it.",
      icon: "🤖"
    },
    {
      title: "Credit Score Monitoring",
      description: "Track your credit score and get personalized tips to improve your financial profile.",
      icon: "📋"
    }
  ];

  const statistics = [
    { number: "50,000+", label: "Active Users" },
    { number: "₱2.5M+", label: "Total Savings" },
    { number: "95%", label: "Goal Achievement Rate" },
    { number: "₱15,000", label: "Average Savings" },
    { number: "24/7", label: "Customer Support" },
    { number: "99.9%", label: "Uptime Guarantee" }
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      text: "JuBuddy helped me save ₱50,000 in just 6 months! The buddy system keeps me accountable and motivated.",
      rating: 5,
      location: "Manila"
    },
    {
      name: "Mike R.",
      text: "The detailed analytics finally showed me where my money was going. I've cut expenses by 30%!",
      rating: 5,
      location: "Cebu"
    },
    {
      name: "Lisa K.",
      text: "Love the virtual jar system! I've reached all my savings goals faster than I ever thought possible.",
      rating: 5,
      location: "Davao"
    },
    {
      name: "John D.",
      text: "As a freelancer, irregular income used to stress me out. JuBuddy's smart budgeting changed everything.",
      rating: 5,
      location: "Quezon City"
    },
    {
      name: "Maria S.",
      text: "The investment insights helped me grow my savings by 15% this year. Highly recommended!",
      rating: 5,
      location: "Makati"
    }
  ];

  const faqs = [
    {
      question: "Is JuBuddy free to use?",
      answer: "Yes! JuBuddy offers a comprehensive free plan with all core features. We also have premium plans for advanced features."
    },
    {
      question: "How secure is my financial data?",
      answer: "We use bank-level 256-bit encryption and never store your banking credentials. Your data is protected with the highest security standards."
    },
    {
      question: "Can I link multiple bank accounts?",
      answer: "Absolutely! You can link multiple savings, checking, and credit card accounts from various banks across the Philippines."
    },
    {
      question: "How does the buddy system work?",
      answer: "Connect with friends to share goals, progress updates, and motivate each other. You can set privacy levels and choose what to share."
    },
    {
      question: "What banks are supported?",
      answer: "We support all major Philippine banks including BPI, BDO, Metrobank, Landbank, and many more. We're constantly adding new banks."
    },
    {
      question: "Is there a mobile app?",
      answer: "Yes! Our mobile app is available on both iOS and Android, giving you full access to your finances on the go."
    }
  ];

  const pressMentions = [
    { outlet: "TechCrunch", headline: "JuBuddy Raises $2M to Revolutionize Personal Finance in Southeast Asia" },
    { outlet: "Business Mirror", headline: "Filipino Fintech Startup JuBuddy Helps Users Save Over ₱2.5 Million" },
    { outlet: "Manila Bulletin", headline: "Local App JuBuddy Makes Budgeting Fun and Social for Filipinos" },
    { outlet: "Philippine Star", headline: "JuBuddy: The Buddy System That Actually Helps You Save Money" }
  ];

  const team = [
    { name: "Alex Chen", role: "CEO & Co-Founder", experience: "Former VP at PayMaya" },
    { name: "Sarah Garcia", role: "CTO & Co-Founder", experience: "Ex-Google Senior Engineer" },
    { name: "Mike Torres", role: "Head of Product", experience: "Former Product Manager at Coins.ph" },
    { name: "Lisa Mendoza", role: "Head of Design", experience: "Award-winning UX Designer" }
  ];

  return (
    <div className="landing-container">
      {/* Static Transparent Header */}
      <header className="landing-header">
        <div className="logo-section">
          <Link to="/" className="logo">
            <span className="logo-text">JuBuddy</span>
          </Link>
        </div>
        
        <div className="user-section">
          <Link 
            to="/login" 
            className="auth-button"
            aria-label="Sign in to your account"
          >
            Sign In
          </Link>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Take Control of Your 
              <span className="hero-title-highlight"> Financial Future</span>
            </h1>
            <p className="hero-subtitle">
              Join thousands of Filipinos who are achieving their financial goals with JuBuddy's 
              intelligent budgeting, savings tools, and social accountability features.
            </p>
            <div className="hero-actions">
              <Link to="/register" className="btn btn-primary">
                Start Your Journey
              </Link>
            </div>
            <div className="hero-stats">
              {statistics.slice(0, 3).map((stat, index) => (
                <div key={index} className="stat">
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-visual">
            <div className="phone-mockup">
              <div className="phone-screen">
                <div className="app-preview">
                  <div className="preview-header">
                    <div className="preview-logo">JuBuddy</div>
                  </div>
                  <div className="preview-content">
                    <div className="preview-balance">
                      <span className="preview-balance-label">Current Balance</span>
                      <span className="preview-balance-amount">₱25,430.50</span>
                    </div>
                    <div className="preview-goals">
                      <div className="preview-goal">
                        <span>Emergency Fund</span>
                        <div className="progress-bar">
                          <div className="progress-fill" style={{width: '75%'}}></div>
                        </div>
                        <span>₱15,000 / ₱20,000</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="statistics-section">
        <div className="container">
          <h2 className="section-title">Trusted by Thousands</h2>
          <p className="section-subtitle">
            Join a growing community of Filipinos taking control of their financial future
          </p>
          <div className="statistics-grid">
            {statistics.map((stat, index) => (
              <div key={index} className="statistic-card">
                <div className="statistic-number">{stat.number}</div>
                <div className="statistic-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose JuBuddy?</h2>
          <p className="section-subtitle">
            Everything you need to take control of your finances and achieve your goals
          </p>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            Get started in minutes with our simple 3-step process
          </p>
          <div className="steps-container">
            <div className="step">
              <div className="step-number">1</div>
              <h3 className="step-title">Create Your Account</h3>
              <p className="step-description">
                Sign up for free and set up your financial profile with your income, expenses, and savings goals
              </p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3 className="step-title">Connect Your Accounts</h3>
              <p className="step-description">
                Securely link your bank accounts and credit cards for automatic transaction tracking
              </p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3 className="step-title">Achieve Your Goals</h3>
              <p className="step-description">
                Track your progress, stay motivated with buddies, and watch your savings grow over time
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="security-section">
        <div className="container">
          <h2 className="section-title">Bank-Level Security</h2>
          <p className="section-subtitle">
            Your financial data is protected with the highest security standards
          </p>
          <div className="security-grid">
            <div className="security-item">
              <div className="security-icon">🔒</div>
              <h3>256-bit Encryption</h3>
              <p>Bank-level encryption protects all your sensitive data</p>
            </div>
            <div className="security-item">
              <div className="security-icon">🛡️</div>
              <h3>Banking API Integration</h3>
              <p>Direct secure connections to your bank - we never see your passwords</p>
            </div>
            <div className="security-item">
              <div className="security-icon">👁️</div>
              <h3>Privacy First</h3>
              <p>Your data is yours - we never sell or share your information</p>
            </div>
            <div className="security-item">
              <div className="security-icon">✅</div>
              <h3>BSP Regulated</h3>
              <p>Fully compliant with Bangko Sentral ng Pilipinas regulations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <h2 className="section-title">What Our Users Say</h2>
          <p className="section-subtitle">
            Real stories from real people achieving their financial dreams
          </p>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-rating">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <span key={i} className="star">⭐</span>
                  ))}
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
                <p className="testimonial-author">- {testimonial.name}</p>
                <p className="testimonial-location">{testimonial.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Everything you need to know about JuBuddy
          </p>
          <div className="faq-grid">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <h3 className="faq-question">{faq.question}</h3>
                <p className="faq-answer">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">Ready to Start Your Financial Journey?</h2>
          <p className="cta-subtitle">
            Join thousands of Filipinos who are already taking control of their financial future
          </p>
          <div className="cta-actions">
            <Link to="/register" className="btn btn-primary btn-large">              Start Saving Today
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="blog-section">
        <div className="container">
          <h2 className="section-title">Latest from Our Blog</h2>
          <p className="section-subtitle">
            Tips, guides, and insights to help you master your finances
          </p>
          <div className="blog-grid">
            <div className="blog-item">
              <h3>How to Build an Emergency Fund in the Philippines</h3>
              <p>Learn the proven strategies that helped thousands of Filipinos save for unexpected expenses.</p>
              <span className="blog-date">Dec 10, 2024</span>
            </div>
            <div className="blog-item">
              <h3>Budgeting Tips for Freelancers</h3>
              <p>Navigate irregular income with smart budgeting techniques designed for gig workers.</p>
              <span className="blog-date">Dec 8, 2024</span>
            </div>
            <div className="blog-item">
              <h3>Investment Basics for Beginners</h3>
              <p>Start your investment journey with these fundamental concepts and practical advice.</p>
              <span className="blog-date">Dec 5, 2024</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <h3 className="footer-logo">JuBuddy</h3>
              <p className="footer-tagline">Your Financial Journey Buddy</p>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4>Product</h4>
                <a href="#features">Features</a>
                <a href="#pricing">Pricing</a>
                <a href="#security">Security</a>
                <a href="#mobile">Mobile App</a>
                <a href="#api">API</a>
              </div>
              <div className="footer-column">
                <h4>Support</h4>
                <a href="#help">Help Center</a>
                <a href="#contact">Contact Us</a>
                <a href="#faq">FAQ</a>
                <a href="#tutorials">Tutorials</a>
                <a href="#status">System Status</a>
              </div>
              <div className="footer-column">
                <h4>Company</h4>
                <a href="#about">About Us</a>
                <a href="#careers">Careers</a>
                <a href="#blog">Blog</a>
                <a href="#press">Press</a>
                <a href="#partners">Partners</a>
              </div>
              <div className="footer-column">
                <h4>Legal</h4>
                <a href="#privacy">Privacy Policy</a>
                <a href="#terms">Terms of Service</a>
                <a href="#cookies">Cookie Policy</a>
                <a href="#compliance">Compliance</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 JuBuddy. All rights reserved. | Built with ❤️ for Filipinos</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;