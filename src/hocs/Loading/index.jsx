import React from 'react';
import styles from './index.css';

const withLoading = fetchData => BaseComponent => {
  class Loading extends React.Component {
    state = {
      loading: true,
      data: {},
    };
    handleLoading = () => {
      // just toggle the status
      this.setState(prevState => ({
        loading: !prevState.loading,
      }));
    };
    componentDidMount() {
      fetchData().then(json => {
        this.setState({
          loading: false,
          data: json,
        });
      });
    }
    render() {
      return this.state.loading
        ? <div className={styles.loading} />
        : <BaseComponent data={this.state.data} {...this.props} />;
    }
  }
  Loading.displayName = 'withLoading';
  return Loading;
};
export default withLoading;
