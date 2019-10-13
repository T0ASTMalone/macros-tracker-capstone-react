import React from 'react';
import PropTypes from 'prop-types';

class SignInError extends React.Component {
  render() {
    if (!this.props.hasError || this.props.touched === false) {
      return <></>;
    } else return <div className="error">{this.props.hasError}</div>;
  }
}

SignInError.propTypes = {
  hasError: PropTypes.string,
  touched: PropTypes.bool
};

export default SignInError;
