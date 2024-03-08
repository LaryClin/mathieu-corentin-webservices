### PUT & PATCH

**PUT** remplace toute l'entité ciblée par les nouvelles données qu'on lui envoie. Si on oublie un champ, il peut être supprimé ou remis à sa valeur par défaut.

**PATCH**, on modifie seulement les parties qu'on veut changer sans toucher au reste. C'est utile pour les mises à jour partielles.

### FETCH/AXIOS et Postman vs Firefox

Quand ça marche avec Postman mais pas dans Firefox, souvent c'est à cause des politiques de sécurité du navigateur, comme les CORS (Cross-Origin Resource Sharing). Les navigateurs bloquent les requêtes entre différents domaines pour des raisons de sécurité, alors que Postman n'a pas ces restrictions.

### NGINX/APACHE

Ces serveurs web peuvent gérer le trafic, servir des fichiers statiques rapidement, et protéger son API en agissant comme des pare-feu. Ils sont aussi très forts pour gérer plein de connexions en même temps.

### PERFORMANCES

Pour booster les performances d'une API REST, on peut :

1. **Mettre en cache** : Garder des données souvent demandées prêtes à être envoyées sans recalculer à chaque fois.
2. **Optimiser les requêtes à la base de données** : S'assurer qu'elles sont efficaces et ne demandent que ce dont on a vraiment besoin.
3. **Utiliser la compression** : Réduire la taille des données envoyées pour qu'elles voyagent plus vite sur le réseau.