#!/bin/bash

FILE="src/App.js"
TMP="src/App.tmp.js"

awk '
BEGIN {skip=0; inserted=0}
{
  # מחק שורות עם adminPortal.show או Settings
  if ($0 ~ /adminPortal\.show|Settings/) { next }

  print

  # הוספת כפתור Settings תקין בדיוק אחרי כפתור logout – פעם אחת בלבד
  if (!inserted && $0 ~ /<button onClick={logout}>Logout<\/button>/) {
    print "          <button onClick={() => {"
    print "            const adminPortal = ContextHolder.getContext().adminPortal;"
    print "            if (adminPortal) {"
    print "              adminPortal.show();"
    print "            } else {"
    print "              console.log(\"adminPortal not ready yet\");"
    print "            }"
    print "          }}>Settings</button>"
    inserted=1
  }
}
' "$FILE" > "$TMP" && mv "$TMP" "$FILE"
