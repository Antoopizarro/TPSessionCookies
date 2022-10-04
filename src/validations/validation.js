const {check,body} = require ('express-validator');
const {loadUsers} = require ('../data/dbmodules');


module.exports = [

    check('name')
        .notEmpty().withMessage('El nombre es obligatorio').bail()
        .isLength({
            min:3,
            max:10
        }).withMessage('Debe ingresar entre 3 y 10 caracteres').bail()
        .isAlpha('es-ES').withMessage('Solo caracteres alfabeticos'),

    body('email')
        .notEmpty().withMessage('El email es obligatorio').bail()
        .isEmail().withMessage('Debe ingresar un email valido')
        .custom((value,{req})=> {
            const user = loadUsers().find(user => user.email === value)
            if (user){
                return false
            } else {
                return true
            }
        }).withMessage('El email ya se encuentra registrado'),
    
    check('age')
        .custom((value,{req})=> {
            if (value<1){
                return false
            } else {
                return true
            }
        }).withMessage('La edad debe ser mayor a 1'),
  ]