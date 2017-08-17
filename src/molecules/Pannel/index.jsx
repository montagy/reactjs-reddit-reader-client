import React from 'react';
import styles from './index.css';
import classNames from 'classnames';
import global from '../../global';

class Pannel extends React.Component {
  state = {
    value: '',
  };
  handleChange = (e) => {
    this.setState({ value: e.target.value});
  }
  handleSubmit = (e) => {
    e.preventDefault();
  }
  render() {
    const { className, ...props } = this.props;
    const cls = classNames({
      [className]: true,
      [styles.pannel]: true,
    });
    const list = global.subReddits.map((name, index) =>
      <div key={index}>name</div>,
    );
    return (
      <div className={cls} {...props}>
        <div>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="reddit"
              onChange={this.handleChange}
            />
            <button>-></button>
          </form>
          {list}
        </div>
      </div>
    );
  }
}

export default Pannel;
