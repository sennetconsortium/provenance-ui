class DataConverter {
    static KEY_P_ENTITY = 'entityAsParent';
    static KEY_P_ACT = 'activityAsParent';

    /**
     *
     * @param data {object}
     * @param map {object}
     * @param ops {object}
     */
    constructor(data, map, ops = {}) {
        this.error = null
        if (!map.root || !map.root.id) {
            this.error = 'Data map must include root and root.id values.'
            console.error(this.error)
            return this
        }
        this.ops = ops
        this.data = data
        this.map = map
    }

    /**
     * Set properties that will be displayed in info panel.
     * @param item {object}
     * @param type {string}
     */
    setProperties(item, type) {
        item.properties = item.properties || {}
        for (let gProp of this.map.props) {
            item.properties[gProp] = item[gProp]
        }

        if (type && typeof this.map.typeProps[type] === 'object') {
            for (let tProp of this.map.typeProps[type]) {
                if (item[tProp] !== undefined) {
                    item.properties[tProp] = this.evaluateCallbackOnValue(tProp, item[tProp])
                }
            }
        }
    }

    /**
     * Runs a callback on a given value
     * @param cb {function}
     * @param val {string}
     * @returns {string}
     */
    valueCallback(cb, val) {
        if (typeof cb === 'string') {
            if (typeof this[cb]  === 'function') {
                return this[cb](val)
            }
            return val;
        } else {
            try {
                return cb(val)
            } catch (e) {
                console.log(e)
            }
        }
        return val
    }

    /**
     * Formats a date timestamp.
     * @param val
     * @returns {string}
     */
    formatDateTimestamp(val) {
        return new Date(val * 1000).toLocaleString()
    }

    /**
     * Formats a date.
     * @param val
     * @returns {string}
     */
    formatDate(val) {
        return new Date(val).toLocaleString()
    }

    /**
     * Formats a given name into "Last name, F." initial format
     * @param val
     * @returns {string|*}
     */
    lastNameFirstInitial(val) {
        let name = val.split(' ')
        return name.length > 1 ? `${name[1]}, ${name[0][0]}.` : val
    }

    /**
     * Determines if a callback should be run.
     * @param prop {string}
     * @param value
     * @returns {string|*}
     */
    evaluateCallbackOnValue(prop, value) {
        return this.map.callbacks[prop]
            ? this.valueCallback(this.map.callbacks[prop], value) : value;
    }

}

export default DataConverter