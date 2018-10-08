
// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server.js');
const db = require('../models');

chai.use(chaiHttp);
chai.should();

describe('test', () => {
    it('should run this test first', (done) => {
        done();
    })
});
describe('nekodb tests', () => {
    it('should perform countDocuments method and get a count', (done) => {
        db.Clip
            .countDocuments({})
            .then((count)=>{
                console.log(count);
                count.should.be.an('number');
                done();
            })
            .catch(err => {
                console.log(err);
            });
    });
    it('should perform estimatedDocumentCount method and get a count', (done) => {
        db.Clip
            .estimatedDocumentCount({})
            .then((count)=>{
                console.log(count);
                count.should.be.an('number');
                done();
            })
            .catch(err => {
                console.log(err);
            });
    });
});
describe('server good', () => {
    it('should get a pile of clips from the api', (done) => {
        chai.request(server)
            .get('/api/clips/')
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
    beforeEach((done) => {
        db.Clip
            .create({ 
                originalClip: 'not a real url',
                awsEtag: 'not a real aws etag'
            })
            .save()
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
                res.body.awsEtag.should.equal('not a real aws etag');
                if(err) {
                    console.log(err);
                } else {
                    done();
                }
            })
    })
    afterEach((done) => {
        db.Clip
            .deleteById(id)
            .then((count) => {
                console.log(`${count} records deleted`);
                done();
            })
            .catch(err => {
                console.log(err);
            });
    })
})