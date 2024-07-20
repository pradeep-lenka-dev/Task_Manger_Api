const validateTasks = (req ,res, next) => {
 const {title,description,completed} = req.body
 if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required and must be a string.' });
}
if (!description || typeof description !== 'string' || description.trim() === '') {
    return res.status(400).json({ error: 'Description is required and must be a string.' });
}
if (typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'Completed status must be true or false.' });
}
next();
}

module.exports  = validateTasks;