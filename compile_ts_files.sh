#!/bin/bash

# Function to recursively find all TypeScript files in a directory, excluding 'node_modules'
find_ts_files() {
  find "$1" -type f -name "*.ts" | grep -v 'node_modules'
}

# Function to compile TypeScript files and move to 'build' directory
compile_and_move_files() {
  for file in "${@}"; do

    # Compile the TypeScript file
    npx tsc "$file"

    # Check if the compilation was successful
    if [ $? -eq 0 ]; then
      echo "Successfully compiled $file"
    else
      echo "Error compiling $file"
    fi
  done
}

# Get all TypeScript files in the current directory (excluding 'node_modules')
IFS=$'\n' ts_files=( $(find_ts_files "./") )

if [ "${#ts_files[@]}" -gt 0 ]; then
  echo "Compiling TypeScript files..."
  compile_and_move_files "${ts_files[@]}"
else
  echo "No TypeScript files found in the current directory."
fi

echo "Build completed successfully."
