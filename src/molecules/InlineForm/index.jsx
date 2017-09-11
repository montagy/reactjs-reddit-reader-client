import React from 'react';
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
    const value = formatInput(this.state.value);
    this.props.onSubmit(value);
    this.setState({
      value: '',
    });
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
        <div />
      </form>
    );
  }
}
export default InlineForm;
