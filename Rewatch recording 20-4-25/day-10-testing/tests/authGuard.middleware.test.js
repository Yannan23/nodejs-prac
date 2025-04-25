jest.mock('../src/utils/jwt')
jest.mock('../src/utils/config', () => ({}))

const authGuardMiddleware = require('../src/middleware/authGard.middleware');
const { validateToken } = require('../src/utils/jwt');

describe('auth guard middleware', () => {
    it('should return 401 when header is not defined', () => {
        //setup
        const req = { header: jest.fn() };
        const res = {
            status: jest.fn(),
            json: jest.fn()
        };
        const next = jest.fn();
        res.status.mockReturnValue(res)

        //execute
        authGuardMiddleware(req, res, next)

        //compare
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.status).toHaveBeenCalled();
        expect(next).not.toHaveBeenCalled();
    })

    it('should pass the authentication check', () => {
        const next = jest.fn()
        const token = 'token'
        const payload = { id: 123 }
        const req = {
            header: jest.fn()
        }
        const res = {}
        validateToken.mockReturnValue(payload)
        req.header.mockReturnValue(`Bearer ${token}`)

        authGuardMiddleware(req, res, next)

        expect(next).toHaveBeenCalled();
        expect(req.user).toEqual(payload);
        expect(validateToken).toHaveBeenCalledWith(token)
    })
})