
var colors = Object.values(allColors());

function changeBodyColor(code, id) {
    var color = colors[code];
    $('#catBody'+ id + ', #catHead'+ id +', #bothFeet'+ id).css('background', '#' + color)  //This changes the color of the cat
}

function changeEyeColor(code, id) {
    var color = colors[code];
    $('#catEyes'+ id).find('span').css('background', '#' + color);
    
}

function changeBellyColor(code, id) {
    var color = colors[code];
    $('#mouth'+ id +  ', #catBelly'+ id).css('background', '#' + color);
    
}

function changeEarColor(code, id) {
    var color = colors[code];
    $('#leftEar'+ id + ', #rightEar' + id + ', #inner-tail'+ id).css('background', '#' + color);
    
}

function changeTailColor(code, id) {
    var color = colors[code];
    $('#catTail'+ id).css('background', '#' + color);
    
}
function changeDecorationMidColor(code, id) {
    var color = colors[code];
    $('#midShape'+ id).css('background', '#' + color)  //This changes the mid decoration color of the cat
    
}

function changeDecorationSidesColor(code, id) {
    var color = colors[code];
    $('#leftShape'+ id +  ', #rightShape'+ id).css('background', '#' + color)  //This changes the side decoration color of the cat
   
}



function changeEyeVariation(num, id) {

    switch (num) {
        case "1":
            normalEyes(id)//reset to default
            $('#eyeName'+id).html('Basic')//set the badge "Basic"
            break 
        case "2": 
            normalEyes(id)
            $('#eyeName'+id).html('Chiller')
            eyesType1(id)
            break
        case "3": 
            normalEyes(id)
            $('#eyeName'+id).html('Welling Up')
            eyesType2(id)
            break
        case "4":
            normalEyes(id)
            $('#eyeName'+id).html('Down Left')
            eyesType3(id)
            break
        case "5":
            normalEyes(id)
            $('#eyeName'+id).html('Down Right')
            eyesType4(id)
            break
        case "6": 
            normalEyes(id)
            $('#eyeName'+id).html('Sleepy')
            eyesType5(id)
            break
        case "7": 
            normalEyes(id)
            $('#eyeName'+id).html('Sour (left)')
            eyesType6(id)
            break
        case "8":
            normalEyes(id)
            $('#eyeName'+id).html('Sour (right)')
            eyesType7(id)
            break
        case "9": 
            normalEyes(id)
            $('#eyeName'+id).html('Cross-Eyed')
            eyesType8(id)
            break
        case "10":
            normalEyes(id)
            $('#eyeName'+id).html('Wink')
            eyesType9(id)
            break
        case "11":
            normalEyes(id)
            $('#eyeName'+id).html('Focus')
            eyesType10(id)
            break
    }
}

function changeDecorationVariation(num, id) {
    
    switch (num) {
        case "1":
            $('#patternName'+id).html('Basic')
            normaldecoration(id)
            break
        case "2":
            normaldecoration(id)
            $('#patternName'+id).html('Spread')
            headPattern1(id)
            break
        case "3":
            normaldecoration(id)
            $('#patternName'+id).html('Long and Wide')
            headPattern2(id)
            break
        case "4":
            normaldecoration(id)
            $('#patternName'+id).html('Tiny')
            headPattern3(id)
            break
        case "5":
            normaldecoration(id)
            $('#patternName'+id).html('Upside Down')
            headPattern4()
            break
        
        case "6":
            normaldecoration(id)
            $('#patternName'+id).html('Fringe')
            headPattern5(id)
            break

        case "7":
            normaldecoration(id)
            $('#patternName'+id).html('Specks')
            headPattern6(id)
            break
    }
}

function changeAnimationVariation(num, id){
    
    switch (num){
        case 1: 
            noAnimation(id)
            $('#animationName'+id).html('Still')
            break
        case 2:
            noAnimation(id)
            $('#animationName'+id).html('Head and Ears Weave')
            animationType1(id)
            break
        case 3:
            noAnimation(id)
            $('#animationName'+id).html('Ears Move')
            animationType2(id)
            break
        case 4:
            noAnimation(id)
            $('#animationName'+id).html('Tail Moves')
            animationType3(id)
            break
        case 5:
            noAnimation(id)
            $('#animationName'+id).html('Eyes ')
            animationType4(id)
            break
        case 6:
            noAnimation(id)
            $('#animationName'+id).html('Whiskers Twitch')
            animationType5(id)
            break
        case 7:
            noAnimation(id)
            $('#animationName'+id).html('Blown Up')
            animationType6(id)
            break
        case 8:
            noAnimation(id)
            $('#animationName'+id).html('Dozing Off')
            animationType7(id)
            break
        case 9:
            noAnimation(id)
            $('#animationName'+id).html('Trip')
            animationType8(id)
            break

    }
}

//**********EYE TYPES************

var innerSmallLeft = document.getElementsByClassName('inner-eyes-small-left' )
var innerBigLeft = document.getElementsByClassName('inner-eyes-big-left')
var innerSmallRight = document.getElementsByClassName('inner-eyes-small-right')
var innerBigRight = document.getElementsByClassName('inner-eyes-big-right')
var leftPupil = document.getElementsByClassName('pupil-left')
var rightPupil = document.getElementsByClassName('pupil-right')

async function normalEyes(id) {
    await $('#catEyes'+id).find('span').css('border', 'none')
    await $('#catEyes'+id).find(innerBigLeft).css('background-color', 'blanchedalmond')
    await $('#catEyes'+id).find(innerBigRight).css('background-color', 'blanchedalmond')
    await $('#catEyes'+id).find(innerSmallLeft).css('background-color', 'blanchedalmond')
    await $('#catEyes'+id).find(innerSmallRight).css('background-color', 'blanchedalmond')
}
async function eyesType1(id) {//top lids half shut-- chiller
    await $('#catEyes'+id).find('span').css('border-top', '13px solid')
}
async function eyesType2(id) {//bottom lids half shut-- welling up
    await $('#catEyes'+id).find('span').css('border-bottom', '13px solid')
}
async function eyesType3(id) {//looking down left
    await $('#catEyes'+id).find('span').css('border-top', '12px solid')
    await $('#catEyes'+id).find('span').css('border-right', '12px solid')

}
async function eyesType4(id) {//looking down right
    await $('#catEyes'+id).find('span').css('border-top', '12px solid')
    await $('#catEyes'+id).find('span').css( 'border-left', '12px solid')
}

async function eyesType5(id) {//sleepy
    await $('#catEyes'+id).find('span').css('border-top', '17px solid')
    await $('#catEyes'+id).find('span').css('border-bottom', '10px solid')
    await $('#catEyes'+id).find(innerBigRight).css('background-color', '#ffebcd00')
    await $('#catEyes'+id).find(innerSmallLeft).css('background-color', '#ffebcd00')
    await $('#catEyes'+id).find(innerSmallRight).css('background-color', '#ffebcd00')
    await $('#catEyes'+id).find(innerBigLeft).css('background-color', '#ffebcd00')
}

async function eyesType6(id) {//top lid half shut left eye
    await $('#catEyes'+id).find(leftPupil).css('border-top', '13px solid')
}
async function eyesType7(id) {//top lid half shut right eye
    await $('#catEyes'+id).find(rightPupil).css('border-top', '13px solid')
}

async function eyesType8(id) {//cross-eyed
    await $('#catEyes'+id).find(leftPupil).css('border-left', '11px solid')
    await $('#catEyes'+id).find(rightPupil).css('border-right', '12px solid')
}

async function eyesType9(id) { //wink left eye
    await $('#catEyes'+id).find(leftPupil).css('border-top', '14px solid')
    await $('#catEyes'+id).find(leftPupil).css('border-bottom', '15px solid')
    await $('#catEyes'+id).find(innerBigLeft).css('background-color', '#ffebcd00')
    await $('#catEyes'+id).find(innerSmallLeft).css('background-color', '#ffebcd00')
}

async function eyesType10(id) {//small pupil
    await $('#catEyes'+id).find('span').css('border-top', 'solid 7px')
    await $('#catEyes'+id).find('span').css('border-bottom', 'solid 7px')
    await $('#catEyes'+id).find('span').css('border-left', 'solid 7px')
    await $('#catEyes'+id).find('span').css('border-right', 'solid 7px')
}

//********** HEAD PATTERNS **********


async function normaldecoration(id) {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    $('#midShapes'+id).css({ "transform": "rotate(0deg)", "height": "48px", "width": "14px", "top": "1px", "left": "92px", "border-radius": "0 0 50% 50%" })
    $('#leftShape'+id).css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "0px", "left": "-13px", "border-radius": "50% 0 50% 50%" })
    $('#rightShape'+id).css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "0px", "left": "13px", "border-radius": "0 50% 50% 50%" })
}

async function headPattern1(id){
    $('#midShapes'+id).css({ "top": "3px", "border-radius": "30% 30% 50% 50%"})
    $('#leftShape'+id).css({ "transform": "rotate(63deg)", "height": "35px", "width": "14px", "top": "-3px", "border-radius": "50% 0 50% 50%" })
    $('#rightShape'+id).css({ "transform": "rotate(-63deg)", "height": "35px", "width": "14px", "top": "-2px", "border-radius": "50% 0 50% 50%" })

}

 async function headPattern2(id) {
     await $('#midShapes'+id).css({ "top": "3px", "border-radius": "30% 30% 50% 50%"})
     await $('#leftShape'+id).css({ "transform": "rotate(72deg)", "height": "63px", "width": "14px", "top": "-19px", "left": "-27px", "border-radius": "50% 0 50% 50%" })
     await $('#rightShape'+id).css({ "transform": "rotate(-74deg)", "height": "63px", "width": "14px", "top": "-17px", "left": "27px", "border-radius": "50% 0 50% 50%" })
 }
 
 async function headPattern3(id) {
     await $('#midShapes'+id).css({ "top": "4px", "border-radius": "30% 30% 50% 50%"})
     await $('#leftShape'+id).css({ "transform": "rotate(30deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
     await $('#rightShape'+id).css({ "transform": "rotate(-30deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
 
     await $('#midShapes'+id).css({ "transform": "scale(0.3)"})
     await $('#midShapes'+id).css({ "top": "-5"})
   }
 
   async function headPattern4(id) {
     await $('#midShapes'+id).css({ "top": "4px", "border-radius": "30% 30% 50% 50%"})
     await $('#leftShape'+id).css({ "transform": "rotate(25deg)", "height": "38px", "width": "14px", "top": "-2px", "left": "-8px" })
     await $('.#leftShape'+id).css({ "transform": "rotate(-30deg)", "height": "35px", "width": "14px", "top": "0px", "left": "9px" })
     await $('#midShapes'+id).css({ "transform": "rotate(180deg)"})
     await $('#midShapes'+id).css({ "top": "4px"})   
   }
 
   async function headPattern5(id) {   
     await $('#leftShape'+id).css({"height": "60px", "width": "15px"})
     await $('#rightShape'+id).css({"height": "60px", "width": "15px", "top": "0px"})   
   }
 
   async function headPattern6(id) {   
     await $('#midShapes'+id).css({ "height": "10px", "width": "5px", "transform": "rotate(-1deg)", "left": "97px"})
     await $('#leftShape'+id).css({"height": "10px", "width": "5px"})
     await $('#rightShape'+id).css({"height": "10px", "width": "5px"})   
   }
 

//*********ANIMATIONS**********

function noAnimation(id){
    document.getElementById('catHead'+id).classList.remove('noddingHead','movingHead')
    document.getElementById('catEars'+id).classList.remove('noddingHead')
    document.getElementById('leftEar'+id).classList.remove('movingLeftEar')
    document.getElementById('rightEar'+id).classList.remove('movingRightEar')
    document.getElementById('catTail'+id).classList.remove('movingTail')
    document.getElementById('rightWhiskers'+id).classList.remove('movingWhiskersRight')
    document.getElementById('leftWhiskers'+id).classList.remove('movingWhiskersLeft')
    document.getElementById('catBody'+id).classList.remove('enflatedBelly')
    document.getElementById('catBelly'+id).classList.remove('enflatedBelly')
    document.getElementById('leftPupil'+id).classList.remove('eyesTired', 'eyesChangeColor')
    document.getElementById('rightPupil'+id).classList.remove('eyesTired', 'eyesChangeColor')
    document.getElementById('catEyes'+id).classList.remove('eyesBigger')
    document.getElementById('bothFeet'+id).classList.remove('enflatedFeet')

}

async function animationType1(id){//head and ears weave side to side
    $('#catHead'+id).addClass('noddingHead')
    $('#catEars'+id).addClass('noddingHead')
}

async function animationType2(id){ //ears move
    $('#leftEar'+id).addClass('movingLeftEar')
    $('#rightEar'+id).addClass('movingRightEar')
}

async function animationType3(id){
    $('#catTail'+id).addClass('movingTail')
}

async function animationType4(id){ //bigger eyes
    $('#catEyes'+id).addClass('eyesBigger')
    
}

async function animationType5(id){ //whiskers move
    $('#rightWhiskers'+id).addClass('movingWhiskersRight')
    $('#leftWhiskers'+id).addClass('movingWhiskersLeft')

}

async function animationType6(id){ //fat
    $('#catBody'+id).addClass('enflatedBelly')
    $('#catBelly'+id).addClass('enflatedBelly')
    $('#bothFeet'+id).addClass('enflatedFeet')
}

async function animationType7(id){
    $('#leftPupil'+id).addClass('eyesTired')
    $('#rightPupil'+id).addClass('eyesTired')
}

async function animationType8(id){// mutli-coloured eyes
    $('#leftPupil'+id).addClass('eyesChangeColor')
    $('#rightPupil'+id).addClass('eyesChangeColor')
}






//eyes following cursor
const closer = 4;
const further = -4;

document.addEventListener('mousemove', (e) => {
    let positionX = e.pageX;
    let positionY = e.pageY;

    let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    let height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    let moveX = (positionX - width) / (width) * closer;
    let moveY = (positionY - height) / (height) * closer;

    $('.pupil-left').css('transform', 'translate(' + moveX + 'px,' + moveY + 'px)')
    $('.pupil-right').css('transform', 'translate(' + moveX + 'px,' + moveY + 'px)')

}, false);













// var web3 = new Web3(Web3.givenProvider);

// var instance;
// var user;
// var contractAddress = "0x907EcC1E7732ba1397CF01E16eD7DaBf2483811d";
        
// $(document).ready(function(){
//     window.ethereum.enable().then(function(accounts) {
//         instance = new web3.eth.Contract(abi.catContract, contractAddress, {from: accounts[0]});
//         user = accounts[0];

//         console.log(instance);
        
//     })
// })

// async function breedCats(gender) {
//     var arrayId = await instance.methods.ownedTokens(user).call();
//     for (i = 0; i < arrayId.length; i++) {
//       appendCat(arrayId[i], gender)
//     }
//   }
  
//   async function appendCat(id, gender) {
//     var cat = await instance.methods.getCat(id).call()
//     breedAppend(cat[0], id, cat['generation'], gender)
//   }

//   function breedAppend(dna, id, gen, gender) {
//     var dnaCat = catDna(dna)   
//     breedBox(id)
//     renderCat(dnaCat, id)
//     $('#catDNA' + id).html(`
//     <span class="badge badge-light"><h4 class="tsp-2 m-0"><b>GEN:</b>`+ gen + `</h4></span>
//     <br>
//     <span class="badge badge-light"><h4 class="tsp-2 m-0"><b>DNA:</b>`+ dna + `</h4></span>`)

//     $('#catview' + id).attr('onclick', 'selectBreed("' + dna + '","' + id + '","' + gen + '","' + gender + '")')
// }
  
// function renderCat(dna, id){

//     bodyColor(dna.bodyColor, id);
//     eyeColor(dna.eyeColor,id);
//     bellyColor(dna.bellyColor, id);
//     earColor(dna.earColor, id);
//     tailColor(dna.tailColor, id);
//     decorationMidColor(dna.decorationMidColor, id);
//     decorationSidesColor(dna.decorationSidesColor, id);
//     decorationVariation(dna.decorationPattern, id);
//     eyeVariation(dna.eyesShape, id);
//     animationVariation(dna.animation, id);

// }

// function chooseCat(dna, id, generation, gender){
//     var CatDna = catDna(dna);
//     var body = eachCat(id);
//     var cattributes = eachCattribute(gender);
//     $("#cattributes").html(cattributes);
//     $("#singleCat").html(body);

//     renderCat(CatDna, id)
//     $("#catDna").html(`
//     <span class="badge badge-light"><h4 class="tsp-2 m-0"><b>GEN:</b>`+ generation + `</h4></span>
//     <br>
//     <span class="badge badge-light"><h4 class="tsp-2 m-0"><b>DNA:</b>`+ dna + `</h4></span>`)
// }


// function catDna(dnaStr) {

//     var dna = {
//         //Colors
//         "headcolor": dnaStr.substring(0, 2),
//         "eyesColor": dnaStr.substring(2, 4),
//         "mouthColor": dnaStr.substring(4, 6),
//         "earsColor": dnaStr.substring(6, 8),
//         "tailColor":dnaStr.substring(8, 10),
//         //Cattributes
//         "eyesShape": dnaStr.substring(10, 11),
//         "decorationPattern": dnaStr.substring(11, 12),
//         "decorationMidcolor": dnaStr.substring(12, 14),
//         "decorationSidescolor": dnaStr.substring(14, 16),
//         "animation": dnaStr.substring(16, 17),
//         "lastNum": dnaStr.substring(17, 18)
//     }

//     return dna
// }

// function breedBox(id) {

//     var catDiv = `<div class="col-lg-4 pointer fit-content" id="catview` + id + `">
//                  <div class="featureBox catDiv">
//                  `+ eachCat(id) + `                           
//                  </div>
//                  <div class="dnaDiv" id="catDNA`+ id + `"></div>
//                  `+ eachCattribute(id) + `
//                 </div>`
//     var catView = $('#catview' + id)
//     if (!catView.length) {
//         $('#catsDiv').append(catDiv)
//     }
// }

// function eachCat(id) {

//     var single = `<div class = "cat" id = "newCat `+ id +`">
//                       <div class = "ears">
//                           <div id = "leftEar `+ id +`" class= "ear left-ear">
//                               <div class = " left-inner-ear"></div>
//                           </div>
//                           <div id = "rightEar `+ id +`" class = "ear right-ear">
//                               <div class = "right-inner-ear"></div>
//                           </div>
//                       </div>
//                       <div id = "catTail`+ id +`" class = "tail">
//                           <div class = "inner-tail"></div>
//                       </div>
//                       <div id = "catBody`+ id +`" class = "body"></div>
//                       <div id = "catBelly`+ id +`" class = "belly"></div>
//                       <div id = "catHead`+ id +`" class = "head">
//                                     <!--head-pattern-->
//                         <div id="midShape`+ id +`" class="head-shapes">
//                             <div id="leftShape`+ id +`" class="left_head-shape"></div>
//                             <div id="rightShape`+ id +`" class="right_head-shape"></div>
//                         </div>
//                           <div id = "catEyes`+ id +`" class = "eyes">
//                               <div class = "eye-left">
//                                   <span id = "leftPupil`+ id +`" class = "pupil-left">
//                                       <div class = "inner-eyes-big-left"></div>
//                                       <div class = "inner-eyes-small-left"></div>
//                                   </span>
//                               </div>
//                               <div class = "eye-right">
//                                   <span id = "rightPupil`+ id +`" class = "pupil-right">
//                                       <div class = "inner-eyes-big-right"></div>
//                                       <div class = "inner-eyes-small-right"></div>
//                                   </span>
//                               </div>    
//                           </div>
//                           <div class = "mouth"></div>
//                           <div class = "whiskers">
//                               <div id = "rightWhiskers`+ id +`" class = "whiskers-right">
//                                   <div class = "whisker1"></div>
//                                   <div class = "whisker2"></div>
//                                   <div class = "whisker3"></div>
//                               </div>
//                               <div id = "leftWhiskers`+ id +`" class = "whiskers-left">
//                                   <div class = "whisker4"></div>
//                                   <div class = "whisker5"></div>
//                                   <div class = "whisker6"></div>
//                               </div>
//                           </div>
//                           <div class = "mouth-left"></div>
//                           <div class = "mouth-right"></div>
//                           <div class = "nose"></div>
//                           <div class = "chin"></div>
//                       </div>


//                       <div id = "bothFeet`+ id +`" class = "feet">
//                           <div class = "foot-left"></div>
//                           <div class = "foot-right"></div>
//                      </div>
//                 </div>`
//     return single;
// }

// function eachCattribute(id) {

//     var Cattributes = `<ul class="ml-5 cattributes">
//                             <li><span id="eyeName`+ id + `"></span> eyes</li>
//                             <li><span id="decorationName`+ id + `"></span> decoration</li>
//                             <li><span id="animationName`+ id + `"></span></li>
//                         </ul>`
//     return Cattributes

// }