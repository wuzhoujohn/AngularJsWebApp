/// <reference path="Script.js" />
//this filter is for changing number to actual hobby
app.filter("hobby", function () {
    return function (hobby) {
        switch (hobby) {
            case 1:
                return "Music";
            case 2:
                return "Hockey";
            case 3:
                return "Football";
        }
    }
});