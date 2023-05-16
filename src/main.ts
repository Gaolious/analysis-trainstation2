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

    // Il2Cpp
    //     .trace()
    //     .classes(
    //         Il2Cpp.Domain.assembly('Firebase').image.class('Firebase.Firestore')
    //     )
    //     .and().attach('detailed')
    //
    // Il2Cpp
    //     .trace()
    //     .domain()
    //     .filterMethods(
    //         (x) => {
    //             return x.name.toLowerCase().indexOf('document') >= 0 ;
    //         }
    //     )
    //     .and().attach('detailed')

    Il2Cpp.trace().domain(
    ).filterClasses(
        (x) => {
            if (x.name.toLowerCase().indexOf('firebaseauth') >= 0) return true;
            if (x.name.toLowerCase().indexOf('database') >= 0) return true;
            // if (x.name.toLowerCase().indexOf('database') >= 0) return true;
            // if (x.name.toLowerCase().indexOf('authenticate') >= 0) return true;
            if (x.name.toLowerCase().indexOf('signin') >= 0) return true;
            if (x.name.toLowerCase().indexOf('firebaseuser') >= 0) return true;
            if (x.name.toLowerCase().indexOf('pixelfirebase') >= 0) return true;
            // if (x.name.toLowerCase().indexOf('firestore') >= 0) return true;
            if (x.name.toLowerCase().indexOf('authprovider') >= 0) return true;
            if (x.name.toLowerCase().indexOf('oauth') >= 0) return true;
            return false;
        }
    ).and().attach('detailed')

    // Il2Cpp
    //     .trace().domain().and().attach('detailed')
    // Il2Cpp.trace().classes(
    //     Il2Cpp.Domain.assembly('Game').image.assembly.classes('Game.Firebase.Guild.Commands')
    // ).and().attach('detailed')

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
function getContext() {
  return Java.use('android.app.ActivityThread').currentApplication().getApplicationContext().getContentResolver();
}
function logAndroidId() {
  Logger.INFO('Android Id ', Java.use('android.provider.Settings$Secure').getString(getContext(), 'android_id'));
}
function onLoadedLibgame(obj:InvocationContext, ret:InvocationReturnValue)
{
    for ( let i = 0 ; i < 0 ; i ++)
    {
        Logger.DEBUG('onload libil2cpp.so', 'sleep ' + (i+1) + ' / 30');
        Thread.sleep(1)
    }
    // trace()
    logAndroidId();
    hook_libil2cpp();
    // Il2Cpp.dump()
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
    // logAndroidId()
    // hook_module.hook_dlopen(onLoadEmpty, onLoadedLibgame);
    hook_module.android_dlopen_ext(onLoadEmpty, onLoadedLibgame);
})