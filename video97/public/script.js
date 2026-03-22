async function addNote() {
  const text = document.getElementById("noteInput").value;

  await fetch("/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  loadNotes();
}

async function loadNotes() {
  const res = await fetch("/notes");
  const notes = await res.json();

  const list = document.getElementById("notesList");
  list.innerHTML = "";

  notes.forEach(note => {
    const li = document.createElement("li");
    li.innerText = note.text;
    const btn = document.createElement("button");
    btn.innerText = "Delete";

    btn.onclick = async () => {
      await fetch(`/notes/${note._id}`, {
        method: "DELETE",
      });
      loadNotes();
    };

    li.appendChild(btn);
    list.appendChild(li);
  });
}

// load on start
loadNotes();