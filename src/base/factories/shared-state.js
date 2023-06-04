import { useState, useEffect } from 'react';

export const createSharedState = initialState => {
  const subscribers = [];
    
  return function(){
    const hook = useState(handleInitialState(subscribers, initialState));
    const setState = newState => {
      subscribers.forEach(subscriber => subscriber[1](newState));
    };
    useEffect(() => {
      subscribers.push(hook);
      return () => subscribers.splice(subscribers.indexOf(hook), 1);
    }, []);
    return [hook[0], setState];
  };
};

function handleInitialState([firstSubscriber], initialState){
  return firstSubscriber ? copy(firstSubscriber[0]) : initialState;
}

function copy(data){
  JSON.parse(JSON.stringify(data));
}
