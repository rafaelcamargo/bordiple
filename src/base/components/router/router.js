import { BrowserRouter } from 'react-router-dom';
export * from 'react-router-dom';

export const CustomRouter = ({ children }) => {
  return (
    <BrowserRouter>
      {children}
    </BrowserRouter>
  );
};
