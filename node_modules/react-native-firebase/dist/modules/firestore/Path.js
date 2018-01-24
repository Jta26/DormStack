/**
 * 
 * Path representation wrapper
 */

/**
 * @class Path
 */
export default class Path {

  constructor(pathComponents) {
    this._parts = pathComponents;
  }

  get id() {
    if (this._parts.length > 0) {
      return this._parts[this._parts.length - 1];
    }
    return null;
  }

  get isDocument() {
    return this._parts.length > 0 && this._parts.length % 2 === 0;
  }

  get isCollection() {
    return this._parts.length % 2 === 1;
  }

  get relativeName() {
    return this._parts.join('/');
  }

  child(relativePath) {
    return new Path(this._parts.concat(relativePath.split('/')));
  }

  parent() {
    if (this._parts.length === 0) {
      return null;
    }

    return new Path(this._parts.slice(0, this._parts.length - 1));
  }

  /**
   *
   * @package
   */
  static fromName(name) {
    const parts = name.split('/');

    if (parts.length === 0) {
      return new Path([]);
    }
    return new Path(parts);
  }
}