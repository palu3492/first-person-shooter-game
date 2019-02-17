var Bullet = pc.createScript('bullet');

// initialize code called once per entity
Bullet.prototype.initialize = function() {
    this.pickedEntity = this.app.systems.rigidbody.raycastFirst(this.app.root.findByName('BulletPosition').getPosition(), this.app.root.findByName('Check').getPosition());
    // this.lowestDistance = 200;
    console.log(this.pickedEntity);
    // this.entity.collision.on('collisionstart', this.onCollisionEnd, this);
    // 
    // if(this.pickedEntity !== null){
    //     var enemyPool = this.app.root.findByName("enemys");
    //     if(this.pickedEntity.entity.isDescendantOf(enemyPool)){
    //         this.pickedEntity.entity.script.enemy.deductHealth();
    //     }
    // }
};

// Bullet.prototype.onCollisionEnd = function(result) {
//     var name = result.other.name;
//     if(name != "Player") {
//         if(name == "Target") {
//             console.log("hit");
//             // result.destroy();
//         }
//         this.entity.destroy();
//     }
// };

// update code called every frame
Bullet.prototype.update = function(dt) {
    // if(this.pickedEntity !== null){
    // var enemyPool = this.app.root.findByName("enemys");
    // if(this.pickedEntity.entity.isDescendantOf(enemyPool)){
    //     this.pickedEntity.entity.script.enemy.deductHealth();
    //     // this.notifyPlayer();
    // }
    // var distance = this.entity.getPosition().clone();
    // distance.sub(this.pickedEntity.entity.getPosition());
    // if(distance.length()<1){
    //     this.entity.destroy();
    //     if(this.pickedEntity.entity.name == "Target"){
    //         // check for undefined because target may already have been destroyed
    //         if(typeof this.pickedEntity.entity.script !== "undefined") {
    //             this.pickedEntity.entity.script.target.deductHealth();
    //         }
    //     }
    // }else{
    //     if(distance.length() < this.lowestDistance){
    //         this.lowestDistance = distance.length();
    //     }else{
    //         this.entity.destroy();
    //         if(this.pickedEntity.entity.name == "Target"){
    //             // check for undefined because target may already have been destroyed
    //             if(typeof this.pickedEntity.entity.script !== "undefined") {
    //                 this.pickedEntity.entity.script.target.deductHealth();
    //             }
    //         }
    //     }
    // }
    // }
    // this.entity.destroy();
    // this.deleteBullet();
};

Bullet.prototype.deleteBullet = function(){
    var player = this.app.root.findByName("Player");
    var distance = this.entity.getPosition().clone();
    distance.sub(player.getPosition());
    if(distance.length() > 100){
        this.entity.destroy();
    }
};

Bullet.prototype.notifyPlayer = function(){
    PhotonController.photon.raiseEvent(4, this.pickedEntity.entity.name);
};