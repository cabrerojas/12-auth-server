const mongoose = require("mongoose");


const dbConnection = async() => {

    try {

        await mongoose.connect( process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('Base de datos Online');
        
    } catch (error) {

        console.log(error);
        throw new Error('Error a la hora de inicializar la Base de datos');
        
    } 

};

module.exports = {
    dbConnection
};



// EJEMPLO de conexion a MySQL

// const mysql2 = require('mysql2');
 
// const dbConnection = async() => {
//     try{
//         await mysql2.createConnection({
//             host: process.env.DB_HOST,
//             user:  process.env.DB_USER,
//             password:  process.env.DB_PASS,
//             database: process.env.DB_DATABASE
//         });
//         console.log('Base de datos iniciada');
//     } catch(error) {
//         console.log(error);
//         throw new Error('Error a la hora de inicializar la base da datos');
 
//     }
// }

