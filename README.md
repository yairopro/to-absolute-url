# resolveUrl
A function to resolve relative paths to absolute urls (using [stacktrace.js](https://www.stacktracejs.com/)).

#### Instalation
````
import resolveUrl from "/node_modules/resolveUrl/resolveUrl.js"
````

#### Usage

###### Get absolute url of current file
````
// https://domaine-name.com/path/to/module.js
resolveUrl() // returns "https://domaine-name.com/path/to/module.js"
````

###### Get absolute url of a relative path
````
// https://domaine-name.com/dir/dir1/module1.js
resolveUrl("../dir2/module2.js") // returns "https://domaine-name.com/dir/dir2/module2.js"
resolveUrl("../dir2/module2.js", 0) // idem
````

###### Get absolute url of a relative path from the caller function
Useful when you create modules which receive relative path as parameter.
````
// https://domaine-name.com/dir/dir1/whereAmI.js
export default function whereAmI(){
    let callerUrl = resolveUrl(null, 1 /*Depth in the stacktrace. Default value : 0.*/);
    console.log("You a running at " + callerUrl);
}


// https://domaine-name.com/index.js
import whereAmI from "./dir/dir1/whereAmI.js"
whereAmI(); // logs "You are running at https://domaine-name.com/index.js"
````