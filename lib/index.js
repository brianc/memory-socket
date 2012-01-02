var util = require('util');
var EventEmitter = require('events').EventEmitter;

var MemorySocket = function() {
  EventEmitter.call(this);
  this.outgoing = [];
  this.data = [];
}

util.inherits(MemorySocket, EventEmitter);

//emit data on process.nextTick
MemorySocket.prototype.emitSoon = function() {
  var self = this;
  if(arguments.length) {
    this.outgoing.push(arguments);
  }
  process.nextTick(function() {
    var args = self.outgoing.shift();
    if(args) {
      self.emit.apply(self, args);
      self.emitSoon();
    }
  })
}

MemorySocket.prototype.connect = function(port, host, connectListener) {
  this.port = port;
  if('function' === typeof host) {
    connectListener = host;
  }
  else if('function' === typeof connectListener) {
    this.on('connect', connectListener);
  }
  this.host = host;
}

MemorySocket.prototype.write = function(data) {
  this.data.push(data);
}

module.exports = MemorySocket;
