
function dumpHex(base_addr: NativePointer, length: number): string
{
    let ret = hexdump(
        base_addr, 
        {
            offset:0, 
            length:length, 
            header:true, 
            ansi:false
        }
    );
    return ret;
}