Projet API Station Météo


Description du Projet
    Ce projet vise à créer une station météo capable de mesurer la température, l'humidité et la pression atmosphérique à l'aide de la sonde WPSE335. Les données collectées par l'ESP8266 sont envoyées à un serveur Flask via une API en langage C. L'API backend, développée en Python, stocke ces données et permet de créer une interface web conviviale en React pour visualiser les informations météorologiques.

Composants du Projet
    ESP8266 avec Firmware en C:
        Le microcontrôleur ESP8266 est programmé en langage C pour lire les données de la sonde WPSE335 et les envoyer au serveur Flask.

    Sonde WPSE335:
        La sonde WPSE335 est utilisée pour mesurer la température, l'humidité et la pression atmosphérique.

    Serveur Flask:
        Le serveur Flask, situé dans le répertoire /flask_server, reçoit les données de l'ESP8266 et les transmet à l'API backend.
    
    API Backend en Python avec Flask:
        L'API gère la réception des données, les stocke dans une base de données, et expose des endpoints pour accéder à ces données.

    Interface Utilisateur avec React:
        L'interface utilisateur consomme l'API pour afficher les données météorologiques sous forme de graphiques et de tableaux.

    L'écran OLED :
        Un écran OLED est utilisé pour afficher les données locales sur la station météo.


Collecte de Données:
    L'ESP8266 collecte périodiquement les données de la sonde WPSE335 (toutes les 5 secondes). L'ESP fait une moyenne de 5 valeurs et l'envoie au serveur Flask 

Affichage Local (OLED):
    L'écran OLED sur la station météo affiche également les données locales en temps réel.

Auteurs
[GRENET Jeanne]
[SIMEON Antoine]
[DESCARPENTRIES Nicolas]
[LEDOUX Laura]