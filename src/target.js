var Target = pc.createScript('target');

// initialize code called once per entity
Target.prototype.initialize = function() {
    this.health = 100;
    this.enemyHealth = this.entity.findByName("enemyHealth");
    this.enemyHealthScale = this.enemyHealth.getLocalScale();
    this.enemyHealthScaleDeduct = this.enemyHealthScale.z * 0.25;
};

// update code called every frame
Target.prototype.update = function(dt) {

};

Target.prototype.deductHealth = function() {
    this.health -= 25;
    
    this.enemyHealthScale.z = this.enemyHealthScale.z - this.enemyHealthScaleDeduct;
    this.enemyHealth.setLocalScale(this.enemyHealthScale);

    if(this.health <= 0){
        this.entity.destroy();
        
    }
};