var $parkWrapper = $('[data-park="wrapper"]');

function AddTable(data){
$parkWrapper.html('');
    $(data).each((lev,lev_ar)=>{
        $parkWrapper.append('<div>'+lev+'</div>');
        console.log(lev_ar);
    });
}