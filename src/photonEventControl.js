var PhotonEventControl = pc.createScript('photonEventControl');

var PhotonController;

// initialize code called once per entity
PhotonEventControl.prototype.initialize = function() {
    PhotonController = this.app.root.findByName('PhotonController');
    this.enemys = this.app.root.findByName('enemys');
};

// update code called every frame
PhotonEventControl.prototype.update = function(dt) {
    var childern = this.enemys.children;
    PhotonController.photon.onEvent = function(code, content, actorNr){

        
        if(childern.length > 0){

                if(code == 1) {
                    //Deserialize
                    var data = content.split(';');
                    var posData = new pc.Vec3(data[0], data[1], data[2]);
                    for(var i = 0; i < childern.length; i++){
                        var child = childern[i];
                        if(child.name == actorNr){
                            child.setPosition(posData);
                            break;
                        }
                    }
                }

                if(code == 2) {
                    //Deserialize
                    var enemyData = content.split(';');
                    var enemyBodyRotation = new pc.Vec3(0, enemyData[0], 0);
                    var enemyHeadRotation = new pc.Vec3(0, 0, enemyData[1]);
                    for(var i = 0; i < childern.length; i++){
                        var enemyChild = childern[i];
                        if(enemyChild.name == actorNr){
                            enemyChild.setLocalEulerAngles(enemyBodyRotation);
                            enemyChild.findByName("EnemyHead").setLocalEulerAngles(enemyHeadRotation);
                            break;
                        }
                    }
                }       

        }
    
    
        // if(code == 4) {
        //     this.player = this.app.root.findByName('players').children[0];
        //     if(this.player.name === content){
        //         this.player.scripts.player.deductHealth();
        //     }
        // }
    };
    
};

// swap method called for script hot-reloading
// inherit your script state here
// PhotonEventControl.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/