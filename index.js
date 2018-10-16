import StackTrace from "stacktrace-js/stacktrace.js"

let numberOfFramesToRemove = 0;

/**
 * @param {String?} path Relative path.
 * @param {Number} [depth=0] Depth in the stacktrace.
 * @returns {string} The absolute url of the current running code.
 */
export default function toAbsoluteUrl(path, depth) {
	// default depth
	depth = depth || 0;

	// get stack
	let stack = StackTrace.getSync();

	if (!numberOfFramesToRemove) {
		let found;
		do {
			found = (stack[numberOfFramesToRemove].functionName === currentFunction.name);
			numberOfFramesToRemove++;
		} while (numberOfFramesToRemove < stack.length && !found)
	}

	// remove current function & stacktrace depth
	stack = stack.slice(numberOfFramesToRemove);

	// correct depth
	if (depth < 0)
		depth = 0 ;
	else if (depth > stack.length-1)
		depth = stack.length-1;

	// get caller absolute path
	let absolute = stack[depth].fileName;
	// follow given path from caller absolute path
	if (path)
		absolute = new URL(path, absolute).href;
	// return absolute path
	return absolute;
};

const currentFunction = toAbsoluteUrl;
