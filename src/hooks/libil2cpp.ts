import Logger from "../logger";
import {
    hook_all_deserialize,
    hook_all_encrypt,
    hook_all_http, hook_all_http_request, hook_all_http_request_message,
    hook_all_send,
    hook_all_socket,
    hook_all_system_io,
    hook_all_write
} from "./dump";


function hook_log_debug_int(base_addr: NativePointer) {
    // ; void __cdecl Log__Debug_object_(Il2CppObject *message, const MethodInfo_2D4927D *method)
    // Log$$Debug_object_ proc near
    
    // message= dword ptr  8
    // method= dword ptr  0Ch
    let func_name = 'log_dbg_int';
    let offset = 0x02D4919B;
    
    Logger.INFO(func_name, 'start to hook', {base_addr:base_addr, offset:offset});
    Interceptor.attach( base_addr.add(offset), {
        onEnter: function(args) {
            // Logger.INFO(func_name, 'called - onEnter');

            let message = args[0]; // message
            let method = args[1]; // method
            let dump_size = 0x10;
            let str_msg = il2cpp_string(message);
            
            Logger.INFO(func_name, 'params : ', {str_msg:str_msg, method:method});
            // Logger.DUMP(func_name, 'message', hexdump(message, {offset:0, length:Math.min(0x40,dump_size), header:true, ansi:false}));
            // Logger.DUMP(func_name, 'method', hexdump(method, {offset:0, length:Math.min(0x40,dump_size), header:true, ansi:false}));

        }, 
        onLeave: function(retval) {
            // Logger.INFO(func_name, 'called - onLeave');
        }
    })
}
function hook_log_debug_object(base_addr: NativePointer) {
    // ; void __cdecl Log__Debug_object_(Il2CppObject *message, const MethodInfo_2D4927D *method)
    // Log$$Debug_object_ proc near
    
    // message= dword ptr  8
    // method= dword ptr  0Ch
    let func_name = 'log_dbg_obj';
    let offset = 0x02D4927D;
    
    Logger.INFO(func_name, 'start to hook', {base_addr:base_addr, offset:offset});
    Interceptor.attach( base_addr.add(offset), {
        onEnter: function(args) {
            // Logger.INFO(func_name, 'called - onEnter');

            let message = args[0]; // message
            let method = args[1]; // message
            let dump_size = 0x10;
            let str_msg = il2cpp_string(message);
            
            Logger.INFO(func_name, 'params : ', {message:message, method:method, str_msg:str_msg});

        }, 
        onLeave: function(retval) {
            // Logger.INFO(func_name, 'called - onLeave');
        }
    })
}
function il2cpp_string(base_addr: NativePointer) {
    let ptr = base_addr.add(0x08);
    let msg_len = ptr.readInt();
    ptr = ptr.add(0x04);
    let str_msg = ptr.readUtf16String(msg_len);
    return str_msg;
}
function hook_log_debug_object_object(base_addr: NativePointer) {
    // void __cdecl Log__Debug_object__object_(Il2CppObject *message, Il2CppObject *tag, const MethodInfo_2D49326 *method)
    // Log$$Debug_object__object_ proc near
    // message= dword ptr  8
    // tag= dword ptr  0Ch
    // method= dword ptr  10h

    let func_name = 'log_dbg_obj2';
    let offset = 0x02d49326;
    
    Logger.INFO(func_name, 'start to hook', {base_addr:base_addr, offset:offset});
    Interceptor.attach( base_addr.add(offset), {
        onEnter: function(args) {
            // Logger.INFO(func_name, 'called - onEnter');

            let message = args[0]; // message
            let tag = args[1]; // message
            let method = args[2]; // message
            let dump_size = 0x10;
            let str_msg = il2cpp_string(message);
            let str_tag = il2cpp_string(tag);
            
            Logger.INFO(func_name, 'params : ', {message:message, tag:tag, method:method, str_msg:str_msg, str_tag:str_tag});
            // Logger.DUMP(func_name, 'message', hexdump(message, {offset:0, length:Math.min(0x40,dump_size), header:true, ansi:false}));
            // Logger.DUMP(func_name, 'tag', hexdump(tag, {offset:0, length:Math.min(0x40,dump_size), header:true, ansi:false}));
            // Logger.DUMP(func_name, 'method', hexdump(method, {offset:0, length:Math.min(0x40,dump_size), header:true, ansi:false}));
            
            if (str_msg) {
                if ( str_msg.indexOf('Http') >= 0 || str_msg.indexOf('https://game.trainstation2.com/login') >= 0 ) {
                    let trace = Thread.backtrace(this.context, Backtracer.ACCURATE).map(DebugSymbol.fromAddress);
                    Logger.TRACE(func_name, 'base addr : ' + base_addr, trace);
                }
            }
        }, 
        onLeave: function(retval) {
            // Logger.INFO(func_name, 'called - onLeave');
        }
    })
}


function hook_login(base_addr: NativePointer) {
    /**
     * Login
     * ; System_Threading_Tasks_Task_LoginResponse__o *__cdecl TS2Application_Networking_LoginContext__Login(TS2Application_Networking_LoginContext_o *this, const MethodInfo *method)
    TS2Application_Networking_LoginContext$$Login proc near

    var_3C= xmmword ptr -3Ch
    anonymous_0= dword ptr -2Ch
    anonymous_1= dword ptr -28h
    anonymous_2= byte ptr -1Ch
    this= dword ptr  8
    method= dword ptr  0Ch
    */

    let func_name = 'login';
    let offset = 0x02d49326;
    
    Logger.INFO(func_name, 'start to hook', {base_addr:base_addr, offset:offset});
    Interceptor.attach( base_addr.add(offset), {
        onEnter: function(args) {
            Logger.INFO(func_name, 'called - onEnter');
        }, 
        onLeave: function(retval) {
            Logger.INFO(func_name, 'called - onLeave');
        }
    })

}

function parse_request_data(base_addr: NativePointer ) {
    if (!base_addr || base_addr.equals(ptr('0x00')))
        return;

    let dump_size = 0x80 ;
    let base = base_addr;
    let func_name = 'parse_req_data';
    let target: NativePointer|null = null ;


    let instance = base.readPointer();
    base = base.add(4);

    // monitor: skip
    let monitor = base.readPointer();
    base = base.add(4);

    // URL                                                
    target = base.readPointer();
    let url = il2cpp_string(target);
    base = base.add(4);

    // Method
    target = base ;
    let method = '';
    switch(target.readInt()) {
        case 0 : method = 'GET'; break;
        case 1 : method = 'HEAD'; break;
        case 2 : method = 'POST'; break;
        case 3 : method = 'PUT'; break;
        case 4 : method = 'DELETE'; break;
    }
    base = base.add(4);
    
    // Request Id
    target = base.readPointer();
    let req_id = il2cpp_string(target);
    base = base.add(4);

    // is_binary
    target = base ;
    let is_binary = target.readS8();
    base = base.add(4);
    
    // retry no
    target = base ;
    let retryno = target.readInt();
    base = base.add(4);

    Logger.INFO(func_name, 'RequestData', {
        instance: instance, 
        monitor: monitor, 
        url: url,
        method: method,
        req_id: req_id,
        is_binary: is_binary,
        retry_no: retryno,
    });
    //
    // // data
    // for ( let i = 0 ; i < 6 ; i ++ ) {
    //     target = base.readPointer() ;
    //     base = base.add(4);
    //
    //     Logger.INFO(func_name, 'base offset #' + i, {base:base, target: target});
    //
    //     if (!target || target == ptr('0x0') ) continue ;
    //
    //     try{
    //         Logger.DUMP(func_name, 'DATA', hexdump(target, {offset:0, length:0x60, header:true, ansi:false}));
    //
    //         // let data_ptr = target.add(0x08);
    //         // let d1 = data_ptr.readPointer();
    //         // Logger.DUMP(func_name, 'D1', hexdump(d1, {offset:0, length:dump_size, header:true, ansi:false}));
    //         // Logger.INFO(func_name, 'D1-str', {d1_str: il2cpp_string(d1)});
    //
    //         // Logger.DUMP(func_name, 'D1-SELF', hexdump(d1.readPointer(), {offset:0, length:dump_size, header:true, ansi:false}));
    //
    //         // data_ptr = data_ptr.add(0X04);
    //         // let d2 = data_ptr.readPointer();
    //
    //         // Logger.DUMP(func_name, 'D2', hexdump(d2, {offset:0, length:dump_size, header:true, ansi:false}));
    //         // Logger.INFO(func_name, 'D2-str', {d1_str: il2cpp_string(d2)});
    //     }
    //     catch(e) {}
    //
    // }
/*
27 14:45:53 | T: 3419 | P | req_Sender      | requestData
                                                         0  1  2  3  4  5  6  7  8  9  A  B  C  D  E  F  0123456789ABCDEF
                                              020f9a78  20 42 c1 89 00 00 00 00 18 2a 59 01 00 00 00 00   B.......*Y.....
                                                        instance   / monitor   / url       / method
                                              020f9a88  38 67 14 02 00 00 00 00 00 00 00 00 00 00 00 00  8g..............
                                                        requestid  / isbianry  / retry no  / data
                                              020f9a98  00 00 00 00 00 00 00 00 00 fa f3 a4 00 00 00 00  ................
                                              020f9aa8  00 45 14 02 00 00 00 00 00 00 00 00 00 00 00 00  .E..............
                                              020f9ab8  01 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  ................
                                              020f9ac8  00 fa f3 a4 00 00 00 00 40 45 14 02 00 00 00 00  ........@E......
                                              020f9ad8  00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  ................
                                              020f9ae8  00 00 00 00 00 00 00 00 20 42 c1 89 00 00 00 00  ........ B......
                                              020f9af8  00 c6 60 01 00 00 00 00 90 67 14 02 00 00 00 00  ..`......g......
                                              020f9b08  00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  ................         
00000010 _RetryNo_k__BackingField dd ?                      
00000014 _Data_k__BackingField dd ?              ; offset   
00000018 _headers        dd ?                    ; offset  
*/     
}

function hook_request_sender(base_addr: NativePointer) {
    // ; System_Threading_Tasks_Task_RequestResult__o *__cdecl PixelFederation_Common_Backend_RequestSender__SendRetryAsync(
    //     PixelFederation_Common_Backend_RequestSender_o *this,
    //     PixelFederation_Common_Backend_RequestData_o *requestData,
    //     int32_t maxRetryCount, System_Threading_CancellationToken_o token, const MethodInfo *method)
    // PixelFederation_Common_Backend_RequestSender$$SendRetryAsync proc near
    // var_4C= xmmword ptr -4Ch
    // anonymous_0= xmmword ptr -3Ch
    // anonymous_1= dword ptr -2Ch
    // anonymous_2= dword ptr -28h
    // anonymous_3= byte ptr -1Ch
    // this= dword ptr  8
    // requestData= dword ptr  0Ch
    // maxRetryCount= dword ptr  10h
    // token= System_Threading_CancellationToken_o ptr  14h
    // method= dword ptr  18h

    let func_name = 'req_Sender';
    let offset = 0x00BACA5B;
    let dump_size = 0x40;

    Logger.INFO(func_name, 'start to hook', {base_addr:base_addr, offset:offset});
    Interceptor.attach( base_addr.add(offset), {
        onEnter: function(args) {
            Logger.INFO(func_name, 'called - onEnter');
            let sender = args[0];
            let requestData = args[1];
            let maxRetryCount = args[2];
            let token = args[3];
            let method = args[4];
            Logger.INFO(func_name, 'params : ', {sender:sender, requestData:requestData, maxRetryCount:maxRetryCount, token:token, method:method});
            Logger.DUMP(func_name, 'requestData', hexdump(requestData.readPointer(), {offset:0, length:0xa0, header:true, ansi:false}));

            parse_request_data(requestData);
        }, 
        onLeave: function(retval) {
            Logger.INFO(func_name, 'called - onLeave');
        }
    })

}

function hook_LogRequestResult(base_addr: NativePointer) {
    /*
    void __cdecl PixelFederation_Common_Backend_RequestSender__LogRequestResult(
        PixelFederation_Common_Backend_RequestSender_o *this,
        PixelFederation_Common_Backend_RequestData_o *requestData,
        PixelFederation_Common_Backend_RequestResult_o *requestResult,
        const MethodInfo *method)

        0x00BAD77F
    */

}
function hook_json(base_addr: NativePointer) {
    /**
     * System_String_o *__cdecl Newtonsoft_Json_JsonConvert__SerializeObject_41562017(
        Il2CppObject *value,
        Newtonsoft_Json_JsonSerializerSettings_o *settings,
        const MethodInfo *method)
{
     */
    let func_name = 'json_convert';
    let offset = 0x00BABB74;
    let dump_size = 0x40;
    
    Logger.INFO(func_name, 'start to hook', {base_addr:base_addr, offset:offset});
    Interceptor.attach( base_addr.add(offset), {
        onEnter: function(args) {
            Logger.INFO(func_name, 'called - onEnter');
            let data = args[0];
            let name = args[1];
            let value = args[2];
            let method = args[3];

            Logger.INFO(func_name, 'params : ', {data:data, name:name, value:value, method:method});
            Logger.INFO(func_name, 'name', {name: il2cpp_string(name)});
            Logger.INFO(func_name, 'value', {value: il2cpp_string(value)});

        }, 
        onLeave: function(retval) {
            Logger.INFO(func_name, 'called - onLeave');
        }
    })    
}

function hook_add_http_header(base_addr: NativePointer) {
    /**
     * ; void __cdecl System_Net_Http_Headers_HttpHeaders__Add(System_Net_Http_Headers_HttpHeaders_o *this, System_String_o *name, System_String_o *value, const MethodInfo *method)
    System_Net_Http_Headers_HttpHeaders$$Add proc near

    this= dword ptr  8
    name= dword ptr  0Ch
    value= dword ptr  10h
    method= dword ptr  14h
    System_Net_Http_Headers_HttpHeaders$$Add	il2cpp	014C8FEF	000000B0	00000020	00000010	R	.	.	.	.	B	T	.

    */

    let func_name = 'HttpAddHeader';
    let offset = 0x014C8FEF;
    let dump_size = 0x40;
    
    Logger.INFO(func_name, 'start to hook', {base_addr:base_addr, offset:offset});
    Interceptor.attach( base_addr.add(offset), {
        onEnter: function(args) {
            let http_headers_ptr = args[0];
            let name_ptr = args[1];
            let value_ptr = args[2];
            let method_ptr = args[3];

            Logger.INFO(func_name, 'params : ', {http_headers:http_headers_ptr, name_ptr:name_ptr, value_ptr:value_ptr, method_ptr:method_ptr, name: il2cpp_string(name_ptr), value: il2cpp_string(value_ptr)});
        }, 
        onLeave: function(retval) {
        }
    })    
} 

function hook_system_io_write(base_addr: NativePointer) {
     // void __cdecl System_IO_MemoryStream__Write(
     //    System_IO_MemoryStream_o *this,
     //    System_Byte_array *buffer,
     //    int32_t offset,
     //    int32_t count,
     //    const MethodInfo *method)
        let func_name = 'IO.Mem.Write';
        let offset = 0x027DACEE;
        let dump_size = 0x40;
        
        Logger.INFO(func_name, 'start to hook', {base_addr:base_addr, offset:offset});
        Interceptor.attach( base_addr.add(offset), {
            onEnter: function(args) {
                this.instance = args[0];
                this.buffer = args[1];
                this.offset = args[2];
                this.count = args[3].toInt32();
                this.method = args[4];
                Logger.INFO(func_name, 'onEnter - params : ', {instance:this.instance, buffer:this.buffer, offset:this.offset, count:this.count, method:this.method});
                /**
                 * 27 21:45:45 | T:20819 | I | IO.Mem.Write    | onEnter - params : 
                                              {'instance': '0x325af40', 'buffer': '0x3175000', 'offset': '0x0', 'count': '0x61', 'method': '0x0'}
                 */
                
                Logger.DUMP(func_name, 'buffer', hexdump(this.buffer.add(0x10), {offset:0, length: Math.min(this.count, 0x40), header:true, ansi:false}));

            }, 
            onLeave: function(retval) {
            }
        })    
}

function hook_system_content_serialize(base_addr: NativePointer) {
    // System_Threading_Tasks_Task_o *__cdecl System_Net_Http_StreamContent__SerializeToStreamAsync(
    //     System_Net_Http_StreamContent_o *this,
    //     System_IO_Stream_o *stream,
    //     System_Net_TransportContext_o *context,
    //     const MethodInfo *method)
    //
    // 00000000 System_Net_Http_StreamContent_Fields struc ; (sizeof=0x24, align=0x4, copyof_68206)
    // 00000000 baseclass_0     System_Net_Http_HttpContent_Fields ?
    // 0000000C content         dd ?                    ; offset
    // 00000010 bufferSize      dd ?
    // 00000014 cancellationToken System_Threading_CancellationToken_o ?
    // 00000018 startPosition   dq ?
    // 00000020 contentCopied   db ?
    // 00000021                 db ? ; undefined
    // 00000022                 db ? ; undefined
    // 00000023                 db ? ; undefined
    // 00000024 System_Net_Http_StreamContent_Fields ends

    let func_name = 'StreamContent';
    let offset = 0x014C1051;
    let dump_size = 0x40;
    
    Logger.INFO(func_name, 'start to hook', {base_addr:base_addr, offset:offset});
    Interceptor.attach( base_addr.add(offset), {
        onEnter: function(args) {
            let instance = args[0];
            let stream = args[1];
            let context = args[2];
            let method = args[4];
            Logger.INFO(func_name, 'onEnter - params : ', {instance:instance, stream:stream, context:context, method:method});
            // Logger.DUMP(func_name, 'this', hexdump(this.req, {offset:0, length:Math.min(0x40,dump_size), header:true, ansi:false}));
        }, 
        onLeave: function(retval) {
        }
    })    

}

function hook_send_request(base_addr: NativePointer) {
    /*
        System_Net_WebOperation_o *__cdecl System_Net_HttpWebRequest__SendRequest(
            System_Net_HttpWebRequest_o *this,
            bool redirecting,
            System_Net_BufferOffsetSize_o *writeBuffer,
            System_Threading_CancellationToken_o cancellationToken,
            const MethodInfo *method)
    */
    let func_name = 'SendRequest';
    let offset = 0x00B901EE;
    let dump_size = 0x40;
    
    Logger.INFO(func_name, 'start to hook', {base_addr:base_addr, offset:offset});
    Interceptor.attach( base_addr.add(offset), {
        onEnter: function(args) {
            let instance = args[0];
            let redirecting = args[1];
            let buffer = args[2];
            let cancel = args[3];
            let method = args[4];
            Logger.INFO(func_name, 'onEnter - params : ', {instance: instance, redirecting:redirecting, buffer:buffer, cancel:cancel, method:method});
            Logger.DUMP(func_name, 'instance', hexdump( instance, {offset:0, length:Math.min(0x40,dump_size), header:true, ansi:false}));
        },
        onLeave: function(retval) {
        }
    })    
    
}

function hook_mono(base_addr:NativePointer) {
    // void __cdecl System_Net_Http_MonoWebRequestHandler___c___SendAsync_b__99_0(
    //     System_Net_Http_MonoWebRequestHandler___c_o *this,
    //     Il2CppObject *l,
    //     const MethodInfo *method)    

    let func_name = 'MonoRequest';
    let offset = 0x014BA270;
    let dump_size = 0x40;
    
    Logger.INFO(func_name, 'start to hook', {base_addr:base_addr, offset:offset});
    Interceptor.attach( base_addr.add(offset), {
        onEnter: function(args) {
            let instance = args[0];
            let obj = args[1];
            let method = args[2];
            Logger.INFO(func_name, 'onEnter - params : ', {instance:instance, obj:obj, method:method});
            Logger.DUMP(func_name, 'instance', hexdump(instance, {offset:0, length:Math.min(0x40,dump_size), header:true, ansi:false}));
            Logger.DUMP(func_name, 'obj', hexdump(obj, {offset:0, length:Math.min(0x40,dump_size), header:true, ansi:false}));
        }, 
        onLeave: function(retval) {
        }
    })    
}

function hook_send(base_addr:NativePointer) {
    let func_name = 'send';
    let offset = 0x003ffee0;
    let dump_size = 0x40;
    
    Logger.INFO(func_name, 'start to hook', {base_addr:base_addr, offset:offset});
    Interceptor.attach( base_addr.add(offset), {
        onEnter: function(args) {
            let fd = args[0];
            let buf = args[1];
            let len = args[2].toInt32();
            let flag = args[3];
            Logger.INFO(func_name, 'onEnter - params : ', {fd:fd, buf:buf, len:len, flag:flag});
            Logger.DUMP(func_name, 'obj', hexdump(buf, {offset:0, length:dump_size, header:true, ansi:false}));

            // let trace = Thread.backtrace(this.context, Backtracer.ACCURATE).map(DebugSymbol.fromAddress) ;
            // Logger.TRACE( func_name, 'base addr : ' + base_addr, trace);
        }, 
        onLeave: function(retval) {
        }
    })    
}

function hook_deserialize(base_addr: NativePointer) {
    // void __cdecl OdinSerializer_UnitySerializationUtility__DeserializeUnityObject(
    //         UnityEngine_Object_o *unityObject,
    //         OdinSerializer_SerializationData_o *data,
    //         OdinSerializer_DeserializationContext_o *context,
    //         const MethodInfo *method)
    // {
    let func_name = 'deserialize';
    let offset = 0x0110140A;
    let dump_size = 0x40;

    Logger.INFO(func_name, 'start to hook', {base_addr:base_addr, offset:offset});
    Interceptor.attach( base_addr.add(offset), {
        onEnter: function(args) {
            this.unity_object = args[0];
            this.serialization_data = args[1];
            this.deserialization_context = args[2];
            this.method = args[3];

            Logger.INFO(func_name, 'onEnter - params : ', {unity_object:this.unity_object, serialization_data:this.serialization_data, deserialization_context:this.deserialization_context, method:this.method});
            // Logger.DUMP(func_name, 'unity_object', hexdump(this.unity_object, {offset:0, length:dump_size, header:true, ansi:false}));
            // Logger.DUMP(func_name, 'serialization_data', hexdump(this.serialization_data, {offset:0, length:dump_size, header:true, ansi:false}));
            // Logger.DUMP(func_name, 'deserialization_context', hexdump(this.deserialization_context, {offset:0, length:dump_size, header:true, ansi:false}));
        },
        onLeave: function(retval) {
            Logger.INFO(func_name, 'onLeave - params : ', {unity_object:this.unity_object, serialization_data:this.serialization_data, deserialization_context:this.deserialization_context, method:this.method});
            // Logger.DUMP(func_name, 'unity_object', hexdump(this.unity_object, {offset:0, length:dump_size, header:true, ansi:false}));
            // Logger.DUMP(func_name, 'serialization_data', hexdump(this.serialization_data, {offset:0, length:dump_size, header:true, ansi:false}));
            // Logger.DUMP(func_name, 'deserialization_context', hexdump(this.deserialization_context, {offset:0, length:dump_size, header:true, ansi:false}));
        }
    })
}

function hook_serialize(base_addr: NativePointer) {
    // void __cdecl OdinSerializer_UnitySerializationUtility__SerializeUnityObject(
    //         UnityEngine_Object_o *unityObject,
    //         OdinSerializer_SerializationData_o *data,
    //         bool serializeUnityFields,
    //         OdinSerializer_SerializationContext_o *context,
    //         const MethodInfo *method)

    let func_name = 'serialize';
    let offset = 0x01101507;
    let dump_size = 0x40;

    Logger.INFO(func_name, 'start to hook', {base_addr:base_addr, offset:offset});
    Interceptor.attach( base_addr.add(offset), {
        onEnter: function(args) {
            this.unity_object = args[0];
            this.serialization_data = args[1];
            this.serializeUnityFields = args[2];
            this.serialization_context = args[3];
            this.method = args[4];

            Logger.INFO(func_name, 'onEnter - params : ', {unity_object:this.unity_object, serialization_data:this.serialization_data, serializeUnityFields: this.serializeUnityFields, serialization_context:this.serialization_context, method:this.method});
            Logger.DUMP(func_name, 'unity_object', hexdump(this.unity_object, {offset:0, length:dump_size, header:true, ansi:false}));
            Logger.DUMP(func_name, 'serialization_data', hexdump(this.serialization_data, {offset:0, length:dump_size, header:true, ansi:false}));
            Logger.DUMP(func_name, 'serializeUnityFields', hexdump(this.serializeUnityFields, {offset:0, length:dump_size, header:true, ansi:false}));
            Logger.DUMP(func_name, 'serialization_context', hexdump(this.serialization_context, {offset:0, length:dump_size, header:true, ansi:false}));
        },
        onLeave: function(retval) {
            Logger.INFO(func_name, 'onLeave - params : ', {unity_object:this.unity_object, serialization_data:this.serialization_data, serializeUnityFields: this.serializeUnityFields, serialization_context:this.serialization_context, method:this.method});
            Logger.DUMP(func_name, 'unity_object', hexdump(this.unity_object, {offset:0, length:dump_size, header:true, ansi:false}));
            Logger.DUMP(func_name, 'serialization_data', hexdump(this.serialization_data, {offset:0, length:dump_size, header:true, ansi:false}));
            Logger.DUMP(func_name, 'serializeUnityFields', hexdump(this.serializeUnityFields, {offset:0, length:dump_size, header:true, ansi:false}));
            Logger.DUMP(func_name, 'serialization_context', hexdump(this.serialization_context, {offset:0, length:dump_size, header:true, ansi:false}));
        }
    })
}

function hook_http_request_message_dispose(base_addr: NativePointer) {

    // structure
    // 00000000 System_Net_Http_HttpRequestMessage_Fields struc ; (sizeof=0x18, align=0x4, copyof_68198)
    // 00000000                                         ; XREF: System_Net_Http_HttpRequestMessage_o/r
    // 00000000 headers         dd ?                    ; offset
    // 00000004 method          dd ?                    ; offset
    // 00000008 version         dd ?                    ; offset
    // 0000000C uri             dd ?                    ; offset
    // 00000010 is_used         db ?
    // 00000011 disposed        db ?
    // 00000012                 db ? ; undefined
    // 00000013                 db ? ; undefined
    // 00000014 _Content_k__BackingField dd ?           ; offset
    // 00000018 System_Net_Http_HttpRequestMessage_Fields ends
    // 00000018
    // 00000000 ; ---------------------------------------------------------------------------
    // 00000000
    // 00000000 System_Net_Http_HttpRequestMessage_o struc ; (sizeof=0x20, align=0x4, copyof_68201)
    // 00000000 klass           dd ?                    ; offset
    // 00000004 monitor         dd ?                    ; offset
    // 00000008 fields          System_Net_Http_HttpRequestMessage_Fields ?
    // 00000020 System_Net_Http_HttpRequestMessage_o ends

    let func_name = 'req_msg_dispose';
    let offset = 0x014C0640;
    let dump_size = 0x40;

    Logger.INFO(func_name, 'start to hook', {base_addr:base_addr, offset:offset});
    Interceptor.attach( base_addr.add(offset), {
        onEnter: function(args) {
            let instance = args[0];
            let _method = args[1];

            Logger.INFO(func_name, 'onEnter - params : ', {instance:instance, method:_method});
            Logger.DUMP(func_name, 'instance', hexdump(instance, {offset:0, length:dump_size, header:true, ansi:false}));
            Logger.DUMP(func_name, 'instance', hexdump(instance.readPointer(), {offset:0, length:dump_size, header:true, ansi:false}));
            // 28 03:09:19 | T:13961 | I | req_msg_dispose | onEnter - params :
            //                                               {'instance': '0x1611230', 'method': '0x5def5660'}
            // 28 03:09:19 | T:13961 | P | req_msg_dispose | instance
            //                                                          0  1  2  3  4  5  6  7  8  9  A  B  C  D  E  F  0123456789ABCDEF
            //                                               01611230  00 bd fe 5d 00 00 00 00 80 c8 b2 01 d0 5f 00 01  ...]........._..
            //                                               01611240  00 00 00 00 80 24 35 01 01 00 00 00 00 00 00 00  .....$5.........
            //                                               01611250  00 00 00 00 00 00 00 00 68 41 b2 7e 00 00 00 00  ........hA.~....
            //                                               01611260  c8 5d 0f 01 f0 c4 08 00 01 00 00 00 07 00 00 00  .]..............
            let offset = instance.readPointer();
            let headers = offset.add(0);
            let method = offset.add(4).readInt();
            let version = offset.add(8);
            let uri = offset.add(0x0c);
            let is_used = offset.add(0x10).readS8();
            // let disposed = offset.add(0x11);
            let content = offset.add(0x14);

            Logger.INFO(func_name, 'System_Net_Http_HttpRequestMessage_Fields', {
                headers:headers,
                method:method,
                version:version,
                uri:uri,
                is_used:is_used,
                content:content,
            });
            Logger.DUMP(func_name, 'headers', hexdump(headers, {offset:0, length:dump_size, header:true, ansi:false}));
            Logger.DUMP(func_name, 'version', hexdump(version, {offset:0, length:dump_size, header:true, ansi:false}));
            Logger.DUMP(func_name, 'uri', hexdump(uri, {offset:0, length:dump_size, header:true, ansi:false}));
            Logger.DUMP(func_name, 'content', hexdump(content, {offset:0, length:dump_size, header:true, ansi:false}));
        },
        onLeave: function(retval) {
        }
    })
}

function hook_web_request_stream(base_addr: NativePointer) {
    // System_Net_WebRequestStream$$ProcessWrite	il2cpp	033106ED	00000103	00000070	00000018	R	.	.	.	.	B	T	.
    //
    //
    // System_Threading_Tasks_Task_o *__cdecl System_Net_WebRequestStream__ProcessWrite(
    //         System_Net_WebRequestStream_o *this,
    //         System_Byte_array *buffer,
    //         int32_t offset,
    //         int32_t size,
    //         System_Threading_CancellationToken_o cancellationToken,
    //         const MethodInfo *method)


    let func_name = 'WebReqStream';
    let offset = 0x033106ED;
    let dump_size = 0x40;

    Logger.INFO(func_name, 'start to hook', {base_addr:base_addr, offset:offset});
    Interceptor.attach( base_addr.add(offset), {
        onEnter: function(args) {
            let instance = args[0];
            let buffer = args[1];
            let offset = args[2].toInt32();
            let size = args[3].toInt32();
            let cancel = args[4];
            let method = args[5];

            Logger.INFO(func_name, 'onEnter - params : ', {
                instance:instance,
                buffer:buffer,
                offset:offset,
                size:size,
                cancel:cancel,
                method:method,
            });
            Logger.DUMP(func_name, 'buffer', hexdump(buffer, {offset:0, length:size, header:true, ansi:false}));
        },
        onLeave: function(retval) {
        }
    })
}

function hook_ssl_stream_read(base_addr: NativePointer) {
    // int32_t __cdecl System_Net_Security_SslStream__Read(
    //         System_Net_Security_SslStream_o *this,
    //         System_Byte_array *buffer,
    //         int32_t offset,
    //         int32_t count,
    //         const MethodInfo *method)

    //     System.Int32 Read(System.Byte[] buffer, System.Int32 offset, System.Int32 count); // 0x0325c024

    let func_name = 'SSL_Read';
    let offset = 0x0325c024;
    let dump_size = 0x40;

    Logger.INFO(func_name, 'start to hook', {base_addr:base_addr, offset:offset});
    Interceptor.attach( base_addr.add(offset), {
        onEnter: function(args) {
            this.instance = args[0];
            this.buffer = args[1];
            this.offset = args[2].toInt32();
            this.count = args[3].toInt32();
            this.method = args[4];

            Logger.INFO(func_name, 'onEnter - params : ', {
                instance:this.instance,
                buffer:this.buffer,
                offset:this.offset,
                count:this.count,
                method:this.method,
            });
            Logger.DUMP(func_name, 'buffer', hexdump(this.buffer, {offset:0, length:dump_size, header:true, ansi:false}));
        },
        onLeave: function(retval) {

            // Logger.INFO(func_name, 'onLeave - params : ', {
            //     instance:this.instance,
            //     buffer:this.buffer,
            //     offset:this.offset,
            //     count:this.count,
            //     method:this.method,
            // });
            // Logger.DUMP(func_name, 'buffer', hexdump(this.buffer, {offset:0, length:this.count + 0x10, header:true, ansi:false}));

            return retval
        }
    })
}

function hook_ssl_stream_write(base_addr: NativePointer) {
// void __cdecl System_Net_Security_SslStream__Write(
//         System_Net_Security_SslStream_o *this,
//         System_Byte_array *buffer,
//         int32_t offset,
//         int32_t count,
//         const MethodInfo *method)
// System.Void Write(System.Byte[] buffer, System.Int32 offset, System.Int32 count); // 0x0325c078

    let func_name = 'SSL_Write';
    let offset = 0x0325c078;
    let dump_size = 0x40;

    Logger.INFO(func_name, 'start to hook', {base_addr:base_addr, offset:offset});
    Interceptor.attach( base_addr.add(offset), {
        onEnter: function(args) {
            this.instance = args[0];
            this.buffer = args[1];
            this.offset = args[2].toInt32();
            this.count = args[3].toInt32();
            this.method = args[4];

            Logger.INFO(func_name, 'onEnter - params : ', {
                instance:this.instance,
                buffer:this.buffer,
                offset:this.offset,
                count:this.count,
                method:this.method,
            });
            Logger.DUMP(func_name, 'buffer', hexdump(this.buffer, {offset:0, length:this.count + 0x10, header:true, ansi:false}));
        },
        onLeave: function(retval) {

            // Logger.INFO(func_name, 'onLeave - params : ', {
            //     instance:this.instance,
            //     buffer:this.buffer,
            //     offset:this.offset,
            //     count:this.count,
            //     method:this.method,
            // });
            // Logger.DUMP(func_name, 'buffer', hexdump(this.buffer, {offset:0, length:this.count + 0x10, header:true, ansi:false}));
            //
            return retval
        }
    })
}

function hook_ssl_stream_async_read(base_addr: NativePointer) {
// System_Threading_Tasks_Task_int__o *__cdecl System_Net_Security_SslStream__ReadAsync(
//         System_Net_Security_SslStream_o *this,
//         System_Byte_array *buffer,
//         int32_t offset,
//         int32_t count,
//         System_Threading_CancellationToken_o cancellationToken,
//         const MethodInfo *method)
//     System.Threading.Tasks.Task<System.Int32> ReadAsync(System.Byte[] buffer, System.Int32 offset, System.Int32 count, System.Threading.CancellationToken cancellationToken); // 0x0325c0cc

    let func_name = 'SSL_AsyncRead';
    let offset = 0x0325c0cc;
    let dump_size = 0x40;

    Logger.INFO(func_name, 'start to hook', {base_addr:base_addr, offset:offset});
    Interceptor.attach( base_addr.add(offset), {
        onEnter: function(args) {
            this.instance = args[0];
            this.buffer = args[1];
            this.offset = args[2].toInt32();
            this.count = args[3].toInt32();
            this.cancel = args[4];
            this.method = args[5];

            Logger.INFO(func_name, 'onEnter - params : ', {
                instance:this.instance,
                buffer:this.buffer,
                offset:this.offset,
                count:this.count,
                cancel:this.cancel,
                method:this.method,
            });
            Logger.DUMP(func_name, 'buffer', hexdump(this.buffer, {offset:0, length:dump_size, header:true, ansi:false}));
        },
        onLeave: function(retval) {

            // Logger.INFO(func_name, 'onLeave - params : ', {
            //     instance:this.instance,
            //     buffer:this.buffer,
            //     offset:this.offset,
            //     count:this.count,
            //     cancel:this.cancel,
            //     method:this.method,
            // });
            // Logger.DUMP(func_name, 'buffer', hexdump(this.buffer, {offset:0, length:this.count, header:true, ansi:false}));

            return retval
        }
    })
}

function hook_ssl_stream_async_write(base_addr: NativePointer) {
// System_Threading_Tasks_Task_o *__cdecl System_Net_Security_SslStream__WriteAsync(
//         System_Net_Security_SslStream_o *this,
//         System_Byte_array *buffer,
//         int32_t offset,
//         int32_t count,
//         System_Threading_CancellationToken_o cancellationToken,
//         const MethodInfo *method)
//     System.Threading.Tasks.Task WriteAsync(System.Byte[] buffer, System.Int32 offset, System.Int32 count, System.Threading.CancellationToken cancellationToken); // 0x0325c123

    let func_name = 'SSL_AsyncWrite';
    let offset = 0x0325c123;
    let dump_size = 0x40;

    Logger.INFO(func_name, 'start to hook', {base_addr:base_addr, offset:offset});
    Interceptor.attach( base_addr.add(offset), {
        onEnter: function(args) {
            this.instance = args[0];
            this.buffer = args[1];
            this.offset = args[2].toInt32();
            this.count = args[3].toInt32();
            this.cancel = args[4];
            this.method = args[5];

            Logger.INFO(func_name, 'onEnter - params : ', {
                instance:this.instance,
                buffer:this.buffer,
                offset:this.offset,
                count:this.count,
                cancel:this.cancel,
                method:this.method,
            });
            Logger.DUMP(func_name, 'buffer', hexdump(this.buffer, {offset:0, length:this.count + 0x10, header:true, ansi:false}));
        },
        onLeave: function(retval) {

            // Logger.INFO(func_name, 'onLeave - params : ', {
            //     instance:this.instance,
            //     buffer:this.buffer,
            //     offset:this.offset,
            //     count:this.count,
            //     cancel:this.cancel,
            //     method:this.method,
            // });
            // Logger.DUMP(func_name, 'buffer', hexdump(this.buffer, {offset:0, length:this.count, header:true, ansi:false}));

            return retval
        }
    })
}

export function hook_libil2cpp(): void {
    let func_name = 'hook_libil2cpp';
    let base_addr:NativePointer | null = Module.findBaseAddress('libil2cpp.so');
    Logger.INFO(func_name, 'base address', {addr : base_addr});
    
    if ( !base_addr )
    {
        Logger.ERROR(func_name, 'Failed to find base address of libgame.so');
        return;
    }
    else
    {
        hook_log_debug_int(base_addr);
        hook_log_debug_object(base_addr);
        hook_log_debug_object_object(base_addr);
        hook_request_sender(base_addr);
        hook_add_http_header(base_addr);
        hook_send_request(base_addr);
        hook_system_io_write(base_addr);
        hook_system_content_serialize(base_addr);
        // hook_mono(base_addr);
        hook_send(base_addr);
        hook_http_request_message_dispose(base_addr);
        hook_web_request_stream(base_addr);
        hook_ssl_stream_read(base_addr);
        hook_ssl_stream_write(base_addr);
        hook_ssl_stream_async_read(base_addr);
        hook_ssl_stream_async_write(base_addr);
        hook_deserialize(base_addr);
        hook_serialize(base_addr);

        // trace - debug
        // hook_all_encrypt(base_addr);
        // hook_all_http(base_addr);
        // hook_all_socket(base_addr);
        // hook_all_system_io(base_addr);
        // hook_all_write(base_addr);
        // hook_all_send(base_addr);
        // hook_all_deserialize(base_addr);
        // hook_all_http_request(base_addr);
        // hook_all_http_request_message(base_addr);
    }
}