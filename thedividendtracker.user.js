// ==UserScript==
// @name         Dividend Tracker UI Tweaks
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Remove max-width CSS property from the .max-w-6xl class on the Dividend Tracker website
// @icon         https://www.google.com/s2/favicons?sz=64&domain=thedividendtracker.com
// @author       Chris Duck
// @match        https://thedividendtracker.com/portfolio/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    const css = `
        .max-w-6xl {
            max-width: none !important;
        }
    `
    GM_addStyle(css);
})();
