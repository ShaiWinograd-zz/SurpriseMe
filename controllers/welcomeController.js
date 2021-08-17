// Get a welcome 
exports.getWelcome = async (req, res, next) => {
    res.status(200).json({
        message: 'Welcome to the SurpriseMe! API.' 
    })
}