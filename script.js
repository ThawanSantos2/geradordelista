let listaItens = [];
function adicionarItem() {
    const itemInput = document.getElementById("item");
    const lista = document.getElementById("lista");
    if (itemInput.value.trim() === "") return;
    listaItens.push({ texto: itemInput.value, destacado: false });
    atualizarLista();
    itemInput.value = "";
}

function atualizarLista() {
    const lista = document.getElementById("lista");
    lista.innerHTML = "";
    listaItens.forEach((item, index) => {
        const li = document.createElement("li");
        li.classList.add("bg-orange-200", "p-2", "rounded", "flex", "justify-between");
        if (item.destacado) li.classList.add("font-bold", "text-orange-700");
        li.textContent = item.texto;
        const btnDestacar = document.createElement("button");
        btnDestacar.textContent = item.destacado ? "⭐" : "☆";
        btnDestacar.classList.add("ml-2", "text-yellow-500");
        btnDestacar.onclick = () => {
            item.destacado = !item.destacado;
            atualizarLista();
        };
        const btnRemover = document.createElement("button");
        btnRemover.textContent = "❌";
        btnRemover.classList.add("text-red-500");
        btnRemover.onclick = () => {
            listaItens.splice(index, 1);
            atualizarLista();
        };
        li.appendChild(btnDestacar);
        li.appendChild(btnRemover);
        lista.appendChild(li);
    });
}

function gerarArquivo() {
    const titulo = document.getElementById("titulo").value;
    const formato = document.getElementById("formato").value;
    const nomeArquivo = document.getElementById("nomeArquivo").value || "Lista";
    const enumerar = document.getElementById("enumera").checked;
    if (listaItens.length === 0) {
        alert("Adicione pelo menos um item.");
        return;
    }
    if (formato === "excel") {
        gerarExcel(titulo, listaItens, nomeArquivo, enumerar);
    } else {
        gerarPDF(titulo, listaItens, nomeArquivo, enumerar);
    } 
}

function gerarExcel(titulo, itens, nomeArquivo, enumerar) {
    const ws = XLSX.utils.aoa_to_sheet([[titulo]], { origin: "A1" });
    ws["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 1 } }];
    XLSX.utils.sheet_add_aoa(ws, itens.map((item, index) => [enumerar ? index + 1 : "", item.texto]), { origin: "A2" });
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Lista");
    XLSX.writeFile(wb, `${nomeArquivo}.xlsx`);
}

function gerarPDF(titulo, itens, nomeArquivo, enumerar) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.text(titulo || "Lista de Itens", 105, 10, { align: "center" });
    doc.setFont("helvetica", "normal");
    itens.forEach((item, index) => {
        doc.text(`${enumerar ? index + 1 + ". " : ""}${item.texto}`, 10, 20 + index * 10);
    });
    doc.save(`${nomeArquivo}.pdf`);
}

const menuBtn = document.getElementById("menu-btn");
        const menu = document.getElementById("menu");
        const overlay = document.getElementById("menu-overlay");
        const menuLinks = document.querySelectorAll("#menu a");

        const toggleMenu = () => {
            menu.classList.toggle("hidden");
            menu.classList.toggle("show");
            overlay.classList.toggle("hidden");
            overlay.classList.toggle("show");
        };

        const closeMenu = () => {
            menu.classList.add("hidden");
            menu.classList.remove("show");
            overlay.classList.add("hidden");
            overlay.classList.remove("show");
        };

        menuBtn.addEventListener("click", toggleMenu);
        overlay.addEventListener("click", closeMenu);
        menuLinks.forEach(link => link.addEventListener("click", closeMenu));
