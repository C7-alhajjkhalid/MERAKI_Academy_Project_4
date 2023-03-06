const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

mongoose.connect(process.env.DB_URI).then((result) => {
  console.log("DB connected");
});
