export interface SEOPage {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  letterType: string;
  company?: string;
  heroText: string;
  legalInfo: string;
  faqItems: { q: string; a: string }[];
  relatedSlugs: string[];
}

export const SEO_PAGES: SEOPage[] = [
  // ═══════════════════════════════════════════════
  // RÉSILIATION TÉLÉCOM / INTERNET
  // ═══════════════════════════════════════════════

  {
    slug: "resiliation-free-mobile",
    title: "Résilier Free Mobile — Lettre type gratuite",
    metaTitle: "Résilier Free Mobile — Lettre type 2026",
    metaDescription: "Générez une lettre de résiliation Free Mobile personnalisée en 2 min. Conforme loi Chatel & Hamon, export PDF immédiat.",
    letterType: "resiliation",
    company: "Free Mobile",
    heroText: "Vous souhaitez quitter votre forfait Free Mobile ? Notre générateur crée en 2 minutes un courrier de résiliation conforme, avec les mentions légales obligatoires et l'adresse du service résiliation Free déjà remplie.",
    legalInfo: "Depuis la loi Chatel (article L113-15-1 du Code des assurances) et la loi Hamon (article L224-1 du Code de la consommation), tout abonné peut résilier son forfait mobile à tout moment après la première année d'engagement, sans frais. Free Mobile propose majoritairement des forfaits sans engagement, résiliables à tout moment avec un préavis de 10 jours. Si vous êtes encore engagé, les frais de résiliation sont plafonnés : vous ne paierez au maximum que le quart des mensualités restantes après 12 mois.",
    faqItems: [
      { q: "Quel est le préavis de résiliation chez Free Mobile ?", a: "Le préavis est de 10 jours à compter de la réception de votre courrier par Free. Votre ligne reste active pendant cette période." },
      { q: "Puis-je résilier Free Mobile sans frais ?", a: "Oui, la quasi-totalité des forfaits Free Mobile sont sans engagement. Si vous êtes engagé (offre subventionnée), les frais sont plafonnés au quart des mensualités restantes après le 12e mois (article L224-1 du Code de la consommation)." },
      { q: "Où envoyer ma lettre de résiliation Free Mobile ?", a: "Adressez votre courrier à : Free Mobile — Service Résiliation, 75371 Paris Cedex 08. Un envoi en recommandé avec accusé de réception est conseillé pour conserver une preuve." },
      { q: "Puis-je conserver mon numéro en résiliant Free ?", a: "Oui, demandez votre code RIO (relevé d'identité opérateur) en appelant le 3179. Communiquez-le à votre nouvel opérateur qui se chargera de la portabilité et de la résiliation." },
    ],
    relatedSlugs: ["resiliation-free-box", "resiliation-sfr-mobile", "resiliation-orange-mobile"],
  },

  {
    slug: "resiliation-free-box",
    title: "Résilier Freebox — Lettre type gratuite",
    metaTitle: "Résilier Freebox (Internet) — Lettre 2026",
    metaDescription: "Créez votre lettre de résiliation Freebox en 2 min. Mentions légales incluses, PDF prêt à envoyer.",
    letterType: "resiliation",
    company: "Free Box",
    heroText: "Vous déménagez ou changez de fournisseur internet ? Générez un courrier de résiliation Freebox complet, avec les références légales et l'adresse du service résiliation. Il ne vous reste plus qu'à l'envoyer.",
    legalInfo: "La résiliation d'un abonnement Freebox est encadrée par l'article L224-1 du Code de la consommation (loi Hamon). Après 12 mois d'engagement, vous pouvez résilier à tout moment moyennant un préavis de 10 jours. En cas de déménagement dans une zone non couverte par Free, la résiliation est possible sans frais même pendant la période d'engagement (article L224-39 du Code de la consommation). Free facture des frais de résiliation de 49 € pour la Freebox, sauf motif légitime.",
    faqItems: [
      { q: "Quels sont les frais de résiliation Freebox ?", a: "Free facture 49 € de frais de résiliation pour toute Freebox. Si vous êtes encore engagé, s'ajoutent les mensualités restantes (plafonnées au quart après 12 mois). En cas de motif légitime (déménagement en zone non couverte), aucun frais ne s'applique." },
      { q: "Dois-je renvoyer ma Freebox après résiliation ?", a: "Oui, vous devez retourner le boîtier Freebox et ses accessoires dans les 15 jours suivant la résiliation, via le point relais indiqué par Free. À défaut, des frais de non-restitution seront facturés." },
      { q: "Puis-je résilier ma Freebox pour déménagement ?", a: "Oui. Si Free ne couvre pas votre nouvelle adresse, vous pouvez résilier sans frais (motif légitime). Sinon, vous pouvez demander un transfert de ligne vers votre nouveau logement." },
    ],
    relatedSlugs: ["resiliation-free-mobile", "resiliation-orange-box", "resiliation-bouygues-box"],
  },

  {
    slug: "resiliation-sfr-mobile",
    title: "Résilier SFR Mobile — Lettre type gratuite",
    metaTitle: "Résilier SFR Mobile — Modèle lettre 2026",
    metaDescription: "Lettre de résiliation SFR Mobile personnalisée. Mentions légales, adresse SFR pré-remplie, PDF gratuit.",
    letterType: "resiliation",
    company: "SFR",
    heroText: "Marre de votre forfait SFR ? En quelques clics, obtenez un courrier de résiliation personnalisé avec toutes les mentions légales. L'adresse du service résiliation SFR est déjà intégrée.",
    legalInfo: "Conformément à l'article L224-1 du Code de la consommation, vous pouvez résilier votre forfait SFR mobile à tout moment après la première année d'engagement. Les forfaits sans engagement sont résiliables immédiatement avec un préavis de 10 jours. SFR a l'obligation de confirmer la résiliation sous 10 jours (article D224-9 du Code de la consommation). En cas de hausse tarifaire non prévue au contrat, vous disposez de 4 mois pour résilier sans frais (article L224-33).",
    faqItems: [
      { q: "Où envoyer ma lettre de résiliation SFR ?", a: "Adressez votre courrier à : SFR — Service Résiliation, TSA 73917, 62978 Arras Cedex 9. Privilégiez l'envoi en recommandé avec accusé de réception." },
      { q: "SFR a augmenté mon forfait, puis-je résilier sans frais ?", a: "Oui. En cas de modification unilatérale du tarif, l'article L224-33 du Code de la consommation vous autorise à résilier sans frais dans les 4 mois suivant la notification de la hausse." },
      { q: "Combien de temps prend la résiliation SFR ?", a: "La résiliation prend effet 10 jours après réception de votre courrier par SFR, ou à la date de fin d'engagement si vous êtes encore engagé." },
      { q: "Comment conserver mon numéro en quittant SFR ?", a: "Appelez le 3179 pour obtenir votre code RIO, puis transmettez-le à votre nouvel opérateur. La portabilité s'effectue en 3 jours ouvrés maximum." },
    ],
    relatedSlugs: ["resiliation-sfr-box", "resiliation-red-by-sfr", "resiliation-free-mobile"],
  },

  {
    slug: "resiliation-sfr-box",
    title: "Résilier SFR Box — Lettre type gratuite",
    metaTitle: "Résilier SFR Box Internet — Lettre 2026",
    metaDescription: "Générez votre lettre de résiliation box SFR. Adresse résiliation, mentions légales et PDF inclus.",
    letterType: "resiliation",
    company: "SFR",
    heroText: "Vous quittez votre box SFR internet ? Créez votre courrier de résiliation en répondant à quelques questions. Le document inclut les références juridiques et l'adresse exacte du service résiliation SFR.",
    legalInfo: "La résiliation d'une box internet SFR obéit aux mêmes règles que les forfaits mobiles (article L224-1 du Code de la consommation). Après 12 mois, la résiliation est possible à tout moment moyennant un préavis de 10 jours. SFR facture des frais de résiliation de 49 € en dehors de la période d'engagement. Pendant l'engagement, vous devrez régler les mensualités restantes dues, plafonnées au quart après le 12e mois. En cas de déménagement vers une zone non fibrée par SFR, la résiliation est gratuite.",
    faqItems: [
      { q: "Quels sont les frais de résiliation box SFR ?", a: "SFR applique 49 € de frais de résiliation hors engagement. Si vous êtes encore engagé, s'y ajoutent les mensualités restantes (plafonnées au quart après 12 mois conformément à l'article L224-1 du Code de la consommation)." },
      { q: "Dois-je retourner le matériel SFR ?", a: "Oui, la box SFR et ses équipements (décodeur TV, câbles) doivent être restitués dans un délai de 15 jours. SFR vous envoie une étiquette de retour prépayée. En cas de non-restitution, des pénalités financières s'appliquent." },
      { q: "Puis-je résilier SFR Box si je déménage ?", a: "Si SFR ne dessert pas votre nouvelle adresse, la résiliation est gratuite pour motif légitime. Vous devez fournir un justificatif de domicile à votre nouvelle adresse." },
    ],
    relatedSlugs: ["resiliation-sfr-mobile", "resiliation-free-box", "resiliation-bouygues-box"],
  },

  {
    slug: "resiliation-orange-mobile",
    title: "Résilier Orange Mobile — Lettre type gratuite",
    metaTitle: "Résilier Orange Mobile — Modèle 2026",
    metaDescription: "Lettre de résiliation Orange mobile en 2 min. Loi Chatel & Hamon, export PDF gratuit et immédiat.",
    letterType: "resiliation",
    company: "Orange",
    heroText: "Vous souhaitez résilier votre forfait Orange mobile ? Notre outil génère un courrier professionnel incluant les articles de loi applicables et pré-remplit l'adresse du service client Orange.",
    legalInfo: "La résiliation d'un forfait Orange mobile est régie par l'article L224-1 du Code de la consommation. Hors engagement, la résiliation prend effet 10 jours après la demande. Avec engagement de 12 ou 24 mois, vous devrez régler les mensualités restantes, plafonnées au quart au-delà du 12e mois. Orange propose aussi la résiliation en ligne via l'espace client, mais un courrier recommandé reste la preuve la plus solide en cas de litige. En cas de modification substantielle du contrat par Orange, l'article L224-33 vous donne 4 mois pour résilier gratuitement.",
    faqItems: [
      { q: "Quels sont les délais de résiliation Orange ?", a: "Le préavis est de 10 jours à compter de la prise en compte de votre demande. Orange confirme la date effective de résiliation par SMS ou courrier." },
      { q: "Puis-je résilier Orange depuis mon espace client ?", a: "Oui, Orange permet la résiliation en ligne depuis l'espace client. Cependant, un courrier recommandé constitue une preuve légale plus forte en cas de contestation." },
      { q: "Comment garder mon numéro en quittant Orange ?", a: "Demandez votre RIO en appelant le 3179 depuis votre ligne Orange. Votre nouvel opérateur gère ensuite la portabilité sous 3 jours ouvrés, et la résiliation chez Orange se fait automatiquement." },
    ],
    relatedSlugs: ["resiliation-orange-box", "resiliation-sosh", "resiliation-sfr-mobile"],
  },

  {
    slug: "resiliation-orange-box",
    title: "Résilier Orange Box (Livebox) — Lettre type",
    metaTitle: "Résilier Livebox Orange — Lettre 2026",
    metaDescription: "Résiliez votre Livebox Orange avec une lettre conforme. Mentions légales, adresse pré-remplie, PDF gratuit.",
    letterType: "resiliation",
    company: "Orange",
    heroText: "Vous changez de fournisseur internet ou déménagez ? Générez votre courrier de résiliation Livebox Orange en quelques minutes. Toutes les mentions légales sont incluses automatiquement.",
    legalInfo: "La résiliation de votre Livebox Orange est encadrée par l'article L224-1 du Code de la consommation. Orange impose un engagement de 12 mois sur la plupart de ses offres fibre et ADSL. Passé cette période, la résiliation s'effectue avec un préavis de 10 jours. Orange facture des frais de résiliation de 49 € hors période d'engagement. Pendant l'engagement, le solde dû est calculé sur les mensualités restantes, avec un plafonnement au quart au-delà du 12e mois. Le matériel (Livebox, décodeur) doit être retourné sous 15 jours.",
    faqItems: [
      { q: "Combien coûte la résiliation de la Livebox ?", a: "Hors engagement : 49 € de frais de résiliation. Sous engagement : mensualités restantes + 49 €, avec plafonnement au quart après 12 mois." },
      { q: "Comment retourner ma Livebox ?", a: "Orange envoie un bon de retour Colissimo. Vous avez 15 jours pour déposer le colis dans un bureau de poste. En cas de non-restitution, Orange facture le matériel jusqu'à 200 €." },
      { q: "Puis-je transférer ma Livebox à ma nouvelle adresse ?", a: "Oui, Orange propose un transfert de ligne. Contactez le 3900 ou effectuez la demande depuis votre espace client au moins 2 semaines avant le déménagement." },
      { q: "La fibre est-elle obligatoire pour résilier ?", a: "Non. Que vous soyez en ADSL, VDSL ou fibre, les conditions de résiliation sont les mêmes. Seuls les frais d'engagement varient selon l'offre souscrite." },
    ],
    relatedSlugs: ["resiliation-orange-mobile", "resiliation-free-box", "resiliation-sfr-box"],
  },

  {
    slug: "resiliation-bouygues-mobile",
    title: "Résilier Bouygues Telecom Mobile — Lettre type",
    metaTitle: "Résilier Bouygues Mobile — Lettre 2026",
    metaDescription: "Lettre résiliation Bouygues Telecom mobile. Conforme loi Hamon, adresse pré-remplie, PDF en 2 min.",
    letterType: "resiliation",
    company: "Bouygues Telecom",
    heroText: "Vous quittez Bouygues Telecom ? Générez un courrier de résiliation complet avec les références légales. L'adresse du service résiliation Bouygues à Noailles est déjà intégrée dans le document.",
    legalInfo: "La résiliation d'un forfait Bouygues Telecom mobile est régie par l'article L224-1 du Code de la consommation (loi Hamon). Les forfaits Sensation sans engagement sont résiliables à tout moment avec 10 jours de préavis. Pour les offres avec engagement (12 ou 24 mois), les indemnités de résiliation correspondent aux mensualités restantes, plafonnées au quart après le 12e mois. Bouygues Telecom accepte la résiliation par courrier, par téléphone (1064) ou depuis l'espace client.",
    faqItems: [
      { q: "Où envoyer ma lettre de résiliation Bouygues ?", a: "Bouygues Telecom — Service Résiliation, 60436 Noailles Cedex. L'envoi en recommandé avec AR est recommandé pour garder une trace datée." },
      { q: "Puis-je résilier Bouygues par téléphone ?", a: "Oui, en appelant le 1064. Cependant, un courrier recommandé vous protège mieux en cas de litige sur la date de prise en compte." },
      { q: "Quel est le préavis chez Bouygues Telecom ?", a: "10 jours calendaires à compter de la réception de votre demande. Votre dernière facture sera calculée au prorata." },
    ],
    relatedSlugs: ["resiliation-bouygues-box", "resiliation-sfr-mobile", "resiliation-orange-mobile"],
  },

  {
    slug: "resiliation-bouygues-box",
    title: "Résilier Bouygues Bbox — Lettre type gratuite",
    metaTitle: "Résilier Bbox Bouygues — Lettre 2026",
    metaDescription: "Résiliez votre Bbox Bouygues avec un courrier conforme. Loi Hamon, frais détaillés, PDF immédiat.",
    letterType: "resiliation",
    company: "Bouygues Telecom",
    heroText: "Vous souhaitez résilier votre Bbox internet Bouygues Telecom ? En 2 minutes, obtenez un courrier de résiliation professionnel incluant toutes les informations nécessaires et les articles de loi applicables.",
    legalInfo: "La résiliation Bbox est encadrée par l'article L224-1 du Code de la consommation. Les offres Bbox sont généralement soumises à un engagement de 12 mois. Passé ce délai, la résiliation est possible à tout moment moyennant 10 jours de préavis. Bouygues facture 59 € de frais de résiliation hors engagement. En période d'engagement, les mensualités restantes s'ajoutent, plafonnées au quart après 12 mois. La restitution du matériel (Bbox, décodeur TV) est obligatoire sous 30 jours pour éviter la facturation des équipements.",
    faqItems: [
      { q: "Combien coûte la résiliation de la Bbox ?", a: "59 € de frais fixes hors période d'engagement. Sous engagement, ajoutez le quart des mensualités restantes après le 12e mois (article L224-1 du Code de la consommation)." },
      { q: "Comment retourner ma Bbox ?", a: "Bouygues envoie une étiquette de retour prépayée. Vous disposez de 30 jours pour retourner le matériel via un point relais. Au-delà, des frais de non-restitution s'appliquent (jusqu'à 200 €)." },
      { q: "La résiliation Bbox résilie-t-elle aussi mon mobile Bouygues ?", a: "Non, les deux contrats sont indépendants. Si vous avez une offre convergente (Bbox + mobile), vérifiez les conditions spécifiques dans votre contrat car vous pourriez perdre la remise multi-lignes." },
    ],
    relatedSlugs: ["resiliation-bouygues-mobile", "resiliation-sfr-box", "resiliation-free-box"],
  },

  {
    slug: "resiliation-sosh",
    title: "Résilier Sosh — Lettre type gratuite",
    metaTitle: "Résilier Sosh — Modèle de lettre 2026",
    metaDescription: "Générez une lettre de résiliation Sosh en 2 min. Sans engagement, PDF prêt à envoyer gratuitement.",
    letterType: "resiliation",
    company: "Sosh",
    heroText: "Les forfaits Sosh sont sans engagement : la résiliation est simple et gratuite. Notre générateur crée votre courrier en un instant, avec les références juridiques nécessaires.",
    legalInfo: "Sosh, marque low-cost d'Orange, propose exclusivement des forfaits sans engagement. La résiliation est donc possible à tout moment, sans frais ni pénalités, conformément à l'article L224-1 du Code de la consommation. Le préavis est de 10 jours. Sosh privilégie la gestion en ligne : la résiliation peut se faire depuis l'espace client sur sosh.fr. Toutefois, un courrier recommandé reste juridiquement la preuve la plus solide en cas de litige.",
    faqItems: [
      { q: "La résiliation Sosh est-elle gratuite ?", a: "Oui, tous les forfaits Sosh sont sans engagement. La résiliation est gratuite à tout moment avec 10 jours de préavis." },
      { q: "Puis-je résilier Sosh en ligne ?", a: "Oui, depuis votre espace client sur sosh.fr, rubrique « Mon offre » puis « Résilier ». Un courrier recommandé est néanmoins conseillé pour disposer d'une preuve." },
      { q: "Si je résilie Sosh, puis-je passer chez Orange ?", a: "Oui, vous pouvez migrer vers Orange sans résilier en passant par le 3900 ou en boutique Orange. Votre numéro est conservé automatiquement." },
    ],
    relatedSlugs: ["resiliation-orange-mobile", "resiliation-red-by-sfr", "resiliation-free-mobile"],
  },

  {
    slug: "resiliation-red-by-sfr",
    title: "Résilier RED by SFR — Lettre type gratuite",
    metaTitle: "Résilier RED by SFR — Lettre 2026",
    metaDescription: "Lettre de résiliation RED by SFR sans engagement. Modèle conforme, PDF gratuit en 2 minutes.",
    letterType: "resiliation",
    company: "RED by SFR",
    heroText: "RED by SFR propose des forfaits sans engagement : la résiliation est rapide et sans frais. Générez votre courrier conforme en quelques clics.",
    legalInfo: "RED by SFR, filiale low-cost de SFR, commercialise uniquement des offres sans engagement. L'article L224-1 du Code de la consommation garantit votre droit de résiliation à tout moment, sans frais ni justification. Le préavis est de 10 jours. RED gère les résiliations principalement en ligne via le chat ou l'espace client, mais un courrier recommandé adressé au service client SFR (TSA 73917, 62978 Arras Cedex 9) constitue la preuve légale la plus fiable.",
    faqItems: [
      { q: "Où envoyer ma résiliation RED by SFR ?", a: "RED by SFR utilise l'adresse du service résiliation SFR : TSA 73917, 62978 Arras Cedex 9. Vous pouvez aussi résilier via le chat sur le site RED." },
      { q: "La résiliation RED est-elle vraiment gratuite ?", a: "Oui, sans exception. Tous les forfaits RED sont sans engagement. Aucun frais de résiliation ne s'applique." },
      { q: "Comment garder mon numéro en quittant RED ?", a: "Appelez le 3179 pour obtenir votre code RIO, puis donnez-le à votre nouvel opérateur. La portabilité prend 3 jours ouvrés et entraîne automatiquement la résiliation chez RED." },
    ],
    relatedSlugs: ["resiliation-sfr-mobile", "resiliation-sosh", "resiliation-free-mobile"],
  },

  {
    slug: "resiliation-byou",
    title: "Résilier B&You — Lettre type gratuite",
    metaTitle: "Résilier B&You — Modèle lettre 2026",
    metaDescription: "Résiliez B&You sans frais avec une lettre conforme. Sans engagement, PDF prêt à envoyer.",
    letterType: "resiliation",
    company: "B&You",
    heroText: "B&You, la marque en ligne de Bouygues Telecom, propose des forfaits sans engagement. Générez un courrier de résiliation propre et conforme, prêt à envoyer au service résiliation Bouygues.",
    legalInfo: "B&You est la gamme sans engagement de Bouygues Telecom. Conformément à l'article L224-1 du Code de la consommation, la résiliation est possible à tout moment, sans frais ni pénalités. Le préavis standard est de 10 jours. La demande peut être faite en ligne, par téléphone (1064) ou par courrier adressé à Bouygues Telecom — Service Résiliation, 60436 Noailles Cedex. Un courrier recommandé offre la meilleure protection juridique.",
    faqItems: [
      { q: "B&You et Bouygues, c'est la même adresse de résiliation ?", a: "Oui, B&You étant une marque de Bouygues Telecom, le courrier doit être adressé à Bouygues Telecom — Service Résiliation, 60436 Noailles Cedex." },
      { q: "Puis-je résilier B&You en ligne ?", a: "Oui, depuis votre espace client Bouygues Telecom ou en contactant le 1064. Le courrier recommandé reste la preuve la plus solide." },
      { q: "Y a-t-il des frais cachés à la résiliation B&You ?", a: "Non. Aucun frais de résiliation ne s'applique aux forfaits B&You, qui sont tous sans engagement." },
    ],
    relatedSlugs: ["resiliation-bouygues-mobile", "resiliation-red-by-sfr", "resiliation-sosh"],
  },

  {
    slug: "resiliation-canal-plus",
    title: "Résilier Canal+ — Lettre type gratuite",
    metaTitle: "Résilier Canal+ — Modèle de lettre 2026",
    metaDescription: "Générez une lettre de résiliation Canal+ conforme. Engagement, loi Chatel, PDF prêt à envoyer.",
    letterType: "resiliation",
    company: "Canal+",
    heroText: "L'abonnement Canal+ est notoirement difficile à résilier. Notre générateur produit un courrier irréprochable, mentionnant les bons articles de loi et les délais à respecter pour que Canal+ ne puisse pas refuser votre demande.",
    legalInfo: "Les abonnements Canal+ sont généralement assortis d'un engagement de 24 mois reconduit tacitement pour 12 mois. La loi Chatel (article L215-1 du Code de la consommation) oblige Canal+ à vous informer de la reconduction entre 3 mois et 1 mois avant l'échéance. Si Canal+ ne vous a pas prévenu, vous pouvez résilier à tout moment sans frais ni pénalités. Hors de ce cas, la résiliation doit intervenir avant la date anniversaire. Canal+ accepte les résiliations par courrier recommandé adressé à Canal+ — Service Résiliation, 92130 Issy-les-Moulineaux.",
    faqItems: [
      { q: "Puis-je résilier Canal+ avant la fin de l'engagement ?", a: "En principe non, sauf si Canal+ n'a pas respecté son obligation d'information préalable (loi Chatel, article L215-1). Si vous n'avez pas reçu de courrier vous informant de la reconduction, vous pouvez résilier sans frais à tout moment." },
      { q: "Quand dois-je envoyer ma résiliation Canal+ ?", a: "Au moins 1 mois avant la date anniversaire de votre contrat. Vérifiez cette date sur votre espace client ou sur votre dernière facture." },
      { q: "Canal+ refuse ma résiliation, que faire ?", a: "Envoyez un courrier recommandé avec AR en citant la loi Chatel (article L215-1) si Canal+ ne vous a pas notifié la reconduction. En dernier recours, saisissez le Médiateur de la consommation dont relève Canal+." },
      { q: "Où envoyer ma lettre de résiliation Canal+ ?", a: "Canal+ — Service Résiliation, 95905 Cergy-Pontoise Cedex 9. Cette adresse est régulièrement mise à jour, vérifiez-la sur votre facture." },
    ],
    relatedSlugs: ["resiliation-netflix", "resiliation-disney-plus", "resiliation-free-mobile"],
  },
];
