// //import chai from 'chai';
// //import chaiHttp from 'chai-http';
// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const app = require('../app'); // Assuming your Express app is exported from app.js
// const expect = chai.expect;
// //import express, { NextFunction, Request, Response } from 'express';

// chai.use(chaiHttp);

// describe('Message Controller', () => {
//     describe('sendMessage', () => {
//         it('should send a message', (done) => {
//             chai.request(app)
//                 .post('/api/messages')
//                 .send({
//                     subject: 'Test Subject',
//                     content: 'Test Content',
//                     sender: 'Test Sender',
//                     email: 'test@example.com'
//                 })
//                 .end((err: any, res: any) => {
//                     expect(res).to.have.status(201);
//                     expect(res.body).to.be.an('object');
//                     expect(res.body).to.have.property('subject', 'Test Subject');
//                     // Add more assertions as needed
//                     done();
//                 });
//         });
//     });

//     describe('deleteMessage', () => {
//         it('should delete a message by ID', (done) => {
//             // Make sure to replace ':messageId' with a valid message ID in your database
//             chai.request(app)
//                 .delete('/api/messages/:messageId')
//                 .end((err: any, res: any) => {
//                     expect(res).to.have.status(200);
//                     expect(res.body).to.be.an('object');
//                     expect(res.body).to.have.property('message', 'Message deleted successfully');
//                     // Add more assertions as needed
//                     done();
//                 });
//         });
//     });

//     describe('getAllMessages', () => {
//         it('should get all messages', (done) => {
//             chai.request(app)
//                 .get('/api/messages')
//                 .end((err: any, res: any) => {
//                     expect(res).to.have.status(200);
//                     expect(res.body).to.be.an('array');
//                     // Add more assertions as needed
//                     done();
//                 });
//         });
//     });

//     describe('getMessageById', () => {
//         it('should get a message by ID', (done) => {
//             // Make sure to replace ':messageId' with a valid message ID in your database
//             chai.request(app)
//                 .get('/api/messages/:messageId')
//                 .end((err: any, res: any) => {
//                     expect(res).to.have.status(200);
//                     expect(res.body).to.be.an('object');
//                     // Add more assertions as needed
//                     done();
//                 });
//         });
//     });
// });