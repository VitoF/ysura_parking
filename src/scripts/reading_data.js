function ReadData(){
    
    $.ajax({
        url: '/data/data.json',
        dataType: 'json'
    })
    .done((data)=>{
        if (typeof(data) !== 'object'){data = $.parseJSON(data);}
        AddTable(data);
    });
    
    return false;
}