// Create PlayerMovement script.
var PlayerMovement = pc.createScript('playerMovement');

// Add attributes to the script.
PlayerMovement.attributes.add('movementSpeed', {
    type: 'number',
    default: 0.025
});

PlayerMovement.attributes.add('runningMultiplier', {
    type: 'number',
    default: 2.0
});

PlayerMovement.attributes.add('jumpPower', {
    type: 'number',
    default: 200.0
});

PlayerMovement.attributes.add('raycastPlayerBase', {
    type: 'entity'
});

var PhotonController;

//for serialize
var old_serial_string = "";

// Initialisation code, runs only once.
PlayerMovement.prototype.initialize = function() {
    PhotonController = this.app.root.findByName('PhotonController');
    this.eulers = new pc.Vec3();
    this.force = new pc.Vec3();
    this.player = this.play;
    this.jumping = {
        state: false
    };
    this.running = {
        state: false
    };
};

// Update code, runs every frame.
PlayerMovement.prototype.update = function(dt) {
    // Get application reference.
    var app = this.app;
    
    // Get players force vector.
    var force = this.force;
    
    // Get player direction
    var forward = this.entity.forward;
    var right = this.entity.right;
    
    // Movement logic. Listen for key presses and apply changes to directional vector components.
    var x = 0;
    var z = 0;
    // Forward
    if (app.keyboard.isPressed(pc.KEY_W)) {
        x -= right.x;
        z -= right.z;
    }
    // Right
    if (app.keyboard.isPressed(pc.KEY_A)) {
        x -= forward.x;
        z -= forward.z;
    }
    // Backward
    if (app.keyboard.isPressed(pc.KEY_S)) {
        x += right.x;
        z += right.z;
    }
    // Right
    if (app.keyboard.isPressed(pc.KEY_D)) {
        x += forward.x;
        z += forward.z;
    }
    
    // Sprint
    if (app.keyboard.isPressed(pc.KEY_SHIFT)) {
        this.running.state = true;
    } else {
        this.running.state = false;
    }
    // Jump
    // if (app.keyboard.isPressed(pc.KEY_SPACE)) {
    //     if (this.checkBelow() !== null) {
    //         this.entity.rigidbody.applyImpulse(0, this.jumpPower, 0);
    //     }
    // }
    
    
    // Convert x and z directional vector components to a force vector, normalise and then scale to the movement speed.
    if (x !== 0 || z !== 0) {
        
        x *= dt;
        z *= dt;
        
        if (this.running.state) {
            force.set(x, 0, z).normalize().scale(this.movementSpeed * this.runningMultiplier);
        } else {
            force.set(x, 0, z).normalize().scale(this.movementSpeed);
        }
        
        this.entity.translate(force);
        this.entity.rigidbody.applyForce(force);
        this.entity.rigidbody.syncEntityToBody();
    }
    
    // Send player direction and position to Photon (all other)
    var player_position = this.entity.getLocalPosition();    
    var serial_string = player_position.x + ";" + player_position.y + ";" + player_position.z;
    if(old_serial_string != serial_string) {
        PhotonController.photon.raiseEvent(1, serial_string);
        old_serial_string = serial_string;
    }
};

// Raycast for checking if there is an entity below with collision and rigid body components. Returns null if no collision.
PlayerMovement.prototype.checkBelow = function() {
    console.log(this.app.systems.rigidbody.raycastFirst(this.entity.getPosition(), this.raycastPlayerBase.getPosition()));
    return this.app.systems.rigidbody.raycastFirst(this.entity.getPosition(), this.raycastPlayerBase.getPosition());
};