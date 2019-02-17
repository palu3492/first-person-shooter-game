var App = pc.createScript('app');
// App.attributes.add("PHOTON CLOUD",{type:"title"});
App.attributes.add("appid",{type:"string",default:"",title:"AppId",description:"Please input your AppId"});
App.attributes.add("appversion",{type:"string",default:"1.0",title:"Appversion",description:"Application version. You can not be matching if you set diferense version."});
App.attributes.add("Region",{
    type: 'string',
    default: 'default',
    description: 'Photon Cloud has servers in several regions, distributed across multiple hosting centers over the world.You can choose optimized region for you.',
    enum: [
        { "Select Region" : 'default'},
        { "Asia, Singapore" : 'asia'},
        { "Australia, Melbourne": 'au'},
        { "Chinese Mainland (See Instructions)	Shanghai":'cn'},
        { "Canada, East Montreal": 'cae'},
        { "Europe, Amsterdam":'eu'},
        { "India, Chennai": 'in'},
        { "Japan, Tokyo": 'jp'},
        { "South America, Sao Paulo":'sa'},
        { "South Korea, Seoul":'kr'},
        { "USA, East Washington":'us'},
        { "USA, West San José":'usw'}
    ]
});
// App.attributes.add("PHOTON SERVER",{type:"title"});
App.attributes.add("Masterserver",{type:"string",title:"Server Address",description:"use Photon Server if you input server address."});
// App.attributes.add("GENERAL",{type:"title"});
App.attributes.add("ConnectOnStart",{type:"boolean",default:true,title:"Auto-Join Lobby",description:"Define if PhotonNetwork should join the 'lobby' when connected to the Master server"});

var DemoWss;
var DemoMasterServer;
var connectRegion;
var ConnectOnStart;

// initialize code called once per entity
App.prototype.initialize = function() {
    //////////////////////////////////////////////////
    //Photon Cloud
    //////////////////////////////////////////////////
    if(this.appid){
        if(document.domain == "playcanvas.com"){
            localStorage.setItem("appid",this.appid);
        }        
        DemoAppId = this.appid;
    }else
    {
        if(localStorage.getItem("appid")){
            DemoAppId = localStorage.getItem("appid");
        }        
    }
    DemoAppVersion = this.appversion;
    connectRegion = this.Region;
    
    //////////////////////////////////////////////////
    //Photon Server
    //////////////////////////////////////////////////
    if(this.Masterserver){
        DemoMasterServer = this.Masterserver;
        DemoAppId = "using photon server";
    }
    
    //////////////////////////////////////////////////
    //General
    //////////////////////////////////////////////////
    ConnectOnStart = this.ConnectOnStart;
    
    //////////////////////////////////////////////////
    //load and seting UI 
    //////////////////////////////////////////////////
    //html load and initialize
    var htmlAsset = this.app.assets.find('index.html');
    var div = document.createElement('div');
    div.innerHTML = htmlAsset.resource;
    document.body.appendChild(div);

    htmlAsset.on('load', function () {
        div.innerHTML = htmlAsset.resource;
    });
    
    // css load and initialize
    cssAsset = this.app.assets.find('style.css');
    stylecss = document.createElement('style');
    stylecss.innerHTML = cssAsset.resource;
    document.head.appendChild(stylecss);
        
    cssAsset.on('load', function() {
        style.innerHTML = cssAsset.resource;
    });
    
    //////////////////////////////////////////////////
    //Photon start
    //////////////////////////////////////////////////
    this.entity.photon = new DemoLoadBalancing();
    this.entity.photon.start();
};