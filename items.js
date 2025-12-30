let editIndex = null;

function getItems(){
  return JSON.parse(localStorage.getItem("items") || "[]");
}

function saveItems(items){
  localStorage.setItem("items", JSON.stringify(items));
}

function render(){
  const tbody = document.getElementById("lista");
  tbody.innerHTML = "";
  getItems().forEach((it,i)=>{
    tbody.innerHTML += `
      <tr>
        <td>${it.d}</td>
        <td>${it.p.toLocaleString("es-AR")}</td>
        <td>
          <button class="btn btn-sm btn-warning" onclick="editar(${i})">✏</button>
          <button class="btn btn-sm btn-danger" onclick="borrar(${i})">❌</button>
        </td>
      </tr>
    `;
  });
}

function editar(i){
  const it = getItems()[i];
  document.getElementById("desc").value = it.d;
  document.getElementById("precio").value = it.p;
  editIndex = i;
}

function borrar(i){
  const items = getItems();
  items.splice(i,1);
  saveItems(items);
  render();
}

document.getElementById("guardar").onclick = () => {
  const d = document.getElementById("desc").value;
  const p = +document.getElementById("precio").value;

  const items = getItems();

  if(editIndex === null){
    items.push({d,p});
  } else {
    items[editIndex] = {d,p};
    editIndex = null;
  }

  saveItems(items);
  document.getElementById("desc").value="";
  document.getElementById("precio").value="";
  render();
}

render();
