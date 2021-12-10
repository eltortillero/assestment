console.log("hello world");
// * @ html elements
var tableHTMLELEMENT = document.getElementById("main-table");
var loaderHTMLELEMENT = document.getElementById("loader");
var bordersTableHTMLElement = document.getElementById("borders-table");
var fieldFilterHTMLElement = document.getElementById("field_filter");
var countryDisplayer = document.getElementById("selected-country-displayer");
// * @ regex for detecting a image
var valid_image_url = /^(http(s?):)([/|.|\w|\s|-])*\.(?:svg)/g;

loadingCycleToggler(loaderHTMLELEMENT, tableHTMLELEMENT, false);
function build_table(table) {
    const columns = Object.keys(table[0]);
    filter_options = columns;
    const full_columns = (["#"].concat(columns));
    const thead =
        `<thead> 
        <tr>
            ${full_columns.map((column_name) => {
            return `<th scope="col">
                    ${column_name}
                </th>`;
        }).reduce((p, c) => p + c)}
        <th>
            information
        </th>
        <th>
            borders
        </th>
        </tr>
    </thead>`;
    const tbody = `<tbody> 
            ${table.map((row, k) => {
            return `
     
                    <tr class="table--row row__with_pointer">
                        <th scope="row"> 
                            ${k + 1}
                        </th> 
                        ${Object.keys(row)
                    .map((key) => {
                        const value = row[key];
                        const is_image = valid_image_url.test(value);
                        return `
                            <td>
                                ${is_image ? `
                                        <img src="${value}" class="img-fluid"> 
                                    ` : (key === "language") ? 
                                    `<button type="button" class="wk-button button--green" onclick="get_languages_for_main_country('${row.official_name}')"> ${value} </button> ` : 
                                    value
                            } 
                            </td> 
                            `;
                    }).reduce((p, c) => p + c)
                }   
                        <td class="text-center">
                            <button type="button" class="wk-button button--red" onclick="fetch_details('${row.official_name}')"> 
                                wiki
                            </button>
                        </td>
                        <td class="text-center"> 
                             <button type="button" class="wk-button button--blue" onclick="get_borders( '${ row.official_name}' )"> 
                                borders
                             </button>
                        </td>         
                    </tr>`
        }).reduce((p, c) => p + c)
        }
    </tbody>`


    // thead
    tableHTMLELEMENT.innerHTML = (thead + tbody);
    tableHTMLELEMENT.hidden = false;
}
/**
 * @description auto execution expression just to add the rows to the current table
 */

(async function load_contry_list() {
    const country_list = await fetch(endpoints.countries_endpoint).then((response) => response.json())
        .catch((err) => console.log(err))
        // * @ transform the data into the given data pattern
        .then((parsed_response) => {
            const raw_data = parsed_response;
            raw_country_list = parsed_response;
            return raw_data.map(standardViewModel).sort(filterAscByName);
        }
        );

    build_table(country_list);
    loadingCycleToggler(loaderHTMLELEMENT, tableHTMLELEMENT, true);
    let options = {
        numberPerPage: 8, //Cantidad de datos por pagina
        goBar: true, //Barra donde puedes digitar el numero de la pagina al que quiere ir
        pageCounter: true, //Contador de paginas, en cual estas, de cuantas paginas
    };
    paginate.init('#main-table', options);
    standarized_country_list = raw_country_list.map((country) => ({...country, standard_search_code:[country.cca2, country.cca3, country.cioc]}))
    console.log(filter_options)
})();

