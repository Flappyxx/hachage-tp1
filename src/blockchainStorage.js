import {readFile, writeFile} from 'node:fs/promises'
import {getDate, monSecret} from "./divers.js";
import {NotFoundError} from "./errors.js";
import {createHash} from 'node:crypto'
import {uuid} from "uuidv4";


/* Chemin de stockage des blocks */
const path = '../data/blockchain.json'

/**
 * Mes définitions
 * @typedef { id: string, nom: string, don: number, date: string,hash: string} Block
 * @property {string} id
 * @property {string} nom
 * @property {number} don
 * @property {string} date
 * @property {string} string
 *
 */

/**
 * Renvoie un tableau json de tous les blocks
 * @return {Promise<any>}
 */
export async function findBlocks() {
    try {
        const filePath = new URL(path, import.meta.url)
        const contents = await readFile(filePath, {encoding: 'utf8'})
        let content
        if(contents == ""){
            content = [];
        }
        else{content = JSON.parse(contents);}
        return (content);
    }
    catch (err) {
        console.error(err.message)
    }
}

/**
 * Trouve un block à partir de son id
 * @param partialBlock
 * @return {Promise<Block[]>}
 */
export async function findBlock(partialBlock) {
    // A coder
}

/**
 * Trouve le dernier block de la chaine
 * @return {Promise<Block|null>}
 */
export async function findLastBlock() {
    // A coder
}

/**
 * Creation d'un block depuis le contenu json
 * @param contenu
 * @return {Promise<Block[]>}
 */
export async function createBlock(contenu) {

    const id = uuid();
    const date = getDate();
    const nom = contenu.nom;
    const don = contenu.don;

    const data = {
        id : id,
        date : date,
        nom : nom,
        don : don
    }

    const content = await findBlocks();

    const res = [...content,data]
    writeFile(path,JSON.stringify(res),'utf8');
    return res;
}

