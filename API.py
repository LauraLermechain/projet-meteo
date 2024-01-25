import flask
import sqlite3
from flask_cors import CORS

app = flask.Flask(__name__, template_folder='views')

CORS(app)


# -------- Authentification des utilisateurs ------- #

@app.route('/api/releve')

# -------- Méthode pour C(reate)R(ead) API sur la table des relevés -------- #

@app.route('/api/releves', methods=['POST'])    # C'est sur cette route que l'esp2 va se connecter pour enregistrer chaque relevé dans la BD.
def ajouter_releve():
    humidite = flask.request.json['humidite']
    temperature = flask.request.json['temperature']
    pression = flask.request.json['pression']
    date_time = flask.request.json['date_time']
    id_sonde = flask.request.json['id_sonde']

    conn = sqlite3.connect("baseDeDonnee.db")
    cursor = conn.cursor()

    cursor.execute('INSERT INTO Releve (humidite_releve, temperature_releve, pression_releve, date_time_releve, id_sonde) VALUES (?,?,?,?,?)', (humidite,temperature,pression,date_time, id_sonde))
    conn.commit()
    conn.close()

    return flask.jsonify({
         "message": "Relevé bien ajouté"
      })


@app.route('/api/releves/', methods=['GET'])  # C'est sur cette route que le front se connecte pour récupérer les relevés de toutes les sondes.
def recuperer_releves():
    conn = sqlite3.connect("baseDeDonnee.db")
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM Releve')   
    releves = cursor.fetchall()
    conn.close()

    liste_releves = []

    for releve in releves:
        dico = {'id' : releve[0],
                'humidite': releve[1],
                'temperature': releve[2],
                'pression': releve[3],
                'date_time': releve[4],
                'id_sonde' : releve[5]
                }
        liste_releves.append(dico)


    return flask.jsonify(liste_releves)


@app.route('/api/releves/<int:id_sonde>', methods=['GET'])   # C'est sur cette route que le front se connecte pour récupérer les relevés d'une sonde en particulier => le fronte doit spécifier l'id de la sonde voulue (<id_sonde>)
def recuperer_releves_sonde_unique(id_sonde):
    conn = sqlite3.connect("baseDeDonnee.db")
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM Releve WHERE id_sonde = ?', (id_sonde,)) 
    releves = cursor.fetchall()
    conn.close()

    liste_releves = []

    for releve in releves:
        dico = {'id' : releve[0],
                'humidite': releve[1],
                'temperature': releve[2],
                'pression': releve[3],
                'date_time': releve[4],
                'id_sonde' : releve[5]
                }
        liste_releves.append(dico)


    return flask.jsonify(liste_releves)




# -------- Méthode pour C(reate)R(ead)U(pdate) API sur la table sonde -------#
#  la DB doit permettre l'ajout/suppresion et l'activation/désactivation de sonde

@app.route('/api/sondes/', methods=['GET'])  # c'est sur cette route que le front se connecte pour récupérer toutes les sondes stockées dans la base de données .
def recuperer_info_sondes():
    conn = sqlite3.connect("baseDeDonnee.db")
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM Sonde')  
    sondes = cursor.fetchall()
    conn.close()

    liste_sondes = []

    for sonde in sondes:
        dico = {'id_sonde' : sonde[0],
                'nom': sonde[1],
                'active': sonde[2]
                }
        
        liste_sondes.append(dico)

    return flask.jsonify(liste_sondes)


@app.route('/api/ajouter-sonde', methods=['POST']) # C'est sur cette route que le front se connecte pour ajouter une sonde dans la BD.
def ajouter_sonde():
    nom = flask.request.json['nom']
    
    conn = sqlite3.connect("baseDeDonnee.db")
    cursor = conn.cursor()
    cursor.execute('INSERT INTO Sonde (nom) VALUES (?)', (nom, ))
    conn.commit()
    conn.close()

    return flask.jsonify({
         "message": "Sonde bien ajoutée"
      })


@app.route('/api/supprimer-sonde', methods=['POST'])  # C'est sur cette route que le front se connecte pour supprimer une sonde dans la BD.
def supprimer_sonde():

    id_sonde = flask.request.json['id_sonde']

    conn = sqlite3.connect("baseDeDonnee.db")
    cursor = conn.cursor()
    cursor.execute('DELETE FROM Sonde WHERE id_sonde = ?', (id_sonde,))
    conn.commit()
    conn.close()

    return flask.jsonify({
         "message": "Sonde bien supprimée"
      })


@app.route('/api/activer-sonde', methods=['POST'])  # C'est sur cette route que le front se conencte pour activer une sonde dans la BD.
def activer_sonde():

    id_sonde = flask.request.json['id_sonde']

    conn = sqlite3.connect("baseDeDonnee.db")
    cursor = conn.cursor()
    cursor.execute('UPDATE Sonde SET active = 1 WHERE id_sonde = ?', (id_sonde,))
    conn.commit()
    conn.close()

    return flask.jsonify({
         "message": "Sonde bien activée"
      })


@app.route('/api/desactiver-sonde', methods=['POST'])   # C'est sur cette route que le front se connecte pour désactiver une sonde dans la BD.
def desactiver_sonde():

    id_sonde = flask.request.json['id_sonde']

    conn = sqlite3.connect("baseDeDonnee.db")
    cursor = conn.cursor()
    cursor.execute('UPDATE Sonde SET active = 0 WHERE id_sonde = ? ', (id_sonde,))
    conn.commit()
    conn.close()

    return flask.jsonify({
         "message": "Sonde désactivée"
      })
    




if __name__ == '__main__':
    app.run(host='192.168.41.230', port=5000, debug=True)  # adresse ip du serveur sur le port 5000