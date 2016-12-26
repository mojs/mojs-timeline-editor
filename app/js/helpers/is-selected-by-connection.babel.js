

export default (meta, selectedSpot, points) => {
  const {id, spotIndex, type: selType, prop } = selectedSpot;
  const pointsLen = Object.keys(points).length;
  const spot = points[id].props[prop][spotIndex][selType];

  let isSelected = false;
  if (spot.connected === 'prev' && spotIndex >= 1) {
    isSelected = (meta.spotIndex === spotIndex-1 &&
                  meta.id     === id &&
                  meta.type   === 'end' &&
                  meta.prop   === prop
                  );
  }

  if (spot.connected === 'next' && spotIndex <= pointsLen-1) {
    isSelected = (meta.spotIndex === spotIndex+1 &&
                  meta.id     === id &&
                  meta.type   === 'start' &&
                  meta.prop   === prop
                );
  }
  return isSelected;
};
