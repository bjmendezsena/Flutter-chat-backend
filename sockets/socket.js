const {io} = require('../index');

// Mensajes de sockets
io.on('connection', client => {
    console.log('Cliente conectado');    

    client.on('disconnect' , () => {
        console.log('Cliente desconectado');
    });


    client.on('mensaje', (payload) => {
        console.log('El cliente envió: ',payload);

        io.emit('mensaje', {admin: 'Nuevo mensaje'});
    });

    client.on('emitir-mensaje', (payload) => {
        // io.emit('nuevo-mensaje', payload); //Emite a todos
        client.broadcast.emit('nuevo-mensaje', payload); //Emite a todos menos el que lo emitió
    });

    client.on('vote-band', (payload) => {
    });

    client.on('add-band', (payload) => {
        const newBand = new Band(payload.name);
    });

    client.on('delete-band', (payload) => {


    });
});