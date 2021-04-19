"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./config/app");
const envronment_1 = require("./envronment");
const PORT = envronment_1.default.getPort();
app_1.default.listen(PORT, () => {
    console.log("App running on port:" + PORT);
});
