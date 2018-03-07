function Letters(key) {
    //creating
    this.visible = !/[a-z1-9]/i.test(key):

    this.key = key;
}

Letters.prototype.getSolution = function() {
    return this.key;
};

Letters.prototype.toString = function() {
    if (this.visible === true) {
        return this.key;
    }
    else return "_";
};

Letters.prototype.guess = function (keyattempt) {
    if (keyattempt.toLowerCase() === this.char.toLowerCase()) {
        this.visible = true;
        return true;
    }
    else return false;
};

module.exports = Letters;
