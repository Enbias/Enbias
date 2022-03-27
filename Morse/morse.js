let setningEl = document.querySelector('#setning')
        let herKommerEl = document.querySelector('#herKommer')
        let textEl = document.querySelector('#text')

        let morse = {
            "a": ".- ",
            "b": "-... ",
            "c": "-.-. ",
            "d": "-.. ",
            "e": ". ",
            "f": "..-. ",
            "g": "--. ",
            "h": ".... ",
            "i": ".. ",
            "j": ".--- ",
            "k": "-.- ",
            "l": ".-.. ",
            "m": "-- ",
            "n": "-. ",
            "o": "--- ",
            "p": ".--. ",
            "q": "--.- ",
            "r": ".-. ",
            "s": "... ",
            "t": "- ",
            "u": "..- ",
            "v": "...- ",
            "w": ".-- ",
            "x": "-..- ",
            "y": "-.-- ",
            "z": "--.. ",
            "æ": ".-.- ",
            "ø": "---. ",
            "å": ".--.- ",

            //tall

            "0": "----- ",
            "1": ".---- ",
            "2": "..--- ",
            "3": "...-- ",
            "4": "....- ",
            "5": "..... ",
            "6": "-.... ",
            "7": "--... ",
            "8": "---.. ",
            "9": "----. ",

            ".":".-.-.- ",
            ",":"--..-- ",
            "?": "..--.. ",
            "'": ".----. ",
            "/": "-..-. ",
            "(": "-.--. ",
            ")": "-.--.- ",
            ":": "---... ",
            ";": "-.-.-. ",
            "=": "-...- ",
            "+": ".-.-. ",
            "-": "-....- ",
            "@": ".--.-. ",

            "ü": "..-- ",






            " ": "/ ",

            //store bokstaver
            "A": ".- ",
            "B": "-... ",
            "C": ".-.- ",
            "D": "-.. ",
            "E": ". ",
            "F": "..-. ",
            "G": "--. ",
            "H": ".... ",
            "I": ".. ",
            "J": ".--- ",
            "K": "-.- ",
            "L": ".-.. ",
            "M": "-- ",
            "N": "-. ",
            "O": "--- ",
            "P": ".--. ",
            "Q": "--.- ",
            "R": ".-. ",
            "S": "... ",
            "T": "- ",
            "U": "..- ",
            "V": "...- ",
            "W": ".-- ",
            "X": "-..- ",
            "Y": "-.-- ",
            "Z": "--.. ",
            "Æ": ".-.- ",
            "Ø": "---. ",
            "Å": ".--.- ",
            

            "Ü": "..-- ",

            


        }


        textEl.addEventListener('input', bliMorse)

        function bliMorse() {
            let output = ""
            let tekst = textEl.value;
            for (let i = 0; i < tekst.length; i++) {
                let bokstav = tekst[i]
                output += morse[bokstav]

            }

            herKommer.innerText = output
        }



        //
    let setning2El = document.querySelector('#setning2')
let herKommer2El = document.querySelector('#herKommer2')
let text2El = document.querySelector('#text2')



let fraMorseTilTekst = {
    ".-": "a",
    "-...": "b",
    "-.-.": "c",
    "-..": "d",
    ".": "e",
    "..-.": "f",
    "--.": "g",
    "....": "h",
    "..": "i",
    ".---": "j",
    "-.-": "k",
    ".-..": "l",
    "--": "m",
    "-.": "n",
    "---": "o",
    ".--.": "p",
    "--.-": "q",
    ".-.": "r",
    "...": "s",
    "-": "t",
    "..-": "u",
    "...-": "v",
    ".--": "w",
    "-..-": "x",
    "-.--": "y",
    "--..": "z",
    ".-.-": "æ",
    "---.": "ø",
    ".--.-": "å",

    "-----": "0",
    ".----": "1",
    "..---": "2",
    "...--": "3",
    "....-": "4",
    ".....": "5",
    "-....": "6",
    "--...": "7",
    "---..": "8",
    "----.": "9",

    ".-.-.-": ".",
    "--..--": ",",
    "..--..": "?",
    ".----.": "'",
    "-..-.": "/",
    "-.--.": "(",
    "-.--.-": ")",
    "---...": ":",
    "-.-.-.": ";",
    "-...-": "=",
    ".-.-.": "+",
    "-....-": "-",
    ".--.-.": "@",

    "..--": "ü",

    "/": " ",
    "  ": "&",
}

text2El.addEventListener('input', sjekkMe)


function sjekkMe() {
    let input2 = text2El.value
    let kode2 = ""
    let output2 = ""
    for (let i = 0; i < input2.length; i++) {
        let tegn2 = input2[i]
        if (tegn2 === " ") {
            console.log(kode2)
            console.log(fraMorseTilTekst[kode2])
            output2 += fraMorseTilTekst[kode2]
            kode2 = ""
        } else {
            kode2 += tegn2
        }
        console.log(kode2)
    }
    herKommer2El.innerHTML = output2
}

 