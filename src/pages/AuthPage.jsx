import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import { updateProfile } from "firebase/auth";

const getFriendlyError = (errorCode) => {
  if (!errorCode) return '';
  const err = errorCode.toLowerCase();
  if (err.includes('invalid-credential') || err.includes('wrong-password') || err.includes('user-not-found')) {
    return 'Incorrect email or password. Please try again.';
  } else if (err.includes('email-already-in-use')) {
    return 'An account with this email already exists. Try signing in.';
  } else if (err.includes('weak-password')) {
    return 'Password must be at least 6 characters.';
  } else if (err.includes('invalid-email')) {
    return 'Please enter a valid email address.';
  } else if (err.includes('too-many-requests')) {
    return 'Too many failed attempts. Please wait a moment and try again.';
  } else if (err.includes('network-request-failed')) {
    return 'Network error. Please check your connection.';
  } else if (err.includes('popup-closed-by-user')) {
    return 'Google sign-in was cancelled.';
  }
  return 'Something went wrong. Please try again.';
};

const AuthPage = ({ onBack, onNavigate }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, signup, googleSignIn } = useAuth();

  const handleAuth = async (e) => {
    if (e) e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        const result = await signup(email, password);
        // Update display name immediately after signup
        await updateProfile(result.user, {
          displayName: name
        });
        // Force reload the user to get updated profile
        await result.user.reload();
      }
    } catch (err) {
      console.error("Auth error:", err);
      setError(getFriendlyError(err.message || err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await googleSignIn();
    } catch (err) {
      setError(getFriendlyError(err.message || err.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar currentPage="auth" onNavigate={onNavigate} onSignIn={() => setIsLogin(true)} />
      <div className="auth-layout container" style={{ paddingTop: '100px' }}>
        <div className="auth-hero stagger-in">
          <div className="glass-card auth-hero-content stagger-in-item">
            <h2 className="auth-welcome-title">India's largest brands trust BlogForge</h2>
            <p className="auth-welcome-desc">Join 500+ startups saving 92% of their content creation time.</p>

            <div className="auth-quotes stagger-in-item">
              <div className="auth-quote">
                "BlogForge replaced our entire content agency. We're now publishing 4x more for 1/10th the cost."
                <div className="auth-author">— Founder, Delhi.AI</div>
              </div>
            </div>

            <div className="auth-stats-grid stagger-in-item">
              <div className="auth-stat">
                <div className="auth-stat-val">94%</div>
                <div className="auth-stat-lab">Avg. SEO Score</div>
              </div>
              <div className="auth-stat">
                <div className="auth-stat-val">10/10</div>
                <div className="auth-stat-lab">Human Feel</div>
              </div>
            </div>
          </div>
        </div>

        <div className="auth-form-container stagger-in">
          <div className="auth-form-card glass-card stagger-in-item">
            <div className="auth-header">
              <h1 className="auth-title">{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
              <p className="auth-subtitle">{isLogin ? 'Sign in to your BlogForge Workspace' : 'Get started with BlogForge'}</p>
            </div>

            <div className="auth-google-btn-wrap">
              <button
                className="btn btn-outline btn-lg w-full"
                onClick={handleGoogleSignIn}
                disabled={loading}
              >
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/action/google.svg" width="18" alt="" />
                {loading ? 'Connecting...' : 'Continue with Google'}
              </button>
            </div>

            <div className="auth-divider">
              <span>or continue with email</span>
            </div>

            <form onSubmit={handleAuth} className="auth-fields">
              {!isLogin && (
                <div className="input-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={!isLogin}
                    disabled={loading}
                  />
                </div>
              )}
              <div className="input-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              {error && (
                <div style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  color: '#EF4444',
                  fontSize: '13px',
                  marginTop: '12px',
                  textAlign: 'center'
                }}>
                  ⚠️ {error}
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary btn-lg w-full"
                style={{ marginTop: '20px' }}
                disabled={loading}
              >
                {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
              </button>
            </form>

            <div className="auth-footer">
              {isLogin ? (
                <>Don't have an account? <span className="auth-link" onClick={() => setIsLogin(false)}>Sign Up</span></>
              ) : (
                <>Already have an account? <span className="auth-link" onClick={() => setIsLogin(true)}>Sign In</span></>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
