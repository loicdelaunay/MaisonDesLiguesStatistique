//Table management
var appProcess = new Vue({
    el: " #app-avis",
    data: {
        date: moment().format('HH:mm:ss DD/MM/YYYY'),
        ateliers: ""
    },
    created: function(){
        $.ajax({
            url: "/getAteliers",
            type: 'GET',
            dataType: 'Json',
            success: function (res) {
                console.log(res)
                appProcess.ateliers = res;
            },
            error: function (res) {
                console.error(res.responseText)
            }
        })
    }
});

moment.locale();

function dateRefresh() {
    appProcess.date = moment().format('HH:mm:ss DD/MM/YYYY');
}

var timer = setInterval(() => dateRefresh(), 1000);