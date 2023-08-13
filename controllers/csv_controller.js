const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const Student = require('../models/student_schema');
const Interview = require('../models/interview_schema');
const fs = require('fs');
const json2csv = require('json2csv').parse;
module.exports.createCSV = async function (req, res) {

    //  console.log(task);
    // this is the structure of csv file
    const csvWriter = createCsvWriter({
      // path where csv file will be downloaded
     path: `./csv/output${Math.random()*10000}.csv`,
     header: [

       {id: '_id', title: 'Student ID'},
       {id: 'name', title: 'Student Name'},
       {id: 'college', title: 'College'},
       {id: 'status', title: 'Status'},
       {id: 'DSA', title: 'DSA Score'},
       {id: 'webD', title: 'Web Score'},
       {id: 'react', title: 'react Score'},
       {id: 'company', title: 'Company'},
       {id: 'result', title: 'Result'},
       {id: 'date', title: 'Date'},
       {id: 'result', title: 'Result'},
     ]
    });
    // fetching data from server 
    const interviews = await Interview.find({}).populate('id').sort({createdAt: -1});
    const newArr = [];
    // filtering data into newArr 
    for(var i of interviews){
        const temp = {  ...i._doc};
     newArr.push({...i._doc, ...i._doc.id._doc});
    }
    // console.log(newArr)
    const csv = json2csv(newArr, { fields: ['name', 'email', 'batch', 'college', 'status', 'DSA', 'webD', 'react', 'company', 'result' ] });

    // Set headers for file download
    res.setHeader('Content-Disposition', 'attachment; filename=data.csv');
    res.setHeader('Content-Type', 'text/csv');

    // Stream the CSV data to the response
    res.send(csv);
    }  