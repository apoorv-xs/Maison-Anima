import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback" style={{
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '24px' }}>⚠️</div>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.8rem',
            fontWeight: 400,
            color: '#1C1B1A',
            marginBottom: '12px'
          }}>
            Something went wrong
          </h2>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.85rem',
            color: '#6A6764',
            marginBottom: '24px',
            maxWidth: '400px'
          }}>
            We apologize for the inconvenience. Please try refreshing the page or returning to the homepage.
          </p>
          <a
            href="/"
            style={{
              display: 'inline-block',
              backgroundColor: '#1C1B1A',
              color: '#FFFFFF',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              padding: '14px 32px',
              borderRadius: '25px',
              textDecoration: 'none',
              transition: 'all 0.3s'
            }}
          >
            Return to Home
          </a>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
