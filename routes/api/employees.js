const express=require('express')
const router =express.Router();
const path = require('path')
const employeesController=require('../../controllers/employeesController' )

router.route('/')
    .get(employeesController.getAllemployees)
    .post(employeesController.submitEmployees)
    .put(employeesController.updateEmployees)
    .delete(employeesController.deleteEmployees)
    router.route('/:id')
    .get(employeesController.getEmployee)

module.exports=router