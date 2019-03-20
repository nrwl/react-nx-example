import * as React from 'react';
import { useCallback, useEffect } from 'react';
import axios from 'axios';
import './gifs.scss';

interface GifsProps {
  apiKey: string;
}

export const Gifs = (props: GifsProps) => {
  const [gifs, setGifs] = React.useState([]);
  const [query, setQuery] = React.useState('');

  const getFetchUrl = useCallback(
    () =>
      `https://api.giphy.com/v1/gifs/search?api_key=${props.apiKey}&q=${query}`,
    [query]
  );

  useEffect(
    () => {
      async function fetchData() {
        const result = await axios(getFetchUrl());
        setGifs(
          result.data.data.map(x => ({
            id: x.id,
            preview: x.images.preview_gif,
            url: x.url
          }))
        );
      }

      fetchData();
    },

    [getFetchUrl]
  );

  return (
    <React.Fragment>
      <h1>GIF Search</h1>
      <input
        className="gif-search-input"
        autoFocus
        placeholder="Start typing..."
        onChange={evt => setQuery(evt.target.value)}
      />
      <div className="gif-list">
        {gifs.map(gif => (
          <div className="gif-list-item" key={gif.id}>
            <a href={gif.url} target="_blank" rel="noopener">
              <img src={gif.preview.url} />
            </a>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};
