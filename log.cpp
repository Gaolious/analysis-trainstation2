#include <stdio.h>
#include <stdlib.h>
#include <string.h>


int main() {
    char str[10240]={0,};
    const char *lookup = "17 01 18 00 00 00 3c 00 76 00 65 00 72 00 73 00  ......<.v.e.r.s.";
    const char *lookup2 = "                                              ";

    bool flag = false;
    int len = strlen(lookup) - 1;
    int len2 = strlen(lookup2) - 1;

    while ( !feof(stdin) ) {
        fgets(str, sizeof(str)-1, stdin) ;

        if ( strncmp(str, lookup2, len2) == 0 && strstr(str, lookup) != 0x00 ) {
//            printf("found : %s", str);
            flag = true;
        }
        else if ( strncmp(str, lookup2, len2) != 0  ) {
            flag = false;
        }

        if (!flag) {
            printf("%s", str);
        }
    }
    return 0;
}
