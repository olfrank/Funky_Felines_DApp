$(document).ready(function(){
    create()
    create2()
    create3()
    title()
});


function create(){
    var image = `<div class = "cat" id = "newCat">
                    <div class = "ears">
                        <div id = "leftEar" class= "ear left-ear">
                            <div class = " left-inner-ear"></div>
                        </div>
                        <div id = "rightEar" class = "ear right-ear">
                            <div class = "right-inner-ear"></div>
                        </div>
                    </div>

                    <div id = "catTail" class = "tail movingTail">
                        <div class = "inner-tail"></div>
                    </div>

                    <div id = "catBody" class = "body body1" ></div>
                    <div id = "catBelly" class = "belly"></div>
                    <div id = "catHead" class = "head head1">
                        <!-- <div class= "head-pattern"></div> -->
                                        <div id="midShape" class="head-shapes">
                                            <div id="leftShape" class="left_head-shape"></div>
                                            <div id="rightShape" class="right_head-shape"></div>
                                        </div>

                        <div id = "catEyes" class = "eyes eyes-color">
                             <div class = "eye-left grey">
                                 <span id = "leftPupil" class = "lightBlue pupils pupil-left chilled ">
                                     <div class = "inner-eyes-big-left grey"></div>
                                     <div class = "inner-eyes-small-left grey"></div>
                                 </span>
                             </div>

                             <div class = "eye-right grey">
                                 <span id = "rightPupil" class = "lightBlue pupils pupil-right chilled ">
                                     <div class = "inner-eyes-big-right grey"></div>
                                     <div class = "inner-eyes-small-right grey"></div>
                                 </span>
                             </div>    
                        </div>


                        <div class = "mouth"></div>
                        <div class = "whiskers">
                            <div id = "rightWhiskers" class = "whiskers-right">
                                <div class = "whisker1"></div>
                                <div class = "whisker2"></div>
                                <div class = "whisker3"></div>
                            </div>
                            <div id = "leftWhiskers" class = "whiskers-left">
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


                    <div id = "bothFeet" class = "feet">
                        <div class = "foot-left feet1"></div>
                        <div class = "foot-right feet1"></div>
                    </div>
                </div>`

    $("#catImage").html(image)
}

function create2(){
    var image = `<div class = "cat" id = "newCat">
                    <div class = "ears">
                        <div id = "leftEar" class= "ear left-ear2 movingLeftEar">
                            <div class = " left-inner-ear inner2"></div>
                        </div>
                        <div id = "rightEar" class = "ear right-ear2 movingRightEar">
                            <div class = "right-inner-ear inner2"></div>
                        </div>
                    </div>

                    <div id = "catTail" class = "tail tail2">
                        <div class = "inner-tail"></div>
                    </div>

                    <div id = "catBody" class = " body2"></div>
                    <div id = "catBelly" class = "belly belly2"></div>
                    <div id = "catHead" class = "head head2">
                        <!-- <div class= "head-pattern"></div> -->
                                        <div id="midShape" class="head-shapes">
                                            <div id="leftShape" class="left_head-shape"></div>
                                            <div id="rightShape" class="right_head-shape"></div>
                                        </div>

                        <div id = "catEyes" class = "eyes">
                            <div class = "eye-left">
                                <span id = "leftPupil" class = "pupil-left sleepy">
                                    <div class = "inner-eyes-big-left sleepytransp"></div>
                                    <div class = "inner-eyes-small-left sleepytransp"></div>
                                </span>
                            </div>

                            <div class = "eye-right">
                                <span id = "rightPupil" class = "pupil-right sleepy">
                                    <div class = "inner-eyes-big-right sleepytransp"></div>
                                    <div class = "inner-eyes-small-right sleepytransp"></div>
                                </span>
                            </div>    
                        </div>


                        <div class = "mouth mouth2"></div>
                        <div class = "whiskers">
                            <div id = "rightWhiskers" class = "whiskers-right movingWhiskersRight">
                                <div class = "whisker1"></div>
                                <div class = "whisker2"></div>
                                <div class = "whisker3"></div>
                            </div>
                            <div id = "leftWhiskers" class = "whiskers-left movingWhiskersLeft">
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


                    <div id = "bothFeet" class = "feet">
                        <div class = "foot-left feet2"></div>
                        <div class = "foot-right feet2"></div>
                    </div>
                </div>`

    $("#catImage2").html(image)

}

function create3(){
    var head = `<div class = "cat1" id = "newCat">
                    <div class = "ears1">
                        <div id = "leftEar" class= "ear left-ear3 movingLeftEar">
                            <div class = " left-inner-ear"></div>
                        </div>
                        <div id = "rightEar" class = "ear right-ear3 movingRightEar">
                            <div class = "right-inner-ear"></div>
                        </div>
                    </div>
                    <div id = "catHead" class = "head head3">
                        <!-- <div class= "head-pattern"></div> -->
                                        <div id="midShape" class="head-shapes">
                                            <div id="leftShape" class="left_head-shape"></div>
                                            <div id="rightShape" class="right_head-shape"></div>
                                        </div>

                        <div id = "catEyes" class = "eyes">
                            <div class = "eye-left">
                                <span id = "leftPupil" class = "pupil-left eyesChangeColor">
                                    <div class = "inner-eyes-big-left"></div>
                                    <div class = "inner-eyes-small-left"></div>
                                </span>
                            </div>

                            <div class = "eye-right">
                                <span id = "rightPupil" class = "pupil-right eyesChangeColor">
                                    <div class = "inner-eyes-big-right"></div>
                                    <div class = "inner-eyes-small-right"></div>
                                </span>
                            </div>    
                        </div>


                        <div class = "mouth"></div>
                        <div class = "whiskers">
                            <div id = "rightWhiskers" class = "whiskers-right movingWhiskersRight">
                                <div class = "whisker1"></div>
                                <div class = "whisker2"></div>
                                <div class = "whisker3"></div>
                            </div>
                            <div id = "leftWhiskers" class = "whiskers-left ">
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
                </div>`

    $("#catImage3").html(head);
    
}

function title(){
    var theTitle = `<div class="patterns">
                        <svg width="100%" height="100%">
                        <defs> 
                        <style>
                        @import url("https://fonts.googleapis.com/css?  family=Lora:400,400i,700,700i");
                        </style>
                        </defs>
                
                        <rect x="0" y="0" width="100%" height="100%" fill="url(#polka-dots)"> </rect>
                        <text x="50%" y="60%"  text-anchor="middle"  >
                            WELCOME TO FUNKY FELINES
                        </text>
                        </svg>
                    </div>`
    $("#title").html(theTitle);
}