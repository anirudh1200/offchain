# offchain

A DApp to process ethereum transactions offline. Built at inOut6 <3. 

## Working

 - The address and the transaction details are input through a Native App
 - The transaction is then signed locally on the device and is then divided into chunks and indexed
 - These chunks are then sent to a sms client which will be handled by a backend server 
 - The backend server will then recieve the SMS and reorder the signed transaction in proper order and will then trigger via Web3
 
## User Interface
 - A React Native app to provide user interface to users to add necessary data for siginng the transaciton
 
## Contract features
 - Contains user data and other information
 - Built an ERC token which will provide/add credits to the user when user uses out service
