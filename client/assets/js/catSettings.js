
var colors = Object.values(allColors())

var defaultDNA = {
    "headColor" : 10,
    "mouthColor" : 13,
    "eyesColor" : 96,
    "earsColor" : 10,
    "BellyColor": 39,
    "TailColor": 29,
    //Cattributes
    "eyesShape" : 1,
    "decorationPattern" : 1,
    "decorationMidcolor" : 13,
    "decorationSidescolor" : 13,
    "animation" :  1,
    "lastNum" :  1
    }

// when page load
$( document ).ready(function() {
  $('#dnabody').html(defaultDNA.headColor);
  $('#dnaeyes').html(defaultDNA.mouthColor);
  $('#dnabelly').html(defaultDNA.eyesColor);
  $('#dnaears').html(defaultDNA.earsColor);
  $('#dnatail').html(defaultDNA.tailColor);
    
  $('#dnashape').html(defaultDNA.eyesShape)
  $('#dnadecoration').html(defaultDNA.decorationPattern)
  $('#dnadecorationMid').html(defaultDNA.decorationMidcolor)
  $('#dnadecorationSides').html(defaultDNA.decorationSidescolor)
  $('#dnaanimation').html(defaultDNA.animation)
  $('#dnaspecial').html(defaultDNA.lastNum)

  renderCat(defaultDNA)
});

function getDna(){
    var dna = ''
    dna += $('#dnabody').html()
    dna += $('#dnaeyes').html()
    dna += $('#dnabelly').html()
    dna += $('#dnaears').html()
    dna += $('#dnatail').html()
    dna += $('#dnashape').html()
    dna += $('#dnadecoration').html()
    dna += $('#dnadecorationmid').html()
    dna += $('#dnadecorationsides').html()
    dna += $('#dnaanimations').html()
    dna += $('#dnaspecial').html()

    return parseInt(dna)
}

function renderCat(dna){
    bodyColor(colors[dna.headColor],dna.headColor)
    $('#bodycolor').val(dna.headColor)

    eyeColor(colors[dna.eyesColor],dna.eyesColor)
    $('#eyecolor').val(dna.eyescolor)

    bellyColor(colors[dna.BellyColor],dna.BellyColor)
    $('#bellycolor').val(dna.BellyColor)

    earColor(colors[dna.earsColor],dna.earsColor)
    $('#earscolor').val(dna.earsColor)

    tailColor(colors[dna.TailColor],dna.TailColor)
    $('#tailcolor').val(dna.TailColor)

    eyeVariation(dna.eyesShape)
    $('#eyeshape').val(dna.eyesShape)

    decorationVariation(dna.decorationPattern)
    $('#decorationpattern').val(dna.decorationPattern)

    decorationMidColor(colors[dna.decorationMidcolor], dna.decorationMidcolor)
    $('decorationmid').val(dna.decorationMidcolor)

    decorationSidesColor(colors[dna.decorationSidescolor], dna.decorationSidescolor)
    $('#decorationside').val(dna.decorationSidescolor)

    animationVariation(dna.animation)
    $('#animations').val(dna.animation)
    
    
}

//listeners for each slider
// Changing cat colors
$('#bodycolor').change(()=>{
    var colorVal = $('#bodycolor').val()
    bodyColor(colors[colorVal],colorVal)
})

$('#eyecolor').change(()=>{
  var colorVal = $('#eyecolor').val()
  eyeColor(colors[colorVal], colorVal)
})

$('#earcolor').change(()=>{
  var colorVal = $('#earcolor').val()
  earColor(colors[colorVal], colorVal)
})

$('#tailcolor').change(()=>{
  var colorVal = $('#tailcolor').val()
  tailColor(colors[colorVal], colorVal)
})

$('#bellycolor').change(()=>{
  var colorVal = $('#bellycolor').val()
  bellyColor(colors[colorVal], colorVal)
})


//cattributes
$('#eyeshape').change(()=>{
  var shape = parseInt($('#eyeshape').val());
  eyeVariation(shape);
})


$('#decorationpattern').change(()=>{
  var pattern = parseInt( $('#decorationpattern').val() )
  decorationVariation(pattern)

})

$('#decorationmid').change(()=>{
  var colorVal = $('#decorationmid').val()
  decorationMidColor(colors[colorVal],colorVal)
})

$('#decorationside').change(()=>{
  var colorVal = $('#decorationside').val()
  decorationSidesColor(colors[colorVal],colorVal)
})

$('#animations').change(()=>{
  var animationVal = parseInt( $('#animations').val() )
  animationVariation(animationVal)
})

//Random Click
$('#random').click(()=>{
  
//cattributes
  var shape = Math.floor(Math.random()*11)+1
  eyeVariation(shape)
  $('#eyeshape').val(shape)

  var pattern = Math.floor(Math.random()*7)+1
  decorationVariation(pattern)
  $('#decorationpattern').val(pattern)

  var anim = Math.floor(Math.random()*9)+1
  animationVariation(anim)
  parseInt( $('#animations').val(anim) )

  var sides = Math.floor(Math.random()*89)+10
  decorationSidesColor(colors[sides],sides)
  $('#decorationside').val(sides)

  var mid = Math.floor(Math.random()*89)+10
  decorationMidColor(colors[mid],mid)
  $('#decorationmid').val(mid)

//colors
  var body = Math.floor(Math.random()*89)+10
  bodyColor(colors[body],body) 
  $('#bodycolor').val(body)

  var eyes = Math.floor(Math.random()*89)+10
  eyeColor(colors[eyes], eyes)
  $('#eyecolor').val(eyes)

  var ears = Math.floor(Math.random()*89)+10
  earColor(colors[ears], ears)
  $('#earcolor').val(ears)

  var tail = Math.floor(Math.random()*89)+10
  tailColor(colors[tail], tail)
  $('#tailcolor').val(tail)

  var belly = Math.floor(Math.random()*89)+10
  bellyColor(colors[belly], belly)
  $('#bellycolor').val(belly)
});

//Reset Click
$('#default').click(()=>{
  eyeVariation(defaultDNA.eyesShape)
  $('#eyeshape').val(defaultDNA.eyesShape)

  decorationVariation(defaultDNA.decorationPattern)
  $('#decorationpattern').val(defaultDNA.decorationPattern)

  decorationSidesColor(colors[defaultDNA.decorationSidescolor],defaultDNA.decorationSidescolor)
  $('#decorationside').val(defaultDNA.decorationSidescolor)

  decorationMidColor(colors[defaultDNA.decorationMidcolor],defaultDNA.decorationMidcolor)
  $('#decorationmid').val(defaultDNA.decorationMidcolor)

  animationVariation(defaultDNA.animation)
  parseInt( $('#animations').val(defaultDNA.animation) )

  bodyColor(colors[defaultDNA.headColor],defaultDNA.headColor) 
  $('#bodycolor').val(defaultDNA.headColor)

  eyeColor(colors[defaultDNA.eyesColor], defaultDNA.eyesColor)
  $('#eyecolor').val(defaultDNA.eyesColor)

  earColor(colors[defaultDNA.earsColor], defaultDNA.earsColor)
  $('#earcolor').val(defaultDNA.earsColor)

  tailColor(colors[defaultDNA.TailColor], defaultDNA.TailColor)
  $('#tailcolor').val(defaultDNA.TailColor)

  bellyColor(colors[defaultDNA.BellyColor], defaultDNA.BellyColor)
  $('#bellycolor').val(defaultDNA.BellyColor)
})

$('#btnColorsTab').click(()=>{
  $("#headGroup").show()
  $("#mouthGroup").show()
  $("#eyesGroup").show()
  $("#earsGroup").show()
  $("#tailGroup").show()

  $("#eyeShapeGroup").hide();
  $("#patternGroup").hide();
  $('#patternColorGroup').hide();
  $("#animationGroup").hide();
})


$('#btnAttributesTab').click(()=>{
  $('#headGroup').hide();
  $('#mouthGroup').hide();
  $('#eyesGroup').hide();
  $('#earsGroup').hide();
  $("#tailGroup").hide()

  $("#eyeShapeGroup").show();
  $("#patternGroup").show();
  $('#patternColorGroup').show();
  $("#animationGroup").show();
})