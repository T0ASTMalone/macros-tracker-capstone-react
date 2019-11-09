import React from 'react';
import PropTypes from 'prop-types';
import './Register.css';

class RegisterError extends React.Component {
  render() {
    if (!this.props.hasError || this.props.touched === false) {
      return <></>;
    } else return <div className="err">{this.props.hasError}</div>;
  }
}

RegisterError.propTypes = {
  hasError: PropTypes.string,
  touched: PropTypes.bool
};

export default RegisterError;
