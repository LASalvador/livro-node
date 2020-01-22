const passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports = app => {
	const Users = app.db.models.Users;
	const config = app.libs.config;

	var opts = {}; 
	opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
	opts.secretOrKey = config.jwtSecret;

	passport.use(new JwtStrategy( opts, function (payload, done) {
			Users.findById(payload.id)
			.then(user => {
				if(user) {
					return done(null, {id: user.id , email: user.email});
				}
				return done(null, false);
			})
			.catch(error => done(error, null));
	}));
	return {
		initialize: ()=> {
			return passport.initialize();
		},
		authenticate: ()=> {
			return passport.authenticate("jwt", config.jwtSession);
		}
	};
};


// new JwtStrategy(opts, function(jwt_payload, done) {
//     User.findOne({id: jwt_payload.sub}, function(err, user) {
//         if (err) {
//             return done(err, false);
//         }
//         if (user) {
//             return done(null, user);
//         } else {
//             return done(null, false);
//             // or you could create a new account
//         }
//     });
// }));