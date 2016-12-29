import md5 from 'md5';

export default () => { return md5( `${Math.random()}${Math.random()}` ); };
