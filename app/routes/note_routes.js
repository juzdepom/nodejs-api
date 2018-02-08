module.exports = function(app, client){

    app.post('/notes', (req, res) => {
        var db = client.db('nodejs-api')
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