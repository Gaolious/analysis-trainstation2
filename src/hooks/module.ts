import Logger from "./../logger"

function android_dlopen_ext(fnOnEnter:onEnterType, fnOnLeave:onLeaveType)
{
    let func_name = 'android_dlopen_ext';
    let addr = null;
    let i ;
    let libil2cpp = 0 ;

    addr = Module.findExportByName(null, 'android_dlopen_ext');
    if ( !addr )
    {
        Logger.ERROR(func_name, "Failed to find android_dlopen_ext", {addr:addr});
    }
    else 
    { 
        Logger.INFO(func_name, "Found android_dlopen_ext", {addr:addr});
        Interceptor.attach(addr, {
            
            onEnter: function(args: any) {
                if ( args ) {
                    let path:string | null = args[0].readUtf8String();
                    if (path){
                        Logger.INFO(func_name, 'load : ' + path);
                        if ( path.indexOf('lib_burst_generated.so') >= 0)
                        {
                            Logger.INFO(func_name, 'onEnter libil2cpp.so');
                            libil2cpp = 1;
                            fnOnEnter(this, args);
                        }
                    }
                }
            },
            onLeave: function(retval){
                if ( libil2cpp )
                {
                    libil2cpp = 0;
                    Logger.INFO(func_name, 'onLeave libil2cpp.so');
                    fnOnLeave(this, retval);
                }
            }
        })
    }

}

function hook_dlopen(fnOnEnter:onEnterType, fnOnLeave:onLeaveType)
{
    let func_name = 'hook_dlopen';
    let addr = null;
    let i ;
    let loaded_libc = 0 ;

    // addr = Module.findExportByName(null, '__loader_dlopen');
    addr = Module.findExportByName(null, 'dlopen');
    if ( !addr )
    {
        Logger.ERROR(func_name, "Failed to find dlopen", {addr:addr});
    }
    else 
    {
        Logger.INFO(func_name, "Found dlopen", {addr:addr});

        Interceptor.attach(addr, {
            onEnter: function(args: any) {
                if ( args ) {
                    let path:string | null = args[0].readUtf8String();
                    if (path){
                        Logger.INFO(func_name, 'load : ' + path);
                        if ( path.indexOf('libil2cpp.so') >= 0)
                        {
                            Logger.INFO(func_name, 'onEnter libil2cpp.so');
                            fnOnEnter(this, args);
                        }
                    }
                }
            },
            onLeave: function(retval){
            }
        });
    }

}
const hook_module = {
    android_dlopen_ext,
    hook_dlopen
};

export default hook_module; 