class dataStudent {
    constructor(params) {
        var me = this;
        this.cont = params.cont ? params.cont : d3.select('body');
        this.apiUrl = params.apiUrl ? params.apiUrl : false;
        this.waitUrl = params.waitUrl ? params.waitUrl : false;
        this.data = params.data ? params.data : {}; 
        this.idVocab = 0;
        var vocab, tables, classes, properties, items=[], omekaQuery=[],divWait
        , propsForOmekaType = {
            'o:ResourceClass':['@id','o:id','o:label','o:term']
            ,'o:Property':['@id','o:id','o:label','o:term']
            ,'o:Item':['@id','o:id','o:title','o:resource_class','properties']
        };


        function createItems(data) {

            if (data[0].length > 1) {
                // Dans le cas d'un array contenant plusieurs item
                var dataItems = data[0];
            } else {
                // Dans le cas d'un item unique
                var dataItems = data;
            }

            var cards = d3.select(me.cont)
                .attr("class", "container justify-content-around")
                .selectAll("div")
                .data(dataItems)
                .enter()
                .append("div")
                .attr("class","card w-25 m-3 d-inline-block");

            var cardHeader = cards.append("div")
                .attr("class", "card-header bg-dark text-white text-center")
                .html(d => {
                    return d["Titre"] + "<img class='profil-img' src='" + d["image_url"] + "'>"; 
                    
                });


            var cardBody = cards.append("div")
                .attr("class", "card-body p-2");

            cardBody.append("p")
                //.attr("class", "card-text text-center bg-success py-4 my-0")
                .html(d => {
                    return "<i class='fa fa-id-card'></i> Episodes : " + d["episodes"];
                });

            cardBody.append("p")
                //.attr("class", "border border-secondary py-0 my-0")
                .html(d => {
                    return "<i class='fa fa-envelope'></i> Notes : " +  d["rating"];
                });

            cardBody.append("p")
                //.attr("class", "border border-secondary py-0 my-0")
                .html(d => {
                    return "<i class='fa fa-book'></i> Source : " + d["source"];
                });

            cardBody.append("p")
                //.attr("class", "border border-secondary py-0 my-0")
                .html(d => {
                    return "<i class='fa fa-question-circle'></i> Status : " + d["status"];
                });

            cardBody.append("p")
                //.attr("class", "border border-secondary py-0 my-0")
                .html(d => {
                    return "<i class='fa fa-info-circle'></i> Type : " + d["type"];
                });

            cardBody.append("p")
                //.attr("class", "border border-secondary py-0 my-0")
                .html(d => {
                    return "<i class='fa fa-home'></i> Studio : " + d["studio"];
                });

            cardBody.append("p")
                //.attr("class", "border border-secondary py-0 my-0")
                .html(d => {
                    return "<i class='fa fa-star'></i> Score : " + d["score"];
                });

            cardBody.append("p")
                //.attr("class", "border border-secondary py-0 my-0")
                .html(d => {
                    return "<i class='fa fa-graduation-cap'></i> Genre : " + d["genre"];
                });

            cardBody.append("p")
                //.attr("class", "border border-secondary py-0 my-0")
                .html(d => {
                    return "<i class='fa fa-camera'></i> Diffusé : " + d["aired"];
                }


           );
        }

        function Type(data){
            let info={
                "TV": 0,
                "OVA":0,
                "Movie":0

            }
            for(let i = 0; i < data.length; i++){
                if(info[i]["TV"] == "TV"){
                    info[i]["TV"]++;
                    
                }
                else if(info[i]["OVA"] == "OVA"){
                    info[i]["OVA"]++;
                }
                else if(info[i]["Movie"]){
                    info[i]["Movie"]++;
                }
            }

        }
        this.getData = function(data){
            d3.queue()
            .defer(d3.json, me.apiUrl)
            .awaitAll(function(error, results) {
                if (error) throw error;
               // console.log(results);
                createItems(results);  
                Type(results);
                console(Type(results));  

            });
        }

    }
}