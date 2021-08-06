
//Random color
function getColor() {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return randomColor
}

function genColors(){
    var colors = []
    for(var i = 10; i < 99; i ++){
      var color = getColor()
      colors[i] = color
    }
    return colors
}

//This function code needs to modified so that it works with Your cat code.
function bodyColor(color, code) {
    $('.body, .head, .foot-left, .foot-right').css('background', '#' + color)  //This changes the color of the cat
    $('#bodycode').html('code: '+ code) //This updates text of the badge next to the slider
    $('#dnabody').html(code) //This updates the body color part of the DNA that is displayed below the cat
}

function eyeColor(color, code) {
    $('.eyes').find('span').css('background', '#' + color);
    $('#eyecode').html('code: '+ code);
    $('#dnaeyes').html(code);
}

function bellyColor(color, code) {
    $('.mouth, .belly').css('background', '#' + color);
    $('#bellycode').html('code: '+ code);
    $('#dnabelly').html(code);
}

function earColor(color, code) {
    $('.ear, .inner-tail').css('background', '#' + color);
    $('#earcode').html('code: '+ code);
    $('#dnaears').html(code);
}

function tailColor(color, code) {
    $('.tail').css('background', '#' + color);
    $('#tailcode').html('code: '+ code);
    $('#dnatail').html(code);
}
function decorationMidColor(color, code) {
    $('.head-shapes').css('background', '#' + color)  //This changes the mid decoration color of the cat
    $('#middlecolorcode').html('code: ' + code) //This updates text of the badge next to the slider
    $('#dnadecorationMid').html(code) //This updates the eye color part of the DNA that is displayed below the cat
}

function decorationSidesColor(color, code) {
    $('.left_head-shape, .right_head-shape').css('background', '#' + color)  //This changes the side decoration color of the cat
    $('#sidecolorcode').html('code: ' + code) //This updates text of the badge next to the slider
    $('#dnadecorationSides').html(code) //This updates the eye color part of the DNA that is displayed below the cat
}


//###################################################
//Functions below will be used later on in the project
//###################################################
function eyeVariation(num) {

    $('#dnashape').html(num)
    switch (num) {
        case 1:
            normalEyes()//reset to default
            $('#eyeName').html('Basic')//set the badge "Basic"
            break 
        case 2: 
            normalEyes()
            $('#eyeName').html('Chiller')
            eyesType1()
            break
        case 3: 
            normalEyes()
            $('#eyeName').html('Welling Up')
            eyesType2()
            break
        case 4:
            normalEyes()
            $('#eyeName').html('Down Left')
            eyesType3()
            break
        case 5:
            normalEyes()
            $('#eyeName').html('Down Right')
            eyesType4()
            break
        case 6: 
            normalEyes()
            $('#eyeName').html('Sleepy')
            eyesType5()
            break
        case 7: 
            normalEyes()
            $('#eyeName').html('Sour (left)')
            eyesType6()
            break
        case 8:
            normalEyes()
            $('#eyeName').html('Sour (right)')
            eyesType7()
            break
        case 9: 
            normalEyes()
            $('#eyeName').html('Cross-Eyed')
            eyesType8()
            break
        case 10:
            normalEyes()
            $('#eyeName').html('Wink')
            eyesType9()
            break
        case 11:
            normalEyes()
            $('#eyeName').html('Focus')
            eyesType10()
            break
    }
}

function decorationVariation(num) {
    $('#dnadecoration').html(num)
    switch (num) {
        case 1:
            $('#patternName').html('Basic')
            normaldecoration()
            break
        case 2:
            normaldecoration()
            $('#patternName').html('Spread')
            headPattern1()
            break
        case 3:
            normaldecoration()
            $('#patternName').html('Long and Wide')
            headPattern2()
            break
        case 4:
            normaldecoration()
            $('#patternName').html('Tiny')
            headPattern3()
            break
        case 5:
            normaldecoration()
            $('#patternName').html('Upside Down')
            headPattern4()
            break
        
        case 6:
            normaldecoration()
            $('#patternName').html('Fringe')
            headPattern5()
            break

        case 7:
            normaldecoration()
            $('#patternName').html('Specks')
            headPattern6()
            break
    }
}

function animationVariation(num){
    $('#dnaanimation').html(num)
    switch (num){
        case 1: 
            noAnimation()
            $('#animationName').html('Still')
            break
        case 2:
            noAnimation()
            $('#animationName').html('Head and Ears Weave')
            animationType1()
            break
        case 3:
            noAnimation()
            $('#animationName').html('Ears Move')
            animationType2()
            break
        case 4:
            noAnimation()
            $('#animationName').html('Tail Moves')
            animationType3()
            break
        case 5:
            noAnimation()
            $('#animationName').html('Eyes ')
            animationType4()
            break
        case 6:
            noAnimation()
            $('#animationName').html('Whiskers Twitch')
            animationType5()
            break
        case 7:
            noAnimation()
            $('#animationName').html('Blown Up')
            animationType6()
            break
        case 8:
            noAnimation()
            $('#animationName').html('Dozing Off')
            animationType7()
            break
        case 9:
            noAnimation()
            $('#animationName').html('Trip')
            animationType8()
            break

    }
}

//**********EYE TYPES************

async function normalEyes() {
    await $('.eyes').find('span').css('border', 'none')
    await $('.eyes').find(innerBigLeft).css('background-color', 'blanchedalmond')
    await $('.eyes').find(innerBigRight).css('background-color', 'blanchedalmond')
    await $('.eyes').find(innerSmallLeft).css('background-color', 'blanchedalmond')
    await $('.eyes').find(innerSmallRight).css('background-color', 'blanchedalmond')
}
async function eyesType1() {//top lids half shut-- chiller
    await $('.eyes').find('span').css('border-top', '13px solid')
}
async function eyesType2() {//bottom lids half shut-- welling up
    await $('.eyes').find('span').css('border-bottom', '13px solid')
}
async function eyesType3() {//looking down left
    await $('.eyes').find('span').css('border-top', '12px solid')
    await $('.eyes').find('span').css('border-right', '12px solid')

}
async function eyesType4() {//looking down right
    await $('.eyes').find('span').css('border-top', '12px solid')
    await $('.eyes').find('span').css( 'border-left', '12px solid')
}

async function eyesType5() {//sleepy
    await $('.eyes').find('span').css('border-top', '17px solid')
    await $('.eyes').find('span').css('border-bottom', '10px solid')
    await $('.eyes').find(innerBigRight).css('background-color', '#ffebcd00')
    await $('.eyes').find(innerSmallLeft).css('background-color', '#ffebcd00')
    await $('.eyes').find(innerSmallRight).css('background-color', '#ffebcd00')
    await $('.eyes').find(innerBigLeft).css('background-color', '#ffebcd00')
}

async function eyesType6() {//top lid half shut left eye
    await $('.eyes').find(leftPupil).css('border-top', '13px solid')
}
async function eyesType7() {//top lid half shut right eye
    await $('.eyes').find(rightPupil).css('border-top', '13px solid')
}

async function eyesType8() {//cross-eyed
    await $('.eyes').find(leftPupil).css('border-left', '11px solid')
    await $('.eyes').find(rightPupil).css('border-right', '12px solid')
}

async function eyesType9() { //wink left eye
    await $('.eyes').find(leftPupil).css('border-top', '14px solid')
    await $('.eyes').find(leftPupil).css('border-bottom', '15px solid')
    await $('.eyes').find(innerBigLeft).css('background-color', '#ffebcd00')
    await $('.eyes').find(innerSmallLeft).css('background-color', '#ffebcd00')
}

async function eyesType10() {//small pupil
    await $('.eyes').find('span').css('border-top', 'solid 7px')
    await $('.eyes').find('span').css('border-bottom', 'solid 7px')
    await $('.eyes').find('span').css('border-left', 'solid 7px')
    await $('.eyes').find('span').css('border-right', 'solid 7px')
}

//********** HEAD PATTERNS **********

var innerSmallLeft = document.getElementsByClassName('inner-eyes-small-left' )
var innerBigLeft = document.getElementsByClassName('inner-eyes-big-left')
var innerSmallRight = document.getElementsByClassName('inner-eyes-small-right')
var innerBigRight = document.getElementsByClassName('inner-eyes-big-right')
var leftPupil = document.getElementsByClassName('pupil-left')
var rightPupil = document.getElementsByClassName('pupil-right')

async function normaldecoration() {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    $('.head-shapes').css({ "transform": "rotate(0deg)", "height": "48px", "width": "14px", "top": "1px", "left": "92px", "border-radius": "0 0 50% 50%" })
    $('.left_head-shape').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "0px", "left": "-13px", "border-radius": "50% 0 50% 50%" })
    $('.right_head-shape').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "0px", "left": "13px", "border-radius": "0 50% 50% 50%" })
}

async function headPattern1(){
    $('.head-shapes').css({ "top": "3px", "border-radius": "30% 30% 50% 50%"})
    $('.left_head-shape').css({ "transform": "rotate(63deg)", "height": "35px", "width": "14px", "top": "-3px", "border-radius": "50% 0 50% 50%" })
    $('.right_head-shape').css({ "transform": "rotate(-63deg)", "height": "35px", "width": "14px", "top": "-2px", "border-radius": "50% 0 50% 50%" })

}

 async function headPattern2() {
     await $('.head-shapes').css({ "top": "3px", "border-radius": "30% 30% 50% 50%"})
     await $('.left_head-shape').css({ "transform": "rotate(72deg)", "height": "63px", "width": "14px", "top": "-19px", "left": "-27px", "border-radius": "50% 0 50% 50%" })
     await $('.right_head-shape').css({ "transform": "rotate(-74deg)", "height": "63px", "width": "14px", "top": "-17px", "left": "27px", "border-radius": "50% 0 50% 50%" })
 }
 
 async function headPattern3() {
     await $('.head-shapes').css({ "top": "4px", "border-radius": "30% 30% 50% 50%"})
     await $('.left_head-shape').css({ "transform": "rotate(30deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
     await $('.right_head-shape').css({ "transform": "rotate(-30deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
 
     await $('.head-shapes').css({ "transform": "scale(0.3)"})
     await $('.head-shapes').css({ "top": "-5"})
   }
 
   async function headPattern4() {
     await $('.head-shapes').css({ "top": "4px", "border-radius": "30% 30% 50% 50%"})
     await $('.left_head-Shape').css({ "transform": "rotate(25deg)", "height": "38px", "width": "14px", "top": "-2px", "left": "-8px" })
     await $('.right_head-Shape').css({ "transform": "rotate(-30deg)", "height": "35px", "width": "14px", "top": "0px", "left": "9px" })
     await $('.head-shapes').css({ "transform": "rotate(180deg)"})
     await $('.head-shapes').css({ "top": "4px"})   
   }
 
   async function headPattern5() {   
     await $('.left_head-shape').css({"height": "60px", "width": "15px"})
     await $('.right_head-shape').css({"height": "60px", "width": "15px", "top": "0px"})   
   }
 
   async function headPattern6() {   
     await $('.head-shapes').css({ "height": "10px", "width": "5px", "transform": "rotate(-1deg)", "left": "97px"})
     await $('.left_head-shape').css({"height": "10px", "width": "5px"})
     await $('.right_head-shape').css({"height": "10px", "width": "5px"})   
   }
 

//*********ANIMATIONS**********

function noAnimation(){
    $('.head').removeClass('noddingHead')
    $('.ears').removeClass('noddingHead')
    $('.left-ear').removeClass('movingLeftEar')
    $('.right-ear').removeClass('movingRightEar')
    $('.tail').removeClass('movingTail')
    $('.head').removeClass('movingHead')
    $('.whiskers-right').removeClass('movingWhiskersRight')
    $('.whiskers-left').removeClass('movingWhiskersLeft')
    $('.body').removeClass('enflatedBelly')
    $('.belly').removeClass('enflatedBelly')
    $('.pupil-left').removeClass('eyesTired')
    $('.pupil-right').removeClass('eyesTired')
    $('.pupil-left').removeClass('eyesChangeColor')
    $('.pupil-right').removeClass('eyesChangeColor')
    $('.eyes').removeClass('eyesBigger')
    $('.feet').removeClass('enflatedFeet')

}

async function animationType1(){//head and ears weave side to side
    $('.head').addClass('noddingHead')
    $('.ears').addClass('noddingHead')
}

async function animationType2(){ //ears move
    $('.left-ear').addClass('movingLeftEar')
    $('.right-ear').addClass('movingRightEar')
}

async function animationType3(){
    $('.tail').addClass('movingTail')
}

async function animationType4(){ //bigger eyes
    $('.eyes').addClass('eyesBigger')
    
}

async function animationType5(){ //whiskers move
    $('.whiskers-right').addClass('movingWhiskersRight')
    $('.whiskers-left').addClass('movingWhiskersLeft')

}

async function animationType6(){ //fat
    $('.body').addClass('enflatedBelly')
    $('.belly').addClass('enflatedBelly')
    $('.feet').addClass('enflatedFeet')
}

async function animationType7(){
    $('.pupil-left').addClass('eyesTired')
    $('.pupil-right').addClass('eyesTired')
}

async function animationType8(){// mutli-coloured eyes
    $('.pupil-left').addClass('eyesChangeColor')
    $('.pupil-right').addClass('eyesChangeColor')
}