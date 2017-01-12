import isString from '../is-string';

/* Function to override string `ref` with automatic function. */
export default function refs(attrs, CLASSES) {
  if (!attrs) { return; }
  const {ref} = attrs;
  if (!ref || typeof ref === 'function') { return; }

  if (isString(ref)) { attrs.ref = el => this[ref] = el; }
}
