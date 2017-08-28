import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { formatInput } from '../../utils';

class InlineForm extends React.Component {
  state = {
    value: '',
  };
  handleChange = e => {
    this.setState({ value: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { history } = this.context.router;
    const value = formatInput(this.state.value);
    history.push(`/r/${value}`);
    this.setState({
      value: '',
    });
  };
  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.shape({
        push: PropTypes.func.isRequired,
      }).isRequired,
    }).isRequired,
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className={styles.formControl}>
          <input
            type="text"
            placeholder="sub reddit"
            onChange={this.handleChange}
            value={this.state.value}
            required
          />
          <button type="submit" className={styles.btn}>GO</button>
        </div>
        <div></div>
      </form>
    );
  }
}
export default InlineForm;
