var Parseurl = require('parseurl');
var Superagent = require('superagent');
var { Promise } = require('bluebird');
// var { localStorage } = window;

require('superagent-bluebird-promise');

var cache = window._request_cache = {};

class Client extends Superagent {
  constructor({ base }) {
    this.base = base;
    this.requests = {}; // todo: caching
  }

  setBase(url) {
    this.base = url;
  }

  getUrl(url) {
    var host = new Parseurl(url).host;
    return host ? url : this.base + url;
  }

  get(url, opts) {
    opts = opts || {};

    if (!opts.nocache && cache[url])
      return Promise.resolve(cache[url]);
    else
      return super(this.getUrl(url)).promise().then(
        res => {
          cache[url] = res.body;
          return res.body;
        },
        error
      );
  }
}

function error(err) {
  throw new Error(err);
}

module.exports = Client;