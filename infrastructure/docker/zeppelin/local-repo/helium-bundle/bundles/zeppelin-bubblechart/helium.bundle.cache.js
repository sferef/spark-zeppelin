/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _bubblechart = __webpack_require__(1);

	var _bubblechart2 = _interopRequireDefault(_bubblechart);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	heliumBundles.push({
	  id: "zeppelin-bubblechart",
	  name: "zeppelin-bubblechart",
	  icon: "<svg viewBox='0 0 70 70'><circle cx='26' cy='28' stroke='black' style='stroke-width: 1px;' r='25' fill='seagreen'/><circle cx='42' cy='44' stroke='black' style='stroke-width: 1px;' r='20' fill='DodgerBlue'/><circle cx='54' cy='24' stroke='black' style='stroke-width: 1px;' r='15' fill='crimson'/></svg>",
	  type: "VISUALIZATION",
	  class: _bubblechart2.default
	});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _zeppelinVis = __webpack_require__(2);

	var _zeppelinVis2 = _interopRequireDefault(_zeppelinVis);

	var _columnselector = __webpack_require__(3);

	var _columnselector2 = _interopRequireDefault(_columnselector);

	var _bubble = __webpack_require__(5);

	var _bubble2 = _interopRequireDefault(_bubble);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Licensed to the Apache Software Foundation (ASF) under one or more
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * contributor license agreements.  See the NOTICE file distributed with
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * this work for additional information regarding copyright ownership.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * The ASF licenses this file to You under the Apache License, Version 2.0
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * (the "License"); you may not use this file except in compliance with
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * the License.  You may obtain a copy of the License at
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *    http://www.apache.org/licenses/LICENSE-2.0
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Unless required by applicable law or agreed to in writing, software
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * distributed under the License is distributed on an "AS IS" BASIS,
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * See the License for the specific language governing permissions and
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * limitations under the License.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	/**
	 * Base class for visualization
	 */
	var bubblechart = function (_Visualization) {
	  _inherits(bubblechart, _Visualization);

	  function bubblechart(targetEl, config) {
	    _classCallCheck(this, bubblechart);

	    var _this = _possibleConstructorReturn(this, (bubblechart.__proto__ || Object.getPrototypeOf(bubblechart)).call(this, targetEl, config));

	    _this.targetEl.append('<svg></svg>');

	    _this.columnselectorProps = [{
	      name: 'name'
	    }, {
	      name: 'value'
	    }, {
	      name: 'group'
	    }, {
	      name: 'color'
	    }];

	    _this.columnselector = new _columnselector2.default(config, _this.columnselectorProps);
	    return _this;
	  }

	  _createClass(bubblechart, [{
	    key: 'render',
	    value: function render(tabledata) {
	      var height = this.targetEl.height();
	      var width = this.targetEl.width();
	      console.log('bubble chart data', tabledata);
	      console.log('bubble chart config', this.config);
	      var colIdx = [];

	      for (var idx in tabledata.columns) {
	        var col = tabledata.columns[idx];
	        if (this.config.name && col.name == this.config.name.name) {
	          colIdx[0] = idx;
	        }
	        if (this.config.value && col.name == this.config.value.name) {
	          colIdx[1] = idx;
	        }
	        if (this.config.group && col.name == this.config.group.name) {
	          colIdx[2] = idx;
	        }
	        if (this.config.color && col.name == this.config.color.name) {
	          colIdx[3] = idx;
	        }
	      }

	      var bubbledata = [];
	      for (var rIdx in tabledata.rows) {
	        var row = tabledata.rows[rIdx];
	        var bubbleRow = [];
	        for (var idx in colIdx) {
	          bubbleRow[idx] = row[colIdx[idx]];
	        }
	        bubbledata.push(bubbleRow);
	      }

	      if (!angular.equals(bubbledata, this.bubbledata)) {
	        this.bubble = undefined;
	      }

	      this.bubbledata = bubbledata;

	      if (!this.bubble) {
	        this.bubble = new _bubble2.default(bubbledata, {
	          width: width,
	          height: height,
	          gravity: 0.12,
	          damper: 0.1,
	          friction: 0.9,
	          col: 3
	        });
	        this.bubble.display(this.targetEl);
	      }

	      if (this.config.mode == 'group') {
	        this.bubble.group();
	      } else {
	        this.bubble.all();
	      }
	    }
	  }, {
	    key: 'getTransformation',
	    value: function getTransformation() {
	      return this.columnselector;
	    }
	  }, {
	    key: 'getSetting',
	    value: function getSetting(chart) {
	      var self = this;
	      var configObj = self.config;

	      return {
	        template: '<div class="btn-group">\n        <button type="button"\n                class="btn btn-default"\n                ng-click="all()"\n                ng-class="{\'active\': !config.mode || config.mode == \'all\'}">All</button>\n        <button type="button"\n                class="btn btn-default"\n                ng-click="group()"\n                ng-class="{\'active\': config.mode == \'group\'}">Group</button>\n      </div>',
	        scope: {
	          config: configObj,
	          all: function all() {
	            configObj.mode = 'all';
	            self.emitConfig(configObj);
	          },
	          group: function group() {
	            configObj.mode = 'group';
	            self.emitConfig(configObj);
	          }
	        }
	      };
	    }
	  }]);

	  return bubblechart;
	}(_zeppelinVis2.default);

	exports.default = bubblechart;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/*
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	/**
	 * Base class for visualization.
	 */
	var Visualization = function () {
	  function Visualization(targetEl, config) {
	    _classCallCheck(this, Visualization);

	    this.targetEl = targetEl;
	    this.config = config;
	    this._dirty = false;
	    this._active = false;
	    this._emitter = function () {};
	  }

	  /**
	   * Get transformation.
	   * @abstract
	   * @return {Transformation}
	   */


	  _createClass(Visualization, [{
	    key: 'getTransformation',
	    value: function getTransformation() {
	      // override this
	      throw new TypeError('Visualization.getTransformation() should be overrided');
	    }

	    /**
	     * Method will be invoked when data or configuration changed.
	     * @abstract
	     */

	  }, {
	    key: 'render',
	    value: function render(tableData) {
	      // override this
	      throw new TypeError('Visualization.render() should be overrided');
	    }

	    /**
	     * Refresh visualization.
	     */

	  }, {
	    key: 'refresh',
	    value: function refresh() {
	      // override this
	      console.warn('A chart is missing refresh function, it might not work preperly');
	    }

	    /**
	     * Method will be invoked when visualization need to be destroyed.
	     * Don't need to destroy this.targetEl.
	     */

	  }, {
	    key: 'destroy',
	    value: function destroy() {}
	    // override this


	    /**
	     * return {
	     *   template : angular template string or url (url should end with .html),
	     *   scope : an object to bind to template scope
	     * }
	     */

	  }, {
	    key: 'getSetting',
	    value: function getSetting() {}
	    // override this


	    /**
	     * Activate. Invoked when visualization is selected.
	     */

	  }, {
	    key: 'activate',
	    value: function activate() {
	      if (!this._active || this._dirty) {
	        this.refresh();
	        this._dirty = false;
	      }
	      this._active = true;
	    }

	    /**
	     * Deactivate. Invoked when visualization is de selected.
	     */

	  }, {
	    key: 'deactivate',
	    value: function deactivate() {
	      this._active = false;
	    }

	    /**
	     * Is active.
	     */

	  }, {
	    key: 'isActive',
	    value: function isActive() {
	      return this._active;
	    }

	    /**
	     * When window or paragraph is resized.
	     */

	  }, {
	    key: 'resize',
	    value: function resize() {
	      if (this.isActive()) {
	        this.refresh();
	      } else {
	        this._dirty = true;
	      }
	    }

	    /**
	     * Set new config.
	     */

	  }, {
	    key: 'setConfig',
	    value: function setConfig(config) {
	      this.config = config;
	      if (this.isActive()) {
	        this.refresh();
	      } else {
	        this._dirty = true;
	      }
	    }

	    /**
	     * Emit config. config will sent to server and saved.
	     */

	  }, {
	    key: 'emitConfig',
	    value: function emitConfig(config) {
	      this._emitter(config);
	    }

	    /**
	     * Render setting.
	     */

	  }, {
	    key: 'renderSetting',
	    value: function renderSetting(targetEl) {
	      var _this = this;

	      var setting = this.getSetting();
	      if (!setting) {
	        return;
	      }

	      // already readered
	      if (this._scope) {
	        var self = this;
	        this._scope.$apply(function () {
	          for (var k in setting.scope) {
	            if (setting.scope.hasOwnProperty(k)) {
	              self._scope[k] = setting.scope[k];
	            }
	          }

	          for (var _k in self._prevSettingScope) {
	            if (!setting.scope[_k]) {
	              self._scope[_k] = setting.scope[_k];
	            }
	          }
	        });
	        return;
	      } else {
	        this._prevSettingScope = setting.scope;
	      }

	      var scope = this._createNewScope();
	      for (var k in setting.scope) {
	        if (setting.scope.hasOwnProperty(k)) {
	          scope[k] = setting.scope[k];
	        }
	      }
	      var template = setting.template;

	      if (template.split('\n').length === 1 && template.endsWith('.html')) {
	        // template is url
	        this._templateRequest(template).then(function (t) {
	          return _renderSetting(_this, targetEl, t, scope);
	        });
	      } else {
	        _renderSetting(this, targetEl, template, scope);
	      }
	    }
	  }]);

	  return Visualization;
	}();

	exports.default = Visualization;


	function _renderSetting(instance, targetEl, template, scope) {
	  instance._targetEl = targetEl;
	  targetEl.html(template);
	  instance._compile(targetEl.contents())(scope);
	  instance._scope = scope;
	}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _transformation = __webpack_require__(4);

	var _transformation2 = _interopRequireDefault(_transformation);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Licensed under the Apache License, Version 2.0 (the "License");
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * you may not use this file except in compliance with the License.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * You may obtain a copy of the License at
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *     http://www.apache.org/licenses/LICENSE-2.0
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Unless required by applicable law or agreed to in writing, software
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * distributed under the License is distributed on an "AS IS" BASIS,
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * See the License for the specific language governing permissions and
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * limitations under the License.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	/**
	 * select columns
	 * - columnSelectorProp
	 *   [
	 *     {
	 *       "name":
	 *       "tooltip":
	 *     },
	 *     ...
	 *   ]
	 */
	var ColumnselectorTransformation = function (_Transformation) {
	  _inherits(ColumnselectorTransformation, _Transformation);

	  function ColumnselectorTransformation(config, columnSelectorProp) {
	    _classCallCheck(this, ColumnselectorTransformation);

	    var _this = _possibleConstructorReturn(this, (ColumnselectorTransformation.__proto__ || Object.getPrototypeOf(ColumnselectorTransformation)).call(this, config));

	    _this.props = columnSelectorProp;
	    return _this;
	  }

	  _createClass(ColumnselectorTransformation, [{
	    key: 'getSetting',
	    value: function getSetting() {
	      var self = this;
	      var configObj = self.config;
	      return {
	        template: 'app/tabledata/columnselector_settings.html',
	        scope: {
	          config: self.config,
	          props: self.props,
	          tableDataColumns: self.tableDataColumns,
	          save: function save() {
	            self.emitConfig(configObj);
	          },
	          remove: function remove(selectorName) {
	            configObj[selectorName] = null;
	            self.emitConfig(configObj);
	          }
	        }
	      };
	    }

	    /**
	     * Method will be invoked when tableData or config changes
	     */

	  }, {
	    key: 'transform',
	    value: function transform(tableData) {
	      this.tableDataColumns = tableData.columns;
	      this.removeUnknown();
	      return tableData;
	    }
	  }, {
	    key: 'removeUnknown',
	    value: function removeUnknown() {
	      var fields = this.config;
	      for (var f in fields) {
	        if (fields[f]) {
	          var found = false;
	          for (var i = 0; i < this.tableDataColumns.length; i++) {
	            var a = fields[f];
	            var b = this.tableDataColumns[i];
	            if (a.index === b.index && a.name === b.name) {
	              found = true;
	              break;
	            }
	          }
	          if (!found && fields[f] instanceof Object && !(fields[f] instanceof Array)) {
	            fields[f] = null;
	          }
	        }
	      }
	    }
	  }]);

	  return ColumnselectorTransformation;
	}(_transformation2.default);

	exports.default = ColumnselectorTransformation;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/*
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	/**
	 * Base class for visualization
	 */
	var Transformation = function () {
	  function Transformation(config) {
	    _classCallCheck(this, Transformation);

	    this.config = config;
	    this._emitter = function () {};
	  }

	  /**
	   * return {
	   *   template : angular template string or url (url should end with .html),
	   *   scope : an object to bind to template scope
	   * }
	   */


	  _createClass(Transformation, [{
	    key: 'getSetting',
	    value: function getSetting() {}
	    // override this


	    /**
	     * Method will be invoked when tableData or config changes
	     */

	  }, {
	    key: 'transform',
	    value: function transform(tableData) {}
	    // override this


	    /**
	     * render setting
	     */

	  }, {
	    key: 'renderSetting',
	    value: function renderSetting(targetEl) {
	      var setting = this.getSetting();
	      if (!setting) {
	        return;
	      }

	      // already readered
	      if (this._scope) {
	        var self = this;
	        this._scope.$apply(function () {
	          for (var k in setting.scope) {
	            if (setting.scope.hasOwnProperty(k)) {
	              self._scope[k] = setting.scope[k];
	            }
	          }

	          for (var _k in self._prevSettingScope) {
	            if (!setting.scope[_k]) {
	              self._scope[_k] = setting.scope[_k];
	            }
	          }
	        });
	        return;
	      } else {
	        this._prevSettingScope = setting.scope;
	      }

	      var scope = this._createNewScope();
	      for (var k in setting.scope) {
	        if (setting.scope.hasOwnProperty(k)) {
	          scope[k] = setting.scope[k];
	        }
	      }
	      var template = setting.template;

	      if (template.split('\n').length === 1 && template.endsWith('.html')) {
	        // template is url
	        var _self = this;
	        this._templateRequest(template).then(function (t) {
	          _self._render(targetEl, t, scope);
	        });
	      } else {
	        this._render(targetEl, template, scope);
	      }
	    }
	  }, {
	    key: '_render',
	    value: function _render(targetEl, template, scope) {
	      this._targetEl = targetEl;
	      targetEl.html(template);
	      this._compile(targetEl.contents())(scope);
	      this._scope = scope;
	    }
	  }, {
	    key: 'setConfig',
	    value: function setConfig(config) {
	      this.config = config;
	    }

	    /**
	     * Emit config. config will sent to server and saved.
	     */

	  }, {
	    key: 'emitConfig',
	    value: function emitConfig(config) {
	      this._emitter(config);
	    }
	  }]);

	  return Transformation;
	}();

	exports.default = Transformation;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Bubble;

	var _CustomTooltip = __webpack_require__(6);

	var _CustomTooltip2 = _interopRequireDefault(_CustomTooltip);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function Bubble(data, config) {
	  this.data = data;
	  this.config = config; //  { width:600, height:600, gravity:0.12, damper : 0.1, friction: 0.9, col : 3 }

	  this.init = function (data) {
	    this.dataIndex = {
	      name: 0,
	      value: 1,
	      group: 2,
	      color: 3
	    };
	    this.maxValue = 0;
	    this.groups = {};

	    for (var i = 0; i < this.data.length; i++) {
	      var d = this.data[i];
	      this.maxValue = Math.max(this.maxValue, parseInt(d[this.dataIndex.value]));
	      if (this.groups[d[this.dataIndex.group]] == undefined) {
	        this.groups[d[this.dataIndex.group]] = 0;
	      }
	      this.groups[d[this.dataIndex.group]]++;
	    }

	    // create nodes
	    var nodes = [];
	    for (var i = 0; i < data.length; i++) {
	      var d = data[i];
	      nodes.push({
	        id: i,
	        radius: d.length > this.dataIndex.value ? this.getRadius(d[this.dataIndex.value]) : 10,
	        group: d.length > this.dataIndex.group ? d[this.dataIndex.group] : "",
	        color: d.length > this.dataIndex.color ? d[this.dataIndex.color] : "",
	        x: Math.random() * this.config.width,
	        y: Math.random() * this.config.height,
	        value: d.length > this.dataIndex.value ? this.getRadius(d[this.dataIndex.value]) : 0
	      });
	    }
	    this.nodes = nodes;
	  };

	  this.getRadius = function (n) {
	    var area = this.config.width * this.config.height;
	    var areaForOne = area / this.data.length;
	    var minSize = 2;
	    var maxSize = Math.max(minSize, Math.sqrt(areaForOne) / 1.2);
	    var maxSize = Math.min(maxSize, this.config.width / 10);
	    var r = d3.scale.pow().exponent(0.5).domain([0, this.maxValue]).range([minSize, maxSize]);
	    return Math.abs(r(n));
	  };

	  this.display = function (target) {
	    // create svg
	    var vis = d3.select('#' + target[0].id + ' svg').attr("width", config.width).attr("height", config.height);
	    this.vis = vis;

	    // create circles
	    var circles = vis.selectAll("circle").data(this.nodes);
	    var fillColor = this.fillColor;
	    var tooltip = this.tooltip;
	    circles.enter().append("circle").attr("r", 0).attr("fill", function (d) {
	      return fillColor(d.color);
	    }).attr("stroke", function (d) {
	      return d3.rgb(fillColor(d.color)).darker();
	    }).on("mouseover", function (d, i) {
	      var element = this;
	      d3.select(element).attr("storke", "black");
	      var content = '<span class="name">Value : ' + d.value + '</span>';
	      tooltip.showTooltip(content, d3.event);
	    }).on("mouseout", function (d, i) {
	      var element = this;
	      d3.select(element).attr("stroke", function (d) {
	        return d3.rgb(fillColor(d.color)).darker();
	      });
	      tooltip.hideTooltip();
	    });

	    var o = this;
	    circles.transition().duration(1500).attr("r", function (d) {
	      return d.radius;
	    });
	    this.circles = circles;

	    // starts up the force layout
	    this.force = d3.layout.force().nodes(this.nodes).size([this.config.width, this.config.height]);
	  };

	  this.all = function () {
	    var center = { x: this.config.width / 2, y: this.config.height / 2 };
	    var damper = this.config.damper;
	    var circles = this.circles;

	    this.force.gravity(this.config.gravity).charge(function (d) {
	      return -Math.pow(d.radius, 2.0) / 8;
	    }).friction(this.config.friction).on("tick", function (e) {
	      var alpha = e.alpha;
	      circles.attr("cx", function (d) {
	        return d.x + (center.x - d.x) * damper * alpha;
	      });
	      circles.attr("cy", function (d) {
	        return d.y + (center.y - d.y) * damper * alpha;
	      });
	    });
	    this.force.start();
	    this.vis.selectAll(".groups").remove();
	  };

	  this.group = function () {
	    var config = this.config;
	    var circles = this.circles;
	    var damper = this.config.damper;
	    var groups = this.groups;
	    var groupCenter = {};
	    var i = 0;
	    var numGroup = Object.keys(groups).length;
	    var numCol = numGroup > this.config.col ? this.config.col : numGroup;
	    var numRow = parseInt(numGroup / numCol) + 1;
	    numCol = Math.max(1, numCol);
	    numRow = Math.max(1, numRow);

	    console.log('col %o, row %o', numCol, numRow);

	    for (var k in groups) {
	      var len = Object.keys(groups).length;
	      groupCenter[k] = {
	        x: i % numCol * (this.config.width / numCol) + this.config.width / numCol / 2,
	        y: parseInt(i / numCol) * (this.config.width / numRow) + this.config.width / numRow / 2
	      };
	      console.log('group center[%o] =  %o, %o', k, groupCenter[k].x, groupCenter[k].y);
	      i++;
	    }

	    var groupTitle = this.vis.selectAll(".groups").data(Object.keys(groups));

	    groupTitle.enter().append("text").attr("class", "groups").attr("x", function (d) {
	      return groupCenter[d].x;
	    }).attr("y", function (d) {
	      return groupCenter[d].y - config.width / numRow / 2 + 10;
	    }).attr("text-anchor", "middle").text(function (d) {
	      return d;
	    });

	    this.force.gravity(this.config.gravity).charge(function (d) {
	      return -Math.pow(d.radius, 2.0) / 8;
	    }).friction(this.config.friction).on("tick", function (e) {
	      var alpha = e.alpha;
	      circles.each(function (alpha) {
	        return function (d) {
	          d.x = d.x + (groupCenter[d.group].x - d.x) * damper * alpha * 1.1;
	          d.y = d.y + (groupCenter[d.group].y - d.y) * damper * alpha * 1.1;
	        };
	      }(e.alpha)).attr("cx", function (d) {
	        return d.x;
	      }).attr("cy", function (d) {
	        return d.y;
	      });
	    });
	    this.force.start();
	  };

	  this.fillColor = d3.scale.ordinal().domain(["high", "medium", "low"]).range(["#7aa25c", "#beccae", "#d84b2a"]);

	  this.tooltip = (0, _CustomTooltip2.default)("bubble_tooltip", 240);

	  this.init(this.data);
	}

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = CustomTooltip;
	function CustomTooltip(tooltipId, width) {
	  var tooltipId = tooltipId;
	  $("body").append("<div class='tooltip' id='" + tooltipId + "'></div>");

	  if (width) {
	    $("#" + tooltipId).css("width", width);
	  }

	  hideTooltip();

	  function showTooltip(content, event) {
	    $("#" + tooltipId).html(content);
	    $("#" + tooltipId).show();

	    updatePosition(event);
	  }

	  function hideTooltip() {
	    $("#" + tooltipId).hide();
	  }

	  function updatePosition(event) {
	    var ttid = "#" + tooltipId;
	    var xOffset = 20;
	    var yOffset = 10;

	    var ttw = $(ttid).width();
	    var tth = $(ttid).height();

	    var wscrY = $(window).scrollTop();
	    var wscrX = $(window).scrollLeft();

	    var curX = document.all ? event.clientX + wscrX : event.pageX;
	    var curY = document.all ? event.clientY + wscrY : event.pageY;
	    var ttleft = curX - wscrX + xOffset * 2 + ttw > $(window).width() ? curX - ttw - xOffset * 2 : curX + xOffset;
	    if (ttleft < wscrX + xOffset) {
	      ttleft = wscrX + xOffset;
	    }
	    var tttop = curY - wscrY + yOffset * 2 + tth > $(window).height() ? curY - tth - yOffset * 2 : curY + yOffset;
	    if (tttop < wscrY + yOffset) {
	      tttop = curY + yOffset;
	    }
	    $(ttid).css('top', tttop + 'px').css('left', ttleft + 'px');
	  }

	  return {
	    showTooltip: showTooltip,
	    hideTooltip: hideTooltip,
	    updatePosition: updatePosition
	  };
	}

/***/ })
/******/ ]);