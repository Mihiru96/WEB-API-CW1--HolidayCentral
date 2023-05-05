require('dotenv').config();
const mongoose = require('mongoose')
const constants = require('../common/constants');
const HolidayPackage = require('../models/holidayPackageModel')


exports.addHolidayPackage = async (req, res) => {
    try {

        // assign req body values
        let data = req.body;
        let packageName = data.name;

        console.log(data)

        const packageData = await HolidayPackage.findOne({
            'name': packageName
        })

        if (!packageData) {
            // create flight
            const package = await HolidayPackage.create({

                packageName: packageName,
                startDate: data.startDate,
                endDate: data.endDate,
                headsPerPackage: data.headsPerPackage,
                flightId: data.flightId,
                hotelId: data.hotelId,
                image: data.image, 
                isActive: true

            })
            res.status(200).json({ message: constants.MsgAddPackageSuccessfully })
        }
        else {
            res.status(403).json({ message: constants.MsgPackageExist })
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message })
    }
}

exports.getAllPackages = async (req, res) => {
    try {

        const packages = await HolidayPackage.find()
        res.status(200).json(packages);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message })
    }
}

exports.UpdatePackage = async (req, res) => {
    try {

        // assign req body values
        let data = req.body;
        let packageName = data.name;

        console.log(data)

        const packageData = await HolidayPackage.findOne({
            'name': packageName
        })

        if (!packageData) {
            // create flight
            const package = await HolidayPackage.updateOne({

                packageName: packageName,
                startDate: data.startDate,
                endDate: data.endDate,
                headsPerPackage: data.headsPerPackage,
                flightId: data.flightId,
                hotelId: data.hotelId,
                image: data.image, 
                isActive: true

            })
            res.status(200).json({ message: constants.MsgUpdateHolidayPackageSuccessfully })
        }
        else {
            res.status(403).json({ message: constants.MsgPackageExist })
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message })
    }

exports.searchPackages = async (req, res) => {
    try {
        // assign req body values
        let data = req.body;
        let startDate = data.startDate;
        let endDate = data.endDate;
        let headsPerPackage = data.headsPerPackage;
        let flightId = data.flightId;
        let hotelId = data.hotelId;

        console.log(data)

        const package = await package.find({
            'startDate': new Date(startDate),
            'endDate': new Date(endDate),
            'headsPerPackage': headsPerPackage,
            'flightID': flightId,
            'hotelID': hotelId,
        })
        res.status(200).json({ package: package });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message })
    }
}
}