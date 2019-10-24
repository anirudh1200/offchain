var Web3 = require('web3');
var Tx = require('ethereumjs-tx');
var fs = require('fs');
web3 = new Web3(new Web3.providers.HttpProvider("HTTPS://ropsten.infura.io/v3/eda623b4a9664c5ba54a726541372946"));
var abiArray = JSON.parse(fs.readFileSync('mycoin.json', 'utf-8'));

// exports.getBalance=(address)=>{

// }
let count;
// console.log(count)
// console.log(abiArray)
var contractAddress = "0xEbF71C54b7Fc87F120B0369012f3C1a40D8ae559";
// var contract =new web3.eth.contract(abiArray,contractAddress);
var contract = new web3.eth.Contract(abiArray, contractAddress)
// console.log(contract)
// var rawTransaction = {
//     "from": "0x3c250227150438ed372F93Bb01C51785281d9DEF",
//     "nonce": web3.utils.toHex(count),
//     "gas": 200000,
//     "to": contractAddress,
//     "value": "0x0",
//     "data": contract.methods.balanceOf("0x780b7F58b201ac352fBD22654d04D82926386aF8"),
//     "chainId": 0x03
// };
web3.eth.getTransactionCount("0x3c250227150438ed372F93Bb01C51785281d9DEF").then((_nonce) => {
    console.log(_nonce)
    var gas = 0
    var gasLim = 0
    web3.eth.getGasPrice().then((gasP) => {
        gas = gasP
        console.log("-->", gas)

    })
    web3.eth.getGasPrice().then((gasL) => {
        gasLim = gasL
        console.log("-->", gasLim)

    })
    var rawTransaction = {
        "from": new Buffer.from('3c250227150438ed372f93bb01c51785281d9def', 'hex'),
        "nonce": _nonce,
        "gasPrice": 2000000000,
        "gasLimit": 67000,
        "to": new Buffer.from("EbF71C54b7Fc87F120B0369012f3C1a40D8ae559", 'hex'),
        "value": 0,
        "data": contract.methods.balanceOf("0x3c250227150438ed372f93bb01c51785281d9def").encodeABI(),
        // "data": contract.methods.balanceOf("0x3c250227150438ed372F93Bb01C51785281d9DEF").encodeABI(),
        "chainId": 3
    };
    console.log("raw", rawTransaction)
    let privKey = new Buffer.from('2562fe54387b29ad63201f64f64c54647a58534b8b65d45e33efc057581bec64', 'hex');
    let tx = new Tx(rawTransaction);
    tx.sign(privKey);
    var serializedTx = tx.serialize();
    web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
        .on('receipt', console.log).catch(console.log);
}).catch(console.log);

exports.getBalance = async (req, res) => {

    var contract = new web3.eth.Contract(abiArray, contractAddress)
    web3.eth.getTransactionCount("0x3c250227150438ed372F93Bb01C51785281d9DEF").then((_nonce) => {
    
        var rawTransaction = {
            "from": new Buffer.from('3c250227150438ed372f93bb01c51785281d9def', 'hex'),
            "nonce": _nonce,
            "gasPrice": 2000000000,
            "gasLimit": 67000,
            "to": new Buffer.from("EbF71C54b7Fc87F120B0369012f3C1a40D8ae559", 'hex'),
            "value": 0,
            "data": contract.methods.balanceOf("0x3c250227150438ed372f93bb01c51785281d9def").encodeABI(),
            // "data": contract.methods.balanceOf("0x3c250227150438ed372F93Bb01C51785281d9DEF").encodeABI(),
            "chainId": 3
        };
        // console.log("raw", rawTransaction)
        let privKey = new Buffer.from('2562fe54387b29ad63201f64f64c54647a58534b8b65d45e33efc057581bec64', 'hex');
        let tx = new Tx(rawTransaction);
        tx.sign(privKey);
        var serializedTx = tx.serialize();
        web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
            .on('receipt', console.log).catch(console.log);
    }).catch(console.log);

}