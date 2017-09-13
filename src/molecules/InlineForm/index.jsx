import React from 'react';
import styles from './index.css';
import { formatInput } from '../../utils';
import Button from '../../atoms/Button';
import Input from '../../atoms/Input';

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
      <form onSubmit={this.handleSubmit} className={styles.inlineForm}>
        <div className={styles.formControl}>
          <Input
            type="text"
            placeholder="sub reddit"
            onChange={this.handleChange}
            value={this.state.value}
            required
          />
        </div>
        <Button>Go</Button>
      </form>
    );
  }
}
export default InlineForm;
