
exports.root = (req, res) => {
    res.status(200).send({msg : 'OK'})
};

exports.find = (req, res) => {
    res.status(200).send({msg : 'OK desde buscar'});
}