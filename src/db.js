const mongoose = require("mongoose");
const connect = () => {
    mongoose
        .connect(
            "mongodb://localhost/test",
            { useNewUrlParser: true }
        )
        .then(() => console.log("🚀 connect mongodb success"))
        .catch(() => console.log("connect mongodb failed"));
};

module.exports = connect;
