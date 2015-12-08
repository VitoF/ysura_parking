// ECMAScript 6 elements are used here

'use strict';

var Data = {}; //Here will lie all data
var Tools = {}; //Here will lie all parameters for site.

function Init(){
    
    Tools.tableCell = {
        width: 90,
        height: 30
    };
    Tools.tableMinute = Tools.tableCell.height/60; // the height of 1 rendered minute on a table
    
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
    
    Modal();
};

Init();