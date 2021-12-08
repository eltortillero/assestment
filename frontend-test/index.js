console.log("hello world");
const tableHTMLELEMENT = document.getElementById("main-table");
const loaderHTMLELEMENT = document.getElementById("loader");
const valid_image_url = /^(http(s?):)([/|.|\w|\s|-])*\.(?:svg)/g; 
loading_cycle_toggler(false);

// * @ current data_structure for countries
/*
 {
    official_name,
    capital,
    region,
    language,
    population,
    flag_image,
 }
*/

/**
 * @description this function reduces a array of string to make a single sentence of it.
 * @param {*} str_arr : Array<string>
 * @param {*} default_message : string
 * @returns string;
 */

function reduceToString(str_arr, default_message) {
    const valid_array = (str_arr !== undefined && typeof str_arr === "object" && str_arr.length > 0);
    return valid_array ? str_arr.reduce((f, l) => `${f}, ${l} `) : default_message;
}

/**
 * @description this function return an array of strings based on a object with either numeric or string 
 * @param {*} obj : object<string || numeric>
 * @returns Array<string>
 */

function extractValuesFromKeys(obj) {
    const valid_object = (obj !== undefined && typeof obj === "object");
    return valid_object ? Object.keys(obj).map((key) => (obj[key])) : [];
}


function loading_cycle_toggler(state_to_toggle){
    loaderHTMLELEMENT.hidden = state_to_toggle;
    tableHTMLELEMENT.hidden = !state_to_toggle;
    
}

function build_table(table) {
    const columns = Object.keys(table[0]) 
    const full_columns = (["#"].concat(columns));
    const thead =
        `<thead> 
        <tr>
            ${full_columns.map((column_name) => {
             return `<th scope="col">
                    ${column_name}
                </th>`;
        }).reduce((p,c) => p + c)}
        </tr>
    </thead>`;
    const tbody = `<tbody> 
            ${
                table.map((row,k) => {
                    return `
                    <tr>
                        <th scope="row"> 
                            ${k + 1}
                        </th> 
                        ${Object.keys(row)
                            .map((key) => {
                            const value = row[key];
                            const is_image = valid_image_url.test(value);
                            return `
                            <td>
                                ${
                                    is_image ? `
                                        <img src="${value}" class="flag"> 
                                    ` : value 
                                } 
                            </td> 
                            `;
                        }).reduce((p,c) => p + c)
                    }            
                    </tr>`
                }).reduce((p,c) => p + c)
            }
    </tbody>`
            

    tableHTMLELEMENT.innerHTML = (thead + tbody)
    tableHTMLELEMENT.hidden = false;
}



/**
 * @description auto execution expression just to add the rows to the current table
 */

(async function load_contry_list() {
    const country_list = await fetch("https://restcountries.com/v3.1/all").then((response) => response.json())
        .catch((err) => console.log(err))
        // * @ transform the data into the given data pattern
        .then((parsed_response) =>
            parsed_response.map((country) => ({
                official_name: country.name.official,
                capital: reduceToString(country.capital, "No capital city"),
                region: country.region,
                language: reduceToString(extractValuesFromKeys(country.languages), "No official language"),
                population: country.population,
                flag_image: country.flags.svg,
            }))
            // .sort((a,b) => a.official_name.localeCompare(b.official_name))
        );

    build_table(country_list);
    loading_cycle_toggler(!false);
})();



