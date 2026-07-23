import User from "../models/user.js";

const admin = async (req, res, next) => {

    const user = await User.findById(req.user.id);

    if (!user) {
        return res.status(404).json({
            message: "User not found",
        });
    }

    if (user.role !== "admin") {
        return res.status(403).json({
            message: "Admin access only",
        });
    }

    next();
};

export default admin;