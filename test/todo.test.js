const request = require('supertest')
const app = require('./server')
const port = 4042

var server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})

beforeAll(async () => {
    const add = {
        email: "krisnajufer@gmail.com",
        password: "jufer"
    }
    const res = await request(server).post('/api/login').send(add)
    token = res.body.data.token
})

afterAll((done) => {
    done()
})


describe('Todos', () => {
    let id

    test('List Todo', async () => {
        const res = await request(server).get('/api/todos').set('Authorization', `Bearer ${token}`)
        expect(res.status).toBe(200)
        console.log(res.body.data);
    })

    test('List Todo User', async () => {
        const res = await request(server).get('/api/todos/user').set('Authorization', `Bearer ${token}`)
        expect(res.status).toBe(200)
    })

    test('Create Todo user', async () => {
        const add = {
            description: "test todo",
        }
        const res = await request(server).post('/api/todos').send(add).set('Authorization', `Bearer ${token}`)
        expect(res.status).toBe(201)
        id = res.body.data.id

    })

    test('Put Todo ', async () => {
        const put = {
            description: "test todo change",
        }
        const res = await request(server).put('/api/todos/' + id).send(put).set('Authorization', `Bearer ${token}`)
        expect(res.status).toBe(200)
    })

    test('Filter List Todo User', async () => {
        const res = await request(server).get('/api/todos/filter/user/' + 5).set('Authorization', `Bearer ${token}`)
        expect(res.status).toBe(200)
    });

    test('Delete Todo', async () => {
        const res = await request(server).delete('/api/todos/' + id).set('Authorization', `Bearer ${token}`)
        expect(res.status).toBe(200)
    })
    
})
