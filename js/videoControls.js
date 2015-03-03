/*globals $ window document */

contentLoaded(window, function () {

    var videoEl = document.getElementById('video'),
        playPauseBtn = document.getElementById('playPause'),
        vidControls = document.getElementById('controls'),
        muteBtn = document.getElementById('muteUnmute'),
        timeHolder = document.getElementById('timer');

    // Check to see if the video is already ready (if it's cached, for example)
    if (videoEl.readyState === 4) {
        videoEl.removeAttribute('controls');
        vidControls.classList.remove('hidden');
    }

    videoEl.addEventListener('canplay', function () {
        videoEl.removeAttribute('controls');
        vidControls.classList.remove('hidden')
    }, true);

    // click handler for play/pause btn
    playPauseBtn.addEventListener('click', function () {
        if (videoEl.paused) {
            videoEl.play();
        } else {
            videoEl.pause();
        }
    }, false);

    // listening for 'play' events
    videoEl.addEventListener('play', function () {
        playPauseBtn.classList.add('playing');
        playPauseBtn.title = "Pause";
    }, false);

    // listening for 'pause' events
    videoEl.addEventListener('pause', function () {
        playPauseBtn.classList.remove('playing');
        playPauseBtn.title = "Play";
    }, false);

    muteBtn.addEventListener('click', function () {
        if (videoEl.muted) {
            videoEl.muted = false;
        } else {
            videoEl.muted = true;
        }
    }, false);
    
    // listening for 'volumechange' events
    videoEl.addEventListener('volumechange', function () {
        if (videoEl.muted) {
            muteBtn.classList.add('muted');
        } else {
            muteBtn.classList.remove('muted');
        }
    }, false);

    // listening for 'ended' events
    videoEl.addEventListener('ended', function () {
        videoEl.currentTime = 0;
        videoEl.pause();
    }, false);

    // listening for 'timeupdate' events
    // Every time the time changes, the 'secondsToTime' function runs
    videoEl.addEventListener('timeupdate', function () {
        timeHolder.innerHTML = secondsToTime(videoEl.currentTime);
    }, false);
          
});

// currentTime is in seconds; this function converts it to properly formatted time
function secondsToTime(s) {
    var h = Math.floor(s / (60 * 60)),
        dm = s % (60 * 60),
        m = Math.floor(dm / 60),
        ds = dm % 60,
        secs = Math.ceil(ds);

    // this fixes the crossover from 59 seconds to 1 minute
    if (secs === 60) {
        secs = 0;
        m = m + 1;
    }

    if (secs < 10) {
        secs = "0" + secs;
    }

    // this fixes the crossover from 59 minutes to 1 hour
    if (m === 60) {
        m = 0;
        h = h + 1;
    }

    if (m < 10) {
        m = "0" + m;
    }

    if (h === 0) {
        fulltime = m + ":" + secs;
    } else {
        fulltime = h + ":" + m + ":" + secs;
    }

    return fulltime;
}

/*!
 * contentloaded.js
 *
 * Author: Diego Perini (diego.perini at gmail.com)
 * Summary: cross-browser wrapper for DOMContentLoaded
 * Updated: 20101020
 * License: MIT
 * Version: 1.2
 *
 * URL:
 * https://github.com/dperini/ContentLoaded
 * http://javascript.nwbox.com/ContentLoaded/
 * http://javascript.nwbox.com/ContentLoaded/MIT-LICENSE
 *
 */

// @win window reference
// @fn function reference
function contentLoaded(win, fn) {

    var done = false, top = true,

    doc = win.document, root = doc.documentElement,

    add = doc.addEventListener ? 'addEventListener' : 'attachEvent',
    rem = doc.addEventListener ? 'removeEventListener' : 'detachEvent',
    pre = doc.addEventListener ? '' : 'on',

    init = function(e) {
        if (e.type == 'readystatechange' && doc.readyState != 'complete') return;
        (e.type == 'load' ? win : doc)[rem](pre + e.type, init, false);
        if (!done && (done = true)) fn.call(win, e.type || e);
    },

    poll = function() {
        try { root.doScroll('left'); } catch(e) { setTimeout(poll, 50); return; }
        init('poll');
    };

    if (doc.readyState == 'complete') fn.call(win, 'lazy');
    else {
        if (doc.createEventObject && root.doScroll) {
            try { top = !win.frameElement; } catch(e) { }
            if (top) poll();
        }
        doc[add](pre + 'DOMContentLoaded', init, false);
        doc[add](pre + 'readystatechange', init, false);
        win[add](pre + 'load', init, false);
    }

}

// classList polyfill by Remy Sharp
// https://github.com/remy/polyfills/blob/master/classList.js

(function () {

    if (typeof window.Element === "undefined" || "classList" in document.documentElement) return;

    var prototype = Array.prototype,
        push = prototype.push,
        splice = prototype.splice,
        join = prototype.join;

    function DOMTokenList(el) {
      this.el = el;
      // The className needs to be trimmed and split on whitespace
      // to retrieve a list of classes.
      var classes = el.className.replace(/^\s+|\s+$/g,'').split(/\s+/);
      for (var i = 0; i < classes.length; i++) {
        push.call(this, classes[i]);
      }
    };

    DOMTokenList.prototype = {
      add: function(token) {
        if(this.contains(token)) return;
        push.call(this, token);
        this.el.className = this.toString();
      },
      contains: function(token) {
        return this.el.className.indexOf(token) != -1;
      },
      item: function(index) {
        return this[index] || null;
      },
      remove: function(token) {
        if (!this.contains(token)) return;
        for (var i = 0; i < this.length; i++) {
          if (this[i] == token) break;
        }
        splice.call(this, i, 1);
        this.el.className = this.toString();
      },
      toString: function() {
        return join.call(this, ' ');
      },
      toggle: function(token) {
        if (!this.contains(token)) {
          this.add(token);
        } else {
          this.remove(token);
        }

        return this.contains(token);
      }
    };

    window.DOMTokenList = DOMTokenList;

    function defineElementGetter (obj, prop, getter) {
        if (Object.defineProperty) {
            Object.defineProperty(obj, prop,{
                get : getter
            });
        } else {
            obj.__defineGetter__(prop, getter);
        }
    }

    defineElementGetter(Element.prototype, 'classList', function () {
      return new DOMTokenList(this);
    });

})();