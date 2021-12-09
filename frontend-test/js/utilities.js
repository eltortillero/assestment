


/**
* @description this function return an array of strings based on a object with either numeric or string 
* @param obj object<string || numeric>
* @returns Array<string>
*/
var extractValuesFromKeys = function extractValuesFromKeys(obj) {
    const valid_object = (obj !== undefined && typeof obj === "object");
    return valid_object ? Object.keys(obj).map((key) => (obj[key])) : [];
}
/**
* @description this function reduces a array of string to make a single sentence of it.
* @param str_arr Array<string>
* @param default_message string
* @returns string;
*/
var reduceToString = function reduceToString(str_arr, default_message) {
    const valid_array = (str_arr !== undefined && typeof str_arr === "object" && str_arr.length > 0);
    return valid_array ? str_arr.reduce((f, l) => `${f}, ${l} `) : default_message;
}



/**
 * @description this function loading cycler 
 * @param loaderElement HTMLElement
 * @param tableElement HTMLElement
 * @param state_to_toggle boolean
 */

var loadingCycleToggler = function loadingCycleToggler(loaderElement, tableElement, state_to_toggle) {
    loaderElement.hidden = state_to_toggle;
    tableElement.hidden = !state_to_toggle;
}


var getCountryList = async function getCountryList(borders) {
    const contriesOnBorder = [];
    for (let j = 0; j < borders.length; j++) {
        const spelling = borders[j];
        contriesOnBorder.push(await getByAltSpelling(spelling));
    }
    border_country_list = contriesOnBorder.map(translatedTableModel).sort(filterAscByName);
    buildDefaultTable(border_country_list);

}

var getClickedCountry = function getClickedCountry(country_name) {
    const _clicked = raw_country_list.find((country) => country.name.official === country_name);
}

var getByAltSpelling = async function getByAltSpelling(spelling) {
    const searchedCountry = standarized_country_list.find((country) => country.standard_search_code.includes(spelling));
    const translated_name = await retrieveSpanishContext(searchedCountry.standard_search_code[0]);
    return { ...searchedCountry, translated_name: translated_name };
}


var checkIfNullish = (toCheck) => ((toCheck !== null) && (toCheck !== undefined));


var buildDefaultTable = function buildDefaultTable(country_list) {

    const columns = ["#", ...Object.keys(country_list[0])];
    bordersTableHTMLElement.innerHTML = `
    <thead>
        <tr>
            ${columns.map((column_name) => ` <th scope="col">${column_name}</th>`).reduce(reduceForHTML)}
        </tr>
    </thead>
  <tbody>
    ${country_list.map((country_row, k) => `
        <tr class="row__with_pointer table--row" onclick="fetch_border_details('${country_row.official_name}')">
            <th scope="row">${k + 1}</th>
            ${Object.values(country_row).map((value) => `
                  <td>
                    ${valid_image_url.test(value) ? `<img src='${value}' class="img-fluid">` : value
        }
                  </td>
                `).reduce(reduceForHTML)
        }
          
        </tr>

    `).reduce(reduceForHTML)}
  </tbody>`;
}

var setCountryTitle = function setCountryTitle(country_name) {
    if (checkIfNullish(country_name)) {
        countryDisplayer.innerHTML = `Contries that have a border with ${country_name}`;
    } else {
        const HTMLElements = [countryDisplayer, bordersTableHTMLElement];
        HTMLElements.map((element) => {
            element.innerHTML = "";
        });
    }
}

async function retrieveSpanishContext(country_code) {
    return fetch(endpoints.translated_country + country_code)
        .then((res) => res.json())
        .catch((err) => console.log(err))
        .then((response_data) => response_data[0].translations.spa.official);
}

var log = function log(x) {
    console.log(x)
}