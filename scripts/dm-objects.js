/**
 * A pair of Key and Value
 * @param {any} key
 * @param {any} value
 */
function KeyValue(key, value) {
    this.Key = key;
    this.Value = value;
}

/**
 * Ajax物件
 * @param {any} url
 * @param {any} act
 * @param {any} type
 * @param {any} code
 */
function AjaxObj(url, act, type, code) {
    this.Url = url;
    this.RequestAct = act;
    this.RequestType = type;
    this.Code = code;
}

/**
 * Requested action in AjaxObj
 */
var RequestAct = {
    None: 0,
    Insert: 1,
    Update: 2,
    Delete: 3,
    On: 4,
    Off: 5,
    View: 6,
    Select: 7,
    Make: 8,
    Retrieve: 9,
    Refresh: 10,
}
/**
 * Requested object type in AjaxObj
 */
var RequestType = {
    None: 0,
    News: 1,
    Portfolio: 2,
    GoogleNearBy: 9,
    Pics: 10,
}

/**
 * Requested Language Type
 */
var Language = {
    None: 0,
    Chlinese: 1,
    English: 2,
}