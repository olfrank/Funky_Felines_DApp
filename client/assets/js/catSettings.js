
var colors = Object.values(allColors())

var defaultDNA = {
    //Colors
    "headBodyColor" : 10,
    "eyesColor" : 96,
    "bellyMouthColor": 39,
    "earsInnerTailColor" : 10,
    "tailColor": 29,
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
  $('#dnabody').html(defaultDNA.headBodyColor);
  $('#dnaeyes').html(defaultDNA.eyesColor);
  $('#dnabelly').html(defaultDNA.bellyMouthColor);
  $('#dnaears').html(defaultDNA.earsInnerTailColor);
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
    var dna = "";
    dna += $('#dnabody').html()
    dna += $('#dnaeyes').html()
    dna += $('#dnabelly').html()
    dna += $('#dnaears').html()
    dna += $('#dnatail').html()
    dna += $('#dnashape').html()
    dna += $('#dnadecoration').html()
    dna += $('#dnadecorationMid').html()
    dna += $('#dnadecorationSides').html()
    dna += $('#dnaanimation').html()
    dna += $('#dnaspecial').html()

    return dna;
}


function renderCat(dna){
  bodyColor(colors[dna.headBodyColor],dna.headBodyColor)
  $('#bodycolor').val(dna.headBodyColor);

  eyeColor(colors[dna.eyesColor],dna.eyesColor)
  $('#eyecolor').val(dna.eyescolor);

  bellyColor(colors[dna.bellyMouthColor],dna.bellyMouthColor)
  $('#bellycolor').val(dna.bellyMouthColor);

  earColor(colors[dna.earsInnerTailColor],dna.earsInnerTailColor)
  $('#earscolor').val(dna.earsInnerTailColor);

  tailColor(colors[dna.tailColor],dna.tailColor)
  $('#tailcolor').val(dna.tailColor)

  eyeVariation(dna.eyesShape)
  $('#eyeshape').val(dna.eyesShape)

  decorationVariation(dna.decorationPattern)
  $('#decorationpattern').val(dna.decorationPattern)

  decorationMidColor(colors[dna.decorationMidcolor], dna.decorationMidcolor)
  $('#decorationmid').val(dna.decorationMidcolor)

  decorationSidesColor(colors[dna.decorationSidescolor], dna.decorationSidescolor)
  $('#decorationside').val(dna.decorationSidescolor)

  animationVariation(dna.animation)
  $('#animations').val(dna.animation)

  specialName(dna.lastNum)
  $('#special').val(dna.lastNum)
  
  
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

$("#special").change(()=>{
  var specialVal = parseInt( $('#special').val() )
  specialName(specialVal);
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

  var spec = Math.floor(Math.random()*10)+1
  specialName(spec)
  parseInt( $('#special').val(spec) )

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
  bodyColor(colors[defaultDNA.headBodyColor],defaultDNA.headBodyColor) 
  $('#bodycolor').val(defaultDNA.headBodyColor)

  eyeColor(colors[defaultDNA.eyesColor], defaultDNA.eyesColor)
  $('#eyecolor').val(defaultDNA.eyesColor)

  bellyColor(colors[defaultDNA.bellyMouthColor], defaultDNA.bellyMouthColor)
  $('#bellycolor').val(defaultDNA.bellyMouthColor)

  earColor(colors[defaultDNA.earsInnerTailColor], defaultDNA.earsInnerTailColor)
  $('#earcolor').val(defaultDNA.earsInnerTailColor)

  tailColor(colors[defaultDNA.tailColor], defaultDNA.tailColor)
  $('#tailcolor').val(defaultDNA.tailColor)

  eyeVariation(defaultDNA.eyesShape)
  $('#eyeshape').val(defaultDNA.eyesShape)

  decorationVariation(defaultDNA.decorationPattern)
  $('#decorationpattern').val(defaultDNA.decorationPattern)

  decorationMidColor(colors[defaultDNA.decorationMidcolor],defaultDNA.decorationMidcolor)
  $('#decorationmid').val(defaultDNA.decorationMidcolor)

  decorationSidesColor(colors[defaultDNA.decorationSidescolor],defaultDNA.decorationSidescolor)
  $('#decorationside').val(defaultDNA.decorationSidescolor)

  animationVariation(defaultDNA.animation)
  parseInt( $('#animations').val(defaultDNA.animation) )

  specialName(defaultDNA.lastNum)
  parseInt( $('#special').val(defaultDNA.lastNum) )
  
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
  $('#specialGroup').hide();
})


$('#btnAttributesTab').click(()=>{
  $('#cattributes').removeClass('hidden');
  $('#headGroup').hide();
  $('#mouthGroup').hide();
  $('#eyesGroup').hide();
  $('#earsGroup').hide();
  $("#tailGroup").hide()

  $("#eyeShapeGroup").show();
  $("#patternGroup").show();
  $('#patternColorGroup').show();
  $("#animationGroup").show();
  $('#specialGroup').show();
})