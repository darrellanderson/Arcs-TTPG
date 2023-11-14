try {
    module.exports = require("@tabletop-playground/api");
} catch {
    module.exports = require("./mock/index");
}
