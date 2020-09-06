const request = require('supertest');
const app = require('../../app');
const db = require('../../db');
const { assert } = require('chai');

describe('/Category Routes', () => {
    const TEST_CATEGORY_NAME_OTHER = 'test_category_other';
    const TEST_CATEGORY_NAMES = ['Uncategorized', TEST_CATEGORY_NAME_OTHER];

    beforeEach((done) => {
        db.initialize_db(':memory:', () => {
            done();
        });
    });

    afterEach((done) => {
        db.close((err) => {
            if (err) throw err;
            done();
        });
    });

    it('/categories/select correctly fetches categories', (done) => {
        request(app)
            .get('/categories/select')
            .expect(200)
            .end((err, res) => {
                if (err) assert.fail(err);
                let body = res.body
                assert(body.length === 1);
                category = body[0]
                assert(category.name === 'Uncategorized');
                assert(category.id === 1);
                done();
            });
    });

    it('/categories/delete correctly deletes a category', (done) => {
        request(app)
            .post('/categories/delete')
            .send({
                'category_id': 1
            })
            .expect(200)
            .end((err, res) => {
                if (err) assert.fail(err);
                request(app)
                    .get('/categories/select')
                    .expect(200)
                    .end((err, res) => {
                        if (err) assert.fail(err);
                        let body = res.body
                        assert(body.length === 0);
                        done();
                    });
            });
    });

    it('/categories/add correctly adds a category', (done) => {
        request(app)
            .post('/categories/add')
            .send({
                'category_name': TEST_CATEGORY_NAME_OTHER
            })
            .expect(200)
            .end((err, res) => {
                if (err) assert.fail(err);
                request(app)
                    .get('/categories/select')
                    .expect(200)
                    .end((err, res) => {
                        if (err) assert.fail(err);
                        let body = res.body
                        assert(body.length === 2);
                        body.forEach((category) => {
                            assert(TEST_CATEGORY_NAMES.includes(category.name))
                        });
                        done();
                    });
            });
    });
});