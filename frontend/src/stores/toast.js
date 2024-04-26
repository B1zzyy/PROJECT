import { defineStore } from "pinia"

export const useToastStore = defineStore ({
    id: 'toast',

    state: () => ({
        ms: 0, //how many milliseconds we want to show the messages
        message: '',
        classes: '', //error/sucess message
        isVisible: false //dont show before the reposnse
    }),

    actions: { //manipulate the values above
        showToast(ms, message, classes) {
            this.ms = parseInt(ms)
            this.message = message
            this.classes = classes
            this.isVisible = true

            setTimeout(() => {
                this.classes += ' -translate-y-28'
            }, 10) //after 10 ms add the transation to the classes and move up to make visible

            setTimeout (() => {
                this.classes = this.classes.replace('-translate-y-28', '')
            }, this.ms - 500)

            setTimeout(() => {
                this.isVisible = false
            }, this.ms) //after the time the message is no longer visible on screen
        }
    }
})