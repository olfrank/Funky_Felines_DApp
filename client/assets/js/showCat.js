//append cat on catalogue page
function appendCat(dna, id, gen){

    var catDna = catDNA(dna);
    catContainer(id);
    renderCat(catDna, id);
    $('#catview' + id).css('margin-right', '35px');
    $('#catDNA' + id).html(`
    <span class="gen-badge badge badge-light"><p class="tsp-2 m-0"><b>GEN:</b>`+ gen + `</p></span>
    <br>
    <span class="dna-badge badge badge-light"><p class="tsp-2 m-0"><b>DNA:</b>`+ dna + `</p></span>
    
    <div class = "sellBOX">
        <button id = "sell-btn`+id+`" class="sellBtn" onclick="showSell(`+id+`)">Sell Cat</button>
        <div id="sell-div`+id+`" class = "hidden sellForm ">
            <input id="catSellPrice`+id+`" type="number" class="form-control" placeholder="Enter Price in ETH">
            <button id="confirmSell" class = "btn btn-primary" onclick="sellCat(`+id+`)">Confirm Sell</button>
            <button id="cancelSell" class = "btn btn-danger" onclick="hideSell(`+id+`)">Cancel Sell</button>
        </div>
    </div>
    
    `)
}

function appendCatForBuy(dna, id, gen, isSeller, price){
    catContainerForBuy(dna, id, true, gen, isSeller, price);
    renderCat(catDNA(dna), id);
}

async function showSell(id){
    $("#sell-div"+id).removeClass("hidden");
    $("#sell-btn"+id).addClass("hidden");

    await approveCheck();
    
}
async function hideSell(id){
    $("#sell-div"+id).addClass("hidden");
    $("#sell-btn"+id).removeClass("hidden");
    
}


//append cat for breeding
function breedAppend(dna, id, gen, gender){
    var catDna = catDNA(dna);
    catContainer(id);
    renderCat(catDna, id);
    $('#catDNA' + id).html(`
    <span class="badge badge-light"><h4 class="tsp-2 m-0"><b>GEN:</b>`+ gen + `</h4></span>
    <br>
    <span class="badge badge-light"><h4 class="tsp-2 m-0"><b>DNA:</b>`+ dna + `</h4></span>`)

    $('#catview' + id).attr('onclick', 'selectBreed("' + dna + '","' + id + '","' + gen + '","' + gender + '")')
   
}

function selectBreed(dna, id, gen, gender){
    var catDna = catDNA(dna);
    var body = catBody(gender)
    var Cattributes = cattributes(gender)
    $("#cattributes" + gender).html(Cattributes)
    $('#' + gender).html(body);


    renderCat(catDna, gender);
    $('#' + gender).addClass('breedSelect')
    $('#' + gender).attr('data-catid', id)
    $('#' + gender).attr('onclick', 'breedCats("' + gender + '")')

    $('#catDNA' + gender).html(`
    <span class="badge badge-light">
        <h4 class="tsp-2 m-0"><b>GEN:</b>`+ gen + `</h4>
        <input class = "hidden" id="`+gender+`Id" type="number" value=`+id+`>
    </span>
    <br>
    <span class="badge badge-light"><h4 class="tsp-2 m-0"><b>DNA:</b>`+ dna + `</h4></span>`)

    $('#catSelection').modal('hide');
    removeSelection(id, gender)
    console.log(id, gender)
    readyToBreed()
}

function readyToBreed() {

    var mumId = $('#femaleId').val()
    var dadId = $('#maleId').val()

    console.log(mumId, dadId);

    if (!isEmpty(mumId) && !isEmpty(dadId)) {
        $('#breed').css('filter', 'none')
        $('#breed').prop('disabled', false)
        $('#breed').attr('onclick', 'breed("'+dadId+'","'+mumId+'")')
        return true;

    }
    $('#breed').prop('disabled', true)
    $('#breed').css('filter', ' grayscale()')
    return false;
}
  

function removeSelection(id, gender){
    var selectionDivFemale = `
                        <div align="center">
                                <div class="headFemale">
                                </div>
                                <h4>Select a cat as `+ gender + `</h4>
                            </div>
                        </div>
                        `
    var selectionDivMale = `
                        <div align="center">
                                <div class="headMale">
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
            $('#male').html(selectionDivMale)
            $('#male').removeClass('breedSelect')
            $('#catDNAMale').html('')
        }
    }
    if (gender == 'male') {
        var catData = $('#female').attr('data-catid')
        if (catData == id) {
            $('#female').attr('data-catid', 0)
            $('#female').attr('onclick', 'breedCats(this.id)')
            $('#female').html(selectionDivFemale)
            $('#female').removeClass('breedSelect')
            $('#catDNAFemale').html('')
        }
    }
}




function catContainer(id){
    var catDiv = `<div id="catview` + id + `">
                 <div class="catalogue-box catDiv">
                    ${catBody(id)}
                 </div>
                 <div class="dnaDiv" id="catDNA`+ id + `"></div>
                    ${cattributes(id)}
                </div>`
    var catView = $('#catview' + id)
    if (!catView.length) {
        $('#catsDiv').append(catDiv);
    }
}



function catContainerForBuy(dna, id, isMarket, gen, isSeller, price){
    console.log(dna, id, isMarket, gen, isSeller, price);
    var catDiv = `<div id="catview` + id + `">
                 <div class="marketBox catDiv">
                    ${catBody(id)}
                 </div>
                 <div class = "container-badge">
                 <span class="badge badge-light"><p class="tsp-2 m-0"><b>GEN:</b>`+ gen + `</p></span>
                 <span class="badge badge-light"><p class="tsp-2 m-0"><b>DNA:</b>`+ dna + `</p></span>
                 </div>
                 ${isMarket ? catOffer(isSeller, price, id) : ""}
                </div>`
    var catView = $('#catview' + id)
    if (!catView.length) {
        $('#catsOnSale').append(catDiv);
    }
}




function catOffer(isSeller, price, id){
    console.log(isSeller, price, id);
    let buttonDiv;
    price = price.toString().substring(0, 7);
    if(isSeller){
      buttonDiv = `<button type="button" class="btn btn-danger cancel" onClick="cancelClick(`+id+`)">Cancel</button>`
    }else{
      buttonDiv = `<button type="button" class="btn btn-success buy" onClick="buyClick(`+id+`)">Purchase</button>`
    }
  
    let offerDiv = `
      <div class="offerBox">
        <div class="tag"><h5>Price: ${price} ETH</h5></div>
        <div class="buttons">${buttonDiv}</div>
      </div>
    `
    return offerDiv;
  }

function catDNA(dnaAttribute){
    var dna = {
        //colors
        "headBodyColor": dnaAttribute.substring(0, 2),
        "eyesColor": dnaAttribute.substring(2, 4),
        "bellyMouthColor": dnaAttribute.substring(4, 6),
        "earsInnerTailColor": dnaAttribute.substring(6, 8),
        "tailColor": dnaAttribute.substring(8, 10),
        // cattributes
        "eyesShape": dnaAttribute.substring(10, 11),
        "decorationPattern": dnaAttribute.substring(11, 12),
        "decorationMidcolor": dnaAttribute.substring(12, 14),
        "decorationSidescolor": dnaAttribute.substring(14, 16),
        "animation": dnaAttribute.substring(16, 17),
        "lastNum": dnaAttribute.substring(17, 18)
    }
    console.log(dna);
    return dna;
}

function catBody(id){
    var single = `  <div class = "cat" id = "newCat`+id+`">
                        <div id = "catEars`+id+`" class ="ears">
                            <div id = "leftEar`+ id + `" class= "ear left-ear">
                                <div class = " left-inner-ear"></div>
                            </div>
                            <div id = "rightEar`+ id + `" class = "ear right-ear">
                                <div class = "right-inner-ear"></div>
                            </div>
                        </div>

                        <div id = "catTail`+ id + `" class = "tail">
                            <div id = "inner-tail`+id+`" class = "inner-tail"></div>
                        </div>

                        <div id = "catBody`+ id + `" class = "body"></div>
                        <div id = "catBelly`+ id + `" class = "belly"></div>
                        <div id = "catHead`+ id + `" class = "head">
                            <!-- <div class= "head-pattern"></div> -->
                                            <div id="midShape`+ id + `" class="head-shapes">
                                                <div id="leftShape`+ id +`" class="left_head-shape"></div>
                                                <div id="rightShape`+ id +`" class="right_head-shape"></div>
                                            </div>

                            <div id = "catEyes`+ id + `" class = "eyes">

                                <div class = "eye-left">
                                    <span id = "leftPupil`+ id + `" class = "pupil-left">
                                        <div class = "inner-eyes-big-left"></div>
                                        <div class = "inner-eyes-small-left"></div>
                                    </span>
                                </div>

                                <div class = "eye-right">
                                    <span id = "rightPupil`+ id + `" class = "pupil-right">
                                        <div class = "inner-eyes-big-right"></div>
                                        <div class = "inner-eyes-small-right"></div>
                                    </span>
                                </div>  

                            </div>


                            <div id = "mouth`+ id + `" class = "mouth"></div>
                            <div class = "whiskers">
                                <div id = "rightWhiskers`+ id + `" class = "whiskers-right">
                                    <div class = "whisker1"></div>
                                    <div class = "whisker2"></div>
                                    <div class = "whisker3"></div>
                                </div>
                                <div id = "leftWhiskers`+ id + `" class = "whiskers-left">
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


                        <div id = "bothFeet`+ id + `" class = "feet">
                            <div class = "foot-left"></div>
                            <div class = "foot-right"></div>
                        </div>
                    </div>
                    `
    return single;
}


function cattributes(id) {

    var Cattributes = `<ul class="cattributes">
                            <li>eyes: <span id="eyeName`+ id + `"></span></li>
                            <li>decoration: <span id="decorationName`+ id + `"></span></li>
                            <li>animation: <span id="animationName`+ id + `"></span></li>
                        </ul>`
    return Cattributes
}


function renderCat(dna, id) {

    changeBodyColor(dna.headBodyColor, id);
    changeEyeColor(dna.eyesColor, id);
    changeBellyColor(dna.bellyMouthColor, id);
    changeEarColor(dna.earsInnerTailColor, id);
    changeTailColor(dna.tailColor, id);
    //cattributes
    changeEyeVariation(dna.eyesShape, id);
    changeDecorationVariation(dna.decorationPattern, id);
    changeDecorationMidColor(dna.decorationMidcolor, id);
    changeDecorationSidesColor(dna.decorationSidescolor, id);
    changeAnimationVariation(dna.animation, id);
    changeSpecialVariation(dna.lastNum, id);
    
}
