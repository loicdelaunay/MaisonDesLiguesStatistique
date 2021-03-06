//Table management
var appStatistique = new Vue({
    el: " #app-statistique",
    data: {
        ateliers: "",
        aterlierNbrAvisTotal: 0,
        isLoading: true
    },
    created: function () {
        $.ajax({
            url: "/getAteliers",
            type: 'GET',
            dataType: 'Json',
            success: function (res) {
                appStatistique.ateliers = res;
                setTimeout(function(){loadStatistique()},2000);
            },
            error: function (res) {
                console.error(res.responseText)
            }
        })
    }
});


function loadStatistique() {

    var avisGlobal = {
        TOTAL: 0,
        TRESSATISFAIT: 0,
        SATISFAIT : 0,
        MOYENSATISFAIT: 0,
        PASDUTOUTSATISFAIT: 0
    };

    appStatistique.ateliers.forEach(function(unAtelier){
        avisGlobal.TOTAL += unAtelier.NBAVIS;
        avisGlobal.TRESSATISFAIT += unAtelier.AVISTRESSATISFAIT;
        avisGlobal.SATISFAIT += unAtelier.AVISSATISFAIT;
        avisGlobal.MOYENSATISFAIT += unAtelier.AVISMOYSATISFAIT;
        avisGlobal.PASDUTOUTSATISFAIT += unAtelier.AVISPASDUTOUTSATISFAIT;

        //Statistique pour chaques ateliers
        let ctxP = document.getElementById("statistique"+unAtelier.ID).getContext('2d');
        let myPieChart = new Chart(ctxP, {
            type: 'pie',
            data: {
                labels: ["avis très satisfait", "avis satisfait", "avis moyen satisfait", "avis pas du tout satisfait"],
                datasets: [
                    {
                        data: [unAtelier.AVISTRESSATISFAIT, unAtelier.AVISSATISFAIT, unAtelier.AVISMOYSATISFAIT, unAtelier.AVISPASDUTOUTSATISFAIT],
                        backgroundColor: ["#34abe1", "#34ca21", "#ff9509", "#ff3718"],
                        hoverBackgroundColor: ["#138ae1", "#199b0b", "#a86206", "#8e1f0d"],
                    }
                ]
            },
            options: {
                responsive: true
            }
        });
    });

    appStatistique.aterlierNbrAvisTotal = avisGlobal.TOTAL;

    //Statistique global
    var ctxP = document.getElementById("statistique-global").getContext('2d');
    var myPieChart = new Chart(ctxP, {
        type: 'pie',
        data: {
            labels: ["avis très satisfait", "avis satisfait", "avis moyen satisfait", "avis pas du tout satisfait"],
            datasets: [
                {
                    data: [avisGlobal.TRESSATISFAIT, avisGlobal.SATISFAIT, avisGlobal.MOYENSATISFAIT, avisGlobal.PASDUTOUTSATISFAIT],
                    backgroundColor: ["#34abe1", "#34ca21", "#ff9509", "#ff3718"],
                    hoverBackgroundColor: ["#138ae1", "#199b0b", "#a86206", "#8e1f0d"],
                }
            ]
        },
        options: {
            responsive: true
        }
    });

    appStatistique.isLoading = false;
}