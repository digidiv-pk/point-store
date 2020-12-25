import React, { Component } from 'react';
import classes from './Loading.module.scss';

class Loading extends Component<any, any> {
  componentDidMount(): void {
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount(): void {
    document.body.style.overflow = 'auto';
  }

  render(): JSX.Element {
    return (
      <div className={classes.loading}>
        <div className={classes.loader} />
      </div>
    );
  }
}

export default Loading;
