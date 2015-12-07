var $parkWrapper = $('[data-park="wrapper"]'); // this variable will be a link to our calendar wrapper

function AddTable(){    //Here we add clear tables for each level
    var dfr = $.Deferred();
    for (let l = 0; l < Data.info.levels.length; l++){
        var level = Data.info.levels[l];
        let result = '<div data-park="tab_wrap" data-level="'+l+'">\
            <table data-park="table" data-level-id="'+level.levelId+'" data-level-length="'+level.slotsLength+'">';
        for (let time = 0; time < 24; time++){
            result += '<tr>'
            for (let i = 0; i <= level.slotsLength; i++){
                if (i == 0) result += '<td class="slot_time">'+time+':00</td>'; //this cell contains time info in 24h format
                else result += '<td data-slot="'+(i-1)+'"></td>'; //this one is for "calendar"
            }
            result+= '</tr>';
        }
        result += '</table>\
        <div class="current_time" data-level="'+l+'"></div>\
        <div data-park="vehicles" data-level="'+l+'"></div>\
            </div>';
        $parkWrapper.append(result);
    }
    dfr.resolve();
    return dfr;
}

function AddVehicle(level, slot, type, plate, sTime, eTime) {
    var typeClass = type == 2 ? "moto" : '',
        cellWidth = $('[data-slot="0"]').outerWidth(),
        cellHeight = $('[data-slot="0"]').outerHeight();
    $('[data-park="tab_wrap"][data-level="'+level+'"] [data-park="vehicles"]').append('\
    <div class="component_vehicle '+ typeClass +'" style="top:'+10+'px">\
    '+plate+'</div>');
}

function CurrentTime() {
    var SetTimeLine = () => {
        var d = new Date(),
            minutes = d.getHours() * 60 + d.getMinutes();

        //calculates the time line position using the whole height of table and the line's height
        var yPos = Math.floor((($('table[data-park="table"]').outerHeight() / (24*60)) * minutes) - $('.current_time').outerHeight()/2);

        //and positions it
        $('.current_time').css({top: yPos});
    }
    SetTimeLine();
    var timeLineAnima = setInterval(SetTimeLine(), 60000); //update its position every minute
}