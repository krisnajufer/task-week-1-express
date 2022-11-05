const request = require('supertest')
const app = require('./server')
const port = 4040

var server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})

afterAll((done) => {
    done()
})



describe('auth', () => {

    test('login', async () => {
        const add = {
            email: "krisnajufer@gmail.com",
            password: "jufer"
        }
        const res = await request(server).post('/api/login').send(add)
        expect(res.status).toBe(200)
    })
    
})
