var $parkWrapper = $('[data-park="wrapper"]'); // this variable will be a link to our calendar wrapper

function AddTable(){    //Here we add clear tables for each level
    var dfr = $.Deferred();
    for (let l = 0; l < Data.info.levels.length; l++){
        var level = Data.info.levels[l];
        let result = '<div class="level_head_button" data-level="'+l+'">Level '+(l+1)+'</div>\
            <div class="tabs_wrap" data-level="'+l+'">';
        
        //let's draw time scale
        result += '<div data-park="time_wrap"><table data-park="time_table">';
        for (let time = 0; time < 24; time++){
            result += '<tr><td>'+time+':00</td><tr>';
        }
        result += '</table></div>';
        
        //and now it's slots time    
        result += '<div data-park="tab_wrap" data-level="'+l+'">\
            <table data-park="table" data-level-id="'+level.levelId+'" data-level-length="'+level.slotsLength+'">';
        for (let time = 0; time < 24; time++){
            result += '<tr>'
            for (let i = 0; i < level.slotsLength; i++){
                    result += '<td data-slot="'+(i)+'"></td>'; //this one is for "calendar"
            }
            result+= '</tr>';
        }
        result += '</table>\
        <div data-park="vehicles" data-level="'+l+'"></div>\
        </div>\
        <div class="current_time" data-level="'+l+'">&nbsp;</div>\
                </div>';
        $parkWrapper.append(result);
    }
    dfr.resolve();
    return dfr;
}

function AddVehicle(level, slot, type, plate, sTime, eTime) {
    var typeClass = type == 2 ? "moto" : '',
        cellWidth = Tools.tableCell.width,
        cellHeight = Tools.tableCell.height,
        leftPos = cellWidth * slot,
        half = 0;
    //checking if data is coorect
    sTime = sTime < 0 ? 0 : sTime;
    eTime = eTime > 1440 ? 1440 : eTime;
    var topPos = Tools.tableMinute * sTime,
        duration = (eTime - sTime) < 60 ? 60 : (eTime - sTime), //this parameter must be used only for rendering!!!
        height = Tools.tableMinute * duration;
    if (type != 2){
        $('[data-park="tab_wrap"][data-level="'+level+'"] [data-park="vehicles"]').append('\
        <div class="component_vehicle '+ typeClass +'" data-mstart="'+sTime+'" data-mend="'+eTime+'"  style="top:'+topPos+'px; left:'+leftPos+'px; height:'+height+'px">\
        <span class="component_vehicle_plate">'+plate+'</span></div>');
    }else { // if the vehicle type is motorcycle
        //looking if the any motorcycle already stands on this slot using data-attrs
        
        $('.component_vehicle[data-veh-type="2"][data-mlevel="'+level+'"][data-mslot="'+slot+'"]').each((ind,motoObj) => {
            let start = Math.floor($(motoObj).attr('data-mstart')),
                end = Math.floor($(motoObj).attr('data-mend')),
                place = $(motoObj).attr('data-half');
            if (((sTime >= start && sTime < end) || (eTime > start && eTime <= end)) && place == 0) {
//                neib++;
                if (place == 0){
                    leftPos += cellWidth * .5;
                    typeClass = "moto second";
                    half = 1;
                }
            }
        });
        
        //and now rendering moto vehicle
        $('[data-park="tab_wrap"][data-level="'+level+'"] [data-park="vehicles"]').append('\
        <div class="component_vehicle '+ typeClass +'" style="top:'+topPos+'px;left:'+leftPos+'px;height:'+height+'px" data-veh-type="2" data-mlevel="'+level+'" data-mslot="'+slot+'" data-mstart="'+sTime+'" data-mend="'+eTime+'" data-half="'+half+'">\
        <span class="component_vehicle_plate">'+plate+'</span></div>');
    }
}

function CurrentTime() {
    $('.current_time').each((i,ct) => {
        $(ct).outerWidth((Data.info.levels[i].slotsLength + 1) * Tools.tableCell.width - 30); //calculating the width
    });
    
    var SetTimeLine = () => {
        var d = new Date(),
            minutes = d.getHours() * 60 + d.getMinutes();

        //calculates the time line position using the whole height of table and the line's height
        var yPos = Tools.tableMinute * minutes - 2;

        //and positions it
        $('.current_time').css({top: yPos});
    }
    SetTimeLine();
    var timeLineAnima = setInterval(SetTimeLine(), 60000); //update its position every minute
}

//open-close table accordion
$(document).on('click', '.level_head_button', function(event){ //here fat arrow is not used because I need the right scope to use THIS
    var level = $(this).attr('data-level'); //it should be string type
    if ($('.tabs_wrap[data-level="'+level+'"]').hasClass('active')) $('.tabs_wrap[data-level="'+level+'"]').removeClass('active');
    else $('.tabs_wrap[data-level="'+level+'"]').addClass('active');
    if ($(this).hasClass('active')) $(this).removeClass('active');
    else $(this).addClass('active');
});
