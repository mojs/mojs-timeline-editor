

export default (data) => {
  const { x, y, time } = data;

  return {
    name: data.name || 'point 1',
    spots: [
      { x: x || 0,
        y: y || 0,
        time: time || 0
      }
    ]
  };
};
