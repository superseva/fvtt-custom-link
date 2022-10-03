Hooks.on("init", ()=>{
    registerSettings()
})

Hooks.on("renderJournalPageSheet", (app, html, page  )=>{
    const key = game.settings.get('fvtt-custom-link', 'syrin-api-key');;
    const $play =  html.find('.s-play')
    const $stop =  html.find('.s-stop')
    $play.on('click', function( event ){
        event.stopImmediatePropagation();
        const _id = $(this).parents('.syrin-link').data("sound");        
        const _action = "play";
        fetchSyrinSound(_id, _action , key)}
    )
    $stop.on('click', function( event ){
        event.stopImmediatePropagation();
        const _id = $(this).parents('.syrin-link').data("sound");
        const _action = "stop";
        fetchSyrinSound(_id, _action , key)}
    )
})

const fetchSyrinSound = async(id, action, key) => {
    await fetch(`https://syrinscape.com/online/frontend-api/elements/${id}/${action}/?auth_token=${key}`);
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