const router = require("express").Router();
//use Student model-importing
let Student = require("../models/student");


//Create Student 
router.route("/add").post((req, res) => {
    
    const name = req.body.name;
    const age = Number(req.body.age);
    const gender = req.body.gender;

    const newStudent = new Student({
        
        name,
        age,
        gender 

    });

    //Pass data to the db
    newStudent.save().then(()=>{
        //if sucess
        res.json("Student Added!");
    })
    //not success
    .catch((err)=>{
        console.log(err);
    })
})

module.exports = router;
