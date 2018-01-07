import PubSub from 'PubSub';
import React from 'react';

const channel = new PubSub();

export const emit = (event, data) => {
  channel.publish(event, data);
};

export const subscribe = (event, handler) => {
  return channel.subscribe(event, function(data) {
    handler(data);
  });
};

export const unsubscribe = token => {
  channel.unsubscribe(token);
};

export const withSubscriptions = subscriptions => WrappedComponent => {
  const subscriptionsTokens = [];

  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    componentDidMount() {
      Object.keys(subscriptions).forEach(event => {
        const handler = subscriptions[event];
        const token = subscribe(event, data => {
          const state = handler(data);
          this.setState(state);
        });
        subscriptionsTokens.push(token);
      });
    }

    componentWillUnmount() {
      subscriptionsTokens.forEach(token => {
        unsubscribe(token);
      });
    }

    render() {
      const props = { ...this.props, ...this.state };

      return <WrappedComponent {...props} />;
    }
  };
};
