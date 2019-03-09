"use strict";

const _skill_status = require("debug")("bot-express:skill-status");
const _chat = require("debug")("bot-express:chat");

module.exports = class LoggerStdout {
    constructor(){

    }

    /**
     * @method
     * @async
     * @param {String} user_id
     * @param {String} chat_id
     * @param {String} skill
     * @param {String} status - "launched" | "aborted" | "switched" | "restarted" | "completed" | "abended"
     * @param {Object} payload
     */
    async skill_status(user_id, chat_id, skill, status, payload){
        if (status === "aborted" || status === "abended"){
            if (!(payload.context && payload.context.confirming)){
                payload.context = {
                    confirming: `unknown_parameter`
                }
            }
            _skill_status(`${user_id} ${chat_id} ${skill} - ${status} in confirming ${payload.context.confirming}`);
        } else if (status === "switched"){
            if (!(payload.context && payload.context.confirming)){
                payload.context = {
                    confirming: `unknown_parameter`
                }
            }
            if (!(payload.intent && payload.intent.name)){
                payload.intent = {
                    name: "unknown_skill"
                }
            }
            _skill_status(`${user_id} ${chat_id} ${skill} - ${status} to ${payload.intent.name} in confirming ${payload.context.confirming}`);
        } else if (status === "restarted"){
            if (!(payload.context && payload.context.confirming)){
                payload.context = {
                    confirming: `unknown_parameter`
                }
            }
            _skill_status(`${user_id} ${chat_id} ${skill} - ${status} in confirming ${payload.context.confirming}`);
        } else if (status === "completed"){
            let ttc;
            if (payload.context && payload.context.launched_at){
                ttc = String(new Date().getTime() - payload.context.launched_at);
            } else {
                ttc = "unknown_duration"
            }
            _skill_status(`${user_id} ${chat_id} ${skill} - ${status} in ${ttc}.`);
        } else {
            _skill_status(`${user_id} ${chat_id} ${skill} - ${status}`);
        }
    }

    /**
     * @method
     * @async
     * @param {String} user_id
     * @param {String} chat_id
     * @param {String} skill
     * @param {String} who
     * @param {Object} message
     */
    async chat(user_id, chat_id, skill, who, message){
        let message_text

        if (message.text){
            message_text = message.text;
        } else if (message.altText){
            message_text = message.altText;
        } else {
            message_text = JSON.stringify(message);
        }
        
        _chat(`${user_id} ${chat_id} ${skill} - ${who} says ${message_text}`);
    }
}

