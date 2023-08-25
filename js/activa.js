let containerActivo = 1

const containers = document.querySelectorAll(".container_1")
const containers_2 = document.querySelectorAll(".container_2")


containers.forEach (( container_1, indice) => {
    container_1.addEventListener ( "click" , function() {
        cambiarContainer(indice)
    })
})
containers_2.forEach (( container_2, indice) => {
    container_2.addEventListener ( "click" , function() {
        cambiarContainer_2(indice)
    })
})
function cambiarContainer(indice) {
    containers[containerActivo].classList.remove("activa")
    containers[indice].classList.add("activa")
    containerActivo = indice
}
function cambiarContainer_2(indice) {
    containers_2[containerActivo].classList.remove("activa")
    containers_2[indice].classList.add("activa")
    containerActivo = indice
}

const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const facturaSection = document.getElementById("factura");
const orderDetailsDiv = document.getElementById("order-details");
const totalP = document.getElementById("total-price");

// cambiar pag

function goToPage(pageId) {
  // Ocultar todas las páginas
  const pages = document.querySelectorAll('.page');
  pages.forEach((page) => {
      page.style.display = 'none';
  });

  // Mostrar la página especificada
  const targetPage = document.getElementById(pageId);
  if (targetPage) {
      targetPage.style.display = 'block';
  }
}


/* -------------------------- Obtener la hora con JQuery ----------------------------------- */
  // Obtiene la hora actual
  $(document).ready(function() {
    const horaActual = new Date();
    const hora = horaActual.getHours();
    console.log(horaActual);
    
    // Cambiando la Pagina Principal segun la hora con JQuery
    if (hora >= 1 && hora < 12) {
        $("#desayuno").show();
        $("#almuerzo").hide();
    } else if (hora >= 12 && hora < 23) {
        $("#desayuno").hide();
        $("#almuerzo").show();
    } 

    // Cambiando la Pagina Principal segun la hora con JQuery
    if (hora >= 1 && hora < 12) {
      $("#acompa-desayuno").show();
      $("#acompa-almuerzo").hide();
  } else if (hora >= 12 && hora < 23) {
      $("#acompa-desayuno").hide();
      $("#acompa-almuerzo").show();
  } 
});


//-----------------------------------------JSON Boton--------------------------------------------------
document.querySelector("#boton").addEventListener('click', traerDatos);
function traerDatos(){
    // console.log('dentro de la función');
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'js/inventario.json', true);
    xhttp.send();
    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
           // console.log(this.responseText)
            let datos = JSON.parse(this.responseText);
            console.log (datos);
            let res = document.querySelector("#res");
            res.innerHTML = '';


            for(let item of datos){
                //console.log (item.Sección)
                res.innerHTML += `
                    <tr>
                        <td>${item.Sección}</td>
                        <td>${item.Platillo}</td>
                        <td>${item.Precio}</td>
                        <td>${item.Disponibilidad}</td>
                    </tr>
                `
            }
        }
    }
}

// -------------------------------------Caja de comentarios ------------------------------------------------//

function sugerencias(){
  let comentario='', unir='', agregar='';
  do {
    comentario=prompt("Por favor escriba su comentario: ");
    unir = unir + '<br>' + comentario;
    if(comentario !== null){
    agregar = prompt('¿Desea agregar otro comentario?')
    }
  } while (agregar === 'si');
  if (comentario===''||comentario===null){
    document.getElementById('sugerencia').innerHTML = '';
  }
  else if (comentario!==''||comentario!==null) {
  document.getElementById('sugerencia').innerHTML = unir;
  }
}

/*----------------------------- Factura ----------------------------*/

document.addEventListener("DOMContentLoaded", function() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');

  checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', updateTotal);
  });

  function updateTotal() {
      let totalPrice = 0;
      let totalAcompaniamiento = 0;
      let totalBebidas = 0;
      let totalPostres = 0;
      let total = 0;
      const selectedItems = [];
      const selectedAcompaniamientos = [];
      const selectedBebidas = [];
      const selectedPostres = [];
  
      checkboxes.forEach(checkbox => {
          if (checkbox.checked) {
              const price = parseFloat(checkbox.getAttribute('data-price'));
              totalPrice += price;
              selectedItems.push(checkbox.value);
  
              if (checkbox.name === 'Acompañamiento') {
                  totalAcompaniamiento += price;
                  selectedAcompaniamientos.push(checkbox.value);
              }
              if (checkbox.name === 'Fresco') {
                  totalBebidas += price;
                  selectedBebidas.push(checkbox.value);
              }
              if (checkbox.name === 'Postre') {
                  totalPostres += price;
                  selectedPostres.push(checkbox.value);
              }
          }
      });
      
      total = totalPrice + totalAcompaniamiento + totalBebidas + totalPostres;

      document.getElementById('total').textContent = totalPrice.toFixed(2);
      document.getElementById('platoPrincipalPrecio').textContent = (totalPrice - totalAcompaniamiento - totalBebidas - totalPostres).toFixed(2);
      document.getElementById('acompañamientoPrecio').textContent = totalAcompaniamiento.toFixed(2);
      document.getElementById('bebidaPrecio').textContent = totalBebidas.toFixed(2);
      document.getElementById('postrePrecio').textContent = totalPostres.toFixed(2);
      console.log(selectedItems);
      console.log(selectedAcompaniamientos);
      console.log(selectedBebidas);
      console.log(selectedPostres);
  
      const seleccionesDiv = document.getElementById('selecciones');
      seleccionesDiv.innerHTML = `
          <p>Pedido: ${selectedItems.join(', ')}</p>
      `;
  }
});

