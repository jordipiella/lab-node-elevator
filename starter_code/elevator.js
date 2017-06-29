class Elevator {
  constructor(){
    this.floor      =4;
    this.MAXFLOOR   = 10;
    this.requests   = [];
    this.direction = "up";
    this.waitingList = [];
    this.passengers = [];
  }

  start() {
    let updateInterval = setInterval(()=> this.update(), 1000);
    }
  stop() {
    clearInterval(updateInterval);
  }

  update() {

    this.log();
    for( let i; i < this.waitingList.length; i++ ){
      if(this.floor === this.waitingList[i].originFloor){
        this.passengers.push(this.waitingList[i]);
        this.waitingList.splice(i, 1);
        this.requests.push(this.waitingList[i].destinationFloor);
        this._passengersEnter(this.waitingList[i].name);
      }
    }

    for( let i; i < this.passengers.length; i++ ){
      if(this.floor === this.passengers[i].destinationFloor){
        this.passengers.splice(this.passengers[i], 1);
        this.requests.push(this.waitingList[i].destinationFloor);
        this._passengersEnter(this.waitingList[i].name);
      }
    }

  }
  _passengersEnter(passenger) {
    console.log(`${passenger} has enter the elvator.`);
  }

  _passengersLeave(passenger) {
    console.log(`${passenger} has left the elvator.`);


  }

  floorUp() {

    this.direction = "up";
    if(this.floor < this.MAXFLOOR) {
      this.floor += 1;
    }
    console.log(this.floor);

  }

  floorDown() {
    this.direction = "down";
    if(this.floor > 0) {
      this.floor -= 1;
    }
    console.log(this.floor);

  }

  call(person) {

    this.requests.push(person.originFloor);
    this.waitingList.push(person);
  }

  log() {
    console.log("Direction: " + this.direction, "Current floor: " + this.floor);
  }
}

module.exports = Elevator;
