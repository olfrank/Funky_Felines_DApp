#!/usr/bin/env node

exports.id = 829;
exports.ids = [829];
exports.modules = {

/***/ 962575:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CompileError = void 0;
const colors_1 = __importDefault(__webpack_require__(183196));
const error_1 = __importDefault(__webpack_require__(673321));
class CompileError extends error_1.default {
    constructor(message) {
        // Note we trim() because solc likes to add extra whitespace.
        var fancy_message = message.trim() + "\n\n" + colors_1.default.red("Compilation failed. See above.");
        var normal_message = message.trim();
        super(normal_message);
        this.message = fancy_message; //?? I don't understand this, I just found it here
    }
}
exports.CompileError = CompileError;
//# sourceMappingURL=errors.js.map

/***/ }),

/***/ 529833:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Errors = exports.Sources = exports.Shims = exports.Profiler = void 0;
var profiler_1 = __webpack_require__(529531);
Object.defineProperty(exports, "Profiler", ({ enumerable: true, get: function () { return profiler_1.Profiler; } }));
exports.Shims = __importStar(__webpack_require__(753304));
exports.Sources = __importStar(__webpack_require__(402543));
exports.Errors = __importStar(__webpack_require__(962575));
__exportStar(__webpack_require__(940963), exports);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 144900:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.convertToAbsolutePaths = void 0;
const path_1 = __importDefault(__webpack_require__(385622));
const isExplicitlyRelative_1 = __webpack_require__(39692);
function convertToAbsolutePaths(paths, base) {
    return paths
        .map(p => {
        // If it's anabsolute paths, leave it alone.
        if (path_1.default.isAbsolute(p))
            return p;
        // If it's not explicitly relative, then leave it alone (i.e., it's a module).
        if (!isExplicitlyRelative_1.isExplicitlyRelative(p))
            return p;
        // Path must be explicitly releative, therefore make it absolute.
        return path_1.default.resolve(path_1.default.join(base, p));
    })
        .sort();
}
exports.convertToAbsolutePaths = convertToAbsolutePaths;
//# sourceMappingURL=convertToAbsolutePaths.js.map

/***/ }),

/***/ 824302:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getImports = void 0;
const debug_1 = __importDefault(__webpack_require__(415677));
const path_1 = __importDefault(__webpack_require__(385622));
const debug = debug_1.default("compile-common:profiler:getImports");
function getImports({ source: { filePath, body, source }, shouldIncludePath, parseImports }) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!shouldIncludePath(filePath) || !parseImports)
            return [];
        debug("filePath: %s", filePath);
        const imports = yield parseImports(body);
        debug("imports: %O", imports);
        // Convert relative dependencies of modules back into module paths.
        // note: the check for what's a relative dependency has been removed from
        // here, that's now the responsibility of the individual resolverSource to check
        return (yield Promise.all(imports.map(dependencyPath => source.resolveDependencyPath(filePath, dependencyPath)))).filter(sourcePath => sourcePath) //filter out Vyper failures
            .map(sourcePath => sourcePath.replace(/\//g, path_1.default.sep)); //make sure to use
        //backslash on Windows (for same reason as in requiredSources.ts)
    });
}
exports.getImports = getImports;
//# sourceMappingURL=getImports.js.map

/***/ }),

/***/ 529531:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Profiler = void 0;
var profiler_1 = __webpack_require__(956413);
Object.defineProperty(exports, "Profiler", ({ enumerable: true, get: function () { return profiler_1.Profiler; } }));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 39692:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isExplicitlyRelative = void 0;
function isExplicitlyRelative(importPath) {
    return importPath.startsWith("./") || importPath.startsWith("../");
}
exports.isExplicitlyRelative = isExplicitlyRelative;
//# sourceMappingURL=isExplicitlyRelative.js.map

/***/ }),

/***/ 956413:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Profiler = void 0;
const debug_1 = __importDefault(__webpack_require__(415677));
const debug = debug_1.default("compile-common:profiler");
const findContracts = __webpack_require__(123542);
const expect = __webpack_require__(414096);
const updated_1 = __webpack_require__(880746);
const requiredSources_1 = __webpack_require__(990809);
const convertToAbsolutePaths_1 = __webpack_require__(144900);
class Profiler {
    constructor(config) {
        this.config = config;
    }
    updated(options) {
        return __awaiter(this, void 0, void 0, function* () {
            expect.options(options, [
                "contracts_directory",
                "contracts_build_directory"
            ]);
            const { contracts_directory: contractsDirectory, contracts_build_directory: contractsBuildDirectory } = options;
            const paths = options.files
                ? options.files
                : yield findContracts(contractsDirectory);
            return yield updated_1.updated({ paths, contractsBuildDirectory });
        });
    }
    requiredSources(options) {
        return __awaiter(this, void 0, void 0, function* () {
            expect.options(options, [
                "paths",
                "base_path",
                "resolver",
                "contracts_directory"
            ]);
            const { resolver, paths, base_path: basePath, contracts_directory: contractsDirectory } = options;
            debug("paths: %O", paths);
            const resolve = ({ filePath, importedFrom }) => __awaiter(this, void 0, void 0, function* () {
                //we want to allow resolution failure here.  so, if a source can't
                //be resolved, it will show up as a compile error rather than a Truffle
                //error.
                try {
                    return yield resolver.resolve(filePath, importedFrom);
                }
                catch (error) {
                    //resolver doesn't throw structured errors at the moment,
                    //so we'll check the messag to see whether this is an expected error
                    //(kind of a HACK)
                    if (error.message.startsWith("Could not find ")) {
                        return undefined;
                    }
                    else {
                        //rethrow unexpected errors
                        throw error;
                    }
                }
            });
            const updatedPaths = convertToAbsolutePaths_1.convertToAbsolutePaths(paths, basePath);
            const allPaths = convertToAbsolutePaths_1.convertToAbsolutePaths(yield findContracts(contractsDirectory), basePath);
            debug("invoking requiredSources");
            return yield requiredSources_1.requiredSources({
                resolve,
                parseImports: this.config.parseImports,
                shouldIncludePath: this.config.shouldIncludePath,
                updatedPaths,
                allPaths
            });
        });
    }
    requiredSourcesForSingleFile(options) {
        return __awaiter(this, void 0, void 0, function* () {
            expect.options(options, ["path", "base_path", "resolver"]);
            const { resolver, path, base_path: basePath } = options;
            const resolve = ({ filePath, importedFrom }) => resolver.resolve(filePath, importedFrom);
            const allPaths = convertToAbsolutePaths_1.convertToAbsolutePaths([path], basePath);
            const updatedPaths = allPaths;
            return yield requiredSources_1.requiredSources({
                resolve,
                parseImports: this.config.parseImports,
                shouldIncludePath: this.config.shouldIncludePath,
                updatedPaths,
                allPaths
            });
        });
    }
}
exports.Profiler = Profiler;
//# sourceMappingURL=profiler.js.map

/***/ }),

/***/ 990809:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.requiredSources = void 0;
const debug_1 = __importDefault(__webpack_require__(415677));
const path_1 = __importDefault(__webpack_require__(385622));
const debug = debug_1.default("compile-common:profiler:requiredSources");
const resolveAllSources_1 = __webpack_require__(462244);
function requiredSources({ allPaths, updatedPaths, resolve, shouldIncludePath, parseImports }) {
    return __awaiter(this, void 0, void 0, function* () {
        const allSources = {};
        const compilationTargets = [];
        debug("allPaths: %O", allPaths);
        debug("updatedPaths: %O", updatedPaths);
        //before anything else: on Windows, make sure all paths are in native form
        //(with backslashes) rather than slashes.  otherwise, resolution of relative
        //paths can cause aliasing; you can end up with one source with slashes (as
        //given) and one with backslashes (due to relative import resolution).
        allPaths = allPaths.map(sourcePath => sourcePath.replace(/\//g, path_1.default.sep));
        updatedPaths = updatedPaths.map(sourcePath => sourcePath.replace(/\//g, path_1.default.sep));
        // Solidity test files might have been injected. Include them in the known set.
        updatedPaths.forEach(_path => {
            if (!allPaths.includes(_path)) {
                allPaths.push(_path);
            }
        });
        //exit out quickly if we've been asked to compile nothing
        if (!updatedPaths.length) {
            return {
                allSources: {},
                compilationTargets: []
            };
        }
        const resolved = yield resolveAllSources_1.resolveAllSources({
            resolve,
            parseImports,
            shouldIncludePath,
            paths: allPaths
        });
        //exit out semi-quickly if we've been asked to compile everything
        if (listsEqual(updatedPaths, allPaths)) {
            for (const file of Object.keys(resolved)) {
                if (shouldIncludePath(file)) {
                    allSources[file] = resolved[file].body;
                }
            }
            return {
                allSources,
                compilationTargets: Object.keys(allSources)
            };
        }
        // Seed compilationTargets with known updates
        for (const update of updatedPaths) {
            if (shouldIncludePath(update)) {
                compilationTargets.push(update);
            }
        }
        debug("entering main loop");
        // While there are updated files in the queue, we take each one
        // and search the entire file corpus to find any sources that import it.
        // Those sources are added to list of compilation targets as well as
        // the update queue because their own ancestors need to be discovered.
        while (updatedPaths.length > 0) {
            const currentUpdate = updatedPaths.shift();
            const files = allPaths.slice();
            // While files: dequeue and inspect their imports
            while (files.length > 0) {
                const currentFile = files.shift();
                // Ignore targets already selected.
                if (compilationTargets.includes(currentFile)) {
                    continue;
                }
                debug("currentFile: %s", currentFile);
                const imports = resolved[currentFile].imports;
                debug("imports.length: %d", imports.length);
                // If file imports a compilation target, add it
                // to list of updates and compilation targets
                if (imports.includes(currentUpdate)) {
                    updatedPaths.push(currentFile);
                    compilationTargets.push(currentFile);
                }
            }
        }
        debug("compilationTargets: %O", compilationTargets);
        //now: crawl the tree downward from the compilation targets
        //to get all the sources we need
        const filesToProcess = compilationTargets.slice(); //clone
        const required = [];
        while (filesToProcess.length > 0) {
            debug("filesToProcess: %O", filesToProcess);
            const file = filesToProcess.shift();
            debug("file: %s", file);
            if (resolved[file]) {
                required.push(file);
                for (const importPath of resolved[file].imports) {
                    debug("importPath: %s", importPath);
                    if (!required.includes(importPath)) { //don't go into a loop!
                        filesToProcess.push(importPath);
                    }
                }
            }
        }
        debug("required: %O", required);
        // Generate dictionary of all required sources, including external packages
        for (const file of required) {
            if (shouldIncludePath(file)) {
                allSources[file] = resolved[file].body;
            }
        }
        return {
            allSources,
            compilationTargets
        };
    });
}
exports.requiredSources = requiredSources;
function listsEqual(listA, listB) {
    const a = listA.sort();
    const b = listB.sort();
    return JSON.stringify(a) === JSON.stringify(b);
}
//# sourceMappingURL=requiredSources.js.map

/***/ }),

/***/ 462244:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resolveAllSources = void 0;
const debug_1 = __importDefault(__webpack_require__(415677));
const debug = debug_1.default("compile-common:profiler:resolveAllSources");
const getImports_1 = __webpack_require__(824302);
// Resolves sources in several async passes. For each resolved set it detects unknown
// imports from external packages and adds them to the set of files to resolve.
function resolveAllSources({ resolve, paths, shouldIncludePath, parseImports }) {
    return __awaiter(this, void 0, void 0, function* () {
        const mapping = {};
        const allPaths = paths.slice();
        debug("resolveAllSources called");
        // Begin generateMapping
        function generateMapping() {
            return __awaiter(this, void 0, void 0, function* () {
                const promises = [];
                // Dequeue all the known paths, generating resolver promises,
                // We'll add paths if we discover external package imports.
                while (allPaths.length) {
                    let filePath;
                    let importedFrom = null;
                    const candidate = allPaths.shift();
                    // Some paths will have been extracted as imports from a file
                    // and have information about their parent location we need to track.
                    if (typeof candidate === "object") {
                        filePath = candidate.filePath;
                        importedFrom = candidate.importedFrom;
                    }
                    else {
                        filePath = candidate;
                    }
                    promises.push(resolve({ filePath, importedFrom }));
                }
                // Resolve everything known and add it to the map, then inspect each file's
                // imports and add those to the list of paths to resolve if we don't have it.
                const results = yield Promise.all(promises);
                // Queue unknown imports for the next resolver cycle
                while (results.length) {
                    const source = results.shift();
                    if (!source || mapping[source.filePath]) {
                        //skip ones that couldn't be resolved, or are already recorded
                        continue;
                    }
                    const imports = shouldIncludePath(source.filePath)
                        ? yield getImports_1.getImports({ source, parseImports, shouldIncludePath })
                        : [];
                    debug("imports: %O", imports);
                    // Generate the sources mapping
                    mapping[source.filePath] = Object.assign(Object.assign({}, source), { imports });
                    // Detect unknown external packages / add them to the list of files to resolve
                    // Keep track of location of this import because we need to report that.
                    for (const item of imports) {
                        if (!mapping[item]) {
                            allPaths.push({ filePath: item, importedFrom: source.filePath });
                        }
                    }
                }
            });
        }
        // End generateMapping
        while (allPaths.length) {
            yield generateMapping();
        }
        return mapping;
    });
}
exports.resolveAllSources = resolveAllSources;
//# sourceMappingURL=resolveAllSources.js.map

/***/ }),

/***/ 880746:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.updated = void 0;
const path = __importStar(__webpack_require__(385622));
const fse = __importStar(__webpack_require__(655674));
function updated({ paths, contractsBuildDirectory, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const sourceFilesArtifacts = readAndParseArtifactFiles(paths, contractsBuildDirectory);
        const sourceFilesArtifactsUpdatedTimes = minimumUpdatedTimePerSource(sourceFilesArtifacts);
        return findUpdatedFiles(sourceFilesArtifacts, sourceFilesArtifactsUpdatedTimes);
    });
}
exports.updated = updated;
function readAndParseArtifactFiles(paths, contracts_build_directory) {
    const sourceFilesArtifacts = {};
    // Get all the source files and create an object out of them.
    paths.forEach((sourceFile) => {
        sourceFilesArtifacts[sourceFile] = [];
    });
    // Get all the artifact files, and read them, parsing them as JSON
    let buildFiles;
    try {
        buildFiles = fse.readdirSync(contracts_build_directory);
    }
    catch (error) {
        // The build directory may not always exist.
        if (error.message.includes("ENOENT: no such file or directory")) {
            // Ignore it.
            buildFiles = [];
        }
        else {
            throw error;
        }
    }
    buildFiles = buildFiles.filter((file) => path.extname(file) === ".json");
    const jsonData = buildFiles.map((file) => {
        const body = fse.readFileSync(path.join(contracts_build_directory, file), "utf8");
        return { file, body };
    });
    for (let i = 0; i < jsonData.length; i++) {
        try {
            const data = JSON.parse(jsonData[i].body);
            // In case there are artifacts from other source locations.
            if (sourceFilesArtifacts[data.sourcePath] == null) {
                sourceFilesArtifacts[data.sourcePath] = [];
            }
            sourceFilesArtifacts[data.sourcePath].push(data);
        }
        catch (error) {
            // JSON.parse throws SyntaxError objects
            if (error instanceof SyntaxError) {
                throw new Error("Problem parsing artifact: " + jsonData[i].file);
            }
            else {
                throw error;
            }
        }
    }
    return sourceFilesArtifacts;
}
function findUpdatedFiles(sourceFilesArtifacts, sourceFilesArtifactsUpdatedTimes) {
    // Stat all the source files, getting there updated times, and comparing them to
    // the artifact updated times.
    const sourceFiles = Object.keys(sourceFilesArtifacts);
    let sourceFileStats;
    sourceFileStats = sourceFiles.map((file) => {
        try {
            return fse.statSync(file);
        }
        catch (error) {
            // Ignore it. This means the source file was removed
            // but the artifact file possibly exists. Return null
            // to signfy that we should ignore it.
            return null;
        }
    });
    return sourceFiles
        .map((sourceFile, index) => {
        const sourceFileStat = sourceFileStats[index];
        // Ignore updating artifacts if source file has been removed.
        if (sourceFileStat == null)
            return;
        const artifactsUpdatedTime = sourceFilesArtifactsUpdatedTimes[sourceFile] || 0;
        const sourceFileUpdatedTime = (sourceFileStat.mtime || sourceFileStat.ctime).getTime();
        if (sourceFileUpdatedTime > artifactsUpdatedTime)
            return sourceFile;
    })
        .filter((file) => file);
}
function minimumUpdatedTimePerSource(sourceFilesArtifacts) {
    let sourceFilesArtifactsUpdatedTimes = {};
    // Get the minimum updated time for all of a source file's artifacts
    // (note: one source file might have multiple artifacts).
    for (const sourceFile of Object.keys(sourceFilesArtifacts)) {
        const artifacts = sourceFilesArtifacts[sourceFile];
        sourceFilesArtifactsUpdatedTimes[sourceFile] = artifacts.reduce((minimum, current) => {
            const updatedAt = new Date(current.updatedAt).getTime();
            if (updatedAt < minimum) {
                return updatedAt;
            }
            return minimum;
        }, Number.MAX_SAFE_INTEGER);
        // Empty array?
        if (sourceFilesArtifactsUpdatedTimes[sourceFile] === Number.MAX_SAFE_INTEGER) {
            sourceFilesArtifactsUpdatedTimes[sourceFile] = 0;
        }
    }
    return sourceFilesArtifactsUpdatedTimes;
}
//# sourceMappingURL=updated.js.map

/***/ }),

/***/ 899164:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.forBytecode = exports.forContract = exports.forContracts = void 0;
function forContracts(contracts) {
    // convert to list
    return Object.values(contracts).map(forContract);
}
exports.forContracts = forContracts;
function forContract(contract) {
    const { contractName, contract_name, sourcePath, source, sourceMap, deployedSourceMap, legacyAST, ast, abi, metadata, bytecode, deployedBytecode, compiler, devdoc, userdoc, immutableReferences, generatedSources, deployedGeneratedSources, db } = contract;
    return {
        contractName: contract_name || contractName,
        sourcePath,
        source,
        sourceMap,
        deployedSourceMap,
        legacyAST,
        ast,
        abi,
        metadata,
        bytecode: forBytecode(bytecode),
        deployedBytecode: forBytecode(deployedBytecode),
        compiler,
        devdoc,
        userdoc,
        immutableReferences,
        generatedSources,
        deployedGeneratedSources,
        db
    };
}
exports.forContract = forContract;
function forBytecode(bytecode) {
    if (!bytecode) {
        return undefined;
    }
    if (typeof bytecode === "object") {
        return bytecode;
    }
    const linkReferences = [];
    const bytes = bytecode
        .slice(2) // remove 0x prefix
        .replace(/__[^_]+_*/g, (linkReference, characterOffset) => {
        const [, name] = linkReference.match(/__([^_]+)_*/);
        const characterLength = linkReference.length;
        const offset = characterOffset / 2;
        const length = characterLength / 2;
        linkReferences.push({
            offsets: [offset],
            name,
            length
        });
        return "0".repeat(characterLength);
    });
    return { bytes, linkReferences };
}
exports.forBytecode = forBytecode;
//# sourceMappingURL=LegacyToNew.js.map

/***/ }),

/***/ 626624:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.forBytecode = exports.forContract = void 0;
function forContract(contract) {
    const { contractName, sourcePath, source, sourceMap, deployedSourceMap, legacyAST, ast, abi, metadata, bytecode, deployedBytecode, compiler, devdoc, userdoc, immutableReferences, generatedSources, deployedGeneratedSources, db } = contract;
    return {
        contract_name: contractName,
        sourcePath,
        source,
        sourceMap,
        deployedSourceMap,
        legacyAST,
        ast,
        abi,
        metadata,
        bytecode: forBytecode(bytecode),
        deployedBytecode: forBytecode(deployedBytecode),
        unlinked_binary: forBytecode(bytecode),
        compiler,
        devdoc,
        userdoc,
        immutableReferences,
        generatedSources,
        deployedGeneratedSources,
        db
    };
}
exports.forContract = forContract;
function forBytecode(bytecode) {
    if (!bytecode) {
        return bytecode;
    }
    if (typeof bytecode === "string") {
        return bytecode;
    }
    let { bytes, linkReferences } = bytecode;
    linkReferences = linkReferences || [];
    // inline link references - start by flattening the offsets
    const flattenedLinkReferences = linkReferences
        // map each link ref to array of link refs with only one offset
        .map(({ offsets, length, name }) => offsets.map(offset => ({ offset, length, name })))
        // flatten
        .reduce((a, b) => [...a, ...b], []);
    // then overwite bytes with link reference
    bytes = flattenedLinkReferences.reduce((bytes, { offset, name, length }) => {
        // length is a byte offset
        const characterLength = length * 2;
        let linkId = `__${name.slice(0, characterLength - 2)}`;
        while (linkId.length < characterLength) {
            linkId += "_";
        }
        const start = offset * 2;
        return `${bytes.substring(0, start)}${linkId}${bytes.substring(start + characterLength)}`;
    }, bytes);
    return `0x${bytes}`;
}
exports.forBytecode = forBytecode;
//# sourceMappingURL=NewToLegacy.js.map

/***/ }),

/***/ 753304:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NewToLegacy = exports.LegacyToNew = void 0;
exports.LegacyToNew = __importStar(__webpack_require__(899164));
exports.NewToLegacy = __importStar(__webpack_require__(626624));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 402543:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.collectSources = void 0;
const path = __importStar(__webpack_require__(385622));
/**
 * Collects sources, targets into collections with OS-independent paths,
 * along with a reverse mapping to the original path (for post-processing)
 *
 * @param originalSources - { [originalSourcePath]: contents }
 * @param originalTargets - originalSourcePath[]
 * @param baseDirectory - a directory to remove as a prefix
 * @param replacement - what to replace it with
 * @return { sources, targets, originalSourcePaths }
 */
function collectSources(originalSources, originalTargets = [], baseDirectory = "", replacement = "/") {
    const mappedResults = Object.entries(originalSources)
        .map(([originalSourcePath, contents]) => ({
        originalSourcePath,
        contents,
        sourcePath: getPortableSourcePath(replaceRootDirectory(originalSourcePath, baseDirectory, replacement))
    }))
        .map(({ originalSourcePath, sourcePath, contents }) => ({
        sources: {
            [sourcePath]: contents
        },
        // include transformed form as target if original is a target
        targets: originalTargets.includes(originalSourcePath) ? [sourcePath] : [],
        originalSourcePaths: {
            [sourcePath]: originalSourcePath
        }
    }));
    const defaultAccumulator = {
        sources: {},
        targets: [],
        originalSourcePaths: {}
    };
    return mappedResults.reduce((accumulator, result) => ({
        sources: Object.assign({}, accumulator.sources, result.sources),
        targets: [...accumulator.targets, ...result.targets],
        originalSourcePaths: Object.assign({}, accumulator.originalSourcePaths, result.originalSourcePaths)
    }), defaultAccumulator);
}
exports.collectSources = collectSources;
/**
 * @param sourcePath - string
 * @return string - operating system independent path
 * @private
 */
function getPortableSourcePath(sourcePath) {
    let replacement = sourcePath;
    //on Windows, replace backslashes with forward slashes
    if (path.sep === '\\') {
        replacement = sourcePath.replace(/\\/g, "/");
    }
    // Turn G:/.../ into /G/.../ for Windows
    if (replacement.length >= 2 && replacement[1] === ":") {
        replacement = "/" + replacement;
        replacement = replacement.replace(":", "");
    }
    return replacement;
}
function replaceRootDirectory(sourcePath, rootDirectory, replacement) {
    //make sure root directory ends in a separator
    if (!rootDirectory.endsWith(path.sep)) {
        rootDirectory = rootDirectory + path.sep;
    }
    return sourcePath.startsWith(rootDirectory)
        ? replacement + sourcePath.slice(rootDirectory.length) //remove prefix
        : sourcePath;
}
//# sourceMappingURL=sources.js.map

/***/ }),

/***/ 940963:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=types.js.map

/***/ }),

/***/ 241283:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const CompilerSupplier = __webpack_require__(76684);
const Config = __webpack_require__(120553);
const semver = __webpack_require__(734604);
const Profiler = __webpack_require__(879127);
const { run } = __webpack_require__(101033);
const { reportSources } = __webpack_require__(557107);
const OS = __webpack_require__(712087);
const cloneDeep = __webpack_require__(483465);

const getSemverExpression = source => {
  return source.match(/pragma solidity(.*);/)[1]
    ? source.match(/pragma solidity(.*);/)[1].trim()
    : undefined;
};

const getSemverExpressions = sources => {
  return sources
    .map(source => getSemverExpression(source))
    .filter(expression => expression);
};

const validateSemverExpressions = semverExpressions => {
  for (const expression of semverExpressions) {
    if (semver.validRange(expression) === null) {
      const message =
        `Invalid semver expression (${expression}) found in` +
        `one of your contract's imports.`;
      throw new Error(message);
    }
  }
};

// takes an array of versions and an array of semver expressions
// returns a version of the compiler or undefined if none can be found
const findNewestSatisfyingVersion = ({ solcReleases, semverExpressions }) => {
  // releases are ordered from newest to oldest
  return solcReleases.find(version => {
    return semverExpressions.every(expression =>
      semver.satisfies(version, expression)
    );
  });
};

const throwCompilerVersionNotFound = ({ path, semverExpressions }) => {
  const message =
    `Could not find a single version of the Solidity compiler that ` +
    `satisfies the following semver expressions obtained from your source ` +
    `files' pragma statements: ${semverExpressions.join(" - ")}. ` +
    `${OS.EOL}Please check the pragma statements for ${path} and its imports.`;
  throw new Error(message);
};

const compileWithPragmaAnalysis = async ({ paths, options }) => {
  //don't compile if there's yul
  const yulPath = paths.find(path => path.endsWith(".yul"));
  if (yulPath !== undefined) {
    throw new Error(
      `Paths to compile includes Yul source ${yulPath}.  ` +
        `Pragma analysis is not supported when compiling Yul.`
    );
  }
  const filteredPaths = paths.filter(
    path => path.endsWith(".sol") || path.endsWith(".json")
  );
  if (filteredPaths.length === 0) {
    return { compilations: [] };
  }
  const supplierOptions = {
    events: options.events,
    solcConfig: options.compilers.solc
  };
  const compilerSupplier = new CompilerSupplier(supplierOptions);
  const { releases } = await compilerSupplier.getReleases();

  // collect sources by the version of the Solidity compiler that they require
  const versionsAndSources = {};
  for (const path of filteredPaths) {
    const source = (await options.resolver.resolve(path)).body;

    const parserVersion = findNewestSatisfyingVersion({
      solcReleases: releases,
      semverExpressions: [getSemverExpression(source)]
    });
    if (!parserVersion) {
      const m =
        `Could not find a pragma expression in ${path}. To use the ` +
        `"pragma" compiler setting your contracts must contain a pragma ` +
        `expression.`;
      throw new Error(m);
    }

    // allSources is of the format { [filename]: string }
    const { allSources } = await Profiler.requiredSourcesForSingleFile(
      options.with({
        path,
        base_path: options.contracts_directory,
        resolver: options.resolver,
        compilers: {
          solc: {
            version: parserVersion
          }
        }
      })
    );

    // get an array of all the semver expressions in the sources
    const semverExpressions = await getSemverExpressions(
      Object.values(allSources)
    );

    // this really just validates the expressions from the contracts' imports
    // as it has already determined the parser version for each contract
    validateSemverExpressions(semverExpressions);

    const newestSatisfyingVersion = findNewestSatisfyingVersion({
      solcReleases: releases,
      semverExpressions
    });
    if (!newestSatisfyingVersion) {
      throwCompilerVersionNotFound({
        path,
        semverExpressions
      });
    }

    versionsAndSources[newestSatisfyingVersion] = {
      ...versionsAndSources[newestSatisfyingVersion],
      ...allSources
    };
  }

  reportSources({ paths: filteredPaths, options });

  const compilations = [];
  for (const compilerVersion in versionsAndSources) {
    const compilationOptions = {
      compilers: cloneDeep(options.compilers)
    };
    compilationOptions.compilers.solc.version = compilerVersion;

    const config = Config.default().with(compilationOptions);
    const compilation = await run(versionsAndSources[compilerVersion], config);
    if (compilation.contracts.length > 0) {
      compilations.push(compilation);
    }
  }
  return { compilations };
};

module.exports = {
  compileWithPragmaAnalysis
};


/***/ }),

/***/ 76684:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const path = __webpack_require__(385622);
const fs = __webpack_require__(935747);
const semver = __webpack_require__(734604);

const { Docker, Local, Native, VersionRange } = __webpack_require__(213208);

const defaultSolcVersion = "0.5.16";

class CompilerSupplier {
  constructor({ events, solcConfig }) {
    const { version, docker, compilerRoots, parser, spawn } = solcConfig;
    this.events = events;
    this.parser = parser;
    this.version = version ? version : defaultSolcVersion;
    this.docker = docker;
    this.compilerRoots = compilerRoots;
    this.strategyOptions = {};
    if (version) this.strategyOptions.version = this.version;
    if (docker) this.strategyOptions.docker = compilerRoots;
    if (compilerRoots) this.strategyOptions.compilerRoots = compilerRoots;
    if (events) this.strategyOptions.events = events;
    if (spawn) this.strategyOptions.spawn = spawn;
  }

  badInputError(userSpecification) {
    const message =
      `Could not find a compiler version matching ${userSpecification}. ` +
      `compilers.solc.version option must be a string specifying:\n` +
      `   - a path to a locally installed solcjs\n` +
      `   - a solc version or range (ex: '0.4.22' or '^0.5.0')\n` +
      `   - a docker image name (ex: 'stable')\n` +
      `   - 'native' to use natively installed solc\n`;
    return new Error(message);
  }

  async downloadAndCacheSolc(version) {
    if (semver.validRange(version)) {
      return await new VersionRange(this.strategyOptions).getSolcFromCacheOrUrl(
        version
      );
    }

    const message =
      `You must specify a valid solc version to download` +
      `Please ensure that the version you entered, ` +
      `${version}, is valid.`;
    throw new Error(message);
  }

  async load() {
    const userSpecification = this.version;

    let strategy;
    const useDocker = this.docker;
    const useNative = userSpecification === "native";
    const useSpecifiedLocal =
      userSpecification && this.fileExists(userSpecification);
    const isValidVersionRange = semver.validRange(userSpecification);

    if (useDocker) {
      strategy = new Docker(this.strategyOptions);
    } else if (useNative) {
      strategy = new Native(this.strategyOptions);
    } else if (useSpecifiedLocal) {
      strategy = new Local(this.strategyOptions);
    } else if (isValidVersionRange) {
      strategy = new VersionRange(this.strategyOptions);
    }

    if (strategy) {
      const solc = await strategy.load(userSpecification);
      const parserSolc = await this.loadParserSolc(this.parser, solc);
      return { solc, parserSolc };
    } else {
      throw this.badInputError(userSpecification);
    }
  }

  async loadParserSolc(parser, solc) {
    if (parser) {
      this.checkParser(parser);
      const solcVersion = solc.version();
      const normalizedSolcVersion = semver.coerce(solcVersion).version;
      const options = Object.assign({}, this.strategyOptions, {
        version: normalizedSolcVersion
      });
      return await new VersionRange(options).load(normalizedSolcVersion);
    }
    return false;
  }

  checkParser(parser) {
    if (parser !== "solcjs")
      throw new Error(
        `Unsupported parser "${parser}" found in truffle-config.js`
      );
  }

  fileExists(localPath) {
    return fs.existsSync(localPath) || path.isAbsolute(localPath);
  }

  getDockerTags() {
    return new Docker(this.strategyOptions).getDockerTags();
  }

  getReleases() {
    return new VersionRange(this.strategyOptions)
      .getSolcVersions()
      .then(list => {
        const prereleases = list.builds
          .filter(build => build["prerelease"])
          .map(build => build["longVersion"]);

        const { rsort } = semver;
        // ensure releases are listed in descending order
        const releases = rsort(Object.keys(list.releases));

        return {
          prereleases: prereleases,
          releases: releases,
          latestRelease: list.latestRelease
        };
      });
  }

  static getDefaultVersion() {
    return defaultSolcVersion;
  }
}

module.exports = CompilerSupplier;


/***/ }),

/***/ 807430:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const axios = __webpack_require__(409669);
const fs = __webpack_require__(935747);
const { execSync } = __webpack_require__(63129);
const ora = __webpack_require__(963395);
const semver = __webpack_require__(734604);
const LoadingStrategy = __webpack_require__(692435);
const VersionRange = __webpack_require__(777715);

class Docker extends LoadingStrategy {
  async load() {
    // Set a sensible limit for maxBuffer
    // See https://github.com/nodejs/node/pull/23027
    let maxBuffer = 1024 * 1024 * 100;
    if (this.config.spawn && this.config.spawn.maxBuffer) {
      maxBuffer = this.config.spawn.maxBuffer;
    }

    const versionString = await this.validateAndGetSolcVersion();
    const command =
      "docker run --rm -i ethereum/solc:" +
      this.config.version +
      " --standard-json";

    try {
      return {
        compile: options =>
          String(execSync(command, { input: options, maxBuffer })),
        version: () => versionString
      };
    } catch (error) {
      if (error.message === "No matching version found") {
        throw this.errors("noVersion", versionString);
      }
      throw new Error(error);
    }
  }

  getDockerTags() {
    return axios.get(this.config.dockerTagsUrl, { maxRedirects: 50 })
      .then(response => response.data.results.map(item => item.name))
      .catch(error => {
        throw this.errors("noRequest", this.config.dockerTagsUrl, error);
      });
  }

  downloadDockerImage(image) {
    if (!semver.valid(image)) {
      const message =
        `The image version you have provided is not valid.\n` +
        `Please ensure that ${image} is a valid docker image name.`;
      throw new Error(message);
    }
    const spinner = ora({
      text: "Downloading Docker image",
      color: "red"
    }).start();
    try {
      execSync(`docker pull ethereum/solc:${image}`);
      spinner.stop();
    } catch (error) {
      spinner.stop();
      throw new Error(error);
    }
  }

  async validateAndGetSolcVersion() {
    const image = this.config.version;
    const fileName = image + ".version";

    // Skip validation if they've validated for this image before.
    if (this.fileIsCached(fileName)) {
      const cachePath = this.resolveCache(fileName);
      return fs.readFileSync(cachePath, "utf-8");
    }
    // Image specified
    if (!image) throw this.errors("noString", image);

    // Docker exists locally
    try {
      execSync("docker -v");
    } catch (error) {
      throw this.errors("noDocker");
    }

    // Image exists locally
    try {
      execSync("docker inspect --type=image ethereum/solc:" + image);
    } catch (error) {
      console.log(`${image} does not exist locally.\n`);
      console.log("Attempting to download the Docker image.");
      this.downloadDockerImage(image);
    }

    // Get version & cache.
    const version = execSync(
      "docker run ethereum/solc:" + image + " --version"
    );
    const normalized = new VersionRange(this.config).normalizeSolcVersion(
      version
    );
    this.addFileToCache(normalized, fileName);
    return normalized;
  }
}

module.exports = Docker;


/***/ }),

/***/ 692435:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Config = __webpack_require__(120553);
const path = __webpack_require__(385622);
const fs = __webpack_require__(935747);

class LoadingStrategy {
  constructor(options) {
    const defaultConfig = {
      compilerRoots: [
        "https://relay.trufflesuite.com/solc/bin/",
        "https://solc-bin.ethereum.org/bin/",
        "https://ethereum.github.io/solc-bin/bin/"
      ],
      dockerTagsUrl:
        "https://registry.hub.docker.com/v2/repositories/ethereum/solc/tags/"
    };
    this.config = Object.assign({}, defaultConfig, options);
    const compilersDir = path.resolve(
      Config.getTruffleDataDirectory(),
      "compilers"
    );
    const compilerCachePath = path.resolve(compilersDir, "node_modules"); // because babel binds to require & does weird things
    if (!fs.existsSync(compilersDir)) fs.mkdirSync(compilersDir);
    if (!fs.existsSync(compilerCachePath)) fs.mkdirSync(compilerCachePath); // for 5.0.8 users

    this.compilerCachePath = compilerCachePath;
  }

  addFileToCache(code, fileName) {
    const filePath = this.resolveCache(fileName);
    fs.writeFileSync(filePath, code);
  }

  errors(kind, input, error) {
    const info = "Run `truffle compile --list` to see available versions.";

    const kinds = {
      noPath: "Could not find compiler at: " + input,
      noVersion:
        `Could not find a compiler version matching ${input}. ` +
        `Please ensure you are specifying a valid version, constraint or ` +
        `build in the truffle config. ${info}`,
      noRequest:
        "Failed to complete request to: " +
        input +
        ". Are you connected to the internet?\n\n" +
        error,
      noUrl: "compiler root URL missing",
      noDocker:
        "You are trying to run dockerized solc, but docker is not installed.",
      noImage:
        "Please pull " +
        input +
        " from docker before trying to compile with it.",
      noNative: "Could not execute local solc binary: " + error,
      noString:
        "`compilers.solc.version` option must be a string specifying:\n" +
        "   - a path to a locally installed solcjs\n" +
        "   - a solc version or range (ex: '0.4.22' or '^0.5.0')\n" +
        "   - a docker image name (ex: 'stable')\n" +
        "   - 'native' to use natively installed solc\n" +
        "Received: " +
        input +
        " instead."
    };

    return new Error(kinds[kind]);
  }

  fileIsCached(fileName) {
    const file = this.resolveCache(fileName);
    return fs.existsSync(file);
  }

  load(_userSpecification) {
    throw new Error(
      "Abstract method LoadingStrategy.load is not implemented for this strategy."
    );
  }

  markListeners() {
    return {
      uncaughtException: new Set(process.listeners("uncaughtException")),
      unhandledRejection: new Set(process.listeners("unhandledRejection")),
    };
  }

  /**
   * Cleans up error listeners left by soljson
   * Use with `markListeners()`
   */
  removeListener(markedListeners) {
    for (const eventName in markedListeners) {
      const marked = markedListeners[eventName];
      for (const listener of process.listeners(eventName)) {
        if (!marked.has(listener)) {
          process.removeListener(eventName, listener);
        }
      }
    }
  }

  resolveCache(fileName) {
    return path.resolve(this.compilerCachePath, fileName);
  }
}

module.exports = LoadingStrategy;


/***/ }),

/***/ 399220:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const path = __webpack_require__(385622);
const originalRequire = __webpack_require__(588277);
const LoadingStrategy = __webpack_require__(692435);
const solcWrap = __webpack_require__(482021);

class Local extends LoadingStrategy {
  load(localPath) {
    return this.getLocalCompiler(localPath);
  }

  getLocalCompiler(localPath) {
    const markedListeners = this.markListeners();
    try {
      let soljson, compilerPath, wrapped;
      compilerPath = path.isAbsolute(localPath)
        ? localPath
        : path.resolve(process.cwd(), localPath);

      try {
        soljson = originalRequire(compilerPath);
      } catch (error) {
        throw this.errors("noPath", localPath, error);
      }
      //HACK: if it has a compile function, assume it's already wrapped
      return soljson.compile ? soljson : solcWrap(soljson);
    } finally {
      this.removeListener(markedListeners);
    }
  }
}

module.exports = Local;


/***/ }),

/***/ 461657:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { execSync } = __webpack_require__(63129);
const LoadingStrategy = __webpack_require__(692435);
const VersionRange = __webpack_require__(777715);

class Native extends LoadingStrategy {
  load() {
    const versionString = this.validateAndGetSolcVersion();
    const command = "solc --standard-json";
    const maxBuffer = 1024 * 1024 * 10;

    try {
      return {
        compile: options =>
          String(execSync(command, { input: options, maxBuffer })),
        version: () => versionString
      };
    } catch (error) {
      if (error.message === "No matching version found") {
        throw this.errors("noVersion", versionString);
      }
      throw new Error(error);
    }
  }

  validateAndGetSolcVersion() {
    let version;
    try {
      version = execSync("solc --version");
    } catch (error) {
      throw this.errors("noNative", null, error);
    }
    return new VersionRange(this.config).normalizeSolcVersion(version);
  }
}

module.exports = Native;


/***/ }),

/***/ 777715:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const debug = __webpack_require__(424758)("compile:compilerSupplier");
const requireFromString = __webpack_require__(846029);
const fs = __webpack_require__(935747);
const originalRequire = __webpack_require__(588277);
const axios = __webpack_require__(409669).default;
const semver = __webpack_require__(734604);
const solcWrap = __webpack_require__(482021);
const LoadingStrategy = __webpack_require__(692435);

class VersionRange extends LoadingStrategy {
  compilerFromString(code) {
    const markedListeners = this.markListeners();
    try {
      const soljson = requireFromString(code);
      return solcWrap(soljson);
    } finally {
      this.removeListener(markedListeners);
    }
  }

  findNewestValidVersion(version, allVersions) {
    if (!semver.validRange(version)) return null;
    const satisfyingVersions = Object.keys(allVersions.releases)
      .map(solcVersion => {
        if (semver.satisfies(solcVersion, version)) return solcVersion;
      })
      .filter(solcVersion => solcVersion);
    if (satisfyingVersions.length > 0) {
      return satisfyingVersions.reduce((newestVersion, version) => {
        return semver.gtr(version, newestVersion) ? version : newestVersion;
      }, "0.0.0");
    } else {
      return null;
    }
  }

  getCachedSolcByFileName(fileName) {
    const markedListeners = this.markListeners();
    try {
      const filePath = this.resolveCache(fileName);
      const soljson = originalRequire(filePath);
      debug("soljson %o", soljson);
      return solcWrap(soljson);
    } finally {
      this.removeListener(markedListeners);
    }
  }

  // Range can also be a single version specification like "0.5.0"
  getCachedSolcByVersionRange(version) {
    const cachedCompilerFileNames = fs.readdirSync(this.compilerCachePath);
    const validVersions = cachedCompilerFileNames.filter(fileName => {
      const match = fileName.match(/v\d+\.\d+\.\d+.*/);
      if (match) return semver.satisfies(match[0], version);
    });

    const multipleValidVersions = validVersions.length > 1;
    const compilerFileName = multipleValidVersions
      ? this.getMostRecentVersionOfCompiler(validVersions)
      : validVersions[0];
    return this.getCachedSolcByFileName(compilerFileName);
  }

  getCachedSolcFileName(commit) {
    const cachedCompilerFileNames = fs.readdirSync(this.compilerCachePath);
    return cachedCompilerFileNames.find(fileName => {
      return fileName.includes(commit);
    });
  }

  getMostRecentVersionOfCompiler(versions) {
    return versions.reduce((mostRecentVersionFileName, fileName) => {
      const match = fileName.match(/v\d+\.\d+\.\d+.*/);
      const mostRecentVersionMatch = mostRecentVersionFileName.match(
        /v\d+\.\d+\.\d+.*/
      );
      return semver.gtr(match[0], mostRecentVersionMatch[0])
        ? fileName
        : mostRecentVersionFileName;
    }, "-v0.0.0+commit");
  }

  getSatisfyingVersionFromCache(versionRange) {
    if (this.versionIsCached(versionRange)) {
      return this.getCachedSolcByVersionRange(versionRange);
    }
    throw this.errors("noVersion", versionRange);
  }

  async getSolcByCommit(commit) {
    const solcFileName = this.getCachedSolcFileName(commit);
    if (solcFileName) return this.getCachedSolcByFileName(solcFileName);

    const allVersions = await this.getSolcVersions();
    const fileName = this.getSolcVersionFileName(commit, allVersions);

    if (!fileName) throw new Error("No matching version found");
    return this.getSolcByUrlAndCache(fileName);
  }

  async getSolcByUrlAndCache(fileName, index = 0) {
    const url = `${this.config.compilerRoots[index].replace(
      /\/+$/,
      ""
    )}/${fileName}`;
    const { events } = this.config;
    events.emit("downloadCompiler:start", {
      attemptNumber: index + 1
    });
    try {
      const response = await axios.get(url, { maxRedirects: 50 });
      events.emit("downloadCompiler:succeed");
      this.addFileToCache(response.data, fileName);
      return this.compilerFromString(response.data);
    } catch (error) {
      events.emit("downloadCompiler:fail");
      if (index >= this.config.compilerRoots.length - 1) {
        throw this.errors("noRequest", "compiler URLs", error);
      }
      return this.getSolcByUrlAndCache(fileName, index + 1);
    }
  }

  async getSolcFromCacheOrUrl(versionConstraint) {
    let allVersions, versionToUse;
    try {
      allVersions = await this.getSolcVersions();
    } catch (error) {
      throw this.errors("noRequest", versionConstraint, error);
    }
    const isVersionRange = !semver.valid(versionConstraint);

    versionToUse = isVersionRange
      ? this.findNewestValidVersion(versionConstraint, allVersions)
      : versionConstraint;
    const fileName = this.getSolcVersionFileName(versionToUse, allVersions);

    if (!fileName) throw this.errors("noVersion", versionToUse);

    if (this.fileIsCached(fileName))
      return this.getCachedSolcByFileName(fileName);
    return this.getSolcByUrlAndCache(fileName);
  }

  getSolcVersions(index = 0) {
    const { events } = this.config;
    events.emit("fetchSolcList:start", { attemptNumber: index + 1 });
    if (!this.config.compilerRoots || this.config.compilerRoots.length < 1) {
      events.emit("fetchSolcList:fail");
      throw this.errors("noUrl");
    }
    const { compilerRoots } = this.config;

    // trim trailing slashes from compilerRoot
    const url = `${compilerRoots[index].replace(/\/+$/, "")}/list.json`;
    return axios
      .get(url, { maxRedirects: 50 })
      .then(response => {
        events.emit("fetchSolcList:succeed");
        return response.data;
      })
      .catch(error => {
        events.emit("fetchSolcList:fail");
        if (index >= this.config.compilerRoots.length - 1) {
          throw this.errors("noRequest", "version URLs", error);
        }
        return this.getSolcVersions(index + 1);
      });
  }

  getSolcVersionFileName(version, allVersions) {
    if (allVersions.releases[version]) return allVersions.releases[version];

    const isPrerelease =
      version.includes("nightly") || version.includes("commit");

    if (isPrerelease) {
      for (let build of allVersions.builds) {
        const exists =
          build["prerelease"] === version ||
          build["build"] === version ||
          build["longVersion"] === version;

        if (exists) return build["path"];
      }
    }

    const versionToUse = this.findNewestValidVersion(version, allVersions);

    if (versionToUse) return allVersions.releases[versionToUse];

    return null;
  }

  async load(versionRange) {
    const rangeIsSingleVersion = semver.valid(versionRange);
    if (rangeIsSingleVersion && this.versionIsCached(versionRange)) {
      return this.getCachedSolcByVersionRange(versionRange);
    }

    try {
      return await this.getSolcFromCacheOrUrl(versionRange);
    } catch (error) {
      if (error.message.includes("Failed to complete request")) {
        return this.getSatisfyingVersionFromCache(versionRange);
      }
      throw new Error(error);
    }
  }

  normalizeSolcVersion(input) {
    const version = String(input);
    return version.split(":")[1].trim();
  }

  versionIsCached(version) {
    const cachedCompilerFileNames = fs.readdirSync(this.compilerCachePath);
    const cachedVersions = cachedCompilerFileNames.map(fileName => {
      const match = fileName.match(/v\d+\.\d+\.\d+.*/);
      if (match) return match[0];
    });
    return cachedVersions.find(cachedVersion =>
      semver.satisfies(cachedVersion, version)
    );
  }
}

module.exports = VersionRange;


/***/ }),

/***/ 213208:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = {
  Docker: __webpack_require__(807430),
  LoadingStrategy: __webpack_require__(692435),
  Local: __webpack_require__(399220),
  Native: __webpack_require__(461657),
  VersionRange: __webpack_require__(777715)
};


/***/ }),

/***/ 611105:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const debug = __webpack_require__(424758)("compile");
const findContracts = __webpack_require__(123542);
const Config = __webpack_require__(120553);
const Profiler = __webpack_require__(879127);
const CompilerSupplier = __webpack_require__(76684);
const { run } = __webpack_require__(101033);
const { normalizeOptions } = __webpack_require__(80276);
const { compileWithPragmaAnalysis } = __webpack_require__(241283);
const { reportSources } = __webpack_require__(557107);
const expect = __webpack_require__(414096);
const partition = __webpack_require__(246748);
const fs = __webpack_require__(655674);

async function compileYulPaths(yulPaths, options) {
  let yulCompilations = [];
  for (const path of yulPaths) {
    const yulOptions = options.with({ compilationTargets: [path] });
    //load up Yul sources, since they weren't loaded up earlier
    //(we'll just use FS for this rather than going through the resolver,
    //for simplicity, since there are no imports to worry about)
    const yulSource = fs.readFileSync(path, { encoding: "utf8" });
    debug("Compiling Yul");
    const compilation = await run({ [path]: yulSource }, yulOptions, "Yul");
    debug("Yul compiled successfully");

    // returns CompilerResult - see @truffle/compile-common
    if (compilation.contracts.length > 0) {
      yulCompilations.push(compilation);
    }
  }
  if (yulPaths.length > 0 && !options.quiet) {
    //replacement for individual Yul warnings
    options.logger.log(
      "> Warning: Yul is still experimental. Avoid using it in live deployments."
    );
  }
  return yulCompilations;
}

const Compile = {
  // this takes an object with keys being the name and values being source
  // material as well as an options object
  async sources({ sources, options }) {
    options = Config.default().merge(options);
    options = normalizeOptions(options);
    //note: "solidity" here includes JSON as well!
    const [yulNames, solidityNames] = partition(Object.keys(sources), name =>
      name.endsWith(".yul")
    );
    const soliditySources = Object.assign(
      {},
      ...solidityNames.map(name => ({ [name]: sources[name] }))
    );
    let solidityCompilations = [];
    let yulCompilations = [];
    if (solidityNames.length > 0) {
      debug("Compiling Solidity (specified sources)");
      const compilation = await run(soliditySources, options);
      debug("Compiled Solidity");
      if (compilation.contracts.length > 0) {
        solidityCompilations = [compilation];
      }
    }
    for (const name of yulNames) {
      debug("Compiling Yul (specified sources)");
      const compilation = await run({ [name]: sources[name] }, options, "Yul");
      debug("Compiled Yul");
      yulCompilations.push(compilation);
    }
    return { compilations: [...solidityCompilations, ...yulCompilations] };
  },

  async all(options) {
    const paths = [
      ...new Set([
        ...(await findContracts(options.contracts_directory)),
        ...(options.files || [])
      ])
    ];

    return await Compile.sourcesWithDependencies({
      paths,
      options
    });
  },

  async necessary(options) {
    options.logger = options.logger || console;

    const paths = await Profiler.updated(options);

    return await Compile.sourcesWithDependencies({
      paths,
      options
    });
  },

  // this takes an array of paths and options
  async sourcesWithDependencies({ paths, options }) {
    if (options.compilers.solc.version === "pragma") {
      return this.sourcesWithPragmaAnalysis({ paths, options });
    }

    options.logger = options.logger || console;
    options.contracts_directory = options.contracts_directory || process.cwd();

    debug("paths: %O", paths);

    expect.options(options, [
      "working_directory",
      "contracts_directory",
      "resolver"
    ]);

    options = Config.default().merge(options);
    options = normalizeOptions(options);

    //note: solidityPaths here still includes JSON as well!
    const [yulPaths, solidityPaths] = partition(paths, path =>
      path.endsWith(".yul")
    );

    debug("invoking profiler");
    //only invoke profiler on Solidity, not Yul
    const { allSources, compilationTargets } = await Profiler.requiredSources(
      options.with({
        paths: solidityPaths,
        base_path: options.contracts_directory,
        resolver: options.resolver
      })
    );
    debug("compilationTargets: %O", compilationTargets);

    // we can exit if there are no Solidity/Yul files to compile since
    // it indicates that we only have Vyper-related JSON
    const solidityTargets = compilationTargets.filter(fileName =>
      fileName.endsWith(".sol")
    );
    if (solidityTargets.length === 0 && yulPaths.length === 0) {
      return { compilations: [] };
    }

    reportSources({ paths: [...compilationTargets, ...yulPaths], options });

    let solidityCompilations = [];
    // only call run if there are sources to run on!
    if (Object.keys(allSources).length > 0) {
      const solidityOptions = options.with({ compilationTargets });
      debug("Compiling Solidity");
      const compilation = await run(allSources, solidityOptions);
      debug("Solidity compiled successfully");

      // returns CompilerResult - see @truffle/compile-common
      if (compilation.contracts.length > 0) {
        solidityCompilations = [compilation];
      }
    }

    const yulCompilations = await compileYulPaths(yulPaths, options);

    return {
      compilations: [...solidityCompilations, ...yulCompilations]
    };
  },

  async sourcesWithPragmaAnalysis({ paths, options }) {
    return compileWithPragmaAnalysis({ paths, options });
  }
};

module.exports = {
  Compile,
  CompilerSupplier
};


/***/ }),

/***/ 80276:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const expect = __webpack_require__(414096);

const normalizeOptions = options => {
  if (options.logger === undefined) options.logger = console;

  expect.options(options, ["contracts_directory", "compilers"]);
  expect.options(options.compilers, ["solc"]);

  options.compilers.solc.settings.evmVersion =
    options.compilers.solc.settings.evmVersion ||
    options.compilers.solc.evmVersion;
  options.compilers.solc.settings.optimizer =
    options.compilers.solc.settings.optimizer ||
    options.compilers.solc.optimizer ||
    {};

  // Grandfather in old solc config
  if (options.solc) {
    options.compilers.solc.settings.evmVersion = options.solc.evmVersion;
    options.compilers.solc.settings.optimizer = options.solc.optimizer;
  }

  // Certain situations result in `{}` as a value for compilationTargets
  // Previous implementations treated any value lacking `.length` as equivalent
  // to `[]`
  // (This also happens when run() is called from sources(), so
  // compilationTargets is not passed)
  if (!options.compilationTargets || !options.compilationTargets.length) {
    options.compilationTargets = [];
  }

  return options;
};

module.exports = {
  normalizeOptions
};


/***/ }),

/***/ 118992:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const debug = __webpack_require__(424758)("compile:parser");

// Warning issued by a pre-release compiler version, ignored by this component.
const preReleaseCompilerWarning =
  "This is a pre-release compiler version, please do not use it in production.";

module.exports = {
  // This needs to be fast! It is fast (as of this writing). Keep it fast!
  parseImports(body, solc) {
    // WARNING: Kind of a hack (an expedient one).

    // So we don't have to maintain a separate parser, we'll get all the imports
    // in a file by sending the file to solc and evaluating the error messages
    // to see what import statements couldn't be resolved. To prevent full-on
    // compilation when a file has no import statements, we inject an import
    // statement right on the end; just to ensure it will error and we can parse
    // the imports speedily without doing extra work.

    // Inject failing import.
    const failingImportFileName = "__Truffle__NotFound.sol";

    body = `${body}\n\nimport '${failingImportFileName}';\n`;

    const solcStandardInput = {
      language: "Solidity",
      sources: {
        "ParsedContract.sol": {
          content: body
        }
      },
      settings: {
        outputSelection: {
          "ParsedContract.sol": {
            "*": [] // We don't need any output.
          }
        }
      }
    };

    // By compiling only with ParsedContract.sol as the source, solc.compile returns file import errors for each import path.
    let output = solc.compile(JSON.stringify(solcStandardInput));
    output = JSON.parse(output);

    // Filter out the "pre-release compiler" warning, if present.
    const errors = output.errors.filter(
      ({ message }) => !message.includes(preReleaseCompilerWarning)
    );

    debug("errors: %O", errors);

    // Filter out our forced import, then get the import paths of the rest.
    const imports = errors
      .map(({ formattedMessage, message }) => {
        // Multiline import check which works for solcjs and solc
        // solcjs: ^ (Relevant source part starts here and spans across multiple lines)
        // solc: Spanning multiple lines.
        if (formattedMessage.includes("multiple lines")) {
          // Parse the import filename from the error message, this does not include the full path to the import
          const matches = message.match(/Source[^'"]?.*?("|')([^'"]+)("|')/);
          if (matches) {
            // Extract the full path by matching against body with the import filename
            const fullPathRegex = new RegExp(`("|')(.*${matches[2]})("|')`);
            const importMatches = body.match(fullPathRegex);
            if (importMatches) return importMatches[2];
          }
        } else {
          const matches = formattedMessage.match(
            /import[^'"]?.*("|')([^'"]+)("|')/
          );

          // Return the item between the quotes.
          if (matches) return matches[2];
        }
      })
      .filter(match => match !== undefined && match !== failingImportFileName);

    return imports;
  }
};


/***/ }),

/***/ 879127:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Compares .sol files to their .sol.js counterparts,
// determines which .sol files have been updated.

const debug = __webpack_require__(424758)("compile:profiler");
const Common = __webpack_require__(529833);
const { loadParser } = __webpack_require__(745616);
const { shouldIncludePath } = __webpack_require__(577053);

module.exports = {
  updated: async options => {
    const profiler = await new Common.Profiler({});
    return await profiler.updated(options);
  },

  // Returns the minimal set of sources to pass to solc as compilations targets,
  // as well as the complete set of sources so solc can resolve the comp targets' imports.
  requiredSources: async options => {
    // get parser
    const parseImports = await loadParser(options);

    // generate profiler
    const profiler = new Common.Profiler({
      parseImports,
      shouldIncludePath
    });

    // invoke profiler
    return await profiler.requiredSources(options);
  },

  requiredSourcesForSingleFile: async options => {
    const parseImports = await loadParser(options);

    const profiler = new Common.Profiler({
      parseImports,
      shouldIncludePath
    });

    return profiler.requiredSourcesForSingleFile(options);
  }
};


/***/ }),

/***/ 745616:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const CompilerSupplier = __webpack_require__(76684);
const Parser = __webpack_require__(118992);
const semver = __webpack_require__(734604);

async function loadParser(options) {
  // Load compiler
  const supplierOptions = {
    parser: options.parser,
    events: options.events,
    solcConfig: options.compilers.solc
  };

  const supplier = new CompilerSupplier(supplierOptions);

  const { solc, parserSolc } = await supplier.load();

  // use explicit parser solc if defined, otherwise just default compiler solc
  return makeParseImports(parserSolc || solc);
}

function makeParseImports(parser) {
  const parseImports = body => {
    try {
      return Parser.parseImports(body, parser);
    } catch (err) {
      if (err.message.includes("requires different compiler version")) {
        const contractSolcPragma = err.message.match(/pragma solidity[^;]*/gm);
        // if there's a match provide the helpful error, otherwise return solc's error output
        if (contractSolcPragma) {
          const contractSolcVer = contractSolcPragma[0];
          const configSolcVer = semver.valid(solc.version());
          err.message = err.message.concat(
            `\n\nError: Truffle is currently using solc ${configSolcVer}, but one or more of your contracts specify "${contractSolcVer}".\nPlease update your truffle config or pragma statement(s).\n(See https://trufflesuite.com/docs/truffle/reference/configuration#compiler-configuration for information on\nconfiguring Truffle to use a specific solc compiler version.)\n`
          );
        } else {
          err.message = `Error parsing ${currentFile}: ${err.message}`;
        }
      }

      throw err;
    }
  };

  return parseImports;
}

module.exports = { loadParser };


/***/ }),

/***/ 577053:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const path = __webpack_require__(385622);

function shouldIncludePath(filePath) {
  const validExtensions = [".sol", ".json"];
  return validExtensions.some(extension => path.extname(filePath) === extension);
}

module.exports = { shouldIncludePath };


/***/ }),

/***/ 557107:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const path = __webpack_require__(385622);

const reportSources = ({ paths, options }) => {
  if (options.quiet !== true && options.events) {
    if (!Array.isArray(paths)) {
      paths = Object.keys(paths);
    }

    const blacklistRegex = /^truffle\//;

    const sources = paths
      .sort()
      .map(contract => {
        if (path.isAbsolute(contract)) {
          contract =
            "." +
            path.sep +
            path.relative(options.working_directory, contract);
        }
        if (contract.match(blacklistRegex) || contract.endsWith(".json")) {
          return;
        }
        return contract;
      })
      .filter(contract => contract);
    options.events.emit("compile:sourcesToCompile", {
      sourceFileNames: sources
    });
  }
}

module.exports = {
  reportSources
};


/***/ }),

/***/ 101033:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const debug = __webpack_require__(424758)("compile:run");
const OS = __webpack_require__(712087);
const semver = __webpack_require__(734604);
const Common = __webpack_require__(529833);
const CompilerSupplier = __webpack_require__(76684);

// this function returns a Compilation - legacy/index.js and ./index.js
// both check to make sure rawSources exist before calling this method
// however, there is a check here that returns null if no sources exist
async function run(rawSources, options, language = "Solidity") {
  if (Object.keys(rawSources).length === 0) {
    return null;
  }

  // Ensure sources have operating system independent paths
  // i.e., convert backslashes to forward slashes; things like C: are left intact.
  // we also strip the project root (to avoid it appearing in metadata)
  // and replace it with "project:/"
  const {
    sources,
    targets,
    originalSourcePaths
  } = Common.Sources.collectSources(
    rawSources,
    options.compilationTargets,
    options.working_directory,
    "project:/"
  );

  // construct solc compiler input
  const compilerInput = prepareCompilerInput({
    sources,
    targets,
    language,
    settings: options.compilers.solc.settings,
    modelCheckerSettings: options.compilers.solc.modelCheckerSettings
  });

  // perform compilation
  const { compilerOutput, solcVersion } = await invokeCompiler({
    compilerInput,
    options
  });
  debug("compilerOutput: %O", compilerOutput);

  // handle warnings as errors if options.strict
  // log if not options.quiet
  const { warnings, errors } = detectErrors({
    compilerOutput,
    options,
    solcVersion
  });
  if (warnings.length > 0) {
    options.events.emit("compile:warnings", { warnings });
  }

  if (errors.length > 0) {
    if (!options.quiet) {
      options.logger.log("");
    }

    throw new Common.Errors.CompileError(errors);
  }

  // success case
  // returns Compilation - see @truffle/compile-common
  const outputSources = processAllSources({
    sources,
    compilerOutput,
    originalSourcePaths,
    language
  });
  const sourceIndexes = outputSources
    ? outputSources.map(source => source.sourcePath)
    : undefined; //leave undefined if sources undefined
  return {
    sourceIndexes,
    contracts: processContracts({
      sources,
      compilerOutput,
      solcVersion,
      originalSourcePaths
    }),
    sources: outputSources,
    compiler: {
      name: "solc",
      version: solcVersion
    }
  };
}

function orderABI({ abi, contractName, ast }) {
  if (!abi) {
    return []; //Yul doesn't return ABIs, but we require something
  }

  if (!ast || !ast.nodes) {
    return abi;
  }

  // AST can have multiple contract definitions, make sure we have the
  // one that matches our contract
  const contractDefinition = ast.nodes.find(
    ({ nodeType, name }) =>
      nodeType === "ContractDefinition" && name === contractName
  );

  if (!contractDefinition || !contractDefinition.nodes) {
    return abi;
  }

  // Find all function definitions
  const orderedFunctionNames = contractDefinition.nodes
    .filter(({ nodeType }) => nodeType === "FunctionDefinition")
    .map(({ name: functionName }) => functionName);

  // Put function names in a hash with their order, lowest first, for speed.
  const functionIndexes = orderedFunctionNames
    .map((functionName, index) => ({ [functionName]: index }))
    .reduce((a, b) => Object.assign({}, a, b), {});

  // Construct new ABI with functions at the end in source order
  return [
    ...abi.filter(({ name }) => functionIndexes[name] === undefined),

    // followed by the functions in the source order
    ...abi
      .filter(({ name }) => functionIndexes[name] !== undefined)
      .sort(
        ({ name: a }, { name: b }) => functionIndexes[a] - functionIndexes[b]
      )
  ];
}

/**
 * @param sources - { [sourcePath]: contents }
 * @param targets - sourcePath[]
 * @param setings - subset of Solidity settings
 * @return solc compiler input JSON
 */
function prepareCompilerInput({
  sources,
  targets,
  language,
  settings,
  modelCheckerSettings
}) {
  return {
    language,
    sources: prepareSources({ sources }),
    settings: {
      evmVersion: settings.evmVersion,
      optimizer: settings.optimizer,
      remappings: settings.remappings,
      debug: settings.debug,
      metadata: settings.metadata,
      libraries: settings.libraries,
      viaIR: settings.viaIR,
      modelChecker: settings.modelChecker,
      // Specify compilation targets. Each target uses defaultSelectors,
      // defaulting to single target `*` if targets are unspecified
      outputSelection: prepareOutputSelection({ targets })
    },
    modelCheckerSettings
  };
}

/**
 * Convert sources into solc compiler input format
 * @param sources - { [sourcePath]: string }
 * @return { [sourcePath]: { content: string } }
 */
function prepareSources({ sources }) {
  return Object.entries(sources)
    .map(([sourcePath, content]) => ({ [sourcePath]: { content } }))
    .reduce((a, b) => Object.assign({}, a, b), {});
}

/**
 * If targets are specified, specify output selectors for each individually.
 * Otherwise, just use "*" selector
 * @param targets - sourcePath[] | undefined
 */
function prepareOutputSelection({ targets = [] }) {
  const defaultSelectors = {
    "": ["legacyAST", "ast"],
    "*": [
      "abi",
      "metadata",
      "evm.bytecode.object",
      "evm.bytecode.linkReferences",
      "evm.bytecode.sourceMap",
      "evm.bytecode.generatedSources",
      "evm.deployedBytecode.object",
      "evm.deployedBytecode.linkReferences",
      "evm.deployedBytecode.sourceMap",
      "evm.deployedBytecode.immutableReferences",
      "evm.deployedBytecode.generatedSources",
      "userdoc",
      "devdoc"
    ]
  };

  if (!targets.length) {
    return {
      "*": defaultSelectors
    };
  }

  return targets
    .map(target => ({ [target]: defaultSelectors }))
    .reduce((a, b) => Object.assign({}, a, b), {});
}

/**
 * Load solc and perform compilation
 */
async function invokeCompiler({ compilerInput, options }) {
  const supplierOptions = {
    parser: options.parser,
    events: options.events,
    solcConfig: options.compilers.solc
  };
  const supplier = new CompilerSupplier(supplierOptions);
  const { solc } = await supplier.load();
  const solcVersion = solc.version();

  // perform compilation
  const inputString = JSON.stringify(compilerInput);
  const outputString = solc.compile(inputString);
  const compilerOutput = JSON.parse(outputString);

  return {
    compilerOutput,
    solcVersion
  };
}

/**
 * Extract errors/warnings from compiler output based on strict mode setting
 * @return { errors: string, warnings: string }
 */
function detectErrors({
  compilerOutput: { errors: outputErrors },
  options,
  solcVersion
}) {
  outputErrors = outputErrors || [];
  const rawErrors = options.strict
    ? outputErrors
    : outputErrors.filter(({ severity }) => severity !== "warning");

  const rawWarnings = options.strict
    ? [] // none of those in strict mode
    : outputErrors.filter(({ severity, message }) =>
      severity === "warning" &&
      message !== "Yul is still experimental. Please use the output with care." //filter out Yul warning
    );

  // extract messages
  let errors = rawErrors.map(
    ({ formattedMessage }) => formattedMessage.replace(
      /: File import callback not supported/g, //remove this confusing message suffix
      ""
    )
  ).join();
  const warnings = rawWarnings.map(({ formattedMessage }) => formattedMessage);

  if (errors.includes("requires different compiler version")) {
    const contractSolcVer = errors.match(/pragma solidity[^;]*/gm)[0];
    const configSolcVer =
      options.compilers.solc.version || semver.valid(solcVersion);

    errors = errors.concat(
      [
        OS.EOL,
        `Error: Truffle is currently using solc ${configSolcVer}, `,
        `but one or more of your contracts specify "${contractSolcVer}".`,
        OS.EOL,
        `Please update your truffle config or pragma statement(s).`,
        OS.EOL,
        `(See https://trufflesuite.com/docs/truffle/reference/configuration#compiler-configuration `,
        `for information on`,
        OS.EOL,
        `configuring Truffle to use a specific solc compiler version.)`
      ].join("")
    );
  }

  return { warnings, errors };
}

/**
 * aggregate source information based on compiled output;
 * this can include sources that do not define any contracts
 */
function processAllSources({ sources, compilerOutput, originalSourcePaths, language }) {
  if (!compilerOutput.sources) {
    const entries = Object.entries(sources);
    if (entries.length === 1) {
      //special case for handling Yul
      const [sourcePath, contents] = entries[0];
      return [{
        sourcePath: originalSourcePaths[sourcePath],
        contents,
        language
      }]
    } else {
      return [];
    }
  }
  let outputSources = [];
  for (const [sourcePath, { id, ast, legacyAST }] of Object.entries(
    compilerOutput.sources
  )) {
    outputSources[id] = {
      sourcePath: originalSourcePaths[sourcePath],
      contents: sources[sourcePath],
      ast,
      legacyAST,
      language
    };
  }
  return outputSources;
}

/**
 * Converts compiler-output contracts into @truffle/compile-solidity's return format
 * Uses compiler contract output plus other information.
 */
function processContracts({
  compilerOutput,
  sources,
  originalSourcePaths,
  solcVersion
}) {
  if (!compilerOutput.contracts) return [];
  return (
    Object.entries(compilerOutput.contracts)
      // map to [[{ source, contractName, contract }]]
      .map(([sourcePath, sourceContracts]) =>
        Object.entries(sourceContracts).map(([contractName, contract]) => ({
          contractName,
          contract,
          source: {
            //some versions of Yul don't have sources in output
            ast: ((compilerOutput.sources || {})[sourcePath] || {}).ast,
            legacyAST: ((compilerOutput.sources || {})[sourcePath] || {}).legacyAST,
            contents: sources[sourcePath],
            sourcePath
          }
        }))
      )
      // and flatten
      .reduce((a, b) => [...a, ...b], [])

      // All source will have a key, but only the compiled source will have
      // the evm output.
      .filter(({ contract: { evm } }) => Object.keys(evm).length > 0)

      // convert to output format
      .map(
        ({
          contractName,
          contract: {
            evm: {
              bytecode: {
                sourceMap,
                linkReferences,
                generatedSources,
                object: bytecode
              },
              deployedBytecode: deployedBytecodeInfo //destructured below
            },
            abi,
            metadata,
            devdoc,
            userdoc
          },
          source: {
            ast,
            legacyAST,
            sourcePath: transformedSourcePath,
            contents: source
          }
        }) => ({
          contractName,
          abi: orderABI({ abi, contractName, ast }),
          metadata,
          devdoc,
          userdoc,
          sourcePath: originalSourcePaths[transformedSourcePath],
          source,
          sourceMap,
          deployedSourceMap: (deployedBytecodeInfo || {}).sourceMap,
          ast,
          legacyAST,
          bytecode: zeroLinkReferences({
            bytes: bytecode,
            linkReferences: formatLinkReferences(linkReferences)
          }),
          deployedBytecode: zeroLinkReferences({
            bytes: (deployedBytecodeInfo || {}).object,
            linkReferences: formatLinkReferences((deployedBytecodeInfo || {}).linkReferences)
          }),
          immutableReferences: (deployedBytecodeInfo || {}).immutableReferences,
          //ideally immutable references would be part of the deployedBytecode object,
          //but compatibility makes that impossible
          generatedSources,
          deployedGeneratedSources: (deployedBytecodeInfo || {}).generatedSources,
          compiler: {
            name: "solc",
            version: solcVersion
          }
        })
      )
  );
}

function formatLinkReferences(linkReferences) {
  if (!linkReferences) {
    return [];
  }

  // convert to flat list
  const libraryLinkReferences = Object.values(linkReferences)
    .map(fileLinks =>
      Object.entries(fileLinks).map(([name, links]) => ({
        name,
        links
      }))
    )
    .reduce((a, b) => [...a, ...b], []);

  // convert to { offsets, length, name } format
  return libraryLinkReferences.map(({ name, links }) => ({
    offsets: links.map(({ start }) => start),
    length: links[0].length, // HACK just assume they're going to be the same
    name
  }));
}

// takes linkReferences in output format (not Solidity's format)
function zeroLinkReferences({ bytes, linkReferences }) {
  if (bytes === undefined) {
    return undefined;
  }
  // inline link references - start by flattening the offsets
  const flattenedLinkReferences = linkReferences
    // map each link ref to array of link refs with only one offset
    .map(({ offsets, length, name }) =>
      offsets.map(offset => ({ offset, length, name }))
    )
    // flatten
    .reduce((a, b) => [...a, ...b], []);

  // then overwite bytes with zeroes
  bytes = flattenedLinkReferences.reduce((bytes, { offset, length }) => {
    // length is a byte offset
    const characterLength = length * 2;
    const start = offset * 2;

    const zeroes = "0".repeat(characterLength);

    return `${bytes.substring(0, start)}${zeroes}${bytes.substring(
      start + characterLength
    )}`;
  }, bytes);

  return { bytes, linkReferences };
}

module.exports = { run };


/***/ }),

/***/ 969203:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.configProps = exports.getInitialConfig = void 0;
const lodash_assignin_1 = __importDefault(__webpack_require__(205089));
const path = __importStar(__webpack_require__(385622));
const provider_1 = __importDefault(__webpack_require__(200509));
const getInitialConfig = ({ truffleDirectory, workingDirectory, network }) => {
    const truffle_directory = truffleDirectory || path.resolve(path.join(__dirname, "../"));
    const working_directory = workingDirectory || process.cwd();
    return {
        truffle_directory,
        working_directory,
        network,
        networks: {},
        verboseRpc: false,
        gas: null,
        gasPrice: null,
        from: null,
        confirmations: 0,
        timeoutBlocks: 0,
        production: false,
        skipDryRun: false,
        build: null,
        resolver: null,
        artifactor: null,
        ethpm: {
            ipfs_host: "ipfs.infura.io",
            ipfs_protocol: "https",
            registry: "0x8011df4830b4f696cd81393997e5371b93338878",
            install_provider_uri: "https://ropsten.infura.io/v3/26e88e46be924823983710becd929f36"
        },
        ens: {
            enabled: false,
            registryAddress: null
        },
        mocha: {
            bail: false,
            grep: null
        },
        compilers: {
            solc: {
                settings: {
                    //Note: The default solc version is *not* set here!
                    //It's set in compilerSupplier/index.js in compile-solidity
                    optimizer: {
                        enabled: false,
                        runs: 200
                    },
                    remappings: []
                }
            },
            vyper: {
                settings: {}
            }
        },
        console: {
            require: null
        },
        logger: console
    };
};
exports.getInitialConfig = getInitialConfig;
const configProps = ({ configObject }) => {
    const resolveDirectory = (value) => path.resolve(configObject.working_directory, value);
    const defaultTXValues = {
        gas: 6721975,
        from: null
    };
    return {
        // These are already set.
        truffle_directory() { },
        working_directory() { },
        network() { },
        networks() { },
        verboseRpc() { },
        build() { },
        resolver() { },
        artifactor() { },
        ethpm() { },
        logger() { },
        compilers() { },
        ens() { },
        console() { },
        mocha() { },
        build_directory: {
            default: () => path.join(configObject.working_directory, "build"),
            transform: resolveDirectory
        },
        contracts_directory: {
            default: () => path.join(configObject.working_directory, "contracts"),
            transform: resolveDirectory
        },
        contracts_build_directory: {
            default: () => path.join(configObject.build_directory, "contracts"),
            transform: resolveDirectory
        },
        migrations_directory: {
            default: () => path.join(configObject.working_directory, "migrations"),
            transform: resolveDirectory
        },
        migrations_file_extension_regexp() {
            return /^\.(js|es6?)$/;
        },
        test_directory: {
            default: () => path.join(configObject.working_directory, "test"),
            transform: resolveDirectory
        },
        test_file_extension_regexp() {
            return /.*\.(js|ts|es|es6|jsx|sol)$/;
        },
        example_project_directory: {
            default: () => path.join(configObject.truffle_directory, "example"),
            transform: resolveDirectory
        },
        network_id: {
            get() {
                try {
                    return configObject.network_config.network_id;
                }
                catch (e) {
                    return null;
                }
            },
            set() {
                throw new Error("Do not set config.network_id. Instead, set config.networks and then config.networks[<network name>].network_id");
            }
        },
        network_config: {
            get() {
                const network = configObject.network;
                if (network === null || network === undefined) {
                    throw new Error("Network not set. Cannot determine network to use.");
                }
                let config = configObject.networks[network];
                if (config === null || config === undefined) {
                    config = {};
                }
                config = lodash_assignin_1.default({}, defaultTXValues, config);
                return config;
            },
            set() {
                throw new Error("Don't set config.network_config. Instead, set config.networks with the desired values.");
            }
        },
        from: {
            get() {
                try {
                    return configObject.network_config.from;
                }
                catch (e) {
                    return defaultTXValues.from;
                }
            },
            set() {
                throw new Error("Don't set config.from directly. Instead, set config.networks and then config.networks[<network name>].from");
            }
        },
        gas: {
            get() {
                try {
                    return configObject.network_config.gas;
                }
                catch (e) {
                    return defaultTXValues.gas;
                }
            },
            set() {
                throw new Error("Don't set config.gas directly. Instead, set config.networks and then config.networks[<network name>].gas");
            }
        },
        gasPrice: {
            get() {
                try {
                    return configObject.network_config.gasPrice;
                }
                catch (e) {
                    return null;
                }
            },
            set() {
                throw new Error("Don't set config.gasPrice directly. Instead, set config.networks and then config.networks[<network name>].gasPrice");
            }
        },
        provider: {
            get() {
                if (!configObject.network) {
                    return null;
                }
                const options = configObject.network_config;
                options.verboseRpc = configObject.verboseRpc;
                return provider_1.default.create(options);
            },
            set() {
                throw new Error("Don't set config.provider directly. Instead, set config.networks and then set config.networks[<network name>].provider");
            }
        },
        confirmations: {
            get() {
                try {
                    return configObject.network_config.confirmations;
                }
                catch (e) {
                    return 0;
                }
            },
            set() {
                throw new Error("Don't set config.confirmations directly. Instead, set config.networks and then config.networks[<network name>].confirmations");
            }
        },
        production: {
            get() {
                try {
                    return configObject.network_config.production;
                }
                catch (e) {
                    return false;
                }
            },
            set() {
                throw new Error("Don't set config.production directly. Instead, set config.networks and then config.networks[<network name>].production");
            }
        },
        timeoutBlocks: {
            get() {
                try {
                    return configObject.network_config.timeoutBlocks;
                }
                catch (e) {
                    return 0;
                }
            },
            set() {
                throw new Error("Don't set config.timeoutBlocks directly. Instead, set config.networks and then config.networks[<network name>].timeoutBlocks");
            }
        }
    };
};
exports.configProps = configProps;
//# sourceMappingURL=configDefaults.js.map

/***/ }),

/***/ 120553:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/* module decorator */ module = __webpack_require__.nmd(module);

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const path_1 = __importDefault(__webpack_require__(385622));
const lodash_assignin_1 = __importDefault(__webpack_require__(205089));
const lodash_merge_1 = __importDefault(__webpack_require__(672378));
const module_1 = __importDefault(__webpack_require__(132282));
const find_up_1 = __importDefault(__webpack_require__(316948));
const configstore_1 = __importDefault(__webpack_require__(70214));
const error_1 = __importDefault(__webpack_require__(673321));
const original_require_1 = __importDefault(__webpack_require__(588277));
const configDefaults_1 = __webpack_require__(969203);
const events_1 = __webpack_require__(938279);
const DEFAULT_CONFIG_FILENAME = "truffle-config.js";
const BACKUP_CONFIG_FILENAME = "truffle.js"; // old config filename
class TruffleConfig {
    constructor(truffleDirectory, workingDirectory, network) {
        this._deepCopy = ["compilers", "mocha"];
        this._values = configDefaults_1.getInitialConfig({
            truffleDirectory,
            workingDirectory,
            network
        });
        const eventsOptions = this.eventManagerOptions(this);
        this.events = new events_1.EventManager(eventsOptions);
        const props = configDefaults_1.configProps({ configObject: this });
        Object.entries(props).forEach(([propName, descriptor]) => this.addProp(propName, descriptor));
    }
    eventManagerOptions(config) {
        let muteLogging;
        const { quiet, logger, subscribers } = config;
        return { logger, quiet, subscribers };
    }
    addProp(propertyName, descriptor) {
        // possible property descriptors
        //
        // supports `default` and `transform` in addition to `get` and `set`
        //
        // default: specify function to retrieve default value (used by get)
        // transform: specify function to transform value when (used by set)
        const self = this;
        Object.defineProperty(this, propertyName, {
            get: descriptor.get ||
                function () {
                    // value is specified
                    if (propertyName in self._values) {
                        return self._values[propertyName];
                    }
                    // default getter is specified
                    if (descriptor.default) {
                        return descriptor.default();
                    }
                    // descriptor is a function
                    return descriptor();
                },
            set: descriptor.set ||
                function (value) {
                    self._values[propertyName] = descriptor.transform
                        ? descriptor.transform(value)
                        : value;
                },
            configurable: true,
            enumerable: true
        });
    }
    normalize(obj) {
        const clone = {};
        Object.keys(obj).forEach(key => {
            try {
                clone[key] = obj[key];
            }
            catch (e) {
                // Do nothing with values that throw.
            }
        });
        return clone;
    }
    with(obj) {
        const current = this.normalize(this);
        const normalized = this.normalize(obj);
        let eventsOptions = this.eventManagerOptions(this);
        this.events.updateSubscriberOptions(eventsOptions);
        return lodash_assignin_1.default(Object.create(TruffleConfig.prototype), current, normalized);
    }
    merge(obj) {
        const clone = this.normalize(obj);
        // Only set keys for values that don't throw.
        const propertyNames = Object.keys(obj);
        propertyNames.forEach(key => {
            try {
                if (typeof clone[key] === "object" && this._deepCopy.includes(key)) {
                    this[key] = lodash_merge_1.default(this[key], clone[key]);
                }
                else {
                    this[key] = clone[key];
                }
            }
            catch (e) {
                // ignore
            }
        });
        const eventsOptions = this.eventManagerOptions(this);
        this.events.updateSubscriberOptions(eventsOptions);
        return this;
    }
    static default() {
        return new TruffleConfig();
    }
    static search(options = {}, filename) {
        const searchOptions = {
            cwd: options.working_directory || options.workingDirectory
        };
        if (!filename) {
            const isWin = process.platform === "win32";
            const defaultConfig = find_up_1.default.sync(DEFAULT_CONFIG_FILENAME, searchOptions);
            const backupConfig = find_up_1.default.sync(BACKUP_CONFIG_FILENAME, searchOptions);
            if (defaultConfig && backupConfig) {
                console.warn(`Warning: Both ${DEFAULT_CONFIG_FILENAME} and ${BACKUP_CONFIG_FILENAME} were found. Using ${DEFAULT_CONFIG_FILENAME}.`);
                return defaultConfig;
            }
            else if (backupConfig && !defaultConfig) {
                if (isWin)
                    console.warn(`Warning: Please rename ${BACKUP_CONFIG_FILENAME} to ${DEFAULT_CONFIG_FILENAME} to ensure Windows compatibility.`);
                return backupConfig;
            }
            else {
                return defaultConfig;
            }
        }
        return find_up_1.default.sync(filename, searchOptions);
    }
    static detect(options = {}, filename) {
        let configFile;
        const configPath = options.config;
        if (configPath) {
            configFile = path_1.default.isAbsolute(configPath)
                ? configPath
                : path_1.default.resolve(configPath);
        }
        else {
            configFile = TruffleConfig.search(options, filename);
        }
        if (!configFile) {
            throw new error_1.default("Could not find suitable configuration file.");
        }
        return TruffleConfig.load(configFile, options);
    }
    static load(file, options = {}) {
        const workingDirectory = options.config
            ? process.cwd()
            : path_1.default.dirname(path_1.default.resolve(file));
        const config = new TruffleConfig(undefined, workingDirectory, undefined);
        // The require-nocache module used to do this for us, but
        // it doesn't bundle very well. So we've pulled it out ourselves.
        // @ts-ignore
        delete __webpack_require__.c[module_1.default._resolveFilename(file, module)];
        const staticConfig = original_require_1.default(file);
        config.merge(staticConfig);
        config.merge(options);
        // When loading a user's config, ensure their subscribers are initialized
        const eventsOptions = config.eventManagerOptions(config);
        config.events.updateSubscriberOptions(eventsOptions);
        config.events.initializeUserSubscribers(eventsOptions);
        return config;
    }
    static getUserConfig() {
        return new configstore_1.default("truffle", {}, { globalConfigPath: true });
    }
    static getTruffleDataDirectory() {
        const configStore = TruffleConfig.getUserConfig();
        return path_1.default.dirname(configStore.path);
    }
}
module.exports = TruffleConfig;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 123542:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const debug = __webpack_require__(352178)("contract-sources");
const path = __webpack_require__(385622);
const glob = __webpack_require__(312884);
const { promisify } = __webpack_require__(431669);

const DEFAULT_PATTERN = "**/*.{sol,vy,v.py,vyper.py,json,yul}";

module.exports = (pattern, callback) => {
  const callbackPassed = typeof callback === "function";
  // pattern is either a directory (contracts directory), or an absolute path
  // with a glob expression
  if (!glob.hasMagic(pattern)) {
    pattern = path.join(pattern, DEFAULT_PATTERN);
  }

  const globOptions = {
    follow: true, // follow symlinks
    dot: true //check hidden files and directories
  };

  return promisify(glob)(pattern, globOptions)
    .then(files => {
      if (callbackPassed) {
        callback(null, files);
      } else {
        return files;
      }
    })
    .catch(error => {
      if (callbackPassed) {
        callback(error);
      } else {
        throw error;
      }
    });
};


/***/ }),

/***/ 512322:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse("{\"name\":\"@truffle/core\",\"description\":\"Core code for Truffle command line tool\",\"author\":\"consensys.net\",\"homepage\":\"https://github.com/trufflesuite/truffle#readme\",\"repository\":{\"type\":\"git\",\"url\":\"https://github.com/trufflesuite/truffle.git\",\"directory\":\"packages/core\"},\"bugs\":{\"url\":\"https://github.com/trufflesuite/truffle/issues\"},\"version\":\"5.4.2\",\"bin\":{\"truffle\":\"./cli.js\",\"truffle-exec\":\"./exec.js\"},\"scripts\":{\"prepare\":\"exit 0\",\"test\":\"mocha ./test/** ./test/**/*\"},\"dependencies\":{\"@truffle/artifactor\":\"^4.0.114\",\"@truffle/box\":\"^2.1.21\",\"@truffle/codec\":\"^0.11.6\",\"@truffle/compile-solidity\":\"^5.3.13\",\"@truffle/config\":\"^1.3.1\",\"@truffle/contract\":\"^4.3.26\",\"@truffle/debug-utils\":\"^5.1.6\",\"@truffle/debugger\":\"^9.1.7\",\"@truffle/decoder\":\"^4.6.7\",\"@truffle/deployer\":\"^3.2.35\",\"@truffle/environment\":\"^0.2.63\",\"@truffle/error\":\"^0.0.14\",\"@truffle/expect\":\"^0.0.17\",\"@truffle/interface-adapter\":\"^0.5.2\",\"@truffle/migrate\":\"^3.2.35\",\"@truffle/plugins\":\"^0.2.3\",\"@truffle/preserve\":\"^0.2.4\",\"@truffle/preserve-fs\":\"^0.2.4\",\"@truffle/preserve-to-buckets\":\"^0.2.4\",\"@truffle/preserve-to-filecoin\":\"^0.2.4\",\"@truffle/preserve-to-ipfs\":\"^0.2.4\",\"@truffle/provider\":\"^0.2.34\",\"@truffle/provisioner\":\"^0.2.24\",\"@truffle/require\":\"^2.0.69\",\"@truffle/resolver\":\"^7.0.20\",\"@truffle/source-fetcher\":\"^0.5.3\",\"@truffle/workflow-compile\":\"^3.2.21\",\"chai\":\"^4.2.0\",\"colors\":\"^1.4.0\",\"command-exists\":\"^1.2.8\",\"configstore\":\"^4.0.0\",\"cpr\":\"^3.0.1\",\"debug\":\"^4.3.1\",\"del\":\"^2.2.0\",\"ethereum-cryptography\":\"^0.1.3\",\"ethereumjs-wallet\":\"^1.0.1\",\"ethpm\":\"0.0.19\",\"ethpm-registry\":\"0.1.0-next.3\",\"fs-extra\":\"^9.1.0\",\"ganache-core\":\"2.13.0\",\"get-port\":\"^5.1.1\",\"get-random-values\":\"^1.2.2\",\"glob\":\"^7.1.6\",\"hdkey\":\"^1.1.0\",\"js-interpreter\":\"2.2.0\",\"mocha\":\"8.1.2\",\"node-emoji\":\"^1.8.1\",\"ora\":\"^3.4.0\",\"original-require\":\"^1.0.1\",\"sane\":\"^4.0.2\",\"semver\":\"^7.3.4\",\"source-map-support\":\"^0.5.19\",\"spawn-args\":\"^0.1.0\",\"tmp\":\"^0.2.1\",\"universal-analytics\":\"^0.4.17\",\"web3\":\"1.4.0\",\"web3-utils\":\"1.4.0\",\"xregexp\":\"^4.2.4\",\"yargs\":\"^8.0.2\"},\"devDependencies\":{\"@truffle/blockchain-utils\":\"^0.0.31\",\"app-module-path\":\"^2.2.0\",\"chai-as-promised\":\"^7.1.1\",\"memorystream\":\"^0.3.1\",\"sinon\":\"^9.0.2\"},\"publishConfig\":{\"access\":\"public\"},\"authors\":[{\"name\":\"Tim Coulter\",\"email\":\"tim@trufflesuite.com\",\"url\":\"https://github.com/tcoulter\"}],\"namespace\":\"consensys\",\"gitHead\":\"4a67c2bac87e6401e18a20041e6947e1fcabb3d1\"}");

/***/ }),

/***/ 673321:
/***/ ((module) => {

"use strict";

//Note: This class only exists for compatibility with some old Javascript
//stuff that avoided using Error directly for whatever reason.  Eventually
//it should be eliminated.
class ExtendableError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}
module.exports = ExtendableError;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 623518:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const SubscriberAggregator = __webpack_require__(42626);
const Emittery = __webpack_require__(148);
const defaultSubscribers = __webpack_require__(625829);

class EventManager {
  constructor(eventManagerOptions) {
    let { logger, quiet, subscribers } = eventManagerOptions;
    this.emitter = new Emittery();
    this.subscriberAggregators = [];

    this.initializationOptions = {
      emitter: this.emitter,
      logger,
      quiet,
      subscribers
    };
    this.initializeDefaultSubscribers(this.initializationOptions);
  }

  emit(event, data) {
    return this.emitter.emit(event, data);
  }

  initializeDefaultSubscribers(initializationOptions) {
    const aggregatorOptions = Object.assign({}, initializationOptions, {
      subscribers: defaultSubscribers
    });
    this.subscriberAggregators.push(
      new SubscriberAggregator(aggregatorOptions)
    );
  }

  initializeUserSubscribers(initializationOptions) {
    const { subscribers } = initializationOptions;
    if (subscribers && Object.keys(subscribers).length > 0) {
      const aggregatorOptions = Object.assign({}, initializationOptions, {
        emitter: this.emitter
      });
      this.subscriberAggregators.push(
        new SubscriberAggregator(aggregatorOptions)
      );
    }
  }

  updateSubscriberOptions(newOptions) {
    this.subscriberAggregators.forEach(aggregator => {
      aggregator.updateSubscriberOptions(newOptions);
    });
  }
}

module.exports = EventManager;


/***/ }),

/***/ 750676:
/***/ ((module) => {

const validateOptions = options => {
  const { handlers, initialization } = options;

  if (initialization !== undefined && typeof initialization !== "function") {
    const message =
      `The initialization property specified in your ` +
      `reporter config must be a function. The current value is ` +
      `${initialization}.`;
    throw new Error(message);
  }

  if (typeof handlers !== "object" || Object.keys(handlers).length === 0) {
    const message =
      `You must provide a handlers property in your reporter ` +
      `config. Please ensure that the handlers property ` +
      ` exists and is in the following form:\n ` +
      `  handlers: {\n` +
      `    <handlerName1>: [\n` +
      `       handler1,\n` +
      `       handler2,\n` +
      `       ...\n` +
      `     ],\n` +
      `     <handlerName2>: [\n` +
      `       ...\n` +
      `Currently the handlers property is ${handlers}.`;
    throw new Error(message);
  }
};

// match single or double `*` as long as it isn't preceded by an odd number of
// backslashes. Note: this doesn't handle cases like `***`, as the first two
// stars get matched and the third gets escaped.
const globMatchRegEx = /(?:[^\\]|[^\\](?:\\\\)+)(\*\*|\*)/g;
// list of all characters that should be escaped for use in a regular
// expression
const reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
const convertHandlerNameToRegex = name => {
  let match;
  let start = 0;
  let str = "";
  // making a regular expression match the cases where there is a backlash at
  // the start of the string makes it much harder to read, instead, just pad
  // the start:
  name = " " + name;
  // build our final string one match at a time
  while ((match = globMatchRegEx.exec(name)) !== null) {
    const star = match[1];
    const starRegex = star === "*" ? "[^:]+" : "(?:[^:]+(?::[^:]+)*)?";
    const matchLength = match[0].length;
    const end = match.index + matchLength - star.length;
    const unmatched = name.substring(start, end);
    // escape unsafe characters
    const cleanString = unmatched.replace(reRegExpChar, "\\$&");
    start += match.index + matchLength;
    str += cleanString + starRegex;
  }
  str += name.substr(start).replace(reRegExpChar, "\\$&");
  return new RegExp(`^${str.substr(1)}$`, "i");
};

const createLookupTable = handlerNames => {
  return handlerNames.reduce((lookupTable, handlerName) => {
    const regex = convertHandlerNameToRegex(handlerName);
    lookupTable[handlerName] = regex;
    return lookupTable;
  }, {});
};

const sortHandlers = handlers => {
  const globbedHandlers = {};
  const nonGlobbedHandlers = {};
  for (let handlerName in handlers) {
    if (globMatchRegEx.test(handlerName)) {
      globbedHandlers[handlerName] = handlers[handlerName];
    } else {
      nonGlobbedHandlers[handlerName] = handlers[handlerName];
    }
  }
  return { nonGlobbedHandlers, globbedHandlers };
};

module.exports = {
  createLookupTable,
  sortHandlers,
  validateOptions
};


/***/ }),

/***/ 513764:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const helpers = __webpack_require__(750676);
const { createLookupTable, sortHandlers, validateOptions } = helpers;

class Subscriber {
  constructor({ emitter, options, logger, quiet }) {
    validateOptions(options);
    const { initialization, handlers } = options;

    this.emitter = emitter;
    // Object for storing unsubscribe methods for non-globbed listeners
    this.unsubscribeListeners = {};
    this.quiet = quiet;
    if (logger) this.logger = logger;
    if (initialization) initialization.bind(this)();

    const { globbedHandlers, nonGlobbedHandlers } = sortHandlers(handlers);

    if (nonGlobbedHandlers) this.setUpListeners(nonGlobbedHandlers);

    if (globbedHandlers) {
      this.globbedHandlers = globbedHandlers;
      this.setUpGlobbedListeners(globbedHandlers);
    }
  }

  handleEvent(eventName, data) {
    let promises = [];
    for (let handlerName in this.globbedHandlerLookupTable) {
      if (this.globbedHandlerLookupTable[handlerName].test(eventName)) {
        this.globbedHandlers[handlerName].forEach(handler => {
          promises.push(handler.bind(this)(data, eventName));
        });
      }
    }
    return Promise.all(promises);
  }

  removeListener(name) {
    if (this.unsubscribeListeners.hasOwnProperty(name)) {
      this.unsubscribeListeners[name]();
    }
    if (this.globbedHandlerLookupTable[name]) {
      delete this.globbedHandlerLookupTable[name];
    }
  }

  setUpGlobbedListeners(handlers) {
    const handlerNames = Object.keys(handlers);
    this.globbedHandlerLookupTable = createLookupTable(handlerNames);
    this.emitter.onAny(this.handleEvent.bind(this));
  }

  setUpListeners(handlers) {
    for (let handlerName in handlers) {
      handlers[handlerName].forEach(handler => {
        this.unsubscribeListeners[handlerName] = this.emitter.on(
          handlerName,
          handler.bind(this)
        );
      });
    }
  }

  updateOptions(newOptions) {
    const { logger, quiet } = newOptions;
    if (quiet) this.quiet = true;
    if (logger) this.logger = logger;
  }
}

module.exports = Subscriber;


/***/ }),

/***/ 42626:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Subscriber = __webpack_require__(513764);

class SubscriberAggregator {
  constructor(initializationOptions) {
    this.subscribers = [];
    this.initializeSubscribers(initializationOptions);
  }

  initializeSubscribers(initializationOptions) {
    let { emitter, logger, quiet, subscribers } = initializationOptions;
    for (let name in subscribers) {
      this.subscribers.push(
        new Subscriber({
          options: subscribers[name],
          emitter,
          logger,
          quiet
        })
      );
    }
  }

  updateSubscriberOptions(newOptions) {
    let { logger, quiet } = newOptions;
    this.subscribers.forEach(subscriber => {
      subscriber.updateOptions({
        logger,
        quiet
      });
    });
  }
}

module.exports = SubscriberAggregator;


/***/ }),

/***/ 879373:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const OS = __webpack_require__(712087);

module.exports = {
  initialization: function () {
    this.logger = console;
  },
  handlers: {
    "compile:start": [
      function () {
        if (this.quiet) return;
        this.logger.log(OS.EOL + `Compiling your contracts...`);
        this.logger.log(`===========================`);
      }
    ],
    "compile:succeed": [
      function ({ contractsBuildDirectory, compilers }) {
        if (this.quiet) return;
        if (compilers.length > 0) {
          this.logger.log(`> Artifacts written to ${contractsBuildDirectory}`);
          this.logger.log(`> Compiled successfully using:`);

          const versionReports = new Set();

          const maxLength = compilers
            .map(({ name }) => name.length)
            .reduce((max, length) => (length > max ? length : max), 0);

          for (const compiler of compilers) {
            const padding = " ".repeat(maxLength - compiler.name.length);
            const versionReport =
              `   - ${compiler.name}:${padding} ${compiler.version}`;

            if (!versionReports.has(versionReport)) {
              this.logger.log(versionReport);
              versionReports.add(versionReport);
            }
          }
        }
        this.logger.log();
      }
    ],
    "compile:sourcesToCompile": [
      function ({ sourceFileNames }) {
        if (this.quiet) return;
        if (!sourceFileNames) return;
        sourceFileNames.forEach(sourceFileName =>
          this.logger.log("> Compiling " + sourceFileName)
        );
      }
    ],
    "compile:warnings": [
      function ({ warnings }) {
        if (this.quiet) return;
        this.logger.log("> Compilation warnings encountered:");
        this.logger.log(`${OS.EOL}    ${warnings.join()}`);
      }
    ],
    "compile:nothingToCompile": [
      function () {
        if (this.quiet) return;
        this.logger.log(
          `> Everything is up to date, there is nothing to compile.`
        );
      }
    ]
  }
};


/***/ }),

/***/ 625829:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = {
  compile: __webpack_require__(879373),
  init: __webpack_require__(650525),
  obtain: __webpack_require__(913843),
  unbox: __webpack_require__(882084),
};


/***/ }),

/***/ 650525:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const OS = __webpack_require__(712087);

module.exports = {
  initialization: function () {
    this.logger = console;
  },
  handlers: {
    "init:start": [
      function () {
        this.logger.log(`${OS.EOL}Starting init...`);
        this.logger.log(`================`);
      }
    ],
    "init:copyingProjectFiles": [
      function ({ destinationPath }) {
        this.logger.log(
          `${OS.EOL}> Copying project files to ${destinationPath}`
        );
      }
    ],
    "init:succeed": [
      function () {
        this.logger.log(`${OS.EOL}Init successful, sweet!${OS.EOL}`);
        this.logger.log(`Try our scaffold commands to get started:`);
        this.logger.log(
          "  $ truffle create contract YourContractName # scaffold a contract"
        );
        this.logger.log(
          "  $ truffle create test YourTestName         # scaffold a test"
        );
        this.logger.log(`${OS.EOL}http://trufflesuite.com/docs${OS.EOL}`);
      }
    ],
    "init:fail": [
      function ({ error }) {
        this.logger.log(`${OS.EOL}Something went wrong while copying files!`);
        this.logger.log(`${error}${OS.EOL}`);
      }
    ]
  }
};


/***/ }),

/***/ 913843:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const ora = __webpack_require__(963395);
const OS = __webpack_require__(712087);

module.exports = {
  initialization: function() {
    this.logger = console;
    this.ora = ora;
  },
  handlers: {
    "obtain:start": [
      function() {
        this.logger.log(`${OS.EOL}Starting obtain...`);
        this.logger.log(`==================${OS.EOL}`);
      }
    ],
    "obtain:succeed": [
      function({ compiler }) {
        const { name, version } = compiler;
        this.logger.log(
          `    > successfully downloaded and cached version ${version} ` +
            `of the ${name} compiler.${OS.EOL}`
        );
      }
    ],
    "obtain:fail": [
      function() {
        if (this.spinner.isSpinning) this.spinner.fail();
        this.logger.log("Unbox failed!");
      }
    ],

    "downloadCompiler:start": [
      function({ attemptNumber }) {
        this.spinner = this.ora({
          text: `Downloading compiler. Attempt #${attemptNumber}.`,
          color: "red"
        });
      }
    ],
    "downloadCompiler:succeed": [
      function() {
        this.spinner.succeed();
      }
    ],

    "fetchSolcList:start": [
      function({ attemptNumber }) {
        this.spinner = this.ora({
          text: `Fetching solc version list from solc-bin. Attempt #${attemptNumber}`,
          color: "yellow"
        }).start();
      }
    ],
    "fetchSolcList:succeed": [
      function() {
        if (this.spinner.isSpinning) this.spinner.succeed();
      }
    ],
    "fetchSolcList:fail": [
      function() {
        if (this.spinner.isSpinning) this.spinner.fail();
      }
    ]
  }
};


/***/ }),

/***/ 882084:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const ora = __webpack_require__(963395);
const OS = __webpack_require__(712087);

const formatCommands = (commands) => {
  const names = Object.keys(commands);
  const maxLength = Math.max.apply(
    null,
    names.map((name) => name.length)
  );

  return names.map((name) => {
    const spacing = Array(maxLength - name.length + 1).join(" ");
    return `  ${name}: ${spacing}${commands[name]}`;
  });
};

module.exports = {
  initialization: function () {
    this.logger = console;
    this.ora = ora;
  },
  handlers: {
    "unbox:start": [
      function () {
        if (this.quiet) return;
        this.logger.log(`${OS.EOL}Starting unbox...`);
        this.logger.log(`=================${OS.EOL}`);
      },
    ],
    "unbox:preparingToDownload:start": [
      function () {
        if (this.quiet) return;
        this.spinner = this.ora("Preparing to download box").start();
      },
    ],
    "unbox:preparingToDownload:succeed": [
      function () {
        if (this.quiet) return;
        this.spinner.succeed();
      },
    ],
    "unbox:downloadingBox:start": [
      function () {
        if (this.quiet) return;
        this.spinner = this.ora("Downloading").start();
      },
    ],
    "unbox:downloadingBox:succeed": [
      function () {
        if (this.quiet) return;
        this.spinner.succeed();
      },
    ],
    "unbox:cleaningTempFiles:start": [
      function () {
        if (this.quiet) return;
        this.spinner = this.ora("Cleaning up temporary files").start();
      },
    ],
    "unbox:cleaningTempFiles:succeed": [
      function () {
        if (this.quiet) return;
        this.spinner.succeed();
      },
    ],
    "unbox:settingUpBox:start": [
      function () {
        if (this.quiet) return;
        this.spinner = this.ora("Setting up box").start();
      },
    ],
    "unbox:settingUpBox:succeed": [
      function () {
        if (this.quiet) return;
        this.spinner.succeed();
      },
    ],
    "unbox:succeed": [
      function ({ boxConfig }) {
        if (this.quiet) return;
        this.logger.log(`${OS.EOL}Unbox successful, sweet!${OS.EOL}`);

        const commandMessages = formatCommands(boxConfig.commands);
        if (commandMessages.length > 0) this.logger.log("Commands:" + OS.EOL);

        commandMessages.forEach((message) => this.logger.log(message));
        this.logger.log("");

        if (boxConfig.epilogue) {
          this.logger.log(boxConfig.epilogue.replace("\n", OS.EOL));
        }
      },
    ],
    "unbox:fail": [
      function () {
        if (this.quiet) return;
        if (this.spinner) this.spinner.fail();
        this.logger.log("Unbox failed!");
      },
    ],
  },
};


/***/ }),

/***/ 938279:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = {
  Subscriber: __webpack_require__(513764),
  EventManager: __webpack_require__(623518),
  SubscriberAggregator: __webpack_require__(42626)
};


/***/ }),

/***/ 414096:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.one = exports.options = exports.has = void 0;
/**
 * Asserts at runtime that `options` contains `key`
 */
function has(options, key) {
    // @ts-ignore to get around the fact that we know nothing about O
    if (options[key] == null) {
        throw new Error(`Expected parameter '${key}' not passed to function.`);
    }
}
exports.has = has;
/**
 * Asserts at runtime that `options` contains all `expectedKeys`
 */
function options(options, expectedKeys) {
    for (const key of expectedKeys) {
        has(options, key);
    }
}
exports.options = options;
/**
 * Asserts at runtime that `options` contains at least one of `expectedKeys`
 *
 * Post-condition: this narrows type of `options` to include _exactly one_ of
 * `expectedKeys`, even though at runtime this accepts more than one key.
 */
function one(options, expectedKeys) {
    const found = expectedKeys.some(key => {
        try {
            has(options, key);
            return true;
        }
        catch (error) {
            if (!error.message.includes(`Expected parameter '${key}' not passed to function.`)) {
                throw error;
            }
            return false;
        }
    });
    // If this doesn't work in all cases, perhaps we should
    // create an expect.onlyOne() function.
    if (!found) {
        throw new Error(`Expected one of the following parameters, but found none: ${expectedKeys.join(", ")}`);
    }
}
exports.one = one;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 550159:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createInterfaceAdapter = void 0;
const web3_1 = __webpack_require__(65714);
const getNetworkTypeClass = (networkType = "ethereum") => {
    const supportedEvmNetworks = ["ethereum", "fabric-evm", "quorum"];
    if (supportedEvmNetworks.includes(networkType))
        return "evm-like";
    return networkType;
};
const createInterfaceAdapter = (options) => {
    const { networkType } = options;
    switch (getNetworkTypeClass(networkType)) {
        case "evm-like": {
            const { provider } = options;
            return new web3_1.Web3InterfaceAdapter({
                networkType: networkType,
                provider: provider
            });
        }
        default:
            throw Error(`Sorry, "${networkType}" is not supported at this time.`);
    }
};
exports.createInterfaceAdapter = createInterfaceAdapter;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 65714:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Web3InterfaceAdapter = void 0;
const bn_js_1 = __importDefault(__webpack_require__(213550));
const shim_1 = __webpack_require__(369554);
class Web3InterfaceAdapter {
    constructor({ provider, networkType } = {}) {
        this.web3 = new shim_1.Web3Shim({ provider, networkType });
    }
    getNetworkId() {
        return this.web3.eth.net.getId();
    }
    getBlock(block) {
        return this.web3.eth.getBlock(block);
    }
    getTransaction(tx) {
        return this.web3.eth.getTransaction(tx);
    }
    getTransactionReceipt(tx) {
        return this.web3.eth.getTransactionReceipt(tx);
    }
    getBalance(address) {
        return this.web3.eth.getBalance(address);
    }
    getCode(address) {
        return this.web3.eth.getCode(address);
    }
    getAccounts() {
        return this.web3.eth.getAccounts();
    }
    estimateGas(transactionConfig) {
        return this.web3.eth.estimateGas(transactionConfig);
    }
    getBlockNumber() {
        return this.web3.eth.getBlockNumber();
    }
    getTransactionCostReport(receipt) {
        return __awaiter(this, void 0, void 0, function* () {
            const tx = yield this.getTransaction(receipt.transactionHash);
            const block = yield this.getBlock(receipt.blockNumber);
            if (!block)
                return null;
            const balance = yield this.getBalance(tx.from);
            const gasPrice = new bn_js_1.default(tx.gasPrice);
            const gas = new bn_js_1.default(receipt.gasUsed);
            const value = new bn_js_1.default(tx.value);
            const cost = gasPrice.mul(gas).add(value);
            return {
                timestamp: block.timestamp,
                from: tx.from,
                balance: shim_1.Web3Shim.utils.fromWei(balance, "ether"),
                gasUnit: "gwei",
                gasPrice: shim_1.Web3Shim.utils.fromWei(gasPrice, "gwei"),
                gas,
                valueUnit: "ETH",
                value: shim_1.Web3Shim.utils.fromWei(value, "ether"),
                cost
            };
        });
    }
    displayCost(value) {
        return shim_1.Web3Shim.utils.fromWei(value, "ether");
    }
}
exports.Web3InterfaceAdapter = Web3InterfaceAdapter;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 936339:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createInterfaceAdapter = exports.Web3Shim = void 0;
var shim_1 = __webpack_require__(369554);
Object.defineProperty(exports, "Web3Shim", ({ enumerable: true, get: function () { return shim_1.Web3Shim; } }));
var adapter_1 = __webpack_require__(550159);
Object.defineProperty(exports, "createInterfaceAdapter", ({ enumerable: true, get: function () { return adapter_1.createInterfaceAdapter; } }));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 369554:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Web3Shim = void 0;
const web3_1 = __importDefault(__webpack_require__(503283));
const ethereum_1 = __webpack_require__(573183);
const quorum_1 = __webpack_require__(52763);
const fabric_evm_1 = __webpack_require__(444043);
const web3js_1 = __webpack_require__(947241);
const initInterface = (web3Shim) => __awaiter(void 0, void 0, void 0, function* () {
    const networkTypes = new Map(Object.entries({
        web3js: web3js_1.Web3JsDefinition,
        ethereum: ethereum_1.EthereumDefinition,
        quorum: quorum_1.QuorumDefinition,
        "fabric-evm": fabric_evm_1.FabricEvmDefinition
    }));
    networkTypes.get(web3Shim.networkType).initNetworkType(web3Shim);
});
// March 14, 2019 - Mike Seese:
// This shim was intended to be temporary (see the above comment)
// with the idea of a more robust implementation. That implementation
// would essentially take this shim and include it under the
// ethereum/apis/web3 (or something like that) structure.
// I chose to extend/inherit web3 here to keep scope minimal for
// getting web3 to behave with Quorum and AxCore (future/concurrent PR).
// I wanted to do as little changing to the original Truffle codebase, and
// for it to still expect a web3 instance. Otherwise, the scope of these
// quick support work would be high. The "Web3Shim" is a shim for only
// web3.js, and it was not intended to serve as the general purpose
// truffle <=> all DLTs adapter. We have other commitments currently that
// should drive the development of the correct architecture of
// `@truffle/interface-adapter`that should use this work in a more
// sane and organized manner.
class Web3Shim extends web3_1.default {
    constructor(options) {
        super();
        if (options) {
            this.networkType = options.networkType || "ethereum";
            if (options.provider) {
                this.setProvider(options.provider);
            }
        }
        else {
            this.networkType = "ethereum";
        }
        initInterface(this);
    }
    setNetworkType(networkType) {
        this.networkType = networkType;
        initInterface(this);
    }
}
exports.Web3Shim = Web3Shim;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 573183:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EthereumDefinition = void 0;
const bn_js_1 = __importDefault(__webpack_require__(213550));
exports.EthereumDefinition = {
    initNetworkType(web3) {
        return __awaiter(this, void 0, void 0, function* () {
            // truffle has started expecting gas used/limit to be
            // hex strings to support bignumbers for other ledgers
            overrides.getBlock(web3);
            overrides.getTransaction(web3);
            overrides.getTransactionReceipt(web3);
        });
    }
};
const overrides = {
    // The ts-ignores are ignoring the checks that are
    // saying that web3.eth.getBlock is a function and doesn't
    // have a `method` property, which it does
    getBlock: (web3) => {
        // @ts-ignore
        const _oldFormatter = web3.eth.getBlock.method.outputFormatter;
        // @ts-ignore
        web3.eth.getBlock.method.outputFormatter = (block) => {
            // @ts-ignore
            let result = _oldFormatter.call(web3.eth.getBlock.method, block);
            // Perhaps there is a better method of doing this,
            // but the raw hexstrings work for the time being
            result.gasLimit = "0x" + new bn_js_1.default(result.gasLimit).toString(16);
            result.gasUsed = "0x" + new bn_js_1.default(result.gasUsed).toString(16);
            return result;
        };
    },
    getTransaction: (web3) => {
        const _oldTransactionFormatter = 
        // @ts-ignore
        web3.eth.getTransaction.method.outputFormatter;
        // @ts-ignore
        web3.eth.getTransaction.method.outputFormatter = (tx) => {
            let result = _oldTransactionFormatter.call(
            // @ts-ignore
            web3.eth.getTransaction.method, tx);
            // Perhaps there is a better method of doing this,
            // but the raw hexstrings work for the time being
            result.gas = "0x" + new bn_js_1.default(result.gas).toString(16);
            return result;
        };
    },
    getTransactionReceipt: (web3) => {
        const _oldTransactionReceiptFormatter = 
        // @ts-ignore
        web3.eth.getTransactionReceipt.method.outputFormatter;
        // @ts-ignore
        web3.eth.getTransactionReceipt.method.outputFormatter = (receipt) => {
            let result = _oldTransactionReceiptFormatter.call(
            // @ts-ignore
            web3.eth.getTransactionReceipt.method, receipt);
            // Perhaps there is a better method of doing this,
            // but the raw hexstrings work for the time being
            result.gasUsed = "0x" + new bn_js_1.default(result.gasUsed).toString(16);
            return result;
        };
    }
};
//# sourceMappingURL=ethereum.js.map

/***/ }),

/***/ 444043:
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FabricEvmDefinition = void 0;
exports.FabricEvmDefinition = {
    initNetworkType(web3) {
        return __awaiter(this, void 0, void 0, function* () {
            // web3 expects getId to return a hexString convertible to a number
            // for fabric-evm we ignore the hexToNumber output formatter
            overrides.getId(web3);
        });
    }
};
const overrides = {
    // The ts-ignores are ignoring the checks that are
    // saying that web3.eth.net.getId is a function and doesn't
    // have a `method` property, which it does
    getId: (web3) => {
        // @ts-ignore
        const _oldGetIdFormatter = web3.eth.net.getId.method.outputFormatter;
        // @ts-ignore
        web3.eth.net.getId.method.outputFormatter = (networkId) => {
            // chaincode-fabric-evm currently returns a "fabric-evm" string
            // instead of a hex networkID. Instead of trying to decode the hexToNumber,
            // let's just accept `fabric-evm` as a valid networkID for now.
            return networkId;
        };
    }
};
//# sourceMappingURL=fabric-evm.js.map

/***/ }),

/***/ 52763:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QuorumDefinition = void 0;
const bn_js_1 = __importDefault(__webpack_require__(213550));
const abi_coder_1 = __webpack_require__(193959);
exports.QuorumDefinition = {
    initNetworkType(web3) {
        return __awaiter(this, void 0, void 0, function* () {
            // duck punch some of web3's output formatters
            overrides.getBlock(web3);
            overrides.getTransaction(web3);
            overrides.getTransactionReceipt(web3);
            overrides.decodeParameters(web3);
        });
    }
};
const overrides = {
    // The ts-ignores are ignoring the checks that are
    // saying that web3.eth.getBlock is a function and doesn't
    // have a `method` property, which it does
    getBlock: (web3) => {
        // @ts-ignore
        const _oldBlockFormatter = web3.eth.getBlock.method.outputFormatter;
        // @ts-ignore
        web3.eth.getBlock.method.outputFormatter = (block) => {
            const _oldTimestamp = block.timestamp;
            const _oldGasLimit = block.gasLimit;
            const _oldGasUsed = block.gasUsed;
            // Quorum uses nanoseconds instead of seconds in timestamp
            let timestamp = new bn_js_1.default(block.timestamp.slice(2), 16);
            timestamp = timestamp.div(new bn_js_1.default(10).pow(new bn_js_1.default(9)));
            block.timestamp = "0x" + timestamp.toString(16);
            // Since we're overwriting the gasLimit/Used later,
            // it doesn't matter what it is before the call
            // The same applies to the timestamp, but I reduced
            // the precision since there was an accurate representation
            // We do this because Quorum can have large block/transaction
            // gas limits
            block.gasLimit = "0x0";
            block.gasUsed = "0x0";
            // @ts-ignore
            let result = _oldBlockFormatter.call(web3.eth.getBlock.method, block);
            // Perhaps there is a better method of doing this,
            // but the raw hexstrings work for the time being
            result.timestamp = _oldTimestamp;
            result.gasLimit = _oldGasLimit;
            result.gasUsed = _oldGasUsed;
            return result;
        };
    },
    getTransaction: (web3) => {
        const _oldTransactionFormatter = 
        // @ts-ignore
        web3.eth.getTransaction.method.outputFormatter;
        // @ts-ignore
        web3.eth.getTransaction.method.outputFormatter = (tx) => {
            const _oldGas = tx.gas;
            tx.gas = "0x0";
            let result = _oldTransactionFormatter.call(
            // @ts-ignore
            web3.eth.getTransaction.method, tx);
            // Perhaps there is a better method of doing this,
            // but the raw hexstrings work for the time being
            result.gas = _oldGas;
            return result;
        };
    },
    getTransactionReceipt: (web3) => {
        const _oldTransactionReceiptFormatter = 
        // @ts-ignore
        web3.eth.getTransactionReceipt.method.outputFormatter;
        // @ts-ignore
        web3.eth.getTransactionReceipt.method.outputFormatter = (receipt) => {
            const _oldGasUsed = receipt.gasUsed;
            receipt.gasUsed = "0x0";
            let result = _oldTransactionReceiptFormatter.call(
            // @ts-ignore
            web3.eth.getTransactionReceipt.method, receipt);
            // Perhaps there is a better method of doing this,
            // but the raw hexstrings work for the time being
            result.gasUsed = _oldGasUsed;
            return result;
        };
    },
    // The primary difference between this decodeParameters function and web3's
    // is that the 'Out of Gas?' zero/null bytes guard has been removed and any
    // falsy bytes are interpreted as a zero value.
    decodeParameters: (web3) => {
        const _oldDecodeParameters = web3.eth.abi.decodeParameters;
        const ethersAbiCoder = new abi_coder_1.AbiCoder((type, value) => {
            if (type.match(/^u?int/) &&
                !Array.isArray(value) &&
                (typeof value !== "object" || value.constructor.name !== "BN")) {
                return value.toString();
            }
            return value;
        });
        // result method
        function Result() { }
        web3.eth.abi.decodeParameters = (outputs, bytes) => {
            // if bytes is falsy, we'll pass 64 '0' bits to the ethers.js decoder.
            // the decoder will decode the 64 '0' bits as a 0 value.
            if (!bytes)
                bytes = "0".repeat(64);
            const res = ethersAbiCoder.decode(
            //@ts-ignore 'mapTypes' not existing on type 'ABI'
            web3.eth.abi.mapTypes(outputs), `0x${bytes.replace(/0x/i, "")}`);
            //@ts-ignore complaint regarding Result method
            const returnValue = new Result();
            returnValue.__length__ = 0;
            outputs.forEach((output, i) => {
                let decodedValue = res[returnValue.__length__];
                decodedValue = decodedValue === "0x" ? null : decodedValue;
                returnValue[i] = decodedValue;
                // @ts-ignore object not having name key
                if (typeof output === "object" && output.name) {
                    // @ts-ignore object not having name key
                    returnValue[output.name] = decodedValue;
                }
                returnValue.__length__++;
            });
            return returnValue;
        };
    }
};
//# sourceMappingURL=quorum.js.map

/***/ }),

/***/ 947241:
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Web3JsDefinition = void 0;
// We simply return plain ol' Web3.js
exports.Web3JsDefinition = {
    initNetworkType(web3) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
};
//# sourceMappingURL=web3js.js.map

/***/ }),

/***/ 564723:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const TruffleError = __webpack_require__(673321);

// HACK: string comparison seems to be only way to identify being unable to
// connect to RPC node.
const NOT_CONNECTED_MESSAGE = 'Invalid JSON RPC response: ""';

class ProviderError extends TruffleError {
  constructor(message, options) {
    if (message === NOT_CONNECTED_MESSAGE) {
      message = buildMessage(options);
    }
    super(message);
  }
}

const buildMessage = options => {
  const { host, port, network_id } = options;
  let message;
  if (host) {
    message =
      "\nCould not connect to your Ethereum client with the following parameters:\n" +
      `    - host       > ${host}\n` +
      `    - port       > ${port}\n` +
      `    - network_id > ${network_id}\n`;
  } else {
    message = "\nCould not connect to your Ethereum client.\n";
  }

  message +=
    "Please check that your Ethereum client:\n" +
    "    - is running\n" +
    '    - is accepting RPC connections (i.e., "--rpc" option is used in geth)\n' +
    "    - is accessible over the network\n" +
    "    - is properly configured in your Truffle configuration file (truffle-config.js)\n";
  return message;
};

module.exports = ProviderError;


/***/ }),

/***/ 200509:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const debug = __webpack_require__(615158)("provider");
const Web3 = __webpack_require__(503283);
const { createInterfaceAdapter } = __webpack_require__(936339);
const wrapper = __webpack_require__(302623);
const DEFAULT_NETWORK_CHECK_TIMEOUT = 5000;

module.exports = {
  wrap: function (provider, options) {
    return wrapper.wrap(provider, options);
  },

  create: function (options) {
    const provider = this.getProvider(options);
    return this.wrap(provider, options);
  },

  getProvider: function (options) {
    let provider;
    if (options.provider && typeof options.provider === "function") {
      provider = options.provider();
    } else if (options.provider) {
      provider = options.provider;
    } else if (options.websockets || /^wss?:\/\//.test(options.url)) {
      provider = new Web3.providers.WebsocketProvider(
        options.url || "ws://" + options.host + ":" + options.port
      );
    } else {
      provider = new Web3.providers.HttpProvider(
        options.url || `http://${options.host}:${options.port}`,
        { keepAlive: false }
      );
    }
    return provider;
  },

  testConnection: function (options) {
    let networkCheckTimeout, networkType;
    const { networks, network } = options;
    if (networks && networks[network]) {
      networkCheckTimeout =
        networks[network].networkCheckTimeout || DEFAULT_NETWORK_CHECK_TIMEOUT;
      networkType = networks[network].type;
    } else {
      networkCheckTimeout = DEFAULT_NETWORK_CHECK_TIMEOUT;
    }
    const provider = this.getProvider(options);
    const interfaceAdapter = createInterfaceAdapter({ provider, networkType });
    return new Promise((resolve, reject) => {
      const noResponseFromNetworkCall = setTimeout(() => {
        const errorMessage =
          "There was a timeout while attempting to connect to the network." +
          "\n       Check to see that your provider is valid.\n       If you " +
          "have a slow internet connection, try configuring a longer " +
          "timeout in your Truffle config. Use the " +
          "networks[networkName].networkCheckTimeout property to do this.";
        throw new Error(errorMessage);
      }, networkCheckTimeout);

      let networkCheckDelay = 1;
      (function networkCheck() {
        setTimeout(async () => {
          try {
            await interfaceAdapter.getBlockNumber();
            clearTimeout(noResponseFromNetworkCall);
            clearTimeout(networkCheck);
            return resolve(true);
          } catch (error) {
            console.log(
              "> Something went wrong while attempting to connect " +
                "to the network. Check your network configuration."
            );
            clearTimeout(noResponseFromNetworkCall);
            clearTimeout(networkCheck);
            return reject(error);
          }
          networkCheckDelay *= 2;
          networkCheck();
        }, networkCheckDelay);
      })();
    });
  },
};


/***/ }),

/***/ 302623:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var debug = __webpack_require__(615158)("provider:wrapper"); // eslint-disable-line no-unused-vars
var ProviderError = __webpack_require__(564723);

module.exports = {
  /*
   * Web3.js Transport Wrapper
   *
   * Wraps an underlying web3 provider's RPC transport methods (send/sendAsync)
   * for Truffle-specific purposes, mainly for logging / request verbosity.
   */
  wrap: function (provider, options) {
    /* wrapping should be idempotent */
    if (provider._alreadyWrapped) return provider;

    /* setup options defaults */
    options = options || {};
    // custom logger
    options.logger = options.logger || console;
    // to see what web3 is sending and receiving.
    options.verbose = options.verbose || options.verboseRpc || false;

    /* create wrapper functions for before/after send */
    var preHook = this.preHook(options);
    var postHook = this.postHook(options);

    var originalSend = provider.send.bind(provider);

    /* overwrite method */
    provider.send = this.send(originalSend, preHook, postHook);

    /* mark as wrapped */
    provider._alreadyWrapped = true;

    return provider;
  },

  /*
   * Transport Hook Generators
   *
   * Used to wrap underlying web3.js behavior before/after sending request
   * payloads to the RPC.
   *
   * Transport hooks may be used to perform additional operations before/after
   * sending, and/or to modify request/response data.
   *
   * Each generator accepts an `options` argument and uses it to construct
   * and return a function.
   *
   * Returned functions accept relevant arguments and return potentially new
   * versions of those arguments (for payload/result/error overrides)
   */

  // before send/sendAsync
  preHook: function (options) {
    return function (payload) {
      if (options.verbose) {
        // for request payload debugging
        options.logger.log(
          "   > " + JSON.stringify(payload, null, 2).split("\n").join("\n   > ")
        );
      }

      return payload;
    };
  },

  // after send/sendAsync
  postHook: function (options) {
    return function (payload, error, result) {
      // web3 websocket providers return false and web3 http providers
      // return null when no error has occurred...kind of obnoxious
      if (error) {
        error = new ProviderError(error.message, options);
        return [payload, error, result];
      }

      if (options.verbose) {
        options.logger.log(
          " <   " + JSON.stringify(result, null, 2).split("\n").join("\n <   ")
        );
      }

      return [payload, error, result];
    };
  },

  /*
   * Transport Method Generators
   *
   * Generate wrapped versions of `send`/`sendAsync`, given original method and
   * transport hooks.
   *
   * Pre-condition: originals are bound correctly (`send.bind(provider)`)
   *
   * Return the wrapped function matching the original function's signature.
   */
  send: function (originalSend, preHook, postHook) {
    return function (payload, callback) {
      payload = preHook(payload);

      originalSend(payload, function (error, result) {
        var modified = postHook(payload, error, result);
        payload = modified[0];
        error = modified[1];
        result = modified[2];

        callback(error, result);
      });
    };
  }
};


/***/ })

};
;
//# sourceMappingURL=829.bundled.js.map