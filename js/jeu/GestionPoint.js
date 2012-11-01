/* Timer class */
function GestionPoint() {
    this.points = 5000;
    
};

GestionPoint.prototype.constructor = GestionPoint;
GestionPoint.prototype.onTimerEvent = function(pointToRemove){
    this.points -= pointToRemove;
};
GestionPoint.prototype.onHitEvent = function(pointToRemove){

};
