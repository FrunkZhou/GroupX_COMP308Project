const tf = require("@tensorflow/tfjs");
const tf_node = require("@tensorflow/tfjs-node");
const dataset = require("../dataset/heart.json");

const dataFeatures = tf.tensor2d(
  dataset.map((attr) => [
    attr.age > 50 ? 1 : 0,
    attr.cp > 0 ? 1 : 0,
    attr.sex,
    attr.trestbps,
    attr.chol,
    attr.thalach,
    attr.fbs,
    attr.exang,
  ])
);

// value of 1 = prevalence of heart disease
const outputData = tf.tensor2d(dataset.map((attr) => [attr.target]));

const model = tf.sequential();
model.add(
  tf.layers.dense({
    inputShape: [8],
    activation: "sigmoid", //binary classification
    units: 10, // trial and error for desired hidden layer
  })
);
model.add(
  tf.layers.dense({
    inputShape: [10],
    activation: "sigmoid",
    units: 1,
  })
);
model.add(
  tf.layers.dense({
    activation: "sigmoid",
    units: 1,
  })
);
model.compile({
  loss: "binaryCrossentropy", //negative logit, binary 2-label output
  optimizer: "adam",
  metrics: ["accuracy"],
});

const testData = require("../dataset/testData.json");
const testingData = tf.tensor2d(
  testData.map((attr) => [
    attr.age > 50 ? 1 : 0,
    attr.cp > 0 ? 1 : 0,
    attr.sex,
    attr.trestbps,
    attr.chol,
    attr.thalach,
    attr.fbs,
    attr.exang,
  ])
);

model
  .fit(dataFeatures, outputData, {
    epochs: 50,
    callbacks: {
      onEpochEnd: (epoch, log) => {
        console.log(`Epoch ${epoch}: loss = ${log.loss}`);
      },
    },
  })
  .then((info) => {
    // model.predict(testingData).print();
    model.save("file://../model/heart_disease").then(() => {
      console.log("Model successfully saved.");
    });
  });
