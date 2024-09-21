/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// ErrorBoundary.jsx
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Log the error to an external service, if needed
    console.error("Error caught by ErrorBoundary:", error, info);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Oops! Something went wrong.</h1>
          <p>Please try refreshing the page.</p>
          <button onClick={this.handleReload}>Reload Page</button>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
