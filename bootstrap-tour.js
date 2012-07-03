// Generated by CoffeeScript 1.3.3

/* ============================================================
# bootstrap-tour.js v0.1
# http://pushly.github.com/bootstrap-tour/
# ==============================================================
# Copyright 2012 Push.ly
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
# 
#     http://www.apache.org/licenses/LICENSE-2.0
# 
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
*/


(function() {

  (function($, window) {
    var Tour, document;
    document = window.document;
    Tour = (function() {

      function Tour(options) {
        var _this = this;
        this._options = $.extend({
          afterSetState: function(key, value) {},
          afterGetState: function(key, value) {}
        }, options);
        this._steps = [];
        this.setCurrentStep();
        $(document).on("click", ".popover .next", function(e) {
          e.preventDefault();
          return _this.nextStep();
        });
        $(document).on("click", ".popover .end", function(e) {
          e.preventDefault();
          return _this.end();
        });
      }

      Tour.prototype.setState = function(key, value) {
        $.cookie("tour_" + key, value, {
          expires: 36500,
          path: '/'
        });
        return this._options.afterSetState(key, value);
      };

      Tour.prototype.getState = function(key) {
        var value;
        value = $.cookie("tour_" + key);
        this._options.afterGetState(key, value);
        return value;
      };

      Tour.prototype.addStep = function(step) {
        return this._steps.push(step);
      };

      Tour.prototype.start = function(force) {
        if (force == null) {
          force = false;
        }
        if (force || this.yes()) {
          return this.showStep(this._current);
        }
      };

      Tour.prototype.nextStep = function() {
        this.hideStep(this._current);
        return this.showNextStep();
      };

      Tour.prototype.end = function() {
        this.hideStep(this._current);
        return this.setState("end", "yes");
      };

      Tour.prototype.yes = function() {
        return !this.getState("end");
      };

      Tour.prototype.hideStep = function(i) {
        var step;
        step = this._steps[i];
        if (step == null) {
          return;
        }
        if (step.onHide != null) {
          step.onHide(this);
        }
        return $(step.element).popover("hide");
      };

      Tour.prototype.showStep = function(i) {
        var endOnClick, step,
          _this = this;
        step = this._steps[i];
        if (step == null) {
          this.end;
          return;
        }
        this.setCurrentStep(i);
        if ((step.path != null) && document.location.pathname !== step.path && document.location.pathname.replace(/^.*[\\\/]/, '') !== step.path) {
          document.location.href = step.path;
          return;
        }
        this.setNextStep(i);
        if ($(step.element).is(":hidden")) {
          this.showNextStep();
          return;
        }
        endOnClick = step.endOnClick || step.element;
        $(endOnClick).one("click", function() {
          return _this.endCurrentStep();
        });
        if (step.onShow != null) {
          step.onShow(this);
        }
        return this.showPopover(step, i);
      };

      Tour.prototype.showPopover = function(step, i) {
        var content, offsetBottom, offsetRight, tip, tipOffset;
        content = "" + step.content + "<br /><p>";
        if (i === this._steps.length - 1) {
          content += "<a href='#' class='end'>Close</a>";
        } else {
          content += "<a href='#" + this._next + "' class='next'>Next &raquo;</a>          <a href='#' class='pull-right end'>Never show again</a></p>";
        }
        $(step.element).popover({
          placement: step.placement,
          trigger: "manual",
          title: step.title,
          content: content
        }).popover("show");
        tip = $(step.element).data("popover").tip();
        tipOffset = tip.offset();
        offsetBottom = $(document).outerHeight() - tipOffset.top - $(tip).outerHeight();
        if (offsetBottom < 0) {
          tipOffset.top = tipOffset.top + offsetBottom;
        }
        offsetRight = $(document).outerWidth() - tipOffset.left - $(tip).outerWidth();
        if (offsetRight < 0) {
          tipOffset.left = tipOffset.left + offsetRight;
        }
        if (tipOffset.top < 0) {
          tipOffset.top = 0;
        }
        if (tipOffset.left < 0) {
          tipOffset.left = 0;
        }
        return tip.offset(tipOffset);
      };

      Tour.prototype.getCurrentStep = function() {
        return this._steps[this._current];
      };

      Tour.prototype.setCurrentStep = function(value) {
        if (value != null) {
          this._current = value;
          return this.setState("current_step", value);
        } else {
          this._current = this.getState("current_step");
          if (this._current === null || this._current === "null") {
            return this._current = 0;
          } else {
            return this._current = parseInt(this._current);
          }
        }
      };

      Tour.prototype.endCurrentStep = function() {
        this.hideStep(this._current);
        return this.setCurrentStep(this._next);
      };

      Tour.prototype.showNextStep = function() {
        var next_step, step;
        step = this._steps[this._current];
        next_step = step.next ? step.next : this._current + 1;
        return this.showStep(next_step);
      };

      Tour.prototype.setNextStep = function(i) {
        var step;
        if (i == null) {
          i = this._current;
        }
        step = this._steps[i];
        return this._next = step.next ? step.next : i + 1;
      };

      return Tour;

    })();
    return window.Tour = Tour;
  })(jQuery, window);

}).call(this);
