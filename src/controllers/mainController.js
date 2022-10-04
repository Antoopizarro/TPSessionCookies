const {loadUsers,saveUser} = require('../data/dbmodules');
const {validationResult} = require ('express-validator');
const colors = require ('../data/colors')


module.exports = {
    register: (req, res) => {
        res.render('register', {colors});
    },
    procesos: (req, res) => {
        const errors = validationResult(req);
        const {name,email,color,saveColor} = req.body;
        const users = loadUsers();

        if (errors.isEmpty()){
            const newUser = {
                id: users[users.length - 1] ? users[users.length-1].id + 1 : 1,
                nombre: name.trim(),
                email : email.trim(),
                color: color,
                saveColor
            }
            const usersModify = [...users,newUser];
            saveUser(usersModify);
            

            req.session.userLogin = {
                id: users.id,
                name,
                email,
                color
            }
            
            res.cookie('userLogin',req.session.userLogin,{maxAge: 2000 * 60})
            if(saveColor){
                res.cookie('userLogin',req.session.userLogin,{maxAge: 5000 * 60})
            }

            res.redirect('/home');

        } else {
            return res.render('register',{
                errors : errors.mapped(),
                old : req.body
            })
          }
    },
 
    destroy: (req, res) => {
        req.session.destroy();
        res.cookie('userLogin', null,{maxAge:-1})
        res.redirect('/register')
    },

}