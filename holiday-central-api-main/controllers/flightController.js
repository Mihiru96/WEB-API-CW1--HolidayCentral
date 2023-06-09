require('dotenv').config();
const mongoose = require('mongoose')
const constants = require('../common/constants');
const Flight = require('../models/flightModel');


exports.addFlight = async (req, res) => {
    try {

        // assign req body values
        let data = req.body;
        let flightNo = data.flightNo;

        console.log(data)

        const flightData = await Flight.findOne({
            'flightNo': flightNo
        })

        if (!flightData) {
            // create flight
            const flight = await Flight.create({

                flightNo: flightNo,
                departureDestination: data.departureDestination,
                arrivalDestination: data.arrivalDestination,
                depatureDate: data.depatureDate,
                arrivalDate: data.arrivalDate,
                airline: data.airline,
                transitTime: data.transitTime,
                economyClass: {
                    price: data.economyPrice,
                    availableTickets: data.economyAvlTickets,
                },
                businessClass: {
                    price: data.businessPrice,
                    availableTickets: data.businessAvlTickets
                },
                isActive: true

            })
            res.status(200).json({ message: constants.MsgAddFlightSuccessfull })
        }
        else {
            res.status(403).json({ message: constants.MsgFlightExist })
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message })
    }
}

exports.getAllFlights = async (req, res) => {
    try {

        const flights = await Flight.find({
            'isActive': true
        })
        res.status(200).json({ flights: flights });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message })
    }
}

exports.updateFlight = async (req, res) => {
    try {

        // assign req body values
        let data = req.body;
        let id = data._id;

        console.log(data)

        const flightData = await Flight.findOne({
            '_id': id
        })

        if (!flightData) {
            // create flight
            const flight = await Flight.updateOne({

                flightNo: data.flightNo,
                departureDestination: data.departureDestination,
                arrivalDestination: data.arrivalDestination,
                depatureDate: data.depatureDate,
                arrivalDate: data.arrivalDate,
                airline: data.airline,
                transitTime: data.transitTime,
                economyClass: {
                    price: data.economyPrice,
                    availableTickets: data.economyAvlTickets,
                },
                businessClass: {
                    price: data.businessPrice,
                    availableTickets: data.businessAvlTickets
                },
                isActive: data.isActive

            })
            res.status(200).json({ message: constants.MsgUpdateFlightSuccessfull })
        }
        else {
            res.status(403).json({ message: constants.MsgFlightNotExist })
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message })
    }
}

exports.searchFlights = async (req, res) => {
    try {
        // assign req body values
        let data = req.body;
        let departureDestination = data.departureDestination;
        let arrivalDestination = data.arrivalDestination;
        let depatureDate = data.depatureDate;
        let arrivalDate = data.arrivalDate;
        let cabinClass = data.cabinClass;
        let airline = data.airline;

        console.log(data)

        const flights = await Flight.find({
            'departureDestination': departureDestination == "" ? { $ne: null } : departureDestination,
            'arrivalDestination': arrivalDestination == "" ? { $ne: null } : arrivalDestination,
            'depatureDate': new Date(depatureDate),
            'arrivalDate': new Date(arrivalDate),
            'cabinClass': cabinClass,
            'airline': airline,
        })
        res.status(200).json({ flights: flights });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message })
    }
}