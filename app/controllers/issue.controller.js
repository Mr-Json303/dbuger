
const db = require("../models/index");

function getAll(req, res) {
    db.Issue.findAll({
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



    db.Issue.findAll({
        attributes: db.Issue.attributes,

        include: db.Issue.include,
        
        where: { [key]: value }

    }).then(register => {

        res.status(200).send(register)

    }).catch(err => {
        res.status(500).send({
            msg: 'Error',
            error: err
        })
    })
}

function getReporter(req, res) {
    let reporter_id = req.params.id

    db.Issue.findAll({
        include: {
            model: db.User,
            attributes: ['name', 'email'],
        },
        attributes: [["id", "IssuetId"], ["name", "IssueName"],],
        where: { id_user_reporter: reporter_id }

    }).then(register => {

        res.status(200).send(register)

    }).catch(err => {
        res.status(500).send({
            msg: 'Error',
            error: err
            // error: err.errors[0].message
        })
    })

}

function getAssignee(req, res) {

    let reporter_id = req.params.id

    db.Issue.findAll({
        include: {
            model: db.User,
            attributes: ['name', 'email'],
        },
        attributes: [["id", "IssuetId"], ["name", "IssueName"],],
        where: { id_user_reporter: reporter_id }

    }).then(register => {

        res.status(200).send(register)

    }).catch(err => {
        res.status(500).send({
            msg: 'Error',
            error: err
            // error: err.errors[0].message
        })
    })

}

function create(req, res) {
    const newRegister = {
        name: req.body.name,
        description: req.body.description,
        repeatability: req.body.repeatability,
        ProjectId: req.body.ProjectId,
        ReporterId: req.body.ReporterId,
        AssigneeId: req.body.AssigneeId,
        PriorityLevelId: req.body.PriorityLevelId,
        StateId: req.body.StateId,
        lastUpdatedBy: req.body.LastUpdatedById,
    }

    db.Issue.create(newRegister)
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

    db.Issue.update(editRegister, {
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
    let idEditor = req.params.idEditor;

    const editRegister = {
        name: req.body.name,
        description: req.body.description,
        repeatability: req.body.repeatability,
        ProjectId: req.body.ProjectId,
        ReporterId: req.body.ReporterId,
        AssigneeId: req.body.AssigneeId,
        PriorityLevelId: req.body.PriorityLevelId,
        StateId: req.body.StateId,
        lastUpdatedBy: idEditor,
    }

    updateFields(editRegister, idReg)

};

function remove(req, res) {

    let idReg = req.params.idRegister;
    let idEditor = req.params.idEditor;

    const editRegister = {
        deleted: true,
        lastUpdatedBy: idEditor,
    }

    updateFields(editRegister, idReg)

}

module.exports = {
    getAll,
    getOne,
    getReporter,
    getAssignee,
    create,
    edit,
    remove,
};
