import Pagination from 'tui-pagination'; /* ES6 */

// const Pagination = tui.Pagination;
const Pagination = require('tui-pagination'); /* CommonJS */

const container = document.getElementById('tui-pagination-container');
const instance = new Pagination(container, {});

instance.getCurrentPage();
