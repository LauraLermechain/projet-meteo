#!/usr/bin/env python3

import sys
sys.path.insert(0, '/var/www/html/')  # Chemin vers le répertoire contenant votre application

# from API import app as application  # Importez l'instance de votre application Flask

from API import app

if __name__ == "__main__":
    app.run()
