// ECMAScript 6 is used here

'use strict';

var Data = {}; //Here will lie all data

function Init(){
    ReadData().done(() => {
       // Here we render the table
        AddTable().done(() => {
            // Adds the line (current time)
            CurrentTime();
            // And here we render all vehicles
            for (let i = 0; i < Data.slots.length; i++){
                var vehicle = Data.slots[i];
                AddVehicle(vehicle.level, vehicle.slot, vehicle.type, vehicle.plate, vehicle.startTime, vehicle.endTime);
            }
        });

    }).fail((message) => {
      alert('Can not read data from server')
    });
};

Init();