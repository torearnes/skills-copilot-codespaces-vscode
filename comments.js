// create webserver
// create a route
// create a route handler
// listen for incoming requests on port 3000

import express from 'express';
import { json } from 'body-parser';
import { randomBytes } from 'crypto';
import cors from 'cors';

// create express app
const app = express();
app.use(json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;

    const comments = commentsByPostId[req.params.id] || [];

    comments.push({ id: commentId, content });

    commentsByPostId[req.params.id] = comments;

    res.status(201).send(comments);
});

app.listen(4001, () => {
    console.log('Listening on 4001');
});