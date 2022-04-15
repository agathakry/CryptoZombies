// 1. Lesson 11 Chapter 2 + 3
// first line of code should declare a const named CryptoZombies and set it equal 
// to result of the artifacts.require function with name of the contract we want to 
// test as an argument 

const ZombieFactory = artifacts.require("./zombiefactory.sol");
// for not throwing errors
const utils = require("./helpers/utils");
const time = require("./helpers/time");
const zombieNames = ["Zombie 1", "Zombie 2"];
var expect = require('chai').expect;
// 2. Write a test for the contract 
// 3. it() is executing test text 
contract("ZombieFactory", (accounts) => {
    // Chapter 3 
    // a. Initialise Alice and Bob accounts 
    
    let [alice, bob] = accounts;
    // Chapter 6: add a hook to avoid repetitions 
    let contractInstance;
    beforeEach(async () => {
        contractInstance = await ZombieFactory.new();
    });
    //delete contract when not needed
    //afterEach(async () => {
    //    await contractInstance.kill();
    //});

    // b. properly initialise the it function the second 
    // parameter callback will talk to blockchain which 
    // means the function is asynchronous 
    // async: everytime fct gets calle with wait, test wait for return
    it("should be able to create a new zombie", async () => { 
        // Chapter 4: create instance of contract (removed into beforeach) 
        //const contractInstance = await ZombieFactory.new();
        // CryptoZombies.new() talks to the blockchain, asynchronous 
        // function so we need to add await keyword 
        // Chapter 5: declare const result to create zombie
        const result =  await contractInstance.createRandomZombie(zombieNames[0], {from: alice});
        // once we have result, call assert assuming test passed if true 
        assert.equal(result.receipt.status, true);
        // check if logs name equals to zombie name 
        assert.equal(result.logs[0].args.name, zombieNames[0]);

        // Chapter 13: using CHAI insertion library 
        expect(result.receipt.status).to.equal(true);
        expect(result.logs[0].args.name).to.equal(zombieNames[0]);
    })
    // define new it() function 
    it("should not allow two zombies", async () => {
        // alice create first zombie 
        await contractInstance.createRandomZombie(zombieNames[0],{from: alice});
        // shouldthrow function to test if error, this is wrong in purpose
        await utils.shouldThrow(contractInstance.createRandomZombie(zombieNames[1], {from: alice}))

    })
// Chapter 8: context function and doing multiple tests, with "x" we skip the test 
    xcontext("with the single-step transfer scenario", async () => {
        it("should transfer a zombie", async () => {
        // TODO: Test the single-step transfer scenario.

        // Chapter 9: multiple test 
        // A. create zombie and make sure its alice 
        const result = await contractInstance.createRandomZombie(zombieNames[0], {from: alice});
        // B. declare zombieId and set it equal to zombie id 
        const zombieId = result.logs[0].args.zombieId.toNumber();
        // C. transfer from alice and bob 
        await contractInstance.transferFrom(alice, bob, zombieId,{from: alice});
        // D. declare newowner and set equal ownerOf with zombieId
        const newOwner = await contractInstance.ownerOf(zombieId);
        // E. Check whether Bob owns the ERC271 token 
        assert.equal(newOwner, bob);

        //Chapter 13: CHAI
        expect(newOwner).to.equal(bob);
        })
    })

    xcontext("with the two-step transfer scenario", async () => {
        it("should approve and then transfer a zombie when the approved address calls transferFrom", async () => {
        // TODO: Test the two-step scenario.  The approved address calls transferFrom
        // Chapter 10: 2 steps
        // A. first lines similar to 1 step
        const result = await contractInstance.createRandomZombie(zombieNames[0], {from:alice});
        const zombieId = result.logs[0].args.zombieId.toNumber();
        // to approve bob call approve and make sure alice method 
        await contractInstance.approve(bob, zombieId, {from: alice});

        // last three lines similar
        await contractInstance.transferFrom(alice, bob, zombieId, {from: bob});
        const newOwner = await contractInstance.ownerOf(zombieId);
        assert.equal(newOwner, bob);
        expect(newOwner).to.equal(bob);
        // 


        })
        it("should approve and then transfer a zombie when the owner calls transferFrom", async () => {
            // TODO: Test the two-step scenario.  The owner calls transferFrom
            // Chapter 11: alice calls transfer from
        const result = await contractInstance.createRandomZombie(zombieNames[0], {from: alice});
        const zombieId = result.logs[0].args.zombieId.toNumber();
        await contractInstance.approve(bob, zombieId, {from: alice});
        await contractInstance.transferFrom(alice, bob, zombieId, {from: alice});
        const newOwner = await contractInstance.ownerOf(zombieId);
        assert.equal(newOwner,bob);
        expect(newOwner).to.equal(bob);
        })
    })
    // Chapter 12: Time travel and zombie attack
    xit("zombies should be able to attack another zombie", async () => {
        let result;
        result = await contractInstance.createRandomZombie(zombieNames[0], {from: alice});
        const firstZombieId = result.logs[0].args.zombieId.toNumber();
        result = await contractInstance.createRandomZombie(zombieNames[1], {from: bob});
        const secondZombieId = result.logs[0].args.zombieId.toNumber();
        //TODO: increase the time
        await time.increase(time.duration.days(1))
        await contractInstance.attack(firstZombieId, secondZombieId, {from: alice});
        assert.equal(result.receipt.status, true);
        expect(result.receipt.status).to.equal(true);
    })

})