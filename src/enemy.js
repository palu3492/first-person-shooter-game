var Enemy = pc.createScript('enemy');


// initialize code called once per entity
Enemy.prototype.initialize = function() {
    this.healthBar = this.entity.findByName('enemyHealthBar');
    this.healthLevel = 100;
    this.healthDeductAmount = 25;
};

// update code called every frame
Enemy.prototype.update = function(dt) {
    console.log(this.entity.getPosition());
};

Enemy.prototype.deductHealth = function() {
    console.log('bullet');
    this.healthLevel -= this.healthtDeductAmount;
    var scale = this.healthBar.getLocalScale();
    scale.z -= this.healthDeductAmount*0.01;
    this.healthBar.setLocalScale(scale);
};

Enemy.prototype.killMe = function() {
    
};
