import * as React from 'react';
import './gifs.scss';

interface GifsProps {
  apiKey: string;
}

export const Gifs = (props: GifsProps) => {
  const [gifs, setGifs] = React.useState([]);
  const [text, setText] = React.useState('');

  React.useEffect(
    () => {
      // No point in searching API if we 're not going to get requests anyway.
      if (!text) {
        setGifs([]);
      } else {
        fetch(
          `https://api.giphy.com/v1/gifs/search?api_key=${
            props.apiKey
          }&q=${text}`
        )
          .then(r => r.json())
          .then(json => {
            setGifs(
              json.data.map(x => ({
                id: x.id,
                preview: x.images.preview_gif,
                url: x.url
              }))
            );
          });
      }
    },
    [text]
  );

  return (
    <React.Fragment>
      <h1>GIF Search</h1>
      <input
        className="gif-search-input"
        autoFocus
        placeholder="Start typing..."
        onChange={evt => setText(evt.target.value)}
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
