#!/bin/bash

FILE="src/App.js"
TMP="src/App.tmp.js"

awk '
BEGIN {skip=0}
{
  # מחיקה של גרסה ישנה עם תנאי adminPortal
  if ($0 ~ /ContextHolder\.getContext\(\)\?.adminPortal/) { skip=1; next }
  if (skip && $0 ~ /<\/button>/) { skip=0; next }
  if (skip) { next }

  # מחיקה של שורות "Settings" מיותרות
  if ($0 ~ /^[[:space:]]*Settings[[:space:]]*$/) { next }

  # הכנסת כפתור תקין אחרי logout
  print
  if ($0 ~ /<button onClick={logout}>Logout<\/button>/) {
    print "          <button onClick={() => {"
    print "            const adminPortal = ContextHolder.getContext().adminPortal;"
    print "            if (adminPortal) {"
    print "              adminPortal.show();"
    print "            } else {"
    print "              console.log(\"adminPortal not ready yet\");"
    print "            }"
    print "          }}>Settings</button>"
  }
}
' "$FILE" > "$TMP" && mv "$TMP" "$FILE"
