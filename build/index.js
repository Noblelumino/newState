"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_ejs_layouts_1 = __importDefault(require("express-ejs-layouts"));
const path_1 = __importDefault(require("path"));
// Setting up Express and Port
const app = (0, express_1.default)();
const PORT = parseInt(process.env.PORT || '3000', 10);
// Setting up the view engine to render EJS templates
app.set('view engine', 'ejs');
// Setting up the views directory
app.set('views', path_1.default.join(__dirname, 'views'));
// Setting layout to avoid duplicating headers and footers
app.set('layout', 'layouts/layout');
app.use(express_ejs_layouts_1.default);
// Setting up the static files directory
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
// Import all routes to the server
const index_1 = __importDefault(require("./routes/index"));
const property_1 = __importDefault(require("./routes/property"));
// Use routers imported
app.use('/', index_1.default);
app.use('/property', property_1.default);
// Starting the server
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});
