const data ={}
data.employees = require('../../models/employees.json')

const getAllemployees=(req,res)=>{
    res.json(data.employees)
}
const submitEmployees=(req,res)=>{
    res.json({
        "firstname":req.body.firstname,
        "lastname":req.body.lastname   
        })}
const updateEmployees=(req,res)=>{
    res.json({
        "firstname":req.body.firstname,
        "lastname":req.body.lastname   
        })
    }
const deleteEmployees=(req,res)=>{
    res.json({
        "id":req.body.id
    })
}
const getEmployee=(req,res)=>{
    res.json({"id":req.params.id
    })
}

module.exports={
    getAllemployees,
    getEmployee,
    updateEmployees,
    deleteEmployees,
    submitEmployees
}