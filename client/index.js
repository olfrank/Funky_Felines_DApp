var web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
var token;
var marketplace;
var user;

var contractAddress = "0x6F01B33613F8BC8A1308DBf24Ace3530E2784945";
var marketplaceContract = "0xa19447cbcEf33edaf14380792Dee8f8763fa02d8";
var contractOwner;

$(document).ready(function () {
  window.ethereum.enable().then(function (accounts) {
    token = new web3.eth.Contract(abi.catContract, contractAddress, { from: accounts[0] });
    marketplace = new web3.eth.Contract(abi.marketplace, marketplaceContract, { from: accounts[0] });
    
    user = accounts[0];
    // console.log("Cat Contract instance: "+ token);
    // console.log("Marketplace instance: "+ marketplace);
    myCats();

  });

});

function createCat(){
  var dnaStr = getDna();
  token.methods.createCatGen0(dnaStr).send({}, function(error, txHash){
    if(error){
      console.log("createCat function " + error)
      alertMSG("Only the contract deployer can create cats at the moment... sorry 😢😢")
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
  console.log(id)
  var cat = await token.methods.getCat(id).call()
  appendCat(cat.genes, id, cat.generation)
}


async function checkOffer(id){

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
    console.log("checkOffer function", err);
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

//cats for sale
async function getAllSaleCats() {
  var arrayId = await marketplace.methods.getAllTokenOnSale().call();
  console.log(arrayId);
  for (i = 0; i < arrayId.length; i++) {
      appendSaleCats(arrayId[i]);
     
  }
}

async function appendSaleCats(id){
  console.log(id);
  let user = ethereum.selectedAddress;
  let cat = await token.methods.getCat(id).call();
  let offer = await marketplace.methods.getOffer(id).call();
  let sellerAdd = offer.seller;
  let seller = sellerAdd.toLowerCase();
  let isSeller = seller == user;
  let price = web3.utils.fromWei(offer.price, 'ether');
  console.log(cat.genes, id, cat.generation, isSeller, price);
  appendCatForBuy(cat.genes, id, cat.generation, isSeller, price);
}



//Get cats for breeding that are not selected
async function breedCats(gender) { //gender = either male or female
  var arrayId = await token.methods.ownedTokens(ethereum.selectedAddress).call();
  for (i = 0; i < arrayId.length; i++) {
    appendBreed(arrayId[i], gender)
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
  console.log(cat[0], id, cat['generation'], gender);
  breedAppend(cat[0], id, cat['generation'], gender);
}

//Appending cats to breed selection
async function breed(dadId, mumId) {
  console.log(dadId, mumId);
  try {
    await token.methods.breed(dadId, mumId).send()
    alertMSG("Congratulations you have successfully created a new little Cat. Your new family member is chilling in the Catalogue page")
  } catch (err) {
    console.log("breed function index.js: "+err)
  }
}

async function approveCheck(){
  approved = await token.methods.isApprovedForAll(ethereum.selectedAddress, marketplaceContract).call();
  if(!approved){
    alertMSG("In order to sell any token, you need to allow the market place to be the operator for your tokens. \nPlease accept the following transcation first.");
    token.methods.setApprovalForAll(marketplaceContract, true).send({}, (err, txHash) => {
      if(err){
        console.log(err);
      }else{
        console.log(txHash);
      }
    });
  }
}

async function deleteOffer(id) {
  try {
    await marketplace.methods.removeOffer(id).send();    
  } catch (err) {
    console.log("deleteOffer function "+err);
  }

}

async function sellCat(id) {  
  var price = $('#catSellPrice'+id).val()
  var amount = web3.utils.toWei(price, "ether")
  console.log(amount, id);
  try {
    await marketplace.methods.createOffer(amount, id).send();
  } catch (err) {
    console.log("sellCat function "+err);
  }
}


async function buyCat(id){
  console.log(id);
  let offer = await marketplace.methods.getOffer(id).call();
  console.log(offer)
    await marketplace.methods.buyKitty(id).send({value: offer.price}, (err) => {
    if(err){
      console.log(err);
    }else{
      marketplace.once("MarketTransaction", (err, event) => {
        if(err){
          console.log(err);
        }else{
          console.log(JSON.stringify(event, null, "    "));
          alertMSG(`
            Successfully purchased a Funky Feline\n
            owner: ${event.returnValues.owner} \n
            ID: ${event.returnValues.tokenId} 
          `);
          location.reload();
        }
      });
    }
  });
}

async function cancelOrder(id){
  await marketplace.methods.removeOffer(id).send({}, (err) => {
    if(err){
      console.log(err);
    }else{
      marketplace.once("MarketTransaction", (err, event) => {
        if(err){
          console.log(err);
        }else{
          console.log(JSON.stringify(event, null, "    "));
          alertMSG(`
            Successfully removed from marketplace \n
            owner: ${event.returnValues.owner} \n
            ID: ${event.returnValues.tokenId} 
          `);
          location.reload();
        }
      });
    }
  });
}

async function totalCats() {
  var cats = await token.methods.totalSupply().call();

  return cats;
}
