var Player = pc.createScript('player');

// initialize code called once per entity
Player.prototype.initialize = function() {
    this.healthBar = this.entity.findByName('healthBar');
    this.healthLevel = 100;
};

// update code called every frame
Player.prototype.update = function(dt) {
    
    
    // PhotonController.photon.onEvent = function(code, content, actorNr){
    //     if(code == 4) {
    //         console.log('here');
    //         if(this.name === content){
    //             this.deductHealth();
    //         }
    //     }
    // };
    
    
};

Player.prototype.deductHealth = function() {
    this.healthBar.element.width = this.healthLevel;
};

// swap method called for script hot-reloading
// inherit your script state here
// Player.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/