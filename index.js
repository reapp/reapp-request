var Parseurl = require('parseurl');
var Superagent = require('superagent');
var { Promise } = require('bluebird');

require('superagent-bluebird-promise');

// an in-progress client that attempts to simplify isomorphism
// how? cache at the client level, rather than store level.
// this keeps your stores completely simple, and keeps data-fetching
// logic at the request level.

// todo: localforage/storage support

class Client {
  constructor({ base }) {
    this.base = base || '';
    this.requests = {};
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

    if (!opts.nocache && this.requests[url])
      return Promise.resolve(this.requests[url]);
    else
      return Superagent.get(this.getUrl(url)).promise().then(
        res => {
          this.requests[url] = res.body;
          return res.body;
        },
        error
      );
  }

  // todo: post, etc
}

function error(err) {
  throw new Error(err);
}

module.exports = Client;