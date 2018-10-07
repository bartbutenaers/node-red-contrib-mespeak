/**
 * Copyright 2018 Bart Butenaers
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/
module.exports = function(RED) {
	var meSpeak = require("mespeak");

	function MeSpeakNode(config) {
		RED.nodes.createNode(this, config);
        this.amplitude = config.amplitude || 100;
        this.pitch     = config.pitch || 50;
        this.speed     = config.speed || 175;
        this.voice     = config.voice || "en";
        this.wordgap   = config.wordgap || 0;

        var node = this;
        
        // Load the selected voice
        meSpeak.loadVoice(require("mespeak/voices/en/" + node.voice + ".json"));
        
        node.options = { rawdata: "buffer",
                         amplitude: node.amplitude,
                         pitch: node.pitch,
                         speed: node.speed,
                         voice: node.voice,
                         wordgap: node.wordgap
                       }
    
        node.on("input", function(msg) {
            // Convert the msg.payload from text to WAV buffer
            msg.payload = meSpeak.speak(msg.payload, node.options))
            node.send(msg);
        });
    }
  
	RED.nodes.registerType("mespeak", MeSpeakNode);
}
