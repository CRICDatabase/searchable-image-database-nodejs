'use strict';

const token_curinga = 'bac8db9147ac80b4ba8a05bb0de7c4fd';

module.exports = {

    obterTokenCuringa() {
        return token_curinga;
    },

    gerarUuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
};
