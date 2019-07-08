/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
import { EventEmitter } from "events";

import AppDispatcher from "../AppDispatcher";
import { ActionTypes } from "../Constants";


let _links = [];

class LinkStore extends EventEmitter {
    constructor(props) {
        super(props);

        AppDispatcher.register(action => {
            switch(action.actionType) {
                case ActionTypes.RECEIVE_LINKS:
                    _links = action.links;
                    this.emit("change");
                    break;
                default:
                    // do nothing
            }
        });
    }

    getAll() {
        return _links;
    }
}

export default new LinkStore;