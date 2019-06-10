describe('==== ADMIN ====', () => {

  var adminToken = ''
  var adminModel1 = {

    "email":"victorhundo@example.com",
    "login":{
      "username":"victor123",
      "senha":"epol",
      }
    }

    var adminModel2 = {

      "email":"metal@example.com",
      "login":{
        "username":"metal123",
        "senha":"yogar",
        }
      }

      var adminModel3 = {

        "email":"rafax@example.com",
        "login":{
          "username":"rafaxxx",
          "senha":"rafa123",
          }
        }

        var adminModel4 = {

          "email":"heitor@example.com",
          "login":{
            "username":"heitor123",
            "senha":"raimundo",
            }
          }

    //Before each test we empty the database
    beforeEach((done) => {
        cleanTable('admin');
        adminToken = generateToken('admin');
        done();
    });

    describe('GET /admins', () => {
      it('it should GET all the admins',(done) => {
        request
          .post('/admins')
          .send(adminModel1)
          .set('x-access-token', adminToken)
          .expect(201)
        .then((res) => {
        return request
          .post('/admins')
          .send(adminModel2)
          .set('x-access-token', adminToken)
          .expect(201)
        })
        .then((res) => {
        return request
          .post('/admins')
          .send(adminModel3)
          .set('x-access-token', adminToken)
          .expect(201)
        })
        .then((res) => {
        return request
          .get('/admins')
          .set('x-access-token', adminToken)
          .expect(200)
          .expect((res) => {
            res.body.length.should.equals(3);
          })
        })
        .then((success) => {done()}, (error) => {done(error)});
      });

      it('it should GET all the admins', (done) => {
        request
        .get('/admins')
        .set('x-access-token', adminToken)
        .expect(200)
        .expect((res) => {
          res.body.length.should.equals(0)
        })
        .then((success) => {done()}, (error) => {done(error)});
      });

    });

    describe('GET /admins/:id', () => {
      it('it should GET a admin given id', (done) => {
        request
          .post('/admins')
          .send(adminModel1)
          .set('x-access-token', adminToken)
          .expect(201)
        .then((res) => {
        return request
          .get('/admins/' + res.body.insertId)
          .set('x-access-token', adminToken)
          .expect(200)
        })
        .then((success) => {done()}, (error) => {done(error)});
    });

    it('it should GET a admin given id - ADMIN AUTENTICADO', (done) => {
      request
        .post('/admins')
        .send(adminModel1)
        .expect(201)
      .then((res) => {
      return request
        .post('/auth/login')
        .send({username: adminModel1.login.username, senha: adminModel1.login.senha})
        .expect(200)
      })
      .then((res) => {
        return request
        .get('/admins/' + res.body.user.uuid)
        .set('x-access-token', res.body.token)
        .expect(200)
      })
      .then((success) => {done()}, (error) => {done(error)});
    });

    it('it should NOT GET a admin given id - ADMIN NÃO AUTENTICADO', (done) => {
      var userId = '';
      request
        .post('/admins')
        .send(adminModel1)
        .expect(201)
      .then((res) => {
      userId = res.body.insertId
      return request
        .post('/auth/login')
        .send({username: adminModel1.login.username, senha: adminModel1.login.senha + 'aasd'})
        .expect(401)
      })
      .then((res) => {
        return request
        .get('/admins/' + userId)
        .expect(403)
      })
      .then((success) => {done()}, (error) => {done(error)});
    });

    it('it should NOT GET a admins given id', (done) => {
      request
        .post('/admins')
        .send(adminModel1)
        .set('x-access-token', adminToken)
        .expect(201)
      .then((res) => {
      return request
        .get('/admins/' + res.body.insertId + 1)
        .expect(200)
        .set('x-access-token', adminToken)
        .expect((res) => {
          res.body.length.should.equals(0);
          res.body.should.be.a('array');
        })
      })
      .then((success) => {done()}, (error) => {done(error)});
    });
  });

  describe('POST /admins', () => {
    it('it should POST a admin ', (done) => {
      request
        .post('/admins')
        .send(adminModel1)
        .set('x-access-token', adminToken)
        .expect(201)
      .then((res) => {
      return request
        .get('/admins/' + res.body.insertId)
        .set('x-access-token', adminToken)
        .expect(200)
      })
      .then((success) => {done()}, (error) => {done(error)});
    });
  });

  describe('DELETE /admins/:id', () => {
      it('it should DELETE a admin ', (done) => {
        request
          .post('/admins')
          .send(adminModel1)
          .set('x-access-token', adminToken)
          .expect(201)
        .then((res) => {
        return request
          .delete('/admins/' + res.body.insertId )
          .set('x-access-token', adminToken)
          .expect(200)
          .expect((res) => {
            res.clientError.should.be.equal(false);
            res.serverError.should.be.equal(false);
            res.body.message.should.be.equal("Ok");
          })
        })
        .then((success) => {done()}, (error) => {done(error)});
      });
  });

  describe('PUT /admins/:id', () => {
    it('it should UPDATE a admin value', (done) => {
      var adminId;
      request
        .post('/admins')
        .send(adminModel1)
        .set('x-access-token', adminToken)
        .expect(201)
      .then((res) => {
      adminId = res.body.insertId
      return request
        .put('/admins/' + adminId)
        .send({campo: 'username', valor: 'victor'})
        .set('x-access-token', adminToken)
        .expect(200)
        .expect((res) => {
          res.clientError.should.be.equal(false);
          res.serverError.should.be.equal(false);
          res.body.message.should.be.equal("Atualização feita com sucesso");
        })
      })
      .then((res) => {
      return request
        .get('/admins/' + adminId)
        .set('x-access-token', adminToken)
        .expect(200)
      })
      .then((success) => {done()}, (error) => {done(error)});
    });
  });

});
