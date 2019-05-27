describe('==== LICOES ====', () => {

  var adminToken = ''
  var licaoModel = {
    "uuidProfessor": undefined,
    "titulo": "titulo",
    "descricao": "descricao",
    "nivel": 1,
    "tag": "iniciante",
    "ehPremium": false
  }

  var licaoModel2 = {
    "uuidProfessor": undefined,
    "titulo": "titulo2",
    "descricao": "descricao2",
    "nivel": 2,
    "tag": "iniciante",
    "ehPremium": false
  }

  var professorModel = {
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

  var professorModel2= {
    "nome":{
      "primeiro":"Rafaella",
      "ultimo":"Chaves"
    },
    "email":"rafa@gmail.com",
    "login":{
      "username":"rafaxxx",
      "senha":"mudar123",
    }
  }

  //Before each test we empty the database
  beforeEach((done) => {
      cleanTable('licao');
      adminToken = generateToken('admin');
      licaoModel.uuidProfessor = undefined;
      done();
  });

  describe('GET /licoes', () => {
    it('it should GET all the licoes', (done) => {
      var professorId, professorId2;
      request
        .post('/professores')
        .send(professorModel)
        .expect(201)
      .then((res) => {
      professorId = res.body.insertId;
      return request
        .post('/professores')
        .send(professorModel2)
        .expect(201)
      })
      .then((res) => {
      professorId2 = res.body.insertId;
      return request
        .post('/professores/' + professorId + '/licoes')
        .attach("theFile", 'test/files/video.mp4')
        .field('titulo', licaoModel.titulo)
        .field('descricao', licaoModel.descricao)
        .field('nivel', licaoModel.nivel)
        .field('tag', licaoModel.tag)
        .field('ehPremium', licaoModel.ehPremium)
        .set('x-access-token', adminToken)
        .expect(201)
      })
      .then((res) => {
      return request
        .post('/professores/' + professorId2 + '/licoes')
        .attach("theFile", 'test/files/video.mp4')
        .field('titulo', licaoModel2.titulo)
        .field('descricao', licaoModel2.descricao)
        .field('nivel', licaoModel2.nivel)
        .field('tag', licaoModel2.tag)
        .field('ehPremium', licaoModel2.ehPremium)
        .set('x-access-token', adminToken)
        .expect(201)
      })
      .then((res) => {
      return request
        .get('/licoes')
        .expect(200)
        .expect((res) => {
          res.body.length.should.equals(2);
        })
      })
      .then((success) => {done()}, (error) => {done(error)});
    })
  })

});
