import React, { Component } from 'react';
import { KeyLockService } from '../../services';
import { API } from '../../utility';
import { Preloader } from '../index';
import { UnlockPage } from './components';

interface State {
  loading: boolean;
  locked: boolean;
  show: boolean;
  error: string;
  values: string[];
}

interface Props {
  page: string;
  children: React.ReactNode;
}

class PageLocking extends Component<Props, State> {
  state = {
    loading: true,
    error: '',
    locked: false,
    show: false,
    values: [],
  };

  componentDidMount(): void {
    const keyLockService = KeyLockService.getInstance();
    keyLockService.observable.subscribe((keyLocks) => {
      const keys: string[] = [];
      keyLocks.forEach((keyLock) => {
        keys.push(keyLock.key);
      });

      this.setState({
        loading: false,
        locked: keys.includes(this.props.page),
        show: keys.includes(this.props.page),
      });
    });
  }

  onSubmit = (password: string) => {
    API.Auth.keyLockVerify({
      key: this.props.page,
      password,
    })
      .then((response) => {
        console.log(response);
        this.setState({
          locked: false,
          show: false,
        });
      })
      .catch((e) => {
        console.error(e.response);
        this.setState({
          error: 'Invalid Password',
        });
      });
  };
  onHide = () => {
    console.log('OnHide Event');
    this.setState({
      show: false,
    });
  };

  render(): React.ReactNode {
    if (this.state.loading) {
      return <Preloader />;
    } else if (this.state.locked) {
      return (
        <>
          <UnlockPage
            show={this.state.show}
            error={this.state.error}
            onSubmit={this.onSubmit}
            onHide={this.onHide}
          />
        </>
      );
    } else {
      return this.props.children;
    }
  }
}

export default PageLocking;
