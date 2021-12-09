var standardViewModel = (country) => ({
    official_name: country.name.official,
    capital: reduceToString(country.capital, "No capital city"),
    region: country.region,
    language: reduceToString(extractValuesFromKeys(country.languages), "No official language"),
    population: country.population,
    flag_image: country.flags.svg,
});

var translatedTableModel = (country) => ({
    official_name: country.name.official,
    translated_name: country.translated_name,
    capital: reduceToString(country.capital, "No capital city"),
    region: country.region,
    language: reduceToString(extractValuesFromKeys(country.languages), "No official language"),
    population: country.population,
    flag_image: country.flags.svg,
})

var reduceForHTML = (p,c) => (p + c);

var filterAscByName = (x,y) => x.official_name.localeCompare(y.official_name);
var filterDescByName = (x,y) => y.official_name.localeCompare(x.official_name);