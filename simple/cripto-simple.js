const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

const msg = "Atacar base Norte"
const key = "FOGO"

const encoded = encoderMsg(msg, key)
const decoded = decryptCode(encoded, key)

console.log("Codificado:", encoded)
console.log("Decodificado:", decoded)

// Retorna o código gerado pela mensagem e chave dadas como argumento
function encoderMsg(msg, key) {
    let code = "", nonAlphabetCount = 0
    for (let i = 0; i < msg.length; i++) {
        if (!(hasInAlphabet(msg[i]))) {
            code += msg[i]
            nonAlphabetCount++ // Variavel que controla os saltos da chave
            continue
        }
        const loopKey = key[(i - nonAlphabetCount) % key.length]
        const letter_case = defineCase(msg[i], loopKey)
        const indexCode = (letter_case.charIndex + letter_case.keyIndex) % 26
        code += String.fromCharCode(indexCode + letter_case.base)
    }
    return code
}

// Retorna a mensagem original com base no código e chave dadas como arguntento
function decryptCode(code, key) {
    let msg = "", nonAlphabetCount = 0
    for (let i = 0; i < code.length; i++) {
        if (!(hasInAlphabet(code[i]))) {
            msg += code[i]
            nonAlphabetCount++ // Variavel que controla os saltos da chave
            continue
        }
        const loopKey = key[(i - nonAlphabetCount) % key.length]

        const letter_case = defineCase(code[i], loopKey)
        const indexMsg = (letter_case.charIndex - letter_case.keyIndex + 26) % 26
        msg += String.fromCharCode(indexMsg + letter_case.base)
    }
    return msg
}

/* Define se a letra passada é maiuscula ou minuscula, definindo assim sua posição com base na tabela ASCII
    https://www.ascii-code.com/
*/
function defineCase(char, keyChar) {
    const LOWER_A = "a".charCodeAt(0)
    const UPPER_A = "A".charCodeAt(0)
    let base, caseKey
    if (char === char.toUpperCase()) {
        base = UPPER_A
        caseKey = keyChar.toUpperCase()
    } else {
        base = LOWER_A
        caseKey = keyChar.toLowerCase()
    }
    const charIndex = char.charCodeAt(0) - base
    const keyIndex = caseKey.charCodeAt(0) - base
    return { base, charIndex, keyIndex }
}

function hasInAlphabet(char) {
    return alphabet.includes(char)
}