/**
 * Ajax Download
 * @Author   SHMY
 * @DateTime 2017-01-29T09:38:39+0800
 */
(function (global, factory) {
    // CommonJs
    typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory :
        // Amd
        typeof define === "function" && define.amd ? define(factory) :
        // For Vue.js
        // global.Vue ? (global.Vue.download = global.Vue.prototype.$download = factory) :
        // Browser Global
        (global.$download = factory);
})(this, function (url, fields, method) {
    var iframeName = "__iframe_downloader__";
    var iframe = document.querySelector("iframe[name=" + iframeName + "]");
    if (!!iframe === false){
        iframe = document.createElement("iframe");
        iframe.style.display = "none";
        iframe.name = iframeName;
        document.body.appendChild(iframe);
    }
    method = method || "POST";
    // http://qa.helplib.com/114820
    var traverse = function (obj, key) {
        key = key || "";
        var result = [];
        for (var prop in obj) {
            var value = obj[prop];
            // key + "[" + prop + "]" || `${key}[${prop}]`
            typeof value === "object" ? result.push.apply(result, traverse(value, key + "[" + prop + "]")) : result.push({ name: key ? key + "[" + prop + "]" : prop, value: value });
        }
        return result;
    }
    var form = document.createElement("form");
    // Throw error in Microsoft Edge
    // form.enctype = "application/json";
    form.style.display = "none";
    form.target = iframeName;
    form.method = method;
    form.acceptCharset = "utf-8";
    form.action = url;
    var inputs = document.createDocumentFragment();
    fields = traverse(fields);
    fields.forEach(function (field) {
        var input = document.createElement("input");
        input.name = field.name;
        input.value = field.value;
        inputs.appendChild(input);
    });
    form.appendChild(inputs);
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
});
