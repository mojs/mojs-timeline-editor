/* Function to parse a string and suppress `classNames` with `hash names`
   from the `CLASSES`. If there is no such `hash name` - leave the className
   as is.
*/
export default function classNames(CLASSES) {
  return (attrs) => {
    if (!attrs || (!attrs.class && !attrs.className)) { return; }
    const string = (attrs.class || attrs.className).trim();
    const split = string.split(' ');

    let str = '';
    for (let i = 0; i < split.length; i++) {
      const className = split[i];
      if (className) {
        const hash = CLASSES[className];
        str += `${(hash == null) ? className : hash} `;
      }
    }
    if (attrs.class) { attrs.class = str; }
    else { attrs.className = str; }
  };
}
