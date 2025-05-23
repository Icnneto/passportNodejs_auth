export function errorHandler (err, req, res, next) {
    res.json({ err: err });
};