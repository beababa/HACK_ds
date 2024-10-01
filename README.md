# HACK_ds

*********************************************
1er call API DS - demarches / services instructeurs > SIRET
1er call parallèle - toutes les démarches DS

2eme call - API SPP ? SIRET > afficher détail de l'établissement
2eme call parallèle - récupère le détail de la démarche via l'id (cf 1er call parallèle)

*********************************************
Objectifs principal : 
1er temps : Fournir aux fiches d'identité des établissements, les démarches DS locales et en cours.
2eme temps : Ajouter une visualisation au niveau local concernant les établissements et les démarches.

1. Fiches Identité > avec le siret on récupère les DS en cours
2. On croise avec le fichier nombre d'agent pour identifier les démarches nationales et locales
3. On sélectionne uniquement les locales (tri à définir, volumétrie, dates, etc)

1. SIRET, adresse, coordonnées 
2. affichage carto avec plusieurs couches

Bonus :
1. Utilisation de l'API SP+ pour faire remonter le système d'évaluation

Référentiel de base : SIRET
Pré-requis côté DITP : dans leur base de données ajouter le SIRET
Problématique sur laquelle on a buté toute la journée : 
- SIRET / UAI / FINESS
- > solution : API ? Automatisation de lien entre les différents types d'identifiants

