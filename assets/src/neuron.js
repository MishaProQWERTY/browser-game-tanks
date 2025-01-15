module.exports = class Neuron {
    constructor (inputCount, type = 1) {
        this.weights = []
        this.inputs = []

        this.type = type

        this.output = 0
        this.delta = 0

        for (let i = 0; i < inputCount; i++) {
            if (this.type = 0) this.weights.push(1)
            else this.weights.push(Math.random())
            this.inputs.push(0)
        }
    }
}