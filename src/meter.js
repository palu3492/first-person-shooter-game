var Meter = pc.createScript('meter');

 
Meter.prototype.initialize = function(){
    this.meter = new FPSMeter(document.body, {
        graph: 1,
        heat: 1
    });
};
 
 
Meter.prototype.update = function(dt){
     this.meter.tick();
};