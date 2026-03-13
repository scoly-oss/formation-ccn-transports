export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Section {
  id: string;
  title: string;
  content: string;
  keyPoints?: string[];
  quiz?: QuizQuestion[];
}

export interface Module {
  id: string;
  title: string;
  icon: string;
  description: string;
  color: string;
  sections: Section[];
}

export const modules: Module[] = [
  {
    id: "introduction",
    title: "Introduction",
    icon: "BookOpen",
    description: "Comprendre la CCN des Transports Routiers et ses enjeux",
    color: "#e8842c",
    sections: [
      {
        id: "intro-1",
        title: "Qu'est-ce que la CCN Transports Routiers ?",
        content: `La Convention Collective Nationale des Transports Routiers et des activités auxiliaires du transport (IDCC 16) est le texte de référence qui régit les relations de travail dans le secteur du transport routier en France.

Elle couvre un large périmètre d'activités :
- **Transport routier de marchandises** (TRM)
- **Transport routier de voyageurs** (TRV)
- **Déménagement**
- **Activités auxiliaires du transport** (logistique, manutention, etc.)
- **Location de véhicules industriels**
- **Coursiers et transport léger**

Cette convention s'applique à environ **700 000 salariés** répartis dans plus de **40 000 entreprises** en France. Elle constitue le socle des droits et obligations des employeurs et des salariés du secteur.`,
        keyPoints: [
          "IDCC 16 - Convention spécifique au transport routier",
          "Couvre TRM, TRV, déménagement, logistique",
          "Environ 700 000 salariés concernés",
          "Texte de référence pour les relations de travail"
        ],
        quiz: [
          {
            question: "Quel est le numéro IDCC de la CCN des Transports Routiers ?",
            options: ["IDCC 44", "IDCC 16", "IDCC 3085", "IDCC 176"],
            correctIndex: 1,
            explanation: "La CCN des Transports Routiers porte le numéro IDCC 16."
          },
          {
            question: "Combien de salariés sont concernés par cette convention ?",
            options: ["200 000", "500 000", "700 000", "1 000 000"],
            correctIndex: 2,
            explanation: "Environ 700 000 salariés sont couverts par la CCN Transports Routiers."
          }
        ]
      },
      {
        id: "intro-2",
        title: "Hiérarchie des normes et articulation",
        content: `Dans le droit du travail français, la CCN des Transports Routiers s'inscrit dans une hiérarchie de normes bien définie :

**1. Le Code du travail** - Fixe le socle minimal de droits
**2. La Convention Collective** - Peut améliorer les dispositions du Code du travail
**3. Les accords d'entreprise** - Depuis les ordonnances Macron de 2017, ils peuvent déroger à la convention dans certains domaines
**4. Le contrat de travail** - Régit la relation individuelle

**Points d'attention importants :**
- La CCN Transports comporte de nombreuses **dispositions spécifiques** au secteur qui dérogent au droit commun
- Le **règlement social européen (RSE)** et le **Code des transports** s'ajoutent à cette architecture normative
- Les accords d'entreprise ne peuvent pas déroger à certaines dispositions de la CCN (minima salariaux, classifications, etc.)
- La CCN prévoit des avantages souvent supérieurs au Code du travail (indemnités de licenciement, préavis, etc.)`,
        keyPoints: [
          "Code du travail > CCN > Accords d'entreprise > Contrat",
          "La CCN peut améliorer le Code du travail",
          "RSE et Code des transports complètent le dispositif",
          "Certaines dispositions de la CCN sont d'ordre public conventionnel"
        ],
        quiz: [
          {
            question: "Depuis quand les accords d'entreprise peuvent-ils déroger à la convention collective dans certains domaines ?",
            options: ["2010", "2015", "2017", "2020"],
            correctIndex: 2,
            explanation: "Les ordonnances Macron de 2017 ont permis aux accords d'entreprise de déroger à la convention dans certains domaines."
          }
        ]
      }
    ]
  },
  {
    id: "classifications",
    title: "Classifications professionnelles",
    icon: "Users",
    description: "Les groupes, coefficients et catégories de personnel",
    color: "#2a3d50",
    sections: [
      {
        id: "class-1",
        title: "Structure des classifications",
        content: `La CCN Transports Routiers organise les salariés en **4 catégories** et **plusieurs groupes** :

**Ouvriers** (Groupes 2 à 7 + coefficient 150M)
- Groupe 2 (coefficient 115) : Manoeuvre
- Groupe 3 (coefficient 120) : Ouvrier
- Groupe 4 (coefficient 128) : Ouvrier qualifié
- Groupe 5 (coefficient 132) : Ouvrier qualifié
- Groupe 6 (coefficient 138) : Ouvrier hautement qualifié (OHQ)
- Groupe 7 (coefficient 150) : Ouvrier hautement qualifié
- Coefficient 150M : Conducteur très qualifié « maître »

**Employés** (Groupes 2 à 7)
- Structure similaire aux ouvriers
- Coefficients de 115 à 148.5

**Techniciens et Agents de Maîtrise (TAM)** (Groupes 1 à 4)
- Groupe 1 (coefficient 157.5) : Agent de maîtrise
- Groupe 2 (coefficient 165) : Agent de maîtrise confirmé
- Groupe 3 (coefficient 175) : Agent de maîtrise supérieur
- Groupe 4 (coefficient 185) : Agent de maîtrise principal

**Ingénieurs et Cadres** (Groupes 1 à 5)
- Groupe 1 (coefficient 100) : Cadre débutant
- Groupe 2 (coefficient 106.5) : Cadre confirmé
- Groupe 3 (coefficient 113) : Cadre supérieur
- Groupe 4 (coefficient 119) : Cadre principal
- Groupe 5 (coefficient 132.5) : Cadre dirigeant`,
        keyPoints: [
          "4 catégories : Ouvriers, Employés, TAM, Cadres",
          "Ouvriers : groupes 2 à 7 + 150M",
          "TAM : groupes 1 à 4",
          "Cadres : groupes 1 à 5"
        ],
        quiz: [
          {
            question: "Combien de catégories de personnel sont prévues par la CCN ?",
            options: ["2", "3", "4", "5"],
            correctIndex: 2,
            explanation: "La CCN prévoit 4 catégories : Ouvriers, Employés, TAM et Cadres."
          },
          {
            question: "Que signifie le coefficient 150M ?",
            options: ["Conducteur moyen", "Conducteur très qualifié maître", "Manager transport", "Moniteur"],
            correctIndex: 1,
            explanation: "Le coefficient 150M désigne un conducteur très qualifié « maître », le plus haut niveau pour les ouvriers roulants."
          }
        ]
      },
      {
        id: "class-2",
        title: "Classification des conducteurs",
        content: `Les conducteurs bénéficient d'une classification spécifique selon le type de véhicule et la nature de l'activité :

**Conducteurs de véhicules légers (< 3,5 tonnes)**
- Groupe 3 (coefficient 120V) : Conducteur de véhicule utilitaire léger
- Groupe 4 (coefficient 128V) : Conducteur de véhicule léger qualifié
- Groupe 6 (coefficient 138V) : Conducteur de véhicule léger hautement qualifié

**Conducteurs poids lourds**
- Groupe 6 (coefficient 138) : Conducteur de véhicule poids lourd
- Groupe 7 (coefficient 150) : Conducteur hautement qualifié PL (Super lourd, citerne, matières dangereuses...)
- 150M : Conducteur très qualifié « maître »

**Conducteurs Voyageurs**
- Groupe 7 (coefficient 140V) : Conducteur receveur
- Groupe 9 (coefficient 150V) : Conducteur hautement qualifié voyageurs
- Groupe 10 : Conducteur grand tourisme

**Points importants :**
- Le « V » après le coefficient désigne les coefficients spécifiques aux voyageurs
- La classification dépend du type de véhicule, du tonnage, et des compétences requises
- Le passage d'un groupe à un autre suppose une reconnaissance de compétences additionnelles`,
        keyPoints: [
          "Classification différenciée selon le type de véhicule",
          "Le suffixe 'V' désigne les conducteurs voyageurs",
          "150M = plus haut niveau conducteur",
          "Classification liée au véhicule, tonnage et compétences"
        ],
        quiz: [
          {
            question: "Que signifie le suffixe 'V' dans les coefficients ?",
            options: ["Véhicule", "Variable", "Voyageurs", "Volontaire"],
            correctIndex: 2,
            explanation: "Le 'V' désigne les coefficients spécifiques aux conducteurs de voyageurs."
          }
        ]
      }
    ]
  },
  {
    id: "temps-travail",
    title: "Durée et temps de travail",
    icon: "Clock",
    description: "Régime spécifique du temps de travail dans les transports",
    color: "#e8842c",
    sections: [
      {
        id: "tt-1",
        title: "Durées maximales de travail",
        content: `Le secteur du transport routier dispose d'un régime dérogatoire par rapport au droit commun en matière de durée du travail :

**Durée légale et conventionnelle :**
- Durée légale : **35 heures** par semaine (droit commun)
- Temps de service : notion spécifique au transport qui englobe plus que le seul temps de conduite

**Durées maximales pour les conducteurs routiers :**
- **Durée journalière maximale** : 10 heures (peut être étendue à 12 heures dans certains cas)
- **Durée hebdomadaire maximale** : 48 heures sur une semaine isolée
- **Durée hebdomadaire moyenne** : 44 heures sur 12 semaines consécutives (au lieu de 46 en droit commun)
- **Temps de conduite journalier** : 9 heures maximum (10 heures deux fois par semaine)
- **Temps de conduite hebdomadaire** : 56 heures maximum
- **Temps de conduite bi-hebdomadaire** : 90 heures sur 2 semaines consécutives

**Le temps de service comprend :**
- Le temps de conduite
- Les temps d'attente et de disponibilité
- Les temps de chargement/déchargement
- Les temps d'entretien du véhicule
- Les temps administratifs liés au transport`,
        keyPoints: [
          "Durée maximale journalière : 10h (12h exceptionnellement)",
          "Durée maximale hebdomadaire : 48h (semaine isolée)",
          "Temps de conduite : 9h/jour, 56h/semaine, 90h/2 semaines",
          "Le temps de service inclut conduite + attente + chargement"
        ],
        quiz: [
          {
            question: "Quelle est la durée maximale de conduite journalière ?",
            options: ["8 heures", "9 heures", "10 heures", "12 heures"],
            correctIndex: 1,
            explanation: "Le temps de conduite journalier est limité à 9 heures (10 heures deux fois par semaine maximum)."
          },
          {
            question: "Quelle est la durée maximale de conduite sur 2 semaines consécutives ?",
            options: ["80 heures", "90 heures", "96 heures", "100 heures"],
            correctIndex: 1,
            explanation: "Le temps de conduite bi-hebdomadaire est limité à 90 heures sur 2 semaines consécutives."
          }
        ]
      },
      {
        id: "tt-2",
        title: "Repos et pauses obligatoires",
        content: `Le Règlement Social Européen (RSE) et la CCN imposent des règles strictes en matière de repos :

**Pauses :**
- Après **4h30 de conduite** : pause obligatoire de **45 minutes**
- Cette pause peut être fractionnée : **15 min + 30 min** (dans cet ordre)
- Les pauses ne sont pas rémunérées sauf dispositions plus favorables

**Repos journalier :**
- **Repos normal** : 11 heures consécutives minimum
- **Repos réduit** : 9 heures minimum (autorisé 3 fois entre 2 repos hebdomadaires)
- En équipage : 9 heures dans une période de 30 heures

**Repos hebdomadaire :**
- **Repos normal** : 45 heures consécutives
- **Repos réduit** : 24 heures minimum
- Un repos normal doit être pris au moins toutes les 2 semaines
- La réduction doit être compensée en bloc avant la fin de la 3ème semaine

**Double équipage :**
- 9 heures de repos dans une période de 30 heures
- Possibilité de prendre 1 heure de repos hors véhicule pendant les 30 premières minutes`,
        keyPoints: [
          "Pause de 45 min après 4h30 de conduite",
          "Repos journalier : 11h (réduit 9h, 3 fois max)",
          "Repos hebdomadaire : 45h (réduit 24h minimum)",
          "Repos hebdo normal obligatoire toutes les 2 semaines"
        ],
        quiz: [
          {
            question: "Après combien d'heures de conduite la pause est-elle obligatoire ?",
            options: ["3 heures", "4 heures", "4h30", "5 heures"],
            correctIndex: 2,
            explanation: "La pause obligatoire de 45 minutes doit être prise après 4h30 de conduite."
          },
          {
            question: "Comment peut-on fractionner la pause de 45 minutes ?",
            options: ["20 min + 25 min", "15 min + 30 min", "22 min + 23 min", "30 min + 15 min"],
            correctIndex: 1,
            explanation: "La pause peut être fractionnée en 15 min + 30 min, dans cet ordre obligatoirement."
          }
        ]
      },
      {
        id: "tt-3",
        title: "Heures supplémentaires et équivalences",
        content: `Le transport routier dispose d'un système spécifique pour les heures supplémentaires :

**Régime d'équivalence (personnel roulant « grands routiers ») :**
- La durée équivalente est de **43 heures** par semaine pour les conducteurs « grands routiers »
- Les heures supplémentaires se décomptent au-delà de 43h (et non 35h)
- Pour les conducteurs « courte distance » : pas de régime d'équivalence, HS au-delà de 35h

**Taux de majoration :**
- De la 36ème à la 43ème heure : **25%** (heures d'équivalence pour grands routiers)
- Au-delà de 43h : **25%** pour les 8 premières heures, puis **50%**
- Pour les courte distance : **25%** de la 36ème à la 43ème heure, **50%** au-delà

**Contingent annuel :**
- **Contingent d'heures supplémentaires** : 195 heures par an pour les conducteurs grands routiers
- Au-delà du contingent : repos compensateur obligatoire

**Garanties de rémunération :**
- Les heures d'équivalence (de 35 à 43h) sont rémunérées au taux normal + majoration
- Elles donnent lieu à une garantie minimale mensuelle de rémunération`,
        keyPoints: [
          "Grands routiers : équivalence à 43h/semaine",
          "Courte distance : HS au-delà de 35h",
          "Majorations : 25% puis 50%",
          "Contingent annuel : 195h pour grands routiers"
        ],
        quiz: [
          {
            question: "Quelle est la durée équivalente hebdomadaire pour un conducteur grand routier ?",
            options: ["35 heures", "39 heures", "43 heures", "48 heures"],
            correctIndex: 2,
            explanation: "La durée équivalente est de 43 heures par semaine pour les conducteurs grands routiers."
          }
        ]
      }
    ]
  },
  {
    id: "remuneration",
    title: "Rémunération",
    icon: "Wallet",
    description: "Salaires, primes et indemnités spécifiques au transport",
    color: "#1e2d3d",
    sections: [
      {
        id: "rem-1",
        title: "Salaires minimaux conventionnels",
        content: `La CCN fixe des **salaires minimaux** pour chaque catégorie et coefficient :

**Principes :**
- Les minima conventionnels sont fixés par des accords de branche régulièrement négociés
- Ils ne peuvent être inférieurs au SMIC
- Ils sont calculés sur la base de la durée légale (151,67h/mois) ou de l'équivalence

**Structure de la rémunération des conducteurs :**
- **Salaire de base** : calculé sur le minimum conventionnel du coefficient
- **Heures d'équivalence** : pour les grands routiers (de 35h à 43h)
- **Heures supplémentaires** : au-delà de la durée conventionnelle
- **Indemnités de déplacement** : frais de repas et de découcher
- **Primes** : ancienneté, qualité, etc.

**Garanties minimales mensuelles :**
- La rémunération mensuelle ne peut être inférieure au minimum garanti
- Ce minimum inclut le salaire de base + heures d'équivalence + majorations
- Les indemnités de déplacement ne sont PAS incluses dans ce calcul`,
        keyPoints: [
          "Minima fixés par accords de branche réguliers",
          "Structure : base + équivalence + HS + indemnités + primes",
          "Garantie mensuelle minimale obligatoire",
          "Indemnités de déplacement exclues du minimum garanti"
        ],
        quiz: [
          {
            question: "Les indemnités de déplacement sont-elles incluses dans la garantie minimale mensuelle ?",
            options: ["Oui toujours", "Non jamais", "Seulement pour les grands routiers", "Seulement si > 50% du salaire"],
            correctIndex: 1,
            explanation: "Les indemnités de déplacement ne sont PAS incluses dans le calcul de la garantie minimale mensuelle."
          }
        ]
      },
      {
        id: "rem-2",
        title: "Indemnités de déplacement",
        content: `Les indemnités de déplacement sont essentielles dans la rémunération des conducteurs routiers :

**Types d'indemnités :**

**1. Indemnité de repas unique**
- Versée lorsque le salarié est en déplacement pendant l'heure du repas
- Montant fixé par la CCN et revalorisé régulièrement
- Soumise au régime social et fiscal des frais professionnels (exonérée sous certains plafonds URSSAF)

**2. Indemnité de repas (grand déplacement)**
- Versée lors de déplacements éloignés empêchant le retour au domicile
- Couvre les frais de repas du midi ET du soir

**3. Indemnité de découcher (nuitée)**
- Versée lorsque le conducteur ne peut regagner son domicile pour y dormir
- Couvre les frais d'hébergement

**4. Indemnité de repas unique + découcher**
- Cumul des deux indemnités en cas de grand déplacement avec nuitée

**Régime social :**
- Exonération de cotisations sociales dans la limite des plafonds URSSAF
- Au-delà des plafonds : soumission à cotisations
- L'employeur doit pouvoir justifier la réalité du déplacement`,
        keyPoints: [
          "4 types : repas unique, repas grand déplacement, découcher, cumul",
          "Exonération sous plafonds URSSAF",
          "Revalorisées régulièrement par accord de branche",
          "L'employeur doit justifier la réalité du déplacement"
        ],
        quiz: [
          {
            question: "Quand l'indemnité de découcher est-elle versée ?",
            options: ["À chaque déplacement", "Quand le conducteur ne peut rentrer dormir chez lui", "Seulement les week-ends", "Quand le trajet dépasse 200 km"],
            correctIndex: 1,
            explanation: "L'indemnité de découcher est versée lorsque le conducteur ne peut regagner son domicile pour y dormir."
          }
        ]
      },
      {
        id: "rem-3",
        title: "Prime d'ancienneté",
        content: `La CCN prévoit une **prime d'ancienneté** obligatoire :

**Taux de la prime :**
- **2%** après 2 ans d'ancienneté
- **4%** après 5 ans
- **6%** après 10 ans
- **8%** après 15 ans

**Base de calcul :**
- La prime est calculée sur le **minimum conventionnel** du coefficient du salarié
- Elle est versée mensuellement
- Elle doit apparaître distinctement sur le bulletin de paie

**Points d'attention :**
- L'ancienneté se calcule à partir de la **date d'entrée dans l'entreprise**
- Les périodes de suspension du contrat (maladie, maternité, etc.) comptent en principe dans l'ancienneté
- La reprise d'ancienneté d'un employeur précédent peut être prévue contractuellement
- La prime d'ancienneté s'ajoute au salaire de base et ne peut s'y substituer`,
        keyPoints: [
          "Taux progressif : 2%, 4%, 6%, 8%",
          "Paliers : 2 ans, 5 ans, 10 ans, 15 ans",
          "Calculée sur le minimum conventionnel",
          "Doit figurer distinctement sur le bulletin de paie"
        ],
        quiz: [
          {
            question: "Quel est le taux de la prime d'ancienneté après 10 ans ?",
            options: ["4%", "6%", "8%", "10%"],
            correctIndex: 1,
            explanation: "Après 10 ans d'ancienneté, le taux de la prime est de 6%."
          },
          {
            question: "Sur quelle base est calculée la prime d'ancienneté ?",
            options: ["Le SMIC", "Le salaire brut total", "Le minimum conventionnel", "Le salaire net"],
            correctIndex: 2,
            explanation: "La prime d'ancienneté est calculée sur le minimum conventionnel du coefficient du salarié."
          }
        ]
      }
    ]
  },
  {
    id: "contrat",
    title: "Contrat de travail",
    icon: "FileText",
    description: "Embauche, période d'essai, modification et rupture du contrat",
    color: "#2a3d50",
    sections: [
      {
        id: "ct-1",
        title: "Période d'essai",
        content: `La CCN fixe des durées de période d'essai spécifiques, souvent plus favorables que le Code du travail :

**Durées de la période d'essai :**

| Catégorie | Durée initiale | Renouvellement | Durée maximale |
|-----------|---------------|----------------|----------------|
| Ouvriers | 2 mois | 1 mois | 3 mois |
| Employés | 2 mois | 1 mois | 3 mois |
| TAM | 3 mois | 2 mois | 5 mois |
| Cadres | 4 mois | 4 mois | 8 mois |

**Conditions du renouvellement :**
- Le renouvellement doit être prévu dans le **contrat de travail** ou la **lettre d'engagement**
- Il doit faire l'objet d'un **accord exprès** du salarié avant l'expiration de la période initiale
- Un simple silence du salarié ne vaut pas accord

**Délais de prévenance en cas de rupture :**
- Pendant la période d'essai, un délai de prévenance doit être respecté
- Par l'employeur : de 24h à 1 mois selon la durée de présence
- Par le salarié : 48 heures (24h si présence < 8 jours)`,
        keyPoints: [
          "Ouvriers/Employés : 2 mois (+1 renouvellement)",
          "TAM : 3 mois (+2 renouvellement)",
          "Cadres : 4 mois (+4 renouvellement)",
          "Renouvellement = accord exprès du salarié obligatoire"
        ],
        quiz: [
          {
            question: "Quelle est la durée maximale de la période d'essai pour un cadre (renouvellement compris) ?",
            options: ["4 mois", "6 mois", "8 mois", "12 mois"],
            correctIndex: 2,
            explanation: "Pour un cadre, la période d'essai est de 4 mois renouvelable 4 mois, soit 8 mois maximum."
          }
        ]
      },
      {
        id: "ct-2",
        title: "Préavis de licenciement et démission",
        content: `La CCN prévoit des durées de préavis qui varient selon la catégorie et l'ancienneté :

**Préavis de licenciement :**

| Catégorie | < 2 ans ancienneté | ≥ 2 ans ancienneté |
|-----------|-------------------|-------------------|
| Ouvriers | 1 mois | 2 mois |
| Employés | 1 mois | 2 mois |
| TAM | 2 mois | 2 mois |
| Cadres | 3 mois | 3 mois |

**Préavis de démission :**

| Catégorie | Durée |
|-----------|-------|
| Ouvriers | 1 semaine (< 6 mois) / 1 mois (6 mois-2 ans) / 2 mois (≥ 2 ans) |
| Employés | Identique aux ouvriers |
| TAM | 2 mois |
| Cadres | 3 mois |

**Heures de recherche d'emploi :**
- Pendant le préavis : **2 heures par jour** de libre pour recherche d'emploi
- Non cumulables sauf accord
- En cas de licenciement : rémunérées
- En cas de démission : non rémunérées`,
        keyPoints: [
          "Licenciement : préavis de 1 à 3 mois selon catégorie/ancienneté",
          "Cadres : 3 mois de préavis dans tous les cas",
          "2h/jour de recherche d'emploi pendant le préavis",
          "Heures rémunérées en cas de licenciement uniquement"
        ],
        quiz: [
          {
            question: "Quelle est la durée du préavis de licenciement pour un ouvrier avec 3 ans d'ancienneté ?",
            options: ["1 mois", "2 mois", "3 mois", "6 mois"],
            correctIndex: 1,
            explanation: "Pour un ouvrier avec 2 ans ou plus d'ancienneté, le préavis de licenciement est de 2 mois."
          }
        ]
      },
      {
        id: "ct-3",
        title: "Indemnité de licenciement",
        content: `La CCN prévoit des indemnités de licenciement plus favorables que le minimum légal :

**Conditions :**
- Ancienneté minimale : **8 mois** (alignée sur le légal depuis les ordonnances Macron)
- Licenciement non lié à une faute grave ou lourde

**Calcul de l'indemnité conventionnelle :**

**Pour les Ouvriers et Employés :**
- **2/10ème de mois** par année d'ancienneté pour les 10 premières années
- **3/10ème de mois** par année au-delà de 10 ans

**Pour les TAM :**
- **2/10ème de mois** par année pour les 10 premières années
- **3/10ème de mois** par année au-delà

**Pour les Cadres :**
- **3/10ème de mois** par année d'ancienneté pour les 10 premières années
- **4/10ème de mois** par année au-delà de 10 ans

**Salaire de référence :**
- Moyenne des 12 derniers mois OU des 3 derniers mois (au plus favorable)
- Les primes et gratifications sont prises en compte au prorata

**Comparaison avec l'indemnité légale :**
- Légal : 1/4 de mois par année jusqu'à 10 ans + 1/3 au-delà
- La CCN est souvent plus favorable pour les cadres et les fortes anciennetés`,
        keyPoints: [
          "Ouvriers/Employés : 2/10 puis 3/10 après 10 ans",
          "Cadres : 3/10 puis 4/10 après 10 ans",
          "Ancienneté minimale : 8 mois",
          "Base : moyenne des 12 ou 3 derniers mois (le plus favorable)"
        ],
        quiz: [
          {
            question: "Pour un cadre avec 15 ans d'ancienneté, quel sera le calcul de l'indemnité ?",
            options: [
              "15 x 2/10 de mois",
              "10 x 3/10 + 5 x 4/10 de mois",
              "15 x 3/10 de mois",
              "15 x 1/4 de mois"
            ],
            correctIndex: 1,
            explanation: "Pour un cadre : 3/10 par année pour les 10 premières années + 4/10 par année au-delà, soit 10 x 3/10 + 5 x 4/10."
          }
        ]
      }
    ]
  },
  {
    id: "conges",
    title: "Congés et absences",
    icon: "Calendar",
    description: "Congés payés, jours fériés et absences spécifiques",
    color: "#e8842c",
    sections: [
      {
        id: "cg-1",
        title: "Congés payés",
        content: `La CCN prévoit des dispositions spécifiques en matière de congés payés :

**Droit aux congés :**
- **30 jours ouvrables** de congés payés (5 semaines) comme le minimum légal
- Période de référence : 1er juin au 31 mai (sauf accord d'entreprise)

**Jours de congés supplémentaires pour ancienneté :**
- Après **5 ans** d'ancienneté : **+1 jour** ouvrable
- Après **10 ans** d'ancienneté : **+2 jours** ouvrables
- Après **15 ans** d'ancienneté : **+3 jours** ouvrables
- Après **20 ans** d'ancienneté : **+4 jours** ouvrables

**Fractionnement :**
- Si une partie des congés est prise en dehors de la période légale (1er mai - 31 octobre)
- **1 jour de fractionnement** : si 3 à 5 jours ouvrables hors période
- **2 jours de fractionnement** : si 6 jours ou plus hors période

**Indemnité de congés payés :**
- Règle du 1/10ème ou maintien de salaire (le plus favorable)
- Les indemnités de déplacement ne sont pas incluses dans le calcul`,
        keyPoints: [
          "5 semaines + jours supplémentaires pour ancienneté",
          "Suppléments : +1j (5 ans), +2j (10 ans), +3j (15 ans), +4j (20 ans)",
          "Jours de fractionnement selon la période de prise",
          "Calcul : 1/10ème ou maintien (le plus favorable)"
        ],
        quiz: [
          {
            question: "Combien de jours de congés supplémentaires un salarié avec 15 ans d'ancienneté obtient-il ?",
            options: ["1 jour", "2 jours", "3 jours", "4 jours"],
            correctIndex: 2,
            explanation: "Après 15 ans d'ancienneté, le salarié bénéficie de 3 jours ouvrables supplémentaires."
          }
        ]
      },
      {
        id: "cg-2",
        title: "Jours fériés et absences",
        content: `**Jours fériés :**
- Les 11 jours fériés légaux s'appliquent
- **1er mai** : chômé et payé (si travaillé : majoration 100%)
- Autres jours fériés : le chômage est en principe sans perte de salaire
- Travail un jour férié : majoration selon les dispositions conventionnelles ou d'entreprise

**Absences pour événements familiaux (sans perte de salaire) :**
- Mariage/PACS du salarié : **4 jours** (Cadres : 1 semaine si > 1 an ancienneté)
- Mariage d'un enfant : **1 jour**
- Naissance/adoption : **3 jours**
- Décès du conjoint/partenaire PACS : **3 jours** (Cadres : 1 semaine)
- Décès d'un enfant : **5 jours** (+ 8 jours de deuil si < 25 ans)
- Décès père/mère : **3 jours**
- Décès frère/soeur : **3 jours**
- Décès beau-père/belle-mère : **3 jours**

**Maladie et maintien de salaire :**
- Après **1 an d'ancienneté** : maintien de salaire par l'employeur
- Sous réserve d'indemnisation par la Sécurité sociale (délai de carence de 3 jours)
- Le maintien varie selon l'ancienneté et la durée de l'arrêt`,
        keyPoints: [
          "11 jours fériés légaux + majorations spécifiques",
          "Congés familiaux plus favorables que le légal pour les cadres",
          "Maintien de salaire maladie après 1 an d'ancienneté",
          "1er mai : si travaillé = majoration 100%"
        ],
        quiz: [
          {
            question: "Combien de jours de congé pour le mariage d'un salarié non-cadre ?",
            options: ["3 jours", "4 jours", "5 jours", "1 semaine"],
            correctIndex: 1,
            explanation: "La CCN accorde 4 jours de congé pour le mariage d'un salarié non-cadre."
          }
        ]
      }
    ]
  },
  {
    id: "specifiques",
    title: "Dispositions spécifiques transport",
    icon: "Truck",
    description: "Règles propres au secteur du transport routier",
    color: "#1e2d3d",
    sections: [
      {
        id: "sp-1",
        title: "Le chronotachygraphe",
        content: `Le chronotachygraphe est l'outil fondamental de contrôle dans le transport routier :

**Obligation :**
- Tout véhicule de transport routier de **plus de 3,5 tonnes** (marchandises) ou de **plus de 9 places** (voyageurs) doit être équipé
- Le **chronotachygraphe numérique** est obligatoire pour tous les véhicules neufs depuis 2006
- Depuis août 2023 : **chronotachygraphe intelligent de 2ème génération** obligatoire

**Données enregistrées :**
- Temps de conduite
- Autres travaux
- Disponibilité
- Repos et pauses
- Vitesse du véhicule
- Distance parcourue

**Obligations du conducteur :**
- Insérer sa **carte conducteur** au début de chaque service
- Enregistrer manuellement les activités hors véhicule (saisie manuelle)
- Ne pas retirer la carte en cours de journée (sauf panne ou contrôle)
- Pouvoir présenter les données des **28 jours précédents** lors d'un contrôle

**Obligations de l'employeur :**
- Télécharger les données du chronotachygraphe au moins tous les **90 jours**
- Télécharger les données de la carte conducteur au moins tous les **28 jours**
- Conserver les données pendant **1 an minimum**
- Former les conducteurs à l'utilisation du chronotachygraphe`,
        keyPoints: [
          "Obligatoire pour véhicules > 3,5t ou > 9 places",
          "Carte conducteur : données des 28 derniers jours",
          "Téléchargement véhicule : tous les 90 jours",
          "Téléchargement carte : tous les 28 jours"
        ],
        quiz: [
          {
            question: "Tous les combien l'employeur doit-il télécharger les données de la carte conducteur ?",
            options: ["14 jours", "28 jours", "60 jours", "90 jours"],
            correctIndex: 1,
            explanation: "Les données de la carte conducteur doivent être téléchargées au moins tous les 28 jours."
          },
          {
            question: "Combien de jours de données le conducteur doit-il pouvoir présenter lors d'un contrôle ?",
            options: ["7 jours", "14 jours", "28 jours", "90 jours"],
            correctIndex: 2,
            explanation: "Le conducteur doit pouvoir présenter les données des 28 jours précédents lors d'un contrôle."
          }
        ]
      },
      {
        id: "sp-2",
        title: "Transport de matières dangereuses (TMD)",
        content: `Le transport de matières dangereuses est soumis à une réglementation renforcée :

**Réglementation applicable :**
- **ADR** (Accord européen relatif au transport international des marchandises dangereuses par route)
- Le Code des transports
- Arrêté TMD

**Formation obligatoire :**
- **Formation initiale** : certificat ADR de base (durée : 18 heures minimum)
- **Spécialisations** : citerne, classe 1 (explosifs), classe 7 (radioactifs)
- **Recyclage** : tous les **5 ans** avant l'expiration du certificat
- La formation est dispensée par des organismes agréés

**Obligations documentaires :**
- Document de transport avec informations sur la matière dangereuse
- Consignes écrites de sécurité
- Certificat ADR du conducteur
- Agrément du véhicule si applicable

**Classification des conducteurs :**
- Les conducteurs TMD sont classés au minimum **groupe 7 (coefficient 150)**
- Coefficient supérieur pour certaines spécialisations (citerne, explosifs)
- Prime de danger ou sujétion selon les entreprises`,
        keyPoints: [
          "ADR : réglementation européenne pour le TMD",
          "Formation initiale : 18h minimum",
          "Recyclage tous les 5 ans",
          "Conducteurs TMD : minimum coefficient 150"
        ],
        quiz: [
          {
            question: "Tous les combien d'années le certificat ADR doit-il être renouvelé ?",
            options: ["3 ans", "5 ans", "7 ans", "10 ans"],
            correctIndex: 1,
            explanation: "Le certificat ADR doit être recyclé tous les 5 ans avant son expiration."
          }
        ]
      },
      {
        id: "sp-3",
        title: "Formation professionnelle obligatoire (FIMO/FCO)",
        content: `Les conducteurs routiers sont soumis à des obligations de formation spécifiques :

**FIMO (Formation Initiale Minimale Obligatoire) :**
- Obligatoire pour tout nouveau conducteur (sauf titulaires de certains diplômes)
- **Durée** : 140 heures (4 semaines)
- **Contenu** : perfectionnement conduite, réglementation, santé/sécurité, service/logistique
- Donne lieu à la délivrance d'une **carte de qualification conducteur** (CQC)

**FCO (Formation Continue Obligatoire) :**
- **Durée** : 35 heures (1 semaine)
- **Fréquence** : tous les **5 ans**
- Obligatoire pour conserver le droit de conduire professionnellement
- Contenu actualisé selon l'évolution réglementaire

**Passerelle :**
- Passage de « marchandises » à « voyageurs » (ou inversement) : **35 heures** de formation complémentaire

**Financement :**
- La formation est à la charge de l'employeur
- Réalisée sur le temps de travail
- Prise en charge possible par l'OPCO (Opérateur de Compétences)`,
        keyPoints: [
          "FIMO : 140h (formation initiale)",
          "FCO : 35h tous les 5 ans",
          "Carte de qualification conducteur obligatoire",
          "Formation à la charge de l'employeur"
        ],
        quiz: [
          {
            question: "Quelle est la durée de la FIMO ?",
            options: ["35 heures", "70 heures", "105 heures", "140 heures"],
            correctIndex: 3,
            explanation: "La FIMO dure 140 heures, soit 4 semaines de formation."
          },
          {
            question: "Quelle est la fréquence de la FCO ?",
            options: ["Tous les 2 ans", "Tous les 3 ans", "Tous les 5 ans", "Tous les 10 ans"],
            correctIndex: 2,
            explanation: "La FCO doit être renouvelée tous les 5 ans."
          }
        ]
      }
    ]
  },
  {
    id: "sante-securite",
    title: "Santé et sécurité",
    icon: "Shield",
    description: "Visite médicale, aptitude et prévention des risques",
    color: "#e8842c",
    sections: [
      {
        id: "ss-1",
        title: "Suivi médical renforcé",
        content: `Les conducteurs routiers bénéficient d'un **suivi individuel renforcé** (SIR) :

**Visite médicale d'aptitude :**
- Examen médical d'aptitude **avant l'embauche** (pas de simple visite d'information)
- Réalisée par le **médecin du travail**
- Renouvellement : au maximum tous les **2 ans** (au lieu de 5 ans en droit commun)

**Aptitude à la conduite :**
- Le permis de conduire nécessite un contrôle médical spécifique (préfectoral)
- Le médecin du travail vérifie l'aptitude au poste de conducteur
- **Double contrôle** : médecin agréé (permis) + médecin du travail (aptitude au poste)

**Cas d'inaptitude :**
- Si le conducteur est déclaré inapte : obligation de **reclassement** par l'employeur
- Recherche d'un poste compatible avec les capacités du salarié
- Si impossible : licenciement pour inaptitude
- Indemnité spécifique selon l'origine de l'inaptitude (professionnelle ou non)

**Alcool et stupéfiants :**
- Tolérance zéro pour les conducteurs de transport en commun
- Contrôles possibles par l'employeur (éthylotest)
- Sanctions disciplinaires pouvant aller jusqu'au licenciement pour faute grave`,
        keyPoints: [
          "Suivi individuel renforcé (SIR) obligatoire",
          "Visite tous les 2 ans maximum",
          "Double contrôle : permis + aptitude au poste",
          "Obligation de reclassement en cas d'inaptitude"
        ],
        quiz: [
          {
            question: "Quelle est la fréquence maximale du renouvellement de la visite médicale pour un conducteur ?",
            options: ["1 an", "2 ans", "3 ans", "5 ans"],
            correctIndex: 1,
            explanation: "La visite médicale d'aptitude doit être renouvelée au maximum tous les 2 ans pour les conducteurs."
          }
        ]
      },
      {
        id: "ss-2",
        title: "Prévention des risques professionnels",
        content: `Le transport routier présente des risques spécifiques nécessitant une prévention adaptée :

**Principaux risques :**
- **Risque routier** : premier risque professionnel (accidents de la route)
- **Risque de chargement/déchargement** : manutention manuelle, chutes
- **Risque de postures** : position assise prolongée, vibrations
- **Risque psychosocial** : isolement, stress, pression des délais
- **Risque chimique** : exposition aux carburants, matières dangereuses

**Obligations de l'employeur :**
- Évaluation des risques (Document Unique d'Évaluation - DUERP)
- Formation à la sécurité
- Fourniture d'EPI (équipements de protection individuelle)
- Aménagement des postes de travail
- Suivi des temps de conduite et repos

**Le chargement et déchargement :**
- **Protocole de sécurité** obligatoire entre l'entreprise de transport et le lieu de chargement
- Le conducteur peut **refuser** un chargement non conforme aux règles de sécurité
- Les temps de chargement/déchargement sont du **temps de travail effectif**`,
        keyPoints: [
          "Risque routier = premier risque professionnel du secteur",
          "DUERP obligatoire et adapté aux spécificités transport",
          "Protocole de sécurité pour chargement/déchargement",
          "Droit de refus du conducteur en cas de danger"
        ],
        quiz: [
          {
            question: "Le conducteur peut-il refuser un chargement non conforme aux règles de sécurité ?",
            options: ["Non, jamais", "Oui, c'est un droit", "Seulement avec accord de l'employeur", "Seulement pour les matières dangereuses"],
            correctIndex: 1,
            explanation: "Le conducteur a le droit de refuser un chargement non conforme aux règles de sécurité."
          }
        ]
      }
    ]
  },
  {
    id: "representation",
    title: "Représentation du personnel",
    icon: "MessageSquare",
    description: "CSE, négociation collective et dialogue social dans les transports",
    color: "#2a3d50",
    sections: [
      {
        id: "rp-1",
        title: "CSE et institutions représentatives",
        content: `Le transport routier présente des particularités en matière de représentation du personnel :

**Comité Social et Économique (CSE) :**
- Obligatoire dans les entreprises de **11 salariés et plus**
- Rôle : dialogue social, réclamations, santé-sécurité, consultation sur les décisions importantes
- **Commission Santé, Sécurité et Conditions de Travail (CSSCT)** obligatoire dans les entreprises de 300+ salariés ou celles présentant des risques particuliers

**Spécificités transport :**
- **Difficulté de réunir les conducteurs** : horaires décalés, déplacements
- Possibilité de recourir à la **visioconférence**
- Heures de délégation adaptées aux contraintes du métier
- Les conducteurs élus bénéficient de la même protection que les autres salariés protégés

**Négociation collective :**
- **NAO (Négociation Annuelle Obligatoire)** : salaires, temps de travail, partage de la valeur ajoutée
- Accords d'entreprise possibles sur de nombreux sujets depuis 2017
- Le dialogue social de branche reste central dans le transport (accords salariaux, classifications)

**Droit de grève :**
- Le droit de grève s'applique dans le secteur privé du transport
- Pas de service minimum obligatoire (contrairement au service public)
- Le préavis de grève n'est pas obligatoire dans le secteur privé`,
        keyPoints: [
          "CSE obligatoire dès 11 salariés",
          "CSSCT obligatoire dans les entreprises de 300+ salariés",
          "Visioconférence possible pour réunir les conducteurs",
          "NAO obligatoire : salaires, temps de travail, etc."
        ],
        quiz: [
          {
            question: "À partir de quel effectif le CSE est-il obligatoire ?",
            options: ["5 salariés", "11 salariés", "20 salariés", "50 salariés"],
            correctIndex: 1,
            explanation: "Le CSE est obligatoire dans les entreprises de 11 salariés et plus."
          }
        ]
      }
    ]
  }
];

export function getTotalQuestions(): number {
  let count = 0;
  modules.forEach(m => m.sections.forEach(s => { if (s.quiz) count += s.quiz.length; }));
  return count;
}

export function getTotalSections(): number {
  return modules.reduce((acc, m) => acc + m.sections.length, 0);
}
