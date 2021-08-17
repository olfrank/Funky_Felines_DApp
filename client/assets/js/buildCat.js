
var colors = Object.values(allColors());

function changeBodyColor(code, id) {
    var color = colors[code];
    $('#catBody'+ id + ', #catHead'+ id).css('background', '#' + color)  //This changes the color of the cat
    $('#bothFeet'+id).find('.foot-left').css('background', '#' + color)
    $('#bothFeet'+id).find('.foot-right').css('background', '#' + color)
}

function changeEyeColor(code, id) {
    var color = colors[code];
    $('#catEyes'+id).find('span').css('background', '#' + color);
    
}

function changeBellyColor(code, id) {
    var color = colors[code];
    $('#mouth'+id +  ', #catBelly'+id).css('background', '#' + color);
    
}

function changeEarColor(code, id) {
    var color = colors[code];
    $('#leftEar'+id + ', #rightEar' +id + ', #inner-tail'+id).css('background', '#' + color);
    
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
            $('#eyeName'+id).html('Basic')//set the badge "Basic"
            normalEyes(id)
            break 
        case "2": 
            $('#eyeName'+id).html('Chiller')
            eyesType1(id)
            break
        case "3": 
            $('#eyeName'+id).html('Welling Up')
            eyesType2(id)
            break
        case "4":
            $('#eyeName'+id).html('Down Left')
            eyesType3(id)
            break
        case "5":
            $('#eyeName'+id).html('Down Right')
            eyesType4(id)
            break
        case "6": 
            $('#eyeName'+id).html('Sleepy')
            eyesType5(id)
            break
        case "7": 
            $('#eyeName'+id).html('Sour (left)')
            eyesType6(id)
            break
        case "8":
            $('#eyeName'+id).html('Sour (right)')
            eyesType7(id)
            break
        case "9": 
            $('#eyeName'+id).html('Cross-Eyed')
            eyesType8(id)
            break
        case "10":
            $('#eyeName'+id).html('Wink')
            eyesType9(id)
            break
        case "11":
            $('#eyeName'+id).html('Focus')
            eyesType10(id)
            break
    }
}

function changeDecorationVariation(num, id) {
    
    switch (num) {
        case "1":
            $('#decorationName'+id).html('Basic')
            normaldecoration(id)
            break
        case "2":
            $('#decorationName'+id).html('Spread')
            headPattern1(id)
            break
        case "3":
            $('#decorationName'+id).html('Long and Wide')
            headPattern2(id)
            break
        case "4":
            $('#decorationName'+id).html('Tiny')
            headPattern3(id)
            break
        case "5":
            $('#decorationName'+id).html('Upside Down')
            headPattern4()
            break
        case "6":
            $('#decorationName'+id).html('Fringe')
            headPattern5(id)
            break
        case "7":
            $('#decorationName'+id).html('Specks')
            headPattern6(id)
            break
    }
}

function changeAnimationVariation(num, id){
    
    switch (num){
        case "1": 
            $('#animationName'+id).html('Still')
            noAnimation(id)
            break
        case "2":
            $('#animationName'+id).html('Head and Ears Weave')
            animationType1(id)
            break
        case "3":
            $('#animationName'+id).html('Ears Sway')
            animationType2(id)
            break
        case "4":
            $('#animationName'+id).html('Tail Twitches')
            animationType3(id)
            break
        case "5":
            $('#animationName'+id).html('Eyes Enlargen')
            animationType4(id)
            break
        case "6":
            $('#animationName'+id).html('Whiskers Twitch')
            animationType5(id)
            break
        case "7":
            $('#animationName'+id).html('Blown Up')
            animationType6(id)
            break
        case "8":
            $('#animationName'+id).html('Dozing Off')
            animationType7(id)
            break
        case "9":
            $('#animationName'+id).html('Trip')
            animationType8(id)
            break

    }
}

function changeSpecialVariation(num, id){
    
    switch(num){
        case "1":
            $('#specialName'+id).html('Basic')
            noSpecial(id)
            break
        case "2":
            $('#specialName'+id).html('😎 😎 😎 😎 😎 ')
            special(id)
            break
        case "3":
            $('#specialName'+id).html('Basic')
            noSpecial(id)
            break
        case "4":
            $('#specialName'+id).html('Basic')
            noSpecial(id)
            break
        case "5":
            $('#specialName'+id).html('Basic')
            noSpecial(id)
            break
        case "6":
            $('#specialName'+id).html('Basic')
            noSpecial(id)
            break
        case "7":
            $('#specialName'+id).html('Basic')
            noSpecial(id)
            break
        case "8":
            $('#specialName'+id).html('Basic')
            noSpecial(id)
            break
        case "9":
            $('#specialName'+id).html('Basic')
            noSpecial()
            break
        case "10":
            $('#specialName'+id).html('Basic')
            noSpecial()
            break
    }
}

function noSpecial(id){
    $('#catEyes'+id).removeClass('sunnies');
}

function special(id){
   $('#catEyes'+id).addClass('sunnies');
}

//**********EYE TYPES************

// var innerSmallLeft = document.getElementsByClassName('inner-eyes-small-left' )
// var innerBigLeft = document.getElementsByClassName('inner-eyes-big-left')
// var innerSmallRight = document.getElementsByClassName('inner-eyes-small-right')
// var innerBigRight = document.getElementsByClassName('inner-eyes-big-right')
// var leftPupil = document.getElementsByClassName('pupil-left')
// var rightPupil = document.getElementsByClassName('pupil-right')

 function normalEyes(id) {
     $('#catEyes'+id).find('span').css('border', 'none')
     $('#catEyes'+id).find('inner-eyes-big-left').css('background-color', 'blanchedalmond')
     $('#catEyes'+id).find('.inner-eyes-big-right').css('background-color', 'blanchedalmond')
     $('#catEyes'+id).find('.inner-eyes-small-left' ).css('background-color', 'blanchedalmond')
     $('#catEyes'+id).find('inner-eyes-small-right').css('background-color', 'blanchedalmond')
}
 function eyesType1(id) {//top lids half shut-- chiller
     $('#catEyes'+id).find('span').css('border-top', '13px solid')
}
 function eyesType2(id) {//bottom lids half shut-- welling up
     $('#catEyes'+id).find('span').css('border-bottom', '13px solid')
}
 function eyesType3(id) {//looking down left
     $('#catEyes'+id).find('span').css('border-top', '12px solid')
     $('#catEyes'+id).find('span').css('border-right', '12px solid')

}
 function eyesType4(id) {//looking down right
     $('#catEyes'+id).find('span').css('border-top', '12px solid')
     $('#catEyes'+id).find('span').css( 'border-left', '12px solid')
}

 function eyesType5(id) {//sleepy
     $('#catEyes'+id).find('span').css('border-top', '17px solid')
     $('#catEyes'+id).find('span').css('border-bottom', '10px solid')
     $('#catEyes'+id).find('.inner-eyes-big-right').css('background-color', '#ffebcd00')
     $('#catEyes'+id).find('.inner-eyes-small-left').css('background-color', '#ffebcd00')
     $('#catEyes'+id).find('.inner-eyes-small-right').css('background-color', '#ffebcd00')
     $('#catEyes'+id).find('.inner-eyes-big-left').css('background-color', '#ffebcd00')
}

 function eyesType6(id) {//top lid half shut left eye
     $('#catEyes'+id).find('.pupil-left').css('border-top', '13px solid')
}
async function eyesType7(id) {//top lid half shut right eye
     $('#catEyes'+id).find('.pupil-right').css('border-top', '13px solid')
}

 function eyesType8(id) {//cross-eyed
     $('#catEyes'+id).find('.pupil-left').css('border-left', '11px solid')
     $('#catEyes'+id).find('.pupil-right').css('border-right', '12px solid')
}

 function eyesType9(id) { //wink left eye
     $('#catEyes'+id).find('.pupil-left').css('border-top', '14px solid')
     $('#catEyes'+id).find('.pupil-left').css('border-bottom', '15px solid')
     $('#catEyes'+id).find('.inner-eyes-big-left').css('background-color', '#ffebcd00')
     $('#catEyes'+id).find('.inner-eyes-small-left' ).css('background-color', '#ffebcd00')
}

 function eyesType10(id) {//small pupil
     $('#catEyes'+id).find('span').css('border-top', 'solid 7px')
     $('#catEyes'+id).find('span').css('border-bottom', 'solid 7px')
     $('#catEyes'+id).find('span').css('border-left', 'solid 7px')
     $('#catEyes'+id).find('span').css('border-right', 'solid 7px')
}

//********** HEAD PATTERNS **********


 function normaldecoration(id) {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    $('#midShape'+id).css({ "transform": "rotate(0deg)", "height": "48px", "width": "14px", "top": "1px", "left": "92px", "border-radius": "0 0 50% 50%" })
    $('#leftShape'+id).css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "0px", "left": "-13px", "border-radius": "50% 0 50% 50%" })
    $('#rightShape'+id).css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "0px", "left": "13px", "border-radius": "0 50% 50% 50%" })
}

 function headPattern1(id){
    $('#midShape'+id).css({ "top": "3px", "border-radius": "30% 30% 50% 50%"})
    $('#leftShape'+id).css({ "transform": "rotate(63deg)", "height": "35px", "width": "14px", "top": "-3px", "border-radius": "50% 0 50% 50%" })
    $('#rightShape'+id).css({ "transform": "rotate(-63deg)", "height": "35px", "width": "14px", "top": "-2px", "border-radius": "50% 0 50% 50%" })

}

  function headPattern2(id) {
      $('#midShape'+id).css({ "top": "3px", "border-radius": "30% 30% 50% 50%"})
      $('#leftShape'+id).css({ "transform": "rotate(72deg)", "height": "63px", "width": "14px", "top": "-19px", "left": "-27px", "border-radius": "50% 0 50% 50%" })
      $('#rightShape'+id).css({ "transform": "rotate(-74deg)", "height": "63px", "width": "14px", "top": "-17px", "left": "27px", "border-radius": "50% 0 50% 50%" })
 }
 
  function headPattern3(id) {
      $('#midShape'+id).css({ "top": "4px", "border-radius": "30% 30% 50% 50%"})
      $('#leftShape'+id).css({ "transform": "rotate(30deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
      $('#rightShape'+id).css({ "transform": "rotate(-30deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
 
      $('#midShape'+id).css({ "transform": "scale(0.3)"})
      $('#midShape'+id).css({ "top": "-5"})
   }
 
    function headPattern4(id) {
      $('#midShape'+id).css({ "top": "4px", "border-radius": "30% 30% 50% 50%"})
      $('#leftShape'+id).css({ "transform": "rotate(25deg)", "height": "38px", "width": "14px", "top": "-2px", "left": "-8px" })
      $('#leftShape'+id).css({ "transform": "rotate(-30deg)", "height": "35px", "width": "14px", "top": "0px", "left": "9px" })
      $('#midShape'+id).css({ "transform": "rotate(180deg)"})
      $('#midShape'+id).css({ "top": "4px"})   
   }
 
    function headPattern5(id) {   
      $('#leftShape'+id).css({"height": "60px", "width": "15px"})
      $('#rightShape'+id).css({"height": "60px", "width": "15px", "top": "0px"})   
   }
 
    function headPattern6(id) {   
      $('#midShape'+id).css({ "height": "10px", "width": "5px", "transform": "rotate(-1deg)", "left": "97px"})
      $('#leftShape'+id).css({"height": "10px", "width": "5px"})
      $('#rightShape'+id).css({"height": "10px", "width": "5px"})   
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

 function animationType1(id){//head and ears weave side to side
    $('#catHead'+id+ ',#catEars'+id).addClass('noddingHead');
    
}

 function animationType2(id){ //ears move
    $('#leftEar'+id).addClass('movingLeftEar')
    $('#rightEar'+id).addClass('movingRightEar')
}

 function animationType3(id){
    $('#catTail' +id).addClass('movingTail')
}

 function animationType4(id){ //bigger eyes
    $('#catEyes' +id).addClass('eyesBigger')
    
}

 function animationType5(id){ //whiskers move
    $('#rightWhiskers' +id).addClass('movingWhiskersRight')
    $('#leftWhiskers' +id).addClass('movingWhiskersLeft')

}

 function animationType6(id){ //fat
    $('#catBody' +id).addClass('enflatedBelly')
    $('#catBelly' +id).addClass('enflatedBelly')
    $('#bothFeet' +id).addClass('enflatedFeet')
}

 function animationType7(id){
    $('#leftPupil' +id).addClass('eyesTired')
    $('#rightPupil' +id).addClass('eyesTired')
}

 function animationType8(id){// mutli-coloured eyes
    $('#leftPupil' +id).addClass('eyesChangeColor')
    $('#rightPupil' +id).addClass('eyesChangeColor')
}






//eyes following cursor
// const closer = 4;
// const further = -4;

// document.addEventListener('mousemove', (e) => {
//     let positionX = e.pageX;
//     let positionY = e.pageY;

//     let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
//     let height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

//     let moveX = (positionX - width) / (width) * closer;
//     let moveY = (positionY - height) / (height) * closer;

//     $('.pupil-left').css('transform', 'translate(' + moveX + 'px,' + moveY + 'px)')
//     $('.pupil-right').css('transform', 'translate(' + moveX + 'px,' + moveY + 'px)')

// }, false);













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