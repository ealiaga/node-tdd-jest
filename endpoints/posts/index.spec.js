const postHandlers = require('./index');

describe('Endpoints', () => {
    describe('posts', () => {
        it('should create', async() => {
            const usersMock = [ { id:1 }, { id: 2 } ];
            const post = {
                userId: 1,
                title: 'Title',
                body: 'Body of post'
            }

            const req = {
                body: post
            }

            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            }

            const axios = {
                get: jest.fn().mockResolvedValue({ data: usersMock }),
                post: jest.fn().mockResolvedValue({ data: { id: 1001 } })
            }

            await postHandlers({ axios }).post(req, res);
            
            expect(res.status.mock.calls).toEqual([
                [201]
            ]);
            expect(res.send.mock.calls).toEqual([
                [{ id: 1001}]
            ]);
            expect(axios.get.mock.calls).toEqual([ 
                ['https://jsonplaceholder.typicode.com/users']
            ]);
            expect(axios.post.mock.calls).toEqual([ 
                ['https://jsonplaceholder.typicode.com/posts', post]
             ]);
        });

        it('should not create if user not exist', async() => {
            const usersMock = [ { id:1 }, { id: 2 } ];
            const post = {
                userId: 3,
                title: 'Title',
                body: 'Body of post'
            }

            const req = {
                body: post
            }

            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
                sendStatus: jest.fn()
            }

            const axios = {
                get: jest.fn().mockResolvedValue({ data: usersMock }),
                post: jest.fn().mockResolvedValue({ data: { id: 1001 } })
            }
        
            await postHandlers({ axios }).post(req, res);

            expect(axios.post.mock.calls).toEqual([]);
            expect(res.sendStatus.mock.calls).toEqual([
                [400]
            ]);
            
        });
    });
});