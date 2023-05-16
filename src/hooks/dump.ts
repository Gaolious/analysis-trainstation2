import Logger from "../logger";
import { encrypt_addresses } from "./dump_encrypt_addresses";
import { http_addresses } from "./dump_http_addresses";
import { system_io_addresses } from "./dump_io_addresses";
import { send_addresses } from "./dump_send_addresses";
import { socket_addresses } from "./dump_socket_addresses";
import { write_addresses } from "./dump_write_addresses";
import {deserialize_addresses} from "./dump_deserialize_addresses";
import {http_request_addresses} from "./dump_http_request_addresses";
import {http_request_messages} from "./dump_http_request_message";

function hook_all_http(base_addr: NativePointer) {
    let func_name = 'ALL.HTTP';
    for ( const http_address of http_addresses ) {
        let name = http_address[0];
        let offset = http_address[1];
        Interceptor.attach( base_addr.add(offset), {
            onEnter: function(args) {
                Logger.INFO(func_name, 'onEnter : ' + name);
            }, 
            onLeave: function(retval) {
                Logger.INFO(func_name, 'onLeave : ' + name);
            }
        })    
    }
}

function hook_all_socket(base_addr: NativePointer) {
    let func_name = 'ALL.SOCK';
    for ( const socket_address of socket_addresses ) {
        let name = socket_address[0];
        let offset = socket_address[1];
        Interceptor.attach( base_addr.add(offset), {
            onEnter: function(args) {
                Logger.INFO(func_name, 'onEnter : ' + name);
            }, 
            onLeave: function(retval) {
                Logger.INFO(func_name, 'onLeave : ' + name);
            }
        })    
    }
}

function hook_all_system_io(base_addr: NativePointer) {
    let func_name = 'ALL.SYS.IO';
    for ( const system_io_address of system_io_addresses ) {
        let name = system_io_address[0];
        let offset = system_io_address[1];
        Interceptor.attach( base_addr.add(offset), {
            onEnter: function(args) {
                Logger.INFO(func_name, 'onEnter : ' + name);
            }, 
            onLeave: function(retval) {
                Logger.INFO(func_name, 'onLeave : ' + name);
            }
        })    
    }
}
function hook_all_write(base_addr: NativePointer) {
    
    let func_name = 'ALL.WRITE';
    for ( const write_address of write_addresses ) {
        let name = write_address[0];
        let offset = write_address[1];
        Interceptor.attach( base_addr.add(offset), {
            onEnter: function(args) {
                Logger.INFO(func_name, 'onEnter : ' + name);
            }, 
            onLeave: function(retval) {
                Logger.INFO(func_name, 'onLeave : ' + name);
            }
        })    
    }    
}
function hook_all_send(base_addr: NativePointer) {
    
    let func_name = 'ALL.SEND';
    for ( const send_address of send_addresses ) {
        let name = send_address[0];
        let offset = send_address[1];
        Interceptor.attach( base_addr.add(offset), {
            onEnter: function(args) {
                Logger.INFO(func_name, 'onEnter : ' + name);
            }, 
            onLeave: function(retval) {
                Logger.INFO(func_name, 'onLeave : ' + name);
            }
        })    
    }    
}

function hook_all_encrypt(base_addr: NativePointer) {
    
    let func_name = 'ALL.ENC';
    for ( const encrypt_address of encrypt_addresses ) {
        let name = encrypt_address[0];
        let offset = encrypt_address[1];
        Interceptor.attach( base_addr.add(offset), {
            onEnter: function(args) {
                Logger.INFO(func_name, 'onEnter : ' + name);
            }, 
            onLeave: function(retval) {
                Logger.INFO(func_name, 'onLeave : ' + name);
            }
        })    
    }    
}
function hook_all_deserialize(base_addr: NativePointer) {

    let func_name = 'SERIALIZE';
    for ( const deserialize_address of deserialize_addresses ) {
        let name = deserialize_address[0];
        let offset = deserialize_address[1];
        Interceptor.attach( base_addr.add(offset), {
            onEnter: function(args) {
                Logger.INFO(func_name, 'onEnter : ' + name);
            },
            onLeave: function(retval) {
                Logger.INFO(func_name, 'onLeave : ' + name);
            }
        })
    }
}
function hook_all_http_request(base_addr: NativePointer) {

    let func_name = 'HTTP_REQ';
    for ( const http_request_address of http_request_addresses ) {
        let name = http_request_address[0];
        let offset = http_request_address[1];
        Interceptor.attach( base_addr.add(offset), {
            onEnter: function(args) {
                Logger.INFO(func_name, 'onEnter : ' + name);
            },
            onLeave: function(retval) {
                Logger.INFO(func_name, 'onLeave : ' + name);
            }
        })
    }
}
function hook_all_http_request_message(base_addr: NativePointer) {

    let func_name = 'HTTP_REQ_MSG';
    for ( const msg of http_request_messages ) {
        let name = msg[0];
        let offset = msg[1];
        Interceptor.attach( base_addr.add(offset), {
            onEnter: function(args) {
                Logger.INFO(func_name, 'onEnter : ' + name);
            },
            onLeave: function(retval) {
                Logger.INFO(func_name, 'onLeave : ' + name);
            }
        })
    }
}

export {hook_all_http, hook_all_socket, hook_all_system_io, hook_all_write, hook_all_send, hook_all_encrypt, hook_all_deserialize, hook_all_http_request, hook_all_http_request_message}
