import { createElement, createFragment } from '../../framework';

export default function Footer() {
  return (
    <footer>
      <p>
        Made by <a href={'https://github.com/BlueLamantine'}>BlueLamantine </a>/
        <span>
          <a href={'https://kottans.org/'}> Kottans</a> JS course
        </span>
      </p>
      <p>&copy; 2021 GamesNewsFeed App</p>
      <p>
        *incorrect data in some cases may provide with{' '}
        <a
          href={
            'https://https://developer.valvesoftware.com/wiki/Steam_Web_API#GetNewsForApp_.28v0001.29'
          }
        >
          STEAM API
        </a>{' '}
      </p>
    </footer>
  );
}
