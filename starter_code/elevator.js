class Elevator {
  constructor(){
    this.floor      = 0;
    this.MAXFLOOR   = 10;
    this.requests   = [];
    this.direction = "up";
    this.waitingList = [];
    this.passengers = [];
    this.updateInterval = "";
  }

  start() {
    this.updateInterval = setInterval(()=> this.update(), 1000);
    }
  stop() {
    clearInterval(this.updateInterval);
  }

  update() {

      /*if(this.requests.length === 0) {
        this.stop();

      }*/
      console.log(this.requests);

      switch(this.direction) {
        case "up":

          this.requests.forEach((requestFloor) => {


            if( requestFloor === this.floor){
              this._passengersEnter(requestFloor);
              this._passengersLeave(requestFloor);
              //console.log(requestFloor);

            }

          }
         );

         if(this.requests.length !== 0) {
           this.floorUp();
         }

        break;
        case "down":

        this.requests.forEach((requestFloor) => {

          if( requestFloor === this.floor){
            this._passengersEnter(requestFloor);
            this._passengersLeave(requestFloor);
          }
        }
       );

       if(this.requests.length !== 0) {
         this.floorDown();
       }

        break;

      }
      if(this.requests[0] < this.floor ) {
        this.direction = "down";
      }
      if(this.requests[0] > this.floor ) {
        this.direction = "up";
      }
    this.log();






  }
  _passengersEnter(requestFloor) {
      this.waitingList.forEach((currentValue, index) =>{
        if(requestFloor === this.waitingList[index].originFloor) {
          console.log(`${this.waitingList[index].name} has enter the elvator.`);
          this.passengers.push(this.waitingList[index]);
          this.requests.push(this.waitingList[index].destinationFloor);
          this.waitingList.splice(index, 1);
          this.requests.shift();
        }
      });
  }

  _passengersLeave(requestFloor) {

    this.passengers.forEach((currentValue, index) =>{
      if(this.passengers[index].destinationFloor === requestFloor) {
        console.log(`${this.passengers[index].name} has left the elvator.`);
        this.passengers.splice(index, 1);
        this.requests.shift();
      }
    });



  }

  floorUp() {

    this.direction = "up";
    if(this.floor < this.MAXFLOOR) {
      this.floor += 1;
    }

  }

  floorDown() {
    this.direction = "down";
    if(this.floor > 0) {
      this.floor -= 1;
    }

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
