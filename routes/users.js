module.exports = app => {
	const Users = app.db.models.Users;
	app.route('/user')
		.all(app.auth.authenticate())
		/**
		* @api {get} /user Exibe usuário autenticado
		* @apiGroup Usuário
		* @apiHeader {String} Athorization Token de Usuário
		* @apiHedaerExample {json} Header
		* 	{"Authorization": "JWT ABA 25692"}
		* @apiSuccess {Number} id Id de registro
		* @apiSuccess {String} name Nome de usuário
		* @apiSuccess {String} email Email de usuário
		* @apiSuccessExample {json} Sucesso
		*	HTTP/1.1 200 OK
		*	{
		*		"id": 1,
		*		"name": "John Connor",
		*		"email": "john@connor.com",
		*	}
		* @apiErrorExample {json} Erro de consulta
		* 	HTTP/1.1 412 Precondition Failed
		*/
		.get((req,res) => {
			Users.findById(req.user.id, {attributes: ["id", 'nome', 'email']})
			.then(result => res.json(result))
			.catch(error => {
				res.status(412).json({msg: error.message});
			});
		})
		/**
		* @api {delete} /user Exclui usuário autenticado
		* @apiGroup Usuário
		* @apiHeader {String} Athorization Token de Usuário
		* @apiHedaerExample {json} Header
		* 	{"Authorization": "JWT ABA 25692"}
		* @apiSuccess {Number} id Id de registro
		* @apiSuccess {String} name Nome de usuário
		* @apiSuccess {String} email Email de usuário
		* @apiSuccessExample {json} Sucesso
		*	HTTP/1.1 204 No Content
		* @apiErrorExample {json} Erro na exclusão
		* 	HTTP/1.1 412 Precondition Failed
		*/
		.delete((req,res) => {
			Users.destroy({where: {id: req.params.id }})
			.then(() => res.sendStatus(204))
			.catch(error => {
				res.status(412).json({msg: error.message});
			})
		})
	/**
		* @api {post} /users Cadastro novo usuário
		* @apiGroup Usuário
		* @apiParam {String} email Email do usuário
		* @apiParam {String} senha Senha do usuário
		* @apiParam {String} name Nome do usuário
		* @apiParamExample {json} Entrada
		* {
		*	"name": "doctor who",
		*	"email": "doctor.who@who.com",
		*	"senha": "TARDIS"
		* }
		* @apiSuccess {Number} id Id de registro
		* @apiSuccess {String} name Nome de usuário
		* @apiSuccess {String} email Email de usuário
		* @apiSuccess {String} password Senha de usuário criptografada
		* @apiSuccess {Date} updated_at Data de atualização
		* @apiSuccess {Date} created_at Data de cadastro
		* @apiSuccessExample {json} Sucesso
		*	HTTP/1.1 200 OK
		*	{
		*		"id": 1,
		*		"name": "John Connor",
		*		"email": "john@connor.com",
		* 		"password": "892348yfnsn!#2412gskh",
		*		"updated_at" : "2015-09-24T15:46:51.333Z",
		*		"created_at" : "2015-09-24T15:46:51.333Z",
		*	}
		* @apiErrorExample {json} Erro no cadastro
		* 	HTTP/1.1 412 Precondition Failed
		*/
	app.post('/users/', (req,res) => {
		Users.create(req.body)
		.then(result => res.json(result))
		.catch(error => {
			res.status(412).json({msg: error.message});
		});
	});
};