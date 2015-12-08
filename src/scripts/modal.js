function Modal(){
    $('.curtain').on('click', (event) => {if ($(event.target).hasClass('curtain'))$('.curtain').hide()});
    $('.exit_modal').on('click', () => $('.curtain').hide());
}

//when clicking on the vehicle
$(document).on('click','.component_vehicle', (event) => {console.log(event.target);
    
    $('.curtain').css({display: 'block'});
    
    var el = $(event.target).hasClass('component_vehicle') ? $(event.target) : $(event.target).parents('.component_vehicle');
    
    var type = $(el).hasClass('moto') ? 'Motorcycle' : 'Car';
    $('.modal .modal_body [data-m="type"]').html(type);
    
    var plate = $(el).find('.component_vehicle_plate').html();
    $('.modal .modal_body [data-m="plate"]').html(plate);
    
    var sH = Math.floor($(el).attr('data-mstart')/60),
        sM = $(el).attr('data-mstart') - sH*60,
        eH = Math.floor($(el).attr('data-mend')/60),
        eM = $(el).attr('data-mend') - eH*60;
    
    sH = sH<10 ? '0'+sH : sH;
    sM = sM<10 ? '0'+sM : sM;
    eH = eH<10 ? '0'+eH : eH;
    eM = eM<10 ? '0'+eM : eM;
    $('.modal .modal_body [data-m="stime"]').html(sH+':'+sM);
    $('.modal .modal_body [data-m="etime"]').html(eH+':'+eM);
});