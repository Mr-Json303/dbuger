const db = require('../models/index');

function getAll(req, res){

    db.ProjectGRoup.findAll({
        attributes:['id','UserId','RoleId','ProjectId'],
        order:[['ProjectId', 'DESC']]
    }).then(registers =>{
        
        res.status(200).send({Group_Registers: registers})

    }).catch(err =>{
        res.status(500).send({
            msg: 'Error',
            error: err.errors[0].message
        })
    })
}

function getOne(req, res){

    const key = req.params.key
    const value = req.params.value

    db.ProjectGRoup.findAll({
        where: {[key]: value},
        attributes:['id', 'UserId', 'RoleId', 'ProjectId']

    }).then(register =>{
        
        res.status(200).send({Register: register})

    }).catch(err =>{
        res.status(500).send({
            msg: 'Error',
            error: err.errors[0].message
        })
    })
};

function getGroup(req, res){

    const varProjectId = req.params.id

    db.ProjectGRoup.findAll({
        include: [{
            model: db.Project,
            attributes : ['name']
        },{
            model: db.User,
            attributes : ['name']
        },{
            model: db.Role,
            attributes : ['name']
        }],
        attributes: ['ProjectId', 'UserId', 'RoleId'],
        where: {ProjectId: varProjectId}
      })
    .then(register =>{
        
        // console.log(register);
        res.status(200).send({
            Project: varProjectId,
            Group: register
        })

    }).catch(err =>{
        res.status(500).send({
            msg: 'Error',
            error: err
        })
    })
};

function create(req, res){

    const newRegister = {
       UserId: req.body.UserId,
       RoleId: req.body.RoleId,
       ProjectId: req.body.ProjectId,
    }

    db.ProjectGRoup.create(newRegister)
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
    
};

function edit(req, res){

    let editRegister = {
        ProjectId: req.body.ProjectId,
        UserId: req.body.UserId,
        RoleId: req.body.RoleId
    }

    const idReg = req.params.id

    db.ProjectGRoup.update(editRegister,{
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

async function remove(req, res){
    // res.status(200).send({
    //     msg: 'Remove Project Group Function'
    // })

    let idReg = req.params.id;

  try {
    await db.ProjectGRoup.destroy({
      where: {
        id: idReg,
      },
    });
    res.status(200).send({ 
      message: "The register was removed succesfully" 
    });
  } catch (error) {
    res
      .status(500)
      .send({ 
        message: "The action could not be performed", 
        error 
      });
  }

};

module.exports = {
    getAll,
    getOne,
    getGroup,
    create,
    edit,
    remove
}