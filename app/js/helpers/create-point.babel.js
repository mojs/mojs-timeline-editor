

export default (data) => {
  const { x, y, time, name } = data;

  return {
    name:       name || 'point 1',
    isOpen:     true,
    isSelected: true,
    spots: [
      { x:          x || 0,
        y:          y || 0,
        time:       time || 0
      }
    ]
  };
};
