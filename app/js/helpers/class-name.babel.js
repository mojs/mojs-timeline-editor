
export default (CLASS) => {
  return (string) => {
    string = string.trim();
    string = string.replace(/\s+/, ' ');

    const split = string.split(' ');
    let str = '';
    for (let i = 0; i < split.length; i++) {
      const className = split[i];
      if (className) {
        str += `${CLASS[className]} `;
      }
    }
    return str;
  };
};
