'use-strict';
console.log("hello world");
// * @ html elements
const tableHTMLELEMENT = document.getElementById("main-table");
const loaderHTMLELEMENT = document.getElementById("loader");

// * @ regex for detecting a image
const valid_image_url = /^(http(s?):)([/|.|\w|\s|-])*\.(?:svg)/g;

loadingCycleToggler(loaderHTMLELEMENT, tableHTMLELEMENT, false);
function build_table(table) {
    const columns = Object.keys(table[0])
    const full_columns = (["#"].concat(columns));
    // const thead =
    //     `<thead> 
    //     <tr>
    //         ${full_columns.map((column_name) => {
    //         return `<th scope="col">
    //                 ${column_name}
    //             </th>`;
    //     }).reduce((p, c) => p + c)}
    //     </tr>
    // </thead>`;
    const tbody = `<tbody> 
            ${table.map((row, k) => {
           return `
                ${(2 + 2)
            < {/* tr>
                    <th>USER ID</th>
                    <th>ID</th>
                    <th>TITTLE</th>
                    <th>COMPLETED</th>
                </tr> */}
            }
                    <tr> 
                        ${full_columns.map((column_name) => {

                     return `
                            <th> 
                                ${column_name.toUpperCase()}
                            </th> 
                    `}).reduce((p,c) => p + c)
            }
                    <tr>
                    <tr onclick="fetch_details('${row.official_name}')" class="table--row row__with_pointer">
                        <th scope="row"> 
                            ${k + 1}
                        </th> 
                        ${Object.keys(row)
                .map((key) => {
                    const value = row[key];
                    const is_image = valid_image_url.test(value);
                    return `
                            <th>
                                ${is_image ? `
                                        <img src="${value}" class="img-fluid"> 
                                    ` : value
                        } 
                            </th> 
                            `;
                }).reduce((p, c) => p + c)
            }            
                    </tr>`
    }).reduce((p, c) => p + c)
        }
    </tbody>`


    tableHTMLELEMENT.innerHTML = tbody;
    tableHTMLELEMENT.hidden = false;
}
/**
 * @description auto execution expression just to add the rows to the current table
 */

(async function load_contry_list() {
    const country_list = await fetch(endpoints.countries_endpoint).then((response) => response.json())
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
            })).sort((a, b) => a.official_name.localeCompare(b.official_name))
        );

    build_table(country_list);
    loadingCycleToggler(loaderHTMLELEMENT, tableHTMLELEMENT, !false);
})();




