pragma solidity >=0.4.22 <0.9.0;

import "./CatContract.sol";
import "./ICatMarketplace.sol";

contract CatMarketplace is ICatMarketPlace{

    Catcontract private _catContract;
    

    struct Offer{
     address payable seller;
     uint256 price;
     uint256 index;
     uint256 tokenId;
     bool active;

    }

    Offer[] offers;
          //tokenId => Offer
    mapping(uint256 => Offer) tokenIdToOffer;

    mapping (uint256 => uint256) tokenIdToOfferId;
    
    
    constructor(address _catContractAddress){
        setKittyContract(_catContractAddress);
        //_catContract = Catcontract(_catContractAddress);
    }

    function setKittyContract(address _catContractAddress) public override {
        _catContract = Catcontract(_catContractAddress);
    }

   
    function getContractAddress() external view returns(address){
        return address(this);
    }
    

    function getOffer(uint256 _tokenId) external override view returns ( address seller, uint256 price, uint256 index, uint256 tokenId, bool active){
        Offer storage offer = tokenIdToOffer[_tokenId];

        require(offer.active == true, "Marketplace: There is no active offer for this token");
        
        return (
            seller = offer.seller,
            price = offer.price,
            index = offer.index,
            tokenId = offer.tokenId,
            active = offer.active
                );
    }

    function getAllTokenOnSale() external override view returns(uint256[] memory){
        uint256 numOfOffers = offers.length;
        uint256[] memory listOfOffers = new uint256[](numOfOffers);

        for(uint i = 0; i < numOfOffers; i++){
            listOfOffers[i] = offers[i].tokenId;
        }

        return listOfOffers;
    }

    // function getAllTokenOnSale() external override view  returns(uint256[] memory listOfOffers){
    //     if(offers.length == 0){
    //         return new uint256[](0);//return empty array
    //     }else{
    //         uint256[] memory result = new uint256[](offers.length);
    //         uint256 offerId;
    //         for(offerId = 0; offerId < offers.length; offerId++){
    //             if(offers[offerId].active == true){
    //                 result[offerId] = offers[offerId].tokenId;
    //             }
    //         }
    //         return result;
    //     }
    // }

    //* Requirement: There can only be one active offer for a token at a time.
    //* Requirement: Marketplace contract (this) needs to be an approved operator when the offer is created.

    function ownerOfCat(address theAddress, uint256 theTokenId) internal view returns (bool){
        return (_catContract.ownerOf(theTokenId)== theAddress);
    }

    function createOffer(uint256 _price, uint256 _tokenId) public override{
        require(ownerOfCat(msg.sender, _tokenId), "You must own the cat you want to sell");
        require(tokenIdToOffer[_tokenId].active == false, "There is currently an active offer");
        require(_catContract.isApprovedForAll(msg.sender, address(this)), "The marketplace contract must be approved to create an offer");
        _createOffer(_price, _tokenId, msg.sender);
    }
     
    function _createOffer(uint256 _price, uint256 _tokenId, address _seller) internal{
        
        Offer memory _offer = Offer({
            seller: payable(_seller),
            price: _price,
            index: offers.length,
            tokenId: _tokenId,
            active: true
        });

        tokenIdToOffer[_tokenId] = _offer;
        offers.push(_offer);

        emit MarketTransaction("Create offer", msg.sender, _tokenId);
    }

    /**
    * Removes an existing offer.
    * Emits the MarketTransaction event with txType "Remove offer"
    * Requirement: Only the seller of _tokenId can remove an offer.
     */
    function removeOffer(uint256 _tokenId) public override{
        Offer memory offer = tokenIdToOffer[_tokenId];
        require(offer.seller == msg.sender, "You need to be the seller of that cat");
        
        // delete offers[tokenIdToOfferId[_tokenId]];
        // delete tokenIdToOffer[_tokenId];

         _removeOffer(_tokenId, msg.sender);
    }

    function _removeOffer(uint256 _tokenId, address _seller) internal {
        uint256 targetIndex = tokenIdToOffer[_tokenId].index;
        uint256 lastIndex = offers.length - 1;
        if(lastIndex > 0){
            offers[targetIndex] = offers[lastIndex];
            offers[targetIndex].index = targetIndex;
            tokenIdToOffer[offers[targetIndex].tokenId] = offers[targetIndex];
        }
        offers.pop();
        delete tokenIdToOffer[_tokenId];
        emit MarketTransaction("Remove offer", _seller, _tokenId);
    }

    /**
    * Executes the purchase of _tokenId.
    * Sends the funds to the seller and transfers the token using transferFrom in Kittycontract.
    * Emits the MarketTransaction event with txType "Buy".
    * Requirement: The msg.value needs to equal the price of _tokenId
    * Requirement: There must be an active offer for _tokenId
     */
    function buyKitty(uint256 _tokenId) external override payable{
        Offer memory offer = tokenIdToOffer[_tokenId];
        require(msg.value == offer.price, "The price doesnt match");
        require(offer.seller != msg.sender, "Marketplace: Cannot by your own token!");
        require(offer.active == true, "No active orders");
        _buyKitty(_tokenId, msg.sender);
    
    }

    function _buyKitty(uint256 _tokenId, address _buyer) internal {
        Offer memory offer = tokenIdToOffer[_tokenId];
        address seller = offer.seller;
        uint256 price = offer.price;
        (bool success, ) = payable(seller).call{value: price}("");
        require(success, "Marketplace: Failed to send funds to the seller");
        _catContract.transferFrom(seller, _buyer, _tokenId);
        removeOffer(_tokenId);
        // offers[offer.index].active = false; === recently deleted this 

        // if(offer.price > 0 ){//this is push, todo: make it pull
        //     offer.seller.transfer(price);
        // }
        
        

        emit MarketTransaction("Buy", msg.sender, _tokenId);
    }
}