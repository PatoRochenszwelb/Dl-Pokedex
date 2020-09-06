$(document).ready(function () {
    $("#respuesta").empty();
   let formulario = $('#formulario');
   let expresion = /\d/gmi;
   let numeroPoke = parseInt($('#numeroPoke').val()) || Math.floor(Math.random() * 100);
   console.log(numeroPoke);
   consulta(numeroPoke);

   formulario.on('submit', function (event){
        event.preventDefault();
        $("#respuesta").empty();
        numeroPoke = parseInt($('#numeroPoke').val());
        console.log(numeroPoke);
        consulta(numeroPoke);
   });

    function consulta(numeroPoke) {
        if (numeroPoke && expresion.test(numeroPoke) && numeroPoke > 0 && numeroPoke <= 893){
            $.ajax({
                dataType: "json",
                type: "get",
                url: "https://pokeapi.co/api/v2/pokemon/"+numeroPoke,
                success: function (response) {
                    console.log(response);
                    $('#resultado').html(`
                        <div class="text-center">
                            <h3>Nombre: ${response.name}</h3>
                            <img src="${response.sprites.front_default}" alt="${response.name}">
                            <h3>Peso: ${response.weight} gramos.</h3>
                        </div>
                    `);
                    let resultado = `
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Slot</th>
                                    <th>Habilidad</th>
                                    <th>Oculto</th>
                                </tr>
                            </thead>
                            <tbody>
                    `;

                    response.abilities.forEach(element => {
                        console.log(element.ability.name);
                        resultado += `
                            <tr>
                                <th>${element.slot}</th>
                                <td>${element.ability.name}</td>
                                <td>${element.is_hidden}</td>
                            </tr>
                        `;
                    });
                    resultado += `
                        </tbody>
                        </table>
                    `;
                    $('#resultado').append(resultado);
                    

                    let datosXY = [];
                    response.stats.forEach(element => {
                        console.log(element.base_stat);//y
                        console.log(element.stat.name);//label
                        datosXY.push(
                            {
                                label: element.stat.name, 
                                y:element.base_stat
                            });
                    });

                    var options = {
                        title: {
                            text: "Grafica de columnas con jQuery y CanvasJS"              
                        },
                        data: [              
                            {
                                type: "column",
                                dataPoints: datosXY
                            }
                        ]
                    };
                
                    $("#chartContainer").CanvasJSChart(options);
                },
                error: function (error) {
                    console.error(error);
                }
            });

        } else {
            alert("Ingrese un número entre el 1 y el 893")
        }; 
    }
});