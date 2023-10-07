if ('serviceWorker' in navigator && 'PushManager' in window) {
    navigator.serviceWorker
        .register('/service-worker.js')
        .then(function (registration) {
            console.log('Service Worker registrado com sucesso:', registration);
        })
        .catch(function (error) {
            console.error('Erro ao registrar o Service Worker:', error);
        });

    // Solicitar permissão para notificações
    Notification.requestPermission().then(function (permission) {
        if (permission === 'granted') {
            console.log('Permissão para notificações concedida.');
        } else {
            console.warn('Permissão para notificações negada.');
        }
    });
}