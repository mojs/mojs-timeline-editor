
/* Function to clamp some value
  @param {Number} Value to clamp.
  @param {Number} Min clamp bound.
  @param {Number} Max clamp bound.
  @returns {Number} Clamped value.
*/

const clamp = (value, min, max) => {
  return Math.min(Math.max(value, min), max);
};

export default clamp;
