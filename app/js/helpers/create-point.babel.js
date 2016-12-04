
import md5 from 'md5';

export default (data, i=0) => {
  const { x, y, time, name } = data;

  return {
    id:         md5( `${Math.random()}${Math.random()}` ),
    name:       name || `point${i+1}`,
    isOpen:     true,
    isSelected: true,
    props: {
      x: {
        currentSpot: 0,
        spots: [
          { value: x || 0, time: time || 0 },
          { value: 100, time: time || parseInt(Math.random()*2000, 10) },
          { value: 150, time: time || parseInt(Math.random()*4000, 10) }
        ]
      },
      y: {
        currentSpot: 0,
        spots: [
          { value: y || 0, time: time || 0 },
          { value: 200, time: time || parseInt(Math.random()*1500, 10) },
          { value: 300, time: time || parseInt(Math.random()*3000, 10) }
        ]
      }
    }
  };
};
