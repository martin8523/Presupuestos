const hoy = new Date();
document.getElementById("fecha").innerText = hoy.toLocaleDateString("es-AR");
document.getElementById("numero").innerText =
  hoy.getFullYear().toString().slice(-2) +
  (hoy.getMonth()+1) + hoy.getDate() +
  Math.floor(Math.random()*1000);

const items = JSON.parse(localStorage.getItem("items") || "[]");

function agregarFila(){
  const tr = document.createElement("tr");

  tr.innerHTML = `
    <td>
      <select class="form-select">
        <option></option>
        ${items.map(i=>`<option data-precio="${i.p}">${i.d}</option>`).join("")}
      </select>
    </td>
    <td><input type="number" value="1" class="form-control cant"></td>
    <td class="precio">0</td>
    <td class="sub">0</td>
  `;

  tr.querySelector("select").addEventListener("change",e=>{
    tr.querySelector(".precio").dataset.valor=e.target.selectedOptions[0].dataset.precio||0;
    calcular();
  });
  tr.querySelector(".cant").addEventListener("input",calcular);

  document.getElementById("detalle-items").appendChild(tr);
}

function calcular(){
  let neto=0;
  document.querySelectorAll("#detalle-items tr").forEach(tr=>{
    const cant=+tr.querySelector(".cant").value||0;
    const precio=+tr.querySelector(".precio").dataset.valor||0;
    const sub=cant*precio;
    tr.querySelector(".precio").innerText=precio.toLocaleString("es-AR");
    tr.querySelector(".sub").innerText=sub.toLocaleString("es-AR");
    neto+=sub;
  });

  let iva=0,iibb=0;
  if(document.getElementById("tipoFactura").value==="A"){
    iva=neto*0.21;
    iibb=neto*0.08;
  }

  document.getElementById("neto").innerText=neto.toLocaleString("es-AR");
  document.getElementById("iva").innerText=iva.toLocaleString("es-AR");
  document.getElementById("iibb").innerText=iibb.toLocaleString("es-AR");
  document.getElementById("total").innerText=(neto+iva+iibb).toLocaleString("es-AR");
}

document.getElementById("btnAgregar").onclick=agregarFila;
document.getElementById("btnPrint").onclick=()=>window.print();
document.getElementById("btnPDF").onclick=()=>html2pdf().from(document.body).save();
document.getElementById("tipoFactura").onchange=calcular;



