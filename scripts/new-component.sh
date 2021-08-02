mkdir -p ../src/components/$1
echo export \* from "'./$1'" > ../src/components/$1/index.js
touch ../src/components/$1/$1.js