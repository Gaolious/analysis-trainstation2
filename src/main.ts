import Logger from "./logger";
// import hook_ssl_pinning from "./hooks/ssl"
// import hook_module from "./hooks/module"
// import hook_java from "./hooks/java"
// import {hook_libil2cpp} from "./hooks/libil2cpp";
// import {hook_libc} from "./hooks/libc";
import "frida-il2cpp-bridge";
import hook_ssl_pinning from "./hooks/ssl";
import {hook_libc} from "./hooks/libc";
import hook_module from "./hooks/module";
import {hook_libil2cpp} from "./hooks/libil2cpp";

function onLoadEmpty(obj:InvocationContext, args:InvocationArguments){}
function onLoadedEmpty(obj:InvocationContext, args:InvocationReturnValue){}
function trace() {
    Logger.INFO('UNITY VERSION', ' : ' + Il2Cpp.unityVersion);

    Il2Cpp
        .trace().domain()
        .filterClasses(
        (x) => {
            return x.name.toLowerCase().indexOf('maincontext') >= 0;
        })
        .filterMethods(
            (x) => {
                return x.name.toLowerCase().indexOf('servertime') < 0
                        && x.name.toLowerCase().indexOf('tickupdate') < 0;
            }
        )
        .and().attach('detailed')
    Il2Cpp
        .trace().domain()
        .filterClasses(
        (x) => {
            return x.name.toLowerCase().indexOf('backend') >= 0 && x.name.toLowerCase().indexOf('loginresponse') >= 0;
        })
        .and().attach('detailed')
    Il2Cpp
        .trace().domain()
        .filterClasses(
        (x) => {
            return x.name.toLowerCase().indexOf('backend') >= 0 && x.name.toLowerCase().indexOf('initialdata') >= 0;
        })
        .and().attach('detailed')


    // const cls = Il2Cpp.Domain.assembly('PixelFederation.Common.Backend').image;
    // Il2Cpp
    //     .trace().domain()
    //     .filterClasses(
    //     (x) => {
    //         return x.name.toLowerCase().indexOf('backend') >= 0;
    //     })
    //     .filterMethods(
    //         (x) => {
    //             return x.name.toLowerCase().indexOf('gettime') < 0
    //                 && x.name.toLowerCase().indexOf('update') < 0 ;
    //         }
    //     ).and().attach('detailed')

    // Il2Cpp.trace().domain(
    // ).filterClasses(
    //     (x) => {
    //         return x.name.toLowerCase().indexOf('definition') >= 0 ;
    //     }
    // ).and().attach('detailed')
    //
    // Il2Cpp.trace().classes(
    //     Il2Cpp.Domain.assembly('System').image.class('System.Net.HttpWebRequest')
    // ).and().attach('detailed')
    // Il2Cpp.trace().classes(
    //     Il2Cpp.Domain.assembly('System').image.class('System.Net.HttpWebResponse')
    // ).and().attach('detailed')
    //
    // Il2Cpp.trace().classes(
    //     Il2Cpp.Domain.assembly('System').image.class('System.Net.WebRequestStream')
    // ).and().attach('detailed')
    // Il2Cpp.trace().classes(
    //     Il2Cpp.Domain.assembly('System').image.class('System.Net.WebRequest')
    // ).and().attach('detailed')
    //
    // Il2Cpp.trace().classes(
    //     Il2Cpp.Domain.assembly('System').image.class('System.Net.WebResponseStream')
    // ).and().attach('detailed')
    // Il2Cpp.trace().classes(
    //     Il2Cpp.Domain.assembly('System').image.class('System.Net.WebResponse')
    // ).and().attach('detailed')
    //
    // Il2Cpp.trace().classes(
    //     Il2Cpp.Domain.assembly('System').image.class('System.Net.Security.SslStream')
    // ).and().attach('detailed')
    // Il2Cpp.trace().classes(
    //     Il2Cpp.Domain.assembly('System').image.class('Mono.Net.Security.MonoTlsStream')
    // ).and().attach('detailed')

}

function onLoadedLibgame(obj:InvocationContext, ret:InvocationReturnValue)
{
    for ( let i = 0 ; i < 0 ; i ++)
    {
        Logger.DEBUG('onload libil2cpp.so', 'sleep ' + (i+1) + ' / 30');
        Thread.sleep(1)
    }
    // trace()
    hook_libil2cpp();
}

// function onLoadedLibc(obj:InvocationContext, args:InvocationReturnValue)
// {
// }


// Il2Cpp.perform(() => {
//     Logger.INFO('UNITY VERSION', ' : ' + Il2Cpp.unityVersion);
// });
Java.perform(function(){
    // hook_ssl_pinning();
    // hook_libc();

    // hook_module.hook_dlopen(onLoadEmpty, onLoadedLibgame);
    hook_module.android_dlopen_ext(onLoadEmpty, onLoadedLibgame);
})