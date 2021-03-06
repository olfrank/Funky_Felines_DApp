#!/usr/bin/env node

(function(e, a) { for(var i in a) e[i] = a[i]; if(a.__esModule) Object.defineProperty(e, "__esModule", { value: true }); }(exports,
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 316497:
/***/ ((__unused_webpack_module, exports) => {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.

function isArray(arg) {
  if (Array.isArray) {
    return Array.isArray(arg);
  }
  return objectToString(arg) === '[object Array]';
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = Buffer.isBuffer;

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


/***/ }),

/***/ 888638:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var checkParameters = __webpack_require__(277357)
var defaultEncoding = __webpack_require__(812368)
var sync = __webpack_require__(367493)
var Buffer = __webpack_require__(289509).Buffer

var ZERO_BUF
var subtle = global.crypto && global.crypto.subtle
var toBrowser = {
  'sha': 'SHA-1',
  'sha-1': 'SHA-1',
  'sha1': 'SHA-1',
  'sha256': 'SHA-256',
  'sha-256': 'SHA-256',
  'sha384': 'SHA-384',
  'sha-384': 'SHA-384',
  'sha-512': 'SHA-512',
  'sha512': 'SHA-512'
}
var checks = []
function checkNative (algo) {
  if (global.process && !global.process.browser) {
    return Promise.resolve(false)
  }
  if (!subtle || !subtle.importKey || !subtle.deriveBits) {
    return Promise.resolve(false)
  }
  if (checks[algo] !== undefined) {
    return checks[algo]
  }
  ZERO_BUF = ZERO_BUF || Buffer.alloc(8)
  var prom = browserPbkdf2(ZERO_BUF, ZERO_BUF, 10, 128, algo)
    .then(function () {
      return true
    }).catch(function () {
      return false
    })
  checks[algo] = prom
  return prom
}

function browserPbkdf2 (password, salt, iterations, length, algo) {
  return subtle.importKey(
    'raw', password, {name: 'PBKDF2'}, false, ['deriveBits']
  ).then(function (key) {
    return subtle.deriveBits({
      name: 'PBKDF2',
      salt: salt,
      iterations: iterations,
      hash: {
        name: algo
      }
    }, key, length << 3)
  }).then(function (res) {
    return Buffer.from(res)
  })
}

function resolvePromise (promise, callback) {
  promise.then(function (out) {
    process.nextTick(function () {
      callback(null, out)
    })
  }, function (e) {
    process.nextTick(function () {
      callback(e)
    })
  })
}
module.exports = function (password, salt, iterations, keylen, digest, callback) {
  if (typeof digest === 'function') {
    callback = digest
    digest = undefined
  }

  digest = digest || 'sha1'
  var algo = toBrowser[digest.toLowerCase()]

  if (!algo || typeof global.Promise !== 'function') {
    return process.nextTick(function () {
      var out
      try {
        out = sync(password, salt, iterations, keylen, digest)
      } catch (e) {
        return callback(e)
      }
      callback(null, out)
    })
  }

  checkParameters(password, salt, iterations, keylen)
  if (typeof callback !== 'function') throw new Error('No callback provided to pbkdf2')
  if (!Buffer.isBuffer(password)) password = Buffer.from(password, defaultEncoding)
  if (!Buffer.isBuffer(salt)) salt = Buffer.from(salt, defaultEncoding)

  resolvePromise(checkNative(algo).then(function (resp) {
    if (resp) return browserPbkdf2(password, salt, iterations, keylen, algo)

    return sync(password, salt, iterations, keylen, digest)
  }), callback)
}


/***/ }),

/***/ 697610:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(20406);

const IPC = __webpack_require__(775898).IPC;
const Ganache = __webpack_require__(968321);
const path = __webpack_require__(385622);
const debug = __webpack_require__(905845);

/*
 * Loggers
 */
const ipcDebug = debug("chain:ipc");

/*
 * Options
 */

// This script is expected to take two arguments: The first a networkName string,
// the second an options string encoded as base64.
// The options string is decoded, parsed, & then passed to Ganache.server().
const args = process.argv.slice(2);
const ipcNetwork = args[0];
const base64OptionsString = args[1];
const optionsBuffer = Buffer.from(base64OptionsString, "base64");
let optionsString = optionsBuffer.toString();
let options;

try {
  options = JSON.parse(optionsString);
} catch (e) {
  throw new Error(
    "Fatal: Error parsing arguments; please contact the Truffle developers for help."
  );
}

options.time = options.time ? new Date(options.time) : new Date();

/*
 * Logging
 */

// constructor
class Logger {
  constructor() {
    this.messages = [];

    this.nextSubscriberID = 1;
    this.subscribers = {};
  }

  // subscribe to log events with provided callback
  // sends prior unsent messages, as well as new messages
  // returns `unsubscribe` cleanup function
  subscribe(callback) {
    // flush messages
    const messages = this.messages;
    this.messages = [];
    messages.forEach(message => {
      callback(message);
    });

    // save subscriber
    const subscriberID = this.nextSubscriberID++;
    this.subscribers[subscriberID] = callback;

    // return cleanup func
    const unsubscribe = () => {
      delete this.subscribers[subscriberID];
    };

    return unsubscribe;
  }

  // log a message to be sent to all active subscribers
  // buffers if there are no active subscribers (to send on first subscribe)
  log(message) {
    const subscriberIDs = Object.keys(this.subscribers);
    if (subscriberIDs.length === 0) {
      this.messages.push(message);

      return;
    }

    subscriberIDs.forEach(subscriberID => {
      const callback = this.subscribers[subscriberID];

      callback(message);
    });
  }
}

/*
 * Supervisor
 */

// constructor - accepts an object to assign to `ipc.config`
class Supervisor {
  constructor(ipcConfig) {
    // init IPC
    this.ipc = new IPC();
    // set config
    Object.keys(ipcConfig).forEach(key => {
      this.ipc.config[key] = ipcConfig[key];
    });

    this.mixins = [];
  }

  // include mixin
  use(mixin) {
    this.mixins.push(mixin);
  }

  // dispatch event to all relevant mixins (ones that define `event` method)
  handle(event, args) {
    args = Array.prototype.slice.call(args);

    this.mixins.forEach(mixin => {
      if (mixin[event]) {
        mixin[event].apply(mixin, [this].concat(args));
      }
    });
  }

  // start the IPC server and hook up all the mixins
  start() {
    const self = this;
    const ipc = this.ipc;

    // socket filename
    const dirname = ipc.config.socketRoot;
    const basename = `${ipc.config.appspace}${ipc.config.id}`;
    const servePath = path.join(dirname, basename);

    ipc.serve(servePath, function() {
      self.handle("start", arguments);

      ipc.server.on("connect", function() {
        self.handle("connect", arguments);
      });

      ipc.server.on("socket.disconnected", function() {
        self.handle("disconnect", arguments);
      });
    });

    ipc.server.start();
  }

  // external interface for mixin to emit socket events
  emit(socket, message, data, options = {}) {
    options.silent = options.silent || false;

    // possibly override silent
    const currentlySilent = this.ipc.config.silent;
    if (options.silent) {
      this.ipc.config.silent = true;
    }

    this.ipc.server.emit(socket, message, data);

    // reset
    this.ipc.config.silent = currentlySilent;
  }

  // external interface for mixin to exit
  exit() {
    this.ipc.server.stop();
    this.handle("exit", arguments);
  }
}

/*
 * Lifecycle
 * (quit on last connection)
 */
class LifecycleMixin {
  // start counting active connections
  start(_supervisor) {
    this.connections = 0;
  }

  // increment
  connect(_supervisor) {
    this.connections++;
  }

  // decrement - invoke supervisor exit if no connections remain
  disconnect(supervisor) {
    this.connections--;

    if (this.connections <= 0) {
      supervisor.exit();
    }
  }
}

/*
 * Ganache Server
 */

// constructor - accepts options for Ganache
class GanacheMixin {
  constructor(options) {
    this.ganache = Ganache.server(options);
  }

  // start Ganache and capture promise that resolves when ready
  start(_supervisor) {
    this.ready = new Promise((accept, reject) => {
      this.ganache.listen(options.port, options.hostname, (err, state) => {
        if (err) {
          reject(err);
        }

        accept(state);
      });
    });
  }

  // wait for Ganache to be ready then emit signal to client socket
  connect(supervisor, socket) {
    this.ready.then(() => {
      supervisor.emit(socket, "truffle.ready");
    });
  }

  // cleanup Ganache process on exit
  exit(_supervisor) {
    this.ganache.close(err => {
      if (err) {
        console.error(err.stack || err);
        process.exit(1);
      } else {
        process.exit();
      }
    });
  }
}

/*
 * Logging over IPC
 */

// constructor - takes Logger instance and message key (e.g. `truffle.ipc.log`)
class LoggerMixin {
  constructor(logger, message) {
    this.logger = logger;
    this.message = message;
  }

  // on connect, subscribe client socket to logger
  connect(supervisor, socket) {
    const unsubscribe = this.logger.subscribe(data => {
      supervisor.emit(socket, this.message, data, { silent: true });
    });

    socket.on("close", unsubscribe);
  }
}

/*
 * Process event handling
 */
process.on("uncaughtException", ({ stack }) => {
  console.error(stack);
  process.exit(1);
});

/*
 * Main
 */
const ipcLogger = new Logger();
const ganacheLogger = new Logger();

const supervisor = new Supervisor({
  appspace: "truffle.",
  id: ipcNetwork,
  retry: 1500,
  logger: ipcLogger.log.bind(ipcLogger)
});

ipcLogger.subscribe(ipcDebug);

options.logger = { log: ganacheLogger.log.bind(ganacheLogger) };

supervisor.use(new LifecycleMixin());
supervisor.use(new GanacheMixin(options));
supervisor.use(new LoggerMixin(ipcLogger, "truffle.ipc.log"));
supervisor.use(new LoggerMixin(ganacheLogger, "truffle.ganache.log"));
supervisor.start();


/***/ }),

/***/ 742357:
/***/ ((module) => {

"use strict";
module.exports = require("assert");;

/***/ }),

/***/ 277303:
/***/ ((module) => {

"use strict";
module.exports = require("async_hooks");;

/***/ }),

/***/ 764293:
/***/ ((module) => {

"use strict";
module.exports = require("buffer");;

/***/ }),

/***/ 63129:
/***/ ((module) => {

"use strict";
module.exports = require("child_process");;

/***/ }),

/***/ 227619:
/***/ ((module) => {

"use strict";
module.exports = require("constants");;

/***/ }),

/***/ 676417:
/***/ ((module) => {

"use strict";
module.exports = require("crypto");;

/***/ }),

/***/ 976200:
/***/ ((module) => {

"use strict";
module.exports = require("dgram");;

/***/ }),

/***/ 128614:
/***/ ((module) => {

"use strict";
module.exports = require("events");;

/***/ }),

/***/ 935747:
/***/ ((module) => {

"use strict";
module.exports = require("fs");;

/***/ }),

/***/ 298605:
/***/ ((module) => {

"use strict";
module.exports = require("http");;

/***/ }),

/***/ 957211:
/***/ ((module) => {

"use strict";
module.exports = require("https");;

/***/ }),

/***/ 132282:
/***/ ((module) => {

"use strict";
module.exports = require("module");;

/***/ }),

/***/ 411631:
/***/ ((module) => {

"use strict";
module.exports = require("net");;

/***/ }),

/***/ 712087:
/***/ ((module) => {

"use strict";
module.exports = require("os");;

/***/ }),

/***/ 385622:
/***/ ((module) => {

"use strict";
module.exports = require("path");;

/***/ }),

/***/ 694213:
/***/ ((module) => {

"use strict";
module.exports = require("punycode");;

/***/ }),

/***/ 571191:
/***/ ((module) => {

"use strict";
module.exports = require("querystring");;

/***/ }),

/***/ 92413:
/***/ ((module) => {

"use strict";
module.exports = require("stream");;

/***/ }),

/***/ 424304:
/***/ ((module) => {

"use strict";
module.exports = require("string_decoder");;

/***/ }),

/***/ 4016:
/***/ ((module) => {

"use strict";
module.exports = require("tls");;

/***/ }),

/***/ 933867:
/***/ ((module) => {

"use strict";
module.exports = require("tty");;

/***/ }),

/***/ 978835:
/***/ ((module) => {

"use strict";
module.exports = require("url");;

/***/ }),

/***/ 431669:
/***/ ((module) => {

"use strict";
module.exports = require("util");;

/***/ }),

/***/ 492184:
/***/ ((module) => {

"use strict";
module.exports = require("vm");;

/***/ }),

/***/ 678761:
/***/ ((module) => {

"use strict";
module.exports = require("zlib");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// the startup function
/******/ 	__webpack_require__.x = () => {
/******/ 		// Load entry module and return exports
/******/ 		return __webpack_require__(697610);
/******/ 	};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/amd define */
/******/ 	(() => {
/******/ 		__webpack_require__.amdD = function () {
/******/ 			throw new Error('define cannot be used indirect');
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/amd options */
/******/ 	(() => {
/******/ 		__webpack_require__.amdO = {};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks and sibling chunks for the entrypoint
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".bundled.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/startup chunk dependencies */
/******/ 	(() => {
/******/ 		var next = __webpack_require__.x;
/******/ 		__webpack_require__.x = () => {
/******/ 			__webpack_require__.e(671);
/******/ 			__webpack_require__.e(599);
/******/ 			__webpack_require__.e(233);
/******/ 			__webpack_require__.e(706);
/******/ 			__webpack_require__.e(668);
/******/ 			__webpack_require__.e(900);
/******/ 			__webpack_require__.e(229);
/******/ 			__webpack_require__.e(784);
/******/ 			return next();
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/require chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded chunks
/******/ 		// "1" means "loaded", otherwise not loaded yet
/******/ 		var installedChunks = {
/******/ 			507: 1
/******/ 		};
/******/ 		
/******/ 		var installChunk = (chunk) => {
/******/ 			var moreModules = chunk.modules, chunkIds = chunk.ids, runtime = chunk.runtime;
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			for(var i = 0; i < chunkIds.length; i++)
/******/ 				installedChunks[chunkIds[i]] = 1;
/******/ 		};
/******/ 		
/******/ 		// require() chunk loading for javascript
/******/ 		__webpack_require__.f.require = function(chunkId, promises) {
/******/ 		
/******/ 			// "1" is the signal for "already loaded"
/******/ 			if(!installedChunks[chunkId]) {
/******/ 				if(true) { // all chunks have JS
/******/ 					installChunk(require("./" + __webpack_require__.u(chunkId)));
/******/ 				} else installedChunks[chunkId] = 1;
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		// no external install chunk
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// run startup
/******/ 	return __webpack_require__.x();
/******/ })()

));
//# sourceMappingURL=chain.bundled.js.map