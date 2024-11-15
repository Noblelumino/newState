"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/list', (req, res) => {
    res.render('property-list');
});
router.get('/type', (req, res) => {
    res.render('property-type');
});
router.get('/agent', (req, res) => {
    res.render('property-agent');
});
// Posting properties (placeholder for future implementation)
// router.post('/add', (req: Request, res: Response) => {
//     // Logic for posting properties will go here
// });
exports.default = router;
