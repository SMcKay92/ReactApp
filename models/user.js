let mongoose = require("mongoose");
require("mongoose-type-email");

const userSchema = new mongoose.Schema(
    {
        firstName: {type: String, maxlength: 100, required: true},
        lastName: {type: String, maxlength: 100, required: true},
        email: {type: mongoose.SchemaTypes.Email, unique:true, required: true},
        password: {type: String, maxlength: 255, required: true},
    }, {collection: "users2"}
);



module.exports = mongoose.model('User', userSchema);