const jwt = require('jsonwebtoken');

exports.verifyToken = (request, response, next) => {
    const authorizationHeader = request.headers['authorization'];

    if (!authorizationHeader) {
        return response.status(403).json({ message: 'A token is required for authentication' });
    }
    const tokenParts = authorizationHeader.split(" ");

    if (tokenParts.length !== 2 || tokenParts[0].toLowerCase() !== 'bearer') {
        return response.status(403).json({ message: 'Invalid token format' });
    }

    const token = tokenParts[1];

    try {
        const decoded = jwt.verify(token, "abdurrahmansecretcode");
        // console.log(decoded, "decoded")
        request.user = decoded;
        console.log(request.user, "request")

        next();
    } catch (err) {
        return response.status(401).send('Invalid Token');
    }
}

exports.AdminMiddleware = (request, response, next) => { 
    if (request.user && request.user.role === 'admin'){
        next()
    }else {
        response.status(403).json({message: "Admin Only"})
    }
}