import { useState, useEffect } from 'react';

const subscribers = [];
  
export const useSharedBorders = () => {
  const hook = useState(buildInitialBorders());
  useEffect(() => {
    subscribers.push(hook);
    return () => subscribers.splice(subscribers.indexOf(hook), 1);
  }, []);
  return { borders: hook[0] };
};

function buildInitialBorders(){
  return [
    { width: 10, color: '#DC424E' },
    { width: 10, color: '#F48554' },
    { width: 10, color: '#FDBF59' },
  ];
}
