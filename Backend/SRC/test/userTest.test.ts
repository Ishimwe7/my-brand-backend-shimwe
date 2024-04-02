// const chai = require('chai');
// const chaiHttp = require('chai-http');
// //import chai from 'chai';
// //import chaiHttp from 'chai-http';
// const app = require('../app'); // Assuming your Express app is exported from app.js
// const expect = chai.expect;
// //import express, { NextFunction, Request, Response } from 'express';

// chai.use(chaiHttp);

// describe('User Controller', () => {
//     describe('createNewUser', () => {
//         it('should create a new user', (done) => {
//             chai.request(app)
//                 .post('/api/users')
//                 .send({
//                     names: 'Test User',
//                     email: 'test@example.com',
//                     password: 'StrongPassword123',
//                     isAdmin: false
//                 })
//                 .end((err: any, res: any) => {
//                     expect(res).to.have.status(201);
//                     expect(res.body).to.be.an('object');
//                     expect(res.body).to.have.property('names', 'Test User');
//                     // Add more assertions as needed
//                     done();
//                 });
//         });

//         // Add more test cases for edge cases like invalid input data, duplicate email, etc.
//     });

//     describe('updateUser', () => {
//         it('should update an existing user', (done) => {
//             chai.request(app)
//                 .put('/api/users/1') // Replace '1' with the actual ID of an existing user
//                 .send({
//                     names: 'Updated User',
//                     email: 'updated@example.com',
//                     password: 'NewPassword123'
//                 })
//                 .end((err: any, res: any) => {
//                     expect(res).to.have.status(200);
//                     expect(res.body).to.be.an('object');
//                     expect(res.body).to.have.property('names', 'Updated User');
//                     // Add more assertions as needed
//                     done();
//                 });
//         });

//         // Add more test cases for edge cases like updating with invalid data, user not found, etc.
//     });

//     // Add tests for other user controller methods like deleteUser, getAllUsers, getUserById, login
// });