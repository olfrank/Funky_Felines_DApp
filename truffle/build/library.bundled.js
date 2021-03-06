#!/usr/bin/env node

(function(e, a) { for(var i in a) e[i] = a[i]; if(a.__esModule) Object.defineProperty(e, "__esModule", { value: true }); }(exports,
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 489244:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(20406);
const pkg = __webpack_require__(512322);

module.exports = {
  build: __webpack_require__(160627),
  create: __webpack_require__(789664),
  // TODO: update this to non-legacy the next breaking change
  contracts: __webpack_require__(781969),
  package: __webpack_require__(883513),
  test: __webpack_require__(952422),
  version: pkg.version,
  ganache: __webpack_require__(968321)
};


/***/ }),

/***/ 781969:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const debug = __webpack_require__(685373)("workflow-compile");
const fse = __webpack_require__(655674);
const externalCompile = __webpack_require__(296412);
const solcCompile = __webpack_require__(611105);
const vyperCompile = __webpack_require__(874269);
const { prepareConfig } = __webpack_require__(991671);
const { Shims } = __webpack_require__(529833);

const SUPPORTED_COMPILERS = {
  solc: solcCompile,
  vyper: vyperCompile,
  external: externalCompile
};

const WorkflowCompile = {
  collectCompilations: async compilations => {
    let result = { outputs: {}, contracts: {} };

    for (let compilation of await Promise.all(compilations)) {
      let { compiler, output, contracts } = compilation;

      result.outputs[compiler] = output;

      for (let [name, abstraction] of Object.entries(contracts)) {
        result.contracts[name] = abstraction;
      }
    }

    return result;
  },

  // contracts_directory: String. Directory where .sol files can be found.
  // contracts_build_directory: String. Directory where .sol.js files can be found and written to.
  // all: Boolean. Compile all sources found. Defaults to true. If false, will compare sources against built files
  //      in the build directory to see what needs to be compiled.
  // network_id: network id to link saved contract artifacts.
  // quiet: Boolean. Suppress output. Defaults to false.
  // strict: Boolean. Return compiler warnings as errors. Defaults to false.
  compile: async function (options, callback) {
    const callbackPassed = typeof callback === "function";
    try {
      const config = prepareConfig(options);

      const compilers = config.compiler
        ? [config.compiler]
        : Object.keys(config.compilers);

      if (config.events) config.events.emit("compile:start");

      const compilations = await this.compileSources(config, compilers);

      const numberOfCompiledContracts = compilations.reduce(
        (number, compilation) => {
          return number + Object.keys(compilation.contracts).length;
        },
        0
      );

      if (numberOfCompiledContracts === 0 && config.events) {
        config.events.emit("compile:nothingToCompile");
      }

      if (config.events) {
        config.events.emit("compile:succeed", {
          contractsBuildDirectory: config.contracts_build_directory,
          compilers: config.compilersInfo
        });
      }

      const result = await this.collectCompilations(compilations);
      if (callbackPassed) return callback(null, result);
      return result;
    } catch (error) {
      if (callbackPassed) return callback(error);
      throw error;
    }
  },

  compileSources: async function (config, compilers) {
    compilers = config.compiler
      ? config.compiler === "none"
        ? []
        : [config.compiler]
      : Object.keys(config.compilers);

    return Promise.all(
      compilers.map(async compiler => {
        const compile = SUPPORTED_COMPILERS[compiler];
        if (!compile) throw new Error("Unsupported compiler: " + compiler);

        config.compilersInfo = [];
        const { Compile } = compile;
        const compileFunc =
          config.all === true || config.compileAll === true
            ? Compile.all
            : Compile.necessary;

        const { compilations } = await compileFunc(config);
        const { contracts, output } = compilations.reduce(
          (a, compilation) => {
            for (const contract of compilation.contracts) {
              a.contracts[
                contract.contractName
              ] = Shims.NewToLegacy.forContract(contract);
            }
            a.output = a.output.concat(compilation.sourceIndexes);
            return a;
          },
          {
            contracts: {},
            output: []
          }
        );

        let compilerUsed;
        if (compilations[0] && compilations[0].compiler) {
          compilerUsed = {
            name: compilations[0].compiler.name,
            version: compilations[0].compiler.version
          };
        }

        if (compilerUsed) {
          config.compilersInfo.push(compilerUsed);
        }

        if (contracts && Object.keys(contracts).length > 0) {
          await this.writeContracts(contracts, config);
        }

        return { compiler, contracts, output };
      })
    );
  },

  writeContracts: async (contracts, options) => {
    fse.ensureDirSync(options.contracts_build_directory);
    await options.artifactor.saveAll(contracts);
  }
};

module.exports = WorkflowCompile;


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
/******/ 		return __webpack_require__(489244);
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
/******/ 			__webpack_require__.e(829);
/******/ 			__webpack_require__.e(459);
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
/******/ 			297: 1
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
//# sourceMappingURL=library.bundled.js.map