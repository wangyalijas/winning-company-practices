Array.prototype.deleteItems = function (ids, filterEmpty = true) {
    var result = this.slice();
    if (typeof ids === 'object' && ids.constructor === [].constructor) {

        ids.sort(function (a, b) {
            return b > a;
        }).forEach(function (value) {

            if (filterEmpty) {
                result.splice(value, 1);
            } else {
                delete result[value]
            }
            console.log(result);
        });

    }
    console.log(result);
    return result;
};

[1, 2, 3, 4, 5, 6].deleteItems([1, 2, 3], false);
