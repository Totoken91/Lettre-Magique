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

  // ═══════════════════════════════════════════════
  // RÉCLAMATIONS
  // ═══════════════════════════════════════════════

  {
    slug: "reclamation-colis-amazon",
    title: "Réclamation colis Amazon — Lettre type gratuite",
    metaTitle: "Réclamation colis Amazon — Lettre 2026",
    metaDescription: "Colis Amazon perdu, endommagé ou non conforme ? Lettre de réclamation conforme, PDF gratuit en 2 min.",
    letterType: "reclamation",
    company: "Amazon",
    heroText: "Votre colis Amazon n'est jamais arrivé, est arrivé endommagé ou ne correspond pas à la commande ? Notre générateur crée un courrier de réclamation formel citant les bons articles de loi, à envoyer lorsque le service client en ligne ne suffit pas.",
    legalInfo: "Amazon est tenu à une obligation de délivrance conforme (article L216-1 du Code de la consommation). En cas de colis non livré, vous pouvez mettre en demeure de livrer dans un délai raisonnable, puis annuler et obtenir un remboursement intégral sous 14 jours (article L216-2). Pour un produit non conforme, la garantie légale de conformité de 2 ans s'applique (articles L217-3 à L217-20). Amazon EU SARL, basée au Luxembourg, est l'entité juridique responsable. Pour les vendeurs tiers Marketplace, Amazon reste solidaire de la livraison (article L221-15).",
    faqItems: [
      { q: "Mon colis Amazon est marqué livré mais je ne l'ai pas reçu ?", a: "Contactez d'abord Amazon via « Mes commandes ». Sans solution, envoyez un recommandé citant l'article L216-1. Le vendeur doit prouver la livraison effective." },
      { q: "Amazon refuse de rembourser un colis endommagé ?", a: "Invoquez la garantie légale de conformité (article L217-3). Le vendeur est responsable des dommages pendant le transport. Joignez des photos du colis et du produit." },
      { q: "Puis-je réclamer à Amazon pour un vendeur tiers ?", a: "Oui, Amazon est solidairement responsable de la livraison Marketplace (article L221-15). Adressez votre réclamation à Amazon EU SARL." },
      { q: "Quel délai pour réclamer ?", a: "Pour un défaut de livraison, agissez vite. Pour un produit non conforme, la garantie légale est de 2 ans à compter de la délivrance." },
    ],
    relatedSlugs: ["reclamation-la-poste", "reclamation-produit-defectueux", "reclamation-garantie-legale"],
  },

  {
    slug: "reclamation-la-poste",
    title: "Réclamation La Poste — Lettre type gratuite",
    metaTitle: "Réclamation La Poste colis/courrier — Lettre 2026",
    metaDescription: "Colis ou courrier perdu par La Poste ? Lettre de réclamation avec indemnisation, PDF conforme et gratuit.",
    letterType: "reclamation",
    company: "La Poste",
    heroText: "Courrier recommandé égaré, Colissimo perdu ou endommagé ? Générez une lettre de réclamation formelle adressée au service client La Poste, avec les références de vos envois et les montants d'indemnisation auxquels vous avez droit.",
    legalInfo: "La Poste est responsable des envois confiés (article L7 du Code des postes). Pour un Colissimo perdu, l'indemnisation est de 23 €/kg (plafonnée à 1 000 €). Pour un recommandé perdu : 16 € (R1), 153 € (R2), 458 € (R3). La réclamation doit être déposée dans l'année pour colis et recommandés (article L134-1 du Code de la consommation). En cas de refus, le Médiateur du Groupe La Poste peut être saisi gratuitement.",
    faqItems: [
      { q: "Comment réclamer pour un Colissimo perdu ?", a: "Déposez d'abord une réclamation en ligne sur laposte.fr/reclamation. Sans réponse sous 30 jours, envoyez un recommandé au Service Clients La Poste, 99999 La Poste." },
      { q: "Quelle indemnisation pour un recommandé perdu ?", a: "R1 = 16 €, R2 = 153 €, R3 = 458 €. Montants forfaitaires, sans preuve de valeur du contenu nécessaire." },
      { q: "La Poste a endommagé mon colis ?", a: "Faites constater les dégâts à la réception (réserves sur le bon) ou dans les 3 jours. Prenez des photos et réclamez avec preuves de valeur." },
      { q: "Quel délai pour réclamer ?", a: "2 jours pour Chronopost, 21 jours pour colis internationaux, 1 an pour Colissimo et recommandés nationaux." },
    ],
    relatedSlugs: ["reclamation-colis-amazon", "reclamation-sncf", "reclamation-facture-abusive"],
  },

  {
    slug: "reclamation-sncf",
    title: "Réclamation SNCF retard/annulation — Lettre type gratuite",
    metaTitle: "Réclamation SNCF retard — Lettre 2026",
    metaDescription: "Train SNCF en retard ou annulé ? Lettre de réclamation pour remboursement, règlement européen, PDF gratuit.",
    letterType: "reclamation",
    company: "SNCF",
    heroText: "Votre TGV ou Intercités a subi un retard important ou a été annulé ? Générez une lettre de réclamation SNCF pour obtenir une indemnisation en invoquant le règlement européen sur les droits des voyageurs ferroviaires.",
    legalInfo: "Le règlement (UE) 2021/782 prévoit : 25 % du billet pour 60-119 min de retard, 50 % dès 120 min. La SNCF applique la garantie « G30 » sur TGV INOUI et Intercités : bon de 25 % dès 30 min, 50 % dès 2h, 75 % dès 3h. Demande dans les 3 mois suivant le voyage. En cas de refus, le Médiateur SNCF peut être saisi gratuitement. Pour les trains annulés, remboursement intégral de droit.",
    faqItems: [
      { q: "À partir de quel retard la SNCF indemnise ?", a: "Garantie G30 : dès 30 min sur TGV/Intercités (bon de 25 %). Règlement européen : 25 % dès 60 min." },
      { q: "Comment demander un remboursement SNCF ?", a: "Sur sncf-connect.com > « Gérer mes commandes » > « Compensation ». Sinon, recommandé au Service Relations Clients SNCF Voyageurs." },
      { q: "Train annulé, ai-je droit au remboursement ?", a: "Oui, remboursement intégral garanti. Vous pouvez aussi choisir d'être réacheminé." },
      { q: "Puis-je saisir le Médiateur SNCF ?", a: "Oui, si réclamation sans réponse 30 jours ou réponse insatisfaisante. Saisine gratuite via mediateur.sncf." },
    ],
    relatedSlugs: ["reclamation-la-poste", "reclamation-facture-abusive", "reclamation-colis-amazon"],
  },

  {
    slug: "reclamation-facture-abusive",
    title: "Contester une facture abusive — Lettre type gratuite",
    metaTitle: "Contestation facture abusive — Lettre 2026",
    metaDescription: "Contestez une facture abusive avec un courrier conforme. Mise en demeure, articles de loi, PDF gratuit.",
    letterType: "reclamation",
    heroText: "Facture anormalement élevée, injustifiée ou pour un service non rendu ? Notre générateur crée un courrier de contestation formel avec mise en demeure et références juridiques pour faire valoir vos droits.",
    legalInfo: "L'article L112-1 du Code de la consommation impose la transparence des prix. L'article L221-5 oblige le professionnel à informer préalablement. Si un service n'a pas été rendu, le paiement ne peut être exigé (article 1163 du Code civil). La contestation en recommandé AR interrompt le délai de paiement. En cas de refus, saisissez le Médiateur de la consommation (article L612-1) ou la DGCCRF.",
    faqItems: [
      { q: "Comment contester une facture abusive ?", a: "Recommandé avec AR au service client, détaillant les montants contestés. Citez les articles L112-1 et L221-5 du Code de la consommation." },
      { q: "Dois-je payer en attendant ?", a: "Payez la partie non contestée et suspendez le montant litigieux en le signalant par écrit. Ne cessez jamais tout paiement sans courrier formel." },
      { q: "Menace de recouvrement, que faire ?", a: "Répondez par recommandé. Un créancier ne peut engager de recouvrement sur une facture formellement contestée sans décision de justice." },
    ],
    relatedSlugs: ["reclamation-produit-defectueux", "reclamation-garantie-legale", "reclamation-colis-amazon"],
  },

  {
    slug: "reclamation-produit-defectueux",
    title: "Réclamation produit défectueux — Lettre type gratuite",
    metaTitle: "Produit défectueux — Lettre réclamation 2026",
    metaDescription: "Produit en panne ou défectueux ? Lettre avec garantie légale de conformité, PDF gratuit.",
    letterType: "reclamation",
    heroText: "Votre produit est en panne ou présente un défaut ? Générez une lettre invoquant la garantie légale de conformité pour obtenir réparation, remplacement ou remboursement.",
    legalInfo: "La garantie légale de conformité (articles L217-3 à L217-20) protège l'acheteur 2 ans. Tout défaut est présumé exister au moment de la livraison. Vous choisissez entre réparation et remplacement (article L217-9). Si impossible sous 30 jours, remboursement de droit (article L217-10). Indépendante de toute garantie commerciale. La garantie des vices cachés (articles 1641-1649 du Code civil) offre 2 ans supplémentaires après découverte du vice.",
    faqItems: [
      { q: "Durée de la garantie légale ?", a: "2 ans à compter de la livraison. Pour les biens d'occasion, réductible à 1 an par accord." },
      { q: "Le vendeur m'oriente vers le constructeur ?", a: "Illégal. La garantie légale engage le vendeur, pas le fabricant (article L217-9). Insistez par recommandé." },
      { q: "Puis-je exiger un remboursement immédiat ?", a: "Demandez d'abord réparation ou remplacement. Si le vendeur ne s'exécute pas sous 30 jours, vous pouvez exiger le remboursement." },
      { q: "Produit de plus de 2 ans ?", a: "Garantie des vices cachés (article 1641) : 2 ans après découverte du défaut, même si l'achat est plus ancien." },
    ],
    relatedSlugs: ["reclamation-garantie-legale", "reclamation-facture-abusive", "reclamation-colis-amazon"],
  },

  {
    slug: "reclamation-garantie-legale",
    title: "Faire jouer la garantie légale — Lettre type gratuite",
    metaTitle: "Garantie légale de conformité — Lettre 2026",
    metaDescription: "Mise en demeure pour garantie légale. Réparation, remplacement ou remboursement. PDF gratuit.",
    letterType: "reclamation",
    heroText: "Le vendeur refuse la garantie légale ? Notre générateur crée une mise en demeure citant les articles L217-3 à L217-20 du Code de la consommation pour le contraindre à respecter ses obligations.",
    legalInfo: "La garantie légale est d'ordre public : aucune clause ne peut la réduire (article L217-21). Le consommateur choisit entre réparation et remplacement (article L217-9). Exécution sans frais sous 30 jours (article L217-10). À défaut : réduction de prix ou résolution du contrat. Aucun frais pendant la réparation (transport, main-d'œuvre, pièces). Se cumule avec la garantie des vices cachés (articles 1641-1649 du Code civil).",
    faqItems: [
      { q: "Garantie constructeur expirée, que faire ?", a: "Garantie commerciale et légale sont indépendantes. Même si la première a expiré, la légale court 2 ans. Citez l'article L217-3." },
      { q: "Réparation facturée sous garantie légale ?", a: "Illégal. La réparation est gratuite : pièces, main-d'œuvre et transport (article L217-11)." },
      { q: "Réparation trop longue ?", a: "Au-delà de 30 jours, exigez remplacement ou remboursement (article L217-10). Recommandé avec délai ferme." },
      { q: "Comment prouver le défaut d'origine ?", a: "Inutile : pendant 2 ans, le défaut est présumé d'origine. C'est au vendeur de prouver le contraire." },
    ],
    relatedSlugs: ["reclamation-produit-defectueux", "reclamation-facture-abusive", "reclamation-colis-amazon"],
  },

  // ═══════════════════════════════════════════════
  // LOGEMENT
  // ═══════════════════════════════════════════════

  {
    slug: "preavis-logement-1-mois",
    title: "Préavis de départ 1 mois — Lettre type gratuite",
    metaTitle: "Préavis logement 1 mois — Lettre 2026",
    metaDescription: "Lettre de préavis 1 mois pour quitter votre logement. Zone tendue, motifs légitimes, PDF conforme gratuit.",
    letterType: "logement",
    heroText: "Vous bénéficiez du préavis réduit d'un mois ? Générez un courrier conforme mentionnant le motif légal qui vous y autorise, avec les références juridiques nécessaires pour que votre propriétaire ne puisse pas contester.",
    legalInfo: "Le préavis réduit à 1 mois est prévu par l'article 15-I de la loi du 6 juillet 1989. Il s'applique dans les cas suivants : logement situé en zone tendue (décret n°2013-392), obtention d'un premier emploi, mutation professionnelle, perte d'emploi, nouvel emploi consécutif à une perte d'emploi, locataire bénéficiaire du RSA ou de l'AAH, locataire de plus de 60 ans dont l'état de santé justifie un changement, locataire dont le logement est situé en quartier prioritaire de la politique de la ville. Le préavis court à compter de la réception du courrier recommandé par le propriétaire.",
    faqItems: [
      { q: "Comment savoir si je suis en zone tendue ?", a: "Consultez le décret n°2013-392 ou le simulateur sur service-public.fr. Les grandes agglomérations (Paris, Lyon, Marseille, Bordeaux, Lille, etc.) sont toutes en zone tendue." },
      { q: "Quel justificatif fournir pour le préavis d'1 mois ?", a: "En zone tendue : aucun justificatif nécessaire. Pour les autres motifs : attestation employeur (mutation), lettre de licenciement (perte d'emploi), certificat médical (santé), notification RSA/AAH." },
      { q: "Mon propriétaire refuse le préavis d'1 mois, que faire ?", a: "Le préavis réduit est de droit si vous remplissez les conditions. Rappelez l'article 15-I de la loi du 6 juillet 1989 par recommandé. En cas de litige persistant, saisissez la Commission départementale de conciliation." },
    ],
    relatedSlugs: ["preavis-logement-3-mois", "demande-restitution-caution", "demande-reparations-proprietaire"],
  },

  {
    slug: "preavis-logement-3-mois",
    title: "Préavis de départ 3 mois — Lettre type gratuite",
    metaTitle: "Préavis logement 3 mois — Lettre 2026",
    metaDescription: "Lettre de préavis 3 mois standard pour quitter votre logement. Modèle conforme loi 1989, PDF gratuit.",
    letterType: "logement",
    heroText: "Vous quittez votre logement avec le préavis standard de 3 mois ? Générez un courrier de congé conforme à la loi du 6 juillet 1989, avec la date de fin de bail calculée et toutes les mentions obligatoires.",
    legalInfo: "Le préavis standard pour un logement non meublé est de 3 mois (article 15-I de la loi n°89-462 du 6 juillet 1989). Pour un logement meublé, le préavis est d'1 mois (article 25-8). Le congé doit être notifié par lettre recommandée avec AR, acte d'huissier, ou remise en main propre contre signature. Le préavis court à compter du jour de la réception effective par le propriétaire (et non de l'envoi). Pendant le préavis, le loyer reste dû proportionnellement au temps d'occupation. Si un nouveau locataire entre dans les lieux avant la fin du préavis, vous ne devez le loyer que jusqu'à cette date.",
    faqItems: [
      { q: "Quand commence le préavis de 3 mois ?", a: "À la date de réception du courrier recommandé par le propriétaire (accusé de réception), et non à la date d'envoi. Si le propriétaire ne retire pas le recommandé, la date de première présentation fait foi." },
      { q: "Puis-je quitter avant la fin du préavis ?", a: "Oui, mais vous restez redevable du loyer jusqu'à la fin du préavis, sauf si un nouveau locataire entre dans les lieux avant, auquel cas le loyer cesse à cette date." },
      { q: "Je suis en meublé, le préavis est-il de 3 mois ?", a: "Non, pour un logement meublé le préavis est d'1 mois seulement (article 25-8 de la loi de 1989)." },
      { q: "Dois-je justifier mon départ ?", a: "Non. Le locataire peut donner congé à tout moment sans motif (article 12 de la loi de 1989). Seul le propriétaire doit justifier un congé." },
    ],
    relatedSlugs: ["preavis-logement-1-mois", "demande-restitution-caution", "contestation-etat-des-lieux"],
  },

  {
    slug: "demande-restitution-caution",
    title: "Demande de restitution de caution — Lettre type gratuite",
    metaTitle: "Restitution caution/dépôt de garantie — Lettre 2026",
    metaDescription: "Votre propriétaire ne rend pas la caution ? Lettre de mise en demeure conforme, loi 1989, PDF gratuit.",
    letterType: "logement",
    heroText: "Votre propriétaire tarde à restituer votre dépôt de garantie ? Notre générateur crée une mise en demeure citant l'article 22 de la loi de 1989 et le délai légal de restitution, avec majoration automatique en cas de retard.",
    legalInfo: "Le dépôt de garantie doit être restitué dans un délai de 1 mois si l'état des lieux de sortie est conforme à l'entrée, ou 2 mois en cas de différences (article 22 de la loi du 6 juillet 1989). Passé ce délai, le dépôt est majoré de 10 % du loyer mensuel pour chaque mois de retard commencé. Le propriétaire ne peut retenir que les sommes justifiées par des factures ou devis (et non des estimations). En copropriété, il peut conserver jusqu'à 20 % du dépôt jusqu'à l'arrêté des comptes annuel. En cas de non-restitution, saisissez le juge des contentieux de la protection (ex-tribunal d'instance) sans avocat pour les litiges inférieurs à 10 000 €.",
    faqItems: [
      { q: "Quel délai pour récupérer ma caution ?", a: "1 mois si l'état des lieux de sortie est conforme à l'entrée, 2 mois sinon. Le délai court à compter de la remise des clés." },
      { q: "Le propriétaire retient des sommes injustifiées ?", a: "Toute retenue doit être justifiée par des factures ou devis. Contestez par recommandé en demandant les justificatifs. Les retenues pour « usure normale » sont illégales." },
      { q: "Puis-je obtenir une majoration pour retard ?", a: "Oui, 10 % du loyer mensuel par mois de retard commencé (article 22 de la loi de 1989). Mentionnez-le dans votre mise en demeure." },
      { q: "Quel tribunal saisir si le propriétaire ne rend rien ?", a: "Le juge des contentieux de la protection (tribunal judiciaire). Pas besoin d'avocat pour les litiges inférieurs à 10 000 €. La saisine est possible en ligne via service-public.fr." },
    ],
    relatedSlugs: ["preavis-logement-1-mois", "contestation-etat-des-lieux", "demande-reparations-proprietaire"],
  },

  {
    slug: "signalement-troubles-voisinage",
    title: "Signalement troubles de voisinage — Lettre type gratuite",
    metaTitle: "Lettre troubles de voisinage — Modèle 2026",
    metaDescription: "Nuisances sonores, odeurs, dégradations ? Lettre de mise en demeure pour troubles de voisinage, PDF gratuit.",
    letterType: "logement",
    heroText: "Vos voisins causent des nuisances sonores, olfactives ou autres troubles anormaux ? Générez une lettre de mise en demeure formelle, première étape indispensable avant toute action en justice pour troubles anormaux de voisinage.",
    legalInfo: "Les troubles anormaux de voisinage sont sanctionnés par la jurisprudence civile (responsabilité sans faute, Cass. civ. 3e, 4 février 1971). Le Code de la santé publique (article R1336-5) interdit les bruits portant atteinte à la tranquillité du voisinage de jour comme de nuit. Le tapage nocturne (entre 22h et 7h) est une infraction pénale (article R623-2 du Code pénal, amende de 68 €). Le règlement de copropriété peut imposer des restrictions supplémentaires. En cas de locataire fautif, le propriétaire peut être mis en cause pour ne pas avoir fait respecter la jouissance paisible (article 1719 du Code civil). Avant toute action, une mise en demeure amiable est recommandée, puis la saisine du conciliateur de justice (gratuit), et enfin le tribunal judiciaire.",
    faqItems: [
      { q: "Quels sont les recours contre un voisin bruyant ?", a: "1) Courrier amiable, 2) Mise en demeure recommandée, 3) Conciliateur de justice (gratuit), 4) Main courante ou plainte, 5) Tribunal judiciaire. Chaque étape renforce votre dossier." },
      { q: "Le tapage nocturne est-il une infraction ?", a: "Oui, le tapage nocturne (22h-7h) est sanctionné par l'article R623-2 du Code pénal (68 € d'amende). Appelez la police ou gendarmerie pour faire constater." },
      { q: "Mon propriétaire peut-il agir contre un voisin ?", a: "Oui, et il en a l'obligation : l'article 1719 du Code civil impose au bailleur de garantir la jouissance paisible du logement. Mettez-le en demeure d'agir." },
    ],
    relatedSlugs: ["demande-reparations-proprietaire", "preavis-logement-1-mois", "demande-restitution-caution"],
  },

  {
    slug: "demande-reparations-proprietaire",
    title: "Demande de réparations au propriétaire — Lettre type gratuite",
    metaTitle: "Demande réparations propriétaire — Lettre 2026",
    metaDescription: "Logement insalubre ou réparations urgentes ? Lettre de mise en demeure au propriétaire, loi 1989, PDF gratuit.",
    letterType: "logement",
    heroText: "Fuite d'eau, chauffage en panne, moisissures, volets cassés ? Votre propriétaire doit assurer la décence et l'entretien du logement. Générez une mise en demeure formelle pour exiger les réparations qui lui incombent légalement.",
    legalInfo: "Le propriétaire est tenu de délivrer un logement décent (article 6 de la loi du 6 juillet 1989 et décret n°2002-120 du 30 janvier 2002). Les réparations autres que locatives (gros œuvre, plomberie, électricité, chauffage, toiture) sont à sa charge (article 1720 du Code civil). Le locataire ne supporte que les menues réparations et l'entretien courant (décret n°87-712 du 26 août 1987). En cas d'inaction du propriétaire après mise en demeure, le locataire peut saisir le juge des contentieux de la protection pour obtenir l'exécution des travaux, une réduction de loyer, ou des dommages-intérêts. La CAF peut aussi suspendre les APL et les verser en consignation. En cas de danger pour la santé, signalez à l'ARS ou au service hygiène de la mairie.",
    faqItems: [
      { q: "Quelles réparations incombent au propriétaire ?", a: "Tout ce qui relève du gros œuvre et de l'entretien structurel : plomberie, électricité, chauffage, toiture, fenêtres, ravalement. Le décret n°87-712 liste les réparations locatives (à charge du locataire)." },
      { q: "Mon propriétaire ne répond pas, que faire ?", a: "Envoyez une mise en demeure par recommandé AR avec un délai de 8 jours. Sans réaction, saisissez le juge des contentieux de la protection ou contactez l'ADIL de votre département pour un conseil gratuit." },
      { q: "Puis-je arrêter de payer le loyer si rien n'est fait ?", a: "Non, ne cessez jamais de payer le loyer de votre propre initiative. Seul un juge peut autoriser une réduction ou une consignation du loyer. Un impayé peut entraîner votre expulsion." },
      { q: "Le logement est dangereux pour ma santé ?", a: "Signalez à l'ARS ou au service hygiène de votre mairie. Un arrêté d'insalubrité peut être pris, obligeant le propriétaire à effectuer les travaux sous peine de sanctions pénales." },
    ],
    relatedSlugs: ["contestation-etat-des-lieux", "demande-restitution-caution", "signalement-troubles-voisinage"],
  },

  {
    slug: "contestation-etat-des-lieux",
    title: "Contestation état des lieux — Lettre type gratuite",
    metaTitle: "Contester un état des lieux — Lettre 2026",
    metaDescription: "État des lieux de sortie abusif ? Lettre de contestation conforme, loi 1989, vétusté, PDF gratuit.",
    letterType: "logement",
    heroText: "L'état des lieux de sortie mentionne des dégradations que vous contestez ? Notre générateur crée un courrier de contestation détaillé, invoquant la grille de vétusté et les articles de loi pour protéger votre dépôt de garantie.",
    legalInfo: "L'état des lieux est encadré par l'article 3-2 de la loi du 6 juillet 1989 et le décret n°2016-382. Il doit être établi contradictoirement et de manière amiable. En cas de désaccord, chaque partie peut faire appel à un huissier (frais partagés). La vétusté (usure normale liée au temps) ne peut pas être imputée au locataire (article 1730 du Code civil et loi ALUR). Une grille de vétusté peut être annexée au bail pour objectiver l'appréciation. Si l'état des lieux d'entrée était incomplet ou absent, toute retenue sur le dépôt de garantie est contestable car le logement est présumé avoir été remis en bon état (article 3-2). Vous disposez de 10 jours après la signature pour demander la modification de l'état des lieux d'entrée, et du premier mois de chauffe pour signaler les défauts de chauffage.",
    faqItems: [
      { q: "L'état des lieux d'entrée était incomplet, que faire ?", a: "Si l'état des lieux d'entrée ne mentionne pas un défaut que le propriétaire vous reproche à la sortie, le logement est présumé en bon état à l'entrée. Contestez la retenue en invoquant l'article 3-2." },
      { q: "Qu'est-ce que la vétusté et comment la calculer ?", a: "La vétusté est l'usure normale liée au temps et à l'usage. Une peinture a une durée de vie de 7-10 ans, une moquette 7 ans, un parquet 15 ans. Au-delà, le remplacement ne peut pas être facturé au locataire." },
      { q: "Le propriétaire retient ma caution pour des dégradations contestées ?", a: "Contestez par recommandé AR en joignant photos, état des lieux d'entrée et grille de vétusté. Si le propriétaire ne justifie pas les retenues par des factures, saisissez le juge des contentieux de la protection." },
      { q: "Puis-je refuser de signer l'état des lieux de sortie ?", a: "Oui, si vous êtes en désaccord. Notez vos réserves sur le document ou refusez de signer. Chaque partie peut alors faire appel à un huissier dont les frais sont partagés par moitié." },
    ],
    relatedSlugs: ["demande-restitution-caution", "demande-reparations-proprietaire", "preavis-logement-3-mois"],
  },

  // ═══════════════════════════════════════════════
  // MISE EN DEMEURE
  // ═══════════════════════════════════════════════

  {
    slug: "mise-en-demeure-loyer-impaye",
    title: "Mise en demeure loyer impayé — Lettre type gratuite",
    metaTitle: "Mise en demeure loyer impayé — Lettre 2026",
    metaDescription: "Locataire qui ne paie pas ? Mise en demeure conforme avant commandement de payer. PDF gratuit.",
    letterType: "mise-en-demeure",
    heroText: "Votre locataire accumule des retards de loyer ? Générez une mise en demeure formelle, étape préalable indispensable avant toute procédure judiciaire ou activation de la clause résolutoire du bail.",
    legalInfo: "La mise en demeure de payer le loyer est la première étape légale face à un impayé. Elle doit être envoyée en recommandé AR (article 1344 du Code civil). Si le bail contient une clause résolutoire, le propriétaire doit ensuite faire délivrer un commandement de payer par huissier, laissant 2 mois au locataire pour régulariser (article 24 de la loi du 6 juillet 1989). Depuis la loi ALUR, le bailleur doit signaler l'impayé à la CAF/MSA dès le 2e mois d'impayé si le locataire perçoit des APL. La trêve hivernale (1er novembre — 31 mars) suspend les expulsions mais pas les procédures. Le Fonds de Solidarité Logement (FSL) peut aider le locataire en difficulté.",
    faqItems: [
      { q: "Après combien de mois d'impayé puis-je agir ?", a: "Dès le premier mois de retard. Envoyez une mise en demeure immédiatement. Plus vous agissez tôt, plus les chances de régularisation amiable sont élevées." },
      { q: "La mise en demeure suffit-elle pour expulser ?", a: "Non. C'est une étape préalable. Il faut ensuite un commandement de payer par huissier (2 mois de délai), puis une assignation au tribunal, puis un jugement, puis un commandement de quitter les lieux." },
      { q: "Mon locataire perçoit les APL, que dois-je faire ?", a: "Signalez l'impayé à la CAF/MSA dès le 2e mois (obligation légale depuis la loi ALUR). La CAF peut maintenir le versement direct au bailleur et orienter le locataire vers une aide." },
    ],
    relatedSlugs: ["mise-en-demeure-remboursement", "mise-en-demeure-artisan", "demande-restitution-caution"],
  },

  {
    slug: "mise-en-demeure-remboursement",
    title: "Mise en demeure de remboursement — Lettre type gratuite",
    metaTitle: "Mise en demeure remboursement — Lettre 2026",
    metaDescription: "On vous doit de l'argent ? Mise en demeure de rembourser conforme au Code civil. PDF gratuit en 2 min.",
    letterType: "mise-en-demeure",
    heroText: "Un professionnel, un particulier ou un organisme vous doit une somme et ne rembourse pas malgré vos relances ? Générez une mise en demeure formelle, dernière étape amiable avant l'action en justice.",
    legalInfo: "La mise en demeure est régie par les articles 1344 à 1344-2 du Code civil. Elle fait courir les intérêts de retard au taux légal (article 1231-6). Pour un professionnel, le taux d'intérêt légal majoré s'applique automatiquement. La mise en demeure doit identifier la créance (montant, origine, date d'exigibilité) et fixer un délai raisonnable de paiement (généralement 8 à 15 jours). Passé ce délai, vous pouvez saisir le tribunal. Pour les créances inférieures à 5 000 €, la procédure simplifiée de recouvrement par commissaire de justice est possible (article L125-1 du Code des procédures civiles d'exécution). Pour les injonctions de payer, le formulaire Cerfa n°12948*06 permet de saisir le tribunal sans avocat.",
    faqItems: [
      { q: "Quel délai accorder dans la mise en demeure ?", a: "Généralement 8 à 15 jours. Un délai trop court (2 jours) pourrait être jugé déraisonnable. Adaptez au montant et à la situation." },
      { q: "La mise en demeure fait-elle courir des intérêts ?", a: "Oui, les intérêts de retard au taux légal courent à compter de la réception de la mise en demeure (article 1231-6 du Code civil)." },
      { q: "Que faire si la personne ne paie toujours pas ?", a: "Pour les sommes < 5 000 € : procédure simplifiée par commissaire de justice. Au-delà : injonction de payer au tribunal (sans avocat) ou assignation en paiement." },
    ],
    relatedSlugs: ["mise-en-demeure-loyer-impaye", "mise-en-demeure-artisan", "reclamation-facture-abusive"],
  },

  {
    slug: "mise-en-demeure-artisan",
    title: "Mise en demeure artisan/entrepreneur — Lettre type gratuite",
    metaTitle: "Mise en demeure artisan travaux — Lettre 2026",
    metaDescription: "Artisan qui ne finit pas les travaux ou fait du mauvais travail ? Mise en demeure conforme, PDF gratuit.",
    letterType: "mise-en-demeure",
    heroText: "Votre artisan a abandonné le chantier, accumule les retards ou a réalisé des travaux non conformes ? Générez une mise en demeure formelle pour exiger l'achèvement des travaux, la reprise des malfaçons ou le remboursement.",
    legalInfo: "L'artisan est tenu à une obligation de résultat sur les travaux commandés (article 1792 du Code civil pour le gros œuvre, article 1231-1 pour les autres prestations). En cas d'abandon de chantier, la mise en demeure d'achever les travaux dans un délai raisonnable est un préalable obligatoire avant résolution du contrat (article 1226 du Code civil). Pour les malfaçons, la garantie de parfait achèvement court pendant 1 an (article 1792-6), la garantie biennale 2 ans (article 1792-3) et la garantie décennale 10 ans (article 1792). L'assurance décennale est obligatoire (article L241-1 du Code des assurances). En cas de devis non respecté, la surfacturation est sanctionnable (article L441-1 du Code de commerce).",
    faqItems: [
      { q: "L'artisan a abandonné le chantier, que faire ?", a: "Mise en demeure recommandée AR fixant un délai de 15 jours. Sans reprise, vous pouvez résoudre le contrat et faire terminer par un autre artisan, aux frais du premier." },
      { q: "Les travaux sont mal faits, quels recours ?", a: "Garantie de parfait achèvement (1 an), garantie biennale (2 ans) ou décennale (10 ans) selon la nature du défaut. Mettez en demeure l'artisan de reprendre les malfaçons." },
      { q: "L'artisan n'a pas d'assurance décennale ?", a: "L'absence d'assurance décennale est un délit (article L243-3 du Code des assurances). Signalez à la DGCCRF. L'artisan reste personnellement responsable sur ses biens propres." },
    ],
    relatedSlugs: ["mise-en-demeure-travaux-non-conformes", "mise-en-demeure-remboursement", "reclamation-garantie-legale"],
  },

  {
    slug: "mise-en-demeure-travaux-non-conformes",
    title: "Contestation travaux non conformes — Lettre type gratuite",
    metaTitle: "Travaux non conformes — Lettre 2026",
    metaDescription: "Travaux non conformes au devis ou aux normes ? Mise en demeure de reprise, garanties légales, PDF gratuit.",
    letterType: "mise-en-demeure",
    heroText: "Les travaux réalisés ne correspondent pas au devis, aux plans ou aux normes en vigueur ? Générez une mise en demeure exigeant la reprise des travaux aux frais de l'entrepreneur, en invoquant les garanties légales applicables.",
    legalInfo: "Le professionnel doit livrer un ouvrage conforme au contrat (article 1103 du Code civil) et aux règles de l'art. La non-conformité au devis engage sa responsabilité contractuelle (article 1231-1). Trois garanties légales protègent le maître d'ouvrage : la garantie de parfait achèvement (1 an, article 1792-6) couvre tous les désordres signalés à la réception ou dans l'année ; la garantie biennale (article 1792-3) couvre les éléments d'équipement dissociables pendant 2 ans ; la garantie décennale (article 1792) couvre les atteintes à la solidité ou à la destination de l'ouvrage pendant 10 ans. Un expert judiciaire peut être désigné en référé (article 145 du Code de procédure civile) pour constater les non-conformités avant que les preuves ne disparaissent.",
    faqItems: [
      { q: "Les travaux ne correspondent pas au devis signé ?", a: "Le devis signé a valeur de contrat. Toute non-conformité engage la responsabilité de l'artisan (article 1231-1). Mettez en demeure de reprendre les travaux conformément au devis." },
      { q: "Puis-je refuser de payer le solde ?", a: "Vous pouvez consigner le solde (ne pas payer sans courrier) et conditionner le paiement à la mise en conformité. Notifiez-le par recommandé pour éviter des poursuites en impayé." },
      { q: "Comment faire constater les malfaçons ?", a: "Faites appel à un expert amiable ou demandez une expertise judiciaire en référé (article 145 du CPC). Les photos datées, le devis et les échanges écrits sont des preuves essentielles." },
    ],
    relatedSlugs: ["mise-en-demeure-artisan", "mise-en-demeure-remboursement", "reclamation-produit-defectueux"],
  },

  // ═══════════════════════════════════════════════
  // CONTESTATION AMENDES
  // ═══════════════════════════════════════════════

  {
    slug: "contestation-amende-stationnement",
    title: "Contester une amende de stationnement (FPS) — Lettre type",
    metaTitle: "Contester amende stationnement FPS — Lettre 2026",
    metaDescription: "Contestez un forfait post-stationnement (FPS) abusif. Recours RAPO, tribunal administratif, PDF gratuit.",
    letterType: "contestation",
    heroText: "Vous avez reçu un forfait post-stationnement (FPS) que vous estimez injustifié ? Générez un recours administratif préalable obligatoire (RAPO) conforme, première étape indispensable avant toute saisine du tribunal.",
    legalInfo: "Depuis le 1er janvier 2018, le stationnement payant est dépénalisé. Les anciennes « amendes » sont remplacées par le forfait post-stationnement (FPS), fixé par chaque commune. La contestation passe obligatoirement par un RAPO (recours administratif préalable obligatoire) adressé à l'autorité dont dépend l'agent (commune ou prestataire), dans un délai d'1 mois après notification (article L2333-87-5 du CGCT). Le FPS doit être payé avant contestation (ou le montant majoré consigné). Si le RAPO est rejeté ou sans réponse sous 1 mois, vous pouvez saisir la Commission du Contentieux du Stationnement Payant (CCSP) à Limoges dans les 30 jours. Motifs recevables : ticket valide, véhicule cédé, horodateur en panne, stationnement handicapé valide.",
    faqItems: [
      { q: "Dois-je payer le FPS avant de contester ?", a: "Oui. Le paiement ou la consignation du montant est un préalable obligatoire au RAPO. Sans paiement, votre recours est irrecevable." },
      { q: "Quel délai pour contester un FPS ?", a: "1 mois à compter de la notification du FPS pour le RAPO. Si le RAPO est rejeté, 1 mois supplémentaire pour saisir la CCSP à Limoges." },
      { q: "L'horodateur était en panne, quel recours ?", a: "C'est un motif valable. Prenez des photos datées de l'horodateur en panne et joignez-les à votre RAPO. L'absence de moyen de paiement fonctionnel rend le FPS contestable." },
    ],
    relatedSlugs: ["contestation-pv-radar", "contestation-amende-sncf", "contestation-amende-ratp"],
  },

  {
    slug: "contestation-pv-radar",
    title: "Contester un PV radar — Lettre type gratuite",
    metaTitle: "Contester PV radar automatique — Lettre 2026",
    metaDescription: "Contestez un PV radar (excès de vitesse, feu rouge) avec une requête en exonération conforme. PDF gratuit.",
    letterType: "contestation",
    heroText: "Flash radar pour excès de vitesse ou feu rouge alors que vous n'étiez pas au volant, ou que vous contestez l'infraction ? Générez une requête en exonération conforme au Code de procédure pénale.",
    legalInfo: "La contestation d'un PV radar se fait par requête en exonération adressée à l'Officier du Ministère Public (OMP) dans les 45 jours suivant l'envoi de l'avis de contravention (article 529-2 du Code de procédure pénale). Vous n'êtes PAS obligé de payer l'amende pour contester (contrairement au FPS). Trois motifs principaux : vous n'étiez pas le conducteur (article L121-3 du Code de la route — désignez le conducteur ou invoquez le vol/cession du véhicule), vice de procédure (signalisation non conforme, marge d'erreur du radar), ou cas de force majeure. La consignation du montant de l'amende est obligatoire sauf si vous désignez un autre conducteur. Le formulaire de requête en exonération est joint à l'avis de contravention (formulaire Cerfa).",
    faqItems: [
      { q: "Je n'étais pas au volant, comment contester ?", a: "Remplissez la requête en exonération en désignant le conducteur réel (nom, adresse, permis). Vous êtes dispensé de consignation dans ce cas (article L121-3 du Code de la route)." },
      { q: "Dois-je payer l'amende pour contester ?", a: "Non, mais vous devez consigner le montant (chèque joint à la requête). La consignation n'est pas un paiement — elle est restituée si vous gagnez. Exception : pas de consignation si vous désignez un autre conducteur." },
      { q: "Quel délai pour contester un PV radar ?", a: "45 jours à compter de l'envoi de l'avis de contravention. Passé ce délai, l'amende est majorée et la contestation devient beaucoup plus difficile." },
    ],
    relatedSlugs: ["contestation-amende-stationnement", "contestation-amende-sncf", "contestation-amende-ratp"],
  },

  {
    slug: "contestation-amende-sncf",
    title: "Contester une amende SNCF — Lettre type gratuite",
    metaTitle: "Contester PV SNCF — Lettre 2026",
    metaDescription: "Contestez un PV SNCF (absence de titre, validation) avec une réclamation conforme. PDF gratuit.",
    letterType: "contestation",
    company: "SNCF",
    heroText: "Vous avez reçu un PV dans le train ou en gare que vous estimez injustifié ? Générez un courrier de contestation adressé au service de recouvrement SNCF, en invoquant les motifs légitimes d'annulation.",
    legalInfo: "Les contrôleurs SNCF sont habilités à dresser des procès-verbaux (article L2241-1 du Code des transports). L'amende forfaitaire est de 50 € si régularisée dans le train, ou de 50 € + le prix du billet en cas de PV. Vous disposez de 3 mois pour contester auprès du Centre de Recouvrement SNCF. Motifs recevables : titre de transport valide non présenté (oubli de carte de réduction, panne de l'appli), distributeur hors service en gare, cas de force majeure. Si le PV est maintenu, le recouvrement est transmis au Trésor Public avec majoration. Vous pouvez alors contester devant le tribunal de police. L'article 529-3 du Code de procédure pénale encadre la procédure.",
    faqItems: [
      { q: "J'avais un titre valide mais pas sur moi ?", a: "Présentez votre titre (abonnement, billet) dans les 5 jours en gare ou envoyez une copie au Centre de Recouvrement SNCF. Les frais sont réduits à un forfait de régularisation." },
      { q: "Le distributeur en gare était en panne ?", a: "Motif recevable. Prenez une photo du distributeur et notez l'heure. Joignez ces éléments à votre contestation pour prouver l'impossibilité d'acheter un billet." },
      { q: "Quel délai pour contester un PV SNCF ?", a: "3 mois à compter de la date du PV. Adressez votre contestation au Centre de Recouvrement SNCF dont l'adresse figure sur le PV." },
    ],
    relatedSlugs: ["contestation-amende-ratp", "reclamation-sncf", "contestation-pv-radar"],
  },

  {
    slug: "contestation-amende-ratp",
    title: "Contester une amende RATP — Lettre type gratuite",
    metaTitle: "Contester PV RATP — Lettre 2026",
    metaDescription: "Contestez un PV RATP (métro, bus, RER) avec un courrier conforme. Motifs, délais, PDF gratuit.",
    letterType: "contestation",
    company: "RATP",
    heroText: "PV dans le métro, le bus ou le RER que vous jugez injustifié ? Générez un courrier de contestation adressé au service contentieux RATP, avec les motifs légaux et les pièces à joindre.",
    legalInfo: "Les agents RATP sont assermentés pour dresser des PV (article L2241-1 du Code des transports). L'amende est de 50 € pour voyage sans titre valide (tarif réduit à 38,50 € si payé sous 7 jours) et de 60 € pour fraude habituelle. La contestation doit être adressée au Service Contentieux RATP dans un délai de 2 mois. Motifs recevables : pass Navigo valide non lu (dysfonctionnement du valideur), achat impossible (automates hors service), erreur de zone, cas de force majeure. Si le PV est maintenu et non payé, il est transmis au Trésor Public avec majoration à 180 €. Vous pouvez alors saisir le tribunal de police avant la date indiquée sur l'avis de majoration.",
    faqItems: [
      { q: "Mon Navigo n'a pas bipé, comment contester ?", a: "Joignez à votre contestation une copie de votre pass Navigo valide et le reçu de chargement. Les dysfonctionnements de valideurs sont un motif légitime d'annulation." },
      { q: "Quel délai pour contester un PV RATP ?", a: "2 mois pour écrire au Service Contentieux RATP. Si le PV est transmis au Trésor Public, vous avez 30 jours à compter de l'avis de majoration pour saisir le tribunal de police." },
      { q: "Puis-je régler le PV à tarif réduit et contester ensuite ?", a: "Non, le paiement vaut reconnaissance de l'infraction. Si vous souhaitez contester, ne payez pas et envoyez votre courrier dans les 2 mois." },
    ],
    relatedSlugs: ["contestation-amende-sncf", "contestation-amende-stationnement", "contestation-pv-radar"],
  },

  {
    slug: "contestation-majoration-impots",
    title: "Contester une majoration d'impôts — Lettre type gratuite",
    metaTitle: "Contester majoration impôts — Lettre 2026",
    metaDescription: "Majorations ou pénalités fiscales injustifiées ? Réclamation contentieuse auprès des impôts, PDF gratuit.",
    letterType: "contestation",
    heroText: "Vous avez reçu une majoration d'impôts, des pénalités de retard ou un redressement que vous estimez injustifié ? Générez une réclamation contentieuse formelle adressée au service des impôts, première étape obligatoire avant tout recours devant le tribunal.",
    legalInfo: "La réclamation contentieuse est régie par les articles L190 et R*190-1 du Livre des procédures fiscales. Elle doit être adressée au service des impôts dont vous dépendez, par courrier recommandé ou via votre espace particulier sur impots.gouv.fr. Le délai est le 31 décembre de la 2e année suivant la mise en recouvrement (article R*196-1). L'administration dispose de 6 mois pour répondre. Sans réponse, le silence vaut rejet. Vous pouvez alors saisir le tribunal administratif (impôts directs) ou le tribunal judiciaire (droits d'enregistrement, TVA). L'article L247 du LPF permet aussi de demander une remise gracieuse des majorations en cas de difficultés financières. Les intérêts de retard (0,20 % par mois) peuvent être réduits ou supprimés en cas de bonne foi.",
    faqItems: [
      { q: "Quel délai pour contester une majoration d'impôts ?", a: "Jusqu'au 31 décembre de la 2e année suivant la mise en recouvrement. Exemple : impôt mis en recouvrement en 2025 → contestation jusqu'au 31/12/2027." },
      { q: "Puis-je demander une remise gracieuse ?", a: "Oui, l'article L247 du Livre des procédures fiscales permet de demander une remise totale ou partielle des majorations et pénalités, indépendamment de toute contestation sur le fond." },
      { q: "La réclamation suspend-elle le paiement ?", a: "Non, sauf si vous demandez expressément un sursis de paiement (article L277 du LPF). Vous devez alors fournir des garanties (caution bancaire, hypothèque)." },
      { q: "L'administration ne répond pas, que faire ?", a: "Après 6 mois de silence, le rejet est implicite. Vous disposez alors de 2 mois pour saisir le tribunal administratif (ou judiciaire selon l'impôt)." },
    ],
    relatedSlugs: ["contestation-urssaf", "reclamation-facture-abusive", "contestation-amende-stationnement"],
  },

  {
    slug: "contestation-urssaf",
    title: "Contester un redressement URSSAF — Lettre type gratuite",
    metaTitle: "Contester redressement URSSAF — Lettre 2026",
    metaDescription: "Redressement URSSAF injustifié ? Lettre d'observations conforme au Code de la Sécurité sociale, PDF gratuit.",
    letterType: "contestation",
    company: "URSSAF",
    heroText: "Vous avez reçu une lettre d'observations URSSAF suite à un contrôle et vous contestez les chefs de redressement ? Générez une réponse motivée dans les délais légaux pour faire valoir vos arguments avant la mise en recouvrement.",
    legalInfo: "Le contrôle URSSAF est encadré par les articles L243-7 et suivants du Code de la Sécurité sociale. Après contrôle, l'URSSAF envoie une lettre d'observations détaillant les chefs de redressement. Vous disposez de 30 jours pour y répondre (article R243-59), prolongeables à 60 jours sur demande. L'URSSAF doit répondre de manière motivée à vos observations. Après mise en recouvrement, vous pouvez saisir la Commission de Recours Amiable (CRA) dans un délai de 2 mois (article R142-1). Si la CRA rejette votre recours (ou ne répond pas sous 2 mois), vous pouvez saisir le tribunal judiciaire (pôle social) dans un délai de 2 mois. Les majorations de retard (5 % + 0,2 %/mois) peuvent faire l'objet d'une remise gracieuse.",
    faqItems: [
      { q: "Quel délai pour répondre à la lettre d'observations ?", a: "30 jours à compter de la réception. Demandez une prolongation à 60 jours par courrier recommandé si le dossier est complexe — l'URSSAF ne peut pas refuser." },
      { q: "Puis-je contester après la mise en recouvrement ?", a: "Oui, saisissez la Commission de Recours Amiable (CRA) dans les 2 mois suivant la mise en demeure. Si la CRA rejette, saisissez le tribunal judiciaire sous 2 mois." },
      { q: "Les majorations peuvent-elles être supprimées ?", a: "Oui, demandez une remise gracieuse des majorations à la CRA, en justifiant votre bonne foi et l'absence d'intention frauduleuse." },
      { q: "Le contrôle URSSAF doit-il respecter des formalités ?", a: "Oui : avis de contrôle préalable (15 jours avant), charte du cotisant contrôlé remise, durée limitée (3 mois pour les entreprises < 20 salariés). Tout manquement peut entraîner la nullité du redressement." },
    ],
    relatedSlugs: ["contestation-majoration-impots", "reclamation-facture-abusive", "mise-en-demeure-remboursement"],
  },

  // ═══════════════════════════════════════════════
  // TRAVAIL
  // ═══════════════════════════════════════════════

  {
    slug: "lettre-demission",
    title: "Lettre de démission — Modèle gratuit",
    metaTitle: "Lettre de démission — Modèle 2026",
    metaDescription: "Rédigez votre lettre de démission en 2 min. Préavis, mentions obligatoires, PDF conforme au Code du travail.",
    letterType: "travail",
    heroText: "Vous quittez votre emploi ? Générez une lettre de démission claire et professionnelle, mentionnant la date de départ calculée selon votre préavis conventionnel et les articles du Code du travail applicables.",
    legalInfo: "La démission est un droit unilatéral du salarié en CDI (article L1231-1 du Code du travail). Elle n'a pas besoin d'être motivée ni acceptée par l'employeur. Le préavis est fixé par la convention collective, l'accord d'entreprise ou le contrat de travail — à défaut, par les usages (généralement 1 mois pour les employés, 3 mois pour les cadres). La démission doit manifester une volonté claire et non équivoque. Un écrit n'est pas légalement obligatoire mais fortement recommandé pour fixer la date de départ. L'employeur peut dispenser le salarié de préavis (l'indemnité compensatrice est alors due). Attention : la démission ne donne pas droit aux allocations chômage, sauf cas de démission légitime (liste fixée par le règlement d'assurance chômage).",
    faqItems: [
      { q: "Dois-je respecter un préavis ?", a: "Oui, sauf accord de l'employeur pour vous en dispenser. La durée est fixée par votre convention collective ou contrat. En cas de non-respect, l'employeur peut réclamer des dommages-intérêts." },
      { q: "Puis-je toucher le chômage après une démission ?", a: "En principe non. Sauf cas de démission légitime (suivi de conjoint, création d'entreprise avec projet réel, non-paiement de salaire, etc.) ou après 5 ans d'activité avec un projet de reconversion validé." },
      { q: "Ma démission doit-elle être écrite ?", a: "La loi n'impose pas d'écrit, mais il est indispensable pour prouver la date et éviter tout litige. Remettez la lettre en main propre contre décharge ou envoyez-la en recommandé AR." },
    ],
    relatedSlugs: ["contestation-sanction-disciplinaire", "rappel-salaire-impaye", "contestation-licenciement"],
  },

  {
    slug: "contestation-sanction-disciplinaire",
    title: "Contester une sanction disciplinaire — Lettre type gratuite",
    metaTitle: "Contester sanction disciplinaire — Lettre 2026",
    metaDescription: "Avertissement ou mise à pied injustifié ? Lettre de contestation conforme au Code du travail, PDF gratuit.",
    letterType: "travail",
    heroText: "Vous avez reçu un avertissement, un blâme ou une mise à pied que vous estimez injustifié ? Générez un courrier de contestation motivé pour protéger votre dossier et préparer un éventuel recours aux prud'hommes.",
    legalInfo: "Les sanctions disciplinaires sont encadrées par les articles L1331-1 et suivants du Code du travail. Toute sanction doit être justifiée par une faute réelle et proportionnée (article L1333-1). Les sanctions pécuniaires (amendes, retenues) sont interdites (article L1331-2). La procédure disciplinaire impose un entretien préalable pour toute sanction supérieure à l'avertissement (article L1332-2), un délai de notification de 2 jours minimum à 1 mois maximum après l'entretien (article L1332-2), et une prescription de 2 mois à compter de la connaissance des faits (article L1332-4). Le salarié peut contester toute sanction devant le conseil de prud'hommes qui vérifie la régularité de la procédure, la réalité des faits et la proportionnalité (article L1333-2).",
    faqItems: [
      { q: "Quel délai pour contester une sanction ?", a: "Il n'y a pas de délai légal pour contester par courrier auprès de l'employeur. Pour saisir les prud'hommes, le délai de prescription est de 2 ans (article L1471-1)." },
      { q: "Mon employeur m'a sanctionné sans entretien préalable ?", a: "Pour un avertissement/blâme, l'entretien n'est pas obligatoire. Pour une mise à pied, rétrogradation ou mutation, l'entretien est obligatoire. Son absence rend la sanction nulle." },
      { q: "La sanction date de faits vieux de 3 mois ?", a: "La sanction est nulle. L'employeur a 2 mois maximum à compter de la connaissance des faits pour engager la procédure disciplinaire (article L1332-4)." },
    ],
    relatedSlugs: ["lettre-demission", "rappel-salaire-impaye", "contestation-licenciement"],
  },

  {
    slug: "rappel-salaire-impaye",
    title: "Rappel de salaire impayé — Lettre type gratuite",
    metaTitle: "Rappel salaire impayé — Lettre 2026",
    metaDescription: "Salaire non versé ou en retard ? Mise en demeure de paiement conforme au Code du travail, PDF gratuit.",
    letterType: "travail",
    heroText: "Votre employeur ne vous a pas versé votre salaire, vos heures supplémentaires ou vos primes ? Générez une mise en demeure formelle pour exiger le paiement sous 8 jours, étape préalable avant les prud'hommes.",
    legalInfo: "Le paiement du salaire est une obligation fondamentale de l'employeur (article L3242-1 du Code du travail). Le salaire doit être versé au moins une fois par mois pour les mensualisés. Tout retard constitue un manquement grave pouvant justifier une prise d'acte de la rupture du contrat aux torts de l'employeur (Cass. soc., 6 juillet 2011). Le salarié peut saisir le conseil de prud'hommes en référé pour obtenir une provision sur les salaires dus (article R1455-7). La prescription pour une action en paiement de salaire est de 3 ans (article L3245-1). En cas de non-paiement persistant, le salarié peut aussi saisir l'inspection du travail (article L8113-7) et l'URSSAF.",
    faqItems: [
      { q: "Mon salaire a 2 semaines de retard, que faire ?", a: "Envoyez immédiatement une mise en demeure par recommandé AR avec délai de 8 jours. Si l'employeur ne régularise pas, saisissez les prud'hommes en référé pour obtenir le paiement sous astreinte." },
      { q: "Puis-je arrêter de travailler si je ne suis pas payé ?", a: "Pas de droit de retrait pour non-paiement. Mais vous pouvez prendre acte de la rupture aux torts de l'employeur, ce qui produit les effets d'un licenciement sans cause si les manquements sont avérés." },
      { q: "Quel délai pour réclamer des salaires impayés ?", a: "3 ans à compter du jour où le salarié a connu ou aurait dû connaître les faits (article L3245-1). La demande peut porter sur les 3 dernières années." },
    ],
    relatedSlugs: ["contestation-licenciement", "lettre-demission", "contestation-sanction-disciplinaire"],
  },

  {
    slug: "contestation-licenciement",
    title: "Contester un licenciement — Lettre type gratuite",
    metaTitle: "Contester licenciement — Lettre 2026",
    metaDescription: "Licenciement abusif ou irrégulier ? Lettre de contestation conforme, prud'hommes, PDF gratuit.",
    letterType: "travail",
    heroText: "Vous estimez votre licenciement injustifié, discriminatoire ou irrégulier en la forme ? Générez un courrier de contestation motivé à adresser à votre employeur, première étape avant la saisine du conseil de prud'hommes.",
    legalInfo: "Le licenciement doit reposer sur une cause réelle et sérieuse (article L1232-1 du Code du travail). La procédure impose un entretien préalable (article L1232-2), un délai de réflexion de 2 jours ouvrables minimum (article L1232-6), et la notification par recommandé AR motivé. Tout manquement ouvre droit à indemnisation. Le salarié dispose de 12 mois pour contester devant les prud'hommes (article L1471-1). Le barème Macron (article L1235-3) fixe les indemnités entre 1 et 20 mois de salaire selon l'ancienneté. En cas de licenciement nul (discrimination, harcèlement, grossesse), le barème ne s'applique pas et la réintégration peut être ordonnée. Demandez vos documents de fin de contrat (certificat, solde de tout compte, attestation Pôle Emploi) sous 8 jours.",
    faqItems: [
      { q: "Quel délai pour contester un licenciement ?", a: "12 mois à compter de la notification du licenciement pour saisir les prud'hommes (article L1471-1). N'attendez pas : les preuves se perdent avec le temps." },
      { q: "Mon licenciement est discriminatoire, quel recours ?", a: "Le licenciement est nul de plein droit (article L1132-4). Pas de barème Macron. Vous pouvez demander la réintégration ou des indemnités sans plafond, plus des dommages-intérêts." },
      { q: "L'entretien préalable n'a pas eu lieu, est-ce grave ?", a: "C'est un vice de procédure qui donne droit à une indemnité d'au moins 1 mois de salaire (article L1235-2), en plus de l'indemnisation éventuelle pour absence de cause réelle et sérieuse." },
    ],
    relatedSlugs: ["rappel-salaire-impaye", "lettre-demission", "contestation-sanction-disciplinaire"],
  },

  // ═══════════════════════════════════════════════
  // RÉTRACTATION
  // ═══════════════════════════════════════════════

  {
    slug: "retractation-achat-en-ligne",
    title: "Rétractation achat en ligne (14 jours) — Lettre type",
    metaTitle: "Rétractation achat en ligne 14j — Lettre 2026",
    metaDescription: "Exercez votre droit de rétractation 14 jours pour un achat en ligne. Lettre conforme, PDF gratuit.",
    letterType: "retractation",
    heroText: "Vous regrettez un achat effectué sur internet ? La loi vous accorde 14 jours pour vous rétracter sans justification. Générez un courrier de rétractation conforme incluant les articles du Code de la consommation applicables.",
    legalInfo: "Le droit de rétractation de 14 jours est garanti par l'article L221-18 du Code de la consommation pour tout achat à distance (internet, téléphone, courrier). Le délai court à compter de la réception du bien ou de la conclusion du contrat pour les services. Si le vendeur n'a pas informé du droit de rétractation, le délai est prolongé de 12 mois (article L221-20). Le remboursement doit intervenir sous 14 jours après notification de la rétractation (article L221-24). Le vendeur supporte les frais de retour uniquement s'il ne l'a pas précisé dans ses CGV. Exceptions : biens personnalisés, périssables, presse, contenus numériques commencés, voyages, billets de spectacle (article L221-28).",
    faqItems: [
      { q: "Quand commence le délai de 14 jours ?", a: "Pour un bien : le jour de la réception. Pour un service : le jour de la conclusion du contrat. Le délai expire le 14e jour à 23h59." },
      { q: "Le vendeur refuse mon retour, que faire ?", a: "Le droit de rétractation est d'ordre public, le vendeur ne peut pas le refuser (sauf exceptions légales). Envoyez un recommandé citant l'article L221-18 et exigez le remboursement sous 14 jours." },
      { q: "Qui paie les frais de retour ?", a: "Le consommateur, sauf si le vendeur accepte de les prendre en charge ou s'il n'a pas informé que les frais seraient à la charge de l'acheteur (article L221-23)." },
      { q: "Puis-je me rétracter d'un achat de billet d'avion ?", a: "Non, les transports de voyageurs sont exclus du droit de rétractation (article L221-28). Vérifiez les conditions d'annulation de la compagnie." },
    ],
    relatedSlugs: ["retractation-demarchage-telephonique", "retractation-contrat-domicile", "reclamation-colis-amazon"],
  },

  {
    slug: "retractation-demarchage-telephonique",
    title: "Rétractation démarchage téléphonique — Lettre type",
    metaTitle: "Rétractation démarchage téléphonique — Lettre 2026",
    metaDescription: "Contrat souscrit par téléphone ? Exercez votre droit de rétractation 14 jours. Lettre conforme, PDF gratuit.",
    letterType: "retractation",
    heroText: "On vous a fait souscrire un contrat par téléphone que vous n'aviez pas sollicité ? Vous avez 14 jours pour vous rétracter. Générez un courrier annulant le contrat et citant les protections renforcées contre le démarchage abusif.",
    legalInfo: "Le démarchage téléphonique est encadré par les articles L221-16 et suivants du Code de la consommation. Depuis la loi du 24 juillet 2020, le professionnel doit envoyer une confirmation écrite de l'offre, et le contrat n'est formé qu'après signature ou acceptation écrite du consommateur (article L221-16). Le droit de rétractation de 14 jours s'applique (article L221-18). Si le professionnel n'a pas respecté la procédure de confirmation écrite, le contrat est nul de plein droit. L'inscription sur Bloctel protège contre le démarchage non sollicité (article L223-1). Toute infraction est passible de 75 000 € d'amende pour une personne physique, 375 000 € pour une personne morale.",
    faqItems: [
      { q: "J'ai accepté par téléphone, le contrat est-il valable ?", a: "Depuis 2020, le contrat n'est formé qu'après confirmation écrite que vous avez signée ou acceptée par écrit. Si vous n'avez rien signé, le contrat est nul." },
      { q: "Je suis inscrit sur Bloctel et j'ai été démarché ?", a: "Le professionnel est en infraction (75 000 € d'amende). Signalez sur bloctel.gouv.fr et exercez votre rétractation. L'inscription sur Bloctel renforce votre dossier en cas de litige." },
      { q: "Le professionnel refuse ma rétractation ?", a: "Le droit de rétractation est d'ordre public, il ne peut être refusé. Envoyez un recommandé AR citant l'article L221-18. Signalez à la DGCCRF en cas de résistance." },
    ],
    relatedSlugs: ["retractation-achat-en-ligne", "retractation-contrat-domicile", "reclamation-facture-abusive"],
  },

  {
    slug: "retractation-contrat-domicile",
    title: "Rétractation contrat à domicile — Lettre type gratuite",
    metaTitle: "Rétractation contrat signé à domicile — Lettre 2026",
    metaDescription: "Contrat signé chez vous suite à un démarchage ? 14 jours pour annuler. Lettre conforme, PDF gratuit.",
    letterType: "retractation",
    heroText: "Un commercial s'est présenté chez vous et vous a fait signer un contrat (travaux, énergie, alarme) ? Vous disposez de 14 jours pour annuler sans frais. Générez un courrier de rétractation irréprochable.",
    legalInfo: "Les contrats conclus hors établissement (à domicile, foire, salon) bénéficient d'un droit de rétractation de 14 jours (article L221-18 du Code de la consommation). Le bon de rétractation détachable doit figurer dans le contrat (article L221-5). Si le vendeur ne l'a pas fourni, le délai est prolongé de 12 mois. Aucun paiement ne peut être encaissé pendant les 7 premiers jours suivant la signature (article L221-10) — toute clause contraire est nulle. Si des travaux ont commencé avant l'expiration du délai à votre demande expresse, vous ne devez que le montant proportionnel aux services fournis. Le professionnel doit rembourser sous 14 jours après rétractation (article L221-24).",
    faqItems: [
      { q: "Le vendeur a encaissé mon chèque le jour de la signature ?", a: "C'est illégal. Aucun paiement ne peut être perçu pendant les 7 premiers jours (article L221-10). Demandez le remboursement immédiat et signalez à la DGCCRF." },
      { q: "Les travaux ont déjà commencé, puis-je me rétracter ?", a: "Oui. Si vous avez demandé un début d'exécution avant la fin du délai, vous ne devez que le prorata des services rendus. Si vous n'avez rien demandé, les travaux anticipés sont aux frais du professionnel." },
      { q: "Le contrat n'a pas de bordereau de rétractation ?", a: "Le délai de rétractation est prolongé de 12 mois. De plus, le professionnel encourt une amende de 15 000 € (article L242-5). Envoyez votre rétractation même sans le formulaire." },
    ],
    relatedSlugs: ["retractation-achat-en-ligne", "retractation-demarchage-telephonique", "reclamation-facture-abusive"],
  },

  // ═══════════════════════════════════════════════
  // DEMANDE DE DÉLAI DE PAIEMENT
  // ═══════════════════════════════════════════════

  {
    slug: "delai-paiement-impots",
    title: "Demande de délai de paiement impôts — Lettre type gratuite",
    metaTitle: "Délai de paiement impôts — Lettre 2026",
    metaDescription: "Difficultés pour payer vos impôts ? Demande de délai ou remise gracieuse. Lettre conforme, PDF gratuit.",
    letterType: "delai-paiement",
    heroText: "Vous traversez une période financière difficile et ne pouvez pas régler vos impôts dans les délais ? Générez une demande de délai de paiement ou de remise gracieuse adressée au comptable public, avec les justificatifs à joindre.",
    legalInfo: "L'article L247 du Livre des procédures fiscales autorise l'administration à accorder des remises totales ou partielles d'impôts directs, de pénalités et de majorations en cas de gêne ou d'indigence. L'article L277 permet de demander un sursis de paiement en cas de contestation. Pour un simple échelonnement, adressez-vous au Service des Impôts des Particuliers (SIP) ou au comptable du Trésor Public. La demande doit détailler votre situation financière (revenus, charges, dettes) et proposer un échéancier réaliste. L'octroi d'un délai suspend les poursuites (saisies, ATD). En cas de refus, le recours hiérarchique auprès du directeur départemental des finances publiques est possible. Le Conciliateur fiscal départemental peut aussi être saisi gratuitement.",
    faqItems: [
      { q: "Quel échéancier proposer ?", a: "Proposez un plan réaliste (3 à 12 mensualités). L'administration accepte plus facilement si vous montrez un effort et joignez des justificatifs de vos difficultés (baisse de revenus, charges exceptionnelles)." },
      { q: "Les pénalités de retard s'appliquent-elles pendant le délai ?", a: "Oui, les intérêts de retard (0,20 %/mois) continuent de courir. Mais vous pouvez demander simultanément une remise gracieuse des majorations (article L247 du LPF)." },
      { q: "L'administration peut-elle saisir pendant ma demande ?", a: "En principe, non. La demande de délai suspend les poursuites. Si des saisies sont en cours, mentionnez-le dans votre courrier et demandez leur suspension." },
    ],
    relatedSlugs: ["delai-paiement-loyer", "delai-paiement-credit", "contestation-majoration-impots"],
  },

  {
    slug: "delai-paiement-loyer",
    title: "Demande de délai de paiement loyer — Lettre type gratuite",
    metaTitle: "Délai paiement loyer — Lettre 2026",
    metaDescription: "Difficultés pour payer le loyer ? Demande d'échéancier amiable au propriétaire. Lettre conforme, PDF gratuit.",
    letterType: "delai-paiement",
    heroText: "Vous ne pouvez pas régler votre loyer ce mois-ci ? Agissez avant l'impayé en envoyant une demande d'échelonnement à votre propriétaire. Notre générateur crée un courrier professionnel qui préserve la relation locataire-bailleur.",
    legalInfo: "Aucune disposition légale n'oblige le propriétaire à accorder un délai, mais une démarche amiable anticipée est toujours préférable à un impayé subi. En cas de refus du bailleur, le locataire peut saisir le juge des contentieux de la protection pour obtenir des délais de paiement pouvant aller jusqu'à 3 ans (article 1343-5 du Code civil, ex-article 1244-1). Le FSL (Fonds de Solidarité Logement) peut accorder une aide financière. Si vous percevez des APL, la CAF peut aussi être sollicitée. Depuis la loi ALUR, l'impayé de loyer doit être signalé à la CAF/MSA dès le 2e mois par le bailleur. Action Logement propose le dispositif Visale (garantie locative) et des aides ponctuelles pour les salariés en difficulté.",
    faqItems: [
      { q: "Le propriétaire est-il obligé d'accepter un échéancier ?", a: "Non, c'est une démarche amiable. Mais il a intérêt à accepter : un plan de paiement respecté est préférable à une procédure d'expulsion longue et coûteuse." },
      { q: "Le juge peut-il m'accorder des délais ?", a: "Oui, jusqu'à 3 ans (article 1343-5 du Code civil). Saisissez le juge des contentieux de la protection. Pendant la procédure, les expulsions sont suspendues." },
      { q: "Quelles aides existent pour payer mon loyer ?", a: "FSL (Fonds de Solidarité Logement), APL, aides d'Action Logement (salariés), CCAS de votre mairie. Contactez une assistante sociale ou l'ADIL de votre département." },
    ],
    relatedSlugs: ["delai-paiement-impots", "delai-paiement-credit", "preavis-logement-1-mois"],
  },

  {
    slug: "delai-paiement-credit",
    title: "Demande de délai de paiement crédit — Lettre type gratuite",
    metaTitle: "Délai paiement crédit bancaire — Lettre 2026",
    metaDescription: "Difficultés pour rembourser un crédit ? Demande de report ou modulation d'échéances. PDF conforme gratuit.",
    letterType: "delai-paiement",
    heroText: "Vous ne pouvez plus honorer vos mensualités de crédit ? Générez une demande de report d'échéances ou de réaménagement adressée à votre banque, avant que l'incident de paiement ne soit inscrit au FICP.",
    legalInfo: "En cas de difficulté temporaire, l'article 1343-5 du Code civil (ex-article 1244-1) permet au juge d'accorder un délai de grâce pouvant reporter ou échelonner les paiements sur 2 ans maximum. La plupart des contrats de crédit prévoient une clause de modulation ou de report (vérifiez vos conditions). La Banque de France peut être saisie pour un dossier de surendettement (articles L711-1 et suivants du Code de la consommation) : gel des poursuites, rééchelonnement, voire effacement partiel des dettes. Deux incidents de paiement consécutifs entraînent l'inscription au FICP (fichier des incidents de crédit) pour 5 ans. Pour les crédits immobiliers, l'article L313-12 du Code monétaire et financier impose à la banque de chercher une solution amiable avant toute déchéance du terme.",
    faqItems: [
      { q: "Combien de mensualités puis-je reporter ?", a: "Cela dépend de votre contrat. La plupart des crédits prévoient 1 à 6 mois de report. Au-delà, négociez un réaménagement ou saisissez la commission de surendettement." },
      { q: "Le report entraîne-t-il des frais ?", a: "Oui, les intérêts continuent de courir pendant le report. La durée totale du crédit est allongée d'autant. Demandez un chiffrage précis à votre banque avant d'accepter." },
      { q: "Quand saisir la commission de surendettement ?", a: "Quand vos dettes sont manifestement supérieures à votre capacité de remboursement. La saisine est gratuite auprès de la Banque de France. Elle gèle immédiatement les poursuites des créanciers." },
    ],
    relatedSlugs: ["delai-paiement-loyer", "delai-paiement-impots", "mise-en-demeure-remboursement"],
  },
];
