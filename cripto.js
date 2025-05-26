
const msg = "ATACARBASENORTE"
const key = "FOGO"
const extended_key = extend(key, msg)

/* Return the Cesar's alphabet based on caracter especified
   It's the first part of the Vigenere's cypher
*/
function cesarCypher(char) {
    alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    move = char.charCodeAt(0) - 65
    let cesar = alphabet.slice(move).concat(alphabet.slice(0, move))
    return cesar
}

// Return the extended vesion of key based on the length of message
function extend(key, msg) {
    let format_key = ""
    for (let i = 0; i < msg.length; i++) {
        let index = i
        if (index >= key.length) {
            index -= Math.floor(format_key.length / key.length) * key.length
        }
        format_key += key[index]
    }
    return format_key
}
