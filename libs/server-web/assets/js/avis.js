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
                appProcess.ateliers = res;
            },
            error: function (res) {
                console.error(res.responseText)
            }
        })
    },

    methods: {
        addAvis: function(){
            $.ajax({
                    url: "/addAvis",
                    type: "POST",
                    dataType: "Json",
                    data: {
                        atelier: $("#choix-atelier").val(),
                        note: parseInt($("input[name='avis']:checked").val())
                    },

                    error: function (data) {
                        toastr['error']("Erreur pendant l'envoi de l'avis ! : " + data.responseText);
                    },

                    success: function (data) {
                        toastr['success']('Votre avis à bien été envoyé ! Merci !');
                    }
                }
            )
        }
    }
});

// moment.locale();
//
// function dateRefresh() {
//     appProcess.date = moment().format('HH:mm:ss DD/MM/YYYY');
// }
//
// var timer = setInterval(() => dateRefresh(), 1000);