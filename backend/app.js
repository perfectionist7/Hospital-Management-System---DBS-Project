var createError = require('http-errors');
var express = require('express');
var path = require('path');
var mysql = require('mysql');
var cors = require('cors');
var port = 3001

//Connection Info
var con = mysql.createConnection({
  host: 'localhost',
  user: 'ayush',
  password: 'Ayush@1404',
  database: 'HospitalManagement',
  multipleStatements: true
});

//Connecting To Database
con.connect(function (err) {
  if (err) throw err;
  console.log("Connected to MySQL");
});

//Variables to keep state info about who is logged in
var email_in_use = "";
var password_in_use = "";
var who = "";

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

//Signup, Login, Password Reset Related Queries

//Checks if patient exists in database
app.get('/checkIfPatientExists', (req, res) => {
  let params = req.query;
  let email = params.email;
  let statement = `SELECT * FROM PatientInfo WHERE email = "${email}"`;
  console.log(statement);
  con.query(statement, function (error, results, fields) {
    if (error) throw error;
    else {
      return res.json({
        data: results
      })
    };
  });
});

//Creates User Account
app.get('/makeAccount', (req, res) => {
  console.log('Request received for /makeAccount');
  let query = req.query;
  let name = query.name + " " + query.lastname;
  let email = query.email;
  let password = query.password;
  let address = query.address;
  let gender = query.gender;
  let medications = query.medications;
  let conditions = query.conditions;
  let surgeries = query.surgeries;
  if(medications===undefined){
    medications="none"
  }
  if(conditions===undefined){
    conditions="none"
  }
  if(surgeries===undefined){
    surgeries="none"
  }
  let sql_statement = `INSERT INTO PatientInfo (email, password, name, address, gender) 
                       VALUES ` + `("${email}", "${password}", "${name}", "${address}", "${gender}")`;
  console.log(sql_statement);
  con.query(sql_statement, function (error, results, fields) {
    if (error) throw error;
    else {
      email_in_use = email;
      password_in_use = password;
      who="pat";
      return res.json({
        data: results
      })
    };
  });
  sql_statement='SELECT id FROM HealthRecord ORDER BY id DESC LIMIT 1;';
  console.log(sql_statement)
  con.query(sql_statement, function (error, results, fields) {
    if (error) throw error;
    else {
      let generated_id = results[0].id + 1;
      let sql_statement = `INSERT INTO HealthRecord (id, date, conditions, surgeries, medication) 
      VALUES ` + `("${generated_id}", curdate(), "${conditions}", "${surgeries}", "${medications}")`;
      console.log(sql_statement);
      con.query(sql_statement, function (error, results, fields) {
        if (error) throw error;
        else {
          let sql_statement = `INSERT INTO PatientRecords (email, id) 
          VALUES ` + `("${email}",${generated_id})`;
          console.log(sql_statement);
          con.query(sql_statement, function (error, results, fields) {
            if (error) throw error;
            else {};
          });
        };
      });
    };
  });
});

//Checks If Doctor Exists
app.get('/checkIfDocExists', (req, res) => {
  let params = req.query;
  let email = params.email;
  let statement = `SELECT * FROM DoctorInfo WHERE email = "${email}"`;
  console.log(statement);
  con.query(statement, function (error, results, fields) {
    if (error) throw error;
    else {
      return res.json({
        data: results
      })
    };
  });
});

//Makes Doctor Account
app.get('/makeDocAccount', (req, res) => {
  let params = req.query;
  let name = params.name + " " + params.lastname;
  let email = params.email;
  let password = params.password;
  let gender = params.gender;
  let schedule = params.schedule;
  let sql_statement = `INSERT INTO DoctorInfo (email, gender, password, name) 
                       VALUES ` + `("${email}", "${gender}", "${password}", "${name}")`;
  console.log(sql_statement);
  con.query(sql_statement, function (error, results, fields) {
    if (error) throw error;
    else {
      let sql_statement = `INSERT INTO DoctorSchedule (id, email) 
                       VALUES ` + `(${schedule}, "${email}")`;
      console.log(sql_statement);
      con.query(sql_statement, function(error){
        if (error) throw error;
      })
      email_in_use = email;
      password_in_use = password;
      who = 'doc';
      return res.json({
        data: results
      })
    };
  });
});

//Checks if patient is logged in
app.get('/checklogin', (req, res) => {
  let params = req.query;
  let email = params.email;
  let password = params.password;
  let sql_statement = `SELECT * FROM PatientInfo 
                       WHERE email="${email}" 
                       AND password="${password}"`;
  console.log(sql_statement);
  con.query(sql_statement, function (error, results, fields) {
    if (error) {
      console.log("error");
      return res.status(500).json({ failed: 'error ocurred' })
    }
    else {
      if (results.length === 0) {
      } else {
        var string = JSON.stringify(results);
        var json = JSON.parse(string);
        email_in_use = email;
        password_in_use = password;
        who = "pat";
      }
      return res.json({
        data: results
      })
    };
  });
});

//Checks if doctor is logged in
app.get('/checkDoclogin', (req, res) => {
  let params = req.query;
  let email = params.email;
  let password = params.password;
  let sql_statement = `SELECT * 
                       FROM DoctorInfo
                       WHERE email="${email}" AND password="${password}"`;
  console.log(sql_statement);
  con.query(sql_statement, function (error, results, fields) {
    if (error) {
      console.log("eror");
      return res.status(500).json({ failed: 'error ocurred' })
    }
    else {
      if (results.length === 0) {
      } else {
        var string = JSON.stringify(results);
        var json = JSON.parse(string);
        email_in_use = json[0].email;
        password_in_use = json[0].password;
        who="doc";
        console.log(email_in_use);
        console.log(password_in_use);
      }
      return res.json({
        data: results
      })
    };
  });
});


app.get('/userInSession', (req, res) => {
  return res.json({ email: `${email_in_use}`, who:`${who}`});
});

//Logs the person out
app.get('/endSession', (req, res) => {
  console.log("Ending session");
  email_in_use = "";
  password_in_use = "";
});


app.get('/docInfo', (req, res) => {
  let statement = 'SELECT * FROM DoctorInfo';
  console.log(statement);
  con.query(statement, function (error, results, fields) {
    if (error) throw error;
    else {
      return res.json({
        data: results
      })
    };
  });
});
app.get('/OneHistory', (req, res) => {
  let params = req.query;
  let email = params.patientEmail;
  let statement = `SELECT gender,name,PatientInfo.email,address,conditions,surgeries,medication
                    FROM PatientRecords,PatientInfo,HealthRecord
                    WHERE PatientRecords.id=HealthRecord.id
                    AND PatientRecords.email=PatientInfo.email AND PatientInfo.email = ` + email;
  console.log(statement);
  con.query(statement, function (error, results, fields) {
    if (error) throw error;
    else {
      return res.json({
        data: results
      })
    }
  })
});


app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, () => {
  console.log(`Listening on port ${port} `);
});

module.exports = app;