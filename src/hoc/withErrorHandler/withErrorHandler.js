import React, {Component, Fragment} from 'react';

import Modal from '../../components/UI/Modal/Modal';


const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: false,
      errorMessage: null
    };

    componentWillMount () {
      this.reqInterceptor = axios.interceptors.request.use(req => req, err => {
        if (err) {
          this.setState({errorMessage: err.message, error: true});
        }
        return err;
      });
      this.resInterceptor = axios.interceptors.response.use(res => res, err => {
        if (err) {
          this.setState({errorMessage: err.message, error: true});
        }
        return err;
      });
    }

    componentWillUnmount () {
      axios.interceptors.response.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmHandler = () => this.setState({error: false});

    render () {
      return (
        <Fragment>
          <Modal show={this.state.error} clickedOutSide={this.errorConfirmHandler}>
            {this.state.errorMessage}
          </Modal>
          <WrappedComponent {...this.props} />
        </Fragment>
      );
    }
  }
};

export default withErrorHandler;
