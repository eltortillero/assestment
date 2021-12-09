


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
 * @param htmlElement HTMLElement
 * @param state_to_toggle boolean
 */

var loadingCycleToggler = function loadingCycleToggler(loaderElement, htmlElement,state_to_toggle) {
    loaderElement.hidden = state_to_toggle;
    htmlElement.hidden = !state_to_toggle;
}