#!/bin/bash

# Absoluut pad naar je project (pas eventueel aan)
PROJECT_PATH="$HOME/PycharmProjects/LetMeThinkForYou"

# Start frontend (Vite) in tab 1
osascript <<EOF
tell application "Terminal"
    activate
    do script "cd \"$PROJECT_PATH/crypto-platform\" && npm run dev"
end tell
EOF

# Start backend (FastAPI) in tab 2
osascript <<EOF
tell application "Terminal"
    activate
    delay 1
    tell application "System Events" to keystroke "t" using command down
    delay 1
    do script "cd \"$PROJECT_PATH/backend\" && source env/bin/activate && uvicorn main:app --reload" in front window
end tell
EOF
