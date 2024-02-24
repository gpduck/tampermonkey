// ==UserScript==
// @name         Vanguard UI Tweaks
// @namespace    https://github.com/gpduck/tampermonkey/vanguard
// @version      1.0.0
// @description  Makes tables more compact and adds CSV download to cost basis tables.
// @author       Chris Duck
// @match        https://cost-basis.web.vanguard.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=personal.vanguard.com
// @grant        none
// @run-at       document-end
// ==/UserScript==

function startObserving() {
    const accordionBodies = document.querySelectorAll('.c11n-accordion__body-content');

    accordionBodies.forEach(element => {
        const observer = new MutationObserver((mutationsList, observer) => {
            for(const mutation of mutationsList) {
                if(mutation.type === 'childList') {
                    observer.disconnect();
                    addCPS(mutation.target);
                    addCSVButton(element);
                    console.log('expanded', mutation.target);
                    observer.observe(element, { childList: true, subtree: true });
                }
            }
        });

        observer.observe(element, { childList: true, subtree: true });
    });
}

function addCPS(body) {
    body.querySelectorAll('tr[app-holdings-row]').forEach( row => {
        console.log('check row', row);
        //if(row.children[3].innerText === '—') {
            let qty = Number(row.children[2].textContent.replace(',', ''));
            let cost = row.children[4].textContent.trim().replace('$', '').replace(',', '');
            let costPer = Math.round(100 * cost/qty, 2) / 100;
            console.log({ qty, cost, costPer});
            row.children[3].innerText = costPer;
        //}
    });
}

function addCSVButton(accordion) {
    let holdingLinks = accordion.querySelector('ul.holding-links');
    if(holdingLinks && !holdingLinks?.querySelector('button#csv')) {
        let instanceAttributeName;
        holdingLinks.getAttributeNames().forEach( name => {
            if(name != 'class') {
                instanceAttributeName = name;
            }
        });
        //excelWrapper.style.display = 'flex';
        let buttonContainer = document.createElement('li');
        buttonContainer.classList.add('download-excel');
        buttonContainer.setAttribute(instanceAttributeName, '');
        buttonContainer.innerHTML = `<div class="download-btn" ${instanceAttributeName}><button id="csv" ${instanceAttributeName} class="c11n-button c11n-button--small c11n-button--trailing-icon-secondary"><span ${instanceAttributeName} class="c11n-button__box">CSV</span></button></div>`;
        holdingLinks.appendChild(buttonContainer);
        buttonContainer.addEventListener('click', () => {
            const holdings = [];
            let table = accordion.querySelector('.cost-basis-table');
            table.querySelectorAll('tr[app-holdings-row]').forEach( row => {
                let holding = row.querySelector('th span')?.innerText;
                if(!holding) { return };
                let [ ,quantityTd,costTd] = row.querySelectorAll('td');
                let data = {
                    ticker: holding,
                    quantity: Number.parseFloat(quantityTd.innerText.replaceAll(',', '')),
                    cost: Number.parseFloat(costTd.innerText),
                };
                holdings.push(data);
            });
            let csv = '';
            holdings.forEach( holding => csv = `${csv}${holding.ticker},${holding.quantity},${holding.cost}\r\n` );
            navigator.clipboard.writeText(csv);
            console.log(csv);
        });
    }
}

(function() {
    'use strict';
    setTimeout( () => {
        startObserving();

        for(let td of document.getElementsByClassName('c11n-table__td')) {
            td.style.paddingRight = '0px';
            td.style.padding = '0px';
            if(td.innerText.startsWith('Specific identification')) {
                td.innerText = '(SpecID)';
            }
            console.log(td);
        }
        for(let div of document.getElementsByClassName('holding_description')) {
            div.style.display = 'none';
        }
        console.log("hello");
    }, 4000);

    setTimeout( () => {
        /*
        document.querySelectorAll('tr[app-holdings-row]').forEach( row => {
            if(row.children[3].innerText === '—') {
                let qty = Number(row.children[2].innerText.replace(',', ''));
                let cost = row.children[4].innerText.replace('$', '').replace(',', '');
                let costPer = Math.round(100 * cost/qty, 2) / 100;
                row.children[3].innerText = costPer;
            }
        });
        */
    }, 4000);
})();