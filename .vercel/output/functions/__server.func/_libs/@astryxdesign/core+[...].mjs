import { o as __toESM, r as __exportAll, t as __commonJSMin } from "../../_runtime.mjs";
//#region node_modules/react/cjs/react.production.js
/**
* @license React
* react.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element");
	var REACT_PORTAL_TYPE = Symbol.for("react.portal");
	var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
	var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
	var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
	var REACT_CONSUMER_TYPE = Symbol.for("react.consumer");
	var REACT_CONTEXT_TYPE = Symbol.for("react.context");
	var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
	var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
	var REACT_MEMO_TYPE = Symbol.for("react.memo");
	var REACT_LAZY_TYPE = Symbol.for("react.lazy");
	var REACT_ACTIVITY_TYPE = Symbol.for("react.activity");
	var REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition");
	var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
	function getIteratorFn(maybeIterable) {
		if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
		maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
		return "function" === typeof maybeIterable ? maybeIterable : null;
	}
	var ReactNoopUpdateQueue = {
		isMounted: function() {
			return !1;
		},
		enqueueForceUpdate: function() {},
		enqueueReplaceState: function() {},
		enqueueSetState: function() {}
	};
	var assign = Object.assign;
	var emptyObject = {};
	function Component(props, context, updater) {
		this.props = props;
		this.context = context;
		this.refs = emptyObject;
		this.updater = updater || ReactNoopUpdateQueue;
	}
	Component.prototype.isReactComponent = {};
	Component.prototype.setState = function(partialState, callback) {
		if ("object" !== typeof partialState && "function" !== typeof partialState && null != partialState) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
		this.updater.enqueueSetState(this, partialState, callback, "setState");
	};
	Component.prototype.forceUpdate = function(callback) {
		this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
	};
	function ComponentDummy() {}
	ComponentDummy.prototype = Component.prototype;
	function PureComponent(props, context, updater) {
		this.props = props;
		this.context = context;
		this.refs = emptyObject;
		this.updater = updater || ReactNoopUpdateQueue;
	}
	var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
	pureComponentPrototype.constructor = PureComponent;
	assign(pureComponentPrototype, Component.prototype);
	pureComponentPrototype.isPureReactComponent = !0;
	var isArrayImpl = Array.isArray;
	function noop() {}
	var ReactSharedInternals = {
		H: null,
		A: null,
		T: null,
		S: null
	};
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	function ReactElement(type, key, props) {
		var refProp = props.ref;
		return {
			$$typeof: REACT_ELEMENT_TYPE,
			type,
			key,
			ref: void 0 !== refProp ? refProp : null,
			props
		};
	}
	function cloneAndReplaceKey(oldElement, newKey) {
		return ReactElement(oldElement.type, newKey, oldElement.props);
	}
	function isValidElement(object) {
		return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
	}
	function escape(key) {
		var escaperLookup = {
			"=": "=0",
			":": "=2"
		};
		return "$" + key.replace(/[=:]/g, function(match) {
			return escaperLookup[match];
		});
	}
	var userProvidedKeyEscapeRegex = /\/+/g;
	function getElementKey(element, index) {
		return "object" === typeof element && null !== element && null != element.key ? escape("" + element.key) : index.toString(36);
	}
	function resolveThenable(thenable) {
		switch (thenable.status) {
			case "fulfilled": return thenable.value;
			case "rejected": throw thenable.reason;
			default: switch ("string" === typeof thenable.status ? thenable.then(noop, noop) : (thenable.status = "pending", thenable.then(function(fulfilledValue) {
				"pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
			}, function(error) {
				"pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
			})), thenable.status) {
				case "fulfilled": return thenable.value;
				case "rejected": throw thenable.reason;
			}
		}
		throw thenable;
	}
	function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
		var type = typeof children;
		if ("undefined" === type || "boolean" === type) children = null;
		var invokeCallback = !1;
		if (null === children) invokeCallback = !0;
		else switch (type) {
			case "bigint":
			case "string":
			case "number":
				invokeCallback = !0;
				break;
			case "object": switch (children.$$typeof) {
				case REACT_ELEMENT_TYPE:
				case REACT_PORTAL_TYPE:
					invokeCallback = !0;
					break;
				case REACT_LAZY_TYPE: return invokeCallback = children._init, mapIntoArray(invokeCallback(children._payload), array, escapedPrefix, nameSoFar, callback);
			}
		}
		if (invokeCallback) return callback = callback(children), invokeCallback = "" === nameSoFar ? "." + getElementKey(children, 0) : nameSoFar, isArrayImpl(callback) ? (escapedPrefix = "", null != invokeCallback && (escapedPrefix = invokeCallback.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c) {
			return c;
		})) : null != callback && (isValidElement(callback) && (callback = cloneAndReplaceKey(callback, escapedPrefix + (null == callback.key || children && children.key === callback.key ? "" : ("" + callback.key).replace(userProvidedKeyEscapeRegex, "$&/") + "/") + invokeCallback)), array.push(callback)), 1;
		invokeCallback = 0;
		var nextNamePrefix = "" === nameSoFar ? "." : nameSoFar + ":";
		if (isArrayImpl(children)) for (var i = 0; i < children.length; i++) nameSoFar = children[i], type = nextNamePrefix + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);
		else if (i = getIteratorFn(children), "function" === typeof i) for (children = i.call(children), i = 0; !(nameSoFar = children.next()).done;) nameSoFar = nameSoFar.value, type = nextNamePrefix + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);
		else if ("object" === type) {
			if ("function" === typeof children.then) return mapIntoArray(resolveThenable(children), array, escapedPrefix, nameSoFar, callback);
			array = String(children);
			throw Error("Objects are not valid as a React child (found: " + ("[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead.");
		}
		return invokeCallback;
	}
	function mapChildren(children, func, context) {
		if (null == children) return children;
		var result = [], count = 0;
		mapIntoArray(children, result, "", "", function(child) {
			return func.call(context, child, count++);
		});
		return result;
	}
	function lazyInitializer(payload) {
		if (-1 === payload._status) {
			var ctor = payload._result, thenable = ctor();
			thenable.then(function(moduleObject) {
				if (0 === payload._status || -1 === payload._status) payload._status = 1, payload._result = moduleObject, void 0 === thenable.status && (thenable.status = "fulfilled", thenable.value = moduleObject);
			}, function(error) {
				if (0 === payload._status || -1 === payload._status) payload._status = 2, payload._result = error, void 0 === thenable.status && (thenable.status = "rejected", thenable.reason = error);
			});
			-1 === payload._status && (payload._status = 0, payload._result = thenable);
		}
		if (1 === payload._status) return payload._result.default;
		throw payload._result;
	}
	var reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
		if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
			var event = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
				error
			});
			if (!window.dispatchEvent(event)) return;
		} else if ("object" === typeof process && "function" === typeof process.emit) {
			process.emit("uncaughtException", error);
			return;
		}
		console.error(error);
	};
	function startTransition(scope) {
		var prevTransition = ReactSharedInternals.T, currentTransition = {};
		currentTransition.types = null !== prevTransition ? prevTransition.types : null;
		ReactSharedInternals.T = currentTransition;
		try {
			var returnValue = scope(), onStartTransitionFinish = ReactSharedInternals.S;
			null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
			"object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && returnValue.then(noop, reportGlobalError);
		} catch (error) {
			reportGlobalError(error);
		} finally {
			null !== prevTransition && null !== currentTransition.types && (prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
		}
	}
	function addTransitionType(type) {
		var transition = ReactSharedInternals.T;
		if (null !== transition) {
			var transitionTypes = transition.types;
			null === transitionTypes ? transition.types = [type] : -1 === transitionTypes.indexOf(type) && transitionTypes.push(type);
		} else startTransition(addTransitionType.bind(null, type));
	}
	var Children = {
		map: mapChildren,
		forEach: function(children, forEachFunc, forEachContext) {
			mapChildren(children, function() {
				forEachFunc.apply(this, arguments);
			}, forEachContext);
		},
		count: function(children) {
			var n = 0;
			mapChildren(children, function() {
				n++;
			});
			return n;
		},
		toArray: function(children) {
			return mapChildren(children, function(child) {
				return child;
			}) || [];
		},
		only: function(children) {
			if (!isValidElement(children)) throw Error("React.Children.only expected to receive a single React element child.");
			return children;
		}
	};
	exports.Activity = REACT_ACTIVITY_TYPE;
	exports.Children = Children;
	exports.Component = Component;
	exports.Fragment = REACT_FRAGMENT_TYPE;
	exports.Profiler = REACT_PROFILER_TYPE;
	exports.PureComponent = PureComponent;
	exports.StrictMode = REACT_STRICT_MODE_TYPE;
	exports.Suspense = REACT_SUSPENSE_TYPE;
	exports.ViewTransition = REACT_VIEW_TRANSITION_TYPE;
	exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
	exports.__COMPILER_RUNTIME = {
		__proto__: null,
		c: function(size) {
			return ReactSharedInternals.H.useMemoCache(size);
		}
	};
	exports.addTransitionType = addTransitionType;
	exports.cache = function(fn) {
		return function() {
			return fn.apply(null, arguments);
		};
	};
	exports.cacheSignal = function() {
		return null;
	};
	exports.cloneElement = function(element, config, children) {
		if (null === element || void 0 === element) throw Error("The argument must be a React element, but you passed " + element + ".");
		var props = assign({}, element.props), key = element.key;
		if (null != config) for (propName in void 0 !== config.key && (key = "" + config.key), config) !hasOwnProperty.call(config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
		var propName = arguments.length - 2;
		if (1 === propName) props.children = children;
		else if (1 < propName) {
			for (var childArray = Array(propName), i = 0; i < propName; i++) childArray[i] = arguments[i + 2];
			props.children = childArray;
		}
		return ReactElement(element.type, key, props);
	};
	exports.createContext = function(defaultValue) {
		defaultValue = {
			$$typeof: REACT_CONTEXT_TYPE,
			_currentValue: defaultValue,
			_currentValue2: defaultValue,
			_threadCount: 0,
			Provider: null,
			Consumer: null
		};
		defaultValue.Provider = defaultValue;
		defaultValue.Consumer = {
			$$typeof: REACT_CONSUMER_TYPE,
			_context: defaultValue
		};
		return defaultValue;
	};
	exports.createElement = function(type, config, children) {
		var propName, props = {}, key = null;
		if (null != config) for (propName in void 0 !== config.key && (key = "" + config.key), config) hasOwnProperty.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (props[propName] = config[propName]);
		var childrenLength = arguments.length - 2;
		if (1 === childrenLength) props.children = children;
		else if (1 < childrenLength) {
			for (var childArray = Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 2];
			props.children = childArray;
		}
		if (type && type.defaultProps) for (propName in childrenLength = type.defaultProps, childrenLength) void 0 === props[propName] && (props[propName] = childrenLength[propName]);
		return ReactElement(type, key, props);
	};
	exports.createRef = function() {
		return { current: null };
	};
	exports.forwardRef = function(render) {
		return {
			$$typeof: REACT_FORWARD_REF_TYPE,
			render
		};
	};
	exports.isValidElement = isValidElement;
	exports.lazy = function(ctor) {
		return {
			$$typeof: REACT_LAZY_TYPE,
			_payload: {
				_status: -1,
				_result: ctor
			},
			_init: lazyInitializer
		};
	};
	exports.memo = function(type, compare) {
		return {
			$$typeof: REACT_MEMO_TYPE,
			type,
			compare: void 0 === compare ? null : compare
		};
	};
	exports.startTransition = startTransition;
	exports.unstable_useCacheRefresh = function() {
		return ReactSharedInternals.H.useCacheRefresh();
	};
	exports.use = function(usable) {
		return ReactSharedInternals.H.use(usable);
	};
	exports.useActionState = function(action, initialState, permalink) {
		return ReactSharedInternals.H.useActionState(action, initialState, permalink);
	};
	exports.useCallback = function(callback, deps) {
		return ReactSharedInternals.H.useCallback(callback, deps);
	};
	exports.useContext = function(Context) {
		return ReactSharedInternals.H.useContext(Context);
	};
	exports.useDebugValue = function() {};
	exports.useDeferredValue = function(value, initialValue) {
		return ReactSharedInternals.H.useDeferredValue(value, initialValue);
	};
	exports.useEffect = function(create, deps) {
		return ReactSharedInternals.H.useEffect(create, deps);
	};
	exports.useEffectEvent = function(callback) {
		return ReactSharedInternals.H.useEffectEvent(callback);
	};
	exports.useId = function() {
		return ReactSharedInternals.H.useId();
	};
	exports.useImperativeHandle = function(ref, create, deps) {
		return ReactSharedInternals.H.useImperativeHandle(ref, create, deps);
	};
	exports.useInsertionEffect = function(create, deps) {
		return ReactSharedInternals.H.useInsertionEffect(create, deps);
	};
	exports.useLayoutEffect = function(create, deps) {
		return ReactSharedInternals.H.useLayoutEffect(create, deps);
	};
	exports.useMemo = function(create, deps) {
		return ReactSharedInternals.H.useMemo(create, deps);
	};
	exports.useOptimistic = function(passthrough, reducer) {
		return ReactSharedInternals.H.useOptimistic(passthrough, reducer);
	};
	exports.useReducer = function(reducer, initialArg, init) {
		return ReactSharedInternals.H.useReducer(reducer, initialArg, init);
	};
	exports.useRef = function(initialValue) {
		return ReactSharedInternals.H.useRef(initialValue);
	};
	exports.useState = function(initialState) {
		return ReactSharedInternals.H.useState(initialState);
	};
	exports.useSyncExternalStore = function(subscribe, getSnapshot, getServerSnapshot) {
		return ReactSharedInternals.H.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
	};
	exports.useTransition = function() {
		return ReactSharedInternals.H.useTransition();
	};
	exports.version = "19.3.0";
}));
//#endregion
//#region node_modules/react/index.js
var require_react = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_react_production();
}));
//#endregion
//#region node_modules/react/cjs/react-jsx-runtime.production.js
/**
* @license React
* react-jsx-runtime.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_jsx_runtime_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element");
	var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
	function jsxProd(type, config, maybeKey) {
		var key = null;
		void 0 !== maybeKey && (key = "" + maybeKey);
		void 0 !== config.key && (key = "" + config.key);
		if ("key" in config) {
			maybeKey = {};
			for (var propName in config) "key" !== propName && (maybeKey[propName] = config[propName]);
		} else maybeKey = config;
		config = maybeKey.ref;
		return {
			$$typeof: REACT_ELEMENT_TYPE,
			type,
			key,
			ref: void 0 !== config ? config : null,
			props: maybeKey
		};
	}
	exports.Fragment = REACT_FRAGMENT_TYPE;
	exports.jsx = jsxProd;
	exports.jsxs = jsxProd;
}));
//#endregion
//#region node_modules/react/jsx-runtime.js
var require_jsx_runtime = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_react_jsx_runtime_production();
}));
//#endregion
//#region node_modules/react-dom/cjs/react-dom.production.js
/**
* @license React
* react-dom.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_dom_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var React = require_react();
	function formatProdErrorMessage(code) {
		var url = "https://react.dev/errors/" + code;
		if (1 < arguments.length) {
			url += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var i = 2; i < arguments.length; i++) url += "&args[]=" + encodeURIComponent(arguments[i]);
		}
		return "Minified React error #" + code + "; visit " + url + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function noop() {}
	var Internals = {
		d: {
			f: noop,
			r: function() {
				throw Error(formatProdErrorMessage(522));
			},
			D: noop,
			C: noop,
			L: noop,
			m: noop,
			X: noop,
			S: noop,
			M: noop
		},
		p: 0,
		findDOMNode: null
	};
	var REACT_PORTAL_TYPE = Symbol.for("react.portal");
	var REACT_RECOVERABLE_TYPE = Symbol.for("react.recoverable");
	var REACT_OPTIMISTIC_KEY = Symbol.for("react.optimistic_key");
	function createPortal$1(children, containerInfo, implementation) {
		var key = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
		return {
			$$typeof: REACT_PORTAL_TYPE,
			key: null == key ? null : key === REACT_OPTIMISTIC_KEY ? REACT_OPTIMISTIC_KEY : "" + key,
			children,
			containerInfo,
			implementation
		};
	}
	var ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
	function getCrossOriginStringAs(as, input) {
		if ("font" === as) return "";
		if ("string" === typeof input) return "use-credentials" === input ? input : "";
	}
	exports.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Internals;
	exports.browser = function(reason) {
		return {
			$$typeof: REACT_RECOVERABLE_TYPE,
			_reason: reason
		};
	};
	exports.createPortal = function(children, container) {
		var key = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
		if (!container || 1 !== container.nodeType && 9 !== container.nodeType && 11 !== container.nodeType) throw Error(formatProdErrorMessage(299));
		return createPortal$1(children, container, null, key);
	};
	exports.flushSync = function(fn) {
		var previousTransition = ReactSharedInternals.T, previousUpdatePriority = Internals.p;
		try {
			if (ReactSharedInternals.T = null, Internals.p = 2, fn) return fn();
		} finally {
			ReactSharedInternals.T = previousTransition, Internals.p = previousUpdatePriority, Internals.d.f();
		}
	};
	exports.preconnect = function(href, options) {
		"string" === typeof href && (options ? (options = options.crossOrigin, options = "string" === typeof options ? "use-credentials" === options ? options : "" : void 0) : options = null, Internals.d.C(href, options));
	};
	exports.prefetchDNS = function(href) {
		"string" === typeof href && Internals.d.D(href);
	};
	exports.preinit = function(href, options) {
		if ("string" === typeof href && options && "string" === typeof options.as) {
			var as = options.as, crossOrigin = getCrossOriginStringAs(as, options.crossOrigin), integrity = "string" === typeof options.integrity ? options.integrity : void 0, fetchPriority = "string" === typeof options.fetchPriority ? options.fetchPriority : void 0;
			"style" === as ? Internals.d.S(href, "string" === typeof options.precedence ? options.precedence : void 0, {
				crossOrigin,
				integrity,
				fetchPriority
			}) : "script" === as && Internals.d.X(href, {
				crossOrigin,
				integrity,
				fetchPriority,
				nonce: "string" === typeof options.nonce ? options.nonce : void 0
			});
		}
	};
	exports.preinitModule = function(href, options) {
		if ("string" === typeof href) if ("object" === typeof options && null !== options) {
			if (null == options.as || "script" === options.as) {
				var crossOrigin = getCrossOriginStringAs(options.as, options.crossOrigin);
				Internals.d.M(href, {
					crossOrigin,
					integrity: "string" === typeof options.integrity ? options.integrity : void 0,
					nonce: "string" === typeof options.nonce ? options.nonce : void 0,
					fetchPriority: "string" === typeof options.fetchPriority ? options.fetchPriority : void 0
				});
			}
		} else options ?? Internals.d.M(href);
	};
	exports.preload = function(href, options) {
		if ("string" === typeof href && "object" === typeof options && null !== options && "string" === typeof options.as) {
			var as = options.as, crossOrigin = getCrossOriginStringAs(as, options.crossOrigin);
			Internals.d.L(href, as, {
				crossOrigin,
				integrity: "string" === typeof options.integrity ? options.integrity : void 0,
				nonce: "string" === typeof options.nonce ? options.nonce : void 0,
				type: "string" === typeof options.type ? options.type : void 0,
				fetchPriority: "string" === typeof options.fetchPriority ? options.fetchPriority : void 0,
				referrerPolicy: "string" === typeof options.referrerPolicy ? options.referrerPolicy : void 0,
				imageSrcSet: "string" === typeof options.imageSrcSet ? options.imageSrcSet : void 0,
				imageSizes: "string" === typeof options.imageSizes ? options.imageSizes : void 0,
				media: "string" === typeof options.media ? options.media : void 0
			});
		}
	};
	exports.preloadModule = function(href, options) {
		if ("string" === typeof href) if (options) {
			var crossOrigin = getCrossOriginStringAs(options.as, options.crossOrigin);
			Internals.d.m(href, {
				as: "string" === typeof options.as && "script" !== options.as ? options.as : void 0,
				crossOrigin,
				integrity: "string" === typeof options.integrity ? options.integrity : void 0,
				nonce: "string" === typeof options.nonce ? options.nonce : void 0,
				fetchPriority: "string" === typeof options.fetchPriority ? options.fetchPriority : void 0
			});
		} else Internals.d.m(href);
	};
	exports.requestFormReset = function(form) {
		Internals.d.r(form);
	};
	exports.unstable_batchedUpdates = function(fn, a) {
		return fn(a);
	};
	exports.useFormState = function(action, initialState, permalink) {
		return ReactSharedInternals.H.useFormState(action, initialState, permalink);
	};
	exports.useFormStatus = function() {
		return ReactSharedInternals.H.useHostTransitionStatus();
	};
	exports.version = "19.3.0";
}));
//#endregion
//#region node_modules/react-dom/index.js
var require_react_dom = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function checkDCE() {
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") return;
		try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
		} catch (err) {
			console.error(err);
		}
	}
	checkDCE();
	module.exports = require_react_dom_production();
}));
//#endregion
//#region node_modules/@astryxdesign/core/dist/hooks/useIsomorphicLayoutEffect.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var useIsomorphicLayoutEffect = typeof window !== "undefined" ? import_react.useLayoutEffect : import_react.useEffect;
//#endregion
//#region node_modules/@stylexjs/stylex/lib/es/stylex.mjs
var styleq = {};
var hasRequiredStyleq;
function requireStyleq() {
	if (hasRequiredStyleq) return styleq;
	hasRequiredStyleq = 1;
	Object.defineProperty(styleq, "__esModule", { value: true });
	styleq.styleq = void 0;
	var cache = /* @__PURE__ */ new WeakMap();
	var compiledKey = "$$css";
	function createStyleq(options) {
		var disableCache;
		var disableMix;
		var transform;
		if (options != null) {
			disableCache = options.disableCache === true;
			disableMix = options.disableMix === true;
			transform = options.transform;
		}
		return function styleq() {
			var definedProperties = [];
			var className = "";
			var inlineStyle = null;
			var debugString = "";
			var nextCache = disableCache ? null : cache;
			var styles = new Array(arguments.length);
			for (var i = 0; i < arguments.length; i++) styles[i] = arguments[i];
			while (styles.length > 0) {
				var possibleStyle = styles.pop();
				if (possibleStyle == null || possibleStyle === false) continue;
				if (Array.isArray(possibleStyle)) {
					for (var _i = 0; _i < possibleStyle.length; _i++) styles.push(possibleStyle[_i]);
					continue;
				}
				var style = transform != null ? transform(possibleStyle) : possibleStyle;
				if (style.$$css != null) {
					var classNameChunk = "";
					if (nextCache != null && nextCache.has(style)) {
						var cacheEntry = nextCache.get(style);
						if (cacheEntry != null) {
							classNameChunk = cacheEntry[0];
							debugString = cacheEntry[2];
							definedProperties.push.apply(definedProperties, cacheEntry[1]);
							nextCache = cacheEntry[3];
						}
					} else {
						var definedPropertiesChunk = [];
						for (var prop in style) {
							var value = style[prop];
							if (prop === compiledKey) {
								var compiledKeyValue = style[prop];
								if (compiledKeyValue !== true) debugString = debugString ? compiledKeyValue + "; " + debugString : compiledKeyValue;
								continue;
							}
							if (typeof value === "string" || value === null) {
								if (!definedProperties.includes(prop)) {
									definedProperties.push(prop);
									if (nextCache != null) definedPropertiesChunk.push(prop);
									if (typeof value === "string") classNameChunk += classNameChunk ? " " + value : value;
								}
							} else console.error("styleq: ".concat(prop, " typeof ").concat(String(value), " is not \"string\" or \"null\"."));
						}
						if (nextCache != null) {
							var weakMap = /* @__PURE__ */ new WeakMap();
							nextCache.set(style, [
								classNameChunk,
								definedPropertiesChunk,
								debugString,
								weakMap
							]);
							nextCache = weakMap;
						}
					}
					if (classNameChunk) className = className ? classNameChunk + " " + className : classNameChunk;
				} else if (disableMix) {
					if (inlineStyle == null) inlineStyle = {};
					inlineStyle = Object.assign({}, style, inlineStyle);
				} else {
					var subStyle = null;
					for (var _prop in style) {
						var _value = style[_prop];
						if (_value !== void 0) {
							if (!definedProperties.includes(_prop)) {
								if (_value != null) {
									if (inlineStyle == null) inlineStyle = {};
									if (subStyle == null) subStyle = {};
									subStyle[_prop] = _value;
								}
								definedProperties.push(_prop);
								nextCache = null;
							}
						}
					}
					if (subStyle != null) inlineStyle = Object.assign(subStyle, inlineStyle);
				}
			}
			return [
				className,
				inlineStyle,
				debugString
			];
		};
	}
	var styleq$1 = styleq.styleq = createStyleq();
	styleq$1.factory = createStyleq;
	return styleq;
}
var styleqExports = /*@__PURE__*/ requireStyleq();
function props(...styles) {
	const [className, style, dataStyleSrc] = styleqExports.styleq(styles);
	const result = {};
	if (className != null && className !== "") result.className = className;
	if (style != null && Object.keys(style).length > 0) result.style = style;
	if (dataStyleSrc != null && dataStyleSrc !== "") result["data-style-src"] = dataStyleSrc;
	return result;
}
Object.freeze({});
//#endregion
//#region node_modules/@astryxdesign/core/dist/theme/tokens.stylex.js
var colorVars = {
	"--color-accent": "var(--color-accent)",
	"--color-accent-muted": "var(--color-accent-muted)",
	"--color-on-accent": "var(--color-on-accent)",
	"--color-neutral": "var(--color-neutral)",
	"--color-background-surface": "var(--color-background-surface)",
	"--color-background-body": "var(--color-background-body)",
	"--color-overlay": "var(--color-overlay)",
	"--color-overlay-hover": "var(--color-overlay-hover)",
	"--color-overlay-pressed": "var(--color-overlay-pressed)",
	"--color-background-muted": "var(--color-background-muted)",
	"--color-text-primary": "var(--color-text-primary)",
	"--color-text-secondary": "var(--color-text-secondary)",
	"--color-text-disabled": "var(--color-text-disabled)",
	"--color-text-accent": "var(--color-text-accent)",
	"--color-on-dark": "var(--color-on-dark)",
	"--color-on-light": "var(--color-on-light)",
	"--color-icon-accent": "var(--color-icon-accent)",
	"--color-icon-primary": "var(--color-icon-primary)",
	"--color-icon-secondary": "var(--color-icon-secondary)",
	"--color-icon-disabled": "var(--color-icon-disabled)",
	"--color-background-card": "var(--color-background-card)",
	"--color-background-popover": "var(--color-background-popover)",
	"--color-background-inverted": "var(--color-background-inverted)",
	"--color-background-error-inverted": "var(--color-background-error-inverted)",
	"--color-success": "var(--color-success)",
	"--color-success-muted": "var(--color-success-muted)",
	"--color-on-success": "var(--color-on-success)",
	"--color-error": "var(--color-error)",
	"--color-error-muted": "var(--color-error-muted)",
	"--color-on-error": "var(--color-on-error)",
	"--color-warning": "var(--color-warning)",
	"--color-warning-muted": "var(--color-warning-muted)",
	"--color-on-warning": "var(--color-on-warning)",
	"--color-border": "var(--color-border)",
	"--color-border-emphasized": "var(--color-border-emphasized)",
	"--color-skeleton": "var(--color-skeleton)",
	"--color-track": "var(--color-track)",
	"--color-shadow": "var(--color-shadow)",
	"--color-tint-hover": "var(--color-tint-hover)",
	"--color-background-blue": "var(--color-background-blue)",
	"--color-border-blue": "var(--color-border-blue)",
	"--color-icon-blue": "var(--color-icon-blue)",
	"--color-text-blue": "var(--color-text-blue)",
	"--color-background-cyan": "var(--color-background-cyan)",
	"--color-border-cyan": "var(--color-border-cyan)",
	"--color-icon-cyan": "var(--color-icon-cyan)",
	"--color-text-cyan": "var(--color-text-cyan)",
	"--color-background-gray": "var(--color-background-gray)",
	"--color-border-gray": "var(--color-border-gray)",
	"--color-icon-gray": "var(--color-icon-gray)",
	"--color-text-gray": "var(--color-text-gray)",
	"--color-background-green": "var(--color-background-green)",
	"--color-border-green": "var(--color-border-green)",
	"--color-icon-green": "var(--color-icon-green)",
	"--color-text-green": "var(--color-text-green)",
	"--color-background-orange": "var(--color-background-orange)",
	"--color-border-orange": "var(--color-border-orange)",
	"--color-icon-orange": "var(--color-icon-orange)",
	"--color-text-orange": "var(--color-text-orange)",
	"--color-background-pink": "var(--color-background-pink)",
	"--color-border-pink": "var(--color-border-pink)",
	"--color-icon-pink": "var(--color-icon-pink)",
	"--color-text-pink": "var(--color-text-pink)",
	"--color-background-purple": "var(--color-background-purple)",
	"--color-border-purple": "var(--color-border-purple)",
	"--color-icon-purple": "var(--color-icon-purple)",
	"--color-text-purple": "var(--color-text-purple)",
	"--color-background-red": "var(--color-background-red)",
	"--color-border-red": "var(--color-border-red)",
	"--color-icon-red": "var(--color-icon-red)",
	"--color-text-red": "var(--color-text-red)",
	"--color-background-teal": "var(--color-background-teal)",
	"--color-border-teal": "var(--color-border-teal)",
	"--color-icon-teal": "var(--color-icon-teal)",
	"--color-text-teal": "var(--color-text-teal)",
	"--color-background-yellow": "var(--color-background-yellow)",
	"--color-border-yellow": "var(--color-border-yellow)",
	"--color-icon-yellow": "var(--color-icon-yellow)",
	"--color-text-yellow": "var(--color-text-yellow)",
	__varGroupHash__: "xj0fimd"
};
var spacingVars = {
	"--spacing-0": "var(--spacing-0)",
	"--spacing-0-5": "var(--spacing-0-5)",
	"--spacing-1": "var(--spacing-1)",
	"--spacing-1-5": "var(--spacing-1-5)",
	"--spacing-2": "var(--spacing-2)",
	"--spacing-3": "var(--spacing-3)",
	"--spacing-4": "var(--spacing-4)",
	"--spacing-5": "var(--spacing-5)",
	"--spacing-6": "var(--spacing-6)",
	"--spacing-7": "var(--spacing-7)",
	"--spacing-8": "var(--spacing-8)",
	"--spacing-9": "var(--spacing-9)",
	"--spacing-10": "var(--spacing-10)",
	"--spacing-11": "var(--spacing-11)",
	"--spacing-12": "var(--spacing-12)",
	__varGroupHash__: "x1kvdh9l"
};
var focusVars = {
	"--focus-outline-width": "var(--focus-outline-width)",
	"--focus-outline-style": "var(--focus-outline-style)",
	"--focus-outline-color": "var(--focus-outline-color)",
	"--focus-outline-offset": "var(--focus-outline-offset)",
	__varGroupHash__: "xzxs3qz"
};
var durationVars = {
	"--duration-fast-min": "var(--duration-fast-min)",
	"--duration-fast": "var(--duration-fast)",
	"--duration-fast-max": "var(--duration-fast-max)",
	"--duration-medium-min": "var(--duration-medium-min)",
	"--duration-medium": "var(--duration-medium)",
	"--duration-medium-max": "var(--duration-medium-max)",
	"--duration-slow-min": "var(--duration-slow-min)",
	"--duration-slow": "var(--duration-slow)",
	"--duration-slow-max": "var(--duration-slow-max)",
	__varGroupHash__: "x14lkjui"
};
var easeVars = {
	"--ease-standard": "var(--ease-standard)",
	__varGroupHash__: "xf09i69"
};
//#endregion
//#region node_modules/@astryxdesign/core/dist/theme/mergeComponents.js
/**
* @file Component style-map merging
*
* One merge rule for component overrides, shared by every layer that composes
* them: `extends` inheritance, generated type-scale rules, and the on-media
* (`onDark`/`onLight`) surfaces. Merging is per style key, so a child that
* restates one property of `button.base` keeps the rest of the base's.
*
* @input two ComponentStyleMaps — the base and the overrides that win
* @output a merged ComponentStyleMap
* @position packages/core/src/theme/mergeComponents.ts
*/
/**
* Deep-merge component style maps: `overrides` wins per style key, and every
* component and key the base declared that the overrides do not mention is
* carried through untouched.
*/
function deepMergeComponents(base, overrides) {
	if (!base && !overrides) return;
	if (!base) return overrides;
	if (!overrides) return base;
	const result = {};
	for (const [component, rules] of Object.entries(base)) result[component] = { ...rules };
	for (const [component, rules] of Object.entries(overrides)) if (!result[component]) result[component] = { ...rules };
	else for (const [key, styles] of Object.entries(rules)) result[component][key] = {
		...result[component][key],
		...styles
	};
	return result;
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/theme/expandTypeScale.js
/**
* @file expandTypeScale.ts
* @input Type scale configuration { base, ratio, weights? }
* @output Token overrides for raw size tokens and semantic typography tokens
* @position Theme utility; consumed by defineTheme.ts
*
* Computes a complete typography token set from a base size and scaling ratio
* using a geometric progression: size = base × ratio^step.
*
* Two-layer architecture:
*   Layer 1: Raw size tokens (--font-size-4xs … --font-size-4xl)
*            Geometric progression in rem.
*   Layer 2: Semantic tokens (--heading-*, --text-*-size/leading/weight)
*            Sizes are var() references to Layer 1.
*            Line heights are hardcoded computed values (4px grid snapped).
*            Weights are var() references to font-weight tokens.
*
* The named leading tokens (--leading-tight … --leading-relaxed) are NOT
* modified by the type scale — they remain as intent-based ratios for
* component use.
*
* Step mapping:
*   step -5 → --font-size-4xs   (sub-scale)
*   step -4 → --font-size-3xs   (sub-scale)
*   step -3 → --font-size-2xs   (sub-scale)
*   step -2 → --font-size-xs   (h6)
*   step -1 → --font-size-sm    (h5, supporting)
*   step  0 → --font-size-base  (h4, body, label, code)
*   step +1 → --font-size-lg    (h3, large)
*   step +2 → --font-size-xl    (h2)
*   step +3 → --font-size-2xl   (h1)
*   step +4 → --font-size-3xl
*   step +5 → --font-size-4xl
*
* Line heights use a tiered target ratio based on font size:
*   < 20px  → 1.5   (body text, small UI)
*   20–31px → 1.4   (medium headings)
*   ≥ 32px  → 1.25  (large display headings)
*
* Then 4px-grid-snapped with Math.round and a minimum of fontSize + 4.
*
* SYNC: When modified, update:
* - /packages/core/src/theme/expandTypeScale.test.ts
* - /packages/core/src/theme/defineTheme.ts
* - /packages/cli/assets/theme.template.ts (the annotated field reference)
*/
/** Font weight value — either a CSS string or a var() reference. */
/**
* Weight overrides for heading levels.
* Keys are heading levels 1–6, values are CSS font-weight values
* (e.g. '600', 'var(--font-weight-bold)').
*/
/**
* Weight overrides for text types.
* Keys are built-in text type names, values are CSS font-weight values.
* Accepts additional string keys for custom theme-defined text types.
*/
/**
* Type scale configuration.
*
* @example
* ```
* // Default Astryx type scale
* { base: 14, ratio: 1.2 }
*
* // With custom weights
* {
*   base: 14,
*   ratio: 1.2,
*   weights: {
*     heading: { 1: 'var(--font-weight-bold)', 3: 'var(--font-weight-bold)' },
*     text: { large: 'var(--font-weight-normal)' },
*   },
* }
*
* // Suggested starting points:
* //   Dense/functional: { base: 12, ratio: 1.125 }
* //   Default:          { base: 14, ratio: 1.2 }
* //   Airy/editorial:   { base: 16, ratio: 1.25 }
* ```
*/
/**
* Generated typography token overrides.
* Keys are CSS custom property names, values are CSS strings.
*/
/**
* Step → raw size token name.
* These tokens form the geometric font size scale.
*
* The full scale spans steps -5 to +5:
*   -5 → --font-size-4xs (sub-scale)
*   -4 → --font-size-3xs (sub-scale)
*   -3 → --font-size-2xs (sub-scale)
*   -2 → --font-size-xs
*   -1 → --font-size-sm
*    0 → --font-size-base (anchor)
*   +1 → --font-size-lg
*   +2 → --font-size-xl
*   +3 → --font-size-2xl
*   +4 → --font-size-3xl
*   +5 → --font-size-4xl
*/
var STEP_TO_SIZE_TOKEN = {
	[-5]: "--font-size-4xs",
	[-4]: "--font-size-3xs",
	[-3]: "--font-size-2xs",
	[-2]: "--font-size-xs",
	[-1]: "--font-size-sm",
	[0]: "--font-size-base",
	[1]: "--font-size-lg",
	[2]: "--font-size-xl",
	[3]: "--font-size-2xl",
	[4]: "--font-size-3xl",
	[5]: "--font-size-4xl",
	[6]: "--font-size-5xl"
};
/**
* Heading level → step offset from base (h4 = 0).
* h1 is 3 steps above base, h6 is 2 steps below.
*/
var HEADING_STEPS = {
	1: 3,
	2: 2,
	3: 1,
	4: 0,
	5: -1,
	6: -2
};
/**
* Text type → step offset from base.
* body/label/code are at base, large is one step up, supporting one step down.
*/
var TEXT_STEPS = {
	body: 0,
	large: 1,
	label: 0,
	code: 0,
	supporting: -1,
	"display-1": 6,
	"display-2": 5,
	"display-3": 4
};
/**
* Default font weights per heading level.
*/
var DEFAULT_HEADING_WEIGHTS = {
	1: "var(--font-weight-semibold)",
	2: "var(--font-weight-semibold)",
	3: "var(--font-weight-semibold)",
	4: "var(--font-weight-semibold)",
	5: "var(--font-weight-semibold)",
	6: "var(--font-weight-semibold)"
};
/**
* Default font weights per text type.
*/
var DEFAULT_TEXT_WEIGHTS = {
	body: "var(--font-weight-normal)",
	large: "var(--font-weight-semibold)",
	label: "var(--font-weight-medium)",
	code: "var(--font-weight-normal)",
	supporting: "var(--font-weight-normal)",
	"display-1": "var(--font-weight-normal)",
	"display-2": "var(--font-weight-normal)",
	"display-3": "var(--font-weight-normal)"
};
/**
* Compute a font size from the geometric progression and round to nearest integer.
*/
function computeSize(base, ratio, step) {
	return Math.round(base * Math.pow(ratio, step));
}
/** Convert px to rem based on the standard 16px root font size. */
function pxToRem(px) {
	return `${Math.round(px / 16 * 1e4) / 1e4}rem`;
}
/**
* Tiered target line-height ratio based on font size.
*
*   < 20px  → 1.5   (body text, small UI elements)
*   20–31px → 1.4   (medium headings, transitional)
*   ≥ 32px  → 1.25  (large display headings)
*/
function targetLeadingRatio(fontSize) {
	return fontSize < 20 ? 1.5 : fontSize < 32 ? 1.4 : 1.25;
}
/**
* Compute a unitless line-height ratio, snapped so the computed px value
* aligns to a 4px grid. Ensures a minimum gap of fontSize + 4px.
*
* Uses a tiered target ratio — see `targetLeadingRatio`.
*/
function computeLeading(fontSize) {
	const rawLh = fontSize * targetLeadingRatio(fontSize);
	const snappedLh = Math.max(Math.round(rawLh / 4) * 4, Math.ceil((fontSize + 4) / 4) * 4);
	return Math.round(snappedLh / fontSize * 1e4) / 1e4;
}
/**
* Expand a type scale configuration into typography token overrides.
*
* Generates two layers of tokens:
*   - Layer 1: 11 raw size tokens (--font-size-4xs … --font-size-4xl) in rem
*   - Layer 2: semantic tokens using var() refs for sizes and
*              hardcoded computed values for line heights
*
* Includes 6 heading levels × 3 + 8 text types × 3 (body, large, label, code, supporting, display-1/2/3).
* Font sizes are emitted as rem values (e.g. '1.5rem') based on 16px root.
* Line heights are emitted as unitless ratios (e.g. '1.3333').
* Font weights are emitted as var() references (e.g. '''var(--font-weight-semibold)'''').
*
* @example
* ```
* const tokens = expandTypeScale({ base: 14, ratio: 1.2 });
* // Layer 1 — raw sizes
* // tokens['--font-size-base'] === '0.875rem'
* // tokens['--font-size-2xl'] === '1.5rem'
* //
* // Layer 2 — semantic
* // tokens['--text-heading-1-size'] === 'var(--font-size-2xl)'
* // tokens['--text-heading-1-leading'] === '1.3333'
* // tokens['--text-body-size'] === 'var(--font-size-base)'
* // tokens['--text-body-leading'] === '1.4286'
* ```
*/
function expandTypeScale(config) {
	const { base, ratio, weights } = config;
	const tokens = {};
	const headingWeights = {
		...DEFAULT_HEADING_WEIGHTS,
		...weights?.heading
	};
	const textWeights = {
		...DEFAULT_TEXT_WEIGHTS,
		...weights?.text
	};
	for (let step = -5; step <= 6; step++) {
		const size = computeSize(base, ratio, step);
		tokens[STEP_TO_SIZE_TOKEN[step]] = pxToRem(size);
	}
	for (const [levelStr, step] of Object.entries(HEADING_STEPS)) {
		const level = Number(levelStr);
		const leading = computeLeading(computeSize(base, ratio, step));
		tokens[`--text-heading-${level}-size`] = `var(${STEP_TO_SIZE_TOKEN[step]})`;
		tokens[`--text-heading-${level}-weight`] = headingWeights[level];
		tokens[`--text-heading-${level}-leading`] = `${leading}`;
	}
	for (const [type, step] of Object.entries(TEXT_STEPS)) {
		const leading = computeLeading(computeSize(base, ratio, step));
		tokens[`--text-${type}-size`] = `var(${STEP_TO_SIZE_TOKEN[step]})`;
		tokens[`--text-${type}-weight`] = textWeights[type];
		tokens[`--text-${type}-leading`] = `${leading}`;
	}
	return tokens;
}
var TEXT_FONT_FAMILIES = {
	body: "var(--font-family-body)",
	large: "var(--font-family-body)",
	label: "var(--font-family-body)",
	code: "var(--font-family-code)",
	supporting: "var(--font-family-body)",
	"display-1": "var(--font-family-heading)",
	"display-2": "var(--font-family-heading)",
	"display-3": "var(--font-family-heading)"
};
/**
* Generate component style overrides for heading and text components.
*/
function generateTypeScaleComponents(_config) {
	const components = {};
	const headingRules = {};
	for (const level of [
		1,
		2,
		3,
		4,
		5,
		6
	]) headingRules[`level:${level}`] = {
		fontFamily: "var(--font-family-heading)",
		fontSize: `var(--text-heading-${level}-size)`,
		fontWeight: `var(--text-heading-${level}-weight)`,
		lineHeight: `var(--text-heading-${level}-leading)`
	};
	for (const type of [
		"display-1",
		"display-2",
		"display-3"
	]) headingRules[`type:${type}`] = {
		fontFamily: "var(--font-family-heading)",
		fontSize: `var(--text-${type}-size)`,
		lineHeight: `var(--text-${type}-leading)`
	};
	components.heading = headingRules;
	const textRules = {};
	for (const type of [
		"body",
		"large",
		"label",
		"code",
		"supporting",
		"display-1",
		"display-2",
		"display-3"
	]) textRules[`type:${type}`] = {
		fontFamily: TEXT_FONT_FAMILIES[type],
		fontSize: `var(--text-${type}-size)`,
		lineHeight: `var(--text-${type}-leading)`
	};
	components.text = textRules;
	return components;
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/theme/expandMotionScale.js
/**
* @file expandMotionScale.ts
* @input Motion scale configuration { fast, medium, ratio, easing? }
* @output Token overrides for duration and easing primitives
* @position Theme utility; consumed by defineTheme.ts
*
* Computes duration min/max variants from base values and a scaling ratio:
*   min = base × ratio
*   max = base / ratio
*
* This gives theme authors a simple 3-value interface (fast, medium, ratio)
* that expands into a coherent 6-token duration scale. A "snappy" theme
* lowers the base; a "cinematic" theme raises it — and the proportional
* relationships between variants are preserved automatically.
*
* SYNC: When modified, update:
* - /packages/core/src/theme/expandMotionScale.test.ts
* - /packages/core/src/theme/defineTheme.ts
* - /packages/cli/assets/theme.template.ts (the annotated field reference)
*/
/**
* Motion scale configuration.
*
* @example
* ```
* // Default Astryx motion scale
* { fast: 175, medium: 410, slow: 975, ratio: 0.75 }
*
* // Snappy theme (reduced motion budget)
* { fast: 100, medium: 250, ratio: 0.75 }
*
* // Cinematic theme (dramatic animations)
* { fast: 200, medium: 500, slow: 1200, ratio: 0.7 }
*
* // With custom easing
* { fast: 175, medium: 410, ratio: 0.75, easing: 'cubic-bezier(0.0, 0.0, 0.2, 1)' }
* ```
*/
/** Token overrides produced by expandMotionScale. */
/**
* Round a duration in ms to the nearest 5ms for clean token values.
*/
function roundMs(ms) {
	return Math.round(ms / 5) * 5;
}
/**
* Expand a motion scale configuration into duration and easing token overrides.
*
* Duration computation:
*   fast-min  = fast × ratio    (smallest micro-interaction)
*   fast      = fast             (standard micro-interaction)
*   fast-max  = fast / ratio    (slightly longer micro-interaction)
*   medium-min = medium × ratio (quick entrance/exit)
*   medium     = medium          (standard entrance/exit)
*   medium-max = medium / ratio (dramatic entrance)
*   slow-min  = slow × ratio    (quick continuous animation) [optional]
*   slow      = slow             (standard continuous animation) [optional]
*   slow-max  = slow / ratio    (relaxed continuous animation) [optional]
*
* @param config — Motion scale configuration
* @returns Token overrides to merge into the theme token map
*/
function expandMotionScale(config) {
	const { fast, medium, slow, ratio, easing } = config;
	const tokens = {
		"--duration-fast-min": `${roundMs(fast * ratio)}ms`,
		"--duration-fast": `${roundMs(fast)}ms`,
		"--duration-fast-max": `${roundMs(fast / ratio)}ms`,
		"--duration-medium-min": `${roundMs(medium * ratio)}ms`,
		"--duration-medium": `${roundMs(medium)}ms`,
		"--duration-medium-max": `${roundMs(medium / ratio)}ms`
	};
	if (slow != null) {
		tokens["--duration-slow-min"] = `${roundMs(slow * ratio)}ms`;
		tokens["--duration-slow"] = `${roundMs(slow)}ms`;
		tokens["--duration-slow-max"] = `${roundMs(slow / ratio)}ms`;
	}
	if (easing) tokens["--ease-standard"] = easing;
	return tokens;
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/theme/expandRadiusScale.js
/**
* @file expandRadiusScale.ts
* @input Radius scale configuration { base, multiplier }
* @output Token overrides for radius tokens
* @position Theme utility; consumed by defineTheme.ts
*
* Computes border-radius values from a base unit and multiplier.
* --radius-none and --radius-full are always fixed (never affected by multiplier).
* --radius-inner through --radius-page = base * step * multiplier.
*
* Semantic scale:
*   --radius-none      → 0px (fixed)
*   --radius-inner     → base × 1 × multiplier (internal corners)
*   --radius-element   → base × 2 × multiplier (buttons, inputs)
*   --radius-container → base × 3 × multiplier (cards, panels)
*   --radius-page      → base × 7 × multiplier (page-level containers)
*   --radius-chat      → base × 7 × multiplier (chat surfaces; tracks page)
*   --radius-full      → 9999px (fixed, pill shapes)
*
* SYNC: When modified, update:
* - /packages/core/src/theme/expandRadiusScale.test.ts
* - /packages/core/src/theme/defineTheme.ts
* - /packages/cli/assets/theme.template.ts (the annotated field reference)
*/
/**
* Radius scale configuration.
*
* @example
* ```
* // Default Astryx radius scale
* { base: 4, multiplier: 1 }
*
* // Sharp/brutalist — all radii become 0
* { base: 4, multiplier: 0 }
*
* // Extra rounded
* { base: 4, multiplier: 1.5 }
* ```
*/
/**
* Generated radius token overrides.
* Keys are CSS custom property names, values are CSS strings.
*/
/**
* Expand a radius scale config into token overrides.
*
* --radius-none and --radius-full are fixed anchors.
* --radius-inner through --radius-page scale with base × step × multiplier.
*
* @example
* ```
* const tokens = expandRadiusScale({ base: 4, multiplier: 1 });
* // tokens['--radius-none'] === '0px'
* // tokens['--radius-inner'] === '4px'       (4 × 1 × 1)
* // tokens['--radius-element'] === '8px'     (4 × 2 × 1)
* // tokens['--radius-container'] === '12px'  (4 × 3 × 1)
* // tokens['--radius-page'] === '28px'       (4 × 7 × 1)
* // tokens['--radius-chat'] === '28px'       (4 × 7 × 1)
* // tokens['--radius-full'] === '9999px'
*
* const sharp = expandRadiusScale({ base: 4, multiplier: 0 });
* // All scalable tokens become '0px', none and full unchanged
* ```
*/
function expandRadiusScale(config) {
	const { base, multiplier } = config;
	return {
		"--radius-none": "0px",
		"--radius-inner": `${Math.round(base * 1 * multiplier)}px`,
		"--radius-element": `${Math.round(base * 2 * multiplier)}px`,
		"--radius-container": `${Math.round(base * 3 * multiplier)}px`,
		"--radius-page": `${Math.round(base * 7 * multiplier)}px`,
		"--radius-chat": `${Math.round(base * 7 * multiplier)}px`,
		"--radius-full": "9999px"
	};
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/utils/color.js
/**
* @file color.ts
* @input CSS color strings (hex, rgb()/rgba(), a small set of named colors)
* @output Shared color parsing/formatting primitives used across the design system
* @position Package utility; backs theme token resolution, HCT color math, and chart/WebGL rendering
*
* A single home for the color parsers that were previously duplicated across
* the theme layer, charts, and lab. Consumers get one well-tested definition of
* "parse this color" rather than several subtly different regexes.
*/
/** A color decomposed into 0-255 RGB channels and a 0-1 alpha. */
/** The named colors the design system relies on in token expressions. */
var NAMED_COLORS = {
	transparent: {
		r: 0,
		g: 0,
		b: 0,
		a: 0
	},
	black: {
		r: 0,
		g: 0,
		b: 0,
		a: 1
	},
	white: {
		r: 255,
		g: 255,
		b: 255,
		a: 1
	}
};
var clamp = (value, min, max) => Math.max(min, Math.min(max, value));
/** Expand a shorthand hex body (`rgb`/`rgba`) to its full form (`rrggbb`/`rrggbbaa`). */
function expandShorthand(body) {
	return body.split("").map((c) => c + c).join("");
}
/**
* Parse a hex color into {@link RGBA}. Accepts `#rgb`, `#rgba`, `#rrggbb`, and
* `#rrggbbaa`, with or without the leading `#`. Returns null for anything else.
*/
function parseHex(hex) {
	if (typeof hex !== "string") return null;
	const body = hex.trim().replace(/^#/, "");
	const normalized = body.length === 3 || body.length === 4 ? expandShorthand(body) : body;
	if (normalized.length !== 6 && normalized.length !== 8 || !/^[0-9a-fA-F]+$/.test(normalized)) return null;
	return {
		r: parseInt(normalized.slice(0, 2), 16),
		g: parseInt(normalized.slice(2, 4), 16),
		b: parseInt(normalized.slice(4, 6), 16),
		a: normalized.length === 8 ? parseInt(normalized.slice(6, 8), 16) / 255 : 1
	};
}
/**
* Parse an `rgb()`/`rgba()` color into {@link RGBA}. Accepts comma- or
* space-separated channels, an optional `/ alpha`, and percentage channels.
*/
function parseRgb(value) {
	const open = value.indexOf("(");
	if (open === -1 || !value.trim().endsWith(")")) return null;
	const parts = value.slice(open + 1, value.lastIndexOf(")")).replace(/\//g, " ").split(/[\s,]+/).map((p) => p.trim()).filter(Boolean);
	if (parts.length < 3) return null;
	const channel = (p) => {
		return clamp(p.endsWith("%") ? parseFloat(p) / 100 * 255 : parseFloat(p), 0, 255);
	};
	const r = channel(parts[0]);
	const g = channel(parts[1]);
	const b = channel(parts[2]);
	if ([
		r,
		g,
		b
	].some(Number.isNaN)) return null;
	let a = 1;
	if (parts.length >= 4) {
		const raw = parts[3];
		a = raw.endsWith("%") ? parseFloat(raw) / 100 : parseFloat(raw);
		if (Number.isNaN(a)) return null;
		a = clamp(a, 0, 1);
	}
	return {
		r,
		g,
		b,
		a
	};
}
/**
* Parse a concrete CSS color string into {@link RGBA}. Supports hex,
* `rgb()`/`rgba()`, and the named colors used in token expressions. Returns
* null for anything it can't evaluate (e.g. `var()`, `oklch()`, unknown names)
* so callers can preserve the original expression rather than guessing.
*/
function parseColor(value) {
	const trimmed = value.trim();
	const named = NAMED_COLORS[trimmed.toLowerCase()];
	if (named) return { ...named };
	if (trimmed.startsWith("#")) return parseHex(trimmed);
	if (/^rgba?\(/i.test(trimmed)) return parseRgb(trimmed);
	return null;
}
/** Format RGB channels (0-255) as an uppercase `#RRGGBB` string. */
function formatHex(r, g, b) {
	const channel = (c) => clamp(Math.round(c), 0, 255).toString(16).padStart(2, "0").toUpperCase();
	return `#${channel(r)}${channel(g)}${channel(b)}`;
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/theme/contrast.js
/**
* @file contrast.ts
* @input CSS color strings (hex, rgb()/rgba()) or parsed RGBA values
* @output WCAG 2.x relative luminance and contrast ratios
* @position Theme utility; consumed by expandColorScale.ts and theme tests
*
* Dependency-free WCAG 2.x contrast math. Backs the contrast guarantees
* for generated color tokens (WCAG 1.4.3 text contrast >= 4.5:1,
* WCAG 1.4.11 non-text contrast >= 3:1).
*
* Semi-transparent foregrounds are composited over their backdrop in
* gamma-encoded sRGB space (matching CSS alpha compositing) before the
* ratio is measured — a translucent token has no contrast of its own,
* only against what it renders on.
*/
/**
* WCAG 2.x relative luminance of an sRGB color (alpha ignored).
* 0 = black, 1 = white.
*
* https://www.w3.org/WAI/WCAG22/Techniques/general/G18
*/
function relativeLuminance(color) {
	const channel = (c) => {
		const s = c / 255;
		return s <= .04045 ? s / 12.92 : Math.pow((s + .055) / 1.055, 2.4);
	};
	return .2126 * channel(color.r) + .7152 * channel(color.g) + .0722 * channel(color.b);
}
/**
* Composite a (possibly translucent) foreground over an opaque backdrop
* using standard source-over alpha blending in gamma-encoded sRGB space,
* matching how CSS paints translucent tokens. Returns an opaque color.
*/
function compositeOver(foreground, backdrop) {
	const a = foreground.a;
	return {
		r: foreground.r * a + backdrop.r * (1 - a),
		g: foreground.g * a + backdrop.g * (1 - a),
		b: foreground.b * a + backdrop.b * (1 - a),
		a: 1
	};
}
function resolve(value, label) {
	if (typeof value !== "string") return value;
	const parsed = parseColor(value);
	if (parsed === null) throw new TypeError(`contrastRatio: could not parse ${label} "${value}"`);
	return parsed;
}
/**
* WCAG 2.x contrast ratio between a foreground and an opaque background.
* Returns a value in [1, 21].
*
* A translucent foreground is composited over the background first.
* A translucent background is rejected — composite it over its own
* backdrop before calling, since its rendered color is unknowable here.
*
* @example
* ```
* contrastRatio('#000000', '#FFFFFF'); // 21
* contrastRatio('#0D131A', '#FCFDFE') >= 4.5; // text-on-surface check
* ```
*/
function contrastRatio(foreground, background) {
	const bg = resolve(background, "background");
	if (bg.a < 1) throw new TypeError("contrastRatio: background must be opaque — composite it over its backdrop first");
	let fg = resolve(foreground, "foreground");
	if (fg.a < 1) fg = compositeOver(fg, bg);
	const lumA = relativeLuminance(fg);
	const lumB = relativeLuminance(bg);
	const lighter = Math.max(lumA, lumB);
	const darker = Math.min(lumA, lumB);
	return (lighter + .05) / (darker + .05);
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/theme/hct.js
/**
* @file hct.ts
* @input Hex color string (#RRGGBB)
* @output HCT color representation (Hue, Chroma, Tone)
* @position Theme utility; consumed by expandColorScale.ts
*
* Minimal HCT (Hue, Chroma, Tone) color space implementation.
* Ported from Google's material-color-utilities (Apache-2.0).
* Zero runtime dependencies — all math is self-contained.
*
* HCT combines:
* - Hue from CIELab (perceptually uniform hue)
* - Chroma approximated via CIELab C*ab (colorfulness)
* - Tone from L* (CIE Lightness, 0=black, 100=white)
*/
function srgbToLinear(c) {
	const s = c / 255;
	return s <= .04045 ? s / 12.92 : Math.pow((s + .055) / 1.055, 2.4);
}
function linearToSrgb(c) {
	const s = c <= .0031308 ? c * 12.92 : 1.055 * Math.pow(c, 1 / 2.4) - .055;
	return Math.round(Math.min(255, Math.max(0, s * 255)));
}
function linearRgbToXyz(r, g, b) {
	return [
		.4124564 * r + .3575761 * g + .1804375 * b,
		.2126729 * r + .7151522 * g + .072175 * b,
		.0193339 * r + .119192 * g + .9503041 * b
	];
}
function xyzToLinearRgb(x, y, z) {
	return [
		3.2404542 * x - 1.5371385 * y - .4985314 * z,
		-.969266 * x + 1.8760108 * y + .041556 * z,
		.0556434 * x - .2040259 * y + 1.0572252 * z
	];
}
var D65_WHITE = [
	.95047,
	1,
	1.08883
];
function labF(t) {
	const delta = 6 / 29;
	return t > delta * delta * delta ? Math.cbrt(t) : t / (3 * delta * delta) + 4 / 29;
}
function labFInv(t) {
	const delta = 6 / 29;
	return t > delta ? t * t * t : 3 * delta * delta * (t - 4 / 29);
}
function xyzToLab(x, y, z) {
	const fx = labF(x / D65_WHITE[0]);
	const fy = labF(y / D65_WHITE[1]);
	const fz = labF(z / D65_WHITE[2]);
	return [
		116 * fy - 16,
		500 * (fx - fy),
		200 * (fy - fz)
	];
}
function labToXyz(L, a, b) {
	const fy = (L + 16) / 116;
	const fx = a / 500 + fy;
	const fz = fy - b / 200;
	return [
		labFInv(fx) * D65_WHITE[0],
		labFInv(fy) * D65_WHITE[1],
		labFInv(fz) * D65_WHITE[2]
	];
}
function toneToY(tone) {
	return labFInv((tone + 16) / 116);
}
function hexToRgb(hex) {
	const parsed = parseHex(hex);
	if (parsed === null) return [
		0,
		0,
		0
	];
	return [
		parsed.r,
		parsed.g,
		parsed.b
	];
}
/**
* Convert a hex color to HCT.
* Hue: 0-360, Chroma: 0-~120, Tone: 0-100.
*/
function hexToHct(hex) {
	const [r, g, b] = hexToRgb(hex);
	const [x, y, z] = linearRgbToXyz(srgbToLinear(r), srgbToLinear(g), srgbToLinear(b));
	const [L, a, bLab] = xyzToLab(x, y, z);
	let hue = Math.atan2(bLab, a) * 180 / Math.PI;
	if (hue < 0) hue += 360;
	const chroma = Math.sqrt(a * a + bLab * bLab);
	return {
		hue,
		chroma,
		tone: Math.max(0, Math.min(100, L))
	};
}
/**
* Convert HCT to hex, with gamut mapping.
* Uses chroma reduction to find the closest in-gamut sRGB color.
*/
function hctToHex(hct) {
	const { hue, chroma, tone } = hct;
	if (tone <= 0) return "#000000";
	if (tone >= 100) return "#FFFFFF";
	if (chroma < .5) {
		const gray = toneToGray(tone);
		return formatHex(gray, gray, gray);
	}
	let lo = 0;
	let hi = chroma;
	let bestHex = "#000000";
	for (let i = 0; i < 16; i++) {
		const mid = (lo + hi) / 2;
		const candidate = hctComponentToHex(hue, mid, tone);
		if (candidate !== null) {
			bestHex = candidate;
			lo = mid;
		} else hi = mid;
	}
	return bestHex;
}
function toneToGray(tone) {
	return linearToSrgb(toneToY(tone));
}
function hctComponentToHex(hue, chroma, tone) {
	const hueRad = hue * Math.PI / 180;
	const [x, y, z] = labToXyz(tone, Math.cos(hueRad) * chroma, Math.sin(hueRad) * chroma);
	const [lr, lg, lb] = xyzToLinearRgb(x, y, z);
	const r = linearToSrgb(lr);
	const g = linearToSrgb(lg);
	const bVal = linearToSrgb(lb);
	const rLin = srgbToLinear(r);
	const gLin = srgbToLinear(g);
	const bLin = srgbToLinear(bVal);
	const tolerance = .02;
	if (Math.abs(rLin - lr) > tolerance || Math.abs(gLin - lg) > tolerance || Math.abs(bLin - lb) > tolerance) return null;
	if (r < 0 || r > 255 || g < 0 || g > 255 || bVal < 0 || bVal > 255) return null;
	return formatHex(r, g, bVal);
}
var PALETTE_TONES = [
	0,
	5,
	10,
	20,
	30,
	40,
	50,
	60,
	70,
	80,
	90,
	95,
	99,
	100
];
/**
* Generate a tonal palette: hex colors at standard tones
* for a given hue and chroma.
*/
function tonalPalette(hue, chroma) {
	const result = {};
	for (const tone of PALETTE_TONES) result[tone] = hctToHex({
		hue,
		chroma,
		tone
	});
	return result;
}
/**
* Append alpha (0-1) to a hex color as a 2-digit hex suffix.
*/
function hexWithAlpha(hex, alpha) {
	return hex + Math.round(alpha * 255).toString(16).padStart(2, "0").toUpperCase();
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/theme/expandColorScale.js
/**
* @file expandColorScale.ts
* @input Color scale configuration { accent?, neutralStyle?, contrast? }
* @output Token overrides for derivable color tokens
* @position Theme utility; consumed by defineTheme.ts
*
* Generates color token overrides from an accent seed using the HCT
* perceptual color model. Only produces tokens that meaningfully
* derive from the accent — status colors, categorical hues, and fixed
* tokens (on-dark/on-light) fall through to colorDefaults.
*
* `accent` is optional: a neutral-only config still gets the full neutral
* ramp (seeded from the default accent's hue) while the accent tokens
* themselves fall through to colorDefaults, same as the tokens above.
*
* `accent` also accepts a `[light, dark]` tuple (matching `TokenValue` in
* defineTheme). A tuple seeds each color scheme from its own half: the
* light side of every generated `light-dark()` pair derives from the light
* accent's palettes, the dark side from the dark accent's. A plain string
* seeds both sides identically, token for token the same output as before
* tuples existed.
*
* WCAG contrast guarantees (asserted in expandColorScale.test.ts):
* - Text tones are guaranteed >= 4.5:1 against their surfaces by tone
*   spacing alone — HCT tone is CIE L*, which fixes relative luminance
*   regardless of hue/chroma, so the fixed tone assignments hold for any
*   accent/neutralStyle (WCAG 1.4.3), and each half of a tuple pairs with
*   surfaces derived from that same seed.
* - --color-border-emphasized (form-control boundaries) is tone-bumped
*   until it reaches >= 3:1 against the generated surface (WCAG 1.4.11).
* - --color-border, --color-skeleton, and --color-track are intentionally
*   decorative/redundant cues and are NOT held to 3:1 — see the test file
*   for the rationale.
*
* SYNC: When modified, update:
* - /packages/core/src/theme/defineTheme.ts
* - /packages/cli/assets/theme.template.ts (the annotated field reference)
*/
/**
* Color scale configuration.
*
* @example
* ```
* // Minimal — just a seed color
* { accent: '#0064E0' }
*
* // Per-scheme seeds: light palettes from '#0064E0', dark from '#48CAE4'
* { accent: ['#0064E0', '#48CAE4'] }
*
* // With customization
* { accent: '#B7410E', neutralStyle: 'warm', contrast: 'high' }
*
* // Neutral-only — keeps the default accent, themes the neutrals
* { neutralStyle: 'warm' }
* ```
*/
var NEUTRAL_CHROMA = {
	warm: 7,
	cool: 5,
	neutral: 3
};
var NEUTRAL_VARIANT_CHROMA = {
	warm: 10,
	cool: 8,
	neutral: 6
};
/**
* Hue source for accent-less configs — the light half of
* colorDefaults['--color-accent'] (a test guards the two against drift).
* Only its hue reaches the output: the accent tokens stay ungenerated, so
* they keep their colorDefaults values rather than this seed's derivation.
*/
var DEFAULT_ACCENT_SEED = "#0064E0";
function ld(light, dark) {
	return `light-dark(${light}, ${dark})`;
}
function accentWithAlpha(alpha) {
	return `color-mix(in srgb, var(--color-accent) ${alpha * 100}%, transparent)`;
}
/** WCAG 1.4.11 minimum contrast for non-text UI boundaries. */
var NON_TEXT_MIN_CONTRAST = 3;
/**
* Walk tone in `step` increments from `startTone` until the color reaches
* `minRatio` against `background`, and return the resulting hex.
*
* Used for tokens whose preferred tone is not guaranteed by tone spacing
* alone (e.g. --color-border-emphasized). Because HCT tone is CIE L*,
* each step moves luminance monotonically, so the loop always terminates —
* at worst at pure black/white (21:1 against anything mid-range).
*/
function ensureContrastTone(hue, chroma, startTone, step, background, minRatio) {
	let tone = startTone;
	let hex = hctToHex({
		hue,
		chroma,
		tone
	});
	while (contrastRatio(hex, background) < minRatio && tone + step >= 0 && tone + step <= 100) {
		tone += step;
		hex = hctToHex({
			hue,
			chroma,
			tone
		});
	}
	return hex;
}
/**
* Expand a color scale config into Astryx color token overrides.
*
* Only generates tokens that meaningfully derive from the accent color.
* Tokens that are convention-bound (status colors, categorical hues,
* --color-on-dark/on-light) are NOT generated — they fall through
* to colorDefaults.
*
* A `[light, dark]` tuple accent seeds each scheme separately: the light
* half of every generated `light-dark()` pair comes from the light seed's
* palettes, the dark half from the dark seed's. A string accent seeds both
* halves from the same palettes, exactly as before tuples were supported.
*
* Without an `accent`, the accent tokens join that fall-through set: the
* neutrals are seeded from the default accent's hue, and --color-accent,
* --color-accent-muted and --color-on-accent keep their colorDefaults values.
*
* @example
* ```
* const tokens = expandColorScale({ accent: '#0064E0' });
* // tokens['--color-accent'] === 'light-dark(#..., #...)'
*
* const perScheme = expandColorScale({ accent: ['#0064E0', '#48CAE4'] });
* // light half derives from #0064E0, dark half from #48CAE4
*
* const neutralOnly = expandColorScale({ neutralStyle: 'warm' });
* // neutralOnly['--color-accent'] === undefined
* ```
*/
function expandColorScale(config) {
	const { accent, neutralStyle = "cool", contrast = "standard" } = config;
	const [lightAccent, darkAccent] = Array.isArray(accent) ? accent : [accent, accent];
	const lightSeed = hexToHct(lightAccent ?? DEFAULT_ACCENT_SEED);
	const sameSeed = darkAccent === lightAccent;
	const darkSeed = sameSeed ? lightSeed : hexToHct(darkAccent ?? DEFAULT_ACCENT_SEED);
	const neutralChroma = NEUTRAL_CHROMA[neutralStyle] ?? 5;
	const neutralVariantChroma = NEUTRAL_VARIANT_CHROMA[neutralStyle] ?? 8;
	const PL = tonalPalette(lightSeed.hue, Math.max(lightSeed.chroma, 48));
	const NL = tonalPalette(lightSeed.hue, neutralChroma);
	const NVL = tonalPalette(lightSeed.hue, neutralVariantChroma);
	const PD = sameSeed ? PL : tonalPalette(darkSeed.hue, Math.max(darkSeed.chroma, 48));
	const ND = sameSeed ? NL : tonalPalette(darkSeed.hue, neutralChroma);
	const NVD = sameSeed ? NVL : tonalPalette(darkSeed.hue, neutralVariantChroma);
	const isHigh = contrast === "high";
	const textPrimaryLightTone = isHigh ? 0 : 10;
	const textPrimaryDarkTone = isHigh ? 99 : 90;
	const textSecondaryLightTone = isHigh ? 20 : 30;
	const textSecondaryDarkTone = isHigh ? 80 : 70;
	const borderSubtleAlpha = isHigh ? .2 : .1;
	const borderEmphasizedStartLight = isHigh ? 50 : 70;
	const borderEmphasizedStartDark = isHigh ? 50 : 30;
	const borderEmphasized = ld(ensureContrastTone(lightSeed.hue, neutralVariantChroma, borderEmphasizedStartLight, -1, NL[99], NON_TEXT_MIN_CONTRAST), ensureContrastTone(darkSeed.hue, neutralVariantChroma, borderEmphasizedStartDark, 1, ND[10], NON_TEXT_MIN_CONTRAST));
	return {
		...accent != null ? {
			"--color-accent": ld(PL[40], PD[80]),
			"--color-accent-muted": ld(accentWithAlpha(.2), accentWithAlpha(.25)),
			"--color-on-accent": ld(PL[100], PD[20])
		} : null,
		"--color-neutral": ld(hexWithAlpha(NL[10], .1), hexWithAlpha(ND[90], .2)),
		"--color-background-surface": ld(NL[99], ND[10]),
		"--color-background-body": ld(NL[95], ND[5]),
		"--color-overlay": ld(hexWithAlpha(NL[10], .4), hexWithAlpha(ND[10], .6)),
		"--color-overlay-hover": ld(hexWithAlpha(NL[10], .05), hexWithAlpha(ND[100], .05)),
		"--color-overlay-pressed": ld(hexWithAlpha(NL[10], .1), hexWithAlpha(ND[100], .1)),
		"--color-background-muted": ld(hexWithAlpha(NL[10], .05), hexWithAlpha(ND[10], .5)),
		"--color-text-primary": ld(NL[textPrimaryLightTone], ND[textPrimaryDarkTone]),
		"--color-text-secondary": ld(NVL[textSecondaryLightTone], NVD[textSecondaryDarkTone]),
		"--color-text-disabled": ld(NVL[60], NVD[40]),
		"--color-text-accent": "var(--color-accent)",
		"--color-icon-accent": "var(--color-accent)",
		"--color-icon-primary": ld(NL[textPrimaryLightTone], ND[textPrimaryDarkTone]),
		"--color-icon-secondary": ld(NVL[textSecondaryLightTone], NVD[textSecondaryDarkTone]),
		"--color-icon-disabled": ld(NVL[60], NVD[40]),
		"--color-background-card": ld(NL[99], ND[10]),
		"--color-background-popover": ld(NL[99], ND[20]),
		"--color-background-inverted": ld(NL[10], ND[99]),
		"--color-border": ld(hexWithAlpha(NL[10], borderSubtleAlpha), hexWithAlpha(ND[95], borderSubtleAlpha)),
		"--color-border-emphasized": borderEmphasized,
		"--color-skeleton": ld(NVL[70], NVD[30]),
		"--color-track": ld(NVL[70], NVD[30]),
		"--color-shadow": ld(hexWithAlpha(NL[0], .1), hexWithAlpha(ND[0], .3)),
		"--color-tint-hover": ld("black", "white")
	};
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/theme/resolveThemeValues.js
/**
* @file resolveThemeValues.ts
* @input The value-bearing axes of a theme input (typography, color, radius,
*        motion, syntax, tokens, components) and an optional resolved seed
* @output A resolved token map and component style map
* @position Theme system core; consumed by defineTheme and themeAdaptations
*
* One resolution pipeline, shared by every layer that turns declarative theme
* axes into concrete values. `defineTheme` runs its top-level input over an
* optional base seed. An adaptation rule completes partial axes from root
* metadata first, then runs its own value without a seed to obtain exactly the
* leaves that rule writes.
*
* Precedence inside one resolved layer, lowest to highest: seed → color → type
* scale → radius → motion → font families → syntax → explicit `tokens`.
* Ordered rule-vs-root and rule-vs-rule precedence is owned by
* `themeAdaptations` and CSS source order, outside this value resolver.
*
* SYNC: When modified, update:
* - /packages/core/src/theme/defineTheme.ts (its only other caller)
* - /packages/core/src/theme/themeAdaptations.ts
*/
/**
* The value-bearing axes of a theme — everything that resolves to tokens or
* component styles. Deliberately excludes identity (`name`), inheritance
* (`extends`), the registries (`icons`, `indicators`), the surface overrides
* (`onDark`/`onLight`) and the tiers themselves: none of those participate in
* value resolution.
*/
/** Already-resolved values to start from — the lowest precedence layer. */
/** The resolved output of one theme layer. */
/**
* Resolve a token value to a CSS string.
* - String values pass through as-is
* - [light, dark] tuples become light-dark(light, dark)
*
* `strict` decides what happens to anything else, and the split is a
* compatibility boundary rather than a preference:
*
* - LENIENT (default) is the behavior `defineTheme` has always had. `TokenValue`
*   is a compile-time contract only, and themes reach this function through
*   casts, broad spreads, generated objects and plain JavaScript, so values
*   outside the type genuinely do arrive. Historically a two-element array
*   became `light-dark()` and everything else passed through untouched;
*   rejecting those now would break themes that build today and have nothing
*   to do with adaptations.
* - STRICT is for values authored inside an adaptation rule. That surface is
*   new, so there is no established acceptance to preserve, and a malformed
*   value there is worth catching before it reaches CSS.
*
* SYNC: packages/core/src/theme/themeAdaptations.ts (strict resolution)
*/
function resolveTokenValue$1(value, { strict = false } = {}) {
	if (typeof value === "string") return value;
	if (Array.isArray(value) && value.length === 2 && typeof value[0] === "string" && typeof value[1] === "string") return `light-dark(${value[0]}, ${value[1]})`;
	if (strict) throw new Error("Theme token values must be CSS strings or [light, dark] string tuples.");
	if (Array.isArray(value)) return `light-dark(${value[0]}, ${value[1]})`;
	return value;
}
/**
* Resolve a FontWeight name to a var() reference.
* Named weights map to var(--font-weight-*); raw values pass through.
*/
function resolveFontWeight(weight) {
	return {
		normal: "var(--font-weight-normal)",
		medium: "var(--font-weight-medium)",
		semibold: "var(--font-weight-semibold)",
		bold: "var(--font-weight-bold)"
	}[weight] ?? weight;
}
/**
* Build the full CSS font-family value from family + fallbacks.
* Quotes the family name if it contains spaces.
*/
function buildFontFamily(family, fallbacks) {
	if (!family) return;
	const quoted = family.includes(" ") ? `"${family}"` : family;
	if (fallbacks) return `${quoted}, ${fallbacks}`;
	return quoted;
}
/**
* Build the type-scale config from a typography config, collecting the weight
* overrides its roles imply.
*
* Returns undefined when the config declares no scale — font families and
* weights alone do not produce one.
*/
function buildTypeScaleConfig(typo) {
	if (!typo.scale) return;
	const headingWeights = {};
	const headingRole = typo.heading;
	if (headingRole?.weights) {
		for (const [level, w] of Object.entries(headingRole.weights)) if (w) headingWeights[Number(level)] = resolveFontWeight(w);
	}
	const defaultHeadingWeight = headingRole?.weight ? resolveFontWeight(headingRole.weight) : void 0;
	if (defaultHeadingWeight) {
		for (let i = 1; i <= 6; i++) if (!(i in headingWeights)) headingWeights[i] = defaultHeadingWeight;
	}
	const textWeights = {};
	if (typo.body?.weight) textWeights.body = resolveFontWeight(typo.body.weight);
	if (typo.code?.weight) textWeights.code = resolveFontWeight(typo.code.weight);
	return {
		base: typo.scale.base,
		ratio: typo.scale.ratio,
		weights: {
			...Object.keys(headingWeights).length > 0 ? { heading: headingWeights } : {},
			...Object.keys(textWeights).length > 0 ? { text: textWeights } : {}
		}
	};
}
/**
* Build the `--font-family-*` token overrides implied by a typography config.
* Heading inherits from body when it declares no family of its own.
*/
function buildFontFamilyTokens(typo) {
	const tokens = {};
	const bodyFamily = buildFontFamily(typo.body?.family, typo.body?.fallbacks);
	const headingFamily = buildFontFamily(typo.heading?.family, typo.heading?.fallbacks) ?? bodyFamily;
	const codeFamily = buildFontFamily(typo.code?.family, typo.code?.fallbacks);
	if (bodyFamily) tokens["--font-family-body"] = bodyFamily;
	if (headingFamily) tokens["--font-family-heading"] = headingFamily;
	if (codeFamily) tokens["--font-family-code"] = codeFamily;
	return tokens;
}
/**
* Resolve one theme layer's declarative axes into tokens and component styles.
*
* `seed` is the already-resolved layer underneath — the base theme for an
* `extends`, or nothing for a root theme. It sits below everything this input
* declares.
*/
function resolveThemeValues(input, seed, { strictTokens = false } = {}) {
	const tokens = { ...seed?.tokens };
	const typo = input.typography;
	const typeScaleConfig = typo ? buildTypeScaleConfig(typo) : void 0;
	if (input.color) Object.assign(tokens, expandColorScale(input.color));
	if (typeScaleConfig) Object.assign(tokens, expandTypeScale(typeScaleConfig));
	if (input.radius) Object.assign(tokens, expandRadiusScale(input.radius));
	if (input.motion) Object.assign(tokens, expandMotionScale(input.motion));
	if (typo) Object.assign(tokens, buildFontFamilyTokens(typo));
	if (input.syntax) {
		const prefix = "--color-syntax-";
		for (const [key, value] of Object.entries(input.syntax.tokens)) tokens[prefix + key] = value;
	}
	if (input.tokens) {
		for (const [key, value] of Object.entries(input.tokens)) if (value !== void 0) tokens[key] = resolveTokenValue$1(value, { strict: strictTokens });
	}
	let components = input.components;
	if (typeScaleConfig) components = deepMergeComponents(generateTypeScaleComponents(typeScaleConfig), input.components);
	if (seed?.components) components = deepMergeComponents(seed.components, components);
	return {
		tokens,
		components
	};
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/theme/localTokens.js
/**
* @file localTokens.ts
* @input Root and adaptation theme-local token declarations and references
* @output Validated exact-name ownership metadata plus normalized conditional writes
* @position Theme-local ownership boundary; final adaptation-cycle validation is
*   performed after the reachable ordered cascade is assembled.
*/
var CSS_NAME_CHARACTER = String.raw`(?:[-_a-zA-Z0-9]|\P{ASCII}|\\(?:[0-9a-fA-F]{1,6}[ \t\r\n\f]?|[^\r\n\f]))`;
new RegExp(`^--${CSS_NAME_CHARACTER}*$`, "u");
var CSS_VAR_PATTERN = new RegExp(`var\\(\\s*(--${CSS_NAME_CHARACTER}*)(?=\\s*(?:,|\\)))`, "giu");
function hasOwn(object, key) {
	return Object.prototype.hasOwnProperty.call(object, key);
}
function resolveTokenValue(value, path) {
	if (typeof value === "string") return value;
	if (Array.isArray(value) && value.length === 2 && typeof value[0] === "string" && typeof value[1] === "string") return `light-dark(${value[0]}, ${value[1]})`;
	throw new Error(`${path} must be a CSS string or a [light, dark] string tuple.`);
}
function collectCustomPropertyReferences(value, refs) {
	if (typeof value === "string") {
		CSS_VAR_PATTERN.lastIndex = 0;
		for (let match = CSS_VAR_PATTERN.exec(value); match; match = CSS_VAR_PATTERN.exec(value)) refs.add(match[1]);
		return;
	}
	if (Array.isArray(value)) {
		for (const item of value) collectCustomPropertyReferences(item, refs);
		return;
	}
	if (value && typeof value === "object") for (const nested of Object.values(value)) collectCustomPropertyReferences(nested, refs);
}
function assertNoTokenCycles(tokenValues, context, relevantNames) {
	const dependencies = /* @__PURE__ */ new Map();
	for (const [name, value] of Object.entries(tokenValues)) {
		const refs = /* @__PURE__ */ new Set();
		collectCustomPropertyReferences(value, refs);
		dependencies.set(name, [...refs].filter((reference) => hasOwn(tokenValues, reference)));
	}
	const findCyclePath = (start, component) => {
		const path = [start];
		const onPath = new Set(path);
		const search = (name) => {
			for (const dependency of dependencies.get(name) ?? []) {
				if (!component.has(dependency)) continue;
				if (dependency === start) {
					path.push(start);
					return true;
				}
				if (onPath.has(dependency)) continue;
				path.push(dependency);
				onPath.add(dependency);
				if (search(dependency)) return true;
				onPath.delete(dependency);
				path.pop();
			}
			return false;
		};
		search(start);
		return path;
	};
	let nextIndex = 0;
	const indexes = /* @__PURE__ */ new Map();
	const lowlinks = /* @__PURE__ */ new Map();
	const stack = [];
	const onStack = /* @__PURE__ */ new Set();
	const visit = (name) => {
		const index = nextIndex++;
		indexes.set(name, index);
		lowlinks.set(name, index);
		stack.push(name);
		onStack.add(name);
		for (const dependency of dependencies.get(name) ?? []) if (!indexes.has(dependency)) {
			visit(dependency);
			lowlinks.set(name, Math.min(lowlinks.get(name) ?? index, lowlinks.get(dependency) ?? 0));
		} else if (onStack.has(dependency)) lowlinks.set(name, Math.min(lowlinks.get(name) ?? index, indexes.get(dependency) ?? 0));
		if (lowlinks.get(name) !== index) return;
		const component = [];
		let member;
		do {
			member = stack.pop() ?? name;
			onStack.delete(member);
			component.push(member);
		} while (member !== name);
		if (!(component.length > 1 || (dependencies.get(component[0]) ?? []).includes(component[0])) || relevantNames && !component.some((componentName) => relevantNames.has(componentName))) return;
		const start = component.find((componentName) => relevantNames?.has(componentName)) ?? component[0];
		const cycle = findCyclePath(start, new Set(component)).join(" -> ");
		throw new Error(`${context ? `${context}: ` : ""}Theme token cycle detected: ${cycle}.`);
	};
	for (const name of Object.keys(tokenValues)) if (!indexes.has(name)) visit(name);
}
/**
* Resolve theme-local values written by one adaptation rule.
*
* Adaptations may replace names already enrolled by the root theme lineage, but
* they never enroll names of their own. Cycle validation waits until all
* co-matching writes have cascaded in order.
*/
function resolveAdaptationLocalTokens(themeName, ruleIndex, declarations, rootLocalTokens) {
	const path = `defineTheme("${themeName}").adaptations.rules[${ruleIndex}].value.localTokens`;
	if (declarations === void 0) return;
	if (declarations === null || typeof declarations !== "object" || Array.isArray(declarations)) throw new Error(`${path} must be a token map.`);
	const resolved = {};
	for (const [name, value] of Object.entries(declarations)) {
		if (!rootLocalTokens || !hasOwn(rootLocalTokens, name)) throw new Error(`${path}["${name}"] cannot enroll a theme-local token. Declare it in the root theme or an exact enrolled base first.`);
		resolved[name] = resolveTokenValue(value, `${path}["${name}"]`);
	}
	return Object.keys(resolved).length > 0 ? resolved : void 0;
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/theme/themeAdaptations.js
/**
* @file themeAdaptations.ts
* @input Ordered environment-conditioned theme value rules from defineTheme
* @output Validated breakpoint metadata and resolved CSS-first rule layers
* @position Theme system core; consumed by defineTheme, AppShell, and the CSS compiler
*
* Adaptations are deliberately closed and ordered. Width points are fixed names,
* sparse rules and reserved token routing are rejected during normalization,
* condition fields are ANDed, and rule order is the precedence model: every
* matching rule writes after the root theme and later matching writes win.
* Invariant type-scale component defaults already declared at root are omitted;
* authored rule leaves and generated token writes retain their cascade order.
* Token cycles are judged after each reachable ordered cascade is complete.
*
* SYNC: When modified, update:
* - /packages/core/src/theme/defineTheme.ts (`DefineThemeInput.adaptations`)
* - /packages/core/src/theme/generateThemeRules.ts (`generateAdaptationCSS`)
* - /packages/core/src/AppShell/AppShell.tsx (named breakpoint consumption)
* - /packages/cli/assets/theme.template.ts
* - /packages/cli/assets/docs/theme.doc.mjs
* - /packages/cli/api/theme/build/build.mjs
*/
/** Fixed names for viewport-width tier start points. */
var WIDTH_BREAKPOINT_NAMES = [
	"sm",
	"md",
	"lg",
	"xl",
	"2xl"
];
/** One fixed viewport-width breakpoint name. */
/** A complete, validated map of viewport-width tier start points in CSS px. */
/** The default Astryx viewport-width tier start points in CSS px. */
var DEFAULT_WIDTH_BREAKPOINTS = Object.freeze({
	sm: 640,
	md: 768,
	lg: 1024,
	xl: 1280,
	"2xl": 1536
});
/** Inclusive lower and exclusive upper edges for one width condition. */
/** Closed environmental condition vocabulary. Fields are ANDed. */
/** Typography overrides inside an adaptation rule. */
/** Theme values an adaptation rule may write. */
/** One ordered condition-to-value adaptation rule. */
/** Adaptation authoring input accepted by defineTheme. */
/** Validated authoring data retained for source-equivalent theme extension. */
/** Generative-axis metadata needed to complete partial adaptation values. */
/** One rule lowered to concrete CSS writes. */
function isRecord(value) {
	return value !== null && typeof value === "object" && !Array.isArray(value);
}
function assertRecord(value, path) {
	if (!isRecord(value)) throw new Error(`${path} must be an object.`);
}
function assertAllowedKeys(value, allowed, path) {
	for (const key of Object.keys(value)) if (!allowed.has(key)) throw new Error(`${path}.${key} is not supported.`);
}
function cloneData(value) {
	if (Array.isArray(value)) {
		const cloned = [];
		for (const item of value) cloned.push(cloneData(item));
		return cloned;
	}
	if (isRecord(value)) return Object.fromEntries(Object.entries(value).map(([key, nested]) => [key, cloneData(nested)]));
	return value;
}
var BREAKPOINT_NAMES = new Set(WIDTH_BREAKPOINT_NAMES);
var ADAPTATION_KEYS = /* @__PURE__ */ new Set(["widthBreakpoints", "rules"]);
var RULE_KEYS = /* @__PURE__ */ new Set(["when", "value"]);
var CONDITION_KEYS = /* @__PURE__ */ new Set([
	"width",
	"pointer",
	"contrast",
	"motion"
]);
var WIDTH_CONDITION_KEYS = /* @__PURE__ */ new Set(["from", "below"]);
var VALUE_KEYS = /* @__PURE__ */ new Set([
	"typography",
	"color",
	"radius",
	"motion",
	"tokens",
	"localTokens",
	"components"
]);
function normalizeBreakpointOverrides(value, path) {
	assertRecord(value, path);
	assertAllowedKeys(value, BREAKPOINT_NAMES, path);
	const result = {};
	for (const name of WIDTH_BREAKPOINT_NAMES) {
		const point = value[name];
		if (point === void 0) continue;
		if (typeof point !== "number" || !Number.isFinite(point) || point <= 0) throw new Error(`${path}.${name} must be a finite positive number of CSS pixels.`);
		result[name] = point;
	}
	return result;
}
function assertCompleteBreakpoints(value, path) {
	const overrides = normalizeBreakpointOverrides(value, path);
	for (const name of WIDTH_BREAKPOINT_NAMES) if (overrides[name] === void 0) throw new Error(`${path}.${name} is missing from the effective breakpoint map.`);
	return overrides;
}
function assertIncreasingBreakpoints(points, path) {
	let previous;
	for (const name of WIDTH_BREAKPOINT_NAMES) {
		if (previous !== void 0 && points[name] <= points[previous]) throw new Error(`${path} must be strictly increasing: ${name} (${points[name]}) is not above ${previous} (${points[previous]}).`);
		previous = name;
	}
}
function normalizeCondition(value, path) {
	assertRecord(value, path);
	assertAllowedKeys(value, CONDITION_KEYS, path);
	const defined = Object.fromEntries(Object.entries(value).filter(([, nested]) => nested !== void 0));
	if (Object.keys(defined).length === 0) throw new Error(`${path} must contain at least one condition.`);
	const condition = cloneData(defined);
	if (condition.width !== void 0) {
		assertRecord(condition.width, `${path}.width`);
		assertAllowedKeys(condition.width, WIDTH_CONDITION_KEYS, `${path}.width`);
		if (condition.width.from === void 0 && condition.width.below === void 0) throw new Error(`${path}.width must contain \`from\`, \`below\`, or both.`);
		for (const edge of ["from", "below"]) {
			const name = condition.width[edge];
			if (name !== void 0 && (typeof name !== "string" || !BREAKPOINT_NAMES.has(name))) throw new Error(`${path}.width.${edge} must be one of ${WIDTH_BREAKPOINT_NAMES.join(", ")}.`);
		}
	}
	if (condition.pointer !== void 0 && condition.pointer !== "coarse" && condition.pointer !== "fine") throw new Error(`${path}.pointer must be 'coarse' or 'fine'.`);
	if (condition.contrast !== void 0 && condition.contrast !== "more" && condition.contrast !== "less" && condition.contrast !== "no-preference") throw new Error(`${path}.contrast must be 'more', 'less', or 'no-preference'.`);
	if (condition.motion !== void 0 && condition.motion !== "reduce" && condition.motion !== "no-preference") throw new Error(`${path}.motion must be 'reduce' or 'no-preference'.`);
	return condition;
}
function normalizeValue(value, path) {
	assertRecord(value, path);
	assertAllowedKeys(value, VALUE_KEYS, path);
	for (const key of VALUE_KEYS) {
		const nested = value[key];
		if (nested !== void 0 && !isRecord(nested)) throw new Error(`${path}.${key} must be an object.`);
	}
	return cloneData(value);
}
function normalizeRule(value, path) {
	assertRecord(value, path);
	assertAllowedKeys(value, RULE_KEYS, path);
	if (!Object.prototype.hasOwnProperty.call(value, "when")) throw new Error(`${path}.when is required.`);
	if (!Object.prototype.hasOwnProperty.call(value, "value")) throw new Error(`${path}.value is required.`);
	return {
		when: normalizeCondition(value.when, `${path}.when`),
		value: normalizeValue(value.value, `${path}.value`)
	};
}
function normalizeRules(value, path) {
	if (!Array.isArray(value)) throw new Error(`${path} must be an array of {when, value} objects.`);
	for (let index = 0; index < value.length; index++) if (!Object.prototype.hasOwnProperty.call(value, index)) throw new Error(`${path}[${index}] must be present.`);
	return value.map((rule, index) => normalizeRule(rule, `${path}[${index}]`));
}
/**
* Merge and validate inherited plus locally-authored adaptation metadata.
* Inherited rules retain order; child rules append.
*/
function normalizeThemeAdaptations(themeName, inherited, input) {
	const rootPath = `defineTheme("${themeName}").adaptations`;
	let inheritedPoints = { ...DEFAULT_WIDTH_BREAKPOINTS };
	let inheritedRules = [];
	if (inherited !== void 0) {
		assertRecord(inherited, `defineTheme("${themeName}").extends.__adaptations`);
		assertAllowedKeys(inherited, /* @__PURE__ */ new Set(["widthBreakpoints", "rules"]), `defineTheme("${themeName}").extends.__adaptations`);
		inheritedPoints = assertCompleteBreakpoints(inherited.widthBreakpoints, `defineTheme("${themeName}").extends.__adaptations.widthBreakpoints`);
		inheritedRules = normalizeRules(inherited.rules, `defineTheme("${themeName}").extends.__adaptations.rules`);
	}
	let ownPoints = {};
	let ownRules = [];
	if (input !== void 0) {
		assertRecord(input, rootPath);
		assertAllowedKeys(input, ADAPTATION_KEYS, rootPath);
		if (input.widthBreakpoints !== void 0) ownPoints = normalizeBreakpointOverrides(input.widthBreakpoints, `${rootPath}.widthBreakpoints`);
		if (input.rules !== void 0) ownRules = normalizeRules(input.rules, `${rootPath}.rules`);
	}
	const widthBreakpoints = {
		...inheritedPoints,
		...ownPoints
	};
	assertIncreasingBreakpoints(widthBreakpoints, `${rootPath}.widthBreakpoints`);
	return {
		widthBreakpoints,
		rules: [...inheritedRules, ...ownRules]
	};
}
function mergeRole(root, rule) {
	if (!root) return rule;
	if (!rule) return root;
	return {
		...root,
		...rule,
		weights: root.weights || rule.weights ? {
			...root.weights,
			...rule.weights
		} : void 0
	};
}
function assertFiniteNumber(value, path) {
	if (typeof value !== "number" || !Number.isFinite(value)) throw new Error(`${path} must be a finite number.`);
}
function completeTypography(root, rule, path) {
	const writesScale = rule.scale !== void 0 || [
		rule.body,
		rule.heading,
		rule.code
	].some((role) => role?.weight !== void 0 || role?.weights !== void 0);
	let scale = writesScale ? root?.scale : void 0;
	if (rule.scale !== void 0) {
		const base = rule.scale.base ?? root?.scale?.base;
		const ratio = rule.scale.ratio ?? root?.scale?.ratio;
		if (base === void 0 || ratio === void 0) throw new Error(`${path}.scale must supply both \`base\` and \`ratio\` unless the missing field exists on the effective root typography axis.`);
		assertFiniteNumber(base, `${path}.scale.base`);
		assertFiniteNumber(ratio, `${path}.scale.ratio`);
		scale = {
			base,
			ratio
		};
	} else if (writesScale && scale === void 0) throw new Error(`${path} sets typography weights without an effective root scale. Supply \`scale.base\` and \`scale.ratio\` in the same rule.`);
	return {
		...scale ? { scale } : {},
		body: mergeRole(root?.body, rule.body),
		heading: mergeRole(root?.heading, rule.heading),
		code: mergeRole(root?.code, rule.code)
	};
}
function completeRadius(root, rule, path) {
	const base = rule.base ?? root?.base;
	const multiplier = rule.multiplier ?? root?.multiplier;
	if (base === void 0 || multiplier === void 0) throw new Error(`${path} must supply both \`base\` and \`multiplier\` unless the missing field exists on the effective root radius axis.`);
	assertFiniteNumber(base, `${path}.base`);
	assertFiniteNumber(multiplier, `${path}.multiplier`);
	return {
		base,
		multiplier
	};
}
function completeMotion(root, rule, path) {
	const fast = rule.fast ?? root?.fast;
	const medium = rule.medium ?? root?.medium;
	const ratio = rule.ratio ?? root?.ratio;
	if (fast === void 0 || medium === void 0 || ratio === void 0) throw new Error(`${path} must supply \`fast\`, \`medium\`, and \`ratio\` unless each missing field exists on the effective root motion axis.`);
	assertFiniteNumber(fast, `${path}.fast`);
	assertFiniteNumber(medium, `${path}.medium`);
	assertFiniteNumber(ratio, `${path}.ratio`);
	const slow = rule.slow ?? root?.slow;
	if (slow !== void 0) assertFiniteNumber(slow, `${path}.slow`);
	const easing = rule.easing ?? root?.easing;
	return {
		fast,
		medium,
		ratio,
		...slow !== void 0 ? { slow } : {},
		...easing !== void 0 ? { easing } : {}
	};
}
function valueToThemeInput(themeName, ruleIndex, value, axes) {
	const path = `defineTheme("${themeName}").adaptations.rules[${ruleIndex}].value`;
	return {
		typography: value.typography ? completeTypography(axes.typography, value.typography, `${path}.typography`) : void 0,
		color: value.color ? {
			...axes.color,
			...value.color
		} : void 0,
		radius: value.radius ? completeRadius(axes.radius, value.radius, `${path}.radius`) : void 0,
		motion: value.motion ? completeMotion(axes.motion, value.motion, `${path}.motion`) : void 0,
		tokens: value.tokens,
		components: value.components
	};
}
function assertConcreteLeaf(value, path) {
	if (typeof value === "string") {
		if (/\b(?:NaN|undefined)\b/.test(value)) throw new Error(`${path} resolved to the invalid CSS value "${value}".`);
		return;
	}
	if (isRecord(value)) {
		for (const [key, nested] of Object.entries(value)) assertConcreteLeaf(nested, `${path}.${key}`);
		return;
	}
	throw new Error(`${path} must resolve to a concrete CSS string.`);
}
function mediaQueryForCondition(themeName, ruleIndex, condition, points) {
	const path = `defineTheme("${themeName}").adaptations.rules[${ruleIndex}].when`;
	const parts = [];
	if (condition.width) {
		const from = condition.width.from;
		const below = condition.width.below;
		if (from !== void 0 && below !== void 0 && points[from] >= points[below]) throw new Error(`${path}.width must resolve to \`from < below\`; ${from} is ${points[from]}px and ${below} is ${points[below]}px.`);
		if (from !== void 0) parts.push(`(width >= ${points[from]}px)`);
		if (below !== void 0) parts.push(`(width < ${points[below]}px)`);
	}
	if (condition.pointer !== void 0) parts.push(`(pointer: ${condition.pointer})`);
	if (condition.contrast !== void 0) parts.push(`(prefers-contrast: ${condition.contrast})`);
	if (condition.motion !== void 0) parts.push(`(prefers-reduced-motion: ${condition.motion})`);
	if (parts.length === 0) throw new Error(`${path} must contain at least one concrete condition.`);
	return parts.join(" and ");
}
var COMPLETE_ENVIRONMENT_VALUES = {
	pointer: [
		"coarse",
		"fine",
		"none"
	],
	contrast: [
		"more",
		"less",
		"no-preference",
		"custom"
	],
	motion: ["reduce", "no-preference"]
};
/** Whether one normalized rule matches one representative environment cell. */
function conditionMatchesEnvironment(condition, points, environment) {
	const from = condition.width?.from;
	if (from !== void 0 && environment.width < points[from]) return false;
	const below = condition.width?.below;
	if (below !== void 0 && environment.width >= points[below]) return false;
	if (condition.pointer !== void 0 && condition.pointer !== environment.pointer) return false;
	if (condition.contrast !== void 0 && condition.contrast !== environment.contrast) return false;
	if (condition.motion !== void 0 && condition.motion !== environment.motion) return false;
	return true;
}
/**
* Reject token cycles reachable in any matching adaptation-rule cascade.
*
* Conditions use a finite, closed vocabulary. Sampling zero and each named
* width boundary covers every distinct width truth region; the discrete axes
* enumerate every browser state relevant to the supported queries. For each
* reachable match set, portable and local writes are applied in authored order
* before checking the effective graph, so a later matching rule may
* intentionally repair an earlier cycle just as it does in CSS.
*/
function assertNoReachableTokenCycles(themeName, points, rootTokens, rootLocalTokens, rules) {
	const tokenRuleIndexes = rules.flatMap((rule, index) => Object.keys(rule.tokens).length > 0 || rule.localTokens && Object.keys(rule.localTokens).length > 0 ? [index] : []);
	if (tokenRuleIndexes.length === 0) return;
	const widthEnvironments = [0, ...WIDTH_BREAKPOINT_NAMES.map((name) => points[name])];
	const checkedMatchSets = /* @__PURE__ */ new Set();
	for (const width of widthEnvironments) for (const pointer of COMPLETE_ENVIRONMENT_VALUES.pointer) for (const contrast of COMPLETE_ENVIRONMENT_VALUES.contrast) for (const motion of COMPLETE_ENVIRONMENT_VALUES.motion) {
		const environment = {
			width,
			pointer,
			contrast,
			motion
		};
		const matchingRuleIndexes = tokenRuleIndexes.filter((index) => conditionMatchesEnvironment(rules[index].when, points, environment));
		if (matchingRuleIndexes.length === 0) continue;
		const signature = matchingRuleIndexes.join(",");
		if (checkedMatchSets.has(signature)) continue;
		checkedMatchSets.add(signature);
		const effective = {
			...rootTokens,
			...rootLocalTokens
		};
		const relevantNames = /* @__PURE__ */ new Set();
		for (const index of matchingRuleIndexes) {
			const rule = rules[index];
			Object.assign(effective, rule.tokens, rule.localTokens);
			for (const name of Object.keys(rule.tokens)) relevantNames.add(name);
			for (const name of Object.keys(rule.localTokens ?? {})) relevantNames.add(name);
		}
		const indexes = matchingRuleIndexes.join(", ");
		const queries = matchingRuleIndexes.map((index) => rules[index].query).join("; ");
		assertNoTokenCycles(effective, `defineTheme("${themeName}").adaptations ${matchingRuleIndexes.length === 1 ? "rule" : "overlapping rules"} [${indexes}] (${queries})`, relevantNames);
	}
}
/**
* Type-scale component generation is invariant var() wiring, not scale values.
* Keep root declarations (including authored pins) in the root cascade instead
* of resetting them in a rule that only changes tokens. Fill missing root paths
* for rule-only scales, and retain every authored rule leaf, even when it equals
* the root: that write may intentionally undo an earlier matching rule.
*
* SYNC: expandTypeScale.ts (generateTypeScaleComponents)
*/
function omitRootTypeScaleDefaults(resolved, root, authored) {
	if (!resolved || !root) return resolved;
	const components = {};
	for (const [component, rules] of Object.entries(resolved)) for (const [key, styles] of Object.entries(rules)) {
		const writes = Object.fromEntries(Object.entries(styles).filter(([property]) => root[component]?.[key]?.[property] === void 0 || Object.hasOwn(authored?.[component]?.[key] ?? {}, property)));
		if (Object.keys(writes).length > 0) (components[component] ??= {})[key] = writes;
	}
	return Object.keys(components).length > 0 ? components : void 0;
}
/** Lower ordered normalized rules to concrete CSS writes. */
function resolveThemeAdaptationRules(themeName, adaptations, axes, rootTokens, rootLocalTokens, rootComponents) {
	if (adaptations.rules.length === 0) return;
	const resolvedRules = adaptations.rules.map((rule, index) => {
		const input = valueToThemeInput(themeName, index, rule.value, axes);
		const resolved = resolveThemeValues(input, void 0, { strictTokens: true });
		for (const [name, value] of Object.entries(resolved.tokens)) assertConcreteLeaf(value, `defineTheme("${themeName}").adaptations.rules[${index}].value.tokens["${name}"]`);
		if (resolved.components) assertConcreteLeaf(resolved.components, `defineTheme("${themeName}").adaptations.rules[${index}].value.components`);
		for (const name of Object.keys(rule.value.tokens ?? {})) if (rootLocalTokens && Object.prototype.hasOwnProperty.call(rootLocalTokens, name)) throw new Error(`defineTheme("${themeName}").adaptations.rules[${index}].value.tokens["${name}"] matches an enrolled theme-local declaration; write it through value.localTokens instead.`);
		const localTokens = resolveAdaptationLocalTokens(themeName, index, rule.value.localTokens, rootLocalTokens);
		return {
			when: rule.when,
			query: mediaQueryForCondition(themeName, index, rule.when, adaptations.widthBreakpoints),
			tokens: resolved.tokens,
			localTokens,
			components: input.typography?.scale ? omitRootTypeScaleDefaults(resolved.components, rootComponents, rule.value.components) : resolved.components
		};
	});
	assertNoReachableTokenCycles(themeName, adaptations.widthBreakpoints, rootTokens, rootLocalTokens, resolvedRules);
	return resolvedRules;
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/theme/themeRegistry.js
/**
* @file themeRegistry.ts
* @input DefinedTheme objects from defineTheme() or built theme packages
* @output Exports registerTheme, getRegisteredTheme, getRegisteredThemes, resetThemes
* @position Server-safe theme registry for theme-name-based SSR resolution
*
* This module has NO 'use client' directive. It is importable from SSR/RSC and
* lets code resolve theme data by stable theme name without React context.
*/
var themeRegistry = /* @__PURE__ */ new Map();
/**
* Register a defined theme under its `name`.
*
* Registration is idempotent and replaces any previous theme with the same
* name. Call from app initialization, theme packages, or <Theme> to make the
* theme available to SSR-safe resolvers by name.
*/
function registerTheme(theme) {
	themeRegistry.set(theme.name, theme);
}
/**
* Return a previously registered theme by name.
*/
function getRegisteredTheme(name) {
	if (name == null || name === "") return null;
	return themeRegistry.get(name) ?? null;
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/naming.js
/**
* @file naming.ts
* @input None (pure constants/helpers)
* @output Centralized namespace-prefix constants and helpers for all
*   externally-observable name surfaces: CSS classes, data attributes,
*   CSS custom properties, and CSS layer names.
* @position Single source of truth consumed by the runtime (components,
*   theme generation) AND by build/CLI tooling (build-theme.mjs, discovery)
*   via the `@astryxdesign/core/naming` subpath export.
*
* ## Why this module exists
*
* The namespace prefix `astryx` is part of several externally-observable
* contracts (`.astryx-button` classes, `data-astryx-theme` attributes,
* `--astryx-card-padding` custom properties). Historically each of these was
* hardcoded independently across the runtime, the theme build pipeline, and
* discovery tooling, kept in sync only by `<!-- SYNC: ... -->` comments.
* Centralizing the prefix here means it lives in ONE place instead of
* hundreds of literals.
*
* ## Surfaces
*
* - CSS classes: `.astryx-button` via {@link classPrefix} / {@link stableClassName}.
* - data attributes: `data-astryx-*` via {@link dataAttrNamespace} / {@link dataAttr}.
* - CSS custom properties: `--astryx-*` via {@link cssVarNamespace} / {@link cssVar}.
* - CSS layers: `astryx-base` / `astryx-theme`.
*
* SYNC: packages/core/src/utils/themeProps.ts (consumes classPrefix)
* SYNC: packages/core/src/utils/parseStyleKey.ts
* SYNC: packages/cli/src/commands/build-theme.mjs (imports @astryxdesign/core/naming)
*/
/**
* The DOM/CSS namespace prefix for all externally-observable surfaces
* (classes, theme/media data attributes, CSS custom properties).
*/
var NAMESPACE = "astryx";
/**
* Class-name prefix for stable component classes, WITHOUT the trailing dash.
*
* Use {@link stableClassName} to build a full class token rather than
* concatenating this directly.
*/
var classPrefix = NAMESPACE;
/**
* data-attribute namespace segment (the part between `data-` and the rest).
* e.g. `dataAttrNamespace` = 'astryx' -> `data-astryx-theme`.
*/
var dataAttrNamespace = NAMESPACE;
/**
* CSS custom-property namespace segment.
* e.g. `--astryx-card-padding`.
*/
var cssVarNamespace = NAMESPACE;
/**
* Build a stable component class token, e.g. `stableClassName('button')`
* -> `'astryx-button'`.
*/
function stableClassName(component) {
	return `${classPrefix}-${component}`;
}
/**
* Build a `data-*` attribute name in the current namespace, e.g.
* `dataAttr('theme')` -> `'data-astryx-theme'`.
*/
function dataAttr(name) {
	return `data-${dataAttrNamespace}-${name}`;
}
/**
* Build a CSS custom-property name in the current namespace, e.g.
* `cssVar('card-padding')` -> `'--astryx-card-padding'`.
*/
function cssVar(name) {
	return `--${cssVarNamespace}-${name}`;
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/utils/themeProps.js
function themeDataAttributeName(prop) {
	return `data-${prop.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()}`;
}
/**
* Build the stable Astryx target class name for a component.
*
* Visual props and runtime states are reflected only as explicit `data-*`
* attributes. The `astryx-` prefix comes from the centralized naming module
* (`packages/core/src/naming.ts`) so the namespace lives in one place.
*
* <!-- SYNC: packages/core/src/naming.ts (namespace prefix source of truth) -->
* <!-- SYNC: packages/core/src/utils/parseStyleKey.ts -->
*
* @param component - Component name in lowercase (e.g. 'button', 'card')
* @returns Stable target class
*/
function buildClassName(component) {
	return stableClassName(component);
}
/**
* Reflect Astryx visual props as `data-*` attributes.
*
* Keys are kebab-cased (`listStyle` → `data-list-style`) and values are the
* literal prop values, including numeric values (`level: 1` → `data-level="1"`).
* Nullish values are omitted.
*/
function themeDataAttributes(props) {
	const attrs = {};
	if (props) for (const [prop, value] of Object.entries(props)) {
		if (value == null) continue;
		attrs[themeDataAttributeName(prop)] = String(value);
	}
	return attrs;
}
/**
* Build the props object components should spread onto the same element that
* receives the stable Astryx class name.
*
* This emits one stable Astryx target plus canonical data-attribute reflection
* for visual props and runtime states. For example:
*
* ```ts
* themeProps('button', { variant: 'primary', size: 'sm' })
* // → { className: 'astryx-button', data-variant: 'primary', data-size: 'sm' }
* ```
*/
function themeProps(component, props) {
	return {
		className: buildClassName(component),
		...themeDataAttributes(props)
	};
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/utils/parseStyleKey.js
/** Escape a value for a double-quoted CSS attribute selector string. */
function escapeAttributeValue(value) {
	let escaped = "";
	for (const char of value) {
		const codePoint = char.codePointAt(0) ?? 0;
		if (char === "\"" || char === "\\" || codePoint < 32 || codePoint === 127) escaped += `\\${(codePoint === 0 ? 65533 : codePoint).toString(16)} `;
		else escaped += char;
	}
	return escaped;
}
/**
* Parse a component style key into a CSS data-attribute selector suffix.
*
* Used by the shared theme compiler so semantic authoring keys match the
* attributes emitted by `themeProps()`:
*
* - `prop:value` selects `[data-prop="value"]`.
* - A bare state selects `[data-state="state"]`.
* - `+` combines selectors on the same stable `astryx-*` target.
*
* Keeping the axis name in the selector prevents collisions between equal
* values on different props, such as Grid's `align="center"` and
* `justify="center"`.
*
* <!-- SYNC: packages/core/src/utils/themeProps.ts -->
*
* @example
* ```ts
* parseStyleKey('base')                        // ''
* parseStyleKey('checked')                     // '[data-checked="checked"]'
* parseStyleKey('checked+disabled')            // '[data-checked="checked"][data-disabled="disabled"]'
* parseStyleKey('variant:secondary')           // '[data-variant="secondary"]'
* parseStyleKey('level:1')                     // '[data-level="1"]'
* parseStyleKey('variant:destructive+size:sm') // '[data-variant="destructive"][data-size="sm"]'
* ```
*/
function parseStyleKey(key) {
	if (key === "base") return "";
	return key.split("+").map((part) => {
		const separator = part.indexOf(":");
		const prop = separator === -1 ? part : part.slice(0, separator);
		const value = separator === -1 ? part : part.slice(separator + 1);
		return `[${themeDataAttributeName(prop)}="${escapeAttributeValue(value)}"]`;
	}).join("");
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/theme/derivedVarRegistry.js
/**
* @file Derived variable registry — maps CSS properties to internal vars.
*
* Used by generateThemeRules to expand standard CSS properties (borderRadius,
* padding) into internal CSS custom properties that components read.
*
* This is a compiled registry — the source of truth lives in each component's
* doc file (theming.derived). The consistency test in derivedVarRegistry.test.ts
* verifies this file stays in sync with the docs.
*
* When adding a new component with derived vars:
* 1. Add the `derived` field to the component's doc.mjs file
* 2. Add the corresponding entry here
* 3. The consistency test will catch any drift
*
* @position Core theme infrastructure — read by generateThemeRules at runtime
*/
/**
* Component → derived var mappings.
*
* Keys are lowercase component names (matching defineTheme component keys).
* Values are ordered arrays — earlier entries emit first when multiple
* entries share the same property.
*/
var derivedVarRegistry = {
	avatar: [{
		property: "borderRadius",
		vars: ["--_avatar-radius"]
	}],
	banner: [{
		property: "borderRadius",
		vars: ["--_banner-radius"]
	}],
	"bottom-sheet": [{
		property: "padding",
		expand: "container"
	}],
	button: [{
		property: "borderRadius",
		vars: ["--_button-radius"]
	}],
	card: [{
		property: "borderRadius",
		vars: ["--_card-radius"]
	}, {
		property: "padding",
		expand: "container"
	}],
	chat: [{
		property: "borderRadius",
		vars: ["--_chat-composer-radius"]
	}, {
		property: "padding",
		vars: ["--_chat-composer-padding"]
	}],
	dialog: [{
		property: "borderRadius",
		vars: ["--_dialog-radius"]
	}, {
		property: "padding",
		expand: "container"
	}],
	drawer: [{
		property: "padding",
		expand: "container"
	}],
	"context-menu": [{
		property: "borderRadius",
		vars: ["--_dropdown-menu-radius"]
	}, {
		property: "padding",
		vars: ["--_dropdown-menu-padding"]
	}],
	"dropdown-menu": [{
		property: "borderRadius",
		vars: ["--_dropdown-menu-radius"]
	}, {
		property: "padding",
		vars: ["--_dropdown-menu-padding"]
	}],
	field: [{
		property: "borderRadius",
		vars: ["--_field-radius"]
	}],
	"hover-card": [{
		property: "borderRadius",
		vars: ["--_hovercard-radius"]
	}],
	item: [{
		property: "paddingInline",
		vars: ["--_item-inset-inline"]
	}],
	"number-input": [{
		property: "padding",
		expand: "container"
	}, {
		property: "borderRadius",
		vars: ["--_field-radius"]
	}],
	popover: [{
		property: "borderRadius",
		vars: ["--_popover-radius"]
	}],
	"progress-bar-mark": [{
		property: "width",
		vars: ["--_progressbar-mark-width"],
		replaces: true
	}, {
		property: "height",
		vars: ["--_progressbar-mark-height"],
		replaces: true
	}],
	section: [{
		property: "padding",
		expand: "container"
	}],
	"segmented-control": [{
		property: "borderRadius",
		vars: ["--_segmented-control-radius"]
	}, {
		property: "padding",
		vars: ["--_segmented-control-padding"]
	}],
	"text-area": [{
		property: "paddingInline",
		vars: ["--_textarea-inline-padding"],
		replaces: true
	}]
};
function getDerivedVars(component, property) {
	const entries = derivedVarRegistry[component];
	if (!entries) return [];
	return entries.filter((e) => e.property === property);
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/theme/declarationBoundary.js
/**
* @file Declaration boundary scanner
*
* Decides whether a consumer-supplied property name and value can be emitted
* as exactly one CSS declaration, `name: value;`, without the value ending
* the declaration early or swallowing what follows it. Theme definitions are
* code, but apps assemble them from stored input (brand colors,
* white-labeling), so the generated stylesheet must never extend beyond the
* declarations it means to emit.
*
* The scanner follows the CSS Syntax Module Level 3 tokenizer for everything
* that decides where a declaration ends: strings with backslash escapes and
* line continuations, comments, `url()` with an unquoted body, escaped code
* points outside strings, and `()`, `[]`, `{}` block nesting. Inside any of
* those a `;` or a brace is inert, exactly as a browser reads it, so a `data:`
* URI, `Gill\ Sans`, or a closed comment passes through byte-identically.
* Only what a browser would read as the end of the declaration or rule is
* rejected: an unnested `;`, `{` or `}`, an unbalanced closer, and anything
* left open at the end of the value (a string, comment, block, or url whose
* closer would then be the generator's own `;` or `}`). A `bad-string` or
* `bad-url` token is rejected as well: the browser would discard the
* declaration anyway, and a diagnostic beats a silent no-op.
*
* @input A property name or a declaration value as authored in a theme
* @output `null` when it can be emitted, otherwise the reason it cannot
* @position packages/core/src/theme/declarationBoundary.ts
*/
/** Newline per CSS Syntax §4.2 (after preprocessing, CR and FF are newlines). */
function isNewline(ch) {
	return ch === "\n" || ch === "\r" || ch === "\f";
}
function isWhitespace(ch) {
	return ch === " " || ch === "	" || isNewline(ch);
}
function isHexDigit(ch) {
	return /^[0-9a-fA-F]$/.test(ch);
}
/** Name-start code point: letter, underscore, or any non-ASCII code point. */
function isNameStart(ch) {
	return /^[A-Za-z_]$/.test(ch) || ch.charCodeAt(0) >= 128;
}
function isNameChar(ch) {
	return isNameStart(ch) || /^[0-9-]$/.test(ch);
}
/** CSS Syntax §3.3 preprocessing, for scanning only; emitted bytes stay intact. */
function preprocess(input) {
	return input.replace(/\r\n?|\f/g, "\n").replace(/\0/g, "�");
}
/** Non-printable code points make an unquoted url() a bad-url token. */
var NON_PRINTABLE = /[\x01-\x08\x0b\x0e-\x1f\x7f]/;
/** "Check if two code points are a valid escape" (§4.3.8). */
function isValidEscape(input, pos) {
	return input[pos] === "\\" && pos + 1 < input.length && !isNewline(input[pos + 1]);
}
/** "Check if three code points would start an ident sequence" (§4.3.9). */
function startsIdent(input, pos) {
	const ch = input[pos];
	if (ch === "-") {
		const next = input[pos + 1];
		return next !== void 0 && (next === "-" || isNameStart(next) || isValidEscape(input, pos + 1));
	}
	if (ch === "\\") return isValidEscape(input, pos);
	return ch !== void 0 && isNameStart(ch);
}
/**
* "Consume an escaped code point" (§4.3.7), positioned after the backslash.
* Returns the position after the escape. A hex escape takes up to six hex
* digits plus one optional whitespace; anything else takes one code point.
*/
function consumeEscape(input, pos) {
	if (isHexDigit(input[pos])) {
		let end = pos;
		while (end < input.length && end - pos < 6 && isHexDigit(input[end])) end++;
		if (end < input.length && isWhitespace(input[end])) end++;
		return end;
	}
	return pos + ((input.codePointAt(pos) ?? 0) > 65535 ? 2 : 1);
}
/**
* "Consume an ident sequence" (§4.3.11) starting at `pos`. Returns the
* position after it and the decoded name (escapes resolved, for the
* case-insensitive `url` check; hex escapes decode to their code point).
*/
function consumeIdent(input, pos) {
	let name = "";
	let i = pos;
	while (i < input.length) {
		const ch = input[i];
		if (isNameChar(ch)) {
			name += ch;
			i++;
		} else if (isValidEscape(input, i)) {
			const end = consumeEscape(input, i + 1);
			if (isHexDigit(input[i + 1])) {
				const hex = input.slice(i + 1, end).trim();
				const code = parseInt(hex, 16);
				name += code === 0 || code > 1114111 || code >= 55296 && code <= 57343 ? "�" : String.fromCodePoint(code);
			} else name += input.slice(i + 1, end);
			i = end;
		} else break;
	}
	return {
		end: i,
		name
	};
}
/**
* "Consume a string token" (§4.3.5), positioned at the opening quote.
* Returns the position after the closing quote, or a rejection reason.
*/
function consumeString(input, pos) {
	const quote = input[pos];
	let i = pos + 1;
	while (i < input.length) {
		const ch = input[i];
		if (ch === quote) return { end: i + 1 };
		if (isNewline(ch)) return { reason: "a newline inside a quoted string makes a bad string" };
		if (ch === "\\") {
			if (i + 1 >= input.length) break;
			i = isNewline(input[i + 1]) ? i + 2 : consumeEscape(input, i + 1);
			continue;
		}
		i++;
	}
	return { reason: `an unclosed ${quote} string would swallow the rest of the rule` };
}
/**
* "Consume a url token" (§4.3.6), positioned after `url(` and any leading
* whitespace, with a non-quote next code point. Returns the position after
* the closing `)`, or a rejection reason (bad-url or unclosed).
*/
function consumeUrl(input, pos) {
	let i = pos;
	while (i < input.length) {
		const ch = input[i];
		if (ch === ")") return { end: i + 1 };
		if (isWhitespace(ch)) {
			while (i < input.length && isWhitespace(input[i])) i++;
			if (i >= input.length) break;
			if (input[i] === ")") return { end: i + 1 };
			return { reason: "whitespace inside an unquoted url() makes a bad url" };
		}
		if (NON_PRINTABLE.test(ch)) return { reason: "a non-printable character inside url() makes a bad url" };
		if (ch === "\"" || ch === "'" || ch === "(") return { reason: `"${ch}" inside an unquoted url() makes a bad url; quote the URL instead` };
		if (ch === "\\") {
			if (!isValidEscape(input, i)) return { reason: "a stray backslash inside url() makes a bad url" };
			i = consumeEscape(input, i + 1);
			continue;
		}
		i++;
	}
	return { reason: "an unclosed url( would swallow the rest of the rule" };
}
var CLOSER = {
	"(": ")",
	"[": "]",
	"{": "}"
};
/**
* Why `value` cannot be emitted as the value of one declaration, or `null`
* when it can. Valid CSS a browser keeps inside one declaration always
* returns `null`; see the file header for the exact rules.
*/
function checkDeclarationValue(input) {
	const value = preprocess(input);
	const open = [];
	let i = 0;
	while (i < value.length) {
		const ch = value[i];
		if (ch === "/" && value[i + 1] === "*") {
			const close = value.indexOf("*/", i + 2);
			if (close === -1) return "an unclosed /* comment would swallow the rest of the rule";
			i = close + 2;
			continue;
		}
		if (ch === "\"" || ch === "'") {
			const result = consumeString(value, i);
			if ("reason" in result) return result.reason;
			i = result.end;
			continue;
		}
		if (startsIdent(value, i)) {
			const ident = consumeIdent(value, i);
			i = ident.end;
			if (value[i] === "(" && ident.name.toLowerCase() === "url") {
				let j = i + 1;
				while (j < value.length && isWhitespace(value[j])) j++;
				if (value[j] === "\"" || value[j] === "'") {
					open.push(")");
					i = i + 1;
					continue;
				}
				const result = consumeUrl(value, j);
				if ("reason" in result) return result.reason;
				i = result.end;
			}
			continue;
		}
		if (ch === "\\") {
			if (i + 1 >= value.length) return "a trailing backslash would escape the declaration terminator";
			i = isNewline(value[i + 1]) ? i + 1 : consumeEscape(value, i + 1);
			continue;
		}
		if (ch === "(" || ch === "[" || ch === "{") {
			if (ch === "{" && open.length === 0) return "an unquoted \"{\" would open a nested block";
			open.push(CLOSER[ch]);
			i++;
			continue;
		}
		if (ch === ")" || ch === "]" || ch === "}") {
			if (open.length === 0) return ch === "}" ? "an unquoted \"}\" would close the rule" : `an unbalanced "${ch}" has nothing to close`;
			const expected = open.pop();
			if (expected !== ch) return `"${ch}" does not close the open "${expected === ")" ? "(" : expected === "]" ? "[" : "{"}"`;
			i++;
			continue;
		}
		if (ch === ";" && open.length === 0) return "an unquoted \";\" would end the declaration";
		i++;
	}
	if (open.length > 0) {
		const closer = open[open.length - 1];
		return `an unclosed "${closer === ")" ? "(" : closer === "]" ? "[" : "{"}" would swallow the rest of the rule`;
	}
	return null;
}
/**
* Why `name` cannot be emitted as a declaration's property name, or `null`
* when it can. A property name is one CSS ident sequence: a standard
* property (`color`), a vendor-prefixed one (`-webkit-line-clamp`), or a
* custom property (`--brand-accent`, `--_internal`). Escapes are allowed
* because an ident allows them. Whether the name means anything to the
* browser is not this check's concern; only that it cannot end the
* declaration or leak a second one.
*/
function checkDeclarationName(input) {
	const name = preprocess(input);
	if (name.length === 0 || !startsIdent(name, 0)) return "a property name must be a CSS identifier";
	const { end } = consumeIdent(name, 0);
	if (end !== name.length) return `a property name must be one CSS identifier; "${name[end]}" cannot appear in one`;
	return null;
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/theme/generateThemeRules.js
/**
* @file Theme CSS generation utilities
*
* Shared logic for generating CSS rules from a resolved theme definition,
* including one component-leaf lowering path for root, adaptation, and
* media-surface values plus condition-correct Heading weight precedence guards.
* Built adaptation metadata resolves against the same root component defaults
* as defineTheme, so scale-only rules do not reset authored component styles.
* Used by both the runtime path (Theme injects <style>) and the build
* path (`astryx theme build` pre-compiles to CSS files).
*
* Every consumer-supplied declaration is checked by declarationBoundary.ts
* before it is emitted, so a value can never end its declaration or rule
* early. A refused declaration is dropped and reported in the supplied
* warnings array (build receipts), or through `console.warn` (runtime).
*
* Extracted from defineTheme.ts to reduce cyclomatic complexity and provide
* a clear single-responsibility module for CSS generation.
*
* @input DefinedTheme (resolved theme object from defineTheme), optional warnings array
* @output CSS rule strings, split by layer (component vs prose), and warning text
*   for each dropped declaration
* @position packages/core/src/theme/generateThemeRules.ts
*/
/**
* Theme @scope selectors.
*
* Theme CSS is @scope'd to the theme-name data attribute that Theme writes
* (`data-astryx-theme`).
*
* @example themeScopeStart('mytheme')
*   -> '[data-astryx-theme="mytheme"]'
*/
function themeScopeStart(name) {
	return `[data-${dataAttrNamespace}-theme="${name}"]`;
}
/** Scope limit matching the theme attribute (nested-theme boundary). */
var THEME_SCOPE_TO = `[data-${dataAttrNamespace}-theme]`;
/** Media-surface selector, e.g. for [data-astryx-media="dark"]. */
function mediaSelector(surface) {
	return `[data-${dataAttrNamespace}-media="${surface}"]`;
}
/** Component base-class selector, e.g. '.astryx-button'. */
function componentClassSelector(component, suffix) {
	return `.${classPrefix}-${component}${suffix}`;
}
/** Scope a component selector to an inverted media surface when requested. */
function componentSelector(component, suffix, surface) {
	const selector = componentClassSelector(component, suffix);
	return surface ? `:is(${mediaSelector(surface)}) :is(${selector})` : selector;
}
/**
* Guard appended to a themed `:hover` rule so it cannot match a disabled
* element.
*
* A theme authoring `':hover': {backgroundColor: …}` is describing the
* enabled control; `:hover` on its own would paint that background on a
* disabled one too, because browsers suppress a disabled control's events,
* not its hover styling. `:where()` contributes no specificity, so a themed
* hover rule still weighs exactly what it weighed before.
*
* Mirrors the `@astryx/no-hover-on-disabled` lint rule, which enforces the
* same guard on the components' own StyleX styles.
*/
var HOVER_DISABLED_GUARD = ":where(:not(:disabled,[aria-disabled=\"true\"]))";
/**
* Append a pseudo-class to every selector in a comma-separated selector list.
*
* Selector helpers may emit comma-separated lists. CSS does not distribute a
* trailing pseudo over selector lists, so `${list}:hover` would only target the
* final selector. Rewrite each item so the pseudo applies to all of them.
*
* A `:hover` pseudo also picks up the disabled guard. A pseudo-ELEMENT has to
* end the selector, so the guard is spliced in before it.
*/
function appendPseudoToSelectorList(selector, pseudo) {
	const parts = [];
	let depth = 0;
	let start = 0;
	for (let i = 0; i < selector.length; i++) {
		const char = selector[i];
		if (char === "(") depth++;
		else if (char === ")") depth = Math.max(0, depth - 1);
		else if (char === "," && depth === 0) {
			parts.push(selector.slice(start, i).trim());
			start = i + 1;
		}
	}
	parts.push(selector.slice(start).trim());
	const guarded = guardHoverPseudo(pseudo);
	return parts.map((part) => `${part}${guarded}`).join(", ");
}
/** Insert the disabled guard into a `:hover` pseudo, keeping any pseudo-element last. */
function guardHoverPseudo(pseudo) {
	if (!/^:hover(?![-\w])/.test(pseudo) || pseudo.includes("[aria-disabled")) return pseudo;
	const pseudoElement = pseudo.indexOf("::");
	return pseudoElement === -1 ? pseudo + HOVER_DISABLED_GUARD : pseudo.slice(0, pseudoElement) + HOVER_DISABLED_GUARD + pseudo.slice(pseudoElement);
}
/**
* Structured output from generateThemeRulesSplit.
* Separates prose element defaults from component/token overrides
* so callers can place them in different CSS layers.
*/
/**
* Output from generateThemeCSS — two CSS blocks for different layers.
*/
/** Convert camelCase CSS property to kebab-case */
function toKebabCase(str) {
	return str.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
}
/** Padding properties that trigger container token mapping */
var PADDING_PROPS = /* @__PURE__ */ new Set([
	"padding",
	"paddingBlock",
	"paddingInline",
	"paddingBlockStart",
	"paddingBlockEnd",
	"paddingInlineStart",
	"paddingInlineEnd"
]);
/**
* Physical block-axis longhands, and the logical longhand each one *is* in
* every horizontal writing mode. Normalizing them costs no direction
* assumption, which is why they can join the container expansion.
*
* `paddingLeft`/`paddingRight` are deliberately absent. They are
* direction-relative — left is inline-start in LTR and inline-end in RTL — and
* the expansion's tokens are consumed by logical properties, so mapping them
* would put the padding on the opposite edge in RTL. They keep their physical
* meaning and land on the element as `padding-left`/`padding-right`; the cost
* is that a component's internals cannot see them.
*/
var PHYSICAL_BLOCK_PADDING_PROPS = {
	paddingTop: "paddingBlockStart",
	paddingBottom: "paddingBlockEnd"
};
/**
* Every padding spelling the container expansion consumes. Kept separate from
* PADDING_PROPS, which also routes longhands to `vars`-style derived entries —
* those carry one value for the whole box, so a single physical edge must not
* reach them.
*/
var CONTAINER_PADDING_PROPS = /* @__PURE__ */ new Set([...PADDING_PROPS, ...Object.keys(PHYSICAL_BLOCK_PADDING_PROPS)]);
/**
* Parse CSS padding shorthand/longhand into block/inline values.
* Supports 1-3 value shorthands, logical properties, and the physical block
* longhands normalized by PHYSICAL_BLOCK_PADDING_PROPS.
*/
function parsePadding(props) {
	const result = {};
	for (const [rawProp, value] of props) switch (PHYSICAL_BLOCK_PADDING_PROPS[rawProp] ?? rawProp) {
		case "padding": {
			const parts = value.trim().split(/\s+/);
			if (parts.length === 1) {
				result.blockStart = parts[0];
				result.blockEnd = parts[0];
				result.inline = parts[0];
			} else if (parts.length === 2) {
				result.blockStart = parts[0];
				result.blockEnd = parts[0];
				result.inline = parts[1];
			} else if (parts.length >= 3) {
				result.blockStart = parts[0];
				result.inline = parts[1];
				result.blockEnd = parts[2];
			}
			break;
		}
		case "paddingBlock": {
			const parts = value.trim().split(/\s+/);
			result.blockStart = parts[0];
			result.blockEnd = parts[1] ?? parts[0];
			break;
		}
		case "paddingInline": {
			const parts = value.trim().split(/\s+/);
			if (parts.length === 1) result.inline = parts[0];
			else {
				result.inlineStart = parts[0];
				result.inlineEnd = parts[1];
			}
			break;
		}
		case "paddingBlockStart":
			result.blockStart = value;
			break;
		case "paddingBlockEnd":
			result.blockEnd = value;
			break;
		case "paddingInlineStart":
			result.inlineStart = value;
			break;
		case "paddingInlineEnd": result.inlineEnd = value;
	}
	return result;
}
/**
* Expand parsed padding into component-scoped public tokens.
*
* Emits the rebranded --astryx-<component>-padding tokens (shorthand +
* directional overrides), e.g.:
*   --astryx-card-padding: 20px
*   --astryx-card-padding-inline: 20px
*   --astryx-card-padding-block-start: 20px
*   --astryx-card-padding-block-end: 20px
*
* The component reads these with an inverted fallback chain
* (var(--astryx-*, default)). The container.stylex.ts default styles read
* these via var() fallbacks,
* so the theme CSS sets the value and the component picks it up through
* CSS custom property cascade — no layer competition with StyleX output.
*/
function expandContainerPadding(component, parsed, resetInheritedSpecificity = false) {
	const prefix = cssVar(`${component}-padding`);
	const tokens = [];
	const effectiveInlineStart = parsed.inlineStart ?? parsed.inline;
	const effectiveInlineEnd = parsed.inlineEnd ?? parsed.inline;
	if (effectiveInlineStart != null && effectiveInlineEnd != null && effectiveInlineStart === effectiveInlineEnd && parsed.blockStart != null && parsed.blockEnd != null && effectiveInlineStart === parsed.blockStart && parsed.blockStart === parsed.blockEnd) tokens.push([prefix, effectiveInlineStart ?? ""]);
	else {
		if (parsed.inlineStart != null || parsed.inlineEnd != null) {
			if (effectiveInlineStart != null) tokens.push([`${prefix}-inline-start`, effectiveInlineStart]);
			if (effectiveInlineEnd != null) tokens.push([`${prefix}-inline-end`, effectiveInlineEnd]);
		} else if (parsed.inline != null) tokens.push([`${prefix}-inline`, parsed.inline]);
		if (parsed.blockStart != null) tokens.push([`${prefix}-block-start`, parsed.blockStart]);
		if (parsed.blockEnd != null) tokens.push([`${prefix}-block-end`, parsed.blockEnd]);
	}
	if (resetInheritedSpecificity) {
		const emitted = new Set(tokens.map(([name]) => name));
		const moreSpecific = emitted.has(prefix) ? [
			`${prefix}-inline`,
			`${prefix}-inline-start`,
			`${prefix}-inline-end`,
			`${prefix}-block-start`,
			`${prefix}-block-end`
		] : emitted.has(`${prefix}-inline`) ? [`${prefix}-inline-start`, `${prefix}-inline-end`] : [];
		for (const name of moreSpecific) if (!emitted.has(name)) tokens.push([name, "initial"]);
	}
	return tokens;
}
var warnToConsole = (message) => {
	console.warn(`[astryx theme] ${message}`);
};
/** Build receipts collect warning text; runtime callers warn by default. */
function diagnosticSink(warnings) {
	return warnings ? (message) => warnings.push(message) : warnToConsole;
}
/** Shorten an authored value for a one-line message. */
function previewValue(value) {
	const oneLine = JSON.stringify(value);
	return oneLine.length > 80 ? `${oneLine.slice(0, 77)}..."` : oneLine;
}
function reportDrop(sink, property, value, location, reason) {
	sink(`dropped "${property}" in ${location}: ${reason} (value: ${previewValue(value)})`);
}
/**
* True when `name: value;` stays exactly one declaration; otherwise reports
* the drop and returns false. Both checks follow CSS syntax, so valid CSS a
* browser keeps inside one declaration (a `data:` URI, `Gill\ Sans`, a closed
* comment, a vendor-prefixed property) is never refused; see
* declarationBoundary.ts for the rules.
*/
function acceptDeclaration(property, value, location, sink) {
	const reason = checkDeclarationName(property) ?? checkDeclarationValue(value);
	if (reason === null) return true;
	reportDrop(sink, property, value, location, reason);
	return false;
}
/**
* Assemble `prop: value;` lines, dropping (and reporting) any entry whose
* property or value could not stay a single declaration. Theme definitions
* are code, but apps do assemble them from stored input (brand colors,
* white-labeling), so the generated stylesheet must never extend beyond the
* declarations it means to emit.
*/
function joinDeclarations(entries, location, sink, mapProp = (p) => p) {
	const lines = [];
	for (const [rawProp, rawValue] of entries) {
		const value = `${rawValue}`;
		const prop = mapProp(rawProp);
		if (acceptDeclaration(prop, value, location, sink)) lines.push(`    ${prop}: ${value};`);
	}
	return lines.join("\n");
}
/** The `:scope` token block for portable and theme-local token values. */
function tokenBlock(source, location, sink) {
	const declarations = [joinDeclarations(Object.entries(source.tokens), `${location}tokens`, sink), joinDeclarations(Object.entries(source.localTokens ?? {}), `${location}localTokens`, sink)].filter((block) => block.length > 0).join("\n");
	return Object.keys(source.tokens).length > 0 || Object.keys(source.localTokens ?? {}).length > 0 ? `  :scope {\n${declarations}\n  }` : null;
}
/** `components.button["variant:secondary"]`-style location for a rule. */
function componentLocation(prefix, component, key) {
	return `${prefix}components.${component}[${JSON.stringify(key)}]`;
}
/**
* Generate the intermediary CSS rules for a theme.
*
* Returns an array of CSS rule strings — the shared format used by both
* the runtime path (useInsertionEffect) and the build path (astryx theme build).
*/
/**
* The parts of a theme that turn into CSS rules.
*
* Narrower than `DefinedTheme` on purpose: an adaptation rule is not a whole
* theme, and it calls this with only the values that rule writes. Typing the
* parameter as `DefinedTheme` would let a future field be read here and silently
* lost for every conditional rule, with no type error to catch it.
*/
function generateThemeRules(theme, warnings) {
	const parts = [];
	const sink = diagnosticSink(warnings);
	const val = (key) => `var(${key})`;
	const tokenRules = tokenBlock(theme, "", sink);
	if (tokenRules !== null) parts.push(tokenRules);
	if (theme.tokens["--font-family-body"]) parts.push(`  :scope {\n    font-family: var(--font-family-body);\n  }`);
	if (theme.components) generateComponentRules(theme.components, parts, { sink });
	generateProseRules(val, parts);
	generateColorOverrides(theme.components || {}, parts);
	generateSizeOverrides(theme.components || {}, parts);
	generateHeadingWeightOverrides(theme.components || {}, parts);
	return parts;
}
/** Named Heading/Text weight props and their theme-owned token values. */
var HEADING_WEIGHT_TOKEN_MAP = {
	normal: "var(--font-weight-normal)",
	medium: "var(--font-weight-medium)",
	semibold: "var(--font-weight-semibold)",
	bold: "var(--font-weight-bold)"
};
/**
* Re-emit Heading's explicit weight choices in the theme layer.
*
* Component and type overrides live above the StyleX base layer, so the
* component's ordinary weight class cannot win there by itself. Emitting the
* reflected weight classes after authored component rules makes the public
* `weight` prop a dependable override of a type or level default.
*/
function generateHeadingWeightOverrides(components, parts, { surface, inheritedComponents, forceAll = false, authoredOnly = false } = {}) {
	const headingRules = components.heading;
	const headingRuleMap = headingRules && typeof headingRules === "object" && !Array.isArray(headingRules) ? headingRules : void 0;
	if (!headingRuleMap && !forceAll) return;
	const inheritedHeadingRules = inheritedComponents?.heading;
	const inheritedHeadingRuleMap = inheritedHeadingRules && typeof inheritedHeadingRules === "object" ? inheritedHeadingRules : void 0;
	for (const [weightName, weightValue] of Object.entries(HEADING_WEIGHT_TOKEN_MAP)) {
		const styleKey = `weight:${weightName}`;
		const authoredWeight = headingRuleMap ? getAuthoredHeadingWeight(headingRuleMap, styleKey) : void 0;
		if (authoredOnly && authoredWeight === void 0) continue;
		const inheritedWeight = inheritedHeadingRuleMap ? getAuthoredHeadingWeight(inheritedHeadingRuleMap, styleKey) : void 0;
		const effectiveWeight = authoredWeight ?? inheritedWeight ?? weightValue;
		const selector = componentSelector("heading", parseStyleKey(styleKey), surface);
		parts.push(`  ${selector} { font-weight: ${effectiveWeight}; }`);
	}
}
/**
* The `fontWeight` a heading rule authors for `styleKey`, or undefined when
* it has none. A value that cannot stay one declaration is treated as not
* authored, so the override falls back to the inherited or token weight
* instead of interpolating it; the drop itself is reported where that same
* rule's declarations are emitted, so it is not reported twice here.
*/
function getAuthoredHeadingWeight(headingRuleMap, styleKey) {
	const rule = headingRuleMap[styleKey];
	if (rule == null || typeof rule !== "object" || Array.isArray(rule)) return;
	const fontWeight = rule.fontWeight;
	return typeof fontWeight === "string" && checkDeclarationValue(fontWeight) === null ? fontWeight : void 0;
}
/** Options shared by root, adaptation, and media-surface component lowering. */
/**
* Generate component override rules using stable `.astryx-*` target classes
* and reflected `data-*` selectors for prop/state keys. Handles derived var
* expansion and container padding mapping for every theme layer.
*/
function generateComponentRules(components, parts, { resetInheritedPaddingSpecificity = false, surface, sink = warnToConsole, location: locationPrefix = "" } = {}) {
	for (const [component, rules] of Object.entries(components)) for (const [key, styles] of Object.entries(rules)) {
		const entries = Object.entries(styles);
		if (entries.length === 0) continue;
		const baseSelector = componentSelector(component, parseStyleKey(key), surface);
		const location = componentLocation(locationPrefix, component, key);
		const props = [];
		const pseudos = [];
		for (const [prop, value] of entries) if (prop.startsWith(":") && typeof value === "object") pseudos.push([prop, value]);
		else if (acceptDeclaration(toKebabCase(prop), `${value}`, location, sink)) props.push([prop, value]);
		let finalProps = props;
		const derivedProps = [];
		let containerExpanded = false;
		const replacedProps = /* @__PURE__ */ new Set();
		for (const [prop, value] of props) {
			const derived = getDerivedVars(component, prop);
			const paddingDerived = PADDING_PROPS.has(prop) && prop !== "padding" ? getDerivedVars(component, "padding") : [];
			for (const entry of [...derived, ...paddingDerived]) {
				if (entry.expand === "container" && PADDING_PROPS.has(prop)) containerExpanded = true;
				if (entry.replaces) replacedProps.add(prop);
				if (entry.vars) for (const varName of entry.vars) derivedProps.push([varName, value]);
			}
			if (prop in PHYSICAL_BLOCK_PADDING_PROPS && getDerivedVars(component, "padding").some((e) => e.expand === "container")) containerExpanded = true;
		}
		if (containerExpanded) {
			const paddingProps = props.filter(([p]) => CONTAINER_PADDING_PROPS.has(p));
			const nonPaddingProps = props.filter(([p]) => !CONTAINER_PADDING_PROPS.has(p));
			const containerTokens = expandContainerPadding(component, parsePadding(paddingProps), resetInheritedPaddingSpecificity);
			finalProps = [...nonPaddingProps, ...containerTokens];
		}
		if (replacedProps.size > 0) finalProps = finalProps.filter(([p]) => !replacedProps.has(p));
		if (derivedProps.length > 0) finalProps = [...finalProps, ...derivedProps];
		if (finalProps.length > 0) {
			const declarations = joinDeclarations(finalProps, location, sink, toKebabCase);
			parts.push(`  ${baseSelector} {\n${declarations}\n  }`);
		}
		for (const [pseudo, pseudoStyles] of pseudos) {
			const pseudoEntries = Object.entries(pseudoStyles);
			if (pseudoEntries.length > 0) {
				const declarations = joinDeclarations(pseudoEntries, `${location}[${JSON.stringify(pseudo)}]`, sink, toKebabCase);
				parts.push(`  ${appendPseudoToSelectorList(baseSelector, pseudo)} {\n${declarations}\n  }`);
			}
		}
	}
}
/**
* Generate prose HTML element default rules (h1-h6, p, small, code, hr).
* Wrapped in :where() for zero specificity — these are defaults that
* any class-based style (StyleX, .astryx-* overrides) should beat.
* The caller places these in the reset layer (not astryx-theme) so they
* sit below all component styles in the cascade.
*/
function generateProseRules(val, parts) {
	parts.push(`  :where(h1, h2, h3, h4, h5, h6) {
    font-family: var(--font-family-heading);
    color: var(--color-text-primary);
  }`);
	for (let level = 1; level <= 6; level++) parts.push(`  :where(h${level}) {
    font-size: ${val(`--text-heading-${level}-size`)};
    font-weight: ${val(`--text-heading-${level}-weight`)};
    line-height: ${val(`--text-heading-${level}-leading`)};
  }`);
	parts.push(`  :where(p) {
    font-family: var(--font-family-body);
    font-size: ${val("--text-body-size")};
    font-weight: ${val("--text-body-weight")};
    line-height: ${val("--text-body-leading")};
    color: var(--color-text-primary);
  }`);
	parts.push(`  :where(small) {
    font-size: ${val("--text-supporting-size")};
    font-weight: ${val("--text-supporting-weight")};
    line-height: ${val("--text-supporting-leading")};
    color: var(--color-text-secondary);
  }`);
	parts.push(`  :where(code, pre) {
    font-family: var(--font-family-code);
    font-size: ${val("--text-code-size")};
    line-height: ${val("--text-code-leading")};
  }`);
	parts.push(`  :where(hr) {
    border: none;
    border-top: 1px solid var(--color-border);
  }`);
}
/**
* Generate prop-level color override rules for text/heading/link components.
* These ensure color prop classes override theme token changes.
*/
function generateColorOverrides(components, parts, surface) {
	const TEXT_COLOR_MAP = {
		primary: "var(--color-text-primary)",
		secondary: "var(--color-text-secondary)",
		disabled: "var(--color-text-disabled)",
		placeholder: "var(--color-text-secondary)",
		accent: "var(--color-text-accent)"
	};
	const touchesText = "text" in components;
	const touchesHeading = "heading" in components;
	const touchesLink = "link" in components;
	if (touchesText || touchesHeading || touchesLink) for (const [colorName, colorValue] of Object.entries(TEXT_COLOR_MAP)) {
		if (touchesText) parts.push(`  ${componentSelector("text", parseStyleKey(`color:${colorName}`), surface)} { color: ${colorValue}; }`);
		if (touchesHeading) parts.push(`  ${componentSelector("heading", parseStyleKey(`color:${colorName}`), surface)} { color: ${colorValue}; }`);
		if (touchesLink) parts.push(`  ${componentSelector("link", parseStyleKey(`color:${colorName}`), surface)} { color: ${colorValue}; }`);
	}
}
/**
* Map a Text `size` prop value to its raw font-size token.
* Mirrors `sizeStyles` in `Text/text.stylex.ts` (note `xsm` → `--font-size-xs`).
* <!-- SYNC: packages/core/src/Text/text.stylex.ts (sizeStyles) -->
*/
var TEXT_SIZE_TOKEN_MAP = {
	"4xs": "var(--font-size-4xs)",
	"3xs": "var(--font-size-3xs)",
	"2xs": "var(--font-size-2xs)",
	xsm: "var(--font-size-xs)",
	sm: "var(--font-size-sm)",
	base: "var(--font-size-base)",
	lg: "var(--font-size-lg)",
	xl: "var(--font-size-xl)",
	"2xl": "var(--font-size-2xl)",
	"3xl": "var(--font-size-3xl)",
	"4xl": "var(--font-size-4xl)"
};
/**
* Generate `size`-prop font-size overrides for the Text component.
*
* The `size` prop is documented as a font-size override that wins over the
* size implied by `type`. Its StyleX class lives in `@layer astryx-base`, but a
* theme's per-type font-size rule (`.astryx-text.<type>`) lives in the higher
* `@layer astryx-theme`, so the layer cascade let the theme silently shadow
* `size` for any `type` the theme styled. Re-emitting the size classes here —
* same layer as the type rules, same `.astryx-text.<x>` specificity, later in
* source — restores `size` as a real override.
*
* Only `font-size` is overridden; line-height and other type properties are
* intentionally preserved, matching the prop's documented contract.
*
* Gated on the theme touching `text` (which includes the auto-generated
* type-scale rules) — with no theme type rule to beat, the base-layer StyleX
* class already wins and no override is needed.
*/
function generateSizeOverrides(components, parts, surface) {
	if (!("text" in components)) return;
	for (const [sizeName, sizeValue] of Object.entries(TEXT_SIZE_TOKEN_MAP)) {
		const suffix = parseStyleKey(`size:${sizeName}`);
		parts.push(`  ${componentSelector("text", suffix, surface)} { font-size: ${sizeValue}; }`);
	}
}
/**
* Generate theme rules split into component and prose groups.
*
* Prose element rules (h1-h6, p, small, code, hr) style bare HTML elements
* as themed defaults — conceptually the same tier as the CSS reset. They
* belong in the reset layer so any class-based style wins.
*
* Component rules (tokens, stable .astryx-* targets plus data-* selectors) are
* that need to beat StyleX — they stay in astryx-theme (above StyleX layers).
*/
function generateThemeRulesSplit(theme, warnings) {
	const allRules = generateThemeRules(theme, warnings);
	const prose = [];
	const component = [];
	for (const rule of allRules) if (rule.trimStart().startsWith(":where(")) prose.push(rule);
	else component.push(rule);
	return {
		component,
		prose
	};
}
/**
* Generate CSS for on-media token and component overrides.
*
* Emitted in an unbounded @scope (no `to` limit) so the rules can reach
* [data-astryx-media] elements. Parent theme component overrides flow through
* to media contexts — only tokens change. Themes can further customize
* via onDark.components / onLight.components.
*/
function generateOnMediaCSS(theme, warnings) {
	const parts = [];
	const scopeSelector = themeScopeStart(theme.name);
	const sink = diagnosticSink(warnings);
	for (const surface of ["dark", "light"]) {
		const onMedia = surface === "dark" ? theme.__onDark : theme.__onLight;
		if (!onMedia) continue;
		const location = surface === "dark" ? "onDark." : "onLight.";
		const tokenEntries = Object.entries(onMedia.tokens);
		if (tokenEntries.length > 0) {
			const declarations = joinDeclarations(tokenEntries, `${location}tokens`, sink);
			parts.push(`  ${mediaSelector(surface)} {\n${declarations}\n  }`);
		}
		if (onMedia.components) {
			generateComponentRules(onMedia.components, parts, {
				resetInheritedPaddingSpecificity: true,
				surface,
				sink,
				location
			});
			generateColorOverrides(onMedia.components, parts, surface);
			generateSizeOverrides(onMedia.components, parts, surface);
			generateHeadingWeightOverrides(onMedia.components, parts, {
				surface,
				inheritedComponents: theme.components
			});
		}
	}
	if (parts.length === 0) return "";
	return `@scope (${scopeSelector}) to (${THEME_SCOPE_TO}) {\n${parts.join("\n\n")}\n}`;
}
/** Generate only the declarations one adaptation rule writes. */
function generateAdaptationRuleRules(rule, location, sink) {
	const parts = [];
	const tokens = tokenBlock(rule, location, sink);
	if (tokens !== null) parts.push(tokens);
	if (rule.components) {
		generateComponentRules(rule.components, parts, {
			resetInheritedPaddingSpecificity: true,
			sink,
			location
		});
		generateColorOverrides(rule.components, parts);
		generateSizeOverrides(rule.components, parts);
	}
	return parts;
}
function hasHeadingComponentRules(components) {
	const headingRules = components?.heading;
	return headingRules !== null && typeof headingRules === "object" && !Array.isArray(headingRules);
}
function generateAdaptationMediaBlock(query, parts, scopeSelector) {
	return `@media ${query} {\n  @scope (${scopeSelector}) to (${THEME_SCOPE_TO}) {\n${parts.map(indentRule).join("\n\n")}\n  }\n}`;
}
/**
* Generate CSS for a theme's ordered adaptation rules.
*
* Each authored rule stays a separate media block in declaration order. Blocks
* are never merged, reordered, or value-diffed: a later rule that deliberately
* writes a root value must remain present so it can override an earlier matching
* rule. Bare prose follows semantic variables, so token writes need no duplicate
* prose selectors here.
*/
function generateAdaptationCSS(theme, warnings) {
	const sink = diagnosticSink(warnings);
	const normalizedAdaptations = theme.__adaptations === void 0 ? void 0 : normalizeThemeAdaptations(theme.name, theme.__adaptations, void 0);
	const rules = theme.__adaptationRules ?? (normalizedAdaptations ? resolveThemeAdaptationRules(theme.name, normalizedAdaptations, theme.__axes ?? {}, theme.tokens, theme.localTokens, theme.components) : void 0);
	if (!rules || rules.length === 0) return {
		prose: "",
		component: ""
	};
	const scopeSelector = themeScopeStart(theme.name);
	const blocks = [];
	const adaptsHeading = rules.some((rule) => hasHeadingComponentRules(rule.components));
	for (const [index, rule] of rules.entries()) {
		const parts = generateAdaptationRuleRules(rule, `adaptations[${index}].`, sink);
		if (parts.length === 0) continue;
		blocks.push(generateAdaptationMediaBlock(rule.query, parts, scopeSelector));
	}
	if (adaptsHeading) {
		const rootWeightParts = [];
		generateHeadingWeightOverrides(theme.components ?? {}, rootWeightParts, { forceAll: true });
		blocks.push(`@scope (${scopeSelector}) to (${THEME_SCOPE_TO}) {\n${rootWeightParts.join("\n\n")}\n}`);
		for (const rule of rules) {
			const authoredWeightParts = [];
			generateHeadingWeightOverrides(rule.components ?? {}, authoredWeightParts, { authoredOnly: true });
			if (authoredWeightParts.length > 0) blocks.push(generateAdaptationMediaBlock(rule.query, authoredWeightParts, scopeSelector));
		}
	}
	return {
		prose: "",
		component: blocks.join("\n\n")
	};
}
/** Indent the rule start without rewriting newlines inside authored values. */
function indentRule(rule) {
	return `  ${rule}`;
}
/**
* Generate layered CSS for a theme — runtime path.
*
* Returns two CSS blocks for injection into different layers:
* - `prose`: @scope'd element defaults → inject into @layer reset
* - `component`: @scope'd token + .astryx-* overrides → inject into @layer astryx-theme
*
* This separation ensures prose defaults (what bare HTML looks like in a theme)
* sit at reset-layer priority where any class-based style wins, while component
* overrides sit above StyleX so themes can restyle components intentionally.
*
* Data-token defaults are owned by the public StyleX `dataVars` group. This
* generator emits only a theme's explicitly authored token overrides.
*/
function generateThemeCSS(theme, warnings) {
	const { component, prose } = generateThemeRulesSplit(theme, warnings);
	const scopeSelector = themeScopeStart(theme.name);
	const scopeTo = THEME_SCOPE_TO;
	let proseCss = "";
	if (prose.length > 0) proseCss = `@scope (${scopeSelector}) to (${scopeTo}) {\n${prose.join("\n\n")}\n}`;
	let componentCss = "";
	if (component.length > 0) componentCss = `@scope (${scopeSelector}) to (${scopeTo}) {\n${component.join("\n\n")}\n}`;
	const adaptationCss = generateAdaptationCSS(theme, warnings);
	if (adaptationCss.component) componentCss = componentCss ? `${componentCss}\n\n${adaptationCss.component}` : adaptationCss.component;
	const onMediaCss = generateOnMediaCSS(theme, warnings);
	if (onMediaCss) componentCss = componentCss ? `${componentCss}\n\n${onMediaCss}` : onMediaCss;
	return {
		prose: proseCss,
		component: componentCss
	};
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/hooks/useMediaQuery.js
/**
* @file useMediaQuery.ts
* @input Uses React useSyncExternalStore, useCallback
* @output Exports useMediaQuery hook for responsive breakpoint detection
* @position Core hook; used by consumers for responsive patterns
*
* SSR-safe media query hook that subscribes to window.matchMedia changes
* via useSyncExternalStore — the canonical React pattern for external
* browser state.
*
* SYNC: When modified, update:
* - /packages/core/src/hooks/index.ts
*/
/**
* SSR-safe media query hook.
* Returns whether the given media query matches.
*
* @param query - CSS media query string
* @param serverDefault - Value to return during SSR. Pass a server-side hint
*   (e.g. derived from User-Agent or client hints) to avoid a layout flash.
*
* @example
* ```
* const isMobile = useMediaQuery('(max-width: 768px)');
* const isMobile = useMediaQuery('(max-width: 768px)', defaultIsMobile);
* ```
*/
function useMediaQuery(query, serverDefault = false) {
	const subscribe = (0, import_react.useCallback)((onStoreChange) => {
		const mql = window.matchMedia(query);
		mql.addEventListener("change", onStoreChange);
		return () => mql.removeEventListener("change", onStoreChange);
	}, [query]);
	const getSnapshot = (0, import_react.useCallback)(() => {
		return window.matchMedia(query).matches;
	}, [query]);
	const getServerSnapshot = (0, import_react.useCallback)(() => serverDefault, [serverDefault]);
	return (0, import_react.useSyncExternalStore)(subscribe, getSnapshot, getServerSnapshot);
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/theme/useTheme.js
/**
* @file useTheme.ts
* @input ThemeContext provided by Theme
* @output Exports useTheme, useThemeName, and internal theme-object access
* @position Theme hook; used by data viz, canvas, and non-CSS consumers
*
* Provides synchronous access to theme token values resolved for the
* current color mode — no DOM reads on the provider path, no double render.
* Without a reachable ThemeContext it consults `<html data-theme>` and
* `<html data-astryx-theme>` (kept in sync by Theme) via shared, refcounted
* MutationObservers before assuming OS preference/default tokens. Provider-path
* consumers subscribe to no-op stores instead, so mounting under a Theme never
* creates an observer. Token resolution is shared with the server-safe helpers
* in ./tokens.ts.
*
* SYNC: When modified, update:
* - /packages/core/src/theme/index.ts
*/
/**
* Internal context value — carries the theme + mode from Theme.
* @internal
*/
/**
* React context for the nearest Theme provider.
* null when no provider is present.
* @internal
*/
var ThemeContext = /*#__PURE__*/ (0, import_react.createContext)(null);
ThemeContext.displayName = "ThemeContext";
function getRootNameAttrSnapshot() {
	if (typeof document === "undefined") return null;
	return document.documentElement.getAttribute(dataAttr("theme"));
}
function getRootNameAttrServerSnapshot() {
	return null;
}
function getNullThemeSnapshot() {
	return null;
}
var rootNameAttrListeners = /* @__PURE__ */ new Set();
var rootNameAttrObserver = null;
function notifyRootNameAttrListeners() {
	for (const listener of rootNameAttrListeners) listener();
}
function subscribeRootNameAttr(onStoreChange) {
	rootNameAttrListeners.add(onStoreChange);
	if (rootNameAttrListeners.size === 1 && typeof MutationObserver !== "undefined") {
		rootNameAttrObserver = new MutationObserver(notifyRootNameAttrListeners);
		rootNameAttrObserver.observe(document.documentElement, {
			attributes: true,
			attributeFilter: [dataAttr("theme")]
		});
	}
	return () => {
		rootNameAttrListeners.delete(onStoreChange);
		if (rootNameAttrListeners.size === 0 && rootNameAttrObserver) {
			rootNameAttrObserver.disconnect();
			rootNameAttrObserver = null;
		}
	};
}
function subscribeNoop() {
	return () => {};
}
function useRootThemeNameAttr(hasCtx) {
	return (0, import_react.useSyncExternalStore)(hasCtx ? subscribeNoop : subscribeRootNameAttr, hasCtx ? getNullThemeSnapshot : getRootNameAttrSnapshot, getRootNameAttrServerSnapshot);
}
/**
* Return the nearest active Astryx theme name.
*
* Uses ThemeContext when present and otherwise follows the root Theme's
* <html data-astryx-theme> attribute. This is intentionally lighter than
* useTheme() for consumers that only need theme identity, such as semantic
* icon resolution.
*/
function useThemeName() {
	const ctx = (0, import_react.use)(ThemeContext);
	const rootThemeName = useRootThemeNameAttr(ctx != null);
	return ctx?.theme.name ?? rootThemeName;
}
/**
* Return the nearest theme object, falling back to the registered root theme
* only when no provider context is available.
* @internal
*/
function useThemeDefinition() {
	const ctx = (0, import_react.use)(ThemeContext);
	const rootThemeName = useRootThemeNameAttr(ctx != null);
	return ctx?.theme ?? getRegisteredTheme(rootThemeName) ?? void 0;
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/theme/Theme.js
/**
* Theme Provider Component
*
* Applies theme tokens and sets color-scheme for light-dark() to work.
* Themes are created with `defineTheme()` and applied via CSS:
* - Token overrides set as CSS custom properties on [data-astryx-theme]
* - Component overrides scoped via @scope'd CSS selectors on stable Astryx
*   target classes combined with reflected `data-*` prop/state attributes
*
* Root detection: The first Theme in the tree (no parent Theme)
* automatically syncs attributes to `document.documentElement`:
* - `data-theme` — drives `color-scheme` via reset.css rules, ensuring browser
*   chrome (scrollbars, native form controls, date pickers) reflects the mode.
* - `data-astryx-theme` — enables @scope'd theme CSS to reach elements rendered
*   outside the Theme wrapper (portals, toast fallback viewports).
*
* For RSC / SSR, set `data-theme` on `<html>` in your root server layout
* to avoid a flash of wrong theme before hydration:
*
*   <html lang="en" data-theme="dark">
*
* @example
* ```
* const ocean = defineTheme({
*   name: 'ocean',
*   tokens: { '--color-accent': ['#0077B6', '#48CAE4'] },
*   components: { card: { base: { borderWidth: '2px' } } },
*   icons: oceanIcons,
* });
* <Theme theme={ocean}><App /></Theme>
* ```
*/
var import_jsx_runtime = require_jsx_runtime();
/**
* Styles for the theme wrapper
*/
var wrapperStyles = {
	base: {
		k1xSpc: "xjp7ctv",
		kMwMTN: "x1tgivj0",
		kMv6JI: "x9ynric",
		$$css: true
	},
	light: {
		kQNsl9: "x19aimcq",
		$$css: true
	},
	dark: {
		kQNsl9: "xntwwlm",
		$$css: true
	},
	system: {
		kQNsl9: "x108lcm5",
		$$css: true
	}
};
/**
* Context to detect whether this Theme is nested inside another.
* The root provider (no parent context) syncs data-theme to <html>.
* @internal
*/
var ThemeNestingContext = /*#__PURE__*/ import_react.createContext(false);
ThemeNestingContext.displayName = "ThemeNestingContext";
/** Track which themes have already been injected */
var injectedThemes = /* @__PURE__ */ new Set();
var THEME_LAYER_ORDER = "@layer reset, astryx-base, astryx-theme;";
/**
* Hook to inject theme CSS into the document.
* Built themes (from `astryx theme build`) skip injection — their CSS
* is in a separate file imported by the consumer.
*/
function useThemeStyleInjection(theme) {
	const id = (0, import_react.useId)();
	(0, import_react.useInsertionEffect)(() => {
		if (theme.__built) return;
		const themeKey = `astryx-theme-${theme.name}`;
		if (injectedThemes.has(themeKey)) return;
		`${theme.name}`, `${theme.name}${theme.name}${theme.name}${theme.name}`;
		const { prose, component } = generateThemeCSS(theme);
		injectedThemes.add(themeKey);
		const cleanups = [() => injectedThemes.delete(themeKey)];
		if (prose) {
			const proseStyle = document.createElement("style");
			proseStyle.setAttribute(dataAttr("theme-prose"), theme.name);
			proseStyle.setAttribute(dataAttr("id"), id);
			proseStyle.textContent = `${THEME_LAYER_ORDER}\n@layer reset {\n${prose}\n}`;
			document.head.appendChild(proseStyle);
		}
		if (component) {
			const compStyle = document.createElement("style");
			compStyle.setAttribute(dataAttr("theme"), theme.name);
			compStyle.setAttribute(dataAttr("id"), id);
			compStyle.textContent = `${THEME_LAYER_ORDER}\n@layer astryx-theme {\n${component}\n}`;
			document.head.appendChild(compStyle);
		}
		if (prose || component) cleanups.push(() => {
			const proseEl = document.querySelector(`style[${dataAttr("theme-prose")}="${theme.name}"][${dataAttr("id")}="${id}"]`);
			const compEl = document.querySelector(`style[${dataAttr("theme")}="${theme.name}"][${dataAttr("id")}="${id}"]`);
			proseEl?.remove();
			compEl?.remove();
		});
		return () => {
			for (const cleanup of cleanups) cleanup();
		};
	}, [theme, id]);
}
/**
* Hook to sync theme attributes to document.documentElement for the root provider.
* Skipped for nested Theme instances.
*
* Syncs two attributes:
* - `data-theme` (light/dark) — reset.css maps this to color-scheme, controlling
*   browser chrome (scrollbars, native form controls, date pickers).
* - `data-astryx-theme` (theme name) — enables @scope'd theme CSS to reach elements
*   outside the Theme wrapper (e.g. toast fallback viewports, portals).
*
* - 'light' | 'dark' → sets data-theme="light" | "dark"
* - 'system' → removes data-theme (reset.css defaults to color-scheme: light dark)
*/
function useRootThemeSync(isNested, mode, themeName) {
	useIsomorphicLayoutEffect(() => {
		if (isNested) return;
		if (typeof document === "undefined") return;
		if (mode === "light" || mode === "dark") document.documentElement.setAttribute("data-theme", mode);
		else document.documentElement.removeAttribute("data-theme");
		document.documentElement.setAttribute(dataAttr("theme"), themeName);
		return () => {
			document.documentElement.removeAttribute("data-theme");
			document.documentElement.removeAttribute(dataAttr("theme"));
		};
	}, [
		isNested,
		mode,
		themeName
	]);
}
/**
* Theme provider component
*
* Sets data-astryx-theme attribute so @scope'd CSS takes effect.
* Component overrides are pure CSS scoped under the theme attribute —
* components render with stable `.xds-*` classes plus `data-*` prop
* reflections and don't need context.
*
* When this is the root Theme (no parent Theme in the tree),
* it syncs `data-theme` and `data-astryx-theme` to `<html>` so browser
* chrome reflects the active mode and @scope'd CSS reaches portals.
* Nested Theme instances skip the sync.
*/
function Theme({ theme, mode = "system", children }) {
	const isNested = (0, import_react.use)(ThemeNestingContext);
	registerTheme(theme);
	useThemeStyleInjection(theme);
	useRootThemeSync(isNested, mode, theme.name);
	const colorSchemeStyle = mode === "dark" ? wrapperStyles.dark : mode === "light" ? wrapperStyles.light : wrapperStyles.system;
	const ctxValue = (0, import_react.useMemo)(() => ({
		theme,
		mode
	}), [theme, mode]);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ThemeContext, {
		value: ctxValue,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ThemeNestingContext, {
			value: true,
			children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
				...props(wrapperStyles.base, colorSchemeStyle),
				"data-astryx-theme": theme.name,
				"data-theme": mode === "system" ? void 0 : mode,
				children
			})
		})
	});
}
Theme.displayName = "Theme";
//#endregion
//#region node_modules/@astryxdesign/core/dist/Text/text.stylex.js
var colorStyles$2 = {
	primary: {
		kMwMTN: "x1tgivj0",
		$$css: true
	},
	secondary: {
		kMwMTN: "xv1l7n4",
		$$css: true
	},
	disabled: {
		kMwMTN: "xnbbluu",
		$$css: true
	},
	placeholder: {
		kMwMTN: "xv1l7n4",
		$$css: true
	},
	accent: {
		kMwMTN: "xjse4m1",
		$$css: true
	},
	inherit: {
		kMwMTN: "x1heor9g",
		$$css: true
	}
};
var weightStyles = {
	normal: {
		k63SB2: "x1sodnla",
		$$css: true
	},
	medium: {
		k63SB2: "x1e4wzip",
		$$css: true
	},
	semibold: {
		k63SB2: "x2mo6ok",
		$$css: true
	},
	bold: {
		k63SB2: "x1lvx875",
		$$css: true
	}
};
var defaultWeightByTypeStyles = {
	body: {
		k63SB2: "xxovm9e",
		$$css: true
	},
	large: {
		k63SB2: "x149oux8",
		$$css: true
	},
	label: {
		k63SB2: "xmhvcl5",
		$$css: true
	},
	code: {
		k63SB2: "xx3eeay",
		$$css: true
	},
	supporting: {
		k63SB2: "xv8on6e",
		$$css: true
	},
	"display-1": {
		k63SB2: "x1txul5o",
		$$css: true
	},
	"display-2": {
		k63SB2: "x1y36c3f",
		$$css: true
	},
	"display-3": {
		k63SB2: "x1on40hk",
		$$css: true
	},
	inherit: {
		k63SB2: "x1pd3egz",
		$$css: true
	}
};
var sizeByTypeStyles = {
	body: {
		kGuDYH: "xjm74w1",
		kLWn49: "xw6l6zx",
		$$css: true
	},
	large: {
		kGuDYH: "x18juvz8",
		kLWn49: "xf74fhv",
		$$css: true
	},
	label: {
		kGuDYH: "xcr08ib",
		kLWn49: "x1kq96og",
		$$css: true
	},
	code: {
		kGuDYH: "xp03k98",
		kLWn49: "x17iicif",
		kMv6JI: "x9m5x89",
		$$css: true
	},
	supporting: {
		kGuDYH: "x141an7d",
		kLWn49: "x1ltkj2j",
		$$css: true
	},
	"display-1": {
		kGuDYH: "xsub3ws",
		kLWn49: "x112ttwr",
		$$css: true
	},
	"display-2": {
		kGuDYH: "x1yego12",
		kLWn49: "xh0iwvy",
		$$css: true
	},
	"display-3": {
		kGuDYH: "xlgnzhf",
		kLWn49: "x1ujwuaq",
		$$css: true
	},
	inherit: {
		kGuDYH: "x1qlqyl8",
		kLWn49: "x15bjb6t",
		$$css: true
	}
};
var sizeStyles$4 = {
	"4xs": {
		kGuDYH: "xxc45ev",
		$$css: true
	},
	"3xs": {
		kGuDYH: "x10p7juq",
		$$css: true
	},
	"2xs": {
		kGuDYH: "x16a80zy",
		$$css: true
	},
	xsm: {
		kGuDYH: "x51wmvv",
		$$css: true
	},
	sm: {
		kGuDYH: "x1eqnyfr",
		$$css: true
	},
	base: {
		kGuDYH: "x1j29vfg",
		$$css: true
	},
	lg: {
		kGuDYH: "xc7cgfe",
		$$css: true
	},
	xl: {
		kGuDYH: "x1wqms48",
		$$css: true
	},
	"2xl": {
		kGuDYH: "xhs0kqb",
		$$css: true
	},
	"3xl": {
		kGuDYH: "x10srzze",
		$$css: true
	},
	"4xl": {
		kGuDYH: "xqcvi3d",
		$$css: true
	}
};
var sizeByLevelStyles = {
	"1": {
		kGuDYH: "xcg7oai",
		kLWn49: "xfmsba7",
		k63SB2: "x1v68xuy",
		$$css: true
	},
	"2": {
		kGuDYH: "x1xvnhcw",
		kLWn49: "x1cpk1wn",
		k63SB2: "x12yy4cs",
		$$css: true
	},
	"3": {
		kGuDYH: "xii13ha",
		kLWn49: "xwjzt0u",
		k63SB2: "x1jcxfy8",
		$$css: true
	},
	"4": {
		kGuDYH: "x8tkxat",
		kLWn49: "xqerer",
		k63SB2: "x2hcmsi",
		$$css: true
	},
	"5": {
		kGuDYH: "xsgqta0",
		kLWn49: "xo3gurs",
		k63SB2: "xno150v",
		$$css: true
	},
	"6": {
		kGuDYH: "xw5ohdf",
		kLWn49: "xeixjfn",
		k63SB2: "x1pw4frv",
		$$css: true
	}
};
var displayStyles = {
	inline: {
		k1xSpc: "xt0psk2",
		$$css: true
	},
	block: {
		k1xSpc: "x1lliihq",
		$$css: true
	}
};
var truncationStyles = {
	singleLine: {
		kVQacm: "xb3r6kr",
		kg5iWk: "xlyipyv",
		khDVqt: "xuxw1ft",
		k1xSpc: "x1lliihq",
		$$css: true
	},
	multiLine: {
		kVQacm: "xb3r6kr",
		k1xSpc: "x104kibb",
		kgKLqz: "x1ua5tub",
		$$css: true
	}
};
var wordBreakStyles = {
	"break-word": {
		kTgw9: "x1lldw8n",
		kHjlTd: "x1mzt3pk",
		$$css: true
	},
	"break-all": {
		kTgw9: "x1yn0g08",
		$$css: true
	}
};
var textWrapStyles = {
	wrap: {
		kN2L0X: "xk4td0m",
		$$css: true
	},
	nowrap: {
		kN2L0X: "xebhuq6",
		$$css: true
	},
	balance: {
		kN2L0X: "x1w2vvpw",
		$$css: true
	},
	pretty: {
		kN2L0X: "x1fzhlzt",
		$$css: true
	}
};
var capsizeStyles = { enabled: {
	kxwWH2: "x1b2iylo",
	kzeHkT: "xwgcxoh",
	k1xSpc: "x1lliihq",
	$$css: true
} };
var decorationStyles = { strikethrough: {
	kybGjl: "xmqliwb",
	$$css: true
} };
var tabularNumbersStyle = { enabled: {
	kcqcaj: "xss6m8b",
	$$css: true
} };
var justifyStyles = {
	start: {
		k9WMMc: "x1yc453h",
		$$css: true
	},
	center: {
		k9WMMc: "x2b8uid",
		$$css: true
	},
	end: {
		k9WMMc: "xp4054r",
		$$css: true
	}
};
var truncationTooltipStyles = { content: {
	ks0D6T: "xw5ewwj",
	kTgw9: "x13faqbe",
	$$css: true
} };
//#endregion
//#region node_modules/@astryxdesign/core/dist/utils/sharedResizeObserver.js
/**
* @file sharedResizeObserver.ts
* @input ResizeObserver API
* @output Exports observeResize / unobserveResize for shared observation
* @position Utility; consumed by useTruncation, useOverflow, and any component
*   that needs resize observation without creating per-instance observers
*
* A single ResizeObserver can observe thousands of elements. Creating one
* per component (e.g. per table cell) is wasteful — browsers batch
* observations per observer instance, so a shared observer means one
* callback dispatch per animation frame instead of N.
*
* SYNC: When modified, update:
* - /packages/core/src/utils/index.ts (exports)
* - /packages/core/src/Text/useTruncation.ts (primary consumer)
*/
var observer$1 = null;
var callbacks$1 = /* @__PURE__ */ new Map();
/**
* The shared observer, or null where the API does not exist (jsdom, an old
* browser). Callers still get the one-shot measurement `observeResize` fires
* on registration; live resize updates are the part that needs the API.
*/
function getObserver() {
	if (typeof ResizeObserver === "undefined") return null;
	if (!observer$1) observer$1 = new ResizeObserver((entries) => {
		for (const entry of entries) {
			const targetCallbacks = callbacks$1.get(entry.target);
			if (targetCallbacks) for (const cb of [...targetCallbacks.keys()]) cb(entry);
		}
	});
	return observer$1;
}
/**
* Observe an element's size via a shared ResizeObserver singleton.
*
* Fires the callback once synchronously on registration (with a
* synthetic entry) so callers don't need separate initial-measurement
* logic. Subsequent callbacks fire on actual resizes.
*
* Returns an unsubscribe function that removes only this registration, leaving
* every other observer of the same element intact — prefer it over
* `unobserveResize(element)`, which drops them all. The shared observer is
* destroyed when the last element is unobserved.
*
* @example
* ```
* const unsubscribe = observeResize(element, (entry) => {
*   console.log(entry.contentBoxSize);
* });
*
* // Cleanup:
* unsubscribe();
* ```
*/
function observeResize(element, callback) {
	const existing = callbacks$1.get(element);
	if (existing) existing.set(callback, (existing.get(callback) ?? 0) + 1);
	else callbacks$1.set(element, /* @__PURE__ */ new Map([[callback, 1]]));
	getObserver()?.observe(element);
	callback({ target: element });
	let isSubscribed = true;
	return () => {
		if (!isSubscribed) return;
		isSubscribed = false;
		unobserveResize(element, callback);
	};
}
/**
* Stop observing an element.
*
* Pass the callback to remove only that registration — the unsubscribe returned
* by `observeResize` does this for you. Omitting it removes EVERY callback on
* the element, which silences peers that are still mounted, so it is only
* correct for a caller that owns the element outright.
*
* If no elements remain, the shared observer is disconnected and released for
* garbage collection.
*/
function unobserveResize(element, callback) {
	const targetCallbacks = callbacks$1.get(element);
	if (callback != null) {
		const registrationCount = targetCallbacks?.get(callback);
		if (targetCallbacks == null || registrationCount == null) return;
		if (registrationCount > 1) {
			targetCallbacks.set(callback, registrationCount - 1);
			return;
		}
		targetCallbacks.delete(callback);
		if (targetCallbacks.size > 0) return;
	}
	callbacks$1.delete(element);
	if (observer$1) {
		observer$1.unobserve(element);
		if (callbacks$1.size === 0) {
			observer$1.disconnect();
			observer$1 = null;
		}
	}
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/utils/sharedMutationObserver.js
/**
* @file sharedMutationObserver.ts
* @input MutationObserver API
* @output Exports observeContent for shared content-change observation
* @position Internal utility; consumed by useTruncation. The content-change
*   counterpart of sharedResizeObserver: one observer for every element, so a
*   repeated cell or row path does not create one observer per instance.
*/
var OPTIONS = {
	characterData: true,
	childList: true,
	subtree: true
};
var observer = null;
var callbacks = /* @__PURE__ */ new Map();
function dispatch(records) {
	const pending = /* @__PURE__ */ new Set();
	for (const record of records) for (let node = record.target; node; node = node.parentNode) callbacks.get(node)?.forEach((callback) => pending.add(callback));
	pending.forEach((callback) => callback());
}
/**
* Call `callback` when the element's text or children change (including
* descendants). Returns an unsubscribe that removes only this registration.
*
* MutationObserver has no per-target unobserve, so a released element stays
* registered with the shared observer until no element remains; its records
* match no callback and are ignored. The observer disconnects and is released
* when the last registration goes.
*/
function observeContent(element, callback) {
	if (typeof MutationObserver === "undefined") return () => {};
	observer ??= new MutationObserver(dispatch);
	const existing = callbacks.get(element);
	if (existing) existing.add(callback);
	else {
		callbacks.set(element, /* @__PURE__ */ new Set([callback]));
		observer.observe(element, OPTIONS);
	}
	let isSubscribed = true;
	return () => {
		if (!isSubscribed) return;
		isSubscribed = false;
		const targetCallbacks = callbacks.get(element);
		targetCallbacks?.delete(callback);
		if (targetCallbacks?.size === 0) callbacks.delete(element);
		if (callbacks.size === 0 && observer) {
			observer.disconnect();
			observer = null;
		}
	};
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/Text/useTruncation.js
/**
* @file useTruncation.ts
* @input Uses React hooks, sharedResizeObserver, sharedMutationObserver
* @output Exports useTruncation hook for detecting text overflow
* @position Hook; consumed by Text.tsx, Heading.tsx
*
* SYNC: When modified, update:
* - /packages/core/src/Text/Text.doc.mjs
*/
/**
* Hook for detecting text overflow/truncation.
*
* Uses a shared ResizeObserver singleton (via observeResize) for size
* changes and a shared MutationObserver singleton (via observeContent) for
* content changes, so even hundreds of table cells create one observer of
* each kind. Observing content matters because an element whose text changes
* without resizing (a fixed-width status line) must still be re-measured for
* the tooltip text and the truncated state to follow the current content.
*
* - Single-line: compares scrollWidth > offsetWidth
* - Multi-line: uses Range.getBoundingClientRect() to measure actual content
*   height, bypassing -webkit-line-clamp's clamped scrollHeight
*
* @example
* ```
* const truncation = useTruncation({ maxLines: 2 });
*
* <div ref={truncation.ref} style={{ WebkitLineClamp: 2 }}>
*   {text}
* </div>
*
* {truncation.isTruncated && <Tooltip>{truncation.fullText}</Tooltip>}
* ```
*/
function useTruncation(options) {
	const { maxLines } = options;
	const [isTruncated, setIsTruncated] = (0, import_react.useState)(false);
	const [fullText, setFullText] = (0, import_react.useState)("");
	const elementRef = (0, import_react.useRef)(null);
	const unobserveRef = (0, import_react.useRef)(null);
	const unobserveContentRef = (0, import_react.useRef)(null);
	const checkTruncation = (0, import_react.useCallback)((element) => {
		if (maxLines === 0) {
			setIsTruncated(false);
			return;
		}
		setFullText(element.textContent ?? "");
		if (maxLines === 1) setIsTruncated(element.scrollWidth > element.offsetWidth);
		else {
			let contentHeight = element.scrollHeight;
			try {
				const range = document.createRange();
				range.selectNodeContents(element);
				contentHeight = range.getBoundingClientRect().height;
				range.detach();
			} catch {}
			setIsTruncated(contentHeight > element.offsetHeight);
		}
	}, [maxLines]);
	return {
		ref: (0, import_react.useCallback)((element) => {
			unobserveRef.current?.();
			unobserveRef.current = null;
			unobserveContentRef.current?.();
			unobserveContentRef.current = null;
			elementRef.current = element;
			if (element && maxLines > 0) {
				if (typeof ResizeObserver !== "undefined") unobserveRef.current = observeResize(element, () => {
					checkTruncation(element);
				});
				else checkTruncation(element);
				unobserveContentRef.current = observeContent(element, () => {
					checkTruncation(element);
				});
			} else {
				setIsTruncated(false);
				setFullText("");
			}
		}, [maxLines, checkTruncation]),
		isTruncated,
		fullText
	};
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/utils/characters.js
var import_react_dom = require_react_dom();
/**
* @file characters.ts
* @input Strings that may contain characters made of several code units
*        (emoji, flags, joined emoji sequences, accented letters)
* @output Exports characterCount, firstCharacter, truncateCharacters —
*         replacements for .length / .charAt(0) / .slice(0, n) that measure
*         and cut user-visible strings the way a person reads them
* @position Shared utility; consumed by Avatar, TextArea, PowerSearch, Table
*
* SYNC: When modified, update:
* - /packages/core/src/utils/characters.test.ts
* - /packages/core/src/utils/index.ts
*/
/**
* Reuse a single segmenter when the runtime supports Intl.Segmenter.
* `grapheme` is the Intl granularity name for a user-perceived character.
*/
var characterSegmenter = typeof Intl.Segmenter === "function" ? new Intl.Segmenter(void 0, { granularity: "grapheme" }) : null;
/**
* Split a string into user-perceived characters. The code-point fallback
* keeps surrogate pairs intact but may split joined emoji sequences and flag
* pairs on runtimes without Intl.Segmenter.
*/
function splitCharacters(str) {
	if (characterSegmenter) return [...characterSegmenter.segment(str)].map((s) => s.segment);
	return [...str];
}
/**
* Number of characters in a string — the count a person would give, where one
* emoji, flag, or accented letter is one character. Replacement for `.length`
* on user-visible strings, which counts internal storage units instead.
*/
function characterCount(str) {
	if (str === "") return 0;
	return splitCharacters(str).length;
}
/**
* The first character of a string, or '' when empty. Replacement for
* `.charAt(0)`, which can return half of an emoji. Reads only the first
* character, so cost does not scale with the length of the string.
*/
function firstCharacter(str) {
	if (characterSegmenter) {
		const first = characterSegmenter.segment(str)[Symbol.iterator]().next();
		return first.done ? "" : first.value.segment;
	}
	const codePoint = str.codePointAt(0);
	return codePoint == null ? "" : String.fromCodePoint(codePoint);
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/utils/mergeProps.js
/**
* Merge xds-* props, stylex.props result, and optional consumer className/style.
*
* stylex.props() returns { className, style }. This merges the Astryx stable
* class name plus any data-attribute reflection from `themeProps()` with the
* StyleX class name so both StyleX styles and the theme-targeting surface are
* applied.
*
* Consumer className is appended after StyleX classes.
* Consumer style is spread after StyleX inline styles, so these values take priority.
*
* @example
* ```tsx
* // Root element with themeProps
* <div {...mergeProps(
*   themeProps('button', { variant }),
*   stylex.props(styles.base, variants[variant]),
*   className,
*   style,
* )} />
*
* // Internal element — stylex + dynamic style only
* <div {...mergeProps(
*   stylex.props(styles.track),
*   { style: { width: dynamicWidth } },
* )} />
* ```
*/
function mergeTwoProps(base, overrides) {
	const merged = {
		...base,
		...overrides
	};
	const cls = [base.className, overrides.className].filter(Boolean).join(" ");
	if (cls) merged.className = cls;
	else delete merged.className;
	const mergedStyle = overrides.style && base.style ? {
		...base.style,
		...overrides.style
	} : overrides.style || base.style;
	if (mergedStyle) merged.style = mergedStyle;
	else delete merged.style;
	return merged;
}
function mergeProps(xdsClassOrStylexResult, stylexResultOrClassName, classNameOrStyle, style) {
	if (typeof xdsClassOrStylexResult === "string") {
		const xdsClass = xdsClassOrStylexResult;
		const stylexResult = stylexResultOrClassName ?? { className: "" };
		const className = classNameOrStyle;
		let cls = stylexResult.className ? `${xdsClass} ${stylexResult.className}` : xdsClass;
		if (className) cls = `${cls} ${className}`;
		const mergedStyle = style && stylexResult.style ? {
			...stylexResult.style,
			...style
		} : style || stylexResult.style;
		return {
			...stylexResult,
			className: cls,
			style: mergedStyle
		};
	}
	let merged = mergeTwoProps(xdsClassOrStylexResult, typeof stylexResultOrClassName === "string" ? { className: stylexResultOrClassName } : stylexResultOrClassName ?? {});
	if (typeof classNameOrStyle === "string") merged = mergeTwoProps(merged, { className: classNameOrStyle });
	else if (classNameOrStyle != null) merged = mergeTwoProps(merged, { style: classNameOrStyle });
	if (style != null) merged = mergeTwoProps(merged, { style });
	return merged;
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/utils/mergeRefs.js
/**
* @file mergeRefs.ts
* @input Multiple React refs (callback, object, or undefined)
* @output A single callback ref that forwards to all inputs
* @position Utility; used by components that need to merge an external ref
*   with an internal ref (e.g., popover trigger + consumer ref).
*/
function mergeRefs(...refs) {
	return (value) => {
		const cleanups = [];
		for (const ref of refs) if (typeof ref === "function") {
			const cleanup = ref(value);
			cleanups.push(typeof cleanup === "function" ? cleanup : () => ref(null));
		} else if (ref != null) {
			const mutableRef = ref;
			mutableRef.current = value;
			cleanups.push(() => {
				mutableRef.current = null;
			});
		}
		if (value != null && cleanups.length > 0) return () => {
			for (const cleanup of cleanups) cleanup();
		};
	};
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/utils/interactionModality.js
/**
* @file interactionModality.ts
* @input Global pointerdown/keydown events
* @output `useInteractionModalityTracking()` activates document-lifetime tracking;
*   `getInteractionModality()` reads how the user last interacted
* @position Internal document-wide singleton; used where `:focus-visible` alone
*   is too broad
*
* `:focus-visible` is the right selector for a focus ring and should stay the
* condition that draws one. It is not, on its own, "focused by keyboard":
* per CSS Selectors 4 a pointer-focused element that supports text entry
* matches it too, deliberately, so that a clicked text field still shows where
* typing will go. Measured in Chromium — a bare `<input>` clicked with a mouse
* matches `:focus-visible`.
*
* A component that wants a ring for keyboard focus ONLY therefore needs one bit
* `:focus-visible` cannot give it: which device moved focus. This records that,
* to be used as a gate ALONGSIDE `:focus-visible`, never as a replacement for
* it — the browser's heuristic still decides everything else, including
* `focus({focusVisible: true})`.
*
* The store lives on `document`, so duplicate Astryx bundles share one state
* value and one listener pair. The first mounted consumer activates tracking;
* the listeners then remain for the document lifetime so input during a gap
* between consumers is not lost. Importing this module has no DOM side effects,
* and server rendering keeps the keyboard-safe default.
*/
var interactionModalityStoreKey = Symbol.for("@astryxdesign/core/interaction-modality/v1");
function getStore(targetDocument) {
	const singletonDocument = targetDocument;
	const existingStore = singletonDocument[interactionModalityStoreKey];
	if (existingStore != null) return existingStore;
	const store = {
		modality: "keyboard",
		isListening: false,
		onPointerDown: () => {
			store.modality = "pointer";
		},
		onKeyDown: (event) => {
			if (event.metaKey || event.altKey || event.ctrlKey) return;
			store.modality = "keyboard";
		}
	};
	Object.defineProperty(singletonDocument, interactionModalityStoreKey, { value: store });
	return store;
}
function trackInteractionModality() {
	if (typeof document === "undefined") return () => {};
	const targetDocument = document;
	const store = getStore(targetDocument);
	if (!store.isListening) {
		store.isListening = true;
		targetDocument.addEventListener("pointerdown", store.onPointerDown, {
			capture: true,
			passive: true
		});
		targetDocument.addEventListener("keydown", store.onKeyDown, {
			capture: true,
			passive: true
		});
	}
	return () => {};
}
/** Activate shared modality tracking when the first consumer mounts. */
function useInteractionModalityTracking() {
	(0, import_react.useEffect)(() => trackInteractionModality(), []);
}
/** How the user last interacted with the page. */
function getInteractionModality() {
	return typeof document === "undefined" ? "keyboard" : getStore(document).modality;
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/utils/composeEventHandlers.js
/**
* @file composeEventHandlers.ts
* @input Multiple React event handlers (or undefined)
* @output A single handler that calls each in order, stopping if one prevents default
* @position Utility; used by components that own an interaction (a click that
*   selects, a keydown that drives arrow navigation) but also accept a consumer
*   handler for the same event through {...rest}. Composes them instead of
*   letting one clobber the other.
*
* Order is call order: the first argument runs first. Put the consumer handler
* first so it can opt out of the component's built-in behavior via
* `event.preventDefault()`; put the component's handler first when its behavior
* must always run regardless of the consumer.
*/
/**
* Compose event handlers into one. Each handler runs in argument order; if any
* calls `event.preventDefault()`, the remaining handlers are skipped.
*
* @example
* ```tsx
* // Consumer first: a consumer onClick can preventDefault to block selection.
* <button onClick={composeEventHandlers(onClickProp, handleSelect)} />
*
* // Component first: built-in keyboard nav always runs.
* <div onKeyDown={composeEventHandlers(handleArrowKeys, onKeyDownProp)} />
* ```
*/
function composeEventHandlers(...handlers) {
	return (event) => {
		for (const handler of handlers) {
			handler?.(event);
			if (event.defaultPrevented) return;
		}
	};
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/utils/isRenderable.js
/**
* @file isRenderable.ts
* @input A ReactNode value
* @output Boolean indicating whether the value passes the shallow React-slot check
* @position Utility for checking if a React slot prop has non-empty scalar content.
*
* React treats null, undefined, true, false, and '' as empty — they render
* nothing. This utility excludes exactly those values. It does not inspect
* descendants: elements, arrays, fragments, and other containers return true
* even when their contents ultimately render nothing.
*
* Use this instead of `prop != null` when a slot should also reject booleans and
* the empty string. Do not use the return value as proof that DOM output exists.
*/
/**
* Returns false for null, undefined, booleans, and the empty string; true for
* every other ReactNode value. The check is shallow and does not inspect the
* descendants of elements or containers.
*
* @example
* ```tsx
* const hasSideNav = isRenderable(sideNav);
* const hasTopNav = isRenderable(topNav);
* ```
*/
function isRenderable(node) {
	return node != null && typeof node !== "boolean" && node !== "";
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/utils/inputAria.js
/**
* @file inputAria.ts
* @input Receives input label/description IDs and optional InputGroup context
* @output Exports getInputARIA and joinAriaIDs for consistent input ARIA composition
* @position Internal utility; used by inputs that compose labels/descriptions
*/
function joinAriaIDs(...values) {
	const ids = values.flatMap((value) => typeof value === "string" ? value.trim().split(/\s+/) : []).filter(Boolean);
	if (ids.length === 0) return;
	return Array.from(new Set(ids)).join(" ");
}
/**
* Builds ARIA label/description wiring for an input.
*
* Standalone inputs keep their normal native label association. Grouped inputs
* are named by the visible InputGroup label plus their own input label, and
* inherit group description/status text in addition to input-local text.
*/
function getInputARIA(labelID, describedByIDs = [], inputGroup) {
	return {
		ariaLabelledBy: inputGroup ? joinAriaIDs(inputGroup.labelID, labelID) : void 0,
		ariaDescribedBy: joinAriaIDs(inputGroup?.describedByIDs, ...describedByIDs)
	};
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/utils/rtlStyles.js
var _temp$9 = {
	kbCHJM: "x1nrll8i",
	k3aq6I: "xsqj5wx",
	"$$css": true
};
var rtlStyles = {
	mirror: {
		k3aq6I: "xgtlewx",
		$$css: true
	},
	centerInline: (blockOffset) => [_temp$9, { "--x-transform": `translate(-50%, ${blockOffset})` != null ? `translate(-50%, ${blockOffset})` : void 0 }]
};
//#endregion
//#region node_modules/@astryxdesign/core/dist/utils/focusOutline.stylex.js
/**
* @file focusOutline.stylex.ts
* @input Uses StyleX and theme color tokens
* @output Exports shared focus-outline prop builders
* @position Internal utility for consistent keyboard focus outlines across core components
*
* Centralizes the standard Astryx focus outline, shown only for keyboard focus.
* Every focusable surface drew the same 2px accent ring already; writing it per
* component meant dozens of identical definitions to keep in step, and they did
* not stay in step — offsets drifted and one ring was a border-width thick.
*
* Every ring in core and lab is drawn from here, with one exception recorded in
* Switch: its condition is a component-scoped ancestor marker, which cannot be
* shared without leaking focus state between components. A component may still
* override the OFFSET (a ring that must sit inset, or clear of a field border);
* width, style and color are not restated anywhere.
*
* Every value comes from the `--focus-outline-*` tokens, which is how a theme
* restyles the ring: one override reaches every component at once. The
* `:focus-visible` condition is not themeable and stays here, so a theme can
* change what the ring looks like but cannot show it to pointer users.
*/
var FOCUS_OUTLINE_WIDTH = focusVars["--focus-outline-width"];
var FOCUS_OUTLINE_STYLE = focusVars["--focus-outline-style"];
var FOCUS_OUTLINE_COLOR = focusVars["--focus-outline-color"];
var FOCUS_OUTLINE_OFFSET = focusVars["--focus-outline-offset"];
`${FOCUS_OUTLINE_WIDTH}${FOCUS_OUTLINE_STYLE}${FOCUS_OUTLINE_COLOR}`;
/**
* The standard focus ring as plain CSS values, for the one case that has to
* apply it imperatively: a control whose focusable input is visually hidden and
* whose ring must land on a *themeable indicator* beside it (see
* `useIndicatorFocusRing`). Everything else should use the styles above.
*
* Longhands, not the `outline` shorthand, for the same reason the styles are:
* a shorthand resets every longhand it covers, so a caller could not re-color
* the ring without restating its width and style. Split, each part is
* independently overridable — and every part stays a var, so a theme's
* `--focus-outline-*` overrides still flow through.
*
* NOT usable inside another file's `stylex.create`, for the same reason as
* {@link FOCUS_OUTLINE}: StyleX compiles each member there to a CSS variable
* nothing defines. Compose the `focusVars` tokens instead.
*
* Keys are camelCase to match `HTMLElement.style`, so this spreads straight
* onto an element:
*
* ```ts
* Object.assign(el.style, FOCUS_OUTLINE_PARTS);        // draw
* Object.assign(el.style, FOCUS_OUTLINE_PARTS_NONE);   // clear
* ```
*/
var FOCUS_OUTLINE_PARTS = {
	outlineWidth: FOCUS_OUTLINE_WIDTH,
	outlineStyle: FOCUS_OUTLINE_STYLE,
	outlineColor: FOCUS_OUTLINE_COLOR,
	outlineOffset: FOCUS_OUTLINE_OFFSET
};
/** Clears {@link FOCUS_OUTLINE_PARTS}, one key per part so nothing lingers. */
var FOCUS_OUTLINE_PARTS_NONE = {
	outlineWidth: "",
	outlineStyle: "",
	outlineColor: "",
	outlineOffset: ""
};
var focusOutlineStyles = {
	focusVisible: {
		kMeerF: "x1k57tk5 x1vidyx5",
		k3XXqK: "x1t137rt x1jhp3zv",
		kjBf7l: "xx47ajj",
		kInvED: "x1wfwxd8 x1vwwbsn",
		$$css: true
	},
	focusWithin: {
		kMeerF: "x1k57tk5 x11j6mr8",
		k3XXqK: "x1t137rt xciu248",
		kjBf7l: "x1uy843r",
		kInvED: "x1wfwxd8 x1jumodi",
		$$css: true
	},
	focusWithinFirstChild: {
		kMeerF: "x1k57tk5 xmmisi4",
		k3XXqK: "x1t137rt xfd04fr",
		kjBf7l: "xobxmqy",
		kInvED: "x1wfwxd8 x2vr5qc",
		$$css: true
	},
	suppressed: {
		kMeerF: "x1k57tk5",
		k3XXqK: "x1t137rt",
		kInvED: "x1wfwxd8",
		$$css: true
	},
	publishFocusVisibleVars: {
		"--_focus-outline": "x17wzz1v xqih627",
		"--_focus-outline-offset": "xgzxwq1 xqchwus",
		$$css: true
	},
	focusWithinOrPublished: {
		kI3sdo: "xaw4jrz x16s19ga",
		kInvED: "x1kvmbwa x1jumodi",
		$$css: true
	}
};
function makeFocusOutlineProps(style) {
	return (...styles) => props(style, ...styles);
}
var focusOutlineProps = {
	focusVisible: makeFocusOutlineProps(focusOutlineStyles.focusVisible),
	focusWithin: makeFocusOutlineProps(focusOutlineStyles.focusWithin),
	focusWithinFirstChild: makeFocusOutlineProps(focusOutlineStyles.focusWithinFirstChild),
	suppressed: makeFocusOutlineProps(focusOutlineStyles.suppressed),
	publishFocusVisibleVars: makeFocusOutlineProps(focusOutlineStyles.publishFocusVisibleVars),
	focusWithinOrPublished: makeFocusOutlineProps(focusOutlineStyles.focusWithinOrPublished)
};
//#endregion
//#region node_modules/@astryxdesign/core/dist/utils/ime.js
/**
* @file ime.ts
* @input Receives a keyboard event (React SyntheticEvent's `nativeEvent`, or a
*   native DOM KeyboardEvent) with optional `isComposing` / `keyCode`.
* @output Exports `isImeKeyEvent`, the canonical predicate for "this keydown is
*   part of an in-progress IME composition and must not be treated as a command".
* @position Shared low-level utility; consumed by every editable/overlay surface
*   that handles Enter/Escape/arrows in `onKeyDown` (Typeahead, PowerSearch,
*   Dialog, ContextMenu, Tooltip, Chat composer, focus-trap Escape, ...).
*
* ── Why this exists (read once, here — do not re-explain at call sites) ──
*
* When a CJK user (Korean / Japanese / Chinese) is composing text via an IME,
* the browser fires a `keydown` event to COMMIT or CANCEL the pending
* composition (Enter commits the highlighted candidate; Escape cancels it;
* ArrowUp/Down/Home/End navigate the candidate window). Crucially this
* `keydown` fires BEFORE the `compositionend` event that actually writes the
* committed text into the field. So a naive `onKeyDown` handler sees a bare
* "Enter" or "Escape" and misreads the composition-commit/cancel as an
* application command — accepting a typeahead suggestion, submitting a chat
* message, closing a dialog/menu/tooltip, or saving a filter — mid-composition.
* The fix is to detect the composing keydown and early-return before running
* any command logic.
*
* Two signals, both needed:
*
*  1. `event.isComposing === true` — the modern, spec'd signal
*     (https://www.w3.org/TR/uievents/#dom-keyboardevent-iscomposing). This is
*     the primary check and is reliable in current evergreen browsers.
*
*  2. `event.keyCode === 229` — the legacy fallback. `229` is the sentinel
*     keyCode browsers report for "the key event is being processed by an IME".
*     It is still load-bearing: some IMEs and older Safari fire the composing
*     `keydown` with `isComposing` NOT yet set to `true`, but DO report
*     keyCode 229. Keeping both makes the guard robust across the browser
*     matrix we support. Do not drop the 229 fallback without a browser-matrix
*     audit.
*
* ── Which event object to pass ──
*
* React's SyntheticEvent for KeyboardEvent *does* surface `isComposing`, but to
* avoid any cross-browser normalization gap prefer passing the *native* event
* (`e.nativeEvent`) from React handlers — that is what BaseTypeahead,
* PowerSearch, and the Chat composer do. Native DOM listeners (Dialog,
* ContextMenu, Tooltip, focus-trap) pass the DOM `KeyboardEvent` directly.
* The parameter is intentionally structurally typed so both shapes are accepted.
*
* Note: `keyCode` is deprecated on the DOM `KeyboardEvent` type but is still
* present at runtime; we read it defensively via the optional structural field.
*/
/**
* The sentinel `keyCode` browsers report while a key event is being processed
* by an IME (the composing keydown that fires before `compositionend`). See the
* file header for why this legacy signal is still load-bearing alongside
* `isComposing`.
*/
var IME_PROCESSING_KEY_CODE = 229;
function isImeKeyEvent(event) {
	return event.isComposing === true || event.keyCode === IME_PROCESSING_KEY_CODE;
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/utils/interactionOverlay.stylex.js
/**
* The touch press's strength on the surface the controller painted, 0 to 1.
*
* Registered (`@property --astryx-press-alpha { syntax: "<number>";
* initial-value: 0 }`) so it interpolates, and inherited, so an owner's
* strength reaches the descendant that paints for it (a switch's track and
* thumb, a tab's hover layer) and a card's or an indicator wrapper's
* `::after`. Read it with `pressVars['--astryx-press-alpha']`, only inside a
* `data-astryx-press` arm:
* a pressed row's strength is 1 for everything inside the row.
*/
var pressVars = {
	"--astryx-press-alpha": "var(--astryx-press-alpha)",
	__varGroupHash__: "x1qqxm5o"
};
/**
* The touch press's clocks that both the stylesheet and the controller read.
*
* `defineConsts`, so the one number is inlined here at build time and is the
* controller's constant at run time (`PRESS_FADE_MS` in pressGesture.ts):
* the release animation and the timer that removes the attribute after it
* cannot drift apart.
*/
var pressConsts = { releaseMs: 200 };
`${pressConsts.releaseMs}`;
var PRESS_ALPHA = pressVars["--astryx-press-alpha"];
`${colorVars["--color-overlay-hover"]}${colorVars["--color-overlay-hover"]}`;
`${colorVars["--color-overlay-pressed"]}${colorVars["--color-overlay-pressed"]}`;
`${colorVars["--color-neutral"]}${colorVars["--color-neutral"]}`;
`${colorVars["--color-overlay-pressed"]}${PRESS_ALPHA}`;
var interactionOverlayStyles = {
	backgroundColor: {
		"--astryx-press-alpha": "x11z29ks xli5ek3",
		kKVMdj: "x14e4jsf",
		k44tkh: "x8s9nux",
		kyAemX: "xwkbtvz",
		kWV6AL: "xziyay6",
		"--_press-paint": "xz2mauf",
		"--_press-paint-image": "x1l7afqf",
		kWkggS: "xjbqb8w x1anq1lc x1s5nr2v x13ugjdw xl8sb5e xoevpu5 xprvw0a",
		kKwaWg: "x7ngsy6 xubczrd",
		$$css: true
	},
	backgroundImage: {
		"--astryx-press-alpha": "x11z29ks xli5ek3",
		kKVMdj: "x14e4jsf",
		k44tkh: "x8s9nux",
		kyAemX: "xwkbtvz",
		kWV6AL: "xziyay6",
		"--_press-paint": "xz2mauf",
		"--_press-paint-image": "x1l7afqf",
		kKwaWg: "x7uyq82 x3f84ok x7ngsy6 xubczrd xmvprkv xetgvay",
		$$css: true
	},
	backgroundImageOnNeutral: {
		"--astryx-press-alpha": "x11z29ks xli5ek3",
		kKVMdj: "x14e4jsf",
		k44tkh: "x8s9nux",
		kyAemX: "xwkbtvz",
		kWV6AL: "xziyay6",
		"--_press-paint": "xz2mauf",
		"--_press-paint-image": "x1l7afqf",
		kKwaWg: "x14bno8m xzmimnh xvbnuu x5rw36h x1qxwyo6 x1otsd3y xo3fi6e",
		$$css: true
	},
	pressedBackgroundColor: {
		"--astryx-press-alpha": "x11z29ks xli5ek3",
		kKVMdj: "x14e4jsf",
		k44tkh: "x8s9nux",
		kyAemX: "xwkbtvz",
		kWV6AL: "xziyay6",
		"--_press-paint": "xz2mauf",
		"--_press-paint-image": "x1l7afqf",
		kWkggS: "x1anq1lc x1s5nr2v x13ugjdw xl8sb5e",
		kKwaWg: "x7ngsy6 xubczrd",
		$$css: true
	},
	pressedAlpha: {
		"--astryx-press-alpha": "x11z29ks xli5ek3",
		kKVMdj: "x14e4jsf",
		k44tkh: "x8s9nux",
		kyAemX: "xwkbtvz",
		kWV6AL: "xziyay6",
		"--_press-paint": "xz2mauf",
		"--_press-paint-image": "x1l7afqf",
		$$css: true
	}
};
//#endregion
//#region node_modules/@astryxdesign/core/dist/hooks/useMergedRefs.js
/**
* @file useMergedRefs.ts
* @input React refs to combine into one stable callback ref
* @output Exports useMergedRefs
* @position Core hook; use when one element must receive multiple refs
*
* SYNC: When modified, update:
* - /packages/core/src/hooks/index.ts
* - /packages/core/src/hooks/useMergedRefs.doc.mjs
* - /packages/core/src/hooks/useMergedRefs.test.tsx
*/
/**
* Combine up to six refs into a callback ref whose identity changes only when
* one of the input refs changes.
*/
function useMergedRefs(refA, refB, refC, refD, refE, refF) {
	return (0, import_react.useMemo)(() => mergeRefs(refA, refB, refC, refD, refE, refF), [
		refA,
		refB,
		refC,
		refD,
		refE,
		refF
	]);
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/Text/Text.js
/**
* @file Text.tsx
* @input Uses React, HTMLAttributes, ReactNode
* @output Exports Text component, TextProps, TextType, TextSize types
* @position Core implementation; consumed by index.ts, tested by Text.test.tsx
*
* SYNC: When modified, update these files to stay in sync:
* - /packages/core/src/Text/Text.doc.mjs (props table, features, implementation notes)
* - /packages/core/src/Text/Text.test.tsx (tests for new/changed behavior)
* - /packages/core/src/Text/index.ts (exports if types change)
* - /apps/storybook/stories/Text.stories.tsx (storybook stories)
* - /packages/cli/assets/templates/blocks/components/Text/ (showcase blocks)
*/
var LazyXDSTooltip$1 = /*#__PURE__*/ (0, import_react.lazy)(async () => Promise.resolve().then(() => Tooltip_exports).then((mod) => ({ default: mod.Tooltip })));
var defaultColorByType = {
	body: "primary",
	large: "primary",
	label: "primary",
	supporting: "secondary",
	code: "primary",
	"display-1": "primary",
	"display-2": "primary",
	"display-3": "primary",
	inherit: "inherit"
};
/**
* Resolve the StyleX style key for a text type.
* Custom (theme-defined) types fall back to 'body' for baseline StyleX styles;
* their visual treatment comes from theme CSS overrides (.astryx-text.<type>).
*/
function resolveStyleType(type) {
	if (type in sizeByTypeStyles) return type;
	return "body";
}
/**
* Resolve the StyleX baseline color. Built-in colors map to their own color
* style; custom (theme-defined) colors fall back to the `primary` baseline —
* their actual color comes from theme CSS (`.astryx-text.<color>` /
* `.astryx-heading.<color>`), which the rendered `color` class targets.
*
* Exported so Heading applies the same custom-color fallback as Text.
*/
function resolveStyleColor(color) {
	if (color in colorStyles$2) return color;
	return "primary";
}
/**
* Semantic text component. Renders text with type-based styling from the theme.
*
* @example
* ```
* <Text type="body">Body text</Text>
* <Text type="large">Large body text</Text>
* <Text type="label">Form label</Text>
* <Text type="supporting">Helper text</Text>
* <Text type="code">{'const x = 1;'}</Text>
* <Text type="display-1" as="h1">Hero Title</Text>
* <Text type="display-2">$1.2M Revenue</Text>
* <Text type="body" maxLines={2}>Clamped text</Text>
* ```
*/
function Text({ type = "body", size, color, weight, display = "inline", maxLines = 0, hasTruncateTooltip = true, wordBreak, textWrap, justify = "start", hasCapsize = false, hasStrikethrough = false, hasTabularNumbers = false, xstyle, className, style, as: Component = "span", children, ref, ...props$21 }) {
	const resolvedColor = color ?? defaultColorByType[type] ?? "primary";
	const styleType = resolveStyleType(type);
	const styleColor = resolveStyleColor(resolvedColor);
	const resolvedWordBreak = wordBreak ?? (maxLines === 1 ? "break-all" : "break-word");
	const resolvedDisplay = maxLines > 0 || hasCapsize ? "block" : display;
	const truncation = useTruncation({ maxLines: hasTruncateTooltip === false ? 0 : maxLines });
	const tooltipPlacement = typeof hasTruncateTooltip === "string" ? hasTruncateTooltip : "above";
	const tooltipEnabled = maxLines > 0 && hasTruncateTooltip !== false && truncation.isTruncated;
	const textRef = (0, import_react.useRef)(null);
	const mergedRef = useMergedRefs(ref, truncation.ref, textRef);
	const inlineStyle = maxLines > 1 ? { WebkitLineClamp: maxLines } : void 0;
	return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/*#__PURE__*/ (0, import_jsx_runtime.jsx)(Component, {
		ref: mergedRef,
		...mergeProps(themeProps("text", {
			type,
			size,
			color: resolvedColor
		}), props(colorStyles$2[styleColor], sizeByTypeStyles[styleType], size && sizeStyles$4[size], defaultWeightByTypeStyles[styleType], weight && weightStyles[weight], maxLines === 1 ? truncationStyles.singleLine : maxLines > 1 ? truncationStyles.multiLine : displayStyles[resolvedDisplay], maxLines > 0 && wordBreakStyles[resolvedWordBreak], textWrap && textWrapStyles[textWrap], justify !== "start" && justifyStyles[justify], hasCapsize && capsizeStyles.enabled, hasStrikethrough && decorationStyles.strikethrough, hasTabularNumbers && tabularNumbersStyle.enabled, xstyle), className, {
			...style,
			...inlineStyle
		}),
		...props$21,
		children
	}), tooltipEnabled && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
		fallback: null,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(LazyXDSTooltip$1, {
			anchorRef: textRef,
			content: /*#__PURE__*/ (0, import_jsx_runtime.jsx)("span", {
				...props(truncationTooltipStyles.content),
				children: truncation.fullText
			}),
			placement: tooltipPlacement
		})
	})] });
}
Text.displayName = "Text";
//#endregion
//#region node_modules/@astryxdesign/core/dist/Heading/Heading.js
/**
* @file Heading.tsx
* @input Uses React, HTMLAttributes, ReactNode
* @output Exports Heading component, HeadingProps, HeadingLevel types
* @position Core implementation; lives in own Heading/ dir, re-exported by Text/
*
* SYNC: When modified, update these files to stay in sync:
* - /packages/core/src/Text/Text.doc.mjs (props table, features, implementation notes)
* - /packages/core/src/Heading/Heading.test.tsx (tests for new/changed behavior)
* - /packages/core/src/Text/index.ts (exports if types change)
* - /apps/storybook/stories/Text.stories.tsx (storybook stories)
* - /packages/cli/assets/templates/blocks/components/Heading/ (showcase blocks)
* - /packages/cli/assets/templates/blocks/components/Text/ (showcase blocks)
*/
var LazyXDSTooltip = /*#__PURE__*/ (0, import_react.lazy)(async () => Promise.resolve().then(() => Tooltip_exports).then((mod) => ({ default: mod.Tooltip })));
/**
* Heading level (1-6). Determines both visual styling and semantic HTML element.
*/
/**
* Display type variants for headings. Applies display-scale sizing
* (larger, lighter) while preserving the semantic heading element.
*/
function isBuiltinHeadingType(type) {
	return type === "display-1" || type === "display-2" || type === "display-3";
}
var levelToTag = {
	1: "h1",
	2: "h2",
	3: "h3",
	4: "h4",
	5: "h5",
	6: "h6"
};
/**
* Heading - Semantic heading component
*
* Renders headings with semantic HTML (h1-h6) and themed styling.
*
* @example
* ```
* <Heading level={1}>Page Title</Heading>
* <Heading level={2}>Section</Heading>
* <Heading level={2} accessibilityLevel={3}>Sidebar Section</Heading>
* <Heading level={1} type="display-1">Hero Title</Heading>
* <Heading level={2} type="display-2">$1.2M Revenue</Heading>
* <Heading level={2} maxLines={1}>Very Long Section Title...</Heading>
* <Heading level={3} color="secondary">Muted Heading</Heading>
* ```
*/
function Heading({ level, type, weight, accessibilityLevel, color = "primary", display = "block", maxLines = 0, hasTruncateTooltip = true, wordBreak, textWrap, justify = "start", hasCapsize = false, hasStrikethrough = false, xstyle, className, style, children, ref, ...props$20 }) {
	const Component = levelToTag[level];
	const ariaProps = accessibilityLevel && accessibilityLevel !== level ? { "aria-level": accessibilityLevel } : {};
	const resolvedWordBreak = wordBreak ?? (maxLines === 1 ? "break-all" : "break-word");
	const resolvedDisplay = maxLines > 0 || hasCapsize ? "block" : display;
	const builtinType = type && isBuiltinHeadingType(type) ? type : void 0;
	const truncation = useTruncation({ maxLines: hasTruncateTooltip === false ? 0 : maxLines });
	const tooltipPlacement = typeof hasTruncateTooltip === "string" ? hasTruncateTooltip : "above";
	const tooltipEnabled = maxLines > 0 && hasTruncateTooltip !== false && truncation.isTruncated;
	const headingRef = (0, import_react.useRef)(null);
	const mergedRef = useMergedRefs(ref, truncation.ref, headingRef);
	const inlineStyle = maxLines > 1 ? { WebkitLineClamp: maxLines } : void 0;
	return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/*#__PURE__*/ (0, import_jsx_runtime.jsx)(Component, {
		ref: mergedRef,
		...mergeProps(themeProps("heading", {
			level,
			color,
			type,
			weight
		}), props(colorStyles$2[resolveStyleColor(color)], builtinType ? sizeByTypeStyles[builtinType] : sizeByLevelStyles[level], builtinType && defaultWeightByTypeStyles[builtinType], weight && weightStyles[weight], maxLines === 1 ? truncationStyles.singleLine : maxLines > 1 ? truncationStyles.multiLine : displayStyles[resolvedDisplay], maxLines > 0 && wordBreakStyles[resolvedWordBreak], textWrap && textWrapStyles[textWrap], justify !== "start" && justifyStyles[justify], hasCapsize && capsizeStyles.enabled, hasStrikethrough && decorationStyles.strikethrough, xstyle), className, {
			...style,
			...inlineStyle
		}),
		...ariaProps,
		...props$20,
		children
	}), tooltipEnabled && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
		fallback: null,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(LazyXDSTooltip, {
			anchorRef: headingRef,
			content: /*#__PURE__*/ (0, import_jsx_runtime.jsx)("span", {
				...props(truncationTooltipStyles.content),
				children: truncation.fullText
			}),
			placement: tooltipPlacement
		})
	})] });
}
Heading.displayName = "Heading";
//#endregion
//#region node_modules/@astryxdesign/core/dist/Layer/layerScopedContext.js
/**
* @file layerScopedContext.tsx
* @input Surface-scoped React contexts and layer content
* @output Private context creation and whole-value content boundary
* @position AST-038 surface membership; unrelated contexts retain their owners
*/
var resets = [];
/** Create a surface-scoped context whose whole default applies in a new layer. */
function createLayerScopedContext(defaultValue) {
	const Context = /*#__PURE__*/ (0, import_react.createContext)(defaultValue);
	Context.displayName = "LayerScopedContext";
	resets.push((children) => /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Context, {
		value: defaultValue,
		children
	}));
	return Context;
}
function LayerContentBoundary({ children }) {
	const [resetChain] = (0, import_react.useState)(() => resets.slice());
	return resetChain.reduceRight((content, reset) => reset(content), children);
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/Layer/anchorName.js
/**
* @file anchorName.ts
* @input HTMLElement with CSS anchor-name property
* @output Helpers for managing comma-separated anchor-name lists
* @position Utility; used by useLayer for multi-anchor support
*
* SYNC: When modified, update:
* - /packages/core/src/Layer/useLayer.tsx (imports from here)
*/
/**
* CSS `anchor-name` is a comma-separated list, so multiple layers can anchor to
* the same element (e.g. several TopNavMegaMenus anchored to one <nav>). These
* helpers add/remove a single layer's anchor id without clobbering the others —
* overwriting the whole property would break every sibling layer's positioning.
*/
function readAnchorNames(el) {
	return (el.style.anchorName ?? "").split(",").map((name) => name.trim()).filter(Boolean);
}
function writeAnchorNames(el, names) {
	el.style.anchorName = names.join(", ");
}
function addAnchorName(el, name) {
	const names = readAnchorNames(el);
	if (!names.includes(name)) {
		names.push(name);
		writeAnchorNames(el, names);
	}
}
function removeAnchorName(el, name) {
	writeAnchorNames(el, readAnchorNames(el).filter((existing) => existing !== name));
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/Layer/gestureCounter.js
/**
* @file gestureCounter.ts
* @input Listens for pointerdown, keydown, and click on the document
* @output Exports the current gesture identity and whether its click has run
* @position Internal to Layer; used by useLayer to tell a click that belongs
*   to a dismissing press from a fresh one
*
* A browser light-dismiss and the trigger's own click come from ONE press, and
* which of them React sees first is a race. Comparing timestamps against a
* window guesses; counting gestures does not. The counter advances on every
* new press or keystroke, so "the click from the gesture that dismissed the
* layer" is exactly "the click while the counter still reads what it read at
* the dismissal", no matter how long the main thread was blocked in between.
*/
var gesture = 0;
var clickedGesture = null;
var isListening$1 = false;
function advance() {
	gesture += 1;
}
function markClicked() {
	clickedGesture = gesture;
}
function listen() {
	if (isListening$1 || typeof document === "undefined") return;
	isListening$1 = true;
	document.addEventListener("pointerdown", advance, true);
	document.addEventListener("keydown", advance, true);
	document.addEventListener("click", markClicked, true);
}
/**
* Identifies the user gesture in flight. Two reads returning the same value
* happened within one press (or one keystroke).
*/
function currentGesture() {
	listen();
	return gesture;
}
/** Whether the click belonging to the current gesture already bubbled. */
function currentGestureHasClicked() {
	listen();
	return clickedGesture === gesture;
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/Layer/layerHost.js
/**
* @file layerHost.ts
* @input Uses the layer's intended inline parent element
* @output Exports resolveLayerPortalTarget, the corrective portal target
* @position Layer utility; used by useLayer to place the popover in the DOM
*
* SYNC: When modified, update:
* - /packages/core/src/Layer/layerHost.test.ts
*/
/**
* Ancestors a layer must not be hosted inside.
*
* Two overlapping reasons, both verified in Chrome:
*
* 1. The HTML parser owns server markup. `<p>` and the heading-ish elements
*    take phrasing content only, so a block element inside one makes the
*    parser close the paragraph and reparent the rest — the layer's content
*    ends up in the page instead of the popover. A nested `<a>` triggers the
*    same tearing through the adoption agency algorithm.
* 2. Interactive ancestors capture the layer's own interactions. A card
*    hosted inside an `<a>` or `<button>` puts its links and buttons inside
*    that control: clicking one navigates the wrapping link, and every
*    focusable in the card joins the control's own tab stop.
*
* Inline formatting elements are on the list for a third, milder reason: a
* layer hosted in one inherits its typography (font-size, text-align), so a
* card in a 13px centered paragraph renders 13px and centered.
*/
var UNSAFE_HOSTS = /* @__PURE__ */ new Set([
	"p",
	"h1",
	"h2",
	"h3",
	"h4",
	"h5",
	"h6",
	"dt",
	"pre",
	"legend",
	"data",
	"dfn",
	"meter",
	"output",
	"progress",
	"option",
	"optgroup",
	"table",
	"thead",
	"tbody",
	"tfoot",
	"tr",
	"colgroup",
	"ul",
	"ol",
	"menu",
	"dl",
	"select",
	"datalist",
	"picture",
	"hgroup",
	"ruby",
	"rt",
	"rp",
	"a",
	"button",
	"label",
	"summary",
	"span",
	"em",
	"strong",
	"b",
	"i",
	"u",
	"s",
	"small",
	"mark",
	"code",
	"kbd",
	"samp",
	"var",
	"sub",
	"sup",
	"abbr",
	"cite",
	"q",
	"time",
	"bdi",
	"bdo",
	"ins",
	"del"
]);
/**
* Return the corrective portal target for a layer's intended inline parent.
*
* A null result means the inline parent and all of its ancestors are safe, so
* the layer should stay at its JSX position. Otherwise the result is the
* nearest element outside every unsafe ancestor around that position.
*
* Walking up from the actual render position (rather than the trigger, or
* portaling to `document.body`) keeps the two things a layer inherits there:
*
* - **Theme.** Theme scopes live on DOM ancestors. Staying as close as
*   possible to the intended render position preserves their component rules
*   and custom properties; `document.body` may sit outside a nested scope.
* - **Tab order.** Sequential focus follows DOM order, so a host near the
*   trigger keeps the layer's focusables next to it. (`show()` also passes
*   the trigger as the popover's invoker `source`, which pins focus order to
*   the invoker in browsers that support it.)
*
* The outermost unsafe ancestor matters up to the nearest native dialog. A safe
* div may itself sit inside an anchor; stopping at that div would still put the
* layer's buttons inside the link. A dialog is the opposite boundary: portaling
* beyond it removes the layer from the browser's modal top layer and makes the
* layer inert. Walking the chain within that boundary keeps the target outside
* every relevant unsafe ancestor and inside its nearest dialog.
*/
function resolveLayerPortalTarget(inlineParent) {
	if (!inlineParent) return null;
	let outermostUnsafe = null;
	let node = inlineParent;
	while (node) {
		const tagName = node.tagName.toLowerCase();
		if (tagName === "dialog") break;
		if (UNSAFE_HOSTS.has(tagName)) outermostUnsafe = node;
		node = node.parentElement;
	}
	return outermostUnsafe?.parentElement ?? null;
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/Layer/layerTextReset.stylex.js
/**
* Apply before component and consumer styles on the layer's content boundary.
* Top-layer promotion does not stop DOM inheritance. Reset text formatting, not
* writing context, theme variables, surface colors, geometry, or interaction.
*/
var layerTextReset = { reset: {
	kMv6JI: "x9ynric",
	kGuDYH: "xjm74w1",
	k63SB2: "xxovm9e",
	kLWn49: "xw6l6zx",
	kKX8nH: "x1j61x8r",
	k9WMMc: "x1yc453h",
	kJI5tL: "x7ssn7h",
	kTHuQy: "xzugeeo",
	kP9fke: "x6mezaz",
	kb6lSQ: "x1i21sxh",
	k4JVr9: "xp3md9m",
	kKMj4B: "x19pm5ym",
	khDVqt: "xeaf4i8",
	kTgw9: "x1lldw8n",
	kHjlTd: "x1h4wwuj",
	kE4Cay: "xxydokm",
	$$css: true
} };
//#endregion
//#region node_modules/@astryxdesign/core/dist/Layer/layerStructureReset.stylex.js
/**
* Apply beside `layerTextReset`, before component and consumer styles, on the
* layer's content boundary. Top-layer promotion does not stop DOM inheritance,
* so a structural value an ancestor component scoped to its own descendants
* would otherwise reach unrelated content opened from inside it.
*
* Name each property: a structural channel stops here only once it is known.
* Theme tokens and writing context must keep inheriting (AST-038 FR2), so this
* never resets by prefix.
*/
var layerStructureReset = { reset: {
	"--step-connector-gap": "x1qkaldv",
	$$css: true
} };
//#endregion
//#region node_modules/@astryxdesign/core/dist/Layer/layerViewportInset.stylex.js
/**
* The viewport gutter and the caps derived from it. Every value has an
* `env()`-less fallback for engines without safe-area support; pair them as
* `stylex.firstThatWorks(`calc(${cap})`, `calc(${capFallback})`)`. Pass
* each inside a `calc()` (or another function), never as a bare reference: a
* constant reference compiles to a `var()`, and `firstThatWorks` folds two
* `var()` arguments into one `var(cap, capFallback)` whose constant is never
* inlined, so every engine would take the fallback.
*/
var layerViewportInset = {
	gutterBlockStart: "calc(max(var(--spacing-4), env(safe-area-inset-top, 0px)) + var(--astryx-layer-inset-block-start, 0px))",
	gutterBlockEnd: "calc(max(var(--spacing-4), env(safe-area-inset-bottom, 0px)) + var(--astryx-layer-inset-block-end, 0px))",
	gutterInline: "calc(max(var(--spacing-4), env(safe-area-inset-left, 0px), env(safe-area-inset-right, 0px)) + max(var(--astryx-layer-inset-inline-start, 0px), var(--astryx-layer-inset-inline-end, 0px)))",
	gutterBlock: "calc(max(var(--spacing-4), env(safe-area-inset-top, 0px), env(safe-area-inset-bottom, 0px)) + max(var(--astryx-layer-inset-block-start, 0px), var(--astryx-layer-inset-block-end, 0px)))",
	gutterBlockFallback: "calc(var(--spacing-4) + max(var(--astryx-layer-inset-block-start, 0px), var(--astryx-layer-inset-block-end, 0px)))",
	gutterBlockStartFallback: "calc(var(--spacing-4) + var(--astryx-layer-inset-block-start, 0px))",
	gutterBlockEndFallback: "calc(var(--spacing-4) + var(--astryx-layer-inset-block-end, 0px))",
	gutterInlineFallback: "calc(var(--spacing-4) + max(var(--astryx-layer-inset-inline-start, 0px), var(--astryx-layer-inset-inline-end, 0px)))",
	maxInlineSize: "calc(100vi - calc(max(var(--spacing-4), env(safe-area-inset-left, 0px)) + var(--astryx-layer-inset-inline-start, 0px)) - calc(max(var(--spacing-4), env(safe-area-inset-right, 0px)) + var(--astryx-layer-inset-inline-end, 0px)))",
	maxInlineSizeFallback: "calc(100vw - var(--spacing-4) - var(--spacing-4) - var(--astryx-layer-inset-inline-start, 0px) - var(--astryx-layer-inset-inline-end, 0px))",
	maxBlockSize: "calc(100dvb - calc(max(var(--spacing-4), env(safe-area-inset-top, 0px)) + var(--astryx-layer-inset-block-start, 0px)) - calc(max(var(--spacing-4), env(safe-area-inset-bottom, 0px)) + var(--astryx-layer-inset-block-end, 0px)))",
	maxBlockSizeFallback: "calc(100vh - var(--spacing-4) - var(--spacing-4) - var(--astryx-layer-inset-block-start, 0px) - var(--astryx-layer-inset-block-end, 0px))"
};
//#endregion
//#region node_modules/@astryxdesign/core/dist/Layer/layerInset.js
/**
* @file layerInset.ts
* @input A LayerProvider inset declaration
* @output The inline custom properties that carry it to a layer or the toast
*   viewport, where the gutter reads them
* @position Layer runtime; the mechanism behind `LayerProvider.inset`
*   (spec:AST-059 FR6). The property names are implementation; the provider
*   prop is the public surface.
*/
var INSET_PROPERTIES = [
	["blockStart", "--astryx-layer-inset-block-start"],
	["blockEnd", "--astryx-layer-inset-block-end"],
	["inlineStart", "--astryx-layer-inset-inline-start"],
	["inlineEnd", "--astryx-layer-inset-inline-end"]
];
function toCssLength$1(value) {
	return typeof value === "number" ? `${value}px` : value;
}
/**
* The inline custom properties that carry a declared inset to the element
* whose gutter reads them — the layer, or the toast viewport. One property
* per declared edge; an undeclared edge sets nothing, so it reads `0px`
* through the gutter's fallback exactly as it does with no provider at all.
*/
function layerInsetProperties(inset) {
	const style = {};
	if (inset) for (const [edge, property] of INSET_PROPERTIES) {
		const value = inset[edge];
		if (value != null && value !== "") style[property] = toCssLength$1(value);
	}
	return style;
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/Layer/layerSlideRules.js
/**
* @file layerSlideRules.ts
* @input A layer's placement and alignment
* @output The `@position-try` rules for its slide options and their names
* @position Layer runtime geometry; the slide of spec:AST-059 FR4
*
* The slide is a position option whose area spans the whole alignment axis,
* so a layer wider than the room beside its trigger on both sides still
* reaches the side of the trigger that has room on the placement axis. A
* plain `<position-area>` fallback would keep the base margins and insets,
* which belong to an edge-aligned layer: the alignment-axis gutter on one
* edge only, and the clearance/gutter pair of the base side on the placement
* axis. Each slide option therefore carries its own declarations — the
* gutter on both alignment-axis edges, and the clearance facing the anchor
* with the gutter on the far edge of the side it lands on.
*
* The rules are static — the anchor clearance travels through a custom
* property — so one style sheet per document carries all of them. It is
* installed from a layout effect, before the layer's first paint, rather than
* through StyleX, whose `positionTry()` output is malformed in the pinned
* release. The sheet lives in the document head, not beside or inside the
* layer: a sibling would change what a parent's last child is, and text
* inside a role-bearing layer would name it to assistive technology.
*/
/** The custom property a layer writes its anchor clearance to. */
var LAYER_CLEARANCE_PROPERTY = "--_astryx-layer-clearance";
function slideRuleName(placement, alignment, side) {
	return `--astryx-layer-slide-${placement}-${alignment}-${side}`;
}
var CLEARANCE = `var(${LAYER_CLEARANCE_PROPERTY}, 0px)`;
/** Two declarations: the `env()`-less fallback first, then the full value. */
function pair(property, fallback, value) {
	return `${property}:${fallback};${property}:${value};`;
}
function blockGutter(property) {
	return pair(property, layerViewportInset.gutterBlockFallback, layerViewportInset.gutterBlock);
}
function inlineGutter(property) {
	return pair(property, layerViewportInset.gutterInlineFallback, layerViewportInset.gutterInline);
}
var OPPOSITE = {
	above: "below",
	below: "above",
	start: "end",
	end: "start"
};
function areaFor(placement) {
	switch (placement) {
		case "above": return "self-block-start span-all";
		case "below": return "self-block-end span-all";
		case "start": return "self-inline-start span-all";
		case "end": return "self-inline-end span-all";
	}
}
/** The placement-axis margins for a layer resting on `placement`'s side. */
function placementMargins(placement) {
	switch (placement) {
		case "above": return `margin-block-end:${CLEARANCE};${blockGutter("margin-block-start")}`;
		case "below": return `margin-block-start:${CLEARANCE};${blockGutter("margin-block-end")}`;
		case "start": return `margin-inline-end:${CLEARANCE};${inlineGutter("margin-inline-start")}`;
		case "end": return `margin-inline-start:${CLEARANCE};${inlineGutter("margin-inline-end")}`;
	}
}
/** The alignment-axis gutter on both edges, with the base inset reset. */
function alignmentMargins(placement) {
	return placement === "above" || placement === "below" ? `${inlineGutter("margin-inline-start")}${inlineGutter("margin-inline-end")}inset-inline-start:0;inset-inline-end:0;` : `${blockGutter("margin-block-start")}${blockGutter("margin-block-end")}inset-block-start:0;inset-block-end:0;`;
}
function rule(placement, alignment, side) {
	const landing = side === "same" ? placement : OPPOSITE[placement];
	return `@position-try ${slideRuleName(placement, alignment, side)}{position-area:${areaFor(landing)};${placementMargins(landing)}${alignmentMargins(landing)}}`;
}
var PLACEMENTS = [
	"above",
	"below",
	"start",
	"end"
];
var ALIGNMENTS = [
	"start",
	"center",
	"end"
];
/** Every slide rule, for every placement and alignment. */
function slideRulesCss() {
	return PLACEMENTS.flatMap((placement) => ALIGNMENTS.flatMap((alignment) => [rule(placement, alignment, "same"), rule(placement, alignment, "opposite")])).join("");
}
var SLIDE_RULES_ID = "astryx-layer-slide-rules";
/**
* Install the slide rules in a document once. Idempotent; a second layer, or
* a layer in another document (an iframe), finds or adds its own sheet.
*/
function ensureSlideRules(doc) {
	if (doc.getElementById("astryx-layer-slide-rules")) return;
	const style = doc.createElement("style");
	style.id = SLIDE_RULES_ID;
	style.textContent = slideRulesCss();
	doc.head.appendChild(style);
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/Layer/LayerContext.js
/**
* @file LayerContext.ts
* @input React context
* @output Exports LayerContext and related types
* @position Context definition for LayerProvider
*
* SYNC: When modified, update:
* - /packages/core/src/Layer/index.ts
* - /packages/core/src/Layer/LayerProvider.tsx
*/
/**
* The inset an app declares for a persistent bar floating over a viewport
* edge — a phone navigation bar, a docked toolbar — once, on `LayerProvider`.
* Each edge adds to the layer runtime's gutter for every anchored layer under
* the provider and moves the toast viewport by the same amount. A number is
* pixels; a string is a CSS length. Every edge defaults to zero: the system
* already knows the device's own edges (the gutter reads
* `env(safe-area-inset-*)`); only the app knows the bars it draws.
*/
/**
* Toast configuration passed through the layer provider.
*/
/**
* Context value provided by LayerProvider.
*/
/**
* React context for the layer provider.
* Default value is null — hooks detect this and use the fallback.
*/
var LayerContext = /*#__PURE__*/ (0, import_react.createContext)(null);
LayerContext.displayName = "LayerContext";
/**
* Hook to access the layer context. Returns null if no provider exists.
*/
function useLayerContext() {
	return (0, import_react.use)(LayerContext);
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/Layout/padding.stylex.js
/**
* Maps numeric SpacingStep values to SpacingToken keys used by the container system.
*/
var spacingStepToToken = {
	0: "spacing0",
	.5: "spacing0_5",
	1: "spacing1",
	1.5: "spacing1_5",
	2: "spacing2",
	3: "spacing3",
	4: "spacing4",
	5: "spacing5",
	6: "spacing6",
	8: "spacing8",
	10: "spacing10"
};
/**
* Padding styles for all sides using spacing tokens.
* Each key applies uniform padding to all four sides.
*/
var paddingStyles = {
	"0": {
		kZCmMZ: "x18gyask",
		kwRFfy: "x1s0aq8i",
		kLKAdn: "x1ydh6w3",
		kGO01o: "x1l20ajd",
		$$css: true
	},
	"1": {
		kZCmMZ: "x1vsv5vr",
		kwRFfy: "x1nryj5t",
		kLKAdn: "xfsso4q",
		kGO01o: "xy143xn",
		$$css: true
	},
	"2": {
		kZCmMZ: "x12gdq22",
		kwRFfy: "x1djylfy",
		kLKAdn: "x1xye8es",
		kGO01o: "x1wesfrj",
		$$css: true
	},
	"3": {
		kZCmMZ: "x126nfab",
		kwRFfy: "x1t818jl",
		kLKAdn: "x1vlblms",
		kGO01o: "xvmdzux",
		$$css: true
	},
	"4": {
		kZCmMZ: "x1rey3nv",
		kwRFfy: "xnjyzlh",
		kLKAdn: "x1oa1p4a",
		kGO01o: "x1awphl8",
		$$css: true
	},
	"5": {
		kZCmMZ: "x1blguxw",
		kwRFfy: "xdbrk9v",
		kLKAdn: "xx7rijo",
		kGO01o: "x1hk98q",
		$$css: true
	},
	"6": {
		kZCmMZ: "x31w388",
		kwRFfy: "x1we12cn",
		kLKAdn: "x1adxfkp",
		kGO01o: "xjpqqx5",
		$$css: true
	},
	"8": {
		kZCmMZ: "x1j3hnjz",
		kwRFfy: "x1q91b2g",
		kLKAdn: "xoxd1wu",
		kGO01o: "x2oz4g1",
		$$css: true
	},
	"10": {
		kZCmMZ: "xqp078j",
		kwRFfy: "x160ivqr",
		kLKAdn: "xk6660b",
		kGO01o: "x2izi54",
		$$css: true
	},
	"0.5": {
		kZCmMZ: "x138rykx",
		kwRFfy: "x1le3yxw",
		kLKAdn: "xbx876j",
		kGO01o: "xij103a",
		$$css: true
	},
	"1.5": {
		kZCmMZ: "xfti1ec",
		kwRFfy: "x17hk9do",
		kLKAdn: "x1kwdpsa",
		kGO01o: "x1opdxmq",
		$$css: true
	}
};
/**
* Container padding inline CSS variable styles for edge compensation.
* Sets --container-padding-inline-start and --container-padding-inline-end so
* edge-compensating children know the inline padding to compensate against.
*/
var containerPaddingInlineVarStyles = {
	"0": {
		"--container-padding-inline-start": "x1gu2k80",
		"--container-padding-inline-end": "x91ghl5",
		$$css: true
	},
	"1": {
		"--container-padding-inline-start": "x1cvlban",
		"--container-padding-inline-end": "x2oyxnl",
		$$css: true
	},
	"2": {
		"--container-padding-inline-start": "x1xlrr2o",
		"--container-padding-inline-end": "xcas3b9",
		$$css: true
	},
	"3": {
		"--container-padding-inline-start": "xfdwxua",
		"--container-padding-inline-end": "xu0ipoa",
		$$css: true
	},
	"4": {
		"--container-padding-inline-start": "x1dlhslv",
		"--container-padding-inline-end": "xs0pscg",
		$$css: true
	},
	"5": {
		"--container-padding-inline-start": "x1s81nki",
		"--container-padding-inline-end": "xgkj7vj",
		$$css: true
	},
	"6": {
		"--container-padding-inline-start": "x1ep0dkj",
		"--container-padding-inline-end": "x94cj42",
		$$css: true
	},
	"8": {
		"--container-padding-inline-start": "xw1diwv",
		"--container-padding-inline-end": "x1b9k1pi",
		$$css: true
	},
	"10": {
		"--container-padding-inline-start": "xserb3f",
		"--container-padding-inline-end": "xx5lg5w",
		$$css: true
	},
	"0.5": {
		"--container-padding-inline-start": "x14ws0sr",
		"--container-padding-inline-end": "x1wz3t3y",
		$$css: true
	},
	"1.5": {
		"--container-padding-inline-start": "x176g23i",
		"--container-padding-inline-end": "xntetml",
		$$css: true
	}
};
/**
* Container padding block-start/block-end CSS variable styles for vertical bleed.
* Sets --container-padding-block-start and --container-padding-block-end so bleed children (Table, Divider, Section)
* know the block padding to compensate against when first/last child.
*/
var containerPaddingBlockStartVarStyles = {
	"0": {
		"--container-padding-block-start": "x1i3qcxz",
		$$css: true
	},
	"1": {
		"--container-padding-block-start": "xnsckjb",
		$$css: true
	},
	"2": {
		"--container-padding-block-start": "xa8b4fq",
		$$css: true
	},
	"3": {
		"--container-padding-block-start": "x11k4f5r",
		$$css: true
	},
	"4": {
		"--container-padding-block-start": "xm01sq8",
		$$css: true
	},
	"5": {
		"--container-padding-block-start": "xp8wdkl",
		$$css: true
	},
	"6": {
		"--container-padding-block-start": "x1hmud4d",
		$$css: true
	},
	"8": {
		"--container-padding-block-start": "xfv60at",
		$$css: true
	},
	"10": {
		"--container-padding-block-start": "x17h9kl7",
		$$css: true
	},
	"0.5": {
		"--container-padding-block-start": "xvdf9ev",
		$$css: true
	},
	"1.5": {
		"--container-padding-block-start": "x1kbx601",
		$$css: true
	}
};
var containerPaddingBlockEndVarStyles = {
	"0": {
		"--container-padding-block-end": "xkunwnr",
		$$css: true
	},
	"1": {
		"--container-padding-block-end": "x57a7ii",
		$$css: true
	},
	"2": {
		"--container-padding-block-end": "x1lsgcmx",
		$$css: true
	},
	"3": {
		"--container-padding-block-end": "x1q3ppug",
		$$css: true
	},
	"4": {
		"--container-padding-block-end": "x4hfsld",
		$$css: true
	},
	"5": {
		"--container-padding-block-end": "xbib2ws",
		$$css: true
	},
	"6": {
		"--container-padding-block-end": "x1q8d17g",
		$$css: true
	},
	"8": {
		"--container-padding-block-end": "x8lgq76",
		$$css: true
	},
	"10": {
		"--container-padding-block-end": "x15vxphk",
		$$css: true
	},
	"0.5": {
		"--container-padding-block-end": "x1cao3zv",
		$$css: true
	},
	"1.5": {
		"--container-padding-block-end": "xv53x8y",
		$$css: true
	}
};
/**
* Layout outer X padding CSS variable styles for Layout's `padding` prop.
*
* These write `--layout-padding-own-outer-x`, which the Layout's regions read
* ahead of the inherited `--layout-padding-outer-x` that padding containers
* (Card, Section, Dialog) publish. Every Layout, padding container, and
* overlay root clears the `own` value, so one Layout's padding never reaches a
* nested Layout's regions.
*/
var layoutPaddingOuterXVarStyles = {
	"0": {
		"--layout-padding-own-outer-x": "xhcsosl",
		$$css: true
	},
	"1": {
		"--layout-padding-own-outer-x": "x14y473",
		$$css: true
	},
	"2": {
		"--layout-padding-own-outer-x": "x18c6olm",
		$$css: true
	},
	"3": {
		"--layout-padding-own-outer-x": "x1cfn5ow",
		$$css: true
	},
	"4": {
		"--layout-padding-own-outer-x": "xh30wjg",
		$$css: true
	},
	"5": {
		"--layout-padding-own-outer-x": "xse87af",
		$$css: true
	},
	"6": {
		"--layout-padding-own-outer-x": "xznoj5s",
		$$css: true
	},
	"8": {
		"--layout-padding-own-outer-x": "xtjvahm",
		$$css: true
	},
	"10": {
		"--layout-padding-own-outer-x": "xczqutc",
		$$css: true
	},
	"0.5": {
		"--layout-padding-own-outer-x": "x1ftjo2o",
		$$css: true
	},
	"1.5": {
		"--layout-padding-own-outer-x": "x1k4nu17",
		$$css: true
	}
};
/**
* Layout outer Y padding CSS variable styles; the block-axis counterpart of
* layoutPaddingOuterXVarStyles.
*/
var layoutPaddingOuterYVarStyles = {
	"0": {
		"--layout-padding-own-outer-y": "xe1wva8",
		$$css: true
	},
	"1": {
		"--layout-padding-own-outer-y": "x1nxw61z",
		$$css: true
	},
	"2": {
		"--layout-padding-own-outer-y": "xm4vj23",
		$$css: true
	},
	"3": {
		"--layout-padding-own-outer-y": "x69uvy7",
		$$css: true
	},
	"4": {
		"--layout-padding-own-outer-y": "x139ridu",
		$$css: true
	},
	"5": {
		"--layout-padding-own-outer-y": "x1cq2jmq",
		$$css: true
	},
	"6": {
		"--layout-padding-own-outer-y": "x1ir1f5p",
		$$css: true
	},
	"8": {
		"--layout-padding-own-outer-y": "xhbsdkj",
		$$css: true
	},
	"10": {
		"--layout-padding-own-outer-y": "xaqnhag",
		$$css: true
	},
	"0.5": {
		"--layout-padding-own-outer-y": "x1b6unwa",
		$$css: true
	},
	"1.5": {
		"--layout-padding-own-outer-y": "x1g16mdy",
		$$css: true
	}
};
/**
* Inline-start-only padding override styles.
* Use when a component needs to override the inline-start edge independently
* of inline-end. Logical, so it follows the writing direction (left in LTR,
* right in RTL).
*/
var paddingInlineStartStyles = {
	"0": {
		kZCmMZ: "x18gyask",
		$$css: true
	},
	"1": {
		kZCmMZ: "x1vsv5vr",
		$$css: true
	},
	"2": {
		kZCmMZ: "x12gdq22",
		$$css: true
	},
	"3": {
		kZCmMZ: "x126nfab",
		$$css: true
	},
	"4": {
		kZCmMZ: "x1rey3nv",
		$$css: true
	},
	"5": {
		kZCmMZ: "x1blguxw",
		$$css: true
	},
	"6": {
		kZCmMZ: "x31w388",
		$$css: true
	},
	"8": {
		kZCmMZ: "x1j3hnjz",
		$$css: true
	},
	"10": {
		kZCmMZ: "xqp078j",
		$$css: true
	},
	"0.5": {
		kZCmMZ: "x138rykx",
		$$css: true
	},
	"1.5": {
		kZCmMZ: "xfti1ec",
		$$css: true
	}
};
/**
* Inline-end-only padding override styles.
* The inline-end counterpart of paddingInlineStartStyles.
*/
var paddingInlineEndStyles = {
	"0": {
		kwRFfy: "x1s0aq8i",
		$$css: true
	},
	"1": {
		kwRFfy: "x1nryj5t",
		$$css: true
	},
	"2": {
		kwRFfy: "x1djylfy",
		$$css: true
	},
	"3": {
		kwRFfy: "x1t818jl",
		$$css: true
	},
	"4": {
		kwRFfy: "xnjyzlh",
		$$css: true
	},
	"5": {
		kwRFfy: "xdbrk9v",
		$$css: true
	},
	"6": {
		kwRFfy: "x1we12cn",
		$$css: true
	},
	"8": {
		kwRFfy: "x1q91b2g",
		$$css: true
	},
	"10": {
		kwRFfy: "x160ivqr",
		$$css: true
	},
	"0.5": {
		kwRFfy: "x1le3yxw",
		$$css: true
	},
	"1.5": {
		kwRFfy: "x17hk9do",
		$$css: true
	}
};
/**
* Block-start-only padding override styles.
* Use when a component needs to override the block-start (top) edge
* independently of block-end — e.g. a section that sits under a sticky
* header and needs less padding above than below.
*/
var paddingBlockStartStyles = {
	"0": {
		kLKAdn: "x1ydh6w3",
		$$css: true
	},
	"1": {
		kLKAdn: "xfsso4q",
		$$css: true
	},
	"2": {
		kLKAdn: "x1xye8es",
		$$css: true
	},
	"3": {
		kLKAdn: "x1vlblms",
		$$css: true
	},
	"4": {
		kLKAdn: "x1oa1p4a",
		$$css: true
	},
	"5": {
		kLKAdn: "xx7rijo",
		$$css: true
	},
	"6": {
		kLKAdn: "x1adxfkp",
		$$css: true
	},
	"8": {
		kLKAdn: "xoxd1wu",
		$$css: true
	},
	"10": {
		kLKAdn: "xk6660b",
		$$css: true
	},
	"0.5": {
		kLKAdn: "xbx876j",
		$$css: true
	},
	"1.5": {
		kLKAdn: "x1kwdpsa",
		$$css: true
	}
};
/**
* Block-end-only padding override styles.
* The block-end counterpart of paddingBlockStartStyles.
*/
var paddingBlockEndStyles = {
	"0": {
		kGO01o: "x1l20ajd",
		$$css: true
	},
	"1": {
		kGO01o: "xy143xn",
		$$css: true
	},
	"2": {
		kGO01o: "x1wesfrj",
		$$css: true
	},
	"3": {
		kGO01o: "xvmdzux",
		$$css: true
	},
	"4": {
		kGO01o: "x1awphl8",
		$$css: true
	},
	"5": {
		kGO01o: "x1hk98q",
		$$css: true
	},
	"6": {
		kGO01o: "xjpqqx5",
		$$css: true
	},
	"8": {
		kGO01o: "x2oz4g1",
		$$css: true
	},
	"10": {
		kGO01o: "x2izi54",
		$$css: true
	},
	"0.5": {
		kGO01o: "xij103a",
		$$css: true
	},
	"1.5": {
		kGO01o: "x1opdxmq",
		$$css: true
	}
};
/**
* Padding-variable reset for overlay roots (Dialog, BottomSheet, Drawer,
* MobileNav, Lightbox, and every layer surface).
*
* ## Why an overlay needs this
*
* The container padding system talks to descendants through inherited custom
* properties: a padded container announces its padding, and children read the
* value either to apply it or to cancel it with a negative margin
* (`Section`, `Divider`, `Layout`, `Table`).
*
* Inheritance follows the DOM, but an overlay leaves its parent's visual box —
* a fixed/top-layer `<dialog>` is a DOM descendant of the padded page while
* being nowhere near it on screen. It inherits values describing padding that
* is not there, and its content compensates against phantom space: a `Section`
* inside a 640px sheet rendered 672px wide and hung off both edges (#5208).
*
* Two families leak, and they need opposite treatments:
*
* - `--container-padding-*` -> `0px`. Descendants SUBTRACT these (bleed
*   margins). The overlay root has no padding of its own to escape, so the
*   honest answer is zero. Nested containers that do set padding (a Dialog's
*   content wrapper) re-announce their own values below this point, so
*   legitimate edge-to-edge bleed inside the overlay is unaffected.
* - `--layout-padding-*` and `--_section-padding-propagated` -> `initial`.
*   Descendants ADD these, so zeroing them would strip padding rather than
*   restore it. `initial` makes each guaranteed-invalid, so readers fall
*   through their own `var(…, fallback)` chain and land on the theme default —
*   which is what an overlay at the top of the tree should show.
*
* `initial` is also why propagation moved off `--astryx-section-padding`: that
* name is public theme surface, set at the theme root, and making it invalid
* here would blank the theme's own section padding inside every overlay.
*
* Apply on the overlay's outermost styled element.
*
* @example
* ```
* <dialog {...stylex.props(styles.dialog, overlayPaddingReset.reset)} />
* ```
*/
var overlayPaddingReset = { reset: {
	"--container-padding-inline-start": "xrhngw9",
	"--container-padding-inline-end": "xjsfl84",
	"--container-padding-block-start": "x1047aw6",
	"--container-padding-block-end": "xax9j7h",
	"--layout-padding-outer-x": "xdt8ak2",
	"--layout-padding-outer-y": "x1rs4lu4",
	"--layout-padding-own-outer-x": "x1vii845",
	"--layout-padding-own-outer-y": "xojybgt",
	"--layout-padding-inner-x": "x1qfll2g",
	"--layout-padding-inner-y": "xyvxpqs",
	"--_section-padding-propagated": "x1f17rg1",
	$$css: true
} };
//#endregion
//#region node_modules/@astryxdesign/core/dist/Layer/useLayer.js
/**
* @file useLayer.tsx
* @input Uses React hooks, Popover API, CSS anchor positioning, shared text/provider boundaries
* @output Exports the public useLayer hook plus internal trigger helpers.
* @position Core layer utility; used by useHoverCard, useTooltip, etc.
*
* SYNC: When modified, update:
* - /packages/core/src/Layer/useLayer.doc.mjs
* - /packages/core/src/Layer/useLayer.test.tsx
* - /packages/core/src/Layer/index.ts
*/
var _temp$8 = {
	keoZOQ: "x1vhfslr",
	k1K539: "x119uzjn",
	"$$css": true
};
var _temp2$4 = {
	keoZOQ: "x1lhixnp",
	k1K539: "xlm3tn6",
	"$$css": true
};
var _temp3$3 = {
	k71WvV: "xa3ewmy",
	"$$css": true
};
var _temp4$1 = {
	keTefX: "x1cytvie",
	"$$css": true
};
var styles$36 = {
	base: {
		keoZOQ: "xdj266r",
		k1K539: "xat24cr",
		keTefX: "x1lziwak",
		k71WvV: "x14z9mp",
		kLKAdn: "xexx8yu",
		kGO01o: "x18d9i69",
		kZCmMZ: "x1c1uobl",
		kwRFfy: "xyri2b",
		kMzoRj: "xc342km",
		ksu8eU: "xng3xce",
		kVQacm: "x1rea2x4",
		kWkggS: "xjbqb8w",
		$$css: true
	},
	fixed: {
		kVAEAm: "xixxii4",
		$$css: true
	},
	placementBelow: (offset) => [_temp$8, { "--x-marginBlockStart": ((val) => typeof val === "number" ? val + "px" : val != null ? val : void 0)(offset) }],
	placementAbove: (offset) => [_temp2$4, { "--x-marginBlockEnd": ((val) => typeof val === "number" ? val + "px" : val != null ? val : void 0)(offset) }],
	placementEnd: (offset) => [
		_temp3$3,
		{
			keTefX: offset != null ? "x4lel18" : offset,
			$$css: true
		},
		{ "--x-marginInlineStart": ((val) => typeof val === "number" ? val + "px" : val != null ? val : void 0)(offset) }
	],
	placementStart: (offset) => [
		_temp4$1,
		{
			k71WvV: offset != null ? "x1c9tiao" : offset,
			$$css: true
		},
		{ "--x-marginInlineEnd": ((val) => typeof val === "number" ? val + "px" : val != null ? val : void 0)(offset) }
	],
	farBelow: {
		k1K539: "x119uzjn",
		$$css: true
	},
	farAbove: {
		keoZOQ: "x1lhixnp",
		$$css: true
	},
	farEnd: {
		k71WvV: "xa3ewmy",
		$$css: true
	},
	farStart: {
		keTefX: "x1cytvie",
		$$css: true
	},
	viewportFit: {
		kB7OPa: "x9f619",
		ks0D6T: "xc0b1yq",
		kskxy: "x3v4n1",
		$$css: true
	},
	gutterInlineEnd: {
		k71WvV: "x144kxal",
		$$css: true
	},
	gutterInlineStart: {
		keTefX: "xpdk1p0",
		$$css: true
	},
	gutterBlockEnd: {
		k1K539: "x3z50q0",
		$$css: true
	},
	gutterBlockStart: {
		keoZOQ: "x1j6tnbc",
		$$css: true
	}
};
/**
* Props for a control that sits on the trigger but must not dismiss the layer.
*/
/**
* Position placement relative to anchor.
* Logical: start/end resolve against the popover's own inherited direction
* via CSS (RTL contexts mirror automatically, no JS involved).
*/
/**
* Alignment along the placement axis
*/
/**
* Render props for context mode (anchor positioning)
*/
/**
* Render props for fixed mode (manual coordinates)
*/
/**
* Base options shared by both modes
*/
/**
* Options for context mode (CSS anchor positioning)
*/
/**
* Options for fixed mode (manual positioning)
*/
/**
* Return type for context mode
*/
/**
* Return type for fixed mode
*/
function toCssLength(value) {
	return typeof value === "number" ? `${value}px` : value;
}
/**
* Popover operations in flight, per document.
*
* The Popover API refuses to show a popover while the document is in the
* middle of showing or hiding ANY popover: `showPopover()` throws an
* `InvalidStateError` ("Invalid to show a popover during another show
* operation"); an engine still rolling the rule out instead refuses silently
* with a console warning, which would leave this hook open with nothing
* shown. Hiding a popover restores focus to the element that had it —
* synchronously, inside that window — so a focus-driven layer on the element
* receiving focus (a tooltip on the trigger that just closed a popover) asks
* to show while the hide is still running. Every layer's show and hide passes
* through here, so the window is observable: a `show()` that arrives inside
* it is replayed in a microtask, which runs once the script that started the
* operation — and the event dispatch it answered — has unwound.
*/
var popoverOperationsByDocument = /* @__PURE__ */ new WeakMap();
function runPopoverOperation(doc, operation) {
	popoverOperationsByDocument.set(doc, (popoverOperationsByDocument.get(doc) ?? 0) + 1);
	try {
		operation();
	} finally {
		popoverOperationsByDocument.set(doc, (popoverOperationsByDocument.get(doc) ?? 1) - 1);
	}
}
function isPopoverOperationInFlight(doc) {
	return (popoverOperationsByDocument.get(doc) ?? 0) > 0;
}
function readPortalWritingContext(element, portalTarget) {
	const view = element.ownerDocument.defaultView;
	if (!view) return {};
	const sourceStyle = view.getComputedStyle(element);
	const targetStyle = view.getComputedStyle(portalTarget);
	return {
		...sourceStyle.direction !== targetStyle.direction && { direction: sourceStyle.direction },
		...sourceStyle.writingMode !== targetStyle.writingMode && { writingMode: sourceStyle.writingMode }
	};
}
/**
* Map logical placement/alignment to a CSS position-area value.
*
* Uses the self-* logical keyword family: the inline axis resolves against
* the popover's own direction (inherited inline or preserved when portaled),
* so it mirrors in RTL without placement-specific JS. The block axis is
* direction-neutral but must come from the same keyword family — mixing
* physical `top` with `self-inline-*` produces an invalid position-area
* (computes to `none`, which pins the popover to the viewport corner because
* styles.base zeroes the UA margins).
*
* Note the plain logical family (`inline-start`, no `self-`) is NOT a
* substitute: it resolves against the containing block — the page root for
* a top-layer popover — so it ignores `direction` set on a subtree, which
* is exactly #3389's repro.
*/
function getPositionArea(placement = "above", alignment = "center") {
	if (placement === "above" || placement === "below") {
		const block = placement === "above" ? "self-block-start" : "self-block-end";
		if (alignment === "start") return `${block} span-self-inline-end`;
		if (alignment === "end") return `${block} span-self-inline-start`;
		return block;
	}
	const inline = placement === "start" ? "self-inline-start" : "self-inline-end";
	if (alignment === "start") return `${inline} span-self-block-end`;
	if (alignment === "end") return `${inline} span-self-block-start`;
	return inline;
}
/**
* Compute the `position-try-fallbacks` list for a placement/alignment pair
* (spec:AST-059 FR4).
*
* Flips first; they mirror the placement-axis margins (clearance and gutter)
* and the alignment-axis gutter with the area. Then the slide: named
* `@position-try` options whose area spans the whole alignment axis
* (`layerSlideRules.ts`), same side of the trigger first, opposite side
* second. Flips alone cannot rescue a layer wider than the room on either
* side of its trigger — every flipped option overflows the alignment axis
* too, and the browser keeps the base option, so the layer never moves to the
* side of the trigger that has room on the placement axis (#3671 for centered
* layers, where a flip maps center → center). A slide option fits wherever
* the layer fits the viewport; its anchor-center alignment plus the browser's
* overflow shift keep the layer's margin box — and so the gutter on both
* edges — inside the viewport. Centered layers keep their one-sided spans
* ahead of the full span so they slide the least distance first.
*/
function getPositionTryFallbacks(placement = "above", alignment = "center") {
	const flips = "flip-block, flip-inline, flip-block flip-inline";
	const slides = `${slideRuleName(placement, alignment, "same")}, ${slideRuleName(placement, alignment, "opposite")}`;
	if (alignment !== "center") return `${flips}, ${slides}`;
	if (placement === "above" || placement === "below") {
		const [same, opposite] = placement === "above" ? ["top", "bottom"] : ["bottom", "top"];
		return `${flips}, ${same} span-left, ${same} span-right, ${opposite} span-left, ${opposite} span-right, ${slides}`;
	}
	const [same, opposite] = placement === "start" ? ["left", "right"] : ["right", "left"];
	return `${flips}, ${same} span-top, ${same} span-bottom, ${opposite} span-top, ${opposite} span-bottom, ${slides}`;
}
/**
* The self-alignment an aligned layer uses while its anchor is out of view
* (spec:AST-059 FR5). A position-area box that overflows the room beside its
* anchor is shifted by default to stay inside the viewport — the slide an
* aligned layer relies on when it fits on neither side (FR4). Once the anchor
* has left the viewport that shift would pin the layer into the narrowest
* strip at the edge, so the alignment is pinned `unsafe` toward the anchor
* instead and the layer holds the position its flips give it. `self-*`
* keywords resolve against the layer's own direction, matching the `self-*`
* position-area family; the flip tactics swap start/end with the area.
*
* Centered layers already slide through their span fallbacks and are
* unchanged; a visible anchor keeps the browser's default alignment.
*/
function getSelfAlignment(placement, alignment, isAnchorInView) {
	if (isAnchorInView || alignment === "center") return {};
	const edge = alignment === "start" ? "unsafe self-start" : "unsafe self-end";
	return placement === "above" || placement === "below" ? { justifySelf: edge } : { alignSelf: edge };
}
/**
* The gutter styles for a placement/alignment pair: the far viewport edge of
* the alignment axis, or both edges when centered (spec:AST-059 FR1).
*/
function getGutterStyles(placement, alignment) {
	if (placement === "above" || placement === "below") {
		if (alignment === "start") return [styles$36.gutterInlineEnd];
		if (alignment === "end") return [styles$36.gutterInlineStart];
		return [styles$36.gutterInlineStart, styles$36.gutterInlineEnd];
	}
	if (alignment === "start") return [styles$36.gutterBlockEnd];
	if (alignment === "end") return [styles$36.gutterBlockStart];
	return [styles$36.gutterBlockStart, styles$36.gutterBlockEnd];
}
/**
* Core layer hook that handles popover behavior and positioning.
*
* Supports two positioning modes with type-safe render props:
* - `context`: CSS anchor positioning relative to a trigger element
* - `fixed`: Fixed positioning at specified coordinates
*
* @example
* ```
* const layer = useLayer({ mode: 'context' });
* <button ref={layer.ref}>Trigger</button>
* {layer.render(<Content />, { placement: 'above', alignment: 'center' })}
* ```
*/
function useLayerImplementation(options) {
	const { mode, onShow, onHide, lightDismiss = false } = options;
	const lazyMount = mode === "context" ? options.lazyMount ?? false : false;
	const id = (0, import_react.useId)();
	const anchorId = `--astryx-layer-${id.replace(/:/g, "")}`;
	const [isOpen, setIsOpen] = (0, import_react.useState)(false);
	const [isAnchorInView, setIsAnchorInView] = (0, import_react.useState)(true);
	const isAnchorInViewRef = (0, import_react.useRef)(true);
	const updateAnchorInView = (0, import_react.useCallback)((inView) => {
		if (isAnchorInViewRef.current !== inView) {
			isAnchorInViewRef.current = inView;
			setIsAnchorInView(inView);
		}
	}, []);
	const declaredInset = useLayerContext()?.inset;
	const popoverRef = (0, import_react.useRef)(null);
	const openedPopoverRef = (0, import_react.useRef)(null);
	const triggerRef = (0, import_react.useRef)(null);
	const sentinelRef = (0, import_react.useRef)(null);
	const contextMountRef = (0, import_react.useRef)(null);
	const [contextMount, setContextMount] = (0, import_react.useState)(null);
	const pendingShowRef = (0, import_react.useRef)(false);
	const isOpenRef = (0, import_react.useRef)(false);
	const dismissedByGestureRef = (0, import_react.useRef)(null);
	const forgetDismissalRef = (0, import_react.useRef)(null);
	const wasJustDismissed = (0, import_react.useCallback)(() => {
		const gesture = currentGesture();
		return dismissedByGestureRef.current === gesture;
	}, []);
	const showPopoverElement = (0, import_react.useCallback)((popover) => {
		if (typeof popover.showPopover === "function") runPopoverOperation(popover.ownerDocument, () => {
			const trigger = triggerRef.current instanceof HTMLElement ? triggerRef.current : void 0;
			popover.showPopover({ source: trigger });
		});
		else popover.style.display = "block";
		openedPopoverRef.current = popover;
	}, []);
	const isCurrentContextPopover = (0, import_react.useCallback)((popover) => {
		if (mode !== "context") return true;
		const mount = contextMountRef.current;
		if (mount === null) return false;
		const expectedParent = mount.portalTarget ?? sentinelRef.current?.parentElement ?? null;
		return popover.parentElement === expectedParent;
	}, [mode]);
	const requestContextMount = (0, import_react.useCallback)(() => {
		if (mode !== "context") return;
		const sentinel = sentinelRef.current;
		const inlineParent = sentinel?.parentElement ?? null;
		if (!sentinel || !inlineParent) return;
		const portalTarget = resolveLayerPortalTarget(inlineParent);
		const mount = {
			portalTarget,
			portalStyle: portalTarget ? readPortalWritingContext(sentinel, portalTarget) : {}
		};
		contextMountRef.current = mount;
		setContextMount(mount);
	}, [mode]);
	const clearContextMount = (0, import_react.useCallback)(() => {
		if (mode !== "context" || !lazyMount) return;
		contextMountRef.current = null;
		setContextMount(null);
	}, [mode, lazyMount]);
	const show = (0, import_react.useCallback)(() => {
		if (wasJustDismissed()) return;
		const candidate = popoverRef.current;
		const popover = candidate && isCurrentContextPopover(candidate) ? candidate : null;
		if (!popover) {
			pendingShowRef.current = true;
			requestContextMount();
			return;
		}
		if (!isOpenRef.current) {
			if (isPopoverOperationInFlight(popover.ownerDocument)) {
				pendingShowRef.current = true;
				queueMicrotask(() => {
					if (pendingShowRef.current) {
						pendingShowRef.current = false;
						showRef.current();
					}
				});
				return;
			}
			showPopoverElement(popover);
			isOpenRef.current = true;
			setIsOpen(true);
			onShow?.();
		}
	}, [
		onShow,
		requestContextMount,
		showPopoverElement,
		isCurrentContextPopover,
		wasJustDismissed
	]);
	const hide = (0, import_react.useCallback)(() => {
		pendingShowRef.current = false;
		if (isOpenRef.current) {
			const el = popoverRef.current;
			openedPopoverRef.current = null;
			isOpenRef.current = false;
			if (el) {
				if (typeof el.hidePopover === "function") runPopoverOperation(el.ownerDocument, () => {
					el.hidePopover();
				});
				else el.style.display = "none";
			}
			setIsOpen(false);
			onHide?.();
		}
		clearContextMount();
	}, [onHide, clearContextMount]);
	const showRef = (0, import_react.useRef)(show);
	showRef.current = show;
	const contextRef = (0, import_react.useCallback)((el) => {
		if (triggerRef.current && triggerRef.current !== el) removeAnchorName(triggerRef.current, anchorId);
		if (el) addAnchorName(el, anchorId);
		triggerRef.current = el;
	}, [anchorId]);
	const rememberDismissal = (0, import_react.useCallback)((doc) => {
		forgetDismissalRef.current?.();
		if (currentGestureHasClicked()) return;
		dismissedByGestureRef.current = currentGesture();
		const view = doc.defaultView;
		let forgetTimer = null;
		const forget = () => {
			dismissedByGestureRef.current = null;
			doc.removeEventListener("click", scheduleForget, true);
			if (forgetTimer !== null) {
				view?.clearTimeout(forgetTimer);
				forgetTimer = null;
			}
			if (forgetDismissalRef.current === forget) forgetDismissalRef.current = null;
		};
		const scheduleForget = () => {
			doc.removeEventListener("click", scheduleForget, true);
			if (view) forgetTimer = view.setTimeout(() => {
				forgetTimer = null;
				if (forgetDismissalRef.current === forget) forget();
			}, 0);
			else forget();
		};
		doc.addEventListener("click", scheduleForget, true);
		forgetDismissalRef.current = forget;
	}, []);
	(0, import_react.useEffect)(() => {
		currentGesture();
		return () => forgetDismissalRef.current?.();
	}, []);
	const handleToggle = (0, import_react.useCallback)((e) => {
		if (e.newState === "closed" && isOpenRef.current) {
			openedPopoverRef.current = null;
			isOpenRef.current = false;
			rememberDismissal(e.currentTarget?.ownerDocument ?? document);
			setIsOpen(false);
			onHide?.();
			clearContextMount();
		}
	}, [
		onHide,
		clearContextMount,
		rememberDismissal
	]);
	const listenedElRef = (0, import_react.useRef)(null);
	const listenedHandlerRef = (0, import_react.useRef)(null);
	const bindToggleListener = (0, import_react.useCallback)((el, handler) => {
		if (listenedElRef.current && listenedHandlerRef.current && (listenedElRef.current !== el || listenedHandlerRef.current !== handler)) {
			listenedElRef.current.removeEventListener("toggle", listenedHandlerRef.current);
			listenedElRef.current = null;
			listenedHandlerRef.current = null;
		}
		if (el && listenedElRef.current !== el) {
			el.addEventListener("toggle", handler);
			listenedElRef.current = el;
			listenedHandlerRef.current = handler;
		}
	}, []);
	const popoverRefCallback = (0, import_react.useCallback)((el) => {
		popoverRef.current = el;
		bindToggleListener(el, handleToggle);
		if (el && pendingShowRef.current) {
			pendingShowRef.current = false;
			show();
		} else if (el && isOpenRef.current && openedPopoverRef.current !== el && isCurrentContextPopover(el)) showPopoverElement(el);
	}, [
		handleToggle,
		bindToggleListener,
		show,
		showPopoverElement,
		isCurrentContextPopover
	]);
	const sentinelRefCallback = (0, import_react.useCallback)((el) => {
		sentinelRef.current = el;
		if (el && (!lazyMount || pendingShowRef.current || isOpenRef.current)) requestContextMount();
	}, [lazyMount, requestContextMount]);
	(0, import_react.useEffect)(() => {
		if (popoverRef.current) bindToggleListener(popoverRef.current, handleToggle);
		return () => {
			if (listenedElRef.current && listenedHandlerRef.current) {
				listenedElRef.current.removeEventListener("toggle", listenedHandlerRef.current);
				listenedElRef.current = null;
				listenedHandlerRef.current = null;
			}
		};
	}, [handleToggle, bindToggleListener]);
	useIsomorphicLayoutEffect(() => {
		if (mode !== "context") return;
		const doc = popoverRef.current?.ownerDocument ?? sentinelRef.current?.ownerDocument;
		if (doc) ensureSlideRules(doc);
	}, [mode, contextMount]);
	useIsomorphicLayoutEffect(() => {
		if (!isOpen || mode !== "context") return;
		const anchor = triggerRef.current;
		if (!anchor) return;
		const view = anchor.ownerDocument.defaultView;
		if (view) {
			const rect = anchor.getBoundingClientRect();
			const inView = rect.bottom >= 0 && rect.right >= 0 && rect.top <= view.innerHeight && rect.left <= view.innerWidth;
			updateAnchorInView(inView);
		}
		if (typeof IntersectionObserver === "undefined") return;
		const observer = new IntersectionObserver((entries) => {
			const latest = entries[entries.length - 1];
			if (latest) updateAnchorInView(latest.isIntersecting);
		});
		observer.observe(anchor);
		return () => observer.disconnect();
	}, [
		isOpen,
		mode,
		updateAnchorInView
	]);
	const renderContext = (0, import_react.useCallback)((children, props$18) => {
		const sentinel = /*#__PURE__*/ (0, import_jsx_runtime.jsx)("template", { ref: sentinelRefCallback });
		if (contextMount === null) return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: sentinel });
		const { placement = "above", alignment = "center", positioning = "anchor", offset, role, "aria-label": ariaLabel, xstyle, className: extraClassName, style: extraStyle, as: Container = "div", onMouseEnter, onMouseLeave } = props$18 || {};
		const anchorStyle = positioning === "custom" ? { positionAnchor: anchorId } : {
			positionAnchor: anchorId,
			positionArea: getPositionArea(placement, alignment),
			positionTryFallbacks: getPositionTryFallbacks(placement, alignment),
			...getSelfAlignment(placement, alignment, isAnchorInView)
		};
		const clearance = offset ? toCssLength(offset) : null;
		const clearanceProperty = positioning === "anchor" && clearance != null ? { [LAYER_CLEARANCE_PROPERTY]: clearance } : {};
		const offsetStyle = positioning !== "anchor" ? null : clearance == null ? placement === "above" ? styles$36.farAbove : placement === "below" ? styles$36.farBelow : placement === "start" ? styles$36.farStart : styles$36.farEnd : placement === "above" ? styles$36.placementAbove(clearance) : placement === "below" ? styles$36.placementBelow(clearance) : placement === "start" ? styles$36.placementStart(clearance) : styles$36.placementEnd(clearance);
		const viewportStyles = positioning === "anchor" ? [styles$36.viewportFit, ...getGutterStyles(placement, alignment)] : null;
		const stylexResult = props(layerTextReset.reset, layerStructureReset.reset, styles$36.base, overlayPaddingReset.reset, viewportStyles, offsetStyle, xstyle);
		const combinedClassName = extraClassName ? `${extraClassName} ${stylexResult.className ?? ""}` : stylexResult.className;
		const layer = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Container, {
			ref: popoverRefCallback,
			id,
			role,
			"aria-label": ariaLabel,
			popover: lightDismiss ? "auto" : "manual",
			className: combinedClassName,
			style: {
				...stylexResult.style,
				...anchorStyle,
				...clearanceProperty,
				...layerInsetProperties(declaredInset),
				...contextMount.portalStyle,
				...extraStyle
			},
			onMouseEnter,
			onMouseLeave,
			children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(LayerContentBoundary, { children })
		});
		return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [sentinel, contextMount.portalTarget ? /*#__PURE__*/ (0, import_react_dom.createPortal)(layer, contextMount.portalTarget) : layer] });
	}, [
		anchorId,
		contextMount,
		declaredInset,
		id,
		isAnchorInView,
		lightDismiss,
		popoverRefCallback,
		sentinelRefCallback
	]);
	const renderFixed = (0, import_react.useCallback)((children, props$19) => {
		const { x, y, xstyle, className: extraClassName, style: extraStyle } = props$19;
		const positionStyle = {
			top: y,
			left: x
		};
		const stylexResult = props(layerTextReset.reset, layerStructureReset.reset, styles$36.base, overlayPaddingReset.reset, styles$36.fixed, xstyle);
		const combinedClassName = extraClassName ? `${extraClassName} ${stylexResult.className ?? ""}` : stylexResult.className;
		return /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
			ref: popoverRefCallback,
			id,
			popover: lightDismiss ? "auto" : "manual",
			className: combinedClassName,
			style: {
				...stylexResult.style,
				...positionStyle,
				...extraStyle
			},
			children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(LayerContentBoundary, { children })
		});
	}, [
		popoverRefCallback,
		id,
		lightDismiss
	]);
	const contextResult = (0, import_react.useMemo)(() => ({
		ref: contextRef,
		anchorId,
		show,
		hide,
		isOpen,
		wasJustDismissed,
		id,
		render: renderContext
	}), [
		contextRef,
		anchorId,
		show,
		hide,
		isOpen,
		wasJustDismissed,
		id,
		renderContext
	]);
	const fixedResult = (0, import_react.useMemo)(() => ({
		ref: void 0,
		show,
		hide,
		isOpen,
		wasJustDismissed,
		id,
		render: renderFixed
	}), [
		show,
		hide,
		isOpen,
		wasJustDismissed,
		id,
		renderFixed
	]);
	return mode === "context" ? contextResult : fixedResult;
}
function useLayer(options) {
	const internalLayer = useLayerImplementation(options);
	return (0, import_react.useMemo)(() => {
		const { wasJustDismissed: _, ...layer } = internalLayer;
		return layer;
	}, [internalLayer]);
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/Layer/useTouchTrigger.js
/**
* @file useTouchTrigger.ts
* @input Touch trigger mode, layer open state, trigger ref, show/hide callbacks
* @output Exports useTouchTrigger hook, isActionTrigger, LayerTouchTrigger type
* @position Layer hook; shared touch behavior for useTooltip and useHoverCard
*
* SYNC: When modified, update:
* - /packages/core/src/Layer/index.ts
*
* Hover is the one trigger a touch screen cannot express. A tap synthesizes
* `mouseenter`, so an untreated hover layer either opens on every tap and
* lingers with nothing to close it, or swallows the tap the user aimed at the
* control underneath.
*
* What the trigger DOES decides which of those the tap deserves. A trigger
* that performs an action — a button, a link, a form control — keeps its tap:
* the layer stays shut, because the tap already has somewhere to go and a hint
* about a control the user just operated is noise. A trigger that performs no
* action — an info icon, an abbreviation, a truncated label — has nothing to
* lose, so the tap opens the layer and the next tap outside dismisses it. That
* is `auto`; `tap` and `none` state the choice outright, which is what an
* icon-button whose only job is to reveal the layer needs.
*/
/**
* How a hover layer behaves on a touch pointer.
*
* - `auto`: tap-to-open, unless the trigger performs an action of its own
* - `tap`: always tap-to-open, even on a trigger that performs an action
* - `none`: never open on touch
*/
/**
* Pointer types whose *press* is a tap rather than a click.
*
* A pen belongs here but not in the arrival path: in detection range it hovers
* — firing `pointerenter`/`pointermove` with no contact, exactly as a mouse
* does, on a device where `(hover: hover)` matches — and only becomes a tap
* once it lands. See `handlePointerEnter`.
*/
var TOUCH_POINTER_TYPES = /* @__PURE__ */ new Set(["touch", "pen"]);
/**
* ARIA roles that make an element do something when activated. An explicit
* role wins over the tag: `<button role="presentation">` is scenery, and a
* `<span role="button">` is a real control.
*/
var ACTION_ROLES = /* @__PURE__ */ new Set([
	"button",
	"checkbox",
	"combobox",
	"link",
	"menuitem",
	"menuitemcheckbox",
	"menuitemradio",
	"option",
	"radio",
	"searchbox",
	"slider",
	"spinbutton",
	"switch",
	"tab",
	"textbox"
]);
/**
* Whether activating this element does something other than reveal the layer.
*
* Deliberately narrower than "focusable": the wrapper a text-only Tooltip
* renders carries `tabindex=0` so keyboard users can reach the hint, and it
* still performs no action.
*
* True only decides that the layer stays shut — the tap itself is never
* swallowed. Nothing here calls `preventDefault` or `stopPropagation`, so an
* inert trigger that happens to carry its own `onClick` (a `<div onClick>`
* with no role) gets both: the layer opens and the handler runs.
*/
function isActionTrigger(element) {
	const role = element.getAttribute("role");
	if (role != null && role !== "") return ACTION_ROLES.has(role);
	switch (element.tagName) {
		case "BUTTON":
		case "INPUT":
		case "LABEL":
		case "SELECT":
		case "SUMMARY":
		case "TEXTAREA": return true;
		case "A":
		case "AREA": return element.hasAttribute("href");
		default: return isEditable(element);
	}
}
/**
* Whether typing into this element edits it. Reads the attribute as well as
* the property: jsdom does not implement `isContentEditable`, and an editor
* that is an action in the browser must not be inert under test.
*/
function isEditable(element) {
	if (element.isContentEditable === true) return true;
	const attribute = element.getAttribute("contenteditable");
	return attribute != null && attribute !== "false";
}
/**
* Touch behavior shared by the hover layers.
*
* @example
* ```
* const touch = useTouchTrigger({
*   touchTrigger,
*   isEnabled,
*   isControlled: isOpen !== undefined,
*   isOpen: layer.isOpen,
*   layerId: layer.id,
*   triggerRef,
*   show: showNow,
*   hide: hideNow,
* });
* ```
*/
function useTouchTrigger(options) {
	const { touchTrigger, isEnabled, isControlled, isOpen, layerId, triggerRef, show, hide } = options;
	const isTouchPointerRef = (0, import_react.useRef)(false);
	const isOpenRef = (0, import_react.useRef)(isOpen);
	isOpenRef.current = isOpen;
	const hideRef = (0, import_react.useRef)(hide);
	hideRef.current = hide;
	const layerIdRef = (0, import_react.useRef)(layerId);
	layerIdRef.current = layerId;
	const isTapOpenRef = (0, import_react.useRef)(false);
	const outsideListenerRef = (0, import_react.useRef)(null);
	useInteractionModalityTracking();
	const disarmOutsideDismiss = (0, import_react.useCallback)(() => {
		isTapOpenRef.current = false;
		const listener = outsideListenerRef.current;
		if (listener == null) return;
		outsideListenerRef.current = null;
		document.removeEventListener("pointerdown", listener, true);
	}, []);
	const armOutsideDismiss = (0, import_react.useCallback)(() => {
		isTapOpenRef.current = true;
		if (outsideListenerRef.current != null) return;
		const handleOutsidePointerDown = (event) => {
			const target = event.target;
			if (target != null) {
				if (triggerRef.current?.contains(target) === true) return;
				if (document.getElementById(layerIdRef.current)?.contains(target) === true) return;
			}
			disarmOutsideDismiss();
			hideRef.current();
		};
		outsideListenerRef.current = handleOutsidePointerDown;
		document.addEventListener("pointerdown", handleOutsidePointerDown, true);
	}, [triggerRef, disarmOutsideDismiss]);
	(0, import_react.useEffect)(() => disarmOutsideDismiss, [disarmOutsideDismiss]);
	const isTouchInteraction = (0, import_react.useCallback)(() => isTouchPointerRef.current && getInteractionModality() === "pointer", []);
	const handlePointerEnter = (0, import_react.useCallback)((event) => {
		isTouchPointerRef.current = event.pointerType === "touch";
	}, []);
	const handlePointerDown = (0, import_react.useCallback)((event) => {
		const isTouch = TOUCH_POINTER_TYPES.has(event.pointerType);
		isTouchPointerRef.current = isTouch;
		if (!isTouch || isControlled) return false;
		const trigger = triggerRef.current;
		if ((touchTrigger === "auto" ? trigger != null && isActionTrigger(trigger) ? "none" : "tap" : touchTrigger) === "none" || !isEnabled) {
			disarmOutsideDismiss();
			hide();
			return true;
		}
		if (isOpenRef.current || isTapOpenRef.current) {
			disarmOutsideDismiss();
			hide();
			return true;
		}
		armOutsideDismiss();
		show();
		return true;
	}, [
		touchTrigger,
		isEnabled,
		isControlled,
		triggerRef,
		show,
		hide,
		armOutsideDismiss,
		disarmOutsideDismiss
	]);
	const wasOpenRef = (0, import_react.useRef)(isOpen);
	(0, import_react.useEffect)(() => {
		if (wasOpenRef.current && !isOpen) disarmOutsideDismiss();
		wasOpenRef.current = isOpen;
	}, [isOpen, disarmOutsideDismiss]);
	return {
		isTouchPointerRef,
		isTouchInteraction,
		handlePointerEnter,
		handlePointerDown,
		clearTapOpen: disarmOutsideDismiss
	};
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/Layer/layerAnimations.stylex.js
durationVars["--duration-fast-max"], easeVars["--ease-standard"];
/**
* Shared entry animation styles for layer-based components.
*
* Keyed by LayerPlacement ('above' | 'below' | 'start' | 'end')
* for easy lookup: `layerAnimations[placement]`.
*
* Each entry disables its keyframe animation under
* `prefers-reduced-motion: reduce` so the layer appears instantly instead of
* translating/scaling in (infra-6).
*/
var layerAnimations = {
	below: {
		kKVMdj: "xl1vlw0 x1aquc0h",
		k44tkh: "x9uej1z",
		kyAemX: "x128ha8g",
		kWV6AL: "xskzprw",
		$$css: true
	},
	above: {
		kKVMdj: "x3psbcj x1aquc0h",
		k44tkh: "x9uej1z",
		kyAemX: "x128ha8g",
		kWV6AL: "xskzprw",
		$$css: true
	},
	end: {
		kKVMdj: "x1i331go x1vxsm5i x1aquc0h",
		k44tkh: "x9uej1z",
		kyAemX: "x128ha8g",
		kWV6AL: "xskzprw",
		$$css: true
	},
	start: {
		kKVMdj: "xck01x9 x18lne9g x1aquc0h",
		k44tkh: "x9uej1z",
		kyAemX: "x128ha8g",
		kWV6AL: "xskzprw",
		$$css: true
	}
};
//#endregion
//#region node_modules/@astryxdesign/core/dist/Layer/LayerDepthContext.js
/**
* @file LayerDepthContext.tsx
* @input React depth context
* @output Exports LayerDepthContext, useLayerDepth, LayerDepthProvider
* @position Layer system; how the dismissal stack learns which layer is nested
*   inside which.
*
* SYNC: When modified, update:
* - /packages/core/src/Layer/index.ts
* - /packages/core/src/Layer/useLayerDismissal.ts
*
* Nesting is read from the React tree rather than the DOM. Two reasons:
*
* - **Portals.** A nested overlay routinely renders into `document.body` or the
*   native top layer, so DOM containment reports it as a sibling of the layer
*   it is logically inside. React context flows through `createPortal`, so the
*   tree keeps the relationship the DOM loses.
* - **Same-commit mounts.** Depth is fixed during render. Effect order is not
*   available then and is misleading anyway: React runs child effects before
*   parent effects, so an inner layer registers first and looks "older" than
*   the outer layer that contains it.
*
* There is nothing to mount at the app root: the context defaults to 0, and
* each layer provides depth for its OWN content, so nesting composes on its own.
*/
/**
* How many layers deep the current subtree is. 0 at the app root; each layer
* increments it for its own content.
*/
var LayerDepthContext = /*#__PURE__*/ (0, import_react.createContext)(0);
LayerDepthContext.displayName = "LayerDepthContext";
/**
* Read the current nesting depth. A layer calls this to learn its OWN depth —
* the depth of the subtree it is rendered into, before it pushes its content
* one level deeper.
*/
function useLayerDepth() {
	return (0, import_react.use)(LayerDepthContext);
}
/**
* Wrap a layer's content so any layer opened from inside it registers as
* nested. Takes no depth prop on purpose: it reads the ambient depth and adds
* one, so nesting composes without anyone tracking absolute numbers.
*
* Renders no DOM element — it is a context boundary only, which is why it takes
* no `xstyle`/`ref` and exposes no props interface.
*/
function LayerDepthProvider({ children }) {
	const depth = (0, import_react.use)(LayerDepthContext);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(LayerDepthContext, {
		value: depth + 1,
		children
	});
}
LayerDepthProvider.displayName = "LayerDepthProvider";
//#endregion
//#region node_modules/@astryxdesign/core/dist/Layer/layerStack.js
/**
* @file layerStack.ts
* @input Uses the isImeKeyEvent predicate from utils/ime
* @output Exports the shared layer dismissal stack: registration, top-most
*   ordering, the document-level Escape listener, and its internal local-event
*   dispatcher
* @position Internal to the Layer system; consumed by useLayerDismissal, which
*   is what overlays actually call. Not exported from the package root.
*
* SYNC: When modified, update:
* - /packages/core/src/Layer/useLayerDismissal.ts
* - /packages/core/src/Layer/useLayerDismissal.test.tsx
*
* ## Why one stack
*
* Every overlay used to own its own Escape listener, so one press dismissed
* every open layer (a popover inside a Dialog closed both; a Modal opened from
* inside another Modal closed both). Patching this per primitive produced
* parallel registries — the focus-trap Escape stack, Drawer's LIFO registry,
* useScrollLock's counter. This module is the single registry those collapse
* into. One press dismisses exactly one layer.
*
* ## Only the top layer acts
*
* The stack owns ONE `keydown` listener on `document` and routes the press to
* the top-most layer itself. Overlays do not listen; they register and say what
* they want done. The alternative — every layer listens and filters itself out
* — is what forces `stopPropagation()` choreography between element-level and
* document-level listeners, and it silently breaks whenever a layer forgets.
*
* ## Bubble phase, not capture
*
* The listener is on the BUBBLE phase so content inside a layer can claim the
* press first, either by `stopPropagation()` (the press never reaches the
* document listener) or by `preventDefault()` (we see it and stand down).
* A host whose public event prop can stop propagation may route the still-
* unprevented event through `dispatchLayerEscapeKeyDown` at its own boundary;
* the same stack still chooses the owner. Editors are why `preventDefault()`
* remains the explicit cancellation signal: their own Escape action must win.
*
* ## The stack, not the browser, decides
*
* When the stack handles a press it calls `preventDefault()`, which suppresses
* the browser's own close-watcher behavior — both `<dialog>`'s `cancel` event
* and `popover="auto"` light-dismiss (verified in Chromium; the default action
* runs after propagation, so a bubble-phase `preventDefault` still beats it).
* That is deliberate: the native top layer only covers `showModal()` and
* `popover="auto"`, so relying on it would leave non-modal `show()` drawers,
* `popover="manual"` layers, and older browsers on a second, differently-behaved
* code path. One code path, one ordering, everywhere.
*
* ## An Escape that cancels an IME composition
*
* That press is not a dismissal, so no layer acts on it — but the stack still
* claims it, because an unclaimed Escape is exactly what makes the browser
* raise a close request, and that request dismisses the layer through its
* `cancel` handler on the same keypress. Claiming is the whole fix; the guard
* that only returns measures identically to no guard at all.
*
* Close requests that arrive with no keydown to read — the Android back
* gesture, the platform close watcher — are answered by the hosts, which ask
* `isTextComposing()` through `useLayerDismissal`.
*/
/**
* What a layer does with an Escape press that reaches it.
*
* - `'close'` — dismiss this layer and consume the press. One Escape closes
*   exactly this layer. The default, and correct for every dismissible layer:
*   modals, popovers, menus, comboboxes, and hover layers alike.
* - `'block'` — consume the press WITHOUT dismissing. For a layer that requires
*   an explicit choice (`Dialog purpose="required"`): Escape must not dismiss
*   it, and must not fall through and dismiss something behind it either.
*
* There is deliberately no "dismiss but let the press continue" variant. Escape
* affects exactly one layer, always — a rule with no per-component exceptions
* is one users can predict. Hover layers were the tempting exception (the user
* never opened the tip, so why should it eat their press?), but guessing wrong
* that way is destructive: someone dismissing a stray tooltip over a form would
* lose the whole dialog. Guessing wrong the other way costs one keystroke.
*/
var entries = [];
var seqByToken = /* @__PURE__ */ new WeakMap();
var nextSeq = 0;
var isListening = false;
function seqFor(token) {
	const existing = seqByToken.get(token);
	if (existing !== void 0) return existing;
	const seq = nextSeq++;
	seqByToken.set(token, seq);
	return seq;
}
/**
* Order two entries: positive when `a` is above `b`, negative when below.
* Three keys, each earning its place:
*
* 1. **Depth.** The layer nested inside the other is on top. This is what makes
*    an inner-and-outer pair that mount in the SAME commit come out right;
*    registration order alone gets it backwards, because React runs child
*    effects before parent effects.
* 2. **DOM containment.** Depth only moves when a layer wraps its content in a
*    `LayerDepthProvider`, which a bare `useFocusTrap` cannot do — it renders
*    nothing. For those, containment recovers the nesting the tree did not
*    report.
* 3. **Registration order.** For unrelated layers, the one whose current active
*    cycle registered later is on top, matching how the browser's own top layer
*    stacks. Effect re-registration within that active cycle keeps its place so
*    depth or behavior changes cannot jump the queue; a close/reopen cycle gets
*    a fresh identity from `useLayerDismissal` and moves to the top.
*
* Modality is deliberately NOT a key. Ranking modals above everything sounds
* right and is not: a hover tip shown inside a modal renders on top of it, so
* a modal-first rule would hand the press to the dialog and strand the tip.
* Nesting already covers the case modality was meant to catch — a layer opened
* from inside another is deeper, modal or not.
*
* Note this is a PARTIAL order: containment relates only nested pairs. Callers
* must resolve the top with a pairwise max scan, never `Array.sort`, whose
* result is undefined for a non-transitive comparator.
*/
function compareEntries(a, b) {
	if (a.depth !== b.depth) return a.depth - b.depth;
	const aEl = a.getContainer?.() ?? null;
	const bEl = b.getContainer?.() ?? null;
	if (aEl != null && bEl != null && aEl !== bEl) {
		if (bEl.contains(aEl)) return 1;
		if (aEl.contains(bEl)) return -1;
	}
	return a.seq - b.seq;
}
function isPresentEntry(entry) {
	return entry.isPresent?.() ?? true;
}
var isComposing = false;
/**
* Whether the user is part-way through composing text with an IME.
*
* The stack reads this to decide what an Escape means, and layers read it
* through `useLayerDismissal`'s `shouldDismissOnCloseRequest` for the close
* requests that arrive without a keydown to inspect — the Android back
* gesture, the platform close watcher, or a composing Escape whose keydown
* never reached this listener because content stopped it. Mid-composition,
* those are far more likely to be the user backing out of a half-formed
* character than a request to dismiss a layer, and guessing wrong that way
* costs them everything they have typed into it.
*
* Scope, deliberately page-wide: a composition in a field behind a non-modal
* layer also suppresses that layer's close requests. It is one keypress to
* recover from, and the alternative — matching the composing element against
* a layer's container — cannot work for the layers that do not have one.
*
* A composition already running when the first layer registers is invisible
* here: the listeners go on with the stack's own.
*/
function isTextComposing() {
	return isComposing;
}
function handleCompositionStart() {
	isComposing = true;
}
function handleCompositionEnd() {
	isComposing = false;
}
/** The top-most present layer, or null when nothing is on screen. */
function topPresentEntry() {
	let top = null;
	for (const entry of entries) {
		if (!isPresentEntry(entry)) continue;
		if (top == null || compareEntries(entry, top) > 0) top = entry;
	}
	return top;
}
/**
* Whether `token` identifies the top-most layer. Overlays that still own a
* dismissal channel the stack does not model yet (outside-press, swipe) can
* gate on this so every channel agrees on who is on top.
*/
function isTopmostLayer(token) {
	return topPresentEntry()?.token === token;
}
/** Resolve an Escape press against the stack. Returns whether it was handled. */
function dispatchEscape() {
	const top = topPresentEntry();
	if (top == null) return false;
	if (top.behavior === "block") return true;
	top.dismiss();
	return true;
}
/**
* Resolve a keydown through the shared stack immediately.
*
* The document listener is the normal path. A host may call this at its own
* element boundary after a consumer handler when that handler can stop
* propagation before the event reaches `document`. The same stack still picks
* the owner, and `preventDefault()` records the decision so a bubbling event is
* not handled twice.
*/
function dispatchLayerEscapeKeyDown(event) {
	if (event.key !== "Escape") return;
	if (isImeKeyEvent(event)) {
		if (topPresentEntry() != null) event.preventDefault();
		return;
	}
	if (event.defaultPrevented) return;
	if (dispatchEscape()) event.preventDefault();
}
function startListening() {
	if (isListening || typeof document === "undefined") return;
	document.addEventListener("keydown", dispatchLayerEscapeKeyDown);
	document.addEventListener("compositionstart", handleCompositionStart, true);
	document.addEventListener("compositionend", handleCompositionEnd, true);
	document.addEventListener("blur", handleCompositionEnd, true);
	isListening = true;
}
function stopListening() {
	if (!isListening || typeof document === "undefined") return;
	document.removeEventListener("keydown", dispatchLayerEscapeKeyDown);
	document.removeEventListener("compositionstart", handleCompositionStart, true);
	document.removeEventListener("compositionend", handleCompositionEnd, true);
	document.removeEventListener("blur", handleCompositionEnd, true);
	isComposing = false;
	isListening = false;
}
/**
* Add a layer to the stack for as long as it is active. Returns the unregister
* function; callers own calling it.
*/
function registerLayer(entry) {
	const full = {
		...entry,
		seq: seqFor(entry.token)
	};
	entries.push(full);
	startListening();
	return () => {
		const index = entries.indexOf(full);
		if (index !== -1) entries.splice(index, 1);
		if (entries.length === 0) stopListening();
	};
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/Layer/useLayerDismissal.js
/**
* @file useLayerDismissal.ts
* @input Uses React hooks, the layer stack, and LayerDepthContext
* @output Exports useLayerDismissal + its option/return types
* @position The API overlays use to join the shared dismissal stack. Wraps
*   layerStack (registration + the single Escape listener) and reads nesting
*   depth from LayerDepthContext.
*
* SYNC: When modified, update:
* - /packages/core/src/Layer/index.ts
* - /packages/core/src/Layer/useLayerDismissal.test.tsx
* - /packages/core/src/Layer/layerStack.ts
*/
/**
* Join the shared layer dismissal stack for as long as this layer is active.
*
* The layer does NOT attach a key listener — the stack owns one listener and
* routes each Escape press to the top-most REGISTERED layer, so one press
* dismisses exactly one of them. Dialog (and what is built on it, including
* CommandPalette), Popover and the menus built on it, ContextMenu, Tooltip,
* HoverCard, Lightbox, MobileNav, BottomSheet, BottomSheetSwitcher and
* `Drawer` register today.
*
* `DropdownMenuSubMenu` and `PowerSearchEditPopover` still run their own Escape
* listeners. They stay safe next to the stack only because each claims the press
* at element level, and the stack stands down on an already-`defaultPrevented`
* press — but a registered layer opened inside one of them does not get the
* press. Migrating them is the fix.
*
* Wrap the layer's own content in `LayerDepthProvider` so anything opened from
* inside it registers as nested.
*
* @example
* ```tsx
* useLayerDismissal({
*   isActive: isOpen,
*   onDismiss: () => onOpenChange(false),
* });
* ```
*/
function useLayerDismissal(options) {
	const { isActive, onDismiss, escapeBehavior = "close", getContainer, isPresent, isEnabled = true } = options;
	const depth = useLayerDepth();
	const tokenRef = (0, import_react.useRef)({});
	const wasRegisteredRef = (0, import_react.useRef)(false);
	const onDismissRef = (0, import_react.useRef)(onDismiss);
	const getContainerRef = (0, import_react.useRef)(getContainer);
	const isPresentRef = (0, import_react.useRef)(isPresent);
	(0, import_react.useEffect)(() => {
		onDismissRef.current = onDismiss;
		getContainerRef.current = getContainer;
		isPresentRef.current = isPresent;
	});
	const isRegistered = isActive && isEnabled;
	(0, import_react.useEffect)(() => {
		if (!isRegistered) {
			wasRegisteredRef.current = false;
			return;
		}
		if (!wasRegisteredRef.current) {
			tokenRef.current = {};
			wasRegisteredRef.current = true;
		}
		return registerLayer({
			token: tokenRef.current,
			depth,
			behavior: escapeBehavior,
			getContainer: () => getContainerRef.current?.() ?? null,
			isPresent: () => isPresentRef.current?.() ?? true,
			dismiss: () => onDismissRef.current()
		});
	}, [
		isRegistered,
		depth,
		escapeBehavior
	]);
	return { shouldDismissOnCloseRequest: (0, import_react.useCallback)(() => isRegistered && !isTextComposing() && isTopmostLayer(tokenRef.current), [isRegistered]) };
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/Tooltip/useTooltip.js
/**
* @file useTooltip.tsx
* @input Uses useLayer, useTouchTrigger, React hooks
* @output Exports useTooltip hook with stable trigger refs for hover/focus/tap tooltips
* @position Layer hook; builds on useLayer for tooltip behavior
*
* SYNC: When modified, update:
* - /packages/core/src/Tooltip/index.ts
*/
/**
* Grace period (ms) before hiding on pointer-leave when no explicit `hideDelay`
* is set, so the pointer can travel across the small gap from the trigger onto
* the tooltip surface without the tooltip disappearing (WCAG 1.4.13 hoverable).
*/
var HOVER_BRIDGE_DELAY = 100;
var styles$35 = { container: {
	kWkggS: "x19aspcf",
	kMwMTN: "xrkvqaz",
	kaIpWk: "x1hviunn",
	kMv6JI: "x9ynric",
	kGuDYH: "xjm74w1",
	kLWn49: "xw6l6zx",
	$$css: true
} };
/**
* Focus trigger behavior for tooltips
*/
/**
* Touch trigger behavior for tooltips
*/
/**
* Check if an element is naturally focusable
*/
function isFocusable(element) {
	if (element.hasAttribute("tabindex")) return element.tabIndex >= 0;
	if ([
		"A",
		"BUTTON",
		"INPUT",
		"SELECT",
		"TEXTAREA"
	].includes(element.tagName)) return !element.disabled;
	if (element.isContentEditable) return true;
	return false;
}
/**
* Hook for tooltip behavior with hover/focus triggers.
*
* Builds on useLayer to add:
* - Hover triggers with configurable delay
* - Focus triggers with auto-detection for focusable elements
* - Tap triggers on touch, where there is no hover (see useTouchTrigger)
* - Inverted color palette for high contrast
*
* Unlike HoverCard, tooltips:
* - Don't stay open when hovering the tooltip content
* - Have shorter delays
* - Use inverted colors (dark background, light text)
* - Are typically used for short, non-interactive text
*
* @example
* ```
* const tooltip = useTooltip({ placement: 'above' });
* <Button ref={tooltip.ref} aria-describedby={tooltip.describedBy}>
*   Hover me
* </Button>
* {tooltip.renderTooltip('Helpful tooltip text')}
* ```
*/
function useTooltip(options = {}) {
	const { placement = "above", alignment = "center", delay = 200, hideDelay = 0, focusTrigger = "auto", touchTrigger = "auto", isEnabled = true, isOpen, isDefaultOpen = false, onShow, onHide } = options;
	const { ref: layerRef, anchorId: layerAnchorId, show: showLayer, hide: hideLayer, isOpen: isLayerOpen, id: layerId, render: renderLayer } = useLayer({
		mode: "context",
		onShow,
		onHide
	});
	const popoverXstyle = styles$35.container;
	const showTimeoutRef = (0, import_react.useRef)(null);
	const hideTimeoutRef = (0, import_react.useRef)(null);
	const triggerRef = (0, import_react.useRef)(null);
	const clearTimeouts = (0, import_react.useCallback)(() => {
		if (showTimeoutRef.current) {
			clearTimeout(showTimeoutRef.current);
			showTimeoutRef.current = null;
		}
		if (hideTimeoutRef.current) {
			clearTimeout(hideTimeoutRef.current);
			hideTimeoutRef.current = null;
		}
	}, []);
	const showNow = (0, import_react.useCallback)(() => {
		clearTimeouts();
		showLayer();
	}, [clearTimeouts, showLayer]);
	const hideNow = (0, import_react.useCallback)(() => {
		clearTimeouts();
		hideLayer();
	}, [clearTimeouts, hideLayer]);
	const { isTouchPointerRef, isTouchInteraction, handlePointerEnter, handlePointerDown: handleTouchPointerDown, clearTapOpen } = useTouchTrigger({
		touchTrigger,
		isEnabled,
		isControlled: isOpen !== void 0,
		isOpen: isLayerOpen,
		layerId,
		triggerRef,
		show: showNow,
		hide: hideNow
	});
	const scheduleShow = (0, import_react.useCallback)(() => {
		if (!isEnabled || isOpen === false) return;
		clearTimeouts();
		showTimeoutRef.current = setTimeout(() => {
			showLayer();
		}, delay);
	}, [
		isEnabled,
		isOpen,
		clearTimeouts,
		showLayer,
		delay
	]);
	(0, import_react.useEffect)(() => {
		if (!isEnabled && showTimeoutRef.current) {
			clearTimeout(showTimeoutRef.current);
			showTimeoutRef.current = null;
		}
	}, [isEnabled]);
	const scheduleHide = (0, import_react.useCallback)(() => {
		if (isOpen === true) return;
		clearTimeouts();
		hideTimeoutRef.current = setTimeout(() => {
			hideLayer();
		}, hideDelay > 0 ? hideDelay : HOVER_BRIDGE_DELAY);
	}, [
		isOpen,
		clearTimeouts,
		hideLayer,
		hideDelay
	]);
	const cancelHide = (0, import_react.useCallback)(() => {
		if (hideTimeoutRef.current) {
			clearTimeout(hideTimeoutRef.current);
			hideTimeoutRef.current = null;
		}
	}, []);
	const handleMouseEnter = (0, import_react.useCallback)(() => {
		if (isTouchPointerRef.current) return;
		scheduleShow();
	}, [isTouchPointerRef, scheduleShow]);
	const handleMouseLeave = (0, import_react.useCallback)((event) => {
		if (isTouchPointerRef.current) return;
		const next = event.relatedTarget;
		const surface = next == null ? null : next.ownerDocument?.getElementById(layerId);
		if (surface != null && surface.contains(next)) return;
		scheduleHide();
	}, [
		isTouchPointerRef,
		layerId,
		scheduleHide
	]);
	const handleFocusIn = (0, import_react.useCallback)((e) => {
		if (!isEnabled) return;
		if (isTouchInteraction()) return;
		if (!e.target.matches(":focus-visible")) return;
		clearTimeouts();
		showLayer();
	}, [
		isEnabled,
		isTouchInteraction,
		clearTimeouts,
		showLayer
	]);
	const handleFocusOut = (0, import_react.useCallback)(() => {
		scheduleHide();
	}, [scheduleHide]);
	const handlePointerDown = (0, import_react.useCallback)((event) => {
		if (handleTouchPointerDown(event)) return;
		if (isOpen !== void 0) return;
		clearTimeouts();
		hideLayer();
	}, [
		handleTouchPointerDown,
		isOpen,
		clearTimeouts,
		hideLayer
	]);
	const interactionRef = (0, import_react.useCallback)((el) => {
		if (triggerRef.current) {
			triggerRef.current.removeEventListener("mouseenter", handleMouseEnter);
			triggerRef.current.removeEventListener("mouseleave", handleMouseLeave);
			triggerRef.current.removeEventListener("focusin", handleFocusIn);
			triggerRef.current.removeEventListener("focusout", handleFocusOut);
			triggerRef.current.removeEventListener("pointerenter", handlePointerEnter);
			triggerRef.current.removeEventListener("pointerdown", handlePointerDown);
		}
		if (el) {
			el.addEventListener("pointerenter", handlePointerEnter);
			el.addEventListener("mouseenter", handleMouseEnter);
			el.addEventListener("mouseleave", handleMouseLeave);
			el.addEventListener("pointerdown", handlePointerDown);
			if (focusTrigger === "always" || focusTrigger === "auto" && isFocusable(el)) {
				el.addEventListener("focusin", handleFocusIn);
				el.addEventListener("focusout", handleFocusOut);
			}
		}
		triggerRef.current = el;
	}, [
		focusTrigger,
		handleMouseEnter,
		handleMouseLeave,
		handleFocusIn,
		handleFocusOut,
		handlePointerEnter,
		handlePointerDown
	]);
	const ref = (0, import_react.useCallback)((el) => {
		layerRef(el);
		interactionRef(el);
	}, [layerRef, interactionRef]);
	(0, import_react.useEffect)(() => {
		return () => {
			clearTimeouts();
		};
	}, [clearTimeouts]);
	(0, import_react.useEffect)(() => {
		if (isDefaultOpen) showLayer();
	}, []);
	(0, import_react.useEffect)(() => {
		if (isOpen === void 0) return;
		if (isOpen) {
			clearTimeouts();
			showLayer();
		} else {
			clearTimeouts();
			hideLayer();
		}
	}, [
		isOpen,
		clearTimeouts,
		showLayer,
		hideLayer
	]);
	useLayerDismissal({
		isActive: true,
		isPresent: () => {
			const el = typeof document === "undefined" ? null : document.getElementById(layerId);
			if (el == null) return false;
			try {
				return el.matches(":popover-open");
			} catch {
				return isLayerOpen;
			}
		},
		onDismiss: () => {
			clearTimeouts();
			clearTapOpen();
			if (isOpen !== void 0) {
				onHide?.();
				return;
			}
			hideLayer();
		}
	});
	return {
		ref,
		positionRef: layerRef,
		interactionRef,
		anchorId: layerAnchorId,
		describedBy: layerId,
		renderTooltip: (0, import_react.useCallback)((children, props) => {
			const renderPlacement = props?.placement ?? placement;
			const renderProps = {
				placement: renderPlacement,
				alignment: props?.alignment ?? alignment,
				offset: spacingVars["--spacing-1"],
				role: "tooltip",
				xstyle: [popoverXstyle, layerAnimations[renderPlacement]],
				className: themeProps("tooltip").className,
				onMouseEnter: cancelHide,
				onMouseLeave: scheduleHide
			};
			return renderLayer(/*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
				className: "xfsso4q xy143xn x12gdq22 x1djylfy xw5ewwj x13faqbe",
				children
			}), renderProps);
		}, [
			renderLayer,
			placement,
			alignment,
			popoverXstyle,
			cancelHide,
			scheduleHide
		])
	};
}
//#endregion
//#region node_modules/@formatjs/fast-memoize/index.js
function memoize(fn, options) {
	const cache = options && options.cache ? options.cache : cacheDefault;
	const serializer = options && options.serializer ? options.serializer : serializerDefault;
	return (options && options.strategy ? options.strategy : strategyDefault)(fn, {
		cache,
		serializer
	});
}
function isPrimitive(value) {
	return value == null || typeof value === "number" || typeof value === "boolean";
}
function monadic(fn, cache, serializer, arg) {
	const cacheKey = isPrimitive(arg) ? arg : serializer(arg);
	let computedValue = cache.get(cacheKey);
	if (typeof computedValue === "undefined") {
		computedValue = fn.call(this, arg);
		cache.set(cacheKey, computedValue);
	}
	return computedValue;
}
function variadic(fn, cache, serializer) {
	const args = Array.prototype.slice.call(arguments, 3);
	const cacheKey = serializer(args);
	let computedValue = cache.get(cacheKey);
	if (typeof computedValue === "undefined") {
		computedValue = fn.apply(this, args);
		cache.set(cacheKey, computedValue);
	}
	return computedValue;
}
function assemble(fn, context, strategy, cache, serialize) {
	return strategy.bind(context, fn, cache, serialize);
}
function strategyDefault(fn, options) {
	const strategy = fn.length === 1 ? monadic : variadic;
	return assemble(fn, this, strategy, options.cache.create(), options.serializer);
}
function strategyVariadic(fn, options) {
	return assemble(fn, this, variadic, options.cache.create(), options.serializer);
}
function strategyMonadic(fn, options) {
	return assemble(fn, this, monadic, options.cache.create(), options.serializer);
}
var serializerDefault = function() {
	return JSON.stringify(arguments);
};
var ObjectWithoutPrototypeCache = class {
	constructor() {
		this.cache = Object.create(null);
	}
	get(key) {
		return this.cache[key];
	}
	set(key, value) {
		this.cache[key] = value;
	}
};
var cacheDefault = { create: function create() {
	return new ObjectWithoutPrototypeCache();
} };
var strategies = {
	variadic: strategyVariadic,
	monadic: strategyMonadic
};
//#endregion
//#region node_modules/@formatjs/icu-skeleton-parser/index.js
/**
* https://unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
* Credit: https://github.com/caridy/intl-datetimeformat-pattern/blob/master/index.js
* with some tweaks
*/
var DATE_TIME_REGEX = /(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g;
/**
* Parse Date time skeleton into Intl.DateTimeFormatOptions
* Ref: https://unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
* @public
* @param skeleton skeleton string
*/
function parseDateTimeSkeleton(skeleton) {
	const result = {};
	skeleton.replace(DATE_TIME_REGEX, (match) => {
		const len = match.length;
		switch (match[0]) {
			case "G":
				result.era = len === 4 ? "long" : len === 5 ? "narrow" : "short";
				break;
			case "y":
				result.year = len === 2 ? "2-digit" : "numeric";
				break;
			case "Y":
			case "u":
			case "U":
			case "r": throw new RangeError("`Y/u/U/r` (year) patterns are not supported, use `y` instead");
			case "q":
			case "Q": throw new RangeError("`q/Q` (quarter) patterns are not supported");
			case "M":
			case "L":
				result.month = [
					"numeric",
					"2-digit",
					"short",
					"long",
					"narrow"
				][len - 1];
				break;
			case "w":
			case "W": throw new RangeError("`w/W` (week) patterns are not supported");
			case "d":
				result.day = ["numeric", "2-digit"][len - 1];
				break;
			case "D":
			case "F":
			case "g": throw new RangeError("`D/F/g` (day) patterns are not supported, use `d` instead");
			case "E":
				result.weekday = len === 4 ? "long" : len === 5 ? "narrow" : "short";
				break;
			case "e":
				if (len < 4) throw new RangeError("`e..eee` (weekday) patterns are not supported");
				result.weekday = [
					"short",
					"long",
					"narrow",
					"short"
				][len - 3];
				break;
			case "c":
				if (len < 4) throw new RangeError("`c..ccc` (weekday) patterns are not supported");
				result.weekday = [
					"short",
					"long",
					"narrow",
					"short"
				][len - 3];
				break;
			case "a":
				result.hour12 = true;
				break;
			case "b":
			case "B": throw new RangeError("`b/B` (period) patterns are not supported, use `a` instead");
			case "h":
				result.hourCycle = "h12";
				result.hour = ["numeric", "2-digit"][len - 1];
				break;
			case "H":
				result.hourCycle = "h23";
				result.hour = ["numeric", "2-digit"][len - 1];
				break;
			case "K":
				result.hourCycle = "h11";
				result.hour = ["numeric", "2-digit"][len - 1];
				break;
			case "k":
				result.hourCycle = "h24";
				result.hour = ["numeric", "2-digit"][len - 1];
				break;
			case "j":
			case "J":
			case "C": throw new RangeError("`j/J/C` (hour) patterns are not supported, use `h/H/K/k` instead");
			case "m":
				result.minute = ["numeric", "2-digit"][len - 1];
				break;
			case "s":
				result.second = ["numeric", "2-digit"][len - 1];
				break;
			case "S":
			case "A": throw new RangeError("`S/A` (second) patterns are not supported, use `s` instead");
			case "z":
				result.timeZoneName = len < 4 ? "short" : "long";
				break;
			case "Z":
			case "O":
			case "v":
			case "V":
			case "X":
			case "x": throw new RangeError("`Z/O/v/V/X/x` (timeZone) patterns are not supported, use `z` instead");
		}
		return "";
	});
	return result;
}
var WHITE_SPACE_REGEX = /[\t-\r \x85\u200E\u200F\u2028\u2029]/i;
function parseNumberSkeletonFromString(skeleton) {
	if (skeleton.length === 0) throw new Error("Number skeleton cannot be empty");
	const stringTokens = skeleton.split(WHITE_SPACE_REGEX).filter((x) => x.length > 0);
	const tokens = [];
	for (const stringToken of stringTokens) {
		let stemAndOptions = stringToken.split("/");
		if (stemAndOptions.length === 0) throw new Error("Invalid number skeleton");
		const [stem, ...options] = stemAndOptions;
		for (const option of options) if (option.length === 0) throw new Error("Invalid number skeleton");
		tokens.push({
			stem,
			options
		});
	}
	return tokens;
}
function icuUnitToEcma(unit) {
	return unit.replace(/^(.*?)-/, "");
}
var FRACTION_PRECISION_REGEX = /^\.(?:(0+)(\*)?|(#+)|(0+)(#+))$/g;
var SIGNIFICANT_PRECISION_REGEX = /^(@+)?(\+|#+)?[rs]?$/g;
var INTEGER_WIDTH_REGEX = /(\*)(0+)|(#+)(0+)|(0+)/g;
var CONCISE_INTEGER_WIDTH_REGEX = /^(0+)$/;
function parseSignificantPrecision(str) {
	const result = {};
	if (str[str.length - 1] === "r") result.roundingPriority = "morePrecision";
	else if (str[str.length - 1] === "s") result.roundingPriority = "lessPrecision";
	str.replace(SIGNIFICANT_PRECISION_REGEX, function(_, g1, g2) {
		if (typeof g2 !== "string") {
			result.minimumSignificantDigits = g1.length;
			result.maximumSignificantDigits = g1.length;
		} else if (g2 === "+") result.minimumSignificantDigits = g1.length;
		else if (g1[0] === "#") result.maximumSignificantDigits = g1.length;
		else {
			result.minimumSignificantDigits = g1.length;
			result.maximumSignificantDigits = g1.length + (typeof g2 === "string" ? g2.length : 0);
		}
		return "";
	});
	return result;
}
function parseSign(str) {
	switch (str) {
		case "sign-auto": return { signDisplay: "auto" };
		case "sign-accounting":
		case "()": return { currencySign: "accounting" };
		case "sign-always":
		case "+!": return { signDisplay: "always" };
		case "sign-accounting-always":
		case "()!": return {
			signDisplay: "always",
			currencySign: "accounting"
		};
		case "sign-except-zero":
		case "+?": return { signDisplay: "exceptZero" };
		case "sign-accounting-except-zero":
		case "()?": return {
			signDisplay: "exceptZero",
			currencySign: "accounting"
		};
		case "sign-never":
		case "+_": return { signDisplay: "never" };
	}
}
function parseConciseScientificAndEngineeringStem(stem) {
	let result;
	if (stem[0] === "E" && stem[1] === "E") {
		result = { notation: "engineering" };
		stem = stem.slice(2);
	} else if (stem[0] === "E") {
		result = { notation: "scientific" };
		stem = stem.slice(1);
	}
	if (result) {
		const signDisplay = stem.slice(0, 2);
		if (signDisplay === "+!") {
			result.signDisplay = "always";
			stem = stem.slice(2);
		} else if (signDisplay === "+?") {
			result.signDisplay = "exceptZero";
			stem = stem.slice(2);
		}
		if (!CONCISE_INTEGER_WIDTH_REGEX.test(stem)) throw new Error("Malformed concise eng/scientific notation");
		result.minimumIntegerDigits = stem.length;
	}
	return result;
}
function parseNotationOptions(opt) {
	const result = {};
	const signOpts = parseSign(opt);
	if (signOpts) return signOpts;
	return result;
}
/**
* https://github.com/unicode-org/icu/blob/master/docs/userguide/format_parse/numbers/skeletons.md#skeleton-stems-and-options
*/
function parseNumberSkeleton(tokens) {
	let result = {};
	for (const token of tokens) {
		switch (token.stem) {
			case "percent":
			case "%":
				result.style = "percent";
				continue;
			case "%x100":
				result.style = "percent";
				result.scale = 100;
				continue;
			case "currency":
				result.style = "currency";
				result.currency = token.options[0];
				continue;
			case "group-off":
			case ",_":
				result.useGrouping = false;
				continue;
			case "precision-integer":
			case ".":
				result.maximumFractionDigits = 0;
				continue;
			case "measure-unit":
			case "unit":
				result.style = "unit";
				result.unit = icuUnitToEcma(token.options[0]);
				continue;
			case "compact-short":
			case "K":
				result.notation = "compact";
				result.compactDisplay = "short";
				continue;
			case "compact-long":
			case "KK":
				result.notation = "compact";
				result.compactDisplay = "long";
				continue;
			case "scientific":
				result = {
					...result,
					notation: "scientific",
					...token.options.reduce((all, opt) => ({
						...all,
						...parseNotationOptions(opt)
					}), {})
				};
				continue;
			case "engineering":
				result = {
					...result,
					notation: "engineering",
					...token.options.reduce((all, opt) => ({
						...all,
						...parseNotationOptions(opt)
					}), {})
				};
				continue;
			case "notation-simple":
				result.notation = "standard";
				continue;
			case "unit-width-narrow":
				result.currencyDisplay = "narrowSymbol";
				result.unitDisplay = "narrow";
				continue;
			case "unit-width-short":
				result.currencyDisplay = "code";
				result.unitDisplay = "short";
				continue;
			case "unit-width-full-name":
				result.currencyDisplay = "name";
				result.unitDisplay = "long";
				continue;
			case "unit-width-iso-code":
				result.currencyDisplay = "symbol";
				continue;
			case "scale":
				result.scale = parseFloat(token.options[0]);
				continue;
			case "rounding-mode-floor":
				result.roundingMode = "floor";
				continue;
			case "rounding-mode-ceiling":
				result.roundingMode = "ceil";
				continue;
			case "rounding-mode-down":
				result.roundingMode = "trunc";
				continue;
			case "rounding-mode-up":
				result.roundingMode = "expand";
				continue;
			case "rounding-mode-half-even":
				result.roundingMode = "halfEven";
				continue;
			case "rounding-mode-half-down":
				result.roundingMode = "halfTrunc";
				continue;
			case "rounding-mode-half-up":
				result.roundingMode = "halfExpand";
				continue;
			case "integer-width":
				if (token.options.length > 1) throw new RangeError("integer-width stems only accept a single optional option");
				token.options[0].replace(INTEGER_WIDTH_REGEX, function(_, g1, g2, g3, g4, g5) {
					if (g1) result.minimumIntegerDigits = g2.length;
					else if (g3 && g4) throw new Error("We currently do not support maximum integer digits");
					else if (g5) throw new Error("We currently do not support exact integer digits");
					return "";
				});
				continue;
		}
		if (CONCISE_INTEGER_WIDTH_REGEX.test(token.stem)) {
			result.minimumIntegerDigits = token.stem.length;
			continue;
		}
		if (FRACTION_PRECISION_REGEX.test(token.stem)) {
			if (token.options.length > 1) throw new RangeError("Fraction-precision stems only accept a single optional option");
			token.stem.replace(FRACTION_PRECISION_REGEX, function(_, g1, g2, g3, g4, g5) {
				if (g2 === "*") result.minimumFractionDigits = g1.length;
				else if (g3 && g3[0] === "#") result.maximumFractionDigits = g3.length;
				else if (g4 && g5) {
					result.minimumFractionDigits = g4.length;
					result.maximumFractionDigits = g4.length + g5.length;
				} else {
					result.minimumFractionDigits = g1.length;
					result.maximumFractionDigits = g1.length;
				}
				return "";
			});
			const opt = token.options[0];
			if (opt === "w") result = {
				...result,
				trailingZeroDisplay: "stripIfInteger"
			};
			else if (opt) result = {
				...result,
				...parseSignificantPrecision(opt)
			};
			continue;
		}
		if (SIGNIFICANT_PRECISION_REGEX.test(token.stem)) {
			result = {
				...result,
				...parseSignificantPrecision(token.stem)
			};
			continue;
		}
		const signOpts = parseSign(token.stem);
		if (signOpts) result = {
			...result,
			...signOpts
		};
		const conciseScientificAndEngineeringOpts = parseConciseScientificAndEngineeringStem(token.stem);
		if (conciseScientificAndEngineeringOpts) result = {
			...result,
			...conciseScientificAndEngineeringOpts
		};
	}
	return result;
}
//#endregion
//#region node_modules/@formatjs/icu-messageformat-parser/index.js
var ErrorKind = /* @__PURE__ */ function(ErrorKind) {
	/** Argument is unclosed (e.g. `{0`) */
	ErrorKind[ErrorKind["EXPECT_ARGUMENT_CLOSING_BRACE"] = 1] = "EXPECT_ARGUMENT_CLOSING_BRACE";
	/** Argument is empty (e.g. `{}`). */
	ErrorKind[ErrorKind["EMPTY_ARGUMENT"] = 2] = "EMPTY_ARGUMENT";
	/** Argument is malformed (e.g. `{foo!}``) */
	ErrorKind[ErrorKind["MALFORMED_ARGUMENT"] = 3] = "MALFORMED_ARGUMENT";
	/** Expect an argument type (e.g. `{foo,}`) */
	ErrorKind[ErrorKind["EXPECT_ARGUMENT_TYPE"] = 4] = "EXPECT_ARGUMENT_TYPE";
	/** Unsupported argument type (e.g. `{foo,foo}`) */
	ErrorKind[ErrorKind["INVALID_ARGUMENT_TYPE"] = 5] = "INVALID_ARGUMENT_TYPE";
	/** Expect an argument style (e.g. `{foo, number, }`) */
	ErrorKind[ErrorKind["EXPECT_ARGUMENT_STYLE"] = 6] = "EXPECT_ARGUMENT_STYLE";
	/** The number skeleton is invalid. */
	ErrorKind[ErrorKind["INVALID_NUMBER_SKELETON"] = 7] = "INVALID_NUMBER_SKELETON";
	/** The date time skeleton is invalid. */
	ErrorKind[ErrorKind["INVALID_DATE_TIME_SKELETON"] = 8] = "INVALID_DATE_TIME_SKELETON";
	/** Exepct a number skeleton following the `::` (e.g. `{foo, number, ::}`) */
	ErrorKind[ErrorKind["EXPECT_NUMBER_SKELETON"] = 9] = "EXPECT_NUMBER_SKELETON";
	/** Exepct a date time skeleton following the `::` (e.g. `{foo, date, ::}`) */
	ErrorKind[ErrorKind["EXPECT_DATE_TIME_SKELETON"] = 10] = "EXPECT_DATE_TIME_SKELETON";
	/** Unmatched apostrophes in the argument style (e.g. `{foo, number, 'test`) */
	ErrorKind[ErrorKind["UNCLOSED_QUOTE_IN_ARGUMENT_STYLE"] = 11] = "UNCLOSED_QUOTE_IN_ARGUMENT_STYLE";
	/** Missing select argument options (e.g. `{foo, select}`) */
	ErrorKind[ErrorKind["EXPECT_SELECT_ARGUMENT_OPTIONS"] = 12] = "EXPECT_SELECT_ARGUMENT_OPTIONS";
	/** Expecting an offset value in `plural` or `selectordinal` argument (e.g `{foo, plural, offset}`) */
	ErrorKind[ErrorKind["EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE"] = 13] = "EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE";
	/** Offset value in `plural` or `selectordinal` is invalid (e.g. `{foo, plural, offset: x}`) */
	ErrorKind[ErrorKind["INVALID_PLURAL_ARGUMENT_OFFSET_VALUE"] = 14] = "INVALID_PLURAL_ARGUMENT_OFFSET_VALUE";
	/** Expecting a selector in `select` argument (e.g `{foo, select}`) */
	ErrorKind[ErrorKind["EXPECT_SELECT_ARGUMENT_SELECTOR"] = 15] = "EXPECT_SELECT_ARGUMENT_SELECTOR";
	/** Expecting a selector in `plural` or `selectordinal` argument (e.g `{foo, plural}`) */
	ErrorKind[ErrorKind["EXPECT_PLURAL_ARGUMENT_SELECTOR"] = 16] = "EXPECT_PLURAL_ARGUMENT_SELECTOR";
	/** Expecting a message fragment after the `select` selector (e.g. `{foo, select, apple}`) */
	ErrorKind[ErrorKind["EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT"] = 17] = "EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT";
	/**
	* Expecting a message fragment after the `plural` or `selectordinal` selector
	* (e.g. `{foo, plural, one}`)
	*/
	ErrorKind[ErrorKind["EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT"] = 18] = "EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT";
	/** Selector in `plural` or `selectordinal` is malformed (e.g. `{foo, plural, =x {#}}`) */
	ErrorKind[ErrorKind["INVALID_PLURAL_ARGUMENT_SELECTOR"] = 19] = "INVALID_PLURAL_ARGUMENT_SELECTOR";
	/**
	* Duplicate selectors in `plural` or `selectordinal` argument.
	* (e.g. {foo, plural, one {#} one {#}})
	*/
	ErrorKind[ErrorKind["DUPLICATE_PLURAL_ARGUMENT_SELECTOR"] = 20] = "DUPLICATE_PLURAL_ARGUMENT_SELECTOR";
	/** Duplicate selectors in `select` argument.
	* (e.g. {foo, select, apple {apple} apple {apple}})
	*/
	ErrorKind[ErrorKind["DUPLICATE_SELECT_ARGUMENT_SELECTOR"] = 21] = "DUPLICATE_SELECT_ARGUMENT_SELECTOR";
	/** Plural or select argument option must have `other` clause. */
	ErrorKind[ErrorKind["MISSING_OTHER_CLAUSE"] = 22] = "MISSING_OTHER_CLAUSE";
	/** The tag is malformed. (e.g. `<bold!>foo</bold!>) */
	ErrorKind[ErrorKind["INVALID_TAG"] = 23] = "INVALID_TAG";
	/** The tag name is invalid. (e.g. `<123>foo</123>`) */
	ErrorKind[ErrorKind["INVALID_TAG_NAME"] = 25] = "INVALID_TAG_NAME";
	/** The closing tag does not match the opening tag. (e.g. `<bold>foo</italic>`) */
	ErrorKind[ErrorKind["UNMATCHED_CLOSING_TAG"] = 26] = "UNMATCHED_CLOSING_TAG";
	/** The opening tag has unmatched closing tag. (e.g. `<bold>foo`) */
	ErrorKind[ErrorKind["UNCLOSED_TAG"] = 27] = "UNCLOSED_TAG";
	return ErrorKind;
}({});
/**
* Type Guards
*/
function isLiteralElement(el) {
	return el.type === 0;
}
function isArgumentElement(el) {
	return el.type === 1;
}
function isNumberElement(el) {
	return el.type === 2;
}
function isDateElement(el) {
	return el.type === 3;
}
function isTimeElement(el) {
	return el.type === 4;
}
function isSelectElement(el) {
	return el.type === 5;
}
function isPluralElement(el) {
	return el.type === 6;
}
function isPoundElement(el) {
	return el.type === 7;
}
function isTagElement(el) {
	return el.type === 8;
}
function isNumberSkeleton(el) {
	return !!(el && typeof el === "object" && el.type === 0);
}
function isDateTimeSkeleton(el) {
	return !!(el && typeof el === "object" && el.type === 1);
}
var SPACE_SEPARATOR_REGEX = /[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/;
var timeData = {
	"001": ["H", "h"],
	"419": [
		"h",
		"H",
		"hB",
		"hb"
	],
	"AC": [
		"H",
		"h",
		"hb",
		"hB"
	],
	"AD": ["H", "hB"],
	"AE": [
		"h",
		"hB",
		"hb",
		"H"
	],
	"AF": [
		"H",
		"hb",
		"hB",
		"h"
	],
	"AG": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"AI": [
		"H",
		"h",
		"hb",
		"hB"
	],
	"AL": [
		"h",
		"H",
		"hB"
	],
	"AM": ["H", "hB"],
	"AO": ["H", "hB"],
	"AR": [
		"h",
		"H",
		"hB",
		"hb"
	],
	"AS": ["h", "H"],
	"AT": ["H", "hB"],
	"AU": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"AW": ["H", "hB"],
	"AX": ["H"],
	"AZ": [
		"H",
		"hB",
		"h"
	],
	"BA": [
		"H",
		"hB",
		"h"
	],
	"BB": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"BD": [
		"h",
		"hB",
		"H"
	],
	"BE": ["H", "hB"],
	"BF": ["H", "hB"],
	"BG": [
		"H",
		"hB",
		"h"
	],
	"BH": [
		"h",
		"hB",
		"hb",
		"H"
	],
	"BI": ["H", "h"],
	"BJ": ["H", "hB"],
	"BL": ["H", "hB"],
	"BM": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"BN": [
		"hb",
		"hB",
		"h",
		"H"
	],
	"BO": [
		"h",
		"H",
		"hB",
		"hb"
	],
	"BQ": ["H"],
	"BR": ["H", "hB"],
	"BS": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"BT": ["h", "H"],
	"BW": [
		"H",
		"h",
		"hb",
		"hB"
	],
	"BY": ["H", "h"],
	"BZ": [
		"H",
		"h",
		"hb",
		"hB"
	],
	"CA": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"CC": [
		"H",
		"h",
		"hb",
		"hB"
	],
	"CD": ["hB", "H"],
	"CF": [
		"H",
		"h",
		"hB"
	],
	"CG": ["H", "hB"],
	"CH": [
		"H",
		"hB",
		"h"
	],
	"CI": ["H", "hB"],
	"CK": [
		"H",
		"h",
		"hb",
		"hB"
	],
	"CL": [
		"h",
		"H",
		"hB",
		"hb"
	],
	"CM": [
		"H",
		"h",
		"hB"
	],
	"CN": [
		"H",
		"hB",
		"hb",
		"h"
	],
	"CO": [
		"h",
		"H",
		"hB",
		"hb"
	],
	"CP": ["H"],
	"CR": [
		"h",
		"H",
		"hB",
		"hb"
	],
	"CU": [
		"h",
		"H",
		"hB",
		"hb"
	],
	"CV": ["H", "hB"],
	"CW": ["H", "hB"],
	"CX": [
		"H",
		"h",
		"hb",
		"hB"
	],
	"CY": [
		"h",
		"H",
		"hb",
		"hB"
	],
	"CZ": ["H"],
	"DE": ["H", "hB"],
	"DG": [
		"H",
		"h",
		"hb",
		"hB"
	],
	"DJ": ["h", "H"],
	"DK": ["H"],
	"DM": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"DO": [
		"h",
		"H",
		"hB",
		"hb"
	],
	"DZ": [
		"h",
		"hB",
		"hb",
		"H"
	],
	"EA": [
		"H",
		"h",
		"hB",
		"hb"
	],
	"EC": [
		"h",
		"H",
		"hB",
		"hb"
	],
	"EE": ["H", "hB"],
	"EG": [
		"h",
		"hB",
		"hb",
		"H"
	],
	"EH": [
		"h",
		"hB",
		"hb",
		"H"
	],
	"ER": ["h", "H"],
	"ES": [
		"H",
		"hB",
		"h",
		"hb"
	],
	"ET": [
		"hB",
		"hb",
		"h",
		"H"
	],
	"FI": ["H"],
	"FJ": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"FK": [
		"H",
		"h",
		"hb",
		"hB"
	],
	"FM": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"FO": ["H", "h"],
	"FR": ["H", "hB"],
	"GA": ["H", "hB"],
	"GB": [
		"H",
		"h",
		"hb",
		"hB"
	],
	"GD": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"GE": [
		"H",
		"hB",
		"h"
	],
	"GF": ["H", "hB"],
	"GG": [
		"H",
		"h",
		"hb",
		"hB"
	],
	"GH": ["h", "H"],
	"GI": [
		"H",
		"h",
		"hb",
		"hB"
	],
	"GL": ["H", "h"],
	"GM": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"GN": ["H", "hB"],
	"GP": ["H", "hB"],
	"GQ": [
		"H",
		"hB",
		"h",
		"hb"
	],
	"GR": [
		"h",
		"H",
		"hb",
		"hB"
	],
	"GS": [
		"H",
		"h",
		"hb",
		"hB"
	],
	"GT": [
		"h",
		"H",
		"hB",
		"hb"
	],
	"GU": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"GW": ["H", "hB"],
	"GY": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"HK": [
		"h",
		"hB",
		"hb",
		"H"
	],
	"HN": [
		"h",
		"H",
		"hB",
		"hb"
	],
	"HR": ["H", "hB"],
	"HU": ["H", "h"],
	"IC": [
		"H",
		"h",
		"hB",
		"hb"
	],
	"ID": ["H"],
	"IE": [
		"H",
		"h",
		"hb",
		"hB"
	],
	"IL": ["H", "hB"],
	"IM": [
		"H",
		"h",
		"hb",
		"hB"
	],
	"IN": ["h", "H"],
	"IO": [
		"H",
		"h",
		"hb",
		"hB"
	],
	"IQ": [
		"h",
		"hB",
		"hb",
		"H"
	],
	"IR": ["hB", "H"],
	"IS": ["H"],
	"IT": ["H", "hB"],
	"JE": [
		"H",
		"h",
		"hb",
		"hB"
	],
	"JM": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"JO": [
		"h",
		"hB",
		"hb",
		"H"
	],
	"JP": [
		"H",
		"K",
		"h"
	],
	"KE": [
		"hB",
		"hb",
		"H",
		"h"
	],
	"KG": [
		"H",
		"h",
		"hB",
		"hb"
	],
	"KH": [
		"hB",
		"h",
		"H",
		"hb"
	],
	"KI": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"KM": [
		"H",
		"h",
		"hB",
		"hb"
	],
	"KN": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"KP": [
		"h",
		"H",
		"hB",
		"hb"
	],
	"KR": [
		"h",
		"H",
		"hB",
		"hb"
	],
	"KW": [
		"h",
		"hB",
		"hb",
		"H"
	],
	"KY": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"KZ": ["H", "hB"],
	"LA": [
		"H",
		"hb",
		"hB",
		"h"
	],
	"LB": [
		"h",
		"hB",
		"hb",
		"H"
	],
	"LC": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"LI": [
		"H",
		"hB",
		"h"
	],
	"LK": [
		"H",
		"h",
		"hB",
		"hb"
	],
	"LR": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"LS": ["h", "H"],
	"LT": [
		"H",
		"h",
		"hb",
		"hB"
	],
	"LU": [
		"H",
		"h",
		"hB"
	],
	"LV": [
		"H",
		"hB",
		"hb",
		"h"
	],
	"LY": [
		"h",
		"hB",
		"hb",
		"H"
	],
	"MA": [
		"H",
		"h",
		"hB",
		"hb"
	],
	"MC": ["H", "hB"],
	"MD": ["H", "hB"],
	"ME": [
		"H",
		"hB",
		"h"
	],
	"MF": ["H", "hB"],
	"MG": ["H", "h"],
	"MH": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"MK": [
		"H",
		"h",
		"hb",
		"hB"
	],
	"ML": ["H"],
	"MM": [
		"hB",
		"hb",
		"H",
		"h"
	],
	"MN": [
		"H",
		"h",
		"hb",
		"hB"
	],
	"MO": [
		"h",
		"hB",
		"hb",
		"H"
	],
	"MP": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"MQ": ["H", "hB"],
	"MR": [
		"h",
		"hB",
		"hb",
		"H"
	],
	"MS": [
		"H",
		"h",
		"hb",
		"hB"
	],
	"MT": ["H", "h"],
	"MU": ["H", "h"],
	"MV": ["H", "h"],
	"MW": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"MX": [
		"h",
		"H",
		"hB",
		"hb"
	],
	"MY": [
		"hb",
		"hB",
		"h",
		"H"
	],
	"MZ": ["H", "hB"],
	"NA": [
		"h",
		"H",
		"hB",
		"hb"
	],
	"NC": ["H", "hB"],
	"NE": ["H"],
	"NF": [
		"H",
		"h",
		"hb",
		"hB"
	],
	"NG": [
		"H",
		"h",
		"hb",
		"hB"
	],
	"NI": [
		"h",
		"H",
		"hB",
		"hb"
	],
	"NL": ["H", "hB"],
	"NO": ["H", "h"],
	"NP": [
		"H",
		"h",
		"hB"
	],
	"NR": [
		"H",
		"h",
		"hb",
		"hB"
	],
	"NU": [
		"H",
		"h",
		"hb",
		"hB"
	],
	"NZ": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"OM": [
		"h",
		"hB",
		"hb",
		"H"
	],
	"PA": [
		"h",
		"H",
		"hB",
		"hb"
	],
	"PE": [
		"h",
		"H",
		"hB",
		"hb"
	],
	"PF": [
		"H",
		"h",
		"hB"
	],
	"PG": ["h", "H"],
	"PH": [
		"h",
		"hB",
		"hb",
		"H"
	],
	"PK": [
		"h",
		"hB",
		"H"
	],
	"PL": ["H", "h"],
	"PM": ["H", "hB"],
	"PN": [
		"H",
		"h",
		"hb",
		"hB"
	],
	"PR": [
		"h",
		"H",
		"hB",
		"hb"
	],
	"PS": [
		"h",
		"hB",
		"hb",
		"H"
	],
	"PT": ["H", "hB"],
	"PW": ["h", "H"],
	"PY": [
		"h",
		"H",
		"hB",
		"hb"
	],
	"QA": [
		"h",
		"hB",
		"hb",
		"H"
	],
	"RE": ["H", "hB"],
	"RO": ["H", "hB"],
	"RS": [
		"H",
		"hB",
		"h"
	],
	"RU": ["H"],
	"RW": ["H", "h"],
	"SA": [
		"h",
		"hB",
		"hb",
		"H"
	],
	"SB": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"SC": [
		"H",
		"h",
		"hB"
	],
	"SD": [
		"h",
		"hB",
		"hb",
		"H"
	],
	"SE": ["H"],
	"SG": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"SH": [
		"H",
		"h",
		"hb",
		"hB"
	],
	"SI": ["H", "hB"],
	"SJ": ["H"],
	"SK": ["H"],
	"SL": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"SM": [
		"H",
		"h",
		"hB"
	],
	"SN": [
		"H",
		"h",
		"hB"
	],
	"SO": ["h", "H"],
	"SR": ["H", "hB"],
	"SS": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"ST": ["H", "hB"],
	"SV": [
		"h",
		"H",
		"hB",
		"hb"
	],
	"SX": [
		"H",
		"h",
		"hb",
		"hB"
	],
	"SY": [
		"h",
		"hB",
		"hb",
		"H"
	],
	"SZ": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"TA": [
		"H",
		"h",
		"hb",
		"hB"
	],
	"TC": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"TD": [
		"h",
		"H",
		"hB"
	],
	"TF": [
		"H",
		"h",
		"hB"
	],
	"TG": ["H", "hB"],
	"TH": ["H", "h"],
	"TJ": ["H", "h"],
	"TL": [
		"H",
		"hB",
		"hb",
		"h"
	],
	"TM": ["H", "h"],
	"TN": [
		"h",
		"hB",
		"hb",
		"H"
	],
	"TO": ["h", "H"],
	"TR": ["H", "hB"],
	"TT": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"TW": [
		"hB",
		"hb",
		"h",
		"H"
	],
	"TZ": [
		"hB",
		"hb",
		"H",
		"h"
	],
	"UA": [
		"H",
		"hB",
		"h"
	],
	"UG": [
		"hB",
		"hb",
		"H",
		"h"
	],
	"UM": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"US": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"UY": [
		"h",
		"H",
		"hB",
		"hb"
	],
	"UZ": [
		"H",
		"hB",
		"h"
	],
	"VA": [
		"H",
		"h",
		"hB"
	],
	"VC": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"VE": [
		"h",
		"H",
		"hB",
		"hb"
	],
	"VG": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"VI": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"VN": ["H", "h"],
	"VU": ["h", "H"],
	"WF": ["H", "hB"],
	"WS": ["h", "H"],
	"XK": [
		"H",
		"hB",
		"h"
	],
	"YE": [
		"h",
		"hB",
		"hb",
		"H"
	],
	"YT": ["H", "hB"],
	"ZA": [
		"H",
		"h",
		"hb",
		"hB"
	],
	"ZM": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"ZW": ["H", "h"],
	"af-ZA": [
		"H",
		"h",
		"hB",
		"hb"
	],
	"ar-001": [
		"h",
		"hB",
		"hb",
		"H"
	],
	"ca-ES": [
		"H",
		"h",
		"hB"
	],
	"en-001": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"en-HK": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"en-IL": [
		"H",
		"h",
		"hb",
		"hB"
	],
	"en-MY": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"es-BR": [
		"H",
		"h",
		"hB",
		"hb"
	],
	"es-ES": [
		"H",
		"h",
		"hB",
		"hb"
	],
	"es-GQ": [
		"H",
		"h",
		"hB",
		"hb"
	],
	"fr-CA": [
		"H",
		"h",
		"hB"
	],
	"gl-ES": [
		"H",
		"h",
		"hB"
	],
	"gu-IN": [
		"hB",
		"hb",
		"h",
		"H"
	],
	"hi-IN": [
		"hB",
		"h",
		"H"
	],
	"it-CH": [
		"H",
		"h",
		"hB"
	],
	"it-IT": [
		"H",
		"h",
		"hB"
	],
	"kn-IN": [
		"hB",
		"h",
		"H"
	],
	"ku-SY": ["H", "hB"],
	"ml-IN": [
		"hB",
		"h",
		"H"
	],
	"mr-IN": [
		"hB",
		"hb",
		"h",
		"H"
	],
	"pa-IN": [
		"hB",
		"hb",
		"h",
		"H"
	],
	"ta-IN": [
		"hB",
		"h",
		"hb",
		"H"
	],
	"te-IN": [
		"hB",
		"h",
		"H"
	],
	"zu-ZA": [
		"H",
		"hB",
		"hb",
		"h"
	]
};
/**
* Returns the best matching date time pattern if a date time skeleton
* pattern is provided with a locale. Follows the Unicode specification:
* https://www.unicode.org/reports/tr35/tr35-dates.html#table-mapping-requested-time-skeletons-to-patterns
* @param skeleton date time skeleton pattern that possibly includes j, J or C
* @param locale
*/
function getBestPattern(skeleton, locale) {
	let skeletonCopy = "";
	for (let patternPos = 0; patternPos < skeleton.length; patternPos++) {
		const patternChar = skeleton.charAt(patternPos);
		if (patternChar === "j") {
			let extraLength = 0;
			while (patternPos + 1 < skeleton.length && skeleton.charAt(patternPos + 1) === patternChar) {
				extraLength++;
				patternPos++;
			}
			let hourLen = 1 + (extraLength & 1);
			let dayPeriodLen = extraLength < 2 ? 1 : 3 + (extraLength >> 1);
			let dayPeriodChar = "a";
			let hourChar = getDefaultHourSymbolFromLocale(locale);
			if (hourChar == "H" || hourChar == "k") dayPeriodLen = 0;
			while (dayPeriodLen-- > 0) skeletonCopy += dayPeriodChar;
			while (hourLen-- > 0) skeletonCopy = hourChar + skeletonCopy;
		} else if (patternChar === "J") skeletonCopy += "H";
		else skeletonCopy += patternChar;
	}
	return skeletonCopy;
}
/**
* Maps the [hour cycle type](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/hourCycle)
* of the given `locale` to the corresponding time pattern.
* @param locale
*/
function getDefaultHourSymbolFromLocale(locale) {
	let hourCycle = locale.hourCycle;
	if (hourCycle === void 0) {
		const localeWithHourCycles = locale;
		hourCycle = localeWithHourCycles.getHourCycles?.()[0] ?? localeWithHourCycles.hourCycles?.[0];
	}
	if (hourCycle) switch (hourCycle) {
		case "h24": return "k";
		case "h23": return "H";
		case "h12": return "h";
		case "h11": return "K";
		default: throw new Error("Invalid hourCycle");
	}
	const languageTag = locale.language;
	let regionTag;
	if (languageTag !== "root") regionTag = locale.maximize().region;
	return (timeData[`${languageTag}-${regionTag}`] || timeData[regionTag || ""] || timeData[languageTag || ""] || timeData[`${languageTag}-001`] || timeData["001"])[0].charAt(0);
}
var SPACE_SEPARATOR_START_REGEX = new RegExp(`^${SPACE_SEPARATOR_REGEX.source}*`);
var SPACE_SEPARATOR_END_REGEX = new RegExp(`${SPACE_SEPARATOR_REGEX.source}*$`);
function createLocation(start, end) {
	return {
		start,
		end
	};
}
var hasNativeFromEntries = !!Object.fromEntries;
var hasTrimStart = !!String.prototype.trimStart;
var hasTrimEnd = !!String.prototype.trimEnd;
var fromEntries = hasNativeFromEntries ? Object.fromEntries : function fromEntries(entries) {
	const obj = {};
	for (const [k, v] of entries) obj[k] = v;
	return obj;
};
var trimStart = hasTrimStart ? function trimStart(s) {
	return s.trimStart();
} : function trimStart(s) {
	return s.replace(SPACE_SEPARATOR_START_REGEX, "");
};
var trimEnd = hasTrimEnd ? function trimEnd(s) {
	return s.trimEnd();
} : function trimEnd(s) {
	return s.replace(SPACE_SEPARATOR_END_REGEX, "");
};
var IDENTIFIER_PREFIX_RE = /* @__PURE__ */ new RegExp("([^\\p{White_Space}\\p{Pattern_Syntax}]*)", "yu");
function matchIdentifierAtIndex(s, index) {
	IDENTIFIER_PREFIX_RE.lastIndex = index;
	return IDENTIFIER_PREFIX_RE.exec(s)[1] ?? "";
}
function plainTopLevelEndPosition(message) {
	if (message.length === 0) return null;
	let line = 1;
	let column = 1;
	for (let offset = 0; offset < message.length;) {
		const code = message.charCodeAt(offset);
		switch (code) {
			case 35:
			case 39:
			case 60:
			case 123:
			case 125: return null;
		}
		if (code === 10) {
			line++;
			column = 1;
			offset++;
		} else {
			column++;
			if (code >= 55296 && code <= 56319 && offset + 1 < message.length) {
				const next = message.charCodeAt(offset + 1);
				offset += next >= 56320 && next <= 57343 ? 2 : 1;
			} else offset++;
		}
	}
	return {
		offset: message.length,
		line,
		column
	};
}
var Parser = class {
	constructor(message, options = {}) {
		this.message = message;
		this.position = {
			offset: 0,
			line: 1,
			column: 1
		};
		this.ignoreTag = !!options.ignoreTag;
		this.locale = options.locale;
		this.requiresOtherClause = !!options.requiresOtherClause;
		this.shouldParseSkeletons = !!options.shouldParseSkeletons;
	}
	parse() {
		if (this.offset() !== 0) throw Error("parser can only be used once");
		if (this.message.length > 0) {
			const firstCode = this.message.charCodeAt(0);
			if (firstCode !== 35 && firstCode !== 39 && firstCode !== 60 && firstCode !== 123 && firstCode !== 125) {
				const plainEndPosition = plainTopLevelEndPosition(this.message);
				if (plainEndPosition) {
					const start = this.clonePosition();
					this.position = plainEndPosition;
					return {
						val: [{
							type: 0,
							value: this.message,
							location: createLocation(start, this.clonePosition())
						}],
						err: null
					};
				}
			}
		}
		return this.parseMessage(0, "", false);
	}
	parseMessage(nestingLevel, parentArgType, expectingCloseTag) {
		let elements = [];
		while (!this.isEOF()) {
			const char = this.char();
			if (char === 123) {
				const result = this.parseArgument(nestingLevel, expectingCloseTag);
				if (result.err) return result;
				elements.push(result.val);
			} else if (char === 125 && nestingLevel > 0) break;
			else if (char === 35 && (parentArgType === "plural" || parentArgType === "selectordinal")) {
				const position = this.clonePosition();
				this.bump();
				elements.push({
					type: 7,
					location: createLocation(position, this.clonePosition())
				});
			} else if (char === 60 && !this.ignoreTag && this.peek() === 47) {
				if (expectingCloseTag) break;
				else return this.error(26, createLocation(this.clonePosition(), this.clonePosition()));
			} else if (char === 60 && !this.ignoreTag && _isAlpha(this.peek() || 0)) {
				const result = this.parseTag(nestingLevel, parentArgType);
				if (result.err) return result;
				elements.push(result.val);
			} else {
				const result = this.parseLiteral(nestingLevel, parentArgType);
				if (result.err) return result;
				elements.push(result.val);
			}
		}
		return {
			val: elements,
			err: null
		};
	}
	/**
	* A tag name must start with an ASCII lower/upper case letter. The grammar is based on the
	* [custom element name][] except that a dash is NOT always mandatory and uppercase letters
	* are accepted:
	*
	* ```
	* tag ::= "<" tagName (whitespace)* "/>" | "<" tagName (whitespace)* ">" message "</" tagName (whitespace)* ">"
	* tagName ::= [a-z] (PENChar)*
	* PENChar ::=
	*     "-" | "." | [0-9] | "_" | [a-z] | [A-Z] | #xB7 | [#xC0-#xD6] | [#xD8-#xF6] | [#xF8-#x37D] |
	*     [#x37F-#x1FFF] | [#x200C-#x200D] | [#x203F-#x2040] | [#x2070-#x218F] | [#x2C00-#x2FEF] |
	*     [#x3001-#xD7FF] | [#xF900-#xFDCF] | [#xFDF0-#xFFFD] | [#x10000-#xEFFFF]
	* ```
	*
	* [custom element name]: https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name
	* NOTE: We're a bit more lax here since HTML technically does not allow uppercase HTML element but we do
	* since other tag-based engines like React allow it
	*/
	parseTag(nestingLevel, parentArgType) {
		const startPosition = this.clonePosition();
		this.bump();
		const tagName = this.parseTagName();
		this.bumpSpace();
		if (this.bumpIf("/>")) return {
			val: {
				type: 0,
				value: `<${tagName}/>`,
				location: createLocation(startPosition, this.clonePosition())
			},
			err: null
		};
		else if (this.bumpIf(">")) {
			const childrenResult = this.parseMessage(nestingLevel + 1, parentArgType, true);
			if (childrenResult.err) return childrenResult;
			const children = childrenResult.val;
			const endTagStartPosition = this.clonePosition();
			if (this.bumpIf("</")) {
				if (this.isEOF() || !_isAlpha(this.char())) return this.error(23, createLocation(endTagStartPosition, this.clonePosition()));
				const closingTagNameStartPosition = this.clonePosition();
				if (tagName !== this.parseTagName()) return this.error(26, createLocation(closingTagNameStartPosition, this.clonePosition()));
				this.bumpSpace();
				if (!this.bumpIf(">")) return this.error(23, createLocation(endTagStartPosition, this.clonePosition()));
				return {
					val: {
						type: 8,
						value: tagName,
						children,
						location: createLocation(startPosition, this.clonePosition())
					},
					err: null
				};
			} else return this.error(27, createLocation(startPosition, this.clonePosition()));
		} else return this.error(23, createLocation(startPosition, this.clonePosition()));
	}
	/**
	* This method assumes that the caller has peeked ahead for the first tag character.
	*/
	parseTagName() {
		const startOffset = this.offset();
		this.bump();
		while (!this.isEOF() && _isPotentialElementNameChar(this.char())) this.bump();
		return this.message.slice(startOffset, this.offset());
	}
	parseLiteral(nestingLevel, parentArgType) {
		const start = this.clonePosition();
		let value = "";
		while (true) {
			const parseQuoteResult = this.tryParseQuote(parentArgType);
			if (parseQuoteResult) {
				value += parseQuoteResult;
				continue;
			}
			const parseUnquotedResult = this.tryParseUnquoted(nestingLevel, parentArgType);
			if (parseUnquotedResult) {
				value += parseUnquotedResult;
				continue;
			}
			const parseLeftAngleResult = this.tryParseLeftAngleBracket();
			if (parseLeftAngleResult) {
				value += parseLeftAngleResult;
				continue;
			}
			break;
		}
		const location = createLocation(start, this.clonePosition());
		return {
			val: {
				type: 0,
				value,
				location
			},
			err: null
		};
	}
	tryParseLeftAngleBracket() {
		if (!this.isEOF() && this.char() === 60 && (this.ignoreTag || !_isAlphaOrSlash(this.peek() || 0))) {
			this.bump();
			return "<";
		}
		return null;
	}
	/**
	* Starting with ICU 4.8, an ASCII apostrophe only starts quoted text if it immediately precedes
	* a character that requires quoting (that is, "only where needed"), and works the same in
	* nested messages as on the top level of the pattern. The new behavior is otherwise compatible.
	*/
	tryParseQuote(parentArgType) {
		if (this.isEOF() || this.char() !== 39) return null;
		switch (this.peek()) {
			case 39:
				this.bump();
				this.bump();
				return "'";
			case 123:
			case 60:
			case 62:
			case 125: break;
			case 35:
				if (parentArgType === "plural" || parentArgType === "selectordinal") break;
				return null;
			default: return null;
		}
		this.bump();
		const codePoints = [this.char()];
		this.bump();
		while (!this.isEOF()) {
			const ch = this.char();
			if (ch === 39) {
				if (this.peek() === 39) {
					codePoints.push(39);
					this.bump();
				} else {
					this.bump();
					break;
				}
			} else codePoints.push(ch);
			this.bump();
		}
		return String.fromCodePoint(...codePoints);
	}
	tryParseUnquoted(nestingLevel, parentArgType) {
		if (this.isEOF()) return null;
		const ch = this.char();
		if (ch === 60 || ch === 123 || ch === 35 && (parentArgType === "plural" || parentArgType === "selectordinal") || ch === 125 && nestingLevel > 0) return null;
		else {
			this.bump();
			return String.fromCodePoint(ch);
		}
	}
	parseArgument(nestingLevel, expectingCloseTag) {
		const openingBracePosition = this.clonePosition();
		this.bump();
		this.bumpSpace();
		if (this.isEOF()) return this.error(1, createLocation(openingBracePosition, this.clonePosition()));
		if (this.char() === 125) {
			this.bump();
			return this.error(2, createLocation(openingBracePosition, this.clonePosition()));
		}
		let value = this.parseIdentifierIfPossible().value;
		if (!value) return this.error(3, createLocation(openingBracePosition, this.clonePosition()));
		this.bumpSpace();
		if (this.isEOF()) return this.error(1, createLocation(openingBracePosition, this.clonePosition()));
		switch (this.char()) {
			case 125:
				this.bump();
				return {
					val: {
						type: 1,
						value,
						location: createLocation(openingBracePosition, this.clonePosition())
					},
					err: null
				};
			case 44:
				this.bump();
				this.bumpSpace();
				if (this.isEOF()) return this.error(1, createLocation(openingBracePosition, this.clonePosition()));
				return this.parseArgumentOptions(nestingLevel, expectingCloseTag, value, openingBracePosition);
			default: return this.error(3, createLocation(openingBracePosition, this.clonePosition()));
		}
	}
	/**
	* Advance the parser until the end of the identifier, if it is currently on
	* an identifier character. Return an empty string otherwise.
	*/
	parseIdentifierIfPossible() {
		const startingPosition = this.clonePosition();
		const startOffset = this.offset();
		const value = matchIdentifierAtIndex(this.message, startOffset);
		const endOffset = startOffset + value.length;
		this.bumpTo(endOffset);
		return {
			value,
			location: createLocation(startingPosition, this.clonePosition())
		};
	}
	parseArgumentOptions(nestingLevel, expectingCloseTag, value, openingBracePosition) {
		let typeStartPosition = this.clonePosition();
		let argType = this.parseIdentifierIfPossible().value;
		let typeEndPosition = this.clonePosition();
		switch (argType) {
			case "": return this.error(4, createLocation(typeStartPosition, typeEndPosition));
			case "number":
			case "date":
			case "time": {
				this.bumpSpace();
				let styleAndLocation = null;
				if (this.bumpIf(",")) {
					this.bumpSpace();
					const styleStartPosition = this.clonePosition();
					const result = this.parseSimpleArgStyleIfPossible();
					if (result.err) return result;
					const style = trimEnd(result.val);
					if (style.length === 0) return this.error(6, createLocation(this.clonePosition(), this.clonePosition()));
					styleAndLocation = {
						style,
						styleLocation: createLocation(styleStartPosition, this.clonePosition())
					};
				}
				const argCloseResult = this.tryParseArgumentClose(openingBracePosition);
				if (argCloseResult.err) return argCloseResult;
				const location = createLocation(openingBracePosition, this.clonePosition());
				if (styleAndLocation && styleAndLocation.style.startsWith("::")) {
					let skeleton = trimStart(styleAndLocation.style.slice(2));
					if (argType === "number") {
						const result = this.parseNumberSkeletonFromString(skeleton, styleAndLocation.styleLocation);
						if (result.err) return result;
						return {
							val: {
								type: 2,
								value,
								location,
								style: result.val
							},
							err: null
						};
					} else {
						if (skeleton.length === 0) return this.error(10, location);
						let dateTimePattern = skeleton;
						if (this.locale) dateTimePattern = getBestPattern(skeleton, this.locale);
						const style = {
							type: 1,
							pattern: dateTimePattern,
							location: styleAndLocation.styleLocation,
							parsedOptions: this.shouldParseSkeletons ? parseDateTimeSkeleton(dateTimePattern) : {}
						};
						return {
							val: {
								type: argType === "date" ? 3 : 4,
								value,
								location,
								style
							},
							err: null
						};
					}
				}
				return {
					val: {
						type: argType === "number" ? 2 : argType === "date" ? 3 : 4,
						value,
						location,
						style: styleAndLocation?.style ?? null
					},
					err: null
				};
			}
			case "plural":
			case "selectordinal":
			case "select": {
				const typeEndPosition = this.clonePosition();
				this.bumpSpace();
				if (!this.bumpIf(",")) return this.error(12, createLocation(typeEndPosition, { ...typeEndPosition }));
				this.bumpSpace();
				let identifierAndLocation = this.parseIdentifierIfPossible();
				let pluralOffset = 0;
				if (argType !== "select" && identifierAndLocation.value === "offset") {
					if (!this.bumpIf(":")) return this.error(13, createLocation(this.clonePosition(), this.clonePosition()));
					this.bumpSpace();
					const result = this.tryParseDecimalInteger(13, 14);
					if (result.err) return result;
					this.bumpSpace();
					identifierAndLocation = this.parseIdentifierIfPossible();
					pluralOffset = result.val;
				}
				const optionsResult = this.tryParsePluralOrSelectOptions(nestingLevel, argType, expectingCloseTag, identifierAndLocation);
				if (optionsResult.err) return optionsResult;
				const argCloseResult = this.tryParseArgumentClose(openingBracePosition);
				if (argCloseResult.err) return argCloseResult;
				const location = createLocation(openingBracePosition, this.clonePosition());
				if (argType === "select") return {
					val: {
						type: 5,
						value,
						options: fromEntries(optionsResult.val),
						location
					},
					err: null
				};
				else return {
					val: {
						type: 6,
						value,
						options: fromEntries(optionsResult.val),
						offset: pluralOffset,
						pluralType: argType === "plural" ? "cardinal" : "ordinal",
						location
					},
					err: null
				};
			}
			default: return this.error(5, createLocation(typeStartPosition, typeEndPosition));
		}
	}
	tryParseArgumentClose(openingBracePosition) {
		if (this.isEOF() || this.char() !== 125) return this.error(1, createLocation(openingBracePosition, this.clonePosition()));
		this.bump();
		return {
			val: true,
			err: null
		};
	}
	/**
	* See: https://github.com/unicode-org/icu/blob/af7ed1f6d2298013dc303628438ec4abe1f16479/icu4c/source/common/messagepattern.cpp#L659
	*/
	parseSimpleArgStyleIfPossible() {
		let nestedBraces = 0;
		const startPosition = this.clonePosition();
		while (!this.isEOF()) switch (this.char()) {
			case 39: {
				this.bump();
				let apostrophePosition = this.clonePosition();
				if (!this.bumpUntil("'")) return this.error(11, createLocation(apostrophePosition, this.clonePosition()));
				this.bump();
				break;
			}
			case 123:
				nestedBraces += 1;
				this.bump();
				break;
			case 125:
				if (nestedBraces > 0) nestedBraces -= 1;
				else return {
					val: this.message.slice(startPosition.offset, this.offset()),
					err: null
				};
				break;
			default: this.bump();
		}
		return {
			val: this.message.slice(startPosition.offset, this.offset()),
			err: null
		};
	}
	parseNumberSkeletonFromString(skeleton, location) {
		let tokens = [];
		try {
			tokens = parseNumberSkeletonFromString(skeleton);
		} catch {
			return this.error(7, location);
		}
		return {
			val: {
				type: 0,
				tokens,
				location,
				parsedOptions: this.shouldParseSkeletons ? parseNumberSkeleton(tokens) : {}
			},
			err: null
		};
	}
	/**
	* @param nesting_level The current nesting level of messages.
	*     This can be positive when parsing message fragment in select or plural argument options.
	* @param parent_arg_type The parent argument's type.
	* @param parsed_first_identifier If provided, this is the first identifier-like selector of
	*     the argument. It is a by-product of a previous parsing attempt.
	* @param expecting_close_tag If true, this message is directly or indirectly nested inside
	*     between a pair of opening and closing tags. The nested message will not parse beyond
	*     the closing tag boundary.
	*/
	tryParsePluralOrSelectOptions(nestingLevel, parentArgType, expectCloseTag, parsedFirstIdentifier) {
		let hasOtherClause = false;
		const options = [];
		const parsedSelectors = /* @__PURE__ */ new Set();
		let { value: selector, location: selectorLocation } = parsedFirstIdentifier;
		while (true) {
			if (selector.length === 0) {
				const startPosition = this.clonePosition();
				if (parentArgType !== "select" && this.bumpIf("=")) {
					const result = this.tryParseDecimalInteger(16, 19);
					if (result.err) return result;
					selectorLocation = createLocation(startPosition, this.clonePosition());
					selector = this.message.slice(startPosition.offset, this.offset());
				} else break;
			}
			if (parsedSelectors.has(selector)) return this.error(parentArgType === "select" ? 21 : 20, selectorLocation);
			if (selector === "other") hasOtherClause = true;
			this.bumpSpace();
			const openingBracePosition = this.clonePosition();
			if (!this.bumpIf("{")) return this.error(parentArgType === "select" ? 17 : 18, createLocation(this.clonePosition(), this.clonePosition()));
			const fragmentResult = this.parseMessage(nestingLevel + 1, parentArgType, expectCloseTag);
			if (fragmentResult.err) return fragmentResult;
			const argCloseResult = this.tryParseArgumentClose(openingBracePosition);
			if (argCloseResult.err) return argCloseResult;
			options.push([selector, {
				value: fragmentResult.val,
				location: createLocation(openingBracePosition, this.clonePosition())
			}]);
			parsedSelectors.add(selector);
			this.bumpSpace();
			({value: selector, location: selectorLocation} = this.parseIdentifierIfPossible());
		}
		if (options.length === 0) return this.error(parentArgType === "select" ? 15 : 16, createLocation(this.clonePosition(), this.clonePosition()));
		if (this.requiresOtherClause && !hasOtherClause) return this.error(22, createLocation(this.clonePosition(), this.clonePosition()));
		return {
			val: options,
			err: null
		};
	}
	tryParseDecimalInteger(expectNumberError, invalidNumberError) {
		let sign = 1;
		const startingPosition = this.clonePosition();
		if (this.bumpIf("+")) {} else if (this.bumpIf("-")) sign = -1;
		let hasDigits = false;
		let decimal = 0;
		while (!this.isEOF()) {
			const ch = this.char();
			if (ch >= 48 && ch <= 57) {
				hasDigits = true;
				decimal = decimal * 10 + (ch - 48);
				this.bump();
			} else break;
		}
		const location = createLocation(startingPosition, this.clonePosition());
		if (!hasDigits) return this.error(expectNumberError, location);
		decimal *= sign;
		if (!Number.isSafeInteger(decimal)) return this.error(invalidNumberError, location);
		return {
			val: decimal,
			err: null
		};
	}
	offset() {
		return this.position.offset;
	}
	isEOF() {
		return this.offset() === this.message.length;
	}
	clonePosition() {
		return {
			offset: this.position.offset,
			line: this.position.line,
			column: this.position.column
		};
	}
	/**
	* Return the code point at the current position of the parser.
	* Throws if the index is out of bound.
	*/
	char() {
		const offset = this.position.offset;
		if (offset >= this.message.length) throw Error("out of bound");
		const code = this.message.codePointAt(offset);
		if (code === void 0) throw Error(`Offset ${offset} is at invalid UTF-16 code unit boundary`);
		return code;
	}
	error(kind, location) {
		return {
			val: null,
			err: {
				kind,
				message: this.message,
				location
			}
		};
	}
	/** Bump the parser to the next UTF-16 code unit. */
	bump() {
		if (this.isEOF()) return;
		const code = this.char();
		if (code === 10) {
			this.position.line += 1;
			this.position.column = 1;
			this.position.offset += 1;
		} else {
			this.position.column += 1;
			this.position.offset += code < 65536 ? 1 : 2;
		}
	}
	/**
	* If the substring starting at the current position of the parser has
	* the given prefix, then bump the parser to the character immediately
	* following the prefix and return true. Otherwise, don't bump the parser
	* and return false.
	*/
	bumpIf(prefix) {
		if (this.message.startsWith(prefix, this.offset())) {
			for (let i = 0; i < prefix.length; i++) this.bump();
			return true;
		}
		return false;
	}
	/**
	* Bump the parser until the pattern character is found and return `true`.
	* Otherwise bump to the end of the file and return `false`.
	*/
	bumpUntil(pattern) {
		const currentOffset = this.offset();
		const index = this.message.indexOf(pattern, currentOffset);
		if (index >= 0) {
			this.bumpTo(index);
			return true;
		} else {
			this.bumpTo(this.message.length);
			return false;
		}
	}
	/**
	* Bump the parser to the target offset.
	* If target offset is beyond the end of the input, bump the parser to the end of the input.
	*/
	bumpTo(targetOffset) {
		if (this.offset() > targetOffset) throw Error(`targetOffset ${targetOffset} must be greater than or equal to the current offset ${this.offset()}`);
		targetOffset = Math.min(targetOffset, this.message.length);
		while (true) {
			const offset = this.offset();
			if (offset === targetOffset) break;
			if (offset > targetOffset) throw Error(`targetOffset ${targetOffset} is at invalid UTF-16 code unit boundary`);
			this.bump();
			if (this.isEOF()) break;
		}
	}
	/** advance the parser through all whitespace to the next non-whitespace code unit. */
	bumpSpace() {
		while (!this.isEOF() && _isWhiteSpace(this.char())) this.bump();
	}
	/**
	* Peek at the *next* Unicode codepoint in the input without advancing the parser.
	* If the input has been exhausted, then this returns null.
	*/
	peek() {
		if (this.isEOF()) return null;
		const code = this.char();
		const offset = this.offset();
		return this.message.charCodeAt(offset + (code >= 65536 ? 2 : 1)) ?? null;
	}
};
/**
* This check if codepoint is alphabet (lower & uppercase)
* @param codepoint
* @returns
*/
function _isAlpha(codepoint) {
	return codepoint >= 97 && codepoint <= 122 || codepoint >= 65 && codepoint <= 90;
}
function _isAlphaOrSlash(codepoint) {
	return _isAlpha(codepoint) || codepoint === 47;
}
/** See `parseTag` function docs. */
function _isPotentialElementNameChar(c) {
	return c === 45 || c === 46 || c >= 48 && c <= 57 || c === 95 || c >= 97 && c <= 122 || c >= 65 && c <= 90 || c == 183 || c >= 192 && c <= 214 || c >= 216 && c <= 246 || c >= 248 && c <= 893 || c >= 895 && c <= 8191 || c >= 8204 && c <= 8205 || c >= 8255 && c <= 8256 || c >= 8304 && c <= 8591 || c >= 11264 && c <= 12271 || c >= 12289 && c <= 55295 || c >= 63744 && c <= 64975 || c >= 65008 && c <= 65533 || c >= 65536 && c <= 983039;
}
/**
* Code point equivalent of regex `\p{White_Space}`.
* From: https://www.unicode.org/Public/UCD/latest/ucd/PropList.txt
*/
function _isWhiteSpace(c) {
	return c >= 9 && c <= 13 || c === 32 || c === 133 || c >= 8206 && c <= 8207 || c === 8232 || c === 8233;
}
function pruneLocation(els) {
	els.forEach((el) => {
		delete el.location;
		if (isSelectElement(el) || isPluralElement(el)) for (const k in el.options) {
			delete el.options[k].location;
			pruneLocation(el.options[k].value);
		}
		else if (isNumberElement(el) && isNumberSkeleton(el.style)) delete el.style.location;
		else if ((isDateElement(el) || isTimeElement(el)) && isDateTimeSkeleton(el.style)) delete el.style.location;
		else if (isTagElement(el)) pruneLocation(el.children);
	});
}
function parse(message, opts = {}) {
	opts = {
		shouldParseSkeletons: true,
		requiresOtherClause: true,
		...opts
	};
	const result = new Parser(message, opts).parse();
	if (result.err) {
		const error = SyntaxError(ErrorKind[result.err.kind]);
		error.location = result.err.location;
		error.originalMessage = result.err.message;
		throw error;
	}
	if (!opts?.captureLocation) pruneLocation(result.val);
	return result.val;
}
//#endregion
//#region node_modules/intl-messageformat/index.js
var FormatError = class extends Error {
	constructor(msg, code, originalMessage) {
		super(msg);
		this.code = code;
		this.originalMessage = originalMessage;
	}
	toString() {
		return `[formatjs Error: ${this.code}] ${this.message}`;
	}
};
var InvalidValueError = class extends FormatError {
	constructor(variableId, value, options, originalMessage) {
		super(`Invalid values for "${variableId}": "${value}". Options are "${Object.keys(options).join("\", \"")}"`, "INVALID_VALUE", originalMessage);
	}
};
var InvalidValueTypeError = class extends FormatError {
	constructor(value, type, originalMessage) {
		super(`Value for "${value}" must be of type ${type}`, "INVALID_VALUE", originalMessage);
	}
};
var MissingValueError = class extends FormatError {
	constructor(variableId, originalMessage) {
		super(`The intl string context variable "${variableId}" was not provided to the string "${originalMessage}"`, "MISSING_VALUE", originalMessage);
	}
};
function mergeLiteral(parts) {
	if (parts.length < 2) return parts;
	return parts.reduce((all, part) => {
		const lastPart = all[all.length - 1];
		if (!lastPart || lastPart.type !== 0 || part.type !== 0) all.push(part);
		else lastPart.value += part.value;
		return all;
	}, []);
}
function isFormatXMLElementFn(el) {
	return typeof el === "function";
}
function formatToParts(els, locales, formatters, formats, values, currentPluralValue, originalMessage) {
	if (els.length === 1 && isLiteralElement(els[0])) return [{
		type: 0,
		value: els[0].value
	}];
	const result = [];
	for (const el of els) {
		if (isLiteralElement(el)) {
			result.push({
				type: 0,
				value: el.value
			});
			continue;
		}
		if (isPoundElement(el)) {
			if (typeof currentPluralValue === "number") result.push({
				type: 0,
				value: formatters.getNumberFormat(locales).format(currentPluralValue)
			});
			continue;
		}
		const { value: varName } = el;
		if (!(values && varName in values)) throw new MissingValueError(varName, originalMessage);
		let value = values[varName];
		if (isArgumentElement(el)) {
			if (!value || typeof value === "string" || typeof value === "number" || typeof value === "bigint") value = typeof value === "string" || typeof value === "number" || typeof value === "bigint" ? String(value) : "";
			result.push({
				type: typeof value === "string" ? 0 : 1,
				value
			});
			continue;
		}
		if (isDateElement(el)) {
			const style = typeof el.style === "string" ? formats.date[el.style] : isDateTimeSkeleton(el.style) ? el.style.parsedOptions : void 0;
			result.push({
				type: 0,
				value: formatters.getDateTimeFormat(locales, style).format(value)
			});
			continue;
		}
		if (isTimeElement(el)) {
			const style = typeof el.style === "string" ? formats.time[el.style] : isDateTimeSkeleton(el.style) ? el.style.parsedOptions : formats.time.medium;
			result.push({
				type: 0,
				value: formatters.getDateTimeFormat(locales, style).format(value)
			});
			continue;
		}
		if (isNumberElement(el)) {
			const style = typeof el.style === "string" ? formats.number[el.style] : isNumberSkeleton(el.style) ? el.style.parsedOptions : void 0;
			if (style && style.scale) {
				const scale = style.scale || 1;
				if (typeof value === "bigint") {
					if (!Number.isInteger(scale)) throw new TypeError(`Cannot apply fractional scale ${scale} to bigint value. Scale must be an integer when formatting bigint.`);
					value = value * BigInt(scale);
				} else value = value * scale;
			}
			result.push({
				type: 0,
				value: formatters.getNumberFormat(locales, style).format(value)
			});
			continue;
		}
		if (isTagElement(el)) {
			const { children, value } = el;
			const formatFn = values[value];
			if (!isFormatXMLElementFn(formatFn)) throw new InvalidValueTypeError(value, "function", originalMessage);
			let chunks = formatFn(formatToParts(children, locales, formatters, formats, values, currentPluralValue).map((p) => p.value));
			if (!Array.isArray(chunks)) chunks = [chunks];
			result.push(...chunks.map((c) => {
				return {
					type: typeof c === "string" ? 0 : 1,
					value: c
				};
			}));
		}
		if (isSelectElement(el)) {
			const key = value;
			const opt = (Object.prototype.hasOwnProperty.call(el.options, key) ? el.options[key] : void 0) || el.options.other;
			if (!opt) throw new InvalidValueError(el.value, value, Object.keys(el.options), originalMessage);
			result.push(...formatToParts(opt.value, locales, formatters, formats, values));
			continue;
		}
		if (isPluralElement(el)) {
			const exactKey = `=${value}`;
			let opt = Object.prototype.hasOwnProperty.call(el.options, exactKey) ? el.options[exactKey] : void 0;
			if (!opt) {
				if (!Intl.PluralRules) throw new FormatError(`Intl.PluralRules is not available in this environment.
Try polyfilling it using "@formatjs/intl-pluralrules"
`, "MISSING_INTL_API", originalMessage);
				const numericValue = typeof value === "bigint" ? Number(value) : value;
				const rule = formatters.getPluralRules(locales, { type: el.pluralType }).select(numericValue - (el.offset || 0));
				opt = (Object.prototype.hasOwnProperty.call(el.options, rule) ? el.options[rule] : void 0) || el.options.other;
			}
			if (!opt) throw new InvalidValueError(el.value, value, Object.keys(el.options), originalMessage);
			const numericValue = typeof value === "bigint" ? Number(value) : value;
			result.push(...formatToParts(opt.value, locales, formatters, formats, values, numericValue - (el.offset || 0)));
			continue;
		}
	}
	return mergeLiteral(result);
}
function mergeConfig(c1, c2) {
	if (!c2) return c1;
	return {
		...c1,
		...c2,
		...Object.keys(c1).reduce((all, k) => {
			all[k] = {
				...c1[k],
				...c2[k]
			};
			return all;
		}, {})
	};
}
function mergeConfigs(defaultConfig, configs) {
	if (!configs) return defaultConfig;
	return Object.keys(defaultConfig).reduce((all, k) => {
		all[k] = mergeConfig(defaultConfig[k], configs[k]);
		return all;
	}, { ...defaultConfig });
}
function createFastMemoizeCache(store) {
	return { create() {
		return {
			get(key) {
				return store[key];
			},
			set(key, value) {
				store[key] = value;
			}
		};
	} };
}
function createDefaultFormatters(cache = {
	number: {},
	dateTime: {},
	pluralRules: {}
}) {
	return {
		getNumberFormat: memoize((...args) => new Intl.NumberFormat(...args), {
			cache: createFastMemoizeCache(cache.number),
			strategy: strategies.variadic
		}),
		getDateTimeFormat: memoize((...args) => new Intl.DateTimeFormat(...args), {
			cache: createFastMemoizeCache(cache.dateTime),
			strategy: strategies.variadic
		}),
		getPluralRules: memoize((...args) => new Intl.PluralRules(...args), {
			cache: createFastMemoizeCache(cache.pluralRules),
			strategy: strategies.variadic
		})
	};
}
var intl_messageformat_default = class IntlMessageFormat {
	constructor(message, locales = IntlMessageFormat.defaultLocale, overrideFormats, opts) {
		this.formatterCache = {
			number: {},
			dateTime: {},
			pluralRules: {}
		};
		this.format = (values) => {
			const parts = this.formatToParts(values);
			if (parts.length === 1) return parts[0].value;
			const result = parts.reduce((all, part) => {
				if (!all.length || part.type !== 0 || typeof all[all.length - 1] !== "string") all.push(part.value);
				else all[all.length - 1] += part.value;
				return all;
			}, []);
			if (result.length <= 1) return result[0] || "";
			return result;
		};
		this.formatToParts = (values) => formatToParts(this.ast, this.locales, this.formatters, this.formats, values, void 0, this.message);
		this.resolvedOptions = () => ({ locale: this.resolvedLocale?.toString() || Intl.NumberFormat.supportedLocalesOf(this.locales)[0] });
		this.getAst = () => this.ast;
		this.locales = locales;
		this.resolvedLocale = IntlMessageFormat.resolveLocale(locales);
		if (typeof message === "string") {
			this.message = message;
			if (!IntlMessageFormat.__parse) throw new TypeError("IntlMessageFormat.__parse must be set to process `message` of type `string`");
			const { ...parseOpts } = opts || {};
			this.ast = IntlMessageFormat.__parse(message, {
				...parseOpts,
				locale: this.resolvedLocale
			});
		} else this.ast = message;
		if (!Array.isArray(this.ast)) throw new TypeError("A message must be provided as a String or AST.");
		this.formats = mergeConfigs(IntlMessageFormat.formats, overrideFormats);
		this.formatters = opts && opts.formatters || createDefaultFormatters(this.formatterCache);
	}
	static {
		this.memoizedDefaultLocale = null;
	}
	static get defaultLocale() {
		if (!IntlMessageFormat.memoizedDefaultLocale) IntlMessageFormat.memoizedDefaultLocale = new Intl.NumberFormat().resolvedOptions().locale;
		return IntlMessageFormat.memoizedDefaultLocale;
	}
	static {
		this.resolveLocale = (locales) => {
			if (typeof Intl.Locale === "undefined") return;
			const supportedLocales = Intl.NumberFormat.supportedLocalesOf(locales);
			if (supportedLocales.length > 0) return new Intl.Locale(supportedLocales[0]);
			return new Intl.Locale(typeof locales === "string" ? locales : locales[0]);
		};
	}
	static {
		this.__parse = parse;
	}
	static {
		this.formats = {
			number: {
				integer: { maximumFractionDigits: 0 },
				currency: { style: "currency" },
				percent: { style: "percent" }
			},
			date: {
				short: {
					month: "numeric",
					day: "numeric",
					year: "2-digit"
				},
				medium: {
					month: "short",
					day: "numeric",
					year: "numeric"
				},
				long: {
					month: "long",
					day: "numeric",
					year: "numeric"
				},
				full: {
					weekday: "long",
					month: "long",
					day: "numeric",
					year: "numeric"
				}
			},
			time: {
				short: {
					hour: "numeric",
					minute: "numeric"
				},
				medium: {
					hour: "numeric",
					minute: "numeric",
					second: "numeric"
				},
				long: {
					hour: "numeric",
					minute: "numeric",
					second: "numeric",
					timeZoneName: "short"
				},
				full: {
					hour: "numeric",
					minute: "numeric",
					second: "numeric",
					timeZoneName: "short"
				}
			}
		};
	}
};
//#endregion
//#region node_modules/@astryxdesign/core/dist/i18n/generated-locales/en.generated.js
/**
* @generated by scripts/generate-i18n-runtime.mjs from packages/core/locales/en.json.
* Translator descriptions remain in the authored JSON catalogs and must not be copied here.
* Do not edit by hand. Run `pnpm generate:i18n-runtime` instead.
*/
var runtimeCatalog = {
	"@astryx.pagination.label": "Pagination",
	"@astryx.pagination.previous": "Go to previous page",
	"@astryx.pagination.next": "Go to next page",
	"@astryx.pagination.previousBy": "Go back {step, number} {step, plural, one {page} other {pages}}",
	"@astryx.pagination.nextBy": "Go forward {step, number} {step, plural, one {page} other {pages}}",
	"@astryx.pagination.first": "Go to first page",
	"@astryx.pagination.last": "Go to last page",
	"@astryx.pagination.goToPage": "Go to page {page, number}",
	"@astryx.pagination.goToPageInput": "Go to page",
	"@astryx.pagination.pageLabel": "Page",
	"@astryx.pagination.ofTotalPages": "/ {total, number}",
	"@astryx.pagination.pageIndicators": "Page indicators",
	"@astryx.pagination.itemsPerPage": "Items per page",
	"@astryx.pagination.count": "{from, number}–{to, number} of {total, number}",
	"@astryx.pagination.pageOfTotal": "Page {current, number} of {total, number}",
	"@astryx.pagination.pageAnnounce": "Page {current, number}",
	"@astryx.powersearch.editor.field": "Field",
	"@astryx.powersearch.editor.operator": "Operator",
	"@astryx.powersearch.editor.addFilter": "+ Add filter",
	"@astryx.powersearch.editor.removeFilter": "Remove filter",
	"@astryx.powersearch.editor.groupOperator": "Group operator",
	"@astryx.powersearch.editor.group": "Group",
	"@astryx.powersearch.editor.delete": "Delete",
	"@astryx.powersearch.editor.cancel": "Cancel",
	"@astryx.powersearch.editor.apply": "Apply",
	"@astryx.powersearch.valueEditor.value": "Value",
	"@astryx.powersearch.valueEditor.values": "Values",
	"@astryx.powersearch.valueEditor.time": "Time",
	"@astryx.powersearch.valueEditor.date": "Date",
	"@astryx.powersearch.valueEditor.relativeDate": "Relative date",
	"@astryx.powersearch.valueEditor.startDate": "Start date",
	"@astryx.powersearch.valueEditor.endDate": "End date",
	"@astryx.powersearch.valueEditor.entities": "Entities",
	"@astryx.powersearch.valueEditor.searchPlaceholder": "Search…",
	"@astryx.powersearch.valueEditor.enterValuePlaceholder": "Enter value…",
	"@astryx.powersearch.valueEditor.addValuesPlaceholder": "Add values…",
	"@astryx.powersearch.valueEditor.enterNumberPlaceholder": "Enter number…",
	"@astryx.powersearch.valueEditor.selectValuesPlaceholder": "Select values…",
	"@astryx.powersearch.operator.contains": "contains",
	"@astryx.powersearch.operator.notContains": "does not contain",
	"@astryx.powersearch.operator.startsWith": "starts with",
	"@astryx.powersearch.operator.notStartsWith": "does not start with",
	"@astryx.powersearch.operator.endsWith": "ends with",
	"@astryx.powersearch.operator.notEndsWith": "does not end with",
	"@astryx.powersearch.operator.is": "is",
	"@astryx.powersearch.operator.isNot": "is not",
	"@astryx.powersearch.operator.equals": "is",
	"@astryx.powersearch.operator.notEquals": "is not",
	"@astryx.powersearch.operator.greaterThan": "is greater than",
	"@astryx.powersearch.operator.lessThan": "is less than",
	"@astryx.powersearch.operator.greaterThanOrEqual": "is greater than or equal to",
	"@astryx.powersearch.operator.lessThanOrEqual": "is less than or equal to",
	"@astryx.powersearch.operator.before": "is before",
	"@astryx.powersearch.operator.after": "is after",
	"@astryx.powersearch.operator.between": "is between",
	"@astryx.powersearch.operator.isTrue": "is true",
	"@astryx.powersearch.operator.isFalse": "is false",
	"@astryx.powersearch.operator.isAnyOf": "is any of",
	"@astryx.powersearch.operator.isNoneOf": "is none of",
	"@astryx.powersearch.valueEditor.itemsCount": "{count, number} {count, plural, one {item} other {items}}",
	"@astryx.powersearch.valueEditor.entitiesCount": "{count, number} {count, plural, one {entity} other {entities}}",
	"@astryx.powersearch.valueEditor.dateRange": "date range",
	"@astryx.powersearch.valueEditor.filtersCount": "{count, number} {count, plural, one {filter} other {filters}}",
	"@astryx.powersearch.resultCount": "{count, number} {count, plural, one {result} other {results}}",
	"@astryx.alertDialog.cancel": "Cancel",
	"@astryx.appShell.mobileNavigation": "Mobile navigation",
	"@astryx.appShell.skipToContent": "Skip to content",
	"@astryx.avatar.nameWithStatus": "{name}, {status}",
	"@astryx.avatarGroup.label": "Avatars",
	"@astryx.avatarGroup.keyboardHint": "Use arrow keys to move between avatars",
	"@astryx.avatarGroup.overflow": "{count, number} more",
	"@astryx.banner.dismiss": "Dismiss",
	"@astryx.banner.dismissTitled": "{dismiss} {title}",
	"@astryx.calendar.previousMonth": "Previous month",
	"@astryx.calendar.nextMonth": "Next month",
	"@astryx.calendar.daySelected": "{date}, selected",
	"@astryx.calendar.dayRangeStart": "{date}, range start",
	"@astryx.calendar.dayRangeEnd": "{date}, range end",
	"@astryx.calendar.dayRangeStartAndEnd": "{date}, range start and range end",
	"@astryx.calendar.dayInRange": "{date}, in range",
	"@astryx.calendar.rangeStartAnnounce": "Start date {date}. Select an end date.",
	"@astryx.calendar.rangeCompleteAnnounce": "Selected range: {start} to {end}.",
	"@astryx.calendar.rangeClearedAnnounce": "Cleared start date {date}. Select a start date.",
	"@astryx.carousel.label": "Carousel",
	"@astryx.carousel.scrollLeft": "Scroll left",
	"@astryx.carousel.scrollRight": "Scroll right",
	"@astryx.carousel.slideLabel": "Slide {current, number} of {total, number}",
	"@astryx.chart.label": "Chart",
	"@astryx.chart.labelWithSeries": "Chart of {series} by {xKey}",
	"@astryx.chart.dataTableCaption": "{label} data",
	"@astryx.chartLegend.label": "Chart legend",
	"@astryx.chat.status.sending": "Sending",
	"@astryx.chat.status.sent": "Sent",
	"@astryx.chat.status.delivered": "Delivered",
	"@astryx.chat.status.read": "Read",
	"@astryx.chat.status.failed": "Failed",
	"@astryx.chat.messageAriaLabel": "Message {status}",
	"@astryx.chat.pastedText.expand": "Expand",
	"@astryx.checkboxList.item.checkbox": "Checkbox",
	"@astryx.commandPalette.emptySearch": "No results",
	"@astryx.commandPalette.emptyBootstrap": "Type to search",
	"@astryx.commandPalette.resultCount": "{count, number} {count, plural, one {result} other {results}}",
	"@astryx.commandPalette.noResultsFor": "No results for {query}",
	"@astryx.commandPalette.loading": "Loading",
	"@astryx.dateRangeInput.presetDateRanges": "Preset date ranges",
	"@astryx.dateTimeInput.timePlaceholder": "Select a time",
	"@astryx.dialog.close": "Close",
	"@astryx.dropdownMenu.label": "Menu",
	"@astryx.dropdownMenu.back": "Back",
	"@astryx.dropdownMenu.backTo": "Back to {parent}",
	"@astryx.lightbox.close": "Close",
	"@astryx.lightbox.previous": "Previous",
	"@astryx.lightbox.next": "Next",
	"@astryx.chatTypingIndicator.one": "{name} is typing…",
	"@astryx.chatTypingIndicator.many": "{names} are typing…",
	"@astryx.chatTypingIndicator.others": "{count, number} {count, plural, one {other} other {others}}",
	"@astryx.listInput.emptyTitle": "No {itemName}s yet",
	"@astryx.listInput.emptyDescription": "Add a {itemName} to get started.",
	"@astryx.listInput.addItem": "Add {itemName}",
	"@astryx.listInput.removeItem": "Remove {itemName} {position, number}",
	"@astryx.listInput.removeUnavailable": "Remove is unavailable while the list is disabled",
	"@astryx.listInput.reorderItem": "Reorder {itemName} {position, number}",
	"@astryx.listInput.fieldLabelWithPosition": "{header}, {itemName} {position, number} of {total, number}",
	"@astryx.listInput.reorderInstructions": "Use Arrow Up or Arrow Down to move this item one position. Press Space or Enter to pick it up for extended keyboard reordering.",
	"@astryx.listInput.announceAdded": "Added {itemName} {position, number}.",
	"@astryx.listInput.announceRemoved": "Removed {itemName} {position, number}.",
	"@astryx.listInput.announceGrabbed": "{itemName} {position, number} grabbed. Use arrow keys to move, Space or Enter to drop, and Escape to cancel.",
	"@astryx.listInput.announceMovedToPosition": "{itemName} moved to position {position, number} of {total, number}.",
	"@astryx.listInput.announceReorderCancelled": "Reordering cancelled.",
	"@astryx.listInput.announceReturnedToPosition": "{itemName} returned to position {position, number}.",
	"@astryx.listInput.announceDropped": "{itemName} dropped at position {position, number} of {total, number}.",
	"@astryx.listInput.announceAlreadyAtBoundary": "This {itemName} is already {boundary, select, first {first} last {last} other {}}.",
	"@astryx.diffViewer.label": "Diff",
	"@astryx.diffViewer.renamedPath": "{oldPath} → {newPath}",
	"@astryx.diffViewer.statusAdded": "Added",
	"@astryx.diffViewer.statusDeleted": "Deleted",
	"@astryx.diffViewer.statusRenamed": "Renamed",
	"@astryx.diffViewer.addedCount": "+{count, number}",
	"@astryx.diffViewer.removedCount": "−{count, number}",
	"@astryx.diffViewer.stats": "{added, plural, one {# line added} other {# lines added}}, {removed, plural, one {# line removed} other {# lines removed}}",
	"@astryx.diffViewer.added": "Added",
	"@astryx.diffViewer.removed": "Removed",
	"@astryx.diffViewer.lineNumberButton": "{side, select, old {Original line {line, number}} other {Changed line {line, number}}}",
	"@astryx.diffViewer.columnOldLine": "Original line number",
	"@astryx.diffViewer.columnNewLine": "Changed line number",
	"@astryx.diffViewer.columnChange": "Change",
	"@astryx.diffViewer.columnCode": "Code",
	"@astryx.diffViewer.columnOldCode": "Original code",
	"@astryx.diffViewer.columnNewCode": "Changed code",
	"@astryx.diffViewer.binary": "Binary file not shown",
	"@astryx.diffViewer.noChanges": "No content changes",
	"@astryx.markdownHeadingLinks.copied": "Link copied",
	"@astryx.markdownHeadingLinks.copy": "Copy link to {heading}",
	"@astryx.richTextEditor.tabEscapeHint": "Press Escape then Tab to move focus out of the editor.",
	"@astryx.richTextEditor.toolbar.label": "Text formatting",
	"@astryx.richTextEditor.toolbar.actions": "Formatting actions",
	"@astryx.richTextEditor.toolbar.undo": "Undo",
	"@astryx.richTextEditor.toolbar.redo": "Redo",
	"@astryx.richTextEditor.toolbar.historyDivider": "History and block formats",
	"@astryx.richTextEditor.toolbar.blockFormat": "Block format",
	"@astryx.richTextEditor.toolbar.formatDivider": "Block and inline formats",
	"@astryx.richTextEditor.toolbar.paragraph": "Paragraph",
	"@astryx.richTextEditor.toolbar.heading1": "Heading 1",
	"@astryx.richTextEditor.toolbar.heading2": "Heading 2",
	"@astryx.richTextEditor.toolbar.heading3": "Heading 3",
	"@astryx.richTextEditor.toolbar.bulletedList": "Bulleted list",
	"@astryx.richTextEditor.toolbar.numberedList": "Numbered list",
	"@astryx.richTextEditor.toolbar.blockQuote": "Block quote",
	"@astryx.richTextEditor.toolbar.bold": "Bold",
	"@astryx.richTextEditor.toolbar.italic": "Italic",
	"@astryx.richTextEditor.toolbar.underline": "Underline",
	"@astryx.richTextEditor.toolbar.strikethrough": "Strikethrough",
	"@astryx.richTextEditor.toolbar.inlineCode": "Inline code",
	"@astryx.richTextEditor.toolbar.link": "Link",
	"@astryx.richTextEditor.link.insertTitle": "Insert link",
	"@astryx.richTextEditor.link.editTitle": "Edit link",
	"@astryx.richTextEditor.link.url": "URL",
	"@astryx.richTextEditor.link.invalidUrl": "Enter a valid http, https, mailto, or tel URL.",
	"@astryx.richTextEditor.link.remove": "Remove link",
	"@astryx.richTextEditor.link.cancel": "Cancel",
	"@astryx.richTextEditor.link.add": "Add link",
	"@astryx.richTextEditor.link.update": "Update link",
	"@astryx.markdown.taskList": "Task list",
	"@astryx.markdown.table": "Table",
	"@astryx.mobileNav.closeNavigation": "Close navigation",
	"@astryx.multiSelector.selectAll": "Select all",
	"@astryx.multiSelector.searchPlaceholder": "Search…",
	"@astryx.multiSelector.searchOptions": "Search options",
	"@astryx.multiSelector.empty": "No options",
	"@astryx.multiSelector.selectAllPartiallySelected": "{label}, partially selected",
	"@astryx.popover.close": "Close popover",
	"@astryx.selector.searchPlaceholder": "Search…",
	"@astryx.selector.searchOptions": "Search options",
	"@astryx.selector.empty": "No options",
	"@astryx.sideNav.label": "Side navigation",
	"@astryx.sideNav.resizeSidebar": "Resize sidebar",
	"@astryx.sideNav.heading.openMenu": "Open menu",
	"@astryx.tabList.label": "Tabs",
	"@astryx.table.label": "Table",
	"@astryx.table.noData": "No data",
	"@astryx.table.filter.allPlaceholder": "All",
	"@astryx.table.filter.reset": "Reset",
	"@astryx.table.filter.apply": "Apply",
	"@astryx.table.rowStatus.columnHeader": "Row status",
	"@astryx.table.selection.bulkActionsLabel": "Bulk actions",
	"@astryx.table.selection.clearAll": "Unselect All",
	"@astryx.table.selection.selectedCount": "{count, number} selected",
	"@astryx.table.selection.selectAllRows": "Select all rows",
	"@astryx.table.selection.selectRow": "Select row",
	"@astryx.table.selection.selectRowNamed": "Select {label}",
	"@astryx.table.sort.ascending": "Sort ascending",
	"@astryx.table.sort.descending": "Sort descending",
	"@astryx.table.sort.clear": "Clear sort",
	"@astryx.table.sort.direction.ascending": "ascending",
	"@astryx.table.sort.direction.descending": "descending",
	"@astryx.table.sort.sortBy": "Sort by {label}",
	"@astryx.table.sort.sortedBy": "Sort by {label}, sorted {direction}",
	"@astryx.table.sort.sortedByWithPriority": "Sort by {label}, sorted {direction}, priority {rank, number} of {total, number}",
	"@astryx.toast.dismiss": "Dismiss notification",
	"@astryx.toast.viewport": "Notifications",
	"@astryx.tokenizer.clearAll": "Clear all",
	"@astryx.topNav.heading.openMenu": "Open menu",
	"@astryx.topNav.landmarkLabel": "Top navigation",
	"@astryx.treeList.toggleChildren": "Toggle children",
	"@astryx.typeahead.emptySearchResults": "No results found",
	"@astryx.typeahead.loading": "Loading",
	"@astryx.typeahead.searchResults": "Search results",
	"@astryx.typeahead.clearSelection": "Clear selection",
	"@astryx.breadcrumbs.label": "Breadcrumb",
	"@astryx.chat.composer.placeholder": "Type a message…",
	"@astryx.chat.composerDrawer.label": "Items",
	"@astryx.chat.composerInput.label": "Message input",
	"@astryx.chat.speechRecognition.noSpeechDetected": "No speech was detected.",
	"@astryx.commandPalette.label": "Command palette",
	"@astryx.commandPalette.input.placeholder": "Search…",
	"@astryx.commandPalette.input.label": "Search commands",
	"@astryx.commandPalette.list.label": "Commands",
	"@astryx.contextMenu.label": "Context menu",
	"@astryx.dateInput.placeholder": "Select a date",
	"@astryx.dateInput.dialogLabel": "Choose date",
	"@astryx.dateInput.closeCalendar": "Close calendar",
	"@astryx.dateInput.openCalendar": "Open calendar",
	"@astryx.dateInput.toggleCalendarClose": "Close calendar",
	"@astryx.dateInput.clear": "Clear {label}",
	"@astryx.dateInput.invalidDate": "Invalid date",
	"@astryx.dateInput.resetPicking": "Reset",
	"@astryx.dateInput.savePicking": "Save",
	"@astryx.dateInput.doneChoosingMonth": "Done",
	"@astryx.dateInput.chooseMonthYear": "{monthYear}, Choose month and year",
	"@astryx.dateInput.monthWheel": "Month",
	"@astryx.dateInput.yearWheel": "Year",
	"@astryx.dateTimeInput.timeHint12h": "e.g., 2:30 PM",
	"@astryx.dateTimeInput.timeHint24h": "e.g., 14:30",
	"@astryx.dateTimeInput.timeSuffix": "{label} time",
	"@astryx.dateTimeInput.timeOptionsLabel": "{label} options",
	"@astryx.dateRangeInput.placeholder": "Select date range",
	"@astryx.dateRangeInput.dialogLabel": "Choose date range",
	"@astryx.dateTimeInput.placeholder": "Select a date",
	"@astryx.dateTimeInput.dialogLabel": "Choose date and time",
	"@astryx.dateTimeInput.pickerMode": "Date/time section",
	"@astryx.dateTimeInput.dateTab": "Date",
	"@astryx.dateTimeInput.timeTab": "Time",
	"@astryx.dateTimeInput.openTimePicker": "Open {label}",
	"@astryx.dateTimeInput.saveDatePicking": "Save date",
	"@astryx.dateTimeInput.hourWheel": "Hour",
	"@astryx.dateTimeInput.minuteWheel": "Minute",
	"@astryx.dateTimeInput.secondWheel": "Second",
	"@astryx.dateTimeInput.meridiemWheel": "AM/PM",
	"@astryx.dateTimeInput.meridiemAM": "AM",
	"@astryx.dateTimeInput.meridiemPM": "PM",
	"@astryx.link.newTab": "(opens in new tab)",
	"@astryx.mobileNav.toggle.open": "Open navigation",
	"@astryx.moreMenu.label": "More options",
	"@astryx.multiSelector.selectPlaceholder": "Select…",
	"@astryx.outline.label": "Table of contents",
	"@astryx.powersearch.label": "Search",
	"@astryx.powersearch.placeholder": "Search…",
	"@astryx.resizable.collapsed": "Collapsed",
	"@astryx.resizable.handle.label": "Resize handle",
	"@astryx.selector.placeholder": "Select…",
	"@astryx.sideNav.heading.dialogLabel": "Navigation menu",
	"@astryx.table.pagination.label": "Table pagination",
	"@astryx.table.pagination.labelAbove": "{label} (top)",
	"@astryx.table.pagination.labelBelow": "{label} (bottom)",
	"@astryx.timeInput.placeholder": "Select a time",
	"@astryx.timeInput.invalidTime": "Invalid time",
	"@astryx.timeInput.openPicker": "Open {label}",
	"@astryx.topNav.heading.dialogLabel": "Navigation menu",
	"@astryx.typeahead.searchPlaceholder": "Search…",
	"@astryx.banner.collapse": "Collapse",
	"@astryx.banner.expand": "Expand",
	"@astryx.button.loading": "Loading",
	"@astryx.spinner.loading": "Loading",
	"@astryx.chatComposerDrawer.expand": "Expand {label}",
	"@astryx.chatComposerDrawer.collapse": "Collapse {label}",
	"@astryx.chatDictationButton.startDictation": "Start dictation",
	"@astryx.chatDictationButton.stopDictation": "Stop dictation",
	"@astryx.chatLayout.newMessages": "New messages",
	"@astryx.chatLayoutScrollButton.scrollToBottom": "Scroll to bottom",
	"@astryx.chatMessage.messageFrom": "Message from {sender}",
	"@astryx.chatSendButton.stop": "Stop",
	"@astryx.chatSendButton.send": "Send",
	"@astryx.chatToolCalls.error": "Error: {message}",
	"@astryx.chatToolCalls.status.pending": "Pending",
	"@astryx.chatToolCalls.status.running": "Running",
	"@astryx.chatToolCalls.status.complete": "Complete",
	"@astryx.chatToolCalls.status.error": "Failed",
	"@astryx.chatToolCalls.groupLabel": "{count} tool calls",
	"@astryx.chatTriggerMenu.suggestions": "Suggestions",
	"@astryx.citation.label": "Citation {number}: {title}",
	"@astryx.codeBlock.copied": "Copied",
	"@astryx.codeBlock.copyCode": "Copy code",
	"@astryx.codeBlock.code": "Code",
	"@astryx.field.optional": "Optional",
	"@astryx.field.required": "Required",
	"@astryx.fileInput.clearLabel": "Clear {label}",
	"@astryx.fileInput.dropHint": "Drop files here",
	"@astryx.fileInput.errorInvalidType": "\"{fileName}\" is not an accepted file type",
	"@astryx.fileInput.errorMaxFiles": "Maximum {maxFiles} files allowed",
	"@astryx.fileInput.errorMaxSize": "\"{fileName}\" exceeds {maxSize} limit",
	"@astryx.fileInput.fileSelected": "1 file selected: {fileName}",
	"@astryx.fileInput.filesSelected": "{count} files selected",
	"@astryx.fileInput.placeholder": "Choose file",
	"@astryx.fileInput.placeholderMultiple": "Choose files",
	"@astryx.fileInput.required": "Required",
	"@astryx.fileInput.triggerWithFiles": "{label}, {fileNames}",
	"@astryx.keyboardHint.toNavigate": "to navigate",
	"@astryx.lightbox.mediaViewer": "Media viewer",
	"@astryx.lightbox.zoom": "Zoom",
	"@astryx.lightbox.zoomedIn": "Zoomed in, use arrow keys to pan",
	"@astryx.lightbox.zoomedOut": "Zoomed out",
	"@astryx.metadataList.showMore": "Show more",
	"@astryx.metadataList.showLess": "Show less",
	"@astryx.mobileNav.navigation": "Navigation",
	"@astryx.multiSelector.clearAll": "Clear all {label}",
	"@astryx.input.readOnly": "Read only",
	"@astryx.input.statusButton.error": "Error details",
	"@astryx.input.statusButton.warning": "Warning details",
	"@astryx.input.statusButton.success": "Success details",
	"@astryx.numberInput.clearLabel": "Clear {label}",
	"@astryx.numberInput.decrementLabel": "Decrement {label}",
	"@astryx.numberInput.incrementLabel": "Increment {label}",
	"@astryx.numberInput.invalidNumber": "Invalid number",
	"@astryx.selector.clearLabel": "Clear {label}",
	"@astryx.sideNavCollapseButton.expandSidebar": "Expand sidebar",
	"@astryx.sideNavCollapseButton.collapseSidebar": "Collapse sidebar",
	"@astryx.sideNavItem.expand": "Expand {label}",
	"@astryx.sideNavItem.collapse": "Collapse {label}",
	"@astryx.sideNavItem.submenuLabel": "{label} submenu",
	"@astryx.tableFiltering.filterByColumn": "Filter {header}",
	"@astryx.tableGroupedRows.expandGroup": "Expand group {groupKey}",
	"@astryx.tableGroupedRows.collapseGroup": "Collapse group {groupKey}",
	"@astryx.tableRowExpansion.collapseRow": "Collapse row",
	"@astryx.tableRowExpansion.expandRow": "Expand row",
	"@astryx.tableRowExpansion.columnHeader": "Row expansion",
	"@astryx.tableRowExpansion.collapseAllRows": "Collapse all rows",
	"@astryx.tableRowExpansion.expandAllRows": "Expand all rows",
	"@astryx.stepper.label": "Progress",
	"@astryx.stepper.previousStep": "Previous step",
	"@astryx.stepper.nextStep": "Next step",
	"@astryx.step.goToStep": "Go to step {stepNumber, number}: {label}",
	"@astryx.step.goToStepWithStatus": "Go to step {stepNumber, number}: {label}, {status}",
	"@astryx.step.optional": "Optional",
	"@astryx.step.status.completed": "completed",
	"@astryx.step.status.warning": "warning",
	"@astryx.step.status.error": "error",
	"@astryx.switch.loading": "Loading",
	"@astryx.tableTree.collapseRow": "Collapse row",
	"@astryx.tableTree.expandRow": "Expand row",
	"@astryx.tableTree.collapseAllRows": "Collapse all rows",
	"@astryx.tableTree.expandAllRows": "Expand all rows",
	"@astryx.textArea.charactersRemaining": "{count, number} {count, plural, one {character} other {characters}} remaining",
	"@astryx.textArea.charactersOverLimit": "{count, number} {count, plural, one {character} other {characters}} over the limit",
	"@astryx.inputClearButton.tooltip": "Clear",
	"@astryx.textInput.clearLabel": "Clear {label}",
	"@astryx.thumbnail.remove": "Remove {accessibleName}",
	"@astryx.thumbnail.open": "Open {accessibleName}",
	"@astryx.thumbnail.fallbackName": "Thumbnail",
	"@astryx.timeInput.clearLabel": "Clear {label}",
	"@astryx.timestamp.copyValue": "Copy {value}",
	"@astryx.timestamp.copy": "Copy",
	"@astryx.timestamp.copied": "Copied",
	"@astryx.timestamp.detailsLabel": "Timestamp details",
	"@astryx.token.remove": "Remove {label}",
	"@astryx.commandPalette.footer.navigate": "Navigate",
	"@astryx.commandPalette.footer.select": "Select",
	"@astryx.commandPalette.footer.close": "Close",
	"@astryx.multiSelector.selectionCleared": "Selection cleared",
	"@astryx.multiSelector.allSelected": "All selected",
	"@astryx.multiSelector.selectionCount": "{count, number} of {total, number} selected",
	"@astryx.multiSelector.createOption": "Create \"{query}\"",
	"@astryx.multiSelector.optionCreated": "{label} created",
	"@astryx.multiSelector.emptySearchResults": "No results found",
	"@astryx.multiSelector.resultCount": "{count, number} {count, plural, one {result} other {results}}",
	"@astryx.selector.emptySearchResults": "No results found",
	"@astryx.selector.resultCount": "{count, number} {count, plural, one {result} other {results}}",
	"@astryx.typeahead.resultCount": "{count, number} {count, plural, one {result} other {results}}",
	"@astryx.tokenizer.tokenAdded": "Added {label}",
	"@astryx.tokenizer.tokenRemoved": "Removed {label}",
	"@astryx.lightbox.imagePosition": "Image {index, number} of {total, number}",
	"@astryx.lightbox.mediaPosition": "{alt}, {index, number} of {total, number}",
	"@astryx.transferList.selectedLabel": "Selected",
	"@astryx.transferList.availableLabel": "Available",
	"@astryx.transferList.ungroupedLabel": "Other",
	"@astryx.transferList.searchPlaceholder": "Search…",
	"@astryx.transferList.searchLabel": "Search {label}",
	"@astryx.transferList.selectedEmpty": "No selected options",
	"@astryx.transferList.availableEmpty": "No available options",
	"@astryx.transferList.noResults": "No results",
	"@astryx.transferList.clear": "Clear",
	"@astryx.transferList.addAll": "Add all",
	"@astryx.transferList.addOption": "Add {label}",
	"@astryx.transferList.removeOption": "Remove {label}",
	"@astryx.transferList.reorderOption": "Reorder {label}",
	"@astryx.transferList.transferDisabled": "{label} cannot be moved",
	"@astryx.transferList.reorderDisabled": "{label} cannot be reordered",
	"@astryx.transferList.reorderInstructions": "Press Space or Enter to pick up an item. Use Arrow Up, Arrow Down, Home, or End to move it. Press Space or Enter to drop, or Escape to cancel.",
	"@astryx.transferList.announceAdded": "{label} added. {count, number} {count, plural, one {item} other {items}} selected.",
	"@astryx.transferList.announceRemoved": "{label} removed. {count, number} {count, plural, one {item} other {items}} selected.",
	"@astryx.transferList.announceBulkAdded": "{count, number} {count, plural, one {item} other {items}} added.",
	"@astryx.transferList.announceBulkRemoved": "{count, number} {count, plural, one {item} other {items}} removed.",
	"@astryx.transferList.announceGrabbed": "{label} picked up, position {position, number} of {total, number}. Use arrow keys to move, Space or Enter to drop, or Escape to cancel.",
	"@astryx.transferList.announceMoveCancelled": "{label} move cancelled.",
	"@astryx.transferList.announceDropped": "{label} dropped at position {position, number} of {total, number}.",
	"@astryx.transferList.announceReturned": "{label} returned to position {position, number}.",
	"@astryx.transferList.announceMovedToPosition": "{label}, position {position, number} of {total, number}.",
	"@astryx.transferList.announceSearchResults": "{count, number} {count, plural, one {item} other {items}} found.",
	"@astryx.transferListSelector.apply": "Apply",
	"@astryx.transferListSelector.cancel": "Cancel",
	"@astryx.transferListSelector.triggerLabel": "{count, number} selected",
	"@astryx.emojiPicker.label": "Emoji",
	"@astryx.emojiPicker.searchLabel": "Search emoji",
	"@astryx.emojiPicker.frequentlyUsed": "Frequently used",
	"@astryx.emojiPicker.searchResults": "Search results",
	"@astryx.emojiPicker.noResults": "No emoji match “{query}”",
	"@astryx.emojiPicker.loading": "Loading emoji",
	"@astryx.emojiPicker.loadFailed": "More emoji couldn't be loaded.",
	"@astryx.emojiPicker.groupSmileysEmotion": "Smileys & emotion",
	"@astryx.emojiPicker.groupPeopleBody": "People & body",
	"@astryx.emojiPicker.groupAnimalsNature": "Animals & nature",
	"@astryx.emojiPicker.groupFoodDrink": "Food & drink",
	"@astryx.emojiPicker.groupTravelPlaces": "Travel & places",
	"@astryx.emojiPicker.groupActivities": "Activities",
	"@astryx.emojiPicker.groupObjects": "Objects",
	"@astryx.emojiPicker.groupSymbols": "Symbols",
	"@astryx.emojiPicker.groupFlags": "Flags",
	"@astryx.comments.retry": "Retry",
	"@astryx.commentComposer.placeholder": "Write a comment…",
	"@astryx.commentComposer.noAgents": "No agents",
	"@astryx.commentComposer.agents": "Agents",
	"@astryx.commentComposer.uploadFailed": "Images couldn't be added",
	"@astryx.commentComposer.imagesOnly": "Only image files can be added",
	"@astryx.commentComposer.chooseImages": "Choose images",
	"@astryx.commentComposer.imageAlt": "Image attachment",
	"@astryx.commentComposer.removeQuote": "Remove quoted text",
	"@astryx.commentComposer.attachImages": "Attach images",
	"@astryx.commentComposer.addEmoji": "Add emoji",
	"@astryx.commentComposer.cancel": "Cancel",
	"@astryx.comments.actionsLabel": "Actions for {name}'s comment",
	"@astryx.comments.addReaction": "Add reaction",
	"@astryx.comments.agentBadge": "Agent",
	"@astryx.comments.agentLogo": "{name} logo",
	"@astryx.comments.chooseReaction": "Choose a reaction",
	"@astryx.comments.copyLink": "Copy comment link",
	"@astryx.comments.currentVersion": "Current version",
	"@astryx.comments.delete": "Delete",
	"@astryx.comments.deleteDescription": "Delete {name}'s comment? This action cannot be undone.",
	"@astryx.comments.deleteFailed": "This comment couldn't be deleted.",
	"@astryx.comments.deleteFailedRetry": "This comment couldn't be deleted. Try again.",
	"@astryx.comments.deleteTitle": "Delete comment?",
	"@astryx.comments.edit": "Edit",
	"@astryx.comments.editFailed": "Your edit couldn't be saved.",
	"@astryx.comments.editPlaceholder": "Edit comment",
	"@astryx.comments.edited": "Edited",
	"@astryx.comments.editingContext": "Editing comment",
	"@astryx.comments.hideReplies": "Hide replies",
	"@astryx.comments.historyEmptyDescription": "This comment has no earlier versions.",
	"@astryx.comments.historyEmptyTitle": "No edit history",
	"@astryx.comments.historyFailed": "Edit history couldn't load",
	"@astryx.comments.historyLoadFailed": "The comment's edit history couldn't be loaded. Try again.",
	"@astryx.comments.historyLoading": "Loading edit history",
	"@astryx.comments.historySubtitle": "Comment by {name}",
	"@astryx.comments.historyTitle": "Edit history",
	"@astryx.comments.linkCopied": "Comment link copied",
	"@astryx.comments.otherReactors": "{count, plural, one {# other} other {# others}}",
	"@astryx.comments.outdated": "Outdated",
	"@astryx.comments.reactionCelebrate": "Celebrate",
	"@astryx.comments.reactionCount": "{reaction}: {count, number}",
	"@astryx.comments.reactionFailed": "Your reaction couldn't be saved.",
	"@astryx.comments.reactionLaugh": "Haha",
	"@astryx.comments.reactionLike": "Like",
	"@astryx.comments.reactionLove": "Love",
	"@astryx.comments.reactionSad": "Sad",
	"@astryx.comments.reactionWow": "Wow",
	"@astryx.comments.reopen": "Reopen",
	"@astryx.comments.reopenFailed": "This thread couldn't be reopened.",
	"@astryx.comments.reply": "Reply",
	"@astryx.comments.replyFailed": "Your reply couldn't be posted.",
	"@astryx.comments.replyPlaceholder": "Reply to {name}…",
	"@astryx.comments.replyingContext": "Replying to {name}",
	"@astryx.comments.resolve": "Mark as resolved",
	"@astryx.comments.resolveFailed": "This thread couldn't be resolved.",
	"@astryx.comments.resolved": "Resolved",
	"@astryx.comments.resolvedBy": "Resolved by {name}",
	"@astryx.comments.retryFailed": "Retrying didn't work.",
	"@astryx.comments.sendFailed": "Couldn't send this comment.",
	"@astryx.comments.threadLabel": "Thread by {name}",
	"@astryx.comments.unread": "New",
	"@astryx.comments.unsavedDraft": "Unsaved draft. Dismiss again to discard it.",
	"@astryx.comments.versionAuthor": "by {name}",
	"@astryx.comments.viewHistory": "View edit history",
	"@astryx.comments.viewReplies": "View {count, plural, one {# reply} other {# replies}}",
	"@astryx.comments.commentsLabel": "Threads in {label}",
	"@astryx.comments.emptyDescription": "Start the discussion with a comment.",
	"@astryx.comments.emptyReadOnlyDescription": "There is no discussion on this item.",
	"@astryx.comments.emptyTitle": "No comments yet",
	"@astryx.comments.label": "Comments",
	"@astryx.comments.loadFailed": "Comments couldn't load",
	"@astryx.comments.loadOlder": "Load earlier comments",
	"@astryx.comments.loading": "Loading comments",
	"@astryx.comments.olderFailed": "Earlier comments couldn't load",
	"@astryx.comments.postFailed": "Your comment couldn't be posted."
};
//#endregion
//#region node_modules/@astryxdesign/core/dist/i18n/resolve.js
/**
* @file resolve.ts
* @input Key + values + locale + catalog + overrides
* @output Formatted message string
* @position Shared lookup + ICU formatting core, used by useTranslator().
*
* Lookup order:
*   1. Per-locale override for the exact locale
*   2. Per-locale override for a parent locale (pt-BR → pt)
*   3. Shipped catalog entry for the exact locale
*   4. Shipped catalog entry for a parent locale (pt-BR → pt)
*   5. Shipped en catalog (the source of truth, always present)
*   6. The key itself (dev-visible fallback, warns once)
*
* SYNC: When modified, update these files to stay in sync:
* - /packages/core/src/i18n/useTranslator.ts
* - /packages/core/src/i18n/__tests__/resolve.test.ts
*/
/**
* Cache of parsed ICU MessageFormat objects keyed by `${locale}::${message}`.
* IntlMessageFormat parsing is non-trivial; caching avoids reparsing on every
* render. The cache is unbounded in principle but bounded in practice by the
* static set of astryx keys.
*/
var formatterCache = /* @__PURE__ */ new Map();
function getFormatter(message, locale) {
	const cacheKey = `${locale}::${message}`;
	let f = formatterCache.get(cacheKey);
	if (f === void 0) {
		f = new intl_messageformat_default(message, locale);
		formatterCache.set(cacheKey, f);
	}
	return f;
}
/**
* Walk a BCP 47 tag from most-specific to least-specific.
* Input is canonicalized via `Intl.Locale.baseName` so `pt-br` and `PT-BR`
* both produce `['pt-BR', 'pt']`.
*
* Examples:
*   'pt-BR'      → ['pt-BR', 'pt']
*   'zh-Hans-CN' → ['zh-Hans-CN', 'zh-Hans', 'zh']
*   'en'         → ['en']
*
* `en` is intentionally NOT appended here — the caller falls back to the
* shipped en catalog separately as the final source-of-truth.
*/
function resolveLocaleChain(locale) {
	let canonical;
	try {
		canonical = new Intl.Locale(locale).baseName;
	} catch {
		canonical = locale;
	}
	const parts = canonical.split("-");
	const chain = [];
	for (let i = parts.length; i > 0; i--) chain.push(parts.slice(0, i).join("-"));
	return chain;
}
function getLookup(locale, messages, overrides) {
	const lookup = {};
	const chain = resolveLocaleChain(locale);
	if (overrides !== void 0) {
		for (const tag of chain) if (overrides[tag]) {
			for (const [key, value] of Object.entries(overrides[tag])) if (lookup[key] === void 0 && value !== null) lookup[key] = value;
		}
	}
	for (const tag of chain) if (messages[tag]) for (const [key, value] of Object.entries(messages[tag])) {
		const message = typeof value === "string" ? value : value?.defaultMessage;
		if (lookup[key] === void 0 && message != null) lookup[key] = message;
	}
	return lookup;
}
function getResolve(locale, messages, overrides) {
	const lookup = getLookup(locale, messages, overrides);
	return (key, values) => {
		const result = lookup[key] ?? runtimeCatalog[key];
		if (result === void 0) {
			`${locale}${key}`, `${key}${locale}`;
			return key;
		}
		if (values === void 0) return result;
		return getFormatter(result, locale).format(values);
	};
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/i18n/InternationalizationContext.js
/**
* @file InternationalizationContext.ts
* @input React createContext, i18n types
* @output Exports InternationalizationContext and InternationalizationContextValue
* @position Context definition for client-side locale + messages
*
* Separated from InternationalizationProvider.tsx so components can consume
* the context without pulling in the full provider implementation.
* Follows the LinkContext.ts / ThemeContext.ts pattern.
*
* SYNC: When modified, update these files to stay in sync:
* - /packages/core/src/i18n/InternationalizationProvider.tsx
* - /packages/core/src/i18n/t.client.ts
* - /packages/core/src/i18n/useDirection.ts
* - /packages/core/src/i18n/useLocale.ts
* - /packages/core/src/i18n/useCollator.ts
* - /packages/core/src/i18n/getLocaleDirection.ts
* - /packages/core/src/i18n/index.ts
*/
/**
* Default value falls through to the shipped en catalog in resolve().
* A consumer that doesn't render a provider still gets English defaults.
*/
var InternationalizationContext = /*#__PURE__*/ (0, import_react.createContext)({
	locale: "en",
	direction: "ltr",
	messages: {},
	translate: getResolve("en", {})
});
InternationalizationContext.displayName = "InternationalizationContext";
//#endregion
//#region node_modules/@astryxdesign/core/dist/i18n/useTranslator.js
/**
* @file useTranslator.ts
* @input InternationalizationContext (via use())
* @output Exports useTranslator hook returning a stable translator function
* @position Client-side hook for translating outside of render (event handlers,
*   effects, non-component code) while still resolving against the current
*   provider's locale.
*
* Prefer `t()` for translations at the callsite during render. When you need
* to translate inside an event handler or effect, capture a translator during
* render via useTranslator() and call it later.
*
* SYNC: When modified, update these files to stay in sync:
* - /packages/core/src/i18n/index.ts
* - /packages/core/src/i18n/t.client.ts
*/
/**
* Returns a translator function bound to the current provider's locale.
* Safe to call from event handlers and effects.
*
* @example
* ```
* function MyComponent() {
*   const translate = useTranslator();
*   const onClick = () => announce(translate('@astryx.pagination.pageAnnounce', {current: 1}));
* }
* ```
*/
function useTranslator() {
	return (0, import_react.use)(InternationalizationContext).translate;
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/Spinner/Spinner.js
/**
* @file Spinner.tsx
* @input Uses React, i18n (useTranslator), StyleX, SVG rendering
* @output Exports Spinner component, SpinnerProps, SpinnerSize, SpinnerShade types
* @position Core implementation of spinner loading indicator
*
* SYNC: When modified, update these files to stay in sync:
* - /packages/core/src/Spinner/Spinner.doc.mjs
* - /packages/core/src/Spinner/Spinner.test.tsx
* - /packages/core/src/Spinner/index.ts
* - /apps/storybook/stories/Spinner.stories.tsx
* - /packages/cli/assets/templates/blocks/components/Spinner/ (showcase blocks)
*/
/**
* Default fraction of the ring the moving arc covers. The canvas ring this
* replaces swept 135deg, not the 270deg its constant's comment claimed.
*
* Themeable via `--spinner-arc-fraction`, declared alongside the other public
* vars in `sizeStyles` below. Only the inline `strokeDasharray` attribute
* (the pre-stylesheet render — see its own comment) still reads this
* constant directly; the CSS side composes the dash from the live var.
*/
var ARC_FRACTION = .375;
var SIZES = {
	sm: {
		diameter: 10,
		border: 2
	},
	md: {
		diameter: 14,
		border: 3
	},
	lg: {
		diameter: 18,
		border: 3
	},
	xl: {
		diameter: 28,
		border: 4
	}
};
var RESOLVED_GEOMETRY_VARS = ["--_spinner-ring-diameter", "--_spinner-ring-stroke"];
/**
* The composed box size: diameter plus a stroke width on each side.
*
* It is deliberately NOT registered, unlike the pair above. The element reads
* it through an inline `width`/`height` with the size's own default as the
* `var()` fallback, so a render with no stylesheet — where nothing declares
* it — still sizes the box the way it always did. A registered property always
* has a value (its `initial-value`), which would swallow that fallback and
* collapse the box to zero.
*/
var BOX_SIZE = "--_spinner-box-size";
/**
* Register the resolved geometry vars as `<length>`.
*
* Both are consumed inside `calc()` — the box adds two stroke widths to a diameter,
* the circle halves one. Unregistered, a custom property substitutes as text,
* so whatever a theme wrote lands in the expression verbatim and a bare `0`
* (a valid length on its own, a `<number>` inside `calc()`) poisons the sum:
* `calc(28px + 0 * 2)` is invalid at computed-value time and the box loses its
* size. Registered, the value is already an absolute length by the time the
* `calc()` sees it, so `0` means `0px` — a zero-width stroke that paints
* nothing — rather than a bare `0` that invalidates the sum and leaves the box
* with no size at all. One `stroke-width` drives both circles, so a themed
* stroke width of `0` hides the arc along with the track; an arc with no track behind
* it is `--spinner-track-color: transparent`.
*
* Only these private vars are registered. The four public ones deliberately
* are not: a registered property has an `initial-value`, so every element in
* the document would report a value for it — and
* `.github/scripts/theme-var-reachability.js` finds a var's declaring element
* by exactly that test, so registering them would point the guard at `<html>`
* and report a var no theme can select.
*/
function registerSpinnerVars() {
	if (typeof CSS === "undefined" || typeof CSS.registerProperty !== "function") return;
	for (const name of RESOLVED_GEOMETRY_VARS) try {
		CSS.registerProperty({
			name,
			syntax: "<length>",
			inherits: true,
			initialValue: "0px"
		});
	} catch {}
}
registerSpinnerVars();
/**
* Pin every ring's dash motion to the document timeline's origin instead of
* its own start time, so spinners mounted seconds apart stay in phase.
*
* Setting `startTime` is exact where arithmetic on a clock read is not: a
* negative `animation-delay` computed at mount is only as good as the gap
* between reading the clock and the frame the animation starts in, which at
* 10x CPU throttling measured 116deg of drift (from when this animated a
* literal rotation; the same drift risk applies to the dash offset now).
*
* Rings are collected and pinned in one frame because `getAnimations()`
* resolves style and `startTime` dirties it again, so pinning them one at a
* time makes each mount re-force what the previous one invalidated — 53 style
* recalcs for 38 spinners against 19 batched.
*/
var pendingRings = /* @__PURE__ */ new Set();
var flushScheduled = false;
function pinRingsToTimelineOrigin() {
	flushScheduled = false;
	const animations = [];
	for (const svg of pendingRings) animations.push(...svg.getAnimations({ subtree: true }));
	pendingRings.clear();
	for (const animation of animations) animation.startTime = 0;
}
/**
* Ref callback for the ring: the one place a mounted ring touches the DOM.
*
* It reads nothing back — the geometry is resolved by the cascade, not in JS.
*/
function syncRotationPhase(svg) {
	if (svg == null) return;
	if (typeof svg.getAnimations !== "function") return;
	pendingRings.add(svg);
	if (!flushScheduled) {
		flushScheduled = true;
		requestAnimationFrame(pinRingsToTimelineOrigin);
	}
	return () => {
		pendingRings.delete(svg);
	};
}
var styles$34 = {
	wrapper: {
		k1xSpc: "x3nfvp2",
		kXwgrk: "xdt5ytf",
		kGNEyG: "x6s0dn4",
		kOIVth: "x1txdalj",
		$$css: true
	},
	spinner: {
		k1xSpc: "xwz0xwf",
		kgQiWS: "x1ku5rj1",
		kXLuUW: "xxymvpz",
		"--_spinner-ring-diameter": "x2lq4xu",
		"--_spinner-ring-stroke": "x10qssua",
		"--_spinner-box-size": "x69vvuq",
		kmuXW: "x2lah0s",
		$$css: true
	},
	circle: {
		kDwRjp: "xbh8q5q",
		kR8GR0: "x1764fhq",
		k3nNDw: "x1g0ag68",
		kU5bRw: "x1owpc8m",
		kPFa82: "xio8zfp",
		kfJifR: "xgw3ha0",
		$$css: true
	},
	track: {
		kjVXCG: "xalkhop",
		$$css: true
	}
};
var sizeStyles$3 = {
	sm: {
		"--spinner-diameter": "x11wm0hx",
		"--spinner-stroke-width": "xls98ul",
		"--spinner-arc-fraction": "x7o5821",
		$$css: true
	},
	md: {
		"--spinner-diameter": "x15pu9g6",
		"--spinner-stroke-width": "xr0wkrm",
		"--spinner-arc-fraction": "x7o5821",
		$$css: true
	},
	lg: {
		"--spinner-diameter": "x1w424tr",
		"--spinner-stroke-width": "xr0wkrm",
		"--spinner-arc-fraction": "x7o5821",
		$$css: true
	},
	xl: {
		"--spinner-diameter": "x1orj1z9",
		"--spinner-stroke-width": "x7y2bof",
		"--spinner-arc-fraction": "x7o5821",
		$$css: true
	}
};
var shadeStyles = {
	default: {
		"--spinner-color": "xt1b8mc",
		"--spinner-track-color": "xspt9s2",
		$$css: true
	},
	subtle: {
		"--spinner-color": "x1jevo6s",
		"--spinner-track-color": "xspt9s2",
		$$css: true
	},
	onMedia: {
		"--spinner-color": "x13u6jys",
		"--spinner-track-color": "x1ufpcf6",
		$$css: true
	},
	inherit: {
		"--spinner-color": "x1uzk0gl",
		"--spinner-track-color": "xbfzqbu",
		$$css: true
	}
};
var trackOpacityStyles = {
	default: {
		kDd8S0: "x1g350g8",
		$$css: true
	},
	subtle: {
		kDd8S0: "x1g350g8",
		$$css: true
	},
	onMedia: {
		kDd8S0: "x1smxkh6",
		$$css: true
	},
	inherit: {
		kDd8S0: "x7bo2k",
		$$css: true
	}
};
/**
* An animated loading indicator. Available in four sizes and four color shades.
*
* @example
* ```
* <Spinner />
* <Spinner size="sm" />
* <Spinner size="lg" shade="onMedia" />
* <Spinner label="Loading..." />
* <Spinner aria-label="Loading data" />
* ```
*/
function Spinner({ size = "md", shade = "default", label, xstyle, className, style, "aria-label": ariaLabel, "data-testid": testId, ref, ...restProps }) {
	const { border, diameter } = SIZES[size];
	const frameSize = diameter + border * 2;
	const circumference = Math.PI * diameter;
	const arcLength = circumference * ARC_FRACTION;
	const hasLabel = label != null;
	const labelId = (0, import_react.useId)();
	const t = useTranslator();
	const namedByVisibleLabel = hasLabel && typeof label === "string" && ariaLabel == null;
	const resolvedAriaLabel = ariaLabel ?? (typeof label === "string" ? label : void 0) ?? t("@astryx.spinner.loading");
	const spinner = /*#__PURE__*/ (0, import_jsx_runtime.jsx)("span", {
		ref: hasLabel ? void 0 : ref,
		role: "status",
		"aria-label": namedByVisibleLabel ? void 0 : resolvedAriaLabel,
		"aria-labelledby": namedByVisibleLabel ? labelId : void 0,
		"data-testid": hasLabel ? void 0 : testId,
		...hasLabel ? {} : restProps,
		...mergeProps(hasLabel ? "" : themeProps("spinner", {
			size,
			shade
		}), props(styles$34.spinner, !hasLabel && sizeStyles$3[size], !hasLabel && shadeStyles[shade], !hasLabel && xstyle), hasLabel ? void 0 : className, {
			...hasLabel ? {} : style,
			width: `var(${BOX_SIZE}, ${frameSize}px)`,
			height: `var(${BOX_SIZE}, ${frameSize}px)`
		}),
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsxs)("svg", {
			ref: syncRotationPhase,
			width: frameSize,
			height: frameSize,
			"aria-hidden": "true",
			className: "xlp1x4z x1lliihq x6v0vjy x7yyq19 x1rea2x4",
			children: [/*#__PURE__*/ (0, import_jsx_runtime.jsx)("circle", {
				cx: "50%",
				cy: "50%",
				r: diameter / 2,
				strokeWidth: border,
				...props(styles$34.circle, styles$34.track, trackOpacityStyles[shade])
			}), /*#__PURE__*/ (0, import_jsx_runtime.jsx)("circle", {
				cx: "50%",
				cy: "50%",
				r: diameter / 2,
				strokeWidth: border,
				strokeDasharray: `${arcLength} ${circumference - arcLength}`,
				className: "xbh8q5q x1764fhq x1g0ag68 x1owpc8m xio8zfp xgw3ha0 x14qxm4i xnh0sag xa4qsjk x1nlxm0d x1esw782 xtve3lm x9tu13d xdv9ggb"
			})]
		})
	});
	if (!hasLabel) return spinner;
	return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)("div", {
		ref,
		"data-testid": testId,
		...restProps,
		...mergeProps(themeProps("spinner", {
			size,
			shade
		}), props(styles$34.wrapper, sizeStyles$3[size], shadeStyles[shade], xstyle), className, style),
		children: [spinner, typeof label === "string" ? /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Text, {
			id: labelId,
			type: "body",
			weight: "bold",
			children: label
		}) : label]
	});
}
Spinner.displayName = "Spinner";
//#endregion
//#region node_modules/@astryxdesign/core/dist/VisuallyHidden/VisuallyHidden.js
/**
* @file VisuallyHidden.tsx
* @input Uses React createElement/ElementType, stylex
* @output Exports VisuallyHidden component and VisuallyHiddenProps
* @position Accessibility primitive; renders content in the a11y tree while
*   hiding it visually (icon-only labels, aria-live regions, SR-only context)
*
* SYNC: When modified, update these files to stay in sync:
* - /packages/core/src/VisuallyHidden/VisuallyHidden.doc.mjs
* - /packages/core/src/VisuallyHidden/VisuallyHidden.test.tsx
* - /apps/storybook/stories/VisuallyHidden.stories.tsx
* - /packages/cli/assets/templates/blocks/components/VisuallyHidden/ (showcase blocks)
*/
/**
* VisuallyHidden is deliberately styling-free: it exists to *not* be seen, so it
* intentionally omits `xstyle`/`className`/`style`. The clip block is fixed and
* non-overridable — styling a visually-hidden node is always a mistake. The
* accessibility pass-throughs from `BaseProps` (`aria-*`, `role`, `id`,
* `data-*`, event handlers) remain, since the live-region use case needs them.
*/
/**
* Renders its children in the accessibility tree while hiding them visually.
*
* Use for content that assistive technology must perceive but sighted users
* should not see: accessible names for icon-only controls, `aria-live`
* announcement regions, and supplementary screen-reader context.
*
* @example
* ```
* <IconButton icon="trash" label="">
*   <VisuallyHidden>Delete incident</VisuallyHidden>
* </IconButton>
* <VisuallyHidden as="div" aria-live="polite">
*   {`Moved ${task} to ${column}`}
* </VisuallyHidden>
* ```
*/
function VisuallyHidden({ children, as: element = "span", ref, ...props }) {
	return /*#__PURE__*/ (0, import_react.createElement)(element, {
		ref,
		...props,
		className: "x10l6tqk x1i1rx1s xjm9jq1 xkdpibf x1717udv xb3r6kr xzpqnlu xuxw1ft xng3xce x13vifvy x1o0tod x47corl x87ps6o"
	}, children);
}
VisuallyHidden.displayName = "VisuallyHidden";
//#endregion
//#region node_modules/@astryxdesign/core/dist/Icon/IconDefaultSizeContext.js
/**
* @file IconDefaultSizeContext.ts
* @input Uses layer-scoped React context and an optional Icon size prop
* @output Supplies a component-owned default size to descendant Icon instances
* @position Internal Icon sizing context; consumed by Icon and icon-slot owners
*/
var IconDefaultSizeContext = createLayerScopedContext(null);
IconDefaultSizeContext.displayName = "IconDefaultSizeContext";
var IconDefaultSizeProvider = IconDefaultSizeContext.Provider;
function useIconSize(size) {
	const contextualSize = (0, import_react.use)(IconDefaultSizeContext);
	return size ?? contextualSize ?? "md";
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/Icon/IconSize.stylex.js
/** Size styles for direct SVG icon components. */
var iconSizeStyles = {
	xsm: {
		kzqmXN: "x1jw3ynk",
		kZKoxP: "xvle69y",
		$$css: true
	},
	sm: {
		kzqmXN: "xcdlrvm",
		kZKoxP: "x1l36t39",
		$$css: true
	},
	md: {
		kzqmXN: "xwqq7k2",
		kZKoxP: "xmll18r",
		$$css: true
	},
	lg: {
		kzqmXN: "xp8d6y2",
		kZKoxP: "xam5rvr",
		$$css: true
	}
};
/**
* Size styles for icon boxes and string-based registry icons. `fontSize`
* keeps 1em-based icons in step with the box.
*/
var iconBoxSizeStyles = {
	xsm: {
		kzqmXN: "x1jw3ynk",
		kZKoxP: "xvle69y",
		kGuDYH: "xboafo0",
		$$css: true
	},
	sm: {
		kzqmXN: "xcdlrvm",
		kZKoxP: "x1l36t39",
		kGuDYH: "x1jchvi3",
		$$css: true
	},
	md: {
		kzqmXN: "xwqq7k2",
		kZKoxP: "xmll18r",
		kGuDYH: "x1603h9y",
		$$css: true
	},
	lg: {
		kzqmXN: "xp8d6y2",
		kZKoxP: "xam5rvr",
		kGuDYH: "xngnso2",
		$$css: true
	}
};
//#endregion
//#region node_modules/@astryxdesign/core/dist/Layout/edgeCompensation.stylex.js
/**
* The data attribute that edge-compensatable components apply.
* Ghost buttons, tabs, and other transparent-padding components
* render this attribute so containers can detect them via `:has()`.
*/
var EDGE_COMP_ATTR = "data-astryx-edge-comp";
/**
* Container-side edge compensation styles.
*
* Apply to slot wrapper divs. The slot detects whether its first/last
* child is an edge-compensatable component and pulls its own margin
* inward by the specified inset amount.
*
* @example
* ```tsx
* <div {...stylex.props(
*   styles.startSlot,
*   edgeCompSlot.inset(spacingVars['--spacing-2']),
* )}>
*   {startContent}
* </div>
* ```
*/
var _temp$7 = {
	keTefX: "x1kftj4p",
	k71WvV: "x92e2el",
	"$$css": true
};
var edgeCompSlot = { inset: (amount) => [_temp$7, {
	"--x-126w13d": ((val) => typeof val === "number" ? val + "px" : val != null ? val : void 0)(`calc(-1 * ${amount})`),
	"--x-4drmnv": ((val) => typeof val === "number" ? val + "px" : val != null ? val : void 0)(`calc(-1 * ${amount})`)
}] };
//#endregion
//#region node_modules/@astryxdesign/core/dist/SizeContext/SizeContext.js
/**
* @file SizeContext.ts
* @input Layer-scoped React context, use
* @output Exports SizeContext, useSize, ElementSize, SizeProvider
* @position Context provider; consumed by Button, TextInput, TabList, Selector, etc.
*
* Generic size context that lets container components (Toolbar, TopNav, Card headers)
* cascade a default size to interactive children. Children use the context as a
* fallback — an explicit `size` prop always wins.
*/
/**
* Standard element sizes used across interactive components.
*/
/**
* Context for cascading a default size from container to children.
*
* `null` means no container is providing a size — components use their own default.
*/
var SizeContext = createLayerScopedContext(null);
SizeContext.displayName = "SizeContext";
/**
* Resolve the effective size from an explicit prop, inherited context, or default.
*
* @param sizeProp - Explicit size prop from the component (wins if set)
* @param defaultSize - Fallback when neither prop nor context provides a size
* @returns The resolved size
*
* @example
* ```ts
* // In a component:
* const size = useSize(sizeProp, 'md');
* ```
*/
function useSize(sizeProp, defaultSize = "md") {
	const inherited = (0, import_react.use)(SizeContext);
	return sizeProp ?? inherited ?? defaultSize;
}
var SizeProvider = SizeContext.Provider;
//#endregion
//#region node_modules/@astryxdesign/core/dist/ButtonGroup/ButtonGroupContext.js
/**
* @file ButtonGroupContext.ts
* @input Layer-scoped React context
* @output Exports ButtonGroup context and useButtonGroup hook
* @position Shared context; consumed by Button for group-aware styling
*/
var ButtonGroupContext = createLayerScopedContext(null);
ButtonGroupContext.displayName = "ButtonGroupContext";
/**
* Hook for Button to detect when it's inside a ButtonGroup.
* Returns null when used outside a group.
*/
function useButtonGroup() {
	return (0, import_react.use)(ButtonGroupContext);
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/InputGroup/InputGroupContext.js
/**
* @file InputGroupContext.ts
* @input Layer-scoped React context/use
* @output Exports InputGroup context and useInputGroup hook
* @position Shared context; consumed by input components for group-aware styling and ARIA associations
*/
var InputGroupContext = createLayerScopedContext(null);
InputGroupContext.displayName = "InputGroupContext";
/**
* Hook for input components to detect when inside an InputGroup.
* Returns null when used outside a group.
*/
function useInputGroup() {
	return (0, import_react.use)(InputGroupContext);
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/InputGroup/groupStyles.js
var groupStyles$2 = {
	buttonAddon: {
		krdFHd: "x1epqg88",
		kVL7Gh: "xf2wquc",
		kfmiAY: "x2dar1b",
		kT0f0o: "x1tgb0ru",
		kZKoxP: "x1vonza8",
		kY2c9j: "x1qf1n5z",
		$$css: true
	},
	inGroup: {
		kUk6DE: "x98rzlu",
		k7Eaqz: "xeuugli",
		kZKoxP: "x5yr21d",
		keTefX: "xd10s4z x1pwwqoy",
		krdFHd: "x15mokao x8eehn2",
		kVL7Gh: "xbiv7yw x1xrp5p4",
		kfmiAY: "x1ga7v0g x149bkfe",
		kT0f0o: "x16uus16 x1ursds5",
		kXnDq0: "x1rm9qnc",
		$$css: true
	}
};
//#endregion
//#region node_modules/@astryxdesign/core/dist/Link/LinkContext.js
/**
* @file LinkContext.ts
* @input React createContext, LinkComponentType
* @output Exports LinkContext and LinkContextValue
* @position Context definition for polymorphic link support
*
* Separated from LinkProvider.tsx to allow components to consume
* the context without pulling in the full provider implementation.
* Follows the ThemeContext.ts / Theme.tsx pattern.
*
* SYNC: When modified, update these files to stay in sync:
* - /packages/core/src/Link/LinkProvider.tsx
* - /packages/core/src/Link/useLinkComponent.ts
* - /packages/core/src/Link/index.ts
* - /packages/core/src/Link/Link.doc.mjs
*/
/**
* Context value for the link provider.
*/
/**
* Context for providing a custom link component to all Astryx components.
* Defaults to null (components fall back to native `<a>`).
*/
var LinkContext = /*#__PURE__*/ (0, import_react.createContext)(null);
LinkContext.displayName = "LinkContext";
//#endregion
//#region node_modules/@astryxdesign/core/dist/utils/safeUrl.js
/**
* @file safeUrl.ts
* @input Navigation strings or supported structured router destinations
* @output The shared blocked-scheme decision, without rewriting accepted inputs
* @position Core navigation policy; embedded-resource policy is separate
*/
function normalizeUrl(url) {
	return url.replace(/[\x00-\x1f\x7f]/g, "").trim();
}
/**
* The form a URL's scheme is compared in: lowercase, and without the spaces
* after the scheme's colon, which a data URL's media type ignores
* (`data: text/html` is HTML).
*/
function comparableUrl(normalized) {
	return normalized.toLowerCase().replace(/^([a-z][a-z\d+.-]*:) +/, "$1");
}
/** Return a normalized navigation URL, or null for a blocked scheme. */
function sanitizeUrl(url) {
	const normalized = normalizeUrl(url);
	const lower = comparableUrl(normalized);
	if (lower.startsWith("javascript:") || lower.startsWith("vbscript:") || lower.startsWith("data:text/html")) return null;
	return normalized;
}
/** Inspect a navigation string without changing the value used by its sink. */
function isSafeUrl(url) {
	return sanitizeUrl(url) !== null;
}
/**
* Inspect React Router paths, Next.js URL objects, and URL instances without
* serializing or replacing the object handed to the router. Search/query/hash
* are route-relative data, not schemes. Absent destinations remain absent.
*/
function isSafeDestination(destination) {
	if (destination == null) return true;
	if (typeof destination === "string") return isSafeUrl(destination);
	if (typeof destination !== "object") return false;
	const { pathname, href, protocol, host, hostname } = destination;
	for (const field of [
		pathname,
		href,
		protocol,
		host,
		hostname
	]) if (field != null && typeof field !== "string") return false;
	if (typeof pathname === "string" && !isSafeUrl(pathname)) return false;
	if (typeof href === "string" && !isSafeUrl(href)) return false;
	if (typeof protocol === "string" && protocol !== "") {
		const normalizedProtocol = normalizeUrl(protocol);
		const prefix = normalizedProtocol.endsWith(":") ? normalizedProtocol : `${normalizedProtocol}:`;
		if (!isSafeUrl(prefix)) return false;
		if (!isSafeUrl(`${prefix}${host || hostname || ""}${typeof pathname === "string" ? pathname : ""}`)) return false;
	}
	return true;
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/Link/useLinkComponent.js
/**
* @file useLinkComponent.ts
* @input Per-component override, LinkProvider context, and navigation props
* @output Stable link component with destination checks and custom-router `to` injection
* @position Shared native and custom link boundary; rejected destinations render
*   as destination-less anchors without invoking a router.
*
* SYNC: Link.doc.mjs and LinkProvider.doc.mjs describe this boundary.
*/
function createSafeLink(Component) {
	function SafeLink({ href, to, ref, ...rest }) {
		if (!isSafeDestination(href) || !isSafeDestination(to)) return /*#__PURE__*/ (0, import_react.createElement)("a", {
			ref,
			...rest
		});
		if (Component === "a") return /*#__PURE__*/ (0, import_react.createElement)("a", {
			ref,
			...rest,
			href
		});
		return /*#__PURE__*/ (0, import_react.createElement)(Component, {
			ref,
			...rest,
			href,
			to: to ?? href
		});
	}
	SafeLink.displayName = `SafeLink(${typeof Component === "string" ? Component : Component.displayName || Component.name || "Component"})`;
	return SafeLink;
}
/**
* Resolve `as`, then LinkProvider, then a native anchor. Both destination props
* are checked before rendering; accepted structured values retain identity.
* Custom components receive `to={href}` unless an explicit `to` is supplied.
*
* @example
* ```
* const LinkComponent = useLinkComponent(as);
* return <LinkComponent href="/docs">Documentation</LinkComponent>;
* ```
*/
function useLinkComponent(as) {
	const ctx = (0, import_react.use)(LinkContext);
	const resolved = as ?? ctx?.component ?? "a";
	return (0, import_react.useMemo)(() => createSafeLink(resolved), [resolved]);
}
/**
* How long the paint takes to leave after a release: UIKit's deselect
* crossfade. The one number, shared with the stylesheet: the release
* animation in interactionOverlay.stylex.ts runs on the same constant, so the
* timer that removes the attribute and the fade cannot drift apart.
*/
var PRESS_FADE_MS = pressConsts.releaseMs;
/** What the surface should be painting. `fading` is the release's exit. */
/**
* Where a gesture is.
*
* `dead` is the load-bearing one: a gesture that became a scroll stays dead
* until the finger lifts and a new one starts, so a finger that stops moving,
* or comes back to the control it started on, paints nothing. That is the
* difference between this and `:active`.
*/
var IDLE = {
	originX: 0,
	originY: 0,
	phase: "idle"
};
/** A finger that has gone this far is scrolling, not pressing. */
function travelled(gesture, x, y) {
	return Math.hypot(x - gesture.originX, y - gesture.originY) > 10;
}
function step(gesture, phase, paint, timer) {
	return {
		gesture: {
			...gesture,
			phase
		},
		paint,
		timer
	};
}
/**
* One event, one answer.
*
* The caller owns the DOM and the clock, and nothing here reads either, so a
* test drives the whole contract by handing it events.
*/
function pressGestureStep(gesture, event) {
	if (event.kind === "down") return {
		gesture: {
			originX: event.x,
			originY: event.y,
			phase: "armed"
		},
		paint: "none",
		timer: "onset"
	};
	switch (gesture.phase) {
		case "armed":
			if (event.kind === "move") return travelled(gesture, event.x, event.y) ? step(gesture, "dead", "none", null) : {
				gesture,
				paint: "none",
				timer: null
			};
			if (event.kind === "cancel") return step(gesture, "dead", "none", null);
			if (event.kind === "onset") return step(gesture, "pressed", "on", null);
			if (event.kind === "up") return step(gesture, "flash", "on", "flash");
			return {
				gesture,
				paint: "none",
				timer: null
			};
		case "pressed":
			if (event.kind === "move" && !travelled(gesture, event.x, event.y)) return {
				gesture,
				paint: "on",
				timer: null
			};
			if (event.kind === "move" || event.kind === "cancel") return step(gesture, "dead", "none", null);
			if (event.kind === "up") return step(gesture, "fading", "fading", "fade");
			return {
				gesture,
				paint: "on",
				timer: null
			};
		case "flash":
			if (event.kind === "flashEnd") return step(gesture, "fading", "fading", "fade");
			return {
				gesture,
				paint: "on",
				timer: null
			};
		case "fading":
			if (event.kind === "fadeEnd") return {
				gesture: IDLE,
				paint: "none",
				timer: null
			};
			return {
				gesture,
				paint: "fading",
				timer: null
			};
		case "dead":
			if (event.kind === "up") return {
				gesture: IDLE,
				paint: "none",
				timer: null
			};
			return {
				gesture,
				paint: "none",
				timer: null
			};
		case "idle": return {
			gesture: IDLE,
			paint: "none",
			timer: null
		};
	}
}
function idlePressGesture() {
	return IDLE;
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/utils/pressFeedback.js
/**
* @file pressFeedback.ts
* @input The press state machine (pressGesture.ts) and the document's pointer,
*   scroll and visibility events
* @output Exports PRESSABLE_ATTRIBUTE, PRESSED_ATTRIBUTE, pressableProps and
*   installPressFeedback
* @position The DOM half of the touch press model: one delegated controller
*   per document that writes `data-astryx-press` on the nearest pressable surface.
*   Installed by usePressFeedback (hooks/usePressFeedback.ts) on first mount;
*   the CSS arms that read the attribute live in interactionOverlay.stylex.ts
*   and in each component with its own `:active` rule. Tested by
*   pressFeedback.test.ts.
*
* ONE listener set for every pressable surface in the document.
*
* Why a delegated document-level controller and not a hook on the element: a
* virtualized list can carry more than a thousand rows, and four listeners
* plus a state hook per row is not a cost a list like that can pay. This is
* six listeners for the whole document, and a press costs one attribute write
* on one element: no React render, no subscription, no per-element anything.
* It also makes the behaviour uniform for free: every component that paints a
* press carries {@link PRESSABLE_ATTRIBUTE}, so all of them change together.
*
* Under a mouse the controller does nothing and CSS `:active` keeps the press,
* as it always has. Under a finger the `:active` arm is dropped by the CSS
* (`@media (pointer: coarse)`) and this writes `data-astryx-press="on"` when the
* press is believed and `data-astryx-press="fading"` for the release's exit.
*
* SYNC: When modified, update pressGesture.ts, hooks/usePressFeedback.ts,
* utils/interactionOverlay.stylex.ts and pressFeedback.test.ts.
*/
/**
* The marker the controller finds with `closest()`. Every Astryx component
* that paints a press carries it on the element that paints; a local
* component can opt in by spreading {@link pressableProps} (or calling
* `usePressFeedback`) on its own pressable element and reading
* {@link PRESSED_ATTRIBUTE} in its styles.
*/
var PRESSABLE_ATTRIBUTE = "data-astryx-pressable";
/** `on` while the press is believed and the finger is down; `fading` for the release's exit. */
var PRESSED_ATTRIBUTE = "data-astryx-press";
/** Spread onto the element that paints the press. */
var pressableProps = { [PRESSABLE_ATTRIBUTE]: "" };
/** A surface that is not enabled does not press, however it is touched. */
var DISABLED = ":disabled, [aria-disabled=\"true\"]";
var live = null;
/** How many callers hold the controller installed; listeners exist while > 0. */
var holders = 0;
/**
* When a scroller last moved UNDER A FINGER OF ITS OWN, and which one.
*
* Only a finger-driven scroll is recorded, so the brake cannot fire for a
* scroll the app performed itself. The test is the touch's own target: a
* scroll is that finger's if the finger was inside the scroller that moved,
* within {@link PRESS_GESTURE_MEMORY_MS}.
*/
var lastScrollAt = 0;
var lastScroller = null;
/** When a finger was last on the glass, and where it landed. */
var lastTouchAt = 0;
var lastTouchTarget = null;
var TIMER_MS = {
	fade: PRESS_FADE_MS,
	flash: 100,
	onset: 150
};
var TIMER_EVENT = {
	fade: "fadeEnd",
	flash: "flashEnd",
	onset: "onset"
};
function paintElement(element, paint) {
	if (paint === "none") {
		element.removeAttribute(PRESSED_ATTRIBUTE);
		return;
	}
	element.setAttribute(PRESSED_ATTRIBUTE, paint);
}
function clearTimer() {
	if (live?.timer != null) {
		clearTimeout(live.timer);
		live.timer = null;
	}
}
/**
* Run one event through the machine and make the DOM say what it answered.
*
* THE TIMER RULE, and why it is not "clear, then maybe re-arm": a step that
* returns `timer: null` WITHOUT changing phase is a pass-through, and the
* phase it left running still owes its transition. Clearing unconditionally
* strands three gestures, each ending with a paint on a control nobody is
* touching, until some later touch happens to clean it up:
*
*  - a finger that jitters inside the slop during the 150 ms delay (which is
*    every real finger; only a synthetic touch holds perfectly still) kills
*    the onset timer, so the press never paints at all;
*  - a `pointercancel` or a scroll inside a quick tap's 100 ms flash kills
*    `flashEnd`, leaving `data-astryx-press="on"` painted indefinitely. iOS Safari
*    delivers that cancel at `scrollend`, seconds after the tap, so it is not
*    a corner case;
*  - the same inside the 200 ms fade strands `data-astryx-press="fading"` and the
*    controller's single tracking slot, holding a reference to an element a
*    virtualized list may already have unmounted.
*/
function apply(step) {
	if (live == null) return;
	const phaseMoved = step.gesture.phase !== live.gesture.phase;
	if (step.timer != null || phaseMoved) clearTimer();
	live.gesture = step.gesture;
	paintElement(live.element, step.paint);
	if (step.gesture.phase === "idle") {
		live = null;
		return;
	}
	if (step.timer != null) {
		const kind = step.timer;
		live.timer = setTimeout(() => {
			if (live != null) live.timer = null;
			apply(pressGestureStep(live?.gesture ?? idlePressGesture(), { kind: TIMER_EVENT[kind] }));
		}, TIMER_MS[kind]);
	}
}
/**
* The innermost pressable surface at the touch, or nothing.
*
* Innermost wins: a button inside a pressable row takes the press, the way a
* button inside a native cell takes the highlight instead of the cell. A
* disabled surface takes it and paints nothing, so a press on a disabled
* control does not light the row around it.
*/
function surfaceAt(target) {
	if (!(target instanceof Element)) return null;
	const found = target.closest(`[${PRESSABLE_ATTRIBUTE}]`);
	if (!(found instanceof HTMLElement) || found.matches(DISABLED)) return null;
	return found;
}
/**
* Is this touch a BRAKE on a list the finger set moving, rather than a press?
*
* A native list highlights nothing for one, and nothing else would cancel it:
* stopping the scroll is exactly what makes the scroll events stop arriving,
* so there is no later signal to react to.
*
* Two narrowings, because "a scroll happened recently" is far too broad and
* would swallow presses nobody asked it to. Apps scroll things by themselves
* all the time: a transcript pinned to the bottom scrolls on every streamed
* frame, keyboard navigation calls `scrollIntoView`, a route change restores
* a position. None of those is a finger braking anything.
*
*  1. The scroller must CONTAIN the pressed element. A pane scrolling itself
*     says nothing about a control elsewhere.
*  2. The scroll must have been driven by a finger IN THAT SCROLLER, which is
*     what `onScroll` records. "Any finger anywhere, recently" is not enough:
*     tap a control, then within the memory window press a button inside a
*     pane that is scrolling on its own, and that press would be swallowed by
*     a scroll no finger drove.
*/
function scrollerIsBraking(element) {
	if (Date.now() - lastScrollAt >= 150) return false;
	return lastScroller instanceof Node && lastScroller.contains(element);
}
/**
* Let go of the controller's one tracking slot once the gesture is over.
*
* A gesture that became a scroll ends in `pointercancel`, not `pointerup`, so
* without this the dead gesture holds the slot for ever and every press after
* the first scroll is swallowed.
*/
function releaseIfDead() {
	if (live?.gesture.phase === "dead") {
		clearTimer();
		live = null;
	}
}
/** Drop the paint and forget the gesture, without running the machine. */
function finish() {
	if (live == null) return;
	clearTimer();
	live.element.removeAttribute(PRESSED_ATTRIBUTE);
	live = null;
}
function onPointerDown(event) {
	if (event.pointerType === "mouse") return;
	if (live != null) {
		if (!(live.gesture.phase === "fading" || live.gesture.phase === "flash")) {
			finish();
			return;
		}
		finish();
	}
	const element = surfaceAt(event.target);
	const braking = element != null && scrollerIsBraking(element);
	lastTouchAt = Date.now();
	lastTouchTarget = event.target instanceof Node ? event.target : null;
	if (element == null || braking) return;
	live = {
		element,
		gesture: idlePressGesture(),
		pointerId: event.pointerId,
		timer: null
	};
	apply(pressGestureStep(live.gesture, {
		kind: "down",
		x: event.clientX,
		y: event.clientY
	}));
}
function onPointerMove(event) {
	if (live == null || live.pointerId != null && event.pointerId !== live.pointerId) return;
	apply(pressGestureStep(live.gesture, {
		kind: "move",
		x: event.clientX,
		y: event.clientY
	}));
}
function onPointerUp(event) {
	if (event.pointerType === "mouse") return;
	lastTouchAt = Date.now();
	if (event.target instanceof Node) lastTouchTarget = event.target;
	if (live == null || live.pointerId != null && event.pointerId !== live.pointerId) return;
	apply(pressGestureStep(live.gesture, { kind: "up" }));
	releaseIfDead();
}
/**
* The scroller claimed the gesture, or the platform took it.
*
* `pointercancel` is the primary one: measured on iOS 26.2 it fires before
* the first `scroll` event (+303 ms against +304 ms on a slow drag, +31 ms
* against +47 ms on a fling), which is what puts this cancel one frame ahead
* of the list's motion, the way UIKit's `touchesCancelled` is.
*/
function onCancel() {
	if (live == null) return;
	apply(pressGestureStep(live.gesture, { kind: "cancel" }));
	releaseIfDead();
}
/** A scroll anywhere above the pressed element, caught in the capture phase. */
function onScroll(event) {
	const scroller = event.target instanceof Node ? event.target : document;
	if (Date.now() - lastTouchAt < 3e3 && lastTouchTarget != null && scroller.contains(lastTouchTarget)) {
		lastScrollAt = Date.now();
		lastScroller = scroller;
	}
	if (live == null) return;
	if (!(scroller === document || scroller.contains(live.element))) return;
	onCancel();
}
/**
* The backstop: a surface that leaves the document while it is painted must
* not come back painted. A virtualized list mounts and unmounts rows as they
* cross the scrollport, and React re-uses elements; the scroll cancel already
* makes that unreachable while a press is live, because recycling needs a
* scroll.
*/
function onVisibilityChange() {
	if (document.visibilityState === "hidden") finish();
}
var PASSIVE_CAPTURE = {
	capture: true,
	passive: true
};
function addListeners() {
	window.addEventListener("pointerdown", onPointerDown, PASSIVE_CAPTURE);
	window.addEventListener("pointermove", onPointerMove, PASSIVE_CAPTURE);
	window.addEventListener("pointerup", onPointerUp, PASSIVE_CAPTURE);
	window.addEventListener("pointercancel", onCancel, PASSIVE_CAPTURE);
	window.addEventListener("touchcancel", onCancel, PASSIVE_CAPTURE);
	window.addEventListener("dragstart", onCancel, PASSIVE_CAPTURE);
	document.addEventListener("scroll", onScroll, PASSIVE_CAPTURE);
	document.addEventListener("visibilitychange", onVisibilityChange);
}
function removeListeners() {
	window.removeEventListener("pointerdown", onPointerDown, PASSIVE_CAPTURE);
	window.removeEventListener("pointermove", onPointerMove, PASSIVE_CAPTURE);
	window.removeEventListener("pointerup", onPointerUp, PASSIVE_CAPTURE);
	window.removeEventListener("pointercancel", onCancel, PASSIVE_CAPTURE);
	window.removeEventListener("touchcancel", onCancel, PASSIVE_CAPTURE);
	window.removeEventListener("dragstart", onCancel, PASSIVE_CAPTURE);
	document.removeEventListener("scroll", onScroll, PASSIVE_CAPTURE);
	document.removeEventListener("visibilitychange", onVisibilityChange);
}
/**
* Install the touch press controller on this document, once, however many
* times it is called: the listeners exist while at least one caller holds it.
*
* Every Astryx pressable calls this through `usePressFeedback` on mount, so
* an app needs no wiring; call it directly from module scope when a page has
* pressable surfaces of its own and no Astryx component on it.
*
* @returns A release function. Call it once per install; the listeners come
*   down when the last holder releases, and the paint and the brake's clocks
*   are reset with them, so a later install never inherits a gesture that
*   never happened.
*/
function installPressFeedback() {
	if (typeof window === "undefined") return () => void 0;
	if (holders === 0) addListeners();
	holders += 1;
	let released = false;
	return () => {
		if (released) return;
		released = true;
		holders -= 1;
		if (holders > 0) return;
		removeListeners();
		finish();
		lastScrollAt = 0;
		lastScroller = null;
		lastTouchAt = 0;
		lastTouchTarget = null;
	};
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/hooks/usePressFeedback.js
/**
* @file usePressFeedback.ts
* @input The document-level press controller (utils/pressFeedback.ts)
* @output Exports usePressFeedback
* @position Core hook; every component that paints a press calls it and
*   spreads its result on the element that paints
*
* SYNC: When modified, update:
* - /packages/core/src/hooks/index.ts
* - /packages/core/src/hooks/usePressFeedback.doc.mjs
* - /packages/core/src/utils/pressFeedback.ts
*/
/**
* Mark an element as a pressable surface of the touch press model, and make
* sure the document-level controller that drives it is installed.
*
* Spread the result on the element that paints the press, and compose one of
* `interactionOverlayStyles` (from `@astryxdesign/core/utils`) on the same
* element: `backgroundColor` or `backgroundImage` for a surface whose hover
* and press are the system's overlays, `pressedBackgroundColor` for one
* whose hover is its own. The controller writes its attribute on the element
* while a touch press is believed (after the onset delay, cancelled by travel
* or by a scroll) and for the release, and the composed style paints the
* pressed token at the press's strength on the first frame and fades it over
* the release, keeping `:active` for a mouse. A press is themed through
* `--color-overlay-pressed`, which the hold, the flash and the fade all read.
* Every Astryx component that paints a press already does this; reach for it
* when a local component paints its own press and must behave like the rest
* of the system under a finger.
*
* Installation is shared and counted: the first mounted pressable installs
* the controller, the last one to unmount removes it. No per-element listener
* or state is added — a press costs one attribute write on one element.
*
* @example
* ```
* const pressable = usePressFeedback();
* return <div role="button" {...pressable} {...stylex.props(styles.row)} />;
* ```
*/
function usePressFeedback() {
	(0, import_react.useEffect)(() => installPressFeedback(), []);
	return pressableProps;
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/Button/Button.js
/**
* @file Button.tsx
* @input Uses React, ButtonHTMLAttributes, ReactNode, i18n (useTranslator), group contexts
* @output Exports Button component, ButtonProps, ButtonVariant types
* @position Core implementation; consumed by index.ts, tested by Button.test.tsx
*
* SYNC: When modified, update these files to stay in sync:
* - /packages/core/src/Button/Button.doc.mjs (props table, features, implementation notes)
* - /packages/core/src/Button/Button.test.tsx (tests for new/changed behavior)
* - /packages/core/src/Button/index.ts (exports if types change)
* - /apps/storybook/stories/Button.stories.tsx (storybook stories)
* - /packages/cli/assets/templates/blocks/components/Button/ (showcase blocks)
*
* Last synced props: label, variant, size, isDisabled, isLoading, isInterruptible, clickAction, icon, isIconOnly, width, children, tooltip, endContent, href, as, target, rel
*/
/**
* Base button styles
* Pseudo-classes are nested within properties per StyleX recommendation:
* https://stylexjs.com/docs/learn/styling-ui/defining-styles#pseudo-classes
*/
var styles$33 = {
	base: {
		"--button-focus-offset": "x16bblx1",
		kInvED: "x1wfwxd8 x13aywxo",
		kVAEAm: "x1n2onr6",
		k1xSpc: "x3nfvp2",
		kGNEyG: "x6s0dn4",
		kjj79g: "xl56j7k",
		kOIVth: "x1txdalj",
		k8WAf4: "xce4md1",
		kg3NbH: "xrrkdod",
		kMzoRj: "xc342km",
		ksu8eU: "xng3xce",
		kaIpWk: "x1jxw6zd",
		kMv6JI: "xjb2p0i",
		kGuDYH: "xcr08ib",
		kLWn49: "x1kq96og",
		k63SB2: "x1e4wzip",
		khDVqt: "xuxw1ft",
		k7Eaqz: "xeuugli",
		ks0D6T: "x193iq5w",
		kkrTdU: "x1ypdohk x16khyan",
		k1ekBW: "xrafxwg",
		kIyJzY: "xuedmi6 x12w9bfk",
		kAMwcw: "xlr8y92",
		$$css: true
	},
	pressable: {
		k3aq6I: "x3oybdh x8ppqj xom6oz5 x3y5scg",
		$$css: true
	},
	inactive: {
		kkrTdU: "xt0e3qv",
		kKwaWg: "x18o3ruo",
		k3aq6I: "x1c071of x1pdlv7q x1ylxtyb",
		$$css: true
	},
	disabled: {
		kSiTet: "xbyyjgo",
		$$css: true
	},
	ariaDisabled: {
		kKwaWg: "x18o3ruo xuqm82a x1bev2v5",
		$$css: true
	},
	iconOnly: {
		"--button-icon-only-aspect": "x1v15ycx",
		kOBAk4: "xioom0i",
		kg3NbH: "xnjsko4",
		k8WAf4: "xt970qd",
		kmuXW: "x2lah0s",
		ks0D6T: "x1x1rfll",
		$$css: true
	},
	iconWrapper: {
		k1xSpc: "x3nfvp2",
		kGNEyG: "x6s0dn4",
		kjj79g: "xl56j7k",
		kmuXW: "x2lah0s",
		$$css: true
	},
	contentWrapper: {
		k1xSpc: "xjp7ctv",
		$$css: true
	},
	link: {
		kybGjl: "x1hl2dhg",
		$$css: true
	}
};
var dynamicStyles$11 = { width: (width) => [{
	kzqmXN: width != null ? "x5lhr3w" : width,
	$$css: true
}, { "--x-width": ((val) => typeof val === "number" ? val + "px" : val != null ? val : void 0)(width) }] };
var sizeStyles$2 = {
	sm: {
		kZKoxP: "x6k0iem",
		$$css: true
	},
	md: {
		kZKoxP: "x1ueg155",
		$$css: true
	},
	lg: {
		kZKoxP: "xssyfek",
		$$css: true
	}
};
/**
* Resting elevation for floating buttons (e.g. a FAB). `none` is the default
* flat button; `low`/`med`/`high` map to the shadow token scale. 'none' stays
* a literal so it never conflicts with a variant's background layering.
*/
var elevationStyles$2 = {
	none: {
		kGVxlE: "x1gnnqk1",
		$$css: true
	},
	low: {
		kGVxlE: "x1i5ehqx",
		$$css: true
	},
	med: {
		kGVxlE: "x14hfi27",
		$$css: true
	},
	high: {
		kGVxlE: "x1kcpxr7",
		$$css: true
	}
};
/**
* Variant styles using backgroundImage for layered colors
* Pseudo-classes are nested within properties per StyleX recommendation
* Overlay is stacked on top of base color using multiple linear-gradients
* Focus outline is shared across variants for consistent keyboard affordance.
*/
var variants = {
	primary: {
		kWkggS: "x1ewilqj",
		kMwMTN: "x17wrial",
		$$css: true
	},
	secondary: {
		kWkggS: "x17x4s8c",
		kMwMTN: "x1tgivj0",
		$$css: true
	},
	ghost: {
		kWkggS: "xjbqb8w",
		kMwMTN: "x1tgivj0",
		$$css: true
	},
	destructive: {
		kWkggS: "x1pjz0fi",
		kMwMTN: "x1m024r3",
		kjBf7l: "x1e0x2sz",
		$$css: true
	}
};
/**
* Button variant type derived from ButtonVariantMap.
* Extensible via module augmentation of ButtonVariantMap.
*/
/**
* Button size type derived from the sizeStyles StyleX object
*/
var iconSizeByButtonSize = {
	sm: "sm",
	md: "sm",
	lg: "md"
};
durationVars["--duration-medium-min"];
var loadingStyles = {
	hiddenContent: {
		kMwMTN: "x19co3pv",
		$$css: true
	},
	hiddenContentDelayed: {
		kKVMdj: "x1ffowhz",
		k44tkh: "xjlvqhv",
		kWV6AL: "x10e4vud",
		kKxzle: "x17yabm6 x14q22ui",
		$$css: true
	}
};
var groupStyles$1 = {
	horizontal: {
		krdFHd: "x15mokao x8eehn2",
		kVL7Gh: "xbiv7yw x1xrp5p4",
		kfmiAY: "x1ga7v0g x149bkfe",
		kT0f0o: "x16uus16 x1ursds5",
		k2ei4v: "xgbv0en x1pjv70x",
		kVhnKS: "x1t7ytsu xyf0ibl",
		kGJrpR: "x1j92z86",
		$$css: true
	},
	vertical: {
		krdFHd: "x15mokao x8eehn2",
		kfmiAY: "x1ga7v0g x2qxyot",
		kVL7Gh: "xbiv7yw xy2bsav",
		kT0f0o: "x16uus16 x1ursds5",
		kEafiO: "x11xkdxz x1g31smg",
		kPef9Z: "x13fuv20 x1d9v4yf",
		kLZC3w: "x1pc3f07",
		$$css: true
	},
	onSolidHorizontal: {
		kGJrpR: "xrvmtm5",
		$$css: true
	},
	onSolidVertical: {
		kLZC3w: "x11npmm7",
		$$css: true
	}
};
/**
* A versatile button component with multiple variants.
*
* Styles use Astryx theme tokens via StyleX.
* Wrap your app in <Theme> to apply a theme.
* Themes can provide component-level variant overrides via theme.components.button.variants
*
* When `href` is provided (and the button is not disabled), renders as an `<a>`
* element (or custom link component) with full button styling, enabling native
* browser behaviors like right-click → open in new tab and Cmd+Click.
*
* @example
* ```
* <Button label="Click me" />
* <Button label="Primary action" variant="primary" />
* <Button label="Delete" variant="destructive" />
* <Button label="Settings" icon={<GearIcon />} variant="ghost" isIconOnly />
* <Button label="Pick emoji" icon={<span>🚀</span>} variant="ghost" size="sm" isIconOnly />
* <Button label="Edit" icon={<PencilIcon />} />
* <Button label="Messages" endContent={<Badge label={3} />} />
* <Button label="Edit" icon={<PencilIcon />} endContent={<Badge label="New" />} />
* <Button label="Sign in" variant="primary" width="100%" />
* <Button label="Visit site" href="https://example.com" variant="primary" />
* <Button label="Open in new tab" href="https://example.com" target="_blank" rel="noopener noreferrer" />
* ```
*/
function Button({ label, variant = "secondary", size: sizeProp, type = "button", isDisabled = false, isLoading = false, isInterruptible = false, clickAction, icon, isIconOnly = false, width, elevation = "none", children, endContent, tooltip, href, as, target, rel, xstyle, className, style, ref, ...props$17 }) {
	const pressFeedback = usePressFeedback();
	const t = useTranslator();
	const size = useSize(sizeProp, "md");
	const buttonGroup = useButtonGroup();
	const inputGroup = useInputGroup();
	const [isPending, startTransition] = (0, import_react.useTransition)();
	const actionInFlightRef = (0, import_react.useRef)(false);
	const isLoadingState = isLoading || isPending;
	const [isLiveRegionReady, setIsLiveRegionReady] = (0, import_react.useState)(() => !isLoadingState);
	(0, import_react.useEffect)(() => {
		if (isLiveRegionReady) return;
		const frame = requestAnimationFrame(() => setIsLiveRegionReady(true));
		return () => cancelAnimationFrame(frame);
	}, [isLiveRegionReady]);
	const delaySpinner = isPending || isInterruptible;
	const groupDisabled = buttonGroup?.isDisabled ?? false;
	const isTrueDisabled = isDisabled || groupDisabled;
	const isBusyOnlyDisabled = !isTrueDisabled && isLoadingState && !isInterruptible;
	const buttonDisabled = isTrueDisabled || isBusyOnlyDisabled;
	const LinkComponent = useLinkComponent(as);
	const renderAsLink = href != null && !isTrueDisabled;
	const useAriaDisabled = buttonDisabled && (isBusyOnlyDisabled || tooltip != null);
	const tooltipHook = useTooltip({
		placement: "above",
		isEnabled: tooltip != null
	});
	const handleClick = (e) => {
		if (buttonDisabled || actionInFlightRef.current && !isInterruptible) {
			e.preventDefault();
			e.stopPropagation();
			return;
		}
		props$17.onClick?.(e);
		if (clickAction && !e.defaultPrevented) {
			actionInFlightRef.current = true;
			startTransition(async () => {
				try {
					await clickAction(e);
				} finally {
					actionInFlightRef.current = false;
				}
			});
		}
	};
	const handleKeyDown = useAriaDisabled ? (e) => {
		if (e.key === "Enter" || e.key === " ") e.preventDefault();
		else props$17.onKeyDown?.(e);
	} : void 0;
	const edgeCompAttr = variant === "ghost" ? { [EDGE_COMP_ATTR]: "" } : null;
	const sharedStylexProps = focusOutlineProps.focusVisible(styles$33.base, sizeStyles$2[size], isIconOnly && styles$33.iconOnly, interactionOverlayStyles.backgroundImage, buttonDisabled && styles$33.inactive, isTrueDisabled && styles$33.disabled, useAriaDisabled && styles$33.ariaDisabled, renderAsLink && styles$33.link, !buttonGroup && styles$33.pressable, buttonGroup && (buttonGroup.orientation === "horizontal" ? groupStyles$1.horizontal : groupStyles$1.vertical), inputGroup != null && buttonGroup == null && groupStyles$2.buttonAddon, buttonGroup && (variant === "primary" || variant === "destructive") && (buttonGroup.orientation === "horizontal" ? groupStyles$1.onSolidHorizontal : groupStyles$1.onSolidVertical), !buttonGroup && elevationStyles$2[elevation], width != null && dynamicStyles$11.width(width), variants[variant], xstyle);
	const sharedMergedProps = mergeProps(themeProps("button", {
		variant,
		size,
		elevation: buttonGroup ? "none" : elevation
	}), sharedStylexProps, className, style);
	const iconSize = iconSizeByButtonSize[size];
	const buttonContent = /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		isLoadingState && /*#__PURE__*/ (0, import_jsx_runtime.jsx)("span", {
			...{
				0: { className: "x10l6tqk x13vifvy x1o0tod xtijo5x x1ey2m1c xrvj5dj x1ku5rj1" },
				1: { className: "x10l6tqk x13vifvy x1o0tod xtijo5x x1ey2m1c xrvj5dj x1ku5rj1 xqcmdr3 xb2rp9n xskzprw x17yabm6 x14q22ui" }
			}[!!delaySpinner << 0],
			"aria-hidden": "true",
			children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Spinner, {
				size: "sm",
				shade: "inherit"
			})
		}),
		/*#__PURE__*/ (0, import_jsx_runtime.jsxs)("span", {
			...props(styles$33.contentWrapper, isLoadingState && (delaySpinner ? loadingStyles.hiddenContentDelayed : loadingStyles.hiddenContent)),
			"aria-hidden": isLoadingState || void 0,
			children: [
				icon && /*#__PURE__*/ (0, import_jsx_runtime.jsx)("span", {
					...props(styles$33.iconWrapper, iconBoxSizeStyles[iconSize]),
					children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(IconDefaultSizeProvider, {
						value: iconSize,
						children: icon
					})
				}),
				isIconOnly ? null : /*#__PURE__*/ (0, import_jsx_runtime.jsx)("span", {
					className: "xb3r6kr xlyipyv xeuugli",
					children: children ?? label
				}),
				!isIconOnly && endContent && /*#__PURE__*/ (0, import_jsx_runtime.jsx)("span", {
					className: "x3nfvp2 x6s0dn4 x1heor9g",
					children: endContent
				})
			]
		}),
		/*#__PURE__*/ (0, import_jsx_runtime.jsx)(VisuallyHidden, {
			role: "status",
			"aria-live": "polite",
			children: isLoadingState && isLiveRegionReady ? t("@astryx.button.loading") : ""
		})
	] });
	const ariaLabelProp = isIconOnly && label !== "" || isLoadingState && !isIconOnly || children != null && children !== label ? { "aria-label": label } : null;
	const describedByProp = tooltip != null ? { "aria-describedby": [props$17["aria-describedby"], tooltipHook.describedBy].filter(Boolean).join(" ") || void 0 } : null;
	const mergedButtonRef = useMergedRefs(ref, tooltip != null ? tooltipHook.ref : void 0);
	let element;
	if (renderAsLink) element = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(LinkComponent, {
		ref: mergedButtonRef,
		href,
		target,
		rel,
		...sharedMergedProps,
		...pressFeedback,
		...props$17,
		...ariaLabelProp,
		...describedByProp,
		...edgeCompAttr,
		"aria-busy": isLoadingState || void 0,
		"aria-disabled": useAriaDisabled || void 0,
		onClick: handleClick,
		...handleKeyDown ? { onKeyDown: handleKeyDown } : null,
		children: buttonContent
	});
	else element = /*#__PURE__*/ (0, import_jsx_runtime.jsx)("button", {
		ref: mergedButtonRef,
		type,
		disabled: useAriaDisabled ? void 0 : buttonDisabled,
		...sharedMergedProps,
		...pressFeedback,
		...props$17,
		...ariaLabelProp,
		...describedByProp,
		...edgeCompAttr,
		"aria-busy": isLoadingState || void 0,
		"aria-disabled": useAriaDisabled || void 0,
		onClick: handleClick,
		...handleKeyDown ? { onKeyDown: handleKeyDown } : null,
		children: buttonContent
	});
	if (tooltip) return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [element, tooltipHook.renderTooltip(tooltip)] });
	return element;
}
Button.displayName = "Button";
//#endregion
//#region node_modules/@astryxdesign/core/dist/Layout/LayoutAreaContext.js
/**
* @file LayoutAreaContext.ts
* @input Uses React createContext
* @output Exports LayoutAreaContext and LayoutArea type
* @position Context for layout slot detection
*
* SYNC: When modified, update these files to stay in sync:
* - /packages/core/src/Layout/Layout.doc.mjs
*/
/**
* Layout area type representing which slot a component is rendered in.
* Used by content area components to detect their position and adjust styling.
*/
/**
* Context for detecting which layout area a component is rendered in.
* Content area components use this to:
* - Auto-position dividers correctly
* - Apply correct semantic elements
* - Adjust internal spacing
*/
var LayoutAreaContext = /*#__PURE__*/ (0, import_react.createContext)(null);
LayoutAreaContext.displayName = "LayoutAreaContext";
/**
* Context for layout slot information.
* Content area components use this to determine if they are at an edge
* (for applying outer padding).
*/
var LayoutSlotsContext = createLayerScopedContext({
	hasHeader: false,
	hasFooter: false,
	hasStart: false,
	hasEnd: false
});
LayoutSlotsContext.displayName = "LayoutSlotsContext";
//#endregion
//#region node_modules/@astryxdesign/core/dist/Layout/LayoutDividerContext.js
/**
* @file LayoutDividerContext.ts
* @input Layer-scoped React context
* @output Exports LayoutDividerContext and LayoutDividerContextValue type
* @position Context for container-controlled default divider visibility;
*   consumed by LayoutHeader.tsx, LayoutFooter.tsx, provided by Layout.tsx
*
* SYNC: When modified, update these files to stay in sync:
* - /packages/core/src/Layout/Layout.doc.mjs
* - /packages/core/src/Layout/Layout.tsx
* - /packages/core/src/Layout/LayoutHeader.tsx
* - /packages/core/src/Layout/LayoutFooter.tsx
*/
var LayoutDividerContext = createLayerScopedContext(null);
LayoutDividerContext.displayName = "LayoutDividerContext";
//#endregion
//#region node_modules/@astryxdesign/core/dist/Stack/stack.stylex.js
var alignItemsStyles = {
	center: {
		kGNEyG: "x6s0dn4",
		$$css: true
	},
	end: {
		kGNEyG: "xuk3077",
		$$css: true
	},
	start: {
		kGNEyG: "x1cy8zhl",
		$$css: true
	},
	stretch: {
		kGNEyG: "x1qjc9v5",
		$$css: true
	}
};
/**
* Cross-axis alignment options for stack items.
* - For HStack: vertical alignment
* - For VStack: horizontal alignment
*/
var justifyContentStyles = {
	start: {
		kjj79g: "x1nhvcw1",
		$$css: true
	},
	center: {
		kjj79g: "xl56j7k",
		$$css: true
	},
	end: {
		kjj79g: "x13a6bvl",
		$$css: true
	},
	between: {
		kjj79g: "x1qughib",
		$$css: true
	},
	around: {
		kjj79g: "x1l1ennw",
		$$css: true
	},
	evenly: {
		kjj79g: "xaw8158",
		$$css: true
	}
};
/**
* Main-axis alignment options for stack items.
* - For HStack: horizontal alignment
* - For VStack: vertical alignment
*/
var directionStyles = {
	horizontal: {
		kXwgrk: "x1q0g3np",
		$$css: true
	},
	vertical: {
		kXwgrk: "xdt5ytf",
		$$css: true
	}
};
/**
* Stack direction.
* - `horizontal`: Items flow left-to-right (HStack)
* - `vertical`: Items flow top-to-bottom (VStack)
*/
var wrapStyles = {
	nowrap: {
		kwnvtZ: "xozqiw3",
		$$css: true
	},
	wrap: {
		kwnvtZ: "x1a02dak",
		$$css: true
	},
	"wrap-reverse": {
		kwnvtZ: "x8hhl5t",
		$$css: true
	}
};
/**
* Flex wrap behavior.
* - `nowrap`: Items stay on one line (default)
* - `wrap`: Items wrap to next line
* - `wrap-reverse`: Items wrap to previous line
*/
var baseStyles$2 = { stack: {
	k1xSpc: "x78zum5",
	$$css: true
} };
/**
* Gap styles using spacing tokens from the theme.
* Keys are numeric SpacingStep values.
*/
var gapStyles = {
	"0": {
		k1C7PZ: "x1o57wo1",
		khm7nJ: "x6yxi7o",
		$$css: true
	},
	"1": {
		k1C7PZ: "x1lfs0n9",
		khm7nJ: "x1ngg2t4",
		$$css: true
	},
	"2": {
		k1C7PZ: "xak3so",
		khm7nJ: "x1x7z4sm",
		$$css: true
	},
	"3": {
		k1C7PZ: "xewh9hi",
		khm7nJ: "x4olc9o",
		$$css: true
	},
	"4": {
		k1C7PZ: "xty4p9g",
		khm7nJ: "xtx9w7w",
		$$css: true
	},
	"5": {
		k1C7PZ: "x1eqhezk",
		khm7nJ: "x1iu6piu",
		$$css: true
	},
	"6": {
		k1C7PZ: "x3qlgwd",
		khm7nJ: "xczp1bk",
		$$css: true
	},
	"8": {
		k1C7PZ: "xicv188",
		khm7nJ: "xgx0vcf",
		$$css: true
	},
	"10": {
		k1C7PZ: "x1p37tyl",
		khm7nJ: "x1xpicb7",
		$$css: true
	},
	"0.5": {
		k1C7PZ: "x1kihgfc",
		khm7nJ: "x1tw44j4",
		$$css: true
	},
	"1.5": {
		k1C7PZ: "x1thn6ci",
		khm7nJ: "xhq53yo",
		$$css: true
	}
};
/**
* StyleX utility to add stack (flex container) styles to any element.
*
* @example
* ```
* import { stack } from '@astryxdesign/core/Layout';
* import * as stylex from '@stylexjs/stylex';
*
* // Horizontal stack with numeric gap
* <div {...stylex.props(...stack({ direction: 'horizontal', gap: 2 }))}>
*   <Child />
*   <Child />
* </div>
*
* // Vertical stack with centered items
* <div {...stylex.props(...stack({ direction: 'vertical', crossAlign: 'center' }))}>
*   <Child />
*   <Child />
* </div>
*
* // Wrapping horizontal stack with larger gap
* <div {...stylex.props(...stack({ direction: 'horizontal', gap: 4, wrap: 'wrap' }))}>
*   <Child />
*   <Child />
*   <Child />
* </div>
* ```
*/
function stack({ crossAlign, direction, gap, mainAlign, wrap }) {
	return [
		baseStyles$2.stack,
		directionStyles[direction],
		gap != null && gapStyles[gap],
		crossAlign != null && alignItemsStyles[crossAlign],
		mainAlign != null && justifyContentStyles[mainAlign],
		wrap != null && wrapStyles[wrap]
	];
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/Stack/stackItem.stylex.js
/**
* "Resets" the min-width and min-height of the flex item to behave predictably.
*
* Flex items have an implicit min size of auto, meaning they will never shrink
* smaller than their contents. This reset allows items to be constrained by
* their flex parent and become scrollable if necessary.
*/
var minSizeResetStyles = { reset: {
	kAzted: "x2lwn1j",
	k7Eaqz: "xeuugli",
	$$css: true
} };
var crossAlignSelfStyles = {
	center: {
		kSGwAc: "xamitd3",
		$$css: true
	},
	end: {
		kSGwAc: "xpvyfi4",
		$$css: true
	},
	start: {
		kSGwAc: "xqcrz7y",
		$$css: true
	},
	stretch: {
		kSGwAc: "xkh2ocl",
		$$css: true
	}
};
/**
* Cross-alignment options for stack items.
* Overrides the default cross-alignment set on the parent stack.
*/
var sizeStyles$1 = {
	fill: {
		kzQI83: "x1iyjqo2",
		$$css: true
	},
	static: {
		kzQI83: "x1c4vz4f",
		kmuXW: "x2lah0s",
		$$css: true
	}
};
/**
* Size options for stack items.
* - `static`: Item uses its intrinsic size, won't grow or shrink
* - `fill`: Item grows to fill remaining space (flexGrow: 1)
*/
/**
* StyleX utility to add stack item styles to any component.
*
* Use this to avoid wrapping components in StackItem when you need
* direct control over flex behavior.
*
* @example
* ```
* import { stackItem } from '@astryxdesign/core/Layout';
*
* <div {...stylex.props(...stackItem({ size: 'fill' }))}>
*   Content that fills remaining space
* </div>
* ```
*/
function stackItem({ crossAlignSelf, size } = {}) {
	return [
		minSizeResetStyles.reset,
		sizeStyles$1[size ?? "static"],
		crossAlignSelf != null && crossAlignSelfStyles[crossAlignSelf]
	];
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/Layout/Layout.js
/**
* @file Layout.tsx
* @input Uses React, stack/stackItem utilities, LayoutAreaContext, LayoutSlotsContext
* @output Exports Layout component and LayoutProps, LayoutHeight types
* @position General five-slot layout primitive for arranging header, start, content, end, and footer regions.
*   Building a page area with a side panel? Use Layout with start/end slots.
*   Need a header + scrollable content? Use Layout with header + content slots.
*   AppShell owns the page shell and app-wide navigation behavior.
*
* SYNC: When modified, update these files to stay in sync:
* - /packages/core/src/Layout/Layout.doc.mjs
* - /apps/storybook/stories/Layout.stories.tsx
* - /packages/cli/assets/templates/blocks/components/Layout/ (showcase blocks)
*/
/**
* Height behavior for the layout.
* - `fill`: Layout fills container height, content scrolls internally (default)
* - `auto`: Layout grows with content, container/page scrolls
*/
/**
* Internal alignment subtracts contentWidth in CSS. Intrinsic values and bare
* variables cannot participate in that arithmetic, so they keep the released
* constrained-composition path.
*/
function supportsInternalContentWidthAlignment(width) {
	if (width == null || typeof width === "number") return true;
	const value = width.trim().toLowerCase();
	if (value.includes("%")) return false;
	return value === "0" || /^-?(?:\d+(?:\.\d+)?|\.\d+)[a-z]+$/.test(value) || /^(?:calc|min|max|clamp)\(/.test(value);
}
var styles$32 = {
	layoutOuter: {
		keTefX: "xojxgvx",
		k71WvV: "x1fcf3bl",
		keoZOQ: "x1sa9bsh",
		k1K539: "x6h7pi7",
		$$css: true
	},
	layoutInner: {
		"--container-padding-inline-start": "xrhngw9",
		"--container-padding-inline-end": "xjsfl84",
		"--container-padding-block-start": "x1047aw6",
		"--container-padding-block-end": "xax9j7h",
		"--layout-content-width": "x15lplax",
		"--layout-alignment-width": "x19kr0ht",
		"--layout-padding-own-outer-x": "x1vii845",
		"--layout-padding-own-outer-y": "xojybgt",
		$$css: true
	},
	fill: {
		kZKoxP: "x12qplqi",
		kskxy: "xenllk4",
		$$css: true
	},
	auto: {
		kAzted: "x1us19tq",
		$$css: true
	},
	middle: {
		kUk6DE: "x98rzlu",
		kAzted: "x2lwn1j",
		$$css: true
	},
	middleQuery: {
		k9g6sI: "xsw3flo",
		$$css: true
	},
	singleColumnContent: {
		kzqmXN: "xh8yej3",
		ks0D6T: "xjl2t3p xpgkkid",
		kUOVxO: "xvueqy4",
		$$css: true
	},
	singlePanelMiddle: {
		kB7OPa: "x9f619",
		kzqmXN: "xh8yej3",
		ks0D6T: "xjl2t3p xnpzo02",
		kUOVxO: "xvueqy4 xb0m1lw",
		$$css: true
	},
	singleStartPanel: {
		kZCmMZ: "x1vvd0s7",
		$$css: true
	},
	singleEndPanel: {
		kwRFfy: "xxdn8bs",
		$$css: true
	},
	fullBleed: {
		"--layout-padding-own-outer-x": "xbjcssu",
		"--layout-padding-own-outer-y": "x1bz2q72",
		$$css: true
	}
};
var _temp$6 = {
	kzqmXN: "xh8yej3",
	kUOVxO: "xvueqy4",
	"$$css": true
};
var dynamicStyles$10 = {
	contentWidthVar: (width) => [{
		"--layout-content-width": (typeof width === "number" ? `${width}px` : width) != null ? "x4906uf" : typeof width === "number" ? `${width}px` : width,
		$$css: true
	}, { "--x---layout-content-width": (typeof width === "number" ? `${width}px` : width) != null ? typeof width === "number" ? `${width}px` : width : void 0 }],
	contentAlignmentWidthVar: (width) => [{
		"--layout-alignment-width": (typeof width === "number" ? `${width}px` : width) != null ? "x1b1nz06" : typeof width === "number" ? `${width}px` : width,
		$$css: true
	}, { "--x---layout-alignment-width": (typeof width === "number" ? `${width}px` : width) != null ? typeof width === "number" ? `${width}px` : width : void 0 }],
	contentWidth: (width) => [
		_temp$6,
		{
			ks0D6T: (typeof width === "number" ? `${width}px` : width) != null ? "xf68679" : typeof width === "number" ? `${width}px` : width,
			$$css: true
		},
		{ "--x-maxWidth": ((val) => typeof val === "number" ? val + "px" : val != null ? val : void 0)(typeof width === "number" ? `${width}px` : width) }
	]
};
/**
* Helper component to wrap content in layout area context.
*/
function AreaProvider({ area, children }) {
	if (children == null) return null;
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(LayoutAreaContext, {
		value: area,
		children
	});
}
/**
* General layout primitive with header, start, content, end, and footer slots.
* Use it to arrange regions within a page or bounded container. AppShell owns
* the page shell, app-wide navigation, responsive shell behavior, skip link,
* and main landmark.
*
* Handles padding collapse between adjacent slots, scroll containment in the
* content area, and automatic RTL support via CSS logical properties.
*
* Structure:
* ```
* ┌─────────────────────────────────────────┐
* │                 header                  │
* ├──────┬─────────────────────────┬────────┤
* │      │                         │        │
* │start │        content          │  end   │
* │      │                         │        │
* ├──────┴─────────────────────────┴────────┤
* │                 footer                  │
* └─────────────────────────────────────────┘
* ```
*
* When to use Layout vs raw flexbox:
* - Page with a sidebar → Layout with `start` slot
* - Dashboard with header + scrollable body → Layout with `header` + `content`
* - Settings page with nav panel → Layout with `start` + `content`
* - Simple vertical stack of items → use VStack instead
*
* @example
* ```
* <Layout
*   header={<LayoutHeader hasDivider>App Name</LayoutHeader>}
*   start={
*     <LayoutPanel hasDivider width={240} role="navigation">
*       <Navigation />
*     </LayoutPanel>
*   }
*   content={
*     <LayoutContent role="main">
*       <MainContent />
*     </LayoutContent>
*   }
* />
* ```
*/
var _temp2$3 = {
	"x-default-marker": "x-default-marker",
	$$css: true
};
function Layout({ children, content, contentWidth, defaultHasDividers, end, footer, header, height = "fill", padding, ref, start, xstyle, className, style, ...restProps }) {
	const isFill = height === "fill";
	const resolvedContent = content ?? children;
	const dividerCtxValue = (0, import_react.useMemo)(() => defaultHasDividers != null ? { defaultHasDividers } : null, [defaultHasDividers]);
	const hasHeader = header != null;
	const hasFooter = footer != null;
	const hasStart = start != null;
	const hasEnd = end != null;
	const hasBothPanels = hasStart && hasEnd;
	const hasSinglePanel = hasStart !== hasEnd;
	const usesInternalContentWidth = contentWidth != null && supportsInternalContentWidthAlignment(contentWidth);
	const slotsValue = (0, import_react.useMemo)(() => ({
		hasHeader,
		hasFooter,
		hasStart,
		hasEnd
	}), [
		hasHeader,
		hasFooter,
		hasStart,
		hasEnd
	]);
	const tree = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(LayoutSlotsContext, {
		value: slotsValue,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
			...restProps,
			ref,
			...mergeProps(themeProps("layout", { height }), props(styles$32.layoutOuter, isFill ? styles$32.fill : styles$32.auto, xstyle), className, style),
			children: /*#__PURE__*/ (0, import_jsx_runtime.jsxs)("div", {
				...props(_temp2$3, styles$32.layoutInner, ...stack({ direction: "vertical" }), isFill ? styles$32.fill : styles$32.auto, padding === 0 && styles$32.fullBleed, padding != null && layoutPaddingOuterXVarStyles[padding], padding != null && layoutPaddingOuterYVarStyles[padding], contentWidth != null && dynamicStyles$10.contentWidthVar(contentWidth), usesInternalContentWidth && dynamicStyles$10.contentAlignmentWidthVar(contentWidth)),
				children: [
					/*#__PURE__*/ (0, import_jsx_runtime.jsx)(AreaProvider, {
						area: "header",
						children: header
					}),
					/*#__PURE__*/ (0, import_jsx_runtime.jsxs)("div", {
						...props(...stack({ direction: "horizontal" }), styles$32.middle, contentWidth != null && (!usesInternalContentWidth || hasBothPanels) && dynamicStyles$10.contentWidth(contentWidth), usesInternalContentWidth && !hasBothPanels && styles$32.middleQuery, usesInternalContentWidth && hasSinglePanel && styles$32.singlePanelMiddle, usesInternalContentWidth && hasStart && !hasEnd && styles$32.singleStartPanel, usesInternalContentWidth && !hasStart && hasEnd && styles$32.singleEndPanel),
						children: [
							/*#__PURE__*/ (0, import_jsx_runtime.jsx)(AreaProvider, {
								area: "start",
								children: start
							}),
							/*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
								...props(...stackItem({ size: "fill" }), usesInternalContentWidth && !hasStart && !hasEnd && styles$32.singleColumnContent),
								children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(AreaProvider, {
									area: "content",
									children: resolvedContent
								})
							}),
							/*#__PURE__*/ (0, import_jsx_runtime.jsx)(AreaProvider, {
								area: "end",
								children: end
							})
						]
					}),
					/*#__PURE__*/ (0, import_jsx_runtime.jsx)(AreaProvider, {
						area: "footer",
						children: footer
					})
				]
			})
		})
	});
	if (dividerCtxValue != null) return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(LayoutDividerContext, {
		value: dividerCtxValue,
		children: tree
	});
	return tree;
}
Layout.displayName = "Layout";
//#endregion
//#region node_modules/@astryxdesign/core/dist/Layout/LayoutHeader.js
/**
* @file LayoutHeader.tsx
* @input Uses React StyleX
* @output Exports LayoutHeader component and LayoutHeaderProps
* @position Top bar / header area for Layout. Use for page titles, app bars,
*   toolbar areas, or any fixed-height content at the top of a layout.
*
* SYNC: When modified, update these files to stay in sync:
* - /packages/core/src/Layout/Layout.doc.mjs
* - /packages/core/src/Layout/LayoutHeader.doc.mjs
* - /apps/storybook/stories/Layout.stories.tsx
* - /packages/cli/assets/templates/blocks/components/Layout/ (showcase blocks)
*/
var styles$31 = {
	header: {
		kmuXW: "x2lah0s",
		$$css: true
	},
	inner: {
		kB7OPa: "x9f619",
		ks0D6T: "xjl2t3p",
		kUOVxO: "xvueqy4",
		kZCmMZ: "xaku5ci",
		kwRFfy: "x19eyx77",
		kLKAdn: "xuqi0w",
		kGO01o: "xg476vw",
		"--container-padding-inline-start": "xt2a87w",
		"--container-padding-inline-end": "xhq06x6",
		"--container-padding-block-start": "x186o6qk",
		"--container-padding-block-end": "xi9ns85",
		$$css: true
	},
	fullBleed: {
		kZCmMZ: "x1c1uobl",
		kwRFfy: "xyri2b",
		kLKAdn: "xexx8yu",
		kGO01o: "x18d9i69",
		"--container-padding-inline-start": "xrhngw9",
		"--container-padding-inline-end": "xjsfl84",
		"--container-padding-block-start": "x1047aw6",
		"--container-padding-block-end": "xax9j7h",
		$$css: true
	},
	divider: {
		kt9PQ7: "xso031l",
		kfdmCh: "x1q0q8m5",
		kL6WhQ: "xw8gpjh",
		$$css: true
	}
};
var dynamicStyles$9 = { sizing: (height) => [{
	kZKoxP: height != null ? "x16ye13r" : height,
	$$css: true
}, { "--x-height": ((val) => typeof val === "number" ? val + "px" : val != null ? val : void 0)(height) }] };
/**
* Top bar / header for Layout. Use for page titles, app bars, or toolbars.
* Renders in the header slot with optional divider and padding control.
*
* Already provides its own padding — don't add padding to children.
* Use `padding={0}` if your content manages its own padding (e.g. TopNav).
*
* @example
* ```
* <LayoutContainer variant="card">
*   <Layout
*     header={<LayoutHeader hasDivider>Page Title</LayoutHeader>}
*     content={<LayoutContent>...</LayoutContent>}
*   />
* </LayoutContainer>
* ```
*/
function LayoutHeader({ children, hasDivider, height, label, padding, paddingBlockEnd, role, xstyle, className, style, ref, ...props$16 }) {
	const dividerCtx = (0, import_react.use)(LayoutDividerContext);
	const resolvedHasDivider = hasDivider ?? dividerCtx?.defaultHasDividers ?? false;
	const isZeroPadding = padding === 0;
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
		ref,
		role,
		"aria-label": label,
		"data-divider": resolvedHasDivider || void 0,
		...mergeProps(themeProps("layout-header"), props(styles$31.header, dynamicStyles$9.sizing(height ?? null), resolvedHasDivider && styles$31.divider, xstyle), className, style),
		...props$16,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
			...props(styles$31.inner, isZeroPadding && styles$31.fullBleed, padding != null && paddingStyles[padding], padding != null && containerPaddingInlineVarStyles[padding], padding != null && containerPaddingBlockStartVarStyles[padding], padding != null && containerPaddingBlockEndVarStyles[padding], paddingBlockEnd != null && paddingBlockEndStyles[paddingBlockEnd], paddingBlockEnd != null && containerPaddingBlockEndVarStyles[paddingBlockEnd]),
			children
		})
	});
}
LayoutHeader.displayName = "LayoutHeader";
//#endregion
//#region node_modules/@astryxdesign/core/dist/Layout/LayoutPanel.js
/**
* @file LayoutPanel.tsx
* @input Uses React StyleX, LayoutAreaContext, LayoutSlotsContext
* @output Exports LayoutPanel component and LayoutPanelProps
* @position Sidebar panel for Layout start/end slots. Use for navigation panels,
*   settings sidebars, detail panels, or any fixed-width side content.
*
* SYNC: When modified, update these files to stay in sync:
* - /packages/core/src/Layout/Layout.doc.mjs
* - /apps/storybook/stories/Layout.stories.tsx
* - /packages/cli/assets/templates/blocks/components/Layout/ (showcase blocks)
*/
var styles$30 = {
	panel: {
		kB7OPa: "x9f619",
		kmuXW: "x2lah0s",
		kVQacm: "x7giv3",
		kZCmMZ: "xwjyata",
		kwRFfy: "x1peupej",
		kLKAdn: "xqty4a",
		kGO01o: "xg476vw",
		"--container-padding-inline-start": "x408pgh",
		"--container-padding-inline-end": "xikqloz",
		"--container-padding-block-start": "xjmgx01",
		"--container-padding-block-end": "xi9ns85",
		$$css: true
	},
	startPanel: {
		kZCmMZ: "xaku5ci",
		$$css: true
	},
	endPanel: {
		kwRFfy: "x19eyx77",
		$$css: true
	},
	noHeader: {
		kLKAdn: "xuqi0w",
		$$css: true
	},
	noFooter: {
		kGO01o: "x1363qu6",
		$$css: true
	},
	fullBleed: {
		kZCmMZ: "x1c1uobl",
		kwRFfy: "xyri2b",
		kLKAdn: "xexx8yu",
		kGO01o: "x18d9i69",
		"--container-padding-inline-start": "xrhngw9",
		"--container-padding-inline-end": "xjsfl84",
		"--container-padding-block-start": "x1047aw6",
		"--container-padding-block-end": "xax9j7h",
		$$css: true
	},
	scrollable: {
		kVQacm: "xysyzu8",
		$$css: true
	},
	dividerEnd: {
		ke9TFa: "x1lun4ml",
		k8ry5P: "x18b5jzi",
		kBCPoo: "x1gejf6u",
		$$css: true
	},
	dividerStart: {
		k2ei4v: "xpilrb4",
		kVhnKS: "x1t7ytsu",
		kGJrpR: "x1j92z86",
		$$css: true
	},
	collapseStart: {
		keTefX: "x1wim8z0",
		$$css: true
	},
	collapseEnd: {
		k71WvV: "x1kpg4um",
		$$css: true
	}
};
var dynamicStyles$8 = { sizing: (width) => [{
	kzqmXN: width != null ? "x5lhr3w" : width,
	$$css: true
}, { "--x-width": ((val) => typeof val === "number" ? val + "px" : val != null ? val : void 0)(width) }] };
/**
* Sidebar or side panel for Layout. Use in the `start` slot for left navigation
* or in the `end` slot for detail/inspector panels.
* Renders with optional divider and context-aware padding.
* Divider position is auto-detected based on which slot the panel is in.
*
* Already provides its own padding and scroll — don't add padding or
* overflow to children. Use `padding={0}` if you need edge-to-edge content.
*
* @example
* ```
* <LayoutContainer variant="card">
*   <Layout
*     start={
*       <LayoutPanel hasDivider role="navigation">
*         <Navigation />
*       </LayoutPanel>
*     }
*     content={<LayoutContent>Main content</LayoutContent>}
*     end={
*       <LayoutPanel hasDivider role="complementary">
*         <Sidebar />
*       </LayoutPanel>
*     }
*   />
* </LayoutContainer>
* ```
*/
function LayoutPanel({ children, hasDivider = false, isScrollable = true, label, padding, role, width, resizable, xstyle, className, style, ref, ...props$15 }) {
	const area = (0, import_react.use)(LayoutAreaContext);
	const { hasHeader, hasFooter } = (0, import_react.use)(LayoutSlotsContext);
	const effectiveWidth = resizable ? resizable._size : width;
	const isStartPanel = area === "start";
	const isEndPanel = area === "end";
	const isZeroPadding = padding === 0;
	const shouldCollapseSpacing = !hasDivider && !isZeroPadding && padding == null;
	const dividerStyle = isStartPanel ? styles$30.dividerEnd : isEndPanel ? styles$30.dividerStart : null;
	const collapseStyle = isStartPanel ? styles$30.collapseEnd : isEndPanel ? styles$30.collapseStart : null;
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
		ref,
		role,
		"aria-label": label,
		...mergeProps(themeProps("layout-panel"), props(styles$30.panel, dynamicStyles$8.sizing(effectiveWidth ?? null), isStartPanel && !isZeroPadding && padding == null && styles$30.startPanel, isEndPanel && !isZeroPadding && padding == null && styles$30.endPanel, !hasHeader && !isZeroPadding && padding == null && styles$30.noHeader, !hasFooter && !isZeroPadding && padding == null && styles$30.noFooter, isScrollable && styles$30.scrollable, isZeroPadding && styles$30.fullBleed, padding != null && paddingStyles[padding], padding != null && containerPaddingInlineVarStyles[padding], padding != null && containerPaddingBlockStartVarStyles[padding], padding != null && containerPaddingBlockEndVarStyles[padding], hasDivider && dividerStyle, shouldCollapseSpacing && collapseStyle, xstyle), className, style),
		...props$15,
		children
	});
}
LayoutPanel.displayName = "LayoutPanel";
//#endregion
//#region node_modules/@astryxdesign/core/dist/Layout/LayoutContent.js
/**
* @file LayoutContent.tsx
* @input Uses React StyleX, LayoutSlotsContext
* @output Exports LayoutContent component and LayoutContentProps
* @position Scrollable main content area for Layout. Wraps the primary body content
*   with automatic scroll containment and context-aware padding.
*
* SYNC: When modified, update these files to stay in sync:
* - /packages/core/src/Layout/Layout.doc.mjs
* - /apps/storybook/stories/Layout.stories.tsx
* - /packages/cli/assets/templates/blocks/components/Layout/ (showcase blocks)
*/
var styles$29 = {
	content: {
		kB7OPa: "x9f619",
		kZKoxP: "x5yr21d",
		kUk6DE: "x98rzlu",
		kAzted: "x2lwn1j",
		kVQacm: "x7giv3",
		kZCmMZ: "xwjyata",
		kwRFfy: "x1peupej",
		kLKAdn: "xqty4a x1ioh5az",
		kGO01o: "xg476vw xsg11nj",
		"--container-padding-inline-start": "x408pgh",
		"--container-padding-inline-end": "xikqloz",
		"--container-padding-block-start": "xjmgx01",
		"--container-padding-block-end": "xi9ns85",
		$$css: true
	},
	noStart: {
		kZCmMZ: "xaku5ci",
		"--container-padding-inline-start": "xt2a87w",
		"--container-padding-inline-end": "xhq06x6",
		$$css: true
	},
	noEnd: {
		kwRFfy: "x19eyx77",
		$$css: true
	},
	noHeader: {
		kLKAdn: "xuqi0w",
		"--container-padding-block-start": "x186o6qk",
		$$css: true
	},
	noFooter: {
		kGO01o: "x1363qu6",
		"--container-padding-block-end": "xfsxxt8",
		$$css: true
	},
	scrollable: {
		kVQacm: "xysyzu8",
		$$css: true
	},
	constrainedNoPanelsStart: {
		kZCmMZ: "xhlv5e7",
		$$css: true
	},
	constrainedNoPanelsEnd: {
		kwRFfy: "x1ahicqp",
		$$css: true
	},
	constrainedSingleStartPanel: {
		kwRFfy: "xy07wb4",
		$$css: true
	},
	constrainedSingleEndPanel: {
		kZCmMZ: "xxjme2g",
		$$css: true
	},
	fullBleed: {
		kZCmMZ: "x1c1uobl",
		kwRFfy: "xyri2b",
		kLKAdn: "xexx8yu",
		kGO01o: "x18d9i69",
		"--container-padding-inline-start": "xrhngw9",
		"--container-padding-inline-end": "xjsfl84",
		"--container-padding-block-start": "x1047aw6",
		"--container-padding-block-end": "xax9j7h",
		$$css: true
	}
};
/**
* Scrollable main content area for Layout. Wraps the primary body content
* with automatic scroll containment and context-aware padding.
*
* Already provides its own padding and scroll — don't add padding or overflow
* to children. Use `padding={0}` if you need edge-to-edge content.
*
* @example
* ```
* <LayoutContainer variant="card">
*   <Layout
*     header={<LayoutHeader>Title</LayoutHeader>}
*     content={<LayoutContent>Main body content</LayoutContent>}
*   />
* </LayoutContainer>
* <LayoutContainer variant="card">
*   <Layout
*     content={
*       <LayoutContent padding={0}>
*         <Table />
*       </LayoutContent>
*     }
*   />
* </LayoutContainer>
* <LayoutContainer variant="card">
*   <Layout
*     content={
*       <LayoutContent isScrollable={false}>
*         <StickyElement />
*       </LayoutContent>
*     }
*   />
* </LayoutContainer>
* ```
*/
function LayoutContent({ children, isScrollable = true, padding, label, role, xstyle, className, style, ref, ...props$14 }) {
	const { hasHeader, hasFooter, hasStart, hasEnd } = (0, import_react.use)(LayoutSlotsContext);
	const isZeroPadding = padding === 0;
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
		ref,
		role,
		"aria-label": label,
		...mergeProps(themeProps("layout-content"), props(styles$29.content, !hasStart && !isZeroPadding && padding == null && styles$29.noStart, !hasEnd && !isZeroPadding && padding == null && styles$29.noEnd, !hasHeader && !isZeroPadding && padding == null && styles$29.noHeader, !hasFooter && !isZeroPadding && padding == null && styles$29.noFooter, isScrollable && styles$29.scrollable, isZeroPadding && styles$29.fullBleed, padding != null && paddingStyles[padding], padding != null && containerPaddingInlineVarStyles[padding], padding != null && containerPaddingBlockStartVarStyles[padding], padding != null && containerPaddingBlockEndVarStyles[padding], !hasStart && !hasEnd && !isZeroPadding && styles$29.constrainedNoPanelsStart, !hasStart && !hasEnd && !isZeroPadding && styles$29.constrainedNoPanelsEnd, hasStart && !hasEnd && !isZeroPadding && styles$29.constrainedSingleStartPanel, !hasStart && hasEnd && !isZeroPadding && styles$29.constrainedSingleEndPanel, xstyle), className, style),
		...props$14,
		children
	});
}
LayoutContent.displayName = "LayoutContent";
//#endregion
//#region node_modules/@astryxdesign/core/dist/Icon/defaultIcons.js
/**
* @file defaultIcons.tsx
* @input Uses React JSX for inline SVGs
* @output Exports defaultIcons registry with lightweight SVG fallbacks
* @position Fallback icons used when no theme provides an icon registry
*
* These are intentionally minimal inline SVGs (~1.4KB total) that provide
* basic visual completeness without any external icon library dependency.
* Themes should override these with higher-quality icons from a proper
* icon library (heroicons, lucide, Material Symbols, etc.).
*
* All icons:
* - Use a 24x24 viewBox
* - Use currentColor for stroke/fill (inherits from parent)
* - Are aria-hidden (decorative by default)
* - Use stroke-based rendering with 1.5px stroke width (matching heroicons outline style)
* - Status icons (checkCircle, xCircle, warning, info) use solid fills for better color visibility
*
* SYNC: When modified, update these files to stay in sync:
* - /packages/core/src/Icon/globalIconRegistry.tsx (IconName type if names change)
* - /packages/core/src/Icon/Icon.doc.mjs (fallback icon documentation)
*/
var svgProps = {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: 1.5,
	strokeLinecap: "round",
	strokeLinejoin: "round",
	width: "1em",
	height: "1em",
	"aria-hidden": true
};
/**
* Props for solid/filled SVG icons.
* Status icons (checkCircle, xCircle, warning, info) use solid fills for better
* color visibility at small sizes, matching the heroicons solid style
* used by themes.
*/
var solidSvgProps = {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 24 24",
	fill: "currentColor",
	width: "1em",
	height: "1em",
	"aria-hidden": true
};
var defaultIcons = {
	/** ✕ — two diagonal lines */
	close: /*#__PURE__*/ (0, import_jsx_runtime.jsx)("svg", {
		...svgProps,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)("path", { d: "M6 6l12 12M6 18L18 6" })
	}),
	/** ▾ — downward chevron */
	chevronDown: /*#__PURE__*/ (0, import_jsx_runtime.jsx)("svg", {
		...svgProps,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)("path", { d: "M6 9l6 6 6-6" })
	}),
	/** ⌄ — compact NumberInput stepper chevron */
	"numberInput:stepperDown": /*#__PURE__*/ (0, import_jsx_runtime.jsx)("svg", {
		...svgProps,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)("path", { d: "M7.5 9.75l4.5 4.5 4.5-4.5" })
	}),
	/** ‹ — left chevron */
	chevronLeft: /*#__PURE__*/ (0, import_jsx_runtime.jsx)("svg", {
		...svgProps,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)("path", { d: "M15 6l-6 6 6 6" })
	}),
	/** › — right chevron */
	chevronRight: /*#__PURE__*/ (0, import_jsx_runtime.jsx)("svg", {
		...svgProps,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)("path", { d: "M9 6l6 6-6 6" })
	}),
	/** « — double left chevron (first / jump to start) */
	chevronsLeft: /*#__PURE__*/ (0, import_jsx_runtime.jsx)("svg", {
		...svgProps,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)("path", { d: "M18 6l-6 6 6 6M11 6l-6 6 6 6" })
	}),
	/** » — double right chevron (last / jump to end) */
	chevronsRight: /*#__PURE__*/ (0, import_jsx_runtime.jsx)("svg", {
		...svgProps,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)("path", { d: "M6 6l6 6-6 6M13 6l6 6-6 6" })
	}),
	/** ✓ — checkmark */
	check: /*#__PURE__*/ (0, import_jsx_runtime.jsx)("svg", {
		...svgProps,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)("path", { d: "M5 13l4 4L19 7" })
	}),
	/** ✓ in circle — success state (solid fill for status visibility) */
	success: /*#__PURE__*/ (0, import_jsx_runtime.jsx)("svg", {
		...solidSvgProps,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "M12 3a9 9 0 100 18 9 9 0 000-18zm4.06 6.56a.75.75 0 00-1.12-1l-3.94 4.4-1.94-1.94a.75.75 0 00-1.06 1.06l2.5 2.5a.75.75 0 001.09-.03l4.47-5z"
		})
	}),
	/** ✕ in circle — error state (solid fill for status visibility) */
	error: /*#__PURE__*/ (0, import_jsx_runtime.jsx)("svg", {
		...solidSvgProps,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "M12 3a9 9 0 100 18 9 9 0 000-18zm-2.47 5.47a.75.75 0 00-1.06 1.06L10.94 12l-2.47 2.47a.75.75 0 101.06 1.06L12 13.06l2.47 2.47a.75.75 0 101.06-1.06L13.06 12l2.47-2.47a.75.75 0 00-1.06-1.06L12 10.94l-2.47-2.47z"
		})
	}),
	/** △ with ! — warning (solid fill for status visibility) */
	warning: /*#__PURE__*/ (0, import_jsx_runtime.jsx)("svg", {
		...solidSvgProps,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "M10.29 3.86L2.07 19.05A2 2 0 003.78 22h16.44a2 2 0 001.71-2.95L13.71 3.86a2 2 0 00-3.42 0zM12 9a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0112 9zm0 9a1 1 0 100-2 1 1 0 000 2z"
		})
	}),
	/** ⓘ — information (solid fill for status visibility) */
	info: /*#__PURE__*/ (0, import_jsx_runtime.jsx)("svg", {
		...solidSvgProps,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "M12 3a9 9 0 100 18 9 9 0 000-18zm0 4a1 1 0 100 2 1 1 0 000-2zm-.75 3.75a.75.75 0 011.5 0v5.5a.75.75 0 01-1.5 0v-5.5z"
		})
	}),
	/** 📅 — calendar */
	calendar: /*#__PURE__*/ (0, import_jsx_runtime.jsxs)("svg", {
		...svgProps,
		children: [/*#__PURE__*/ (0, import_jsx_runtime.jsx)("rect", {
			x: "3",
			y: "4",
			width: "18",
			height: "18",
			rx: "2"
		}), /*#__PURE__*/ (0, import_jsx_runtime.jsx)("path", { d: "M16 2v4M8 2v4M3 10h18" })]
	}),
	/** 🕐 — clock */
	clock: /*#__PURE__*/ (0, import_jsx_runtime.jsxs)("svg", {
		...svgProps,
		children: [/*#__PURE__*/ (0, import_jsx_runtime.jsx)("circle", {
			cx: "12",
			cy: "12",
			r: "9"
		}), /*#__PURE__*/ (0, import_jsx_runtime.jsx)("path", { d: "M12 7v5l3 3" })]
	}),
	/** ↗ — external link arrow */
	externalLink: /*#__PURE__*/ (0, import_jsx_runtime.jsxs)("svg", {
		...svgProps,
		children: [
			/*#__PURE__*/ (0, import_jsx_runtime.jsx)("path", { d: "M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" }),
			/*#__PURE__*/ (0, import_jsx_runtime.jsx)("path", { d: "M15 3h6v6" }),
			/*#__PURE__*/ (0, import_jsx_runtime.jsx)("path", { d: "M10 14L21 3" })
		]
	}),
	/** ☰ — hamburger menu (three horizontal lines) */
	menu: /*#__PURE__*/ (0, import_jsx_runtime.jsx)("svg", {
		...svgProps,
		strokeWidth: 2,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)("path", { d: "M4 6h16M4 12h16M4 18h16" })
	}),
	/** ⋯ — three horizontal dots (more/overflow) */
	moreHorizontal: /*#__PURE__*/ (0, import_jsx_runtime.jsxs)("svg", {
		...solidSvgProps,
		children: [
			/*#__PURE__*/ (0, import_jsx_runtime.jsx)("circle", {
				cx: "5",
				cy: "12",
				r: "1.5"
			}),
			/*#__PURE__*/ (0, import_jsx_runtime.jsx)("circle", {
				cx: "12",
				cy: "12",
				r: "1.5"
			}),
			/*#__PURE__*/ (0, import_jsx_runtime.jsx)("circle", {
				cx: "19",
				cy: "12",
				r: "1.5"
			})
		]
	}),
	/** 🔍 — magnifying glass (search) */
	search: /*#__PURE__*/ (0, import_jsx_runtime.jsxs)("svg", {
		...svgProps,
		children: [/*#__PURE__*/ (0, import_jsx_runtime.jsx)("circle", {
			cx: "11",
			cy: "11",
			r: "8"
		}), /*#__PURE__*/ (0, import_jsx_runtime.jsx)("path", { d: "M21 21l-4.35-4.35" })]
	}),
	/** ⇧ — upload into a tray */
	upload: /*#__PURE__*/ (0, import_jsx_runtime.jsx)("svg", {
		...svgProps,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)("path", { d: "M12 16V4m0 0L7 9m5-5l5 5M4 15v4a2 2 0 002 2h12a2 2 0 002-2v-4" })
	}),
	/** ↑ — arrow up (sort ascending) */
	arrowUp: /*#__PURE__*/ (0, import_jsx_runtime.jsx)("svg", {
		...svgProps,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)("path", { d: "M12 19V5m0 0l-7 7m7-7l7 7" })
	}),
	/** ↓ — arrow down (sort descending) */
	arrowDown: /*#__PURE__*/ (0, import_jsx_runtime.jsx)("svg", {
		...svgProps,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)("path", { d: "M12 5v14m0 0l7-7m-7 7l-7-7" })
	}),
	/** ↕ — arrows up-down (unsorted / sortable indicator) */
	arrowsUpDown: /*#__PURE__*/ (0, import_jsx_runtime.jsx)("svg", {
		...svgProps,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)("path", { d: "M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" })
	}),
	/** 🔽 — funnel (filter indicator) */
	funnel: /*#__PURE__*/ (0, import_jsx_runtime.jsx)("svg", {
		...svgProps,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)("path", { d: "M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" })
	}),
	/** 👁‍🗨 — eye with slash (hidden column) */
	eyeSlash: /*#__PURE__*/ (0, import_jsx_runtime.jsx)("svg", {
		...svgProps,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)("path", { d: "M3.98 8.223A10.477 10.477 0 001.934 12c1.292 4.338 5.31 7.5 10.066 7.5.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" })
	}),
	/** ☐☐ — view columns (column settings) */
	viewColumns: /*#__PURE__*/ (0, import_jsx_runtime.jsx)("svg", {
		...svgProps,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)("path", { d: "M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125z" })
	}),
	/** clipboard — copy to clipboard */
	copy: /*#__PURE__*/ (0, import_jsx_runtime.jsxs)("svg", {
		...svgProps,
		children: [/*#__PURE__*/ (0, import_jsx_runtime.jsx)("path", { d: "M8 4v12a2 2 0 002 2h8a2 2 0 002-2V7.242a2 2 0 00-.602-1.43L16.083 2.57A2 2 0 0014.685 2H10a2 2 0 00-2 2z" }), /*#__PURE__*/ (0, import_jsx_runtime.jsx)("path", { d: "M16 18v2a2 2 0 01-2 2H6a2 2 0 01-2-2V9a2 2 0 012-2h2" })]
	}),
	/** ✓✓ — double checkmark (delivered/read) */
	checkDouble: /*#__PURE__*/ (0, import_jsx_runtime.jsxs)("svg", {
		...svgProps,
		children: [/*#__PURE__*/ (0, import_jsx_runtime.jsx)("path", { d: "M2 13l4 4L14 7" }), /*#__PURE__*/ (0, import_jsx_runtime.jsx)("path", { d: "M9 13l4 4L21 7" })]
	}),
	wrench: /*#__PURE__*/ (0, import_jsx_runtime.jsx)("svg", {
		...svgProps,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)("path", { d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" })
	}),
	/** ■ — stop (rounded square, solid fill for media control) */
	stop: /*#__PURE__*/ (0, import_jsx_runtime.jsx)("svg", {
		...solidSvgProps,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)("rect", {
			x: "6",
			y: "6",
			width: "12",
			height: "12",
			rx: "2"
		})
	}),
	/** 🎤 — microphone (voice input / dictation) */
	microphone: /*#__PURE__*/ (0, import_jsx_runtime.jsxs)("svg", {
		...svgProps,
		children: [
			/*#__PURE__*/ (0, import_jsx_runtime.jsx)("path", { d: "M12 2a3 3 0 00-3 3v6a3 3 0 006 0V5a3 3 0 00-3-3z" }),
			/*#__PURE__*/ (0, import_jsx_runtime.jsx)("path", { d: "M19 10v1a7 7 0 01-14 0v-1" }),
			/*#__PURE__*/ (0, import_jsx_runtime.jsx)("path", { d: "M12 18v4m-4 0h8" })
		]
	})
};
//#endregion
//#region node_modules/@astryxdesign/core/dist/Icon/globalIconRegistry.js
/**
* @file globalIconRegistry.tsx
* @input None (pure module-level state)
* @output Exports registerIcons, getIconRegistry, getIcon, resetIcons, IconName, IconRegistry
* @position Global and theme-scoped icon registry; works in server and client environments
*
* This module has NO 'use client' directive — it's importable from RSC.
* Components resolve semantic icons through getIcon() or the client useIcon() hook.
*/
/**
* Semantic icon names used internally by Astryx components.
*
* These represent the functional purpose of each icon, not a specific
* visual representation. Themes provide the actual icon components.
*/
/**
* A namespaced extension key, `'<namespace>:<name>'`.
*
* This is the tier for a glyph that belongs to one component or library rather
* than to the system: `'richtext:bold'`, `'numberInput:stepperDown'`. A theme
* overrides it by key through `registerIcons` or `defineTheme({icons})`,
* exactly as it overrides a built-in name, and the core {@link IconName} union
* stays reserved for glyphs the whole system shares.
*
* Accepted anywhere a built-in name is, including `<Icon icon>` — which is
* what lets a namespaced glyph keep `size`, `color` and `xstyle`.
*/
/**
* A semantic icon name — either one of the built-in {@link IconName}s or an
* arbitrary string key contributed by a library/app.
*
* The `(string & {})` intersection keeps the built-in names available for
* autocomplete while still allowing any string, so downstream libraries can
* register and resolve their own keys (e.g. `'richtext:bold'`) without having
* to widen the core `IconName` union.
*/
/**
* A complete icon registry: every semantic name mapped to a React node.
*/
var globalRegistry = {};
function getThemeIconOverrides(source) {
	if (source == null) return null;
	if (typeof source === "string") return getRegisteredTheme(source)?.icons ?? null;
	return source.icons ?? null;
}
/**
* Get an icon by name from the global registry, falling back to defaults.
*
* Works in both server and client environments.
* Falls back to built-in default icons when no override is registered.
*
* Accepts extension keys (any string) in addition to the built-in
* {@link IconName}s — useful for library-contributed icons. For a
* caller-supplied fallback when a key isn't registered, use
* {@link getExtendedIcon}.
*/
function getIcon(name, source) {
	return getThemeIconOverrides(source)?.[name] ?? globalRegistry[name] ?? defaultIcons[name];
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/Icon/Icon.js
/**
* @file Icon.tsx
* @input Uses ReactSVGProps, icon components or semantic icon names
* @output Exports Icon component, IconProps, IconColor, IconSize, IconType types
* @position Core implementation; consumed by index.ts, tested by Icon.test.tsx
*
* Supports two modes:
* - Component mode: Pass an SVG icon component (e.g. from @heroicons/react) — rendered
*   directly with and spread SVG props.
* - String mode: Pass a semantic name (e.g. 'close', 'chevronDown') — resolved from the
*   theme's icon registry (or built-in fallback SVGs) and wrapped in a styled span.
*
* SYNC: When modified, update these files to stay in sync:
* - /packages/core/src/Icon/Icon.doc.mjs (props table, features, implementation notes)
* - /packages/core/src/Icon/Icon.test.tsx (tests for new/changed behavior)
* - /packages/core/src/Icon/index.ts (exports if types change)
* - /apps/storybook/stories/Icon.stories.tsx (storybook stories)
* - /packages/cli/assets/templates/blocks/components/Icon/ (showcase blocks)
*/
var styles$28 = {
	root: {
		kmuXW: "x2lah0s",
		$$css: true
	},
	span: {
		k1xSpc: "x3nfvp2",
		kGNEyG: "x6s0dn4",
		kjj79g: "xl56j7k",
		kmuXW: "x2lah0s",
		$$css: true
	}
};
var colorStyles$1 = {
	primary: {
		kMwMTN: "xtbr613",
		$$css: true
	},
	secondary: {
		kMwMTN: "xv9yike",
		$$css: true
	},
	tertiary: {
		kMwMTN: "xv9yike",
		$$css: true
	},
	disabled: {
		kMwMTN: "xqa6c3m",
		$$css: true
	},
	accent: {
		kMwMTN: "xqwr325",
		$$css: true
	},
	success: {
		kMwMTN: "xtjic6",
		$$css: true
	},
	error: {
		kMwMTN: "xjt36v0",
		$$css: true
	},
	warning: {
		kMwMTN: "xs3pv69",
		$$css: true
	},
	inherit: {
		kMwMTN: "x1heor9g",
		$$css: true
	},
	blue: {
		kMwMTN: "x1fns2mt",
		$$css: true
	},
	red: {
		kMwMTN: "xeffzf7",
		$$css: true
	},
	green: {
		kMwMTN: "xmxeech",
		$$css: true
	},
	gray: {
		kMwMTN: "x1eyinzz",
		$$css: true
	},
	cyan: {
		kMwMTN: "x157w0xa",
		$$css: true
	},
	teal: {
		kMwMTN: "x1f3zxcb",
		$$css: true
	},
	yellow: {
		kMwMTN: "x1g6zdft",
		$$css: true
	},
	orange: {
		kMwMTN: "xxu74a4",
		$$css: true
	},
	pink: {
		kMwMTN: "x1kxxfg5",
		$$css: true
	},
	purple: {
		kMwMTN: "xzdw94u",
		$$css: true
	}
};
/**
* Type for icon components that can be passed to Icon.
* Use this type when accepting an icon prop in other components.
*/
/**
* Props for Icon component.
* Extends SVGProps to allow passing additional SVG attributes (used when icon is a component).
*/
/**
* Derives the ARIA attributes for an icon from its `label` prop.
*
* - Non-empty `label` → meaningful image: `role="img"` + `aria-label`, and no
*   `aria-hidden` (an `aria-hidden` element is removed from the accessibility
*   tree, so its accessible name would be ignored).
* - Omitted or empty `label` → decorative default: `aria-hidden="true"`.
*
* The result is spread BEFORE `{...props}` in both render modes so an explicit
* `aria-hidden` / `role` / `aria-label` from the consumer always wins.
*/
function getIconA11yProps(label) {
	return label != null && label !== "" ? {
		role: "img",
		"aria-label": label
	} : { "aria-hidden": "true" };
}
/**
* Renders an icon from the icon registry or a custom SVG component.
*
* @example
* ```
* <Icon icon="close" size="md" color="primary" />
* ```
*/
function Icon({ icon, color = "inherit", size: sizeProp, label, ref, className, style, xstyle, ...props$13 }) {
	const size = useIconSize(sizeProp);
	const a11yProps = getIconA11yProps(label);
	if (typeof icon === "string") return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(IconFromRegistry, {
		name: icon,
		color,
		size,
		a11yProps,
		className,
		style,
		xstyle,
		spanProps: props$13
	});
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(icon, {
		ref,
		...a11yProps,
		...mergeProps(themeProps("icon", {
			size,
			color
		}), props(styles$28.root, colorStyles$1[color], iconSizeStyles[size], xstyle), className ?? void 0, style),
		...props$13
	});
}
Icon.displayName = "Icon";
/**
* Internal component that resolves a semantic icon name from the registry
* and renders it in a styled span with proper sizing.
*
* Extracted as a separate component so getIcon is only called
* when the icon prop is a string.
*/
function IconFromRegistry({ name, color, size, a11yProps, className, style, xstyle, spanProps }) {
	const resolvedIcon = getIcon(name, useThemeName());
	if (resolvedIcon == null) return null;
	const restSpanProps = spanProps ?? {};
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)("span", {
		...a11yProps,
		...restSpanProps,
		...mergeProps(themeProps("icon", {
			size,
			color
		}), props(styles$28.span, colorStyles$1[color], iconBoxSizeStyles[size], xstyle), className ?? void 0, style),
		children: resolvedIcon
	});
}
/**
* Renders an icon slot value. Handles semantic names, ReactNode values, and
* component types:
* - If the value is a semantic icon name string, wraps it in Icon.
* - If the value is a component (function or forwardRef object), wraps it in Icon.
* - Otherwise, renders the ReactNode directly.
*/
function renderIconSlot(icon, props) {
	if (typeof icon === "string") return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Icon, {
		icon,
		...props
	});
	if (typeof icon === "function" || typeof icon === "object" && icon !== null && "render" in icon) return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Icon, {
		icon,
		...props
	});
	return icon;
}
var AppShellMobileContext = /*#__PURE__*/ (0, import_react.createContext)({
	isMobile: false,
	isMobileNavOpen: false,
	toggleMobileNav: () => {},
	openMobileNav: () => {},
	closeMobileNav: () => {},
	isMobileNavEnabled: false,
	hasAutoToggle: true
});
AppShellMobileContext.displayName = "AppShellMobileContext";
/**
* Hook to access mobile nav state from anywhere in the AppShell tree.
*/
function useAppShellMobile() {
	return (0, import_react.use)(AppShellMobileContext);
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/MobileNav/MobileNavToggle.js
/**
* @file MobileNavToggle.tsx
* @input Uses React, Button, Icon, AppShell mobile context
* @output Exports MobileNavToggle component
* @position Standalone toggle button; can be placed anywhere in the AppShell tree.
*
* Hamburger button that opens/closes the mobile nav drawer.
* Reads from AppShell mobile context — renders nothing above the mobile breakpoint.
* Can be placed anywhere in the component tree (TopNav, content area, custom toolbar, etc.).
*/
/**
* Mobile nav toggle button. Reads from AppShell context to open/close
* the mobile navigation drawer.
*
* Renders nothing when above the mobile breakpoint — safe to include
* unconditionally in your layout.
*
* @example
* ```
* <div className="my-toolbar">
*   <MobileNavToggle />
*   <h1>Page Title</h1>
* </div>
* <MobileNavToggle label="Menu">
*   <MyCustomMenuIcon />
* </MobileNavToggle>
* ```
*/
function MobileNavToggle({ ref, children, label: labelFromProps, "data-testid": testId, xstyle, className, style }) {
	const t = useTranslator();
	const label = labelFromProps ?? t("@astryx.mobileNav.toggle.open");
	const { isMobile, isMobileNavEnabled, isMobileNavOpen, mobileNavId, toggleMobileNav } = useAppShellMobile();
	if (!isMobile || !isMobileNavEnabled) return null;
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Button, {
		ref,
		variant: "ghost",
		label,
		icon: children ?? /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Icon, {
			icon: "menu",
			color: "inherit"
		}),
		onClick: toggleMobileNav,
		"aria-expanded": isMobileNavOpen,
		"aria-controls": mobileNavId || void 0,
		"data-testid": testId ?? "mobile-nav-toggle",
		xstyle,
		className,
		style,
		isIconOnly: true
	});
}
MobileNavToggle.displayName = "MobileNavToggle";
//#endregion
//#region node_modules/@astryxdesign/core/dist/hooks/scrollbarGutter.js
/**
* @file scrollbarGutter.ts
* @input The element a scroll lock pins, plus live layout measurements
* @output Exports holdScrollbarGutter and the ScrollbarGutterHold it returns
* @position Internal hook utility; used by useScrollLock and MobileNav so that
*   locking background scroll does not resize the layout viewport.
*
* Locking scroll hides the document's scrollbar. Where that scrollbar is a
* classic (space-taking) one — Windows/Linux desktop, and macOS set to
* "Always" show scroll bars — hiding it widens the layout viewport by the
* scrollbar's width and the whole page jumps sideways behind the overlay.
*
* The fix is `scrollbar-gutter: stable`, which holds the gutter open once the
* scrollbar goes away. Being a real layout change it holds `position: fixed`
* chrome (sticky headers, toast viewports) as well as in-flow content, which
* padding fundamentally cannot: fixed elements resolve against the viewport,
* not against the padded element.
*
* Padding is kept only as a fallback for engines without `scrollbar-gutter`
* (Safari shipped it in 18.2), and it is applied by measuring whether the
* element actually moved rather than by assuming it did.
*/
var NOOP = {
	settle() {},
	release() {}
};
/**
* Keeps `element`'s content box the width it is right now, across a scroll
* lock that is about to hide the document's scrollbar.
*
* Call it *before* applying the lock's styles, then {@link
* ScrollbarGutterHold.settle} immediately after, and {@link
* ScrollbarGutterHold.release} on unlock:
*
* ```
* const hold = holdScrollbarGutter(document.body);
* body.style.position = 'fixed';
* hold.settle();
* ```
*
* Overlay scrollbars (mobile, default macOS) take no layout space, so there is
* nothing to hold and nothing is touched.
*/
function holdScrollbarGutter(element) {
	if (typeof window === "undefined" || typeof document === "undefined") return NOOP;
	const root = document.documentElement;
	const viewportWidth = root.clientWidth;
	if (viewportWidth === 0) return NOOP;
	const previousGutter = root.style.scrollbarGutter;
	const previousPadding = element.style.paddingRight;
	const widthBefore = element.getBoundingClientRect().width;
	let heldGutter = false;
	let padded = false;
	let settled = false;
	if (window.innerWidth > viewportWidth) {
		root.style.scrollbarGutter = "stable";
		heldGutter = true;
	}
	return {
		settle() {
			if (settled) return;
			settled = true;
			const grew = element.getBoundingClientRect().width - widthBefore;
			if (grew <= 0) return;
			const existing = Number.parseFloat(window.getComputedStyle(element).paddingRight) || 0;
			element.style.paddingRight = `${existing + grew}px`;
			padded = true;
		},
		release() {
			if (padded) {
				element.style.paddingRight = previousPadding;
				padded = false;
			}
			if (heldGutter) {
				root.style.scrollbarGutter = previousGutter;
				heldGutter = false;
			}
		}
	};
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/MobileNav/MobileNav.js
/**
* @file MobileNav.tsx
* @input Uses React, useEffect, useRef, useCallback, ReactNode, StyleX
* @output Exports MobileNav component and MobileNavProps
* @position Core implementation; consumed by index.ts
*
* Full-height slide-out drawer overlay for mobile navigation.
* The mobile counterpart to SideNav — accepts the same children
* (SideNavSection, SideNavItem, or any ReactNode).
*
* Uses the native `<dialog>` element with `showModal()` for top-layer rendering.
* This eliminates z-index stacking issues — the drawer renders above everything
* without manual z-index management. The browser provides:
* - Top layer promotion (no z-index needed)
* - `::backdrop` pseudo-element
* - Body scroll lock
* - Focus trapping
*
* Escape is owned by the shared dismissal stack (`useLayerDismissal`), so a
* drawer opened over another layer takes the press and nothing behind it
* closes. The native `cancel` event still handles the dismissals the browser
* starts itself, such as the Android back gesture.
*
* Focus RESTORATION is not delegated to the browser. The drawer captures the
* element that opened it and refocuses it once the native dialog has closed,
* mirroring Dialog: the implicit `<dialog>` restore has been observed dropping
* focus to `<body>`. The close itself is deferred past the slide-out, and the
* restore has to follow it. Until close() runs the rest of the document is
* inert and focus() on the opener is silently dropped.
*
* SYNC: When modified, update these files to stay in sync:
* - /packages/core/src/MobileNav/index.ts (exports if types change)
* - /packages/core/src/Layer/useLayerDismissal.ts (dismissal stack)
* - /packages/core/src/hooks/scrollbarGutter.ts (shared scroll-lock gutter)
* - /packages/cli/assets/templates/blocks/components/MobileNav/ (showcase blocks)
*/
var styles$27 = {
	dialog: {
		kVAEAm: "xixxii4",
		kogj98: "x1ghz6dp",
		kmVPX3: "x1717udv",
		kMzoRj: "xc342km",
		ksu8eU: "xng3xce",
		ks0D6T: "x1x1rfll",
		kskxy: "x7ab17h",
		kpwlN0: "x10a8y8t",
		kzqmXN: "xn9wirt",
		kZKoxP: "xtdtrs8",
		kWkggS: "xjbqb8w",
		kVQacm: "x7giv3",
		kZeWKH: "xish69e",
		kFalU9: "x1j4r261",
		kI3sdo: "x1a2a7pz",
		k1xSpc: "x1s85apg",
		k1ekBW: "xrgi2yo",
		kIyJzY: "x80gvsz",
		kzIqYQ: "xd00j3c",
		$$css: true
	},
	open: {
		k1xSpc: "x78zum5",
		$$css: true
	},
	backdrop: {
		kGyWv1: "xnixb3f",
		kba3nw: "x1abwkk1",
		k5sjJv: "xph5o2a",
		kND0Po: "x167zut7",
		k9an0g: "xft5bk6",
		kb4ib: "x15h3t91",
		kA5Tbj: "x1viac0w",
		$$css: true
	},
	backdropOpen: {
		k5sjJv: "xb3n6bw xxiuuzi",
		$$css: true
	},
	drawer: {
		kVAEAm: "x10l6tqk",
		k87sOh: "x13vifvy",
		krVfgx: "x1ey2m1c",
		k1xSpc: "x78zum5",
		kXwgrk: "xdt5ytf",
		kWkggS: "x10xzikg",
		kB7OPa: "x9f619",
		kVQacm: "xb3r6kr",
		k1ekBW: "x11xpdln",
		kIyJzY: "x80gvsz",
		kAMwcw: "xlr8y92",
		kI3sdo: "x1a2a7pz",
		k6CgDc: "xzg1mie",
		$$css: true
	},
	drawerStart: {
		kLqNvP: "x1o0tod",
		ke9TFa: "xw8tdv1",
		k8ry5P: "x18b5jzi",
		kBCPoo: "x1gejf6u",
		k3aq6I: "x5i6ehr xttggg",
		$$css: true
	},
	drawerStartOpen: {
		k3aq6I: "xbryuvx x6mt36l x14gflnl",
		$$css: true
	},
	drawerEnd: {
		kt4wiu: "xtijo5x",
		k2ei4v: "xgbv0en",
		kVhnKS: "x1t7ytsu",
		kGJrpR: "x1j92z86",
		k3aq6I: "xumwmo6 x1df3fe5",
		$$css: true
	},
	drawerEndOpen: {
		k3aq6I: "xbryuvx x1yqmsfc x1lymnkk",
		$$css: true
	},
	headerText: {
		keTefX: "x11g1kdw",
		$$css: true
	}
};
var _temp$5 = {
	kzqmXN: "xn9wirt",
	ks0D6T: "xf68679",
	"$$css": true
};
var dynamicStyles$7 = { width: (w) => [_temp$5, { "--x-maxWidth": ((val) => typeof val === "number" ? val + "px" : val != null ? val : void 0)(`${w}px`) }] };
/** Fraction of the hold to close at, so the close never lands on its boundary. */
var CLOSE_WITHIN_HOLD = .6;
/**
* Shortest duration in a `transition-duration` list, in ms; null if unreadable.
*
* Browsers serialise computed `<time>` values in seconds — an authored `410ms`
* reads back as `"0.41s"` and a list as `"0.41s, 0.12s"` — so the seconds branch
* is the one that runs outside tests. jsdom echoes an inline `250ms` back as-is
* and never resolves `var()`, so both units and the unreadable case are covered
* directly in MobileNavCloseTiming.test.ts rather than through the component.
*
* @internal Exported for unit tests.
*/
function parseShortestDurationMs(value) {
	const durations = value.split(",").map((part) => {
		const trimmed = part.trim();
		const ms = Number.parseFloat(trimmed);
		if (!Number.isFinite(ms)) return null;
		return trimmed.endsWith("ms") ? ms : trimmed.endsWith("s") ? ms * 1e3 : null;
	}).filter((ms) => ms !== null);
	return durations.length ? Math.min(...durations) : null;
}
/**
* How long to wait before closing the native dialog.
*
* The drawer is only rendered for as long as its `display` transition runs, and
* closing an unrendered modal dialog is what leaves the page inert (#4290). So
* the close has to land inside that hold. The hold is `--duration-medium`,
* which themes rewrite — the shipped y2k theme sets it to exactly 250ms — so
* read the hold in effect rather than assuming it.
*/
function resolveCloseDelay(dialog) {
	const cap = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 250;
	const hold = parseShortestDurationMs(window.getComputedStyle(dialog).transitionDuration);
	if (hold === null) return cap;
	return hold <= 0 ? 0 : Math.min(cap, hold * CLOSE_WITHIN_HOLD);
}
/**
* Close the native dialog, then return focus to the element that opened it.
*
* Browsers are supposed to restore focus themselves when a modal <dialog>
* closes, but that has been observed to fail (focus lands on <body>), so the
* drawer does it explicitly, as Dialog does. The order is load-bearing: while
* the modal dialog holds the top layer the rest of the document is inert and
* focus() on the opener is silently dropped. So the restore rides on the close
* itself, wherever that happens (the delayed timer, or the unmount teardown),
* not on the `isOpen` flip that only schedules it.
*
* Focus is left alone when there was no real opener (activeElement was <body>)
* or the opener has since left the DOM: focusing <body> would blur whatever a
* router moved focus to, and a detached node cannot take focus.
*/
function closeAndRestoreFocus(dialog, openerRef) {
	dialog.close();
	const opener = openerRef.current;
	openerRef.current = null;
	if (!opener || opener === document.body || !opener.isConnected) return;
	opener.focus();
}
/**
* A slide-out drawer overlay for mobile navigation.
*
* The mobile counterpart to SideNav. Renders a full-height drawer that slides
* in from the start (left in LTR) or end (right in LTR) edge of the viewport,
* with a semi-transparent backdrop behind it.
*
* Uses the native `<dialog>` element with `showModal()` for top-layer rendering,
* which provides built-in focus trapping, body scroll lock, and `::backdrop`.
* No manual z-index needed — the browser's top layer handles stacking.
*
* When used inside AppShell, `isOpen` and `onOpenChange` are managed
* automatically via context. When used standalone, provide them as props.
*
* @example
* ```
* <AppShell mobileNav={
*   <MobileNav header="Navigation">
*     <SideNavItem label="Home" href="/" />
*   </MobileNav>
* }>
* <MobileNav isOpen={isOpen} onOpenChange={setIsOpen} header="Navigation">
*   <SideNavItem label="Home" href="/" />
* </MobileNav>
* ```
*/
function MobileNav({ isOpen: isOpenProp, onOpenChange: onOpenChangeProp, children, header, width = 320, side = "auto", label, "data-testid": testId, xstyle, className, style, onClick: onClickProp, ref, ...rest }) {
	const t = useTranslator();
	const appShellMobile = useAppShellMobile();
	const isOpen = isOpenProp ?? appShellMobile.isMobileNavOpen;
	const fallbackId = (0, import_react.useId)();
	const dialogId = appShellMobile.mobileNavId || fallbackId;
	const onOpenChange = (0, import_react.useMemo)(() => onOpenChangeProp ?? ((open) => {
		if (open) appShellMobile.openMobileNav();
		else appShellMobile.closeMobileNav();
	}), [onOpenChangeProp, appShellMobile]);
	const dialogRef = (0, import_react.useRef)(null);
	const closeTimeoutRef = (0, import_react.useRef)(null);
	const triggerElementRef = (0, import_react.useRef)(null);
	const [isCloseHeld, setIsCloseHeld] = (0, import_react.useState)(false);
	const [wasOpen, setWasOpen] = (0, import_react.useState)(isOpen);
	if (wasOpen !== isOpen) {
		setWasOpen(isOpen);
		setIsCloseHeld(!isOpen);
	}
	const gutterRef = (0, import_react.useRef)(null);
	const releaseGutter = (0, import_react.useCallback)(() => {
		if (gutterRef.current) {
			gutterRef.current.release();
			gutterRef.current = null;
		}
	}, []);
	const [resolvedSide, setResolvedSide] = (0, import_react.useState)(side === "auto" ? "end" : side);
	(0, import_react.useEffect)(() => {
		if (!isOpen) return;
		if (side === "auto") {
			const trigger = document.activeElement;
			if (trigger && trigger !== document.body) {
				const rect = trigger.getBoundingClientRect();
				const triggerCenter = rect.left + rect.width / 2;
				setResolvedSide(triggerCenter < window.innerWidth / 2 ? "start" : "end");
			}
		} else setResolvedSide(side);
	}, [isOpen, side]);
	(0, import_react.useEffect)(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;
		if (isOpen) {
			gutterRef.current ??= holdScrollbarGutter(document.documentElement);
			if (!dialog.open) {
				triggerElementRef.current = document.activeElement;
				dialog.showModal();
			}
			document.documentElement.style.overflow = "clip";
			gutterRef.current.settle();
		} else if (dialog.open) {
			document.documentElement.style.overflow = "";
			releaseGutter();
			closeTimeoutRef.current = setTimeout(() => {
				closeAndRestoreFocus(dialog, triggerElementRef);
				setIsCloseHeld(false);
			}, resolveCloseDelay(dialog));
		} else setIsCloseHeld(false);
		return () => {
			if (closeTimeoutRef.current) {
				clearTimeout(closeTimeoutRef.current);
				closeTimeoutRef.current = null;
			}
			document.documentElement.style.overflow = "";
			releaseGutter();
		};
	}, [isOpen, releaseGutter]);
	(0, import_react.useEffect)(() => {
		const dialog = dialogRef.current;
		return () => {
			if (dialog?.open) closeAndRestoreFocus(dialog, triggerElementRef);
		};
	}, []);
	const { shouldDismissOnCloseRequest } = useLayerDismissal({
		isActive: isOpen,
		onDismiss: () => onOpenChange(false)
	});
	const handleCancel = (0, import_react.useCallback)((event) => {
		event.preventDefault();
		if (!shouldDismissOnCloseRequest()) return;
		onOpenChange(false);
	}, [onOpenChange, shouldDismissOnCloseRequest]);
	const handleDialogClick = (0, import_react.useCallback)((event) => {
		if (event.target === event.currentTarget) onOpenChange(false);
	}, [onOpenChange]);
	const isStart = resolvedSide === "start";
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)("dialog", {
		ref: useMergedRefs(ref, dialogRef),
		id: dialogId,
		...mergeProps(themeProps("mobile-nav", { side: resolvedSide }), props(layerTextReset.reset, layerStructureReset.reset, styles$27.dialog, overlayPaddingReset.reset, (isOpen || isCloseHeld) && styles$27.open, styles$27.backdrop, isOpen && styles$27.backdropOpen, xstyle), className, style),
		...rest,
		"data-testid": testId,
		"aria-label": label ?? (typeof header === "string" ? header : t("@astryx.mobileNav.navigation")),
		onClick: composeEventHandlers(onClickProp, handleDialogClick),
		onCancel: handleCancel,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(LayerDepthProvider, { children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(LayerContentBoundary, { children: /*#__PURE__*/ (0, import_jsx_runtime.jsxs)("div", {
			tabIndex: -1,
			...props(styles$27.drawer, dynamicStyles$7.width(width), isStart && styles$27.drawerStart, isStart && isOpen && styles$27.drawerStartOpen, !isStart && styles$27.drawerEnd, !isStart && isOpen && styles$27.drawerEndOpen),
			children: [/*#__PURE__*/ (0, import_jsx_runtime.jsxs)("div", {
				...{
					0: { className: "x78zum5 x6s0dn4 x1qughib x1k15mir xf314gf x2lah0s x92x3c3 x1q0q8m5 xw8gpjh" },
					1: { className: "x78zum5 x6s0dn4 x1k15mir xf314gf x2lah0s x92x3c3 x1q0q8m5 xw8gpjh x13a6bvl" }
				}[!!!header << 0],
				children: [typeof header === "string" ? /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Heading, {
					level: 2,
					xstyle: styles$27.headerText,
					children: header
				}) : header ?? null, /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					label: t("@astryx.mobileNav.closeNavigation"),
					icon: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Icon, {
						icon: "close",
						color: "inherit"
					}),
					onClick: () => onOpenChange(false),
					isIconOnly: true
				})]
			}), /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
				className: "x98rzlu x1odjw0f x6ikm8r xish69e xge0x1e xf314gf xce4md1",
				children
			})]
		}) }) })
	});
}
MobileNav.displayName = "MobileNav";
//#endregion
//#region node_modules/@astryxdesign/core/dist/SideNav/SideNavRenderContext.js
/**
* @file SideNavRenderContext.ts
* @input React createContext, use
* @output Exports SideNavRenderContext and useSideNavRenderMode hook
* @position Internal context for controlling SideNav rendering mode
*
* When AppShell renders the SideNav in multiple locations (inline, top bar,
* mobile drawer), this context tells SideNav which parts to render:
* - 'default': full sidebar (desktop inline)
* - 'topbar': heading + footerIcons only, laid out horizontally (mobile top bar)
* - 'drawer': children only, skip heading + footerIcons (mobile drawer)
*/
var SideNavRenderContext = /*#__PURE__*/ (0, import_react.createContext)("default");
SideNavRenderContext.displayName = "SideNavRenderContext";
/**
* Read the current SideNav render mode from context.
*/
function useSideNavRenderMode() {
	return (0, import_react.use)(SideNavRenderContext);
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/TopNav/TopNavRenderContext.js
/**
* @file TopNavRenderContext.ts
* @input React createContext, use
* @output Exports TopNavRenderContext and useTopNavRenderMode hook
* @position Internal context for controlling TopNav rendering mode
*
* When AppShell renders TopNav in multiple locations (top bar, mobile drawer),
* this context tells TopNav and its children which parts to render:
* - 'default': full top bar (desktop)
* - 'mobile-bar': heading + endContent + toggle, hide nav items (mobile top bar)
* - 'drawer': nav items as vertical list elements (mobile drawer)
*/
var TopNavRenderContext = /*#__PURE__*/ (0, import_react.createContext)("default");
TopNavRenderContext.displayName = "TopNavRenderContext";
/**
* Read the current TopNav render mode from context.
*/
function useTopNavRenderMode() {
	return (0, import_react.use)(TopNavRenderContext);
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/TopNav/TopNavMobileContentContext.js
/**
* @file TopNavMobileContentContext.ts
* @input React createContext, use
* @output Exports TopNavMobileContentContext and useTopNavMobileContent
* @position Internal context for passing additional drawer content to TopNav
*
* When both TopNav and SideNav exist, AppShell passes the SideNav content
* to TopNav via this context. TopNav renders it below its own items in the
* mobile drawer, producing a single combined drawer.
*/
var TopNavMobileContentContext = /*#__PURE__*/ (0, import_react.createContext)(null);
TopNavMobileContentContext.displayName = "TopNavMobileContentContext";
/**
* Read additional mobile drawer content provided by AppShell.
* Returns null when no additional content is available.
*/
function useTopNavMobileContent() {
	return (0, import_react.use)(TopNavMobileContentContext);
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/AppShell/AppShell.js
var HasActivity = typeof import_react.Activity !== "undefined";
var ActivityWrapper = HasActivity ? ({ mode, children }) => /*#__PURE__*/ (0, import_jsx_runtime.jsx)(import_react.Activity, {
	mode,
	children
}) : ({ children }) => /*#__PURE__*/ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
var MAIN_CONTENT_ID = "astryx-app-shell-main";
/**
* Extra time, on top of MobileNav's own worst-case close delay, that
* AppShell waits before flipping its `Activity` boundary to `'hidden'`.
*
* React's `Activity` hides its subtree with `display: none !important`
* synchronously in the same commit as the mode flip, and re-runs the
* cleanup of every effect inside it — which would otherwise clear
* MobileNav's own scheduled `dialog.close()` before it fires, or cut off
* its slide-out CSS transition before it plays (#5701). Waiting strictly
* longer than MobileNav's own cap, rather than the same duration, means
* this never turns into a race decided by browser timer-firing order.
*/
var ACTIVITY_HIDE_BUFFER_MS = 50;
/**
* SideNav breakpoint options. Named points resolve through the nearest Theme;
* without an active theme they use Astryx's default width-breakpoint map.
*/
/**
* Navigation background style:
* - `wash`: Nav areas use wash background, no dividers
* - `surface`: Nav areas use surface background, no dividers
* - `section`: Dividers between nav and content (classic look)
* - `elevated`: Wash nav background with elevated surface content + border radius
* @default 'elevated'
*/
/**
* Navigation background style. Extensible via module augmentation of AppShellVariantMap.
*/
/**
* Configuration object for mobile navigation behavior.
* Used when you need to customize the auto mobile nav without replacing it entirely.
*/
var styles$26 = {
	root: {
		k1xSpc: "x78zum5",
		kXwgrk: "xdt5ytf",
		kVAEAm: "x1n2onr6",
		kVQacm: "x7giv3",
		$$css: true
	},
	variantWash: {
		kWkggS: "x1eiddq6",
		$$css: true
	},
	variantSurface: {
		kWkggS: "x10xzikg",
		$$css: true
	},
	variantSection: {
		kWkggS: "x10xzikg",
		$$css: true
	},
	variantElevated: {
		kWkggS: "x1eiddq6",
		$$css: true
	},
	rootFill: {
		kZKoxP: "xtdtrs8",
		$$css: true
	},
	rootAuto: {
		kAzted: "x1ov3xa9",
		$$css: true
	},
	skipLink: {
		kVAEAm: "x10l6tqk x1xrnuwo",
		kzqmXN: "x1i1rx1s x1jqxupm",
		kZKoxP: "xjm9jq1 x15cytp8",
		k8WAf4: "xt970qd xh2mrf5",
		kg3NbH: "xnjsko4 x1cf3d6k",
		kogj98: "xkdpibf x1y5lnwp",
		kVQacm: "xb3r6kr xomzh7y",
		kz4h6p: "x1hyvwdk x1rsz1da",
		khDVqt: "xuxw1ft x1hbpcn8",
		kMzoRj: "xc342km",
		k87sOh: "x13vifvy x1rw3289",
		kLqNvP: "x1o0tod xodanix",
		kWkggS: "x10xzikg",
		kMwMTN: "xjse4m1",
		kY2c9j: "x1q2oy4v",
		kybGjl: "x1hl2dhg",
		k63SB2: "x2mo6ok",
		kGuDYH: "xjm74w1",
		$$css: true
	},
	mainFocusTarget: {
		kI3sdo: "x1uvtmcs",
		$$css: true
	},
	contentBgSurface: {
		kWkggS: "x10xzikg",
		$$css: true
	},
	contentBgWash: {
		kWkggS: "x1eiddq6",
		$$css: true
	},
	contentBgTransparent: {
		kWkggS: "xjbqb8w",
		kHBbk8: "xc8icb0",
		$$css: true
	},
	navAreaWash: {
		kWkggS: "x1eiddq6",
		$$css: true
	},
	navAreaSurface: {
		kWkggS: "x10xzikg",
		$$css: true
	},
	banner: {
		kmuXW: "x2lah0s",
		$$css: true
	},
	headerSticky: {
		kVAEAm: "x7wzq59",
		k87sOh: "x13vifvy",
		kY2c9j: "x1vjfegm",
		$$css: true
	},
	panelAutoFill: {
		kUk6DE: "x98rzlu",
		kVQacm: "xysyzu8",
		$$css: true
	}
};
/**
* Page shell for an application. Provides the structural frame for an app:
* top navigation, side navigation, and main content area.
*
* Slot-based API with `topNav`, `sideNav`, `banner`, and `children`.
* Supports two height modes (`fill` and `auto`), responsive side nav
* collapse, and mobile overlay with backdrop.
*
* @example
* ```
* <AppShell
*   topNav={<TopNav label="Navigation" heading={<TopNavHeading heading="My App" />} />}
*   sideNav={<SideNav>{navSections}</SideNav>}
*   mobileNav={
*     <MobileNav isOpen={mobileOpen} onOpenChange={(open) => setMobileOpen(open)} header="My App">
*       {navSections}
*     </MobileNav>
*   }>
*   <Content />
* </AppShell>
* ```
*/
function AppShell({ variant = "elevated", banner, children, contentPadding, "data-testid": dataTestId, height = "fill", mobileNav, sideNav, topNav, xstyle, className, style, ref, ...rest }) {
	const t = useTranslator();
	const activeTheme = useThemeDefinition();
	const mobileNavDisabled = mobileNav === false;
	const mobileNavConfig = mobileNav != null && mobileNav !== false && typeof mobileNav === "object" && !/*#__PURE__*/ (0, import_react.isValidElement)(mobileNav) ? mobileNav : null;
	const sideNavBreakpoint = mobileNavConfig?.breakpoint ?? "md";
	const mobileNavReactNode = mobileNav != null && mobileNav !== false && (/*#__PURE__*/ (0, import_react.isValidElement)(mobileNav) || typeof mobileNav === "string") ? mobileNav : null;
	const mobileNavConfigContent = mobileNavConfig?.content ?? null;
	const mobileNavHasToggle = mobileNavConfig?.hasToggle !== false;
	const mobileNavIsControlled = mobileNavConfig?.isOpen !== void 0;
	const activeWidthBreakpoints = activeTheme?.__adaptations?.widthBreakpoints;
	const isBelowBreakpoint = useMediaQuery(sideNavBreakpoint === "none" ? "(width < 0px)" : `(width < ${activeWidthBreakpoints?.[sideNavBreakpoint] ?? DEFAULT_WIDTH_BREAKPOINTS[sideNavBreakpoint]}px)`, sideNavBreakpoint === "none" ? false : mobileNavConfig?.defaultIsMobile);
	const [uncontrolledMobileOpen, setUncontrolledMobileOpen] = (0, import_react.useState)(false);
	const isMobileNavOpen = mobileNavConfig?.isOpen ?? uncontrolledMobileOpen;
	const [isMobileNavCloseHeld, setIsMobileNavCloseHeld] = (0, import_react.useState)(isMobileNavOpen);
	if (isMobileNavOpen && !isMobileNavCloseHeld) setIsMobileNavCloseHeld(true);
	(0, import_react.useEffect)(() => {
		if (!HasActivity || isMobileNavOpen) return;
		const delayMs = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 250 + ACTIVITY_HIDE_BUFFER_MS;
		const timeout = setTimeout(() => {
			setIsMobileNavCloseHeld(false);
		}, delayMs);
		return () => clearTimeout(timeout);
	}, [isMobileNavOpen]);
	const isMobileNavActivityVisible = isMobileNavOpen || isMobileNavCloseHeld;
	const mobileNavOnOpenChange = mobileNavConfig?.onOpenChange;
	const setMobileNavOpen = (0, import_react.useCallback)((open) => {
		if (!mobileNavIsControlled) setUncontrolledMobileOpen(open);
		mobileNavOnOpenChange?.(open);
	}, [mobileNavIsControlled, mobileNavOnOpenChange]);
	const handleSkipLinkClick = (0, import_react.useCallback)(() => {
		document.getElementById(MAIN_CONTENT_ID)?.focus();
	}, []);
	const isFill = height === "fill";
	const isAuto = height === "auto";
	const hasBanner = isRenderable(banner);
	const hasTopNav = isRenderable(topNav);
	const hasSideNav = isRenderable(sideNav);
	const mobileNavEnabled = !mobileNavDisabled && (hasTopNav || hasSideNav) && mobileNavReactNode == null;
	const navHasDividers = variant === "section";
	const isElevated = variant === "elevated";
	const navAreaStyle = variant === "wash" || variant === "elevated" ? styles$26.navAreaWash : variant === "surface" ? styles$26.navAreaSurface : void 0;
	const headerAreaStyle = navAreaStyle ?? (isAuto && variant === "section" ? styles$26.navAreaSurface : void 0);
	const contentAreaStyle = variant === "wash" ? styles$26.contentBgWash : variant === "elevated" && hasTopNav && hasSideNav && !isBelowBreakpoint ? styles$26.contentBgTransparent : variant === "surface" || variant === "elevated" ? styles$26.contentBgSurface : void 0;
	const stickyBgStyle = navAreaStyle ?? styles$26.navAreaSurface;
	const headerRef = (0, import_react.useRef)(null);
	const shellRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!isAuto || !headerRef.current || !shellRef.current) return;
		const headerEl = headerRef.current;
		const shellEl = shellRef.current;
		const updateHeight = () => {
			const height = headerEl.getBoundingClientRect().height;
			shellEl.style.setProperty("--_app-shell-header-height", `${height}px`);
		};
		return observeResize(headerEl, () => updateHeight());
	}, [isAuto]);
	const showSideNavInline = hasSideNav && !isBelowBreakpoint;
	const shouldRenderMobileNavReactNode = mobileNavReactNode != null;
	const shouldRenderConfigContent = mobileNavEnabled && mobileNavConfigContent != null && isBelowBreakpoint;
	const mobileNavId = (0, import_react.useId)();
	const mobileContextValue = (0, import_react.useMemo)(() => ({
		isMobile: isBelowBreakpoint,
		isMobileNavOpen,
		mobileNavId,
		toggleMobileNav: () => mobileNavEnabled && setMobileNavOpen(!isMobileNavOpen),
		openMobileNav: () => mobileNavEnabled && setMobileNavOpen(true),
		closeMobileNav: () => setMobileNavOpen(false),
		isMobileNavEnabled: mobileNavEnabled,
		hasAutoToggle: mobileNavHasToggle
	}), [
		isBelowBreakpoint,
		isMobileNavOpen,
		mobileNavId,
		setMobileNavOpen,
		mobileNavEnabled,
		mobileNavHasToggle
	]);
	const mobileContentValue = hasSideNav && mobileNavHasToggle ? /*#__PURE__*/ (0, import_jsx_runtime.jsx)(SideNavRenderContext, {
		value: "drawer-content",
		children: sideNav
	}) : null;
	const drawerMobileContentValue = hasSideNav ? /*#__PURE__*/ (0, import_jsx_runtime.jsx)(SideNavRenderContext, {
		value: "drawer-content",
		children: sideNav
	}) : null;
	const topNavContent = hasTopNav ? isBelowBreakpoint && !mobileNavDisabled && mobileNavReactNode == null ? /*#__PURE__*/ (0, import_jsx_runtime.jsx)(TopNavMobileContentContext, {
		value: mobileContentValue,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(TopNavRenderContext, {
			value: "mobile-bar",
			children: topNav
		})
	}) : topNav : null;
	const headerInner = hasTopNav || hasBanner ? /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(LayoutHeader, {
		padding: 0,
		hasDivider: navHasDividers && hasTopNav,
		children: [hasBanner && /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
			...props(styles$26.banner, navAreaStyle),
			children: banner
		}), hasTopNav && topNavContent]
	}) : void 0;
	const headerContent = isRenderable(headerInner) ? /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
		ref: headerRef,
		role: "banner",
		...mergeProps(themeProps("app-shell-header", { variant }), props(headerAreaStyle, isAuto && styles$26.headerSticky)),
		children: headerInner
	}) : void 0;
	const sideNavPanel = showSideNavInline ? /*#__PURE__*/ (0, import_jsx_runtime.jsx)(LayoutPanel, {
		padding: 0,
		hasDivider: navHasDividers,
		isScrollable: isFill,
		...themeProps("app-shell-sidenav", { variant }),
		xstyle: [
			navAreaStyle,
			isAuto && stickyBgStyle,
			isAuto && styles$26.panelAutoFill
		],
		children: sideNav
	}) : void 0;
	const sideNavContent = sideNavPanel != null && isAuto ? /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
		className: "x2lah0s x7giv3 x7wzq59 xht72ud xpa73km x78zum5 xdt5ytf",
		children: sideNavPanel
	}) : sideNavPanel;
	const shouldElevateWithCorner = isElevated && hasTopNav && showSideNavInline;
	const mainInner = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(LayoutContent, {
		padding: contentPadding ?? 0,
		role: "main",
		id: MAIN_CONTENT_ID,
		tabIndex: -1,
		isScrollable: isFill,
		xstyle: [contentAreaStyle, styles$26.mainFocusTarget],
		children
	});
	const mainContent = /*#__PURE__*/ (0, import_jsx_runtime.jsxs)("div", {
		...{
			0: { className: "xjp7ctv" },
			1: { className: "x1n2onr6 x78zum5 x98rzlu x2lwn1j x5yr21d" }
		}[!!shouldElevateWithCorner << 0],
		children: [shouldElevateWithCorner && /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", { className: "x10l6tqk x10a8y8t x10xzikg x183tx6i x47corl" }), mainInner]
	});
	const autoMobileTopBar = !mobileNavDisabled && mobileNavHasToggle && isBelowBreakpoint && !hasTopNav && hasSideNav ? /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
		role: headerContent == null ? "banner" : void 0,
		...mergeProps(themeProps("app-shell-header", { variant }), props(headerAreaStyle, isAuto && styles$26.headerSticky)),
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(LayoutHeader, {
			padding: 0,
			hasDivider: navHasDividers,
			children: /*#__PURE__*/ (0, import_jsx_runtime.jsxs)("div", {
				className: "x78zum5 x6s0dn4 x1k15mir xf314gf",
				role: "navigation",
				"aria-label": t("@astryx.appShell.mobileNavigation"),
				children: [/*#__PURE__*/ (0, import_jsx_runtime.jsx)(SideNavRenderContext, {
					value: "topbar",
					children: sideNav
				}), /*#__PURE__*/ (0, import_jsx_runtime.jsx)(MobileNavToggle, {})]
			})
		})
	}) : void 0;
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(AppShellMobileContext, {
		value: mobileContextValue,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsxs)("div", {
			...rest,
			ref: useMergedRefs(ref, shellRef),
			"data-testid": dataTestId,
			...mergeProps(themeProps("app-shell", { variant }), props(styles$26.root, variant === "wash" ? styles$26.variantWash : variant === "surface" ? styles$26.variantSurface : variant === "section" ? styles$26.variantSection : styles$26.variantElevated, isFill ? styles$26.rootFill : styles$26.rootAuto, xstyle), className, style),
			children: [
				/*#__PURE__*/ (0, import_jsx_runtime.jsx)("a", {
					href: `#${MAIN_CONTENT_ID}`,
					onClick: handleSkipLinkClick,
					...focusOutlineProps.focusVisible(styles$26.skipLink),
					"data-testid": "skip-to-content",
					children: t("@astryx.appShell.skipToContent")
				}),
				/*#__PURE__*/ (0, import_jsx_runtime.jsx)(Layout, {
					height,
					padding: 0,
					header: /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [headerContent, autoMobileTopBar] }),
					start: sideNavContent,
					content: mainContent
				}),
				shouldRenderMobileNavReactNode && mobileNavReactNode,
				shouldRenderConfigContent && mobileNavConfigContent,
				isBelowBreakpoint && !mobileNavDisabled && mobileNavReactNode == null && !mobileNavConfigContent && /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(ActivityWrapper, {
					mode: isMobileNavActivityVisible ? "visible" : "hidden",
					children: [hasSideNav && !hasTopNav && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(SideNavRenderContext, {
						value: "drawer",
						children: sideNav
					}), hasTopNav && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(TopNavMobileContentContext, {
						value: drawerMobileContentValue,
						children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(TopNavRenderContext, {
							value: "drawer",
							children: topNav
						})
					})]
				})
			]
		})
	});
}
AppShell.displayName = "AppShell";
//#endregion
//#region node_modules/@astryxdesign/core/dist/TopNav/TopNavContext.js
/**
* @file TopNavContext.ts
* @input Layer-scoped React context
* @output TopNavSlotContext and useTopNavSlot
* @position Navigation slot presentation defaults
*/
var TopNavSlotContext = createLayerScopedContext("start");
TopNavSlotContext.displayName = "TopNavSlotContext";
//#endregion
//#region node_modules/@astryxdesign/core/dist/Divider/Divider.js
/**
* @file Divider.tsx
* @input Uses React, stylex, spacing and color tokens
* @output Exports Divider component and DividerProps
* @position Divider component; provides visual separation with optional label
*
* SYNC: When modified, update these files to stay in sync:
* - /packages/core/src/Divider/Divider.doc.mjs
* - /packages/core/src/Divider/Divider.test.tsx
* - /apps/storybook/stories/Divider.stories.tsx
* - /packages/cli/assets/templates/blocks/components/Divider/ (showcase blocks)
*/
/**
* Divider variant type. Extensible via module augmentation of DividerVariantMap.
*/
var baseStyles$1 = {
	horizontal: {
		k1xSpc: "x78zum5",
		kGNEyG: "x6s0dn4",
		kzqmXN: "xh8yej3",
		$$css: true
	},
	vertical: {
		k1xSpc: "x3nfvp2",
		kXwgrk: "xdt5ytf",
		kGNEyG: "x6s0dn4",
		kZKoxP: "x5yr21d",
		$$css: true
	}
};
var lineStyles = {
	horizontalLine: {
		kZKoxP: "xsyqizj",
		kzQI83: "x1iyjqo2",
		kmuXW: "xs83m0k",
		$$css: true
	},
	verticalLine: {
		kzqmXN: "xjk4fl7",
		kzQI83: "x1iyjqo2",
		kmuXW: "xs83m0k",
		$$css: true
	},
	subtle: {
		kWkggS: "x1m4xfpy",
		$$css: true
	},
	strong: {
		kWkggS: "x7njt3n",
		$$css: true
	}
};
var fullBleedStyles = {
	horizontal: {
		keTefX: "xojxgvx",
		k71WvV: "x1fcf3bl",
		kzqmXN: "xx6qvi6",
		$$css: true
	},
	vertical: {
		keoZOQ: "x1sa9bsh",
		k1K539: "x6h7pi7",
		kZKoxP: "x12qplqi",
		$$css: true
	}
};
/**
* Divider component for visual separation of content.
*
* Provides horizontal and vertical dividers with optional labels.
* Uses Astryx design tokens for colors and spacing.
*
* @example
* ```
* <Divider label="or" />
* ```
*/
function Divider({ orientation = "horizontal", label, variant = "subtle", isFullBleed = false, xstyle, className, style, ref, "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy, ...props$12 }) {
	const isHorizontal = orientation === "horizontal";
	const hasLabel = isRenderable(label);
	const labelId = (0, import_react.useId)();
	const resolvedLabelledBy = ariaLabelledBy ?? (hasLabel && ariaLabel == null ? labelId : void 0);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)("div", {
		ref,
		...props$12,
		role: "separator",
		"aria-orientation": orientation,
		"aria-label": ariaLabel,
		"aria-labelledby": resolvedLabelledBy,
		...mergeProps(themeProps("divider", {
			variant,
			orientation
		}), props(isHorizontal ? baseStyles$1.horizontal : baseStyles$1.vertical, isFullBleed && (isHorizontal ? fullBleedStyles.horizontal : fullBleedStyles.vertical), xstyle), className, style),
		children: [
			/*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", { ...props(isHorizontal ? lineStyles.horizontalLine : lineStyles.verticalLine, lineStyles[variant]) }),
			hasLabel && /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
				id: labelId,
				...{
					0: { className: "x2lah0s xrrkdod x141an7d x1ltkj2j xv1l7n4" },
					1: { className: "x2lah0s x141an7d x1ltkj2j xv1l7n4 xnjsko4 x8o8v82" }
				}[!!!isHorizontal << 0],
				children: label
			}),
			hasLabel && /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", { ...props(isHorizontal ? lineStyles.horizontalLine : lineStyles.verticalLine, lineStyles[variant]) })
		]
	});
}
Divider.displayName = "Divider";
//#endregion
//#region node_modules/@astryxdesign/core/dist/TopNav/TopNav.js
/**
* @file TopNav.tsx
* @input Uses React, ReactNode
* @output Exports TopNav component and TopNavProps
* @position Core implementation; consumed by index.ts
*
* SYNC: When modified, update these files to stay in sync:
* - /packages/core/src/TopNav/TopNav.doc.mjs
* - /packages/core/src/TopNav/TopNav.test.tsx
* - /packages/core/src/TopNav/index.ts
* - /apps/storybook/stories/TopNav.stories.tsx
* - /packages/cli/assets/templates/blocks/components/TopNav/ (showcase blocks)
*/
/**
* Base TopNav styles
*/
var styles$25 = {
	base: {
		kGNEyG: "x6s0dn4",
		kzqmXN: "xh8yej3",
		kmVPX3: "xlsj2fj",
		kB7OPa: "x9f619",
		$$css: true
	},
	baseFlex: {
		k1xSpc: "x78zum5",
		$$css: true
	},
	baseGrid: {
		k1xSpc: "xrvj5dj",
		kumcoG: "x134kloy",
		$$css: true
	},
	mobileBar: {
		k1xSpc: "x78zum5",
		kGNEyG: "x6s0dn4",
		kzqmXN: "xh8yej3",
		kmVPX3: "xlsj2fj",
		kB7OPa: "x9f619",
		$$css: true
	},
	drawerDivider: {
		kqGvvJ: "x1g06x3t",
		$$css: true
	}
};
/**
* Top navigation bar for application headers.
*
* Slot-based layout with `heading`, `startContent`, `centerContent`, and
* `endContent`. `children` are accepted as an alias for `startContent`
* so navigation items do not silently disappear when using the common
* React children pattern. When `centerContent` is provided, the layout switches
* to a three-column CSS grid to keep center content horizontally centered.
*
* @example
* ```
* <TopNav
*   label="Main navigation"
*   heading={<TopNavHeading heading="My App" />}
*   startContent={<TopNavItem label="Home" href="/" isSelected />}
*   endContent={<Button label="Search" variant="ghost" />}
* />
* ```
*/
function TopNav({ heading, startContent, children, centerContent, endContent, label: labelFromProps, xstyle, className, style, ref, ...props$11 }) {
	const t = useTranslator();
	const label = labelFromProps ?? t("@astryx.topNav.landmarkLabel");
	const renderMode = useTopNavRenderMode();
	const mobileContent = useTopNavMobileContent();
	const { hasAutoToggle } = useAppShellMobile();
	const resolvedStartContent = startContent ?? children;
	const hasCenterContent = centerContent != null;
	const hasCollapsibleContent = resolvedStartContent != null || centerContent != null;
	const hasMobileDrawerContent = hasCollapsibleContent || mobileContent != null;
	if (renderMode === "mobile-bar") return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)("nav", {
		ref,
		role: "navigation",
		"aria-label": label,
		...mergeProps(themeProps("top-nav", { mode: "mobile-bar" }), props(styles$25.mobileBar, xstyle), className, style),
		...props$11,
		children: [heading && /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
			className: "x78zum5 x6s0dn4 xkz0k9k xeuugli",
			children: heading
		}), /*#__PURE__*/ (0, import_jsx_runtime.jsxs)("div", {
			className: "x78zum5 x6s0dn4 xzye2dw x2lah0s xvc5jky",
			children: [endContent, hasMobileDrawerContent && hasAutoToggle && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(MobileNavToggle, {})]
		})]
	});
	if (renderMode === "drawer") {
		if (!hasCollapsibleContent && !mobileContent) return null;
		return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(MobileNav, {
			header: heading,
			children: [
				hasCollapsibleContent && /*#__PURE__*/ (0, import_jsx_runtime.jsxs)("div", {
					className: "x78zum5 xdt5ytf x1lsbc85",
					children: [resolvedStartContent, centerContent]
				}),
				hasCollapsibleContent && mobileContent && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Divider, { xstyle: styles$25.drawerDivider }),
				mobileContent && /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", { children: mobileContent })
			]
		});
	}
	return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)("nav", {
		ref,
		role: "navigation",
		"aria-label": label,
		...mergeProps(themeProps("top-nav"), props(styles$25.base, hasCenterContent ? styles$25.baseGrid : styles$25.baseFlex, xstyle), className, style),
		...props$11,
		children: [
			/*#__PURE__*/ (0, import_jsx_runtime.jsxs)("div", {
				className: "x78zum5 x6s0dn4 x18g69wz x845mor xeuugli",
				children: [heading && /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
					className: "x78zum5 x6s0dn4 x2lah0s",
					children: heading
				}), resolvedStartContent && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(TopNavSlotContext, {
					value: "start",
					children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
						className: "x78zum5 x6s0dn4 xzye2dw",
						children: resolvedStartContent
					})
				})]
			}),
			hasCenterContent && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(TopNavSlotContext, {
				value: "center",
				children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
					className: "x78zum5 x6s0dn4 xl56j7k xzye2dw",
					children: centerContent
				})
			}),
			hasCenterContent ? /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
				className: "x78zum5 x6s0dn4 x13a6bvl xzye2dw",
				children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(TopNavSlotContext, {
					value: "end",
					children: endContent
				})
			}) : endContent && /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
				className: "x78zum5 x6s0dn4 xzye2dw x2lah0s xvc5jky",
				children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(TopNavSlotContext, {
					value: "end",
					children: endContent
				})
			})
		]
	});
}
TopNav.displayName = "TopNav";
//#endregion
//#region node_modules/@astryxdesign/core/dist/hooks/focusableSelector.js
/**
* @file focusableSelector.ts
* @input None (a plain CSS selector string constant)
* @output Exports FOCUSABLE_SELECTOR
* @position Internal utility; the canonical CSS selector for focusable
*   elements, shared by focus-management hooks (e.g. useFocusTrap) so the
*   selector isn't duplicated across components/hooks. Not exported from the
*   public barrel — internal implementation detail.
*/
/**
* Canonical CSS selector for commonly focusable elements. Includes the
* tabbable natives (button/link/input/select/textarea/[tabindex]) plus
* editable and media elements the browser also puts in the tab order —
* contenteditable, media with controls, iframe, and an open <details>'s
* <summary> — which a naive selector misses, letting Tab escape a trap whose
* only interactive content is (e.g.) a contenteditable composer (infra-8).
*
* This is the canonical focusable selector; prefer importing it here over
* re-declaring the string so behavior stays consistent across hooks.
*/
var FOCUSABLE_SELECTOR = "button:not([disabled]), a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex=\"-1\"]):not([disabled]), [contenteditable]:not([contenteditable=\"false\"]), audio[controls], video[controls], iframe, details > summary:first-child";
//#endregion
//#region node_modules/@astryxdesign/core/dist/hooks/useFocusTrap.js
/**
* @file useFocusTrap.ts
* @input Uses React useCallback, useEffect, useRef
* @output Exports useFocusTrap, the deprecated Escape-state shim, and an
*   internal compatibility-signal hook
* @position Core hook; used by dialogs, modals, date pickers
*
* Based on WAI-ARIA dialog pattern:
* https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
*
* SYNC: When modified, update:
* - /packages/core/src/hooks/index.ts
*/
var activeEscapeTrapCount = 0;
/**
* Keep the deprecated `hasActiveFocusTrapEscape` signal accurate for a focus
* trap whose Escape is coordinated by another registration in the shared
* stack. This hook is intentionally internal (not re-exported from `hooks`): it
* preserves the released read-only compatibility signal without creating a
* second dismissal owner.
*/
function useFocusTrapEscapeCompatibilitySignal(isActive) {
	(0, import_react.useEffect)(() => {
		if (!isActive) return;
		activeEscapeTrapCount += 1;
		return () => {
			activeEscapeTrapCount -= 1;
		};
	}, [isActive]);
}
/**
* Whether an element is currently perceivable/focusable — excludes ones hidden
* via `display:none`/`visibility:hidden` or inside an `inert`/`hidden` subtree,
* which the browser skips for Tab, and ones inside an `aria-hidden="true"`
* subtree, which sighted-keyboard users could Tab to while AT skips them
* (WCAG 4.1.2 — focusable content must be exposed to assistive tech).
*/
function isVisiblyFocusable(el) {
	if (el.hasAttribute("inert") || el.closest("[inert]")) return false;
	if (el.hidden || el.closest("[hidden]")) return false;
	if (el.closest("[aria-hidden=\"true\"]")) return false;
	if (typeof window !== "undefined" && window.getComputedStyle) {
		const style = window.getComputedStyle(el);
		if (style.visibility === "hidden" || style.display === "none") return false;
	}
	return true;
}
/**
* Get all focusable elements within a container.
*
* Exported for menus that place their own Tab stops inside a trapped layer
* (DropdownMenu's header and footer), so they judge reachability exactly as
* the trap does. Not re-exported from the package's `hooks` entry.
*/
function getFocusableElements(container) {
	return Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)).filter(isVisiblyFocusable);
}
/**
* Attempt to focus an element. Returns true if focus was successful.
*/
function attemptFocus$1(element) {
	try {
		element.focus();
	} catch {}
	return document.activeElement === element;
}
/**
* Focus the first focusable descendant of a container.
* Returns true if a focusable element was found and focused.
*/
function focusFirstDescendant(container) {
	const focusable = getFocusableElements(container);
	for (const element of focusable) if (attemptFocus$1(element)) return true;
	return false;
}
/**
* Focus the last focusable descendant of a container.
* Returns true if a focusable element was found and focused.
*/
function focusLastDescendant(container) {
	const focusable = getFocusableElements(container);
	for (let i = focusable.length - 1; i >= 0; i--) if (attemptFocus$1(focusable[i])) return true;
	return false;
}
/**
* Configuration for focus trap behavior
*/
/**
* Return type for useFocusTrap hook
*/
/**
* Hook for trapping focus within a container element.
*
* Implements the WAI-ARIA dialog focus trap pattern:
* - Listens to focus events on the document
* - Redirects focus back into the container if it escapes
* - Handles both Tab and Shift+Tab navigation
* - Restores focus to the element that was focused before activation when the
*   trap deactivates or unmounts, unless focus was already moved elsewhere
*   (so consumers that restore focus themselves are unaffected) or focus
*   never entered the trap (so popups that keep focus on their trigger, like
*   comboboxes, are unaffected)
*
* @example
* ```
* const {containerRef, focusFirst} = useFocusTrap({
*   isActive: isOpen,
*   onEscape: () => setIsOpen(false),
* });
*
* useEffect(() => {
*   if (isOpen) {
*     focusFirst();
*   }
* }, [isOpen, focusFirst]);
*
* <div ref={containerRef}>
*   <button>First</button>
*   <button>Last</button>
* </div>
* ```
*/
function useFocusTrap(options) {
	const { isActive, onEscape } = options;
	const containerRef = (0, import_react.useRef)(null);
	const lastFocusRef = (0, import_react.useRef)(null);
	const isKeyboardNavigationRef = (0, import_react.useRef)(false);
	const isEscapeTrap = isActive && onEscape != null;
	useLayerDismissal({
		isActive: isEscapeTrap,
		onDismiss: () => {
			onEscape?.();
		},
		getContainer: () => containerRef.current
	});
	useFocusTrapEscapeCompatibilitySignal(isEscapeTrap);
	/**
	* Focus the first focusable element.
	*/
	const focusFirst = (0, import_react.useCallback)(() => {
		if (containerRef.current) focusFirstDescendant(containerRef.current);
	}, []);
	/**
	* Capture the element focused before the trap activated, and restore focus to
	* it when the trap deactivates (or the component unmounts). Overlays are
	* opened imperatively (e.g. `showPopover()`), so the browser's declarative
	* popover focus restoration does not apply — without this, closing a Popover
	* via Escape or light dismiss drops keyboard focus to `<body>`.
	*
	* The restore is guarded so it never steals focus a consumer moved on
	* purpose: it only runs when focus would otherwise be lost — i.e. the active
	* element is nothing, the document body/root, or still inside the (possibly
	* now-unmounted) trap container. If focus already moved to some other element
	* outside the trap (the user clicked elsewhere, or a consumer such as
	* DropdownMenu already refocused its trigger), the restore is a no-op.
	*
	* The restore is also skipped when focus never entered the trap while it
	* was active. Some popups — a Typeahead/PowerSearch listbox anchored to its
	* own input — deliberately keep DOM focus on the trigger and never move it
	* into the trap container (they open with `role: "none"` and
	* `hasAutoFocus: false`). For those, the restore would cancel a blur the
	* user asked for on outside-click dismissal, re-focusing the trigger so a
	* second click no longer fires a `focus` event and cannot reopen the menu.
	* Tracking `focusin` inside the container distinguishes "focus was here and
	* we should rescue it" from "focus was never here and we should leave it
	* alone" — popups that do take focus (Dialog, DropdownMenu, a Typeahead
	* option click) are unaffected.
	*/
	(0, import_react.useEffect)(() => {
		if (!isActive) return;
		const previouslyFocused = document.activeElement;
		const container = containerRef.current;
		let hadFocusInside = container != null && container.contains(document.activeElement);
		const markFocusInside = (event) => {
			const target = event.target;
			if (target != null && containerRef.current?.contains(target)) hadFocusInside = true;
		};
		document.addEventListener("focusin", markFocusInside, true);
		return () => {
			document.removeEventListener("focusin", markFocusInside, true);
			if (!hadFocusInside) return;
			const active = document.activeElement;
			if (!(active == null || active === document.body || active === document.documentElement || container != null && container.contains(active))) return;
			if (previouslyFocused != null && previouslyFocused.isConnected && typeof previouslyFocused.focus === "function") previouslyFocused.focus();
		};
	}, [isActive]);
	/**
	* Handle focus events - redirect focus back into container if it escapes.
	* Only redirects for keyboard navigation, not mouse clicks.
	*/
	(0, import_react.useEffect)(() => {
		if (!isActive) return;
		const handleFocus = (event) => {
			const container = containerRef.current;
			if (!container) return;
			const target = event.target;
			if (container.contains(target)) lastFocusRef.current = target;
			else if (isKeyboardNavigationRef.current) {
				const focusedFirst = focusFirstDescendant(container);
				if (focusedFirst && lastFocusRef.current === document.activeElement) focusLastDescendant(container);
				else if (!focusedFirst && lastFocusRef.current instanceof HTMLElement && container.contains(lastFocusRef.current)) attemptFocus$1(lastFocusRef.current);
				lastFocusRef.current = document.activeElement;
			}
			isKeyboardNavigationRef.current = false;
		};
		document.addEventListener("focus", handleFocus, true);
		return () => {
			document.removeEventListener("focus", handleFocus, true);
		};
	}, [isActive]);
	/**
	* Handle Tab key to wrap focus at boundaries. Also tracks that keyboard
	* navigation is occurring.
	*
	* No Escape here, and no IME guard: the shared stack owns the press, claims
	* a composing Escape so no close request follows, and dismisses the trap
	* through `onEscape` above. The trap renders no element of its own, so it
	* has no `cancel` to answer either.
	*/
	(0, import_react.useEffect)(() => {
		if (!isActive) return;
		const handleKeyDown = (event) => {
			const container = containerRef.current;
			if (!container) return;
			if (event.key === "Tab") {
				isKeyboardNavigationRef.current = true;
				const focusable = getFocusableElements(container);
				if (focusable.length === 0) {
					const active = document.activeElement;
					if (!(active instanceof HTMLElement) || !container.contains(active)) return;
					event.preventDefault();
					lastFocusRef.current = active;
					isKeyboardNavigationRef.current = false;
					return;
				}
				const first = focusable[0];
				const last = focusable[focusable.length - 1];
				if (document.activeElement === container) {
					event.preventDefault();
					if (event.shiftKey) last.focus();
					else first.focus();
					return;
				}
				if (event.shiftKey) {
					if (document.activeElement === first) {
						event.preventDefault();
						last.focus();
					}
				} else if (document.activeElement === last) {
					event.preventDefault();
					first.focus();
				}
			}
		};
		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [isActive, onEscape]);
	return {
		containerRef,
		focusFirst
	};
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/hooks/useDevWarning.js
/**
* @file useDevWarning.ts
* @input A component name, a message, and a boolean condition
* @output Fires a dev-only `Component: message` warning once per mount
* @position Core hook; the render-safe way to warn the builder from a component
*
* The right way to surface a dev guardrail from inside a component. A naive
* `if (condition) console.warn(...)` in the render body repeats on every
* render, and reaching for `useState` to gate it adds needless state and
* re-renders. This hook uses a ref + effect: the warning fires once per mount
* when the condition holds, never during render, and never triggers a
* re-render. Messages use the standardized `Component: message` format.
*
* SYNC: When modified, update:
* - /packages/core/src/hooks/index.ts
* - /packages/core/src/utils/devWarning.ts (the imperative counterpart)
*/
/**
* Fire a dev-only warning once per mount while `condition` is true.
*
* @param component - Component or hook name (message prefix)
* @param message - What went wrong and how to fix it
* @param condition - Whether to warn; defaults to `true`
*
* @example
* ```
* useDevWarning(
*   'Field',
*   'isOptional and isRequired are mutually exclusive. isOptional takes precedence.',
*   isOptional && isRequired,
* );
* ```
*/
function useDevWarning(component, message, condition = true) {
	const hasWarnedRef = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (condition && !hasWarnedRef.current) hasWarnedRef.current = true;
	}, [
		component,
		message,
		condition
	]);
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/Popover/usePopover.js
/**
* @file usePopover.tsx
* @input Uses useLayer, useFocusTrap, React hooks
* @output Exports the public usePopover hook with derived focus and guarded opening.
* @position Higher-level layer utility; used by DatePicker, Combobox, etc.
*
* Combines popover layer behavior with focus trap for dialog-like popovers.
* Use this for interactive popover content that should trap focus.
*
* SYNC: When modified, update:
* - /packages/core/src/Popover/index.ts
*/
var FALLBACK_CLOSE_SELECTOR = "[data-astryx-popover-fallback-close]";
function attemptFocus(element) {
	try {
		element.focus();
	} catch {}
	return document.activeElement === element;
}
function focusFirstContentControl(container) {
	const focusable = Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)).filter((element) => element.closest(FALLBACK_CLOSE_SELECTOR) == null);
	for (const element of focusable) if (attemptFocus(element)) return true;
	return false;
}
var styles$24 = {
	surface: {
		kWkggS: "x1prclbq",
		"--_popover-radius": "xiki222",
		kaIpWk: "x11m9jtl",
		kGVxlE: "x1i5ehqx",
		$$css: true
	},
	contentWrapper: {
		kVAEAm: "x1n2onr6",
		$$css: true
	},
	closeButtonWrapper: {
		kVAEAm: "x10l6tqk",
		krVfgx: "x1ey2m1c",
		kY2c9j: "x1vjfegm",
		kzqmXN: "x1i1rx1s x10okhzq",
		kZKoxP: "xjm9jq1 x132qfvm",
		kVQacm: "xb3r6kr x1dordxg",
		kz4h6p: "x1hyvwdk x10wafsz",
		kfzvcC: "x47corl xbt4iw",
		kLKAdn: "xexx8yu x1kw28su",
		$$css: true
	}
};
/**
* Options for usePopover
*/
/**
* Return type for usePopover
*/
/**
* Hook for creating popover dialogs with focus trapping.
*
* Combines:
* - `useLayer` for popover positioning using CSS anchor positioning
* - `useFocusTrap` for trapping focus within the popover content
* - Auto-focus first element on open
* - Escape key to close (configurable via hasEscapeDismiss)
* - Hidden close button that reveals on focus for accessibility
*
* The render function automatically wraps your content in a focus trap container
* and appends a hidden close button. The button appears at the end of the popover,
* is visually hidden until focused, then shows a tooltip-like message (default: "Close popover").
*
* @example
* ```
* function DatePickerExample() {
*   const inputRef = useRef<HTMLInputElement>(null);
*   const popover = usePopover({
*     onHide: () => inputRef.current?.focus(),
*     closeButtonLabel: 'Close calendar',
*   });
*   return (
*     <>
*       <input ref={inputRef} />
*       <button
*         ref={popover.triggerRef}
*         onClick={popover.toggle}
*         {...popover.triggerProps}>
*         Open Calendar
*       </button>
*       {popover.render(
*         <Calendar />,
*         { placement: 'below', alignment: 'start' }
*       )}
*     </>
*   );
* }
* ```
*/
function usePopoverImplementation(options = {}) {
	const { onShow, onHide, xstyle, className, style, hasLightDismiss = true, hasEscapeDismiss = true, hasAutoFocus = true, hasSurface = true, padding, surfaceTarget, hasCloseButton = true, closeButtonLabel: closeButtonLabelFromProps, dialogLabel, role = "dialog", isModal = true } = options;
	const t = useTranslator();
	const closeButtonLabel = closeButtonLabelFromProps ?? t("@astryx.popover.close");
	const triggerElementRef = (0, import_react.useRef)(null);
	const skipAutoFocusRef = (0, import_react.useRef)(false);
	const layer = useLayer({
		mode: "context",
		lightDismiss: hasLightDismiss,
		onShow,
		onHide
	});
	const { containerRef: contentRef, focusFirst } = useFocusTrap({
		isActive: layer.isOpen,
		onEscape: hasEscapeDismiss || hasLightDismiss ? layer.hide : void 0
	});
	const focusInitialTarget = (0, import_react.useCallback)(() => {
		const container = contentRef.current;
		if (!container) return;
		if (focusFirstContentControl(container)) return;
		if (role === "dialog") {
			attemptFocus(container);
			return;
		}
		focusFirst();
	}, [
		contentRef,
		focusFirst,
		role
	]);
	(0, import_react.useEffect)(() => {
		if (layer.isOpen && hasAutoFocus && !skipAutoFocusRef.current) requestAnimationFrame(focusInitialTarget);
		if (!layer.isOpen) skipAutoFocusRef.current = false;
	}, [
		layer.isOpen,
		hasAutoFocus,
		focusInitialTarget
	]);
	const triggerRef = (0, import_react.useCallback)((el) => {
		triggerElementRef.current = el;
		layer.ref(el);
	}, [layer]);
	const show = (0, import_react.useCallback)((showOptions) => {
		skipAutoFocusRef.current = showOptions?.skipAutoFocus ?? false;
		layer.show();
	}, [layer]);
	const toggle = (0, import_react.useCallback)(() => {
		if (layer.isOpen) layer.hide();
		else show();
	}, [layer, show]);
	const triggerProps = {
		"aria-haspopup": role === "dialog" ? "dialog" : "true",
		"aria-expanded": layer.isOpen,
		"aria-controls": layer.id
	};
	useDevWarning("usePopover", "role=\"dialog\" without a `dialogLabel` renders an unnamed dialog. Pass `dialogLabel`, or use `role: \"none\"` for listbox/menu popups whose content already carries its own role.", role === "dialog" && !dialogLabel);
	const render = (0, import_react.useCallback)((children, props$10) => {
		const surfaceProps = themeProps("popover");
		const surfaceClassName = surfaceTarget != null && surfaceTarget !== "popover" ? `${surfaceProps.className} ${stableClassName(surfaceTarget)}` : surfaceProps.className;
		return layer.render(/*#__PURE__*/ (0, import_jsx_runtime.jsx)(LayerDepthProvider, { children: /*#__PURE__*/ (0, import_jsx_runtime.jsxs)("div", {
			ref: contentRef,
			role: role === "dialog" ? "dialog" : void 0,
			"aria-modal": role === "dialog" && isModal ? true : void 0,
			"aria-label": role === "dialog" ? dialogLabel : void 0,
			tabIndex: role === "dialog" ? -1 : void 0,
			...mergeProps({
				...surfaceProps,
				className: surfaceClassName
			}, focusOutlineProps.focusVisible(styles$24.contentWrapper, hasSurface && styles$24.surface, padding != null && paddingStyles[padding], xstyle), className, style),
			children: [children, hasCloseButton && /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
				"data-astryx-popover-fallback-close": "",
				...props(styles$24.closeButtonWrapper, rtlStyles.centerInline("100%")),
				children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					label: closeButtonLabel,
					onClick: layer.hide
				})
			})]
		}) }), {
			...props$10,
			xstyle: props$10?.xstyle
		});
	}, [
		layer,
		hasCloseButton,
		hasSurface,
		padding,
		surfaceTarget,
		className,
		style,
		closeButtonLabel,
		contentRef,
		dialogLabel,
		role,
		isModal,
		xstyle
	]);
	return {
		triggerRef,
		contentRef,
		anchorId: layer.anchorId,
		show,
		hide: layer.hide,
		toggle,
		isOpen: layer.isOpen,
		id: layer.id,
		render,
		triggerProps
	};
}
function usePopover(options = {}) {
	return usePopoverImplementation(options);
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/Tooltip/Tooltip.js
/**
* @file Tooltip.tsx
* @input Uses React, useTooltip hook
* @output Exports Tooltip component for hover/focus triggered tooltips
* @position Layer component; uses display:contents wrapper to avoid cloneElement
*
* SYNC: When modified, update these files to stay in sync:
* - /packages/core/src/Tooltip/index.ts
* - /apps/storybook/stories/Tooltip.stories.tsx
* - /packages/cli/assets/templates/blocks/components/Tooltip/ (showcase blocks)
*/
var Tooltip_exports = /* @__PURE__ */ __exportAll({ Tooltip: () => Tooltip });
/**
* Check if children are text-only (no React elements)
*/
function isTextOnly(children) {
	return typeof children === "string" || typeof children === "number";
}
/**
* Utility to merge ARIA ID strings
*/
function mergeIds(...ids) {
	const filtered = ids.filter(Boolean);
	return filtered.length > 0 ? filtered.join(" ") : void 0;
}
/**
* Tooltip component for displaying informative text on hover/focus.
*
* Uses inverted colors (dark background, light text) for high contrast.
* Uses a display:contents wrapper so children refs are preserved.
* Uses CSS anchor positioning and the Popover API for optimal performance.
*
* @example
* ```
* <Tooltip content="Helpful tooltip text" placement="above">
*   <Button>Hover me</Button>
* </Tooltip>
* ```
*/
function Tooltip({ children, anchorRef, content, placement = "above", alignment = "center", delay = 200, hideDelay = 0, focusTrigger = "auto", touchTrigger = "auto", isEnabled = true, onOpenChange, hasHoverIndication = "auto", isOpen, isDefaultOpen }) {
	const wrapperRef = (0, import_react.useRef)(null);
	const textOnly = children != null ? isTextOnly(children) : false;
	const showHoverIndication = hasHoverIndication === true || hasHoverIndication === "auto" && textOnly;
	const tooltip = useTooltip({
		placement,
		alignment,
		delay,
		hideDelay,
		focusTrigger,
		touchTrigger,
		isEnabled,
		isOpen,
		isDefaultOpen,
		onShow: (0, import_react.useCallback)(() => {
			onOpenChange?.(true);
		}, [onOpenChange]),
		onHide: (0, import_react.useCallback)(() => {
			onOpenChange?.(false);
		}, [onOpenChange])
	});
	useIsomorphicLayoutEffect(() => {
		if (!anchorRef) return;
		const attach = (el) => {
			tooltip.ref(el);
			const existingDescribedBy = el.getAttribute("aria-describedby");
			el.setAttribute("aria-describedby", mergeIds(existingDescribedBy, tooltip.describedBy) ?? "");
			return () => {
				tooltip.ref(null);
				if (existingDescribedBy) el.setAttribute("aria-describedby", existingDescribedBy);
				else el.removeAttribute("aria-describedby");
			};
		};
		const el = anchorRef.current;
		if (el) return attach(el);
		let detach;
		let cancelled = false;
		queueMicrotask(() => {
			if (cancelled) return;
			const el = anchorRef.current;
			if (el) detach = attach(el);
		});
		return () => {
			cancelled = true;
			detach?.();
		};
	}, [
		anchorRef,
		tooltip.ref,
		tooltip.describedBy
	]);
	useIsomorphicLayoutEffect(() => {
		if (anchorRef) return;
		if (textOnly) return;
		const wrapper = wrapperRef.current;
		if (!wrapper) return;
		const firstChild = wrapper.firstElementChild;
		if (!firstChild) return;
		tooltip.ref(firstChild);
		const existingDescribedBy = firstChild.getAttribute("aria-describedby");
		firstChild.setAttribute("aria-describedby", mergeIds(existingDescribedBy, tooltip.describedBy) ?? "");
		return () => {
			tooltip.ref(null);
			if (existingDescribedBy) firstChild.setAttribute("aria-describedby", existingDescribedBy);
			else firstChild.removeAttribute("aria-describedby");
		};
	}, [
		anchorRef,
		textOnly,
		tooltip.ref,
		tooltip.describedBy
	]);
	if (anchorRef && children == null) return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: tooltip.renderTooltip(content) });
	if (textOnly) return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/*#__PURE__*/ (0, import_jsx_runtime.jsx)("span", {
		ref: tooltip.ref,
		tabIndex: 0,
		"aria-describedby": tooltip.describedBy,
		...{
			0: { className: "xt0psk2" },
			1: { className: "xt0psk2 xujl8zx xev0dqp xycaml9 xrys4gj" }
		}[!!showHoverIndication << 0],
		children
	}), tooltip.renderTooltip(content)] });
	return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
		ref: wrapperRef,
		className: "xjp7ctv",
		children
	}), tooltip.renderTooltip(content)] });
}
Tooltip.displayName = "Tooltip";
//#endregion
//#region node_modules/@astryxdesign/core/dist/Link/computeTargetAndRel.js
/**
* @file computeTargetAndRel.ts
* @input Link target and rel values
* @output Exports helper for normalizing target/rel link props
* @position Internal utility; consumed by link-rendering components
*/
var BLANK_TARGET_REL_TOKENS = ["noopener", "noreferrer"];
function computeTargetAndRel(target, rel) {
	if (target !== "_blank") return {
		target,
		rel
	};
	const tokens = rel?.split(/\s+/).filter(Boolean) ?? [];
	for (const token of BLANK_TARGET_REL_TOKENS) if (!tokens.includes(token)) tokens.push(token);
	return {
		target,
		rel: tokens.join(" ")
	};
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/hooks/isRtlElement.js
/**
* @file isRtlElement.ts
* @input DOM element (nullable)
* @output Exports isRtlElement helper resolving an element's computed text
*   direction
* @position Internal hook utility; used by useListFocus and useGridFocus to
*   auto-detect RTL for arrow-key navigation (same getComputedStyle precedent
*   as Resizable's ResizeHandle drag deltas).
*/
/**
* Whether `el` renders right-to-left, per its computed `direction`.
*
* SSR-safe: returns false when `el` is null or no DOM is available. Callers
* should invoke this lazily (on keydown, not on render) so getComputedStyle
* runs only when a horizontal arrow key is actually handled.
*/
function isRtlElement(el) {
	if (!el || typeof window === "undefined") return false;
	return window.getComputedStyle(el).direction === "rtl";
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/hooks/useListFocus.js
/**
* @file useListFocus.ts
* @input Uses React useCallback, useRef, useIsomorphicLayoutEffect,
*   isRtlElement
* @output Exports useListFocus hook for linear list keyboard navigation
* @position Core hook; used by TabMenu for dropdown menu navigation, Toolbar
*   for roving tabindex, ButtonGroup, ContextMenu, NavHeadingMenu, and more.
*   Auto-detects RTL from the container's computed direction so horizontal
*   arrow keys follow visual direction (WCAG 1.3.2).
*
* SYNC: When modified, update:
* - /packages/core/src/hooks/index.ts
* - /packages/core/src/hooks/useListFocus.doc.mjs
* - /packages/core/src/hooks/useListFocus.test.tsx
*/
/**
* Navigation orientation for a linear list.
* - `'horizontal'`: ArrowLeft/ArrowRight move between items.
* - `'vertical'`: ArrowUp/ArrowDown move between items.
* - `'both'`: all four arrows move between items (in linear DOM order).
*/
/**
* Configuration for list focus behavior
*/
/**
* Return type for useListFocus hook
*/
var TEXT_INPUT_TYPES = /* @__PURE__ */ new Set([
	"text",
	"search",
	"url",
	"tel",
	"email",
	"password",
	"number"
]);
/**
* Whether `el` sits under a `hidden` or `inert` ancestor that is itself inside
* `listEl` (the list's own state is not consulted). Such a row cannot take
* focus — a drilled-in menu hides the rows a view replaced — so it
* leaves the roving order and the typeahead.
*/
function isHiddenWithin(el, listEl) {
	const hidden = el.parentElement?.closest("[hidden],[inert]");
	return hidden != null && hidden !== listEl && listEl.contains(hidden);
}
/**
* The nearest `contenteditable` root for `el`, or null when `el` is not inside
* an editable region. Prefers the browser's `isContentEditable` property and
* falls back to the closest `[contenteditable]` ancestor whose value is not
* `"false"` (so environments without `isContentEditable` still work).
*/
function getContentEditableRoot(el) {
	if (el.isContentEditable) return el;
	const candidate = el.closest("[contenteditable]");
	if (candidate && candidate.getAttribute("contenteditable") !== "false") return candidate;
	return null;
}
/**
* Whether an arrow/Home/End key should be left to the browser because the
* event target is a text-editing element whose caret is not yet at the boundary
* in the direction of travel (or a selection is present). Returns true when the
* list should NOT steal the key.
*
* Covers three editing surfaces:
* - `<textarea>` and text-type `<input>` — use `selectionStart`/`selectionEnd`
*   to steal only at the boundary in the travel direction.
* - `contenteditable` (rich-text editor / chat composer) — precise caret
*   boundary detection in an arbitrary editable subtree is fragile, so we err
*   on the side of never hijacking an active editor: defer on every caret key
*   whenever focus is inside a non-empty contenteditable. (An empty editable
*   has nothing to caret through, so navigation may proceed.)
*/
function shouldDeferToCaret(target, key) {
	if (!(target instanceof HTMLElement)) return false;
	const editableRoot = getContentEditableRoot(target);
	if (editableRoot) {
		const selection = typeof window !== "undefined" ? window.getSelection() : null;
		if (selection && selection.rangeCount > 0 && !selection.isCollapsed) return true;
		return (editableRoot.textContent ?? "").length > 0;
	}
	const isTextarea = target.tagName === "TEXTAREA";
	const isTextInput = target.tagName === "INPUT" && TEXT_INPUT_TYPES.has(target.type);
	if (!isTextarea && !isTextInput) return false;
	const { selectionStart, selectionEnd, value } = target;
	if (selectionStart !== selectionEnd) return true;
	if (selectionStart == null) return true;
	if (key === "ArrowLeft" || key === "ArrowUp" || key === "Home") return selectionStart > 0;
	if (key === "ArrowRight" || key === "ArrowDown" || key === "End") return selectionStart < value.length;
	return false;
}
/**
* Hook for managing keyboard navigation within a linear list.
*
* Implements WAI-ARIA menu/listbox/toolbar pattern:
* - ArrowDown/ArrowRight: Move to next item (wraps to first)
* - ArrowUp/ArrowLeft: Move to previous item (wraps to last)
* - Home: Move to first item
* - End: Move to last item
* - Escape: runs `onEscape` and consumes the key. With no `onEscape` the key
*   is left alone, so a surrounding layer can still dismiss on it.
*
* By default the hook only *moves* focus and leaves `tabindex` management to
* the caller. Opt into {@link UseListFocusOptions.hasRovingTabIndex} for a hook
* that owns a single tab stop (roving tabindex) across the items — stamping and
* repairing it as items mount/unmount or toggle disabled — for toolbars,
* segmented controls, tab strips, and similar composite widgets.
*
* @example
* ```
* const {listRef, handleKeyDown} = useListFocus({
*   onEscape: () => layer.hide(),
* });
*
* <div ref={listRef} role="menu" onKeyDown={handleKeyDown}>
*   {items.map(item => <div role="menuitem" tabIndex={0}>{item}</div>)}
* </div>
* ```
*
* Roving-tabindex composite (e.g. a toolbar):
*
* @example
* ```
* const {listRef, handleKeyDown, handleFocus} = useListFocus<HTMLDivElement>({
*   itemSelector: 'button, input, [tabindex]',
*   orientation: 'horizontal',
*   hasRovingTabIndex: true,
*   hasCaretGuard: true,
* });
*
* <div ref={listRef} role="toolbar" onKeyDown={handleKeyDown} onFocus={handleFocus}>
*   {children}
* </div>
* ```
*/
function useListFocus(options = {}) {
	const { itemSelector = "[role=\"menuitem\"]", boundarySelector, wrap = true, onEscape, orientation = "vertical", hasHomeEnd = true, hasPaging = false, hasRovingTabIndex = false, hasCaretGuard = false } = options;
	const listRef = (0, import_react.useRef)(null);
	/**
	* Whether an item is disabled and therefore cannot receive DOM focus.
	* A `.focus()` call on such an element silently no-ops, so navigation must
	* skip these to avoid freezing on a disabled item (menus-4, navigation-5).
	*/
	const isItemDisabled = (0, import_react.useCallback)((el) => {
		return el.getAttribute("aria-disabled") === "true" || el.disabled === true || el.hasAttribute("disabled");
	}, []);
	/**
	* Get all focusable items in the list.
	*/
	const getItems = (0, import_react.useCallback)(() => {
		const listEl = listRef.current;
		if (!listEl) return [];
		const matched = Array.from(listEl.querySelectorAll(itemSelector)).filter((el) => !isHiddenWithin(el, listEl));
		if (!boundarySelector) return matched;
		return matched.filter((el) => el.closest(boundarySelector) === listEl);
	}, [itemSelector, boundarySelector]);
	/**
	* Whether a key event belongs to this list level rather than a nested list.
	* With a boundary set, an event that originated inside a nested boundary
	* (e.g. a submenu flyout) has bubbled up to us and must be ignored so we
	* don't double-handle navigation. Without a boundary, every event is ours.
	*/
	const ownsEvent = (0, import_react.useCallback)((e) => {
		const listEl = listRef.current;
		if (!listEl || !boundarySelector) return true;
		const target = e.target;
		if (!target) return true;
		return target.closest(boundarySelector) === listEl;
	}, [boundarySelector]);
	/**
	* Find the next enabled item index from `start`, moving by `step`, optionally
	* wrapping. Returns -1 when no enabled item exists in range. Skipping
	* disabled items here (rather than relying on the selector) keeps navigation
	* from stalling on an item whose `.focus()` silently no-ops.
	*/
	const findEnabledIndex = (0, import_react.useCallback)((items, start, step, shouldWrap) => {
		const count = items.length;
		if (count === 0) return -1;
		let index = start;
		for (let i = 0; i < count; i++) {
			if (index < 0 || index >= count) {
				if (!shouldWrap) return -1;
				index = (index + count) % count;
			}
			const item = items[index];
			if (item && !isItemDisabled(item)) return index;
			index += step;
		}
		return -1;
	}, [isItemDisabled]);
	/**
	* Get the currently focused item index.
	*/
	const getCurrentIndex = (0, import_react.useCallback)(() => {
		const items = getItems();
		const active = document.activeElement;
		return items.findIndex((item) => item === active || item.contains(active));
	}, [getItems]);
	/**
	* Set `tabindex` on an item, but only when it differs (avoids redundant DOM
	* writes). Uses setAttribute so the value reflects even for elements (like
	* `<button>`) whose default tabIndex is already 0.
	*/
	const setTabIndex = (0, import_react.useCallback)((el, value) => {
		if (el.getAttribute("tabindex") !== String(value)) el.setAttribute("tabindex", String(value));
	}, []);
	/**
	* Stamp the roving tab stop: exactly one enabled item is tabbable (0), the
	* rest are -1. Prefer keeping the currently-tabbable item if it is still
	* enabled; otherwise promote the first enabled item (tab-stop repair).
	*/
	const syncTabStops = (0, import_react.useCallback)(() => {
		const items = getItems();
		const enabled = items.filter((el) => !isItemDisabled(el));
		if (enabled.length === 0) return;
		const tabbable = enabled.find((el) => el.getAttribute("tabindex") === "0") ?? enabled[0];
		for (const el of items) setTabIndex(el, el === tabbable ? 0 : -1);
	}, [
		getItems,
		isItemDisabled,
		setTabIndex
	]);
	useIsomorphicLayoutEffect(() => {
		if (hasRovingTabIndex) syncTabStops();
	});
	/**
	* Move focus to `items[index]`. When roving tabindex is enabled, also move
	* the tab stop so `index` becomes the sole tabbable item.
	*/
	const focusIndex = (0, import_react.useCallback)((items, index) => {
		const target = items[index];
		if (!target) return;
		if (hasRovingTabIndex) for (const el of items) setTabIndex(el, el === target ? 0 : -1);
		target.focus();
	}, [hasRovingTabIndex, setTabIndex]);
	/**
	* Focus an item by index, clamping to valid range.
	*/
	const focusItem = (0, import_react.useCallback)((index) => {
		const items = getItems();
		if (items.length === 0) return;
		const clampedIndex = Math.max(0, Math.min(index, items.length - 1));
		focusIndex(items, clampedIndex);
	}, [getItems, focusIndex]);
	/**
	* Focus the first enabled item. Returns true when an item was focused.
	*/
	const focusFirst = (0, import_react.useCallback)(() => {
		const items = getItems();
		const index = findEnabledIndex(items, 0, 1, false);
		if (index !== -1) {
			focusIndex(items, index);
			return true;
		}
		return false;
	}, [
		getItems,
		findEnabledIndex,
		focusIndex
	]);
	/**
	* Focus the last enabled item. Returns true when an item was focused.
	*/
	const focusLast = (0, import_react.useCallback)(() => {
		const items = getItems();
		const index = findEnabledIndex(items, items.length - 1, -1, false);
		if (index !== -1) {
			focusIndex(items, index);
			return true;
		}
		return false;
	}, [
		getItems,
		findEnabledIndex,
		focusIndex
	]);
	/**
	* PageDown / PageUp: move to the last / first enabled item fully
	* visible in the scrolling container. Pressed there again, scroll one
	* viewport further and land on the last / first item then visible. Never
	* wraps; at the end of the list it stays on the last enabled item.
	*/
	const focusPage = (0, import_react.useCallback)((direction) => {
		const container = listRef.current;
		const items = getItems();
		if (!container || items.length === 0) return;
		const currentIndex = getCurrentIndex();
		const enabledIndices = items.map((item, index) => isItemDisabled(item) ? -1 : index).filter((index) => index !== -1);
		if (enabledIndices.length === 0) return;
		const edgeVisible = () => {
			const bounds = container.getBoundingClientRect();
			const visible = enabledIndices.filter((index) => {
				const rect = items[index].getBoundingClientRect();
				return rect.top >= bounds.top - 1 && rect.bottom <= bounds.bottom + 1;
			});
			if (visible.length === 0) return -1;
			return direction === 1 ? visible[visible.length - 1] : visible[0];
		};
		const isAhead = (index) => currentIndex === -1 || (direction === 1 ? index > currentIndex : index < currentIndex);
		if (currentIndex === -1 && direction === -1) {
			focusFirst();
			return;
		}
		let target = edgeVisible();
		if (target === -1 || !isAhead(target)) {
			container.scrollTop = container.scrollTop + direction * container.clientHeight;
			target = edgeVisible();
			if (target === -1 || !isAhead(target)) {
				const pageSize = Math.max(1, enabledIndices.filter((index) => {
					const bounds = container.getBoundingClientRect();
					const rect = items[index].getBoundingClientRect();
					return rect.height > 0 && rect.top >= bounds.top - 1 && rect.bottom <= bounds.bottom + 1;
				}).length);
				const position = enabledIndices.indexOf(currentIndex);
				const from = position === -1 ? direction === 1 ? -1 : enabledIndices.length : position;
				target = enabledIndices[Math.max(0, Math.min(enabledIndices.length - 1, from + direction * pageSize))];
			}
		}
		if (target !== -1 && target !== currentIndex) focusIndex(items, target);
	}, [
		getItems,
		getCurrentIndex,
		isItemDisabled,
		focusIndex,
		focusFirst
	]);
	/**
	* Keep the roving stop pointing at whatever ended up focused (e.g. a click
	* or programmatic focus) so the next Tab behaves correctly. No-op unless
	* roving tabindex is enabled.
	*/
	const handleFocus = (0, import_react.useCallback)(() => {
		if (hasRovingTabIndex) syncTabStops();
	}, [hasRovingTabIndex, syncTabStops]);
	return {
		listRef,
		handleKeyDown: (0, import_react.useCallback)((e) => {
			if (e.ctrlKey || e.metaKey || e.altKey) return;
			if (!ownsEvent(e)) return;
			if (e.key === "Escape") {
				if (onEscape) {
					e.preventDefault();
					onEscape();
				}
				return;
			}
			const horizontal = orientation === "horizontal" || orientation === "both";
			const vertical = orientation === "vertical" || orientation === "both";
			const nextKeys = [];
			const prevKeys = [];
			if (horizontal) {
				const rtl = e.key === "ArrowLeft" || e.key === "ArrowRight" ? isRtlElement(listRef.current) : false;
				nextKeys.push(rtl ? "ArrowLeft" : "ArrowRight");
				prevKeys.push(rtl ? "ArrowRight" : "ArrowLeft");
			}
			if (vertical) {
				nextKeys.push("ArrowDown");
				prevKeys.push("ArrowUp");
			}
			const isNext = nextKeys.includes(e.key);
			const isPrev = prevKeys.includes(e.key);
			const isHome = hasHomeEnd && e.key === "Home";
			const isEnd = hasHomeEnd && e.key === "End";
			const isPageDown = hasPaging && e.key === "PageDown";
			const isPageUp = hasPaging && e.key === "PageUp";
			if (!isNext && !isPrev && !isHome && !isEnd && !isPageDown && !isPageUp) return;
			if (hasCaretGuard && (shouldDeferToCaret(e.target, e.key) || shouldDeferToCaret(document.activeElement, e.key))) return;
			const currentIndex = getCurrentIndex();
			const items = getItems();
			if (isNext) {
				const from = currentIndex === -1 ? 0 : currentIndex + 1;
				const next = findEnabledIndex(items, from, 1, wrap);
				if (next !== -1) focusIndex(items, next);
			} else if (isPrev) {
				const from = currentIndex === -1 ? items.length - 1 : currentIndex - 1;
				const prev = findEnabledIndex(items, from, -1, wrap);
				if (prev !== -1) focusIndex(items, prev);
			} else if (isHome) focusFirst();
			else if (isEnd) focusLast();
			else if (isPageDown) focusPage(1);
			else if (isPageUp) focusPage(-1);
			e.preventDefault();
		}, [
			getCurrentIndex,
			getItems,
			wrap,
			orientation,
			hasHomeEnd,
			hasPaging,
			hasCaretGuard,
			findEnabledIndex,
			focusIndex,
			focusFirst,
			focusLast,
			focusPage,
			onEscape,
			ownsEvent
		]),
		handleFocus,
		focusItem,
		focusFirst,
		focusLast,
		ownsEvent,
		getItems
	};
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/hooks/useMenuHover.js
/**
* @file useMenuHover.ts
* @input Uses React hooks, useListFocus, useMediaQuery
* @output Exports useMenuHover hook
* @position Internal hook; used by nav heading components, TopNavMenu,
*           TopNavMegaMenu and DropdownMenuSubMenu
*
* Hover as a progressive enhancement over standard popover behavior: click
* toggles, Escape and outside-click close, arrows navigate; on top of that,
* mouseenter opens after a delay and mouseleave closes one that hover opened.
*
* Three behaviors here are not obvious and are load-bearing:
*
* 1. Hover→click guard (#3121). A hover-opened menu is already open under the
*    cursor when the pointer arrives, so the click that naturally follows would
*    toggle it shut. Within `clickGuardMs` a click instead confirms it: the menu
*    pins and behaves like a click-open from then on.
*
* 2. Focus moves synchronously. `useLayer.show()` calls `showPopover()` in the
*    same tick and the layer's children are always mounted, so items are
*    focusable the moment `show()` returns — a `requestAnimationFrame` here
*    lands after paint and races anything else moving focus. Hover-opens are the
*    exception: the pointer is driving, so focus stays on the trigger. The hook
*    always passes `skipAutoFocus` and owns focus itself, because the popover's
*    auto-focus targets the first *tabbable* node while a menu wants its first
*    item — under roving tabindex those are different elements.
*
* 3. Native light dismiss. A `popover="auto"` is dismissed by the browser on
*    pointer interaction outside the panel, and a trigger outside the panel
*    counts — before React's click handler runs. `popoverId` makes the trigger
*    the panel's invoker, which exempts it. jsdom implements neither light
*    dismiss nor invokers, so that wiring is only verifiable in a browser.
*/
var DEFAULT_CLICK_GUARD_MS = 500;
/**
* How long after a close a mouseenter on the trigger is ignored.
*
* A panel positioned over its own trigger puts that trigger back under a
* stationary pointer when it closes, and the browser fires a fresh mouseenter —
* which reopened the menu the user had just dismissed. Time-bounded rather than
* a one-shot flag, so a deliberate re-hover seconds later still opens; a real
* mouseleave clears it early.
*/
var REOPEN_SUPPRESS_MS = 300;
/**
* Slack added to the flyout's near edge when building the safe triangle, so a
* pointer skimming the edge's corners still counts as heading for the flyout.
*/
var SAFE_TRIANGLE_PADDING_PX = 8;
function sign(p1, p2, p3) {
	return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
}
function isPointInTriangle(p, a, b, c) {
	const d1 = sign(p, a, b);
	const d2 = sign(p, b, c);
	const d3 = sign(p, c, a);
	return !((d1 < 0 || d2 < 0 || d3 < 0) && (d1 > 0 || d2 > 0 || d3 > 0));
}
/**
* Whether `point` lies inside the safe triangle from `origin` (where the
* pointer left the trigger row) to the flyout's NEAR edge — the edge of
* `flyout` facing the origin. A pointer travelling inside it is heading for
* the flyout, so the flyout must stay open. Exported for unit tests.
*/
function isPointInSafeTriangle(point, origin, flyout) {
	const pad = SAFE_TRIANGLE_PADDING_PX;
	let edgeStart;
	let edgeEnd;
	if (origin.x <= flyout.left) {
		edgeStart = {
			x: flyout.left,
			y: flyout.top - pad
		};
		edgeEnd = {
			x: flyout.left,
			y: flyout.bottom + pad
		};
	} else if (origin.x >= flyout.right) {
		edgeStart = {
			x: flyout.right,
			y: flyout.top - pad
		};
		edgeEnd = {
			x: flyout.right,
			y: flyout.bottom + pad
		};
	} else if (origin.y <= flyout.top) {
		edgeStart = {
			x: flyout.left - pad,
			y: flyout.top
		};
		edgeEnd = {
			x: flyout.right + pad,
			y: flyout.top
		};
	} else if (origin.y >= flyout.bottom) {
		edgeStart = {
			x: flyout.left - pad,
			y: flyout.bottom
		};
		edgeEnd = {
			x: flyout.right + pad,
			y: flyout.bottom
		};
	} else return false;
	return isPointInTriangle(point, origin, edgeStart, edgeEnd);
}
function useMenuHover(options) {
	const { show, hide, isOpen, isEnabled, showDelay = 150, hideDelay = 200, clickGuardMs = DEFAULT_CLICK_GUARD_MS, itemSelector, popoverId, ownsFocus = true, flyoutRef } = options;
	const hasHover = useMediaQuery("(hover: hover)");
	const showTimerRef = (0, import_react.useRef)(null);
	const hideTimerRef = (0, import_react.useRef)(null);
	const triggerElRef = (0, import_react.useRef)(null);
	/** Removes the document pointer listener that watches the safe triangle. */
	const safeTriangleCleanupRef = (0, import_react.useRef)(null);
	/** Menu was hover-opened, so mouseleave may close it. */
	const hoverModeRef = (0, import_react.useRef)(false);
	const closedAtRef = (0, import_react.useRef)(0);
	/** When the current open began as a hover-open; 0 once confirmed or closed. */
	const hoverOpenedAtRef = (0, import_react.useRef)(0);
	const prevIsOpenRef = (0, import_react.useRef)(isOpen);
	const clearTimeouts = (0, import_react.useCallback)(() => {
		if (showTimerRef.current) {
			clearTimeout(showTimerRef.current);
			showTimerRef.current = null;
		}
		if (hideTimerRef.current) {
			clearTimeout(hideTimerRef.current);
			hideTimerRef.current = null;
		}
		safeTriangleCleanupRef.current?.();
		safeTriangleCleanupRef.current = null;
	}, []);
	useIsomorphicLayoutEffect(() => {
		const wasOpen = prevIsOpenRef.current;
		prevIsOpenRef.current = isOpen;
		if (wasOpen && !isOpen) {
			clearTimeouts();
			hoverModeRef.current = false;
			hoverOpenedAtRef.current = 0;
			closedAtRef.current = Date.now();
		}
	}, [isOpen, clearTimeouts]);
	const escapeHandlerRef = (0, import_react.useRef)(() => {});
	const { listRef: menuRef, handleKeyDown: handleListKeyDown, focusFirst } = useListFocus({
		itemSelector,
		onEscape: () => escapeHandlerRef.current()
	});
	const hideAndRestoreFocus = (0, import_react.useCallback)(() => {
		const menuHadFocus = menuRef.current?.contains(document.activeElement) ?? false;
		hide();
		if (menuHadFocus) triggerElRef.current?.focus();
	}, [hide, menuRef]);
	(0, import_react.useEffect)(() => {
		escapeHandlerRef.current = () => {
			clearTimeouts();
			hideAndRestoreFocus();
		};
	}, [clearTimeouts, hideAndRestoreFocus]);
	(0, import_react.useEffect)(() => {
		return () => clearTimeouts();
	}, [clearTimeouts]);
	(0, import_react.useEffect)(() => {
		if (!isEnabled) clearTimeouts();
	}, [isEnabled, clearTimeouts]);
	const focusMenu = (0, import_react.useCallback)(() => {
		if (!focusFirst()) menuRef.current?.focus();
	}, [focusFirst, menuRef]);
	const openAndFocus = (0, import_react.useCallback)(() => {
		if (!ownsFocus) {
			show();
			return;
		}
		show({ skipAutoFocus: true });
		focusMenu();
	}, [
		ownsFocus,
		show,
		focusMenu
	]);
	const confirmHoverOpen = (0, import_react.useCallback)(() => {
		if (!(clickGuardMs > 0 && hoverOpenedAtRef.current > 0 && Date.now() - hoverOpenedAtRef.current < clickGuardMs)) return false;
		hoverModeRef.current = false;
		hoverOpenedAtRef.current = 0;
		return true;
	}, [clickGuardMs]);
	const handleClick = (0, import_react.useCallback)((event) => {
		if (popoverId) event?.preventDefault();
		clearTimeouts();
		if (event != null && event.detail === 0) {
			closedAtRef.current = 0;
			hoverModeRef.current = false;
			hoverOpenedAtRef.current = 0;
			if (isOpen) {
				if (ownsFocus) focusMenu();
			} else openAndFocus();
			return;
		}
		if (!isOpen) {
			closedAtRef.current = 0;
			hoverModeRef.current = false;
			hoverOpenedAtRef.current = 0;
			openAndFocus();
			return;
		}
		if (confirmHoverOpen()) {
			if (ownsFocus) focusMenu();
			return;
		}
		hideAndRestoreFocus();
	}, [
		popoverId,
		clearTimeouts,
		isOpen,
		ownsFocus,
		confirmHoverOpen,
		openAndFocus,
		focusMenu,
		hideAndRestoreFocus
	]);
	const handleMouseEnter = (0, import_react.useCallback)(() => {
		if (!hasHover) return;
		if (closedAtRef.current > 0 && Date.now() - closedAtRef.current < REOPEN_SUPPRESS_MS) return;
		if (isOpen) {
			clearTimeouts();
			return;
		}
		hoverModeRef.current = true;
		clearTimeouts();
		const openByHover = () => {
			hoverOpenedAtRef.current = Date.now();
			show({ skipAutoFocus: true });
		};
		if (showDelay > 0) showTimerRef.current = setTimeout(openByHover, showDelay);
		else openByHover();
	}, [
		hasHover,
		isOpen,
		clearTimeouts,
		show,
		showDelay
	]);
	const handleMouseLeave = (0, import_react.useCallback)((event) => {
		closedAtRef.current = 0;
		if (!hoverModeRef.current) return;
		clearTimeouts();
		let lastPoint = null;
		let isTracking = false;
		let isInside = () => false;
		const scheduleHide = () => {
			if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
			hideTimerRef.current = setTimeout(() => {
				if (isTracking && lastPoint != null && isInside(lastPoint)) {
					scheduleHide();
					return;
				}
				hide();
			}, hideDelay);
		};
		scheduleHide();
		const menu = flyoutRef?.current ?? menuRef.current;
		const apex = event != null ? {
			x: event.clientX,
			y: event.clientY
		} : null;
		if (menu == null || apex == null || !isOpen) return;
		const rect = menu.getBoundingClientRect();
		if (rect.width <= 0 || rect.height <= 0) return;
		const doc = menu.ownerDocument;
		isInside = (point) => isPointInSafeTriangle(point, apex, rect);
		isTracking = true;
		lastPoint = apex;
		const onPointerMove = (move) => {
			const point = {
				x: move.clientX,
				y: move.clientY
			};
			lastPoint = point;
			if (isInside(point)) {
				scheduleHide();
				return;
			}
			isTracking = false;
			safeTriangleCleanupRef.current?.();
			safeTriangleCleanupRef.current = null;
		};
		doc.addEventListener("pointermove", onPointerMove, true);
		safeTriangleCleanupRef.current = () => {
			doc.removeEventListener("pointermove", onPointerMove, true);
		};
	}, [
		clearTimeouts,
		hide,
		hideDelay,
		isOpen,
		menuRef,
		flyoutRef
	]);
	const handleContentMouseEnter = (0, import_react.useCallback)(() => {
		clearTimeouts();
	}, [clearTimeouts]);
	const setTriggerRef = (0, import_react.useCallback)((el) => {
		triggerElRef.current = el;
	}, []);
	const noop = (0, import_react.useCallback)(() => {}, []);
	const noopRef = (0, import_react.useCallback)((_el) => {}, []);
	const noopKeyDown = (0, import_react.useCallback)((_e) => {}, []);
	if (!isEnabled) return {
		triggerProps: {
			onClick: noop,
			onMouseEnter: noop,
			onMouseLeave: noop
		},
		contentProps: {
			onMouseEnter: noop,
			onMouseLeave: noop,
			onKeyDown: noopKeyDown
		},
		menuRef,
		focusFirst,
		focusMenu,
		confirmHoverOpen,
		close: hideAndRestoreFocus,
		setTriggerEl: noopRef
	};
	return {
		triggerProps: {
			onClick: handleClick,
			onMouseEnter: handleMouseEnter,
			onMouseLeave: handleMouseLeave,
			...popoverId ? { popoverTarget: popoverId } : null
		},
		contentProps: {
			onMouseEnter: handleContentMouseEnter,
			onMouseLeave: handleMouseLeave,
			onKeyDown: handleListKeyDown
		},
		menuRef,
		focusFirst,
		focusMenu,
		confirmHoverOpen,
		close: hideAndRestoreFocus,
		setTriggerEl: setTriggerRef
	};
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/NavItem/navItemStyles.stylex.js
/**
* Base styles shared by all nav item components.
* Apply as a foundation and override specific properties as needed.
*
* @example
* ```
* import {navItemStyles} from '@astryxdesign/core/navItemStyles';
*
* const styles = stylex.create({
*   indented: { paddingInlineStart: spacingVars['--spacing-6'] },
* });
*
* <a {...stylex.props(navItemStyles.item, styles.indented)}>
*   Dashboard
* </a>
* ```
*/
var navItemStyles = {
	item: {
		k1xSpc: "x78zum5",
		kGNEyG: "x6s0dn4",
		kOIVth: "x1txdalj",
		kzqmXN: "xh8yej3",
		kZKoxP: "x1ueg155",
		kg3NbH: "xf314gf",
		k8WAf4: "xt970qd",
		kaIpWk: "xh6dtrn",
		kMzoRj: "xc342km",
		ksu8eU: "xng3xce",
		kWkggS: "xjbqb8w",
		kMwMTN: "x1tgivj0",
		kybGjl: "x1hl2dhg",
		kkrTdU: "x1ypdohk x16khyan",
		kMv6JI: "xjb2p0i",
		kGuDYH: "xcr08ib",
		k63SB2: "x1sodnla",
		kLWn49: "x1kq96og",
		k9WMMc: "x1yc453h",
		kB7OPa: "x9f619",
		$$css: true
	},
	selected: {
		kWkggS: "x17x4s8c x1jzqe4",
		kMwMTN: "x1k5gbb1",
		k63SB2: "x1e4wzip",
		kRL5z6: "xcu6dpe x1d42zcn",
		kSReZ0: "xjtnuge x1vo6n7o",
		kNWwhB: "x7qqc7o x1r4mieh",
		kCVruK: "x1bev2v5",
		kjMJ7V: "xf3x42i x1pjcgc3",
		kSPMfz: "x524tya",
		$$css: true
	},
	disabled: {
		kMwMTN: "xnbbluu",
		kkrTdU: "xt0e3qv",
		kfzvcC: "x47corl",
		$$css: true
	},
	sm: {
		kZKoxP: "x6k0iem",
		kg3NbH: "x7a5moj",
		$$css: true
	},
	md: {
		kZKoxP: "x1ueg155",
		kg3NbH: "xf314gf",
		$$css: true
	},
	lg: {
		kZKoxP: "xssyfek",
		kg3NbH: "xf314gf",
		$$css: true
	}
};
//#endregion
//#region node_modules/@astryxdesign/core/dist/Stack/Stack.js
/**
* @file Stack.tsx
* @input Uses React, ElementType, stack utility
* @output Exports Stack polymorphic component and StackProps
* @position Layout/Stack component; uses stack.stylex.ts
*
* SYNC: When modified, update these files to stay in sync:
* - /packages/core/src/Stack/Stack.doc.mjs
* - /apps/storybook/stories/Stack.stories.tsx
* - /packages/cli/assets/templates/blocks/components/Stack/ (showcase blocks)
*/
var overflowStyles = { scrollable: {
	kVQacm: "xysyzu8",
	$$css: true
} };
/**
* Alignment values accepted by Stack.
*
* The full union of main-axis and cross-axis alignment values.
* Which values are valid depends on direction and axis:
* - Main axis (hAlign for horizontal, vAlign for vertical):
*   `'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'`
* - Cross axis (vAlign for horizontal, hAlign for vertical):
*   `'start' | 'center' | 'end' | 'stretch'`
*/
/**
* Unified stack component for arranging items in a horizontal or vertical layout.
*
* Replaces `HStack` and `VStack` with a single component that accepts
* a `direction` prop. Defaults to `'vertical'` since most layouts stack
* top-to-bottom.
*
* The `hAlign` and `vAlign` props automatically map to the correct CSS axis
* based on the direction:
* - `direction='horizontal'`: hAlign → justify-content, vAlign → align-items
* - `direction='vertical'`: hAlign → align-items, vAlign → justify-content
*
* @example
* ```
* <Stack gap={2}>
*   <Item />
*   <Item />
* </Stack>
* <Stack direction="horizontal" gap={4} vAlign="center">
*   <Item />
*   <Item />
* </Stack>
* ```
*/
function Stack({ direction = "vertical", hAlign, vAlign, justify, align, gap, padding, paddingInline, paddingInlineStart, paddingInlineEnd, paddingBlock, paddingBlockStart, paddingBlockEnd, isScrollable, width, height, maxWidth, minHeight, wrap, as: element = "div", xstyle, className, style, children, ref, ...props$9 }) {
	const resolvedHAlign = hAlign ?? (direction === "horizontal" ? justify : align);
	const resolvedVAlign = vAlign ?? (direction === "horizontal" ? align : justify);
	const mainAlign = direction === "horizontal" ? resolvedHAlign : resolvedVAlign;
	const crossAlign = direction === "horizontal" ? resolvedVAlign : resolvedHAlign;
	const resolvedPaddingInlineStart = paddingInlineStart ?? paddingInline ?? padding;
	const resolvedPaddingInlineEnd = paddingInlineEnd ?? paddingInline ?? padding;
	const resolvedPaddingBlockStart = paddingBlockStart ?? paddingBlock ?? padding;
	const resolvedPaddingBlockEnd = paddingBlockEnd ?? paddingBlock ?? padding;
	const stylexProps = props(...stack({
		direction,
		crossAlign,
		mainAlign,
		gap,
		wrap
	}), resolvedPaddingInlineStart != null && paddingInlineStartStyles[resolvedPaddingInlineStart], resolvedPaddingInlineEnd != null && paddingInlineEndStyles[resolvedPaddingInlineEnd], resolvedPaddingBlockStart != null && paddingBlockStartStyles[resolvedPaddingBlockStart], resolvedPaddingBlockEnd != null && paddingBlockEndStyles[resolvedPaddingBlockEnd], isScrollable && overflowStyles.scrollable, xstyle);
	const sizingStyle = {
		...width != null && { width: typeof width === "number" ? `${width}px` : width },
		...height != null && { height: typeof height === "number" ? `${height}px` : height },
		...maxWidth != null && { maxWidth: typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth },
		...minHeight != null && { minHeight: typeof minHeight === "number" ? `${minHeight}px` : minHeight }
	};
	return /*#__PURE__*/ (0, import_react.createElement)(element, {
		ref,
		...mergeProps(themeProps("stack", {
			direction,
			gap,
			wrap
		}), stylexProps, className, {
			...style,
			...sizingStyle
		}),
		...props$9
	}, children);
}
Stack.displayName = "Stack";
//#endregion
//#region node_modules/@astryxdesign/core/dist/VStack/VStack.js
/**
* @file VStack.tsx
* @input Uses Stack component
* @output Exports VStack as a thin wrapper around Stack
* @position Layout/Stack component; wraps Stack with direction='vertical'
*
* SYNC: When modified, update these files to stay in sync:
* - /packages/core/src/Stack/Stack.doc.mjs
* - /packages/core/src/VStack/VStack.test.tsx
* - /packages/cli/assets/templates/blocks/components/VStack/ (showcase blocks)
*/
/**
* Vertical stack component for arranging items top-to-bottom.
* Convenience wrapper around `Stack` with `direction="vertical"`.
*
* @example
* ```
* <VStack gap={2}>
*   <Item />
*   <Item />
* </VStack>
* ```
*/
function VStack({ ref, justify, align, hAlign, vAlign, ...props }) {
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Stack, {
		...props,
		direction: "vertical",
		hAlign: hAlign ?? align,
		vAlign: vAlign ?? justify,
		ref
	});
}
VStack.displayName = "VStack";
//#endregion
//#region node_modules/@astryxdesign/core/dist/Layout/container.stylex.js
/**
* Spacing token keys for padding props.
*/
var baseStyles = { container: {
	kB7OPa: "x9f619",
	kZCmMZ: "x1c35znw",
	kwRFfy: "x64h4k7",
	kLKAdn: "x14m0hsi",
	kGO01o: "xc1wllq",
	"--layout-padding-own-outer-x": "x1vii845",
	"--layout-padding-own-outer-y": "xojybgt",
	$$css: true
} };
/**
* Component-scoped padding tokens.
*
* Each container component (card, section, dialog, bottom-sheet, drawer) has
* public CSS custom properties that themes can set. The pipeline emits the `--astryx-*` names,
* which the component reads via `var(--astryx-…, …)`:
*
*   --astryx-card-padding          (shorthand — all sides)
*   --astryx-card-padding-inline
*   --astryx-card-padding-inline-start
*   --astryx-card-padding-inline-end
*   --astryx-card-padding-block-start
*   --astryx-card-padding-block-end
*
* The theme build pipeline maps `padding: '20px'` on a container component
* to these tokens. The component reads them with var() fallbacks to --spacing-4.
*
* This indirection exists because StyleX's useCSSLayers emits priority-0
* custom property assignments outside any @layer, making them impossible
* to override from @layer astryx-theme. By reading from a higher-level token,
* the theme CSS sets the token value and the component picks it up via
* CSS custom property cascade — no layer competition.
*/
var SP4 = spacingVars["--spacing-4"];
var cardShorthand = `var(--astryx-card-padding, ${SP4})`;
var cardInline = `var(--astryx-card-padding-inline, ${cardShorthand})`;
`${cardInline}`;
`${cardInline}`;
`${cardShorthand}`;
`${cardShorthand}`;
var sectionShorthand = `var(--_section-padding-propagated, ${`var(--astryx-section-padding, ${SP4})`})`;
var sectionInline = `var(--astryx-section-padding-inline, ${sectionShorthand})`;
`${sectionInline}`;
`${sectionInline}`;
`${sectionShorthand}`;
`${sectionShorthand}`;
var dialogShorthand = `var(--astryx-dialog-padding, ${SP4})`;
var dialogInline = `var(--astryx-dialog-padding-inline, ${dialogShorthand})`;
`${dialogInline}`;
`${dialogInline}`;
`${dialogShorthand}`;
`${dialogShorthand}`;
var bottomSheetShorthand = `var(--astryx-bottom-sheet-padding, ${SP4})`;
var bottomSheetInline = `var(--astryx-bottom-sheet-padding-inline, ${bottomSheetShorthand})`;
`${bottomSheetInline}`;
`${bottomSheetInline}`;
`${bottomSheetShorthand}`;
`${bottomSheetShorthand}`;
var drawerShorthand = `var(--astryx-drawer-padding, ${SP4})`;
var drawerInline = `var(--astryx-drawer-padding-inline, ${drawerShorthand})`;
`${drawerInline}`;
`${drawerInline}`;
`${drawerShorthand}`;
`${drawerShorthand}`;
/**
* Map from component name to its theme default padding styles.
* Each component reads from its own public CSS custom property.
*/
var themeDefaultStyles = {
	card: {
		containerPaddingInlineStart: {
			"--container-padding-inline-start": "xjmlhfd",
			$$css: true
		},
		containerPaddingInlineEnd: {
			"--container-padding-inline-end": "x1ihxwbr",
			$$css: true
		},
		containerPaddingBlockStart: {
			"--container-padding-block-start": "x1rqz8me",
			$$css: true
		},
		containerPaddingBlockEnd: {
			"--container-padding-block-end": "x1omyuck",
			$$css: true
		},
		layoutPaddingOuterX: {
			"--layout-padding-outer-x": "x14rzhog",
			$$css: true
		},
		layoutPaddingOuterY: {
			"--layout-padding-outer-y": "xjej9fs",
			$$css: true
		},
		layoutPaddingInnerX: {
			"--layout-padding-inner-x": "x4poyjn",
			$$css: true
		},
		layoutPaddingInnerY: {
			"--layout-padding-inner-y": "x1u1kw4e",
			$$css: true
		}
	},
	section: {
		containerPaddingInlineStart: {
			"--container-padding-inline-start": "x19lemt0",
			$$css: true
		},
		containerPaddingInlineEnd: {
			"--container-padding-inline-end": "xu1wldr",
			$$css: true
		},
		containerPaddingBlockStart: {
			"--container-padding-block-start": "xnw7zt4",
			$$css: true
		},
		containerPaddingBlockEnd: {
			"--container-padding-block-end": "xek4msv",
			$$css: true
		},
		layoutPaddingOuterX: {
			"--layout-padding-outer-x": "x15i0zw9",
			$$css: true
		},
		layoutPaddingOuterY: {
			"--layout-padding-outer-y": "x1vw4zgg",
			$$css: true
		},
		layoutPaddingInnerX: {
			"--layout-padding-inner-x": "x1v3gmnx",
			$$css: true
		},
		layoutPaddingInnerY: {
			"--layout-padding-inner-y": "x15yx5hm",
			$$css: true
		}
	},
	dialog: {
		containerPaddingInlineStart: {
			"--container-padding-inline-start": "x1tewnwq",
			$$css: true
		},
		containerPaddingInlineEnd: {
			"--container-padding-inline-end": "x11h1f2o",
			$$css: true
		},
		containerPaddingBlockStart: {
			"--container-padding-block-start": "x1g2kccc",
			$$css: true
		},
		containerPaddingBlockEnd: {
			"--container-padding-block-end": "x1gvthzm",
			$$css: true
		},
		layoutPaddingOuterX: {
			"--layout-padding-outer-x": "x1hsjncj",
			$$css: true
		},
		layoutPaddingOuterY: {
			"--layout-padding-outer-y": "x1pui4bz",
			$$css: true
		},
		layoutPaddingInnerX: {
			"--layout-padding-inner-x": "x2so38",
			$$css: true
		},
		layoutPaddingInnerY: {
			"--layout-padding-inner-y": "xinu7xd",
			$$css: true
		}
	},
	"bottom-sheet": {
		containerPaddingInlineStart: {
			"--container-padding-inline-start": "xv7mus7",
			$$css: true
		},
		containerPaddingInlineEnd: {
			"--container-padding-inline-end": "x1ui7op6",
			$$css: true
		},
		containerPaddingBlockStart: {
			"--container-padding-block-start": "x8qn3ha",
			$$css: true
		},
		containerPaddingBlockEnd: {
			"--container-padding-block-end": "x1of45zw",
			$$css: true
		},
		layoutPaddingOuterX: {
			"--layout-padding-outer-x": "x11ixy8q",
			$$css: true
		},
		layoutPaddingOuterY: {
			"--layout-padding-outer-y": "x1iwhsh0",
			$$css: true
		},
		layoutPaddingInnerX: {
			"--layout-padding-inner-x": "xp9icaw",
			$$css: true
		},
		layoutPaddingInnerY: {
			"--layout-padding-inner-y": "x10u54dy",
			$$css: true
		}
	},
	drawer: {
		containerPaddingInlineStart: {
			"--container-padding-inline-start": "x1mndvw9",
			$$css: true
		},
		containerPaddingInlineEnd: {
			"--container-padding-inline-end": "xlsqznw",
			$$css: true
		},
		containerPaddingBlockStart: {
			"--container-padding-block-start": "x18184ib",
			$$css: true
		},
		containerPaddingBlockEnd: {
			"--container-padding-block-end": "x1g5mqay",
			$$css: true
		},
		layoutPaddingOuterX: {
			"--layout-padding-outer-x": "x18e7m0u",
			$$css: true
		},
		layoutPaddingOuterY: {
			"--layout-padding-outer-y": "xc006j",
			$$css: true
		},
		layoutPaddingInnerX: {
			"--layout-padding-inner-x": "x1qbr0dm",
			$$css: true
		},
		layoutPaddingInnerY: {
			"--layout-padding-inner-y": "x1ek71mq",
			$$css: true
		}
	}
};
/**
* Container inline padding styles for edge compensation.
* Sets --container-padding-inline-start and --container-padding-inline-end so
* edge-compensating children (bleed tables, dividers, etc.) know the inline
* padding to compensate against.
*/
var containerPaddingInlineStartStyles = {
	spacing0: {
		"--container-padding-inline-start": "x1gu2k80",
		$$css: true
	},
	spacing0_5: {
		"--container-padding-inline-start": "x14ws0sr",
		$$css: true
	},
	spacing1: {
		"--container-padding-inline-start": "x1cvlban",
		$$css: true
	},
	spacing1_5: {
		"--container-padding-inline-start": "x176g23i",
		$$css: true
	},
	spacing2: {
		"--container-padding-inline-start": "x1xlrr2o",
		$$css: true
	},
	spacing3: {
		"--container-padding-inline-start": "xfdwxua",
		$$css: true
	},
	spacing4: {
		"--container-padding-inline-start": "x1dlhslv",
		$$css: true
	},
	spacing5: {
		"--container-padding-inline-start": "x1s81nki",
		$$css: true
	},
	spacing6: {
		"--container-padding-inline-start": "x1ep0dkj",
		$$css: true
	},
	spacing7: {
		"--container-padding-inline-start": "x157xojc",
		$$css: true
	},
	spacing8: {
		"--container-padding-inline-start": "xw1diwv",
		$$css: true
	},
	spacing9: {
		"--container-padding-inline-start": "xraca2a",
		$$css: true
	},
	spacing10: {
		"--container-padding-inline-start": "xserb3f",
		$$css: true
	},
	spacing11: {
		"--container-padding-inline-start": "xziclwo",
		$$css: true
	},
	spacing12: {
		"--container-padding-inline-start": "x1iiwihq",
		$$css: true
	}
};
var containerPaddingInlineEndStyles = {
	spacing0: {
		"--container-padding-inline-end": "x91ghl5",
		$$css: true
	},
	spacing0_5: {
		"--container-padding-inline-end": "x1wz3t3y",
		$$css: true
	},
	spacing1: {
		"--container-padding-inline-end": "x2oyxnl",
		$$css: true
	},
	spacing1_5: {
		"--container-padding-inline-end": "xntetml",
		$$css: true
	},
	spacing2: {
		"--container-padding-inline-end": "xcas3b9",
		$$css: true
	},
	spacing3: {
		"--container-padding-inline-end": "xu0ipoa",
		$$css: true
	},
	spacing4: {
		"--container-padding-inline-end": "xs0pscg",
		$$css: true
	},
	spacing5: {
		"--container-padding-inline-end": "xgkj7vj",
		$$css: true
	},
	spacing6: {
		"--container-padding-inline-end": "x94cj42",
		$$css: true
	},
	spacing7: {
		"--container-padding-inline-end": "x11tj35w",
		$$css: true
	},
	spacing8: {
		"--container-padding-inline-end": "x1b9k1pi",
		$$css: true
	},
	spacing9: {
		"--container-padding-inline-end": "x19w02kr",
		$$css: true
	},
	spacing10: {
		"--container-padding-inline-end": "xx5lg5w",
		$$css: true
	},
	spacing11: {
		"--container-padding-inline-end": "x1nmgbqg",
		$$css: true
	},
	spacing12: {
		"--container-padding-inline-end": "x1wsfsk2",
		$$css: true
	}
};
/**
* Container block-start/block-end padding styles for vertical bleed.
* Split into start and end because Layout areas have asymmetric block padding
* (e.g., Header: block-start=outer-y, block-end=inner-y).
*/
var containerPaddingBlockStartStyles = {
	spacing0: {
		"--container-padding-block-start": "x1i3qcxz",
		$$css: true
	},
	spacing0_5: {
		"--container-padding-block-start": "xvdf9ev",
		$$css: true
	},
	spacing1: {
		"--container-padding-block-start": "xnsckjb",
		$$css: true
	},
	spacing1_5: {
		"--container-padding-block-start": "x1kbx601",
		$$css: true
	},
	spacing2: {
		"--container-padding-block-start": "xa8b4fq",
		$$css: true
	},
	spacing3: {
		"--container-padding-block-start": "x11k4f5r",
		$$css: true
	},
	spacing4: {
		"--container-padding-block-start": "xm01sq8",
		$$css: true
	},
	spacing5: {
		"--container-padding-block-start": "xp8wdkl",
		$$css: true
	},
	spacing6: {
		"--container-padding-block-start": "x1hmud4d",
		$$css: true
	},
	spacing7: {
		"--container-padding-block-start": "x1c00sag",
		$$css: true
	},
	spacing8: {
		"--container-padding-block-start": "xfv60at",
		$$css: true
	},
	spacing9: {
		"--container-padding-block-start": "x14fzdu7",
		$$css: true
	},
	spacing10: {
		"--container-padding-block-start": "x17h9kl7",
		$$css: true
	},
	spacing11: {
		"--container-padding-block-start": "x1rdjxae",
		$$css: true
	},
	spacing12: {
		"--container-padding-block-start": "xecwdl6",
		$$css: true
	}
};
var containerPaddingBlockEndStyles = {
	spacing0: {
		"--container-padding-block-end": "xkunwnr",
		$$css: true
	},
	spacing0_5: {
		"--container-padding-block-end": "x1cao3zv",
		$$css: true
	},
	spacing1: {
		"--container-padding-block-end": "x57a7ii",
		$$css: true
	},
	spacing1_5: {
		"--container-padding-block-end": "xv53x8y",
		$$css: true
	},
	spacing2: {
		"--container-padding-block-end": "x1lsgcmx",
		$$css: true
	},
	spacing3: {
		"--container-padding-block-end": "x1q3ppug",
		$$css: true
	},
	spacing4: {
		"--container-padding-block-end": "x4hfsld",
		$$css: true
	},
	spacing5: {
		"--container-padding-block-end": "xbib2ws",
		$$css: true
	},
	spacing6: {
		"--container-padding-block-end": "x1q8d17g",
		$$css: true
	},
	spacing7: {
		"--container-padding-block-end": "x1yqogew",
		$$css: true
	},
	spacing8: {
		"--container-padding-block-end": "x8lgq76",
		$$css: true
	},
	spacing9: {
		"--container-padding-block-end": "x1f7f9rt",
		$$css: true
	},
	spacing10: {
		"--container-padding-block-end": "x15vxphk",
		$$css: true
	},
	spacing11: {
		"--container-padding-block-end": "x4bg2x9",
		$$css: true
	},
	spacing12: {
		"--container-padding-block-end": "x186mjxr",
		$$css: true
	}
};
var paddingOuterXStyles = {
	spacing0: {
		"--layout-padding-outer-x": "xswhm3q",
		$$css: true
	},
	spacing0_5: {
		"--layout-padding-outer-x": "xihiwg7",
		$$css: true
	},
	spacing1: {
		"--layout-padding-outer-x": "xc96xmq",
		$$css: true
	},
	spacing1_5: {
		"--layout-padding-outer-x": "x1u93lgd",
		$$css: true
	},
	spacing2: {
		"--layout-padding-outer-x": "x15dxnc0",
		$$css: true
	},
	spacing3: {
		"--layout-padding-outer-x": "xadgj3j",
		$$css: true
	},
	spacing4: {
		"--layout-padding-outer-x": "x1v56qcf",
		$$css: true
	},
	spacing5: {
		"--layout-padding-outer-x": "x1nzs0gl",
		$$css: true
	},
	spacing6: {
		"--layout-padding-outer-x": "x1c3n52a",
		$$css: true
	},
	spacing7: {
		"--layout-padding-outer-x": "x1gfiokx",
		$$css: true
	},
	spacing8: {
		"--layout-padding-outer-x": "x1t3kfz",
		$$css: true
	},
	spacing9: {
		"--layout-padding-outer-x": "xzr4qsh",
		$$css: true
	},
	spacing10: {
		"--layout-padding-outer-x": "x1jdf5a4",
		$$css: true
	},
	spacing11: {
		"--layout-padding-outer-x": "x1hct0t0",
		$$css: true
	},
	spacing12: {
		"--layout-padding-outer-x": "x11cyqoe",
		$$css: true
	}
};
var paddingOuterYStyles = {
	spacing0: {
		"--layout-padding-outer-y": "x1mzf5mb",
		$$css: true
	},
	spacing0_5: {
		"--layout-padding-outer-y": "x1vj96e0",
		$$css: true
	},
	spacing1: {
		"--layout-padding-outer-y": "x1gpfxoh",
		$$css: true
	},
	spacing1_5: {
		"--layout-padding-outer-y": "xd3dqby",
		$$css: true
	},
	spacing2: {
		"--layout-padding-outer-y": "x10pz7y9",
		$$css: true
	},
	spacing3: {
		"--layout-padding-outer-y": "x1p6yq3h",
		$$css: true
	},
	spacing4: {
		"--layout-padding-outer-y": "xx738ci",
		$$css: true
	},
	spacing5: {
		"--layout-padding-outer-y": "x6yxws5",
		$$css: true
	},
	spacing6: {
		"--layout-padding-outer-y": "x180vrwl",
		$$css: true
	},
	spacing7: {
		"--layout-padding-outer-y": "x1q6rme1",
		$$css: true
	},
	spacing8: {
		"--layout-padding-outer-y": "xid7e43",
		$$css: true
	},
	spacing9: {
		"--layout-padding-outer-y": "x1t5kicu",
		$$css: true
	},
	spacing10: {
		"--layout-padding-outer-y": "x26l4wa",
		$$css: true
	},
	spacing11: {
		"--layout-padding-outer-y": "x10zktp0",
		$$css: true
	},
	spacing12: {
		"--layout-padding-outer-y": "x1yz3n6a",
		$$css: true
	}
};
var paddingInnerXStyles = {
	spacing0: {
		"--layout-padding-inner-x": "xj1bl4l",
		$$css: true
	},
	spacing0_5: {
		"--layout-padding-inner-x": "xlriy2h",
		$$css: true
	},
	spacing1: {
		"--layout-padding-inner-x": "x6uuyak",
		$$css: true
	},
	spacing1_5: {
		"--layout-padding-inner-x": "xd38f90",
		$$css: true
	},
	spacing2: {
		"--layout-padding-inner-x": "xxqksqd",
		$$css: true
	},
	spacing3: {
		"--layout-padding-inner-x": "x1fyui2f",
		$$css: true
	},
	spacing4: {
		"--layout-padding-inner-x": "x1i2ajwi",
		$$css: true
	},
	spacing5: {
		"--layout-padding-inner-x": "x1tac27u",
		$$css: true
	},
	spacing6: {
		"--layout-padding-inner-x": "x1ntgf3t",
		$$css: true
	},
	spacing7: {
		"--layout-padding-inner-x": "xhjd9tl",
		$$css: true
	},
	spacing8: {
		"--layout-padding-inner-x": "xn7c84u",
		$$css: true
	},
	spacing9: {
		"--layout-padding-inner-x": "xeqkbsz",
		$$css: true
	},
	spacing10: {
		"--layout-padding-inner-x": "x1vf4qco",
		$$css: true
	},
	spacing11: {
		"--layout-padding-inner-x": "xsmamsf",
		$$css: true
	},
	spacing12: {
		"--layout-padding-inner-x": "x2xk2xj",
		$$css: true
	}
};
var paddingInnerYStyles = {
	spacing0: {
		"--layout-padding-inner-y": "xwuefyo",
		$$css: true
	},
	spacing0_5: {
		"--layout-padding-inner-y": "x180h0y5",
		$$css: true
	},
	spacing1: {
		"--layout-padding-inner-y": "xmpug6m",
		$$css: true
	},
	spacing1_5: {
		"--layout-padding-inner-y": "x1g8jpzm",
		$$css: true
	},
	spacing2: {
		"--layout-padding-inner-y": "x1lksgje",
		$$css: true
	},
	spacing3: {
		"--layout-padding-inner-y": "x4j7gld",
		$$css: true
	},
	spacing4: {
		"--layout-padding-inner-y": "x1s3ehtl",
		$$css: true
	},
	spacing5: {
		"--layout-padding-inner-y": "x1rj5eim",
		$$css: true
	},
	spacing6: {
		"--layout-padding-inner-y": "x1ftgg6u",
		$$css: true
	},
	spacing7: {
		"--layout-padding-inner-y": "x1ho74vh",
		$$css: true
	},
	spacing8: {
		"--layout-padding-inner-y": "xm2cs6f",
		$$css: true
	},
	spacing9: {
		"--layout-padding-inner-y": "x1vsq92b",
		$$css: true
	},
	spacing10: {
		"--layout-padding-inner-y": "x18gbwmk",
		$$css: true
	},
	spacing11: {
		"--layout-padding-inner-y": "x14zymzj",
		$$css: true
	},
	spacing12: {
		"--layout-padding-inner-y": "xzfpkx9",
		$$css: true
	}
};
var maxHeightStyles = { containerMaxHeight: (maxHeight) => [{
	"--container-max-height": maxHeight != null ? "x18nyedi" : maxHeight,
	$$css: true
}, { "--x---container-max-height": maxHeight != null ? maxHeight : void 0 }] };
/**
* StyleX utility to add layout container styles to any element.
*
* Sets CSS variables for padding that child layout components read:
* - `--container-padding-inline-start` / `--container-padding-inline-end` — Inline padding for edge compensation and bleed
* - `--container-padding-block-start` / `--container-padding-block-end` — Block padding for vertical bleed
* - `--layout-padding-outer-x`, `--layout-padding-outer-y` (internal)
* - `--layout-padding-inner-x`, `--layout-padding-inner-y` (internal)
*
* Themes should use `padding` (or `paddingBlock`/`paddingInline`) in
* component overrides to adjust padding. Do not reference
* `--layout-padding-*` variables directly.
*
* @example
* ```
* import { container } from '@astryxdesign/core/Layout';
* import * as stylex from '@stylexjs/stylex';
*
* // Card container with default padding (theme-overridable via padding shorthand)
* <div {...stylex.props(...container({ useThemeDefault: 'card' }))}>
*   <Layout ... />
* </div>
*
* // Uniform padding
* <div {...stylex.props(...container({ padding: 'spacing3' }))}>
*   <Layout ... />
* </div>
*
* // Asymmetric — padding as base, paddingOuterY overrides vertical
* <div {...stylex.props(
*   ...container({ padding: 'spacing3', paddingOuterY: 'spacing2' }),
*   customStyles.card
* )}>
*   <Layout ... />
* </div>
* ```
*/
function container({ padding = "spacing4", paddingOuterX, paddingOuterY, paddingInnerX, paddingInnerY, useThemeDefault, maxHeight }) {
	const outerX = paddingOuterX ?? padding;
	const outerY = paddingOuterY ?? padding;
	const innerX = paddingInnerX ?? padding;
	const innerY = paddingInnerY ?? padding;
	const maxHeightStyle = maxHeight ? maxHeightStyles.containerMaxHeight(maxHeight) : null;
	if (useThemeDefault) {
		const defaults = themeDefaultStyles[useThemeDefault];
		return [
			baseStyles.container,
			defaults.containerPaddingInlineStart,
			defaults.containerPaddingInlineEnd,
			defaults.containerPaddingBlockStart,
			defaults.containerPaddingBlockEnd,
			defaults.layoutPaddingOuterX,
			defaults.layoutPaddingOuterY,
			defaults.layoutPaddingInnerX,
			defaults.layoutPaddingInnerY,
			maxHeightStyle
		];
	}
	return [
		baseStyles.container,
		containerPaddingInlineStartStyles[outerX],
		containerPaddingInlineEndStyles[outerX],
		containerPaddingBlockStartStyles[outerY],
		containerPaddingBlockEndStyles[outerY],
		paddingOuterXStyles[outerX],
		paddingOuterYStyles[outerY],
		paddingInnerXStyles[innerX],
		paddingInnerYStyles[innerY],
		maxHeightStyle
	];
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/Card/Card.js
/**
* @file Card.tsx
* @input Uses container utility, StyleX
* @output Exports Card component, CardProps, CardVariant types
* @position Core card container component
*
* SYNC: When modified, update these files to stay in sync:
* - /packages/core/src/Card/Card.doc.mjs (props table, features)
* - /packages/core/src/Card/index.ts (exports if types change)
* - /apps/storybook/stories/Card.stories.tsx (storybook stories)
* - /packages/cli/assets/templates/blocks/components/Card/ (showcase blocks)
*/
/**
* Background color variant for Card, derived from CardVariantMap.
* Extensible via module augmentation of CardVariantMap.
*
* - `default`: standard card background with visible border
* - `transparent`: no background, no visible border — for grouping content without visual weight
* - `muted`: subtle muted background for de-emphasised cards
* - Non-semantic palette: `blue | cyan | gray | green | orange | pink | purple | red | teal | yellow`
*   Each uses the corresponding `--color-background-<name>` token (20% opacity tint).
*
* Only `default` draws a visible border. Its border width is subtracted from
* the padding so the total inset (border + padding) equals the padding token —
* keeping content geometry faithful to the spacing scale and identical to the
* borderless variants. Themes can override borderWidth/borderColor.
*/
var styles$23 = {
	card: {
		"--_card-radius": "x2kkz0m",
		kaIpWk: "x153u1i6",
		k7Eaqz: "xeuugli",
		kVQacm: "x7giv3",
		kGVxlE: "x1p8z4y0",
		$$css: true
	},
	withBorder: {
		kMzoRj: "x1litavf",
		ksu8eU: "x1y0btm7",
		kVAM5u: "x14i3s5s",
		kZCmMZ: "xs19ii7",
		kwRFfy: "x12frdag",
		kLKAdn: "x1nex4ik",
		kGO01o: "xbv1mwh",
		$$css: true
	},
	scrollable: {
		kVQacm: "xysyzu8",
		$$css: true
	}
};
var variantStyles = {
	default: {
		kWkggS: "x1de1mus",
		$$css: true
	},
	transparent: {
		kWkggS: "xjbqb8w",
		$$css: true
	},
	muted: {
		kWkggS: "xwmxj5m",
		$$css: true
	},
	blue: {
		kWkggS: "x1o0wnni",
		$$css: true
	},
	cyan: {
		kWkggS: "x1rgj867",
		$$css: true
	},
	gray: {
		kWkggS: "xspzpui",
		$$css: true
	},
	green: {
		kWkggS: "x1sqjeoo",
		$$css: true
	},
	orange: {
		kWkggS: "x1e9xt6e",
		$$css: true
	},
	pink: {
		kWkggS: "xnpoty2",
		$$css: true
	},
	purple: {
		kWkggS: "x16i6n6f",
		$$css: true
	},
	red: {
		kWkggS: "x1cibrc5",
		$$css: true
	},
	teal: {
		kWkggS: "x1jtji5o",
		$$css: true
	},
	yellow: {
		kWkggS: "x1bo7t0x",
		$$css: true
	}
};
var elevationStyles$1 = {
	none: {
		"--_card-elevation": "xw28qpl",
		$$css: true
	},
	low: {
		"--_card-elevation": "x1nn8khe",
		$$css: true
	},
	med: {
		"--_card-elevation": "x1ovzxg0",
		$$css: true
	},
	high: {
		"--_card-elevation": "xnpe7fx",
		$$css: true
	}
};
var dynamicStyles$6 = { sizing: (width, height, maxWidth, minHeight) => [{
	kzqmXN: width != null ? "x5lhr3w" : width,
	kZKoxP: height != null ? "x16ye13r" : height,
	ks0D6T: maxWidth != null ? "xf68679" : maxWidth,
	kAzted: minHeight != null ? "x82snj4" : minHeight,
	$$css: true
}, {
	"--x-width": ((val) => typeof val === "number" ? val + "px" : val != null ? val : void 0)(width),
	"--x-height": ((val) => typeof val === "number" ? val + "px" : val != null ? val : void 0)(height),
	"--x-maxWidth": ((val) => typeof val === "number" ? val + "px" : val != null ? val : void 0)(maxWidth),
	"--x-minHeight": ((val) => typeof val === "number" ? val + "px" : val != null ? val : void 0)(minHeight)
}] };
/**
* A card container with border and themed styling.
*
* Applies card-specific appearance (background, border, border-radius)
* and sets CSS variables for child layout components.
*
* @compositionHint Use as a top-level container for elevated content.
* Pair with Layout for structured header/content/footer layouts.
*
* @example
* ```
* <Card width={400} height={300}>
*   <Layout
*     header={<LayoutHeader hasDivider>Title</LayoutHeader>}
*     content={<LayoutContent>Content</LayoutContent>}
*     footer={<LayoutFooter hasDivider>Actions</LayoutFooter>}
*   />
* </Card>
* ```
*
* @example
* ```
* <Card variant="blue" width={300}>
*   <p>Blue tinted card</p>
* </Card>
* ```
*
* @example
* ```
* <Card variant="muted" width={300}>
*   <p>Subtle de-emphasised card</p>
* </Card>
* ```
*/
function Card({ width, height, maxWidth, minHeight, children, padding, variant = "default", elevation = "none", xstyle, className, style, ref, ...props$8 }) {
	const hasFixedHeight = height != null && height !== "auto";
	const paddingToken = padding == null ? void 0 : spacingStepToToken[padding];
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
		ref,
		...mergeProps(themeProps("card", {
			variant,
			elevation
		}), props(styles$23.card, variantStyles[variant], elevationStyles$1[elevation], hasFixedHeight && styles$23.scrollable, dynamicStyles$6.sizing(width ?? null, height ?? null, maxWidth ?? null, minHeight ?? null), ...container(paddingToken == null ? { useThemeDefault: "card" } : {
			paddingInnerX: paddingToken,
			paddingInnerY: paddingToken,
			paddingOuterX: paddingToken,
			paddingOuterY: paddingToken
		}), variant === "default" && styles$23.withBorder, xstyle), className, style),
		...props$8,
		children
	});
}
Card.displayName = "Card";
//#endregion
//#region node_modules/@astryxdesign/core/dist/Avatar/AvatarSizeContext.js
/**
* @file AvatarSizeContext.ts
* @input Layer-scoped React context
* @output Exports AvatarSizeContext
* @position Internal context; provided by Avatar, consumed by sub-components
*
* SYNC: When modified, update:
* - /packages/core/src/Avatar/Avatar.doc.mjs
*/
/**
* Context that provides the resolved numeric avatar size (in pixels)
* to child components like AvatarStatusDot.
*
* Default value of 36 matches the default 'md' avatar size.
*/
var AvatarSizeContext = createLayerScopedContext(36);
AvatarSizeContext.displayName = "AvatarSizeContext";
//#endregion
//#region node_modules/@astryxdesign/core/dist/Avatar/AvatarStatusLabelContext.js
/**
* @file AvatarStatusLabelContext.ts
* @input Uses React createContext, RefObject
* @output Exports AvatarStatusLabelContext, AvatarStatusLabelTarget
* @position Internal context; provided by Avatar, consumed by AvatarStatusDot
*
* SYNC: When modified, update:
* - /packages/core/src/Avatar/Avatar.doc.mjs
*/
/**
* The box a status element writes its label into.
*
* `update` is the avatar's own recompose, set while its root element is
* attached and null otherwise. Writing `label` alone is enough on mount (the
* avatar reads the box when its root attaches, which happens after its
* children's refs); calling `update` covers a label that changes later
* without the avatar itself re-rendering.
*/
/**
* Lets a status element hand its accessible label to the enclosing Avatar,
* which composes it into its own accessible name ("Jane Doe, Online").
*
* The avatar root is `role="img"`, which prunes all descendant semantics, so
* composing the label in is the only way the status reaches assistive tech
* (WCAG 4.1.2). Reading `label` off the passed element only works when the
* consumer passes `AvatarStatusDot` directly; this route works through a
* consumer's own wrapper, at any depth.
*
* The value is a ref, written from the dot's own callback ref in the commit
* phase, so reporting a label costs no render and no state. `null` outside an
* Avatar, where a standalone dot names itself and has nobody to report to.
*/
var AvatarStatusLabelContext = /*#__PURE__*/ (0, import_react.createContext)(null);
AvatarStatusLabelContext.displayName = "AvatarStatusLabelContext";
//#endregion
//#region node_modules/@astryxdesign/core/dist/AvatarGroup/AvatarGroupContext.js
/**
* @file AvatarGroupContext.ts
* @input Layer-scoped React context
* @output Exports AvatarGroup context and useAvatarGroup hook
* @position Shared context; consumed by children for group-aware styling
*/
var AvatarGroupContext = createLayerScopedContext(null);
AvatarGroupContext.displayName = "AvatarGroupContext";
function useAvatarGroup() {
	return (0, import_react.use)(AvatarGroupContext);
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/Avatar/Avatar.js
/**
* @file Avatar.tsx
* @input Uses React, HTMLAttributes, ReactNode, useState, useRef; useTooltip
*   (Tooltip hook) for the optional name-on-hover tooltip; useTranslator (i18n)
* @output Exports Avatar component, AvatarProps, AvatarSize types
* @position Core implementation; consumed by index.ts
*
* SYNC: When modified, update these files to stay in sync:
* - /packages/core/src/Avatar/Avatar.doc.mjs (props table, features, implementation notes)
* - /packages/core/src/Avatar/index.ts (exports if types change)
* - /packages/core/src/Avatar/AvatarStatusLabelContext.ts (the status label ref)
* - /apps/storybook/stories/Avatar.stories.tsx (storybook stories)
* - /packages/cli/assets/templates/blocks/components/Avatar/ (showcase blocks)
*
* Last synced props: alt, fallbackSrc, name, size, src, status, href, as, target, rel, onClick
*/
/**
* The offset ratio for positioning elements on a circle's edge at 45°.
*
* For a square with side length S containing an inscribed circle of diameter S,
* a diagonal line from corner to corner intersects the circle at:
*   x = S/2 × (1 ± 1/√2)
*
* The distance from the corner to this intersection point (along each axis) is:
*   S/2 × (1 - 1/√2) ≈ 0.146S
*
* This constant represents that ratio: (1 - 1/√2) / 2 ≈ 0.146
*/
var CIRCLE_EDGE_OFFSET_RATIO = (1 - 1 / Math.SQRT2) / 2;
/**
* The ratio of font size to avatar size for initials.
*
* At 40%, two-letter initials fit comfortably within the circle with adequate
* padding. This ratio provides good legibility across all avatar sizes:
*   - 24px avatar → 9.6px font
*   - 48px avatar → 19.2px font
*   - 128px avatar → 51.2px font
*/
var INITIALS_FONT_SIZE_RATIO = .4;
/**
* Named size options.
*
* Avatar uses the same abbreviated scale as Icon (`xsm`/`sm`/`md`/`lg`/`xl`),
* but the values are larger because avatars align with media rather than
* glyphs. The tiers follow the standard avatar size scale.
*/
/**
* Numeric size options (in pixels)
*/
/**
* Avatar size - can be a named size or a specific pixel value
*/
/**
* Avatar shape options
*/
/**
* Resolves named sizes to their numeric pixel values
*/
function resolveSize(size) {
	if (typeof size === "number") return size;
	switch (size) {
		case "xsm": return 20;
		case "sm": return 24;
		case "md": return 36;
		case "lg": return 48;
		case "xl": return 128;
	}
}
var shapeStyles = {
	circle: {
		"--_avatar-radius": "xeincmr",
		$$css: true
	},
	rounded: {
		"--_avatar-radius": "xdarwi0",
		$$css: true
	},
	square: {
		"--_avatar-radius": "x877142",
		$$css: true
	}
};
/**
* Base styles for the avatar
* Uses a wrapper/content structure so status isn't clipped by overflow:hidden
*/
var styles$22 = {
	wrapper: {
		kVAEAm: "x1n2onr6",
		k1xSpc: "x3nfvp2",
		kmuXW: "x2lah0s",
		kaIpWk: "xbc78cj",
		$$css: true
	},
	fallback: {
		k1xSpc: "x78zum5",
		kGNEyG: "x6s0dn4",
		kjj79g: "xl56j7k",
		kzqmXN: "xh8yej3",
		kZKoxP: "x5yr21d",
		kWkggS: "x17x4s8c",
		kMwMTN: "xv1l7n4",
		kMv6JI: "x9ynric",
		k63SB2: "x1e4wzip",
		kP9fke: "xtvhhri",
		$$css: true
	},
	status: {
		kVAEAm: "x10l6tqk",
		$$css: true
	},
	interactive: {
		kysU6D: "xjyslct",
		kmVPX3: "x1717udv",
		kogj98: "x1ghz6dp",
		kMzoRj: "xc342km",
		ksu8eU: "xng3xce",
		kWkggS: "xjbqb8w",
		kMwMTN: "x1heor9g",
		kVVagm: "xln7xf2",
		kybGjl: "x1hl2dhg",
		kkrTdU: "x1ypdohk x16khyan",
		kaIpWk: "xbc78cj",
		$$css: true
	}
};
/**
* Dynamic styles that depend on the avatar size
*/
var _temp$4 = {
	kGuDYH: "xdmh292",
	"$$css": true
};
var _temp2$2 = {
	krVfgx: "x1nqzi6q",
	kt4wiu: "xqxgn94",
	k3aq6I: "x4v1no5 xqgnvz5",
	"$$css": true
};
var dynamicStyles$5 = {
	size: (size) => [{
		kzqmXN: size != null ? "x5lhr3w" : size,
		kZKoxP: size != null ? "x16ye13r" : size,
		$$css: true
	}, {
		"--x-width": ((val) => typeof val === "number" ? val + "px" : val != null ? val : void 0)(size),
		"--x-height": ((val) => typeof val === "number" ? val + "px" : val != null ? val : void 0)(size)
	}],
	fontSize: (size) => [_temp$4, { "--x-fontSize": ((val) => typeof val === "number" ? val + "px" : val != null ? val : void 0)(`${size * INITIALS_FONT_SIZE_RATIO}px`) }],
	statusPositionCircle: (size) => [_temp2$2, {
		"--x-bottom": ((val) => typeof val === "number" ? val + "px" : val != null ? val : void 0)(size * CIRCLE_EDGE_OFFSET_RATIO),
		"--x-insetInlineEnd": ((val) => typeof val === "number" ? val + "px" : val != null ? val : void 0)(size * CIRCLE_EDGE_OFFSET_RATIO)
	}],
	statusPositionCorner: {
		krVfgx: "x1ey2m1c",
		kt4wiu: "xtijo5x",
		k3aq6I: "xv8yid9 x10fxb7p",
		$$css: true
	}
};
var groupStyles = {
	ring: {
		kMzoRj: "xdh2fpr",
		ksu8eU: "x1y0btm7",
		kVAM5u: "x1touxvs",
		kWkggS: "x10xzikg",
		kB7OPa: "x1afcbsf",
		$$css: true
	},
	overlap: {
		keTefX: "x13hpdyo",
		$$css: true
	}
};
var _temp3$2 = {
	"--_avatar-group-overlap": "xlz5hwt",
	"$$css": true
};
var groupDynamicStyles = { overlap: (offset) => [_temp3$2, { "--x---_avatar-group-overlap": `${offset}px` != null ? `${offset}px` : void 0 }] };
/**
* A character that can stand for a word in initials: a letter, a digit, or an
* emoji. Punctuation and other symbols, such as `(`, `"` or `-`, cannot.
*
* Built at runtime, not written as a literal: for targets without property
* escapes, or when no browserslist is set, Babel's
* transform-unicode-property-regex rewrites a `\p{…}` literal, and the copy
* bundled with Next.js lacks the Unicode data it needs, so a source build fails
* with "Unknown property". A literal is safe once Next's bundled Babel ships
* that data.
*/
var INITIAL_CHARACTER = /* @__PURE__ */ new RegExp("[\\p{L}\\p{N}\\p{Extended_Pictographic}\\p{Regional_Indicator}]", "u");
/**
* The first character of a word that can stand for it in initials, skipping
* leading punctuation, or '' when the word has none (a lone `-` or `()`).
*/
function initialCharacter(word) {
	const index = word.search(INITIAL_CHARACTER);
	return index === -1 ? "" : firstCharacter(word.slice(index));
}
/**
* Generates initials from a name string: the first letter, digit or emoji of
* the first and last words. Words with none of those, such as a lone `-`, are
* skipped, and leading punctuation within a word is ignored. Returns '' when
* no word yields an initial.
* @example
* ```
* getInitials('John Doe') // 'JD'
* getInitials('Alice') // 'A'
* getInitials('Northwind Workbench (automation)') // 'NA'
* ```
*/
function getInitials(name) {
	const initials = name.trim().split(/\s+/).map(initialCharacter).filter((initial) => initial !== "");
	if (initials.length === 0) return "";
	if (initials.length === 1) return initials[0].toUpperCase();
	return (initials[0] + initials[initials.length - 1]).toUpperCase();
}
/**
* Reads the accessible status label off the `status` element, when it
* exposes one.
*
* Only sees a literal `label` prop on the element the consumer passes, so a
* consumer's own wrapper around the dot hides it — that case comes in through
* `AvatarStatusLabelContext` instead. Kept because it answers the first
* render, before any report has landed, and because it tracks a label that
* changes on an element that does not report at all.
*/
function getStatusLabel(status) {
	if (!/*#__PURE__*/ (0, import_react.isValidElement)(status)) return;
	const { label } = status.props;
	return typeof label === "string" && label !== "" ? label : void 0;
}
/**
* The string when it carries something, `undefined` when it is absent or
* blank. An empty accessible name is meaningless, so a blank reads as
* absent, the way Icon treats `label=""`.
*/
function meaningful(value) {
	return typeof value === "string" && value.trim() !== "" ? value : void 0;
}
/**
* Derives the root's ARIA attributes from the resolved accessible name,
* following Icon's `getIconA11yProps`.
*
* - A name → meaningful image: `role="img"` + `aria-label`.
* - No name → decorative: `role="presentation"` + `aria-hidden="true"`, rather
*   than announcing a meaningless generic "Avatar" (obs-9).
*
* The result is spread BEFORE `{...props}` on every root so an explicit
* `aria-label` / `role` / `aria-hidden` from the consumer always wins.
*/
function getAvatarA11yProps(accessibleName) {
	return accessibleName != null && accessibleName !== "" ? {
		role: "img",
		"aria-label": accessibleName
	} : {
		role: "presentation",
		"aria-hidden": "true"
	};
}
/**
* The avatar's accessible name: its own name, the status label, or the two
* composed ("Jane Doe, Online"). Used both by render and by the commit-phase
* update, so the two can never compose differently.
*/
function composeAccessibleName(t, nameLabel, statusLabel) {
	if (nameLabel && statusLabel) return t("@astryx.avatar.nameWithStatus", {
		name: nameLabel,
		status: statusLabel
	});
	return nameLabel || statusLabel;
}
/** Sets an attribute, or removes it when the value is absent. */
function setAttributeOrRemove(element, name, value) {
	if (value == null) element.removeAttribute(name);
	else element.setAttribute(name, value);
}
/**
* Default person icon SVG for when no image or name is provided
*/
function DefaultIcon({ size }) {
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)("svg", {
		width: size * .6,
		height: size * .6,
		viewBox: "0 0 24 24",
		fill: "currentColor",
		"aria-hidden": "true",
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)("path", { d: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" })
	});
}
/**
* Avatar component for displaying user profile pictures.
*
* Displays an image when available, falling back to initials derived from
* the name prop, or a generic person icon if neither is provided.
*
* @example
* ```
* <Avatar src="/user.jpg" name="John Doe" />
* <Avatar name="Jane Smith" size="xl" />
* <Avatar src="/user.jpg" status={<AvatarStatusDot variant="success" label="Online" />} />
* <Avatar name="jsmith" tooltip="Jane Smith, Staff Engineer" />
* <Avatar name="Jane" tooltip={false} />
* <Avatar src="/user.jpg" name="John Doe" href="/users/john" />
* <Avatar src="/user.jpg" name="John Doe" onClick={() => openProfile()} />
* ```
*/
function Avatar({ alt, "data-testid": testId, fallbackSrc, name, size = "md", shape = "circle", src, status, tooltip = true, href, as, target, rel, onClick, xstyle, className, style, ref, ...props$7 }) {
	const [erroredSrc, setErroredSrc] = (0, import_react.useState)(void 0);
	const [erroredFallbackSrc, setErroredFallbackSrc] = (0, import_react.useState)(void 0);
	const showImage = src && erroredSrc !== src;
	const showFallbackImage = !showImage && fallbackSrc && erroredFallbackSrc !== fallbackSrc;
	const meaningfulName = meaningful(name);
	const meaningfulAlt = meaningful(alt);
	const initials = meaningfulName ? getInitials(meaningfulName) : "";
	const showInitials = !showImage && !showFallbackImage && initials !== "";
	const showIcon = !showImage && !showFallbackImage && initials === "";
	const t = useTranslator();
	const nameLabel = meaningfulAlt || meaningfulName;
	const accessibleName = composeAccessibleName(t, nameLabel, getStatusLabel(status));
	const a11yProps = getAvatarA11yProps(accessibleName);
	const a11yLabelProps = accessibleName ? { "aria-label": accessibleName } : void 0;
	const avatarGroup = useAvatarGroup();
	const resolvedSize = avatarGroup?.size ?? size;
	const resolvedShape = avatarGroup?.shape ?? shape;
	const numericSize = (0, import_react.useMemo)(() => resolveSize(resolvedSize), [resolvedSize]);
	const trimmedTooltip = (tooltip === false ? void 0 : typeof tooltip === "string" ? tooltip : meaningfulName)?.trim();
	const showTooltip = trimmedTooltip != null && trimmedTooltip !== "";
	const isCustomTooltip = typeof tooltip === "string";
	const tooltipHook = useTooltip({
		placement: "above",
		isEnabled: showTooltip
	});
	const describedByProp = showTooltip && isCustomTooltip ? { "aria-describedby": [props$7["aria-describedby"], tooltipHook.describedBy].filter(Boolean).join(" ") || void 0 } : null;
	const renderAsLink = href != null;
	const renderAsButton = !renderAsLink && onClick != null;
	const isInteractive = renderAsLink || renderAsButton;
	const LinkComponent = useLinkComponent(as);
	const consumerName = meaningful(props$7["aria-label"]) ?? meaningful(props$7["aria-labelledby"]);
	useDevWarning("Avatar", "an interactive avatar (with `href` or `onClick`) needs a meaningful accessible name. Pass `alt` or `name`.", isInteractive && !nameLabel && consumerName == null);
	const statusLabelRef = (0, import_react.useRef)({
		label: void 0,
		update: null
	});
	const { "aria-hidden": consumerAriaHidden, "aria-label": consumerAriaLabel, role: consumerRole } = props$7;
	const nameRef = (0, import_react.useCallback)((element) => {
		if (element == null) return;
		const target = statusLabelRef.current;
		target.update = () => {
			const composed = composeAccessibleName(t, nameLabel, meaningful(target.label) ?? getStatusLabel(status));
			if (consumerAriaLabel == null) setAttributeOrRemove(element, "aria-label", composed);
			if (!isInteractive) {
				if (consumerRole == null) element.setAttribute("role", composed ? "img" : "presentation");
				if (consumerAriaHidden == null) setAttributeOrRemove(element, "aria-hidden", composed ? void 0 : "true");
			}
		};
		target.update();
		return () => {
			target.update = null;
		};
	}, [
		consumerAriaHidden,
		consumerAriaLabel,
		consumerRole,
		isInteractive,
		nameLabel,
		status,
		t
	]);
	const rootRef = useMergedRefs(ref, showTooltip ? tooltipHook.ref : void 0, nameRef);
	const visualContent = /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/*#__PURE__*/ (0, import_jsx_runtime.jsxs)("div", {
		className: "x78zum5 x6s0dn4 xl56j7k xh8yej3 x5yr21d xb3r6kr x87ps6o xbc78cj",
		children: [
			showImage && /*#__PURE__*/ (0, import_jsx_runtime.jsx)("img", {
				src,
				alt: "",
				onError: () => setErroredSrc(src),
				className: "xh8yej3 x5yr21d xl1xv1r"
			}),
			showFallbackImage && /*#__PURE__*/ (0, import_jsx_runtime.jsx)("img", {
				src: fallbackSrc,
				alt: "",
				onError: () => setErroredFallbackSrc(fallbackSrc),
				className: "xh8yej3 x5yr21d xl1xv1r"
			}),
			showInitials && /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
				...mergeProps(themeProps("avatar-fallback", { size: resolvedSize }), props(styles$22.fallback, dynamicStyles$5.fontSize(numericSize))),
				children: initials
			}),
			showIcon && /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
				...mergeProps(themeProps("avatar-fallback", { size: resolvedSize }), { className: "x78zum5 x6s0dn4 xl56j7k xh8yej3 x5yr21d x17x4s8c xv1l7n4 x9ynric x1e4wzip xtvhhri" }),
				children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(DefaultIcon, { size: numericSize })
			})
		]
	}), status && /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
		...props(styles$22.status, resolvedShape === "circle" ? dynamicStyles$5.statusPositionCircle(numericSize) : dynamicStyles$5.statusPositionCorner),
		children: status
	})] });
	const rootStylexProps = mergeProps(themeProps("avatar", {
		size: resolvedSize,
		shape: resolvedShape
	}), focusOutlineProps.focusVisible(styles$22.wrapper, dynamicStyles$5.size(numericSize), isInteractive && styles$22.interactive, avatarGroup && groupStyles.ring, avatarGroup && groupStyles.overlap, avatarGroup && groupDynamicStyles.overlap(-avatarGroup.overlap), shapeStyles[resolvedShape], xstyle), className, style);
	let rootElement;
	const interactivePassthrough = props$7;
	if (renderAsLink) rootElement = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(LinkComponent, {
		...a11yLabelProps,
		...interactivePassthrough,
		...describedByProp,
		ref: rootRef,
		href,
		target,
		rel,
		"data-avatar-item": "",
		"data-testid": testId,
		onClick,
		...rootStylexProps,
		children: visualContent
	});
	else if (renderAsButton) rootElement = /*#__PURE__*/ (0, import_jsx_runtime.jsx)("button", {
		...a11yLabelProps,
		...interactivePassthrough,
		...describedByProp,
		ref: rootRef,
		type: "button",
		"data-avatar-item": "",
		"data-testid": testId,
		onClick,
		...rootStylexProps,
		children: visualContent
	});
	else rootElement = /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
		...a11yProps,
		...props$7,
		ref: rootRef,
		tabIndex: showTooltip && !avatarGroup ? 0 : void 0,
		"data-testid": testId,
		...describedByProp,
		...rootStylexProps,
		children: visualContent
	});
	return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarSizeContext, {
		value: numericSize,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(AvatarStatusLabelContext, {
			value: statusLabelRef,
			children: rootElement
		})
	}), showTooltip ? tooltipHook.renderTooltip(trimmedTooltip) : null] });
}
Avatar.displayName = "Avatar";
//#endregion
//#region node_modules/@astryxdesign/core/dist/List/ListContext.js
/**
* @file ListContext.tsx
* @input Layer-scoped React context
* @output Exports ListContext for sharing density, dividers, the row edge
*   treatment, and marker style between List and ListItem, and
*   ListMarkerScope, which sets the marker for the items inside it, or a
*   task item's checkbox in its place
* @position Internal context; consumed by List.tsx and ListItem.tsx
*/
/**
* Where each row's content and its lines and backgrounds sit relative to the
* list's edges and the padding of the container around the list.
*/
/**
* Every marker ListItem draws: the public styles, and the square, letter,
* and roman markers Markdown's nested lists use (spec:AST-061 DEC-6).
*/
/** A task item's state, drawn as a read-only checkbox in the marker's place. */
var ListContext = createLayerScopedContext(null);
ListContext.displayName = "ListContext";
//#endregion
//#region node_modules/@astryxdesign/core/dist/List/List.js
/**
* @file List.tsx
* @input Uses React, ReactNode, StyleXStyles, theme tokens, useDevWarning,
*   and ListContext with the row edge treatment
* @output Exports List component, ListProps, ListDensity, ListEdge, ListStyle
*   types
* @position Core implementation; consumed by index.ts, tested by List.test.tsx
*
* SYNC: When modified, update these files to stay in sync:
* - /packages/core/src/List/List.doc.mjs
* - /packages/core/src/List/List.test.tsx
* - /packages/core/src/List/index.ts
* - /apps/storybook/stories/List.stories.tsx
* - /packages/cli/assets/templates/blocks/components/List/ (showcase blocks)
*/
var styles$21 = {
	list: {
		kogj98: "x1ghz6dp",
		kZCmMZ: "x1c1uobl",
		kH6xsr: "x3ct3a4",
		k1xSpc: "x78zum5",
		kXwgrk: "xdt5ytf",
		kOIVth: "x1lsbc85",
		kXHlph: "x101abm8",
		$$css: true
	},
	reachesContainerPadding: {
		keTefX: "xojxgvx",
		k71WvV: "x1fcf3bl",
		kzqmXN: "xx6qvi6",
		$$css: true
	},
	withDividers: {
		kOIVth: "xxhr3t",
		$$css: true
	},
	withCounter: {
		kt6KFK: "xif0320",
		$$css: true
	}
};
var _temp$3 = {
	kt6KFK: "x1khind5",
	"$$css": true
};
var dynamicStyles$4 = { counterStart: (value) => [_temp$3, { "--x-counterReset": `astryx-list ${value}` != null ? `astryx-list ${value}` : void 0 }] };
/**
* A vertical list component for rendering collections of items.
*
* Renders semantic `<ul>` or `<ol>` elements with configurable density,
* dividers, marker styles, and an optional header.
*
* Set `edge` to choose where row text, dividers, and backgrounds sit: inside
* each row's padding (`padded`, the default), at the list's edges (`flush`),
* on a heading's line with backgrounds reaching into the container's padding
* (`outset`), or reaching the container's edges like Table rows (`bleed`).
*
* @example
* ```
* <List>
*   <ListItem label="Notifications" description="Manage your alerts" />
*   <ListItem label="Privacy" description="Control your data" />
* </List>
* <List listStyle="decimal" density="compact">
*   <ListItem label="First step" />
*   <ListItem label="Second step" />
* </List>
* <List edge="flush" hasDividers>
*   <ListItem label="Solstice Mug" description="Ceramic, 12 oz" />
* </List>
* ```
*/
function List({ children, density = "balanced", hasDividers = false, edge: edgeProp, edgeCompensation, header, listStyle = "none", start, xstyle, className, style, "data-testid": testId, ref, ...props$6 }) {
	const headerId = (0, import_react.useId)();
	const isOrdered = listStyle === "decimal";
	const Tag = isOrdered ? "ol" : "ul";
	useDevWarning("List", "`edge` and the deprecated `edgeCompensation` are both set; `edge` wins. Remove `edgeCompensation`. `astryx upgrade` rewrites existing usage.", edgeProp != null && edgeCompensation != null);
	const edge = edgeProp ?? (edgeCompensation === "inline" ? "outset" : "padded");
	const reachesContainerPadding = edge === "outset" || edge === "bleed";
	const contextValue = (0, import_react.useMemo)(() => ({
		density,
		hasDividers,
		edge,
		listStyle
	}), [
		density,
		hasDividers,
		edge,
		listStyle
	]);
	const listElement = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Tag, {
		ref,
		...props$6,
		"data-testid": testId,
		...header != null ? { "aria-labelledby": headerId } : null,
		...isOrdered && start != null && start !== 1 ? { start } : {},
		role: "list",
		...mergeProps(themeProps("list", {
			density,
			listStyle
		}), props(styles$21.list, hasDividers && styles$21.withDividers, reachesContainerPadding && styles$21.reachesContainerPadding, listStyle !== "none" && (start != null && start !== 1 ? dynamicStyles$4.counterStart(start - 1) : styles$21.withCounter), xstyle), className, style),
		children
	});
	if (header == null) return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ListContext, {
		value: contextValue,
		children: listElement
	});
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ListContext, {
		value: contextValue,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsxs)("div", {
			className: "x78zum5 xdt5ytf",
			children: [/*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
				id: headerId,
				className: "x1p37lm5",
				children: header
			}), listElement]
		})
	});
}
List.displayName = "List";
//#endregion
//#region node_modules/@astryxdesign/core/dist/hooks/useAnnounce.js
/**
* @file useAnnounce.ts
* @input Uses React useCallback; DOM APIs and cancellable animation frames for a singleton live-region pair
* @output Exports useAnnounce hook and AnnouncePoliteness type
* @position Core a11y hook; provides imperative screen-reader announcements
*   via persistently-mounted polite/assertive live regions; regions are
*   auto-cleared shortly after announcing so stale status text does not
*   linger in the accessibility tree
*
* SYNC: When modified, update:
* - /packages/core/src/hooks/index.ts
*/
/**
* Announcement urgency:
* - `'polite'` (default): announced when the screen reader is idle. Use for
*   status updates, result counts, "no results", non-urgent confirmations.
* - `'assertive'`: interrupts the current announcement. Reserve for errors and
*   time-sensitive alerts.
*/
/**
* Imperative screen-reader announcement function.
*/
var CONTAINER_ATTR = "data-astryx-live-region";
var VISUALLY_HIDDEN_CSS = "position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;inset-block-start:0;inset-inline-start:0;pointer-events:none;user-select:none;";
/**
* How long an announcement stays in its region before being auto-cleared.
* Long enough for screen readers to pick the message up and finish reading
* it; clearing afterwards keeps stale status text out of the accessibility
* tree for users who browse the DOM later. Each announce resets the timer.
*/
var CLEAR_DELAY_MS = 2e3;
var clearTimers = {
	polite: null,
	assertive: null
};
function cancelScheduledClear(politeness) {
	const timer = clearTimers[politeness];
	if (timer != null) {
		clearTimeout(timer);
		clearTimers[politeness] = null;
	}
}
var pendingFrames = {
	polite: /* @__PURE__ */ new Set(),
	assertive: /* @__PURE__ */ new Set()
};
function cancelPendingFrames(politeness) {
	for (const frame of pendingFrames[politeness]) cancelAnimationFrame(frame);
	pendingFrames[politeness].clear();
}
function scheduleClear(politeness, target) {
	cancelScheduledClear(politeness);
	clearTimers[politeness] = setTimeout(() => {
		clearTimers[politeness] = null;
		target.textContent = "";
	}, CLEAR_DELAY_MS);
}
var regions = null;
function createRegion(politeness) {
	const el = document.createElement("div");
	el.setAttribute(CONTAINER_ATTR, politeness);
	el.setAttribute("aria-live", politeness);
	el.setAttribute("aria-atomic", "true");
	el.setAttribute("role", politeness === "assertive" ? "alert" : "status");
	el.style.cssText = VISUALLY_HIDDEN_CSS;
	document.body.appendChild(el);
	return el;
}
function getRegions() {
	if (typeof document === "undefined") return null;
	if (regions) {
		if (!regions.polite.isConnected) document.body.appendChild(regions.polite);
		if (!regions.assertive.isConnected) document.body.appendChild(regions.assertive);
		return regions;
	}
	regions = {
		polite: createRegion("polite"),
		assertive: createRegion("assertive")
	};
	return regions;
}
function announceMessage(message, politeness) {
	const r = getRegions();
	if (!r) return;
	const target = politeness === "assertive" ? r.assertive : r.polite;
	target.textContent = "";
	const frame = requestAnimationFrame(() => {
		pendingFrames[politeness].delete(frame);
		target.textContent = message;
	});
	pendingFrames[politeness].add(frame);
	scheduleClear(politeness, target);
}
/**
* Clear any pending announcement from a region without announcing anything new.
* Used when the triggering context goes away (e.g. a search query is cleared),
* so stale status text does not linger in the accessibility tree.
*/
function clearRegion(politeness) {
	cancelPendingFrames(politeness);
	cancelScheduledClear(politeness);
	if (!regions) return;
	const target = politeness === "assertive" ? regions.assertive : regions.polite;
	target.textContent = "";
}
/**
* Returns an imperative `announce(message, politeness?)` function that speaks a
* message through a persistently-mounted, visually-hidden live region.
*
* The polite and assertive regions are created once on first use and kept
* mounted, so announcements are reliable even for messages that appear
* immediately (unlike a live region rendered together with its content).
* Each message is automatically cleared a couple of seconds after being
* announced, so users browsing the DOM later do not encounter stale status
* text; announcing again before the clear simply resets the countdown.
*
* @example
* ```
* function Search() {
*   const announce = useAnnounce();
*   const onResults = (n: number) => {
*     announce(n === 0 ? 'No results found' : `${n} results`);
*   };
*   // ...
* }
* ```
*/
function useAnnounce() {
	return (0, import_react.useCallback)((message, politeness = "polite") => {
		if (!message) {
			clearRegion(politeness);
			return;
		}
		announceMessage(message, politeness);
	}, []);
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/hooks/useScrollLock.js
/**
* @file useScrollLock.ts
* @input Uses React useEffect
* @output Exports useScrollLock hook for locking body scroll
* @position Core hook; used by Dialog to prevent background scrolling
*
* Locks body scroll when active by pinning the body with position:fixed.
* This is needed because overscroll-behavior:contain doesn't work on iOS Safari.
*
* SYNC: When modified, update:
* - /packages/core/src/hooks/index.ts
* - /packages/core/src/hooks/scrollbarGutter.ts
*/
var lockCount = 0;
var originalBodyState = null;
/**
* Locks body scroll when `isLocked` is true.
*
* Pins the body with `position: fixed` to prevent background scrolling,
* which is necessary for iOS Safari where `overscroll-behavior: contain`
* does not prevent body scroll behind modals. Restores scroll position
* on unlock.
*
* Pinning also hides the document's scrollbar, so the gutter that scrollbar
* occupied is held open for the duration of the lock — without it the page
* reflows sideways by ~15px the moment an overlay opens.
*
* @example
* ```
* useScrollLock(isOpen);
* ```
*/
function useScrollLock(isLocked) {
	(0, import_react.useEffect)(() => {
		if (!isLocked) return;
		const { body } = document;
		if (lockCount === 0) {
			const scrollX = window.scrollX;
			const scrollY = window.scrollY;
			const gutter = holdScrollbarGutter(body);
			originalBodyState = {
				scrollX,
				scrollY,
				overflow: body.style.overflow,
				position: body.style.position,
				top: body.style.top,
				left: body.style.left,
				right: body.style.right,
				gutter
			};
			body.style.overflow = "hidden";
			body.style.position = "fixed";
			body.style.top = `-${scrollY}px`;
			body.style.left = "0";
			body.style.right = "0";
			gutter.settle();
		}
		lockCount += 1;
		return () => {
			lockCount -= 1;
			if (lockCount !== 0 || originalBodyState == null) return;
			const state = originalBodyState;
			originalBodyState = null;
			body.style.overflow = state.overflow;
			body.style.position = state.position;
			body.style.top = state.top;
			body.style.left = state.left;
			body.style.right = state.right;
			state.gutter.release();
			window.scrollTo(state.scrollX, state.scrollY);
		};
	}, [isLocked]);
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/hooks/useIsHydrating.js
/**
* @file useIsHydrating.ts
* @input Uses React useSyncExternalStore
* @output Exports useIsHydrating (internal; not re-exported from hooks/index.ts)
* @position Internal utility; read by useEntryAnimation so markup that
*   hydrates server HTML matches the server (spec:AST-013 FR9, FR13)
*
* React renders with the server snapshot on the server and again in the
* client render that hydrates server HTML, then re-renders with the client
* snapshot. Code that must render the server's markup while hydrating reads
* this instead of a first-paint flag, timer, animation frame, or mount Effect.
*/
var subscribe = () => () => {};
var getSnapshot = () => false;
var getServerSnapshot = () => true;
/**
* Returns `true` during server render and during the client render that
* hydrates server HTML; `false` in every other client render.
*/
function useIsHydrating() {
	return (0, import_react.useSyncExternalStore)(subscribe, getSnapshot, getServerSnapshot);
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/hooks/useEntryAnimation.js
/**
* @file useEntryAnimation.ts
* @input Uses React, StyleX, theme tokens, useIsHydrating
* @output Exports useEntryAnimation hook for mount-only entry animations
* @position Hook utility; consumed by FieldStatus and available to consumers
*
* Provides entry animations for conditionally rendered elements.
* Only animates when the element is dynamically mounted after the initial
* page paint — statically rendered elements on page load are not animated.
* Server-rendered elements hydrate without the entry style and never play it
* (spec:AST-013 FR13).
*/
var initialPaintComplete = false;
if (typeof window !== "undefined") requestAnimationFrame(() => {
	initialPaintComplete = true;
});
var styles$20 = {
	slideDown: {
		kKVMdj: "x1srr2gu x1aquc0h",
		k44tkh: "x9uej1z",
		kyAemX: "x128ha8g",
		kWV6AL: "xskzprw",
		$$css: true
	},
	slideUp: {
		kKVMdj: "x1dvww92 x1aquc0h",
		k44tkh: "x9uej1z",
		kyAemX: "x128ha8g",
		kWV6AL: "xskzprw",
		$$css: true
	},
	fadeIn: {
		kKVMdj: "xqcmdr3 x1aquc0h",
		k44tkh: "x9uej1z",
		kyAemX: "x128ha8g",
		kWV6AL: "xskzprw",
		$$css: true
	},
	scaleIn: {
		kKVMdj: "x97zbip x1aquc0h",
		k44tkh: "x9uej1z",
		kyAemX: "x128ha8g",
		kWV6AL: "xskzprw",
		$$css: true
	}
};
/**
* Returns a StyleX style for animating an element on mount.
*
* Only animates when the element is dynamically inserted after the initial
* page paint. Elements rendered on page load, including server-rendered
* elements while they hydrate, are not animated.
*
* @example
* ```
* const entryStyle = useEntryAnimation('slideDown');
* <div {...stylex.props(entryStyle)}>Animated content</div>
* ```
*/
function useEntryAnimation(preset = "slideDown") {
	const isHydrating = useIsHydrating();
	const [animate] = (0, import_react.useState)(() => !isHydrating && initialPaintComplete);
	return animate ? styles$20[preset] : null;
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/hooks/useClickableContainer.js
/**
* @file useClickableContainer.ts
* @input Container ref, interactive element ref, click/href handlers
* @output onClick and onMouseUp handlers for the container; INTERACTIVE_SELECTORS list
* @position Core hook for clickable containers that safely handle nested interactive elements
*
* Solves the "nested interactive elements" problem: when a card is clickable
* but contains buttons/links, clicking those should NOT trigger the card's action.
*
* Every navigation exit here (window.open, location.href, and the delegated
* click on the interactive ref) runs after the shared navigation-destination
* rule in utils/safeUrl.ts; a blocked href does not navigate by any
* activation method.
*
* SYNC: When modified, update:
* - /packages/core/src/hooks/index.ts (export)
*/
/**
* Canonical list of interactive element selectors — native controls plus
* role-based interactive elements. Clicks on these (or their descendants)
* should NOT bubble to a clickable container's click handler.
*
* Exported so other focus/interaction utilities can share one comprehensive
* definition of "interactive target" rather than hand-rolling divergent lists.
* Note: this list is about "don't bubble clicks", not focus-eligibility —
* consumers that need focusable elements must additionally exclude
* unfocusable/disabled targets (e.g. `[tabindex="-1"]`, `:disabled`).
*/
var INTERACTIVE_SELECTORS = [
	"button",
	"a",
	"input",
	"select",
	"textarea",
	"[role=\"button\"]",
	"[role=\"link\"]",
	"[role=\"checkbox\"]",
	"[role=\"radio\"]",
	"[role=\"switch\"]",
	"[role=\"tab\"]",
	"[role=\"menuitem\"]",
	"[role=\"option\"]",
	"[role=\"combobox\"]",
	"[role=\"listbox\"]",
	"[role=\"slider\"]",
	"[role=\"spinbutton\"]",
	"[data-pressable-container]"
].join(",");
var NON_INTERACTIVE_SELECTORS = "[aria-readonly=\"true\"]";
/**
* Check whether an element has an interactive ancestor between it and the root.
* If the click target is inside a nested button/link/etc., we should NOT
* handle it at the container level.
*
* Exported for containers that cannot use the hook itself — a `<tr>` whose
* props are assembled inside a Table plugin's `transformBodyRow`, for
* instance, has no ref to hand the hook but needs the identical rule. Sharing
* the walk keeps one definition of "this click belongs to something else"
* instead of a short hand-rolled selector list per caller.
*/
function hasInteractiveAncestor(el, rootEl) {
	let current = el;
	while (current != null && current !== rootEl && current !== document.body) {
		if (current.matches(INTERACTIVE_SELECTORS) && !current.matches(NON_INTERACTIVE_SELECTORS)) return true;
		current = current.parentElement;
	}
	return false;
}
/**
* Check if there's a text selection inside the node (don't navigate on text select)
*
* Exported alongside {@link hasInteractiveAncestor} for the same reason: a
* click that ends a text drag is not a click on the container, and every
* clickable surface needs that rule, hook or no hook. Scoped to the node, so a
* selection somewhere else on the page does not make the surface inert.
*/
function hasTextSelection(node) {
	if (typeof document === "undefined" || !("getSelection" in document)) return false;
	const selection = document.getSelection();
	if (selection == null || selection.isCollapsed) return false;
	return node.contains(selection.anchorNode);
}
/**
* Hook that makes a container element clickable while preserving
* nested interactive element behavior.
*
* When the user clicks the container surface (not on a nested button/link),
* the hook fires the onClick handler or navigates to href.
* When the user clicks a nested interactive element, it does nothing —
* the nested element handles its own event.
*
* @compositionHint Use inside ClickableCard or SelectableCard.
* For custom interactive containers, pair with a ref to the outer div.
*
* @example
* ```
* const containerRef = useRef<HTMLDivElement>(null);
* const { onClick, onMouseUp } = useClickableContainer({
*   containerRef,
*   onClick: () => console.log('card clicked'),
* });
* return (
*   <div ref={containerRef} onClick={onClick} onMouseUp={onMouseUp}>
*     <p>Click anywhere on this card</p>
*     <button onClick={() => alert('button')}>Nested button</button>
*   </div>
* );
* ```
*/
function useClickableContainer({ containerRef, interactiveRef, onClick: onClickProp, href, target, disabled = false }) {
	(0, import_react.useEffect)(() => {
		const el = containerRef.current;
		if (el) el.setAttribute("data-pressable-container", "true");
	}, [containerRef]);
	return {
		onClick: (0, import_react.useCallback)((event) => {
			if (disabled) return;
			const containerEl = containerRef.current;
			if (!containerEl) return;
			if (hasTextSelection(containerEl)) return;
			const eventTarget = event.target;
			if (!(eventTarget instanceof Element)) return;
			if (eventTarget !== event.currentTarget && hasInteractiveAncestor(eventTarget, containerEl)) return;
			onClickProp?.(event);
			if (event.defaultPrevented) return;
			if (href != null && isSafeUrl(href)) {
				if (target === "_blank" || event.ctrlKey || event.metaKey) window.open(href, "_blank", "noopener");
				else if (interactiveRef?.current) interactiveRef.current.click();
				else window.location.href = href;
			}
			if (href == null && onClickProp == null && interactiveRef?.current) {
				const clickEvent = new MouseEvent("click", {
					bubbles: event.bubbles,
					cancelable: event.cancelable,
					ctrlKey: event.ctrlKey,
					metaKey: event.metaKey,
					shiftKey: event.shiftKey,
					altKey: event.altKey,
					button: event.button
				});
				interactiveRef.current.dispatchEvent(clickEvent);
				event.stopPropagation();
			}
		}, [
			containerRef,
			interactiveRef,
			onClickProp,
			href,
			target,
			disabled
		]),
		onMouseUp: (0, import_react.useCallback)((event) => {
			if (disabled) return;
			const containerEl = containerRef.current;
			if (!containerEl) return;
			const eventTarget = event.target;
			if (!(eventTarget instanceof Element)) return;
			if (event.button === 1 && href != null && isSafeUrl(href) && (eventTarget === event.currentTarget || !hasInteractiveAncestor(eventTarget, containerEl))) window.open(href, "_blank", "noopener");
		}, [
			containerRef,
			href,
			disabled
		])
	};
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/hooks/useInputContainer.js
/**
* @file useInputContainer.ts
* @input Container ref, input ref
* @output onClick and onMouseUp handlers for the input container wrapper
* @position Hook for input wrapper containers that delegate focus to the inner input/textarea
*
* Uses useClickableContainer to safely handle nested interactive elements
* (clear buttons, calendar toggles, etc.) while focusing the input when
* clicking non-interactive areas (icons, padding, status indicators).
*/
/**
* Input types that should receive `.focus()` when the container is clicked.
* Other input types (e.g. checkbox, radio, file) use `.click()` instead.
*/
var FOCUS_INPUT_TYPES = /* @__PURE__ */ new Set([
	"text",
	"password",
	"email",
	"number",
	"search",
	"tel",
	"url",
	"date",
	"datetime-local",
	"month",
	"time",
	"week"
]);
/**
* `aria-haspopup` values that advertise a control opens a popup on activation.
* https://www.w3.org/TR/wai-aria-1.2/#aria-haspopup
*/
var HASPOPUP_VALUES = /* @__PURE__ */ new Set([
	"true",
	"menu",
	"listbox",
	"tree",
	"grid",
	"dialog"
]);
/**
* Whether an element is a popup trigger — a combobox or any control that
* advertises `aria-haspopup`. Such controls activate their popup on *click*
* (e.g. DateInput's `<input type="text" role="combobox" aria-haspopup="dialog">`
* opens its calendar via `onClick`, with no `onFocus` opener). Forwarding a
* container click to `.focus()` would focus the control but leave the popup
* closed — so we `.click()` these instead. Plain text inputs (no popup) are
* unaffected and keep `.focus()`.
*/
function isPopupTrigger(el) {
	if (el.getAttribute("role") === "combobox") return true;
	const haspopup = el.getAttribute("aria-haspopup");
	return haspopup != null && HASPOPUP_VALUES.has(haspopup);
}
/**
* Hook that makes an input container wrapper clickable, delegating focus
* to the inner input/textarea when the user clicks non-interactive areas
* (icons, padding, status indicators).
*
* Nested interactive elements (clear buttons, links) are handled safely
* via useClickableContainer — clicking them does NOT steal focus.
*
* @compositionHint Use inside input wrapper components (TextInput,
* NumberInput, TimeInput, TextArea, etc.).
*
* @example
* ```
* const containerRef = useRef<HTMLDivElement>(null);
* const inputRef = useRef<HTMLInputElement>(null);
* const { onClick, onMouseUp } = useInputContainer({
*   containerRef,
*   inputRef,
* });
* return (
*   <div ref={containerRef} onClick={onClick} onMouseUp={onMouseUp}>
*     <Icon icon="search" />
*     <input ref={inputRef} />
*   </div>
* );
* ```
*/
function useInputContainer({ containerRef, inputRef, disabled = false }) {
	return useClickableContainer({
		containerRef,
		interactiveRef: inputRef,
		onClick: (0, import_react.useCallback)(() => {
			const input = inputRef.current;
			if (input == null) return;
			if (input instanceof HTMLElement && isPopupTrigger(input)) input.click();
			else if (input instanceof HTMLInputElement && FOCUS_INPUT_TYPES.has(input.type)) input.focus();
			else if (input instanceof HTMLTextAreaElement) input.focus();
			else if (input instanceof HTMLElement) input.click();
			else if ("focus" in input) input.focus();
		}, [inputRef]),
		disabled
	});
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/hooks/useInputStatusIcon.js
/**
* @file useInputStatusIcon.tsx
* @input Input status, statusVariant, and InputGroup awareness
* @output The on-field status icon element (with tooltip) and aria-describedby wiring
* @position Shared hook for bordered inputs that render a status affordance inside the control
*
* SYNC: When modified, update:
* - /packages/core/src/hooks/index.ts (exports)
*
* Centralizes the on-field status icon across the bordered inputs (TextInput,
* TextArea, NumberInput, DateInput, DateTimeInput, DateRangeInput, TimeInput,
* FileInput) so the three statusVariants behave consistently:
*
* - `attached`  → icon sits inside the control; the message box below carries
*   the text.
* - `detached`  → the detached message box renders its OWN leading icon, so the
*   on-field icon is suppressed here to avoid a duplicate glyph.
* - `tooltip`   → no message box renders; the status is surfaced through an
*   info-tip on the on-field icon. The icon is a real focusable `<button>` so
*   the status is reachable by every user, not just those with hover or a
*   screen reader:
*     - Keyboard (no AT): the button is in the tab order (WCAG 2.1.1) with a
*       visible focus ring (WCAG 2.4.7); focusing it opens the tooltip.
*     - Pointer: hover opens it (guarded to fine pointers).
*     - Touch: hover is unavailable, so a tap toggles the tooltip open/closed.
*     - Assistive tech: the button has an accessible name (its status type,
*       WCAG 4.1.2) and is described by the message via `aria-describedby`.
*     - Dismissible with Escape and hoverable (WCAG 1.4.13) via useTooltip.
*/
/**
* Maps each status type to its glyph. Shared so every input shows the same icon
* for a given status, matching the detached message box's leading icon.
*/
var STATUS_ICON = {
	warning: "warning",
	error: "error",
	success: "success"
};
/**
* Accessible-name i18n keys for the focusable status button, keyed by type.
*/
var STATUS_BUTTON_LABEL_KEY = {
	warning: "@astryx.input.statusButton.warning",
	error: "@astryx.input.statusButton.error",
	success: "@astryx.input.statusButton.success"
};
var styles$19 = { statusButton: {
	k1xSpc: "x3nfvp2",
	kGNEyG: "x6s0dn4",
	kjj79g: "xl56j7k",
	kmVPX3: "x1717udv",
	kogj98: "x1ghz6dp",
	kMzoRj: "xc342km",
	ksu8eU: "xng3xce",
	kWkggS: "xjbqb8w",
	kMwMTN: "x1heor9g",
	kkrTdU: "x1ypdohk x16khyan",
	kfzvcC: "x67bb7w",
	kaIpWk: "xjspbzw",
	kInvED: "x7s97pk",
	$$css: true
} };
/**
* Builds the on-field status icon and its accessibility wiring for a bordered
* input. See the file header for the per-variant behavior.
*/
function useInputStatusIcon({ status, statusVariant = "attached", isInGroup = false, size = "md" }) {
	const t = useTranslator();
	const hasTooltip = statusVariant === "tooltip" && !!status?.message;
	const [tapOpen, setTapOpen] = (0, import_react.useState)(void 0);
	const tooltip = useTooltip({
		placement: "above",
		isEnabled: hasTooltip,
		isOpen: tapOpen
	});
	const handleButtonBlur = (0, import_react.useCallback)(() => {
		setTapOpen(void 0);
	}, []);
	const handleButtonClick = (0, import_react.useCallback)(() => {
		if (typeof window === "undefined" || typeof window.matchMedia !== "function" || !window.matchMedia("(hover: none)").matches) return;
		setTapOpen((prev) => prev === true ? false : true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (tapOpen !== true) return;
		const onKeyDown = (e) => {
			if (e.key === "Escape") setTapOpen(void 0);
		};
		document.addEventListener("keydown", onKeyDown);
		return () => document.removeEventListener("keydown", onKeyDown);
	}, [tapOpen]);
	if (!(!!status && !isInGroup && statusVariant !== "detached")) return {
		statusIcon: null,
		describedBy: void 0
	};
	const icon = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Icon, {
		icon: STATUS_ICON[status.type],
		size,
		color: status.type,
		...themeProps("input-status-icon", {
			size,
			status: status.type
		})
	});
	if (!hasTooltip) return {
		statusIcon: icon,
		describedBy: void 0
	};
	return {
		statusIcon: /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/*#__PURE__*/ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			ref: tooltip.ref,
			"aria-label": t(STATUS_BUTTON_LABEL_KEY[status.type]),
			"aria-describedby": tooltip.describedBy,
			onClick: handleButtonClick,
			onBlur: handleButtonBlur,
			...props(focusOutlineStyles.focusVisible, styles$19.statusButton),
			children: icon
		}), tooltip.renderTooltip(status.message)] }),
		describedBy: tooltip.describedBy
	};
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/hooks/useIndicatorFocusRing.js
/**
* @file useIndicatorFocusRing.tsx
* @input A ref to the element wrapping only the indicator
* @output Focus handlers that draw the standard ring on the indicator itself
* @position Used by controls whose focusable input is visually hidden
*
* SYNC: When modified, update:
* - /packages/core/src/hooks/index.ts (exports)
*
* A checkbox or radio focuses a native `<input>` that is `opacity: 0`, so the
* visible focus indicator has to appear on the picture beside it — and that
* picture is a themeable indicator, which is what makes "who draws the ring"
* awkward:
*
* - Only the indicator's own element can shape the ring: `outline` follows
*   that element's `border-radius`. Draw it on a wrapper and the owner has to
*   hardcode a guess about whatever indicator it hosts (RadioListItem used to
*   carry `border-radius: 50%` for a circle it did not own).
* - But an indicator supplied by a theme is third-party code. If drawing the
*   ring is its job, a replacement that simply doesn't ships a control with no
*   visible focus (WCAG 2.4.7) — and that is the DEFAULT outcome: the sample
*   replacement in our own Storybook destructures `{state, size, isDisabled}`
*   and drops the rest, which is what a theme author plausibly writes. Nothing
*   can enforce otherwise; a component ignoring every prop is still assignable
*   to `IndicatorComponent`, and branding the return type does not work either
*   (JSX types every expression as `JSX.Element`).
*
* So the owner draws it, on the indicator's own element, imperatively at focus
* time. No cooperation is required and none can be forgotten.
*
* Two details that are load-bearing, both measured rather than assumed:
*
* 1. **Inline style, not a class.** React replaces `className` wholesale on
*    re-render, so an injected class disappears the moment the control changes
*    state — pressing Space on a focused checkbox lost the ring. React
*    reconciles `style` per property, so an `outline` set here survives.
* 2. **`:focus-visible`, not `:focus`.** The CSS this replaces got
*    keyboard-vs-pointer for free; an event handler has to ask. Checking the
*    element keeps the browser's heuristic, including `focus({focusVisible:
*    true})`, which a hand-rolled modality guess would miss.
*
* Imperative styling on an interaction event follows `useTableSelection`,
* which sets row-selection styles the same way.
*/
/**
* Draw the standard focus ring on the indicator inside `containerRef`, shaped
* by whatever that indicator actually is.
*
* @param containerRef - Wraps ONLY the indicator, so its single element child
*   is unambiguously the thing to ring, whatever a theme renders there.
* @param isDisabled - Skip the ring; a disabled control is not focusable.
*
* @example
* ```
* const indicatorRef = useRef<HTMLSpanElement>(null);
* const {focusProps} = useIndicatorFocusRing(indicatorRef, isDisabled);
* <div {...focusProps}>
*   <input type="checkbox" />
*   <span ref={indicatorRef}><Indicator state="checked" /></span>
* </div>
* ```
*/
function useIndicatorFocusRing(containerRef, isDisabled = false) {
	const paint = (0, import_react.useCallback)((on) => {
		const indicator = containerRef.current?.firstElementChild;
		if (indicator instanceof HTMLElement) Object.assign(indicator.style, on ? FOCUS_OUTLINE_PARTS : FOCUS_OUTLINE_PARTS_NONE);
	}, [containerRef]);
	const onFocus = (0, import_react.useCallback)((event) => {
		if (isDisabled) return;
		const target = event.target;
		if (target instanceof HTMLElement && !target.matches(":focus-visible")) return;
		paint(true);
	}, [isDisabled, paint]);
	const onBlur = (0, import_react.useCallback)(() => paint(false), [paint]);
	return (0, import_react.useMemo)(() => ({ focusProps: {
		onFocus,
		onBlur
	} }), [onFocus, onBlur]);
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/FormLayout/FormLayoutContext.js
/**
* @file FormLayoutContext.ts
* @input Layer-scoped React context
* @output Exports FormLayoutContext, FormLayoutDirection, and FormOptionality types
* @position Context for form layout direction + default-optionality detection
*
* SYNC: When modified, update these files to stay in sync:
* - /packages/core/src/FormLayout/FormLayout.tsx (prop + context value)
* - /packages/core/src/Field/FieldLabel.tsx (indicator resolution)
* - /packages/core/src/FormLayout/index.ts (exports if types change)
*/
/**
* Direction of form field arrangement.
*
* - `'vertical'` — Fields stack top-to-bottom (default). Most common.
* - `'horizontal'` — Fields occupy one `1fr` grid track per child in logical inline order.
* - `'horizontal-labels'` — Fields stack vertically while labels sit beside
*   their inputs on the inline-start side (settings/admin panel pattern).
*/
/**
* Which state a form treats as its default, so only the *exception* carries a
* visible optional/required indicator.
*
* - `'optional'` — fields are optional unless a field opts into `isRequired`;
*   only required fields show an indicator.
* - `'required'` — fields are required unless a field opts into `isOptional`;
*   only optional fields show an indicator.
*/
/**
* Context for detecting which form layout a component is rendered in. Children
* can use this to adapt their rendering based on the parent layout — direction
* for spatial arrangement, and `defaultOptionality` so a field can suppress the
* indicator that merely restates the form-wide default.
*/
var FormLayoutContext = createLayerScopedContext({ direction: "vertical" });
FormLayoutContext.displayName = "FormLayoutContext";
//#endregion
//#region node_modules/@astryxdesign/core/dist/Field/FieldLabel.js
/**
* @file FieldLabel.tsx
* @input Uses React, Icon, IconType, useTranslator, FormLayoutContext
* @output Exports FieldLabel component, FieldLabelProps
* @position Core label implementation; used by Field, CheckboxInput, Switch
*
* SYNC: When modified, update these files to stay in sync:
* - /packages/core/src/Field/Field.doc.mjs (props table, features, implementation notes)
* - /packages/core/src/Field/index.ts (exports if types change)
* - /packages/core/src/FormLayout/FormLayoutContext.ts (defaultOptionality drives the indicator)
* - /packages/cli/assets/templates/blocks/components/Field/ (showcase blocks)
* - /packages/core/locales/en.json (@astryx.field.required / @astryx.field.optional)
*/
var styles$18 = {
	label: {
		k1xSpc: "x78zum5",
		kGNEyG: "x6s0dn4",
		kOIVth: "xzye2dw",
		kMv6JI: "x9ynric",
		kGuDYH: "xcr08ib",
		kLWn49: "x1kq96og",
		k63SB2: "x1e4wzip",
		kMwMTN: "xv1l7n4",
		kkrTdU: "x1ypdohk x16khyan",
		$$css: true
	},
	labelDisabled: {
		kMwMTN: "xnbbluu",
		kkrTdU: "xt0e3qv",
		$$css: true
	},
	srOnly: {
		ksu8eU: "xng3xce",
		kMcinP: "xzpqnlu",
		kZKoxP: "xjm9jq1",
		kLqNvP: "x1o0tod",
		kogj98: "xkdpibf",
		kVQacm: "xb3r6kr",
		kmVPX3: "x1717udv",
		kfzvcC: "x47corl",
		kVAEAm: "x10l6tqk",
		k87sOh: "x13vifvy",
		kfSwDN: "x87ps6o",
		khDVqt: "xuxw1ft",
		kzqmXN: "x1i1rx1s",
		$$css: true
	}
};
/**
* Label + description group for form fields. Handles sr-only hiding,
* disabled styling, optional/required indicators, icons, and tooltips.
*
* When `isLabelHidden` is true the entire group uses sr-only positioning
* so it takes up zero layout space — no wrapper div left in flow.
*
* @example
* ```
* <FieldLabel label="Email" inputID={inputId} description="We won't share it" />
* <FieldLabel label="Search" inputID={inputId} isLabelHidden />
* ```
*/
function FieldLabel({ label, inputID, labelID, isGroupLabel = false, isLabelHidden = false, isDisabled = false, isOptional = false, isRequired = false, labelIcon, labelTooltip, description, descriptionID, className, style, xstyle, ref, ...rest }) {
	const t = useTranslator();
	const { defaultOptionality } = (0, import_react.use)(FormLayoutContext);
	const statusText = isOptional && defaultOptionality !== "optional" ? t("@astryx.field.optional") : isRequired && defaultOptionality !== "required" ? t("@astryx.field.required") : null;
	const LabelElement = isGroupLabel ? "span" : "label";
	const forwardsDescriptionClick = !isGroupLabel && inputID != null;
	const descriptionRef = (0, import_react.useRef)(null);
	const descriptionClickProps = useInputContainer({
		containerRef: descriptionRef,
		inputRef: (0, import_react.useMemo)(() => ({
			get current() {
				return inputID == null ? null : descriptionRef.current?.ownerDocument.getElementById(inputID) ?? null;
			},
			set current(_value) {}
		}), [inputID]),
		disabled: !forwardsDescriptionClick
	});
	const labelContent = /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		labelIcon && renderIconSlot(labelIcon, {
			size: "sm",
			color: "inherit"
		}),
		label,
		statusText && /*#__PURE__*/ (0, import_jsx_runtime.jsxs)("span", {
			className: "x1sodnla x141an7d x1ltkj2j xv1l7n4",
			children: [/*#__PURE__*/ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": "true",
				children: " ∙ "
			}), statusText]
		}),
		labelTooltip && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Tooltip, {
			content: labelTooltip,
			placement: "above",
			children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Icon, {
				icon: "info",
				size: "sm",
				color: "inherit"
			})
		})
	] });
	const labelElement = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(LabelElement, {
		ref,
		id: labelID,
		htmlFor: isGroupLabel ? void 0 : inputID,
		...rest,
		...mergeProps(themeProps("field-label"), props(styles$18.label, isDisabled && styles$18.labelDisabled, isLabelHidden && styles$18.srOnly, xstyle), className, style),
		children: labelContent
	});
	if (!description) return labelElement;
	return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)("div", {
		...{
			0: { className: "x78zum5 xdt5ytf" },
			1: { className: "xdt5ytf xjp7ctv" }
		}[!!isLabelHidden << 0],
		children: [labelElement, /*#__PURE__*/ (0, import_jsx_runtime.jsx)("span", {
			ref: forwardsDescriptionClick ? descriptionRef : void 0,
			id: descriptionID,
			...forwardsDescriptionClick ? descriptionClickProps : void 0,
			...{
				0: { className: "x9ynric x141an7d x1ltkj2j x1sodnla xv1l7n4" },
				2: { className: "x9ynric x141an7d x1ltkj2j x1sodnla xv1l7n4 x1ypdohk x16khyan" },
				1: { className: "x9ynric x141an7d x1ltkj2j x1sodnla xv1l7n4 xng3xce xzpqnlu xjm9jq1 x1o0tod xkdpibf xb3r6kr x1717udv x47corl x10l6tqk x13vifvy x87ps6o xuxw1ft x1i1rx1s" },
				3: { className: "x9ynric x141an7d x1ltkj2j x1sodnla xv1l7n4 x1ypdohk x16khyan xng3xce xzpqnlu xjm9jq1 x1o0tod xkdpibf xb3r6kr x1717udv x47corl x10l6tqk x13vifvy x87ps6o xuxw1ft x1i1rx1s" }
			}[!!forwardsDescriptionClick << 1 | !!isLabelHidden << 0],
			children: description
		})]
	});
}
FieldLabel.displayName = "FieldLabel";
//#endregion
//#region node_modules/@astryxdesign/core/dist/FieldStatus/useFieldStatusAnnouncement.js
/**
* @file useFieldStatusAnnouncement.ts
* @input Uses React useEffect and useAnnounce
* @output Exports the internal useFieldStatusAnnouncement hook
* @position Internal to the field family; the one place that decides when and
*   how loudly a field status message is spoken. FieldStatus calls it for the
*   attached and detached message boxes, and Field calls it for the tooltip
*   placement, which renders no FieldStatus. Not exported from the package.
*
* SYNC: When modified, update these files to stay in sync:
* - /packages/core/src/FieldStatus/FieldStatus.tsx
* - /packages/core/src/Field/Field.tsx
*/
/**
* Speaks a field status message through the persistent live regions:
* errors assertively, warnings and successes politely. It speaks when a
* message is first present, including on mount, and again whenever the
* message or its type changes. An absent or empty message is never spoken.
*
* The persistent regions are used instead of `role`/`aria-live` on the
* rendered message because a live region mounted together with its content is
* not reliably announced, and field status is almost always conditionally
* rendered.
*/
function useFieldStatusAnnouncement(message, type) {
	const announce = useAnnounce();
	(0, import_react.useEffect)(() => {
		if (message) announce(message, type === "error" ? "assertive" : "polite");
	}, [
		announce,
		message,
		type
	]);
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/FieldStatus/FieldStatus.js
/**
* @file FieldStatus.tsx
* @input Uses React, stylex, theme tokens, useFieldStatusAnnouncement, Icon
* @output Exports FieldStatus component, FieldStatusProps
* @position Core implementation; consumed by Field, Switch, CheckboxInput, and the FieldStatus entrypoint
*
* SYNC: When modified, update these files to stay in sync:
* - /packages/core/src/FieldStatus/FieldStatus.doc.mjs (props table, features, implementation notes)
* - /packages/core/src/Field/Field.doc.mjs (compat docs when public API changes)
* - /packages/core/src/FieldStatus/index.ts (exports if types change)
* - /packages/core/src/FieldStatus/useFieldStatusAnnouncement.ts (announcement timing shared with Field)
* - /packages/core/src/Field/index.ts (compat re-export if public API changes)
* - /packages/cli/assets/templates/blocks/components/FieldStatus/ (showcase blocks)
*/
/**
* Maps each status type to its status glyph. Mirrors the mapping the input
* controls already use for the on-field status affordance, so the detached
* message shows the same icon a consumer sees elsewhere for that status.
*/
var statusIconMap = {
	warning: "warning",
	error: "error",
	success: "success"
};
`${spacingVars["--spacing-1-5"]}`;
var styles$17 = {
	base: {
		kMv6JI: "x9ynric",
		kGuDYH: "x141an7d",
		kLWn49: "x1ltkj2j",
		$$css: true
	},
	attached: {
		keoZOQ: "x3dbumh",
		kLKAdn: "xdgtoc0",
		kGO01o: "x1wesfrj",
		kg3NbH: "xf314gf",
		kVL7Gh: "xquck67",
		kT0f0o: "x14i3lts",
		kfzvcC: "x47corl",
		$$css: true
	},
	detached: {
		keoZOQ: "xcsaf9d",
		k8WAf4: "xce4md1",
		kg3NbH: "xf314gf",
		kaIpWk: "xh6dtrn",
		$$css: true
	}
};
var colorStyles = {
	warning: {
		kWkggS: "x24i8r5",
		kMwMTN: "xdhq94a",
		$$css: true
	},
	error: {
		kWkggS: "x1pritpl",
		kMwMTN: "x1joocv1",
		$$css: true
	},
	success: {
		kWkggS: "xu13z74",
		kMwMTN: "xltfdvo",
		$$css: true
	}
};
/**
* FieldStatus variant type. Extensible via module augmentation of FieldStatusVariantMap.
*/
/**
* A status message component for form fields.
*
* The `detached` variant renders a leading status icon before the message so
* status is not conveyed by color or position alone (WCAG 1.4.1). The icon is
* decorative for assistive tech (`aria-hidden`): the message text already names
* the status in words and is announced through the live region. The `attached`
* variant keeps its status affordance on the bordered input, so it renders no
* icon here to avoid a duplicate. The `tooltip` variant renders no message box
* at all — the input surfaces the status through a tooltip on its on-field
* icon — so callers skip rendering FieldStatus for it.
*
* Screen-reader announcements go through the persistent `useAnnounce` live
* regions (assertive for errors, polite otherwise) rather than `role`/
* `aria-live` on the rendered element. Live regions that mount together with
* their content are not reliably announced by assistive technology, and
* FieldStatus is almost always conditionally rendered by its callers. The
* message is announced whenever it appears — including on first mount — and
* whenever it changes.
*
* @example
* ```
* <FieldStatus
*   type="error"
*   message="This field is required"
* />
* <FieldStatus
*   type="warning"
*   message="This will be visible to others"
*   variant="detached"
* />
* ```
*/
function FieldStatus({ ref, type, message, id, variant = "attached", xstyle, className, style, ...rest }) {
	const entryStyle = useEntryAnimation("slideDown");
	useFieldStatusAnnouncement(message, type);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
		ref,
		id,
		...rest,
		...mergeProps(themeProps("field-status", {
			type,
			variant
		}), props(styles$17.base, entryStyle, variant === "attached" ? styles$17.attached : styles$17.detached, colorStyles[type], xstyle), className, style),
		children: variant === "detached" ? /*#__PURE__*/ (0, import_jsx_runtime.jsxs)("span", {
			className: "x78zum5 x1cy8zhl xzye2dw",
			children: [/*#__PURE__*/ (0, import_jsx_runtime.jsx)("span", {
				className: "x3nfvp2 x6s0dn4 x14o5nre x2lah0s",
				children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Icon, {
					icon: statusIconMap[type],
					size: "sm",
					color: "inherit",
					...themeProps("field-status-icon", { type })
				})
			}), /*#__PURE__*/ (0, import_jsx_runtime.jsx)("span", { children: message })]
		}) : message
	});
}
FieldStatus.displayName = "FieldStatus";
//#endregion
//#region node_modules/@astryxdesign/core/dist/Indicator/indicator.markers.stylex.js
/**
* Scoped marker for indicator ancestor selectors.
*
* An owner (CheckboxInput's row, RadioListItem's row) applies this marker to
* the element whose hover and focus should drive the indicator's appearance.
* The indicator reads it through `stylex.when.ancestor()`, so interaction
* state stays in CSS instead of being threaded through React props — and
* owners that should *not* tint their indicator on hover (decorative menu
* markers, listbox options) simply don't apply the marker.
*
* Owners apply it only while enabled, so disabled controls get no hover
* feedback.
*/
var indicatorScope = {
	x1odsvnm: "x1odsvnm",
	$$css: true
};
//#endregion
//#region node_modules/@astryxdesign/core/dist/hooks/useResolvedRequired.js
/**
* @file useResolvedRequired.ts
* @input Uses React, FormLayoutContext
* @output Exports useResolvedRequired
* @position Resolves a field's effective aria-required against the form default
*
* SYNC: When modified, update these files to stay in sync:
* - /packages/core/src/FormLayout/FormLayoutContext.ts (defaultOptionality source)
* - /packages/core/src/FormLayout/FormLayout.tsx (prop doc: aria-required behavior)
*/
/**
* Resolve a field's effective *required* state for `aria-required`, honoring a
* surrounding `FormLayout`'s `defaultOptionality`.
*
* Under `defaultOptionality="required"` a field is required unless it opts out
* with `isOptional`. The visible indicator is suppressed for the unmarked
* majority, so those fields must still expose `aria-required` — otherwise a
* sighted user reads them as required (form-wide default, no indicator) while a
* screen reader hears "not required". This closes that mismatch.
*
* Semantics only: this drives `aria-required`, never the native `required`
* attribute, so a layout-level default can't silently switch on browser
* validation bubbles. `isOptional` takes precedence, matching `FieldLabel`.
*/
function useResolvedRequired({ isRequired = false, isOptional = false }) {
	const { defaultOptionality } = (0, import_react.use)(FormLayoutContext);
	return !isOptional && (isRequired || defaultOptionality === "required");
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/Indicator/CheckboxIndicator.js
/**
* @file CheckboxIndicator.tsx
* @input Indicator state props
* @output Exports CheckboxIndicator — the default checkbox selection visual
* @position Decorative checkbox visual shared by CheckboxInput, CheckboxList,
*           and decorative menu markers
*/
var styles$16 = {
	box: {
		kB7OPa: "x9f619",
		k1xSpc: "x78zum5",
		kGNEyG: "x6s0dn4",
		kjj79g: "xl56j7k",
		kmuXW: "x2lah0s",
		kMzoRj: "x1litavf",
		ksu8eU: "x1y0btm7",
		kaIpWk: "xx3sua9",
		k1ekBW: "xts7igz",
		kIyJzY: "xuedmi6 x12w9bfk",
		kAMwcw: "xlr8y92",
		$$css: true
	},
	unchecked: {
		kMwMTN: "xqwr325",
		kVAM5u: "xvy26l8 xilc7fp",
		kWkggS: "x10xzikg xeultfy",
		$$css: true
	},
	checked: {
		kMwMTN: "x17wrial",
		kVAM5u: "xad5do x1ozl1p1",
		kWkggS: "x1ewilqj x17srpfb",
		$$css: true
	},
	disabled: {
		kSiTet: "xbyyjgo",
		kVAM5u: "x14i3s5s x61roa7",
		$$css: true
	},
	disabledUnchecked: {
		kWkggS: "xwmxj5m xqxnq6d",
		$$css: true
	},
	checkmark: {
		k1xSpc: "x1s85apg",
		kMwMTN: "x17wrial xs5hli",
		$$css: true
	},
	checkmarkVisible: {
		k1xSpc: "x1lliihq",
		$$css: true
	},
	indeterminateMark: {
		k1xSpc: "x1s85apg",
		kWkggS: "x1azo05 xwvh9j7",
		kaIpWk: "xjspbzw",
		$$css: true
	},
	indeterminateMarkVisible: {
		k1xSpc: "x1lliihq",
		$$css: true
	}
};
var boxSizeStyles = {
	sm: {
		kzqmXN: "xw4jnvo",
		kZKoxP: "x1qx5ct2",
		$$css: true
	},
	md: {
		kzqmXN: "xvy4d1p",
		kZKoxP: "xxk0z11",
		$$css: true
	}
};
var checkmarkSizeStyles = {
	sm: {
		kzqmXN: "xsmyaan",
		kZKoxP: "x1kpxq89",
		$$css: true
	},
	md: {
		kzqmXN: "x6jxa94",
		kZKoxP: "x1v9usgg",
		$$css: true
	}
};
var indeterminateSizeStyles = {
	sm: {
		kzqmXN: "x1fsd2vl",
		kZKoxP: "x36qwtl",
		$$css: true
	},
	md: {
		kzqmXN: "xsmyaan",
		kZKoxP: "x36qwtl",
		$$css: true
	}
};
/**
* The default checkbox visual: a square box with a checkmark or an
* indeterminate bar.
*
* Decorative and non-interactive — it renders `aria-hidden` and owns no input,
* role, or focus behavior. The owning control keeps focus semantics and paints its
* standard focus ring onto this indicator element (see CheckboxInput), so a
* replacement's root radius determines the ring shape. Themes replace it
* wholesale through `defineTheme({indicators: {checkbox: MyCheckbox}})`, or
* restyle it through the canonical `checkbox-indicator` theme target.
*
* @example
* ```
* <CheckboxIndicator state="indeterminate" size="sm" />
* ```
*/
function CheckboxIndicator({ state, size = "md", isDisabled = false, children, ref, className, style, xstyle, ...rest }) {
	const isChecked = state === "checked";
	const isIndeterminate = state === "indeterminate";
	const isCheckedOrIndeterminate = isChecked || isIndeterminate;
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)("span", {
		...rest,
		ref,
		"aria-hidden": "true",
		...mergeProps(themeProps("checkbox-indicator", {
			size,
			checked: isChecked ? "checked" : isIndeterminate ? "indeterminate" : null,
			disabled: isDisabled ? "disabled" : null
		}), props(styles$16.box, boxSizeStyles[size], isCheckedOrIndeterminate ? styles$16.checked : styles$16.unchecked, isDisabled && styles$16.disabled, isDisabled && !isCheckedOrIndeterminate && styles$16.disabledUnchecked, xstyle), className, style),
		children: isRenderable(children) ? children : /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/*#__PURE__*/ (0, import_jsx_runtime.jsx)("svg", {
			viewBox: "0 0 10 10",
			...mergeProps(themeProps("checkbox-indicator-check", { size }), props(styles$16.checkmark, checkmarkSizeStyles[size], isChecked && styles$16.checkmarkVisible)),
			children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)("path", {
				d: "M8.5 2.5L4 7.5L1.5 5",
				stroke: "currentColor",
				strokeWidth: "1.5",
				fill: "none",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			})
		}), /*#__PURE__*/ (0, import_jsx_runtime.jsx)("span", { ...mergeProps(themeProps("checkbox-indicator-dash", { size }), props(styles$16.indeterminateMark, indeterminateSizeStyles[size], isIndeterminate && styles$16.indeterminateMarkVisible)) })] })
	});
}
CheckboxIndicator.displayName = "CheckboxIndicator";
//#endregion
//#region node_modules/@astryxdesign/core/dist/Indicator/CheckIndicator.js
/**
* @file CheckIndicator.tsx
* @input Indicator state props
* @output Exports CheckIndicator — the default single-selection mark
* @position Decorative check visual used wherever "this one is chosen" is
*           marked without a control: selector options, menu rows
*
* This is the indicator a product replaces to change what "chosen" looks like.
* `defineTheme({indicators: {check: RadioIndicator}})` turns every
* single-selection mark into a radio, in one line, without any component
* knowing it happened.
*
* It draws NOTHING when unchecked, which is what makes it the default: a
* listbox should not show an empty box beside every row. A replacement is free
* to draw in both states — a radio does — and hosting components render the
* indicator unconditionally so that works.
*
* Unlike the checkbox and radio indicators, this one renders no chrome of its
* own: it IS the glyph. Two consequences, both deliberate:
*
*   - It renders `<Icon>` directly rather than wrapping one, so the class the
*     host passes (`selector-check`, say) lands on the same element as
*     `astryx-icon` — one element carrying the mark and its theme target, per
*     the wrapper reduction in #4838/#4846.
*   - It adds NO theme target of its own. `astryx-checkbox-indicator` and
*     `astryx-radio-indicator` exist because those indicators draw chrome that
*     needs styling; a check is an icon, and `astryx-icon` plus the host's
*     target already reach it.
*/
/** The check glyph matches the control sizes the indicator families share. */
var iconSizeForIndicator = {
	sm: "sm",
	md: "sm"
};
var styles$15 = {
	slot: {
		k1xSpc: "x3nfvp2",
		kGNEyG: "x6s0dn4",
		kjj79g: "xl56j7k",
		kmuXW: "x2lah0s",
		kzqmXN: "xcdlrvm",
		kZKoxP: "x1l36t39",
		$$css: true
	},
	enabled: {
		kMwMTN: "xqwr325",
		$$css: true
	},
	disabled: {
		kMwMTN: "xqa6c3m",
		$$css: true
	}
};
/**
* The default single-selection mark: a checkmark when chosen, nothing when not.
*
* Decorative and non-interactive — it renders `aria-hidden` and owns no role,
* state, or focus behavior; the option or row that hosts it keeps all of that.
*
* @example
* ```
* <CheckIndicator state={isSelected ? 'checked' : 'unchecked'} size="sm" />
* ```
*
* Swap every single-selection mark for a radio:
*
* @example
* ```
* import {RadioIndicator} from '@astryxdesign/core/Indicator';
* defineTheme({name: 'brand', indicators: {check: RadioIndicator}});
* ```
*/
function CheckIndicator({ state, size = "md", isDisabled = false, children, ref, className, style, xstyle, ...rest }) {
	const isChecked = state === "checked";
	if (isRenderable(children)) return /*#__PURE__*/ (0, import_jsx_runtime.jsx)("span", {
		...rest,
		ref,
		"aria-hidden": "true",
		...mergeProps(props(styles$15.slot, isDisabled ? styles$15.disabled : styles$15.enabled, xstyle), className, style),
		children
	});
	if (!isChecked) return null;
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Icon, {
		...rest,
		"aria-hidden": "true",
		icon: "check",
		size: iconSizeForIndicator[size],
		color: isDisabled ? "disabled" : "accent",
		xstyle,
		className,
		style
	});
}
CheckIndicator.displayName = "CheckIndicator";
//#endregion
//#region node_modules/@astryxdesign/core/dist/Indicator/RadioIndicator.js
/**
* @file RadioIndicator.tsx
* @input Indicator state props
* @output Exports RadioIndicator — the default radio selection visual
* @position Decorative radio visual shared by RadioList, decorative menu
*           markers, and any selection slot themed to use a radio
*/
var styles$14 = {
	circle: {
		kB7OPa: "x9f619",
		k1xSpc: "x78zum5",
		kGNEyG: "x6s0dn4",
		kjj79g: "xl56j7k",
		kmuXW: "x2lah0s",
		kMzoRj: "x1litavf",
		ksu8eU: "x1y0btm7",
		kaIpWk: "xjspbzw",
		k1ekBW: "xts7igz",
		kIyJzY: "xuedmi6 x12w9bfk",
		kAMwcw: "xlr8y92",
		$$css: true
	},
	unchecked: {
		kVAM5u: "xvy26l8 xilc7fp",
		kWkggS: "x10xzikg xeultfy",
		$$css: true
	},
	checked: {
		kVAM5u: "xad5do x1ozl1p1",
		kWkggS: "x1ewilqj x17srpfb",
		$$css: true
	},
	disabled: {
		kSiTet: "xbyyjgo",
		kVAM5u: "x14i3s5s x61roa7",
		$$css: true
	},
	disabledUnchecked: {
		kWkggS: "xwmxj5m xqxnq6d",
		$$css: true
	},
	dot: {
		kaIpWk: "xjspbzw",
		kWkggS: "x1azo05 xwvh9j7",
		$$css: true
	}
};
var circleSizeStyles = {
	sm: {
		kzqmXN: "xw4jnvo",
		kZKoxP: "x1qx5ct2",
		$$css: true
	},
	md: {
		kzqmXN: "xvy4d1p",
		kZKoxP: "xxk0z11",
		$$css: true
	}
};
var dotSizeStyles = {
	sm: {
		kzqmXN: "x1xc55vz",
		kZKoxP: "xdk7pt",
		$$css: true
	},
	md: {
		kzqmXN: "x1fsd2vl",
		kZKoxP: "x170jfvy",
		$$css: true
	}
};
/**
* The default radio visual: a circle with a filled inner dot when selected.
*
* Decorative and non-interactive — it renders `aria-hidden` and owns no input,
* role, or focus behavior. Themes replace it wholesale through
* `defineTheme({indicators: {radio: MyRadio}})`, or restyle it through the
* `radio-indicator` / `radio-indicator-dot` theme targets like any other
* component.
*
* Unlike an icon, a radio draws in *both* states — an empty circle when
* unchecked. That is what makes it usable as a selection indicator in
* components whose default is "a checkmark when selected, nothing otherwise".
*
* @example
* ```
* <RadioIndicator state="checked" size="md" />
* ```
*/
function RadioIndicator({ state, size = "md", isDisabled = false, children, ref, className, style, xstyle, ...rest }) {
	const isChecked = state !== "unchecked";
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)("span", {
		...rest,
		ref,
		"aria-hidden": "true",
		...mergeProps(themeProps("radio-indicator", {
			size,
			checked: isChecked ? "checked" : null,
			disabled: isDisabled ? "disabled" : null
		}), props(styles$14.circle, circleSizeStyles[size], isChecked ? styles$14.checked : styles$14.unchecked, isDisabled && styles$14.disabled, isDisabled && !isChecked && styles$14.disabledUnchecked, xstyle), className, style),
		children: isRenderable(children) ? children : isChecked && /*#__PURE__*/ (0, import_jsx_runtime.jsx)("span", { ...mergeProps(themeProps("radio-indicator-dot", { size }), props(styles$14.dot, dotSizeStyles[size])) })
	});
}
RadioIndicator.displayName = "RadioIndicator";
//#endregion
//#region node_modules/@astryxdesign/core/dist/Indicator/indicatorRegistry.js
/**
* @file indicatorRegistry.ts
* @input Theme source and indicator name
* @output Exports the default indicator map and getIndicator resolution
* @position Server-safe indicator resolver; no 'use client' so it is
*           importable from RSC
*
* Two name spaces meet here, and keeping them apart is the whole design:
*
*   - {@link CoreIndicatorName} — the indicators Astryx itself ships. Closed,
*     and every one of them has a default, so resolving one always yields a
*     component.
*   - {@link IndicatorName} — every indicator name that exists, including the
*     ones other packages add by augmenting `IndicatorMap`. Open, and core has
*     no default for a name it has never heard of.
*
* `getIndicator` is overloaded along that seam: a core name resolves to a
* component, an augmented name resolves to a component *or* `undefined`, and
* the caller has to say what to do about it. Typing the map as total over the
* open union instead — which is what shipped in #4712 — made the compiler
* promise a component for `getIndicator('brand-star')` and hand back
* `undefined` at runtime.
*/
/**
* The indicator names Astryx ships a default for.
*
* Written out rather than derived from {@link IndicatorMap}, because that
* interface is open to augmentation and this set is not: it is exactly what is
* in {@link defaultIndicators} below. `indicatorRegistry.test.tsx` pins the two
* together in both directions.
*/
/**
* The indicators Astryx ships. A theme's `indicators` entries override these
* by name.
*
* Typed per family (rather than as one widened component type) so a default
* declared here has to accept the states its family passes — the same rule
* {@link IndicatorRegistry} holds replacements to.
*/
var defaultIndicators = {
	check: CheckIndicator,
	checkbox: CheckboxIndicator,
	radio: RadioIndicator
};
function getTheme(source) {
	if (source == null) return null;
	return typeof source === "string" ? getRegisteredTheme(source) : source;
}
function getThemeIndicators(source) {
	return getTheme(source)?.indicators ?? null;
}
/**
* Resolve an indicator component by name, preferring the theme's override and
* falling back to the built-in indicator.
*
* Works in both server and client environments. Client components should use
* the {@link useIndicator} hook, which resolves against the nearest `<Theme>`.
*
* @example
* ```
* const Radio = getIndicator('radio', themeName);
* <Radio state="checked" />
* ```
*
* For a name contributed by augmentation there is no built-in to fall back to,
* so the result is `undefined` unless a theme supplies one — the package that
* added the name owns its default:
*
* @example
* ```
* const Star = getIndicator('brand-star', themeName) ?? BrandStar;
* ```
*/
function getIndicator(name, source) {
	return getThemeIndicators(source)?.[name] ?? defaultIndicators[name];
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/Indicator/useIndicator.js
/**
* @file useIndicator.ts
* @input Indicator name
* @output Exports useIndicator hook for theme-aware indicator components
* @position Client hook used by controls that render a selection visual
*/
/**
* Resolve an indicator component from the nearest `<Theme>`.
*
* A core indicator always resolves. A name contributed by augmentation
* resolves only if a theme supplies it, so that overload returns
* `| undefined` — see {@link getIndicator}.
*
* @example
* ```
* const Checkbox = useIndicator('checkbox');
* return <Checkbox state={isChecked ? 'checked' : 'unchecked'} size={size} />;
* ```
*/
function useIndicator(name) {
	return getIndicator(name, useThemeName());
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/CheckboxInput/CheckboxInput.js
/**
* @file CheckboxInput.tsx
* @input Uses React, useId, ChangeEvent, FieldLabel, FieldStatus, IconType, InputStatus, useTooltip
* @output Exports CheckboxInput component, CheckboxInputProps
* @position Core implementation; consumed by index.ts, tested by CheckboxInput.test.tsx
*
* SYNC: When modified, update these files to stay in sync:
* - /packages/core/src/CheckboxInput/CheckboxInput.doc.mjs (props table, features, implementation notes)
* - /packages/core/src/CheckboxInput/CheckboxInput.test.tsx (tests for new/changed behavior)
* - /packages/core/src/CheckboxInput/index.ts (exports if types change)
* - /apps/storybook/stories/CheckboxInput.stories.tsx (storybook stories)
* - /packages/cli/assets/templates/blocks/components/CheckboxInput/ (showcase blocks)
*/
var styles$13 = {
	container: {
		k1xSpc: "x78zum5",
		kGNEyG: "x6s0dn4",
		kOIVth: "x1txdalj",
		$$css: true
	},
	containerLabelHidden: {
		kOIVth: "xxhr3t",
		$$css: true
	},
	checkboxWrapper: {
		kVAEAm: "x1n2onr6",
		k1xSpc: "x78zum5",
		kGNEyG: "x6s0dn4",
		kjj79g: "xl56j7k",
		kmuXW: "x2lah0s",
		kHBbk8: "xc8icb0",
		$$css: true
	},
	indicatorPressOverlay: {
		k5JduY: "x1s928wv",
		kwXMNM: "x1j6awrg",
		kv0HGH: "xarstr8",
		kUfP38: "xtb6wbx",
		kloYau: "x2q1x1w",
		ks3ayO: "xyhc2n1 xzywxsk x1gybruy",
		kNctxI: "x1ikgzpo xsozn46",
		$$css: true
	},
	input: {
		kVAEAm: "x10l6tqk",
		k87sOh: "xwa60dl",
		kogj98: "x1ghz6dp",
		kmVPX3: "x1717udv",
		kSiTet: "xg01cxk",
		kkrTdU: "x1ypdohk x16khyan",
		kY2c9j: "x1vjfegm",
		$$css: true
	},
	inputCoarse: {
		kjFi6P: "xkagaj0",
		kHzOjL: "x80b3aj",
		$$css: true
	},
	inputDisabled: {
		kkrTdU: "xt0e3qv",
		$$css: true
	}
};
var wrapperSizeStyles$1 = {
	sm: {
		kzqmXN: "xw4jnvo",
		kZKoxP: "x1qx5ct2",
		$$css: true
	},
	md: {
		kzqmXN: "xvy4d1p",
		kZKoxP: "xxk0z11",
		$$css: true
	}
};
var dynamicWidthStyles$1 = { width: (width) => [{
	kzqmXN: width != null ? "x5lhr3w" : width,
	$$css: true
}, { "--x-width": ((val) => typeof val === "number" ? val + "px" : val != null ? val : void 0)(width) }] };
/**
* A checkbox input component for toggling boolean values.
*
* @example
* ```
* <CheckboxInput
*   label="Accept terms"
*   value={accepted}
*   onChange={setAccepted}
* />
* <CheckboxInput
*   label="Subscribe"
*   description="Receive weekly updates"
*   value={subscribed}
*   onChange={setSubscribed}
* />
* ```
*/
function CheckboxInput({ id: idProp, label, isLabelHidden = false, description, onChange, changeAction, isLoading = false, value, isDisabled = false, htmlName, disabledMessage, isReadOnly = false, isOptional = false, isRequired = false, size = "md", onFocus, onBlur, labelIcon, status, width, xstyle, className, style, ref, "aria-describedby": ariaDescribedByProp, ...rest }) {
	const pressable = usePressFeedback();
	const generatedId = (0, import_react.useId)();
	const id = idProp || generatedId;
	const descriptionID = (0, import_react.useId)();
	const statusMessageID = (0, import_react.useId)();
	const isEffectivelyRequired = useResolvedRequired({
		isRequired,
		isOptional
	});
	const [, startTransition] = (0, import_react.useTransition)();
	const [optimisticValue, setOptimisticValue] = (0, import_react.useOptimistic)(value);
	const isBusy = isLoading || optimisticValue !== value;
	const showsDisabledMessage = isDisabled && !!disabledMessage;
	const disabledMessageTooltip = useTooltip({
		placement: "above",
		focusTrigger: "always",
		isEnabled: showsDisabledMessage
	});
	const CheckboxControl = useIndicator("checkbox");
	const indicatorRef = (0, import_react.useRef)(null);
	const { focusProps } = useIndicatorFocusRing(indicatorRef);
	const isIndeterminate = optimisticValue === "indeterminate";
	const isChecked = optimisticValue === true;
	const indeterminateRef = (0, import_react.useCallback)((el) => {
		if (el) el.indeterminate = isIndeterminate;
	}, [isIndeterminate]);
	const describedByParts = [];
	if (ariaDescribedByProp) describedByParts.push(ariaDescribedByProp);
	if (description) describedByParts.push(descriptionID);
	if (status?.message) describedByParts.push(statusMessageID);
	if (showsDisabledMessage) describedByParts.push(disabledMessageTooltip.describedBy);
	const ariaDescribedBy = describedByParts.length > 0 ? describedByParts.join(" ") : void 0;
	return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)("div", {
		...mergeProps(themeProps("checkbox-input", { size }), props(width != null && dynamicWidthStyles$1.width(width), xstyle), className, style),
		children: [
			/*#__PURE__*/ (0, import_jsx_runtime.jsxs)("div", {
				ref: (el) => {
					disabledMessageTooltip.interactionRef(el);
				},
				...isDisabled ? void 0 : pressable,
				...props(styles$13.container, isLabelHidden && styles$13.containerLabelHidden, !isDisabled && indicatorScope, !isDisabled && interactionOverlayStyles.pressedAlpha),
				children: [/*#__PURE__*/ (0, import_jsx_runtime.jsxs)("div", {
					...props(styles$13.checkboxWrapper, wrapperSizeStyles$1[size], !isDisabled && styles$13.indicatorPressOverlay),
					...focusProps,
					children: [/*#__PURE__*/ (0, import_jsx_runtime.jsx)("input", {
						...rest,
						ref: useMergedRefs(ref, indeterminateRef, disabledMessageTooltip.positionRef),
						id,
						type: "checkbox",
						name: isDisabled ? void 0 : htmlName,
						checked: isChecked,
						"aria-disabled": isDisabled ? "true" : void 0,
						form: isDisabled ? "" : void 0,
						onClick: isDisabled ? void 0 : rest.onClick,
						readOnly: isReadOnly,
						required: isRequired,
						"aria-required": isEffectivelyRequired ? "true" : void 0,
						onChange: (e) => {
							if (isDisabled || isBusy || isReadOnly) {
								e.target.indeterminate = isIndeterminate;
								return;
							}
							const checked = e.target.checked;
							onChange?.(checked, e);
							if (changeAction && !e.defaultPrevented) startTransition(async () => {
								setOptimisticValue(checked);
								await changeAction(checked, e);
							});
						},
						onFocus,
						onBlur,
						"aria-readonly": isReadOnly || void 0,
						"aria-describedby": ariaDescribedBy,
						"aria-invalid": status?.type === "error" ? true : void 0,
						"aria-busy": isBusy || void 0,
						...props(styles$13.input, rtlStyles.centerInline("-50%"), styles$13.inputCoarse, wrapperSizeStyles$1[size], isDisabled && styles$13.inputDisabled)
					}), /*#__PURE__*/ (0, import_jsx_runtime.jsx)("span", {
						ref: indicatorRef,
						className: "xjp7ctv",
						children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(CheckboxControl, {
							state: isIndeterminate ? "indeterminate" : isChecked ? "checked" : "unchecked",
							size,
							isDisabled,
							children: isBusy ? /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Spinner, {
								size: "sm",
								shade: "inherit"
							}) : null
						})
					})]
				}), /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
					className: "x78zum5 xdt5ytf",
					children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FieldLabel, {
						...themeProps("checkbox-label"),
						label,
						inputID: id,
						isLabelHidden,
						isDisabled,
						isOptional,
						isRequired,
						labelIcon,
						description,
						descriptionID
					})
				})]
			}),
			status?.message && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FieldStatus, {
				type: status.type,
				message: status.message,
				id: statusMessageID,
				variant: "detached"
			}),
			showsDisabledMessage && disabledMessageTooltip.renderTooltip(disabledMessage)
		]
	});
}
CheckboxInput.displayName = "CheckboxInput";
//#endregion
//#region node_modules/@astryxdesign/core/dist/Item/ItemDescriptionContext.js
/**
* @file ItemDescriptionContext.tsx
* @input Uses React createContext
* @output Exports ItemDescriptionContext
* @position Internal seam between Item and a control it renders in a slot
*
* Item renders the row's description and owns the element that holds it. A
* control Item renders in a slot — the checkbox in CheckboxListItem, for
* example — has to point at that element with `aria-describedby`, and only
* Item knows its id.
*
* Publishing the id here keeps that wiring internal. The alternative, a public
* `descriptionId` prop, would fail `spec:AST-002/DEC-1`: the caller decides
* nothing, and Item can derive the id itself. Wrapping the description in an
* id'd element instead would turn a plain string into a ReactNode and drop the
* single-line truncation ListItem documents.
*
* `null` when the row renders no description, so a consumer adds no dangling
* `aria-describedby`.
*/
var ItemDescriptionContext = /*#__PURE__*/ (0, import_react.createContext)(null);
ItemDescriptionContext.displayName = "ItemDescriptionContext";
//#endregion
//#region node_modules/@astryxdesign/core/dist/Item/Item.js
/**
* @file Item.tsx
* @input Uses React, ReactNode, StyleXStyles, theme tokens, useClickableContainer
* @output Exports Item component, ItemProps type; publishes the shared inline inset
* @position Core layout primitive; consumed by index.ts, tested by Item.test.tsx
*
* The swipe actions live in ItemSwipeLayer, reached only through a dynamic
* import when `swipeActions` is set: this module imports nothing of the
* gesture, so a row without swipe actions ships none of it. The root here
* still carries the swipe styles and forwards its events into the bridge the
* layer fills, so a swipeable row keeps the DOM and the event model it had
* when the gesture was imported here (Item.source-build.test.mjs pins the
* import graph).
*
* SYNC: When modified, update these files to stay in sync:
* - /packages/core/src/Item/Item.doc.mjs
* - /packages/core/src/Item/Item.test.tsx
* - /packages/core/src/Item/ItemSwipeLayer.tsx
* - /packages/core/src/Item/index.ts
* - /apps/storybook/stories/Item.stories.tsx
* - /packages/cli/assets/templates/blocks/components/Item/ (showcase blocks)
*/
var LazyItemSwipeLayer = /*#__PURE__*/ (0, import_react.lazy)(async () => Promise.resolve().then(() => ItemSwipeLayer_exports));
/**
* How a swipe action looks: ordinary, the one you mean, the dangerous one.
* Three flavours of verb, not a status set.
*/
/** One verb a sideways drag uncovers. Every field is known before the gesture begins. */
/**
* `reveal`: past half the panel the row rests open with every entry a real
* button; a long drag or a fling fires the outermost. `commit`: a release
* past the commit point slides the row out and fires the outermost entry;
* nothing rests, and the panel is presentational.
*/
/**
* Roles on which WAI-ARIA permits the aria-selected attribute.
* https://www.w3.org/TR/wai-aria-1.2/#aria-selected
*/
var ARIA_SELECTED_ROLES = /* @__PURE__ */ new Set([
	"option",
	"tab",
	"row",
	"gridcell",
	"columnheader",
	"rowheader",
	"treeitem"
]);
/**
* Roles whose content model permits interactive descendants, so a swipe
* panel's buttons may live inside the row. A row with no role at all
* qualifies too; `option`, the `menuitem*` roles and the rest do not.
*/
var SWIPE_ROLES = /* @__PURE__ */ new Set(["listitem"]);
var styles$12 = {
	root: {
		k1xSpc: "x78zum5",
		kGNEyG: "x6s0dn4",
		kOIVth: "x1txdalj",
		"--_item-inset-inline": "xw1s368",
		kg3NbH: "xaip428",
		kVAEAm: "x1n2onr6",
		kB7OPa: "x9f619",
		k9WMMc: "x1yc453h",
		kaIpWk: "xh6dtrn",
		$$css: true
	},
	alignStart: {
		kGNEyG: "x1cy8zhl",
		$$css: true
	},
	alignFirstLine: {
		kGNEyG: "x1pha0wt",
		$$css: true
	},
	interactive: {
		kkrTdU: "x1ypdohk x16khyan",
		k1ekBW: "x15406qy",
		kIyJzY: "xkvfbh3",
		kAMwcw: "xlr8y92",
		$$css: true
	},
	highlighted: {
		kWkggS: "x1lmrjuc",
		$$css: true
	},
	selected: {
		kWkggS: "xgcxg3y",
		$$css: true
	},
	disabled: {
		kkrTdU: "xt0e3qv",
		kfzvcC: "x47corl",
		$$css: true
	},
	linkRoot: {
		kMwMTN: "x1heor9g",
		kybGjl: "x1hl2dhg",
		$$css: true
	},
	inlineLabel: {
		kmuXW: "x2lah0s",
		$$css: true
	},
	inlineDescription: {
		kmuXW: "xs83m0k",
		k7Eaqz: "xeuugli",
		$$css: true
	},
	label: {
		kMwMTN: "x5tbw38",
		kGuDYH: "xjm74w1",
		kLWn49: "xw6l6zx",
		$$css: true
	},
	labelSingleTruncate: {
		kVQacm: "xb3r6kr",
		kg5iWk: "xlyipyv",
		khDVqt: "xuxw1ft",
		$$css: true
	},
	labelMultiTruncate: {
		kVQacm: "xb3r6kr",
		k1xSpc: "x104kibb",
		kgKLqz: "x1ua5tub",
		$$css: true
	},
	description: {
		kMwMTN: "x1gb3s7i",
		kGuDYH: "x141an7d",
		kLWn49: "x1ltkj2j",
		$$css: true
	},
	descriptionSingleTruncate: {
		kVQacm: "xb3r6kr",
		kg5iWk: "xlyipyv",
		khDVqt: "xuxw1ft",
		$$css: true
	},
	descriptionMultiTruncate: {
		kVQacm: "xb3r6kr",
		k1xSpc: "x104kibb",
		kgKLqz: "x1ua5tub",
		$$css: true
	},
	swipeRoot: {
		kHBbk8: "xc8icb0",
		kFalU9: "xx69xxh",
		k3aq6I: "x1kncwj0",
		k1ekBW: "xuo13n2",
		kIyJzY: "x15p14ac",
		kAMwcw: "x158wxwp",
		$$css: true
	}
};
var dynamicStyles$3 = { lineClamp: (lines) => [{
	kJFfOR: lines != null ? "x1yhjpo9" : lines,
	$$css: true
}, { "--x-WebkitLineClamp": lines != null ? lines : void 0 }] };
var densityStyles = {
	compact: {
		k8WAf4: "xu0wf1k",
		$$css: true
	},
	balanced: {
		k8WAf4: "xce4md1",
		$$css: true
	},
	spacious: {
		k8WAf4: "x8o8v82",
		"--_item-inset-inline": "x1ytau7y",
		$$css: true
	}
};
/**
* A universal item primitive that unifies the "start content + label +
* description + end content" layout pattern. Use as a building block for list items,
* menu items, contact rows, notification items, and more.
*
* @example
* ```
* <Item
*   startContent={<Avatar src={user.avatar} size="sm" />}
*   label={user.name}
*   description={user.role}
*   endContent={<Badge>Admin</Badge>}
*   onClick={() => navigate(`/users/${user.id}`)}
* />
* ```
*/
function Item({ as: Component = "div", marker, startContent, label, description, endContent, align = "center", density = "balanced", labelLines, descriptionLines, layout = "stacked", onClick, interactiveRef, href, target: targetFromProps, rel: relFromProps, isHighlighted = false, isSelected = false, isDisabled = false, swipeActions, swipeBehavior = "reveal", xstyle, className, style, ref, role, ...restProps }) {
	const pressable = usePressFeedback();
	const LinkComponent = useLinkComponent();
	const isDelegate = interactiveRef != null;
	const containerRef = (0, import_react.useRef)(null);
	const { onClick: delegatedOnClick } = useClickableContainer({
		containerRef,
		interactiveRef: interactiveRef ?? void 0,
		disabled: isDisabled
	});
	useDevWarning("Item", "`interactiveRef` is mutually exclusive with `onClick`/`href`. In delegation mode the row only forwards clicks to the referenced control, so `onClick`/`href` are ignored. Drop one of them.", isDelegate && (onClick != null || href != null));
	const isInteractive = onClick != null || href != null || isDelegate;
	const { target, rel } = computeTargetAndRel(targetFromProps, relFromProps);
	const hasParentRole = role != null;
	const isLinkRoot = typeof Component !== "string" && href != null;
	const leadingSwipe = swipeActions?.leading ?? [];
	const trailingSwipe = swipeActions?.trailing ?? [];
	const hasSwipe = swipeActions != null && (leadingSwipe.length > 0 || trailingSwipe.length > 0) && !isDisabled && !isDelegate && !isLinkRoot && (role == null || SWIPE_ROLES.has(role));
	useDevWarning("Item", "`swipeBehavior=\"commit\"` fires only the outermost entry of a side; the other entries have no touch path. Give a committing side one entry, or use `swipeBehavior=\"reveal\"`.", hasSwipe && swipeBehavior === "commit" && (leadingSwipe.length > 1 || trailingSwipe.length > 1));
	const swipeRootRef = (0, import_react.useRef)(null);
	const swipeBridgeRef = (0, import_react.useRef)(null);
	const setSwipeBridge = (0, import_react.useCallback)((bridge) => {
		swipeBridgeRef.current = bridge;
	}, []);
	const linkRootProps = isLinkRoot ? {
		href: isDisabled ? void 0 : href,
		target: isDisabled ? void 0 : target,
		rel: isDisabled ? void 0 : rel
	} : null;
	const allowsAriaSelected = role != null && ARIA_SELECTED_ROLES.has(role);
	const descriptionID = (0, import_react.useId)();
	const hasRenderableDescription = isRenderable(description);
	const isStringLabel = typeof label === "string";
	const isStringDescription = typeof description === "string";
	const labelTruncateStyle = labelLines != null ? labelLines === 1 ? styles$12.labelSingleTruncate : styles$12.labelMultiTruncate : isStringLabel ? styles$12.labelSingleTruncate : null;
	const isInline = layout === "inline" && description != null;
	const descriptionTruncateStyle = descriptionLines != null ? descriptionLines === 1 ? styles$12.descriptionSingleTruncate : styles$12.descriptionMultiTruncate : isStringDescription || isInline ? styles$12.descriptionSingleTruncate : null;
	const labelAndDescription = /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/*#__PURE__*/ (0, import_jsx_runtime.jsx)("span", {
		...props(styles$12.label, isInline && styles$12.inlineLabel, labelTruncateStyle, labelLines != null && labelLines > 1 && dynamicStyles$3.lineClamp(labelLines)),
		children: label
	}), description != null && /*#__PURE__*/ (0, import_jsx_runtime.jsx)("span", {
		id: hasRenderableDescription ? descriptionID : void 0,
		...props(styles$12.description, isInline && styles$12.inlineDescription, descriptionTruncateStyle, descriptionLines != null && descriptionLines > 1 && dynamicStyles$3.lineClamp(descriptionLines)),
		children: description
	})] });
	const handleContainerClick = (e) => {
		if (isDisabled) return;
		if (e.target.closest("button, a, input, select, textarea")) return;
		onClick?.(e);
	};
	const innerContent = /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		marker,
		startContent != null && /*#__PURE__*/ (0, import_jsx_runtime.jsx)("span", {
			...{
				0: { className: "x3psx0u x78zum5" },
				1: { className: "x3psx0u x78zum5 x6s0dn4 x4jt1l0 xk9ib7f x1xb3ux x1899uy6 x1xcinxp" }
			}[!!(align === "first-line") << 0],
			children: startContent
		}),
		hasParentRole || isDelegate ? /*#__PURE__*/ (0, import_jsx_runtime.jsx)("span", {
			...{
				0: { className: "x78zum5 xdt5ytf x98rzlu xeuugli x1yc453h" },
				2: { className: "x78zum5 x98rzlu xeuugli x1yc453h x1q0g3np x6s0dn4 x1lfs0n9" },
				1: { className: "x78zum5 xdt5ytf x98rzlu xeuugli x1yc453h xbyyjgo" },
				3: { className: "x78zum5 x98rzlu xeuugli x1yc453h x1q0g3np x6s0dn4 x1lfs0n9 xbyyjgo" }
			}[!!isInline << 1 | !!isDisabled << 0],
			children: labelAndDescription
		}) : href != null && !isLinkRoot ? /*#__PURE__*/ (0, import_jsx_runtime.jsx)(LinkComponent, {
			href,
			target,
			rel,
			"aria-disabled": isDisabled || void 0,
			tabIndex: isDisabled ? -1 : void 0,
			...{
				0: { className: "xmper1u x16khyan x1heor9g x78zum5 xdt5ytf x98rzlu xeuugli x1yc453h x1hl2dhg x1a2a7pz" },
				2: { className: "xmper1u x16khyan x1heor9g x78zum5 x98rzlu xeuugli x1yc453h x1hl2dhg x1a2a7pz x1q0g3np x6s0dn4 x1lfs0n9" },
				1: { className: "xmper1u x16khyan x1heor9g x78zum5 xdt5ytf x98rzlu xeuugli x1yc453h x1hl2dhg x1a2a7pz xbyyjgo" },
				3: { className: "xmper1u x16khyan x1heor9g x78zum5 x98rzlu xeuugli x1yc453h x1hl2dhg x1a2a7pz x1q0g3np x6s0dn4 x1lfs0n9 xbyyjgo" }
			}[!!isInline << 1 | !!isDisabled << 0],
			children: labelAndDescription
		}) : onClick != null ? /*#__PURE__*/ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick,
			disabled: isDisabled,
			...{
				0: { className: "xmper1u x16khyan x1heor9g x78zum5 xdt5ytf x98rzlu xeuugli x1yc453h x1a2a7pz" },
				2: { className: "xmper1u x16khyan x1heor9g x78zum5 x98rzlu xeuugli x1yc453h x1a2a7pz x1q0g3np x6s0dn4 x1lfs0n9" },
				1: { className: "xmper1u x16khyan x1heor9g x78zum5 xdt5ytf x98rzlu xeuugli x1yc453h x1a2a7pz xbyyjgo" },
				3: { className: "xmper1u x16khyan x1heor9g x78zum5 x98rzlu xeuugli x1yc453h x1a2a7pz x1q0g3np x6s0dn4 x1lfs0n9 xbyyjgo" }
			}[!!isInline << 1 | !!isDisabled << 0],
			children: labelAndDescription
		}) : /*#__PURE__*/ (0, import_jsx_runtime.jsx)("span", {
			...{
				0: { className: "x78zum5 xdt5ytf x98rzlu xeuugli x1yc453h" },
				2: { className: "x78zum5 x98rzlu xeuugli x1yc453h x1q0g3np x6s0dn4 x1lfs0n9" },
				1: { className: "x78zum5 xdt5ytf x98rzlu xeuugli x1yc453h xbyyjgo" },
				3: { className: "x78zum5 x98rzlu xeuugli x1yc453h x1q0g3np x6s0dn4 x1lfs0n9 xbyyjgo" }
			}[!!isInline << 1 | !!isDisabled << 0],
			children: labelAndDescription
		}),
		endContent != null && /*#__PURE__*/ (0, import_jsx_runtime.jsx)("span", {
			...{
				0: { className: "x3psx0u x78zum5 xvc5jky" },
				2: { className: "x3psx0u x78zum5 xvc5jky x6s0dn4 x4jt1l0 xk9ib7f x1xb3ux x1899uy6 x1xcinxp" },
				1: { className: "x3psx0u x78zum5 xvc5jky xbyyjgo" },
				3: { className: "x3psx0u x78zum5 xvc5jky x6s0dn4 x4jt1l0 xk9ib7f x1xb3ux x1899uy6 x1xcinxp xbyyjgo" }
			}[!!(align === "first-line") << 1 | !!isDisabled << 0],
			children: endContent
		})
	] });
	const mergedRef = useMergedRefs(ref, containerRef);
	const rootRef = useMergedRefs(isDelegate ? mergedRef : ref, hasSwipe ? swipeRootRef : void 0);
	const primaryOnClick = isDelegate ? delegatedOnClick : hasParentRole ? onClick : isInteractive ? handleContainerClick : void 0;
	const rootOnClick = hasSwipe && primaryOnClick != null ? (event) => {
		if (swipeBridgeRef.current?.shouldSuppressClick() === true) return;
		primaryOnClick(event);
	} : primaryOnClick;
	const swipeHandlers = hasSwipe ? {
		onPointerDown: (event) => swipeBridgeRef.current?.handlers.onPointerDown(event),
		onPointerMove: (event) => swipeBridgeRef.current?.handlers.onPointerMove(event),
		onPointerUp: (event) => swipeBridgeRef.current?.handlers.onPointerUp(event),
		onPointerCancel: (event) => swipeBridgeRef.current?.handlers.onPointerCancel(event),
		onClickCapture: (event) => swipeBridgeRef.current?.handlers.onClickCapture(event),
		onKeyDown: (event) => swipeBridgeRef.current?.handlers.onKeyDown(event)
	} : void 0;
	return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(Component, {
		ref: rootRef,
		...restProps,
		...swipeHandlers,
		...linkRootProps,
		"aria-selected": allowsAriaSelected && isSelected || void 0,
		"aria-current": restProps["aria-current"] ?? (isSelected && !allowsAriaSelected ? true : void 0),
		"aria-disabled": isDisabled || void 0,
		...isInteractive ? pressable : void 0,
		...mergeProps(themeProps("item", {
			density,
			align
		}), focusOutlineProps.focusWithin(styles$12.root, densityStyles[density], align === "start" && styles$12.alignStart, align === "first-line" && styles$12.alignFirstLine, isInteractive && styles$12.interactive, isInteractive && interactionOverlayStyles.backgroundColor, isLinkRoot && styles$12.linkRoot, isHighlighted && styles$12.highlighted, isSelected && styles$12.selected, isDisabled && !hasParentRole && styles$12.disabled, hasSwipe && styles$12.swipeRoot, xstyle), className, style),
		role,
		onClick: rootOnClick,
		children: [/*#__PURE__*/ (0, import_jsx_runtime.jsx)(ItemDescriptionContext, {
			value: hasRenderableDescription ? descriptionID : null,
			children: innerContent
		}), hasSwipe && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
			fallback: null,
			children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(LazyItemSwipeLayer, {
				rootRef: swipeRootRef,
				onBridge: setSwipeBridge,
				leading: leadingSwipe,
				trailing: trailingSwipe,
				behavior: swipeBehavior
			})
		})]
	});
}
Item.displayName = "Item";
//#endregion
//#region node_modules/@astryxdesign/core/dist/List/ListItem.js
/**
* @file ListItem.tsx
* @input Uses React, ReactNode, StyleXStyles, theme tokens, the List row edge
*   treatment, CheckboxInput, and the marker or task checkbox a
*   ListMarkerScope sets (Markdown's nested lists and the task items of mixed
*   lists)
* @output Exports ListItem component, ListItemProps type
* @position Core implementation; consumed by List, index.ts, tested by List.test.tsx
*
* Composes Item for the shared start content + label + description + end content layout
* and the invisible button/anchor interactive pattern.
*
* SYNC: When modified, update these files to stay in sync:
* - /packages/core/src/List/List.doc.mjs
* - /packages/core/src/List/List.test.tsx
* - /packages/core/src/List/index.ts
* - /apps/storybook/stories/List.stories.tsx
* - /packages/cli/assets/templates/blocks/components/List/ (showcase blocks)
*/
var styles$11 = {
	withCounter: {
		kAmcRD: "xfrknyr",
		$$css: true
	},
	edgeFlush: {
		"--_item-inset-inline": "x1nwg5ib",
		$$css: true
	},
	edgeOutset: {
		keTefX: "xch736x",
		k71WvV: "x2gtn1o",
		$$css: true
	},
	edgeBleed: {
		kZCmMZ: "xua885n",
		kwRFfy: "x1pyz5s7",
		kaIpWk: "x2u8bby",
		$$css: true
	},
	withDivider: {
		kt9PQ7: "x92x3c3",
		kfdmCh: "x1q0q8m5",
		kL6WhQ: "xw8gpjh",
		kx8K5S: "x1t1lzn6",
		$$css: true
	}
};
var markerStyles = {
	dot: {
		kzqmXN: "x1v4s8kt",
		kZKoxP: "xols6we",
		kaIpWk: "x16rqkct",
		kWkggS: "x19aspcf",
		$$css: true
	},
	circle: {
		kzqmXN: "x1v4s8kt",
		kZKoxP: "xols6we",
		kaIpWk: "x16rqkct",
		kMzoRj: "xmkeg23",
		ksu8eU: "x1y0btm7",
		kVAM5u: "xqcx1ss",
		kWkggS: "xjbqb8w",
		$$css: true
	},
	square: {
		kzqmXN: "x1v4s8kt",
		kZKoxP: "xols6we",
		kWkggS: "x19aspcf",
		$$css: true
	},
	number: {
		kSGwAc: "xoi2r2e",
		kmuXW: "x2lah0s",
		kMwMTN: "x1tgivj0",
		kGuDYH: "xjm74w1",
		kLWn49: "xw6l6zx",
		kzqmXN: "x12xnipv",
		$$css: true
	},
	decimal: {
		kgeoSG: "xc2ndz5",
		$$css: true
	},
	lowerAlpha: {
		kgeoSG: "x1mls8ih",
		$$css: true
	},
	lowerRoman: {
		kgeoSG: "xdaf9gw",
		$$css: true
	}
};
/** The number styles, by marker. */
var NUMBER_STYLES = {
	decimal: markerStyles.decimal,
	"lower-alpha": markerStyles.lowerAlpha,
	"lower-roman": markerStyles.lowerRoman
};
var embeddedStyles = { noRadius: {
	kaIpWk: "x2u8bby",
	$$css: true
} };
/**
* A list item component for use within List.
*
* Renders structured content with label, description, start/end content areas.
* When `onClick` is provided, uses the invisible button pattern for accessibility.
* When `href` is provided, uses an invisible anchor pattern.
*
* @example
* ```
* <ListItem label="Settings" description="Manage your preferences" />
* <ListItem label="Profile" onClick={() => navigate('/profile')} />
* <ListItem label="Docs" href="/docs" target="_blank" rel="noreferrer" />
* ```
*/
function ListItem({ label, description, startContent, endContent, onClick, interactiveRef, href, target, rel, isDisabled = false, isSelected = false, align, xstyle, className, style, ref, ...restProps }) {
	const ctx = (0, import_react.use)(ListContext);
	const density = ctx?.density ?? "balanced";
	const hasDividers = ctx?.hasDividers ?? false;
	const edge = ctx?.edge ?? "padded";
	const listStyle = ctx?.listStyle ?? "none";
	const hasMarkers = listStyle !== "none";
	const markerKind = listStyle === "none" ? null : ctx?.marker ?? listStyle;
	const task = markerKind == null ? void 0 : ctx?.task;
	const marker = task != null ? /*#__PURE__*/ (0, import_jsx_runtime.jsx)("span", {
		className: "xqcrz7y x78zum5 x2lah0s x1oms9s6",
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(CheckboxInput, {
			size: "sm",
			value: task.isChecked,
			label: task.label,
			isLabelHidden: true,
			isReadOnly: true
		})
	}) : markerKind === "disc" || markerKind === "circle" || markerKind === "square" ? /*#__PURE__*/ (0, import_jsx_runtime.jsx)("span", {
		className: "xoi2r2e x9f619 x78zum5 x6s0dn4 xl56j7k x2lah0s x12xnipv x1233pnv",
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)("span", { ...props(markerKind === "disc" ? markerStyles.dot : markerKind === "circle" ? markerStyles.circle : markerStyles.square) })
	}) : markerKind != null ? /*#__PURE__*/ (0, import_jsx_runtime.jsx)("span", { ...props(markerStyles.number, NUMBER_STYLES[markerKind]) }) : null;
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Item, {
		as: "li",
		ref,
		marker,
		startContent,
		label,
		description,
		endContent,
		onClick,
		interactiveRef,
		href,
		target,
		rel,
		isDisabled,
		isSelected,
		align,
		density,
		xstyle: [
			hasMarkers && styles$11.withCounter,
			hasDividers && styles$11.withDivider,
			hasDividers && embeddedStyles.noRadius,
			edge === "flush" && styles$11.edgeFlush,
			edge === "outset" && styles$11.edgeOutset,
			edge === "bleed" && styles$11.edgeBleed,
			xstyle
		],
		...mergeProps(themeProps("list-item"), {
			className,
			style
		}),
		...restProps
	});
}
ListItem.displayName = "ListItem";
//#endregion
//#region node_modules/@astryxdesign/core/dist/Field/Field.js
/**
* @file Field.tsx
* @input Uses React, StyleX, BaseProps, FieldLabel/FieldStatus, FormLayoutContext, Text, VisuallyHidden, theme/status utilities
* @output Exports Field component, FieldProps
* @position Core implementation; consumed by index.ts, tested by Field.test.tsx
*
* SYNC: When modified, update these files to stay in sync:
* - /packages/core/src/Field/Field.doc.mjs (props table, features, implementation notes)
* - /packages/core/src/Field/Field.test.tsx (tests for new/changed behavior)
* - /packages/core/src/Field/index.ts (exports if types change)
* - /apps/storybook/stories/Field.stories.tsx (storybook stories)
* - /packages/cli/assets/templates/blocks/components/Field/ (showcase blocks)
*/
var styles$10 = {
	container: {
		k1xSpc: "x78zum5",
		kXwgrk: "xdt5ytf",
		kHBbk8: "xc8icb0",
		k7Eaqz: "xeuugli",
		$$css: true
	},
	containerGap: {
		kOIVth: "xzye2dw",
		$$css: true
	},
	horizontalLabels: {
		k1xSpc: "xjp7ctv",
		$$css: true
	},
	attachedStatusLayer: {
		kVAEAm: "x1n2onr6",
		kY2c9j: "x8knxv4",
		$$css: true
	}
};
var dynamicStyles$2 = { width: (width) => [{
	kzqmXN: width != null ? "x5lhr3w" : width,
	$$css: true
}, { "--x-width": ((val) => typeof val === "number" ? val + "px" : val != null ? val : void 0)(width) }] };
/**
* A form field wrapper that provides label and description.
*
* @example
* ```
* const id = useId();
* const descID = useId();
* <Field label="Email" description="We'll never share your email" inputID={id} descriptionID={descID}>
*   <input id={id} aria-describedby={descID} />
* </Field>
* ```
*/
function Field({ label, isLabelHidden = false, description, inputID, labelID, isGroupLabel = false, descriptionID, isOptional = false, isRequired = false, isDisabled = false, labelIcon, status, labelTooltip, statusVariant = "attached", width, xstyle, children, className, style, ref, ...props$5 }) {
	const { direction } = (0, import_react.use)(FormLayoutContext);
	const isHorizontalLabels = direction === "horizontal-labels";
	const resolvedDescriptionID = descriptionID ?? (description ? `${inputID}-desc` : void 0);
	const resolvedMessageID = status?.messageID ?? (status?.message ? `${inputID}-status` : void 0);
	useDevWarning("Field", "isOptional and isRequired are mutually exclusive. isOptional takes precedence.", isOptional && isRequired);
	const labelNode = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FieldLabel, {
		label,
		inputID,
		labelID,
		isGroupLabel,
		isLabelHidden,
		isDisabled,
		isOptional,
		isRequired,
		labelIcon,
		labelTooltip,
		description: isHorizontalLabels ? void 0 : description,
		descriptionID: isHorizontalLabels ? void 0 : resolvedDescriptionID
	});
	useFieldStatusAnnouncement(statusVariant === "tooltip" ? status?.message : void 0, status?.type);
	const statusNode = status?.message && statusVariant !== "tooltip" ? /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FieldStatus, {
		type: status.type,
		message: status.message,
		id: resolvedMessageID,
		variant: statusVariant,
		xstyle: statusVariant === "attached" ? styles$10.attachedStatusLayer : void 0
	}) : null;
	if (isHorizontalLabels) return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)("div", {
		ref,
		...props$5,
		...mergeProps(themeProps("field", { layout: "horizontal-labels" }), props(styles$10.horizontalLabels, xstyle), className, style),
		children: [/*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
			className: "x1enrzb7",
			children: labelNode
		}), /*#__PURE__*/ (0, import_jsx_runtime.jsxs)("div", {
			className: "x78zum5 xdt5ytf xc8icb0 x19nvjgn xlumz0n x1qs65gq",
			children: [
				description && (isLabelHidden ? /*#__PURE__*/ (0, import_jsx_runtime.jsx)(VisuallyHidden, {
					id: resolvedDescriptionID,
					children: description
				}) : /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Text, {
					type: "supporting",
					display: "block",
					id: resolvedDescriptionID,
					children: description
				})),
				children,
				statusNode
			]
		})]
	});
	return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)("div", {
		ref,
		...mergeProps(themeProps("field"), props(styles$10.container, !isLabelHidden && styles$10.containerGap, width != null && dynamicStyles$2.width(width), xstyle), className, style),
		...props$5,
		children: [labelNode, statusVariant === "attached" ? /*#__PURE__*/ (0, import_jsx_runtime.jsxs)("div", {
			className: "x78zum5 xdt5ytf xc8icb0 x19nvjgn xlumz0n x1qs65gq",
			children: [children, statusNode]
		}) : /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [children, statusNode] })]
	});
}
Field.displayName = "Field";
//#endregion
//#region node_modules/@astryxdesign/core/dist/Field/inputStyles.stylex.js
/**
* Base wrapper styles shared by all input components.
* Components apply these as a foundation and override specific properties
* (e.g. padding, alignItems, gap) as needed.
*/
var inputWrapperStyles = {
	base: {
		kB7OPa: "x9f619",
		kVAEAm: "x1n2onr6",
		kY2c9j: "x1vjfegm",
		k1xSpc: "x78zum5",
		kGNEyG: "x6s0dn4",
		kOIVth: "x1txdalj",
		k8WAf4: "xu0wf1k",
		kg3NbH: "xf314gf",
		kMzoRj: "x1litavf",
		ksu8eU: "x1y0btm7",
		kVAM5u: "xvy26l8 x6q1khz",
		"--_field-radius": "x1832zxr",
		kaIpWk: "xvdfih8",
		kWkggS: "x10xzikg",
		k1ekBW: "x12zzom9",
		kIyJzY: "xuedmi6 x12w9bfk",
		kAMwcw: "xlr8y92",
		kGVxlE: "x1gnnqk1 x1xqjsvb xuihb5h",
		kI3sdo: "x1a2a7pz",
		$$css: true
	},
	disabled: {
		kkrTdU: "xt0e3qv",
		kSiTet: "xbyyjgo",
		kVAM5u: "xvy26l8",
		kGVxlE: "x1gnnqk1",
		$$css: true
	}
};
/**
* Status border colors for input wrappers.
* Keyed by InputStatusType.
*/
var inputStatusBorderStyles = {
	warning: {
		kVAM5u: "x8wg1ba",
		$$css: true
	},
	error: {
		kVAM5u: "x1ofxpqo",
		$$css: true
	},
	success: {
		kVAM5u: "x16m2moy",
		$$css: true
	}
};
/**
* Status hover shadow styles for input wrappers.
* Keyed by InputStatusType.
*/
var inputStatusHoverShadowStyles = {
	warning: {
		kGVxlE: "x1gnnqk1 x9156jc",
		$$css: true
	},
	error: {
		kGVxlE: "x1gnnqk1 x1bgmis8",
		$$css: true
	},
	success: {
		kGVxlE: "x1gnnqk1 x8wp45d",
		$$css: true
	}
};
/**
* Status focus border styles using :focus-within.
* Used by input wrappers that contain a child input/textarea element.
* Keyed by InputStatusType.
*/
var inputStatusFocusWithinStyles = {
	warning: {
		kVAM5u: "x8wg1ba xa1yw2k",
		$$css: true
	},
	error: {
		kVAM5u: "x1ofxpqo xk2sxw7",
		$$css: true
	},
	success: {
		kVAM5u: "x16m2moy xyq33ac",
		$$css: true
	}
};
//#endregion
//#region node_modules/@astryxdesign/core/dist/Field/InputClearButton.js
var styles$9 = { button: {
	kZKoxP: "x1qx5ct2",
	kmuXW: "x2lah0s",
	kVAEAm: "x1n2onr6",
	"--_input-clear-hit-inset": "xtoycft x181bpwf",
	"--_input-clear-hit-content": "xqxtgf4 xp8r40j",
	k5JduY: "xh3pasq",
	kwXMNM: "x1j6awrg",
	kv0HGH: "xht581f",
	$$css: true
} };
function renderInputClearButton({ label, tooltip, onClick, onPointerDown, onClickCapture, xstyle, iconClassName }) {
	const { className: iconTargetClassName } = themeProps("input-clear-icon");
	const { className: buttonTargetClassName } = themeProps("input-clear-button");
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Button, {
		variant: "ghost",
		size: "sm",
		label,
		tooltip,
		className: buttonTargetClassName,
		icon: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Icon, {
			icon: "close",
			size: "sm",
			color: "secondary",
			className: iconClassName != null ? `${iconTargetClassName} ${iconClassName}` : iconTargetClassName
		}),
		onPointerDown: (e) => {
			e.preventDefault();
			onPointerDown?.(e);
		},
		onMouseDown: (e) => e.preventDefault(),
		onClick,
		onClickCapture,
		isIconOnly: true,
		xstyle: [styles$9.button, xstyle]
	});
}
function InputClearButton(props) {
	const t = useTranslator();
	return renderInputClearButton({
		...props,
		tooltip: t("@astryx.inputClearButton.tooltip")
	});
}
InputClearButton.displayName = "InputClearButton";
//#endregion
//#region node_modules/@astryxdesign/core/dist/Field/fieldParts.js
/**
* @file fieldParts.ts
* @input Uses BaseProps, FormLayoutContext, InputGroupContext, useDevWarning
* @output Exports FieldInputBaseProps, the container and control part style
*   props, and useFieldInputStyling
* @position Shared styling contract for every Field-composed input
*   (family:input-fields FR10): base props reach the primary semantic control,
*   there is no root `xstyle`/`className`/`style`, `container*` styles the Field
*   box where one renders, and `control*` styles the visual control box.
*
* SYNC: When modified, update:
* - /packages/core/src/Field/fieldInputFamily.test.tsx (family registry and type checks)
* - /packages/core/src/Field/index.ts (type exports)
*/
/** Root styling props a Field-composed input does not accept. */
/** Styling for the Field box (label, control, and status together). */
/** Styling for the visual control box (border, background, icons, end controls). */
/**
* BaseProps for a Field-composed input. Root `xstyle`, `className`, and `style`
* are omitted, so passing one is a type error; style the field through
* `container*` and the control box through `control*`.
*/
/** Styling props to pass to Field's own `xstyle`/`className`/`style`. */
var ROOT_STYLING_MESSAGE = "`xstyle`, `className`, and `style` are not supported on Field-composed inputs and were ignored. Style the field with `containerXstyle`/`containerClassName`/`containerStyle` and the control box with `controlXstyle`/`controlClassName`/`controlStyle`. `astryx upgrade` rewrites existing usage.";
var CONTAINER_WITHOUT_FIELD_MESSAGE = "`containerXstyle`/`containerClassName`/`containerStyle` have no effect here because no Field box renders (inside InputGroup or a `horizontal-labels` FormLayout). Inside InputGroup, style the InputGroup.";
/**
* Resolve FR10 styling for a Field-composed input.
*
* Strips root `xstyle`/`className`/`style` that an untyped caller passed (they
* would otherwise spread onto the native control) and warns once in
* development. Returns the `container*` props to forward to Field only when a
* Field box renders, and warns once when they are passed where none does.
* `control*` props are the caller's to apply to the control box directly.
*
* @example
* ```
* const {rest, container} = useFieldInputStyling('TextInput', restProps, {
*   containerXstyle, containerClassName, containerStyle,
* });
* ```
*/
function useFieldInputStyling(component, restProps, containerProps) {
	const inputGroup = useInputGroup();
	const { direction } = (0, import_react.use)(FormLayoutContext);
	const hasFieldBox = inputGroup == null && direction !== "horizontal-labels";
	const untyped = restProps;
	const hasRootStyling = untyped.xstyle != null || untyped.className != null || untyped.style != null;
	let rest = restProps;
	if (hasRootStyling) {
		const { xstyle: _xstyle, className: _className, style: _style, ...remaining } = untyped;
		rest = remaining;
	}
	useDevWarning(component, ROOT_STYLING_MESSAGE, hasRootStyling);
	const { containerXstyle, containerClassName, containerStyle } = containerProps;
	useDevWarning(component, CONTAINER_WITHOUT_FIELD_MESSAGE, (containerXstyle != null || containerClassName != null || containerStyle != null) && !hasFieldBox);
	return {
		rest,
		hasFieldBox,
		container: hasFieldBox ? {
			xstyle: containerXstyle,
			className: containerClassName,
			style: containerStyle
		} : {}
	};
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/TextInput/TextInput.js
/**
* @file TextInput.tsx
* @input Uses React, useId, ChangeEvent, Field, Icon, InputGroupContext
* @output Exports TextInput component, TextInputProps
* @position Core implementation; consumed by index.ts, tested by TextInput.test.tsx
*
* SYNC: When modified, update these files to stay in sync:
* - /packages/core/src/TextInput/TextInput.doc.mjs (props table, features, implementation notes)
* - /packages/core/src/TextInput/TextInput.test.tsx (tests for new/changed behavior)
* - /packages/core/src/TextInput/index.ts (exports if types change)
* - /apps/storybook/stories/TextInput.stories.tsx (storybook stories)
* - /packages/cli/assets/templates/blocks/components/TextInput/ (showcase blocks)
*/
var sizeStyles = {
	sm: {
		kZKoxP: "x6k0iem",
		$$css: true
	},
	md: {
		kZKoxP: "x1ueg155",
		$$css: true
	},
	lg: {
		kZKoxP: "xssyfek",
		$$css: true
	}
};
/**
* A text input component for collecting user input.
*
* @example
* ```
* <TextInput label="Name" value={name} onChange={setName} />
* <TextInput label="Search" isLabelHidden value={query} onChange={setQuery} />
* ```
*/
function TextInput({ type = "text", label, isLabelHidden = false, description, isOptional = false, isRequired = false, isDisabled = false, isReadOnly = false, disabledMessage, startIcon, status, statusVariant = "attached", size: sizeProp, onChange, changeAction, isLoading = false, value, placeholder, labelTooltip, hasClear = false, hasAutoFocus = false, htmlName, onEnter, onKeyDown, width, containerXstyle, containerClassName, containerStyle, controlXstyle, controlClassName, controlStyle, ref, id: idProp, "aria-describedby": ariaDescribedByProp, ...restProps }) {
	const { rest, container } = useFieldInputStyling("TextInput", restProps, {
		containerXstyle,
		containerClassName,
		containerStyle
	});
	const t = useTranslator();
	const isEffectivelyRequired = useResolvedRequired({
		isRequired,
		isOptional
	});
	const size = useSize(sizeProp, "md");
	const generatedID = (0, import_react.useId)();
	const id = idProp ?? generatedID;
	const inputLabelID = (0, import_react.useId)();
	const descriptionID = (0, import_react.useId)();
	const statusMessageID = (0, import_react.useId)();
	const inputRef = (0, import_react.useRef)(null);
	const containerRef = (0, import_react.useRef)(null);
	const inputGroup = useInputGroup();
	const [, startTransition] = (0, import_react.useTransition)();
	const [optimisticValue, setOptimisticValue] = (0, import_react.useOptimistic)(value);
	const isBusy = isLoading || optimisticValue !== value;
	const showsDisabledMessage = isDisabled && !!disabledMessage;
	const disabledMessageTooltip = useTooltip({
		placement: "above",
		focusTrigger: "always",
		isEnabled: showsDisabledMessage
	});
	const { statusIcon, describedBy: statusTooltipDescribedBy } = useInputStatusIcon({
		status,
		statusVariant,
		isInGroup: !!inputGroup
	});
	const { ariaLabelledBy, ariaDescribedBy } = getInputARIA(inputLabelID, [
		description ? descriptionID : null,
		!inputGroup && statusVariant !== "tooltip" && status?.message ? statusMessageID : null,
		statusTooltipDescribedBy,
		showsDisabledMessage ? disabledMessageTooltip.describedBy : null
	], inputGroup);
	const handleChange = (e) => {
		if (isDisabled || isReadOnly) return;
		const newValue = e.target.value;
		onChange?.(newValue, e);
		if (changeAction && !e.defaultPrevented) startTransition(async () => {
			setOptimisticValue(newValue);
			await changeAction(newValue, e);
		});
	};
	const handleClear = (0, import_react.useCallback)((e) => {
		onChange?.("", null);
		if (!e || e.detail === 0) inputRef.current?.focus();
		else requestAnimationFrame(() => {
			inputRef.current?.focus({ preventScroll: true });
		});
	}, [onChange]);
	const { onClick: handleWrapperClick, onMouseUp: handleWrapperMouseUp } = useInputContainer({
		containerRef,
		inputRef,
		disabled: isDisabled
	});
	const inputWrapper = /*#__PURE__*/ (0, import_jsx_runtime.jsxs)("div", {
		ref: (el) => {
			containerRef.current = el;
			disabledMessageTooltip.ref(el);
		},
		onClick: handleWrapperClick,
		onMouseUp: handleWrapperMouseUp,
		...mergeProps(themeProps("text-input", {
			size,
			status: status?.type ?? null,
			disabled: isDisabled ? "disabled" : null,
			readonly: isReadOnly ? "readonly" : null
		}), props(inputWrapperStyles.base, sizeStyles[size], isDisabled && inputWrapperStyles.disabled, status && inputStatusBorderStyles[status.type], status && !isDisabled && inputStatusHoverShadowStyles[status.type], status && inputStatusFocusWithinStyles[status.type], inputGroup && groupStyles$2.inGroup, controlXstyle), controlClassName, controlStyle),
		children: [
			startIcon && renderIconSlot(startIcon, {
				size: "sm",
				color: "secondary"
			}),
			inputGroup && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(VisuallyHidden, {
				id: inputLabelID,
				children: label
			}),
			/*#__PURE__*/ (0, import_jsx_runtime.jsx)("input", {
				...rest,
				ref: useMergedRefs(ref, inputRef),
				id,
				name: isDisabled ? void 0 : htmlName,
				type,
				value: optimisticValue,
				onChange: handleChange,
				onKeyDown: onEnter || onKeyDown ? (e) => {
					if (e.key === "Enter" && !isImeKeyEvent(e.nativeEvent)) onEnter?.();
					onKeyDown?.(e);
				} : void 0,
				placeholder,
				disabled: isDisabled && !showsDisabledMessage,
				"aria-disabled": showsDisabledMessage ? "true" : void 0,
				readOnly: isReadOnly || showsDisabledMessage || void 0,
				autoFocus: hasAutoFocus,
				"data-autofocus": hasAutoFocus || void 0,
				"aria-describedby": [ariaDescribedByProp, ariaDescribedBy].filter(Boolean).join(" ") || void 0,
				"aria-required": isEffectivelyRequired ? "true" : void 0,
				"aria-invalid": status?.type === "error" ? "true" : void 0,
				"aria-busy": isBusy || void 0,
				"aria-labelledby": ariaLabelledBy,
				...{
					0: { className: "x1lliihq x98rzlu xeuugli xc342km xng3xce x1717udv x9ynric xjm74w1 xf9zqsd xw6l6zx x1tgivj0 xjbqb8w x1a2a7pz xeyghm5" },
					1: { className: "x1lliihq x98rzlu xeuugli xc342km xng3xce x1717udv x9ynric xjm74w1 xf9zqsd xw6l6zx x1tgivj0 xjbqb8w x1a2a7pz xeyghm5 xt0e3qv" }
				}[!!isDisabled << 0]
			}),
			hasClear && value !== "" && !isDisabled && !isReadOnly && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(InputClearButton, {
				label: t("@astryx.textInput.clearLabel", { label }),
				onClick: handleClear
			}),
			isBusy && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Spinner, { size: "sm" }),
			statusIcon
		]
	});
	if (inputGroup) return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [inputWrapper, showsDisabledMessage && disabledMessageTooltip.renderTooltip(disabledMessage)] });
	return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(Field, {
		...container,
		label,
		isLabelHidden,
		description,
		inputID: id,
		descriptionID: description ? descriptionID : void 0,
		isOptional,
		isRequired,
		isDisabled,
		status: status ? {
			type: status.type,
			message: status.message,
			messageID: status.message ? statusMessageID : void 0
		} : void 0,
		statusVariant,
		labelTooltip,
		width,
		children: [inputWrapper, showsDisabledMessage && disabledMessageTooltip.renderTooltip(disabledMessage)]
	});
}
TextInput.displayName = "TextInput";
//#endregion
//#region node_modules/@astryxdesign/core/dist/Collapsible/CollapsibleGroupContext.js
/**
* @file CollapsibleGroupContext.tsx
* @input Layer-scoped React context
* @output Exports CollapsibleGroupContext, CollapsibleGroupContextValue,
*   CollapsibleGroupPresentationContext, CollapsibleGroupPresentationValue,
*   CollapsibleGroupDensity, and CollapsibleChevronPosition types
* @position Context definitions for collapsible group coordination and presentation
*
* SYNC: When modified, update these files to stay in sync:
* - /packages/core/src/Collapsible/CollapsibleGroup.tsx (provider)
* - /packages/core/src/Collapsible/Collapsible.doc.mjs
* - /packages/cli/assets/templates/blocks/components/Collapsible/ (showcase blocks)
*/
/**
* Context value provided by CollapsibleGroup to coordinate collapsible children.
*/
/**
* Context for collapsible group coordination.
* When present, collapsible components defer their open/close state to the group.
*/
var CollapsibleGroupContext = /*#__PURE__*/ (0, import_react.createContext)(null);
CollapsibleGroupContext.displayName = "CollapsibleGroupContext";
/**
* Row density for the items of a CollapsibleGroup, controlling trigger and
* content block padding. Shares the repo-wide density vocabulary
* (Table, List, Item).
*/
/**
* Logical position of Collapsible's disclosure chevron.
*
* `end` is the default trailing indicator: down when collapsed, up when
* expanded. `start` is the leading disclosure pattern: inward toward content
* when collapsed (mirrored under RTL), down when expanded.
*/
/**
* Presentation value provided by CollapsibleGroup so each Collapsible can
* draw its own group chrome (StyleX has no child selectors, so the group
* cannot style items from the outside).
*/
/**
* Context for collapsible group presentation (dividers, density).
* Kept separate from CollapsibleGroupContext so the public useCollapsible
* state API is unaffected. Collapsible resets this context around its
* children so nested collapsibles never inherit row chrome.
*/
var CollapsibleGroupPresentationContext = createLayerScopedContext(null);
CollapsibleGroupPresentationContext.displayName = "CollapsibleGroupPresentationContext";
//#endregion
//#region node_modules/@astryxdesign/core/dist/Collapsible/useCollapsible.js
/**
* @file useCollapsible.ts
* @input Uses React useState/use, CollapsibleGroupContext
* @output Exports useCollapsible hook, CollapsibleConfig (formerly CollapsibleConfig), UseCollapsibleOptions, UseCollapsibleReturn types
* @position Reusable hook for collapsible behavior — used by Card, Section, etc.
*
* Encapsulates the full collapsible state machine:
* - Parsing boolean | config into normalized config
* - Checking for CollapsibleGroup context (group-controlled mode)
* - Managing internal state for uncontrolled mode
* - Providing a unified toggle handler
*
* SYNC: When modified, update these files to stay in sync:
* - /packages/core/src/Collapsible/index.ts (exports)
* - /packages/core/src/Collapsible/Collapsible.doc.mjs
*
* NOTE: Public hooks use the `useXDS` prefix per Astryx naming conventions.
*/
/**
* Configuration for collapsible behavior.
*/
/**
* Hook that encapsulates collapsible state management.
*
* Supports three modes:
* 1. **Group-controlled**: When inside a CollapsibleGroup with a `value`, defers to group.
* 2. **Controlled**: When `isOpen` is provided in config, the parent owns state;
*    `toggle` only calls `onOpenChange` and never mutates internal state.
* 3. **Uncontrolled**: Self-managed internal state with optional `defaultIsOpen`.
*    `onOpenChange`, if supplied, is invoked in addition to the internal update —
*    it is a notification callback, not a signal that the component is controlled.
*
* @example
* ```
* const {isEnabled, isOpen, toggle} = useCollapsible({
*   isCollapsible: true,
*   value: 'section-1',
* });
* ```
*/
function useCollapsible(options) {
	const { isCollapsible, value } = options;
	const group = (0, import_react.use)(CollapsibleGroupContext);
	const isControlledByGroup = group != null && value != null;
	const config = isCollapsible === true ? {} : isCollapsible ? isCollapsible : null;
	const isEnabled = config != null;
	const [internalIsOpen, setInternalIsOpen] = (0, import_react.useState)(() => {
		if (isControlledByGroup) return true;
		if (config?.isOpen !== void 0) return config.isOpen;
		return config?.defaultIsOpen ?? true;
	});
	let isOpen;
	if (isControlledByGroup && value != null) isOpen = group.isOpen(value);
	else if (config?.isOpen !== void 0) isOpen = config.isOpen;
	else isOpen = internalIsOpen;
	const toggle = () => {
		if (isControlledByGroup && value != null) {
			group.toggle(value);
			return;
		}
		const next = !isOpen;
		if (config?.isOpen === void 0) setInternalIsOpen(next);
		config?.onOpenChange?.(next);
	};
	return {
		isEnabled,
		isOpen,
		toggle
	};
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/Banner/Banner.js
/**
* @file Banner.tsx
* @input Uses React useState/useRef/useId, useCollapsible, Button, Icon (with registry string names), StyleX
* @output Exports Banner component, BannerProps, BannerStatus, BannerContainer types
* @position Core implementation; consumed by index.ts, tested by Banner.test.tsx
*
* Visual structure:
* - Banner frame (themeProps 'banner-frame'): owns the resting elevation and,
*   for elevated card banners, the outer radius that shapes that shadow
* - Header area (themeProps 'banner'): colored status background with icon, title, description, actions, dismiss
* - Content area (themeProps 'banner-content'): card background for additional content (children)
* - Status icon (themeProps 'banner-icon'): the target rides on the default
*   <Icon> itself — the element that paints — so 'status:X' overrides reach
*   the glyph (#4166); for a custom `icon` node it stays on the layout wrapper
* - Description (themeProps 'banner-description'): the supporting line owns its
*   own colour and type, and the space between it and the title
* - The end area carries no target: it is a layout row (flex, wrap, edge
*   compensation) rather than a painted surface, and a theme that wants the
*   header to grow around its buttons sets `padding-block` on 'banner'
* - No left border accent — color is expressed through the full header background
* - Each visual area owns its own border-radius (no overflow:clip on the container)
* - Children are collapsible by default: a toggle appears in the header end
*   area and the content starts closed. `collapsible={false}` opts out and
*   pins the content open with no toggle. The whole collapse axis (enabled /
*   default / controlled) lives on that one prop and is driven by the shared
*   `useCollapsible` hook rather than local state.
*
* Status controls visual treatment only. The root carries no live-region role by
* default: an async outcome is announced from its transition handler through
* `useAnnounce`, while a caller that needs a persistent semantic mirror may
* provide `role="status"` through BaseProps. `role="alert"` is explicit and
* reserved for genuinely urgent content that should interrupt current speech.
*
* Title and description render as <div> (not <p>): they accept arbitrary
* ReactNode content, and <p> cannot legally contain block-level children
* (the HTML parser reparents them, desyncing SSR markup from the hydrated
* DOM). Using <div> keeps these slots composable with any content. Their
* StyleX styles set margin: 0 and explicit typography, so the rendered
* appearance is identical to the previous <p>.
*
* SYNC: When modified, update these files to stay in sync:
* - /packages/core/src/Banner/Banner.doc.mjs (props table, features, implementation notes)
* - /packages/core/src/Banner/Banner.test.tsx (tests for new/changed behavior)
* - /packages/core/src/Banner/index.ts (exports if types change)
* - /apps/storybook/stories/Banner.stories.tsx (storybook stories)
* - /packages/cli/assets/templates/blocks/components/Banner/ (showcase blocks)
*/
/**
* Status type controlling the banner's icon and color.
* Extensible via module augmentation of BannerStatusMap.
*/
/**
* Container type of the banner.
* - `card`: standalone card with border-radius and shadow
* - `section`: full-width section banner (no border-radius)
*
* Extensible via module augmentation of BannerContainerMap.
*/
var defaultIconNames = {
	info: "info",
	warning: "warning",
	error: "error",
	success: "success"
};
var statusIconColor = {
	info: "accent",
	warning: "warning",
	error: "error",
	success: "success"
};
var styles$8 = {
	root: {
		k1xSpc: "x78zum5",
		kXwgrk: "xdt5ytf",
		kMv6JI: "xjb2p0i",
		$$css: true
	},
	rootElevatedCard: {
		kaIpWk: "x1vf2byn",
		$$css: true
	},
	header: {
		k1xSpc: "x78zum5",
		kGNEyG: "x1cy8zhl",
		kwnvtZ: "x1a02dak",
		k1C7PZ: "xak3so",
		khm7nJ: "x4olc9o",
		k8WAf4: "x8o8v82",
		kg3NbH: "x1pzlopt",
		$$css: true
	},
	headerCardStandalone: {
		kaIpWk: "x1vf2byn",
		$$css: true
	},
	headerCardWithContent: {
		krdFHd: "xwxb7qi",
		kfmiAY: "x13nour3",
		kVL7Gh: "xbiv7yw",
		kT0f0o: "x16uus16",
		$$css: true
	},
	headerCentered: {
		kGNEyG: "x6s0dn4",
		$$css: true
	},
	endArea: {
		k1xSpc: "x78zum5",
		kGNEyG: "x6s0dn4",
		kwnvtZ: "x1a02dak",
		kjj79g: "x13a6bvl",
		kOIVth: "x1txdalj",
		kmuXW: "x2lah0s",
		ks0D6T: "x193iq5w",
		keTefX: "xvc5jky",
		kqGvvJ: "x81ka23",
		$$css: true
	},
	chevron: {
		k1ekBW: "x11xpdln",
		kIyJzY: "xuedmi6 x12w9bfk",
		kAMwcw: "xlr8y92",
		$$css: true
	},
	chevronExpanded: {
		k3aq6I: "x19jd1h0",
		$$css: true
	}
};
var statusStyles = {
	info: {
		kWkggS: "xgcxg3y",
		$$css: true
	},
	warning: {
		kWkggS: "x24i8r5",
		$$css: true
	},
	error: {
		kWkggS: "x1pritpl",
		$$css: true
	},
	success: {
		kWkggS: "xu13z74",
		$$css: true
	}
};
/**
* Narrows an augmented `BannerStatus` to one the style map actually carries,
* so an unknown status renders with no status fill rather than crashing the
* lookup. StyleX style maps cannot be declared `Partial`, hence the guard.
*/
function hasStatusStyle(status) {
	return Object.prototype.hasOwnProperty.call(statusStyles, status);
}
var elevationStyles = {
	none: {
		kGVxlE: "x1gnnqk1",
		$$css: true
	},
	low: {
		kGVxlE: "x1i5ehqx",
		$$css: true
	},
	med: {
		kGVxlE: "x14hfi27",
		$$css: true
	},
	high: {
		kGVxlE: "x1kcpxr7",
		$$css: true
	}
};
/**
* A persistent status notification banner for info, warning, error, or success messages.
*
* Two-part visual structure:
* - Header: colored status background with icon, title, description, and actions
* - Content (optional): card background area for additional rich content
*
* When children are provided, a chevron toggle appears in the header end area
* (to the left of the dismiss button if present) and the content starts
* collapsed. Pass `collapsible={false}` for content that is always visible,
* or a config object to change the initial state or control it.
*
* Manages its own dismissed state internally — the banner hides on dismiss
* even if `onDismiss` is not provided, so product teams don't need to wire
* up state management for basic dismiss behavior.
*
* Status controls visual meaning only. The component adds no live-region role;
* announce async outcomes from their transition handler with `useAnnounce`, or
* pass an explicit role when a persistent semantic mirror is appropriate.
*
* @example
* ```
* <Banner status="info" title="New update available" />
* <Banner
*   status="error"
*   title="Something went wrong"
*   description="Please try again later."
*   isDismissable
*   onDismiss={() => logDismiss()}
* />
* <Banner
*   status="error"
*   title="Multiple errors found"
*   description="The following issues need to be resolved:"
*   isDismissable>
*   <ul>
*     <li>Email address is invalid</li>
*     <li>Password must be at least 8 characters</li>
*   </ul>
* </Banner>
* <Banner
*   status="warning"
*   title="Configuration changes"
*   collapsible={{defaultIsOpen: true}}>
*   <p>Details here...</p>
* </Banner>
* <Banner status="error" title="3 fields need attention" collapsible={false}>
*   <ul>
*     <li>Email address is invalid</li>
*   </ul>
* </Banner>
* ```
*/
function Banner({ status, title, description, icon, isDismissable = false, onDismiss, dismissLabel, endContent, container = "card", elevation = "none", collapsible = true, children, xstyle, className, style, ref, onFocusCapture, onPointerDownCapture, ...rest }) {
	const t = useTranslator();
	const [isDismissed, setIsDismissed] = (0, import_react.useState)(false);
	const collapsibleConfig = collapsible != null && typeof collapsible === "object" ? collapsible : {};
	const { isEnabled: isCollapsible, isOpen: isExpanded, toggle: handleToggleExpand } = useCollapsible({ isCollapsible: collapsible !== false && {
		...collapsibleConfig,
		defaultIsOpen: collapsibleConfig.defaultIsOpen ?? false
	} });
	const focusOriginRef = (0, import_react.useRef)(null);
	const contentId = (0, import_react.useId)();
	const defaultIconName = defaultIconNames[status];
	const iconColor = statusIconColor[status];
	const hasChildren = isRenderable(children);
	const dismiss = t("@astryx.banner.dismiss");
	const dismissTooltip = dismissLabel ?? dismiss;
	const dismissName = dismissLabel ?? (typeof title === "string" ? t("@astryx.banner.dismissTitled", {
		dismiss,
		title
	}) : dismiss);
	if (isDismissed) return null;
	const rememberFocusOrigin = (candidate, root) => {
		if (candidate instanceof HTMLElement && candidate !== document.body && !root.contains(candidate)) focusOriginRef.current = candidate;
	};
	const handleFocusCapture = (event) => {
		rememberFocusOrigin(event.relatedTarget, event.currentTarget);
	};
	const handlePointerDownCapture = (event) => {
		rememberFocusOrigin(document.activeElement, event.currentTarget);
	};
	const handleDismiss = () => {
		const origin = focusOriginRef.current;
		setIsDismissed(true);
		onDismiss?.();
		if (origin?.isConnected) origin.focus();
	};
	const hasToggle = isCollapsible && hasChildren;
	const showEndArea = isRenderable(endContent) || isDismissable || hasToggle;
	const hasActions = isRenderable(endContent) || isDismissable;
	const isSingleLine = !isRenderable(description) && hasActions;
	const showContent = hasChildren && (!isCollapsible || isExpanded);
	const isCard = container === "card";
	return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)("div", {
		ref,
		onFocusCapture: composeEventHandlers(onFocusCapture, handleFocusCapture),
		onPointerDownCapture: composeEventHandlers(onPointerDownCapture, handlePointerDownCapture),
		...mergeProps(themeProps("banner-frame", {
			container,
			elevation
		}), props(styles$8.root, elevationStyles[elevation], isCard && elevation !== "none" && styles$8.rootElevatedCard, xstyle), className, style),
		...rest,
		children: [/*#__PURE__*/ (0, import_jsx_runtime.jsxs)("div", {
			...mergeProps(themeProps("banner", {
				container,
				status
			}), props(styles$8.header, isSingleLine && styles$8.headerCentered, hasStatusStyle(status) && statusStyles[status], isCard && (showContent ? styles$8.headerCardWithContent : styles$8.headerCardStandalone))),
			children: [
				/*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
					...isRenderable(icon) ? mergeProps(themeProps("banner-icon", { status }), { className: "x78zum5 x6s0dn4 x2lah0s" }) : { className: "x78zum5 x6s0dn4 x2lah0s" },
					"aria-hidden": "true",
					children: isRenderable(icon) ? icon : defaultIconName != null ? /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Icon, {
						icon: defaultIconName,
						size: "md",
						color: iconColor,
						...themeProps("banner-icon", { status })
					}) : null
				}),
				/*#__PURE__*/ (0, import_jsx_runtime.jsxs)("div", {
					...{
						0: { className: "x78zum5 xdt5ytf xxhr3t x98rzlu xeuugli" },
						1: { className: "x78zum5 xdt5ytf xxhr3t x98rzlu xeuugli xgualba" }
					}[!!isRenderable(endContent) << 0],
					children: [/*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
						className: "x1ghz6dp xjb2p0i xcr08ib x2mo6ok x1kq96og x1tgivj0 xj0a0fe",
						children: title
					}), isRenderable(description) && /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
						...mergeProps(themeProps("banner-description"), { className: "x1ghz6dp xjb2p0i x141an7d x1sodnla x1ltkj2j xv1l7n4 xj0a0fe" }),
						children: description
					})]
				}),
				showEndArea && /*#__PURE__*/ (0, import_jsx_runtime.jsxs)("div", {
					...props(styles$8.endArea, edgeCompSlot.inset(spacingVars["--spacing-2"])),
					children: [
						endContent,
						hasToggle && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "sm",
							label: isExpanded ? t("@astryx.banner.collapse") : t("@astryx.banner.expand"),
							tooltip: isExpanded ? t("@astryx.banner.collapse") : t("@astryx.banner.expand"),
							icon: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Icon, {
								icon: "chevronDown",
								size: "sm",
								color: "inherit",
								xstyle: [styles$8.chevron, isExpanded && styles$8.chevronExpanded]
							}),
							onClick: handleToggleExpand,
							"aria-expanded": isExpanded,
							"aria-controls": showContent ? contentId : void 0,
							isIconOnly: true
						}),
						isDismissable && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "sm",
							label: dismissName,
							tooltip: dismissTooltip,
							icon: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Icon, {
								icon: "close",
								size: "sm",
								color: "inherit"
							}),
							onClick: handleDismiss,
							isIconOnly: true
						})
					]
				})
			]
		}), showContent && /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
			id: hasToggle ? contentId : void 0,
			...mergeProps(themeProps("banner-content", {
				container,
				status
			}), {
				0: { className: "x1de1mus x8o8v82 x1pzlopt xgbv0en xw8tdv1 x92x3c3 x1t7ytsu x18b5jzi x1q0q8m5 x1j92z86 x1gejf6u xw8gpjh" },
				1: { className: "x1de1mus x8o8v82 x1pzlopt xgbv0en xw8tdv1 x92x3c3 x1t7ytsu x18b5jzi x1q0q8m5 x1j92z86 x1gejf6u xw8gpjh x1k5g1gk x1eprgri" }
			}[!!isCard << 0]),
			children
		})]
	});
}
Banner.displayName = "Banner";
//#endregion
//#region node_modules/@astryxdesign/core/dist/SideNav/SideNavCollapseContext.js
/**
* @file SideNavCollapseContext.ts
* @input React createContext, use
* @output Exports SideNavCollapseContext and useSideNavCollapse hook
* @position Internal context for sidenav collapse state
*
* Provides collapse state to SideNavCollapseButton and other
* sidenav children. Set by SideNav when isCollapsible is true.
* A button rendered outside the SideNav tree is out of context's reach and
* takes the controlled `collapsible` config as a prop instead.
*/
/** Object form of SideNav's `collapsible` prop. */
/**
* The controlled form: the consumer holds the state, so it can be handed to
* both SideNav and a SideNavCollapseButton rendered outside it.
*/
/**
* @deprecated Pass the same controlled `collapsible` config to SideNav and to
* the out-of-tree SideNavCollapseButton instead. The state then reaches the
* button through props rather than through a ref.
*/
var SideNavCollapseContext = /*#__PURE__*/ (0, import_react.createContext)({
	isCollapsed: false,
	toggle: () => {},
	isCollapsible: false
});
SideNavCollapseContext.displayName = "SideNavCollapseContext";
/**
* Read the sidenav collapse state from context.
* Returns { isCollapsed, toggle, isCollapsible }.
* When used outside a sidenav with isCollapsible, isCollapsible is false.
*/
function useSideNavCollapse() {
	return (0, import_react.use)(SideNavCollapseContext);
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/SideNav/SideNavCollapseButton.js
/**
* @file SideNavCollapseButton.tsx
* @input Uses React, StyleX, SideNavCollapseContext, Icon
* @output Exports SideNavCollapseButton component
* @position Composable toggle button for sidenav collapse
*
* Place inside SideNav (reads context automatically) or outside
* (pass the same controlled `collapsible` config both get).
*
* SYNC: When modified, update:
* - /packages/core/src/SideNav/SideNav.doc.mjs
* - /packages/core/src/SideNav/index.ts
* - /packages/cli/assets/templates/blocks/components/SideNav/ (showcase blocks)
*/
var styles$7 = {
	chevronMirror: {
		k1xSpc: "x78zum5",
		kGNEyG: "x6s0dn4",
		kjj79g: "xl56j7k",
		$$css: true
	},
	chevron: {
		k1xSpc: "x3nfvp2",
		kGNEyG: "x6s0dn4",
		k1ekBW: "x11xpdln",
		kIyJzY: "xuedmi6 x12w9bfk",
		kAMwcw: "xlr8y92",
		$$css: true
	},
	chevronCollapsed: {
		k3aq6I: "x19jd1h0",
		$$css: true
	}
};
/**
* Composable toggle button for sidenav collapse.
*
* Place anywhere inside SideNav (header, topContent, footer, footerIcons)
* and it reads collapse state from context automatically. For placement
* outside the sidenav (e.g. in TopNav or content area), hold the state and
* hand the same `collapsible` config to both.
*
* @example
* ```
* <SideNav isCollapsible footerIcons={<SideNavCollapseButton />}>
*   ...
* </SideNav>
* ```
*
* @example
* ```
* const [isCollapsed, setIsCollapsed] = useState(false);
* const collapsible = {isCollapsed, onCollapsedChange: setIsCollapsed};
* <TopNav endContent={<SideNavCollapseButton collapsible={collapsible} />} />
* <SideNav collapsible={{...collapsible, hasButton: false}}>...</SideNav>
* ```
*/
function SideNavCollapseButton({ ref, collapsible, handleRef, label, size, children, onClick: onClickProp, ...props$4 }) {
	const t = useTranslator();
	const { isCollapsed, toggle, isCollapsible } = useSideNavCollapseState(collapsible, handleRef);
	const { isMobile } = useAppShellMobile();
	if (!isCollapsible || isMobile) return null;
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Button, {
		ref,
		label: label ?? (isCollapsed ? t("@astryx.sideNavCollapseButton.expandSidebar") : t("@astryx.sideNavCollapseButton.collapseSidebar")),
		variant: "ghost",
		size,
		...props$4,
		onClick: composeEventHandlers(onClickProp, toggle),
		icon: children ?? /*#__PURE__*/ (0, import_jsx_runtime.jsx)("span", {
			...props(styles$7.chevronMirror, rtlStyles.mirror),
			children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Icon, {
				icon: "chevronLeft",
				size: "sm",
				color: "inherit",
				xstyle: [styles$7.chevron, isCollapsed && styles$7.chevronCollapsed]
			})
		}),
		isIconOnly: true
	});
}
SideNavCollapseButton.displayName = "SideNavCollapseButton";
function useSideNavCollapseState(collapsible, handleRef) {
	const contextCollapseState = useSideNavCollapse();
	const { isCollapsed, onCollapsedChange } = collapsible ?? {};
	const toggleCollapsible = (0, import_react.useCallback)(() => onCollapsedChange?.(!isCollapsed), [isCollapsed, onCollapsedChange]);
	const toggleHandle = (0, import_react.useCallback)(() => {
		handleRef?.current?.getCollapseState()?.toggle();
	}, [handleRef]);
	if (collapsible != null) return {
		isCollapsed: isCollapsed ?? false,
		toggle: toggleCollapsible,
		isCollapsible: true
	};
	if (handleRef == null) return contextCollapseState;
	const externalCollapseState = handleRef.current?.getCollapseState() ?? null;
	return {
		isCollapsed: externalCollapseState?.isCollapsed ?? false,
		toggle: toggleHandle,
		isCollapsible: externalCollapseState?.isCollapsible ?? true
	};
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/Resizable/useResizable.js
/**
* @file useResizable.ts
* @input Resize configuration (defaultSize, minSize, maxSize, snaps), with
*   removed pixel-bound aliases rejected even through assembled objects, and
*   collapse configuration (collapsible,
*   defaultIsCollapsed, isCollapsed)
* @output Hook return: size, isCollapsed, collapse/expand/resize methods, props for handle
* @position Public hook; consumed by layout components via `resizable` prop
*/
/** Minimum size configuration. */
/** Maximum size configuration. */
/**
* Shared config shape for any component that integrates built-in resize
* (e.g. SideNav `resizable` prop). Provides a simplified API surface
* over the full ResizableRegionConfig.
*/
var DEFAULT_MIN = 50;
var DEFAULT_COLLAPSED_SIZE = 40;
var STORAGE_PREFIX = "astryx-resizable:";
function clampSize(size, min, max, snaps) {
	const clamped = Math.min(max, Math.max(min, size));
	if (snaps.length > 0) {
		let nearest = snaps[0];
		let nearestDist = Math.abs(clamped - nearest);
		for (let i = 1; i < snaps.length; i++) {
			const dist = Math.abs(clamped - snaps[i]);
			if (dist < nearestDist) {
				nearest = snaps[i];
				nearestDist = dist;
			}
		}
		return Math.min(max, Math.max(min, nearest));
	}
	return clamped;
}
/**
* Reads a persisted entry. Three formats exist in storage:
* - `{size, isCollapsed}` — the current format; `size` is the expanded size,
*   so the pre-collapse width survives a collapsed session
* - a plain non-zero number — a legacy width-only entry that never recorded
*   collapse, so `isCollapsed` is null (unknown)
* - a plain `0` — written by legacy collapse, which restored the region as a
*   zero-width expanded panel (#4790); read as "collapsed, no saved size"
*/
function loadPersistedState(key) {
	if (typeof window === "undefined") return null;
	try {
		const raw = localStorage.getItem(STORAGE_PREFIX + key);
		if (raw == null) return null;
		const parsed = JSON.parse(raw);
		if (typeof parsed === "number") {
			if (!Number.isFinite(parsed)) return null;
			return parsed === 0 ? {
				size: null,
				isCollapsed: true
			} : {
				size: parsed,
				isCollapsed: null
			};
		}
		if (typeof parsed === "object" && parsed != null) {
			const { size, isCollapsed } = parsed;
			const hasSize = typeof size === "number" && Number.isFinite(size) && size > 0;
			if (hasSize || isCollapsed === true) return {
				size: hasSize ? size : null,
				isCollapsed: isCollapsed === true
			};
		}
	} catch {}
	return null;
}
function persistState(key, state) {
	if (typeof window === "undefined") return;
	try {
		localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(state));
	} catch {}
}
/** The released compatibility basis when there is no window to measure. */
var SERVER_BASIS = 1200;
/** A store that never changes on its own; the snapshot is re-read on render. */
var noopSubscribe = () => () => {};
var DEFAULT_SIZE_FALLBACK = 250;
var RESIZABLE_SIZE_GUIDANCE = "Use a non-negative number of pixels, an exact \"Npx\" string, an exact \"N%\" string from 0% to 100%, pixel(value), or percent(value, {min: pixel(value)}) / percent(value, {max: pixel(value)}).";
/** Parsed, validated input. */
var PX_PATTERN = /^(\d+(?:\.\d+)?)px$/;
var PERCENT_PATTERN = /^(\d+(?:\.\d+)?)%$/;
function parseSizeString(value) {
	const px = PX_PATTERN.exec(value);
	if (px) {
		const parsed = Number(px[1]);
		return Number.isFinite(parsed) ? {
			kind: "px",
			value: parsed
		} : null;
	}
	const percentValue = PERCENT_PATTERN.exec(value);
	if (percentValue) {
		const parsed = Number(percentValue[1]);
		return Number.isFinite(parsed) && parsed <= 100 ? {
			kind: "percent",
			value: parsed
		} : null;
	}
	return null;
}
function parsePixelSize(value) {
	if (typeof value !== "object" || value == null || Array.isArray(value)) return null;
	const candidate = value;
	return candidate.type === "pixel" && typeof candidate.value === "number" && Number.isFinite(candidate.value) && candidate.value >= 0 ? candidate.value : null;
}
function parsePercentSize(value) {
	if (Array.isArray(value)) return null;
	const candidate = value;
	if (candidate.type !== "percent" || typeof candidate.value !== "number" || !Number.isFinite(candidate.value) || candidate.value < 0 || candidate.value > 100) return null;
	const hasMin = candidate.min !== void 0;
	if (hasMin === (candidate.max !== void 0)) return null;
	if (hasMin) {
		const min = parsePixelSize(candidate.min);
		return min == null ? null : {
			kind: "percent",
			value: candidate.value,
			min
		};
	}
	const max = parsePixelSize(candidate.max);
	return max == null ? null : {
		kind: "percent",
		value: candidate.value,
		max
	};
}
function parseSize(value) {
	if (typeof value === "number") return Number.isFinite(value) && value >= 0 ? {
		kind: "px",
		value
	} : null;
	if (typeof value === "string") return parseSizeString(value);
	if (typeof value === "object" && value != null) {
		const pixelValue = parsePixelSize(value);
		return pixelValue == null ? parsePercentSize(value) : {
			kind: "px",
			value: pixelValue
		};
	}
	return null;
}
/** Whether this parsed value must be recomputed when its basis changes. */
function dependsOnBasis(parsed) {
	return parsed?.kind === "percent";
}
/** Resolve a parsed size against its basis, then apply its one pixel bound. */
function toPixels(parsed, basis) {
	if (parsed.kind === "px") return parsed.value;
	if (basis == null) return null;
	const percentagePx = Math.round(parsed.value / 100 * basis);
	if (parsed.min !== void 0) return Math.max(percentagePx, parsed.min);
	if (parsed.max !== void 0) return Math.min(percentagePx, parsed.max);
	return percentagePx;
}
function describeUnknown(value) {
	if (typeof value === "number" && !Number.isFinite(value)) return String(value);
	try {
		return JSON.stringify(value) ?? String(value);
	} catch {
		return String(value);
	}
}
function describePixelCandidate(value) {
	if (typeof value !== "object" || value == null || Array.isArray(value)) return describeUnknown(value);
	const candidate = value;
	return candidate.type === "pixel" ? `{"type":"pixel","value":${describeUnknown(candidate.value)}}` : describeUnknown(value);
}
function describeSize(value) {
	if (typeof value === "object" && value != null && !Array.isArray(value)) {
		const candidate = value;
		if (candidate.type === "pixel") return describePixelCandidate(value);
		if (candidate.type === "percent") {
			const fields = ["\"type\":\"percent\"", `"value":${describeUnknown(candidate.value)}`];
			if (candidate.min !== void 0) fields.push(`"min":${describePixelCandidate(candidate.min)}`);
			if (candidate.max !== void 0) fields.push(`"max":${describePixelCandidate(candidate.max)}`);
			return `{${fields.join(",")}}`;
		}
	}
	return describeUnknown(value);
}
/**
* Resolves one configured value, applying its role's fallback when the input is
* not accepted. The warning remains development-only through `devWarn`; every
* build takes the same deterministic fallback.
*/
function resolveBound(raw, parsed, basis, fallback, label, accepted, didWarnRef) {
	if (raw === void 0) return fallback;
	if (raw === Infinity && fallback === Infinity) return Infinity;
	if (parsed == null) {
		if (!didWarnRef.current) {
			didWarnRef.current = true;
			`${label}${describeSize(raw)}${accepted}${fallback}`;
		}
		return fallback;
	}
	return toPixels(parsed, basis) ?? fallback;
}
/**
* The container's content-box size on the active axis.
*
* Content box, not border box: a bordered or padded container would otherwise
* report a basis a few pixels larger than the space a percentage is actually a
* share of, and that error lands in `aria-valuemax`. The observer entry
* carries `contentBoxSize` natively, which is already writing-mode aware;
* measuring the element is the fallback for the synthetic entry
* `observeResize` fires on registration.
*/
function measureContentBox(element, direction, entry) {
	const box = entry?.contentBoxSize?.[0];
	if (box) return direction === "vertical" ? box.blockSize : box.inlineSize;
	const style = typeof window === "undefined" ? null : window.getComputedStyle(element);
	if (style == null) return null;
	const size = direction === "vertical" ? element.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom) : element.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
	return Number.isFinite(size) ? size : null;
}
function useSingleResizable(config) {
	const { defaultSize, minSize, maxSize, containerRef, direction = "horizontal", collapsible = false, collapsedSize = DEFAULT_COLLAPSED_SIZE, snaps: configuredSnaps, autoSaveId, defaultIsCollapsed, isCollapsed: controlledIsCollapsed, onSizeChange, onCollapseChange } = config;
	const emptySnapsRef = (0, import_react.useRef)([]);
	const snaps = configuredSnaps ?? emptySnapsRef.current;
	const rawMin = minSize;
	const rawMax = maxSize;
	const parsedDefault = parseSize(defaultSize);
	const parsedMin = parseSize(minSize);
	const parsedMax = parseSize(maxSize);
	const hasContainer = containerRef != null;
	const persisted = autoSaveId ? loadPersistedState(autoSaveId) : null;
	const initialDefaultRef = (0, import_react.useRef)(null);
	const [, setDefaultBasisCleanupTick] = (0, import_react.useState)(0);
	const defaultDependsOnBasis = dependsOnBasis(parsedDefault);
	const boundsDependOnBasis = dependsOnBasis(parsedMin) || dependsOnBasis(parsedMax);
	const defaultNeedsInitialBasis = persisted?.size == null && defaultDependsOnBasis && initialDefaultRef.current?.isFinal !== true;
	const observeContainerBasis = hasContainer && (boundsDependOnBasis || defaultNeedsInitialBasis);
	const observeViewportBasis = !hasContainer && boundsDependOnBasis;
	const containerElementRef = (0, import_react.useRef)(null);
	const [, setContainerElementVersion] = (0, import_react.useState)(0);
	const containerBasisRef = (0, import_react.useRef)(null);
	const containerElement = observeContainerBasis ? containerElementRef.current : null;
	useIsomorphicLayoutEffect(() => {
		if (!observeContainerBasis) {
			containerElementRef.current = null;
			containerBasisRef.current = null;
			return;
		}
		const element = containerRef?.current ?? null;
		if (element !== containerElementRef.current) {
			containerBasisRef.current = null;
			containerElementRef.current = element;
			setContainerElementVersion((version) => version + 1);
		}
	});
	const subscribeToContainer = (0, import_react.useCallback)((onStoreChange) => {
		if (!observeContainerBasis || containerElement == null || containerElement !== containerRef?.current) return () => {};
		return observeResize(containerElement, (entry) => {
			containerBasisRef.current = measureContentBox(containerElement, direction, entry);
			onStoreChange();
		});
	}, [
		containerElement,
		observeContainerBasis,
		direction,
		containerRef
	]);
	const readContainerBasis = (0, import_react.useCallback)(() => {
		if (!observeContainerBasis || containerElement == null) {
			containerBasisRef.current = null;
			return null;
		}
		if (containerBasisRef.current == null) containerBasisRef.current = measureContentBox(containerElement, direction);
		return containerBasisRef.current;
	}, [
		containerElement,
		observeContainerBasis,
		direction
	]);
	const containerBasis = (0, import_react.useSyncExternalStore)(subscribeToContainer, readContainerBasis, () => null);
	const subscribeToViewport = (0, import_react.useCallback)((onStoreChange) => {
		if (hasContainer || !observeViewportBasis || typeof window === "undefined") return () => {};
		window.addEventListener("resize", onStoreChange);
		return () => window.removeEventListener("resize", onStoreChange);
	}, [hasContainer, observeViewportBasis]);
	const viewportBasis = (0, import_react.useSyncExternalStore)(subscribeToViewport, () => typeof window === "undefined" ? SERVER_BASIS : window.innerWidth, () => SERVER_BASIS);
	const windowExtent = (0, import_react.useSyncExternalStore)(noopSubscribe, () => typeof window === "undefined" ? null : direction === "vertical" ? window.innerHeight : window.innerWidth, () => null);
	const needsContainerBasis = observeContainerBasis;
	const hasPositiveMeasurement = containerBasis != null && containerBasis > 0;
	const liveBasis = hasContainer ? hasPositiveMeasurement ? containerBasis : SERVER_BASIS : viewportBasis;
	const isBasisMeasured = needsContainerBasis ? hasPositiveMeasurement : true;
	const gestureBasisRef = (0, import_react.useRef)(null);
	const [gestureTick, setGestureTick] = (0, import_react.useState)(0);
	const basis = gestureBasisRef.current ?? liveBasis;
	const didWarnMinRef = (0, import_react.useRef)(false);
	const didWarnMaxRef = (0, import_react.useRef)(false);
	const didWarnDefaultRef = (0, import_react.useRef)(false);
	const didWarnInvertedRef = (0, import_react.useRef)(false);
	const resolvedMin = resolveBound(rawMin, parsedMin, basis, DEFAULT_MIN, "minSize", RESIZABLE_SIZE_GUIDANCE, didWarnMinRef);
	const resolvedMax = resolveBound(rawMax, parsedMax, basis, Infinity, "maxSize", RESIZABLE_SIZE_GUIDANCE, didWarnMaxRef);
	if (initialDefaultRef.current == null || !initialDefaultRef.current.isFinal) initialDefaultRef.current = {
		px: resolveBound(defaultSize, parsedDefault, basis, DEFAULT_SIZE_FALLBACK, "defaultSize", RESIZABLE_SIZE_GUIDANCE, didWarnDefaultRef),
		isFinal: isBasisMeasured
	};
	const initialDefaultPx = initialDefaultRef.current.px;
	const [chosenSize, setChosenSize] = (0, import_react.useState)(() => {
		if (persisted?.size != null) return persisted.size;
		return isBasisMeasured ? clampSize(initialDefaultPx, resolvedMin, resolvedMax, snaps) : null;
	});
	if (hasContainer && !boundsDependOnBasis && isBasisMeasured && defaultNeedsInitialBasis && chosenSize != null) setDefaultBasisCleanupTick((tick) => tick + 1);
	if (isBasisMeasured && chosenSize == null) setChosenSize(clampSize(initialDefaultPx, resolvedMin, resolvedMax, snaps));
	const [committedBounds, setCommittedBounds] = (0, import_react.useState)({
		min: resolvedMin,
		max: resolvedMax
	});
	if (isBasisMeasured && gestureBasisRef.current == null && (committedBounds.min !== resolvedMin || committedBounds.max !== resolvedMax)) {
		setCommittedBounds({
			min: resolvedMin,
			max: resolvedMax
		});
		setChosenSize((current) => current == null ? null : clampSize(current, resolvedMin, resolvedMax, snaps));
	}
	const size = clampSize(chosenSize ?? initialDefaultPx, resolvedMin, resolvedMax, snaps);
	const [uncontrolledIsCollapsed, setUncontrolledIsCollapsed] = (0, import_react.useState)(() => persisted?.isCollapsed ?? defaultIsCollapsed ?? false);
	const isControlled = controlledIsCollapsed !== void 0;
	const isCollapsed = collapsible && (isControlled ? controlledIsCollapsed : uncontrolledIsCollapsed);
	const dragStartSizeRef = (0, import_react.useRef)(size);
	const isCollapsedRef = (0, import_react.useRef)(isCollapsed);
	isCollapsedRef.current = isCollapsed;
	const setCollapsed = (0, import_react.useCallback)((value) => {
		if (!isControlled) {
			isCollapsedRef.current = value;
			setUncontrolledIsCollapsed(value);
		}
	}, [isControlled]);
	(0, import_react.useEffect)(() => {
		if (resolvedMin > resolvedMax && !didWarnInvertedRef.current) {
			didWarnInvertedRef.current = true;
			`${resolvedMin}${resolvedMax}`;
		}
	}, [resolvedMin, resolvedMax]);
	(0, import_react.useEffect)(() => {
		if (autoSaveId && isBasisMeasured) persistState(autoSaveId, {
			size,
			isCollapsed
		});
	}, [
		size,
		isCollapsed,
		autoSaveId,
		isBasisMeasured
	]);
	const collapse = (0, import_react.useCallback)(() => {
		if (!collapsible || isCollapsedRef.current) return;
		setCollapsed(true);
		onCollapseChange?.(true);
		onSizeChange?.(0);
	}, [
		collapsible,
		setCollapsed,
		onCollapseChange,
		onSizeChange
	]);
	const expand = (0, import_react.useCallback)(() => {
		const wasCollapsed = isCollapsedRef.current;
		setCollapsed(false);
		if (wasCollapsed) onCollapseChange?.(false);
		onSizeChange?.(size);
	}, [
		setCollapsed,
		size,
		onCollapseChange,
		onSizeChange
	]);
	const resize = (0, import_react.useCallback)((newSize) => {
		if (!Number.isFinite(newSize) || newSize < 0) {
			`${String(newSize)}`;
			return;
		}
		const clamped = clampSize(newSize, resolvedMin, resolvedMax, snaps);
		const wasCollapsed = isCollapsedRef.current;
		setChosenSize(clamped);
		setCollapsed(false);
		if (wasCollapsed) onCollapseChange?.(false);
		onSizeChange?.(clamped);
	}, [
		resolvedMin,
		resolvedMax,
		snaps,
		setCollapsed,
		onCollapseChange,
		onSizeChange
	]);
	const onResizeStart = (0, import_react.useCallback)(() => {
		gestureBasisRef.current = liveBasis;
		dragStartSizeRef.current = isCollapsedRef.current ? 0 : size;
	}, [size, liveBasis]);
	const onResizeMove = (0, import_react.useCallback)((delta) => {
		const raw = dragStartSizeRef.current + delta;
		if (collapsible && raw < collapsedSize) {
			if (!isCollapsedRef.current) {
				setCollapsed(true);
				onCollapseChange?.(true);
				onSizeChange?.(0);
			}
			return;
		}
		if (isCollapsedRef.current && raw >= collapsedSize) {
			setCollapsed(false);
			onCollapseChange?.(false);
		}
		const clamped = clampSize(raw, resolvedMin, resolvedMax, snaps);
		setChosenSize(clamped);
		onSizeChange?.(clamped);
	}, [
		collapsible,
		collapsedSize,
		setCollapsed,
		resolvedMin,
		resolvedMax,
		snaps,
		onSizeChange,
		onCollapseChange
	]);
	const releaseGestureBasis = (0, import_react.useCallback)(() => {
		if (gestureBasisRef.current != null) {
			gestureBasisRef.current = null;
			setGestureTick((tick) => tick + 1);
		}
	}, []);
	const onResizeEnd = (0, import_react.useCallback)(() => {
		releaseGestureBasis();
	}, [releaseGestureBasis]);
	const onResizeCancel = releaseGestureBasis;
	const measuredBasisForMax = hasContainer ? hasPositiveMeasurement && observeContainerBasis ? containerBasis : null : windowExtent;
	const effectiveMaxPx = resolvedMax !== Infinity ? resolvedMax : measuredBasisForMax == null ? void 0 : Math.max(measuredBasisForMax, isCollapsed ? resolvedMin : size);
	const props = {
		_size: isCollapsed ? 0 : size,
		_isCollapsed: isCollapsed,
		_onResizeStart: onResizeStart,
		_onResizeMove: onResizeMove,
		_onResizeEnd: onResizeEnd,
		_onResizeCancel: onResizeCancel,
		_minSizePx: resolvedMin,
		_maxSizePx: resolvedMax,
		_snaps: snaps,
		_collapsedSize: collapsedSize,
		_collapsible: collapsible,
		_direction: direction,
		_isResizableProps: true
	};
	collapseControls.set(props, {
		collapse,
		expand
	});
	if (effectiveMaxPx != null) effectiveMaxima.set(props, effectiveMaxPx);
	return {
		size: isCollapsed ? 0 : size,
		isCollapsed,
		collapse,
		expand,
		resize,
		props
	};
}
/**
* Multi-region hook — delegates to individual useSingleResizable calls.
* Region keys must be stable across renders (same count and order).
* This is enforced by the caller providing a static `regions` object.
*/
function useMultiResizable(config) {
	const { regions, autoSaveId, containerRef, direction } = config;
	const regionEntries = Object.entries(regions);
	const regionResults = regionEntries.map(([key, regionConfig]) => useSingleResizable({
		...regionConfig,
		containerRef,
		direction,
		autoSaveId: autoSaveId ? `${autoSaveId}:${key}` : void 0
	}));
	const result = {};
	regionEntries.forEach(([key], i) => {
		result[key] = regionResults[i];
	});
	return result;
}
/**
* Collapse/expand for a region, keyed by the `ResizableProps` object the hook
* returns. A handle's Enter and double-click use them so the pane restores
* its previous position (APG window splitter) rather than emulating the
* toggle with a resize to the minimum.
*
* Kept off `ResizableProps` on purpose: that type is exported, so a new field
* on it — optional or underscored — is a public delta. This module-private
* map and {@link getCollapseControls} are the package's own channel between
* the hook and the handle; neither is re-exported.
*/
var collapseControls = /* @__PURE__ */ new WeakMap();
/**
* The maximum an unbounded region reports as `aria-valuemax`: a measured
* extent that stands in for the missing configured maximum — the container's
* content box on the active axis while a percentage bound already observes
* it, or the window's extent along the axis — floored at the current size
* and, while collapsed, at the resolved minimum. The region is never clamped
* to it; it is what the separator announces. Kept off the exported
* `ResizableProps` for the same reason as the collapse controls;
* `getEffectiveMaxPx` is internal.
*/
var effectiveMaxima = /* @__PURE__ */ new WeakMap();
/** The reported maximum for `props`, or `undefined` for a hand-built object. */
function getEffectiveMaxPx(props) {
	return effectiveMaxima.get(props);
}
/**
* The collapse/expand pair the hook registered for `props`, or `undefined`
* for a hand-built `ResizableProps` object (which the handle then toggles
* with a resize gesture). Internal to the package.
*/
function getCollapseControls(props) {
	return collapseControls.get(props);
}
/** Removed keys must fail even when a variable bypasses excess-property checks. */
function useResizable(config) {
	if ("regions" in config) return useMultiResizable(config);
	return useSingleResizable(config);
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/Resizable/ResizeHandle.js
/**
* @file ResizeHandle.tsx
* @input direction, isReversed, hasDivider, isAlwaysVisible, pillPlacement, ResizableProps
* @output Styled drag handle with WAI-ARIA separator role and keyboard support
* @position Between resizable panels; consumed directly by builders
*
* The handle element is 1px wide (the divider line itself), with an
* absolutely-positioned wider hit area for pointer interaction.
* Pill grip indicator can sit on either side of the divider (or centered)
* via pillPlacement. Default 'auto' places the pill on the panel side and
* flips when the panel collapses to 0px so it stays accessible.
*
* Pill placement uses a single stylex dynamic style that accepts a direction
* multiplier (-1 or 1). The pill element has its own themeProps
* ('resize-handle-pill') so themes can target size/shape directly.
*
* While the panel is collapsed, aria-valuenow is clamped to aria-valuemin
* (a value below the minimum is invalid per WCAG 4.1.2) and a localized
* "Collapsed" aria-valuetext announces the real state.
*
* Dragging takes pointer capture on the grab zone, so the rest of the gesture
* is delivered to that element instead of being hit-tested against whatever
* the cursor happens to be over. A resizable region that contains an embedded
* frame otherwise loses the drag the moment the cursor crosses the frame: the
* events go to the guest document, and a listener on the host window never
* hears them again. Captured events are delivered to the capturing element,
* so the move/up/cancel handlers live on the grab zone (as in Slider), not on
* window.
*/
var KEYBOARD_STEP = 10;
var KEYBOARD_LARGE_STEP = 50;
function resolveEffectiveSide(pillPlacement, isReversed, isCollapsed) {
	if (pillPlacement !== "auto") return pillPlacement;
	const panelSide = isReversed ? "end" : "start";
	if (isCollapsed) return panelSide === "start" ? "end" : "start";
	return panelSide;
}
/**
* Hit-area inline bias, expressed as a fraction of the pill's per-side offset.
*
* The visible pill is placed by `pillOffsetX`/`pillOffsetY`: anchored at the
* divider's inline-start edge and pushed one grip-width-plus-gap toward the
* panel side via a PHYSICAL translate (dir −1 = start, +1 = end). Because that
* offset is physical, the pill sits on the same physical side of the divider in
* both LTR and RTL. The grab zone must sit OVER that pill, so it has to use the
* exact same anchor + physical-offset construction as the pill (just wider) —
* anchoring the hit area at the divider centre (`insetInlineStart: 50%`) and
* biasing with a percentage translate mixes a logical anchor (which flips under
* RTL) with a physical translate (which doesn't), leaving the grab zone stranded
* to one side under RTL. Returning the pill's `dir` here lets the hit area reuse
* `pillOffsetX`/`pillOffsetY` so the two elements are positioned identically.
*/
function hitAreaBiasDir(effectiveSide) {
	if (effectiveSide === "center") return null;
	return effectiveSide === "start" ? -1 : 1;
}
/**
* Drag feedback lives on `<body>`, not on the handle: the pointer spends the
* drag off the handle, over whatever the panels contain, and the resize cursor
* has to hold there. Module scope so the writes stay outside the component.
*/
function applyBodyDragStyles(isHorizontal) {
	document.body.style.cursor = isHorizontal ? "col-resize" : "row-resize";
	document.body.style.userSelect = "none";
}
function clearBodyDragStyles() {
	document.body.style.cursor = "";
	document.body.style.userSelect = "";
}
var styles$6 = {
	handle: {
		kVAEAm: "x1n2onr6",
		kmuXW: "x2lah0s",
		k1xSpc: "x78zum5",
		kGNEyG: "x6s0dn4",
		kjj79g: "xl56j7k",
		kWkggS: "x1m4xfpy",
		k1ekBW: "x15406qy",
		kIyJzY: "xuedmi6",
		kAMwcw: "xlr8y92",
		$$css: true
	},
	overlay: {
		kVAEAm: "x10l6tqk",
		kY2c9j: "xhtitgo",
		kWkggS: "xjbqb8w",
		$$css: true
	},
	overlayHorizontal: {
		kt4wiu: "xtijo5x",
		k87sOh: "x13vifvy",
		krVfgx: "x1ey2m1c",
		kzqmXN: "xkhob8h",
		$$css: true
	},
	overlayVertical: {
		krVfgx: "x1ey2m1c",
		kLqNvP: "x1o0tod",
		kt4wiu: "xtijo5x",
		kZKoxP: "x5kfih4",
		$$css: true
	},
	horizontal: {
		kzqmXN: "x1i1rx1s",
		kZKoxP: "x5yr21d",
		kkrTdU: "xicojor x16khyan",
		$$css: true
	},
	vertical: {
		kZKoxP: "xjm9jq1",
		kzqmXN: "xh8yej3",
		kkrTdU: "xyozgr7 x16khyan",
		$$css: true
	},
	noDividerHorizontal: {
		kWkggS: "xjbqb8w",
		kzqmXN: "xnalus7",
		$$css: true
	},
	noDividerVertical: {
		kWkggS: "xjbqb8w",
		kZKoxP: "xqtp20y",
		$$css: true
	},
	handleHover: {
		kWkggS: "x1m4xfpy",
		$$css: true
	},
	handleActive: {
		kWkggS: "x7njt3n",
		$$css: true
	},
	disabled: {
		kkrTdU: "xt0e3qv",
		kfzvcC: "x47corl",
		$$css: true
	},
	hitArea: {
		kVAEAm: "x10l6tqk",
		kY2c9j: "x1vjfegm",
		kFalU9: "x5ve5x3",
		kfSwDN: "x87ps6o",
		$$css: true
	},
	hitAreaHorizontal: {
		kzqmXN: "x12xnipv",
		k87sOh: "x13vifvy",
		krVfgx: "x1ey2m1c",
		kkrTdU: "xicojor x16khyan",
		$$css: true
	},
	hitAreaVertical: {
		kZKoxP: "x6b6gus",
		kLqNvP: "x1o0tod",
		kt4wiu: "xtijo5x",
		kkrTdU: "xyozgr7 x16khyan",
		$$css: true
	},
	hitAreaCenteredY: {
		k87sOh: "xwa60dl",
		k3aq6I: "x1cb1t30",
		$$css: true
	},
	pill: {
		kVAEAm: "x10l6tqk",
		kY2c9j: "xhtitgo",
		kfzvcC: "x47corl",
		kaIpWk: "xjspbzw",
		kWkggS: "x1m4xfpy",
		k1ekBW: "x1wbls7o",
		kIyJzY: "xuedmi6",
		kAMwcw: "xlr8y92",
		k87sOh: "xwa60dl",
		$$css: true
	},
	pillHorizontal: {
		kzqmXN: "x1g8rjiy",
		kZKoxP: "x18to7ep",
		$$css: true
	},
	pillVertical: {
		kzqmXN: "xgc8j7m",
		kZKoxP: "xuoj239",
		$$css: true
	},
	pillHidden: {
		kSiTet: "xg01cxk",
		$$css: true
	},
	pillVisible: {
		kSiTet: "x1hc1fzr",
		$$css: true
	},
	pillHover: {
		kSiTet: "x1hc1fzr",
		kWkggS: "x1m4xfpy",
		$$css: true
	},
	pillActive: {
		kSiTet: "x1hc1fzr",
		kWkggS: "x7njt3n",
		$$css: true
	}
};
var _temp$2 = {
	kLqNvP: "x1o0tod",
	k3aq6I: "x11wx31z x75qhwu",
	"$$css": true
};
var _temp2$1 = {
	k87sOh: "x13vifvy",
	k3aq6I: "xsqj5wx",
	"$$css": true
};
var _temp3$1 = {
	kLqNvP: "x1o0tod",
	k3aq6I: "xsqj5wx",
	"$$css": true
};
var _temp4 = {
	k87sOh: "x13vifvy",
	k3aq6I: "xsqj5wx",
	"$$css": true
};
var dynamicStyles$1 = {
	hitAreaOffsetX: (dir) => [_temp$2, {
		"--x-qthpiu": `translateX(calc(${dir} * (3px + ${spacingVars["--spacing-1"]}) - 6.5px))` != null ? `translateX(calc(${dir} * (3px + ${spacingVars["--spacing-1"]}) - 6.5px))` : void 0,
		"--x-sj6hyi": `translateX(calc(${dir} * (3px + ${spacingVars["--spacing-1"]}) + 6.5px))` != null ? `translateX(calc(${dir} * (3px + ${spacingVars["--spacing-1"]}) + 6.5px))` : void 0
	}],
	hitAreaOffsetY: (dir) => [_temp2$1, { "--x-transform": `translateY(calc(${dir} * (3px + ${spacingVars["--spacing-1"]}) - 6.5px))` != null ? `translateY(calc(${dir} * (3px + ${spacingVars["--spacing-1"]}) - 6.5px))` : void 0 }],
	pillOffsetX: (dir) => [_temp3$1, { "--x-transform": `translate(calc(${dir} * (100% + ${spacingVars["--spacing-1"]})), -50%)` != null ? `translate(calc(${dir} * (100% + ${spacingVars["--spacing-1"]})), -50%)` : void 0 }],
	pillOffsetY: (dir) => [_temp4, { "--x-transform": `translate(-50%, calc(${dir} * (100% + ${spacingVars["--spacing-1"]})))` != null ? `translate(-50%, calc(${dir} * (100% + ${spacingVars["--spacing-1"]})))` : void 0 }]
};
/**
* The snap point `count` points away from the region's current size in
* `direction` (+1 grows, -1 shrinks). A point beyond `minSize` or `maxSize`
* counts as that bound; the nearest end point serves when fewer remain, and
* the current size when it is already there.
*/
function adjacentSnapPoint(resizable, direction, count) {
	const points = [...new Set(resizable._snaps.map((p) => Math.min(resizable._maxSizePx, Math.max(resizable._minSizePx, p))))].sort((a, b) => a - b);
	const size = resizable._size;
	const ahead = direction > 0 ? points.filter((p) => p > size) : points.filter((p) => p < size).reverse();
	if (ahead.length === 0) return size;
	return ahead[Math.min(count, ahead.length) - 1];
}
/**
* Collapse an open pane, or restore a collapsed one to the size it had before
* it collapsed (APG window splitter: Enter "restores the splitter to its
* previous position"). The hook's own collapse/expand do exactly that; a
* hand-built `ResizableProps` (no registered controls) falls back to a resize
* gesture to the minimum, which also cannot reopen a pane whose minimum sits below its
* collapse threshold.
*/
function toggleCollapse(resizable) {
	const controls = getCollapseControls(resizable);
	if (controls) {
		if (resizable._isCollapsed) controls.expand();
		else controls.collapse();
		return;
	}
	resizable._onResizeStart();
	resizable._onResizeMove(resizable._isCollapsed ? resizable._minSizePx : -resizable._size);
	resizable._onResizeEnd();
}
/**
* Draggable resize handle placed between resizable panels. Renders as a thin
* divider line with a wider invisible hit area and optional pill grip indicator.
* Supports keyboard resizing via arrow keys and WAI-ARIA separator role.
*
* The pill element uses class `astryx-resize-handle-pill` for theme targeting.
*
* @example
* ```
* <ResizeHandle
*   resizable={sidebar.props}
*   direction="horizontal"
*   hasDivider />
* ```
*/
function ResizeHandle({ direction = "horizontal", position: positionMode = "inline", isReversed = false, isDisabled = false, hasDivider = false, isAlwaysVisible = true, pillPlacement = "auto", label: labelFromProps, resizable, children, xstyle, className, ref, ...props$3 }) {
	const t = useTranslator();
	const label = labelFromProps ?? t("@astryx.resizable.handle.label");
	const handleRef = (0, import_react.useRef)(null);
	const dragRef = (0, import_react.useRef)(null);
	const [isDragging, setIsDragging] = (0, import_react.useState)(false);
	const [isHovered, setIsHovered] = (0, import_react.useState)(false);
	const [isFocused, setIsFocused] = (0, import_react.useState)(false);
	const isHorizontal = direction === "horizontal";
	const isOverlay = positionMode === "overlay";
	const sign = isReversed ? -1 : 1;
	const effectiveSide = resolveEffectiveSide(pillPlacement, isReversed, resizable?._isCollapsed ?? false);
	const hitBiasDir = hitAreaBiasDir(effectiveSide);
	const getRTLMultiplier = (0, import_react.useCallback)(() => {
		const el = handleRef.current;
		if (!el) return 1;
		return getComputedStyle(el).direction === "rtl" ? -1 : 1;
	}, []);
	const isInteracting = isHovered || isFocused;
	const didWarnAxisRef = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		const hookDirection = resizable?._direction;
		if (hookDirection != null && hookDirection !== direction && !didWarnAxisRef.current) {
			didWarnAxisRef.current = true;
			`${direction}${hookDirection}`;
		}
	}, [direction, resizable]);
	const clearDrag = (0, import_react.useCallback)(() => {
		dragRef.current = null;
		setIsDragging(false);
		clearBodyDragStyles();
	}, []);
	const handlePointerDown = (0, import_react.useCallback)((e) => {
		if (isDisabled || !resizable || dragRef.current) return;
		e.preventDefault();
		e.stopPropagation();
		e.currentTarget.setPointerCapture?.(e.pointerId);
		dragRef.current = {
			pointerId: e.pointerId,
			startPos: isHorizontal ? e.clientX : e.clientY,
			rtl: isHorizontal ? getRTLMultiplier() : 1
		};
		setIsDragging(true);
		resizable._onResizeStart();
		applyBodyDragStyles(isHorizontal);
	}, [
		isDisabled,
		resizable,
		isHorizontal,
		getRTLMultiplier
	]);
	const handlePointerMove = (0, import_react.useCallback)((e) => {
		const drag = dragRef.current;
		if (!drag || drag.pointerId !== e.pointerId || !resizable) return;
		const currentPos = isHorizontal ? e.clientX : e.clientY;
		resizable._onResizeMove((currentPos - drag.startPos) * drag.rtl * sign);
	}, [
		resizable,
		isHorizontal,
		sign
	]);
	const handlePointerUp = (0, import_react.useCallback)((e) => {
		if (dragRef.current?.pointerId !== e.pointerId) return;
		clearDrag();
		resizable?._onResizeEnd();
	}, [clearDrag, resizable]);
	const cancelDrag = (0, import_react.useCallback)((e) => {
		if (dragRef.current?.pointerId !== e.pointerId) return;
		clearDrag();
		resizable?._onResizeCancel?.();
	}, [clearDrag, resizable]);
	const handleKeyDown = (0, import_react.useCallback)((e) => {
		if (isDisabled || !resizable) return;
		const step = e.shiftKey ? KEYBOARD_LARGE_STEP : KEYBOARD_STEP;
		const rtl = isHorizontal ? getRTLMultiplier() : 1;
		const grows = (key) => (key === "ArrowRight" || key === "ArrowDown" ? 1 : key === "ArrowLeft" || key === "ArrowUp" ? -1 : 0) * (isHorizontal ? rtl : 1) * sign > 0;
		switch (e.key) {
			case "ArrowRight":
			case "ArrowDown":
			case "ArrowLeft":
			case "ArrowUp": {
				e.preventDefault();
				if (resizable._isCollapsed) {
					if (grows(e.key)) {
						resizable._onResizeStart();
						resizable._onResizeMove(Math.max(resizable._minSizePx + step, resizable._collapsedSize));
						resizable._onResizeEnd();
					}
					break;
				}
				if (resizable._snaps.length > 0) {
					resizable._onResizeStart();
					resizable._onResizeMove(adjacentSnapPoint(resizable, grows(e.key) ? 1 : -1, e.shiftKey ? 2 : 1) - resizable._size);
					resizable._onResizeEnd();
					break;
				}
				const direction = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : -1;
				resizable._onResizeStart();
				resizable._onResizeMove(direction * step * (isHorizontal ? rtl : 1) * sign);
				resizable._onResizeEnd();
				break;
			}
			case "Home":
				e.preventDefault();
				resizable._onResizeStart();
				resizable._onResizeMove(resizable._minSizePx - resizable._size);
				resizable._onResizeEnd();
				break;
			case "End":
				e.preventDefault();
				if (resizable._maxSizePx !== Infinity) {
					resizable._onResizeStart();
					resizable._onResizeMove(resizable._maxSizePx - resizable._size);
					resizable._onResizeEnd();
				}
				break;
			case "Enter":
				e.preventDefault();
				if (resizable._collapsible) toggleCollapse(resizable);
		}
	}, [
		isDisabled,
		resizable,
		isHorizontal,
		getRTLMultiplier,
		sign
	]);
	const handleDoubleClick = (0, import_react.useCallback)(() => {
		if (isDisabled || !resizable || !resizable._collapsible) return;
		toggleCollapse(resizable);
	}, [isDisabled, resizable]);
	const cancelOnUnmountRef = (0, import_react.useRef)(void 0);
	cancelOnUnmountRef.current = resizable?._onResizeCancel;
	(0, import_react.useEffect)(() => {
		return () => {
			if (dragRef.current) {
				dragRef.current = null;
				clearBodyDragStyles();
				cancelOnUnmountRef.current?.();
			}
		};
	}, []);
	const isCollapsed = resizable?._isCollapsed ?? false;
	const ariaValueNow = resizable ? isCollapsed ? Math.max(resizable._size, resizable._minSizePx) : resizable._size : void 0;
	const ariaValueMin = resizable ? resizable._minSizePx : void 0;
	const effectiveMax = resizable ? getEffectiveMaxPx(resizable) ?? (resizable._maxSizePx !== Infinity ? resizable._maxSizePx : void 0) : void 0;
	const ariaValueMax = effectiveMax != null && Number.isFinite(effectiveMax) ? effectiveMax : void 0;
	const ariaValueText = resizable && isCollapsed ? t("@astryx.resizable.collapsed") : void 0;
	return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)("div", {
		ref: useMergedRefs(ref, handleRef),
		role: "separator",
		"aria-orientation": isHorizontal ? "vertical" : "horizontal",
		"aria-valuenow": ariaValueNow,
		"aria-valuemin": ariaValueMin,
		"aria-valuemax": ariaValueMax,
		"aria-valuetext": ariaValueText,
		"aria-label": label,
		"aria-disabled": isDisabled || void 0,
		tabIndex: isDisabled ? -1 : 0,
		onDoubleClick: handleDoubleClick,
		onFocus: () => setIsFocused(true),
		onBlur: () => setIsFocused(false),
		"data-resizing": isDragging || void 0,
		...mergeProps(themeProps("resize-handle"), focusOutlineProps.focusVisible(styles$6.handle, isOverlay && styles$6.overlay, isOverlay && (isHorizontal ? styles$6.overlayHorizontal : styles$6.overlayVertical), !isOverlay && (isHorizontal ? styles$6.horizontal : styles$6.vertical), !isOverlay && !hasDivider && (isHorizontal ? styles$6.noDividerHorizontal : styles$6.noDividerVertical), !isOverlay && hasDivider && isInteracting && !isDragging && styles$6.handleHover, !isOverlay && hasDivider && isDragging && styles$6.handleActive, isDisabled && styles$6.disabled, xstyle), className),
		...props$3,
		onKeyDown: (e) => {
			props$3.onKeyDown?.(e);
			handleKeyDown(e);
		},
		children: [/*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
			...props(styles$6.hitArea, isHorizontal ? styles$6.hitAreaHorizontal : styles$6.hitAreaVertical, hitBiasDir == null ? isHorizontal ? rtlStyles.centerInline("0px") : styles$6.hitAreaCenteredY : isHorizontal ? dynamicStyles$1.hitAreaOffsetX(hitBiasDir) : dynamicStyles$1.hitAreaOffsetY(hitBiasDir), isDisabled && styles$6.disabled),
			onPointerDown: handlePointerDown,
			onPointerMove: handlePointerMove,
			onPointerUp: handlePointerUp,
			onPointerCancel: cancelDrag,
			onLostPointerCapture: cancelDrag,
			onPointerEnter: () => setIsHovered(true),
			onPointerLeave: () => {
				if (!isDragging) setIsHovered(false);
			}
		}), children ?? /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", { ...mergeProps(themeProps("resize-handle-pill"), props(styles$6.pill, isHorizontal ? styles$6.pillHorizontal : styles$6.pillVertical, effectiveSide === "center" ? rtlStyles.centerInline("-50%") : isHorizontal ? dynamicStyles$1.pillOffsetX(effectiveSide === "start" ? -1 : 1) : dynamicStyles$1.pillOffsetY(effectiveSide === "start" ? -1 : 1), isAlwaysVisible ? styles$6.pillVisible : styles$6.pillHidden, isInteracting && !isDragging && styles$6.pillHover, isDragging && styles$6.pillActive)) })]
	});
}
ResizeHandle.displayName = "ResizeHandle";
//#endregion
//#region node_modules/@astryxdesign/core/dist/SideNav/SideNav.js
/**
* @file SideNav.tsx
* @input Uses React, HTMLAttributes, ReactNode, StyleX
* @output Exports SideNav component and SideNavProps
* @position Core implementation; consumed by index.ts, tested by SideNav.test.tsx
*
* Sidebar navigation container with five zones: header + topContent (sticky together),
* children (scrollable), footer, and footerIcons (sticky bottom).
*
* Supports optional resize via a drag handle at the inline-end edge. The
* resizable wrapper clips handle overflow while keeping its focus ring inside.
*
* SYNC: When modified, update these files to stay in sync:
* - /packages/core/src/SideNav/SideNav.doc.mjs
* - /packages/core/src/SideNav/SideNav.test.tsx
* - /packages/core/src/SideNav/index.ts
* - /apps/storybook/stories/SideNav.stories.tsx
* - /packages/cli/assets/templates/blocks/components/SideNav/ (showcase blocks)
*/
/** Width below which dragging collapses the sidebar (when collapsible). */
var COLLAPSE_THRESHOLD = 160;
/**
* `collapsible` and `resizable` can each carry collapse state, so they are
* normalized here into one config with one owner — two independently
* initialized copies of the same boolean is what rendered an expanded nav at
* width 0 in #4790. `resizable` is the superset, so its keys win.
*/
function resolveCollapseConfig(collapsible, resizable) {
	const fromCollapsible = typeof collapsible === "object" ? collapsible : {};
	const fromResizable = typeof resizable === "object" ? resizable : {};
	const resizableCarriesCollapse = fromResizable.defaultIsCollapsed !== void 0 || fromResizable.isCollapsed !== void 0 || fromResizable.onCollapseChange !== void 0;
	return {
		isCollapsible: !!collapsible || resizableCarriesCollapse,
		defaultIsCollapsed: (resizableCarriesCollapse ? fromResizable.defaultIsCollapsed : fromCollapsible.defaultIsCollapsed) ?? false,
		isCollapsed: resizableCarriesCollapse ? fromResizable.isCollapsed : fromCollapsible.isCollapsed,
		onCollapsedChange: resizableCarriesCollapse ? fromResizable.onCollapseChange : fromCollapsible.onCollapsedChange,
		conflict: describeCollapseConflict(fromCollapsible, fromResizable)
	};
}
/**
* Names the keys that address the same collapse state on both props, and
* which one won. Silent for the common non-overlapping combinations —
* `collapsible: true` alongside a resize config is not a conflict.
*/
function describeCollapseConflict(collapsible, resizable) {
	const collapsibleKeys = [
		collapsible.defaultIsCollapsed !== void 0 && "defaultIsCollapsed",
		collapsible.isCollapsed !== void 0 && "isCollapsed",
		collapsible.onCollapsedChange !== void 0 && "onCollapsedChange"
	].filter((key) => key !== false);
	const resizableKeys = [
		resizable.defaultIsCollapsed !== void 0 && "defaultIsCollapsed",
		resizable.isCollapsed !== void 0 && "isCollapsed",
		resizable.onCollapseChange !== void 0 && "onCollapseChange"
	].filter((key) => key !== false);
	if (collapsibleKeys.length === 0 || resizableKeys.length === 0) return null;
	return `${collapsibleKeys.map((key) => `collapsible.${key}`).join(", ")} and ${resizableKeys.map((key) => `resizable.${key}`).join(", ")} address the same collapse state. resizable wins; the collapsible ${collapsibleKeys.length === 1 ? "value is" : "values are"} ignored.`;
}
var styles$5 = {
	root: {
		k1xSpc: "x78zum5",
		kXwgrk: "xdt5ytf",
		kZKoxP: "x5yr21d",
		kzqmXN: "x1hfn5x7",
		kWkggS: "xgcd1z6",
		kB7OPa: "x9f619",
		kVQacm: "xb3r6kr",
		$$css: true
	},
	rootCollapsed: {
		kzqmXN: "xhgvbfk",
		$$css: true
	},
	resizableHandle: {
		kInvED: "x1wfwxd8 x1l5jwag",
		$$css: true
	},
	topbar: {
		k1xSpc: "x78zum5",
		kXwgrk: "x1q0g3np",
		kGNEyG: "x6s0dn4",
		kjj79g: "x1qughib",
		kZKoxP: "xsdox4t",
		kzqmXN: "xh8yej3",
		kWkggS: "xgcd1z6",
		kB7OPa: "x9f619",
		kVQacm: "xb3r6kr",
		$$css: true
	}
};
/**
* Cascaded to the icon rows through `SizeContext` so the built-in collapse
* button and the consumer's `footerIcons` come out one height. An explicit
* `size` on a child still wins.
*/
var FOOTER_ICON_SIZE = "sm";
/**
* Sidebar navigation container for application pages.
*
* Five vertical zones: sticky header + action area at top,
* scrollable nav content in the middle, and sticky footer + icon bar at bottom.
*
* @example
* ```
* <SideNav
*   header={<SideNavHeading heading="My App" headingHref="/" />}
*   topContent={<Button label="Create new" variant="primary" />}>
*   <SideNavSection heading="Main">
*     <SideNavItem label="Dashboard" isSelected href="/dashboard" />
*     <SideNavItem label="Projects" href="/projects" />
*   </SideNavSection>
* </SideNav>
* ```
*/
function SideNav({ header, topContent, children, footer, footerIcons, collapsible = false, resizable = false, xstyle, className, style, "data-testid": testId, ref, handleRef, ...props$2 }) {
	const t = useTranslator();
	const hasCollapseButton = (typeof collapsible === "object" ? collapsible : {}).hasButton ?? true;
	const resizableConfig = typeof resizable === "object" ? resizable : {};
	const isResizable = !!resizable;
	const collapseConfig = resolveCollapseConfig(collapsible, resizable);
	const { isCollapsible, onCollapsedChange } = collapseConfig;
	useDevWarning("SideNav", collapseConfig.conflict ?? "", collapseConfig.conflict != null);
	const navRef = (0, import_react.useRef)(null);
	const generatedNavId = (0, import_react.useId)();
	const navId = props$2.id ?? generatedNavId;
	const mergedNavRef = useMergedRefs(ref, navRef);
	const collapseStateRef = (0, import_react.useRef)({
		isCollapsed: false,
		toggle: () => {},
		isCollapsible
	});
	const resizableHook = useResizable({
		defaultSize: resizableConfig.defaultWidth ?? 260,
		minSize: resizableConfig.minWidth ?? 180,
		maxSize: resizableConfig.maxWidth ?? 480,
		collapsible: isCollapsible,
		collapsedSize: COLLAPSE_THRESHOLD,
		autoSaveId: resizableConfig.autoSaveId,
		defaultIsCollapsed: collapseConfig.defaultIsCollapsed,
		isCollapsed: collapseConfig.isCollapsed,
		onSizeChange: resizableConfig.onWidthChange,
		onCollapseChange: onCollapsedChange
	});
	const collapsed = resizableHook.isCollapsed;
	const toggle = (0, import_react.useCallback)(() => {
		const next = !collapsed;
		collapseStateRef.current = {
			...collapseStateRef.current,
			isCollapsed: next
		};
		if (next) resizableHook.collapse();
		else resizableHook.expand();
	}, [collapsed, resizableHook]);
	const showResizeHandle = isResizable && !collapsed;
	collapseStateRef.current = {
		isCollapsed: collapsed,
		toggle,
		isCollapsible
	};
	const collapseContext = {
		isCollapsed: collapsed,
		toggle,
		isCollapsible
	};
	(0, import_react.useImperativeHandle)(handleRef, () => ({ getCollapseState: () => collapseStateRef.current }), []);
	const renderMode = useSideNavRenderMode();
	if (renderMode === "topbar") return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)("div", {
		"data-testid": testId,
		...mergeProps(themeProps("side-nav", { mode: "topbar" }), props(styles$5.topbar, xstyle), className, style),
		children: [header, /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
			className: "x78zum5 x6s0dn4 xzye2dw xvc5jky",
			children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(SizeProvider, {
				value: FOOTER_ICON_SIZE,
				children: footerIcons
			})
		})]
	});
	const hasDrawerFooter = !!(footer || footerIcons);
	if (renderMode === "drawer") return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(MobileNav, {
		header,
		"data-testid": testId,
		xstyle,
		className,
		style,
		...props$2,
		children: [
			topContent,
			children,
			hasDrawerFooter && /*#__PURE__*/ (0, import_jsx_runtime.jsxs)("div", {
				className: "x78zum5 xdt5ytf xr1yuqi x1txdalj x1xye8es",
				children: [footer, footerIcons && /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
					className: "x78zum5 x6s0dn4 xzye2dw",
					children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(SizeProvider, {
						value: FOOTER_ICON_SIZE,
						children: footerIcons
					})
				})]
			})
		]
	});
	if (renderMode === "drawer-content") return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		topContent,
		children,
		hasDrawerFooter && /*#__PURE__*/ (0, import_jsx_runtime.jsxs)("div", {
			className: "x78zum5 xdt5ytf xr1yuqi x1txdalj x1xye8es",
			children: [footer, footerIcons && /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
				className: "x78zum5 x6s0dn4 xzye2dw",
				children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(SizeProvider, {
					value: FOOTER_ICON_SIZE,
					children: footerIcons
				})
			})]
		})
	] });
	const hasStickyTop = !!(header || topContent);
	const hasStickyBottom = !!(footer || footerIcons);
	const showCollapseButton = isCollapsible && hasCollapseButton;
	const resizableNavStyle = isResizable ? {
		...style ?? {},
		width: collapsed ? void 0 : resizableHook.size
	} : style;
	const navElement = /*#__PURE__*/ (0, import_jsx_runtime.jsxs)("nav", {
		ref: mergedNavRef,
		role: "navigation",
		"aria-label": t("@astryx.sideNav.label"),
		"data-testid": testId,
		...mergeProps(themeProps("side-nav"), props(styles$5.root, collapsed && styles$5.rootCollapsed, xstyle), className, resizableNavStyle),
		...props$2,
		id: navId,
		children: [
			hasStickyTop && /*#__PURE__*/ (0, import_jsx_runtime.jsxs)("div", {
				...{
					0: { className: "x78zum5 xdt5ytf x2lah0s x7wzq59 x13vifvy x1vjfegm xgcd1z6 x1xye8es x1wesfrj xf314gf x1txdalj" },
					1: { className: "x78zum5 xdt5ytf x2lah0s x7wzq59 x13vifvy x1vjfegm xgcd1z6 x1xye8es x1wesfrj xf314gf x1txdalj x6s0dn4" }
				}[!!collapsed << 0],
				children: [header, topContent && /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", { children: topContent })]
			}),
			/*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
				...{
					0: { className: "x98rzlu x1odjw0f x6ikm8r xf314gf x1xye8es x1wesfrj" },
					4: { className: "x98rzlu x1odjw0f x6ikm8r xf314gf x78zum5 xdt5ytf x6s0dn4 x1xye8es x1wesfrj" },
					2: { className: "x98rzlu x1odjw0f x6ikm8r xf314gf xfsso4q x1wesfrj" },
					6: { className: "x98rzlu x1odjw0f x6ikm8r xf314gf x78zum5 xdt5ytf x6s0dn4 xfsso4q x1wesfrj" },
					1: { className: "x98rzlu x1odjw0f x6ikm8r xf314gf x1xye8es xy143xn" },
					5: { className: "x98rzlu x1odjw0f x6ikm8r xf314gf x78zum5 xdt5ytf x6s0dn4 x1xye8es xy143xn" },
					3: { className: "x98rzlu x1odjw0f x6ikm8r xf314gf xfsso4q xy143xn" },
					7: { className: "x98rzlu x1odjw0f x6ikm8r xf314gf x78zum5 xdt5ytf x6s0dn4 xfsso4q xy143xn" }
				}[!!collapsed << 2 | !!hasStickyTop << 1 | !!hasStickyBottom << 0],
				children
			}),
			(hasStickyBottom || showCollapseButton) && /*#__PURE__*/ (0, import_jsx_runtime.jsxs)("div", {
				...{
					0: { className: "x78zum5 xdt5ytf x2lah0s xr1yuqi x7wzq59 x1ey2m1c xgcd1z6 x1txdalj xf314gf xfsso4q x1wesfrj" },
					1: { className: "x78zum5 xdt5ytf x2lah0s xr1yuqi x7wzq59 x1ey2m1c xgcd1z6 x1txdalj xf314gf x1wesfrj xexx8yu x6s0dn4" }
				}[!!collapsed << 0],
				children: [footer, /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
					...{
						0: { className: "x78zum5 x6s0dn4 xzye2dw" },
						1: { className: "x78zum5 x6s0dn4 xzye2dw x3ieub6" }
					}[!!collapsed << 0],
					children: /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(SizeProvider, {
						value: FOOTER_ICON_SIZE,
						children: [showCollapseButton && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(SideNavCollapseButton, {}), footerIcons]
					})
				})]
			})
		]
	});
	const content = showResizeHandle ? /*#__PURE__*/ (0, import_jsx_runtime.jsxs)("div", {
		className: "x1n2onr6 x78zum5 x2lah0s x5yr21d x7giv3",
		children: [navElement, /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ResizeHandle, {
			"data-testid": "astryx-sidenav-resize-handle",
			direction: "horizontal",
			position: "overlay",
			pillPlacement: "end",
			isAlwaysVisible: false,
			xstyle: styles$5.resizableHandle,
			resizable: resizableHook.props,
			label: t("@astryx.sideNav.resizeSidebar"),
			"aria-controls": navId
		})]
	}) : navElement;
	if (isCollapsible) return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(SideNavCollapseContext, {
		value: collapseContext,
		children: content
	});
	return content;
}
SideNav.displayName = "SideNav";
//#endregion
//#region node_modules/@astryxdesign/core/dist/SideNav/SideNavItem.js
/**
* @file SideNavItem.tsx
* @input Uses React, ReactNode, StyleX, Icon, IconType, useMenuHover
* @output Exports SideNavItem component and SideNavItemProps
* @position Core implementation; used inside SideNav children
*
* Navigation item with icon, selected state, row-level actions, and nesting.
* Collapsed icon-only controls use a meaningful consumer `aria-label` when
* provided and fall back to `label` when it is missing or blank.
*
* Collapsed items with children open their submenu flyout through
* `useMenuHover`, the shared hover-intent hook (same one `SideNavHeading` and
* `TopNavMenu` use). Hover is a progressive enhancement over the popover's
* click behavior and is inert on coarse pointers.
*
* Nested rows span the full width of the nav list, like top-level rows, so
* their hover and selected fill lines up with the rows above them. The
* nesting indent sits inside the row as extra inline-start padding, one step
* per level, tracked through a private depth context.
*
* SYNC: When modified, update these files to stay in sync:
* - /packages/core/src/SideNav/SideNav.doc.mjs
* - /packages/core/src/SideNav/SideNav.test.tsx
* - /packages/core/src/SideNav/index.ts
* - /apps/storybook/stories/SideNav.stories.tsx
* - /packages/cli/assets/templates/blocks/components/SideNav/ (showcase blocks)
*/
var styles$4 = {
	root: {
		k1xSpc: "x78zum5",
		kXwgrk: "xdt5ytf",
		kzqmXN: "xh8yej3",
		$$css: true
	},
	itemCollapsed: {
		kjj79g: "xl56j7k",
		kzqmXN: "x805d0l",
		kg3NbH: "xnjsko4",
		$$css: true
	},
	itemCollapsedSm: {
		kzqmXN: "x1fvqzum",
		$$css: true
	},
	itemCollapsedLg: {
		kzqmXN: "x1m747yf",
		$$css: true
	},
	expandChevron: {
		k1xSpc: "x3nfvp2",
		kGNEyG: "x6s0dn4",
		kjj79g: "xl56j7k",
		kzqmXN: "x1mtvzj0",
		kZKoxP: "xvpftlf",
		kGuDYH: "x1qlqyl8",
		k1ekBW: "x11xpdln",
		kIyJzY: "xuedmi6 x12w9bfk",
		kAMwcw: "xlr8y92",
		kmuXW: "x2lah0s",
		$$css: true
	},
	expandChevronExpanded: {
		k3aq6I: "x19jd1h0",
		$$css: true
	},
	expandToggle: {
		kzqmXN: "x1fvqzum",
		kZKoxP: "x6k0iem",
		k1xSpc: "x3nfvp2",
		kGNEyG: "x6s0dn4",
		kjj79g: "xl56j7k",
		kmuXW: "x2lah0s",
		kmVPX3: "x1717udv",
		kogj98: "x1ghz6dp",
		kMzoRj: "xc342km",
		ksu8eU: "xng3xce",
		kWkggS: "xjbqb8w",
		kMwMTN: "x1heor9g",
		kkrTdU: "x1ypdohk x16khyan",
		kaIpWk: "xh6dtrn",
		$$css: true
	},
	splitAction: {
		k1xSpc: "x78zum5",
		kGNEyG: "x6s0dn4",
		kSGwAc: "xkh2ocl",
		kOIVth: "x1txdalj",
		kUk6DE: "x98rzlu",
		k7Eaqz: "xeuugli",
		kMwMTN: "x1heor9g",
		kybGjl: "x1hl2dhg",
		kmVPX3: "x1717udv",
		kogj98: "x1ghz6dp",
		kMzoRj: "xc342km",
		ksu8eU: "xng3xce",
		kWkggS: "xjbqb8w",
		kMv6JI: "xjb2p0i",
		kGuDYH: "x1qlqyl8",
		k63SB2: "x1pd3egz",
		kLWn49: "x15bjb6t",
		k9WMMc: "x1yc453h",
		kkrTdU: "x1ypdohk x16khyan",
		$$css: true
	},
	popoverGap: {
		keTefX: "x11g1kdw",
		k71WvV: "xnur1sd",
		$$css: true
	}
};
var _temp$1 = {
	kZCmMZ: "xnvo3vl",
	"$$css": true
};
var _temp2 = {
	kZCmMZ: "xnvo3vl",
	"$$css": true
};
var _temp3 = {
	kZCmMZ: "xnvo3vl",
	"$$css": true
};
var indentStyles = {
	sm: (depth) => [_temp$1, { "--x-paddingInlineStart": ((val) => typeof val === "number" ? val + "px" : val != null ? val : void 0)(`calc(${spacingVars["--spacing-1"]} + ${depth} * ${spacingVars["--spacing-6"]})`) }],
	md: (depth) => [_temp2, { "--x-paddingInlineStart": ((val) => typeof val === "number" ? val + "px" : val != null ? val : void 0)(`calc(${spacingVars["--spacing-2"]} + ${depth} * ${spacingVars["--spacing-6"]})`) }],
	primary: (depth) => [_temp3, { "--x-paddingInlineStart": ((val) => typeof val === "number" ? val + "px" : val != null ? val : void 0)(`calc(${depth} * ${spacingVars["--spacing-6"]})`) }]
};
/**
* How many SideNavItems deep the current item sits: 0 at the top level,
* 1 inside one parent, and so on. A collapsed rail's flyout resets it to 0,
* since the flyout lists a parent's children as its own top level.
*/
var SideNavItemDepthContext = /*#__PURE__*/ (0, import_react.createContext)(0);
SideNavItemDepthContext.displayName = "SideNavItemDepthContext";
/**
* Cascaded to the `actions` slot through `SizeContext` so a consumer's row
* controls come out the same height as the built-in expand/collapse toggle,
* the way `SideNav` already cascades one size to its footer icons. An
* explicit `size` on a supplied control still wins.
*
* SYNC: `styles.expandToggle` carries the matching box.
*/
var ROW_CONTROL_SIZE = "sm";
var EXPANDED_COLLAPSE_STATE = {
	isCollapsed: false,
	toggle: () => {},
	isCollapsible: false
};
/**
* Renders `<a>` (via LinkComponent) when `href` is set, otherwise `<button>`.
* Centralizes the link-vs-button decision used across all SideNavItem paths.
*/
function NavItemElement({ href, as, isDisabled, onClick, ref, children, ...rest }) {
	const LinkComponent = useLinkComponent(as);
	if (href && !isDisabled) return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(LinkComponent, {
		ref,
		href,
		onClick,
		...rest,
		children
	});
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)("button", {
		ref,
		type: "button",
		onClick,
		disabled: isDisabled,
		...rest,
		children
	});
}
/**
* Navigation item for SideNav.
*
* Supports icons, selected state, nesting, and end content like badges or
* counts. Interactive row-level controls (menus, icon buttons) go in
* `actions`, which renders them as siblings of the primary element — never
* nested inside it — before any nested children in DOM and focus order.
*
* @example
* ```
* <SideNavItem
*   label="Dashboard"
*   icon={HomeIcon}
*   selectedIcon={HomeIconSolid}
*   isSelected
*   href="/dashboard"
* />
* <SideNavItem label="Settings" icon={CogIcon}>
*   <SideNavItem label="General" href="/settings/general" />
*   <SideNavItem label="Security" href="/settings/security" />
* </SideNavItem>
* <SideNavItem
*   label="Projects"
*   href="/projects"
*   collapsible
*   actions={<MoreMenu label="Project actions" items={items} />}>
*   <SideNavItem label="Alpha" href="/projects/alpha" />
* </SideNavItem>
* ```
*/
function SideNavItem({ as, label, icon, selectedIcon, isSelected = false, isDisabled = false, href, onClick, endContent, actions, children, collapsible: itemCollapsible, size = "md", "data-testid": testId, ref, xstyle, ...rest }) {
	const pressable = usePressFeedback();
	const t = useTranslator();
	const { isCollapsed } = useSideNavCollapse();
	const renderMode = useSideNavRenderMode();
	const { closeMobileNav } = useAppShellMobile();
	const isInDrawer = renderMode === "drawer" || renderMode === "drawer-content";
	const id = (0, import_react.useId)();
	const hasChildren = !!children;
	const itemRef = (0, import_react.useRef)(null);
	const depth = (0, import_react.use)(SideNavItemDepthContext);
	const popover = usePopover({
		hasLightDismiss: true,
		hasAutoFocus: true,
		hasCloseButton: false,
		dialogLabel: t("@astryx.sideNavItem.submenuLabel", { label })
	});
	const mergedTriggerRef = useMergedRefs(ref, popover.triggerRef);
	const itemCollapsibleConfig = (0, import_react.useMemo)(() => typeof itemCollapsible === "object" ? itemCollapsible : {}, [itemCollapsible]);
	const isItemCollapsible = hasChildren && itemCollapsible !== false;
	const itemControlledCollapsed = itemCollapsibleConfig.isCollapsed;
	const isItemControlled = itemControlledCollapsed !== void 0;
	const [uncontrolledCollapsed, setUncontrolledCollapsed] = (0, import_react.useState)(itemCollapsibleConfig.defaultIsCollapsed ?? false);
	const isItemCollapsed = isItemControlled ? itemControlledCollapsed : uncontrolledCollapsed;
	const toggleItemCollapse = (0, import_react.useCallback)(() => {
		const next = !isItemCollapsed;
		if (!isItemControlled) setUncontrolledCollapsed(next);
		itemCollapsibleConfig.onCollapsedChange?.(next);
	}, [
		isItemCollapsed,
		isItemControlled,
		itemCollapsibleConfig
	]);
	const displayIcon = isSelected && selectedIcon ? selectedIcon : icon;
	const hasIndependentToggle = isItemCollapsible && (!!href || !!onClick) && !isCollapsed;
	const hasActions = !!actions;
	const handleClick = (e) => {
		if (isDisabled) {
			e.preventDefault();
			return;
		}
		if (isItemCollapsible && !hasIndependentToggle && !isCollapsed) {
			e.preventDefault();
			toggleItemCollapse();
			return;
		}
		onClick?.(e);
		if (isInDrawer) closeMobileNav();
	};
	const handleToggleClick = (e) => {
		e.preventDefault();
		e.stopPropagation();
		toggleItemCollapse();
	};
	const { triggerProps: hoverTriggerProps, contentProps: hoverContentProps } = useMenuHover({
		show: popover.show,
		hide: popover.hide,
		isOpen: popover.isOpen,
		isEnabled: isCollapsed && hasChildren,
		clickGuardMs: 0,
		ownsFocus: false
	});
	if (isCollapsed && !icon) return null;
	if (isCollapsed) {
		const collapsedIcon = displayIcon && renderIconSlot(displayIcon, {
			size: "sm",
			color: isSelected ? "inherit" : isDisabled ? "disabled" : "secondary"
		});
		const collapsedItemStyles = {
			...mergeProps(themeProps("side-nav-item", {
				size,
				selected: isSelected ? "selected" : null,
				disabled: isDisabled ? "disabled" : null
			}), focusOutlineProps.focusVisible(navItemStyles.item, interactionOverlayStyles.backgroundColor, navItemStyles[size], styles$4.itemCollapsed, size === "sm" && styles$4.itemCollapsedSm, size === "lg" && styles$4.itemCollapsedLg, isSelected && navItemStyles.selected, isDisabled && navItemStyles.disabled), rest.className),
			...pressable
		};
		const collapsedAccessibleLabel = rest["aria-label"] != null && rest["aria-label"].trim() !== "" ? rest["aria-label"] : label;
		if (hasChildren) return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)("div", {
			...props(styles$4.root, xstyle),
			children: [/*#__PURE__*/ (0, import_jsx_runtime.jsx)("button", {
				ref: mergedTriggerRef,
				type: "button",
				...rest,
				...hoverTriggerProps,
				"aria-label": collapsedAccessibleLabel,
				"data-testid": testId,
				...popover.triggerProps,
				...collapsedItemStyles,
				children: collapsedIcon
			}), popover.render(/*#__PURE__*/ (0, import_jsx_runtime.jsxs)("div", {
				className: "x1hviunn xu0wf1k x7a5moj xfb3i0g",
				onMouseEnter: hoverContentProps.onMouseEnter,
				onMouseLeave: hoverContentProps.onMouseLeave,
				onClick: () => popover.hide(),
				children: [/*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
					className: "xf314gf xu0wf1k x141an7d x2mo6ok xv1l7n4 x1ltkj2j",
					children: label
				}), /*#__PURE__*/ (0, import_jsx_runtime.jsx)(SideNavCollapseContext, {
					value: EXPANDED_COLLAPSE_STATE,
					children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(SideNavItemDepthContext, {
						value: 0,
						children
					})
				})]
			}), {
				placement: "end",
				alignment: "start",
				xstyle: styles$4.popoverGap
			})]
		});
		const collapsedAriaProps = {
			"aria-current": isSelected ? "page" : void 0,
			"aria-disabled": isDisabled || void 0,
			"aria-label": collapsedAccessibleLabel,
			"data-testid": testId
		};
		const collapsedElement = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(NavItemElement, {
			ref,
			href,
			as,
			isDisabled,
			onClick: handleClick,
			...rest,
			...collapsedAriaProps,
			...collapsedItemStyles,
			children: collapsedIcon
		});
		return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)("div", {
			ref: itemRef,
			...props(styles$4.root, xstyle),
			children: [collapsedElement, /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Tooltip, {
				content: label,
				placement: "end",
				anchorRef: itemRef
			})]
		});
	}
	const itemContent = /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		displayIcon && renderIconSlot(displayIcon, {
			size: "sm",
			color: isSelected ? "inherit" : isDisabled ? "disabled" : "secondary"
		}),
		!isCollapsed && /*#__PURE__*/ (0, import_jsx_runtime.jsx)("span", {
			className: "x98rzlu xeuugli xb3r6kr xlyipyv xuxw1ft",
			children: label
		}),
		!isCollapsed && endContent && /*#__PURE__*/ (0, import_jsx_runtime.jsx)("span", {
			className: "x2lah0s x78zum5 x6s0dn4",
			children: endContent
		}),
		!isCollapsed && isItemCollapsible && !hasIndependentToggle && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Icon, {
			icon: "chevronDown",
			size: "lg",
			color: "inherit",
			xstyle: [styles$4.expandChevron, !isItemCollapsed && styles$4.expandChevronExpanded]
		})
	] });
	const itemThemeProps = themeProps("side-nav-item", {
		size,
		selected: isSelected ? "selected" : null,
		disabled: isDisabled ? "disabled" : null
	});
	const itemStyleArgs = [
		navItemStyles.item,
		interactionOverlayStyles.backgroundColor,
		navItemStyles[size],
		isSelected && navItemStyles.selected,
		isDisabled && navItemStyles.disabled
	];
	const rowIndent = depth > 0 && indentStyles[size === "sm" ? "sm" : "md"](depth);
	const primaryIndent = depth > 0 && indentStyles.primary(depth);
	const callerStyle = {
		className: rest.className,
		style: rest.style
	};
	const rowProps = {
		...mergeProps(itemThemeProps, props(...itemStyleArgs)),
		...pressable
	};
	const focusableRowProps = {
		...mergeProps(itemThemeProps, mergeProps(focusOutlineProps.focusVisible(...itemStyleArgs, rowIndent), callerStyle)),
		...pressable
	};
	const actionsRowProps = {
		...mergeProps(itemThemeProps, focusOutlineProps.focusWithinFirstChild(...itemStyleArgs)),
		...pressable
	};
	const hasRowWrapper = hasIndependentToggle || hasActions;
	let itemElement;
	if (hasRowWrapper) {
		const rowPrimaryAriaProps = hasIndependentToggle ? { "aria-current": isSelected ? "page" : void 0 } : {
			"aria-current": isSelected ? "page" : void 0,
			"aria-disabled": isDisabled || void 0,
			"aria-expanded": isItemCollapsible ? !isItemCollapsed : void 0,
			"aria-controls": isItemCollapsible ? `${id}-children` : void 0
		};
		itemElement = /*#__PURE__*/ (0, import_jsx_runtime.jsxs)("div", {
			"data-testid": testId,
			...hasActions ? actionsRowProps : rowProps,
			children: [
				/*#__PURE__*/ (0, import_jsx_runtime.jsx)(NavItemElement, {
					ref,
					href,
					as,
					isDisabled,
					onClick: handleClick,
					...rest,
					...rowPrimaryAriaProps,
					...mergeProps(hasActions ? focusOutlineProps.suppressed(styles$4.splitAction, primaryIndent) : focusOutlineProps.focusVisible(styles$4.splitAction, primaryIndent), callerStyle),
					children: itemContent
				}),
				hasIndependentToggle && /*#__PURE__*/ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: handleToggleClick,
					"aria-label": isItemCollapsed ? t("@astryx.sideNavItem.expand", { label }) : t("@astryx.sideNavItem.collapse", { label }),
					"aria-expanded": !isItemCollapsed,
					"aria-controls": `${id}-children`,
					...pressable,
					...focusOutlineProps.focusVisible(styles$4.expandToggle, interactionOverlayStyles.backgroundColor),
					children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Icon, {
						icon: "chevronDown",
						size: "lg",
						color: "inherit",
						xstyle: [styles$4.expandChevron, !isItemCollapsed && styles$4.expandChevronExpanded]
					})
				}),
				hasActions && /*#__PURE__*/ (0, import_jsx_runtime.jsx)("span", {
					className: "x2lah0s x78zum5 x6s0dn4 xzye2dw x67bb7w",
					children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(SizeProvider, {
						value: ROW_CONTROL_SIZE,
						children: actions
					})
				})
			]
		});
	} else {
		const ariaProps = {
			"aria-current": isSelected ? "page" : void 0,
			"aria-disabled": isDisabled || void 0,
			"aria-expanded": isItemCollapsible ? !isItemCollapsed : void 0,
			"aria-controls": isItemCollapsible ? `${id}-children` : void 0,
			"data-testid": testId
		};
		itemElement = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(NavItemElement, {
			ref,
			href,
			as,
			isDisabled,
			onClick: handleClick,
			...rest,
			...ariaProps,
			...focusableRowProps,
			children: itemContent
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: itemRef,
		...props(styles$4.root, xstyle),
		children: [itemElement, hasChildren && !isCollapsed && /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
			id: `${id}-children`,
			role: "group",
			"aria-labelledby": `${id}-label`,
			"aria-hidden": isItemCollapsed,
			inert: isItemCollapsed ? true : void 0,
			...{
				0: { className: "xrvj5dj x1tu4anv x1rea2x4 x6kj92 xd00j3c x1eizr8u xsr0bmt xostmdb x1k6wr6r xlr8y92" },
				1: { className: "xrvj5dj x6kj92 xd00j3c x1eizr8u xsr0bmt xlr8y92 xihq33y xb3r6kr xf1rc6" }
			}[!!isItemCollapsed << 0],
			children: /*#__PURE__*/ (0, import_jsx_runtime.jsxs)("div", {
				className: "x2lwn1j",
				children: [/*#__PURE__*/ (0, import_jsx_runtime.jsx)("span", {
					id: `${id}-label`,
					hidden: true,
					children: label
				}), /*#__PURE__*/ (0, import_jsx_runtime.jsx)(SideNavItemDepthContext, {
					value: depth + 1,
					children
				})]
			})
		})]
	});
}
SideNavItem.displayName = "SideNavItem";
//#endregion
//#region node_modules/@astryxdesign/core/dist/Switch/switch.markers.stylex.js
/**
* Scoped marker for Switch ancestor selectors.
* Prevents focus-within and hover styles from leaking from parent containers.
*/
var switchScope = {
	x1iwu4tg: "x1iwu4tg",
	$$css: true
};
/** Focus-ring marker; unlike `switchScope`, it stays on while disabled. */
var switchFocusScope = {
	xgy66g5: "xgy66g5",
	$$css: true
};
//#endregion
//#region node_modules/@astryxdesign/core/dist/Switch/Switch.js
/**
* @file Switch.tsx
* @input Uses React, useId, ChangeEvent, FieldLabel, FieldStatus, IconType, InputStatus, useTooltip, i18n (useTranslator)
* @output Exports Switch component, SwitchProps, SwitchLabelPosition, SwitchLabelSpacing
* @position Core implementation; consumed by index.ts, tested by Switch.test.tsx
*
* SYNC: When modified, update these files to stay in sync:
* - /packages/core/src/Switch/Switch.doc.mjs (props table, features, implementation notes)
* - /packages/core/src/Switch/Switch.test.tsx (tests for new/changed behavior)
* - /packages/core/src/Switch/index.ts (exports if types change)
* - /apps/storybook/stories/Switch.stories.tsx (storybook stories)
* - /packages/cli/assets/templates/blocks/components/Switch/ (showcase blocks)
*/
var wrapperSizeStyles = {
	sm: {
		kzqmXN: "x1td3qas",
		kZKoxP: "x1qx5ct2",
		$$css: true
	},
	md: {
		kzqmXN: "x100vrsf",
		kZKoxP: "xxk0z11",
		$$css: true
	}
};
var inputSizeStyles = {
	sm: {
		kzqmXN: "x1td3qas",
		kZKoxP: "x1qx5ct2",
		$$css: true
	},
	md: {
		kzqmXN: "x100vrsf",
		kZKoxP: "xxk0z11",
		$$css: true
	}
};
var trackSizeStyles = {
	sm: {
		kzqmXN: "x1td3qas",
		kZKoxP: "x1qx5ct2",
		kmVPX3: "x1i3ajwb",
		$$css: true
	},
	md: {
		kzqmXN: "x100vrsf",
		kZKoxP: "xxk0z11",
		kmVPX3: "xfawy5m",
		$$css: true
	}
};
var thumbOffSizeStyles = {
	sm: {
		kzqmXN: "x6jxa94",
		kZKoxP: "x1v9usgg",
		k3aq6I: "xbryuvx",
		$$css: true
	},
	md: {
		kzqmXN: "x1kky2od",
		kZKoxP: "xlup9mm",
		k3aq6I: "xbryuvx",
		$$css: true
	}
};
var thumbOnSizeStyles = {
	sm: {
		kzqmXN: "x1kky2od",
		kZKoxP: "xlup9mm",
		k3aq6I: "xv5t66b xi9aj42",
		$$css: true
	},
	md: {
		kzqmXN: "xw4jnvo",
		kZKoxP: "x1qx5ct2",
		k3aq6I: "x15481yp x12xz5k6",
		$$css: true
	}
};
`${colorVars["--color-overlay-pressed"]}${colorVars["--color-overlay-pressed"]}`;
var labelWrapperSizeStyles = {
	sm: {
		kAzted: "xisnujt",
		$$css: true
	},
	md: {
		kAzted: "xjwf9q1",
		$$css: true
	}
};
var styles$3 = {
	container: {
		k1xSpc: "x78zum5",
		kGNEyG: "x6s0dn4",
		kOIVth: "x1txdalj",
		$$css: true
	},
	containerLabelHidden: {
		kOIVth: "xxhr3t",
		$$css: true
	},
	containerSpread: {
		kjj79g: "x1qughib",
		kzqmXN: "xh8yej3",
		$$css: true
	},
	statusGap: {
		keoZOQ: "xtbrsbv",
		$$css: true
	},
	switchWrapper: {
		kVAEAm: "x1n2onr6",
		k1xSpc: "x78zum5",
		kGNEyG: "x6s0dn4",
		kmuXW: "x2lah0s",
		kHBbk8: "xc8icb0",
		$$css: true
	},
	input: {
		kVAEAm: "x10l6tqk",
		k87sOh: "xwa60dl",
		kogj98: "x1ghz6dp",
		kmVPX3: "x1717udv",
		kSiTet: "xg01cxk",
		kkrTdU: "x1ypdohk x16khyan",
		kY2c9j: "x1vjfegm",
		$$css: true
	},
	inputCoarse: {
		kjFi6P: "xkagaj0",
		kHzOjL: "x80b3aj",
		$$css: true
	},
	inputDisabled: {
		kkrTdU: "xt0e3qv",
		$$css: true
	},
	inputBusy: {
		kfzvcC: "x47corl",
		$$css: true
	},
	track: {
		k1xSpc: "x78zum5",
		kGNEyG: "x6s0dn4",
		kaIpWk: "xjspbzw",
		k1ekBW: "x15406qy",
		kIyJzY: "xuedmi6 x12w9bfk",
		kAMwcw: "xlr8y92",
		kB7OPa: "x9f619",
		kMzoRj: "xc342km x13rsnn2",
		ksu8eU: "xng3xce xx61lck",
		kVAM5u: "x1w1tqly",
		kKwaWg: "x1xm682w xowtp19 xphwcek x1p4304o",
		$$css: true
	},
	trackFocus: {
		kI3sdo: "x1a2a7pz x1bax923",
		kInvED: "x1s7sthk",
		$$css: true
	},
	trackOff: {
		kWkggS: "xspzpui x1a8ae7b x9yvj25",
		$$css: true
	},
	trackOn: {
		kWkggS: "x1ewilqj xcgwt1n x1jzqe4",
		$$css: true
	},
	trackDisabled: {
		kSiTet: "xbyyjgo",
		kVAM5u: "xmnqt3w",
		$$css: true
	},
	trackDisabledOff: {
		kWkggS: "xspzpui",
		$$css: true
	},
	thumb: {
		k1xSpc: "x78zum5",
		kGNEyG: "x6s0dn4",
		kjj79g: "xl56j7k",
		kaIpWk: "xjspbzw",
		k1ekBW: "xh3q6i0",
		kIyJzY: "xuedmi6 x12w9bfk",
		kAMwcw: "xlr8y92",
		kKwaWg: "x1xm682w xowtp19 xphwcek x1p4304o",
		$$css: true
	},
	thumbOff: {
		kWkggS: "x10xzikg xwvh9j7",
		$$css: true
	},
	thumbOn: {
		kWkggS: "x10xzikg x1sir5s4",
		$$css: true
	},
	labelWrapper: {
		k1xSpc: "x78zum5",
		kXwgrk: "xdt5ytf",
		kjj79g: "xl56j7k",
		$$css: true
	}
};
var dynamicWidthStyles = { width: (width) => [{
	kzqmXN: width != null ? "x5lhr3w" : width,
	$$css: true
}, { "--x-width": ((val) => typeof val === "number" ? val + "px" : val != null ? val : void 0)(width) }] };
/**
* A toggle switch component for boolean values.
*
* @example
* ```
* <Switch
*   label="Enable notifications"
*   value={enabled}
*   onChange={setEnabled}
* />
* <Switch
*   label="Dark mode"
*   description="Switch to a darker color scheme"
*   value={darkMode}
*   onChange={setDarkMode}
* />
* ```
*/
function Switch({ label, isLabelHidden = false, description, onChange, changeAction, isLoading = false, value, isDisabled = false, htmlName, disabledMessage, isOptional = false, isRequired = false, onFocus, onBlur, labelIcon, labelTooltip, labelPosition = "end", labelSpacing = "hug", status, size = "md", width, xstyle, className, style, ref, "aria-describedby": ariaDescribedByProp, "aria-labelledby": ariaLabelledByProp, ...rest }) {
	const t = useTranslator();
	const id = (0, import_react.useId)();
	const pressable = usePressFeedback();
	const descriptionID = (0, import_react.useId)();
	const statusMessageID = (0, import_react.useId)();
	const isEffectivelyRequired = useResolvedRequired({
		isRequired,
		isOptional
	});
	const [, startTransition] = (0, import_react.useTransition)();
	const [optimisticValue, setOptimisticValue] = (0, import_react.useOptimistic)(value);
	const isBusy = isLoading || optimisticValue !== value;
	const announce = useAnnounce();
	const announcedBusyRef = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (!isBusy) {
			announcedBusyRef.current = false;
			return;
		}
		if (announcedBusyRef.current) return;
		announcedBusyRef.current = true;
		announce(t("@astryx.switch.loading"));
	}, [
		announce,
		isBusy,
		t
	]);
	const isOn = optimisticValue === true;
	const showsDisabledMessage = isDisabled && !!disabledMessage;
	const disabledMessageTooltip = useTooltip({
		placement: "above",
		focusTrigger: "always",
		isEnabled: showsDisabledMessage
	});
	const describedByParts = [];
	if (ariaDescribedByProp) describedByParts.push(ariaDescribedByProp);
	if (description) describedByParts.push(descriptionID);
	if (status?.message) describedByParts.push(statusMessageID);
	if (showsDisabledMessage) describedByParts.push(disabledMessageTooltip.describedBy);
	const ariaDescribedBy = describedByParts.length > 0 ? describedByParts.join(" ") : void 0;
	const switchElement = /*#__PURE__*/ (0, import_jsx_runtime.jsxs)("div", {
		...props(styles$3.switchWrapper, wrapperSizeStyles[size]),
		children: [/*#__PURE__*/ (0, import_jsx_runtime.jsx)("input", {
			ref: useMergedRefs(ref, disabledMessageTooltip.positionRef),
			id,
			type: "checkbox",
			role: "switch",
			name: isDisabled ? void 0 : htmlName,
			checked: isOn,
			"aria-disabled": isDisabled ? "true" : void 0,
			form: isDisabled ? "" : void 0,
			required: isRequired,
			"aria-required": isEffectivelyRequired ? "true" : void 0,
			onChange: (e) => {
				if (isDisabled || isBusy) return;
				const checked = e.target.checked;
				onChange?.(checked, e);
				if (changeAction && !e.defaultPrevented) startTransition(async () => {
					setOptimisticValue(checked);
					await changeAction(checked, e);
				});
			},
			onFocus,
			onBlur,
			"aria-labelledby": ariaLabelledByProp,
			"aria-describedby": ariaDescribedBy,
			"aria-invalid": status?.type === "error" ? true : void 0,
			"aria-busy": isBusy || void 0,
			...props(styles$3.input, rtlStyles.centerInline("-50%"), styles$3.inputCoarse, inputSizeStyles[size], isDisabled && styles$3.inputDisabled, isBusy && styles$3.inputBusy)
		}), /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
			"aria-hidden": "true",
			...mergeProps(themeProps("switch", {
				checked: isOn ? "checked" : null,
				disabled: isDisabled ? "disabled" : null,
				size
			}), props(styles$3.track, trackSizeStyles[size], isOn ? styles$3.trackOn : styles$3.trackOff, styles$3.trackFocus, isDisabled && styles$3.trackDisabled, isDisabled && !isOn && styles$3.trackDisabledOff)),
			children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
				...mergeProps(themeProps("switch-thumb", {
					checked: isOn ? "checked" : null,
					size
				}), props(styles$3.thumb, isOn ? thumbOnSizeStyles[size] : thumbOffSizeStyles[size], isOn ? styles$3.thumbOn : styles$3.thumbOff)),
				children: isBusy && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Spinner, { size: "sm" })
			})
		})]
	});
	const labelElement = /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
		...props(styles$3.labelWrapper, labelWrapperSizeStyles[size]),
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FieldLabel, {
			...themeProps("switch-label"),
			label,
			inputID: id,
			isLabelHidden,
			isDisabled,
			isOptional,
			isRequired,
			labelIcon,
			labelTooltip,
			description,
			descriptionID
		})
	});
	return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)("div", {
		...mergeProps(themeProps("switch-field", {
			labelPosition: labelPosition !== "end" ? labelPosition : void 0,
			labelSpacing: labelSpacing !== "hug" ? labelSpacing : void 0
		}), props(width != null && dynamicWidthStyles.width(width), xstyle), className, style),
		...rest,
		onClick: isDisabled ? void 0 : rest.onClick,
		children: [
			/*#__PURE__*/ (0, import_jsx_runtime.jsxs)("div", {
				ref: (el) => {
					disabledMessageTooltip.interactionRef(el);
				},
				...isDisabled ? void 0 : pressable,
				...props(styles$3.container, isLabelHidden && styles$3.containerLabelHidden, labelSpacing === "spread" && styles$3.containerSpread, !isDisabled && switchScope, switchFocusScope, !isDisabled && interactionOverlayStyles.pressedAlpha),
				children: [" ", labelPosition === "start" ? /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [labelElement, switchElement] }) : /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [switchElement, labelElement] })]
			}),
			status?.message && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FieldStatus, {
				type: status.type,
				message: status.message,
				id: statusMessageID,
				variant: "detached",
				xstyle: styles$3.statusGap
			}),
			showsDisabledMessage && disabledMessageTooltip.renderTooltip(disabledMessage)
		]
	});
}
Switch.displayName = "Switch";
//#endregion
//#region node_modules/@astryxdesign/core/dist/IconButton/IconButton.js
/**
* @file IconButton.tsx
* @input Uses Button, ButtonProps
* @output Exports IconButton component, IconButtonProps type
* @position Composition wrapper over Button for icon-only buttons
*
* SYNC: When modified, update these files to stay in sync:
* - /packages/core/src/IconButton/IconButton.doc.mjs (props table, features)
* - /packages/core/src/IconButton/IconButton.test.tsx (tests)
* - /packages/core/src/IconButton/index.ts (exports if types change)
* - /apps/storybook/stories/IconButton.stories.tsx (storybook stories)
* - /packages/cli/assets/templates/blocks/components/IconButton/ (showcase blocks)
*/
/**
* Props for IconButton.
*
* Omits `isIconOnly` (always true), `children` and `endContent` (not applicable
* for icon-only buttons). `icon` is required.
*/
/**
* An icon-only button — a thin wrapper around Button with `isIconOnly`
* always set to true.
*
* Use this instead of `<Button isIconOnly>` for explicit, greppable,
* and codemod-safe icon-only button usage.
*
* @example
* ```
* <IconButton label="Settings" icon={<GearIcon />} variant="ghost" />
* <IconButton label="Delete" icon={<TrashIcon />} variant="destructive" />
* <IconButton label="Emoji" icon={<span>🚀</span>} variant="ghost" size="sm" />
* ```
*/
function IconButton({ icon, ...props }) {
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Button, {
		...props,
		icon,
		isIconOnly: true
	});
}
IconButton.displayName = "IconButton";
//#endregion
//#region node_modules/@astryxdesign/core/dist/TextArea/TextArea.js
/**
* @file TextArea.tsx
* @input Uses React, useId, ChangeEvent, ClipboardEvent, FocusEvent, Field, Icon, Spinner
* @output Exports TextArea component, TextAreaProps, TextAreaStatus, TextAreaStatusType
* @position Core implementation; consumed by index.ts, tested by TextArea.test.tsx
*
* SYNC: When modified, update these files to stay in sync:
* - /packages/core/src/TextArea/TextArea.doc.mjs (props table, features, implementation notes)
* - /packages/core/src/TextArea/TextArea.test.tsx (tests for new/changed behavior)
* - /packages/core/src/TextArea/index.ts (exports if types change)
* - /apps/storybook/stories/TextArea.stories.tsx (storybook stories)
* - /packages/cli/assets/templates/blocks/components/TextArea/ (showcase blocks)
*/
var COUNTER_WARNING_THRESHOLD = .8;
var styles$2 = {
	wrapper: {
		kY2c9j: "x1vjfegm",
		k1xSpc: "x1lliihq",
		k8WAf4: "xt970qd",
		kg3NbH: "xnjsko4",
		"--_textarea-inline-padding": "x1kdpo6e",
		$$css: true
	},
	textarea: {
		k1xSpc: "x1lliihq",
		kzqmXN: "xh8yej3",
		kB7OPa: "x9f619",
		k7Eaqz: "xeuugli",
		kMzoRj: "xc342km",
		ksu8eU: "xng3xce",
		k8WAf4: "xu0wf1k",
		kg3NbH: "x1w6f3ag",
		kMv6JI: "x9ynric",
		kGuDYH: "xjm74w1 xf9zqsd",
		kLWn49: "xw6l6zx",
		kMwMTN: "x1tgivj0",
		kWkggS: "xjbqb8w",
		kI3sdo: "x1a2a7pz",
		k8Qsv1: "xeyghm5",
		kHenm0: "x288g5",
		$$css: true
	},
	textareaDisabled: {
		kkrTdU: "xt0e3qv",
		$$css: true
	},
	textareaWithStartIcon: {
		kZCmMZ: "x1b6te9z",
		$$css: true
	},
	textareaWithStatus: {
		kwRFfy: "xp2dy4z",
		$$css: true
	},
	textareaWithBusyStatus: {
		kwRFfy: "x1g2apga",
		$$css: true
	},
	textareaWithCounter: {
		kGO01o: "xekm6fs",
		$$css: true
	}
};
var textareaSizeStyles = {
	sm: { $$css: true },
	md: { $$css: true },
	lg: {
		k8WAf4: "xce4md1",
		$$css: true
	}
};
/**
* A multi-line text input component for collecting longer user input.
*
* @example
* ```
* <TextArea label="Description" value={description} onChange={setDescription} />
* <TextArea label="Notes" rows={5} value={notes} onChange={setNotes} />
* ```
*/
function TextArea({ label, isLabelHidden = false, description, isOptional = false, isRequired = false, onChange, changeAction, isLoading = false, value, placeholder, rows = 3, isDisabled = false, isReadOnly = false, disabledMessage, status, statusVariant = "attached", labelTooltip, startIcon, hasSpellCheck = true, onPaste, maxLength, hasAutoFocus = false, size: sizeProp, htmlName, onFocus, onBlur, width, containerXstyle, containerClassName, containerStyle, controlXstyle, controlClassName, controlStyle, ref, id: idProp, "aria-describedby": ariaDescribedByProp, ...restProps }) {
	const { rest, container } = useFieldInputStyling("TextArea", restProps, {
		containerXstyle,
		containerClassName,
		containerStyle
	});
	const size = useSize(sizeProp, "md");
	const t = useTranslator();
	const isEffectivelyRequired = useResolvedRequired({
		isRequired,
		isOptional
	});
	const announce = useAnnounce();
	const generatedID = (0, import_react.useId)();
	const id = idProp ?? generatedID;
	const descriptionID = (0, import_react.useId)();
	const statusMessageID = (0, import_react.useId)();
	const counterID = (0, import_react.useId)();
	const textareaRef = (0, import_react.useRef)(null);
	const containerRef = (0, import_react.useRef)(null);
	const counterZoneRef = (0, import_react.useRef)(null);
	const [, startTransition] = (0, import_react.useTransition)();
	const [optimisticValue, setOptimisticValue] = (0, import_react.useOptimistic)(value);
	const isBusy = isLoading || optimisticValue !== value;
	const showsDisabledMessage = isDisabled && !!disabledMessage;
	const disabledMessageTooltip = useTooltip({
		placement: "above",
		focusTrigger: "always",
		isEnabled: showsDisabledMessage
	});
	const { statusIcon, describedBy: statusTooltipDescribedBy } = useInputStatusIcon({
		status,
		statusVariant
	});
	const ariaDescribedBy = [
		description ? descriptionID : null,
		statusVariant !== "tooltip" && status?.message ? statusMessageID : null,
		statusTooltipDescribedBy,
		maxLength != null ? counterID : null,
		showsDisabledMessage ? disabledMessageTooltip.describedBy : null
	].filter(Boolean).join(" ") || void 0;
	const announceCounter = (0, import_react.useCallback)((length) => {
		if (maxLength == null) return;
		const zone = length > maxLength ? "over" : length >= maxLength * COUNTER_WARNING_THRESHOLD ? "near" : "under";
		if (zone === counterZoneRef.current) return;
		counterZoneRef.current = zone;
		if (zone === "over") announce(t("@astryx.textArea.charactersOverLimit", { count: length - maxLength }), "assertive");
		else if (zone === "near") announce(t("@astryx.textArea.charactersRemaining", { count: maxLength - length }));
	}, [
		announce,
		t,
		maxLength
	]);
	const handleChange = (e) => {
		if (isDisabled || isReadOnly) return;
		const newValue = e.target.value;
		if (maxLength != null) announceCounter(characterCount(newValue));
		onChange?.(newValue, e);
		if (changeAction && !e.defaultPrevented) startTransition(async () => {
			setOptimisticValue(newValue);
			await changeAction(newValue, e);
		});
	};
	const valueLength = (0, import_react.useMemo)(() => maxLength != null ? characterCount(optimisticValue) : 0, [maxLength, optimisticValue]);
	const { onClick: handleWrapperClick, onMouseUp: handleWrapperMouseUp } = useInputContainer({
		containerRef,
		inputRef: textareaRef,
		disabled: isDisabled || isBusy
	});
	return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(Field, {
		...container,
		label,
		isLabelHidden,
		description,
		inputID: id,
		descriptionID: description ? descriptionID : void 0,
		isOptional,
		isRequired,
		isDisabled,
		status: status ? {
			type: status.type,
			message: status.message,
			messageID: status.message ? statusMessageID : void 0
		} : void 0,
		statusVariant,
		labelTooltip,
		width,
		children: [/*#__PURE__*/ (0, import_jsx_runtime.jsxs)("div", {
			ref: (el) => {
				containerRef.current = el;
				disabledMessageTooltip.ref(el);
			},
			onClick: handleWrapperClick,
			onMouseUp: handleWrapperMouseUp,
			...mergeProps(themeProps("text-area", {
				size,
				status: status?.type ?? null,
				disabled: isDisabled ? "disabled" : null,
				readonly: isReadOnly ? "readonly" : null
			}), props(inputWrapperStyles.base, styles$2.wrapper, isDisabled && inputWrapperStyles.disabled, status && inputStatusBorderStyles[status.type], status && !isDisabled && inputStatusHoverShadowStyles[status.type], status && inputStatusFocusWithinStyles[status.type], controlXstyle), controlClassName, controlStyle),
			children: [
				startIcon && /*#__PURE__*/ (0, import_jsx_runtime.jsx)("span", {
					className: "x10l6tqk xctzyg x1kiyvbf x47corl x78zum5",
					children: renderIconSlot(startIcon, {
						size: "sm",
						color: "secondary"
					})
				}),
				/*#__PURE__*/ (0, import_jsx_runtime.jsx)("textarea", {
					...rest,
					ref: useMergedRefs(ref, textareaRef),
					id,
					name: isDisabled ? void 0 : htmlName,
					value: optimisticValue,
					onChange: handleChange,
					onPaste,
					onFocus,
					onBlur,
					placeholder,
					rows,
					disabled: isDisabled && !showsDisabledMessage,
					"aria-disabled": showsDisabledMessage ? "true" : void 0,
					readOnly: isReadOnly || showsDisabledMessage || void 0,
					spellCheck: hasSpellCheck,
					autoFocus: hasAutoFocus,
					"data-autofocus": hasAutoFocus || void 0,
					"aria-describedby": [ariaDescribedByProp, ariaDescribedBy].filter(Boolean).join(" ") || void 0,
					"aria-required": isEffectivelyRequired ? "true" : void 0,
					"aria-invalid": status?.type === "error" || maxLength != null && valueLength > maxLength ? "true" : void 0,
					"aria-busy": isBusy || void 0,
					...mergeProps(themeProps("text-area-control"), props(styles$2.textarea, textareaSizeStyles[size], isDisabled && styles$2.textareaDisabled, Boolean(startIcon) && styles$2.textareaWithStartIcon, (isBusy || statusIcon != null) && styles$2.textareaWithStatus, isBusy && statusIcon != null && styles$2.textareaWithBusyStatus, maxLength != null && styles$2.textareaWithCounter))
				}),
				(isBusy || statusIcon) && /*#__PURE__*/ (0, import_jsx_runtime.jsxs)("span", {
					className: "x10l6tqk xctzyg x13oyzgk x47corl x78zum5 x6s0dn4 x1txdalj",
					children: [isBusy && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Spinner, { size: "sm" }), statusIcon]
				}),
				maxLength != null && /*#__PURE__*/ (0, import_jsx_runtime.jsxs)("div", {
					id: counterID,
					...mergeProps(themeProps("text-area-counter"), {
						0: { className: "x10l6tqk x112dmjn x13oyzgk x47corl x78zum5 x6s0dn4 xzye2dw x9ynric x141an7d x1ltkj2j xv1l7n4" },
						1: { className: "x10l6tqk x112dmjn x13oyzgk x47corl x78zum5 x6s0dn4 xzye2dw x9ynric x141an7d x1ltkj2j xjt36v0" }
					}[!!(valueLength > maxLength) << 0]),
					children: [
						valueLength > maxLength && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Icon, {
							icon: "warning",
							size: "sm"
						}),
						valueLength,
						"/",
						maxLength
					]
				})
			]
		}), showsDisabledMessage && disabledMessageTooltip.renderTooltip(disabledMessage)]
	});
}
TextArea.displayName = "TextArea";
//#endregion
//#region node_modules/@astryxdesign/core/dist/Drawer/useDrawerDialogPresence.js
/**
* @file useDrawerDialogPresence.ts
* @input Controlled open state, modal mode, dialog ref, and rendered-state setter
* @output Coordinates native top-layer presence, exit timing, focus restoration, and unmount cleanup
* @position Drawer-internal hook; consumed only by Drawer.tsx
*
* The drawer has two independent notions of presence:
* - React's rendered state keeps the panel visible for its CSS exit.
* - Native `showModal()` or `showPopover()` state keeps it in the browser top
*   layer.
*
* Their close ordering is a browser-visible invariant: the panel must finish
* its exit, then leave the active native host and hide in the same task. If the
* hide lands a frame later, a transformed ancestor becomes the containing block
* for the now-non-top-layer `position: fixed` panel and it paints back inside
* the page for one frame.
*
* SYNC: When modified, update:
* - /packages/core/src/Drawer/Drawer.test.tsx
* - /.github/scripts/modal-close-visibility.js
*/
/** Slack past the computed transition before the backstop gives up waiting. */
var EXIT_BACKSTOP_BUFFER_MS = 50;
/**
* Hold used when the transition duration cannot be read — an unresolved
* `var()` outside a real browser. Picking a fixed number would otherwise make
* an assumption about the consumer's theme.
*/
var EXIT_FALLBACK_MS = 250;
function isPopoverOpen(dialog) {
	try {
		return dialog.matches(":popover-open");
	} catch {
		return false;
	}
}
function isDrawerHostOpen(dialog, isModal) {
	return isModal ? dialog.open : isPopoverOpen(dialog) || dialog.open;
}
function showDrawerHost(dialog, isModal) {
	if (isModal) dialog.showModal();
	else if (typeof dialog.showPopover === "function") dialog.showPopover();
	else dialog.show();
}
function dispatchDialogClose(dialog) {
	const EventConstructor = dialog.ownerDocument.defaultView?.Event ?? Event;
	dialog.dispatchEvent(new EventConstructor("close"));
}
/**
* Leaves the active native host. Returns whether the caller owes a synthetic
* `close` dispatch: `dialog.close()` used to power the non-modal path, and
* consumers observe its native `close` event through refs/onClose. Popover
* dismissal has no equivalent event, so that public DOM contract is preserved
* explicitly — but by the caller, not here. Native `close` is queued as a
* task, so a consumer's listener always ran after this hook's own focus
* restore; the synthetic event must keep that ordering (and fire exactly once
* per exit, including the unmount path).
*/
function hideDrawerHost(dialog, isModal) {
	if (!isModal && typeof dialog.hidePopover === "function") {
		dialog.hidePopover();
		return true;
	}
	if (dialog.open) dialog.close();
	return false;
}
/**
* Coordinates the native dialog and React-rendered presence for Drawer.
*
* Opening captures the trigger, enters the modal-dialog or manual-popover host,
* and honours the component's `data-autofocus` contract. Closing waits for the
* actual transform transition (with a computed-duration backstop), then leaves
* the native host and synchronously hides the panel before the browser can paint
* it outside the top layer, restores focus to the captured trigger, and only
* then dispatches the popover host's synthetic `close`. Unmount cleanup closes
* a host left open by React Activity or a removed subtree.
*/
function useDrawerDialogPresence({ dialogRef, isOpen, isModal, setIsRendered }) {
	const triggerElementRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;
		if (isOpen) {
			if (!isDrawerHostOpen(dialog, isModal)) {
				triggerElementRef.current = document.activeElement;
				showDrawerHost(dialog, isModal);
				dialog.querySelector("[data-autofocus]")?.focus();
			}
			return;
		}
		if (!isDrawerHostOpen(dialog, isModal)) return;
		return waitForDrawerExit(dialog, () => {
			const owesCloseEvent = hideDrawerHost(dialog, isModal);
			(0, import_react_dom.flushSync)(() => {
				setIsRendered(false);
			});
			triggerElementRef.current?.focus();
			triggerElementRef.current = null;
			if (owesCloseEvent) dispatchDialogClose(dialog);
		});
	}, [
		dialogRef,
		isModal,
		isOpen,
		setIsRendered
	]);
	(0, import_react.useEffect)(() => {
		const dialog = dialogRef.current;
		return () => {
			if (dialog && isDrawerHostOpen(dialog, isModal)) {
				if (hideDrawerHost(dialog, isModal)) dispatchDialogClose(dialog);
			}
		};
	}, [dialogRef, isModal]);
}
/**
* Wait for the panel's transform transition, with a computed-duration
* backstop. Mirrors BottomSheetPanel.waitForTransition: the native event is
* authoritative, and the timeout only prevents a lost event from stranding an
* open dialog.
*/
function waitForDrawerExit(element, complete) {
	let done = false;
	let timer = null;
	const finish = () => {
		if (done) return;
		done = true;
		if (timer != null) clearTimeout(timer);
		element.removeEventListener("transitionend", handleTransitionEnd);
		element.removeEventListener("transitioncancel", handleTransitionEnd);
		complete();
	};
	const handleTransitionEnd = (event) => {
		if (event.target === element && event.propertyName === "transform") finish();
	};
	element.addEventListener("transitionend", handleTransitionEnd);
	element.addEventListener("transitioncancel", handleTransitionEnd);
	const transitionMs = readTransformTransitionMs(element);
	timer = setTimeout(finish, (transitionMs ?? EXIT_FALLBACK_MS) + EXIT_BACKSTOP_BUFFER_MS);
	return () => {
		done = true;
		if (timer != null) clearTimeout(timer);
		element.removeEventListener("transitionend", handleTransitionEnd);
		element.removeEventListener("transitioncancel", handleTransitionEnd);
	};
}
/** Read the transform transition's duration + delay from computed CSS. */
function readTransformTransitionMs(element) {
	const computed = window.getComputedStyle(element);
	const properties = computed.transitionProperty.split(",").map((value) => value.trim());
	const durations = parseTimes(computed.transitionDuration);
	const delays = parseTimes(computed.transitionDelay);
	if (properties.length === 0 || durations.length === 0 || delays.length === 0 || durations.includes(null) || delays.includes(null)) return null;
	return properties.reduce((longest, property, index) => {
		if (property !== "transform" && property !== "all") return longest;
		const duration = durations[index % durations.length];
		const delay = delays[index % delays.length];
		return Math.max(longest, (duration ?? 0) + (delay ?? 0));
	}, 0);
}
function parseTimes(value) {
	return value.split(",").map((part) => {
		const trimmed = part.trim();
		const time = Number.parseFloat(trimmed);
		if (!Number.isFinite(time)) return null;
		if (trimmed.endsWith("ms")) return time;
		return trimmed.endsWith("s") ? time * 1e3 : null;
	});
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/Drawer/Drawer.js
/**
* @file Drawer.tsx
* @input Uses React, StyleX, theme tokens, the shared layer text/structure resets and content boundary, the Dialog purpose type, shared focus/dismissal/depth primitives, container padding lowering, scroll locking/dialog presence, BaseProps, merged refs/props, themeProps
* @output Exports Drawer component and DrawerProps
* @position Core implementation; consumed by index.ts, tested by Drawer.test.tsx, demonstrated in Storybook
*
* Overlay panel for inspectors and detail views — the "click a table row,
* see its details" pattern. Slides in from the inline start or end edge and
* floats above the page content: unlike a docked panel it never reflows the
* layout underneath, it overlays it (with or without a scrim).
*
* Inline axis only (start/end). Block-axis sheets are BottomSheet's job;
* a drawer is always a full-height side panel.
*
* Sizing is viewport-aware: `width` is the desktop budget, and below
* the mobile breakpoint it preserves a 56px reveal of the page behind, capped
* by the requested width (or fills the viewport with the experimental
* `experimental.isFullWidthOnMobile` option).
*
* Uses the native `<dialog>` element (same precedent as Dialog/MobileNav):
* - `showModal()` when `hasScrim` (default) — top-layer rendering, focus
*   trapping, `::backdrop`, no z-index management.
* - `showPopover()` when `hasScrim={false}` — non-modal top-layer overlay;
*   the page behind stays interactive (e.g. master-detail inspectors).
*
* Entry animation uses `@starting-style`; exit slides out before the active
* modal-dialog or manual-popover host releases the top layer and focus returns
* to the element that opened the drawer. React owns `display` for both legs
* rather than a discrete `display` transition, so the panel stops painting in
* the same commit as the host closes — see the `rendered` style for why.
*
* Sibling drawers use the shared layer dismissal stack for topmost-only Escape
* handling and the browser top layer's chronological paint order.
*
* Dismissal follows Dialog: `purpose` decides whether Escape and a scrim click
* request close, and Drawer renders no close button of its own. Compose
* `DrawerHeader` with `onOpenChange` for a visible close action, as with
* `DialogHeader`.
*
* The scrolling content area is the drawer's container, like Dialog's inner
* box: the `padding` prop, else the theme's `padding` on `drawer`, insets it
* through container tokens, defaulting to `--spacing-4` like Dialog, and the
* applied inset is published so a lone Section child escapes it and a Layout
* redistributes it to its regions. Compose `DrawerHeader` inside a `Layout`, as
* `DialogHeader` is composed in Dialog, so the header is not padded twice. The
* root dialog stays the overlay boundary (`overlayPaddingReset`).
*
* SYNC: When modified, update these files to stay in sync:
* - /packages/core/src/Drawer/Drawer.doc.mjs (props table, features, usage)
* - /packages/core/src/Drawer/Drawer.test.tsx (tests for new/changed behavior)
* - /packages/core/src/Drawer/Drawer.spec.md (component contract)
* - /packages/core/src/Drawer/index.ts (exports if types change)
* - /packages/cli/assets/templates/blocks/components/Drawer/ (showcase blocks)
* - /apps/storybook/stories/Drawer.stories.tsx (examples and visual coverage)
*/
var MOBILE_PAGE_REVEAL = 56;
var MOBILE_WIDTH_FULL = "100dvw";
var styles$1 = {
	dialog: {
		kVAEAm: "xixxii4",
		kogj98: "x1ghz6dp",
		kmVPX3: "x1717udv",
		kMzoRj: "xc342km",
		ksu8eU: "xng3xce",
		kaIpWk: "x2u8bby",
		ks0D6T: "x1x1rfll",
		kskxy: "x7ab17h",
		kB7OPa: "x9f619",
		kXwgrk: "xdt5ytf",
		kWkggS: "x10xzikg",
		kGVxlE: "x1kcpxr7",
		kVQacm: "xb3r6kr",
		kZeWKH: "xish69e",
		kI3sdo: "x1a2a7pz",
		k87sOh: "x13vifvy",
		krVfgx: "x1ey2m1c",
		kZKoxP: "xtdtrs8",
		k1xSpc: "x1s85apg",
		k1ekBW: "x11xpdln",
		kIyJzY: "x80gvsz",
		kAMwcw: "xlr8y92",
		k6CgDc: "xzg1mie",
		$$css: true
	},
	rendered: {
		k1xSpc: "x78zum5",
		$$css: true
	},
	end: {
		kt4wiu: "xtijo5x",
		kLqNvP: "xhi6v0a",
		k2ei4v: "xgbv0en",
		kVhnKS: "x1t7ytsu",
		kGJrpR: "x1j92z86",
		k3aq6I: "xumwmo6 xbw113y",
		$$css: true
	},
	endOpen: {
		k3aq6I: "xbryuvx x1yqmsfc xrxqmjf",
		$$css: true
	},
	start: {
		kLqNvP: "x1o0tod",
		kt4wiu: "x1woyocn",
		ke9TFa: "xw8tdv1",
		k8ry5P: "x18b5jzi",
		kBCPoo: "x1gejf6u",
		k3aq6I: "x5i6ehr x1eqdj8u",
		$$css: true
	},
	startOpen: {
		k3aq6I: "xbryuvx x6mt36l x1r0dqvm",
		$$css: true
	},
	scrim: {
		kGyWv1: "xnixb3f",
		kba3nw: "x1abwkk1",
		k5sjJv: "xph5o2a",
		kND0Po: "x167zut7",
		k9an0g: "xft5bk6",
		kb4ib: "x15h3t91",
		kA5Tbj: "x1viac0w",
		$$css: true
	},
	scrimOpen: {
		k5sjJv: "xb3n6bw xxiuuzi",
		$$css: true
	},
	content: {
		kzQI83: "x1iyjqo2",
		kAzted: "x2lwn1j",
		kzqmXN: "xh8yej3",
		kORKVm: "x1odjw0f",
		kXHlph: "x6ikm8r",
		kZeWKH: "xish69e",
		kFalU9: "xx69xxh",
		kI3sdo: "x1a2a7pz",
		kWkggS: "x10xzikg",
		$$css: true
	},
	contentSafeArea: {
		kGO01o: "xvmia7e",
		$$css: true
	}
};
var _temp = {
	ks0D6T: "xlbgzzq",
	"$$css": true
};
var dynamicStyles = { inlineSize: (desktopWidth, mobileWidth) => [
	_temp,
	{
		kzqmXN: (desktopWidth != null ? "x11ymkkh " : desktopWidth) + (mobileWidth != null ? "xci7e5a" : mobileWidth),
		$$css: true
	},
	{
		"--x-1xmrurk": ((val) => typeof val === "number" ? val + "px" : val != null ? val : void 0)(desktopWidth),
		"--x-fqzwsx": ((val) => typeof val === "number" ? val + "px" : val != null ? val : void 0)(mobileWidth)
	}
] };
/**
* An overlay panel for inspectors and detail views.
*
* Slides in from the logical start or end edge and floats above the page
* using the native `<dialog>` element: modal with a scrim by default, or a
* non-modal overlay with `hasScrim={false}` that leaves the page behind
* interactive. `width` is the desktop budget; below 640px the panel preserves
* a 56px page reveal without exceeding that budget (or fills the viewport
* with the experimental `experimental.isFullWidthOnMobile`). Escape
* closes the top-most open drawer; focus returns to the element that
* opened it.
*
* Dismissal matches Dialog: `purpose` decides whether Escape and a scrim click
* close the drawer, and `DrawerHeader` renders a close button when given
* `onOpenChange`.
*
* Like Dialog, the drawer is a container: `padding` (or a theme's `padding`
* on `drawer`) insets the content area, a lone Section child escapes that
* inset, and a Layout inside picks it up for its header, content, and footer
* regions. The default inset is `--spacing-4`, matching Dialog.
*
* @example
* ```
* const [selected, setSelected] = useState(null);
* const handleOpenChange = isOpen => !isOpen && setSelected(null);
* <Drawer
*   isOpen={selected != null}
*   onOpenChange={handleOpenChange}
*   label={`Details: ${selected?.name}`}>
*   <Layout
*     header={<DrawerHeader title={selected?.name} onOpenChange={handleOpenChange} />}
*     content={<LayoutContent><HostDetails host={selected} /></LayoutContent>}
*   />
* </Drawer>
* ```
*/
function Drawer({ isOpen, onOpenChange, side = "end", width = 400, experimental, label, hasScrim = true, purpose = "info", padding, children, xstyle, className, style, onClick: onClickProp, onKeyDown: onKeyDownProp, ref, ...props$1 }) {
	const dialogRef = (0, import_react.useRef)(null);
	const { containerRef: focusTrapRef } = useFocusTrap({ isActive: isOpen && hasScrim });
	const mergedDialogRef = useMergedRefs(ref, dialogRef, focusTrapRef);
	const allowEscape = purpose !== "required";
	const allowScrimClick = purpose === "info";
	const usesThemePadding = padding == null;
	const effectivePadding = padding ?? 4;
	const paddingToken = spacingStepToToken[effectivePadding];
	const [isRendered, setIsRendered] = (0, import_react.useState)(isOpen);
	if (isOpen && !isRendered) setIsRendered(true);
	useDrawerDialogPresence({
		dialogRef,
		isOpen,
		isModal: hasScrim,
		setIsRendered
	});
	const handleDismiss = (0, import_react.useCallback)(() => {
		onOpenChange(false);
	}, [onOpenChange]);
	const { shouldDismissOnCloseRequest } = useLayerDismissal({
		isActive: isRendered,
		escapeBehavior: allowEscape ? "close" : "block",
		onDismiss: handleDismiss,
		getContainer: () => dialogRef.current
	});
	useScrollLock(isOpen && hasScrim);
	const handleCancel = (0, import_react.useCallback)((event) => {
		event.preventDefault();
		if (shouldDismissOnCloseRequest() && allowEscape) handleDismiss();
	}, [
		allowEscape,
		handleDismiss,
		shouldDismissOnCloseRequest
	]);
	const handleClick = (0, import_react.useCallback)((event) => {
		if (event.target === event.currentTarget && hasScrim && allowScrimClick) onOpenChange(false);
	}, [
		allowScrimClick,
		hasScrim,
		onOpenChange
	]);
	const widthValue = typeof width === "number" ? `${width}px` : width;
	const mobileWidth = experimental?.isFullWidthOnMobile ?? false ? MOBILE_WIDTH_FULL : `min(${widthValue}, calc(100dvw - ${MOBILE_PAGE_REVEAL}px))`;
	const exitSideRef = (0, import_react.useRef)(side);
	if (isOpen) exitSideRef.current = side;
	const anchoredSide = isOpen ? side : exitSideRef.current;
	const sideStyle = anchoredSide === "start" ? styles$1.start : styles$1.end;
	const sideOpenStyle = anchoredSide === "start" ? styles$1.startOpen : styles$1.endOpen;
	const { open: _open, ...safeProps } = props$1;
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)("dialog", {
		ref: mergedDialogRef,
		...mergeProps(themeProps("drawer", { side: anchoredSide }), props(layerTextReset.reset, layerStructureReset.reset, styles$1.dialog, overlayPaddingReset.reset, sideStyle, dynamicStyles.inlineSize(widthValue, mobileWidth), isRendered && styles$1.rendered, isOpen && sideOpenStyle, hasScrim && styles$1.scrim, hasScrim && isOpen && styles$1.scrimOpen, xstyle), className, style),
		...safeProps,
		popover: hasScrim ? void 0 : "manual",
		"aria-label": label,
		"aria-modal": hasScrim ? "true" : void 0,
		...purpose === "required" && hasScrim ? { role: "alertdialog" } : void 0,
		onClick: composeEventHandlers(onClickProp, handleClick),
		onKeyDown: onKeyDownProp,
		onCancel: handleCancel,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(LayerDepthProvider, { children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(LayerContentBoundary, { children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
			tabIndex: -1,
			...props(styles$1.content, ...container(usesThemePadding ? { useThemeDefault: "drawer" } : {
				paddingInnerX: paddingToken,
				paddingInnerY: paddingToken,
				paddingOuterX: paddingToken,
				paddingOuterY: paddingToken
			}), !usesThemePadding && effectivePadding !== 4 && paddingStyles[effectivePadding], !usesThemePadding && effectivePadding !== 4 && containerPaddingInlineVarStyles[effectivePadding], !usesThemePadding && effectivePadding !== 4 && containerPaddingBlockStartVarStyles[effectivePadding], !usesThemePadding && effectivePadding !== 4 && containerPaddingBlockEndVarStyles[effectivePadding], styles$1.contentSafeArea),
			children
		}) }) })
	});
}
Drawer.displayName = "Drawer";
//#endregion
//#region node_modules/@astryxdesign/core/dist/Drawer/DrawerHeader.js
/**
* Header for a Drawer: a title, optional subtitle and start/end content, and a
* close button when `onOpenChange` is passed. Same API as DialogHeader.
*
* Uses LayoutHeader internally for consistent styling with other layout headers.
*
* @example
* ```
* <Drawer isOpen={isOpen} onOpenChange={setIsOpen} label="Details">
*   <DrawerHeader title="Details" onOpenChange={setIsOpen} />
*   <Section padding={4}>Content</Section>
* </Drawer>
* ```
*/
function DrawerHeader({ title, subtitle, onOpenChange, startContent, endContent, endContentEdgeCompensation, hasDivider, xstyle, className, style, ref, ...rest }) {
	const t = useTranslator();
	const hasSubtitle = isRenderable(subtitle);
	const hasStartContent = isRenderable(startContent);
	const hasEndContent = isRenderable(endContent);
	const shouldCompensateEndBlock = endContentEdgeCompensation == null ? onOpenChange != null : endContentEdgeCompensation === "block" || endContentEdgeCompensation === "all";
	const shouldCompensateEndInline = endContentEdgeCompensation == null ? onOpenChange != null : endContentEdgeCompensation === "inline" || endContentEdgeCompensation === "all";
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(LayoutHeader, {
		ref,
		hasDivider,
		xstyle,
		className,
		style,
		...rest,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsxs)("div", {
			...mergeProps(themeProps("drawer-header"), { className: "x78zum5 x1cy8zhl x1qughib xjcht0a" }),
			children: [
				hasStartContent && /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
					...mergeProps(themeProps("drawer-header-start-content"), { className: "x78zum5 x6s0dn4 x1txdalj x2lah0s" }),
					children: startContent
				}),
				/*#__PURE__*/ (0, import_jsx_runtime.jsxs)("div", {
					...mergeProps(themeProps("drawer-header-title-block"), { className: "x78zum5 xdt5ytf xsn7fz1 x98rzlu xeuugli xqixskq" }),
					children: [/*#__PURE__*/ (0, import_jsx_runtime.jsx)(Heading, {
						level: 2,
						children: title
					}), hasSubtitle && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Text, {
						type: "body",
						size: "sm",
						color: "secondary",
						children: subtitle
					})]
				}),
				(hasEndContent || onOpenChange != null) && /*#__PURE__*/ (0, import_jsx_runtime.jsxs)("div", {
					...mergeProps(themeProps("drawer-header-end-content"), {
						0: { className: "x78zum5 x6s0dn4 x1txdalj x2lah0s" },
						2: { className: "x78zum5 x6s0dn4 x1txdalj x2lah0s xhzvc8f" },
						1: { className: "x78zum5 x6s0dn4 x1txdalj x2lah0s x3kzqx6" },
						3: { className: "x78zum5 x6s0dn4 x1txdalj x2lah0s xhzvc8f x3kzqx6" }
					}[!!shouldCompensateEndBlock << 1 | !!shouldCompensateEndInline << 0]),
					children: [endContent, onOpenChange && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						label: t("@astryx.dialog.close"),
						tooltip: t("@astryx.dialog.close"),
						icon: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Icon, {
							icon: "close",
							color: "inherit",
							...themeProps("drawer-header-close-icon")
						}),
						onClick: () => {
							onOpenChange(false);
						},
						isIconOnly: true
					})]
				})
			]
		})
	});
}
DrawerHeader.displayName = "DrawerHeader";
//#endregion
//#region node_modules/@astryxdesign/core/dist/Item/useSwipeAction.js
/**
* @file useSwipeAction.ts
* @input Pointer events on a row's root; the root element to translate
* @output Exports useSwipeAction — the gesture behind Item's `swipeActions`
* @position Internal to Item, through ItemSwipeLayer (the only module that
*   imports it, loaded on demand); tested through Item.test.tsx
*
* A native-list swipe: drag a row sideways and the side's panel is uncovered.
* Under `reveal` a release past half the panel leaves the row resting open
* with every entry tappable, and a long drag or a fling fires the outermost
* entry; under `commit` a release past the commit point slides the row out
* and fires the outermost entry, and nothing rests. After an entry fires the
* row springs back, or holds out when the entry has `hasRemoval`. A release
* short of the threshold springs back under both.
*
* Touch only, by pointer type rather than by breakpoint: a mouse has the
* row's own controls and a keyboard has the verb already; the gesture is an
* accelerator for a verb the row exposes elsewhere, never the only way to
* reach one.
*
* The axis is decided once, at 10 px of travel: a drag more vertical than
* horizontal belongs to the scroller and is never claimed. The claim is told
* to the browser: `touch-action: pan-y` is not enough on iOS Safari, whose
* scroller takes any drag with a vertical component as a pan (a 4:1 drag got
* `pointercancel` 40 px in; the same drag after a one-second hold, which
* fails the native pan, ran to the end), so a non-passive `touchmove`
* listener cancels the default while the row owns the drag, which is the one
* signal WebKit honours. Before the axis is decided, and for a drag the
* scroller got, nothing is cancelled.
*
* The drag's travel is one custom property written on the root, coalesced to
* one write per frame; the root's transform reads it and the panels'
* transforms read its negation, so the row moves and the panel appears fixed
* in the space the row vacates. Settling (the spring back, the slide out)
* writes a duration the same elements read as their transition clock, so
* everything derived from the travel moves together. A drag costs no React
* render; the claim and the settle each cost one.
*
* Directions are logical: `leading` is a drag toward the inline end and
* `trailing` a drag toward the inline start, read against the root's computed
* `direction` at the touch and written beside the travel as a sign the
* transforms multiply by, so under `dir="rtl"` the finger, the uncovered edge
* and the panel's logical inset agree.
*/
/** The travel, in physical px, written on the row root during a drag. */
var SWIPE_TRAVEL_PROPERTY = "--_item-swipe-travel";
/** +1 when the inline end is to the right (LTR), -1 under RTL. */
var SWIPE_DIRECTION_PROPERTY = "--_item-swipe-dir";
/** The clock a settle runs on; `0s` while the finger drives the row. */
var SWIPE_DURATION_PROPERTY = "--_item-swipe-duration";
/** Travel before the axis is decided. */
var AXIS_LOCK_PX = 10;
/** The commit point: this far past the side's panel, or this fraction of the row, whichever is greater. */
var COMMIT_PAST_PANEL_PX = 48;
var COMMIT_FRACTION = .5;
/** Under `reveal`, a release this far into the panel rests the row open. */
var REST_FRACTION = .5;
/** Travel past the commit point moves the row this much per pixel of finger. */
var OVERSHOOT_RESISTANCE = .35;
/** A release at this speed commits from FLING_MIN_PX, short of the commit point. */
var FLING_VELOCITY_PX_PER_MS = .6;
var FLING_MIN_PX = 44;
/** How far past the row's edge a slide-out travels. */
var SLIDE_OUT_OVERSHOOT_PX = 24;
/** A click the browser synthesizes after a swipe is not a tap on the row. */
var CLICK_SUPPRESS_MS = 400;
var IDLE_STATE = {
	isArmed: false,
	phase: "idle",
	side: "leading"
};
/** The logical sign of a side: +1 toward the inline end, -1 toward the start. */
function signOf(side) {
	return side === "trailing" ? -1 : 1;
}
function now() {
	return typeof performance === "undefined" ? Date.now() : performance.now();
}
/**
* The first focusable thing in the row outside its swipe panels, for focus to
* land on when a resting panel closes under it.
*/
function focusRowContent(root) {
	const candidates = root.querySelectorAll("button, a[href], input, [tabindex]:not([tabindex=\"-1\"])");
	for (const el of candidates) if (el.closest("[data-swipe-panel]") == null) {
		el.focus();
		return;
	}
	if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
}
function useSwipeAction({ isEnabled, behavior, sides, measurePanel, fireOutermost, isReducedMotion = false, rootRef }) {
	const dragRef = (0, import_react.useRef)(null);
	const travelRef = (0, import_react.useRef)(0);
	const inlineSignRef = (0, import_react.useRef)(1);
	const suppressClickUntilRef = (0, import_react.useRef)(0);
	const settleTimerRef = (0, import_react.useRef)(null);
	const frameRef = (0, import_react.useRef)(null);
	const pendingRef = (0, import_react.useRef)(null);
	const [state, setState] = (0, import_react.useState)(IDLE_STATE);
	const stateRef = (0, import_react.useRef)(state);
	stateRef.current = state;
	const measurePanelRef = (0, import_react.useRef)(measurePanel);
	const fireOutermostRef = (0, import_react.useRef)(fireOutermost);
	const sidesRef = (0, import_react.useRef)(sides);
	const behaviorRef = (0, import_react.useRef)(behavior);
	const reducedMotionRef = (0, import_react.useRef)(isReducedMotion);
	(0, import_react.useEffect)(() => {
		measurePanelRef.current = measurePanel;
		fireOutermostRef.current = fireOutermost;
		sidesRef.current = sides;
		behaviorRef.current = behavior;
		reducedMotionRef.current = isReducedMotion;
	});
	(0, import_react.useEffect)(() => () => {
		if (settleTimerRef.current != null) clearTimeout(settleTimerRef.current);
		if (frameRef.current != null) cancelAnimationFrame(frameRef.current);
	}, []);
	/** Write the travel (physical px) the transforms read. */
	const writeTravel = (0, import_react.useCallback)((travel) => {
		const root = rootRef.current;
		if (!root) return;
		travelRef.current = travel;
		root.style.setProperty(SWIPE_TRAVEL_PROPERTY, `${travel}px`);
	}, [rootRef]);
	const writeDuration = (0, import_react.useCallback)((ms) => {
		const root = rootRef.current;
		if (!root) return;
		if (ms > 0) root.style.setProperty(SWIPE_DURATION_PROPERTY, `${ms}ms`);
		else root.style.setProperty(SWIPE_DURATION_PROPERTY, "0s");
	}, [rootRef]);
	const clearInlineProperties = (0, import_react.useCallback)(() => {
		const root = rootRef.current;
		if (!root) return;
		root.style.removeProperty(SWIPE_TRAVEL_PROPERTY);
		root.style.removeProperty(SWIPE_DIRECTION_PROPERTY);
		root.style.removeProperty(SWIPE_DURATION_PROPERTY);
		travelRef.current = 0;
	}, [rootRef]);
	const cancelPendingPaint = (0, import_react.useCallback)(() => {
		if (frameRef.current != null) cancelAnimationFrame(frameRef.current);
		frameRef.current = null;
		pendingRef.current = null;
	}, []);
	/** One write per frame while the finger drives the row. */
	const paintOnNextFrame = (0, import_react.useCallback)((travel) => {
		pendingRef.current = travel;
		if (frameRef.current != null) return;
		frameRef.current = requestAnimationFrame(() => {
			frameRef.current = null;
			const next = pendingRef.current;
			pendingRef.current = null;
			if (next != null) writeTravel(next);
		});
	}, [writeTravel]);
	/**
	* Move the row to `travel` on the settle clock, then land in `phase`. A
	* zero clock (reduced motion) lands at once.
	*/
	const settle = (0, import_react.useCallback)((side, travel, phase, afterSlide) => {
		cancelPendingPaint();
		const duration = reducedMotionRef.current ? 0 : 200;
		setState({
			isArmed: false,
			phase: "settling",
			side
		});
		writeDuration(duration);
		writeTravel(travel);
		if (settleTimerRef.current != null) clearTimeout(settleTimerRef.current);
		settleTimerRef.current = setTimeout(() => {
			settleTimerRef.current = null;
			writeDuration(0);
			if (afterSlide?.() === true) return;
			if (phase === "idle") clearInlineProperties();
			setState(phase === "idle" ? IDLE_STATE : {
				isArmed: false,
				phase,
				side
			});
		}, duration);
	}, [
		cancelPendingPaint,
		clearInlineProperties,
		writeDuration,
		writeTravel
	]);
	/**
	* The outermost entry fires. Under both models the row first travels to
	* its slide-out, fires, then holds out (`hasRemoval`) or springs back.
	*/
	const slideOutAndFire = (0, import_react.useCallback)((side, inlineSign) => {
		const width = rootRef.current?.clientWidth ?? 0;
		const out = signOf(side) * inlineSign * (width + SLIDE_OUT_OVERSHOOT_PX);
		settle(side, out, "held", () => {
			if (fireOutermostRef.current(side)) return false;
			settle(side, 0, "idle");
			return true;
		});
	}, [rootRef, settle]);
	const close = (0, import_react.useCallback)(() => {
		const current = stateRef.current;
		if (current.phase !== "resting") return;
		const root = rootRef.current;
		if (root != null && root.contains(document.activeElement)) focusRowContent(root);
		settle(current.side, 0, "idle");
	}, [rootRef, settle]);
	(0, import_react.useEffect)(() => {
		if (state.phase !== "resting") return;
		const onOutside = (event) => {
			const root = rootRef.current;
			if (root != null && event.target instanceof Node && !root.contains(event.target)) close();
		};
		document.addEventListener("pointerdown", onOutside, true);
		return () => {
			document.removeEventListener("pointerdown", onOutside, true);
		};
	}, [
		close,
		rootRef,
		state.phase
	]);
	(0, import_react.useEffect)(() => {
		const root = rootRef.current;
		if (root == null || !isEnabled) return;
		const onTouchMove = (event) => {
			if (dragRef.current?.claimed === true && event.cancelable) event.preventDefault();
		};
		root.addEventListener("touchmove", onTouchMove, { passive: false });
		return () => {
			root.removeEventListener("touchmove", onTouchMove);
		};
	}, [isEnabled, rootRef]);
	const activateEntry = (0, import_react.useCallback)((fire) => {
		const current = stateRef.current;
		if (current.phase !== "resting") return;
		const root = rootRef.current;
		if (root != null && root.contains(document.activeElement)) focusRowContent(root);
		if (fire()) {
			const width = root?.clientWidth ?? 0;
			const out = signOf(current.side) * inlineSignRef.current * (width + SLIDE_OUT_OVERSHOOT_PX);
			settle(current.side, out, "held");
		} else settle(current.side, 0, "idle");
	}, [rootRef, settle]);
	const onPointerDown = (0, import_react.useCallback)((event) => {
		const current = stateRef.current;
		if (!isEnabled || event.pointerType !== "touch" || dragRef.current != null || current.phase === "settling" || current.phase === "held") return;
		const root = rootRef.current;
		const inlineSign = isRtlElement(root) ? -1 : 1;
		inlineSignRef.current = inlineSign;
		const startTime = now();
		dragRef.current = {
			baseTravel: travelRef.current * inlineSign,
			claimed: null,
			commitPx: 0,
			inlineSign,
			lastTime: startTime,
			lastX: event.clientX,
			panelWidth: 0,
			pointerId: event.pointerId,
			prevTime: startTime,
			prevX: event.clientX,
			side: current.phase === "resting" ? current.side : "leading",
			startX: event.clientX,
			startY: event.clientY,
			travel: 0
		};
	}, [isEnabled, rootRef]);
	const onPointerMove = (0, import_react.useCallback)((event) => {
		const drag = dragRef.current;
		if (drag == null || drag.pointerId !== event.pointerId || drag.claimed === false) return;
		const deltaX = (event.clientX - drag.startX) * drag.inlineSign;
		const deltaY = event.clientY - drag.startY;
		if (drag.claimed === null) {
			if (Math.max(Math.abs(deltaX), Math.abs(deltaY)) < AXIS_LOCK_PX) return;
			if (Math.abs(deltaX) <= Math.abs(deltaY)) {
				drag.claimed = false;
				return;
			}
			const side = stateRef.current.phase === "resting" ? drag.side : deltaX > 0 ? "leading" : "trailing";
			if (!sidesRef.current[side]) {
				drag.claimed = false;
				return;
			}
			drag.claimed = true;
			drag.side = side;
			drag.panelWidth = measurePanelRef.current(side);
			const width = rootRef.current?.clientWidth ?? 0;
			drag.commitPx = Math.max(drag.panelWidth + COMMIT_PAST_PANEL_PX, width * COMMIT_FRACTION);
			if (rootRef.current != null) rootRef.current.style.setProperty(SWIPE_DIRECTION_PROPERTY, String(drag.inlineSign));
			writeDuration(0);
			setState({
				isArmed: false,
				phase: "dragging",
				side
			});
			try {
				rootRef.current?.setPointerCapture(event.pointerId);
			} catch {}
		}
		const sign = signOf(drag.side);
		const raw = Math.max(0, deltaX * sign + drag.baseTravel * sign);
		const offset = raw <= drag.commitPx ? raw : drag.commitPx + (raw - drag.commitPx) * OVERSHOOT_RESISTANCE;
		const isArmed = raw >= drag.commitPx;
		if (isArmed !== drag.travel >= drag.commitPx) setState({
			isArmed,
			phase: "dragging",
			side: drag.side
		});
		drag.travel = raw;
		drag.prevX = drag.lastX;
		drag.prevTime = drag.lastTime;
		drag.lastX = event.clientX;
		drag.lastTime = now();
		paintOnNextFrame(sign * drag.inlineSign * offset);
	}, [
		paintOnNextFrame,
		rootRef,
		writeDuration
	]);
	const endGesture = (0, import_react.useCallback)((event, cancelled) => {
		const drag = dragRef.current;
		if (drag == null || drag.pointerId !== event.pointerId) return;
		dragRef.current = null;
		if (drag.claimed !== true) return;
		suppressClickUntilRef.current = now() + CLICK_SUPPRESS_MS;
		try {
			rootRef.current?.releasePointerCapture(event.pointerId);
		} catch {}
		const { side, inlineSign } = drag;
		const restTravel = signOf(side) * inlineSign * drag.panelWidth;
		if (cancelled) {
			settle(side, 0, "idle");
			return;
		}
		const elapsed = Math.max(1, drag.lastTime - drag.prevTime);
		const flung = signOf(side) * inlineSign * (drag.lastX - drag.prevX) / elapsed >= FLING_VELOCITY_PX_PER_MS && drag.travel >= FLING_MIN_PX;
		if (drag.travel >= drag.commitPx || flung) {
			slideOutAndFire(side, inlineSign);
			return;
		}
		if (behaviorRef.current === "reveal" && drag.travel >= drag.panelWidth * REST_FRACTION) {
			settle(side, restTravel, "resting");
			return;
		}
		settle(side, 0, "idle");
	}, [
		rootRef,
		settle,
		slideOutAndFire
	]);
	const onPointerUp = (0, import_react.useCallback)((event) => endGesture(event, false), [endGesture]);
	const onPointerCancel = (0, import_react.useCallback)((event) => endGesture(event, true), [endGesture]);
	const shouldSuppressClick = (0, import_react.useCallback)(() => now() < suppressClickUntilRef.current, []);
	return {
		activateEntry,
		close,
		handlers: {
			onClickCapture: (0, import_react.useCallback)((event) => {
				if (!shouldSuppressClick() || event.target instanceof Element && event.target.closest("[data-swipe-panel]") != null) return;
				suppressClickUntilRef.current = 0;
				event.preventDefault();
				event.stopPropagation();
			}, [shouldSuppressClick]),
			onKeyDown: (0, import_react.useCallback)((event) => {
				if (event.key === "Escape" && stateRef.current.phase === "resting") {
					event.stopPropagation();
					close();
				}
			}, [close]),
			onPointerCancel,
			onPointerDown,
			onPointerMove,
			onPointerUp
		},
		shouldSuppressClick,
		state
	};
}
//#endregion
//#region node_modules/@astryxdesign/core/dist/Item/ItemSwipeLayer.js
/**
* @file ItemSwipeLayer.tsx
* @input The row root (by ref), the swipe entries per side, the behavior;
*   useSwipeAction, theme tokens
* @output Exports ItemSwipeLayer (default) — the panels of a row's swipe
*   actions and the gesture that uncovers them — and the ItemSwipeBridge type
*   through which the root reaches the gesture's handlers
* @position Internal to Item, reached only through a dynamic import from
*   Item.tsx when `swipeActions` is set, so a row without them never loads
*   the gesture. Tested through Item.test.tsx and Item.source-build.test.mjs.
*
* The row's root stays Item's: it carries the swipe root styles and forwards
* its pointer, click-capture and key events into the bridge this layer fills.
* This layer renders the two panels as out-of-flow children of that root and
* runs the gesture against it, so the DOM is the one Item rendered before the
* split — no element is added for the swipe (spec AST-057, FR2).
*/
/**
* What the root needs from the gesture: the handlers it forwards its events
* into, and the test for the click the browser synthesizes after a drag. The
* layer writes it on every render; the root reads it on every event.
*/
var ItemSwipeLayer_exports = /* @__PURE__ */ __exportAll({ default: () => ItemSwipeLayer });
var styles = {
	swipePanel: {
		kVAEAm: "x10l6tqk",
		k87sOh: "x13vifvy",
		krVfgx: "x1ey2m1c",
		kzqmXN: "xnalus7",
		k1xSpc: "x78zum5",
		kGNEyG: "x1qjc9v5",
		kB7OPa: "x9f619",
		kVQacm: "xb3r6kr",
		kaIpWk: "x1pjcqnp",
		k3aq6I: "x145au52",
		k1ekBW: "x13zkoj4",
		kIyJzY: "xxfakuu",
		kAMwcw: "xn34ekc",
		$$css: true
	},
	swipePanelLeading: {
		kLqNvP: "x1o0tod",
		kjj79g: "x1nhvcw1",
		kzqmXN: "x96shys",
		$$css: true
	},
	swipePanelTrailing: {
		kt4wiu: "xtijo5x",
		kjj79g: "x13a6bvl",
		kzqmXN: "x1qwjaml",
		$$css: true
	},
	swipeEntry: {
		k1xSpc: "x78zum5",
		kXwgrk: "xdt5ytf",
		kGNEyG: "x6s0dn4",
		kjj79g: "xl56j7k",
		kOIVth: "xzye2dw",
		k7Eaqz: "x187xtus",
		kZKoxP: "x5yr21d",
		kg3NbH: "xrrkdod",
		kB7OPa: "x9f619",
		kogj98: "x1ghz6dp",
		kMzoRj: "xc342km",
		ksu8eU: "xng3xce",
		kysU6D: "xjyslct",
		kkrTdU: "x1ypdohk x16khyan",
		kMv6JI: "x9ynric",
		kGuDYH: "x141an7d",
		k63SB2: "x1e4wzip",
		kLWn49: "x1ltkj2j",
		khDVqt: "xuxw1ft",
		$$css: true
	},
	swipeEntryDisabled: {
		kSiTet: "xbyyjgo",
		$$css: true
	}
};
var swipeVariantStyles = {
	neutral: {
		kWkggS: "x17x4s8c",
		kMwMTN: "x1tgivj0",
		$$css: true
	},
	accent: {
		kWkggS: "x1ewilqj",
		kMwMTN: "x17wrial",
		$$css: true
	},
	destructive: {
		kWkggS: "x1pjz0fi",
		kMwMTN: "x1m024r3",
		$$css: true
	}
};
/**
* The swipe half of an `Item` with `swipeActions`: both panels, rendered into
* the root Item owns, and the gesture that drives that root.
*/
function ItemSwipeLayer({ rootRef, onBridge, leading, trailing, behavior }) {
	const leadingEntriesRef = (0, import_react.useRef)(null);
	const trailingEntriesRef = (0, import_react.useRef)(null);
	const isReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
	const outermost = (side) => {
		const entries = side === "leading" ? leading : trailing;
		return entries[entries.length - 1];
	};
	const swipe = useSwipeAction({
		isEnabled: true,
		behavior,
		sides: {
			leading: leading.length > 0,
			trailing: trailing.length > 0
		},
		measurePanel: (side) => (side === "leading" ? leadingEntriesRef : trailingEntriesRef).current?.offsetWidth ?? 0,
		fireOutermost: (side) => {
			const entry = outermost(side);
			if (entry == null || entry.isDisabled === true) return false;
			entry.onActivate();
			return entry.hasRemoval === true;
		},
		isReducedMotion,
		rootRef
	});
	(0, import_react.useEffect)(() => {
		onBridge({
			handlers: swipe.handlers,
			shouldSuppressClick: swipe.shouldSuppressClick
		});
		return () => {
			onBridge(null);
		};
	});
	const isSwipeResting = swipe.state.phase === "resting";
	const renderSwipePanel = (side, entries) => {
		if (entries.length === 0) return null;
		const outer = entries[entries.length - 1];
		const isCommit = behavior === "commit";
		return /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
			"data-swipe-panel": side,
			inert: isSwipeResting && !isCommit ? void 0 : true,
			"aria-hidden": isCommit ? true : void 0,
			...mergeProps(themeProps("item-swipe-panel", { side }), props(styles.swipePanel, side === "leading" ? styles.swipePanelLeading : styles.swipePanelTrailing, swipeVariantStyles[outer.variant ?? "accent"])),
			children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
				ref: side === "leading" ? leadingEntriesRef : trailingEntriesRef,
				...{
					0: { className: "x78zum5 x2lah0s x5yr21d x10xzikg" },
					1: { className: "x78zum5 x2lah0s x5yr21d x10xzikg x15zctf7" }
				}[!!(side === "leading") << 0],
				children: entries.map((entry) => {
					const variant = entry.variant ?? "accent";
					const content = /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [entry.icon, /*#__PURE__*/ (0, import_jsx_runtime.jsx)("span", { children: entry.label })] });
					const entryStyle = props(styles.swipeEntry, swipeVariantStyles[variant], entry.isDisabled === true && styles.swipeEntryDisabled);
					if (isCommit) return /*#__PURE__*/ (0, import_jsx_runtime.jsx)("span", {
						...mergeProps(themeProps("item-swipe-action", { variant }), entryStyle),
						children: content
					}, entry.id ?? entry.label);
					return /*#__PURE__*/ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: entry.isDisabled === true,
						onClick: () => swipe.activateEntry(() => {
							entry.onActivate();
							return entry.hasRemoval === true;
						}),
						...mergeProps(themeProps("item-swipe-action", { variant }), focusOutlineProps.focusVisible(styles.swipeEntry, swipeVariantStyles[variant], entry.isDisabled === true && styles.swipeEntryDisabled)),
						children: content
					}, entry.id ?? entry.label);
				})
			})
		}, side);
	};
	return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [renderSwipePanel("leading", leading), renderSwipePanel("trailing", trailing)] });
}
ItemSwipeLayer.displayName = "ItemSwipeLayer";
//#endregion
export { require_react as C, require_jsx_runtime as S, Button as _, Switch as a, Theme as b, Banner as c, List as d, Avatar as f, AppShell as g, TopNav as h, IconButton as i, TextInput as l, VStack as m, Drawer as n, SideNavItem as o, Card as p, TextArea as r, SideNav as s, DrawerHeader as t, ListItem as u, Heading as v, require_react_dom as x, Text as y };
