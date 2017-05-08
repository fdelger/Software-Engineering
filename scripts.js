var test2;
var index = 0;
var myLayer;

function drawToolbar(map) {
            var drawnItems = new L.geoJSON().addTo(map);
            var geoJSON;
            myLayer = L.geoJSON();
            //map.addLayer(drawnItems);
            
            var drawControl = new L.Control.Draw({
                                                 position: 'topleft',
                                                 draw: {
                                                 polyline: true,
                                                 polygon: true,
                                                 circle: true,
                                                 marker: true
                                                 },
                                                 edit: {
                                                 featureGroup: drawnItems,
                                                 remove: true
                                                 }
                                                 });
            map.addControl(drawControl);
            //console.log(drawnItems);

            map.on(L.Draw.Event.CREATED, function (e) {
                   var type = e.layerType,
                   layer = e.layer;
                   
                   
            if (type === 'marker' || 'polyline' || 'circle' || 'polygon' || 'rectangle') {
                var mystring = prompt("type");
                layer.bindPopup(mystring);
                //layer.prope.name = mystring;
                //console.log(layer);
                //console.log(layer._popup._content);
                console.log(layer);
               
            
                   }

                    drawnItems.addLayer(layer);
                    test2 = layer.toGeoJSON();
                    test2.properties._popup = mystring;
                    myLayer.addData(test2);
                    console.log(myLayer);
                    //console.log(test2);
                   
               
                 });

            map.on(L.Draw.Event.EDITED, function (e) {
            var layers = e.layers;
            var countOfEditedLayers = 0;

            layers.eachLayer(function (layer) {
              countOfEditedLayers++;
              var edit = prompt("type edit"); 
              layer.bindPopup(edit);
              test2 = layer.toGeoJSON();
              test2.properties._popup = edit;
              myLayer.addData(test2);
            });
            console.log("Edited " + countOfEditedLayers + " layers");
            });
                     
                 map.on('draw:created', function(e){
                drawnItems.addLayer(e.layer);
                //L.geoJSON(layer).addTo(map);
                //console.log(drawnItems._layers);
            });




            document.getElementById('export').onclick=function(e){

                var data=myLayer.toGeoJSON();
              
var convertedData= 'text/json; charset=utf-8,' + encodeURIComponent(JSON.stringify(data))
               
                sessionStorage.setItem("example", JSON.stringify(data));
                var savedJSON = sessionStorage.getItem("example"); 
                if(typeof(Storage) !== "undefined") {
            if (sessionStorage.clickcount) {
                sessionStorage.clickcount = Number(sessionStorage.clickcount)+1;
            } else {
                sessionStorage.clickcount = 1;
            }
            document.getElementById("result").innerHTML = "This Json is inside storage " + sessionStorage.getItem("example");
        } else {
            document.getElementById("result").innerHTML = "Sorry, your browser does not support web storage...";
        }
              
                } }
            
          /*  map.on(L.Draw.Event.CREATED, function (e) {
                   var type = e.layerType,
                   layer = e.layer;
                   
            if (type === 'marker' || 'polyline' || 'circle' || 'polygon' || 'rectangle') {
          var mystring = prompt("type");
            layer.bindPopup(mystring);
                   }
                 })
                   */
                /*   drawnItems.addLayer(layer);
                   geoJSON=layer.toGeoJSON();

                  // var abc = {};
                   var savedJSON = sessionStorage.getItem("example"); 
//jQuery.parseJSON(sessionStorage.getItem("example"));       
                   //$(savedJSON).append(JSON.stringify(geoJSON));
                   console.log(savedJSON);
                  // console.log(jQuery.parseJSON(sessionStorage.getItem("example")));
                   sessionStorage.setItem("example", JSON.stringify(savedJSON));
                   });
            
            map.on(L.Draw.Event.EDITED, function (e) {
                   var layers = e.layers;
                   var countOfEditedLayers = 0;
                   layers.eachLayer(function (layer) {
                                    countOfEditedLayers++;
                                    });
                   console.log("Edited " + countOfEditedLayers + " layers");
                   });
            
            L.DomUtil.get('changeColor').onclick = function () {
                drawControl.setDrawingOptions({rectangle: {shapeOptions: {color: '#004a80'}}});
          //  geoJSON=drawnItems.toGeoJSON();
         //   document.getElementById("result").innerHTML = JSON.stringify(geoJSON);
          
            
            sessionStorage.getItem("example");
            // var view = jQuery.parseJSON(temp);
            //document.getElementById("show").innerHTML = "Geojson ready";
        
            // L.geoJSON(view).addTo(map);
            }
            //return drawnItems;
        }*/

        function eraseMode() {

        }
        
        function addAnnotationFunction() {

        }
        
        function flagCompletedReopenedFunction() {

        }


    function loadMap() {
        this.zoomLevel = localStorage.getItem("zoomLevel");
        console.log("Zoom Level: " + this.zoomLevel);
        var mapMinZoom = zoomLevel;
        var mapMaxZoom = zoomLevel;
        var map = L.map('map',
                        { maxZoom: mapMaxZoom,
                        zoomControl: false,
                        scrollWheelZoom: false,
                        doubleClickZoom: false,
                        boxZoom: false }
                        ).setView([9.7859154,-75.8591129], zoomLevel);
        
        L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
                    {
                    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>',
                    minZoom: mapMinZoom,
                    maxZoom: mapMaxZoom,
                    }).addTo(map);
        
       /* L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpeg', {
                    attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                    maxZoom: 20,
                    subdomains: '1234'
                    }).addTo(map);*/
        
        var mapBounds = new L.LatLngBounds(
                                           [9.78506013696, -75.8602224688],
                                           [9.7867981298, -75.8579734364]);
        
        map.fitBounds(mapBounds);
        L.tileLayer('http://ec2-52-40-238-32.us-west-2.compute.amazonaws.com/tiles/santacruz/{z}/{x}/{y}.png', {
                    minZoom: mapMinZoom,
                    maxZoom: mapMaxZoom,
                    //bounds: mapBounds,
                    tms: true,
                    attribution: 'Rendered with <a href="">CCS Map Tiler</a>',
                    noWrap: true
                    }).addTo(map);
        
        return map;
        
        
    }

function APIRequest(){
    
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://ec2-52-40-238-32.us-west-2.compute.amazonaws.com/api/gettiles/d132402a-0eaf-4ee5-abf0-6130c04d4539/18", true);
    xhr.send();
    
    console.log(xhr.status);
    console.log(xhr.statusText);
}

function loginFunction() {
    var userNameValue = document.getElementById("login-form").value;
    goToProjectSelect(userNameValue);
}

function goToProjectSelect(userName) {
    window.location.href = 'projectSelection.html';
}

function getStartedFunction() {
    var radios = document.getElementsByName('select-form');
    var projectName;

    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            projectName = radios[i].value;
            alert(radios[i].value);
            break;
        }
    }
    var levelValue = document.getElementById("level-form").value;
    goToMain(projectName, levelValue);
}

function goToMain(projectName, level) {
    this.zoomLevel = level;
    localStorage.setItem("zoomLevel", this.zoomLevel);
    window.location.href = 'leaflet2.html';
}