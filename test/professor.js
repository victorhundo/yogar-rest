describe('==== PROFESSOR ====', () => {

  var professorModel1 = {
    "nome":{
      "primeiro":"ali",
      "ultimo":"keseroğlu"
    },
    "endereco":{
      "rua":"1958 doktorlar cd",
      "cidade":"artvin",
      "estado":"erzurum",
      "cep":12770,
    },
    "email":"ali.keseroğlu@example.com",
    "login":{
      "username":"orangefish377",
      "senha":"puffer",
      }
    }

  var professorModel2 = {
    "nome":{
      "primeiro":"wilma",
      "ultimo":"kirst"
    },
    "endereco":{
      "rua":"kirchgasse 174",
      "cidade":"geisenheim",
      "estado":"brandenburg",
      "cep":86154,
    },
    "email":"wilma.kirst@example.com",
    "login":{
      "username":"beautifulswan761",
      "senha":"puffer",
      }
    }

  var professorModel3 = {
    "nome":{
      "primeiro":"patrice",
      "ultimo":"roche"
    },
    "endereco":{
      "rua":"1577 rue de l'abbé-soulange-bodin",
      "cidade":"dinhard",
      "estado":"jura",
      "cep":6349,
    },
    "email":"patrice.roche@example.com",
    "login":{
      "username":"orangepanda426",
      "senha":"25802580",
      }
    }

    var professorModel4 = {
      "nome":{
        "primeiro":"Victor Hugo",
        "ultimo":"Fernandes de Sousa"
      },
      "email":"victorhundo@gmail.com",
      "login":{
        "username":"vhugo",
        "senha":"mudar123",
        }
      }

  //Before each test we empty the database
  beforeEach((done) => {
      cleanTable('professor');
      done();
  });

  describe('GET /professores', () => {
    it('it should GET all the professores',(done) => {
      request
        .post('/professores')
        .send(professorModel1)
        .expect(201)
      .then((res) => {
      return request
        .post('/professores')
        .send(professorModel2)
        .expect(201)
      })
      .then((res) => {
      return request
        .post('/professores')
        .send(professorModel3)
        .expect(201)
      })
      .then((res) => {
      return request
        .get('/professores')
        .expect(200)
        .expect((res) => {
          res.body.length.should.equals(3);
        })
      })
      .then((success) => {done()}, (error) => {done(error)});
    });

    it('it should GET all the professores', (done) => {
      request
      .get('/professores')
      .expect(200)
      .expect((res) => {
        res.body.length.should.equals(0)
      })
      .then((success) => {done()}, (error) => {done(error)});
    });

  });

  describe('GET /professores/:id', () => {
    it('it should GET a professor given id', (done) => {
      request
        .post('/professores')
        .send(professorModel1)
        .expect(201)
      .then((res) => {
      return request
        .get('/professores/' + res.body.insertId)
        .expect(200)
      })
      .then((success) => {done()}, (error) => {done(error)});
    });

    it('it should NOT GET a professores given id', (done) => {
      request
        .post('/professores')
        .send(professorModel1)
        .expect(201)
      .then((res) => {
      return request
        .get('/professores/' + res.body.insertId + 1)
        .expect(200)
        .expect((res) => {
          res.body.length.should.equals(0);
          res.body.should.be.a('array');
        })
      })
      .then((success) => {done()}, (error) => {done(error)});
    });

  });

  describe('POST /professores', () => {
    it('it should POST a professor ', (done) => {
      request
        .post('/professores')
        .send(professorModel1)
        .expect(201)
      .then((res) => {
      return request
        .get('/professores/' + res.body.insertId)
        .expect(200)
      })
      .then((success) => {done()}, (error) => {done(error)});
    });

    it('it should POST a professor without endereco', (done) =>{
      request
        .post('/professores')
        .send(professorModel4)
        .expect(201)
      .then((res) => {
      return request
        .get('/professores/' + res.body.insertId)
        .expect(200)
      })
      .then((success) => {done()}, (error) => {done(error)});
    });

  });

  describe('DELETE /professores/:id', () => {
      it('it should DELETE a professor ', (done) => {
        request
          .post('/professores')
          .send(professorModel1)
          .expect(201)
        .then((res) => {
        return request
          .delete('/professores/' + res.body.insertId )
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

  describe('PUT /professores/:id', () => {
    it('it should UPDATE a professor value', (done) => {
      var professorId;
      request
        .post('/professores')
        .send(professorModel1)
        .expect(201)
      .then((res) => {
      professorId = res.body.insertId
      return request
        .put('/professores/' + professorId)
        .send({campo: 'primeiroNome', valor: 'victor'})
        .expect(200)
        .expect((res) => {
          res.clientError.should.be.equal(false);
          res.serverError.should.be.equal(false);
          res.body.message.should.be.equal("Atualização feita com sucesso");
        })
      })
      .then((res) => {
      return request
        .get('/professores/' + professorId)
        .expect(200)
      })
      .then((success) => {done()}, (error) => {done(error)});
    });
  });

});
