// import C from '../constants';

export default (o={}) => {
  return {
    time:       0,
    value:      0,
    connected:  null,
    isSelected: false,
    ...o
  };
};
