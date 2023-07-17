const Max_Letter_Per_Row = 5
const Max_Attemps = 6

const Key_Backspace = 'Backspace'
const Key_Enter = 'Enter'
const Key_Delete = 'Delete'

const Sucess_Letter_Display_Notification = 'Showing letter with success'
const Pressed_Backspace_Notification = 'Backspace key pressed'
const Empty_Guess_Backspace_Notification = 'Could not erase when is an empty guess'
const Pressed_Enter_Notification = 'Enter key pressed'
const Empty_Guess_Notification = 'Empty guess'
const Incomplete_Guess_Notification = 'Incomplete guess'
const Pressed_Invalid_Key_Notification = 'Invalid Pressed Key'
const Reach_Max_Attemps_Notification = 'Reach Max Attempts'
const Reach_Max_Letters_Per_Row_Notification = 'Reach Max letter per row'
const Word_Not_In_Database_Notification = 'Word not in database'

const initialConfig = {
    database: [],
    current_row: 1,
    current_letter_position: 1,
    current_guess: '',
    right_guess: ''
}

const getOneRandomWord = (words_list) => {
    const count_words = words_list.length
    const shuffle_index = Math.floor(Math.random() * count_words)
    return words_list[shuffle_index]
}

const getGameBoardLetter = (current_row, current_letter_position) => {
    return document.querySelector(`.board-game .row-${current_row} .letter-${current_letter_position}`)
}

const isBackspaceKeyPressed = (pressed_key) => {
    return [Key_Backspace, Key_Delete].includes(pressed_key)
}

const isEnterKeyPressed = (pressed_key) => {
    return pressed_key === Key_Enter
}

const isOneAlphabeticLetter = (pressed_key) => {
    return pressed_key.length === 1 && /[A-Za-z]/.test(pressed_key)
}

const isValidKeyPressed = (pressed_Key) => {
    return isEnterKeyPressed(pressed_Key) 
            || isBackspaceKeyPressed(pressed_Key)
            || isOneAlphabeticLetter(pressed_Key)
}

const isGuessInDatabase = (guess, database) => {
    return database.includes(guess.toLowerCase())
}

const isCurrentGuessEmpty = (current_guess) => {
    return current_guess === ''
}

const reachMaxLetterPerRow = (current_letter_position) => {
    return current_letter_position > Max_Letter_Per_Row
}

const reachMaxAttempts = (current_row) => {
    return current_row > Max_Attemps
}

const removeLastLetter = (current_guess) => {
    return current_guess.slice(0, current_guess.length - 1)
}

const removeLetterFromBoard = (game) => {
    const { current_guess, current_row, current_letter_position } = game

    game.currentGuess = removeLastLetter(current_guess)
    game.current_letter_position--

    const element = getGameBoardLetter(current_row, current_letter_position - 1)
    element.textContent = ''

    return Pressed_Backspace_Notification
}

const displayLetterOnTheBoard = (game, pressed_key) => {
    const {current_row, current_letter_position} = game

    const element = getGameBoardLetter(current_row, current_letter_position)
    element.textContent = pressed_key

    game.current_guess += pressed_key
    game.current_letter_position++

    return Sucess_Letter_Display_Notification
}

const nextGuess = (game) => {
    game.current_row++
    game.current_guess = ''
    game.current_letter_position = 1

    return Pressed_Enter_Notification
}

const checkGuess = (game) => {
    const { database, current_letter_position, current_guess } = game

    if (isCurrentGuessEmpty(current_guess)) {
        return Empty_Guess_Notification
    }

    if (!reachMaxLetterPerRow(current_letter_position)) {
        return Incomplete_Guess_Notification
    }

    if (!isGuessInDatabase(current_guess, database)) {
        return Word_Not_In_Database_Notification
    }

    return nextGuess(game)
}

const onKeyPressed = (pressed_key, game) => {
    const { current_letter_position, current_guess, current_row } = game

    if (reachMaxAttempts(current_row)) {
        return Reach_Max_Attemps_Notification
    }

    if (!isValidKeyPressed(pressed_key)) {
        return Pressed_Invalid_Key_Notification
    }

    if (isBackspaceKeyPressed(pressed_key) && !isCurrentGuessEmpty(current_guess)) {
        return removeLetterFromBoard(game)
    }

    if (isBackspaceKeyPressed(pressed_key) && isCurrentGuessEmpty(current_guess)) {
        return Empty_Guess_Backspace_Notification
    }

    if (isEnterKeyPressed(pressed_key)) {
        return checkGuess(game)
    }

    if (reachMaxLetterPerRow(current_letter_position)) {
        return Reach_Max_Letters_Per_Row_Notification
    }

    return displayLetterOnTheBoard(game, pressed_key)
}

const testEnviroment = () => {
    return typeof process !== 'undefined'
            && process.env.NODE_ENV === 'test'
}

const loadWords = async () => {
    return fetch('./resources/assets/json/words.json')
                    .then((res) => res.json())
                    .then(({ words }) => words)
                    .catch(() => [])
}

const start = () => {
    if (testEnviroment()) {
        module.exports = {  
            checkGuess,
            nextGuess,
            displayLetterOnTheBoard,
            removeLetterFromBoard,
            removeLastLetter,
            getOneRandomWord,
            isBackspaceKeyPressed,
            isCurrentGuessEmpty,
            isGuessInDatabase,
            isEnterKeyPressed,
            isValidKeyPressed,
            testEnviroment,
            loadWords,
            onKeyPressed,
            reachMaxAttempts,
            reachMaxLetterPerRow
        }
        return
    }
    window.onload = async () => {
        const database = await loadWords()

        const game = { ...initialConfig, database }
        console.log(database)
        console.log('get one random word: ', getOneRandomWord(database))

        document.addEventListener('keydown', (event) => onKeyPressed(event.key, game))
    }
}

start();