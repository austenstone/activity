require('./sourcemap-register.js');/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 407:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.run = void 0;
const core_1 = __nccwpck_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module '@actions/core'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const github_1 = __nccwpck_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module '@actions/github'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const getInputs = () => {
    const result = {};
    result.token = (0, core_1.getInput)("github-token");
    result.organization = (0, core_1.getInput)("organization");
    if (!result.token || result.token === "") {
        throw new Error("github-token is required");
    }
    return result;
};
const run = async () => {
    const input = getInputs();
    const octokit = (0, github_1.getOctokit)(input.token);
    (0, core_1.info)(`Getting members of ${input.organization}`);
    const usersResponse = await octokit.paginate(octokit.rest.orgs.listMembers, {
        org: input.organization,
    });
    const since = new Date();
    since.setDate(since.getDate() - 90);
    const formattedSince = since.toISOString().slice(0, 10);
    const users = usersResponse.reduce((acc, user) => {
        acc[user.login] = {
            _user: user
        };
        return acc;
    }, {});
    for (const [login, activity] of Object.entries(users)) {
        const commits = await octokit.rest.search.commits({
            q: `author:${login} org:${input.organization} committer-date:<${formattedSince}`,
        });
        activity.commits = commits;
        await octokit.rest.search.issuesAndPullRequests({
            q: `author:${login} org:${input.organization} created:<${formattedSince}`,
        });
        await octokit.rest;
    }
    console.log(users);
};
exports.run = run;
(0, exports.run)();


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/asset-relocator-loader */
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __nccwpck_require__(407);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map