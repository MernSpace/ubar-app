const DataModel = require("../../model/booking/bookingModel")
exports.createBooking = async (req, res) => {
    try {
        const { pickupL, pickupD, pickupT, dropL, riderID, status, driverID } = req.body

        // Validate required fields
        if (!pickupL || !pickupD || !pickupT || !dropL || !riderID) {
            return res.status(400).json({
                status: "fail",
                message: "All fields are required"
            });
        }

        // Validate date format
        const pickupDate = new Date(pickupD);
        if (isNaN(pickupDate.getTime())) {
            return res.status(400).json({
                status: "fail",
                message: "Invalid pickup date format"
            });
        }

        // Validate time format (HH:MM)
        const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
        if (!timeRegex.test(pickupT)) {
            return res.status(400).json({
                status: "fail",
                message: "Invalid time format. Use HH:MM format"
            });
        }

        const data = await DataModel.create({
            pickupL,
            pickupD: pickupDate,
            pickupT,
            dropL,
            riderID,
            status: "Waiting", // Fixed typo: was "staus"
            driverID // Include driverID if provided
        });

        res.status(201).json({
            status: "success", // Fixed typo: was "staus"
            message: "Booking created successfully",
            data: data
        });

    } catch (error) {
        console.error("Booking creation error:", error);

        // Handle specific mongoose validation errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                status: "fail",
                message: "Validation error",
                errors: Object.values(error.errors).map(err => err.message)
            });
        }

        // Handle duplicate key errors
        if (error.code === 11000) {
            return res.status(400).json({
                status: "fail",
                message: "Duplicate entry found"
            });
        }

        res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    }
}