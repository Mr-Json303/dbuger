const db = require('../models/index');

function getAll(req, res){
    res.status(200).send({
        msg: 'project_group getAll function'
    })
}

function getOne(req, res){
    res.status(200).send({
        msg: 'project_group getOne function'
    })
}

function create(req, res){
    res.status(200).send({
        msg: 'project_group create function'
    })
}

function edit(req, res){
    res.status(200).send({
        msg: 'project_group edit function'
    })
}

function remove(req, res){
    res.status(200).send({
        msg: 'project_group delete function'
    })
}

module.exports = {
    getAll,
    getOne,
    create,
    edit,
    remove
}