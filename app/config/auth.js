module.exports = {
    secret: process.env.AUTH_SECRET || "yolo",
    expires: process.env.AUTH_EXPIRES || "8h",
    rounds: process.env.AUTH_ROUNDS || 12
}