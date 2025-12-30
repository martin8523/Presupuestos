  document.addEventListener("DOMContentLoaded", () => {

  const tbody = document.getElementById("detalle-items");
  const btnAgregar = document.getElementById("btn-agregar");
  const btnImprimir = document.getElementById("btn-imprimir");
  const totalEl = document.getElementById("total");

  /* Fecha */
  const hoy = new Date();
  document.getElementById("fecha").innerText = hoy.toLocaleDateString("es-AR");

  /* Número automático */
  const numero =
    hoy.getFullYear().toString().slice(-2) +
    (hoy.getMonth() + 1).toString().padStart(2, "0") +
    hoy.getDate().toString().padStart(2, "0") +
    Math.floor(Math.random() * 1000).toString().padStart(3, "0");

  document.getElementById("numero").innerText = numero;

  /* Items */
  const itemsDisponibles = [
    { descripcion: "Ataud para Nicho N° 15", precio: 645000 },
    { descripcion: "Ataud para Nicho Semi-Extraordinario", precio: 752000 },
    { descripcion: "Ataud para Nicho Extraordinario", precio: 1160000 },
    { descripcion: "Gastos Administrativos", precio: 182000 },
    { descripcion: "Nicho Nuevo", precio: 950000 },
    { descripcion: "Nicho Usado", precio: 450000 },
    { descripcion: "Cremacion", precio: 920000 },
    { descripcion: "Hora de Velacion", precio: 160000 },
    { descripcion: "Traslado x Kilometro", precio: 5200 },
    { descripcion: "Ataud para Tierra N° 15", precio: 418000 },
    { descripcion: "Ataud para Tierra Semi-Extraordinario", precio: 490000 }
  ];

  function calcularTotal() {
    let total = 0;

    tbody.querySelectorAll("tr").forEach(tr => {
      const cantidad = parseFloat(tr.querySelector(".cantidad").value) || 0;
      const precio = parseFloat(tr.querySelector(".precio").innerText) || 0;
      const importe = cantidad * precio;

      tr.querySelector(".importe").innerText = importe.toLocaleString("es-AR");
      total += importe;
    });

    totalEl.innerText = total.toLocaleString("es-AR");
  }

  function agregarFila() {
    const tr = document.createElement("tr");

    /* Columna Detalle */
    const tdDetalle = document.createElement("td");
    const select = document.createElement("select");
    select.className = "form-select";

    const optEmpty = document.createElement("option");
    optEmpty.textContent = "-- Seleccione ítem --";
    optEmpty.value = "";
    select.appendChild(optEmpty);

    itemsDisponibles.forEach(it => {
      const opt = document.createElement("option");
      opt.value = it.descripcion;
      opt.textContent = it.descripcion;
      opt.dataset.precio = it.precio;
      select.appendChild(opt);
    });

    tdDetalle.appendChild(select);

    /* Cantidad */
    const tdCantidad = document.createElement("td");
    const inputCantidad = document.createElement("input");
    inputCantidad.type = "number";
    inputCantidad.value = 1;
    inputCantidad.min = 1;
    inputCantidad.className = "form-control cantidad";
    tdCantidad.appendChild(inputCantidad);

    /* Precio */
    const tdPrecio = document.createElement("td");
    tdPrecio.className = "precio";
    tdPrecio.innerText = "0";

    /* Subtotal */
    const tdImporte = document.createElement("td");
    tdImporte.className = "importe";
    tdImporte.innerText = "0";

    tr.appendChild(tdDetalle);
    tr.appendChild(tdCantidad);
    tr.appendChild(tdPrecio);
    tr.appendChild(tdImporte);

    tbody.appendChild(tr);

    select.addEventListener("change", () => {
      const sel = select.selectedOptions[0];
      if (sel && sel.dataset.precio) {
        tdPrecio.innerText = parseFloat(sel.dataset.precio).toLocaleString("es-AR");
      } else {
        tdPrecio.innerText = "0";
      }
      calcularTotal();
    });

    inputCantidad.addEventListener("input", calcularTotal);

    calcularTotal();
  }

  btnAgregar.addEventListener("click", agregarFila);
  btnImprimir.addEventListener("click", () => window.print());
});

