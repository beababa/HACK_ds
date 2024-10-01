# Contexte

SP+ est le programme d'améliorations des services rendus aux usagers. Ce programme est transverse pour les administrations, 14 ministères, 
48 réseaux et 3,7 millions d'agent en relation avec 47 millions d'usagers.

Actuellement, les 250 démarches essentielles (suivies par la DINUM) et les CERFA (suivis par la DILA) sont intégrés au site Service Public + 
mais pas les 25 000 démarches simplifiées.

# Pré requis

SIRETisation de la base de donnée structure de la DITP

# Démarche

## Objectif principal

1er temps : Fournir aux fiches d'identité des établissements, les démarches DS locales et en cours.
2eme temps : Ajouter une visualisation au niveau local concernant les établissements et les démarches.

## Etapes

### Premier temps

- Fiches Identité pour Service Public + > dans les data ds, avec le siret on récupère les DS en cours

- On sélectionne uniquement les démarches propres (correspondance numéro de SIRET et adresse)
  
- tri à définir : volumétrie, dates, etc

### Deuxième temps

- avec le numéro d'instruction, on récupère et on lie les instructeurs, les utilisateurs et les objets de la démarche.

- Au niveau des utilisateurs, nous récupérons uniquement les personnes morales, la mise en place future d'un champs adresse (code postal, granularité à la commune)   permettrait d'obtenir tous les utilisateurs autres. (problème juridique, secret statistique)



# Pour aller plus loin...

## Simplification pour les administrateurs

Certaines structures comme les lycées et les hopitaux ne connaissent pas leur numéro SIRET, car ils utilisent des identifiants propres comme
l'UAI ou le FINESS.

Une solution serait de leur permettre de saisir dans démarches simplifiés l'identifiant qu'il connaisse en le typant. Une API permettrait
d'automatiser de lien avec le SIRET

## Utilisation de l'API SP+ pour faire remonter le système d'évaluation sur DS

L'évaluation à chaud mise en place par la DITP serait versée aux données de DS.

## La densité des ds

Représenter la densité des DS permettrait d'apporter un autre critère d'évaluation. Là où les ds sont nombreuses,
la qualité pourrait être au rendez-vous.

C'est la cartographie qui mettrait en valeur cette densité.



  

