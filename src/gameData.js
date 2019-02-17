var GameData = pc.createScript('gameData');
GameData.attributes.add('ammoStart', {type: 'number', default:50});


// initialize code called once per entity
GameData.prototype.initialize = function() {
    this.ammo = this.ammoStart;
    this.health = 256;
    this.entity.element.text = this.ammo.toString();
};

// update code called every frame
GameData.prototype.update = function(dt) {
    if(this.health>0){
        this.health -= 0.5;
        this.entity.element.width = this.health.toString();
    }    
};

GameData.prototype.deductAmmo = function() {
    if(this.ammo > 0){
        --this.ammo;
        this.entity.element.text = this.ammo.toString();
    }
};