
const db = require("../models/index");

function getAll(req, res) {
    db.CategoryList.findAll({
        // attributes: ["id", "name", "description"],
        // order: [["name", "DESC"]],
    })
        .then((registers) => {
            res.status(200).send(registers);
        })
        .catch((err) => {
            res.status(500).send({
                msg: "Error",
                error: err.errors[0].message,
            });
        })
}

function getOne(req, res) {
    const key = req.params.key
    const value = req.params.value

    db.CategoryList.findAll({
        include: [{
            model: db.Category,
            attributes: ['id', 'name', 'description'],
        },{
            model: db.Issue,
            attributes: ['id', 'name',],
        }],
        attributes: {exclude: ['id','createdAt', 'updatedAt', 'CategoryIdId', 'IssueId']},
        where: { [key]: value }

    }).then(register => {

        res.status(200).send(register)

    }).catch(err => {
        res.status(500).send({
            msg: 'Error',
            error: err.errors[0].message
        })
    })
}

function create(req, res) {
    const newRegister = {
        name: req.body.name,
        description: req.body.description,
    }

    db.CategoryList.create(newRegister)
        .then(register => {
            res.status(200).send({
                msg: 'OK creado correctamente',
                register: register
            })
        })
        .catch(err => {
            res.status(500).send({
                msg: 'Error en la carga',
                error: err
            })
        });
}

function updateFields(editRegister, idReg) {

    db.CategoryList.update(editRegister, {
        where: { id: idReg }
    })
        .then(register => {
            res.status(200).send({
                msg: 'OK actualizado correctamente',
                register: register
            })
        })
        .catch(err => {
            res.status(500).send({
                msg: 'Error en la carga',
                error: err
            })
        });
}

function edit(req, res) {

    let idReg = req.params.idRegister;

    const editRegister = {
        name: req.body.name,
        description: req.body.description,
    }

    updateFields(editRegister, idReg)

};

function remove(req, res) {

    const idReg = req.params.id

    db.CategoryList.destroy({
        where: {id: idReg}
    })
    .then(register => {
        res.status(200).send({
            msg : 'OK eliminado correctamente',
            register: register
        })  
    })
    .catch(err =>{
        res.status(500).send({
            msg: 'Error en la eliminacion',
            error: err
        })
    });

}

module.exports = {
    getAll,
    getOne,
    create,
    edit,
    remove,
};
