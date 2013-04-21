var kd = (function (keysDown) {

  'use strict';

  var kd = {};
  kd.Key = Key;

  var isRunning = false;


  /**
   * Evaluate which keys are held down and invoke their handler functions.
   */
  kd.tick = function () /*!*/ {
    var i, len = keysDown.length;
    for (i = 0; i < len; i++) {
      var keyCode = keysDown[i];

      var keyName = TRANSPOSED_KEY_MAP[keyCode];
      if (keyName) {
        kd[keyName].down();
      }
    }
  };


  /**
   * A basic run loop.  `handler` gets called approximately 60 times a second.
   *
   * @param {function} handler The function to call on every tick.  You almost certainly want to call `kd.tick` in this function.
   */
  kd.run = function (handler) /*!*/ {
    isRunning = true;

    util.requestAnimationFrame.call(window, function () {
      if (!isRunning) {
        return;
      }

      kd.run(handler);
      handler();
    });
  };


  /**
   * Cancels the loop created by [`kd.run`](#run).
   */
  kd.stop = function () /*!*/ {
    isRunning = false;
  };


  // SETUP
  //


  // Initialize the KEY Objects
  util.forEach(KEY_MAP, function (keyCode, keyName) {
    kd[keyName] = new Key();
  });

  util.on(window, 'keydown', function (evt) {
    util.pushUnique(keysDown, evt.keyCode);
  });

  util.on(window, 'keyup', function (evt) {
    var keyCode = util.removeValue(keysDown, evt.keyCode);

    var keyName = TRANSPOSED_KEY_MAP[keyCode];
    if (keyName) {
      kd[keyName].up();
    }
  });


  return kd;

/*!
 * The variables passed into the closure here are defined in kd.key.js.
 */ /*!*/
}(keysDown));
