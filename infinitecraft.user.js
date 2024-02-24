// ==UserScript==
// @name         Infinite Craft Dark Mode
// @namespace    https://github.com/gpduck/tampermonkey/infinitecraft
// @version      2024-02-24.0
// @description  Adds dark mode to neal.fun's Infinite Craft
// @author       Chris Duck
// @match        https://neal.fun/infinite-craft/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=neal.fun
// @downloadURL  https://github.com/gpduck/tampermonkey/raw/main/infinitecraft.user.js
// @updateURL    https://github.com/gpduck/tampermonkey/raw/main/infinitecraft.user.js
// @grant        GM_addStyle
// ==/UserScript==

function enableDarkMode() {
    const css = `
        :root {
            --main-bg-color: #3a3a3a;
            --dark-bg-color: #181818;
            --border-color: #ff0000;
            --main-text-color: #e0e0e0;
        }

        html {
            background: var(--main-bg-color);
        }

        .site-title, .logo, .side-controls {
            filter: invert(1);
        }

        .sidebar {
            background: var(--main-bg-color) !important;
        }

        .item {
            background: var(--dark-bg-color) !important;
            color: var(--main-text-color);
        }

        .sidebar-controls-fade-show:after {
            background: linear-gradient(180deg, hsla(0,0%,100%,0), hsla(0,0%,10%,.9)) !important;
        }

        .sidebar {
            border-left: 1px solid var(--border-color) !important;
        }

        .sidebar-controls, .sidebar-sorting, .sidebar-sorting-item {
            background: var(--dark-bg-color) !important;
            color: var(--main-text-color);
        }

        .sidebar-sorting, .sidebar-input {
            border-top: 1px solid var(--border-color) !important;
        }

        .sidebar-sorting-icon {
            filter: invert(1);
        }

        input {
            color: var(--main-text-color);
        }

        .reset {
            color: var(--main-text-color);
        }
    `;

    GM_addStyle(css);
}

(function() {
    'use strict';

    enableDarkMode();
})();