'use strict';

const assert = require('chai').assert;
const expect = require('chai').expect;
const sinon = require('sinon');

const superagent = require('superagent');

class Test {
  constructor(handler){
    this.foo = handler.doSomething(function(){
        console.error('aaa');
    }, 'yes');
  }
  getFoo(){
    return this.foo;
  }
}

describe('Array', function() {

  let sandbox, handlerSpy, handlerMock, doSomethingStub;

  describe('#indexOf()', function () {

    beforeEach(function(){
      sandbox = sinon.sandbox.create();
    });

    afterEach(function () {
      sandbox.restore();
    });

    it('should return -1 when the value is not present', sinon.test(function () {

      expect(2).to.equal(2);

      var module = {
        doSomething: () => {}
      };
      var doSomethingStub = sinon.stub(module, 'doSomething');

      doSomethingStub.returns({ one: 1, two: 2});

      sinon.stub(console, 'error');

      const test = new Test(module);

      expect(test.getFoo()).to.deep.equal({ one: 1, two: 2});

      module.doSomething.args[0][0]();

      sinon.assert.calledOnce(module.doSomething);
      sinon.assert.callCount(module.doSomething, 1)
      expect(module.doSomething.calledWithExactly(sinon.match.func, sinon.match.string)).to.be.true;

      expect(console.error.calledWithExactly('aaa')).to.be.true;
    }));
  });
});
