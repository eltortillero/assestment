
/**
 * @description this function returns all the needed fields for the default table
 * @yields {we changed the language field from a string made of the languages to single string to show the languages}
 * @function pre-version reduceToString(extractValuesFromKeys(country.languages), "No official language")
 * @param country 
 * @returns standardViewModel
 */

var standardViewModel = (country) => ({
    official_name: country.name.official,
    capital: reduceToString(country.capital, "No capital city"),
    region: country.region,
    language: "View languages",
    population: country.population,
    flag_image: country.flags.svg,
});

/**
 * @description this function returns the data model needed for borders table
 * @param country 
 * @returns translatedTableModel
 */

var translatedTableModel = (country) => ({
    official_name: country.name.official,
    translated_name: country.translated_name,
    capital: reduceToString(country.capital, "No capital city"),
    region: country.region,
    language: "View languages",
    population: country.population,
    flag_image: country.flags.svg,
})

var reduceForHTML = (p, c) => (p + c);

var filterAscByName = (x, y) => x.official_name.localeCompare(y.official_name);
var filterDescByName = (x, y) => y.official_name.localeCompare(x.official_name);

var compareAsc = (x,y) => x.localeCompare(y);
var compareDesc = (x,y) => y.localeCompare(x);