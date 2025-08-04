
const bcrypt = require("bcrypt");

const userSchema = new bcrypt.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
    

});

module.exports = bcrypt.model("User", userSchema);