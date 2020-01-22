describe("Routes: Token", ()=> {
	const Users = app.db.models.Users;
	describe("POST /token", () => {
		describe("status 200", ()=> {
			it("returns authenticated user token", done => {
				request.post("/token")
					.send({
						email:'lucas11@gmail.com',
						password: '1234'
					})
					.expect(200)
					.end((err, res)=> {
						expect(res.body).to.include.keys("token");
						done(err);
					})

			});
		});
		describe("status 401", ()=> {
			it("throws error when password is incorrect", done=> {
				request.post("/token")
					.send({
						email:'lucas11@gmail.com',
						password:'12345677'
					})
					.expect(401)
					.end((err, res)=> {
						done(err);
					})
			});
			it("throws error when email not exits", done=> {
				request.post("/token")
					.send({
						email:'lucas1221@gmail.com',
						password:'12334564'
					})
					.expect(401)
					.end((err, res)=> {
						done(err);
					})

			});
			it("throws error when email and password are blank", done => {
				request.post("/token")
					.expect(401)
					.end((err, res)=> {
						done(err);
					})
			})
		})
	})
})