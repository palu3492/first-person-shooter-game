var Manager = pc.createScript('manager');
Manager.attributes.add('player',{type:'entity'});
Manager.attributes.add('enemy',{type:'entity'});

var PhotonController;
var root;
var manager;
var enemyPool;
var playerPool;
var obj;
var playerObject;

// initialize code called once per entity
Manager.prototype.initialize = function() {
    PhotonController = this.app.root.findByName('PhotonController');
    enemyPool = this.app.root.findByName('enemys');
    playerPool = this.app.root.findByName('players');
    root = this.app.root;
    manager = this;
    gamecss = this.app.assets.find('game.css');
};

// update code called every frame
Manager.prototype.update = function(dt) {
    // When a player joins
    PhotonController.photon.onActorJoin = function(actor){
        // If that player is myself
        if(actor.actorNr == this.myActor().actorNr) {
            // clone player object
            playerObject = manager.player.clone();
            playerObject.setName(actor.actorNr);
            playerPool.addChild(playerObject);
            playerObject.enabled = true;
            
            stylecss.innerHTML = gamecss.resource;
            
            // Check for others in room and then add anyone to games
            Manager.prototype.addEnemiesToGame(this.myActor());
        }else {
            // If player that joined is another person then clone enemy
            var enemyObject = manager.enemy.clone();
            // Set player name, add it to enemys entity, put it in spawn position and enable it.
            enemyObject.setName(actor.actorNr);
            enemyPool.addChild(enemyObject); // add to enemys entity
            enemyObject.enabled = true;
        }
    };
    
    // When a player join my room
    // PhotonController.photon.onJoinRoom = function(){
    //     console.log(this.myRoomActors());
    //     for(var i = 1;i<this.myActor().actorNr;i++){
    //         if(this.myRoomActors()[i]){
    //             if(!this.myRoomActors()[i].isLocal){
    //                 var eneobj = manager.enemytemplate.clone();
    //                 var enemat = new pc.PhongMaterial();
    //                 enemat = manager.markertemplate.resource.clone();
    //                 enemat.diffuse.set(getColor(i).r,getColor(i).g,getColor(i).b);
    //                 enemat.update();
    //                 eneobj._children[1].model.meshInstances[0].material = enemat;
    //                 var eneminimapmat = new pc.PhongMaterial();
    //                 eneminimapmat = manager.minimaptemplate.resource.clone();
    //                 eneminimapmat.diffuse.set(getColor(i).r,getColor(i).g,getColor(i).b);
    //                 eneminimapmat.update();
    //                 eneobj._children[2].model.meshInstances[0].material = eneminimapmat;
    //                 eneobj._children[3].model.meshInstances[0].material = getColorMaterial(i);
    //                 eneobj.setName(i);
    //                 eneobj.setLocalEulerAngles(this.myRoomActors()[i].getCustomProperty("rot"));
    //               eneobj.setLocalPosition(this.myRoomActors()[i].getCustomProperty("pos"));
    //              eneobj.setLocalPosition(0,0,0);
    //              enemypool.addChild(eneobj);
    //              eneobj.enabled = true;
    //             }
    //         }
    //     }
    // };
    
    PhotonController.photon.onActorLeave = function(actor,cleanup){
        var ene;
        // If the actor the player themself
        if(actor.actorNr == this.myActor().actorNr) {
            obj.destroy();
            
            stylecss.innerHTML = cssAsset.resource;
            // turncamera.enabled = true;
            // minimapcamera.enabled = false;
        } else {
            ene = root.findByName(actor.actorNr);
            if(ene){
                ene.destroy();
            }
        }
       
    };
};

Manager.prototype.addEnemiesToGame = function(myActor) {
    //Get list of people in lobby
    // Add enemy with that name
    var playersInRoom = PhotonController.photon.myRoomActors();
    var keys = Object.keys(playersInRoom);
    for(var i=0; i<keys.length; i++){
        var key = keys[i];
        var player = playersInRoom[key];
        if(player.actorNr != myActor.actorNr){
            var enemyObject = manager.enemy.clone();
            // Set player name, add it to enemys entity, put it in spawn position and enable it.
            enemyObject.setName(player.actorNr);
            enemyPool.addChild(enemyObject); // add to enemys entity
            enemyObject.enabled = true;
        }
    }
};

Manager.prototype.createEnemy = function(actor) {
    var enemyObject = manager.enemy.clone();
    enemyObject.setName(actor.actorNr);
    enemyPool.addChild(enemyObject); // add to enemys entity
    enemyObject.enabled = true;
};