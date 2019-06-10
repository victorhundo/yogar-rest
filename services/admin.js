//Libraries
const express = require('express');
var auth = require('../modules/authControl');

//controllers
var admin = require('../controllers/admin');

const app = express();

var routerAuthID = express.Router();
routerAuthID.use(auth.authorizeUser);

// Admin routes
app.route('/')
    .get(routerAuthID, admin.getAdmins)
    .post(admin.postAdmin);
app.route('/:id')
    .get(routerAuthID, admin.getAdmin)
    .delete(routerAuthID, admin.deleteAdmin)
    .put(routerAuthID, admin.updateAdmin);

module.exports = app;
