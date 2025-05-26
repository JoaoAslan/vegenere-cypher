const msg = "ATACARBASENORTE"
const key = "FOGO"
const code = vigenereCypher(key, msg)

console.log("\nMSG: " + validate(msg))
console.log("KEY: " + validate(key))
console.log("CODE: " + code)

// Vigenere's cypher logic
function vigenereCypher(key, msg) {
    msg = validate(msg)
    key = extendKey(validate(key), msg.length)

    let code = ""
    for (let i = 0; i < key.length; i++) {
        const ENCODE_A = "A".charCodeAt(0)

        const indexMsg = msg[i].charCodeAt(0) - ENCODE_A
        const indexKey = key[i].charCodeAt(0) - ENCODE_A
        const indexCode = (indexMsg + indexKey) % 26
        code += String.fromCharCode(indexCode + ENCODE_A)
    }
    return code
}

// Return the extended vesion of key based on the length of message
function extendKey(key, len) {
    let format_key = ""
    for (let i = 0; i < len; i++) {
        format_key += key[i % key.length]
    }
    return format_key
}

function validate(text) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    text = text.toUpperCase().trim()
    let validText = ""
    for (let i = 0; i < text.length; i++) { 
        if (alphabet.includes(text[i])) {
            validText += text[i]
        }
    }
    if (!(validText == text)) {
        console.log("* Text validation deleted some values!")
    }
    return validText
}