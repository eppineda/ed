/**
 * Copyright (c) 2014 Enrique Pineda. All rights reserved.
 */

var assert = require('Assert');
var nomnom = require('nomnom')
    .option('encrypt', {
        'abbr':'e',
        'flag':true,
        'help':'If neither DECRYPT nor ENCRYPT is specified, a test is performed on both.'
    })
    .option('decrypt', {
        'abbr':'d',
        'flag':true,
        'help':'If neither DECRYPT nor ENCRYPT is specified, a test is performed on both.'
    })
    .option('secret', {
        'abbr':'s',
        'required':true,
        'help':'This is the text you are encrypting or decrypting.'
    })
    .option('password', {
        'abbr':'p',
        'required':true,
        'help':'You will need this to decrypt, later. Don\'t forget it!',
        'default':'password' // I highly recommend not using this in production.
    })
    .option('debug', {
        'flag':true,
        'help':'Enabling this option will send output to the console.'
    })
    .parse();
var ed = require('./ed.js');

if (nomnom.debug) {
    console.log(nomnom.secret);
    console.log(nomnom.password);
}
if (nomnom.encrypt) {
    var e = ed.encrypt(nomnom.secret, nomnom.password);
    console.log(e);
}
if (nomnom.decrypt) {
    var d = ed.decrypt(nomnom.secret, nomnom.password);
    console.log(d);
}
if (!nomnom.encrypt && !nomnom.decrypt) {
// Perform a unit test.
    var e = ed.encrypt(nomnom.secret, nomnom.password),
        d = ed.decrypt(e, nomnom.password);
    if (nomnom.debug) {
        console.log(nomnom.secret, "-->", e);
        console.log(e, "-->", d);
    }
    assert.equal(d, nomnom.secret);
}

/**
 * Copyright (c) 2014 Enrique Pineda. All rights reserved.
 */
