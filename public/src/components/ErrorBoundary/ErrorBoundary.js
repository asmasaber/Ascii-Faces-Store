import React from 'react';
import { ErrorPlaceholder } from '../ErrorPlaceholder/ErrorPlaceholder';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    this.setState({ error, info });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="errorMessage">
          <ErrorPlaceholder>
            <details style={{ whiteSpace: 'pre-wrap' }}>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.info && this.state.info.componentStack}
            </details>
          </ErrorPlaceholder>
        </div>
      );
    }

    return this.props.children; 
  }
}

export { ErrorBoundary };