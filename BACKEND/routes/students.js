const router = require("express").Router();
//use Student model-importing
let Student = require("../models/student");


//Create Student - POST
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

//Read All Students - GET
router.route("/").get((req, res)=>{
    
    Student.find()
        //if success
        .then((students)=>{
        res.json(students)
    })
        //not success
    .catch((err) => {
        console.log(err);
    })
})

//UPDATE Student Details - PUT

router.route("/").post((req, res) => {

    //tree structure
    let userId = re.body.id;
    const {name, age, gender} = req.body;

    const updateStudent = {
        name,
        age,
        gender
    }

    const update = await Student.findByIdAndUpdate(userId, updateStudent)
        .then(()=>{
            res.status(200).send({status: "User updated", user: update})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data"});
    })
   

})

module.exports = router;
