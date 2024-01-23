import flask
import sqlite3

app = flask.Flask(__name__, template_folder='views')


# -------- Méthode pour C(reate)R(ead) API sur la table des relevés -------- #

@app.route('/api/releves', methods=['POST'])
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




@app.route('/api/releves/', methods=['GET'])
def recuperer_releves():
    conn = sqlite3.connect("baseDeDonnee.db")
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM Releve')   #WHERE id_sonde = ?
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


@app.route('/api/ajouter-sonde', methods=['POST'])
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

@app.route('/api/supprimer-sonde', methods=['POST'])
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


@app.route('/api/activer-sonde', methods=['POST'])
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

@app.route('/api/desactiver-sonde', methods=['POST'])
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