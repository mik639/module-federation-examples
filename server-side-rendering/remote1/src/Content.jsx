import React from 'react';
import {useEffect} from 'react';

// import css from './styles.css';

export default () => {
  useEffect(() => {
    console.log('Remote 2 Mounted');
  }, []);
  return (
    <div
      style={{
        backgroundColor: 'green',
        color: 'lightgrey',
        padding: '1rem',
      }}
    >
      <h2 className='header'>Remote 1: Content</h2>
      <p>
        This is the content from remote 1, which will include an image component exposed by remote2.
        This demonstrates nested federated modules being rendered server-side.
      </p>
    </div>
  );
};
