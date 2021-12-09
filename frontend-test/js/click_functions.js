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
