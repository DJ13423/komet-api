export default class TokenGenerator {
    private static upperCaseLetters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    private static lowerCaseLetters: string = 'abcdefghijklmnopqrstuvwxyz'
    private static numbers: string = '0123456789'

    private static getRandomCharacter(): string {
        const characters: string = this.upperCaseLetters + this.lowerCaseLetters + this.numbers
        return characters.charAt(Math.floor(Math.random() * characters.length))
    }

    static generate(): string {
        let year = new Date().getUTCFullYear()
        let month = new Date().getUTCMonth() + 1
        let day = new Date().getUTCDate()
        let hour = new Date().getUTCHours()
        let yearString = year.toString().substring(2, 4)
        let monthString = month < 10 ? '0' + month.toString() : month.toString()
        let dayString = day < 10 ? '0' + day.toString() : day.toString()
        let hourString = hour < 10 ? '0' + hour.toString() : hour.toString()
        let token: string = yearString + monthString + dayString + hourString
        token += '.'
        for (let i = 0; i < 9; i++) {
            token += this.getRandomCharacter()
        }
        return token
    }
}
