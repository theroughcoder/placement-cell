const Student = require('../models/student_schema');
const Interview = require('../models/interview_schema');

//  for rendering interview page 
module.exports.interviews = async function(req, res){
    const students = await Student.find({}).sort({createdAt : -1});
    const interviews = await Interview.find({}).populate('id').sort({createdAt: -1});
 

    res.render('interview_page', {student: students, interview: interviews});  
} 
// for creating an interview 
module.exports.addInterview = async function(req, res){

    try {


        const { 
            id
        } = req.body;
        const check = await Student.findById(id);
        
        // console.log(check)
        if (check && check.interview ) {

           return res.redirect('back');
        } 
        
        const capitalize = s => s[0].toUpperCase() + s.slice(1);
        
        
       const interview =  await Interview.create({...req.body, company: capitalize(req.body.company)}); 
        
        await Student.findByIdAndUpdate(id, {interview: interview._id}) 
       
        res.redirect("/interview");

           
      } catch (error) {  
        res.status(500).json({ message: error.message });
      } 
}
module.exports.deleteInterview = async function (req, res){ 
    
    const data = req.body.interviews;
    // console.log(typeof(data));
    if(typeof(data) == "string"){
        await Interview.findByIdAndDelete( data);

    }else if(typeof(data) == "object"){

        for(let i = 0; i < data.length; i++){
           await Interview.findByIdAndDelete(data[i]);
        }
    }
    
   
   res.redirect("/interview");        

} 
module.exports.editInterview = async function (req, res){ 
    // console.log(req.body);
    const id = req.params.id;
    await Interview.findByIdAndUpdate(id, {result: req.body.result})
    
   
   res.redirect("/interview");      

} 
