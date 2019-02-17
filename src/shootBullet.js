var ShootBullet = pc.createScript('shootBullet');
ShootBullet.attributes.add('power', { type: 'number', default:100});
ShootBullet.attributes.add('bullet', { type: 'entity' });
var allowShoot = true;


// initialize code called once per entity
ShootBullet.prototype.initialize = function() {

};

// update code called every frame
ShootBullet.prototype.update = function(dt) {
    this.app.mouse.on(pc.EVENT_MOUSEDOWN, function(){
        if(allowShoot){
            this.shootBullet();
        }
    }, this);
    
    this.app.mouse.on(pc.EVENT_MOUSEUP, function(){
        allowShoot = true;
    }, this);
};

ShootBullet.prototype.shootBullet = function(){
    this.app.root.findByName('Ammo').script.gameData.deductAmmo();
    allowShoot = false;
    var bullet = this.bullet.clone();
    this.app.root.addChild(bullet);
    
    this.force = new pc.Vec3();
    var playerDirection =  this.app.root.findByName('Head').getWorldTransform().getX();
    this.force.copy(playerDirection);
    this.force.scale(-this.power);
    
    bullet.setPosition(this.app.root.findByName('BulletPosition').getPosition());
    
    bullet.enabled = true;
    
    bullet.rigidbody.applyImpulse(this.force);
};