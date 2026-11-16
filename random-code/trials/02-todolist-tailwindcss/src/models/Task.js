export class Task {
  /**
   * @type {number}
   */
  id;

  /**
   * @type {string}
   */
  title;

  /**
   * @type {boolean}
   */
  isCompleted;

  /**
   * @param {number} id
   * @param {string} title
   * @param {boolean} [isCompleted]
   */
  constructor(id = Number(Date.now()), title, isCompleted = false) {
    this.id = id;
    this.title = title;
    this.isCompleted = isCompleted;
  }
}
