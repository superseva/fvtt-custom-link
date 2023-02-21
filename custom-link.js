Hooks.on("init", ()=>{
    registerSettings();
    CONFIG.TextEditor.enrichers = CONFIG.TextEditor.enrichers.concat([
        {
          pattern : /@syrmod\[(.+?)\]/gm,
          enricher : async (match, options) => {
            const span = document.createElement("span");
            span.innerHTML = `Mod: <em class="syrin-link" data-sound="${match[1]}">${match[1]} <span class="m-play">⏭</span> <span class="m-stop">⏹</span></em>`
            return span;
          }
        },
        {
            pattern : /@syrel\[(.+?)\]/gm,
            enricher : async (match, options) => {
              const span = document.createElement("span");
              span.innerHTML = `Mod: <em class="syrin-link" data-sound="${match[1]}">${match[1]} <span class="s-play">⏭</span> <span class="s-stop">⏹</span></em>`
              return span;
            }
          }
      ])
})




Hooks.on("renderJournalPageSheet", (app, html, page  )=>{
    const key = game.settings.get('fvtt-custom-link', 'syrin-api-key');;
    const $playElement =  html.find('.s-play')
    const $stopElement =  html.find('.s-stop')
    $playElement.on('click', function( event ){
        event.stopImmediatePropagation();
        const _id = $(this).parents('.syrin-link').data("sound");        
        const _action = "play";
        controlSyrinElement(_id, _action , key)}
    )
    $stopElement.on('click', function( event ){
        event.stopImmediatePropagation();
        const _id = $(this).parents('.syrin-link').data("sound");
        const _action = "stop";
        controlSyrinElement(_id, _action , key)}
    )

    const $playMood =  html.find('.m-play')
    const $stopMood =  html.find('.m-stop')
    $playMood.on('click', function( event ){
        event.stopImmediatePropagation();
        const _id = $(this).parents('.syrin-link').data("sound");        
        const _action = "play";
        controlSyrinMood(_id, _action , key)}
    )
    $stopMood.on('click', function( event ){
        event.stopImmediatePropagation();
        const _id = $(this).parents('.syrin-link').data("sound");
        const _action = "stop";
        controlSyrinMood(_id, _action , key)}
    )
})

const controlSyrinElement = async(id, action, key) => {
    await fetch(`https://syrinscape.com/online/frontend-api/elements/${id}/${action}/?auth_token=${key}`);
}
const controlSyrinMood = async(id, action, key) => {
    await fetch(`https://syrinscape.com/online/frontend-api/moods/${id}/${action}/?auth_token=${key}`);
}

const registerSettings = ()=> {
    game.settings.register('fvtt-custom-link', 'syrin-api-key', {
        name: 'Syrinscape API Key',
        hint: "Your Syrinscape API Key",
        scope: 'world',
        config: true,
        default: "",
        type: String,
    })
}