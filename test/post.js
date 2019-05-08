describe('==== POSTS ====', () => {

  var adminToken = ''
  var postModel = {
    "titulo": "titulo",
    "texto": "texto",
    "uuidProfessor": undefined,
    "img": "http://yogalab.pt/wp-content/uploads/2018/11/melhor-estudio-de-Yoga-Lisboa.jpg"
  }

  var postModel2 = {
    "titulo": "titulo2",
    "texto": "texto2",
    "uuidProfessor": undefined,
    "img": "http://yogalab.pt/wp-content/uploads/2018/11/melhor-estudio-de-Yoga-Lisboa.jpg"
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
      cleanTable('post');
      adminToken = generateToken('admin');
      postModel.uuidProfessor = undefined;
      done();
  });

  describe('GET /posts', () => {
    it('it should GET all the posts', (done) => {
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
        .post('/professores/' + professorId + '/posts')
        .send(postModel)
        .set('x-access-token', adminToken)
        .expect(201)
      })
      .then((res) => {
      return request
        .post('/professores/' + professorId2 + '/posts')
        .send(postModel2)
        .set('x-access-token', adminToken)
        .expect(201)
      })
      .then((res) => {
      return request
        .get('/posts')
        .expect(200)
        .expect((res) => {
          res.body.length.should.equals(2);
        })
      })
      .then((success) => {done()}, (error) => {done(error)});
    })
  })

  describe('GET /professores/:idProfessor/posts', () => {
    it('it should GET all the posts from :idProfessor',(done) => {
      var professorId;
      request
        .post('/professores')
        .send(professorModel)
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
