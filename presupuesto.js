

document.addEventListener("DOMContentLoaded", () => {

  // =============================
  // Cargar items desde JSON
  // =============================
  let itemsDisponibles = [];

  fetch("items.json")
    .then(r => r.json())
    .then(data => itemsDisponibles = data);

  // =============================
  // Fecha y número
  // =============================
  const hoy = new Date();

  document.getElementById("fecha").innerText = hoy.toLocaleDateString("es-AR");

  document.getElementById("numero").innerText =
    hoy.getFullYear().toString().slice(-2) +
    (hoy.getMonth()+1).toString().padStart(2,"0") +
    hoy.getDate().toString().padStart(2,"0") +
    Math.floor(Math.random()*1000).toString().padStart(3,"0");

  // =============================
  // Elementos
  // =============================
  const tbody = document.getElementById("detalle-items");
  const btnAgregar = document.getElementById("btn-agregar");
  const btnImprimir = document.getElementById("btn-imprimir");
  const tipoFactura = document.getElementById("tipoFactura");

  btnAgregar.addEventListener("click", agregarFila);
  btnImprimir.addEventListener("click", ()=>window.print());
  tipoFactura.addEventListener("change", calcularTotales);

  // =============================
  // Agregar fila
  // =============================
  function agregarFila(){
    const tr = document.createElement("tr");

    const tdSel = document.createElement("td");
    const tdCant = document.createElement("td");
    const tdPrecio = document.createElement("td");
    const tdSub = document.createElement("td");
    const tdDel = document.createElement("td");

    const sel = document.createElement("select");
    sel.innerHTML = `<option value="">-- seleccionar --</option>`;

    itemsDisponibles.forEach(it=>{
      const o = document.createElement("option");
      o.textContent = it.descripcion;
      o.dataset.precio = it.precio;
      sel.appendChild(o);
    });

    const cant = document.createElement("input");
    cant.type = "number";
    cant.min = 1;
    cant.value = 1;
    cant.className = "cantidad";

    const del = document.createElement("button");
    del.textContent = "❌";

    tdSel.appendChild(sel);
    tdCant.appendChild(cant);
    tdPrecio.className = "precio";
    tdSub.className = "sub";
    tdDel.appendChild(del);

    tr.append(tdSel, tdCant, tdPrecio, tdSub, tdDel);
    tbody.appendChild(tr);

    sel.addEventListener("change", ()=>{
      const precio = sel.selectedOptions[0]?.dataset.precio || 0;
      tdPrecio.dataset.valor = precio;
      tdPrecio.innerText = (+precio).toLocaleString("es-AR");
      calcularTotales();
    });

    cant.addEventListener("input", calcularTotales);
    del.addEventListener("click", ()=>{
      tr.remove();
      calcularTotales();
    });
  }

  // =============================
  // Totales
  // =============================
  function calcularTotales(){
    let bruto = 0;

    tbody.querySelectorAll("tr").forEach(tr=>{
      const cant = +tr.querySelector(".cantidad").value || 0;
      const precio = +tr.querySelector(".precio").dataset.valor || 0;
      const sub = cant * precio;
      tr.querySelector(".sub").innerText = sub.toLocaleString("es-AR");
      bruto += sub;
    });

    let neto = bruto;
    let iva = 0;

    if(tipoFactura.value === "A"){
      neto = bruto / 1.21;
      iva = bruto - neto;
    }

    const iibb = neto * 0.08;
    const total = bruto + iibb;

    document.getElementById("neto").innerText = Math.round(neto).toLocaleString("es-AR");
    document.getElementById("iva").innerText = Math.round(iva).toLocaleString("es-AR");
    document.getElementById("iibb").innerText = Math.round(iibb).toLocaleString("es-AR");
    document.getElementById("total").innerText = Math.round(total).toLocaleString("es-AR");
  }

});
