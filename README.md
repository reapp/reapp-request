## reapp-request

An early-stage library (unfinished) that wants to help package together a nice
isomorphic request module. For now there are a few options including
superagent, request, and cujojs/rest.

Superagent works nicely but doesn't have promise support, but there
is a good library superagent-bluebird-proimise, so for now we just extend
that.

The others also either bundle their own promise library or have separate
modules for them, but are bulky or tied to their promise library.

The goal here is to take the nice and small surface of superagent with
superagent-bluebird-promise, and add on caching and offline support, eventually.
