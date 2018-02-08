var ObjectID = require('mongodb').ObjectID

module.exports = function(app, client){
    app.get('/notes/:id', (req, res) => {
        const id = req.params.id
        const details = { '_id': new ObjectID(id) }
        const db = client.db('nodejs-api')
        db.collection('notes').findOne(details, (err, item) => {
            if(err){
                res.send({ 'error': 'An error has occurred '})
                client.close()
            } else {
                res.send(item);
            }
        });
    });

    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id
        const details = { '_id': new ObjectID(id) }
        const db = client.db('nodejs-api')
        db.collection('notes').remove(details, (err, item) => {
            if(err){
                res.send({ 'error': 'An error has occurred '})
                client.close()
            } else {
                res.send('Note ' + id + ' deleted!' );
            }
        });
    });

    app.put('/notes/:id', (req, res) => {
        const id = req.params.id
        const details = { '_id': new ObjectID(id) };
        const note = { text: req.body.body, title: req.body.title }
        const db = client.db('nodejs-api')
        db.collection('notes').update(details, note, (err, item) => {
            if(err){
                res.send({ 'error': 'An error has occurred '})
                client.close()
            } else {
                res.send(item);
            }
        });
    });

    app.post('/notes', (req, res) => {
        const db = client.db('nodejs-api')
        const note = { text: req.body.body, title: req.body.title }
        db.collection('notes').insert(note, (err, result) => {
            if(err){
                res.send({ 'error': 'An error has occurred '})
                client.close()
            } else {
                res.send(result.ops[0])
            }
        })
    })
}