const installBtn = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();

    window.deferredPrompt = event;

    installBtn.style.visibility = 'visible';
});

// TODO: Implement a click event handler on the `butInstall` element
installBtn.addEventListener('click', async () => {
    console.log("click")
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
        return;
    }
    promptEvent.prompt();
    window.deferredPrompt = null;
    installBtn.classList.toggle('hidden', true);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('👍', 'appinstalled', event);
    window.deferredPrompt = null;
});
