const express = require('express');
const app = express();
const PORT = 3000

let tasks = [];
let nextId = 1;

app.use(express.json());
app.get('/', (req, res) => {
    res.send('API de gestion de taches en fonctionnement');
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

app.post('/tasks', (req, res) => {
    const { titre } = req.body;

    if (!titre) {
        return res.status(400).json({ error: 'Le titre est requis' });
    }

    const nouvelleTache = {
        id: nextId++,
        titre: titre,
        complete: false
    };

    tasks.push(nouvelleTache);
    res.status(201).json(nouvelleTache);
});

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.put('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { titre, complete } = req.body;

    if (!tache) {
        return res.status(404).json({ error: 'Tâche non trouvée' });
    }

    if (titre !== undefined) tache.titre = titre;
    if (complete !== undefined) tache.complete = complete;

    res.json(tache);
});

app.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const index = tasks.findIndex(t => t.id === id);

    if (index === -1) {
        return res.status(404).json({ error: 'Tâche non trouvée' });
    }

    tasks.splice(index, 1);
    res.status(204).send();
});