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

router.route("/update/:id").put(async (req, res) => {

    //tree structure
    let userId = req.params.id;
    const {name, age, gender} = req.body;

    const updateStudent = {
        name,
        age,
        gender
    }

    const update = await Student.findByIdAndUpdate(userId, updateStudent)
        .then(()=>{
            res.status(200).send({status: "User updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data", error:err.message});
    })
   

})

//Delete Student - DELETE
router.route("/delete/:id").delete(async (req, res) => {
    let userId = req.params.id;

    //we use await keyword to wait untill providing the promise
    await Student.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status: "User Deleted!"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with Delete Student", error:err.message});
    })
})

//GET Single Student details -GET/ID
router.route("/get/:id").get( async (req,res) => {
    let userId = req.params.id;
    const user = await Student.findById(userId)
        .then((student) => {
            res.status(200).send({status: "User Feteched!", student})
        }).catch((err) => {
            console.log(err.message);
            res.status(500).send({status: "Error with get Student", error:err.message});
        })

})
module.exports = router;
