// 1. Lesson 11 Chapter 2 + 3
// first line of code should declare a const named CryptoZombies and set it equal 
// to result of the artifacts.require function with name of the contract we want to 
// test as an argument 

const CryptoZombies = artifacts.require("CryptoZombies");

// 2. Write a test for the contract 
// 3. it() is executing test text 
contract("CryptoZombies", (accounts) => {
    // Chapter 3 
    // a. Initialise Alice and Bob accounts 
    let [alice, bob] = accounts;
    // b. properly initialise the it function the second 
    // parameter callback will talk to blockchain which 
    // means the function is asynchronous 
    // async: everytime fct gets calle with wait, test wait for return
    it("should be able to create a new zombie", async () => {     
    })
})