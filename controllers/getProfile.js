const User = require('../models/User');


exports.getProfile = async (req, res) => {
    try {
        const id = req.params.id;
        const profile = await User.findById(id);

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "No data found with given ID"
            });
        }

        // Data for given id found
        res.status(200).json({
            success: true,
            data: profile,
            message: `Profile ${id} data successfully fetched`
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            error: err.message,
            message: "Server Error"
        });
    }
};
