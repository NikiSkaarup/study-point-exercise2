/**
 * Created by Niki Skaarup
 */

$ = function (input, multiple) {
    multiple = (typeof multiple === 'undefined') ? false : multiple;
    if(input.length < 1)
        return null;

    var identifier = input.substring(0,1);

    if(identifier === '#')
        return document.getElementById(input.substring(1));

    if(identifier === '.')
        return document.getElementsByClassName(input.substring(1));

    var result = document.getElementsByTagName(input.toUpperCase());

    if(multiple)
        return result;

    if(result.length > 0)
        return result[0];
};

// var bluebox = $(".bluebox");
// for (var i = 0; i < bluebox.length; i++) {
//     bluebox[i].onclick = function () {
//         this.style.border = "2px solid #00f";
//     };
// }

// var redbox = $("#redbox");
// redbox.onclick = function () {
//         this.style.border = "2px solid #f00";
// };
