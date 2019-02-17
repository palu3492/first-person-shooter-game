var PlayerCameraMovement = pc.createScript('playerCameraMovement');

// Define script-scoped variables.
var deltaTime = 0;
var prev = 0;

// Add attributes to the script.
PlayerCameraMovement.attributes.add('verticleMouseSensitivity', {
    type: 'number',
    default: 1.33
});

PlayerCameraMovement.attributes.add('horizontalMouseSensitivity', {
    type: 'number',
    default: 1.33
});


//for serialize
var old_serial_string = "";

// initialize code called once per entity
PlayerCameraMovement.prototype.initialize = function() {
    this.eulers = new pc.Vec3();
    var app = this.app;
    
    app.mouse.on('mousemove', this.onMouseMove, this);
    app.mouse.on('mousedown', function() {
        app.mouse.enablePointerLock();
    }, this);
};

// update code called every frame
PlayerCameraMovement.prototype.update = function(dt) {
    // Update the script-scoped variable deltaTime with the delta time passed into the update function. This is used for the camera angle calculations.
    deltaTime = dt;
};

// Update camera angle from mouse events.
PlayerCameraMovement.prototype.onMouseMove = function(e) {
    if (pc.Mouse.isPointerLocked()) {
        this.eulers.x -= (this.horizontalMouseSensitivity * e.dx * deltaTime) % 360;
        // this.eulers.y += (this.mouseSensitivity * e.dy * deltaTime) % 360;
        this.eulers.y = this.verticleMouseSensitivity*e.dy*0.5;

        if (this.eulers.x < 0) this.eulers.x += 360;
        // if (this.eulers.y < 0) this.eulers.y += 360;
        this.rotatePlayer();
        this.rotateHead();
        
        
        var playerAngle = this.entity.getLocalEulerAngles();
        var headAngle = this.entity.findByName("Head").getLocalEulerAngles();
        var serial_string = playerAngle.y + ";" + headAngle.z;
        if(old_serial_string != serial_string) {
            PhotonController.photon.raiseEvent(2, serial_string);
            old_serial_string = serial_string;
        }
    }
};

// Rotate the player to face the same direction as the camera angle.
PlayerCameraMovement.prototype.rotatePlayer = function() {
    var newX = this.eulers.x;
    var newAngle = new pc.Vec3(0, newX, 0);
    this.entity.setEulerAngles(newAngle);
    this.entity.rigidbody.syncEntityToBody();
};

PlayerCameraMovement.prototype.rotateHead = function() {
    var head = this.entity.findByName("Head");
    var newY = this.eulers.y*0.02;
    if((head.getLocalRotation().z > -0.72 && newY >= 0) || (head.getLocalRotation().z < 0.72 & newY <= 0)) {
        head.rotateLocal(0, 0, newY);
    }
    // console.log(head.getLocalRotation());
    head.rigidbody.syncEntityToBody();
};