import { updateDoc, arrayUnion, arrayRemove, db, doc } from "../src/Firebase/firebase";
import { giveLike, dislike } from "../src/firebase/firestore-funct";

jest.mock('../src/Firebase/firebase.js', () => ({    
    updateDoc: jest.fn(),
    arrayUnion: jest.fn(),
    arrayRemove: jest.fn(),
    db: jest.fn(),
    doc: jest.fn()
}));


describe('Test para giveLike', () => {
    it('giveLike debería ser una funcion', () => {
        expect(typeof giveLike).toBe('function')
    });
    it('giveLike debería llamar a updateDoc con sus parámetros y agregar un like a un post', () => {
        giveLike('id', 'user1');
        expect(updateDoc).toHaveBeenCalledWith(doc(db, 'documents', 'id'), {
            likes: arrayUnion('userSignedId'),
        })
    })
});

describe('Test para dislike', () => {
    it('dislike debería ser una funcion', () => {
        expect(typeof dislike).toBe('function')
    });
    it('dislike debería llamar a updateDoc con sus parámetros y remover un like a un post', () => {
        dislike('id', 'userSignedId');
        expect(updateDoc).toHaveBeenCalledWith(doc(db, 'documents', 'id'), {
            likes: arrayRemove('userSignedId'),
        })
    })
});