import * as React from 'react';
import './home.scss';

// interface HomeProps {
//   children?: React.ReactNode
// }

export const Home = props => {
  return (
    <div>
      <h1>Home</h1>
      <p>It works!</p>
      {props.children}
    </div>
  );
};
