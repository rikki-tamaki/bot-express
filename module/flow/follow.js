'use strict';

/*
** Import Packages
*/
let Promise = require("bluebird");
let debug = require("debug")("bot-express:flow");
let Flow = require("./flow");

module.exports = class FollowFlow extends Flow {

    constructor(messenger, event, options) {
        let context = {
            _flow: "follow",
            intent: {name: options.follow_skill},
            confirmed: {},
            to_confirm: [],
            confirming: null,
            previous: {
                confirmed: [],
                message: []
            },
            _message_queue: [],
            sender_language: null
        };
        messenger.context = context;
        super(messenger, event, context, options);
    }

    run(){
        debug("### This is Follow Flow. ###");

        return super.begin().then(
            (response) => {
                return super.finish();
            }
        );
    }
};
