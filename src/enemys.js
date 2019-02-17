var Enemys = pc.createScript('enemys');

var PhotonController;

// initialize code called once per entity
Enemys.prototype.initialize = function() {
    PhotonController = this.app.root.findByName('PhotonController');
};

// update code called every frame
Enemys.prototype.update = function(dt) {
    // If there is at least one enemy in the game
    
//     var childern = this.entity.children;
//     if(childern.length > 0){
//         // for(var i = 0; i < childern.length; i++){
//         //     var child = childern[i];
//         //     var healthBar = child.findByName('enemyHealthBar');
//         //     var playerY = this.app.root.findByName('Player').getEulerAngles();
//         //     console.log(playerY);
//         //     healthBar.setEulerAngles(playerY);
//         // }
//         // if(PhotonController.photon){
//         //     PhotonController.photon.requestLobbyStats();
//         // }
//         PhotonController.photon.onEvent = function(code, content, actorNr){
//             if(code == 1) {
//                 //Deserialize
//                 var data = content.split(';');
//                 var posData = new pc.Vec3(data[0], data[1], data[2]);
//                 for(var i = 0; i < childern.length; i++){
//                     var child = childern[i];
//                     if(child.name == actorNr){
//                         child.setPosition(posData);
//                         break;
//                     }
//                 }
//             }
            
//             if(code == 2) {
//                 //Deserialize
//                 var enemyData = content.split(';');
//                 var enemyBodyRotation = new pc.Vec3(0, enemyData[0], 0);
//                 var enemyHeadRotation = new pc.Vec3(0, 0, enemyData[1]);
//                 for(var i = 0; i < childern.length; i++){
//                     var enemyChild = childern[i];
//                     if(enemyChild.name == actorNr){
//                         enemyChild.setLocalEulerAngles(enemyBodyRotation);
//                         enemyChild.findByName("EnemyHead").setLocalEulerAngles(enemyHeadRotation);
//                         break;
//                     }
//                 }
//             }
            
            // if(code == 3) {
            //     //Deserialize
            //     // var enemyData = content.split(';');
            //     for(var i = 0; i < childern.length; i++){
            //         var child = childern[i];
            //         if(child.name == actorNr){
            //             var healthBar = child.findByName('enemyHealthBar');
            //             var scale = healthBar.getLocalScale();
            //             scale.z -= 0.25;
            //             healthBar.setLocalScale(scale);
            //             break;
            //         }
            //     }
            // }

        };
        
        
    }
};

// swap method called for script hot-reloading
// inherit your script state here
// Enemy.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/