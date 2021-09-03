module.exports = {
    secret: process.env.AUTH_SECRET || "yolo",
    expires: process.env.AUTH_EXPIRES || "1m",
    rounds: process.env.AUTH_ROUNDS || 12
}