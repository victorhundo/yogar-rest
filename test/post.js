describe('==== POSTS ====', () => {

  var adminToken = ''
  var postModel = {
    "titulo": "titulo",
    "texto": "texto",
    "uuidProfessor": undefined
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

  //Before each test we empty the database
  beforeEach((done) => {
      cleanTable('post');
      adminToken = generateToken('admin');
      postModel.uuidProfessor = undefined;
      done();
  });

  describe('GET /posts', () => {
    it('it should GET all the posts',(done) => {
      var professorId;
      request
        .post('/professores')
        .send(professorModel)
        .set('x-access-token', adminToken)
        .expect(201)
      .then((res) => {
      professorId = res.body.insertId;
      return request
        .post('/professores/' + professorId + '/posts')
        .send(postModel)
        .set('x-access-token', adminToken)
        .expect(201)
      })
      .then((res) => {
      return request
        .post('/professores/' + professorId + '/posts')
        .send(postModel)
        .set('x-access-token', adminToken)
        .expect(201)
      })
      .then((res) => {
      return request
        .get('/professores/' + professorId + '/posts')
        .set('x-access-token', adminToken)
        .expect(200)
        .expect((res) => {
          res.body.length.should.equals(2);
        })
      })
      .then((success) => {done()}, (error) => {done(error)});
    });
  });

});
