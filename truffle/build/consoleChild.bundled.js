#!/usr/bin/env node

(function(e, a) { for(var i in a) e[i] = a[i]; if(a.__esModule) Object.defineProperty(e, "__esModule", { value: true }); }(exports,
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 261642:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var window = __webpack_require__(158908);
var nodeCrypto = __webpack_require__(676417);

function getRandomValues(buf) {
  if (window.crypto && window.crypto.getRandomValues) {
    return window.crypto.getRandomValues(buf);
  }
  if (typeof window.msCrypto === 'object' && typeof window.msCrypto.getRandomValues === 'function') {
    return window.msCrypto.getRandomValues(buf);
  }
  if (nodeCrypto.randomBytes) {
    if (!(buf instanceof Uint8Array)) {
      throw new TypeError('expected Uint8Array');
    }
    if (buf.length > 65536) {
      var e = new Error();
      e.code = 22;
      e.message = 'Failed to execute \'getRandomValues\' on \'Crypto\': The ' +
        'ArrayBufferView\'s byte length (' + buf.length + ') exceeds the ' +
        'number of bytes of entropy available via this API (65536).';
      e.name = 'QuotaExceededError';
      throw e;
    }
    var bytes = nodeCrypto.randomBytes(buf.length);
    buf.set(bytes);
    return buf;
  }
  else {
    throw new Error('No secure random number generator available.');
  }
}

module.exports = getRandomValues;


/***/ }),

/***/ 158908:
/***/ ((module) => {

var win;

if (typeof window !== "undefined") {
    win = window;
} else if (typeof global !== "undefined") {
    win = global;
} else if (typeof self !== "undefined"){
    win = self;
} else {
    win = {};
}

module.exports = win;


/***/ }),

/***/ 591559:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = {
  build: __webpack_require__(797701),
  compile: __webpack_require__(947582),
  config: __webpack_require__(962722),
  console: __webpack_require__(806345),
  create: __webpack_require__(942957),
  db: __webpack_require__(149797),
  debug: __webpack_require__(967775),
  deploy: __webpack_require__(491456),
  develop: __webpack_require__(946564),
  exec: __webpack_require__(615090),
  help: __webpack_require__(689664),
  init: __webpack_require__(429287),
  install: __webpack_require__(283709),
  migrate: __webpack_require__(325300),
  networks: __webpack_require__(186289),
  obtain: __webpack_require__(450073),
  opcode: __webpack_require__(904731),
  preserve: __webpack_require__(796112),
  publish: __webpack_require__(455896),
  run: __webpack_require__(190512),
  test: __webpack_require__(86067),
  unbox: __webpack_require__(126242),
  version: __webpack_require__(473787),
  watch: __webpack_require__(975732)
};


/***/ }),

/***/ 460950:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

const Command = __webpack_require__(651017);
const TruffleError = __webpack_require__(673321);
const Config = __webpack_require__(120553);
const Web3 = __webpack_require__(503283);
const yargs = __webpack_require__(194806);

const crypto = __webpack_require__(676417);
global.crypto = crypto;
// we need to make sure this function exists so ensjs doesn't complain
// it requires getRandomValues for some functionalities
global.crypto.getRandomValues = __webpack_require__(261642);

const input = process.argv[2].split(" -- ");
const inputStrings = input[1];

//detect config so we can get the provider and resolver without having to serialize
//and deserialize them
const { network, config } = yargs(input[0]).argv;
const detectedConfig = Config.detect({ network, config });
const customConfig = detectedConfig.networks.develop || {};

//need host and port for provider url
const ganacheOptions = {
  host: customConfig.host || "127.0.0.1",
  port: customConfig.port || 9545
};
const url = `http://${ganacheOptions.host}:${ganacheOptions.port}/`;

//set up the develop network to use, including setting up provider
detectedConfig.networks.develop = {
  host: customConfig.host || "127.0.0.1",
  port: customConfig.port || 9545,
  network_id: customConfig.network_id || 5777,
  provider: function () {
    return new Web3.providers.HttpProvider(url, { keepAlive: false });
  }
};

const command = new Command(__webpack_require__(591559));

command
  .run(inputStrings, detectedConfig)
  .then(() => process.exit(0))
  .catch(error => {
    // Perform error handling ourselves.
    if (error instanceof TruffleError) {
      console.log(error.message);
    } else {
      // Bubble up all other unexpected errors.
      console.log(error.stack || error.toString());
    }
    process.exit(1);
  });


/***/ }),

/***/ 194806:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// classic singleton yargs API, to use yargs
// without running as a singleton do:
// require('yargs/yargs')(process.argv.slice(2))
const yargs = __webpack_require__(564968)

Argv(process.argv.slice(2))

module.exports = Argv

function Argv (processArgs, cwd) {
  const argv = yargs(processArgs, cwd, __webpack_require__(826503))
  singletonify(argv)
  return argv
}

/*  Hack an instance of Argv with process.argv into Argv
    so people can do
    require('yargs')(['--beeble=1','-z','zizzle']).argv
    to parse a list of args and
    require('yargs').argv
    to get a parsed version of process.argv.
*/
function singletonify (inst) {
  Object.keys(inst).forEach(function (key) {
    if (key === 'argv') {
      Argv.__defineGetter__(key, inst.__lookupGetter__(key))
    } else {
      Argv[key] = typeof inst[key] === 'function' ? inst[key].bind(inst) : inst[key]
    }
  })
}


/***/ }),

/***/ 168060:
/***/ ((module) => {

"use strict";
module.exports = require("@truffle/db");;

/***/ }),

/***/ 538621:
/***/ ((module) => {

"use strict";
module.exports = require("@truffle/debugger");;

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

/***/ 348450:
/***/ ((module) => {

"use strict";
module.exports = require("mocha");;

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

/***/ 588277:
/***/ ((module) => {

"use strict";
module.exports = require("original-require");;

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

/***/ 961765:
/***/ ((module) => {

"use strict";
module.exports = require("process");;

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

/***/ 251058:
/***/ ((module) => {

"use strict";
module.exports = require("readline");;

/***/ }),

/***/ 868027:
/***/ ((module) => {

"use strict";
module.exports = require("repl");;

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

/***/ 278213:
/***/ ((module) => {

"use strict";
module.exports = require("timers");;

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

/***/ 265013:
/***/ ((module) => {

"use strict";
module.exports = require("worker_threads");;

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
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/******/ 	// the startup function
/******/ 	__webpack_require__.x = () => {
/******/ 		// Load entry module and return exports
/******/ 		return __webpack_require__(460950);
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
/******/ 			__webpack_require__.e(587);
/******/ 			__webpack_require__.e(724);
/******/ 			__webpack_require__.e(864);
/******/ 			__webpack_require__.e(400);
/******/ 			__webpack_require__.e(716);
/******/ 			__webpack_require__.e(765);
/******/ 			__webpack_require__.e(290);
/******/ 			__webpack_require__.e(379);
/******/ 			__webpack_require__.e(983);
/******/ 			__webpack_require__.e(161);
/******/ 			__webpack_require__.e(57);
/******/ 			__webpack_require__.e(777);
/******/ 			__webpack_require__.e(11);
/******/ 			__webpack_require__.e(72);
/******/ 			__webpack_require__.e(502);
/******/ 			__webpack_require__.e(631);
/******/ 			__webpack_require__.e(624);
/******/ 			__webpack_require__.e(171);
/******/ 			__webpack_require__.e(294);
/******/ 			__webpack_require__.e(83);
/******/ 			__webpack_require__.e(784);
/******/ 			__webpack_require__.e(557);
/******/ 			__webpack_require__.e(829);
/******/ 			__webpack_require__.e(459);
/******/ 			__webpack_require__.e(903);
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
/******/ 			150: 1,
/******/ 			286: 1
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
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// run startup
/******/ 	return __webpack_require__.x();
/******/ })()

));
//# sourceMappingURL=consoleChild.bundled.js.map