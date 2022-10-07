// Create Syrin Link

const myContent = `<div>
<div><label for="myInputID">ID:</label><input id="myInputID" type="string" value="" /></div>
<div><label for="myInputName">Name:</label>  <input id="myInputName" type="string" value="Sound" /></div>
</div>
`;

new Dialog({
  title: "My Dialog Title",
  content: myContent,
  buttons: {
    button1: {
      label: "Crate Element",
      callback: (html) => createElementLink(html),
      icon: `<i class="fa-solid fa-music"></i>`
    },
    button2: {
        label: "Crate Mood",
        callback: (html) => createMoodLink(html),
        icon: `<i class="fa-solid fa-waveform-lines"></i>`
      }
  }
}).render(true);

function createElementLink(html) {
    const value = html.find("input#myInputID").val();
    const name = html.find("input#myInputName").val();
    const _link = `<p>Element: <em class="syrin-link" data-sound="${value}">${name} <span class="s-play">⏭</span> <span class="s-stop">⏹</span></em></p>`
    ui.notifications.info(`Copied Element: ${_link}`);
    navigator.clipboard.writeText(_link);
}
function createMoodLink(html) {
    const value = html.find("input#myInputID").val();
    const name = html.find("input#myInputName").val();
    const _link = `<p>Mood: <em class="syrin-link" data-sound="${value}">${name} <span class="m-play">⏭</span> <span class="m-stop">⏹</span></em></p>`
    ui.notifications.info(`Copied Mood: ${_link}`);
    navigator.clipboard.writeText(_link);
}