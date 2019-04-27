describe('==== ALUNO ====', () => {

  var alunoModel1 = {
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

  var alunoModel2 = {
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

  var alunoModel3 = {
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


    var alunoModel4 = {
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
      cleanTable('aluno');
      done();
  });

  describe('GET /alunos', () => {
    it('it should GET all the alunos',(done) => {
      request
        .post('/alunos')
        .send(alunoModel1)
        .expect(201)
      .then((res) => {
      return request
        .post('/alunos')
        .send(alunoModel2)
        .expect(201)
      })
      .then((res) => {
      return request
        .post('/alunos')
        .send(alunoModel3)
        .expect(201)
      })
      .then((res) => {
      return request
        .get('/alunos')
        .expect(200)
        .expect((res) => {
          res.body.length.should.equals(3);
        })
      })
      .then((success) => {done()}, (error) => {done(error)});
    });

    it('it should GET all the alunos', (done) => {
      request
      .get('/alunos')
      .expect(200)
      .expect((res) => {
        res.body.length.should.equals(0)
      })
      .then((success) => {done()}, (error) => {done(error)});
    });

  });

  describe('GET /alunos/:id', () => {
    it('it should GET a aluno given id', (done) => {
      request
        .post('/alunos')
        .send(alunoModel1)
        .expect(201)
      .then((res) => {
      return request
        .get('/alunos/' + res.body.insertId)
        .expect(200)
      })
      .then((success) => {done()}, (error) => {done(error)});
    });

    it('it should NOT GET a alunos given id', (done) => {
      request
        .post('/alunos')
        .send(alunoModel1)
        .expect(201)
      .then((res) => {
      return request
        .get('/alunos/' + res.body.insertId + 1)
        .expect(200)
        .expect((res) => {
          res.body.length.should.equals(0);
          res.body.should.be.a('array');
        })
      })
      .then((success) => {done()}, (error) => {done(error)});
    });

  });

  describe('POST /alunos', () => {
    it('it should POST a aluno ', (done) => {
      request
        .post('/alunos')
        .send(alunoModel1)
        .expect(201)
      .then((res) => {
      return request
        .get('/alunos/' + res.body.insertId)
        .expect(200)
      })
      .then((success) => {done()}, (error) => {done(error)});
    });

    it('it should POST a aluno without endereco', (done) =>{
      request
        .post('/alunos')
        .send(alunoModel4)
        .expect(201)
      .then((res) => {
      return request
        .get('/alunos/' + res.body.insertId)
        .expect(200)
      })
      .then((success) => {done()}, (error) => {done(error)});
    });

  });

  describe('DELETE /alunos/:id', () => {
      it('it should DELETE a aluno ', (done) => {
        request
          .post('/alunos')
          .send(alunoModel1)
          .expect(201)
        .then((res) => {
        return request
          .delete('/alunos/' + res.body.insertId )
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

  describe('PUT /alunos/:id', () => {
    it('it should UPDATE a aluno value', (done) => {
      var alunoId;
      request
        .post('/alunos')
        .send(alunoModel1)
        .expect(201)
      .then((res) => {
      alunoId = res.body.insertId
      return request
        .put('/alunos/' + alunoId)
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
        .get('/alunos/' + alunoId)
        .expect(200)
      })
      .then((success) => {done()}, (error) => {done(error)});
    });
  });

});
