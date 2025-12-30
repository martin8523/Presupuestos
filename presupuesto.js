const items = [
  { desc:"Ataud Nicho N°15", precio:645000 },
  { desc:"Ataud Semi Extra", precio:752000 },
  { desc:"Gastos Administrativos", precio:182000 },
  { desc:"Cremación", precio:920000 },
  { desc:"Nicho Nuevo", precio:950000 },
  { desc:"Hora Velación", precio:160000 }
];

const tbody = document.getElementById("detalle");
const tipo = document.getElementById("tipoFactura");

document.getElementById("fecha").innerText = new Date().toLocaleDateString("es-AR");
document.getElementById("numero").innerText =
  Date.now().toString().slice(-8);

function agregar(){
  const tr = document.createElement("tr");

  const sel = document.createElement("select");
  sel.innerHTML = `<option value="">--item--</option>`+
    items.map(i=>`<option value="${i.precio}">${i.desc}</option>`).join("");

  const tdDesc = document.createElement("td");
  const tdCant = document.createElement("td");
  const tdPrecio = document.createElement("td");
  const tdSub = document.createElement("td");
  const tdDel = document.createElement("td");

  const cant = document.createElement("input");
  cant.type="number"; cant.value=1; cant.className="cant";

  tdDesc.appendChild(sel);
  tdCant.appendChild(cant);
  tdPrecio.className="precio";
  tdSub.className="sub";

  const btn = document.createElement("button");
  btn.textContent="X";

  tdDel.appendChild(btn);

  tr.append(tdDesc,tdCant,tdPrecio,tdSub,tdDel);
  tbody.appendChild(tr);

  sel.onchange=()=>{
    tdPrecio.dataset.valor=sel.value;
    tdPrecio.innerText = (+sel.value).toLocaleString("es-AR");
    calcular();
  }

  cant.oninput = calcular;
  btn.onclick=()=>{tr.remove(); calcular();}
}

function calcular(){
  let bruto=0;

  document.querySelectorAll("#detalle tr").forEach(tr=>{
    const cant = +tr.querySelector(".cant").value || 0;
    const precio = +tr.querySelector(".precio").dataset.valor || 0;
    const sub = cant*precio;
    tr.querySelector(".sub").innerText=sub.toLocaleString("es-AR");
    bruto+=sub;
  });

  let neto=bruto;
  let iva=0;

  if(tipo.value==="A"){
    neto=bruto/1.21;
    iva=bruto-neto;
  }

  const iibb=neto*0.08;
  const total=bruto+iibb;

  neto=Math.round(neto);
  iva=Math.round(iva);
  iibb=Math.round(iibb);

  document.getElementById("neto").innerText=neto.toLocaleString("es-AR");
  document.getElementById("iva").innerText=iva.toLocaleString("es-AR");
  document.getElementById("iibb").innerText=iibb.toLocaleString("es-AR");
  document.getElementById("total").innerText=total.toLocaleString("es-AR");
}

document.getElementById("add").onclick=agregar;
document.getElementById("print").onclick=()=>window.print();

document.getElementById("pdf").onclick=()=>{
  html2pdf().from(document.querySelector(".container")).set({
    jsPDF:{format:"a4",orientation:"portrait"}
  }).save();
};



