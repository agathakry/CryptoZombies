// 1. Lesson 11 Chapter 2 + 3
// first line of code should declare a const named CryptoZombies and set it equal 
// to result of the artifacts.require function with name of the contract we want to 
// test as an argument 

const ZombieFactory = artifacts.require("./zombiefactory.sol");
// for not throwing errors
const utils = require("./helpers/utils");
const zombieNames = ["Zombie 1", "Zombie 2"];
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

    afterEach(async () => {
        await contractInstance.kill();
    });

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
    })
    // define new it() function 
    it("should not allow two zombies", async () => {
        // alice create first zombie 
        await contractInstance.createRandomZombie(zombieNames[0],{from: alice});
        // shouldthrow function to test if error, this is wrong in purpose
        await utils.shouldThrow(contractInstance.createRandomZombie(zombieNames[1], {from: alice}))

    })
})