const installButton = document.getElementById('buttonInstall');

// Event handler for the 'beforeinstallprompt' event
window.addEventListener('beforeinstallprompt', (e) => {
    window.deferredInstallPrompt = e;
    installButton.classList.remove('hidden');
});

// Click event handler for the install button
installButton.addEventListener('click', async () => {
    if (!window.deferredInstallPrompt) {
        return;
    }

    window.deferredInstallPrompt.prompt();
    window.deferredInstallPrompt = null;
    installButton.classList.add('hidden');
});

// Event handler for the 'appinstalled' event
window.addEventListener('appinstalled', (e) => {
    window.deferredInstallPrompt = null;
});
