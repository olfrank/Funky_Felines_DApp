var web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
var token;
var marketplace;
var user;
// var dnaStr = "457896541299";

var contractAddress = "0xa41d706Aeb4f41d412d9265D5180dC119EcAd864";
var marketplaceContract = "0xFA286fF0b52A8B381281318c1961B5097b7f0677";
var contractOwner;

$(document).ready(function () {
  window.ethereum.enable().then(function (accounts) {
    token = new web3.eth.Contract(abi.catContract, contractAddress, { from: accounts[0] });
    marketplace = new web3.eth.Contract(abi.marketplace, marketplaceContract, { from: accounts[0] });
    // token.methods.owner().call().then(test => {
    //   contractOwner = test;
    // });
    user = accounts[0];
    console.log("Cat Contract instance: "+ token);
    console.log("Marketplace instance: "+ marketplace);
    myCats();


    marketplace.events.MarketTransaction()
      .on('data', (event) => {
        console.log(event);
        var eventType = event.returnValues["TxType"].toString()
        var tokenId = event.returnValues["tokenId"]
        if (eventType == "Buy") {
          alertMSG('Succesfully Kitty purchase! Now you own this Kitty with TokenId: ' + tokenId, 'success')
        }
        if (eventType == "Create offer") {
          alert_msg('Successfully Offer set for Kitty id: ' + tokenId, 'success')
          $('#cancelBox').removeClass('hidden')
          $('#cancelBtn').attr('onclick', 'deleteOffer(' + tokenId + ')')
          $('#sellBtn').attr('onclick', '')
          $('#sellBtn').addClass('btn-warning')
          $('#sellBtn').html('<b>For sale at:</b>')
          var price = $('#catPrice').val()
          $('#catPrice').val(price)
          $('#catPrice').prop('readonly', true)

          
        }
        if (eventType == "Remove offer") {
          alertMSG('Successfully Offer remove for Kitty id: ' + tokenId, 'success')
          $('#cancelBox').addClass('hidden')
          $('#cancelBtn').attr('onclick', '')          
          $('#catPrice').val('')
          $('#catPrice').prop('readonly', false)
          $('#sellBtn').removeClass('btn-warning')
          $('#sellBtn').addClass('btn-success')
          $('#sellBtn').html('<b>Sell me</b>')
          $('#sellBtn').attr('onclick', 'sellCat(' + tokenId + ')')          
        }
      })
      .on('error', console.error);
  });

});

function createCat(){
  var dnaStr = getDna();
  token.methods.createCatGen0(dnaStr).send({}, function(error, txHash){
    if(error){
      console.log("createCat function " + error)
    }else {
      console.log(txHash)
      
      token.events.Birth().on('data', (event) => {
        console.log(event);
        let owner = event.returnValues.owner;
        console.log(owner);
        let catId = event.returnValues.catId;
        console.log(catId);
        let mumId = event.returnValues.mumId;
        console.log(mumId);
        let dadId = event.returnValues.dadId;
        console.log(dadId);
        let genes = event.returnValues.genes    
        console.log(genes);
        
        alertMSG("You have successfully created a cat... INFO: owner: " + owner
                  + " catId: " + catId
                  + " mumId: " + mumId
                  + " dadId: " + dadId
                  + " genes: " + genes,'success');
      })
      .on('error', console.error);

      
    }
  });
  }

//Get cats of a current address
async function myCats() {
  var arrayId = await token.methods.ownedTokens(ethereum.selectedAddress).call();
  for (i = 0; i < arrayId.length; i++) {
    catAppend(arrayId[i]);
  }
}

//Appending cats for catalog
async function catAppend(id) {
  var cat = await token.methods.getCat(id).call()
  appendCat(cat.genes, id, cat.generation)
}


async function checkOffer(id) {

  let result;
  try {

    result = await marketplace.methods.getOffer(id).call();
    var price = result['price'];
    var seller = result['seller'];
    var onsale = false
    //If price more than 0 means that cat is for sale
    if (price > 0) {
      onsale = true
    }
    //Also might check that belong to someone
    price = Web3.utils.fromWei(price, 'ether');
    var offer = { seller: seller, price: price, onsale: onsale }
    return offer

  } catch (err) {
    console.log(err);
    return
  }

}

// Get all the kitties from address
async function catByOwner(address) {

  let result;
  try {
    result = await token.methods.ownedTokens(address).call();
  } catch (err) {
    console.log(err);
  }
}

//Gen 0 cats for sale
async function contractCatalog() {
  var arrayId = await marketplace.methods.getAllTokenOnSale().call();
  for (i = 0; i < arrayId.length; i++) {
    if(arrayId[i] != "0"){
      appendCat(arrayId[i])
    }    
  }
}




//Get cats for breeding that are not selected
async function breedCats(gender) {
  var arrayId = await token.methods.ownedTokens(ethereum.selectedAddress).call();
  for (i = 0; i < arrayId.length; i++) {
    breedAppend(arrayId[i], gender)
  }
}

// Checks that the user address is same as the cat owner address
//This is use for checking if user can sell this cat
async function catOwnership(id) {

  var address = await token.methods.ownerOf(id).call()

  if (address.toLowerCase() == user.toLowerCase()) {      
    return true
  }  else{
    return false
  }
}


//Appending cats to breed selection
async function appendBreed(id, gender) {
  var cat = await token.methods.getCat(id).call()
  breedAppend(cat[0], id, cat['generation'], gender)
}

//Appending cats to breed selection
async function breed(dadId, mumId) {
  try {
    await token.methods.breed(dadId, mumId).send()
  } catch (err) {
    console.log("function breed"+err)
  }
}




async function catSingle() {
  var id = get_variables().catId
  var cat = await instance.methods.getCat(id).call()
  singleCat(cat[0], id, cat['generation'])
}

async function deleteOffer(id) {
  try {
    await marketplace.methods.removeOffer(id).send();    
  } catch (err) {
    console.log("deleteOffer function "+err);
  }

}

async function sellCat(id) {  
  var price = $('#catPrice').val()
  var amount = web3.utils.toWei(price, "ether")
  try {
    await marketplace.methods.createOffer(amount,id).send();
  } catch (err) {
    console.log("sellCat function "+err);
  }
}

async function buyCat(id, price) {
  var amount = web3.utils.toWei(price, "ether")
  try {
    await marketplace.methods.buyCat(id).send({ value: amount });
  } catch (err) {
    console.log("buyCat function "+err);
  }
}

async function totalCats() {
  var cats = await token.methods.totalSupply().call();

  return cats;
}







































//this line will connect us to the Ethereum blockchain 
//and we can access it through this variable
// var web3 = new Web3(Web3.givenProvider);

//contract instance
// var instance;
// var marketplaceInstance;
// var user;

// var contractAddress = "0x907EcC1E7732ba1397CF01E16eD7DaBf2483811d";

// var marketplaceAddress = "0x555DDBBfBE210f2D64c55c3C6af2D6D05A999f35";

// $(document).ready(function(){
//     window.ethereum.enable().then(function(accounts){
//         instance = new web3.eth.Contract(abi.catContract, contractAddress, {from: accounts[0]})
//         // marketplaceInstance = new web3.eth.Contract(abi.marketplace, marketplaceAddress, {from: accounts[0]})

//         user = accounts[0];

//         console.log(instance);
        
        
        // marketplaceInstance.events.MarketTransaction()
        
//     })
// });

// function createCat(){
//     var dnaStr = getDna();
//     instance.methods.createCatGen0(dnaStr).send({}, function(error, txHash){
//         if(error)
//             console.log(err);
//         else{
//             console.log(txHash)
//             alert("Transaction has been successfully sent");
//             instance.events.Birth().on('data', function(event){
//                 console.log(event);
//                 let owner = event.returnValues.owner;
//                 console.log(owner);
//                 let catId = event.returnValues.catId;
//                 console.log(catId);
//                 let mumId = event.returnValues.mumId;
//                 console.log(mumId);
//                 let dadId = event.returnValues.dadId;
//                 console.log(dadId);
//                 let genes = event.returnValues.genes;
//                 console.log(genes);
    
//                 $("#catCreated").css("display", "block");
//                 $("#catCreated").text( "CatId: " + catId + 
//                                        "Owner: " + owner + 
//                                        "MumId: " + mumId + 
//                                        "DadId: " + dadId +
//                                        "Genes: " + genes );
    
//             }).on('error', console.error)
//         }
//     })
// }

// async function checkOffer(id){
//     var offer = await instance.methods.getOffer(id).call();
//     var price = offer['price'];
//     var seller = offer['seller'];
//     var onsale = false;

//     if(price > 0){
//         onsale = true;
//     }

//     price = Web3.utils.fromWei(price, 'ether');
//     var offer = { seller: seller, price: price, onsale: onsale }
//     return offer
// }



