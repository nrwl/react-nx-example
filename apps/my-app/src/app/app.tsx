import * as React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { Home } from '@my-app/home';
import { Gifs } from '@my-app/gifs';
import './app.scss';

// Bring in the environment file that holds our giphy API key.
// This file is replaced with `environment.prod.ts` automatically when building for production.
import { environment } from '../environments/environment';

export const App = () => (
  <BrowserRouter>
    <div className="app">
      <nav className="app-nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/gifs">Search GIFs</Link>
          </li>
        </ul>
      </nav>
      <div className="app-content">
        <Route path="/" exact component={Home} />
        <Route
          path="/gifs"
          render={() => <Gifs apiKey={environment.giphy.apiKey} />}
        />
      </div>
    </div>
  </BrowserRouter>
);
