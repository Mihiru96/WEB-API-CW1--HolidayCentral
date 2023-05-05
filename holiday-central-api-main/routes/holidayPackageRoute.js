const express = require('express');
const routers = express.Router();
const holidayPackageController = require('../controllers/holidayPackageController');

// DB Connection Test
routers.post('/addPackage', holidayPackageController.addHolidayPackage);
routers.get('/getAllPackage', holidayPackageController.getAllPackages);
routers.put('/updatePackage', holidayPackageController.updatepackage);
routers.post('/searchPackage', holidayPackageController.searchPackages);

module.exports = routers;