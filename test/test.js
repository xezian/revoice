
// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server.js');
const db = require('../models');
const should = chai.should();
chai.use(chaiHttp);
describe('test', () => {
    it('should run this test first', (done) => {
        done();
    })
});
describe('server good', () => {
    it('should run this test second', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                console.log(res.body);
                res.should.be.an('object');
                res.should.have.status(200);
                if(err) {
                    console.log(err);
                } else {
                    done();
                }
            });
    });
})
describe('post, find, delete a clip', () => {
    let id;
    beforeEach((done) => {db.Clip
        .create({ originalClip: 'not a real url' })
        .then(instance => {
            id = instance._id;
            done();
        })
        .catch(err => {
            console.log(err);
        });
    })
    it('should find the clip model i just made by id in the clips collection', (done) => {
        chai.request(server)
            .get(`/api/clips/${id}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an('object');
                res.body.originalClip.should.equal('not a real url');
                done()
            })
    })
    afterEach((done) => {
        db.Clip
            .findById({ _id: id })
            .then(dbModel => dbModel.remove())
            .then(() => {
                console.log('delete successful');
                done();
            })
            .catch(err => {
                console.log(err);
            });
    })
})