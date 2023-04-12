/**
 * Sorts a HTML table.
 * 
 * @param {HTMLTableElement} table The table to sort
 * @param {number} column The index of the column to sort
 * @param {boolean} asc Determines if the sorting will be in ascending
 */
function sortTableByColumn(table, column, asc = true) {
    // console.log(table, column, asc);
    const dirModifier = asc ? 1 : -1;
    const tBody = table.tBodies[0];
    const rows = Array.from(tBody.querySelectorAll("tr"));

    // Sort each row
    const sortedRows = rows.sort((a, b) => {
        const aColText = a.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim();
        const bColText = b.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim();

        return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
    });

    // Remove all existing TRs from the table
    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }

    // Re-add the newly sorted rows
    tBody.append(...sortedRows);

    // Remember how the column is currently sorted
    table.querySelectorAll("thead td, th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
    table.querySelector(`thead td:nth-child(${ column + 1}), th:nth-child(${ column + 1})`).classList.toggle("th-sort-asc", asc);
    table.querySelector(`thead td:nth-child(${ column + 1}), th:nth-child(${ column + 1})`).classList.toggle("th-sort-desc", !asc);
}

document.querySelectorAll(".table-sortable thead td, .table-sortable th").forEach(headerCell => {
    var parentEl = document.createElement("span");
    parentEl.setAttribute("class", "ico-parent-span");

    var up = document.createElement("span");
    up.innerHTML = '&#x25b4;';
    up.setAttribute("class", "ico-up-sort");

    var down = document.createElement("span");
    down.innerHTML = '&#x25be;';
    down.setAttribute("class", "ico-down-sort");

    parentEl.appendChild(up);
    parentEl.appendChild(down);
    // console.log(headerCell.classList.contains('disable-sort'))
    if (!headerCell.classList.contains('disable-sort')) {
        headerCell.appendChild(parentEl);
        headerCell.addEventListener("click", () => {
            const tableElement = headerCell.parentElement.parentElement.parentElement;
            const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
            const currentIsAscending = headerCell.classList.contains("th-sort-asc");
            for(i= 0; i < headerCell.parentElement.children.length; i++) {
                if (!headerCell.parentElement.children[i].classList.contains('disable-sort')) {
                    sortSpan = headerCell.parentElement.children[i].children[0];
                    sortSpan.removeAttribute("style", "display:none");
                }
            }
            headerCell.children[0].setAttribute("style", "display:none");
            sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
        });
    }

});
