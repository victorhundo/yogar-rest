describe('==== AUTH ====', () => {

  //Before each test we empty the database
  beforeEach((done) => {
      cleanTable('aluno');
      cleanTable('professor');
      done();
  });

  var alunoModel = {
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

  var professorModel = {
    "nome":{
      "primeiro":"Rafaella",
      "ultimo":"Chaves"
    },
    "email":"rafaella@gmail.com",
    "login":{
      "username":"rafaxxx",
      "senha":"mudar123",
      }
    }

  describe('POST /auth/login', () => {
    it('it should LOGIN a aluno ', (done) => {
      request
        .post('/alunos')
        .send(alunoModel)
        .expect(201)
      .then((res) => {
      return request
        .post('/auth/login')
        .send({uuid: res.body.insertId})
        .expect(200)
      })
      .then((res) => {
        res.body.should.have.property('type');
        res.body.type.should.equal('aluno');
      })
      .then((success) => {done()}, (error) => {done(error)});
    });

    it('it should LOGIN a professor', (done) => {
      request
        .post('/professores')
        .send(professorModel)
        .expect(201)
      .then((res) => {
      return request
        .post('/auth/login')
        .send({uuid: res.body.insertId})
        .expect(200)
      })
      .then((res) => {
        res.body.should.have.property('type');
        res.body.type.should.equal('professor');
      })
      .then((success) => {done()}, (error) => {done(error)});
    });

  });

});
