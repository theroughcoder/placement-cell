const Student = require('../models/student_schema');
// for rendering student page 
module.exports.students = async function(req, res){
 
    const students = await Student.find({}).sort({createdAt : -1});
    // console.log("sdjfkldsaj")
    res.render("student_page", {student: students});
}
// for creating students
module.exports.addStudent = async function(req, res){

    try {
        const { 
            email
        } = req.body;
    
        const check = await Student.findOne({ email });
        // console.log(check);
        if (check) {

           return res.redirect('back');
        } 
        
        // const cryptedPassword = bcrypt.hashSync(req.body.password, 12);
        // let tempUsername = first_name + last_name;
        // let newUsername = await validateUsername(tempUsername);
        
        const capitalize = s => s[0].toUpperCase() + s.slice(1);
        
        const student = new Student({
           ...req.body, name : capitalize(req.body.name)
        });
        await student.save(); 
       
        res.redirect("/student");

           
      } catch (error) {  
        res.status(500).json({ message: error.message });
      } 
}
module.exports.deleteStudent = async function (req, res){ 
    
    const data = req.body.students;
    if(typeof(data) == "string"){
        await Student.findByIdAndDelete( data);

    }else if(typeof(data) == "object"){

        for(let i = 0; i < data.length; i++){
           await Student.findByIdAndDelete(data[i]);
        }
    }
    
   
   res.redirect("/student");      

} 