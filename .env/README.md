This folder should contain 2 firebase config files:

- firebaseconfigprod.js
- firebaseconfigdev.js

When deployment is happening, one of them will be copied over to the actual
project before building.

See bash_scripts/copyEnvFiles.js