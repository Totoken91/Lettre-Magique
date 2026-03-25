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

  // ═══════════════════════════════════════════════
  // RÉSILIATION STREAMING / MUSIQUE
  // ═══════════════════════════════════════════════

  {
    slug: "resiliation-netflix",
    title: "Résilier Netflix — Lettre type gratuite",
    metaTitle: "Résilier Netflix — Guide & lettre 2026",
    metaDescription: "Résiliez votre abonnement Netflix facilement. Procédure en ligne, lettre de confirmation PDF gratuite.",
    letterType: "resiliation",
    company: "Netflix",
    heroText: "Vous souhaitez mettre fin à votre abonnement Netflix ? Bien que la résiliation se fasse principalement en ligne, notre générateur crée un courrier de confirmation utile en cas de prélèvements persistants ou de litige avec le service client.",
    legalInfo: "Netflix fonctionne sans engagement : l'abonnement est résiliable à tout moment depuis les paramètres de votre compte sur netflix.com. La résiliation prend effet à la fin de la période de facturation en cours — vous conservez l'accès jusqu'à cette date sans remboursement prorata. Conformément à l'article L221-18 du Code de la consommation, vous disposez d'un droit de rétractation de 14 jours après toute souscription en ligne. En cas de prélèvements abusifs après résiliation, l'article L133-25 du Code monétaire et financier vous autorise à contester auprès de votre banque dans un délai de 13 mois.",
    faqItems: [
      { q: "Comment résilier Netflix concrètement ?", a: "Connectez-vous sur netflix.com, allez dans « Compte » puis « Annuler l'abonnement ». La résiliation est immédiate et vous gardez l'accès jusqu'à la fin de votre période payée." },
      { q: "Netflix me prélève encore après résiliation, que faire ?", a: "Envoyez un courrier recommandé à Netflix International B.V. en citant l'article L133-25 du Code monétaire et financier. Contactez également votre banque pour contester le prélèvement dans les 13 mois." },
      { q: "Vais-je perdre mes profils et mon historique ?", a: "Netflix conserve vos données pendant 10 mois après la résiliation. Si vous vous réabonnez dans ce délai, vous retrouvez vos profils et recommandations." },
      { q: "Puis-je obtenir un remboursement partiel ?", a: "Netflix ne rembourse pas au prorata. Vous profitez du service jusqu'à la fin de la période facturée. En revanche, le droit de rétractation de 14 jours s'applique si vous venez de souscrire." },
    ],
    relatedSlugs: ["resiliation-disney-plus", "resiliation-amazon-prime", "resiliation-spotify"],
  },

  {
    slug: "resiliation-amazon-prime",
    title: "Résilier Amazon Prime Video — Lettre type gratuite",
    metaTitle: "Résilier Amazon Prime — Lettre 2026",
    metaDescription: "Résiliez Amazon Prime Video avec un courrier conforme. Remboursement prorata, PDF gratuit en 2 min.",
    letterType: "resiliation",
    company: "Amazon Prime",
    heroText: "Vous ne profitez plus d'Amazon Prime Video ou des avantages Prime ? Générez un courrier de résiliation formel à adresser à Amazon, utile en cas de difficulté à résilier en ligne ou de prélèvements non souhaités.",
    legalInfo: "Amazon Prime (incluant Prime Video) est résiliable à tout moment depuis votre compte Amazon, rubrique « Gérer mon abonnement Prime ». Conformément à l'article L221-18 du Code de la consommation, vous bénéficiez d'un droit de rétractation de 14 jours. Si vous n'avez pas utilisé les avantages Prime depuis le dernier renouvellement, Amazon rembourse intégralement. Si vous avez utilisé les services, un remboursement au prorata est appliqué. L'abonnement annuel (69,90 €) ou mensuel (6,99 €) se renouvelle automatiquement — pensez à désactiver le renouvellement automatique pour éviter tout prélèvement imprévu.",
    faqItems: [
      { q: "Comment résilier Amazon Prime en ligne ?", a: "Allez sur amazon.fr, « Compte » > « Abonnement Prime » > « Mettre fin à l'abonnement ». Amazon propose de passer en mode mensuel ou de rappeler plus tard — lisez bien chaque écran." },
      { q: "Puis-je être remboursé si je résilie Amazon Prime ?", a: "Oui, si vous n'avez pas utilisé les avantages Prime depuis le dernier renouvellement, le remboursement est intégral. Sinon, un remboursement prorata est appliqué selon la politique Amazon." },
      { q: "La résiliation Prime annule-t-elle aussi Prime Video ?", a: "Oui, Prime Video est inclus dans l'abonnement Prime. En résiliant Prime, vous perdez l'accès à Prime Video, la livraison gratuite, Prime Music et Prime Reading." },
    ],
    relatedSlugs: ["resiliation-netflix", "resiliation-disney-plus", "resiliation-spotify"],
  },

  {
    slug: "resiliation-disney-plus",
    title: "Résilier Disney+ — Lettre type gratuite",
    metaTitle: "Résilier Disney+ — Modèle lettre 2026",
    metaDescription: "Résiliez votre abonnement Disney+ simplement. Procédure détaillée, courrier PDF conforme et gratuit.",
    letterType: "resiliation",
    company: "Disney+",
    heroText: "Vous souhaitez quitter Disney+ ? Notre outil génère un courrier de résiliation à utiliser en complément de la procédure en ligne, notamment en cas de prélèvements persistants ou de souscription via un tiers (Canal+, Free, etc.).",
    legalInfo: "Disney+ est un service sans engagement résiliable à tout moment. Si vous êtes abonné directement via disneyplus.com, la résiliation se fait depuis votre profil > « Compte » > « Abonnement ». Si votre abonnement Disney+ est inclus dans une offre Canal+ ou opérateur (Free, Orange), vous devez résilier auprès de ce partenaire. Conformément à l'article L221-18 du Code de la consommation, le droit de rétractation de 14 jours s'applique. L'accès reste actif jusqu'à la fin de la période facturée. The Walt Disney Company (Benelux) B.V. est l'entité juridique responsable pour la France.",
    faqItems: [
      { q: "Comment résilier Disney+ souscrit via Canal+ ?", a: "Si votre Disney+ est inclus dans votre offre Canal+, vous devez contacter Canal+ directement. La résiliation de Disney+ seul peut nécessiter un changement de formule chez Canal+." },
      { q: "Disney+ est-il sans engagement ?", a: "Oui, que vous soyez en formule mensuelle ou annuelle. La résiliation prend effet à la fin de la période payée, sans remboursement prorata pour l'offre annuelle." },
      { q: "Où envoyer un courrier à Disney+ ?", a: "The Walt Disney Company (Benelux) B.V., 31 Rue Cambon, 75001 Paris. Un courrier recommandé est utile en cas de prélèvements persistants après annulation en ligne." },
    ],
    relatedSlugs: ["resiliation-netflix", "resiliation-amazon-prime", "resiliation-canal-plus"],
  },

  {
    slug: "resiliation-spotify",
    title: "Résilier Spotify Premium — Lettre type gratuite",
    metaTitle: "Résilier Spotify Premium — Lettre 2026",
    metaDescription: "Résiliez Spotify Premium avec notre modèle de lettre. Sans engagement, procédure en ligne, PDF gratuit.",
    letterType: "resiliation",
    company: "Spotify",
    heroText: "Vous ne souhaitez plus payer pour Spotify Premium ? Notre outil génère un courrier formel de résiliation, utile en cas de problème avec la procédure en ligne ou de prélèvements non autorisés après annulation.",
    legalInfo: "Spotify Premium est un service sans engagement, résiliable à tout moment depuis votre compte sur spotify.com (« Compte » > « Votre abonnement » > « Modifier l'abonnement »). Après résiliation, votre compte repasse en mode gratuit (avec publicités) — vous conservez vos playlists et bibliothèque. Le droit de rétractation de 14 jours s'applique (article L221-18 du Code de la consommation). Si votre abonnement a été souscrit via Apple (App Store) ou Google (Play Store), la résiliation doit se faire depuis les paramètres d'abonnement de votre téléphone, pas depuis Spotify directement.",
    faqItems: [
      { q: "Comment résilier Spotify Premium en ligne ?", a: "Sur spotify.com, allez dans « Compte » > « Votre abonnement » > « Modifier l'abonnement » > « Annuler Premium ». Votre accès Premium continue jusqu'à la fin de la période facturée." },
      { q: "Vais-je perdre mes playlists en résiliant ?", a: "Non, vos playlists, morceaux sauvegardés et historique d'écoute sont conservés. Votre compte passe simplement en version gratuite avec publicités et écoute aléatoire sur mobile." },
      { q: "J'ai souscrit Spotify via l'App Store, comment résilier ?", a: "Allez dans Réglages iPhone > votre nom > Abonnements > Spotify > Résilier. La résiliation via l'app Spotify ne fonctionnera pas pour les abonnements souscrits via Apple." },
    ],
    relatedSlugs: ["resiliation-netflix", "resiliation-amazon-prime", "resiliation-disney-plus"],
  },

  {
    slug: "resiliation-dazn",
    title: "Résilier DAZN — Lettre type gratuite",
    metaTitle: "Résilier DAZN — Modèle lettre 2026",
    metaDescription: "Résiliez votre abonnement DAZN sport avec un courrier conforme. Engagement, conditions, PDF gratuit.",
    letterType: "resiliation",
    company: "DAZN",
    heroText: "Le prix de DAZN a explosé et vous voulez résilier ? Notre générateur crée un courrier de résiliation solide juridiquement, indispensable face aux conditions d'engagement strictes de la plateforme de streaming sportif.",
    legalInfo: "DAZN propose des abonnements mensuels et annuels pour le streaming sportif (Ligue 1, boxe, MMA). L'abonnement annuel engage pour 12 mois — la résiliation anticipée entraîne le paiement des mensualités restantes. L'abonnement mensuel est résiliable à tout moment avec effet à la fin de la période en cours. Suite aux hausses tarifaires controversées, l'article L224-33 du Code de la consommation permet de résilier sans frais dans les 4 mois suivant la notification d'une augmentation de prix. Le droit de rétractation de 14 jours (article L221-18) s'applique à toute nouvelle souscription en ligne. DAZN est opéré par DAZN Limited, basée au Royaume-Uni.",
    faqItems: [
      { q: "DAZN a augmenté ses tarifs, puis-je résilier sans frais ?", a: "Oui, l'article L224-33 du Code de la consommation vous autorise à résilier sans pénalité dans les 4 mois suivant la notification de la hausse tarifaire, même en cours d'engagement annuel." },
      { q: "Comment résilier DAZN en ligne ?", a: "Connectez-vous sur dazn.com, allez dans « Mon compte » > « Abonnement » > « Annuler ». Conservez une capture d'écran de la confirmation comme preuve." },
      { q: "Où envoyer un courrier de résiliation DAZN ?", a: "DAZN Limited n'a pas de siège en France. Adressez votre courrier recommandé à DAZN Group Limited, 12 Hammersmith Grove, London W6 7AP, Royaume-Uni. Un email à help@dazn.com en complément est recommandé." },
      { q: "Puis-je résilier l'abonnement annuel DAZN avant terme ?", a: "En principe non, sauf en cas de hausse tarifaire (article L224-33) ou en invoquant le droit de rétractation de 14 jours après souscription. Dans les autres cas, vous devrez régler les mensualités restantes." },
    ],
    relatedSlugs: ["resiliation-canal-plus", "resiliation-netflix", "resiliation-basic-fit"],
  },

  // ═══════════════════════════════════════════════
  // RÉSILIATION SALLE DE SPORT
  // ═══════════════════════════════════════════════

  {
    slug: "resiliation-basic-fit",
    title: "Résilier Basic-Fit — Lettre type gratuite",
    metaTitle: "Résilier Basic-Fit — Modèle lettre 2026",
    metaDescription: "Résiliez votre abonnement Basic-Fit avec un courrier conforme. Préavis, engagement, PDF gratuit en 2 min.",
    letterType: "resiliation",
    company: "Basic-Fit",
    heroText: "Résilier Basic-Fit peut sembler compliqué avec leurs conditions d'engagement. Notre générateur crée un courrier de résiliation juridiquement solide, intégrant les bons articles de loi et respectant les délais de préavis imposés par Basic-Fit.",
    legalInfo: "Les abonnements Basic-Fit sont soumis à un engagement initial (souvent 12 mois pour le tarif préférentiel ou 1 mois pour la formule Flex). La résiliation doit respecter un préavis d'un mois calendaire. Conformément à l'article L215-1 du Code de la consommation (loi Chatel), Basic-Fit doit vous informer de la reconduction tacite entre 3 mois et 1 mois avant l'échéance. À défaut, vous pouvez résilier à tout moment sans frais. La résiliation peut être effectuée en ligne depuis l'espace membre ou par courrier recommandé. En cas de motif légitime (déménagement à plus de 30 km, maladie longue durée, perte d'emploi), la résiliation anticipée est possible sur justificatif (article L224-39 du Code de la consommation).",
    faqItems: [
      { q: "Quel est le préavis de résiliation Basic-Fit ?", a: "Le préavis est d'un mois calendaire. Votre résiliation prendra effet le mois suivant la fin du préavis. Exemple : courrier reçu le 15 mars → résiliation effective le 30 avril." },
      { q: "Puis-je résilier Basic-Fit avant la fin de l'engagement ?", a: "Oui, en cas de motif légitime : déménagement à plus de 30 km de toute salle Basic-Fit, maladie longue durée (certificat médical), ou perte d'emploi. Joignez le justificatif à votre courrier." },
      { q: "Où envoyer ma lettre de résiliation Basic-Fit ?", a: "Basic-Fit France — Service Résiliation, 5 boulevard des Bouvets, 92000 Nanterre. Un envoi en recommandé avec accusé de réception est indispensable pour prouver la date de réception." },
      { q: "Puis-je résilier Basic-Fit en ligne ?", a: "Oui, depuis votre espace membre sur basic-fit.com, rubrique « Mon abonnement ». Cependant, un courrier recommandé reste la preuve la plus solide en cas de litige." },
    ],
    relatedSlugs: ["resiliation-fitness-park", "resiliation-dazn", "resiliation-spotify"],
  },

  {
    slug: "resiliation-fitness-park",
    title: "Résilier Fitness Park — Lettre type gratuite",
    metaTitle: "Résilier Fitness Park — Lettre 2026",
    metaDescription: "Résiliez Fitness Park avec un courrier conforme. Engagement, préavis, motifs légitimes, PDF gratuit.",
    letterType: "resiliation",
    company: "Fitness Park",
    heroText: "Vous souhaitez quitter Fitness Park ? Notre générateur crée un courrier de résiliation conforme aux conditions générales de la salle, incluant les articles de loi applicables et respectant le préavis contractuel.",
    legalInfo: "Les abonnements Fitness Park sont généralement assortis d'un engagement de 12 mois avec reconduction tacite. La résiliation doit se faire par courrier recommandé avec un préavis de 2 mois avant la date anniversaire du contrat. Conformément à la loi Chatel (article L215-1 du Code de la consommation), Fitness Park doit vous informer de la reconduction entre 3 et 1 mois avant l'échéance. En l'absence de cette notification, vous pouvez résilier à tout moment sans frais. Un motif légitime (déménagement, maladie longue durée, incapacité physique attestée par certificat médical) permet la résiliation anticipée sans pénalités (article L224-39 du Code de la consommation).",
    faqItems: [
      { q: "Quel est le préavis pour résilier Fitness Park ?", a: "Le préavis est généralement de 2 mois avant la date anniversaire du contrat. Vérifiez vos conditions générales car le délai peut varier selon l'offre souscrite." },
      { q: "Puis-je résilier Fitness Park pour raison médicale ?", a: "Oui, un certificat médical attestant d'une incapacité physique de longue durée constitue un motif légitime de résiliation anticipée sans pénalités (article L224-39 du Code de la consommation)." },
      { q: "Où envoyer ma résiliation Fitness Park ?", a: "Adressez votre courrier en recommandé avec AR directement à votre salle Fitness Park (l'adresse figure sur votre contrat). Si votre salle ne dispose pas de boîte aux lettres, envoyez au siège : Fitness Park, 30 rue Madeleine Vionnet, 93300 Aubervilliers." },
      { q: "Fitness Park ne m'a pas informé de la reconduction, que faire ?", a: "Si vous n'avez pas reçu de notification de reconduction entre 3 et 1 mois avant l'échéance, invoquez la loi Chatel (article L215-1) dans votre courrier pour résilier sans frais et sans préavis." },
    ],
    relatedSlugs: ["resiliation-basic-fit", "resiliation-dazn", "resiliation-canal-plus"],
  },

  // ═══════════════════════════════════════════════
  // RÉSILIATION ASSURANCE
  // ═══════════════════════════════════════════════

  {
    slug: "resiliation-assurance-auto",
    title: "Résilier une assurance auto — Lettre type gratuite",
    metaTitle: "Résilier assurance auto — Lettre 2026",
    metaDescription: "Résiliez votre assurance auto avec une lettre conforme. Loi Hamon, échéance, vente de véhicule — PDF gratuit.",
    letterType: "resiliation",
    heroText: "Vous changez d'assureur auto ou vendez votre véhicule ? Générez en 2 minutes un courrier de résiliation d'assurance automobile conforme, incluant les articles du Code des assurances applicables à votre situation.",
    legalInfo: "La résiliation d'une assurance auto est encadrée par plusieurs textes. Après un an de contrat, la loi Hamon (article L113-15-2 du Code des assurances) permet de résilier à tout moment, sans frais ni justification — votre nouvel assureur peut s'en charger. À l'échéance annuelle, la résiliation doit être envoyée au moins 2 mois avant la date anniversaire (article L113-12 du Code des assurances). La loi Chatel (article L113-15-1) impose à l'assureur de vous rappeler cette échéance ; à défaut, vous pouvez résilier dans les 20 jours suivant la date d'envoi de l'avis. En cas de vente du véhicule (article L121-11), le contrat est suspendu automatiquement à minuit le jour de la vente et résilié 6 mois après si non transféré. Un changement de situation (déménagement, mariage, retraite) constitue aussi un motif de résiliation dans les 3 mois (article L113-16).",
    faqItems: [
      { q: "Puis-je résilier mon assurance auto à tout moment ?", a: "Oui, après un an de contrat, la loi Hamon vous permet de résilier à tout moment sans frais. Votre nouvel assureur peut effectuer la démarche à votre place, sans interruption de couverture." },
      { q: "Je vends ma voiture, comment résilier l'assurance ?", a: "Le contrat est automatiquement suspendu à minuit le jour de la vente (article L121-11 du Code des assurances). Envoyez un courrier avec le certificat de cession pour confirmer la résiliation définitive." },
      { q: "Mon assureur ne m'a pas prévenu de l'échéance, que faire ?", a: "Si l'avis d'échéance arrive moins de 15 jours avant la date limite de résiliation, ou après cette date, vous disposez de 20 jours supplémentaires pour résilier (loi Chatel, article L113-15-1)." },
      { q: "Dois-je avoir un nouvel assureur avant de résilier ?", a: "Oui, l'assurance auto est obligatoire (article L211-1 du Code des assurances). Souscrivez un nouveau contrat avant de résilier l'ancien pour éviter tout défaut d'assurance." },
    ],
    relatedSlugs: ["resiliation-assurance-habitation", "resiliation-mutuelle-sante"],
  },

  {
    slug: "resiliation-assurance-habitation",
    title: "Résilier une assurance habitation — Lettre type gratuite",
    metaTitle: "Résilier assurance habitation — Lettre 2026",
    metaDescription: "Résiliez votre assurance habitation avec un courrier conforme. Loi Hamon, déménagement, PDF gratuit.",
    letterType: "resiliation",
    heroText: "Vous déménagez, changez d'assureur ou devenez propriétaire ? Générez un courrier de résiliation d'assurance habitation complet, adapté à votre motif de résiliation, avec les articles du Code des assurances pré-remplis.",
    legalInfo: "La résiliation d'une assurance habitation est possible dans plusieurs cas. Après un an de contrat, la loi Hamon (article L113-15-2 du Code des assurances) autorise la résiliation à tout moment, sans frais — votre nouvel assureur peut s'en charger. À l'échéance annuelle, le préavis est de 2 mois (article L113-12). La loi Chatel (article L113-15-1) oblige l'assureur à vous rappeler la date limite de résiliation entre 3 mois et 15 jours avant. En cas de déménagement, la résiliation est possible dans les 3 mois suivant l'événement (article L113-16 du Code des assurances). Attention : l'assurance habitation est obligatoire pour les locataires (loi du 6 juillet 1989, article 7) — souscrivez un nouveau contrat avant de résilier.",
    faqItems: [
      { q: "Puis-je résilier mon assurance habitation à tout moment ?", a: "Oui, après la première année, la loi Hamon permet de résilier sans frais ni justification. La résiliation prend effet 30 jours après la réception de votre demande par l'assureur." },
      { q: "Je déménage, comment résilier mon assurance habitation ?", a: "Le déménagement est un motif légitime de résiliation (article L113-16 du Code des assurances). Envoyez votre courrier dans les 3 mois suivant le déménagement. La résiliation prend effet un mois après réception." },
      { q: "L'assurance habitation est-elle obligatoire ?", a: "Pour les locataires, oui (loi du 6 juillet 1989). Les propriétaires occupants n'y sont pas légalement tenus, mais c'est fortement recommandé. Les copropriétaires doivent au minimum souscrire une responsabilité civile." },
      { q: "Mon assureur augmente la prime, puis-je résilier ?", a: "Oui. Si l'augmentation dépasse l'indice prévu au contrat, vous pouvez résilier dans les 15 jours suivant la notification de la nouvelle prime (conditions générales habituelles)." },
    ],
    relatedSlugs: ["resiliation-assurance-auto", "resiliation-mutuelle-sante"],
  },

  {
    slug: "resiliation-mutuelle-sante",
    title: "Résilier une mutuelle santé — Lettre type gratuite",
    metaTitle: "Résilier mutuelle santé — Lettre 2026",
    metaDescription: "Résiliez votre mutuelle santé avec un courrier conforme. Loi Hamon/résiliation infra-annuelle, PDF gratuit.",
    letterType: "resiliation",
    heroText: "Vous changez de mutuelle ou bénéficiez désormais de la complémentaire de votre employeur ? Générez un courrier de résiliation de mutuelle santé complet, adapté à votre motif et conforme au Code de la mutualité.",
    legalInfo: "Depuis le 1er décembre 2020, la résiliation infra-annuelle des complémentaires santé est possible à tout moment après un an de contrat, sans frais ni pénalités (article L113-15-2 du Code des assurances, étendu aux mutuelles). La résiliation prend effet un mois après réception du courrier. Pour les contrats collectifs obligatoires (mutuelle d'entreprise), la résiliation n'est possible qu'en cas de dispense légale (CDD, couverture par le conjoint, CSS, etc.) prévue par le décret n°2012-25 du 9 janvier 2012. À l'échéance annuelle, le préavis est de 2 mois (article L221-10 du Code de la mutualité). La loi Chatel (article L221-10-1 du Code de la mutualité) oblige la mutuelle à vous informer de la reconduction tacite.",
    faqItems: [
      { q: "Puis-je résilier ma mutuelle à tout moment ?", a: "Oui, après un an de contrat, la résiliation infra-annuelle vous permet de quitter votre mutuelle à tout moment, sans frais. La résiliation prend effet un mois après la réception de votre courrier." },
      { q: "Mon employeur me fournit une mutuelle, puis-je résilier la mienne ?", a: "Oui, l'adhésion à une mutuelle d'entreprise obligatoire constitue un motif de résiliation de votre contrat individuel. Joignez l'attestation de votre nouvel employeur à votre courrier." },
      { q: "Comment résilier une mutuelle d'entreprise obligatoire ?", a: "La résiliation n'est possible que dans des cas limitatifs : CDD de moins de 12 mois, couverture existante par le conjoint, bénéficiaire de la CSS, ou temps partiel avec cotisation supérieure à 10 % du salaire." },
      { q: "Dois-je souscrire une autre mutuelle avant de résilier ?", a: "La complémentaire santé n'est pas légalement obligatoire (sauf mutuelle d'entreprise). Cependant, il est fortement recommandé de souscrire un nouveau contrat pour éviter tout défaut de couverture, notamment pour les dépassements d'honoraires et les soins dentaires/optiques." },
    ],
    relatedSlugs: ["resiliation-assurance-auto", "resiliation-assurance-habitation"],
  },
];
