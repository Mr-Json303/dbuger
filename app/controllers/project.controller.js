const db = require("../models/index");

function getAll(req, res) {
  db.Project.findAll({
    attributes: ["id", "name", "description","id_project_creator"],
    order: [["name", "DESC"]],
  })
    .then((registers) => {
      res.status(200).send(registers);
    })
    .catch((err) => {
      res.status(500).send({
        msg: "Error",
        error: err.errors[0].message,
      });
    });
}

function getOne(req, res) {
    const key = req.params.key
    const value = req.params.value

    db.Project.findAll({
        attributes: ["id", "name", "description","id_project_creator"],
        where: {[key]: value}

    }).then(register =>{
        
        res.status(200).send(register)

    }).catch(err =>{
        res.status(500).send({
            msg: 'Error',
            error: err.errors[0].message
        })
    })
}

function create(req, res) {
    const newRegister = {
        name: req.body.name,
        description: req.body.code,
        id_project_creator: req.body.id_project_creator
    }

    db.Project.create(newRegister)
    .then(register => {
        res.status(200).send({
            msg : 'OK creado correctamente',
            register: register
        })  
    })
    .catch(err =>{
        res.status(500).send({
            msg: 'Error en la carga',
            error: err
        })
    });
}

function edit(req, res){

    let editRegister = {
        name: req.body.name,
        description: req.body.description,
        id_project_creator: req.body.id_project_creator
    }

    const idReg = req.params.id

    db.Project.update(editRegister,{
        where: {id: idReg}
    })
    .then(register => {
        res.status(200).send({
            msg : 'OK actualizado correctamente',
            register: register
        })  
    })
    .catch(err =>{
        res.status(500).send({
            msg: 'Error en la actualizacion',
            error: err
        })
    });


};

function remove(req, res) {
    const idReg = req.params.id

    db.Project.destroy({
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
