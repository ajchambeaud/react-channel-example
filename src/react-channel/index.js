import PubSub from 'PubSub';
import React from 'react';

const channel = new PubSub();

export const emit = (event, data) => {
  channel.publish(event, data);
};

export const subscribe = (event, handler) => {
  channel.subscribe(event, function(data) {
    handler(data);
  });
};

export const withSubscriptions = subscriptions => WrappedComponent => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    componentDidMount() {
      Object.keys(subscriptions).forEach(event => {
        const handler = subscriptions[event];
        subscribe(event, data => {
          const state = handler(data);
          this.setState(state);
        });
      });
    }

    render() {
      const props = { ...this.props, ...this.state };

      return <WrappedComponent {...props} />;
    }
  };
};
