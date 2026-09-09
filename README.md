# TP3 - API de gestion de tâches

## TLDR
> Cette API utilise Express pour créer des routes REST permettant de gérer une liste de tâches.
> Elle peut être testée via Postman ou Bruno.
> Les tâches sont stockées en mémoire (pas de base de données).

## Routes overview

| Method | Route |
| --- | --- |
| **GET** | `http://localhost:3000/tasks` |
| **POST** | `http://localhost:3000/tasks` |
| **PUT** | `http://localhost:3000/tasks/:id` |
| **DELETE** | `http://localhost:3000/tasks/:id` |

## Routes details

### GET route

> Renvoie la liste complète des tâches, avec une option de filtrage par statut.
>
> Filtrage : `?status=completed` ou `?status=uncompleted`

#### Requests

```
GET http://localhost:3000/tasks
```
-> Result
```json
{
  "message": "3 tasks found",
  "tasks": [
    { "id": 1, "titre": "Dire coucou a Lenny", "complete": true },
    { "id": 2, "titre": "dire coucou", "complete": false },
    { "id": 3, "titre": "dire coucou", "complete": false }
  ]
}
```

---

```
GET http://localhost:3000/tasks?status=completed
```
-> Result
```json
{
  "message": "1 completed tasks found",
  "filteredTasks": [
    { "id": 1, "titre": "Dire coucou a Lenny", "complete": true }
  ]
}
```

---

```
GET http://localhost:3000/tasks?status=uncompleted
```
-> Result
```json
{
  "message": "2 uncompleted tasks found",
  "filteredTasks": [
    { "id": 2, "titre": "dire coucou", "complete": false },
    { "id": 3, "titre": "dire coucou", "complete": false }
  ]
}
```

---

```
GET http://localhost:3000/tasks?status=xyz
```
-> Result (400)
```json
{ "message": "incorrect status" }
```

### POST route

> Crée une nouvelle tâche à partir du titre fourni.
>
> Le titre est obligatoire, sinon une erreur 400 est renvoyée.

#### Requests

```
POST http://localhost:3000/tasks
```
-> Body
```json
{ "titre": "dire coucou" }
```
-> Result (201)
```json
{ "id": 4, "titre": "dire coucou", "complete": false }
```

---

```
POST http://localhost:3000/tasks
```
-> Body
```json
{}
```
-> Result (400)
```json
{ "error": "Le titre est requis" }
```

### PUT Route

> Modifie une tâche existante (titre et/ou statut).
>
> Seuls les champs envoyés sont mis à jour, les autres restent inchangés.
> Si l'id est incorrect, renvoie une erreur 404.

#### Requests

```
PUT http://localhost:3000/tasks/1
```
-> Body
```json
{ "titre": "Dire coucou a Lenny", "complete": true }
```
-> Result (200)
```json
{ "id": 1, "titre": "Dire coucou a Lenny", "complete": true }
```

---

```
PUT http://localhost:3000/tasks/999
```
-> Body
```json
{ "complete": true }
```
-> Result (404)
```json
{ "error": "Tâche non trouvée" }
```

### DELETE Route

> Supprime la tâche correspondant à l'id fourni.
>
> Si l'id est incorrect, renvoie une erreur 404.
> En cas de succès, renvoie un statut 204 sans contenu.

#### Requests

```
DELETE http://localhost:3000/tasks/2
```
-> Result (204)
```
(pas de contenu)
```

---

```
DELETE http://localhost:3000/tasks/2
```
-> Result (404)
```json
{ "error": "Tâche non trouvée" }
```