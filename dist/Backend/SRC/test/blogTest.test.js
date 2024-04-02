"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require('chai');
//import chai from 'chai';
//import chaiHttp from 'chai-http';
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;
chai.use(chaiHttp);
describe('Blog Controller', () => {
    let previousLikes;
    describe('addBlog', () => {
        it('should add a new blog', (done) => {
            chai.request(app)
                .post('/blogs/newBlog                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     g')
                .send({
                title: 'Test Blog',
                content: 'This is a test blog content',
                imageUrl: 'https://example.com/image.jpg'
            })
                .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('title', 'Test Blog');
                expect(res.body).to.have.property('content', 'This is a test blog content');
                expect(res.body).to.have.property('imageUrl', 'https://example.com/image.jpg');
                done();
            });
        });
    });
    describe('updateBlog', () => {
        it('should update an existing blog', (done) => {
            chai.request(app)
                .put('/blogs/1')
                .send({
                title: 'Updated Blog',
                content: 'This is updated content',
                imageUrl: 'https://example.com/updated-image.jpg'
            })
                .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('title', 'Updated Blog');
                expect(res.body).to.have.property('content', 'This is updated content');
                expect(res.body).to.have.property('imageUrl', 'https://example.com/updated-image.jpg');
                done();
            });
        });
    });
    it('should delete an existing blog', (done) => {
        const blogId = 'blogId';
        chai.request(app)
            .delete(`/blogs/${blogId}`)
            .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message', 'Blog deleted successfully');
            done();
        });
    });
    it('should return all blogs', (done) => {
        chai.request(app)
            .get('/blogs/allBlogs')
            .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            done();
        });
    });
    it('should return a single blog by ID', (done) => {
        const blogId = 1;
        chai.request(app)
            .get(`/blogs/${blogId}`)
            .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            done();
        });
    });
    it('should add a comment to a blog', (done) => {
        const blogId = 1;
        chai.request(app)
            .post(`/blogs/${blogId}/comments`)
            .send({
            author: 'Test User',
            content: 'This is a test comment',
        })
            .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('author', 'Test User');
            expect(res.body).to.have.property('content', 'This is a test comment');
            done();
        });
    });
    it('should increment the likes of a blog', (done) => {
        const blogId = 1;
        chai.request(app)
            .put(`/blogs/${blogId}/like`)
            .end((err, res) => {
            previousLikes = res.body.likes;
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body.likes).to.equal(previousLikes + 1);
            done();
        });
    });
    it('should decrement the likes of a blog', (done) => {
        const blogId = 'your_blog_id_here';
        chai.request(app)
            .put(`/blogs/${blogId}/unlike`)
            .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body.likes).to.equal(previousLikes - 1);
            done();
        });
    });
});
