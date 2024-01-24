import sqlite3

connection = sqlite3.connect('baseDeDonnee.db')


cursor = connection.cursor()
cursor.execute('''CREATE TABLE IF NOT EXISTS Sonde (
               id_sonde INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
               nom VARCHAR(50) NOT NULL,
               active INT DEFAULT 1 CHECK (active IN (0, 1))
                )''')
connection.commit()

cursor.execute('''CREATE TABLE IF NOT EXISTS Releve (
               id_releve INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
               humidite_releve FLOAT NOT NULL,
               temperature_releve FLOAT NOT NULL,
               pression_releve FLOAT NOT NULL,
               date_time_releve DATETIME NOT NULL,
               id_sonde INTEGER,
               FOREIGN KEY (id_sonde) REFERENCES Sonde(id_sonde) ON DELETE CASCADE)''')
connection.commit()

cursor.execute('''CREATE TABLE IF NOT EXISTS utilisateur (
               id_utilisateur INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
               nom_utilisateur VARCHAR(50) NOT NULL,
               mot_de_passe_utilisateur VARCHAR(50) NOT NULL)''')
connection.commit()

connection.close()