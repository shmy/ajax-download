const express = require("express");
const  bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use("/", express.static("../"));
app.post("/download", (req, res) => {
    res.setHeader("Content-Type", "application/force-download");
    // res.setHeader("Content-Type", "application/octet-stream");
    // res.setHeader("Content-Type", "application/download");
    res.setHeader("Content-Disposition", "attachment; filename=" + "Report.txt");
    res.send(req.body);
});
app.listen(3000, () => {
    console.log("listen to 3000");
});