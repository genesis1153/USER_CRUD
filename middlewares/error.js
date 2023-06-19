function notFound(req, res, next) {
    const error = new Error("Not found");
    res.status(404);
    next(error);
}

function errorHandler(err, req, res, next) {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    if (err.name === "CastError" && err.kind === "ObjectId") {
        statusCode = 404;
        message = "Resource not found";
    }

    console.log(err);

    res.status(statusCode).json(message);
}

module.exports = { notFound, errorHandler };
