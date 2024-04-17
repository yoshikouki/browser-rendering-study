const container = document.getElementById("container");

for (let i = 0; i < 5; i++) {
  const paragraph = document.createElement("p");
  paragraph.textContent = `これは動的に追加された段落 ${i + 1} です。`;
  container.appendChild(paragraph);
}