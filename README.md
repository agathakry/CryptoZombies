# CryptoZombies Implementation 
Implementation of the popular [Crypto Zombies Tutorial](https://cryptozombies.io/) Series including testing using [Truffle](https://trufflesuite.com/) and [Ganache](https://trufflesuite.com/ganache/) for deploying on testnet. 

The goal is to build the "Crypto Zombies" game, where a user can create a random zombie, fight against other zombies and win levels. 


## Requirements 
```
node
npm
truffle 
```

## Getting started 
Create a truffle project
```
mkdir CryptoZombies 
cd CryptoZombies
truffle init
```
Compile solidity code
```
truffle compile
```
Migrate contracts to testnet 
``` 
truffle migrate 
```
Test contracts saved in the **test** directory 
```
truffle test
```

## Security Notice
This project is only an example, do not deploy on mainnet, never share your private keys online.