const request = require('supertest');
const app = require('../../app');
const db = require('../../db');
const { assert } = require('chai');

describe('/Accounts Routes', () => {
    const TEST_ACCOUNT_NAME = 'test_account';
    const TEST_ACCOUNT_NAME_OTHER = 'test_account_other';
    const TEST_ACCOUNT_NAMES = [TEST_ACCOUNT_NAME, TEST_ACCOUNT_NAME_OTHER];
    const TEST_ACCOUNT_TYPE_ID = 1;
    const TEST_ACCOUNT_TYPE_NAME = 'Cash'

    beforeEach((done) => {
        db.initialize_db(':memory:', () => {
            db.insert_account(TEST_ACCOUNT_NAME, TEST_ACCOUNT_TYPE_ID, (err) => {
                if (err) throw err;
                done();
            });
        });
    });

    afterEach((done) => {
        db.close((err) => {
            if (err) throw err;
            done();
        });
    });

    it('/accounts/select correctly fetches accounts', (done) => {
        request(app)
            .get('/accounts/select')
            .expect(200)
            .end((err, res) => {
                if (err) assert.fail(err);
                let body = res.body
                assert(body.length === 1);
                account = body[0]
                assert(account.name === TEST_ACCOUNT_NAME);
                assert(account.type === TEST_ACCOUNT_TYPE_NAME);
                assert(account.id === 1);
                done();
            });
    });

    it('/accounts/delete correctly deletes an account', (done) => {
        request(app)
            .post('/accounts/delete')
            .send({
                'account_id': 1
            })
            .expect(200)
            .end((err, res) => {
                if (err) assert.fail(err);
                request(app)
                    .get('/accounts/select')
                    .expect(200)
                    .end((err, res) => {
                        if (err) assert.fail(err);
                        let body = res.body
                        assert(body.length === 0);
                        done();
                    });
            });
    });

    it('/accounts/add correctly adds an account', (done) => {
        request(app)
            .post('/accounts/add')
            .send({
                'account_name': TEST_ACCOUNT_NAME_OTHER,
                'account_type': TEST_ACCOUNT_TYPE_ID
            })
            .expect(200)
            .end((err, res) => {
                if (err) assert.fail(err);
                request(app)
                    .get('/accounts/select')
                    .expect(200)
                    .end((err, res) => {
                        if (err) assert.fail(err);
                        let body = res.body
                        assert(body.length === 2);
                        body.forEach((account) => {
                            assert(TEST_ACCOUNT_NAMES.includes(account.name))
                            assert(account.type === TEST_ACCOUNT_TYPE_NAME);
                        });
                        done();
                    });
            });
    });
});