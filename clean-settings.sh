#!/bin/bash

FILE="src/App.js"
TMP="src/App.tmp.js"

awk '
BEGIN {skip=0}
{
  # מחק כפתור settings הישן (הלא בטוח)
  if ($0 ~ /ContextHolder\.getContext\(\)\?.adminPortal/) { skip=1; next }
  if (skip && $0 ~ /<\/button>/) { skip=0; next }
  if (skip) { next }

  # אל תדפיס שורה של "Settings" בודד בטעות
  if ($0 ~ /^[[:space:]]*Settings[[:space:]]*$/) { next }

  # הכנס את כפתור settings התקין אחרי logout
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
