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
	  id: "volume-leaflet",
	  name: "volume-leaflet",
	  icon: "<i class='fa fa-globe'></i>",
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

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _zeppelinVis = __webpack_require__(2);

	var _zeppelinVis2 = _interopRequireDefault(_zeppelinVis);

	var _columnselector = __webpack_require__(3);

	var _columnselector2 = _interopRequireDefault(_columnselector);

	var _leaflet = __webpack_require__(5);

	var _leaflet2 = _interopRequireDefault(_leaflet);

	__webpack_require__(7);

	var _markerIcon = __webpack_require__(12);

	var _markerIcon2 = _interopRequireDefault(_markerIcon);

	var _markerShadow = __webpack_require__(14);

	var _markerShadow2 = _interopRequireDefault(_markerShadow);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2017 Volume Integration
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2017 Tom Grant
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Redistribution and use in source and binary forms, with or without 
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * modification, are permitted provided that the following conditions are met:
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 1. Redistributions of source code must retain the above copyright notice,
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * this list of conditions and the following disclaimer.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 2. Redistributions in binary form must reproduce the above copyright notice,
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * this list of conditions and the following disclaimer in the documentation
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * and/or other materials provided with the distribution.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF 
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * POSSIBILITY OF SUCH DAMAGE.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	// workaround https://github.com/Leaflet/Leaflet/issues/4968


	var DefaultIcon = _leaflet2.default.icon({
	  iconUrl: _markerIcon2.default,
	  iconSize: [25, 41],
	  iconAnchor: [12, 41],
	  popupAnchor: [0, -41],
	  tooltipAnchor: [12, -28],
	  shadowUrl: _markerShadow2.default
	});
	_leaflet2.default.Marker.prototype.options.icon = DefaultIcon;

	var LeafletMap = function (_Visualization) {
	  _inherits(LeafletMap, _Visualization);

	  function LeafletMap(targetEl, config) {
	    _classCallCheck(this, LeafletMap);

	    var _this = _possibleConstructorReturn(this, (LeafletMap.__proto__ || Object.getPrototypeOf(LeafletMap)).call(this, targetEl, config));

	    var columnSpec = [{ name: 'coordinates' }, { name: 'tooltip' }, { name: 'popup' }, { name: 'gis_server' }];

	    _this.transformation = new _columnselector2.default(config, columnSpec);
	    _this.chartInstance = _leaflet2.default.map(_this.getChartElementId());
	    return _this;
	  }

	  _createClass(LeafletMap, [{
	    key: 'getTransformation',
	    value: function getTransformation() {
	      return this.transformation;
	    }
	  }, {
	    key: 'showChart',
	    value: function showChart() {
	      _get(LeafletMap.prototype.__proto__ || Object.getPrototypeOf(LeafletMap.prototype), 'setConfig', this).call(this, config);
	      this.transformation.setConfig(config);
	      if (!this.chartInstance) {
	        this.chartInstance = _leaflet2.default.map(this.getChartElementId());
	      }
	      return this.chartInstance;
	    }
	  }, {
	    key: 'getChartElementId',
	    value: function getChartElementId() {
	      return this.targetEl[0].id;
	    }
	  }, {
	    key: 'getChartElement',
	    value: function getChartElement() {
	      return document.getElementById(this.getChartElementId());
	    }
	  }, {
	    key: 'clearChart',
	    value: function clearChart() {
	      if (this.chartInstance) {
	        this.chartInstance.off();
	        this.chartInstance.remove();
	        this.chartInstance = null;
	      }
	    }
	  }, {
	    key: 'showError',
	    value: function showError(error) {
	      this.clearChart();
	      this.getChartElement().innerHTML = '\n        <div style="margin-top: 60px; text-align: center; font-weight: 100">\n            <span style="font-size:30px;">\n                ' + error.message + ' \n            </span>\n        </div>';
	    }
	  }, {
	    key: 'drawMapChart',
	    value: function drawMapChart(chartDataModel) {

	      var map = this.showChart();

	      var minLat = 180;
	      var maxLat = -180;
	      var minLng = 90;
	      var maxLng = -90;

	      // split coordinates into lat,lng,alt
	      var coordRegex = /^([-+]?[1-8]?\d(\.\d+)?|90(\.0+)?)\s*,\s*([-+]?(180(\.0+)?|(1[0-7]\d)(\.\d+)?|([1-9]?\d)(\.\d+)?))\s*(,\s*([-+]?\d+(\.\d+)?))?$/;

	      var gis_server = 'x';
	      for (var i = 0; i < chartDataModel.rows.length; i++) {
	        var row = chartDataModel.rows[i];
	        var coord = row[0];
	        var tooltip = row[1];
	        var popup = row[2];
	        gis_server = row[3];

	        var regexResults = coordRegex.exec(coord);

	        if (null !== regexResults) {
	          var lat = Number(regexResults[1]);
	          var lng = Number(regexResults[4]);
	          //const alt = Number(regexResults[11]);

	          minLat = Math.min(minLat, lat - 0.04);
	          minLng = Math.min(minLng, lng - 0.01);
	          maxLat = Math.max(maxLat, lat + 0.04);
	          maxLng = Math.max(maxLng, lng + 0.01);

	          var marker = _leaflet2.default.marker([lat, lng]);
	          var mapMarker = marker.addTo(map);

	          if (tooltip && tooltip !== '') {
	            mapMarker.bindTooltip(tooltip);
	          }

	          if (popup && popup !== '') {
	            mapMarker.bindPopup(popup);
	          }
	        }
	      }

	      var bounds = [[maxLat, maxLng], [minLat, minLng]];

	      map.fitBounds(bounds);
	      _leaflet2.default.tileLayer('http://{s}.' + gis_server + '/{z}/{x}/{y}.png', {
	        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	      }).addTo(map);

	      this.getChartElement().style.height = this.targetEl.height();
	      map.invalidateSize(true);
	    }
	  }, {
	    key: 'createMapDataModel',
	    value: function createMapDataModel(data) {

	      var getColumnIndex = function getColumnIndex(config, fieldName, isOptional) {
	        var fieldConf = config[fieldName];
	        if (fieldConf instanceof Object) {
	          return fieldConf.index;
	        } else if (isOptional) {
	          return -1;
	        } else {
	          throw {
	            message: "Please set " + fieldName + " in Settings"
	          };
	        }
	      };

	      var config = this.getTransformation().config;
	      var coordIdx = getColumnIndex(config, 'coordinates');
	      var tooltipIdx = getColumnIndex(config, 'tooltip');
	      var popupIdx = getColumnIndex(config, 'popup', true);
	      var gisIdx = getColumnIndex(config, 'gis_server', true);

	      var mapDataModel = {
	        rows: []
	      };

	      for (var i = 0; i < data.rows.length; i++) {
	        var tableRow = data.rows[i];
	        var coord = tableRow[coordIdx];
	        var tooltip = tableRow[tooltipIdx];
	        var popup = popupIdx < 0 ? null : tableRow[popupIdx];
	        var gis_server = gisIdx < 0 ? 'tile.osm.org' : tableRow[gisIdx];
	        var mapRow = [coord, tooltip, popup, gis_server];
	        mapDataModel.rows.push(mapRow);
	      }

	      return mapDataModel;
	    }
	  }, {
	    key: 'render',
	    value: function render(data) {
	      try {
	        var mapDataModel = this.createMapDataModel(data);
	        this.drawMapChart(mapDataModel);
	      } catch (error) {
	        console.error(error);
	        this.showError(error);
	      }
	    }
	  }]);

	  return LeafletMap;
	}(_zeppelinVis2.default);

	exports.default = LeafletMap;

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

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
	 Leaflet 1.0.3, a JS library for interactive maps. http://leafletjs.com
	 (c) 2010-2016 Vladimir Agafonkin, (c) 2010-2011 CloudMade
	*/
	!function(t,e,i){function n(){var e=t.L;o.noConflict=function(){return t.L=e,this},t.L=o}var o={version:"1.0.3"};"object"==typeof module&&"object"==typeof module.exports?module.exports=o:"function"=="function"&&__webpack_require__(6)&&!(__WEBPACK_AMD_DEFINE_FACTORY__ = (o), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)),"undefined"!=typeof t&&n(),o.Util={extend:function(t){var e,i,n,o;for(i=1,n=arguments.length;i<n;i++){o=arguments[i];for(e in o)t[e]=o[e]}return t},create:Object.create||function(){function t(){}return function(e){return t.prototype=e,new t}}(),bind:function(t,e){var i=Array.prototype.slice;if(t.bind)return t.bind.apply(t,i.call(arguments,1));var n=i.call(arguments,2);return function(){return t.apply(e,n.length?n.concat(i.call(arguments)):arguments)}},stamp:function(t){return t._leaflet_id=t._leaflet_id||++o.Util.lastId,t._leaflet_id},lastId:0,throttle:function(t,e,i){var n,o,s,r;return r=function(){n=!1,o&&(s.apply(i,o),o=!1)},s=function(){n?o=arguments:(t.apply(i,arguments),setTimeout(r,e),n=!0)}},wrapNum:function(t,e,i){var n=e[1],o=e[0],s=n-o;return t===n&&i?t:((t-o)%s+s)%s+o},falseFn:function(){return!1},formatNum:function(t,e){var i=Math.pow(10,e||5);return Math.round(t*i)/i},trim:function(t){return t.trim?t.trim():t.replace(/^\s+|\s+$/g,"")},splitWords:function(t){return o.Util.trim(t).split(/\s+/)},setOptions:function(t,e){t.hasOwnProperty("options")||(t.options=t.options?o.Util.create(t.options):{});for(var i in e)t.options[i]=e[i];return t.options},getParamString:function(t,e,i){var n=[];for(var o in t)n.push(encodeURIComponent(i?o.toUpperCase():o)+"="+encodeURIComponent(t[o]));return(e&&e.indexOf("?")!==-1?"&":"?")+n.join("&")},template:function(t,e){return t.replace(o.Util.templateRe,function(t,n){var o=e[n];if(o===i)throw new Error("No value provided for variable "+t);return"function"==typeof o&&(o=o(e)),o})},templateRe:/\{ *([\w_\-]+) *\}/g,isArray:Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)},indexOf:function(t,e){for(var i=0;i<t.length;i++)if(t[i]===e)return i;return-1},emptyImageUrl:"data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="},function(){function e(e){return t["webkit"+e]||t["moz"+e]||t["ms"+e]}function i(e){var i=+new Date,o=Math.max(0,16-(i-n));return n=i+o,t.setTimeout(e,o)}var n=0,s=t.requestAnimationFrame||e("RequestAnimationFrame")||i,r=t.cancelAnimationFrame||e("CancelAnimationFrame")||e("CancelRequestAnimationFrame")||function(e){t.clearTimeout(e)};o.Util.requestAnimFrame=function(e,n,r){return r&&s===i?void e.call(n):s.call(t,o.bind(e,n))},o.Util.cancelAnimFrame=function(e){e&&r.call(t,e)}}(),o.extend=o.Util.extend,o.bind=o.Util.bind,o.stamp=o.Util.stamp,o.setOptions=o.Util.setOptions,o.Class=function(){},o.Class.extend=function(t){var e=function(){this.initialize&&this.initialize.apply(this,arguments),this.callInitHooks()},i=e.__super__=this.prototype,n=o.Util.create(i);n.constructor=e,e.prototype=n;for(var s in this)this.hasOwnProperty(s)&&"prototype"!==s&&(e[s]=this[s]);return t.statics&&(o.extend(e,t.statics),delete t.statics),t.includes&&(o.Util.extend.apply(null,[n].concat(t.includes)),delete t.includes),n.options&&(t.options=o.Util.extend(o.Util.create(n.options),t.options)),o.extend(n,t),n._initHooks=[],n.callInitHooks=function(){if(!this._initHooksCalled){i.callInitHooks&&i.callInitHooks.call(this),this._initHooksCalled=!0;for(var t=0,e=n._initHooks.length;t<e;t++)n._initHooks[t].call(this)}},e},o.Class.include=function(t){return o.extend(this.prototype,t),this},o.Class.mergeOptions=function(t){return o.extend(this.prototype.options,t),this},o.Class.addInitHook=function(t){var e=Array.prototype.slice.call(arguments,1),i="function"==typeof t?t:function(){this[t].apply(this,e)};return this.prototype._initHooks=this.prototype._initHooks||[],this.prototype._initHooks.push(i),this},o.Evented=o.Class.extend({on:function(t,e,i){if("object"==typeof t)for(var n in t)this._on(n,t[n],e);else{t=o.Util.splitWords(t);for(var s=0,r=t.length;s<r;s++)this._on(t[s],e,i)}return this},off:function(t,e,i){if(t)if("object"==typeof t)for(var n in t)this._off(n,t[n],e);else{t=o.Util.splitWords(t);for(var s=0,r=t.length;s<r;s++)this._off(t[s],e,i)}else delete this._events;return this},_on:function(t,e,n){this._events=this._events||{};var o=this._events[t];o||(o=[],this._events[t]=o),n===this&&(n=i);for(var s={fn:e,ctx:n},r=o,a=0,h=r.length;a<h;a++)if(r[a].fn===e&&r[a].ctx===n)return;r.push(s)},_off:function(t,e,n){var s,r,a;if(this._events&&(s=this._events[t])){if(!e){for(r=0,a=s.length;r<a;r++)s[r].fn=o.Util.falseFn;return void delete this._events[t]}if(n===this&&(n=i),s)for(r=0,a=s.length;r<a;r++){var h=s[r];if(h.ctx===n&&h.fn===e)return h.fn=o.Util.falseFn,this._firingCount&&(this._events[t]=s=s.slice()),void s.splice(r,1)}}},fire:function(t,e,i){if(!this.listens(t,i))return this;var n=o.Util.extend({},e,{type:t,target:this});if(this._events){var s=this._events[t];if(s){this._firingCount=this._firingCount+1||1;for(var r=0,a=s.length;r<a;r++){var h=s[r];h.fn.call(h.ctx||this,n)}this._firingCount--}}return i&&this._propagateEvent(n),this},listens:function(t,e){var i=this._events&&this._events[t];if(i&&i.length)return!0;if(e)for(var n in this._eventParents)if(this._eventParents[n].listens(t,e))return!0;return!1},once:function(t,e,i){if("object"==typeof t){for(var n in t)this.once(n,t[n],e);return this}var s=o.bind(function(){this.off(t,e,i).off(t,s,i)},this);return this.on(t,e,i).on(t,s,i)},addEventParent:function(t){return this._eventParents=this._eventParents||{},this._eventParents[o.stamp(t)]=t,this},removeEventParent:function(t){return this._eventParents&&delete this._eventParents[o.stamp(t)],this},_propagateEvent:function(t){for(var e in this._eventParents)this._eventParents[e].fire(t.type,o.extend({layer:t.target},t),!0)}});var s=o.Evented.prototype;s.addEventListener=s.on,s.removeEventListener=s.clearAllEventListeners=s.off,s.addOneTimeEventListener=s.once,s.fireEvent=s.fire,s.hasEventListeners=s.listens,o.Mixin={Events:s},function(){var i=navigator.userAgent.toLowerCase(),n=e.documentElement,s="ActiveXObject"in t,r=i.indexOf("webkit")!==-1,a=i.indexOf("phantom")!==-1,h=i.search("android [23]")!==-1,l=i.indexOf("chrome")!==-1,u=i.indexOf("gecko")!==-1&&!r&&!t.opera&&!s,c=0===navigator.platform.indexOf("Win"),d="undefined"!=typeof orientation||i.indexOf("mobile")!==-1,_=!t.PointerEvent&&t.MSPointerEvent,m=t.PointerEvent||_,p=s&&"transition"in n.style,f="WebKitCSSMatrix"in t&&"m11"in new t.WebKitCSSMatrix&&!h,g="MozPerspective"in n.style,v="OTransition"in n.style,y=!t.L_NO_TOUCH&&(m||"ontouchstart"in t||t.DocumentTouch&&e instanceof t.DocumentTouch);o.Browser={ie:s,ielt9:s&&!e.addEventListener,edge:"msLaunchUri"in navigator&&!("documentMode"in e),webkit:r,gecko:u,android:i.indexOf("android")!==-1,android23:h,chrome:l,safari:!l&&i.indexOf("safari")!==-1,win:c,ie3d:p,webkit3d:f,gecko3d:g,opera12:v,any3d:!t.L_DISABLE_3D&&(p||f||g)&&!v&&!a,mobile:d,mobileWebkit:d&&r,mobileWebkit3d:d&&f,mobileOpera:d&&t.opera,mobileGecko:d&&u,touch:!!y,msPointer:!!_,pointer:!!m,retina:(t.devicePixelRatio||t.screen.deviceXDPI/t.screen.logicalXDPI)>1}}(),o.Point=function(t,e,i){this.x=i?Math.round(t):t,this.y=i?Math.round(e):e},o.Point.prototype={clone:function(){return new o.Point(this.x,this.y)},add:function(t){return this.clone()._add(o.point(t))},_add:function(t){return this.x+=t.x,this.y+=t.y,this},subtract:function(t){return this.clone()._subtract(o.point(t))},_subtract:function(t){return this.x-=t.x,this.y-=t.y,this},divideBy:function(t){return this.clone()._divideBy(t)},_divideBy:function(t){return this.x/=t,this.y/=t,this},multiplyBy:function(t){return this.clone()._multiplyBy(t)},_multiplyBy:function(t){return this.x*=t,this.y*=t,this},scaleBy:function(t){return new o.Point(this.x*t.x,this.y*t.y)},unscaleBy:function(t){return new o.Point(this.x/t.x,this.y/t.y)},round:function(){return this.clone()._round()},_round:function(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this},floor:function(){return this.clone()._floor()},_floor:function(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this},ceil:function(){return this.clone()._ceil()},_ceil:function(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this},distanceTo:function(t){t=o.point(t);var e=t.x-this.x,i=t.y-this.y;return Math.sqrt(e*e+i*i)},equals:function(t){return t=o.point(t),t.x===this.x&&t.y===this.y},contains:function(t){return t=o.point(t),Math.abs(t.x)<=Math.abs(this.x)&&Math.abs(t.y)<=Math.abs(this.y)},toString:function(){return"Point("+o.Util.formatNum(this.x)+", "+o.Util.formatNum(this.y)+")"}},o.point=function(t,e,n){return t instanceof o.Point?t:o.Util.isArray(t)?new o.Point(t[0],t[1]):t===i||null===t?t:"object"==typeof t&&"x"in t&&"y"in t?new o.Point(t.x,t.y):new o.Point(t,e,n)},o.Bounds=function(t,e){if(t)for(var i=e?[t,e]:t,n=0,o=i.length;n<o;n++)this.extend(i[n])},o.Bounds.prototype={extend:function(t){return t=o.point(t),this.min||this.max?(this.min.x=Math.min(t.x,this.min.x),this.max.x=Math.max(t.x,this.max.x),this.min.y=Math.min(t.y,this.min.y),this.max.y=Math.max(t.y,this.max.y)):(this.min=t.clone(),this.max=t.clone()),this},getCenter:function(t){return new o.Point((this.min.x+this.max.x)/2,(this.min.y+this.max.y)/2,t)},getBottomLeft:function(){return new o.Point(this.min.x,this.max.y)},getTopRight:function(){return new o.Point(this.max.x,this.min.y)},getSize:function(){return this.max.subtract(this.min)},contains:function(t){var e,i;return t="number"==typeof t[0]||t instanceof o.Point?o.point(t):o.bounds(t),t instanceof o.Bounds?(e=t.min,i=t.max):e=i=t,e.x>=this.min.x&&i.x<=this.max.x&&e.y>=this.min.y&&i.y<=this.max.y},intersects:function(t){t=o.bounds(t);var e=this.min,i=this.max,n=t.min,s=t.max,r=s.x>=e.x&&n.x<=i.x,a=s.y>=e.y&&n.y<=i.y;return r&&a},overlaps:function(t){t=o.bounds(t);var e=this.min,i=this.max,n=t.min,s=t.max,r=s.x>e.x&&n.x<i.x,a=s.y>e.y&&n.y<i.y;return r&&a},isValid:function(){return!(!this.min||!this.max)}},o.bounds=function(t,e){return!t||t instanceof o.Bounds?t:new o.Bounds(t,e)},o.Transformation=function(t,e,i,n){this._a=t,this._b=e,this._c=i,this._d=n},o.Transformation.prototype={transform:function(t,e){return this._transform(t.clone(),e)},_transform:function(t,e){return e=e||1,t.x=e*(this._a*t.x+this._b),t.y=e*(this._c*t.y+this._d),t},untransform:function(t,e){return e=e||1,new o.Point((t.x/e-this._b)/this._a,(t.y/e-this._d)/this._c)}},o.DomUtil={get:function(t){return"string"==typeof t?e.getElementById(t):t},getStyle:function(t,i){var n=t.style[i]||t.currentStyle&&t.currentStyle[i];if((!n||"auto"===n)&&e.defaultView){var o=e.defaultView.getComputedStyle(t,null);n=o?o[i]:null}return"auto"===n?null:n},create:function(t,i,n){var o=e.createElement(t);return o.className=i||"",n&&n.appendChild(o),o},remove:function(t){var e=t.parentNode;e&&e.removeChild(t)},empty:function(t){for(;t.firstChild;)t.removeChild(t.firstChild)},toFront:function(t){t.parentNode.appendChild(t)},toBack:function(t){var e=t.parentNode;e.insertBefore(t,e.firstChild)},hasClass:function(t,e){if(t.classList!==i)return t.classList.contains(e);var n=o.DomUtil.getClass(t);return n.length>0&&new RegExp("(^|\\s)"+e+"(\\s|$)").test(n)},addClass:function(t,e){if(t.classList!==i)for(var n=o.Util.splitWords(e),s=0,r=n.length;s<r;s++)t.classList.add(n[s]);else if(!o.DomUtil.hasClass(t,e)){var a=o.DomUtil.getClass(t);o.DomUtil.setClass(t,(a?a+" ":"")+e)}},removeClass:function(t,e){t.classList!==i?t.classList.remove(e):o.DomUtil.setClass(t,o.Util.trim((" "+o.DomUtil.getClass(t)+" ").replace(" "+e+" "," ")))},setClass:function(t,e){t.className.baseVal===i?t.className=e:t.className.baseVal=e},getClass:function(t){return t.className.baseVal===i?t.className:t.className.baseVal},setOpacity:function(t,e){"opacity"in t.style?t.style.opacity=e:"filter"in t.style&&o.DomUtil._setOpacityIE(t,e)},_setOpacityIE:function(t,e){var i=!1,n="DXImageTransform.Microsoft.Alpha";try{i=t.filters.item(n)}catch(t){if(1===e)return}e=Math.round(100*e),i?(i.Enabled=100!==e,i.Opacity=e):t.style.filter+=" progid:"+n+"(opacity="+e+")"},testProp:function(t){for(var i=e.documentElement.style,n=0;n<t.length;n++)if(t[n]in i)return t[n];return!1},setTransform:function(t,e,i){var n=e||new o.Point(0,0);t.style[o.DomUtil.TRANSFORM]=(o.Browser.ie3d?"translate("+n.x+"px,"+n.y+"px)":"translate3d("+n.x+"px,"+n.y+"px,0)")+(i?" scale("+i+")":"")},setPosition:function(t,e){t._leaflet_pos=e,o.Browser.any3d?o.DomUtil.setTransform(t,e):(t.style.left=e.x+"px",t.style.top=e.y+"px")},getPosition:function(t){return t._leaflet_pos||new o.Point(0,0)}},function(){o.DomUtil.TRANSFORM=o.DomUtil.testProp(["transform","WebkitTransform","OTransform","MozTransform","msTransform"]);var i=o.DomUtil.TRANSITION=o.DomUtil.testProp(["webkitTransition","transition","OTransition","MozTransition","msTransition"]);if(o.DomUtil.TRANSITION_END="webkitTransition"===i||"OTransition"===i?i+"End":"transitionend","onselectstart"in e)o.DomUtil.disableTextSelection=function(){o.DomEvent.on(t,"selectstart",o.DomEvent.preventDefault)},o.DomUtil.enableTextSelection=function(){o.DomEvent.off(t,"selectstart",o.DomEvent.preventDefault)};else{var n=o.DomUtil.testProp(["userSelect","WebkitUserSelect","OUserSelect","MozUserSelect","msUserSelect"]);o.DomUtil.disableTextSelection=function(){if(n){var t=e.documentElement.style;this._userSelect=t[n],t[n]="none"}},o.DomUtil.enableTextSelection=function(){n&&(e.documentElement.style[n]=this._userSelect,delete this._userSelect)}}o.DomUtil.disableImageDrag=function(){o.DomEvent.on(t,"dragstart",o.DomEvent.preventDefault)},o.DomUtil.enableImageDrag=function(){o.DomEvent.off(t,"dragstart",o.DomEvent.preventDefault)},o.DomUtil.preventOutline=function(e){for(;e.tabIndex===-1;)e=e.parentNode;e&&e.style&&(o.DomUtil.restoreOutline(),this._outlineElement=e,this._outlineStyle=e.style.outline,e.style.outline="none",o.DomEvent.on(t,"keydown",o.DomUtil.restoreOutline,this))},o.DomUtil.restoreOutline=function(){this._outlineElement&&(this._outlineElement.style.outline=this._outlineStyle,delete this._outlineElement,delete this._outlineStyle,o.DomEvent.off(t,"keydown",o.DomUtil.restoreOutline,this))}}(),o.LatLng=function(t,e,n){if(isNaN(t)||isNaN(e))throw new Error("Invalid LatLng object: ("+t+", "+e+")");this.lat=+t,this.lng=+e,n!==i&&(this.alt=+n)},o.LatLng.prototype={equals:function(t,e){if(!t)return!1;t=o.latLng(t);var n=Math.max(Math.abs(this.lat-t.lat),Math.abs(this.lng-t.lng));return n<=(e===i?1e-9:e)},toString:function(t){return"LatLng("+o.Util.formatNum(this.lat,t)+", "+o.Util.formatNum(this.lng,t)+")"},distanceTo:function(t){return o.CRS.Earth.distance(this,o.latLng(t))},wrap:function(){return o.CRS.Earth.wrapLatLng(this)},toBounds:function(t){var e=180*t/40075017,i=e/Math.cos(Math.PI/180*this.lat);return o.latLngBounds([this.lat-e,this.lng-i],[this.lat+e,this.lng+i])},clone:function(){return new o.LatLng(this.lat,this.lng,this.alt)}},o.latLng=function(t,e,n){return t instanceof o.LatLng?t:o.Util.isArray(t)&&"object"!=typeof t[0]?3===t.length?new o.LatLng(t[0],t[1],t[2]):2===t.length?new o.LatLng(t[0],t[1]):null:t===i||null===t?t:"object"==typeof t&&"lat"in t?new o.LatLng(t.lat,"lng"in t?t.lng:t.lon,t.alt):e===i?null:new o.LatLng(t,e,n)},o.LatLngBounds=function(t,e){if(t)for(var i=e?[t,e]:t,n=0,o=i.length;n<o;n++)this.extend(i[n])},o.LatLngBounds.prototype={extend:function(t){var e,i,n=this._southWest,s=this._northEast;if(t instanceof o.LatLng)e=t,i=t;else{if(!(t instanceof o.LatLngBounds))return t?this.extend(o.latLng(t)||o.latLngBounds(t)):this;if(e=t._southWest,i=t._northEast,!e||!i)return this}return n||s?(n.lat=Math.min(e.lat,n.lat),n.lng=Math.min(e.lng,n.lng),s.lat=Math.max(i.lat,s.lat),s.lng=Math.max(i.lng,s.lng)):(this._southWest=new o.LatLng(e.lat,e.lng),this._northEast=new o.LatLng(i.lat,i.lng)),this},pad:function(t){var e=this._southWest,i=this._northEast,n=Math.abs(e.lat-i.lat)*t,s=Math.abs(e.lng-i.lng)*t;return new o.LatLngBounds(new o.LatLng(e.lat-n,e.lng-s),new o.LatLng(i.lat+n,i.lng+s))},getCenter:function(){return new o.LatLng((this._southWest.lat+this._northEast.lat)/2,(this._southWest.lng+this._northEast.lng)/2)},getSouthWest:function(){return this._southWest},getNorthEast:function(){return this._northEast},getNorthWest:function(){return new o.LatLng(this.getNorth(),this.getWest())},getSouthEast:function(){return new o.LatLng(this.getSouth(),this.getEast())},getWest:function(){return this._southWest.lng},getSouth:function(){return this._southWest.lat},getEast:function(){return this._northEast.lng},getNorth:function(){return this._northEast.lat},contains:function(t){t="number"==typeof t[0]||t instanceof o.LatLng||"lat"in t?o.latLng(t):o.latLngBounds(t);var e,i,n=this._southWest,s=this._northEast;return t instanceof o.LatLngBounds?(e=t.getSouthWest(),i=t.getNorthEast()):e=i=t,e.lat>=n.lat&&i.lat<=s.lat&&e.lng>=n.lng&&i.lng<=s.lng},intersects:function(t){t=o.latLngBounds(t);var e=this._southWest,i=this._northEast,n=t.getSouthWest(),s=t.getNorthEast(),r=s.lat>=e.lat&&n.lat<=i.lat,a=s.lng>=e.lng&&n.lng<=i.lng;return r&&a},overlaps:function(t){t=o.latLngBounds(t);var e=this._southWest,i=this._northEast,n=t.getSouthWest(),s=t.getNorthEast(),r=s.lat>e.lat&&n.lat<i.lat,a=s.lng>e.lng&&n.lng<i.lng;return r&&a},toBBoxString:function(){return[this.getWest(),this.getSouth(),this.getEast(),this.getNorth()].join(",")},equals:function(t){return!!t&&(t=o.latLngBounds(t),this._southWest.equals(t.getSouthWest())&&this._northEast.equals(t.getNorthEast()))},isValid:function(){return!(!this._southWest||!this._northEast)}},o.latLngBounds=function(t,e){return t instanceof o.LatLngBounds?t:new o.LatLngBounds(t,e)},o.Projection={},o.Projection.LonLat={project:function(t){return new o.Point(t.lng,t.lat)},unproject:function(t){return new o.LatLng(t.y,t.x)},bounds:o.bounds([-180,-90],[180,90])},o.Projection.SphericalMercator={R:6378137,MAX_LATITUDE:85.0511287798,project:function(t){var e=Math.PI/180,i=this.MAX_LATITUDE,n=Math.max(Math.min(i,t.lat),-i),s=Math.sin(n*e);return new o.Point(this.R*t.lng*e,this.R*Math.log((1+s)/(1-s))/2)},unproject:function(t){var e=180/Math.PI;return new o.LatLng((2*Math.atan(Math.exp(t.y/this.R))-Math.PI/2)*e,t.x*e/this.R)},bounds:function(){var t=6378137*Math.PI;return o.bounds([-t,-t],[t,t])}()},o.CRS={latLngToPoint:function(t,e){var i=this.projection.project(t),n=this.scale(e);return this.transformation._transform(i,n)},pointToLatLng:function(t,e){var i=this.scale(e),n=this.transformation.untransform(t,i);return this.projection.unproject(n)},project:function(t){return this.projection.project(t)},unproject:function(t){return this.projection.unproject(t)},scale:function(t){return 256*Math.pow(2,t)},zoom:function(t){return Math.log(t/256)/Math.LN2},getProjectedBounds:function(t){if(this.infinite)return null;var e=this.projection.bounds,i=this.scale(t),n=this.transformation.transform(e.min,i),s=this.transformation.transform(e.max,i);return o.bounds(n,s)},infinite:!1,wrapLatLng:function(t){var e=this.wrapLng?o.Util.wrapNum(t.lng,this.wrapLng,!0):t.lng,i=this.wrapLat?o.Util.wrapNum(t.lat,this.wrapLat,!0):t.lat,n=t.alt;return o.latLng(i,e,n)},wrapLatLngBounds:function(t){var e=t.getCenter(),i=this.wrapLatLng(e),n=e.lat-i.lat,s=e.lng-i.lng;if(0===n&&0===s)return t;var r=t.getSouthWest(),a=t.getNorthEast(),h=o.latLng({lat:r.lat-n,lng:r.lng-s}),l=o.latLng({lat:a.lat-n,lng:a.lng-s});return new o.LatLngBounds(h,l)}},o.CRS.Simple=o.extend({},o.CRS,{projection:o.Projection.LonLat,transformation:new o.Transformation(1,0,-1,0),scale:function(t){return Math.pow(2,t)},zoom:function(t){return Math.log(t)/Math.LN2},distance:function(t,e){var i=e.lng-t.lng,n=e.lat-t.lat;return Math.sqrt(i*i+n*n)},infinite:!0}),o.CRS.Earth=o.extend({},o.CRS,{wrapLng:[-180,180],R:6371e3,distance:function(t,e){var i=Math.PI/180,n=t.lat*i,o=e.lat*i,s=Math.sin(n)*Math.sin(o)+Math.cos(n)*Math.cos(o)*Math.cos((e.lng-t.lng)*i);return this.R*Math.acos(Math.min(s,1))}}),o.CRS.EPSG3857=o.extend({},o.CRS.Earth,{code:"EPSG:3857",projection:o.Projection.SphericalMercator,transformation:function(){var t=.5/(Math.PI*o.Projection.SphericalMercator.R);return new o.Transformation(t,.5,-t,.5)}()}),o.CRS.EPSG900913=o.extend({},o.CRS.EPSG3857,{code:"EPSG:900913"}),o.CRS.EPSG4326=o.extend({},o.CRS.Earth,{code:"EPSG:4326",projection:o.Projection.LonLat,transformation:new o.Transformation(1/180,1,-1/180,.5)}),o.Map=o.Evented.extend({options:{crs:o.CRS.EPSG3857,center:i,zoom:i,minZoom:i,maxZoom:i,layers:[],maxBounds:i,renderer:i,zoomAnimation:!0,zoomAnimationThreshold:4,fadeAnimation:!0,markerZoomAnimation:!0,transform3DLimit:8388608,zoomSnap:1,zoomDelta:1,trackResize:!0},initialize:function(t,e){e=o.setOptions(this,e),this._initContainer(t),this._initLayout(),this._onResize=o.bind(this._onResize,this),this._initEvents(),e.maxBounds&&this.setMaxBounds(e.maxBounds),e.zoom!==i&&(this._zoom=this._limitZoom(e.zoom)),e.center&&e.zoom!==i&&this.setView(o.latLng(e.center),e.zoom,{reset:!0}),this._handlers=[],this._layers={},this._zoomBoundLayers={},this._sizeChanged=!0,this.callInitHooks(),this._zoomAnimated=o.DomUtil.TRANSITION&&o.Browser.any3d&&!o.Browser.mobileOpera&&this.options.zoomAnimation,this._zoomAnimated&&(this._createAnimProxy(),o.DomEvent.on(this._proxy,o.DomUtil.TRANSITION_END,this._catchTransitionEnd,this)),this._addLayers(this.options.layers)},setView:function(t,e,n){if(e=e===i?this._zoom:this._limitZoom(e),t=this._limitCenter(o.latLng(t),e,this.options.maxBounds),n=n||{},this._stop(),this._loaded&&!n.reset&&n!==!0){n.animate!==i&&(n.zoom=o.extend({animate:n.animate},n.zoom),n.pan=o.extend({animate:n.animate,duration:n.duration},n.pan));var s=this._zoom!==e?this._tryAnimatedZoom&&this._tryAnimatedZoom(t,e,n.zoom):this._tryAnimatedPan(t,n.pan);if(s)return clearTimeout(this._sizeTimer),this}return this._resetView(t,e),this},setZoom:function(t,e){return this._loaded?this.setView(this.getCenter(),t,{zoom:e}):(this._zoom=t,this)},zoomIn:function(t,e){return t=t||(o.Browser.any3d?this.options.zoomDelta:1),this.setZoom(this._zoom+t,e)},zoomOut:function(t,e){return t=t||(o.Browser.any3d?this.options.zoomDelta:1),this.setZoom(this._zoom-t,e)},setZoomAround:function(t,e,i){var n=this.getZoomScale(e),s=this.getSize().divideBy(2),r=t instanceof o.Point?t:this.latLngToContainerPoint(t),a=r.subtract(s).multiplyBy(1-1/n),h=this.containerPointToLatLng(s.add(a));return this.setView(h,e,{zoom:i})},_getBoundsCenterZoom:function(t,e){e=e||{},t=t.getBounds?t.getBounds():o.latLngBounds(t);var i=o.point(e.paddingTopLeft||e.padding||[0,0]),n=o.point(e.paddingBottomRight||e.padding||[0,0]),s=this.getBoundsZoom(t,!1,i.add(n));s="number"==typeof e.maxZoom?Math.min(e.maxZoom,s):s;var r=n.subtract(i).divideBy(2),a=this.project(t.getSouthWest(),s),h=this.project(t.getNorthEast(),s),l=this.unproject(a.add(h).divideBy(2).add(r),s);return{center:l,zoom:s}},fitBounds:function(t,e){if(t=o.latLngBounds(t),!t.isValid())throw new Error("Bounds are not valid.");var i=this._getBoundsCenterZoom(t,e);return this.setView(i.center,i.zoom,e)},fitWorld:function(t){return this.fitBounds([[-90,-180],[90,180]],t)},panTo:function(t,e){return this.setView(t,this._zoom,{pan:e})},panBy:function(t,e){if(t=o.point(t).round(),e=e||{},!t.x&&!t.y)return this.fire("moveend");if(e.animate!==!0&&!this.getSize().contains(t))return this._resetView(this.unproject(this.project(this.getCenter()).add(t)),this.getZoom()),this;if(this._panAnim||(this._panAnim=new o.PosAnimation,this._panAnim.on({step:this._onPanTransitionStep,end:this._onPanTransitionEnd},this)),e.noMoveStart||this.fire("movestart"),e.animate!==!1){o.DomUtil.addClass(this._mapPane,"leaflet-pan-anim");var i=this._getMapPanePos().subtract(t).round();this._panAnim.run(this._mapPane,i,e.duration||.25,e.easeLinearity)}else this._rawPanBy(t),this.fire("move").fire("moveend");return this},flyTo:function(t,e,n){function s(t){var e=t?-1:1,i=t?v:g,n=v*v-g*g+e*L*L*y*y,o=2*i*L*y,s=n/o,r=Math.sqrt(s*s+1)-s,a=r<1e-9?-18:Math.log(r);return a}function r(t){return(Math.exp(t)-Math.exp(-t))/2}function a(t){return(Math.exp(t)+Math.exp(-t))/2}function h(t){return r(t)/a(t)}function l(t){return g*(a(x)/a(x+P*t))}function u(t){return g*(a(x)*h(x+P*t)-r(x))/L}function c(t){return 1-Math.pow(1-t,1.5)}function d(){var i=(Date.now()-w)/T,n=c(i)*b;i<=1?(this._flyToFrame=o.Util.requestAnimFrame(d,this),this._move(this.unproject(_.add(m.subtract(_).multiplyBy(u(n)/y)),f),this.getScaleZoom(g/l(n),f),{flyTo:!0})):this._move(t,e)._moveEnd(!0)}if(n=n||{},n.animate===!1||!o.Browser.any3d)return this.setView(t,e,n);this._stop();var _=this.project(this.getCenter()),m=this.project(t),p=this.getSize(),f=this._zoom;t=o.latLng(t),e=e===i?f:e;var g=Math.max(p.x,p.y),v=g*this.getZoomScale(f,e),y=m.distanceTo(_)||1,P=1.42,L=P*P,x=s(0),w=Date.now(),b=(s(1)-x)/P,T=n.duration?1e3*n.duration:1e3*b*.8;return this._moveStart(!0),d.call(this),this},flyToBounds:function(t,e){var i=this._getBoundsCenterZoom(t,e);return this.flyTo(i.center,i.zoom,e)},setMaxBounds:function(t){return t=o.latLngBounds(t),t.isValid()?(this.options.maxBounds&&this.off("moveend",this._panInsideMaxBounds),this.options.maxBounds=t,this._loaded&&this._panInsideMaxBounds(),this.on("moveend",this._panInsideMaxBounds)):(this.options.maxBounds=null,this.off("moveend",this._panInsideMaxBounds))},setMinZoom:function(t){return this.options.minZoom=t,this._loaded&&this.getZoom()<this.options.minZoom?this.setZoom(t):this},setMaxZoom:function(t){return this.options.maxZoom=t,this._loaded&&this.getZoom()>this.options.maxZoom?this.setZoom(t):this},panInsideBounds:function(t,e){this._enforcingBounds=!0;var i=this.getCenter(),n=this._limitCenter(i,this._zoom,o.latLngBounds(t));return i.equals(n)||this.panTo(n,e),this._enforcingBounds=!1,this},invalidateSize:function(t){if(!this._loaded)return this;t=o.extend({animate:!1,pan:!0},t===!0?{animate:!0}:t);var e=this.getSize();this._sizeChanged=!0,this._lastCenter=null;var i=this.getSize(),n=e.divideBy(2).round(),s=i.divideBy(2).round(),r=n.subtract(s);return r.x||r.y?(t.animate&&t.pan?this.panBy(r):(t.pan&&this._rawPanBy(r),this.fire("move"),t.debounceMoveend?(clearTimeout(this._sizeTimer),this._sizeTimer=setTimeout(o.bind(this.fire,this,"moveend"),200)):this.fire("moveend")),this.fire("resize",{oldSize:e,newSize:i})):this},stop:function(){return this.setZoom(this._limitZoom(this._zoom)),this.options.zoomSnap||this.fire("viewreset"),this._stop()},locate:function(t){if(t=this._locateOptions=o.extend({timeout:1e4,watch:!1},t),!("geolocation"in navigator))return this._handleGeolocationError({code:0,message:"Geolocation not supported."}),this;var e=o.bind(this._handleGeolocationResponse,this),i=o.bind(this._handleGeolocationError,this);return t.watch?this._locationWatchId=navigator.geolocation.watchPosition(e,i,t):navigator.geolocation.getCurrentPosition(e,i,t),this},stopLocate:function(){return navigator.geolocation&&navigator.geolocation.clearWatch&&navigator.geolocation.clearWatch(this._locationWatchId),this._locateOptions&&(this._locateOptions.setView=!1),this},_handleGeolocationError:function(t){var e=t.code,i=t.message||(1===e?"permission denied":2===e?"position unavailable":"timeout");this._locateOptions.setView&&!this._loaded&&this.fitWorld(),this.fire("locationerror",{code:e,message:"Geolocation error: "+i+"."})},_handleGeolocationResponse:function(t){var e=t.coords.latitude,i=t.coords.longitude,n=new o.LatLng(e,i),s=n.toBounds(t.coords.accuracy),r=this._locateOptions;if(r.setView){var a=this.getBoundsZoom(s);this.setView(n,r.maxZoom?Math.min(a,r.maxZoom):a)}var h={latlng:n,bounds:s,timestamp:t.timestamp};for(var l in t.coords)"number"==typeof t.coords[l]&&(h[l]=t.coords[l]);this.fire("locationfound",h)},addHandler:function(t,e){if(!e)return this;var i=this[t]=new e(this);return this._handlers.push(i),this.options[t]&&i.enable(),this},remove:function(){if(this._initEvents(!0),this._containerId!==this._container._leaflet_id)throw new Error("Map container is being reused by another instance");try{delete this._container._leaflet_id,delete this._containerId}catch(t){this._container._leaflet_id=i,this._containerId=i}o.DomUtil.remove(this._mapPane),this._clearControlPos&&this._clearControlPos(),this._clearHandlers(),this._loaded&&this.fire("unload");for(var t in this._layers)this._layers[t].remove();return this},createPane:function(t,e){var i="leaflet-pane"+(t?" leaflet-"+t.replace("Pane","")+"-pane":""),n=o.DomUtil.create("div",i,e||this._mapPane);return t&&(this._panes[t]=n),n},getCenter:function(){return this._checkIfLoaded(),this._lastCenter&&!this._moved()?this._lastCenter:this.layerPointToLatLng(this._getCenterLayerPoint())},getZoom:function(){return this._zoom},getBounds:function(){var t=this.getPixelBounds(),e=this.unproject(t.getBottomLeft()),i=this.unproject(t.getTopRight());return new o.LatLngBounds(e,i)},getMinZoom:function(){return this.options.minZoom===i?this._layersMinZoom||0:this.options.minZoom},getMaxZoom:function(){return this.options.maxZoom===i?this._layersMaxZoom===i?1/0:this._layersMaxZoom:this.options.maxZoom},getBoundsZoom:function(t,e,i){t=o.latLngBounds(t),i=o.point(i||[0,0]);var n=this.getZoom()||0,s=this.getMinZoom(),r=this.getMaxZoom(),a=t.getNorthWest(),h=t.getSouthEast(),l=this.getSize().subtract(i),u=o.bounds(this.project(h,n),this.project(a,n)).getSize(),c=o.Browser.any3d?this.options.zoomSnap:1,d=Math.min(l.x/u.x,l.y/u.y);return n=this.getScaleZoom(d,n),c&&(n=Math.round(n/(c/100))*(c/100),n=e?Math.ceil(n/c)*c:Math.floor(n/c)*c),Math.max(s,Math.min(r,n))},getSize:function(){return this._size&&!this._sizeChanged||(this._size=new o.Point(this._container.clientWidth||0,this._container.clientHeight||0),this._sizeChanged=!1),this._size.clone()},getPixelBounds:function(t,e){var i=this._getTopLeftPoint(t,e);return new o.Bounds(i,i.add(this.getSize()))},getPixelOrigin:function(){return this._checkIfLoaded(),this._pixelOrigin},getPixelWorldBounds:function(t){return this.options.crs.getProjectedBounds(t===i?this.getZoom():t)},getPane:function(t){return"string"==typeof t?this._panes[t]:t},getPanes:function(){return this._panes},getContainer:function(){return this._container},getZoomScale:function(t,e){var n=this.options.crs;return e=e===i?this._zoom:e,n.scale(t)/n.scale(e)},getScaleZoom:function(t,e){var n=this.options.crs;e=e===i?this._zoom:e;var o=n.zoom(t*n.scale(e));return isNaN(o)?1/0:o},project:function(t,e){return e=e===i?this._zoom:e,this.options.crs.latLngToPoint(o.latLng(t),e)},unproject:function(t,e){return e=e===i?this._zoom:e,this.options.crs.pointToLatLng(o.point(t),e)},layerPointToLatLng:function(t){var e=o.point(t).add(this.getPixelOrigin());return this.unproject(e)},latLngToLayerPoint:function(t){var e=this.project(o.latLng(t))._round();return e._subtract(this.getPixelOrigin())},wrapLatLng:function(t){return this.options.crs.wrapLatLng(o.latLng(t))},wrapLatLngBounds:function(t){return this.options.crs.wrapLatLngBounds(o.latLngBounds(t))},distance:function(t,e){return this.options.crs.distance(o.latLng(t),o.latLng(e))},containerPointToLayerPoint:function(t){return o.point(t).subtract(this._getMapPanePos())},layerPointToContainerPoint:function(t){return o.point(t).add(this._getMapPanePos())},containerPointToLatLng:function(t){var e=this.containerPointToLayerPoint(o.point(t));return this.layerPointToLatLng(e)},latLngToContainerPoint:function(t){return this.layerPointToContainerPoint(this.latLngToLayerPoint(o.latLng(t)))},mouseEventToContainerPoint:function(t){return o.DomEvent.getMousePosition(t,this._container)},mouseEventToLayerPoint:function(t){return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(t))},mouseEventToLatLng:function(t){return this.layerPointToLatLng(this.mouseEventToLayerPoint(t))},_initContainer:function(t){var e=this._container=o.DomUtil.get(t);if(!e)throw new Error("Map container not found.");if(e._leaflet_id)throw new Error("Map container is already initialized.");o.DomEvent.addListener(e,"scroll",this._onScroll,this),this._containerId=o.Util.stamp(e)},_initLayout:function(){var t=this._container;this._fadeAnimated=this.options.fadeAnimation&&o.Browser.any3d,o.DomUtil.addClass(t,"leaflet-container"+(o.Browser.touch?" leaflet-touch":"")+(o.Browser.retina?" leaflet-retina":"")+(o.Browser.ielt9?" leaflet-oldie":"")+(o.Browser.safari?" leaflet-safari":"")+(this._fadeAnimated?" leaflet-fade-anim":""));
	var e=o.DomUtil.getStyle(t,"position");"absolute"!==e&&"relative"!==e&&"fixed"!==e&&(t.style.position="relative"),this._initPanes(),this._initControlPos&&this._initControlPos()},_initPanes:function(){var t=this._panes={};this._paneRenderers={},this._mapPane=this.createPane("mapPane",this._container),o.DomUtil.setPosition(this._mapPane,new o.Point(0,0)),this.createPane("tilePane"),this.createPane("shadowPane"),this.createPane("overlayPane"),this.createPane("markerPane"),this.createPane("tooltipPane"),this.createPane("popupPane"),this.options.markerZoomAnimation||(o.DomUtil.addClass(t.markerPane,"leaflet-zoom-hide"),o.DomUtil.addClass(t.shadowPane,"leaflet-zoom-hide"))},_resetView:function(t,e){o.DomUtil.setPosition(this._mapPane,new o.Point(0,0));var i=!this._loaded;this._loaded=!0,e=this._limitZoom(e),this.fire("viewprereset");var n=this._zoom!==e;this._moveStart(n)._move(t,e)._moveEnd(n),this.fire("viewreset"),i&&this.fire("load")},_moveStart:function(t){return t&&this.fire("zoomstart"),this.fire("movestart")},_move:function(t,e,n){e===i&&(e=this._zoom);var o=this._zoom!==e;return this._zoom=e,this._lastCenter=t,this._pixelOrigin=this._getNewPixelOrigin(t),(o||n&&n.pinch)&&this.fire("zoom",n),this.fire("move",n)},_moveEnd:function(t){return t&&this.fire("zoomend"),this.fire("moveend")},_stop:function(){return o.Util.cancelAnimFrame(this._flyToFrame),this._panAnim&&this._panAnim.stop(),this},_rawPanBy:function(t){o.DomUtil.setPosition(this._mapPane,this._getMapPanePos().subtract(t))},_getZoomSpan:function(){return this.getMaxZoom()-this.getMinZoom()},_panInsideMaxBounds:function(){this._enforcingBounds||this.panInsideBounds(this.options.maxBounds)},_checkIfLoaded:function(){if(!this._loaded)throw new Error("Set map center and zoom first.")},_initEvents:function(e){if(o.DomEvent){this._targets={},this._targets[o.stamp(this._container)]=this;var i=e?"off":"on";o.DomEvent[i](this._container,"click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress",this._handleDOMEvent,this),this.options.trackResize&&o.DomEvent[i](t,"resize",this._onResize,this),o.Browser.any3d&&this.options.transform3DLimit&&this[i]("moveend",this._onMoveEnd)}},_onResize:function(){o.Util.cancelAnimFrame(this._resizeRequest),this._resizeRequest=o.Util.requestAnimFrame(function(){this.invalidateSize({debounceMoveend:!0})},this)},_onScroll:function(){this._container.scrollTop=0,this._container.scrollLeft=0},_onMoveEnd:function(){var t=this._getMapPanePos();Math.max(Math.abs(t.x),Math.abs(t.y))>=this.options.transform3DLimit&&this._resetView(this.getCenter(),this.getZoom())},_findEventTargets:function(t,e){for(var i,n=[],s="mouseout"===e||"mouseover"===e,r=t.target||t.srcElement,a=!1;r;){if(i=this._targets[o.stamp(r)],i&&("click"===e||"preclick"===e)&&!t._simulated&&this._draggableMoved(i)){a=!0;break}if(i&&i.listens(e,!0)){if(s&&!o.DomEvent._isExternalTarget(r,t))break;if(n.push(i),s)break}if(r===this._container)break;r=r.parentNode}return n.length||a||s||!o.DomEvent._isExternalTarget(r,t)||(n=[this]),n},_handleDOMEvent:function(t){if(this._loaded&&!o.DomEvent._skipped(t)){var e="keypress"===t.type&&13===t.keyCode?"click":t.type;"mousedown"===e&&o.DomUtil.preventOutline(t.target||t.srcElement),this._fireDOMEvent(t,e)}},_fireDOMEvent:function(t,e,i){if("click"===t.type){var n=o.Util.extend({},t);n.type="preclick",this._fireDOMEvent(n,n.type,i)}if(!t._stopped&&(i=(i||[]).concat(this._findEventTargets(t,e)),i.length)){var s=i[0];"contextmenu"===e&&s.listens(e,!0)&&o.DomEvent.preventDefault(t);var r={originalEvent:t};if("keypress"!==t.type){var a=s instanceof o.Marker;r.containerPoint=a?this.latLngToContainerPoint(s.getLatLng()):this.mouseEventToContainerPoint(t),r.layerPoint=this.containerPointToLayerPoint(r.containerPoint),r.latlng=a?s.getLatLng():this.layerPointToLatLng(r.layerPoint)}for(var h=0;h<i.length;h++)if(i[h].fire(e,r,!0),r.originalEvent._stopped||i[h].options.nonBubblingEvents&&o.Util.indexOf(i[h].options.nonBubblingEvents,e)!==-1)return}},_draggableMoved:function(t){return t=t.dragging&&t.dragging.enabled()?t:this,t.dragging&&t.dragging.moved()||this.boxZoom&&this.boxZoom.moved()},_clearHandlers:function(){for(var t=0,e=this._handlers.length;t<e;t++)this._handlers[t].disable()},whenReady:function(t,e){return this._loaded?t.call(e||this,{target:this}):this.on("load",t,e),this},_getMapPanePos:function(){return o.DomUtil.getPosition(this._mapPane)||new o.Point(0,0)},_moved:function(){var t=this._getMapPanePos();return t&&!t.equals([0,0])},_getTopLeftPoint:function(t,e){var n=t&&e!==i?this._getNewPixelOrigin(t,e):this.getPixelOrigin();return n.subtract(this._getMapPanePos())},_getNewPixelOrigin:function(t,e){var i=this.getSize()._divideBy(2);return this.project(t,e)._subtract(i)._add(this._getMapPanePos())._round()},_latLngToNewLayerPoint:function(t,e,i){var n=this._getNewPixelOrigin(i,e);return this.project(t,e)._subtract(n)},_latLngBoundsToNewLayerBounds:function(t,e,i){var n=this._getNewPixelOrigin(i,e);return o.bounds([this.project(t.getSouthWest(),e)._subtract(n),this.project(t.getNorthWest(),e)._subtract(n),this.project(t.getSouthEast(),e)._subtract(n),this.project(t.getNorthEast(),e)._subtract(n)])},_getCenterLayerPoint:function(){return this.containerPointToLayerPoint(this.getSize()._divideBy(2))},_getCenterOffset:function(t){return this.latLngToLayerPoint(t).subtract(this._getCenterLayerPoint())},_limitCenter:function(t,e,i){if(!i)return t;var n=this.project(t,e),s=this.getSize().divideBy(2),r=new o.Bounds(n.subtract(s),n.add(s)),a=this._getBoundsOffset(r,i,e);return a.round().equals([0,0])?t:this.unproject(n.add(a),e)},_limitOffset:function(t,e){if(!e)return t;var i=this.getPixelBounds(),n=new o.Bounds(i.min.add(t),i.max.add(t));return t.add(this._getBoundsOffset(n,e))},_getBoundsOffset:function(t,e,i){var n=o.bounds(this.project(e.getNorthEast(),i),this.project(e.getSouthWest(),i)),s=n.min.subtract(t.min),r=n.max.subtract(t.max),a=this._rebound(s.x,-r.x),h=this._rebound(s.y,-r.y);return new o.Point(a,h)},_rebound:function(t,e){return t+e>0?Math.round(t-e)/2:Math.max(0,Math.ceil(t))-Math.max(0,Math.floor(e))},_limitZoom:function(t){var e=this.getMinZoom(),i=this.getMaxZoom(),n=o.Browser.any3d?this.options.zoomSnap:1;return n&&(t=Math.round(t/n)*n),Math.max(e,Math.min(i,t))},_onPanTransitionStep:function(){this.fire("move")},_onPanTransitionEnd:function(){o.DomUtil.removeClass(this._mapPane,"leaflet-pan-anim"),this.fire("moveend")},_tryAnimatedPan:function(t,e){var i=this._getCenterOffset(t)._floor();return!((e&&e.animate)!==!0&&!this.getSize().contains(i))&&(this.panBy(i,e),!0)},_createAnimProxy:function(){var t=this._proxy=o.DomUtil.create("div","leaflet-proxy leaflet-zoom-animated");this._panes.mapPane.appendChild(t),this.on("zoomanim",function(e){var i=o.DomUtil.TRANSFORM,n=t.style[i];o.DomUtil.setTransform(t,this.project(e.center,e.zoom),this.getZoomScale(e.zoom,1)),n===t.style[i]&&this._animatingZoom&&this._onZoomTransitionEnd()},this),this.on("load moveend",function(){var e=this.getCenter(),i=this.getZoom();o.DomUtil.setTransform(t,this.project(e,i),this.getZoomScale(i,1))},this)},_catchTransitionEnd:function(t){this._animatingZoom&&t.propertyName.indexOf("transform")>=0&&this._onZoomTransitionEnd()},_nothingToAnimate:function(){return!this._container.getElementsByClassName("leaflet-zoom-animated").length},_tryAnimatedZoom:function(t,e,i){if(this._animatingZoom)return!0;if(i=i||{},!this._zoomAnimated||i.animate===!1||this._nothingToAnimate()||Math.abs(e-this._zoom)>this.options.zoomAnimationThreshold)return!1;var n=this.getZoomScale(e),s=this._getCenterOffset(t)._divideBy(1-1/n);return!(i.animate!==!0&&!this.getSize().contains(s))&&(o.Util.requestAnimFrame(function(){this._moveStart(!0)._animateZoom(t,e,!0)},this),!0)},_animateZoom:function(t,e,i,n){i&&(this._animatingZoom=!0,this._animateToCenter=t,this._animateToZoom=e,o.DomUtil.addClass(this._mapPane,"leaflet-zoom-anim")),this.fire("zoomanim",{center:t,zoom:e,noUpdate:n}),setTimeout(o.bind(this._onZoomTransitionEnd,this),250)},_onZoomTransitionEnd:function(){this._animatingZoom&&(o.DomUtil.removeClass(this._mapPane,"leaflet-zoom-anim"),this._animatingZoom=!1,this._move(this._animateToCenter,this._animateToZoom),o.Util.requestAnimFrame(function(){this._moveEnd(!0)},this))}}),o.map=function(t,e){return new o.Map(t,e)},o.Layer=o.Evented.extend({options:{pane:"overlayPane",nonBubblingEvents:[],attribution:null},addTo:function(t){return t.addLayer(this),this},remove:function(){return this.removeFrom(this._map||this._mapToAdd)},removeFrom:function(t){return t&&t.removeLayer(this),this},getPane:function(t){return this._map.getPane(t?this.options[t]||t:this.options.pane)},addInteractiveTarget:function(t){return this._map._targets[o.stamp(t)]=this,this},removeInteractiveTarget:function(t){return delete this._map._targets[o.stamp(t)],this},getAttribution:function(){return this.options.attribution},_layerAdd:function(t){var e=t.target;if(e.hasLayer(this)){if(this._map=e,this._zoomAnimated=e._zoomAnimated,this.getEvents){var i=this.getEvents();e.on(i,this),this.once("remove",function(){e.off(i,this)},this)}this.onAdd(e),this.getAttribution&&e.attributionControl&&e.attributionControl.addAttribution(this.getAttribution()),this.fire("add"),e.fire("layeradd",{layer:this})}}}),o.Map.include({addLayer:function(t){var e=o.stamp(t);return this._layers[e]?this:(this._layers[e]=t,t._mapToAdd=this,t.beforeAdd&&t.beforeAdd(this),this.whenReady(t._layerAdd,t),this)},removeLayer:function(t){var e=o.stamp(t);return this._layers[e]?(this._loaded&&t.onRemove(this),t.getAttribution&&this.attributionControl&&this.attributionControl.removeAttribution(t.getAttribution()),delete this._layers[e],this._loaded&&(this.fire("layerremove",{layer:t}),t.fire("remove")),t._map=t._mapToAdd=null,this):this},hasLayer:function(t){return!!t&&o.stamp(t)in this._layers},eachLayer:function(t,e){for(var i in this._layers)t.call(e,this._layers[i]);return this},_addLayers:function(t){t=t?o.Util.isArray(t)?t:[t]:[];for(var e=0,i=t.length;e<i;e++)this.addLayer(t[e])},_addZoomLimit:function(t){!isNaN(t.options.maxZoom)&&isNaN(t.options.minZoom)||(this._zoomBoundLayers[o.stamp(t)]=t,this._updateZoomLevels())},_removeZoomLimit:function(t){var e=o.stamp(t);this._zoomBoundLayers[e]&&(delete this._zoomBoundLayers[e],this._updateZoomLevels())},_updateZoomLevels:function(){var t=1/0,e=-(1/0),n=this._getZoomSpan();for(var o in this._zoomBoundLayers){var s=this._zoomBoundLayers[o].options;t=s.minZoom===i?t:Math.min(t,s.minZoom),e=s.maxZoom===i?e:Math.max(e,s.maxZoom)}this._layersMaxZoom=e===-(1/0)?i:e,this._layersMinZoom=t===1/0?i:t,n!==this._getZoomSpan()&&this.fire("zoomlevelschange"),this.options.maxZoom===i&&this._layersMaxZoom&&this.getZoom()>this._layersMaxZoom&&this.setZoom(this._layersMaxZoom),this.options.minZoom===i&&this._layersMinZoom&&this.getZoom()<this._layersMinZoom&&this.setZoom(this._layersMinZoom)}});var r="_leaflet_events";o.DomEvent={on:function(t,e,i,n){if("object"==typeof e)for(var s in e)this._on(t,s,e[s],i);else{e=o.Util.splitWords(e);for(var r=0,a=e.length;r<a;r++)this._on(t,e[r],i,n)}return this},off:function(t,e,i,n){if("object"==typeof e)for(var s in e)this._off(t,s,e[s],i);else{e=o.Util.splitWords(e);for(var r=0,a=e.length;r<a;r++)this._off(t,e[r],i,n)}return this},_on:function(e,i,n,s){var a=i+o.stamp(n)+(s?"_"+o.stamp(s):"");if(e[r]&&e[r][a])return this;var h=function(i){return n.call(s||e,i||t.event)},l=h;return o.Browser.pointer&&0===i.indexOf("touch")?this.addPointerListener(e,i,h,a):!o.Browser.touch||"dblclick"!==i||!this.addDoubleTapListener||o.Browser.pointer&&o.Browser.chrome?"addEventListener"in e?"mousewheel"===i?e.addEventListener("onwheel"in e?"wheel":"mousewheel",h,!1):"mouseenter"===i||"mouseleave"===i?(h=function(i){i=i||t.event,o.DomEvent._isExternalTarget(e,i)&&l(i)},e.addEventListener("mouseenter"===i?"mouseover":"mouseout",h,!1)):("click"===i&&o.Browser.android&&(h=function(t){return o.DomEvent._filterClick(t,l)}),e.addEventListener(i,h,!1)):"attachEvent"in e&&e.attachEvent("on"+i,h):this.addDoubleTapListener(e,h,a),e[r]=e[r]||{},e[r][a]=h,this},_off:function(t,e,i,n){var s=e+o.stamp(i)+(n?"_"+o.stamp(n):""),a=t[r]&&t[r][s];return a?(o.Browser.pointer&&0===e.indexOf("touch")?this.removePointerListener(t,e,s):o.Browser.touch&&"dblclick"===e&&this.removeDoubleTapListener?this.removeDoubleTapListener(t,s):"removeEventListener"in t?"mousewheel"===e?t.removeEventListener("onwheel"in t?"wheel":"mousewheel",a,!1):t.removeEventListener("mouseenter"===e?"mouseover":"mouseleave"===e?"mouseout":e,a,!1):"detachEvent"in t&&t.detachEvent("on"+e,a),t[r][s]=null,this):this},stopPropagation:function(t){return t.stopPropagation?t.stopPropagation():t.originalEvent?t.originalEvent._stopped=!0:t.cancelBubble=!0,o.DomEvent._skipped(t),this},disableScrollPropagation:function(t){return o.DomEvent.on(t,"mousewheel",o.DomEvent.stopPropagation)},disableClickPropagation:function(t){var e=o.DomEvent.stopPropagation;return o.DomEvent.on(t,o.Draggable.START.join(" "),e),o.DomEvent.on(t,{click:o.DomEvent._fakeStop,dblclick:e})},preventDefault:function(t){return t.preventDefault?t.preventDefault():t.returnValue=!1,this},stop:function(t){return o.DomEvent.preventDefault(t).stopPropagation(t)},getMousePosition:function(t,e){if(!e)return new o.Point(t.clientX,t.clientY);var i=e.getBoundingClientRect();return new o.Point(t.clientX-i.left-e.clientLeft,t.clientY-i.top-e.clientTop)},_wheelPxFactor:o.Browser.win&&o.Browser.chrome?2:o.Browser.gecko?t.devicePixelRatio:1,getWheelDelta:function(t){return o.Browser.edge?t.wheelDeltaY/2:t.deltaY&&0===t.deltaMode?-t.deltaY/o.DomEvent._wheelPxFactor:t.deltaY&&1===t.deltaMode?20*-t.deltaY:t.deltaY&&2===t.deltaMode?60*-t.deltaY:t.deltaX||t.deltaZ?0:t.wheelDelta?(t.wheelDeltaY||t.wheelDelta)/2:t.detail&&Math.abs(t.detail)<32765?20*-t.detail:t.detail?t.detail/-32765*60:0},_skipEvents:{},_fakeStop:function(t){o.DomEvent._skipEvents[t.type]=!0},_skipped:function(t){var e=this._skipEvents[t.type];return this._skipEvents[t.type]=!1,e},_isExternalTarget:function(t,e){var i=e.relatedTarget;if(!i)return!0;try{for(;i&&i!==t;)i=i.parentNode}catch(t){return!1}return i!==t},_filterClick:function(t,e){var i=t.timeStamp||t.originalEvent&&t.originalEvent.timeStamp,n=o.DomEvent._lastClick&&i-o.DomEvent._lastClick;return n&&n>100&&n<500||t.target._simulatedClick&&!t._simulated?void o.DomEvent.stop(t):(o.DomEvent._lastClick=i,void e(t))}},o.DomEvent.addListener=o.DomEvent.on,o.DomEvent.removeListener=o.DomEvent.off,o.PosAnimation=o.Evented.extend({run:function(t,e,i,n){this.stop(),this._el=t,this._inProgress=!0,this._duration=i||.25,this._easeOutPower=1/Math.max(n||.5,.2),this._startPos=o.DomUtil.getPosition(t),this._offset=e.subtract(this._startPos),this._startTime=+new Date,this.fire("start"),this._animate()},stop:function(){this._inProgress&&(this._step(!0),this._complete())},_animate:function(){this._animId=o.Util.requestAnimFrame(this._animate,this),this._step()},_step:function(t){var e=+new Date-this._startTime,i=1e3*this._duration;e<i?this._runFrame(this._easeOut(e/i),t):(this._runFrame(1),this._complete())},_runFrame:function(t,e){var i=this._startPos.add(this._offset.multiplyBy(t));e&&i._round(),o.DomUtil.setPosition(this._el,i),this.fire("step")},_complete:function(){o.Util.cancelAnimFrame(this._animId),this._inProgress=!1,this.fire("end")},_easeOut:function(t){return 1-Math.pow(1-t,this._easeOutPower)}}),o.Projection.Mercator={R:6378137,R_MINOR:6356752.314245179,bounds:o.bounds([-20037508.34279,-15496570.73972],[20037508.34279,18764656.23138]),project:function(t){var e=Math.PI/180,i=this.R,n=t.lat*e,s=this.R_MINOR/i,r=Math.sqrt(1-s*s),a=r*Math.sin(n),h=Math.tan(Math.PI/4-n/2)/Math.pow((1-a)/(1+a),r/2);return n=-i*Math.log(Math.max(h,1e-10)),new o.Point(t.lng*e*i,n)},unproject:function(t){for(var e,i=180/Math.PI,n=this.R,s=this.R_MINOR/n,r=Math.sqrt(1-s*s),a=Math.exp(-t.y/n),h=Math.PI/2-2*Math.atan(a),l=0,u=.1;l<15&&Math.abs(u)>1e-7;l++)e=r*Math.sin(h),e=Math.pow((1-e)/(1+e),r/2),u=Math.PI/2-2*Math.atan(a*e)-h,h+=u;return new o.LatLng(h*i,t.x*i/n)}},o.CRS.EPSG3395=o.extend({},o.CRS.Earth,{code:"EPSG:3395",projection:o.Projection.Mercator,transformation:function(){var t=.5/(Math.PI*o.Projection.Mercator.R);return new o.Transformation(t,.5,-t,.5)}()}),o.GridLayer=o.Layer.extend({options:{tileSize:256,opacity:1,updateWhenIdle:o.Browser.mobile,updateWhenZooming:!0,updateInterval:200,zIndex:1,bounds:null,minZoom:0,maxZoom:i,noWrap:!1,pane:"tilePane",className:"",keepBuffer:2},initialize:function(t){o.setOptions(this,t)},onAdd:function(){this._initContainer(),this._levels={},this._tiles={},this._resetView(),this._update()},beforeAdd:function(t){t._addZoomLimit(this)},onRemove:function(t){this._removeAllTiles(),o.DomUtil.remove(this._container),t._removeZoomLimit(this),this._container=null,this._tileZoom=null},bringToFront:function(){return this._map&&(o.DomUtil.toFront(this._container),this._setAutoZIndex(Math.max)),this},bringToBack:function(){return this._map&&(o.DomUtil.toBack(this._container),this._setAutoZIndex(Math.min)),this},getContainer:function(){return this._container},setOpacity:function(t){return this.options.opacity=t,this._updateOpacity(),this},setZIndex:function(t){return this.options.zIndex=t,this._updateZIndex(),this},isLoading:function(){return this._loading},redraw:function(){return this._map&&(this._removeAllTiles(),this._update()),this},getEvents:function(){var t={viewprereset:this._invalidateAll,viewreset:this._resetView,zoom:this._resetView,moveend:this._onMoveEnd};return this.options.updateWhenIdle||(this._onMove||(this._onMove=o.Util.throttle(this._onMoveEnd,this.options.updateInterval,this)),t.move=this._onMove),this._zoomAnimated&&(t.zoomanim=this._animateZoom),t},createTile:function(){return e.createElement("div")},getTileSize:function(){var t=this.options.tileSize;return t instanceof o.Point?t:new o.Point(t,t)},_updateZIndex:function(){this._container&&this.options.zIndex!==i&&null!==this.options.zIndex&&(this._container.style.zIndex=this.options.zIndex)},_setAutoZIndex:function(t){for(var e,i=this.getPane().children,n=-t(-(1/0),1/0),o=0,s=i.length;o<s;o++)e=i[o].style.zIndex,i[o]!==this._container&&e&&(n=t(n,+e));isFinite(n)&&(this.options.zIndex=n+t(-1,1),this._updateZIndex())},_updateOpacity:function(){if(this._map&&!o.Browser.ielt9){o.DomUtil.setOpacity(this._container,this.options.opacity);var t=+new Date,e=!1,i=!1;for(var n in this._tiles){var s=this._tiles[n];if(s.current&&s.loaded){var r=Math.min(1,(t-s.loaded)/200);o.DomUtil.setOpacity(s.el,r),r<1?e=!0:(s.active&&(i=!0),s.active=!0)}}i&&!this._noPrune&&this._pruneTiles(),e&&(o.Util.cancelAnimFrame(this._fadeFrame),this._fadeFrame=o.Util.requestAnimFrame(this._updateOpacity,this))}},_initContainer:function(){this._container||(this._container=o.DomUtil.create("div","leaflet-layer "+(this.options.className||"")),this._updateZIndex(),this.options.opacity<1&&this._updateOpacity(),this.getPane().appendChild(this._container))},_updateLevels:function(){var t=this._tileZoom,e=this.options.maxZoom;if(t===i)return i;for(var n in this._levels)this._levels[n].el.children.length||n===t?this._levels[n].el.style.zIndex=e-Math.abs(t-n):(o.DomUtil.remove(this._levels[n].el),this._removeTilesAtZoom(n),delete this._levels[n]);var s=this._levels[t],r=this._map;return s||(s=this._levels[t]={},s.el=o.DomUtil.create("div","leaflet-tile-container leaflet-zoom-animated",this._container),s.el.style.zIndex=e,s.origin=r.project(r.unproject(r.getPixelOrigin()),t).round(),s.zoom=t,this._setZoomTransform(s,r.getCenter(),r.getZoom()),o.Util.falseFn(s.el.offsetWidth)),this._level=s,s},_pruneTiles:function(){if(this._map){var t,e,i=this._map.getZoom();if(i>this.options.maxZoom||i<this.options.minZoom)return void this._removeAllTiles();for(t in this._tiles)e=this._tiles[t],e.retain=e.current;for(t in this._tiles)if(e=this._tiles[t],e.current&&!e.active){var n=e.coords;this._retainParent(n.x,n.y,n.z,n.z-5)||this._retainChildren(n.x,n.y,n.z,n.z+2)}for(t in this._tiles)this._tiles[t].retain||this._removeTile(t)}},_removeTilesAtZoom:function(t){for(var e in this._tiles)this._tiles[e].coords.z===t&&this._removeTile(e)},_removeAllTiles:function(){for(var t in this._tiles)this._removeTile(t)},_invalidateAll:function(){for(var t in this._levels)o.DomUtil.remove(this._levels[t].el),delete this._levels[t];this._removeAllTiles(),this._tileZoom=null},_retainParent:function(t,e,i,n){var s=Math.floor(t/2),r=Math.floor(e/2),a=i-1,h=new o.Point(+s,+r);h.z=+a;var l=this._tileCoordsToKey(h),u=this._tiles[l];return u&&u.active?(u.retain=!0,!0):(u&&u.loaded&&(u.retain=!0),a>n&&this._retainParent(s,r,a,n))},_retainChildren:function(t,e,i,n){for(var s=2*t;s<2*t+2;s++)for(var r=2*e;r<2*e+2;r++){var a=new o.Point(s,r);a.z=i+1;var h=this._tileCoordsToKey(a),l=this._tiles[h];l&&l.active?l.retain=!0:(l&&l.loaded&&(l.retain=!0),i+1<n&&this._retainChildren(s,r,i+1,n))}},_resetView:function(t){var e=t&&(t.pinch||t.flyTo);this._setView(this._map.getCenter(),this._map.getZoom(),e,e)},_animateZoom:function(t){this._setView(t.center,t.zoom,!0,t.noUpdate)},_setView:function(t,e,n,o){var s=Math.round(e);(this.options.maxZoom!==i&&s>this.options.maxZoom||this.options.minZoom!==i&&s<this.options.minZoom)&&(s=i);var r=this.options.updateWhenZooming&&s!==this._tileZoom;o&&!r||(this._tileZoom=s,this._abortLoading&&this._abortLoading(),this._updateLevels(),this._resetGrid(),s!==i&&this._update(t),n||this._pruneTiles(),this._noPrune=!!n),this._setZoomTransforms(t,e)},_setZoomTransforms:function(t,e){for(var i in this._levels)this._setZoomTransform(this._levels[i],t,e)},_setZoomTransform:function(t,e,i){var n=this._map.getZoomScale(i,t.zoom),s=t.origin.multiplyBy(n).subtract(this._map._getNewPixelOrigin(e,i)).round();o.Browser.any3d?o.DomUtil.setTransform(t.el,s,n):o.DomUtil.setPosition(t.el,s)},_resetGrid:function(){var t=this._map,e=t.options.crs,i=this._tileSize=this.getTileSize(),n=this._tileZoom,o=this._map.getPixelWorldBounds(this._tileZoom);o&&(this._globalTileRange=this._pxBoundsToTileRange(o)),this._wrapX=e.wrapLng&&!this.options.noWrap&&[Math.floor(t.project([0,e.wrapLng[0]],n).x/i.x),Math.ceil(t.project([0,e.wrapLng[1]],n).x/i.y)],this._wrapY=e.wrapLat&&!this.options.noWrap&&[Math.floor(t.project([e.wrapLat[0],0],n).y/i.x),Math.ceil(t.project([e.wrapLat[1],0],n).y/i.y)]},_onMoveEnd:function(){this._map&&!this._map._animatingZoom&&this._update()},_getTiledPixelBounds:function(t){var e=this._map,i=e._animatingZoom?Math.max(e._animateToZoom,e.getZoom()):e.getZoom(),n=e.getZoomScale(i,this._tileZoom),s=e.project(t,this._tileZoom).floor(),r=e.getSize().divideBy(2*n);return new o.Bounds(s.subtract(r),s.add(r))},_update:function(t){var n=this._map;if(n){var s=n.getZoom();if(t===i&&(t=n.getCenter()),this._tileZoom!==i){var r=this._getTiledPixelBounds(t),a=this._pxBoundsToTileRange(r),h=a.getCenter(),l=[],u=this.options.keepBuffer,c=new o.Bounds(a.getBottomLeft().subtract([u,-u]),a.getTopRight().add([u,-u]));for(var d in this._tiles){var _=this._tiles[d].coords;_.z===this._tileZoom&&c.contains(o.point(_.x,_.y))||(this._tiles[d].current=!1)}if(Math.abs(s-this._tileZoom)>1)return void this._setView(t,s);for(var m=a.min.y;m<=a.max.y;m++)for(var p=a.min.x;p<=a.max.x;p++){var f=new o.Point(p,m);if(f.z=this._tileZoom,this._isValidTile(f)){var g=this._tiles[this._tileCoordsToKey(f)];g?g.current=!0:l.push(f)}}if(l.sort(function(t,e){return t.distanceTo(h)-e.distanceTo(h)}),0!==l.length){this._loading||(this._loading=!0,this.fire("loading"));var v=e.createDocumentFragment();for(p=0;p<l.length;p++)this._addTile(l[p],v);this._level.el.appendChild(v)}}}},_isValidTile:function(t){var e=this._map.options.crs;if(!e.infinite){var i=this._globalTileRange;if(!e.wrapLng&&(t.x<i.min.x||t.x>i.max.x)||!e.wrapLat&&(t.y<i.min.y||t.y>i.max.y))return!1}if(!this.options.bounds)return!0;var n=this._tileCoordsToBounds(t);return o.latLngBounds(this.options.bounds).overlaps(n)},_keyToBounds:function(t){return this._tileCoordsToBounds(this._keyToTileCoords(t))},_tileCoordsToBounds:function(t){var e=this._map,i=this.getTileSize(),n=t.scaleBy(i),s=n.add(i),r=e.unproject(n,t.z),a=e.unproject(s,t.z),h=new o.LatLngBounds(r,a);return this.options.noWrap||e.wrapLatLngBounds(h),h},_tileCoordsToKey:function(t){return t.x+":"+t.y+":"+t.z},_keyToTileCoords:function(t){var e=t.split(":"),i=new o.Point(+e[0],+e[1]);return i.z=+e[2],i},_removeTile:function(t){var e=this._tiles[t];e&&(o.DomUtil.remove(e.el),delete this._tiles[t],this.fire("tileunload",{tile:e.el,coords:this._keyToTileCoords(t)}))},_initTile:function(t){o.DomUtil.addClass(t,"leaflet-tile");var e=this.getTileSize();t.style.width=e.x+"px",t.style.height=e.y+"px",t.onselectstart=o.Util.falseFn,t.onmousemove=o.Util.falseFn,o.Browser.ielt9&&this.options.opacity<1&&o.DomUtil.setOpacity(t,this.options.opacity),o.Browser.android&&!o.Browser.android23&&(t.style.WebkitBackfaceVisibility="hidden")},_addTile:function(t,e){var i=this._getTilePos(t),n=this._tileCoordsToKey(t),s=this.createTile(this._wrapCoords(t),o.bind(this._tileReady,this,t));this._initTile(s),this.createTile.length<2&&o.Util.requestAnimFrame(o.bind(this._tileReady,this,t,null,s)),o.DomUtil.setPosition(s,i),this._tiles[n]={el:s,coords:t,current:!0},e.appendChild(s),this.fire("tileloadstart",{tile:s,coords:t})},_tileReady:function(t,e,i){if(this._map){e&&this.fire("tileerror",{error:e,tile:i,coords:t});var n=this._tileCoordsToKey(t);i=this._tiles[n],i&&(i.loaded=+new Date,this._map._fadeAnimated?(o.DomUtil.setOpacity(i.el,0),o.Util.cancelAnimFrame(this._fadeFrame),this._fadeFrame=o.Util.requestAnimFrame(this._updateOpacity,this)):(i.active=!0,this._pruneTiles()),e||(o.DomUtil.addClass(i.el,"leaflet-tile-loaded"),this.fire("tileload",{tile:i.el,coords:t})),this._noTilesToLoad()&&(this._loading=!1,this.fire("load"),o.Browser.ielt9||!this._map._fadeAnimated?o.Util.requestAnimFrame(this._pruneTiles,this):setTimeout(o.bind(this._pruneTiles,this),250)))}},_getTilePos:function(t){return t.scaleBy(this.getTileSize()).subtract(this._level.origin)},_wrapCoords:function(t){var e=new o.Point(this._wrapX?o.Util.wrapNum(t.x,this._wrapX):t.x,this._wrapY?o.Util.wrapNum(t.y,this._wrapY):t.y);return e.z=t.z,e},_pxBoundsToTileRange:function(t){var e=this.getTileSize();return new o.Bounds(t.min.unscaleBy(e).floor(),t.max.unscaleBy(e).ceil().subtract([1,1]))},_noTilesToLoad:function(){for(var t in this._tiles)if(!this._tiles[t].loaded)return!1;return!0}}),o.gridLayer=function(t){return new o.GridLayer(t)},o.TileLayer=o.GridLayer.extend({options:{minZoom:0,maxZoom:18,maxNativeZoom:null,minNativeZoom:null,subdomains:"abc",errorTileUrl:"",zoomOffset:0,tms:!1,zoomReverse:!1,detectRetina:!1,crossOrigin:!1},initialize:function(t,e){this._url=t,e=o.setOptions(this,e),e.detectRetina&&o.Browser.retina&&e.maxZoom>0&&(e.tileSize=Math.floor(e.tileSize/2),e.zoomReverse?(e.zoomOffset--,e.minZoom++):(e.zoomOffset++,e.maxZoom--),e.minZoom=Math.max(0,e.minZoom)),"string"==typeof e.subdomains&&(e.subdomains=e.subdomains.split("")),o.Browser.android||this.on("tileunload",this._onTileRemove)},setUrl:function(t,e){return this._url=t,e||this.redraw(),this},createTile:function(t,i){var n=e.createElement("img");return o.DomEvent.on(n,"load",o.bind(this._tileOnLoad,this,i,n)),o.DomEvent.on(n,"error",o.bind(this._tileOnError,this,i,n)),this.options.crossOrigin&&(n.crossOrigin=""),n.alt="",n.setAttribute("role","presentation"),n.src=this.getTileUrl(t),n},getTileUrl:function(t){var e={r:o.Browser.retina?"@2x":"",s:this._getSubdomain(t),x:t.x,y:t.y,z:this._getZoomForUrl()};if(this._map&&!this._map.options.crs.infinite){var i=this._globalTileRange.max.y-t.y;this.options.tms&&(e.y=i),e["-y"]=i}return o.Util.template(this._url,o.extend(e,this.options))},_tileOnLoad:function(t,e){o.Browser.ielt9?setTimeout(o.bind(t,this,null,e),0):t(null,e)},_tileOnError:function(t,e,i){var n=this.options.errorTileUrl;n&&e.src!==n&&(e.src=n),t(i,e)},getTileSize:function(){var t=this._map,e=o.GridLayer.prototype.getTileSize.call(this),i=this._tileZoom+this.options.zoomOffset,n=this.options.minNativeZoom,s=this.options.maxNativeZoom;return null!==n&&i<n?e.divideBy(t.getZoomScale(n,i)).round():null!==s&&i>s?e.divideBy(t.getZoomScale(s,i)).round():e},_onTileRemove:function(t){t.tile.onload=null},_getZoomForUrl:function(){var t=this._tileZoom,e=this.options.maxZoom,i=this.options.zoomReverse,n=this.options.zoomOffset,o=this.options.minNativeZoom,s=this.options.maxNativeZoom;return i&&(t=e-t),t+=n,null!==o&&t<o?o:null!==s&&t>s?s:t},_getSubdomain:function(t){var e=Math.abs(t.x+t.y)%this.options.subdomains.length;return this.options.subdomains[e]},_abortLoading:function(){var t,e;for(t in this._tiles)this._tiles[t].coords.z!==this._tileZoom&&(e=this._tiles[t].el,e.onload=o.Util.falseFn,e.onerror=o.Util.falseFn,e.complete||(e.src=o.Util.emptyImageUrl,o.DomUtil.remove(e)))}}),o.tileLayer=function(t,e){return new o.TileLayer(t,e)},o.TileLayer.WMS=o.TileLayer.extend({defaultWmsParams:{service:"WMS",request:"GetMap",layers:"",styles:"",format:"image/jpeg",transparent:!1,version:"1.1.1"},options:{crs:null,uppercase:!1},initialize:function(t,e){this._url=t;var i=o.extend({},this.defaultWmsParams);for(var n in e)n in this.options||(i[n]=e[n]);e=o.setOptions(this,e),i.width=i.height=e.tileSize*(e.detectRetina&&o.Browser.retina?2:1),this.wmsParams=i},onAdd:function(t){this._crs=this.options.crs||t.options.crs,this._wmsVersion=parseFloat(this.wmsParams.version);var e=this._wmsVersion>=1.3?"crs":"srs";this.wmsParams[e]=this._crs.code,o.TileLayer.prototype.onAdd.call(this,t)},getTileUrl:function(t){var e=this._tileCoordsToBounds(t),i=this._crs.project(e.getNorthWest()),n=this._crs.project(e.getSouthEast()),s=(this._wmsVersion>=1.3&&this._crs===o.CRS.EPSG4326?[n.y,i.x,i.y,n.x]:[i.x,n.y,n.x,i.y]).join(","),r=o.TileLayer.prototype.getTileUrl.call(this,t);return r+o.Util.getParamString(this.wmsParams,r,this.options.uppercase)+(this.options.uppercase?"&BBOX=":"&bbox=")+s},setParams:function(t,e){return o.extend(this.wmsParams,t),e||this.redraw(),this}}),o.tileLayer.wms=function(t,e){return new o.TileLayer.WMS(t,e)},o.ImageOverlay=o.Layer.extend({options:{opacity:1,alt:"",interactive:!1,crossOrigin:!1},initialize:function(t,e,i){this._url=t,this._bounds=o.latLngBounds(e),o.setOptions(this,i)},onAdd:function(){this._image||(this._initImage(),this.options.opacity<1&&this._updateOpacity()),this.options.interactive&&(o.DomUtil.addClass(this._image,"leaflet-interactive"),this.addInteractiveTarget(this._image)),this.getPane().appendChild(this._image),this._reset()},onRemove:function(){o.DomUtil.remove(this._image),this.options.interactive&&this.removeInteractiveTarget(this._image)},setOpacity:function(t){return this.options.opacity=t,this._image&&this._updateOpacity(),this},setStyle:function(t){return t.opacity&&this.setOpacity(t.opacity),this},bringToFront:function(){return this._map&&o.DomUtil.toFront(this._image),this},bringToBack:function(){return this._map&&o.DomUtil.toBack(this._image),this},setUrl:function(t){return this._url=t,this._image&&(this._image.src=t),this},setBounds:function(t){return this._bounds=t,this._map&&this._reset(),this},getEvents:function(){var t={zoom:this._reset,viewreset:this._reset};return this._zoomAnimated&&(t.zoomanim=this._animateZoom),t},getBounds:function(){return this._bounds},getElement:function(){return this._image},_initImage:function(){var t=this._image=o.DomUtil.create("img","leaflet-image-layer "+(this._zoomAnimated?"leaflet-zoom-animated":""));t.onselectstart=o.Util.falseFn,t.onmousemove=o.Util.falseFn,t.onload=o.bind(this.fire,this,"load"),this.options.crossOrigin&&(t.crossOrigin=""),t.src=this._url,t.alt=this.options.alt},_animateZoom:function(t){var e=this._map.getZoomScale(t.zoom),i=this._map._latLngBoundsToNewLayerBounds(this._bounds,t.zoom,t.center).min;o.DomUtil.setTransform(this._image,i,e)},_reset:function(){var t=this._image,e=new o.Bounds(this._map.latLngToLayerPoint(this._bounds.getNorthWest()),this._map.latLngToLayerPoint(this._bounds.getSouthEast())),i=e.getSize();
	o.DomUtil.setPosition(t,e.min),t.style.width=i.x+"px",t.style.height=i.y+"px"},_updateOpacity:function(){o.DomUtil.setOpacity(this._image,this.options.opacity)}}),o.imageOverlay=function(t,e,i){return new o.ImageOverlay(t,e,i)},o.Icon=o.Class.extend({initialize:function(t){o.setOptions(this,t)},createIcon:function(t){return this._createIcon("icon",t)},createShadow:function(t){return this._createIcon("shadow",t)},_createIcon:function(t,e){var i=this._getIconUrl(t);if(!i){if("icon"===t)throw new Error("iconUrl not set in Icon options (see the docs).");return null}var n=this._createImg(i,e&&"IMG"===e.tagName?e:null);return this._setIconStyles(n,t),n},_setIconStyles:function(t,e){var i=this.options,n=i[e+"Size"];"number"==typeof n&&(n=[n,n]);var s=o.point(n),r=o.point("shadow"===e&&i.shadowAnchor||i.iconAnchor||s&&s.divideBy(2,!0));t.className="leaflet-marker-"+e+" "+(i.className||""),r&&(t.style.marginLeft=-r.x+"px",t.style.marginTop=-r.y+"px"),s&&(t.style.width=s.x+"px",t.style.height=s.y+"px")},_createImg:function(t,i){return i=i||e.createElement("img"),i.src=t,i},_getIconUrl:function(t){return o.Browser.retina&&this.options[t+"RetinaUrl"]||this.options[t+"Url"]}}),o.icon=function(t){return new o.Icon(t)},o.Icon.Default=o.Icon.extend({options:{iconUrl:"marker-icon.png",iconRetinaUrl:"marker-icon-2x.png",shadowUrl:"marker-shadow.png",iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34],tooltipAnchor:[16,-28],shadowSize:[41,41]},_getIconUrl:function(t){return o.Icon.Default.imagePath||(o.Icon.Default.imagePath=this._detectIconPath()),(this.options.imagePath||o.Icon.Default.imagePath)+o.Icon.prototype._getIconUrl.call(this,t)},_detectIconPath:function(){var t=o.DomUtil.create("div","leaflet-default-icon-path",e.body),i=o.DomUtil.getStyle(t,"background-image")||o.DomUtil.getStyle(t,"backgroundImage");return e.body.removeChild(t),0===i.indexOf("url")?i.replace(/^url\([\"\']?/,"").replace(/marker-icon\.png[\"\']?\)$/,""):""}}),o.Marker=o.Layer.extend({options:{icon:new o.Icon.Default,interactive:!0,draggable:!1,keyboard:!0,title:"",alt:"",zIndexOffset:0,opacity:1,riseOnHover:!1,riseOffset:250,pane:"markerPane",nonBubblingEvents:["click","dblclick","mouseover","mouseout","contextmenu"]},initialize:function(t,e){o.setOptions(this,e),this._latlng=o.latLng(t)},onAdd:function(t){this._zoomAnimated=this._zoomAnimated&&t.options.markerZoomAnimation,this._zoomAnimated&&t.on("zoomanim",this._animateZoom,this),this._initIcon(),this.update()},onRemove:function(t){this.dragging&&this.dragging.enabled()&&(this.options.draggable=!0,this.dragging.removeHooks()),this._zoomAnimated&&t.off("zoomanim",this._animateZoom,this),this._removeIcon(),this._removeShadow()},getEvents:function(){return{zoom:this.update,viewreset:this.update}},getLatLng:function(){return this._latlng},setLatLng:function(t){var e=this._latlng;return this._latlng=o.latLng(t),this.update(),this.fire("move",{oldLatLng:e,latlng:this._latlng})},setZIndexOffset:function(t){return this.options.zIndexOffset=t,this.update()},setIcon:function(t){return this.options.icon=t,this._map&&(this._initIcon(),this.update()),this._popup&&this.bindPopup(this._popup,this._popup.options),this},getElement:function(){return this._icon},update:function(){if(this._icon){var t=this._map.latLngToLayerPoint(this._latlng).round();this._setPos(t)}return this},_initIcon:function(){var t=this.options,e="leaflet-zoom-"+(this._zoomAnimated?"animated":"hide"),i=t.icon.createIcon(this._icon),n=!1;i!==this._icon&&(this._icon&&this._removeIcon(),n=!0,t.title&&(i.title=t.title),t.alt&&(i.alt=t.alt)),o.DomUtil.addClass(i,e),t.keyboard&&(i.tabIndex="0"),this._icon=i,t.riseOnHover&&this.on({mouseover:this._bringToFront,mouseout:this._resetZIndex});var s=t.icon.createShadow(this._shadow),r=!1;s!==this._shadow&&(this._removeShadow(),r=!0),s&&(o.DomUtil.addClass(s,e),s.alt=""),this._shadow=s,t.opacity<1&&this._updateOpacity(),n&&this.getPane().appendChild(this._icon),this._initInteraction(),s&&r&&this.getPane("shadowPane").appendChild(this._shadow)},_removeIcon:function(){this.options.riseOnHover&&this.off({mouseover:this._bringToFront,mouseout:this._resetZIndex}),o.DomUtil.remove(this._icon),this.removeInteractiveTarget(this._icon),this._icon=null},_removeShadow:function(){this._shadow&&o.DomUtil.remove(this._shadow),this._shadow=null},_setPos:function(t){o.DomUtil.setPosition(this._icon,t),this._shadow&&o.DomUtil.setPosition(this._shadow,t),this._zIndex=t.y+this.options.zIndexOffset,this._resetZIndex()},_updateZIndex:function(t){this._icon.style.zIndex=this._zIndex+t},_animateZoom:function(t){var e=this._map._latLngToNewLayerPoint(this._latlng,t.zoom,t.center).round();this._setPos(e)},_initInteraction:function(){if(this.options.interactive&&(o.DomUtil.addClass(this._icon,"leaflet-interactive"),this.addInteractiveTarget(this._icon),o.Handler.MarkerDrag)){var t=this.options.draggable;this.dragging&&(t=this.dragging.enabled(),this.dragging.disable()),this.dragging=new o.Handler.MarkerDrag(this),t&&this.dragging.enable()}},setOpacity:function(t){return this.options.opacity=t,this._map&&this._updateOpacity(),this},_updateOpacity:function(){var t=this.options.opacity;o.DomUtil.setOpacity(this._icon,t),this._shadow&&o.DomUtil.setOpacity(this._shadow,t)},_bringToFront:function(){this._updateZIndex(this.options.riseOffset)},_resetZIndex:function(){this._updateZIndex(0)},_getPopupAnchor:function(){return this.options.icon.options.popupAnchor||[0,0]},_getTooltipAnchor:function(){return this.options.icon.options.tooltipAnchor||[0,0]}}),o.marker=function(t,e){return new o.Marker(t,e)},o.DivIcon=o.Icon.extend({options:{iconSize:[12,12],html:!1,bgPos:null,className:"leaflet-div-icon"},createIcon:function(t){var i=t&&"DIV"===t.tagName?t:e.createElement("div"),n=this.options;if(i.innerHTML=n.html!==!1?n.html:"",n.bgPos){var s=o.point(n.bgPos);i.style.backgroundPosition=-s.x+"px "+-s.y+"px"}return this._setIconStyles(i,"icon"),i},createShadow:function(){return null}}),o.divIcon=function(t){return new o.DivIcon(t)},o.DivOverlay=o.Layer.extend({options:{offset:[0,7],className:"",pane:"popupPane"},initialize:function(t,e){o.setOptions(this,t),this._source=e},onAdd:function(t){this._zoomAnimated=t._zoomAnimated,this._container||this._initLayout(),t._fadeAnimated&&o.DomUtil.setOpacity(this._container,0),clearTimeout(this._removeTimeout),this.getPane().appendChild(this._container),this.update(),t._fadeAnimated&&o.DomUtil.setOpacity(this._container,1),this.bringToFront()},onRemove:function(t){t._fadeAnimated?(o.DomUtil.setOpacity(this._container,0),this._removeTimeout=setTimeout(o.bind(o.DomUtil.remove,o.DomUtil,this._container),200)):o.DomUtil.remove(this._container)},getLatLng:function(){return this._latlng},setLatLng:function(t){return this._latlng=o.latLng(t),this._map&&(this._updatePosition(),this._adjustPan()),this},getContent:function(){return this._content},setContent:function(t){return this._content=t,this.update(),this},getElement:function(){return this._container},update:function(){this._map&&(this._container.style.visibility="hidden",this._updateContent(),this._updateLayout(),this._updatePosition(),this._container.style.visibility="",this._adjustPan())},getEvents:function(){var t={zoom:this._updatePosition,viewreset:this._updatePosition};return this._zoomAnimated&&(t.zoomanim=this._animateZoom),t},isOpen:function(){return!!this._map&&this._map.hasLayer(this)},bringToFront:function(){return this._map&&o.DomUtil.toFront(this._container),this},bringToBack:function(){return this._map&&o.DomUtil.toBack(this._container),this},_updateContent:function(){if(this._content){var t=this._contentNode,e="function"==typeof this._content?this._content(this._source||this):this._content;if("string"==typeof e)t.innerHTML=e;else{for(;t.hasChildNodes();)t.removeChild(t.firstChild);t.appendChild(e)}this.fire("contentupdate")}},_updatePosition:function(){if(this._map){var t=this._map.latLngToLayerPoint(this._latlng),e=o.point(this.options.offset),i=this._getAnchor();this._zoomAnimated?o.DomUtil.setPosition(this._container,t.add(i)):e=e.add(t).add(i);var n=this._containerBottom=-e.y,s=this._containerLeft=-Math.round(this._containerWidth/2)+e.x;this._container.style.bottom=n+"px",this._container.style.left=s+"px"}},_getAnchor:function(){return[0,0]}}),o.Popup=o.DivOverlay.extend({options:{maxWidth:300,minWidth:50,maxHeight:null,autoPan:!0,autoPanPaddingTopLeft:null,autoPanPaddingBottomRight:null,autoPanPadding:[5,5],keepInView:!1,closeButton:!0,autoClose:!0,className:""},openOn:function(t){return t.openPopup(this),this},onAdd:function(t){o.DivOverlay.prototype.onAdd.call(this,t),t.fire("popupopen",{popup:this}),this._source&&(this._source.fire("popupopen",{popup:this},!0),this._source instanceof o.Path||this._source.on("preclick",o.DomEvent.stopPropagation))},onRemove:function(t){o.DivOverlay.prototype.onRemove.call(this,t),t.fire("popupclose",{popup:this}),this._source&&(this._source.fire("popupclose",{popup:this},!0),this._source instanceof o.Path||this._source.off("preclick",o.DomEvent.stopPropagation))},getEvents:function(){var t=o.DivOverlay.prototype.getEvents.call(this);return("closeOnClick"in this.options?this.options.closeOnClick:this._map.options.closePopupOnClick)&&(t.preclick=this._close),this.options.keepInView&&(t.moveend=this._adjustPan),t},_close:function(){this._map&&this._map.closePopup(this)},_initLayout:function(){var t="leaflet-popup",e=this._container=o.DomUtil.create("div",t+" "+(this.options.className||"")+" leaflet-zoom-animated");if(this.options.closeButton){var i=this._closeButton=o.DomUtil.create("a",t+"-close-button",e);i.href="#close",i.innerHTML="&#215;",o.DomEvent.on(i,"click",this._onCloseButtonClick,this)}var n=this._wrapper=o.DomUtil.create("div",t+"-content-wrapper",e);this._contentNode=o.DomUtil.create("div",t+"-content",n),o.DomEvent.disableClickPropagation(n).disableScrollPropagation(this._contentNode).on(n,"contextmenu",o.DomEvent.stopPropagation),this._tipContainer=o.DomUtil.create("div",t+"-tip-container",e),this._tip=o.DomUtil.create("div",t+"-tip",this._tipContainer)},_updateLayout:function(){var t=this._contentNode,e=t.style;e.width="",e.whiteSpace="nowrap";var i=t.offsetWidth;i=Math.min(i,this.options.maxWidth),i=Math.max(i,this.options.minWidth),e.width=i+1+"px",e.whiteSpace="",e.height="";var n=t.offsetHeight,s=this.options.maxHeight,r="leaflet-popup-scrolled";s&&n>s?(e.height=s+"px",o.DomUtil.addClass(t,r)):o.DomUtil.removeClass(t,r),this._containerWidth=this._container.offsetWidth},_animateZoom:function(t){var e=this._map._latLngToNewLayerPoint(this._latlng,t.zoom,t.center),i=this._getAnchor();o.DomUtil.setPosition(this._container,e.add(i))},_adjustPan:function(){if(!(!this.options.autoPan||this._map._panAnim&&this._map._panAnim._inProgress)){var t=this._map,e=parseInt(o.DomUtil.getStyle(this._container,"marginBottom"),10)||0,i=this._container.offsetHeight+e,n=this._containerWidth,s=new o.Point(this._containerLeft,-i-this._containerBottom);s._add(o.DomUtil.getPosition(this._container));var r=t.layerPointToContainerPoint(s),a=o.point(this.options.autoPanPadding),h=o.point(this.options.autoPanPaddingTopLeft||a),l=o.point(this.options.autoPanPaddingBottomRight||a),u=t.getSize(),c=0,d=0;r.x+n+l.x>u.x&&(c=r.x+n-u.x+l.x),r.x-c-h.x<0&&(c=r.x-h.x),r.y+i+l.y>u.y&&(d=r.y+i-u.y+l.y),r.y-d-h.y<0&&(d=r.y-h.y),(c||d)&&t.fire("autopanstart").panBy([c,d])}},_onCloseButtonClick:function(t){this._close(),o.DomEvent.stop(t)},_getAnchor:function(){return o.point(this._source&&this._source._getPopupAnchor?this._source._getPopupAnchor():[0,0])}}),o.popup=function(t,e){return new o.Popup(t,e)},o.Map.mergeOptions({closePopupOnClick:!0}),o.Map.include({openPopup:function(t,e,i){return t instanceof o.Popup||(t=new o.Popup(i).setContent(t)),e&&t.setLatLng(e),this.hasLayer(t)?this:(this._popup&&this._popup.options.autoClose&&this.closePopup(),this._popup=t,this.addLayer(t))},closePopup:function(t){return t&&t!==this._popup||(t=this._popup,this._popup=null),t&&this.removeLayer(t),this}}),o.Layer.include({bindPopup:function(t,e){return t instanceof o.Popup?(o.setOptions(t,e),this._popup=t,t._source=this):(this._popup&&!e||(this._popup=new o.Popup(e,this)),this._popup.setContent(t)),this._popupHandlersAdded||(this.on({click:this._openPopup,remove:this.closePopup,move:this._movePopup}),this._popupHandlersAdded=!0),this},unbindPopup:function(){return this._popup&&(this.off({click:this._openPopup,remove:this.closePopup,move:this._movePopup}),this._popupHandlersAdded=!1,this._popup=null),this},openPopup:function(t,e){if(t instanceof o.Layer||(e=t,t=this),t instanceof o.FeatureGroup)for(var i in this._layers){t=this._layers[i];break}return e||(e=t.getCenter?t.getCenter():t.getLatLng()),this._popup&&this._map&&(this._popup._source=t,this._popup.update(),this._map.openPopup(this._popup,e)),this},closePopup:function(){return this._popup&&this._popup._close(),this},togglePopup:function(t){return this._popup&&(this._popup._map?this.closePopup():this.openPopup(t)),this},isPopupOpen:function(){return!!this._popup&&this._popup.isOpen()},setPopupContent:function(t){return this._popup&&this._popup.setContent(t),this},getPopup:function(){return this._popup},_openPopup:function(t){var e=t.layer||t.target;if(this._popup&&this._map)return o.DomEvent.stop(t),e instanceof o.Path?void this.openPopup(t.layer||t.target,t.latlng):void(this._map.hasLayer(this._popup)&&this._popup._source===e?this.closePopup():this.openPopup(e,t.latlng))},_movePopup:function(t){this._popup.setLatLng(t.latlng)}}),o.Tooltip=o.DivOverlay.extend({options:{pane:"tooltipPane",offset:[0,0],direction:"auto",permanent:!1,sticky:!1,interactive:!1,opacity:.9},onAdd:function(t){o.DivOverlay.prototype.onAdd.call(this,t),this.setOpacity(this.options.opacity),t.fire("tooltipopen",{tooltip:this}),this._source&&this._source.fire("tooltipopen",{tooltip:this},!0)},onRemove:function(t){o.DivOverlay.prototype.onRemove.call(this,t),t.fire("tooltipclose",{tooltip:this}),this._source&&this._source.fire("tooltipclose",{tooltip:this},!0)},getEvents:function(){var t=o.DivOverlay.prototype.getEvents.call(this);return o.Browser.touch&&!this.options.permanent&&(t.preclick=this._close),t},_close:function(){this._map&&this._map.closeTooltip(this)},_initLayout:function(){var t="leaflet-tooltip",e=t+" "+(this.options.className||"")+" leaflet-zoom-"+(this._zoomAnimated?"animated":"hide");this._contentNode=this._container=o.DomUtil.create("div",e)},_updateLayout:function(){},_adjustPan:function(){},_setPosition:function(t){var e=this._map,i=this._container,n=e.latLngToContainerPoint(e.getCenter()),s=e.layerPointToContainerPoint(t),r=this.options.direction,a=i.offsetWidth,h=i.offsetHeight,l=o.point(this.options.offset),u=this._getAnchor();"top"===r?t=t.add(o.point(-a/2+l.x,-h+l.y+u.y,!0)):"bottom"===r?t=t.subtract(o.point(a/2-l.x,-l.y,!0)):"center"===r?t=t.subtract(o.point(a/2+l.x,h/2-u.y+l.y,!0)):"right"===r||"auto"===r&&s.x<n.x?(r="right",t=t.add(o.point(l.x+u.x,u.y-h/2+l.y,!0))):(r="left",t=t.subtract(o.point(a+u.x-l.x,h/2-u.y-l.y,!0))),o.DomUtil.removeClass(i,"leaflet-tooltip-right"),o.DomUtil.removeClass(i,"leaflet-tooltip-left"),o.DomUtil.removeClass(i,"leaflet-tooltip-top"),o.DomUtil.removeClass(i,"leaflet-tooltip-bottom"),o.DomUtil.addClass(i,"leaflet-tooltip-"+r),o.DomUtil.setPosition(i,t)},_updatePosition:function(){var t=this._map.latLngToLayerPoint(this._latlng);this._setPosition(t)},setOpacity:function(t){this.options.opacity=t,this._container&&o.DomUtil.setOpacity(this._container,t)},_animateZoom:function(t){var e=this._map._latLngToNewLayerPoint(this._latlng,t.zoom,t.center);this._setPosition(e)},_getAnchor:function(){return o.point(this._source&&this._source._getTooltipAnchor&&!this.options.sticky?this._source._getTooltipAnchor():[0,0])}}),o.tooltip=function(t,e){return new o.Tooltip(t,e)},o.Map.include({openTooltip:function(t,e,i){return t instanceof o.Tooltip||(t=new o.Tooltip(i).setContent(t)),e&&t.setLatLng(e),this.hasLayer(t)?this:this.addLayer(t)},closeTooltip:function(t){return t&&this.removeLayer(t),this}}),o.Layer.include({bindTooltip:function(t,e){return t instanceof o.Tooltip?(o.setOptions(t,e),this._tooltip=t,t._source=this):(this._tooltip&&!e||(this._tooltip=o.tooltip(e,this)),this._tooltip.setContent(t)),this._initTooltipInteractions(),this._tooltip.options.permanent&&this._map&&this._map.hasLayer(this)&&this.openTooltip(),this},unbindTooltip:function(){return this._tooltip&&(this._initTooltipInteractions(!0),this.closeTooltip(),this._tooltip=null),this},_initTooltipInteractions:function(t){if(t||!this._tooltipHandlersAdded){var e=t?"off":"on",i={remove:this.closeTooltip,move:this._moveTooltip};this._tooltip.options.permanent?i.add=this._openTooltip:(i.mouseover=this._openTooltip,i.mouseout=this.closeTooltip,this._tooltip.options.sticky&&(i.mousemove=this._moveTooltip),o.Browser.touch&&(i.click=this._openTooltip)),this[e](i),this._tooltipHandlersAdded=!t}},openTooltip:function(t,e){if(t instanceof o.Layer||(e=t,t=this),t instanceof o.FeatureGroup)for(var i in this._layers){t=this._layers[i];break}return e||(e=t.getCenter?t.getCenter():t.getLatLng()),this._tooltip&&this._map&&(this._tooltip._source=t,this._tooltip.update(),this._map.openTooltip(this._tooltip,e),this._tooltip.options.interactive&&this._tooltip._container&&(o.DomUtil.addClass(this._tooltip._container,"leaflet-clickable"),this.addInteractiveTarget(this._tooltip._container))),this},closeTooltip:function(){return this._tooltip&&(this._tooltip._close(),this._tooltip.options.interactive&&this._tooltip._container&&(o.DomUtil.removeClass(this._tooltip._container,"leaflet-clickable"),this.removeInteractiveTarget(this._tooltip._container))),this},toggleTooltip:function(t){return this._tooltip&&(this._tooltip._map?this.closeTooltip():this.openTooltip(t)),this},isTooltipOpen:function(){return this._tooltip.isOpen()},setTooltipContent:function(t){return this._tooltip&&this._tooltip.setContent(t),this},getTooltip:function(){return this._tooltip},_openTooltip:function(t){var e=t.layer||t.target;this._tooltip&&this._map&&this.openTooltip(e,this._tooltip.options.sticky?t.latlng:i)},_moveTooltip:function(t){var e,i,n=t.latlng;this._tooltip.options.sticky&&t.originalEvent&&(e=this._map.mouseEventToContainerPoint(t.originalEvent),i=this._map.containerPointToLayerPoint(e),n=this._map.layerPointToLatLng(i)),this._tooltip.setLatLng(n)}}),o.LayerGroup=o.Layer.extend({initialize:function(t){this._layers={};var e,i;if(t)for(e=0,i=t.length;e<i;e++)this.addLayer(t[e])},addLayer:function(t){var e=this.getLayerId(t);return this._layers[e]=t,this._map&&this._map.addLayer(t),this},removeLayer:function(t){var e=t in this._layers?t:this.getLayerId(t);return this._map&&this._layers[e]&&this._map.removeLayer(this._layers[e]),delete this._layers[e],this},hasLayer:function(t){return!!t&&(t in this._layers||this.getLayerId(t)in this._layers)},clearLayers:function(){for(var t in this._layers)this.removeLayer(this._layers[t]);return this},invoke:function(t){var e,i,n=Array.prototype.slice.call(arguments,1);for(e in this._layers)i=this._layers[e],i[t]&&i[t].apply(i,n);return this},onAdd:function(t){for(var e in this._layers)t.addLayer(this._layers[e])},onRemove:function(t){for(var e in this._layers)t.removeLayer(this._layers[e])},eachLayer:function(t,e){for(var i in this._layers)t.call(e,this._layers[i]);return this},getLayer:function(t){return this._layers[t]},getLayers:function(){var t=[];for(var e in this._layers)t.push(this._layers[e]);return t},setZIndex:function(t){return this.invoke("setZIndex",t)},getLayerId:function(t){return o.stamp(t)}}),o.layerGroup=function(t){return new o.LayerGroup(t)},o.FeatureGroup=o.LayerGroup.extend({addLayer:function(t){return this.hasLayer(t)?this:(t.addEventParent(this),o.LayerGroup.prototype.addLayer.call(this,t),this.fire("layeradd",{layer:t}))},removeLayer:function(t){return this.hasLayer(t)?(t in this._layers&&(t=this._layers[t]),t.removeEventParent(this),o.LayerGroup.prototype.removeLayer.call(this,t),this.fire("layerremove",{layer:t})):this},setStyle:function(t){return this.invoke("setStyle",t)},bringToFront:function(){return this.invoke("bringToFront")},bringToBack:function(){return this.invoke("bringToBack")},getBounds:function(){var t=new o.LatLngBounds;for(var e in this._layers){var i=this._layers[e];t.extend(i.getBounds?i.getBounds():i.getLatLng())}return t}}),o.featureGroup=function(t){return new o.FeatureGroup(t)},o.Renderer=o.Layer.extend({options:{padding:.1},initialize:function(t){o.setOptions(this,t),o.stamp(this),this._layers=this._layers||{}},onAdd:function(){this._container||(this._initContainer(),this._zoomAnimated&&o.DomUtil.addClass(this._container,"leaflet-zoom-animated")),this.getPane().appendChild(this._container),this._update(),this.on("update",this._updatePaths,this)},onRemove:function(){o.DomUtil.remove(this._container),this.off("update",this._updatePaths,this)},getEvents:function(){var t={viewreset:this._reset,zoom:this._onZoom,moveend:this._update,zoomend:this._onZoomEnd};return this._zoomAnimated&&(t.zoomanim=this._onAnimZoom),t},_onAnimZoom:function(t){this._updateTransform(t.center,t.zoom)},_onZoom:function(){this._updateTransform(this._map.getCenter(),this._map.getZoom())},_updateTransform:function(t,e){var i=this._map.getZoomScale(e,this._zoom),n=o.DomUtil.getPosition(this._container),s=this._map.getSize().multiplyBy(.5+this.options.padding),r=this._map.project(this._center,e),a=this._map.project(t,e),h=a.subtract(r),l=s.multiplyBy(-i).add(n).add(s).subtract(h);o.Browser.any3d?o.DomUtil.setTransform(this._container,l,i):o.DomUtil.setPosition(this._container,l)},_reset:function(){this._update(),this._updateTransform(this._center,this._zoom);for(var t in this._layers)this._layers[t]._reset()},_onZoomEnd:function(){for(var t in this._layers)this._layers[t]._project()},_updatePaths:function(){for(var t in this._layers)this._layers[t]._update()},_update:function(){var t=this.options.padding,e=this._map.getSize(),i=this._map.containerPointToLayerPoint(e.multiplyBy(-t)).round();this._bounds=new o.Bounds(i,i.add(e.multiplyBy(1+2*t)).round()),this._center=this._map.getCenter(),this._zoom=this._map.getZoom()}}),o.Map.include({getRenderer:function(t){var e=t.options.renderer||this._getPaneRenderer(t.options.pane)||this.options.renderer||this._renderer;return e||(e=this._renderer=this.options.preferCanvas&&o.canvas()||o.svg()),this.hasLayer(e)||this.addLayer(e),e},_getPaneRenderer:function(t){if("overlayPane"===t||t===i)return!1;var e=this._paneRenderers[t];return e===i&&(e=o.SVG&&o.svg({pane:t})||o.Canvas&&o.canvas({pane:t}),this._paneRenderers[t]=e),e}}),o.Path=o.Layer.extend({options:{stroke:!0,color:"#3388ff",weight:3,opacity:1,lineCap:"round",lineJoin:"round",dashArray:null,dashOffset:null,fill:!1,fillColor:null,fillOpacity:.2,fillRule:"evenodd",interactive:!0},beforeAdd:function(t){this._renderer=t.getRenderer(this)},onAdd:function(){this._renderer._initPath(this),this._reset(),this._renderer._addPath(this)},onRemove:function(){this._renderer._removePath(this)},redraw:function(){return this._map&&this._renderer._updatePath(this),this},setStyle:function(t){return o.setOptions(this,t),this._renderer&&this._renderer._updateStyle(this),this},bringToFront:function(){return this._renderer&&this._renderer._bringToFront(this),this},bringToBack:function(){return this._renderer&&this._renderer._bringToBack(this),this},getElement:function(){return this._path},_reset:function(){this._project(),this._update()},_clickTolerance:function(){return(this.options.stroke?this.options.weight/2:0)+(o.Browser.touch?10:0)}}),o.LineUtil={simplify:function(t,e){if(!e||!t.length)return t.slice();var i=e*e;return t=this._reducePoints(t,i),t=this._simplifyDP(t,i)},pointToSegmentDistance:function(t,e,i){return Math.sqrt(this._sqClosestPointOnSegment(t,e,i,!0))},closestPointOnSegment:function(t,e,i){return this._sqClosestPointOnSegment(t,e,i)},_simplifyDP:function(t,e){var n=t.length,o=typeof Uint8Array!=i+""?Uint8Array:Array,s=new o(n);s[0]=s[n-1]=1,this._simplifyDPStep(t,s,e,0,n-1);var r,a=[];for(r=0;r<n;r++)s[r]&&a.push(t[r]);return a},_simplifyDPStep:function(t,e,i,n,o){var s,r,a,h=0;for(r=n+1;r<=o-1;r++)a=this._sqClosestPointOnSegment(t[r],t[n],t[o],!0),a>h&&(s=r,h=a);h>i&&(e[s]=1,this._simplifyDPStep(t,e,i,n,s),this._simplifyDPStep(t,e,i,s,o))},_reducePoints:function(t,e){for(var i=[t[0]],n=1,o=0,s=t.length;n<s;n++)this._sqDist(t[n],t[o])>e&&(i.push(t[n]),o=n);return o<s-1&&i.push(t[s-1]),i},clipSegment:function(t,e,i,n,o){var s,r,a,h=n?this._lastCode:this._getBitCode(t,i),l=this._getBitCode(e,i);for(this._lastCode=l;;){if(!(h|l))return[t,e];if(h&l)return!1;s=h||l,r=this._getEdgeIntersection(t,e,s,i,o),a=this._getBitCode(r,i),s===h?(t=r,h=a):(e=r,l=a)}},_getEdgeIntersection:function(t,e,i,n,s){var r,a,h=e.x-t.x,l=e.y-t.y,u=n.min,c=n.max;return 8&i?(r=t.x+h*(c.y-t.y)/l,a=c.y):4&i?(r=t.x+h*(u.y-t.y)/l,a=u.y):2&i?(r=c.x,a=t.y+l*(c.x-t.x)/h):1&i&&(r=u.x,a=t.y+l*(u.x-t.x)/h),new o.Point(r,a,s)},_getBitCode:function(t,e){var i=0;return t.x<e.min.x?i|=1:t.x>e.max.x&&(i|=2),t.y<e.min.y?i|=4:t.y>e.max.y&&(i|=8),i},_sqDist:function(t,e){var i=e.x-t.x,n=e.y-t.y;return i*i+n*n},_sqClosestPointOnSegment:function(t,e,i,n){var s,r=e.x,a=e.y,h=i.x-r,l=i.y-a,u=h*h+l*l;return u>0&&(s=((t.x-r)*h+(t.y-a)*l)/u,s>1?(r=i.x,a=i.y):s>0&&(r+=h*s,a+=l*s)),h=t.x-r,l=t.y-a,n?h*h+l*l:new o.Point(r,a)}},o.Polyline=o.Path.extend({options:{smoothFactor:1,noClip:!1},initialize:function(t,e){o.setOptions(this,e),this._setLatLngs(t)},getLatLngs:function(){return this._latlngs},setLatLngs:function(t){return this._setLatLngs(t),this.redraw()},isEmpty:function(){return!this._latlngs.length},closestLayerPoint:function(t){for(var e,i,n=1/0,s=null,r=o.LineUtil._sqClosestPointOnSegment,a=0,h=this._parts.length;a<h;a++)for(var l=this._parts[a],u=1,c=l.length;u<c;u++){e=l[u-1],i=l[u];var d=r(t,e,i,!0);d<n&&(n=d,s=r(t,e,i))}return s&&(s.distance=Math.sqrt(n)),s},getCenter:function(){if(!this._map)throw new Error("Must add layer to map before using getCenter()");var t,e,i,n,o,s,r,a=this._rings[0],h=a.length;if(!h)return null;for(t=0,e=0;t<h-1;t++)e+=a[t].distanceTo(a[t+1])/2;if(0===e)return this._map.layerPointToLatLng(a[0]);for(t=0,n=0;t<h-1;t++)if(o=a[t],s=a[t+1],i=o.distanceTo(s),n+=i,n>e)return r=(n-e)/i,this._map.layerPointToLatLng([s.x-r*(s.x-o.x),s.y-r*(s.y-o.y)])},getBounds:function(){return this._bounds},addLatLng:function(t,e){return e=e||this._defaultShape(),t=o.latLng(t),e.push(t),this._bounds.extend(t),this.redraw()},_setLatLngs:function(t){this._bounds=new o.LatLngBounds,this._latlngs=this._convertLatLngs(t)},_defaultShape:function(){return o.Polyline._flat(this._latlngs)?this._latlngs:this._latlngs[0]},_convertLatLngs:function(t){for(var e=[],i=o.Polyline._flat(t),n=0,s=t.length;n<s;n++)i?(e[n]=o.latLng(t[n]),this._bounds.extend(e[n])):e[n]=this._convertLatLngs(t[n]);return e},_project:function(){var t=new o.Bounds;this._rings=[],this._projectLatlngs(this._latlngs,this._rings,t);var e=this._clickTolerance(),i=new o.Point(e,e);this._bounds.isValid()&&t.isValid()&&(t.min._subtract(i),t.max._add(i),this._pxBounds=t)},_projectLatlngs:function(t,e,i){var n,s,r=t[0]instanceof o.LatLng,a=t.length;if(r){for(s=[],n=0;n<a;n++)s[n]=this._map.latLngToLayerPoint(t[n]),i.extend(s[n]);e.push(s)}else for(n=0;n<a;n++)this._projectLatlngs(t[n],e,i)},_clipPoints:function(){var t=this._renderer._bounds;if(this._parts=[],this._pxBounds&&this._pxBounds.intersects(t)){if(this.options.noClip)return void(this._parts=this._rings);var e,i,n,s,r,a,h,l=this._parts;for(e=0,n=0,s=this._rings.length;e<s;e++)for(h=this._rings[e],i=0,r=h.length;i<r-1;i++)a=o.LineUtil.clipSegment(h[i],h[i+1],t,i,!0),a&&(l[n]=l[n]||[],l[n].push(a[0]),a[1]===h[i+1]&&i!==r-2||(l[n].push(a[1]),n++))}},_simplifyPoints:function(){for(var t=this._parts,e=this.options.smoothFactor,i=0,n=t.length;i<n;i++)t[i]=o.LineUtil.simplify(t[i],e)},_update:function(){this._map&&(this._clipPoints(),this._simplifyPoints(),this._updatePath())},_updatePath:function(){this._renderer._updatePoly(this)}}),o.polyline=function(t,e){return new o.Polyline(t,e)},o.Polyline._flat=function(t){return!o.Util.isArray(t[0])||"object"!=typeof t[0][0]&&"undefined"!=typeof t[0][0]},o.PolyUtil={},o.PolyUtil.clipPolygon=function(t,e,i){var n,s,r,a,h,l,u,c,d,_=[1,4,2,8],m=o.LineUtil;for(s=0,u=t.length;s<u;s++)t[s]._code=m._getBitCode(t[s],e);for(a=0;a<4;a++){for(c=_[a],n=[],s=0,u=t.length,r=u-1;s<u;r=s++)h=t[s],l=t[r],h._code&c?l._code&c||(d=m._getEdgeIntersection(l,h,c,e,i),d._code=m._getBitCode(d,e),n.push(d)):(l._code&c&&(d=m._getEdgeIntersection(l,h,c,e,i),d._code=m._getBitCode(d,e),n.push(d)),n.push(h));t=n}return t},o.Polygon=o.Polyline.extend({options:{fill:!0},isEmpty:function(){return!this._latlngs.length||!this._latlngs[0].length},getCenter:function(){if(!this._map)throw new Error("Must add layer to map before using getCenter()");var t,e,i,n,o,s,r,a,h,l=this._rings[0],u=l.length;if(!u)return null;for(s=r=a=0,t=0,e=u-1;t<u;e=t++)i=l[t],n=l[e],o=i.y*n.x-n.y*i.x,r+=(i.x+n.x)*o,a+=(i.y+n.y)*o,s+=3*o;return h=0===s?l[0]:[r/s,a/s],this._map.layerPointToLatLng(h)},_convertLatLngs:function(t){var e=o.Polyline.prototype._convertLatLngs.call(this,t),i=e.length;return i>=2&&e[0]instanceof o.LatLng&&e[0].equals(e[i-1])&&e.pop(),e},_setLatLngs:function(t){o.Polyline.prototype._setLatLngs.call(this,t),o.Polyline._flat(this._latlngs)&&(this._latlngs=[this._latlngs])},_defaultShape:function(){return o.Polyline._flat(this._latlngs[0])?this._latlngs[0]:this._latlngs[0][0]},_clipPoints:function(){var t=this._renderer._bounds,e=this.options.weight,i=new o.Point(e,e);if(t=new o.Bounds(t.min.subtract(i),t.max.add(i)),this._parts=[],this._pxBounds&&this._pxBounds.intersects(t)){if(this.options.noClip)return void(this._parts=this._rings);for(var n,s=0,r=this._rings.length;s<r;s++)n=o.PolyUtil.clipPolygon(this._rings[s],t,!0),n.length&&this._parts.push(n)}},_updatePath:function(){this._renderer._updatePoly(this,!0)}}),o.polygon=function(t,e){return new o.Polygon(t,e)},o.Rectangle=o.Polygon.extend({initialize:function(t,e){o.Polygon.prototype.initialize.call(this,this._boundsToLatLngs(t),e)},setBounds:function(t){return this.setLatLngs(this._boundsToLatLngs(t))},_boundsToLatLngs:function(t){return t=o.latLngBounds(t),[t.getSouthWest(),t.getNorthWest(),t.getNorthEast(),t.getSouthEast()]}}),o.rectangle=function(t,e){return new o.Rectangle(t,e)},o.CircleMarker=o.Path.extend({options:{fill:!0,radius:10},initialize:function(t,e){o.setOptions(this,e),this._latlng=o.latLng(t),this._radius=this.options.radius},setLatLng:function(t){return this._latlng=o.latLng(t),this.redraw(),this.fire("move",{latlng:this._latlng})},getLatLng:function(){return this._latlng},setRadius:function(t){return this.options.radius=this._radius=t,this.redraw()},getRadius:function(){return this._radius},setStyle:function(t){var e=t&&t.radius||this._radius;return o.Path.prototype.setStyle.call(this,t),this.setRadius(e),this},_project:function(){this._point=this._map.latLngToLayerPoint(this._latlng),this._updateBounds()},_updateBounds:function(){var t=this._radius,e=this._radiusY||t,i=this._clickTolerance(),n=[t+i,e+i];this._pxBounds=new o.Bounds(this._point.subtract(n),this._point.add(n))},_update:function(){this._map&&this._updatePath()},_updatePath:function(){this._renderer._updateCircle(this)},_empty:function(){return this._radius&&!this._renderer._bounds.intersects(this._pxBounds)}}),o.circleMarker=function(t,e){return new o.CircleMarker(t,e)},o.Circle=o.CircleMarker.extend({initialize:function(t,e,i){if("number"==typeof e&&(e=o.extend({},i,{radius:e})),o.setOptions(this,e),this._latlng=o.latLng(t),isNaN(this.options.radius))throw new Error("Circle radius cannot be NaN");this._mRadius=this.options.radius},setRadius:function(t){return this._mRadius=t,this.redraw()},getRadius:function(){return this._mRadius},getBounds:function(){var t=[this._radius,this._radiusY||this._radius];return new o.LatLngBounds(this._map.layerPointToLatLng(this._point.subtract(t)),this._map.layerPointToLatLng(this._point.add(t)));
	},setStyle:o.Path.prototype.setStyle,_project:function(){var t=this._latlng.lng,e=this._latlng.lat,i=this._map,n=i.options.crs;if(n.distance===o.CRS.Earth.distance){var s=Math.PI/180,r=this._mRadius/o.CRS.Earth.R/s,a=i.project([e+r,t]),h=i.project([e-r,t]),l=a.add(h).divideBy(2),u=i.unproject(l).lat,c=Math.acos((Math.cos(r*s)-Math.sin(e*s)*Math.sin(u*s))/(Math.cos(e*s)*Math.cos(u*s)))/s;(isNaN(c)||0===c)&&(c=r/Math.cos(Math.PI/180*e)),this._point=l.subtract(i.getPixelOrigin()),this._radius=isNaN(c)?0:Math.max(Math.round(l.x-i.project([u,t-c]).x),1),this._radiusY=Math.max(Math.round(l.y-a.y),1)}else{var d=n.unproject(n.project(this._latlng).subtract([this._mRadius,0]));this._point=i.latLngToLayerPoint(this._latlng),this._radius=this._point.x-i.latLngToLayerPoint(d).x}this._updateBounds()}}),o.circle=function(t,e,i){return new o.Circle(t,e,i)},o.SVG=o.Renderer.extend({getEvents:function(){var t=o.Renderer.prototype.getEvents.call(this);return t.zoomstart=this._onZoomStart,t},_initContainer:function(){this._container=o.SVG.create("svg"),this._container.setAttribute("pointer-events","none"),this._rootGroup=o.SVG.create("g"),this._container.appendChild(this._rootGroup)},_onZoomStart:function(){this._update()},_update:function(){if(!this._map._animatingZoom||!this._bounds){o.Renderer.prototype._update.call(this);var t=this._bounds,e=t.getSize(),i=this._container;this._svgSize&&this._svgSize.equals(e)||(this._svgSize=e,i.setAttribute("width",e.x),i.setAttribute("height",e.y)),o.DomUtil.setPosition(i,t.min),i.setAttribute("viewBox",[t.min.x,t.min.y,e.x,e.y].join(" ")),this.fire("update")}},_initPath:function(t){var e=t._path=o.SVG.create("path");t.options.className&&o.DomUtil.addClass(e,t.options.className),t.options.interactive&&o.DomUtil.addClass(e,"leaflet-interactive"),this._updateStyle(t),this._layers[o.stamp(t)]=t},_addPath:function(t){this._rootGroup.appendChild(t._path),t.addInteractiveTarget(t._path)},_removePath:function(t){o.DomUtil.remove(t._path),t.removeInteractiveTarget(t._path),delete this._layers[o.stamp(t)]},_updatePath:function(t){t._project(),t._update()},_updateStyle:function(t){var e=t._path,i=t.options;e&&(i.stroke?(e.setAttribute("stroke",i.color),e.setAttribute("stroke-opacity",i.opacity),e.setAttribute("stroke-width",i.weight),e.setAttribute("stroke-linecap",i.lineCap),e.setAttribute("stroke-linejoin",i.lineJoin),i.dashArray?e.setAttribute("stroke-dasharray",i.dashArray):e.removeAttribute("stroke-dasharray"),i.dashOffset?e.setAttribute("stroke-dashoffset",i.dashOffset):e.removeAttribute("stroke-dashoffset")):e.setAttribute("stroke","none"),i.fill?(e.setAttribute("fill",i.fillColor||i.color),e.setAttribute("fill-opacity",i.fillOpacity),e.setAttribute("fill-rule",i.fillRule||"evenodd")):e.setAttribute("fill","none"))},_updatePoly:function(t,e){this._setPath(t,o.SVG.pointsToPath(t._parts,e))},_updateCircle:function(t){var e=t._point,i=t._radius,n=t._radiusY||i,o="a"+i+","+n+" 0 1,0 ",s=t._empty()?"M0 0":"M"+(e.x-i)+","+e.y+o+2*i+",0 "+o+2*-i+",0 ";this._setPath(t,s)},_setPath:function(t,e){t._path.setAttribute("d",e)},_bringToFront:function(t){o.DomUtil.toFront(t._path)},_bringToBack:function(t){o.DomUtil.toBack(t._path)}}),o.extend(o.SVG,{create:function(t){return e.createElementNS("http://www.w3.org/2000/svg",t)},pointsToPath:function(t,e){var i,n,s,r,a,h,l="";for(i=0,s=t.length;i<s;i++){for(a=t[i],n=0,r=a.length;n<r;n++)h=a[n],l+=(n?"L":"M")+h.x+" "+h.y;l+=e?o.Browser.svg?"z":"x":""}return l||"M0 0"}}),o.Browser.svg=!(!e.createElementNS||!o.SVG.create("svg").createSVGRect),o.svg=function(t){return o.Browser.svg||o.Browser.vml?new o.SVG(t):null},o.Browser.vml=!o.Browser.svg&&function(){try{var t=e.createElement("div");t.innerHTML='<v:shape adj="1"/>';var i=t.firstChild;return i.style.behavior="url(#default#VML)",i&&"object"==typeof i.adj}catch(t){return!1}}(),o.SVG.include(o.Browser.vml?{_initContainer:function(){this._container=o.DomUtil.create("div","leaflet-vml-container")},_update:function(){this._map._animatingZoom||(o.Renderer.prototype._update.call(this),this.fire("update"))},_initPath:function(t){var e=t._container=o.SVG.create("shape");o.DomUtil.addClass(e,"leaflet-vml-shape "+(this.options.className||"")),e.coordsize="1 1",t._path=o.SVG.create("path"),e.appendChild(t._path),this._updateStyle(t),this._layers[o.stamp(t)]=t},_addPath:function(t){var e=t._container;this._container.appendChild(e),t.options.interactive&&t.addInteractiveTarget(e)},_removePath:function(t){var e=t._container;o.DomUtil.remove(e),t.removeInteractiveTarget(e),delete this._layers[o.stamp(t)]},_updateStyle:function(t){var e=t._stroke,i=t._fill,n=t.options,s=t._container;s.stroked=!!n.stroke,s.filled=!!n.fill,n.stroke?(e||(e=t._stroke=o.SVG.create("stroke")),s.appendChild(e),e.weight=n.weight+"px",e.color=n.color,e.opacity=n.opacity,n.dashArray?e.dashStyle=o.Util.isArray(n.dashArray)?n.dashArray.join(" "):n.dashArray.replace(/( *, *)/g," "):e.dashStyle="",e.endcap=n.lineCap.replace("butt","flat"),e.joinstyle=n.lineJoin):e&&(s.removeChild(e),t._stroke=null),n.fill?(i||(i=t._fill=o.SVG.create("fill")),s.appendChild(i),i.color=n.fillColor||n.color,i.opacity=n.fillOpacity):i&&(s.removeChild(i),t._fill=null)},_updateCircle:function(t){var e=t._point.round(),i=Math.round(t._radius),n=Math.round(t._radiusY||i);this._setPath(t,t._empty()?"M0 0":"AL "+e.x+","+e.y+" "+i+","+n+" 0,23592600")},_setPath:function(t,e){t._path.v=e},_bringToFront:function(t){o.DomUtil.toFront(t._container)},_bringToBack:function(t){o.DomUtil.toBack(t._container)}}:{}),o.Browser.vml&&(o.SVG.create=function(){try{return e.namespaces.add("lvml","urn:schemas-microsoft-com:vml"),function(t){return e.createElement("<lvml:"+t+' class="lvml">')}}catch(t){return function(t){return e.createElement("<"+t+' xmlns="urn:schemas-microsoft.com:vml" class="lvml">')}}}()),o.Canvas=o.Renderer.extend({getEvents:function(){var t=o.Renderer.prototype.getEvents.call(this);return t.viewprereset=this._onViewPreReset,t},_onViewPreReset:function(){this._postponeUpdatePaths=!0},onAdd:function(){o.Renderer.prototype.onAdd.call(this),this._draw()},_initContainer:function(){var t=this._container=e.createElement("canvas");o.DomEvent.on(t,"mousemove",o.Util.throttle(this._onMouseMove,32,this),this).on(t,"click dblclick mousedown mouseup contextmenu",this._onClick,this).on(t,"mouseout",this._handleMouseOut,this),this._ctx=t.getContext("2d")},_updatePaths:function(){if(!this._postponeUpdatePaths){var t;this._redrawBounds=null;for(var e in this._layers)t=this._layers[e],t._update();this._redraw()}},_update:function(){if(!this._map._animatingZoom||!this._bounds){this._drawnLayers={},o.Renderer.prototype._update.call(this);var t=this._bounds,e=this._container,i=t.getSize(),n=o.Browser.retina?2:1;o.DomUtil.setPosition(e,t.min),e.width=n*i.x,e.height=n*i.y,e.style.width=i.x+"px",e.style.height=i.y+"px",o.Browser.retina&&this._ctx.scale(2,2),this._ctx.translate(-t.min.x,-t.min.y),this.fire("update")}},_reset:function(){o.Renderer.prototype._reset.call(this),this._postponeUpdatePaths&&(this._postponeUpdatePaths=!1,this._updatePaths())},_initPath:function(t){this._updateDashArray(t),this._layers[o.stamp(t)]=t;var e=t._order={layer:t,prev:this._drawLast,next:null};this._drawLast&&(this._drawLast.next=e),this._drawLast=e,this._drawFirst=this._drawFirst||this._drawLast},_addPath:function(t){this._requestRedraw(t)},_removePath:function(t){var e=t._order,i=e.next,n=e.prev;i?i.prev=n:this._drawLast=n,n?n.next=i:this._drawFirst=i,delete t._order,delete this._layers[o.stamp(t)],this._requestRedraw(t)},_updatePath:function(t){this._extendRedrawBounds(t),t._project(),t._update(),this._requestRedraw(t)},_updateStyle:function(t){this._updateDashArray(t),this._requestRedraw(t)},_updateDashArray:function(t){if(t.options.dashArray){var e,i=t.options.dashArray.split(","),n=[];for(e=0;e<i.length;e++)n.push(Number(i[e]));t.options._dashArray=n}},_requestRedraw:function(t){this._map&&(this._extendRedrawBounds(t),this._redrawRequest=this._redrawRequest||o.Util.requestAnimFrame(this._redraw,this))},_extendRedrawBounds:function(t){var e=(t.options.weight||0)+1;this._redrawBounds=this._redrawBounds||new o.Bounds,this._redrawBounds.extend(t._pxBounds.min.subtract([e,e])),this._redrawBounds.extend(t._pxBounds.max.add([e,e]))},_redraw:function(){this._redrawRequest=null,this._redrawBounds&&(this._redrawBounds.min._floor(),this._redrawBounds.max._ceil()),this._clear(),this._draw(),this._redrawBounds=null},_clear:function(){var t=this._redrawBounds;if(t){var e=t.getSize();this._ctx.clearRect(t.min.x,t.min.y,e.x,e.y)}else this._ctx.clearRect(0,0,this._container.width,this._container.height)},_draw:function(){var t,e=this._redrawBounds;if(this._ctx.save(),e){var i=e.getSize();this._ctx.beginPath(),this._ctx.rect(e.min.x,e.min.y,i.x,i.y),this._ctx.clip()}this._drawing=!0;for(var n=this._drawFirst;n;n=n.next)t=n.layer,(!e||t._pxBounds&&t._pxBounds.intersects(e))&&t._updatePath();this._drawing=!1,this._ctx.restore()},_updatePoly:function(t,e){if(this._drawing){var i,n,o,s,r=t._parts,a=r.length,h=this._ctx;if(a){for(this._drawnLayers[t._leaflet_id]=t,h.beginPath(),h.setLineDash&&h.setLineDash(t.options&&t.options._dashArray||[]),i=0;i<a;i++){for(n=0,o=r[i].length;n<o;n++)s=r[i][n],h[n?"lineTo":"moveTo"](s.x,s.y);e&&h.closePath()}this._fillStroke(h,t)}}},_updateCircle:function(t){if(this._drawing&&!t._empty()){var e=t._point,i=this._ctx,n=t._radius,o=(t._radiusY||n)/n;this._drawnLayers[t._leaflet_id]=t,1!==o&&(i.save(),i.scale(1,o)),i.beginPath(),i.arc(e.x,e.y/o,n,0,2*Math.PI,!1),1!==o&&i.restore(),this._fillStroke(i,t)}},_fillStroke:function(t,e){var i=e.options;i.fill&&(t.globalAlpha=i.fillOpacity,t.fillStyle=i.fillColor||i.color,t.fill(i.fillRule||"evenodd")),i.stroke&&0!==i.weight&&(t.globalAlpha=i.opacity,t.lineWidth=i.weight,t.strokeStyle=i.color,t.lineCap=i.lineCap,t.lineJoin=i.lineJoin,t.stroke())},_onClick:function(t){for(var e,i,n=this._map.mouseEventToLayerPoint(t),s=this._drawFirst;s;s=s.next)e=s.layer,e.options.interactive&&e._containsPoint(n)&&!this._map._draggableMoved(e)&&(i=e);i&&(o.DomEvent._fakeStop(t),this._fireEvent([i],t))},_onMouseMove:function(t){if(this._map&&!this._map.dragging.moving()&&!this._map._animatingZoom){var e=this._map.mouseEventToLayerPoint(t);this._handleMouseHover(t,e)}},_handleMouseOut:function(t){var e=this._hoveredLayer;e&&(o.DomUtil.removeClass(this._container,"leaflet-interactive"),this._fireEvent([e],t,"mouseout"),this._hoveredLayer=null)},_handleMouseHover:function(t,e){for(var i,n,s=this._drawFirst;s;s=s.next)i=s.layer,i.options.interactive&&i._containsPoint(e)&&(n=i);n!==this._hoveredLayer&&(this._handleMouseOut(t),n&&(o.DomUtil.addClass(this._container,"leaflet-interactive"),this._fireEvent([n],t,"mouseover"),this._hoveredLayer=n)),this._hoveredLayer&&this._fireEvent([this._hoveredLayer],t)},_fireEvent:function(t,e,i){this._map._fireDOMEvent(e,i||e.type,t)},_bringToFront:function(t){var e=t._order,i=e.next,n=e.prev;i&&(i.prev=n,n?n.next=i:i&&(this._drawFirst=i),e.prev=this._drawLast,this._drawLast.next=e,e.next=null,this._drawLast=e,this._requestRedraw(t))},_bringToBack:function(t){var e=t._order,i=e.next,n=e.prev;n&&(n.next=i,i?i.prev=n:n&&(this._drawLast=n),e.prev=null,e.next=this._drawFirst,this._drawFirst.prev=e,this._drawFirst=e,this._requestRedraw(t))}}),o.Browser.canvas=function(){return!!e.createElement("canvas").getContext}(),o.canvas=function(t){return o.Browser.canvas?new o.Canvas(t):null},o.Polyline.prototype._containsPoint=function(t,e){var i,n,s,r,a,h,l=this._clickTolerance();if(!this._pxBounds.contains(t))return!1;for(i=0,r=this._parts.length;i<r;i++)for(h=this._parts[i],n=0,a=h.length,s=a-1;n<a;s=n++)if((e||0!==n)&&o.LineUtil.pointToSegmentDistance(t,h[s],h[n])<=l)return!0;return!1},o.Polygon.prototype._containsPoint=function(t){var e,i,n,s,r,a,h,l,u=!1;if(!this._pxBounds.contains(t))return!1;for(s=0,h=this._parts.length;s<h;s++)for(e=this._parts[s],r=0,l=e.length,a=l-1;r<l;a=r++)i=e[r],n=e[a],i.y>t.y!=n.y>t.y&&t.x<(n.x-i.x)*(t.y-i.y)/(n.y-i.y)+i.x&&(u=!u);return u||o.Polyline.prototype._containsPoint.call(this,t,!0)},o.CircleMarker.prototype._containsPoint=function(t){return t.distanceTo(this._point)<=this._radius+this._clickTolerance()},o.GeoJSON=o.FeatureGroup.extend({initialize:function(t,e){o.setOptions(this,e),this._layers={},t&&this.addData(t)},addData:function(t){var e,i,n,s=o.Util.isArray(t)?t:t.features;if(s){for(e=0,i=s.length;e<i;e++)n=s[e],(n.geometries||n.geometry||n.features||n.coordinates)&&this.addData(n);return this}var r=this.options;if(r.filter&&!r.filter(t))return this;var a=o.GeoJSON.geometryToLayer(t,r);return a?(a.feature=o.GeoJSON.asFeature(t),a.defaultOptions=a.options,this.resetStyle(a),r.onEachFeature&&r.onEachFeature(t,a),this.addLayer(a)):this},resetStyle:function(t){return t.options=o.Util.extend({},t.defaultOptions),this._setLayerStyle(t,this.options.style),this},setStyle:function(t){return this.eachLayer(function(e){this._setLayerStyle(e,t)},this)},_setLayerStyle:function(t,e){"function"==typeof e&&(e=e(t.feature)),t.setStyle&&t.setStyle(e)}}),o.extend(o.GeoJSON,{geometryToLayer:function(t,e){var i,n,s,r,a="Feature"===t.type?t.geometry:t,h=a?a.coordinates:null,l=[],u=e&&e.pointToLayer,c=e&&e.coordsToLatLng||this.coordsToLatLng;if(!h&&!a)return null;switch(a.type){case"Point":return i=c(h),u?u(t,i):new o.Marker(i);case"MultiPoint":for(s=0,r=h.length;s<r;s++)i=c(h[s]),l.push(u?u(t,i):new o.Marker(i));return new o.FeatureGroup(l);case"LineString":case"MultiLineString":return n=this.coordsToLatLngs(h,"LineString"===a.type?0:1,c),new o.Polyline(n,e);case"Polygon":case"MultiPolygon":return n=this.coordsToLatLngs(h,"Polygon"===a.type?1:2,c),new o.Polygon(n,e);case"GeometryCollection":for(s=0,r=a.geometries.length;s<r;s++){var d=this.geometryToLayer({geometry:a.geometries[s],type:"Feature",properties:t.properties},e);d&&l.push(d)}return new o.FeatureGroup(l);default:throw new Error("Invalid GeoJSON object.")}},coordsToLatLng:function(t){return new o.LatLng(t[1],t[0],t[2])},coordsToLatLngs:function(t,e,i){for(var n,o=[],s=0,r=t.length;s<r;s++)n=e?this.coordsToLatLngs(t[s],e-1,i):(i||this.coordsToLatLng)(t[s]),o.push(n);return o},latLngToCoords:function(t){return t.alt!==i?[t.lng,t.lat,t.alt]:[t.lng,t.lat]},latLngsToCoords:function(t,e,i){for(var n=[],s=0,r=t.length;s<r;s++)n.push(e?o.GeoJSON.latLngsToCoords(t[s],e-1,i):o.GeoJSON.latLngToCoords(t[s]));return!e&&i&&n.push(n[0]),n},getFeature:function(t,e){return t.feature?o.extend({},t.feature,{geometry:e}):o.GeoJSON.asFeature(e)},asFeature:function(t){return"Feature"===t.type||"FeatureCollection"===t.type?t:{type:"Feature",properties:{},geometry:t}}});var a={toGeoJSON:function(){return o.GeoJSON.getFeature(this,{type:"Point",coordinates:o.GeoJSON.latLngToCoords(this.getLatLng())})}};o.Marker.include(a),o.Circle.include(a),o.CircleMarker.include(a),o.Polyline.prototype.toGeoJSON=function(){var t=!o.Polyline._flat(this._latlngs),e=o.GeoJSON.latLngsToCoords(this._latlngs,t?1:0);return o.GeoJSON.getFeature(this,{type:(t?"Multi":"")+"LineString",coordinates:e})},o.Polygon.prototype.toGeoJSON=function(){var t=!o.Polyline._flat(this._latlngs),e=t&&!o.Polyline._flat(this._latlngs[0]),i=o.GeoJSON.latLngsToCoords(this._latlngs,e?2:t?1:0,!0);return t||(i=[i]),o.GeoJSON.getFeature(this,{type:(e?"Multi":"")+"Polygon",coordinates:i})},o.LayerGroup.include({toMultiPoint:function(){var t=[];return this.eachLayer(function(e){t.push(e.toGeoJSON().geometry.coordinates)}),o.GeoJSON.getFeature(this,{type:"MultiPoint",coordinates:t})},toGeoJSON:function(){var t=this.feature&&this.feature.geometry&&this.feature.geometry.type;if("MultiPoint"===t)return this.toMultiPoint();var e="GeometryCollection"===t,i=[];return this.eachLayer(function(t){if(t.toGeoJSON){var n=t.toGeoJSON();i.push(e?n.geometry:o.GeoJSON.asFeature(n))}}),e?o.GeoJSON.getFeature(this,{geometries:i,type:"GeometryCollection"}):{type:"FeatureCollection",features:i}}}),o.geoJSON=function(t,e){return new o.GeoJSON(t,e)},o.geoJson=o.geoJSON,o.Draggable=o.Evented.extend({options:{clickTolerance:3},statics:{START:o.Browser.touch?["touchstart","mousedown"]:["mousedown"],END:{mousedown:"mouseup",touchstart:"touchend",pointerdown:"touchend",MSPointerDown:"touchend"},MOVE:{mousedown:"mousemove",touchstart:"touchmove",pointerdown:"touchmove",MSPointerDown:"touchmove"}},initialize:function(t,e,i){this._element=t,this._dragStartTarget=e||t,this._preventOutline=i},enable:function(){this._enabled||(o.DomEvent.on(this._dragStartTarget,o.Draggable.START.join(" "),this._onDown,this),this._enabled=!0)},disable:function(){this._enabled&&(o.Draggable._dragging===this&&this.finishDrag(),o.DomEvent.off(this._dragStartTarget,o.Draggable.START.join(" "),this._onDown,this),this._enabled=!1,this._moved=!1)},_onDown:function(t){if(!t._simulated&&this._enabled&&(this._moved=!1,!o.DomUtil.hasClass(this._element,"leaflet-zoom-anim")&&!(o.Draggable._dragging||t.shiftKey||1!==t.which&&1!==t.button&&!t.touches||(o.Draggable._dragging=this,this._preventOutline&&o.DomUtil.preventOutline(this._element),o.DomUtil.disableImageDrag(),o.DomUtil.disableTextSelection(),this._moving)))){this.fire("down");var i=t.touches?t.touches[0]:t;this._startPoint=new o.Point(i.clientX,i.clientY),o.DomEvent.on(e,o.Draggable.MOVE[t.type],this._onMove,this).on(e,o.Draggable.END[t.type],this._onUp,this)}},_onMove:function(i){if(!i._simulated&&this._enabled){if(i.touches&&i.touches.length>1)return void(this._moved=!0);var n=i.touches&&1===i.touches.length?i.touches[0]:i,s=new o.Point(n.clientX,n.clientY),r=s.subtract(this._startPoint);(r.x||r.y)&&(Math.abs(r.x)+Math.abs(r.y)<this.options.clickTolerance||(o.DomEvent.preventDefault(i),this._moved||(this.fire("dragstart"),this._moved=!0,this._startPos=o.DomUtil.getPosition(this._element).subtract(r),o.DomUtil.addClass(e.body,"leaflet-dragging"),this._lastTarget=i.target||i.srcElement,t.SVGElementInstance&&this._lastTarget instanceof SVGElementInstance&&(this._lastTarget=this._lastTarget.correspondingUseElement),o.DomUtil.addClass(this._lastTarget,"leaflet-drag-target")),this._newPos=this._startPos.add(r),this._moving=!0,o.Util.cancelAnimFrame(this._animRequest),this._lastEvent=i,this._animRequest=o.Util.requestAnimFrame(this._updatePosition,this,!0)))}},_updatePosition:function(){var t={originalEvent:this._lastEvent};this.fire("predrag",t),o.DomUtil.setPosition(this._element,this._newPos),this.fire("drag",t)},_onUp:function(t){!t._simulated&&this._enabled&&this.finishDrag()},finishDrag:function(){o.DomUtil.removeClass(e.body,"leaflet-dragging"),this._lastTarget&&(o.DomUtil.removeClass(this._lastTarget,"leaflet-drag-target"),this._lastTarget=null);for(var t in o.Draggable.MOVE)o.DomEvent.off(e,o.Draggable.MOVE[t],this._onMove,this).off(e,o.Draggable.END[t],this._onUp,this);o.DomUtil.enableImageDrag(),o.DomUtil.enableTextSelection(),this._moved&&this._moving&&(o.Util.cancelAnimFrame(this._animRequest),this.fire("dragend",{distance:this._newPos.distanceTo(this._startPos)})),this._moving=!1,o.Draggable._dragging=!1}}),o.Handler=o.Class.extend({initialize:function(t){this._map=t},enable:function(){return this._enabled?this:(this._enabled=!0,this.addHooks(),this)},disable:function(){return this._enabled?(this._enabled=!1,this.removeHooks(),this):this},enabled:function(){return!!this._enabled}}),o.Map.mergeOptions({dragging:!0,inertia:!o.Browser.android23,inertiaDeceleration:3400,inertiaMaxSpeed:1/0,easeLinearity:.2,worldCopyJump:!1,maxBoundsViscosity:0}),o.Map.Drag=o.Handler.extend({addHooks:function(){if(!this._draggable){var t=this._map;this._draggable=new o.Draggable(t._mapPane,t._container),this._draggable.on({down:this._onDown,dragstart:this._onDragStart,drag:this._onDrag,dragend:this._onDragEnd},this),this._draggable.on("predrag",this._onPreDragLimit,this),t.options.worldCopyJump&&(this._draggable.on("predrag",this._onPreDragWrap,this),t.on("zoomend",this._onZoomEnd,this),t.whenReady(this._onZoomEnd,this))}o.DomUtil.addClass(this._map._container,"leaflet-grab leaflet-touch-drag"),this._draggable.enable(),this._positions=[],this._times=[]},removeHooks:function(){o.DomUtil.removeClass(this._map._container,"leaflet-grab"),o.DomUtil.removeClass(this._map._container,"leaflet-touch-drag"),this._draggable.disable()},moved:function(){return this._draggable&&this._draggable._moved},moving:function(){return this._draggable&&this._draggable._moving},_onDown:function(){this._map._stop()},_onDragStart:function(){var t=this._map;if(this._map.options.maxBounds&&this._map.options.maxBoundsViscosity){var e=o.latLngBounds(this._map.options.maxBounds);this._offsetLimit=o.bounds(this._map.latLngToContainerPoint(e.getNorthWest()).multiplyBy(-1),this._map.latLngToContainerPoint(e.getSouthEast()).multiplyBy(-1).add(this._map.getSize())),this._viscosity=Math.min(1,Math.max(0,this._map.options.maxBoundsViscosity))}else this._offsetLimit=null;t.fire("movestart").fire("dragstart"),t.options.inertia&&(this._positions=[],this._times=[])},_onDrag:function(t){if(this._map.options.inertia){var e=this._lastTime=+new Date,i=this._lastPos=this._draggable._absPos||this._draggable._newPos;this._positions.push(i),this._times.push(e),e-this._times[0]>50&&(this._positions.shift(),this._times.shift())}this._map.fire("move",t).fire("drag",t)},_onZoomEnd:function(){var t=this._map.getSize().divideBy(2),e=this._map.latLngToLayerPoint([0,0]);this._initialWorldOffset=e.subtract(t).x,this._worldWidth=this._map.getPixelWorldBounds().getSize().x},_viscousLimit:function(t,e){return t-(t-e)*this._viscosity},_onPreDragLimit:function(){if(this._viscosity&&this._offsetLimit){var t=this._draggable._newPos.subtract(this._draggable._startPos),e=this._offsetLimit;t.x<e.min.x&&(t.x=this._viscousLimit(t.x,e.min.x)),t.y<e.min.y&&(t.y=this._viscousLimit(t.y,e.min.y)),t.x>e.max.x&&(t.x=this._viscousLimit(t.x,e.max.x)),t.y>e.max.y&&(t.y=this._viscousLimit(t.y,e.max.y)),this._draggable._newPos=this._draggable._startPos.add(t)}},_onPreDragWrap:function(){var t=this._worldWidth,e=Math.round(t/2),i=this._initialWorldOffset,n=this._draggable._newPos.x,o=(n-e+i)%t+e-i,s=(n+e+i)%t-e-i,r=Math.abs(o+i)<Math.abs(s+i)?o:s;this._draggable._absPos=this._draggable._newPos.clone(),this._draggable._newPos.x=r},_onDragEnd:function(t){var e=this._map,i=e.options,n=!i.inertia||this._times.length<2;if(e.fire("dragend",t),n)e.fire("moveend");else{var s=this._lastPos.subtract(this._positions[0]),r=(this._lastTime-this._times[0])/1e3,a=i.easeLinearity,h=s.multiplyBy(a/r),l=h.distanceTo([0,0]),u=Math.min(i.inertiaMaxSpeed,l),c=h.multiplyBy(u/l),d=u/(i.inertiaDeceleration*a),_=c.multiplyBy(-d/2).round();_.x||_.y?(_=e._limitOffset(_,e.options.maxBounds),o.Util.requestAnimFrame(function(){e.panBy(_,{duration:d,easeLinearity:a,noMoveStart:!0,animate:!0})})):e.fire("moveend")}}}),o.Map.addInitHook("addHandler","dragging",o.Map.Drag),o.Map.mergeOptions({doubleClickZoom:!0}),o.Map.DoubleClickZoom=o.Handler.extend({addHooks:function(){this._map.on("dblclick",this._onDoubleClick,this)},removeHooks:function(){this._map.off("dblclick",this._onDoubleClick,this)},_onDoubleClick:function(t){var e=this._map,i=e.getZoom(),n=e.options.zoomDelta,o=t.originalEvent.shiftKey?i-n:i+n;"center"===e.options.doubleClickZoom?e.setZoom(o):e.setZoomAround(t.containerPoint,o)}}),o.Map.addInitHook("addHandler","doubleClickZoom",o.Map.DoubleClickZoom),o.Map.mergeOptions({scrollWheelZoom:!0,wheelDebounceTime:40,wheelPxPerZoomLevel:60}),o.Map.ScrollWheelZoom=o.Handler.extend({addHooks:function(){o.DomEvent.on(this._map._container,"mousewheel",this._onWheelScroll,this),this._delta=0},removeHooks:function(){o.DomEvent.off(this._map._container,"mousewheel",this._onWheelScroll,this)},_onWheelScroll:function(t){var e=o.DomEvent.getWheelDelta(t),i=this._map.options.wheelDebounceTime;this._delta+=e,this._lastMousePos=this._map.mouseEventToContainerPoint(t),this._startTime||(this._startTime=+new Date);var n=Math.max(i-(+new Date-this._startTime),0);clearTimeout(this._timer),this._timer=setTimeout(o.bind(this._performZoom,this),n),o.DomEvent.stop(t)},_performZoom:function(){var t=this._map,e=t.getZoom(),i=this._map.options.zoomSnap||0;t._stop();var n=this._delta/(4*this._map.options.wheelPxPerZoomLevel),o=4*Math.log(2/(1+Math.exp(-Math.abs(n))))/Math.LN2,s=i?Math.ceil(o/i)*i:o,r=t._limitZoom(e+(this._delta>0?s:-s))-e;this._delta=0,this._startTime=null,r&&("center"===t.options.scrollWheelZoom?t.setZoom(e+r):t.setZoomAround(this._lastMousePos,e+r))}}),o.Map.addInitHook("addHandler","scrollWheelZoom",o.Map.ScrollWheelZoom),o.extend(o.DomEvent,{_touchstart:o.Browser.msPointer?"MSPointerDown":o.Browser.pointer?"pointerdown":"touchstart",_touchend:o.Browser.msPointer?"MSPointerUp":o.Browser.pointer?"pointerup":"touchend",addDoubleTapListener:function(t,e,i){function n(t){var e;if(o.Browser.pointer){if(!o.Browser.edge||"mouse"===t.pointerType)return;e=o.DomEvent._pointersCount}else e=t.touches.length;if(!(e>1)){var i=Date.now(),n=i-(r||i);a=t.touches?t.touches[0]:t,h=n>0&&n<=l,r=i}}function s(t){if(h&&!a.cancelBubble){if(o.Browser.pointer){if(!o.Browser.edge||"mouse"===t.pointerType)return;var i,n,s={};for(n in a)i=a[n],s[n]=i&&i.bind?i.bind(a):i;a=s}a.type="dblclick",e(a),r=null}}var r,a,h=!1,l=250,u="_leaflet_",c=this._touchstart,d=this._touchend;return t[u+c+i]=n,t[u+d+i]=s,t[u+"dblclick"+i]=e,t.addEventListener(c,n,!1),t.addEventListener(d,s,!1),t.addEventListener("dblclick",e,!1),this},removeDoubleTapListener:function(t,e){var i="_leaflet_",n=t[i+this._touchstart+e],s=t[i+this._touchend+e],r=t[i+"dblclick"+e];return t.removeEventListener(this._touchstart,n,!1),t.removeEventListener(this._touchend,s,!1),o.Browser.edge||t.removeEventListener("dblclick",r,!1),this}}),o.extend(o.DomEvent,{POINTER_DOWN:o.Browser.msPointer?"MSPointerDown":"pointerdown",POINTER_MOVE:o.Browser.msPointer?"MSPointerMove":"pointermove",POINTER_UP:o.Browser.msPointer?"MSPointerUp":"pointerup",POINTER_CANCEL:o.Browser.msPointer?"MSPointerCancel":"pointercancel",TAG_WHITE_LIST:["INPUT","SELECT","OPTION"],_pointers:{},_pointersCount:0,addPointerListener:function(t,e,i,n){return"touchstart"===e?this._addPointerStart(t,i,n):"touchmove"===e?this._addPointerMove(t,i,n):"touchend"===e&&this._addPointerEnd(t,i,n),this},removePointerListener:function(t,e,i){var n=t["_leaflet_"+e+i];return"touchstart"===e?t.removeEventListener(this.POINTER_DOWN,n,!1):"touchmove"===e?t.removeEventListener(this.POINTER_MOVE,n,!1):"touchend"===e&&(t.removeEventListener(this.POINTER_UP,n,!1),t.removeEventListener(this.POINTER_CANCEL,n,!1)),this},_addPointerStart:function(t,i,n){var s=o.bind(function(t){if("mouse"!==t.pointerType&&t.MSPOINTER_TYPE_MOUSE&&t.pointerType!==t.MSPOINTER_TYPE_MOUSE){if(!(this.TAG_WHITE_LIST.indexOf(t.target.tagName)<0))return;o.DomEvent.preventDefault(t)}this._handlePointer(t,i)},this);if(t["_leaflet_touchstart"+n]=s,t.addEventListener(this.POINTER_DOWN,s,!1),!this._pointerDocListener){var r=o.bind(this._globalPointerUp,this);e.documentElement.addEventListener(this.POINTER_DOWN,o.bind(this._globalPointerDown,this),!0),e.documentElement.addEventListener(this.POINTER_MOVE,o.bind(this._globalPointerMove,this),!0),e.documentElement.addEventListener(this.POINTER_UP,r,!0),e.documentElement.addEventListener(this.POINTER_CANCEL,r,!0),this._pointerDocListener=!0}},_globalPointerDown:function(t){this._pointers[t.pointerId]=t,this._pointersCount++},_globalPointerMove:function(t){this._pointers[t.pointerId]&&(this._pointers[t.pointerId]=t)},_globalPointerUp:function(t){delete this._pointers[t.pointerId],this._pointersCount--},_handlePointer:function(t,e){t.touches=[];for(var i in this._pointers)t.touches.push(this._pointers[i]);t.changedTouches=[t],e(t)},_addPointerMove:function(t,e,i){var n=o.bind(function(t){(t.pointerType!==t.MSPOINTER_TYPE_MOUSE&&"mouse"!==t.pointerType||0!==t.buttons)&&this._handlePointer(t,e)},this);t["_leaflet_touchmove"+i]=n,t.addEventListener(this.POINTER_MOVE,n,!1)},_addPointerEnd:function(t,e,i){var n=o.bind(function(t){this._handlePointer(t,e)},this);t["_leaflet_touchend"+i]=n,t.addEventListener(this.POINTER_UP,n,!1),t.addEventListener(this.POINTER_CANCEL,n,!1)}}),o.Map.mergeOptions({touchZoom:o.Browser.touch&&!o.Browser.android23,bounceAtZoomLimits:!0}),o.Map.TouchZoom=o.Handler.extend({addHooks:function(){o.DomUtil.addClass(this._map._container,"leaflet-touch-zoom"),o.DomEvent.on(this._map._container,"touchstart",this._onTouchStart,this)},removeHooks:function(){o.DomUtil.removeClass(this._map._container,"leaflet-touch-zoom"),o.DomEvent.off(this._map._container,"touchstart",this._onTouchStart,this)},_onTouchStart:function(t){var i=this._map;if(t.touches&&2===t.touches.length&&!i._animatingZoom&&!this._zooming){var n=i.mouseEventToContainerPoint(t.touches[0]),s=i.mouseEventToContainerPoint(t.touches[1]);this._centerPoint=i.getSize()._divideBy(2),this._startLatLng=i.containerPointToLatLng(this._centerPoint),"center"!==i.options.touchZoom&&(this._pinchStartLatLng=i.containerPointToLatLng(n.add(s)._divideBy(2))),this._startDist=n.distanceTo(s),this._startZoom=i.getZoom(),this._moved=!1,this._zooming=!0,i._stop(),o.DomEvent.on(e,"touchmove",this._onTouchMove,this).on(e,"touchend",this._onTouchEnd,this),o.DomEvent.preventDefault(t)}},_onTouchMove:function(t){if(t.touches&&2===t.touches.length&&this._zooming){var e=this._map,i=e.mouseEventToContainerPoint(t.touches[0]),n=e.mouseEventToContainerPoint(t.touches[1]),s=i.distanceTo(n)/this._startDist;if(this._zoom=e.getScaleZoom(s,this._startZoom),!e.options.bounceAtZoomLimits&&(this._zoom<e.getMinZoom()&&s<1||this._zoom>e.getMaxZoom()&&s>1)&&(this._zoom=e._limitZoom(this._zoom)),"center"===e.options.touchZoom){if(this._center=this._startLatLng,1===s)return}else{var r=i._add(n)._divideBy(2)._subtract(this._centerPoint);if(1===s&&0===r.x&&0===r.y)return;this._center=e.unproject(e.project(this._pinchStartLatLng,this._zoom).subtract(r),this._zoom)}this._moved||(e._moveStart(!0),this._moved=!0),o.Util.cancelAnimFrame(this._animRequest);var a=o.bind(e._move,e,this._center,this._zoom,{pinch:!0,round:!1});this._animRequest=o.Util.requestAnimFrame(a,this,!0),o.DomEvent.preventDefault(t)}},_onTouchEnd:function(){return this._moved&&this._zooming?(this._zooming=!1,o.Util.cancelAnimFrame(this._animRequest),o.DomEvent.off(e,"touchmove",this._onTouchMove).off(e,"touchend",this._onTouchEnd),void(this._map.options.zoomAnimation?this._map._animateZoom(this._center,this._map._limitZoom(this._zoom),!0,this._map.options.zoomSnap):this._map._resetView(this._center,this._map._limitZoom(this._zoom)))):void(this._zooming=!1)}}),o.Map.addInitHook("addHandler","touchZoom",o.Map.TouchZoom),o.Map.mergeOptions({tap:!0,tapTolerance:15}),o.Map.Tap=o.Handler.extend({addHooks:function(){o.DomEvent.on(this._map._container,"touchstart",this._onDown,this)},removeHooks:function(){o.DomEvent.off(this._map._container,"touchstart",this._onDown,this)},_onDown:function(t){if(t.touches){if(o.DomEvent.preventDefault(t),this._fireClick=!0,t.touches.length>1)return this._fireClick=!1,void clearTimeout(this._holdTimeout);var i=t.touches[0],n=i.target;this._startPos=this._newPos=new o.Point(i.clientX,i.clientY),n.tagName&&"a"===n.tagName.toLowerCase()&&o.DomUtil.addClass(n,"leaflet-active"),this._holdTimeout=setTimeout(o.bind(function(){this._isTapValid()&&(this._fireClick=!1,this._onUp(),this._simulateEvent("contextmenu",i))},this),1e3),this._simulateEvent("mousedown",i),o.DomEvent.on(e,{touchmove:this._onMove,touchend:this._onUp},this)}},_onUp:function(t){if(clearTimeout(this._holdTimeout),o.DomEvent.off(e,{touchmove:this._onMove,touchend:this._onUp},this),this._fireClick&&t&&t.changedTouches){var i=t.changedTouches[0],n=i.target;n&&n.tagName&&"a"===n.tagName.toLowerCase()&&o.DomUtil.removeClass(n,"leaflet-active"),this._simulateEvent("mouseup",i),this._isTapValid()&&this._simulateEvent("click",i)}},_isTapValid:function(){return this._newPos.distanceTo(this._startPos)<=this._map.options.tapTolerance},_onMove:function(t){var e=t.touches[0];this._newPos=new o.Point(e.clientX,e.clientY),
	this._simulateEvent("mousemove",e)},_simulateEvent:function(i,n){var o=e.createEvent("MouseEvents");o._simulated=!0,n.target._simulatedClick=!0,o.initMouseEvent(i,!0,!0,t,1,n.screenX,n.screenY,n.clientX,n.clientY,!1,!1,!1,!1,0,null),n.target.dispatchEvent(o)}}),o.Browser.touch&&!o.Browser.pointer&&o.Map.addInitHook("addHandler","tap",o.Map.Tap),o.Map.mergeOptions({boxZoom:!0}),o.Map.BoxZoom=o.Handler.extend({initialize:function(t){this._map=t,this._container=t._container,this._pane=t._panes.overlayPane},addHooks:function(){o.DomEvent.on(this._container,"mousedown",this._onMouseDown,this)},removeHooks:function(){o.DomEvent.off(this._container,"mousedown",this._onMouseDown,this)},moved:function(){return this._moved},_resetState:function(){this._moved=!1},_onMouseDown:function(t){return!(!t.shiftKey||1!==t.which&&1!==t.button)&&(this._resetState(),o.DomUtil.disableTextSelection(),o.DomUtil.disableImageDrag(),this._startPoint=this._map.mouseEventToContainerPoint(t),void o.DomEvent.on(e,{contextmenu:o.DomEvent.stop,mousemove:this._onMouseMove,mouseup:this._onMouseUp,keydown:this._onKeyDown},this))},_onMouseMove:function(t){this._moved||(this._moved=!0,this._box=o.DomUtil.create("div","leaflet-zoom-box",this._container),o.DomUtil.addClass(this._container,"leaflet-crosshair"),this._map.fire("boxzoomstart")),this._point=this._map.mouseEventToContainerPoint(t);var e=new o.Bounds(this._point,this._startPoint),i=e.getSize();o.DomUtil.setPosition(this._box,e.min),this._box.style.width=i.x+"px",this._box.style.height=i.y+"px"},_finish:function(){this._moved&&(o.DomUtil.remove(this._box),o.DomUtil.removeClass(this._container,"leaflet-crosshair")),o.DomUtil.enableTextSelection(),o.DomUtil.enableImageDrag(),o.DomEvent.off(e,{contextmenu:o.DomEvent.stop,mousemove:this._onMouseMove,mouseup:this._onMouseUp,keydown:this._onKeyDown},this)},_onMouseUp:function(t){if((1===t.which||1===t.button)&&(this._finish(),this._moved)){setTimeout(o.bind(this._resetState,this),0);var e=new o.LatLngBounds(this._map.containerPointToLatLng(this._startPoint),this._map.containerPointToLatLng(this._point));this._map.fitBounds(e).fire("boxzoomend",{boxZoomBounds:e})}},_onKeyDown:function(t){27===t.keyCode&&this._finish()}}),o.Map.addInitHook("addHandler","boxZoom",o.Map.BoxZoom),o.Map.mergeOptions({keyboard:!0,keyboardPanDelta:80}),o.Map.Keyboard=o.Handler.extend({keyCodes:{left:[37],right:[39],down:[40],up:[38],zoomIn:[187,107,61,171],zoomOut:[189,109,54,173]},initialize:function(t){this._map=t,this._setPanDelta(t.options.keyboardPanDelta),this._setZoomDelta(t.options.zoomDelta)},addHooks:function(){var t=this._map._container;t.tabIndex<=0&&(t.tabIndex="0"),o.DomEvent.on(t,{focus:this._onFocus,blur:this._onBlur,mousedown:this._onMouseDown},this),this._map.on({focus:this._addHooks,blur:this._removeHooks},this)},removeHooks:function(){this._removeHooks(),o.DomEvent.off(this._map._container,{focus:this._onFocus,blur:this._onBlur,mousedown:this._onMouseDown},this),this._map.off({focus:this._addHooks,blur:this._removeHooks},this)},_onMouseDown:function(){if(!this._focused){var i=e.body,n=e.documentElement,o=i.scrollTop||n.scrollTop,s=i.scrollLeft||n.scrollLeft;this._map._container.focus(),t.scrollTo(s,o)}},_onFocus:function(){this._focused=!0,this._map.fire("focus")},_onBlur:function(){this._focused=!1,this._map.fire("blur")},_setPanDelta:function(t){var e,i,n=this._panKeys={},o=this.keyCodes;for(e=0,i=o.left.length;e<i;e++)n[o.left[e]]=[-1*t,0];for(e=0,i=o.right.length;e<i;e++)n[o.right[e]]=[t,0];for(e=0,i=o.down.length;e<i;e++)n[o.down[e]]=[0,t];for(e=0,i=o.up.length;e<i;e++)n[o.up[e]]=[0,-1*t]},_setZoomDelta:function(t){var e,i,n=this._zoomKeys={},o=this.keyCodes;for(e=0,i=o.zoomIn.length;e<i;e++)n[o.zoomIn[e]]=t;for(e=0,i=o.zoomOut.length;e<i;e++)n[o.zoomOut[e]]=-t},_addHooks:function(){o.DomEvent.on(e,"keydown",this._onKeyDown,this)},_removeHooks:function(){o.DomEvent.off(e,"keydown",this._onKeyDown,this)},_onKeyDown:function(t){if(!(t.altKey||t.ctrlKey||t.metaKey)){var e,i=t.keyCode,n=this._map;if(i in this._panKeys){if(n._panAnim&&n._panAnim._inProgress)return;e=this._panKeys[i],t.shiftKey&&(e=o.point(e).multiplyBy(3)),n.panBy(e),n.options.maxBounds&&n.panInsideBounds(n.options.maxBounds)}else if(i in this._zoomKeys)n.setZoom(n.getZoom()+(t.shiftKey?3:1)*this._zoomKeys[i]);else{if(27!==i)return;n.closePopup()}o.DomEvent.stop(t)}}}),o.Map.addInitHook("addHandler","keyboard",o.Map.Keyboard),o.Handler.MarkerDrag=o.Handler.extend({initialize:function(t){this._marker=t},addHooks:function(){var t=this._marker._icon;this._draggable||(this._draggable=new o.Draggable(t,t,!0)),this._draggable.on({dragstart:this._onDragStart,drag:this._onDrag,dragend:this._onDragEnd},this).enable(),o.DomUtil.addClass(t,"leaflet-marker-draggable")},removeHooks:function(){this._draggable.off({dragstart:this._onDragStart,drag:this._onDrag,dragend:this._onDragEnd},this).disable(),this._marker._icon&&o.DomUtil.removeClass(this._marker._icon,"leaflet-marker-draggable")},moved:function(){return this._draggable&&this._draggable._moved},_onDragStart:function(){this._oldLatLng=this._marker.getLatLng(),this._marker.closePopup().fire("movestart").fire("dragstart")},_onDrag:function(t){var e=this._marker,i=e._shadow,n=o.DomUtil.getPosition(e._icon),s=e._map.layerPointToLatLng(n);i&&o.DomUtil.setPosition(i,n),e._latlng=s,t.latlng=s,t.oldLatLng=this._oldLatLng,e.fire("move",t).fire("drag",t)},_onDragEnd:function(t){delete this._oldLatLng,this._marker.fire("moveend").fire("dragend",t)}}),o.Control=o.Class.extend({options:{position:"topright"},initialize:function(t){o.setOptions(this,t)},getPosition:function(){return this.options.position},setPosition:function(t){var e=this._map;return e&&e.removeControl(this),this.options.position=t,e&&e.addControl(this),this},getContainer:function(){return this._container},addTo:function(t){this.remove(),this._map=t;var e=this._container=this.onAdd(t),i=this.getPosition(),n=t._controlCorners[i];return o.DomUtil.addClass(e,"leaflet-control"),i.indexOf("bottom")!==-1?n.insertBefore(e,n.firstChild):n.appendChild(e),this},remove:function(){return this._map?(o.DomUtil.remove(this._container),this.onRemove&&this.onRemove(this._map),this._map=null,this):this},_refocusOnMap:function(t){this._map&&t&&t.screenX>0&&t.screenY>0&&this._map.getContainer().focus()}}),o.control=function(t){return new o.Control(t)},o.Map.include({addControl:function(t){return t.addTo(this),this},removeControl:function(t){return t.remove(),this},_initControlPos:function(){function t(t,s){var r=i+t+" "+i+s;e[t+s]=o.DomUtil.create("div",r,n)}var e=this._controlCorners={},i="leaflet-",n=this._controlContainer=o.DomUtil.create("div",i+"control-container",this._container);t("top","left"),t("top","right"),t("bottom","left"),t("bottom","right")},_clearControlPos:function(){o.DomUtil.remove(this._controlContainer)}}),o.Control.Zoom=o.Control.extend({options:{position:"topleft",zoomInText:"+",zoomInTitle:"Zoom in",zoomOutText:"-",zoomOutTitle:"Zoom out"},onAdd:function(t){var e="leaflet-control-zoom",i=o.DomUtil.create("div",e+" leaflet-bar"),n=this.options;return this._zoomInButton=this._createButton(n.zoomInText,n.zoomInTitle,e+"-in",i,this._zoomIn),this._zoomOutButton=this._createButton(n.zoomOutText,n.zoomOutTitle,e+"-out",i,this._zoomOut),this._updateDisabled(),t.on("zoomend zoomlevelschange",this._updateDisabled,this),i},onRemove:function(t){t.off("zoomend zoomlevelschange",this._updateDisabled,this)},disable:function(){return this._disabled=!0,this._updateDisabled(),this},enable:function(){return this._disabled=!1,this._updateDisabled(),this},_zoomIn:function(t){!this._disabled&&this._map._zoom<this._map.getMaxZoom()&&this._map.zoomIn(this._map.options.zoomDelta*(t.shiftKey?3:1))},_zoomOut:function(t){!this._disabled&&this._map._zoom>this._map.getMinZoom()&&this._map.zoomOut(this._map.options.zoomDelta*(t.shiftKey?3:1))},_createButton:function(t,e,i,n,s){var r=o.DomUtil.create("a",i,n);return r.innerHTML=t,r.href="#",r.title=e,r.setAttribute("role","button"),r.setAttribute("aria-label",e),o.DomEvent.on(r,"mousedown dblclick",o.DomEvent.stopPropagation).on(r,"click",o.DomEvent.stop).on(r,"click",s,this).on(r,"click",this._refocusOnMap,this),r},_updateDisabled:function(){var t=this._map,e="leaflet-disabled";o.DomUtil.removeClass(this._zoomInButton,e),o.DomUtil.removeClass(this._zoomOutButton,e),(this._disabled||t._zoom===t.getMinZoom())&&o.DomUtil.addClass(this._zoomOutButton,e),(this._disabled||t._zoom===t.getMaxZoom())&&o.DomUtil.addClass(this._zoomInButton,e)}}),o.Map.mergeOptions({zoomControl:!0}),o.Map.addInitHook(function(){this.options.zoomControl&&(this.zoomControl=new o.Control.Zoom,this.addControl(this.zoomControl))}),o.control.zoom=function(t){return new o.Control.Zoom(t)},o.Control.Attribution=o.Control.extend({options:{position:"bottomright",prefix:'<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>'},initialize:function(t){o.setOptions(this,t),this._attributions={}},onAdd:function(t){t.attributionControl=this,this._container=o.DomUtil.create("div","leaflet-control-attribution"),o.DomEvent&&o.DomEvent.disableClickPropagation(this._container);for(var e in t._layers)t._layers[e].getAttribution&&this.addAttribution(t._layers[e].getAttribution());return this._update(),this._container},setPrefix:function(t){return this.options.prefix=t,this._update(),this},addAttribution:function(t){return t?(this._attributions[t]||(this._attributions[t]=0),this._attributions[t]++,this._update(),this):this},removeAttribution:function(t){return t?(this._attributions[t]&&(this._attributions[t]--,this._update()),this):this},_update:function(){if(this._map){var t=[];for(var e in this._attributions)this._attributions[e]&&t.push(e);var i=[];this.options.prefix&&i.push(this.options.prefix),t.length&&i.push(t.join(", ")),this._container.innerHTML=i.join(" | ")}}}),o.Map.mergeOptions({attributionControl:!0}),o.Map.addInitHook(function(){this.options.attributionControl&&(new o.Control.Attribution).addTo(this)}),o.control.attribution=function(t){return new o.Control.Attribution(t)},o.Control.Scale=o.Control.extend({options:{position:"bottomleft",maxWidth:100,metric:!0,imperial:!0},onAdd:function(t){var e="leaflet-control-scale",i=o.DomUtil.create("div",e),n=this.options;return this._addScales(n,e+"-line",i),t.on(n.updateWhenIdle?"moveend":"move",this._update,this),t.whenReady(this._update,this),i},onRemove:function(t){t.off(this.options.updateWhenIdle?"moveend":"move",this._update,this)},_addScales:function(t,e,i){t.metric&&(this._mScale=o.DomUtil.create("div",e,i)),t.imperial&&(this._iScale=o.DomUtil.create("div",e,i))},_update:function(){var t=this._map,e=t.getSize().y/2,i=t.distance(t.containerPointToLatLng([0,e]),t.containerPointToLatLng([this.options.maxWidth,e]));this._updateScales(i)},_updateScales:function(t){this.options.metric&&t&&this._updateMetric(t),this.options.imperial&&t&&this._updateImperial(t)},_updateMetric:function(t){var e=this._getRoundNum(t),i=e<1e3?e+" m":e/1e3+" km";this._updateScale(this._mScale,i,e/t)},_updateImperial:function(t){var e,i,n,o=3.2808399*t;o>5280?(e=o/5280,i=this._getRoundNum(e),this._updateScale(this._iScale,i+" mi",i/e)):(n=this._getRoundNum(o),this._updateScale(this._iScale,n+" ft",n/o))},_updateScale:function(t,e,i){t.style.width=Math.round(this.options.maxWidth*i)+"px",t.innerHTML=e},_getRoundNum:function(t){var e=Math.pow(10,(Math.floor(t)+"").length-1),i=t/e;return i=i>=10?10:i>=5?5:i>=3?3:i>=2?2:1,e*i}}),o.control.scale=function(t){return new o.Control.Scale(t)},o.Control.Layers=o.Control.extend({options:{collapsed:!0,position:"topright",autoZIndex:!0,hideSingleBase:!1,sortLayers:!1,sortFunction:function(t,e,i,n){return i<n?-1:n<i?1:0}},initialize:function(t,e,i){o.setOptions(this,i),this._layers=[],this._lastZIndex=0,this._handlingClick=!1;for(var n in t)this._addLayer(t[n],n);for(n in e)this._addLayer(e[n],n,!0)},onAdd:function(t){return this._initLayout(),this._update(),this._map=t,t.on("zoomend",this._checkDisabledLayers,this),this._container},onRemove:function(){this._map.off("zoomend",this._checkDisabledLayers,this);for(var t=0;t<this._layers.length;t++)this._layers[t].layer.off("add remove",this._onLayerChange,this)},addBaseLayer:function(t,e){return this._addLayer(t,e),this._map?this._update():this},addOverlay:function(t,e){return this._addLayer(t,e,!0),this._map?this._update():this},removeLayer:function(t){t.off("add remove",this._onLayerChange,this);var e=this._getLayer(o.stamp(t));return e&&this._layers.splice(this._layers.indexOf(e),1),this._map?this._update():this},expand:function(){o.DomUtil.addClass(this._container,"leaflet-control-layers-expanded"),this._form.style.height=null;var t=this._map.getSize().y-(this._container.offsetTop+50);return t<this._form.clientHeight?(o.DomUtil.addClass(this._form,"leaflet-control-layers-scrollbar"),this._form.style.height=t+"px"):o.DomUtil.removeClass(this._form,"leaflet-control-layers-scrollbar"),this._checkDisabledLayers(),this},collapse:function(){return o.DomUtil.removeClass(this._container,"leaflet-control-layers-expanded"),this},_initLayout:function(){var t="leaflet-control-layers",e=this._container=o.DomUtil.create("div",t),i=this.options.collapsed;e.setAttribute("aria-haspopup",!0),o.DomEvent.disableClickPropagation(e),o.Browser.touch||o.DomEvent.disableScrollPropagation(e);var n=this._form=o.DomUtil.create("form",t+"-list");i&&(this._map.on("click",this.collapse,this),o.Browser.android||o.DomEvent.on(e,{mouseenter:this.expand,mouseleave:this.collapse},this));var s=this._layersLink=o.DomUtil.create("a",t+"-toggle",e);s.href="#",s.title="Layers",o.Browser.touch?o.DomEvent.on(s,"click",o.DomEvent.stop).on(s,"click",this.expand,this):o.DomEvent.on(s,"focus",this.expand,this),o.DomEvent.on(n,"click",function(){setTimeout(o.bind(this._onInputClick,this),0)},this),i||this.expand(),this._baseLayersList=o.DomUtil.create("div",t+"-base",n),this._separator=o.DomUtil.create("div",t+"-separator",n),this._overlaysList=o.DomUtil.create("div",t+"-overlays",n),e.appendChild(n)},_getLayer:function(t){for(var e=0;e<this._layers.length;e++)if(this._layers[e]&&o.stamp(this._layers[e].layer)===t)return this._layers[e]},_addLayer:function(t,e,i){t.on("add remove",this._onLayerChange,this),this._layers.push({layer:t,name:e,overlay:i}),this.options.sortLayers&&this._layers.sort(o.bind(function(t,e){return this.options.sortFunction(t.layer,e.layer,t.name,e.name)},this)),this.options.autoZIndex&&t.setZIndex&&(this._lastZIndex++,t.setZIndex(this._lastZIndex))},_update:function(){if(!this._container)return this;o.DomUtil.empty(this._baseLayersList),o.DomUtil.empty(this._overlaysList);var t,e,i,n,s=0;for(i=0;i<this._layers.length;i++)n=this._layers[i],this._addItem(n),e=e||n.overlay,t=t||!n.overlay,s+=n.overlay?0:1;return this.options.hideSingleBase&&(t=t&&s>1,this._baseLayersList.style.display=t?"":"none"),this._separator.style.display=e&&t?"":"none",this},_onLayerChange:function(t){this._handlingClick||this._update();var e=this._getLayer(o.stamp(t.target)),i=e.overlay?"add"===t.type?"overlayadd":"overlayremove":"add"===t.type?"baselayerchange":null;i&&this._map.fire(i,e)},_createRadioElement:function(t,i){var n='<input type="radio" class="leaflet-control-layers-selector" name="'+t+'"'+(i?' checked="checked"':"")+"/>",o=e.createElement("div");return o.innerHTML=n,o.firstChild},_addItem:function(t){var i,n=e.createElement("label"),s=this._map.hasLayer(t.layer);t.overlay?(i=e.createElement("input"),i.type="checkbox",i.className="leaflet-control-layers-selector",i.defaultChecked=s):i=this._createRadioElement("leaflet-base-layers",s),i.layerId=o.stamp(t.layer),o.DomEvent.on(i,"click",this._onInputClick,this);var r=e.createElement("span");r.innerHTML=" "+t.name;var a=e.createElement("div");n.appendChild(a),a.appendChild(i),a.appendChild(r);var h=t.overlay?this._overlaysList:this._baseLayersList;return h.appendChild(n),this._checkDisabledLayers(),n},_onInputClick:function(){var t,e,i,n=this._form.getElementsByTagName("input"),o=[],s=[];this._handlingClick=!0;for(var r=n.length-1;r>=0;r--)t=n[r],e=this._getLayer(t.layerId).layer,i=this._map.hasLayer(e),t.checked&&!i?o.push(e):!t.checked&&i&&s.push(e);for(r=0;r<s.length;r++)this._map.removeLayer(s[r]);for(r=0;r<o.length;r++)this._map.addLayer(o[r]);this._handlingClick=!1,this._refocusOnMap()},_checkDisabledLayers:function(){for(var t,e,n=this._form.getElementsByTagName("input"),o=this._map.getZoom(),s=n.length-1;s>=0;s--)t=n[s],e=this._getLayer(t.layerId).layer,t.disabled=e.options.minZoom!==i&&o<e.options.minZoom||e.options.maxZoom!==i&&o>e.options.maxZoom},_expand:function(){return this.expand()},_collapse:function(){return this.collapse()}}),o.control.layers=function(t,e,i){return new o.Control.Layers(t,e,i)}}(window,document);

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;

	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(8);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(13)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../css-loader/index.js?sourceMap&importLoaders=1!./leaflet.css", function() {
				var newContent = require("!!../../css-loader/index.js?sourceMap&importLoaders=1!./leaflet.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(9)();
	// imports


	// module
	exports.push([module.id, "/* required styles */\r\n\r\n.leaflet-pane,\r\n.leaflet-tile,\r\n.leaflet-marker-icon,\r\n.leaflet-marker-shadow,\r\n.leaflet-tile-container,\r\n.leaflet-pane > svg,\r\n.leaflet-pane > canvas,\r\n.leaflet-zoom-box,\r\n.leaflet-image-layer,\r\n.leaflet-layer {\r\n\tposition: absolute;\r\n\tleft: 0;\r\n\ttop: 0;\r\n\t}\r\n.leaflet-container {\r\n\toverflow: hidden;\r\n\t}\r\n.leaflet-tile,\r\n.leaflet-marker-icon,\r\n.leaflet-marker-shadow {\r\n\t-webkit-user-select: none;\r\n\t   -moz-user-select: none;\r\n\t        user-select: none;\r\n\t  -webkit-user-drag: none;\r\n\t}\r\n/* Safari renders non-retina tile on retina better with this, but Chrome is worse */\r\n.leaflet-safari .leaflet-tile {\r\n\timage-rendering: -webkit-optimize-contrast;\r\n\t}\r\n/* hack that prevents hw layers \"stretching\" when loading new tiles */\r\n.leaflet-safari .leaflet-tile-container {\r\n\twidth: 1600px;\r\n\theight: 1600px;\r\n\t-webkit-transform-origin: 0 0;\r\n\t}\r\n.leaflet-marker-icon,\r\n.leaflet-marker-shadow {\r\n\tdisplay: block;\r\n\t}\r\n/* .leaflet-container svg: reset svg max-width decleration shipped in Joomla! (joomla.org) 3.x */\r\n/* .leaflet-container img: map is broken in FF if you have max-width: 100% on tiles */\r\n.leaflet-container .leaflet-overlay-pane svg,\r\n.leaflet-container .leaflet-marker-pane img,\r\n.leaflet-container .leaflet-shadow-pane img,\r\n.leaflet-container .leaflet-tile-pane img,\r\n.leaflet-container img.leaflet-image-layer {\r\n\tmax-width: none !important;\r\n\t}\r\n\r\n.leaflet-container.leaflet-touch-zoom {\r\n\t-ms-touch-action: pan-x pan-y;\r\n\ttouch-action: pan-x pan-y;\r\n\t}\r\n.leaflet-container.leaflet-touch-drag {\r\n\t-ms-touch-action: pinch-zoom;\r\n\t}\r\n.leaflet-container.leaflet-touch-drag.leaflet-touch-zoom {\r\n\t-ms-touch-action: none;\r\n\ttouch-action: none;\r\n}\r\n.leaflet-tile {\r\n\tfilter: inherit;\r\n\tvisibility: hidden;\r\n\t}\r\n.leaflet-tile-loaded {\r\n\tvisibility: inherit;\r\n\t}\r\n.leaflet-zoom-box {\r\n\twidth: 0;\r\n\theight: 0;\r\n\t-moz-box-sizing: border-box;\r\n\t     box-sizing: border-box;\r\n\tz-index: 800;\r\n\t}\r\n/* workaround for https://bugzilla.mozilla.org/show_bug.cgi?id=888319 */\r\n.leaflet-overlay-pane svg {\r\n\t-moz-user-select: none;\r\n\t}\r\n\r\n.leaflet-pane         { z-index: 400; }\r\n\r\n.leaflet-tile-pane    { z-index: 200; }\r\n.leaflet-overlay-pane { z-index: 400; }\r\n.leaflet-shadow-pane  { z-index: 500; }\r\n.leaflet-marker-pane  { z-index: 600; }\r\n.leaflet-tooltip-pane   { z-index: 650; }\r\n.leaflet-popup-pane   { z-index: 700; }\r\n\r\n.leaflet-map-pane canvas { z-index: 100; }\r\n.leaflet-map-pane svg    { z-index: 200; }\r\n\r\n.leaflet-vml-shape {\r\n\twidth: 1px;\r\n\theight: 1px;\r\n\t}\r\n.lvml {\r\n\tbehavior: url(#default#VML);\r\n\tdisplay: inline-block;\r\n\tposition: absolute;\r\n\t}\r\n\r\n\r\n/* control positioning */\r\n\r\n.leaflet-control {\r\n\tposition: relative;\r\n\tz-index: 800;\r\n\tpointer-events: visiblePainted; /* IE 9-10 doesn't have auto */\r\n\tpointer-events: auto;\r\n\t}\r\n.leaflet-top,\r\n.leaflet-bottom {\r\n\tposition: absolute;\r\n\tz-index: 1000;\r\n\tpointer-events: none;\r\n\t}\r\n.leaflet-top {\r\n\ttop: 0;\r\n\t}\r\n.leaflet-right {\r\n\tright: 0;\r\n\t}\r\n.leaflet-bottom {\r\n\tbottom: 0;\r\n\t}\r\n.leaflet-left {\r\n\tleft: 0;\r\n\t}\r\n.leaflet-control {\r\n\tfloat: left;\r\n\tclear: both;\r\n\t}\r\n.leaflet-right .leaflet-control {\r\n\tfloat: right;\r\n\t}\r\n.leaflet-top .leaflet-control {\r\n\tmargin-top: 10px;\r\n\t}\r\n.leaflet-bottom .leaflet-control {\r\n\tmargin-bottom: 10px;\r\n\t}\r\n.leaflet-left .leaflet-control {\r\n\tmargin-left: 10px;\r\n\t}\r\n.leaflet-right .leaflet-control {\r\n\tmargin-right: 10px;\r\n\t}\r\n\r\n\r\n/* zoom and fade animations */\r\n\r\n.leaflet-fade-anim .leaflet-tile {\r\n\twill-change: opacity;\r\n\t}\r\n.leaflet-fade-anim .leaflet-popup {\r\n\topacity: 0;\r\n\t-webkit-transition: opacity 0.2s linear;\r\n\t   -moz-transition: opacity 0.2s linear;\r\n\t     -o-transition: opacity 0.2s linear;\r\n\t        transition: opacity 0.2s linear;\r\n\t}\r\n.leaflet-fade-anim .leaflet-map-pane .leaflet-popup {\r\n\topacity: 1;\r\n\t}\r\n.leaflet-zoom-animated {\r\n\t-webkit-transform-origin: 0 0;\r\n\t    -ms-transform-origin: 0 0;\r\n\t        transform-origin: 0 0;\r\n\t}\r\n.leaflet-zoom-anim .leaflet-zoom-animated {\r\n\twill-change: transform;\r\n\t}\r\n.leaflet-zoom-anim .leaflet-zoom-animated {\r\n\t-webkit-transition: -webkit-transform 0.25s cubic-bezier(0,0,0.25,1);\r\n\t   -moz-transition:    -moz-transform 0.25s cubic-bezier(0,0,0.25,1);\r\n\t     -o-transition:      -o-transform 0.25s cubic-bezier(0,0,0.25,1);\r\n\t        transition:         transform 0.25s cubic-bezier(0,0,0.25,1);\r\n\t}\r\n.leaflet-zoom-anim .leaflet-tile,\r\n.leaflet-pan-anim .leaflet-tile {\r\n\t-webkit-transition: none;\r\n\t   -moz-transition: none;\r\n\t     -o-transition: none;\r\n\t        transition: none;\r\n\t}\r\n\r\n.leaflet-zoom-anim .leaflet-zoom-hide {\r\n\tvisibility: hidden;\r\n\t}\r\n\r\n\r\n/* cursors */\r\n\r\n.leaflet-interactive {\r\n\tcursor: pointer;\r\n\t}\r\n.leaflet-grab {\r\n\tcursor: -webkit-grab;\r\n\tcursor:    -moz-grab;\r\n\t}\r\n.leaflet-crosshair,\r\n.leaflet-crosshair .leaflet-interactive {\r\n\tcursor: crosshair;\r\n\t}\r\n.leaflet-popup-pane,\r\n.leaflet-control {\r\n\tcursor: auto;\r\n\t}\r\n.leaflet-dragging .leaflet-grab,\r\n.leaflet-dragging .leaflet-grab .leaflet-interactive,\r\n.leaflet-dragging .leaflet-marker-draggable {\r\n\tcursor: move;\r\n\tcursor: -webkit-grabbing;\r\n\tcursor:    -moz-grabbing;\r\n\t}\r\n\r\n/* marker & overlays interactivity */\r\n.leaflet-marker-icon,\r\n.leaflet-marker-shadow,\r\n.leaflet-image-layer,\r\n.leaflet-pane > svg path,\r\n.leaflet-tile-container {\r\n\tpointer-events: none;\r\n\t}\r\n\r\n.leaflet-marker-icon.leaflet-interactive,\r\n.leaflet-image-layer.leaflet-interactive,\r\n.leaflet-pane > svg path.leaflet-interactive {\r\n\tpointer-events: visiblePainted; /* IE 9-10 doesn't have auto */\r\n\tpointer-events: auto;\r\n\t}\r\n\r\n/* visual tweaks */\r\n\r\n.leaflet-container {\r\n\tbackground: #ddd;\r\n\toutline: 0;\r\n\t}\r\n.leaflet-container a {\r\n\tcolor: #0078A8;\r\n\t}\r\n.leaflet-container a.leaflet-active {\r\n\toutline: 2px solid orange;\r\n\t}\r\n.leaflet-zoom-box {\r\n\tborder: 2px dotted #38f;\r\n\tbackground: rgba(255,255,255,0.5);\r\n\t}\r\n\r\n\r\n/* general typography */\r\n.leaflet-container {\r\n\tfont: 12px/1.5 \"Helvetica Neue\", Arial, Helvetica, sans-serif;\r\n\t}\r\n\r\n\r\n/* general toolbar styles */\r\n\r\n.leaflet-bar {\r\n\tbox-shadow: 0 1px 5px rgba(0,0,0,0.65);\r\n\tborder-radius: 4px;\r\n\t}\r\n.leaflet-bar a,\r\n.leaflet-bar a:hover {\r\n\tbackground-color: #fff;\r\n\tborder-bottom: 1px solid #ccc;\r\n\twidth: 26px;\r\n\theight: 26px;\r\n\tline-height: 26px;\r\n\tdisplay: block;\r\n\ttext-align: center;\r\n\ttext-decoration: none;\r\n\tcolor: black;\r\n\t}\r\n.leaflet-bar a,\r\n.leaflet-control-layers-toggle {\r\n\tbackground-position: 50% 50%;\r\n\tbackground-repeat: no-repeat;\r\n\tdisplay: block;\r\n\t}\r\n.leaflet-bar a:hover {\r\n\tbackground-color: #f4f4f4;\r\n\t}\r\n.leaflet-bar a:first-child {\r\n\tborder-top-left-radius: 4px;\r\n\tborder-top-right-radius: 4px;\r\n\t}\r\n.leaflet-bar a:last-child {\r\n\tborder-bottom-left-radius: 4px;\r\n\tborder-bottom-right-radius: 4px;\r\n\tborder-bottom: none;\r\n\t}\r\n.leaflet-bar a.leaflet-disabled {\r\n\tcursor: default;\r\n\tbackground-color: #f4f4f4;\r\n\tcolor: #bbb;\r\n\t}\r\n\r\n.leaflet-touch .leaflet-bar a {\r\n\twidth: 30px;\r\n\theight: 30px;\r\n\tline-height: 30px;\r\n\t}\r\n\r\n\r\n/* zoom control */\r\n\r\n.leaflet-control-zoom-in,\r\n.leaflet-control-zoom-out {\r\n\tfont: bold 18px 'Lucida Console', Monaco, monospace;\r\n\ttext-indent: 1px;\r\n\t}\r\n.leaflet-control-zoom-out {\r\n\tfont-size: 20px;\r\n\t}\r\n\r\n.leaflet-touch .leaflet-control-zoom-in {\r\n\tfont-size: 22px;\r\n\t}\r\n.leaflet-touch .leaflet-control-zoom-out {\r\n\tfont-size: 24px;\r\n\t}\r\n\r\n\r\n/* layers control */\r\n\r\n.leaflet-control-layers {\r\n\tbox-shadow: 0 1px 5px rgba(0,0,0,0.4);\r\n\tbackground: #fff;\r\n\tborder-radius: 5px;\r\n\t}\r\n.leaflet-control-layers-toggle {\r\n\tbackground-image: url(" + __webpack_require__(10) + ");\r\n\twidth: 36px;\r\n\theight: 36px;\r\n\t}\r\n.leaflet-retina .leaflet-control-layers-toggle {\r\n\tbackground-image: url(" + __webpack_require__(11) + ");\r\n\tbackground-size: 26px 26px;\r\n\t}\r\n.leaflet-touch .leaflet-control-layers-toggle {\r\n\twidth: 44px;\r\n\theight: 44px;\r\n\t}\r\n.leaflet-control-layers .leaflet-control-layers-list,\r\n.leaflet-control-layers-expanded .leaflet-control-layers-toggle {\r\n\tdisplay: none;\r\n\t}\r\n.leaflet-control-layers-expanded .leaflet-control-layers-list {\r\n\tdisplay: block;\r\n\tposition: relative;\r\n\t}\r\n.leaflet-control-layers-expanded {\r\n\tpadding: 6px 10px 6px 6px;\r\n\tcolor: #333;\r\n\tbackground: #fff;\r\n\t}\r\n.leaflet-control-layers-scrollbar {\r\n\toverflow-y: scroll;\r\n\tpadding-right: 5px;\r\n\t}\r\n.leaflet-control-layers-selector {\r\n\tmargin-top: 2px;\r\n\tposition: relative;\r\n\ttop: 1px;\r\n\t}\r\n.leaflet-control-layers label {\r\n\tdisplay: block;\r\n\t}\r\n.leaflet-control-layers-separator {\r\n\theight: 0;\r\n\tborder-top: 1px solid #ddd;\r\n\tmargin: 5px -10px 5px -6px;\r\n\t}\r\n\r\n/* Default icon URLs */\r\n.leaflet-default-icon-path {\r\n\tbackground-image: url(" + __webpack_require__(12) + ");\r\n\t}\r\n\r\n\r\n/* attribution and scale controls */\r\n\r\n.leaflet-container .leaflet-control-attribution {\r\n\tbackground: #fff;\r\n\tbackground: rgba(255, 255, 255, 0.7);\r\n\tmargin: 0;\r\n\t}\r\n.leaflet-control-attribution,\r\n.leaflet-control-scale-line {\r\n\tpadding: 0 5px;\r\n\tcolor: #333;\r\n\t}\r\n.leaflet-control-attribution a {\r\n\ttext-decoration: none;\r\n\t}\r\n.leaflet-control-attribution a:hover {\r\n\ttext-decoration: underline;\r\n\t}\r\n.leaflet-container .leaflet-control-attribution,\r\n.leaflet-container .leaflet-control-scale {\r\n\tfont-size: 11px;\r\n\t}\r\n.leaflet-left .leaflet-control-scale {\r\n\tmargin-left: 5px;\r\n\t}\r\n.leaflet-bottom .leaflet-control-scale {\r\n\tmargin-bottom: 5px;\r\n\t}\r\n.leaflet-control-scale-line {\r\n\tborder: 2px solid #777;\r\n\tborder-top: none;\r\n\tline-height: 1.1;\r\n\tpadding: 2px 5px 1px;\r\n\tfont-size: 11px;\r\n\twhite-space: nowrap;\r\n\toverflow: hidden;\r\n\t-moz-box-sizing: border-box;\r\n\t     box-sizing: border-box;\r\n\r\n\tbackground: #fff;\r\n\tbackground: rgba(255, 255, 255, 0.5);\r\n\t}\r\n.leaflet-control-scale-line:not(:first-child) {\r\n\tborder-top: 2px solid #777;\r\n\tborder-bottom: none;\r\n\tmargin-top: -2px;\r\n\t}\r\n.leaflet-control-scale-line:not(:first-child):not(:last-child) {\r\n\tborder-bottom: 2px solid #777;\r\n\t}\r\n\r\n.leaflet-touch .leaflet-control-attribution,\r\n.leaflet-touch .leaflet-control-layers,\r\n.leaflet-touch .leaflet-bar {\r\n\tbox-shadow: none;\r\n\t}\r\n.leaflet-touch .leaflet-control-layers,\r\n.leaflet-touch .leaflet-bar {\r\n\tborder: 2px solid rgba(0,0,0,0.2);\r\n\tbackground-clip: padding-box;\r\n\t}\r\n\r\n\r\n/* popup */\r\n\r\n.leaflet-popup {\r\n\tposition: absolute;\r\n\ttext-align: center;\r\n\tmargin-bottom: 20px;\r\n\t}\r\n.leaflet-popup-content-wrapper {\r\n\tpadding: 1px;\r\n\ttext-align: left;\r\n\tborder-radius: 12px;\r\n\t}\r\n.leaflet-popup-content {\r\n\tmargin: 13px 19px;\r\n\tline-height: 1.4;\r\n\t}\r\n.leaflet-popup-content p {\r\n\tmargin: 18px 0;\r\n\t}\r\n.leaflet-popup-tip-container {\r\n\twidth: 40px;\r\n\theight: 20px;\r\n\tposition: absolute;\r\n\tleft: 50%;\r\n\tmargin-left: -20px;\r\n\toverflow: hidden;\r\n\tpointer-events: none;\r\n\t}\r\n.leaflet-popup-tip {\r\n\twidth: 17px;\r\n\theight: 17px;\r\n\tpadding: 1px;\r\n\r\n\tmargin: -10px auto 0;\r\n\r\n\t-webkit-transform: rotate(45deg);\r\n\t   -moz-transform: rotate(45deg);\r\n\t    -ms-transform: rotate(45deg);\r\n\t     -o-transform: rotate(45deg);\r\n\t        transform: rotate(45deg);\r\n\t}\r\n.leaflet-popup-content-wrapper,\r\n.leaflet-popup-tip {\r\n\tbackground: white;\r\n\tcolor: #333;\r\n\tbox-shadow: 0 3px 14px rgba(0,0,0,0.4);\r\n\t}\r\n.leaflet-container a.leaflet-popup-close-button {\r\n\tposition: absolute;\r\n\ttop: 0;\r\n\tright: 0;\r\n\tpadding: 4px 4px 0 0;\r\n\tborder: none;\r\n\ttext-align: center;\r\n\twidth: 18px;\r\n\theight: 14px;\r\n\tfont: 16px/14px Tahoma, Verdana, sans-serif;\r\n\tcolor: #c3c3c3;\r\n\ttext-decoration: none;\r\n\tfont-weight: bold;\r\n\tbackground: transparent;\r\n\t}\r\n.leaflet-container a.leaflet-popup-close-button:hover {\r\n\tcolor: #999;\r\n\t}\r\n.leaflet-popup-scrolled {\r\n\toverflow: auto;\r\n\tborder-bottom: 1px solid #ddd;\r\n\tborder-top: 1px solid #ddd;\r\n\t}\r\n\r\n.leaflet-oldie .leaflet-popup-content-wrapper {\r\n\tzoom: 1;\r\n\t}\r\n.leaflet-oldie .leaflet-popup-tip {\r\n\twidth: 24px;\r\n\tmargin: 0 auto;\r\n\r\n\t-ms-filter: \"progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678)\";\r\n\tfilter: progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678);\r\n\t}\r\n.leaflet-oldie .leaflet-popup-tip-container {\r\n\tmargin-top: -1px;\r\n\t}\r\n\r\n.leaflet-oldie .leaflet-control-zoom,\r\n.leaflet-oldie .leaflet-control-layers,\r\n.leaflet-oldie .leaflet-popup-content-wrapper,\r\n.leaflet-oldie .leaflet-popup-tip {\r\n\tborder: 1px solid #999;\r\n\t}\r\n\r\n\r\n/* div icon */\r\n\r\n.leaflet-div-icon {\r\n\tbackground: #fff;\r\n\tborder: 1px solid #666;\r\n\t}\r\n\r\n\r\n/* Tooltip */\r\n/* Base styles for the element that has a tooltip */\r\n.leaflet-tooltip {\r\n\tposition: absolute;\r\n\tpadding: 6px;\r\n\tbackground-color: #fff;\r\n\tborder: 1px solid #fff;\r\n\tborder-radius: 3px;\r\n\tcolor: #222;\r\n\twhite-space: nowrap;\r\n\t-webkit-user-select: none;\r\n\t-moz-user-select: none;\r\n\t-ms-user-select: none;\r\n\tuser-select: none;\r\n\tpointer-events: none;\r\n\tbox-shadow: 0 1px 3px rgba(0,0,0,0.4);\r\n\t}\r\n.leaflet-tooltip.leaflet-clickable {\r\n\tcursor: pointer;\r\n\tpointer-events: auto;\r\n\t}\r\n.leaflet-tooltip-top:before,\r\n.leaflet-tooltip-bottom:before,\r\n.leaflet-tooltip-left:before,\r\n.leaflet-tooltip-right:before {\r\n\tposition: absolute;\r\n\tpointer-events: none;\r\n\tborder: 6px solid transparent;\r\n\tbackground: transparent;\r\n\tcontent: \"\";\r\n\t}\r\n\r\n/* Directions */\r\n\r\n.leaflet-tooltip-bottom {\r\n\tmargin-top: 6px;\r\n}\r\n.leaflet-tooltip-top {\r\n\tmargin-top: -6px;\r\n}\r\n.leaflet-tooltip-bottom:before,\r\n.leaflet-tooltip-top:before {\r\n\tleft: 50%;\r\n\tmargin-left: -6px;\r\n\t}\r\n.leaflet-tooltip-top:before {\r\n\tbottom: 0;\r\n\tmargin-bottom: -12px;\r\n\tborder-top-color: #fff;\r\n\t}\r\n.leaflet-tooltip-bottom:before {\r\n\ttop: 0;\r\n\tmargin-top: -12px;\r\n\tmargin-left: -6px;\r\n\tborder-bottom-color: #fff;\r\n\t}\r\n.leaflet-tooltip-left {\r\n\tmargin-left: -6px;\r\n}\r\n.leaflet-tooltip-right {\r\n\tmargin-left: 6px;\r\n}\r\n.leaflet-tooltip-left:before,\r\n.leaflet-tooltip-right:before {\r\n\ttop: 50%;\r\n\tmargin-top: -6px;\r\n\t}\r\n.leaflet-tooltip-left:before {\r\n\tright: 0;\r\n\tmargin-right: -12px;\r\n\tborder-left-color: #fff;\r\n\t}\r\n.leaflet-tooltip-right:before {\r\n\tleft: 0;\r\n\tmargin-left: -12px;\r\n\tborder-right-color: #fff;\r\n\t}\r\n", "", {"version":3,"sources":["/opt/zeppelin-0.9.0-bin-all/local-repo/helium-bundle/bundles/volume-leaflet/node_modules/leaflet/dist/leaflet.css"],"names":[],"mappings":"AAAA,qBAAqB;;AAErB;;;;;;;;;;CAUC,mBAAmB;CACnB,QAAQ;CACR,OAAO;EACN;AACF;CACC,iBAAiB;EAChB;AACF;;;CAGC,0BAA0B;IACvB,uBAAuB;SAClB,kBAAkB;GACxB,wBAAwB;EACzB;AACF,oFAAoF;AACpF;CACC,2CAA2C;EAC1C;AACF,sEAAsE;AACtE;CACC,cAAc;CACd,eAAe;CACf,8BAA8B;EAC7B;AACF;;CAEC,eAAe;EACd;AACF,iGAAiG;AACjG,sFAAsF;AACtF;;;;;CAKC,2BAA2B;EAC1B;;AAEF;CACC,8BAA8B;CAC9B,0BAA0B;EACzB;AACF;CACC,6BAA6B;EAC5B;AACF;CACC,uBAAuB;CACvB,mBAAmB;CACnB;AACD;CACC,gBAAgB;CAChB,mBAAmB;EAClB;AACF;CACC,oBAAoB;EACnB;AACF;CACC,SAAS;CACT,UAAU;CACV,4BAA4B;MACvB,uBAAuB;CAC5B,aAAa;EACZ;AACF,wEAAwE;AACxE;CACC,uBAAuB;EACtB;;AAEF,wBAAwB,aAAa,EAAE;;AAEvC,wBAAwB,aAAa,EAAE;AACvC,wBAAwB,aAAa,EAAE;AACvC,wBAAwB,aAAa,EAAE;AACvC,wBAAwB,aAAa,EAAE;AACvC,0BAA0B,aAAa,EAAE;AACzC,wBAAwB,aAAa,EAAE;;AAEvC,2BAA2B,aAAa,EAAE;AAC1C,2BAA2B,aAAa,EAAE;;AAE1C;CACC,WAAW;CACX,YAAY;EACX;AACF;CACC,4BAA4B;CAC5B,sBAAsB;CACtB,mBAAmB;EAClB;;;AAGF,yBAAyB;;AAEzB;CACC,mBAAmB;CACnB,aAAa;CACb,+BAA+B,CAAC,+BAA+B;CAC/D,qBAAqB;EACpB;AACF;;CAEC,mBAAmB;CACnB,cAAc;CACd,qBAAqB;EACpB;AACF;CACC,OAAO;EACN;AACF;CACC,SAAS;EACR;AACF;CACC,UAAU;EACT;AACF;CACC,QAAQ;EACP;AACF;CACC,YAAY;CACZ,YAAY;EACX;AACF;CACC,aAAa;EACZ;AACF;CACC,iBAAiB;EAChB;AACF;CACC,oBAAoB;EACnB;AACF;CACC,kBAAkB;EACjB;AACF;CACC,mBAAmB;EAClB;;;AAGF,8BAA8B;;AAE9B;CACC,qBAAqB;EACpB;AACF;CACC,WAAW;CACX,wCAAwC;IACrC,qCAAqC;MACnC,mCAAmC;SAChC,gCAAgC;EACvC;AACF;CACC,WAAW;EACV;AACF;CACC,8BAA8B;KAC1B,0BAA0B;SACtB,sBAAsB;EAC7B;AACF;CACC,uBAAuB;EACtB;AACF;CACC,qEAAqE;IAClE,kEAAkE;MAChE,gEAAgE;SAC7D,6DAA6D;EACpE;AACF;;CAEC,yBAAyB;IACtB,sBAAsB;MACpB,oBAAoB;SACjB,iBAAiB;EACxB;;AAEF;CACC,mBAAmB;EAClB;;;AAGF,aAAa;;AAEb;CACC,gBAAgB;EACf;AACF;CACC,qBAAqB;CACrB,qBAAqB;EACpB;AACF;;CAEC,kBAAkB;EACjB;AACF;;CAEC,aAAa;EACZ;AACF;;;CAGC,aAAa;CACb,yBAAyB;CACzB,yBAAyB;EACxB;;AAEF,qCAAqC;AACrC;;;;;CAKC,qBAAqB;EACpB;;AAEF;;;CAGC,+BAA+B,CAAC,+BAA+B;CAC/D,qBAAqB;EACpB;;AAEF,mBAAmB;;AAEnB;CACC,iBAAiB;CACjB,WAAW;EACV;AACF;CACC,eAAe;EACd;AACF;CACC,0BAA0B;EACzB;AACF;CACC,wBAAwB;CACxB,kCAAkC;EACjC;;;AAGF,wBAAwB;AACxB;CACC,8DAA8D;EAC7D;;;AAGF,4BAA4B;;AAE5B;CACC,uCAAuC;CACvC,mBAAmB;EAClB;AACF;;CAEC,uBAAuB;CACvB,8BAA8B;CAC9B,YAAY;CACZ,aAAa;CACb,kBAAkB;CAClB,eAAe;CACf,mBAAmB;CACnB,sBAAsB;CACtB,aAAa;EACZ;AACF;;CAEC,6BAA6B;CAC7B,6BAA6B;CAC7B,eAAe;EACd;AACF;CACC,0BAA0B;EACzB;AACF;CACC,4BAA4B;CAC5B,6BAA6B;EAC5B;AACF;CACC,+BAA+B;CAC/B,gCAAgC;CAChC,oBAAoB;EACnB;AACF;CACC,gBAAgB;CAChB,0BAA0B;CAC1B,YAAY;EACX;;AAEF;CACC,YAAY;CACZ,aAAa;CACb,kBAAkB;EACjB;;;AAGF,kBAAkB;;AAElB;;CAEC,oDAAoD;CACpD,iBAAiB;EAChB;AACF;CACC,gBAAgB;EACf;;AAEF;CACC,gBAAgB;EACf;AACF;CACC,gBAAgB;EACf;;;AAGF,oBAAoB;;AAEpB;CACC,sCAAsC;CACtC,iBAAiB;CACjB,mBAAmB;EAClB;AACF;CACC,gDAAyC;CACzC,YAAY;CACZ,aAAa;EACZ;AACF;CACC,gDAA4C;CAC5C,2BAA2B;EAC1B;AACF;CACC,YAAY;CACZ,aAAa;EACZ;AACF;;CAEC,cAAc;EACb;AACF;CACC,eAAe;CACf,mBAAmB;EAClB;AACF;CACC,0BAA0B;CAC1B,YAAY;CACZ,iBAAiB;EAChB;AACF;CACC,mBAAmB;CACnB,mBAAmB;EAClB;AACF;CACC,gBAAgB;CAChB,mBAAmB;CACnB,SAAS;EACR;AACF;CACC,eAAe;EACd;AACF;CACC,UAAU;CACV,2BAA2B;CAC3B,2BAA2B;EAC1B;;AAEF,uBAAuB;AACvB;CACC,gDAA8C;EAC7C;;;AAGF,oCAAoC;;AAEpC;CACC,iBAAiB;CACjB,qCAAqC;CACrC,UAAU;EACT;AACF;;CAEC,eAAe;CACf,YAAY;EACX;AACF;CACC,sBAAsB;EACrB;AACF;CACC,2BAA2B;EAC1B;AACF;;CAEC,gBAAgB;EACf;AACF;CACC,iBAAiB;EAChB;AACF;CACC,mBAAmB;EAClB;AACF;CACC,uBAAuB;CACvB,iBAAiB;CACjB,iBAAiB;CACjB,qBAAqB;CACrB,gBAAgB;CAChB,oBAAoB;CACpB,iBAAiB;CACjB,4BAA4B;MACvB,uBAAuB;;CAE5B,iBAAiB;CACjB,qCAAqC;EACpC;AACF;CACC,2BAA2B;CAC3B,oBAAoB;CACpB,iBAAiB;EAChB;AACF;CACC,8BAA8B;EAC7B;;AAEF;;;CAGC,iBAAiB;EAChB;AACF;;CAEC,kCAAkC;CAClC,6BAA6B;EAC5B;;;AAGF,WAAW;;AAEX;CACC,mBAAmB;CACnB,mBAAmB;CACnB,oBAAoB;EACnB;AACF;CACC,aAAa;CACb,iBAAiB;CACjB,oBAAoB;EACnB;AACF;CACC,kBAAkB;CAClB,iBAAiB;EAChB;AACF;CACC,eAAe;EACd;AACF;CACC,YAAY;CACZ,aAAa;CACb,mBAAmB;CACnB,UAAU;CACV,mBAAmB;CACnB,iBAAiB;CACjB,qBAAqB;EACpB;AACF;CACC,YAAY;CACZ,aAAa;CACb,aAAa;;CAEb,qBAAqB;;CAErB,iCAAiC;IAC9B,8BAA8B;KAC7B,6BAA6B;MAC5B,4BAA4B;SACzB,yBAAyB;EAChC;AACF;;CAEC,kBAAkB;CAClB,YAAY;CACZ,uCAAuC;EACtC;AACF;CACC,mBAAmB;CACnB,OAAO;CACP,SAAS;CACT,qBAAqB;CACrB,aAAa;CACb,mBAAmB;CACnB,YAAY;CACZ,aAAa;CACb,4CAA4C;CAC5C,eAAe;CACf,sBAAsB;CACtB,kBAAkB;CAClB,wBAAwB;EACvB;AACF;CACC,YAAY;EACX;AACF;CACC,eAAe;CACf,8BAA8B;CAC9B,2BAA2B;EAC1B;;AAEF;CACC,QAAQ;EACP;AACF;CACC,YAAY;CACZ,eAAe;;CAEf,wHAAwH;CACxH,kHAAkH;EACjH;AACF;CACC,iBAAiB;EAChB;;AAEF;;;;CAIC,uBAAuB;EACtB;;;AAGF,cAAc;;AAEd;CACC,iBAAiB;CACjB,uBAAuB;EACtB;;;AAGF,aAAa;AACb,oDAAoD;AACpD;CACC,mBAAmB;CACnB,aAAa;CACb,uBAAuB;CACvB,uBAAuB;CACvB,mBAAmB;CACnB,YAAY;CACZ,oBAAoB;CACpB,0BAA0B;CAC1B,uBAAuB;CACvB,sBAAsB;CACtB,kBAAkB;CAClB,qBAAqB;CACrB,sCAAsC;EACrC;AACF;CACC,gBAAgB;CAChB,qBAAqB;EACpB;AACF;;;;CAIC,mBAAmB;CACnB,qBAAqB;CACrB,8BAA8B;CAC9B,wBAAwB;CACxB,YAAY;EACX;;AAEF,gBAAgB;;AAEhB;CACC,gBAAgB;CAChB;AACD;CACC,iBAAiB;CACjB;AACD;;CAEC,UAAU;CACV,kBAAkB;EACjB;AACF;CACC,UAAU;CACV,qBAAqB;CACrB,uBAAuB;EACtB;AACF;CACC,OAAO;CACP,kBAAkB;CAClB,kBAAkB;CAClB,0BAA0B;EACzB;AACF;CACC,kBAAkB;CAClB;AACD;CACC,iBAAiB;CACjB;AACD;;CAEC,SAAS;CACT,iBAAiB;EAChB;AACF;CACC,SAAS;CACT,oBAAoB;CACpB,wBAAwB;EACvB;AACF;CACC,QAAQ;CACR,mBAAmB;CACnB,yBAAyB;EACxB","file":"leaflet.css","sourcesContent":["/* required styles */\r\n\r\n.leaflet-pane,\r\n.leaflet-tile,\r\n.leaflet-marker-icon,\r\n.leaflet-marker-shadow,\r\n.leaflet-tile-container,\r\n.leaflet-pane > svg,\r\n.leaflet-pane > canvas,\r\n.leaflet-zoom-box,\r\n.leaflet-image-layer,\r\n.leaflet-layer {\r\n\tposition: absolute;\r\n\tleft: 0;\r\n\ttop: 0;\r\n\t}\r\n.leaflet-container {\r\n\toverflow: hidden;\r\n\t}\r\n.leaflet-tile,\r\n.leaflet-marker-icon,\r\n.leaflet-marker-shadow {\r\n\t-webkit-user-select: none;\r\n\t   -moz-user-select: none;\r\n\t        user-select: none;\r\n\t  -webkit-user-drag: none;\r\n\t}\r\n/* Safari renders non-retina tile on retina better with this, but Chrome is worse */\r\n.leaflet-safari .leaflet-tile {\r\n\timage-rendering: -webkit-optimize-contrast;\r\n\t}\r\n/* hack that prevents hw layers \"stretching\" when loading new tiles */\r\n.leaflet-safari .leaflet-tile-container {\r\n\twidth: 1600px;\r\n\theight: 1600px;\r\n\t-webkit-transform-origin: 0 0;\r\n\t}\r\n.leaflet-marker-icon,\r\n.leaflet-marker-shadow {\r\n\tdisplay: block;\r\n\t}\r\n/* .leaflet-container svg: reset svg max-width decleration shipped in Joomla! (joomla.org) 3.x */\r\n/* .leaflet-container img: map is broken in FF if you have max-width: 100% on tiles */\r\n.leaflet-container .leaflet-overlay-pane svg,\r\n.leaflet-container .leaflet-marker-pane img,\r\n.leaflet-container .leaflet-shadow-pane img,\r\n.leaflet-container .leaflet-tile-pane img,\r\n.leaflet-container img.leaflet-image-layer {\r\n\tmax-width: none !important;\r\n\t}\r\n\r\n.leaflet-container.leaflet-touch-zoom {\r\n\t-ms-touch-action: pan-x pan-y;\r\n\ttouch-action: pan-x pan-y;\r\n\t}\r\n.leaflet-container.leaflet-touch-drag {\r\n\t-ms-touch-action: pinch-zoom;\r\n\t}\r\n.leaflet-container.leaflet-touch-drag.leaflet-touch-zoom {\r\n\t-ms-touch-action: none;\r\n\ttouch-action: none;\r\n}\r\n.leaflet-tile {\r\n\tfilter: inherit;\r\n\tvisibility: hidden;\r\n\t}\r\n.leaflet-tile-loaded {\r\n\tvisibility: inherit;\r\n\t}\r\n.leaflet-zoom-box {\r\n\twidth: 0;\r\n\theight: 0;\r\n\t-moz-box-sizing: border-box;\r\n\t     box-sizing: border-box;\r\n\tz-index: 800;\r\n\t}\r\n/* workaround for https://bugzilla.mozilla.org/show_bug.cgi?id=888319 */\r\n.leaflet-overlay-pane svg {\r\n\t-moz-user-select: none;\r\n\t}\r\n\r\n.leaflet-pane         { z-index: 400; }\r\n\r\n.leaflet-tile-pane    { z-index: 200; }\r\n.leaflet-overlay-pane { z-index: 400; }\r\n.leaflet-shadow-pane  { z-index: 500; }\r\n.leaflet-marker-pane  { z-index: 600; }\r\n.leaflet-tooltip-pane   { z-index: 650; }\r\n.leaflet-popup-pane   { z-index: 700; }\r\n\r\n.leaflet-map-pane canvas { z-index: 100; }\r\n.leaflet-map-pane svg    { z-index: 200; }\r\n\r\n.leaflet-vml-shape {\r\n\twidth: 1px;\r\n\theight: 1px;\r\n\t}\r\n.lvml {\r\n\tbehavior: url(#default#VML);\r\n\tdisplay: inline-block;\r\n\tposition: absolute;\r\n\t}\r\n\r\n\r\n/* control positioning */\r\n\r\n.leaflet-control {\r\n\tposition: relative;\r\n\tz-index: 800;\r\n\tpointer-events: visiblePainted; /* IE 9-10 doesn't have auto */\r\n\tpointer-events: auto;\r\n\t}\r\n.leaflet-top,\r\n.leaflet-bottom {\r\n\tposition: absolute;\r\n\tz-index: 1000;\r\n\tpointer-events: none;\r\n\t}\r\n.leaflet-top {\r\n\ttop: 0;\r\n\t}\r\n.leaflet-right {\r\n\tright: 0;\r\n\t}\r\n.leaflet-bottom {\r\n\tbottom: 0;\r\n\t}\r\n.leaflet-left {\r\n\tleft: 0;\r\n\t}\r\n.leaflet-control {\r\n\tfloat: left;\r\n\tclear: both;\r\n\t}\r\n.leaflet-right .leaflet-control {\r\n\tfloat: right;\r\n\t}\r\n.leaflet-top .leaflet-control {\r\n\tmargin-top: 10px;\r\n\t}\r\n.leaflet-bottom .leaflet-control {\r\n\tmargin-bottom: 10px;\r\n\t}\r\n.leaflet-left .leaflet-control {\r\n\tmargin-left: 10px;\r\n\t}\r\n.leaflet-right .leaflet-control {\r\n\tmargin-right: 10px;\r\n\t}\r\n\r\n\r\n/* zoom and fade animations */\r\n\r\n.leaflet-fade-anim .leaflet-tile {\r\n\twill-change: opacity;\r\n\t}\r\n.leaflet-fade-anim .leaflet-popup {\r\n\topacity: 0;\r\n\t-webkit-transition: opacity 0.2s linear;\r\n\t   -moz-transition: opacity 0.2s linear;\r\n\t     -o-transition: opacity 0.2s linear;\r\n\t        transition: opacity 0.2s linear;\r\n\t}\r\n.leaflet-fade-anim .leaflet-map-pane .leaflet-popup {\r\n\topacity: 1;\r\n\t}\r\n.leaflet-zoom-animated {\r\n\t-webkit-transform-origin: 0 0;\r\n\t    -ms-transform-origin: 0 0;\r\n\t        transform-origin: 0 0;\r\n\t}\r\n.leaflet-zoom-anim .leaflet-zoom-animated {\r\n\twill-change: transform;\r\n\t}\r\n.leaflet-zoom-anim .leaflet-zoom-animated {\r\n\t-webkit-transition: -webkit-transform 0.25s cubic-bezier(0,0,0.25,1);\r\n\t   -moz-transition:    -moz-transform 0.25s cubic-bezier(0,0,0.25,1);\r\n\t     -o-transition:      -o-transform 0.25s cubic-bezier(0,0,0.25,1);\r\n\t        transition:         transform 0.25s cubic-bezier(0,0,0.25,1);\r\n\t}\r\n.leaflet-zoom-anim .leaflet-tile,\r\n.leaflet-pan-anim .leaflet-tile {\r\n\t-webkit-transition: none;\r\n\t   -moz-transition: none;\r\n\t     -o-transition: none;\r\n\t        transition: none;\r\n\t}\r\n\r\n.leaflet-zoom-anim .leaflet-zoom-hide {\r\n\tvisibility: hidden;\r\n\t}\r\n\r\n\r\n/* cursors */\r\n\r\n.leaflet-interactive {\r\n\tcursor: pointer;\r\n\t}\r\n.leaflet-grab {\r\n\tcursor: -webkit-grab;\r\n\tcursor:    -moz-grab;\r\n\t}\r\n.leaflet-crosshair,\r\n.leaflet-crosshair .leaflet-interactive {\r\n\tcursor: crosshair;\r\n\t}\r\n.leaflet-popup-pane,\r\n.leaflet-control {\r\n\tcursor: auto;\r\n\t}\r\n.leaflet-dragging .leaflet-grab,\r\n.leaflet-dragging .leaflet-grab .leaflet-interactive,\r\n.leaflet-dragging .leaflet-marker-draggable {\r\n\tcursor: move;\r\n\tcursor: -webkit-grabbing;\r\n\tcursor:    -moz-grabbing;\r\n\t}\r\n\r\n/* marker & overlays interactivity */\r\n.leaflet-marker-icon,\r\n.leaflet-marker-shadow,\r\n.leaflet-image-layer,\r\n.leaflet-pane > svg path,\r\n.leaflet-tile-container {\r\n\tpointer-events: none;\r\n\t}\r\n\r\n.leaflet-marker-icon.leaflet-interactive,\r\n.leaflet-image-layer.leaflet-interactive,\r\n.leaflet-pane > svg path.leaflet-interactive {\r\n\tpointer-events: visiblePainted; /* IE 9-10 doesn't have auto */\r\n\tpointer-events: auto;\r\n\t}\r\n\r\n/* visual tweaks */\r\n\r\n.leaflet-container {\r\n\tbackground: #ddd;\r\n\toutline: 0;\r\n\t}\r\n.leaflet-container a {\r\n\tcolor: #0078A8;\r\n\t}\r\n.leaflet-container a.leaflet-active {\r\n\toutline: 2px solid orange;\r\n\t}\r\n.leaflet-zoom-box {\r\n\tborder: 2px dotted #38f;\r\n\tbackground: rgba(255,255,255,0.5);\r\n\t}\r\n\r\n\r\n/* general typography */\r\n.leaflet-container {\r\n\tfont: 12px/1.5 \"Helvetica Neue\", Arial, Helvetica, sans-serif;\r\n\t}\r\n\r\n\r\n/* general toolbar styles */\r\n\r\n.leaflet-bar {\r\n\tbox-shadow: 0 1px 5px rgba(0,0,0,0.65);\r\n\tborder-radius: 4px;\r\n\t}\r\n.leaflet-bar a,\r\n.leaflet-bar a:hover {\r\n\tbackground-color: #fff;\r\n\tborder-bottom: 1px solid #ccc;\r\n\twidth: 26px;\r\n\theight: 26px;\r\n\tline-height: 26px;\r\n\tdisplay: block;\r\n\ttext-align: center;\r\n\ttext-decoration: none;\r\n\tcolor: black;\r\n\t}\r\n.leaflet-bar a,\r\n.leaflet-control-layers-toggle {\r\n\tbackground-position: 50% 50%;\r\n\tbackground-repeat: no-repeat;\r\n\tdisplay: block;\r\n\t}\r\n.leaflet-bar a:hover {\r\n\tbackground-color: #f4f4f4;\r\n\t}\r\n.leaflet-bar a:first-child {\r\n\tborder-top-left-radius: 4px;\r\n\tborder-top-right-radius: 4px;\r\n\t}\r\n.leaflet-bar a:last-child {\r\n\tborder-bottom-left-radius: 4px;\r\n\tborder-bottom-right-radius: 4px;\r\n\tborder-bottom: none;\r\n\t}\r\n.leaflet-bar a.leaflet-disabled {\r\n\tcursor: default;\r\n\tbackground-color: #f4f4f4;\r\n\tcolor: #bbb;\r\n\t}\r\n\r\n.leaflet-touch .leaflet-bar a {\r\n\twidth: 30px;\r\n\theight: 30px;\r\n\tline-height: 30px;\r\n\t}\r\n\r\n\r\n/* zoom control */\r\n\r\n.leaflet-control-zoom-in,\r\n.leaflet-control-zoom-out {\r\n\tfont: bold 18px 'Lucida Console', Monaco, monospace;\r\n\ttext-indent: 1px;\r\n\t}\r\n.leaflet-control-zoom-out {\r\n\tfont-size: 20px;\r\n\t}\r\n\r\n.leaflet-touch .leaflet-control-zoom-in {\r\n\tfont-size: 22px;\r\n\t}\r\n.leaflet-touch .leaflet-control-zoom-out {\r\n\tfont-size: 24px;\r\n\t}\r\n\r\n\r\n/* layers control */\r\n\r\n.leaflet-control-layers {\r\n\tbox-shadow: 0 1px 5px rgba(0,0,0,0.4);\r\n\tbackground: #fff;\r\n\tborder-radius: 5px;\r\n\t}\r\n.leaflet-control-layers-toggle {\r\n\tbackground-image: url(images/layers.png);\r\n\twidth: 36px;\r\n\theight: 36px;\r\n\t}\r\n.leaflet-retina .leaflet-control-layers-toggle {\r\n\tbackground-image: url(images/layers-2x.png);\r\n\tbackground-size: 26px 26px;\r\n\t}\r\n.leaflet-touch .leaflet-control-layers-toggle {\r\n\twidth: 44px;\r\n\theight: 44px;\r\n\t}\r\n.leaflet-control-layers .leaflet-control-layers-list,\r\n.leaflet-control-layers-expanded .leaflet-control-layers-toggle {\r\n\tdisplay: none;\r\n\t}\r\n.leaflet-control-layers-expanded .leaflet-control-layers-list {\r\n\tdisplay: block;\r\n\tposition: relative;\r\n\t}\r\n.leaflet-control-layers-expanded {\r\n\tpadding: 6px 10px 6px 6px;\r\n\tcolor: #333;\r\n\tbackground: #fff;\r\n\t}\r\n.leaflet-control-layers-scrollbar {\r\n\toverflow-y: scroll;\r\n\tpadding-right: 5px;\r\n\t}\r\n.leaflet-control-layers-selector {\r\n\tmargin-top: 2px;\r\n\tposition: relative;\r\n\ttop: 1px;\r\n\t}\r\n.leaflet-control-layers label {\r\n\tdisplay: block;\r\n\t}\r\n.leaflet-control-layers-separator {\r\n\theight: 0;\r\n\tborder-top: 1px solid #ddd;\r\n\tmargin: 5px -10px 5px -6px;\r\n\t}\r\n\r\n/* Default icon URLs */\r\n.leaflet-default-icon-path {\r\n\tbackground-image: url(images/marker-icon.png);\r\n\t}\r\n\r\n\r\n/* attribution and scale controls */\r\n\r\n.leaflet-container .leaflet-control-attribution {\r\n\tbackground: #fff;\r\n\tbackground: rgba(255, 255, 255, 0.7);\r\n\tmargin: 0;\r\n\t}\r\n.leaflet-control-attribution,\r\n.leaflet-control-scale-line {\r\n\tpadding: 0 5px;\r\n\tcolor: #333;\r\n\t}\r\n.leaflet-control-attribution a {\r\n\ttext-decoration: none;\r\n\t}\r\n.leaflet-control-attribution a:hover {\r\n\ttext-decoration: underline;\r\n\t}\r\n.leaflet-container .leaflet-control-attribution,\r\n.leaflet-container .leaflet-control-scale {\r\n\tfont-size: 11px;\r\n\t}\r\n.leaflet-left .leaflet-control-scale {\r\n\tmargin-left: 5px;\r\n\t}\r\n.leaflet-bottom .leaflet-control-scale {\r\n\tmargin-bottom: 5px;\r\n\t}\r\n.leaflet-control-scale-line {\r\n\tborder: 2px solid #777;\r\n\tborder-top: none;\r\n\tline-height: 1.1;\r\n\tpadding: 2px 5px 1px;\r\n\tfont-size: 11px;\r\n\twhite-space: nowrap;\r\n\toverflow: hidden;\r\n\t-moz-box-sizing: border-box;\r\n\t     box-sizing: border-box;\r\n\r\n\tbackground: #fff;\r\n\tbackground: rgba(255, 255, 255, 0.5);\r\n\t}\r\n.leaflet-control-scale-line:not(:first-child) {\r\n\tborder-top: 2px solid #777;\r\n\tborder-bottom: none;\r\n\tmargin-top: -2px;\r\n\t}\r\n.leaflet-control-scale-line:not(:first-child):not(:last-child) {\r\n\tborder-bottom: 2px solid #777;\r\n\t}\r\n\r\n.leaflet-touch .leaflet-control-attribution,\r\n.leaflet-touch .leaflet-control-layers,\r\n.leaflet-touch .leaflet-bar {\r\n\tbox-shadow: none;\r\n\t}\r\n.leaflet-touch .leaflet-control-layers,\r\n.leaflet-touch .leaflet-bar {\r\n\tborder: 2px solid rgba(0,0,0,0.2);\r\n\tbackground-clip: padding-box;\r\n\t}\r\n\r\n\r\n/* popup */\r\n\r\n.leaflet-popup {\r\n\tposition: absolute;\r\n\ttext-align: center;\r\n\tmargin-bottom: 20px;\r\n\t}\r\n.leaflet-popup-content-wrapper {\r\n\tpadding: 1px;\r\n\ttext-align: left;\r\n\tborder-radius: 12px;\r\n\t}\r\n.leaflet-popup-content {\r\n\tmargin: 13px 19px;\r\n\tline-height: 1.4;\r\n\t}\r\n.leaflet-popup-content p {\r\n\tmargin: 18px 0;\r\n\t}\r\n.leaflet-popup-tip-container {\r\n\twidth: 40px;\r\n\theight: 20px;\r\n\tposition: absolute;\r\n\tleft: 50%;\r\n\tmargin-left: -20px;\r\n\toverflow: hidden;\r\n\tpointer-events: none;\r\n\t}\r\n.leaflet-popup-tip {\r\n\twidth: 17px;\r\n\theight: 17px;\r\n\tpadding: 1px;\r\n\r\n\tmargin: -10px auto 0;\r\n\r\n\t-webkit-transform: rotate(45deg);\r\n\t   -moz-transform: rotate(45deg);\r\n\t    -ms-transform: rotate(45deg);\r\n\t     -o-transform: rotate(45deg);\r\n\t        transform: rotate(45deg);\r\n\t}\r\n.leaflet-popup-content-wrapper,\r\n.leaflet-popup-tip {\r\n\tbackground: white;\r\n\tcolor: #333;\r\n\tbox-shadow: 0 3px 14px rgba(0,0,0,0.4);\r\n\t}\r\n.leaflet-container a.leaflet-popup-close-button {\r\n\tposition: absolute;\r\n\ttop: 0;\r\n\tright: 0;\r\n\tpadding: 4px 4px 0 0;\r\n\tborder: none;\r\n\ttext-align: center;\r\n\twidth: 18px;\r\n\theight: 14px;\r\n\tfont: 16px/14px Tahoma, Verdana, sans-serif;\r\n\tcolor: #c3c3c3;\r\n\ttext-decoration: none;\r\n\tfont-weight: bold;\r\n\tbackground: transparent;\r\n\t}\r\n.leaflet-container a.leaflet-popup-close-button:hover {\r\n\tcolor: #999;\r\n\t}\r\n.leaflet-popup-scrolled {\r\n\toverflow: auto;\r\n\tborder-bottom: 1px solid #ddd;\r\n\tborder-top: 1px solid #ddd;\r\n\t}\r\n\r\n.leaflet-oldie .leaflet-popup-content-wrapper {\r\n\tzoom: 1;\r\n\t}\r\n.leaflet-oldie .leaflet-popup-tip {\r\n\twidth: 24px;\r\n\tmargin: 0 auto;\r\n\r\n\t-ms-filter: \"progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678)\";\r\n\tfilter: progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678);\r\n\t}\r\n.leaflet-oldie .leaflet-popup-tip-container {\r\n\tmargin-top: -1px;\r\n\t}\r\n\r\n.leaflet-oldie .leaflet-control-zoom,\r\n.leaflet-oldie .leaflet-control-layers,\r\n.leaflet-oldie .leaflet-popup-content-wrapper,\r\n.leaflet-oldie .leaflet-popup-tip {\r\n\tborder: 1px solid #999;\r\n\t}\r\n\r\n\r\n/* div icon */\r\n\r\n.leaflet-div-icon {\r\n\tbackground: #fff;\r\n\tborder: 1px solid #666;\r\n\t}\r\n\r\n\r\n/* Tooltip */\r\n/* Base styles for the element that has a tooltip */\r\n.leaflet-tooltip {\r\n\tposition: absolute;\r\n\tpadding: 6px;\r\n\tbackground-color: #fff;\r\n\tborder: 1px solid #fff;\r\n\tborder-radius: 3px;\r\n\tcolor: #222;\r\n\twhite-space: nowrap;\r\n\t-webkit-user-select: none;\r\n\t-moz-user-select: none;\r\n\t-ms-user-select: none;\r\n\tuser-select: none;\r\n\tpointer-events: none;\r\n\tbox-shadow: 0 1px 3px rgba(0,0,0,0.4);\r\n\t}\r\n.leaflet-tooltip.leaflet-clickable {\r\n\tcursor: pointer;\r\n\tpointer-events: auto;\r\n\t}\r\n.leaflet-tooltip-top:before,\r\n.leaflet-tooltip-bottom:before,\r\n.leaflet-tooltip-left:before,\r\n.leaflet-tooltip-right:before {\r\n\tposition: absolute;\r\n\tpointer-events: none;\r\n\tborder: 6px solid transparent;\r\n\tbackground: transparent;\r\n\tcontent: \"\";\r\n\t}\r\n\r\n/* Directions */\r\n\r\n.leaflet-tooltip-bottom {\r\n\tmargin-top: 6px;\r\n}\r\n.leaflet-tooltip-top {\r\n\tmargin-top: -6px;\r\n}\r\n.leaflet-tooltip-bottom:before,\r\n.leaflet-tooltip-top:before {\r\n\tleft: 50%;\r\n\tmargin-left: -6px;\r\n\t}\r\n.leaflet-tooltip-top:before {\r\n\tbottom: 0;\r\n\tmargin-bottom: -12px;\r\n\tborder-top-color: #fff;\r\n\t}\r\n.leaflet-tooltip-bottom:before {\r\n\ttop: 0;\r\n\tmargin-top: -12px;\r\n\tmargin-left: -6px;\r\n\tborder-bottom-color: #fff;\r\n\t}\r\n.leaflet-tooltip-left {\r\n\tmargin-left: -6px;\r\n}\r\n.leaflet-tooltip-right {\r\n\tmargin-left: 6px;\r\n}\r\n.leaflet-tooltip-left:before,\r\n.leaflet-tooltip-right:before {\r\n\ttop: 50%;\r\n\tmargin-top: -6px;\r\n\t}\r\n.leaflet-tooltip-left:before {\r\n\tright: 0;\r\n\tmargin-right: -12px;\r\n\tborder-left-color: #fff;\r\n\t}\r\n.leaflet-tooltip-right:before {\r\n\tleft: 0;\r\n\tmargin-left: -12px;\r\n\tborder-right-color: #fff;\r\n\t}\r\n"],"sourceRoot":""}]);

	// exports


/***/ }),
/* 9 */
/***/ (function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ }),
/* 10 */
/***/ (function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAQAAAADQ4RFAAACf0lEQVR4AY1UM3gkARTePdvdoTxXKc+qTl3aU5U6b2Kbkz3Gtq3Zw6ziLGNPzrYx7946Tr6/ee/XeCQ4D3ykPtL5tHno4n0d/h3+xfuWHGLX81cn7r0iTNzjr7LrlxCqPtkbTQEHeqOrTy4Yyt3VCi/IOB0v7rVC7q45Q3Gr5K6jt+3Gl5nCoDD4MtO+j96Wu8atmhGqcNGHObuf8OM/x3AMx38+4Z2sPqzCxRFK2aF2e5Jol56XTLyggAMTL56XOMoS1W4pOyjUcGGQdZxU6qRh7B9Zp+PfpOFlqt0zyDZckPi1ttmIp03jX8gyJ8a/PG2yutpS/Vol7peZIbZcKBAEEheEIAgFbDkz5H6Zrkm2hVWGiXKiF4Ycw0RWKdtC16Q7qe3X4iOMxruonzegJzWaXFrU9utOSsLUmrc0YjeWYjCW4PDMADElpJSSQ0vQvA1Tm6/JlKnqFs1EGyZiFCqnRZTEJJJiKRYzVYzJck2Rm6P4iH+cmSY0YzimYa8l0EtTODFWhcMIMVqdsI2uiTvKmTisIDHJ3od5GILVhBCarCfVRmo4uTjkhrhzkiBV7SsaqS+TzrzM1qpGGUFt28pIySQHR6h7F6KSwGWm97ay+Z+ZqMcEjEWebE7wxCSQwpkhJqoZA5ivCdZDjJepuJ9IQjGGUmuXJdBFUygxVqVsxFsLMbDe8ZbDYVCGKxs+W080max1hFCarCfV+C1KATwcnvE9gRRuMP2prdbWGowm1KB1y+zwMMENkM755cJ2yPDtqhTI6ED1M/82yIDtC/4j4BijjeObflpO9I9MwXTCsSX8jWAFeHr05WoLTJ5G8IQVS/7vwR6ohirYM7f6HzYpogfS3R2OAAAAAElFTkSuQmCC"

/***/ }),
/* 11 */
/***/ (function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAQAAABvcdNgAAAEsklEQVR4AWL4TydIhpZK1kpWOlg0w3ZXP6D2soBtG42jeI6ZmQTHzAxiTbSJsYLjO9HhP+WOmcuhciVnmHVQcJnp7DFvScowZorad/+V/fVzMdMT2g9Cv9guXGv/7pYOrXh2U+RRR3dSd9JRx6bIFc/ekqHI29JC6pJ5ZEh1yWkhkbcFeSjxgx3L2m1cb1C7bceyxA+CNjT/Ifff+/kDk2u/w/33/IeCMOSaWZ4glosqT3DNnNZQ7Cs58/3Ce5HL78iZH/vKVIaYlqzfdLu8Vi7dnvUbEza5Idt36tquZFldl6N5Z/POLof0XLK61mZCmJSWjVF9tEjUluu74IUXvgttuVIHE7YxSkaYhJZam7yiM9Pv82JYfl9nptxZaxMJE4YSPty+vF0+Y2up9d3wwijfjZbabqm/3bZ9ecKHsiGmRflnn1MW4pjHf9oLufyn2z3y1D6n8g8TZhxyzipLNPnAUpsOiuWimg52psrTZYnOWYNDTMuWBWa0tJb4rgq1UvmutpaYEbZlwU3CLJm/ayYjHW5/h7xWLn9Hh1vepDkyf7dE7MtT5LR4e7yYpHrkhOUpEfssBLq2pPhAqoSWKUkk7EDqkmK6RrCEzqDjhNDWNE+XSMvkJRDWlZTmCW0l0PHQGRZY5t1L83kT0Y3l2SItk5JAWHl2dCOBm+fPu3fo5/3v61RMCO9Jx2EEYYhb0rmNQMX/vm7gqOEJLcXTGw3CAuRNeyaPWwjR8PRqKQ1PDA/dpv+on9Shox52WFnx0KY8onHayrJzm87i5h9xGw/tfkev0jGsQizqezUKjk12hBMKJ4kbCqGPVNXudyyrShovGw5CgxsRICxF6aRmSjlBnHRzg7Gx8fKqEubI2rahQYdR1YgDIRQO7JvQyD52hoIQx0mxa0ODtW2Iozn1le2iIRdzwWewedyZzewidueOGqlsn1MvcnQpuVwLGG3/IR1hIKxCjelIDZ8ldqWz25jWAsnldEnK0Zxro19TGVb2ffIZEsIO89EIEDvKMPrzmBOQcKQ+rroye6NgRRxqR4U8EAkz0CL6uSGOm6KQCdWjvjRiSP1BPalCRS5iQYiEIvxuBMJEWgzSoHADcVMuN7IuqqTeyUPq22qFimFtxDyBBJEwNyt6TM88blFHao/6tWWhuuOM4SAK4EI4QmFHA+SEyWlp4EQoJ13cYGzMu7yszEIBOm2rVmHUNqwAIQabISNMRstmdhNWcFLsSm+0tjJH1MdRxO5Nx0WDMhCtgD6OKgZeljJqJKc9po8juskR9XN0Y1lZ3mWjLR9JCO1jRDMd0fpYC2VnvjBSEFg7wBENc0R9HFlb0xvF1+TBEpF68d+DHR6IOWVv2BECtxo46hOFUBd/APU57WIoEwJhIi2CdpyZX0m93BZicktMj1AS9dClteUFAUNUIEygRZCtik5zSxI9MubTBH1GOiHsiLJ3OCoSZkILa9PxiN0EbvhsAo8tdAf9Seepd36lGWHmtNANTv5Jd0z4QYyeo/UEJqxKRpg5LZx6btLPsOaEmdMyxYdlc8LMaJnikDlhclqmPiQnTEpLUIZEwkRagjYkEibQErwhkTAKCLQEbUgkzJQWc/0PstHHcfEdQ+UAAAAASUVORK5CYII="

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII="

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }),
/* 14 */
/***/ (function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAApCAQAAAACach9AAACMUlEQVR4Ae3ShY7jQBAE0Aoz/f9/HTMzhg1zrdKUrJbdx+Kd2nD8VNudfsL/Th///dyQN2TH6f3y/BGpC379rV+S+qqetBOxImNQXL8JCAr2V4iMQXHGNJxeCfZXhSRBcQMfvkOWUdtfzlLgAENmZDcmo2TVmt8OSM2eXxBp3DjHSMFutqS7SbmemzBiR+xpKCNUIRkdkkYxhAkyGoBvyQFEJEefwSmmvBfJuJ6aKqKWnAkvGZOaZXTUgFqYULWNSHUckZuR1HIIimUExutRxwzOLROIG4vKmCKQt364mIlhSyzAf1m9lHZHJZrlAOMMztRRiKimp/rpdJDc9Awry5xTZCte7FHtuS8wJgeYGrex28xNTd086Dik7vUMscQOa8y4DoGtCCSkAKlNwpgNtphjrC6MIHUkR6YWxxs6Sc5xqn222mmCRFzIt8lEdKx+ikCtg91qS2WpwVfBelJCiQJwvzixfI9cxZQWgiSJelKnwBElKYtDOb2MFbhmUigbReQBV0Cg4+qMXSxXSyGUn4UbF8l+7qdSGnTC0XLCmahIgUHLhLOhpVCtw4CzYXvLQWQbJNmxoCsOKAxSgBJno75avolkRw8iIAFcsdc02e9iyCd8tHwmeSSoKTowIgvscSGZUOA7PuCN5b2BX9mQM7S0wYhMNU74zgsPBj3HU7wguAfnxxjFQGBE6pwN+GjME9zHY7zGp8wVxMShYX9NXvEWD3HbwJf4giO4CFIQxXScH1/TM+04kkBiAAAAAElFTkSuQmCC"

/***/ })
/******/ ]);