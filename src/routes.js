const {saveBook, getAllBook, getDetailBook,editDataBook, deleteDataBook} = require('./handler')

const routes = 
[
    {
        method: 'POST',
        path: '/books',
        handler: saveBook
    },
    {
        method: 'GET',
        path: '/books',
        handler: getAllBook
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: getDetailBook
    },
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: editDataBook
    },
    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: deleteDataBook
    }
]


module.exports = routes;