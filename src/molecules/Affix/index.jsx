import React, { Component } from 'react';
import throttle from 'lodash/throttle';

class Affix extends Component {
  state = {
    active: false,
  };
  onScroll = throttle(() => {
    if (document.body.scrollTop > 500) {
      this.setState({ active: true });
    } else {
      this.setState({ active: false });
    }
  }, 1000);
  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }
  render() {
    const { children, ...props } = this.props;
    const { active } = this.state;
    const style = {
      active: {
        position: 'fixed',
        display: 'block',
        right: '5%',
        bottom: '20%',
      },
      notActive: {
        display: 'none',
      },
    };
    return (
      <div style={active ? style.active : style.notActive} {...props}>
        {children}
      </div>
    );
  }
}
export default Affix;
