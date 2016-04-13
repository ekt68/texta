
TEXTA is currently in a prototype phase and installations instructions may become outdated too fast to keep well documented. 

Nevertheless, the following should be sufficient to set up dependancies for TEXTA on a fresh Ubuntu installation.
It is not provided as a script to highlight the transient nature of TEXTA at the time of this writing.

```bash
#!/bin/bash

apt-get update
apt-get -y  install git
apt-get -y  install python-pip python-dev

#c compiler for gensim
apt-get -y install build-essential manpages-dev

pip install requests
pip install numpy
pip install cython #needed for fast gensim
pip install scipy
pip install sklearn
pip install gensim
pip install django
pip install nltk
```
