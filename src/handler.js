const { nanoid } = require("nanoid");
const container = require("./storage");


const saveBook = (request,h) => {
    const id = nanoid(16);

    const {name,year,author,summary,publisher,pageCount,readPage,reading} = request.payload;
    const finished = pageCount === readPage;
    const insertedAt = new Date().toISOString();
    const updatedAt =insertedAt;

    if(name === undefined){
        const respons = h.response({
            'status': 'fail',
            'message': 'Gagal menambahkan buku. Mohon isi nama buku'
        }).code(400);
        return respons;
    } else if(readPage > pageCount){
        const respons = h.response({ 
            'status': 'fail',
            'message': 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
        }).code(400)
        return respons;
    }

    const saveAllData = {
        id,name,year,author,summary,publisher,pageCount,readPage,finished,readPage,insertedAt,updatedAt,reading
    }

    container.push(saveAllData);

    const succesFilter = container.filter((data)=>data.id === id).length > 0 ;
    if(succesFilter){
        const respons = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id
            }
        }).code(201)

        return respons;
    }
}

const getAllBook = (request,h) => {
    const {name} = request.query;
    const book = container;

    if(name !== undefined){
        book = book.filter((data)=>data.name.toLowerCase());
    }
 
    const respons = h.response({
        status: 'success',
        data: {
            books: 
                book.map((data)=>({
                    id: data.id,
                    name: data.name,
                    publisher: data.publisher
                }))
            
        }
    }).code(200);
    return respons;
}

const getDetailBook = (request,h) =>{
    const {bookId} = request.params;
    
    const book = container.filter((value)=> value.id === bookId)[0];

    if(book !== undefined){
        return h.response({
            status: 'success',
            data: {
                book
            }
        }).code(200);
    } else {
        return h.response({
            status: 'fail',
            message: 'Buku tidak ditemukan'
        }).code(404);
    }

}

const editDataBook = (request,h) => {
    const {bookId} = request.params;
    
    const {name,year,author,summary,publisher,pageCount,readPage,reading} = request.payload;

    const updatedAt = new Date().toISOString();
    const getId = container.findIndex((index)=>index.id === bookId);


    if(getId !== undefined){
        if(name === undefined){
            const res = h.response({
                status: 'fail',
                message: 'Gagal memperbarui buku. Mohon isi nama buku'
            }).code(400);
            return res;
        }
    }   if(readPage > pageCount){
        const res = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
        }).code(400);
        return res;
    }

    if(getId !== -1){
        container[getId] = {
            ...container[getId],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
            updatedAt
        };

        const res = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui'
        }).code(200);
        return res

    } else{
        const res = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Id tidak ditemukan'
        }).code(404);
        return res;
    }

}

const deleteDataBook = (request,h) => {
    const {bookId} = request.params;
    const getId = container.findIndex((index)=>index.id === bookId);

    if(getId !== -1){
        container.splice(getId,1);
        const res = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus'
        }).code(200);
        return res
    }else {
        const res = h.response({
            status: 'fail',
            message: 'Buku gagal dihapus. Id tidak ditemukan'
        }).code(404);
        return res;
    }

}


module.exports = {saveBook,getAllBook,getDetailBook,editDataBook,deleteDataBook}