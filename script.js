class Calculator{
    constructor(previousOperandInnerText, currentOperandInnerText){
        this.previousOperandInnerText = previousOperandInnerText
        this.currentOperandInnerText = currentOperandInnerText
        this.clear()
    }

    clear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    allClear(){
        this.currentOperand = ''
        this.previousOperandInnerText.innerText = ''
    }

    delete(){
        this.currentOperand = this.currentOperand.slice(0, -1)
    }

    chooseOperation(operation){
        this.operation = operation
        if(this.operation != undefined){
            this.previousOperandInnerText.innerText = this.currentOperand + operation
            this.currentOperand = ''
        }
    }

    compute(){
        let computation
        let previous = parseFloat(this.previousOperandInnerText.innerText)
        let current = parseFloat(this.currentOperand)
        if(isNaN(previous) || isNaN(current)) return
        switch(this.operation){
            case '+':
                computation = previous + current
                break
            case '-':
                computation = previous - current
                break
            case '*':
                computation = previous * current
                break
            case '/':
                if(current === 0){
                    computation = 'Cannot divide by 0'
                    break
                }
                computation = previous / current
                break
            default:
                break
        }
        this.currentOperand = computation
        this.previousOperandInnerText.innerText = ''
    }

    appendNumber(number){
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    getDisplayNumber(){}

    updateDisplay(){
        this.currentOperandInnerText.innerText = this.currentOperand
        
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const allClearButton = document.querySelector('[data-all-clear]')
const deleteButton = document.querySelector('[data-delete]')
const equalsButton = document.querySelector('[data-equals]')
const previousOperandTextElement = document.querySelector('[previous-operand]')
const currentOperandTextElement = document.querySelector('[current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button =>{
    button.addEventListener('click', () =>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button =>{
    button.addEventListener('click', () =>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', () =>{
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', () =>{
    calculator.allClear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', () =>{
    calculator.delete()
    calculator.updateDisplay()
})

document.body.addEventListener('keydown', (ev) =>{
    for (let i = 0; i < numberButtons.length; i++) {
        if(ev.key === numberButtons[i].innerText){
            calculator.appendNumber(ev.key)
            calculator.updateDisplay()
        }
    }
})
document.body.addEventListener('keydown', (ev) =>{
    for (let i = 0; i < operationButtons.length; i++) {
        if(ev.key === operationButtons[i].innerText){
            calculator.chooseOperation(ev.key)
            calculator.updateDisplay()
        }
    }
})
document.body.addEventListener('keydown', (ev) =>{
    if(ev.key === 'Backspace' || ev.key === 'Delete'){
        calculator.delete()
        calculator.updateDisplay()
    }
})
document.body.addEventListener('keydown', (ev) =>{
    if(ev.key === 'Enter'){
        calculator.compute()
        calculator.updateDisplay()
    }
})
document.body.addEventListener('keydown', (ev) =>{
    if(ev.key === 'Escape'){
        calculator.allClear()
        calculator.updateDisplay()
    }
})

