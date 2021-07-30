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

	var _zeppelinHighmaps = __webpack_require__(1);

	var _zeppelinHighmaps2 = _interopRequireDefault(_zeppelinHighmaps);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	heliumBundles.push({
	  id: "zeppelin-highmaps",
	  name: "zeppelin-highmaps",
	  icon: "<i class='fa fa-globe' style='color: #ee8208;'></i>",
	  type: "VISUALIZATION",
	  class: _zeppelinHighmaps2.default
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

	var _passthrough = __webpack_require__(3);

	var _passthrough2 = _interopRequireDefault(_passthrough);

	var _columnselector = __webpack_require__(5);

	var _columnselector2 = _interopRequireDefault(_columnselector);

	var _highmaps = __webpack_require__(6);

	var _highmaps2 = _interopRequireDefault(_highmaps);

	var _settingsPanelTemplate = __webpack_require__(7);

	var _settingsPanelTemplate2 = _interopRequireDefault(_settingsPanelTemplate);

	var _l10n = __webpack_require__(8);

	var _data = __webpack_require__(88);

	var _utils = __webpack_require__(99);

	var _highmapsHelper = __webpack_require__(100);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var instancesNumber = 0;

	var constants = Object.freeze({
	    idPrefix: 'zeppelin-highmaps',
	    defaultMap: 'RU'
	});

	var ZeppelinHighmaps = function (_Visualization) {
	    _inherits(ZeppelinHighmaps, _Visualization);

	    function ZeppelinHighmaps(targetEl, config) {
	        _classCallCheck(this, ZeppelinHighmaps);

	        var _this = _possibleConstructorReturn(this, (ZeppelinHighmaps.__proto__ || Object.getPrototypeOf(ZeppelinHighmaps)).call(this, targetEl, config));

	        instancesNumber++;
	        _this.instanceId = constants.idPrefix + '-' + instancesNumber;

	        _this.errorElement = null;

	        _this.columnselectorProps = [{ name: 'region' }, { name: 'value' }];
	        _this.columnselector = new _columnselector2.default(config, _this.columnselectorProps);

	        _this.params = {
	            allAreas: true,
	            map: constants.defaultMap,
	            rangesNumber: 5,
	            minInRange: NaN,
	            maxInRange: NaN
	        };

	        _this.tableData = null;

	        _this.chart = null;
	        _this.chartContainer = _this.createChartContainer();

	        targetEl.css({
	            display: 'flex',
	            flexDirection: 'column'
	        });
	        return _this;
	    }

	    /**
	     * @override
	     */


	    _createClass(ZeppelinHighmaps, [{
	        key: 'getTransformation',
	        value: function getTransformation() {
	            return this.columnselector;
	        }

	        /**
	         * @override
	         * @param {object[]} tableData Raw data.
	         */

	    }, {
	        key: 'render',
	        value: function render(tableData) {
	            var areSettingsCorrect = this.config.region && this.config.value;
	            if (!areSettingsCorrect) {
	                this.renderError((0, _l10n.l10n)('settings.invalid'));
	                return;
	            } else {
	                this.hideError();
	            }

	            this.tableData = tableData;

	            if (this.chart) {
	                this.updateChart();
	            } else {
	                this.redrawChart();
	            }
	        }

	        /**
	         * Destroys current chart and renders new one instead.
	         */

	    }, {
	        key: 'redrawChart',
	        value: function redrawChart() {
	            (0, _highmapsHelper.destroyHighchartMap)(this.chart);

	            var data = this.getData(this.tableData);

	            var mapPath = this.registerMapData(this.params.map);
	            this.chart = (0, _highmapsHelper.createHighchartMap)({
	                containerElement: this.chartContainer,
	                mapPath: mapPath,
	                data: data,
	                allAreas: this.params.allAreas,
	                rangesNumber: this.params.rangesNumber,
	                minInRange: this.params.minInRange,
	                maxInRange: this.params.maxInRange
	            });
	        }

	        /**
	         * Updates chart's series.
	         */

	    }, {
	        key: 'updateChart',
	        value: function updateChart() {
	            var data = this.getData(this.tableData);
	            (0, _highmapsHelper.updateHighchartMapData)(this.chart, data);
	        }

	        /**
	         * Updates chart with given values settings without redrawing.
	         * @param {number} rangesNumber
	         * @param {number|string} minInRange
	         * @param {number|string} maxInRange
	         * @returns {boolean} Returns true if chart was updated.
	         */

	    }, {
	        key: 'updateChartByValues',
	        value: function updateChartByValues(rangesNumber, rawMinInRange, rawMaxInRange) {
	            var hasChanges = false;

	            if (this.params.rangesNumber !== rangesNumber) {
	                this.params.rangesNumber = rangesNumber;
	                hasChanges = true;
	            }

	            var minInRange = parseFloat(rawMinInRange);
	            if (!(0, _utils.isSameNumber)(minInRange, this.params.minInRange)) {
	                this.params.minInRange = minInRange;
	                hasChanges = true;
	            }

	            var maxInRange = parseFloat(rawMaxInRange);
	            if (!(0, _utils.isSameNumber)(maxInRange, this.params.maxInRange)) {
	                this.params.maxInRange = maxInRange;
	                hasChanges = true;
	            }

	            if (hasChanges) {
	                (0, _highmapsHelper.updateHighchartByRanges)(this.chart, {
	                    rangesNumber: this.params.rangesNumber,
	                    data: this.getData(this.tableData),
	                    minInRange: this.params.minInRange,
	                    maxInRange: this.params.maxInRange
	                });
	                return hasChanges;
	            }

	            return hasChanges;
	        }

	        /**
	         * Updates chart with given values by creating new chart instead of old one.
	         * @param {string} newMap
	         * @param {boolean} allAreas
	         */

	    }, {
	        key: 'redrawsChartByValues',
	        value: function redrawsChartByValues(newMap, allAreas) {
	            var hasChanges = false;

	            // Unfortunatelly, if "update" method was called on chart instance,
	            // previous map is still visible.
	            if (this.params.map !== newMap) {
	                this.params.map = newMap;
	                hasChanges = true;
	            }

	            // Unfortunatelly, only first change of allAreas makes map to hide or show null-value regions,
	            // rest changes do not affect the chart map.
	            if (this.params.allAreas !== allAreas) {
	                this.params.allAreas = allAreas;
	                hasChanges = true;
	            }

	            if (hasChanges) {
	                this.redrawChart();
	            }

	            return hasChanges;
	        }

	        /**
	         * Creates DIV that will contain chart.
	         * @returns {HTMLElement}
	         */

	    }, {
	        key: 'createChartContainer',
	        value: function createChartContainer() {
	            // TBD: several maps for one data set.
	            var chartContainerHtml = '<div id="' + this.instanceId + '-chart-container" ' + 'style="height: 100%; flex: 1; display: flex; flex-direction: row;" ' + '></div>';
	            this.chartContainer = (0, _utils.parseHTML)(chartContainerHtml)[0];
	            this.targetEl.append(this.chartContainer);
	            return this.chartContainer;
	        }

	        /**
	         * Returns Angular definition for settings panel.
	         * @override
	         * @return {object}
	         */

	    }, {
	        key: 'getSetting',
	        value: function getSetting() {
	            var self = this;
	            var maps = Object.keys(_data.maxmindToHighmaps.mapsPaths).map(function (map) {
	                return {
	                    mapID: map,
	                    mapL10n: (0, _l10n.l10n)('maps.' + map)
	                };
	            });
	            return {
	                template: (0, _settingsPanelTemplate2.default)({
	                    idPrefix: self.instanceId,
	                    minRangesNumber: 2,
	                    maxRangesNumber: 10
	                }),
	                scope: {
	                    l10n: _l10n.l10n,
	                    allAreas: self.params.allAreas,
	                    rangesNumber: self.params.rangesNumber,
	                    minInRange: self.params.minInRange || '',
	                    maxInRange: self.params.maxInRange || '',
	                    maps: maps,
	                    map: constants.defaultMap,
	                    updateMap: function updateMap() {
	                        var scope = this;

	                        var chartUpdatedByValues = self.updateChartByValues(scope.rangesNumber, scope.minInRange, scope.maxInRange);
	                        if (chartUpdatedByValues) {
	                            return;
	                        }

	                        var newMap = scope.map || constants.defaultMap;
	                        var chartRedrawnByValues = self.redrawsChartByValues(newMap, scope.allAreas);
	                        if (chartRedrawnByValues) {
	                            return;
	                        }
	                    }
	                }
	            };
	        }

	        /**
	         * Registers map data by given map path and renders error if no map data found.
	         * @param {string} mapShortcut Shortcut to get map path.
	         * @returns {string} Map path.
	         */

	    }, {
	        key: 'registerMapData',
	        value: function registerMapData(mapShortcut) {
	            var mapPath = _data.maxmindToHighmaps.mapsPaths[mapShortcut];
	            var mapData = mapPath ? _data.highmapsMapdata[mapPath] : null;
	            if (!mapData) {
	                this.renderError((0, _l10n.l10n)('highcharts.mapNotFound', { mapShortcut: mapShortcut, mapPath: mapPath }));
	                return '';
	            }
	            _highmaps2.default.maps[mapPath] = mapData;
	            return mapPath;
	        }

	        /**
	         * Converts input data set to data set for Highcharts.
	         * @param {object} tableData Zeppelin/Helium data set.
	         * @returns {ChartDataItem[]}
	         */

	    }, {
	        key: 'getData',
	        value: function getData(tableData) {
	            var _this2 = this;

	            var regionsMap = _data.maxmindToHighmaps.regions[this.params.map];
	            var data = tableData.rows.map(function (row) {
	                var regionId = row[_this2.config.region.index];
	                var value = parseFloat(row[_this2.config.value.index]);
	                return {
	                    // Uses regionId as country code if no regions map found for this map.
	                    'hc-key': regionsMap ? regionsMap[regionId] : regionId.toLowerCase(),
	                    value: value
	                };
	            }).filter(function (dataItem) {
	                return dataItem['hc-key'] && !isNaN(dataItem.value);
	            });
	            if (data.length === 0) {
	                this.renderError((0, _l10n.l10n)('data.emptySet'));
	            } else {
	                this.hideError();
	            }
	            return data;
	        }

	        /**
	         * Renders given error message.
	         * @param {string} errorMsg
	         */

	    }, {
	        key: 'renderError',
	        value: function renderError(errorMsg) {
	            if (!this.errorElement) {
	                var errorElementHtml = '<span style="color: red;"></span>';
	                this.errorElement = (0, _utils.parseHTML)(errorElementHtml)[0];
	                this.targetEl.prepend(this.errorElement);
	            }
	            this.errorElement.innerHTML = errorMsg;
	            this.errorElement.hidden = false;
	            this.chartContainer.style.display = 'none';
	        }

	        /**
	         * Hides error message.
	         */

	    }, {
	        key: 'hideError',
	        value: function hideError() {
	            if (this.errorElement) {
	                this.errorElement.hidden = true;
	            }
	            this.chartContainer.style.display = 'flex';
	        }
	    }]);

	    return ZeppelinHighmaps;
	}(_zeppelinVis2.default);

	exports.default = ZeppelinHighmaps;

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
	 * passthough the data
	 */
	var PassthroughTransformation = function (_Transformation) {
	  _inherits(PassthroughTransformation, _Transformation);

	  // eslint-disable-next-line no-useless-constructor
	  function PassthroughTransformation(config) {
	    _classCallCheck(this, PassthroughTransformation);

	    return _possibleConstructorReturn(this, (PassthroughTransformation.__proto__ || Object.getPrototypeOf(PassthroughTransformation)).call(this, config));
	  }

	  /**
	   * Method will be invoked when tableData or config changes
	   */


	  _createClass(PassthroughTransformation, [{
	    key: 'transform',
	    value: function transform(tableData) {
	      return tableData;
	    }
	  }]);

	  return PassthroughTransformation;
	}(_transformation2.default);

	exports.default = PassthroughTransformation;

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
/* 6 */
/***/ (function(module, exports) {

	/*
	 Highmaps JS v6.0.4 (2017-12-15)

	 (c) 2011-2016 Torstein Honsi

	 License: www.highcharts.com/license
	*/
	(function(S,J){"object"===typeof module&&module.exports?module.exports=S.document?J(S):J:S.Highcharts=J(S)})("undefined"!==typeof window?window:this,function(S){var J=function(){var a="undefined"===typeof S?window:S,z=a.document,A=a.navigator&&a.navigator.userAgent||"",y=z&&z.createElementNS&&!!z.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect,h=/(edge|msie|trident)/i.test(A)&&!a.opera,d=/Firefox/.test(A),v=d&&4>parseInt(A.split("Firefox/")[1],10);return a.Highcharts?a.Highcharts.error(16,
	!0):{product:"Highmaps",version:"6.0.4",deg2rad:2*Math.PI/360,doc:z,hasBidiBug:v,hasTouch:z&&void 0!==z.documentElement.ontouchstart,isMS:h,isWebKit:/AppleWebKit/.test(A),isFirefox:d,isTouchDevice:/(Mobile|Android|Windows Phone)/.test(A),SVG_NS:"http://www.w3.org/2000/svg",chartCount:0,seriesTypes:{},symbolSizes:{},svg:y,win:a,marginNames:["plotTop","marginRight","marginBottom","plotLeft"],noop:function(){},charts:[]}}();(function(a){a.timers=[];var z=a.charts,A=a.doc,y=a.win;a.error=function(h,d){h=
	a.isNumber(h)?"Highcharts error #"+h+": www.highcharts.com/errors/"+h:h;if(d)throw Error(h);y.console&&console.log(h)};a.Fx=function(a,d,v){this.options=d;this.elem=a;this.prop=v};a.Fx.prototype={dSetter:function(){var a=this.paths[0],d=this.paths[1],v=[],t=this.now,r=a.length,p;if(1===t)v=this.toD;else if(r===d.length&&1>t)for(;r--;)p=parseFloat(a[r]),v[r]=isNaN(p)?d[r]:t*parseFloat(d[r]-p)+p;else v=d;this.elem.attr("d",v,null,!0)},update:function(){var a=this.elem,d=this.prop,v=this.now,t=this.options.step;
	if(this[d+"Setter"])this[d+"Setter"]();else a.attr?a.element&&a.attr(d,v,null,!0):a.style[d]=v+this.unit;t&&t.call(a,v,this)},run:function(h,d,v){var t=this,r=t.options,p=function(a){return p.stopped?!1:t.step(a)},m=y.requestAnimationFrame||function(a){setTimeout(a,13)},f=function(){for(var q=0;q<a.timers.length;q++)a.timers[q]()||a.timers.splice(q--,1);a.timers.length&&m(f)};h===d?(delete r.curAnim[this.prop],r.complete&&0===a.keys(r.curAnim).length&&r.complete.call(this.elem)):(this.startTime=+new Date,
	this.start=h,this.end=d,this.unit=v,this.now=this.start,this.pos=0,p.elem=this.elem,p.prop=this.prop,p()&&1===a.timers.push(p)&&m(f))},step:function(h){var d=+new Date,v,t=this.options,r=this.elem,p=t.complete,m=t.duration,f=t.curAnim;r.attr&&!r.element?h=!1:h||d>=m+this.startTime?(this.now=this.end,this.pos=1,this.update(),v=f[this.prop]=!0,a.objectEach(f,function(a){!0!==a&&(v=!1)}),v&&p&&p.call(r),h=!1):(this.pos=t.easing((d-this.startTime)/m),this.now=this.start+(this.end-this.start)*this.pos,
	this.update(),h=!0);return h},initPath:function(h,d,v){function t(a){var b,g;for(e=a.length;e--;)b="M"===a[e]||"L"===a[e],g=/[a-zA-Z]/.test(a[e+3]),b&&g&&a.splice(e+1,0,a[e+1],a[e+2],a[e+1],a[e+2])}function r(a,b){for(;a.length<g;){a[0]=b[g-a.length];var f=a.slice(0,c);[].splice.apply(a,[0,0].concat(f));n&&(f=a.slice(a.length-c),[].splice.apply(a,[a.length,0].concat(f)),e--)}a[0]="M"}function p(a,e){for(var f=(g-a.length)/c;0<f&&f--;)b=a.slice().splice(a.length/D-c,c*D),b[0]=e[g-c-f*c],l&&(b[c-6]=
	b[c-2],b[c-5]=b[c-1]),[].splice.apply(a,[a.length/D,0].concat(b)),n&&f--}d=d||"";var m,f=h.startX,q=h.endX,l=-1<d.indexOf("C"),c=l?7:3,g,b,e;d=d.split(" ");v=v.slice();var n=h.isArea,D=n?2:1,I;l&&(t(d),t(v));if(f&&q){for(e=0;e<f.length;e++)if(f[e]===q[0]){m=e;break}else if(f[0]===q[q.length-f.length+e]){m=e;I=!0;break}void 0===m&&(d=[])}d.length&&a.isNumber(m)&&(g=v.length+m*D*c,I?(r(d,v),p(v,d)):(r(v,d),p(d,v)));return[d,v]}};a.Fx.prototype.fillSetter=a.Fx.prototype.strokeSetter=function(){this.elem.attr(this.prop,
	a.color(this.start).tweenTo(a.color(this.end),this.pos),null,!0)};a.extend=function(a,d){var h;a||(a={});for(h in d)a[h]=d[h];return a};a.merge=function(){var h,d=arguments,v,t={},r=function(h,m){"object"!==typeof h&&(h={});a.objectEach(m,function(f,q){!a.isObject(f,!0)||a.isClass(f)||a.isDOMElement(f)?h[q]=m[q]:h[q]=r(h[q]||{},f)});return h};!0===d[0]&&(t=d[1],d=Array.prototype.slice.call(d,2));v=d.length;for(h=0;h<v;h++)t=r(t,d[h]);return t};a.pInt=function(a,d){return parseInt(a,d||10)};a.isString=
	function(a){return"string"===typeof a};a.isArray=function(a){a=Object.prototype.toString.call(a);return"[object Array]"===a||"[object Array Iterator]"===a};a.isObject=function(h,d){return!!h&&"object"===typeof h&&(!d||!a.isArray(h))};a.isDOMElement=function(h){return a.isObject(h)&&"number"===typeof h.nodeType};a.isClass=function(h){var d=h&&h.constructor;return!(!a.isObject(h,!0)||a.isDOMElement(h)||!d||!d.name||"Object"===d.name)};a.isNumber=function(a){return"number"===typeof a&&!isNaN(a)&&Infinity>
	a&&-Infinity<a};a.erase=function(a,d){for(var h=a.length;h--;)if(a[h]===d){a.splice(h,1);break}};a.defined=function(a){return void 0!==a&&null!==a};a.attr=function(h,d,v){var t;a.isString(d)?a.defined(v)?h.setAttribute(d,v):h&&h.getAttribute&&(t=h.getAttribute(d)):a.defined(d)&&a.isObject(d)&&a.objectEach(d,function(a,d){h.setAttribute(d,a)});return t};a.splat=function(h){return a.isArray(h)?h:[h]};a.syncTimeout=function(a,d,v){if(d)return setTimeout(a,d,v);a.call(0,v)};a.pick=function(){var a=arguments,
	d,v,t=a.length;for(d=0;d<t;d++)if(v=a[d],void 0!==v&&null!==v)return v};a.css=function(h,d){a.isMS&&!a.svg&&d&&void 0!==d.opacity&&(d.filter="alpha(opacity\x3d"+100*d.opacity+")");a.extend(h.style,d)};a.createElement=function(h,d,v,t,r){h=A.createElement(h);var p=a.css;d&&a.extend(h,d);r&&p(h,{padding:0,border:"none",margin:0});v&&p(h,v);t&&t.appendChild(h);return h};a.extendClass=function(h,d){var v=function(){};v.prototype=new h;a.extend(v.prototype,d);return v};a.pad=function(a,d,v){return Array((d||
	2)+1-String(a).length).join(v||0)+a};a.relativeLength=function(a,d,v){return/%$/.test(a)?d*parseFloat(a)/100+(v||0):parseFloat(a)};a.wrap=function(a,d,v){var h=a[d];a[d]=function(){var a=Array.prototype.slice.call(arguments),d=arguments,m=this;m.proceed=function(){h.apply(m,arguments.length?arguments:d)};a.unshift(h);a=v.apply(this,a);m.proceed=null;return a}};a.getTZOffset=function(h){var d=a.Date;return 6E4*(d.hcGetTimezoneOffset&&d.hcGetTimezoneOffset(h)||d.hcTimezoneOffset||0)};a.dateFormat=function(h,
	d,v){if(!a.defined(d)||isNaN(d))return a.defaultOptions.lang.invalidDate||"";h=a.pick(h,"%Y-%m-%d %H:%M:%S");var t=a.Date,r=new t(d-a.getTZOffset(d)),p=r[t.hcGetHours](),m=r[t.hcGetDay](),f=r[t.hcGetDate](),q=r[t.hcGetMonth](),l=r[t.hcGetFullYear](),c=a.defaultOptions.lang,g=c.weekdays,b=c.shortWeekdays,e=a.pad,t=a.extend({a:b?b[m]:g[m].substr(0,3),A:g[m],d:e(f),e:e(f,2," "),w:m,b:c.shortMonths[q],B:c.months[q],m:e(q+1),y:l.toString().substr(2,2),Y:l,H:e(p),k:p,I:e(p%12||12),l:p%12||12,M:e(r[t.hcGetMinutes]()),
	p:12>p?"AM":"PM",P:12>p?"am":"pm",S:e(r.getSeconds()),L:e(Math.round(d%1E3),3)},a.dateFormats);a.objectEach(t,function(a,b){for(;-1!==h.indexOf("%"+b);)h=h.replace("%"+b,"function"===typeof a?a(d):a)});return v?h.substr(0,1).toUpperCase()+h.substr(1):h};a.formatSingle=function(h,d){var v=/\.([0-9])/,t=a.defaultOptions.lang;/f$/.test(h)?(v=(v=h.match(v))?v[1]:-1,null!==d&&(d=a.numberFormat(d,v,t.decimalPoint,-1<h.indexOf(",")?t.thousandsSep:""))):d=a.dateFormat(h,d);return d};a.format=function(h,d){for(var v=
	"{",t=!1,r,p,m,f,q=[],l;h;){v=h.indexOf(v);if(-1===v)break;r=h.slice(0,v);if(t){r=r.split(":");p=r.shift().split(".");f=p.length;l=d;for(m=0;m<f;m++)l&&(l=l[p[m]]);r.length&&(l=a.formatSingle(r.join(":"),l));q.push(l)}else q.push(r);h=h.slice(v+1);v=(t=!t)?"}":"{"}q.push(h);return q.join("")};a.getMagnitude=function(a){return Math.pow(10,Math.floor(Math.log(a)/Math.LN10))};a.normalizeTickInterval=function(h,d,v,t,r){var p,m=h;v=a.pick(v,1);p=h/v;d||(d=r?[1,1.2,1.5,2,2.5,3,4,5,6,8,10]:[1,2,2.5,5,10],
	!1===t&&(1===v?d=a.grep(d,function(a){return 0===a%1}):.1>=v&&(d=[1/v])));for(t=0;t<d.length&&!(m=d[t],r&&m*v>=h||!r&&p<=(d[t]+(d[t+1]||d[t]))/2);t++);return m=a.correctFloat(m*v,-Math.round(Math.log(.001)/Math.LN10))};a.stableSort=function(a,d){var h=a.length,t,r;for(r=0;r<h;r++)a[r].safeI=r;a.sort(function(a,m){t=d(a,m);return 0===t?a.safeI-m.safeI:t});for(r=0;r<h;r++)delete a[r].safeI};a.arrayMin=function(a){for(var d=a.length,h=a[0];d--;)a[d]<h&&(h=a[d]);return h};a.arrayMax=function(a){for(var d=
	a.length,h=a[0];d--;)a[d]>h&&(h=a[d]);return h};a.destroyObjectProperties=function(h,d){a.objectEach(h,function(a,t){a&&a!==d&&a.destroy&&a.destroy();delete h[t]})};a.discardElement=function(h){var d=a.garbageBin;d||(d=a.createElement("div"));h&&d.appendChild(h);d.innerHTML=""};a.correctFloat=function(a,d){return parseFloat(a.toPrecision(d||14))};a.setAnimation=function(h,d){d.renderer.globalAnimation=a.pick(h,d.options.chart.animation,!0)};a.animObject=function(h){return a.isObject(h)?a.merge(h):
	{duration:h?500:0}};a.timeUnits={millisecond:1,second:1E3,minute:6E4,hour:36E5,day:864E5,week:6048E5,month:24192E5,year:314496E5};a.numberFormat=function(h,d,v,t){h=+h||0;d=+d;var r=a.defaultOptions.lang,p=(h.toString().split(".")[1]||"").split("e")[0].length,m,f,q=h.toString().split("e");-1===d?d=Math.min(p,20):a.isNumber(d)?d&&q[1]&&0>q[1]&&(m=d+ +q[1],0<=m?(q[0]=(+q[0]).toExponential(m).split("e")[0],d=m):(q[0]=q[0].split(".")[0]||0,h=20>d?(q[0]*Math.pow(10,q[1])).toFixed(d):0,q[1]=0)):d=2;f=(Math.abs(q[1]?
	q[0]:h)+Math.pow(10,-Math.max(d,p)-1)).toFixed(d);p=String(a.pInt(f));m=3<p.length?p.length%3:0;v=a.pick(v,r.decimalPoint);t=a.pick(t,r.thousandsSep);h=(0>h?"-":"")+(m?p.substr(0,m)+t:"");h+=p.substr(m).replace(/(\d{3})(?=\d)/g,"$1"+t);d&&(h+=v+f.slice(-d));q[1]&&0!==+h&&(h+="e"+q[1]);return h};Math.easeInOutSine=function(a){return-.5*(Math.cos(Math.PI*a)-1)};a.getStyle=function(h,d,v){if("width"===d)return Math.min(h.offsetWidth,h.scrollWidth)-a.getStyle(h,"padding-left")-a.getStyle(h,"padding-right");
	if("height"===d)return Math.min(h.offsetHeight,h.scrollHeight)-a.getStyle(h,"padding-top")-a.getStyle(h,"padding-bottom");y.getComputedStyle||a.error(27,!0);if(h=y.getComputedStyle(h,void 0))h=h.getPropertyValue(d),a.pick(v,"opacity"!==d)&&(h=a.pInt(h));return h};a.inArray=function(h,d){return(a.indexOfPolyfill||Array.prototype.indexOf).call(d,h)};a.grep=function(h,d){return(a.filterPolyfill||Array.prototype.filter).call(h,d)};a.find=Array.prototype.find?function(a,d){return a.find(d)}:function(a,
	d){var h,t=a.length;for(h=0;h<t;h++)if(d(a[h],h))return a[h]};a.map=function(a,d){for(var h=[],t=0,r=a.length;t<r;t++)h[t]=d.call(a[t],a[t],t,a);return h};a.keys=function(h){return(a.keysPolyfill||Object.keys).call(void 0,h)};a.reduce=function(h,d,v){return(a.reducePolyfill||Array.prototype.reduce).call(h,d,v)};a.offset=function(a){var d=A.documentElement;a=a.parentElement?a.getBoundingClientRect():{top:0,left:0};return{top:a.top+(y.pageYOffset||d.scrollTop)-(d.clientTop||0),left:a.left+(y.pageXOffset||
	d.scrollLeft)-(d.clientLeft||0)}};a.stop=function(h,d){for(var v=a.timers.length;v--;)a.timers[v].elem!==h||d&&d!==a.timers[v].prop||(a.timers[v].stopped=!0)};a.each=function(h,d,v){return(a.forEachPolyfill||Array.prototype.forEach).call(h,d,v)};a.objectEach=function(a,d,v){for(var h in a)a.hasOwnProperty(h)&&d.call(v,a[h],h,a)};a.addEvent=function(h,d,v){var t,r,p=h.addEventListener||a.addEventListenerPolyfill;h.hcEvents&&!Object.prototype.hasOwnProperty.call(h,"hcEvents")&&(r={},a.objectEach(h.hcEvents,
	function(a,f){r[f]=a.slice(0)}),h.hcEvents=r);t=h.hcEvents=h.hcEvents||{};p&&p.call(h,d,v,!1);t[d]||(t[d]=[]);t[d].push(v);return function(){a.removeEvent(h,d,v)}};a.removeEvent=function(h,d,v){function t(f,m){var c=h.removeEventListener||a.removeEventListenerPolyfill;c&&c.call(h,f,m,!1)}function r(){var f,l;h.nodeName&&(d?(f={},f[d]=!0):f=m,a.objectEach(f,function(a,g){if(m[g])for(l=m[g].length;l--;)t(g,m[g][l])}))}var p,m=h.hcEvents,f;m&&(d?(p=m[d]||[],v?(f=a.inArray(v,p),-1<f&&(p.splice(f,1),m[d]=
	p),t(d,v)):(r(),m[d]=[])):(r(),h.hcEvents={}))};a.fireEvent=function(h,d,v,t){var r;r=h.hcEvents;var p,m;v=v||{};if(A.createEvent&&(h.dispatchEvent||h.fireEvent))r=A.createEvent("Events"),r.initEvent(d,!0,!0),a.extend(r,v),h.dispatchEvent?h.dispatchEvent(r):h.fireEvent(d,r);else if(r)for(r=r[d]||[],p=r.length,v.target||a.extend(v,{preventDefault:function(){v.defaultPrevented=!0},target:h,type:d}),d=0;d<p;d++)(m=r[d])&&!1===m.call(h,v)&&v.preventDefault();t&&!v.defaultPrevented&&t(v)};a.animate=function(h,
	d,v){var t,r="",p,m,f;a.isObject(v)||(f=arguments,v={duration:f[2],easing:f[3],complete:f[4]});a.isNumber(v.duration)||(v.duration=400);v.easing="function"===typeof v.easing?v.easing:Math[v.easing]||Math.easeInOutSine;v.curAnim=a.merge(d);a.objectEach(d,function(f,l){a.stop(h,l);m=new a.Fx(h,v,l);p=null;"d"===l?(m.paths=m.initPath(h,h.d,d.d),m.toD=d.d,t=0,p=1):h.attr?t=h.attr(l):(t=parseFloat(a.getStyle(h,l))||0,"opacity"!==l&&(r="px"));p||(p=f);p&&p.match&&p.match("px")&&(p=p.replace(/px/g,""));
	m.run(t,p,r)})};a.seriesType=function(h,d,v,t,r){var p=a.getOptions(),m=a.seriesTypes;p.plotOptions[h]=a.merge(p.plotOptions[d],v);m[h]=a.extendClass(m[d]||function(){},t);m[h].prototype.type=h;r&&(m[h].prototype.pointClass=a.extendClass(a.Point,r));return m[h]};a.uniqueKey=function(){var a=Math.random().toString(36).substring(2,9),d=0;return function(){return"highcharts-"+a+"-"+d++}}();y.jQuery&&(y.jQuery.fn.highcharts=function(){var h=[].slice.call(arguments);if(this[0])return h[0]?(new (a[a.isString(h[0])?
	h.shift():"Chart"])(this[0],h[0],h[1]),this):z[a.attr(this[0],"data-highcharts-chart")]})})(J);(function(a){var z=a.each,A=a.isNumber,y=a.map,h=a.merge,d=a.pInt;a.Color=function(d){if(!(this instanceof a.Color))return new a.Color(d);this.init(d)};a.Color.prototype={parsers:[{regex:/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,parse:function(a){return[d(a[1]),d(a[2]),d(a[3]),parseFloat(a[4],10)]}},{regex:/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
	parse:function(a){return[d(a[1]),d(a[2]),d(a[3]),1]}}],names:{none:"rgba(255,255,255,0)",white:"#ffffff",black:"#000000"},init:function(d){var h,r,p,m;if((this.input=d=this.names[d&&d.toLowerCase?d.toLowerCase():""]||d)&&d.stops)this.stops=y(d.stops,function(f){return new a.Color(f[1])});else if(d&&d.charAt&&"#"===d.charAt()&&(h=d.length,d=parseInt(d.substr(1),16),7===h?r=[(d&16711680)>>16,(d&65280)>>8,d&255,1]:4===h&&(r=[(d&3840)>>4|(d&3840)>>8,(d&240)>>4|d&240,(d&15)<<4|d&15,1])),!r)for(p=this.parsers.length;p--&&
	!r;)m=this.parsers[p],(h=m.regex.exec(d))&&(r=m.parse(h));this.rgba=r||[]},get:function(a){var d=this.input,r=this.rgba,p;this.stops?(p=h(d),p.stops=[].concat(p.stops),z(this.stops,function(m,f){p.stops[f]=[p.stops[f][0],m.get(a)]})):p=r&&A(r[0])?"rgb"===a||!a&&1===r[3]?"rgb("+r[0]+","+r[1]+","+r[2]+")":"a"===a?r[3]:"rgba("+r.join(",")+")":d;return p},brighten:function(a){var h,r=this.rgba;if(this.stops)z(this.stops,function(d){d.brighten(a)});else if(A(a)&&0!==a)for(h=0;3>h;h++)r[h]+=d(255*a),0>
	r[h]&&(r[h]=0),255<r[h]&&(r[h]=255);return this},setOpacity:function(a){this.rgba[3]=a;return this},tweenTo:function(a,d){var h=this.rgba,p=a.rgba;p.length&&h&&h.length?(a=1!==p[3]||1!==h[3],d=(a?"rgba(":"rgb(")+Math.round(p[0]+(h[0]-p[0])*(1-d))+","+Math.round(p[1]+(h[1]-p[1])*(1-d))+","+Math.round(p[2]+(h[2]-p[2])*(1-d))+(a?","+(p[3]+(h[3]-p[3])*(1-d)):"")+")"):d=a.input||"none";return d}};a.color=function(d){return new a.Color(d)}})(J);(function(a){function z(){var d=a.defaultOptions.global,h=
	t.moment;if(d.timezone){if(h)return function(a){return-h.tz(a,d.timezone).utcOffset()};a.error(25)}return d.useUTC&&d.getTimezoneOffset}function A(){var d=a.defaultOptions.global,p,m=d.useUTC,f=m?"getUTC":"get",q=m?"setUTC":"set",l="Minutes Hours Day Date Month FullYear".split(" "),c=l.concat(["Milliseconds","Seconds"]);a.Date=p=d.Date||t.Date;p.hcTimezoneOffset=m&&d.timezoneOffset;p.hcGetTimezoneOffset=z();p.hcHasTimeZone=!(!p.hcTimezoneOffset&&!p.hcGetTimezoneOffset);p.hcMakeTime=function(a,b,e,
	c,f,d){var g;m?(g=p.UTC.apply(0,arguments),g+=h(g)):g=(new p(a,b,v(e,1),v(c,0),v(f,0),v(d,0))).getTime();return g};for(d=0;d<l.length;d++)p["hcGet"+l[d]]=f+l[d];for(d=0;d<c.length;d++)p["hcSet"+c[d]]=q+c[d]}var y=a.color,h=a.getTZOffset,d=a.merge,v=a.pick,t=a.win;a.defaultOptions={colors:"#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),symbols:["circle","diamond","square","triangle","triangle-down"],lang:{loading:"Loading...",months:"January February March April May June July August September October November December".split(" "),
	shortMonths:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),weekdays:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),decimalPoint:".",numericSymbols:"kMGTPE".split(""),resetZoom:"Reset zoom",resetZoomTitle:"Reset zoom level 1:1",thousandsSep:" "},global:{useUTC:!0},chart:{borderRadius:0,defaultSeriesType:"line",ignoreHiddenSeries:!0,spacing:[10,10,15,10],resetZoomButton:{theme:{zIndex:6},position:{align:"right",x:-10,y:10}},width:null,height:null,borderColor:"#335cad",
	backgroundColor:"#ffffff",plotBorderColor:"#cccccc"},title:{text:"Chart title",align:"center",margin:15,widthAdjust:-44},subtitle:{text:"",align:"center",widthAdjust:-44},plotOptions:{},labels:{style:{position:"absolute",color:"#333333"}},legend:{enabled:!0,align:"center",layout:"horizontal",labelFormatter:function(){return this.name},borderColor:"#999999",borderRadius:0,navigation:{activeColor:"#003399",inactiveColor:"#cccccc"},itemStyle:{color:"#333333",fontSize:"12px",fontWeight:"bold",textOverflow:"ellipsis"},
	itemHoverStyle:{color:"#000000"},itemHiddenStyle:{color:"#cccccc"},shadow:!1,itemCheckboxStyle:{position:"absolute",width:"13px",height:"13px"},squareSymbol:!0,symbolPadding:5,verticalAlign:"bottom",x:0,y:0,title:{style:{fontWeight:"bold"}}},loading:{labelStyle:{fontWeight:"bold",position:"relative",top:"45%"},style:{position:"absolute",backgroundColor:"#ffffff",opacity:.5,textAlign:"center"}},tooltip:{enabled:!0,animation:a.svg,borderRadius:3,dateTimeLabelFormats:{millisecond:"%A, %b %e, %H:%M:%S.%L",
	second:"%A, %b %e, %H:%M:%S",minute:"%A, %b %e, %H:%M",hour:"%A, %b %e, %H:%M",day:"%A, %b %e, %Y",week:"Week from %A, %b %e, %Y",month:"%B %Y",year:"%Y"},footerFormat:"",padding:8,snap:a.isTouchDevice?25:10,backgroundColor:y("#f7f7f7").setOpacity(.85).get(),borderWidth:1,headerFormat:'\x3cspan style\x3d"font-size: 10px"\x3e{point.key}\x3c/span\x3e\x3cbr/\x3e',pointFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e',shadow:!0,
	style:{color:"#333333",cursor:"default",fontSize:"12px",pointerEvents:"none",whiteSpace:"nowrap"}},credits:{enabled:!0,href:"http://www.highcharts.com",position:{align:"right",x:-10,verticalAlign:"bottom",y:-5},style:{cursor:"pointer",color:"#999999",fontSize:"9px"},text:"Highcharts.com"}};a.setOptions=function(h){a.defaultOptions=d(!0,a.defaultOptions,h);A();return a.defaultOptions};a.getOptions=function(){return a.defaultOptions};a.defaultPlotOptions=a.defaultOptions.plotOptions;A()})(J);(function(a){var z,
	A,y=a.addEvent,h=a.animate,d=a.attr,v=a.charts,t=a.color,r=a.css,p=a.createElement,m=a.defined,f=a.deg2rad,q=a.destroyObjectProperties,l=a.doc,c=a.each,g=a.extend,b=a.erase,e=a.grep,n=a.hasTouch,D=a.inArray,I=a.isArray,E=a.isFirefox,M=a.isMS,u=a.isObject,C=a.isString,N=a.isWebKit,x=a.merge,F=a.noop,G=a.objectEach,H=a.pick,k=a.pInt,w=a.removeEvent,P=a.stop,K=a.svg,O=a.SVG_NS,L=a.symbolSizes,R=a.win;z=a.SVGElement=function(){return this};g(z.prototype,{opacity:1,SVG_NS:O,textProps:"direction fontSize fontWeight fontFamily fontStyle color lineHeight width textAlign textDecoration textOverflow textOutline".split(" "),
	init:function(a,b){this.element="span"===b?p(b):l.createElementNS(this.SVG_NS,b);this.renderer=a},animate:function(b,k,w){k=a.animObject(H(k,this.renderer.globalAnimation,!0));0!==k.duration?(w&&(k.complete=w),h(this,b,k)):(this.attr(b,null,w),k.step&&k.step.call(this));return this},colorGradient:function(b,k,w){var B=this.renderer,e,g,n,Q,f,d,K,l,L,F,q=[],u;b.radialGradient?g="radialGradient":b.linearGradient&&(g="linearGradient");g&&(n=b[g],f=B.gradients,K=b.stops,F=w.radialReference,I(n)&&(b[g]=
	n={x1:n[0],y1:n[1],x2:n[2],y2:n[3],gradientUnits:"userSpaceOnUse"}),"radialGradient"===g&&F&&!m(n.gradientUnits)&&(Q=n,n=x(n,B.getRadialAttr(F,Q),{gradientUnits:"userSpaceOnUse"})),G(n,function(a,b){"id"!==b&&q.push(b,a)}),G(K,function(a){q.push(a)}),q=q.join(","),f[q]?F=f[q].attr("id"):(n.id=F=a.uniqueKey(),f[q]=d=B.createElement(g).attr(n).add(B.defs),d.radAttr=Q,d.stops=[],c(K,function(b){0===b[1].indexOf("rgba")?(e=a.color(b[1]),l=e.get("rgb"),L=e.get("a")):(l=b[1],L=1);b=B.createElement("stop").attr({offset:b[0],
	"stop-color":l,"stop-opacity":L}).add(d);d.stops.push(b)})),u="url("+B.url+"#"+F+")",w.setAttribute(k,u),w.gradient=q,b.toString=function(){return u})},applyTextOutline:function(B){var k=this.element,w,e,g,n,f;-1!==B.indexOf("contrast")&&(B=B.replace(/contrast/g,this.renderer.getContrast(k.style.fill)));B=B.split(" ");e=B[B.length-1];if((g=B[0])&&"none"!==g&&a.svg){this.fakeTS=!0;B=[].slice.call(k.getElementsByTagName("tspan"));this.ySetter=this.xSetter;g=g.replace(/(^[\d\.]+)(.*?)$/g,function(a,
	b,B){return 2*b+B});for(f=B.length;f--;)w=B[f],"highcharts-text-outline"===w.getAttribute("class")&&b(B,k.removeChild(w));n=k.firstChild;c(B,function(a,b){0===b&&(a.setAttribute("x",k.getAttribute("x")),b=k.getAttribute("y"),a.setAttribute("y",b||0),null===b&&k.setAttribute("y",0));a=a.cloneNode(1);d(a,{"class":"highcharts-text-outline",fill:e,stroke:e,"stroke-width":g,"stroke-linejoin":"round"});k.insertBefore(a,n)})}},attr:function(a,b,k,w){var B,e=this.element,g,c=this,n,f;"string"===typeof a&&
	void 0!==b&&(B=a,a={},a[B]=b);"string"===typeof a?c=(this[a+"Getter"]||this._defaultGetter).call(this,a,e):(G(a,function(b,B){n=!1;w||P(this,B);this.symbolName&&/^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)$/.test(B)&&(g||(this.symbolAttr(a),g=!0),n=!0);!this.rotation||"x"!==B&&"y"!==B||(this.doTransform=!0);n||(f=this[B+"Setter"]||this._defaultSetter,f.call(this,b,B,e),this.shadows&&/^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(B)&&this.updateShadows(B,b,f))},this),this.afterSetters());
	k&&k();return c},afterSetters:function(){this.doTransform&&(this.updateTransform(),this.doTransform=!1)},updateShadows:function(a,b,k){for(var B=this.shadows,w=B.length;w--;)k.call(B[w],"height"===a?Math.max(b-(B[w].cutHeight||0),0):"d"===a?this.d:b,a,B[w])},addClass:function(a,b){var B=this.attr("class")||"";-1===B.indexOf(a)&&(b||(a=(B+(B?" ":"")+a).replace("  "," ")),this.attr("class",a));return this},hasClass:function(a){return-1!==D(a,(this.attr("class")||"").split(" "))},removeClass:function(a){return this.attr("class",
	(this.attr("class")||"").replace(a,""))},symbolAttr:function(a){var b=this;c("x y r start end width height innerR anchorX anchorY".split(" "),function(B){b[B]=H(a[B],b[B])});b.attr({d:b.renderer.symbols[b.symbolName](b.x,b.y,b.width,b.height,b)})},clip:function(a){return this.attr("clip-path",a?"url("+this.renderer.url+"#"+a.id+")":"none")},crisp:function(a,b){var B;b=b||a.strokeWidth||0;B=Math.round(b)%2/2;a.x=Math.floor(a.x||this.x||0)+B;a.y=Math.floor(a.y||this.y||0)+B;a.width=Math.floor((a.width||
	this.width||0)-2*B);a.height=Math.floor((a.height||this.height||0)-2*B);m(a.strokeWidth)&&(a.strokeWidth=b);return a},css:function(a){var b=this.styles,B={},w=this.element,e,c="",n,f=!b,x=["textOutline","textOverflow","width"];a&&a.color&&(a.fill=a.color);b&&G(a,function(a,k){a!==b[k]&&(B[k]=a,f=!0)});f&&(b&&(a=g(b,B)),e=this.textWidth=a&&a.width&&"auto"!==a.width&&"text"===w.nodeName.toLowerCase()&&k(a.width),this.styles=a,e&&!K&&this.renderer.forExport&&delete a.width,M&&!K?r(this.element,a):(n=
	function(a,b){return"-"+b.toLowerCase()},G(a,function(a,b){-1===D(b,x)&&(c+=b.replace(/([A-Z])/g,n)+":"+a+";")}),c&&d(w,"style",c)),this.added&&("text"===this.element.nodeName&&this.renderer.buildText(this),a&&a.textOutline&&this.applyTextOutline(a.textOutline)));return this},strokeWidth:function(){return this["stroke-width"]||0},on:function(a,b){var B=this,k=B.element;n&&"click"===a?(k.ontouchstart=function(a){B.touchEventFired=Date.now();a.preventDefault();b.call(k,a)},k.onclick=function(a){(-1===
	R.navigator.userAgent.indexOf("Android")||1100<Date.now()-(B.touchEventFired||0))&&b.call(k,a)}):k["on"+a]=b;return this},setRadialReference:function(a){var b=this.renderer.gradients[this.element.gradient];this.element.radialReference=a;b&&b.radAttr&&b.animate(this.renderer.getRadialAttr(a,b.radAttr));return this},translate:function(a,b){return this.attr({translateX:a,translateY:b})},invert:function(a){this.inverted=a;this.updateTransform();return this},updateTransform:function(){var a=this.translateX||
	0,b=this.translateY||0,k=this.scaleX,w=this.scaleY,e=this.inverted,g=this.rotation,c=this.matrix,n=this.element;e&&(a+=this.width,b+=this.height);a=["translate("+a+","+b+")"];m(c)&&a.push("matrix("+c.join(",")+")");e?a.push("rotate(90) scale(-1,1)"):g&&a.push("rotate("+g+" "+H(this.rotationOriginX,n.getAttribute("x"),0)+" "+H(this.rotationOriginY,n.getAttribute("y")||0)+")");(m(k)||m(w))&&a.push("scale("+H(k,1)+" "+H(w,1)+")");a.length&&n.setAttribute("transform",a.join(" "))},toFront:function(){var a=
	this.element;a.parentNode.appendChild(a);return this},align:function(a,k,w){var B,e,g,c,n={};e=this.renderer;g=e.alignedObjects;var f,x;if(a){if(this.alignOptions=a,this.alignByTranslate=k,!w||C(w))this.alignTo=B=w||"renderer",b(g,this),g.push(this),w=null}else a=this.alignOptions,k=this.alignByTranslate,B=this.alignTo;w=H(w,e[B],e);B=a.align;e=a.verticalAlign;g=(w.x||0)+(a.x||0);c=(w.y||0)+(a.y||0);"right"===B?f=1:"center"===B&&(f=2);f&&(g+=(w.width-(a.width||0))/f);n[k?"translateX":"x"]=Math.round(g);
	"bottom"===e?x=1:"middle"===e&&(x=2);x&&(c+=(w.height-(a.height||0))/x);n[k?"translateY":"y"]=Math.round(c);this[this.placed?"animate":"attr"](n);this.placed=!0;this.alignAttr=n;return this},getBBox:function(a,b){var k,B=this.renderer,w,e=this.element,n=this.styles,x,d=this.textStr,Q,K=B.cache,l=B.cacheKeys,L;b=H(b,this.rotation);w=b*f;x=n&&n.fontSize;m(d)&&(L=d.toString(),-1===L.indexOf("\x3c")&&(L=L.replace(/[0-9]/g,"0")),L+=["",b||0,x,n&&n.width,n&&n.textOverflow].join());L&&!a&&(k=K[L]);if(!k){if(e.namespaceURI===
	this.SVG_NS||B.forExport){try{(Q=this.fakeTS&&function(a){c(e.querySelectorAll(".highcharts-text-outline"),function(b){b.style.display=a})})&&Q("none"),k=e.getBBox?g({},e.getBBox()):{width:e.offsetWidth,height:e.offsetHeight},Q&&Q("")}catch(W){}if(!k||0>k.width)k={width:0,height:0}}else k=this.htmlGetBBox();B.isSVG&&(a=k.width,B=k.height,n&&"11px"===n.fontSize&&17===Math.round(B)&&(k.height=B=14),b&&(k.width=Math.abs(B*Math.sin(w))+Math.abs(a*Math.cos(w)),k.height=Math.abs(B*Math.cos(w))+Math.abs(a*
	Math.sin(w))));if(L&&0<k.height){for(;250<l.length;)delete K[l.shift()];K[L]||l.push(L);K[L]=k}}return k},show:function(a){return this.attr({visibility:a?"inherit":"visible"})},hide:function(){return this.attr({visibility:"hidden"})},fadeOut:function(a){var b=this;b.animate({opacity:0},{duration:a||150,complete:function(){b.attr({y:-9999})}})},add:function(a){var b=this.renderer,k=this.element,B;a&&(this.parentGroup=a);this.parentInverted=a&&a.inverted;void 0!==this.textStr&&b.buildText(this);this.added=
	!0;if(!a||a.handleZ||this.zIndex)B=this.zIndexSetter();B||(a?a.element:b.box).appendChild(k);if(this.onAdd)this.onAdd();return this},safeRemoveChild:function(a){var b=a.parentNode;b&&b.removeChild(a)},destroy:function(){var a=this,k=a.element||{},w=a.renderer.isSVG&&"SPAN"===k.nodeName&&a.parentGroup,e=k.ownerSVGElement;k.onclick=k.onmouseout=k.onmouseover=k.onmousemove=k.point=null;P(a);a.clipPath&&e&&(c(e.querySelectorAll("[clip-path],[CLIP-PATH]"),function(b){b.getAttribute("clip-path").match(RegExp('[("]#'+
	a.clipPath.element.id+'[)"]'))&&b.removeAttribute("clip-path")}),a.clipPath=a.clipPath.destroy());if(a.stops){for(e=0;e<a.stops.length;e++)a.stops[e]=a.stops[e].destroy();a.stops=null}a.safeRemoveChild(k);for(a.destroyShadows();w&&w.div&&0===w.div.childNodes.length;)k=w.parentGroup,a.safeRemoveChild(w.div),delete w.div,w=k;a.alignTo&&b(a.renderer.alignedObjects,a);G(a,function(b,k){delete a[k]});return null},shadow:function(a,b,k){var w=[],e,B,g=this.element,c,n,f,x;if(!a)this.destroyShadows();else if(!this.shadows){n=
	H(a.width,3);f=(a.opacity||.15)/n;x=this.parentInverted?"(-1,-1)":"("+H(a.offsetX,1)+", "+H(a.offsetY,1)+")";for(e=1;e<=n;e++)B=g.cloneNode(0),c=2*n+1-2*e,d(B,{isShadow:"true",stroke:a.color||"#000000","stroke-opacity":f*e,"stroke-width":c,transform:"translate"+x,fill:"none"}),k&&(d(B,"height",Math.max(d(B,"height")-c,0)),B.cutHeight=c),b?b.element.appendChild(B):g.parentNode&&g.parentNode.insertBefore(B,g),w.push(B);this.shadows=w}return this},destroyShadows:function(){c(this.shadows||[],function(a){this.safeRemoveChild(a)},
	this);this.shadows=void 0},xGetter:function(a){"circle"===this.element.nodeName&&("x"===a?a="cx":"y"===a&&(a="cy"));return this._defaultGetter(a)},_defaultGetter:function(a){a=H(this[a+"Value"],this[a],this.element?this.element.getAttribute(a):null,0);/^[\-0-9\.]+$/.test(a)&&(a=parseFloat(a));return a},dSetter:function(a,b,k){a&&a.join&&(a=a.join(" "));/(NaN| {2}|^$)/.test(a)&&(a="M 0 0");this[b]!==a&&(k.setAttribute(b,a),this[b]=a)},dashstyleSetter:function(a){var b,w=this["stroke-width"];"inherit"===
	w&&(w=1);if(a=a&&a.toLowerCase()){a=a.replace("shortdashdotdot","3,1,1,1,1,1,").replace("shortdashdot","3,1,1,1").replace("shortdot","1,1,").replace("shortdash","3,1,").replace("longdash","8,3,").replace(/dot/g,"1,3,").replace("dash","4,3,").replace(/,$/,"").split(",");for(b=a.length;b--;)a[b]=k(a[b])*w;a=a.join(",").replace(/NaN/g,"none");this.element.setAttribute("stroke-dasharray",a)}},alignSetter:function(a){this.alignValue=a;this.element.setAttribute("text-anchor",{left:"start",center:"middle",
	right:"end"}[a])},opacitySetter:function(a,b,k){this[b]=a;k.setAttribute(b,a)},titleSetter:function(a){var b=this.element.getElementsByTagName("title")[0];b||(b=l.createElementNS(this.SVG_NS,"title"),this.element.appendChild(b));b.firstChild&&b.removeChild(b.firstChild);b.appendChild(l.createTextNode(String(H(a),"").replace(/<[^>]*>/g,"")))},textSetter:function(a){a!==this.textStr&&(delete this.bBox,this.textStr=a,this.added&&this.renderer.buildText(this))},fillSetter:function(a,b,k){"string"===typeof a?
	k.setAttribute(b,a):a&&this.colorGradient(a,b,k)},visibilitySetter:function(a,b,k){"inherit"===a?k.removeAttribute(b):this[b]!==a&&k.setAttribute(b,a);this[b]=a},zIndexSetter:function(a,b){var w=this.renderer,e=this.parentGroup,g=(e||w).element||w.box,c,n=this.element,B,f,w=g===w.box;c=this.added;var x;m(a)&&(n.zIndex=a,a=+a,this[b]===a&&(c=!1),this[b]=a);if(c){(a=this.zIndex)&&e&&(e.handleZ=!0);b=g.childNodes;for(x=b.length-1;0<=x&&!B;x--)if(e=b[x],c=e.zIndex,f=!m(c),e!==n)if(0>a&&f&&!w&&!x)g.insertBefore(n,
	b[x]),B=!0;else if(k(c)<=a||f&&(!m(a)||0<=a))g.insertBefore(n,b[x+1]||null),B=!0;B||(g.insertBefore(n,b[w?3:0]||null),B=!0)}return B},_defaultSetter:function(a,b,k){k.setAttribute(b,a)}});z.prototype.yGetter=z.prototype.xGetter;z.prototype.translateXSetter=z.prototype.translateYSetter=z.prototype.rotationSetter=z.prototype.verticalAlignSetter=z.prototype.rotationOriginXSetter=z.prototype.rotationOriginYSetter=z.prototype.scaleXSetter=z.prototype.scaleYSetter=z.prototype.matrixSetter=function(a,b){this[b]=
	a;this.doTransform=!0};z.prototype["stroke-widthSetter"]=z.prototype.strokeSetter=function(a,b,k){this[b]=a;this.stroke&&this["stroke-width"]?(z.prototype.fillSetter.call(this,this.stroke,"stroke",k),k.setAttribute("stroke-width",this["stroke-width"]),this.hasStroke=!0):"stroke-width"===b&&0===a&&this.hasStroke&&(k.removeAttribute("stroke"),this.hasStroke=!1)};A=a.SVGRenderer=function(){this.init.apply(this,arguments)};g(A.prototype,{Element:z,SVG_NS:O,init:function(a,b,k,w,e,g){var c;w=this.createElement("svg").attr({version:"1.1",
	"class":"highcharts-root"}).css(this.getStyle(w));c=w.element;a.appendChild(c);d(a,"dir","ltr");-1===a.innerHTML.indexOf("xmlns")&&d(c,"xmlns",this.SVG_NS);this.isSVG=!0;this.box=c;this.boxWrapper=w;this.alignedObjects=[];this.url=(E||N)&&l.getElementsByTagName("base").length?R.location.href.replace(/#.*?$/,"").replace(/<[^>]*>/g,"").replace(/([\('\)])/g,"\\$1").replace(/ /g,"%20"):"";this.createElement("desc").add().element.appendChild(l.createTextNode("Created with Highmaps 6.0.4"));this.defs=this.createElement("defs").add();
	this.allowHTML=g;this.forExport=e;this.gradients={};this.cache={};this.cacheKeys=[];this.imgCount=0;this.setSize(b,k,!1);var n;E&&a.getBoundingClientRect&&(b=function(){r(a,{left:0,top:0});n=a.getBoundingClientRect();r(a,{left:Math.ceil(n.left)-n.left+"px",top:Math.ceil(n.top)-n.top+"px"})},b(),this.unSubPixelFix=y(R,"resize",b))},getStyle:function(a){return this.style=g({fontFamily:'"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',fontSize:"12px"},a)},setStyle:function(a){this.boxWrapper.css(this.getStyle(a))},
	isHidden:function(){return!this.boxWrapper.getBBox().width},destroy:function(){var a=this.defs;this.box=null;this.boxWrapper=this.boxWrapper.destroy();q(this.gradients||{});this.gradients=null;a&&(this.defs=a.destroy());this.unSubPixelFix&&this.unSubPixelFix();return this.alignedObjects=null},createElement:function(a){var b=new this.Element;b.init(this,a);return b},draw:F,getRadialAttr:function(a,b){return{cx:a[0]-a[2]/2+b.cx*a[2],cy:a[1]-a[2]/2+b.cy*a[2],r:b.r*a[2]}},getSpanWidth:function(a,b){var k=
	a.getBBox(!0).width;!K&&this.forExport&&(k=this.measureSpanWidth(b.firstChild.data,a.styles));return k},applyEllipsis:function(a,b,k,w){var e=a.rotation,g=k,c,n=0,f=k.length,x=function(a){b.removeChild(b.firstChild);a&&b.appendChild(l.createTextNode(a))},B;a.rotation=0;g=this.getSpanWidth(a,b);if(B=g>w){for(;n<=f;)c=Math.ceil((n+f)/2),g=k.substring(0,c)+"\u2026",x(g),g=this.getSpanWidth(a,b),n===f?n=f+1:g>w?f=c-1:n=c;0===f&&x("")}a.rotation=e;return B},escapes:{"\x26":"\x26amp;","\x3c":"\x26lt;",
	"\x3e":"\x26gt;","'":"\x26#39;",'"':"\x26quot;"},buildText:function(a){var b=a.element,w=this,g=w.forExport,n=H(a.textStr,"").toString(),f=-1!==n.indexOf("\x3c"),x=b.childNodes,B,m,L,q,F=d(b,"x"),u=a.styles,h=a.textWidth,E=u&&u.lineHeight,C=u&&u.textOutline,D=u&&"ellipsis"===u.textOverflow,p=u&&"nowrap"===u.whiteSpace,P=u&&u.fontSize,I,R,v=x.length,u=h&&!a.added&&this.box,M=function(a){var e;e=/(px|em)$/.test(a&&a.style.fontSize)?a.style.fontSize:P||w.style.fontSize||12;return E?k(E):w.fontMetrics(e,
	a.getAttribute("style")?a:b).h},t=function(a){G(w.escapes,function(b,k){a=a.replace(new RegExp(b,"g"),k)});return a};I=[n,D,p,E,C,P,h].join();if(I!==a.textCache){for(a.textCache=I;v--;)b.removeChild(x[v]);f||C||D||h||-1!==n.indexOf(" ")?(B=/<.*class="([^"]+)".*>/,m=/<.*style="([^"]+)".*>/,L=/<.*href="([^"]+)".*>/,u&&u.appendChild(b),n=f?n.replace(/<(b|strong)>/g,'\x3cspan style\x3d"font-weight:bold"\x3e').replace(/<(i|em)>/g,'\x3cspan style\x3d"font-style:italic"\x3e').replace(/<a/g,"\x3cspan").replace(/<\/(b|strong|i|em|a)>/g,
	"\x3c/span\x3e").split(/<br.*?>/g):[n],n=e(n,function(a){return""!==a}),c(n,function(k,e){var n,f=0;k=k.replace(/^\s+|\s+$/g,"").replace(/<span/g,"|||\x3cspan").replace(/<\/span>/g,"\x3c/span\x3e|||");n=k.split("|||");c(n,function(k){if(""!==k||1===n.length){var c={},x=l.createElementNS(w.SVG_NS,"tspan"),u,G;B.test(k)&&(u=k.match(B)[1],d(x,"class",u));m.test(k)&&(G=k.match(m)[1].replace(/(;| |^)color([ :])/,"$1fill$2"),d(x,"style",G));L.test(k)&&!g&&(d(x,"onclick",'location.href\x3d"'+k.match(L)[1]+
	'"'),d(x,"class","highcharts-anchor"),r(x,{cursor:"pointer"}));k=t(k.replace(/<[a-zA-Z\/](.|\n)*?>/g,"")||" ");if(" "!==k){x.appendChild(l.createTextNode(k));f?c.dx=0:e&&null!==F&&(c.x=F);d(x,c);b.appendChild(x);!f&&R&&(!K&&g&&r(x,{display:"block"}),d(x,"dy",M(x)));if(h){c=k.replace(/([^\^])-/g,"$1- ").split(" ");u=1<n.length||e||1<c.length&&!p;var E=[],C,P=M(x),Q=a.rotation;for(D&&(q=w.applyEllipsis(a,x,k,h));!D&&u&&(c.length||E.length);)a.rotation=0,C=w.getSpanWidth(a,x),k=C>h,void 0===q&&(q=k),
	k&&1!==c.length?(x.removeChild(x.firstChild),E.unshift(c.pop())):(c=E,E=[],c.length&&!p&&(x=l.createElementNS(O,"tspan"),d(x,{dy:P,x:F}),G&&d(x,"style",G),b.appendChild(x)),C>h&&(h=C)),c.length&&x.appendChild(l.createTextNode(c.join(" ").replace(/- /g,"-")));a.rotation=Q}f++}}});R=R||b.childNodes.length}),q&&a.attr("title",a.textStr),u&&u.removeChild(b),C&&a.applyTextOutline&&a.applyTextOutline(C)):b.appendChild(l.createTextNode(t(n)))}},getContrast:function(a){a=t(a).rgba;return 510<a[0]+a[1]+a[2]?
	"#000000":"#FFFFFF"},button:function(a,b,k,w,e,c,n,f,d){var B=this.label(a,b,k,d,null,null,null,null,"button"),K=0;B.attr(x({padding:8,r:2},e));var m,L,l,q;e=x({fill:"#f7f7f7",stroke:"#cccccc","stroke-width":1,style:{color:"#333333",cursor:"pointer",fontWeight:"normal"}},e);m=e.style;delete e.style;c=x(e,{fill:"#e6e6e6"},c);L=c.style;delete c.style;n=x(e,{fill:"#e6ebf5",style:{color:"#000000",fontWeight:"bold"}},n);l=n.style;delete n.style;f=x(e,{style:{color:"#cccccc"}},f);q=f.style;delete f.style;
	y(B.element,M?"mouseover":"mouseenter",function(){3!==K&&B.setState(1)});y(B.element,M?"mouseout":"mouseleave",function(){3!==K&&B.setState(K)});B.setState=function(a){1!==a&&(B.state=K=a);B.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-"+["normal","hover","pressed","disabled"][a||0]);B.attr([e,c,n,f][a||0]).css([m,L,l,q][a||0])};B.attr(e).css(g({cursor:"default"},m));return B.on("click",function(a){3!==K&&w.call(B,a)})},crispLine:function(a,b){a[1]===
	a[4]&&(a[1]=a[4]=Math.round(a[1])-b%2/2);a[2]===a[5]&&(a[2]=a[5]=Math.round(a[2])+b%2/2);return a},path:function(a){var b={fill:"none"};I(a)?b.d=a:u(a)&&g(b,a);return this.createElement("path").attr(b)},circle:function(a,b,k){a=u(a)?a:{x:a,y:b,r:k};b=this.createElement("circle");b.xSetter=b.ySetter=function(a,b,k){k.setAttribute("c"+b,a)};return b.attr(a)},arc:function(a,b,k,w,e,g){u(a)?(w=a,b=w.y,k=w.r,a=w.x):w={innerR:w,start:e,end:g};a=this.symbol("arc",a,b,k,k,w);a.r=k;return a},rect:function(a,
	b,k,w,e,g){e=u(a)?a.r:e;var c=this.createElement("rect");a=u(a)?a:void 0===a?{}:{x:a,y:b,width:Math.max(k,0),height:Math.max(w,0)};void 0!==g&&(a.strokeWidth=g,a=c.crisp(a));a.fill="none";e&&(a.r=e);c.rSetter=function(a,b,k){d(k,{rx:a,ry:a})};return c.attr(a)},setSize:function(a,b,k){var w=this.alignedObjects,e=w.length;this.width=a;this.height=b;for(this.boxWrapper.animate({width:a,height:b},{step:function(){this.attr({viewBox:"0 0 "+this.attr("width")+" "+this.attr("height")})},duration:H(k,!0)?
	void 0:0});e--;)w[e].align()},g:function(a){var b=this.createElement("g");return a?b.attr({"class":"highcharts-"+a}):b},image:function(a,b,k,w,e){var c={preserveAspectRatio:"none"};1<arguments.length&&g(c,{x:b,y:k,width:w,height:e});c=this.createElement("image").attr(c);c.element.setAttributeNS?c.element.setAttributeNS("http://www.w3.org/1999/xlink","href",a):c.element.setAttribute("hc-svg-href",a);return c},symbol:function(a,b,k,w,e,n){var x=this,f,d=/^url\((.*?)\)$/,K=d.test(a),B=!K&&(this.symbols[a]?
	a:"circle"),q=B&&this.symbols[B],F=m(b)&&q&&q.call(this.symbols,Math.round(b),Math.round(k),w,e,n),u,h;q?(f=this.path(F),f.attr("fill","none"),g(f,{symbolName:B,x:b,y:k,width:w,height:e}),n&&g(f,n)):K&&(u=a.match(d)[1],f=this.image(u),f.imgwidth=H(L[u]&&L[u].width,n&&n.width),f.imgheight=H(L[u]&&L[u].height,n&&n.height),h=function(){f.attr({width:f.width,height:f.height})},c(["width","height"],function(a){f[a+"Setter"]=function(a,b){var k={},w=this["img"+b],e="width"===b?"translateX":"translateY";
	this[b]=a;m(w)&&(this.element&&this.element.setAttribute(b,w),this.alignByTranslate||(k[e]=((this[b]||0)-w)/2,this.attr(k)))}}),m(b)&&f.attr({x:b,y:k}),f.isImg=!0,m(f.imgwidth)&&m(f.imgheight)?h():(f.attr({width:0,height:0}),p("img",{onload:function(){var a=v[x.chartIndex];0===this.width&&(r(this,{position:"absolute",top:"-999em"}),l.body.appendChild(this));L[u]={width:this.width,height:this.height};f.imgwidth=this.width;f.imgheight=this.height;f.element&&h();this.parentNode&&this.parentNode.removeChild(this);
	x.imgCount--;if(!x.imgCount&&a&&a.onload)a.onload()},src:u}),this.imgCount++));return f},symbols:{circle:function(a,b,k,w){return this.arc(a+k/2,b+w/2,k/2,w/2,{start:0,end:2*Math.PI,open:!1})},square:function(a,b,k,w){return["M",a,b,"L",a+k,b,a+k,b+w,a,b+w,"Z"]},triangle:function(a,b,k,w){return["M",a+k/2,b,"L",a+k,b+w,a,b+w,"Z"]},"triangle-down":function(a,b,k,w){return["M",a,b,"L",a+k,b,a+k/2,b+w,"Z"]},diamond:function(a,b,k,w){return["M",a+k/2,b,"L",a+k,b+w/2,a+k/2,b+w,a,b+w/2,"Z"]},arc:function(a,
	b,k,w,e){var g=e.start,c=e.r||k,n=e.r||w||k,f=e.end-.001;k=e.innerR;w=H(e.open,.001>Math.abs(e.end-e.start-2*Math.PI));var x=Math.cos(g),d=Math.sin(g),K=Math.cos(f),f=Math.sin(f);e=.001>e.end-g-Math.PI?0:1;c=["M",a+c*x,b+n*d,"A",c,n,0,e,1,a+c*K,b+n*f];m(k)&&c.push(w?"M":"L",a+k*K,b+k*f,"A",k,k,0,e,0,a+k*x,b+k*d);c.push(w?"":"Z");return c},callout:function(a,b,k,w,e){var g=Math.min(e&&e.r||0,k,w),c=g+6,n=e&&e.anchorX;e=e&&e.anchorY;var f;f=["M",a+g,b,"L",a+k-g,b,"C",a+k,b,a+k,b,a+k,b+g,"L",a+k,b+w-
	g,"C",a+k,b+w,a+k,b+w,a+k-g,b+w,"L",a+g,b+w,"C",a,b+w,a,b+w,a,b+w-g,"L",a,b+g,"C",a,b,a,b,a+g,b];n&&n>k?e>b+c&&e<b+w-c?f.splice(13,3,"L",a+k,e-6,a+k+6,e,a+k,e+6,a+k,b+w-g):f.splice(13,3,"L",a+k,w/2,n,e,a+k,w/2,a+k,b+w-g):n&&0>n?e>b+c&&e<b+w-c?f.splice(33,3,"L",a,e+6,a-6,e,a,e-6,a,b+g):f.splice(33,3,"L",a,w/2,n,e,a,w/2,a,b+g):e&&e>w&&n>a+c&&n<a+k-c?f.splice(23,3,"L",n+6,b+w,n,b+w+6,n-6,b+w,a+g,b+w):e&&0>e&&n>a+c&&n<a+k-c&&f.splice(3,3,"L",n-6,b,n,b-6,n+6,b,k-g,b);return f}},clipRect:function(b,k,w,
	e){var g=a.uniqueKey(),c=this.createElement("clipPath").attr({id:g}).add(this.defs);b=this.rect(b,k,w,e,0).add(c);b.id=g;b.clipPath=c;b.count=0;return b},text:function(a,b,k,w){var e={};if(w&&(this.allowHTML||!this.forExport))return this.html(a,b,k);e.x=Math.round(b||0);k&&(e.y=Math.round(k));if(a||0===a)e.text=a;a=this.createElement("text").attr(e);w||(a.xSetter=function(a,b,k){var w=k.getElementsByTagName("tspan"),e,g=k.getAttribute(b),c;for(c=0;c<w.length;c++)e=w[c],e.getAttribute(b)===g&&e.setAttribute(b,
	a);k.setAttribute(b,a)});return a},fontMetrics:function(a,b){a=a||b&&b.style&&b.style.fontSize||this.style&&this.style.fontSize;a=/px/.test(a)?k(a):/em/.test(a)?parseFloat(a)*(b?this.fontMetrics(null,b.parentNode).f:16):12;b=24>a?a+3:Math.round(1.2*a);return{h:b,b:Math.round(.8*b),f:a}},rotCorr:function(a,b,k){var w=a;b&&k&&(w=Math.max(w*Math.cos(b*f),4));return{x:-a/3*Math.sin(b*f),y:w}},label:function(b,k,e,n,f,d,K,L,l){var q=this,u=q.g("button"!==l&&"label"),F=u.text=q.text("",0,0,K).attr({zIndex:1}),
	h,G,E=0,C=3,B=0,D,P,p,r,I,H={},O,R,v=/^url\((.*?)\)$/.test(n),M=v,t,Q,N,T;l&&u.addClass("highcharts-"+l);M=v;t=function(){return(O||0)%2/2};Q=function(){var a=F.element.style,b={};G=(void 0===D||void 0===P||I)&&m(F.textStr)&&F.getBBox();u.width=(D||G.width||0)+2*C+B;u.height=(P||G.height||0)+2*C;R=C+q.fontMetrics(a&&a.fontSize,F).b;M&&(h||(u.box=h=q.symbols[n]||v?q.symbol(n):q.rect(),h.addClass(("button"===l?"":"highcharts-label-box")+(l?" highcharts-"+l+"-box":"")),h.add(u),a=t(),b.x=a,b.y=(L?-R:
	0)+a),b.width=Math.round(u.width),b.height=Math.round(u.height),h.attr(g(b,H)),H={})};N=function(){var a=B+C,b;b=L?0:R;m(D)&&G&&("center"===I||"right"===I)&&(a+={center:.5,right:1}[I]*(D-G.width));if(a!==F.x||b!==F.y)F.attr("x",a),void 0!==b&&F.attr("y",b);F.x=a;F.y=b};T=function(a,b){h?h.attr(a,b):H[a]=b};u.onAdd=function(){F.add(u);u.attr({text:b||0===b?b:"",x:k,y:e});h&&m(f)&&u.attr({anchorX:f,anchorY:d})};u.widthSetter=function(b){D=a.isNumber(b)?b:null};u.heightSetter=function(a){P=a};u["text-alignSetter"]=
	function(a){I=a};u.paddingSetter=function(a){m(a)&&a!==C&&(C=u.padding=a,N())};u.paddingLeftSetter=function(a){m(a)&&a!==B&&(B=a,N())};u.alignSetter=function(a){a={left:0,center:.5,right:1}[a];a!==E&&(E=a,G&&u.attr({x:p}))};u.textSetter=function(a){void 0!==a&&F.textSetter(a);Q();N()};u["stroke-widthSetter"]=function(a,b){a&&(M=!0);O=this["stroke-width"]=a;T(b,a)};u.strokeSetter=u.fillSetter=u.rSetter=function(a,b){"r"!==b&&("fill"===b&&a&&(M=!0),u[b]=a);T(b,a)};u.anchorXSetter=function(a,b){f=u.anchorX=
	a;T(b,Math.round(a)-t()-p)};u.anchorYSetter=function(a,b){d=u.anchorY=a;T(b,a-r)};u.xSetter=function(a){u.x=a;E&&(a-=E*((D||G.width)+2*C));p=Math.round(a);u.attr("translateX",p)};u.ySetter=function(a){r=u.y=Math.round(a);u.attr("translateY",r)};var U=u.css;return g(u,{css:function(a){if(a){var b={};a=x(a);c(u.textProps,function(k){void 0!==a[k]&&(b[k]=a[k],delete a[k])});F.css(b)}return U.call(u,a)},getBBox:function(){return{width:G.width+2*C,height:G.height+2*C,x:G.x-C,y:G.y-C}},shadow:function(a){a&&
	(Q(),h&&h.shadow(a));return u},destroy:function(){w(u.element,"mouseenter");w(u.element,"mouseleave");F&&(F=F.destroy());h&&(h=h.destroy());z.prototype.destroy.call(u);u=q=Q=N=T=null}})}});a.Renderer=A})(J);(function(a){var z=a.attr,A=a.createElement,y=a.css,h=a.defined,d=a.each,v=a.extend,t=a.isFirefox,r=a.isMS,p=a.isWebKit,m=a.pick,f=a.pInt,q=a.SVGRenderer,l=a.win,c=a.wrap;v(a.SVGElement.prototype,{htmlCss:function(a){var b=this.element;if(b=a&&"SPAN"===b.tagName&&a.width)delete a.width,this.textWidth=
	b,this.updateTransform();a&&"ellipsis"===a.textOverflow&&(a.whiteSpace="nowrap",a.overflow="hidden");this.styles=v(this.styles,a);y(this.element,a);return this},htmlGetBBox:function(){var a=this.element;return{x:a.offsetLeft,y:a.offsetTop,width:a.offsetWidth,height:a.offsetHeight}},htmlUpdateTransform:function(){if(this.added){var a=this.renderer,b=this.element,e=this.translateX||0,c=this.translateY||0,m=this.x||0,l=this.y||0,q=this.textAlign||"left",r={left:0,center:.5,right:1}[q],u=this.styles;
	y(b,{marginLeft:e,marginTop:c});this.shadows&&d(this.shadows,function(a){y(a,{marginLeft:e+1,marginTop:c+1})});this.inverted&&d(b.childNodes,function(e){a.invertChild(e,b)});if("SPAN"===b.tagName){var C=this.rotation,v=f(this.textWidth),x=u&&u.whiteSpace,F=[C,q,b.innerHTML,this.textWidth,this.textAlign].join();F!==this.cTT&&(u=a.fontMetrics(b.style.fontSize).b,h(C)&&this.setSpanRotation(C,r,u),y(b,{width:"",whiteSpace:x||"nowrap"}),b.offsetWidth>v&&/[ \-]/.test(b.textContent||b.innerText)&&y(b,{width:v+
	"px",display:"block",whiteSpace:x||"normal"}),this.getSpanCorrection(b.offsetWidth,u,r,C,q));y(b,{left:m+(this.xCorr||0)+"px",top:l+(this.yCorr||0)+"px"});p&&(u=b.offsetHeight);this.cTT=F}}else this.alignOnAdd=!0},setSpanRotation:function(a,b,e){var c={},g=this.renderer.getTransformKey();c[g]=c.transform="rotate("+a+"deg)";c[g+(t?"Origin":"-origin")]=c.transformOrigin=100*b+"% "+e+"px";y(this.element,c)},getSpanCorrection:function(a,b,e){this.xCorr=-a*e;this.yCorr=-b}});v(q.prototype,{getTransformKey:function(){return r&&
	!/Edge/.test(l.navigator.userAgent)?"-ms-transform":p?"-webkit-transform":t?"MozTransform":l.opera?"-o-transform":""},html:function(a,b,e){var g=this.createElement("span"),f=g.element,l=g.renderer,q=l.isSVG,h=function(a,b){d(["opacity","visibility"],function(e){c(a,e+"Setter",function(a,e,g,c){a.call(this,e,g,c);b[g]=e})})};g.textSetter=function(a){a!==f.innerHTML&&delete this.bBox;this.textStr=a;f.innerHTML=m(a,"");g.htmlUpdateTransform()};q&&h(g,g.element.style);g.xSetter=g.ySetter=g.alignSetter=
	g.rotationSetter=function(a,b){"align"===b&&(b="textAlign");g[b]=a;g.htmlUpdateTransform()};g.attr({text:a,x:Math.round(b),y:Math.round(e)}).css({fontFamily:this.style.fontFamily,fontSize:this.style.fontSize,position:"absolute"});f.style.whiteSpace="nowrap";g.css=g.htmlCss;q&&(g.add=function(a){var b,e=l.box.parentNode,c=[];if(this.parentGroup=a){if(b=a.div,!b){for(;a;)c.push(a),a=a.parentGroup;d(c.reverse(),function(a){function n(b,k){a[k]=b;r?f[l.getTransformKey()]="translate("+(a.x||a.translateX)+
	"px,"+(a.y||a.translateY)+"px)":"translateX"===k?f.left=b+"px":f.top=b+"px";a.doTransform=!0}var f,k=z(a.element,"class");k&&(k={className:k});b=a.div=a.div||A("div",k,{position:"absolute",left:(a.translateX||0)+"px",top:(a.translateY||0)+"px",display:a.display,opacity:a.opacity,pointerEvents:a.styles&&a.styles.pointerEvents},b||e);f=b.style;v(a,{classSetter:function(a){return function(b){this.element.setAttribute("class",b);a.className=b}}(b),on:function(){c[0].div&&g.on.apply({element:c[0].div},
	arguments);return a},translateXSetter:n,translateYSetter:n});h(a,f)})}}else b=e;b.appendChild(f);g.added=!0;g.alignOnAdd&&g.htmlUpdateTransform();return g});return g}})})(J);(function(a){var z=a.correctFloat,A=a.defined,y=a.destroyObjectProperties,h=a.isNumber,d=a.merge,v=a.pick,t=a.deg2rad;a.Tick=function(a,d,m,f){this.axis=a;this.pos=d;this.type=m||"";this.isNewLabel=this.isNew=!0;m||f||this.addLabel()};a.Tick.prototype={addLabel:function(){var a=this.axis,h=a.options,m=a.chart,f=a.categories,q=
	a.names,l=this.pos,c=h.labels,g=a.tickPositions,b=l===g[0],e=l===g[g.length-1],q=f?v(f[l],q[l],l):l,f=this.label,g=g.info,n;a.isDatetimeAxis&&g&&(n=h.dateTimeLabelFormats[g.higherRanks[l]||g.unitName]);this.isFirst=b;this.isLast=e;h=a.labelFormatter.call({axis:a,chart:m,isFirst:b,isLast:e,dateTimeLabelFormat:n,value:a.isLog?z(a.lin2log(q)):q,pos:l});A(f)?f&&f.attr({text:h}):(this.labelLength=(this.label=f=A(h)&&c.enabled?m.renderer.text(h,0,0,c.useHTML).css(d(c.style)).add(a.labelGroup):null)&&f.getBBox().width,
	this.rotation=0)},getLabelSize:function(){return this.label?this.label.getBBox()[this.axis.horiz?"height":"width"]:0},handleOverflow:function(a){var d=this.axis,m=d.options.labels,f=a.x,q=d.chart.chartWidth,l=d.chart.spacing,c=v(d.labelLeft,Math.min(d.pos,l[3])),l=v(d.labelRight,Math.max(d.isRadial?0:d.pos+d.len,q-l[1])),g=this.label,b=this.rotation,e={left:0,center:.5,right:1}[d.labelAlign||g.attr("align")],n=g.getBBox().width,h=d.getSlotWidth(),r=h,E=1,M,u={};if(b||!1===m.overflow)0>b&&f-e*n<c?
	M=Math.round(f/Math.cos(b*t)-c):0<b&&f+e*n>l&&(M=Math.round((q-f)/Math.cos(b*t)));else if(q=f+(1-e)*n,f-e*n<c?r=a.x+r*(1-e)-c:q>l&&(r=l-a.x+r*e,E=-1),r=Math.min(h,r),r<h&&"center"===d.labelAlign&&(a.x+=E*(h-r-e*(h-Math.min(n,r)))),n>r||d.autoRotation&&(g.styles||{}).width)M=r;M&&(u.width=M,(m.style||{}).textOverflow||(u.textOverflow="ellipsis"),g.css(u))},getPosition:function(a,d,m,f){var q=this.axis,l=q.chart,c=f&&l.oldChartHeight||l.chartHeight;return{x:a?q.translate(d+m,null,null,f)+q.transB:q.left+
	q.offset+(q.opposite?(f&&l.oldChartWidth||l.chartWidth)-q.right-q.left:0),y:a?c-q.bottom+q.offset-(q.opposite?q.height:0):c-q.translate(d+m,null,null,f)-q.transB}},getLabelPosition:function(a,d,m,f,q,l,c,g){var b=this.axis,e=b.transA,n=b.reversed,h=b.staggerLines,r=b.tickRotCorr||{x:0,y:0},E=q.y,p=f||b.reserveSpaceDefault?0:-b.labelOffset*("center"===b.labelAlign?.5:1);A(E)||(E=0===b.side?m.rotation?-8:-m.getBBox().height:2===b.side?r.y+8:Math.cos(m.rotation*t)*(r.y-m.getBBox(!1,0).height/2));a=a+
	q.x+p+r.x-(l&&f?l*e*(n?-1:1):0);d=d+E-(l&&!f?l*e*(n?1:-1):0);h&&(m=c/(g||1)%h,b.opposite&&(m=h-m-1),d+=b.labelOffset/h*m);return{x:a,y:Math.round(d)}},getMarkPath:function(a,d,m,f,q,l){return l.crispLine(["M",a,d,"L",a+(q?0:-m),d+(q?m:0)],f)},renderGridLine:function(a,d,m){var f=this.axis,q=f.options,l=this.gridLine,c={},g=this.pos,b=this.type,e=f.tickmarkOffset,n=f.chart.renderer,h=b?b+"Grid":"grid",r=q[h+"LineWidth"],E=q[h+"LineColor"],q=q[h+"LineDashStyle"];l||(c.stroke=E,c["stroke-width"]=r,q&&
	(c.dashstyle=q),b||(c.zIndex=1),a&&(c.opacity=0),this.gridLine=l=n.path().attr(c).addClass("highcharts-"+(b?b+"-":"")+"grid-line").add(f.gridGroup));if(!a&&l&&(a=f.getPlotLinePath(g+e,l.strokeWidth()*m,a,!0)))l[this.isNew?"attr":"animate"]({d:a,opacity:d})},renderMark:function(a,d,m){var f=this.axis,h=f.options,l=f.chart.renderer,c=this.type,g=c?c+"Tick":"tick",b=f.tickSize(g),e=this.mark,n=!e,D=a.x;a=a.y;var p=v(h[g+"Width"],!c&&f.isXAxis?1:0),h=h[g+"Color"];b&&(f.opposite&&(b[0]=-b[0]),n&&(this.mark=
	e=l.path().addClass("highcharts-"+(c?c+"-":"")+"tick").add(f.axisGroup),e.attr({stroke:h,"stroke-width":p})),e[n?"attr":"animate"]({d:this.getMarkPath(D,a,b[0],e.strokeWidth()*m,f.horiz,l),opacity:d}))},renderLabel:function(a,d,m,f){var q=this.axis,l=q.horiz,c=q.options,g=this.label,b=c.labels,e=b.step,q=q.tickmarkOffset,n=!0,D=a.x;a=a.y;g&&h(D)&&(g.xy=a=this.getLabelPosition(D,a,g,l,b,q,f,e),this.isFirst&&!this.isLast&&!v(c.showFirstLabel,1)||this.isLast&&!this.isFirst&&!v(c.showLastLabel,1)?n=!1:
	!l||b.step||b.rotation||d||0===m||this.handleOverflow(a),e&&f%e&&(n=!1),n&&h(a.y)?(a.opacity=m,g[this.isNewLabel?"attr":"animate"](a),this.isNewLabel=!1):(g.attr("y",-9999),this.isNewLabel=!0))},render:function(a,d,m){var f=this.axis,h=f.horiz,l=this.getPosition(h,this.pos,f.tickmarkOffset,d),c=l.x,g=l.y,f=h&&c===f.pos+f.len||!h&&g===f.pos?-1:1;m=v(m,1);this.isActive=!0;this.renderGridLine(d,m,f);this.renderMark(l,m,f);this.renderLabel(l,d,m,a);this.isNew=!1},destroy:function(){y(this,this.axis)}}})(J);
	var V=function(a){var z=a.addEvent,A=a.animObject,y=a.arrayMax,h=a.arrayMin,d=a.color,v=a.correctFloat,t=a.defaultOptions,r=a.defined,p=a.deg2rad,m=a.destroyObjectProperties,f=a.each,q=a.extend,l=a.fireEvent,c=a.format,g=a.getMagnitude,b=a.grep,e=a.inArray,n=a.isArray,D=a.isNumber,I=a.isString,E=a.merge,M=a.normalizeTickInterval,u=a.objectEach,C=a.pick,N=a.removeEvent,x=a.splat,F=a.syncTimeout,G=a.Tick,H=function(){this.init.apply(this,arguments)};a.extend(H.prototype,{defaultOptions:{dateTimeLabelFormats:{millisecond:"%H:%M:%S.%L",
	second:"%H:%M:%S",minute:"%H:%M",hour:"%H:%M",day:"%e. %b",week:"%e. %b",month:"%b '%y",year:"%Y"},endOnTick:!1,labels:{enabled:!0,style:{color:"#666666",cursor:"default",fontSize:"11px"},x:0},maxPadding:.01,minorTickLength:2,minorTickPosition:"outside",minPadding:.01,startOfWeek:1,startOnTick:!1,tickLength:10,tickmarkPlacement:"between",tickPixelInterval:100,tickPosition:"outside",title:{align:"middle",style:{color:"#666666"}},type:"linear",minorGridLineColor:"#f2f2f2",minorGridLineWidth:1,minorTickColor:"#999999",
	lineColor:"#ccd6eb",lineWidth:1,gridLineColor:"#e6e6e6",tickColor:"#ccd6eb"},defaultYAxisOptions:{endOnTick:!0,tickPixelInterval:72,showLastLabel:!0,labels:{x:-8},maxPadding:.05,minPadding:.05,startOnTick:!0,title:{rotation:270,text:"Values"},stackLabels:{allowOverlap:!1,enabled:!1,formatter:function(){return a.numberFormat(this.total,-1)},style:{fontSize:"11px",fontWeight:"bold",color:"#000000",textOutline:"1px contrast"}},gridLineWidth:1,lineWidth:0},defaultLeftAxisOptions:{labels:{x:-15},title:{rotation:270}},
	defaultRightAxisOptions:{labels:{x:15},title:{rotation:90}},defaultBottomAxisOptions:{labels:{autoRotation:[-45],x:0},title:{rotation:0}},defaultTopAxisOptions:{labels:{autoRotation:[-45],x:0},title:{rotation:0}},init:function(a,b){var k=b.isX,w=this;w.chart=a;w.horiz=a.inverted&&!w.isZAxis?!k:k;w.isXAxis=k;w.coll=w.coll||(k?"xAxis":"yAxis");w.opposite=b.opposite;w.side=b.side||(w.horiz?w.opposite?0:2:w.opposite?1:3);w.setOptions(b);var g=this.options,c=g.type;w.labelFormatter=g.labels.formatter||
	w.defaultLabelFormatter;w.userOptions=b;w.minPixelPadding=0;w.reversed=g.reversed;w.visible=!1!==g.visible;w.zoomEnabled=!1!==g.zoomEnabled;w.hasNames="category"===c||!0===g.categories;w.categories=g.categories||w.hasNames;w.names=w.names||[];w.plotLinesAndBandsGroups={};w.isLog="logarithmic"===c;w.isDatetimeAxis="datetime"===c;w.positiveValuesOnly=w.isLog&&!w.allowNegativeLog;w.isLinked=r(g.linkedTo);w.ticks={};w.labelEdge=[];w.minorTicks={};w.plotLinesAndBands=[];w.alternateBands={};w.len=0;w.minRange=
	w.userMinRange=g.minRange||g.maxZoom;w.range=g.range;w.offset=g.offset||0;w.stacks={};w.oldStacks={};w.stacksTouched=0;w.max=null;w.min=null;w.crosshair=C(g.crosshair,x(a.options.tooltip.crosshairs)[k?0:1],!1);b=w.options.events;-1===e(w,a.axes)&&(k?a.axes.splice(a.xAxis.length,0,w):a.axes.push(w),a[w.coll].push(w));w.series=w.series||[];a.inverted&&!w.isZAxis&&k&&void 0===w.reversed&&(w.reversed=!0);u(b,function(a,b){z(w,b,a)});w.lin2log=g.linearToLogConverter||w.lin2log;w.isLog&&(w.val2lin=w.log2lin,
	w.lin2val=w.lin2log)},setOptions:function(a){this.options=E(this.defaultOptions,"yAxis"===this.coll&&this.defaultYAxisOptions,[this.defaultTopAxisOptions,this.defaultRightAxisOptions,this.defaultBottomAxisOptions,this.defaultLeftAxisOptions][this.side],E(t[this.coll],a))},defaultLabelFormatter:function(){var b=this.axis,w=this.value,e=b.categories,g=this.dateTimeLabelFormat,n=t.lang,f=n.numericSymbols,n=n.numericSymbolMagnitude||1E3,x=f&&f.length,d,u=b.options.labels.format,b=b.isLog?Math.abs(w):
	b.tickInterval;if(u)d=c(u,this);else if(e)d=w;else if(g)d=a.dateFormat(g,w);else if(x&&1E3<=b)for(;x--&&void 0===d;)e=Math.pow(n,x+1),b>=e&&0===10*w%e&&null!==f[x]&&0!==w&&(d=a.numberFormat(w/e,-1)+f[x]);void 0===d&&(d=1E4<=Math.abs(w)?a.numberFormat(w,-1):a.numberFormat(w,-1,void 0,""));return d},getSeriesExtremes:function(){var a=this,w=a.chart;a.hasVisibleSeries=!1;a.dataMin=a.dataMax=a.threshold=null;a.softThreshold=!a.isXAxis;a.buildStacks&&a.buildStacks();f(a.series,function(k){if(k.visible||
	!w.options.chart.ignoreHiddenSeries){var e=k.options,g=e.threshold,c;a.hasVisibleSeries=!0;a.positiveValuesOnly&&0>=g&&(g=null);if(a.isXAxis)e=k.xData,e.length&&(k=h(e),c=y(e),D(k)||k instanceof Date||(e=b(e,D),k=h(e)),a.dataMin=Math.min(C(a.dataMin,e[0],k),k),a.dataMax=Math.max(C(a.dataMax,e[0],c),c));else if(k.getExtremes(),c=k.dataMax,k=k.dataMin,r(k)&&r(c)&&(a.dataMin=Math.min(C(a.dataMin,k),k),a.dataMax=Math.max(C(a.dataMax,c),c)),r(g)&&(a.threshold=g),!e.softThreshold||a.positiveValuesOnly)a.softThreshold=
	!1}})},translate:function(a,b,e,g,c,n){var k=this.linkedParent||this,w=1,f=0,x=g?k.oldTransA:k.transA;g=g?k.oldMin:k.min;var d=k.minPixelPadding;c=(k.isOrdinal||k.isBroken||k.isLog&&c)&&k.lin2val;x||(x=k.transA);e&&(w*=-1,f=k.len);k.reversed&&(w*=-1,f-=w*(k.sector||k.len));b?(a=(a*w+f-d)/x+g,c&&(a=k.lin2val(a))):(c&&(a=k.val2lin(a)),a=D(g)?w*(a-g)*x+f+w*d+(D(n)?x*n:0):void 0);return a},toPixels:function(a,b){return this.translate(a,!1,!this.horiz,null,!0)+(b?0:this.pos)},toValue:function(a,b){return this.translate(a-
	(b?0:this.pos),!0,!this.horiz,null,!0)},getPlotLinePath:function(a,b,e,g,c){var k=this.chart,w=this.left,n=this.top,f,x,d=e&&k.oldChartHeight||k.chartHeight,u=e&&k.oldChartWidth||k.chartWidth,m;f=this.transB;var l=function(a,b,k){if(a<b||a>k)g?a=Math.min(Math.max(b,a),k):m=!0;return a};c=C(c,this.translate(a,null,null,e));a=e=Math.round(c+f);f=x=Math.round(d-c-f);D(c)?this.horiz?(f=n,x=d-this.bottom,a=e=l(a,w,w+this.width)):(a=w,e=u-this.right,f=x=l(f,n,n+this.height)):(m=!0,g=!1);return m&&!g?null:
	k.renderer.crispLine(["M",a,f,"L",e,x],b||1)},getLinearTickPositions:function(a,b,e){var k,w=v(Math.floor(b/a)*a);e=v(Math.ceil(e/a)*a);var g=[],c;v(w+a)===w&&(c=20);if(this.single)return[b];for(b=w;b<=e;){g.push(b);b=v(b+a,c);if(b===k)break;k=b}return g},getMinorTickInterval:function(){var a=this.options;return!0===a.minorTicks?C(a.minorTickInterval,"auto"):!1===a.minorTicks?null:a.minorTickInterval},getMinorTickPositions:function(){var a=this,b=a.options,e=a.tickPositions,g=a.minorTickInterval,
	c=[],n=a.pointRangePadding||0,x=a.min-n,n=a.max+n,d=n-x;if(d&&d/g<a.len/3)if(a.isLog)f(this.paddedTicks,function(b,k,w){k&&c.push.apply(c,a.getLogTickPositions(g,w[k-1],w[k],!0))});else if(a.isDatetimeAxis&&"auto"===this.getMinorTickInterval())c=c.concat(a.getTimeTicks(a.normalizeTimeTickInterval(g),x,n,b.startOfWeek));else for(b=x+(e[0]-x)%g;b<=n&&b!==c[0];b+=g)c.push(b);0!==c.length&&a.trimTicks(c);return c},adjustForMinRange:function(){var a=this.options,b=this.min,e=this.max,g,c,n,x,d,u,m,l;this.isXAxis&&
	void 0===this.minRange&&!this.isLog&&(r(a.min)||r(a.max)?this.minRange=null:(f(this.series,function(a){u=a.xData;for(x=m=a.xIncrement?1:u.length-1;0<x;x--)if(d=u[x]-u[x-1],void 0===n||d<n)n=d}),this.minRange=Math.min(5*n,this.dataMax-this.dataMin)));e-b<this.minRange&&(c=this.dataMax-this.dataMin>=this.minRange,l=this.minRange,g=(l-e+b)/2,g=[b-g,C(a.min,b-g)],c&&(g[2]=this.isLog?this.log2lin(this.dataMin):this.dataMin),b=y(g),e=[b+l,C(a.max,b+l)],c&&(e[2]=this.isLog?this.log2lin(this.dataMax):this.dataMax),
	e=h(e),e-b<l&&(g[0]=e-l,g[1]=C(a.min,e-l),b=y(g)));this.min=b;this.max=e},getClosest:function(){var a;this.categories?a=1:f(this.series,function(b){var k=b.closestPointRange,e=b.visible||!b.chart.options.chart.ignoreHiddenSeries;!b.noSharedTooltip&&r(k)&&e&&(a=r(a)?Math.min(a,k):k)});return a},nameToX:function(a){var b=n(this.categories),k=b?this.categories:this.names,g=a.options.x,c;a.series.requireSorting=!1;r(g)||(g=!1===this.options.uniqueNames?a.series.autoIncrement():e(a.name,k));-1===g?b||
	(c=k.length):c=g;void 0!==c&&(this.names[c]=a.name);return c},updateNames:function(){var a=this;0<this.names.length&&(this.names.length=0,this.minRange=this.userMinRange,f(this.series||[],function(b){b.xIncrement=null;if(!b.points||b.isDirtyData)b.processData(),b.generatePoints();f(b.points,function(k,e){var w;k.options&&(w=a.nameToX(k),void 0!==w&&w!==k.x&&(k.x=w,b.xData[e]=w))})}))},setAxisTranslation:function(a){var b=this,k=b.max-b.min,e=b.axisPointRange||0,g,c=0,n=0,x=b.linkedParent,d=!!b.categories,
	u=b.transA,l=b.isXAxis;if(l||d||e)g=b.getClosest(),x?(c=x.minPointOffset,n=x.pointRangePadding):f(b.series,function(a){var k=d?1:l?C(a.options.pointRange,g,0):b.axisPointRange||0;a=a.options.pointPlacement;e=Math.max(e,k);b.single||(c=Math.max(c,I(a)?0:k/2),n=Math.max(n,"on"===a?0:k))}),x=b.ordinalSlope&&g?b.ordinalSlope/g:1,b.minPointOffset=c*=x,b.pointRangePadding=n*=x,b.pointRange=Math.min(e,k),l&&(b.closestPointRange=g);a&&(b.oldTransA=u);b.translationSlope=b.transA=u=b.options.staticScale||b.len/
	(k+n||1);b.transB=b.horiz?b.left:b.bottom;b.minPixelPadding=u*c},minFromRange:function(){return this.max-this.range},setTickInterval:function(b){var k=this,e=k.chart,c=k.options,n=k.isLog,x=k.log2lin,d=k.isDatetimeAxis,u=k.isXAxis,m=k.isLinked,h=c.maxPadding,q=c.minPadding,F=c.tickInterval,G=c.tickPixelInterval,E=k.categories,p=k.threshold,H=k.softThreshold,I,t,N,y;d||E||m||this.getTickAmount();N=C(k.userMin,c.min);y=C(k.userMax,c.max);m?(k.linkedParent=e[k.coll][c.linkedTo],e=k.linkedParent.getExtremes(),
	k.min=C(e.min,e.dataMin),k.max=C(e.max,e.dataMax),c.type!==k.linkedParent.options.type&&a.error(11,1)):(!H&&r(p)&&(k.dataMin>=p?(I=p,q=0):k.dataMax<=p&&(t=p,h=0)),k.min=C(N,I,k.dataMin),k.max=C(y,t,k.dataMax));n&&(k.positiveValuesOnly&&!b&&0>=Math.min(k.min,C(k.dataMin,k.min))&&a.error(10,1),k.min=v(x(k.min),15),k.max=v(x(k.max),15));k.range&&r(k.max)&&(k.userMin=k.min=N=Math.max(k.dataMin,k.minFromRange()),k.userMax=y=k.max,k.range=null);l(k,"foundExtremes");k.beforePadding&&k.beforePadding();k.adjustForMinRange();
	!(E||k.axisPointRange||k.usePercentage||m)&&r(k.min)&&r(k.max)&&(x=k.max-k.min)&&(!r(N)&&q&&(k.min-=x*q),!r(y)&&h&&(k.max+=x*h));D(c.softMin)&&!D(k.userMin)&&(k.min=Math.min(k.min,c.softMin));D(c.softMax)&&!D(k.userMax)&&(k.max=Math.max(k.max,c.softMax));D(c.floor)&&(k.min=Math.max(k.min,c.floor));D(c.ceiling)&&(k.max=Math.min(k.max,c.ceiling));H&&r(k.dataMin)&&(p=p||0,!r(N)&&k.min<p&&k.dataMin>=p?k.min=p:!r(y)&&k.max>p&&k.dataMax<=p&&(k.max=p));k.tickInterval=k.min===k.max||void 0===k.min||void 0===
	k.max?1:m&&!F&&G===k.linkedParent.options.tickPixelInterval?F=k.linkedParent.tickInterval:C(F,this.tickAmount?(k.max-k.min)/Math.max(this.tickAmount-1,1):void 0,E?1:(k.max-k.min)*G/Math.max(k.len,G));u&&!b&&f(k.series,function(a){a.processData(k.min!==k.oldMin||k.max!==k.oldMax)});k.setAxisTranslation(!0);k.beforeSetTickPositions&&k.beforeSetTickPositions();k.postProcessTickInterval&&(k.tickInterval=k.postProcessTickInterval(k.tickInterval));k.pointRange&&!F&&(k.tickInterval=Math.max(k.pointRange,
	k.tickInterval));b=C(c.minTickInterval,k.isDatetimeAxis&&k.closestPointRange);!F&&k.tickInterval<b&&(k.tickInterval=b);d||n||F||(k.tickInterval=M(k.tickInterval,null,g(k.tickInterval),C(c.allowDecimals,!(.5<k.tickInterval&&5>k.tickInterval&&1E3<k.max&&9999>k.max)),!!this.tickAmount));this.tickAmount||(k.tickInterval=k.unsquish());this.setTickPositions()},setTickPositions:function(){var a=this.options,b,e=a.tickPositions;b=this.getMinorTickInterval();var c=a.tickPositioner,g=a.startOnTick,n=a.endOnTick;
	this.tickmarkOffset=this.categories&&"between"===a.tickmarkPlacement&&1===this.tickInterval?.5:0;this.minorTickInterval="auto"===b&&this.tickInterval?this.tickInterval/5:b;this.single=this.min===this.max&&r(this.min)&&!this.tickAmount&&(parseInt(this.min,10)===this.min||!1!==a.allowDecimals);this.tickPositions=b=e&&e.slice();!b&&(b=this.isDatetimeAxis?this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval,a.units),this.min,this.max,a.startOfWeek,this.ordinalPositions,this.closestPointRange,
	!0):this.isLog?this.getLogTickPositions(this.tickInterval,this.min,this.max):this.getLinearTickPositions(this.tickInterval,this.min,this.max),b.length>this.len&&(b=[b[0],b.pop()],b[0]===b[1]&&(b.length=1)),this.tickPositions=b,c&&(c=c.apply(this,[this.min,this.max])))&&(this.tickPositions=b=c);this.paddedTicks=b.slice(0);this.trimTicks(b,g,n);this.isLinked||(this.single&&2>b.length&&(this.min-=.5,this.max+=.5),e||c||this.adjustTickAmount())},trimTicks:function(a,b,e){var k=a[0],c=a[a.length-1],g=
	this.minPointOffset||0;if(!this.isLinked){if(b&&-Infinity!==k)this.min=k;else for(;this.min-g>a[0];)a.shift();if(e)this.max=c;else for(;this.max+g<a[a.length-1];)a.pop();0===a.length&&r(k)&&!this.options.tickPositions&&a.push((c+k)/2)}},alignToOthers:function(){var a={},b,e=this.options;!1===this.chart.options.chart.alignTicks||!1===e.alignTicks||this.isLog||f(this.chart[this.coll],function(k){var e=k.options,e=[k.horiz?e.left:e.top,e.width,e.height,e.pane].join();k.series.length&&(a[e]?b=!0:a[e]=
	1)});return b},getTickAmount:function(){var a=this.options,b=a.tickAmount,e=a.tickPixelInterval;!r(a.tickInterval)&&this.len<e&&!this.isRadial&&!this.isLog&&a.startOnTick&&a.endOnTick&&(b=2);!b&&this.alignToOthers()&&(b=Math.ceil(this.len/e)+1);4>b&&(this.finalTickAmt=b,b=5);this.tickAmount=b},adjustTickAmount:function(){var a=this.tickInterval,b=this.tickPositions,e=this.tickAmount,c=this.finalTickAmt,g=b&&b.length,n=C(this.threshold,this.softThreshold?0:null);if(this.hasData()){if(g<e){for(;b.length<
	e;)b.length%2||this.min===n?b.push(v(b[b.length-1]+a)):b.unshift(v(b[0]-a));this.transA*=(g-1)/(e-1);this.min=b[0];this.max=b[b.length-1]}else g>e&&(this.tickInterval*=2,this.setTickPositions());if(r(c)){for(a=e=b.length;a--;)(3===c&&1===a%2||2>=c&&0<a&&a<e-1)&&b.splice(a,1);this.finalTickAmt=void 0}}},setScale:function(){var a,b;this.oldMin=this.min;this.oldMax=this.max;this.oldAxisLength=this.len;this.setAxisSize();b=this.len!==this.oldAxisLength;f(this.series,function(b){if(b.isDirtyData||b.isDirty||
	b.xAxis.isDirty)a=!0});b||a||this.isLinked||this.forceRedraw||this.userMin!==this.oldUserMin||this.userMax!==this.oldUserMax||this.alignToOthers()?(this.resetStacks&&this.resetStacks(),this.forceRedraw=!1,this.getSeriesExtremes(),this.setTickInterval(),this.oldUserMin=this.userMin,this.oldUserMax=this.userMax,this.isDirty||(this.isDirty=b||this.min!==this.oldMin||this.max!==this.oldMax)):this.cleanStacks&&this.cleanStacks()},setExtremes:function(a,b,e,c,g){var k=this,n=k.chart;e=C(e,!0);f(k.series,
	function(a){delete a.kdTree});g=q(g,{min:a,max:b});l(k,"setExtremes",g,function(){k.userMin=a;k.userMax=b;k.eventArgs=g;e&&n.redraw(c)})},zoom:function(a,b){var k=this.dataMin,e=this.dataMax,c=this.options,g=Math.min(k,C(c.min,k)),c=Math.max(e,C(c.max,e));if(a!==this.min||b!==this.max)this.allowZoomOutside||(r(k)&&(a<g&&(a=g),a>c&&(a=c)),r(e)&&(b<g&&(b=g),b>c&&(b=c))),this.displayBtn=void 0!==a||void 0!==b,this.setExtremes(a,b,!1,void 0,{trigger:"zoom"});return!0},setAxisSize:function(){var b=this.chart,
	e=this.options,c=e.offsets||[0,0,0,0],g=this.horiz,n=this.width=Math.round(a.relativeLength(C(e.width,b.plotWidth-c[3]+c[1]),b.plotWidth)),f=this.height=Math.round(a.relativeLength(C(e.height,b.plotHeight-c[0]+c[2]),b.plotHeight)),x=this.top=Math.round(a.relativeLength(C(e.top,b.plotTop+c[0]),b.plotHeight,b.plotTop)),e=this.left=Math.round(a.relativeLength(C(e.left,b.plotLeft+c[3]),b.plotWidth,b.plotLeft));this.bottom=b.chartHeight-f-x;this.right=b.chartWidth-n-e;this.len=Math.max(g?n:f,0);this.pos=
	g?e:x},getExtremes:function(){var a=this.isLog,b=this.lin2log;return{min:a?v(b(this.min)):this.min,max:a?v(b(this.max)):this.max,dataMin:this.dataMin,dataMax:this.dataMax,userMin:this.userMin,userMax:this.userMax}},getThreshold:function(a){var b=this.isLog,k=this.lin2log,e=b?k(this.min):this.min,b=b?k(this.max):this.max;null===a?a=e:e>a?a=e:b<a&&(a=b);return this.translate(a,0,1,0,1)},autoLabelAlign:function(a){a=(C(a,0)-90*this.side+720)%360;return 15<a&&165>a?"right":195<a&&345>a?"left":"center"},
	tickSize:function(a){var b=this.options,k=b[a+"Length"],e=C(b[a+"Width"],"tick"===a&&this.isXAxis?1:0);if(e&&k)return"inside"===b[a+"Position"]&&(k=-k),[k,e]},labelMetrics:function(){var a=this.tickPositions&&this.tickPositions[0]||0;return this.chart.renderer.fontMetrics(this.options.labels.style&&this.options.labels.style.fontSize,this.ticks[a]&&this.ticks[a].label)},unsquish:function(){var a=this.options.labels,b=this.horiz,e=this.tickInterval,c=e,g=this.len/(((this.categories?1:0)+this.max-this.min)/
	e),n,x=a.rotation,d=this.labelMetrics(),u,l=Number.MAX_VALUE,m,h=function(a){a/=g||1;a=1<a?Math.ceil(a):1;return a*e};b?(m=!a.staggerLines&&!a.step&&(r(x)?[x]:g<C(a.autoRotationLimit,80)&&a.autoRotation))&&f(m,function(a){var b;if(a===x||a&&-90<=a&&90>=a)u=h(Math.abs(d.h/Math.sin(p*a))),b=u+Math.abs(a/360),b<l&&(l=b,n=a,c=u)}):a.step||(c=h(d.h));this.autoRotation=m;this.labelRotation=C(n,x);return c},getSlotWidth:function(){var a=this.chart,b=this.horiz,e=this.options.labels,c=Math.max(this.tickPositions.length-
	(this.categories?0:1),1),g=a.margin[3];return b&&2>(e.step||0)&&!e.rotation&&(this.staggerLines||1)*this.len/c||!b&&(e.style&&parseInt(e.style.width,10)||g&&g-a.spacing[3]||.33*a.chartWidth)},renderUnsquish:function(){var a=this.chart,b=a.renderer,e=this.tickPositions,c=this.ticks,g=this.options.labels,n=this.horiz,x=this.getSlotWidth(),d=Math.max(1,Math.round(x-2*(g.padding||5))),u={},l=this.labelMetrics(),m=g.style&&g.style.textOverflow,h,q=0,F,G;I(g.rotation)||(u.rotation=g.rotation||0);f(e,function(a){(a=
	c[a])&&a.labelLength>q&&(q=a.labelLength)});this.maxLabelLength=q;if(this.autoRotation)q>d&&q>l.h?u.rotation=this.labelRotation:this.labelRotation=0;else if(x&&(h={width:d+"px"},!m))for(h.textOverflow="clip",F=e.length;!n&&F--;)if(G=e[F],d=c[G].label)d.styles&&"ellipsis"===d.styles.textOverflow?d.css({textOverflow:"clip"}):c[G].labelLength>x&&d.css({width:x+"px"}),d.getBBox().height>this.len/e.length-(l.h-l.f)&&(d.specCss={textOverflow:"ellipsis"});u.rotation&&(h={width:(q>.5*a.chartHeight?.33*a.chartHeight:
	a.chartHeight)+"px"},m||(h.textOverflow="ellipsis"));if(this.labelAlign=g.align||this.autoLabelAlign(this.labelRotation))u.align=this.labelAlign;f(e,function(a){var b=(a=c[a])&&a.label;b&&(b.attr(u),h&&b.css(E(h,b.specCss)),delete b.specCss,a.rotation=u.rotation)});this.tickRotCorr=b.rotCorr(l.b,this.labelRotation||0,0!==this.side)},hasData:function(){return this.hasVisibleSeries||r(this.min)&&r(this.max)&&this.tickPositions&&0<this.tickPositions.length},addTitle:function(a){var b=this.chart.renderer,
	e=this.horiz,k=this.opposite,c=this.options.title,g;this.axisTitle||((g=c.textAlign)||(g=(e?{low:"left",middle:"center",high:"right"}:{low:k?"right":"left",middle:"center",high:k?"left":"right"})[c.align]),this.axisTitle=b.text(c.text,0,0,c.useHTML).attr({zIndex:7,rotation:c.rotation||0,align:g}).addClass("highcharts-axis-title").css(c.style).add(this.axisGroup),this.axisTitle.isNew=!0);c.style.width||this.isRadial||this.axisTitle.css({width:this.len});this.axisTitle[a?"show":"hide"](!0)},generateTick:function(a){var b=
	this.ticks;b[a]?b[a].addLabel():b[a]=new G(this,a)},getOffset:function(){var a=this,b=a.chart,e=b.renderer,c=a.options,g=a.tickPositions,n=a.ticks,x=a.horiz,d=a.side,l=b.inverted&&!a.isZAxis?[1,0,3,2][d]:d,m,h,q=0,F,G=0,E=c.title,D=c.labels,p=0,H=b.axisOffset,b=b.clipOffset,I=[-1,1,1,-1][d],v=c.className,t=a.axisParent,M=this.tickSize("tick");m=a.hasData();a.showAxis=h=m||C(c.showEmpty,!0);a.staggerLines=a.horiz&&D.staggerLines;a.axisGroup||(a.gridGroup=e.g("grid").attr({zIndex:c.gridZIndex||1}).addClass("highcharts-"+
	this.coll.toLowerCase()+"-grid "+(v||"")).add(t),a.axisGroup=e.g("axis").attr({zIndex:c.zIndex||2}).addClass("highcharts-"+this.coll.toLowerCase()+" "+(v||"")).add(t),a.labelGroup=e.g("axis-labels").attr({zIndex:D.zIndex||7}).addClass("highcharts-"+a.coll.toLowerCase()+"-labels "+(v||"")).add(t));m||a.isLinked?(f(g,function(b,e){a.generateTick(b,e)}),a.renderUnsquish(),a.reserveSpaceDefault=0===d||2===d||{1:"left",3:"right"}[d]===a.labelAlign,C(D.reserveSpace,"center"===a.labelAlign?!0:null,a.reserveSpaceDefault)&&
	f(g,function(a){p=Math.max(n[a].getLabelSize(),p)}),a.staggerLines&&(p*=a.staggerLines),a.labelOffset=p*(a.opposite?-1:1)):u(n,function(a,b){a.destroy();delete n[b]});E&&E.text&&!1!==E.enabled&&(a.addTitle(h),h&&!1!==E.reserveSpace&&(a.titleOffset=q=a.axisTitle.getBBox()[x?"height":"width"],F=E.offset,G=r(F)?0:C(E.margin,x?5:10)));a.renderLine();a.offset=I*C(c.offset,H[d]);a.tickRotCorr=a.tickRotCorr||{x:0,y:0};e=0===d?-a.labelMetrics().h:2===d?a.tickRotCorr.y:0;G=Math.abs(p)+G;p&&(G=G-e+I*(x?C(D.y,
	a.tickRotCorr.y+8*I):D.x));a.axisTitleMargin=C(F,G);H[d]=Math.max(H[d],a.axisTitleMargin+q+I*a.offset,G,m&&g.length&&M?M[0]+I*a.offset:0);c=c.offset?0:2*Math.floor(a.axisLine.strokeWidth()/2);b[l]=Math.max(b[l],c)},getLinePath:function(a){var b=this.chart,e=this.opposite,k=this.offset,c=this.horiz,g=this.left+(e?this.width:0)+k,k=b.chartHeight-this.bottom-(e?this.height:0)+k;e&&(a*=-1);return b.renderer.crispLine(["M",c?this.left:g,c?k:this.top,"L",c?b.chartWidth-this.right:g,c?k:b.chartHeight-this.bottom],
	a)},renderLine:function(){this.axisLine||(this.axisLine=this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup),this.axisLine.attr({stroke:this.options.lineColor,"stroke-width":this.options.lineWidth,zIndex:7}))},getTitlePosition:function(){var a=this.horiz,b=this.left,e=this.top,c=this.len,g=this.options.title,n=a?b:e,f=this.opposite,x=this.offset,d=g.x||0,u=g.y||0,l=this.axisTitle,m=this.chart.renderer.fontMetrics(g.style&&g.style.fontSize,l),l=Math.max(l.getBBox(null,0).height-
	m.h-1,0),c={low:n+(a?0:c),middle:n+c/2,high:n+(a?c:0)}[g.align],b=(a?e+this.height:b)+(a?1:-1)*(f?-1:1)*this.axisTitleMargin+[-l,l,m.f,-l][this.side];return{x:a?c+d:b+(f?this.width:0)+x+d,y:a?b+u-(f?this.height:0)+x:c+u}},renderMinorTick:function(a){var b=this.chart.hasRendered&&D(this.oldMin),e=this.minorTicks;e[a]||(e[a]=new G(this,a,"minor"));b&&e[a].isNew&&e[a].render(null,!0);e[a].render(null,!1,1)},renderTick:function(a,b){var e=this.isLinked,c=this.ticks,g=this.chart.hasRendered&&D(this.oldMin);
	if(!e||a>=this.min&&a<=this.max)c[a]||(c[a]=new G(this,a)),g&&c[a].isNew&&c[a].render(b,!0,.1),c[a].render(b)},render:function(){var b=this,e=b.chart,c=b.options,g=b.isLog,n=b.lin2log,x=b.isLinked,d=b.tickPositions,l=b.axisTitle,m=b.ticks,h=b.minorTicks,q=b.alternateBands,E=c.stackLabels,C=c.alternateGridColor,p=b.tickmarkOffset,H=b.axisLine,r=b.showAxis,I=A(e.renderer.globalAnimation),v,t;b.labelEdge.length=0;b.overlap=!1;f([m,h,q],function(a){u(a,function(a){a.isActive=!1})});if(b.hasData()||x)b.minorTickInterval&&
	!b.categories&&f(b.getMinorTickPositions(),function(a){b.renderMinorTick(a)}),d.length&&(f(d,function(a,e){b.renderTick(a,e)}),p&&(0===b.min||b.single)&&(m[-1]||(m[-1]=new G(b,-1,null,!0)),m[-1].render(-1))),C&&f(d,function(c,k){t=void 0!==d[k+1]?d[k+1]+p:b.max-p;0===k%2&&c<b.max&&t<=b.max+(e.polar?-p:p)&&(q[c]||(q[c]=new a.PlotLineOrBand(b)),v=c+p,q[c].options={from:g?n(v):v,to:g?n(t):t,color:C},q[c].render(),q[c].isActive=!0)}),b._addedPlotLB||(f((c.plotLines||[]).concat(c.plotBands||[]),function(a){b.addPlotBandOrLine(a)}),
	b._addedPlotLB=!0);f([m,h,q],function(a){var b,c=[],g=I.duration;u(a,function(a,b){a.isActive||(a.render(b,!1,0),a.isActive=!1,c.push(b))});F(function(){for(b=c.length;b--;)a[c[b]]&&!a[c[b]].isActive&&(a[c[b]].destroy(),delete a[c[b]])},a!==q&&e.hasRendered&&g?g:0)});H&&(H[H.isPlaced?"animate":"attr"]({d:this.getLinePath(H.strokeWidth())}),H.isPlaced=!0,H[r?"show":"hide"](!0));l&&r&&(c=b.getTitlePosition(),D(c.y)?(l[l.isNew?"attr":"animate"](c),l.isNew=!1):(l.attr("y",-9999),l.isNew=!0));E&&E.enabled&&
	b.renderStackTotals();b.isDirty=!1},redraw:function(){this.visible&&(this.render(),f(this.plotLinesAndBands,function(a){a.render()}));f(this.series,function(a){a.isDirty=!0})},keepProps:"extKey hcEvents names series userMax userMin".split(" "),destroy:function(a){var b=this,c=b.stacks,g=b.plotLinesAndBands,k;a||N(b);u(c,function(a,b){m(a);c[b]=null});f([b.ticks,b.minorTicks,b.alternateBands],function(a){m(a)});if(g)for(a=g.length;a--;)g[a].destroy();f("stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross".split(" "),
	function(a){b[a]&&(b[a]=b[a].destroy())});for(k in b.plotLinesAndBandsGroups)b.plotLinesAndBandsGroups[k]=b.plotLinesAndBandsGroups[k].destroy();u(b,function(a,c){-1===e(c,b.keepProps)&&delete b[c]})},drawCrosshair:function(a,b){var e,c=this.crosshair,g=C(c.snap,!0),k,n=this.cross;a||(a=this.cross&&this.cross.e);this.crosshair&&!1!==(r(b)||!g)?(g?r(b)&&(k=this.isXAxis?b.plotX:this.len-b.plotY):k=a&&(this.horiz?a.chartX-this.pos:this.len-a.chartY+this.pos),r(k)&&(e=this.getPlotLinePath(b&&(this.isXAxis?
	b.x:C(b.stackY,b.y)),null,null,null,k)||null),r(e)?(b=this.categories&&!this.isRadial,n||(this.cross=n=this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-"+(b?"category ":"thin ")+c.className).attr({zIndex:C(c.zIndex,2)}).add(),n.attr({stroke:c.color||(b?d("#ccd6eb").setOpacity(.25).get():"#cccccc"),"stroke-width":C(c.width,1)}).css({"pointer-events":"none"}),c.dashStyle&&n.attr({dashstyle:c.dashStyle})),n.show().attr({d:e}),b&&!c.width&&n.attr({"stroke-width":this.transA}),
	this.cross.e=a):this.hideCrosshair()):this.hideCrosshair()},hideCrosshair:function(){this.cross&&this.cross.hide()}});return a.Axis=H}(J);(function(a){var z=a.Axis,A=a.getMagnitude,y=a.map,h=a.normalizeTickInterval,d=a.pick;z.prototype.getLogTickPositions=function(a,t,r,p){var m=this.options,f=this.len,q=this.lin2log,l=this.log2lin,c=[];p||(this._minorAutoInterval=null);if(.5<=a)a=Math.round(a),c=this.getLinearTickPositions(a,t,r);else if(.08<=a)for(var f=Math.floor(t),g,b,e,n,D,m=.3<a?[1,2,4]:.15<
	a?[1,2,4,6,8]:[1,2,3,4,5,6,7,8,9];f<r+1&&!D;f++)for(b=m.length,g=0;g<b&&!D;g++)e=l(q(f)*m[g]),e>t&&(!p||n<=r)&&void 0!==n&&c.push(n),n>r&&(D=!0),n=e;else t=q(t),r=q(r),a=p?this.getMinorTickInterval():m.tickInterval,a=d("auto"===a?null:a,this._minorAutoInterval,m.tickPixelInterval/(p?5:1)*(r-t)/((p?f/this.tickPositions.length:f)||1)),a=h(a,null,A(a)),c=y(this.getLinearTickPositions(a,t,r),l),p||(this._minorAutoInterval=a/5);p||(this.tickInterval=a);return c};z.prototype.log2lin=function(a){return Math.log(a)/
	Math.LN10};z.prototype.lin2log=function(a){return Math.pow(10,a)}})(J);(function(a,z){var A=a.arrayMax,y=a.arrayMin,h=a.defined,d=a.destroyObjectProperties,v=a.each,t=a.erase,r=a.merge,p=a.pick;a.PlotLineOrBand=function(a,f){this.axis=a;f&&(this.options=f,this.id=f.id)};a.PlotLineOrBand.prototype={render:function(){var d=this,f=d.axis,q=f.horiz,l=d.options,c=l.label,g=d.label,b=l.to,e=l.from,n=l.value,D=h(e)&&h(b),I=h(n),E=d.svgElem,t=!E,u=[],C=l.color,v=p(l.zIndex,0),x=l.events,u={"class":"highcharts-plot-"+
	(D?"band ":"line ")+(l.className||"")},F={},G=f.chart.renderer,H=D?"bands":"lines",k=f.log2lin;f.isLog&&(e=k(e),b=k(b),n=k(n));I?(u={stroke:C,"stroke-width":l.width},l.dashStyle&&(u.dashstyle=l.dashStyle)):D&&(C&&(u.fill=C),l.borderWidth&&(u.stroke=l.borderColor,u["stroke-width"]=l.borderWidth));F.zIndex=v;H+="-"+v;(C=f.plotLinesAndBandsGroups[H])||(f.plotLinesAndBandsGroups[H]=C=G.g("plot-"+H).attr(F).add());t&&(d.svgElem=E=G.path().attr(u).add(C));if(I)u=f.getPlotLinePath(n,E.strokeWidth());else if(D)u=
	f.getPlotBandPath(e,b,l);else return;t&&u&&u.length?(E.attr({d:u}),x&&a.objectEach(x,function(a,b){E.on(b,function(a){x[b].apply(d,[a])})})):E&&(u?(E.show(),E.animate({d:u})):(E.hide(),g&&(d.label=g=g.destroy())));c&&h(c.text)&&u&&u.length&&0<f.width&&0<f.height&&!u.flat?(c=r({align:q&&D&&"center",x:q?!D&&4:10,verticalAlign:!q&&D&&"middle",y:q?D?16:10:D?6:-4,rotation:q&&!D&&90},c),this.renderLabel(c,u,D,v)):g&&g.hide();return d},renderLabel:function(a,f,d,l){var c=this.label,g=this.axis.chart.renderer;
	c||(c={align:a.textAlign||a.align,rotation:a.rotation,"class":"highcharts-plot-"+(d?"band":"line")+"-label "+(a.className||"")},c.zIndex=l,this.label=c=g.text(a.text,0,0,a.useHTML).attr(c).add(),c.css(a.style));l=f.xBounds||[f[1],f[4],d?f[6]:f[1]];f=f.yBounds||[f[2],f[5],d?f[7]:f[2]];d=y(l);g=y(f);c.align(a,!1,{x:d,y:g,width:A(l)-d,height:A(f)-g});c.show()},destroy:function(){t(this.axis.plotLinesAndBands,this);delete this.axis;d(this)}};a.extend(z.prototype,{getPlotBandPath:function(a,f){var d=this.getPlotLinePath(f,
	null,null,!0),l=this.getPlotLinePath(a,null,null,!0),c=[],g=this.horiz,b=1,e;a=a<this.min&&f<this.min||a>this.max&&f>this.max;if(l&&d)for(a&&(e=l.toString()===d.toString(),b=0),a=0;a<l.length;a+=6)g&&d[a+1]===l[a+1]?(d[a+1]+=b,d[a+4]+=b):g||d[a+2]!==l[a+2]||(d[a+2]+=b,d[a+5]+=b),c.push("M",l[a+1],l[a+2],"L",l[a+4],l[a+5],d[a+4],d[a+5],d[a+1],d[a+2],"z"),c.flat=e;return c},addPlotBand:function(a){return this.addPlotBandOrLine(a,"plotBands")},addPlotLine:function(a){return this.addPlotBandOrLine(a,
	"plotLines")},addPlotBandOrLine:function(d,f){var h=(new a.PlotLineOrBand(this,d)).render(),l=this.userOptions;h&&(f&&(l[f]=l[f]||[],l[f].push(d)),this.plotLinesAndBands.push(h));return h},removePlotBandOrLine:function(a){for(var f=this.plotLinesAndBands,d=this.options,l=this.userOptions,c=f.length;c--;)f[c].id===a&&f[c].destroy();v([d.plotLines||[],l.plotLines||[],d.plotBands||[],l.plotBands||[]],function(g){for(c=g.length;c--;)g[c].id===a&&t(g,g[c])})},removePlotBand:function(a){this.removePlotBandOrLine(a)},
	removePlotLine:function(a){this.removePlotBandOrLine(a)}})})(J,V);(function(a){var z=a.dateFormat,A=a.each,y=a.extend,h=a.format,d=a.isNumber,v=a.map,t=a.merge,r=a.pick,p=a.splat,m=a.syncTimeout,f=a.timeUnits;a.Tooltip=function(){this.init.apply(this,arguments)};a.Tooltip.prototype={init:function(a,f){this.chart=a;this.options=f;this.crosshairs=[];this.now={x:0,y:0};this.isHidden=!0;this.split=f.split&&!a.inverted;this.shared=f.shared||this.split},cleanSplit:function(a){A(this.chart.series,function(f){var c=
	f&&f.tt;c&&(!c.isActive||a?f.tt=c.destroy():c.isActive=!1)})},getLabel:function(){var a=this.chart.renderer,f=this.options;this.label||(this.split?this.label=a.g("tooltip"):(this.label=a.label("",0,0,f.shape||"callout",null,null,f.useHTML,null,"tooltip").attr({padding:f.padding,r:f.borderRadius}),this.label.attr({fill:f.backgroundColor,"stroke-width":f.borderWidth}).css(f.style).shadow(f.shadow)),this.label.attr({zIndex:8}).add());return this.label},update:function(a){this.destroy();t(!0,this.chart.options.tooltip.userOptions,
	a);this.init(this.chart,t(!0,this.options,a))},destroy:function(){this.label&&(this.label=this.label.destroy());this.split&&this.tt&&(this.cleanSplit(this.chart,!0),this.tt=this.tt.destroy());clearTimeout(this.hideTimer);clearTimeout(this.tooltipTimeout)},move:function(a,f,c,g){var b=this,e=b.now,n=!1!==b.options.animation&&!b.isHidden&&(1<Math.abs(a-e.x)||1<Math.abs(f-e.y)),d=b.followPointer||1<b.len;y(e,{x:n?(2*e.x+a)/3:a,y:n?(e.y+f)/2:f,anchorX:d?void 0:n?(2*e.anchorX+c)/3:c,anchorY:d?void 0:n?
	(e.anchorY+g)/2:g});b.getLabel().attr(e);n&&(clearTimeout(this.tooltipTimeout),this.tooltipTimeout=setTimeout(function(){b&&b.move(a,f,c,g)},32))},hide:function(a){var f=this;clearTimeout(this.hideTimer);a=r(a,this.options.hideDelay,500);this.isHidden||(this.hideTimer=m(function(){f.getLabel()[a?"fadeOut":"hide"]();f.isHidden=!0},a))},getAnchor:function(a,f){var c,g=this.chart,b=g.inverted,e=g.plotTop,n=g.plotLeft,d=0,h=0,l,m;a=p(a);c=a[0].tooltipPos;this.followPointer&&f&&(void 0===f.chartX&&(f=
	g.pointer.normalize(f)),c=[f.chartX-g.plotLeft,f.chartY-e]);c||(A(a,function(a){l=a.series.yAxis;m=a.series.xAxis;d+=a.plotX+(!b&&m?m.left-n:0);h+=(a.plotLow?(a.plotLow+a.plotHigh)/2:a.plotY)+(!b&&l?l.top-e:0)}),d/=a.length,h/=a.length,c=[b?g.plotWidth-h:d,this.shared&&!b&&1<a.length&&f?f.chartY-e:b?g.plotHeight-d:h]);return v(c,Math.round)},getPosition:function(a,f,c){var g=this.chart,b=this.distance,e={},n=g.inverted&&c.h||0,d,h=["y",g.chartHeight,f,c.plotY+g.plotTop,g.plotTop,g.plotTop+g.plotHeight],
	l=["x",g.chartWidth,a,c.plotX+g.plotLeft,g.plotLeft,g.plotLeft+g.plotWidth],m=!this.followPointer&&r(c.ttBelow,!g.inverted===!!c.negative),u=function(a,c,g,k,f,d){var x=g<k-b,w=k+b+g<c,h=k-b-g;k+=b;if(m&&w)e[a]=k;else if(!m&&x)e[a]=h;else if(x)e[a]=Math.min(d-g,0>h-n?h:h-n);else if(w)e[a]=Math.max(f,k+n+g>c?k:k+n);else return!1},q=function(a,c,g,k){var n;k<b||k>c-b?n=!1:e[a]=k<g/2?1:k>c-g/2?c-g-2:k-g/2;return n},p=function(a){var b=h;h=l;l=b;d=a},x=function(){!1!==u.apply(0,h)?!1!==q.apply(0,l)||
	d||(p(!0),x()):d?e.x=e.y=0:(p(!0),x())};(g.inverted||1<this.len)&&p();x();return e},defaultFormatter:function(a){var f=this.points||p(this),c;c=[a.tooltipFooterHeaderFormatter(f[0])];c=c.concat(a.bodyFormatter(f));c.push(a.tooltipFooterHeaderFormatter(f[0],!0));return c},refresh:function(a,f){var c,g=this.options,b,e=a,n,d={},h=[];c=g.formatter||this.defaultFormatter;var d=this.shared,l;g.enabled&&(clearTimeout(this.hideTimer),this.followPointer=p(e)[0].series.tooltipOptions.followPointer,n=this.getAnchor(e,
	f),f=n[0],b=n[1],!d||e.series&&e.series.noSharedTooltip?d=e.getLabelConfig():(A(e,function(a){a.setState("hover");h.push(a.getLabelConfig())}),d={x:e[0].category,y:e[0].y},d.points=h,e=e[0]),this.len=h.length,d=c.call(d,this),l=e.series,this.distance=r(l.tooltipOptions.distance,16),!1===d?this.hide():(c=this.getLabel(),this.isHidden&&c.attr({opacity:1}).show(),this.split?this.renderSplit(d,p(a)):(g.style.width||c.css({width:this.chart.spacingBox.width}),c.attr({text:d&&d.join?d.join(""):d}),c.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-"+
	r(e.colorIndex,l.colorIndex)),c.attr({stroke:g.borderColor||e.color||l.color||"#666666"}),this.updatePosition({plotX:f,plotY:b,negative:e.negative,ttBelow:e.ttBelow,h:n[2]||0})),this.isHidden=!1))},renderSplit:function(f,d){var c=this,g=[],b=this.chart,e=b.renderer,n=!0,h=this.options,l=0,m=this.getLabel();a.isString(f)&&(f=[!1,f]);A(f.slice(0,d.length+1),function(a,f){if(!1!==a){f=d[f-1]||{isHeader:!0,plotX:d[0].plotX};var u=f.series||c,q=u.tt,x=f.series||{},F="highcharts-color-"+r(f.colorIndex,
	x.colorIndex,"none");q||(u.tt=q=e.label(null,null,null,"callout",null,null,h.useHTML).addClass("highcharts-tooltip-box "+F).attr({padding:h.padding,r:h.borderRadius,fill:h.backgroundColor,stroke:h.borderColor||f.color||x.color||"#333333","stroke-width":h.borderWidth}).add(m));q.isActive=!0;q.attr({text:a});q.css(h.style).shadow(h.shadow);a=q.getBBox();x=a.width+q.strokeWidth();f.isHeader?(l=a.height,x=Math.max(0,Math.min(f.plotX+b.plotLeft-x/2,b.chartWidth-x))):x=f.plotX+b.plotLeft-r(h.distance,16)-
	x;0>x&&(n=!1);a=(f.series&&f.series.yAxis&&f.series.yAxis.pos)+(f.plotY||0);a-=b.plotTop;g.push({target:f.isHeader?b.plotHeight+l:a,rank:f.isHeader?1:0,size:u.tt.getBBox().height+1,point:f,x:x,tt:q})}});this.cleanSplit();a.distribute(g,b.plotHeight+l);A(g,function(a){var e=a.point,c=e.series;a.tt.attr({visibility:void 0===a.pos?"hidden":"inherit",x:n||e.isHeader?a.x:e.plotX+b.plotLeft+r(h.distance,16),y:a.pos+b.plotTop,anchorX:e.isHeader?e.plotX+b.plotLeft:e.plotX+c.xAxis.pos,anchorY:e.isHeader?a.pos+
	b.plotTop-15:e.plotY+c.yAxis.pos})})},updatePosition:function(a){var f=this.chart,c=this.getLabel(),c=(this.options.positioner||this.getPosition).call(this,c.width,c.height,a);this.move(Math.round(c.x),Math.round(c.y||0),a.plotX+f.plotLeft,a.plotY+f.plotTop)},getDateFormat:function(a,d,c,g){var b=z("%m-%d %H:%M:%S.%L",d),e,n,h={millisecond:15,second:12,minute:9,hour:6,day:3},l="millisecond";for(n in f){if(a===f.week&&+z("%w",d)===c&&"00:00:00.000"===b.substr(6)){n="week";break}if(f[n]>a){n=l;break}if(h[n]&&
	b.substr(h[n])!=="01-01 00:00:00.000".substr(h[n]))break;"week"!==n&&(l=n)}n&&(e=g[n]);return e},getXDateFormat:function(a,f,c){f=f.dateTimeLabelFormats;var g=c&&c.closestPointRange;return(g?this.getDateFormat(g,a.x,c.options.startOfWeek,f):f.day)||f.year},tooltipFooterHeaderFormatter:function(a,f){f=f?"footer":"header";var c=a.series,g=c.tooltipOptions,b=g.xDateFormat,e=c.xAxis,n=e&&"datetime"===e.options.type&&d(a.key),l=g[f+"Format"];n&&!b&&(b=this.getXDateFormat(a,g,e));n&&b&&A(a.point&&a.point.tooltipDateKeys||
	["key"],function(a){l=l.replace("{point."+a+"}","{point."+a+":"+b+"}")});return h(l,{point:a,series:c})},bodyFormatter:function(a){return v(a,function(a){var c=a.series.tooltipOptions;return(c[(a.point.formatPrefix||"point")+"Formatter"]||a.point.tooltipFormatter).call(a.point,c[(a.point.formatPrefix||"point")+"Format"])})}}})(J);(function(a){var z=a.addEvent,A=a.attr,y=a.charts,h=a.color,d=a.css,v=a.defined,t=a.each,r=a.extend,p=a.find,m=a.fireEvent,f=a.isObject,q=a.offset,l=a.pick,c=a.splat,g=a.Tooltip;
	a.Pointer=function(a,e){this.init(a,e)};a.Pointer.prototype={init:function(a,e){this.options=e;this.chart=a;this.runChartClick=e.chart.events&&!!e.chart.events.click;this.pinchDown=[];this.lastValidTouch={};g&&(a.tooltip=new g(a,e.tooltip),this.followTouchMove=l(e.tooltip.followTouchMove,!0));this.setDOMEvents()},zoomOption:function(a){var b=this.chart,c=b.options.chart,g=c.zoomType||"",b=b.inverted;/touch/.test(a.type)&&(g=l(c.pinchType,g));this.zoomX=a=/x/.test(g);this.zoomY=g=/y/.test(g);this.zoomHor=
	a&&!b||g&&b;this.zoomVert=g&&!b||a&&b;this.hasZoom=a||g},normalize:function(a,e){var b;b=a.touches?a.touches.length?a.touches.item(0):a.changedTouches[0]:a;e||(this.chartPosition=e=q(this.chart.container));return r(a,{chartX:Math.round(b.pageX-e.left),chartY:Math.round(b.pageY-e.top)})},getCoordinates:function(a){var b={xAxis:[],yAxis:[]};t(this.chart.axes,function(e){b[e.isXAxis?"xAxis":"yAxis"].push({axis:e,value:e.toValue(a[e.horiz?"chartX":"chartY"])})});return b},findNearestKDPoint:function(a,
	e,c){var b;t(a,function(a){var g=!(a.noSharedTooltip&&e)&&0>a.options.findNearestPointBy.indexOf("y");a=a.searchPoint(c,g);if((g=f(a,!0))&&!(g=!f(b,!0)))var g=b.distX-a.distX,n=b.dist-a.dist,d=(a.series.group&&a.series.group.zIndex)-(b.series.group&&b.series.group.zIndex),g=0<(0!==g&&e?g:0!==n?n:0!==d?d:b.series.index>a.series.index?-1:1);g&&(b=a)});return b},getPointFromEvent:function(a){a=a.target;for(var b;a&&!b;)b=a.point,a=a.parentNode;return b},getChartCoordinatesFromPoint:function(a,e){var b=
	a.series,c=b.xAxis,b=b.yAxis,g=l(a.clientX,a.plotX);if(c&&b)return e?{chartX:c.len+c.pos-g,chartY:b.len+b.pos-a.plotY}:{chartX:g+c.pos,chartY:a.plotY+b.pos}},getHoverData:function(b,e,c,g,d,h,m){var n,q=[],E=m&&m.isBoosting;g=!(!g||!b);m=e&&!e.stickyTracking?[e]:a.grep(c,function(a){return a.visible&&!(!d&&a.directTouch)&&l(a.options.enableMouseTracking,!0)&&a.stickyTracking});e=(n=g?b:this.findNearestKDPoint(m,d,h))&&n.series;n&&(d&&!e.noSharedTooltip?(m=a.grep(c,function(a){return a.visible&&!(!d&&
	a.directTouch)&&l(a.options.enableMouseTracking,!0)&&!a.noSharedTooltip}),t(m,function(a){var b=p(a.points,function(a){return a.x===n.x&&!a.isNull});f(b)&&(E&&(b=a.getPoint(b)),q.push(b))})):q.push(n));return{hoverPoint:n,hoverSeries:e,hoverPoints:q}},runPointActions:function(b,e){var c=this.chart,g=c.tooltip&&c.tooltip.options.enabled?c.tooltip:void 0,f=g?g.shared:!1,d=e||c.hoverPoint,h=d&&d.series||c.hoverSeries,h=this.getHoverData(d,h,c.series,!!e||h&&h.directTouch&&this.isDirectTouch,f,b,{isBoosting:c.isBoosting}),
	u,d=h.hoverPoint;u=h.hoverPoints;e=(h=h.hoverSeries)&&h.tooltipOptions.followPointer;f=f&&h&&!h.noSharedTooltip;if(d&&(d!==c.hoverPoint||g&&g.isHidden)){t(c.hoverPoints||[],function(b){-1===a.inArray(b,u)&&b.setState()});t(u||[],function(a){a.setState("hover")});if(c.hoverSeries!==h)h.onMouseOver();c.hoverPoint&&c.hoverPoint.firePointEvent("mouseOut");if(!d.series)return;d.firePointEvent("mouseOver");c.hoverPoints=u;c.hoverPoint=d;g&&g.refresh(f?u:d,b)}else e&&g&&!g.isHidden&&(d=g.getAnchor([{}],
	b),g.updatePosition({plotX:d[0],plotY:d[1]}));this.unDocMouseMove||(this.unDocMouseMove=z(c.container.ownerDocument,"mousemove",function(b){var e=y[a.hoverChartIndex];if(e)e.pointer.onDocumentMouseMove(b)}));t(c.axes,function(e){var c=l(e.crosshair.snap,!0),g=c?a.find(u,function(a){return a.series[e.coll]===e}):void 0;g||!c?e.drawCrosshair(b,g):e.hideCrosshair()})},reset:function(a,e){var b=this.chart,g=b.hoverSeries,f=b.hoverPoint,d=b.hoverPoints,h=b.tooltip,l=h&&h.shared?d:f;a&&l&&t(c(l),function(b){b.series.isCartesian&&
	void 0===b.plotX&&(a=!1)});if(a)h&&l&&(h.refresh(l),f&&(f.setState(f.state,!0),t(b.axes,function(a){a.crosshair&&a.drawCrosshair(null,f)})));else{if(f)f.onMouseOut();d&&t(d,function(a){a.setState()});if(g)g.onMouseOut();h&&h.hide(e);this.unDocMouseMove&&(this.unDocMouseMove=this.unDocMouseMove());t(b.axes,function(a){a.hideCrosshair()});this.hoverX=b.hoverPoints=b.hoverPoint=null}},scaleGroups:function(a,e){var b=this.chart,c;t(b.series,function(g){c=a||g.getPlotBox();g.xAxis&&g.xAxis.zoomEnabled&&
	g.group&&(g.group.attr(c),g.markerGroup&&(g.markerGroup.attr(c),g.markerGroup.clip(e?b.clipRect:null)),g.dataLabelsGroup&&g.dataLabelsGroup.attr(c))});b.clipRect.attr(e||b.clipBox)},dragStart:function(a){var b=this.chart;b.mouseIsDown=a.type;b.cancelClick=!1;b.mouseDownX=this.mouseDownX=a.chartX;b.mouseDownY=this.mouseDownY=a.chartY},drag:function(a){var b=this.chart,c=b.options.chart,g=a.chartX,f=a.chartY,d=this.zoomHor,l=this.zoomVert,u=b.plotLeft,m=b.plotTop,q=b.plotWidth,x=b.plotHeight,F,G=this.selectionMarker,
	p=this.mouseDownX,k=this.mouseDownY,w=c.panKey&&a[c.panKey+"Key"];G&&G.touch||(g<u?g=u:g>u+q&&(g=u+q),f<m?f=m:f>m+x&&(f=m+x),this.hasDragged=Math.sqrt(Math.pow(p-g,2)+Math.pow(k-f,2)),10<this.hasDragged&&(F=b.isInsidePlot(p-u,k-m),b.hasCartesianSeries&&(this.zoomX||this.zoomY)&&F&&!w&&!G&&(this.selectionMarker=G=b.renderer.rect(u,m,d?1:q,l?1:x,0).attr({fill:c.selectionMarkerFill||h("#335cad").setOpacity(.25).get(),"class":"highcharts-selection-marker",zIndex:7}).add()),G&&d&&(g-=p,G.attr({width:Math.abs(g),
	x:(0<g?0:g)+p})),G&&l&&(g=f-k,G.attr({height:Math.abs(g),y:(0<g?0:g)+k})),F&&!G&&c.panning&&b.pan(a,c.panning)))},drop:function(a){var b=this,c=this.chart,g=this.hasPinched;if(this.selectionMarker){var f={originalEvent:a,xAxis:[],yAxis:[]},h=this.selectionMarker,l=h.attr?h.attr("x"):h.x,u=h.attr?h.attr("y"):h.y,q=h.attr?h.attr("width"):h.width,p=h.attr?h.attr("height"):h.height,x;if(this.hasDragged||g)t(c.axes,function(c){if(c.zoomEnabled&&v(c.min)&&(g||b[{xAxis:"zoomX",yAxis:"zoomY"}[c.coll]])){var e=
	c.horiz,d="touchend"===a.type?c.minPixelPadding:0,k=c.toValue((e?l:u)+d),e=c.toValue((e?l+q:u+p)-d);f[c.coll].push({axis:c,min:Math.min(k,e),max:Math.max(k,e)});x=!0}}),x&&m(c,"selection",f,function(a){c.zoom(r(a,g?{animation:!1}:null))});this.selectionMarker=this.selectionMarker.destroy();g&&this.scaleGroups()}c&&(d(c.container,{cursor:c._cursor}),c.cancelClick=10<this.hasDragged,c.mouseIsDown=this.hasDragged=this.hasPinched=!1,this.pinchDown=[])},onContainerMouseDown:function(a){2!==a.button&&(a=
	this.normalize(a),this.zoomOption(a),a.preventDefault&&a.preventDefault(),this.dragStart(a))},onDocumentMouseUp:function(b){y[a.hoverChartIndex]&&y[a.hoverChartIndex].pointer.drop(b)},onDocumentMouseMove:function(a){var b=this.chart,c=this.chartPosition;a=this.normalize(a,c);!c||this.inClass(a.target,"highcharts-tracker")||b.isInsidePlot(a.chartX-b.plotLeft,a.chartY-b.plotTop)||this.reset()},onContainerMouseLeave:function(b){var c=y[a.hoverChartIndex];c&&(b.relatedTarget||b.toElement)&&(c.pointer.reset(),
	c.pointer.chartPosition=null)},onContainerMouseMove:function(b){var c=this.chart;v(a.hoverChartIndex)&&y[a.hoverChartIndex]&&y[a.hoverChartIndex].mouseIsDown||(a.hoverChartIndex=c.index);b=this.normalize(b);b.returnValue=!1;"mousedown"===c.mouseIsDown&&this.drag(b);!this.inClass(b.target,"highcharts-tracker")&&!c.isInsidePlot(b.chartX-c.plotLeft,b.chartY-c.plotTop)||c.openMenu||this.runPointActions(b)},inClass:function(a,c){for(var b;a;){if(b=A(a,"class")){if(-1!==b.indexOf(c))return!0;if(-1!==b.indexOf("highcharts-container"))return!1}a=
	a.parentNode}},onTrackerMouseOut:function(a){var b=this.chart.hoverSeries;a=a.relatedTarget||a.toElement;this.isDirectTouch=!1;if(!(!b||!a||b.stickyTracking||this.inClass(a,"highcharts-tooltip")||this.inClass(a,"highcharts-series-"+b.index)&&this.inClass(a,"highcharts-tracker")))b.onMouseOut()},onContainerClick:function(a){var b=this.chart,c=b.hoverPoint,g=b.plotLeft,f=b.plotTop;a=this.normalize(a);b.cancelClick||(c&&this.inClass(a.target,"highcharts-tracker")?(m(c.series,"click",r(a,{point:c})),
	b.hoverPoint&&c.firePointEvent("click",a)):(r(a,this.getCoordinates(a)),b.isInsidePlot(a.chartX-g,a.chartY-f)&&m(b,"click",a)))},setDOMEvents:function(){var b=this,c=b.chart.container,g=c.ownerDocument;c.onmousedown=function(a){b.onContainerMouseDown(a)};c.onmousemove=function(a){b.onContainerMouseMove(a)};c.onclick=function(a){b.onContainerClick(a)};this.unbindContainerMouseLeave=z(c,"mouseleave",b.onContainerMouseLeave);a.unbindDocumentMouseUp||(a.unbindDocumentMouseUp=z(g,"mouseup",b.onDocumentMouseUp));
	a.hasTouch&&(c.ontouchstart=function(a){b.onContainerTouchStart(a)},c.ontouchmove=function(a){b.onContainerTouchMove(a)},a.unbindDocumentTouchEnd||(a.unbindDocumentTouchEnd=z(g,"touchend",b.onDocumentTouchEnd)))},destroy:function(){var b=this;b.unDocMouseMove&&b.unDocMouseMove();this.unbindContainerMouseLeave();a.chartCount||(a.unbindDocumentMouseUp&&(a.unbindDocumentMouseUp=a.unbindDocumentMouseUp()),a.unbindDocumentTouchEnd&&(a.unbindDocumentTouchEnd=a.unbindDocumentTouchEnd()));clearInterval(b.tooltipTimeout);
	a.objectEach(b,function(a,c){b[c]=null})}}})(J);(function(a){var z=a.charts,A=a.each,y=a.extend,h=a.map,d=a.noop,v=a.pick;y(a.Pointer.prototype,{pinchTranslate:function(a,d,h,m,f,q){this.zoomHor&&this.pinchTranslateDirection(!0,a,d,h,m,f,q);this.zoomVert&&this.pinchTranslateDirection(!1,a,d,h,m,f,q)},pinchTranslateDirection:function(a,d,h,m,f,q,l,c){var g=this.chart,b=a?"x":"y",e=a?"X":"Y",n="chart"+e,p=a?"width":"height",r=g["plot"+(a?"Left":"Top")],E,t,u=c||1,C=g.inverted,v=g.bounds[a?"h":"v"],
	x=1===d.length,F=d[0][n],G=h[0][n],H=!x&&d[1][n],k=!x&&h[1][n],w;h=function(){!x&&20<Math.abs(F-H)&&(u=c||Math.abs(G-k)/Math.abs(F-H));t=(r-G)/u+F;E=g["plot"+(a?"Width":"Height")]/u};h();d=t;d<v.min?(d=v.min,w=!0):d+E>v.max&&(d=v.max-E,w=!0);w?(G-=.8*(G-l[b][0]),x||(k-=.8*(k-l[b][1])),h()):l[b]=[G,k];C||(q[b]=t-r,q[p]=E);q=C?1/u:u;f[p]=E;f[b]=d;m[C?a?"scaleY":"scaleX":"scale"+e]=u;m["translate"+e]=q*r+(G-q*F)},pinch:function(a){var r=this,p=r.chart,m=r.pinchDown,f=a.touches,q=f.length,l=r.lastValidTouch,
	c=r.hasZoom,g=r.selectionMarker,b={},e=1===q&&(r.inClass(a.target,"highcharts-tracker")&&p.runTrackerClick||r.runChartClick),n={};1<q&&(r.initiated=!0);c&&r.initiated&&!e&&a.preventDefault();h(f,function(a){return r.normalize(a)});"touchstart"===a.type?(A(f,function(a,b){m[b]={chartX:a.chartX,chartY:a.chartY}}),l.x=[m[0].chartX,m[1]&&m[1].chartX],l.y=[m[0].chartY,m[1]&&m[1].chartY],A(p.axes,function(a){if(a.zoomEnabled){var b=p.bounds[a.horiz?"h":"v"],c=a.minPixelPadding,g=a.toPixels(v(a.options.min,
	a.dataMin)),e=a.toPixels(v(a.options.max,a.dataMax)),f=Math.max(g,e);b.min=Math.min(a.pos,Math.min(g,e)-c);b.max=Math.max(a.pos+a.len,f+c)}}),r.res=!0):r.followTouchMove&&1===q?this.runPointActions(r.normalize(a)):m.length&&(g||(r.selectionMarker=g=y({destroy:d,touch:!0},p.plotBox)),r.pinchTranslate(m,f,b,g,n,l),r.hasPinched=c,r.scaleGroups(b,n),r.res&&(r.res=!1,this.reset(!1,0)))},touch:function(d,h){var p=this.chart,m,f;if(p.index!==a.hoverChartIndex)this.onContainerMouseLeave({relatedTarget:!0});
	a.hoverChartIndex=p.index;1===d.touches.length?(d=this.normalize(d),(f=p.isInsidePlot(d.chartX-p.plotLeft,d.chartY-p.plotTop))&&!p.openMenu?(h&&this.runPointActions(d),"touchmove"===d.type&&(h=this.pinchDown,m=h[0]?4<=Math.sqrt(Math.pow(h[0].chartX-d.chartX,2)+Math.pow(h[0].chartY-d.chartY,2)):!1),v(m,!0)&&this.pinch(d)):h&&this.reset()):2===d.touches.length&&this.pinch(d)},onContainerTouchStart:function(a){this.zoomOption(a);this.touch(a,!0)},onContainerTouchMove:function(a){this.touch(a)},onDocumentTouchEnd:function(d){z[a.hoverChartIndex]&&
	z[a.hoverChartIndex].pointer.drop(d)}})})(J);(function(a){var z=a.addEvent,A=a.charts,y=a.css,h=a.doc,d=a.extend,v=a.noop,t=a.Pointer,r=a.removeEvent,p=a.win,m=a.wrap;if(!a.hasTouch&&(p.PointerEvent||p.MSPointerEvent)){var f={},q=!!p.PointerEvent,l=function(){var c=[];c.item=function(a){return this[a]};a.objectEach(f,function(a){c.push({pageX:a.pageX,pageY:a.pageY,target:a.target})});return c},c=function(c,b,e,f){"touch"!==c.pointerType&&c.pointerType!==c.MSPOINTER_TYPE_TOUCH||!A[a.hoverChartIndex]||
	(f(c),f=A[a.hoverChartIndex].pointer,f[b]({type:e,target:c.currentTarget,preventDefault:v,touches:l()}))};d(t.prototype,{onContainerPointerDown:function(a){c(a,"onContainerTouchStart","touchstart",function(a){f[a.pointerId]={pageX:a.pageX,pageY:a.pageY,target:a.currentTarget}})},onContainerPointerMove:function(a){c(a,"onContainerTouchMove","touchmove",function(a){f[a.pointerId]={pageX:a.pageX,pageY:a.pageY};f[a.pointerId].target||(f[a.pointerId].target=a.currentTarget)})},onDocumentPointerUp:function(a){c(a,
	"onDocumentTouchEnd","touchend",function(a){delete f[a.pointerId]})},batchMSEvents:function(a){a(this.chart.container,q?"pointerdown":"MSPointerDown",this.onContainerPointerDown);a(this.chart.container,q?"pointermove":"MSPointerMove",this.onContainerPointerMove);a(h,q?"pointerup":"MSPointerUp",this.onDocumentPointerUp)}});m(t.prototype,"init",function(a,b,c){a.call(this,b,c);this.hasZoom&&y(b.container,{"-ms-touch-action":"none","touch-action":"none"})});m(t.prototype,"setDOMEvents",function(a){a.apply(this);
	(this.hasZoom||this.followTouchMove)&&this.batchMSEvents(z)});m(t.prototype,"destroy",function(a){this.batchMSEvents(r);a.call(this)})}})(J);(function(a){var z=a.addEvent,A=a.css,y=a.discardElement,h=a.defined,d=a.each,v=a.isFirefox,t=a.marginNames,r=a.merge,p=a.pick,m=a.setAnimation,f=a.stableSort,q=a.win,l=a.wrap;a.Legend=function(a,g){this.init(a,g)};a.Legend.prototype={init:function(a,g){this.chart=a;this.setOptions(g);g.enabled&&(this.render(),z(this.chart,"endResize",function(){this.legend.positionCheckboxes()}))},
	setOptions:function(a){var c=p(a.padding,8);this.options=a;this.itemStyle=a.itemStyle;this.itemHiddenStyle=r(this.itemStyle,a.itemHiddenStyle);this.itemMarginTop=a.itemMarginTop||0;this.padding=c;this.initialItemY=c-5;this.itemHeight=this.maxItemWidth=0;this.symbolWidth=p(a.symbolWidth,16);this.pages=[]},update:function(a,g){var b=this.chart;this.setOptions(r(!0,this.options,a));this.destroy();b.isDirtyLegend=b.isDirtyBox=!0;p(g,!0)&&b.redraw()},colorizeItem:function(a,g){a.legendGroup[g?"removeClass":
	"addClass"]("highcharts-legend-item-hidden");var b=this.options,c=a.legendItem,f=a.legendLine,d=a.legendSymbol,h=this.itemHiddenStyle.color,b=g?b.itemStyle.color:h,l=g?a.color||h:h,m=a.options&&a.options.marker,u={fill:l};c&&c.css({fill:b,color:b});f&&f.attr({stroke:l});d&&(m&&d.isMarker&&(u=a.pointAttribs(),g||(u.stroke=u.fill=h)),d.attr(u))},positionItem:function(a){var c=this.options,b=c.symbolPadding,c=!c.rtl,e=a._legendItemPos,f=e[0],e=e[1],d=a.checkbox;(a=a.legendGroup)&&a.element&&a.translate(c?
	f:this.legendWidth-f-2*b-4,e);d&&(d.x=f,d.y=e)},destroyItem:function(a){var c=a.checkbox;d(["legendItem","legendLine","legendSymbol","legendGroup"],function(b){a[b]&&(a[b]=a[b].destroy())});c&&y(a.checkbox)},destroy:function(){function a(a){this[a]&&(this[a]=this[a].destroy())}d(this.getAllItems(),function(c){d(["legendItem","legendGroup"],a,c)});d("clipRect up down pager nav box title group".split(" "),a,this);this.display=null},positionCheckboxes:function(){var a=this.group&&this.group.alignAttr,
	g,b=this.clipHeight||this.legendHeight,e=this.titleHeight;a&&(g=a.translateY,d(this.allItems,function(c){var f=c.checkbox,d;f&&(d=g+e+f.y+(this.scrollOffset||0)+3,A(f,{left:a.translateX+c.checkboxOffset+f.x-20+"px",top:d+"px",display:d>g-6&&d<g+b-6?"":"none"}))},this))},renderTitle:function(){var a=this.options,g=this.padding,b=a.title,e=0;b.text&&(this.title||(this.title=this.chart.renderer.label(b.text,g-3,g-4,null,null,null,a.useHTML,null,"legend-title").attr({zIndex:1}).css(b.style).add(this.group)),
	a=this.title.getBBox(),e=a.height,this.offsetWidth=a.width,this.contentGroup.attr({translateY:e}));this.titleHeight=e},setText:function(c){var g=this.options;c.legendItem.attr({text:g.labelFormat?a.format(g.labelFormat,c):g.labelFormatter.call(c)})},renderItem:function(a){var c=this.chart,b=c.renderer,e=this.options,f="horizontal"===e.layout,d=this.symbolWidth,h=e.symbolPadding,l=this.itemStyle,m=this.itemHiddenStyle,u=this.padding,q=f?p(e.itemDistance,20):0,v=!e.rtl,x=e.width,F=e.itemMarginBottom||
	0,G=this.itemMarginTop,H=a.legendItem,k=!a.series,w=!k&&a.series.drawLegendSymbol?a.series:a,t=w.options,K=this.createCheckboxForItem&&t&&t.showCheckbox,t=d+h+q+(K?20:0),O=e.useHTML,L=a.options.className;H||(a.legendGroup=b.g("legend-item").addClass("highcharts-"+w.type+"-series highcharts-color-"+a.colorIndex+(L?" "+L:"")+(k?" highcharts-series-"+a.index:"")).attr({zIndex:1}).add(this.scrollGroup),a.legendItem=H=b.text("",v?d+h:-h,this.baseline||0,O).css(r(a.visible?l:m)).attr({align:v?"left":"right",
	zIndex:2}).add(a.legendGroup),this.baseline||(d=l.fontSize,this.fontMetrics=b.fontMetrics(d,H),this.baseline=this.fontMetrics.f+3+G,H.attr("y",this.baseline)),this.symbolHeight=e.symbolHeight||this.fontMetrics.f,w.drawLegendSymbol(this,a),this.setItemEvents&&this.setItemEvents(a,H,O),K&&this.createCheckboxForItem(a));this.colorizeItem(a,a.visible);l.width||H.css({width:(e.itemWidth||e.width||c.spacingBox.width)-t});this.setText(a);b=H.getBBox();l=a.checkboxOffset=e.itemWidth||a.legendItemWidth||b.width+
	t;this.itemHeight=b=Math.round(a.legendItemHeight||b.height||this.symbolHeight);f&&this.itemX-u+l>(x||c.spacingBox.width-2*u-e.x)&&(this.itemX=u,this.itemY+=G+this.lastLineHeight+F,this.lastLineHeight=0);this.maxItemWidth=Math.max(this.maxItemWidth,l);this.lastItemY=G+this.itemY+F;this.lastLineHeight=Math.max(b,this.lastLineHeight);a._legendItemPos=[this.itemX,this.itemY];f?this.itemX+=l:(this.itemY+=G+b+F,this.lastLineHeight=b);this.offsetWidth=x||Math.max((f?this.itemX-u-(a.checkbox?0:q):l)+u,this.offsetWidth)},
	getAllItems:function(){var a=[];d(this.chart.series,function(c){var b=c&&c.options;c&&p(b.showInLegend,h(b.linkedTo)?!1:void 0,!0)&&(a=a.concat(c.legendItems||("point"===b.legendType?c.data:c)))});return a},getAlignment:function(){var a=this.options;return a.floating?"":a.align.charAt(0)+a.verticalAlign.charAt(0)+a.layout.charAt(0)},adjustMargins:function(a,g){var b=this.chart,c=this.options,f=this.getAlignment();f&&d([/(lth|ct|rth)/,/(rtv|rm|rbv)/,/(rbh|cb|lbh)/,/(lbv|lm|ltv)/],function(e,d){e.test(f)&&
	!h(a[d])&&(b[t[d]]=Math.max(b[t[d]],b.legend[(d+1)%2?"legendHeight":"legendWidth"]+[1,-1,-1,1][d]*c[d%2?"x":"y"]+p(c.margin,12)+g[d]+(0===d?b.titleOffset+b.options.title.margin:0)))})},render:function(){var a=this,g=a.chart,b=g.renderer,e=a.group,n,h,l,m,q=a.box,u=a.options,p=a.padding;a.itemX=p;a.itemY=a.initialItemY;a.offsetWidth=0;a.lastItemY=0;e||(a.group=e=b.g("legend").attr({zIndex:7}).add(),a.contentGroup=b.g().attr({zIndex:1}).add(e),a.scrollGroup=b.g().add(a.contentGroup));a.renderTitle();
	n=a.getAllItems();f(n,function(a,b){return(a.options&&a.options.legendIndex||0)-(b.options&&b.options.legendIndex||0)});u.reversed&&n.reverse();a.allItems=n;a.display=h=!!n.length;a.lastLineHeight=0;d(n,function(b){a.renderItem(b)});l=(u.width||a.offsetWidth)+p;m=a.lastItemY+a.lastLineHeight+a.titleHeight;m=a.handleOverflow(m);m+=p;q||(a.box=q=b.rect().addClass("highcharts-legend-box").attr({r:u.borderRadius}).add(e),q.isNew=!0);q.attr({stroke:u.borderColor,"stroke-width":u.borderWidth||0,fill:u.backgroundColor||
	"none"}).shadow(u.shadow);0<l&&0<m&&(q[q.isNew?"attr":"animate"](q.crisp.call({},{x:0,y:0,width:l,height:m},q.strokeWidth())),q.isNew=!1);q[h?"show":"hide"]();a.legendWidth=l;a.legendHeight=m;d(n,function(b){a.positionItem(b)});h&&(b=g.spacingBox,/(lth|ct|rth)/.test(a.getAlignment())&&(b=r(b,{y:b.y+g.titleOffset+g.options.title.margin})),e.align(r(u,{width:l,height:m}),!0,b));g.isResizing||this.positionCheckboxes()},handleOverflow:function(a){var c=this,b=this.chart,e=b.renderer,f=this.options,h=
	f.y,l=this.padding,b=b.spacingBox.height+("top"===f.verticalAlign?-h:h)-l,h=f.maxHeight,m,q=this.clipRect,u=f.navigation,C=p(u.animation,!0),r=u.arrowSize||12,x=this.nav,F=this.pages,G,H=this.allItems,k=function(a){"number"===typeof a?q.attr({height:a}):q&&(c.clipRect=q.destroy(),c.contentGroup.clip());c.contentGroup.div&&(c.contentGroup.div.style.clip=a?"rect("+l+"px,9999px,"+(l+a)+"px,0)":"auto")};"horizontal"!==f.layout||"middle"===f.verticalAlign||f.floating||(b/=2);h&&(b=Math.min(b,h));F.length=
	0;a>b&&!1!==u.enabled?(this.clipHeight=m=Math.max(b-20-this.titleHeight-l,0),this.currentPage=p(this.currentPage,1),this.fullHeight=a,d(H,function(a,b){var c=a._legendItemPos[1],e=Math.round(a.legendItem.getBBox().height),g=F.length;if(!g||c-F[g-1]>m&&(G||c)!==F[g-1])F.push(G||c),g++;a.pageIx=g-1;G&&(H[b-1].pageIx=g-1);b===H.length-1&&c+e-F[g-1]>m&&(F.push(c),a.pageIx=g);c!==G&&(G=c)}),q||(q=c.clipRect=e.clipRect(0,l,9999,0),c.contentGroup.clip(q)),k(m),x||(this.nav=x=e.g().attr({zIndex:1}).add(this.group),
	this.up=e.symbol("triangle",0,0,r,r).on("click",function(){c.scroll(-1,C)}).add(x),this.pager=e.text("",15,10).addClass("highcharts-legend-navigation").css(u.style).add(x),this.down=e.symbol("triangle-down",0,0,r,r).on("click",function(){c.scroll(1,C)}).add(x)),c.scroll(0),a=b):x&&(k(),this.nav=x.destroy(),this.scrollGroup.attr({translateY:1}),this.clipHeight=0);return a},scroll:function(a,g){var b=this.pages,c=b.length;a=this.currentPage+a;var f=this.clipHeight,d=this.options.navigation,h=this.pager,
	l=this.padding;a>c&&(a=c);0<a&&(void 0!==g&&m(g,this.chart),this.nav.attr({translateX:l,translateY:f+this.padding+7+this.titleHeight,visibility:"visible"}),this.up.attr({"class":1===a?"highcharts-legend-nav-inactive":"highcharts-legend-nav-active"}),h.attr({text:a+"/"+c}),this.down.attr({x:18+this.pager.getBBox().width,"class":a===c?"highcharts-legend-nav-inactive":"highcharts-legend-nav-active"}),this.up.attr({fill:1===a?d.inactiveColor:d.activeColor}).css({cursor:1===a?"default":"pointer"}),this.down.attr({fill:a===
	c?d.inactiveColor:d.activeColor}).css({cursor:a===c?"default":"pointer"}),this.scrollOffset=-b[a-1]+this.initialItemY,this.scrollGroup.animate({translateY:this.scrollOffset}),this.currentPage=a,this.positionCheckboxes())}};a.LegendSymbolMixin={drawRectangle:function(a,g){var b=a.symbolHeight,c=a.options.squareSymbol;g.legendSymbol=this.chart.renderer.rect(c?(a.symbolWidth-b)/2:0,a.baseline-b+1,c?b:a.symbolWidth,b,p(a.options.symbolRadius,b/2)).addClass("highcharts-point").attr({zIndex:3}).add(g.legendGroup)},
	drawLineMarker:function(a){var c=this.options,b=c.marker,e=a.symbolWidth,f=a.symbolHeight,d=f/2,h=this.chart.renderer,l=this.legendGroup;a=a.baseline-Math.round(.3*a.fontMetrics.b);var m;m={"stroke-width":c.lineWidth||0};c.dashStyle&&(m.dashstyle=c.dashStyle);this.legendLine=h.path(["M",0,a,"L",e,a]).addClass("highcharts-graph").attr(m).add(l);b&&!1!==b.enabled&&(c=Math.min(p(b.radius,d),d),0===this.symbol.indexOf("url")&&(b=r(b,{width:f,height:f}),c=0),this.legendSymbol=b=h.symbol(this.symbol,e/
	2-c,a-c,2*c,2*c,b).addClass("highcharts-point").add(l),b.isMarker=!0)}};(/Trident\/7\.0/.test(q.navigator.userAgent)||v)&&l(a.Legend.prototype,"positionItem",function(a,g){var b=this,c=function(){g._legendItemPos&&a.call(b,g)};c();setTimeout(c)})})(J);(function(a){var z=a.addEvent,A=a.animate,y=a.animObject,h=a.attr,d=a.doc,v=a.Axis,t=a.createElement,r=a.defaultOptions,p=a.discardElement,m=a.charts,f=a.css,q=a.defined,l=a.each,c=a.extend,g=a.find,b=a.fireEvent,e=a.grep,n=a.isNumber,D=a.isObject,I=
	a.isString,E=a.Legend,M=a.marginNames,u=a.merge,C=a.objectEach,N=a.Pointer,x=a.pick,F=a.pInt,G=a.removeEvent,H=a.seriesTypes,k=a.splat,w=a.svg,P=a.syncTimeout,K=a.win,O=a.Chart=function(){this.getArgs.apply(this,arguments)};a.chart=function(a,b,c){return new O(a,b,c)};c(O.prototype,{callbacks:[],getArgs:function(){var a=[].slice.call(arguments);if(I(a[0])||a[0].nodeName)this.renderTo=a.shift();this.init(a[0],a[1])},init:function(b,c){var e,g,f=b.series,k=b.plotOptions||{};b.series=null;e=u(r,b);for(g in e.plotOptions)e.plotOptions[g].tooltip=
	k[g]&&u(k[g].tooltip)||void 0;e.tooltip.userOptions=b.chart&&b.chart.forExport&&b.tooltip.userOptions||b.tooltip;e.series=b.series=f;this.userOptions=b;b=e.chart;g=b.events;this.margin=[];this.spacing=[];this.bounds={h:{},v:{}};this.labelCollectors=[];this.callback=c;this.isResizing=0;this.options=e;this.axes=[];this.series=[];this.hasCartesianSeries=b.showAxes;var d=this;d.index=m.length;m.push(d);a.chartCount++;g&&C(g,function(a,b){z(d,b,a)});d.xAxis=[];d.yAxis=[];d.pointCount=d.colorCounter=d.symbolCounter=
	0;d.firstRender()},initSeries:function(b){var c=this.options.chart;(c=H[b.type||c.type||c.defaultSeriesType])||a.error(17,!0);c=new c;c.init(this,b);return c},orderSeries:function(a){var b=this.series;for(a=a||0;a<b.length;a++)b[a]&&(b[a].index=a,b[a].name=b[a].name||"Series "+(b[a].index+1))},isInsidePlot:function(a,b,c){var e=c?b:a;a=c?a:b;return 0<=e&&e<=this.plotWidth&&0<=a&&a<=this.plotHeight},redraw:function(e){var g=this.axes,f=this.series,d=this.pointer,k=this.legend,x=this.isDirtyLegend,
	h,n,w=this.hasCartesianSeries,m=this.isDirtyBox,u,q=this.renderer,F=q.isHidden(),G=[];this.setResponsive&&this.setResponsive(!1);a.setAnimation(e,this);F&&this.temporaryDisplay();this.layOutTitles();for(e=f.length;e--;)if(u=f[e],u.options.stacking&&(h=!0,u.isDirty)){n=!0;break}if(n)for(e=f.length;e--;)u=f[e],u.options.stacking&&(u.isDirty=!0);l(f,function(a){a.isDirty&&"point"===a.options.legendType&&(a.updateTotals&&a.updateTotals(),x=!0);a.isDirtyData&&b(a,"updatedData")});x&&k.options.enabled&&
	(k.render(),this.isDirtyLegend=!1);h&&this.getStacks();w&&l(g,function(a){a.updateNames();a.setScale()});this.getMargins();w&&(l(g,function(a){a.isDirty&&(m=!0)}),l(g,function(a){var e=a.min+","+a.max;a.extKey!==e&&(a.extKey=e,G.push(function(){b(a,"afterSetExtremes",c(a.eventArgs,a.getExtremes()));delete a.eventArgs}));(m||h)&&a.redraw()}));m&&this.drawChartBox();b(this,"predraw");l(f,function(a){(m||a.isDirty)&&a.visible&&a.redraw();a.isDirtyData=!1});d&&d.reset(!0);q.draw();b(this,"redraw");b(this,
	"render");F&&this.temporaryDisplay(!0);l(G,function(a){a.call()})},get:function(a){function b(b){return b.id===a||b.options&&b.options.id===a}var c,e=this.series,f;c=g(this.axes,b)||g(this.series,b);for(f=0;!c&&f<e.length;f++)c=g(e[f].points||[],b);return c},getAxes:function(){var a=this,b=this.options,c=b.xAxis=k(b.xAxis||{}),b=b.yAxis=k(b.yAxis||{});l(c,function(a,b){a.index=b;a.isX=!0});l(b,function(a,b){a.index=b});c=c.concat(b);l(c,function(b){new v(a,b)})},getSelectedPoints:function(){var a=
	[];l(this.series,function(b){a=a.concat(e(b.data||[],function(a){return a.selected}))});return a},getSelectedSeries:function(){return e(this.series,function(a){return a.selected})},setTitle:function(a,b,c){var e=this,g=e.options,f;f=g.title=u({style:{color:"#333333",fontSize:g.isStock?"16px":"18px"}},g.title,a);g=g.subtitle=u({style:{color:"#666666"}},g.subtitle,b);l([["title",a,f],["subtitle",b,g]],function(a,b){var c=a[0],g=e[c],f=a[1];a=a[2];g&&f&&(e[c]=g=g.destroy());a&&!g&&(e[c]=e.renderer.text(a.text,
	0,0,a.useHTML).attr({align:a.align,"class":"highcharts-"+c,zIndex:a.zIndex||4}).add(),e[c].update=function(a){e.setTitle(!b&&a,b&&a)},e[c].css(a.style))});e.layOutTitles(c)},layOutTitles:function(a){var b=0,e,g=this.renderer,f=this.spacingBox;l(["title","subtitle"],function(a){var e=this[a],d=this.options[a];a="title"===a?-3:d.verticalAlign?0:b+2;var k;e&&(k=d.style.fontSize,k=g.fontMetrics(k,e).b,e.css({width:(d.width||f.width+d.widthAdjust)+"px"}).align(c({y:a+k},d),!1,"spacingBox"),d.floating||
	d.verticalAlign||(b=Math.ceil(b+e.getBBox(d.useHTML).height)))},this);e=this.titleOffset!==b;this.titleOffset=b;!this.isDirtyBox&&e&&(this.isDirtyBox=e,this.hasRendered&&x(a,!0)&&this.isDirtyBox&&this.redraw())},getChartSize:function(){var b=this.options.chart,c=b.width,b=b.height,e=this.renderTo;q(c)||(this.containerWidth=a.getStyle(e,"width"));q(b)||(this.containerHeight=a.getStyle(e,"height"));this.chartWidth=Math.max(0,c||this.containerWidth||600);this.chartHeight=Math.max(0,a.relativeLength(b,
	this.chartWidth)||(1<this.containerHeight?this.containerHeight:400))},temporaryDisplay:function(b){var c=this.renderTo;if(b)for(;c&&c.style;)c.hcOrigStyle&&(a.css(c,c.hcOrigStyle),delete c.hcOrigStyle),c.hcOrigDetached&&(d.body.removeChild(c),c.hcOrigDetached=!1),c=c.parentNode;else for(;c&&c.style;){d.body.contains(c)||c.parentNode||(c.hcOrigDetached=!0,d.body.appendChild(c));if("none"===a.getStyle(c,"display",!1)||c.hcOricDetached)c.hcOrigStyle={display:c.style.display,height:c.style.height,overflow:c.style.overflow},
	b={display:"block",overflow:"hidden"},c!==this.renderTo&&(b.height=0),a.css(c,b),c.offsetWidth||c.style.setProperty("display","block","important");c=c.parentNode;if(c===d.body)break}},setClassName:function(a){this.container.className="highcharts-container "+(a||"")},getContainer:function(){var b,e=this.options,g=e.chart,f,k;b=this.renderTo;var x=a.uniqueKey(),l;b||(this.renderTo=b=g.renderTo);I(b)&&(this.renderTo=b=d.getElementById(b));b||a.error(13,!0);f=F(h(b,"data-highcharts-chart"));n(f)&&m[f]&&
	m[f].hasRendered&&m[f].destroy();h(b,"data-highcharts-chart",this.index);b.innerHTML="";g.skipClone||b.offsetWidth||this.temporaryDisplay();this.getChartSize();f=this.chartWidth;k=this.chartHeight;l=c({position:"relative",overflow:"hidden",width:f+"px",height:k+"px",textAlign:"left",lineHeight:"normal",zIndex:0,"-webkit-tap-highlight-color":"rgba(0,0,0,0)"},g.style);this.container=b=t("div",{id:x},l,b);this._cursor=b.style.cursor;this.renderer=new (a[g.renderer]||a.Renderer)(b,f,k,null,g.forExport,
	e.exporting&&e.exporting.allowHTML);this.setClassName(g.className);this.renderer.setStyle(g.style);this.renderer.chartIndex=this.index},getMargins:function(a){var b=this.spacing,c=this.margin,e=this.titleOffset;this.resetMargins();e&&!q(c[0])&&(this.plotTop=Math.max(this.plotTop,e+this.options.title.margin+b[0]));this.legend&&this.legend.display&&this.legend.adjustMargins(c,b);this.extraMargin&&(this[this.extraMargin.type]=(this[this.extraMargin.type]||0)+this.extraMargin.value);this.adjustPlotArea&&
	this.adjustPlotArea();a||this.getAxisMargins()},getAxisMargins:function(){var a=this,b=a.axisOffset=[0,0,0,0],c=a.margin;a.hasCartesianSeries&&l(a.axes,function(a){a.visible&&a.getOffset()});l(M,function(e,g){q(c[g])||(a[e]+=b[g])});a.setChartSize()},reflow:function(b){var c=this,e=c.options.chart,g=c.renderTo,f=q(e.width)&&q(e.height),k=e.width||a.getStyle(g,"width"),e=e.height||a.getStyle(g,"height"),g=b?b.target:K;if(!f&&!c.isPrinting&&k&&e&&(g===K||g===d)){if(k!==c.containerWidth||e!==c.containerHeight)clearTimeout(c.reflowTimeout),
	c.reflowTimeout=P(function(){c.container&&c.setSize(void 0,void 0,!1)},b?100:0);c.containerWidth=k;c.containerHeight=e}},initReflow:function(){var a=this,b;b=z(K,"resize",function(b){a.reflow(b)});z(a,"destroy",b)},setSize:function(c,e,g){var k=this,d=k.renderer;k.isResizing+=1;a.setAnimation(g,k);k.oldChartHeight=k.chartHeight;k.oldChartWidth=k.chartWidth;void 0!==c&&(k.options.chart.width=c);void 0!==e&&(k.options.chart.height=e);k.getChartSize();c=d.globalAnimation;(c?A:f)(k.container,{width:k.chartWidth+
	"px",height:k.chartHeight+"px"},c);k.setChartSize(!0);d.setSize(k.chartWidth,k.chartHeight,g);l(k.axes,function(a){a.isDirty=!0;a.setScale()});k.isDirtyLegend=!0;k.isDirtyBox=!0;k.layOutTitles();k.getMargins();k.redraw(g);k.oldChartHeight=null;b(k,"resize");P(function(){k&&b(k,"endResize",null,function(){--k.isResizing})},y(c).duration)},setChartSize:function(a){var b=this.inverted,c=this.renderer,e=this.chartWidth,g=this.chartHeight,f=this.options.chart,k=this.spacing,d=this.clipOffset,x,h,n,w;this.plotLeft=
	x=Math.round(this.plotLeft);this.plotTop=h=Math.round(this.plotTop);this.plotWidth=n=Math.max(0,Math.round(e-x-this.marginRight));this.plotHeight=w=Math.max(0,Math.round(g-h-this.marginBottom));this.plotSizeX=b?w:n;this.plotSizeY=b?n:w;this.plotBorderWidth=f.plotBorderWidth||0;this.spacingBox=c.spacingBox={x:k[3],y:k[0],width:e-k[3]-k[1],height:g-k[0]-k[2]};this.plotBox=c.plotBox={x:x,y:h,width:n,height:w};e=2*Math.floor(this.plotBorderWidth/2);b=Math.ceil(Math.max(e,d[3])/2);c=Math.ceil(Math.max(e,
	d[0])/2);this.clipBox={x:b,y:c,width:Math.floor(this.plotSizeX-Math.max(e,d[1])/2-b),height:Math.max(0,Math.floor(this.plotSizeY-Math.max(e,d[2])/2-c))};a||l(this.axes,function(a){a.setAxisSize();a.setAxisTranslation()})},resetMargins:function(){var a=this,b=a.options.chart;l(["margin","spacing"],function(c){var e=b[c],g=D(e)?e:[e,e,e,e];l(["Top","Right","Bottom","Left"],function(e,f){a[c][f]=x(b[c+e],g[f])})});l(M,function(b,c){a[b]=x(a.margin[c],a.spacing[c])});a.axisOffset=[0,0,0,0];a.clipOffset=
	[0,0,0,0]},drawChartBox:function(){var a=this.options.chart,b=this.renderer,c=this.chartWidth,e=this.chartHeight,g=this.chartBackground,f=this.plotBackground,k=this.plotBorder,d,x=this.plotBGImage,h=a.backgroundColor,n=a.plotBackgroundColor,l=a.plotBackgroundImage,w,m=this.plotLeft,u=this.plotTop,q=this.plotWidth,F=this.plotHeight,G=this.plotBox,p=this.clipRect,C=this.clipBox,H="animate";g||(this.chartBackground=g=b.rect().addClass("highcharts-background").add(),H="attr");d=a.borderWidth||0;w=d+(a.shadow?
	8:0);h={fill:h||"none"};if(d||g["stroke-width"])h.stroke=a.borderColor,h["stroke-width"]=d;g.attr(h).shadow(a.shadow);g[H]({x:w/2,y:w/2,width:c-w-d%2,height:e-w-d%2,r:a.borderRadius});H="animate";f||(H="attr",this.plotBackground=f=b.rect().addClass("highcharts-plot-background").add());f[H](G);f.attr({fill:n||"none"}).shadow(a.plotShadow);l&&(x?x.animate(G):this.plotBGImage=b.image(l,m,u,q,F).add());p?p.animate({width:C.width,height:C.height}):this.clipRect=b.clipRect(C);H="animate";k||(H="attr",this.plotBorder=
	k=b.rect().addClass("highcharts-plot-border").attr({zIndex:1}).add());k.attr({stroke:a.plotBorderColor,"stroke-width":a.plotBorderWidth||0,fill:"none"});k[H](k.crisp({x:m,y:u,width:q,height:F},-k.strokeWidth()));this.isDirtyBox=!1},propFromSeries:function(){var a=this,b=a.options.chart,c,e=a.options.series,g,f;l(["inverted","angular","polar"],function(k){c=H[b.type||b.defaultSeriesType];f=b[k]||c&&c.prototype[k];for(g=e&&e.length;!f&&g--;)(c=H[e[g].type])&&c.prototype[k]&&(f=!0);a[k]=f})},linkSeries:function(){var a=
	this,b=a.series;l(b,function(a){a.linkedSeries.length=0});l(b,function(b){var c=b.options.linkedTo;I(c)&&(c=":previous"===c?a.series[b.index-1]:a.get(c))&&c.linkedParent!==b&&(c.linkedSeries.push(b),b.linkedParent=c,b.visible=x(b.options.visible,c.options.visible,b.visible))})},renderSeries:function(){l(this.series,function(a){a.translate();a.render()})},renderLabels:function(){var a=this,b=a.options.labels;b.items&&l(b.items,function(e){var g=c(b.style,e.style),f=F(g.left)+a.plotLeft,k=F(g.top)+
	a.plotTop+12;delete g.left;delete g.top;a.renderer.text(e.html,f,k).attr({zIndex:2}).css(g).add()})},render:function(){var a=this.axes,b=this.renderer,c=this.options,e,g,f;this.setTitle();this.legend=new E(this,c.legend);this.getStacks&&this.getStacks();this.getMargins(!0);this.setChartSize();c=this.plotWidth;e=this.plotHeight=Math.max(this.plotHeight-21,0);l(a,function(a){a.setScale()});this.getAxisMargins();g=1.1<c/this.plotWidth;f=1.05<e/this.plotHeight;if(g||f)l(a,function(a){(a.horiz&&g||!a.horiz&&
	f)&&a.setTickInterval(!0)}),this.getMargins();this.drawChartBox();this.hasCartesianSeries&&l(a,function(a){a.visible&&a.render()});this.seriesGroup||(this.seriesGroup=b.g("series-group").attr({zIndex:3}).add());this.renderSeries();this.renderLabels();this.addCredits();this.setResponsive&&this.setResponsive();this.hasRendered=!0},addCredits:function(a){var b=this;a=u(!0,this.options.credits,a);a.enabled&&!this.credits&&(this.credits=this.renderer.text(a.text+(this.mapCredits||""),0,0).addClass("highcharts-credits").on("click",
	function(){a.href&&(K.location.href=a.href)}).attr({align:a.position.align,zIndex:8}).css(a.style).add().align(a.position),this.credits.update=function(a){b.credits=b.credits.destroy();b.addCredits(a)})},destroy:function(){var c=this,e=c.axes,g=c.series,f=c.container,k,d=f&&f.parentNode;b(c,"destroy");c.renderer.forExport?a.erase(m,c):m[c.index]=void 0;a.chartCount--;c.renderTo.removeAttribute("data-highcharts-chart");G(c);for(k=e.length;k--;)e[k]=e[k].destroy();this.scroller&&this.scroller.destroy&&
	this.scroller.destroy();for(k=g.length;k--;)g[k]=g[k].destroy();l("title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" "),function(a){var b=c[a];b&&b.destroy&&(c[a]=b.destroy())});f&&(f.innerHTML="",G(f),d&&p(f));C(c,function(a,b){delete c[b]})},isReadyToRender:function(){var a=this;return w||K!=K.top||"complete"===d.readyState?!0:(d.attachEvent("onreadystatechange",function(){d.detachEvent("onreadystatechange",
	a.firstRender);"complete"===d.readyState&&a.firstRender()}),!1)},firstRender:function(){var a=this,c=a.options;if(a.isReadyToRender()){a.getContainer();b(a,"init");a.resetMargins();a.setChartSize();a.propFromSeries();a.getAxes();l(c.series||[],function(b){a.initSeries(b)});a.linkSeries();b(a,"beforeRender");N&&(a.pointer=new N(a,c));a.render();if(!a.renderer.imgCount&&a.onload)a.onload();a.temporaryDisplay(!0)}},onload:function(){l([this.callback].concat(this.callbacks),function(a){a&&void 0!==this.index&&
	a.apply(this,[this])},this);b(this,"load");b(this,"render");q(this.index)&&!1!==this.options.chart.reflow&&this.initReflow();this.onload=null}})})(J);(function(a){var z,A=a.each,y=a.extend,h=a.erase,d=a.fireEvent,v=a.format,t=a.isArray,r=a.isNumber,p=a.pick,m=a.removeEvent;a.Point=z=function(){};a.Point.prototype={init:function(a,d,h){this.series=a;this.color=a.color;this.applyOptions(d,h);a.options.colorByPoint?(d=a.options.colors||a.chart.options.colors,this.color=this.color||d[a.colorCounter],
	d=d.length,h=a.colorCounter,a.colorCounter++,a.colorCounter===d&&(a.colorCounter=0)):h=a.colorIndex;this.colorIndex=p(this.colorIndex,h);a.chart.pointCount++;return this},applyOptions:function(a,d){var f=this.series,c=f.options.pointValKey||f.pointValKey;a=z.prototype.optionsToObject.call(this,a);y(this,a);this.options=this.options?y(this.options,a):a;a.group&&delete this.group;c&&(this.y=this[c]);this.isNull=p(this.isValid&&!this.isValid(),null===this.x||!r(this.y,!0));this.selected&&(this.state=
	"select");"name"in this&&void 0===d&&f.xAxis&&f.xAxis.hasNames&&(this.x=f.xAxis.nameToX(this));void 0===this.x&&f&&(this.x=void 0===d?f.autoIncrement(this):d);return this},optionsToObject:function(a){var f={},d=this.series,c=d.options.keys,g=c||d.pointArrayMap||["y"],b=g.length,e=0,h=0;if(r(a)||null===a)f[g[0]]=a;else if(t(a))for(!c&&a.length>b&&(d=typeof a[0],"string"===d?f.name=a[0]:"number"===d&&(f.x=a[0]),e++);h<b;)c&&void 0===a[e]||(f[g[h]]=a[e]),e++,h++;else"object"===typeof a&&(f=a,a.dataLabels&&
	(d._hasPointLabels=!0),a.marker&&(d._hasPointMarkers=!0));return f},getClassName:function(){return"highcharts-point"+(this.selected?" highcharts-point-select":"")+(this.negative?" highcharts-negative":"")+(this.isNull?" highcharts-null-point":"")+(void 0!==this.colorIndex?" highcharts-color-"+this.colorIndex:"")+(this.options.className?" "+this.options.className:"")+(this.zone&&this.zone.className?" "+this.zone.className.replace("highcharts-negative",""):"")},getZone:function(){var a=this.series,
	d=a.zones,a=a.zoneAxis||"y",h=0,c;for(c=d[h];this[a]>=c.value;)c=d[++h];c&&c.color&&!this.options.color&&(this.color=c.color);return c},destroy:function(){var a=this.series.chart,d=a.hoverPoints,l;a.pointCount--;d&&(this.setState(),h(d,this),d.length||(a.hoverPoints=null));if(this===a.hoverPoint)this.onMouseOut();if(this.graphic||this.dataLabel)m(this),this.destroyElements();this.legendItem&&a.legend.destroyItem(this);for(l in this)this[l]=null},destroyElements:function(){for(var a=["graphic","dataLabel",
	"dataLabelUpper","connector","shadowGroup"],d,h=6;h--;)d=a[h],this[d]&&(this[d]=this[d].destroy())},getLabelConfig:function(){return{x:this.category,y:this.y,color:this.color,colorIndex:this.colorIndex,key:this.name||this.category,series:this.series,point:this,percentage:this.percentage,total:this.total||this.stackTotal}},tooltipFormatter:function(a){var d=this.series,f=d.tooltipOptions,c=p(f.valueDecimals,""),g=f.valuePrefix||"",b=f.valueSuffix||"";A(d.pointArrayMap||["y"],function(e){e="{point."+
	e;if(g||b)a=a.replace(e+"}",g+e+"}"+b);a=a.replace(e+"}",e+":,."+c+"f}")});return v(a,{point:this,series:this.series})},firePointEvent:function(a,h,m){var c=this,g=this.series.options;(g.point.events[a]||c.options&&c.options.events&&c.options.events[a])&&this.importEvents();"click"===a&&g.allowPointSelect&&(m=function(a){c.select&&c.select(null,a.ctrlKey||a.metaKey||a.shiftKey)});d(this,a,h,m)},visible:!0}})(J);(function(a){var z=a.addEvent,A=a.animObject,y=a.arrayMax,h=a.arrayMin,d=a.correctFloat,
	v=a.Date,t=a.defaultOptions,r=a.defaultPlotOptions,p=a.defined,m=a.each,f=a.erase,q=a.extend,l=a.fireEvent,c=a.grep,g=a.isArray,b=a.isNumber,e=a.isString,n=a.merge,D=a.objectEach,I=a.pick,E=a.removeEvent,M=a.splat,u=a.SVGElement,C=a.syncTimeout,N=a.win;a.Series=a.seriesType("line",null,{lineWidth:2,allowPointSelect:!1,showCheckbox:!1,animation:{duration:1E3},events:{},marker:{lineWidth:0,lineColor:"#ffffff",radius:4,states:{hover:{animation:{duration:50},enabled:!0,radiusPlus:2,lineWidthPlus:1},select:{fillColor:"#cccccc",
	lineColor:"#000000",lineWidth:2}}},point:{events:{}},dataLabels:{align:"center",formatter:function(){return null===this.y?"":a.numberFormat(this.y,-1)},style:{fontSize:"11px",fontWeight:"bold",color:"contrast",textOutline:"1px contrast"},verticalAlign:"bottom",x:0,y:0,padding:5},cropThreshold:300,pointRange:0,softThreshold:!0,states:{hover:{animation:{duration:50},lineWidthPlus:1,marker:{},halo:{size:10,opacity:.25}},select:{marker:{}}},stickyTracking:!0,turboThreshold:1E3,findNearestPointBy:"x"},
	{isCartesian:!0,pointClass:a.Point,sorted:!0,requireSorting:!0,directTouch:!1,axisTypes:["xAxis","yAxis"],colorCounter:0,parallelArrays:["x","y"],coll:"series",init:function(a,b){var c=this,e,g=a.series,d;c.chart=a;c.options=b=c.setOptions(b);c.linkedSeries=[];c.bindAxes();q(c,{name:b.name,state:"",visible:!1!==b.visible,selected:!0===b.selected});e=b.events;D(e,function(a,b){z(c,b,a)});if(e&&e.click||b.point&&b.point.events&&b.point.events.click||b.allowPointSelect)a.runTrackerClick=!0;c.getColor();
	c.getSymbol();m(c.parallelArrays,function(a){c[a+"Data"]=[]});c.setData(b.data,!1);c.isCartesian&&(a.hasCartesianSeries=!0);g.length&&(d=g[g.length-1]);c._i=I(d&&d._i,-1)+1;a.orderSeries(this.insert(g))},insert:function(a){var c=this.options.index,e;if(b(c)){for(e=a.length;e--;)if(c>=I(a[e].options.index,a[e]._i)){a.splice(e+1,0,this);break}-1===e&&a.unshift(this);e+=1}else a.push(this);return I(e,a.length-1)},bindAxes:function(){var b=this,c=b.options,e=b.chart,g;m(b.axisTypes||[],function(d){m(e[d],
	function(a){g=a.options;if(c[d]===g.index||void 0!==c[d]&&c[d]===g.id||void 0===c[d]&&0===g.index)b.insert(a.series),b[d]=a,a.isDirty=!0});b[d]||b.optionalAxis===d||a.error(18,!0)})},updateParallelArrays:function(a,c){var e=a.series,g=arguments,d=b(c)?function(b){var g="y"===b&&e.toYData?e.toYData(a):a[b];e[b+"Data"][c]=g}:function(a){Array.prototype[c].apply(e[a+"Data"],Array.prototype.slice.call(g,2))};m(e.parallelArrays,d)},autoIncrement:function(){var b=this.options,c=this.xIncrement,e,g=b.pointIntervalUnit,
	d=0,c=I(c,b.pointStart,0);this.pointInterval=e=I(this.pointInterval,b.pointInterval,1);g&&(b=new v(c),"day"===g?b=+b[v.hcSetDate](b[v.hcGetDate]()+e):"month"===g?b=+b[v.hcSetMonth](b[v.hcGetMonth]()+e):"year"===g&&(b=+b[v.hcSetFullYear](b[v.hcGetFullYear]()+e)),v.hcHasTimeZone&&(d=a.getTZOffset(b)-a.getTZOffset(c)),e=b-c+d);this.xIncrement=c+e;return c},setOptions:function(a){var b=this.chart,c=b.options,e=c.plotOptions,g=(b.userOptions||{}).plotOptions||{},d=e[this.type];this.userOptions=a;b=n(d,
	e.series,a);this.tooltipOptions=n(t.tooltip,t.plotOptions.series&&t.plotOptions.series.tooltip,t.plotOptions[this.type].tooltip,c.tooltip.userOptions,e.series&&e.series.tooltip,e[this.type].tooltip,a.tooltip);this.stickyTracking=I(a.stickyTracking,g[this.type]&&g[this.type].stickyTracking,g.series&&g.series.stickyTracking,this.tooltipOptions.shared&&!this.noSharedTooltip?!0:b.stickyTracking);null===d.marker&&delete b.marker;this.zoneAxis=b.zoneAxis;a=this.zones=(b.zones||[]).slice();!b.negativeColor&&
	!b.negativeFillColor||b.zones||a.push({value:b[this.zoneAxis+"Threshold"]||b.threshold||0,className:"highcharts-negative",color:b.negativeColor,fillColor:b.negativeFillColor});a.length&&p(a[a.length-1].value)&&a.push({color:this.color,fillColor:this.fillColor});return b},getCyclic:function(a,b,c){var e,g=this.chart,d=this.userOptions,f=a+"Index",h=a+"Counter",n=c?c.length:I(g.options.chart[a+"Count"],g[a+"Count"]);b||(e=I(d[f],d["_"+f]),p(e)||(g.series.length||(g[h]=0),d["_"+f]=e=g[h]%n,g[h]+=1),
	c&&(b=c[e]));void 0!==e&&(this[f]=e);this[a]=b},getColor:function(){this.options.colorByPoint?this.options.color=null:this.getCyclic("color",this.options.color||r[this.type].color,this.chart.options.colors)},getSymbol:function(){this.getCyclic("symbol",this.options.marker.symbol,this.chart.options.symbols)},drawLegendSymbol:a.LegendSymbolMixin.drawLineMarker,setData:function(c,d,f,h){var k=this,n=k.points,x=n&&n.length||0,l,u=k.options,q=k.chart,p=null,F=k.xAxis,C=u.turboThreshold,G=this.xData,r=
	this.yData,E=(l=k.pointArrayMap)&&l.length;c=c||[];l=c.length;d=I(d,!0);if(!1!==h&&l&&x===l&&!k.cropped&&!k.hasGroupedData&&k.visible)m(c,function(a,b){n[b].update&&a!==u.data[b]&&n[b].update(a,!1,null,!1)});else{k.xIncrement=null;k.colorCounter=0;m(this.parallelArrays,function(a){k[a+"Data"].length=0});if(C&&l>C){for(f=0;null===p&&f<l;)p=c[f],f++;if(b(p))for(f=0;f<l;f++)G[f]=this.autoIncrement(),r[f]=c[f];else if(g(p))if(E)for(f=0;f<l;f++)p=c[f],G[f]=p[0],r[f]=p.slice(1,E+1);else for(f=0;f<l;f++)p=
	c[f],G[f]=p[0],r[f]=p[1];else a.error(12)}else for(f=0;f<l;f++)void 0!==c[f]&&(p={series:k},k.pointClass.prototype.applyOptions.apply(p,[c[f]]),k.updateParallelArrays(p,f));r&&e(r[0])&&a.error(14,!0);k.data=[];k.options.data=k.userOptions.data=c;for(f=x;f--;)n[f]&&n[f].destroy&&n[f].destroy();F&&(F.minRange=F.userMinRange);k.isDirty=q.isDirtyBox=!0;k.isDirtyData=!!n;f=!1}"point"===u.legendType&&(this.processData(),this.generatePoints());d&&q.redraw(f)},processData:function(b){var c=this.xData,e=this.yData,
	g=c.length,d;d=0;var f,h,n=this.xAxis,x,m=this.options;x=m.cropThreshold;var l=this.getExtremesFromAll||m.getExtremesFromAll,u=this.isCartesian,m=n&&n.val2lin,q=n&&n.isLog,p=this.requireSorting,C,r;if(u&&!this.isDirty&&!n.isDirty&&!this.yAxis.isDirty&&!b)return!1;n&&(b=n.getExtremes(),C=b.min,r=b.max);if(u&&this.sorted&&!l&&(!x||g>x||this.forceCrop))if(c[g-1]<C||c[0]>r)c=[],e=[];else if(c[0]<C||c[g-1]>r)d=this.cropData(this.xData,this.yData,C,r),c=d.xData,e=d.yData,d=d.start,f=!0;for(x=c.length||
	1;--x;)g=q?m(c[x])-m(c[x-1]):c[x]-c[x-1],0<g&&(void 0===h||g<h)?h=g:0>g&&p&&(a.error(15),p=!1);this.cropped=f;this.cropStart=d;this.processedXData=c;this.processedYData=e;this.closestPointRange=h},cropData:function(a,b,c,e){var g=a.length,d=0,f=g,h=I(this.cropShoulder,1),n;for(n=0;n<g;n++)if(a[n]>=c){d=Math.max(0,n-h);break}for(c=n;c<g;c++)if(a[c]>e){f=c+h;break}return{xData:a.slice(d,f),yData:b.slice(d,f),start:d,end:f}},generatePoints:function(){var a=this.options,b=a.data,c=this.data,e,g=this.processedXData,
	d=this.processedYData,f=this.pointClass,h=g.length,n=this.cropStart||0,m,l=this.hasGroupedData,a=a.keys,u,p=[],q;c||l||(c=[],c.length=b.length,c=this.data=c);a&&l&&(this.options.keys=!1);for(q=0;q<h;q++)m=n+q,l?(u=(new f).init(this,[g[q]].concat(M(d[q]))),u.dataGroup=this.groupMap[q]):(u=c[m])||void 0===b[m]||(c[m]=u=(new f).init(this,b[m],g[q])),u&&(u.index=m,p[q]=u);this.options.keys=a;if(c&&(h!==(e=c.length)||l))for(q=0;q<e;q++)q!==n||l||(q+=h),c[q]&&(c[q].destroyElements(),c[q].plotX=void 0);
	this.data=c;this.points=p},getExtremes:function(a){var c=this.yAxis,e=this.processedXData,d,f=[],n=0;d=this.xAxis.getExtremes();var x=d.min,m=d.max,l,u,q,p;a=a||this.stackedYData||this.processedYData||[];d=a.length;for(p=0;p<d;p++)if(u=e[p],q=a[p],l=(b(q,!0)||g(q))&&(!c.positiveValuesOnly||q.length||0<q),u=this.getExtremesFromAll||this.options.getExtremesFromAll||this.cropped||(e[p+1]||u)>=x&&(e[p-1]||u)<=m,l&&u)if(l=q.length)for(;l--;)"number"===typeof q[l]&&(f[n++]=q[l]);else f[n++]=q;this.dataMin=
	h(f);this.dataMax=y(f)},translate:function(){this.processedXData||this.processData();this.generatePoints();var a=this.options,c=a.stacking,e=this.xAxis,g=e.categories,f=this.yAxis,h=this.points,n=h.length,m=!!this.modifyValue,l=a.pointPlacement,u="between"===l||b(l),q=a.threshold,C=a.startFromThreshold?q:0,r,E,v,t,M=Number.MAX_VALUE;"between"===l&&(l=.5);b(l)&&(l*=I(a.pointRange||e.pointRange));for(a=0;a<n;a++){var D=h[a],N=D.x,y=D.y;E=D.low;var z=c&&f.stacks[(this.negStacks&&y<(C?0:q)?"-":"")+this.stackKey],
	A;f.positiveValuesOnly&&null!==y&&0>=y&&(D.isNull=!0);D.plotX=r=d(Math.min(Math.max(-1E5,e.translate(N,0,0,0,1,l,"flags"===this.type)),1E5));c&&this.visible&&!D.isNull&&z&&z[N]&&(t=this.getStackIndicator(t,N,this.index),A=z[N],y=A.points[t.key],E=y[0],y=y[1],E===C&&t.key===z[N].base&&(E=I(q,f.min)),f.positiveValuesOnly&&0>=E&&(E=null),D.total=D.stackTotal=A.total,D.percentage=A.total&&D.y/A.total*100,D.stackY=y,A.setOffset(this.pointXOffset||0,this.barW||0));D.yBottom=p(E)?f.translate(E,0,1,0,1):
	null;m&&(y=this.modifyValue(y,D));D.plotY=E="number"===typeof y&&Infinity!==y?Math.min(Math.max(-1E5,f.translate(y,0,1,0,1)),1E5):void 0;D.isInside=void 0!==E&&0<=E&&E<=f.len&&0<=r&&r<=e.len;D.clientX=u?d(e.translate(N,0,0,0,1,l)):r;D.negative=D.y<(q||0);D.category=g&&void 0!==g[D.x]?g[D.x]:D.x;D.isNull||(void 0!==v&&(M=Math.min(M,Math.abs(r-v))),v=r);D.zone=this.zones.length&&D.getZone()}this.closestPointRangePx=M},getValidPoints:function(a,b){var e=this.chart;return c(a||this.points||[],function(a){return b&&
	!e.isInsidePlot(a.plotX,a.plotY,e.inverted)?!1:!a.isNull})},setClip:function(a){var b=this.chart,c=this.options,e=b.renderer,g=b.inverted,d=this.clipBox,f=d||b.clipBox,h=this.sharedClipKey||["_sharedClip",a&&a.duration,a&&a.easing,f.height,c.xAxis,c.yAxis].join(),n=b[h],x=b[h+"m"];n||(a&&(f.width=0,g&&(f.x=b.plotSizeX),b[h+"m"]=x=e.clipRect(g?b.plotSizeX+99:-99,g?-b.plotLeft:-b.plotTop,99,g?b.chartWidth:b.chartHeight)),b[h]=n=e.clipRect(f),n.count={length:0});a&&!n.count[this.index]&&(n.count[this.index]=
	!0,n.count.length+=1);!1!==c.clip&&(this.group.clip(a||d?n:b.clipRect),this.markerGroup.clip(x),this.sharedClipKey=h);a||(n.count[this.index]&&(delete n.count[this.index],--n.count.length),0===n.count.length&&h&&b[h]&&(d||(b[h]=b[h].destroy()),b[h+"m"]&&(b[h+"m"]=b[h+"m"].destroy())))},animate:function(a){var b=this.chart,c=A(this.options.animation),e;a?this.setClip(c):(e=this.sharedClipKey,(a=b[e])&&a.animate({width:b.plotSizeX,x:0},c),b[e+"m"]&&b[e+"m"].animate({width:b.plotSizeX+99,x:0},c),this.animate=
	null)},afterAnimate:function(){this.setClip();l(this,"afterAnimate");this.finishedAnimating=!0},drawPoints:function(){var a=this.points,b=this.chart,c,e,g,d,f=this.options.marker,h,n,m,l=this[this.specialGroup]||this.markerGroup,u,q=I(f.enabled,this.xAxis.isRadial?!0:null,this.closestPointRangePx>=2*f.radius);if(!1!==f.enabled||this._hasPointMarkers)for(c=0;c<a.length;c++)e=a[c],d=e.graphic,h=e.marker||{},n=!!e.marker,g=q&&void 0===h.enabled||h.enabled,m=e.isInside,g&&!e.isNull?(g=I(h.symbol,this.symbol),
	e.hasImage=0===g.indexOf("url"),u=this.markerAttribs(e,e.selected&&"select"),d?d[m?"show":"hide"](!0).animate(u):m&&(0<u.width||e.hasImage)&&(e.graphic=d=b.renderer.symbol(g,u.x,u.y,u.width,u.height,n?h:f).add(l)),d&&d.attr(this.pointAttribs(e,e.selected&&"select")),d&&d.addClass(e.getClassName(),!0)):d&&(e.graphic=d.destroy())},markerAttribs:function(a,b){var c=this.options.marker,e=a.marker||{},g=I(e.radius,c.radius);b&&(c=c.states[b],b=e.states&&e.states[b],g=I(b&&b.radius,c&&c.radius,g+(c&&c.radiusPlus||
	0)));a.hasImage&&(g=0);a={x:Math.floor(a.plotX)-g,y:a.plotY-g};g&&(a.width=a.height=2*g);return a},pointAttribs:function(a,b){var c=this.options.marker,e=a&&a.options,g=e&&e.marker||{},d=this.color,f=e&&e.color,h=a&&a.color,e=I(g.lineWidth,c.lineWidth);a=a&&a.zone&&a.zone.color;d=f||a||h||d;a=g.fillColor||c.fillColor||d;d=g.lineColor||c.lineColor||d;b&&(c=c.states[b],b=g.states&&g.states[b]||{},e=I(b.lineWidth,c.lineWidth,e+I(b.lineWidthPlus,c.lineWidthPlus,0)),a=b.fillColor||c.fillColor||a,d=b.lineColor||
	c.lineColor||d);return{stroke:d,"stroke-width":e,fill:a}},destroy:function(){var a=this,b=a.chart,c=/AppleWebKit\/533/.test(N.navigator.userAgent),e,g,d=a.data||[],h,n;l(a,"destroy");E(a);m(a.axisTypes||[],function(b){(n=a[b])&&n.series&&(f(n.series,a),n.isDirty=n.forceRedraw=!0)});a.legendItem&&a.chart.legend.destroyItem(a);for(g=d.length;g--;)(h=d[g])&&h.destroy&&h.destroy();a.points=null;clearTimeout(a.animationTimeout);D(a,function(a,b){a instanceof u&&!a.survive&&(e=c&&"group"===b?"hide":"destroy",
	a[e]())});b.hoverSeries===a&&(b.hoverSeries=null);f(b.series,a);b.orderSeries();D(a,function(b,c){delete a[c]})},getGraphPath:function(a,b,c){var e=this,g=e.options,d=g.step,f,h=[],n=[],l;a=a||e.points;(f=a.reversed)&&a.reverse();(d={right:1,center:2}[d]||d&&3)&&f&&(d=4-d);!g.connectNulls||b||c||(a=this.getValidPoints(a));m(a,function(f,k){var m=f.plotX,u=f.plotY,x=a[k-1];(f.leftCliff||x&&x.rightCliff)&&!c&&(l=!0);f.isNull&&!p(b)&&0<k?l=!g.connectNulls:f.isNull&&!b?l=!0:(0===k||l?k=["M",f.plotX,f.plotY]:
	e.getPointSpline?k=e.getPointSpline(a,f,k):d?(k=1===d?["L",x.plotX,u]:2===d?["L",(x.plotX+m)/2,x.plotY,"L",(x.plotX+m)/2,u]:["L",m,x.plotY],k.push("L",m,u)):k=["L",m,u],n.push(f.x),d&&n.push(f.x),h.push.apply(h,k),l=!1)});h.xMap=n;return e.graphPath=h},drawGraph:function(){var a=this,b=this.options,c=(this.gappedPath||this.getGraphPath).call(this),e=[["graph","highcharts-graph",b.lineColor||this.color,b.dashStyle]];m(this.zones,function(c,g){e.push(["zone-graph-"+g,"highcharts-graph highcharts-zone-graph-"+
	g+" "+(c.className||""),c.color||a.color,c.dashStyle||b.dashStyle])});m(e,function(e,g){var d=e[0],f=a[d];f?(f.endX=a.preventGraphAnimation?null:c.xMap,f.animate({d:c})):c.length&&(a[d]=a.chart.renderer.path(c).addClass(e[1]).attr({zIndex:1}).add(a.group),f={stroke:e[2],"stroke-width":b.lineWidth,fill:a.fillGraph&&a.color||"none"},e[3]?f.dashstyle=e[3]:"square"!==b.linecap&&(f["stroke-linecap"]=f["stroke-linejoin"]="round"),f=a[d].attr(f).shadow(2>g&&b.shadow));f&&(f.startX=c.xMap,f.isArea=c.isArea)})},
	applyZones:function(){var a=this,b=this.chart,c=b.renderer,e=this.zones,g,d,f=this.clips||[],h,n=this.graph,l=this.area,u=Math.max(b.chartWidth,b.chartHeight),q=this[(this.zoneAxis||"y")+"Axis"],p,C,r=b.inverted,E,v,t,D,M=!1;e.length&&(n||l)&&q&&void 0!==q.min&&(C=q.reversed,E=q.horiz,n&&n.hide(),l&&l.hide(),p=q.getExtremes(),m(e,function(e,k){g=C?E?b.plotWidth:0:E?0:q.toPixels(p.min);g=Math.min(Math.max(I(d,g),0),u);d=Math.min(Math.max(Math.round(q.toPixels(I(e.value,p.max),!0)),0),u);M&&(g=d=q.toPixels(p.max));
	v=Math.abs(g-d);t=Math.min(g,d);D=Math.max(g,d);q.isXAxis?(h={x:r?D:t,y:0,width:v,height:u},E||(h.x=b.plotHeight-h.x)):(h={x:0,y:r?D:t,width:u,height:v},E&&(h.y=b.plotWidth-h.y));r&&c.isVML&&(h=q.isXAxis?{x:0,y:C?t:D,height:h.width,width:b.chartWidth}:{x:h.y-b.plotLeft-b.spacingBox.x,y:0,width:h.height,height:b.chartHeight});f[k]?f[k].animate(h):(f[k]=c.clipRect(h),n&&a["zone-graph-"+k].clip(f[k]),l&&a["zone-area-"+k].clip(f[k]));M=e.value>p.max}),this.clips=f)},invertGroups:function(a){function b(){m(["group",
	"markerGroup"],function(b){c[b]&&(e.renderer.isVML&&c[b].attr({width:c.yAxis.len,height:c.xAxis.len}),c[b].width=c.yAxis.len,c[b].height=c.xAxis.len,c[b].invert(a))})}var c=this,e=c.chart,g;c.xAxis&&(g=z(e,"resize",b),z(c,"destroy",g),b(a),c.invertGroups=b)},plotGroup:function(a,b,c,e,g){var d=this[a],f=!d;f&&(this[a]=d=this.chart.renderer.g().attr({zIndex:e||.1}).add(g));d.addClass("highcharts-"+b+" highcharts-series-"+this.index+" highcharts-"+this.type+"-series "+(p(this.colorIndex)?"highcharts-color-"+
	this.colorIndex+" ":"")+(this.options.className||"")+(d.hasClass("highcharts-tracker")?" highcharts-tracker":""),!0);d.attr({visibility:c})[f?"attr":"animate"](this.getPlotBox());return d},getPlotBox:function(){var a=this.chart,b=this.xAxis,c=this.yAxis;a.inverted&&(b=c,c=this.xAxis);return{translateX:b?b.left:a.plotLeft,translateY:c?c.top:a.plotTop,scaleX:1,scaleY:1}},render:function(){var a=this,b=a.chart,c,e=a.options,g=!!a.animate&&b.renderer.isSVG&&A(e.animation).duration,d=a.visible?"inherit":
	"hidden",f=e.zIndex,h=a.hasRendered,n=b.seriesGroup,l=b.inverted;c=a.plotGroup("group","series",d,f,n);a.markerGroup=a.plotGroup("markerGroup","markers",d,f,n);g&&a.animate(!0);c.inverted=a.isCartesian?l:!1;a.drawGraph&&(a.drawGraph(),a.applyZones());a.drawDataLabels&&a.drawDataLabels();a.visible&&a.drawPoints();a.drawTracker&&!1!==a.options.enableMouseTracking&&a.drawTracker();a.invertGroups(l);!1===e.clip||a.sharedClipKey||h||c.clip(b.clipRect);g&&a.animate();h||(a.animationTimeout=C(function(){a.afterAnimate()},
	g));a.isDirty=!1;a.hasRendered=!0},redraw:function(){var a=this.chart,b=this.isDirty||this.isDirtyData,c=this.group,e=this.xAxis,g=this.yAxis;c&&(a.inverted&&c.attr({width:a.plotWidth,height:a.plotHeight}),c.animate({translateX:I(e&&e.left,a.plotLeft),translateY:I(g&&g.top,a.plotTop)}));this.translate();this.render();b&&delete this.kdTree},kdAxisArray:["clientX","plotY"],searchPoint:function(a,b){var c=this.xAxis,e=this.yAxis,g=this.chart.inverted;return this.searchKDTree({clientX:g?c.len-a.chartY+
	c.pos:a.chartX-c.pos,plotY:g?e.len-a.chartX+e.pos:a.chartY-e.pos},b)},buildKDTree:function(){function a(c,e,g){var d,f;if(f=c&&c.length)return d=b.kdAxisArray[e%g],c.sort(function(a,b){return a[d]-b[d]}),f=Math.floor(f/2),{point:c[f],left:a(c.slice(0,f),e+1,g),right:a(c.slice(f+1),e+1,g)}}this.buildingKdTree=!0;var b=this,c=-1<b.options.findNearestPointBy.indexOf("y")?2:1;delete b.kdTree;C(function(){b.kdTree=a(b.getValidPoints(null,!b.directTouch),c,c);b.buildingKdTree=!1},b.options.kdNow?0:1)},
	searchKDTree:function(a,b){function c(a,b,k,h){var n=b.point,l=e.kdAxisArray[k%h],m,u,q=n;u=p(a[g])&&p(n[g])?Math.pow(a[g]-n[g],2):null;m=p(a[d])&&p(n[d])?Math.pow(a[d]-n[d],2):null;m=(u||0)+(m||0);n.dist=p(m)?Math.sqrt(m):Number.MAX_VALUE;n.distX=p(u)?Math.sqrt(u):Number.MAX_VALUE;l=a[l]-n[l];m=0>l?"left":"right";u=0>l?"right":"left";b[m]&&(m=c(a,b[m],k+1,h),q=m[f]<q[f]?m:n);b[u]&&Math.sqrt(l*l)<q[f]&&(a=c(a,b[u],k+1,h),q=a[f]<q[f]?a:q);return q}var e=this,g=this.kdAxisArray[0],d=this.kdAxisArray[1],
	f=b?"distX":"dist";b=-1<e.options.findNearestPointBy.indexOf("y")?2:1;this.kdTree||this.buildingKdTree||this.buildKDTree();if(this.kdTree)return c(a,this.kdTree,b,b)}})})(J);(function(a){var z=a.addEvent,A=a.animate,y=a.Axis,h=a.createElement,d=a.css,v=a.defined,t=a.each,r=a.erase,p=a.extend,m=a.fireEvent,f=a.inArray,q=a.isNumber,l=a.isObject,c=a.isArray,g=a.merge,b=a.objectEach,e=a.pick,n=a.Point,D=a.Series,I=a.seriesTypes,E=a.setAnimation,M=a.splat;p(a.Chart.prototype,{addSeries:function(a,b,c){var g,
	d=this;a&&(b=e(b,!0),m(d,"addSeries",{options:a},function(){g=d.initSeries(a);d.isDirtyLegend=!0;d.linkSeries();b&&d.redraw(c)}));return g},addAxis:function(a,b,c,d){var f=b?"xAxis":"yAxis",h=this.options;a=g(a,{index:this[f].length,isX:b});b=new y(this,a);h[f]=M(h[f]||{});h[f].push(a);e(c,!0)&&this.redraw(d);return b},showLoading:function(a){var b=this,c=b.options,e=b.loadingDiv,g=c.loading,f=function(){e&&d(e,{left:b.plotLeft+"px",top:b.plotTop+"px",width:b.plotWidth+"px",height:b.plotHeight+"px"})};
	e||(b.loadingDiv=e=h("div",{className:"highcharts-loading highcharts-loading-hidden"},null,b.container),b.loadingSpan=h("span",{className:"highcharts-loading-inner"},null,e),z(b,"redraw",f));e.className="highcharts-loading";b.loadingSpan.innerHTML=a||c.lang.loading;d(e,p(g.style,{zIndex:10}));d(b.loadingSpan,g.labelStyle);b.loadingShown||(d(e,{opacity:0,display:""}),A(e,{opacity:g.style.opacity||.5},{duration:g.showDuration||0}));b.loadingShown=!0;f()},hideLoading:function(){var a=this.options,b=
	this.loadingDiv;b&&(b.className="highcharts-loading highcharts-loading-hidden",A(b,{opacity:0},{duration:a.loading.hideDuration||100,complete:function(){d(b,{display:"none"})}}));this.loadingShown=!1},propsRequireDirtyBox:"backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),propsRequireUpdateSeries:"chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions tooltip".split(" "),
	update:function(a,c,d){var h=this,n={credits:"addCredits",title:"setTitle",subtitle:"setSubtitle"},l=a.chart,m,k,u=[];if(l){g(!0,h.options.chart,l);"className"in l&&h.setClassName(l.className);if("inverted"in l||"polar"in l)h.propFromSeries(),m=!0;"alignTicks"in l&&(m=!0);b(l,function(a,b){-1!==f("chart."+b,h.propsRequireUpdateSeries)&&(k=!0);-1!==f(b,h.propsRequireDirtyBox)&&(h.isDirtyBox=!0)});"style"in l&&h.renderer.setStyle(l.style)}a.colors&&(this.options.colors=a.colors);a.plotOptions&&g(!0,
	this.options.plotOptions,a.plotOptions);b(a,function(a,b){if(h[b]&&"function"===typeof h[b].update)h[b].update(a,!1);else if("function"===typeof h[n[b]])h[n[b]](a);"chart"!==b&&-1!==f(b,h.propsRequireUpdateSeries)&&(k=!0)});t("xAxis yAxis zAxis series colorAxis pane".split(" "),function(b){a[b]&&(t(M(a[b]),function(a,c){(c=v(a.id)&&h.get(a.id)||h[b][c])&&c.coll===b&&(c.update(a,!1),d&&(c.touched=!0));if(!c&&d)if("series"===b)h.addSeries(a,!1).touched=!0;else if("xAxis"===b||"yAxis"===b)h.addAxis(a,
	"xAxis"===b,!1).touched=!0}),d&&t(h[b],function(a){a.touched?delete a.touched:u.push(a)}))});t(u,function(a){a.remove(!1)});m&&t(h.axes,function(a){a.update({},!1)});k&&t(h.series,function(a){a.update({},!1)});a.loading&&g(!0,h.options.loading,a.loading);m=l&&l.width;l=l&&l.height;q(m)&&m!==h.chartWidth||q(l)&&l!==h.chartHeight?h.setSize(m,l):e(c,!0)&&h.redraw()},setSubtitle:function(a){this.setTitle(void 0,a)}});p(n.prototype,{update:function(a,b,c,g){function d(){f.applyOptions(a);null===f.y&&k&&
	(f.graphic=k.destroy());l(a,!0)&&(k&&k.element&&a&&a.marker&&void 0!==a.marker.symbol&&(f.graphic=k.destroy()),a&&a.dataLabels&&f.dataLabel&&(f.dataLabel=f.dataLabel.destroy()),f.connector&&(f.connector=f.connector.destroy()));n=f.index;h.updateParallelArrays(f,n);u.data[n]=l(u.data[n],!0)||l(a,!0)?f.options:a;h.isDirty=h.isDirtyData=!0;!h.fixedBox&&h.hasCartesianSeries&&(m.isDirtyBox=!0);"point"===u.legendType&&(m.isDirtyLegend=!0);b&&m.redraw(c)}var f=this,h=f.series,k=f.graphic,n,m=h.chart,u=h.options;
	b=e(b,!0);!1===g?d():f.firePointEvent("update",{options:a},d)},remove:function(a,b){this.series.removePoint(f(this,this.series.data),a,b)}});p(D.prototype,{addPoint:function(a,b,c,g){var d=this.options,f=this.data,h=this.chart,k=this.xAxis,k=k&&k.hasNames&&k.names,n=d.data,l,m,u=this.xData,q,p;b=e(b,!0);l={series:this};this.pointClass.prototype.applyOptions.apply(l,[a]);p=l.x;q=u.length;if(this.requireSorting&&p<u[q-1])for(m=!0;q&&u[q-1]>p;)q--;this.updateParallelArrays(l,"splice",q,0,0);this.updateParallelArrays(l,
	q);k&&l.name&&(k[p]=l.name);n.splice(q,0,a);m&&(this.data.splice(q,0,null),this.processData());"point"===d.legendType&&this.generatePoints();c&&(f[0]&&f[0].remove?f[0].remove(!1):(f.shift(),this.updateParallelArrays(l,"shift"),n.shift()));this.isDirtyData=this.isDirty=!0;b&&h.redraw(g)},removePoint:function(a,b,c){var g=this,d=g.data,f=d[a],h=g.points,k=g.chart,n=function(){h&&h.length===d.length&&h.splice(a,1);d.splice(a,1);g.options.data.splice(a,1);g.updateParallelArrays(f||{series:g},"splice",
	a,1);f&&f.destroy();g.isDirty=!0;g.isDirtyData=!0;b&&k.redraw()};E(c,k);b=e(b,!0);f?f.firePointEvent("remove",null,n):n()},remove:function(a,b,c){function g(){d.destroy();f.isDirtyLegend=f.isDirtyBox=!0;f.linkSeries();e(a,!0)&&f.redraw(b)}var d=this,f=d.chart;!1!==c?m(d,"remove",null,g):g()},update:function(a,b){var c=this,f=c.chart,d=c.userOptions,h=c.oldType||c.type,n=a.type||d.type||f.options.chart.type,k=I[h].prototype,l,m=["group","markerGroup","dataLabelsGroup"],u=["navigatorSeries","baseSeries"],
	q=c.finishedAnimating&&{animation:!1};if(Object.keys&&"data"===Object.keys(a).toString())return this.setData(a.data,b);u=m.concat(u);t(u,function(a){u[a]=c[a];delete c[a]});a=g(d,q,{index:c.index,pointStart:c.xData[0]},{data:c.options.data},a);c.remove(!1,null,!1);for(l in k)c[l]=void 0;p(c,I[n||h].prototype);t(u,function(a){c[a]=u[a]});c.init(f,a);a.zIndex!==d.zIndex&&t(m,function(b){c[b]&&c[b].attr({zIndex:a.zIndex})});c.oldType=h;f.linkSeries();e(b,!0)&&f.redraw(!1)}});p(y.prototype,{update:function(a,
	b){var c=this.chart;a=c.options[this.coll][this.options.index]=g(this.userOptions,a);this.destroy(!0);this.init(c,p(a,{events:void 0}));c.isDirtyBox=!0;e(b,!0)&&c.redraw()},remove:function(a){for(var b=this.chart,g=this.coll,f=this.series,d=f.length;d--;)f[d]&&f[d].remove(!1);r(b.axes,this);r(b[g],this);c(b.options[g])?b.options[g].splice(this.options.index,1):delete b.options[g];t(b[g],function(a,b){a.options.index=b});this.destroy();b.isDirtyBox=!0;e(a,!0)&&b.redraw()},setTitle:function(a,b){this.update({title:a},
	b)},setCategories:function(a,b){this.update({categories:a},b)}})})(J);(function(a){var z=a.animObject,A=a.color,y=a.each,h=a.extend,d=a.isNumber,v=a.merge,t=a.pick,r=a.Series,p=a.seriesType,m=a.svg;p("column","line",{borderRadius:0,crisp:!0,groupPadding:.2,marker:null,pointPadding:.1,minPointLength:0,cropThreshold:50,pointRange:null,states:{hover:{halo:!1,brightness:.1},select:{color:"#cccccc",borderColor:"#000000"}},dataLabels:{align:null,verticalAlign:null,y:null},softThreshold:!1,startFromThreshold:!0,
	stickyTracking:!1,tooltip:{distance:6},threshold:0,borderColor:"#ffffff"},{cropShoulder:0,directTouch:!0,trackerGroups:["group","dataLabelsGroup"],negStacks:!0,init:function(){r.prototype.init.apply(this,arguments);var a=this,d=a.chart;d.hasRendered&&y(d.series,function(d){d.type===a.type&&(d.isDirty=!0)})},getColumnMetrics:function(){var a=this,d=a.options,h=a.xAxis,c=a.yAxis,g=h.reversed,b,e={},n=0;!1===d.grouping?n=1:y(a.chart.series,function(g){var d=g.options,f=g.yAxis,h;g.type!==a.type||!g.visible&&
	a.chart.options.chart.ignoreHiddenSeries||c.len!==f.len||c.pos!==f.pos||(d.stacking?(b=g.stackKey,void 0===e[b]&&(e[b]=n++),h=e[b]):!1!==d.grouping&&(h=n++),g.columnIndex=h)});var m=Math.min(Math.abs(h.transA)*(h.ordinalSlope||d.pointRange||h.closestPointRange||h.tickInterval||1),h.len),p=m*d.groupPadding,r=(m-2*p)/(n||1),d=Math.min(d.maxPointWidth||h.len,t(d.pointWidth,r*(1-2*d.pointPadding)));a.columnMetrics={width:d,offset:(r-d)/2+(p+((a.columnIndex||0)+(g?1:0))*r-m/2)*(g?-1:1)};return a.columnMetrics},
	crispCol:function(a,d,h,c){var g=this.chart,b=this.borderWidth,e=-(b%2?.5:0),b=b%2?.5:1;g.inverted&&g.renderer.isVML&&(b+=1);this.options.crisp&&(h=Math.round(a+h)+e,a=Math.round(a)+e,h-=a);c=Math.round(d+c)+b;e=.5>=Math.abs(d)&&.5<c;d=Math.round(d)+b;c-=d;e&&c&&(--d,c+=1);return{x:a,y:d,width:h,height:c}},translate:function(){var a=this,d=a.chart,h=a.options,c=a.dense=2>a.closestPointRange*a.xAxis.transA,c=a.borderWidth=t(h.borderWidth,c?0:1),g=a.yAxis,b=h.threshold,e=a.translatedThreshold=g.getThreshold(b),
	n=t(h.minPointLength,5),m=a.getColumnMetrics(),p=m.width,E=a.barW=Math.max(p,1+2*c),v=a.pointXOffset=m.offset;d.inverted&&(e-=.5);h.pointPadding&&(E=Math.ceil(E));r.prototype.translate.apply(a);y(a.points,function(c){var f=t(c.yBottom,e),h=999+Math.abs(f),h=Math.min(Math.max(-h,c.plotY),g.len+h),m=c.plotX+v,l=E,u=Math.min(h,f),q,k=Math.max(h,f)-u;n&&Math.abs(k)<n&&(k=n,q=!g.reversed&&!c.negative||g.reversed&&c.negative,c.y===b&&a.dataMax<=b&&g.min<b&&(q=!q),u=Math.abs(u-e)>n?f-n:e-(q?n:0));c.barX=
	m;c.pointWidth=p;c.tooltipPos=d.inverted?[g.len+g.pos-d.plotLeft-h,a.xAxis.len-m-l/2,k]:[m+l/2,h+g.pos-d.plotTop,k];c.shapeType="rect";c.shapeArgs=a.crispCol.apply(a,c.isNull?[m,e,l,0]:[m,u,l,k])})},getSymbol:a.noop,drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,drawGraph:function(){this.group[this.dense?"addClass":"removeClass"]("highcharts-dense-data")},pointAttribs:function(a,d){var f=this.options,c,g=this.pointAttrToOptions||{};c=g.stroke||"borderColor";var b=g["stroke-width"]||"borderWidth",
	e=a&&a.color||this.color,h=a&&a[c]||f[c]||this.color||e,m=a&&a[b]||f[b]||this[b]||0,g=f.dashStyle;a&&this.zones.length&&(e=a.getZone(),e=a.options.color||e&&e.color||this.color);d&&(a=v(f.states[d],a.options.states&&a.options.states[d]||{}),d=a.brightness,e=a.color||void 0!==d&&A(e).brighten(a.brightness).get()||e,h=a[c]||h,m=a[b]||m,g=a.dashStyle||g);c={fill:e,stroke:h,"stroke-width":m};g&&(c.dashstyle=g);return c},drawPoints:function(){var a=this,h=this.chart,m=a.options,c=h.renderer,g=m.animationLimit||
	250,b;y(a.points,function(e){var f=e.graphic;if(d(e.plotY)&&null!==e.y){b=e.shapeArgs;if(f)f[h.pointCount<g?"animate":"attr"](v(b));else e.graphic=f=c[e.shapeType](b).add(e.group||a.group);m.borderRadius&&f.attr({r:m.borderRadius});f.attr(a.pointAttribs(e,e.selected&&"select")).shadow(m.shadow,null,m.stacking&&!m.borderRadius);f.addClass(e.getClassName(),!0)}else f&&(e.graphic=f.destroy())})},animate:function(a){var d=this,f=this.yAxis,c=d.options,g=this.chart.inverted,b={},e=g?"translateX":"translateY",
	n;m&&(a?(b.scaleY=.001,a=Math.min(f.pos+f.len,Math.max(f.pos,f.toPixels(c.threshold))),g?b.translateX=a-f.len:b.translateY=a,d.group.attr(b)):(n=d.group.attr(e),d.group.animate({scaleY:1},h(z(d.options.animation),{step:function(a,c){b[e]=n+c.pos*(f.pos-n);d.group.attr(b)}})),d.animate=null))},remove:function(){var a=this,d=a.chart;d.hasRendered&&y(d.series,function(d){d.type===a.type&&(d.isDirty=!0)});r.prototype.remove.apply(a,arguments)}})})(J);(function(a){var z=a.Series;a=a.seriesType;a("scatter",
	"line",{lineWidth:0,findNearestPointBy:"xy",marker:{enabled:!0},tooltip:{headerFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cspan style\x3d"font-size: 0.85em"\x3e {series.name}\x3c/span\x3e\x3cbr/\x3e',pointFormat:"x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e"}},{sorted:!1,requireSorting:!1,noSharedTooltip:!0,trackerGroups:["group","markerGroup","dataLabelsGroup"],takeOrdinalPosition:!1,drawGraph:function(){this.options.lineWidth&&
	z.prototype.drawGraph.call(this)}})})(J);(function(a){var z=a.addEvent,A=a.arrayMax,y=a.defined,h=a.each,d=a.extend,v=a.format,t=a.map,r=a.merge,p=a.noop,m=a.pick,f=a.relativeLength,q=a.Series,l=a.seriesTypes,c=a.stableSort;a.distribute=function(a,b){function e(a,b){return a.target-b.target}var g,d=!0,f=a,l=[],p;p=0;for(g=a.length;g--;)p+=a[g].size;if(p>b){c(a,function(a,b){return(b.rank||0)-(a.rank||0)});for(p=g=0;p<=b;)p+=a[g].size,g++;l=a.splice(g-1,a.length)}c(a,e);for(a=t(a,function(a){return{size:a.size,
	targets:[a.target],align:m(a.align,.5)}});d;){for(g=a.length;g--;)d=a[g],p=(Math.min.apply(0,d.targets)+Math.max.apply(0,d.targets))/2,d.pos=Math.min(Math.max(0,p-d.size*d.align),b-d.size);g=a.length;for(d=!1;g--;)0<g&&a[g-1].pos+a[g-1].size>a[g].pos&&(a[g-1].size+=a[g].size,a[g-1].targets=a[g-1].targets.concat(a[g].targets),a[g-1].align=.5,a[g-1].pos+a[g-1].size>b&&(a[g-1].pos=b-a[g-1].size),a.splice(g,1),d=!0)}g=0;h(a,function(a){var b=0;h(a.targets,function(){f[g].pos=a.pos+b;b+=f[g].size;g++})});
	f.push.apply(f,l);c(f,e)};q.prototype.drawDataLabels=function(){function c(a,b){var c=b.filter;return c?(b=c.operator,a=a[c.property],c=c.value,"\x3e"===b&&a>c||"\x3c"===b&&a<c||"\x3e\x3d"===b&&a>=c||"\x3c\x3d"===b&&a<=c||"\x3d\x3d"===b&&a==c||"\x3d\x3d\x3d"===b&&a===c?!0:!1):!0}var b=this,e=b.options,d=e.dataLabels,f=b.points,l,p,q=b.hasRendered||0,u,t,A=m(d.defer,!!e.animation),x=b.chart.renderer;if(d.enabled||b._hasPointLabels)b.dlProcessOptions&&b.dlProcessOptions(d),t=b.plotGroup("dataLabelsGroup",
	"data-labels",A&&!q?"hidden":"visible",d.zIndex||6),A&&(t.attr({opacity:+q}),q||z(b,"afterAnimate",function(){b.visible&&t.show(!0);t[e.animation?"animate":"attr"]({opacity:1},{duration:200})})),p=d,h(f,function(g){var f,h=g.dataLabel,k,n,q=g.connector,E=!h,C;l=g.dlOptions||g.options&&g.options.dataLabels;(f=m(l&&l.enabled,p.enabled)&&!g.isNull)&&(f=!0===c(g,l||d));f&&(d=r(p,l),k=g.getLabelConfig(),C=d[g.formatPrefix+"Format"]||d.format,u=y(C)?v(C,k):(d[g.formatPrefix+"Formatter"]||d.formatter).call(k,
	d),C=d.style,k=d.rotation,C.color=m(d.color,C.color,b.color,"#000000"),"contrast"===C.color&&(g.contrastColor=x.getContrast(g.color||b.color),C.color=d.inside||0>m(g.labelDistance,d.distance)||e.stacking?g.contrastColor:"#000000"),e.cursor&&(C.cursor=e.cursor),n={fill:d.backgroundColor,stroke:d.borderColor,"stroke-width":d.borderWidth,r:d.borderRadius||0,rotation:k,padding:d.padding,zIndex:1},a.objectEach(n,function(a,b){void 0===a&&delete n[b]}));!h||f&&y(u)?f&&y(u)&&(h?n.text=u:(h=g.dataLabel=k?
	x.text(u,0,-9999).addClass("highcharts-data-label"):x.label(u,0,-9999,d.shape,null,null,d.useHTML,null,"data-label"),h.addClass(" highcharts-data-label-color-"+g.colorIndex+" "+(d.className||"")+(d.useHTML?"highcharts-tracker":""))),h.attr(n),h.css(C).shadow(d.shadow),h.added||h.add(t),b.alignDataLabel(g,h,d,null,E)):(g.dataLabel=h=h.destroy(),q&&(g.connector=q.destroy()))})};q.prototype.alignDataLabel=function(a,b,c,f,h){var e=this.chart,g=e.inverted,n=m(a.dlBox&&a.dlBox.centerX,a.plotX,-9999),l=
	m(a.plotY,-9999),p=b.getBBox(),q,r=c.rotation,v=c.align,t=this.visible&&(a.series.forceDL||e.isInsidePlot(n,Math.round(l),g)||f&&e.isInsidePlot(n,g?f.x+1:f.y+f.height-1,g)),D="justify"===m(c.overflow,"justify");if(t&&(q=c.style.fontSize,q=e.renderer.fontMetrics(q,b).b,f=d({x:g?this.yAxis.len-l:n,y:Math.round(g?this.xAxis.len-n:l),width:0,height:0},f),d(c,{width:p.width,height:p.height}),r?(D=!1,n=e.renderer.rotCorr(q,r),n={x:f.x+c.x+f.width/2+n.x,y:f.y+c.y+{top:0,middle:.5,bottom:1}[c.verticalAlign]*
	f.height},b[h?"attr":"animate"](n).attr({align:v}),l=(r+720)%360,l=180<l&&360>l,"left"===v?n.y-=l?p.height:0:"center"===v?(n.x-=p.width/2,n.y-=p.height/2):"right"===v&&(n.x-=p.width,n.y-=l?0:p.height)):(b.align(c,null,f),n=b.alignAttr),D?a.isLabelJustified=this.justifyDataLabel(b,c,n,p,f,h):m(c.crop,!0)&&(t=e.isInsidePlot(n.x,n.y)&&e.isInsidePlot(n.x+p.width,n.y+p.height)),c.shape&&!r))b[h?"attr":"animate"]({anchorX:g?e.plotWidth-a.plotY:a.plotX,anchorY:g?e.plotHeight-a.plotX:a.plotY});t||(b.attr({y:-9999}),
	b.placed=!1)};q.prototype.justifyDataLabel=function(a,b,c,d,f,h){var e=this.chart,g=b.align,n=b.verticalAlign,m,l,p=a.box?0:a.padding||0;m=c.x+p;0>m&&("right"===g?b.align="left":b.x=-m,l=!0);m=c.x+d.width-p;m>e.plotWidth&&("left"===g?b.align="right":b.x=e.plotWidth-m,l=!0);m=c.y+p;0>m&&("bottom"===n?b.verticalAlign="top":b.y=-m,l=!0);m=c.y+d.height-p;m>e.plotHeight&&("top"===n?b.verticalAlign="bottom":b.y=e.plotHeight-m,l=!0);l&&(a.placed=!h,a.align(b,null,f));return l};l.pie&&(l.pie.prototype.drawDataLabels=
	function(){var c=this,b=c.data,e,d=c.chart,f=c.options.dataLabels,l=m(f.connectorPadding,10),p=m(f.connectorWidth,1),r=d.plotWidth,u=d.plotHeight,v,t=c.center,x=t[2]/2,F=t[1],z,H,k,w,P=[[],[]],K,O,L,J,B=[0,0,0,0];c.visible&&(f.enabled||c._hasPointLabels)&&(h(b,function(a){a.dataLabel&&a.visible&&a.dataLabel.shortened&&(a.dataLabel.attr({width:"auto"}).css({width:"auto",textOverflow:"clip"}),a.dataLabel.shortened=!1)}),q.prototype.drawDataLabels.apply(c),h(b,function(a){a.dataLabel&&a.visible&&(P[a.half].push(a),
	a.dataLabel._pos=null)}),h(P,function(b,g){var n,p,q=b.length,v=[],E;if(q)for(c.sortByAngle(b,g-.5),0<c.maxLabelDistance&&(n=Math.max(0,F-x-c.maxLabelDistance),p=Math.min(F+x+c.maxLabelDistance,d.plotHeight),h(b,function(a){0<a.labelDistance&&a.dataLabel&&(a.top=Math.max(0,F-x-a.labelDistance),a.bottom=Math.min(F+x+a.labelDistance,d.plotHeight),E=a.dataLabel.getBBox().height||21,a.positionsIndex=v.push({target:a.labelPos[1]-a.top+E/2,size:E,rank:a.y})-1)}),a.distribute(v,p+E-n)),J=0;J<q;J++)e=b[J],
	p=e.positionsIndex,k=e.labelPos,z=e.dataLabel,L=!1===e.visible?"hidden":"inherit",O=n=k[1],v&&y(v[p])&&(void 0===v[p].pos?L="hidden":(w=v[p].size,O=e.top+v[p].pos)),delete e.positionIndex,K=f.justify?t[0]+(g?-1:1)*(x+e.labelDistance):c.getX(O<e.top+2||O>e.bottom-2?n:O,g,e),z._attr={visibility:L,align:k[6]},z._pos={x:K+f.x+({left:l,right:-l}[k[6]]||0),y:O+f.y-10},k.x=K,k.y=O,m(f.crop,!0)&&(H=z.getBBox().width,n=null,K-H<l?(n=Math.round(H-K+l),B[3]=Math.max(n,B[3])):K+H>r-l&&(n=Math.round(K+H-r+l),
	B[1]=Math.max(n,B[1])),0>O-w/2?B[0]=Math.max(Math.round(-O+w/2),B[0]):O+w/2>u&&(B[2]=Math.max(Math.round(O+w/2-u),B[2])),z.sideOverflow=n)}),0===A(B)||this.verifyDataLabelOverflow(B))&&(this.placeDataLabels(),p&&h(this.points,function(a){var b;v=a.connector;if((z=a.dataLabel)&&z._pos&&a.visible&&0<a.labelDistance){L=z._attr.visibility;if(b=!v)a.connector=v=d.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-"+a.colorIndex).add(c.dataLabelsGroup),v.attr({"stroke-width":p,
	stroke:f.connectorColor||a.color||"#666666"});v[b?"attr":"animate"]({d:c.connectorPath(a.labelPos)});v.attr("visibility",L)}else v&&(a.connector=v.destroy())}))},l.pie.prototype.connectorPath=function(a){var b=a.x,c=a.y;return m(this.options.dataLabels.softConnector,!0)?["M",b+("left"===a[6]?5:-5),c,"C",b,c,2*a[2]-a[4],2*a[3]-a[5],a[2],a[3],"L",a[4],a[5]]:["M",b+("left"===a[6]?5:-5),c,"L",a[2],a[3],"L",a[4],a[5]]},l.pie.prototype.placeDataLabels=function(){h(this.points,function(a){var b=a.dataLabel;
	b&&a.visible&&((a=b._pos)?(b.sideOverflow&&(b._attr.width=b.getBBox().width-b.sideOverflow,b.css({width:b._attr.width+"px",textOverflow:"ellipsis"}),b.shortened=!0),b.attr(b._attr),b[b.moved?"animate":"attr"](a),b.moved=!0):b&&b.attr({y:-9999}))},this)},l.pie.prototype.alignDataLabel=p,l.pie.prototype.verifyDataLabelOverflow=function(a){var b=this.center,c=this.options,d=c.center,g=c.minSize||80,h,m=null!==c.size;m||(null!==d[0]?h=Math.max(b[2]-Math.max(a[1],a[3]),g):(h=Math.max(b[2]-a[1]-a[3],g),
	b[0]+=(a[3]-a[1])/2),null!==d[1]?h=Math.max(Math.min(h,b[2]-Math.max(a[0],a[2])),g):(h=Math.max(Math.min(h,b[2]-a[0]-a[2]),g),b[1]+=(a[0]-a[2])/2),h<b[2]?(b[2]=h,b[3]=Math.min(f(c.innerSize||0,h),h),this.translate(b),this.drawDataLabels&&this.drawDataLabels()):m=!0);return m});l.column&&(l.column.prototype.alignDataLabel=function(a,b,c,d,f){var e=this.chart.inverted,g=a.series,h=a.dlBox||a.shapeArgs,n=m(a.below,a.plotY>m(this.translatedThreshold,g.yAxis.len)),l=m(c.inside,!!this.options.stacking);
	h&&(d=r(h),0>d.y&&(d.height+=d.y,d.y=0),h=d.y+d.height-g.yAxis.len,0<h&&(d.height-=h),e&&(d={x:g.yAxis.len-d.y-d.height,y:g.xAxis.len-d.x-d.width,width:d.height,height:d.width}),l||(e?(d.x+=n?0:d.width,d.width=0):(d.y+=n?d.height:0,d.height=0)));c.align=m(c.align,!e||l?"center":n?"right":"left");c.verticalAlign=m(c.verticalAlign,e||l?"middle":n?"top":"bottom");q.prototype.alignDataLabel.call(this,a,b,c,d,f);a.isLabelJustified&&a.contrastColor&&a.dataLabel.css({color:a.contrastColor})})})(J);(function(a){var z=
	a.Chart,A=a.each,y=a.objectEach,h=a.pick;a=a.addEvent;a(z.prototype,"render",function(){var a=[];A(this.labelCollectors||[],function(d){a=a.concat(d())});A(this.yAxis||[],function(d){d.options.stackLabels&&!d.options.stackLabels.allowOverlap&&y(d.stacks,function(d){y(d,function(d){a.push(d.label)})})});A(this.series||[],function(d){var v=d.options.dataLabels,r=d.dataLabelCollections||["dataLabel"];(v.enabled||d._hasPointLabels)&&!v.allowOverlap&&d.visible&&A(r,function(p){A(d.points,function(d){d[p]&&
	(d[p].labelrank=h(d.labelrank,d.shapeArgs&&d.shapeArgs.height),a.push(d[p]))})})});this.hideOverlappingLabels(a)});z.prototype.hideOverlappingLabels=function(a){var d=a.length,h,r,p,m,f,q,l,c,g,b=function(a,b,c,d,g,f,h,m){return!(g>a+c||g+h<a||f>b+d||f+m<b)};for(r=0;r<d;r++)if(h=a[r])h.oldOpacity=h.opacity,h.newOpacity=1,h.width||(p=h.getBBox(),h.width=p.width,h.height=p.height);a.sort(function(a,b){return(b.labelrank||0)-(a.labelrank||0)});for(r=0;r<d;r++)for(p=a[r],h=r+1;h<d;++h)if(m=a[h],p&&m&&
	p!==m&&p.placed&&m.placed&&0!==p.newOpacity&&0!==m.newOpacity&&(f=p.alignAttr,q=m.alignAttr,l=p.parentGroup,c=m.parentGroup,g=2*(p.box?0:p.padding||0),f=b(f.x+l.translateX,f.y+l.translateY,p.width-g,p.height-g,q.x+c.translateX,q.y+c.translateY,m.width-g,m.height-g)))(p.labelrank<m.labelrank?p:m).newOpacity=0;A(a,function(a){var b,c;a&&(c=a.newOpacity,a.oldOpacity!==c&&a.placed&&(c?a.show(!0):b=function(){a.hide()},a.alignAttr.opacity=c,a[a.isOld?"animate":"attr"](a.alignAttr,null,b)),a.isOld=!0)})}})(J);
	(function(a){var z=a.addEvent,A=a.Chart,y=a.createElement,h=a.css,d=a.defaultOptions,v=a.defaultPlotOptions,t=a.each,r=a.extend,p=a.fireEvent,m=a.hasTouch,f=a.inArray,q=a.isObject,l=a.Legend,c=a.merge,g=a.pick,b=a.Point,e=a.Series,n=a.seriesTypes,D=a.svg,I;I=a.TrackerMixin={drawTrackerPoint:function(){var a=this,b=a.chart.pointer,c=function(a){var c=b.getPointFromEvent(a);void 0!==c&&(b.isDirectTouch=!0,c.onMouseOver(a))};t(a.points,function(a){a.graphic&&(a.graphic.element.point=a);a.dataLabel&&
	(a.dataLabel.div?a.dataLabel.div.point=a:a.dataLabel.element.point=a)});a._hasTracking||(t(a.trackerGroups,function(d){if(a[d]){a[d].addClass("highcharts-tracker").on("mouseover",c).on("mouseout",function(a){b.onTrackerMouseOut(a)});if(m)a[d].on("touchstart",c);a.options.cursor&&a[d].css(h).css({cursor:a.options.cursor})}}),a._hasTracking=!0)},drawTrackerGraph:function(){var a=this,b=a.options,c=b.trackByArea,d=[].concat(c?a.areaPath:a.graphPath),e=d.length,g=a.chart,f=g.pointer,h=g.renderer,n=g.options.tooltip.snap,
	k=a.tracker,l,p=function(){if(g.hoverSeries!==a)a.onMouseOver()},q="rgba(192,192,192,"+(D?.0001:.002)+")";if(e&&!c)for(l=e+1;l--;)"M"===d[l]&&d.splice(l+1,0,d[l+1]-n,d[l+2],"L"),(l&&"M"===d[l]||l===e)&&d.splice(l,0,"L",d[l-2]+n,d[l-1]);k?k.attr({d:d}):a.graph&&(a.tracker=h.path(d).attr({"stroke-linejoin":"round",visibility:a.visible?"visible":"hidden",stroke:q,fill:c?q:"none","stroke-width":a.graph.strokeWidth()+(c?0:2*n),zIndex:2}).add(a.group),t([a.tracker,a.markerGroup],function(a){a.addClass("highcharts-tracker").on("mouseover",
	p).on("mouseout",function(a){f.onTrackerMouseOut(a)});b.cursor&&a.css({cursor:b.cursor});if(m)a.on("touchstart",p)}))}};n.column&&(n.column.prototype.drawTracker=I.drawTrackerPoint);n.pie&&(n.pie.prototype.drawTracker=I.drawTrackerPoint);n.scatter&&(n.scatter.prototype.drawTracker=I.drawTrackerPoint);r(l.prototype,{setItemEvents:function(a,d,e){var g=this,f=g.chart.renderer.boxWrapper,h="highcharts-legend-"+(a instanceof b?"point":"series")+"-active";(e?d:a.legendGroup).on("mouseover",function(){a.setState("hover");
	f.addClass(h);d.css(g.options.itemHoverStyle)}).on("mouseout",function(){d.css(c(a.visible?g.itemStyle:g.itemHiddenStyle));f.removeClass(h);a.setState()}).on("click",function(b){var c=function(){a.setVisible&&a.setVisible()};f.removeClass(h);b={browserEvent:b};a.firePointEvent?a.firePointEvent("legendItemClick",b,c):p(a,"legendItemClick",b,c)})},createCheckboxForItem:function(a){a.checkbox=y("input",{type:"checkbox",checked:a.selected,defaultChecked:a.selected},this.options.itemCheckboxStyle,this.chart.container);
	z(a.checkbox,"click",function(b){p(a.series||a,"checkboxClick",{checked:b.target.checked,item:a},function(){a.select()})})}});d.legend.itemStyle.cursor="pointer";r(A.prototype,{showResetZoom:function(){var a=this,b=d.lang,c=a.options.chart.resetZoomButton,e=c.theme,g=e.states,f="chart"===c.relativeTo?null:"plotBox";this.resetZoomButton=a.renderer.button(b.resetZoom,null,null,function(){a.zoomOut()},e,g&&g.hover).attr({align:c.position.align,title:b.resetZoomTitle}).addClass("highcharts-reset-zoom").add().align(c.position,
	!1,f)},zoomOut:function(){var a=this;p(a,"selection",{resetSelection:!0},function(){a.zoom()})},zoom:function(a){var b,c=this.pointer,d=!1,e;!a||a.resetSelection?(t(this.axes,function(a){b=a.zoom()}),c.initiated=!1):t(a.xAxis.concat(a.yAxis),function(a){var e=a.axis;c[e.isXAxis?"zoomX":"zoomY"]&&(b=e.zoom(a.min,a.max),e.displayBtn&&(d=!0))});e=this.resetZoomButton;d&&!e?this.showResetZoom():!d&&q(e)&&(this.resetZoomButton=e.destroy());b&&this.redraw(g(this.options.chart.animation,a&&a.animation,100>
	this.pointCount))},pan:function(a,b){var c=this,d=c.hoverPoints,e;d&&t(d,function(a){a.setState()});t("xy"===b?[1,0]:[1],function(b){b=c[b?"xAxis":"yAxis"][0];var d=b.horiz,g=a[d?"chartX":"chartY"],d=d?"mouseDownX":"mouseDownY",f=c[d],h=(b.pointRange||0)/2,n=b.getExtremes(),m=b.toValue(f-g,!0)+h,l=b.toValue(f+b.len-g,!0)-h,p=l<m,f=p?l:m,m=p?m:l,l=Math.min(n.dataMin,h?n.min:b.toValue(b.toPixels(n.min)-b.minPixelPadding)),h=Math.max(n.dataMax,h?n.max:b.toValue(b.toPixels(n.max)+b.minPixelPadding)),
	p=l-f;0<p&&(m+=p,f=l);p=m-h;0<p&&(m=h,f-=p);b.series.length&&f!==n.min&&m!==n.max&&(b.setExtremes(f,m,!1,!1,{trigger:"pan"}),e=!0);c[d]=g});e&&c.redraw(!1);h(c.container,{cursor:"move"})}});r(b.prototype,{select:function(a,b){var c=this,d=c.series,e=d.chart;a=g(a,!c.selected);c.firePointEvent(a?"select":"unselect",{accumulate:b},function(){c.selected=c.options.selected=a;d.options.data[f(c,d.data)]=c.options;c.setState(a&&"select");b||t(e.getSelectedPoints(),function(a){a.selected&&a!==c&&(a.selected=
	a.options.selected=!1,d.options.data[f(a,d.data)]=a.options,a.setState(""),a.firePointEvent("unselect"))})})},onMouseOver:function(a){var b=this.series.chart,c=b.pointer;a=a?c.normalize(a):c.getChartCoordinatesFromPoint(this,b.inverted);c.runPointActions(a,this)},onMouseOut:function(){var a=this.series.chart;this.firePointEvent("mouseOut");t(a.hoverPoints||[],function(a){a.setState()});a.hoverPoints=a.hoverPoint=null},importEvents:function(){if(!this.hasImportedEvents){var b=this,d=c(b.series.options.point,
	b.options).events;b.events=d;a.objectEach(d,function(a,c){z(b,c,a)});this.hasImportedEvents=!0}},setState:function(a,b){var c=Math.floor(this.plotX),d=this.plotY,e=this.series,f=e.options.states[a]||{},h=v[e.type].marker&&e.options.marker,n=h&&!1===h.enabled,m=h&&h.states&&h.states[a]||{},k=!1===m.enabled,l=e.stateMarkerGraphic,p=this.marker||{},q=e.chart,t=e.halo,E,D=h&&e.markerAttribs;a=a||"";if(!(a===this.state&&!b||this.selected&&"select"!==a||!1===f.enabled||a&&(k||n&&!1===m.enabled)||a&&p.states&&
	p.states[a]&&!1===p.states[a].enabled)){D&&(E=e.markerAttribs(this,a));if(this.graphic)this.state&&this.graphic.removeClass("highcharts-point-"+this.state),a&&this.graphic.addClass("highcharts-point-"+a),this.graphic.animate(e.pointAttribs(this,a),g(q.options.chart.animation,f.animation)),E&&this.graphic.animate(E,g(q.options.chart.animation,m.animation,h.animation)),l&&l.hide();else{if(a&&m){h=p.symbol||e.symbol;l&&l.currentSymbol!==h&&(l=l.destroy());if(l)l[b?"animate":"attr"]({x:E.x,y:E.y});else h&&
	(e.stateMarkerGraphic=l=q.renderer.symbol(h,E.x,E.y,E.width,E.height).add(e.markerGroup),l.currentSymbol=h);l&&l.attr(e.pointAttribs(this,a))}l&&(l[a&&q.isInsidePlot(c,d,q.inverted)?"show":"hide"](),l.element.point=this)}(c=f.halo)&&c.size?(t||(e.halo=t=q.renderer.path().add((this.graphic||l).parentGroup)),t[b?"animate":"attr"]({d:this.haloPath(c.size)}),t.attr({"class":"highcharts-halo highcharts-color-"+g(this.colorIndex,e.colorIndex)}),t.point=this,t.attr(r({fill:this.color||e.color,"fill-opacity":c.opacity,
	zIndex:-1},c.attributes))):t&&t.point&&t.point.haloPath&&t.animate({d:t.point.haloPath(0)});this.state=a}},haloPath:function(a){return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX)-a,this.plotY-a,2*a,2*a)}});r(e.prototype,{onMouseOver:function(){var a=this.chart,b=a.hoverSeries;if(b&&b!==this)b.onMouseOut();this.options.events.mouseOver&&p(this,"mouseOver");this.setState("hover");a.hoverSeries=this},onMouseOut:function(){var a=this.options,b=this.chart,c=b.tooltip,d=b.hoverPoint;
	b.hoverSeries=null;if(d)d.onMouseOut();this&&a.events.mouseOut&&p(this,"mouseOut");!c||this.stickyTracking||c.shared&&!this.noSharedTooltip||c.hide();this.setState()},setState:function(a){var b=this,c=b.options,d=b.graph,e=c.states,f=c.lineWidth,c=0;a=a||"";if(b.state!==a&&(t([b.group,b.markerGroup,b.dataLabelsGroup],function(c){c&&(b.state&&c.removeClass("highcharts-series-"+b.state),a&&c.addClass("highcharts-series-"+a))}),b.state=a,!e[a]||!1!==e[a].enabled)&&(a&&(f=e[a].lineWidth||f+(e[a].lineWidthPlus||
	0)),d&&!d.dashstyle))for(f={"stroke-width":f},d.animate(f,g(b.chart.options.chart.animation,e[a]&&e[a].animation));b["zone-graph-"+c];)b["zone-graph-"+c].attr(f),c+=1},setVisible:function(a,b){var c=this,d=c.chart,e=c.legendItem,g,f=d.options.chart.ignoreHiddenSeries,h=c.visible;g=(c.visible=a=c.options.visible=c.userOptions.visible=void 0===a?!h:a)?"show":"hide";t(["group","dataLabelsGroup","markerGroup","tracker","tt"],function(a){if(c[a])c[a][g]()});if(d.hoverSeries===c||(d.hoverPoint&&d.hoverPoint.series)===
	c)c.onMouseOut();e&&d.legend.colorizeItem(c,a);c.isDirty=!0;c.options.stacking&&t(d.series,function(a){a.options.stacking&&a.visible&&(a.isDirty=!0)});t(c.linkedSeries,function(b){b.setVisible(a,!1)});f&&(d.isDirtyBox=!0);!1!==b&&d.redraw();p(c,g)},show:function(){this.setVisible(!0)},hide:function(){this.setVisible(!1)},select:function(a){this.selected=a=void 0===a?!this.selected:a;this.checkbox&&(this.checkbox.checked=a);p(this,a?"select":"unselect")},drawTracker:I.drawTrackerGraph})})(J);(function(a){var z=
	a.Chart,A=a.each,y=a.inArray,h=a.isArray,d=a.isObject,v=a.pick,t=a.splat;z.prototype.setResponsive=function(d){var h=this.options.responsive,m=[],f=this.currentResponsive;h&&h.rules&&A(h.rules,function(f){void 0===f._id&&(f._id=a.uniqueKey());this.matchResponsiveRule(f,m,d)},this);var q=a.merge.apply(0,a.map(m,function(d){return a.find(h.rules,function(a){return a._id===d}).chartOptions})),m=m.toString()||void 0;m!==(f&&f.ruleIds)&&(f&&this.update(f.undoOptions,d),m?(this.currentResponsive={ruleIds:m,
	mergedOptions:q,undoOptions:this.currentOptions(q)},this.update(q,d)):this.currentResponsive=void 0)};z.prototype.matchResponsiveRule=function(a,d){var h=a.condition;(h.callback||function(){return this.chartWidth<=v(h.maxWidth,Number.MAX_VALUE)&&this.chartHeight<=v(h.maxHeight,Number.MAX_VALUE)&&this.chartWidth>=v(h.minWidth,0)&&this.chartHeight>=v(h.minHeight,0)}).call(this)&&d.push(a._id)};z.prototype.currentOptions=function(r){function p(f,m,l,c){var g;a.objectEach(f,function(a,e){if(!c&&-1<y(e,
	["series","xAxis","yAxis"]))for(a=t(a),l[e]=[],g=0;g<a.length;g++)m[e][g]&&(l[e][g]={},p(a[g],m[e][g],l[e][g],c+1));else d(a)?(l[e]=h(a)?[]:{},p(a,m[e]||{},l[e],c+1)):l[e]=m[e]||null})}var m={};p(r,this.options,m,0);return m}})(J);(function(a){var z=a.Axis,A=a.each,y=a.pick;a=a.wrap;a(z.prototype,"getSeriesExtremes",function(a){var d=this.isXAxis,h,t,r=[],p;d&&A(this.series,function(a,d){a.useMapGeometry&&(r[d]=a.xData,a.xData=[])});a.call(this);d&&(h=y(this.dataMin,Number.MAX_VALUE),t=y(this.dataMax,
	-Number.MAX_VALUE),A(this.series,function(a,d){a.useMapGeometry&&(h=Math.min(h,y(a.minX,h)),t=Math.max(t,y(a.maxX,t)),a.xData=r[d],p=!0)}),p&&(this.dataMin=h,this.dataMax=t))});a(z.prototype,"setAxisTranslation",function(a){var d=this.chart,h=d.plotWidth/d.plotHeight,d=d.xAxis[0],t;a.call(this);"yAxis"===this.coll&&void 0!==d.transA&&A(this.series,function(a){a.preserveAspectRatio&&(t=!0)});if(t&&(this.transA=d.transA=Math.min(this.transA,d.transA),a=h/((d.max-d.min)/(this.max-this.min)),a=1>a?this:
	d,h=(a.max-a.min)*a.transA,a.pixelPadding=a.len-h,a.minPixelPadding=a.pixelPadding/2,h=a.fixTo)){h=h[1]-a.toValue(h[0],!0);h*=a.transA;if(Math.abs(h)>a.minPixelPadding||a.min===a.dataMin&&a.max===a.dataMax)h=0;a.minPixelPadding-=h}});a(z.prototype,"render",function(a){a.call(this);this.fixTo=null})})(J);(function(a){var z=a.Axis,A=a.Chart,y=a.color,h,d=a.each,v=a.extend,t=a.isNumber,r=a.Legend,p=a.LegendSymbolMixin,m=a.noop,f=a.merge,q=a.pick,l=a.wrap;a.ColorAxis||(h=a.ColorAxis=function(){this.init.apply(this,
	arguments)},v(h.prototype,z.prototype),v(h.prototype,{defaultColorAxisOptions:{lineWidth:0,minPadding:0,maxPadding:0,gridLineWidth:1,tickPixelInterval:72,startOnTick:!0,endOnTick:!0,offset:0,marker:{animation:{duration:50},width:.01,color:"#999999"},labels:{overflow:"justify",rotation:0},minColor:"#e6ebf5",maxColor:"#003399",tickLength:5,showInLegend:!0},keepProps:["legendGroup","legendItemHeight","legendItemWidth","legendItem","legendSymbol"].concat(z.prototype.keepProps),init:function(a,d){var b=
	"vertical"!==a.options.legend.layout,c;this.coll="colorAxis";c=f(this.defaultColorAxisOptions,{side:b?2:1,reversed:!b},d,{opposite:!b,showEmpty:!1,title:null,visible:a.options.legend.enabled});z.prototype.init.call(this,a,c);d.dataClasses&&this.initDataClasses(d);this.initStops();this.horiz=b;this.zoomEnabled=!1;this.defaultLegendLength=200},initDataClasses:function(a){var c=this.chart,b,e=0,h=c.options.chart.colorCount,l=this.options,m=a.dataClasses.length;this.dataClasses=b=[];this.legendItems=
	[];d(a.dataClasses,function(a,d){a=f(a);b.push(a);a.color||("category"===l.dataClassColor?(d=c.options.colors,h=d.length,a.color=d[e],a.colorIndex=e,e++,e===h&&(e=0)):a.color=y(l.minColor).tweenTo(y(l.maxColor),2>m?.5:d/(m-1)))})},setTickPositions:function(){if(!this.dataClasses)return z.prototype.setTickPositions.call(this)},initStops:function(){this.stops=this.options.stops||[[0,this.options.minColor],[1,this.options.maxColor]];d(this.stops,function(a){a.color=y(a[1])})},setOptions:function(a){z.prototype.setOptions.call(this,
	a);this.options.crosshair=this.options.marker},setAxisSize:function(){var a=this.legendSymbol,d=this.chart,b=d.options.legend||{},e,f;a?(this.left=b=a.attr("x"),this.top=e=a.attr("y"),this.width=f=a.attr("width"),this.height=a=a.attr("height"),this.right=d.chartWidth-b-f,this.bottom=d.chartHeight-e-a,this.len=this.horiz?f:a,this.pos=this.horiz?b:e):this.len=(this.horiz?b.symbolWidth:b.symbolHeight)||this.defaultLegendLength},normalizedValue:function(a){this.isLog&&(a=this.val2lin(a));return 1-(this.max-
	a)/(this.max-this.min||1)},toColor:function(a,d){var b=this.stops,c,g,f=this.dataClasses,h,l;if(f)for(l=f.length;l--;){if(h=f[l],c=h.from,b=h.to,(void 0===c||a>=c)&&(void 0===b||a<=b)){g=h.color;d&&(d.dataClass=l,d.colorIndex=h.colorIndex);break}}else{a=this.normalizedValue(a);for(l=b.length;l--&&!(a>b[l][0]););c=b[l]||b[l+1];b=b[l+1]||c;a=1-(b[0]-a)/(b[0]-c[0]||1);g=c.color.tweenTo(b.color,a)}return g},getOffset:function(){var a=this.legendGroup,d=this.chart.axisOffset[this.side];a&&(this.axisParent=
	a,z.prototype.getOffset.call(this),this.added||(this.added=!0,this.labelLeft=0,this.labelRight=this.width),this.chart.axisOffset[this.side]=d)},setLegendColor:function(){var a,d=this.reversed;a=d?1:0;d=d?0:1;a=this.horiz?[a,0,d,0]:[0,d,0,a];this.legendColor={linearGradient:{x1:a[0],y1:a[1],x2:a[2],y2:a[3]},stops:this.stops}},drawLegendSymbol:function(a,d){var b=a.padding,c=a.options,g=this.horiz,f=q(c.symbolWidth,g?this.defaultLegendLength:12),h=q(c.symbolHeight,g?12:this.defaultLegendLength),l=q(c.labelPadding,
	g?16:30),c=q(c.itemDistance,10);this.setLegendColor();d.legendSymbol=this.chart.renderer.rect(0,a.baseline-11,f,h).attr({zIndex:1}).add(d.legendGroup);this.legendItemWidth=f+b+(g?c:l);this.legendItemHeight=h+b+(g?l:0)},setState:function(a){d(this.series,function(c){c.setState(a)})},visible:!0,setVisible:m,getSeriesExtremes:function(){var a=this.series,d=a.length;this.dataMin=Infinity;for(this.dataMax=-Infinity;d--;)void 0!==a[d].valueMin&&(this.dataMin=Math.min(this.dataMin,a[d].valueMin),this.dataMax=
	Math.max(this.dataMax,a[d].valueMax))},drawCrosshair:function(a,d){var b=d&&d.plotX,c=d&&d.plotY,g,f=this.pos,h=this.len;d&&(g=this.toPixels(d[d.series.colorKey]),g<f?g=f-2:g>f+h&&(g=f+h+2),d.plotX=g,d.plotY=this.len-g,z.prototype.drawCrosshair.call(this,a,d),d.plotX=b,d.plotY=c,this.cross&&!this.cross.addedToColorAxis&&this.legendGroup&&(this.cross.addClass("highcharts-coloraxis-marker").add(this.legendGroup),this.cross.addedToColorAxis=!0,this.cross.attr({fill:this.crosshair.color})))},getPlotLinePath:function(a,
	d,b,e,f){return t(f)?this.horiz?["M",f-4,this.top-6,"L",f+4,this.top-6,f,this.top,"Z"]:["M",this.left,f,"L",this.left-6,f+6,this.left-6,f-6,"Z"]:z.prototype.getPlotLinePath.call(this,a,d,b,e)},update:function(a,g){var b=this.chart,c=b.legend;d(this.series,function(a){a.isDirtyData=!0});a.dataClasses&&c.allItems&&(d(c.allItems,function(a){a.isDataClass&&a.legendGroup&&a.legendGroup.destroy()}),b.isDirtyLegend=!0);b.options[this.coll]=f(this.userOptions,a);z.prototype.update.call(this,a,g);this.legendItem&&
	(this.setLegendColor(),c.colorizeItem(this,!0))},remove:function(){this.legendItem&&this.chart.legend.destroyItem(this);z.prototype.remove.call(this)},getDataClassLegendSymbols:function(){var c=this,g=this.chart,b=this.legendItems,e=g.options.legend,f=e.valueDecimals,h=e.valueSuffix||"",l;b.length||d(this.dataClasses,function(e,n){var q=!0,r=e.from,t=e.to;l="";void 0===r?l="\x3c ":void 0===t&&(l="\x3e ");void 0!==r&&(l+=a.numberFormat(r,f)+h);void 0!==r&&void 0!==t&&(l+=" - ");void 0!==t&&(l+=a.numberFormat(t,
	f)+h);b.push(v({chart:g,name:l,options:{},drawLegendSymbol:p.drawRectangle,visible:!0,setState:m,isDataClass:!0,setVisible:function(){q=this.visible=!q;d(c.series,function(a){d(a.points,function(a){a.dataClass===n&&a.setVisible(q)})});g.legend.colorizeItem(this,q)}},e))});return b},name:""}),d(["fill","stroke"],function(c){a.Fx.prototype[c+"Setter"]=function(){this.elem.attr(c,y(this.start).tweenTo(y(this.end),this.pos),null,!0)}}),l(A.prototype,"getAxes",function(a){var c=this.options.colorAxis;
	a.call(this);this.colorAxis=[];c&&new h(this,c)}),l(r.prototype,"getAllItems",function(a){var c=[],b=this.chart.colorAxis[0];b&&b.options&&(b.options.showInLegend&&(b.options.dataClasses?c=c.concat(b.getDataClassLegendSymbols()):c.push(b)),d(b.series,function(a){a.options.showInLegend=!1}));return c.concat(a.call(this))}),l(r.prototype,"colorizeItem",function(a,d,b){a.call(this,d,b);b&&d.legendColor&&d.legendSymbol.attr({fill:d.legendColor})}),l(r.prototype,"update",function(a){a.apply(this,[].slice.call(arguments,
	1));this.chart.colorAxis[0]&&this.chart.colorAxis[0].update({},arguments[2])}))})(J);(function(a){var z=a.defined,A=a.each,y=a.noop,h=a.seriesTypes;a.colorPointMixin={isValid:function(){return null!==this.value&&Infinity!==this.value&&-Infinity!==this.value},setVisible:function(a){var d=this,h=a?"show":"hide";A(["graphic","dataLabel"],function(a){if(d[a])d[a][h]()})},setState:function(d){a.Point.prototype.setState.call(this,d);this.graphic&&this.graphic.attr({zIndex:"hover"===d?1:0})}};a.colorSeriesMixin=
	{pointArrayMap:["value"],axisTypes:["xAxis","yAxis","colorAxis"],optionalAxis:"colorAxis",trackerGroups:["group","markerGroup","dataLabelsGroup"],getSymbol:y,parallelArrays:["x","y","value"],colorKey:"value",pointAttribs:h.column.prototype.pointAttribs,translateColors:function(){var a=this,h=this.options.nullColor,t=this.colorAxis,r=this.colorKey;A(this.data,function(d){var m=d[r];if(m=d.options.color||(d.isNull?h:t&&void 0!==m?t.toColor(m,d):d.color||a.color))d.color=m})},colorAttribs:function(a){var d=
	{};z(a.color)&&(d[this.colorProp||"fill"]=a.color);return d}}})(J);(function(a){function z(a){a&&(a.preventDefault&&a.preventDefault(),a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)}function A(a){this.init(a)}var y=a.addEvent,h=a.Chart,d=a.doc,v=a.each,t=a.extend,r=a.merge,p=a.pick,m=a.wrap;A.prototype.init=function(a){this.chart=a;a.mapNavButtons=[]};A.prototype.update=function(d){var f=this.chart,h=f.options.mapNavigation,c,g,b,e,m,v=function(a){this.handler.call(f,a);z(a)},A=f.mapNavButtons;
	d&&(h=f.options.mapNavigation=r(f.options.mapNavigation,d));for(;A.length;)A.pop().destroy();p(h.enableButtons,h.enabled)&&!f.renderer.forExport&&a.objectEach(h.buttons,function(a,d){c=r(h.buttonOptions,a);g=c.theme;g.style=r(c.theme.style,c.style);e=(b=g.states)&&b.hover;m=b&&b.select;a=f.renderer.button(c.text,0,0,v,g,e,m,0,"zoomIn"===d?"topbutton":"bottombutton").addClass("highcharts-map-navigation").attr({width:c.width,height:c.height,title:f.options.lang[d],padding:c.padding,zIndex:5}).add();
	a.handler=c.onclick;a.align(t(c,{width:a.width,height:2*a.height}),null,c.alignTo);y(a.element,"dblclick",z);A.push(a)});this.updateEvents(h)};A.prototype.updateEvents=function(a){var f=this.chart;p(a.enableDoubleClickZoom,a.enabled)||a.enableDoubleClickZoomTo?this.unbindDblClick=this.unbindDblClick||y(f.container,"dblclick",function(a){f.pointer.onContainerDblClick(a)}):this.unbindDblClick&&(this.unbindDblClick=this.unbindDblClick());p(a.enableMouseWheelZoom,a.enabled)?this.unbindMouseWheel=this.unbindMouseWheel||
	y(f.container,void 0===d.onmousewheel?"DOMMouseScroll":"mousewheel",function(a){f.pointer.onContainerMouseWheel(a);z(a);return!1}):this.unbindMouseWheel&&(this.unbindMouseWheel=this.unbindMouseWheel())};t(h.prototype,{fitToBox:function(a,d){v([["x","width"],["y","height"]],function(f){var c=f[0];f=f[1];a[c]+a[f]>d[c]+d[f]&&(a[f]>d[f]?(a[f]=d[f],a[c]=d[c]):a[c]=d[c]+d[f]-a[f]);a[f]>d[f]&&(a[f]=d[f]);a[c]<d[c]&&(a[c]=d[c])});return a},mapZoom:function(a,d,h,c,g){var b=this.xAxis[0],e=b.max-b.min,f=
	p(d,b.min+e/2),m=e*a,e=this.yAxis[0],l=e.max-e.min,q=p(h,e.min+l/2),l=l*a,f=this.fitToBox({x:f-m*(c?(c-b.pos)/b.len:.5),y:q-l*(g?(g-e.pos)/e.len:.5),width:m,height:l},{x:b.dataMin,y:e.dataMin,width:b.dataMax-b.dataMin,height:e.dataMax-e.dataMin}),m=f.x<=b.dataMin&&f.width>=b.dataMax-b.dataMin&&f.y<=e.dataMin&&f.height>=e.dataMax-e.dataMin;c&&(b.fixTo=[c-b.pos,d]);g&&(e.fixTo=[g-e.pos,h]);void 0===a||m?(b.setExtremes(void 0,void 0,!1),e.setExtremes(void 0,void 0,!1)):(b.setExtremes(f.x,f.x+f.width,
	!1),e.setExtremes(f.y,f.y+f.height,!1));this.redraw()}});m(h.prototype,"render",function(a){this.mapNavigation=new A(this);this.mapNavigation.update();a.call(this)})})(J);(function(a){var z=a.extend,A=a.pick,y=a.Pointer;a=a.wrap;z(y.prototype,{onContainerDblClick:function(a){var d=this.chart;a=this.normalize(a);d.options.mapNavigation.enableDoubleClickZoomTo?d.pointer.inClass(a.target,"highcharts-tracker")&&d.hoverPoint&&d.hoverPoint.zoomTo():d.isInsidePlot(a.chartX-d.plotLeft,a.chartY-d.plotTop)&&
	d.mapZoom(.5,d.xAxis[0].toValue(a.chartX),d.yAxis[0].toValue(a.chartY),a.chartX,a.chartY)},onContainerMouseWheel:function(a){var d=this.chart,h;a=this.normalize(a);h=a.detail||-(a.wheelDelta/120);d.isInsidePlot(a.chartX-d.plotLeft,a.chartY-d.plotTop)&&d.mapZoom(Math.pow(d.options.mapNavigation.mouseWheelSensitivity,h),d.xAxis[0].toValue(a.chartX),d.yAxis[0].toValue(a.chartY),a.chartX,a.chartY)}});a(y.prototype,"zoomOption",function(a){var d=this.chart.options.mapNavigation;A(d.enableTouchZoom,d.enabled)&&
	(this.chart.options.chart.pinchType="xy");a.apply(this,[].slice.call(arguments,1))});a(y.prototype,"pinchTranslate",function(a,d,v,t,r,p,m){a.call(this,d,v,t,r,p,m);"map"===this.chart.options.chart.type&&this.hasZoom&&(a=t.scaleX>t.scaleY,this.pinchTranslateDirection(!a,d,v,t,r,p,m,a?t.scaleX:t.scaleY))})})(J);(function(a){var z=a.colorPointMixin,A=a.each,y=a.extend,h=a.isNumber,d=a.map,v=a.merge,t=a.noop,r=a.pick,p=a.isArray,m=a.Point,f=a.Series,q=a.seriesType,l=a.seriesTypes,c=a.splat,g=void 0!==
	a.doc.documentElement.style.vectorEffect;q("map","scatter",{allAreas:!0,animation:!1,nullColor:"#f7f7f7",borderColor:"#cccccc",borderWidth:1,marker:null,stickyTracking:!1,joinBy:"hc-key",dataLabels:{formatter:function(){return this.point.value},inside:!0,verticalAlign:"middle",crop:!1,overflow:!1,padding:0},turboThreshold:0,tooltip:{followPointer:!0,pointFormat:"{point.name}: {point.value}\x3cbr/\x3e"},states:{normal:{animation:!0},hover:{halo:null,brightness:.2},select:{color:"#cccccc"}}},v(a.colorSeriesMixin,
	{type:"map",getExtremesFromAll:!0,useMapGeometry:!0,forceDL:!0,searchPoint:t,directTouch:!0,preserveAspectRatio:!0,pointArrayMap:["value"],getBox:function(b){var c=Number.MAX_VALUE,d=-c,f=c,g=-c,m=c,l=c,p=this.xAxis,q=this.yAxis,t;A(b||[],function(b){if(b.path){"string"===typeof b.path&&(b.path=a.splitPath(b.path));var e=b.path||[],n=e.length,p=!1,k=-c,q=c,u=-c,v=c,x=b.properties;if(!b._foundBox){for(;n--;)h(e[n])&&(p?(k=Math.max(k,e[n]),q=Math.min(q,e[n])):(u=Math.max(u,e[n]),v=Math.min(v,e[n])),
	p=!p);b._midX=q+(k-q)*r(b.middleX,x&&x["hc-middle-x"],.5);b._midY=v+(u-v)*r(b.middleY,x&&x["hc-middle-y"],.5);b._maxX=k;b._minX=q;b._maxY=u;b._minY=v;b.labelrank=r(b.labelrank,(k-q)*(u-v));b._foundBox=!0}d=Math.max(d,b._maxX);f=Math.min(f,b._minX);g=Math.max(g,b._maxY);m=Math.min(m,b._minY);l=Math.min(b._maxX-b._minX,b._maxY-b._minY,l);t=!0}});t&&(this.minY=Math.min(m,r(this.minY,c)),this.maxY=Math.max(g,r(this.maxY,-c)),this.minX=Math.min(f,r(this.minX,c)),this.maxX=Math.max(d,r(this.maxX,-c)),p&&
	void 0===p.options.minRange&&(p.minRange=Math.min(5*l,(this.maxX-this.minX)/5,p.minRange||c)),q&&void 0===q.options.minRange&&(q.minRange=Math.min(5*l,(this.maxY-this.minY)/5,q.minRange||c)))},getExtremes:function(){f.prototype.getExtremes.call(this,this.valueData);this.chart.hasRendered&&this.isDirtyData&&this.getBox(this.options.data);this.valueMin=this.dataMin;this.valueMax=this.dataMax;this.dataMin=this.minY;this.dataMax=this.maxY},translatePath:function(a){var b=!1,c=this.xAxis,d=this.yAxis,
	f=c.min,g=c.transA,c=c.minPixelPadding,m=d.min,l=d.transA,d=d.minPixelPadding,p,q=[];if(a)for(p=a.length;p--;)h(a[p])?(q[p]=b?(a[p]-f)*g+c:(a[p]-m)*l+d,b=!b):q[p]=a[p];return q},setData:function(b,e,g,m){var l=this.options,n=this.chart.options.chart,q=n&&n.map,r=l.mapData,t=l.joinBy,y=null===t,x=l.keys||this.pointArrayMap,z=[],D={},H=this.chart.mapTransforms;!r&&q&&(r="string"===typeof q?a.maps[q]:q);y&&(t="_i");t=this.joinBy=c(t);t[1]||(t[1]=t[0]);b&&A(b,function(a,c){var d=0;if(h(a))b[c]={value:a};
	else if(p(a)){b[c]={};!l.keys&&a.length>x.length&&"string"===typeof a[0]&&(b[c]["hc-key"]=a[0],++d);for(var e=0;e<x.length;++e,++d)x[e]&&(b[c][x[e]]=a[d])}y&&(b[c]._i=c)});this.getBox(b);(this.chart.mapTransforms=H=n&&n.mapTransforms||r&&r["hc-transform"]||H)&&a.objectEach(H,function(a){a.rotation&&(a.cosAngle=Math.cos(a.rotation),a.sinAngle=Math.sin(a.rotation))});if(r){"FeatureCollection"===r.type&&(this.mapTitle=r.title,r=a.geojson(r,this.type,this));this.mapData=r;this.mapMap={};for(H=0;H<r.length;H++)n=
	r[H],q=n.properties,n._i=H,t[0]&&q&&q[t[0]]&&(n[t[0]]=q[t[0]]),D[n[t[0]]]=n;this.mapMap=D;b&&t[1]&&A(b,function(a){D[a[t[1]]]&&z.push(D[a[t[1]]])});l.allAreas?(this.getBox(r),b=b||[],t[1]&&A(b,function(a){z.push(a[t[1]])}),z="|"+d(z,function(a){return a&&a[t[0]]}).join("|")+"|",A(r,function(a){t[0]&&-1!==z.indexOf("|"+a[t[0]]+"|")||(b.push(v(a,{value:null})),m=!1)})):this.getBox(z)}f.prototype.setData.call(this,b,e,g,m)},drawGraph:t,drawDataLabels:t,doFullTranslate:function(){return this.isDirtyData||
	this.chart.isResizing||this.chart.renderer.isVML||!this.baseTrans},translate:function(){var a=this,c=a.xAxis,d=a.yAxis,f=a.doFullTranslate();a.generatePoints();A(a.data,function(b){b.plotX=c.toPixels(b._midX,!0);b.plotY=d.toPixels(b._midY,!0);f&&(b.shapeType="path",b.shapeArgs={d:a.translatePath(b.path)})});a.translateColors()},pointAttribs:function(a,c){a=l.column.prototype.pointAttribs.call(this,a,c);g?a["vector-effect"]="non-scaling-stroke":a["stroke-width"]="inherit";return a},drawPoints:function(){var a=
	this,c=a.xAxis,d=a.yAxis,f=a.group,h=a.chart,m=h.renderer,p,q,r,t,v=this.baseTrans,y,z,H,k,w;a.transformGroup||(a.transformGroup=m.g().attr({scaleX:1,scaleY:1}).add(f),a.transformGroup.survive=!0);a.doFullTranslate()?(h.hasRendered&&A(a.points,function(b){b.shapeArgs&&(b.shapeArgs.fill=a.pointAttribs(b,b.state).fill)}),a.group=a.transformGroup,l.column.prototype.drawPoints.apply(a),a.group=f,A(a.points,function(a){a.graphic&&(a.name&&a.graphic.addClass("highcharts-name-"+a.name.replace(/ /g,"-").toLowerCase()),
	a.properties&&a.properties["hc-key"]&&a.graphic.addClass("highcharts-key-"+a.properties["hc-key"].toLowerCase()))}),this.baseTrans={originX:c.min-c.minPixelPadding/c.transA,originY:d.min-d.minPixelPadding/d.transA+(d.reversed?0:d.len/d.transA),transAX:c.transA,transAY:d.transA},this.transformGroup.animate({translateX:0,translateY:0,scaleX:1,scaleY:1})):(p=c.transA/v.transAX,q=d.transA/v.transAY,r=c.toPixels(v.originX,!0),t=d.toPixels(v.originY,!0),.99<p&&1.01>p&&.99<q&&1.01>q&&(q=p=1,r=Math.round(r),
	t=Math.round(t)),y=this.transformGroup,h.renderer.globalAnimation?(z=y.attr("translateX"),H=y.attr("translateY"),k=y.attr("scaleX"),w=y.attr("scaleY"),y.attr({animator:0}).animate({animator:1},{step:function(a,b){y.attr({translateX:z+(r-z)*b.pos,translateY:H+(t-H)*b.pos,scaleX:k+(p-k)*b.pos,scaleY:w+(q-w)*b.pos})}})):y.attr({translateX:r,translateY:t,scaleX:p,scaleY:q}));g||a.group.element.setAttribute("stroke-width",a.options[a.pointAttrToOptions&&a.pointAttrToOptions["stroke-width"]||"borderWidth"]/
	(p||1));this.drawMapDataLabels()},drawMapDataLabels:function(){f.prototype.drawDataLabels.call(this);this.dataLabelsGroup&&this.dataLabelsGroup.clip(this.chart.clipRect)},render:function(){var a=this,c=f.prototype.render;a.chart.renderer.isVML&&3E3<a.data.length?setTimeout(function(){c.call(a)}):c.call(a)},animate:function(a){var b=this.options.animation,c=this.group,d=this.xAxis,f=this.yAxis,g=d.pos,h=f.pos;this.chart.renderer.isSVG&&(!0===b&&(b={duration:1E3}),a?c.attr({translateX:g+d.len/2,translateY:h+
	f.len/2,scaleX:.001,scaleY:.001}):(c.animate({translateX:g,translateY:h,scaleX:1,scaleY:1},b),this.animate=null))},animateDrilldown:function(a){var b=this.chart.plotBox,c=this.chart.drilldownLevels[this.chart.drilldownLevels.length-1],d=c.bBox,f=this.chart.options.drilldown.animation;a||(a=Math.min(d.width/b.width,d.height/b.height),c.shapeArgs={scaleX:a,scaleY:a,translateX:d.x,translateY:d.y},A(this.points,function(a){a.graphic&&a.graphic.attr(c.shapeArgs).animate({scaleX:1,scaleY:1,translateX:0,
	translateY:0},f)}),this.animate=null)},drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,animateDrillupFrom:function(a){l.column.prototype.animateDrillupFrom.call(this,a)},animateDrillupTo:function(a){l.column.prototype.animateDrillupTo.call(this,a)}}),y({applyOptions:function(a,c){a=m.prototype.applyOptions.call(this,a,c);c=this.series;var b=c.joinBy;c.mapData&&((b=void 0!==a[b[1]]&&c.mapMap[a[b[1]]])?(c.xyFromShape&&(a.x=b._midX,a.y=b._midY),y(a,b)):a.value=a.value||null);return a},onMouseOver:function(a){clearTimeout(this.colorInterval);
	if(null!==this.value||this.series.options.nullInteraction)m.prototype.onMouseOver.call(this,a);else this.series.onMouseOut(a)},zoomTo:function(){var a=this.series;a.xAxis.setExtremes(this._minX,this._maxX,!1);a.yAxis.setExtremes(this._minY,this._maxY,!1);a.chart.redraw()}},z))})(J);(function(a){var z=a.seriesType,A=a.seriesTypes;z("mapline","map",{lineWidth:1,fillColor:"none"},{type:"mapline",colorProp:"stroke",pointAttrToOptions:{stroke:"color","stroke-width":"lineWidth"},pointAttribs:function(a,
	h){a=A.map.prototype.pointAttribs.call(this,a,h);a.fill=this.options.fillColor;return a},drawLegendSymbol:A.line.prototype.drawLegendSymbol})})(J);(function(a){var z=a.merge,A=a.Point;a=a.seriesType;a("mappoint","scatter",{dataLabels:{enabled:!0,formatter:function(){return this.point.name},crop:!1,defer:!1,overflow:!1,style:{color:"#000000"}}},{type:"mappoint",forceDL:!0},{applyOptions:function(a,h){a=void 0!==a.lat&&void 0!==a.lon?z(a,this.series.chart.fromLatLonToPoint(a)):a;return A.prototype.applyOptions.call(this,
	a,h)}})})(J);(function(a){var z=a.arrayMax,A=a.arrayMin,y=a.Axis,h=a.color,d=a.each,v=a.isNumber,t=a.noop,r=a.pick,p=a.pInt,m=a.Point,f=a.Series,q=a.seriesType,l=a.seriesTypes;q("bubble","scatter",{dataLabels:{formatter:function(){return this.point.z},inside:!0,verticalAlign:"middle"},marker:{lineColor:null,lineWidth:1,radius:null,states:{hover:{radiusPlus:0}},symbol:"circle"},minSize:8,maxSize:"20%",softThreshold:!1,states:{hover:{halo:{size:5}}},tooltip:{pointFormat:"({point.x}, {point.y}), Size: {point.z}"},
	turboThreshold:0,zThreshold:0,zoneAxis:"z"},{pointArrayMap:["y","z"],parallelArrays:["x","y","z"],trackerGroups:["group","dataLabelsGroup"],specialGroup:"group",bubblePadding:!0,zoneAxis:"z",directTouch:!0,pointAttribs:function(a,d){var b=r(this.options.marker.fillOpacity,.5);a=f.prototype.pointAttribs.call(this,a,d);1!==b&&(a.fill=h(a.fill).setOpacity(b).get("rgba"));return a},getRadii:function(a,d,b,e){var c,f,g,h=this.zData,m=[],l=this.options,p="width"!==l.sizeBy,q=l.zThreshold,r=d-a;f=0;for(c=
	h.length;f<c;f++)g=h[f],l.sizeByAbsoluteValue&&null!==g&&(g=Math.abs(g-q),d=Math.max(d-q,Math.abs(a-q)),a=0),null===g?g=null:g<a?g=b/2-1:(g=0<r?(g-a)/r:.5,p&&0<=g&&(g=Math.sqrt(g)),g=Math.ceil(b+g*(e-b))/2),m.push(g);this.radii=m},animate:function(a){var c=this.options.animation;a||(d(this.points,function(a){var b=a.graphic,d;b&&b.width&&(d={x:b.x,y:b.y,width:b.width,height:b.height},b.attr({x:a.plotX,y:a.plotY,width:1,height:1}),b.animate(d,c))}),this.animate=null)},translate:function(){var c,d=
	this.data,b,e,f=this.radii;l.scatter.prototype.translate.call(this);for(c=d.length;c--;)b=d[c],e=f?f[c]:0,v(e)&&e>=this.minPxSize/2?(b.marker=a.extend(b.marker,{radius:e,width:2*e,height:2*e}),b.dlBox={x:b.plotX-e,y:b.plotY-e,width:2*e,height:2*e}):b.shapeArgs=b.plotY=b.dlBox=void 0},alignDataLabel:l.column.prototype.alignDataLabel,buildKDTree:t,applyZones:t},{haloPath:function(a){return m.prototype.haloPath.call(this,0===a?0:(this.marker?this.marker.radius||0:0)+a)},ttBelow:!1});y.prototype.beforePadding=
	function(){var a=this,f=this.len,b=this.chart,e=0,h=f,m=this.isXAxis,l=m?"xData":"yData",q=this.min,t={},u=Math.min(b.plotWidth,b.plotHeight),y=Number.MAX_VALUE,J=-Number.MAX_VALUE,x=this.max-q,F=f/x,G=[];d(this.series,function(c){var e=c.options;!c.bubblePadding||!c.visible&&b.options.chart.ignoreHiddenSeries||(a.allowZoomOutside=!0,G.push(c),m&&(d(["minSize","maxSize"],function(a){var b=e[a],c=/%$/.test(b),b=p(b);t[a]=c?u*b/100:b}),c.minPxSize=t.minSize,c.maxPxSize=Math.max(t.maxSize,t.minSize),
	c=c.zData,c.length&&(y=r(e.zMin,Math.min(y,Math.max(A(c),!1===e.displayNegative?e.zThreshold:-Number.MAX_VALUE))),J=r(e.zMax,Math.max(J,z(c))))))});d(G,function(b){var c=b[l],d=c.length,f;m&&b.getRadii(y,J,b.minPxSize,b.maxPxSize);if(0<x)for(;d--;)v(c[d])&&a.dataMin<=c[d]&&c[d]<=a.dataMax&&(f=b.radii[d],e=Math.min((c[d]-q)*F-f,e),h=Math.max((c[d]-q)*F+f,h))});G.length&&0<x&&!this.isLog&&(h-=f,F*=(f+e-h)/f,d([["min","userMin",e],["max","userMax",h]],function(b){void 0===r(a.options[b[0]],a[b[1]])&&
	(a[b[0]]+=b[2]/F)}))}})(J);(function(a){var z=a.merge,A=a.Point,y=a.seriesType,h=a.seriesTypes;h.bubble&&y("mapbubble","bubble",{animationLimit:500,tooltip:{pointFormat:"{point.name}: {point.z}"}},{xyFromShape:!0,type:"mapbubble",pointArrayMap:["z"],getMapData:h.map.prototype.getMapData,getBox:h.map.prototype.getBox,setData:h.map.prototype.setData},{applyOptions:function(a,v){return a&&void 0!==a.lat&&void 0!==a.lon?A.prototype.applyOptions.call(this,z(a,this.series.chart.fromLatLonToPoint(a)),v):
	h.map.prototype.pointClass.prototype.applyOptions.call(this,a,v)},isValid:function(){return"number"===typeof this.z},ttBelow:!1})})(J);(function(a){var z=a.colorPointMixin,A=a.each,y=a.merge,h=a.noop,d=a.pick,v=a.Series,t=a.seriesType,r=a.seriesTypes;t("heatmap","scatter",{animation:!1,borderWidth:0,nullColor:"#f7f7f7",dataLabels:{formatter:function(){return this.point.value},inside:!0,verticalAlign:"middle",crop:!1,overflow:!1,padding:0},marker:null,pointRange:null,tooltip:{pointFormat:"{point.x}, {point.y}: {point.value}\x3cbr/\x3e"},
	states:{normal:{animation:!0},hover:{halo:!1,brightness:.2}}},y(a.colorSeriesMixin,{pointArrayMap:["y","value"],hasPointSpecificOptions:!0,getExtremesFromAll:!0,directTouch:!0,init:function(){var a;r.scatter.prototype.init.apply(this,arguments);a=this.options;a.pointRange=d(a.pointRange,a.colsize||1);this.yAxis.axisPointRange=a.rowsize||1},translate:function(){var a=this.options,h=this.xAxis,f=this.yAxis,q=a.pointPadding||0,l=function(a,d,b){return Math.min(Math.max(d,a),b)};this.generatePoints();
	A(this.points,function(c){var g=(a.colsize||1)/2,b=(a.rowsize||1)/2,e=l(Math.round(h.len-h.translate(c.x-g,0,1,0,1)),-h.len,2*h.len),g=l(Math.round(h.len-h.translate(c.x+g,0,1,0,1)),-h.len,2*h.len),m=l(Math.round(f.translate(c.y-b,0,1,0,1)),-f.len,2*f.len),b=l(Math.round(f.translate(c.y+b,0,1,0,1)),-f.len,2*f.len),p=d(c.pointPadding,q);c.plotX=c.clientX=(e+g)/2;c.plotY=(m+b)/2;c.shapeType="rect";c.shapeArgs={x:Math.min(e,g)+p,y:Math.min(m,b)+p,width:Math.abs(g-e)-2*p,height:Math.abs(b-m)-2*p}});this.translateColors()},
	drawPoints:function(){r.column.prototype.drawPoints.call(this);A(this.points,function(a){a.graphic.attr(this.colorAttribs(a))},this)},animate:h,getBox:h,drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,alignDataLabel:r.column.prototype.alignDataLabel,getExtremes:function(){v.prototype.getExtremes.call(this,this.valueData);this.valueMin=this.dataMin;this.valueMax=this.dataMax;v.prototype.getExtremes.call(this)}}),a.extend({haloPath:function(a){if(!a)return[];var d=this.shapeArgs;return["M",d.x-a,
	d.y-a,"L",d.x-a,d.y+d.height+a,d.x+d.width+a,d.y+d.height+a,d.x+d.width+a,d.y-a,"Z"]}},z))})(J);(function(a){function z(a,d){var f,h,l,c=!1,g=a.x,b=a.y;a=0;for(f=d.length-1;a<d.length;f=a++)h=d[a][1]>b,l=d[f][1]>b,h!==l&&g<(d[f][0]-d[a][0])*(b-d[a][1])/(d[f][1]-d[a][1])+d[a][0]&&(c=!c);return c}var A=a.Chart,y=a.each,h=a.extend,d=a.format,v=a.merge,t=a.win,r=a.wrap;A.prototype.transformFromLatLon=function(d,h){if(void 0===t.proj4)return a.error(21),{x:0,y:null};d=t.proj4(h.crs,[d.lon,d.lat]);var f=
	h.cosAngle||h.rotation&&Math.cos(h.rotation),m=h.sinAngle||h.rotation&&Math.sin(h.rotation);d=h.rotation?[d[0]*f+d[1]*m,-d[0]*m+d[1]*f]:d;return{x:((d[0]-(h.xoffset||0))*(h.scale||1)+(h.xpan||0))*(h.jsonres||1)+(h.jsonmarginX||0),y:(((h.yoffset||0)-d[1])*(h.scale||1)+(h.ypan||0))*(h.jsonres||1)-(h.jsonmarginY||0)}};A.prototype.transformToLatLon=function(d,h){if(void 0===t.proj4)a.error(21);else{d={x:((d.x-(h.jsonmarginX||0))/(h.jsonres||1)-(h.xpan||0))/(h.scale||1)+(h.xoffset||0),y:((-d.y-(h.jsonmarginY||
	0))/(h.jsonres||1)+(h.ypan||0))/(h.scale||1)+(h.yoffset||0)};var f=h.cosAngle||h.rotation&&Math.cos(h.rotation),m=h.sinAngle||h.rotation&&Math.sin(h.rotation);h=t.proj4(h.crs,"WGS84",h.rotation?{x:d.x*f+d.y*-m,y:d.x*m+d.y*f}:d);return{lat:h.y,lon:h.x}}};A.prototype.fromPointToLatLon=function(d){var h=this.mapTransforms,f;if(h){for(f in h)if(h.hasOwnProperty(f)&&h[f].hitZone&&z({x:d.x,y:-d.y},h[f].hitZone.coordinates[0]))return this.transformToLatLon(d,h[f]);return this.transformToLatLon(d,h["default"])}a.error(22)};
	A.prototype.fromLatLonToPoint=function(d){var h=this.mapTransforms,f,q;if(!h)return a.error(22),{x:0,y:null};for(f in h)if(h.hasOwnProperty(f)&&h[f].hitZone&&(q=this.transformFromLatLon(d,h[f]),z({x:q.x,y:-q.y},h[f].hitZone.coordinates[0])))return q;return this.transformFromLatLon(d,h["default"])};a.geojson=function(a,m,f){var q=[],l=[],c=function(a){var b,c=a.length;l.push("M");for(b=0;b<c;b++)1===b&&l.push("L"),l.push(a[b][0],-a[b][1])};m=m||"map";y(a.features,function(a){var b=a.geometry,d=b.type,
	b=b.coordinates;a=a.properties;var f;l=[];"map"===m||"mapbubble"===m?("Polygon"===d?(y(b,c),l.push("Z")):"MultiPolygon"===d&&(y(b,function(a){y(a,c)}),l.push("Z")),l.length&&(f={path:l})):"mapline"===m?("LineString"===d?c(b):"MultiLineString"===d&&y(b,c),l.length&&(f={path:l})):"mappoint"===m&&"Point"===d&&(f={x:b[0],y:-b[1]});f&&q.push(h(f,{name:a.name||a.NAME,properties:a}))});f&&a.copyrightShort&&(f.chart.mapCredits=d(f.chart.options.credits.mapText,{geojson:a}),f.chart.mapCreditsFull=d(f.chart.options.credits.mapTextFull,
	{geojson:a}));return q};r(A.prototype,"addCredits",function(a,d){d=v(!0,this.options.credits,d);this.mapCredits&&(d.href=null);a.call(this,d);this.credits&&this.mapCreditsFull&&this.credits.attr({title:this.mapCreditsFull})})})(J);(function(a){function z(a,d,h,c,g,b,e,m){return["M",a+g,d,"L",a+h-b,d,"C",a+h-b/2,d,a+h,d+b/2,a+h,d+b,"L",a+h,d+c-e,"C",a+h,d+c-e/2,a+h-e/2,d+c,a+h-e,d+c,"L",a+m,d+c,"C",a+m/2,d+c,a,d+c-m/2,a,d+c-m,"L",a,d+g,"C",a,d+g/2,a+g/2,d,a+g,d,"Z"]}var A=a.Chart,y=a.defaultOptions,
	h=a.each,d=a.extend,v=a.merge,t=a.pick,r=a.Renderer,p=a.SVGRenderer,m=a.VMLRenderer;d(y.lang,{zoomIn:"Zoom in",zoomOut:"Zoom out"});y.mapNavigation={buttonOptions:{alignTo:"plotBox",align:"left",verticalAlign:"top",x:0,width:18,height:18,padding:5,style:{fontSize:"15px",fontWeight:"bold"},theme:{"stroke-width":1,"text-align":"center"}},buttons:{zoomIn:{onclick:function(){this.mapZoom(.5)},text:"+",y:0},zoomOut:{onclick:function(){this.mapZoom(2)},text:"-",y:28}},mouseWheelSensitivity:1.1};a.splitPath=
	function(a){var d;a=a.replace(/([A-Za-z])/g," $1 ");a=a.replace(/^\s*/,"").replace(/\s*$/,"");a=a.split(/[ ,]+/);for(d=0;d<a.length;d++)/[a-zA-Z]/.test(a[d])||(a[d]=parseFloat(a[d]));return a};a.maps={};p.prototype.symbols.topbutton=function(a,d,h,c,g){return z(a-1,d-1,h,c,g.r,g.r,0,0)};p.prototype.symbols.bottombutton=function(a,d,h,c,g){return z(a-1,d-1,h,c,0,0,g.r,g.r)};r===m&&h(["topbutton","bottombutton"],function(a){m.prototype.symbols[a]=p.prototype.symbols[a]});a.Map=a.mapChart=function(d,
	h,l){var c="string"===typeof d||d.nodeName,f=arguments[c?1:0],b={endOnTick:!1,visible:!1,minPadding:0,maxPadding:0,startOnTick:!1},e,m=a.getOptions().credits;e=f.series;f.series=null;f=v({chart:{panning:"xy",type:"map"},credits:{mapText:t(m.mapText,' \u00a9 \x3ca href\x3d"{geojson.copyrightUrl}"\x3e{geojson.copyrightShort}\x3c/a\x3e'),mapTextFull:t(m.mapTextFull,"{geojson.copyright}")},tooltip:{followTouchMove:!1},xAxis:b,yAxis:v(b,{reversed:!0})},f,{chart:{inverted:!1,alignTicks:!1}});f.series=e;
	return c?new A(d,f,l):new A(f,h)}})(J);return J});


/***/ }),
/* 7 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function concatStyles() {
	    for (var _len = arguments.length, rules = Array(_len), _key = 0; _key < _len; _key++) {
	        rules[_key] = arguments[_key];
	    }

	    return rules.join(';');
	}

	/**
	 * Generates HTML for zeppelin-rf-map settings panel.
	 * @param {object} params
	 * @param {string} params.idPrefix
	 */
	function getSettingsPanelTemplate(params) {
	    var idPrefix = params.idPrefix;
	    var ids = {
	        allAreas: idPrefix + '_all-areas',
	        rangesNumber: idPrefix + '_ranges-number',
	        minInRange: idPrefix + '_min-in-range',
	        maxInRange: idPrefix + '_max-in-range',
	        map: idPrefix + '_maps'
	    };
	    var styles = {
	        label: concatStyles('margin-right: 10px'),
	        input: concatStyles('text-align: right', 'width: 100px'),
	        formGroup: concatStyles('margin-left: 30px', 'margin-right: 30px')
	    };

	    return '\n<form class="form-horizontal form-inline" ng-submit="updateMap()">\n    <div class="form-group" style="' + styles.formGroup + '">\n        <label for="' + ids.map + '" style="' + styles.label + '">\n            {{:: l10n(\'settings.map\') }}:\n        </label>\n        <select class="form-control"\n            id="' + ids.map + '"\n            name="map"\n            ng-model="map"\n            ng-change="updateMap()"\n        >\n            <option ng-repeat="map in maps track by map.mapID"\n                value="{{ map.mapID }}"\n            >\n                {{ map.mapL10n }}\n            </option>\n        </select>\n    </div>\n    <div class="form-group" style="' + styles.formGroup + '">\n        <label for="' + ids.rangesNumber + '" style="' + styles.label + '">\n            {{:: l10n(\'settings.rangesNumber\') }}:\n        </label>\n        <input type="number"\n            style="' + styles.input + '"\n            min="' + params.minRangesNumber + '"\n            max="' + params.maxRangesNumber + '"\n            class="form-control"\n            id="' + ids.rangesNumber + '"\n            name="ranges-number"\n            ng-model="rangesNumber"\n            ng-blur="updateMap()"\n            ng-enter="updateMap()"\n        >\n    </div>\n    <div class="form-group" style="' + styles.formGroup + '">\n        <label for="' + ids.minInRange + '" style="' + styles.label + '">\n            {{:: l10n(\'settings.minInRange\') }}:\n        </label>\n        <input type="number"\n            style="' + styles.input + '"\n            class="form-control"\n            id="' + ids.minInRange + '"\n            name="min-in-range"\n            ng-model="minInRange"\n            ng-blur="updateMap()"\n            ng-enter="updateMap()"\n        >\n    </div>\n    <div class="form-group" style="' + styles.formGroup + '">\n        <label for="' + ids.maxInRange + '" style="' + styles.label + '">\n            {{:: l10n(\'settings.maxInRange\') }}:\n        </label>\n        <input type="number"\n            style="' + styles.input + '"\n            class="form-control"\n            id="' + ids.maxInRange + '"\n            name="max-in-range"\n            ng-model="maxInRange"\n            ng-blur="updateMap()"\n            ng-enter="updateMap()"\n        >\n    </div>\n    <div class="form-group" style="' + styles.formGroup + '">\n        <div class="checkbox">\n            <label>\n                <input type="checkbox"\n                    id="' + ids.allAreas + '"\n                    name="all-areas",\n                    ng-model="allAreas"\n                    ng-change="updateMap()"\n                >\n                {{:: l10n(\'settings.allAreas\') }}\n            </label>\n        </div>\n    </div>\n</form>\n    ';
	}

	exports.default = getSettingsPanelTemplate;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.l10n = undefined;

	var _nodePolyglot = __webpack_require__(9);

	var _nodePolyglot2 = _interopRequireDefault(_nodePolyglot);

	var _get = __webpack_require__(33);

	var _get2 = _interopRequireDefault(_get);

	var _l10n = __webpack_require__(85);

	var _l10n2 = _interopRequireDefault(_l10n);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var locale = navigator.language;
	var defaultLocale = 'en';
	var defaultPhrases = _l10n2.default[defaultLocale];
	var phrases = _l10n2.default[locale] || defaultPhrases;

	/**
	 * Logs arguments with fixed app-related prefix.
	 * @private
	 * @param {...any} args
	 */
	function log() {
	    var _console;

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	    }

	    (_console = console).log.apply(_console, ['[zeppelin-highmaps l10n]'].concat(args));
	}

	/**
	 * Missing localization key handler.
	 * @private
	 * @param {string} missedKey Missed localization key.
	 * @param {object} [opts] Default key template options.
	 */
	function onMissingKey(missedKey, opts) {
	    var defaultValue = (0, _get2.default)(defaultPhrases, missedKey, '');
	    if (defaultValue) {
	        log('localization from default (' + defaultLocale + ') locale is used for \'' + missedKey + '\' key');
	        return _nodePolyglot2.default.transformPhrase(defaultValue, opts, defaultLocale);
	    }
	    log('localization for key \'' + missedKey + '\' not found!');
	    return missedKey;
	}

	var polyglot = new _nodePolyglot2.default({
	    phrases: phrases,
	    locale: locale,
	    allowMissing: true,
	    onMissingKey: onMissingKey
	});

	/**
	 * Returns localized phrase by it's key. Interpolation and plural forms are supported.
	 * @param {string} key Phrase key.
	 * @param {object} params Interpolation parameters.
	 * @returns {string} Localized phrase.
	 * @example
	 * const phrases = {
	 *   test: {
	 *     simple: 'Hello, world!',
	 *     interpolateMe: 'Hello, %{name}!',
	 *     // use 'smart_count' for plural forms.
	 *     plural: 'Hello, %{smart_count} world! |||| Hello, %{smart_count} worlds!'
	 *   }
	 * };
	 * ...
	 * l10n('test.simple'); // Hello, world!
	 * l10n('test.interpolateMe', { name: 'WORLD' }); // Hello, WORLD!
	 * l10n('test.plural', { smart_count: 1 }); // Hello, 1 world!
	 * l10n('test.plural', { smart_count: 5 }); // Hello, 5 worlds!
	 */
	var l10n = exports.l10n = polyglot.t.bind(polyglot);

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	//     (c) 2012-2016 Airbnb, Inc.
	//
	//     polyglot.js may be freely distributed under the terms of the BSD
	//     license. For all licensing information, details, and documention:
	//     http://airbnb.github.com/polyglot.js
	//
	//
	// Polyglot.js is an I18n helper library written in JavaScript, made to
	// work both in the browser and in Node. It provides a simple solution for
	// interpolation and pluralization, based off of Airbnb's
	// experience adding I18n functionality to its Backbone.js and Node apps.
	//
	// Polylglot is agnostic to your translation backend. It doesn't perform any
	// translation; it simply gives you a way to manage translated phrases from
	// your client- or server-side JavaScript application.
	//

	'use strict';

	var forEach = __webpack_require__(10);
	var warning = __webpack_require__(12);
	var has = __webpack_require__(14);
	var trim = __webpack_require__(17);

	var warn = function warn(message) {
	  warning(false, message);
	};

	var replace = String.prototype.replace;
	var split = String.prototype.split;

	// #### Pluralization methods
	// The string that separates the different phrase possibilities.
	var delimeter = '||||';

	// Mapping from pluralization group plural logic.
	var pluralTypes = {
	  arabic: function (n) {
	    // http://www.arabeyes.org/Plural_Forms
	    if (n < 3) { return n; }
	    if (n % 100 >= 3 && n % 100 <= 10) return 3;
	    return n % 100 >= 11 ? 4 : 5;
	  },
	  chinese: function () { return 0; },
	  german: function (n) { return n !== 1 ? 1 : 0; },
	  french: function (n) { return n > 1 ? 1 : 0; },
	  russian: function (n) {
	    if (n % 10 === 1 && n % 100 !== 11) { return 0; }
	    return n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;
	  },
	  czech: function (n) {
	    if (n === 1) { return 0; }
	    return (n >= 2 && n <= 4) ? 1 : 2;
	  },
	  polish: function (n) {
	    if (n === 1) { return 0; }
	    return n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;
	  },
	  icelandic: function (n) { return (n % 10 !== 1 || n % 100 === 11) ? 1 : 0; }
	};

	// Mapping from pluralization group to individual locales.
	var pluralTypeToLanguages = {
	  arabic: ['ar'],
	  chinese: ['fa', 'id', 'ja', 'ko', 'lo', 'ms', 'th', 'tr', 'zh'],
	  german: ['da', 'de', 'en', 'es', 'fi', 'el', 'he', 'hu', 'it', 'nl', 'no', 'pt', 'sv'],
	  french: ['fr', 'tl', 'pt-br'],
	  russian: ['hr', 'ru', 'lt'],
	  czech: ['cs', 'sk'],
	  polish: ['pl'],
	  icelandic: ['is']
	};

	function langToTypeMap(mapping) {
	  var ret = {};
	  forEach(mapping, function (langs, type) {
	    forEach(langs, function (lang) {
	      ret[lang] = type;
	    });
	  });
	  return ret;
	}

	function pluralTypeName(locale) {
	  var langToPluralType = langToTypeMap(pluralTypeToLanguages);
	  return langToPluralType[locale]
	    || langToPluralType[split.call(locale, /-/, 1)[0]]
	    || langToPluralType.en;
	}

	function pluralTypeIndex(locale, count) {
	  return pluralTypes[pluralTypeName(locale)](count);
	}

	var dollarRegex = /\$/g;
	var dollarBillsYall = '$$';
	var tokenRegex = /%\{(.*?)\}/g;

	// ### transformPhrase(phrase, substitutions, locale)
	//
	// Takes a phrase string and transforms it by choosing the correct
	// plural form and interpolating it.
	//
	//     transformPhrase('Hello, %{name}!', {name: 'Spike'});
	//     // "Hello, Spike!"
	//
	// The correct plural form is selected if substitutions.smart_count
	// is set. You can pass in a number instead of an Object as `substitutions`
	// as a shortcut for `smart_count`.
	//
	//     transformPhrase('%{smart_count} new messages |||| 1 new message', {smart_count: 1}, 'en');
	//     // "1 new message"
	//
	//     transformPhrase('%{smart_count} new messages |||| 1 new message', {smart_count: 2}, 'en');
	//     // "2 new messages"
	//
	//     transformPhrase('%{smart_count} new messages |||| 1 new message', 5, 'en');
	//     // "5 new messages"
	//
	// You should pass in a third argument, the locale, to specify the correct plural type.
	// It defaults to `'en'` with 2 plural forms.
	function transformPhrase(phrase, substitutions, locale) {
	  if (typeof phrase !== 'string') {
	    throw new TypeError('Polyglot.transformPhrase expects argument #1 to be string');
	  }

	  if (substitutions == null) {
	    return phrase;
	  }

	  var result = phrase;

	  // allow number as a pluralization shortcut
	  var options = typeof substitutions === 'number' ? { smart_count: substitutions } : substitutions;

	  // Select plural form: based on a phrase text that contains `n`
	  // plural forms separated by `delimeter`, a `locale`, and a `substitutions.smart_count`,
	  // choose the correct plural form. This is only done if `count` is set.
	  if (options.smart_count != null && result) {
	    var texts = split.call(result, delimeter);
	    result = trim(texts[pluralTypeIndex(locale || 'en', options.smart_count)] || texts[0]);
	  }

	  // Interpolate: Creates a `RegExp` object for each interpolation placeholder.
	  result = replace.call(result, tokenRegex, function (expression, argument) {
	    if (!has(options, argument) || options[argument] == null) { return expression; }
	    // Ensure replacement value is escaped to prevent special $-prefixed regex replace tokens.
	    return replace.call(options[argument], dollarRegex, dollarBillsYall);
	  });

	  return result;
	}

	// ### Polyglot class constructor
	function Polyglot(options) {
	  var opts = options || {};
	  this.phrases = {};
	  this.extend(opts.phrases || {});
	  this.currentLocale = opts.locale || 'en';
	  var allowMissing = opts.allowMissing ? transformPhrase : null;
	  this.onMissingKey = typeof opts.onMissingKey === 'function' ? opts.onMissingKey : allowMissing;
	  this.warn = opts.warn || warn;
	}

	// ### polyglot.locale([locale])
	//
	// Get or set locale. Internally, Polyglot only uses locale for pluralization.
	Polyglot.prototype.locale = function (newLocale) {
	  if (newLocale) this.currentLocale = newLocale;
	  return this.currentLocale;
	};

	// ### polyglot.extend(phrases)
	//
	// Use `extend` to tell Polyglot how to translate a given key.
	//
	//     polyglot.extend({
	//       "hello": "Hello",
	//       "hello_name": "Hello, %{name}"
	//     });
	//
	// The key can be any string.  Feel free to call `extend` multiple times;
	// it will override any phrases with the same key, but leave existing phrases
	// untouched.
	//
	// It is also possible to pass nested phrase objects, which get flattened
	// into an object with the nested keys concatenated using dot notation.
	//
	//     polyglot.extend({
	//       "nav": {
	//         "hello": "Hello",
	//         "hello_name": "Hello, %{name}",
	//         "sidebar": {
	//           "welcome": "Welcome"
	//         }
	//       }
	//     });
	//
	//     console.log(polyglot.phrases);
	//     // {
	//     //   'nav.hello': 'Hello',
	//     //   'nav.hello_name': 'Hello, %{name}',
	//     //   'nav.sidebar.welcome': 'Welcome'
	//     // }
	//
	// `extend` accepts an optional second argument, `prefix`, which can be used
	// to prefix every key in the phrases object with some string, using dot
	// notation.
	//
	//     polyglot.extend({
	//       "hello": "Hello",
	//       "hello_name": "Hello, %{name}"
	//     }, "nav");
	//
	//     console.log(polyglot.phrases);
	//     // {
	//     //   'nav.hello': 'Hello',
	//     //   'nav.hello_name': 'Hello, %{name}'
	//     // }
	//
	// This feature is used internally to support nested phrase objects.
	Polyglot.prototype.extend = function (morePhrases, prefix) {
	  forEach(morePhrases, function (phrase, key) {
	    var prefixedKey = prefix ? prefix + '.' + key : key;
	    if (typeof phrase === 'object') {
	      this.extend(phrase, prefixedKey);
	    } else {
	      this.phrases[prefixedKey] = phrase;
	    }
	  }, this);
	};

	// ### polyglot.unset(phrases)
	// Use `unset` to selectively remove keys from a polyglot instance.
	//
	//     polyglot.unset("some_key");
	//     polyglot.unset({
	//       "hello": "Hello",
	//       "hello_name": "Hello, %{name}"
	//     });
	//
	// The unset method can take either a string (for the key), or an object hash with
	// the keys that you would like to unset.
	Polyglot.prototype.unset = function (morePhrases, prefix) {
	  if (typeof morePhrases === 'string') {
	    delete this.phrases[morePhrases];
	  } else {
	    forEach(morePhrases, function (phrase, key) {
	      var prefixedKey = prefix ? prefix + '.' + key : key;
	      if (typeof phrase === 'object') {
	        this.unset(phrase, prefixedKey);
	      } else {
	        delete this.phrases[prefixedKey];
	      }
	    }, this);
	  }
	};

	// ### polyglot.clear()
	//
	// Clears all phrases. Useful for special cases, such as freeing
	// up memory if you have lots of phrases but no longer need to
	// perform any translation. Also used internally by `replace`.
	Polyglot.prototype.clear = function () {
	  this.phrases = {};
	};

	// ### polyglot.replace(phrases)
	//
	// Completely replace the existing phrases with a new set of phrases.
	// Normally, just use `extend` to add more phrases, but under certain
	// circumstances, you may want to make sure no old phrases are lying around.
	Polyglot.prototype.replace = function (newPhrases) {
	  this.clear();
	  this.extend(newPhrases);
	};


	// ### polyglot.t(key, options)
	//
	// The most-used method. Provide a key, and `t` will return the
	// phrase.
	//
	//     polyglot.t("hello");
	//     => "Hello"
	//
	// The phrase value is provided first by a call to `polyglot.extend()` or
	// `polyglot.replace()`.
	//
	// Pass in an object as the second argument to perform interpolation.
	//
	//     polyglot.t("hello_name", {name: "Spike"});
	//     => "Hello, Spike"
	//
	// If you like, you can provide a default value in case the phrase is missing.
	// Use the special option key "_" to specify a default.
	//
	//     polyglot.t("i_like_to_write_in_language", {
	//       _: "I like to write in %{language}.",
	//       language: "JavaScript"
	//     });
	//     => "I like to write in JavaScript."
	//
	Polyglot.prototype.t = function (key, options) {
	  var phrase, result;
	  var opts = options == null ? {} : options;
	  if (typeof this.phrases[key] === 'string') {
	    phrase = this.phrases[key];
	  } else if (typeof opts._ === 'string') {
	    phrase = opts._;
	  } else if (this.onMissingKey) {
	    var onMissingKey = this.onMissingKey;
	    result = onMissingKey(key, opts, this.currentLocale);
	  } else {
	    this.warn('Missing translation for key: "' + key + '"');
	    result = key;
	  }
	  if (typeof phrase === 'string') {
	    result = transformPhrase(phrase, opts, this.currentLocale);
	  }
	  return result;
	};


	// ### polyglot.has(key)
	//
	// Check if polyglot has a translation for given key
	Polyglot.prototype.has = function (key) {
	  return has(this.phrases, key);
	};

	// export transformPhrase
	Polyglot.transformPhrase = transformPhrase;

	module.exports = Polyglot;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var isCallable = __webpack_require__(11);

	var toStr = Object.prototype.toString;
	var hasOwnProperty = Object.prototype.hasOwnProperty;

	var forEachArray = function forEachArray(array, iterator, receiver) {
	    for (var i = 0, len = array.length; i < len; i++) {
	        if (hasOwnProperty.call(array, i)) {
	            if (receiver == null) {
	                iterator(array[i], i, array);
	            } else {
	                iterator.call(receiver, array[i], i, array);
	            }
	        }
	    }
	};

	var forEachString = function forEachString(string, iterator, receiver) {
	    for (var i = 0, len = string.length; i < len; i++) {
	        // no such thing as a sparse string.
	        if (receiver == null) {
	            iterator(string.charAt(i), i, string);
	        } else {
	            iterator.call(receiver, string.charAt(i), i, string);
	        }
	    }
	};

	var forEachObject = function forEachObject(object, iterator, receiver) {
	    for (var k in object) {
	        if (hasOwnProperty.call(object, k)) {
	            if (receiver == null) {
	                iterator(object[k], k, object);
	            } else {
	                iterator.call(receiver, object[k], k, object);
	            }
	        }
	    }
	};

	var forEach = function forEach(list, iterator, thisArg) {
	    if (!isCallable(iterator)) {
	        throw new TypeError('iterator must be a function');
	    }

	    var receiver;
	    if (arguments.length >= 3) {
	        receiver = thisArg;
	    }

	    if (toStr.call(list) === '[object Array]') {
	        forEachArray(list, iterator, receiver);
	    } else if (typeof list === 'string') {
	        forEachString(list, iterator, receiver);
	    } else {
	        forEachObject(list, iterator, receiver);
	    }
	};

	module.exports = forEach;


/***/ }),
/* 11 */
/***/ (function(module, exports) {

	'use strict';

	var fnToStr = Function.prototype.toString;
	var reflectApply = typeof Reflect === 'object' && Reflect !== null && Reflect.apply;
	var badArrayLike;
	var isCallableMarker;
	if (typeof reflectApply === 'function' && typeof Object.defineProperty === 'function') {
		try {
			badArrayLike = Object.defineProperty({}, 'length', {
				get: function () {
					throw isCallableMarker;
				}
			});
			isCallableMarker = {};
			// eslint-disable-next-line no-throw-literal
			reflectApply(function () { throw 42; }, null, badArrayLike);
		} catch (_) {
			if (_ !== isCallableMarker) {
				reflectApply = null;
			}
		}
	} else {
		reflectApply = null;
	}

	var constructorRegex = /^\s*class\b/;
	var isES6ClassFn = function isES6ClassFunction(value) {
		try {
			var fnStr = fnToStr.call(value);
			return constructorRegex.test(fnStr);
		} catch (e) {
			return false; // not a function
		}
	};

	var tryFunctionObject = function tryFunctionToStr(value) {
		try {
			if (isES6ClassFn(value)) { return false; }
			fnToStr.call(value);
			return true;
		} catch (e) {
			return false;
		}
	};
	var toStr = Object.prototype.toString;
	var fnClass = '[object Function]';
	var genClass = '[object GeneratorFunction]';
	var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';
	/* globals document: false */
	var documentDotAll = typeof document === 'object' && typeof document.all === 'undefined' && document.all !== undefined ? document.all : {};

	module.exports = reflectApply
		? function isCallable(value) {
			if (value === documentDotAll) { return true; }
			if (!value) { return false; }
			if (typeof value !== 'function' && typeof value !== 'object') { return false; }
			if (typeof value === 'function' && !value.prototype) { return true; }
			try {
				reflectApply(value, null, badArrayLike);
			} catch (e) {
				if (e !== isCallableMarker) { return false; }
			}
			return !isES6ClassFn(value);
		}
		: function isCallable(value) {
			if (value === documentDotAll) { return true; }
			if (!value) { return false; }
			if (typeof value !== 'function' && typeof value !== 'object') { return false; }
			if (typeof value === 'function' && !value.prototype) { return true; }
			if (hasToStringTag) { return tryFunctionObject(value); }
			if (isES6ClassFn(value)) { return false; }
			var strClass = toStr.call(value);
			return strClass === fnClass || strClass === genClass;
		};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var warning = function() {};

	if (process.env.NODE_ENV !== 'production') {
	  warning = function(condition, format, args) {
	    var len = arguments.length;
	    args = new Array(len > 2 ? len - 2 : 0);
	    for (var key = 2; key < len; key++) {
	      args[key - 2] = arguments[key];
	    }
	    if (format === undefined) {
	      throw new Error(
	        '`warning(condition, format, ...args)` requires a warning ' +
	        'message argument'
	      );
	    }

	    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
	      throw new Error(
	        'The warning format should be able to uniquely identify this ' +
	        'warning. Please, use a more descriptive format than: ' + format
	      );
	    }

	    if (!condition) {
	      var argIndex = 0;
	      var message = 'Warning: ' +
	        format.replace(/%s/g, function() {
	          return args[argIndex++];
	        });
	      if (typeof console !== 'undefined') {
	        console.error(message);
	      }
	      try {
	        // This error was thrown as a convenience so that you can use this stack
	        // to find the callsite that caused this warning to fire.
	        throw new Error(message);
	      } catch(x) {}
	    }
	  };
	}

	module.exports = warning;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)))

/***/ }),
/* 13 */
/***/ (function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;

	process.listeners = function (name) { return [] }

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var bind = __webpack_require__(15);

	module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var implementation = __webpack_require__(16);

	module.exports = Function.prototype.bind || implementation;


/***/ }),
/* 16 */
/***/ (function(module, exports) {

	'use strict';

	/* eslint no-invalid-this: 1 */

	var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
	var slice = Array.prototype.slice;
	var toStr = Object.prototype.toString;
	var funcType = '[object Function]';

	module.exports = function bind(that) {
	    var target = this;
	    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
	        throw new TypeError(ERROR_MESSAGE + target);
	    }
	    var args = slice.call(arguments, 1);

	    var bound;
	    var binder = function () {
	        if (this instanceof bound) {
	            var result = target.apply(
	                this,
	                args.concat(slice.call(arguments))
	            );
	            if (Object(result) === result) {
	                return result;
	            }
	            return this;
	        } else {
	            return target.apply(
	                that,
	                args.concat(slice.call(arguments))
	            );
	        }
	    };

	    var boundLength = Math.max(0, target.length - args.length);
	    var boundArgs = [];
	    for (var i = 0; i < boundLength; i++) {
	        boundArgs.push('$' + i);
	    }

	    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

	    if (target.prototype) {
	        var Empty = function Empty() {};
	        Empty.prototype = target.prototype;
	        bound.prototype = new Empty();
	        Empty.prototype = null;
	    }

	    return bound;
	};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var callBind = __webpack_require__(18);
	var define = __webpack_require__(22);

	var implementation = __webpack_require__(26);
	var getPolyfill = __webpack_require__(31);
	var shim = __webpack_require__(32);

	var boundTrim = callBind(getPolyfill());

	define(boundTrim, {
		getPolyfill: getPolyfill,
		implementation: implementation,
		shim: shim
	});

	module.exports = boundTrim;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var bind = __webpack_require__(15);
	var GetIntrinsic = __webpack_require__(19);

	var $apply = GetIntrinsic('%Function.prototype.apply%');
	var $call = GetIntrinsic('%Function.prototype.call%');
	var $reflectApply = GetIntrinsic('%Reflect.apply%', true) || bind.call($call, $apply);

	var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%', true);
	var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);
	var $max = GetIntrinsic('%Math.max%');

	if ($defineProperty) {
		try {
			$defineProperty({}, 'a', { value: 1 });
		} catch (e) {
			// IE 8 has a broken defineProperty
			$defineProperty = null;
		}
	}

	module.exports = function callBind(originalFunction) {
		var func = $reflectApply(bind, $call, arguments);
		if ($gOPD && $defineProperty) {
			var desc = $gOPD(func, 'length');
			if (desc.configurable) {
				// original length, plus the receiver, minus any additional arguments (after the receiver)
				$defineProperty(
					func,
					'length',
					{ value: 1 + $max(0, originalFunction.length - (arguments.length - 1)) }
				);
			}
		}
		return func;
	};

	var applyBind = function applyBind() {
		return $reflectApply(bind, $apply, arguments);
	};

	if ($defineProperty) {
		$defineProperty(module.exports, 'apply', { value: applyBind });
	} else {
		module.exports.apply = applyBind;
	}


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var undefined;

	var $SyntaxError = SyntaxError;
	var $Function = Function;
	var $TypeError = TypeError;

	// eslint-disable-next-line consistent-return
	var getEvalledConstructor = function (expressionSyntax) {
		try {
			return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
		} catch (e) {}
	};

	var $gOPD = Object.getOwnPropertyDescriptor;
	if ($gOPD) {
		try {
			$gOPD({}, '');
		} catch (e) {
			$gOPD = null; // this is IE 8, which has a broken gOPD
		}
	}

	var throwTypeError = function () {
		throw new $TypeError();
	};
	var ThrowTypeError = $gOPD
		? (function () {
			try {
				// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
				arguments.callee; // IE 8 does not throw here
				return throwTypeError;
			} catch (calleeThrows) {
				try {
					// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
					return $gOPD(arguments, 'callee').get;
				} catch (gOPDthrows) {
					return throwTypeError;
				}
			}
		}())
		: throwTypeError;

	var hasSymbols = __webpack_require__(20)();

	var getProto = Object.getPrototypeOf || function (x) { return x.__proto__; }; // eslint-disable-line no-proto

	var needsEval = {};

	var TypedArray = typeof Uint8Array === 'undefined' ? undefined : getProto(Uint8Array);

	var INTRINSICS = {
		'%AggregateError%': typeof AggregateError === 'undefined' ? undefined : AggregateError,
		'%Array%': Array,
		'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
		'%ArrayIteratorPrototype%': hasSymbols ? getProto([][Symbol.iterator]()) : undefined,
		'%AsyncFromSyncIteratorPrototype%': undefined,
		'%AsyncFunction%': needsEval,
		'%AsyncGenerator%': needsEval,
		'%AsyncGeneratorFunction%': needsEval,
		'%AsyncIteratorPrototype%': needsEval,
		'%Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
		'%BigInt%': typeof BigInt === 'undefined' ? undefined : BigInt,
		'%Boolean%': Boolean,
		'%DataView%': typeof DataView === 'undefined' ? undefined : DataView,
		'%Date%': Date,
		'%decodeURI%': decodeURI,
		'%decodeURIComponent%': decodeURIComponent,
		'%encodeURI%': encodeURI,
		'%encodeURIComponent%': encodeURIComponent,
		'%Error%': Error,
		'%eval%': eval, // eslint-disable-line no-eval
		'%EvalError%': EvalError,
		'%Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,
		'%Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,
		'%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined : FinalizationRegistry,
		'%Function%': $Function,
		'%GeneratorFunction%': needsEval,
		'%Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,
		'%Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,
		'%Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,
		'%isFinite%': isFinite,
		'%isNaN%': isNaN,
		'%IteratorPrototype%': hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined,
		'%JSON%': typeof JSON === 'object' ? JSON : undefined,
		'%Map%': typeof Map === 'undefined' ? undefined : Map,
		'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols ? undefined : getProto(new Map()[Symbol.iterator]()),
		'%Math%': Math,
		'%Number%': Number,
		'%Object%': Object,
		'%parseFloat%': parseFloat,
		'%parseInt%': parseInt,
		'%Promise%': typeof Promise === 'undefined' ? undefined : Promise,
		'%Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
		'%RangeError%': RangeError,
		'%ReferenceError%': ReferenceError,
		'%Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
		'%RegExp%': RegExp,
		'%Set%': typeof Set === 'undefined' ? undefined : Set,
		'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols ? undefined : getProto(new Set()[Symbol.iterator]()),
		'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,
		'%String%': String,
		'%StringIteratorPrototype%': hasSymbols ? getProto(''[Symbol.iterator]()) : undefined,
		'%Symbol%': hasSymbols ? Symbol : undefined,
		'%SyntaxError%': $SyntaxError,
		'%ThrowTypeError%': ThrowTypeError,
		'%TypedArray%': TypedArray,
		'%TypeError%': $TypeError,
		'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
		'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,
		'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
		'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
		'%URIError%': URIError,
		'%WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
		'%WeakRef%': typeof WeakRef === 'undefined' ? undefined : WeakRef,
		'%WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet
	};

	var doEval = function doEval(name) {
		var value;
		if (name === '%AsyncFunction%') {
			value = getEvalledConstructor('async function () {}');
		} else if (name === '%GeneratorFunction%') {
			value = getEvalledConstructor('function* () {}');
		} else if (name === '%AsyncGeneratorFunction%') {
			value = getEvalledConstructor('async function* () {}');
		} else if (name === '%AsyncGenerator%') {
			var fn = doEval('%AsyncGeneratorFunction%');
			if (fn) {
				value = fn.prototype;
			}
		} else if (name === '%AsyncIteratorPrototype%') {
			var gen = doEval('%AsyncGenerator%');
			if (gen) {
				value = getProto(gen.prototype);
			}
		}

		INTRINSICS[name] = value;

		return value;
	};

	var LEGACY_ALIASES = {
		'%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
		'%ArrayPrototype%': ['Array', 'prototype'],
		'%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
		'%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
		'%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
		'%ArrayProto_values%': ['Array', 'prototype', 'values'],
		'%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
		'%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
		'%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
		'%BooleanPrototype%': ['Boolean', 'prototype'],
		'%DataViewPrototype%': ['DataView', 'prototype'],
		'%DatePrototype%': ['Date', 'prototype'],
		'%ErrorPrototype%': ['Error', 'prototype'],
		'%EvalErrorPrototype%': ['EvalError', 'prototype'],
		'%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
		'%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
		'%FunctionPrototype%': ['Function', 'prototype'],
		'%Generator%': ['GeneratorFunction', 'prototype'],
		'%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
		'%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
		'%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
		'%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
		'%JSONParse%': ['JSON', 'parse'],
		'%JSONStringify%': ['JSON', 'stringify'],
		'%MapPrototype%': ['Map', 'prototype'],
		'%NumberPrototype%': ['Number', 'prototype'],
		'%ObjectPrototype%': ['Object', 'prototype'],
		'%ObjProto_toString%': ['Object', 'prototype', 'toString'],
		'%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
		'%PromisePrototype%': ['Promise', 'prototype'],
		'%PromiseProto_then%': ['Promise', 'prototype', 'then'],
		'%Promise_all%': ['Promise', 'all'],
		'%Promise_reject%': ['Promise', 'reject'],
		'%Promise_resolve%': ['Promise', 'resolve'],
		'%RangeErrorPrototype%': ['RangeError', 'prototype'],
		'%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
		'%RegExpPrototype%': ['RegExp', 'prototype'],
		'%SetPrototype%': ['Set', 'prototype'],
		'%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
		'%StringPrototype%': ['String', 'prototype'],
		'%SymbolPrototype%': ['Symbol', 'prototype'],
		'%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
		'%TypedArrayPrototype%': ['TypedArray', 'prototype'],
		'%TypeErrorPrototype%': ['TypeError', 'prototype'],
		'%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
		'%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
		'%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
		'%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
		'%URIErrorPrototype%': ['URIError', 'prototype'],
		'%WeakMapPrototype%': ['WeakMap', 'prototype'],
		'%WeakSetPrototype%': ['WeakSet', 'prototype']
	};

	var bind = __webpack_require__(15);
	var hasOwn = __webpack_require__(14);
	var $concat = bind.call(Function.call, Array.prototype.concat);
	var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
	var $replace = bind.call(Function.call, String.prototype.replace);
	var $strSlice = bind.call(Function.call, String.prototype.slice);

	/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
	var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
	var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
	var stringToPath = function stringToPath(string) {
		var first = $strSlice(string, 0, 1);
		var last = $strSlice(string, -1);
		if (first === '%' && last !== '%') {
			throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`');
		} else if (last === '%' && first !== '%') {
			throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`');
		}
		var result = [];
		$replace(string, rePropName, function (match, number, quote, subString) {
			result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : number || match;
		});
		return result;
	};
	/* end adaptation */

	var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
		var intrinsicName = name;
		var alias;
		if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
			alias = LEGACY_ALIASES[intrinsicName];
			intrinsicName = '%' + alias[0] + '%';
		}

		if (hasOwn(INTRINSICS, intrinsicName)) {
			var value = INTRINSICS[intrinsicName];
			if (value === needsEval) {
				value = doEval(intrinsicName);
			}
			if (typeof value === 'undefined' && !allowMissing) {
				throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
			}

			return {
				alias: alias,
				name: intrinsicName,
				value: value
			};
		}

		throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
	};

	module.exports = function GetIntrinsic(name, allowMissing) {
		if (typeof name !== 'string' || name.length === 0) {
			throw new $TypeError('intrinsic name must be a non-empty string');
		}
		if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
			throw new $TypeError('"allowMissing" argument must be a boolean');
		}

		var parts = stringToPath(name);
		var intrinsicBaseName = parts.length > 0 ? parts[0] : '';

		var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
		var intrinsicRealName = intrinsic.name;
		var value = intrinsic.value;
		var skipFurtherCaching = false;

		var alias = intrinsic.alias;
		if (alias) {
			intrinsicBaseName = alias[0];
			$spliceApply(parts, $concat([0, 1], alias));
		}

		for (var i = 1, isOwn = true; i < parts.length; i += 1) {
			var part = parts[i];
			var first = $strSlice(part, 0, 1);
			var last = $strSlice(part, -1);
			if (
				(
					(first === '"' || first === "'" || first === '`')
					|| (last === '"' || last === "'" || last === '`')
				)
				&& first !== last
			) {
				throw new $SyntaxError('property names with quotes must have matching quotes');
			}
			if (part === 'constructor' || !isOwn) {
				skipFurtherCaching = true;
			}

			intrinsicBaseName += '.' + part;
			intrinsicRealName = '%' + intrinsicBaseName + '%';

			if (hasOwn(INTRINSICS, intrinsicRealName)) {
				value = INTRINSICS[intrinsicRealName];
			} else if (value != null) {
				if (!(part in value)) {
					if (!allowMissing) {
						throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
					}
					return void undefined;
				}
				if ($gOPD && (i + 1) >= parts.length) {
					var desc = $gOPD(value, part);
					isOwn = !!desc;

					// By convention, when a data property is converted to an accessor
					// property to emulate a data property that does not suffer from
					// the override mistake, that accessor's getter is marked with
					// an `originalValue` property. Here, when we detect this, we
					// uphold the illusion by pretending to see that original data
					// property, i.e., returning the value rather than the getter
					// itself.
					if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
						value = desc.get;
					} else {
						value = value[part];
					}
				} else {
					isOwn = hasOwn(value, part);
					value = value[part];
				}

				if (isOwn && !skipFurtherCaching) {
					INTRINSICS[intrinsicRealName] = value;
				}
			}
		}
		return value;
	};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var origSymbol = typeof Symbol !== 'undefined' && Symbol;
	var hasSymbolSham = __webpack_require__(21);

	module.exports = function hasNativeSymbols() {
		if (typeof origSymbol !== 'function') { return false; }
		if (typeof Symbol !== 'function') { return false; }
		if (typeof origSymbol('foo') !== 'symbol') { return false; }
		if (typeof Symbol('bar') !== 'symbol') { return false; }

		return hasSymbolSham();
	};


/***/ }),
/* 21 */
/***/ (function(module, exports) {

	'use strict';

	/* eslint complexity: [2, 18], max-statements: [2, 33] */
	module.exports = function hasSymbols() {
		if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
		if (typeof Symbol.iterator === 'symbol') { return true; }

		var obj = {};
		var sym = Symbol('test');
		var symObj = Object(sym);
		if (typeof sym === 'string') { return false; }

		if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
		if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

		// temp disabled per https://github.com/ljharb/object.assign/issues/17
		// if (sym instanceof Symbol) { return false; }
		// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
		// if (!(symObj instanceof Symbol)) { return false; }

		// if (typeof Symbol.prototype.toString !== 'function') { return false; }
		// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

		var symVal = 42;
		obj[sym] = symVal;
		for (sym in obj) { return false; } // eslint-disable-line no-restricted-syntax, no-unreachable-loop
		if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

		if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

		var syms = Object.getOwnPropertySymbols(obj);
		if (syms.length !== 1 || syms[0] !== sym) { return false; }

		if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

		if (typeof Object.getOwnPropertyDescriptor === 'function') {
			var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
			if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
		}

		return true;
	};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var keys = __webpack_require__(23);
	var hasSymbols = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';

	var toStr = Object.prototype.toString;
	var concat = Array.prototype.concat;
	var origDefineProperty = Object.defineProperty;

	var isFunction = function (fn) {
		return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
	};

	var arePropertyDescriptorsSupported = function () {
		var obj = {};
		try {
			origDefineProperty(obj, 'x', { enumerable: false, value: obj });
			// eslint-disable-next-line no-unused-vars, no-restricted-syntax
			for (var _ in obj) { // jscs:ignore disallowUnusedVariables
				return false;
			}
			return obj.x === obj;
		} catch (e) { /* this is IE 8. */
			return false;
		}
	};
	var supportsDescriptors = origDefineProperty && arePropertyDescriptorsSupported();

	var defineProperty = function (object, name, value, predicate) {
		if (name in object && (!isFunction(predicate) || !predicate())) {
			return;
		}
		if (supportsDescriptors) {
			origDefineProperty(object, name, {
				configurable: true,
				enumerable: false,
				value: value,
				writable: true
			});
		} else {
			object[name] = value;
		}
	};

	var defineProperties = function (object, map) {
		var predicates = arguments.length > 2 ? arguments[2] : {};
		var props = keys(map);
		if (hasSymbols) {
			props = concat.call(props, Object.getOwnPropertySymbols(map));
		}
		for (var i = 0; i < props.length; i += 1) {
			defineProperty(object, props[i], map[props[i]], predicates[props[i]]);
		}
	};

	defineProperties.supportsDescriptors = !!supportsDescriptors;

	module.exports = defineProperties;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var slice = Array.prototype.slice;
	var isArgs = __webpack_require__(24);

	var origKeys = Object.keys;
	var keysShim = origKeys ? function keys(o) { return origKeys(o); } : __webpack_require__(25);

	var originalKeys = Object.keys;

	keysShim.shim = function shimObjectKeys() {
		if (Object.keys) {
			var keysWorksWithArguments = (function () {
				// Safari 5.0 bug
				var args = Object.keys(arguments);
				return args && args.length === arguments.length;
			}(1, 2));
			if (!keysWorksWithArguments) {
				Object.keys = function keys(object) { // eslint-disable-line func-name-matching
					if (isArgs(object)) {
						return originalKeys(slice.call(object));
					}
					return originalKeys(object);
				};
			}
		} else {
			Object.keys = keysShim;
		}
		return Object.keys || keysShim;
	};

	module.exports = keysShim;


/***/ }),
/* 24 */
/***/ (function(module, exports) {

	'use strict';

	var toStr = Object.prototype.toString;

	module.exports = function isArguments(value) {
		var str = toStr.call(value);
		var isArgs = str === '[object Arguments]';
		if (!isArgs) {
			isArgs = str !== '[object Array]' &&
				value !== null &&
				typeof value === 'object' &&
				typeof value.length === 'number' &&
				value.length >= 0 &&
				toStr.call(value.callee) === '[object Function]';
		}
		return isArgs;
	};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var keysShim;
	if (!Object.keys) {
		// modified from https://github.com/es-shims/es5-shim
		var has = Object.prototype.hasOwnProperty;
		var toStr = Object.prototype.toString;
		var isArgs = __webpack_require__(24); // eslint-disable-line global-require
		var isEnumerable = Object.prototype.propertyIsEnumerable;
		var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
		var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
		var dontEnums = [
			'toString',
			'toLocaleString',
			'valueOf',
			'hasOwnProperty',
			'isPrototypeOf',
			'propertyIsEnumerable',
			'constructor'
		];
		var equalsConstructorPrototype = function (o) {
			var ctor = o.constructor;
			return ctor && ctor.prototype === o;
		};
		var excludedKeys = {
			$applicationCache: true,
			$console: true,
			$external: true,
			$frame: true,
			$frameElement: true,
			$frames: true,
			$innerHeight: true,
			$innerWidth: true,
			$onmozfullscreenchange: true,
			$onmozfullscreenerror: true,
			$outerHeight: true,
			$outerWidth: true,
			$pageXOffset: true,
			$pageYOffset: true,
			$parent: true,
			$scrollLeft: true,
			$scrollTop: true,
			$scrollX: true,
			$scrollY: true,
			$self: true,
			$webkitIndexedDB: true,
			$webkitStorageInfo: true,
			$window: true
		};
		var hasAutomationEqualityBug = (function () {
			/* global window */
			if (typeof window === 'undefined') { return false; }
			for (var k in window) {
				try {
					if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
						try {
							equalsConstructorPrototype(window[k]);
						} catch (e) {
							return true;
						}
					}
				} catch (e) {
					return true;
				}
			}
			return false;
		}());
		var equalsConstructorPrototypeIfNotBuggy = function (o) {
			/* global window */
			if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
				return equalsConstructorPrototype(o);
			}
			try {
				return equalsConstructorPrototype(o);
			} catch (e) {
				return false;
			}
		};

		keysShim = function keys(object) {
			var isObject = object !== null && typeof object === 'object';
			var isFunction = toStr.call(object) === '[object Function]';
			var isArguments = isArgs(object);
			var isString = isObject && toStr.call(object) === '[object String]';
			var theKeys = [];

			if (!isObject && !isFunction && !isArguments) {
				throw new TypeError('Object.keys called on a non-object');
			}

			var skipProto = hasProtoEnumBug && isFunction;
			if (isString && object.length > 0 && !has.call(object, 0)) {
				for (var i = 0; i < object.length; ++i) {
					theKeys.push(String(i));
				}
			}

			if (isArguments && object.length > 0) {
				for (var j = 0; j < object.length; ++j) {
					theKeys.push(String(j));
				}
			} else {
				for (var name in object) {
					if (!(skipProto && name === 'prototype') && has.call(object, name)) {
						theKeys.push(String(name));
					}
				}
			}

			if (hasDontEnumBug) {
				var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

				for (var k = 0; k < dontEnums.length; ++k) {
					if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
						theKeys.push(dontEnums[k]);
					}
				}
			}
			return theKeys;
		};
	}
	module.exports = keysShim;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var RequireObjectCoercible = __webpack_require__(27);
	var ToString = __webpack_require__(29);
	var callBound = __webpack_require__(30);
	var $replace = callBound('String.prototype.replace');

	/* eslint-disable no-control-regex */
	var leftWhitespace = /^[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+/;
	var rightWhitespace = /[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+$/;
	/* eslint-enable no-control-regex */

	module.exports = function trim() {
		var S = ToString(RequireObjectCoercible(this));
		return $replace($replace(S, leftWhitespace, ''), rightWhitespace, '');
	};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(28);


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var GetIntrinsic = __webpack_require__(19);

	var $TypeError = GetIntrinsic('%TypeError%');

	// http://262.ecma-international.org/5.1/#sec-9.10

	module.exports = function CheckObjectCoercible(value, optMessage) {
		if (value == null) {
			throw new $TypeError(optMessage || ('Cannot call method on ' + value));
		}
		return value;
	};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var GetIntrinsic = __webpack_require__(19);

	var $String = GetIntrinsic('%String%');
	var $TypeError = GetIntrinsic('%TypeError%');

	// https://ecma-international.org/ecma-262/6.0/#sec-tostring

	module.exports = function ToString(argument) {
		if (typeof argument === 'symbol') {
			throw new $TypeError('Cannot convert a Symbol value to a string');
		}
		return $String(argument);
	};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var GetIntrinsic = __webpack_require__(19);

	var callBind = __webpack_require__(18);

	var $indexOf = callBind(GetIntrinsic('String.prototype.indexOf'));

	module.exports = function callBoundIntrinsic(name, allowMissing) {
		var intrinsic = GetIntrinsic(name, !!allowMissing);
		if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
			return callBind(intrinsic);
		}
		return intrinsic;
	};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var implementation = __webpack_require__(26);

	var zeroWidthSpace = '\u200b';

	module.exports = function getPolyfill() {
		if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
			return String.prototype.trim;
		}
		return implementation;
	};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var define = __webpack_require__(22);
	var getPolyfill = __webpack_require__(31);

	module.exports = function shimStringTrim() {
		var polyfill = getPolyfill();
		define(String.prototype, { trim: polyfill }, {
			trim: function testTrim() {
				return String.prototype.trim !== polyfill;
			}
		});
		return polyfill;
	};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(34);

	/**
	 * Gets the value at `path` of `object`. If the resolved value is
	 * `undefined`, the `defaultValue` is returned in its place.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.7.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
	 * @returns {*} Returns the resolved value.
	 * @example
	 *
	 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
	 *
	 * _.get(object, 'a[0].b.c');
	 * // => 3
	 *
	 * _.get(object, ['a', '0', 'b', 'c']);
	 * // => 3
	 *
	 * _.get(object, 'a.b.c', 'default');
	 * // => 'default'
	 */
	function get(object, path, defaultValue) {
	  var result = object == null ? undefined : baseGet(object, path);
	  return result === undefined ? defaultValue : result;
	}

	module.exports = get;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	var castPath = __webpack_require__(35),
	    toKey = __webpack_require__(84);

	/**
	 * The base implementation of `_.get` without support for default values.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @returns {*} Returns the resolved value.
	 */
	function baseGet(object, path) {
	  path = castPath(path, object);

	  var index = 0,
	      length = path.length;

	  while (object != null && index < length) {
	    object = object[toKey(path[index++])];
	  }
	  return (index && index == length) ? object : undefined;
	}

	module.exports = baseGet;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(36),
	    isKey = __webpack_require__(37),
	    stringToPath = __webpack_require__(46),
	    toString = __webpack_require__(81);

	/**
	 * Casts `value` to a path array if it's not one.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @param {Object} [object] The object to query keys on.
	 * @returns {Array} Returns the cast property path array.
	 */
	function castPath(value, object) {
	  if (isArray(value)) {
	    return value;
	  }
	  return isKey(value, object) ? [value] : stringToPath(toString(value));
	}

	module.exports = castPath;


/***/ }),
/* 36 */
/***/ (function(module, exports) {

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;

	module.exports = isArray;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(36),
	    isSymbol = __webpack_require__(38);

	/** Used to match property names within property paths. */
	var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
	    reIsPlainProp = /^\w*$/;

	/**
	 * Checks if `value` is a property name and not a property path.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {Object} [object] The object to query keys on.
	 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
	 */
	function isKey(value, object) {
	  if (isArray(value)) {
	    return false;
	  }
	  var type = typeof value;
	  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
	      value == null || isSymbol(value)) {
	    return true;
	  }
	  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
	    (object != null && value in Object(object));
	}

	module.exports = isKey;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(39),
	    isObjectLike = __webpack_require__(45);

	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && baseGetTag(value) == symbolTag);
	}

	module.exports = isSymbol;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(40),
	    getRawTag = __webpack_require__(43),
	    objectToString = __webpack_require__(44);

	/** `Object#toString` result references. */
	var nullTag = '[object Null]',
	    undefinedTag = '[object Undefined]';

	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

	/**
	 * The base implementation of `getTag` without fallbacks for buggy environments.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function baseGetTag(value) {
	  if (value == null) {
	    return value === undefined ? undefinedTag : nullTag;
	  }
	  return (symToStringTag && symToStringTag in Object(value))
	    ? getRawTag(value)
	    : objectToString(value);
	}

	module.exports = baseGetTag;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	var root = __webpack_require__(41);

	/** Built-in value references. */
	var Symbol = root.Symbol;

	module.exports = Symbol;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	var freeGlobal = __webpack_require__(42);

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	module.exports = root;


/***/ }),
/* 42 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

	module.exports = freeGlobal;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(40);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

	/**
	 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the raw `toStringTag`.
	 */
	function getRawTag(value) {
	  var isOwn = hasOwnProperty.call(value, symToStringTag),
	      tag = value[symToStringTag];

	  try {
	    value[symToStringTag] = undefined;
	    var unmasked = true;
	  } catch (e) {}

	  var result = nativeObjectToString.call(value);
	  if (unmasked) {
	    if (isOwn) {
	      value[symToStringTag] = tag;
	    } else {
	      delete value[symToStringTag];
	    }
	  }
	  return result;
	}

	module.exports = getRawTag;


/***/ }),
/* 44 */
/***/ (function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/**
	 * Converts `value` to a string using `Object.prototype.toString`.
	 *
	 * @private
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 */
	function objectToString(value) {
	  return nativeObjectToString.call(value);
	}

	module.exports = objectToString;


/***/ }),
/* 45 */
/***/ (function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return value != null && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	var memoizeCapped = __webpack_require__(47);

	/** Used to match property names within property paths. */
	var reLeadingDot = /^\./,
	    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

	/** Used to match backslashes in property paths. */
	var reEscapeChar = /\\(\\)?/g;

	/**
	 * Converts `string` to a property path array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the property path array.
	 */
	var stringToPath = memoizeCapped(function(string) {
	  var result = [];
	  if (reLeadingDot.test(string)) {
	    result.push('');
	  }
	  string.replace(rePropName, function(match, number, quote, string) {
	    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
	  });
	  return result;
	});

	module.exports = stringToPath;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

	var memoize = __webpack_require__(48);

	/** Used as the maximum memoize cache size. */
	var MAX_MEMOIZE_SIZE = 500;

	/**
	 * A specialized version of `_.memoize` which clears the memoized function's
	 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
	 *
	 * @private
	 * @param {Function} func The function to have its output memoized.
	 * @returns {Function} Returns the new memoized function.
	 */
	function memoizeCapped(func) {
	  var result = memoize(func, function(key) {
	    if (cache.size === MAX_MEMOIZE_SIZE) {
	      cache.clear();
	    }
	    return key;
	  });

	  var cache = result.cache;
	  return result;
	}

	module.exports = memoizeCapped;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(49);

	/** Error message constants. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/**
	 * Creates a function that memoizes the result of `func`. If `resolver` is
	 * provided, it determines the cache key for storing the result based on the
	 * arguments provided to the memoized function. By default, the first argument
	 * provided to the memoized function is used as the map cache key. The `func`
	 * is invoked with the `this` binding of the memoized function.
	 *
	 * **Note:** The cache is exposed as the `cache` property on the memoized
	 * function. Its creation may be customized by replacing the `_.memoize.Cache`
	 * constructor with one whose instances implement the
	 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
	 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to have its output memoized.
	 * @param {Function} [resolver] The function to resolve the cache key.
	 * @returns {Function} Returns the new memoized function.
	 * @example
	 *
	 * var object = { 'a': 1, 'b': 2 };
	 * var other = { 'c': 3, 'd': 4 };
	 *
	 * var values = _.memoize(_.values);
	 * values(object);
	 * // => [1, 2]
	 *
	 * values(other);
	 * // => [3, 4]
	 *
	 * object.a = 2;
	 * values(object);
	 * // => [1, 2]
	 *
	 * // Modify the result cache.
	 * values.cache.set(object, ['a', 'b']);
	 * values(object);
	 * // => ['a', 'b']
	 *
	 * // Replace `_.memoize.Cache`.
	 * _.memoize.Cache = WeakMap;
	 */
	function memoize(func, resolver) {
	  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  var memoized = function() {
	    var args = arguments,
	        key = resolver ? resolver.apply(this, args) : args[0],
	        cache = memoized.cache;

	    if (cache.has(key)) {
	      return cache.get(key);
	    }
	    var result = func.apply(this, args);
	    memoized.cache = cache.set(key, result) || cache;
	    return result;
	  };
	  memoized.cache = new (memoize.Cache || MapCache);
	  return memoized;
	}

	// Expose `MapCache`.
	memoize.Cache = MapCache;

	module.exports = memoize;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

	var mapCacheClear = __webpack_require__(50),
	    mapCacheDelete = __webpack_require__(75),
	    mapCacheGet = __webpack_require__(78),
	    mapCacheHas = __webpack_require__(79),
	    mapCacheSet = __webpack_require__(80);

	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function MapCache(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `MapCache`.
	MapCache.prototype.clear = mapCacheClear;
	MapCache.prototype['delete'] = mapCacheDelete;
	MapCache.prototype.get = mapCacheGet;
	MapCache.prototype.has = mapCacheHas;
	MapCache.prototype.set = mapCacheSet;

	module.exports = MapCache;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

	var Hash = __webpack_require__(51),
	    ListCache = __webpack_require__(66),
	    Map = __webpack_require__(74);

	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapCacheClear() {
	  this.size = 0;
	  this.__data__ = {
	    'hash': new Hash,
	    'map': new (Map || ListCache),
	    'string': new Hash
	  };
	}

	module.exports = mapCacheClear;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

	var hashClear = __webpack_require__(52),
	    hashDelete = __webpack_require__(62),
	    hashGet = __webpack_require__(63),
	    hashHas = __webpack_require__(64),
	    hashSet = __webpack_require__(65);

	/**
	 * Creates a hash object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Hash(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `Hash`.
	Hash.prototype.clear = hashClear;
	Hash.prototype['delete'] = hashDelete;
	Hash.prototype.get = hashGet;
	Hash.prototype.has = hashHas;
	Hash.prototype.set = hashSet;

	module.exports = Hash;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(53);

	/**
	 * Removes all key-value entries from the hash.
	 *
	 * @private
	 * @name clear
	 * @memberOf Hash
	 */
	function hashClear() {
	  this.__data__ = nativeCreate ? nativeCreate(null) : {};
	  this.size = 0;
	}

	module.exports = hashClear;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(54);

	/* Built-in method references that are verified to be native. */
	var nativeCreate = getNative(Object, 'create');

	module.exports = nativeCreate;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

	var baseIsNative = __webpack_require__(55),
	    getValue = __webpack_require__(61);

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = getValue(object, key);
	  return baseIsNative(value) ? value : undefined;
	}

	module.exports = getNative;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(56),
	    isMasked = __webpack_require__(58),
	    isObject = __webpack_require__(57),
	    toSource = __webpack_require__(60);

	/**
	 * Used to match `RegExp`
	 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
	 */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used for built-in method references. */
	var funcProto = Function.prototype,
	    objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/**
	 * The base implementation of `_.isNative` without bad shim checks.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function,
	 *  else `false`.
	 */
	function baseIsNative(value) {
	  if (!isObject(value) || isMasked(value)) {
	    return false;
	  }
	  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
	  return pattern.test(toSource(value));
	}

	module.exports = baseIsNative;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(39),
	    isObject = __webpack_require__(57);

	/** `Object#toString` result references. */
	var asyncTag = '[object AsyncFunction]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    proxyTag = '[object Proxy]';

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  if (!isObject(value)) {
	    return false;
	  }
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 9 which returns 'object' for typed arrays and other constructors.
	  var tag = baseGetTag(value);
	  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
	}

	module.exports = isFunction;


/***/ }),
/* 57 */
/***/ (function(module, exports) {

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return value != null && (type == 'object' || type == 'function');
	}

	module.exports = isObject;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

	var coreJsData = __webpack_require__(59);

	/** Used to detect methods masquerading as native. */
	var maskSrcKey = (function() {
	  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
	  return uid ? ('Symbol(src)_1.' + uid) : '';
	}());

	/**
	 * Checks if `func` has its source masked.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
	 */
	function isMasked(func) {
	  return !!maskSrcKey && (maskSrcKey in func);
	}

	module.exports = isMasked;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

	var root = __webpack_require__(41);

	/** Used to detect overreaching core-js shims. */
	var coreJsData = root['__core-js_shared__'];

	module.exports = coreJsData;


/***/ }),
/* 60 */
/***/ (function(module, exports) {

	/** Used for built-in method references. */
	var funcProto = Function.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to convert.
	 * @returns {string} Returns the source code.
	 */
	function toSource(func) {
	  if (func != null) {
	    try {
	      return funcToString.call(func);
	    } catch (e) {}
	    try {
	      return (func + '');
	    } catch (e) {}
	  }
	  return '';
	}

	module.exports = toSource;


/***/ }),
/* 61 */
/***/ (function(module, exports) {

	/**
	 * Gets the value at `key` of `object`.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */
	function getValue(object, key) {
	  return object == null ? undefined : object[key];
	}

	module.exports = getValue;


/***/ }),
/* 62 */
/***/ (function(module, exports) {

	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @name delete
	 * @memberOf Hash
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function hashDelete(key) {
	  var result = this.has(key) && delete this.__data__[key];
	  this.size -= result ? 1 : 0;
	  return result;
	}

	module.exports = hashDelete;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(53);

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Hash
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(key) {
	  var data = this.__data__;
	  if (nativeCreate) {
	    var result = data[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }
	  return hasOwnProperty.call(data, key) ? data[key] : undefined;
	}

	module.exports = hashGet;


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(53);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Hash
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(key) {
	  var data = this.__data__;
	  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
	}

	module.exports = hashHas;


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(53);

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Hash
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the hash instance.
	 */
	function hashSet(key, value) {
	  var data = this.__data__;
	  this.size += this.has(key) ? 0 : 1;
	  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
	  return this;
	}

	module.exports = hashSet;


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

	var listCacheClear = __webpack_require__(67),
	    listCacheDelete = __webpack_require__(68),
	    listCacheGet = __webpack_require__(71),
	    listCacheHas = __webpack_require__(72),
	    listCacheSet = __webpack_require__(73);

	/**
	 * Creates an list cache object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function ListCache(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `ListCache`.
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype['delete'] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;

	module.exports = ListCache;


/***/ }),
/* 67 */
/***/ (function(module, exports) {

	/**
	 * Removes all key-value entries from the list cache.
	 *
	 * @private
	 * @name clear
	 * @memberOf ListCache
	 */
	function listCacheClear() {
	  this.__data__ = [];
	  this.size = 0;
	}

	module.exports = listCacheClear;


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(69);

	/** Used for built-in method references. */
	var arrayProto = Array.prototype;

	/** Built-in value references. */
	var splice = arrayProto.splice;

	/**
	 * Removes `key` and its value from the list cache.
	 *
	 * @private
	 * @name delete
	 * @memberOf ListCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function listCacheDelete(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = data.length - 1;
	  if (index == lastIndex) {
	    data.pop();
	  } else {
	    splice.call(data, index, 1);
	  }
	  --this.size;
	  return true;
	}

	module.exports = listCacheDelete;


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(70);

	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}

	module.exports = assocIndexOf;


/***/ }),
/* 70 */
/***/ (function(module, exports) {

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}

	module.exports = eq;


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(69);

	/**
	 * Gets the list cache value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf ListCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function listCacheGet(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  return index < 0 ? undefined : data[index][1];
	}

	module.exports = listCacheGet;


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(69);

	/**
	 * Checks if a list cache value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf ListCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function listCacheHas(key) {
	  return assocIndexOf(this.__data__, key) > -1;
	}

	module.exports = listCacheHas;


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(69);

	/**
	 * Sets the list cache `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf ListCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the list cache instance.
	 */
	function listCacheSet(key, value) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    ++this.size;
	    data.push([key, value]);
	  } else {
	    data[index][1] = value;
	  }
	  return this;
	}

	module.exports = listCacheSet;


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(54),
	    root = __webpack_require__(41);

	/* Built-in method references that are verified to be native. */
	var Map = getNative(root, 'Map');

	module.exports = Map;


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(76);

	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapCacheDelete(key) {
	  var result = getMapData(this, key)['delete'](key);
	  this.size -= result ? 1 : 0;
	  return result;
	}

	module.exports = mapCacheDelete;


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

	var isKeyable = __webpack_require__(77);

	/**
	 * Gets the data for `map`.
	 *
	 * @private
	 * @param {Object} map The map to query.
	 * @param {string} key The reference key.
	 * @returns {*} Returns the map data.
	 */
	function getMapData(map, key) {
	  var data = map.__data__;
	  return isKeyable(key)
	    ? data[typeof key == 'string' ? 'string' : 'hash']
	    : data.map;
	}

	module.exports = getMapData;


/***/ }),
/* 77 */
/***/ (function(module, exports) {

	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
	  var type = typeof value;
	  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
	    ? (value !== '__proto__')
	    : (value === null);
	}

	module.exports = isKeyable;


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(76);

	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapCacheGet(key) {
	  return getMapData(this, key).get(key);
	}

	module.exports = mapCacheGet;


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(76);

	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapCacheHas(key) {
	  return getMapData(this, key).has(key);
	}

	module.exports = mapCacheHas;


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(76);

	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache instance.
	 */
	function mapCacheSet(key, value) {
	  var data = getMapData(this, key),
	      size = data.size;

	  data.set(key, value);
	  this.size += data.size == size ? 0 : 1;
	  return this;
	}

	module.exports = mapCacheSet;


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

	var baseToString = __webpack_require__(82);

	/**
	 * Converts `value` to a string. An empty string is returned for `null`
	 * and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 * @example
	 *
	 * _.toString(null);
	 * // => ''
	 *
	 * _.toString(-0);
	 * // => '-0'
	 *
	 * _.toString([1, 2, 3]);
	 * // => '1,2,3'
	 */
	function toString(value) {
	  return value == null ? '' : baseToString(value);
	}

	module.exports = toString;


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(40),
	    arrayMap = __webpack_require__(83),
	    isArray = __webpack_require__(36),
	    isSymbol = __webpack_require__(38);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolToString = symbolProto ? symbolProto.toString : undefined;

	/**
	 * The base implementation of `_.toString` which doesn't convert nullish
	 * values to empty strings.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }
	  if (isArray(value)) {
	    // Recursively convert values (susceptible to call stack limits).
	    return arrayMap(value, baseToString) + '';
	  }
	  if (isSymbol(value)) {
	    return symbolToString ? symbolToString.call(value) : '';
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}

	module.exports = baseToString;


/***/ }),
/* 83 */
/***/ (function(module, exports) {

	/**
	 * A specialized version of `_.map` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function arrayMap(array, iteratee) {
	  var index = -1,
	      length = array == null ? 0 : array.length,
	      result = Array(length);

	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }
	  return result;
	}

	module.exports = arrayMap;


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

	var isSymbol = __webpack_require__(38);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/**
	 * Converts `value` to a string key if it's not a string or symbol.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {string|symbol} Returns the key.
	 */
	function toKey(value) {
	  if (typeof value == 'string' || isSymbol(value)) {
	    return value;
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}

	module.exports = toKey;


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _ru = __webpack_require__(86);

	var _ru2 = _interopRequireDefault(_ru);

	var _en = __webpack_require__(87);

	var _en2 = _interopRequireDefault(_en);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var l10nPhrases = {
	    ru: _ru2.default,
	    en: _en2.default
	};

	exports.default = l10nPhrases;

/***/ }),
/* 86 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var ru = {
	    settings: {
	        allAreas: 'Отображать всё',
	        invalid: 'Пожалуйста, выберите столбцы для получения значений "region" и "value"!',
	        map: 'Карта',
	        rangesNumber: 'Кол-во интервалов',
	        minInRange: 'Мин. значение',
	        maxInRange: 'Макс. значение'
	    },
	    highcharts: {
	        mapNotFound: 'Карта %{mapShortcut} не найдена по пути %{mapPath}!'
	    },
	    data: {
	        emptySet: 'Данные не найдены. Пожалуйста, проверьте, что выбрана правильная карта.'
	    },
	    maps: {
	        RU: 'РФ',
	        UA: 'Украина',
	        worldPalestine: 'Мир'
	    }
	};

	exports.default = ru;

/***/ }),
/* 87 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var en = {
	    settings: {
	        allAreas: 'All areas',
	        invalid: 'Please, provide columns for "region" and "value" properties!',
	        map: 'Map',
	        rangesNumber: 'Ranges number',
	        minInRange: 'Minimum value',
	        maxInRange: 'Maximum value'
	    },
	    highcharts: {
	        mapNotFound: 'Map %{mapShortcut} not found on %{mapPath}!'
	    },
	    data: {
	        emptySet: 'Data set is empty. Please, ensure map is selected correctly.'
	    },
	    maps: {
	        RU: 'Russia Federation',
	        UA: 'Ukraine',
	        worldPalestine: 'World'
	    }
	};

	exports.default = en;

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _data = __webpack_require__(89);

	Object.keys(_data).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _data[key];
	    }
	  });
	});

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _highmapsMapdata = __webpack_require__(90);

	Object.keys(_highmapsMapdata).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _highmapsMapdata[key];
	    }
	  });
	});

	var _maxmindToHighmaps = __webpack_require__(95);

	Object.keys(_maxmindToHighmaps).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _maxmindToHighmaps[key];
	    }
	  });
	});

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _highmapsMapdata = __webpack_require__(91);

	Object.keys(_highmapsMapdata).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _highmapsMapdata[key];
	    }
	  });
	});

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.highmapsMapdata = undefined;

	var _ruAllDisputed = __webpack_require__(92);

	var _uaAll = __webpack_require__(93);

	var _worldPalestine = __webpack_require__(94);

	var highmapsMapdata = exports.highmapsMapdata = {
	    'countries/ua': _uaAll.uaAll,
	    'countries/ru/custom/ru-all-disputed': _ruAllDisputed.ruAllDisputed,
	    'custom/world-palestine': _worldPalestine.worldPalestine
	};

/***/ }),
/* 92 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var ruAllDisputed = exports.ruAllDisputed = { "title": "Russia with disputed territories", "version": "1.1.2", "type": "FeatureCollection", "copyright": "Copyright (c) 2015 Highsoft AS, Based on data from Natural Earth", "copyrightShort": "Natural Earth", "copyrightUrl": "http://www.naturalearthdata.com", "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:EPSG:3576" } }, "hc-transform": { "default": { "crs": "+proj=laea +lat_0=90 +lon_0=90 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs", "scale": 8.41717440945e-05, "jsonres": 15.5, "jsonmarginX": -999, "jsonmarginY": 9851.0, "xoffset": -4119438.21957, "yoffset": 474572.303972 } },
	  "features": [{ "type": "Feature", "id": "RU.SC", "properties": { "hc-group": "admin1", "hc-middle-x": 0.53, "hc-middle-y": 0.50, "hc-key": "ru-sc", "hc-a2": "SC", "labelrank": "5", "hasc": "RU.SC", "alt-name": null, "woe-id": "20070189", "subregion": null, "fips": null, "postal-code": "SC", "name": "Sevastopol", "country": "Russia", "type-en": "Republic", "region": "Crimean Peninsula", "longitude": "33.6396", "woe-name": "Sevastopol City Municipality", "latitude": "44.5182", "woe-label": null, "type": "Respublika" }, "geometry": { "type": "Polygon", "coordinates": [[[-997, 5645], [-999, 5692], [-982, 5676], [-956, 5694], [-960, 5675], [-974, 5674], [-968, 5667], [-985, 5636], [-997, 5645]]] } }, { "type": "Feature", "id": "RU.KR", "properties": { "hc-group": "admin1", "hc-middle-x": 0.24, "hc-middle-y": 0.08, "hc-key": "ru-kr", "hc-a2": "KR", "labelrank": "5", "hasc": "RU.KR", "alt-name": "Crimée|Criméia|Krim|Krymskaya Respublika|Respublika Krym", "woe-id": "2347544", "subregion": null, "fips": null, "postal-code": "KR", "name": "Crimea", "country": "Russia", "type-en": "Republic", "region": "Crimean Peninsula", "longitude": "34.2784", "woe-name": "Crimea", "latitude": "45.3115", "woe-label": null, "type": "Respublika" }, "geometry": { "type": "Polygon", "coordinates": [[[-997, 5645], [-985, 5636], [-968, 5667], [-974, 5674], [-960, 5675], [-956, 5694], [-929, 5712], [-928, 5733], [-941, 5745], [-939, 5788], [-963, 5819], [-959, 5836], [-876, 5799], [-836, 5757], [-823, 5755], [-830, 5771], [-797, 5786], [-801, 5768], [-793, 5765], [-805, 5755], [-801, 5743], [-794, 5753], [-790, 5743], [-799, 5721], [-791, 5721], [-788, 5734], [-777, 5710], [-791, 5692], [-782, 5695], [-785, 5686], [-776, 5682], [-771, 5689], [-769, 5679], [-799, 5681], [-766, 5665], [-786, 5665], [-777, 5658], [-788, 5654], [-778, 5626], [-792, 5601], [-803, 5605], [-806, 5587], [-790, 5553], [-770, 5629], [-786, 5552], [-767, 5535], [-745, 5534], [-747, 5512], [-715, 5495], [-701, 5464], [-705, 5453], [-727, 5465], [-749, 5448], [-796, 5496], [-805, 5536], [-832, 5535], [-838, 5547], [-867, 5550], [-888, 5584], [-913, 5601], [-942, 5600], [-970, 5612], [-997, 5645]]] } }, { "type": "Feature", "id": "RU.2485", "properties": { "hc-group": "admin1", "hc-middle-x": 0.44, "hc-middle-y": 0.58, "hc-key": "ru-2485", "hc-a2": "CA", "labelrank": "2", "hasc": "RU.", "alt-name": "Chukotskiy Avtonomnyy Okrug", "woe-id": "20070513", "subregion": "Far Eastern", "fips": "RS15", "postal-code": null, "name": "Chukchi Autonomous Okrug", "country": "Russia", "type-en": "Autonomous Province", "region": "Far Eastern", "longitude": "170.516", "woe-name": null, "latitude": "66.7517", "woe-label": null, "type": "Avtonomnyy Okrug" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[7257, 8693], [7282, 8677], [7280, 8661], [7232, 8612], [7210, 8643], [7243, 8696], [7257, 8693]]], [[[7123, 9331], [7144, 9264], [7132, 9232], [7148, 9216], [7157, 9175], [7124, 9166], [7096, 9180], [7046, 9244], [7052, 9307], [7094, 9353], [7123, 9331]]], [[[7183, 8343], [7201, 8410], [7193, 8425], [7233, 8457], [7240, 8500], [7269, 8561], [7240, 8613], [7275, 8628], [7320, 8621], [7351, 8670], [7399, 8678], [7398, 8718], [7380, 8750], [7336, 8758], [7292, 8748], [7268, 8719], [7268, 8753], [7219, 8762], [7247, 8828], [7256, 8867], [7276, 8885], [7262, 8901], [7275, 8928], [7286, 9004], [7326, 9096], [7352, 9139], [7346, 9147], [7378, 9193], [7418, 9230], [7452, 9294], [7482, 9302], [7508, 9357], [7550, 9413], [7570, 9427], [7578, 9466], [7597, 9497], [7643, 9509], [7637, 9528], [7684, 9527], [7722, 9543], [7738, 9528], [7754, 9561], [7790, 9563], [7760, 9587], [7748, 9571], [7731, 9589], [7690, 9579], [7678, 9558], [7673, 9621], [7692, 9659], [7673, 9652], [7675, 9712], [7711, 9738], [7775, 9823], [7771, 9849], [7789, 9851], [7794, 9826], [7816, 9807], [7852, 9811], [7847, 9773], [7872, 9770], [7880, 9714], [7860, 9697], [7946, 9728], [7982, 9690], [8008, 9696], [7981, 9709], [7988, 9737], [8001, 9706], [8038, 9732], [8055, 9695], [8059, 9645], [7999, 9567], [8008, 9523], [7978, 9492], [7960, 9499], [7921, 9485], [7896, 9418], [7921, 9392], [7923, 9338], [7914, 9323], [7838, 9294], [7846, 9309], [7824, 9322], [7793, 9315], [7821, 9305], [7831, 9246], [7876, 9249], [7898, 9276], [7967, 9253], [7985, 9218], [8013, 9199], [8034, 9118], [8020, 9082], [7995, 9070], [7975, 9038], [8006, 9060], [7990, 8982], [8041, 9022], [8023, 9040], [8017, 9072], [8066, 9068], [8097, 9102], [8078, 9121], [8136, 9144], [8182, 9149], [8212, 9138], [8240, 9185], [8273, 9181], [8312, 9205], [8338, 9189], [8360, 9158], [8334, 9098], [8326, 9046], [8294, 9049], [8308, 9021], [8327, 9041], [8335, 9004], [8359, 8973], [8382, 8902], [8419, 8839], [8396, 8842], [8381, 8819], [8328, 8822], [8311, 8784], [8328, 8759], [8319, 8700], [8308, 8683], [8324, 8642], [8313, 8623], [8326, 8595], [8314, 8556], [8258, 8536], [8205, 8496], [8179, 8455], [8130, 8516], [8117, 8544], [8072, 8536], [8056, 8508], [8010, 8492], [7996, 8443], [7950, 8422], [7957, 8392], [7937, 8357], [7939, 8334], [7909, 8330], [7887, 8292], [7907, 8286], [7862, 8246], [7848, 8204], [7863, 8175], [7877, 8161], [7828, 8096], [7778, 8079], [7759, 8036], [7713, 8028], [7647, 7971], [7587, 8010], [7557, 7980], [7539, 7984], [7506, 8024], [7468, 8026], [7409, 7993], [7363, 8013], [7368, 8043], [7351, 8035], [7324, 8057], [7328, 8148], [7346, 8209], [7338, 8235], [7369, 8283], [7334, 8312], [7305, 8314], [7300, 8329], [7261, 8323], [7253, 8340], [7199, 8332], [7183, 8343]]]] } }, { "type": "Feature", "id": "RU.AR", "properties": { "hc-group": "admin1", "hc-middle-x": 0.13, "hc-middle-y": 0.72, "hc-key": "ru-ar", "hc-a2": "AR", "labelrank": "6", "hasc": "RU.VO", "alt-name": "Vologodskaya Oblast", "woe-id": "20070508", "subregion": "Northern", "fips": "RS06", "postal-code": "AR", "name": "Arkhangel'sk", "country": "Russia", "type-en": "Region", "region": "Northwestern", "longitude": "41.9939", "woe-name": "Arkhangel'sk", "latitude": "63.3132", "woe-label": "Arkhangelrskaya Oblast, RU, Russia", "type": "Oblast" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[2743, 7085], [2738, 7043], [2715, 7028], [2723, 7057], [2713, 7084], [2743, 7085]]], [[[3577, 8069], [3557, 8113], [3583, 8105], [3576, 8074], [3612, 8055], [3587, 8020], [3564, 8042], [3577, 8069]]], [[[3545, 8085], [3508, 8095], [3508, 8114], [3532, 8119], [3545, 8085]]], [[[3625, 7993], [3663, 7995], [3628, 7970], [3602, 8021], [3620, 8071], [3650, 8050], [3656, 8022], [3626, 8029], [3625, 7993]]], [[[3681, 8126], [3697, 8118], [3667, 8105], [3653, 8155], [3681, 8126]]], [[[3828, 8074], [3826, 8030], [3794, 8016], [3763, 8022], [3761, 8049], [3801, 8052], [3828, 8074]]], [[[3698, 8152], [3686, 8141], [3655, 8170], [3660, 8191], [3674, 8170], [3680, 8188], [3698, 8152]]], [[[3415, 8268], [3487, 8236], [3474, 8205], [3472, 8236], [3410, 8230], [3415, 8268]]], [[[3735, 8076], [3722, 8098], [3762, 8093], [3745, 8080], [3751, 8044], [3736, 8025], [3699, 8010], [3671, 8047], [3696, 8078], [3730, 8066], [3735, 8076]]], [[[3621, 8123], [3598, 8127], [3591, 8152], [3628, 8152], [3628, 8178], [3647, 8151], [3663, 8100], [3619, 8096], [3621, 8123]]], [[[1589, 6092], [1569, 6117], [1578, 6129], [1541, 6172], [1515, 6159], [1506, 6208], [1485, 6209], [1467, 6244], [1477, 6259], [1457, 6280], [1424, 6256], [1378, 6316], [1387, 6330], [1361, 6344], [1322, 6333], [1296, 6355], [1289, 6388], [1266, 6393], [1251, 6438], [1225, 6456], [1202, 6439], [1187, 6485], [1134, 6519], [1131, 6543], [1110, 6555], [1105, 6588], [1082, 6597], [1085, 6641], [1090, 6655], [1088, 6659], [1090, 6662], [1092, 6659], [1098, 6675], [1131, 6718], [1188, 6748], [1216, 6801], [1245, 6830], [1229, 6854], [1224, 6900], [1238, 6931], [1280, 6965], [1285, 6996], [1313, 6976], [1356, 6995], [1368, 6942], [1412, 6917], [1453, 6948], [1453, 6974], [1427, 7000], [1460, 7079], [1479, 7064], [1511, 7072], [1520, 7024], [1515, 6993], [1536, 6939], [1541, 6890], [1568, 6890], [1597, 6873], [1615, 6885], [1641, 6960], [1668, 6974], [1699, 6964], [1748, 6964], [1777, 6946], [1823, 6945], [1901, 6958], [1865, 6943], [1860, 6923], [1893, 6897], [1890, 6827], [1930, 6853], [1961, 6754], [1983, 6724], [1997, 6671], [2020, 6647], [2073, 6661], [2110, 6626], [2030, 6535], [2060, 6514], [2047, 6450], [2058, 6423], [2023, 6401], [1998, 6436], [1978, 6429], [1956, 6453], [1905, 6448], [1902, 6474], [1788, 6568], [1760, 6576], [1759, 6533], [1777, 6500], [1782, 6468], [1771, 6437], [1750, 6422], [1761, 6373], [1734, 6360], [1707, 6362], [1696, 6334], [1668, 6305], [1662, 6280], [1692, 6277], [1720, 6252], [1762, 6292], [1798, 6279], [1830, 6240], [1761, 6184], [1747, 6185], [1701, 6150], [1714, 6120], [1668, 6083], [1612, 6108], [1589, 6092]]], [[[3721, 8191], [3733, 8197], [3733, 8197], [3733, 8197], [3732, 8191], [3721, 8191], [3721, 8191]]], [[[3721, 8191], [3720, 8191], [3723, 8160], [3751, 8128], [3723, 8144], [3693, 8191], [3721, 8191], [3721, 8191]]], [[[3000, 7251], [2998, 7262], [2958, 7278], [2995, 7294], [2979, 7305], [2977, 7333], [3035, 7332], [3067, 7358], [3091, 7354], [3092, 7372], [3124, 7357], [3114, 7394], [3147, 7384], [3141, 7409], [3174, 7405], [3153, 7429], [3164, 7448], [3176, 7424], [3221, 7452], [3238, 7429], [3247, 7456], [3272, 7452], [3331, 7477], [3368, 7464], [3374, 7479], [3398, 7462], [3411, 7486], [3430, 7481], [3464, 7446], [3570, 7455], [3632, 7486], [3656, 7486], [3680, 7469], [3685, 7439], [3674, 7410], [3643, 7388], [3591, 7371], [3451, 7360], [3426, 7365], [3355, 7361], [3282, 7323], [3255, 7301], [3236, 7314], [3217, 7292], [3195, 7329], [3187, 7275], [3167, 7279], [3115, 7234], [3043, 7198], [3015, 7226], [3030, 7203], [3015, 7185], [2981, 7192], [3001, 7175], [2983, 7157], [2969, 7167], [2916, 7119], [2915, 7101], [2880, 7078], [2888, 7068], [2871, 7029], [2860, 6976], [2867, 6903], [2880, 6872], [2863, 6862], [2801, 6897], [2792, 6934], [2765, 6918], [2757, 6964], [2742, 6965], [2718, 7008], [2741, 7004], [2743, 7026], [2775, 7010], [2756, 7052], [2766, 7077], [2715, 7116], [2712, 7138], [2735, 7176], [2777, 7196], [2790, 7172], [2852, 7227], [2845, 7245], [2865, 7256], [2891, 7239], [2909, 7275], [2942, 7277], [2955, 7263], [2993, 7262], [3000, 7251]]], [[[3402, 8164], [3424, 8178], [3402, 8184], [3408, 8207], [3438, 8184], [3434, 8208], [3465, 8205], [3472, 8188], [3493, 8194], [3495, 8218], [3542, 8224], [3532, 8211], [3534, 8167], [3508, 8162], [3455, 8179], [3441, 8153], [3466, 8139], [3446, 8123], [3469, 8112], [3460, 8085], [3439, 8113], [3446, 8142], [3430, 8163], [3402, 8164]]], [[[3733, 8197], [3734, 8206], [3742, 8221], [3769, 8214], [3733, 8197], [3733, 8197], [3733, 8197]]]] } }, { "type": "Feature", "id": "RU.NN", "properties": { "hc-group": "admin1", "hc-middle-x": 0.77, "hc-middle-y": 0.84, "hc-key": "ru-nn", "hc-a2": "NN", "labelrank": "2", "hasc": "RU.NN", "alt-name": "Nenetskiy A.Okr.|Nenetskiy AOk", "woe-id": "20070509", "subregion": "Northern", "fips": "RS50", "postal-code": "NN", "name": "Nenets", "country": "Russia", "type-en": "Autonomous Province", "region": "Northwestern", "longitude": "56.2877", "woe-name": null, "latitude": "67.8271", "woe-label": null, "type": "Avtonomnyy Okrug" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[2421, 6894], [2443, 6911], [2380, 6896], [2338, 6922], [2340, 6954], [2379, 6990], [2419, 6996], [2438, 6982], [2451, 6925], [2447, 6907], [2421, 6894]]], [[[2875, 6782], [2887, 6800], [2919, 6806], [2941, 6700], [2928, 6675], [2886, 6698], [2893, 6723], [2876, 6742], [2875, 6782]]], [[[3108, 6509], [3070, 6490], [3061, 6469], [3093, 6442], [3079, 6390], [3041, 6404], [3018, 6382], [2972, 6376], [2969, 6356], [2896, 6344], [2881, 6321], [2795, 6306], [2715, 6347], [2651, 6386], [2409, 6548], [2346, 6611], [2296, 6618], [2285, 6603], [2110, 6626], [2073, 6661], [2020, 6647], [1997, 6671], [1983, 6724], [1961, 6754], [1930, 6853], [1969, 6868], [1994, 6892], [2002, 6917], [1993, 6946], [2009, 6963], [2070, 6995], [2120, 7035], [2123, 7107], [2141, 7075], [2190, 7023], [2205, 6989], [2198, 6934], [2177, 6897], [2110, 6939], [2077, 6932], [2053, 6913], [2063, 6871], [2047, 6833], [2070, 6796], [2137, 6770], [2156, 6793], [2189, 6808], [2195, 6825], [2251, 6807], [2267, 6820], [2312, 6803], [2397, 6806], [2400, 6796], [2475, 6781], [2454, 6760], [2488, 6751], [2481, 6782], [2557, 6779], [2576, 6752], [2547, 6740], [2523, 6695], [2510, 6717], [2491, 6709], [2522, 6681], [2544, 6683], [2558, 6649], [2579, 6672], [2645, 6671], [2700, 6619], [2751, 6635], [2804, 6628], [2811, 6585], [2783, 6576], [2770, 6549], [2792, 6524], [2815, 6532], [2820, 6563], [2857, 6551], [2891, 6565], [2905, 6589], [2892, 6601], [2902, 6666], [2932, 6664], [2950, 6684], [3026, 6625], [3083, 6566], [3108, 6509]]]] } }, { "type": "Feature", "id": "RU.YN", "properties": { "hc-group": "admin1", "hc-middle-x": 0.58, "hc-middle-y": 0.72, "hc-key": "ru-yn", "hc-a2": "YN", "labelrank": "2", "hasc": "RU.YN", "alt-name": "Yamalo-Nenetskiy A.Okr", "woe-id": "20070525", "subregion": "West Siberian", "fips": "RS87", "postal-code": "YN", "name": "Yamal-Nenets", "country": "Russia", "type-en": "Autonomous Province", "region": "Urals", "longitude": "75.1874", "woe-name": "Yamal-Nenets", "latitude": "65.4117", "woe-label": "Yamalo-Nenetskiy Avtonomnyy Okrug, RU, Russia", "type": "Avtonomnyy Okrug" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[3188, 6092], [3227, 6062], [3216, 6037], [3192, 6060], [3188, 6092]]], [[[3832, 6723], [3794, 6729], [3835, 6770], [3864, 6743], [3832, 6723]]], [[[3593, 6939], [3607, 6940], [3605, 6894], [3596, 6918], [3537, 6914], [3528, 6920], [3550, 6968], [3594, 6970], [3593, 6939]]], [[[3079, 6390], [3093, 6442], [3061, 6469], [3070, 6490], [3108, 6509], [3138, 6476], [3129, 6470], [3184, 6408], [3177, 6402], [3213, 6318], [3207, 6298], [3263, 6345], [3287, 6382], [3258, 6398], [3255, 6456], [3264, 6476], [3237, 6509], [3212, 6478], [3211, 6516], [3237, 6566], [3256, 6562], [3260, 6591], [3278, 6613], [3301, 6668], [3263, 6680], [3313, 6737], [3370, 6749], [3409, 6781], [3476, 6889], [3509, 6918], [3509, 6903], [3591, 6880], [3635, 6834], [3618, 6774], [3578, 6725], [3561, 6693], [3541, 6687], [3542, 6650], [3560, 6617], [3557, 6584], [3535, 6522], [3512, 6505], [3506, 6442], [3489, 6419], [3481, 6368], [3462, 6322], [3499, 6245], [3458, 6214], [3441, 6147], [3408, 6142], [3367, 6086], [3315, 6060], [3309, 6029], [3252, 6026], [3219, 6084], [3171, 6101], [3170, 6072], [3225, 6009], [3271, 5997], [3313, 5963], [3340, 5971], [3358, 6007], [3423, 6017], [3451, 6036], [3464, 6076], [3525, 6116], [3540, 6150], [3542, 6185], [3530, 6219], [3549, 6259], [3593, 6274], [3659, 6275], [3666, 6239], [3693, 6199], [3677, 6166], [3686, 6157], [3658, 6095], [3702, 6052], [3756, 6051], [3709, 6067], [3678, 6088], [3692, 6140], [3731, 6153], [3717, 6207], [3723, 6244], [3688, 6270], [3683, 6288], [3624, 6323], [3598, 6307], [3532, 6337], [3548, 6366], [3543, 6418], [3571, 6474], [3612, 6513], [3606, 6625], [3589, 6652], [3619, 6680], [3628, 6703], [3700, 6724], [3717, 6756], [3725, 6803], [3700, 6863], [3729, 6864], [3721, 6827], [3736, 6830], [3750, 6778], [3740, 6736], [3711, 6701], [3702, 6671], [3707, 6640], [3688, 6624], [3718, 6591], [3797, 6559], [3802, 6532], [3821, 6518], [3823, 6571], [3796, 6580], [3743, 6633], [3740, 6685], [3787, 6694], [3809, 6658], [3834, 6660], [3833, 6695], [3811, 6692], [3849, 6730], [3866, 6727], [3869, 6697], [3910, 6671], [3935, 6642], [3919, 6613], [3884, 6611], [3868, 6586], [3898, 6538], [3924, 6520], [3924, 6461], [3814, 6368], [3815, 6344], [3838, 6333], [3849, 6287], [3893, 6273], [3903, 6257], [3955, 6270], [3950, 6246], [3979, 6240], [3980, 6189], [4000, 6165], [3969, 6156], [3975, 6113], [3957, 6100], [3951, 6067], [3916, 6070], [3945, 6009], [3924, 5970], [3976, 5902], [3981, 5879], [3966, 5852], [3987, 5809], [3971, 5794], [3985, 5752], [4012, 5751], [4028, 5734], [4039, 5680], [4015, 5629], [4048, 5625], [4069, 5597], [4097, 5606], [4112, 5595], [4109, 5559], [4118, 5527], [4111, 5495], [4082, 5480], [4049, 5426], [4083, 5400], [4076, 5356], [3987, 5239], [3975, 5268], [3948, 5297], [3913, 5287], [3878, 5334], [3834, 5346], [3816, 5333], [3786, 5356], [3774, 5400], [3738, 5392], [3688, 5368], [3677, 5343], [3608, 5357], [3552, 5347], [3512, 5391], [3500, 5432], [3475, 5447], [3451, 5441], [3424, 5471], [3363, 5475], [3337, 5484], [3324, 5506], [3269, 5527], [3261, 5564], [3226, 5551], [3195, 5564], [3155, 5560], [3169, 5610], [3163, 5631], [3135, 5642], [3127, 5694], [3148, 5713], [3127, 5743], [3107, 5746], [3069, 5783], [3044, 5788], [3034, 5759], [3011, 5780], [2959, 5760], [2930, 5780], [2910, 5810], [2932, 5842], [2891, 5875], [2847, 5892], [2826, 5882], [2793, 5896], [2724, 5903], [2717, 5947], [2681, 5972], [2707, 5985], [2710, 6007], [2744, 6056], [2731, 6070], [2736, 6113], [2729, 6132], [2783, 6128], [2791, 6147], [2855, 6190], [2970, 6201], [2988, 6230], [3056, 6253], [3051, 6280], [3068, 6274], [3081, 6312], [3047, 6325], [3056, 6367], [3079, 6390]]]] } }, { "type": "Feature", "id": "RU.KY", "properties": { "hc-group": "admin1", "hc-middle-x": 0.55, "hc-middle-y": 0.56, "hc-key": "ru-ky", "hc-a2": "KY", "labelrank": "6", "hasc": "RU.KY", "alt-name": "Krasnoyarskiy Kray|Yeniseisk|Yeniseyskaya G.", "woe-id": "20070524", "subregion": "East Siberian", "fips": "RS39", "postal-code": "KY", "name": "Krasnoyarsk", "country": "Russia", "type-en": "Territory", "region": "Siberian", "longitude": "95.2029", "woe-name": null, "latitude": "65.5602", "woe-label": null, "type": "Kray" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[3926, 6795], [3922, 6768], [3894, 6774], [3884, 6794], [3913, 6822], [3926, 6795]]], [[[4561, 7310], [4546, 7303], [4549, 7349], [4587, 7384], [4587, 7366], [4563, 7344], [4561, 7310]]], [[[4412, 7753], [4398, 7787], [4471, 7769], [4444, 7731], [4412, 7753]]], [[[5215, 7030], [5177, 7006], [5163, 7012], [5170, 7051], [5226, 7050], [5218, 7037], [5215, 7030]]], [[[3987, 5239], [4076, 5356], [4083, 5400], [4049, 5426], [4082, 5480], [4111, 5495], [4118, 5527], [4109, 5559], [4112, 5595], [4097, 5606], [4069, 5597], [4048, 5625], [4015, 5629], [4039, 5680], [4028, 5734], [4012, 5751], [3985, 5752], [3971, 5794], [3987, 5809], [3966, 5852], [3981, 5879], [3976, 5902], [3924, 5970], [3945, 6009], [3916, 6070], [3951, 6067], [3957, 6100], [3975, 6113], [3969, 6156], [4000, 6165], [3980, 6189], [3979, 6240], [3950, 6246], [3955, 6270], [3903, 6257], [3893, 6273], [3849, 6287], [3838, 6333], [3815, 6344], [3814, 6368], [3924, 6461], [3924, 6520], [3898, 6538], [3868, 6586], [3884, 6611], [3919, 6613], [3935, 6642], [3910, 6671], [3869, 6697], [3866, 6727], [3905, 6720], [3994, 6605], [4047, 6610], [4066, 6593], [4049, 6556], [4012, 6543], [4002, 6505], [4008, 6471], [3987, 6441], [4006, 6445], [4011, 6473], [4034, 6498], [4049, 6467], [4045, 6416], [4010, 6394], [4033, 6366], [4026, 6401], [4052, 6400], [4069, 6418], [4051, 6531], [4079, 6581], [4071, 6615], [4046, 6628], [4022, 6658], [4026, 6686], [3984, 6702], [3966, 6732], [3981, 6785], [3966, 6844], [3995, 6877], [4044, 6883], [4106, 6874], [4162, 6884], [4187, 6874], [4195, 6890], [4244, 6898], [4258, 6855], [4278, 6885], [4263, 6891], [4247, 6939], [4217, 6952], [4215, 6981], [4186, 6990], [4217, 6998], [4220, 6975], [4249, 6973], [4238, 6994], [4210, 7006], [4230, 7030], [4250, 7014], [4263, 7032], [4233, 7037], [4262, 7054], [4264, 7036], [4343, 7118], [4374, 7136], [4503, 7180], [4482, 7211], [4542, 7221], [4577, 7251], [4613, 7263], [4612, 7237], [4582, 7230], [4587, 7201], [4627, 7226], [4653, 7215], [4653, 7234], [4679, 7250], [4719, 7234], [4707, 7265], [4678, 7296], [4700, 7292], [4744, 7310], [4750, 7345], [4734, 7373], [4761, 7441], [4787, 7486], [4808, 7501], [4855, 7485], [4870, 7493], [4889, 7471], [4863, 7436], [4839, 7420], [4886, 7429], [4895, 7415], [4920, 7430], [4947, 7416], [4931, 7350], [4975, 7369], [4970, 7398], [5013, 7415], [5039, 7415], [5070, 7435], [5088, 7421], [5120, 7432], [5143, 7400], [5159, 7411], [5196, 7350], [5208, 7352], [5217, 7315], [5164, 7333], [5187, 7301], [5219, 7304], [5232, 7273], [5223, 7223], [5204, 7197], [5152, 7094], [5156, 7074], [5131, 7037], [5112, 6973], [5077, 6959], [5070, 6910], [5052, 6907], [5043, 6822], [5066, 6859], [5063, 6891], [5119, 6905], [5140, 6934], [5169, 6955], [5161, 6977], [5190, 6975], [5220, 7020], [5220, 6975], [5254, 6931], [5250, 6908], [5266, 6877], [5292, 6870], [5296, 6845], [5346, 6828], [5385, 6732], [5426, 6719], [5417, 6681], [5385, 6646], [5352, 6625], [5341, 6595], [5357, 6569], [5330, 6552], [5323, 6524], [5341, 6505], [5341, 6465], [5292, 6460], [5285, 6435], [5235, 6392], [5213, 6392], [5206, 6364], [5265, 6303], [5295, 6204], [5323, 6094], [5266, 6029], [5299, 6020], [5331, 5967], [5323, 5950], [5336, 5921], [5359, 5905], [5371, 5858], [5407, 5846], [5390, 5821], [5393, 5797], [5369, 5761], [5387, 5747], [5367, 5710], [5379, 5685], [5428, 5694], [5527, 5692], [5554, 5673], [5516, 5654], [5514, 5633], [5458, 5637], [5467, 5617], [5464, 5563], [5481, 5552], [5462, 5531], [5455, 5499], [5494, 5455], [5517, 5449], [5501, 5392], [5514, 5364], [5488, 5327], [5496, 5308], [5429, 5240], [5439, 5217], [5424, 5165], [5453, 5110], [5474, 5100], [5518, 5105], [5527, 5044], [5501, 5039], [5490, 5015], [5512, 4987], [5526, 4993], [5552, 4947], [5518, 4896], [5530, 4885], [5503, 4861], [5449, 4891], [5428, 4887], [5370, 4931], [5332, 4899], [5350, 4842], [5329, 4807], [5301, 4792], [5288, 4757], [5259, 4735], [5264, 4718], [5242, 4700], [5261, 4656], [5246, 4633], [5219, 4646], [5173, 4715], [5148, 4711], [5132, 4667], [5098, 4652], [5082, 4658], [5014, 4651], [4981, 4540], [5003, 4530], [4994, 4510], [5020, 4508], [5033, 4455], [5013, 4451], [5014, 4424], [4999, 4402], [4979, 4407], [4954, 4354], [4974, 4298], [4957, 4286], [4950, 4252], [4963, 4240], [4957, 4183], [4913, 4186], [4882, 4135], [4920, 4115], [4964, 4068], [4981, 4063], [4961, 4044], [4942, 4055], [4931, 4032], [4900, 4038], [4867, 4014], [4855, 4025], [4796, 4000], [4793, 3944], [4759, 3931], [4729, 3875], [4722, 3844], [4693, 3830], [4646, 3786], [4565, 3777], [4522, 3791], [4455, 3791], [4420, 3828], [4441, 3866], [4505, 3923], [4500, 3952], [4544, 3982], [4535, 4004], [4509, 4013], [4495, 4054], [4507, 4087], [4478, 4146], [4451, 4165], [4456, 4188], [4416, 4198], [4393, 4237], [4346, 4217], [4305, 4215], [4284, 4257], [4255, 4279], [4295, 4313], [4321, 4324], [4296, 4397], [4257, 4418], [4251, 4444], [4270, 4453], [4261, 4472], [4270, 4507], [4254, 4509], [4283, 4555], [4325, 4583], [4321, 4627], [4283, 4629], [4228, 4651], [4212, 4710], [4249, 4762], [4284, 4779], [4266, 4817], [4216, 4814], [4189, 4867], [4163, 4875], [4155, 4903], [4071, 4918], [4035, 4912], [3975, 4919], [3964, 4930], [3988, 4983], [3956, 5055], [4063, 5107], [4086, 5142], [4053, 5155], [3990, 5200], [3987, 5239]]], [[[4656, 7515], [4668, 7573], [4679, 7681], [4703, 7730], [4725, 7711], [4724, 7645], [4731, 7678], [4752, 7699], [4781, 7663], [4802, 7661], [4817, 7631], [4813, 7603], [4847, 7592], [4866, 7604], [4863, 7580], [4894, 7594], [4897, 7574], [4863, 7576], [4847, 7590], [4803, 7593], [4780, 7572], [4709, 7547], [4681, 7508], [4656, 7515]]], [[[4445, 7694], [4484, 7748], [4501, 7797], [4564, 7815], [4590, 7775], [4591, 7801], [4607, 7802], [4636, 7768], [4635, 7754], [4635, 7693], [4621, 7692], [4653, 7651], [4641, 7628], [4595, 7619], [4565, 7641], [4515, 7643], [4495, 7670], [4491, 7705], [4475, 7714], [4445, 7694]]], [[[4553, 7822], [4489, 7800], [4477, 7775], [4413, 7819], [4422, 7845], [4441, 7853], [4452, 7895], [4434, 7890], [4445, 7923], [4406, 7934], [4375, 7937], [4377, 7953], [4408, 7950], [4445, 7923], [4485, 7947], [4503, 7970], [4536, 7918], [4563, 7891], [4546, 7881], [4553, 7822]]]] } }, { "type": "Feature", "id": "RU.CK", "properties": { "hc-group": "admin1", "hc-middle-x": 0.57, "hc-middle-y": 0.58, "hc-key": "ru-ck", "hc-a2": "CK", "labelrank": "2", "hasc": "RU.CK", "alt-name": "Chukotka|Chukotskiy AOk", "woe-id": "2346881", "subregion": "Far Eastern", "fips": "RS63", "postal-code": "CK", "name": "Sakha (Yakutia)", "country": "Russia", "type-en": "Autonomous Province", "region": "Far Eastern", "longitude": "130.989", "woe-name": "Chukot", "latitude": "65.5964", "woe-label": "Sakha, RU, Russia", "type": "Avtonomnyy Okrug" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[7184, 8285], [7224, 8269], [7263, 8267], [7242, 8253], [7193, 8266], [7184, 8285]]], [[[6179, 7748], [6137, 7766], [6147, 7791], [6182, 7771], [6179, 7748]]], [[[5277, 7145], [5270, 7101], [5244, 7099], [5208, 7116], [5223, 7124], [5217, 7150], [5268, 7162], [5277, 7145]]], [[[5899, 7752], [5890, 7741], [5846, 7796], [5882, 7785], [5899, 7752]]], [[[6231, 7691], [6198, 7763], [6217, 7795], [6241, 7805], [6294, 7808], [6334, 7786], [6330, 7768], [6273, 7723], [6242, 7709], [6231, 7691]]], [[[5220, 7020], [5217, 7025], [5215, 7030], [5218, 7037], [5226, 7050], [5276, 7044], [5294, 7081], [5323, 7046], [5319, 7022], [5347, 7004], [5353, 7021], [5330, 7036], [5370, 7067], [5390, 7096], [5474, 7117], [5511, 7137], [5537, 7089], [5600, 7093], [5653, 7110], [5700, 7138], [5703, 7157], [5731, 7156], [5722, 7202], [5697, 7216], [5684, 7262], [5704, 7260], [5702, 7291], [5770, 7288], [5787, 7306], [5804, 7293], [5815, 7326], [5853, 7345], [5862, 7326], [5905, 7336], [5940, 7330], [5914, 7277], [5942, 7312], [5964, 7291], [5962, 7246], [5979, 7260], [6014, 7245], [6010, 7209], [5940, 7219], [6124, 7130], [6200, 7124], [6213, 7158], [6193, 7211], [6152, 7295], [6203, 7283], [6234, 7284], [6268, 7305], [6270, 7340], [6291, 7381], [6401, 7412], [6392, 7426], [6335, 7406], [6378, 7476], [6416, 7470], [6435, 7506], [6371, 7532], [6353, 7565], [6334, 7541], [6308, 7584], [6338, 7619], [6342, 7645], [6294, 7656], [6333, 7677], [6459, 7795], [6521, 7828], [6483, 7776], [6462, 7768], [6479, 7727], [6485, 7758], [6526, 7831], [6557, 7759], [6539, 7729], [6563, 7719], [6566, 7763], [6531, 7843], [6562, 7887], [6610, 7922], [6648, 7923], [6659, 7898], [6634, 7894], [6651, 7865], [6677, 7901], [6701, 7882], [6712, 7917], [6741, 7901], [6736, 7925], [6762, 7943], [6804, 7946], [6801, 7923], [6828, 7939], [6862, 8001], [6861, 8032], [6878, 8114], [6923, 8202], [6975, 8247], [7004, 8259], [6995, 8305], [7018, 8262], [7065, 8258], [7108, 8220], [7151, 8239], [7163, 8268], [7237, 8245], [7261, 8262], [7315, 8222], [7270, 8267], [7228, 8272], [7178, 8288], [7193, 8306], [7183, 8343], [7199, 8332], [7253, 8340], [7261, 8323], [7300, 8329], [7305, 8314], [7334, 8312], [7369, 8283], [7338, 8235], [7346, 8209], [7328, 8148], [7324, 8057], [7351, 8035], [7368, 8043], [7363, 8013], [7409, 7993], [7468, 8026], [7506, 8024], [7539, 7984], [7557, 7980], [7588, 7965], [7571, 7922], [7588, 7893], [7572, 7870], [7534, 7866], [7545, 7844], [7516, 7817], [7500, 7767], [7478, 7755], [7492, 7726], [7514, 7726], [7522, 7702], [7501, 7687], [7507, 7668], [7561, 7641], [7555, 7590], [7586, 7561], [7626, 7557], [7651, 7503], [7627, 7504], [7623, 7454], [7606, 7414], [7626, 7403], [7608, 7383], [7567, 7394], [7551, 7385], [7551, 7341], [7530, 7309], [7503, 7300], [7515, 7270], [7537, 7276], [7564, 7236], [7525, 7234], [7525, 7204], [7481, 7176], [7498, 7134], [7492, 7094], [7514, 7086], [7555, 7026], [7608, 6996], [7638, 6988], [7630, 6963], [7656, 6950], [7666, 6906], [7681, 6851], [7665, 6836], [7640, 6854], [7593, 6818], [7607, 6790], [7590, 6760], [7551, 6760], [7547, 6741], [7478, 6746], [7437, 6727], [7442, 6690], [7474, 6658], [7470, 6636], [7503, 6565], [7479, 6507], [7494, 6493], [7488, 6467], [7501, 6436], [7532, 6432], [7570, 6375], [7627, 6332], [7592, 6296], [7600, 6244], [7587, 6212], [7541, 6180], [7518, 6175], [7513, 6141], [7527, 6103], [7487, 6068], [7450, 6053], [7414, 6022], [7398, 5975], [7417, 5949], [7404, 5939], [7425, 5911], [7414, 5872], [7441, 5851], [7453, 5819], [7406, 5804], [7451, 5786], [7483, 5784], [7475, 5752], [7494, 5720], [7469, 5686], [7545, 5681], [7571, 5632], [7544, 5610], [7576, 5532], [7599, 5513], [7537, 5463], [7510, 5450], [7478, 5407], [7493, 5388], [7453, 5363], [7428, 5366], [7381, 5313], [7333, 5300], [7309, 5258], [7279, 5243], [7267, 5258], [7232, 5234], [7200, 5235], [7184, 5215], [7148, 5199], [7124, 5212], [7060, 5226], [7020, 5204], [6974, 5200], [6966, 5180], [6917, 5190], [6877, 5166], [6846, 5185], [6815, 5175], [6766, 5142], [6745, 5111], [6719, 5114], [6711, 5135], [6668, 5165], [6646, 5159], [6627, 5179], [6597, 5241], [6582, 5273], [6554, 5273], [6542, 5306], [6503, 5344], [6506, 5363], [6452, 5381], [6433, 5347], [6368, 5336], [6364, 5367], [6322, 5404], [6285, 5415], [6248, 5405], [6215, 5407], [6185, 5372], [6167, 5337], [6170, 5302], [6152, 5247], [6128, 5219], [6136, 5176], [6084, 5119], [6077, 5153], [6050, 5146], [6035, 5169], [6027, 5131], [5976, 5099], [5940, 5096], [5933, 5059], [5889, 5035], [5826, 5083], [5834, 5172], [5825, 5183], [5825, 5231], [5837, 5272], [5829, 5339], [5808, 5332], [5775, 5344], [5767, 5376], [5736, 5412], [5748, 5460], [5731, 5491], [5687, 5487], [5689, 5546], [5679, 5549], [5653, 5601], [5622, 5623], [5565, 5606], [5562, 5640], [5587, 5648], [5582, 5674], [5558, 5705], [5527, 5692], [5428, 5694], [5379, 5685], [5367, 5710], [5387, 5747], [5369, 5761], [5393, 5797], [5390, 5821], [5407, 5846], [5371, 5858], [5359, 5905], [5336, 5921], [5323, 5950], [5331, 5967], [5299, 6020], [5266, 6029], [5323, 6094], [5295, 6204], [5265, 6303], [5206, 6364], [5213, 6392], [5235, 6392], [5285, 6435], [5292, 6460], [5341, 6465], [5341, 6505], [5323, 6524], [5330, 6552], [5357, 6569], [5341, 6595], [5352, 6625], [5385, 6646], [5417, 6681], [5426, 6719], [5385, 6732], [5346, 6828], [5296, 6845], [5292, 6870], [5266, 6877], [5250, 6908], [5254, 6931], [5220, 6975], [5220, 7020]]], [[[6155, 8035], [6120, 8072], [6155, 8068], [6159, 8085], [6180, 8122], [6209, 8113], [6213, 8134], [6263, 8180], [6288, 8155], [6277, 8098], [6251, 8068], [6155, 8035]]], [[[6006, 7983], [6040, 8020], [6108, 8036], [6104, 8010], [6124, 8003], [6140, 7965], [6097, 7930], [6061, 7938], [6034, 7982], [6018, 7964], [6035, 7939], [6096, 7918], [6138, 7938], [6121, 7885], [6100, 7884], [6065, 7817], [6038, 7812], [6063, 7783], [6023, 7757], [5959, 7763], [5927, 7778], [5942, 7790], [5904, 7814], [5902, 7838], [5879, 7851], [5885, 7915], [5903, 7909], [5999, 7917], [5952, 7957], [5969, 7968], [5944, 7978], [6006, 7983]]]] } }, { "type": "Feature", "id": "RU.KH", "properties": { "hc-group": "admin1", "hc-middle-x": 0.67, "hc-middle-y": 0.75, "hc-key": "ru-kh", "hc-a2": "KH", "labelrank": "6", "hasc": "RU.KH", "alt-name": "Khabarovskiy Kray", "woe-id": "2346883", "subregion": "Far Eastern", "fips": "RS30", "postal-code": "KH", "name": "Khabarovsk", "country": "Russia", "type-en": "Territory", "region": "Far Eastern", "longitude": "135.443", "woe-name": "Khabarovsk", "latitude": "57.0232", "woe-label": "Khabarovskiy Kray, RU, Russia", "type": "Kray" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[8055, 5810], [8070, 5819], [8059, 5869], [8083, 5885], [8109, 5884], [8123, 5856], [8124, 5822], [8085, 5831], [8080, 5805], [8055, 5810]]], [[[8067, 6824], [8037, 6803], [8065, 6774], [8036, 6746], [8021, 6769], [7985, 6704], [7930, 6640], [7923, 6606], [7904, 6588], [7887, 6514], [7911, 6428], [7903, 6366], [7911, 6334], [7940, 6293], [7930, 6247], [7942, 6217], [7933, 6161], [7935, 6100], [7952, 6025], [7968, 6022], [7958, 5997], [7963, 5952], [7954, 5814], [7958, 5756], [7946, 5727], [7946, 5689], [7966, 5675], [8011, 5691], [8078, 5765], [8145, 5678], [8171, 5706], [8159, 5739], [8134, 5735], [8142, 5797], [8153, 5822], [8159, 5743], [8198, 5763], [8213, 5695], [8243, 5739], [8249, 5781], [8240, 5822], [8258, 5806], [8265, 5760], [8283, 5775], [8254, 5832], [8217, 5862], [8267, 5893], [8280, 5932], [8331, 5941], [8350, 5927], [8395, 5928], [8437, 5946], [8497, 5946], [8497, 5910], [8550, 5885], [8554, 5862], [8596, 5865], [8627, 5842], [8636, 5795], [8630, 5775], [8649, 5758], [8648, 5736], [8676, 5713], [8686, 5684], [8715, 5647], [8762, 5619], [8780, 5622], [8785, 5586], [8825, 5572], [8880, 5487], [8917, 5444], [8924, 5314], [8949, 5260], [8909, 5239], [8884, 5250], [8887, 5286], [8853, 5282], [8809, 5308], [8792, 5298], [8784, 5241], [8757, 5210], [8759, 5189], [8831, 5190], [8852, 5208], [8870, 5197], [8857, 5118], [8822, 5099], [8841, 5065], [8835, 5011], [8778, 4958], [8757, 4963], [8729, 4931], [8727, 4946], [8686, 4938], [8661, 4894], [8659, 4864], [8682, 4836], [8654, 4801], [8607, 4873], [8616, 4914], [8611, 4962], [8564, 4979], [8553, 5010], [8519, 4999], [8548, 5026], [8542, 5063], [8511, 5033], [8485, 5034], [8474, 5003], [8437, 4992], [8397, 4966], [8360, 4989], [8322, 4972], [8308, 4980], [8284, 4948], [8247, 4950], [8259, 4914], [8238, 4912], [8215, 4876], [8207, 4900], [8157, 4954], [8140, 4946], [8139, 4973], [8106, 4984], [8066, 4966], [8055, 4992], [8032, 4973], [8010, 5060], [8032, 5097], [7996, 5129], [8018, 5147], [8051, 5210], [8042, 5243], [8050, 5268], [8082, 5302], [8081, 5318], [8052, 5323], [8035, 5346], [8148, 5407], [8137, 5441], [8101, 5462], [8090, 5512], [8069, 5526], [8028, 5522], [8011, 5469], [7971, 5452], [7959, 5417], [7967, 5401], [7903, 5329], [7860, 5288], [7855, 5303], [7808, 5341], [7772, 5313], [7730, 5297], [7712, 5326], [7715, 5359], [7735, 5383], [7714, 5418], [7740, 5495], [7733, 5515], [7751, 5535], [7741, 5582], [7703, 5605], [7680, 5589], [7662, 5557], [7615, 5516], [7599, 5513], [7576, 5532], [7544, 5610], [7571, 5632], [7545, 5681], [7469, 5686], [7494, 5720], [7475, 5752], [7483, 5784], [7451, 5786], [7406, 5804], [7453, 5819], [7441, 5851], [7414, 5872], [7425, 5911], [7404, 5939], [7417, 5949], [7398, 5975], [7414, 6022], [7450, 6053], [7487, 6068], [7527, 6103], [7513, 6141], [7518, 6175], [7541, 6180], [7587, 6212], [7600, 6244], [7592, 6296], [7627, 6332], [7570, 6375], [7532, 6432], [7501, 6436], [7488, 6467], [7494, 6493], [7479, 6507], [7503, 6565], [7470, 6636], [7474, 6658], [7442, 6690], [7437, 6727], [7478, 6746], [7547, 6741], [7551, 6760], [7590, 6760], [7607, 6790], [7593, 6818], [7640, 6854], [7665, 6836], [7681, 6851], [7666, 6906], [7705, 6939], [7705, 6964], [7742, 6980], [7788, 6980], [7856, 6950], [7867, 6919], [7892, 6901], [7876, 6884], [7875, 6838], [7898, 6817], [7924, 6820], [7939, 6862], [8000, 6859], [8021, 6877], [8069, 6840], [8067, 6824]]]] } }, { "type": "Feature", "id": "RU.SL", "properties": { "hc-group": "admin1", "hc-middle-x": 0.35, "hc-middle-y": 0.75, "hc-key": "ru-sl", "hc-a2": "SL", "labelrank": "2", "hasc": "RU.SL", "alt-name": "Sakhalinskaya Oblast", "woe-id": "2346937", "subregion": "Far Eastern", "fips": "RS64", "postal-code": "SL", "name": "Sakhalin", "country": "Russia", "type-en": "Region", "region": "Far Eastern", "longitude": "152.467", "woe-name": "Sakhalin", "latitude": "47.3479", "woe-label": "Sakhalinskaya Oblast, RU, Russia", "type": "Oblast" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[9772, 6213], [9802, 6123], [9809, 6049], [9800, 6028], [9782, 6068], [9787, 6084], [9774, 6141], [9785, 6169], [9772, 6213]]], [[[9768, 6400], [9783, 6359], [9779, 6339], [9762, 6387], [9768, 6400]]], [[[9554, 6756], [9583, 6777], [9586, 6792], [9621, 6765], [9629, 6733], [9583, 6776], [9554, 6756]]], [[[9841, 5550], [9841, 5550], [9841, 5550], [9841, 5550], [9841, 5550], [9841, 5550], [9841, 5550]]], [[[9841, 5550], [9833, 5588], [9834, 5633], [9851, 5668], [9849, 5632], [9833, 5588], [9844, 5554], [9841, 5550], [9841, 5550]]], [[[9496, 6939], [9471, 6925], [9495, 6941], [9493, 6996], [9523, 6984], [9505, 6961], [9549, 6916], [9547, 6845], [9516, 6857], [9521, 6910], [9496, 6939]]], [[[9841, 5550], [9831, 5536], [9769, 5517], [9756, 5522], [9753, 5568], [9726, 5639], [9761, 5677], [9754, 5623], [9767, 5567], [9766, 5538], [9784, 5523], [9827, 5538], [9841, 5550], [9841, 5550], [9841, 5550]]], [[[9784, 5851], [9766, 5824], [9779, 5797], [9788, 5711], [9775, 5709], [9769, 5738], [9755, 5804], [9754, 5856], [9733, 5878], [9761, 5876], [9772, 5900], [9764, 5945], [9772, 5963], [9792, 5957], [9776, 5886], [9784, 5851]]], [[[8735, 5966], [8756, 5968], [8826, 5943], [8943, 5888], [8988, 5881], [9054, 5860], [9089, 5843], [9135, 5837], [9070, 5822], [9012, 5771], [9029, 5772], [9023, 5739], [9047, 5710], [9117, 5600], [9144, 5579], [9191, 5570], [9229, 5577], [9298, 5546], [9313, 5580], [9363, 5558], [9375, 5528], [9341, 5536], [9331, 5551], [9286, 5504], [9265, 5510], [9260, 5478], [9313, 5387], [9288, 5384], [9221, 5422], [9188, 5479], [9123, 5518], [9099, 5566], [9059, 5591], [8992, 5607], [8989, 5623], [8914, 5706], [8841, 5761], [8815, 5769], [8781, 5806], [8770, 5832], [8716, 5851], [8663, 5844], [8593, 5897], [8581, 5928], [8539, 5970], [8492, 5989], [8502, 6036], [8523, 6027], [8523, 6069], [8502, 6065], [8514, 6091], [8481, 6105], [8426, 6107], [8434, 6122], [8431, 6146], [8477, 6142], [8506, 6107], [8540, 6102], [8601, 6081], [8653, 6048], [8687, 6004], [8735, 5966]]]] } }, { "type": "Feature", "id": "RU.KA", "properties": { "hc-group": "admin1", "hc-middle-x": 0.66, "hc-middle-y": 0.73, "hc-key": "ru-ka", "hc-a2": "KA", "labelrank": "2", "hasc": "RU.KA", "alt-name": "Kamçatka|Kamchatskaya Oblast", "woe-id": "20070514", "subregion": "Far Eastern", "fips": "RS26", "postal-code": "KA", "name": "Kamchatka", "country": "Russia", "type-en": "Region", "region": "Far Eastern", "longitude": "160.187", "woe-name": "Kamchatka", "latitude": "56.5325", "woe-label": "Kamchatskaya Oblast, RU, Russia", "type": "Oblast" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[9192, 8027], [9207, 8053], [9227, 8045], [9277, 8069], [9296, 8065], [9271, 8044], [9212, 8025], [9197, 8007], [9192, 8027]]], [[[8648, 8034], [8641, 8054], [8673, 8059], [8693, 8045], [8689, 8010], [8712, 7954], [8673, 7980], [8648, 8034]]], [[[8419, 8839], [8413, 8817], [8438, 8791], [8422, 8774], [8448, 8766], [8492, 8701], [8485, 8683], [8533, 8648], [8536, 8616], [8565, 8582], [8567, 8554], [8597, 8526], [8638, 8511], [8619, 8480], [8569, 8470], [8540, 8441], [8522, 8358], [8539, 8274], [8588, 8210], [8591, 8189], [8507, 8232], [8504, 8206], [8524, 8176], [8538, 8127], [8552, 8129], [8571, 8092], [8521, 8081], [8535, 8052], [8512, 8017], [8533, 8016], [8538, 7989], [8563, 7983], [8574, 7962], [8608, 7963], [8605, 7945], [8634, 7951], [8671, 7870], [8737, 7814], [8759, 7810], [8794, 7840], [8770, 7864], [8819, 7901], [8847, 7871], [8851, 7849], [8933, 7820], [8946, 7854], [9024, 7843], [9040, 7810], [9001, 7786], [8980, 7816], [8967, 7800], [8975, 7773], [8993, 7784], [9000, 7742], [9059, 7690], [9089, 7677], [9132, 7675], [9170, 7688], [9203, 7638], [9194, 7602], [9175, 7593], [9171, 7556], [9197, 7482], [9218, 7460], [9273, 7432], [9337, 7432], [9303, 7402], [9306, 7339], [9317, 7300], [9367, 7262], [9379, 7268], [9424, 7222], [9459, 7153], [9503, 7026], [9464, 7043], [9445, 7031], [9325, 7073], [9222, 7085], [9098, 7123], [9020, 7137], [8906, 7172], [8815, 7226], [8735, 7295], [8720, 7359], [8682, 7404], [8631, 7408], [8626, 7426], [8648, 7459], [8627, 7490], [8642, 7513], [8615, 7606], [8573, 7681], [8543, 7704], [8528, 7746], [8505, 7769], [8506, 7794], [8462, 7867], [8453, 7899], [8425, 7911], [8413, 7978], [8401, 7992], [8398, 8061], [8381, 8045], [8345, 8096], [8331, 8081], [8300, 8110], [8223, 8138], [8205, 8173], [8225, 8217], [8176, 8185], [8171, 8091], [8199, 8090], [8207, 8067], [8231, 8067], [8261, 8042], [8283, 8063], [8302, 8035], [8271, 8026], [8272, 8004], [8230, 8002], [8212, 8024], [8192, 8005], [8190, 8046], [8133, 8059], [8099, 8043], [8077, 8050], [8071, 8084], [8042, 8088], [8016, 8117], [7982, 8110], [7971, 8128], [7941, 8128], [7943, 8153], [7921, 8179], [7893, 8168], [7863, 8175], [7848, 8204], [7862, 8246], [7907, 8286], [7887, 8292], [7909, 8330], [7939, 8334], [7937, 8357], [7957, 8392], [7950, 8422], [7996, 8443], [8010, 8492], [8056, 8508], [8072, 8536], [8117, 8544], [8130, 8516], [8179, 8455], [8205, 8496], [8258, 8536], [8314, 8556], [8326, 8595], [8313, 8623], [8324, 8642], [8308, 8683], [8319, 8700], [8328, 8759], [8311, 8784], [8328, 8822], [8381, 8819], [8396, 8842], [8419, 8839]]]] } }, { "type": "Feature", "id": "RU.KT", "properties": { "hc-group": "admin1", "hc-middle-x": 0.44, "hc-middle-y": 0.41, "hc-key": "ru-kt", "hc-a2": "KT", "labelrank": "6", "hasc": "RU.KT", "alt-name": "Kostromskaya", "woe-id": "2346903", "subregion": "Central", "fips": "RS37", "postal-code": "KT", "name": "Kostroma", "country": "Russia", "type-en": "Region", "region": "Central", "longitude": "43.4689", "woe-name": "Kostroma", "latitude": "58.3882", "woe-label": "Kostromskaya Oblast, RU, Russia", "type": "Oblast" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[1211, 6123], [1210, 6123], [1211, 6130], [1214, 6129], [1211, 6123]]], [[[1400, 6028], [1374, 6007], [1373, 5947], [1360, 5930], [1341, 5945], [1300, 5933], [1269, 5948], [1208, 5913], [1154, 5958], [1124, 5996], [1104, 5976], [1036, 5973], [999, 6002], [999, 6022], [968, 6025], [944, 6052], [970, 6073], [923, 6103], [912, 6154], [877, 6132], [839, 6151], [799, 6183], [834, 6207], [836, 6197], [875, 6231], [952, 6238], [962, 6273], [992, 6269], [1024, 6283], [1062, 6274], [1075, 6259], [1110, 6285], [1104, 6266], [1127, 6241], [1122, 6219], [1171, 6191], [1205, 6128], [1234, 6092], [1246, 6093], [1292, 6048], [1332, 6041], [1362, 6067], [1400, 6028]]]] } }, { "type": "Feature", "id": "RU.MS", "properties": { "hc-group": "admin1", "hc-middle-x": 0.45, "hc-middle-y": 0.59, "hc-key": "ru-ms", "hc-a2": "MS", "labelrank": "9", "hasc": "RU.MS", "alt-name": "Mosca|Moscou|Moscow|Mosc£|Moskau|Moskova|Moskovskaya", "woe-id": "2346910", "subregion": "Central", "fips": "RS47", "postal-code": "MS", "name": "Moskva", "country": "Russia", "type-en": "Region", "region": "Central", "longitude": "37.6188", "woe-name": "Moskva", "latitude": "55.7177", "woe-label": "Moskva, RU, Russia", "type": "Oblast" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[452, 6263], [445, 6271], [451, 6274], [459, 6263], [452, 6263]]], [[[496, 6276], [489, 6276], [489, 6284], [498, 6288], [496, 6276]]], [[[375, 6204], [385, 6215], [390, 6239], [422, 6262], [429, 6239], [464, 6240], [489, 6257], [504, 6229], [413, 6199], [375, 6204]]]] } }, { "type": "Feature", "id": "RU.RZ", "properties": { "hc-group": "admin1", "hc-middle-x": 0.53, "hc-middle-y": 0.49, "hc-key": "ru-rz", "hc-a2": "RZ", "labelrank": "6", "hasc": "RU.RZ", "alt-name": "Ryazanskaya Oblast|Ryazanskaya Oblast", "woe-id": "2346922", "subregion": "Central", "fips": "RS62", "postal-code": "RZ", "name": "Ryazan'", "country": "Russia", "type-en": "Region", "region": "Central", "longitude": "40.6258", "woe-name": "Ryazan'", "latitude": "54.3363", "woe-label": "Ryazanskaya Oblast, RU, Russia", "type": "Oblast" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[653, 5820], [651, 5823], [654, 5829], [657, 5827], [653, 5820]]], [[[367, 5849], [369, 5901], [315, 5922], [317, 5958], [354, 5994], [378, 6032], [410, 6030], [425, 6053], [450, 6029], [486, 6038], [536, 6023], [531, 6038], [578, 6022], [597, 6003], [590, 5985], [615, 5967], [628, 5925], [648, 5901], [653, 5860], [675, 5848], [662, 5833], [646, 5824], [647, 5791], [621, 5777], [586, 5787], [599, 5760], [570, 5771], [569, 5749], [548, 5748], [540, 5753], [534, 5757], [487, 5804], [461, 5786], [437, 5787], [422, 5833], [378, 5837], [367, 5849]]]] } }, { "type": "Feature", "id": "RU.SA", "properties": { "hc-group": "admin1", "hc-middle-x": 0.36, "hc-middle-y": 0.44, "hc-key": "ru-sa", "hc-a2": "SA", "labelrank": "6", "hasc": "RU.SA", "alt-name": "Kuybyshev|Kuybyshevskaya|Samarskaya Oblast", "woe-id": "2346906", "subregion": "Volga", "fips": "RS65", "postal-code": "SA", "name": "Samara", "country": "Russia", "type-en": "Region", "region": "Volga", "longitude": "50.4377", "woe-name": "Samara", "latitude": "53.1783", "woe-label": "Samarskaya Oblast, RU, Russia", "type": "Oblast" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[1167, 5083], [1164, 5088], [1169, 5091], [1171, 5086], [1167, 5083]]], [[[1114, 5334], [1132, 5313], [1127, 5289], [1148, 5289], [1156, 5268], [1179, 5284], [1217, 5278], [1243, 5231], [1237, 5206], [1276, 5195], [1272, 5182], [1249, 5191], [1233, 5166], [1240, 5149], [1191, 5119], [1166, 5112], [1163, 5092], [1122, 5058], [1083, 5061], [1070, 5041], [1057, 5053], [1038, 5027], [1019, 5026], [998, 4999], [921, 5001], [931, 5019], [913, 5073], [889, 5104], [891, 5134], [874, 5174], [843, 5184], [850, 5219], [828, 5244], [845, 5250], [868, 5255], [850, 5285], [861, 5301], [865, 5341], [882, 5345], [904, 5325], [939, 5349], [960, 5320], [983, 5325], [1019, 5287], [1054, 5265], [1107, 5301], [1114, 5334]]]] } }, { "type": "Feature", "id": "RU.UL", "properties": { "hc-group": "admin1", "hc-middle-x": 0.40, "hc-middle-y": 0.51, "hc-key": "ru-ul", "hc-a2": "UL", "labelrank": "7", "hasc": "RU.UL", "alt-name": "Simbirsk|Simbirskaya G.|Ul'yanovskaya Oblast", "woe-id": "2346931", "subregion": "Volga", "fips": "RS81", "postal-code": "UL", "name": "Ul'yanovsk", "country": "Russia", "type-en": "Region", "region": "Volga", "longitude": "47.3773", "woe-name": "Ul'yanovsk", "latitude": "53.9248", "woe-label": "Ulryanovskaya Oblast, RU, Russia", "type": "Oblast" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[1019, 5498], [1025, 5501], [1027, 5498], [1021, 5497], [1019, 5498]]], [[[782, 5538], [815, 5542], [873, 5513], [874, 5544], [897, 5574], [912, 5534], [940, 5516], [934, 5488], [978, 5491], [1014, 5460], [1016, 5439], [1041, 5420], [1094, 5418], [1086, 5365], [1114, 5334], [1107, 5301], [1054, 5265], [1019, 5287], [983, 5325], [960, 5320], [939, 5349], [904, 5325], [882, 5345], [865, 5341], [861, 5301], [850, 5285], [868, 5255], [845, 5250], [790, 5280], [776, 5275], [730, 5314], [719, 5334], [744, 5340], [792, 5401], [781, 5445], [800, 5502], [782, 5538]]]] } }, { "type": "Feature", "id": "RU.OM", "properties": { "hc-group": "admin1", "hc-middle-x": 0.51, "hc-middle-y": 0.52, "hc-key": "ru-om", "hc-a2": "OM", "labelrank": "6", "hasc": "RU.OM", "alt-name": "Omskaya Oblast", "woe-id": "2346915", "subregion": "West Siberian", "fips": "RS54", "postal-code": "OM", "name": "Omsk", "country": "Russia", "type-en": "Region", "region": "Siberian", "longitude": "73.3995", "woe-name": "Omsk", "latitude": "56.0471", "woe-label": "Omskaya Oblast, RU, Russia", "type": "Oblast" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[2770, 4626], [2767, 4628], [2772, 4632], [2774, 4632], [2770, 4626]]], [[[2765, 4620], [2761, 4622], [2765, 4623], [2767, 4621], [2765, 4620]]], [[[3106, 4253], [3037, 4227], [3016, 4236], [2982, 4225], [2971, 4198], [2936, 4231], [2883, 4217], [2875, 4252], [2912, 4284], [2873, 4299], [2870, 4320], [2842, 4331], [2818, 4305], [2816, 4368], [2796, 4348], [2773, 4369], [2764, 4356], [2734, 4376], [2718, 4367], [2710, 4402], [2728, 4395], [2745, 4449], [2733, 4460], [2744, 4500], [2741, 4533], [2712, 4542], [2718, 4559], [2749, 4574], [2740, 4616], [2774, 4620], [2783, 4666], [2814, 4689], [2823, 4711], [2865, 4702], [2881, 4725], [2865, 4751], [2855, 4795], [2821, 4785], [2808, 4821], [2831, 4828], [2825, 4871], [2833, 4890], [2893, 4958], [2919, 4927], [2901, 4888], [2959, 4875], [2967, 4858], [3021, 4839], [3044, 4852], [3129, 4825], [3214, 4867], [3225, 4845], [3204, 4836], [3197, 4803], [3225, 4771], [3219, 4734], [3246, 4666], [3243, 4592], [3199, 4563], [3217, 4563], [3228, 4519], [3182, 4524], [3112, 4487], [3121, 4447], [3099, 4436], [3134, 4315], [3121, 4310], [3106, 4253]]]] } }, { "type": "Feature", "id": "RU.NS", "properties": { "hc-group": "admin1", "hc-middle-x": 0.46, "hc-middle-y": 0.52, "hc-key": "ru-ns", "hc-a2": "NS", "labelrank": "6", "hasc": "RU.NS", "alt-name": "Novosibirskaya Oblast", "woe-id": "2346914", "subregion": "West Siberian", "fips": "RS53", "postal-code": "NS", "name": "Novosibirsk", "country": "Russia", "type-en": "Region", "region": "Siberian", "longitude": "80.08320000000001", "woe-name": "Novosibirsk", "latitude": "55.3139", "woe-label": "Novosibirskaya Oblast, RU, Russia", "type": "Oblast" }, "geometry": { "type": "Polygon", "coordinates": [[[3265, 4104], [3173, 4215], [3166, 4243], [3191, 4235], [3218, 4275], [3106, 4253], [3121, 4310], [3134, 4315], [3099, 4436], [3121, 4447], [3112, 4487], [3182, 4524], [3228, 4519], [3217, 4563], [3199, 4563], [3243, 4592], [3246, 4666], [3309, 4643], [3431, 4612], [3430, 4607], [3518, 4562], [3565, 4485], [3634, 4487], [3665, 4443], [3732, 4447], [3798, 4466], [3810, 4452], [3791, 4423], [3814, 4372], [3796, 4353], [3831, 4344], [3862, 4383], [3901, 4384], [3911, 4383], [3909, 4340], [3932, 4290], [3928, 4234], [3943, 4217], [3930, 4198], [3939, 4162], [3903, 4146], [3879, 4121], [3863, 4133], [3799, 4127], [3781, 4105], [3765, 4123], [3720, 4090], [3692, 4049], [3639, 4090], [3645, 4126], [3617, 4125], [3613, 4145], [3582, 4160], [3571, 4196], [3543, 4174], [3467, 4149], [3423, 4123], [3374, 4131], [3346, 4115], [3313, 4118], [3312, 4133], [3265, 4104]]] } }, { "type": "Feature", "id": "RU.MM", "properties": { "hc-group": "admin1", "hc-middle-x": 0.63, "hc-middle-y": 0.50, "hc-key": "ru-mm", "hc-a2": "MM", "labelrank": "6", "hasc": "RU.MM", "alt-name": "Murmanskaya Oblast", "woe-id": "2346912", "subregion": "Northern", "fips": "RS28", "postal-code": "MM", "name": "Murmansk", "country": "Russia", "type-en": "Region", "region": "Northwestern", "longitude": "34.3212", "woe-name": "Murmansk", "latitude": "67.9609", "woe-label": "Murmanskaya Oblast, RU, Russia", "type": "Oblast" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[1536, 7384], [1548, 7377], [1537, 7377], [1536, 7383], [1536, 7384]]], [[[1429, 7574], [1467, 7613], [1554, 7608], [1579, 7617], [1608, 7679], [1607, 7718], [1640, 7750], [1689, 7755], [1689, 7776], [1736, 7754], [1758, 7761], [1785, 7739], [1826, 7742], [1829, 7711], [1863, 7732], [1865, 7696], [1892, 7678], [1914, 7691], [1907, 7622], [1891, 7626], [1880, 7662], [1873, 7635], [1884, 7609], [1864, 7610], [1891, 7586], [1896, 7551], [1934, 7460], [1936, 7347], [1921, 7284], [1930, 7279], [1927, 7212], [1938, 7186], [1940, 7113], [1896, 7068], [1879, 7034], [1851, 7023], [1779, 7018], [1707, 7044], [1668, 7074], [1648, 7107], [1633, 7173], [1617, 7197], [1595, 7257], [1598, 7301], [1578, 7314], [1586, 7338], [1568, 7375], [1577, 7425], [1590, 7436], [1577, 7465], [1547, 7408], [1554, 7387], [1532, 7393], [1521, 7408], [1487, 7404], [1473, 7425], [1498, 7465], [1487, 7491], [1429, 7574]]]] } }, { "type": "Feature", "id": "RU.LN", "properties": { "hc-group": "admin1", "hc-middle-x": 0.40, "hc-middle-y": 0.15, "hc-key": "ru-ln", "hc-a2": "LN", "labelrank": "2", "hasc": "RU.LN", "alt-name": "Saint Petersburg|Sankt-Peterburgskaya G.|Leningradskaya Oblast", "woe-id": "2346907", "subregion": "Northwestern", "fips": "RS42", "postal-code": "LN", "name": "Leningrad", "country": "Russia", "type-en": "Region", "region": "Northwestern", "longitude": "32.7736", "woe-name": "Leningrad", "latitude": "59.9905", "woe-label": "Leningradskaya Oblast, RU, Russia", "type": "Oblast" }, "geometry": { "type": "Polygon", "coordinates": [[[427, 7156], [471, 7161], [460, 7143], [488, 7141], [499, 7169], [539, 7187], [535, 7157], [564, 7161], [577, 7128], [605, 7128], [618, 7089], [598, 7028], [638, 7008], [639, 7030], [665, 7056], [655, 7115], [635, 7122], [623, 7151], [636, 7175], [626, 7188], [648, 7213], [647, 7190], [678, 7209], [638, 7227], [625, 7254], [726, 7226], [769, 7210], [763, 7182], [774, 7164], [818, 6948], [844, 6932], [890, 6930], [895, 6906], [915, 6909], [906, 6939], [919, 6941], [966, 6885], [998, 6835], [1000, 6815], [956, 6798], [932, 6808], [917, 6787], [844, 6750], [853, 6728], [820, 6696], [792, 6681], [723, 6700], [696, 6764], [702, 6799], [684, 6839], [640, 6844], [631, 6866], [646, 6890], [621, 6925], [601, 6914], [562, 6917], [569, 6931], [511, 6938], [492, 6975], [464, 6959], [446, 6965], [433, 6998], [444, 7012], [452, 7062], [431, 7111], [442, 7129], [427, 7156]]] } }, { "type": "Feature", "id": "RU.SP", "properties": { "hc-group": "admin1", "hc-middle-x": 0.40, "hc-middle-y": 0.73, "hc-key": "ru-sp", "hc-a2": "SP", "labelrank": "7", "hasc": "RU.SP", "alt-name": "Sankt-Peterburg gorsovet", "woe-id": "20070507", "subregion": "Northwestern", "fips": "RS52", "postal-code": "SP", "name": "City of St. Petersburg", "country": "Russia", "type-en": "City", "region": "Northwestern", "longitude": "30.2901", "woe-name": "City of St. Petersburg", "latitude": "59.8064", "woe-label": "St. Peterburg, RU, Russia", "type": "Gorsovet" }, "geometry": { "type": "Polygon", "coordinates": [[[635, 7122], [655, 7115], [665, 7056], [639, 7030], [638, 7008], [598, 7028], [618, 7089], [624, 7056], [644, 7059], [650, 7094], [635, 7122]]] } }, { "type": "Feature", "id": "RU.KI", "properties": { "hc-group": "admin1", "hc-middle-x": 0.60, "hc-middle-y": 0.46, "hc-key": "ru-ki", "hc-a2": "KI", "labelrank": "2", "hasc": "RU.KI", "alt-name": "Karelian A.S.S.R.|Karelo-Finnish A.S.S.R.|Karel'skaya A.S.S.R.|Olonets|Olonetskaya G.|Kareliya|Republic of Karelia", "woe-id": "2346873", "subregion": "Northern", "fips": "RS28", "postal-code": "KI", "name": "Karelia", "country": "Russia", "type-en": "Republic", "region": "Northwestern", "longitude": "33.1446", "woe-name": "Karelia", "latitude": "63.5295", "woe-label": "Kareliya, RU, Russia", "type": "Respublika" }, "geometry": { "type": "Polygon", "coordinates": [[[1532, 7393], [1531, 7391], [1536, 7384], [1536, 7383], [1537, 7377], [1541, 7341], [1523, 7335], [1529, 7276], [1516, 7241], [1495, 7223], [1440, 7219], [1420, 7180], [1463, 7137], [1440, 7118], [1446, 7142], [1415, 7173], [1371, 7130], [1357, 7136], [1349, 7080], [1370, 7060], [1356, 6995], [1313, 6976], [1285, 6996], [1280, 6965], [1238, 6931], [1224, 6900], [1229, 6854], [1245, 6830], [1216, 6801], [1188, 6748], [1131, 6718], [1107, 6744], [1106, 6768], [1081, 6787], [1062, 6783], [1000, 6815], [998, 6835], [966, 6885], [919, 6941], [906, 6939], [915, 6909], [895, 6906], [890, 6930], [844, 6932], [818, 6948], [774, 7164], [763, 7182], [769, 7210], [822, 7198], [925, 7188], [985, 7175], [1045, 7185], [1068, 7227], [1075, 7289], [1092, 7338], [1140, 7325], [1170, 7339], [1174, 7381], [1223, 7407], [1215, 7423], [1233, 7448], [1267, 7449], [1316, 7486], [1331, 7467], [1381, 7510], [1429, 7574], [1487, 7491], [1498, 7465], [1473, 7425], [1487, 7404], [1521, 7408], [1532, 7393]]] } }, { "type": "Feature", "id": "RU.KC", "properties": { "hc-group": "admin1", "hc-middle-x": 0.25, "hc-middle-y": 0.60, "hc-key": "ru-kc", "hc-a2": "KC", "labelrank": "2", "hasc": "RU.KC", "alt-name": "Karaçay-Çerkes|Karachay-Cherkessiya|Karachayevo-Cherkesskaya Respublika|Karachayevo-Cherkessiya|Karachayevo-Cherkess Republic|K", "woe-id": "20070522", "subregion": "North Caucasus", "fips": "RS32", "postal-code": "KC", "name": "Karachay-Cherkess", "country": "Russia", "type-en": "Republic", "region": "Volga", "longitude": "41.6866", "woe-name": "Karachay-Cherkess", "latitude": "43.7073", "woe-label": "Karachayevo-Cherkesiya, RU, Russia", "type": "Respublika" }, "geometry": { "type": "Polygon", "coordinates": [[[-512, 4775], [-539, 4795], [-576, 4844], [-578, 4868], [-602, 4904], [-611, 4944], [-563, 4972], [-545, 4962], [-532, 4980], [-507, 4920], [-480, 4916], [-439, 4938], [-398, 4849], [-429, 4860], [-438, 4840], [-415, 4827], [-431, 4799], [-467, 4801], [-512, 4775]]] } }, { "type": "Feature", "id": "RU.IN", "properties": { "hc-group": "admin1", "hc-middle-x": 0.83, "hc-middle-y": 0.15, "hc-key": "ru-in", "hc-a2": "IN", "labelrank": "2", "hasc": "RU.IN", "alt-name": "Ingouchie|Inguchétia|Inguschetien|Ingushetia|Ingushetiya|Ingush Republic|Ingushskaya Respublika|Respublika Ingushetiya", "woe-id": "20070521", "subregion": "North Caucasus", "fips": "RS19", "postal-code": "IN", "name": "Ingush", "country": "Russia", "type-en": "Republic", "region": "Volga", "longitude": "44.8468", "woe-name": "Ingush", "latitude": "43.3661", "woe-label": "Ingushetiya, RU, Russia", "type": "Respublika" }, "geometry": { "type": "Polygon", "coordinates": [[[-347, 4497], [-358, 4522], [-378, 4515], [-378, 4538], [-365, 4552], [-351, 4529], [-324, 4546], [-328, 4610], [-309, 4625], [-282, 4601], [-274, 4575], [-329, 4499], [-347, 4497]]] } }, { "type": "Feature", "id": "RU.KB", "properties": { "hc-group": "admin1", "hc-middle-x": 0.46, "hc-middle-y": 0.56, "hc-key": "ru-kb", "hc-a2": "KB", "labelrank": "2", "hasc": "RU.KB", "alt-name": "Kabardin A.S.S.R.|Kabardino-Balkarskaya A.S.S.R.|Kabardino-Balkariya|Kabardino-Balkarsk|Kabard|Kabardino-Balkarskaya Republic", "woe-id": "2346871", "subregion": "North Caucasus", "fips": "RS22", "postal-code": "KB", "name": "Kabardin-Balkar", "country": "Russia", "type-en": "Republic", "region": "Volga", "longitude": "43.3982", "woe-name": "Kabardin-Balkar", "latitude": "43.3757", "woe-label": "Kabardino-Balkariya, RU, Russia", "type": "Respublika" }, "geometry": { "type": "Polygon", "coordinates": [[[-465, 4656], [-478, 4681], [-475, 4708], [-503, 4746], [-512, 4775], [-467, 4801], [-431, 4799], [-379, 4771], [-381, 4745], [-346, 4715], [-317, 4715], [-296, 4680], [-304, 4668], [-308, 4640], [-328, 4629], [-367, 4646], [-383, 4633], [-388, 4657], [-446, 4646], [-465, 4656]]] } }, { "type": "Feature", "id": "RU.NO", "properties": { "hc-group": "admin1", "hc-middle-x": 0.21, "hc-middle-y": 0.55, "hc-key": "ru-no", "hc-a2": "NO", "labelrank": "2", "hasc": "RU.NO", "alt-name": "Kuzey Osetya|Respublika Severnaya Osetiya|Severnaya Osetiya-Alaniya|North Ossetian A.S.S.R.|Republic of North Osetia-Alania", "woe-id": "2346877", "subregion": "North Caucasus", "fips": "RS68", "postal-code": "NO", "name": "North Ossetia", "country": "Russia", "type-en": "Republic", "region": "Volga", "longitude": "44.1653", "woe-name": null, "latitude": "42.9969", "woe-label": null, "type": "Respublika" }, "geometry": { "type": "Polygon", "coordinates": [[[-282, 4601], [-309, 4625], [-328, 4610], [-324, 4546], [-351, 4529], [-365, 4552], [-378, 4538], [-411, 4565], [-453, 4579], [-464, 4599], [-445, 4609], [-465, 4656], [-446, 4646], [-388, 4657], [-383, 4633], [-367, 4646], [-328, 4629], [-308, 4640], [-304, 4668], [-264, 4624], [-275, 4608], [-282, 4601]]] } }, { "type": "Feature", "id": "RU.ST", "properties": { "hc-group": "admin1", "hc-middle-x": 0.46, "hc-middle-y": 0.48, "hc-key": "ru-st", "hc-a2": "ST", "labelrank": "7", "hasc": "RU.ST", "alt-name": "Stavropol'skiy Kray|Stavropolskiy Kray", "woe-id": "2346887", "subregion": "North Caucasus", "fips": "RS70", "postal-code": "ST", "name": "Stavropol'", "country": "Russia", "type-en": "Territory", "region": "Volga", "longitude": "43.2791", "woe-name": "Stavropol'", "latitude": "44.981", "woe-label": "Stavropolrskiy Kray, RU, Russia", "type": "Kray" }, "geometry": { "type": "Polygon", "coordinates": [[[-275, 4608], [-264, 4624], [-304, 4668], [-296, 4680], [-317, 4715], [-346, 4715], [-381, 4745], [-379, 4771], [-431, 4799], [-415, 4827], [-438, 4840], [-429, 4860], [-398, 4849], [-439, 4938], [-437, 4986], [-394, 4992], [-406, 5006], [-391, 5036], [-415, 5064], [-396, 5108], [-378, 5119], [-343, 5091], [-331, 5117], [-309, 5101], [-287, 5076], [-259, 5037], [-226, 5010], [-175, 5003], [-161, 4943], [-131, 4898], [-139, 4850], [-130, 4817], [-110, 4792], [-74, 4691], [-81, 4664], [-108, 4651], [-152, 4661], [-167, 4625], [-201, 4636], [-171, 4604], [-187, 4587], [-204, 4580], [-227, 4616], [-243, 4600], [-275, 4608]]] } }, { "type": "Feature", "id": "RU.SM", "properties": { "hc-group": "admin1", "hc-middle-x": 0.50, "hc-middle-y": 0.66, "hc-key": "ru-sm", "hc-a2": "SM", "labelrank": "6", "hasc": "RU.SM", "alt-name": "Smolenskaya Oblast", "woe-id": "2346925", "subregion": "Central", "fips": "RS69", "postal-code": "SM", "name": "Smolensk", "country": "Russia", "type-en": "Region", "region": "Central", "longitude": "33.0803", "woe-name": "Smolensk", "latitude": "54.6726", "woe-label": "Smolenskaya Oblast, RU, Russia", "type": "Oblast" }, "geometry": { "type": "Polygon", "coordinates": [[[141, 6697], [170, 6700], [184, 6666], [208, 6638], [202, 6619], [221, 6602], [240, 6552], [268, 6526], [315, 6513], [337, 6516], [350, 6496], [353, 6454], [383, 6418], [373, 6392], [316, 6357], [313, 6348], [237, 6343], [200, 6362], [168, 6359], [171, 6384], [154, 6413], [80, 6388], [59, 6403], [47, 6390], [-27, 6404], [-26, 6433], [-7, 6444], [-14, 6480], [-32, 6505], [3, 6519], [-0, 6569], [39, 6609], [40, 6651], [79, 6650], [101, 6684], [141, 6697]]] } }, { "type": "Feature", "id": "RU.PS", "properties": { "hc-group": "admin1", "hc-middle-x": 0.49, "hc-middle-y": 0.44, "hc-key": "ru-ps", "hc-a2": "PS", "labelrank": "6", "hasc": "RU.PS", "alt-name": "Pskovskaya Oblast", "woe-id": "2346920", "subregion": "Northwestern", "fips": "RS60", "postal-code": "PS", "name": "Pskov", "country": "Russia", "type-en": "Region", "region": "Northwestern", "longitude": "29.1229", "woe-name": "Pskov", "latitude": "57.2449", "woe-label": "Pskovskaya Oblast, RU, Russia", "type": "Oblast" }, "geometry": { "type": "Polygon", "coordinates": [[[184, 6666], [170, 6700], [141, 6697], [144, 6767], [126, 6791], [91, 6812], [120, 6836], [114, 6867], [94, 6877], [105, 6901], [87, 6924], [140, 6967], [168, 7015], [159, 7025], [222, 7038], [233, 7089], [275, 7094], [296, 7066], [322, 7062], [335, 7088], [318, 7109], [326, 7123], [366, 7119], [427, 7156], [442, 7129], [431, 7111], [452, 7062], [444, 7012], [433, 6998], [446, 6965], [409, 6973], [390, 6960], [384, 6932], [401, 6888], [372, 6863], [332, 6849], [296, 6813], [310, 6789], [282, 6792], [273, 6759], [253, 6752], [253, 6706], [221, 6686], [206, 6692], [184, 6666]]] } }, { "type": "Feature", "id": "RU.TV", "properties": { "hc-group": "admin1", "hc-middle-x": 0.47, "hc-middle-y": 0.46, "hc-key": "ru-tv", "hc-a2": "TV", "labelrank": "6", "hasc": "RU.TV", "alt-name": "Kalinin|Kalininskaya|Tverskaya Oblast", "woe-id": "2346898", "subregion": "Central", "fips": "RS77", "postal-code": "TV", "name": "Tver'", "country": "Russia", "type-en": "Region", "region": "Central", "longitude": "34.5445", "woe-name": "Tver'", "latitude": "57.0297", "woe-label": "Tverskaya Oblast, RU, Russia", "type": "Oblast" }, "geometry": { "type": "Polygon", "coordinates": [[[184, 6666], [206, 6692], [221, 6686], [253, 6706], [253, 6752], [273, 6759], [282, 6792], [310, 6789], [331, 6749], [358, 6748], [404, 6710], [447, 6700], [466, 6664], [493, 6679], [541, 6674], [549, 6695], [589, 6678], [606, 6621], [627, 6628], [633, 6608], [665, 6608], [701, 6567], [723, 6561], [738, 6542], [791, 6544], [806, 6530], [788, 6466], [744, 6458], [745, 6429], [718, 6439], [700, 6408], [703, 6380], [679, 6365], [696, 6329], [671, 6323], [630, 6278], [618, 6295], [623, 6328], [593, 6329], [568, 6350], [541, 6336], [537, 6357], [474, 6387], [454, 6439], [383, 6418], [353, 6454], [350, 6496], [337, 6516], [315, 6513], [268, 6526], [240, 6552], [221, 6602], [202, 6619], [208, 6638], [184, 6666]]] } }, { "type": "Feature", "id": "RU.VO", "properties": { "hc-group": "admin1", "hc-middle-x": 0.34, "hc-middle-y": 0.35, "hc-key": "ru-vo", "hc-a2": "VO", "labelrank": "6", "hasc": "RU.VO", "alt-name": "Vologodskaya Oblast", "woe-id": "2346934", "subregion": "Northern", "fips": "RS85", "postal-code": "VO", "name": "Vologda", "country": "Russia", "type-en": "Region", "region": "Northwestern", "longitude": "40.9333", "woe-name": "Vologda", "latitude": "59.6397", "woe-label": "Vologodskaya Oblast, RU, Russia", "type": "Oblast" }, "geometry": { "type": "Polygon", "coordinates": [[[788, 6466], [806, 6530], [791, 6544], [738, 6542], [723, 6561], [735, 6565], [737, 6613], [708, 6652], [722, 6657], [723, 6700], [792, 6681], [820, 6696], [853, 6728], [844, 6750], [917, 6787], [932, 6808], [956, 6798], [1000, 6815], [1062, 6783], [1081, 6787], [1106, 6768], [1107, 6744], [1131, 6718], [1098, 6675], [1092, 6659], [1092, 6658], [1091, 6654], [1090, 6655], [1085, 6641], [1082, 6597], [1105, 6588], [1110, 6555], [1131, 6543], [1134, 6519], [1187, 6485], [1202, 6439], [1225, 6456], [1251, 6438], [1266, 6393], [1289, 6388], [1296, 6355], [1322, 6333], [1361, 6344], [1387, 6330], [1378, 6316], [1424, 6256], [1457, 6280], [1477, 6259], [1467, 6244], [1485, 6209], [1506, 6208], [1515, 6159], [1442, 6113], [1416, 6134], [1415, 6101], [1442, 6082], [1411, 6062], [1400, 6028], [1362, 6067], [1332, 6041], [1292, 6048], [1246, 6093], [1234, 6092], [1205, 6128], [1171, 6191], [1122, 6219], [1127, 6241], [1104, 6266], [1110, 6285], [1075, 6259], [1062, 6274], [1024, 6283], [992, 6269], [962, 6273], [921, 6317], [933, 6346], [930, 6382], [902, 6425], [879, 6409], [835, 6461], [788, 6466]], [[1211, 6123], [1214, 6129], [1211, 6130], [1210, 6123], [1211, 6123]]] } }, { "type": "Feature", "id": "RU.IV", "properties": { "hc-group": "admin1", "hc-middle-x": 0.49, "hc-middle-y": 0.49, "hc-key": "ru-iv", "hc-a2": "IV", "labelrank": "7", "hasc": "RU.IV", "alt-name": "Ivanovskaya Oblast", "woe-id": "2346897", "subregion": "Central", "fips": "RS21", "postal-code": "IV", "name": "Ivanovo", "country": "Russia", "type-en": "Region", "region": "Central", "longitude": "41.6244", "woe-name": "Ivanovo", "latitude": "57.1213", "woe-label": "Ivanovskaya Oblast, RU, Russia", "type": "Oblast" }, "geometry": { "type": "Polygon", "coordinates": [[[691, 6203], [724, 6219], [757, 6212], [799, 6183], [839, 6151], [877, 6132], [912, 6154], [923, 6103], [970, 6073], [944, 6052], [968, 6025], [999, 6022], [999, 6002], [997, 5985], [969, 5993], [955, 5965], [929, 5962], [884, 5992], [850, 5958], [828, 5971], [816, 5994], [793, 5999], [801, 6021], [747, 6074], [731, 6118], [694, 6126], [696, 6163], [715, 6176], [691, 6203]]] } }, { "type": "Feature", "id": "RU.YS", "properties": { "hc-group": "admin1", "hc-middle-x": 0.61, "hc-middle-y": 0.45, "hc-key": "ru-ys", "hc-a2": "YS", "labelrank": "6", "hasc": "RU.YS", "alt-name": "Yaroslavskaya Oblast", "woe-id": "2346936", "subregion": "Central", "fips": "RS88", "postal-code": "YS", "name": "Yaroslavl'", "country": "Russia", "type-en": "Region", "region": "Central", "longitude": "39.2547", "woe-name": "Yaroslavl'", "latitude": "57.7329", "woe-label": "Yaroslavskaya Oblast, RU, Russia", "type": "Oblast" }, "geometry": { "type": "Polygon", "coordinates": [[[799, 6183], [757, 6212], [724, 6219], [691, 6203], [658, 6192], [642, 6225], [621, 6238], [628, 6264], [627, 6270], [630, 6278], [671, 6323], [696, 6329], [679, 6365], [703, 6380], [700, 6408], [718, 6439], [745, 6429], [744, 6458], [788, 6466], [835, 6461], [879, 6409], [902, 6425], [930, 6382], [933, 6346], [921, 6317], [962, 6273], [952, 6238], [875, 6231], [836, 6197], [834, 6207], [799, 6183]]] } }, { "type": "Feature", "id": "RU.KG", "properties": { "hc-group": "admin1", "hc-middle-x": 0.51, "hc-middle-y": 0.52, "hc-key": "ru-kg", "hc-a2": "KG", "labelrank": "7", "hasc": "RU.KG", "alt-name": "Kaluzhskaya Oblast", "woe-id": "2346899", "subregion": "Central", "fips": "RS25", "postal-code": "KG", "name": "Kaluga", "country": "Russia", "type-en": "Region", "region": "Central", "longitude": "35.3416", "woe-name": "Kaluga", "latitude": "54.2421", "woe-label": "Kaluzhskaya Oblast, RU, Russia", "type": "Oblast" }, "geometry": { "type": "Polygon", "coordinates": [[[390, 6239], [385, 6215], [375, 6204], [370, 6192], [365, 6182], [322, 6170], [316, 6195], [301, 6165], [285, 6161], [262, 6193], [232, 6214], [225, 6192], [185, 6197], [164, 6171], [114, 6198], [92, 6192], [81, 6213], [86, 6226], [63, 6268], [84, 6278], [100, 6327], [82, 6351], [80, 6388], [154, 6413], [171, 6384], [168, 6359], [200, 6362], [237, 6343], [313, 6348], [328, 6338], [352, 6283], [375, 6280], [390, 6239]]] } }, { "type": "Feature", "id": "RU.BR", "properties": { "hc-group": "admin1", "hc-middle-x": 0.62, "hc-middle-y": 0.63, "hc-key": "ru-br", "hc-a2": "BR", "labelrank": "7", "hasc": "RU.BR", "alt-name": "Bryanskaya Oblast", "woe-id": "2346892", "subregion": "Central", "fips": "RS10", "postal-code": "BR", "name": "Bryansk", "country": "Russia", "type-en": "Region", "region": "Central", "longitude": "33.2803", "woe-name": "Bryansk", "latitude": "53.0868", "woe-label": "Bryanskaya Oblast, RU, Russia", "type": "Oblast" }, "geometry": { "type": "Polygon", "coordinates": [[[80, 6388], [82, 6351], [100, 6327], [84, 6278], [63, 6268], [86, 6226], [81, 6213], [63, 6201], [65, 6178], [15, 6201], [11, 6166], [-38, 6153], [-82, 6148], [-115, 6164], [-126, 6153], [-126, 6185], [-103, 6205], [-96, 6238], [-117, 6255], [-125, 6287], [-153, 6299], [-174, 6350], [-208, 6342], [-230, 6366], [-214, 6412], [-154, 6456], [-147, 6488], [-117, 6488], [-102, 6462], [-99, 6427], [-70, 6410], [-27, 6404], [47, 6390], [59, 6403], [80, 6388]]] } }, { "type": "Feature", "id": "RU.KS", "properties": { "hc-group": "admin1", "hc-middle-x": 0.15, "hc-middle-y": 0.28, "hc-key": "ru-ks", "hc-a2": "KS", "labelrank": "7", "hasc": "RU.KS", "alt-name": "Kurskaya Oblast", "woe-id": "2346905", "subregion": "Central Black Earth", "fips": "RS41", "postal-code": "KS", "name": "Kursk", "country": "Russia", "type-en": "Region", "region": "Central", "longitude": "36.2921", "woe-name": "Kursk", "latitude": "51.7358", "woe-label": "Kurskaya Oblast, RU, Russia", "type": "Oblast" }, "geometry": { "type": "Polygon", "coordinates": [[[-173, 6014], [-158, 6046], [-180, 6072], [-201, 6123], [-181, 6123], [-155, 6161], [-126, 6153], [-115, 6164], [-82, 6148], [-38, 6153], [7, 6107], [-10, 6090], [43, 6043], [42, 5988], [56, 5958], [53, 5932], [84, 5910], [84, 5879], [110, 5864], [88, 5832], [64, 5847], [38, 5807], [24, 5853], [-24, 5899], [-36, 5892], [-84, 5918], [-112, 5975], [-146, 5970], [-173, 6014]]] } }, { "type": "Feature", "id": "RU.LP", "properties": { "hc-group": "admin1", "hc-middle-x": 0.57, "hc-middle-y": 0.42, "hc-key": "ru-lp", "hc-a2": "LP", "labelrank": "7", "hasc": "RU.LP", "alt-name": "Lipetskaya Oblast", "woe-id": "2346908", "subregion": "Central Black Earth", "fips": "RS43", "postal-code": "LP", "name": "Lipetsk", "country": "Russia", "type-en": "Region", "region": "Central", "longitude": "39.2073", "woe-name": "Lipetsk", "latitude": "52.7462", "woe-label": "Lipetskaya Oblast, RU, Russia", "type": "Oblast" }, "geometry": { "type": "Polygon", "coordinates": [[[110, 5864], [84, 5879], [84, 5910], [102, 5919], [137, 5915], [147, 5962], [176, 5966], [197, 5986], [208, 5986], [220, 5946], [245, 5935], [266, 5966], [290, 5952], [317, 5958], [315, 5922], [369, 5901], [367, 5849], [306, 5807], [282, 5803], [279, 5754], [287, 5716], [242, 5701], [183, 5776], [177, 5810], [156, 5816], [149, 5846], [110, 5864]]] } }, { "type": "Feature", "id": "RU.2509", "properties": { "hc-group": "admin1", "hc-middle-x": 0.56, "hc-middle-y": 0.76, "hc-key": "ru-2509", "hc-a2": "MO", "labelrank": "2", "hasc": "RU.MS", "alt-name": "Moskovsskaya Oblast", "woe-id": "2346911", "subregion": "Central", "fips": null, "postal-code": null, "name": "Moskovsskaya", "country": "Russia", "type-en": "Region", "region": "Central", "longitude": "38.671", "woe-name": "Moskovsskaya", "latitude": "55.1508", "woe-label": "Moskovskaya Oblast, RU, Russia", "type": "Oblast" }, "geometry": { "type": "Polygon", "coordinates": [[[630, 6278], [627, 6270], [628, 6264], [603, 6250], [560, 6185], [578, 6155], [579, 6118], [612, 6094], [603, 6057], [578, 6022], [531, 6038], [536, 6023], [486, 6038], [450, 6029], [425, 6053], [410, 6030], [378, 6032], [391, 6076], [409, 6080], [394, 6117], [401, 6134], [371, 6152], [365, 6182], [370, 6192], [375, 6204], [413, 6199], [504, 6229], [489, 6257], [464, 6240], [429, 6239], [422, 6262], [390, 6239], [375, 6280], [352, 6283], [328, 6338], [313, 6348], [316, 6357], [373, 6392], [383, 6418], [454, 6439], [474, 6387], [537, 6357], [541, 6336], [568, 6350], [593, 6329], [623, 6328], [618, 6295], [630, 6278]], [[452, 6263], [459, 6263], [451, 6274], [445, 6271], [452, 6263]], [[496, 6276], [498, 6288], [489, 6284], [489, 6276], [496, 6276]]] } }, { "type": "Feature", "id": "RU.OL", "properties": { "hc-group": "admin1", "hc-middle-x": 0.55, "hc-middle-y": 0.48, "hc-key": "ru-ol", "hc-a2": "OL", "labelrank": "7", "hasc": "RU.OL", "alt-name": "Orlovskaya|Or'ol|Oryol|Orlovskaya Oblast", "woe-id": "2346917", "subregion": "Central", "fips": "RS56", "postal-code": "OL", "name": "Orel", "country": "Russia", "type-en": "Region", "region": "Central", "longitude": "36.4166", "woe-name": "Orel", "latitude": "52.8778", "woe-label": "Orlovskaya Oblast, RU, Russia", "type": "Oblast" }, "geometry": { "type": "Polygon", "coordinates": [[[-38, 6153], [11, 6166], [15, 6201], [65, 6178], [63, 6201], [81, 6213], [92, 6192], [114, 6198], [164, 6171], [171, 6086], [188, 6053], [213, 6030], [199, 6020], [197, 5986], [176, 5966], [147, 5962], [137, 5915], [102, 5919], [84, 5910], [53, 5932], [56, 5958], [42, 5988], [43, 6043], [-10, 6090], [7, 6107], [-38, 6153]]] } }, { "type": "Feature", "id": "RU.NZ", "properties": { "hc-group": "admin1", "hc-middle-x": 0.27, "hc-middle-y": 0.40, "hc-key": "ru-nz", "hc-a2": "NZ", "labelrank": "2", "hasc": "RU.NZ", "alt-name": "Gor'kiy|Gor'kovskaya|Gorky|Nizhegorodskaya|Nizhniy-Novgorod", "woe-id": "2346895", "subregion": "Volga-Vyatka", "fips": "RS51", "postal-code": "NZ", "name": "Nizhegorod", "country": "Russia", "type-en": "Region", "region": "Volga", "longitude": "44.7751", "woe-name": "Nizhegorod", "latitude": "56.1384", "woe-label": "Nizhegorodskaya Oblast, RU, Russia", "type": "Oblast" }, "geometry": { "type": "Polygon", "coordinates": [[[662, 5833], [675, 5848], [653, 5860], [648, 5901], [698, 5907], [713, 5930], [750, 5924], [803, 5937], [819, 5926], [828, 5971], [850, 5958], [884, 5992], [929, 5962], [955, 5965], [969, 5993], [997, 5985], [999, 6002], [1036, 5973], [1104, 5976], [1124, 5996], [1154, 5958], [1208, 5913], [1208, 5902], [1263, 5852], [1277, 5826], [1223, 5795], [1179, 5833], [1124, 5780], [1069, 5813], [1046, 5793], [1024, 5803], [1012, 5790], [1026, 5770], [1005, 5757], [1006, 5716], [953, 5697], [960, 5647], [917, 5638], [899, 5625], [881, 5642], [890, 5659], [859, 5661], [844, 5647], [803, 5655], [791, 5629], [753, 5658], [739, 5707], [745, 5731], [724, 5783], [693, 5786], [664, 5815], [662, 5833]]] } }, { "type": "Feature", "id": "RU.PZ", "properties": { "hc-group": "admin1", "hc-middle-x": 0.61, "hc-middle-y": 0.63, "hc-key": "ru-pz", "hc-a2": "PZ", "labelrank": "7", "hasc": "RU.PZ", "alt-name": "Penzenskaya Oblast", "woe-id": "2346918", "subregion": "Volga", "fips": "RS57", "postal-code": "PZ", "name": "Penza", "country": "Russia", "type-en": "Region", "region": "Volga", "longitude": "44.8159", "woe-name": "Penza", "latitude": "53.0562", "woe-label": "Penzenskaya Oblast, RU, Russia", "type": "Oblast" }, "geometry": { "type": "Polygon", "coordinates": [[[534, 5757], [540, 5753], [548, 5748], [550, 5725], [574, 5716], [598, 5691], [617, 5705], [649, 5664], [641, 5641], [669, 5585], [686, 5577], [696, 5601], [740, 5574], [742, 5555], [782, 5538], [800, 5502], [781, 5445], [792, 5401], [744, 5340], [719, 5334], [687, 5374], [641, 5368], [618, 5405], [586, 5424], [570, 5422], [560, 5476], [524, 5467], [496, 5519], [450, 5561], [455, 5576], [486, 5575], [504, 5734], [534, 5757]]] } }, { "type": "Feature", "id": "RU.VL", "properties": { "hc-group": "admin1", "hc-middle-x": 0.49, "hc-middle-y": 0.70, "hc-key": "ru-vl", "hc-a2": "VL", "labelrank": "7", "hasc": "RU.VL", "alt-name": "Vladimirskaya", "woe-id": "2346932", "subregion": "Central", "fips": "RS83", "postal-code": "VL", "name": "Vladimir", "country": "Russia", "type-en": "Region", "region": "Central", "longitude": "40.6207", "woe-name": "Vladimir", "latitude": "55.8966", "woe-label": "Vladimirskaya Oblast, RU, Russia", "type": "Oblast" }, "geometry": { "type": "Polygon", "coordinates": [[[628, 6264], [621, 6238], [642, 6225], [658, 6192], [691, 6203], [715, 6176], [696, 6163], [694, 6126], [731, 6118], [747, 6074], [801, 6021], [793, 5999], [816, 5994], [828, 5971], [819, 5926], [803, 5937], [750, 5924], [713, 5930], [698, 5907], [648, 5901], [628, 5925], [615, 5967], [590, 5985], [597, 6003], [578, 6022], [603, 6057], [612, 6094], [579, 6118], [578, 6155], [560, 6185], [603, 6250], [628, 6264]]] } }, { "type": "Feature", "id": "RU.VR", "properties": { "hc-group": "admin1", "hc-middle-x": 0.42, "hc-middle-y": 0.65, "hc-key": "ru-vr", "hc-a2": "VR", "labelrank": "6", "hasc": "RU.VR", "alt-name": "Voronezhskaya Oblast", "woe-id": "2346935", "subregion": "Central Black Earth", "fips": "RS86", "postal-code": "VR", "name": "Voronezh", "country": "Russia", "type-en": "Region", "region": "Central", "longitude": "40.5223", "woe-name": "Voronezh", "latitude": "50.7774", "woe-label": "Voronezhskaya Oblast, RU, Russia", "type": "Oblast" }, "geometry": { "type": "Polygon", "coordinates": [[[-29, 5521], [-54, 5541], [-50, 5576], [-65, 5594], [-60, 5617], [-36, 5629], [-11, 5681], [15, 5692], [10, 5732], [32, 5731], [41, 5755], [21, 5781], [38, 5807], [64, 5847], [88, 5832], [110, 5864], [149, 5846], [156, 5816], [177, 5810], [183, 5776], [242, 5701], [263, 5664], [244, 5654], [276, 5629], [318, 5543], [332, 5528], [334, 5481], [319, 5466], [269, 5501], [249, 5535], [224, 5529], [163, 5548], [167, 5505], [118, 5484], [101, 5472], [66, 5479], [32, 5471], [-1, 5491], [-29, 5521]]] } }, { "type": "Feature", "id": "RU.KO", "properties": { "hc-group": "admin1", "hc-middle-x": 0.46, "hc-middle-y": 0.52, "hc-key": "ru-ko", "hc-a2": "KO", "labelrank": "2", "hasc": "RU.KO", "alt-name": "Komi A.S.S.R.|Republic of Komi|Respublika Komi", "woe-id": "2346874", "subregion": "Northern", "fips": "RS34", "postal-code": "KO", "name": "Komi", "country": "Russia", "type-en": "Republic", "region": "Northwestern", "longitude": "55.8183", "woe-name": "Komi", "latitude": "64.1194", "woe-label": "Komi, RU, Russia", "type": "Respublika" }, "geometry": { "type": "Polygon", "coordinates": [[[2325, 5753], [2307, 5742], [2295, 5721], [2241, 5723], [2123, 5802], [2096, 5802], [2071, 5782], [2050, 5804], [2028, 5791], [2008, 5811], [1967, 5795], [1910, 5856], [1895, 5844], [1873, 5868], [1885, 5884], [1862, 5911], [1845, 5899], [1827, 5918], [1810, 5907], [1786, 5931], [1756, 5906], [1773, 5862], [1755, 5842], [1748, 5861], [1684, 5845], [1668, 5879], [1637, 5870], [1608, 5888], [1557, 5893], [1519, 5852], [1503, 5865], [1518, 5882], [1499, 5918], [1515, 5933], [1488, 5967], [1530, 6020], [1562, 6023], [1589, 6092], [1612, 6108], [1668, 6083], [1714, 6120], [1701, 6150], [1747, 6185], [1761, 6184], [1830, 6240], [1798, 6279], [1762, 6292], [1720, 6252], [1692, 6277], [1662, 6280], [1668, 6305], [1696, 6334], [1707, 6362], [1734, 6360], [1761, 6373], [1750, 6422], [1771, 6437], [1782, 6468], [1777, 6500], [1759, 6533], [1760, 6576], [1788, 6568], [1902, 6474], [1905, 6448], [1956, 6453], [1978, 6429], [1998, 6436], [2023, 6401], [2058, 6423], [2047, 6450], [2060, 6514], [2030, 6535], [2110, 6626], [2285, 6603], [2296, 6618], [2346, 6611], [2409, 6548], [2651, 6386], [2715, 6347], [2795, 6306], [2881, 6321], [2896, 6344], [2969, 6356], [2972, 6376], [3018, 6382], [3041, 6404], [3079, 6390], [3056, 6367], [3047, 6325], [3081, 6312], [3068, 6274], [3051, 6280], [3056, 6253], [2988, 6230], [2970, 6201], [2855, 6190], [2791, 6147], [2783, 6128], [2729, 6132], [2660, 6105], [2660, 6096], [2599, 6071], [2582, 6107], [2534, 6087], [2492, 6023], [2500, 6005], [2471, 5987], [2411, 5924], [2383, 5879], [2372, 5811], [2329, 5770], [2325, 5753]]] } }, { "type": "Feature", "id": "RU.SV", "properties": { "hc-group": "admin1", "hc-middle-x": 0.64, "hc-middle-y": 0.50, "hc-key": "ru-sv", "hc-a2": "SV", "labelrank": "6", "hasc": "RU.SV", "alt-name": "Yekaterinburg|Sverdlovskaya Oblast", "woe-id": "2346926", "subregion": "Urals", "fips": "RS71", "postal-code": "SV", "name": "Sverdlovsk", "country": "Russia", "type-en": "Region", "region": "Urals", "longitude": "61.7078", "woe-name": "Sverdlovsk", "latitude": "58.8952", "woe-label": "Sverdlovskaya Oblast, RU, Russia", "type": "Oblast" }, "geometry": { "type": "Polygon", "coordinates": [[[2295, 5721], [2307, 5742], [2325, 5753], [2349, 5725], [2341, 5700], [2407, 5656], [2461, 5567], [2470, 5514], [2454, 5500], [2449, 5414], [2464, 5384], [2456, 5331], [2438, 5291], [2511, 5234], [2519, 5126], [2535, 5112], [2522, 5069], [2521, 5029], [2399, 5024], [2375, 4943], [2373, 4904], [2359, 4909], [2351, 4924], [2309, 4930], [2279, 4901], [2231, 4948], [2163, 4964], [2164, 4976], [2111, 4958], [2100, 4939], [2080, 4979], [2039, 5003], [2037, 4987], [1969, 5023], [1936, 5058], [1895, 5084], [1878, 5071], [1850, 5070], [1762, 5137], [1773, 5161], [1796, 5205], [1799, 5231], [1826, 5220], [1873, 5217], [1903, 5279], [1927, 5288], [1949, 5259], [1976, 5265], [1980, 5306], [2074, 5331], [2084, 5359], [2068, 5379], [2101, 5421], [2068, 5494], [2094, 5517], [2149, 5533], [2217, 5585], [2239, 5610], [2256, 5668], [2287, 5696], [2295, 5721]]] } }, { "type": "Feature", "id": "RU.BK", "properties": { "hc-group": "admin1", "hc-middle-x": 0.35, "hc-middle-y": 0.50, "hc-key": "ru-bk", "hc-a2": "BK", "labelrank": "2", "hasc": "RU.BK", "alt-name": "Bashkir|Bashkiriya|Bashkirskaya A.S.S.R.|Republic of Bashkortostan|Respublika Bashkortostan", "woe-id": "2346866", "subregion": "Urals", "fips": "RS08", "postal-code": "BK", "name": "Bashkortostan", "country": "Russia", "type-en": "Republic", "region": "Volga", "longitude": "56.5575", "woe-name": "Bashkortostan", "latitude": "54.2086", "woe-label": "Bashkortostan, RU, Russia", "type": "Respublika" }, "geometry": { "type": "Polygon", "coordinates": [[[1476, 5294], [1517, 5291], [1562, 5309], [1591, 5320], [1602, 5275], [1636, 5254], [1679, 5247], [1676, 5219], [1707, 5215], [1718, 5161], [1742, 5153], [1773, 5161], [1762, 5137], [1850, 5070], [1878, 5071], [1895, 5054], [1861, 5019], [1870, 4967], [1839, 4977], [1828, 4965], [1792, 4976], [1780, 4944], [1760, 4944], [1751, 4985], [1710, 4972], [1740, 5009], [1707, 5040], [1661, 5030], [1642, 4996], [1662, 4960], [1673, 4908], [1712, 4908], [1725, 4888], [1771, 4886], [1782, 4876], [1834, 4894], [1852, 4865], [1808, 4842], [1800, 4806], [1784, 4798], [1761, 4820], [1733, 4806], [1710, 4809], [1651, 4728], [1647, 4708], [1603, 4667], [1596, 4637], [1596, 4616], [1560, 4618], [1558, 4599], [1524, 4574], [1491, 4591], [1460, 4629], [1401, 4620], [1398, 4647], [1374, 4677], [1390, 4681], [1391, 4723], [1369, 4742], [1398, 4742], [1406, 4769], [1397, 4799], [1349, 4782], [1334, 4804], [1358, 4857], [1339, 4868], [1349, 4936], [1307, 4991], [1301, 5053], [1311, 5095], [1328, 5135], [1377, 5164], [1379, 5235], [1416, 5219], [1451, 5222], [1499, 5240], [1496, 5269], [1476, 5294]]] } }, { "type": "Feature", "id": "RU.UD", "properties": { "hc-group": "admin1", "hc-middle-x": 0.52, "hc-middle-y": 0.48, "hc-key": "ru-ud", "hc-a2": "UD", "labelrank": "2", "hasc": "RU.UD", "alt-name": "Udmurtiya|Udmurt Republic|Udmurtskaya A.S.S.R.|Udmurtskaya Respublika", "woe-id": "2346880", "subregion": "Urals", "fips": "RS80", "postal-code": "UD", "name": "Udmurt", "country": "Russia", "type-en": "Republic", "region": "Volga", "longitude": "52.7957", "woe-name": "Udmurt", "latitude": "57.3433", "woe-label": "Udmurtiya, RU, Russia", "type": "Respublika" }, "geometry": { "type": "Polygon", "coordinates": [[[1562, 5309], [1517, 5291], [1476, 5294], [1448, 5306], [1494, 5329], [1479, 5352], [1471, 5330], [1456, 5359], [1490, 5390], [1433, 5388], [1444, 5370], [1419, 5357], [1395, 5387], [1384, 5370], [1329, 5410], [1362, 5424], [1348, 5434], [1377, 5503], [1390, 5495], [1419, 5509], [1411, 5523], [1425, 5572], [1445, 5589], [1469, 5569], [1505, 5576], [1536, 5613], [1538, 5643], [1583, 5661], [1634, 5612], [1662, 5613], [1662, 5587], [1695, 5572], [1679, 5546], [1678, 5507], [1659, 5471], [1637, 5457], [1644, 5435], [1617, 5394], [1594, 5390], [1578, 5369], [1566, 5383], [1550, 5364], [1569, 5357], [1562, 5309]]] } }, { "type": "Feature", "id": "RU.MR", "properties": { "hc-group": "admin1", "hc-middle-x": 0.37, "hc-middle-y": 0.43, "hc-key": "ru-mr", "hc-a2": "MR", "labelrank": "2", "hasc": "RU.MR", "alt-name": "Mordov|Mordvian Autonomous Republic|Mordvinia|Republic of Mordovia|Mordovian A.S.S.R.", "woe-id": "2346876", "subregion": "Volga-Vyatka", "fips": "RS46", "postal-code": "MR", "name": "Mordovia", "country": "Russia", "type-en": "Republic", "region": "Volga", "longitude": "44.4631", "woe-name": "Mordovia", "latitude": "54.1154", "woe-label": "Mordoviya, RU, Russia", "type": "Respublika" }, "geometry": { "type": "Polygon", "coordinates": [[[897, 5574], [874, 5544], [873, 5513], [815, 5542], [782, 5538], [742, 5555], [740, 5574], [696, 5601], [686, 5577], [669, 5585], [641, 5641], [649, 5664], [617, 5705], [598, 5691], [574, 5716], [550, 5725], [548, 5748], [569, 5749], [570, 5771], [599, 5760], [586, 5787], [621, 5777], [647, 5791], [646, 5824], [662, 5833], [664, 5815], [693, 5786], [724, 5783], [745, 5731], [739, 5707], [753, 5658], [791, 5629], [803, 5655], [844, 5647], [859, 5661], [890, 5659], [881, 5642], [899, 5625], [911, 5619], [897, 5574]], [[653, 5820], [657, 5827], [654, 5829], [651, 5823], [653, 5820]]] } }, { "type": "Feature", "id": "RU.CV", "properties": { "hc-group": "admin1", "hc-middle-x": 0.48, "hc-middle-y": 0.49, "hc-key": "ru-cv", "hc-a2": "CV", "labelrank": "2", "hasc": "RU.CV", "alt-name": "Chuvashskaya A.S.S.R.|Chuvashskaya Respublika|Chuvashiya|Chuvash Republic", "woe-id": "2346869", "subregion": "Volga-Vyatka", "fips": "RS16", "postal-code": "CV", "name": "Chuvash", "country": "Russia", "type-en": "Republic", "region": "Volga", "longitude": "47.1662", "woe-name": "Chuvash", "latitude": "55.4883", "woe-label": "Chuvashiya, RU, Russia", "type": "Respublika" }, "geometry": { "type": "Polygon", "coordinates": [[[897, 5574], [911, 5619], [899, 5625], [917, 5638], [960, 5647], [953, 5697], [1006, 5716], [1040, 5697], [1079, 5692], [1105, 5677], [1094, 5659], [1117, 5625], [1108, 5600], [1123, 5566], [1079, 5568], [1043, 5542], [1034, 5511], [990, 5498], [973, 5526], [940, 5516], [912, 5534], [897, 5574]]] } }, { "type": "Feature", "id": "RU.CL", "properties": { "hc-group": "admin1", "hc-middle-x": 0.34, "hc-middle-y": 0.68, "hc-key": "ru-cl", "hc-a2": "CL", "labelrank": "6", "hasc": "RU.CL", "alt-name": "Chelyabinskaya", "woe-id": "2346893", "subregion": "Urals", "fips": "RS13", "postal-code": "CL", "name": "Chelyabinsk", "country": "Russia", "type-en": "Region", "region": "Urals", "longitude": "60.2383", "woe-name": "Chelyabinsk", "latitude": "54.1131", "woe-label": "Chelyabinskaya Oblast, RU, Russia", "type": "Oblast" }, "geometry": { "type": "Polygon", "coordinates": [[[1878, 5071], [1895, 5084], [1936, 5058], [1969, 5023], [2037, 4987], [2039, 5003], [2080, 4979], [2100, 4939], [2095, 4897], [2106, 4887], [2099, 4842], [2060, 4846], [2041, 4835], [2051, 4818], [2037, 4795], [2022, 4808], [2009, 4754], [2046, 4747], [2041, 4734], [2094, 4717], [2091, 4692], [2063, 4674], [2072, 4646], [2001, 4661], [1921, 4692], [1893, 4718], [1881, 4693], [1853, 4680], [1872, 4655], [1845, 4628], [1903, 4572], [1898, 4554], [1856, 4570], [1849, 4584], [1809, 4591], [1761, 4578], [1769, 4522], [1726, 4516], [1663, 4528], [1661, 4546], [1691, 4555], [1702, 4573], [1677, 4599], [1634, 4623], [1613, 4602], [1596, 4637], [1603, 4667], [1647, 4708], [1651, 4728], [1710, 4809], [1733, 4806], [1761, 4820], [1784, 4798], [1800, 4806], [1808, 4842], [1852, 4865], [1834, 4894], [1782, 4876], [1771, 4886], [1725, 4888], [1712, 4908], [1673, 4908], [1662, 4960], [1642, 4996], [1661, 5030], [1707, 5040], [1740, 5009], [1710, 4972], [1751, 4985], [1760, 4944], [1780, 4944], [1792, 4976], [1828, 4965], [1839, 4977], [1870, 4967], [1861, 5019], [1895, 5054], [1878, 5071]]] } }, { "type": "Feature", "id": "RU.OB", "properties": { "hc-group": "admin1", "hc-middle-x": 0.34, "hc-middle-y": 0.35, "hc-key": "ru-ob", "hc-a2": "OB", "labelrank": "6", "hasc": "RU.OB", "alt-name": "Chkalov|Orenburgskaya|Orenburgskaya Oblast", "woe-id": "2346916", "subregion": "Urals", "fips": "RS55", "postal-code": "OB", "name": "Orenburg", "country": "Russia", "type-en": "Region", "region": "Volga", "longitude": "56.2149", "woe-name": "Orenburg", "latitude": "51.5157", "woe-label": "Orenburgskaya Oblast, RU, Russia", "type": "Oblast" }, "geometry": { "type": "Polygon", "coordinates": [[[1596, 4637], [1613, 4602], [1634, 4623], [1677, 4599], [1702, 4573], [1691, 4555], [1661, 4546], [1663, 4528], [1686, 4482], [1668, 4474], [1712, 4439], [1711, 4420], [1745, 4392], [1750, 4364], [1731, 4359], [1694, 4320], [1630, 4335], [1596, 4359], [1584, 4393], [1541, 4367], [1516, 4373], [1519, 4395], [1480, 4427], [1463, 4466], [1477, 4484], [1462, 4513], [1441, 4511], [1415, 4537], [1393, 4515], [1364, 4532], [1364, 4565], [1309, 4597], [1270, 4597], [1248, 4582], [1199, 4583], [1181, 4618], [1177, 4656], [1156, 4695], [1126, 4646], [1103, 4665], [1130, 4685], [1115, 4715], [1114, 4753], [1096, 4771], [1104, 4791], [1094, 4821], [1059, 4839], [1027, 4867], [1038, 4908], [995, 4926], [974, 4912], [936, 4938], [954, 4951], [921, 5001], [998, 4999], [1019, 5026], [1038, 5027], [1057, 5053], [1070, 5041], [1083, 5061], [1122, 5058], [1163, 5092], [1166, 5112], [1191, 5119], [1240, 5149], [1233, 5166], [1249, 5191], [1272, 5182], [1303, 5138], [1285, 5120], [1311, 5095], [1301, 5053], [1307, 4991], [1349, 4936], [1339, 4868], [1358, 4857], [1334, 4804], [1349, 4782], [1397, 4799], [1406, 4769], [1398, 4742], [1369, 4742], [1391, 4723], [1390, 4681], [1374, 4677], [1398, 4647], [1401, 4620], [1460, 4629], [1491, 4591], [1524, 4574], [1558, 4599], [1560, 4618], [1596, 4616], [1596, 4637]], [[1167, 5083], [1171, 5086], [1169, 5091], [1164, 5088], [1167, 5083]]] } }, { "type": "Feature", "id": "RU.SR", "properties": { "hc-group": "admin1", "hc-middle-x": 0.59, "hc-middle-y": 0.66, "hc-key": "ru-sr", "hc-a2": "SR", "labelrank": "6", "hasc": "RU.SR", "alt-name": "Saratovskaya Oblast", "woe-id": "2346924", "subregion": "Volga", "fips": "RS67", "postal-code": "SR", "name": "Saratov", "country": "Russia", "type-en": "Region", "region": "Volga", "longitude": "46.6368", "woe-name": "Saratov", "latitude": "51.6742", "woe-label": "Saratovskaya Oblast, RU, Russia", "type": "Oblast" }, "geometry": { "type": "Polygon", "coordinates": [[[319, 5466], [334, 5481], [332, 5528], [406, 5562], [450, 5561], [496, 5519], [524, 5467], [560, 5476], [570, 5422], [586, 5424], [618, 5405], [641, 5368], [687, 5374], [719, 5334], [730, 5314], [776, 5275], [790, 5280], [845, 5250], [828, 5244], [850, 5219], [843, 5184], [874, 5174], [891, 5134], [889, 5104], [913, 5073], [931, 5019], [921, 5001], [908, 4982], [896, 4999], [852, 4980], [790, 4992], [764, 5015], [740, 4989], [662, 5009], [642, 4982], [627, 4937], [573, 4947], [565, 4964], [576, 5013], [572, 5063], [553, 5069], [548, 5097], [526, 5121], [520, 5159], [498, 5152], [470, 5178], [478, 5211], [450, 5212], [416, 5239], [449, 5263], [455, 5305], [422, 5355], [395, 5364], [328, 5414], [319, 5466]]] } }, { "type": "Feature", "id": "RU.TT", "properties": { "hc-group": "admin1", "hc-middle-x": 0.48, "hc-middle-y": 0.29, "hc-key": "ru-tt", "hc-a2": "TT", "labelrank": "2", "hasc": "RU.TT", "alt-name": "Kazan|Kazanskaya G.|Tatar A.S.S.R.|Tatarskaya A.S.S.R.|Republic of Tatarstan|Respublika Tatars", "woe-id": "2346878", "subregion": "Volga", "fips": "RS73", "postal-code": "TT", "name": "Tatarstan", "country": "Russia", "type-en": "Republic", "region": "Volga", "longitude": "50.7364", "woe-name": "Tatarstan", "latitude": "55.374", "woe-label": "Tatarstan, RU, Russia", "type": "Respublika" }, "geometry": { "type": "Polygon", "coordinates": [[[1311, 5095], [1285, 5120], [1303, 5138], [1272, 5182], [1276, 5195], [1237, 5206], [1243, 5231], [1217, 5278], [1179, 5284], [1156, 5268], [1148, 5289], [1127, 5289], [1132, 5313], [1114, 5334], [1086, 5365], [1094, 5418], [1041, 5420], [1016, 5439], [1014, 5460], [978, 5491], [934, 5488], [940, 5516], [973, 5526], [990, 5498], [1034, 5511], [1043, 5542], [1079, 5568], [1123, 5566], [1153, 5565], [1220, 5586], [1273, 5566], [1283, 5544], [1301, 5558], [1323, 5549], [1311, 5503], [1331, 5492], [1317, 5477], [1334, 5433], [1348, 5434], [1362, 5424], [1329, 5410], [1384, 5370], [1395, 5387], [1419, 5357], [1444, 5370], [1433, 5388], [1490, 5390], [1456, 5359], [1471, 5330], [1479, 5352], [1494, 5329], [1448, 5306], [1476, 5294], [1496, 5269], [1499, 5240], [1451, 5222], [1416, 5219], [1379, 5235], [1377, 5164], [1328, 5135], [1311, 5095]], [[1019, 5498], [1021, 5497], [1027, 5498], [1025, 5501], [1019, 5498]]] } }, { "type": "Feature", "id": "RU.TO", "properties": { "hc-group": "admin1", "hc-middle-x": 0.48, "hc-middle-y": 0.45, "hc-key": "ru-to", "hc-a2": "TO", "labelrank": "6", "hasc": "RU.TO", "alt-name": "Tomskaya", "woe-id": "2346928", "subregion": "West Siberian", "fips": "RS75", "postal-code": "TO", "name": "Tomsk", "country": "Russia", "type-en": "Region", "region": "Siberian", "longitude": "82.2299", "woe-name": "Tomsk", "latitude": "58.4467", "woe-label": "Tomskaya Oblast, RU, Russia", "type": "Oblast" }, "geometry": { "type": "Polygon", "coordinates": [[[3214, 4867], [3220, 4871], [3221, 4875], [3269, 4910], [3277, 4945], [3328, 4977], [3365, 4974], [3401, 5063], [3402, 5090], [3422, 5096], [3441, 5139], [3558, 5103], [3586, 5106], [3595, 5080], [3654, 5069], [3697, 5081], [3724, 5054], [3775, 5047], [3795, 5028], [3818, 5052], [3877, 5088], [3904, 5088], [3936, 5053], [3956, 5055], [3988, 4983], [3964, 4930], [3975, 4919], [4035, 4912], [4071, 4918], [4155, 4903], [4163, 4875], [4189, 4867], [4216, 4814], [4266, 4817], [4284, 4779], [4249, 4762], [4212, 4710], [4228, 4651], [4283, 4629], [4321, 4627], [4325, 4583], [4283, 4555], [4254, 4509], [4270, 4507], [4261, 4472], [4244, 4472], [4189, 4435], [4139, 4455], [4127, 4436], [4100, 4451], [4047, 4434], [4002, 4410], [3901, 4384], [3862, 4383], [3831, 4344], [3796, 4353], [3814, 4372], [3791, 4423], [3810, 4452], [3798, 4466], [3732, 4447], [3665, 4443], [3634, 4487], [3565, 4485], [3518, 4562], [3430, 4607], [3431, 4612], [3309, 4643], [3246, 4666], [3219, 4734], [3225, 4771], [3197, 4803], [3204, 4836], [3225, 4845], [3214, 4867]]] } }, { "type": "Feature", "id": "RU.TY", "properties": { "hc-group": "admin1", "hc-middle-x": 0.31, "hc-middle-y": 0.52, "hc-key": "ru-ty", "hc-a2": "TY", "labelrank": "6", "hasc": "RU.TY", "alt-name": "Tobol'sk|Tobol'skaya G.|Tyumenskaya Oblast", "woe-id": "20070528", "subregion": "West Siberian", "fips": "RS78", "postal-code": "TY", "name": "Tyumen'", "country": "Russia", "type-en": "Region", "region": "Urals", "longitude": "68.51860000000001", "woe-name": "Tyumen'", "latitude": "57.2639", "woe-label": "Tyumenskaya Oblast, RU, Russia", "type": "Oblast" }, "geometry": { "type": "Polygon", "coordinates": [[[3221, 4875], [3220, 4871], [3214, 4867], [3129, 4825], [3044, 4852], [3021, 4839], [2967, 4858], [2959, 4875], [2901, 4888], [2919, 4927], [2893, 4958], [2833, 4890], [2825, 4871], [2831, 4828], [2808, 4821], [2821, 4785], [2855, 4795], [2865, 4751], [2881, 4725], [2865, 4702], [2823, 4711], [2814, 4689], [2783, 4666], [2774, 4620], [2740, 4616], [2749, 4574], [2718, 4559], [2712, 4542], [2683, 4530], [2649, 4572], [2609, 4586], [2595, 4607], [2574, 4603], [2541, 4652], [2548, 4665], [2491, 4694], [2491, 4727], [2425, 4754], [2418, 4774], [2393, 4774], [2382, 4823], [2344, 4843], [2341, 4876], [2359, 4909], [2373, 4904], [2375, 4943], [2399, 5024], [2521, 5029], [2522, 5069], [2535, 5112], [2566, 5094], [2597, 5093], [2613, 5126], [2634, 5116], [2698, 5133], [2746, 5125], [2773, 5154], [2838, 5164], [2828, 5184], [2849, 5191], [2867, 5172], [2905, 5157], [2918, 5140], [2979, 5132], [2982, 5115], [3022, 5067], [3051, 4990], [3068, 4992], [3069, 4949], [3112, 4935], [3144, 4909], [3193, 4897], [3221, 4875]], [[2770, 4626], [2774, 4632], [2772, 4632], [2767, 4628], [2770, 4626]], [[2765, 4620], [2767, 4621], [2765, 4623], [2761, 4622], [2765, 4620]]] } }, { "type": "Feature", "id": "RU.GA", "properties": { "hc-group": "admin1", "hc-middle-x": 0.48, "hc-middle-y": 0.56, "hc-key": "ru-ga", "hc-a2": "GA", "labelrank": "7", "hasc": "RU.GA", "alt-name": "Gorno-Altayskaya A.Obl.|Respublika Altay|Oirot|Republic of Altai", "woe-id": "20070530", "subregion": "West Siberian", "fips": "RS03", "postal-code": "GA", "name": "Gorno-Altay", "country": "Russia", "type-en": "Republic", "region": "Siberian", "longitude": "86.937", "woe-name": "Gorno-Altay", "latitude": "50.9782", "woe-label": "Altay, RU, Russia", "type": "Respublika" }, "geometry": { "type": "Polygon", "coordinates": [[[4221, 3828], [4198, 3819], [4170, 3780], [4193, 3766], [4171, 3745], [4218, 3711], [4232, 3711], [4254, 3743], [4275, 3726], [4284, 3675], [4315, 3646], [4360, 3588], [4327, 3579], [4339, 3516], [4344, 3489], [4262, 3453], [4238, 3461], [4191, 3456], [4168, 3419], [4111, 3408], [4074, 3434], [4056, 3471], [4033, 3483], [4052, 3496], [4037, 3511], [3990, 3469], [3934, 3494], [3900, 3492], [3877, 3561], [3808, 3593], [3797, 3645], [3842, 3649], [3843, 3685], [3796, 3704], [3835, 3728], [3897, 3753], [3919, 3749], [3950, 3778], [3970, 3780], [3992, 3826], [4039, 3816], [4069, 3826], [4075, 3851], [4058, 3863], [4082, 3900], [4112, 3893], [4154, 3869], [4181, 3881], [4207, 3862], [4227, 3867], [4221, 3828]]] } }, { "type": "Feature", "id": "RU.KK", "properties": { "hc-group": "admin1", "hc-middle-x": 0.59, "hc-middle-y": 0.48, "hc-key": "ru-kk", "hc-a2": "KK", "labelrank": "2", "hasc": "RU.KK", "alt-name": "Khakassiya|Republic of Khakasia|Khakasskaya A.Obl.|Respublika Khakasiya|Republic of Khakasia", "woe-id": "20070519", "subregion": "East Siberian", "fips": "RS31", "postal-code": "KK", "name": "Khakass", "country": "Russia", "type-en": "Republic", "region": "Siberian", "longitude": "89.84050000000001", "woe-name": "Khakass", "latitude": "53.3643", "woe-label": "Khakasiya, RU, Russia", "type": "Respublika" }, "geometry": { "type": "Polygon", "coordinates": [[[4254, 3743], [4232, 3711], [4218, 3711], [4171, 3745], [4193, 3766], [4170, 3780], [4198, 3819], [4221, 3828], [4252, 3839], [4251, 3852], [4293, 3889], [4305, 3914], [4273, 3939], [4288, 3975], [4269, 4022], [4310, 4057], [4284, 4088], [4303, 4099], [4298, 4127], [4269, 4135], [4247, 4119], [4244, 4137], [4266, 4190], [4236, 4257], [4255, 4279], [4284, 4257], [4305, 4215], [4346, 4217], [4393, 4237], [4416, 4198], [4456, 4188], [4451, 4165], [4478, 4146], [4507, 4087], [4495, 4054], [4509, 4013], [4535, 4004], [4544, 3982], [4500, 3952], [4505, 3923], [4441, 3866], [4420, 3828], [4387, 3820], [4378, 3800], [4385, 3771], [4350, 3745], [4301, 3743], [4298, 3756], [4254, 3743]]] } }, { "type": "Feature", "id": "RU.CN", "properties": { "hc-group": "admin1", "hc-middle-x": 0.09, "hc-middle-y": 0.56, "hc-key": "ru-cn", "hc-a2": "CN", "labelrank": "2", "hasc": "RU.CN", "alt-name": "Cecenia|Chechenia|Chechênia|Tchetchnia|Chechen-Ingush A.S.S.R.|Checheno-Ingushetia|Checheno-Ingushetia", "woe-id": "2346868", "subregion": "North Caucasus", "fips": "RS12", "postal-code": "CN", "name": "Chechnya", "country": "Russia", "type-en": "Republic", "region": "Volga", "longitude": "45.757", "woe-name": null, "latitude": "43.2153", "woe-label": null, "type": "Respublika" }, "geometry": { "type": "Polygon", "coordinates": [[[-312, 4422], [-339, 4458], [-347, 4497], [-329, 4499], [-274, 4575], [-282, 4601], [-275, 4608], [-243, 4600], [-227, 4616], [-204, 4580], [-187, 4587], [-151, 4537], [-147, 4517], [-120, 4519], [-114, 4474], [-171, 4468], [-190, 4414], [-217, 4405], [-234, 4426], [-252, 4412], [-312, 4422]]] } }, { "type": "Feature", "id": "RU.KL", "properties": { "hc-group": "admin1", "hc-middle-x": 0.64, "hc-middle-y": 0.51, "hc-key": "ru-kl", "hc-a2": "KL", "labelrank": "2", "hasc": "RU.KL", "alt-name": "Kalmykiya|Khalmg Tangch|Republic of Kalmykia|Kalmytskaya A.S.S.R.|Respublika Kalmykiya", "woe-id": "2346872", "subregion": "Volga", "fips": "RS24", "postal-code": "KL", "name": "Kalmyk", "country": "Russia", "type-en": "Republic", "region": "Volga", "longitude": "45.4681", "woe-name": "Kalmyk", "latitude": "46.5191", "woe-label": "Kalmykiya, RU, Russia", "type": "Respublika" }, "geometry": { "type": "Polygon", "coordinates": [[[117, 4585], [115, 4576], [39, 4548], [-7, 4551], [-27, 4604], [-81, 4664], [-74, 4691], [-110, 4792], [-130, 4817], [-139, 4850], [-131, 4898], [-161, 4943], [-175, 5003], [-226, 5010], [-259, 5037], [-287, 5076], [-272, 5097], [-262, 5080], [-235, 5081], [-219, 5065], [-208, 5100], [-183, 5068], [-181, 5043], [-155, 5020], [-148, 4961], [-122, 4942], [-94, 4950], [-84, 4930], [-73, 4963], [-10, 4958], [51, 5007], [41, 5029], [2, 5017], [7, 5053], [25, 5074], [75, 5067], [93, 5040], [115, 5053], [125, 5083], [136, 5060], [123, 5047], [139, 5030], [168, 5030], [182, 4994], [194, 4946], [187, 4877], [198, 4853], [242, 4848], [243, 4834], [208, 4839], [193, 4778], [202, 4722], [162, 4725], [151, 4712], [129, 4732], [103, 4728], [128, 4697], [111, 4684], [140, 4662], [117, 4658], [69, 4632], [118, 4606], [117, 4585]]] } }, { "type": "Feature", "id": "RU.DA", "properties": { "hc-group": "admin1", "hc-middle-x": 0.41, "hc-middle-y": 0.70, "hc-key": "ru-da", "hc-a2": "DA", "labelrank": "2", "hasc": "RU.DA", "alt-name": "Dagestanskaya A.S.S.R.|Daghestan|Republic of Dagestan|Respublika Dagestan|Dagistan", "woe-id": "2346870", "subregion": "North Caucasus", "fips": "RS17", "postal-code": "DA", "name": "Dagestan", "country": "Russia", "type-en": "Republic", "region": "Volga", "longitude": "47.1424", "woe-name": "Dagestan", "latitude": "42.36", "woe-label": "Dagestan, RU, Russia", "type": "Respublika" }, "geometry": { "type": "Polygon", "coordinates": [[[-81, 4664], [-27, 4604], [-7, 4551], [-29, 4554], [-50, 4535], [-26, 4471], [-46, 4417], [-72, 4387], [-31, 4414], [5, 4403], [-37, 4399], [-74, 4378], [-116, 4337], [-109, 4303], [-120, 4262], [-123, 4134], [-164, 4124], [-203, 4137], [-242, 4127], [-287, 4185], [-283, 4281], [-336, 4362], [-345, 4408], [-312, 4422], [-252, 4412], [-234, 4426], [-217, 4405], [-190, 4414], [-171, 4468], [-114, 4474], [-120, 4519], [-147, 4517], [-151, 4537], [-187, 4587], [-171, 4604], [-201, 4636], [-167, 4625], [-152, 4661], [-108, 4651], [-81, 4664]]] } }, { "type": "Feature", "id": "RU.RO", "properties": { "hc-group": "admin1", "hc-middle-x": 0.49, "hc-middle-y": 0.47, "hc-key": "ru-ro", "hc-a2": "RO", "labelrank": "6", "hasc": "RU.RO", "alt-name": "Province of the Don Cossacks|Provinz des Donischen Heeres|Voyska Donskovo|Rostovskaya Oblast", "woe-id": "2346921", "subregion": "North Caucasus", "fips": "RS61", "postal-code": "RO", "name": "Rostov", "country": "Russia", "type-en": "Region", "region": "Volga", "longitude": "41.2613", "woe-name": "Rostov", "latitude": "47.9913", "woe-label": "Rostovskaya Oblast, RU, Russia", "type": "Oblast" }, "geometry": { "type": "Polygon", "coordinates": [[[-29, 5521], [-1, 5491], [32, 5471], [66, 5479], [101, 5472], [118, 5484], [108, 5441], [119, 5416], [116, 5372], [92, 5365], [57, 5330], [75, 5313], [78, 5272], [66, 5249], [35, 5236], [-7, 5263], [-60, 5234], [-29, 5197], [-28, 5164], [-46, 5115], [-30, 5086], [7, 5053], [2, 5017], [41, 5029], [51, 5007], [-10, 4958], [-73, 4963], [-84, 4930], [-94, 4950], [-122, 4942], [-148, 4961], [-155, 5020], [-181, 5043], [-183, 5068], [-208, 5100], [-219, 5065], [-235, 5081], [-262, 5080], [-272, 5097], [-287, 5076], [-309, 5101], [-331, 5117], [-320, 5163], [-356, 5214], [-339, 5246], [-348, 5260], [-328, 5282], [-380, 5347], [-401, 5340], [-424, 5367], [-401, 5380], [-409, 5402], [-364, 5383], [-354, 5366], [-328, 5387], [-414, 5461], [-395, 5478], [-352, 5491], [-319, 5466], [-295, 5473], [-235, 5396], [-200, 5414], [-174, 5416], [-143, 5480], [-116, 5470], [-116, 5505], [-98, 5489], [-63, 5489], [-29, 5521]]] } }, { "type": "Feature", "id": "RU.BL", "properties": { "hc-group": "admin1", "hc-middle-x": 0.43, "hc-middle-y": 0.65, "hc-key": "ru-bl", "hc-a2": "BL", "labelrank": "7", "hasc": "RU.BL", "alt-name": "Belgorodskaya Oblast", "woe-id": "2346891", "subregion": "Central Black Earth", "fips": "RS09", "postal-code": "BL", "name": "Belgorod", "country": "Russia", "type-en": "Region", "region": "Central", "longitude": "37.277", "woe-name": "Belgorod", "latitude": "50.8757", "woe-label": "Belgorodskaya Oblast, RU, Russia", "type": "Oblast" }, "geometry": { "type": "Polygon", "coordinates": [[[38, 5807], [21, 5781], [41, 5755], [32, 5731], [10, 5732], [15, 5692], [-11, 5681], [-36, 5629], [-60, 5617], [-81, 5631], [-101, 5712], [-129, 5712], [-127, 5749], [-107, 5800], [-147, 5834], [-181, 5849], [-192, 5881], [-186, 5905], [-218, 5932], [-218, 5962], [-195, 5976], [-173, 6014], [-146, 5970], [-112, 5975], [-84, 5918], [-36, 5892], [-24, 5899], [24, 5853], [38, 5807]]] } }, { "type": "Feature", "id": "RU.TU", "properties": { "hc-group": "admin1", "hc-middle-x": 0.72, "hc-middle-y": 0.48, "hc-key": "ru-tu", "hc-a2": "TU", "labelrank": "2", "hasc": "RU.TU", "alt-name": "Respublika Tyva|Republic of Tuva|Tyva|Tuvinskaya A.S.S.R.|Republic of Tyva", "woe-id": "2346879", "subregion": "East Siberian", "fips": "RS79", "postal-code": "TU", "name": "Tuva", "country": "Russia", "type-en": "Republic", "region": "Siberian", "longitude": "93.9927", "woe-name": "Tuva", "latitude": "51.6051", "woe-label": "Tyva, RU, Russia", "type": "Respublika" }, "geometry": { "type": "Polygon", "coordinates": [[[4981, 4063], [4997, 4078], [5040, 4065], [5069, 4037], [5103, 4039], [5133, 4026], [5138, 4010], [5173, 4022], [5206, 4020], [5227, 4003], [5199, 3993], [5205, 3960], [5182, 3922], [5188, 3899], [5216, 3885], [5194, 3834], [5168, 3822], [5162, 3787], [5146, 3784], [5132, 3717], [5159, 3671], [5188, 3659], [5178, 3594], [5105, 3538], [5069, 3556], [5010, 3549], [4958, 3561], [4926, 3540], [4881, 3544], [4864, 3556], [4835, 3549], [4805, 3579], [4791, 3621], [4671, 3622], [4665, 3643], [4635, 3627], [4600, 3649], [4587, 3627], [4547, 3625], [4515, 3594], [4475, 3588], [4446, 3568], [4381, 3540], [4372, 3524], [4339, 3516], [4327, 3579], [4360, 3588], [4315, 3646], [4284, 3675], [4275, 3726], [4254, 3743], [4298, 3756], [4301, 3743], [4350, 3745], [4385, 3771], [4378, 3800], [4387, 3820], [4420, 3828], [4455, 3791], [4522, 3791], [4565, 3777], [4646, 3786], [4693, 3830], [4722, 3844], [4729, 3875], [4759, 3931], [4793, 3944], [4796, 4000], [4855, 4025], [4867, 4014], [4900, 4038], [4931, 4032], [4942, 4055], [4961, 4044], [4981, 4063]]] } }, { "type": "Feature", "id": "RU.IR", "properties": { "hc-group": "admin1", "hc-middle-x": 0.46, "hc-middle-y": 0.61, "hc-key": "ru-ir", "hc-a2": "IR", "labelrank": "6", "hasc": "RU.IR", "alt-name": "Irkutskaya Oblast", "woe-id": "2346896", "subregion": "East Siberian", "fips": "RS20", "postal-code": "IR", "name": "Irkutsk", "country": "Russia", "type-en": "Region", "region": "Siberian", "longitude": "105.966", "woe-name": "Irkutsk", "latitude": "56.8255", "woe-label": "Irkutskaya Oblast, RU, Russia", "type": "Oblast" }, "geometry": { "type": "Polygon", "coordinates": [[[5227, 4003], [5206, 4020], [5173, 4022], [5138, 4010], [5133, 4026], [5103, 4039], [5069, 4037], [5040, 4065], [4997, 4078], [4981, 4063], [4964, 4068], [4920, 4115], [4882, 4135], [4913, 4186], [4957, 4183], [4963, 4240], [4950, 4252], [4957, 4286], [4974, 4298], [4954, 4354], [4979, 4407], [4999, 4402], [5014, 4424], [5013, 4451], [5033, 4455], [5020, 4508], [4994, 4510], [5003, 4530], [4981, 4540], [5014, 4651], [5082, 4658], [5098, 4652], [5132, 4667], [5148, 4711], [5173, 4715], [5219, 4646], [5246, 4633], [5261, 4656], [5242, 4700], [5264, 4718], [5259, 4735], [5288, 4757], [5301, 4792], [5329, 4807], [5350, 4842], [5332, 4899], [5370, 4931], [5428, 4887], [5449, 4891], [5503, 4861], [5530, 4885], [5518, 4896], [5552, 4947], [5526, 4993], [5512, 4987], [5490, 5015], [5501, 5039], [5527, 5044], [5518, 5105], [5474, 5100], [5453, 5110], [5424, 5165], [5439, 5217], [5429, 5240], [5496, 5308], [5488, 5327], [5514, 5364], [5501, 5392], [5517, 5449], [5494, 5455], [5455, 5499], [5462, 5531], [5481, 5552], [5464, 5563], [5467, 5617], [5458, 5637], [5514, 5633], [5516, 5654], [5554, 5673], [5527, 5692], [5558, 5705], [5582, 5674], [5587, 5648], [5562, 5640], [5565, 5606], [5622, 5623], [5653, 5601], [5679, 5549], [5689, 5546], [5687, 5487], [5731, 5491], [5748, 5460], [5736, 5412], [5767, 5376], [5775, 5344], [5808, 5332], [5829, 5339], [5837, 5272], [5825, 5231], [5825, 5183], [5834, 5172], [5826, 5083], [5889, 5035], [5933, 5059], [5940, 5096], [5976, 5099], [6027, 5131], [6035, 5169], [6050, 5146], [6077, 5153], [6084, 5119], [6136, 5176], [6128, 5219], [6152, 5247], [6170, 5302], [6167, 5337], [6185, 5372], [6215, 5407], [6248, 5405], [6285, 5415], [6322, 5404], [6364, 5367], [6368, 5336], [6433, 5347], [6452, 5381], [6506, 5363], [6503, 5344], [6542, 5306], [6554, 5273], [6582, 5273], [6597, 5241], [6567, 5217], [6535, 5227], [6486, 5209], [6477, 5190], [6495, 5127], [6481, 5114], [6577, 5033], [6572, 5006], [6555, 5016], [6530, 4969], [6489, 4968], [6473, 4955], [6433, 4959], [6461, 5001], [6427, 4998], [6406, 4966], [6377, 4956], [6379, 4894], [6331, 4867], [6328, 4844], [6286, 4847], [6274, 4835], [6222, 4831], [6203, 4855], [6192, 4835], [6140, 4822], [6104, 4836], [6107, 4806], [6093, 4789], [6045, 4775], [6002, 4778], [5984, 4730], [5962, 4729], [5913, 4689], [5916, 4648], [5936, 4649], [5982, 4614], [5963, 4612], [5957, 4539], [5979, 4514], [5998, 4439], [5992, 4417], [6033, 4424], [6014, 4314], [6006, 4225], [5873, 4076], [5848, 4010], [5802, 3955], [5762, 3929], [5770, 3881], [5733, 3873], [5700, 3844], [5692, 3878], [5667, 3885], [5646, 3873], [5625, 3895], [5624, 3918], [5577, 3935], [5548, 3963], [5487, 3962], [5440, 3988], [5351, 4023], [5322, 4048], [5309, 4075], [5275, 4058], [5263, 4033], [5235, 4026], [5227, 4003]]] } }, { "type": "Feature", "id": "RU.CT", "properties": { "hc-group": "admin1", "hc-middle-x": 0.72, "hc-middle-y": 0.45, "hc-key": "ru-ct", "hc-a2": "CT", "labelrank": "6", "hasc": "RU.CT", "alt-name": "Transbaikalia|Zabaykal'skaya|Transbaikalien|Chitinskaya Oblast", "woe-id": "2346894", "subregion": "East Siberian", "fips": "RS14", "postal-code": "CT", "name": "Chita", "country": "Russia", "type-en": "Region", "region": "Siberian", "longitude": "116.559", "woe-name": "Chita", "latitude": "52.159", "woe-label": "Chitinskaya Oblast, RU, Russia", "type": "Oblast" }, "geometry": { "type": "Polygon", "coordinates": [[[6597, 5241], [6627, 5179], [6646, 5159], [6668, 5165], [6711, 5135], [6719, 5114], [6745, 5111], [6736, 5087], [6777, 5066], [6803, 5074], [6833, 5065], [6809, 5028], [6836, 5001], [6885, 5053], [6902, 5063], [6926, 5045], [6949, 5009], [6980, 5044], [6997, 5034], [7029, 4977], [7022, 4942], [7041, 4950], [7060, 4924], [7084, 4921], [7055, 4898], [7078, 4846], [7113, 4837], [7150, 4796], [7097, 4738], [7071, 4723], [7053, 4646], [7041, 4622], [7053, 4604], [7081, 4626], [7111, 4629], [7117, 4601], [7146, 4581], [7143, 4546], [7122, 4495], [7132, 4409], [7124, 4377], [7134, 4356], [7128, 4296], [7148, 4302], [7162, 4270], [7149, 4247], [7112, 4221], [7089, 4165], [7063, 4126], [7011, 4116], [6894, 4117], [6860, 4081], [6825, 4066], [6750, 4082], [6706, 4068], [6656, 4008], [6633, 3968], [6630, 3932], [6606, 3908], [6576, 3901], [6545, 3871], [6482, 3839], [6436, 3788], [6397, 3789], [6382, 3772], [6277, 3761], [6218, 3738], [6146, 3762], [6136, 3798], [6115, 3796], [6110, 3820], [6123, 3851], [6180, 3896], [6127, 3899], [6126, 3956], [6140, 3975], [6121, 3980], [6128, 4022], [6194, 4024], [6255, 4082], [6317, 4089], [6341, 4144], [6385, 4189], [6400, 4235], [6434, 4239], [6439, 4261], [6474, 4276], [6492, 4302], [6522, 4313], [6552, 4362], [6551, 4418], [6513, 4427], [6475, 4469], [6550, 4562], [6578, 4640], [6617, 4674], [6655, 4694], [6658, 4739], [6626, 4772], [6596, 4774], [6579, 4789], [6548, 4772], [6519, 4806], [6507, 4840], [6490, 4850], [6454, 4912], [6437, 4907], [6433, 4959], [6473, 4955], [6489, 4968], [6530, 4969], [6555, 5016], [6572, 5006], [6577, 5033], [6481, 5114], [6495, 5127], [6477, 5190], [6486, 5209], [6535, 5227], [6567, 5217], [6597, 5241]]] } }, { "type": "Feature", "id": "RU.YV", "properties": { "hc-group": "admin1", "hc-middle-x": 0.32, "hc-middle-y": 0.70, "hc-key": "ru-yv", "hc-a2": "YV", "labelrank": "2", "hasc": "RU.YV", "alt-name": "Den jødiske autonome oblasten|Evrey|Jewish A.Obl.|Yahudi|Yevreyskaya A.Obl.|Evreyskaya AOb", "woe-id": "20070516", "subregion": "Far Eastern", "fips": "RS89", "postal-code": "YV", "name": "Yevrey", "country": "Russia", "type-en": "Autonomous Region", "region": "Far Eastern", "longitude": "132.758", "woe-name": "Yevrey", "latitude": "48.64", "woe-label": "Yevreyskaya Avtonomnaya Oblast, RU, Russia", "type": "Avtonomnaya Oblast" }, "geometry": { "type": "Polygon", "coordinates": [[[8188, 4787], [8207, 4821], [8198, 4863], [8215, 4876], [8238, 4912], [8259, 4914], [8247, 4950], [8284, 4948], [8308, 4980], [8322, 4972], [8360, 4989], [8397, 4966], [8437, 4992], [8474, 5003], [8485, 5034], [8511, 5033], [8542, 5063], [8548, 5026], [8519, 4999], [8482, 4938], [8477, 4904], [8447, 4879], [8430, 4834], [8441, 4799], [8370, 4729], [8351, 4725], [8325, 4692], [8266, 4706], [8252, 4745], [8202, 4756], [8188, 4787]]] } }, { "type": "Feature", "id": "RU.AM", "properties": { "hc-group": "admin1", "hc-middle-x": 0.63, "hc-middle-y": 0.55, "hc-key": "ru-am", "hc-a2": "AM", "labelrank": "2", "hasc": "RU.AM", "alt-name": "Amurskaya Oblast", "woe-id": "2346888", "subregion": "Far Eastern", "fips": "RS05", "postal-code": "AM", "name": "Amur", "country": "Russia", "type-en": "Region", "region": "Far Eastern", "longitude": "128.354", "woe-name": "Amur", "latitude": "52.9236", "woe-label": "Amurskaya Oblast, RU, Russia", "type": "Oblast" }, "geometry": { "type": "Polygon", "coordinates": [[[8215, 4876], [8198, 4863], [8207, 4821], [8188, 4787], [8160, 4761], [8119, 4757], [8054, 4769], [8027, 4737], [7989, 4729], [7985, 4742], [7932, 4694], [7907, 4684], [7863, 4689], [7835, 4736], [7807, 4733], [7768, 4776], [7715, 4789], [7685, 4825], [7652, 4832], [7602, 4862], [7595, 4886], [7467, 4934], [7404, 4927], [7347, 4893], [7323, 4900], [7262, 4890], [7234, 4872], [7211, 4842], [7170, 4818], [7150, 4796], [7113, 4837], [7078, 4846], [7055, 4898], [7084, 4921], [7060, 4924], [7041, 4950], [7022, 4942], [7029, 4977], [6997, 5034], [6980, 5044], [6949, 5009], [6926, 5045], [6902, 5063], [6885, 5053], [6836, 5001], [6809, 5028], [6833, 5065], [6803, 5074], [6777, 5066], [6736, 5087], [6745, 5111], [6766, 5142], [6815, 5175], [6846, 5185], [6877, 5166], [6917, 5190], [6966, 5180], [6974, 5200], [7020, 5204], [7060, 5226], [7124, 5212], [7148, 5199], [7184, 5215], [7200, 5235], [7232, 5234], [7267, 5258], [7279, 5243], [7309, 5258], [7333, 5300], [7381, 5313], [7428, 5366], [7453, 5363], [7493, 5388], [7478, 5407], [7510, 5450], [7537, 5463], [7599, 5513], [7615, 5516], [7662, 5557], [7680, 5589], [7703, 5605], [7741, 5582], [7751, 5535], [7733, 5515], [7740, 5495], [7714, 5418], [7735, 5383], [7715, 5359], [7712, 5326], [7730, 5297], [7772, 5313], [7808, 5341], [7855, 5303], [7860, 5288], [7903, 5329], [7967, 5401], [7959, 5417], [7971, 5452], [8011, 5469], [8028, 5522], [8069, 5526], [8090, 5512], [8101, 5462], [8137, 5441], [8148, 5407], [8035, 5346], [8052, 5323], [8081, 5318], [8082, 5302], [8050, 5268], [8042, 5243], [8051, 5210], [8018, 5147], [7996, 5129], [8032, 5097], [8010, 5060], [8032, 4973], [8055, 4992], [8066, 4966], [8106, 4984], [8139, 4973], [8140, 4946], [8157, 4954], [8207, 4900], [8215, 4876]]] } }, { "type": "Feature", "id": "RU.TB", "properties": { "hc-group": "admin1", "hc-middle-x": 0.46, "hc-middle-y": 0.52, "hc-key": "ru-tb", "hc-a2": "TB", "labelrank": "7", "hasc": "RU.TB", "alt-name": "Tambovskaya Oblast", "woe-id": "2346927", "subregion": "Central Black Earth", "fips": "RS72", "postal-code": "TB", "name": "Tambov", "country": "Russia", "type-en": "Region", "region": "Central", "longitude": "41.5945", "woe-name": "Tambov", "latitude": "52.7808", "woe-label": "Tambovskaya Oblast, RU, Russia", "type": "Oblast" }, "geometry": { "type": "Polygon", "coordinates": [[[450, 5561], [406, 5562], [332, 5528], [318, 5543], [276, 5629], [244, 5654], [263, 5664], [242, 5701], [287, 5716], [279, 5754], [282, 5803], [306, 5807], [367, 5849], [378, 5837], [422, 5833], [437, 5787], [461, 5786], [487, 5804], [534, 5757], [504, 5734], [486, 5575], [455, 5576], [450, 5561]]] } }, { "type": "Feature", "id": "RU.TL", "properties": { "hc-group": "admin1", "hc-middle-x": 0.58, "hc-middle-y": 0.66, "hc-key": "ru-tl", "hc-a2": "TL", "labelrank": "7", "hasc": "RU.TL", "alt-name": "Tul'skaya|Tulskaya Oblast", "woe-id": "2346929", "subregion": "Central", "fips": "RS76", "postal-code": "TL", "name": "Tula", "country": "Russia", "type-en": "Region", "region": "Central", "longitude": "37.4161", "woe-name": "Tula", "latitude": "54.0668", "woe-label": "Tulrskaya Oblast, RU, Russia", "type": "Oblast" }, "geometry": { "type": "Polygon", "coordinates": [[[378, 6032], [354, 5994], [317, 5958], [290, 5952], [266, 5966], [245, 5935], [220, 5946], [208, 5986], [197, 5986], [199, 6020], [213, 6030], [188, 6053], [171, 6086], [164, 6171], [185, 6197], [225, 6192], [232, 6214], [262, 6193], [285, 6161], [301, 6165], [316, 6195], [322, 6170], [365, 6182], [371, 6152], [401, 6134], [394, 6117], [409, 6080], [391, 6076], [378, 6032]]] } }, { "type": "Feature", "id": "RU.NG", "properties": { "hc-group": "admin1", "hc-middle-x": 0.47, "hc-middle-y": 0.39, "hc-key": "ru-ng", "hc-a2": "NG", "labelrank": "6", "hasc": "RU.NG", "alt-name": "Novgorodskaya Oblast", "woe-id": "2346913", "subregion": "Northwestern", "fips": "RS52", "postal-code": "NG", "name": "Novgorod", "country": "Russia", "type-en": "Region", "region": "Northwestern", "longitude": "32.9454", "woe-name": "Novgorod", "latitude": "58.4228", "woe-label": "Novgorodskaya Oblast, RU, Russia", "type": "Oblast" }, "geometry": { "type": "Polygon", "coordinates": [[[723, 6700], [722, 6657], [708, 6652], [737, 6613], [735, 6565], [723, 6561], [701, 6567], [665, 6608], [633, 6608], [627, 6628], [606, 6621], [589, 6678], [549, 6695], [541, 6674], [493, 6679], [466, 6664], [447, 6700], [404, 6710], [358, 6748], [331, 6749], [310, 6789], [296, 6813], [332, 6849], [372, 6863], [401, 6888], [384, 6932], [390, 6960], [409, 6973], [446, 6965], [464, 6959], [492, 6975], [511, 6938], [569, 6931], [562, 6917], [601, 6914], [621, 6925], [646, 6890], [631, 6866], [640, 6844], [684, 6839], [702, 6799], [696, 6764], [723, 6700]]] } }, { "type": "Feature", "id": "RU.VG", "properties": { "hc-group": "admin1", "hc-middle-x": 0.55, "hc-middle-y": 0.39, "hc-key": "ru-vg", "hc-a2": "VG", "labelrank": "6", "hasc": "RU.VG", "alt-name": "Stalingrad|Volgogradskaya Oblast", "woe-id": "2346933", "subregion": "Volga", "fips": "RS84", "postal-code": "VG", "name": "Volgograd", "country": "Russia", "type-en": "Region", "region": "Volga", "longitude": "44.4488", "woe-name": "Volgograd", "latitude": "49.5014", "woe-label": "Volgogradskaya Oblast, RU, Russia", "type": "Oblast" }, "geometry": { "type": "Polygon", "coordinates": [[[553, 5069], [533, 5069], [513, 5045], [462, 5050], [407, 5010], [414, 4979], [334, 4955], [326, 4995], [300, 5019], [252, 5020], [216, 5042], [175, 5034], [182, 4994], [168, 5030], [139, 5030], [123, 5047], [136, 5060], [125, 5083], [115, 5053], [93, 5040], [75, 5067], [25, 5074], [7, 5053], [-30, 5086], [-46, 5115], [-28, 5164], [-29, 5197], [-60, 5234], [-7, 5263], [35, 5236], [66, 5249], [78, 5272], [75, 5313], [57, 5330], [92, 5365], [116, 5372], [119, 5416], [108, 5441], [118, 5484], [167, 5505], [163, 5548], [224, 5529], [249, 5535], [269, 5501], [319, 5466], [328, 5414], [395, 5364], [422, 5355], [455, 5305], [449, 5263], [416, 5239], [450, 5212], [478, 5211], [470, 5178], [498, 5152], [520, 5159], [526, 5121], [548, 5097], [553, 5069]]] } }, { "type": "Feature", "id": "RU.KV", "properties": { "hc-group": "admin1", "hc-middle-x": 0.38, "hc-middle-y": 0.54, "hc-key": "ru-kv", "hc-a2": "KV", "labelrank": "6", "hasc": "RU.KV", "alt-name": "Vyatka|Vyatskaya G.|Kirovskaya Oblast", "woe-id": "2346902", "subregion": "Volga-Vyatka", "fips": "RS33", "postal-code": "KV", "name": "Kirov", "country": "Russia", "type-en": "Region", "region": "Volga", "longitude": "50.1112", "woe-name": "Kirov", "latitude": "58.1926", "woe-label": "Kirovskaya Oblast, RU, Russia", "type": "Oblast" }, "geometry": { "type": "Polygon", "coordinates": [[[1208, 5913], [1269, 5948], [1300, 5933], [1341, 5945], [1360, 5930], [1373, 5947], [1374, 6007], [1400, 6028], [1411, 6062], [1442, 6082], [1415, 6101], [1416, 6134], [1442, 6113], [1515, 6159], [1541, 6172], [1578, 6129], [1569, 6117], [1589, 6092], [1562, 6023], [1530, 6020], [1488, 5967], [1515, 5933], [1499, 5918], [1518, 5882], [1503, 5865], [1519, 5852], [1557, 5893], [1608, 5888], [1637, 5870], [1668, 5879], [1684, 5845], [1748, 5861], [1755, 5842], [1761, 5830], [1825, 5772], [1820, 5752], [1788, 5724], [1777, 5729], [1736, 5702], [1729, 5676], [1755, 5641], [1731, 5628], [1732, 5604], [1703, 5593], [1695, 5572], [1662, 5587], [1662, 5613], [1634, 5612], [1583, 5661], [1538, 5643], [1536, 5613], [1505, 5576], [1469, 5569], [1445, 5589], [1425, 5572], [1411, 5523], [1419, 5509], [1390, 5495], [1377, 5503], [1348, 5434], [1334, 5433], [1317, 5477], [1331, 5492], [1311, 5503], [1323, 5549], [1301, 5558], [1319, 5587], [1305, 5606], [1318, 5626], [1289, 5645], [1309, 5681], [1273, 5668], [1271, 5683], [1238, 5712], [1212, 5704], [1197, 5730], [1165, 5727], [1124, 5780], [1179, 5833], [1223, 5795], [1277, 5826], [1263, 5852], [1208, 5902], [1208, 5913]]] } }, { "type": "Feature", "id": "RU.ME", "properties": { "hc-group": "admin1", "hc-middle-x": 0.63, "hc-middle-y": 0.68, "hc-key": "ru-me", "hc-a2": "ME", "labelrank": "2", "hasc": "RU.ME", "alt-name": "Mari|Mari-El|Republic of Mari El|Mariyskaya A.S.S.R.|Respublika Mariy El", "woe-id": "2346875", "subregion": "Volga-Vyatka", "fips": "RS45", "postal-code": "ME", "name": "Mariy-El", "country": "Russia", "type-en": "Republic", "region": "Volga", "longitude": "47.9131", "woe-name": "Mariy-El", "latitude": "56.5407", "woe-label": "Mariy-El, RU, Russia", "type": "Respublika" }, "geometry": { "type": "Polygon", "coordinates": [[[1301, 5558], [1283, 5544], [1273, 5566], [1220, 5586], [1153, 5565], [1123, 5566], [1108, 5600], [1117, 5625], [1094, 5659], [1105, 5677], [1079, 5692], [1040, 5697], [1006, 5716], [1005, 5757], [1026, 5770], [1012, 5790], [1024, 5803], [1046, 5793], [1069, 5813], [1124, 5780], [1165, 5727], [1197, 5730], [1212, 5704], [1238, 5712], [1271, 5683], [1273, 5668], [1309, 5681], [1289, 5645], [1318, 5626], [1305, 5606], [1319, 5587], [1301, 5558]]] } }, { "type": "Feature", "id": "RU.KE", "properties": { "hc-group": "admin1", "hc-middle-x": 0.56, "hc-middle-y": 0.43, "hc-key": "ru-ke", "hc-a2": "KE", "labelrank": "6", "hasc": "RU.KE", "alt-name": "Kemerovskaya Oblast", "woe-id": "2346901", "subregion": "West Siberian", "fips": "RS29", "postal-code": "KE", "name": "Kemerovo", "country": "Russia", "type-en": "Region", "region": "Siberian", "longitude": "87.16759999999999", "woe-name": "Kemerovo", "latitude": "54.6462", "woe-label": "Kemerovskaya Oblast, RU, Russia", "type": "Oblast" }, "geometry": { "type": "Polygon", "coordinates": [[[4221, 3828], [4227, 3867], [4207, 3862], [4181, 3881], [4154, 3869], [4112, 3893], [4092, 3929], [4106, 3957], [4073, 3976], [4103, 4017], [4077, 4015], [4053, 4035], [4026, 4090], [3980, 4125], [3968, 4123], [3939, 4162], [3930, 4198], [3943, 4217], [3928, 4234], [3932, 4290], [3909, 4340], [3911, 4383], [3901, 4384], [4002, 4410], [4047, 4434], [4100, 4451], [4127, 4436], [4139, 4455], [4189, 4435], [4244, 4472], [4261, 4472], [4270, 4453], [4251, 4444], [4257, 4418], [4296, 4397], [4321, 4324], [4295, 4313], [4255, 4279], [4236, 4257], [4266, 4190], [4244, 4137], [4247, 4119], [4269, 4135], [4298, 4127], [4303, 4099], [4284, 4088], [4310, 4057], [4269, 4022], [4288, 3975], [4273, 3939], [4305, 3914], [4293, 3889], [4251, 3852], [4252, 3839], [4221, 3828]]] } }, { "type": "Feature", "id": "RU.AS", "properties": { "hc-group": "admin1", "hc-middle-x": 0.49, "hc-middle-y": 0.78, "hc-key": "ru-as", "hc-a2": "AS", "labelrank": "7", "hasc": "RU.AS", "alt-name": "Astrachan|Astrakhanskaya Oblast", "woe-id": "2346890", "subregion": "Volga", "fips": "RS07", "postal-code": "AS", "name": "Astrakhan'", "country": "Russia", "type-en": "Region", "region": "Volga", "longitude": "47.7227", "woe-name": "Astrakhan'", "latitude": "47.0334", "woe-label": "Astrakhanskaya Oblast, RU, Russia", "type": "Oblast" }, "geometry": { "type": "Polygon", "coordinates": [[[334, 4955], [299, 4940], [332, 4884], [293, 4836], [299, 4805], [319, 4815], [329, 4793], [360, 4765], [366, 4695], [352, 4652], [347, 4597], [320, 4605], [310, 4628], [293, 4625], [326, 4536], [299, 4536], [267, 4552], [247, 4518], [241, 4547], [188, 4552], [140, 4590], [117, 4585], [118, 4606], [69, 4632], [117, 4658], [140, 4662], [111, 4684], [128, 4697], [103, 4728], [129, 4732], [151, 4712], [162, 4725], [202, 4722], [193, 4778], [208, 4839], [243, 4834], [242, 4848], [198, 4853], [187, 4877], [194, 4946], [182, 4994], [175, 5034], [216, 5042], [252, 5020], [300, 5019], [326, 4995], [334, 4955]]] } }, { "type": "Feature", "id": "RU.PR", "properties": { "hc-group": "admin1", "hc-middle-x": 0.59, "hc-middle-y": 0.49, "hc-key": "ru-pr", "hc-a2": "PR", "labelrank": "2", "hasc": "RU.PR", "alt-name": "Küsten-Gebiet|Maritime Territory|Primorsk|Primorskiy Kray", "woe-id": "2346886", "subregion": "Far Eastern", "fips": "RS59", "postal-code": "PR", "name": "Primor'ye", "country": "Russia", "type-en": "Territory", "region": "Far Eastern", "longitude": "134.594", "woe-name": "Primor'ye", "latitude": "44.8622", "woe-label": "Primorskiy Kray, RU, Russia", "type": "Kray" }, "geometry": { "type": "Polygon", "coordinates": [[[8909, 5239], [8949, 5260], [8955, 5185], [9001, 5082], [9013, 5008], [9015, 4927], [9008, 4886], [9017, 4836], [9012, 4811], [9024, 4762], [9013, 4736], [9023, 4659], [9036, 4650], [9029, 4615], [9038, 4592], [9019, 4520], [9001, 4474], [8997, 4434], [8968, 4396], [8950, 4354], [8923, 4354], [8914, 4333], [8894, 4342], [8858, 4304], [8820, 4348], [8812, 4296], [8799, 4280], [8801, 4316], [8776, 4304], [8784, 4289], [8777, 4237], [8787, 4193], [8734, 4156], [8764, 4160], [8771, 4123], [8706, 4145], [8727, 4185], [8748, 4200], [8727, 4276], [8704, 4281], [8666, 4342], [8594, 4390], [8569, 4397], [8599, 4444], [8599, 4511], [8623, 4514], [8654, 4499], [8663, 4476], [8716, 4471], [8722, 4505], [8707, 4560], [8724, 4587], [8697, 4620], [8707, 4656], [8686, 4691], [8693, 4708], [8676, 4730], [8682, 4757], [8657, 4775], [8654, 4801], [8682, 4836], [8659, 4864], [8661, 4894], [8686, 4938], [8727, 4946], [8729, 4931], [8757, 4963], [8778, 4958], [8835, 5011], [8841, 5065], [8822, 5099], [8857, 5118], [8870, 5197], [8852, 5208], [8831, 5190], [8759, 5189], [8757, 5210], [8784, 5241], [8792, 5298], [8809, 5308], [8853, 5282], [8887, 5286], [8884, 5250], [8909, 5239]]] } }, { "type": "Feature", "id": "RU.MG", "properties": { "hc-group": "admin1", "hc-middle-x": 0.46, "hc-middle-y": 0.46, "hc-key": "ru-mg", "hc-a2": "MG", "labelrank": "2", "hasc": "RU.MG", "alt-name": "Magadanskaya Oblast", "woe-id": "20070512", "subregion": "Far Eastern", "fips": "RS44", "postal-code": "MG", "name": "Maga Buryatdan", "country": "Russia", "type-en": "Region", "region": "Far Eastern", "longitude": "153.797", "woe-name": "Maga Buryatdan", "latitude": "62.6257", "woe-label": "Magadanskaya Oblast, RU, Russia", "type": "Oblast" }, "geometry": { "type": "Polygon", "coordinates": [[[8272, 8004], [8298, 7956], [8361, 7793], [8329, 7806], [8307, 7835], [8306, 7788], [8287, 7808], [8264, 7799], [8235, 7849], [8184, 7872], [8205, 7829], [8200, 7803], [8167, 7804], [8148, 7728], [8155, 7711], [8132, 7673], [8144, 7607], [8184, 7589], [8194, 7539], [8222, 7506], [8241, 7425], [8263, 7383], [8286, 7366], [8280, 7346], [8321, 7314], [8352, 7374], [8400, 7372], [8372, 7326], [8378, 7284], [8331, 7249], [8355, 7197], [8317, 7166], [8328, 7132], [8306, 7085], [8266, 7083], [8287, 7132], [8295, 7175], [8266, 7142], [8217, 7139], [8204, 7104], [8217, 7096], [8199, 7072], [8180, 7076], [8129, 7029], [8125, 6991], [8142, 6987], [8126, 6962], [8142, 6945], [8165, 6951], [8143, 6917], [8127, 6923], [8107, 6893], [8110, 6857], [8067, 6824], [8069, 6840], [8021, 6877], [8000, 6859], [7939, 6862], [7924, 6820], [7898, 6817], [7875, 6838], [7876, 6884], [7892, 6901], [7867, 6919], [7856, 6950], [7788, 6980], [7742, 6980], [7705, 6964], [7705, 6939], [7666, 6906], [7656, 6950], [7630, 6963], [7638, 6988], [7608, 6996], [7555, 7026], [7514, 7086], [7492, 7094], [7498, 7134], [7481, 7176], [7525, 7204], [7525, 7234], [7564, 7236], [7537, 7276], [7515, 7270], [7503, 7300], [7530, 7309], [7551, 7341], [7551, 7385], [7567, 7394], [7608, 7383], [7626, 7403], [7606, 7414], [7623, 7454], [7627, 7504], [7651, 7503], [7626, 7557], [7586, 7561], [7555, 7590], [7561, 7641], [7507, 7668], [7501, 7687], [7522, 7702], [7514, 7726], [7492, 7726], [7478, 7755], [7500, 7767], [7516, 7817], [7545, 7844], [7534, 7866], [7572, 7870], [7588, 7893], [7571, 7922], [7588, 7965], [7557, 7980], [7587, 8010], [7647, 7971], [7713, 8028], [7759, 8036], [7778, 8079], [7828, 8096], [7877, 8161], [7863, 8175], [7893, 8168], [7921, 8179], [7943, 8153], [7941, 8128], [7971, 8128], [7982, 8110], [8016, 8117], [8042, 8088], [8071, 8084], [8077, 8050], [8099, 8043], [8133, 8059], [8190, 8046], [8192, 8005], [8212, 8024], [8230, 8002], [8272, 8004]]] } }, { "type": "Feature", "id": "RU.BU", "properties": { "hc-group": "admin1", "hc-middle-x": 0.71, "hc-middle-y": 0.46, "hc-key": "ru-bu", "hc-a2": "BU", "labelrank": "2", "hasc": "RU.BU", "alt-name": "Buryatiya|Buryat-Mongol A.S.S.R.|Republic of Buryatia|Buryatskaya A.S.S.R.", "woe-id": "2346867", "subregion": "East Siberian", "fips": "RS11", "postal-code": "BU", "name": "Buryat", "country": "Russia", "type-en": "Republic", "region": "Siberian", "longitude": "109.341", "woe-name": "Buryat", "latitude": "52.9061", "woe-label": "Buryatiya, RU, Russia", "type": "Respublika" }, "geometry": { "type": "Polygon", "coordinates": [[[6115, 3796], [6064, 3784], [5997, 3811], [5960, 3795], [5931, 3802], [5866, 3794], [5784, 3748], [5769, 3726], [5719, 3708], [5606, 3721], [5577, 3733], [5544, 3803], [5541, 3834], [5462, 3836], [5373, 3857], [5325, 3849], [5291, 3865], [5257, 3865], [5216, 3885], [5188, 3899], [5182, 3922], [5205, 3960], [5199, 3993], [5227, 4003], [5235, 4026], [5263, 4033], [5275, 4058], [5309, 4075], [5322, 4048], [5351, 4023], [5440, 3988], [5487, 3962], [5548, 3963], [5577, 3935], [5624, 3918], [5625, 3895], [5646, 3873], [5667, 3885], [5692, 3878], [5700, 3844], [5733, 3873], [5770, 3881], [5762, 3929], [5802, 3955], [5848, 4010], [5873, 4076], [6006, 4225], [6014, 4314], [6033, 4424], [5992, 4417], [5998, 4439], [5979, 4514], [5957, 4539], [5963, 4612], [5982, 4614], [5936, 4649], [5916, 4648], [5913, 4689], [5962, 4729], [5984, 4730], [6002, 4778], [6045, 4775], [6093, 4789], [6107, 4806], [6104, 4836], [6140, 4822], [6192, 4835], [6203, 4855], [6222, 4831], [6274, 4835], [6286, 4847], [6328, 4844], [6331, 4867], [6379, 4894], [6377, 4956], [6406, 4966], [6427, 4998], [6461, 5001], [6433, 4959], [6437, 4907], [6454, 4912], [6490, 4850], [6507, 4840], [6519, 4806], [6548, 4772], [6579, 4789], [6596, 4774], [6626, 4772], [6658, 4739], [6655, 4694], [6617, 4674], [6578, 4640], [6550, 4562], [6475, 4469], [6513, 4427], [6551, 4418], [6552, 4362], [6522, 4313], [6492, 4302], [6474, 4276], [6439, 4261], [6434, 4239], [6400, 4235], [6385, 4189], [6341, 4144], [6317, 4089], [6255, 4082], [6194, 4024], [6128, 4022], [6121, 3980], [6140, 3975], [6126, 3956], [6127, 3899], [6180, 3896], [6123, 3851], [6110, 3820], [6115, 3796]]] } }, { "type": "Feature", "id": "RU.KN", "properties": { "hc-group": "admin1", "hc-middle-x": 0.67, "hc-middle-y": 0.67, "hc-key": "ru-kn", "hc-a2": "KN", "labelrank": "7", "hasc": "RU.KN", "alt-name": "Kaliningradskaya Oblast", "woe-id": "2346938", "subregion": "Kaliningrad", "fips": "RS23", "postal-code": "KN", "name": "Kaliningrad", "country": "Russia", "type-en": "Region", "region": "Northwestern", "longitude": "21.2287", "woe-name": "Kaliningrad", "latitude": "54.6636", "woe-label": "Kaliningradskaya Oblast, RU, Russia", "type": "Oblast" }, "geometry": { "type": "Polygon", "coordinates": [[[-266, 7403], [-268, 7346], [-248, 7309], [-262, 7282], [-336, 7261], [-395, 7435], [-419, 7510], [-366, 7468], [-375, 7505], [-343, 7511], [-308, 7413], [-276, 7429], [-266, 7403]]] } }, { "type": "Feature", "id": "RU.KD", "properties": { "hc-group": "admin1", "hc-middle-x": 0.65, "hc-middle-y": 0.39, "hc-key": "ru-kd", "hc-a2": "KD", "labelrank": "6", "hasc": "RU.KD", "alt-name": "Cossacks of the Black Sea|Kuban|Kubanskaya|Yekaterinodar|Krasnodarskiy Kray", "woe-id": "2346884", "subregion": "North Caucasus", "fips": "RS38", "postal-code": "KD", "name": "Krasnodar", "country": "Russia", "type-en": "Territory", "region": "Volga", "longitude": "39.4688", "woe-name": "Krasnodar", "latitude": "45.8397", "woe-label": "Krasnodarskiy Kray, RU, Russia", "type": "Kray" }, "geometry": { "type": "Polygon", "coordinates": [[[-611, 4944], [-640, 4989], [-677, 4994], [-678, 5033], [-672, 5148], [-680, 5197], [-701, 5240], [-693, 5290], [-721, 5324], [-707, 5362], [-724, 5445], [-683, 5443], [-674, 5408], [-686, 5402], [-645, 5377], [-636, 5353], [-608, 5393], [-583, 5382], [-543, 5393], [-514, 5378], [-496, 5349], [-497, 5408], [-509, 5420], [-491, 5466], [-476, 5436], [-409, 5402], [-401, 5380], [-424, 5367], [-401, 5340], [-380, 5347], [-328, 5282], [-348, 5260], [-339, 5246], [-356, 5214], [-320, 5163], [-331, 5117], [-343, 5091], [-378, 5119], [-396, 5108], [-415, 5064], [-391, 5036], [-406, 5006], [-394, 4992], [-437, 4986], [-439, 4938], [-480, 4916], [-507, 4920], [-532, 4980], [-545, 4962], [-563, 4972], [-611, 4944]], [[-484, 5119], [-506, 5141], [-517, 5179], [-559, 5190], [-582, 5211], [-600, 5248], [-597, 5196], [-563, 5153], [-544, 5177], [-537, 5148], [-519, 5142], [-536, 5107], [-592, 5094], [-583, 5060], [-612, 5057], [-613, 5084], [-642, 5062], [-618, 5000], [-582, 5004], [-553, 5032], [-532, 5066], [-511, 5074], [-500, 5060], [-510, 5022], [-482, 5079], [-484, 5119]]] } }, { "type": "Feature", "id": "RU.KU", "properties": { "hc-group": "admin1", "hc-middle-x": 0.33, "hc-middle-y": 0.46, "hc-key": "ru-ku", "hc-a2": "KU", "labelrank": "6", "hasc": "RU.KU", "alt-name": "Kurganskaya Oblast", "woe-id": "2346904", "subregion": "Urals", "fips": "RS40", "postal-code": "KU", "name": "Kurgan", "country": "Russia", "type-en": "Region", "region": "Urals", "longitude": "65.3505", "woe-name": "Kurgan", "latitude": "55.4316", "woe-label": "Kurganskaya Oblast, RU, Russia", "type": "Oblast" }, "geometry": { "type": "Polygon", "coordinates": [[[2574, 4603], [2556, 4587], [2528, 4598], [2508, 4570], [2458, 4575], [2355, 4597], [2312, 4602], [2270, 4623], [2245, 4619], [2235, 4596], [2214, 4615], [2133, 4638], [2072, 4646], [2063, 4674], [2091, 4692], [2094, 4717], [2041, 4734], [2046, 4747], [2009, 4754], [2022, 4808], [2037, 4795], [2051, 4818], [2041, 4835], [2060, 4846], [2099, 4842], [2106, 4887], [2095, 4897], [2100, 4939], [2111, 4958], [2164, 4976], [2163, 4964], [2231, 4948], [2279, 4901], [2309, 4930], [2351, 4924], [2359, 4909], [2341, 4876], [2344, 4843], [2382, 4823], [2393, 4774], [2418, 4774], [2425, 4754], [2491, 4727], [2491, 4694], [2548, 4665], [2541, 4652], [2574, 4603]]] } }, { "type": "Feature", "id": "RU.AL", "properties": { "hc-group": "admin1", "hc-middle-x": 0.57, "hc-middle-y": 0.47, "hc-key": "ru-al", "hc-a2": "AL", "labelrank": "2", "hasc": "RU.AL", "alt-name": "Altayskiy Kray", "woe-id": "20070529", "subregion": "West Siberian", "fips": "RS04", "postal-code": "AL", "name": "Altay", "country": "Russia", "type-en": "Territory", "region": "Siberian", "longitude": "82.86669999999999", "woe-name": "Altay", "latitude": "52.4268", "woe-label": "Altayskiy Kray, RU, Russia", "type": "Kray" }, "geometry": { "type": "Polygon", "coordinates": [[[3797, 3645], [3774, 3680], [3739, 3701], [3673, 3697], [3641, 3675], [3574, 3694], [3543, 3691], [3542, 3723], [3509, 3726], [3522, 3750], [3481, 3780], [3455, 3770], [3450, 3737], [3403, 3722], [3371, 3826], [3278, 4079], [3265, 4104], [3312, 4133], [3313, 4118], [3346, 4115], [3374, 4131], [3423, 4123], [3467, 4149], [3543, 4174], [3571, 4196], [3582, 4160], [3613, 4145], [3617, 4125], [3645, 4126], [3639, 4090], [3692, 4049], [3720, 4090], [3765, 4123], [3781, 4105], [3799, 4127], [3863, 4133], [3879, 4121], [3903, 4146], [3939, 4162], [3968, 4123], [3980, 4125], [4026, 4090], [4053, 4035], [4077, 4015], [4103, 4017], [4073, 3976], [4106, 3957], [4092, 3929], [4112, 3893], [4082, 3900], [4058, 3863], [4075, 3851], [4069, 3826], [4039, 3816], [3992, 3826], [3970, 3780], [3950, 3778], [3919, 3749], [3897, 3753], [3835, 3728], [3796, 3704], [3843, 3685], [3842, 3649], [3797, 3645]]] } }, { "type": "Feature", "id": "RU.KM", "properties": { "hc-group": "admin1", "hc-middle-x": 0.32, "hc-middle-y": 0.50, "hc-key": "ru-km", "hc-a2": "KM", "labelrank": "2", "hasc": "RU.KM", "alt-name": "Khanty-Mansiysk|Khanty-Mansiyskiy A.Okr.|Khanty-Mansiyskiy A.Okr.-Yugra|Khanty-Mansiyskiy AOk", "woe-id": "20070526", "subregion": "West Siberian", "fips": "RS32", "postal-code": "KM", "name": "Khanty-Mansiy", "country": "Russia", "type-en": "Autonomous Province", "region": "Urals", "longitude": "71.3806", "woe-name": "Khanty-Mansiy", "latitude": "61.4315", "woe-label": "Khanty-Mansiyskiy Avtonomnyy Okrug, RU, Russia", "type": "Avtonomnyy Okrug" }, "geometry": { "type": "Polygon", "coordinates": [[[3987, 5239], [3990, 5200], [4053, 5155], [4086, 5142], [4063, 5107], [3956, 5055], [3936, 5053], [3904, 5088], [3877, 5088], [3818, 5052], [3795, 5028], [3775, 5047], [3724, 5054], [3697, 5081], [3654, 5069], [3595, 5080], [3586, 5106], [3558, 5103], [3441, 5139], [3422, 5096], [3402, 5090], [3401, 5063], [3365, 4974], [3328, 4977], [3277, 4945], [3269, 4910], [3221, 4875], [3193, 4897], [3144, 4909], [3112, 4935], [3069, 4949], [3068, 4992], [3051, 4990], [3022, 5067], [2982, 5115], [2979, 5132], [2918, 5140], [2905, 5157], [2867, 5172], [2849, 5191], [2828, 5184], [2838, 5164], [2773, 5154], [2746, 5125], [2698, 5133], [2634, 5116], [2613, 5126], [2597, 5093], [2566, 5094], [2535, 5112], [2519, 5126], [2511, 5234], [2438, 5291], [2456, 5331], [2464, 5384], [2449, 5414], [2454, 5500], [2470, 5514], [2461, 5567], [2407, 5656], [2341, 5700], [2349, 5725], [2325, 5753], [2329, 5770], [2372, 5811], [2383, 5879], [2411, 5924], [2471, 5987], [2500, 6005], [2492, 6023], [2534, 6087], [2582, 6107], [2599, 6071], [2660, 6096], [2660, 6105], [2729, 6132], [2736, 6113], [2731, 6070], [2744, 6056], [2710, 6007], [2707, 5985], [2681, 5972], [2717, 5947], [2724, 5903], [2793, 5896], [2826, 5882], [2847, 5892], [2891, 5875], [2932, 5842], [2910, 5810], [2930, 5780], [2959, 5760], [3011, 5780], [3034, 5759], [3044, 5788], [3069, 5783], [3107, 5746], [3127, 5743], [3148, 5713], [3127, 5694], [3135, 5642], [3163, 5631], [3169, 5610], [3155, 5560], [3195, 5564], [3226, 5551], [3261, 5564], [3269, 5527], [3324, 5506], [3337, 5484], [3363, 5475], [3424, 5471], [3451, 5441], [3475, 5447], [3500, 5432], [3512, 5391], [3552, 5347], [3608, 5357], [3677, 5343], [3688, 5368], [3738, 5392], [3774, 5400], [3786, 5356], [3816, 5333], [3834, 5346], [3878, 5334], [3913, 5287], [3948, 5297], [3975, 5268], [3987, 5239]]] } }, { "type": "Feature", "id": "RU.PE", "properties": { "hc-group": "admin1", "hc-middle-x": 0.51, "hc-middle-y": 0.48, "hc-key": "ru-pe", "hc-a2": "PE", "labelrank": "6", "hasc": "RU.PE", "alt-name": "Molotov|Permskaya Oblast", "woe-id": "20070511", "subregion": "Urals", "fips": "RS90", "postal-code": "PE", "name": "Perm'", "country": "Russia", "type-en": "Territory", "region": "Volga", "longitude": "56.5878", "woe-name": "Perm'", "latitude": "58.8735", "woe-label": "Permskiy Kray, RU, Russia", "type": "Kray" }, "geometry": { "type": "Polygon", "coordinates": [[[1773, 5161], [1742, 5153], [1718, 5161], [1707, 5215], [1676, 5219], [1679, 5247], [1636, 5254], [1602, 5275], [1591, 5320], [1562, 5309], [1569, 5357], [1550, 5364], [1566, 5383], [1578, 5369], [1594, 5390], [1617, 5394], [1644, 5435], [1637, 5457], [1659, 5471], [1678, 5507], [1679, 5546], [1695, 5572], [1703, 5593], [1732, 5604], [1731, 5628], [1755, 5641], [1729, 5676], [1736, 5702], [1777, 5729], [1788, 5724], [1820, 5752], [1825, 5772], [1761, 5830], [1755, 5842], [1773, 5862], [1756, 5906], [1786, 5931], [1810, 5907], [1827, 5918], [1845, 5899], [1862, 5911], [1885, 5884], [1873, 5868], [1895, 5844], [1910, 5856], [1967, 5795], [2008, 5811], [2028, 5791], [2050, 5804], [2071, 5782], [2096, 5802], [2123, 5802], [2241, 5723], [2295, 5721], [2287, 5696], [2256, 5668], [2239, 5610], [2217, 5585], [2149, 5533], [2094, 5517], [2068, 5494], [2101, 5421], [2068, 5379], [2084, 5359], [2074, 5331], [1980, 5306], [1976, 5265], [1949, 5259], [1927, 5288], [1903, 5279], [1873, 5217], [1826, 5220], [1799, 5231], [1796, 5205], [1773, 5161]]] } }, { "type": "Feature", "id": "RU.AD", "properties": { "hc-group": "admin1", "hc-middle-x": 0.10, "hc-middle-y": 0.73, "hc-key": "ru-ad", "hc-a2": "AD", "labelrank": "2", "hasc": "RU.AD", "alt-name": "Adygea|Adygeya|Adygheya|Republic of Adygeya|Adygeyskaya A.Obl.|Respublika Adygeya", "woe-id": "20070520", "subregion": "North Caucasus", "fips": "RS01", "postal-code": "AD", "name": "Adygey", "country": "Russia", "type-en": "Republic", "region": "Volga", "longitude": "40.1293", "woe-name": "Adygey", "latitude": "44.4658", "woe-label": "Adygeya, RU, Russia", "type": "Respublika" }, "geometry": { "type": "Polygon", "coordinates": [[[-484, 5119], [-482, 5079], [-510, 5022], [-500, 5060], [-511, 5074], [-532, 5066], [-553, 5032], [-582, 5004], [-618, 5000], [-642, 5062], [-613, 5084], [-612, 5057], [-583, 5060], [-592, 5094], [-536, 5107], [-519, 5142], [-537, 5148], [-544, 5177], [-563, 5153], [-597, 5196], [-600, 5248], [-582, 5211], [-559, 5190], [-517, 5179], [-506, 5141], [-484, 5119]]] } }] };

/***/ }),
/* 93 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var uaAll = exports.uaAll = { "title": "Ukraine", "version": "1.1.2", "type": "FeatureCollection", "copyright": "Copyright (c) 2015 Highsoft AS, Based on data from Natural Earth", "copyrightShort": "Natural Earth", "copyrightUrl": "http://www.naturalearthdata.com", "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:EPSG:5564" } }, "hc-transform": { "default": { "crs": "+proj=tmerc +lat_0=0 +lon_0=33 +k=1 +x_0=6500000 +y_0=0 +ellps=krass +towgs84=25,-141,-78.5,-0,0.35,0.736,0 +units=m +no_defs", "scale": 0.000528631401173, "jsonres": 15.5, "jsonmarginX": -999, "jsonmarginY": 9851.0, "xoffset": 5696111.86253, "yoffset": 5804527.05192 } },
	  "features": [{ "type": "Feature", "id": "UA.MY", "properties": { "hc-group": "admin1", "hc-middle-x": 0.67, "hc-middle-y": 0.32, "hc-key": "ua-my", "hc-a2": "MY", "labelrank": "7", "hasc": "UA.MY", "alt-name": "Odesa|Odes'ka Oblast'|Odesskaya Oblast'", "woe-id": "2347549", "subregion": null, "fips": "UP15", "postal-code": "MY", "name": "Odessa", "country": "Ukraine", "type-en": "Region", "region": null, "longitude": "29.7568", "woe-name": "Odessa", "latitude": "46.0315", "woe-label": "Odessa Oblast, UA, Ukraine", "type": "Oblast'" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[3548, 3736], [3726, 3892], [3759, 3908], [3615, 3781], [3548, 3736]]], [[[4452, 4633], [4328, 4611], [4249, 4571], [4208, 4577], [4177, 4537], [4203, 4473], [4129, 4360], [4106, 4305], [4001, 4145], [3920, 4073], [3847, 3982], [3767, 3916], [3767, 3979], [3739, 3912], [3674, 3944], [3647, 3876], [3626, 3903], [3632, 3833], [3611, 3859], [3550, 3849], [3587, 3788], [3501, 3738], [3472, 3815], [3482, 3892], [3451, 3935], [3421, 3812], [3407, 3692], [3474, 3692], [3414, 3626], [3443, 3585], [3495, 3612], [3505, 3471], [3471, 3383], [3439, 3378], [3449, 3429], [3438, 3496], [3388, 3543], [3231, 3595], [3170, 3579], [3134, 3549], [2998, 3493], [2972, 3457], [2884, 3500], [2873, 3418], [2744, 3440], [2589, 3518], [2555, 3627], [2513, 3649], [2561, 3701], [2695, 3675], [2735, 3744], [2699, 3817], [2757, 3868], [2769, 3908], [2829, 3919], [2831, 3951], [2876, 3972], [2875, 4064], [2894, 4084], [3023, 4114], [3021, 4208], [3068, 4277], [3020, 4349], [3030, 4390], [3018, 4482], [3037, 4527], [3177, 4596], [3203, 4562], [3193, 4430], [3247, 4464], [3273, 4528], [3297, 4479], [3360, 4539], [3372, 4484], [3410, 4471], [3444, 4424], [3521, 4519], [3600, 4398], [3646, 4425], [3749, 4422], [3782, 4465], [3748, 4466], [3699, 4537], [3650, 4558], [3640, 4589], [3673, 4611], [3663, 4649], [3680, 4761], [3668, 4822], [3617, 4865], [3561, 4871], [3526, 4915], [3442, 4956], [3474, 5046], [3443, 5087], [3418, 5066], [3401, 5114], [3446, 5151], [3445, 5219], [3469, 5263], [3456, 5300], [3410, 5315], [3363, 5264], [3335, 5332], [3300, 5357], [3261, 5421], [3218, 5417], [3194, 5504], [3237, 5574], [3251, 5669], [3278, 5703], [3242, 5735], [3282, 5807], [3252, 5821], [3218, 5907], [3179, 5903], [3151, 5869], [3110, 5875], [3059, 5937], [3175, 6007], [3174, 6048], [3213, 6060], [3298, 6002], [3354, 6001], [3414, 6022], [3451, 6002], [3562, 5997], [3557, 6067], [3625, 6095], [3695, 6076], [3716, 6108], [3760, 6106], [3811, 6034], [3938, 6022], [3951, 5991], [3893, 5967], [3887, 5899], [3935, 5848], [3946, 5749], [3989, 5707], [4001, 5575], [4034, 5550], [4104, 5561], [4151, 5550], [4168, 5515], [4222, 5555], [4227, 5510], [4274, 5471], [4250, 5368], [4296, 5227], [4373, 5202], [4442, 5220], [4455, 5190], [4419, 5138], [4485, 5122], [4534, 5062], [4506, 4972], [4476, 4947], [4365, 4931], [4375, 4879], [4440, 4812], [4452, 4633]], [[3779, 4421], [3774, 4358], [3815, 4308], [3884, 4280], [3923, 4234], [3956, 4157], [4007, 4202], [3958, 4251], [3946, 4316], [3909, 4339], [3893, 4417], [3881, 4359], [3829, 4439], [3779, 4421]]]] } }, { "type": "Feature", "id": "UA.KS", "properties": { "hc-group": "admin1", "hc-middle-x": 0.50, "hc-middle-y": 0.43, "hc-key": "ua-ks", "hc-a2": "KS", "labelrank": "5", "hasc": "UA.KS", "alt-name": null, "woe-id": "2347541", "subregion": null, "fips": "UP08", "postal-code": "KS", "name": "Kherson", "country": "Ukraine", "type-en": null, "region": null, "longitude": "33.5787", "woe-name": "Kherson Oblast", "latitude": "46.6964", "woe-label": "Kherson Oblast, UA, Ukraine", "type": "Oblast'" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[5360, 4102], [5451, 4089], [5575, 4096], [5614, 4058], [5360, 4102]]], [[[5053, 4192], [4791, 4255], [4716, 4291], [5001, 4217], [5053, 4192]]], [[[7029, 4300], [6958, 4183], [6857, 4130], [6883, 4193], [6981, 4233], [7020, 4305], [7021, 4304], [7029, 4300]]], [[[6918, 4333], [6872, 4293], [6812, 4276], [6792, 4294], [6735, 4212], [6745, 4131], [6780, 3994], [6866, 3816], [6850, 3806], [6788, 3928], [6745, 3890], [6764, 3981], [6747, 3993], [6728, 4087], [6702, 4070], [6641, 4138], [6695, 4157], [6710, 4189], [6663, 4223], [6614, 4205], [6624, 4134], [6589, 4054], [6531, 4026], [6484, 4060], [6507, 4154], [6554, 4173], [6573, 4134], [6584, 4202], [6566, 4227], [6529, 4188], [6418, 4249], [6424, 4157], [6371, 4267], [6335, 4307], [6314, 4266], [6349, 4220], [6324, 4192], [6300, 4243], [6271, 4219], [6310, 4165], [6247, 4176], [6210, 4234], [6154, 4261], [6066, 4273], [6012, 4246], [6014, 4206], [5987, 4162], [5966, 4190], [5926, 4159], [5942, 4128], [5916, 4090], [5858, 4096], [5816, 4142], [5773, 4134], [5775, 4171], [5725, 4164], [5738, 4251], [5700, 4187], [5667, 4171], [5604, 4202], [5600, 4163], [5534, 4152], [5456, 4170], [5328, 4143], [5274, 4117], [5122, 4166], [5127, 4236], [5030, 4246], [4989, 4293], [4969, 4285], [4886, 4343], [4883, 4306], [4814, 4329], [4843, 4370], [4938, 4371], [4998, 4409], [4964, 4460], [4844, 4493], [4844, 4493], [4867, 4528], [4981, 4512], [5030, 4517], [5133, 4478], [5187, 4474], [5217, 4520], [5290, 4588], [5320, 4591], [5367, 4639], [5218, 4567], [5172, 4561], [5120, 4600], [5053, 4560], [5035, 4603], [4976, 4624], [4940, 4709], [5008, 4731], [5070, 4730], [5103, 4783], [5188, 4779], [5207, 4813], [5297, 4814], [5301, 4843], [5386, 4820], [5403, 4800], [5478, 4800], [5552, 4832], [5469, 4844], [5598, 4903], [5560, 4918], [5573, 4958], [5604, 4931], [5627, 4972], [5542, 5027], [5536, 5052], [5574, 5128], [5619, 5124], [5673, 5168], [5654, 5206], [5666, 5256], [5650, 5306], [5605, 5330], [5629, 5367], [5666, 5337], [5660, 5441], [5644, 5489], [5770, 5446], [5795, 5410], [5883, 5442], [5936, 5483], [5950, 5428], [5993, 5403], [6145, 5430], [6242, 5400], [6332, 5399], [6394, 5212], [6453, 5216], [6474, 5251], [6516, 5256], [6504, 5212], [6528, 5070], [6547, 5058], [6565, 4972], [6589, 4937], [6661, 4905], [6712, 4817], [6645, 4718], [6610, 4689], [6675, 4662], [6670, 4608], [6694, 4561], [6756, 4554], [6755, 4516], [6799, 4517], [6870, 4479], [6889, 4343], [6918, 4333]]]] } }, { "type": "Feature", "id": "UA.KC", "properties": { "hc-group": "admin1", "hc-middle-x": 0.50, "hc-middle-y": 0.39, "hc-key": "ua-kc", "hc-a2": "KC", "labelrank": "7", "hasc": "UA.KM", "alt-name": "Kyïvs'ka mis'ka rada", "woe-id": "20070188", "subregion": null, "fips": "UP12", "postal-code": "KC", "name": "Kiev City", "country": "Ukraine", "type-en": "Municipality", "region": null, "longitude": "30.5277", "woe-name": "Kiev City Municipality", "latitude": "50.383", "woe-label": "Kiev City Municipality, UA, Ukraine", "type": "Rada" }, "geometry": { "type": "Polygon", "coordinates": [[[4337, 8242], [4281, 8173], [4285, 8112], [4333, 8032], [4300, 8014], [4300, 7977], [4261, 7994], [4256, 7951], [4190, 7958], [4215, 7855], [4195, 7825], [4208, 7744], [4171, 7727], [4148, 7804], [4138, 7889], [4113, 7898], [4079, 7995], [4034, 8055], [4027, 8092], [3981, 8099], [3949, 8075], [3973, 8216], [3998, 8237], [4006, 8298], [4044, 8323], [4102, 8321], [4124, 8259], [4165, 8215], [4168, 8244], [4223, 8237], [4266, 8280], [4279, 8320], [4334, 8292], [4337, 8242]]] } }, { "type": "Feature", "id": "UA.ZT", "properties": { "hc-group": "admin1", "hc-middle-x": 0.53, "hc-middle-y": 0.45, "hc-key": "ua-zt", "hc-a2": "ZT", "labelrank": "7", "hasc": "UA.ZT", "alt-name": "Zhitomir|Jitomir|Shitomir|Zhitomirskaya Oblast'", "woe-id": "2347558", "subregion": null, "fips": "UP24", "postal-code": "ZT", "name": "Zhytomyr", "country": "Ukraine", "type-en": "Region", "region": null, "longitude": "28.4643", "woe-name": "Zhytomyr", "latitude": "50.6898", "woe-label": "Zhytomyr Oblast, UA, Ukraine", "type": "Oblast'" }, "geometry": { "type": "Polygon", "coordinates": [[[2554, 9160], [2580, 9134], [2625, 9174], [2645, 9256], [2669, 9267], [2713, 9219], [2789, 9206], [2873, 9286], [2926, 9212], [2943, 9166], [3027, 9203], [3091, 9183], [3102, 9100], [3142, 9078], [3154, 9040], [3172, 9114], [3239, 9179], [3291, 9180], [3344, 9234], [3390, 9231], [3443, 9131], [3438, 9084], [3476, 8997], [3509, 8998], [3530, 8977], [3523, 8926], [3455, 8873], [3474, 8763], [3495, 8787], [3569, 8717], [3553, 8624], [3517, 8635], [3574, 8522], [3560, 8458], [3607, 8439], [3617, 8385], [3546, 8281], [3565, 8256], [3554, 8195], [3522, 8116], [3572, 8125], [3597, 8094], [3613, 8027], [3659, 7969], [3655, 7894], [3676, 7844], [3636, 7817], [3637, 7743], [3668, 7685], [3604, 7612], [3487, 7551], [3473, 7476], [3510, 7473], [3487, 7423], [3378, 7369], [3221, 7381], [3198, 7474], [3229, 7509], [3195, 7563], [3180, 7641], [3137, 7652], [3059, 7576], [2976, 7574], [2894, 7598], [2869, 7572], [2797, 7587], [2653, 7570], [2560, 7576], [2440, 7620], [2404, 7714], [2377, 7731], [2402, 7760], [2387, 7815], [2457, 7833], [2435, 7877], [2455, 7958], [2438, 8033], [2367, 8015], [2323, 8086], [2228, 8182], [2277, 8254], [2217, 8317], [2245, 8353], [2222, 8387], [2277, 8492], [2255, 8547], [2269, 8633], [2252, 8726], [2311, 8770], [2355, 8856], [2413, 8931], [2403, 9004], [2435, 9009], [2458, 9122], [2501, 9076], [2508, 9147], [2554, 9160]]] } }, { "type": "Feature", "id": "UA.SM", "properties": { "hc-group": "admin1", "hc-middle-x": 0.48, "hc-middle-y": 0.69, "hc-key": "ua-sm", "hc-a2": "SM", "labelrank": "7", "hasc": "UA.SM", "alt-name": null, "woe-id": "2347552", "subregion": null, "fips": "UP18", "postal-code": "SM", "name": "Sumy", "country": "Ukraine", "type-en": "Region", "region": null, "longitude": "34.3159", "woe-name": "Sumy", "latitude": "50.8153", "woe-label": "Sumy Oblast, UA, Ukraine", "type": "Oblast'" }, "geometry": { "type": "Polygon", "coordinates": [[[5813, 9829], [5857, 9842], [5886, 9779], [5973, 9841], [6038, 9840], [6125, 9723], [6181, 9674], [6190, 9547], [6206, 9475], [6235, 9475], [6283, 9424], [6372, 9356], [6389, 9282], [6368, 9256], [6228, 9228], [6201, 9194], [6236, 9174], [6285, 9078], [6284, 8998], [6265, 8968], [6331, 8945], [6322, 8884], [6267, 8835], [6323, 8816], [6395, 8841], [6518, 8818], [6530, 8778], [6591, 8765], [6712, 8814], [6768, 8813], [6791, 8787], [6808, 8704], [6837, 8658], [6937, 8658], [6899, 8616], [6910, 8567], [6938, 8548], [6963, 8440], [6999, 8409], [7019, 8325], [6968, 8280], [7012, 8149], [7057, 8135], [7087, 8060], [7159, 8033], [7151, 8013], [7045, 8006], [6991, 8018], [6979, 7980], [6948, 7990], [6907, 7934], [6837, 7933], [6769, 7864], [6747, 7882], [6706, 7839], [6651, 7850], [6587, 7840], [6567, 7808], [6489, 7814], [6453, 7798], [6442, 7834], [6469, 7860], [6422, 7947], [6396, 7939], [6393, 8011], [6321, 8095], [6313, 8185], [6293, 8191], [6198, 8125], [6119, 8178], [6058, 8150], [6078, 8134], [6008, 8115], [5964, 8135], [5786, 8171], [5754, 8189], [5709, 8164], [5625, 8182], [5648, 8293], [5684, 8378], [5661, 8400], [5674, 8495], [5692, 8516], [5678, 8593], [5708, 8647], [5637, 8632], [5601, 8672], [5557, 8689], [5570, 8769], [5600, 8778], [5629, 8830], [5617, 8914], [5589, 8948], [5652, 8942], [5658, 9066], [5695, 9073], [5667, 9194], [5676, 9235], [5637, 9279], [5624, 9326], [5680, 9427], [5716, 9429], [5795, 9466], [5788, 9507], [5807, 9568], [5850, 9560], [5841, 9595], [5772, 9654], [5767, 9706], [5790, 9741], [5813, 9829]]] } }, { "type": "Feature", "id": "UA.DT", "properties": { "hc-group": "admin1", "hc-middle-x": 0.42, "hc-middle-y": 0.53, "hc-key": "ua-dt", "hc-a2": "DT", "labelrank": "7", "hasc": "UA.DT", "alt-name": "Donetsk|Donetskaya Oblast'|Donezk|Stalino", "woe-id": "2347538", "subregion": null, "fips": "UP05", "postal-code": "DT", "name": "Donets'k", "country": "Ukraine", "type-en": "Region", "region": null, "longitude": "37.7933", "woe-name": "Donets'k", "latitude": "48.145", "woe-label": "Donetsk Oblast, UA, Ukraine", "type": "Oblast'" }, "geometry": { "type": "Polygon", "coordinates": [[[9289, 5883], [9192, 5880], [9164, 5866], [9132, 5802], [9117, 5706], [9081, 5710], [9014, 5652], [8886, 5625], [8852, 5582], [8836, 5517], [8841, 5426], [8811, 5370], [8812, 5330], [8869, 5331], [8867, 5289], [8820, 5241], [8833, 5160], [8770, 5086], [8781, 5131], [8743, 5151], [8716, 5133], [8612, 5144], [8547, 5116], [8439, 5124], [8381, 5071], [8296, 4926], [8247, 4969], [8111, 4910], [8091, 4944], [8122, 4988], [8154, 4994], [8154, 5051], [8085, 5082], [8055, 5144], [7989, 5184], [8035, 5216], [8028, 5297], [8112, 5298], [8127, 5355], [8167, 5342], [8197, 5443], [8143, 5436], [8048, 5524], [7990, 5520], [7928, 5571], [7904, 5561], [7829, 5730], [7789, 5730], [7782, 5778], [7754, 5832], [7814, 5850], [7777, 5893], [7780, 5992], [7826, 6002], [7929, 5956], [7966, 5991], [7949, 6081], [7981, 6114], [7963, 6198], [7913, 6213], [7899, 6303], [7944, 6419], [7938, 6454], [7895, 6451], [7880, 6410], [7856, 6438], [7879, 6468], [7839, 6494], [7811, 6631], [7893, 6631], [7938, 6657], [8007, 6625], [7996, 6656], [8058, 6701], [8104, 6696], [8124, 6757], [8179, 6787], [8163, 6834], [8208, 6903], [8339, 6995], [8328, 7024], [8278, 7030], [8302, 7069], [8359, 7073], [8437, 7056], [8481, 7084], [8535, 7058], [8514, 7017], [8558, 6998], [8619, 7017], [8606, 6944], [8632, 6885], [8595, 6838], [8717, 6818], [8733, 6759], [8761, 6746], [8787, 6636], [8756, 6583], [8775, 6468], [8805, 6455], [8802, 6399], [8866, 6383], [8916, 6314], [8880, 6284], [8910, 6235], [8970, 6246], [9020, 6146], [9136, 6105], [9131, 6054], [9171, 6024], [9273, 6019], [9297, 5939], [9289, 5883]]] } }, { "type": "Feature", "id": "UA.DP", "properties": { "hc-group": "admin1", "hc-middle-x": 0.33, "hc-middle-y": 0.61, "hc-key": "ua-dp", "hc-a2": "DP", "labelrank": "7", "hasc": "UA.DP", "alt-name": "Dnipropetrovsk|Dniepropietrovsk|Dnjepropetrowsk", "woe-id": "2347537", "subregion": null, "fips": "UP04", "postal-code": "DP", "name": "Dnipropetrovs'k", "country": "Ukraine", "type-en": "Region", "region": null, "longitude": "34.9555", "woe-name": "Dnipropetrovs'k", "latitude": "48.6313", "woe-label": "Dnipropetrovsk Oblast, UA, Ukraine", "type": "Oblast'" }, "geometry": { "type": "Polygon", "coordinates": [[[7839, 6494], [7879, 6468], [7856, 6438], [7880, 6410], [7895, 6451], [7938, 6454], [7944, 6419], [7899, 6303], [7913, 6213], [7963, 6198], [7981, 6114], [7949, 6081], [7966, 5991], [7929, 5956], [7826, 6002], [7780, 5992], [7777, 5893], [7814, 5850], [7754, 5832], [7782, 5778], [7619, 5743], [7560, 5758], [7553, 5785], [7494, 5757], [7496, 5853], [7461, 5862], [7437, 5915], [7405, 5933], [7385, 5987], [7304, 5961], [7220, 6013], [7143, 5972], [7017, 5985], [6958, 6008], [6826, 5994], [6775, 5958], [6712, 5989], [6698, 5893], [6761, 5831], [6704, 5797], [6704, 5761], [6757, 5726], [6748, 5665], [6784, 5646], [6760, 5511], [6771, 5456], [6720, 5450], [6565, 5485], [6481, 5443], [6332, 5399], [6242, 5400], [6145, 5430], [5993, 5403], [5950, 5428], [5936, 5483], [5883, 5442], [5795, 5410], [5770, 5446], [5644, 5489], [5592, 5497], [5598, 5562], [5579, 5605], [5640, 5622], [5626, 5664], [5639, 5770], [5608, 5801], [5610, 5838], [5624, 5892], [5680, 5943], [5725, 5952], [5734, 6025], [5757, 5967], [5806, 6037], [5830, 6027], [5903, 6091], [5883, 6274], [5861, 6351], [6025, 6433], [6084, 6481], [6045, 6507], [5953, 6527], [5925, 6574], [5985, 6605], [6053, 6604], [6086, 6564], [6142, 6661], [6215, 6609], [6289, 6589], [6335, 6555], [6369, 6590], [6380, 6641], [6356, 6685], [6370, 6754], [6445, 6856], [6552, 6906], [6621, 6925], [6655, 6952], [6739, 6962], [6774, 6945], [6873, 6938], [7004, 6822], [7062, 6783], [7140, 6783], [7260, 6751], [7347, 6792], [7404, 6725], [7370, 6687], [7437, 6662], [7499, 6599], [7477, 6567], [7564, 6501], [7586, 6436], [7569, 6402], [7611, 6397], [7675, 6498], [7750, 6470], [7839, 6494]]] } }, { "type": "Feature", "id": "UA.KK", "properties": { "hc-group": "admin1", "hc-middle-x": 0.50, "hc-middle-y": 0.41, "hc-key": "ua-kk", "hc-a2": "KK", "labelrank": "7", "hasc": "UA.KK", "alt-name": "Charkow|Jarkov|Karkov|Khar'kov", "woe-id": "2347540", "subregion": null, "fips": "UP07", "postal-code": "KK", "name": "Kharkiv", "country": "Ukraine", "type-en": "Region", "region": null, "longitude": "36.4612", "woe-name": "Kharkiv", "latitude": "49.4655", "woe-label": "Kharkiv Oblast, UA, Ukraine", "type": "Oblast'" }, "geometry": { "type": "Polygon", "coordinates": [[[8481, 7084], [8437, 7056], [8359, 7073], [8302, 7069], [8278, 7030], [8328, 7024], [8339, 6995], [8208, 6903], [8163, 6834], [8179, 6787], [8124, 6757], [8104, 6696], [8058, 6701], [7996, 6656], [8007, 6625], [7938, 6657], [7893, 6631], [7811, 6631], [7839, 6494], [7750, 6470], [7675, 6498], [7611, 6397], [7569, 6402], [7586, 6436], [7564, 6501], [7477, 6567], [7499, 6599], [7437, 6662], [7370, 6687], [7404, 6725], [7347, 6792], [7260, 6751], [7140, 6783], [7062, 6783], [7004, 6822], [6873, 6938], [6774, 6945], [6755, 7013], [6795, 7085], [6893, 7065], [6937, 7084], [6993, 7159], [6963, 7227], [7054, 7260], [7010, 7295], [7056, 7315], [7021, 7384], [7020, 7428], [6985, 7411], [6912, 7442], [6882, 7505], [6881, 7557], [6828, 7570], [6772, 7606], [6700, 7630], [6671, 7705], [6711, 7756], [6706, 7839], [6747, 7882], [6769, 7864], [6837, 7933], [6907, 7934], [6948, 7990], [6979, 7980], [6991, 8018], [7045, 8006], [7151, 8013], [7159, 8033], [7241, 8109], [7397, 8113], [7436, 8080], [7498, 7990], [7566, 8016], [7655, 7984], [7653, 7949], [7691, 7928], [7740, 7982], [7872, 8060], [7952, 8061], [8035, 8091], [8084, 8142], [8171, 8156], [8202, 8080], [8274, 8039], [8272, 7970], [8361, 7851], [8476, 7789], [8545, 7708], [8581, 7655], [8539, 7632], [8564, 7601], [8514, 7528], [8544, 7524], [8547, 7477], [8517, 7420], [8533, 7351], [8480, 7254], [8499, 7160], [8525, 7135], [8481, 7084]]] } }, { "type": "Feature", "id": "UA.LH", "properties": { "hc-group": "admin1", "hc-middle-x": 0.51, "hc-middle-y": 0.50, "hc-key": "ua-lh", "hc-a2": "LH", "labelrank": "7", "hasc": "UA.LH", "alt-name": "Luhansk|Lugansk|Luhans'ka Oblast'|Voroshilovgrad", "woe-id": "2347546", "subregion": null, "fips": "UP12", "postal-code": "LH", "name": "Luhans'k", "country": "Ukraine", "type-en": "Region", "region": null, "longitude": "39.0033", "woe-name": "Luhans'k", "latitude": "48.9084", "woe-label": "Luhansk Oblast, UA, Ukraine", "type": "Oblast'" }, "geometry": { "type": "Polygon", "coordinates": [[[9289, 5883], [9297, 5939], [9273, 6019], [9171, 6024], [9131, 6054], [9136, 6105], [9020, 6146], [8970, 6246], [8910, 6235], [8880, 6284], [8916, 6314], [8866, 6383], [8802, 6399], [8805, 6455], [8775, 6468], [8756, 6583], [8787, 6636], [8761, 6746], [8733, 6759], [8717, 6818], [8595, 6838], [8632, 6885], [8606, 6944], [8619, 7017], [8558, 6998], [8514, 7017], [8535, 7058], [8481, 7084], [8525, 7135], [8499, 7160], [8480, 7254], [8533, 7351], [8517, 7420], [8547, 7477], [8544, 7524], [8514, 7528], [8564, 7601], [8539, 7632], [8581, 7655], [8545, 7708], [8627, 7742], [8624, 7851], [8698, 7857], [8728, 7796], [8821, 7763], [8918, 7784], [8935, 7740], [9035, 7704], [9090, 7651], [9146, 7659], [9191, 7715], [9230, 7713], [9270, 7631], [9326, 7600], [9393, 7627], [9462, 7609], [9509, 7512], [9621, 7457], [9686, 7482], [9718, 7521], [9803, 7518], [9804, 7476], [9772, 7450], [9770, 7391], [9851, 7287], [9848, 7206], [9745, 7085], [9732, 7013], [9592, 6975], [9591, 6929], [9648, 6866], [9732, 6859], [9767, 6837], [9799, 6872], [9828, 6858], [9812, 6805], [9763, 6776], [9694, 6796], [9627, 6727], [9597, 6578], [9704, 6585], [9734, 6562], [9731, 6509], [9791, 6402], [9731, 6334], [9775, 6311], [9841, 6312], [9825, 6264], [9788, 6224], [9762, 6164], [9769, 6088], [9720, 6064], [9745, 6026], [9734, 5898], [9700, 5876], [9637, 5887], [9510, 5870], [9464, 5887], [9326, 5863], [9289, 5883]]] } }, { "type": "Feature", "id": "UA.PL", "properties": { "hc-group": "admin1", "hc-middle-x": 0.57, "hc-middle-y": 0.51, "hc-key": "ua-pl", "hc-a2": "PL", "labelrank": "7", "hasc": "UA.PL", "alt-name": null, "woe-id": "2347550", "subregion": null, "fips": "UP16", "postal-code": "PL", "name": "Poltava", "country": "Ukraine", "type-en": "Region", "region": null, "longitude": "33.7723", "woe-name": "Poltava", "latitude": "49.6978", "woe-label": "Poltava Oblast, UA, Ukraine", "type": "Oblast'" }, "geometry": { "type": "Polygon", "coordinates": [[[5625, 8182], [5709, 8164], [5754, 8189], [5786, 8171], [5964, 8135], [6008, 8115], [6078, 8134], [6058, 8150], [6119, 8178], [6198, 8125], [6293, 8191], [6313, 8185], [6321, 8095], [6393, 8011], [6396, 7939], [6422, 7947], [6469, 7860], [6442, 7834], [6453, 7798], [6489, 7814], [6567, 7808], [6587, 7840], [6651, 7850], [6706, 7839], [6711, 7756], [6671, 7705], [6700, 7630], [6772, 7606], [6828, 7570], [6881, 7557], [6882, 7505], [6912, 7442], [6985, 7411], [7020, 7428], [7021, 7384], [7056, 7315], [7010, 7295], [7054, 7260], [6963, 7227], [6993, 7159], [6937, 7084], [6893, 7065], [6795, 7085], [6755, 7013], [6774, 6945], [6739, 6962], [6655, 6952], [6621, 6925], [6552, 6906], [6445, 6856], [6370, 6754], [6356, 6685], [6380, 6641], [6369, 6590], [6335, 6555], [6289, 6589], [6215, 6609], [6142, 6661], [6056, 6712], [6006, 6696], [5994, 6663], [5947, 6711], [5915, 6693], [5863, 6728], [5814, 6727], [5768, 6776], [5796, 6810], [5767, 6840], [5711, 6845], [5674, 6899], [5612, 6946], [5463, 7019], [5463, 7084], [5396, 7220], [5443, 7279], [5438, 7328], [5407, 7392], [5343, 7418], [5334, 7471], [5251, 7517], [5214, 7585], [5241, 7600], [5242, 7670], [5195, 7740], [5152, 7751], [5133, 7828], [5045, 7912], [5059, 7955], [5087, 8013], [5136, 8007], [5174, 8048], [5225, 8066], [5288, 8059], [5299, 8030], [5430, 8018], [5521, 8057], [5594, 8129], [5625, 8182]]] } }, { "type": "Feature", "id": "UA.ZP", "properties": { "hc-group": "admin1", "hc-middle-x": 0.48, "hc-middle-y": 0.44, "hc-key": "ua-zp", "hc-a2": "ZP", "labelrank": "7", "hasc": "UA.ZP", "alt-name": "Saporoshje|Zaporizhia|Zaporiz'ka Oblast'|Zaporojie|Zaporozhskaya Oblast'|Zaporozh'ye|Zaporo?je", "woe-id": "2347557", "subregion": null, "fips": "UP23", "postal-code": "ZP", "name": "Zaporizhzhya", "country": "Ukraine", "type-en": "Region", "region": null, "longitude": "35.7123", "woe-name": "Zaporizhzhya", "latitude": "47.3346", "woe-label": "Zaporizhia Oblast, UA, Ukraine", "type": "Oblast'" }, "geometry": { "type": "Polygon", "coordinates": [[[7782, 5778], [7789, 5730], [7829, 5730], [7904, 5561], [7928, 5571], [7990, 5520], [8048, 5524], [8143, 5436], [8197, 5443], [8167, 5342], [8127, 5355], [8112, 5298], [8028, 5297], [8035, 5216], [7989, 5184], [8055, 5144], [8085, 5082], [8154, 5051], [8154, 4994], [8122, 4988], [8091, 4944], [8111, 4910], [8019, 4840], [7965, 4716], [7971, 4765], [7902, 4812], [7795, 4788], [7701, 4738], [7661, 4691], [7647, 4643], [7589, 4697], [7509, 4695], [7409, 4675], [7329, 4625], [7242, 4529], [7169, 4489], [7090, 4405], [7029, 4300], [7021, 4304], [7020, 4305], [7066, 4375], [7019, 4387], [7027, 4466], [6952, 4515], [6983, 4442], [6918, 4333], [6889, 4343], [6870, 4479], [6799, 4517], [6755, 4516], [6756, 4554], [6694, 4561], [6670, 4608], [6675, 4662], [6610, 4689], [6645, 4718], [6712, 4817], [6661, 4905], [6589, 4937], [6565, 4972], [6547, 5058], [6528, 5070], [6504, 5212], [6516, 5256], [6474, 5251], [6453, 5216], [6394, 5212], [6332, 5399], [6481, 5443], [6565, 5485], [6720, 5450], [6771, 5456], [6760, 5511], [6784, 5646], [6748, 5665], [6757, 5726], [6704, 5761], [6704, 5797], [6761, 5831], [6698, 5893], [6712, 5989], [6775, 5958], [6826, 5994], [6958, 6008], [7017, 5985], [7143, 5972], [7220, 6013], [7304, 5961], [7385, 5987], [7405, 5933], [7437, 5915], [7461, 5862], [7496, 5853], [7494, 5757], [7553, 5785], [7560, 5758], [7619, 5743], [7782, 5778]]] } }, { "type": "Feature", "id": "UA.SC", "properties": { "hc-group": "admin1", "hc-middle-x": 0.18, "hc-middle-y": 0.61, "hc-key": "ua-sc", "hc-a2": "SC", "labelrank": "5", "hasc": "UA.SC", "alt-name": null, "woe-id": "20070189", "subregion": null, "fips": "UP08", "postal-code": "SC", "name": "Sevastopol", "country": "Ukraine", "type-en": null, "region": null, "longitude": "33.6396", "woe-name": "Sevastopol City Municipality", "latitude": "44.5182", "woe-label": "Sevastopol City Municipality, UA, Ukraine", "type": "Oblast'" }, "geometry": { "type": "Polygon", "coordinates": [[[6065, 2590], [6010, 2615], [5966, 2680], [5926, 2674], [5836, 2740], [5872, 2778], [5961, 2792], [5923, 2818], [5944, 2873], [5924, 2942], [5958, 3003], [5965, 2973], [6026, 2949], [6036, 2914], [5986, 2884], [5995, 2830], [6050, 2835], [6077, 2796], [6053, 2757], [6114, 2709], [6145, 2622], [6065, 2590]]] } }, { "type": "Feature", "id": "UA.KR", "properties": { "hc-group": "admin1", "hc-middle-x": 0.42, "hc-middle-y": 0.49, "hc-key": "ua-kr", "hc-a2": "KR", "labelrank": "5", "hasc": "UA.KR", "alt-name": "Crimée|Criméia|Krim|Krymskaya Respublika|Respublika Krym", "woe-id": "2347544", "subregion": null, "fips": "UP08", "postal-code": "KR", "name": "Crimea", "country": "Ukraine", "type-en": "Autonomous Republic", "region": null, "longitude": "34.2784", "woe-name": "Crimea", "latitude": "45.3115", "woe-label": "Crimea, UA, Ukraine", "type": "Oblast'" }, "geometry": { "type": "Polygon", "coordinates": [[[6866, 3816], [6894, 3763], [7086, 3496], [7183, 3432], [7320, 3466], [7420, 3596], [7431, 3537], [7506, 3502], [7599, 3596], [7730, 3597], [7776, 3580], [7827, 3588], [7855, 3559], [7887, 3577], [7925, 3509], [7838, 3501], [7788, 3392], [7790, 3300], [7809, 3245], [7705, 3221], [7672, 3185], [7556, 3218], [7523, 3170], [7429, 3162], [7377, 3227], [7287, 3269], [7182, 3253], [7137, 3191], [7162, 3170], [7047, 3119], [7022, 3078], [6983, 3065], [6938, 2966], [6888, 3002], [6825, 2987], [6728, 2985], [6635, 2933], [6542, 2899], [6486, 2808], [6450, 2728], [6419, 2730], [6337, 2641], [6214, 2578], [6145, 2594], [6065, 2590], [6145, 2622], [6114, 2709], [6053, 2757], [6077, 2796], [6050, 2835], [5995, 2830], [5986, 2884], [6036, 2914], [6026, 2949], [5965, 2973], [5958, 3003], [5990, 3076], [5952, 3223], [5855, 3305], [5756, 3279], [5701, 3316], [5639, 3384], [5524, 3459], [5428, 3468], [5372, 3428], [5276, 3447], [5256, 3510], [5285, 3555], [5361, 3612], [5434, 3651], [5479, 3649], [5505, 3710], [5549, 3740], [5693, 3807], [5697, 3851], [5736, 3820], [5827, 3862], [5896, 3915], [5942, 3909], [5983, 3941], [6029, 3922], [6030, 3971], [6083, 3985], [6000, 4030], [5987, 4162], [6014, 4206], [6012, 4246], [6052, 4182], [6087, 4160], [6098, 4211], [6128, 4195], [6120, 4155], [6150, 4110], [6212, 4067], [6217, 4121], [6246, 4131], [6330, 4051], [6295, 4038], [6322, 3995], [6349, 4007], [6341, 4061], [6300, 4106], [6368, 4080], [6399, 4096], [6419, 4051], [6445, 4078], [6485, 4015], [6465, 3986], [6491, 3940], [6496, 3982], [6536, 3943], [6590, 4002], [6622, 4010], [6607, 3950], [6573, 3932], [6520, 3848], [6574, 3868], [6637, 3929], [6702, 3970], [6701, 3930], [6653, 3913], [6638, 3863], [6687, 3889], [6713, 3863], [6683, 3808], [6783, 3817], [6762, 3791], [6802, 3760], [6844, 3761], [6911, 3665], [6927, 3571], [6878, 3544], [6906, 3495], [6952, 3457], [6998, 3462], [7099, 3418], [7136, 3388], [7167, 3415], [7091, 3468], [6866, 3767], [6850, 3806], [6866, 3816]]] } }, { "type": "Feature", "id": "UA.CH", "properties": { "hc-group": "admin1", "hc-middle-x": 0.47, "hc-middle-y": 0.51, "hc-key": "ua-ch", "hc-a2": "CH", "labelrank": "7", "hasc": "UA.CH", "alt-name": "Chernigov|Tschernigow", "woe-id": "2347535", "subregion": null, "fips": "UP02", "postal-code": "CH", "name": "Chernihiv", "country": "Ukraine", "type-en": "Region", "region": null, "longitude": "32.0287", "woe-name": "Chernihiv", "latitude": "51.2597", "woe-label": "Chernihiv Oblast, UA, Ukraine", "type": "Oblast'" }, "geometry": { "type": "Polygon", "coordinates": [[[4190, 8847], [4206, 8902], [4240, 8931], [4233, 9044], [4188, 9131], [4178, 9177], [4203, 9195], [4213, 9264], [4237, 9266], [4272, 9345], [4268, 9371], [4320, 9443], [4355, 9459], [4409, 9531], [4443, 9599], [4541, 9598], [4606, 9567], [4637, 9614], [4733, 9631], [4831, 9610], [4930, 9615], [4961, 9598], [4966, 9552], [5036, 9564], [5080, 9555], [5158, 9590], [5200, 9645], [5213, 9716], [5235, 9741], [5228, 9809], [5325, 9804], [5435, 9745], [5502, 9754], [5548, 9740], [5606, 9791], [5628, 9792], [5699, 9851], [5813, 9829], [5790, 9741], [5767, 9706], [5772, 9654], [5841, 9595], [5850, 9560], [5807, 9568], [5788, 9507], [5795, 9466], [5716, 9429], [5680, 9427], [5624, 9326], [5637, 9279], [5676, 9235], [5667, 9194], [5695, 9073], [5658, 9066], [5652, 8942], [5589, 8948], [5617, 8914], [5629, 8830], [5600, 8778], [5570, 8769], [5557, 8689], [5601, 8672], [5637, 8632], [5708, 8647], [5678, 8593], [5692, 8516], [5674, 8495], [5661, 8400], [5684, 8378], [5648, 8293], [5625, 8182], [5594, 8129], [5521, 8057], [5430, 8018], [5299, 8030], [5288, 8059], [5225, 8066], [5174, 8048], [5136, 8007], [5087, 8013], [5045, 8044], [5054, 8069], [5013, 8085], [4992, 8133], [5026, 8155], [5021, 8195], [4986, 8197], [4921, 8265], [4890, 8254], [4862, 8202], [4786, 8172], [4695, 8157], [4587, 8178], [4578, 8212], [4533, 8240], [4558, 8282], [4523, 8357], [4481, 8406], [4343, 8382], [4281, 8404], [4308, 8479], [4237, 8526], [4244, 8592], [4223, 8625], [4164, 8634], [4157, 8670], [4174, 8784], [4167, 8832], [4190, 8847]]] } }, { "type": "Feature", "id": "UA.RV", "properties": { "hc-group": "admin1", "hc-middle-x": 0.56, "hc-middle-y": 0.53, "hc-key": "ua-rv", "hc-a2": "RV", "labelrank": "7", "hasc": "UA.RV", "alt-name": "Rovno|Rivnens'ka Oblast'|Rovenskaya Oblast'", "woe-id": "2347551", "subregion": null, "fips": "UP18", "postal-code": "RV", "name": "Rivne", "country": "Ukraine", "type-en": "Region", "region": null, "longitude": "26.3841", "woe-name": "Rivne", "latitude": "51.048", "woe-label": "Rivne Oblast, UA, Ukraine", "type": "Oblast'" }, "geometry": { "type": "Polygon", "coordinates": [[[2554, 9160], [2508, 9147], [2501, 9076], [2458, 9122], [2435, 9009], [2403, 9004], [2413, 8931], [2355, 8856], [2311, 8770], [2252, 8726], [2269, 8633], [2255, 8547], [2277, 8492], [2222, 8387], [2245, 8353], [2217, 8317], [2181, 8357], [2090, 8307], [2052, 8321], [1952, 8270], [1880, 8174], [1771, 8086], [1733, 8089], [1671, 8028], [1628, 8010], [1614, 8064], [1630, 8110], [1596, 8096], [1536, 8122], [1470, 8128], [1382, 8058], [1314, 8059], [1233, 8037], [1173, 8064], [1176, 8010], [1109, 7933], [1020, 8017], [1011, 8133], [1034, 8193], [958, 8208], [1042, 8268], [992, 8361], [1038, 8386], [1026, 8437], [1102, 8418], [1124, 8433], [1123, 8485], [1164, 8475], [1166, 8538], [1211, 8512], [1310, 8550], [1350, 8543], [1372, 8504], [1439, 8472], [1462, 8523], [1470, 8603], [1520, 8640], [1562, 8699], [1555, 8757], [1614, 8768], [1618, 8794], [1585, 8860], [1541, 8866], [1547, 8901], [1592, 8907], [1613, 8959], [1545, 9016], [1484, 9107], [1496, 9154], [1447, 9162], [1419, 9141], [1342, 9145], [1359, 9306], [1390, 9346], [1343, 9382], [1359, 9481], [1425, 9547], [1448, 9626], [1390, 9657], [1515, 9652], [1689, 9610], [1738, 9565], [1869, 9547], [1886, 9504], [2010, 9489], [2113, 9433], [2150, 9423], [2208, 9439], [2295, 9415], [2303, 9331], [2345, 9324], [2328, 9274], [2403, 9264], [2456, 9290], [2567, 9255], [2582, 9230], [2554, 9160]]] } }, { "type": "Feature", "id": "UA.CV", "properties": { "hc-group": "admin1", "hc-middle-x": 0.40, "hc-middle-y": 0.45, "hc-key": "ua-cv", "hc-a2": "CV", "labelrank": "7", "hasc": "UA.CV", "alt-name": "Chernivets'ka Oblast'|Chernovitskaya Oblast'|Chernovtsy|Czernowitz|Tschernowzy|Tchernovtsy", "woe-id": "2347536", "subregion": null, "fips": "UP03", "postal-code": "CV", "name": "Chernivtsi", "country": "Ukraine", "type-en": "Region", "region": null, "longitude": "26.2156", "woe-name": "Chernivtsi", "latitude": "48.2892", "woe-label": "Chernivtsi Oblast, UA, Ukraine", "type": "Oblast'" }, "geometry": { "type": "Polygon", "coordinates": [[[2260, 6419], [2205, 6372], [2159, 6393], [2097, 6341], [2053, 6333], [1965, 6372], [1967, 6338], [1911, 6334], [1854, 6378], [1812, 6356], [1812, 6290], [1750, 6328], [1707, 6267], [1512, 6240], [1495, 6162], [1415, 6048], [1385, 6037], [1257, 6039], [1153, 6018], [849, 6015], [821, 5999], [752, 5907], [683, 5872], [628, 5868], [671, 5968], [654, 6080], [660, 6140], [702, 6215], [799, 6278], [803, 6322], [842, 6345], [909, 6415], [1008, 6460], [1091, 6445], [1115, 6571], [1099, 6654], [1147, 6702], [1214, 6653], [1241, 6685], [1305, 6604], [1353, 6632], [1400, 6632], [1389, 6581], [1445, 6547], [1583, 6514], [1639, 6528], [1691, 6450], [1718, 6480], [1780, 6479], [1726, 6523], [1739, 6542], [1791, 6513], [1806, 6561], [1861, 6568], [1857, 6531], [1890, 6512], [1929, 6544], [2029, 6516], [2051, 6535], [2111, 6520], [2106, 6564], [2158, 6544], [2189, 6568], [2228, 6540], [2260, 6419]]] } }, { "type": "Feature", "id": "UA.IF", "properties": { "hc-group": "admin1", "hc-middle-x": 0.50, "hc-middle-y": 0.46, "hc-key": "ua-if", "hc-a2": "IF", "labelrank": "7", "hasc": "UA.IF", "alt-name": "Ivano-Frankovsk|Ivano-Frankovskaya Oblast'|Stanislav", "woe-id": "2347539", "subregion": null, "fips": "UP06", "postal-code": "IF", "name": "Ivano-Frankivs'k", "country": "Ukraine", "type-en": "Region", "region": null, "longitude": "24.6363", "woe-name": "Ivano-Frankivs'k", "latitude": "48.665", "woe-label": "Ivano-Frankivsk Oblast, UA, Ukraine", "type": "Oblast'" }, "geometry": { "type": "Polygon", "coordinates": [[[1147, 6702], [1099, 6654], [1115, 6571], [1091, 6445], [1008, 6460], [909, 6415], [842, 6345], [803, 6322], [799, 6278], [702, 6215], [660, 6140], [654, 6080], [671, 5968], [628, 5868], [597, 5875], [554, 5959], [478, 6013], [474, 6051], [430, 6095], [483, 6190], [430, 6276], [440, 6347], [417, 6399], [315, 6523], [282, 6494], [216, 6522], [228, 6661], [84, 6639], [84, 6699], [21, 6756], [24, 6788], [-38, 6810], [-69, 6860], [-115, 6884], [-77, 6981], [-88, 7025], [-57, 7111], [-17, 7137], [15, 7200], [62, 7223], [151, 7205], [252, 7226], [305, 7213], [480, 7247], [470, 7286], [438, 7291], [438, 7352], [489, 7412], [467, 7432], [519, 7540], [592, 7539], [669, 7500], [728, 7353], [723, 7286], [743, 7225], [722, 7199], [728, 7143], [786, 7138], [795, 7086], [740, 7094], [779, 7014], [832, 7004], [867, 6975], [862, 6933], [935, 6956], [915, 6876], [976, 6869], [927, 6852], [924, 6813], [991, 6875], [1039, 6870], [1080, 6825], [1150, 6777], [1147, 6702]]] } }, { "type": "Feature", "id": "UA.KM", "properties": { "hc-group": "admin1", "hc-middle-x": 0.49, "hc-middle-y": 0.47, "hc-key": "ua-km", "hc-a2": "KM", "labelrank": "7", "hasc": "UA.KM", "alt-name": "Khmelnitsky|Khmelnytskyi|Chmelnizkij|Hmelnicki|Kamenets-Podol'skaya Oblast'|Khmel'nyts'ka Oblast'", "woe-id": "2347542", "subregion": null, "fips": "UP09", "postal-code": "KM", "name": "Khmel'nyts'kyy", "country": "Ukraine", "type-en": "Region", "region": null, "longitude": "27.0187", "woe-name": "Khmel'nyts'kyy", "latitude": "49.5537", "woe-label": "Khmelnytskyi Oblast, UA, Ukraine", "type": "Oblast'" }, "geometry": { "type": "Polygon", "coordinates": [[[2189, 6568], [2158, 6544], [2106, 6564], [2111, 6520], [2051, 6535], [2029, 6516], [1929, 6544], [1890, 6512], [1857, 6531], [1861, 6568], [1806, 6561], [1791, 6513], [1739, 6542], [1726, 6523], [1780, 6479], [1718, 6480], [1691, 6450], [1639, 6528], [1583, 6514], [1581, 6568], [1545, 6598], [1554, 6632], [1509, 6674], [1533, 6790], [1509, 6823], [1519, 6868], [1503, 6921], [1526, 6962], [1516, 7001], [1539, 7034], [1527, 7122], [1558, 7180], [1563, 7323], [1547, 7341], [1525, 7436], [1565, 7479], [1599, 7563], [1575, 7609], [1597, 7664], [1573, 7712], [1564, 7837], [1617, 7878], [1595, 7898], [1610, 7955], [1648, 7976], [1628, 8010], [1671, 8028], [1733, 8089], [1771, 8086], [1880, 8174], [1952, 8270], [2052, 8321], [2090, 8307], [2181, 8357], [2217, 8317], [2277, 8254], [2228, 8182], [2323, 8086], [2367, 8015], [2438, 8033], [2455, 7958], [2435, 7877], [2457, 7833], [2387, 7815], [2402, 7760], [2377, 7731], [2404, 7714], [2440, 7620], [2560, 7576], [2485, 7502], [2517, 7476], [2465, 7369], [2479, 7314], [2464, 7290], [2514, 7277], [2501, 7238], [2535, 7136], [2521, 7112], [2535, 7031], [2459, 6994], [2372, 7040], [2341, 7008], [2301, 7015], [2233, 6923], [2211, 6846], [2232, 6700], [2214, 6687], [2189, 6568]]] } }, { "type": "Feature", "id": "UA.LV", "properties": { "hc-group": "admin1", "hc-middle-x": 0.42, "hc-middle-y": 0.52, "hc-key": "ua-lv", "hc-a2": "LV", "labelrank": "7", "hasc": "UA.LV", "alt-name": "Lemberg|Llvov|L'vov|Lwow|L'vivs'ka Oblast'", "woe-id": "2347547", "subregion": null, "fips": "UP13", "postal-code": "LV", "name": "L'viv", "country": "Ukraine", "type-en": "Region", "region": null, "longitude": "24.0372", "woe-name": "L'viv", "latitude": "49.8152", "woe-label": "Lviv Oblast, UA, Ukraine", "type": "Oblast'" }, "geometry": { "type": "Polygon", "coordinates": [[[958, 8208], [1034, 8193], [1011, 8133], [1020, 8017], [1109, 7933], [1139, 7876], [1114, 7818], [1017, 7778], [932, 7771], [930, 7701], [880, 7687], [825, 7607], [688, 7556], [669, 7500], [592, 7539], [519, 7540], [467, 7432], [489, 7412], [438, 7352], [438, 7291], [470, 7286], [480, 7247], [305, 7213], [252, 7226], [151, 7205], [62, 7223], [15, 7200], [-17, 7137], [-57, 7111], [-88, 7025], [-77, 6981], [-115, 6884], [-247, 6925], [-320, 6972], [-355, 7051], [-413, 7044], [-475, 7126], [-462, 7177], [-481, 7199], [-480, 7265], [-557, 7354], [-573, 7349], [-525, 7448], [-522, 7532], [-541, 7583], [-551, 7686], [-451, 7813], [-420, 7824], [-226, 8039], [-2, 8228], [81, 8277], [143, 8331], [162, 8368], [202, 8383], [307, 8371], [340, 8380], [366, 8458], [428, 8495], [438, 8576], [472, 8581], [514, 8522], [592, 8531], [618, 8480], [656, 8472], [674, 8438], [622, 8398], [644, 8349], [675, 8371], [793, 8268], [874, 8266], [889, 8284], [962, 8244], [958, 8208]]] } }, { "type": "Feature", "id": "UA.TP", "properties": { "hc-group": "admin1", "hc-middle-x": 0.53, "hc-middle-y": 0.47, "hc-key": "ua-tp", "hc-a2": "TP", "labelrank": "7", "hasc": "UA.TP", "alt-name": "Ternopol|Ternopol'", "woe-id": "2347553", "subregion": null, "fips": "UP19", "postal-code": "TP", "name": "Ternopil'", "country": "Ukraine", "type-en": "Region", "region": null, "longitude": "25.5438", "woe-name": "Ternopil'", "latitude": "49.4739", "woe-label": "Ternopil Oblast, UA, Ukraine", "type": "Oblast'" }, "geometry": { "type": "Polygon", "coordinates": [[[1147, 6702], [1150, 6777], [1080, 6825], [1039, 6870], [991, 6875], [924, 6813], [927, 6852], [976, 6869], [915, 6876], [935, 6956], [862, 6933], [867, 6975], [832, 7004], [779, 7014], [740, 7094], [795, 7086], [786, 7138], [728, 7143], [722, 7199], [743, 7225], [723, 7286], [728, 7353], [669, 7500], [688, 7556], [825, 7607], [880, 7687], [930, 7701], [932, 7771], [1017, 7778], [1114, 7818], [1139, 7876], [1109, 7933], [1176, 8010], [1173, 8064], [1233, 8037], [1314, 8059], [1382, 8058], [1470, 8128], [1536, 8122], [1596, 8096], [1630, 8110], [1614, 8064], [1628, 8010], [1648, 7976], [1610, 7955], [1595, 7898], [1617, 7878], [1564, 7837], [1573, 7712], [1597, 7664], [1575, 7609], [1599, 7563], [1565, 7479], [1525, 7436], [1547, 7341], [1563, 7323], [1558, 7180], [1527, 7122], [1539, 7034], [1516, 7001], [1526, 6962], [1503, 6921], [1519, 6868], [1509, 6823], [1533, 6790], [1509, 6674], [1554, 6632], [1545, 6598], [1581, 6568], [1583, 6514], [1445, 6547], [1389, 6581], [1400, 6632], [1353, 6632], [1305, 6604], [1241, 6685], [1214, 6653], [1147, 6702]]] } }, { "type": "Feature", "id": "UA.ZK", "properties": { "hc-group": "admin1", "hc-middle-x": 0.49, "hc-middle-y": 0.56, "hc-key": "ua-zk", "hc-a2": "ZK", "labelrank": "5", "hasc": "UA.ZK", "alt-name": "Transcarpathian|Zakarpattia|Ruthenia|Zakarpats'ka Oblast'|Zakarpatskaya Oblast'", "woe-id": "2347556", "subregion": null, "fips": "UP22", "postal-code": "ZK", "name": "Transcarpathia", "country": "Ukraine", "type-en": "Region", "region": null, "longitude": "23.3868", "woe-name": "Transcarpathia", "latitude": "48.3634", "woe-label": "Zakarpattia Oblast, UA, Ukraine", "type": "Oblast'" }, "geometry": { "type": "Polygon", "coordinates": [[[-115, 6884], [-69, 6860], [-38, 6810], [24, 6788], [21, 6756], [84, 6699], [84, 6639], [228, 6661], [216, 6522], [282, 6494], [315, 6523], [417, 6399], [440, 6347], [430, 6276], [483, 6190], [430, 6095], [345, 6118], [218, 6081], [70, 6159], [6, 6141], [-48, 6196], [-178, 6229], [-232, 6204], [-303, 6233], [-372, 6321], [-439, 6341], [-483, 6269], [-512, 6252], [-559, 6277], [-604, 6229], [-627, 6262], [-603, 6304], [-617, 6347], [-663, 6394], [-754, 6392], [-771, 6465], [-808, 6530], [-884, 6541], [-907, 6592], [-915, 6694], [-999, 6708], [-978, 6839], [-963, 6870], [-846, 6960], [-808, 7042], [-804, 7087], [-769, 7123], [-736, 7196], [-690, 7209], [-669, 7280], [-643, 7285], [-611, 7245], [-543, 7237], [-490, 7183], [-481, 7199], [-462, 7177], [-475, 7126], [-413, 7044], [-355, 7051], [-320, 6972], [-247, 6925], [-115, 6884]]] } }, { "type": "Feature", "id": "UA.VO", "properties": { "hc-group": "admin1", "hc-middle-x": 0.52, "hc-middle-y": 0.49, "hc-key": "ua-vo", "hc-a2": "VO", "labelrank": "5", "hasc": "UA.VO", "alt-name": "Volhynia|Volyns'ka Oblast'|Volynskaya Oblast'|Wolynien", "woe-id": "2347555", "subregion": null, "fips": "UP21", "postal-code": "VO", "name": "Volyn", "country": "Ukraine", "type-en": "Region", "region": null, "longitude": "24.8444", "woe-name": "Volyn", "latitude": "51.1247", "woe-label": "Volyn Oblast, UA, Ukraine", "type": "Oblast'" }, "geometry": { "type": "Polygon", "coordinates": [[[958, 8208], [962, 8244], [889, 8284], [874, 8266], [793, 8268], [675, 8371], [644, 8349], [622, 8398], [674, 8438], [656, 8472], [618, 8480], [592, 8531], [514, 8522], [472, 8581], [438, 8576], [431, 8653], [377, 8718], [380, 8763], [474, 8764], [477, 8791], [398, 8864], [367, 8932], [360, 9052], [294, 9135], [246, 9254], [290, 9309], [254, 9399], [266, 9438], [255, 9499], [278, 9518], [348, 9523], [421, 9491], [472, 9454], [566, 9520], [635, 9556], [675, 9634], [736, 9693], [877, 9687], [922, 9673], [1083, 9681], [1189, 9706], [1281, 9670], [1390, 9657], [1448, 9626], [1425, 9547], [1359, 9481], [1343, 9382], [1390, 9346], [1359, 9306], [1342, 9145], [1419, 9141], [1447, 9162], [1496, 9154], [1484, 9107], [1545, 9016], [1613, 8959], [1592, 8907], [1547, 8901], [1541, 8866], [1585, 8860], [1618, 8794], [1614, 8768], [1555, 8757], [1562, 8699], [1520, 8640], [1470, 8603], [1462, 8523], [1439, 8472], [1372, 8504], [1350, 8543], [1310, 8550], [1211, 8512], [1166, 8538], [1164, 8475], [1123, 8485], [1124, 8433], [1102, 8418], [1026, 8437], [1038, 8386], [992, 8361], [1042, 8268], [958, 8208]]] } }, { "type": "Feature", "id": "UA.CK", "properties": { "hc-group": "admin1", "hc-middle-x": 0.52, "hc-middle-y": 0.57, "hc-key": "ua-ck", "hc-a2": "CK", "labelrank": "7", "hasc": "UA.CK", "alt-name": "Cherkas'ka Oblast'|Cherkasskaya Oblast'|Cherkassy", "woe-id": "2347534", "subregion": null, "fips": "UP01", "postal-code": "CK", "name": "Cherkasy", "country": "Ukraine", "type-en": "Region", "region": null, "longitude": "31.2241", "woe-name": "Cherkasy", "latitude": "49.1506", "woe-label": "Cherkasy Oblast, UA, Ukraine", "type": "Oblast'" }, "geometry": { "type": "Polygon", "coordinates": [[[5045, 7912], [5133, 7828], [5152, 7751], [5195, 7740], [5242, 7670], [5241, 7600], [5214, 7585], [5251, 7517], [5334, 7471], [5343, 7418], [5407, 7392], [5438, 7328], [5443, 7279], [5396, 7220], [5463, 7084], [5463, 7019], [5441, 6952], [5463, 6914], [5470, 6848], [5496, 6781], [5458, 6747], [5399, 6768], [5369, 6731], [5298, 6718], [5261, 6832], [5207, 6828], [5189, 6864], [5135, 6830], [5079, 6765], [5069, 6706], [5007, 6718], [4925, 6659], [4874, 6716], [4802, 6736], [4779, 6712], [4715, 6719], [4703, 6638], [4663, 6572], [4584, 6539], [4570, 6557], [4492, 6566], [4416, 6547], [4347, 6575], [4271, 6572], [4205, 6587], [4151, 6549], [4141, 6497], [4103, 6457], [4122, 6407], [4067, 6398], [4026, 6416], [4006, 6379], [3926, 6341], [3878, 6346], [3817, 6317], [3748, 6339], [3787, 6394], [3753, 6499], [3695, 6544], [3713, 6578], [3645, 6611], [3615, 6748], [3570, 6779], [3595, 6812], [3550, 6847], [3618, 6940], [3618, 7030], [3664, 6977], [3720, 6982], [3752, 7042], [3824, 7074], [3867, 7064], [3889, 7112], [3904, 7069], [4008, 7043], [4032, 7024], [4058, 7120], [4096, 7100], [4152, 7103], [4172, 7129], [4237, 7093], [4320, 7127], [4343, 7113], [4368, 7171], [4448, 7242], [4496, 7300], [4481, 7354], [4508, 7402], [4524, 7479], [4515, 7539], [4535, 7571], [4609, 7608], [4665, 7615], [4691, 7568], [4747, 7574], [4827, 7558], [4887, 7661], [4887, 7695], [4928, 7724], [4914, 7783], [4953, 7830], [5001, 7859], [5007, 7922], [5045, 7912]]] } }, { "type": "Feature", "id": "UA.KH", "properties": { "hc-group": "admin1", "hc-middle-x": 0.64, "hc-middle-y": 0.52, "hc-key": "ua-kh", "hc-a2": "KH", "labelrank": "7", "hasc": "UA.KH", "alt-name": "Kirovograd|Kirovogradskaya Oblast'", "woe-id": "2347543", "subregion": null, "fips": "UP10", "postal-code": "KH", "name": "Kirovohrad", "country": "Ukraine", "type-en": "Region", "region": null, "longitude": "31.8288", "woe-name": "Kirovohrad", "latitude": "48.4261", "woe-label": "Kirovohrad Oblast, UA, Ukraine", "type": "Oblast'" }, "geometry": { "type": "Polygon", "coordinates": [[[3817, 6317], [3878, 6346], [3926, 6341], [4006, 6379], [4026, 6416], [4067, 6398], [4122, 6407], [4103, 6457], [4141, 6497], [4151, 6549], [4205, 6587], [4271, 6572], [4347, 6575], [4416, 6547], [4492, 6566], [4570, 6557], [4584, 6539], [4663, 6572], [4703, 6638], [4715, 6719], [4779, 6712], [4802, 6736], [4874, 6716], [4925, 6659], [5007, 6718], [5069, 6706], [5079, 6765], [5135, 6830], [5189, 6864], [5207, 6828], [5261, 6832], [5298, 6718], [5369, 6731], [5399, 6768], [5458, 6747], [5496, 6781], [5470, 6848], [5463, 6914], [5441, 6952], [5463, 7019], [5612, 6946], [5674, 6899], [5711, 6845], [5767, 6840], [5796, 6810], [5768, 6776], [5814, 6727], [5863, 6728], [5915, 6693], [5947, 6711], [5994, 6663], [6006, 6696], [6056, 6712], [6142, 6661], [6086, 6564], [6053, 6604], [5985, 6605], [5925, 6574], [5953, 6527], [6045, 6507], [6084, 6481], [6025, 6433], [5861, 6351], [5883, 6274], [5903, 6091], [5830, 6027], [5806, 6037], [5757, 5967], [5734, 6025], [5725, 5952], [5680, 5943], [5624, 5892], [5610, 5838], [5576, 5908], [5518, 5895], [5477, 5838], [5453, 5859], [5395, 5828], [5414, 5789], [5381, 5776], [5393, 5727], [5368, 5687], [5262, 5671], [5159, 5707], [5119, 5708], [5060, 5642], [4989, 5699], [4894, 5687], [4877, 5734], [4894, 5765], [4867, 5824], [4842, 5825], [4800, 5891], [4837, 5918], [4832, 5959], [4745, 5985], [4673, 5939], [4673, 5986], [4621, 5977], [4522, 5991], [4483, 6071], [4375, 6077], [4316, 6030], [4273, 6052], [4190, 6055], [4142, 6025], [4066, 6043], [3972, 6046], [3938, 6022], [3811, 6034], [3760, 6106], [3716, 6108], [3695, 6076], [3625, 6095], [3634, 6138], [3605, 6157], [3632, 6227], [3684, 6288], [3717, 6300], [3732, 6248], [3817, 6317]]] } }, { "type": "Feature", "id": "UA.KV", "properties": { "hc-group": "admin1", "hc-middle-x": 0.37, "hc-middle-y": 0.71, "hc-key": "ua-kv", "hc-a2": "KV", "labelrank": "7", "hasc": "UA.KV", "alt-name": "Kiev Oblast|Kiew|Kijew|Kiiv|Kijev|Kiyev|Kyiv|Kyjiv|Kyyiv|Kyyivs'ka Oblast'", "woe-id": "2347545", "subregion": null, "fips": "UP11", "postal-code": "KV", "name": "Kiev", "country": "Ukraine", "type-en": "Region", "region": null, "longitude": "31.0214", "woe-name": "Kiev", "latitude": "50.0894", "woe-label": "Kiev Oblast, UA, Ukraine", "type": "Oblast'" }, "geometry": { "type": "Polygon", "coordinates": [[[5045, 7912], [5007, 7922], [5001, 7859], [4953, 7830], [4914, 7783], [4928, 7724], [4887, 7695], [4887, 7661], [4827, 7558], [4747, 7574], [4691, 7568], [4665, 7615], [4609, 7608], [4535, 7571], [4515, 7539], [4524, 7479], [4508, 7402], [4481, 7354], [4496, 7300], [4448, 7242], [4368, 7171], [4343, 7113], [4320, 7127], [4237, 7093], [4172, 7129], [4152, 7103], [4096, 7100], [4058, 7120], [4032, 7024], [4008, 7043], [3904, 7069], [3889, 7112], [3867, 7064], [3824, 7074], [3752, 7042], [3720, 6982], [3664, 6977], [3618, 7030], [3589, 7046], [3557, 7105], [3523, 7117], [3506, 7162], [3544, 7203], [3536, 7278], [3550, 7315], [3513, 7350], [3526, 7405], [3487, 7423], [3510, 7473], [3473, 7476], [3487, 7551], [3604, 7612], [3668, 7685], [3637, 7743], [3636, 7817], [3676, 7844], [3655, 7894], [3659, 7969], [3613, 8027], [3597, 8094], [3572, 8125], [3522, 8116], [3554, 8195], [3565, 8256], [3546, 8281], [3617, 8385], [3607, 8439], [3560, 8458], [3574, 8522], [3517, 8635], [3553, 8624], [3569, 8717], [3495, 8787], [3474, 8763], [3455, 8873], [3523, 8926], [3530, 8977], [3509, 8998], [3574, 9002], [3598, 9049], [3664, 9090], [3711, 9086], [3731, 9045], [3792, 9036], [3886, 9077], [3966, 9076], [3998, 9058], [4066, 8985], [4078, 8908], [4190, 8847], [4167, 8832], [4174, 8784], [4157, 8670], [4164, 8634], [4223, 8625], [4244, 8592], [4237, 8526], [4308, 8479], [4281, 8404], [4343, 8382], [4481, 8406], [4523, 8357], [4558, 8282], [4533, 8240], [4578, 8212], [4587, 8178], [4695, 8157], [4786, 8172], [4862, 8202], [4890, 8254], [4921, 8265], [4986, 8197], [5021, 8195], [5026, 8155], [4992, 8133], [5013, 8085], [5054, 8069], [5045, 8044], [5087, 8013], [5059, 7955], [5045, 7912]], [[4337, 8242], [4334, 8292], [4279, 8320], [4266, 8280], [4223, 8237], [4168, 8244], [4165, 8215], [4124, 8259], [4102, 8321], [4044, 8323], [4006, 8298], [3998, 8237], [3973, 8216], [3949, 8075], [3981, 8099], [4027, 8092], [4034, 8055], [4079, 7995], [4113, 7898], [4138, 7889], [4148, 7804], [4171, 7727], [4208, 7744], [4195, 7825], [4215, 7855], [4190, 7958], [4256, 7951], [4261, 7994], [4300, 7977], [4300, 8014], [4333, 8032], [4285, 8112], [4281, 8173], [4337, 8242]]] } }, { "type": "Feature", "id": "UA.MK", "properties": { "hc-group": "admin1", "hc-middle-x": 0.62, "hc-middle-y": 0.48, "hc-key": "ua-mk", "hc-a2": "MK", "labelrank": "7", "hasc": "UA.MY", "alt-name": "Mykolaiv|Nikolajew|Nikolayev", "woe-id": "2347548", "subregion": null, "fips": "UP14", "postal-code": "MK", "name": "Mykolayiv", "country": "Ukraine", "type-en": "Region", "region": null, "longitude": "31.6498", "woe-name": "Mykolayiv", "latitude": "47.0902", "woe-label": "Mykolaiv Oblast, UA, Ukraine", "type": "Oblast'" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[3938, 6022], [3972, 6046], [4066, 6043], [4142, 6025], [4190, 6055], [4273, 6052], [4316, 6030], [4375, 6077], [4483, 6071], [4522, 5991], [4621, 5977], [4673, 5986], [4673, 5939], [4745, 5985], [4832, 5959], [4837, 5918], [4800, 5891], [4842, 5825], [4867, 5824], [4894, 5765], [4877, 5734], [4894, 5687], [4989, 5699], [5060, 5642], [5119, 5708], [5159, 5707], [5262, 5671], [5368, 5687], [5393, 5727], [5381, 5776], [5414, 5789], [5395, 5828], [5453, 5859], [5477, 5838], [5518, 5895], [5576, 5908], [5610, 5838], [5608, 5801], [5639, 5770], [5626, 5664], [5640, 5622], [5579, 5605], [5598, 5562], [5592, 5497], [5644, 5489], [5660, 5441], [5666, 5337], [5629, 5367], [5605, 5330], [5650, 5306], [5666, 5256], [5654, 5206], [5673, 5168], [5619, 5124], [5574, 5128], [5536, 5052], [5542, 5027], [5627, 4972], [5604, 4931], [5573, 4958], [5560, 4918], [5598, 4903], [5469, 4844], [5552, 4832], [5478, 4800], [5403, 4800], [5386, 4820], [5301, 4843], [5297, 4814], [5207, 4813], [5188, 4779], [5103, 4783], [5070, 4730], [5008, 4731], [4940, 4709], [4923, 4781], [4966, 4867], [4962, 4908], [4927, 4933], [4951, 4971], [4892, 4977], [4894, 5071], [4854, 5143], [4852, 5075], [4889, 5048], [4864, 4971], [4933, 4962], [4902, 4912], [4945, 4905], [4930, 4834], [4900, 4820], [4879, 4763], [4904, 4724], [4904, 4655], [4873, 4625], [4818, 4625], [4757, 4649], [4697, 4617], [4636, 4645], [4725, 4796], [4662, 4737], [4614, 4786], [4653, 4712], [4603, 4638], [4545, 4606], [4452, 4633], [4440, 4812], [4375, 4879], [4365, 4931], [4476, 4947], [4506, 4972], [4534, 5062], [4485, 5122], [4419, 5138], [4455, 5190], [4442, 5220], [4373, 5202], [4296, 5227], [4250, 5368], [4274, 5471], [4227, 5510], [4222, 5555], [4168, 5515], [4151, 5550], [4104, 5561], [4034, 5550], [4001, 5575], [3989, 5707], [3946, 5749], [3935, 5848], [3887, 5899], [3893, 5967], [3951, 5991], [3938, 6022]]], [[[4844, 4493], [4788, 4510], [4748, 4484], [4662, 4570], [4697, 4552], [4807, 4558], [4867, 4528], [4844, 4493], [4844, 4493]]]] } }, { "type": "Feature", "id": "UA.VI", "properties": { "hc-group": "admin1", "hc-middle-x": 0.54, "hc-middle-y": 0.53, "hc-key": "ua-vi", "hc-a2": "VI", "labelrank": "7", "hasc": "UA.VI", "alt-name": "Vinnytsia|Vinnitskaya Oblast'|Vinnyts'ka Oblast|Winniza", "woe-id": "2347554", "subregion": null, "fips": "UP20", "postal-code": "VI", "name": "Vinnytsya", "country": "Ukraine", "type-en": "Region", "region": null, "longitude": "28.7233", "woe-name": "Vinnytsya", "latitude": "48.9623", "woe-label": "Vinnytsia Oblast, UA, Ukraine", "type": "Oblast'" }, "geometry": { "type": "Polygon", "coordinates": [[[3817, 6317], [3732, 6248], [3717, 6300], [3684, 6288], [3632, 6227], [3605, 6157], [3634, 6138], [3625, 6095], [3557, 6067], [3562, 5997], [3451, 6002], [3414, 6022], [3354, 6001], [3298, 6002], [3213, 6060], [3174, 6048], [3175, 6007], [3059, 5937], [3026, 6041], [2891, 6088], [2857, 6084], [2835, 6009], [2779, 6107], [2753, 6073], [2738, 6104], [2770, 6164], [2725, 6172], [2666, 6153], [2656, 6197], [2594, 6188], [2609, 6223], [2585, 6259], [2507, 6280], [2474, 6337], [2408, 6390], [2333, 6394], [2321, 6425], [2260, 6419], [2228, 6540], [2189, 6568], [2214, 6687], [2232, 6700], [2211, 6846], [2233, 6923], [2301, 7015], [2341, 7008], [2372, 7040], [2459, 6994], [2535, 7031], [2521, 7112], [2535, 7136], [2501, 7238], [2514, 7277], [2464, 7290], [2479, 7314], [2465, 7369], [2517, 7476], [2485, 7502], [2560, 7576], [2653, 7570], [2797, 7587], [2869, 7572], [2894, 7598], [2976, 7574], [3059, 7576], [3137, 7652], [3180, 7641], [3195, 7563], [3229, 7509], [3198, 7474], [3221, 7381], [3378, 7369], [3487, 7423], [3526, 7405], [3513, 7350], [3550, 7315], [3536, 7278], [3544, 7203], [3506, 7162], [3523, 7117], [3557, 7105], [3589, 7046], [3618, 7030], [3618, 6940], [3550, 6847], [3595, 6812], [3570, 6779], [3615, 6748], [3645, 6611], [3713, 6578], [3695, 6544], [3753, 6499], [3787, 6394], [3748, 6339], [3817, 6317]]] } }] };

/***/ }),
/* 94 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var worldPalestine = exports.worldPalestine = { "title": "World with Palestine areas, medium resolution", "version": "1.1.2", "type": "FeatureCollection", "copyright": "Copyright (c) 2015 Highsoft AS, Based on data from Natural Earth", "copyrightShort": "Natural Earth", "copyrightUrl": "http://www.naturalearthdata.com", "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:EPSG:54003" } }, "hc-transform": { "default": { "crs": "+proj=mill +lat_0=0 +lon_0=0 +x_0=0 +y_0=0 +R_A +datum=WGS84 +units=m +no_defs", "scale": 1.70830296554e-05, "jsonres": 15.5, "jsonmarginX": -999, "jsonmarginY": 9851.0, "xoffset": -19816494.5204, "yoffset": 12635908.1982 } },
	  "features": [{ "type": "Feature", "id": "GL", "properties": { "hc-group": "admin0", "hc-middle-x": 0.55, "hc-middle-y": 0.40, "hc-key": "gl", "hc-a2": "GL", "name": "Greenland", "labelrank": "3", "country-abbrev": "Grlnd.", "subregion": "Northern America", "region-wb": "Europe & Central Asia", "iso-a3": "GRL", "iso-a2": "GL", "woe-id": "23424828", "continent": "North America" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[3433, 9037], [3431, 9044], [3463, 9045], [3492, 9055], [3503, 9033], [3422, 9020], [3433, 9037]]], [[[2676, 9057], [2659, 9057], [2670, 9068], [2676, 9059], [2689, 9072], [2707, 9067], [2676, 9057]]], [[[3564, 9165], [3603, 9156], [3603, 9143], [3581, 9144], [3566, 9154], [3526, 9156], [3526, 9161], [3564, 9165]]], [[[3632, 9243], [3643, 9242], [3655, 9228], [3622, 9223], [3602, 9230], [3605, 9239], [3632, 9243]]], [[[3724, 9295], [3712, 9291], [3737, 9278], [3692, 9277], [3693, 9294], [3715, 9301], [3724, 9295]]], [[[3738, 9590], [3723, 9575], [3704, 9571], [3678, 9583], [3726, 9598], [3738, 9590]]], [[[2740, 9730], [2714, 9731], [2682, 9739], [2678, 9749], [2694, 9754], [2703, 9745], [2740, 9730]]], [[[3069, 9809], [3055, 9816], [3091, 9811], [3074, 9802], [3050, 9806], [3028, 9817], [3069, 9809]]], [[[3535, 9136], [3527, 9151], [3567, 9152], [3602, 9127], [3578, 9130], [3599, 9120], [3593, 9112], [3535, 9136]]], [[[2825, 9788], [2826, 9796], [2849, 9791], [2844, 9777], [2884, 9780], [2914, 9772], [2940, 9759], [2921, 9747], [2931, 9738], [2868, 9757], [2859, 9768], [2825, 9788]]], [[[2631, 9017], [2680, 9008], [2696, 8994], [2717, 8987], [2713, 8970], [2671, 8958], [2652, 8969], [2676, 8968], [2662, 8975], [2637, 8976], [2629, 8982], [2636, 8996], [2631, 9017]]], [[[3563, 9174], [3513, 9180], [3572, 9167], [3528, 9163], [3491, 9172], [3505, 9184], [3528, 9185], [3563, 9174]]], [[[2772, 8649], [2747, 8660], [2731, 8684], [2739, 8725], [2776, 8731], [2756, 8739], [2746, 8729], [2738, 8734], [2727, 8713], [2715, 8705], [2713, 8731], [2739, 8748], [2712, 8737], [2717, 8745], [2700, 8762], [2697, 8781], [2681, 8779], [2669, 8801], [2669, 8819], [2682, 8831], [2708, 8840], [2669, 8840], [2659, 8848], [2713, 8862], [2662, 8856], [2664, 8865], [2707, 8885], [2693, 8884], [2668, 8869], [2667, 8885], [2683, 8889], [2683, 8904], [2719, 8897], [2740, 8898], [2767, 8891], [2734, 8905], [2704, 8903], [2700, 8912], [2678, 8908], [2681, 8916], [2742, 8923], [2744, 8952], [2761, 8943], [2771, 8947], [2762, 8961], [2750, 8954], [2751, 8978], [2739, 8973], [2734, 8996], [2707, 9000], [2681, 9016], [2663, 9018], [2641, 9036], [2659, 9042], [2704, 9035], [2730, 9020], [2747, 9020], [2750, 9033], [2721, 9036], [2739, 9041], [2714, 9043], [2722, 9055], [2705, 9059], [2710, 9071], [2688, 9074], [2724, 9084], [2700, 9089], [2676, 9081], [2688, 9094], [2676, 9097], [2666, 9086], [2656, 9090], [2660, 9075], [2620, 9072], [2602, 9088], [2605, 9099], [2632, 9119], [2614, 9114], [2610, 9142], [2593, 9145], [2623, 9153], [2609, 9164], [2621, 9183], [2596, 9193], [2607, 9203], [2581, 9208], [2581, 9214], [2608, 9209], [2587, 9222], [2596, 9234], [2561, 9224], [2595, 9240], [2574, 9249], [2585, 9256], [2565, 9261], [2567, 9272], [2536, 9281], [2542, 9286], [2521, 9299], [2533, 9303], [2527, 9320], [2510, 9318], [2503, 9329], [2478, 9338], [2461, 9336], [2456, 9346], [2418, 9350], [2379, 9359], [2363, 9345], [2344, 9353], [2343, 9344], [2324, 9347], [2324, 9338], [2308, 9343], [2318, 9351], [2299, 9353], [2293, 9342], [2278, 9353], [2266, 9346], [2291, 9333], [2233, 9341], [2198, 9360], [2187, 9370], [2207, 9379], [2175, 9385], [2148, 9397], [2161, 9410], [2161, 9427], [2177, 9424], [2179, 9434], [2201, 9441], [2167, 9442], [2185, 9452], [2148, 9446], [2121, 9457], [2102, 9471], [2111, 9494], [2141, 9502], [2164, 9499], [2165, 9506], [2206, 9512], [2216, 9524], [2245, 9530], [2306, 9532], [2338, 9559], [2333, 9594], [2309, 9593], [2292, 9600], [2274, 9596], [2262, 9615], [2288, 9634], [2319, 9637], [2341, 9660], [2366, 9664], [2394, 9676], [2417, 9674], [2436, 9665], [2454, 9673], [2443, 9686], [2458, 9696], [2439, 9713], [2480, 9727], [2516, 9721], [2520, 9708], [2536, 9707], [2526, 9722], [2497, 9731], [2522, 9738], [2645, 9758], [2671, 9739], [2673, 9724], [2664, 9699], [2690, 9721], [2690, 9734], [2735, 9724], [2768, 9711], [2745, 9728], [2781, 9722], [2792, 9727], [2759, 9742], [2743, 9768], [2805, 9764], [2813, 9757], [2894, 9733], [2919, 9716], [2946, 9720], [2925, 9734], [2941, 9738], [2930, 9744], [2961, 9760], [2904, 9783], [2901, 9787], [3010, 9786], [3020, 9766], [3024, 9785], [3064, 9772], [3076, 9757], [3072, 9781], [3042, 9787], [2905, 9795], [2895, 9792], [2869, 9802], [2893, 9811], [2920, 9803], [2971, 9798], [2920, 9806], [2909, 9812], [2934, 9817], [2986, 9812], [2953, 9819], [3008, 9822], [3050, 9803], [3087, 9801], [3111, 9785], [3115, 9791], [3097, 9804], [3151, 9804], [3107, 9807], [3102, 9812], [3052, 9824], [3056, 9831], [3105, 9817], [3109, 9835], [3142, 9842], [3164, 9836], [3166, 9844], [3210, 9844], [3292, 9851], [3297, 9846], [3346, 9849], [3405, 9843], [3412, 9839], [3493, 9826], [3480, 9819], [3343, 9814], [3291, 9809], [3275, 9804], [3201, 9798], [3219, 9797], [3311, 9803], [3362, 9813], [3442, 9808], [3506, 9816], [3519, 9804], [3508, 9793], [3527, 9796], [3581, 9789], [3620, 9776], [3588, 9755], [3545, 9751], [3369, 9741], [3367, 9737], [3313, 9728], [3283, 9720], [3285, 9709], [3302, 9708], [3315, 9719], [3431, 9735], [3523, 9730], [3521, 9715], [3473, 9704], [3462, 9698], [3471, 9690], [3494, 9700], [3548, 9713], [3557, 9711], [3565, 9732], [3618, 9737], [3629, 9715], [3622, 9697], [3592, 9671], [3568, 9655], [3602, 9662], [3664, 9698], [3662, 9707], [3686, 9704], [3687, 9718], [3670, 9738], [3686, 9734], [3700, 9718], [3724, 9713], [3746, 9700], [3764, 9705], [3763, 9713], [3783, 9719], [3838, 9717], [3894, 9705], [3913, 9693], [3890, 9684], [3855, 9662], [3820, 9660], [3827, 9645], [3794, 9636], [3746, 9637], [3701, 9631], [3675, 9637], [3647, 9629], [3649, 9623], [3674, 9635], [3717, 9625], [3751, 9632], [3783, 9619], [3764, 9607], [3722, 9603], [3683, 9610], [3695, 9599], [3669, 9593], [3675, 9610], [3653, 9594], [3649, 9584], [3660, 9570], [3683, 9572], [3672, 9551], [3691, 9543], [3690, 9535], [3662, 9527], [3677, 9506], [3646, 9516], [3631, 9511], [3633, 9501], [3614, 9455], [3637, 9459], [3646, 9477], [3646, 9459], [3678, 9454], [3685, 9465], [3681, 9485], [3707, 9502], [3720, 9530], [3711, 9501], [3692, 9486], [3692, 9464], [3678, 9444], [3689, 9436], [3714, 9444], [3726, 9453], [3722, 9438], [3711, 9438], [3702, 9416], [3710, 9393], [3700, 9384], [3697, 9368], [3702, 9333], [3686, 9365], [3687, 9388], [3644, 9394], [3608, 9377], [3593, 9389], [3578, 9379], [3610, 9369], [3609, 9352], [3633, 9355], [3661, 9352], [3669, 9344], [3651, 9336], [3605, 9334], [3661, 9332], [3679, 9320], [3676, 9290], [3663, 9285], [3654, 9297], [3640, 9294], [3610, 9312], [3621, 9298], [3644, 9285], [3626, 9282], [3659, 9278], [3667, 9270], [3653, 9258], [3682, 9252], [3701, 9260], [3678, 9234], [3653, 9234], [3649, 9244], [3607, 9244], [3594, 9224], [3639, 9212], [3643, 9187], [3614, 9189], [3591, 9175], [3568, 9181], [3542, 9195], [3540, 9208], [3528, 9192], [3503, 9188], [3478, 9175], [3511, 9166], [3508, 9155], [3525, 9129], [3586, 9100], [3569, 9090], [3604, 9091], [3587, 9082], [3590, 9066], [3608, 9077], [3606, 9065], [3616, 9026], [3602, 9018], [3589, 9021], [3588, 9043], [3581, 9021], [3561, 9021], [3544, 9030], [3534, 9055], [3487, 9082], [3460, 9081], [3427, 9104], [3410, 9102], [3443, 9090], [3434, 9084], [3462, 9077], [3491, 9077], [3495, 9061], [3458, 9047], [3412, 9049], [3426, 9045], [3415, 9028], [3417, 9017], [3461, 9023], [3473, 9018], [3454, 9015], [3427, 9002], [3445, 8997], [3458, 9011], [3473, 9008], [3503, 9019], [3554, 9004], [3589, 9004], [3574, 8996], [3564, 8979], [3539, 8973], [3523, 8960], [3474, 8930], [3447, 8922], [3423, 8923], [3383, 8904], [3335, 8896], [3315, 8899], [3294, 8926], [3306, 8897], [3267, 8872], [3268, 8859], [3228, 8813], [3177, 8787], [3156, 8788], [3145, 8780], [3161, 8778], [3133, 8774], [3135, 8797], [3152, 8812], [3129, 8806], [3130, 8792], [3114, 8779], [3087, 8773], [3081, 8779], [3067, 8768], [3085, 8762], [3063, 8747], [3039, 8751], [3039, 8740], [3056, 8738], [3049, 8710], [3026, 8714], [3030, 8707], [3054, 8704], [3055, 8686], [3037, 8677], [3038, 8663], [3011, 8638], [2981, 8640], [3001, 8630], [2983, 8630], [3004, 8621], [2995, 8594], [3000, 8580], [2985, 8565], [2987, 8544], [2970, 8538], [2977, 8517], [2951, 8508], [2938, 8517], [2911, 8525], [2914, 8547], [2906, 8538], [2894, 8548], [2882, 8552], [2903, 8565], [2898, 8572], [2877, 8551], [2828, 8554], [2844, 8562], [2808, 8573], [2795, 8596], [2797, 8613], [2767, 8629], [2772, 8649]]]] } }, { "type": "Feature", "id": "SH", "properties": { "hc-group": "admin0", "hc-middle-x": 0.54, "hc-middle-y": 0.51, "hc-key": "sh", "hc-a2": "SH", "name": "Scarborough Reef", "labelrank": "6", "country-abbrev": "S.R.", "subregion": "South-Eastern Asia", "region-wb": "East Asia & Pacific", "iso-a3": "-99", "iso-a2": "SH", "woe-id": "-99", "continent": "Asia" }, "geometry": { "type": "Polygon", "coordinates": [[[7715, 6952], [7715, 6952], [7715, 6952], [7715, 6952], [7715, 6952]]] } }, { "type": "Feature", "id": "BU", "properties": { "hc-group": "admin0", "hc-middle-x": 0.49, "hc-middle-y": 0.73, "hc-key": "bu", "hc-a2": "BU", "name": "Bajo Nuevo Bank (Petrel Is.)", "labelrank": "8", "country-abbrev": null, "subregion": "Caribbean", "region-wb": "Latin America & Caribbean", "iso-a3": "-99", "iso-a2": "BU", "woe-id": "-99", "continent": "North America" }, "geometry": { "type": "Polygon", "coordinates": [[[1893, 6971], [1893, 6971], [1893, 6971], [1893, 6971], [1893, 6971]]] } }, { "type": "Feature", "id": "LK", "properties": { "hc-group": "admin0", "hc-middle-x": 0.66, "hc-middle-y": 0.87, "hc-key": "lk", "hc-a2": "LK", "name": "Sri Lanka", "labelrank": "3", "country-abbrev": "Sri L.", "subregion": "Southern Asia", "region-wb": "South Asia", "iso-a3": "LKA", "iso-a2": "LK", "woe-id": "23424778", "continent": "Asia" }, "geometry": { "type": "Polygon", "coordinates": [[[6603, 6788], [6607, 6793], [6626, 6780], [6644, 6754], [6657, 6728], [6659, 6711], [6653, 6694], [6621, 6679], [6609, 6682], [6600, 6705], [6596, 6740], [6601, 6767], [6609, 6783], [6603, 6788]]] } }, { "type": "Feature", "id": "AS", "properties": { "hc-group": "admin0", "hc-middle-x": 0.56, "hc-middle-y": 0.57, "hc-key": "as", "hc-a2": "AS", "name": "American Samoa", "labelrank": "4", "country-abbrev": "Am. Samoa", "subregion": "Polynesia", "region-wb": "East Asia & Pacific", "iso-a3": "ASM", "iso-a2": "AS", "woe-id": "23424746", "continent": "Oceania" }, "geometry": { "type": "Polygon", "coordinates": [[[-775, 6085], [-777, 6084], [-779, 6082], [-782, 6083], [-775, 6085]]] } }, { "type": "Feature", "id": "DK", "properties": { "hc-group": "admin0", "hc-middle-x": 0.29, "hc-middle-y": 0.43, "hc-key": "dk", "hc-a2": "DK", "name": "Denmark", "labelrank": "4", "country-abbrev": "Den.", "subregion": "Northern Europe", "region-wb": "Europe & Central Asia", "iso-a3": "DNK", "iso-a2": "DK", "woe-id": "23424796", "continent": "Europe" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[4558, 8337], [4571, 8311], [4564, 8294], [4553, 8301], [4568, 8307], [4549, 8309], [4533, 8325], [4558, 8337]]], [[[4605, 8303], [4600, 8292], [4586, 8289], [4575, 8302], [4594, 8300], [4591, 8312], [4580, 8313], [4571, 8335], [4592, 8342], [4596, 8333], [4609, 8351], [4620, 8348], [4621, 8330], [4608, 8323], [4605, 8303]]], [[[4526, 8297], [4508, 8301], [4503, 8300], [4502, 8323], [4486, 8328], [4495, 8341], [4487, 8351], [4487, 8369], [4500, 8370], [4536, 8392], [4510, 8387], [4500, 8371], [4491, 8378], [4502, 8393], [4525, 8395], [4542, 8413], [4560, 8420], [4559, 8406], [4573, 8401], [4556, 8396], [4553, 8369], [4571, 8365], [4528, 8325], [4535, 8304], [4526, 8297]]]] } }, { "type": "Feature", "id": "FO", "properties": { "hc-group": "admin0", "hc-middle-x": 0.45, "hc-middle-y": 0.27, "hc-key": "fo", "hc-a2": "FO", "name": "Faroe Islands", "labelrank": "6", "country-abbrev": "Faeroe Is.", "subregion": "Northern Europe", "region-wb": "Europe & Central Asia", "iso-a3": "FRO", "iso-a2": "FO", "woe-id": "23424816", "continent": "Europe" }, "geometry": { "type": "Polygon", "coordinates": [[[4046, 8613], [4054, 8615], [4050, 8604], [4035, 8614], [4046, 8613]]] } }, { "type": "Feature", "id": "GU", "properties": { "hc-group": "admin0", "hc-middle-x": 0.42, "hc-middle-y": 0.45, "hc-key": "gu", "hc-a2": "GU", "name": "Guam", "labelrank": "6", "country-abbrev": "Guam", "subregion": "Micronesia", "region-wb": "East Asia & Pacific", "iso-a3": "GUM", "iso-a2": "GU", "woe-id": "23424832", "continent": "Oceania" }, "geometry": { "type": "Polygon", "coordinates": [[[8512, 6901], [8508, 6895], [8507, 6901], [8514, 6907], [8512, 6901]]] } }, { "type": "Feature", "id": "MP", "properties": { "hc-group": "admin0", "hc-middle-x": 0.52, "hc-middle-y": 0.50, "hc-key": "mp", "hc-a2": "MP", "name": "Northern Mariana Islands", "labelrank": "6", "country-abbrev": "N.M.I.", "subregion": "Micronesia", "region-wb": "East Asia & Pacific", "iso-a3": "MNP", "iso-a2": "MP", "woe-id": "23424788", "continent": "Oceania" }, "geometry": { "type": "Polygon", "coordinates": [[[8537, 6949], [8538, 6953], [8541, 6955], [8540, 6950], [8537, 6949]]] } }, { "type": "Feature", "id": "PR", "properties": { "hc-group": "admin0", "hc-middle-x": 0.48, "hc-middle-y": 0.66, "hc-key": "pr", "hc-a2": "PR", "name": "Puerto Rico", "labelrank": "5", "country-abbrev": "P.R.", "subregion": "Caribbean", "region-wb": "Latin America & Caribbean", "iso-a3": "PRI", "iso-a2": "PR", "woe-id": "23424935", "continent": "North America" }, "geometry": { "type": "Polygon", "coordinates": [[[2326, 7046], [2299, 7035], [2272, 7036], [2272, 7053], [2326, 7046]]] } }, { "type": "Feature", "id": "UM", "properties": { "hc-group": "admin0", "hc-middle-x": 0.50, "hc-middle-y": 0.51, "hc-key": "um", "hc-a2": "UM", "name": "United States Minor Outlying Islands", "labelrank": "5", "country-abbrev": "U.S. MOI", "subregion": "Seven seas (open ocean)", "region-wb": "East Asia & Pacific", "iso-a3": "UMI", "iso-a2": "UM", "woe-id": "28289407", "continent": "North America" }, "geometry": { "type": "Polygon", "coordinates": [[[-523, 6678], [-523, 6677], [-524, 6677], [-524, 6678], [-523, 6678]]] } }, { "type": "Feature", "id": "US", "properties": { "hc-group": "admin0", "hc-middle-x": 0.70, "hc-middle-y": 0.68, "hc-key": "us", "hc-a2": "US", "name": "United States of America", "labelrank": "2", "country-abbrev": "U.S.A.", "subregion": "Northern America", "region-wb": "North America", "iso-a3": "USA", "iso-a2": "US", "woe-id": "23424977", "continent": "North America" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[-333, 7102], [-310, 7082], [-341, 7069], [-347, 7090], [-333, 7102]]], [[[-382, 7135], [-366, 7133], [-345, 7122], [-354, 7116], [-377, 7132], [-404, 7138], [-403, 7150], [-382, 7135]]], [[[-749, 8215], [-763, 8213], [-748, 8225], [-725, 8222], [-721, 8231], [-699, 8247], [-694, 8239], [-729, 8218], [-749, 8215]]], [[[-546, 8284], [-562, 8295], [-592, 8282], [-609, 8288], [-597, 8300], [-568, 8307], [-546, 8284]]], [[[372, 8317], [371, 8339], [385, 8344], [392, 8334], [385, 8301], [373, 8305], [372, 8317]]], [[[311, 8371], [300, 8354], [291, 8381], [303, 8390], [329, 8388], [346, 8371], [313, 8365], [311, 8371]]], [[[-247, 8454], [-231, 8447], [-231, 8436], [-257, 8430], [-269, 8433], [-251, 8442], [-247, 8454]]], [[[-642, 8534], [-630, 8530], [-626, 8514], [-657, 8511], [-682, 8525], [-642, 8534]]], [[[-643, 8269], [-674, 8243], [-669, 8263], [-657, 8257], [-643, 8269]]], [[[257, 8398], [260, 8411], [276, 8402], [285, 8376], [283, 8353], [263, 8381], [268, 8389], [257, 8398]]], [[[297, 8395], [285, 8388], [289, 8404], [279, 8435], [297, 8436], [306, 8422], [305, 8401], [297, 8395]]], [[[-797, 8682], [-766, 8685], [-760, 8675], [-719, 8667], [-750, 8651], [-764, 8665], [-790, 8672], [-800, 8667], [-812, 8676], [-808, 8689], [-797, 8682]]], [[[-264, 8396], [-289, 8371], [-280, 8394], [-293, 8383], [-302, 8387], [-307, 8406], [-265, 8431], [-249, 8423], [-242, 8428], [-237, 8406], [-256, 8410], [-247, 8400], [-264, 8396]]], [[[314, 8343], [314, 8361], [327, 8360], [359, 8316], [363, 8296], [357, 8292], [347, 8309], [337, 8292], [314, 8323], [325, 8329], [314, 8343]]], [[[231, 8424], [227, 8431], [249, 8442], [276, 8431], [279, 8408], [251, 8420], [257, 8407], [231, 8424]]], [[[1815, 7832], [1810, 7836], [1803, 7824], [1802, 7823], [1802, 7823], [1791, 7803], [1819, 7791], [1843, 7796], [1918, 7833], [1919, 7845], [1920, 7852], [1920, 7852], [1921, 7854], [1920, 7858], [1948, 7862], [1965, 7857], [1989, 7860], [2005, 7869], [2000, 7889], [2017, 7902], [2032, 7915], [2048, 7920], [2048, 7920], [2143, 7921], [2160, 7929], [2175, 7947], [2187, 7982], [2209, 8010], [2219, 8001], [2240, 8006], [2252, 7995], [2252, 7948], [2256, 7942], [2262, 7942], [2261, 7930], [2270, 7927], [2278, 7914], [2270, 7907], [2243, 7901], [2234, 7890], [2217, 7899], [2192, 7873], [2189, 7878], [2163, 7845], [2157, 7824], [2171, 7806], [2189, 7801], [2160, 7797], [2128, 7786], [2102, 7786], [2080, 7777], [2110, 7777], [2116, 7773], [2061, 7760], [2070, 7754], [2066, 7733], [2044, 7706], [2024, 7725], [2039, 7690], [2010, 7651], [2021, 7673], [2001, 7690], [2010, 7693], [2001, 7722], [1995, 7705], [2003, 7671], [2002, 7641], [2011, 7637], [2023, 7603], [2009, 7586], [2008, 7576], [1992, 7563], [1977, 7563], [1961, 7553], [1951, 7537], [1929, 7533], [1917, 7513], [1867, 7477], [1850, 7448], [1852, 7420], [1866, 7380], [1877, 7361], [1877, 7347], [1890, 7314], [1889, 7280], [1880, 7256], [1861, 7256], [1855, 7274], [1842, 7281], [1814, 7328], [1822, 7340], [1809, 7340], [1815, 7374], [1784, 7408], [1763, 7411], [1746, 7398], [1726, 7414], [1701, 7423], [1648, 7418], [1632, 7423], [1607, 7416], [1592, 7423], [1586, 7415], [1609, 7415], [1618, 7407], [1607, 7401], [1623, 7380], [1596, 7394], [1592, 7381], [1504, 7403], [1479, 7400], [1433, 7371], [1406, 7357], [1379, 7323], [1388, 7282], [1380, 7279], [1356, 7286], [1328, 7301], [1327, 7313], [1320, 7317], [1318, 7333], [1295, 7356], [1284, 7382], [1273, 7393], [1267, 7399], [1265, 7398], [1236, 7407], [1225, 7402], [1211, 7378], [1170, 7399], [1156, 7432], [1112, 7467], [1062, 7468], [1062, 7453], [980, 7453], [867, 7491], [870, 7498], [800, 7492], [788, 7518], [769, 7532], [763, 7521], [758, 7541], [738, 7545], [712, 7537], [719, 7554], [696, 7560], [696, 7578], [677, 7595], [657, 7626], [662, 7634], [644, 7647], [641, 7667], [655, 7656], [641, 7678], [641, 7668], [605, 7706], [602, 7737], [585, 7758], [595, 7793], [581, 7843], [593, 7880], [600, 7940], [593, 7989], [585, 8021], [576, 8037], [580, 8045], [596, 8037], [631, 8035], [639, 8047], [622, 8050], [631, 8057], [641, 8048], [634, 8068], [1446, 8068], [1446, 8083], [1456, 8080], [1460, 8061], [1488, 8050], [1520, 8051], [1528, 8039], [1538, 8043], [1556, 8032], [1571, 8039], [1611, 8031], [1629, 8028], [1644, 8007], [1664, 8008], [1650, 7991], [1668, 7987], [1676, 7976], [1699, 7974], [1712, 7982], [1747, 7986], [1744, 7976], [1760, 7973], [1772, 7976], [1772, 7969], [1778, 7960], [1781, 7954], [1790, 7957], [1777, 7938], [1793, 7930], [1794, 7896], [1779, 7884], [1784, 7870], [1797, 7883], [1814, 7881], [1822, 7849], [1819, 7836], [1815, 7832]]], [[[417, 8350], [420, 8342], [420, 8342], [421, 8316], [410, 8301], [394, 8297], [389, 8313], [394, 8334], [385, 8345], [369, 8341], [363, 8325], [363, 8352], [353, 8342], [334, 8365], [352, 8360], [353, 8373], [326, 8395], [298, 8439], [285, 8441], [263, 8485], [262, 8470], [272, 8445], [247, 8446], [238, 8462], [215, 8475], [215, 8475], [226, 8480], [234, 8499], [259, 8508], [271, 8491], [321, 8447], [355, 8396], [359, 8382], [374, 8371], [417, 8350]]], [[[626, 8068], [624, 8067], [624, 8068], [626, 8068]]], [[[215, 8475], [214, 8476], [215, 8475], [215, 8475], [215, 8475], [215, 8475], [215, 8475], [215, 8475]]], [[[-857, 8188], [-855, 8188], [-855, 8188], [-856, 8188], [-857, 8188], [-857, 8188]]], [[[215, 8475], [241, 8452], [243, 8443], [224, 8440], [195, 8457], [177, 8477], [130, 8497], [137, 8512], [117, 8504], [44, 8522], [11, 8517], [-19, 8530], [-53, 8538], [-101, 8517], [-68, 8538], [-44, 8543], [-63, 8548], [-73, 8560], [-108, 8556], [-102, 8574], [-114, 8567], [-116, 8551], [-102, 8528], [-119, 8524], [-122, 8515], [-145, 8517], [-158, 8512], [-197, 8483], [-224, 8479], [-212, 8494], [-224, 8507], [-206, 8541], [-210, 8549], [-182, 8563], [-143, 8556], [-182, 8573], [-184, 8578], [-214, 8561], [-237, 8538], [-258, 8504], [-277, 8501], [-290, 8490], [-292, 8475], [-278, 8476], [-265, 8466], [-288, 8451], [-303, 8431], [-317, 8431], [-337, 8411], [-346, 8412], [-361, 8387], [-380, 8378], [-374, 8369], [-397, 8374], [-419, 8360], [-410, 8358], [-424, 8345], [-458, 8340], [-479, 8325], [-465, 8313], [-487, 8310], [-490, 8326], [-507, 8320], [-514, 8307], [-531, 8308], [-539, 8317], [-545, 8302], [-561, 8310], [-541, 8320], [-517, 8341], [-480, 8346], [-474, 8357], [-432, 8381], [-413, 8401], [-394, 8412], [-389, 8450], [-377, 8468], [-408, 8456], [-431, 8463], [-435, 8448], [-451, 8469], [-460, 8463], [-473, 8476], [-487, 8467], [-489, 8455], [-527, 8458], [-513, 8463], [-523, 8485], [-513, 8495], [-531, 8522], [-569, 8508], [-623, 8541], [-600, 8553], [-614, 8558], [-645, 8588], [-628, 8600], [-631, 8612], [-603, 8635], [-607, 8645], [-585, 8664], [-561, 8654], [-527, 8672], [-498, 8676], [-486, 8687], [-491, 8711], [-505, 8719], [-486, 8729], [-498, 8743], [-505, 8736], [-524, 8733], [-555, 8718], [-567, 8726], [-592, 8726], [-611, 8720], [-645, 8727], [-651, 8741], [-668, 8754], [-644, 8760], [-681, 8766], [-702, 8778], [-621, 8816], [-596, 8823], [-573, 8824], [-578, 8805], [-571, 8799], [-527, 8798], [-519, 8794], [-509, 8807], [-492, 8806], [-518, 8818], [-540, 8839], [-531, 8842], [-510, 8817], [-498, 8821], [-486, 8813], [-469, 8821], [-489, 8828], [-506, 8821], [-518, 8829], [-517, 8847], [-534, 8843], [-571, 8849], [-585, 8875], [-623, 8897], [-656, 8912], [-646, 8923], [-646, 8939], [-591, 8942], [-569, 8951], [-555, 8966], [-556, 8980], [-538, 9003], [-519, 9016], [-514, 9011], [-488, 9016], [-453, 9040], [-405, 9042], [-381, 9055], [-369, 9067], [-334, 9061], [-347, 9050], [-331, 9044], [-319, 9058], [-304, 9051], [-305, 9042], [-290, 9040], [-266, 9047], [-234, 9041], [-246, 9027], [-219, 9027], [-227, 9021], [-153, 9025], [-84, 9006], [-47, 9007], [-30, 8998], [-9, 8997], [29, 9004], [97, 8979], [97, 8531], [126, 8525], [153, 8532], [150, 8520], [196, 8484], [202, 8469], [215, 8475], [215, 8475], [215, 8475], [215, 8475]]], [[[-855, 8188], [-832, 8198], [-844, 8188], [-855, 8188], [-855, 8188]]], [[[-857, 8188], [-877, 8189], [-933, 8180], [-957, 8169], [-967, 8174], [-996, 8171], [-999, 8179], [-955, 8176], [-932, 8184], [-893, 8188], [-881, 8201], [-857, 8188], [-857, 8188]]]] } }, { "type": "Feature", "id": "VI", "properties": { "hc-group": "admin0", "hc-middle-x": 0.50, "hc-middle-y": 0.50, "hc-key": "vi", "hc-a2": "VI", "name": "United States Virgin Islands", "labelrank": "6", "country-abbrev": "V.I. (U.S.)", "subregion": "Caribbean", "region-wb": "Latin America & Caribbean", "iso-a3": "VIR", "iso-a2": "VI", "woe-id": "23424985", "continent": "North America" }, "geometry": { "type": "Polygon", "coordinates": [[[2342, 7030], [2347, 7030], [2338, 7028], [2338, 7031], [2342, 7030]]] } }, { "type": "Feature", "id": "CA", "properties": { "hc-group": "admin0", "hc-middle-x": 0.28, "hc-middle-y": 0.64, "hc-key": "ca", "hc-a2": "CA", "name": "Canada", "labelrank": "2", "country-abbrev": "Can.", "subregion": "Northern America", "region-wb": "North America", "iso-a3": "CAN", "iso-a2": "CA", "woe-id": "23424775", "continent": "North America" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[417, 8350], [374, 8371], [359, 8382], [355, 8396], [321, 8447], [271, 8491], [259, 8508], [234, 8499], [226, 8480], [215, 8475], [215, 8475], [215, 8475], [215, 8475], [215, 8475], [215, 8475], [215, 8475], [215, 8475], [202, 8469], [196, 8484], [150, 8520], [153, 8532], [126, 8525], [97, 8531], [97, 8979], [129, 8978], [151, 8972], [182, 8953], [224, 8939], [242, 8939], [262, 8929], [242, 8952], [253, 8972], [289, 8968], [293, 8983], [309, 8971], [295, 8958], [326, 8966], [336, 8980], [366, 8985], [379, 8996], [386, 8988], [402, 9005], [432, 8997], [390, 8979], [362, 8973], [343, 8960], [321, 8937], [340, 8935], [336, 8948], [365, 8960], [372, 8970], [392, 8959], [411, 8982], [446, 8990], [450, 8981], [470, 8997], [478, 9013], [472, 9032], [505, 9011], [518, 8985], [540, 8967], [555, 8962], [554, 8972], [571, 8995], [562, 8998], [585, 9006], [583, 8983], [595, 8983], [584, 8965], [607, 8964], [621, 8971], [628, 8989], [673, 8985], [707, 8967], [754, 8957], [773, 8947], [834, 8935], [834, 8945], [861, 8939], [894, 8914], [891, 8907], [863, 8909], [859, 8895], [846, 8891], [896, 8879], [964, 8880], [985, 8885], [1020, 8906], [1041, 8888], [1012, 8899], [1023, 8878], [1035, 8882], [1044, 8862], [1047, 8874], [1061, 8863], [1072, 8899], [1105, 8899], [1114, 8912], [1135, 8916], [1138, 8927], [1112, 8921], [1079, 8903], [1044, 8908], [1060, 8926], [1089, 8930], [1119, 8941], [1143, 8931], [1141, 8915], [1154, 8908], [1155, 8922], [1166, 8924], [1172, 8896], [1200, 8898], [1236, 8880], [1259, 8878], [1283, 8886], [1352, 8885], [1373, 8876], [1389, 8883], [1372, 8895], [1361, 8890], [1342, 8913], [1370, 8913], [1363, 8922], [1385, 8918], [1390, 8908], [1425, 8909], [1408, 8868], [1429, 8863], [1442, 8839], [1446, 8858], [1431, 8880], [1438, 8898], [1455, 8896], [1488, 8925], [1493, 8938], [1483, 8945], [1477, 8933], [1462, 8933], [1476, 8949], [1474, 8963], [1494, 8973], [1471, 8969], [1462, 8981], [1455, 8975], [1416, 8990], [1405, 9014], [1416, 9031], [1403, 9042], [1408, 9067], [1437, 9077], [1423, 9081], [1444, 9103], [1462, 9105], [1447, 9104], [1445, 9134], [1430, 9152], [1434, 9170], [1430, 9198], [1444, 9204], [1444, 9219], [1490, 9228], [1516, 9226], [1531, 9218], [1552, 9220], [1593, 9213], [1558, 9173], [1544, 9153], [1528, 9145], [1498, 9150], [1476, 9148], [1496, 9131], [1477, 9107], [1464, 9105], [1474, 9094], [1510, 9070], [1512, 9041], [1527, 9033], [1541, 9011], [1533, 9007], [1566, 8972], [1594, 8965], [1585, 8957], [1561, 8961], [1585, 8939], [1581, 8917], [1590, 8906], [1607, 8927], [1608, 8948], [1629, 8957], [1656, 8935], [1663, 8911], [1645, 8908], [1650, 8883], [1676, 8856], [1701, 8863], [1703, 8874], [1687, 8898], [1696, 8910], [1704, 8905], [1702, 8884], [1719, 8897], [1726, 8931], [1759, 8947], [1735, 8956], [1729, 8979], [1736, 8990], [1765, 8990], [1782, 8982], [1816, 8979], [1830, 8961], [1848, 8966], [1855, 8950], [1839, 8941], [1855, 8927], [1819, 8910], [1833, 8901], [1831, 8889], [1856, 8867], [1848, 8844], [1835, 8843], [1815, 8822], [1794, 8812], [1763, 8838], [1783, 8804], [1756, 8812], [1784, 8791], [1794, 8776], [1771, 8783], [1757, 8805], [1738, 8809], [1733, 8822], [1706, 8822], [1693, 8816], [1720, 8803], [1702, 8782], [1675, 8762], [1659, 8762], [1607, 8792], [1567, 8791], [1600, 8785], [1627, 8762], [1685, 8758], [1688, 8753], [1658, 8708], [1626, 8696], [1605, 8711], [1604, 8697], [1591, 8680], [1576, 8676], [1551, 8682], [1575, 8671], [1579, 8655], [1557, 8642], [1535, 8647], [1540, 8636], [1526, 8631], [1521, 8618], [1500, 8602], [1503, 8597], [1481, 8582], [1485, 8576], [1470, 8555], [1456, 8515], [1457, 8474], [1474, 8465], [1505, 8462], [1506, 8453], [1527, 8403], [1519, 8386], [1568, 8399], [1603, 8387], [1631, 8382], [1658, 8364], [1670, 8348], [1725, 8330], [1757, 8315], [1777, 8318], [1826, 8310], [1821, 8273], [1830, 8257], [1825, 8223], [1847, 8202], [1853, 8188], [1875, 8173], [1880, 8159], [1900, 8150], [1913, 8171], [1925, 8154], [1928, 8169], [1912, 8183], [1934, 8189], [1936, 8203], [1923, 8225], [1899, 8228], [1890, 8237], [1919, 8244], [1923, 8265], [1900, 8291], [1940, 8306], [1974, 8329], [1994, 8358], [1994, 8394], [1987, 8416], [1963, 8442], [1940, 8457], [1936, 8469], [1957, 8486], [1958, 8503], [1974, 8517], [1959, 8536], [1963, 8550], [1945, 8554], [1965, 8583], [1949, 8601], [1947, 8620], [1959, 8631], [1982, 8631], [2047, 8614], [2073, 8628], [2093, 8621], [2138, 8590], [2131, 8581], [2139, 8570], [2174, 8563], [2201, 8565], [2205, 8552], [2192, 8540], [2199, 8527], [2198, 8486], [2215, 8474], [2189, 8464], [2193, 8456], [2209, 8469], [2235, 8464], [2240, 8454], [2262, 8442], [2302, 8464], [2323, 8485], [2318, 8505], [2332, 8516], [2345, 8539], [2358, 8506], [2368, 8500], [2398, 8459], [2385, 8450], [2406, 8452], [2403, 8438], [2433, 8421], [2422, 8421], [2432, 8405], [2422, 8399], [2441, 8393], [2446, 8365], [2425, 8355], [2442, 8355], [2450, 8340], [2472, 8336], [2476, 8322], [2462, 8305], [2488, 8318], [2487, 8309], [2510, 8311], [2513, 8299], [2557, 8290], [2562, 8284], [2535, 8279], [2523, 8266], [2479, 8255], [2473, 8235], [2510, 8253], [2515, 8262], [2557, 8271], [2566, 8252], [2581, 8251], [2607, 8230], [2598, 8224], [2610, 8202], [2609, 8189], [2571, 8162], [2550, 8164], [2512, 8146], [2512, 8139], [2478, 8115], [2457, 8117], [2431, 8110], [2427, 8115], [2369, 8119], [2293, 8117], [2272, 8100], [2264, 8081], [2244, 8080], [2215, 8059], [2180, 8012], [2147, 7984], [2171, 7994], [2215, 8039], [2240, 8055], [2287, 8073], [2318, 8079], [2348, 8072], [2359, 8059], [2353, 8046], [2322, 8031], [2308, 8039], [2290, 8035], [2316, 8018], [2348, 8026], [2331, 8001], [2349, 7965], [2361, 7958], [2409, 7942], [2425, 7952], [2452, 7932], [2377, 7901], [2355, 7904], [2339, 7878], [2313, 7866], [2299, 7887], [2305, 7905], [2354, 7932], [2353, 7924], [2376, 7934], [2337, 7936], [2350, 7947], [2308, 7928], [2285, 7923], [2283, 7908], [2270, 7927], [2261, 7930], [2262, 7942], [2255, 7944], [2252, 7948], [2252, 7995], [2240, 8006], [2219, 8001], [2209, 8010], [2187, 7982], [2175, 7947], [2160, 7929], [2143, 7921], [2048, 7920], [2065, 7929], [2048, 7920], [2032, 7915], [2017, 7902], [1980, 7883], [1963, 7886], [1920, 7878], [1899, 7860], [1920, 7858], [1921, 7854], [1920, 7852], [1924, 7846], [1919, 7845], [1887, 7841], [1878, 7833], [1853, 7836], [1838, 7822], [1815, 7814], [1802, 7823], [1802, 7823], [1803, 7824], [1821, 7825], [1815, 7832], [1819, 7836], [1822, 7849], [1842, 7862], [1841, 7887], [1855, 7906], [1856, 7920], [1890, 7901], [1901, 7912], [1871, 7954], [1845, 7961], [1797, 7964], [1778, 7960], [1776, 7959], [1772, 7969], [1772, 7976], [1760, 7973], [1752, 7993], [1758, 8005], [1745, 8017], [1748, 8030], [1724, 8029], [1718, 8021], [1703, 8060], [1647, 8057], [1636, 8045], [1621, 8047], [1611, 8031], [1571, 8039], [1556, 8032], [1538, 8043], [1528, 8039], [1520, 8051], [1488, 8050], [1460, 8061], [1456, 8080], [1446, 8083], [1446, 8068], [634, 8068], [628, 8072], [626, 8068], [624, 8068], [616, 8086], [591, 8088], [562, 8119], [546, 8121], [493, 8145], [486, 8154], [487, 8195], [464, 8191], [473, 8203], [463, 8229], [460, 8232], [461, 8230], [451, 8202], [440, 8229], [445, 8239], [445, 8246], [440, 8240], [417, 8262], [406, 8279], [389, 8288], [409, 8289], [407, 8297], [422, 8316], [420, 8342], [417, 8350]], [[1551, 8682], [1545, 8686], [1533, 8687], [1533, 8687], [1533, 8687], [1533, 8687], [1528, 8688], [1496, 8700], [1491, 8693], [1533, 8687], [1533, 8687], [1533, 8687], [1533, 8687], [1551, 8682]], [[454, 8238], [461, 8265], [447, 8248], [454, 8238]]], [[[2360, 8105], [2382, 8100], [2426, 8082], [2431, 8072], [2415, 8071], [2376, 8083], [2351, 8099], [2360, 8105]]], [[[1851, 8233], [1860, 8232], [1872, 8212], [1832, 8225], [1851, 8233]]], [[[1909, 8624], [1913, 8606], [1900, 8588], [1887, 8596], [1886, 8613], [1898, 8625], [1909, 8624]]], [[[1831, 8651], [1836, 8640], [1800, 8614], [1785, 8613], [1778, 8629], [1796, 8649], [1801, 8645], [1831, 8651]]], [[[1963, 8669], [1953, 8656], [1937, 8676], [1961, 8673], [1963, 8669]]], [[[2061, 8898], [2087, 8893], [2087, 8883], [2058, 8883], [2047, 8897], [2061, 8898]]], [[[2022, 8910], [2036, 8906], [2038, 8872], [2014, 8857], [1982, 8856], [1972, 8879], [1990, 8907], [2022, 8910]]], [[[1927, 8969], [1947, 8984], [1953, 8979], [1936, 8971], [1945, 8961], [1927, 8941], [1938, 8926], [1922, 8903], [1925, 8927], [1910, 8942], [1930, 8959], [1927, 8969]]], [[[1169, 9179], [1148, 9153], [1112, 9185], [1097, 9189], [1110, 9202], [1152, 9204], [1171, 9193], [1169, 9179]]], [[[1369, 9247], [1373, 9222], [1359, 9211], [1335, 9207], [1320, 9213], [1358, 9224], [1369, 9247]]], [[[1194, 9294], [1198, 9287], [1179, 9278], [1159, 9284], [1166, 9297], [1182, 9302], [1194, 9294]]], [[[784, 9344], [790, 9342], [776, 9321], [756, 9307], [732, 9312], [756, 9332], [784, 9344]]], [[[1206, 9338], [1234, 9337], [1195, 9330], [1175, 9341], [1177, 9349], [1224, 9356], [1229, 9346], [1206, 9338]]], [[[1188, 9374], [1213, 9365], [1206, 9357], [1175, 9356], [1167, 9373], [1188, 9374]]], [[[1589, 9437], [1607, 9426], [1596, 9410], [1563, 9423], [1564, 9436], [1589, 9437]]], [[[1156, 9424], [1174, 9417], [1164, 9405], [1141, 9417], [1125, 9444], [1142, 9443], [1156, 9424]]], [[[1439, 9447], [1492, 9447], [1504, 9443], [1495, 9427], [1422, 9428], [1415, 9442], [1439, 9447]]], [[[1276, 9444], [1251, 9440], [1232, 9444], [1233, 9454], [1255, 9454], [1276, 9444]]], [[[882, 9462], [903, 9449], [887, 9442], [859, 9458], [882, 9462]]], [[[1320, 9600], [1342, 9590], [1339, 9570], [1316, 9585], [1302, 9584], [1298, 9594], [1320, 9600]]], [[[2411, 7966], [2407, 7956], [2375, 7965], [2352, 7982], [2361, 7985], [2373, 7973], [2423, 7973], [2411, 7966]]], [[[1901, 8359], [1905, 8372], [1899, 8386], [1920, 8364], [1932, 8364], [1922, 8348], [1920, 8360], [1908, 8341], [1901, 8359]]], [[[410, 8258], [411, 8267], [440, 8238], [428, 8231], [405, 8246], [410, 8258]]], [[[1800, 7956], [1811, 7951], [1826, 7957], [1845, 7947], [1839, 7939], [1800, 7956]]], [[[2444, 7965], [2464, 7995], [2471, 7979], [2455, 7951], [2473, 7969], [2488, 7957], [2470, 7943], [2442, 7941], [2436, 7958], [2444, 7965]]], [[[914, 9455], [943, 9462], [988, 9467], [1018, 9467], [1019, 9459], [985, 9452], [1006, 9447], [1002, 9429], [947, 9418], [915, 9431], [914, 9455]]], [[[1000, 9479], [975, 9486], [967, 9478], [945, 9485], [916, 9478], [915, 9487], [975, 9506], [997, 9510], [1024, 9499], [1026, 9480], [1000, 9479]]], [[[357, 8232], [368, 8234], [372, 8213], [388, 8184], [345, 8230], [352, 8231], [341, 8234], [328, 8260], [332, 8272], [358, 8265], [371, 8270], [364, 8238], [357, 8232]]], [[[2196, 9005], [2227, 9005], [2202, 8988], [2240, 9004], [2244, 9015], [2269, 8995], [2272, 8983], [2246, 8986], [2282, 8963], [2285, 8955], [2256, 8955], [2216, 8964], [2254, 8947], [2253, 8934], [2235, 8925], [2279, 8916], [2282, 8906], [2298, 8906], [2306, 8896], [2343, 8893], [2331, 8886], [2353, 8883], [2370, 8869], [2366, 8859], [2388, 8861], [2383, 8838], [2396, 8847], [2410, 8840], [2423, 8846], [2443, 8828], [2439, 8813], [2407, 8806], [2424, 8796], [2410, 8794], [2419, 8779], [2387, 8777], [2374, 8769], [2384, 8757], [2378, 8742], [2370, 8754], [2347, 8751], [2321, 8779], [2323, 8794], [2306, 8800], [2280, 8821], [2264, 8822], [2272, 8810], [2250, 8817], [2253, 8807], [2274, 8794], [2248, 8790], [2231, 8805], [2240, 8785], [2278, 8764], [2277, 8752], [2328, 8728], [2315, 8723], [2338, 8711], [2329, 8700], [2359, 8690], [2349, 8682], [2348, 8664], [2331, 8678], [2345, 8648], [2326, 8651], [2327, 8642], [2293, 8653], [2288, 8648], [2261, 8673], [2256, 8671], [2225, 8688], [2217, 8687], [2240, 8663], [2260, 8654], [2307, 8615], [2301, 8607], [2322, 8591], [2345, 8588], [2339, 8576], [2306, 8597], [2266, 8613], [2230, 8618], [2199, 8636], [2205, 8641], [2173, 8641], [2182, 8633], [2165, 8632], [2137, 8660], [2150, 8679], [2142, 8685], [2122, 8684], [2102, 8707], [2068, 8733], [2049, 8717], [2017, 8728], [2019, 8717], [1996, 8707], [1977, 8713], [1963, 8701], [1965, 8714], [1946, 8730], [1947, 8744], [1972, 8756], [1968, 8768], [1991, 8766], [2018, 8757], [2028, 8733], [2029, 8747], [2012, 8762], [2034, 8759], [2068, 8772], [2085, 8768], [2080, 8781], [2055, 8802], [2099, 8833], [2105, 8846], [2118, 8850], [2110, 8884], [2100, 8891], [2099, 8906], [2063, 8920], [2043, 8922], [2045, 8911], [2028, 8921], [2033, 8931], [2054, 8928], [2026, 8946], [2022, 8939], [1992, 8929], [1985, 8953], [1976, 8951], [1971, 8967], [1997, 8970], [1975, 8979], [1984, 8987], [1961, 8988], [1961, 9007], [1940, 9009], [1920, 9026], [1906, 9018], [1923, 9015], [1932, 8998], [1902, 8990], [1913, 8982], [1890, 8972], [1846, 8996], [1817, 8984], [1803, 8998], [1785, 8995], [1708, 9004], [1701, 8997], [1675, 9003], [1697, 9004], [1699, 9016], [1661, 9014], [1637, 9022], [1614, 9046], [1611, 9056], [1648, 9049], [1678, 9051], [1655, 9062], [1604, 9069], [1604, 9092], [1595, 9101], [1611, 9114], [1599, 9120], [1611, 9149], [1619, 9147], [1626, 9175], [1664, 9202], [1695, 9209], [1742, 9207], [1747, 9199], [1715, 9178], [1695, 9151], [1709, 9127], [1702, 9117], [1712, 9094], [1750, 9066], [1717, 9060], [1750, 9060], [1759, 9077], [1754, 9088], [1738, 9087], [1716, 9107], [1744, 9120], [1725, 9141], [1729, 9160], [1768, 9150], [1740, 9162], [1740, 9174], [1756, 9184], [1809, 9203], [1848, 9202], [1859, 9175], [1874, 9171], [1874, 9157], [1885, 9146], [1878, 9127], [1864, 9117], [1878, 9115], [1898, 9133], [1905, 9124], [1924, 9121], [1915, 9104], [1930, 9101], [1926, 9118], [1939, 9138], [1963, 9147], [2034, 9133], [2042, 9120], [2032, 9112], [2062, 9110], [2062, 9096], [2037, 9089], [2051, 9086], [2081, 9092], [2069, 9077], [2099, 9081], [2107, 9087], [2141, 9079], [2154, 9066], [2147, 9052], [2164, 9057], [2172, 9048], [2158, 9031], [2190, 9044], [2186, 9029], [2199, 9039], [2235, 9029], [2232, 9017], [2196, 9005]]], [[[482, 8141], [504, 8130], [555, 8119], [558, 8112], [577, 8086], [602, 8076], [625, 8061], [614, 8057], [610, 8043], [578, 8052], [532, 8079], [495, 8114], [467, 8136], [482, 8141]]], [[[2677, 8045], [2663, 8020], [2671, 8014], [2680, 8031], [2691, 8034], [2682, 8010], [2694, 8023], [2699, 8013], [2689, 7986], [2671, 7979], [2671, 7999], [2652, 7989], [2661, 8008], [2658, 8024], [2651, 8009], [2631, 8005], [2621, 7990], [2601, 7990], [2614, 7999], [2616, 8011], [2595, 8017], [2574, 8013], [2539, 8019], [2508, 8014], [2499, 8026], [2528, 8049], [2520, 8053], [2529, 8074], [2538, 8068], [2535, 8085], [2560, 8133], [2578, 8158], [2605, 8170], [2617, 8168], [2608, 8152], [2612, 8141], [2597, 8134], [2578, 8108], [2575, 8090], [2595, 8113], [2614, 8104], [2597, 8095], [2603, 8088], [2634, 8079], [2642, 8094], [2674, 8078], [2661, 8068], [2661, 8052], [2677, 8045]]], [[[1818, 8698], [1803, 8697], [1804, 8708], [1784, 8700], [1785, 8688], [1767, 8681], [1758, 8667], [1737, 8658], [1727, 8663], [1722, 8685], [1681, 8679], [1690, 8696], [1710, 8704], [1704, 8727], [1711, 8743], [1718, 8783], [1731, 8791], [1742, 8783], [1748, 8795], [1754, 8773], [1772, 8756], [1793, 8753], [1798, 8744], [1823, 8735], [1852, 8709], [1852, 8702], [1877, 8697], [1887, 8690], [1863, 8673], [1832, 8684], [1820, 8684], [1818, 8698]]], [[[1334, 8943], [1299, 8941], [1293, 8931], [1285, 8945], [1333, 8953], [1351, 8962], [1345, 8968], [1356, 8987], [1378, 8993], [1395, 8971], [1433, 8978], [1439, 8965], [1412, 8966], [1426, 8940], [1445, 8938], [1406, 8917], [1379, 8921], [1347, 8932], [1334, 8943]]], [[[1220, 9025], [1259, 9004], [1273, 9008], [1290, 9034], [1290, 9024], [1275, 9005], [1278, 8987], [1269, 8970], [1260, 8992], [1255, 8979], [1240, 8992], [1222, 8973], [1201, 8978], [1220, 8965], [1243, 8971], [1252, 8952], [1244, 8936], [1249, 8923], [1235, 8929], [1241, 8943], [1202, 8934], [1159, 8948], [1115, 8955], [1110, 8972], [1088, 8947], [1052, 8943], [1040, 8932], [1003, 8926], [964, 8910], [964, 8922], [928, 8918], [902, 8935], [901, 8955], [880, 8960], [834, 8961], [814, 8969], [790, 8997], [804, 9004], [886, 9014], [933, 9008], [942, 9017], [963, 9014], [946, 9024], [907, 9034], [819, 9025], [797, 9026], [768, 9042], [762, 9052], [830, 9071], [838, 9081], [787, 9071], [765, 9076], [784, 9082], [772, 9087], [743, 9085], [743, 9102], [770, 9118], [756, 9129], [792, 9157], [874, 9183], [893, 9168], [891, 9150], [874, 9139], [899, 9140], [921, 9162], [974, 9146], [955, 9127], [960, 9122], [988, 9137], [1016, 9133], [989, 9162], [1007, 9161], [1050, 9137], [1049, 9125], [1063, 9103], [1060, 9094], [1076, 9085], [1090, 9100], [1075, 9113], [1069, 9134], [1064, 9178], [1068, 9192], [1080, 9194], [1078, 9180], [1093, 9172], [1101, 9179], [1132, 9162], [1146, 9149], [1155, 9112], [1175, 9083], [1178, 9071], [1167, 9057], [1187, 9038], [1220, 9025]]], [[[1909, 9197], [1948, 9199], [1956, 9196], [1975, 9190], [2003, 9166], [2001, 9151], [1947, 9155], [1917, 9147], [1894, 9153], [1888, 9174], [1870, 9177], [1869, 9202], [1880, 9205], [1909, 9197]]], [[[1250, 9123], [1246, 9133], [1227, 9142], [1231, 9163], [1244, 9166], [1266, 9145], [1291, 9146], [1302, 9159], [1256, 9189], [1277, 9195], [1278, 9209], [1303, 9205], [1310, 9215], [1327, 9203], [1385, 9210], [1392, 9197], [1379, 9191], [1388, 9184], [1371, 9178], [1352, 9164], [1389, 9161], [1398, 9172], [1399, 9155], [1413, 9129], [1405, 9120], [1405, 9097], [1379, 9084], [1356, 9087], [1362, 9080], [1342, 9066], [1326, 9070], [1308, 9098], [1268, 9124], [1250, 9123]]], [[[572, 9166], [604, 9205], [593, 9210], [575, 9238], [668, 9250], [710, 9234], [740, 9230], [745, 9219], [753, 9231], [772, 9234], [807, 9223], [853, 9188], [819, 9176], [740, 9140], [734, 9125], [707, 9119], [702, 9103], [696, 9078], [673, 9072], [665, 9076], [652, 9065], [624, 9055], [595, 9089], [560, 9103], [541, 9103], [559, 9133], [569, 9137], [566, 9155], [583, 9157], [572, 9166]]], [[[1424, 9300], [1406, 9309], [1396, 9298], [1391, 9306], [1421, 9313], [1428, 9306], [1461, 9321], [1454, 9333], [1465, 9336], [1469, 9313], [1495, 9292], [1498, 9270], [1492, 9256], [1459, 9255], [1442, 9265], [1441, 9247], [1425, 9252], [1436, 9266], [1425, 9266], [1408, 9288], [1424, 9300]]], [[[1362, 9278], [1314, 9275], [1294, 9277], [1283, 9303], [1303, 9304], [1309, 9316], [1261, 9313], [1226, 9306], [1225, 9317], [1241, 9324], [1206, 9321], [1214, 9331], [1239, 9336], [1264, 9323], [1248, 9342], [1263, 9352], [1242, 9350], [1251, 9364], [1271, 9351], [1309, 9333], [1290, 9351], [1303, 9355], [1284, 9360], [1270, 9372], [1254, 9372], [1275, 9381], [1297, 9382], [1329, 9364], [1336, 9375], [1373, 9366], [1375, 9328], [1365, 9321], [1381, 9317], [1358, 9296], [1375, 9285], [1362, 9278]]], [[[1036, 9321], [1008, 9330], [1030, 9343], [998, 9355], [1024, 9381], [1045, 9389], [1047, 9376], [1066, 9354], [1054, 9339], [1072, 9340], [1071, 9330], [1096, 9330], [1109, 9340], [1134, 9336], [1145, 9316], [1127, 9280], [1083, 9273], [1078, 9280], [1056, 9272], [1044, 9281], [1022, 9268], [992, 9260], [961, 9247], [920, 9241], [901, 9244], [879, 9258], [927, 9276], [964, 9277], [981, 9291], [940, 9284], [893, 9281], [890, 9298], [879, 9281], [863, 9275], [855, 9287], [841, 9275], [788, 9288], [797, 9305], [832, 9305], [861, 9319], [829, 9311], [797, 9311], [807, 9324], [866, 9328], [812, 9330], [812, 9340], [839, 9351], [835, 9358], [865, 9368], [866, 9383], [896, 9391], [901, 9379], [879, 9381], [893, 9348], [921, 9353], [940, 9338], [966, 9327], [973, 9308], [994, 9311], [1042, 9306], [1036, 9321]]], [[[1642, 9247], [1642, 9271], [1632, 9257], [1600, 9249], [1568, 9259], [1554, 9256], [1539, 9263], [1536, 9285], [1525, 9289], [1539, 9312], [1534, 9330], [1506, 9359], [1479, 9352], [1427, 9361], [1408, 9379], [1412, 9386], [1398, 9397], [1428, 9403], [1489, 9393], [1508, 9375], [1519, 9373], [1556, 9379], [1581, 9371], [1585, 9361], [1619, 9355], [1617, 9348], [1562, 9346], [1593, 9341], [1566, 9338], [1595, 9333], [1600, 9337], [1622, 9324], [1630, 9302], [1640, 9316], [1651, 9305], [1676, 9313], [1704, 9302], [1744, 9316], [1758, 9314], [1783, 9326], [1802, 9321], [1824, 9327], [1860, 9323], [1855, 9316], [1878, 9316], [1903, 9304], [1904, 9287], [1880, 9279], [1905, 9278], [1911, 9269], [1894, 9266], [1888, 9254], [1854, 9251], [1840, 9245], [1807, 9250], [1801, 9267], [1790, 9252], [1767, 9248], [1698, 9246], [1642, 9247]]], [[[799, 9426], [821, 9433], [851, 9417], [822, 9406], [840, 9396], [836, 9379], [801, 9368], [805, 9358], [793, 9352], [774, 9361], [782, 9384], [759, 9380], [765, 9371], [745, 9366], [757, 9357], [737, 9343], [730, 9358], [730, 9339], [719, 9328], [701, 9327], [689, 9348], [689, 9333], [661, 9339], [644, 9332], [632, 9351], [645, 9361], [669, 9363], [683, 9377], [704, 9386], [712, 9398], [750, 9420], [778, 9422], [797, 9416], [814, 9422], [799, 9426]]], [[[1358, 9514], [1395, 9506], [1417, 9501], [1456, 9484], [1440, 9477], [1454, 9468], [1449, 9459], [1400, 9452], [1369, 9463], [1396, 9469], [1368, 9475], [1351, 9492], [1358, 9514]]], [[[1145, 9547], [1194, 9549], [1219, 9541], [1233, 9526], [1255, 9531], [1275, 9521], [1268, 9514], [1292, 9514], [1317, 9499], [1308, 9489], [1332, 9466], [1333, 9454], [1306, 9447], [1286, 9452], [1272, 9474], [1240, 9479], [1222, 9474], [1208, 9473], [1223, 9485], [1172, 9478], [1155, 9493], [1167, 9498], [1201, 9493], [1201, 9512], [1180, 9512], [1184, 9524], [1156, 9514], [1166, 9526], [1140, 9527], [1145, 9547]]], [[[1502, 9686], [1544, 9672], [1577, 9630], [1618, 9628], [1627, 9605], [1653, 9598], [1636, 9612], [1643, 9622], [1666, 9620], [1670, 9604], [1659, 9597], [1680, 9597], [1688, 9586], [1682, 9564], [1698, 9569], [1729, 9564], [1748, 9545], [1730, 9536], [1701, 9530], [1671, 9504], [1661, 9505], [1651, 9522], [1650, 9490], [1626, 9472], [1598, 9500], [1599, 9489], [1614, 9471], [1594, 9482], [1588, 9470], [1539, 9474], [1513, 9493], [1547, 9497], [1516, 9502], [1504, 9499], [1473, 9523], [1503, 9537], [1543, 9536], [1587, 9541], [1537, 9539], [1523, 9546], [1544, 9548], [1522, 9555], [1483, 9542], [1485, 9552], [1465, 9548], [1429, 9552], [1433, 9562], [1459, 9566], [1472, 9576], [1445, 9568], [1426, 9569], [1403, 9584], [1401, 9602], [1421, 9597], [1456, 9595], [1478, 9604], [1462, 9607], [1439, 9600], [1405, 9611], [1423, 9618], [1421, 9632], [1446, 9634], [1417, 9637], [1465, 9641], [1436, 9647], [1455, 9665], [1505, 9667], [1504, 9675], [1469, 9679], [1475, 9686], [1502, 9686]]], [[[1946, 9459], [1959, 9435], [1943, 9421], [1918, 9416], [1870, 9419], [1846, 9430], [1857, 9418], [1838, 9416], [1841, 9408], [1860, 9416], [1892, 9410], [1909, 9413], [1922, 9404], [1911, 9393], [1942, 9399], [1954, 9396], [1958, 9377], [1937, 9364], [1929, 9372], [1915, 9356], [1928, 9342], [1926, 9328], [1901, 9328], [1914, 9338], [1912, 9354], [1861, 9344], [1870, 9362], [1836, 9367], [1826, 9361], [1778, 9365], [1747, 9362], [1763, 9355], [1675, 9364], [1668, 9357], [1645, 9360], [1641, 9386], [1630, 9361], [1608, 9371], [1596, 9366], [1582, 9380], [1599, 9388], [1610, 9375], [1612, 9389], [1649, 9406], [1668, 9404], [1689, 9414], [1667, 9420], [1668, 9428], [1652, 9438], [1652, 9448], [1681, 9455], [1710, 9448], [1722, 9429], [1761, 9417], [1757, 9422], [1791, 9420], [1792, 9429], [1819, 9458], [1811, 9462], [1792, 9436], [1777, 9429], [1730, 9432], [1741, 9448], [1726, 9458], [1744, 9465], [1753, 9483], [1731, 9468], [1709, 9465], [1672, 9469], [1672, 9490], [1698, 9513], [1738, 9520], [1782, 9515], [1811, 9505], [1798, 9516], [1841, 9517], [1849, 9529], [1818, 9518], [1767, 9522], [1753, 9528], [1765, 9538], [1761, 9553], [1745, 9566], [1702, 9576], [1707, 9590], [1697, 9602], [1703, 9614], [1781, 9609], [1829, 9583], [1844, 9565], [1874, 9565], [1900, 9572], [1867, 9569], [1848, 9573], [1844, 9586], [1798, 9613], [1882, 9624], [1891, 9628], [1951, 9633], [1894, 9634], [1936, 9645], [1994, 9650], [1993, 9654], [1952, 9654], [1927, 9650], [1926, 9661], [1963, 9683], [1946, 9682], [1912, 9660], [1904, 9648], [1857, 9635], [1807, 9629], [1803, 9636], [1829, 9641], [1835, 9649], [1795, 9640], [1784, 9643], [1781, 9630], [1763, 9627], [1713, 9628], [1694, 9633], [1722, 9657], [1740, 9662], [1812, 9670], [1822, 9673], [1734, 9665], [1713, 9660], [1678, 9635], [1654, 9638], [1616, 9652], [1645, 9660], [1695, 9661], [1753, 9680], [1738, 9681], [1701, 9669], [1603, 9661], [1588, 9672], [1616, 9678], [1601, 9684], [1645, 9701], [1584, 9686], [1574, 9693], [1610, 9705], [1578, 9708], [1557, 9698], [1541, 9705], [1568, 9720], [1605, 9725], [1617, 9718], [1637, 9735], [1657, 9738], [1724, 9730], [1753, 9730], [1695, 9741], [1691, 9747], [1735, 9752], [1723, 9765], [1785, 9756], [1817, 9738], [1805, 9752], [1846, 9739], [1892, 9729], [1915, 9718], [1897, 9733], [1865, 9738], [1813, 9758], [1819, 9768], [1849, 9767], [1825, 9773], [1832, 9780], [1867, 9770], [1875, 9771], [1846, 9788], [1883, 9788], [1918, 9779], [1937, 9781], [1896, 9786], [1888, 9799], [1912, 9802], [1922, 9795], [1956, 9798], [1977, 9794], [1994, 9780], [2014, 9774], [1991, 9795], [1970, 9803], [2006, 9808], [2063, 9804], [2074, 9794], [2111, 9782], [2080, 9798], [2100, 9809], [2139, 9811], [2144, 9805], [2163, 9812], [2196, 9812], [2198, 9803], [2241, 9804], [2293, 9799], [2294, 9796], [2228, 9776], [2262, 9779], [2309, 9792], [2321, 9787], [2343, 9797], [2351, 9786], [2380, 9791], [2374, 9783], [2398, 9768], [2435, 9766], [2448, 9758], [2443, 9745], [2422, 9741], [2415, 9733], [2353, 9711], [2323, 9714], [2309, 9704], [2268, 9700], [2286, 9695], [2185, 9672], [2202, 9673], [2313, 9695], [2348, 9699], [2343, 9688], [2305, 9676], [2285, 9663], [2238, 9644], [2206, 9619], [2174, 9615], [2188, 9610], [2123, 9596], [2168, 9602], [2166, 9591], [2143, 9574], [2121, 9569], [2097, 9579], [2063, 9585], [2044, 9582], [2088, 9577], [2094, 9561], [2068, 9555], [2038, 9558], [2039, 9550], [2005, 9558], [2013, 9548], [1986, 9549], [1969, 9555], [1971, 9543], [2056, 9540], [2055, 9528], [2014, 9532], [2008, 9539], [1950, 9537], [2007, 9534], [1965, 9527], [1954, 9529], [1943, 9512], [1960, 9523], [1989, 9528], [2017, 9524], [1997, 9517], [2031, 9518], [2051, 9511], [2046, 9499], [2028, 9494], [1996, 9496], [2037, 9485], [2021, 9473], [1984, 9474], [2023, 9468], [1985, 9455], [1946, 9459]]]] } }, { "type": "Feature", "id": "ST", "properties": { "hc-group": "admin0", "hc-middle-x": 0.55, "hc-middle-y": 0.50, "hc-key": "st", "hc-a2": "ST", "name": "Sao Tome and Principe", "labelrank": "6", "country-abbrev": "S.T.P.", "subregion": "Middle Africa", "region-wb": "Sub-Saharan Africa", "iso-a3": "STP", "iso-a2": "ST", "woe-id": "23424966", "continent": "Africa" }, "geometry": { "type": "Polygon", "coordinates": [[[4443, 6507], [4438, 6512], [4444, 6517], [4447, 6513], [4443, 6507]]] } }, { "type": "Feature", "id": "JP", "properties": { "hc-group": "admin0", "hc-middle-x": 0.67, "hc-middle-y": 0.50, "hc-key": "jp", "hc-a2": "JP", "name": "Japan", "labelrank": "2", "country-abbrev": "Japan", "subregion": "Eastern Asia", "region-wb": "East Asia & Pacific", "iso-a3": "JPN", "iso-a2": "JP", "woe-id": "23424856", "continent": "Asia" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[8213, 7550], [8216, 7535], [8199, 7515], [8191, 7524], [8172, 7519], [8163, 7501], [8151, 7499], [8146, 7523], [8162, 7545], [8179, 7539], [8198, 7553], [8213, 7550]]], [[[8082, 7450], [8082, 7477], [8095, 7496], [8076, 7481], [8081, 7501], [8071, 7497], [8059, 7514], [8051, 7544], [8062, 7523], [8070, 7519], [8090, 7535], [8105, 7539], [8107, 7529], [8127, 7526], [8135, 7505], [8125, 7492], [8115, 7454], [8103, 7446], [8104, 7422], [8089, 7418], [8103, 7432], [8095, 7448], [8082, 7450]]], [[[8422, 7756], [8431, 7727], [8413, 7697], [8415, 7683], [8402, 7687], [8398, 7670], [8401, 7653], [8387, 7616], [8396, 7597], [8384, 7592], [8382, 7580], [8368, 7570], [8364, 7584], [8345, 7581], [8336, 7560], [8335, 7577], [8318, 7564], [8278, 7565], [8268, 7561], [8279, 7550], [8259, 7542], [8251, 7527], [8236, 7525], [8225, 7536], [8233, 7564], [8215, 7566], [8185, 7558], [8163, 7547], [8141, 7548], [8138, 7536], [8127, 7542], [8113, 7538], [8101, 7544], [8104, 7554], [8117, 7554], [8167, 7593], [8174, 7612], [8176, 7589], [8209, 7596], [8247, 7591], [8251, 7606], [8275, 7636], [8274, 7652], [8291, 7658], [8281, 7636], [8318, 7646], [8337, 7668], [8326, 7670], [8320, 7680], [8342, 7672], [8353, 7680], [8372, 7726], [8363, 7738], [8371, 7755], [8366, 7763], [8379, 7773], [8380, 7787], [8390, 7774], [8403, 7773], [8404, 7787], [8394, 7782], [8397, 7797], [8408, 7790], [8412, 7766], [8422, 7756]]], [[[8465, 7810], [8421, 7835], [8399, 7825], [8392, 7833], [8379, 7822], [8405, 7805], [8391, 7806], [8376, 7792], [8374, 7812], [8364, 7821], [8367, 7836], [8386, 7849], [8385, 7861], [8405, 7853], [8410, 7874], [8418, 7882], [8423, 7905], [8417, 7926], [8409, 7926], [8428, 7939], [8458, 7905], [8480, 7888], [8512, 7882], [8527, 7896], [8520, 7875], [8528, 7859], [8510, 7845], [8493, 7847], [8477, 7836], [8465, 7810]]]] } }, { "type": "Feature", "id": "CV", "properties": { "hc-group": "admin0", "hc-middle-x": 0.34, "hc-middle-y": 0.60, "hc-key": "cv", "hc-a2": "CV", "name": "Cape Verde", "labelrank": "4", "country-abbrev": "C.Vd.", "subregion": "Western Africa", "region-wb": "Sub-Saharan Africa", "iso-a3": "CPV", "iso-a2": "CV", "woe-id": "23424794", "continent": "Africa" }, "geometry": { "type": "Polygon", "coordinates": [[[3549, 6957], [3558, 6948], [3556, 6945], [3548, 6948], [3549, 6957]]] } }, { "type": "Feature", "id": "DM", "properties": { "hc-group": "admin0", "hc-middle-x": 0.35, "hc-middle-y": 0.49, "hc-key": "dm", "hc-a2": "DM", "name": "Dominica", "labelrank": "6", "country-abbrev": "D'inca", "subregion": "Caribbean", "region-wb": "Latin America & Caribbean", "iso-a3": "DMA", "iso-a2": "DM", "woe-id": "23424798", "continent": "North America" }, "geometry": { "type": "Polygon", "coordinates": [[[2440, 6965], [2444, 6962], [2441, 6953], [2438, 6962], [2440, 6965]]] } }, { "type": "Feature", "id": "SC", "properties": { "hc-group": "admin0", "hc-middle-x": 0.61, "hc-middle-y": 0.48, "hc-key": "sc", "hc-a2": "SC", "name": "Seychelles", "labelrank": "6", "country-abbrev": "Syc.", "subregion": "Eastern Africa", "region-wb": "Sub-Saharan Africa", "iso-a3": "SYC", "iso-a2": "SC", "woe-id": "23424941", "continent": "Seven seas (open ocean)" }, "geometry": { "type": "Polygon", "coordinates": [[[5879, 6370], [5880, 6372], [5883, 6368], [5882, 6365], [5879, 6370]]] } }, { "type": "Feature", "id": "JM", "properties": { "hc-group": "admin0", "hc-middle-x": 0.50, "hc-middle-y": 0.53, "hc-key": "jm", "hc-a2": "JM", "name": "Jamaica", "labelrank": "4", "country-abbrev": "Jam.", "subregion": "Caribbean", "region-wb": "Latin America & Caribbean", "iso-a3": "JAM", "iso-a2": "JM", "woe-id": "23424858", "continent": "North America" }, "geometry": { "type": "Polygon", "coordinates": [[[1968, 7052], [1984, 7050], [2005, 7035], [1985, 7037], [1975, 7029], [1941, 7045], [1954, 7053], [1968, 7052]]] } }, { "type": "Feature", "id": "WS", "properties": { "hc-group": "admin0", "hc-middle-x": 0.50, "hc-middle-y": 0.53, "hc-key": "ws", "hc-a2": "WS", "name": "Samoa", "labelrank": "4", "country-abbrev": "Samoa", "subregion": "Polynesia", "region-wb": "East Asia & Pacific", "iso-a3": "WSM", "iso-a2": "WS", "woe-id": "23424992", "continent": "Oceania" }, "geometry": { "type": "Polygon", "coordinates": [[[-824, 6108], [-822, 6099], [-831, 6099], [-839, 6107], [-824, 6108]]] } }, { "type": "Feature", "id": "OM", "properties": { "hc-group": "admin0", "hc-middle-x": 0.88, "hc-middle-y": 0.44, "hc-key": "om", "hc-a2": "OM", "name": "Oman", "labelrank": "4", "country-abbrev": "Oman", "subregion": "Western Asia", "region-wb": "Middle East & North Africa", "iso-a3": "OMN", "iso-a2": "OM", "woe-id": "23424898", "continent": "Asia" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[5905, 7259], [5904, 7259], [5904, 7262], [5907, 7261], [5905, 7259]]], [[[5899, 7285], [5908, 7295], [5905, 7272], [5901, 7273], [5899, 7285]]], [[[5779, 7068], [5867, 7098], [5886, 7159], [5873, 7181], [5890, 7228], [5891, 7248], [5908, 7251], [5931, 7220], [5979, 7206], [6009, 7165], [5995, 7142], [5976, 7123], [5975, 7109], [5959, 7116], [5947, 7091], [5951, 7068], [5924, 7062], [5907, 7036], [5881, 7033], [5868, 7008], [5839, 7007], [5811, 6996], [5801, 7016], [5779, 7068]]]] } }, { "type": "Feature", "id": "IN", "properties": { "hc-group": "admin0", "hc-middle-x": 0.35, "hc-middle-y": 0.44, "hc-key": "in", "hc-a2": "IN", "name": "India", "labelrank": "2", "country-abbrev": "India", "subregion": "Southern Asia", "region-wb": "South Asia", "iso-a3": "IND", "iso-a2": "IN", "woe-id": "23424848", "continent": "Asia" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[6974, 6822], [6975, 6849], [6982, 6895], [6986, 6873], [6980, 6859], [6974, 6822]]], [[[6870, 7163], [6870, 7157], [6870, 7153], [6869, 7147], [6841, 7148], [6846, 7162], [6830, 7149], [6816, 7145], [6805, 7134], [6810, 7119], [6792, 7098], [6764, 7088], [6747, 7074], [6724, 7046], [6699, 7025], [6671, 7008], [6672, 6995], [6640, 6987], [6627, 6969], [6611, 6967], [6605, 6948], [6614, 6898], [6608, 6872], [6600, 6858], [6599, 6807], [6586, 6808], [6572, 6783], [6575, 6778], [6552, 6768], [6547, 6751], [6530, 6742], [6502, 6766], [6493, 6798], [6472, 6849], [6462, 6858], [6451, 6883], [6444, 6914], [6435, 6938], [6411, 6979], [6397, 7040], [6387, 7093], [6394, 7114], [6384, 7150], [6384, 7164], [6372, 7159], [6371, 7135], [6338, 7120], [6311, 7133], [6278, 7168], [6314, 7177], [6321, 7188], [6301, 7182], [6269, 7196], [6256, 7216], [6256, 7216], [6256, 7216], [6263, 7220], [6272, 7230], [6308, 7226], [6324, 7234], [6331, 7228], [6340, 7242], [6328, 7266], [6311, 7283], [6314, 7300], [6293, 7309], [6297, 7321], [6319, 7347], [6334, 7337], [6364, 7345], [6379, 7371], [6395, 7379], [6408, 7408], [6446, 7445], [6441, 7465], [6467, 7483], [6448, 7490], [6447, 7502], [6436, 7501], [6427, 7513], [6426, 7529], [6435, 7539], [6420, 7552], [6435, 7566], [6479, 7557], [6502, 7564], [6517, 7577], [6539, 7590], [6553, 7562], [6572, 7553], [6568, 7525], [6585, 7513], [6588, 7496], [6572, 7486], [6556, 7492], [6567, 7474], [6566, 7453], [6576, 7456], [6591, 7440], [6633, 7416], [6618, 7404], [6605, 7373], [6637, 7358], [6642, 7350], [6664, 7343], [6685, 7330], [6738, 7325], [6740, 7316], [6775, 7301], [6819, 7294], [6841, 7298], [6838, 7318], [6843, 7342], [6857, 7350], [6865, 7325], [6871, 7309], [6893, 7305], [6943, 7308], [6959, 7313], [6956, 7330], [6946, 7339], [6975, 7344], [6999, 7368], [7026, 7379], [7034, 7388], [7054, 7380], [7079, 7390], [7103, 7357], [7114, 7353], [7114, 7343], [7097, 7326], [7079, 7323], [7046, 7298], [7050, 7285], [7034, 7264], [7037, 7253], [7019, 7216], [6995, 7222], [6997, 7194], [6990, 7190], [6986, 7159], [6974, 7159], [6967, 7199], [6961, 7213], [6945, 7188], [6932, 7209], [6938, 7224], [6960, 7234], [6964, 7249], [6957, 7258], [6909, 7257], [6892, 7264], [6893, 7281], [6853, 7298], [6841, 7280], [6866, 7257], [6852, 7257], [6840, 7241], [6861, 7228], [6855, 7210], [6867, 7196], [6870, 7163]]]] } }, { "type": "Feature", "id": "VC", "properties": { "hc-group": "admin0", "hc-middle-x": 0.51, "hc-middle-y": 0.50, "hc-key": "vc", "hc-a2": "VC", "name": "Saint Vincent and the Grenadines", "labelrank": "6", "country-abbrev": "St.V.G.", "subregion": "Caribbean", "region-wb": "Latin America & Caribbean", "iso-a3": "VCT", "iso-a2": "VC", "woe-id": "23424981", "continent": "North America" }, "geometry": { "type": "Polygon", "coordinates": [[[2446, 6889], [2444, 6896], [2448, 6899], [2448, 6893], [2446, 6889]]] } }, { "type": "Feature", "id": "SB", "properties": { "hc-group": "admin0", "hc-middle-x": 0.91, "hc-middle-y": 0.90, "hc-key": "sb", "hc-a2": "SB", "name": "Solomon Islands", "labelrank": "3", "country-abbrev": "S. Is.", "subregion": "Melanesia", "region-wb": "East Asia & Pacific", "iso-a3": "SLB", "iso-a2": "SB", "woe-id": "23424766", "continent": "Oceania" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[8970, 6229], [8978, 6214], [8954, 6218], [8948, 6233], [8961, 6241], [8970, 6229]]], [[[9001, 6229], [9000, 6206], [9021, 6198], [9026, 6188], [9012, 6190], [8997, 6202], [9000, 6222], [8985, 6237], [8977, 6261], [8988, 6253], [9001, 6229]]], [[[8873, 6275], [8885, 6272], [8901, 6248], [8859, 6274], [8873, 6275]]], [[[8843, 6301], [8856, 6312], [8886, 6289], [8922, 6283], [8954, 6261], [8956, 6254], [8909, 6283], [8874, 6290], [8855, 6308], [8843, 6301]]]] } }, { "type": "Feature", "id": "LC", "properties": { "hc-group": "admin0", "hc-middle-x": 0.49, "hc-middle-y": 0.48, "hc-key": "lc", "hc-a2": "LC", "name": "Saint Lucia", "labelrank": "6", "country-abbrev": "S.L.", "subregion": "Caribbean", "region-wb": "Latin America & Caribbean", "iso-a3": "LCA", "iso-a2": "LC", "woe-id": "23424951", "continent": "North America" }, "geometry": { "type": "Polygon", "coordinates": [[[2454, 6909], [2450, 6912], [2454, 6920], [2455, 6919], [2454, 6909]]] } }, { "type": "Feature", "id": "FR", "properties": { "hc-group": "admin0", "hc-middle-x": 0.28, "hc-middle-y": 0.04, "hc-key": "fr", "hc-a2": "FR", "name": "France", "labelrank": "2", "country-abbrev": "Fr.", "subregion": "Western Europe", "region-wb": "Europe & Central Asia", "iso-a3": "FRA", "iso-a2": "FR", "woe-id": "-90", "continent": "Europe" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[4527, 7836], [4529, 7817], [4520, 7791], [4507, 7797], [4500, 7821], [4505, 7833], [4527, 7836]]], [[[9082, 5896], [9091, 5903], [9113, 5889], [9125, 5874], [9161, 5850], [9166, 5841], [9142, 5846], [9115, 5864], [9082, 5896]]], [[[6286, 4943], [6297, 4944], [6301, 4932], [6325, 4938], [6313, 4915], [6277, 4925], [6274, 4948], [6286, 4943]]], [[[2390, 7039], [2393, 7041], [2393, 7038], [2390, 7039]]], [[[4469, 7876], [4468, 7875], [4467, 7875], [4466, 7875], [4465, 7874], [4445, 7855], [4421, 7850], [4400, 7863], [4390, 7860], [4364, 7867], [4340, 7852], [4342, 7828], [4309, 7825], [4298, 7830], [4299, 7834], [4290, 7834], [4267, 7842], [4247, 7837], [4204, 7851], [4195, 7862], [4205, 7869], [4217, 7953], [4215, 7966], [4195, 7975], [4189, 7995], [4165, 8012], [4132, 8027], [4119, 8024], [4122, 8035], [4108, 8049], [4157, 8064], [4169, 8050], [4208, 8056], [4191, 8096], [4207, 8096], [4213, 8085], [4242, 8079], [4260, 8086], [4255, 8096], [4283, 8105], [4294, 8117], [4295, 8140], [4322, 8149], [4322, 8149], [4325, 8144], [4325, 8144], [4341, 8136], [4356, 8119], [4372, 8116], [4370, 8106], [4392, 8112], [4394, 8099], [4409, 8087], [4419, 8089], [4424, 8085], [4435, 8086], [4445, 8075], [4490, 8067], [4478, 8054], [4471, 8025], [4470, 8018], [4471, 8015], [4472, 8015], [4456, 8006], [4429, 7978], [4431, 7967], [4433, 7970], [4436, 7971], [4448, 7972], [4450, 7961], [4455, 7954], [4448, 7950], [4457, 7929], [4443, 7924], [4456, 7909], [4450, 7897], [4475, 7887], [4469, 7876]], [[4306, 7828], [4307, 7828], [4306, 7830], [4305, 7829], [4306, 7828]]], [[[2653, 6662], [2660, 6673], [2688, 6665], [2717, 6641], [2726, 6623], [2717, 6614], [2696, 6574], [2654, 6567], [2640, 6573], [2648, 6579], [2658, 6606], [2648, 6623], [2644, 6649], [2653, 6662]]]] } }, { "type": "Feature", "id": "NR", "properties": { "hc-group": "admin0", "hc-middle-x": 0.53, "hc-middle-y": 0.50, "hc-key": "nr", "hc-a2": "NR", "name": "Nauru", "labelrank": "6", "country-abbrev": "Nauru", "subregion": "Micronesia", "region-wb": "East Asia & Pacific", "iso-a3": "NRU", "iso-a2": "NR", "woe-id": "23424912", "continent": "Oceania" }, "geometry": { "type": "Polygon", "coordinates": [[[9164, 6489], [9163, 6489], [9163, 6491], [9164, 6491], [9164, 6489]]] } }, { "type": "Feature", "id": "NO", "properties": { "hc-group": "admin0", "hc-middle-x": 0.13, "hc-middle-y": 0.90, "hc-key": "no", "hc-a2": "NO", "name": "Norway", "labelrank": "3", "country-abbrev": "Nor.", "subregion": "Northern Europe", "region-wb": "Europe & Central Asia", "iso-a3": "NOR", "iso-a2": "NO", "woe-id": "-90", "continent": "Europe" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[4832, 9001], [4828, 8990], [4811, 8986], [4802, 8976], [4784, 8973], [4789, 8987], [4809, 8989], [4797, 9000], [4811, 9004], [4823, 8993], [4832, 9001]]], [[[4880, 9498], [4899, 9499], [4904, 9478], [4868, 9474], [4851, 9481], [4842, 9493], [4880, 9498]]], [[[4580, 9496], [4594, 9489], [4606, 9474], [4576, 9489], [4558, 9512], [4567, 9517], [4580, 9496]]], [[[4756, 8970], [4780, 8971], [4777, 8955], [4743, 8948], [4756, 8970]]], [[[5156, 8987], [5157, 8973], [5140, 8978], [5129, 8964], [5112, 8960], [5101, 8947], [5098, 8957], [5112, 8969], [5106, 8980], [5084, 8987], [5070, 9001], [5046, 8992], [5028, 8993], [5015, 8982], [5003, 8939], [4990, 8936], [4980, 8923], [4953, 8936], [4931, 8926], [4909, 8930], [4886, 8959], [4876, 8960], [4867, 8947], [4855, 8947], [4847, 8941], [4844, 8918], [4835, 8912], [4809, 8920], [4783, 8921], [4783, 8902], [4775, 8893], [4758, 8899], [4743, 8890], [4723, 8865], [4731, 8847], [4702, 8819], [4704, 8808], [4676, 8801], [4679, 8787], [4675, 8762], [4650, 8726], [4664, 8720], [4659, 8699], [4638, 8703], [4622, 8697], [4606, 8680], [4601, 8666], [4608, 8652], [4604, 8633], [4611, 8617], [4606, 8594], [4627, 8578], [4622, 8563], [4609, 8560], [4619, 8540], [4617, 8522], [4592, 8498], [4596, 8484], [4585, 8473], [4556, 8484], [4533, 8471], [4498, 8441], [4471, 8431], [4440, 8435], [4409, 8463], [4427, 8491], [4413, 8491], [4400, 8482], [4410, 8505], [4395, 8527], [4404, 8542], [4397, 8554], [4395, 8608], [4405, 8608], [4423, 8626], [4452, 8638], [4448, 8646], [4506, 8668], [4509, 8675], [4477, 8671], [4497, 8678], [4507, 8690], [4518, 8676], [4534, 8682], [4546, 8667], [4551, 8674], [4586, 8690], [4574, 8691], [4540, 8676], [4529, 8688], [4548, 8696], [4548, 8708], [4588, 8735], [4579, 8738], [4589, 8752], [4596, 8747], [4612, 8777], [4625, 8793], [4618, 8801], [4640, 8809], [4637, 8819], [4648, 8841], [4662, 8844], [4671, 8866], [4685, 8863], [4707, 8881], [4684, 8885], [4705, 8901], [4722, 8903], [4726, 8888], [4732, 8906], [4722, 8914], [4759, 8947], [4781, 8954], [4787, 8971], [4806, 8975], [4810, 8984], [4849, 8992], [4843, 8967], [4852, 8975], [4854, 8992], [4862, 9001], [4878, 8999], [4893, 8988], [4891, 9000], [4873, 9009], [4922, 9019], [4922, 9026], [4900, 9023], [4907, 9035], [4920, 9032], [4937, 9039], [4930, 9024], [4954, 9035], [4958, 9027], [4978, 9049], [4991, 9040], [4993, 9053], [5008, 9059], [5019, 9051], [4986, 9024], [4988, 9002], [5025, 9044], [5034, 9049], [5029, 9017], [5059, 9043], [5060, 9056], [5089, 9050], [5068, 9023], [5080, 9020], [5096, 9044], [5131, 9035], [5163, 9013], [5136, 9001], [5091, 9004], [5156, 8987]]], [[[4694, 8917], [4671, 8929], [4702, 8939], [4707, 8951], [4722, 8962], [4714, 8925], [4727, 8937], [4736, 8930], [4708, 8909], [4694, 8917], [4686, 8905], [4661, 8903], [4643, 8897], [4625, 8885], [4630, 8896], [4660, 8911], [4694, 8917]]], [[[4944, 9452], [4967, 9450], [4952, 9430], [4936, 9421], [4932, 9414], [4909, 9414], [4919, 9432], [4864, 9425], [4863, 9433], [4886, 9455], [4863, 9466], [4887, 9474], [4924, 9477], [4939, 9470], [4927, 9465], [4944, 9452]]], [[[4704, 9547], [4729, 9520], [4718, 9546], [4711, 9584], [4728, 9596], [4743, 9584], [4765, 9585], [4781, 9574], [4771, 9565], [4771, 9552], [4788, 9567], [4800, 9561], [4806, 9536], [4831, 9536], [4838, 9528], [4861, 9529], [4850, 9522], [4882, 9516], [4878, 9504], [4857, 9505], [4807, 9491], [4809, 9466], [4795, 9464], [4784, 9428], [4770, 9427], [4758, 9396], [4747, 9386], [4755, 9380], [4743, 9371], [4707, 9393], [4730, 9397], [4700, 9398], [4671, 9410], [4658, 9431], [4673, 9434], [4715, 9431], [4689, 9437], [4693, 9442], [4745, 9449], [4742, 9453], [4692, 9447], [4652, 9446], [4648, 9464], [4691, 9468], [4711, 9476], [4713, 9483], [4747, 9483], [4729, 9490], [4744, 9504], [4735, 9507], [4719, 9492], [4703, 9490], [4684, 9508], [4672, 9493], [4680, 9485], [4656, 9474], [4631, 9474], [4614, 9496], [4591, 9509], [4597, 9516], [4582, 9524], [4609, 9519], [4613, 9526], [4592, 9530], [4604, 9545], [4580, 9532], [4563, 9563], [4573, 9571], [4596, 9581], [4611, 9570], [4617, 9575], [4654, 9584], [4653, 9572], [4631, 9571], [4615, 9563], [4644, 9565], [4662, 9543], [4657, 9561], [4677, 9579], [4698, 9566], [4704, 9547]]], [[[5005, 9604], [5037, 9604], [5050, 9598], [5048, 9582], [5009, 9567], [5009, 9555], [4990, 9548], [4963, 9546], [4956, 9538], [4923, 9540], [4922, 9553], [4861, 9550], [4843, 9556], [4828, 9548], [4826, 9566], [4851, 9571], [4891, 9572], [4893, 9580], [4801, 9573], [4784, 9585], [4803, 9594], [4785, 9595], [4787, 9617], [4793, 9608], [4817, 9598], [4809, 9616], [4826, 9607], [4823, 9618], [4852, 9637], [4861, 9638], [4848, 9621], [4863, 9606], [4891, 9610], [4891, 9602], [4907, 9592], [4918, 9626], [4933, 9623], [4926, 9603], [4949, 9604], [4948, 9613], [4965, 9611], [4960, 9627], [4978, 9609], [5005, 9604]]]] } }, { "type": "Feature", "id": "FM", "properties": { "hc-group": "admin0", "hc-middle-x": 0.50, "hc-middle-y": 0.52, "hc-key": "fm", "hc-a2": "FM", "name": "Federated States of Micronesia", "labelrank": "6", "country-abbrev": "F.S.M.", "subregion": "Micronesia", "region-wb": "East Asia & Pacific", "iso-a3": "FSM", "iso-a2": "FM", "woe-id": "23424815", "continent": "Oceania" }, "geometry": { "type": "Polygon", "coordinates": [[[8906, 6709], [8910, 6708], [8909, 6704], [8906, 6704], [8906, 6709]]] } }, { "type": "Feature", "id": "KN", "properties": { "hc-group": "admin0", "hc-middle-x": 0.57, "hc-middle-y": 0.32, "hc-key": "kn", "hc-a2": "KN", "name": "Saint Kitts and Nevis", "labelrank": "6", "country-abbrev": "St.K.N.", "subregion": "Caribbean", "region-wb": "Latin America & Caribbean", "iso-a3": "KNA", "iso-a2": "KN", "woe-id": "23424940", "continent": "North America" }, "geometry": { "type": "Polygon", "coordinates": [[[2405, 7013], [2403, 7015], [2397, 7018], [2401, 7018], [2405, 7013]]] } }, { "type": "Feature", "id": "CN", "properties": { "hc-group": "admin0", "hc-middle-x": 0.42, "hc-middle-y": 0.55, "hc-key": "cn", "hc-a2": "CN", "name": "China", "labelrank": "2", "country-abbrev": "China", "subregion": "Eastern Asia", "region-wb": "East Asia & Pacific", "iso-a3": "CHN", "iso-a2": "CN", "woe-id": "23424781", "continent": "Asia" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[7498, 7058], [7474, 7043], [7448, 7053], [7446, 7076], [7479, 7098], [7514, 7098], [7498, 7058]]], [[[6865, 7325], [6857, 7350], [6843, 7342], [6814, 7341], [6796, 7349], [6780, 7343], [6771, 7357], [6753, 7356], [6724, 7386], [6707, 7384], [6697, 7398], [6667, 7412], [6665, 7421], [6633, 7416], [6591, 7440], [6576, 7456], [6566, 7453], [6567, 7474], [6556, 7492], [6572, 7486], [6588, 7496], [6585, 7513], [6568, 7525], [6572, 7553], [6553, 7562], [6539, 7590], [6527, 7589], [6509, 7595], [6491, 7600], [6485, 7622], [6467, 7637], [6443, 7641], [6438, 7645], [6453, 7648], [6450, 7692], [6421, 7695], [6416, 7724], [6427, 7745], [6452, 7761], [6474, 7764], [6476, 7753], [6504, 7765], [6508, 7776], [6547, 7779], [6555, 7791], [6583, 7805], [6609, 7813], [6610, 7819], [6608, 7835], [6627, 7853], [6614, 7888], [6614, 7907], [6605, 7921], [6655, 7932], [6661, 7925], [6680, 7926], [6671, 7939], [6692, 8001], [6719, 7992], [6741, 7993], [6744, 7987], [6765, 7995], [6771, 8008], [6766, 8028], [6774, 8046], [6797, 8051], [6806, 8073], [6819, 8072], [6834, 8075], [6837, 8053], [6870, 8030], [6885, 8032], [6908, 8018], [6929, 7977], [6928, 7957], [6917, 7938], [6924, 7927], [6947, 7922], [7002, 7918], [7014, 7908], [7046, 7893], [7056, 7894], [7072, 7856], [7085, 7839], [7110, 7841], [7177, 7833], [7193, 7837], [7241, 7831], [7252, 7819], [7283, 7813], [7302, 7804], [7325, 7808], [7325, 7801], [7346, 7804], [7392, 7823], [7433, 7829], [7472, 7829], [7499, 7840], [7514, 7858], [7544, 7873], [7528, 7899], [7546, 7923], [7594, 7911], [7620, 7934], [7653, 7936], [7669, 7946], [7681, 7968], [7702, 7969], [7729, 7983], [7746, 7984], [7772, 7978], [7778, 7983], [7772, 7999], [7738, 8029], [7715, 8030], [7713, 8029], [7708, 8022], [7689, 8026], [7659, 8020], [7649, 8035], [7684, 8100], [7715, 8088], [7741, 8105], [7761, 8110], [7756, 8121], [7784, 8171], [7804, 8189], [7803, 8206], [7782, 8214], [7807, 8235], [7850, 8244], [7888, 8246], [7911, 8233], [7932, 8232], [7950, 8223], [7974, 8190], [7971, 8184], [7985, 8161], [7985, 8148], [8004, 8115], [8002, 8100], [8020, 8089], [8040, 8090], [8061, 8084], [8100, 8043], [8096, 8033], [8106, 8019], [8150, 8020], [8167, 8035], [8205, 8045], [8216, 8020], [8198, 8003], [8191, 7966], [8184, 7962], [8167, 7924], [8159, 7922], [8156, 7929], [8134, 7928], [8103, 7914], [8113, 7886], [8113, 7862], [8108, 7845], [8088, 7839], [8091, 7831], [8079, 7847], [8071, 7847], [8067, 7828], [8056, 7828], [8043, 7814], [8018, 7812], [8021, 7791], [7995, 7795], [7985, 7806], [7976, 7801], [7958, 7774], [7925, 7760], [7910, 7746], [7903, 7737], [7881, 7736], [7854, 7723], [7836, 7706], [7815, 7699], [7834, 7721], [7817, 7727], [7836, 7743], [7849, 7760], [7836, 7772], [7816, 7775], [7794, 7750], [7768, 7739], [7752, 7715], [7715, 7712], [7709, 7695], [7725, 7679], [7747, 7679], [7751, 7650], [7765, 7644], [7803, 7669], [7828, 7655], [7844, 7659], [7860, 7654], [7850, 7634], [7841, 7640], [7803, 7622], [7802, 7611], [7771, 7593], [7758, 7575], [7771, 7558], [7789, 7551], [7808, 7508], [7807, 7497], [7835, 7473], [7836, 7457], [7810, 7469], [7840, 7440], [7810, 7428], [7803, 7418], [7822, 7421], [7831, 7410], [7846, 7421], [7850, 7408], [7838, 7399], [7838, 7380], [7828, 7387], [7830, 7357], [7814, 7353], [7797, 7321], [7772, 7306], [7769, 7273], [7751, 7261], [7752, 7251], [7724, 7233], [7710, 7213], [7692, 7209], [7678, 7188], [7658, 7182], [7628, 7184], [7608, 7165], [7594, 7191], [7591, 7165], [7553, 7150], [7508, 7139], [7504, 7127], [7491, 7124], [7503, 7113], [7484, 7106], [7477, 7126], [7479, 7143], [7441, 7155], [7428, 7143], [7409, 7147], [7388, 7159], [7391, 7182], [7365, 7187], [7349, 7201], [7334, 7188], [7310, 7175], [7290, 7183], [7280, 7173], [7264, 7183], [7255, 7171], [7241, 7173], [7243, 7133], [7230, 7134], [7227, 7146], [7225, 7152], [7198, 7142], [7191, 7161], [7167, 7164], [7178, 7192], [7159, 7196], [7151, 7223], [7123, 7217], [7120, 7244], [7128, 7260], [7154, 7280], [7154, 7333], [7142, 7332], [7137, 7351], [7120, 7363], [7114, 7353], [7103, 7357], [7079, 7390], [7054, 7380], [7034, 7388], [7026, 7379], [6999, 7368], [6975, 7344], [6946, 7339], [6936, 7349], [6912, 7349], [6905, 7358], [6885, 7351], [6865, 7325]]]] } }, { "type": "Feature", "id": "BH", "properties": { "hc-group": "admin0", "hc-middle-x": 0.45, "hc-middle-y": 0.50, "hc-key": "bh", "hc-a2": "BH", "name": "Bahrain", "labelrank": "4", "country-abbrev": "Bahr.", "subregion": "Western Asia", "region-wb": "Middle East & North Africa", "iso-a3": "BHR", "iso-a2": "BH", "woe-id": "23424753", "continent": "Asia" }, "geometry": { "type": "Polygon", "coordinates": [[[5734, 7291], [5739, 7289], [5737, 7277], [5734, 7283], [5734, 7291]]] } }, { "type": "Feature", "id": "TO", "properties": { "hc-group": "admin0", "hc-middle-x": 0.54, "hc-middle-y": 0.40, "hc-key": "to", "hc-a2": "TO", "name": "Tonga", "labelrank": "4", "country-abbrev": "Tongo", "subregion": "Polynesia", "region-wb": "East Asia & Pacific", "iso-a3": "TON", "iso-a2": "TO", "woe-id": "23424964", "continent": "Oceania" }, "geometry": { "type": "Polygon", "coordinates": [[[-904, 5871], [-915, 5878], [-909, 5877], [-908, 5874], [-904, 5871]]] } }, { "type": "Feature", "id": "ID", "properties": { "hc-group": "admin0", "hc-middle-x": 0.38, "hc-middle-y": 0.41, "hc-key": "id", "hc-a2": "ID", "name": "Indonesia", "labelrank": "2", "country-abbrev": "Indo.", "subregion": "South-Eastern Asia", "region-wb": "East Asia & Pacific", "iso-a3": "IDN", "iso-a2": "ID", "woe-id": "23424846", "continent": "Asia" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[7782, 6231], [7806, 6209], [7795, 6203], [7750, 6224], [7757, 6230], [7782, 6231]]], [[[8332, 6265], [8338, 6259], [8301, 6258], [8312, 6282], [8335, 6289], [8343, 6283], [8332, 6265]]], [[[7856, 6346], [7848, 6348], [7852, 6367], [7875, 6372], [7868, 6354], [7876, 6350], [7859, 6339], [7856, 6346]]], [[[7957, 6435], [7938, 6451], [7910, 6447], [7910, 6456], [7968, 6452], [7957, 6450], [7961, 6414], [7983, 6415], [7995, 6406], [7980, 6392], [7963, 6400], [7957, 6435]]], [[[7409, 6421], [7418, 6430], [7436, 6425], [7434, 6413], [7417, 6420], [7384, 6415], [7369, 6423], [7363, 6442], [7344, 6449], [7357, 6461], [7370, 6459], [7380, 6433], [7394, 6430], [7387, 6419], [7409, 6421]]], [[[7180, 6446], [7206, 6417], [7193, 6422], [7179, 6442], [7160, 6456], [7151, 6470], [7161, 6478], [7171, 6453], [7180, 6446]]], [[[7997, 6495], [8008, 6492], [8008, 6466], [8018, 6455], [7999, 6457], [8006, 6468], [7997, 6495]]], [[[7089, 6574], [7066, 6586], [7072, 6590], [7086, 6578], [7114, 6569], [7115, 6550], [7132, 6534], [7125, 6522], [7106, 6547], [7107, 6570], [7089, 6574]]], [[[8207, 6321], [8209, 6312], [8195, 6307], [8198, 6329], [8208, 6346], [8216, 6339], [8214, 6320], [8207, 6321]]], [[[7709, 6260], [7726, 6267], [7731, 6260], [7752, 6262], [7753, 6252], [7736, 6245], [7693, 6238], [7664, 6244], [7664, 6258], [7675, 6265], [7688, 6256], [7709, 6260]]], [[[8010, 6410], [8016, 6420], [8059, 6424], [8093, 6414], [8101, 6392], [8062, 6409], [8031, 6404], [8021, 6415], [8010, 6410]]], [[[7912, 6236], [7916, 6236], [7926, 6242], [7928, 6236], [7930, 6227], [7911, 6207], [7883, 6201], [7890, 6223], [7900, 6231], [7907, 6226], [7912, 6236]]], [[[7720, 6627], [7713, 6622], [7714, 6627], [7715, 6627], [7720, 6627]]], [[[8399, 6429], [8399, 6303], [8399, 6238], [8368, 6268], [8336, 6267], [8343, 6284], [8332, 6294], [8313, 6347], [8252, 6373], [8230, 6375], [8203, 6392], [8181, 6401], [8163, 6385], [8162, 6401], [8141, 6427], [8156, 6423], [8165, 6433], [8188, 6428], [8193, 6435], [8173, 6441], [8155, 6438], [8137, 6444], [8129, 6461], [8101, 6466], [8083, 6445], [8067, 6450], [8086, 6456], [8098, 6469], [8089, 6479], [8091, 6498], [8100, 6505], [8112, 6494], [8093, 6493], [8113, 6474], [8112, 6481], [8156, 6495], [8176, 6484], [8193, 6484], [8202, 6466], [8198, 6438], [8207, 6421], [8211, 6434], [8223, 6408], [8237, 6407], [8260, 6430], [8260, 6449], [8226, 6461], [8249, 6457], [8248, 6485], [8258, 6474], [8258, 6457], [8286, 6453], [8305, 6462], [8366, 6436], [8399, 6429]]], [[[7336, 6438], [7358, 6435], [7371, 6410], [7363, 6335], [7349, 6345], [7343, 6336], [7329, 6344], [7331, 6332], [7301, 6360], [7261, 6388], [7258, 6399], [7241, 6410], [7225, 6429], [7204, 6468], [7201, 6481], [7185, 6504], [7167, 6513], [7149, 6562], [7124, 6576], [7122, 6589], [7097, 6615], [7087, 6617], [7058, 6646], [7051, 6660], [7058, 6671], [7078, 6660], [7119, 6659], [7142, 6635], [7143, 6625], [7185, 6598], [7209, 6568], [7223, 6572], [7241, 6567], [7239, 6554], [7266, 6549], [7266, 6534], [7282, 6536], [7283, 6519], [7328, 6541], [7317, 6526], [7314, 6533], [7291, 6521], [7303, 6512], [7294, 6495], [7318, 6491], [7328, 6508], [7333, 6500], [7321, 6486], [7326, 6451], [7336, 6438]]], [[[7788, 6262], [7810, 6261], [7826, 6253], [7840, 6258], [7849, 6252], [7868, 6265], [7931, 6266], [7952, 6275], [7976, 6284], [7972, 6272], [7960, 6274], [7932, 6260], [7904, 6255], [7892, 6262], [7834, 6245], [7779, 6245], [7763, 6249], [7788, 6262]]], [[[7581, 6263], [7566, 6258], [7536, 6260], [7501, 6267], [7454, 6282], [7438, 6276], [7411, 6286], [7384, 6288], [7385, 6301], [7353, 6306], [7371, 6333], [7398, 6327], [7400, 6332], [7431, 6320], [7439, 6322], [7446, 6307], [7501, 6302], [7514, 6318], [7548, 6303], [7602, 6304], [7621, 6297], [7645, 6305], [7623, 6295], [7607, 6301], [7591, 6293], [7567, 6295], [7568, 6285], [7584, 6277], [7605, 6282], [7618, 6268], [7640, 6269], [7655, 6260], [7640, 6249], [7618, 6264], [7622, 6248], [7581, 6263]]], [[[7865, 6375], [7843, 6373], [7839, 6345], [7835, 6364], [7825, 6369], [7829, 6386], [7808, 6402], [7813, 6424], [7804, 6429], [7787, 6419], [7793, 6411], [7794, 6370], [7791, 6344], [7769, 6340], [7762, 6348], [7770, 6379], [7761, 6405], [7750, 6401], [7745, 6421], [7762, 6448], [7762, 6470], [7773, 6487], [7775, 6512], [7783, 6527], [7798, 6528], [7808, 6545], [7825, 6538], [7894, 6530], [7917, 6540], [7933, 6556], [7926, 6534], [7909, 6517], [7877, 6515], [7872, 6520], [7834, 6518], [7792, 6519], [7781, 6499], [7784, 6486], [7801, 6464], [7813, 6464], [7831, 6491], [7843, 6497], [7846, 6483], [7883, 6483], [7876, 6464], [7887, 6455], [7866, 6459], [7861, 6473], [7831, 6449], [7820, 6453], [7849, 6420], [7848, 6398], [7860, 6385], [7876, 6388], [7865, 6375]]], [[[8004, 6518], [7999, 6541], [8005, 6556], [8021, 6572], [8034, 6582], [8031, 6565], [8017, 6555], [8011, 6529], [8030, 6550], [8037, 6536], [8026, 6532], [8042, 6512], [8016, 6519], [8014, 6505], [8030, 6479], [8018, 6484], [7999, 6506], [8004, 6518]]], [[[7710, 6627], [7715, 6612], [7711, 6595], [7725, 6571], [7718, 6560], [7752, 6533], [7746, 6529], [7717, 6529], [7707, 6508], [7706, 6490], [7694, 6470], [7675, 6454], [7681, 6440], [7671, 6417], [7673, 6391], [7664, 6398], [7623, 6383], [7619, 6403], [7594, 6404], [7576, 6420], [7564, 6405], [7541, 6401], [7538, 6423], [7506, 6415], [7495, 6417], [7482, 6473], [7472, 6467], [7459, 6498], [7466, 6505], [7455, 6515], [7453, 6530], [7460, 6551], [7476, 6566], [7482, 6546], [7503, 6530], [7522, 6537], [7541, 6535], [7551, 6548], [7576, 6550], [7594, 6541], [7619, 6547], [7628, 6571], [7640, 6579], [7636, 6588], [7648, 6594], [7650, 6619], [7659, 6634], [7699, 6633], [7710, 6627]]]] } }, { "type": "Feature", "id": "MU", "properties": { "hc-group": "admin0", "hc-middle-x": 0.62, "hc-middle-y": 0.58, "hc-key": "mu", "hc-a2": "MU", "name": "Mauritius", "labelrank": "5", "country-abbrev": "Mus.", "subregion": "Eastern Africa", "region-wb": "Sub-Saharan Africa", "iso-a3": "MUS", "iso-a2": "MU", "woe-id": "23424894", "continent": "Seven seas (open ocean)" }, "geometry": { "type": "Polygon", "coordinates": [[[5947, 5909], [5946, 5898], [5938, 5897], [5942, 5912], [5947, 5909]]] } }, { "type": "Feature", "id": "SE", "properties": { "hc-group": "admin0", "hc-middle-x": 0.68, "hc-middle-y": 0.19, "hc-key": "se", "hc-a2": "SE", "name": "Sweden", "labelrank": "3", "country-abbrev": "Swe.", "subregion": "Northern Europe", "region-wb": "Europe & Central Asia", "iso-a3": "SWE", "iso-a2": "SE", "woe-id": "23424954", "continent": "Europe" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[4809, 8426], [4806, 8405], [4787, 8385], [4781, 8409], [4792, 8422], [4809, 8426]]], [[[4960, 8786], [4929, 8781], [4907, 8788], [4908, 8774], [4892, 8772], [4887, 8760], [4868, 8738], [4881, 8720], [4860, 8693], [4828, 8672], [4816, 8674], [4809, 8660], [4797, 8659], [4792, 8646], [4770, 8626], [4762, 8631], [4760, 8594], [4754, 8583], [4754, 8561], [4767, 8540], [4776, 8543], [4793, 8524], [4810, 8512], [4790, 8479], [4742, 8456], [4747, 8451], [4732, 8426], [4740, 8408], [4732, 8388], [4740, 8383], [4751, 8397], [4731, 8355], [4726, 8369], [4715, 8350], [4707, 8355], [4681, 8352], [4666, 8339], [4671, 8326], [4639, 8319], [4616, 8357], [4627, 8373], [4613, 8384], [4603, 8407], [4588, 8428], [4575, 8472], [4585, 8473], [4596, 8484], [4592, 8498], [4617, 8522], [4619, 8540], [4609, 8560], [4622, 8563], [4627, 8578], [4606, 8594], [4611, 8617], [4604, 8633], [4608, 8652], [4601, 8666], [4606, 8680], [4622, 8697], [4638, 8703], [4659, 8699], [4664, 8720], [4650, 8726], [4675, 8762], [4679, 8787], [4676, 8801], [4704, 8808], [4702, 8819], [4731, 8847], [4723, 8865], [4743, 8890], [4758, 8899], [4775, 8893], [4783, 8902], [4783, 8921], [4809, 8920], [4835, 8912], [4844, 8918], [4847, 8941], [4855, 8947], [4898, 8918], [4920, 8914], [4940, 8888], [4938, 8868], [4948, 8865], [4942, 8852], [4955, 8835], [4944, 8816], [4960, 8786]]]] } }, { "type": "Feature", "id": "TT", "properties": { "hc-group": "admin0", "hc-middle-x": 0.64, "hc-middle-y": 0.61, "hc-key": "tt", "hc-a2": "TT", "name": "Trinidad and Tobago", "labelrank": "5", "country-abbrev": "Tr.T.", "subregion": "Caribbean", "region-wb": "Latin America & Caribbean", "iso-a3": "TTO", "iso-a2": "TT", "woe-id": "23424958", "continent": "North America" }, "geometry": { "type": "Polygon", "coordinates": [[[2455, 6823], [2452, 6803], [2425, 6800], [2439, 6808], [2441, 6822], [2462, 6837], [2455, 6823]]] } }, { "type": "Feature", "id": "SW", "properties": { "hc-group": "admin0", "hc-middle-x": 0.86, "hc-middle-y": 0.57, "hc-key": "sw", "hc-a2": "SW", "name": "Serranilla Bank", "labelrank": "5", "country-abbrev": "S.B.", "subregion": "Caribbean", "region-wb": "Latin America & Caribbean", "iso-a3": "-99", "iso-a2": "SW", "woe-id": "-99", "continent": "North America" }, "geometry": { "type": "Polygon", "coordinates": [[[1933, 6973], [1933, 6973], [1933, 6973], [1933, 6973]]] } }, { "type": "Feature", "id": "BS", "properties": { "hc-group": "admin0", "hc-middle-x": 0.12, "hc-middle-y": 0.35, "hc-key": "bs", "hc-a2": "BS", "name": "The Bahamas", "labelrank": "4", "country-abbrev": "Bhs.", "subregion": "Caribbean", "region-wb": "Latin America & Caribbean", "iso-a3": "BHS", "iso-a2": "BS", "woe-id": "23424758", "continent": "North America" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[1964, 7253], [1956, 7227], [1963, 7213], [1939, 7240], [1952, 7256], [1964, 7253]]], [[[2006, 7255], [2003, 7257], [2003, 7257], [2006, 7256], [2006, 7255], [2006, 7255], [2006, 7255]]], [[[2006, 7255], [2021, 7241], [2005, 7241], [2006, 7255], [2006, 7255], [2006, 7255]]], [[[2033, 7205], [2021, 7204], [2031, 7211], [2044, 7190], [2106, 7170], [2095, 7128], [2080, 7126], [2097, 7139], [2105, 7168], [2073, 7174], [2059, 7185], [2045, 7186], [2033, 7205]]], [[[2003, 7257], [1988, 7265], [1970, 7283], [1974, 7297], [1966, 7310], [1931, 7301], [1936, 7307], [1966, 7311], [1979, 7300], [1975, 7281], [1996, 7264], [2003, 7257], [2003, 7257]]]] } }, { "type": "Feature", "id": "PW", "properties": { "hc-group": "admin0", "hc-middle-x": 0.36, "hc-middle-y": 0.46, "hc-key": "pw", "hc-a2": "PW", "name": "Palau", "labelrank": "6", "country-abbrev": "Palau", "subregion": "Micronesia", "region-wb": "East Asia & Pacific", "iso-a3": "PLW", "iso-a2": "PW", "woe-id": "23424927", "continent": "Oceania" }, "geometry": { "type": "Polygon", "coordinates": [[[8209, 6720], [8208, 6724], [8210, 6728], [8213, 6728], [8209, 6720]]] } }, { "type": "Feature", "id": "EC", "properties": { "hc-group": "admin0", "hc-middle-x": 0.75, "hc-middle-y": 0.17, "hc-key": "ec", "hc-a2": "EC", "name": "Ecuador", "labelrank": "3", "country-abbrev": "Ecu.", "subregion": "South America", "region-wb": "Latin America & Caribbean", "iso-a3": "ECU", "iso-a2": "EC", "woe-id": "23424801", "continent": "South America" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[1574, 6495], [1620, 6483], [1609, 6478], [1593, 6486], [1557, 6475], [1574, 6495]]], [[[1883, 6406], [1894, 6412], [1866, 6437], [1871, 6444], [1866, 6474], [1877, 6479], [1878, 6494], [1891, 6507], [1891, 6530], [1922, 6538], [1927, 6547], [1948, 6532], [1961, 6529], [1969, 6517], [1998, 6513], [2001, 6519], [2032, 6502], [2021, 6502], [2032, 6490], [2023, 6461], [1990, 6430], [1956, 6418], [1941, 6405], [1932, 6372], [1920, 6358], [1907, 6373], [1879, 6388], [1888, 6392], [1883, 6406]]]] } }, { "type": "Feature", "id": "AU", "properties": { "hc-group": "admin0", "hc-middle-x": 0.53, "hc-middle-y": 0.41, "hc-key": "au", "hc-a2": "AU", "name": "Australia", "labelrank": "2", "country-abbrev": "Auz.", "subregion": "Australia and New Zealand", "region-wb": "East Asia & Pacific", "iso-a3": "AUS", "iso-a2": "AU", "woe-id": "-90", "continent": "Oceania" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[8300, 5418], [8313, 5412], [8295, 5401], [8273, 5402], [8270, 5411], [8300, 5418]]], [[[8094, 6158], [8077, 6158], [8087, 6175], [8112, 6176], [8121, 6168], [8105, 6155], [8094, 6158]]], [[[8593, 5163], [8572, 5139], [8548, 5143], [8525, 5176], [8523, 5199], [8506, 5233], [8514, 5254], [8515, 5242], [8559, 5227], [8600, 5236], [8611, 5247], [8599, 5272], [8615, 5269], [8615, 5193], [8608, 5194], [8605, 5154], [8593, 5163]]], [[[8547, 5968], [8557, 5961], [8555, 5946], [8580, 5930], [8589, 5932], [8596, 5918], [8622, 5911], [8625, 5895], [8642, 5879], [8653, 5844], [8689, 5830], [8687, 5815], [8707, 5789], [8717, 5789], [8743, 5751], [8764, 5758], [8755, 5733], [8759, 5694], [8769, 5683], [8766, 5662], [8771, 5636], [8753, 5577], [8751, 5552], [8739, 5530], [8739, 5521], [8719, 5507], [8692, 5459], [8687, 5431], [8669, 5407], [8662, 5372], [8664, 5353], [8649, 5343], [8615, 5342], [8594, 5333], [8561, 5310], [8559, 5297], [8541, 5314], [8516, 5319], [8517, 5340], [8474, 5307], [8441, 5324], [8419, 5323], [8381, 5340], [8363, 5364], [8366, 5383], [8348, 5414], [8341, 5419], [8317, 5415], [8327, 5446], [8314, 5466], [8302, 5431], [8277, 5429], [8283, 5440], [8295, 5440], [8295, 5465], [8312, 5498], [8295, 5498], [8288, 5482], [8270, 5473], [8251, 5452], [8253, 5438], [8235, 5449], [8229, 5474], [8213, 5496], [8202, 5498], [8202, 5514], [8183, 5532], [8168, 5529], [8158, 5537], [8142, 5535], [8110, 5553], [8046, 5546], [7996, 5527], [7963, 5528], [7903, 5499], [7885, 5472], [7826, 5476], [7781, 5473], [7760, 5453], [7747, 5455], [7734, 5440], [7713, 5436], [7682, 5435], [7663, 5442], [7652, 5455], [7638, 5458], [7634, 5486], [7642, 5482], [7654, 5494], [7654, 5547], [7633, 5593], [7633, 5617], [7620, 5647], [7610, 5661], [7605, 5686], [7584, 5715], [7575, 5743], [7592, 5709], [7599, 5708], [7588, 5736], [7602, 5728], [7608, 5713], [7612, 5732], [7596, 5754], [7587, 5788], [7597, 5805], [7594, 5833], [7605, 5855], [7610, 5835], [7624, 5856], [7652, 5871], [7646, 5891], [7662, 5880], [7688, 5896], [7703, 5890], [7726, 5901], [7747, 5904], [7758, 5913], [7769, 5910], [7809, 5923], [7826, 5941], [7835, 5959], [7850, 5968], [7845, 5995], [7868, 6016], [7886, 5987], [7885, 6014], [7891, 6025], [7911, 6023], [7912, 6054], [7926, 6053], [7933, 6070], [7962, 6090], [7976, 6086], [7980, 6099], [7998, 6096], [8022, 6072], [8019, 6059], [8033, 6071], [8070, 6067], [8057, 6081], [8080, 6125], [8105, 6147], [8136, 6143], [8155, 6148], [8153, 6163], [8128, 6173], [8152, 6181], [8170, 6161], [8188, 6161], [8225, 6145], [8249, 6157], [8253, 6139], [8266, 6154], [8280, 6142], [8271, 6124], [8249, 6113], [8249, 6101], [8280, 6099], [8265, 6087], [8250, 6094], [8234, 6072], [8237, 6065], [8268, 6042], [8304, 6026], [8317, 6012], [8342, 6006], [8359, 6021], [8345, 6000], [8370, 5982], [8395, 5990], [8412, 6031], [8419, 6063], [8415, 6079], [8417, 6137], [8427, 6149], [8438, 6204], [8455, 6171], [8461, 6143], [8471, 6134], [8474, 6100], [8486, 6078], [8502, 6088], [8508, 6076], [8528, 6065], [8529, 6020], [8551, 5984], [8547, 5968]]]] } }, { "type": "Feature", "id": "TV", "properties": { "hc-group": "admin0", "hc-middle-x": 0.52, "hc-middle-y": 0.49, "hc-key": "tv", "hc-a2": "TV", "name": "Tuvalu", "labelrank": "6", "country-abbrev": "Tuv.", "subregion": "Polynesia", "region-wb": "East Asia & Pacific", "iso-a3": "TUV", "iso-a2": "TV", "woe-id": "23424970", "continent": "Oceania" }, "geometry": { "type": "Polygon", "coordinates": [[[9525, 6255], [9524, 6257], [9525, 6255], [9525, 6255]]] } }, { "type": "Feature", "id": "MH", "properties": { "hc-group": "admin0", "hc-middle-x": 0.49, "hc-middle-y": 0.60, "hc-key": "mh", "hc-a2": "MH", "name": "Marshall Islands", "labelrank": "6", "country-abbrev": "M. Is.", "subregion": "Micronesia", "region-wb": "East Asia & Pacific", "iso-a3": "MHL", "iso-a2": "MH", "woe-id": "23424932", "continent": "Oceania" }, "geometry": { "type": "Polygon", "coordinates": [[[9285, 6714], [9290, 6712], [9291, 6712], [9289, 6712], [9285, 6714]]] } }, { "type": "Feature", "id": "CL", "properties": { "hc-group": "admin0", "hc-middle-x": 0.41, "hc-middle-y": 0.93, "hc-key": "cl", "hc-a2": "CL", "name": "Chile", "labelrank": "2", "country-abbrev": "Chile", "subregion": "South America", "region-wb": "Latin America & Caribbean", "iso-a3": "CHL", "iso-a2": "CL", "woe-id": "23424782", "continent": "South America" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[2286, 4697], [2274, 4692], [2261, 4699], [2244, 4696], [2236, 4709], [2267, 4709], [2286, 4697]]], [[[2139, 4743], [2157, 4742], [2153, 4731], [2123, 4742], [2130, 4752], [2139, 4743]]], [[[2022, 4950], [2027, 4957], [2023, 4976], [2030, 4979], [2037, 4962], [2038, 4943], [2022, 4950]]], [[[2085, 4774], [2061, 4788], [2085, 4781], [2124, 4754], [2103, 4741], [2085, 4743], [2091, 4758], [2075, 4765], [2085, 4774]]], [[[2080, 5184], [2084, 5167], [2077, 5148], [2047, 5138], [2063, 5161], [2067, 5205], [2082, 5205], [2088, 5188], [2080, 5184]]], [[[2077, 5127], [2071, 5109], [2080, 5103], [2070, 5059], [2070, 5081], [2059, 5090], [2064, 5098], [2047, 5102], [2077, 5127]]], [[[2190, 4704], [2194, 4711], [2233, 4708], [2228, 4699], [2247, 4681], [2265, 4682], [2270, 4670], [2252, 4669], [2239, 4684], [2218, 4688], [2215, 4695], [2186, 4699], [2190, 4704]]], [[[2228, 4801], [2227, 4714], [2225, 4715], [2227, 4714], [2227, 4712], [2227, 4710], [2169, 4715], [2178, 4709], [2159, 4703], [2153, 4718], [2127, 4720], [2136, 4730], [2159, 4727], [2161, 4753], [2173, 4764], [2176, 4739], [2217, 4729], [2185, 4743], [2182, 4754], [2206, 4766], [2206, 4772], [2180, 4768], [2175, 4786], [2195, 4795], [2204, 4808], [2212, 4799], [2228, 4801]]], [[[2176, 5963], [2188, 5965], [2191, 5981], [2202, 5988], [2212, 5969], [2217, 5944], [2231, 5929], [2223, 5910], [2229, 5886], [2240, 5873], [2250, 5825], [2270, 5826], [2275, 5820], [2265, 5788], [2239, 5777], [2229, 5765], [2235, 5755], [2228, 5745], [2234, 5721], [2229, 5710], [2236, 5694], [2222, 5692], [2211, 5666], [2197, 5651], [2186, 5621], [2190, 5590], [2182, 5589], [2170, 5550], [2182, 5520], [2192, 5462], [2180, 5451], [2176, 5431], [2176, 5402], [2156, 5387], [2152, 5375], [2152, 5346], [2161, 5313], [2145, 5304], [2142, 5281], [2130, 5243], [2130, 5211], [2136, 5195], [2127, 5193], [2124, 5162], [2136, 5155], [2130, 5146], [2138, 5129], [2133, 5112], [2152, 5111], [2148, 5098], [2127, 5099], [2149, 5079], [2134, 5063], [2137, 5028], [2132, 5011], [2112, 4983], [2120, 4967], [2111, 4950], [2082, 4922], [2083, 4898], [2094, 4875], [2119, 4879], [2121, 4856], [2115, 4844], [2131, 4826], [2189, 4826], [2233, 4812], [2213, 4818], [2166, 4797], [2157, 4754], [2139, 4753], [2120, 4763], [2120, 4777], [2146, 4781], [2153, 4794], [2115, 4779], [2118, 4765], [2093, 4777], [2081, 4796], [2057, 4821], [2078, 4816], [2057, 4832], [2038, 4826], [2043, 4841], [2076, 4824], [2063, 4837], [2075, 4844], [2061, 4867], [2053, 4851], [2033, 4846], [2052, 4859], [2037, 4873], [2055, 4874], [2050, 4886], [2061, 4876], [2062, 4887], [2049, 4896], [2059, 4900], [2057, 4916], [2057, 4913], [2044, 4903], [2041, 4887], [2026, 4874], [2028, 4897], [2040, 4908], [2022, 4918], [2041, 4941], [2033, 4985], [2045, 4987], [2054, 4954], [2056, 4926], [2058, 4957], [2051, 4979], [2062, 4987], [2088, 4971], [2083, 4987], [2054, 4988], [2054, 5001], [2067, 5012], [2062, 5025], [2049, 5021], [2019, 5030], [2042, 5050], [2059, 5085], [2056, 5061], [2071, 5051], [2078, 5074], [2090, 5093], [2085, 5103], [2101, 5141], [2096, 5146], [2106, 5162], [2104, 5189], [2116, 5192], [2102, 5201], [2110, 5208], [2076, 5207], [2071, 5234], [2078, 5268], [2092, 5285], [2079, 5346], [2082, 5365], [2093, 5365], [2109, 5418], [2121, 5433], [2127, 5465], [2139, 5485], [2146, 5524], [2138, 5563], [2139, 5593], [2149, 5603], [2142, 5634], [2160, 5676], [2174, 5748], [2170, 5767], [2170, 5817], [2178, 5823], [2185, 5868], [2181, 5887], [2184, 5910], [2176, 5963]]]] } }, { "type": "Feature", "id": "KI", "properties": { "hc-group": "admin0", "hc-middle-x": 0.29, "hc-middle-y": 0.58, "hc-key": "ki", "hc-a2": "KI", "name": "Kiribati", "labelrank": "6", "country-abbrev": "Kir.", "subregion": "Micronesia", "region-wb": "East Asia & Pacific", "iso-a3": "KIR", "iso-a2": "KI", "woe-id": "23424867", "continent": "Oceania" }, "geometry": { "type": "Polygon", "coordinates": [[[-387, 6564], [-385, 6560], [-382, 6555], [-387, 6559], [-387, 6564]]] } }, { "type": "Feature", "id": "PH", "properties": { "hc-group": "admin0", "hc-middle-x": 0.43, "hc-middle-y": 0.16, "hc-key": "ph", "hc-a2": "PH", "name": "Philippines", "labelrank": "2", "country-abbrev": "Phil.", "subregion": "South-Eastern Asia", "region-wb": "East Asia & Pacific", "iso-a3": "PHL", "iso-a2": "PH", "woe-id": "23424934", "continent": "Asia" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[7823, 6680], [7809, 6678], [7806, 6666], [7775, 6655], [7805, 6672], [7807, 6680], [7829, 6700], [7823, 6680]]], [[[7884, 6775], [7871, 6770], [7852, 6794], [7866, 6802], [7864, 6814], [7876, 6828], [7887, 6823], [7874, 6787], [7884, 6775]]], [[[7896, 6796], [7916, 6799], [7908, 6787], [7879, 6784], [7882, 6800], [7901, 6836], [7900, 6813], [7889, 6800], [7896, 6796]]], [[[7789, 6908], [7817, 6901], [7827, 6890], [7818, 6864], [7789, 6908]]], [[[7909, 6848], [7918, 6837], [7930, 6850], [7911, 6864], [7907, 6874], [7933, 6875], [7943, 6865], [7945, 6836], [7930, 6836], [7938, 6797], [7929, 6810], [7922, 6803], [7922, 6823], [7911, 6826], [7909, 6848]]], [[[7841, 6854], [7858, 6844], [7875, 6842], [7858, 6819], [7839, 6811], [7843, 6848], [7841, 6854], [7841, 6854], [7841, 6854]]], [[[7906, 6722], [7890, 6734], [7864, 6719], [7855, 6731], [7844, 6707], [7838, 6710], [7849, 6740], [7867, 6744], [7872, 6755], [7892, 6758], [7895, 6744], [7911, 6758], [7921, 6754], [7922, 6771], [7932, 6764], [7944, 6770], [7943, 6802], [7963, 6792], [7956, 6784], [7972, 6746], [7976, 6718], [7964, 6690], [7952, 6721], [7944, 6711], [7948, 6679], [7940, 6668], [7906, 6686], [7900, 6714], [7906, 6722]]], [[[7758, 6826], [7775, 6840], [7781, 6851], [7778, 6867], [7792, 6860], [7767, 6827], [7773, 6814], [7745, 6795], [7737, 6778], [7700, 6750], [7702, 6759], [7723, 6776], [7747, 6804], [7760, 6814], [7758, 6826]]], [[[7856, 6916], [7858, 6893], [7832, 6916], [7823, 6907], [7800, 6912], [7798, 6923], [7810, 6932], [7784, 6941], [7775, 6975], [7776, 6988], [7790, 6978], [7791, 7024], [7799, 7054], [7814, 7057], [7839, 7046], [7847, 7053], [7845, 7026], [7856, 7010], [7847, 6987], [7828, 6975], [7822, 6956], [7836, 6949], [7832, 6923], [7847, 6915], [7854, 6928], [7872, 6917], [7891, 6915], [7904, 6903], [7901, 6874], [7891, 6876], [7901, 6850], [7882, 6864], [7875, 6856], [7879, 6888], [7875, 6901], [7856, 6916]]], [[[7841, 6854], [7839, 6856], [7838, 6867], [7841, 6854], [7841, 6854], [7841, 6854]]]] } }, { "type": "Feature", "id": "GD", "properties": { "hc-group": "admin0", "hc-middle-x": 0.61, "hc-middle-y": 0.59, "hc-key": "gd", "hc-a2": "GD", "name": "Grenada", "labelrank": "6", "country-abbrev": "Gren.", "subregion": "Caribbean", "region-wb": "Latin America & Caribbean", "iso-a3": "GRD", "iso-a2": "GD", "woe-id": "23424826", "continent": "North America" }, "geometry": { "type": "Polygon", "coordinates": [[[2434, 6859], [2430, 6859], [2432, 6865], [2434, 6863], [2434, 6859]]] } }, { "type": "Feature", "id": "EE", "properties": { "hc-group": "admin0", "hc-middle-x": 0.35, "hc-middle-y": 0.42, "hc-key": "ee", "hc-a2": "EE", "name": "Estonia", "labelrank": "6", "country-abbrev": "Est.", "subregion": "Northern Europe", "region-wb": "Europe & Central Asia", "iso-a3": "EST", "iso-a2": "EE", "woe-id": "23424805", "continent": "Europe" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[4912, 8460], [4898, 8471], [4913, 8477], [4927, 8466], [4915, 8455], [4932, 8453], [4916, 8440], [4892, 8441], [4893, 8451], [4912, 8460]]], [[[5078, 8489], [5073, 8488], [5075, 8487], [5075, 8487], [5075, 8487], [5075, 8487], [5073, 8486], [5069, 8485], [5068, 8480], [5066, 8477], [5064, 8473], [5042, 8464], [5062, 8430], [5059, 8422], [5054, 8410], [5028, 8410], [4992, 8433], [4964, 8424], [4970, 8445], [4958, 8441], [4941, 8454], [4939, 8482], [4955, 8490], [5006, 8502], [5038, 8494], [5073, 8494], [5076, 8492], [5078, 8489]]]] } }, { "type": "Feature", "id": "AG", "properties": { "hc-group": "admin0", "hc-middle-x": 0.50, "hc-middle-y": 0.40, "hc-key": "ag", "hc-a2": "AG", "name": "Antigua and Barbuda", "labelrank": "6", "country-abbrev": "Ant.B.", "subregion": "Caribbean", "region-wb": "Latin America & Caribbean", "iso-a3": "ATG", "iso-a2": "AG", "woe-id": "23424737", "continent": "North America" }, "geometry": { "type": "Polygon", "coordinates": [[[2429, 7011], [2432, 7009], [2427, 7007], [2426, 7010], [2429, 7011]]] } }, { "type": "Feature", "id": "ES", "properties": { "hc-group": "admin0", "hc-middle-x": 0.76, "hc-middle-y": 0.27, "hc-key": "es", "hc-a2": "ES", "name": "Spain", "labelrank": "2", "country-abbrev": "Sp.", "subregion": "Southern Europe", "region-wb": "Europe & Central Asia", "iso-a3": "ESP", "iso-a2": "ES", "woe-id": "23424950", "continent": "Europe" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[4350, 7734], [4338, 7718], [4318, 7729], [4342, 7742], [4350, 7734]]], [[[4306, 7828], [4305, 7829], [4306, 7830], [4307, 7828], [4306, 7828]]], [[[4161, 7584], [4162, 7583], [4161, 7582], [4161, 7584]]], [[[4089, 7604], [4092, 7603], [4091, 7602], [4090, 7603], [4089, 7604]]], [[[4090, 7611], [4083, 7607], [4067, 7617], [4057, 7639], [4030, 7647], [4026, 7659], [4041, 7675], [4031, 7689], [4043, 7709], [4026, 7732], [4041, 7732], [4048, 7755], [4044, 7778], [4065, 7798], [4055, 7810], [4007, 7806], [4006, 7818], [3990, 7812], [3994, 7823], [3975, 7845], [3979, 7855], [4003, 7863], [4016, 7875], [4035, 7868], [4088, 7868], [4119, 7862], [4143, 7867], [4186, 7858], [4195, 7862], [4204, 7851], [4247, 7837], [4267, 7842], [4290, 7834], [4293, 7828], [4298, 7830], [4309, 7825], [4342, 7828], [4343, 7811], [4309, 7787], [4277, 7779], [4239, 7726], [4242, 7711], [4255, 7699], [4233, 7686], [4227, 7661], [4199, 7653], [4186, 7631], [4118, 7631], [4095, 7620], [4091, 7611], [4090, 7611]]], [[[3745, 7350], [3745, 7350], [3744, 7350], [3744, 7350], [3744, 7350], [3745, 7350], [3745, 7350], [3745, 7350]]], [[[3745, 7350], [3750, 7358], [3774, 7365], [3794, 7351], [3789, 7338], [3764, 7351], [3745, 7350], [3745, 7350], [3745, 7350]]], [[[3744, 7350], [3738, 7349], [3723, 7361], [3722, 7373], [3744, 7350], [3744, 7350], [3744, 7350]]]] } }, { "type": "Feature", "id": "BB", "properties": { "hc-group": "admin0", "hc-middle-x": 0.16, "hc-middle-y": 0.56, "hc-key": "bb", "hc-a2": "BB", "name": "Barbados", "labelrank": "5", "country-abbrev": "Barb.", "subregion": "Caribbean", "region-wb": "Latin America & Caribbean", "iso-a3": "BRB", "iso-a2": "BB", "woe-id": "23424754", "continent": "North America" }, "geometry": { "type": "Polygon", "coordinates": [[[2496, 6889], [2493, 6890], [2493, 6898], [2498, 6891], [2496, 6889]]] } }, { "type": "Feature", "id": "IT", "properties": { "hc-group": "admin0", "hc-middle-x": 0.46, "hc-middle-y": 0.46, "hc-key": "it", "hc-a2": "IT", "name": "Italy", "labelrank": "2", "country-abbrev": "Italy", "subregion": "Southern Europe", "region-wb": "Europe & Central Asia", "iso-a3": "ITA", "iso-a2": "IT", "woe-id": "23424853", "continent": "Europe" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[4695, 7647], [4692, 7629], [4675, 7633], [4614, 7668], [4624, 7680], [4654, 7673], [4705, 7684], [4693, 7657], [4695, 7647]]], [[[4497, 7754], [4490, 7773], [4506, 7775], [4520, 7787], [4537, 7761], [4530, 7713], [4515, 7716], [4501, 7705], [4495, 7721], [4497, 7754]]], [[[4469, 7876], [4475, 7887], [4450, 7897], [4456, 7909], [4443, 7924], [4457, 7929], [4448, 7950], [4455, 7954], [4479, 7953], [4486, 7966], [4508, 7959], [4510, 7950], [4526, 7975], [4542, 7970], [4555, 7976], [4556, 7988], [4572, 7985], [4581, 7993], [4605, 7993], [4613, 7982], [4652, 7976], [4642, 7967], [4652, 7942], [4647, 7949], [4608, 7931], [4617, 7919], [4610, 7914], [4612, 7893], [4649, 7867], [4663, 7834], [4693, 7810], [4720, 7811], [4720, 7793], [4778, 7765], [4793, 7747], [4789, 7736], [4774, 7753], [4750, 7761], [4737, 7746], [4734, 7732], [4753, 7722], [4752, 7705], [4735, 7699], [4736, 7689], [4722, 7672], [4709, 7673], [4715, 7697], [4725, 7700], [4719, 7723], [4708, 7745], [4687, 7751], [4682, 7766], [4663, 7772], [4652, 7786], [4632, 7786], [4596, 7814], [4591, 7823], [4558, 7845], [4559, 7853], [4546, 7884], [4505, 7899], [4489, 7882], [4469, 7876]], [[4615, 7809], [4615, 7809], [4615, 7809], [4615, 7809], [4615, 7809]], [[4615, 7880], [4616, 7883], [4614, 7883], [4613, 7881], [4615, 7880]]]] } }, { "type": "Feature", "id": "MT", "properties": { "hc-group": "admin0", "hc-middle-x": 0.48, "hc-middle-y": 0.53, "hc-key": "mt", "hc-a2": "MT", "name": "Malta", "labelrank": "5", "country-abbrev": "Malta", "subregion": "Southern Europe", "region-wb": "Middle East & North Africa", "iso-a3": "MLT", "iso-a2": "MT", "woe-id": "23424897", "continent": "Europe" }, "geometry": { "type": "Polygon", "coordinates": [[[4670, 7608], [4675, 7604], [4676, 7600], [4670, 7603], [4670, 7608]]] } }, { "type": "Feature", "id": "MV", "properties": { "hc-group": "admin0", "hc-middle-x": 0.67, "hc-middle-y": 0.59, "hc-key": "mv", "hc-a2": "MV", "name": "Maldives", "labelrank": "5", "country-abbrev": "Mald.", "subregion": "Southern Asia", "region-wb": "South Asia", "iso-a3": "MDV", "iso-a2": "MV", "woe-id": "23424899", "continent": "Seven seas (open ocean)" }, "geometry": { "type": "Polygon", "coordinates": [[[6414, 6567], [6412, 6559], [6408, 6558], [6405, 6561], [6414, 6567]]] } }, { "type": "Feature", "id": "SP", "properties": { "hc-group": "admin0", "hc-middle-x": 0.56, "hc-middle-y": 0.51, "hc-key": "sp", "hc-a2": "SP", "name": "Spratly Islands", "labelrank": "6", "country-abbrev": "Spratly Is.", "subregion": "South-Eastern Asia", "region-wb": "East Asia & Pacific", "iso-a3": "-99", "iso-a2": "SP", "woe-id": "23424921", "continent": "Asia" }, "geometry": { "type": "Polygon", "coordinates": [[[7658, 6820], [7658, 6820], [7658, 6820], [7658, 6820], [7658, 6820]]] } }, { "type": "Feature", "id": "PG", "properties": { "hc-group": "admin0", "hc-middle-x": 0.12, "hc-middle-y": 0.44, "hc-key": "pg", "hc-a2": "PG", "name": "Papua New Guinea", "labelrank": "2", "country-abbrev": "P.N.G.", "subregion": "Melanesia", "region-wb": "East Asia & Pacific", "iso-a3": "PNG", "iso-a2": "PG", "woe-id": "23424926", "continent": "Oceania" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[8801, 6345], [8812, 6343], [8839, 6314], [8833, 6304], [8805, 6331], [8801, 6345]]], [[[8678, 6427], [8689, 6430], [8714, 6415], [8722, 6428], [8725, 6410], [8757, 6380], [8750, 6363], [8744, 6383], [8732, 6401], [8697, 6422], [8678, 6427]]], [[[8399, 6238], [8399, 6303], [8399, 6429], [8431, 6416], [8474, 6405], [8488, 6394], [8503, 6393], [8541, 6363], [8539, 6346], [8589, 6331], [8601, 6309], [8576, 6308], [8582, 6287], [8609, 6269], [8622, 6240], [8639, 6242], [8642, 6227], [8665, 6222], [8671, 6235], [8687, 6229], [8701, 6206], [8675, 6201], [8691, 6195], [8671, 6191], [8657, 6202], [8605, 6207], [8578, 6228], [8549, 6268], [8540, 6273], [8503, 6277], [8481, 6283], [8470, 6242], [8448, 6232], [8399, 6238]]], [[[8678, 6321], [8654, 6321], [8615, 6340], [8580, 6346], [8595, 6349], [8606, 6342], [8664, 6346], [8683, 6342], [8715, 6364], [8710, 6383], [8735, 6378], [8732, 6361], [8723, 6360], [8726, 6345], [8678, 6321]]]] } }, { "type": "Feature", "id": "VU", "properties": { "hc-group": "admin0", "hc-middle-x": 0.27, "hc-middle-y": 0.35, "hc-key": "vu", "hc-a2": "VU", "name": "Vanuatu", "labelrank": "4", "country-abbrev": "Van.", "subregion": "Melanesia", "region-wb": "East Asia & Pacific", "iso-a3": "VUT", "iso-a2": "VU", "woe-id": "23424907", "continent": "Oceania" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[9190, 6049], [9198, 6058], [9204, 6024], [9202, 6012], [9212, 6006], [9200, 5981], [9200, 6031], [9190, 6049]]], [[[9177, 6087], [9168, 6065], [9178, 6030], [9190, 6019], [9180, 6016], [9169, 6031], [9170, 6047], [9154, 6052], [9177, 6087]]]] } }, { "type": "Feature", "id": "SG", "properties": { "hc-group": "admin0", "hc-middle-x": 0.51, "hc-middle-y": 0.58, "hc-key": "sg", "hc-a2": "SG", "name": "Singapore", "labelrank": "6", "country-abbrev": "Sing.", "subregion": "South-Eastern Asia", "region-wb": "East Asia & Pacific", "iso-a3": "SGP", "iso-a2": "SG", "woe-id": "23424948", "continent": "Asia" }, "geometry": { "type": "Polygon", "coordinates": [[[7306, 6547], [7310, 6546], [7306, 6542], [7300, 6543], [7306, 6547]]] } }, { "type": "Feature", "id": "GB", "properties": { "hc-group": "admin0", "hc-middle-x": 0.62, "hc-middle-y": 0.07, "hc-key": "gb", "hc-a2": "GB", "name": "United Kingdom", "labelrank": "2", "country-abbrev": "U.K.", "subregion": "Northern Europe", "region-wb": "Europe & Central Asia", "iso-a3": "GBR", "iso-a2": "GB", "woe-id": "-90", "continent": "Europe" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[4063, 8385], [4048, 8407], [4062, 8417], [4074, 8398], [4063, 8385]]], [[[4039, 8415], [4029, 8398], [4026, 8413], [4047, 8427], [4041, 8441], [4064, 8452], [4061, 8432], [4039, 8415]]], [[[2494, 4852], [2503, 4850], [2485, 4828], [2464, 4817], [2445, 4831], [2466, 4826], [2467, 4845], [2494, 4852]]], [[[3127, 4746], [3169, 4742], [3195, 4716], [3185, 4710], [3175, 4724], [3127, 4746]]], [[[2490, 4814], [2497, 4832], [2511, 4840], [2513, 4854], [2530, 4845], [2543, 4850], [2548, 4838], [2490, 4814]]], [[[5246, 7572], [5245, 7571], [5243, 7573], [5243, 7573], [5243, 7573], [5243, 7573], [5243, 7573], [5242, 7573], [5242, 7573], [5240, 7572], [5240, 7573], [5240, 7574], [5240, 7574], [5240, 7574], [5242, 7574], [5246, 7576], [5246, 7575], [5243, 7575], [5246, 7572]], [[5242, 7573], [5242, 7574], [5242, 7574], [5242, 7573], [5242, 7573]]], [[[4091, 7611], [4091, 7610], [4090, 7611], [4091, 7611]]], [[[5220, 7561], [5217, 7562], [5213, 7562], [5215, 7563], [5220, 7561]]], [[[5246, 7576], [5246, 7576], [5246, 7576], [5246, 7576], [5246, 7576]]], [[[4035, 8308], [4069, 8313], [4085, 8291], [4070, 8266], [4064, 8268], [4053, 8266], [4041, 8281], [4033, 8269], [4007, 8283], [4026, 8294], [4035, 8308]]], [[[4076, 8377], [4083, 8400], [4077, 8423], [4101, 8457], [4111, 8454], [4148, 8458], [4150, 8479], [4165, 8484], [4174, 8477], [4165, 8468], [4153, 8443], [4128, 8428], [4137, 8423], [4123, 8409], [4145, 8418], [4191, 8417], [4196, 8408], [4174, 8370], [4172, 8358], [4155, 8348], [4185, 8343], [4200, 8329], [4203, 8312], [4216, 8289], [4232, 8283], [4246, 8269], [4258, 8227], [4248, 8219], [4286, 8221], [4300, 8204], [4295, 8188], [4277, 8177], [4274, 8167], [4290, 8161], [4288, 8150], [4256, 8135], [4243, 8139], [4209, 8129], [4209, 8138], [4176, 8129], [4164, 8135], [4145, 8128], [4141, 8115], [4108, 8119], [4095, 8105], [4088, 8114], [4107, 8130], [4126, 8154], [4159, 8153], [4169, 8169], [4144, 8161], [4119, 8175], [4103, 8169], [4092, 8181], [4125, 8195], [4127, 8221], [4114, 8240], [4126, 8233], [4154, 8239], [4166, 8269], [4153, 8269], [4141, 8285], [4148, 8300], [4120, 8297], [4120, 8281], [4115, 8293], [4097, 8299], [4112, 8325], [4095, 8342], [4078, 8318], [4083, 8336], [4079, 8349], [4071, 8333], [4058, 8339], [4081, 8355], [4082, 8363], [4062, 8357], [4066, 8368], [4054, 8373], [4076, 8377]]]] } }, { "type": "Feature", "id": "CY", "properties": { "hc-group": "admin0", "hc-middle-x": 0.39, "hc-middle-y": 0.51, "hc-key": "cy", "hc-a2": "CY", "name": "Cyprus", "labelrank": "5", "country-abbrev": "Cyp.", "subregion": "Western Asia", "region-wb": "Europe & Central Asia", "iso-a3": "CYP", "iso-a2": "CY", "woe-id": "-90", "continent": "Asia" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[5242, 7573], [5242, 7573], [5242, 7574], [5242, 7574], [5242, 7573]]], [[[5242, 7573], [5243, 7573], [5243, 7573], [5243, 7573], [5243, 7573], [5242, 7573]]], [[[5250, 7575], [5252, 7572], [5246, 7572], [5243, 7575], [5246, 7575], [5247, 7575], [5250, 7575]]], [[[5240, 7572], [5238, 7567], [5220, 7561], [5215, 7563], [5213, 7562], [5199, 7577], [5208, 7579], [5209, 7578], [5210, 7580], [5211, 7579], [5211, 7579], [5212, 7579], [5212, 7579], [5212, 7579], [5212, 7579], [5232, 7579], [5240, 7573], [5240, 7572]]]] } }, { "type": "Feature", "id": "GR", "properties": { "hc-group": "admin0", "hc-middle-x": 0.30, "hc-middle-y": 0.66, "hc-key": "gr", "hc-a2": "GR", "name": "Greece", "labelrank": "3", "country-abbrev": "Greece", "subregion": "Southern Europe", "region-wb": "Europe & Central Asia", "iso-a3": "GRC", "iso-a2": "GR", "woe-id": "23424833", "continent": "Europe" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[4948, 7581], [4946, 7590], [4963, 7585], [5007, 7584], [5021, 7575], [4977, 7571], [4976, 7577], [4948, 7581]]], [[[4867, 7767], [4870, 7769], [4867, 7767], [4865, 7769], [4865, 7770], [4867, 7772], [4870, 7773], [4893, 7781], [4917, 7783], [4923, 7789], [4970, 7797], [4993, 7786], [5017, 7790], [5023, 7803], [5032, 7791], [5015, 7768], [5002, 7757], [4994, 7735], [4986, 7737], [5000, 7773], [4985, 7778], [4978, 7764], [4971, 7776], [4946, 7767], [4953, 7756], [4935, 7750], [4920, 7760], [4913, 7745], [4935, 7715], [4919, 7701], [4952, 7685], [4931, 7703], [4957, 7697], [4970, 7701], [4960, 7688], [4977, 7674], [4966, 7673], [4953, 7684], [4957, 7666], [4965, 7664], [4976, 7641], [5008, 7644], [5016, 7662], [5013, 7686], [5019, 7709], [5010, 7717], [5024, 7722], [5031, 7709], [5018, 7684], [5037, 7662], [5040, 7643], [5040, 7643], [5031, 7665], [5015, 7658], [5014, 7638], [4975, 7638], [4963, 7658], [4945, 7672], [4932, 7673], [4932, 7653], [4917, 7659], [4931, 7621], [4918, 7634], [4911, 7622], [4900, 7641], [4887, 7632], [4883, 7659], [4870, 7669], [4861, 7662], [4852, 7678], [4854, 7698], [4871, 7708], [4841, 7717], [4826, 7734], [4837, 7732], [4849, 7737], [4867, 7767]]], [[[5040, 7643], [5040, 7643], [5040, 7643], [5040, 7643], [5040, 7643], [5040, 7643], [5040, 7643]]], [[[5040, 7643], [5054, 7636], [5048, 7627], [5064, 7612], [5079, 7622], [5066, 7603], [5045, 7593], [5065, 7609], [5047, 7626], [5040, 7643], [5040, 7643], [5040, 7643]]]] } }, { "type": "Feature", "id": "KM", "properties": { "hc-group": "admin0", "hc-middle-x": 0.37, "hc-middle-y": 0.51, "hc-key": "km", "hc-a2": "KM", "name": "Comoros", "labelrank": "6", "country-abbrev": "Com.", "subregion": "Eastern Africa", "region-wb": "Sub-Saharan Africa", "iso-a3": "COM", "iso-a2": "KM", "woe-id": "23424786", "continent": "Africa" }, "geometry": { "type": "Polygon", "coordinates": [[[5528, 6155], [5522, 6158], [5522, 6171], [5526, 6170], [5528, 6155]]] } }, { "type": "Feature", "id": "FJ", "properties": { "hc-group": "admin0", "hc-middle-x": 0.23, "hc-middle-y": 0.67, "hc-key": "fj", "hc-a2": "FJ", "name": "Fiji", "labelrank": "6", "country-abbrev": "Fiji", "subregion": "Melanesia", "region-wb": "East Asia & Pacific", "iso-a3": "FJI", "iso-a2": "FJ", "woe-id": "23424813", "continent": "Oceania" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[9465, 6000], [9475, 5988], [9495, 5994], [9511, 5981], [9502, 5969], [9504, 5942], [9495, 5943], [9493, 5965], [9469, 5970], [9472, 5981], [9465, 6000]]], [[[9533, 6012], [9526, 6012], [9510, 6003], [9506, 6014], [9541, 6028], [9533, 6012], [9533, 6012], [9533, 6012]]], [[[9533, 6012], [9550, 6012], [9533, 6012], [9533, 6012], [9533, 6012], [9533, 6012]]]] } }, { "type": "Feature", "id": "RU", "properties": { "hc-group": "admin0", "hc-middle-x": 0.58, "hc-middle-y": 0.56, "hc-key": "ru", "hc-a2": "RU", "name": "Russia", "labelrank": "2", "country-abbrev": "Rus.", "subregion": "Eastern Europe", "region-wb": "Europe & Central Asia", "iso-a3": "RUS", "iso-a2": "RU", "woe-id": "23424936", "continent": "Europe" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[8832, 8138], [8853, 8140], [8838, 8116], [8819, 8109], [8806, 8080], [8795, 8074], [8819, 8115], [8833, 8123], [8832, 8138]]], [[[8282, 8301], [8300, 8313], [8315, 8305], [8303, 8289], [8282, 8301]]], [[[9236, 8985], [9220, 8975], [9187, 8989], [9202, 8999], [9236, 8991], [9236, 8985]]], [[[6538, 9122], [6513, 9122], [6533, 9141], [6556, 9133], [6538, 9122]]], [[[6343, 9181], [6358, 9174], [6305, 9163], [6308, 9184], [6323, 9189], [6345, 9187], [6343, 9181]]], [[[8386, 9213], [8377, 9231], [8396, 9234], [8401, 9218], [8386, 9213]]], [[[7586, 9239], [7569, 9223], [7551, 9226], [7530, 9238], [7546, 9249], [7584, 9246], [7586, 9239]]], [[[6679, 9336], [6669, 9328], [6663, 9287], [6648, 9299], [6661, 9307], [6655, 9330], [6679, 9336]]], [[[7082, 9380], [7082, 9374], [7055, 9377], [7072, 9400], [7053, 9397], [7090, 9411], [7080, 9397], [7082, 9380]]], [[[6012, 9604], [6013, 9592], [5980, 9584], [5963, 9588], [6012, 9604]]], [[[5727, 9592], [5750, 9599], [5762, 9586], [5722, 9590], [5706, 9603], [5727, 9607], [5727, 9592]]], [[[5929, 9615], [5925, 9596], [5888, 9599], [5897, 9615], [5929, 9615]]], [[[5819, 9619], [5834, 9611], [5823, 9604], [5798, 9604], [5785, 9611], [5819, 9619]]], [[[5993, 9615], [5958, 9610], [5968, 9603], [5939, 9601], [5934, 9618], [5925, 9625], [5969, 9624], [5993, 9615]]], [[[5853, 9622], [5864, 9628], [5881, 9610], [5870, 9607], [5868, 9623], [5854, 9617], [5832, 9624], [5835, 9633], [5853, 9622]]], [[[5913, 9646], [5924, 9637], [5892, 9635], [5838, 9648], [5870, 9654], [5913, 9646]]], [[[6053, 9659], [6044, 9655], [6017, 9661], [6033, 9667], [6064, 9668], [6053, 9659]]], [[[5952, 9662], [5975, 9663], [5960, 9651], [5985, 9647], [5968, 9643], [5901, 9667], [5952, 9662]]], [[[5883, 9661], [5898, 9663], [5946, 9648], [5928, 9639], [5917, 9647], [5891, 9650], [5877, 9659], [5850, 9661], [5857, 9669], [5883, 9661]]], [[[6153, 9675], [6169, 9670], [6175, 9655], [6145, 9642], [6107, 9638], [6089, 9650], [6107, 9658], [6134, 9659], [6141, 9672], [6153, 9675]]], [[[5953, 9677], [5947, 9670], [5892, 9673], [5881, 9683], [5913, 9678], [5907, 9687], [5953, 9681], [5953, 9677]]], [[[5976, 9687], [6010, 9680], [6007, 9672], [5986, 9674], [5987, 9680], [5965, 9687], [5919, 9692], [5949, 9700], [5976, 9687]]], [[[5968, 9704], [5955, 9718], [5992, 9721], [5996, 9713], [5965, 9711], [5968, 9704]]], [[[6934, 9588], [6931, 9595], [6950, 9596], [7008, 9587], [7006, 9581], [6975, 9570], [6960, 9579], [6930, 9582], [6934, 9588]]], [[[6046, 9650], [6076, 9652], [6076, 9634], [6045, 9619], [6024, 9626], [6006, 9621], [5992, 9628], [6000, 9647], [6046, 9650]]], [[[9598, 9052], [9567, 9046], [9548, 9050], [9514, 9041], [9507, 9053], [9516, 9064], [9556, 9083], [9595, 9080], [9623, 9064], [9598, 9052]]], [[[8379, 9183], [8403, 9211], [8430, 9213], [8470, 9192], [8475, 9174], [8464, 9171], [8379, 9183]]], [[[5648, 9650], [5670, 9649], [5683, 9633], [5655, 9644], [5632, 9629], [5605, 9622], [5605, 9630], [5588, 9627], [5576, 9636], [5630, 9643], [5648, 9650]]], [[[8134, 7928], [8145, 7903], [8159, 7922], [8167, 7924], [8184, 7962], [8191, 7966], [8198, 8003], [8216, 8020], [8205, 8045], [8167, 8035], [8150, 8020], [8106, 8019], [8096, 8033], [8100, 8043], [8061, 8084], [8040, 8090], [8020, 8089], [8002, 8100], [8004, 8115], [7985, 8148], [7985, 8161], [7971, 8184], [7974, 8190], [7950, 8223], [7932, 8232], [7911, 8233], [7888, 8246], [7850, 8244], [7807, 8235], [7782, 8214], [7803, 8206], [7804, 8189], [7784, 8171], [7756, 8121], [7761, 8110], [7741, 8105], [7715, 8088], [7684, 8100], [7670, 8107], [7645, 8103], [7613, 8117], [7581, 8100], [7576, 8091], [7526, 8082], [7508, 8074], [7462, 8082], [7444, 8081], [7426, 8094], [7426, 8104], [7405, 8107], [7388, 8119], [7349, 8125], [7300, 8112], [7261, 8128], [7257, 8158], [7207, 8174], [7193, 8174], [7160, 8189], [7135, 8163], [7128, 8145], [7142, 8127], [7137, 8109], [7113, 8096], [7071, 8107], [7061, 8102], [7034, 8107], [7023, 8128], [6976, 8133], [6966, 8139], [6887, 8103], [6889, 8095], [6865, 8085], [6844, 8085], [6834, 8075], [6819, 8072], [6798, 8091], [6785, 8086], [6759, 8091], [6750, 8110], [6745, 8111], [6729, 8117], [6716, 8140], [6705, 8145], [6676, 8134], [6647, 8135], [6645, 8144], [6624, 8157], [6616, 8150], [6604, 8139], [6592, 8157], [6541, 8235], [6501, 8263], [6505, 8270], [6511, 8283], [6440, 8251], [6410, 8241], [6413, 8262], [6386, 8270], [6371, 8269], [6344, 8268], [6344, 8294], [6333, 8317], [6315, 8310], [6278, 8323], [6255, 8303], [6191, 8289], [6175, 8290], [6168, 8278], [6132, 8276], [6106, 8268], [6090, 8266], [6069, 8263], [6062, 8262], [6050, 8265], [6044, 8249], [6050, 8235], [6076, 8224], [6046, 8221], [6035, 8211], [6045, 8198], [6019, 8180], [6037, 8170], [6064, 8155], [6055, 8137], [6036, 8132], [6015, 8140], [6008, 8127], [5983, 8133], [5979, 8137], [5965, 8151], [5947, 8141], [5931, 8149], [5912, 8148], [5887, 8127], [5857, 8146], [5852, 8140], [5819, 8165], [5794, 8164], [5789, 8175], [5773, 8164], [5737, 8170], [5731, 8158], [5703, 8149], [5703, 8139], [5693, 8135], [5681, 8129], [5687, 8107], [5674, 8099], [5671, 8102], [5648, 8124], [5629, 8100], [5625, 8081], [5633, 8076], [5617, 8046], [5634, 8041], [5635, 8024], [5663, 8022], [5691, 7985], [5675, 7981], [5682, 7977], [5683, 7976], [5698, 7969], [5667, 7947], [5650, 7946], [5638, 7919], [5623, 7900], [5639, 7892], [5650, 7875], [5646, 7849], [5678, 7807], [5678, 7807], [5672, 7798], [5658, 7785], [5640, 7788], [5624, 7807], [5615, 7809], [5591, 7821], [5594, 7831], [5577, 7837], [5569, 7840], [5542, 7832], [5538, 7839], [5497, 7856], [5472, 7856], [5445, 7867], [5425, 7862], [5396, 7889], [5372, 7899], [5363, 7909], [5326, 7927], [5359, 7931], [5355, 7944], [5366, 7958], [5383, 7961], [5359, 7981], [5404, 7994], [5404, 8003], [5373, 7997], [5377, 8016], [5391, 8025], [5419, 8024], [5426, 8041], [5416, 8069], [5430, 8078], [5402, 8101], [5372, 8109], [5367, 8103], [5350, 8123], [5326, 8115], [5299, 8120], [5282, 8152], [5255, 8155], [5252, 8182], [5243, 8198], [5201, 8197], [5183, 8188], [5178, 8197], [5173, 8232], [5193, 8227], [5212, 8242], [5204, 8252], [5183, 8256], [5185, 8266], [5170, 8273], [5166, 8289], [5154, 8296], [5161, 8306], [5158, 8329], [5113, 8344], [5096, 8343], [5077, 8352], [5076, 8368], [5062, 8381], [5068, 8400], [5054, 8410], [5059, 8422], [5062, 8430], [5076, 8424], [5066, 8450], [5064, 8473], [5066, 8477], [5068, 8480], [5071, 8485], [5073, 8486], [5075, 8487], [5075, 8487], [5075, 8487], [5075, 8487], [5075, 8487], [5078, 8489], [5076, 8492], [5073, 8494], [5075, 8508], [5101, 8509], [5107, 8517], [5137, 8512], [5127, 8524], [5102, 8526], [5093, 8550], [5067, 8541], [5108, 8572], [5150, 8615], [5168, 8629], [5178, 8648], [5168, 8661], [5131, 8687], [5146, 8698], [5148, 8709], [5132, 8718], [5133, 8736], [5119, 8746], [5127, 8756], [5123, 8777], [5134, 8778], [5129, 8800], [5105, 8836], [5105, 8843], [5129, 8869], [5132, 8878], [5111, 8898], [5092, 8904], [5086, 8922], [5101, 8947], [5112, 8960], [5129, 8964], [5140, 8978], [5157, 8973], [5156, 8987], [5185, 8981], [5192, 8996], [5223, 8980], [5195, 8979], [5206, 8972], [5235, 8968], [5228, 8957], [5256, 8967], [5269, 8958], [5307, 8954], [5358, 8931], [5380, 8912], [5426, 8895], [5456, 8879], [5466, 8845], [5439, 8815], [5407, 8801], [5365, 8799], [5334, 8809], [5290, 8815], [5273, 8825], [5234, 8831], [5198, 8850], [5218, 8821], [5264, 8800], [5276, 8780], [5262, 8764], [5277, 8740], [5300, 8755], [5316, 8754], [5321, 8742], [5338, 8755], [5368, 8739], [5413, 8725], [5437, 8743], [5417, 8766], [5421, 8776], [5449, 8794], [5465, 8798], [5502, 8833], [5501, 8814], [5522, 8816], [5549, 8789], [5547, 8810], [5558, 8828], [5552, 8848], [5538, 8853], [5551, 8907], [5524, 8925], [5582, 8922], [5601, 8917], [5618, 8901], [5624, 8886], [5583, 8880], [5572, 8860], [5591, 8852], [5598, 8838], [5620, 8835], [5653, 8844], [5656, 8872], [5684, 8880], [5733, 8905], [5755, 8920], [5786, 8924], [5783, 8913], [5801, 8918], [5788, 8926], [5821, 8941], [5839, 8937], [5830, 8928], [5838, 8912], [5864, 8904], [5866, 8914], [5896, 8927], [5936, 8923], [5955, 8938], [5982, 8945], [5987, 8958], [5998, 8933], [5989, 8915], [6005, 8911], [6008, 8928], [6028, 8931], [6041, 8942], [6019, 8975], [6029, 8983], [6002, 8983], [5998, 8992], [5973, 9002], [5971, 9015], [5986, 9023], [5996, 9016], [6029, 8993], [6029, 8983], [6037, 8990], [6092, 8984], [6136, 8974], [6183, 8949], [6221, 8939], [6258, 8911], [6259, 8904], [6277, 8927], [6283, 8942], [6265, 8944], [6251, 8971], [6230, 8978], [6224, 8964], [6215, 8977], [6217, 8997], [6230, 9036], [6225, 9042], [6205, 9034], [6219, 9067], [6249, 9080], [6264, 9096], [6279, 9145], [6297, 9154], [6355, 9156], [6393, 9145], [6394, 9120], [6374, 9084], [6363, 9080], [6388, 9057], [6391, 9020], [6381, 9012], [6388, 8989], [6383, 8979], [6385, 8942], [6416, 8920], [6400, 8905], [6402, 8881], [6386, 8875], [6375, 8852], [6354, 8838], [6356, 8827], [6329, 8820], [6312, 8829], [6310, 8819], [6283, 8825], [6320, 8811], [6343, 8813], [6368, 8806], [6383, 8825], [6412, 8835], [6423, 8844], [6424, 8859], [6448, 8878], [6448, 8903], [6437, 8914], [6440, 8930], [6462, 8939], [6497, 8945], [6525, 8921], [6519, 8882], [6546, 8871], [6574, 8874], [6530, 8882], [6531, 8901], [6550, 8908], [6536, 8926], [6535, 8939], [6508, 8952], [6471, 8959], [6460, 8951], [6420, 8955], [6424, 8967], [6413, 8984], [6419, 9007], [6436, 9025], [6414, 9065], [6398, 9073], [6413, 9096], [6454, 9111], [6457, 9142], [6446, 9160], [6466, 9151], [6477, 9136], [6478, 9119], [6465, 9103], [6472, 9080], [6463, 9073], [6486, 9064], [6538, 9059], [6558, 9045], [6553, 9065], [6535, 9066], [6495, 9081], [6486, 9100], [6514, 9108], [6532, 9096], [6548, 9099], [6543, 9112], [6529, 9109], [6548, 9127], [6575, 9126], [6574, 9147], [6562, 9153], [6578, 9167], [6590, 9157], [6586, 9127], [6655, 9089], [6688, 9094], [6701, 9088], [6693, 9073], [6671, 9066], [6674, 9040], [6688, 9051], [6698, 9014], [6715, 9023], [6696, 9064], [6710, 9084], [6703, 9097], [6668, 9111], [6668, 9121], [6639, 9125], [6624, 9136], [6628, 9157], [6612, 9179], [6628, 9194], [6661, 9199], [6732, 9202], [6727, 9217], [6679, 9228], [6733, 9221], [6738, 9204], [6763, 9202], [6769, 9208], [6812, 9211], [6803, 9195], [6828, 9208], [6817, 9210], [6788, 9243], [6804, 9243], [6786, 9254], [6784, 9246], [6762, 9262], [6808, 9254], [6808, 9267], [6789, 9268], [6831, 9279], [6872, 9303], [6897, 9311], [7003, 9328], [6987, 9341], [7033, 9340], [7044, 9352], [7079, 9351], [7101, 9358], [7113, 9379], [7105, 9351], [7071, 9345], [7088, 9329], [7129, 9336], [7131, 9344], [7155, 9349], [7185, 9339], [7179, 9353], [7159, 9368], [7178, 9365], [7218, 9369], [7229, 9383], [7220, 9396], [7256, 9423], [7288, 9439], [7332, 9442], [7350, 9432], [7365, 9433], [7380, 9417], [7363, 9421], [7345, 9410], [7320, 9406], [7363, 9405], [7406, 9398], [7412, 9392], [7382, 9367], [7423, 9369], [7426, 9381], [7467, 9383], [7489, 9379], [7520, 9382], [7531, 9374], [7561, 9374], [7564, 9350], [7586, 9349], [7592, 9329], [7601, 9328], [7596, 9312], [7562, 9327], [7569, 9312], [7594, 9307], [7593, 9293], [7572, 9276], [7550, 9269], [7485, 9238], [7484, 9230], [7457, 9219], [7430, 9197], [7403, 9196], [7388, 9179], [7376, 9179], [7354, 9148], [7376, 9160], [7380, 9172], [7420, 9171], [7513, 9200], [7473, 9205], [7488, 9219], [7557, 9201], [7578, 9212], [7588, 9195], [7579, 9187], [7592, 9175], [7590, 9190], [7646, 9202], [7715, 9194], [7736, 9195], [7736, 9173], [7768, 9164], [7782, 9171], [7788, 9160], [7868, 9155], [7886, 9173], [7877, 9183], [7887, 9202], [7898, 9197], [7916, 9213], [7920, 9201], [7969, 9184], [7989, 9192], [8018, 9189], [8016, 9181], [8043, 9173], [8059, 9163], [8059, 9151], [8035, 9132], [8050, 9132], [8062, 9119], [8044, 9109], [8013, 9129], [8069, 9059], [8102, 9039], [8121, 9045], [8151, 9099], [8183, 9075], [8208, 9071], [8224, 9080], [8252, 9085], [8296, 9070], [8318, 9066], [8283, 9080], [8334, 9086], [8346, 9073], [8371, 9077], [8358, 9102], [8366, 9115], [8346, 9114], [8357, 9133], [8387, 9133], [8403, 9138], [8388, 9155], [8416, 9148], [8529, 9136], [8570, 9124], [8528, 9125], [8516, 9130], [8500, 9115], [8519, 9120], [8574, 9123], [8546, 9098], [8524, 9097], [8528, 9087], [8551, 9096], [8582, 9124], [8618, 9123], [8653, 9114], [8667, 9101], [8656, 9093], [8646, 9100], [8635, 9089], [8663, 9087], [8661, 9076], [8683, 9079], [8712, 9067], [8730, 9044], [8772, 9043], [8789, 9049], [8839, 9056], [8888, 9055], [8916, 9049], [8950, 9033], [8979, 9045], [8954, 9028], [8962, 9012], [8950, 8992], [8968, 8979], [8986, 8979], [8991, 8968], [9015, 8979], [9078, 8986], [9101, 8975], [9126, 8976], [9163, 8971], [9189, 8986], [9202, 8974], [9203, 8958], [9233, 8950], [9242, 8934], [9280, 8945], [9280, 8961], [9271, 8977], [9271, 9004], [9372, 8991], [9416, 8990], [9500, 8971], [9547, 8945], [9582, 8933], [9586, 8922], [9615, 8912], [9651, 8889], [9687, 8877], [9690, 8861], [9702, 8859], [9698, 8846], [9712, 8821], [9711, 8808], [9724, 8818], [9724, 8842], [9707, 8848], [9792, 8841], [9802, 8828], [9838, 8801], [9851, 8801], [9827, 8788], [9826, 8776], [9808, 8780], [9805, 8771], [9778, 8772], [9781, 8749], [9767, 8743], [9782, 8734], [9765, 8731], [9777, 8718], [9736, 8714], [9703, 8737], [9683, 8735], [9670, 8746], [9668, 8766], [9637, 8776], [9624, 8768], [9591, 8771], [9578, 8797], [9555, 8800], [9556, 8784], [9569, 8777], [9558, 8753], [9533, 8738], [9495, 8730], [9468, 8739], [9431, 8743], [9452, 8726], [9474, 8735], [9473, 8719], [9489, 8709], [9497, 8716], [9508, 8696], [9507, 8671], [9527, 8662], [9536, 8639], [9517, 8623], [9469, 8633], [9409, 8612], [9386, 8598], [9372, 8598], [9313, 8555], [9277, 8539], [9265, 8515], [9252, 8519], [9231, 8542], [9197, 8542], [9167, 8531], [9139, 8509], [9147, 8538], [9110, 8521], [9101, 8508], [9091, 8522], [9066, 8519], [9052, 8495], [9055, 8477], [9070, 8468], [9093, 8484], [9095, 8467], [9082, 8466], [9062, 8449], [9049, 8472], [9030, 8458], [9018, 8434], [9033, 8420], [9039, 8429], [9057, 8418], [9042, 8404], [9041, 8378], [9054, 8377], [9058, 8353], [9049, 8346], [9035, 8357], [9022, 8351], [9011, 8330], [9022, 8299], [9010, 8285], [8981, 8286], [8961, 8271], [8954, 8245], [8961, 8228], [8948, 8234], [8919, 8220], [8909, 8183], [8862, 8141], [8854, 8193], [8845, 8221], [8828, 8316], [8831, 8343], [8843, 8378], [8861, 8390], [8871, 8406], [8865, 8420], [8885, 8422], [8930, 8448], [8955, 8479], [9015, 8526], [9016, 8535], [9044, 8550], [9070, 8558], [9062, 8561], [9078, 8577], [9081, 8618], [9093, 8627], [9113, 8624], [9094, 8637], [9055, 8630], [9058, 8621], [9047, 8597], [9049, 8584], [9030, 8592], [9018, 8578], [8964, 8542], [8972, 8563], [8954, 8558], [8952, 8572], [8967, 8586], [8969, 8604], [8945, 8592], [8940, 8601], [8884, 8596], [8861, 8585], [8861, 8571], [8836, 8549], [8810, 8533], [8789, 8511], [8785, 8495], [8811, 8495], [8818, 8481], [8797, 8483], [8784, 8475], [8764, 8484], [8750, 8470], [8733, 8476], [8705, 8467], [8685, 8479], [8687, 8494], [8653, 8506], [8630, 8496], [8634, 8484], [8603, 8490], [8592, 8483], [8556, 8491], [8485, 8492], [8437, 8479], [8417, 8457], [8397, 8447], [8385, 8424], [8331, 8387], [8309, 8361], [8275, 8332], [8229, 8300], [8245, 8287], [8278, 8288], [8273, 8256], [8285, 8256], [8284, 8270], [8309, 8283], [8291, 8266], [8305, 8262], [8292, 8245], [8309, 8247], [8328, 8264], [8333, 8277], [8364, 8276], [8378, 8260], [8412, 8230], [8403, 8223], [8412, 8182], [8397, 8169], [8383, 8128], [8390, 8109], [8375, 8048], [8352, 8027], [8327, 7993], [8314, 7965], [8249, 7898], [8227, 7866], [8191, 7844], [8169, 7837], [8143, 7844], [8144, 7859], [8127, 7854], [8096, 7823], [8095, 7826], [8091, 7831], [8088, 7839], [8108, 7845], [8113, 7862], [8113, 7886], [8103, 7914], [8134, 7928]]], [[[4866, 8316], [4853, 8303], [4873, 8302], [4874, 8315], [4920, 8300], [4918, 8278], [4916, 8278], [4830, 8282], [4849, 8292], [4826, 8282], [4826, 8283], [4826, 8283], [4838, 8303], [4864, 8316], [4866, 8316], [4866, 8316]]], [[[5724, 8951], [5706, 8934], [5679, 8931], [5668, 8941], [5670, 8960], [5685, 8971], [5699, 8972], [5725, 8959], [5724, 8951], [5724, 8951], [5724, 8951]]], [[[5874, 9183], [5868, 9186], [5839, 9182], [5854, 9196], [5827, 9204], [5862, 9217], [5879, 9244], [5905, 9246], [5883, 9256], [5908, 9260], [5894, 9267], [5917, 9273], [5893, 9277], [5891, 9286], [5910, 9281], [5928, 9300], [5948, 9296], [5943, 9307], [5961, 9312], [5977, 9330], [6007, 9332], [6023, 9343], [6047, 9342], [6046, 9353], [6063, 9355], [6085, 9348], [6134, 9356], [6180, 9372], [6184, 9378], [6219, 9395], [6238, 9399], [6264, 9396], [6278, 9385], [6278, 9371], [6260, 9358], [6225, 9343], [6124, 9314], [6104, 9312], [6055, 9296], [6020, 9268], [6011, 9255], [5994, 9256], [5990, 9244], [5961, 9252], [5977, 9232], [5963, 9229], [5948, 9202], [5919, 9175], [5892, 9179], [5910, 9174], [5901, 9149], [5889, 9149], [5879, 9122], [5882, 9100], [5900, 9065], [5928, 9044], [5945, 9036], [5930, 9024], [5898, 9028], [5880, 9037], [5872, 9027], [5853, 9039], [5817, 9044], [5823, 9055], [5845, 9057], [5826, 9062], [5816, 9076], [5805, 9071], [5815, 9059], [5809, 9049], [5787, 9066], [5801, 9073], [5765, 9082], [5762, 9098], [5775, 9114], [5791, 9110], [5802, 9141], [5797, 9153], [5818, 9154], [5813, 9170], [5866, 9185], [5874, 9183]]], [[[6968, 9552], [6968, 9553], [6972, 9553], [6972, 9552], [6968, 9552], [6968, 9552], [6968, 9552]]], [[[6968, 9552], [6976, 9531], [6963, 9535], [6964, 9551], [6968, 9552], [6968, 9552], [6968, 9552]]], [[[8573, 7902], [8602, 7928], [8624, 7938], [8648, 7941], [8671, 7963], [8681, 7965], [8654, 7942], [8597, 7920], [8575, 7899], [8563, 7898], [8574, 7877], [8567, 7873], [8556, 7894], [8541, 7882], [8550, 7902], [8573, 7902]]], [[[8467, 8230], [8463, 8179], [8474, 8155], [8482, 8119], [8496, 8078], [8466, 8083], [8445, 8031], [8470, 7976], [8443, 7980], [8432, 7953], [8424, 7979], [8431, 7995], [8428, 8016], [8435, 8029], [8425, 8060], [8434, 8110], [8430, 8127], [8437, 8148], [8420, 8174], [8419, 8199], [8427, 8225], [8422, 8239], [8438, 8239], [8453, 8252], [8439, 8275], [8451, 8281], [8459, 8270], [8455, 8257], [8467, 8230]]], [[[8587, 9303], [8618, 9302], [8624, 9289], [8639, 9292], [8690, 9284], [8683, 9270], [8641, 9262], [8611, 9265], [8549, 9291], [8558, 9311], [8570, 9298], [8587, 9303]]], [[[8364, 9330], [8399, 9314], [8401, 9340], [8417, 9337], [8410, 9347], [8445, 9328], [8486, 9326], [8529, 9307], [8509, 9302], [8514, 9294], [8498, 9279], [8455, 9285], [8444, 9299], [8459, 9319], [8439, 9320], [8432, 9308], [8448, 9282], [8479, 9273], [8440, 9266], [8435, 9277], [8403, 9272], [8372, 9266], [8355, 9273], [8341, 9256], [8308, 9267], [8286, 9285], [8278, 9298], [8293, 9297], [8284, 9320], [8299, 9323], [8295, 9334], [8338, 9350], [8364, 9330]]], [[[7228, 9473], [7194, 9458], [7171, 9463], [7224, 9528], [7224, 9534], [7246, 9550], [7259, 9541], [7260, 9554], [7279, 9548], [7263, 9514], [7277, 9528], [7305, 9535], [7325, 9516], [7345, 9513], [7350, 9493], [7333, 9482], [7302, 9477], [7228, 9473]]], [[[6972, 9553], [6980, 9554], [7021, 9577], [7036, 9580], [7025, 9590], [7045, 9599], [7089, 9599], [7122, 9604], [7136, 9596], [7131, 9585], [7145, 9584], [7150, 9596], [7169, 9595], [7193, 9580], [7195, 9571], [7184, 9563], [7180, 9543], [7165, 9544], [7187, 9532], [7191, 9523], [7175, 9514], [7127, 9513], [7098, 9525], [7046, 9528], [7027, 9541], [7025, 9557], [7008, 9561], [6980, 9551], [6972, 9552], [6972, 9553]]], [[[5622, 9613], [5667, 9615], [5644, 9622], [5674, 9631], [5695, 9627], [5709, 9635], [5691, 9645], [5727, 9656], [5731, 9662], [5736, 9672], [5749, 9649], [5770, 9638], [5748, 9628], [5712, 9625], [5715, 9619], [5686, 9618], [5694, 9605], [5676, 9605], [5652, 9597], [5659, 9609], [5635, 9603], [5622, 9613]]], [[[7068, 9681], [7103, 9654], [7126, 9649], [7132, 9640], [7110, 9636], [7110, 9608], [7031, 9601], [7023, 9595], [7007, 9592], [6943, 9612], [6955, 9624], [6979, 9627], [6994, 9646], [6972, 9645], [6988, 9660], [7042, 9670], [7048, 9679], [7068, 9681]]], [[[5724, 8951], [5727, 8953], [5723, 8943], [5724, 8951], [5724, 8951], [5724, 8951]]]] } }, { "type": "Feature", "id": "VA", "properties": { "hc-group": "admin0", "hc-middle-x": 0.61, "hc-middle-y": 0.44, "hc-key": "va", "hc-a2": "VA", "name": "Vatican", "labelrank": "6", "country-abbrev": "Vat.", "subregion": "Southern Europe", "region-wb": "Europe & Central Asia", "iso-a3": "VAT", "iso-a2": "VA", "woe-id": "23424986", "continent": "Europe" }, "geometry": { "type": "Polygon", "coordinates": [[[4615, 7809], [4615, 7809], [4615, 7809], [4615, 7809], [4615, 7809]]] } }, { "type": "Feature", "id": "SM", "properties": { "hc-group": "admin0", "hc-middle-x": 0.48, "hc-middle-y": 0.42, "hc-key": "sm", "hc-a2": "SM", "name": "San Marino", "labelrank": "6", "country-abbrev": "S.M.", "subregion": "Southern Europe", "region-wb": "Europe & Central Asia", "iso-a3": "SMR", "iso-a2": "SM", "woe-id": "23424947", "continent": "Europe" }, "geometry": { "type": "Polygon", "coordinates": [[[4615, 7880], [4613, 7881], [4614, 7883], [4616, 7883], [4615, 7880]]] } }, { "type": "Feature", "id": "AM", "properties": { "hc-group": "admin0", "hc-middle-x": 0.10, "hc-middle-y": 0.12, "hc-key": "am", "hc-a2": "AM", "name": "Armenia", "labelrank": "6", "country-abbrev": "Arm.", "subregion": "Western Asia", "region-wb": "Europe & Central Asia", "iso-a3": "ARM", "iso-a2": "AM", "woe-id": "23424743", "continent": "Asia" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[5587, 7764], [5587, 7765], [5590, 7765], [5588, 7764], [5587, 7764]]], [[[5618, 7704], [5614, 7706], [5607, 7704], [5596, 7727], [5566, 7733], [5557, 7742], [5534, 7747], [5536, 7766], [5527, 7781], [5549, 7786], [5573, 7788], [5591, 7773], [5584, 7766], [5602, 7751], [5592, 7744], [5614, 7721], [5618, 7704]], [[5574, 7779], [5574, 7780], [5572, 7780], [5574, 7778], [5574, 7779]], [[5580, 7777], [5579, 7778], [5578, 7777], [5579, 7777], [5580, 7777]]]] } }, { "type": "Feature", "id": "AZ", "properties": { "hc-group": "admin0", "hc-middle-x": 0.84, "hc-middle-y": 0.24, "hc-key": "az", "hc-a2": "AZ", "name": "Azerbaijan", "labelrank": "5", "country-abbrev": "Aze.", "subregion": "Western Asia", "region-wb": "Europe & Central Asia", "iso-a3": "AZE", "iso-a2": "AZ", "woe-id": "23424741", "continent": "Asia" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[5574, 7779], [5574, 7778], [5572, 7780], [5574, 7780], [5574, 7779]]], [[[5580, 7777], [5579, 7777], [5578, 7777], [5579, 7778], [5580, 7777]]], [[[5672, 7798], [5678, 7807], [5717, 7756], [5704, 7746], [5697, 7709], [5690, 7715], [5687, 7689], [5679, 7688], [5662, 7702], [5671, 7721], [5657, 7732], [5618, 7704], [5614, 7721], [5592, 7744], [5602, 7751], [5584, 7766], [5591, 7773], [5573, 7788], [5587, 7793], [5617, 7779], [5623, 7787], [5608, 7801], [5615, 7809], [5624, 7807], [5640, 7788], [5658, 7785], [5663, 7794], [5667, 7795], [5672, 7798]], [[5587, 7764], [5588, 7764], [5590, 7765], [5587, 7765], [5587, 7764]]], [[[5567, 7730], [5566, 7733], [5596, 7727], [5607, 7704], [5586, 7708], [5567, 7730]]]] } }, { "type": "Feature", "id": "LS", "properties": { "hc-group": "admin0", "hc-middle-x": 0.51, "hc-middle-y": 0.47, "hc-key": "ls", "hc-a2": "LS", "name": "Lesotho", "labelrank": "6", "country-abbrev": "Les.", "subregion": "Southern Africa", "region-wb": "Sub-Saharan Africa", "iso-a3": "LSO", "iso-a2": "LS", "woe-id": "23424880", "continent": "Africa" }, "geometry": { "type": "Polygon", "coordinates": [[[5084, 5644], [5091, 5646], [5115, 5621], [5106, 5603], [5079, 5592], [5075, 5579], [5065, 5581], [5044, 5612], [5065, 5635], [5084, 5644]]] } }, { "type": "Feature", "id": "TJ", "properties": { "hc-group": "admin0", "hc-middle-x": 0.49, "hc-middle-y": 0.50, "hc-key": "tj", "hc-a2": "TJ", "name": "Tajikistan", "labelrank": "4", "country-abbrev": "Tjk.", "subregion": "Central Asia", "region-wb": "Europe & Central Asia", "iso-a3": "TJK", "iso-a2": "TJ", "woe-id": "23424961", "continent": "Asia" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[6328, 7776], [6328, 7775], [6326, 7777], [6327, 7777], [6328, 7776]]], [[[6327, 7738], [6330, 7737], [6326, 7735], [6323, 7738], [6327, 7738]]], [[[6416, 7724], [6421, 7695], [6450, 7692], [6453, 7648], [6446, 7654], [6416, 7648], [6406, 7656], [6387, 7641], [6357, 7630], [6351, 7643], [6356, 7671], [6348, 7684], [6332, 7689], [6314, 7672], [6314, 7659], [6295, 7660], [6287, 7644], [6279, 7651], [6251, 7638], [6244, 7647], [6245, 7658], [6261, 7680], [6252, 7692], [6253, 7708], [6231, 7716], [6243, 7730], [6266, 7727], [6293, 7771], [6299, 7765], [6322, 7778], [6331, 7767], [6320, 7759], [6337, 7751], [6325, 7744], [6308, 7750], [6289, 7742], [6289, 7726], [6330, 7723], [6352, 7729], [6360, 7718], [6416, 7724]]]] } }, { "type": "Feature", "id": "ML", "properties": { "hc-group": "admin0", "hc-middle-x": 0.59, "hc-middle-y": 0.38, "hc-key": "ml", "hc-a2": "ML", "name": "Mali", "labelrank": "3", "country-abbrev": "Mali", "subregion": "Western Africa", "region-wb": "Sub-Saharan Africa", "iso-a3": "MLI", "iso-a2": "ML", "woe-id": "23424891", "continent": "Africa" }, "geometry": { "type": "Polygon", "coordinates": [[[4282, 7132], [4283, 7120], [4304, 7105], [4343, 7092], [4346, 7067], [4373, 7072], [4371, 6990], [4351, 6958], [4287, 6956], [4277, 6947], [4255, 6945], [4226, 6949], [4189, 6923], [4176, 6926], [4163, 6907], [4152, 6909], [4146, 6892], [4131, 6902], [4120, 6891], [4124, 6882], [4114, 6862], [4093, 6853], [4086, 6811], [4071, 6804], [4064, 6820], [4052, 6818], [4043, 6804], [4022, 6812], [4013, 6803], [4004, 6815], [4002, 6839], [3988, 6848], [3983, 6869], [3962, 6859], [3946, 6864], [3933, 6855], [3919, 6858], [3913, 6870], [3913, 6886], [3892, 6909], [3896, 6915], [3887, 6940], [3900, 6944], [3903, 6963], [3912, 6965], [3927, 6950], [3932, 6960], [3973, 6962], [4086, 6962], [4091, 6987], [4083, 6993], [4054, 7252], [4106, 7252], [4106, 7252], [4282, 7132]]] } }, { "type": "Feature", "id": "DZ", "properties": { "hc-group": "admin0", "hc-middle-x": 0.55, "hc-middle-y": 0.51, "hc-key": "dz", "hc-a2": "DZ", "name": "Algeria", "labelrank": "3", "country-abbrev": "Alg.", "subregion": "Northern Africa", "region-wb": "Middle East & North Africa", "iso-a3": "DZA", "iso-a2": "DZ", "woe-id": "23424740", "continent": "Africa" }, "geometry": { "type": "Polygon", "coordinates": [[[4282, 7132], [4106, 7252], [4106, 7252], [4106, 7252], [4086, 7265], [3993, 7324], [3993, 7336], [3993, 7368], [4024, 7391], [4079, 7398], [4119, 7426], [4141, 7433], [4136, 7453], [4140, 7463], [4165, 7468], [4174, 7479], [4211, 7477], [4217, 7492], [4199, 7515], [4196, 7565], [4183, 7576], [4196, 7578], [4213, 7592], [4252, 7608], [4279, 7623], [4326, 7627], [4335, 7634], [4389, 7637], [4402, 7629], [4431, 7637], [4452, 7637], [4466, 7643], [4481, 7635], [4501, 7638], [4496, 7628], [4491, 7562], [4468, 7537], [4476, 7514], [4486, 7510], [4493, 7493], [4514, 7477], [4528, 7417], [4522, 7414], [4537, 7382], [4536, 7355], [4541, 7342], [4534, 7324], [4538, 7299], [4525, 7287], [4542, 7264], [4544, 7248], [4554, 7236], [4564, 7238], [4589, 7229], [4601, 7206], [4468, 7125], [4420, 7082], [4373, 7072], [4346, 7067], [4343, 7092], [4304, 7105], [4283, 7120], [4282, 7132]]] } }, { "type": "Feature", "id": "CO", "properties": { "hc-group": "admin0", "hc-middle-x": 0.50, "hc-middle-y": 0.54, "hc-key": "co", "hc-a2": "CO", "name": "Colombia", "labelrank": "2", "country-abbrev": "Col.", "subregion": "South America", "region-wb": "Latin America & Caribbean", "iso-a3": "COL", "iso-a2": "CO", "woe-id": "23424787", "continent": "South America" }, "geometry": { "type": "Polygon", "coordinates": [[[1970, 6759], [1986, 6744], [1983, 6756], [2022, 6782], [2025, 6816], [2045, 6831], [2059, 6822], [2064, 6838], [2090, 6837], [2121, 6854], [2137, 6872], [2151, 6868], [2148, 6853], [2129, 6848], [2102, 6812], [2099, 6794], [2088, 6774], [2099, 6778], [2117, 6750], [2115, 6723], [2126, 6712], [2184, 6709], [2204, 6684], [2259, 6689], [2263, 6682], [2251, 6660], [2250, 6637], [2257, 6615], [2266, 6605], [2251, 6590], [2270, 6575], [2279, 6541], [2274, 6539], [2265, 6566], [2241, 6556], [2191, 6555], [2191, 6536], [2206, 6536], [2213, 6524], [2186, 6522], [2185, 6502], [2198, 6490], [2205, 6471], [2188, 6381], [2178, 6393], [2166, 6395], [2186, 6426], [2158, 6441], [2145, 6436], [2136, 6443], [2117, 6434], [2093, 6440], [2093, 6453], [2080, 6468], [2059, 6480], [2045, 6500], [2032, 6502], [2001, 6519], [1998, 6513], [1969, 6517], [1961, 6529], [1948, 6532], [1927, 6547], [1935, 6557], [1931, 6569], [1942, 6583], [1960, 6592], [1975, 6615], [1965, 6629], [1972, 6638], [1969, 6665], [1974, 6675], [1971, 6697], [1955, 6717], [1976, 6738], [1970, 6759]]] } }, { "type": "Feature", "id": "TW", "properties": { "hc-group": "admin0", "hc-middle-x": 0.43, "hc-middle-y": 0.48, "hc-key": "tw", "hc-a2": "TW", "name": "Taiwan", "labelrank": "3", "country-abbrev": "Taiwan", "subregion": "Eastern Asia", "region-wb": "East Asia & Pacific", "iso-a3": "TWN", "iso-a2": "TW", "woe-id": "23424971", "continent": "Asia" }, "geometry": { "type": "Polygon", "coordinates": [[[7785, 7201], [7787, 7214], [7812, 7254], [7828, 7261], [7835, 7246], [7823, 7195], [7809, 7175], [7806, 7156], [7791, 7175], [7785, 7201]]] } }, { "type": "Feature", "id": "UZ", "properties": { "hc-group": "admin0", "hc-middle-x": 0.46, "hc-middle-y": 0.53, "hc-key": "uz", "hc-a2": "UZ", "name": "Uzbekistan", "labelrank": "3", "country-abbrev": "Uzb.", "subregion": "Central Asia", "region-wb": "Europe & Central Asia", "iso-a3": "UZB", "iso-a2": "UZ", "woe-id": "23424980", "continent": "Asia" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[6361, 7739], [6358, 7741], [6361, 7742], [6362, 7742], [6361, 7739]]], [[[6344, 7744], [6345, 7739], [6340, 7742], [6338, 7748], [6344, 7744]]], [[[5998, 7925], [5991, 7911], [6012, 7892], [6016, 7914], [6045, 7898], [6074, 7865], [6109, 7871], [6145, 7868], [6161, 7873], [6185, 7844], [6194, 7848], [6192, 7813], [6206, 7812], [6212, 7785], [6248, 7785], [6250, 7771], [6268, 7764], [6267, 7775], [6281, 7790], [6337, 7821], [6346, 7820], [6314, 7798], [6344, 7781], [6361, 7793], [6373, 7778], [6401, 7770], [6378, 7764], [6358, 7748], [6337, 7751], [6320, 7759], [6331, 7767], [6322, 7778], [6299, 7765], [6293, 7771], [6266, 7727], [6243, 7730], [6231, 7716], [6253, 7708], [6252, 7692], [6261, 7680], [6245, 7658], [6244, 7647], [6228, 7647], [6207, 7653], [6208, 7675], [6180, 7682], [6142, 7707], [6136, 7707], [6087, 7743], [6070, 7782], [6027, 7786], [6018, 7791], [6016, 7820], [5999, 7823], [5974, 7840], [5960, 7835], [5945, 7818], [5933, 7823], [5928, 7810], [5927, 7786], [5896, 7789], [5896, 7920], [5973, 7940], [5963, 7917], [5965, 7899], [5977, 7910], [5978, 7937], [5998, 7925]], [[6328, 7776], [6327, 7777], [6326, 7777], [6328, 7775], [6328, 7776]]]] } }, { "type": "Feature", "id": "TZ", "properties": { "hc-group": "admin0", "hc-middle-x": 0.65, "hc-middle-y": 0.61, "hc-key": "tz", "hc-a2": "TZ", "name": "United Republic of Tanzania", "labelrank": "3", "country-abbrev": "Tanz.", "subregion": "Eastern Africa", "region-wb": "Sub-Saharan Africa", "iso-a3": "TZA", "iso-a2": "TZ", "woe-id": "23424973", "continent": "Africa" }, "geometry": { "type": "Polygon", "coordinates": [[[5278, 6165], [5277, 6167], [5276, 6170], [5276, 6170], [5276, 6170], [5273, 6172], [5271, 6174], [5271, 6175], [5270, 6175], [5263, 6213], [5258, 6220], [5255, 6223], [5255, 6223], [5254, 6224], [5252, 6226], [5252, 6226], [5252, 6226], [5248, 6225], [5247, 6220], [5232, 6223], [5217, 6229], [5190, 6239], [5166, 6253], [5149, 6285], [5148, 6301], [5124, 6322], [5130, 6332], [5119, 6362], [5121, 6375], [5132, 6380], [5156, 6418], [5144, 6422], [5148, 6435], [5156, 6437], [5156, 6459], [5145, 6474], [5156, 6476], [5184, 6476], [5184, 6474], [5185, 6476], [5186, 6476], [5180, 6437], [5185, 6426], [5201, 6434], [5226, 6432], [5244, 6440], [5237, 6447], [5239, 6462], [5251, 6474], [5357, 6416], [5355, 6402], [5402, 6368], [5390, 6329], [5392, 6319], [5410, 6304], [5405, 6262], [5415, 6236], [5417, 6213], [5439, 6198], [5426, 6188], [5381, 6170], [5363, 6173], [5350, 6161], [5332, 6165], [5314, 6161], [5303, 6170], [5278, 6165]]] } }, { "type": "Feature", "id": "AR", "properties": { "hc-group": "admin0", "hc-middle-x": 0.45, "hc-middle-y": 0.27, "hc-key": "ar", "hc-a2": "AR", "name": "Argentina", "labelrank": "2", "country-abbrev": "Arg.", "subregion": "South America", "region-wb": "Latin America & Caribbean", "iso-a3": "ARG", "iso-a2": "AR", "woe-id": "23424747", "continent": "South America" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[2227, 4714], [2229, 4711], [2227, 4710], [2227, 4712], [2227, 4714]]], [[[2227, 4714], [2227, 4790], [2228, 4801], [2238, 4789], [2233, 4774], [2267, 4744], [2291, 4727], [2309, 4720], [2330, 4720], [2344, 4710], [2289, 4704], [2275, 4710], [2227, 4714]]], [[[2552, 5594], [2538, 5553], [2535, 5521], [2536, 5503], [2536, 5501], [2533, 5501], [2529, 5501], [2524, 5461], [2536, 5445], [2555, 5437], [2566, 5421], [2563, 5398], [2579, 5390], [2580, 5375], [2555, 5341], [2552, 5331], [2509, 5313], [2456, 5303], [2422, 5304], [2419, 5274], [2408, 5257], [2422, 5252], [2413, 5237], [2390, 5227], [2370, 5227], [2338, 5243], [2329, 5232], [2332, 5198], [2349, 5189], [2369, 5195], [2375, 5171], [2361, 5166], [2351, 5180], [2334, 5170], [2351, 5163], [2325, 5138], [2328, 5113], [2314, 5101], [2317, 5089], [2299, 5091], [2279, 5082], [2266, 5068], [2257, 5048], [2263, 5033], [2282, 5017], [2306, 5014], [2313, 4998], [2306, 4978], [2272, 4954], [2259, 4941], [2251, 4905], [2220, 4891], [2212, 4866], [2218, 4840], [2233, 4812], [2189, 4826], [2131, 4826], [2115, 4844], [2121, 4856], [2119, 4879], [2094, 4875], [2083, 4898], [2082, 4922], [2111, 4950], [2120, 4967], [2112, 4983], [2132, 5011], [2137, 5028], [2134, 5063], [2149, 5079], [2127, 5099], [2148, 5098], [2152, 5111], [2133, 5112], [2138, 5129], [2130, 5146], [2136, 5155], [2124, 5162], [2127, 5193], [2136, 5195], [2130, 5211], [2130, 5243], [2142, 5281], [2145, 5304], [2161, 5313], [2152, 5346], [2152, 5375], [2156, 5387], [2176, 5402], [2176, 5431], [2180, 5451], [2192, 5462], [2182, 5520], [2170, 5550], [2182, 5589], [2190, 5590], [2186, 5621], [2197, 5651], [2211, 5666], [2222, 5692], [2236, 5694], [2229, 5710], [2234, 5721], [2228, 5745], [2235, 5755], [2229, 5765], [2239, 5777], [2265, 5788], [2275, 5820], [2270, 5826], [2298, 5857], [2312, 5848], [2347, 5845], [2354, 5825], [2365, 5851], [2399, 5851], [2404, 5844], [2424, 5819], [2452, 5795], [2481, 5789], [2517, 5765], [2548, 5753], [2554, 5744], [2535, 5719], [2523, 5686], [2540, 5687], [2565, 5680], [2596, 5686], [2607, 5682], [2616, 5696], [2635, 5707], [2641, 5740], [2661, 5739], [2668, 5720], [2663, 5690], [2632, 5676], [2606, 5657], [2587, 5631], [2552, 5594]]]] } }, { "type": "Feature", "id": "SA", "properties": { "hc-group": "admin0", "hc-middle-x": 0.43, "hc-middle-y": 0.49, "hc-key": "sa", "hc-a2": "SA", "name": "Saudi Arabia", "labelrank": "2", "country-abbrev": "Saud.", "subregion": "Western Asia", "region-wb": "Middle East & North Africa", "iso-a3": "SAU", "iso-a2": "SA", "woe-id": "23424938", "continent": "Asia" }, "geometry": { "type": "Polygon", "coordinates": [[[5674, 7364], [5687, 7334], [5724, 7305], [5725, 7275], [5744, 7244], [5749, 7239], [5756, 7240], [5758, 7230], [5767, 7229], [5767, 7223], [5796, 7188], [5871, 7178], [5873, 7181], [5886, 7159], [5867, 7098], [5779, 7068], [5695, 7056], [5666, 7042], [5645, 7010], [5631, 7006], [5623, 7016], [5578, 7020], [5519, 7017], [5520, 7000], [5508, 6988], [5501, 7004], [5478, 7002], [5495, 7012], [5494, 7021], [5476, 7035], [5462, 7059], [5454, 7083], [5441, 7097], [5415, 7112], [5399, 7138], [5395, 7157], [5399, 7176], [5380, 7214], [5353, 7229], [5342, 7247], [5344, 7258], [5323, 7272], [5329, 7276], [5315, 7303], [5285, 7348], [5268, 7349], [5277, 7389], [5309, 7384], [5330, 7406], [5351, 7410], [5366, 7426], [5336, 7458], [5395, 7475], [5401, 7479], [5438, 7472], [5487, 7445], [5564, 7385], [5618, 7381], [5645, 7378], [5652, 7363], [5674, 7364]]] } }, { "type": "Feature", "id": "NL", "properties": { "hc-group": "admin0", "hc-middle-x": 0.99, "hc-middle-y": 0.01, "hc-key": "nl", "hc-a2": "NL", "name": "Netherlands", "labelrank": "5", "country-abbrev": "Neth.", "subregion": "Western Europe", "region-wb": "Europe & Central Asia", "iso-a3": "NLD", "iso-a2": "NL", "woe-id": "-90", "continent": "Europe" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[2393, 7038], [2390, 7038], [2390, 7039], [2393, 7038]]], [[[4347, 8160], [4362, 8159], [4372, 8160], [4364, 8153], [4347, 8160]]], [[[4460, 8234], [4455, 8193], [4436, 8178], [4423, 8177], [4431, 8160], [4425, 8136], [4416, 8136], [4420, 8151], [4402, 8155], [4396, 8164], [4374, 8160], [4350, 8167], [4368, 8173], [4366, 8184], [4381, 8198], [4392, 8233], [4415, 8243], [4438, 8246], [4460, 8234]]]] } }, { "type": "Feature", "id": "YE", "properties": { "hc-group": "admin0", "hc-middle-x": 0.35, "hc-middle-y": 0.54, "hc-key": "ye", "hc-a2": "YE", "name": "Yemen", "labelrank": "3", "country-abbrev": "Yem.", "subregion": "Western Asia", "region-wb": "Middle East & North Africa", "iso-a3": "YEM", "iso-a2": "YE", "woe-id": "23425002", "continent": "Asia" }, "geometry": { "type": "Polygon", "coordinates": [[[5779, 7068], [5801, 7016], [5811, 6996], [5788, 6985], [5786, 6966], [5761, 6954], [5737, 6949], [5693, 6932], [5681, 6919], [5662, 6919], [5623, 6900], [5593, 6898], [5570, 6880], [5542, 6876], [5522, 6894], [5505, 6969], [5508, 6988], [5520, 7000], [5519, 7017], [5578, 7020], [5623, 7016], [5631, 7006], [5645, 7010], [5666, 7042], [5695, 7056], [5779, 7068]]] } }, { "type": "Feature", "id": "AE", "properties": { "hc-group": "admin0", "hc-middle-x": 0.59, "hc-middle-y": 0.64, "hc-key": "ae", "hc-a2": "AE", "name": "United Arab Emirates", "labelrank": "4", "country-abbrev": "U.A.E.", "subregion": "Western Asia", "region-wb": "Middle East & North Africa", "iso-a3": "ARE", "iso-a2": "AE", "woe-id": "23424738", "continent": "Asia" }, "geometry": { "type": "Polygon", "coordinates": [[[5905, 7272], [5908, 7268], [5908, 7251], [5891, 7248], [5890, 7228], [5873, 7181], [5871, 7178], [5796, 7188], [5767, 7223], [5767, 7229], [5774, 7221], [5796, 7226], [5826, 7222], [5852, 7233], [5899, 7285], [5901, 7273], [5905, 7272]], [[5905, 7259], [5907, 7261], [5904, 7262], [5904, 7259], [5905, 7259]]] } }, { "type": "Feature", "id": "BD", "properties": { "hc-group": "admin0", "hc-middle-x": 0.13, "hc-middle-y": 0.53, "hc-key": "bd", "hc-a2": "BD", "name": "Bangladesh", "labelrank": "3", "country-abbrev": "Bang.", "subregion": "Southern Asia", "region-wb": "South Asia", "iso-a3": "BGD", "iso-a2": "BD", "woe-id": "23424759", "continent": "Asia" }, "geometry": { "type": "Polygon", "coordinates": [[[6870, 7153], [6871, 7159], [6870, 7163], [6867, 7196], [6855, 7210], [6861, 7228], [6840, 7241], [6852, 7257], [6866, 7257], [6841, 7280], [6853, 7298], [6893, 7281], [6892, 7264], [6909, 7257], [6957, 7258], [6964, 7249], [6960, 7234], [6938, 7224], [6932, 7209], [6945, 7188], [6961, 7213], [6967, 7199], [6974, 7159], [6976, 7138], [6965, 7130], [6953, 7143], [6954, 7155], [6941, 7183], [6921, 7175], [6933, 7166], [6901, 7159], [6875, 7148], [6870, 7153]]] } }, { "type": "Feature", "id": "CH", "properties": { "hc-group": "admin0", "hc-middle-x": 0.49, "hc-middle-y": 0.55, "hc-key": "ch", "hc-a2": "CH", "name": "Switzerland", "labelrank": "4", "country-abbrev": "Switz.", "subregion": "Western Europe", "region-wb": "Europe & Central Asia", "iso-a3": "CHE", "iso-a2": "CH", "woe-id": "23424957", "continent": "Europe" }, "geometry": { "type": "Polygon", "coordinates": [[[4472, 8015], [4497, 8015], [4501, 8023], [4519, 8018], [4519, 8018], [4519, 8018], [4519, 8018], [4528, 8012], [4529, 8012], [4532, 8009], [4528, 8003], [4527, 7996], [4530, 7996], [4546, 7988], [4556, 7988], [4555, 7976], [4542, 7970], [4526, 7975], [4510, 7950], [4508, 7959], [4486, 7966], [4479, 7953], [4455, 7954], [4450, 7961], [4448, 7972], [4443, 7976], [4436, 7971], [4431, 7967], [4429, 7978], [4456, 8006], [4471, 8015], [4472, 8015]]] } }, { "type": "Feature", "id": "PT", "properties": { "hc-group": "admin0", "hc-middle-x": 0.46, "hc-middle-y": 0.52, "hc-key": "pt", "hc-a2": "PT", "name": "Portugal", "labelrank": "2", "country-abbrev": "Port.", "subregion": "Southern Europe", "region-wb": "Europe & Central Asia", "iso-a3": "PRT", "iso-a2": "PT", "woe-id": "23424925", "continent": "Europe" }, "geometry": { "type": "Polygon", "coordinates": [[[4030, 7647], [4019, 7641], [3983, 7641], [3989, 7657], [3989, 7686], [3969, 7698], [3981, 7732], [3993, 7777], [3987, 7803], [3990, 7812], [4006, 7818], [4007, 7806], [4055, 7810], [4065, 7798], [4044, 7778], [4048, 7755], [4041, 7732], [4026, 7732], [4043, 7709], [4031, 7689], [4041, 7675], [4026, 7659], [4030, 7647]]] } }, { "type": "Feature", "id": "MY", "properties": { "hc-group": "admin0", "hc-middle-x": 0.89, "hc-middle-y": 0.31, "hc-key": "my", "hc-a2": "MY", "name": "Malaysia", "labelrank": "3", "country-abbrev": "Malay.", "subregion": "South-Eastern Asia", "region-wb": "East Asia & Pacific", "iso-a3": "MYS", "iso-a2": "MY", "woe-id": "23424901", "continent": "Asia" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[7720, 6627], [7715, 6627], [7714, 6627], [7714, 6628], [7710, 6627], [7699, 6633], [7659, 6634], [7650, 6619], [7648, 6594], [7636, 6588], [7640, 6579], [7628, 6571], [7619, 6547], [7594, 6541], [7576, 6550], [7551, 6548], [7541, 6535], [7522, 6537], [7503, 6530], [7482, 6546], [7476, 6566], [7485, 6555], [7517, 6551], [7526, 6587], [7575, 6598], [7603, 6630], [7605, 6640], [7622, 6623], [7634, 6648], [7635, 6649], [7635, 6646], [7635, 6646], [7635, 6640], [7645, 6632], [7638, 6649], [7652, 6658], [7667, 6685], [7678, 6695], [7693, 6721], [7702, 6700], [7715, 6692], [7716, 6678], [7735, 6675], [7760, 6657], [7726, 6648], [7745, 6636], [7716, 6629], [7720, 6627]]], [[[7196, 6694], [7197, 6701], [7224, 6688], [7225, 6670], [7245, 6673], [7253, 6688], [7284, 6663], [7294, 6646], [7291, 6615], [7294, 6592], [7303, 6582], [7319, 6547], [7292, 6550], [7230, 6589], [7233, 6595], [7214, 6618], [7209, 6647], [7203, 6654], [7203, 6681], [7182, 6694], [7196, 6694]]]] } }, { "type": "Feature", "id": "VN", "properties": { "hc-group": "admin0", "hc-middle-x": 0.45, "hc-middle-y": 0.96, "hc-key": "vn", "hc-a2": "VN", "name": "Vietnam", "labelrank": "2", "country-abbrev": "Viet.", "subregion": "South-Eastern Asia", "region-wb": "East Asia & Pacific", "iso-a3": "VNM", "iso-a2": "VN", "woe-id": "23424984", "continent": "Asia" }, "geometry": { "type": "Polygon", "coordinates": [[[7255, 7171], [7264, 7183], [7280, 7173], [7290, 7183], [7310, 7175], [7334, 7188], [7349, 7201], [7365, 7187], [7391, 7182], [7388, 7159], [7409, 7147], [7428, 7143], [7412, 7137], [7422, 7128], [7394, 7128], [7400, 7120], [7384, 7115], [7386, 7105], [7370, 7098], [7358, 7068], [7372, 7046], [7382, 7041], [7388, 7021], [7425, 6986], [7434, 6984], [7451, 6959], [7466, 6914], [7464, 6899], [7471, 6877], [7463, 6877], [7465, 6850], [7458, 6839], [7407, 6810], [7399, 6814], [7383, 6785], [7356, 6773], [7343, 6758], [7333, 6764], [7334, 6805], [7311, 6800], [7324, 6811], [7341, 6826], [7362, 6829], [7370, 6851], [7382, 6848], [7414, 6868], [7416, 6903], [7408, 6921], [7414, 6938], [7418, 6956], [7403, 6970], [7407, 6979], [7385, 6998], [7385, 7006], [7361, 7027], [7353, 7043], [7331, 7061], [7306, 7077], [7317, 7089], [7325, 7086], [7338, 7101], [7321, 7111], [7328, 7118], [7312, 7127], [7300, 7118], [7284, 7125], [7280, 7146], [7255, 7171]]] } }, { "type": "Feature", "id": "BR", "properties": { "hc-group": "admin0", "hc-middle-x": 0.54, "hc-middle-y": 0.35, "hc-key": "br", "hc-a2": "BR", "name": "Brazil", "labelrank": "2", "country-abbrev": "Brazil", "subregion": "South America", "region-wb": "Latin America & Caribbean", "iso-a3": "BRA", "iso-a2": "BR", "woe-id": "23424768", "continent": "South America" }, "geometry": { "type": "Polygon", "coordinates": [[[2672, 5485], [2684, 5510], [2691, 5506], [2696, 5525], [2683, 5514], [2641, 5553], [2621, 5561], [2611, 5573], [2599, 5575], [2575, 5597], [2552, 5594], [2587, 5631], [2606, 5657], [2632, 5676], [2663, 5690], [2668, 5720], [2661, 5739], [2641, 5740], [2641, 5742], [2640, 5745], [2650, 5757], [2650, 5787], [2639, 5795], [2617, 5790], [2603, 5841], [2587, 5849], [2575, 5842], [2541, 5850], [2546, 5883], [2536, 5907], [2554, 5967], [2547, 5986], [2529, 5995], [2527, 6023], [2478, 6025], [2468, 6099], [2451, 6109], [2427, 6107], [2418, 6119], [2399, 6123], [2391, 6133], [2352, 6139], [2334, 6153], [2323, 6178], [2325, 6217], [2321, 6221], [2286, 6215], [2254, 6191], [2237, 6183], [2200, 6184], [2168, 6182], [2169, 6225], [2146, 6212], [2122, 6212], [2119, 6225], [2092, 6229], [2100, 6239], [2069, 6284], [2076, 6303], [2095, 6317], [2092, 6327], [2101, 6355], [2135, 6374], [2163, 6383], [2188, 6381], [2205, 6471], [2198, 6490], [2185, 6502], [2186, 6522], [2213, 6524], [2206, 6536], [2191, 6536], [2191, 6555], [2241, 6556], [2265, 6566], [2274, 6539], [2279, 6541], [2300, 6527], [2361, 6553], [2364, 6562], [2381, 6568], [2382, 6576], [2362, 6577], [2358, 6610], [2346, 6626], [2362, 6620], [2381, 6621], [2395, 6609], [2400, 6623], [2435, 6630], [2464, 6649], [2460, 6657], [2482, 6654], [2477, 6637], [2491, 6633], [2495, 6620], [2486, 6611], [2482, 6584], [2489, 6559], [2504, 6545], [2525, 6542], [2531, 6552], [2553, 6555], [2567, 6564], [2585, 6562], [2599, 6559], [2596, 6573], [2629, 6580], [2640, 6573], [2654, 6567], [2696, 6574], [2717, 6614], [2726, 6623], [2731, 6635], [2756, 6569], [2779, 6554], [2778, 6536], [2762, 6524], [2775, 6520], [2763, 6510], [2786, 6516], [2781, 6506], [2760, 6505], [2742, 6497], [2738, 6475], [2723, 6463], [2711, 6466], [2696, 6458], [2720, 6459], [2748, 6472], [2757, 6458], [2753, 6473], [2744, 6481], [2765, 6502], [2784, 6501], [2822, 6498], [2810, 6463], [2781, 6452], [2760, 6453], [2763, 6449], [2799, 6448], [2822, 6474], [2843, 6489], [2889, 6478], [2914, 6454], [2923, 6466], [2937, 6451], [2942, 6431], [2951, 6424], [2962, 6439], [3004, 6422], [3031, 6420], [3071, 6422], [3115, 6397], [3153, 6361], [3172, 6355], [3203, 6355], [3210, 6345], [3224, 6295], [3223, 6273], [3209, 6236], [3176, 6197], [3162, 6189], [3128, 6133], [3101, 6115], [3098, 6073], [3104, 6038], [3094, 5998], [3096, 5983], [3079, 5957], [3079, 5930], [3039, 5866], [3042, 5853], [3013, 5835], [3010, 5822], [2932, 5817], [2910, 5800], [2865, 5780], [2824, 5740], [2817, 5726], [2816, 5680], [2824, 5681], [2811, 5645], [2782, 5618], [2767, 5585], [2742, 5552], [2742, 5566], [2754, 5575], [2756, 5589], [2740, 5595], [2734, 5565], [2719, 5558], [2699, 5500], [2677, 5479], [2672, 5482], [2672, 5485]]] } }, { "type": "Feature", "id": "PA", "properties": { "hc-group": "admin0", "hc-middle-x": 0.21, "hc-middle-y": 0.50, "hc-key": "pa", "hc-a2": "PA", "name": "Panama", "labelrank": "4", "country-abbrev": "Pan.", "subregion": "Central America", "region-wb": "Latin America & Caribbean", "iso-a3": "PAN", "iso-a2": "PA", "woe-id": "23424924", "continent": "North America" }, "geometry": { "type": "Polygon", "coordinates": [[[1817, 6786], [1827, 6770], [1847, 6764], [1868, 6766], [1906, 6788], [1951, 6776], [1970, 6759], [1976, 6738], [1955, 6717], [1939, 6741], [1949, 6754], [1918, 6747], [1934, 6759], [1920, 6769], [1901, 6765], [1899, 6757], [1879, 6746], [1893, 6725], [1868, 6717], [1864, 6727], [1846, 6720], [1843, 6742], [1814, 6749], [1807, 6741], [1809, 6787], [1817, 6786]]] } }, { "type": "Feature", "id": "NG", "properties": { "hc-group": "admin0", "hc-middle-x": 0.50, "hc-middle-y": 0.33, "hc-key": "ng", "hc-a2": "NG", "name": "Nigeria", "labelrank": "2", "country-abbrev": "Nigeria", "subregion": "Western Africa", "region-wb": "Sub-Saharan Africa", "iso-a3": "NGA", "iso-a2": "NG", "woe-id": "23424908", "continent": "Africa" }, "geometry": { "type": "Polygon", "coordinates": [[[4328, 6692], [4328, 6692], [4329, 6700], [4327, 6736], [4330, 6771], [4352, 6794], [4361, 6816], [4351, 6840], [4354, 6849], [4355, 6874], [4369, 6887], [4370, 6902], [4381, 6908], [4412, 6914], [4436, 6906], [4452, 6888], [4476, 6897], [4504, 6885], [4532, 6882], [4541, 6892], [4562, 6899], [4585, 6898], [4615, 6889], [4642, 6909], [4649, 6909], [4662, 6890], [4666, 6869], [4680, 6863], [4678, 6843], [4660, 6836], [4638, 6801], [4637, 6785], [4627, 6780], [4625, 6764], [4608, 6751], [4607, 6739], [4589, 6706], [4584, 6697], [4581, 6694], [4579, 6696], [4560, 6712], [4546, 6710], [4509, 6676], [4501, 6648], [4501, 6646], [4501, 6646], [4501, 6646], [4494, 6641], [4458, 6634], [4423, 6632], [4413, 6641], [4405, 6662], [4392, 6681], [4378, 6691], [4328, 6692]]] } }, { "type": "Feature", "id": "TR", "properties": { "hc-group": "admin0", "hc-middle-x": 0.33, "hc-middle-y": 0.49, "hc-key": "tr", "hc-a2": "TR", "name": "Turkey", "labelrank": "2", "country-abbrev": "Tur.", "subregion": "Western Asia", "region-wb": "Europe & Central Asia", "iso-a3": "TUR", "iso-a2": "TR", "woe-id": "23424969", "continent": "Asia" }, "geometry": { "type": "Polygon", "coordinates": [[[5567, 7730], [5545, 7722], [5552, 7703], [5550, 7673], [5561, 7665], [5566, 7645], [5553, 7640], [5550, 7649], [5506, 7652], [5495, 7644], [5491, 7651], [5469, 7643], [5447, 7644], [5419, 7632], [5387, 7631], [5373, 7637], [5351, 7628], [5327, 7634], [5328, 7614], [5305, 7604], [5302, 7617], [5314, 7627], [5309, 7638], [5289, 7625], [5266, 7632], [5240, 7611], [5214, 7608], [5191, 7625], [5152, 7637], [5143, 7615], [5122, 7611], [5106, 7618], [5100, 7632], [5081, 7635], [5082, 7642], [5051, 7639], [5061, 7650], [5049, 7652], [5050, 7674], [5021, 7683], [5041, 7689], [5035, 7699], [5044, 7706], [5032, 7718], [5040, 7728], [5016, 7725], [5019, 7743], [5032, 7754], [5018, 7745], [5007, 7750], [5038, 7764], [5015, 7768], [5032, 7791], [5023, 7803], [5051, 7816], [5073, 7812], [5075, 7800], [5105, 7786], [5101, 7778], [5080, 7781], [5059, 7777], [5048, 7765], [5036, 7757], [5106, 7758], [5113, 7769], [5103, 7777], [5109, 7786], [5168, 7781], [5198, 7803], [5229, 7813], [5270, 7811], [5277, 7816], [5294, 7800], [5307, 7803], [5321, 7786], [5326, 7791], [5355, 7779], [5377, 7775], [5409, 7782], [5430, 7775], [5471, 7796], [5498, 7793], [5509, 7798], [5527, 7781], [5536, 7766], [5534, 7747], [5557, 7742], [5566, 7733], [5567, 7730]]] } }, { "type": "Feature", "id": "IR", "properties": { "hc-group": "admin0", "hc-middle-x": 0.58, "hc-middle-y": 0.51, "hc-key": "ir", "hc-a2": "IR", "name": "Iran", "labelrank": "2", "country-abbrev": "Iran", "subregion": "Southern Asia", "region-wb": "Middle East & North Africa", "iso-a3": "IRN", "iso-a2": "IR", "woe-id": "23424851", "continent": "Asia" }, "geometry": { "type": "Polygon", "coordinates": [[[5566, 7645], [5561, 7665], [5550, 7673], [5552, 7703], [5545, 7722], [5567, 7730], [5586, 7708], [5607, 7704], [5614, 7706], [5618, 7704], [5657, 7732], [5671, 7721], [5662, 7702], [5679, 7688], [5687, 7689], [5695, 7661], [5725, 7654], [5752, 7631], [5777, 7626], [5823, 7636], [5838, 7634], [5836, 7652], [5861, 7658], [5880, 7677], [5906, 7677], [5910, 7683], [5933, 7683], [5937, 7673], [5979, 7664], [6015, 7641], [6025, 7628], [6046, 7628], [6052, 7594], [6046, 7567], [6029, 7543], [6030, 7528], [6041, 7525], [6031, 7512], [6039, 7483], [6039, 7458], [6064, 7455], [6067, 7437], [6040, 7406], [6070, 7364], [6095, 7355], [6097, 7322], [6112, 7318], [6107, 7303], [6096, 7304], [6069, 7291], [6061, 7258], [6056, 7254], [6031, 7266], [6012, 7262], [5980, 7270], [5961, 7269], [5936, 7276], [5927, 7310], [5907, 7321], [5885, 7313], [5862, 7299], [5847, 7306], [5827, 7304], [5821, 7315], [5796, 7327], [5792, 7335], [5761, 7346], [5740, 7392], [5722, 7416], [5709, 7411], [5687, 7421], [5677, 7409], [5662, 7425], [5662, 7442], [5652, 7442], [5656, 7467], [5642, 7490], [5611, 7506], [5599, 7528], [5584, 7539], [5585, 7555], [5600, 7576], [5611, 7601], [5584, 7606], [5566, 7645]]] } }, { "type": "Feature", "id": "HT", "properties": { "hc-group": "admin0", "hc-middle-x": 0.20, "hc-middle-y": 0.92, "hc-key": "ht", "hc-a2": "HT", "name": "Haiti", "labelrank": "5", "country-abbrev": "Haiti", "subregion": "Caribbean", "region-wb": "Latin America & Caribbean", "iso-a3": "HTI", "iso-a2": "HT", "woe-id": "23424839", "continent": "North America" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[2131, 7052], [2130, 7053], [2130, 7053], [2130, 7053], [2131, 7052]]], [[[2128, 7056], [2129, 7052], [2131, 7052], [2137, 7047], [2135, 7039], [2126, 7045], [2102, 7042], [2080, 7045], [2073, 7038], [2055, 7050], [2065, 7057], [2106, 7050], [2108, 7081], [2087, 7087], [2094, 7096], [2135, 7089], [2137, 7061], [2128, 7056]]]] } }, { "type": "Feature", "id": "DO", "properties": { "hc-group": "admin0", "hc-middle-x": 0.48, "hc-middle-y": 0.42, "hc-key": "do", "hc-a2": "DO", "name": "Dominican Republic", "labelrank": "5", "country-abbrev": "Dom. Rep.", "subregion": "Caribbean", "region-wb": "Latin America & Caribbean", "iso-a3": "DOM", "iso-a2": "DO", "woe-id": "23424800", "continent": "North America" }, "geometry": { "type": "Polygon", "coordinates": [[[2130, 7053], [2129, 7055], [2128, 7056], [2137, 7061], [2135, 7089], [2157, 7096], [2190, 7087], [2199, 7071], [2224, 7067], [2236, 7057], [2224, 7042], [2219, 7050], [2191, 7052], [2171, 7044], [2166, 7050], [2145, 7026], [2135, 7039], [2137, 7047], [2131, 7052], [2131, 7052], [2130, 7053], [2130, 7053]]] } }, { "type": "Feature", "id": "SL", "properties": { "hc-group": "admin0", "hc-middle-x": 0.48, "hc-middle-y": 0.48, "hc-key": "sl", "hc-a2": "SL", "name": "Sierra Leone", "labelrank": "4", "country-abbrev": "S.L.", "subregion": "Western Africa", "region-wb": "Sub-Saharan Africa", "iso-a3": "SLE", "iso-a2": "SL", "woe-id": "23424946", "continent": "Africa" }, "geometry": { "type": "Polygon", "coordinates": [[[3910, 6708], [3867, 6727], [3877, 6728], [3866, 6747], [3861, 6745], [3857, 6770], [3874, 6781], [3880, 6794], [3916, 6798], [3934, 6778], [3945, 6754], [3936, 6733], [3910, 6708]]] } }, { "type": "Feature", "id": "SN", "properties": { "hc-group": "admin0", "hc-middle-x": 0.22, "hc-middle-y": 0.50, "hc-key": "sn", "hc-a2": "SN", "name": "Senegal", "labelrank": "3", "country-abbrev": "Sen.", "subregion": "Western Africa", "region-wb": "Sub-Saharan Africa", "iso-a3": "SEN", "iso-a2": "SN", "woe-id": "23424943", "continent": "Africa" }, "geometry": { "type": "Polygon", "coordinates": [[[3844, 6878], [3801, 6878], [3787, 6871], [3756, 6868], [3754, 6875], [3755, 6889], [3782, 6892], [3802, 6905], [3824, 6895], [3840, 6898], [3804, 6912], [3791, 6905], [3761, 6905], [3742, 6937], [3761, 6971], [3767, 6991], [3826, 6996], [3842, 6981], [3851, 6982], [3858, 6966], [3887, 6940], [3896, 6915], [3892, 6909], [3913, 6886], [3913, 6870], [3884, 6867], [3844, 6878]]] } }, { "type": "Feature", "id": "GW", "properties": { "hc-group": "admin0", "hc-middle-x": 0.55, "hc-middle-y": 0.49, "hc-key": "gw", "hc-a2": "GW", "name": "Guinea Bissau", "labelrank": "6", "country-abbrev": "GnB.", "subregion": "Western Africa", "region-wb": "Sub-Saharan Africa", "iso-a3": "GNB", "iso-a2": "GW", "woe-id": "23424929", "continent": "Africa" }, "geometry": { "type": "Polygon", "coordinates": [[[3756, 6868], [3787, 6871], [3801, 6878], [3844, 6878], [3844, 6849], [3816, 6843], [3806, 6827], [3794, 6838], [3771, 6830], [3776, 6851], [3756, 6868]]] } }, { "type": "Feature", "id": "HR", "properties": { "hc-group": "admin0", "hc-middle-x": 0.35, "hc-middle-y": 0.59, "hc-key": "hr", "hc-a2": "HR", "name": "Croatia", "labelrank": "6", "country-abbrev": "Cro.", "subregion": "Southern Europe", "region-wb": "Europe & Central Asia", "iso-a3": "HRV", "iso-a2": "HR", "woe-id": "23424843", "continent": "Europe" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[4793, 7827], [4772, 7841], [4768, 7844], [4774, 7842], [4791, 7832], [4791, 7830], [4793, 7827]]], [[[4648, 7938], [4700, 7938], [4709, 7950], [4709, 7964], [4734, 7975], [4759, 7955], [4790, 7947], [4805, 7954], [4809, 7925], [4808, 7915], [4785, 7926], [4773, 7922], [4746, 7930], [4729, 7920], [4713, 7926], [4713, 7914], [4726, 7891], [4751, 7866], [4766, 7846], [4745, 7863], [4718, 7866], [4685, 7890], [4697, 7896], [4680, 7927], [4672, 7907], [4670, 7933], [4659, 7913], [4649, 7924], [4648, 7938]]]] } }, { "type": "Feature", "id": "TH", "properties": { "hc-group": "admin0", "hc-middle-x": 0.26, "hc-middle-y": 0.49, "hc-key": "th", "hc-a2": "TH", "name": "Thailand", "labelrank": "3", "country-abbrev": "Thai.", "subregion": "South-Eastern Asia", "region-wb": "East Asia & Pacific", "iso-a3": "THA", "iso-a2": "TH", "woe-id": "23424960", "continent": "Asia" }, "geometry": { "type": "Polygon", "coordinates": [[[7253, 6688], [7245, 6673], [7225, 6670], [7224, 6688], [7197, 6701], [7196, 6694], [7185, 6714], [7175, 6719], [7160, 6741], [7147, 6749], [7143, 6733], [7141, 6770], [7156, 6809], [7156, 6819], [7182, 6852], [7169, 6880], [7167, 6909], [7150, 6929], [7138, 6951], [7149, 6957], [7154, 6985], [7146, 7008], [7124, 7032], [7115, 7053], [7134, 7092], [7149, 7088], [7191, 7112], [7195, 7108], [7209, 7103], [7206, 7084], [7229, 7085], [7231, 7069], [7223, 7050], [7227, 7039], [7219, 7025], [7226, 7021], [7254, 7044], [7271, 7033], [7292, 7051], [7310, 7047], [7334, 7018], [7332, 6993], [7359, 6966], [7352, 6930], [7345, 6928], [7333, 6930], [7283, 6926], [7261, 6904], [7266, 6877], [7274, 6870], [7278, 6847], [7273, 6859], [7260, 6857], [7246, 6878], [7217, 6879], [7221, 6902], [7194, 6900], [7193, 6864], [7188, 6857], [7168, 6802], [7171, 6776], [7188, 6778], [7191, 6758], [7200, 6749], [7198, 6725], [7222, 6706], [7239, 6705], [7253, 6688]]] } }, { "type": "Feature", "id": "MX", "properties": { "hc-group": "admin0", "hc-middle-x": 0.48, "hc-middle-y": 0.49, "hc-key": "mx", "hc-a2": "MX", "name": "Mexico", "labelrank": "2", "country-abbrev": "Mex.", "subregion": "Central America", "region-wb": "Latin America & Caribbean", "iso-a3": "MEX", "iso-a2": "MX", "woe-id": "23424900", "continent": "North America" }, "geometry": { "type": "Polygon", "coordinates": [[[1265, 7398], [1267, 7394], [1273, 7393], [1284, 7382], [1295, 7356], [1318, 7333], [1320, 7317], [1322, 7307], [1328, 7301], [1356, 7286], [1380, 7279], [1388, 7282], [1373, 7237], [1367, 7182], [1373, 7148], [1388, 7118], [1408, 7094], [1413, 7077], [1427, 7060], [1445, 7059], [1467, 7042], [1493, 7050], [1541, 7058], [1551, 7051], [1556, 7064], [1577, 7079], [1584, 7096], [1588, 7130], [1605, 7137], [1653, 7147], [1695, 7135], [1665, 7086], [1674, 7083], [1662, 7043], [1654, 7048], [1648, 7052], [1631, 7034], [1623, 7032], [1570, 7032], [1569, 7015], [1556, 7015], [1587, 6988], [1584, 6979], [1548, 6979], [1533, 6956], [1532, 6934], [1484, 6980], [1460, 6983], [1455, 6990], [1438, 6976], [1405, 6967], [1369, 6977], [1338, 6993], [1311, 6999], [1273, 7015], [1251, 7034], [1201, 7047], [1187, 7064], [1156, 7079], [1136, 7110], [1150, 7117], [1143, 7125], [1151, 7144], [1138, 7158], [1133, 7179], [1097, 7220], [1068, 7241], [1060, 7255], [1026, 7277], [1032, 7294], [1023, 7307], [994, 7324], [991, 7340], [973, 7348], [945, 7379], [917, 7436], [920, 7447], [893, 7462], [871, 7467], [865, 7448], [872, 7416], [903, 7386], [916, 7387], [913, 7373], [926, 7360], [928, 7342], [950, 7314], [963, 7305], [973, 7277], [985, 7253], [988, 7238], [1014, 7223], [1025, 7207], [1023, 7193], [1012, 7186], [1000, 7207], [946, 7248], [945, 7283], [919, 7302], [902, 7306], [877, 7322], [862, 7337], [887, 7345], [890, 7361], [863, 7390], [842, 7402], [831, 7436], [813, 7460], [800, 7492], [870, 7498], [867, 7491], [980, 7453], [1062, 7453], [1062, 7468], [1112, 7467], [1156, 7432], [1170, 7399], [1211, 7378], [1225, 7402], [1236, 7407], [1265, 7398]]] } }, { "type": "Feature", "id": "TN", "properties": { "hc-group": "admin0", "hc-middle-x": 0.42, "hc-middle-y": 0.09, "hc-key": "tn", "hc-a2": "TN", "name": "Tunisia", "labelrank": "3", "country-abbrev": "Tun.", "subregion": "Northern Africa", "region-wb": "Middle East & North Africa", "iso-a3": "TUN", "iso-a2": "TN", "woe-id": "23424967", "continent": "Africa" }, "geometry": { "type": "Polygon", "coordinates": [[[4587, 7513], [4587, 7513], [4585, 7504], [4589, 7490], [4568, 7479], [4546, 7456], [4551, 7440], [4539, 7422], [4528, 7417], [4514, 7477], [4493, 7493], [4486, 7510], [4476, 7514], [4468, 7537], [4491, 7562], [4496, 7628], [4501, 7638], [4519, 7648], [4538, 7651], [4555, 7631], [4574, 7643], [4576, 7636], [4558, 7618], [4560, 7602], [4574, 7594], [4577, 7581], [4560, 7558], [4546, 7551], [4552, 7530], [4574, 7534], [4577, 7514], [4587, 7513]]] } }, { "type": "Feature", "id": "KW", "properties": { "hc-group": "admin0", "hc-middle-x": 0.49, "hc-middle-y": 0.51, "hc-key": "kw", "hc-a2": "KW", "name": "Kuwait", "labelrank": "6", "country-abbrev": "Kwt.", "subregion": "Western Asia", "region-wb": "Middle East & North Africa", "iso-a3": "KWT", "iso-a2": "KW", "woe-id": "23424870", "continent": "Asia" }, "geometry": { "type": "Polygon", "coordinates": [[[5674, 7364], [5652, 7363], [5645, 7378], [5618, 7381], [5635, 7409], [5660, 7410], [5672, 7401], [5653, 7390], [5664, 7389], [5674, 7364]]] } }, { "type": "Feature", "id": "DE", "properties": { "hc-group": "admin0", "hc-middle-x": 0.51, "hc-middle-y": 0.34, "hc-key": "de", "hc-a2": "DE", "name": "Germany", "labelrank": "2", "country-abbrev": "Ger.", "subregion": "Western Europe", "region-wb": "Europe & Central Asia", "iso-a3": "DEU", "iso-a2": "DE", "woe-id": "23424829", "continent": "Europe" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[4519, 8018], [4519, 8018], [4519, 8018], [4519, 8018]]], [[[4503, 8300], [4508, 8301], [4526, 8297], [4565, 8277], [4576, 8286], [4569, 8263], [4604, 8271], [4616, 8283], [4634, 8278], [4642, 8288], [4653, 8278], [4639, 8274], [4667, 8262], [4666, 8260], [4666, 8259], [4657, 8258], [4668, 8252], [4672, 8235], [4664, 8218], [4679, 8207], [4683, 8187], [4678, 8177], [4690, 8154], [4684, 8140], [4671, 8141], [4616, 8122], [4609, 8108], [4625, 8081], [4655, 8060], [4652, 8050], [4623, 8035], [4632, 8012], [4607, 8020], [4571, 8008], [4555, 8015], [4552, 8005], [4534, 8014], [4515, 8024], [4519, 8018], [4501, 8023], [4497, 8015], [4472, 8015], [4471, 8025], [4471, 8034], [4478, 8054], [4490, 8067], [4445, 8075], [4435, 8086], [4440, 8099], [4428, 8111], [4436, 8119], [4425, 8136], [4431, 8160], [4423, 8177], [4436, 8178], [4455, 8193], [4460, 8234], [4463, 8252], [4482, 8253], [4500, 8246], [4501, 8258], [4513, 8260], [4503, 8275], [4503, 8300]]]] } }, { "type": "Feature", "id": "MM", "properties": { "hc-group": "admin0", "hc-middle-x": 0.18, "hc-middle-y": 0.49, "hc-key": "mm", "hc-a2": "MM", "name": "Myanmar", "labelrank": "3", "country-abbrev": "Myan.", "subregion": "South-Eastern Asia", "region-wb": "East Asia & Pacific", "iso-a3": "MMR", "iso-a2": "MM", "woe-id": "23424763", "continent": "Asia" }, "geometry": { "type": "Polygon", "coordinates": [[[6965, 7130], [6976, 7138], [6974, 7159], [6986, 7159], [6990, 7190], [6997, 7194], [6995, 7222], [7019, 7216], [7037, 7253], [7034, 7264], [7050, 7285], [7046, 7298], [7079, 7323], [7097, 7326], [7114, 7343], [7114, 7353], [7120, 7363], [7137, 7351], [7142, 7332], [7154, 7333], [7154, 7280], [7128, 7260], [7120, 7244], [7123, 7217], [7151, 7223], [7159, 7196], [7178, 7192], [7167, 7164], [7191, 7161], [7198, 7142], [7225, 7152], [7227, 7146], [7214, 7138], [7195, 7108], [7191, 7112], [7149, 7088], [7134, 7092], [7115, 7053], [7124, 7032], [7146, 7008], [7154, 6985], [7149, 6957], [7138, 6951], [7150, 6929], [7167, 6909], [7169, 6880], [7182, 6852], [7156, 6819], [7156, 6809], [7150, 6798], [7147, 6820], [7155, 6826], [7156, 6851], [7142, 6853], [7154, 6865], [7132, 6869], [7143, 6878], [7151, 6871], [7151, 6893], [7138, 6908], [7128, 6944], [7125, 6974], [7101, 7019], [7093, 6993], [7071, 6984], [7058, 6969], [7022, 6978], [7034, 7024], [7020, 7062], [7006, 7064], [7001, 7077], [7014, 7081], [6997, 7101], [6987, 7098], [6968, 7119], [6965, 7130]]] } }, { "type": "Feature", "id": "GQ", "properties": { "hc-group": "admin0", "hc-middle-x": 0.53, "hc-middle-y": 0.55, "hc-key": "gq", "hc-a2": "GQ", "name": "Equatorial Guinea", "labelrank": "4", "country-abbrev": "Eq. G.", "subregion": "Middle Africa", "region-wb": "Sub-Saharan Africa", "iso-a3": "GNQ", "iso-a2": "GQ", "woe-id": "23424804", "continent": "Africa" }, "geometry": { "type": "Polygon", "coordinates": [[[4537, 6534], [4523, 6540], [4537, 6561], [4537, 6574], [4542, 6569], [4582, 6569], [4582, 6534], [4537, 6534]]] } }, { "type": "Feature", "id": "CNM", "properties": { "hc-group": "admin0", "hc-middle-x": 0.39, "hc-middle-y": 0.10, "hc-key": "cnm", "hc-a2": "CN", "name": "Cyprus No Mans Area", "labelrank": "9", "country-abbrev": null, "subregion": "Western Asia", "region-wb": "Europe & Central Asia", "iso-a3": "-99", "iso-a2": null, "woe-id": "-99", "continent": "Asia" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[5246, 7576], [5250, 7575], [5250, 7575], [5247, 7575], [5246, 7575], [5246, 7576], [5246, 7576], [5246, 7576], [5246, 7576]]], [[[5208, 7579], [5208, 7579], [5208, 7579], [5209, 7580], [5210, 7580], [5209, 7578], [5208, 7579]]], [[[5211, 7579], [5211, 7579], [5211, 7579], [5212, 7579], [5212, 7579], [5211, 7579]]], [[[5240, 7574], [5240, 7574], [5240, 7573], [5232, 7579], [5212, 7579], [5212, 7579], [5232, 7580], [5240, 7574], [5240, 7574], [5240, 7574], [5240, 7574]]]] } }, { "type": "Feature", "id": "NC", "properties": { "hc-group": "admin0", "hc-middle-x": 0.56, "hc-middle-y": 0.71, "hc-key": "nc", "hc-a2": "NC", "name": "Northern Cyprus", "labelrank": "6", "country-abbrev": "N. Cy.", "subregion": "Western Asia", "region-wb": "Europe & Central Asia", "iso-a3": "-99", "iso-a2": "NC", "woe-id": "-90", "continent": "Asia" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[5246, 7576], [5246, 7576], [5242, 7574], [5240, 7574], [5240, 7574], [5240, 7574], [5240, 7574], [5232, 7580], [5212, 7579], [5212, 7579], [5212, 7579], [5212, 7579], [5211, 7579], [5211, 7579], [5266, 7595], [5247, 7583], [5250, 7575], [5246, 7576], [5246, 7576], [5246, 7576]]], [[[5208, 7579], [5209, 7580], [5208, 7579], [5208, 7579]]]] } }, { "type": "Feature", "id": "IE", "properties": { "hc-group": "admin0", "hc-middle-x": 0.43, "hc-middle-y": 0.52, "hc-key": "ie", "hc-a2": "IE", "name": "Ireland", "labelrank": "3", "country-abbrev": "Ire.", "subregion": "Northern Europe", "region-wb": "Europe & Central Asia", "iso-a3": "IRL", "iso-a2": "IE", "woe-id": "23424803", "continent": "Europe" }, "geometry": { "type": "Polygon", "coordinates": [[[4035, 8308], [4026, 8294], [4007, 8283], [4033, 8269], [4041, 8281], [4053, 8266], [4064, 8268], [4061, 8264], [4072, 8223], [4061, 8191], [4029, 8189], [3992, 8168], [3959, 8163], [3941, 8180], [3956, 8190], [3940, 8188], [3965, 8207], [3975, 8230], [3948, 8246], [3966, 8256], [3953, 8273], [3958, 8277], [3999, 8275], [4009, 8290], [3993, 8289], [4004, 8311], [4031, 8321], [4044, 8314], [4035, 8308]]] } }, { "type": "Feature", "id": "KZ", "properties": { "hc-group": "admin0", "hc-middle-x": 0.57, "hc-middle-y": 0.46, "hc-key": "kz", "hc-a2": "KZ", "name": "Kazakhstan", "labelrank": "3", "country-abbrev": "Kaz.", "subregion": "Central Asia", "region-wb": "Europe & Central Asia", "iso-a3": "KAZ", "iso-a2": "KZ", "woe-id": "-90", "continent": "Asia" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[6785, 8086], [6798, 8091], [6819, 8072], [6806, 8073], [6797, 8051], [6774, 8046], [6766, 8028], [6771, 8008], [6765, 7995], [6744, 7987], [6741, 7993], [6719, 7992], [6692, 8001], [6671, 7939], [6680, 7926], [6661, 7925], [6655, 7932], [6605, 7921], [6614, 7907], [6614, 7888], [6627, 7853], [6608, 7835], [6610, 7819], [6587, 7829], [6579, 7841], [6559, 7844], [6479, 7845], [6462, 7843], [6432, 7857], [6416, 7850], [6412, 7828], [6364, 7842], [6339, 7833], [6337, 7821], [6281, 7790], [6267, 7775], [6268, 7764], [6250, 7771], [6248, 7785], [6212, 7785], [6206, 7812], [6192, 7813], [6194, 7848], [6185, 7844], [6161, 7873], [6145, 7868], [6109, 7871], [6074, 7865], [6045, 7898], [6016, 7914], [6015, 7941], [6009, 7953], [6027, 7951], [6050, 7965], [6052, 7973], [6037, 7981], [6015, 7977], [6039, 7966], [6033, 7959], [6001, 7968], [6007, 7959], [5998, 7945], [5994, 7957], [5978, 7952], [5973, 7940], [5896, 7920], [5896, 7789], [5880, 7788], [5865, 7810], [5844, 7824], [5808, 7817], [5792, 7804], [5791, 7816], [5800, 7839], [5777, 7842], [5759, 7864], [5745, 7891], [5730, 7895], [5729, 7908], [5759, 7905], [5749, 7914], [5761, 7932], [5796, 7935], [5811, 7957], [5814, 7983], [5793, 7993], [5786, 7986], [5756, 7998], [5733, 7989], [5715, 7976], [5700, 7977], [5698, 7969], [5688, 7974], [5683, 7976], [5682, 7977], [5682, 7977], [5691, 7985], [5677, 8009], [5663, 8022], [5635, 8024], [5634, 8041], [5617, 8046], [5633, 8076], [5625, 8081], [5629, 8100], [5648, 8124], [5665, 8107], [5666, 8105], [5668, 8101], [5671, 8102], [5687, 8107], [5686, 8130], [5691, 8133], [5693, 8135], [5695, 8137], [5703, 8149], [5720, 8154], [5726, 8156], [5731, 8158], [5737, 8170], [5773, 8164], [5789, 8175], [5794, 8164], [5819, 8165], [5852, 8140], [5857, 8146], [5887, 8127], [5912, 8148], [5931, 8149], [5937, 8141], [5941, 8140], [5942, 8141], [5942, 8142], [5947, 8141], [5948, 8143], [5949, 8150], [5965, 8151], [5973, 8140], [5975, 8137], [5978, 8137], [5979, 8137], [6008, 8127], [6015, 8140], [6036, 8132], [6055, 8137], [6064, 8155], [6042, 8169], [6037, 8170], [6025, 8171], [6019, 8180], [6045, 8198], [6035, 8211], [6046, 8221], [6076, 8224], [6058, 8233], [6054, 8235], [6050, 8235], [6044, 8249], [6050, 8265], [6068, 8264], [6069, 8263], [6069, 8262], [6074, 8261], [6090, 8266], [6132, 8276], [6168, 8278], [6175, 8290], [6191, 8289], [6255, 8303], [6278, 8323], [6315, 8310], [6333, 8317], [6344, 8294], [6344, 8268], [6370, 8270], [6371, 8269], [6381, 8260], [6386, 8270], [6412, 8259], [6407, 8255], [6407, 8254], [6410, 8241], [6420, 8248], [6421, 8248], [6425, 8250], [6440, 8251], [6511, 8283], [6505, 8269], [6505, 8270], [6500, 8271], [6497, 8270], [6501, 8263], [6541, 8235], [6588, 8164], [6592, 8157], [6603, 8137], [6617, 8144], [6617, 8146], [6616, 8150], [6616, 8152], [6624, 8157], [6645, 8144], [6647, 8135], [6676, 8134], [6705, 8145], [6716, 8140], [6729, 8117], [6744, 8112], [6745, 8111], [6746, 8110], [6750, 8110], [6759, 8091], [6764, 8091], [6766, 8091], [6768, 8092], [6785, 8086]]], [[[5978, 7937], [5988, 7950], [5998, 7925], [5978, 7937]]]] } }, { "type": "Feature", "id": "PL", "properties": { "hc-group": "admin0", "hc-middle-x": 0.51, "hc-middle-y": 0.27, "hc-key": "pl", "hc-a2": "PL", "name": "Poland", "labelrank": "3", "country-abbrev": "Pol.", "subregion": "Eastern Europe", "region-wb": "Europe & Central Asia", "iso-a3": "POL", "iso-a2": "PL", "woe-id": "23424923", "continent": "Europe" }, "geometry": { "type": "Polygon", "coordinates": [[[4826, 8282], [4819, 8275], [4830, 8282], [4916, 8278], [4918, 8278], [4938, 8271], [4940, 8262], [4952, 8230], [4951, 8211], [4930, 8196], [4944, 8188], [4943, 8165], [4959, 8139], [4958, 8127], [4928, 8105], [4915, 8089], [4921, 8068], [4912, 8071], [4891, 8083], [4865, 8080], [4846, 8083], [4830, 8076], [4821, 8091], [4803, 8088], [4795, 8103], [4773, 8106], [4754, 8121], [4740, 8110], [4725, 8123], [4729, 8131], [4684, 8140], [4690, 8154], [4678, 8177], [4683, 8187], [4679, 8207], [4664, 8218], [4672, 8235], [4668, 8252], [4679, 8258], [4666, 8259], [4666, 8260], [4667, 8262], [4723, 8276], [4736, 8287], [4759, 8294], [4787, 8298], [4795, 8282], [4826, 8283], [4826, 8283], [4826, 8282]]] } }, { "type": "Feature", "id": "LT", "properties": { "hc-group": "admin0", "hc-middle-x": 0.27, "hc-middle-y": 0.07, "hc-key": "lt", "hc-a2": "LT", "name": "Lithuania", "labelrank": "5", "country-abbrev": "Lith.", "subregion": "Northern Europe", "region-wb": "Europe & Central Asia", "iso-a3": "LTU", "iso-a2": "LT", "woe-id": "23424875", "continent": "Europe" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[4864, 8316], [4869, 8325], [4866, 8316], [4866, 8316], [4864, 8316]]], [[[4874, 8315], [4869, 8335], [4868, 8349], [4899, 8363], [4968, 8357], [4981, 8364], [4987, 8354], [5004, 8352], [5031, 8332], [5027, 8319], [5037, 8316], [5007, 8299], [4998, 8276], [4978, 8263], [4940, 8262], [4938, 8271], [4918, 8278], [4920, 8300], [4874, 8315]]]] } }, { "type": "Feature", "id": "EG", "properties": { "hc-group": "admin0", "hc-middle-x": 0.50, "hc-middle-y": 0.66, "hc-key": "eg", "hc-a2": "EG", "name": "Egypt", "labelrank": "2", "country-abbrev": "Egypt", "subregion": "Northern Africa", "region-wb": "Middle East & North Africa", "iso-a3": "EGY", "iso-a2": "EG", "woe-id": "23424802", "continent": "Africa" }, "geometry": { "type": "Polygon", "coordinates": [[[4989, 7464], [5053, 7454], [5103, 7437], [5117, 7441], [5142, 7459], [5188, 7459], [5193, 7445], [5223, 7450], [5239, 7446], [5255, 7452], [5256, 7451], [5257, 7449], [5273, 7402], [5275, 7394], [5261, 7356], [5252, 7340], [5227, 7364], [5224, 7379], [5212, 7393], [5207, 7409], [5200, 7397], [5216, 7365], [5235, 7345], [5234, 7335], [5250, 7303], [5294, 7220], [5299, 7188], [5334, 7159], [5168, 7159], [4984, 7159], [4984, 7384], [4975, 7415], [4984, 7435], [4980, 7455], [4989, 7464]]] } }, { "type": "Feature", "id": "UG", "properties": { "hc-group": "admin0", "hc-middle-x": 0.16, "hc-middle-y": 0.54, "hc-key": "ug", "hc-a2": "UG", "name": "Uganda", "labelrank": "3", "country-abbrev": "Uga.", "subregion": "Eastern Africa", "region-wb": "Sub-Saharan Africa", "iso-a3": "UGA", "iso-a2": "UG", "woe-id": "23424974", "continent": "Africa" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[5185, 6476], [5185, 6476], [5186, 6476], [5185, 6476]]], [[[5184, 6476], [5156, 6476], [5145, 6474], [5128, 6462], [5119, 6465], [5118, 6478], [5121, 6491], [5129, 6501], [5122, 6502], [5129, 6528], [5146, 6541], [5148, 6535], [5173, 6560], [5169, 6569], [5152, 6577], [5156, 6607], [5165, 6616], [5184, 6617], [5195, 6608], [5220, 6619], [5235, 6616], [5249, 6629], [5276, 6578], [5278, 6554], [5249, 6512], [5228, 6516], [5209, 6514], [5195, 6503], [5181, 6482], [5184, 6476]]]] } }, { "type": "Feature", "id": "CD", "properties": { "hc-group": "admin0", "hc-middle-x": 0.58, "hc-middle-y": 0.41, "hc-key": "cd", "hc-a2": "CD", "name": "Democratic Republic of the Congo", "labelrank": "2", "country-abbrev": "D.R.C.", "subregion": "Middle Africa", "region-wb": "Sub-Saharan Africa", "iso-a3": "COD", "iso-a2": "CD", "woe-id": "23424780", "continent": "Africa" }, "geometry": { "type": "Polygon", "coordinates": [[[5108, 6408], [5105, 6357], [5113, 6341], [5107, 6332], [5117, 6309], [5137, 6289], [5148, 6264], [5100, 6257], [5099, 6257], [5083, 6239], [5088, 6230], [5091, 6196], [5083, 6169], [5103, 6141], [5117, 6139], [5126, 6148], [5125, 6110], [5107, 6110], [5083, 6139], [5062, 6144], [5048, 6165], [5034, 6152], [4995, 6163], [4992, 6176], [4963, 6171], [4954, 6186], [4903, 6175], [4905, 6201], [4892, 6223], [4894, 6259], [4890, 6292], [4852, 6292], [4855, 6303], [4823, 6300], [4818, 6271], [4765, 6268], [4742, 6309], [4737, 6332], [4729, 6334], [4636, 6334], [4615, 6328], [4608, 6336], [4616, 6338], [4615, 6357], [4633, 6370], [4641, 6365], [4671, 6380], [4672, 6362], [4685, 6364], [4706, 6387], [4716, 6390], [4726, 6409], [4726, 6443], [4744, 6468], [4771, 6490], [4777, 6519], [4774, 6535], [4780, 6568], [4796, 6597], [4797, 6607], [4794, 6631], [4810, 6649], [4829, 6656], [4855, 6634], [4908, 6626], [4922, 6646], [4937, 6639], [4969, 6654], [4993, 6652], [4995, 6661], [5027, 6653], [5056, 6654], [5066, 6640], [5084, 6630], [5095, 6638], [5107, 6632], [5115, 6641], [5156, 6607], [5152, 6577], [5169, 6569], [5146, 6549], [5146, 6541], [5129, 6528], [5122, 6502], [5111, 6491], [5121, 6491], [5118, 6478], [5119, 6465], [5113, 6461], [5109, 6456], [5100, 6447], [5098, 6433], [5099, 6428], [5102, 6426], [5109, 6416], [5108, 6408]]] } }, { "type": "Feature", "id": "MK", "properties": { "hc-group": "admin0", "hc-middle-x": 0.50, "hc-middle-y": 0.48, "hc-key": "mk", "hc-a2": "MK", "name": "Macedonia", "labelrank": "6", "country-abbrev": "Mkd.", "subregion": "Southern Europe", "region-wb": "Europe & Central Asia", "iso-a3": "MKD", "iso-a2": "MK", "woe-id": "23424890", "continent": "Europe" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[4865, 7774], [4865, 7774], [4865, 7774], [4861, 7775], [4858, 7774], [4861, 7782], [4856, 7780], [4850, 7797], [4854, 7808], [4869, 7820], [4883, 7821], [4904, 7826], [4906, 7824], [4921, 7813], [4923, 7789], [4917, 7783], [4893, 7781], [4870, 7773], [4865, 7778], [4865, 7774], [4865, 7774]]], [[[4865, 7773], [4866, 7773], [4865, 7773], [4865, 7773]]], [[[4865, 7774], [4865, 7774], [4865, 7774], [4865, 7774], [4865, 7774]]]] } }, { "type": "Feature", "id": "AL", "properties": { "hc-group": "admin0", "hc-middle-x": 0.39, "hc-middle-y": 0.49, "hc-key": "al", "hc-a2": "AL", "name": "Albania", "labelrank": "6", "country-abbrev": "Alb.", "subregion": "Southern Europe", "region-wb": "Europe & Central Asia", "iso-a3": "ALB", "iso-a2": "AL", "woe-id": "23424742", "continent": "Europe" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[4865, 7774], [4865, 7774], [4865, 7774], [4865, 7774], [4865, 7774], [4865, 7774], [4865, 7774]]], [[[4856, 7780], [4856, 7775], [4858, 7774], [4861, 7775], [4865, 7774], [4864, 7774], [4865, 7773], [4865, 7773], [4864, 7770], [4865, 7770], [4865, 7769], [4867, 7767], [4866, 7766], [4867, 7767], [4849, 7737], [4837, 7732], [4822, 7750], [4817, 7765], [4822, 7774], [4818, 7807], [4818, 7811], [4818, 7816], [4822, 7818], [4819, 7824], [4828, 7836], [4839, 7832], [4852, 7820], [4854, 7808], [4850, 7797], [4856, 7780]]], [[[4818, 7823], [4818, 7823], [4818, 7823], [4818, 7823]]]] } }, { "type": "Feature", "id": "CM", "properties": { "hc-group": "admin0", "hc-middle-x": 0.27, "hc-middle-y": 0.67, "hc-key": "cm", "hc-a2": "CM", "name": "Cameroon", "labelrank": "3", "country-abbrev": "Cam.", "subregion": "Middle Africa", "region-wb": "Sub-Saharan Africa", "iso-a3": "CMR", "iso-a2": "CM", "woe-id": "23424785", "continent": "Africa" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[4670, 6890], [4668, 6884], [4675, 6887], [4684, 6877], [4694, 6844], [4692, 6822], [4710, 6798], [4666, 6798], [4659, 6788], [4695, 6754], [4704, 6726], [4696, 6718], [4678, 6679], [4681, 6640], [4695, 6615], [4722, 6589], [4725, 6571], [4724, 6556], [4677, 6570], [4640, 6568], [4638, 6572], [4582, 6572], [4582, 6569], [4542, 6569], [4537, 6574], [4541, 6595], [4531, 6621], [4512, 6625], [4501, 6646], [4501, 6646], [4509, 6676], [4546, 6710], [4560, 6712], [4575, 6694], [4579, 6696], [4584, 6697], [4587, 6699], [4589, 6703], [4589, 6706], [4589, 6707], [4607, 6739], [4608, 6751], [4625, 6764], [4627, 6780], [4637, 6785], [4638, 6801], [4660, 6836], [4678, 6843], [4680, 6863], [4666, 6869], [4662, 6890], [4670, 6890]]], [[[4671, 6890], [4672, 6889], [4671, 6890], [4671, 6890]]]] } }, { "type": "Feature", "id": "BJ", "properties": { "hc-group": "admin0", "hc-middle-x": 0.57, "hc-middle-y": 0.50, "hc-key": "bj", "hc-a2": "BJ", "name": "Benin", "labelrank": "5", "country-abbrev": "Benin", "subregion": "Western Africa", "region-wb": "Sub-Saharan Africa", "iso-a3": "BEN", "iso-a2": "BJ", "woe-id": "23424764", "continent": "Africa" }, "geometry": { "type": "Polygon", "coordinates": [[[4328, 6692], [4304, 6689], [4296, 6687], [4295, 6771], [4287, 6799], [4271, 6809], [4275, 6828], [4291, 6842], [4307, 6841], [4319, 6855], [4318, 6864], [4332, 6870], [4354, 6849], [4351, 6840], [4361, 6816], [4352, 6794], [4330, 6771], [4327, 6736], [4328, 6692]]] } }, { "type": "Feature", "id": "GE", "properties": { "hc-group": "admin0", "hc-middle-x": 0.25, "hc-middle-y": 0.45, "hc-key": "ge", "hc-a2": "GE", "name": "Georgia", "labelrank": "5", "country-abbrev": "Geo.", "subregion": "Western Asia", "region-wb": "Europe & Central Asia", "iso-a3": "GEO", "iso-a2": "GE", "woe-id": "23424823", "continent": "Asia" }, "geometry": { "type": "Polygon", "coordinates": [[[5594, 7831], [5591, 7821], [5615, 7809], [5608, 7801], [5623, 7787], [5617, 7779], [5587, 7793], [5573, 7788], [5549, 7786], [5527, 7781], [5509, 7798], [5498, 7793], [5471, 7796], [5478, 7806], [5470, 7835], [5451, 7850], [5425, 7862], [5445, 7867], [5472, 7856], [5497, 7856], [5538, 7839], [5542, 7832], [5569, 7840], [5574, 7837], [5577, 7837], [5579, 7837], [5594, 7831]]] } }, { "type": "Feature", "id": "TL", "properties": { "hc-group": "admin0", "hc-middle-x": 0.63, "hc-middle-y": 0.31, "hc-key": "tl", "hc-a2": "TL", "name": "East Timor", "labelrank": "5", "country-abbrev": "T.L.", "subregion": "South-Eastern Asia", "region-wb": "East Asia & Pacific", "iso-a3": "TLS", "iso-a2": "TL", "woe-id": "23424968", "continent": "Asia" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[7900, 6231], [7905, 6234], [7912, 6236], [7907, 6226], [7900, 6231]]], [[[7926, 6242], [7933, 6252], [7986, 6262], [7997, 6258], [7971, 6243], [7930, 6227], [7928, 6236], [7926, 6242]]]] } }, { "type": "Feature", "id": "TM", "properties": { "hc-group": "admin0", "hc-middle-x": 0.38, "hc-middle-y": 0.41, "hc-key": "tm", "hc-a2": "TM", "name": "Turkmenistan", "labelrank": "4", "country-abbrev": "Turkm.", "subregion": "Central Asia", "region-wb": "Europe & Central Asia", "iso-a3": "TKM", "iso-a2": "TM", "woe-id": "23424972", "continent": "Asia" }, "geometry": { "type": "Polygon", "coordinates": [[[5928, 7810], [5936, 7797], [5952, 7802], [5945, 7818], [5960, 7835], [5974, 7840], [5999, 7823], [6016, 7820], [6018, 7791], [6027, 7786], [6070, 7782], [6087, 7743], [6136, 7707], [6142, 7707], [6180, 7682], [6208, 7675], [6207, 7653], [6184, 7660], [6177, 7648], [6164, 7648], [6146, 7615], [6113, 7602], [6105, 7588], [6083, 7578], [6075, 7587], [6052, 7594], [6046, 7628], [6025, 7628], [6015, 7641], [5979, 7664], [5937, 7673], [5933, 7683], [5910, 7683], [5906, 7677], [5880, 7677], [5861, 7658], [5836, 7652], [5833, 7692], [5837, 7705], [5826, 7720], [5825, 7741], [5801, 7745], [5807, 7777], [5830, 7765], [5848, 7768], [5859, 7782], [5841, 7794], [5835, 7815], [5813, 7816], [5803, 7804], [5803, 7791], [5792, 7804], [5808, 7817], [5844, 7824], [5865, 7810], [5880, 7788], [5896, 7789], [5927, 7786], [5928, 7810]]] } }, { "type": "Feature", "id": "KH", "properties": { "hc-group": "admin0", "hc-middle-x": 0.84, "hc-middle-y": 0.48, "hc-key": "kh", "hc-a2": "KH", "name": "Cambodia", "labelrank": "3", "country-abbrev": "Camb.", "subregion": "South-Eastern Asia", "region-wb": "East Asia & Pacific", "iso-a3": "KHM", "iso-a2": "KH", "woe-id": "23424776", "continent": "Asia" }, "geometry": { "type": "Polygon", "coordinates": [[[7324, 6811], [7299, 6813], [7301, 6830], [7284, 6826], [7278, 6847], [7274, 6870], [7266, 6877], [7261, 6904], [7283, 6926], [7333, 6930], [7345, 6928], [7367, 6915], [7368, 6928], [7384, 6935], [7397, 6927], [7414, 6938], [7408, 6921], [7416, 6903], [7414, 6868], [7382, 6848], [7370, 6851], [7362, 6829], [7341, 6826], [7324, 6811]]] } }, { "type": "Feature", "id": "PE", "properties": { "hc-group": "admin0", "hc-middle-x": 0.38, "hc-middle-y": 0.45, "hc-key": "pe", "hc-a2": "PE", "name": "Peru", "labelrank": "2", "country-abbrev": "Peru", "subregion": "South America", "region-wb": "Latin America & Caribbean", "iso-a3": "PER", "iso-a2": "PE", "woe-id": "23424919", "continent": "South America" }, "geometry": { "type": "Polygon", "coordinates": [[[2218, 6027], [2214, 6018], [2215, 6017], [2197, 5994], [2202, 5988], [2191, 5981], [2188, 5965], [2176, 5963], [2146, 5982], [2143, 5995], [2118, 6010], [2078, 6027], [2034, 6052], [2002, 6087], [2004, 6112], [1977, 6150], [1972, 6168], [1950, 6201], [1923, 6264], [1908, 6279], [1889, 6310], [1860, 6327], [1867, 6340], [1857, 6353], [1856, 6381], [1883, 6406], [1888, 6392], [1879, 6388], [1907, 6373], [1920, 6358], [1932, 6372], [1941, 6405], [1956, 6418], [1990, 6430], [2023, 6461], [2032, 6490], [2021, 6502], [2032, 6502], [2045, 6500], [2059, 6480], [2080, 6468], [2093, 6453], [2093, 6440], [2117, 6434], [2136, 6443], [2145, 6436], [2158, 6441], [2186, 6426], [2166, 6395], [2178, 6393], [2188, 6381], [2163, 6383], [2135, 6374], [2101, 6355], [2092, 6327], [2095, 6317], [2076, 6303], [2069, 6284], [2100, 6239], [2092, 6229], [2119, 6225], [2122, 6212], [2146, 6212], [2169, 6225], [2168, 6182], [2200, 6184], [2226, 6138], [2217, 6127], [2220, 6087], [2205, 6064], [2206, 6048], [2189, 6051], [2187, 6038], [2213, 6026], [2215, 6027], [2218, 6027]]] } }, { "type": "Feature", "id": "MW", "properties": { "hc-group": "admin0", "hc-middle-x": 0.77, "hc-middle-y": 0.90, "hc-key": "mw", "hc-a2": "MW", "name": "Malawi", "labelrank": "6", "country-abbrev": "Mal.", "subregion": "Eastern Africa", "region-wb": "Sub-Saharan Africa", "iso-a3": "MWI", "iso-a2": "MW", "woe-id": "23424889", "continent": "Africa" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[5276, 6170], [5276, 6170], [5276, 6170], [5276, 6170]]], [[[5271, 6174], [5271, 6175], [5270, 6175], [5271, 6174]]], [[[5258, 6220], [5255, 6223], [5255, 6223], [5258, 6220]]], [[[5252, 6226], [5252, 6226], [5252, 6226], [5252, 6226]]], [[[5217, 6229], [5232, 6223], [5247, 6220], [5257, 6199], [5259, 6162], [5250, 6147], [5259, 6111], [5286, 6081], [5274, 6108], [5304, 6073], [5302, 6033], [5283, 6017], [5287, 5999], [5256, 6036], [5266, 6055], [5259, 6081], [5239, 6075], [5226, 6093], [5214, 6102], [5219, 6131], [5231, 6137], [5227, 6148], [5229, 6188], [5240, 6195], [5231, 6215], [5217, 6229]]]] } }, { "type": "Feature", "id": "MN", "properties": { "hc-group": "admin0", "hc-middle-x": 0.49, "hc-middle-y": 0.52, "hc-key": "mn", "hc-a2": "MN", "name": "Mongolia", "labelrank": "3", "country-abbrev": "Mong.", "subregion": "Eastern Asia", "region-wb": "East Asia & Pacific", "iso-a3": "MNG", "iso-a2": "MN", "woe-id": "23424887", "continent": "Asia" }, "geometry": { "type": "Polygon", "coordinates": [[[7708, 8022], [7719, 8025], [7715, 8030], [7738, 8029], [7772, 7999], [7778, 7983], [7772, 7978], [7746, 7984], [7729, 7983], [7702, 7969], [7681, 7968], [7669, 7946], [7653, 7936], [7620, 7934], [7594, 7911], [7546, 7923], [7528, 7899], [7544, 7873], [7514, 7858], [7499, 7840], [7472, 7829], [7433, 7829], [7392, 7823], [7346, 7804], [7325, 7801], [7325, 7808], [7302, 7804], [7283, 7813], [7252, 7819], [7241, 7831], [7193, 7837], [7177, 7833], [7110, 7841], [7085, 7839], [7072, 7856], [7056, 7894], [7046, 7893], [7014, 7908], [7002, 7918], [6947, 7922], [6924, 7927], [6917, 7938], [6928, 7957], [6929, 7977], [6908, 8018], [6885, 8032], [6870, 8030], [6837, 8053], [6834, 8075], [6844, 8085], [6865, 8085], [6889, 8095], [6887, 8103], [6966, 8139], [6976, 8133], [7023, 8128], [7034, 8107], [7061, 8102], [7071, 8107], [7113, 8096], [7137, 8109], [7142, 8127], [7128, 8145], [7135, 8163], [7160, 8189], [7193, 8174], [7207, 8174], [7257, 8158], [7261, 8128], [7300, 8112], [7349, 8125], [7388, 8119], [7405, 8107], [7426, 8104], [7426, 8094], [7444, 8081], [7462, 8082], [7508, 8074], [7526, 8082], [7576, 8091], [7581, 8100], [7613, 8117], [7645, 8103], [7670, 8107], [7684, 8100], [7649, 8035], [7659, 8020], [7689, 8026], [7708, 8022]]] } }, { "type": "Feature", "id": "AO", "properties": { "hc-group": "admin0", "hc-middle-x": 0.50, "hc-middle-y": 0.67, "hc-key": "ao", "hc-a2": "AO", "name": "Angola", "labelrank": "3", "country-abbrev": "Ang.", "subregion": "Middle Africa", "region-wb": "Sub-Saharan Africa", "iso-a3": "AGO", "iso-a2": "AO", "woe-id": "23424745", "continent": "Africa" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[4608, 6336], [4608, 6345], [4602, 6358], [4627, 6376], [4633, 6370], [4615, 6357], [4616, 6338], [4608, 6336]]], [[[4636, 6334], [4729, 6334], [4737, 6332], [4742, 6309], [4765, 6268], [4818, 6271], [4823, 6300], [4855, 6303], [4852, 6292], [4890, 6292], [4894, 6259], [4892, 6223], [4905, 6201], [4903, 6175], [4954, 6186], [4955, 6123], [4895, 6123], [4895, 6028], [4899, 6017], [4937, 5984], [4878, 5973], [4861, 5972], [4801, 5981], [4791, 5991], [4659, 5991], [4636, 6005], [4618, 5996], [4595, 5996], [4594, 6039], [4601, 6045], [4609, 6071], [4617, 6110], [4650, 6145], [4656, 6179], [4653, 6193], [4637, 6220], [4631, 6238], [4642, 6248], [4642, 6261], [4626, 6292], [4626, 6303], [4610, 6326], [4636, 6334]]]] } }, { "type": "Feature", "id": "MZ", "properties": { "hc-group": "admin0", "hc-middle-x": 0.48, "hc-middle-y": 0.81, "hc-key": "mz", "hc-a2": "MZ", "name": "Mozambique", "labelrank": "3", "country-abbrev": "Moz.", "subregion": "Eastern Africa", "region-wb": "Sub-Saharan Africa", "iso-a3": "MOZ", "iso-a2": "MZ", "woe-id": "23424902", "continent": "Africa" }, "geometry": { "type": "Polygon", "coordinates": [[[5274, 6108], [5270, 6147], [5278, 6165], [5303, 6170], [5314, 6161], [5332, 6165], [5350, 6161], [5363, 6173], [5381, 6170], [5426, 6188], [5439, 6198], [5444, 6187], [5439, 6163], [5443, 6124], [5442, 6104], [5451, 6079], [5443, 6049], [5423, 6021], [5400, 6007], [5364, 5992], [5340, 5977], [5322, 5956], [5271, 5916], [5269, 5899], [5278, 5890], [5293, 5848], [5293, 5786], [5282, 5771], [5241, 5755], [5216, 5741], [5206, 5729], [5215, 5718], [5217, 5700], [5201, 5700], [5194, 5701], [5191, 5718], [5189, 5728], [5190, 5776], [5176, 5807], [5169, 5839], [5202, 5873], [5205, 5895], [5220, 5911], [5213, 5929], [5221, 5963], [5219, 6013], [5188, 6020], [5169, 6032], [5143, 6033], [5143, 6044], [5138, 6064], [5226, 6093], [5239, 6075], [5259, 6081], [5266, 6055], [5256, 6036], [5287, 5999], [5283, 6017], [5302, 6033], [5304, 6073], [5274, 6108]]] } }, { "type": "Feature", "id": "ZA", "properties": { "hc-group": "admin0", "hc-middle-x": 0.36, "hc-middle-y": 0.70, "hc-key": "za", "hc-a2": "ZA", "name": "South Africa", "labelrank": "2", "country-abbrev": "S.Af.", "subregion": "Southern Africa", "region-wb": "Sub-Saharan Africa", "iso-a3": "ZAF", "iso-a2": "ZA", "woe-id": "23424942", "continent": "Africa" }, "geometry": { "type": "Polygon", "coordinates": [[[5194, 5701], [5201, 5700], [5217, 5700], [5201, 5646], [5183, 5633], [5166, 5614], [5143, 5573], [5098, 5526], [5070, 5502], [5029, 5478], [5004, 5477], [5005, 5469], [4983, 5471], [4980, 5464], [4944, 5471], [4937, 5467], [4913, 5470], [4887, 5457], [4864, 5458], [4836, 5443], [4803, 5465], [4787, 5465], [4793, 5475], [4774, 5509], [4786, 5515], [4783, 5547], [4757, 5589], [4743, 5630], [4734, 5646], [4746, 5661], [4759, 5657], [4761, 5642], [4783, 5635], [4810, 5634], [4837, 5652], [4836, 5766], [4848, 5757], [4862, 5723], [4857, 5699], [4887, 5700], [4917, 5728], [4926, 5749], [4939, 5749], [4953, 5739], [4978, 5732], [5002, 5739], [5010, 5766], [5026, 5770], [5039, 5782], [5043, 5800], [5065, 5814], [5077, 5829], [5112, 5845], [5140, 5841], [5169, 5839], [5176, 5807], [5190, 5776], [5189, 5728], [5173, 5735], [5154, 5712], [5166, 5689], [5189, 5686], [5194, 5701]], [[5084, 5644], [5065, 5635], [5044, 5612], [5065, 5581], [5075, 5579], [5079, 5592], [5106, 5603], [5115, 5621], [5091, 5646], [5084, 5644]]] } }, { "type": "Feature", "id": "CR", "properties": { "hc-group": "admin0", "hc-middle-x": 0.15, "hc-middle-y": 0.06, "hc-key": "cr", "hc-a2": "CR", "name": "Costa Rica", "labelrank": "5", "country-abbrev": "C.R.", "subregion": "Central America", "region-wb": "Latin America & Caribbean", "iso-a3": "CRI", "iso-a2": "CR", "woe-id": "23424791", "continent": "North America" }, "geometry": { "type": "Polygon", "coordinates": [[[1785, 6826], [1791, 6813], [1817, 6786], [1809, 6787], [1807, 6741], [1799, 6758], [1753, 6798], [1742, 6785], [1727, 6796], [1720, 6809], [1725, 6831], [1755, 6830], [1777, 6820], [1785, 6826]]] } }, { "type": "Feature", "id": "SV", "properties": { "hc-group": "admin0", "hc-middle-x": 0.50, "hc-middle-y": 0.51, "hc-key": "sv", "hc-a2": "SV", "name": "El Salvador", "labelrank": "6", "country-abbrev": "El. S.", "subregion": "Central America", "region-wb": "Latin America & Caribbean", "iso-a3": "SLV", "iso-a2": "SV", "woe-id": "23424807", "continent": "North America" }, "geometry": { "type": "Polygon", "coordinates": [[[1663, 6900], [1659, 6892], [1634, 6895], [1596, 6909], [1595, 6913], [1617, 6930], [1643, 6913], [1666, 6912], [1663, 6900]]] } }, { "type": "Feature", "id": "LY", "properties": { "hc-group": "admin0", "hc-middle-x": 0.50, "hc-middle-y": 0.39, "hc-key": "ly", "hc-a2": "LY", "name": "Libya", "labelrank": "3", "country-abbrev": "Libya", "subregion": "Northern Africa", "region-wb": "Middle East & North Africa", "iso-a3": "LBY", "iso-a2": "LY", "woe-id": "23424882", "continent": "Africa" }, "geometry": { "type": "Polygon", "coordinates": [[[4984, 7159], [4984, 7098], [4954, 7098], [4954, 7083], [4719, 7204], [4689, 7190], [4667, 7178], [4645, 7196], [4601, 7206], [4589, 7229], [4564, 7238], [4554, 7236], [4544, 7248], [4542, 7264], [4525, 7287], [4538, 7299], [4534, 7324], [4541, 7342], [4536, 7355], [4537, 7382], [4522, 7414], [4528, 7417], [4539, 7422], [4551, 7440], [4546, 7456], [4568, 7479], [4589, 7490], [4587, 7513], [4612, 7502], [4641, 7504], [4696, 7487], [4704, 7464], [4721, 7451], [4759, 7445], [4783, 7435], [4807, 7419], [4818, 7420], [4838, 7436], [4841, 7449], [4835, 7466], [4839, 7480], [4854, 7493], [4884, 7505], [4900, 7506], [4928, 7496], [4928, 7485], [4957, 7475], [4984, 7474], [4989, 7464], [4980, 7455], [4984, 7435], [4975, 7415], [4984, 7384], [4984, 7159]]] } }, { "type": "Feature", "id": "SD", "properties": { "hc-group": "admin0", "hc-middle-x": 0.50, "hc-middle-y": 0.38, "hc-key": "sd", "hc-a2": "SD", "name": "Sudan", "labelrank": "3", "country-abbrev": "Sudan", "subregion": "Northern Africa", "region-wb": "Sub-Saharan Africa", "iso-a3": "SDN", "iso-a2": "SD", "woe-id": "-90", "continent": "Africa" }, "geometry": { "type": "Polygon", "coordinates": [[[4954, 7083], [4954, 7098], [4984, 7098], [4984, 7159], [5168, 7159], [5334, 7159], [5341, 7137], [5347, 7073], [5354, 7059], [5385, 7038], [5373, 7023], [5338, 7009], [5336, 6985], [5321, 6951], [5324, 6925], [5311, 6878], [5297, 6875], [5280, 6851], [5277, 6824], [5266, 6825], [5251, 6783], [5246, 6804], [5225, 6824], [5222, 6846], [5226, 6864], [5193, 6858], [5200, 6849], [5203, 6830], [5168, 6792], [5153, 6791], [5132, 6807], [5097, 6779], [5074, 6779], [5069, 6787], [5030, 6784], [5009, 6811], [4987, 6807], [4978, 6793], [4971, 6766], [4960, 6760], [4940, 6763], [4944, 6796], [4921, 6826], [4923, 6840], [4912, 6848], [4914, 6860], [4894, 6889], [4904, 6897], [4898, 6911], [4912, 6921], [4907, 6934], [4916, 6938], [4928, 6968], [4954, 6969], [4954, 7083]]] } }, { "type": "Feature", "id": "KP", "properties": { "hc-group": "admin0", "hc-middle-x": 0.33, "hc-middle-y": 0.70, "hc-key": "kp", "hc-a2": "KP", "name": "North Korea", "labelrank": "3", "country-abbrev": "N.K.", "subregion": "Eastern Asia", "region-wb": "East Asia & Pacific", "iso-a3": "PRK", "iso-a2": "KP", "woe-id": "23424865", "continent": "Asia" }, "geometry": { "type": "Polygon", "coordinates": [[[7978, 7668], [7946, 7675], [7947, 7666], [7919, 7678], [7942, 7719], [7937, 7726], [7910, 7738], [7910, 7746], [7925, 7760], [7958, 7774], [7976, 7801], [7985, 7806], [7995, 7795], [8021, 7791], [8018, 7812], [8043, 7814], [8056, 7828], [8067, 7828], [8071, 7847], [8079, 7847], [8091, 7831], [8095, 7826], [8096, 7823], [8088, 7824], [8065, 7797], [8067, 7772], [8053, 7767], [8036, 7750], [8003, 7734], [8001, 7714], [8028, 7695], [8018, 7685], [7992, 7685], [7978, 7668], [7978, 7668]]] } }, { "type": "Feature", "id": "KR", "properties": { "hc-group": "admin0", "hc-middle-x": 0.49, "hc-middle-y": 0.49, "hc-key": "kr", "hc-a2": "KR", "name": "South Korea", "labelrank": "2", "country-abbrev": "S.K.", "subregion": "Eastern Asia", "region-wb": "East Asia & Pacific", "iso-a3": "KOR", "iso-a2": "KR", "woe-id": "23424868", "continent": "Asia" }, "geometry": { "type": "Polygon", "coordinates": [[[7992, 7685], [8018, 7685], [8028, 7695], [8056, 7650], [8063, 7609], [8052, 7578], [8029, 7565], [7994, 7564], [7978, 7546], [7986, 7521], [7966, 7514], [7967, 7523], [7982, 7526], [7960, 7575], [7971, 7577], [7972, 7594], [7982, 7602], [7973, 7612], [7968, 7633], [7985, 7638], [7982, 7650], [7966, 7664], [7978, 7668], [7978, 7668], [7978, 7668], [7978, 7672], [7992, 7685]]] } }, { "type": "Feature", "id": "GY", "properties": { "hc-group": "admin0", "hc-middle-x": 0.26, "hc-middle-y": 0.07, "hc-key": "gy", "hc-a2": "GY", "name": "Guyana", "labelrank": "4", "country-abbrev": "Guy.", "subregion": "South America", "region-wb": "Latin America & Caribbean", "iso-a3": "GUY", "iso-a2": "GY", "woe-id": "23424836", "continent": "South America" }, "geometry": { "type": "Polygon", "coordinates": [[[2481, 6756], [2506, 6741], [2527, 6719], [2528, 6706], [2538, 6705], [2565, 6683], [2563, 6666], [2562, 6652], [2549, 6651], [2538, 6627], [2553, 6603], [2561, 6605], [2565, 6588], [2585, 6562], [2567, 6564], [2553, 6555], [2531, 6552], [2525, 6542], [2504, 6545], [2489, 6559], [2482, 6584], [2486, 6611], [2495, 6620], [2491, 6633], [2477, 6637], [2482, 6654], [2460, 6657], [2441, 6678], [2448, 6702], [2473, 6713], [2463, 6717], [2467, 6734], [2487, 6748], [2481, 6756]]] } }, { "type": "Feature", "id": "HN", "properties": { "hc-group": "admin0", "hc-middle-x": 0.71, "hc-middle-y": 0.09, "hc-key": "hn", "hc-a2": "HN", "name": "Honduras", "labelrank": "5", "country-abbrev": "Hond.", "subregion": "Central America", "region-wb": "Latin America & Caribbean", "iso-a3": "HND", "iso-a2": "HN", "woe-id": "23424841", "continent": "North America" }, "geometry": { "type": "Polygon", "coordinates": [[[1651, 6969], [1665, 6975], [1706, 6971], [1718, 6977], [1745, 6977], [1766, 6971], [1773, 6958], [1801, 6947], [1761, 6936], [1752, 6941], [1721, 6913], [1713, 6919], [1695, 6910], [1695, 6897], [1677, 6887], [1672, 6896], [1663, 6900], [1666, 6912], [1643, 6913], [1617, 6930], [1621, 6943], [1651, 6969]]] } }, { "type": "Feature", "id": "GA", "properties": { "hc-group": "admin0", "hc-middle-x": 0.36, "hc-middle-y": 0.64, "hc-key": "ga", "hc-a2": "GA", "name": "Gabon", "labelrank": "4", "country-abbrev": "Gabon", "subregion": "Middle Africa", "region-wb": "Sub-Saharan Africa", "iso-a3": "GAB", "iso-a2": "GA", "woe-id": "23424822", "continent": "Africa" }, "geometry": { "type": "Polygon", "coordinates": [[[4582, 6569], [4582, 6572], [4638, 6572], [4640, 6568], [4638, 6541], [4666, 6546], [4674, 6532], [4657, 6511], [4655, 6499], [4675, 6487], [4674, 6460], [4663, 6432], [4653, 6444], [4645, 6434], [4630, 6436], [4625, 6449], [4614, 6450], [4615, 6437], [4588, 6436], [4592, 6412], [4575, 6390], [4561, 6408], [4540, 6426], [4521, 6450], [4524, 6466], [4514, 6467], [4504, 6488], [4521, 6493], [4522, 6523], [4537, 6534], [4582, 6534], [4582, 6569]]] } }, { "type": "Feature", "id": "NI", "properties": { "hc-group": "admin0", "hc-middle-x": 0.84, "hc-middle-y": 0.49, "hc-key": "ni", "hc-a2": "NI", "name": "Nicaragua", "labelrank": "5", "country-abbrev": "Nic.", "subregion": "Central America", "region-wb": "Latin America & Caribbean", "iso-a3": "NIC", "iso-a2": "NI", "woe-id": "23424915", "continent": "North America" }, "geometry": { "type": "Polygon", "coordinates": [[[1725, 6831], [1701, 6851], [1693, 6864], [1668, 6884], [1677, 6887], [1695, 6897], [1695, 6910], [1713, 6919], [1721, 6913], [1752, 6941], [1761, 6936], [1801, 6947], [1792, 6916], [1779, 6839], [1785, 6826], [1777, 6820], [1755, 6830], [1725, 6831]]] } }, { "type": "Feature", "id": "ET", "properties": { "hc-group": "admin0", "hc-middle-x": 0.45, "hc-middle-y": 0.58, "hc-key": "et", "hc-a2": "ET", "name": "Ethiopia", "labelrank": "2", "country-abbrev": "Eth.", "subregion": "Eastern Africa", "region-wb": "Sub-Saharan Africa", "iso-a3": "ETH", "iso-a2": "ET", "woe-id": "23424808", "continent": "Africa" }, "geometry": { "type": "Polygon", "coordinates": [[[5478, 6837], [5475, 6834], [5478, 6831], [5483, 6826], [5512, 6828], [5504, 6817], [5527, 6781], [5544, 6769], [5631, 6740], [5661, 6740], [5615, 6695], [5571, 6649], [5543, 6650], [5518, 6641], [5508, 6631], [5481, 6622], [5459, 6621], [5448, 6631], [5421, 6618], [5412, 6605], [5370, 6611], [5333, 6635], [5306, 6640], [5302, 6661], [5288, 6662], [5271, 6700], [5241, 6730], [5221, 6734], [5225, 6752], [5248, 6753], [5251, 6783], [5266, 6825], [5277, 6824], [5280, 6851], [5297, 6875], [5311, 6878], [5324, 6925], [5346, 6931], [5354, 6921], [5364, 6944], [5380, 6930], [5399, 6936], [5429, 6931], [5450, 6920], [5496, 6872], [5477, 6844], [5478, 6837]]] } }, { "type": "Feature", "id": "SO", "properties": { "hc-group": "admin0", "hc-middle-x": 0.39, "hc-middle-y": 0.74, "hc-key": "so", "hc-a2": "SO", "name": "Somalia", "labelrank": "6", "country-abbrev": "Som.", "subregion": "Eastern Africa", "region-wb": "Sub-Saharan Africa", "iso-a3": "SOM", "iso-a2": "SO", "woe-id": "-90", "continent": "Africa" }, "geometry": { "type": "Polygon", "coordinates": [[[5481, 6622], [5508, 6631], [5518, 6641], [5543, 6650], [5571, 6649], [5615, 6695], [5661, 6740], [5689, 6782], [5689, 6836], [5728, 6846], [5744, 6858], [5758, 6853], [5752, 6834], [5755, 6815], [5748, 6808], [5745, 6783], [5716, 6739], [5692, 6685], [5660, 6636], [5603, 6576], [5560, 6551], [5528, 6523], [5487, 6480], [5471, 6456], [5455, 6480], [5455, 6588], [5481, 6622]]] } }, { "type": "Feature", "id": "KE", "properties": { "hc-group": "admin0", "hc-middle-x": 0.87, "hc-middle-y": 0.70, "hc-key": "ke", "hc-a2": "KE", "name": "Kenya", "labelrank": "2", "country-abbrev": "Ken.", "subregion": "Eastern Africa", "region-wb": "Sub-Saharan Africa", "iso-a3": "KEN", "iso-a2": "KE", "woe-id": "23424863", "continent": "Africa" }, "geometry": { "type": "Polygon", "coordinates": [[[5481, 6622], [5455, 6588], [5455, 6480], [5471, 6456], [5452, 6446], [5432, 6418], [5408, 6370], [5402, 6368], [5355, 6402], [5357, 6416], [5251, 6474], [5257, 6497], [5249, 6512], [5278, 6554], [5276, 6578], [5249, 6629], [5260, 6640], [5291, 6652], [5306, 6640], [5333, 6635], [5370, 6611], [5412, 6605], [5421, 6618], [5448, 6631], [5459, 6621], [5481, 6622]]] } }, { "type": "Feature", "id": "GH", "properties": { "hc-group": "admin0", "hc-middle-x": 0.13, "hc-middle-y": 0.78, "hc-key": "gh", "hc-a2": "GH", "name": "Ghana", "labelrank": "3", "country-abbrev": "Ghana", "subregion": "Western Africa", "region-wb": "Sub-Saharan Africa", "iso-a3": "GHA", "iso-a2": "GH", "woe-id": "23424824", "continent": "Africa" }, "geometry": { "type": "Polygon", "coordinates": [[[4283, 6684], [4277, 6676], [4258, 6674], [4225, 6658], [4187, 6644], [4160, 6655], [4167, 6657], [4152, 6699], [4165, 6734], [4174, 6746], [4169, 6784], [4162, 6820], [4167, 6828], [4228, 6828], [4243, 6832], [4246, 6817], [4260, 6807], [4255, 6786], [4264, 6781], [4259, 6761], [4267, 6720], [4263, 6705], [4283, 6684]]] } }, { "type": "Feature", "id": "SI", "properties": { "hc-group": "admin0", "hc-middle-x": 0.52, "hc-middle-y": 0.57, "hc-key": "si", "hc-a2": "SI", "name": "Slovenia", "labelrank": "6", "country-abbrev": "Slo.", "subregion": "Southern Europe", "region-wb": "Europe & Central Asia", "iso-a3": "SVN", "iso-a2": "SI", "woe-id": "23424945", "continent": "Europe" }, "geometry": { "type": "Polygon", "coordinates": [[[4648, 7938], [4648, 7940], [4652, 7942], [4642, 7967], [4652, 7976], [4676, 7970], [4685, 7979], [4720, 7982], [4722, 7988], [4727, 7988], [4734, 7975], [4709, 7964], [4709, 7950], [4700, 7938], [4648, 7938]]] } }, { "type": "Feature", "id": "GT", "properties": { "hc-group": "admin0", "hc-middle-x": 0.47, "hc-middle-y": 0.47, "hc-key": "gt", "hc-a2": "GT", "name": "Guatemala", "labelrank": "3", "country-abbrev": "Guat.", "subregion": "Central America", "region-wb": "Latin America & Caribbean", "iso-a3": "GTM", "iso-a2": "GT", "woe-id": "23424834", "continent": "North America" }, "geometry": { "type": "Polygon", "coordinates": [[[1630, 6974], [1639, 6976], [1651, 6969], [1621, 6943], [1617, 6930], [1595, 6913], [1596, 6909], [1560, 6916], [1532, 6934], [1533, 6956], [1548, 6979], [1584, 6979], [1587, 6988], [1556, 7015], [1569, 7015], [1570, 7032], [1623, 7032], [1621, 6974], [1630, 6974]]] } }, { "type": "Feature", "id": "BZ", "properties": { "hc-group": "admin0", "hc-middle-x": 0.46, "hc-middle-y": 0.50, "hc-key": "bz", "hc-a2": "BZ", "name": "Belize", "labelrank": "6", "country-abbrev": "Belize", "subregion": "Central America", "region-wb": "Latin America & Caribbean", "iso-a3": "BLZ", "iso-a2": "BZ", "woe-id": "23424760", "continent": "North America" }, "geometry": { "type": "Polygon", "coordinates": [[[1630, 6974], [1621, 6974], [1623, 7032], [1631, 7034], [1648, 7052], [1654, 7049], [1654, 7048], [1649, 7025], [1651, 7006], [1630, 6974]]] } }, { "type": "Feature", "id": "BA", "properties": { "hc-group": "admin0", "hc-middle-x": 0.56, "hc-middle-y": 0.31, "hc-key": "ba", "hc-a2": "BA", "name": "Bosnia and Herzegovina", "labelrank": "5", "country-abbrev": "B.H.", "subregion": "Southern Europe", "region-wb": "Europe & Central Asia", "iso-a3": "BIH", "iso-a2": "BA", "woe-id": "23424761", "continent": "Europe" }, "geometry": { "type": "Polygon", "coordinates": [[[4768, 7844], [4765, 7846], [4766, 7846], [4751, 7866], [4726, 7891], [4713, 7914], [4713, 7926], [4729, 7920], [4746, 7930], [4773, 7922], [4785, 7926], [4808, 7915], [4818, 7916], [4813, 7894], [4826, 7885], [4814, 7882], [4822, 7868], [4813, 7867], [4805, 7866], [4791, 7848], [4791, 7832], [4774, 7842], [4768, 7844]]] } }, { "type": "Feature", "id": "JO", "properties": { "hc-group": "admin0", "hc-middle-x": 0.07, "hc-middle-y": 0.78, "hc-key": "jo", "hc-a2": "JO", "name": "Jordan", "labelrank": "4", "country-abbrev": "Jord.", "subregion": "Western Asia", "region-wb": "Middle East & North Africa", "iso-a3": "JOR", "iso-a2": "JO", "woe-id": "23424860", "continent": "Asia" }, "geometry": { "type": "Polygon", "coordinates": [[[5291, 7445], [5294, 7448], [5290, 7450], [5290, 7451], [5291, 7453], [5295, 7453], [5295, 7467], [5294, 7477], [5295, 7487], [5295, 7496], [5301, 7499], [5332, 7485], [5390, 7520], [5398, 7491], [5401, 7479], [5395, 7475], [5336, 7458], [5366, 7426], [5351, 7410], [5330, 7406], [5309, 7384], [5277, 7389], [5279, 7395], [5277, 7396], [5283, 7424], [5291, 7445]]] } }, { "type": "Feature", "id": "WE", "properties": { "hc-group": "admin0", "hc-middle-x": 0.55, "hc-middle-y": 0.51, "hc-key": "we", "hc-a2": "WE", "name": "West Bank", "labelrank": "4", "country-abbrev": "We. B.", "subregion": "Western Asia", "region-wb": "Middle East & North Africa", "iso-a3": "WEB", "iso-a2": "WE", "woe-id": "-90", "continent": "Asia" }, "geometry": { "type": "Polygon", "coordinates": [[[5295, 7467], [5291, 7463], [5290, 7458], [5275, 7455], [5284, 7468], [5277, 7480], [5285, 7492], [5295, 7487], [5294, 7477], [5295, 7467]]] } }, { "type": "Feature", "id": "IL", "properties": { "hc-group": "admin0", "hc-middle-x": 0.72, "hc-middle-y": 0.11, "hc-key": "il", "hc-a2": "IL", "name": "Israel", "labelrank": "4", "country-abbrev": "Isr.", "subregion": "Western Asia", "region-wb": "Middle East & North Africa", "iso-a3": "ISR", "iso-a2": "IL", "woe-id": "23424852", "continent": "Asia" }, "geometry": { "type": "Polygon", "coordinates": [[[5295, 7487], [5285, 7492], [5277, 7480], [5284, 7468], [5275, 7455], [5290, 7458], [5291, 7453], [5291, 7453], [5290, 7451], [5290, 7450], [5289, 7448], [5291, 7445], [5283, 7424], [5277, 7396], [5276, 7394], [5275, 7394], [5273, 7402], [5257, 7449], [5265, 7459], [5263, 7461], [5274, 7484], [5282, 7510], [5293, 7510], [5303, 7521], [5305, 7506], [5301, 7499], [5295, 7496], [5295, 7487]]] } }, { "type": "Feature", "id": "ZM", "properties": { "hc-group": "admin0", "hc-middle-x": 0.25, "hc-middle-y": 0.67, "hc-key": "zm", "hc-a2": "ZM", "name": "Zambia", "labelrank": "3", "country-abbrev": "Zambia", "subregion": "Eastern Africa", "region-wb": "Sub-Saharan Africa", "iso-a3": "ZMB", "iso-a2": "ZM", "woe-id": "23425003", "continent": "Africa" }, "geometry": { "type": "Polygon", "coordinates": [[[5095, 6017], [5066, 6008], [5044, 5974], [5013, 5973], [4992, 5979], [4983, 5986], [4961, 5989], [4937, 5984], [4899, 6017], [4895, 6028], [4895, 6123], [4955, 6123], [4954, 6186], [4963, 6171], [4992, 6176], [4995, 6163], [5034, 6152], [5048, 6165], [5062, 6144], [5083, 6139], [5107, 6110], [5125, 6110], [5126, 6148], [5117, 6139], [5103, 6141], [5083, 6169], [5091, 6196], [5088, 6230], [5106, 6251], [5099, 6257], [5100, 6257], [5148, 6264], [5145, 6256], [5162, 6247], [5166, 6253], [5190, 6239], [5217, 6229], [5231, 6215], [5240, 6195], [5229, 6188], [5227, 6148], [5231, 6137], [5219, 6131], [5214, 6102], [5226, 6093], [5138, 6064], [5143, 6044], [5114, 6042], [5098, 6032], [5095, 6017]]] } }, { "type": "Feature", "id": "MC", "properties": { "hc-group": "admin0", "hc-middle-x": 0.50, "hc-middle-y": 0.67, "hc-key": "mc", "hc-a2": "MC", "name": "Monaco", "labelrank": "6", "country-abbrev": "Mco.", "subregion": "Western Europe", "region-wb": "Europe & Central Asia", "iso-a3": "MCO", "iso-a2": "MC", "woe-id": "23424892", "continent": "Europe" }, "geometry": { "type": "Polygon", "coordinates": [[[4467, 7875], [4466, 7874], [4465, 7874], [4466, 7875], [4467, 7875]]] } }, { "type": "Feature", "id": "UY", "properties": { "hc-group": "admin0", "hc-middle-x": 0.80, "hc-middle-y": 0.64, "hc-key": "uy", "hc-a2": "UY", "name": "Uruguay", "labelrank": "4", "country-abbrev": "Ury.", "subregion": "South America", "region-wb": "Latin America & Caribbean", "iso-a3": "URY", "iso-a2": "UY", "woe-id": "23424979", "continent": "South America" }, "geometry": { "type": "Polygon", "coordinates": [[[2683, 5514], [2669, 5499], [2672, 5485], [2672, 5482], [2677, 5479], [2665, 5457], [2631, 5438], [2605, 5445], [2590, 5440], [2566, 5455], [2545, 5455], [2529, 5472], [2530, 5498], [2533, 5501], [2536, 5503], [2539, 5506], [2535, 5521], [2538, 5553], [2552, 5594], [2575, 5597], [2599, 5575], [2611, 5573], [2621, 5561], [2641, 5553], [2683, 5514]]] } }, { "type": "Feature", "id": "RW", "properties": { "hc-group": "admin0", "hc-middle-x": 0.48, "hc-middle-y": 0.55, "hc-key": "rw", "hc-a2": "RW", "name": "Rwanda", "labelrank": "3", "country-abbrev": "Rwa.", "subregion": "Eastern Africa", "region-wb": "Sub-Saharan Africa", "iso-a3": "RWA", "iso-a2": "RW", "woe-id": "23424937", "continent": "Africa" }, "geometry": { "type": "Polygon", "coordinates": [[[5145, 6474], [5156, 6459], [5156, 6437], [5148, 6435], [5129, 6437], [5123, 6423], [5102, 6426], [5099, 6428], [5098, 6433], [5113, 6446], [5109, 6456], [5113, 6461], [5119, 6465], [5128, 6462], [5145, 6474]]] } }, { "type": "Feature", "id": "BO", "properties": { "hc-group": "admin0", "hc-middle-x": 0.49, "hc-middle-y": 0.59, "hc-key": "bo", "hc-a2": "BO", "name": "Bolivia", "labelrank": "3", "country-abbrev": "Bolivia", "subregion": "South America", "region-wb": "Latin America & Caribbean", "iso-a3": "BOL", "iso-a2": "BO", "woe-id": "23424762", "continent": "South America" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[2213, 6026], [2216, 6030], [2218, 6027], [2215, 6027], [2213, 6026]]], [[[2202, 5988], [2197, 5994], [2215, 6017], [2228, 6027], [2206, 6048], [2205, 6064], [2220, 6087], [2217, 6127], [2226, 6138], [2200, 6184], [2237, 6183], [2254, 6191], [2286, 6215], [2321, 6221], [2325, 6217], [2323, 6178], [2334, 6153], [2352, 6139], [2391, 6133], [2399, 6123], [2418, 6119], [2427, 6107], [2451, 6109], [2468, 6099], [2478, 6025], [2527, 6023], [2529, 5995], [2547, 5986], [2554, 5967], [2536, 5907], [2535, 5918], [2508, 5934], [2481, 5934], [2430, 5923], [2415, 5895], [2415, 5880], [2404, 5844], [2399, 5851], [2365, 5851], [2354, 5825], [2347, 5845], [2312, 5848], [2298, 5857], [2270, 5826], [2250, 5825], [2240, 5873], [2229, 5886], [2223, 5910], [2231, 5929], [2217, 5944], [2212, 5969], [2202, 5988]]]] } }, { "type": "Feature", "id": "CG", "properties": { "hc-group": "admin0", "hc-middle-x": 0.15, "hc-middle-y": 0.78, "hc-key": "cg", "hc-a2": "CG", "name": "Republic of Congo", "labelrank": "4", "country-abbrev": "Rep. Congo", "subregion": "Middle Africa", "region-wb": "Sub-Saharan Africa", "iso-a3": "COG", "iso-a2": "CG", "woe-id": "23424779", "continent": "Africa" }, "geometry": { "type": "Polygon", "coordinates": [[[4640, 6568], [4677, 6570], [4724, 6556], [4725, 6571], [4736, 6607], [4762, 6614], [4797, 6607], [4796, 6597], [4780, 6568], [4774, 6535], [4777, 6519], [4771, 6490], [4744, 6468], [4726, 6443], [4726, 6409], [4716, 6390], [4706, 6387], [4685, 6364], [4672, 6362], [4671, 6380], [4641, 6365], [4633, 6370], [4627, 6376], [4602, 6358], [4596, 6370], [4575, 6390], [4592, 6412], [4588, 6436], [4615, 6437], [4614, 6450], [4625, 6449], [4630, 6436], [4645, 6434], [4653, 6444], [4663, 6432], [4674, 6460], [4675, 6487], [4655, 6499], [4657, 6511], [4674, 6532], [4666, 6546], [4638, 6541], [4640, 6568]]] } }, { "type": "Feature", "id": "EH", "properties": { "hc-group": "admin0", "hc-middle-x": 0.41, "hc-middle-y": 0.71, "hc-key": "eh", "hc-a2": "EH", "name": "Western Sahara", "labelrank": "7", "country-abbrev": "W. Sah.", "subregion": "Northern Africa", "region-wb": "Middle East & North Africa", "iso-a3": "ESH", "iso-a2": "EH", "woe-id": "23424990", "continent": "Africa" }, "geometry": { "type": "Polygon", "coordinates": [[[3746, 7121], [3745, 7124], [3747, 7141], [3811, 7142], [3829, 7169], [3835, 7203], [3856, 7220], [3864, 7233], [3882, 7247], [3894, 7284], [3903, 7287], [3913, 7311], [3927, 7315], [3962, 7310], [3989, 7319], [3993, 7336], [3993, 7324], [3992, 7283], [3894, 7283], [3894, 7205], [3865, 7191], [3865, 7139], [3749, 7139], [3746, 7121]]] } }, { "type": "Feature", "id": "RS", "properties": { "hc-group": "admin0", "hc-middle-x": 0.43, "hc-middle-y": 0.51, "hc-key": "rs", "hc-a2": "RS", "name": "Republic of Serbia", "labelrank": "5", "country-abbrev": "Serb.", "subregion": "Southern Europe", "region-wb": "Europe & Central Asia", "iso-a3": "SRB", "iso-a2": "RS", "woe-id": "-90", "continent": "Europe" }, "geometry": { "type": "Polygon", "coordinates": [[[4813, 7867], [4822, 7868], [4814, 7882], [4826, 7885], [4813, 7894], [4818, 7916], [4808, 7915], [4809, 7925], [4805, 7954], [4824, 7963], [4844, 7961], [4860, 7947], [4859, 7938], [4881, 7925], [4877, 7915], [4901, 7902], [4908, 7910], [4916, 7892], [4906, 7877], [4925, 7855], [4911, 7843], [4906, 7824], [4904, 7826], [4883, 7821], [4889, 7836], [4878, 7839], [4861, 7857], [4847, 7842], [4826, 7854], [4813, 7867]]] } }, { "type": "Feature", "id": "ME", "properties": { "hc-group": "admin0", "hc-middle-x": 0.42, "hc-middle-y": 0.47, "hc-key": "me", "hc-a2": "ME", "name": "Montenegro", "labelrank": "6", "country-abbrev": "Mont.", "subregion": "Southern Europe", "region-wb": "Europe & Central Asia", "iso-a3": "MNE", "iso-a2": "ME", "woe-id": "20069817", "continent": "Europe" }, "geometry": { "type": "Polygon", "coordinates": [[[4813, 7867], [4826, 7854], [4847, 7842], [4838, 7838], [4839, 7832], [4828, 7836], [4819, 7824], [4819, 7824], [4818, 7823], [4818, 7823], [4812, 7822], [4818, 7816], [4818, 7811], [4818, 7807], [4797, 7829], [4793, 7827], [4791, 7830], [4791, 7832], [4791, 7848], [4805, 7866], [4813, 7867]]] } }, { "type": "Feature", "id": "TG", "properties": { "hc-group": "admin0", "hc-middle-x": 0.76, "hc-middle-y": 0.81, "hc-key": "tg", "hc-a2": "TG", "name": "Togo", "labelrank": "6", "country-abbrev": "Togo", "subregion": "Western Africa", "region-wb": "Sub-Saharan Africa", "iso-a3": "TGO", "iso-a2": "TG", "woe-id": "23424965", "continent": "Africa" }, "geometry": { "type": "Polygon", "coordinates": [[[4275, 6828], [4271, 6809], [4287, 6799], [4295, 6771], [4296, 6687], [4290, 6686], [4283, 6684], [4263, 6705], [4267, 6720], [4259, 6761], [4264, 6781], [4255, 6786], [4260, 6807], [4246, 6817], [4243, 6832], [4262, 6828], [4275, 6828]]] } }, { "type": "Feature", "id": "LA", "properties": { "hc-group": "admin0", "hc-middle-x": 0.88, "hc-middle-y": 0.75, "hc-key": "la", "hc-a2": "LA", "name": "Laos", "labelrank": "4", "country-abbrev": "Laos", "subregion": "South-Eastern Asia", "region-wb": "East Asia & Pacific", "iso-a3": "LAO", "iso-a2": "LA", "woe-id": "23424872", "continent": "Asia" }, "geometry": { "type": "Polygon", "coordinates": [[[7195, 7108], [7214, 7138], [7227, 7146], [7230, 7134], [7243, 7133], [7241, 7173], [7255, 7171], [7280, 7146], [7284, 7125], [7300, 7118], [7312, 7127], [7328, 7118], [7321, 7111], [7338, 7101], [7325, 7086], [7317, 7089], [7306, 7077], [7331, 7061], [7353, 7043], [7361, 7027], [7385, 7006], [7385, 6998], [7407, 6979], [7403, 6970], [7418, 6956], [7414, 6938], [7397, 6927], [7384, 6935], [7368, 6928], [7367, 6915], [7345, 6928], [7352, 6930], [7359, 6966], [7332, 6993], [7334, 7018], [7310, 7047], [7292, 7051], [7271, 7033], [7254, 7044], [7226, 7021], [7219, 7025], [7227, 7039], [7223, 7050], [7231, 7069], [7229, 7085], [7206, 7084], [7209, 7103], [7195, 7108]]] } }, { "type": "Feature", "id": "AF", "properties": { "hc-group": "admin0", "hc-middle-x": 0.38, "hc-middle-y": 0.53, "hc-key": "af", "hc-a2": "AF", "name": "Afghanistan", "labelrank": "3", "country-abbrev": "Afg.", "subregion": "Southern Asia", "region-wb": "South Asia", "iso-a3": "AFG", "iso-a2": "AF", "woe-id": "23424739", "continent": "Asia" }, "geometry": { "type": "Polygon", "coordinates": [[[6453, 7648], [6438, 7645], [6443, 7641], [6430, 7635], [6385, 7634], [6357, 7622], [6343, 7608], [6357, 7580], [6341, 7562], [6340, 7542], [6309, 7542], [6318, 7518], [6296, 7510], [6286, 7488], [6289, 7473], [6273, 7462], [6255, 7469], [6238, 7459], [6243, 7453], [6219, 7452], [6202, 7440], [6197, 7405], [6135, 7390], [6120, 7394], [6088, 7391], [6040, 7406], [6067, 7437], [6064, 7455], [6039, 7458], [6039, 7483], [6031, 7512], [6041, 7525], [6030, 7528], [6029, 7543], [6046, 7567], [6052, 7594], [6075, 7587], [6083, 7578], [6105, 7588], [6113, 7602], [6146, 7615], [6164, 7648], [6177, 7648], [6184, 7660], [6207, 7653], [6228, 7647], [6244, 7647], [6251, 7638], [6279, 7651], [6287, 7644], [6295, 7660], [6314, 7659], [6314, 7672], [6332, 7689], [6348, 7684], [6356, 7671], [6351, 7643], [6357, 7630], [6387, 7641], [6406, 7656], [6416, 7648], [6446, 7654], [6453, 7648]]] } }, { "type": "Feature", "id": "JK", "properties": { "hc-group": "admin0", "hc-middle-x": 0.40, "hc-middle-y": 0.63, "hc-key": "jk", "hc-a2": "JK", "name": "Siachen Glacier", "labelrank": "5", "country-abbrev": "Siachen", "subregion": "Southern Asia", "region-wb": "South Asia", "iso-a3": "-99", "iso-a2": "JK", "woe-id": "23424928", "continent": "Asia" }, "geometry": { "type": "Polygon", "coordinates": [[[6539, 7590], [6517, 7577], [6509, 7595], [6527, 7589], [6539, 7590]]] } }, { "type": "Feature", "id": "PK", "properties": { "hc-group": "admin0", "hc-middle-x": 0.29, "hc-middle-y": 0.74, "hc-key": "pk", "hc-a2": "PK", "name": "Pakistan", "labelrank": "2", "country-abbrev": "Pak.", "subregion": "Southern Asia", "region-wb": "South Asia", "iso-a3": "PAK", "iso-a2": "PK", "woe-id": "23424922", "continent": "Asia" }, "geometry": { "type": "Polygon", "coordinates": [[[6509, 7595], [6517, 7577], [6502, 7564], [6479, 7557], [6435, 7566], [6420, 7552], [6435, 7539], [6426, 7529], [6427, 7513], [6436, 7501], [6447, 7502], [6448, 7490], [6467, 7483], [6441, 7465], [6446, 7445], [6408, 7408], [6395, 7379], [6379, 7371], [6364, 7345], [6334, 7337], [6319, 7347], [6297, 7321], [6293, 7309], [6314, 7300], [6311, 7283], [6328, 7266], [6340, 7242], [6331, 7228], [6324, 7234], [6308, 7226], [6272, 7230], [6272, 7220], [6256, 7216], [6256, 7216], [6256, 7216], [6256, 7216], [6239, 7215], [6225, 7242], [6211, 7247], [6204, 7271], [6182, 7263], [6148, 7261], [6120, 7263], [6118, 7258], [6088, 7260], [6065, 7253], [6061, 7258], [6069, 7291], [6096, 7304], [6107, 7303], [6112, 7318], [6097, 7322], [6095, 7355], [6070, 7364], [6040, 7406], [6088, 7391], [6120, 7394], [6135, 7390], [6197, 7405], [6202, 7440], [6219, 7452], [6243, 7453], [6238, 7459], [6255, 7469], [6273, 7462], [6289, 7473], [6286, 7488], [6296, 7510], [6318, 7518], [6309, 7542], [6340, 7542], [6341, 7562], [6357, 7580], [6343, 7608], [6357, 7622], [6385, 7634], [6430, 7635], [6443, 7641], [6467, 7637], [6485, 7622], [6491, 7600], [6509, 7595]]] } }, { "type": "Feature", "id": "BG", "properties": { "hc-group": "admin0", "hc-middle-x": 0.76, "hc-middle-y": 0.51, "hc-key": "bg", "hc-a2": "BG", "name": "Bulgaria", "labelrank": "4", "country-abbrev": "Bulg.", "subregion": "Eastern Europe", "region-wb": "Europe & Central Asia", "iso-a3": "BGR", "iso-a2": "BG", "woe-id": "23424771", "continent": "Europe" }, "geometry": { "type": "Polygon", "coordinates": [[[5090, 7875], [5086, 7861], [5077, 7863], [5062, 7829], [5073, 7812], [5051, 7816], [5023, 7803], [5017, 7790], [4993, 7786], [4970, 7797], [4923, 7789], [4921, 7813], [4906, 7824], [4911, 7843], [4925, 7855], [4906, 7877], [4916, 7892], [4935, 7880], [4995, 7871], [5018, 7884], [5044, 7890], [5090, 7875]]] } }, { "type": "Feature", "id": "UA", "properties": { "hc-group": "admin0", "hc-middle-x": 0.70, "hc-middle-y": 0.46, "hc-key": "ua", "hc-a2": "UA", "name": "Ukraine", "labelrank": "3", "country-abbrev": "Ukr.", "subregion": "Eastern Europe", "region-wb": "Europe & Central Asia", "iso-a3": "UKR", "iso-a2": "UA", "woe-id": "23424976", "continent": "Europe" }, "geometry": { "type": "Polygon", "coordinates": [[[4912, 8071], [4921, 8068], [4915, 8089], [4928, 8105], [4958, 8127], [4959, 8139], [4943, 8165], [4966, 8180], [5007, 8182], [5051, 8168], [5094, 8161], [5106, 8170], [5111, 8160], [5136, 8164], [5147, 8154], [5147, 8169], [5160, 8187], [5183, 8188], [5201, 8197], [5243, 8198], [5252, 8182], [5255, 8155], [5282, 8152], [5299, 8120], [5326, 8115], [5350, 8123], [5367, 8103], [5372, 8109], [5402, 8101], [5430, 8078], [5416, 8069], [5426, 8041], [5419, 8024], [5391, 8025], [5377, 8016], [5373, 7997], [5355, 7997], [5347, 7989], [5305, 7981], [5273, 7963], [5288, 7934], [5325, 7936], [5321, 7922], [5297, 7924], [5263, 7910], [5248, 7898], [5237, 7906], [5236, 7923], [5217, 7933], [5216, 7943], [5243, 7954], [5227, 7965], [5198, 7961], [5185, 7969], [5206, 7978], [5161, 7979], [5146, 7959], [5124, 7942], [5121, 7928], [5111, 7936], [5095, 7928], [5078, 7937], [5101, 7957], [5100, 7973], [5127, 7969], [5129, 7986], [5118, 7991], [5118, 8005], [5105, 8013], [5109, 8026], [5065, 8048], [5032, 8040], [5019, 8030], [4992, 8027], [4981, 8020], [4971, 8029], [4922, 8029], [4914, 8035], [4900, 8046], [4905, 8057], [4912, 8071]]] } }, { "type": "Feature", "id": "RO", "properties": { "hc-group": "admin0", "hc-middle-x": 0.67, "hc-middle-y": 0.50, "hc-key": "ro", "hc-a2": "RO", "name": "Romania", "labelrank": "3", "country-abbrev": "Rom.", "subregion": "Eastern Europe", "region-wb": "Europe & Central Asia", "iso-a3": "ROU", "iso-a2": "RO", "woe-id": "23424933", "continent": "Europe" }, "geometry": { "type": "Polygon", "coordinates": [[[5121, 7928], [5120, 7915], [5105, 7912], [5091, 7896], [5090, 7875], [5044, 7890], [5018, 7884], [4995, 7871], [4935, 7880], [4916, 7892], [4908, 7910], [4901, 7902], [4877, 7915], [4881, 7925], [4859, 7938], [4860, 7947], [4844, 7961], [4870, 7967], [4896, 8012], [4922, 8029], [4971, 8029], [4981, 8020], [4992, 8027], [5019, 8030], [5032, 8040], [5043, 8037], [5052, 8018], [5079, 7981], [5075, 7957], [5078, 7937], [5095, 7928], [5111, 7936], [5121, 7928]]] } }, { "type": "Feature", "id": "QA", "properties": { "hc-group": "admin0", "hc-middle-x": 0.50, "hc-middle-y": 0.50, "hc-key": "qa", "hc-a2": "QA", "name": "Qatar", "labelrank": "5", "country-abbrev": "Qatar", "subregion": "Western Asia", "region-wb": "Middle East & North Africa", "iso-a3": "QAT", "iso-a2": "QA", "woe-id": "23424930", "continent": "Asia" }, "geometry": { "type": "Polygon", "coordinates": [[[5744, 7244], [5742, 7268], [5757, 7288], [5767, 7280], [5767, 7251], [5756, 7240], [5749, 7239], [5744, 7244]]] } }, { "type": "Feature", "id": "LI", "properties": { "hc-group": "admin0", "hc-middle-x": 0.61, "hc-middle-y": 0.53, "hc-key": "li", "hc-a2": "LI", "name": "Liechtenstein", "labelrank": "6", "country-abbrev": "Liech.", "subregion": "Western Europe", "region-wb": "Europe & Central Asia", "iso-a3": "LIE", "iso-a2": "LI", "woe-id": "23424879", "continent": "Europe" }, "geometry": { "type": "Polygon", "coordinates": [[[4530, 7996], [4527, 7996], [4528, 8003], [4531, 7997], [4530, 7996]]] } }, { "type": "Feature", "id": "AT", "properties": { "hc-group": "admin0", "hc-middle-x": 0.51, "hc-middle-y": 0.61, "hc-key": "at", "hc-a2": "AT", "name": "Austria", "labelrank": "4", "country-abbrev": "Aust.", "subregion": "Western Europe", "region-wb": "Europe & Central Asia", "iso-a3": "AUT", "iso-a2": "AT", "woe-id": "23424750", "continent": "Europe" }, "geometry": { "type": "Polygon", "coordinates": [[[4530, 7996], [4531, 7997], [4528, 8003], [4532, 8009], [4529, 8012], [4533, 8012], [4534, 8014], [4552, 8005], [4555, 8015], [4571, 8008], [4607, 8020], [4632, 8012], [4623, 8035], [4652, 8050], [4655, 8060], [4681, 8053], [4689, 8069], [4747, 8053], [4744, 8044], [4753, 8031], [4751, 8020], [4737, 8021], [4734, 7993], [4722, 7988], [4720, 7982], [4685, 7979], [4676, 7970], [4652, 7976], [4613, 7982], [4605, 7993], [4581, 7993], [4572, 7985], [4556, 7988], [4546, 7988], [4530, 7996]]] } }, { "type": "Feature", "id": "SK", "properties": { "hc-group": "admin0", "hc-middle-x": 0.21, "hc-middle-y": 0.57, "hc-key": "sk", "hc-a2": "SK", "name": "Slovakia", "labelrank": "6", "country-abbrev": "Svk.", "subregion": "Eastern Europe", "region-wb": "Europe & Central Asia", "iso-a3": "SVK", "iso-a2": "SK", "woe-id": "23424877", "continent": "Europe" }, "geometry": { "type": "Polygon", "coordinates": [[[4753, 8031], [4744, 8044], [4747, 8053], [4764, 8061], [4784, 8079], [4803, 8088], [4821, 8091], [4830, 8076], [4846, 8083], [4865, 8080], [4891, 8083], [4912, 8071], [4905, 8057], [4900, 8046], [4879, 8052], [4851, 8051], [4834, 8036], [4803, 8032], [4802, 8024], [4773, 8021], [4753, 8031]]] } }, { "type": "Feature", "id": "SZ", "properties": { "hc-group": "admin0", "hc-middle-x": 0.52, "hc-middle-y": 0.48, "hc-key": "sz", "hc-a2": "SZ", "name": "Swaziland", "labelrank": "4", "country-abbrev": "Swz.", "subregion": "Southern Africa", "region-wb": "Sub-Saharan Africa", "iso-a3": "SWZ", "iso-a2": "SZ", "woe-id": "23424993", "continent": "Africa" }, "geometry": { "type": "Polygon", "coordinates": [[[5189, 5728], [5191, 5718], [5194, 5701], [5189, 5686], [5166, 5689], [5154, 5712], [5173, 5735], [5189, 5728]]] } }, { "type": "Feature", "id": "HU", "properties": { "hc-group": "admin0", "hc-middle-x": 0.27, "hc-middle-y": 0.59, "hc-key": "hu", "hc-a2": "HU", "name": "Hungary", "labelrank": "5", "country-abbrev": "Hun.", "subregion": "Eastern Europe", "region-wb": "Europe & Central Asia", "iso-a3": "HUN", "iso-a2": "HU", "woe-id": "23424844", "continent": "Europe" }, "geometry": { "type": "Polygon", "coordinates": [[[4922, 8029], [4896, 8012], [4870, 7967], [4844, 7961], [4824, 7963], [4805, 7954], [4790, 7947], [4759, 7955], [4734, 7975], [4727, 7988], [4722, 7988], [4734, 7993], [4737, 8021], [4751, 8020], [4753, 8031], [4773, 8021], [4802, 8024], [4803, 8032], [4834, 8036], [4851, 8051], [4879, 8052], [4900, 8046], [4914, 8035], [4922, 8029]]] } }, { "type": "Feature", "id": "NE", "properties": { "hc-group": "admin0", "hc-middle-x": 0.65, "hc-middle-y": 0.53, "hc-key": "ne", "hc-a2": "NE", "name": "Niger", "labelrank": "3", "country-abbrev": "Niger", "subregion": "Western Africa", "region-wb": "Sub-Saharan Africa", "iso-a3": "NER", "iso-a2": "NE", "woe-id": "23424906", "continent": "Africa" }, "geometry": { "type": "Polygon", "coordinates": [[[4354, 6849], [4332, 6870], [4318, 6864], [4319, 6855], [4310, 6879], [4293, 6877], [4277, 6890], [4276, 6905], [4266, 6908], [4253, 6934], [4255, 6945], [4277, 6947], [4287, 6956], [4351, 6958], [4371, 6990], [4373, 7072], [4420, 7082], [4468, 7125], [4601, 7206], [4645, 7196], [4667, 7178], [4689, 7190], [4695, 7144], [4718, 7109], [4711, 7095], [4704, 7005], [4671, 6970], [4644, 6929], [4649, 6909], [4642, 6909], [4615, 6889], [4585, 6898], [4562, 6899], [4541, 6892], [4532, 6882], [4504, 6885], [4476, 6897], [4452, 6888], [4436, 6906], [4412, 6914], [4381, 6908], [4370, 6902], [4369, 6887], [4355, 6874], [4354, 6849]]] } }, { "type": "Feature", "id": "LU", "properties": { "hc-group": "admin0", "hc-middle-x": 0.48, "hc-middle-y": 0.60, "hc-key": "lu", "hc-a2": "LU", "name": "Luxembourg", "labelrank": "6", "country-abbrev": "Lux.", "subregion": "Western Europe", "region-wb": "Europe & Central Asia", "iso-a3": "LUX", "iso-a2": "LU", "woe-id": "23424881", "continent": "Europe" }, "geometry": { "type": "Polygon", "coordinates": [[[4435, 8086], [4424, 8085], [4419, 8089], [4416, 8102], [4428, 8111], [4440, 8099], [4435, 8086]]] } }, { "type": "Feature", "id": "AD", "properties": { "hc-group": "admin0", "hc-middle-x": 0.58, "hc-middle-y": 0.31, "hc-key": "ad", "hc-a2": "AD", "name": "Andorra", "labelrank": "6", "country-abbrev": "And.", "subregion": "Southern Europe", "region-wb": "Europe & Central Asia", "iso-a3": "AND", "iso-a2": "AD", "woe-id": "23424744", "continent": "Europe" }, "geometry": { "type": "Polygon", "coordinates": [[[4290, 7834], [4299, 7834], [4298, 7830], [4293, 7828], [4290, 7834]]] } }, { "type": "Feature", "id": "CI", "properties": { "hc-group": "admin0", "hc-middle-x": 0.50, "hc-middle-y": 0.52, "hc-key": "ci", "hc-a2": "CI", "name": "Ivory Coast", "labelrank": "3", "country-abbrev": "I.C.", "subregion": "Western Africa", "region-wb": "Sub-Saharan Africa", "iso-a3": "CIV", "iso-a2": "CI", "woe-id": "23424854", "continent": "Africa" }, "geometry": { "type": "Polygon", "coordinates": [[[4029, 6676], [4015, 6689], [3994, 6695], [4004, 6714], [3998, 6727], [4006, 6726], [4012, 6743], [4005, 6753], [4014, 6763], [4017, 6781], [4007, 6797], [4013, 6803], [4022, 6812], [4043, 6804], [4052, 6818], [4064, 6820], [4071, 6804], [4086, 6811], [4110, 6789], [4140, 6797], [4154, 6796], [4169, 6784], [4174, 6746], [4165, 6734], [4152, 6699], [4167, 6657], [4160, 6655], [4131, 6658], [4086, 6654], [4026, 6633], [4026, 6633], [4026, 6633], [4026, 6633], [4025, 6633], [4029, 6676]]] } }, { "type": "Feature", "id": "LR", "properties": { "hc-group": "admin0", "hc-middle-x": 0.95, "hc-middle-y": 0.75, "hc-key": "lr", "hc-a2": "LR", "name": "Liberia", "labelrank": "4", "country-abbrev": "Liberia", "subregion": "Western Africa", "region-wb": "Sub-Saharan Africa", "iso-a3": "LBR", "iso-a2": "LR", "woe-id": "23424876", "continent": "Africa" }, "geometry": { "type": "Polygon", "coordinates": [[[3998, 6727], [4004, 6714], [3994, 6695], [4015, 6689], [4029, 6676], [4026, 6633], [4026, 6633], [4026, 6633], [4005, 6639], [3975, 6656], [3942, 6686], [3910, 6708], [3936, 6733], [3945, 6754], [3968, 6750], [3979, 6716], [3992, 6731], [3998, 6727]]] } }, { "type": "Feature", "id": "BN", "properties": { "hc-group": "admin0", "hc-middle-x": 0.32, "hc-middle-y": 0.33, "hc-key": "bn", "hc-a2": "BN", "name": "Brunei", "labelrank": "6", "country-abbrev": "Brunei", "subregion": "South-Eastern Asia", "region-wb": "East Asia & Pacific", "iso-a3": "BRN", "iso-a2": "BN", "woe-id": "23424773", "continent": "Asia" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[7635, 6646], [7638, 6647], [7638, 6649], [7645, 6632], [7635, 6646]]], [[[7605, 6640], [7620, 6643], [7634, 6648], [7622, 6623], [7605, 6640]]]] } }, { "type": "Feature", "id": "MR", "properties": { "hc-group": "admin0", "hc-middle-x": 0.62, "hc-middle-y": 0.63, "hc-key": "mr", "hc-a2": "MR", "name": "Mauritania", "labelrank": "3", "country-abbrev": "Mrt.", "subregion": "Western Africa", "region-wb": "Sub-Saharan Africa", "iso-a3": "MRT", "iso-a2": "MR", "woe-id": "23424896", "continent": "Africa" }, "geometry": { "type": "Polygon", "coordinates": [[[3993, 7324], [4086, 7265], [4106, 7252], [4106, 7252], [4106, 7252], [4054, 7252], [4083, 6993], [4091, 6987], [4086, 6962], [3973, 6962], [3932, 6960], [3927, 6950], [3912, 6965], [3903, 6963], [3900, 6944], [3887, 6940], [3858, 6966], [3851, 6982], [3842, 6981], [3826, 6996], [3767, 6991], [3761, 6971], [3764, 6997], [3776, 7036], [3771, 7067], [3762, 7080], [3771, 7105], [3750, 7133], [3746, 7121], [3749, 7139], [3865, 7139], [3865, 7191], [3894, 7205], [3894, 7283], [3992, 7283], [3993, 7324]]] } }, { "type": "Feature", "id": "BE", "properties": { "hc-group": "admin0", "hc-middle-x": 0.51, "hc-middle-y": 0.36, "hc-key": "be", "hc-a2": "BE", "name": "Belgium", "labelrank": "2", "country-abbrev": "Belg.", "subregion": "Western Europe", "region-wb": "Europe & Central Asia", "iso-a3": "BEL", "iso-a2": "BE", "woe-id": "23424757", "continent": "Europe" }, "geometry": { "type": "Polygon", "coordinates": [[[4428, 8111], [4416, 8102], [4419, 8089], [4409, 8087], [4394, 8099], [4392, 8112], [4370, 8106], [4372, 8116], [4356, 8119], [4341, 8136], [4330, 8135], [4325, 8144], [4322, 8149], [4340, 8158], [4347, 8160], [4364, 8153], [4372, 8160], [4375, 8156], [4374, 8160], [4396, 8164], [4402, 8155], [4420, 8151], [4416, 8136], [4425, 8136], [4436, 8119], [4428, 8111]]] } }, { "type": "Feature", "id": "IQ", "properties": { "hc-group": "admin0", "hc-middle-x": 0.46, "hc-middle-y": 0.44, "hc-key": "iq", "hc-a2": "IQ", "name": "Iraq", "labelrank": "3", "country-abbrev": "Iraq", "subregion": "Western Asia", "region-wb": "Middle East & North Africa", "iso-a3": "IRQ", "iso-a2": "IQ", "woe-id": "23424855", "continent": "Asia" }, "geometry": { "type": "Polygon", "coordinates": [[[5677, 7409], [5668, 7411], [5660, 7410], [5635, 7409], [5618, 7381], [5564, 7385], [5487, 7445], [5438, 7472], [5401, 7479], [5398, 7491], [5390, 7520], [5446, 7551], [5461, 7566], [5468, 7624], [5480, 7627], [5495, 7644], [5506, 7652], [5550, 7649], [5553, 7640], [5566, 7645], [5584, 7606], [5611, 7601], [5600, 7576], [5585, 7555], [5584, 7539], [5599, 7528], [5611, 7506], [5642, 7490], [5656, 7467], [5652, 7442], [5662, 7442], [5662, 7425], [5677, 7409]]] } }, { "type": "Feature", "id": "GM", "properties": { "hc-group": "admin0", "hc-middle-x": 0.50, "hc-middle-y": 0.45, "hc-key": "gm", "hc-a2": "GM", "name": "Gambia", "labelrank": "6", "country-abbrev": "Gambia", "subregion": "Western Africa", "region-wb": "Sub-Saharan Africa", "iso-a3": "GMB", "iso-a2": "GM", "woe-id": "23424821", "continent": "Africa" }, "geometry": { "type": "Polygon", "coordinates": [[[3755, 6889], [3753, 6898], [3761, 6905], [3761, 6905], [3791, 6905], [3804, 6912], [3840, 6898], [3824, 6895], [3802, 6905], [3782, 6892], [3755, 6889]]] } }, { "type": "Feature", "id": "MA", "properties": { "hc-group": "admin0", "hc-middle-x": 0.60, "hc-middle-y": 0.21, "hc-key": "ma", "hc-a2": "MA", "name": "Morocco", "labelrank": "3", "country-abbrev": "Mor.", "subregion": "Northern Africa", "region-wb": "Middle East & North Africa", "iso-a3": "MAR", "iso-a2": "MA", "woe-id": "23424893", "continent": "Africa" }, "geometry": { "type": "Polygon", "coordinates": [[[4091, 7602], [4094, 7593], [4119, 7578], [4161, 7584], [4161, 7582], [4162, 7583], [4163, 7579], [4183, 7576], [4196, 7565], [4199, 7515], [4217, 7492], [4211, 7477], [4174, 7479], [4165, 7468], [4140, 7463], [4136, 7453], [4141, 7433], [4119, 7426], [4079, 7398], [4024, 7391], [3993, 7368], [3993, 7336], [3989, 7319], [3962, 7310], [3927, 7315], [3913, 7311], [3903, 7287], [3894, 7284], [3882, 7247], [3864, 7233], [3856, 7220], [3835, 7203], [3829, 7169], [3811, 7142], [3747, 7141], [3756, 7168], [3762, 7169], [3784, 7217], [3809, 7242], [3813, 7266], [3824, 7291], [3847, 7305], [3866, 7344], [3910, 7357], [3937, 7378], [3964, 7414], [3957, 7432], [3958, 7455], [3972, 7476], [3976, 7494], [3997, 7516], [4027, 7529], [4047, 7542], [4063, 7569], [4074, 7600], [4089, 7604], [4090, 7603], [4091, 7602]]] } }, { "type": "Feature", "id": "TD", "properties": { "hc-group": "admin0", "hc-middle-x": 0.47, "hc-middle-y": 0.63, "hc-key": "td", "hc-a2": "TD", "name": "Chad", "labelrank": "3", "country-abbrev": "Chad", "subregion": "Middle Africa", "region-wb": "Sub-Saharan Africa", "iso-a3": "TCD", "iso-a2": "TD", "woe-id": "23424777", "continent": "Africa" }, "geometry": { "type": "Polygon", "coordinates": [[[4675, 6887], [4683, 6890], [4671, 6890], [4671, 6890], [4669, 6892], [4670, 6890], [4662, 6890], [4649, 6909], [4644, 6929], [4671, 6970], [4704, 7005], [4711, 7095], [4718, 7109], [4695, 7144], [4689, 7190], [4719, 7204], [4954, 7083], [4954, 6969], [4928, 6968], [4916, 6938], [4907, 6934], [4912, 6921], [4898, 6911], [4904, 6897], [4894, 6889], [4914, 6860], [4912, 6848], [4923, 6840], [4921, 6826], [4909, 6828], [4888, 6817], [4889, 6811], [4850, 6773], [4811, 6770], [4811, 6760], [4795, 6741], [4769, 6739], [4742, 6726], [4735, 6736], [4713, 6724], [4704, 6726], [4695, 6754], [4659, 6788], [4666, 6798], [4710, 6798], [4692, 6822], [4694, 6844], [4684, 6877], [4675, 6887]]] } }, { "type": "Feature", "id": "KV", "properties": { "hc-group": "admin0", "hc-middle-x": 0.50, "hc-middle-y": 0.51, "hc-key": "kv", "hc-a2": "KV", "name": "Kosovo", "labelrank": "6", "country-abbrev": "Kos.", "subregion": "Southern Europe", "region-wb": "Europe & Central Asia", "iso-a3": "-99", "iso-a2": "KV", "woe-id": "-90", "continent": "Europe" }, "geometry": { "type": "Polygon", "coordinates": [[[4839, 7832], [4838, 7838], [4847, 7842], [4861, 7857], [4878, 7839], [4889, 7836], [4883, 7821], [4869, 7820], [4854, 7808], [4852, 7820], [4839, 7832]]] } }, { "type": "Feature", "id": "LB", "properties": { "hc-group": "admin0", "hc-middle-x": 0.54, "hc-middle-y": 0.56, "hc-key": "lb", "hc-a2": "LB", "name": "Lebanon", "labelrank": "5", "country-abbrev": "Leb.", "subregion": "Western Asia", "region-wb": "Middle East & North Africa", "iso-a3": "LBN", "iso-a2": "LB", "woe-id": "23424873", "continent": "Asia" }, "geometry": { "type": "Polygon", "coordinates": [[[5282, 7510], [5296, 7537], [5307, 7562], [5320, 7561], [5326, 7547], [5303, 7521], [5293, 7510], [5282, 7510]]] } }, { "type": "Feature", "id": "SX", "properties": { "hc-group": "admin0", "hc-middle-x": 0.76, "hc-middle-y": 0.53, "hc-key": "sx", "hc-a2": "SX", "name": "Somaliland", "labelrank": "5", "country-abbrev": "Solnd.", "subregion": "Eastern Africa", "region-wb": "Sub-Saharan Africa", "iso-a3": "-99", "iso-a2": "SX", "woe-id": "-99", "continent": "Africa" }, "geometry": { "type": "Polygon", "coordinates": [[[5521, 6843], [5552, 6812], [5572, 6811], [5597, 6824], [5616, 6819], [5643, 6833], [5689, 6836], [5689, 6782], [5661, 6740], [5631, 6740], [5544, 6769], [5527, 6781], [5504, 6817], [5512, 6828], [5521, 6843]]] } }, { "type": "Feature", "id": "DJ", "properties": { "hc-group": "admin0", "hc-middle-x": 0.56, "hc-middle-y": 0.55, "hc-key": "dj", "hc-a2": "DJ", "name": "Djibouti", "labelrank": "5", "country-abbrev": "Dji.", "subregion": "Eastern Africa", "region-wb": "Middle East & North Africa", "iso-a3": "DJI", "iso-a2": "DJ", "woe-id": "23424797", "continent": "Africa" }, "geometry": { "type": "Polygon", "coordinates": [[[5512, 6828], [5483, 6826], [5478, 6831], [5481, 6833], [5478, 6837], [5477, 6844], [5496, 6872], [5505, 6869], [5518, 6879], [5525, 6858], [5507, 6849], [5521, 6843], [5512, 6828]]] } }, { "type": "Feature", "id": "ER", "properties": { "hc-group": "admin0", "hc-middle-x": 0.10, "hc-middle-y": 0.24, "hc-key": "er", "hc-a2": "ER", "name": "Eritrea", "labelrank": "4", "country-abbrev": "Erit.", "subregion": "Eastern Africa", "region-wb": "Sub-Saharan Africa", "iso-a3": "ERI", "iso-a2": "ER", "woe-id": "23424806", "continent": "Africa" }, "geometry": { "type": "Polygon", "coordinates": [[[5518, 6879], [5505, 6869], [5496, 6872], [5450, 6920], [5429, 6931], [5399, 6936], [5380, 6930], [5364, 6944], [5354, 6921], [5346, 6931], [5324, 6925], [5321, 6951], [5336, 6985], [5338, 7009], [5373, 7023], [5385, 7038], [5394, 7019], [5403, 6980], [5418, 6955], [5428, 6973], [5427, 6954], [5434, 6945], [5460, 6936], [5475, 6916], [5493, 6905], [5508, 6883], [5518, 6879]]] } }, { "type": "Feature", "id": "BI", "properties": { "hc-group": "admin0", "hc-middle-x": 0.56, "hc-middle-y": 0.45, "hc-key": "bi", "hc-a2": "BI", "name": "Burundi", "labelrank": "6", "country-abbrev": "Bur.", "subregion": "Eastern Africa", "region-wb": "Sub-Saharan Africa", "iso-a3": "BDI", "iso-a2": "BI", "woe-id": "23424774", "continent": "Africa" }, "geometry": { "type": "Polygon", "coordinates": [[[5102, 6426], [5123, 6423], [5129, 6437], [5148, 6435], [5144, 6422], [5156, 6418], [5132, 6380], [5121, 6375], [5112, 6395], [5108, 6408], [5109, 6416], [5102, 6426]]] } }, { "type": "Feature", "id": "SR", "properties": { "hc-group": "admin0", "hc-middle-x": 0.91, "hc-middle-y": 0.10, "hc-key": "sr", "hc-a2": "SR", "name": "Suriname", "labelrank": "4", "country-abbrev": "Sur.", "subregion": "South America", "region-wb": "Latin America & Caribbean", "iso-a3": "SUR", "iso-a2": "SR", "woe-id": "23424913", "continent": "South America" }, "geometry": { "type": "Polygon", "coordinates": [[[2640, 6573], [2629, 6580], [2596, 6573], [2599, 6559], [2585, 6562], [2565, 6588], [2561, 6605], [2553, 6603], [2538, 6627], [2549, 6651], [2562, 6652], [2563, 6666], [2571, 6681], [2601, 6675], [2604, 6680], [2635, 6680], [2657, 6676], [2653, 6662], [2644, 6649], [2648, 6623], [2658, 6606], [2648, 6579], [2640, 6573]]] } }, { "type": "Feature", "id": "GN", "properties": { "hc-group": "admin0", "hc-middle-x": 0.26, "hc-middle-y": 0.52, "hc-key": "gn", "hc-a2": "GN", "name": "Guinea", "labelrank": "3", "country-abbrev": "Gin.", "subregion": "Western Africa", "region-wb": "Sub-Saharan Africa", "iso-a3": "GIN", "iso-a2": "GN", "woe-id": "23424835", "continent": "Africa" }, "geometry": { "type": "Polygon", "coordinates": [[[3844, 6878], [3884, 6867], [3913, 6870], [3919, 6858], [3933, 6855], [3946, 6864], [3962, 6859], [3983, 6869], [3988, 6848], [4002, 6839], [4004, 6815], [4013, 6803], [4007, 6797], [4017, 6781], [4014, 6763], [4005, 6753], [4012, 6743], [4006, 6726], [3998, 6727], [3992, 6731], [3979, 6716], [3968, 6750], [3945, 6754], [3934, 6778], [3916, 6798], [3880, 6794], [3874, 6781], [3857, 6770], [3848, 6792], [3822, 6805], [3818, 6819], [3806, 6827], [3816, 6843], [3844, 6849], [3844, 6878]]] } }, { "type": "Feature", "id": "ZW", "properties": { "hc-group": "admin0", "hc-middle-x": 0.91, "hc-middle-y": 0.63, "hc-key": "zw", "hc-a2": "ZW", "name": "Zimbabwe", "labelrank": "3", "country-abbrev": "Zimb.", "subregion": "Eastern Africa", "region-wb": "Sub-Saharan Africa", "iso-a3": "ZWE", "iso-a2": "ZW", "woe-id": "23425004", "continent": "Africa" }, "geometry": { "type": "Polygon", "coordinates": [[[4992, 5979], [5013, 5973], [5044, 5974], [5076, 6008], [5094, 6009], [5095, 6017], [5098, 6032], [5114, 6042], [5143, 6044], [5143, 6033], [5169, 6032], [5188, 6020], [5219, 6013], [5221, 5963], [5213, 5929], [5220, 5911], [5205, 5895], [5202, 5873], [5169, 5839], [5140, 5841], [5112, 5845], [5103, 5857], [5074, 5864], [5063, 5879], [5064, 5897], [5051, 5897], [5049, 5909], [5018, 5927], [5012, 5945], [4992, 5979]]] } }, { "type": "Feature", "id": "PY", "properties": { "hc-group": "admin0", "hc-middle-x": 0.49, "hc-middle-y": 0.50, "hc-key": "py", "hc-a2": "PY", "name": "Paraguay", "labelrank": "4", "country-abbrev": "Para.", "subregion": "South America", "region-wb": "Latin America & Caribbean", "iso-a3": "PRY", "iso-a2": "PY", "woe-id": "23424917", "continent": "South America" }, "geometry": { "type": "Polygon", "coordinates": [[[2650, 5787], [2647, 5782], [2640, 5745], [2641, 5742], [2641, 5740], [2635, 5707], [2616, 5696], [2607, 5682], [2596, 5686], [2565, 5680], [2540, 5687], [2523, 5686], [2535, 5719], [2554, 5744], [2548, 5753], [2517, 5765], [2481, 5789], [2452, 5795], [2424, 5819], [2404, 5844], [2415, 5880], [2415, 5895], [2430, 5923], [2481, 5934], [2508, 5934], [2535, 5918], [2536, 5907], [2546, 5883], [2541, 5850], [2575, 5842], [2587, 5849], [2603, 5841], [2617, 5790], [2639, 5795], [2650, 5787]]] } }, { "type": "Feature", "id": "BY", "properties": { "hc-group": "admin0", "hc-middle-x": 0.51, "hc-middle-y": 0.49, "hc-key": "by", "hc-a2": "BY", "name": "Belarus", "labelrank": "4", "country-abbrev": "Bela.", "subregion": "Eastern Europe", "region-wb": "Europe & Central Asia", "iso-a3": "BLR", "iso-a2": "BY", "woe-id": "23424765", "continent": "Europe" }, "geometry": { "type": "Polygon", "coordinates": [[[4943, 8165], [4944, 8188], [4930, 8196], [4951, 8211], [4952, 8230], [4940, 8262], [4978, 8263], [4998, 8276], [5007, 8299], [5037, 8316], [5027, 8319], [5031, 8332], [5043, 8339], [5061, 8337], [5077, 8352], [5096, 8343], [5113, 8344], [5158, 8329], [5161, 8306], [5154, 8296], [5166, 8289], [5170, 8273], [5185, 8266], [5183, 8256], [5204, 8252], [5212, 8242], [5193, 8227], [5173, 8232], [5178, 8197], [5183, 8188], [5160, 8187], [5147, 8169], [5147, 8154], [5136, 8164], [5111, 8160], [5106, 8170], [5094, 8161], [5051, 8168], [5007, 8182], [4966, 8180], [4943, 8165]]] } }, { "type": "Feature", "id": "LV", "properties": { "hc-group": "admin0", "hc-middle-x": 0.28, "hc-middle-y": 0.41, "hc-key": "lv", "hc-a2": "LV", "name": "Latvia", "labelrank": "5", "country-abbrev": "Lat.", "subregion": "Northern Europe", "region-wb": "Europe & Central Asia", "iso-a3": "LVA", "iso-a2": "LV", "woe-id": "23424874", "continent": "Europe" }, "geometry": { "type": "Polygon", "coordinates": [[[5077, 8352], [5061, 8337], [5043, 8339], [5031, 8332], [5004, 8352], [4987, 8354], [4981, 8364], [4968, 8357], [4899, 8363], [4868, 8349], [4868, 8381], [4878, 8389], [4887, 8411], [4913, 8420], [4933, 8393], [4946, 8386], [4966, 8397], [4964, 8424], [4992, 8433], [5028, 8410], [5054, 8410], [5068, 8400], [5062, 8381], [5076, 8368], [5077, 8352]]] } }, { "type": "Feature", "id": "SY", "properties": { "hc-group": "admin0", "hc-middle-x": 0.25, "hc-middle-y": 0.54, "hc-key": "sy", "hc-a2": "SY", "name": "Syria", "labelrank": "3", "country-abbrev": "Syria", "subregion": "Western Asia", "region-wb": "Middle East & North Africa", "iso-a3": "SYR", "iso-a2": "SY", "woe-id": "23424956", "continent": "Asia" }, "geometry": { "type": "Polygon", "coordinates": [[[5301, 7499], [5305, 7506], [5303, 7521], [5326, 7547], [5320, 7561], [5307, 7562], [5306, 7587], [5305, 7604], [5328, 7614], [5327, 7634], [5351, 7628], [5373, 7637], [5387, 7631], [5419, 7632], [5447, 7644], [5469, 7643], [5491, 7651], [5495, 7644], [5480, 7627], [5468, 7624], [5461, 7566], [5446, 7551], [5390, 7520], [5332, 7485], [5301, 7499]]] } }, { "type": "Feature", "id": "BT", "properties": { "hc-group": "admin0", "hc-middle-x": 0.49, "hc-middle-y": 0.49, "hc-key": "bt", "hc-a2": "BT", "name": "Bhutan", "labelrank": "5", "country-abbrev": "Bhutan", "subregion": "Southern Asia", "region-wb": "South Asia", "iso-a3": "BTN", "iso-a2": "BT", "woe-id": "23424770", "continent": "Asia" }, "geometry": { "type": "Polygon", "coordinates": [[[6865, 7325], [6885, 7351], [6905, 7358], [6912, 7349], [6936, 7349], [6946, 7339], [6956, 7330], [6959, 7313], [6943, 7308], [6893, 7305], [6871, 7309], [6865, 7325]]] } }, { "type": "Feature", "id": "NA", "properties": { "hc-group": "admin0", "hc-middle-x": 0.33, "hc-middle-y": 0.37, "hc-key": "na", "hc-a2": "NA", "name": "Namibia", "labelrank": "3", "country-abbrev": "Nam.", "subregion": "Southern Africa", "region-wb": "Sub-Saharan Africa", "iso-a3": "NAM", "iso-a2": "NA", "woe-id": "23424987", "continent": "Africa" }, "geometry": { "type": "Polygon", "coordinates": [[[4937, 5984], [4961, 5989], [4983, 5986], [4992, 5979], [4960, 5972], [4943, 5958], [4935, 5973], [4866, 5963], [4866, 5852], [4836, 5851], [4836, 5766], [4837, 5652], [4810, 5634], [4783, 5635], [4761, 5642], [4759, 5657], [4746, 5661], [4734, 5646], [4710, 5666], [4698, 5685], [4685, 5734], [4683, 5764], [4674, 5784], [4676, 5825], [4672, 5843], [4642, 5887], [4635, 5908], [4610, 5952], [4597, 5969], [4595, 5996], [4618, 5996], [4636, 6005], [4659, 5991], [4791, 5991], [4801, 5981], [4861, 5972], [4878, 5973], [4937, 5984]]] } }, { "type": "Feature", "id": "BF", "properties": { "hc-group": "admin0", "hc-middle-x": 0.64, "hc-middle-y": 0.41, "hc-key": "bf", "hc-a2": "BF", "name": "Burkina Faso", "labelrank": "3", "country-abbrev": "B.F.", "subregion": "Western Africa", "region-wb": "Sub-Saharan Africa", "iso-a3": "BFA", "iso-a2": "BF", "woe-id": "23424978", "continent": "Africa" }, "geometry": { "type": "Polygon", "coordinates": [[[4275, 6828], [4262, 6828], [4243, 6832], [4228, 6828], [4167, 6828], [4162, 6820], [4169, 6784], [4154, 6796], [4140, 6797], [4110, 6789], [4086, 6811], [4093, 6853], [4114, 6862], [4124, 6882], [4120, 6891], [4131, 6902], [4146, 6892], [4152, 6909], [4163, 6907], [4176, 6926], [4189, 6923], [4226, 6949], [4255, 6945], [4253, 6934], [4266, 6908], [4276, 6905], [4277, 6890], [4293, 6877], [4310, 6879], [4319, 6855], [4307, 6841], [4291, 6842], [4275, 6828]]] } }, { "type": "Feature", "id": "CF", "properties": { "hc-group": "admin0", "hc-middle-x": 0.46, "hc-middle-y": 0.46, "hc-key": "cf", "hc-a2": "CF", "name": "Central African Republic", "labelrank": "4", "country-abbrev": "C.A.R.", "subregion": "Middle Africa", "region-wb": "Sub-Saharan Africa", "iso-a3": "CAF", "iso-a2": "CF", "woe-id": "23424792", "continent": "Africa" }, "geometry": { "type": "Polygon", "coordinates": [[[4797, 6607], [4762, 6614], [4736, 6607], [4725, 6571], [4722, 6589], [4695, 6615], [4681, 6640], [4678, 6679], [4696, 6718], [4704, 6726], [4713, 6724], [4735, 6736], [4742, 6726], [4769, 6739], [4795, 6741], [4811, 6760], [4811, 6770], [4850, 6773], [4889, 6811], [4888, 6817], [4909, 6828], [4921, 6826], [4944, 6796], [4940, 6763], [4960, 6760], [4959, 6750], [4979, 6745], [4995, 6720], [5025, 6700], [5028, 6684], [5047, 6674], [5056, 6654], [5027, 6653], [4995, 6661], [4993, 6652], [4969, 6654], [4937, 6639], [4922, 6646], [4908, 6626], [4855, 6634], [4829, 6656], [4810, 6649], [4794, 6631], [4797, 6607]]] } }, { "type": "Feature", "id": "MD", "properties": { "hc-group": "admin0", "hc-middle-x": 0.55, "hc-middle-y": 0.41, "hc-key": "md", "hc-a2": "MD", "name": "Moldova", "labelrank": "6", "country-abbrev": "Mda.", "subregion": "Eastern Europe", "region-wb": "Europe & Central Asia", "iso-a3": "MDA", "iso-a2": "MD", "woe-id": "23424885", "continent": "Europe" }, "geometry": { "type": "Polygon", "coordinates": [[[5078, 7937], [5075, 7957], [5079, 7981], [5052, 8018], [5043, 8037], [5032, 8040], [5065, 8048], [5109, 8026], [5105, 8013], [5118, 8005], [5118, 7991], [5129, 7986], [5127, 7969], [5100, 7973], [5101, 7957], [5078, 7937]]] } }, { "type": "Feature", "id": "GZ", "properties": { "hc-group": "admin0", "hc-middle-x": 0.47, "hc-middle-y": 0.48, "hc-key": "gz", "hc-a2": "GZ", "name": "Gaza Strip", "labelrank": "4", "country-abbrev": "Gaz.", "subregion": "Western Asia", "region-wb": "Middle East & North Africa", "iso-a3": "GAZ", "iso-a2": "GZ", "woe-id": "-90", "continent": "Asia" }, "geometry": { "type": "Polygon", "coordinates": [[[5255, 7452], [5262, 7460], [5263, 7461], [5265, 7459], [5257, 7449], [5256, 7451], [5255, 7452]]] } }, { "type": "Feature", "id": "SS", "properties": { "hc-group": "admin0", "hc-middle-x": 0.49, "hc-middle-y": 0.58, "hc-key": "ss", "hc-a2": "SS", "name": "South Sudan", "labelrank": "3", "country-abbrev": "S. Sud.", "subregion": "Eastern Africa", "region-wb": "Sub-Saharan Africa", "iso-a3": "SSD", "iso-a2": "SS", "woe-id": "-99", "continent": "Africa" }, "geometry": { "type": "Polygon", "coordinates": [[[5306, 6640], [5291, 6652], [5260, 6640], [5249, 6629], [5235, 6616], [5220, 6619], [5195, 6608], [5184, 6617], [5165, 6616], [5156, 6607], [5115, 6641], [5107, 6632], [5095, 6638], [5084, 6630], [5066, 6640], [5056, 6654], [5047, 6674], [5028, 6684], [5025, 6700], [4995, 6720], [4979, 6745], [4959, 6750], [4960, 6760], [4971, 6766], [4978, 6793], [4987, 6807], [5009, 6811], [5030, 6784], [5069, 6787], [5074, 6779], [5097, 6779], [5132, 6807], [5153, 6791], [5168, 6792], [5203, 6830], [5200, 6849], [5193, 6858], [5226, 6864], [5222, 6846], [5225, 6824], [5246, 6804], [5251, 6783], [5248, 6753], [5225, 6752], [5221, 6734], [5241, 6730], [5271, 6700], [5288, 6662], [5302, 6661], [5306, 6640]]] } }, { "type": "Feature", "id": "CZ", "properties": { "hc-group": "admin0", "hc-middle-x": 0.49, "hc-middle-y": 0.55, "hc-key": "cz", "hc-a2": "CZ", "name": "Czech Republic", "labelrank": "5", "country-abbrev": "Cz. Rep.", "subregion": "Eastern Europe", "region-wb": "Europe & Central Asia", "iso-a3": "CZE", "iso-a2": "CZ", "woe-id": "23424810", "continent": "Europe" }, "geometry": { "type": "Polygon", "coordinates": [[[4684, 8140], [4729, 8131], [4725, 8123], [4740, 8110], [4754, 8121], [4773, 8106], [4795, 8103], [4803, 8088], [4784, 8079], [4764, 8061], [4747, 8053], [4689, 8069], [4681, 8053], [4655, 8060], [4625, 8081], [4609, 8108], [4616, 8122], [4671, 8141], [4684, 8140]]] } }, { "type": "Feature", "id": "NZ", "properties": { "hc-group": "admin0", "hc-middle-x": 0.25, "hc-middle-y": 0.81, "hc-key": "nz", "hc-a2": "NZ", "name": "New Zealand", "labelrank": "2", "country-abbrev": "N.Z.", "subregion": "Australia and New Zealand", "region-wb": "East Asia & Pacific", "iso-a3": "NZL", "iso-a2": "NZ", "woe-id": "23424916", "continent": "Oceania" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[9274, 5057], [9243, 5033], [9207, 5032], [9202, 5014], [9180, 5007], [9192, 5029], [9186, 5047], [9158, 5046], [9150, 5053], [9159, 5078], [9206, 5125], [9246, 5142], [9287, 5177], [9297, 5204], [9314, 5218], [9315, 5237], [9331, 5250], [9342, 5240], [9345, 5222], [9365, 5236], [9365, 5223], [9377, 5234], [9373, 5215], [9380, 5207], [9358, 5180], [9350, 5164], [9334, 5147], [9345, 5132], [9325, 5136], [9293, 5116], [9289, 5094], [9272, 5065], [9274, 5057]]], [[[9429, 5224], [9410, 5211], [9389, 5223], [9399, 5234], [9408, 5258], [9400, 5270], [9365, 5288], [9365, 5295], [9388, 5308], [9396, 5344], [9382, 5382], [9382, 5396], [9372, 5395], [9345, 5430], [9348, 5435], [9332, 5454], [9344, 5457], [9347, 5442], [9368, 5437], [9388, 5417], [9386, 5404], [9397, 5391], [9405, 5397], [9426, 5380], [9430, 5349], [9472, 5337], [9489, 5352], [9506, 5346], [9498, 5318], [9485, 5299], [9471, 5299], [9457, 5287], [9455, 5261], [9429, 5224]]]] } }, { "type": "Feature", "id": "CU", "properties": { "hc-group": "admin0", "hc-middle-x": 0.51, "hc-middle-y": 0.50, "hc-key": "cu", "hc-a2": "CU", "name": "Cuba", "labelrank": "3", "country-abbrev": "Cuba", "subregion": "Caribbean", "region-wb": "Latin America & Caribbean", "iso-a3": "CUB", "iso-a2": "CU", "woe-id": "23424793", "continent": "North America" }, "geometry": { "type": "Polygon", "coordinates": [[[1972, 7120], [1950, 7120], [1937, 7130], [1932, 7118], [1913, 7131], [1915, 7145], [1896, 7150], [1879, 7161], [1839, 7165], [1837, 7180], [1811, 7181], [1799, 7170], [1818, 7147], [1802, 7143], [1792, 7165], [1777, 7165], [1760, 7153], [1773, 7180], [1797, 7190], [1827, 7196], [1897, 7189], [1915, 7171], [1930, 7175], [1941, 7176], [1992, 7138], [2016, 7133], [2029, 7119], [2047, 7117], [2063, 7108], [2061, 7100], [2022, 7095], [2003, 7098], [1959, 7094], [1979, 7112], [1972, 7120]]] } }, { "type": "Feature", "id": "FI", "properties": { "hc-group": "admin0", "hc-middle-x": 0.61, "hc-middle-y": 0.44, "hc-key": "fi", "hc-a2": "FI", "name": "Finland", "labelrank": "3", "country-abbrev": "Fin.", "subregion": "Northern Europe", "region-wb": "Europe & Central Asia", "iso-a3": "FIN", "iso-a2": "FI", "woe-id": "23424812", "continent": "Europe" }, "geometry": { "type": "Polygon", "coordinates": [[[5067, 8541], [5048, 8542], [5010, 8526], [4999, 8528], [4943, 8515], [4921, 8522], [4911, 8511], [4910, 8531], [4898, 8529], [4874, 8539], [4854, 8517], [4830, 8520], [4825, 8528], [4840, 8533], [4843, 8521], [4878, 8545], [4875, 8564], [4883, 8580], [4873, 8606], [4876, 8623], [4869, 8637], [4879, 8654], [4870, 8663], [4900, 8664], [4902, 8673], [4953, 8710], [4990, 8752], [4995, 8770], [4960, 8786], [4944, 8816], [4955, 8835], [4942, 8852], [4948, 8865], [4938, 8868], [4940, 8888], [4920, 8914], [4898, 8918], [4855, 8947], [4867, 8947], [4876, 8960], [4886, 8959], [4909, 8930], [4931, 8926], [4953, 8936], [4980, 8923], [4990, 8936], [5003, 8939], [5015, 8982], [5028, 8993], [5046, 8992], [5070, 9001], [5084, 8987], [5106, 8980], [5112, 8969], [5098, 8957], [5101, 8947], [5086, 8922], [5092, 8904], [5111, 8898], [5132, 8878], [5129, 8869], [5105, 8843], [5105, 8836], [5129, 8800], [5134, 8778], [5123, 8777], [5127, 8756], [5119, 8746], [5133, 8736], [5132, 8718], [5148, 8709], [5146, 8698], [5131, 8687], [5168, 8661], [5178, 8648], [5168, 8629], [5150, 8615], [5108, 8572], [5067, 8541]]] } }, { "type": "Feature", "id": "MG", "properties": { "hc-group": "admin0", "hc-middle-x": 0.45, "hc-middle-y": 0.48, "hc-key": "mg", "hc-a2": "MG", "name": "Madagascar", "labelrank": "3", "country-abbrev": "Mad.", "subregion": "Eastern Africa", "region-wb": "Sub-Saharan Africa", "iso-a3": "MDG", "iso-a2": "MG", "woe-id": "23424883", "continent": "Africa" }, "geometry": { "type": "Polygon", "coordinates": [[[5704, 5995], [5701, 5960], [5693, 5941], [5667, 5857], [5660, 5840], [5649, 5794], [5636, 5760], [5577, 5740], [5544, 5758], [5535, 5777], [5537, 5806], [5525, 5826], [5521, 5844], [5529, 5872], [5558, 5915], [5558, 5927], [5545, 5960], [5542, 5989], [5556, 6012], [5557, 6028], [5609, 6042], [5631, 6057], [5663, 6091], [5658, 6099], [5667, 6111], [5683, 6111], [5688, 6136], [5699, 6154], [5719, 6122], [5727, 6071], [5735, 6050], [5727, 6034], [5717, 6051], [5710, 6047], [5716, 6017], [5704, 5995]]] } }, { "type": "Feature", "id": "VE", "properties": { "hc-group": "admin0", "hc-middle-x": 0.44, "hc-middle-y": 0.25, "hc-key": "ve", "hc-a2": "VE", "name": "Venezuela", "labelrank": "3", "country-abbrev": "Ven.", "subregion": "South America", "region-wb": "Latin America & Caribbean", "iso-a3": "VEN", "iso-a2": "VE", "woe-id": "23424982", "continent": "South America" }, "geometry": { "type": "Polygon", "coordinates": [[[2148, 6853], [2129, 6846], [2141, 6820], [2125, 6793], [2143, 6771], [2156, 6780], [2156, 6792], [2141, 6823], [2189, 6844], [2178, 6854], [2187, 6864], [2198, 6842], [2221, 6842], [2235, 6832], [2239, 6816], [2248, 6812], [2297, 6818], [2310, 6806], [2342, 6802], [2356, 6814], [2367, 6833], [2370, 6819], [2401, 6821], [2424, 6818], [2400, 6813], [2404, 6802], [2428, 6792], [2433, 6796], [2458, 6779], [2454, 6766], [2468, 6755], [2481, 6756], [2487, 6748], [2467, 6734], [2463, 6717], [2473, 6713], [2448, 6702], [2441, 6678], [2460, 6657], [2464, 6649], [2435, 6630], [2400, 6623], [2395, 6609], [2381, 6621], [2362, 6620], [2346, 6626], [2358, 6610], [2362, 6577], [2382, 6576], [2381, 6568], [2364, 6562], [2361, 6553], [2300, 6527], [2279, 6541], [2270, 6575], [2251, 6590], [2266, 6605], [2257, 6615], [2250, 6637], [2251, 6660], [2263, 6682], [2259, 6689], [2204, 6684], [2184, 6709], [2126, 6712], [2115, 6723], [2117, 6750], [2099, 6778], [2088, 6774], [2099, 6794], [2102, 6812], [2129, 6848], [2148, 6853]]] } }, { "type": "Feature", "id": "IS", "properties": { "hc-group": "admin0", "hc-middle-x": 0.65, "hc-middle-y": 0.50, "hc-key": "is", "hc-a2": "IS", "name": "Iceland", "labelrank": "3", "country-abbrev": "Iceland", "subregion": "Northern Europe", "region-wb": "Europe & Central Asia", "iso-a3": "ISL", "iso-a2": "IS", "woe-id": "23424845", "continent": "Europe" }, "geometry": { "type": "Polygon", "coordinates": [[[3604, 8767], [3566, 8774], [3545, 8766], [3526, 8771], [3549, 8784], [3547, 8795], [3557, 8805], [3585, 8793], [3567, 8816], [3583, 8818], [3620, 8794], [3616, 8773], [3626, 8759], [3639, 8780], [3645, 8770], [3652, 8782], [3647, 8799], [3657, 8801], [3670, 8783], [3693, 8805], [3712, 8788], [3709, 8803], [3730, 8793], [3741, 8804], [3763, 8804], [3761, 8820], [3776, 8821], [3795, 8802], [3811, 8814], [3804, 8797], [3816, 8797], [3811, 8782], [3824, 8782], [3847, 8771], [3846, 8746], [3823, 8731], [3820, 8718], [3777, 8706], [3747, 8689], [3730, 8687], [3719, 8676], [3697, 8671], [3654, 8678], [3624, 8697], [3619, 8692], [3579, 8691], [3608, 8709], [3609, 8717], [3590, 8725], [3591, 8735], [3540, 8741], [3606, 8748], [3584, 8754], [3604, 8767]]] } }, { "type": "Feature", "id": "NP", "properties": { "hc-group": "admin0", "hc-middle-x": 0.53, "hc-middle-y": 0.55, "hc-key": "np", "hc-a2": "NP", "name": "Nepal", "labelrank": "3", "country-abbrev": "Nepal", "subregion": "Southern Asia", "region-wb": "South Asia", "iso-a3": "NPL", "iso-a2": "NP", "woe-id": "23424911", "continent": "Asia" }, "geometry": { "type": "Polygon", "coordinates": [[[6633, 7416], [6665, 7421], [6667, 7412], [6697, 7398], [6707, 7384], [6724, 7386], [6753, 7356], [6771, 7357], [6780, 7343], [6796, 7349], [6814, 7341], [6843, 7342], [6838, 7318], [6841, 7298], [6819, 7294], [6775, 7301], [6740, 7316], [6738, 7325], [6685, 7330], [6664, 7343], [6642, 7350], [6637, 7358], [6605, 7373], [6618, 7404], [6633, 7416]]] } }, { "type": "Feature", "id": "KG", "properties": { "hc-group": "admin0", "hc-middle-x": 0.48, "hc-middle-y": 0.44, "hc-key": "kg", "hc-a2": "KG", "name": "Kyrgyzstan", "labelrank": "4", "country-abbrev": "Kgz.", "subregion": "Central Asia", "region-wb": "Europe & Central Asia", "iso-a3": "KGZ", "iso-a2": "KG", "woe-id": "23424864", "continent": "Asia" }, "geometry": { "type": "Polygon", "coordinates": [[[6337, 7821], [6339, 7833], [6364, 7842], [6412, 7828], [6416, 7850], [6432, 7857], [6462, 7843], [6479, 7845], [6559, 7844], [6579, 7841], [6587, 7829], [6610, 7819], [6609, 7813], [6583, 7805], [6555, 7791], [6547, 7779], [6508, 7776], [6504, 7765], [6476, 7753], [6474, 7764], [6452, 7761], [6427, 7745], [6416, 7724], [6360, 7718], [6352, 7729], [6330, 7723], [6289, 7726], [6289, 7742], [6308, 7750], [6325, 7744], [6337, 7751], [6358, 7748], [6378, 7764], [6401, 7770], [6373, 7778], [6361, 7793], [6344, 7781], [6314, 7798], [6346, 7820], [6337, 7821]], [[6327, 7738], [6323, 7738], [6326, 7735], [6330, 7737], [6327, 7738]], [[6361, 7739], [6362, 7742], [6361, 7742], [6358, 7741], [6361, 7739]], [[6344, 7744], [6338, 7748], [6340, 7742], [6345, 7739], [6344, 7744]]] } }, { "type": "Feature", "id": "BW", "properties": { "hc-group": "admin0", "hc-middle-x": 0.49, "hc-middle-y": 0.60, "hc-key": "bw", "hc-a2": "BW", "name": "Botswana", "labelrank": "4", "country-abbrev": "Bwa.", "subregion": "Southern Africa", "region-wb": "Sub-Saharan Africa", "iso-a3": "BWA", "iso-a2": "BW", "woe-id": "23424755", "continent": "Africa" }, "geometry": { "type": "Polygon", "coordinates": [[[4836, 5766], [4836, 5851], [4866, 5852], [4866, 5963], [4935, 5973], [4943, 5958], [4960, 5972], [4992, 5979], [5012, 5945], [5018, 5927], [5049, 5909], [5051, 5897], [5064, 5897], [5063, 5879], [5074, 5864], [5103, 5857], [5112, 5845], [5077, 5829], [5065, 5814], [5043, 5800], [5039, 5782], [5026, 5770], [5010, 5766], [5002, 5739], [4978, 5732], [4953, 5739], [4939, 5749], [4926, 5749], [4917, 5728], [4887, 5700], [4857, 5699], [4862, 5723], [4848, 5757], [4836, 5766]]] } }] };

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _maxmindToHighmaps = __webpack_require__(96);

	Object.keys(_maxmindToHighmaps).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _maxmindToHighmaps[key];
	    }
	  });
	});

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.maxmindToHighmaps = undefined;

	var _RU = __webpack_require__(97);

	var _UA = __webpack_require__(98);

	var maxmindToHighmaps = exports.maxmindToHighmaps = {
	    regions: {
	        RU: _RU.RU,
	        UA: _UA.UA
	    },
	    mapsPaths: {
	        UA: 'countries/ua',
	        RU: 'countries/ru/custom/ru-all-disputed',
	        worldPalestine: 'custom/world-palestine'
	    }
	};

/***/ }),
/* 97 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var RU = exports.RU = {
	    '1': 'ru-ad',
	    '2': 'ru-bu',
	    '3': 'ru-ga',
	    '4': 'ru-al',
	    '5': 'ru-am',
	    '6': 'ru-ar',
	    '7': 'ru-as',
	    '8': 'ru-bk',
	    '9': 'ru-bl', //,"Belgorod"
	    // The same as above but with leading zero.
	    '01': 'ru-ad',
	    '02': 'ru-bu',
	    '03': 'ru-ga',
	    '04': 'ru-al',
	    '05': 'ru-am',
	    '06': 'ru-ar',
	    '07': 'ru-as',
	    '08': 'ru-bk',
	    '09': 'ru-bl', //,"Belgorod"
	    '10': 'ru-br', //,"Bryansk"
	    '11': 'ru-bu', //,"Buryat"
	    '12': 'ru-cn', //,"Chechnya"
	    '13': 'ru-cl', //"Chelyabinsk"
	    '14': 'ru-ct', //,"Chita"
	    '15': 'ru-2485', //,"Chukot"
	    '16': 'ru-cv', //"Chuvashia"
	    '17': 'ru-da', //,"Dagestan"
	    '18': 'ru-ck', //,"Evenk"
	    '19': 'ru-in', //,"Ingush"
	    '20': 'ru-ir', //,"Irkutsk"
	    '21': 'ru-iv', //,"Ivanovo"
	    '22': 'ru-kb', //"Kabardin-Balkar"
	    '23': 'ru-kn', //"Kaliningrad"
	    '24': 'ru-kl', //"Kalmyk"
	    '25': 'ru-kg', //,"Kaluga"
	    '26': 'ru-ka', //,"Kamchatka"
	    '27': 'ru-kc', //,"Karachay-Cherkess"
	    '28': 'ru-ki', //,"Karelia"
	    '29': 'ru-ke', //,"Kemerovo"
	    '30': 'ru-kh', //,"Khabarovsk"
	    '31': 'ru-kk', //,"Khakass"
	    '32': 'ru-km', //,"Khanty-Mansiy"
	    '33': 'ru-kv', //,"Kirov"
	    '34': 'ru-ko', //,"Komi"
	    '36': 'ru-ka',
	    '37': 'ru-kt',
	    '38': 'ru-kd', //"Krasnodar"
	    '39': 'ru-ky', //"Krasnoyarsk"
	    '40': 'ru-ku', //"Kurgan"
	    '41': 'ru-ks', //,"Kursk"
	    '42': 'ru-ln', //,"Leningrad"
	    '43': 'ru-lp', //,"Lipetsk"
	    '44': 'ru-mg', //,"Magadan"
	    '45': 'ru-me', //"Mariy-El"
	    '46': 'ru-mr', //"Mordovia"
	    '47': 'ru-2509', //,"Moskva"
	    '48': 'ru-ms', //,"Moscow City"
	    '49': 'ru-mm', //,"Murmansk"
	    '50': 'ru-nn', //,"Nenets"
	    '51': 'ru-nz', //,"Nizhegorod"
	    '52': 'ru-ng', //,"Novgorod"
	    '53': 'ru-ns', //,"Novosibirsk"
	    '54': 'ru-om', //,"Omsk"
	    '55': 'ru-ob', //,"Orenburg"
	    '56': 'ru-ol', //,"Orel"
	    '57': 'ru-pz', //,"Penza"
	    '58': 'ru-pe', //"Perm'"
	    '59': 'ru-pr', //"Primor'ye"
	    '60': 'ru-ps', //,"Pskov"
	    '61': 'ru-ro', //,"Rostov"
	    '62': 'ru-rz', //"Ryazan'"
	    '63': 'ru-ck', //,"Sakha"
	    '64': 'ru-sl', //,"Sakhalin"
	    '65': 'ru-sa', //,"Samara"
	    '66': 'ru-sp', //,"Saint Petersburg City"
	    '67': 'ru-sr', //,"Saratov"
	    '68': 'ru-no', //,"North Ossetia"
	    '69': 'ru-sm', //,"Smolensk"
	    '70': 'ru-st', //,"Stavropol'"
	    '71': 'ru-sv', //,"Sverdlovsk"
	    '72': 'ru-tb', //,"Tambovskaya oblast"
	    '73': 'ru-tt', //,"Tatarstan"
	    '74': 'ru-ky', //,"Taymyr"
	    '75': 'ru-to', //,"Tomsk"
	    '76': 'ru-tl', //,"Tula"
	    '77': 'ru-tv', //,"Tver'"
	    '78': 'ru-ty', //"Tyumen'"
	    '79': 'ru-tu', //"Tuva"
	    '80': 'ru-ud', //,"Udmurt"
	    '81': 'ru-ul', //,"Ul'yanovsk"
	    '83': 'ru-vl', //,"Vladimir"
	    '84': 'ru-vg', //,"Volgograd"
	    '85': 'ru-vo', //,"Vologda"
	    '86': 'ru-vr', //,"Voronezh"
	    '87': 'ru-yn', //,"Yamal-Nenets"
	    '88': 'ru-ys', //,"Yaroslavl'"
	    '89': 'ru-yv',
	    '90': 'ru-pe', //,"Permskiy Kray"
	    '91': 'ru-ky', //,"Krasnoyarskiy Kray"
	    '92': 'ru-ka', //,"Kamchatskiy Kray"
	    '93': 'ru-ct' //,"Zabaykal'skiy Kray"
	};

/***/ }),
/* 98 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var UA = exports.UA = {
	    '1': 'ua-ck', // Cherkasy
	    '2': 'ua-ch', // Chernigov
	    '3': 'ua-cv', // Chernivets
	    '4': 'ua-dp', // Dnipropetrovsk
	    '5': 'ua-dt', // Donetsk
	    '6': 'ua-if', // Ivano-Frankovsk
	    '7': 'ua-kk', // Kharkiv Oblast
	    '8': 'ua-ks', // Kherson
	    '9': 'ua-km', // Khmelnitsky
	    // The same as above but with leading zero.
	    '01': 'ua-ck', // Cherkasy
	    '02': 'ua-ch', // Chernigov
	    '03': 'ua-cv', // Chernivets
	    '04': 'ua-dp', // Dnipropetrovsk
	    '05': 'ua-dt', // Donetsk
	    '06': 'ua-if', // Ivano-Frankovsk
	    '07': 'ua-kk', // Kharkiv Oblast
	    '08': 'ua-ks', // Kherson
	    '09': 'ua-km', // Khmelnitsky
	    '10': 'ua-kh', // Kirovohrad
	    '11': 'ua-kr', // Krim
	    '12': 'ua-kc', // Kiev City Municipality
	    '13': 'ua-kv', // Kiev Oblast
	    '14': 'ua-lh', // Luhans
	    '15': 'ua-lv', // Llvov
	    '16': 'ua-mk', // Mykolaiv
	    '17': 'ua-my', // Odesskaya
	    '18': 'ua-pl', // Poltava
	    '19': 'ua-rv', // Rovno
	    '20': 'ua-sc', // Sevastopol
	    '21': 'ua-sm', // Sumy Oblast
	    '22': 'ua-tp', // Ternopol
	    '23': 'ua-vi', // Vinnytsia
	    '24': 'ua-vo', // Volyn
	    '25': 'ua-zk', // Zakarpattia
	    '26': 'ua-zp', // Zaporizhia
	    '27': 'ua-zt' // Zhytomyr
	};

/***/ }),
/* 99 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.isSameNumber = isSameNumber;
	exports.parseHTML = parseHTML;
	/**
	 * Checks is given numbers are same.
	 * NaN is equal NaN in this case.
	 * @param {number} a
	 * @param {number} b
	 * @returns {boolean}
	 */
	function isSameNumber(a, b) {
	  return isNaN(a) && isNaN(b) || a === b;
	}

	/**
	 * Parses given string as html and returns created DOM elements within HTMLCollection.
	 * @param {string} html
	 * @returns {HTMLCollection}
	 */
	function parseHTML(html) {
	  var domParser = new DOMParser();
	  var doc = domParser.parseFromString(html, "text/html");
	  var elements = doc.querySelectorAll('body > *');
	  return elements;
	}

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.createHighchartMap = createHighchartMap;
	exports.destroyHighchartMap = destroyHighchartMap;
	exports.updateHighchartMapData = updateHighchartMapData;
	exports.updateHighchartByRanges = updateHighchartByRanges;

	var _highmaps = __webpack_require__(6);

	var _highmaps2 = _interopRequireDefault(_highmaps);

	var _utils = __webpack_require__(99);

	var _get = __webpack_require__(33);

	var _get2 = _interopRequireDefault(_get);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @typedef {object} ChartDataItem
	 * @property {string} hc-key Highcharts contry code or region ID.
	 * @property {number} value Key value.
	 */

	/**
	 * @typedef {object} CommonParams
	 * @property {HTMLElement} containerElement HTML element that will contain created Highcharts map.
	 * Container should have ID!
	 * @property {string} mapPath Path to Highmaps mapdata.
	 * http://code.highcharts.com/mapdata/
	 * @property {ChartDataItem} data Chart data.
	 * @property {boolean} allAreas Need to show all areas of map.
	 * @property {number} rangesNumber Number of ranges to generate.
	 * @property {number} [minInRange] Number to use as minimum value.
	 * @property {number} [maxInRange] Number to use as maximum value.
	 */

	/**
	 * Creates new Highchart map instance by given parameters.
	 * @param {CommonParams} params
	 * @returns {Highcharts.Chart} Chart instance.
	 */
	function createHighchartMap(params) {
	    var ranges = getRanges(params);
	    var colorAxisDataClasses = getColorAxisDataClasses(ranges);
	    return createHighchartsMapInstance(params, colorAxisDataClasses);
	}

	/**
	 * Destroys given chart and it's container.
	 * @see https://api.highcharts.com/class-reference/Highcharts.Chart
	 * @param {Highcharts.Chart} chart Chart instance.
	 */
	function destroyHighchartMap(chart) {
	    if (chart) {
	        var chartContainer = (0, _get2.default)(chart, 'container.parentNode', null);
	        chart.destroy();
	        if (chartContainer) {
	            chartContainer.parentNode.removeChild(chartContainer);
	        }
	    }
	}

	/**
	 * Updates series within given chart.
	 * @param {Highcharts.Chart} chart Chart instance.
	 * @param {...ChartDataItem[]} seriesData Data for corresponding series.
	 * @example
	 * const dataForFirstSerie = ...;
	 * const dataForSecondSerie = ...;
	 * updateHighchartMapData(chartInstance, dataForFirstSerie, dataForSecondSerie);
	 */
	function updateHighchartMapData(chart) {
	    for (var _len = arguments.length, seriesData = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        seriesData[_key - 1] = arguments[_key];
	    }

	    seriesData.forEach(function (data, index) {
	        chart.series[index].setData(data);
	    });
	}

	/**
	 * Updates colorAxis with given settings.
	 * @param {Highcharts.Chart} chart
	 * @param {CommonParams} params
	 */
	function updateHighchartByRanges(chart, params) {
	    var ranges = getRanges(params);
	    var dataClasses = getColorAxisDataClasses(ranges);
	    chart.colorAxis[0].update({ dataClasses: dataClasses });
	}

	/**
	 * Creates new instance of the Highcharts.mapChart and inserts it to a given container.
	 * @private
	 * @param {CommonParams} params
	 * @param {object[]} colorAxisDataClasses List of dataClasses options for colorAxis parameter.
	 * https://api.highcharts.com/highcharts/colorAxis.dataClasses
	 * @return {Highcharts.Chart} Chart instance.
	 */
	function createHighchartsMapInstance(params, colorAxisDataClasses) {
	    var chartElement = createHighchartChartElement(params.containerElement);

	    return _highmaps2.default.mapChart(chartElement, {
	        chart: {
	            map: params.mapPath
	        },
	        title: {
	            text: ''
	        },
	        mapNavigation: {
	            enabled: true,
	            buttonOptions: {
	                verticalAlign: 'bottom'
	            }
	        },
	        legend: {
	            title: {
	                text: null,
	                style: {
	                    color: _highmaps2.default.theme && _highmaps2.default.theme.textColor || 'black'
	                }
	            },
	            align: 'right',
	            verticalAlign: 'bottom',
	            valueDecimals: 0,
	            backgroundColor: _highmaps2.default.theme && _highmaps2.default.theme.legendBackgroundColor || 'rgba(255, 255, 255, 0.85)',
	            symbolRadius: 0,
	            symbolHeight: 14
	        },
	        colorAxis: {
	            dataClasses: colorAxisDataClasses
	        },
	        xAxis: {
	            events: {
	                afterSetExtremes: function afterSetExtremes(event) {
	                    return saveExtremes(event, 'x', params.mapPath);
	                }
	            }
	        },
	        yAxis: {
	            events: {
	                afterSetExtremes: function afterSetExtremes(event) {
	                    return saveExtremes(event, 'y', params.mapPath);
	                }
	            }
	        },
	        series: [{
	            data: params.data.slice(),
	            name: 'Data set',
	            joinBy: 'hc-key',
	            allAreas: params.allAreas,
	            states: {
	                hover: {
	                    color: '#724cf9'
	                }
	            }
	        }]
	    }, function (chart) {
	        restoreZoom(chart, params.mapPath);
	    });
	}

	/**
	 * Restores zoom settings from localStorage
	 * @see http://sibeeshpassion.com/how-to-save-the-zoom-view-of-our-map/
	 * @private
	 * @param {Highcharts.Chart} chart Chart instance.
	 * @param {string} mapPath
	 */
	function restoreZoom(chart, mapPath) {
	    var xExtremes = restoreExtremes('x', mapPath);
	    var yExtremes = restoreExtremes('y', mapPath);
	    if (!xExtremes || !yExtremes) {
	        return;
	    }

	    chart.xAxis[0].setExtremes(xExtremes.min, xExtremes.max);
	    chart.yAxis[0].setExtremes(yExtremes.min, yExtremes.max);
	}

	/**
	 * Restores extremes (min,max) from sessionStorage for given axisType and mapPath.
	 * @see http://sibeeshpassion.com/how-to-save-the-zoom-view-of-our-map/
	 * @private
	 * @param {string} axisType
	 * @param {string} mapPath
	 * @returns {object} { min: number, max: number} or null if no value is stored in the sessionStorage.
	 */
	function restoreExtremes(axisType, mapPath) {
	    var key = 'exteme_' + axisType + '_' + mapPath;
	    var value = sessionStorage.getItem(key) || '';
	    var rawExtremes = value.split(' ');
	    if (rawExtremes.length !== 2) {
	        return null;
	    }

	    var extremes = {
	        min: +rawExtremes[0],
	        max: +rawExtremes[1]
	    };
	    return extremes;
	}

	/**
	 * Saves given extremes from event for given map and axis type to the sessionStorage.
	 * @see http://sibeeshpassion.com/how-to-save-the-zoom-view-of-our-map/
	 * @private
	 * @param {object} event afterSetExtremes event.
	 * @param {number} event.max
	 * @param {number} event.min
	 * @param {string} axisType
	 * @param {string} mapPath
	 */
	function saveExtremes(event, axisType, mapPath) {
	    if (isNaN(event.min) || isNaN(event.max)) {
	        return;
	    }

	    var key = 'exteme_' + axisType + '_' + mapPath;
	    var value = [event.min.toFixed(5), event.max.toFixed(5)].join(' ');
	    sessionStorage.setItem(key, value);
	}

	/**
	 * Generates colorAxis.dataClasses values for given data ranges.
	 * @private
	 * @param {number[]} ranges
	 * @returns {object[]}
	 * https://api.highcharts.com/highcharts/colorAxis.dataClasses
	 */
	function getColorAxisDataClasses(ranges) {
	    var colorAxisDataClasses = ranges.slice(1).map(function (toRange, index) {
	        var indexColorNumber = Math.floor((index + 1) / ranges.length * 255);
	        var redColor = indexColorNumber;
	        var greenColor = 255 - indexColorNumber;
	        var dataClass = {
	            color: 'rgb(' + redColor + ', ' + greenColor + ', 0)'
	        };
	        var fromValue = ranges[index];
	        var fromInfinity = fromValue === Number.MIN_VALUE;
	        var toInfinity = toRange === Number.MAX_VALUE;
	        if (!fromInfinity) {
	            dataClass.from = fromValue;
	        }
	        if (!toInfinity) {
	            dataClass.to = toRange;
	        }
	        return dataClass;
	    });
	    return colorAxisDataClasses;
	}

	/**
	 * Generates data ranges to generate colorAxis.dataClasses.
	 * @private
	 * @param {CommonParams} params
	 * @returns {number[]}
	 */
	function getRanges(params) {
	    var values = params.data.map(function (dataItem) {
	        return dataItem.value;
	    });
	    var hasValues = values.length > 0;
	    var ranges = [];
	    var rangesNumber = params.rangesNumber;

	    var minInRange = params.minInRange;
	    var hasMinInRange = !isNaN(minInRange);
	    var minValue = hasValues ? values.reduce(function (minValue, value) {
	        return Math.min(minValue, value);
	    }) : 0;
	    var addNegativeInfinity = hasMinInRange && minValue < minInRange;
	    // values in (-Infinity, minInRange]
	    if (addNegativeInfinity) {
	        ranges.push(Number.MIN_VALUE);
	        rangesNumber--;
	    }
	    var min = hasMinInRange ? minInRange : minValue;
	    ranges.push(min);

	    var maxInRange = params.maxInRange;
	    var hasMaxInRange = !isNaN(maxInRange);
	    var maxValue = hasValues ? values.reduce(function (max, value) {
	        return Math.max(max, value);
	    }) : 0;
	    var addPositiveInfinity = hasMaxInRange && maxValue > maxInRange;
	    // values in [maxInRange, +Infinity)
	    if (addPositiveInfinity) {
	        rangesNumber--;
	    }
	    var max = hasMaxInRange ? maxInRange : maxValue;

	    if (rangesNumber) {
	        var rangeStep = (max - min) / rangesNumber;
	        for (var i = 1; i <= rangesNumber; i++) {
	            ranges.push(min + Math.round(rangeStep * i));
	        }
	        ranges[ranges.length - 1] = max;
	    }
	    if (addPositiveInfinity) {
	        ranges.push(Number.MAX_VALUE);
	    }

	    return ranges;
	}

	/**
	 * Creates DIV element to render chart to.
	 * Container should have ID!
	 * @private
	 * @param {HTMLElement} container
	 * @returns {HTMLElement}
	 */
	function createHighchartChartElement(container) {
	    var random = Math.floor(Math.random() * 1000000);
	    var chartElementHtml = '' + ('<div id="' + container.id + '__chart_' + random + '" ') + 'style="height: 100%; flex: 1;" ' + '></div>';
	    var chartElement = (0, _utils.parseHTML)(chartElementHtml)[0];
	    container.appendChild(chartElement);
	    return chartElement;
	}

/***/ })
/******/ ]);