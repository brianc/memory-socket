var MemorySocket = require(__dirname + '/../lib')

describe('MemorySocket', function() {
  describe('emitSoon', function() {
    describe('emitting one event', function() {
      var socket = new MemorySocket();

      it('emits data once', function(done) {
        socket.emitSoon('data', 'hi')
        socket.once('data', function(data) {
          data.should.equal('hi');
          done();
        })
      })

      it('emits new data second time', function(done) {
        socket.emitSoon('data', 'bye');
        socket.on('data', function(data) {
          data.should.equal('bye');
          done();
        })
      })
    })
  })

  describe('socket api', function() {
    var socket = new MemorySocket();
    it('has setEncoding', function() {
      socket.setEncoding('utf8');
      socket.encoding.should.equal('utf8');
      socket.setEncoding('ascii');
      socket.encoding.should.equal('ascii');
    })
  })
})
