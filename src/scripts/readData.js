function ReadData(){
    var dfr = $.Deferred();
    // send the request
    $.ajax({
        url: '/data/data.json',
        dataType: 'json',
    })
    .done((data)=>{
        if (typeof(data) !== 'object'){data = $.parseJSON(data);}
        Data = data;
        dfr.resolve();
    })
    .error(() => { dfr.reject() ; });
    return dfr; //dfr.promise();
};