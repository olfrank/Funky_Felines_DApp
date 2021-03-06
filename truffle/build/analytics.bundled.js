#!/usr/bin/env node

(function(e, a) { for(var i in a) e[i] = a[i]; if(a.__esModule) Object.defineProperty(e, "__esModule", { value: true }); }(exports,
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 316497:
/***/ ((__unused_webpack_module, exports) => {

var __webpack_unused_export__;
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
__webpack_unused_export__ = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
__webpack_unused_export__ = isBoolean;

function isNull(arg) {
  return arg === null;
}
__webpack_unused_export__ = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
__webpack_unused_export__ = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
__webpack_unused_export__ = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
__webpack_unused_export__ = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
__webpack_unused_export__ = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
__webpack_unused_export__ = isUndefined;

function isRegExp(re) {
  return objectToString(re) === '[object RegExp]';
}
__webpack_unused_export__ = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
__webpack_unused_export__ = isObject;

function isDate(d) {
  return objectToString(d) === '[object Date]';
}
__webpack_unused_export__ = isDate;

function isError(e) {
  return (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
__webpack_unused_export__ = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
__webpack_unused_export__ = isPrimitive;

__webpack_unused_export__ = Buffer.isBuffer;

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


/***/ }),

/***/ 848601:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var checkParameters = __webpack_require__(277357)
var native = __webpack_require__(676417)

function nativePBKDF2 (password, salt, iterations, keylen, digest, callback) {
  checkParameters(password, salt, iterations, keylen)

  if (typeof digest === 'function') {
    callback = digest
    digest = 'sha1'
  }
  if (typeof callback !== 'function') throw new Error('No callback provided to pbkdf2')

  return native.pbkdf2(password, salt, iterations, keylen, digest, callback)
}

function nativePBKDF2Sync (password, salt, iterations, keylen, digest) {
  checkParameters(password, salt, iterations, keylen)
  digest = digest || 'sha1'
  return native.pbkdf2Sync(password, salt, iterations, keylen, digest)
}

/* istanbul ignore next */
if (!native.pbkdf2Sync || native.pbkdf2Sync.toString().indexOf('keylen, digest') === -1) {
  exports.pbkdf2Sync = __webpack_require__(367493)
  exports.pbkdf2 = __webpack_require__(888638)

// native
} else {
  exports.pbkdf2Sync = nativePBKDF2Sync
  exports.pbkdf2 = nativePBKDF2
}


/***/ }),

/***/ 902860:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * @module googleAnalytics;
 * @requires module:@truffle/config
 * @requires module:universal-analytics
 * @requires module:uuid
 * @requires module:inquirer
 * @requires module:../version
 */

const Config = __webpack_require__(120553);
const userConfig = Config.getUserConfig();
const ua = __webpack_require__(340387);
const uuid = __webpack_require__(171171);

const inquirer = __webpack_require__(496062);

const version = __webpack_require__(64146).info();

//set truffleAnalyticsId depending on whether version is bundled
const truffleAnalyticsId = version.bundle ? "UA-83874933-6" : "UA-83874933-7";

const analyticsInquiry = [
  {
    type: "list",
    name: "analyticsInquiry",
    message:
      "Would you like to enable analytics for your Truffle projects? Doing so will allow us to make sure Truffle is working as expected and help us address any bugs more efficiently.",
    choices: ["Yes, enable analytics", "No, do not enable analytics"]
  }
];
const analyticsDisable = [
  {
    type: "confirm",
    name: "analyticsDisable",
    message: "Analytics are currently enabled. Would you like to disable them?",
    default: false
  }
];
const analyticsEnable = [
  {
    type: "confirm",
    name: "analyticsEnable",
    message: "Analytics are currently disabled. Would you like to enable them?",
    default: false
  }
];

const googleAnalytics = {
  /**
   * set user-level unique id
   */
  setUserId: function() {
    if (!userConfig.get("uniqueId")) {
      let userId = uuid();
      userConfig.set({ uniqueId: userId });
    }
  },
  /**
   * get user-level options for analytics
   * @param {Object} userConfig
   * @returns {bool}
   */
  getAnalytics: function() {
    return userConfig.get("enableAnalytics");
  },
  /**
   * set user-level options for analytics
   * @param {bool} analyticsBool
   * @param {Object} userConfig
   */
  setAnalytics: function(analyticsBool) {
    if (analyticsBool === true) {
      this.setUserId();
      userConfig.set({
        enableAnalytics: true,
        analyticsSet: true,
        analyticsMessageDateTime: Date.now()
      });
    } else if (analyticsBool === false) {
      userConfig.set({
        enableAnalytics: false,
        analyticsSet: true,
        analyticsMessageDateTime: Date.now()
      });
    } else {
      const message =
        `Error setting config option.` +
        `\n> You must set the 'analytics' option to either 'true' ` +
        `or 'false'. \n> The value you provided was ${analyticsBool}.`;
      throw new Error(message);
    }
    return true;
  },
  /**
   * prompt user to determine values for user-level analytics config options
   * @param {Object} userConfig
   */
  setUserConfigViaPrompt: async function() {
    if (!userConfig.get("analyticsSet") && process.stdin.isTTY === true) {
      let answer = await inquirer.prompt(analyticsInquiry);
      if (answer.analyticsInquiry === analyticsInquiry[0].choices[0]) {
        this.setAnalytics(true);
      } else {
        this.setAnalytics(false);
      }
    } else if (
      userConfig.get("analyticsSet") &&
      userConfig.get("enableAnalytics") &&
      process.stdin.isTTY === true
    ) {
      let answer = await inquirer.prompt(analyticsDisable);
      if (answer.analyticsDisable) {
        this.setAnalytics(false);
      } else {
        this.setAnalytics(true);
      }
    } else if (
      userConfig.get("analyticsSet") &&
      !userConfig.get("enableAnalytics") &&
      process.stdin.isTTY === true
    ) {
      let answer = await inquirer.prompt(analyticsEnable);
      if (answer.analyticsEnable) {
        this.setAnalytics(true);
      } else {
        this.setAnalytics(false);
      }
    }
    return true;
  },
  /**
   * check user-level config to see if user has enabled analytics
   * @returns {bool}
   */
  checkIfAnalyticsEnabled: function() {
    if (userConfig.get("enableAnalytics")) {
      return true;
    } else {
      return false;
    }
  },

  /**
   * set data that will be the same in future calls
   * @returns {Object} visitor
   */
  setPersistentAnalyticsData: function() {
    if (this.checkIfAnalyticsEnabled() === true) {
      let userId = userConfig.get("uniqueId");
      let visitor = ua(truffleAnalyticsId, { cid: userId });
      return visitor;
    }
  },

  /**
   * send event to Google Analytics
   * @param {Object}
   */
  // eslint-disable-next-line no-unused-vars
  sendAnalyticsEvent: function(eventObject, callback) {
    let visitor = this.setPersistentAnalyticsData();
    let sendObject = {};
    if (eventObject["command"]) {
      sendObject["ec"] = eventObject["command"];
      sendObject["ea"] = JSON.stringify(eventObject["args"]);
      sendObject["el"] = eventObject["version"];
      sendObject["dp"] = "/" + eventObject["command"];
    } else {
      sendObject["ec"] = "Error";
      sendObject["ea"] = "nonzero exit code";
      sendObject["el"] =
        eventObject["version"] + " " + eventObject["exception"];
      sendObject["dp"] = "/error";
    }

    if (visitor) {
      // eslint-disable-next-line no-unused-vars
      visitor.event(sendObject, function(err) {});
    }

    return true;
  }
};

module.exports = googleAnalytics;


/***/ }),

/***/ 711064:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(20406);
const analytics = __webpack_require__(902860);

const PROCESS_TIMEOUT = 5000; // ms

console.debug("starting truffle analytics process");

const done = new Promise(accept => {
  setTimeout(accept, PROCESS_TIMEOUT);
  console.debug("timeout set");
});

process.on("message", async eventObject => {
  console.debug("sending event %o", eventObject);
  analytics.sendAnalyticsEvent(eventObject);
  console.debug("(maybe) sent event %o", eventObject);
});

done.then(() => {
  console.debug("timeout reached");
  process.exit(0);
});


/***/ }),

/***/ 64146:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const pkg = __webpack_require__(512322);
const { CompilerSupplier } = __webpack_require__(611105);
const Config = __webpack_require__(120553);

const info = config => {
  let bundleVersion;
  // NOTE: Webpack will replace BUNDLE_VERSION with a string.
  if (true) bundleVersion = "5.4.2";

  let supplierOptions;
  if (config && config.compilers) {
    supplierOptions = {
      events: config.events,
      solcConfig: config.compilers.solc
    };
  } else {
    const { events, compilers } = new Config();
    const solcConfig = compilers.solc;
    supplierOptions = { events, solcConfig };
  }
  const supplier = new CompilerSupplier(supplierOptions);

  return {
    core: pkg.version,
    bundle: bundleVersion,
    solc: supplier.version
  };
};

const logTruffle = (logger = console, versionInformation) => {
  const bundle = versionInformation.bundle
    ? `v${versionInformation.bundle}`
    : "(unbundled)";
  logger.log(`Truffle ${bundle} (core: ${versionInformation.core})`);
};

const logNode = (logger = console) => {
  logger.log(`Node ${process.version}`);
};

const logSolidity = (logger = console, versionInformation, config) => {
  let solcVersion;
  if (
    config &&
    config.compilers &&
    config.compilers.solc &&
    config.compilers.solc.version
  ) {
    solcVersion = config.compilers.solc.version;
    logger.log(`Solidity - ${solcVersion} (solc-js)`);
  } else {
    const versionInformation = info(config);
    solcVersion = versionInformation.solc;
    logger.log(`Solidity v${solcVersion} (solc-js)`);
  }
};

const logWeb3 = (logger = console) => {
  const web3Version = pkg.dependencies.web3;
  logger.log(`Web3.js v${web3Version}`);
};

const logAll = (logger = console, config) => {
  const versionInformation = info(config);
  logTruffle(logger, versionInformation);
  logSolidity(logger, versionInformation, config);
  logNode(logger);
  logWeb3(logger);
};

const logTruffleAndNode = (logger = console, config) => {
  const versionInformation = info(config);
  logTruffle(logger, versionInformation);
  logNode(logger);
};

module.exports = {
  logAll,
  info,
  logTruffleAndNode
};


/***/ }),

/***/ 55159:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(998287);

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
/******/ 		return __webpack_require__(711064);
/******/ 	};
/******/ 	
/************************************************************************/
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
/******/ 			__webpack_require__.e(587);
/******/ 			__webpack_require__.e(724);
/******/ 			__webpack_require__.e(864);
/******/ 			__webpack_require__.e(83);
/******/ 			__webpack_require__.e(829);
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
/******/ 			142: 1
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
//# sourceMappingURL=analytics.bundled.js.map