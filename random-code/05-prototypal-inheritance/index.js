'use strict';

function Person(name, address, phoneNumber, email){
  this.name = name;
  this.addres = address;
  this.phoneNumber = phoneNumber;
  this.email = email; 
}
Person.prototype.toString = function(){
  console.log(`${this}: ${this.name}`);
}
//Enum pattern for Student status
const ClassStatus = Object.freeze({
  'FRESHMAN': 'freshman',
  'SOPHOMORE': 'sophomore',
  'JUNIOR': 'junior',
  'SENIOR': 'senior',
});
//Student Constructor
function Student(name, address, phoneNumber, email, status){
  Person.call(this, name, address, phoneNumber, email);
  this. status = ClassStatus[status];
}
Student.prototype = Object.create(Person.prototype, {
  constructor: {value: Student, writable: true, configurable: true,}
});
Student.prototype.toString = function(){
  return `${this.constructor.name}: ${this.name}`;
};

function Employee(name, address, phoneNumber, email, companyName, salary){
  Person.call(this, name, address, phoneNumber, email);
  this.company = companyName;
  this.salary = salary;
};
Employee.prototype = Object.create(Person.prototype, {
  constructor: {value: Employee, writable: true, configurable: true,},
});
Employee.prototype.toString = function(){
  return `${this.constructor.name}: ${this.name}`;
} 
const student = new Student('Arfan', 'Yogya', '0877524', 'A12fan@gmail.com','SOPHOMORE')
console.log(student.toString())