$(document).ready(function(){
    menuHeader()
});

function menuHeader(){
       var menu = `<nav class="menu navbar navbar-light navbar-expand-md fixed-top bg-ligh p-4">
                    <div class="container">
                        <a class="navbar-brand" href="index.html"><u style="color: #2DA4A8;"><b style= "font-size: 40px; color:#CF2B52;">FUNKY</b></u></a><img class = "imageLogo" src="./image/catHEAD.png"/><a class="navbar-brand" href="index.html"><u style="color:#CF2B52 ;"><b style= "font-size: 40px; color:#2DA4A8;"> FELINES</b></u></a>
                        <button class="navbar-toggler collapsed" type="button" data-toggle="collapse"
                            data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false"
                            aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>

                        <div class="navbar-collapse collapse  justify-content-end" id="navbarsExampleDefault">

                            <div align="right">
                                <ul class="navbar-nav mr-auto">

                                    <li class="nav-item">
                                        <a class="nav-link" href="index.html"><b>HOME</b></a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="catalogue.html"><b>CATalogue</b></a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="marketplace.html"><b>MARKETPLACE</b></a>
                                    </li>

                                    <li class="nav-item">
                                        <a class="nav-link" href="breed.html"><b>THE BOUDOIR</b></a>
                                    </li> 

                                    <li class="nav-item">
                                        <button id = "build" class = "navBtnBuild" onclick="go_to('catFactory.html')">CREATE A CAT</button>
                                    </li>

                                </ul>

                            </div>

                        </div>
                     </div>
                    </nav>`  

    $("#menuBar").html(menu);
}        
//class="btn red-btn ml-5"




  function go_to(url) {
    window.location.href = url;
  }

  function alertMSG(content, type) {
    var str = '';
    str += '<div class="alert alert-' + type + ' fit-content mt-3" role="alert">' + content + '<button type="button" class="close ml-2" data-dismiss="alert" aria-label="Close"> <i class="far fa-times-circle"></i> </button></div>';    
    $('#message').html(str)    
  }

  function get_variables() {
    var $_GET = [];
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (a, name, value) {
      $_GET[name] = value;                
    });
    return $_GET;
  }


  function isEmpty(str) {
    return (!str || str.length === 0 );
}