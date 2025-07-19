// const { describe } = require("eslint/lib/rule-tester/rule-tester");


describe('input', ()=>{
it('throw error', ()=>{
    expect((()=>4+4)()).toBe(8);
})
})