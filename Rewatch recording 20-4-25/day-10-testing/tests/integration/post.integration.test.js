const app = require('../../src/index');
const PostModel = require('../../src/models/post.model');
describe('post resource', () => {

    //test create post
    describe('POST /v1/posts', () => {
        let testUser;
        let authToken;
        beforeEach(() => {
            const { user, token } = CreateUser()
            testUser = user;
            authToken = token
        })

        it('should create a new post when authenticated', async () => {
            const postData = {
                title: 'test title',
                content: 'test content'
            }

            //execute
            supertest(app)
                .post('./v1/posts')
                .set('Authorization', `Bearer ${authToken}`)
                .send(postData)

            expect(res.status).toBe(201);
            expect(res.body.data.title).toBe(postData.title);
            expect(res.body.data.content).toBe(postData.content);
            expect(res.body.data.user).toBe(testUser._id.toString)

            const post = await PostModel.findById(res.body.data._id);
            expect(post.title).toBe(postData.title);
            expect(post.content).toBe(postData.content);
            expect(post.user.toString()).toBe(testUser._id.toString())
        })
    })
})