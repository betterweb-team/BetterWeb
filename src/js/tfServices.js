/**
 * This is part of the source code of project BetterWeb - a chrome exten
 * -sion that helps creating a better, more rational web using machine 
 * learning and natural language processing.
 * 
 * @fileoverview This is the tfServices class - providing tensorflow inte
 * -raction with the extension frontend. It provides a basic interface 
 * via Chrome's vanilla message system, receiving events from frontend, 
 * work on them, and send responses back. 
 * 
 * 
 * 
 */

import tf from '@tensorflow/tfjs';

/**
 * Text to meaning conversion: This file uses Tensorflow.js
 * along with Google's Universal Sentence Encoder v2 (lite by default) to
 * extract sentence vectors - or "meanings of sentence" in a 512-dimensio
 * -nal vector. This information can be then passed to other parts of the
 * extension for post-processing.
 */

