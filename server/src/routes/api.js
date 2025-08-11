const express = require('express');
const AuthVerifyMiddleware = require("../middlewares/auth");
const UsersController = require("../controllers/user/userController");
const { createBooking, bookingDetailById, bookingByUser } = require("../controllers/booking/bookingController")

const router = express.Router();


// User Profile
router.post("/Registration", UsersController.Registration);
router.post("/Login", UsersController.login);
router.post("/ProfileUpdate", AuthVerifyMiddleware, UsersController.ProfileUpdate);
router.get("/ProfileDetails", AuthVerifyMiddleware, UsersController.ProfileDetails);
router.get("/RecoverVerifyEmail/:email", UsersController.RecoverVerifyEmail);
router.get("/RecoverVerifyOTP/:email/:otp", UsersController.RecoverVerifyOTP);
router.post("/RecoverResetPass", UsersController.RecoverResetPass);
//booking
router.post("/create-booking", AuthVerifyMiddleware, createBooking)
router.get("/booking-detail/:id", AuthVerifyMiddleware, bookingDetailById)
router.get("/booking-by-user/:id", AuthVerifyMiddleware, bookingByUser)






module.exports = router;