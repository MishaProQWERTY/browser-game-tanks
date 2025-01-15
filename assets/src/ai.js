const neuralNet = require('./neuralNet')

module.exports = function (inputCount, outputCount, learningRate, layers) {
    return new neuralNet(inputCount, outputCount, learningRate, layers)
}

module.exports.predict = function (inputSignals, ai) {
    return neuralNet.predict(inputSignals, ai)
}