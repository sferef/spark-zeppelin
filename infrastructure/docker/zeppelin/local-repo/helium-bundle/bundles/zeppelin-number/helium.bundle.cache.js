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

	var _index = __webpack_require__(1);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	heliumBundles.push({
	  id: "zeppelin-number",
	  name: "zeppelin-number",
	  icon: "<i style='margin-left: -5px;'>123</i>",
	  type: "VISUALIZATION",
	  class: _index2.default
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

	var _advancedTransformation = __webpack_require__(3);

	var _advancedTransformation2 = _interopRequireDefault(_advancedTransformation);

	var _simple = __webpack_require__(6);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ZeppelinNumber = function (_Visualization) {
	  _inherits(ZeppelinNumber, _Visualization);

	  function ZeppelinNumber(targetEl, config) {
	    _classCallCheck(this, ZeppelinNumber);

	    var _this = _possibleConstructorReturn(this, (ZeppelinNumber.__proto__ || Object.getPrototypeOf(ZeppelinNumber)).call(this, targetEl, config));

	    var spec = {
	      charts: {
	        'simple': {
	          transform: { method: 'raw' },
	          sharedAxis: false,
	          axis: {
	            'main title': { dimension: 'single', axisType: 'key' },
	            'secondary title': { dimension: 'single', axisType: 'aggregator' }
	          },
	          parameter: {
	            'fontColor': { valueType: 'string', defaultValue: 'black', description: 'font color' },
	            'fontSize': { widget: 'option', valueType: 'string', defaultValue: 'medium', description: 'font size', optionValues: ['small', 'medium', 'large'] },
	            'alignment': { widget: 'option', valueType: 'string', defaultValue: 'center', description: 'alignment', optionValues: ['left', 'right', 'center'] },
	            'iconName': { valueType: 'string', defaultValue: '', description: 'font awesome icon name. Ex: users' },
	            'showTitle': { widget: 'checkbox', valueType: 'boolean', defaultValue: true, description: 'show title' },
	            'prefix': { valueType: 'string', defaultValue: '', description: 'prefix' },
	            'suffix': { valueType: 'string', defaultValue: '', description: 'suffix' }
	          }
	        }
	      }
	    };
	    _this.transformation = new _advancedTransformation2.default(config, spec);
	    return _this;
	  }

	  _createClass(ZeppelinNumber, [{
	    key: 'render',
	    value: function render(data) {
	      var chartChanged = data.chartChanged,
	          parameterChanged = data.parameterChanged,
	          chart = data.chart,
	          parameter = data.parameter,
	          column = data.column,
	          transformer = data.transformer;


	      var rows = transformer();

	      var content = '';
	      try {
	        if (chart === 'simple') {
	          content = (0, _simple.renderSimpleCard)(rows, column, parameter);
	        }
	      } catch (error) {
	        console.error(error);
	      }

	      this.targetEl.html(content);
	    }
	  }, {
	    key: 'getTransformation',
	    value: function getTransformation() {
	      return this.transformation;
	    }
	  }]);

	  return ZeppelinNumber;
	}(_zeppelinVis2.default);

	exports.default = ZeppelinNumber;

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

	var _advancedTransformationUtil = __webpack_require__(5);

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

	var SETTING_TEMPLATE = 'app/tabledata/advanced-transformation-setting.html';

	var AdvancedTransformation = function (_Transformation) {
	  _inherits(AdvancedTransformation, _Transformation);

	  function AdvancedTransformation(config, spec) {
	    _classCallCheck(this, AdvancedTransformation);

	    var _this = _possibleConstructorReturn(this, (AdvancedTransformation.__proto__ || Object.getPrototypeOf(AdvancedTransformation)).call(this, config));

	    _this.columns = []; /** [{ name, index, comment }] */
	    _this.props = {};
	    _this.spec = spec;

	    (0, _advancedTransformationUtil.initializeConfig)(config, spec);
	    return _this;
	  }

	  _createClass(AdvancedTransformation, [{
	    key: 'emitConfigChange',
	    value: function emitConfigChange(conf) {
	      conf.chartChanged = false;
	      conf.parameterChanged = false;
	      this.emitConfig(conf);
	    }
	  }, {
	    key: 'emitChartChange',
	    value: function emitChartChange(conf) {
	      conf.chartChanged = true;
	      conf.parameterChanged = false;
	      this.emitConfig(conf);
	    }
	  }, {
	    key: 'emitParameterChange',
	    value: function emitParameterChange(conf) {
	      conf.chartChanged = false;
	      conf.parameterChanged = true;
	      this.emitConfig(conf);
	    }
	  }, {
	    key: 'getSetting',
	    value: function getSetting() {
	      var self = this; /** for closure */
	      var configInstance = self.config; /** for closure */

	      if (self.spec.initialized) {
	        self.spec.initialized = false;
	        self.emitConfig(configInstance);
	      }

	      return {
	        template: SETTING_TEMPLATE,
	        scope: {
	          config: configInstance,
	          columns: self.columns,
	          resetAxisConfig: function resetAxisConfig() {
	            (0, _advancedTransformationUtil.resetAxisConfig)(configInstance);
	            self.emitChartChange(configInstance);
	          },

	          resetParameterConfig: function resetParameterConfig() {
	            (0, _advancedTransformationUtil.resetParameterConfig)(configInstance);
	            self.emitParameterChange(configInstance);
	          },

	          toggleColumnPanel: function toggleColumnPanel() {
	            configInstance.panel.columnPanelOpened = !configInstance.panel.columnPanelOpened;
	            self.emitConfigChange(configInstance);
	          },

	          toggleParameterPanel: function toggleParameterPanel() {
	            configInstance.panel.parameterPanelOpened = !configInstance.panel.parameterPanelOpened;
	            self.emitConfigChange(configInstance);
	          },

	          getAxisAnnotation: function getAxisAnnotation(axisSpec) {
	            var anno = '' + axisSpec.name;
	            if (axisSpec.valueType) {
	              anno = anno + ' (' + axisSpec.valueType + ')';
	            }

	            return anno;
	          },

	          getAxisTypeAnnotation: function getAxisTypeAnnotation(axisSpec) {
	            var anno = '';

	            var minAxisCount = axisSpec.minAxisCount;
	            var maxAxisCount = axisSpec.maxAxisCount;

	            if ((0, _advancedTransformationUtil.isSingleDimensionAxis)(axisSpec)) {
	              maxAxisCount = 1;
	            }

	            var comment = '';
	            if (minAxisCount) {
	              comment = 'min: ' + minAxisCount;
	            }
	            if (minAxisCount && maxAxisCount) {
	              comment = comment + ', ';
	            }
	            if (maxAxisCount) {
	              comment = comment + 'max: ' + maxAxisCount;
	            }

	            if (comment !== '') {
	              anno = anno + ' (' + comment + ')';
	            }

	            return anno;
	          },

	          getAxisAnnotationColor: function getAxisAnnotationColor(axisSpec) {
	            if ((0, _advancedTransformationUtil.isAggregatorAxis)(axisSpec)) {
	              return { 'background-color': '#5782bd' };
	            } else if ((0, _advancedTransformationUtil.isGroupAxis)(axisSpec)) {
	              return { 'background-color': '#cd5c5c' };
	            } else if ((0, _advancedTransformationUtil.isKeyAxis)(axisSpec)) {
	              return { 'background-color': '#906ebd' };
	            } else {
	              return { 'background-color': '#62bda9' };
	            }
	          },

	          useSharedAxis: function useSharedAxis(chartName) {
	            return (0, _advancedTransformationUtil.useSharedAxis)(configInstance, chartName);
	          },
	          isGroupAxis: function isGroupAxis(axisSpec) {
	            return (0, _advancedTransformationUtil.isGroupAxis)(axisSpec);
	          },
	          isKeyAxis: function isKeyAxis(axisSpec) {
	            return (0, _advancedTransformationUtil.isKeyAxis)(axisSpec);
	          },
	          isAggregatorAxis: function isAggregatorAxis(axisSpec) {
	            return (0, _advancedTransformationUtil.isAggregatorAxis)(axisSpec);
	          },
	          isSingleDimensionAxis: function isSingleDimensionAxis(axisSpec) {
	            return (0, _advancedTransformationUtil.isSingleDimensionAxis)(axisSpec);
	          },
	          getSingleDimensionAxis: function getSingleDimensionAxis(axisSpec) {
	            return (0, _advancedTransformationUtil.getCurrentChartAxis)(configInstance)[axisSpec.name];
	          },

	          chartChanged: function chartChanged(selected) {
	            configInstance.chart.current = selected;
	            self.emitChartChange(configInstance);
	          },

	          axisChanged: function axisChanged(e, ui, axisSpec) {
	            (0, _advancedTransformationUtil.removeDuplicatedColumnsInMultiDimensionAxis)(configInstance, axisSpec);
	            (0, _advancedTransformationUtil.applyMaxAxisCount)(configInstance, axisSpec);

	            self.emitChartChange(configInstance);
	          },

	          aggregatorChanged: function aggregatorChanged(colIndex, axisSpec, aggregator) {
	            if ((0, _advancedTransformationUtil.isSingleDimensionAxis)(axisSpec)) {
	              (0, _advancedTransformationUtil.getCurrentChartAxis)(configInstance)[axisSpec.name].aggr = aggregator;
	            } else {
	              (0, _advancedTransformationUtil.getCurrentChartAxis)(configInstance)[axisSpec.name][colIndex].aggr = aggregator;
	              (0, _advancedTransformationUtil.removeDuplicatedColumnsInMultiDimensionAxis)(configInstance, axisSpec);
	            }

	            self.emitChartChange(configInstance);
	          },

	          removeFromAxis: function removeFromAxis(colIndex, axisSpec) {
	            if ((0, _advancedTransformationUtil.isSingleDimensionAxis)(axisSpec)) {
	              (0, _advancedTransformationUtil.getCurrentChartAxis)(configInstance)[axisSpec.name] = null;
	            } else {
	              (0, _advancedTransformationUtil.getCurrentChartAxis)(configInstance)[axisSpec.name].splice(colIndex, 1);
	            }

	            self.emitChartChange(configInstance);
	          },

	          isInputWidget: function isInputWidget(paramSpec) {
	            return (0, _advancedTransformationUtil.isInputWidget)(paramSpec);
	          },
	          isCheckboxWidget: function isCheckboxWidget(paramSpec) {
	            return (0, _advancedTransformationUtil.isCheckboxWidget)(paramSpec);
	          },
	          isOptionWidget: function isOptionWidget(paramSpec) {
	            return (0, _advancedTransformationUtil.isOptionWidget)(paramSpec);
	          },
	          isTextareaWidget: function isTextareaWidget(paramSpec) {
	            return (0, _advancedTransformationUtil.isTextareaWidget)(paramSpec);
	          },

	          parameterChanged: function parameterChanged(paramSpec) {
	            configInstance.chartChanged = false;
	            configInstance.parameterChanged = true;
	            self.emitParameterChange(configInstance);
	          },

	          parameterOnKeyDown: function parameterOnKeyDown(event, paramSpec) {
	            var code = event.keyCode || event.which;
	            if (code === 13 && (0, _advancedTransformationUtil.isInputWidget)(paramSpec)) {
	              self.emitParameterChange(configInstance);
	            } else if (code === 13 && event.shiftKey && (0, _advancedTransformationUtil.isTextareaWidget)(paramSpec)) {
	              self.emitParameterChange(configInstance);
	            }

	            event.stopPropagation(); /** avoid to conflict with paragraph shortcuts */
	          }

	        }
	      };
	    }
	  }, {
	    key: 'transform',
	    value: function transform(tableData) {
	      this.columns = tableData.columns; /** used in `getSetting` */
	      /** initialize in `transform` instead of `getSetting` because this method is called before */
	      (0, _advancedTransformationUtil.serializeSharedAxes)(this.config);

	      var conf = this.config;
	      var chart = (0, _advancedTransformationUtil.getCurrentChart)(conf);
	      var axis = (0, _advancedTransformationUtil.getCurrentChartAxis)(conf);
	      var axisSpecs = (0, _advancedTransformationUtil.getCurrentChartAxisSpecs)(conf);
	      var param = (0, _advancedTransformationUtil.getCurrentChartParam)(conf);
	      var paramSpecs = (0, _advancedTransformationUtil.getCurrentChartParamSpecs)(conf);
	      var parsedParam = (0, _advancedTransformationUtil.parseParameter)(paramSpecs, param);

	      var _getTransformer = (0, _advancedTransformationUtil.getTransformer)(conf, tableData.rows, axisSpecs, axis),
	          transformer = _getTransformer.transformer,
	          column = _getTransformer.column;

	      return {
	        chartChanged: conf.chartChanged,
	        parameterChanged: conf.parameterChanged,

	        chart: chart, /** current chart */
	        axis: axis, /** persisted axis */
	        parameter: parsedParam, /** persisted parameter */
	        column: column,

	        transformer: transformer
	      };
	    }
	  }]);

	  return AdvancedTransformation;
	}(_transformation2.default);

	exports.default = AdvancedTransformation;

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
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	exports.getCurrentChart = getCurrentChart;
	exports.getCurrentChartTransform = getCurrentChartTransform;
	exports.getCurrentChartAxis = getCurrentChartAxis;
	exports.getCurrentChartParam = getCurrentChartParam;
	exports.getCurrentChartAxisSpecs = getCurrentChartAxisSpecs;
	exports.getCurrentChartParamSpecs = getCurrentChartParamSpecs;
	exports.useSharedAxis = useSharedAxis;
	exports.serializeSharedAxes = serializeSharedAxes;
	exports.isInputWidget = isInputWidget;
	exports.isOptionWidget = isOptionWidget;
	exports.isCheckboxWidget = isCheckboxWidget;
	exports.isTextareaWidget = isTextareaWidget;
	exports.parseParameter = parseParameter;
	exports.isAggregatorAxis = isAggregatorAxis;
	exports.isGroupAxis = isGroupAxis;
	exports.isKeyAxis = isKeyAxis;
	exports.isSingleDimensionAxis = isSingleDimensionAxis;
	exports.getSpecs = getSpecs;
	exports.getAvailableChartNames = getAvailableChartNames;
	exports.applyMaxAxisCount = applyMaxAxisCount;
	exports.removeDuplicatedColumnsInMultiDimensionAxis = removeDuplicatedColumnsInMultiDimensionAxis;
	exports.clearAxisConfig = clearAxisConfig;
	exports.initAxisConfig = initAxisConfig;
	exports.resetAxisConfig = resetAxisConfig;
	exports.clearParameterConfig = clearParameterConfig;
	exports.initParameterConfig = initParameterConfig;
	exports.resetParameterConfig = resetParameterConfig;
	exports.getSpecVersion = getSpecVersion;
	exports.initializeConfig = initializeConfig;
	exports.getColumnsForMultipleAxes = getColumnsForMultipleAxes;
	exports.getColumnsFromAxis = getColumnsFromAxis;
	exports.getTransformer = getTransformer;
	exports.getKGACube = getKGACube;
	exports.getKAGCube = getKAGCube;
	exports.getKKGACube = getKKGACube;
	exports.getSelectorName = getSelectorName;
	exports.getCubeValue = getCubeValue;
	exports.getNameWithIndex = getNameWithIndex;
	exports.getArrayRowsFromKKGACube = getArrayRowsFromKKGACube;
	exports.fillSelectorRows = fillSelectorRows;
	exports.getArrayRowsFromKGACube = getArrayRowsFromKGACube;
	exports.fillArrayRow = fillArrayRow;
	exports.getObjectRowsFromKGACube = getObjectRowsFromKGACube;
	exports.getObjectRow = getObjectRow;
	exports.getDrilldownRowsFromKAGCube = getDrilldownRowsFromKAGCube;
	exports.fillDrillDownRow = fillDrillDownRow;
	exports.sortWithNumberSupport = sortWithNumberSupport;

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

	function getCurrentChart(config) {
	  return config.chart.current;
	}

	function getCurrentChartTransform(config) {
	  return config.spec.charts[getCurrentChart(config)].transform;
	}

	function getCurrentChartAxis(config) {
	  return config.axis[getCurrentChart(config)];
	}

	function getCurrentChartParam(config) {
	  return config.parameter[getCurrentChart(config)];
	}

	function getCurrentChartAxisSpecs(config) {
	  return config.axisSpecs[getCurrentChart(config)];
	}

	function getCurrentChartParamSpecs(config) {
	  return config.paramSpecs[getCurrentChart(config)];
	}

	function useSharedAxis(config, chart) {
	  return config.spec.charts[chart].sharedAxis;
	}

	function serializeSharedAxes(config) {
	  var availableCharts = getAvailableChartNames(config.spec.charts);
	  for (var i = 0; i < availableCharts.length; i++) {
	    var chartName = availableCharts[i];
	    if (useSharedAxis(config, chartName)) {
	      /** use reference :) in case of sharedAxis */
	      config.axis[chartName] = config.sharedAxis;
	    }
	  }
	}

	var Widget = exports.Widget = {
	  INPUT: 'input', /** default */
	  OPTION: 'option',
	  CHECKBOX: 'checkbox',
	  TEXTAREA: 'textarea'
	};

	function isInputWidget(paramSpec) {
	  return paramSpec && !paramSpec.widget || paramSpec && paramSpec.widget === Widget.INPUT;
	}

	function isOptionWidget(paramSpec) {
	  return paramSpec && paramSpec.widget === Widget.OPTION;
	}

	function isCheckboxWidget(paramSpec) {
	  return paramSpec && paramSpec.widget === Widget.CHECKBOX;
	}

	function isTextareaWidget(paramSpec) {
	  return paramSpec && paramSpec.widget === Widget.TEXTAREA;
	}

	var ParameterValueType = exports.ParameterValueType = {
	  INT: 'int',
	  FLOAT: 'float',
	  BOOLEAN: 'boolean',
	  STRING: 'string',
	  JSON: 'JSON'
	};

	function parseParameter(paramSpecs, param) {
	  /** copy original params */
	  var parsed = JSON.parse(JSON.stringify(param));

	  for (var i = 0; i < paramSpecs.length; i++) {
	    var paramSpec = paramSpecs[i];
	    var name = paramSpec.name;

	    if (paramSpec.valueType === ParameterValueType.INT && typeof parsed[name] !== 'number') {
	      try {
	        parsed[name] = parseInt(parsed[name]);
	      } catch (error) {
	        parsed[name] = paramSpec.defaultValue;
	      }
	    } else if (paramSpec.valueType === ParameterValueType.FLOAT && typeof parsed[name] !== 'number') {
	      try {
	        parsed[name] = parseFloat(parsed[name]);
	      } catch (error) {
	        parsed[name] = paramSpec.defaultValue;
	      }
	    } else if (paramSpec.valueType === ParameterValueType.BOOLEAN) {
	      if (parsed[name] === 'false') {
	        parsed[name] = false;
	      } else if (parsed[name] === 'true') {
	        parsed[name] = true;
	      } else if (typeof parsed[name] !== 'boolean') {
	        parsed[name] = paramSpec.defaultValue;
	      }
	    } else if (paramSpec.valueType === ParameterValueType.JSON) {
	      if (parsed[name] !== null && _typeof(parsed[name]) !== 'object') {
	        try {
	          parsed[name] = JSON.parse(parsed[name]);
	        } catch (error) {
	          parsed[name] = paramSpec.defaultValue;
	        }
	      } else if (parsed[name] === null) {
	        parsed[name] = paramSpec.defaultValue;
	      }
	    }
	  }

	  return parsed;
	}

	var AxisType = exports.AxisType = {
	  AGGREGATOR: 'aggregator',
	  KEY: 'key',
	  GROUP: 'group'
	};

	function isAggregatorAxis(axisSpec) {
	  return axisSpec && axisSpec.axisType === AxisType.AGGREGATOR;
	}
	function isGroupAxis(axisSpec) {
	  return axisSpec && axisSpec.axisType === AxisType.GROUP;
	}
	function isKeyAxis(axisSpec) {
	  return axisSpec && axisSpec.axisType === AxisType.KEY;
	}
	function isSingleDimensionAxis(axisSpec) {
	  return axisSpec && axisSpec.dimension === 'single';
	}

	/**
	 * before: { name: { ... } }
	 * after: [ { name, ... } ]
	 *
	 * add the `name` field while converting to array to easily manipulate
	 */
	function getSpecs(specObject) {
	  var specs = [];
	  for (var name in specObject) {
	    if (specObject.hasOwnProperty(name)) {
	      var singleSpec = specObject[name];
	      if (!singleSpec) {
	        continue;
	      }
	      singleSpec.name = name;
	      specs.push(singleSpec);
	    }
	  }

	  return specs;
	}

	function getAvailableChartNames(charts) {
	  var available = [];
	  for (var name in charts) {
	    if (charts.hasOwnProperty(name)) {
	      available.push(name);
	    }
	  }

	  return available;
	}

	function applyMaxAxisCount(config, axisSpec) {
	  if (isSingleDimensionAxis(axisSpec) || typeof axisSpec.maxAxisCount === 'undefined') {
	    return;
	  }

	  var columns = getCurrentChartAxis(config)[axisSpec.name];
	  if (columns.length <= axisSpec.maxAxisCount) {
	    return;
	  }

	  var sliced = columns.slice(1);
	  getCurrentChartAxis(config)[axisSpec.name] = sliced;
	}

	function removeDuplicatedColumnsInMultiDimensionAxis(config, axisSpec) {
	  if (isSingleDimensionAxis(axisSpec)) {
	    return config;
	  }

	  var columns = getCurrentChartAxis(config)[axisSpec.name];
	  var uniqObject = columns.reduce(function (acc, col) {
	    if (!acc[col.name + '(' + col.aggr + ')']) {
	      acc[col.name + '(' + col.aggr + ')'] = col;
	    }
	    return acc;
	  }, {});

	  var filtered = [];
	  for (var name in uniqObject) {
	    if (uniqObject.hasOwnProperty(name)) {
	      var col = uniqObject[name];
	      filtered.push(col);
	    }
	  }

	  getCurrentChartAxis(config)[axisSpec.name] = filtered;
	  return config;
	}

	function clearAxisConfig(config) {
	  delete config.axis; /** Object: persisted axis for each chart */
	  delete config.sharedAxis;
	}

	function initAxisConfig(config) {
	  if (!config.axis) {
	    config.axis = {};
	  }
	  if (!config.sharedAxis) {
	    config.sharedAxis = {};
	  }

	  var spec = config.spec;
	  var availableCharts = getAvailableChartNames(spec.charts);

	  if (!config.axisSpecs) {
	    config.axisSpecs = {};
	  }
	  for (var i = 0; i < availableCharts.length; i++) {
	    var chartName = availableCharts[i];

	    if (!config.axis[chartName]) {
	      config.axis[chartName] = {};
	    }
	    var axisSpecs = getSpecs(spec.charts[chartName].axis);
	    if (!config.axisSpecs[chartName]) {
	      config.axisSpecs[chartName] = axisSpecs;
	    }

	    /** initialize multi-dimension axes */
	    for (var _i = 0; _i < axisSpecs.length; _i++) {
	      var axisSpec = axisSpecs[_i];
	      if (isSingleDimensionAxis(axisSpec)) {
	        continue;
	      }

	      /** intentionally nested if-stmt is used because order of conditions matter here */
	      if (!useSharedAxis(config, chartName)) {
	        if (!Array.isArray(config.axis[chartName][axisSpec.name])) {
	          config.axis[chartName][axisSpec.name] = [];
	        }
	      } else if (useSharedAxis(config, chartName)) {
	        /**
	         * initialize multiple times even if shared axis because it's not that expensive, assuming that
	         * all charts using shared axis have the same axis specs
	         */
	        if (!Array.isArray(config.sharedAxis[axisSpec.name])) {
	          config.sharedAxis[axisSpec.name] = [];
	        }
	      }
	    }
	  }

	  /** this function should be called after initializing */
	  serializeSharedAxes(config);
	}

	function resetAxisConfig(config) {
	  clearAxisConfig(config);
	  initAxisConfig(config);
	}

	function clearParameterConfig(config) {
	  delete config.parameter; /** Object: persisted parameter for each chart */
	}

	function initParameterConfig(config) {
	  if (!config.parameter) {
	    config.parameter = {};
	  }

	  var spec = config.spec;
	  var availableCharts = getAvailableChartNames(spec.charts);

	  if (!config.paramSpecs) {
	    config.paramSpecs = {};
	  }
	  for (var i = 0; i < availableCharts.length; i++) {
	    var chartName = availableCharts[i];

	    if (!config.parameter[chartName]) {
	      config.parameter[chartName] = {};
	    }
	    var paramSpecs = getSpecs(spec.charts[chartName].parameter);
	    if (!config.paramSpecs[chartName]) {
	      config.paramSpecs[chartName] = paramSpecs;
	    }

	    for (var _i2 = 0; _i2 < paramSpecs.length; _i2++) {
	      var paramSpec = paramSpecs[_i2];
	      if (!config.parameter[chartName][paramSpec.name]) {
	        config.parameter[chartName][paramSpec.name] = paramSpec.defaultValue;
	      }
	    }
	  }
	}

	function resetParameterConfig(config) {
	  clearParameterConfig(config);
	  initParameterConfig(config);
	}

	function getSpecVersion(availableCharts, spec) {
	  var axisHash = {};
	  var paramHash = {};

	  for (var i = 0; i < availableCharts.length; i++) {
	    var chartName = availableCharts[i];
	    var axisSpecs = getSpecs(spec.charts[chartName].axis);
	    axisHash[chartName] = axisSpecs;

	    var paramSpecs = getSpecs(spec.charts[chartName].parameter);
	    paramHash[chartName] = paramSpecs;
	  }

	  return { axisVersion: JSON.stringify(axisHash), paramVersion: JSON.stringify(paramHash) };
	}

	function initializeConfig(config, spec) {
	  config.chartChanged = true;
	  config.parameterChanged = false;

	  var updated = false;

	  var availableCharts = getAvailableChartNames(spec.charts);

	  var _getSpecVersion = getSpecVersion(availableCharts, spec),
	      axisVersion = _getSpecVersion.axisVersion,
	      paramVersion = _getSpecVersion.paramVersion;

	  if (!config.spec || !config.spec.version || !config.spec.version.axis || config.spec.version.axis !== axisVersion) {
	    spec.initialized = true;
	    updated = true;

	    delete config.chart; /** Object: contains current, available chart */
	    config.panel = { columnPanelOpened: true, parameterPanelOpened: false };

	    clearAxisConfig(config);
	    delete config.axisSpecs; /** Object: persisted axisSpecs for each chart */
	  }

	  if (!config.spec || !config.spec.version || !config.spec.version.parameter || config.spec.version.parameter !== paramVersion) {
	    updated = true;

	    clearParameterConfig(config);
	    delete config.paramSpecs; /** Object: persisted paramSpecs for each chart */
	  }

	  if (!spec.version) {
	    spec.version = {};
	  }
	  spec.version.axis = axisVersion;
	  spec.version.parameter = paramVersion;

	  if (!config.spec || updated) {
	    config.spec = spec;
	  }

	  if (!config.chart) {
	    config.chart = {};
	    config.chart.current = availableCharts[0];
	    config.chart.available = availableCharts;
	  }

	  /** initialize config.axis, config.axisSpecs for each chart */
	  initAxisConfig(config);

	  /** initialize config.parameter for each chart */
	  initParameterConfig(config);
	  return config;
	}

	function getColumnsForMultipleAxes(axisType, axisSpecs, axis) {
	  var axisNames = [];
	  var column = {};

	  for (var i = 0; i < axisSpecs.length; i++) {
	    var axisSpec = axisSpecs[i];

	    if (axisType === AxisType.KEY && isKeyAxis(axisSpec)) {
	      axisNames.push(axisSpec.name);
	    } else if (axisType === AxisType.GROUP && isGroupAxis(axisSpec)) {
	      axisNames.push(axisSpec.name);
	    } else if (axisType.AGGREGATOR && isAggregatorAxis(axisSpec)) {
	      axisNames.push(axisSpec.name);
	    }
	  }

	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;

	  try {
	    for (var _iterator = axisNames[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var axisName = _step.value;

	      var columns = axis[axisName];
	      if (typeof axis[axisName] === 'undefined') {
	        continue;
	      }
	      if (!column[axisName]) {
	        column[axisName] = [];
	      }
	      column[axisName] = column[axisName].concat(columns);
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator.return) {
	        _iterator.return();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }

	  return column;
	}

	function getColumnsFromAxis(axisSpecs, axis) {
	  var keyAxisNames = [];
	  var groupAxisNames = [];
	  var aggrAxisNames = [];

	  for (var i = 0; i < axisSpecs.length; i++) {
	    var axisSpec = axisSpecs[i];

	    if (isKeyAxis(axisSpec)) {
	      keyAxisNames.push(axisSpec.name);
	    } else if (isGroupAxis(axisSpec)) {
	      groupAxisNames.push(axisSpec.name);
	    } else if (isAggregatorAxis(axisSpec)) {
	      aggrAxisNames.push(axisSpec.name);
	    }
	  }

	  var keyColumns = [];
	  var groupColumns = [];
	  var aggregatorColumns = [];
	  var customColumn = {};

	  var _loop = function _loop(axisName) {
	    if (axis.hasOwnProperty(axisName)) {
	      var columns = axis[axisName];
	      if (keyAxisNames.includes(axisName)) {
	        keyColumns = keyColumns.concat(columns);
	      } else if (groupAxisNames.includes(axisName)) {
	        groupColumns = groupColumns.concat(columns);
	      } else if (aggrAxisNames.includes(axisName)) {
	        aggregatorColumns = aggregatorColumns.concat(columns);
	      } else {
	        var axisType = axisSpecs.filter(function (s) {
	          return s.name === axisName;
	        })[0].axisType;
	        if (!customColumn[axisType]) {
	          customColumn[axisType] = [];
	        }
	        customColumn[axisType] = customColumn[axisType].concat(columns);
	      }
	    }
	  };

	  for (var axisName in axis) {
	    _loop(axisName);
	  }

	  return {
	    key: keyColumns,
	    group: groupColumns,
	    aggregator: aggregatorColumns,
	    custom: customColumn
	  };
	}

	var Aggregator = exports.Aggregator = {
	  SUM: 'sum',
	  COUNT: 'count',
	  AVG: 'avg',
	  MIN: 'min',
	  MAX: 'max'
	};

	var TransformMethod = {
	  /**
	   * `raw` is designed for users who want to get raw (original) rows.
	   */
	  RAW: 'raw',
	  /**
	   * `object` is * designed for serial(line, area) charts.
	   */
	  OBJECT: 'object',
	  /**
	   * `array` is designed for column, pie charts which have categorical `key` values.
	   * But some libraries may require `OBJECT` transform method even if pie, column charts.
	   *
	   * `row.value` will be filled for `keyNames`.
	   * In other words, if you have `keyNames` which is length 4,
	   * every `row.value`'s length will be 4 too.
	   * (DO NOT use this transform method for serial (numerical) x axis charts which have so-oo many keys)
	   */
	  ARRAY: 'array',
	  ARRAY_2_KEY: 'array:2-key',
	  DRILL_DOWN: 'drill-down'
	};

	/** return function for lazy computation */
	function getTransformer(conf, rows, axisSpecs, axis) {
	  var transformer = function transformer() {};

	  var transformSpec = getCurrentChartTransform(conf);
	  if (!transformSpec) {
	    return transformer;
	  }

	  var method = transformSpec.method;

	  var columns = getColumnsFromAxis(axisSpecs, axis);
	  var keyColumns = columns.key;
	  var groupColumns = columns.group;
	  var aggregatorColumns = columns.aggregator;
	  var customColumns = columns.custom;

	  var column = {
	    key: keyColumns, group: groupColumns, aggregator: aggregatorColumns, custom: customColumns
	  };

	  if (method === TransformMethod.RAW) {
	    transformer = function transformer() {
	      return rows;
	    };
	  } else if (method === TransformMethod.OBJECT) {
	    transformer = function transformer() {
	      var _getKGACube = getKGACube(rows, keyColumns, groupColumns, aggregatorColumns),
	          cube = _getKGACube.cube,
	          schema = _getKGACube.schema,
	          keyColumnName = _getKGACube.keyColumnName,
	          keyNames = _getKGACube.keyNames,
	          groupNameSet = _getKGACube.groupNameSet,
	          selectorNameWithIndex = _getKGACube.selectorNameWithIndex;

	      var _getObjectRowsFromKGA = getObjectRowsFromKGACube(cube, schema, aggregatorColumns, keyColumnName, keyNames, groupNameSet, selectorNameWithIndex),
	          transformed = _getObjectRowsFromKGA.transformed,
	          groupNames = _getObjectRowsFromKGA.groupNames,
	          sortedSelectors = _getObjectRowsFromKGA.sortedSelectors;

	      return {
	        rows: transformed,
	        keyColumnName: keyColumnName,
	        keyNames: keyNames,
	        groupNames: groupNames,
	        selectors: sortedSelectors
	      };
	    };
	  } else if (method === TransformMethod.ARRAY) {
	    transformer = function transformer() {
	      var _getKGACube2 = getKGACube(rows, keyColumns, groupColumns, aggregatorColumns),
	          cube = _getKGACube2.cube,
	          schema = _getKGACube2.schema,
	          keyColumnName = _getKGACube2.keyColumnName,
	          keyNames = _getKGACube2.keyNames,
	          groupNameSet = _getKGACube2.groupNameSet,
	          selectorNameWithIndex = _getKGACube2.selectorNameWithIndex;

	      var _getArrayRowsFromKGAC = getArrayRowsFromKGACube(cube, schema, aggregatorColumns, keyColumnName, keyNames, groupNameSet, selectorNameWithIndex),
	          transformed = _getArrayRowsFromKGAC.transformed,
	          groupNames = _getArrayRowsFromKGAC.groupNames,
	          sortedSelectors = _getArrayRowsFromKGAC.sortedSelectors;

	      return {
	        rows: transformed,
	        keyColumnName: keyColumnName,
	        keyNames: keyNames,
	        groupNames: groupNames,
	        selectors: sortedSelectors
	      };
	    };
	  } else if (method === TransformMethod.ARRAY_2_KEY) {
	    var keyAxisColumn = getColumnsForMultipleAxes(AxisType.KEY, axisSpecs, axis);
	    column.key = keyAxisColumn;

	    var key1Columns = [];
	    var key2Columns = [];

	    // since ARRAY_2_KEY :)
	    var i = 0;
	    for (var axisName in keyAxisColumn) {
	      if (i === 2) {
	        break;
	      }

	      if (i === 0) {
	        key1Columns = keyAxisColumn[axisName];
	      } else if (i === 1) {
	        key2Columns = keyAxisColumn[axisName];
	      }
	      i++;
	    }

	    var _getKKGACube = getKKGACube(rows, key1Columns, key2Columns, groupColumns, aggregatorColumns),
	        cube = _getKKGACube.cube,
	        schema = _getKKGACube.schema,
	        key1ColumnName = _getKKGACube.key1ColumnName,
	        key1Names = _getKKGACube.key1Names,
	        key2ColumnName = _getKKGACube.key2ColumnName,
	        key2Names = _getKKGACube.key2Names,
	        groupNameSet = _getKKGACube.groupNameSet,
	        selectorNameWithIndex = _getKKGACube.selectorNameWithIndex;

	    var _getArrayRowsFromKKGA = getArrayRowsFromKKGACube(cube, schema, aggregatorColumns, key1Names, key2Names, groupNameSet, selectorNameWithIndex),
	        transformed = _getArrayRowsFromKKGA.transformed,
	        groupNames = _getArrayRowsFromKKGA.groupNames,
	        sortedSelectors = _getArrayRowsFromKKGA.sortedSelectors,
	        key1NameWithIndex = _getArrayRowsFromKKGA.key1NameWithIndex,
	        key2NameWithIndex = _getArrayRowsFromKKGA.key2NameWithIndex;

	    transformer = function transformer() {
	      return {
	        rows: transformed,
	        key1Names: key1Names,
	        key1ColumnName: key1ColumnName,
	        key1NameWithIndex: key1NameWithIndex,
	        key2Names: key2Names,
	        key2ColumnName: key2ColumnName,
	        key2NameWithIndex: key2NameWithIndex,
	        groupNames: groupNames,
	        selectors: sortedSelectors
	      };
	    };
	  } else if (method === TransformMethod.DRILL_DOWN) {
	    transformer = function transformer() {
	      var _getKAGCube = getKAGCube(rows, keyColumns, groupColumns, aggregatorColumns),
	          cube = _getKAGCube.cube,
	          schema = _getKAGCube.schema,
	          keyColumnName = _getKAGCube.keyColumnName,
	          keyNames = _getKAGCube.keyNames,
	          groupNameSet = _getKAGCube.groupNameSet,
	          selectorNameWithIndex = _getKAGCube.selectorNameWithIndex;

	      var _getDrilldownRowsFrom = getDrilldownRowsFromKAGCube(cube, schema, aggregatorColumns, keyColumnName, keyNames, groupNameSet, selectorNameWithIndex),
	          transformed = _getDrilldownRowsFrom.transformed,
	          groupNames = _getDrilldownRowsFrom.groupNames,
	          sortedSelectors = _getDrilldownRowsFrom.sortedSelectors;

	      return {
	        rows: transformed,
	        keyColumnName: keyColumnName,
	        keyNames: keyNames,
	        groupNames: groupNames,
	        selectors: sortedSelectors
	      };
	    };
	  }

	  return { transformer: transformer, column: column };
	}

	var AggregatorFunctions = {
	  sum: function sum(a, b) {
	    var varA = a !== undefined ? isNaN(a) ? 1 : parseFloat(a) : 0;
	    var varB = b !== undefined ? isNaN(b) ? 1 : parseFloat(b) : 0;
	    return varA + varB;
	  },
	  count: function count(a, b) {
	    var varA = a !== undefined ? parseInt(a) : 0;
	    var varB = b !== undefined ? 1 : 0;
	    return varA + varB;
	  },
	  min: function min(a, b) {
	    var varA = a !== undefined ? isNaN(a) ? 1 : parseFloat(a) : 0;
	    var varB = b !== undefined ? isNaN(b) ? 1 : parseFloat(b) : 0;
	    return Math.min(varA, varB);
	  },
	  max: function max(a, b) {
	    var varA = a !== undefined ? isNaN(a) ? 1 : parseFloat(a) : 0;
	    var varB = b !== undefined ? isNaN(b) ? 1 : parseFloat(b) : 0;
	    return Math.max(varA, varB);
	  },
	  avg: function avg(a, b, c) {
	    var varA = a !== undefined ? isNaN(a) ? 1 : parseFloat(a) : 0;
	    var varB = b !== undefined ? isNaN(b) ? 1 : parseFloat(b) : 0;
	    return varA + varB;
	  }
	};

	var AggregatorFunctionDiv = {
	  sum: false,
	  min: false,
	  max: false,
	  count: false,
	  avg: true
	};

	/** nested cube `(key) -> (group) -> aggregator` */
	function getKGACube(rows, keyColumns, groupColumns, aggrColumns) {
	  var schema = {
	    key: keyColumns.length !== 0,
	    group: groupColumns.length !== 0,
	    aggregator: aggrColumns.length !== 0
	  };

	  var cube = {};
	  var entry = {};

	  var keyColumnName = keyColumns.map(function (c) {
	    return c.name;
	  }).join('.');
	  var groupNameSet = new Set();
	  var keyNameSet = new Set();
	  var selectorNameWithIndex = {}; /** { selectorName: index } */
	  var indexCounter = 0;

	  var _loop2 = function _loop2(i) {
	    var row = rows[i];
	    var e = entry;
	    var c = cube;

	    // key: add to entry
	    var mergedKeyName = void 0;
	    if (schema.key) {
	      mergedKeyName = keyColumns.map(function (c) {
	        return row[c.index];
	      }).join('.');
	      if (!e[mergedKeyName]) {
	        e[mergedKeyName] = { children: {} };
	      }
	      e = e[mergedKeyName].children;
	      // key: add to row
	      if (!c[mergedKeyName]) {
	        c[mergedKeyName] = {};
	      }
	      c = c[mergedKeyName];

	      keyNameSet.add(mergedKeyName);
	    }

	    var mergedGroupName = void 0;
	    if (schema.group) {
	      mergedGroupName = groupColumns.map(function (c) {
	        return row[c.index];
	      }).join('.');

	      // add group to entry
	      if (!e[mergedGroupName]) {
	        e[mergedGroupName] = { children: {} };
	      }
	      e = e[mergedGroupName].children;
	      // add group to row
	      if (!c[mergedGroupName]) {
	        c[mergedGroupName] = {};
	      }
	      c = c[mergedGroupName];
	      groupNameSet.add(mergedGroupName);
	    }

	    for (var a = 0; a < aggrColumns.length; a++) {
	      var aggrColumn = aggrColumns[a];
	      var aggrName = aggrColumn.name + '(' + aggrColumn.aggr + ')';

	      // update groupNameSet
	      if (!mergedGroupName) {
	        groupNameSet.add(aggrName); /** aggr column name will be used as group name if group is empty */
	      }

	      // update selectorNameWithIndex
	      var selector = getSelectorName(mergedGroupName, aggrColumns.length, aggrName);
	      if (typeof selectorNameWithIndex[selector] === 'undefined' /** value might be 0 */) {
	          selectorNameWithIndex[selector] = indexCounter;
	          indexCounter = indexCounter + 1;
	        }

	      // add aggregator to entry
	      if (!e[aggrName]) {
	        e[aggrName] = { type: 'aggregator', order: aggrColumn, index: aggrColumn.index };
	      }

	      // add aggregatorName to row
	      if (!c[aggrName]) {
	        c[aggrName] = {
	          aggr: aggrColumn.aggr,
	          value: aggrColumn.aggr !== 'count' ? row[aggrColumn.index] : 1,
	          count: 1
	        };
	      } else {
	        var value = AggregatorFunctions[aggrColumn.aggr](c[aggrName].value, row[aggrColumn.index], c[aggrName].count + 1);
	        var count = AggregatorFunctionDiv[aggrColumn.aggr] ? c[aggrName].count + 1 : c[aggrName].count;

	        c[aggrName].value = value;
	        c[aggrName].count = count;
	      }
	    } /** end loop for aggrColumns */
	  };

	  for (var i = 0; i < rows.length; i++) {
	    _loop2(i);
	  }

	  var keyNames = null;
	  if (!schema.key) {
	    var mergedGroupColumnName = groupColumns.map(function (c) {
	      return c.name;
	    }).join('.');
	    cube = _defineProperty({}, mergedGroupColumnName, cube);
	    keyNames = [mergedGroupColumnName];
	  } else {
	    keyNames = sortWithNumberSupport(Object.keys(cube)); /** keys should be sorted */
	  }

	  return {
	    cube: cube,
	    schema: schema,
	    keyColumnName: keyColumnName,
	    keyNames: keyNames,
	    groupNameSet: groupNameSet,
	    selectorNameWithIndex: selectorNameWithIndex
	  };
	}

	/** nested cube `(key) -> aggregator -> (group)` for drill-down support */
	function getKAGCube(rows, keyColumns, groupColumns, aggrColumns) {
	  var schema = {
	    key: keyColumns.length !== 0,
	    group: groupColumns.length !== 0,
	    aggregator: aggrColumns.length !== 0
	  };

	  var cube = {};

	  var keyColumnName = keyColumns.map(function (c) {
	    return c.name;
	  }).join('.');
	  var groupNameSet = new Set();
	  var keyNameSet = new Set();
	  var selectorNameWithIndex = {}; /** { selectorName: index } */
	  var indexCounter = 0;

	  var _loop3 = function _loop3(i) {
	    var row = rows[i];
	    var c = cube;

	    // key: add to entry
	    var mergedKeyName = void 0;
	    if (schema.key) {
	      mergedKeyName = keyColumns.map(function (c) {
	        return row[c.index];
	      }).join('.');
	      // key: add to row
	      if (!c[mergedKeyName]) {
	        c[mergedKeyName] = {};
	      }
	      c = c[mergedKeyName];

	      keyNameSet.add(mergedKeyName);
	    }

	    var mergedGroupName = void 0;
	    if (schema.group) {
	      mergedGroupName = groupColumns.map(function (c) {
	        return row[c.index];
	      }).join('.');
	      groupNameSet.add(mergedGroupName);
	    }

	    for (var a = 0; a < aggrColumns.length; a++) {
	      var aggrColumn = aggrColumns[a];
	      var aggrName = aggrColumn.name + '(' + aggrColumn.aggr + ')';

	      // update groupNameSet
	      if (!mergedGroupName) {
	        groupNameSet.add(aggrName); /** aggr column name will be used as group name if group is empty */
	      }

	      // update selectorNameWithIndex
	      var selector = getSelectorName(mergedKeyName, aggrColumns.length, aggrName);
	      if (typeof selectorNameWithIndex[selector] === 'undefined' /** value might be 0 */) {
	          selectorNameWithIndex[selector] = indexCounter;
	          indexCounter = indexCounter + 1;
	        }

	      // add aggregatorName to row
	      if (!c[aggrName]) {
	        var value = aggrColumn.aggr !== 'count' ? row[aggrColumn.index] : 1;
	        var count = 1;

	        c[aggrName] = { aggr: aggrColumn.aggr, value: value, count: count, children: {} };
	      } else {
	        var _value = AggregatorFunctions[aggrColumn.aggr](c[aggrName].value, row[aggrColumn.index], c[aggrName].count + 1);
	        var _count = AggregatorFunctionDiv[aggrColumn.aggr] ? c[aggrName].count + 1 : c[aggrName].count;

	        c[aggrName].value = _value;
	        c[aggrName].count = _count;
	      }

	      // add aggregated group (for drill-down) to row iff group is enabled
	      if (mergedGroupName) {
	        if (!c[aggrName].children[mergedGroupName]) {
	          var _value2 = aggrColumn.aggr !== 'count' ? row[aggrColumn.index] : 1;
	          var _count2 = 1;

	          c[aggrName].children[mergedGroupName] = { value: _value2, count: _count2 };
	        } else {
	          var drillDownedValue = c[aggrName].children[mergedGroupName].value;
	          var drillDownedCount = c[aggrName].children[mergedGroupName].count;
	          var _value3 = AggregatorFunctions[aggrColumn.aggr](drillDownedValue, row[aggrColumn.index], drillDownedCount + 1);
	          var _count3 = AggregatorFunctionDiv[aggrColumn.aggr] ? drillDownedCount + 1 : drillDownedCount;

	          c[aggrName].children[mergedGroupName].value = _value3;
	          c[aggrName].children[mergedGroupName].count = _count3;
	        }
	      }
	    } /** end loop for aggrColumns */
	  };

	  for (var i = 0; i < rows.length; i++) {
	    _loop3(i);
	  }

	  var keyNames = null;
	  if (!schema.key) {
	    var mergedGroupColumnName = groupColumns.map(function (c) {
	      return c.name;
	    }).join('.');
	    cube = _defineProperty({}, mergedGroupColumnName, cube);
	    keyNames = [mergedGroupColumnName];
	  } else {
	    keyNames = sortWithNumberSupport(Object.keys(cube)); /** keys should be sorted */
	  }

	  return {
	    cube: cube,
	    schema: schema,
	    keyColumnName: keyColumnName,
	    keyNames: keyNames,
	    groupNameSet: groupNameSet,
	    selectorNameWithIndex: selectorNameWithIndex
	  };
	}
	/** nested cube `(key1) -> (key2) -> (group) -> aggregator` */
	function getKKGACube(rows, key1Columns, key2Columns, groupColumns, aggrColumns) {
	  var schema = {
	    key1: key1Columns.length !== 0,
	    key2: key2Columns.length !== 0,
	    group: groupColumns.length !== 0,
	    aggregator: aggrColumns.length !== 0
	  };

	  var cube = {};
	  var entry = {};

	  var key1ColumnName = key1Columns.map(function (c) {
	    return c.name;
	  }).join('.');
	  var key1NameSet = {};
	  var key2ColumnName = key2Columns.map(function (c) {
	    return c.name;
	  }).join('.');
	  var key2NameSet = {};
	  var groupNameSet = new Set();
	  var selectorNameWithIndex = {}; /** { selectorName: index } */
	  var indexCounter = 0;

	  var _loop4 = function _loop4(i) {
	    var row = rows[i];
	    var e = entry;
	    var c = cube;

	    // key1: add to entry
	    var mergedKey1Name = void 0;
	    if (schema.key1) {
	      mergedKey1Name = key1Columns.map(function (c) {
	        return row[c.index];
	      }).join('.');
	      if (!e[mergedKey1Name]) {
	        e[mergedKey1Name] = { children: {} };
	      }
	      e = e[mergedKey1Name].children;
	      // key1: add to row
	      if (!c[mergedKey1Name]) {
	        c[mergedKey1Name] = {};
	      }
	      c = c[mergedKey1Name];

	      if (!key1NameSet[mergedKey1Name]) {
	        key1NameSet[mergedKey1Name] = true;
	      }
	    }

	    // key2: add to entry
	    var mergedKey2Name = void 0;
	    if (schema.key2) {
	      mergedKey2Name = key2Columns.map(function (c) {
	        return row[c.index];
	      }).join('.');
	      if (!e[mergedKey2Name]) {
	        e[mergedKey2Name] = { children: {} };
	      }
	      e = e[mergedKey2Name].children;
	      // key2: add to row
	      if (!c[mergedKey2Name]) {
	        c[mergedKey2Name] = {};
	      }
	      c = c[mergedKey2Name];

	      if (!key2NameSet[mergedKey2Name]) {
	        key2NameSet[mergedKey2Name] = true;
	      }
	    }

	    var mergedGroupName = void 0;
	    if (schema.group) {
	      mergedGroupName = groupColumns.map(function (c) {
	        return row[c.index];
	      }).join('.');

	      // add group to entry
	      if (!e[mergedGroupName]) {
	        e[mergedGroupName] = { children: {} };
	      }
	      e = e[mergedGroupName].children;
	      // add group to row
	      if (!c[mergedGroupName]) {
	        c[mergedGroupName] = {};
	      }
	      c = c[mergedGroupName];
	      groupNameSet.add(mergedGroupName);
	    }

	    for (var a = 0; a < aggrColumns.length; a++) {
	      var aggrColumn = aggrColumns[a];
	      var aggrName = aggrColumn.name + '(' + aggrColumn.aggr + ')';

	      // update groupNameSet
	      if (!mergedGroupName) {
	        groupNameSet.add(aggrName); /** aggr column name will be used as group name if group is empty */
	      }

	      // update selectorNameWithIndex
	      var selector = getSelectorName(mergedGroupName, aggrColumns.length, aggrName);
	      if (typeof selectorNameWithIndex[selector] === 'undefined' /** value might be 0 */) {
	          selectorNameWithIndex[selector] = indexCounter;
	          indexCounter = indexCounter + 1;
	        }

	      // add aggregator to entry
	      if (!e[aggrName]) {
	        e[aggrName] = { type: 'aggregator', order: aggrColumn, index: aggrColumn.index };
	      }

	      // add aggregatorName to row
	      if (!c[aggrName]) {
	        c[aggrName] = {
	          aggr: aggrColumn.aggr,
	          value: aggrColumn.aggr !== 'count' ? row[aggrColumn.index] : 1,
	          count: 1
	        };
	      } else {
	        var value = AggregatorFunctions[aggrColumn.aggr](c[aggrName].value, row[aggrColumn.index], c[aggrName].count + 1);
	        var count = AggregatorFunctionDiv[aggrColumn.aggr] ? c[aggrName].count + 1 : c[aggrName].count;

	        c[aggrName].value = value;
	        c[aggrName].count = count;
	      }
	    } /** end loop for aggrColumns */
	  };

	  for (var i = 0; i < rows.length; i++) {
	    _loop4(i);
	  }

	  var key1Names = sortWithNumberSupport(Object.keys(key1NameSet)); /** keys should be sorted */
	  var key2Names = sortWithNumberSupport(Object.keys(key2NameSet)); /** keys should be sorted */

	  return {
	    cube: cube,
	    schema: schema,
	    key1ColumnName: key1ColumnName,
	    key1Names: key1Names,
	    key2ColumnName: key2ColumnName,
	    key2Names: key2Names,
	    groupNameSet: groupNameSet,
	    selectorNameWithIndex: selectorNameWithIndex
	  };
	}

	function getSelectorName(mergedGroupName, aggrColumnLength, aggrColumnName) {
	  if (!mergedGroupName) {
	    return aggrColumnName;
	  } else {
	    return aggrColumnLength > 1 ? mergedGroupName + ' / ' + aggrColumnName : mergedGroupName;
	  }
	}

	function getCubeValue(obj, aggregator, aggrColumnName) {
	  var value = null; /** default is null */
	  try {
	    /** if AVG or COUNT, calculate it now, previously we can't because we were doing accumulation */
	    if (aggregator === Aggregator.AVG) {
	      value = obj[aggrColumnName].value / obj[aggrColumnName].count;
	    } else if (aggregator === Aggregator.COUNT) {
	      value = obj[aggrColumnName].value;
	    } else {
	      value = obj[aggrColumnName].value;
	    }

	    if (typeof value === 'undefined') {
	      value = null;
	    }
	  } catch (error) {/** iognore */}

	  return value;
	}

	function getNameWithIndex(names) {
	  var nameWithIndex = {};

	  for (var i = 0; i < names.length; i++) {
	    var name = names[i];
	    nameWithIndex[name] = i;
	  }

	  return nameWithIndex;
	}

	function getArrayRowsFromKKGACube(cube, schema, aggregatorColumns, key1Names, key2Names, groupNameSet, selectorNameWithIndex) {
	  var sortedSelectors = sortWithNumberSupport(Object.keys(selectorNameWithIndex));
	  var sortedSelectorNameWithIndex = getNameWithIndex(sortedSelectors);

	  var selectorRows = new Array(sortedSelectors.length);
	  var key1NameWithIndex = getNameWithIndex(key1Names);
	  var key2NameWithIndex = getNameWithIndex(key2Names);

	  fillSelectorRows(schema, cube, selectorRows, aggregatorColumns, sortedSelectorNameWithIndex, key1Names, key2Names, key1NameWithIndex, key2NameWithIndex);

	  return {
	    key1NameWithIndex: key1NameWithIndex,
	    key2NameWithIndex: key2NameWithIndex,
	    transformed: selectorRows,
	    groupNames: sortWithNumberSupport(Array.from(groupNameSet)),
	    sortedSelectors: sortedSelectors
	  };
	}

	/** truly mutable style func. will return nothing */
	function fillSelectorRows(schema, cube, selectorRows, aggrColumns, selectorNameWithIndex, key1Names, key2Names) {
	  function fill(grouped, mergedGroupName, key1Name, key2Name) {
	    // should iterate aggrColumns in the most nested loop to utilize memory locality
	    var _iteratorNormalCompletion2 = true;
	    var _didIteratorError2 = false;
	    var _iteratorError2 = undefined;

	    try {
	      for (var _iterator2 = aggrColumns[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	        var aggrColumn = _step2.value;

	        var aggrName = aggrColumn.name + '(' + aggrColumn.aggr + ')';
	        var value = getCubeValue(grouped, aggrColumn.aggr, aggrName);
	        var selector = getSelectorName(mergedGroupName, aggrColumns.length, aggrName);
	        var selectorIndex = selectorNameWithIndex[selector];

	        if (typeof selectorRows[selectorIndex] === 'undefined') {
	          selectorRows[selectorIndex] = { selector: selector, value: [] };
	        }

	        var _row = { aggregated: value };

	        if (typeof key1Name !== 'undefined') {
	          _row.key1 = key1Name;
	        }
	        if (typeof key2Name !== 'undefined') {
	          _row.key2 = key2Name;
	        }

	        selectorRows[selectorIndex].value.push(_row);
	      }
	    } catch (err) {
	      _didIteratorError2 = true;
	      _iteratorError2 = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion2 && _iterator2.return) {
	          _iterator2.return();
	        }
	      } finally {
	        if (_didIteratorError2) {
	          throw _iteratorError2;
	        }
	      }
	    }
	  }

	  function iterateGroupNames(keyed, key1Name, key2Name) {
	    if (!schema.group) {
	      fill(keyed, undefined, key1Name, key2Name);
	    } else {
	      // assuming sparse distribution (usual case)
	      // otherwise we need to iterate using `groupNameSet`
	      var availableGroupNames = Object.keys(keyed);

	      var _iteratorNormalCompletion3 = true;
	      var _didIteratorError3 = false;
	      var _iteratorError3 = undefined;

	      try {
	        for (var _iterator3 = availableGroupNames[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	          var groupName = _step3.value;

	          var grouped = keyed[groupName];
	          fill(grouped, groupName, key1Name, key2Name);
	        }
	      } catch (err) {
	        _didIteratorError3 = true;
	        _iteratorError3 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion3 && _iterator3.return) {
	            _iterator3.return();
	          }
	        } finally {
	          if (_didIteratorError3) {
	            throw _iteratorError3;
	          }
	        }
	      }
	    }
	  }

	  if (schema.key1 && schema.key2) {
	    var _iteratorNormalCompletion4 = true;
	    var _didIteratorError4 = false;
	    var _iteratorError4 = undefined;

	    try {
	      for (var _iterator4 = key1Names[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	        var key1Name = _step4.value;

	        var key1ed = cube[key1Name];

	        // assuming sparse distribution (usual case)
	        // otherwise we need to iterate using `key2Names`
	        var availableKey2Names = Object.keys(key1ed);

	        var _iteratorNormalCompletion5 = true;
	        var _didIteratorError5 = false;
	        var _iteratorError5 = undefined;

	        try {
	          for (var _iterator5 = availableKey2Names[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	            var key2Name = _step5.value;

	            var keyed = key1ed[key2Name];
	            iterateGroupNames(keyed, key1Name, key2Name);
	          }
	        } catch (err) {
	          _didIteratorError5 = true;
	          _iteratorError5 = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion5 && _iterator5.return) {
	              _iterator5.return();
	            }
	          } finally {
	            if (_didIteratorError5) {
	              throw _iteratorError5;
	            }
	          }
	        }
	      }
	    } catch (err) {
	      _didIteratorError4 = true;
	      _iteratorError4 = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion4 && _iterator4.return) {
	          _iterator4.return();
	        }
	      } finally {
	        if (_didIteratorError4) {
	          throw _iteratorError4;
	        }
	      }
	    }
	  } else if (schema.key1 && !schema.key2) {
	    var _iteratorNormalCompletion6 = true;
	    var _didIteratorError6 = false;
	    var _iteratorError6 = undefined;

	    try {
	      for (var _iterator6 = key1Names[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
	        var _key1Name = _step6.value;

	        var _keyed = cube[_key1Name];
	        iterateGroupNames(_keyed, _key1Name, undefined);
	      }
	    } catch (err) {
	      _didIteratorError6 = true;
	      _iteratorError6 = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion6 && _iterator6.return) {
	          _iterator6.return();
	        }
	      } finally {
	        if (_didIteratorError6) {
	          throw _iteratorError6;
	        }
	      }
	    }
	  } else if (!schema.key1 && schema.key2) {
	    var _iteratorNormalCompletion7 = true;
	    var _didIteratorError7 = false;
	    var _iteratorError7 = undefined;

	    try {
	      for (var _iterator7 = key2Names[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
	        var _key2Name = _step7.value;

	        var _keyed2 = cube[_key2Name];
	        iterateGroupNames(_keyed2, undefined, _key2Name);
	      }
	    } catch (err) {
	      _didIteratorError7 = true;
	      _iteratorError7 = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion7 && _iterator7.return) {
	          _iterator7.return();
	        }
	      } finally {
	        if (_didIteratorError7) {
	          throw _iteratorError7;
	        }
	      }
	    }
	  } else {
	    iterateGroupNames(cube, undefined, undefined);
	  }
	}

	function getArrayRowsFromKGACube(cube, schema, aggregatorColumns, keyColumnName, keyNames, groupNameSet, selectorNameWithIndex) {
	  var sortedSelectors = sortWithNumberSupport(Object.keys(selectorNameWithIndex));
	  var sortedSelectorNameWithIndex = getNameWithIndex(sortedSelectors);

	  var keyArrowRows = new Array(sortedSelectors.length);
	  var keyNameWithIndex = getNameWithIndex(keyNames);

	  for (var i = 0; i < keyNames.length; i++) {
	    var key = keyNames[i];

	    var obj = cube[key];
	    fillArrayRow(schema, aggregatorColumns, obj, groupNameSet, sortedSelectorNameWithIndex, key, keyNames, keyArrowRows, keyNameWithIndex);
	  }

	  return {
	    transformed: keyArrowRows,
	    groupNames: sortWithNumberSupport(Array.from(groupNameSet)),
	    sortedSelectors: sortedSelectors
	  };
	}

	/** truly mutable style func. will return nothing, just modify `keyArrayRows` */
	function fillArrayRow(schema, aggrColumns, obj, groupNameSet, selectorNameWithIndex, keyName, keyNames, keyArrayRows, keyNameWithIndex) {
	  function fill(target, mergedGroupName, aggr, aggrName) {
	    var value = getCubeValue(target, aggr, aggrName);
	    var selector = getSelectorName(mergedGroupName, aggrColumns.length, aggrName);
	    var selectorIndex = selectorNameWithIndex[selector];
	    var keyIndex = keyNameWithIndex[keyName];

	    if (typeof keyArrayRows[selectorIndex] === 'undefined') {
	      keyArrayRows[selectorIndex] = {
	        selector: selector, value: new Array(keyNames.length)
	      };
	    }
	    keyArrayRows[selectorIndex].value[keyIndex] = value;
	  }

	  /** when group is empty */
	  if (!schema.group) {
	    for (var i = 0; i < aggrColumns.length; i++) {
	      var aggrColumn = aggrColumns[i];
	      var aggrName = aggrColumn.name + '(' + aggrColumn.aggr + ')';
	      fill(obj, undefined, aggrColumn.aggr, aggrName);
	    }
	  } else {
	    for (var _i3 = 0; _i3 < aggrColumns.length; _i3++) {
	      var _aggrColumn = aggrColumns[_i3];
	      var _aggrName = _aggrColumn.name + '(' + _aggrColumn.aggr + ')';

	      var _iteratorNormalCompletion8 = true;
	      var _didIteratorError8 = false;
	      var _iteratorError8 = undefined;

	      try {
	        for (var _iterator8 = groupNameSet[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
	          var groupName = _step8.value;

	          var grouped = obj[groupName];
	          fill(grouped, groupName, _aggrColumn.aggr, _aggrName);
	        }
	      } catch (err) {
	        _didIteratorError8 = true;
	        _iteratorError8 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion8 && _iterator8.return) {
	            _iterator8.return();
	          }
	        } finally {
	          if (_didIteratorError8) {
	            throw _iteratorError8;
	          }
	        }
	      }
	    }
	  }
	}

	function getObjectRowsFromKGACube(cube, schema, aggregatorColumns, keyColumnName, keyNames, groupNameSet, selectorNameWithIndex) {
	  var rows = keyNames.reduce(function (acc, key) {
	    var obj = cube[key];
	    var row = getObjectRow(schema, aggregatorColumns, obj, groupNameSet);

	    if (schema.key) {
	      row[keyColumnName] = key;
	    }
	    acc.push(row);

	    return acc;
	  }, []);

	  return {
	    transformed: rows,
	    sortedSelectors: sortWithNumberSupport(Object.keys(selectorNameWithIndex)),
	    groupNames: sortWithNumberSupport(Array.from(groupNameSet))
	  };
	}

	function getObjectRow(schema, aggrColumns, obj, groupNameSet) {
	  var row = {};

	  function fill(row, target, mergedGroupName, aggr, aggrName) {
	    var value = getCubeValue(target, aggr, aggrName);
	    var selector = getSelectorName(mergedGroupName, aggrColumns.length, aggrName);
	    row[selector] = value;
	  }

	  /** when group is empty */
	  if (!schema.group) {
	    for (var i = 0; i < aggrColumns.length; i++) {
	      var aggrColumn = aggrColumns[i];
	      var aggrName = aggrColumn.name + '(' + aggrColumn.aggr + ')';

	      fill(row, obj, undefined, aggrColumn.aggr, aggrName);
	    }

	    return row;
	  }

	  /** when group is specified */
	  for (var _i4 = 0; _i4 < aggrColumns.length; _i4++) {
	    var _aggrColumn2 = aggrColumns[_i4];
	    var _aggrName2 = _aggrColumn2.name + '(' + _aggrColumn2.aggr + ')';

	    var _iteratorNormalCompletion9 = true;
	    var _didIteratorError9 = false;
	    var _iteratorError9 = undefined;

	    try {
	      for (var _iterator9 = groupNameSet[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
	        var groupName = _step9.value;

	        var grouped = obj[groupName];

	        if (grouped) {
	          fill(row, grouped, groupName, _aggrColumn2.aggr, _aggrName2);
	        }
	      }
	    } catch (err) {
	      _didIteratorError9 = true;
	      _iteratorError9 = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion9 && _iterator9.return) {
	          _iterator9.return();
	        }
	      } finally {
	        if (_didIteratorError9) {
	          throw _iteratorError9;
	        }
	      }
	    }
	  }

	  return row;
	}

	function getDrilldownRowsFromKAGCube(cube, schema, aggregatorColumns, keyColumnName, keyNames, groupNameSet, selectorNameWithIndex) {
	  var sortedSelectors = sortWithNumberSupport(Object.keys(selectorNameWithIndex));
	  var sortedSelectorNameWithIndex = getNameWithIndex(sortedSelectors);

	  var rows = new Array(sortedSelectors.length);

	  var groupNames = sortWithNumberSupport(Array.from(groupNameSet));

	  keyNames.map(function (key) {
	    var obj = cube[key];
	    fillDrillDownRow(schema, obj, rows, key, sortedSelectorNameWithIndex, aggregatorColumns, groupNames);
	  });

	  return {
	    transformed: rows,
	    groupNames: groupNames,
	    sortedSelectors: sortedSelectors,
	    sortedSelectorNameWithIndex: sortedSelectorNameWithIndex
	  };
	}

	/** truly mutable style func. will return nothing, just modify `rows` */
	function fillDrillDownRow(schema, obj, rows, key, selectorNameWithIndex, aggrColumns, groupNames) {
	  /** when group is empty */
	  for (var i = 0; i < aggrColumns.length; i++) {
	    var _row2 = {};
	    var aggrColumn = aggrColumns[i];
	    var aggrName = aggrColumn.name + '(' + aggrColumn.aggr + ')';

	    var value = getCubeValue(obj, aggrColumn.aggr, aggrName);
	    var selector = getSelectorName(schema.key ? key : undefined, aggrColumns.length, aggrName);

	    var selectorIndex = selectorNameWithIndex[selector];
	    _row2.value = value;
	    _row2.drillDown = [];
	    _row2.selector = selector;

	    if (schema.group) {
	      _row2.drillDown = [];

	      var _iteratorNormalCompletion10 = true;
	      var _didIteratorError10 = false;
	      var _iteratorError10 = undefined;

	      try {
	        for (var _iterator10 = groupNames[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
	          var groupName = _step10.value;

	          var _value4 = getCubeValue(obj[aggrName].children, aggrColumn.aggr, groupName);
	          _row2.drillDown.push({ group: groupName, value: _value4 });
	        }
	      } catch (err) {
	        _didIteratorError10 = true;
	        _iteratorError10 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion10 && _iterator10.return) {
	            _iterator10.return();
	          }
	        } finally {
	          if (_didIteratorError10) {
	            throw _iteratorError10;
	          }
	        }
	      }
	    }

	    rows[selectorIndex] = _row2;
	  }
	}

	function sortWithNumberSupport(arr) {
	  var isNumeric = function isNumeric(n) {
	    return !isNaN(parseFloat(n)) && isFinite(n);
	  };

	  if (arr.every(isNumeric)) {
	    return arr.sort(function (a, b) {
	      return parseFloat(a) - parseFloat(b);
	    });
	  } else {
	    return arr.sort();
	  }
	}

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.renderSimpleCard = renderSimpleCard;
	function renderSimpleCard(rows, column, parameter) {
		var css = renderCSS();
		var mainTitle = renderMainTitle(rows, column, parameter);
		var secondaryTitle = renderSecondaryTitle(rows, column, parameter);
		var content = css + '\n\t\t<div class="zn-parent-info" style="text-align: ' + parameter.alignment + ';">\n\t\t\t' + mainTitle + '\n\t\t\t' + secondaryTitle + '\n\t\t</div>\n\t\t';
		return content;
	}

	function renderMainTitle(rows, column, parameter) {
		var mainValue = '-';
		var mainIndex = 0;
		if (column.key.length > 0) {
			mainIndex = column.key[0].index;
		}
		if (rows.length > 0 && rows[0].length > mainIndex) {
			mainValue = rows[0][mainIndex];
		}
		var mainTitle = '<div class="zn-main zn-main-info zn-' + parameter.fontSize + '">\n\t\t' + (parameter.showTitle ? '' + (column.key.length ? '<p class="zn-main-header">' + column.key[0].name.replace(/_/g, ' ') + '</p>' : '') : '') + '\n\t\t<p class="zn-main-value" ' + (parameter.fontColor ? 'style="color: ' + parameter.fontColor + '"' : '') + '>\n\t\t\t' + (parameter.iconName ? '<i class="fa fa-' + parameter.iconName + '"></i>' : '') + '\n\t\t\t' + (parameter.prefix ? '' + parameter.prefix : '') + '\n\t\t\t' + mainValue + '\n\t\t\t' + (parameter.suffix ? '' + parameter.suffix : '') + '\n\t\t</p>\n\t\t</div>';
		return mainTitle;
	}

	function renderSecondaryTitle(rows, column, parameter) {
		var secondaryTitle = '';
		if (column.aggregator.length > 0) {
			var secondaryValue = '-';
			var secondaryIndex = column.aggregator[0].index;
			if (rows.length > 0 && rows[0].length > secondaryIndex) {
				secondaryValue = rows[0][secondaryIndex];
			}
			secondaryTitle = '<div class="zn-main zn-sub-info zn-' + parameter.fontSize + '">\n\t\t\t<p class="zn-sub-header">\n\t\t\t\t' + column.aggregator[0].name.replace(/_/g, ' ') + ' \n\t\t\t\t<span class="zn-sub-value"> \n\t\t\t\t\t' + secondaryValue + '\n\t\t\t\t</span>\n\t\t\t</p>\n      </div>';
		}
		return secondaryTitle;
	}

	function renderCSS() {
		var styleContent = '\n\t\t<style>\n\t\t\n\t\t.zn-parent-info {\n\t\t\tmargin-top: 20px;\n\t\t}\n\n\t\t.zn-main-info {\n\t\t\twidth: 100%;\n\t\t\tbackground-color: white;\n\t\t}\n\n\t\t.zn-main-header {\n\t\t\tmargin: 0;\n\t\t\tfont-size: 34px;\n\t\t\ttext-transform: capitalize;\n\t\t\tcolor: rgb(68, 81, 80);\n\t\t}\n\n\t\t.zn-main-value {\n\t\t\tmargin: 0;\n\t\t\tfont-size: 72px;\n\t\t\tcolor: #ED6985;\n\t\t}\n\n\t\t.zn-sub-info {\n\t\t\twidth: 100%;\n\t\t\tcolor: rgb(163, 163, 163);\n\t\t\tborder-top: solid 1px #ccc;\n\t\t}\n\n\t\t.zn-sub-header {\n\t\t\tmargin-top: 15px;\n\t\t\tfont-size: xx-large;\n\t\t\ttext-transform: capitalize;\n\t\t}\n\n\t\t.zn-sub-value {\n\t\t\tpadding-left: 20px;\n\t\t\tmargin-top: 15px;\n\t\t\tfont-size: xx-large;\n\t\t\tfont-weight: bold;\n\t\t}\n\n\t\t.zn-large .zn-main-header {\n\t\t\tfont-size: 2.3vw;\n\t\t}\n\n\t\t.zn-large .zn-sub-header {\n\t\t\tfont-size: 2.3vw;\n\t\t}\n\n\t\t.zn-large .zn-sub-value {\n\t\t\tfont-size: 2.3vw;\n\t\t}\n\n\t\t.zn-large .zn-main-value {\n\t\t\tfont-size: 5vw;\n\t\t}\n\n\t\t.zn-medium .zn-main-header {\n\t\t\tfont-size: 1.7vw;\n\t\t}\n\n\t\t.zn-medium .zn-sub-header {\n\t\t\tfont-size: 1.7vw;\n\t\t}\n\n\t\t.zn-medium .zn-sub-value {\n\t\t\tfont-size: 1.7vw;\n\t\t}\n\n\t\t.zn-medium .zn-main-value {\n\t\t\tfont-size: 3vw;\n\t\t}\n\n\t\t.zn-small .zn-main-header {\n\t\t\tfont-size: 1.2vw;\n\t\t}\n\n\t\t.zn-small .zn-sub-header {\n\t\t\tfont-size: 1.2vw;\n\t\t}\n\n\t\t.zn-small .zn-sub-value {\n\t\t\tfont-size: 1.2vw;\n\t\t}\n\n\t\t.zn-small .zn-main-value {\n\t\t\tfont-size: 2vw;\n\t\t}\n\t\t</style>\n\t\t';
		return styleContent;
	}

/***/ })
/******/ ]);