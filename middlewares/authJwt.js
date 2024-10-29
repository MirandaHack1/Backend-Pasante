const jwt = require("jsonwebtoken");
const config = require("../config/system.config");

module.exports = {
    verifyToken: (req, res, next) => {
        let token = req.headers["authorization"];
        
        if (!token) return res.status(403).json({ message: "No token provided" });

        try {
            token = token.replace('Bearer', '');
            token = token.trim();
            const decoded = jwt.verify(token, config.PASSWORD);
            req.loCode = decoded.id;
            req.loCorreo = decoded.usuario
            /* const user = await User.findById(req.userId, { password: 0 });
            if (!user) return res.status(404).json({ message: "No user found" }); */

            next();

        } catch (error) {
            console.log("Token no valido!");
            console.log(error)
            return res.status(401).json({ message: "Token no valido!" });
        }
    }
};