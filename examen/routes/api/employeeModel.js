var ObjectID = require('mongodb').ObjectID;

function employeeModel(db){
  var lib = {};
  var empColl = db.collection('emps');

  var userTemplate = {
    age: "",
    name: "",
    company: "",
    email: "",
    phone: "",
    address: "",
    tag: ""
  }

  lib.getEmployees = (handler)=>{
    // implementar
    // obtener todos los documentos
    empColl.find({}).toArray(handler);
  }

  lib.getEmployeesById = (id, handler) => {
    // implementar
    // Obtener un Documento solo mostrar
    // email, phone, name y age
    var query = { "_id": new ObjectID(id) };
    var projection = { "name": 1, "email": 1, "phone":1, "age":1};
    empColl.findOne(
      query,
      {"projection":projection},
      (err, doc) => {
        if (err) {
          return handler(err, null);
        }
        return handler(null, doc);
      }
    );
  }

  lib.getEmployeesByCompany = (company, handler) => {
    // implementar
    // solo mostrar name, email, company
    var query = {"company":company};
    var projection = { "name": 1, "email": 1, "company":1};
    empsColl.findOne(
      query,
      {"projection":projection},
      (err, emps)=>{
        if(err){
          return handler(err,null);
        }
        return handler(null, emps);
      }
    )
  }

  lib.getEmployeesByAgeRange = (ageLowLimit, ageHighLimit, handler) => {
    //implementar
    // Mostrar todos los documento incluyendo los extremos
    // que esten entre las edades indicadas por los parametros
    // ageLowLimit y ageHighLimit
    // solo mostrar name, age, email
    var query = {"age":age};
    var projection = { "name": 1, "email": 1, "age":1};
    empsColl.findOne(
      query,
      {"projection":projection},
      (err, emps)=>{
        if(err){
          return handler(err,null);
        }
        return handler(null, emps);
      }
    )
    return handler(new Error("No Implementado"), null);
  }

  lib.getEmployeesByTag = (tag, handler) => {
    //implementar
    // obtener todos los documentos que contenga 
    // al menos una vez el tag dentro del arreglo
    // tags
    // mostrar solo name, email, tags
    var query = {"tag":tag};
    var projection = { "name": 1, "email": 1, "tag":1};
    empsColl.findOne(
      query,
      {"projection":projection},
      (err, emps)=>{
        if(err){
          return handler(err,null);
        }
        return handler(null, emps);
      }
    )
  }

  lib.addEmployeeATag = ( tag, id, handler) => {
    //Implementar
    //Se requiere agregar a un documento un nuevo tag
    // $push
    seguridadModel.addNew = (dataToAdd, handler)=>{
    var { age, name, company, email, phone, address, tag} = dataToAdd;
    var empToAdd = Object.assign(
      {},
      empTemplate,
      {
        age: age,
        name: name,
        company: company,
        email: email,
        phone: phone,
        address: address,
        tag: tag
      }
    );
    empsColl.insertOne(empToAdd, (err, rslt)=>{
      if(err){
        return handler(err, null);
      }
      console.log(rslt);
      return handler(null, rslt.ops[0]);
    }); 
  }
  }

  lib.removeEmployee = (id, handler) => {
    //Implementar
    //Se requiere eliminar un documento de la colección
    var query = {"_id": new ObjectID(id)};
    empsColl.deleteOne(
      query,
      (err, rslt)=>{
        if(err){
          return handler(err, null);
        }
        return handler(null, rslt.result);
      }
    ); //deleteOne
  }

  lib.increaseAgeToAll = (ageDelta, handler) => {
    //Implementar
    //Se requiere modificar todos los documentos de la colección
    // incrementando age por la cantidad de ageDelta $inc
    empModel.addNew = (dataToAdd, handler)=>{
      var { age, name, company, email, phone, address, tag} = dataToAdd;
      var empToAdd = Object.assign(
        {},
        empTemplate,
        {
          age: age,
          name: name,
          company: company,
          email: email,
          phone: phone,
          address: address,
          tag: tag
        }
      );
      empsColl.insertOne(empToAdd, (err, rslt)=>{
        if(err){
          return handler(err, null);
        }
        console.log(rslt);
        return handler(null, rslt.ops[0]);
      }); 
    }
    return handler(new Error("No Implementado"), null);
  }
  return lib;
}

module.exports = employeeModel;
