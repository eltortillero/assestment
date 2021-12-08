console.log("hello world");

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

/**
 * @description auto execution expression just to add the rows to the current table
 */

(async function load_contry_list() {
   const country_list = await fetch("https://restcountries.com/v3.1/all").then((response) => {
        const parsed_response = response.json();
        return parsed_response;
    }).catch((err) => {
        console.log(err);
    }).then((parsed_response) => {
        const countries = parsed_response.map((country) => ({
            official_name: country.name.official,
            capital: reduceToString(country.capital, "No capital city"),
            region: country.region,
            language: reduceToString(extractValuesFromKeys(country.languages), "No official language"),
            population: country.population,
            flag_image: country.flags.svg,
        }));
        return countries;
    });
    console.log(country_list);
})();
