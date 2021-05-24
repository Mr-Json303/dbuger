module.exports = {
    secret: process.env.AUTH_SECRET || "yolo",
    expires: process.env.AUTH_EXPIRES || "10m",
    rounds: process.env.AUTH_ROUNDS || 12
}