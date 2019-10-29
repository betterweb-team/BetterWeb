/**
 * This is part of the source code of project BetterWeb - a chrome plugin
 * that helps creating a better, more rational web using machine learning
 * and natural language processing.
 * 
 * @fileoverview Text to meaning conversion: This file uses Tensorflow.js
 * along with Google's Universal Sentence Encoder v2 (lite by default) to
 * extract sentence vectors - or "meanings of sentence" in a 512-dimensio
 * -nal vector. This information can be then passed to other parts of the
 * extension for post-processing.
 * 
 * 
 * 
 */

const tf = require('@tensorflow/tfjs');