import chai from "chai";
import chaiHttp from "chai-http";
import app from '../server'
import Message from '../models/message';

chai.use(chaiHttp);
const { expect } = chai;

describe('getAllMessage',() => {
    it('get list of messages', async()=>{
        const message = await Message.find();
        chai.request(app).get('/messages/allMessages');
        expect(message).to.have.status(200);
    });
});