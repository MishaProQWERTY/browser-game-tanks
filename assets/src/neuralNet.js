const Neuron = require('./neuron')
const Layer = require('./layer')

module.exports = class NeuralNet {
    constructor (inputCount = 1, outputCount = 1, learningRate = 0.3, layers = []) {
        this.topology = {
            inputCount: inputCount,
            outputCount: outputCount,
            learningRate: learningRate,
            hiddenLayers: layers
        }

        this.layers = []

        let inputNeurons = []
        for (let i = 0; i < this.topology.inputCount; i++) {
            let neuron = new Neuron(1, 0)
            inputNeurons.push(neuron)
        }
        let inputLayer = new Layer(inputNeurons, 0)
        this.layers.push(inputLayer)

        for (let j = 0; j < this.topology.hiddenLayers.length; j++) {
            let hiddenNeurons = []
            let lastLayer = this.layers[j]
            for (let i = 0; i < this.topology.hiddenLayers[j]; i++) {
                let neuron = new Neuron(lastLayer.neurons.length)
                hiddenNeurons.push(neuron)
            }
            let hiddenLayer = new Layer(hiddenNeurons)
            this.layers.push(hiddenLayer)
        }

        let outputNeurons = []
        for (let i = 0; i < this.topology.outputCount; i++) {
            let neuron = new Neuron(this.layers[this.layers.length-1].neurons.length, 2)
            outputNeurons.push(neuron)
        }
        let outputLayer = new Layer(outputNeurons, 2)
        this.layers.push(outputLayer)
    }
}

module.exports.predict = function (inputSignals, ai) {
    for (let i = 0; i < inputSignals.length; i++) {
        let signal = [inputSignals[i]]
        let neuron = ai.layers[0].neurons[i]

        feedForward(signal, neuron)
    }

    for (let i = 1; i < ai.layers.length; i++) {
        let layer = ai.layers[i]
        let previousLayerSingals = getSignals(ai.layers[i - 1])
        layer.neurons.forEach(neuron => feedForward(previousLayerSingals, neuron))
    }

    let neuronOutput = []
        
    for (let i = 0; i < ai.layers[ai.layers.length - 1].neurons.length; i++) {
        let neuronVal = ai.layers[ai.layers.length - 1].neurons[i]
        neuronOutput.push(neuronVal)
    }
    
    return neuronOutput
}

function feedForward (inputs, neuron) {
    for (let i = 0; i < inputs.length; i++) {
        neuron.inputs[i] = inputs[i]
    }
    let sum = 0.0

    for (let i = 0; i < inputs.length; i++) {
        sum += inputs[i] * neuron.weights[i]
    }

    if (neuron.type != 1) neuron.output = sigmoid(sum)
    else neuron.output = sum

    return neuron.output
}

function sigmoid (x) {
    let result = 1.0 / (1.0 + Math.pow(Math.E, -x))
    return result
}

function getSignals (layer) {
    let result = []
    layer.neurons.forEach(neuron => result.push(neuron.output))
    return result
}