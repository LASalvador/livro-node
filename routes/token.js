const jwt = require('jwt-simple');
const bcrypt = require('bcrypt');

function isPassWord(encodedPassword , password) {
	return bcrypt.compareSync(password, encodedPassword);
}

module.exports = app => {
	const cfg = app.libs.config;
	const Users = app.db.models.Users;
	/**
	* @api {post} /token Gera token de autenticação
	* @apiGroup Credencial
	* @apiParam {String} email Email do usuário
	* @apiParam {String} senha Senha do usuário
	* @apiParamExample {json} Entrada
	* {
	*	"email": "doctor.who@who.com",
	*	"senha": "TARDIS"
	* }
	* @apiSuccess {String} token Token do usuário autenticado
	* @apiSuccessExample {json} Sucesso
	*	HTTP/1.1 200 OK
	*	{"token": "xyz.abc.123.hgf"}
	* @apiErrorExample {json} Erro de autenticação
	* 	HTTP/1.1 401 Unauthorized
	*/
	app.post('/token', (req, res) => {
		const email = req.body.email;
		const password = req.body.password;

		Users.findOne({where: {email: email}})
		.then(user => {
			if(isPassWord(user.password, password)){
				const payload = {id : user.id};
				res.json({
					token: jwt.encode(payload, cfg.jwtSecret)
				});
			} else {
				res.sendStatus(401);
			}
		})
		.catch(() => {
			res.sendStatus(401);
		})
	});
}

