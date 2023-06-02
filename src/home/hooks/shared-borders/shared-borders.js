import { useState, useEffect } from 'react';

const subscribers = [];
  
export const useSharedBorders = () => {
  const hook = useState(buildInitialBorders());
  const setBorders = newBorders => {
    subscribers.forEach(subscriber => subscriber[1](newBorders));
  };
  useEffect(() => {
    subscribers.push(hook);
    return () => subscribers.splice(subscribers.indexOf(hook), 1);
  }, []);
  return { borders: hook[0], setBorders };
};

function buildInitialBorders(){
  return [
    { width: 5, color: '#DC424E' },
    { width: 5, color: '#F48554' },
    { width: 5, color: '#FDBF59' },
  ];
}
