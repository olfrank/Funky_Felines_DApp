
function appendCat(dna, id, gen){

    var catDna = catDna(dna);
    catContainer(id);
    renderCat(catDna, id);
    $('#catview' + id).attr('onclick', 'go_to("catDetails.html?catId=' + id + '")')
    $('#catDNA' + id).html(`
    <span class="badge badge-light"><h4 class="tsp-2 m-0"><b>GEN:</b>`+ gen + `</h4></span>
    <br>
    <span class="badge badge-light"><h4 class="tsp-2 m-0"><b>DNA:</b>`+ dna + `</h4></span>`)
}

function breedAppend(dna, id, gen, gender){
    var catDna = catDna(dna);
    catBox(id);
    renderCat(catDna, id);
    $('#catDNA' + id).html(`
    <span class="badge badge-light"><h4 class="tsp-2 m-0"><b>GEN:</b>`+ gen + `</h4></span>
    <br>
    <span class="badge badge-light"><h4 class="tsp-2 m-0"><b>DNA:</b>`+ dna + `</h4></span>`)

    $('#catview' + id).attr('onclick', 'selectBreed("' + dna + '","' + id + '","' + gen + '","' + gender + '")')

}

function selectBreed(dna, id, gen, gender){
    var catDna = catDna(dna);
    var body = catBody(gender);
    var cattributes = cattributes(gender)
    $("#cattributes" + gender).html(cattributes)
    $('#' + gender).html(body);

    renderCat(catDna, gender);
    $('#' + gender).addClass('breedSelect')
    $('#' + gender).attr('data-catid', id)
    $('#' + gender).attr('onclick', 'breedKitties("' + gender + '")')
    $('#catDNA' + gender).html(`
    <span class="badge badge-light"><h4 class="tsp-2 m-0"><b>GEN:</b>`+ gen + `</h4><input class="hidden" id="` + gender + `Id" type="number" value=` + id + `></span>
    <br>
    <span class="badge badge-light"><h4 class="tsp-2 m-0"><b>DNA:</b>`+ dna + `</h4></span>`)
    $('#catSelection').modal('hide')
    removeSelection(id, gender)
    readyToBreed()

}

function readyToBreed() {

    var mumId = $('#female').val()
    var dadId = $('#male').val()

    if (!empty(mumId) && !empty(dadId)) {
        $('#breed').css('filter', 'none')
        $('#breed').prop('disabled', false)
        $('#breed').attr('onclick', 'breed(" ' + dadId + ' "," ' + mumId + ' ")')
        return true
    }
    $('#breed').prop('disabled', true)
    $('#breed').css('filter', ' grayscale()')
    return false
}

function removeSelection(id, gender){
    var selectionDiv = `
                        <div align="center">
                                <div class="egg">
                                </div>
                                <h4>Select a cat as `+ gender + `</h4>
                            </div>
                        </div>
                        `

    if (gender == 'female') {
        var catData = $('#male').attr('data-catid')
        if (catData == id) {
            $('#male').attr('data-catid', 0)
            $('#male').attr('onclick', 'breedCats(this.id)')
            $('#male').html(selectionDiv)
            $('#male').removeClass('breedSelect')
            $('#catDNAMale').html('')
        }
    }
    if (gender == 'male') {
        var catData = $('#female').attr('data-catid')
        if (catData == id) {
            $('#female').attr('data-catid', 0)
            $('#female').attr('onclick', 'breedCats(this.id)')
            $('#female').html(selectionDiv)
            $('#female').removeClass('breedSelect')
            $('#catDNAFemale').html('')
        }
    }
}

async function singleCat(dna, id, gen) {

    var catDna = catDna(dna)
    //2 build the singleCat into HTML
    var body = catBody(id)
    var Cattributes = cattributes(id)
    $('#cattributes').html(Cattributes)
    $('#singleCat').html(body)
    //3 Render the cats CSS style depending on DNA string
    renderCat(catDna, id)
    $('#catDNA').html(`
    <span class="badge badge-light"><h4 class="tsp-2 m-0"><b>GEN:</b>`+ gen + `</h4></span>
    <br>
    <span class="badge badge-light"><h4 class="tsp-2 m-0"><b>DNA:</b>`+ dna + `</h4></span>`)
    
    await catOffer(id)
}

async function catOffer(id) {

    //Checking if this cat is for Sale
    var offer = await checkOffer(id)
    var seller = offer.seller.toLocaleLowerCase()
    if (offer.onsale == true && seller != user) {
        $('#buyBox').removeClass('hidden')
        $('#priceBtn').html('<b>' + offer.price + ' ETH</b>')
        $('#buyBtn').attr('onclick', 'buyCat(' + id + ',"' + offer.price + '")')
    }
    
    var ownership = await catOwnership(id)
    //If user owns the cat
    if (ownership == true) {        
        //If is not on sale
        if (offer.onsale == false) {
            $('#sellBox').removeClass('hidden')
            $('#sellBtn').attr('onclick', 'sellCat(' + id + ')')
        } else {
            $('#sellBox').removeClass('hidden')
            $('#cancelBox').removeClass('hidden')
            $('#cancelBtn').attr('onclick', 'deleteOffer(' + id + ')')
            $('#sellBtn').addClass('btn-success')
            $('#sellBtn').html('<b>For sale at:</b>')
            $('#catPrice').val(offer.price)
            $('#catPrice').prop('readonly', true)
        }
    }
}

function renderCat(dna, id) {

    headColor(dna.headcolor, id)
    eyeColor(dna.eyesColor, id)
    mouthAndBelly(dna.mouthColor, id)
    
    earsAndPaw(dna.earsColor, id)
    eyeVariation(dna.eyesShape, id)
    decorationVariation(dna.decorationPattern, id)
    midColor(dna.decorationMidcolor, id)
    SidesColor(dna.decorationSidescolor, id)
    animationVariation(dna.animation, id)
}


function catDna(dnaAttribute){
    var dna = {
        "headBodyColor": dnaAttribute.substring(0, 2),
        "eyesColor": dnaAttribute.substring(2, 4),
        "bellyMouthColor": dnaAttribute.substring(4, 6),
        "earsColor": dnaAttribute.substring(6, 8),
        "tailColor": dnaAttribute.substring(8, 10),
        "eyeShape": dnaAttribute.substring(10, 11),
        "patternShape": dnaAttribute.substring(11, 12),
        "patternMidColor": dnaAttribute.substring(12, 14),
        "patternSidesColor": dnaAttribute.substring(14, 16),
        "animDna": dnaAttribute.substring(16, 17),
        "lastDna": dnaAttribute.substring(17, 18)
    }

    return dna;
}

function catContainer(id){
    var catDiv = `<div class="col-lg-4 pointer fit-content" id="catview` + id + `">
                 <div class="featureBox catDiv">
                 `+ catBody(id) + `                           
                 </div>
                 <div class="dnaDiv" id="catDNA`+ id + `"></div>
                 `+ cattributes(id) + `
                </div>`
    var catView = $('#catview' + id)
    if (!catView.length) {
        $('#catsDiv').append(catDiv)
    }
}

function catBody(id){
    var single = `<div class = "cat" id = "newCat">
                        <div id = "catEars" class = "ears">
                            <div id = "leftEar `+ id + `" class= "ear left-ear">
                                <div class = " left-inner-ear"></div>
                            </div>
                            <div id = "rightEar `+ id + `" class = "ear right-ear">
                                <div class = "right-inner-ear"></div>
                            </div>
                        </div>

                        <div id = "catTail `+ id + `" class = "tail">
                            <div id = "inner-tail"></div>
                        </div>

                        <div id = "catBody `+ id + `" class = "body"></div>
                        <div id = "catBelly `+ id + `" class = "belly"></div>
                        <div id = "catHead `+ id + `" class = "head">
                            <!-- <div class= "head-pattern"></div> -->
                                            <div id="midShape `+ id + `" class="head-shapes">
                                                <div id="leftShape `+ id + `" class="left_head-shape"></div>
                                                <div id="rightShape `+ id + `" class="right_head-shape"></div>
                                            </div>

                            <div id = "catEyes `+ id + `" class = "eyes">
                                <div class = "eye-left">
                                    <span id = "leftPupil `+ id + `" class = "pupil-left">
                                        <div class = "inner-eyes-big-left"></div>
                                        <div class = "inner-eyes-small-left"></div>
                                    </span>
                                </div>

                                <div class = "eye-right">
                                    <span id = "rightPupil `+ id + `" class = "pupil-right">
                                        <div class = "inner-eyes-big-right"></div>
                                        <div class = "inner-eyes-small-right"></div>
                                    </span>
                                </div>    
                            </div>


                            <div id = "mouth `+ id + `"></div>
                            <div class = "whiskers">
                                <div id = "rightWhiskers `+ id + `" class = "whiskers-right">
                                    <div class = "whisker1"></div>
                                    <div class = "whisker2"></div>
                                    <div class = "whisker3"></div>
                                </div>
                                <div id = "leftWhiskers `+ id + `" class = "whiskers-left">
                                    <div class = "whisker4"></div>
                                    <div class = "whisker5"></div>
                                    <div class = "whisker6"></div>
                                </div>
                            </div>
                            <div class = "mouth-left"></div>
                            <div class = "mouth-right"></div>
                            <div class = "nose"></div>
                            <div class = "chin"></div>
                        </div>


                        <div id = "bothFeet `+ id + `" class = "feet">
                            <div class = "foot-left"></div>
                            <div class = "foot-right"></div>
                        </div>
                    </div>`
    return single;
}


function cattributes(id) {

    var Cattributes = `<ul class="ml-5 cattributes">
                            <li><span id="eyeName`+ id + `"></span> eyes</li>
                            <li><span id="decorationName`+ id + `"></span> decoration</li>
                            <li><span id="animationName`+ id + `"></span></li>
                        </ul>`
    return Cattributes
}

























// var web3 = new Web3(Web3.givenProvider);

// var instance;
// var user;
// var contractAddress = "0x907EcC1E7732ba1397CF01E16eD7DaBf2483811d";

        
// $(document).ready(function(){
//     window.ethereum.enable().then(function(accounts) {
//         instance = new web3.eth.Contract(abi.catContract, contractAddress, {from: accounts[0]});
//         user = accounts[0];
//         console.log(instance);
//         displayAllCats();
        
//     })
// })

// async function displayAllCats(){
//     let currentUser = ethereum.selectedAddress;
//     var item;
//     let items = [];
//     var allCatIds = [];

//     var catCount = await instance.methods.getCat().call();
//     console.log("CAT COUNT: " + catCount);

//     for(let i = 0; i < catCount; i++){
//        var owner = await instance.methods.owns(currentUser, i).call();
//         if(owner){
//             allCatIds.push(i);
//         }   
        
//     }

//     for(let i = 0; i < allCatIds.length; i++){
//        let catId = allCatIds[i];
//        let each = await instance.methods.getCat(catId).call();
//        let catGenes = each.genes;
//        createCatContainer(catId, catGenes);
//     }        

//     function createCatContainer(id, dnaAttribute){
//         let headBodyDna = dnaAttribute.substring(0, 2);
//         let eyesDna = dnaAttribute.substring(2, 4);
//         let bellyMouthDna = dnaAttribute.substring(4, 6);
//         let earsDna = dnaAttribute.substring(6, 8);
//         let tailDna = dnaAttribute.substring(8, 10);
//         let eyeShape = dnaAttribute.substring(10, 11);
//         let patternShape = dnaAttribute.substring(11, 12);
//         let patternMidColor = dnaAttribute.substring(12, 14);
//         let patternSideColor = dnaAttribute.substring(14, 16);
//         let animDna = dnaAttribute.substring(16, 17);
//         let lastDna = dnaAttribute.substring(17, 18);
    
//         item = `<div class="col-lg-4 catBox m-3 light-b-shadow" id="box`+id+`">
//                     <div class = "cat" id= "newCat` + id + `">
//                         <div id="ears`+id+`" class =" ` + (animDna == 2 ? 'noddinghead' : 'ears') + `">
//                             <div id = "leftEar` + id + ` class= "ear `+ (animDna == 3 ? 'movingEarLeft' : 'left-ear')+ `" style="background:#` + colors[earsDna] + `">
//                                 <div class = " left-inner-ear" id="left-inner-ear"></div>
//                             </div>
//                             <div id = "rightEar` + id + `"class = "ear `+ (animDna == 3 ? 'movingEarRight' : 'right-ear')+ `" style="background:#` + colors[earsDna] + `">
//                                 <div class = "right-inner-ear" id="eight-inner-ear"></div>
//                             </div>
//                         </div>
//                         <div id = "catTail`+ id +`" class = " `+ (animDna == 4 ? 'movingTail': 'tail') + ` " style="background:#` + colors[tailDna] + `">
//                             <div class = "inner-tail" style="background:#` + colors[earsDna] + `"></div>
//                         </div>
//                         <div id = "catBody`+id+`" class = "` + (animDna == 7 ? 'enflatedBelly' : 'body') + `" style="background:#` + colors[headBodyDna] + `"></div>
//                         <div id = "catBody` +id+`" class = "` + (animDna == 7 ? 'enflatedBelly' : 'belly') + `" style="background:#` + colors[bellyMouthDna] + `"></div>
//                         <div id = "catHead` + id + `" class =" ` + (animDna == 2 ? 'noddinghead' : 'head') + `">
//                             <div id="midShape`+id+`" class="head-shapes" style="background:#` + colors[patternMidColor] + `">
//                                 <div id="leftShape`+id+`" class="left_head-shape" style="background:#` + colors[patternSideColor] + `"></div>
//                                 <div id="rightShape`+id+`" class="right_head-shape" style="background:#` + colors[patternSideColor] + `"></div>
//                             </div>
//                             <div id = "catEyes ` + id + `" class = "` + (animDna == 5 ? 'eyesBigger' : 'eyes') + `">
//                                 <div class = "eye-left">
//                                     <span id = "leftPupil `+ id + `" class = "` + (animDna == 8 ? 'eyesTired' : (animDna == 9 ? 'eyesChangeColor' : 'pupil-left')) + `" style="background:#` + colors[eyesDna] + `">
//                                         <div class = "inner-eyes-big-left"></div>
//                                         <div class = "inner-eyes-small-left"></div>
//                                     </span>
//                                 </div>
//                                 <div class = "eye-right">
//                                     <span id = "rightPupil `+ id + `" class = "` + (animDna == 8 ? 'eyesTired' : (animDna == 9 ? 'eyesChangeColor' : 'pupil-right')) + `" style="background:#` + colors[eyesDna] + `">
//                                         <div class = "inner-eyes-big-right"></div>
//                                         <div class = "inner-eyes-small-right"></div>
//                                     </span>
//                                 </div>    
//                             </div>
//                             <div class = "mouth"></div>
//                             <div class = "whiskers">
//                                 <div id="rightWhiskers` + id + `" class = "` + (animDna == 6 ? 'movingWhiskersRight' : 'whiskers-right') + `">
//                                     <div class = "whisker1"></div>
//                                     <div class = "whisker2"></div>
//                                     <div class = "whisker3"></div>
//                                 </div> 
//                                 <div id="leftWhiskers` + id + ` "class = " ` + (animDna == 6 ? 'movingWhiskersLeft' : 'whiskers-left') + `">
//                                     <div class = "whisker4"></div>
//                                     <div class = "whisker5"></div>
//                                     <div class = "whisker6"></div>
//                                 </div>
//                             </div>
//                             <div class = "mouth-left"></div>
//                             <div class = "mouth-right"></div>
//                             <div class = "nose"></div>
//                             <div class = "chin"></div>
//                         </div>
//                         <div id= "bothFeet `+ id + `" class = "` + (animDna == 7 ? 'enflatedFeet' : 'feet') + `"  style="background:#` + colors[headBodyDna] + `">
//                             <div class = "foot-left"></div>
//                             <div class = "foot-right"></div>
//                         </div>
//                     </div>
//                 </div>
//                     <div class="dnaDiv" id="catDNA `+ id +`">
//                         <b>
//                             DNA:
//                             <!-- Colors -->
//                              <span id="dnabody` + id + `">` + dnaAttributes + `</span>
//                              <span id="dnaeyes` + id + `"></span>
//                              <span id="dnabelly` + id + `"></span>
//                              <span id="dnaears` + id + `"></span>
//                              <span id="dnatail` + id + `"></span>

//                              <!-- Cattributes -->
//                              <span id="dnashape` + id + `"></span>
//                              <span id="dnadecoration` + id + `"></span>
//                              <span id="dnadecorationMid` + id + `"></span>
//                              <span id="dnadecorationSides` + id + `"></span>
//                              <span id="dnaanimation` + id + `"></span>
//                              <span id="dnaspecial` + id + `"></span>
//                         </b>
//                     </div>`
                    
//         items.push(item);
//     }
//     $(".row").append(items.join());
    

// }