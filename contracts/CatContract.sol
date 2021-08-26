pragma solidity >=0.4.22 <0.9.0;

import "./IERC721.sol";
import "./IERC721Receiver.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
contract Catcontract is IERC721 {

string private  constant Name = "Purrfect";
string private constant Symbol = "PURR";
uint16 private constant Gen0_Creation_Limit = 10;
bytes4 internal constant MAGIC_ERC721_RECEIVED= bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"));
bytes4 private constant _INTERFACE_ID_ERC721 = 0x80ac58cd;
bytes4 private constant _INTERFACE_ID_ERC165 = 0x01ffc9a7;
address public contractOwner;

event Birth(address owner, uint256 catId, uint256 mumId, uint256 dadId, uint256 genes);


modifier onlyOwner{
    require(contractOwner == msg.sender, "You are not the owner of the contract");
    _;
}

struct Cat {
    uint256 genes;
    uint64 birthTime;
    uint32 mumId;
    uint32 dadId;
    uint16 generation;
}

constructor(){
    contractOwner = msg.sender;
    uint256 gen = type(uint256).max;
    _createCat(0, 0, 0, gen, address(0));//_createCat(0, 0, 0, gen-1, address(0))
}

Cat[] cats;
//        owner => amount
mapping(address => uint256) ownerTokenBalance;

//      tokenId => owner of cat
mapping(uint256 => address) public catIndexToOwner;

// tokenId => another approved address 
mapping(uint256 => address) public catIndexToApproved;

mapping(address => mapping(address => bool)) private operatorApprovals;

uint256 public gen0Counter;



function breed(uint256 _dadId, uint256 _mumId) public returns(uint256){

    require(owns(msg.sender, _dadId) && owns(msg.sender, _mumId), "You must own both cats in order to breed");
    Cat storage dad = cats[_dadId];
    Cat storage mum = cats[_mumId];

    uint256 newCatDna = mixDna(dad.genes, mum.genes);
    
    
    uint256 mumGen = mum.generation;
    uint256 dadGen = dad.generation;
    uint256 kidGen = 0; 

    if(dadGen < mumGen){
        kidGen = mumGen+1;
        kidGen /= 2;
    }else if(dadGen > mumGen){
        kidGen = dadGen + 1;
        kidGen /= 2;
    }else{
        kidGen = mumGen + 1;
    }
    
    return _createCat(newCatDna, _mumId, _dadId, kidGen, msg.sender);
}


function mixDna(uint256 _dadDna, uint256 _mumDna) public view returns(uint256){
    uint256[9] memory geneArray;
    
    //uint16 random = uint16(block.timestamp % 511);
    uint16 random = uint16(uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty))) % 511);//binary between 000000000-111111111
    uint256 i = 1;
    uint256 index = 8;
    
    for(i=1; i <= 256; i=i*2) {  //1, 2, 4, 8, 16, 32, 64, 128, 256 = 9 pairs
        if(random & i !=0){
            geneArray[index] = _mumDna % 100;
        }else{
            geneArray[index] = _dadDna % 100;
        }
        _mumDna = _mumDna / 100;  //removing the last two digits by moving the decimal point
        _dadDna = _dadDna / 100;
        
        if(i != 256){index = index-1;}
    }
    
    uint256 newGene;
    
    for(i=0; i<9; i++){
        newGene = newGene + geneArray[i];
        if(i !=8 ){
            newGene = newGene *100;
        }
    } 
    return newGene;
}

function createCatGen0(uint256 _genes)public onlyOwner{
    require(gen0Counter < Gen0_Creation_Limit, "gen0Counter < Gen0_Creation_Limit");
    gen0Counter++;

    _createCat(_genes, 0, 0, 0, msg.sender);
}

function _createCat(
    uint256 _genes,
    uint256 _mumId,
    uint256 _dadId,
    uint256 _generation,
    address _owner
)internal returns(uint256){
    Cat memory _cat = Cat({
        genes: uint256(_genes),
        birthTime: uint64(block.timestamp),
        mumId: uint32(_mumId),
        dadId: uint32(_dadId),
        generation: uint16(_generation)
    });

    //uint256 newCatId = cats.push(_cat)-1;
    cats.push(_cat);
    uint256 newCatId = cats.length - 1;
     

    emit Birth(_owner, newCatId, _mumId, _dadId, _genes);

    _transfer(address(0), _owner, newCatId);

    return newCatId;
}

    //returning the values in uint256 due to front end preferences (easier to read)
    function getCat(uint256 _tokenId) public view returns(
        uint256 genes, 
        uint256 birthTime, 
        uint256 mumId, 
        uint256 dadId, 
        uint256 generation, 
        address owner 
        ){
        return(
            genes = cats[_tokenId].genes,
            birthTime = cats[_tokenId].birthTime,
            mumId = cats[_tokenId].mumId,
            dadId = cats[_tokenId].dadId,
            generation = cats[_tokenId].generation,
            owner = catIndexToOwner[_tokenId]
        );
    }

    function supportsInterface(bytes4 _interfaceId) external pure returns (bool){
        return(_interfaceId ==_INTERFACE_ID_ERC721 || _interfaceId == _INTERFACE_ID_ERC165);
    }

    function balanceOf(address owner) public view override returns (uint256 balance){
        balance = ownerTokenBalance[owner];
        return balance;
    }

    function totalSupply() public view override returns (uint256 total){
        total = cats.length;
        return total; 
    }

    function ownerOf(uint256 tokenId) external view override returns (address owner){
        return catIndexToOwner[tokenId];
    }


    
    function owns(address claimant, uint256 _tokenId) internal view returns (bool){
        return catIndexToOwner[_tokenId] == claimant;
    }

    function approve(address to, uint256 _tokenId) external override {
        require(owns(msg.sender, _tokenId));
        _approve(to, _tokenId);
        emit Approval(msg.sender, to, _tokenId);
    }

    function _approve(address approved, uint256 tokenId) internal {
        catIndexToApproved[tokenId] = approved;
    }

    function setApprovalForAll(address operator, bool approved) external override{ 
        require(operator != msg.sender);
        _setApprovalForAll(operator, approved);
        emit ApprovalForAll(msg.sender, operator, approved);
    }

    function _setApprovalForAll(address _operator, bool _approved) internal{
        operatorApprovals[msg.sender][_operator] = _approved;
    }

    function getApproved(uint256 _tokenId) external view override returns (address){
        require(_tokenId < cats.length);//check that the token exists
        return catIndexToApproved[_tokenId];
    }

    function isApprovedForAll(address _owner, address _operator) public override view returns (bool){
        //returns the mapping status for these inputs
        return operatorApprovals[_owner][_operator];
    } 
    function safeTransferFrom(address _from, address _to, uint256 _tokenId) external override{
        require(ownerOrApprovedCheck(msg.sender, _from, _to, _tokenId));
        _safeTransfer(_from, _to, _tokenId, "");
    }

    function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes calldata data) external override{
        require(ownerOrApprovedCheck(msg.sender, _from, _to, _tokenId));
        _safeTransfer(_from, _to, _tokenId, data);
    }

    function _safeTransfer(address from, address to, uint256 tokenId, bytes memory data)internal {
        _transfer(from, to, tokenId);
        require(_checkERC721Support(from, to, tokenId, data));
    }

    function transferFrom(address _from, address _to, uint256 _tokenId) external override{
        require(ownerOrApprovedCheck(msg.sender, _from, _to, _tokenId), "ERC721: Is not approved or owner");
        _transfer(_from, _to, _tokenId);
    }

    function transfer(address to, uint256 tokenId) external override{
        require(to != address(0), "Cannot Send Tokens To This Address");
        require(to != address(this), "Cannot Send Tokens To This Address");
        require(owns(msg.sender, tokenId), "You Must Own The Token You Are Sending");
        _transfer(msg.sender, to, tokenId);
    }

    function _transfer(address from, address _to, uint256 _tokenId) internal {
        ownerTokenBalance[_to]++;
        catIndexToOwner[_tokenId] = _to;

        //(edge case senario) when we mint new cats we dont want to decrease the token count
        if(from != address (0)) {
            ownerTokenBalance[from]--;
            //this makes sure that the approval history for that token is erased
            delete catIndexToApproved[_tokenId];
        }
        emit Transfer(from, _to, _tokenId);
    }

    
    function _checkERC721Support(address from, address to, uint256 tokenId, bytes memory data) internal returns(bool){
        if( !isContract(to) ){
            return true; //if it is not a contract return true
        }
        //call onERC721Recieved in the to contract
        bytes4 returnData = IERC721Receiver(to).onERC721Received(msg.sender, from, tokenId, data);
        return returnData == MAGIC_ERC721_RECEIVED;
    }

    function isContract(address _to) internal view returns(bool){
        uint32 size;
        assembly{
            size := extcodesize(_to)
        }

        return size > 0;
    }

    function approvedFor(address claimant, uint256 tokenId) internal view returns(bool){
        return catIndexToApproved[tokenId] == claimant;
    }

    function name() external pure override returns (string memory tokenName){    return Name;    }
    function symbol() external pure override returns (string memory tokenSymbol){    return Symbol;  }

    //to reduce code duplication, made an internal function with the require statements and returns true/false
    function ownerOrApprovedCheck(address spender, address _from, address _to, uint256 _tokenId) internal view returns(bool){
        require(owns(_from, _tokenId));
        require(_to != address(0));
        require(_tokenId < cats.length);
        return(spender == _from || approvedFor(spender, _tokenId) || isApprovedForAll(_from, spender));

    }

    function ownedTokens(address _owner) public view returns(uint256[] memory ownerTokens) {
    uint256 tokenCount = balanceOf(_owner);

    if (tokenCount == 0) {
        return new uint256[](0);
    } else {
        uint256[] memory result = new uint256[](tokenCount);
        uint256 totalCats = totalSupply();
        uint256 resultIndex = 0;

        uint256 catId;

        for (catId = 1; catId <= totalCats; catId++) {
            if (catIndexToOwner[catId] == _owner) {
                result[resultIndex] = catId;
                resultIndex++;
            }
        }

        return result;
    }
    
    }
}