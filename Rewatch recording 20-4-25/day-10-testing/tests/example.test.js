const sum = (a, b) => {
    return a + b
}


describe('sum function', () => {
    it('Should return a sum of two numbers', () => {
        //setup
        const a = 1;
        const b = 4;

        //execute
        const result = sum(a, b)

        //compare
        expect(result).toBe(a + b)

    })
})