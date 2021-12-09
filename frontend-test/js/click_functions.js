/**
 * @description this function fetches the details about a given country from the wikipedia api
 * @param country_name string 
 */
async function fetch_details(country_name) {
    const extracted_html = await fetch(endpoints.country_endpoint + country_name)
        .then((response) => (response.json()))
        .catch((err) => console.log(err))
        .then((response_data) => response_data.extract_html);
    invoke_dialog(extracted_html, country_name);
}

function invoke_dialog(html, country_name) {
    bootbox.alert({
        message: html,
        size: 'lg',
        title: country_name
    });
}


function get_borders(country_name) {
    const country_raw_data = raw_country_list.find((country) => country.name.official === country_name);
    const has_borders = checkIfNullish(country_raw_data.borders);
    if(has_borders) {
        setCountryTitle(country_name);
        getCountryList(country_raw_data.borders);
        countryDisplayer.scrollIntoView({behavior:"smooth"});
    } else {
        setCountryTitle(null);
        window.alert(`${country_name} has no borders`);
    }
}   

async function fetch_border_details(country_name) {
    const data = await fetch(endpoints.country_endpoint + country_name)
    .then((response) => (response.json()))
    .catch((err) => console.log(err))
    .then((response_data) => response_data);
    invoke_dialog_with_map(country_name,data);
}

function invoke_dialog_with_map(country_name, data) {
    const final_html  = data.extract_html + `<div id="googleMap" class="google-maps-frame"></div>`;
    bootbox.alert({
        message:final_html,
        size:'lg',
        title:country_name
    })
    initMap(data);
}

function initMap({coordinates}) {
    const map_reference = document.getElementById("googleMap");
    let map;
    map = new google.maps.Map(map_reference, {
        center: { lat: coordinates.lat, lng: coordinates.lon },
        zoom: 4,
    });
}