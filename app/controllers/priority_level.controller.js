const db = require("../models/index");

function getAll(req, res) {
    db.PriorityLevel.findAll({
        attributes: ["id", "name", "description"],
        order: [["id", "ASC"]],
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

    db.PriorityLevel.findAll({
        attributes: ["id", "name", "description"],
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

    db.PriorityLevel.create(newRegister)
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

    
}

function edit(req, res) {

    let idReg = req.params.id;

    const editRegister = {
        name: req.body.name,
        description: req.body.description,
    }

    db.PriorityLevel.update(editRegister, {
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

};

function remove(req, res) {

    const idReg = req.params.id

    db.PriorityLevel.destroy({
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
