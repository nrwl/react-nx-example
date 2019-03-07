import * as React from 'react';
import "./home.scss";

export const Home = (props) => {
  return (
    <div>
      <h1>Home</h1>
      <p>It works!</p>
      { props.children }
    </div>
  )
}
