// DishDex/script.js


function buildLanguageFilePaths() {
  const entries = {};
  ['cs', 'da', 'de', 'el', 'en', 'es', 'fi', 'fr', 'hu', 'it', 'ja', 'ko', 'nl', 'pl', 'pt', 'ru', 'sv', 'tr', 'zh_CN', 'zh_TW'].forEach(code => {
    entries[code] = [
      `../langs/Cafe_${code}.xml`,
      `../langs/cafe_${code}.xml`,
      `../Cafe_${code}.xml`,
      `../cafe_${code}.xml`
    ];
  });
  return entries;
}

function buildUiLanguageFilePaths() {
  const entries = {};
  ['cs', 'da', 'de', 'el', 'en', 'es', 'fi', 'fr', 'hu', 'it', 'ja', 'ko', 'nl', 'pl', 'pt', 'ru', 'sv', 'tr', 'zh_CN', 'zh_TW'].forEach(code => {
    entries[code] = [
      `./dishdexlangs/dishdex_${code}.xml`,
      `dishdexlangs/dishdex_${code}.xml`
    ];
  });
  return entries;
}

const PATHS = {
  cafeItems: '../CafeItems.xml',
  levelLimits: [
    '../CafeLevelXp.xml',
    '../CafeLevelXP.xml',
    '../CafeLevelXp.XML'
  ],
  languageFiles: buildLanguageFilePaths(),
  imageBase: '../dishimages/',
  coopIconBase: './coopicons/',
  uiLanguageFiles: buildUiLanguageFilePaths()
};

const STORAGE_KEY = 'dishDexUserDataV1';
const MASTERY_VIEW_STORAGE_KEY = 'dishDexMasteryViewMode';
const FULL_USE_MASTERIES_STORAGE_KEY = 'dishDexFullUseMasteries';
const MAX_COOP_TEAMS = 10;
const MAX_COOP_MEMBERS = 5;
const COOP_WORKLOAD_WEIGHTS = {
  minimum: 0.05,
  low: 0.65,
  equal: 1,
  high: 1.45,
  veryHigh: 2,
  manual: 1
};
const MASTERY_PAGE_SIZE = 4;
const MASTERY_DAYS_LV1 = 1;
const MASTERY_DAYS_LV2 = 5;
const MASTERY_DAYS_LV3 = 13;
const MASTERY_STOVE_COUNT = 4;
const MASTERY_SERVING_BONUS = 1.05;
const MASTERY_XP_BONUS = 1.05;
const MASTERY_TIME_BONUS = 0.70;
const MIN_COOKING_TIME = 0.5;
let activeCoopGoldMasteryMemberIndex = null;
let coopGoldMasterySearchTerm = '';
let activeCoopManualAssignmentMemberSlot = null;

const SPECIAL_DISH_KEYS = [
  'Duckalorange',
  'Orangejuice',
  'Blackforestcherrycake'
];

const HOLIDAY_DISH_KEYS = [
  'Christmasturkey',
  'Easterdish',
  'Fruitpudding'
];

const CATEGORY_NAMES = {
  en: {
    '0': 'Dessert',
    '1': 'Main Dish',
    '2': 'Soup',
    '3': 'Salad',
    '4': 'Vegetarian',
    '5': 'Snack'
  },
  pt: {
    '0': 'Sobremesa',
    '1': 'Prato principal',
    '2': 'Sopa',
    '3': 'Salada',
    '4': 'Vegetariano',
    '5': 'Lanche'
  }
};


const SUPPORTED_LANGUAGE_CODES = [
  'cs', 'da', 'de', 'el', 'en', 'es', 'fi', 'fr', 'hu', 'it', 'ja', 'ko', 'nl', 'pl', 'pt', 'ru', 'sv', 'tr', 'zh_CN', 'zh_TW'
];

const CAFE_LANGUAGE_CODES = new Set(SUPPORTED_LANGUAGE_CODES);

const I18N = {
  en: {
    mainSubtitle: 'Access information about all dishes!',
    chooseMode: 'Choose a mode',
    chooseModeNote: 'Select how you want to use DishDex.',
    languageLabel: '🌐 Language',
    darkTheme: 'Dark Theme',
    myDexDescription: 'Access your personal DishDex based on your level, XP and available time.',
    fullDishDexTitle: 'Full DishDex',
    fullDishDexDescription: 'Access the complete DishDex with all information.',
    myTimeTitle: 'My Time',
    myTimeDescription: 'Plan dishes according to your time.',
    myTimeEyebrow: 'Time planning',
    myTimeSettings: 'My Time Settings',
    myTimeQuestion: 'How long do you want to cook for?',
    targetTime: 'Target time',
    hoursShort: 'h',
    minutesShort: 'min',
    myTimeMargin: 'Margin',
    myTimePlayerLevelLabel: 'Player level:',
    myTimeTargetLabel: 'Target:',
    myTimeMarginLabel: 'Margin:',
    myTimeBestMatches: 'Best matches',
    myTimeBestMatchesNote: 'Best dishes inside your chosen time window.',
    myTimeAllMatches: 'All matching dishes',
    myTimeAllMatchesNote: 'All available dishes in this time window, sorted by level.',
    myTimeWindowLabel: 'Showing dishes from {0} to {1}.',
    myTimeNoWindow: 'Set a target time above 0.',
    clearCookTime: 'Clear cook time',
    clearMargin: 'Clear margin',
    playerLevelShort: 'Player level',
    targetShort: 'Target',
    marginShort: 'Margin',
    noTimeMatches: 'No dishes match this time window. Try increasing the margin.',
    myProfileTitle: 'My Profile',
    myProfileDescription: 'Save your chef name, level and default stove count.',
    myMasteriesTitle: 'My Masteries',
    myMasteriesDescription: 'Register your dish mastery stars and apply them to MyDex.',
    coopPlannerTitle: 'Co-Op Planner',
    coopPlannerDescription: 'Browse and plan your next Co-Op here.',
    coopPlannerEyebrow: 'Team cooking',
    coopListTitle: 'Co-Op Planner',
    coopListNote: 'Browse and plan your next Co-Op here!',
    coopSearch: 'Search co-op',
    coopSearchPlaceholder: 'Search co-op...',
    coopNumber: 'Co-Op',
    maxMembers: 'Max members',
    baseRewards: 'Base rewards',
    maxRewardsYourLevel: 'Max Rewards (your level)',
    rewardDetails: 'Reward Details',
    cashReward: 'Cash',
    goldReward: 'Gold',
    goldDeadline: 'Gold deadline',
    silverDeadline: 'Silver deadline',
    bronzeDeadline: 'Bronze deadline',
    planCoop: 'Plan!',
    selectedCoopPlanTitle: 'Selected Co-Op Plan',
    noCoopSelected: 'Choose a co-op and click Plan!',
    noCoopsAvailable: 'No co-ops available.',
    coopShortDescription: 'Description',
    coopRequirements: 'Required dishes',
    minimumDishLevel: 'Minimum dish level',
    totalStoveHours: 'Total stove-hours',
    rewardEstimateAtYourLevel: 'XP estimate at your level',
    coopTeamTitle: 'Co-Op Team',
    coopTeamNote: 'Register up to five chefs and save up to ten teams.',
    loadTeam: 'Load team',
    teamName: 'Team name',
    newTeam: 'New team',
    saveTeam: 'Save team',
    deleteTeam: 'Delete team',
    useProfileForChef1: 'Use My Profile for Chef 1',
    chef: 'Chef',
    chefFallback: 'Chef',
    teamSaved: 'Team saved locally.',
    teamDeleted: 'Team deleted.',
    teamLimitReached: 'You can save up to 10 teams.',
    confirmDeleteTeam: 'Delete this saved team?',
    selectedTeam: 'Selected team',
    teamRewardsGold: 'Team rewards if Gold',
    noTeamMembers: 'Add at least one chef to this team.',
    assignmentComingSoon: 'Dish assignment comes in the next phase.',
    assignmentPlanTitle: 'Dish assignment plan',
    copyAssignment: 'Copy assignment',
    assignmentCopied: 'Assignment copied!',
    assignmentCopyFailed: 'Could not copy assignment.',
    workload: 'Workload',
    workloadMinimum: 'Minimum',
    workloadLow: 'Low',
    workloadEqual: 'Equal',
    workloadHigh: 'High',
    workloadVeryHigh: 'Very high',
    workloadManual: 'Manual',
    manualDishes: 'Manual dishes',
    manualDishesShort: 'dishes',
    editManualDishes: 'Edit dishes',
    manualAssignmentTitle: 'Manual assignment',
    manualAssignmentNote: 'Choose exactly which required dishes this chef should cook. The planner assigns the remaining dishes after this.',
    manualAssignmentSaved: 'Manual assignment saved.',
    manualAssignmentSummaryEmpty: 'No manual dishes set',
    manualAssignmentUnavailable: 'Choose a Co-Op first to edit manual dishes.',
    cannotCookDish: 'Cannot cook',
    useMyMasteriesForChef1: 'Use my gold masteries for Chef 1',
    goldMasteries: 'Gold masteries',
    editGoldMasteries: 'Edit gold masteries',
    goldMasteriesNote: 'Only Gold mastery matters here because it reduces cooking time.',
    searchDishes: 'Search dishes',
    noGoldMasteriesSelected: 'No Gold masteries selected yet.',
    myMasteriesActive: 'Using My Masteries for Chef 1',
    manualCountWarning: 'One or more manual workloads could not be filled completely.',
    estimatedWithTeam: 'Estimated with this team',
    predictedStatus: 'Predicted Status',
    assignedDishes: 'Assigned dishes',
    noAssignedDishes: 'No dishes assigned',
    noEligibleChef: 'No eligible chef can cook one or more required dishes.',
    impossibleMissingUnlock: 'Impossible: missing dish unlock',
    notDoable: 'Not doable',
    predictedRewards: 'Team rewards at predicted status',
    noRewardNoContribution: 'No reward without contribution',
    contributionWarning: 'Each chef must cook at least one required dish to receive rewards.',
    unassignedDishes: 'Unassigned dishes',
    chefCookTime: 'Cook time',
    bronze: 'Bronze',
    silver: 'Silver',
    gold: 'Gold',
    backButton: '← Back',
    personalRecommendations: 'Personal recommendations',
    myDexSettings: 'MyDex Settings',
    playerLevel: 'Player Level',
    xpNeeded: 'XP Needed',
    availableStoves: 'Available Stoves',
    holidayMode: 'Include holiday foods?',
    showIngredients: 'Show ingredients?',
    ingredientDetails: 'Ingredients',
    ingredientCost: 'Ingredient cost',
    exclude: 'Exclude',
    include: 'Include',
    auto: 'Auto',
    myDexHint: 'Insert your data for personalized recommendations.',
    bestSummaryTitle: 'Best of Summary',
    bestSummaryXpMin: 'Best XP/min',
    bestSummaryRawXp: 'Best raw XP',
    bestSummaryProfitMin: 'Best profit/min',
    bestSummaryRawProfit: 'Best raw profit',
    bestSummaryPortionMin: 'Best portion/min',
    bestSummaryRawPortion: 'Best raw portion',
    recommendedMasteriesTitle: 'Recommended Masteries',
    recommendedMasteriesNote: 'Best mastery targets based on your Best of Summary dishes.',
    useRegisteredMasteries: 'Use my registered masteries',
    currentMastery: 'Current Mastery',
    recommendedStar: 'Recommended Star',
    benefit: 'Benefit',
    requirement: 'Requirement',
    noRecommendedMasteries: 'No mastery recommendations available for this level/settings.',
    alreadyMasteredBest: 'You already mastered the best dish for this! Nice!',
    dishesRequired: 'dishes required',
    masteryTotalForGold: 'Total: {0} dishes required for Gold',
    bestXpTitle: 'Best Dishes (XP)',
    bestProfitTitle: 'Best Dishes (Profit)',
    bestPortionsTitle: 'Best dishes (Portions)',
    image: 'Image',
    recommendation: 'Recommendation',
    dish: 'Dish',
    level: 'Level',
    duration: 'Duration',
    category: 'Category',
    profit: 'Profit',
    profitMin: 'Profit/min',
    portions: 'Portions',
    portionsMin: 'Portions/min',
    xpPlansTitle: 'XP Needed Plans',
    xpPlansNote: 'Best level up plans to base your needs and availability.',
    plan: 'Plan',
    xpEach: 'XP Each',
    dishesNeeded: 'Dishes Needed',
    batches: 'Batches',
    totalCookTime: 'Total Cook Time',
    stoves: 'Stoves',
    actions: 'Actions',
    clearChef: 'Clear chef',
    resetWorkloads: 'Reset workloads',
    note: 'Note',
    specialDishes: 'Special Dishes',
    specialDishesNote: 'Special dishes are shown separately.',
    holidayDishes: 'Holiday Dishes',
    holidayDishesNote: 'Holiday dishes are shown separately. Auto mode uses Christmas and Easter seasons.',
    completeDishList: 'Complete dish list',
    sortFullDishDex: 'Sort Full DishDex',
    sortBy: 'Sort by',
    availableDishDex: 'Available DishDex',
    availableDishDexNote: 'Complete dish list with XP, profit, portions, time, category and requirements.',
    cost: 'Cost',
    revenue: 'Revenue',
    requirements: 'Requirements',
    type: 'Type',
    loadingXml: 'Loading Café XML...',
    dataLoaded: 'Café data loaded!',
    couldNotLoadData: 'Could not load Café data.',
    dishesReady: 'dishes ready',
    noXpRecommendations: 'No XP recommendations available for this level/settings.',
    noProfitRecommendations: 'No profit recommendations available for this level/settings.',
    noPortionRecommendations: 'No portion recommendations available for this level/settings.',
    noDishesAvailable: 'No dishes available.',
    noAvailableDish: 'No available dish',
    setXpAboveZero: 'Set XP Needed above 0.',
    noDishMatchesPlan: 'No dish matches this plan.',
    special: 'Special',
    holiday: 'Holiday',
    regular: 'Regular',
    fullTagSpecial: 'Special',
    fullTagChristmas: 'Christmas',
    fullTagEaster: 'Easter',
    holidayActive: 'Holiday: Active',
    holidayInactive: 'Holiday: Inactive',
    profitLower: 'profit',
    bestActive: 'Best active',
    bestFast: 'Best fast',
    bestShort: 'Best short',
    bestMedium: 'Best medium',
    bestLong: 'Best long',
    bestVeryLong: 'Best very long',
    bestDayOff: 'Best day-off',
    activeWord: 'active',
    fastWord: 'fast',
    shortWord: 'short',
    mediumWord: 'medium',
    longWord: 'long',
    veryLongWord: 'very long',
    dayOffWord: 'day-off',
    metricXpMin: 'XP/min',
    metricProfitMin: 'profit/min',
    metricPortionMin: 'portion/min',
    activePlan: 'Active-time',
    fastPlan: 'Fast-time',
    shortPlan: 'Short-time',
    mediumPlan: 'Medium-time',
    longPlan: 'Long-time',
    veryLongPlan: 'Very long',
    dayOffPlan: 'Day off',
    activeNote: 'Best XP/min for 10 minutes or less.',
    fastNote: 'Best XP/min between 11 minutes and 1 hour.',
    shortNote: 'Best XP/min between 1 h 1 min and 3 h.',
    mediumNote: 'Best XP/min between 3 h 1 min and 6 h.',
    longNote: 'Best XP/min between 6 h 1 min and 12 h.',
    veryLongNote: 'Best XP/min between 12 h 1 min and 23 h.',
    dayOffNote: 'Best XP/min for 23 h 1 min or more.',
    sortStandard: 'Cookbook order',
    sortLevelAsc: 'Level: low to high',
    sortLevelDesc: 'Level: high to low',
    sortNameAsc: 'Alphabetical A-Z',
    sortNameDesc: 'Alphabetical Z-A',
    sortCategory: 'Category',
    sortDurationAsc: 'Time: Short to Long',
    sortDurationDesc: 'Time: Long to Short',
    sortProfitAsc: 'Raw Profit: low to high',
    sortProfitDesc: 'Raw Profit: high to low',
    sortXpAsc: 'Raw XP: low to high',
    sortXpDesc: 'Raw XP: high to low',
    sortProfitPerMinAsc: 'Profit/min: low to high',
    sortProfitPerMinDesc: 'Profit/min: high to low',
    sortXpPerMinAsc: 'XP/min: low to high',
    sortXpPerMinDesc: 'XP/min: high to low',
    sortServingsAsc: 'Portions: low to high',
    sortServingsDesc: 'Portions: high to low',
    sortServingsPerMinAsc: 'Portions/min: low to high',
    sortServingsPerMinDesc: 'Portions/min: high to low',
    profileSettingsTitle: 'Chef Profile',
    profileSettingsNote: 'Your level helps the tool set your current available number of stoves. You can change this in MyDex later.',
    chefName: 'Chef name',
    profileSaved: 'Profile saved locally.',
    masteriesEyebrow: 'Dish perks',
    loadData: 'Load data',
    downloadData: 'Download data',
    deleteData: 'Delete data',
    searchDish: 'Search dish',
    searchDishPlaceholder: 'Search dish...',
    mastery: 'Mastery',
    effects: 'Effects',
    bronze: 'Bronze',
    silver: 'Silver',
    gold: 'Gold',
    portionsLower: 'portion(s)',
    xpUpper: 'XP',
    confirmDelete: 'Are you sure? This will delete your saved profile, masteries and Co-Op teams.',
    dataDeleted: 'Saved profile, masteries and Co-Op teams deleted.',
    dataLoadedMessage: 'Data loaded successfully.',
    dataLoadError: 'Could not load this data file.',
    dataDownloaded: 'Data file downloaded.',
    noMasteryRows: 'No dishes match this search.',
    masteryView: 'View',
    masteryListVertical: 'List (vertical reader)',
    masteryListHorizontal: 'List (horizontal reader)',
    masteryCookbook: 'Cook book',
    previousPage: '← Previous',
    nextPage: 'Next →',
    masteryBookPage: 'Page'
  },

  pt: {
    mainSubtitle: 'Acesse informações sobre todos os pratos!',
    chooseMode: 'Escolha um modo',
    chooseModeNote: 'Selecione como você quer usar o DishDex.',
    languageLabel: '🌐 Idioma',
    darkTheme: 'Tema escuro',
    myDexDescription: 'Acesse seu DishDex pessoal com base no seu nível, XP e tempo disponível.',
    fullDishDexTitle: 'DishDex completo',
    fullDishDexDescription: 'Acesse o DishDex completo com todas as informações.',
    myTimeTitle: 'Meu Tempo',
    myTimeDescription: 'Planeje pratos de acordo com seu tempo.',
    myTimeEyebrow: 'Planejamento de tempo',
    myTimeSettings: 'Configurações do Meu Tempo',
    myTimeQuestion: 'Por quanto tempo você quer cozinhar?',
    targetTime: 'Tempo alvo',
    hoursShort: 'h',
    minutesShort: 'min',
    myTimeMargin: 'Margem',
    myTimePlayerLevelLabel: 'Nível:',
    myTimeTargetLabel: 'Tempo:',
    myTimeMarginLabel: 'Margem:',
    myTimeBestMatches: 'Melhores resultados',
    myTimeBestMatchesNote: 'Melhores pratos dentro do tempo escolhido.',
    myTimeAllMatches: 'Todos os pratos encontrados',
    myTimeAllMatchesNote: 'Todos os pratos disponíveis nesse intervalo, ordenados por nível.',
    myTimeWindowLabel: 'Mostrando pratos de {0} até {1}.',
    myTimeNoWindow: 'Defina um tempo alvo acima de 0.',
    clearCookTime: 'Limpar tempo',
    clearMargin: 'Limpar margem',
    playerLevelShort: 'Nível do jogador',
    targetShort: 'Alvo',
    marginShort: 'Margem',
    noTimeMatches: 'Nenhum prato combina com esse intervalo. Tente aumentar a margem.',
    myProfileTitle: 'Meu Perfil',
    myProfileDescription: 'Salve o nome do chef, nível e quantidade padrão de fogões.',
    myMasteriesTitle: 'Minhas Estrelas',
    myMasteriesDescription: 'Registre as estrelas dos pratos e aplique os bônus no MyDex.',
    coopPlannerTitle: 'Planejador de Co-Ops',
    coopPlannerDescription: 'Consulte e planeje sua próxima Co-Op aqui.',
    coopPlannerEyebrow: 'Cozinha em equipe',
    coopListTitle: 'Co-Op planner',
    coopListNote: 'Consulte e planeje sua próxima Co-Op aqui!',
    coopSearch: 'Procurar Co-Op',
    coopSearchPlaceholder: 'Procurar Co-Op...',
    coopNumber: 'Co-Op',
    maxMembers: 'Máx. membros',
    baseRewards: 'Recompensas base',
    maxRewardsYourLevel: 'Recompensas máximas (seu nível)',
    rewardDetails: 'Detalhes da recompensa',
    cashReward: 'Cafédólares',
    goldReward: 'Ouro',
    goldDeadline: 'Prazo para Ouro',
    silverDeadline: 'Prazo para Prata',
    bronzeDeadline: 'Prazo para Bronze',
    planCoop: 'Planejar!',
    selectedCoopPlanTitle: 'Plano de Co-Op selecionado',
    noCoopSelected: 'Escolha uma Co-Op e clique em Planejar!',
    noCoopsAvailable: 'Nenhuma Co-Op disponível.',
    coopShortDescription: 'Descrição',
    coopRequirements: 'Pratos necessários',
    minimumDishLevel: 'Nível mínimo dos pratos',
    totalStoveHours: 'Horas de fogão totais',
    rewardEstimateAtYourLevel: 'Estimativa de XP no seu nível',
    coopTeamTitle: 'Equipe de Co-Op',
    coopTeamNote: 'Registre até cinco chefs e salve até dez equipes.',
    loadTeam: 'Carregar equipe',
    teamName: 'Nome da equipe',
    newTeam: 'Nova equipe',
    saveTeam: 'Salvar equipe',
    deleteTeam: 'Apagar equipe',
    useProfileForChef1: 'Usar Meu Perfil no Chef 1',
    chef: 'Chef',
    chefFallback: 'Chef',
    teamSaved: 'Equipe salva localmente.',
    teamDeleted: 'Equipe apagada.',
    teamLimitReached: 'Você pode salvar até 10 equipes.',
    confirmDeleteTeam: 'Apagar esta equipe salva?',
    selectedTeam: 'Equipe selecionada',
    teamRewardsGold: 'Recompensas da equipe com Ouro',
    noTeamMembers: 'Adicione pelo menos um chef nesta equipe.',
    assignmentComingSoon: 'A distribuição dos pratos vem na próxima fase.',
    assignmentPlanTitle: 'Distribuição dos pratos',
    workload: 'Carga',
    workloadMinimum: 'Mínima',
    workloadLow: 'Baixa',
    workloadEqual: 'Igual',
    workloadHigh: 'Alta',
    workloadVeryHigh: 'Muito alta',
    workloadManual: 'Manual',
    manualDishes: 'Pratos manuais',
    manualDishesShort: 'pratos',
    editManualDishes: 'Editar pratos',
    manualAssignmentTitle: 'Distribuição manual',
    manualAssignmentNote: 'Escolha exatamente quais pratos necessários este chef deve cozinhar. O planejador distribui o restante depois disso.',
    manualAssignmentSaved: 'Distribuição manual salva.',
    manualAssignmentSummaryEmpty: 'Nenhum prato manual definido',
    manualAssignmentUnavailable: 'Escolha uma Co-Op primeiro para editar os pratos manuais.',
    cannotCookDish: 'Não pode cozinhar',
    useMyMasteriesForChef1: 'Usar minhas estrelas douradas no Chef 1',
    goldMasteries: 'Estrelas douradas',
    editGoldMasteries: 'Editar estrelas douradas',
    goldMasteriesNote: 'Aqui só a estrela de Ouro importa, porque ela reduz o tempo de preparo.',
    searchDishes: 'Procurar pratos',
    noGoldMasteriesSelected: 'Nenhuma estrela dourada selecionada ainda.',
    myMasteriesActive: 'Usando Minhas Estrelas no Chef 1',
    manualCountWarning: 'Uma ou mais cargas manuais não puderam ser preenchidas completamente.',
    estimatedWithTeam: 'Estimado com esta equipe',
    predictedStatus: 'Status previsto',
    assignedDishes: 'Pratos atribuídos',
    noAssignedDishes: 'Nenhum prato atribuído',
    noEligibleChef: 'Nenhum chef elegível pode cozinhar um ou mais pratos necessários.',
    impossibleMissingUnlock: 'Impossível: falta desbloquear prato',
    notDoable: 'Não viável',
    predictedRewards: 'Recompensas no status previsto',
    noRewardNoContribution: 'Sem recompensa sem contribuição',
    contributionWarning: 'Cada chef precisa cozinhar pelo menos um prato necessário para receber recompensas.',
    unassignedDishes: 'Pratos não atribuídos',
    chefCookTime: 'Tempo de preparo',
    bronze: 'Bronze',
    silver: 'Prata',
    gold: 'Ouro',
    copyAssignment: 'Copiar distribuição',
    assignmentCopied: 'Distribuição copiada!',
    assignmentCopyFailed: 'Não foi possível copiar a distribuição.',
    backButton: '← Voltar',
    personalRecommendations: 'Recomendações pessoais',
    myDexSettings: 'Configurações do MyDex',
    playerLevel: 'Nível do jogador',
    xpNeeded: 'XP necessário',
    availableStoves: 'Fogões disponíveis',
    holidayMode: 'Incluir comidas de feriado?',
    showIngredients: 'Mostrar ingredientes?',
    ingredientDetails: 'Ingredientes',
    ingredientCost: 'Custo dos ingredientes',
    exclude: 'Excluir',
    include: 'Incluir',
    auto: 'Auto',
    myDexHint: 'Insira seus dados para recomendações personalizadas.',
    bestSummaryTitle: 'Resumo dos Melhores Pratos',
    bestSummaryXpMin: 'Melhor XP/min',
    bestSummaryRawXp: 'Melhor XP bruto',
    bestSummaryProfitMin: 'Melhor lucro/min',
    bestSummaryRawProfit: 'Melhor lucro bruto',
    bestSummaryPortionMin: 'Melhor porção/min',
    bestSummaryRawPortion: 'Melhor porção bruta',
    recommendedMasteriesTitle: 'Estrelas Recomendadas',
    recommendedMasteriesNote: 'Melhores estrelas para buscar com base no Resumo dos Melhores Pratos.',
    useRegisteredMasteries: 'Use minhas estrelas registradas',
    currentMastery: 'Estrelas atuais',
    recommendedStar: 'Estrela recomendada',
    benefit: 'Benefício',
    requirement: 'Requisito',
    noRecommendedMasteries: 'Nenhuma recomendação de estrela disponível para este nível/configuração.',
    alreadyMasteredBest: 'Você já dominou o melhor prato para isso! Boa!',
    dishesRequired: 'pratos necessários',
    masteryTotalForGold: 'Total: {0} pratos necessários para Ouro',
    bestXpTitle: 'Melhores pratos (XP)',
    bestProfitTitle: 'Melhores pratos (Lucro)',
    bestPortionsTitle: 'Melhores pratos (Porções)',
    image: 'Imagem',
    recommendation: 'Recomendação',
    dish: 'Prato',
    level: 'Nível',
    duration: 'Duração',
    category: 'Categoria',
    profit: 'Lucro',
    profitMin: 'Lucro/min',
    portions: 'Porções',
    portionsMin: 'Porções/min',
    xpPlansTitle: 'Planos de XP necessário',
    xpPlansNote: 'Melhores planos para subir de nível com base nas suas necessidades e disponibilidade.',
    plan: 'Plano',
    xpEach: 'XP por prato',
    dishesNeeded: 'Pratos necessários',
    batches: 'Rodadas',
    totalCookTime: 'Tempo total',
    stoves: 'Fogões',
    actions: 'Ações',
    clearChef: 'Limpar chef',
    resetWorkloads: 'Resetar cargas',
    note: 'Nota',
    specialDishes: 'Pratos especiais',
    specialDishesNote: 'Pratos especiais são exibidos separadamente.',
    holidayDishes: 'Pratos de feriado',
    holidayDishesNote: 'Pratos de feriado são exibidos separadamente. O modo Auto usa as épocas de Natal e Páscoa.',
    completeDishList: 'Lista completa de pratos',
    sortFullDishDex: 'Ordenar DishDex completo',
    sortBy: 'Ordenar por',
    availableDishDex: 'DishDex disponível',
    availableDishDexNote: 'Lista completa de pratos com XP, lucro, porções, tempo, categoria e requisitos.',
    cost: 'Custo',
    revenue: 'Receita',
    requirements: 'Requisitos',
    type: 'Tipo',
    loadingXml: 'Carregando XML do Café...',
    dataLoaded: 'Dados do Café carregados!',
    couldNotLoadData: 'Não foi possível carregar os dados do Café.',
    dishesReady: 'pratos prontos',
    noXpRecommendations: 'Nenhuma recomendação de XP disponível para este nível/configuração.',
    noProfitRecommendations: 'Nenhuma recomendação de lucro disponível para este nível/configuração.',
    noPortionRecommendations: 'Nenhuma recomendação de porções disponível para este nível/configuração.',
    noDishesAvailable: 'Nenhum prato disponível.',
    noAvailableDish: 'Nenhum prato disponível',
    setXpAboveZero: 'Defina o XP necessário acima de 0.',
    noDishMatchesPlan: 'Nenhum prato combina com este plano.',
    special: 'Especial',
    holiday: 'Feriado',
    regular: 'Normal',
    fullTagSpecial: 'Especial',
    fullTagChristmas: 'Natal',
    fullTagEaster: 'Páscoa',
    holidayActive: 'Feriado: ativo',
    holidayInactive: 'Feriado: inativo',
    profitLower: 'lucro',
    bestActive: 'Melhor ativo',
    bestFast: 'Melhor rápido',
    bestShort: 'Melhor curto',
    bestMedium: 'Melhor médio',
    bestLong: 'Melhor longo',
    bestVeryLong: 'Melhor muito longo',
    bestDayOff: 'Melhor folga',
    activeWord: 'ativo',
    fastWord: 'rápido',
    shortWord: 'curto',
    mediumWord: 'médio',
    longWord: 'longo',
    veryLongWord: 'muito longo',
    dayOffWord: 'de folga',
    metricXpMin: 'XP/min',
    metricProfitMin: 'lucro/min',
    metricPortionMin: 'porção/min',
    activePlan: 'Ativo',
    fastPlan: 'Rápido',
    shortPlan: 'Curto',
    mediumPlan: 'Médio',
    longPlan: 'Longo',
    veryLongPlan: 'Muito longo',
    dayOffPlan: 'Dia de folga',
    activeNote: 'Melhor XP/min para 10 minutos ou menos.',
    fastNote: 'Melhor XP/min entre 11 minutos e 1 hora.',
    shortNote: 'Melhor XP/min entre 1 h 1 min e 3 h.',
    mediumNote: 'Melhor XP/min entre 3 h 1 min e 6 h.',
    longNote: 'Melhor XP/min entre 6 h 1 min e 12 h.',
    veryLongNote: 'Melhor XP/min entre 12 h 1 min e 23 h.',
    dayOffNote: 'Melhor XP/min para 23 h 1 min ou mais.',
    sortStandard: 'Ordem do livro',
    sortLevelAsc: 'Nível: menor para maior',
    sortLevelDesc: 'Nível: maior para menor',
    sortNameAsc: 'Alfabética A-Z',
    sortNameDesc: 'Alfabética Z-A',
    sortCategory: 'Categoria',
    sortDurationAsc: 'Tempo: curto para longo',
    sortDurationDesc: 'Tempo: longo para curto',
    sortProfitAsc: 'Lucro bruto: menor para maior',
    sortProfitDesc: 'Lucro bruto: maior para menor',
    sortXpAsc: 'XP bruto: menor para maior',
    sortXpDesc: 'XP bruto: maior para menor',
    sortProfitPerMinAsc: 'Lucro/min: menor para maior',
    sortProfitPerMinDesc: 'Lucro/min: maior para menor',
    sortXpPerMinAsc: 'XP/min: menor para maior',
    sortXpPerMinDesc: 'XP/min: maior para menor',
    sortServingsAsc: 'Porções: menor para maior',
    sortServingsDesc: 'Porções: maior para menor',
    sortServingsPerMinAsc: 'Porções/min: menor para maior',
    sortServingsPerMinDesc: 'Porções/min: maior para menor',
    profileSettingsTitle: 'Perfil do Chef',
    profileSettingsNote: 'Seu nível ajuda a ferramenta a definir sua quantidade atual de fogões disponíveis. Você pode alterar isso no MyDex depois.',
    chefName: 'Nome do chef',
    profileSaved: 'Perfil salvo localmente.',
    masteriesEyebrow: 'Bônus dos pratos',
    loadData: 'Carregar dados',
    downloadData: 'Baixar dados',
    deleteData: 'Apagar dados',
    searchDish: 'Procurar prato',
    searchDishPlaceholder: 'Procurar prato...',
    mastery: 'Estrelas',
    effects: 'Efeitos',
    bronze: 'Bronze',
    silver: 'Prata',
    gold: 'Ouro',
    portionsLower: 'porções',
    xpUpper: 'XP',
    confirmDelete: 'Tem certeza? Isso apagará seu perfil, suas estrelas e suas equipes de Co-Op salvas.',
    dataDeleted: 'Perfil, estrelas e equipes de Co-Op salvos foram apagados.',
    dataLoadedMessage: 'Dados carregados com sucesso.',
    dataLoadError: 'Não foi possível carregar este arquivo de dados.',
    dataDownloaded: 'Arquivo de dados baixado.',
    noMasteryRows: 'Nenhum prato combina com esta busca.',
    masteryView: 'Visualização',
    masteryListVertical: 'Lista (leitura vertical)',
    masteryListHorizontal: 'Lista (leitura horizontal)',
    masteryCookbook: 'Livro de receitas',
    previousPage: '← Anterior',
    nextPage: 'Próxima →',
    masteryBookPage: 'Página'
  }
};

const SORT_OPTIONS = [
  ['standard', 'sortStandard'],
  ['level-asc', 'sortLevelAsc'],
  ['level-desc', 'sortLevelDesc'],
  ['name-asc', 'sortNameAsc'],
  ['name-desc', 'sortNameDesc'],
  ['category', 'sortCategory'],
  ['duration-asc', 'sortDurationAsc'],
  ['duration-desc', 'sortDurationDesc'],
  ['profit-asc', 'sortProfitAsc'],
  ['profit-desc', 'sortProfitDesc'],
  ['xp-asc', 'sortXpAsc'],
  ['xp-desc', 'sortXpDesc'],
  ['profitPerMin-asc', 'sortProfitPerMinAsc'],
  ['profitPerMin-desc', 'sortProfitPerMinDesc'],
  ['xpPerMin-asc', 'sortXpPerMinAsc'],
  ['xpPerMin-desc', 'sortXpPerMinDesc'],
  ['servings-asc', 'sortServingsAsc'],
  ['servings-desc', 'sortServingsDesc'],
  ['servingsPerMin-asc', 'sortServingsPerMinAsc'],
  ['servingsPerMin-desc', 'sortServingsPerMinDesc']
];

let allDishRecords = [];
let allCoopRecords = [];
let levelLimitsByLevel = new Map();
let currentLanguage = 'en';
let uiTranslations = {};
let userData = loadUserData();
let masteryCookbookPage = 0;

document.addEventListener('DOMContentLoaded', main);

async function main() {
  try {
    setupTimeBackground();
    setupTheme();
    setupLanguage();
    await loadDishDexUiLanguage(currentLanguage);
    setupNavigation();
    setupDataActions();
    applyUiLanguage();

    setStatus(t('loadingXml'), 'ok');

    levelLimitsByLevel = await loadLevelLimits();
    ensureUserDefaults();
    ensureCoopTeamDefaults();
    syncProfileInputs();
    syncMyDexInputs();
    syncMyTimeInputs();
    renderCoopTeamEditor();

    allDishRecords = await loadDishRecords(getCafeLanguageCode(currentLanguage));
    allCoopRecords = await loadCoopRecords(getCafeLanguageCode(currentLanguage));

    setStatus(t('dataLoaded'), 'ok');
    updateDataSummary();

    bindInputs();
    renderMyDex();
    renderFullDishDex();
    renderMyTime();
    renderCoopPlanner();
    restoreLastCoopPlanPreview();
    renderMasteries();
    if (!window.location.hash) {
      history.replaceState(null, '', '#home');
    }
    handleHashNavigation();
  } catch (error) {
    console.error(error);
    setStatus(t('couldNotLoadData'), 'bad');
    document.getElementById('dataSummary').textContent = String(error.message || error);
  }
}


function setupTimeBackground() {
  applyTimeBackground();

  // Re-check once per minute so the background can change while the page is open.
  window.setInterval(applyTimeBackground, 60 * 1000);
}

function applyTimeBackground() {
  const now = new Date();
  const minutes = now.getHours() * 60 + now.getMinutes();

  let backgroundClass = 'bg-night';

  // Morning: 4:00 AM to 9:00 AM
  if (minutes >= 4 * 60 && minutes <= 9 * 60) {
    backgroundClass = 'bg-morning';
  }

  // Day: 9:01 AM to 4:45 PM
  else if (minutes >= 9 * 60 + 1 && minutes <= 16 * 60 + 45) {
    backgroundClass = 'bg-day';
  }

  // Sunset: 4:46 PM to 6:30 PM
  else if (minutes >= 16 * 60 + 46 && minutes <= 18 * 60 + 30) {
    backgroundClass = 'bg-sunset';
  }

  // Night: 6:31 PM to 3:59 AM
  else {
    backgroundClass = 'bg-night';
  }

  document.body.classList.remove(
    'bg-morning',
    'bg-day',
    'bg-sunset',
    'bg-night'
  );

  document.body.classList.add(backgroundClass);
}

function setupTheme() {
  const toggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('dishDexTheme');
  const shouldUseDark = savedTheme === null ? true : savedTheme === 'dark';

  document.body.classList.toggle('dark-theme', shouldUseDark);
  toggle.checked = shouldUseDark;

  toggle.addEventListener('change', () => {
    const isDark = toggle.checked;
    document.body.classList.toggle('dark-theme', isDark);
    localStorage.setItem('dishDexTheme', isDark ? 'dark' : 'light');
  });
}

function setupLanguage() {
  const select = document.getElementById('languageSelect');
  const savedLanguage = localStorage.getItem('dishDexLanguage');

  currentLanguage = normalizeUiLanguage(savedLanguage || detectBrowserLanguage());
  select.value = currentLanguage;
  document.documentElement.lang = getHtmlLanguageCode(currentLanguage);

  select.addEventListener('change', async () => {
    currentLanguage = normalizeUiLanguage(select.value);
    localStorage.setItem('dishDexLanguage', currentLanguage);
    document.documentElement.lang = getHtmlLanguageCode(currentLanguage);
    await loadDishDexUiLanguage(currentLanguage);
    applyUiLanguage();
    syncSearchPlaceholder();

    try {
      setStatus(t('loadingXml'), 'ok');
      document.getElementById('dataSummary').textContent = '';
      allDishRecords = await loadDishRecords(getCafeLanguageCode(currentLanguage));
      allCoopRecords = await loadCoopRecords(getCafeLanguageCode(currentLanguage));
      setStatus(t('dataLoaded'), 'ok');
      updateDataSummary();
      syncProfileInputs();
      syncMyDexInputs(false);
      syncMyTimeInputs(false);
      renderCoopTeamEditor();
      renderMyDex();
      renderFullDishDex();
      renderMyTime();
      renderCoopPlanner();
      restoreLastCoopPlanPreview();
      renderMasteries();
    } catch (error) {
      console.error(error);
      setStatus(t('couldNotLoadData'), 'bad');
      document.getElementById('dataSummary').textContent = String(error.message || error);
    }
  });
}

function detectBrowserLanguage() {
  const language = String(navigator.language || navigator.userLanguage || '').replace('-', '_');
  const lower = language.toLowerCase();
  if (lower.startsWith('zh_cn') || lower === 'zh') return 'zh_CN';
  if (lower.startsWith('zh_tw') || lower.startsWith('zh_hk')) return 'zh_TW';
  const shortCode = lower.slice(0, 2);
  const matched = SUPPORTED_LANGUAGE_CODES.find(code => code.toLowerCase() === shortCode);
  return matched || 'en';
}

function normalizeUiLanguage(languageCode) {
  const code = String(languageCode || 'en');
  if (SUPPORTED_LANGUAGE_CODES.includes(code)) return code;
  const normalized = code.replace('-', '_');
  if (SUPPORTED_LANGUAGE_CODES.includes(normalized)) return normalized;
  const shortCode = normalized.toLowerCase().slice(0, 2);
  return SUPPORTED_LANGUAGE_CODES.find(candidate => candidate.toLowerCase() === shortCode) || 'en';
}

function getCafeLanguageCode(languageCode = currentLanguage) {
  const normalizedLanguage = normalizeUiLanguage(languageCode);
  return CAFE_LANGUAGE_CODES.has(normalizedLanguage) ? normalizedLanguage : 'en';
}

function getHtmlLanguageCode(languageCode = currentLanguage) {
  const normalizedLanguage = normalizeUiLanguage(languageCode);
  if (normalizedLanguage === 'pt') return 'pt-BR';
  if (normalizedLanguage === 'zh_CN') return 'zh-CN';
  if (normalizedLanguage === 'zh_TW') return 'zh-TW';
  return normalizedLanguage.replace('_', '-');
}

const SCREEN_HASHES = {
  welcomeScreen: 'home',
  myDexScreen: 'mydex',
  fullDishDexScreen: 'fulldishdex',
  myTimeScreen: 'mytime',
  coopPlannerScreen: 'coopplanner',
  profileScreen: 'profile',
  masteriesScreen: 'masteries'
};

const HASH_SCREENS = Object.fromEntries(
  Object.entries(SCREEN_HASHES).map(([screenId, hash]) => [hash, screenId])
);

function setupNavigation() {
  document.getElementById('openMyDex').addEventListener('click', () => {
    navigateToScreen('myDexScreen');
  });

  document.getElementById('openFullDishDex').addEventListener('click', () => {
    navigateToScreen('fullDishDexScreen');
  });

  document.getElementById('openMyTime').addEventListener('click', () => {
    navigateToScreen('myTimeScreen');
  });

  document.getElementById('openCoopPlanner').addEventListener('click', () => {
    navigateToScreen('coopPlannerScreen');
  });

  document.getElementById('openProfile').addEventListener('click', () => {
    navigateToScreen('profileScreen');
  });

  document.getElementById('openMasteries').addEventListener('click', () => {
    navigateToScreen('masteriesScreen');
  });

  document.querySelectorAll('[data-back]').forEach(button => {
    button.addEventListener('click', () => navigateToScreen('welcomeScreen'));
  });

  window.addEventListener('hashchange', handleHashNavigation);
  document.getElementById('fullSortSelect').addEventListener('change', renderFullDishDex);

  const fullUseMasteriesToggle = document.getElementById('fullUseMasteriesToggle');
  if (fullUseMasteriesToggle) {
    fullUseMasteriesToggle.checked = getFullUseMasteriesSetting();
    fullUseMasteriesToggle.addEventListener('change', () => {
      localStorage.setItem(FULL_USE_MASTERIES_STORAGE_KEY, fullUseMasteriesToggle.checked ? 'true' : 'false');
      renderFullDishDex();
    });
  }
}

function getFullUseMasteriesSetting() {
  const saved = localStorage.getItem(FULL_USE_MASTERIES_STORAGE_KEY);
  return saved === null ? true : saved === 'true';
}

function navigateToScreen(screenId) {
  const hash = SCREEN_HASHES[screenId] || 'home';
  if (window.location.hash === `#${hash}`) {
    showScreen(screenId);
    return;
  }
  window.location.hash = hash;
}

function handleHashNavigation() {
  const rawHash = String(window.location.hash || '#home').replace(/^#/, '') || 'home';
  const screenId = HASH_SCREENS[rawHash] || 'welcomeScreen';
  showScreen(screenId);
}

function setupDataActions() {
  const dataFileInput = document.getElementById('dataFileInput');
  ['loadDataButton', 'profileLoadDataButton'].forEach(id => {
    const button = document.getElementById(id);
    if (button) button.addEventListener('click', () => dataFileInput?.click());
  });

  if (dataFileInput) {
    dataFileInput.addEventListener('change', event => {
      const file = event.target.files && event.target.files[0];
      if (file) importUserData(file);
      event.target.value = '';
    });
  }

  ['downloadDataButton', 'profileDownloadDataButton'].forEach(id => {
    const button = document.getElementById(id);
    if (button) button.addEventListener('click', exportUserData);
  });

  ['deleteDataButton', 'profileDeleteDataButton'].forEach(id => {
    const button = document.getElementById(id);
    if (button) button.addEventListener('click', deleteUserData);
  });

  const coopSearch = document.getElementById('coopSearch');
  if (coopSearch) coopSearch.addEventListener('input', renderCoopPlanner);

  const coopListBody = document.getElementById('coopListBody');
  if (coopListBody) {
    coopListBody.addEventListener('click', event => {
      const button = event.target.closest('[data-coop-number]');
      if (!button) return;
      const coopNumber = Math.max(0, Math.floor(Number(button.getAttribute('data-coop-number') || 0)));
      userData.selectedCoopNumber = coopNumber;
      saveUserData();
      renderCoopPlanPreview(coopNumber);
    });
  }

  const coopPlanPreview = document.getElementById('coopPlanPreview');
  if (coopPlanPreview) {
    coopPlanPreview.addEventListener('change', event => {
      const select = event.target.closest('[data-plan-workload]');
      if (select) {
        updateCoopMemberWorkload(select);
        return;
      }

    });

    coopPlanPreview.addEventListener('input', event => {
    });

    coopPlanPreview.addEventListener('click', event => {
      const manualButton = event.target.closest('[data-open-manual-assignment]');
      if (manualButton) {
        openManualAssignmentEditor(Number(manualButton.getAttribute('data-member-slot')));
        return;
      }

      const resetButton = event.target.closest('[data-reset-workloads]');
      if (resetButton) {
        resetCoopWorkloads();
        return;
      }

      const button = event.target.closest('[data-copy-assignment]');
      if (!button) return;
      copyCurrentCoopAssignment(button);
    });
  }

  bindCoopTeamControls();

  document.getElementById('masterySearch').addEventListener('input', () => {
    masteryCookbookPage = 0;
    renderMasteries();
  });

  const masteryViewMode = document.getElementById('masteryViewMode');
  if (masteryViewMode) {
    masteryViewMode.value = localStorage.getItem(MASTERY_VIEW_STORAGE_KEY) || 'vertical';
    masteryViewMode.addEventListener('change', () => {
      masteryCookbookPage = 0;
      localStorage.setItem(MASTERY_VIEW_STORAGE_KEY, masteryViewMode.value);
      renderMasteries();
    });
  }

  const prevButton = document.getElementById('masteryBookPrev');
  const nextButton = document.getElementById('masteryBookNext');
  if (prevButton) {
    prevButton.addEventListener('click', () => {
      masteryCookbookPage = Math.max(0, masteryCookbookPage - 1);
      renderMasteries();
    });
  }
  if (nextButton) {
    nextButton.addEventListener('click', () => {
      masteryCookbookPage += 1;
      renderMasteries();
    });
  }

  const handleMasteryClick = event => {
    const button = event.target.closest('[data-mastery-level]');
    if (!button) return;

    const dishId = String(button.getAttribute('data-dish-id'));
    const clickedLevel = Number(button.getAttribute('data-mastery-level'));
    const currentLevel = getMasteryLevel(dishId);
    const nextLevel = currentLevel === clickedLevel ? clickedLevel - 1 : clickedLevel;

    setMasteryLevel(dishId, nextLevel);
  };

  document.getElementById('masteriesBody').addEventListener('click', handleMasteryClick);
  document.getElementById('masteriesCookbook').addEventListener('click', handleMasteryClick);
}


async function loadDishDexUiLanguage(languageCode = currentLanguage) {
  const normalizedLanguage = normalizeUiLanguage(languageCode);
  const paths = PATHS.uiLanguageFiles?.[normalizedLanguage] || PATHS.uiLanguageFiles.en;

  try {
    const text = await fetchFirstWorkingText(paths);
    const xml = parseNormalOrLooseXml(text, `DishDex ${normalizedLanguage} language XML`);
    const translations = {};
    Array.from(xml.getElementsByTagName('text')).forEach(node => {
      const id = getAttr(node, 'id');
      const name = getAttr(node, 'name');
      if (id) translations[id] = name;
    });
    uiTranslations[normalizedLanguage] = translations;
  } catch (error) {
    console.warn(`Could not load DishDex UI language file for ${normalizedLanguage}. Using embedded fallback.`, error);
    uiTranslations[normalizedLanguage] = I18N[normalizedLanguage] || I18N.en || {};
  }
}

function applyUiLanguage() {
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    element.textContent = t(key);
  });
  populateSortSelect();
  syncSearchPlaceholder();
}

function syncSearchPlaceholder() {
  const search = document.getElementById('masterySearch');
  if (search) search.placeholder = t('searchDishPlaceholder');
  const coopSearch = document.getElementById('coopSearch');
  if (coopSearch) coopSearch.placeholder = t('coopSearchPlaceholder');
}

function populateSortSelect() {
  const select = document.getElementById('fullSortSelect');
  if (!select) return;

  const previousValue = select.value || 'standard';
  select.innerHTML = SORT_OPTIONS.map(([value, labelKey]) => {
    return `<option value="${escapeHtml(value)}">${escapeHtml(t(labelKey))}</option>`;
  }).join('');

  select.value = SORT_OPTIONS.some(option => option[0] === previousValue) ? previousValue : 'standard';
}

function t(key) {
  return uiTranslations[currentLanguage]?.[key]
    || I18N[currentLanguage]?.[key]
    || uiTranslations.en?.[key]
    || I18N.en[key]
    || key;
}

function updateDataSummary() {
  document.getElementById('dataSummary').textContent = `${allDishRecords.length} ${t('dishesReady')} · ${allCoopRecords.length} Co-Ops`;
}

function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(screen => screen.classList.add('hidden'));
  document.getElementById(screenId).classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function getTimeBuckets() {
  return [
    { key: 'active', recommendationLabel: t('bestActive'), positionLabel: t('activeWord'), planLabel: t('activePlan'), note: t('activeNote'), matches: record => record.duration <= 10 },
    { key: 'fast', recommendationLabel: t('bestFast'), positionLabel: t('fastWord'), planLabel: t('fastPlan'), note: t('fastNote'), matches: record => record.duration >= 11 && record.duration <= 60 },
    { key: 'short', recommendationLabel: t('bestShort'), positionLabel: t('shortWord'), planLabel: t('shortPlan'), note: t('shortNote'), matches: record => record.duration >= 61 && record.duration <= 180 },
    { key: 'medium', recommendationLabel: t('bestMedium'), positionLabel: t('mediumWord'), planLabel: t('mediumPlan'), note: t('mediumNote'), matches: record => record.duration >= 181 && record.duration <= 360 },
    { key: 'long', recommendationLabel: t('bestLong'), positionLabel: t('longWord'), planLabel: t('longPlan'), note: t('longNote'), matches: record => record.duration >= 361 && record.duration <= 720 },
    { key: 'veryLong', recommendationLabel: t('bestVeryLong'), positionLabel: t('veryLongWord'), planLabel: t('veryLongPlan'), note: t('veryLongNote'), matches: record => record.duration >= 721 && record.duration <= 1380 },
    { key: 'dayOff', recommendationLabel: t('bestDayOff'), positionLabel: t('dayOffWord'), planLabel: t('dayOffPlan'), note: t('dayOffNote'), matches: record => record.duration >= 1381 }
  ];
}

async function loadLevelLimits() {
  try {
    const text = await fetchFirstWorkingText(PATHS.levelLimits);
    const xml = parseNormalOrLooseXml(text, 'CafeLevelXp.xml');
    const map = new Map();

    Array.from(xml.getElementsByTagName('limit')).forEach(node => {
      const level = Number(getAttr(node, 'l'));
      const stoves = Number(getAttr(node, 's'));
      if (Number.isFinite(level) && Number.isFinite(stoves)) {
        map.set(level, { stoves });
      }
    });

    return map;
  } catch (error) {
    console.warn('Could not load CafeLevelXp.xml:', error);
    return new Map();
  }
}

async function loadDishRecords(languageCode) {
  const cafeItemsText = await fetchText(PATHS.cafeItems);
  const cafeItemsXml = parseLooseXml(cafeItemsText, 'CafeItems.xml');
  const languageResult = await fetchFirstWorkingLanguageFile(PATHS.languageFiles[languageCode]);
  const cafeLanguageXml = parseNormalOrLooseXml(languageResult.text, 'Cafe language XML');

  const wodNodes = Array.from(cafeItemsXml.getElementsByTagName('wod'));
  const dishNodes = wodNodes.filter(node => getAttr(node, 'g') === 'Dish');
  const ingredientNodes = wodNodes.filter(node => getAttr(node, 'g') === 'Ingredient');
  const textNodes = Array.from(cafeLanguageXml.getElementsByTagName('text'));

  const recipeNameByDishKey = buildRecipeNameMap(textNodes);
  const ingredientNameByKey = buildIngredientNameMap(textNodes);
  const costById = {};
  const ingredientNameById = {};

  ingredientNodes.forEach(node => {
    const id = getAttr(node, 'id');
    const ingredientKey = getAttr(node, 't');
    if (!id) return;
    costById[id] = Number(getAttr(node, 'cash') || 0);
    ingredientNameById[id] = ingredientNameByKey[ingredientKey.toLowerCase()] || prettyName(ingredientKey);
  });

  const records = dishNodes.map((node, sourceIndex) => {
    const dishId = getAttr(node, 'id');
    const dishKey = getAttr(node, 't');
    const level = Number(getAttr(node, 'level') || 0);
    const xp = Number(getAttr(node, 'xp') || 0);
    const duration = Number(getAttr(node, 'duration') || 0);
    const servings = Number(getAttr(node, 'servings') || 0);
    const incomePerServing = Number(getAttr(node, 'incomePerServing') || 0);
    const categoryId = getAttr(node, 'dishcategory');
    const requirements = getAttr(node, 'requirements');
    const ingredientCost = calculateRequirementCost(requirements, costById);
    const revenue = incomePerServing * servings;
    const profit = revenue - ingredientCost;

    return {
      dishId,
      dishKey,
      sourceIndex,
      dishName: recipeNameByDishKey[dishKey.toLowerCase()] || prettyName(dishKey),
      level,
      xp,
      xpPerMin: duration > 0 ? xp / duration : 0,
      duration,
      durationText: formatDuration(duration),
      servings,
      servingsPerMin: duration > 0 ? servings / duration : 0,
      incomePerServing,
      ingredientCost,
      revenue,
      profit,
      profitPerMin: duration > 0 ? profit / duration : 0,
      categoryId,
      categoryName: getCategoryName(categoryId),
      requirements: formatRequirements(requirements, ingredientNameById),
      dishType: getDishType(dishKey),
      imageUrl: PATHS.imageBase + dishKey + '.png'
    };
  });

  records.forEach(record => {
    const holidayOffset = record.dishType === 'Holiday' ? 100000 : 0;
    record.cookbookSortIndex = holidayOffset + Number(record.sourceIndex || 0);
  });

  records.sort(standardDishSort);
  return records;
}

async function loadCoopRecords(languageCode) {
  const cafeItemsText = await fetchText(PATHS.cafeItems);
  const cafeItemsXml = parseLooseXml(cafeItemsText, 'CafeItems.xml');
  const languageResult = await fetchFirstWorkingLanguageFile(PATHS.languageFiles[languageCode]);
  const cafeLanguageXml = parseNormalOrLooseXml(languageResult.text, 'Cafe language XML');
  const textNodes = Array.from(cafeLanguageXml.getElementsByTagName('text'));
  const coopTextByNumber = buildCoopTextMap(textNodes);
  const dishById = new Map(allDishRecords.map(record => [String(record.dishId), record]));

  return Array.from(cafeItemsXml.getElementsByTagName('wod'))
    .filter(node => getAttr(node, 'g') === 'Coop')
    .map((node, sourceIndex) => {
      const wodId = getAttr(node, 'id');
      const coopNumber = Number(getAttr(node, 't') || 0);
      const duration = Number(getAttr(node, 'duration') || 0);
      const requirementText = getAttr(node, 'dishes');
      const requirements = parseCoopRequirements(requirementText, dishById);
      const text = coopTextByNumber[String(coopNumber)] || {};
      const levels = requirements
        .map(req => Number(req.dish?.level || 0))
        .filter(level => Number.isFinite(level) && level > 0);
      const totalStoveMinutes = requirements.reduce((sum, req) => {
        return sum + Number(req.amount || 0) * Number(req.dish?.duration || 0);
      }, 0);

      return {
        wodId,
        coopNumber,
        sourceIndex,
        title: text.title || `Co-Op ${coopNumber}`,
        shortDescription: text.shortDescription || '',
        longDescription: text.longDescription || '',
        maxMembers: Number(getAttr(node, 'maxMember') || 0),
        rewardCash: Number(getAttr(node, 'chips') || 0),
        baseXp: Number(getAttr(node, 'xp') || 0),
        rewardGold: Number(getAttr(node, 'gold') || 0),
        duration,
        durationText: formatDuration(duration),
        goldDeadline: Math.floor(duration * 0.5),
        silverDeadline: Math.floor(duration * 0.75),
        requirements,
        requirementText,
        minDishLevel: levels.length ? Math.min(...levels) : 0,
        totalStoveMinutes,
        iconUrl: `${PATHS.coopIconBase}${coopNumber}.png`
      };
    })
    .filter(coop => coop.coopNumber > 0 && coop.coopNumber !== 29)
    .sort((a, b) => a.coopNumber - b.coopNumber);
}

function getCategoryName(categoryId) {
  return CATEGORY_NAMES[currentLanguage]?.[String(categoryId)] || CATEGORY_NAMES.en[String(categoryId)] || String(categoryId);
}

function bindInputs() {
  ['playerLevel', 'xpNeeded', 'stoveCount', 'holidayMode', 'showIngredientsToggle'].forEach(id => {
    const element = document.getElementById(id);
    element.addEventListener('input', handleMyDexInputChange);
    element.addEventListener('change', handleMyDexInputChange);
  });

  ['myTimePlayerLevel', 'myTimeHours', 'myTimeMinutes', 'myTimeMarginPlusHours', 'myTimeMarginPlusMinutes', 'myTimeMarginMinusHours', 'myTimeMarginMinusMinutes', 'myTimeUseMasteriesToggle'].forEach(id => {
    const element = document.getElementById(id);
    if (!element) return;
    element.addEventListener('input', handleMyTimeInputChange);
    element.addEventListener('change', handleMyTimeInputChange);
  });

  const clearMyTimeTargetButton = document.getElementById('clearMyTimeTarget');
  if (clearMyTimeTargetButton) clearMyTimeTargetButton.addEventListener('click', clearMyTimeTarget);

  const clearMyTimeMarginButton = document.getElementById('clearMyTimeMargin');
  if (clearMyTimeMarginButton) clearMyTimeMarginButton.addEventListener('click', clearMyTimeMargin);

  document.getElementById('profileChefName').addEventListener('input', handleProfileInputChange);
  document.getElementById('profileLevel').addEventListener('input', handleProfileLevelChange);
  document.getElementById('profileStoves').addEventListener('input', handleProfileInputChange);
}

function handleMyDexInputChange() {
  userData.level = clampNumber(Number(document.getElementById('playerLevel').value || 1), 0, 999);
  userData.xpNeeded = Math.max(0, Number(document.getElementById('xpNeeded').value || 0));
  userData.availableStoves = Math.max(1, Number(document.getElementById('stoveCount').value || 1));
  userData.showIngredients = Boolean(document.getElementById('showIngredientsToggle')?.checked);
  userData.myTime = normalizeMyTimeSettings(userData.myTime, userData.level);
  userData.myTime.playerLevel = userData.level;
  saveUserData();
  syncProfileInputs(false);
  syncMyTimeInputs(false);
  renderMyDex();
  renderMyTime();
  renderCoopPlanner();
}

function handleProfileLevelChange() {
  const level = clampNumber(Number(document.getElementById('profileLevel').value || 1), 0, 999);
  userData.level = level;
  userData.availableStoves = getDefaultStovesForLevel(level);
  userData.myTime = normalizeMyTimeSettings(userData.myTime, level);
  userData.myTime.playerLevel = level;
  saveUserData();
  syncProfileInputs(false);
  syncMyDexInputs(false);
  syncMyTimeInputs(false);
  setProfileStatus(t('profileSaved'));
  renderMyDex();
  renderMyTime();
  renderCoopTeamEditor();
  renderCoopPlanner();
}


function handleProfileInputChange() {
  userData.chefName = document.getElementById('profileChefName').value.trim();
  userData.level = clampNumber(Number(document.getElementById('profileLevel').value || 1), 0, 999);
  userData.availableStoves = Math.max(1, Number(document.getElementById('profileStoves').value || 1));
  userData.myTime = normalizeMyTimeSettings(userData.myTime, userData.level);
  userData.myTime.playerLevel = userData.level;
  saveUserData();
  syncMyDexInputs(false);
  syncMyTimeInputs(false);
  setProfileStatus(t('profileSaved'));
  renderMyDex();
  renderMyTime();
  renderCoopTeamEditor();
  renderCoopPlanner();
}


function renderMyDex() {
  if (!allDishRecords.length) return;

  const settings = getSettings();
  const availableDishes = allDishRecords
    .map(applyMasteryToRecord)
    .filter(record => record.level <= settings.playerLevel);

  const regularCandidates = availableDishes.filter(record => {
    if (record.dishType === 'Special') return false;
    if (record.dishType === 'Holiday') return shouldIncludeHolidayDish(record.dishKey, settings.holidayMode);
    return true;
  });

  const specialDishes = availableDishes.filter(record => record.dishType === 'Special');
  const holidayDishes = availableDishes.filter(record => record.dishType === 'Holiday');

  renderBestSummary(regularCandidates);
  renderRecommendedMasteries(regularCandidates);
  renderBestXp(buildBucketRecommendations(regularCandidates, 'metricXpMin', record => record.xpPerMin, 'xp'));
  renderBestProfit(buildBucketRecommendations(regularCandidates, 'metricProfitMin', record => record.profitPerMin, 'profit'));
  renderBestPortions(buildBucketRecommendations(regularCandidates, 'metricPortionMin', record => record.servingsPerMin, 'portions'));
  renderPlans(settings, buildXpPlans(regularCandidates));
  renderDishCards('specialDishesBody', specialDishes, 'Special');
  renderDishCards('holidayDishesBody', holidayDishes, 'Holiday');
}

function renderBestSummary(records) {
  const items = [
    [t('bestSummaryXpMin'), findBestDish(records, record => record.xpPerMin), 'best-xp-1'],
    [t('bestSummaryRawXp'), findBestDish(records, record => record.xp), 'best-xp-3'],
    [t('bestSummaryProfitMin'), findBestDish(records, record => record.profitPerMin), 'best-profit-1'],
    [t('bestSummaryRawProfit'), findBestDish(records, record => record.profit), 'best-profit-3'],
    [t('bestSummaryPortionMin'), findBestDish(records, record => record.servingsPerMin), 'best-portions-1'],
    [t('bestSummaryRawPortion'), findBestDish(records, record => record.servings), 'best-portions-3']
  ];

  const body = document.getElementById('bestSummaryBody');
  const validItems = items.filter(item => item[1]);

  if (validItems.length === 0) {
    body.innerHTML = emptyRow(9, t('noDishesAvailable'));
    return;
  }

  body.innerHTML = validItems.map(([label, record, rowClass]) => summaryRowHtml(label, record, rowClass)).join('');
}


function renderRecommendedMasteries(records) {
  const items = [
    [t('bestSummaryXpMin'), findBestDish(records, record => record.xpPerMin), 3, 'best-xp-1'],
    [t('bestSummaryRawXp'), findBestDish(records, record => record.xp), 2, 'best-xp-3'],
    [t('bestSummaryProfitMin'), findBestDish(records, record => record.profitPerMin), 3, 'best-profit-1'],
    [t('bestSummaryRawProfit'), findBestDish(records, record => record.profit), 1, 'best-profit-3'],
    [t('bestSummaryPortionMin'), findBestDish(records, record => record.servingsPerMin), 3, 'best-portions-1'],
    [t('bestSummaryRawPortion'), findBestDish(records, record => record.servings), 1, 'best-portions-3']
  ];

  const body = document.getElementById('recommendedMasteriesBody');
  if (!body) return;

  const validItems = items.filter(item => item[1]);
  if (validItems.length === 0) {
    body.innerHTML = emptyRow(7, t('noRecommendedMasteries'));
    return;
  }

  body.innerHTML = validItems.map(([label, record, targetLevel, rowClass]) => {
    const currentLevel = getMasteryLevel(record.dishId);
    const requirement = getMasteryCountByLevel(record.dishId, getBaseDuration(record), targetLevel);

    if (currentLevel >= targetLevel) {
      return `
        <tr class="${rowClass}">
          <td>${imageHtml(record)}</td>
          <td>${escapeHtml(label)}</td>
          <td class="dish-name">${escapeHtml(record.dishName)}</td>
          <td>${masteryStarsReadOnlyHtml(record)}</td>
          <td>${escapeHtml(starTitle(targetLevel))}</td>
          <td class="note-cell">${escapeHtml(t('alreadyMasteredBest'))}</td>
          <td>${number(requirement)} ${escapeHtml(t('dishesRequired'))}</td>
        </tr>
      `;
    }

    return `
      <tr class="${rowClass}">
        <td>${imageHtml(record)}</td>
        <td>${escapeHtml(label)}</td>
        <td class="dish-name">${escapeHtml(record.dishName)}</td>
        <td>${masteryStarsReadOnlyHtml(record)}</td>
        <td>${escapeHtml(starTitle(targetLevel))}</td>
        <td class="effects-cell">${recommendedMasteryBenefitHtml(record, targetLevel)}</td>
        <td>${number(requirement)} ${escapeHtml(t('dishesRequired'))}</td>
      </tr>
    `;
  }).join('');
}

function recommendedMasteryBenefitHtml(record, targetLevel) {
  const baseServings = getBaseServings(record);
  const baseXp = getBaseXp(record);
  const baseDuration = getBaseDuration(record);

  if (targetLevel === 1) {
    const bronzeBonus = Math.ceil(baseServings * MASTERY_SERVING_BONUS) - baseServings;
    return `<span class="effect-line effect-bronze">★ ${escapeHtml(t('bronze'))}: +${number(bronzeBonus)} ${escapeHtml(t('portionsLower'))}</span>`;
  }

  if (targetLevel === 2) {
    const silverBonus = Math.ceil(baseXp * MASTERY_XP_BONUS) - baseXp;
    return `<span class="effect-line effect-silver">★ ${escapeHtml(t('silver'))}: +${number(silverBonus)} ${escapeHtml(t('xpUpper'))}</span>`;
  }

  const finalTime = getMasteredDuration(baseDuration, 3);
  const savedTime = Math.max(0, baseDuration - finalTime);
  return `<span class="effect-line effect-gold">★ ${escapeHtml(t('gold'))}: -${escapeHtml(formatDuration(savedTime))}: ${escapeHtml(formatDuration(finalTime))}</span>`;
}


function assetIconHtml(type, className = 'stat-icon') {
  const icons = {
    cash: { src: 'cash.png', alt: t('cashReward') },
    xp: { src: 'xp.png', alt: 'XP' },
    gold: { src: 'gold.png', alt: t('goldReward') }
  };
  const icon = icons[type];
  if (!icon) return '';
  return `<img src="${escapeHtml(icon.src)}" alt="${escapeHtml(icon.alt)}" class="${escapeHtml(className)}" onerror="this.style.display='none'">`;
}

function valueWithIconHtml(type, value) {
  return `<span class="value-with-icon">${number(value)} ${assetIconHtml(type)}</span>`;
}

function decimalWithIconHtml(type, value) {
  return `<span class="value-with-icon">${decimal(value)} ${assetIconHtml(type)}</span>`;
}

function metricStackHtml(type, value, perMin) {
  return `
    <div class="metric-stack">
      <span>${number(value)} ${assetIconHtml(type)}</span>
      <small>${decimal(perMin)} ${assetIconHtml(type, 'stat-icon tiny-stat-icon')}/min</small>
    </div>
  `;
}

function portionMetricStackHtml(value, perMin) {
  return `
    <div class="metric-stack">
      <span>${number(value)}</span>
      <small>${decimal(perMin)}/min</small>
    </div>
  `;
}

function ingredientDetailsRowHtml(record, colspan, rowClass = '') {
  if (!getSettings().showIngredients || !record) return '';
  return `
    <tr class="ingredient-detail-row ${escapeHtml(rowClass)}">
      <td colspan="${number(colspan)}">
        <div class="ingredient-detail-content">
          <strong>${escapeHtml(t('ingredientDetails'))}:</strong>
          <span>${escapeHtml(record.requirements || '—')}</span>
          <span class="ingredient-cost"><strong>${escapeHtml(t('ingredientCost'))}:</strong> ${valueWithIconHtml('cash', record.ingredientCost)}</span>
        </div>
      </td>
    </tr>
  `;
}

function summaryRowHtml(label, record, rowClass) {
  return `
    <tr class="${rowClass}">
      <td>${imageHtml(record)}</td>
      <td>${escapeHtml(label)}</td>
      <td class="dish-name">${escapeHtml(record.dishName)}</td>
      <td>${number(record.level)}</td>
      <td>${metricStackHtml('xp', record.xp, record.xpPerMin)}</td>
      <td>${metricStackHtml('cash', record.profit, record.profitPerMin)}</td>
      <td>${portionMetricStackHtml(record.servings, record.servingsPerMin)}</td>
      <td>${escapeHtml(record.durationText)}</td>
      <td>${escapeHtml(record.categoryName)}</td>
    </tr>
    ${ingredientDetailsRowHtml(record, 9, rowClass)}
  `;
}

function buildBucketRecommendations(records, metricLabelKey, scoreFunction, sectionKey) {
  return getTimeBuckets().map((bucket, index) => {
    return [
      formatRecommendationLabel(bucket, metricLabelKey),
      findBestDish(records, scoreFunction, bucket.matches),
      `best-${sectionKey}-${index + 1}`
    ];
  });
}

function formatRecommendationLabel(bucket, metricLabelKey) {
  if (currentLanguage === 'pt') return `Melhor ${t(metricLabelKey)} ${bucket.positionLabel}`;
  return `${bucket.recommendationLabel} ${t(metricLabelKey)}`;
}

function buildXpPlans(records) {
  return getTimeBuckets().map(bucket => {
    return [bucket.planLabel, findBestDish(records, record => record.xpPerMin, bucket.matches), bucket.note, `row-${bucket.key}`];
  });
}

function getSettings() {
  return {
    playerLevel: clampNumber(Number(document.getElementById('playerLevel').value || 0), 0, 999),
    xpNeeded: Math.max(0, Number(document.getElementById('xpNeeded').value || 0)),
    stoveCount: Math.max(1, Number(document.getElementById('stoveCount').value || 1)),
    holidayMode: document.getElementById('holidayMode').value || 'Auto',
    showIngredients: Boolean(document.getElementById('showIngredientsToggle')?.checked)
  };
}

function renderBestXp(items) {
  const body = document.getElementById('bestXpBody');
  const validItems = items.filter(item => item[1]);
  if (validItems.length === 0) {
    body.innerHTML = emptyRow(7, t('noXpRecommendations'));
    return;
  }
  body.innerHTML = validItems.map(([label, record, rowClass]) => `
    <tr class="${rowClass}">
      <td>${imageHtml(record)}</td>
      <td>${escapeHtml(label)}</td>
      <td class="dish-name">${escapeHtml(record.dishName)}</td>
      <td>${number(record.level)}</td>
      <td>${metricStackHtml('xp', record.xp, record.xpPerMin)}</td>
      <td>${escapeHtml(record.durationText)}</td>
      <td>${escapeHtml(record.categoryName)}</td>
    </tr>
    ${ingredientDetailsRowHtml(record, 7, rowClass)}
  `).join('');
}

function renderBestProfit(items) {
  const body = document.getElementById('bestProfitBody');
  const validItems = items.filter(item => item[1]);
  if (validItems.length === 0) {
    body.innerHTML = emptyRow(7, t('noProfitRecommendations'));
    return;
  }
  body.innerHTML = validItems.map(([label, record, rowClass]) => `
    <tr class="${rowClass}">
      <td>${imageHtml(record)}</td>
      <td>${escapeHtml(label)}</td>
      <td class="dish-name">${escapeHtml(record.dishName)}</td>
      <td>${number(record.level)}</td>
      <td>${metricStackHtml('cash', record.profit, record.profitPerMin)}</td>
      <td>${escapeHtml(record.durationText)}</td>
      <td>${escapeHtml(record.categoryName)}</td>
    </tr>
    ${ingredientDetailsRowHtml(record, 7, rowClass)}
  `).join('');
}

function renderBestPortions(items) {
  const body = document.getElementById('bestPortionsBody');
  const validItems = items.filter(item => item[1]);
  if (validItems.length === 0) {
    body.innerHTML = emptyRow(7, t('noPortionRecommendations'));
    return;
  }
  body.innerHTML = validItems.map(([label, record, rowClass]) => `
    <tr class="${rowClass}">
      <td>${imageHtml(record)}</td>
      <td>${escapeHtml(label)}</td>
      <td class="dish-name">${escapeHtml(record.dishName)}</td>
      <td>${number(record.level)}</td>
      <td>${portionMetricStackHtml(record.servings, record.servingsPerMin)}</td>
      <td>${escapeHtml(record.durationText)}</td>
      <td>${escapeHtml(record.categoryName)}</td>
    </tr>
    ${ingredientDetailsRowHtml(record, 7, rowClass)}
  `).join('');
}

function renderPlans(settings, planItems) {
  const body = document.getElementById('xpPlansBody');
  body.innerHTML = planItems.map(([planName, record, note, rowClass]) => {
    if (!record || settings.xpNeeded <= 0) {
      return `
        <tr class="${rowClass}">
          <td></td>
          <td>${escapeHtml(planName)}</td>
          <td class="dish-name">${t('noAvailableDish')}</td>
          <td></td><td></td><td></td><td></td><td></td>
          <td>${number(settings.stoveCount)}</td>
          <td class="note-cell">${settings.xpNeeded <= 0 ? t('setXpAboveZero') : t('noDishMatchesPlan')}</td>
        </tr>
      `;
    }

    const dishesNeeded = Math.ceil(settings.xpNeeded / record.xp);
    const batchesNeeded = Math.ceil(dishesNeeded / settings.stoveCount);
    const totalCookTime = formatDuration(batchesNeeded * record.duration);

    return `
      <tr class="${rowClass}">
        <td>${imageHtml(record)}</td>
        <td>${escapeHtml(planName)}</td>
        <td class="dish-name">${escapeHtml(record.dishName)}</td>
        <td>${valueWithIconHtml('xp', record.xp)}</td>
        <td>${escapeHtml(record.durationText)}</td>
        <td>${number(dishesNeeded)}</td>
        <td>${number(batchesNeeded)}</td>
        <td>${escapeHtml(totalCookTime)}</td>
        <td>${number(settings.stoveCount)}</td>
        <td class="note-cell">${escapeHtml(note)}</td>
      </tr>
      ${ingredientDetailsRowHtml(record, 10, rowClass)}
    `;
  }).join('');
}

function renderDishCards(containerId, records, fallbackType) {
  const container = document.getElementById(containerId);
  if (records.length === 0) {
    container.innerHTML = `<div class="empty">${escapeHtml(t('noDishesAvailable'))}</div>`;
    return;
  }

  container.innerHTML = records.map(record => {
    let typeLabel = dishTypeLabel(fallbackType);
    if (fallbackType === 'Holiday') {
      typeLabel = isHolidayDishActive(record.dishKey, new Date()) ? t('holidayActive') : t('holidayInactive');
    }
    const ingredientLine = getSettings().showIngredients
      ? `<p class="dish-card-ingredients"><strong>${escapeHtml(t('ingredientDetails'))}:</strong> ${escapeHtml(record.requirements || '—')} · <strong>${escapeHtml(t('ingredientCost'))}:</strong> ${valueWithIconHtml('cash', record.ingredientCost)}</p>`
      : '';
    return `
      <article class="dish-card">
        <div>${imageHtml(record)}</div>
        <div>
          <h3>${escapeHtml(record.dishName)}</h3>
          <p>${escapeHtml(typeLabel)} · ${t('level')} ${number(record.level)} · ${valueWithIconHtml('xp', record.xp)} · ${escapeHtml(record.durationText)}</p>
          <p>${valueWithIconHtml('cash', record.profit)} · ${decimalWithIconHtml('xp', record.xpPerMin)}/min</p>
          ${ingredientLine}
        </div>
      </article>
    `;
  }).join('');
}

function bindCoopTeamControls() {
  const teamSelect = document.getElementById('coopTeamSelect');
  const teamName = document.getElementById('coopTeamName');
  const membersBody = document.getElementById('coopTeamMembersBody');
  const newButton = document.getElementById('newCoopTeamButton');
  const saveButton = document.getElementById('saveCoopTeamButton');
  const deleteButton = document.getElementById('deleteCoopTeamButton');
  const profileButton = document.getElementById('useProfileForLeaderButton');
  const useMyMasteriesToggle = document.getElementById('useMyMasteriesChef1Toggle');
  const goldMasteryEditor = document.getElementById('coopGoldMasteryEditor');
  const manualAssignmentEditor = document.getElementById('coopManualAssignmentEditor');

  if (teamSelect) {
    teamSelect.addEventListener('change', () => {
      userData.selectedCoopTeamId = teamSelect.value;
      saveUserData();
      activeCoopGoldMasteryMemberIndex = null;
      activeCoopManualAssignmentMemberSlot = null;
      renderCoopTeamEditor();
      renderCoopPlanner();
      clearCoopPlanPreview();
    });
  }

  if (teamName) {
    teamName.addEventListener('input', () => {
      const team = getSelectedCoopTeam();
      team.name = teamName.value.trim() || team.name;
      saveUserData();
      renderCoopTeamSelectOnly();
      refreshCurrentCoopPlanPreview();
      setCoopTeamStatus(t('teamSaved'));
    });
  }

  if (membersBody) {
    membersBody.addEventListener('input', event => {
      const input = event.target.closest('[data-team-field]');
      if (!input) return;
      updateSelectedTeamFromMemberInput(input);
      setCoopTeamStatus(t('teamSaved'));
    });

    membersBody.addEventListener('change', event => {
      const input = event.target.closest('[data-team-field]');
      if (!input) return;
      updateSelectedTeamFromMemberInput(input, true);
      setCoopTeamStatus(t('teamSaved'));
    });

    membersBody.addEventListener('click', event => {
      const masteryButton = event.target.closest('[data-edit-member-masteries-index]');
      if (masteryButton) {
        activeCoopGoldMasteryMemberIndex = Number(masteryButton.getAttribute('data-edit-member-masteries-index'));
        coopGoldMasterySearchTerm = '';
        renderCoopGoldMasteryEditor();
        return;
      }

      const button = event.target.closest('[data-clear-member-index]');
      if (!button) return;
      clearCoopTeamMember(Number(button.getAttribute('data-clear-member-index')));
    });
  }

  if (newButton) newButton.addEventListener('click', createNewCoopTeam);
  if (saveButton) saveButton.addEventListener('click', () => {
    saveSelectedTeamFromInputs();
    setCoopTeamStatus(t('teamSaved'));
  });
  if (deleteButton) deleteButton.addEventListener('click', deleteSelectedCoopTeam);
  if (profileButton) profileButton.addEventListener('click', fillTeamLeaderFromProfile);

  if (useMyMasteriesToggle) {
    useMyMasteriesToggle.addEventListener('change', () => {
      const team = getSelectedCoopTeam();
      team.useMyMasteriesForChef1 = Boolean(useMyMasteriesToggle.checked);
      saveUserData();
      renderCoopGoldMasteryEditor();
      refreshCurrentCoopPlanPreview();
      setCoopTeamStatus(t('teamSaved'));
    });
  }

  if (goldMasteryEditor) {
    goldMasteryEditor.addEventListener('input', event => {
      const input = event.target.closest('[data-coop-gold-mastery-search]');
      if (!input) return;
      coopGoldMasterySearchTerm = input.value;
      const cursorPosition = input.selectionStart;
      renderCoopGoldMasteryEditor();
      const nextInput = document.querySelector('[data-coop-gold-mastery-search]');
      if (nextInput) {
        nextInput.focus();
        if (Number.isFinite(cursorPosition)) nextInput.setSelectionRange(cursorPosition, cursorPosition);
      }
    });

    goldMasteryEditor.addEventListener('click', event => {
      if (event.target === goldMasteryEditor) {
        activeCoopGoldMasteryMemberIndex = null;
        renderCoopGoldMasteryEditor();
        return;
      }

      const toggleButton = event.target.closest('[data-toggle-coop-gold-mastery]');
      if (toggleButton) {
        toggleCoopGoldMastery(
          Number(toggleButton.getAttribute('data-member-index')),
          String(toggleButton.getAttribute('data-dish-id'))
        );
        return;
      }

      const closeButton = event.target.closest('[data-close-gold-mastery-editor]');
      if (closeButton) {
        activeCoopGoldMasteryMemberIndex = null;
        renderCoopGoldMasteryEditor();
      }
    });
  }


  if (manualAssignmentEditor) {
    manualAssignmentEditor.addEventListener('input', event => {
      const input = event.target.closest('[data-manual-assignment-dish-id]');
      if (!input) return;
      updateManualAssignmentDish(input);
    });

    manualAssignmentEditor.addEventListener('click', event => {
      if (event.target === manualAssignmentEditor) {
        activeCoopManualAssignmentMemberSlot = null;
        renderCoopManualAssignmentEditor();
        return;
      }

      const closeButton = event.target.closest('[data-close-manual-assignment-editor]');
      if (closeButton) {
        activeCoopManualAssignmentMemberSlot = null;
        renderCoopManualAssignmentEditor();
      }
    });
  }

  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    let shouldRender = false;
    if (activeCoopGoldMasteryMemberIndex !== null && activeCoopGoldMasteryMemberIndex !== undefined) {
      activeCoopGoldMasteryMemberIndex = null;
      shouldRender = true;
    }
    if (activeCoopManualAssignmentMemberSlot !== null && activeCoopManualAssignmentMemberSlot !== undefined) {
      activeCoopManualAssignmentMemberSlot = null;
      renderCoopManualAssignmentEditor();
    }
    if (shouldRender) renderCoopGoldMasteryEditor();
  });
}

function renderCoopTeamEditor() {
  const teamSelect = document.getElementById('coopTeamSelect');
  const teamName = document.getElementById('coopTeamName');
  const membersBody = document.getElementById('coopTeamMembersBody');
  const newButton = document.getElementById('newCoopTeamButton');
  if (!teamSelect || !teamName || !membersBody) return;

  ensureCoopTeamDefaults();
  const selectedTeam = getSelectedCoopTeam();

  renderCoopTeamSelectOnly();
  teamName.value = selectedTeam?.name || '';
  const useMyMasteriesToggle = document.getElementById('useMyMasteriesChef1Toggle');
  if (useMyMasteriesToggle) useMyMasteriesToggle.checked = Boolean(selectedTeam.useMyMasteriesForChef1);
  membersBody.innerHTML = selectedTeam.members.map((member, index) => coopTeamMemberRowHtml(member, index)).join('');
  renderCoopGoldMasteryEditor();
  renderCoopManualAssignmentEditor();
  if (newButton) newButton.disabled = userData.coopTeams.length >= MAX_COOP_TEAMS;
}

function renderCoopTeamSelectOnly() {
  const teamSelect = document.getElementById('coopTeamSelect');
  if (!teamSelect) return;
  const currentValue = userData.selectedCoopTeamId;
  teamSelect.innerHTML = (userData.coopTeams || []).map((team, index) => {
    const name = team.name || (currentLanguage === 'pt' ? `Equipe ${index + 1}` : `Team ${index + 1}`);
    return `<option value="${escapeHtml(team.id)}">${escapeHtml(name)}</option>`;
  }).join('');
  teamSelect.value = currentValue;
}

function coopTeamMemberRowHtml(member, index) {
  const slot = index + 1;
  const levelValue = member.level === '' || member.level === null || member.level === undefined ? '' : number(member.level);
  const stovesValue = member.stoves === '' || member.stoves === null || member.stoves === undefined ? '' : number(member.stoves);

  return `
    <tr>
      <td><strong>${escapeHtml(t('chef'))} ${number(slot)}</strong></td>
      <td><input data-team-field="name" data-member-index="${index}" type="text" maxlength="40" value="${escapeHtml(member.name || '')}" placeholder="${escapeHtml(`${t('chefFallback')} ${slot}`)}"></td>
      <td><input data-team-field="level" data-member-index="${index}" type="number" min="0" max="999" value="${escapeHtml(levelValue)}"></td>
      <td><input data-team-field="stoves" data-member-index="${index}" type="number" min="0" value="${escapeHtml(stovesValue)}"></td>
      <td class="coop-member-action-cell">
        <button type="button" class="gold-mastery-button" data-edit-member-masteries-index="${index}" title="${escapeHtml(t('editGoldMasteries'))}" aria-label="${escapeHtml(t('editGoldMasteries'))}">⭐</button>
        <button type="button" class="clear-chef-button" data-clear-member-index="${index}" title="${escapeHtml(t('clearChef'))}" aria-label="${escapeHtml(t('clearChef'))}">🗑️</button>
      </td>
    </tr>
  `;
}

function clearCoopTeamMember(index) {
  const team = getSelectedCoopTeam();
  if (!team || !Number.isFinite(index) || !team.members[index]) return;

  team.members[index] = {
    name: '',
    level: '',
    stoves: '',
    workload: 'equal',
    manualCount: '',
    manualAssignments: {},
    goldMasteries: {}
  };

  saveUserData();
  activeCoopGoldMasteryMemberIndex = null;
  renderCoopTeamEditor();
  renderCoopPlanner();
  refreshCurrentCoopPlanPreview();
  setCoopTeamStatus(t('teamSaved'));
}

function updateSelectedTeamFromMemberInput(input, allowAutoStove = false) {
  const team = getSelectedCoopTeam();
  const index = Number(input.getAttribute('data-member-index'));
  const field = input.getAttribute('data-team-field');
  if (!team || !Number.isFinite(index) || !team.members[index]) return;

  const member = team.members[index];
  if (field === 'name') {
    member.name = input.value;
  } else if (field === 'level') {
    const level = input.value === '' ? '' : clampNumber(Number(input.value || 0), 0, 999);
    member.level = level;
    if (allowAutoStove && level !== '') {
      member.stoves = getDefaultStovesForLevel(level);
      const stoveInput = document.querySelector(`[data-team-field="stoves"][data-member-index="${index}"]`);
      if (stoveInput) stoveInput.value = member.stoves;
    }
  } else if (field === 'stoves') {
    member.stoves = input.value === '' ? '' : Math.max(0, Number(input.value || 0));
  }

  saveUserData();
  renderCoopPlanner();
  refreshCurrentCoopPlanPreview();
}

function saveSelectedTeamFromInputs() {
  const team = getSelectedCoopTeam();
  if (!team) return;
  const teamName = document.getElementById('coopTeamName');
  if (teamName) team.name = teamName.value.trim() || team.name;

  document.querySelectorAll('#coopTeamMembersBody [data-team-field]').forEach(input => {
    updateSelectedTeamFromMemberInput(input, false);
  });

  saveUserData();
  renderCoopTeamSelectOnly();
  renderCoopPlanner();
  refreshCurrentCoopPlanPreview();
}

function createNewCoopTeam() {
  ensureCoopTeamDefaults();
  if (userData.coopTeams.length >= MAX_COOP_TEAMS) {
    setCoopTeamStatus(t('teamLimitReached'));
    return;
  }

  const team = createDefaultCoopTeam();
  userData.coopTeams.push(team);
  userData.selectedCoopTeamId = team.id;
  saveUserData();
  renderCoopTeamEditor();
  renderCoopPlanner();
  clearCoopPlanPreview();
  setCoopTeamStatus(t('teamSaved'));
}

function deleteSelectedCoopTeam() {
  ensureCoopTeamDefaults();
  if (!window.confirm(t('confirmDeleteTeam'))) return;
  const selectedId = userData.selectedCoopTeamId;
  userData.coopTeams = userData.coopTeams.filter(team => team.id !== selectedId);
  if (!userData.coopTeams.length) userData.coopTeams.push(createDefaultCoopTeam());
  userData.selectedCoopTeamId = userData.coopTeams[0].id;
  saveUserData();
  renderCoopTeamEditor();
  renderCoopPlanner();
  clearCoopPlanPreview();
  setCoopTeamStatus(t('teamDeleted'));
}

function fillTeamLeaderFromProfile() {
  const team = getSelectedCoopTeam();
  if (!team || !team.members[0]) return;
  const level = clampNumber(Number(userData.level || 1), 0, 999);
  team.members[0].name = (userData.chefName || '').trim();
  team.members[0].level = level;
  team.members[0].stoves = Number(userData.availableStoves || getDefaultStovesForLevel(level));
  saveUserData();
  renderCoopTeamEditor();
  renderCoopPlanner();
  refreshCurrentCoopPlanPreview();
  setCoopTeamStatus(t('teamSaved'));
}

function setCoopTeamStatus(message) {
  const status = document.getElementById('coopTeamStatus');
  if (status) status.textContent = message;
}


function normalizeCoopWorkload(value) {
  return Object.prototype.hasOwnProperty.call(COOP_WORKLOAD_WEIGHTS, value) ? value : 'equal';
}

function coopWorkloadLabel(value) {
  const normalized = normalizeCoopWorkload(value);
  const keyByValue = {
    minimum: 'workloadMinimum',
    low: 'workloadLow',
    equal: 'workloadEqual',
    high: 'workloadHigh',
    veryHigh: 'workloadVeryHigh',
    manual: 'workloadManual'
  };
  return t(keyByValue[normalized] || 'workloadEqual');
}

function manualAssignmentSummary(member) {
  const assignments = normalizeManualAssignments(member?.manualAssignments);
  const parts = Object.entries(assignments)
    .filter(([, amount]) => Number(amount) > 0)
    .map(([dishId, amount]) => {
      const dish = allDishRecords.find(record => String(record.dishId) === String(dishId));
      return `${number(amount)}× ${dish ? dish.dishName : dishId}`;
    });
  return parts.length ? parts.join(', ') : t('manualAssignmentSummaryEmpty');
}

function workloadSelectHtml(member) {
  const current = normalizeCoopWorkload(member.workload);
  const options = ['minimum', 'low', 'equal', 'high', 'veryHigh', 'manual'];
  return `
    <div class="workload-control-stack">
      <label class="mini-select-label">
        <span>${escapeHtml(t('workload'))}</span>
        <select data-plan-workload data-member-slot="${number(member.slot)}">
          ${options.map(option => `<option value="${escapeHtml(option)}" ${option === current ? 'selected' : ''}>${escapeHtml(coopWorkloadLabel(option))}</option>`).join('')}
        </select>
      </label>
      ${current === 'manual' ? `
        <div class="manual-workload-actions">
          <button type="button" class="manual-assignment-button" data-open-manual-assignment data-member-slot="${number(member.slot)}">${escapeHtml(t('editManualDishes'))}</button>
          <small>${escapeHtml(manualAssignmentSummary(member))}</small>
        </div>
      ` : ''}
    </div>
  `;
}

function refreshCurrentCoopPlanPreview() {
  const preview = document.getElementById('coopPlanPreview');
  const coopNumber = Number(preview?.getAttribute('data-current-coop-number') || 0);
  if (coopNumber) renderCoopPlanPreview(coopNumber, false);
}

function updateCoopMemberWorkload(select) {
  const team = getSelectedCoopTeam();
  const slot = Number(select.getAttribute('data-member-slot'));
  if (!team || !Number.isFinite(slot) || !team.members[slot - 1]) return;
  const member = team.members[slot - 1];
  member.workload = normalizeCoopWorkload(select.value);
  if (member.workload !== 'manual') {
    member.manualCount = '';
    member.manualAssignments = {};
  } else {
    if (!member.manualAssignments || typeof member.manualAssignments !== 'object') member.manualAssignments = {};
    activeCoopManualAssignmentMemberSlot = slot;
  }
  saveUserData();
  refreshCurrentCoopPlanPreview();
  renderCoopManualAssignmentEditor();
}

function updateCoopMemberManualCount(input) {
  const team = getSelectedCoopTeam();
  const slot = Number(input.getAttribute('data-member-slot'));
  if (!team || !Number.isFinite(slot) || !team.members[slot - 1]) return;
  team.members[slot - 1].manualCount = input.value === '' ? '' : Math.max(0, Math.floor(Number(input.value || 0)));
  saveUserData();
  refreshCurrentCoopPlanPreview();
}

function resetCoopWorkloads() {
  const team = getSelectedCoopTeam();
  if (!team || !Array.isArray(team.members)) return;
  team.members.forEach(member => {
    if (member) {
      member.workload = 'equal';
      member.manualCount = '';
      member.manualAssignments = {};
    }
  });
  saveUserData();
  activeCoopManualAssignmentMemberSlot = null;
  renderCoopManualAssignmentEditor();
  refreshCurrentCoopPlanPreview();
}


function getStatusMultiplier(status) {
  if (status === 'gold') return 4;
  if (status === 'silver') return 2;
  if (status === 'bronze') return 1;
  return 0;
}

function statusLabel(status) {
  if (status === 'gold') return t('gold');
  if (status === 'silver') return t('silver');
  if (status === 'bronze') return t('bronze');
  if (status === 'impossible') return t('impossibleMissingUnlock');
  return t('notDoable');
}

function statusClass(status) {
  return ['gold', 'silver', 'bronze', 'impossible'].includes(status) ? `status-${status}` : 'status-not-doable';
}


function estimateMemberCookMinutes(member) {
  if (!member || Number(member.stoves || 0) <= 0) return Infinity;
  const durations = [];
  Array.from(member.assignments?.values?.() || []).forEach(item => {
    const duration = Number(item.duration ?? item.req?.duration ?? 0);
    const amount = Number(item.amount || 0);
    for (let index = 0; index < amount; index += 1) {
      durations.push(duration);
    }
  });

  if (!durations.length) return 0;

  const stoveCount = Math.max(1, Math.floor(Number(member.stoves || 1)));
  const loads = Array.from({ length: Math.min(stoveCount, durations.length) }, () => 0);
  durations.sort((a, b) => b - a).forEach(duration => {
    let lightestIndex = 0;
    for (let index = 1; index < loads.length; index += 1) {
      if (loads[index] < loads[lightestIndex]) lightestIndex = index;
    }
    loads[lightestIndex] += duration;
  });

  return Math.max(...loads);
}

function buildCoopAssignmentPlan(coop, team = getSelectedCoopTeam()) {
  const useMyMasteriesForChef1 = Boolean(team?.useMyMasteriesForChef1);
  const members = getValidCoopTeamMembers(team).map(member => ({
    ...member,
    weight: COOP_WORKLOAD_WEIGHTS[normalizeCoopWorkload(member.workload)] || 1,
    manualLimit: null,
    manualAssignments: normalizeManualAssignments(member.manualAssignments),
    useMyMasteries: member.slot === 1 && useMyMasteriesForChef1,
    assignments: new Map(),
    assignedCount: 0,
    stoveMinutes: 0
  }));

  const requirements = (coop.requirements || []).map(req => ({
    ...req,
    remaining: Number(req.amount || 0),
    duration: Number(req.dish?.duration || 0),
    level: Number(req.dish?.level || 0)
  }));

  const unassigned = [];
  const warnings = [];

  if (!members.length) {
    return {
      status: 'impossible',
      estimatedMinutes: Infinity,
      members,
      requirements,
      unassigned: requirements.map(req => ({ ...req, amount: req.remaining })),
      warnings: [t('noTeamMembers')]
    };
  }

  let impossible = false;
  requirements.forEach(req => {
    if (!req.dish || req.level < 0 || !members.some(member => member.level >= req.level)) {
      impossible = true;
      unassigned.push({ ...req, amount: req.remaining });
      req.remaining = 0;
    }
  });

  if (!impossible) {
    const manualWarnings = [];

    members
      .filter(member => normalizeCoopWorkload(member.workload) === 'manual')
      .forEach(member => {
        Object.entries(normalizeManualAssignments(member.manualAssignments)).forEach(([dishId, requestedAmount]) => {
          let assigned = 0;
          const req = requirements.find(item => String(item.dishId) === String(dishId));
          const target = Math.max(0, Math.floor(Number(requestedAmount || 0)));
          while (assigned < target && req && req.remaining > 0 && member.level >= req.level && member.stoves > 0) {
            assignCoopDishUnit(member, req);
            assigned += 1;
          }
          if (assigned < target) manualWarnings.push(member.name);
        });
      });

    members
      .filter(member => normalizeCoopWorkload(member.workload) === 'minimum')
      .forEach(member => {
        if (member.assignedCount > 0) return;
        const req = getShortestEligibleRequirement(member, requirements);
        if (req) assignCoopDishUnit(member, req);
      });

    members
      .filter(member => normalizeCoopWorkload(member.workload) !== 'minimum' && normalizeCoopWorkload(member.workload) !== 'manual')
      .forEach(member => {
        if (member.assignedCount > 0) return;
        const req = getShortestEligibleRequirement(member, requirements);
        if (req) assignCoopDishUnit(member, req);
      });

    if (manualWarnings.length) warnings.push(t('manualCountWarning'));

    const orderedRequirements = [...requirements].sort((a, b) => {
      const aEligible = members.filter(member => member.level >= a.level).length;
      const bEligible = members.filter(member => member.level >= b.level).length;
      if (aEligible !== bEligible) return aEligible - bEligible;
      return b.duration - a.duration;
    });

    orderedRequirements.forEach(req => {
      while (req.remaining > 0) {
        const eligibleMembers = members.filter(member => canAssignRequirementToMember(member, req));

        if (!eligibleMembers.length) {
          unassigned.push({ ...req, amount: req.remaining });
          req.remaining = 0;
          impossible = true;
          break;
        }

        const chosen = eligibleMembers.sort((a, b) => {
          const durationA = getMemberDishDuration(a, req);
          const durationB = getMemberDishDuration(b, req);
          const scoreA = ((a.stoveMinutes + durationA) / Math.max(1, a.stoves)) / Math.max(0.05, a.weight);
          const scoreB = ((b.stoveMinutes + durationB) / Math.max(1, b.stoves)) / Math.max(0.05, b.weight);
          if (scoreA !== scoreB) return scoreA - scoreB;
          return b.level - a.level;
        })[0];

        assignCoopDishUnit(chosen, req);
      }
    });
  }

  members.forEach(member => {
    member.estimatedMinutes = estimateMemberCookMinutes(member);
  });

  const estimatedMinutes = members.length
    ? Math.max(...members.map(member => Number.isFinite(member.estimatedMinutes) ? member.estimatedMinutes : Infinity))
    : Infinity;

  let status = 'notDoable';
  if (impossible || unassigned.length) {
    status = 'impossible';
  } else if (estimatedMinutes <= coop.goldDeadline) {
    status = 'gold';
  } else if (estimatedMinutes <= coop.silverDeadline) {
    status = 'silver';
  } else if (estimatedMinutes <= coop.duration) {
    status = 'bronze';
  }

  const zeroContribution = members.filter(member => member.assignedCount <= 0);
  if (zeroContribution.length) warnings.push(t('contributionWarning'));
  if (status === 'impossible') warnings.push(t('noEligibleChef'));

  return { status, estimatedMinutes, members, requirements, unassigned, warnings };
}

function canAssignRequirementToMember(member, req) {
  if (!member || !req) return false;
  if (member.level < req.level) return false;
  if (member.stoves <= 0) return false;
  const workload = normalizeCoopWorkload(member.workload);
  if (workload === 'minimum' && member.assignedCount > 0) return false;
  if (workload === 'manual') return false;
  return true;
}

function getShortestEligibleRequirement(member, requirements) {
  return requirements
    .filter(req => req.remaining > 0 && member.level >= req.level && member.stoves > 0)
    .sort((a, b) => {
      const durationA = getMemberDishDuration(member, a);
      const durationB = getMemberDishDuration(member, b);
      if (durationA !== durationB) return durationA - durationB;
      const eligibleA = requirements.length ? 0 : 0;
      return String(a.dishName || '').localeCompare(String(b.dishName || '')) || eligibleA;
    })[0] || null;
}

function getMemberDishDuration(member, req) {
  const baseDuration = Number(req?.dish?.duration ?? req?.duration ?? 0);
  if (baseDuration <= 0) return 0;
  if (memberHasGoldMastery(member, req?.dishId || req?.dish?.dishId)) {
    return getMasteredDuration(baseDuration, 3);
  }
  return baseDuration;
}

function memberHasGoldMastery(member, dishId) {
  const key = String(dishId || '');
  if (!key) return false;
  if (member?.useMyMasteries && getMasteryLevel(key) >= 3) return true;
  return Boolean(member?.goldMasteries?.[key]);
}

function assignCoopDishUnit(member, req) {
  req.remaining = Math.max(0, Number(req.remaining || 0) - 1);
  member.assignedCount += 1;
  const duration = getMemberDishDuration(member, req);
  member.stoveMinutes += duration;
  const key = String(req.dishId || req.dishName);
  const current = member.assignments.get(key) || { req, amount: 0, duration };
  current.amount += 1;
  current.duration = duration;
  current.goldMastered = memberHasGoldMastery(member, req.dishId || req.dish?.dishId);
  member.assignments.set(key, current);
}

function memberAssignmentsHtml(member) {
  const assignments = Array.from(member.assignments.values());
  if (!assignments.length) return `<span class="muted-small">${escapeHtml(t('noAssignedDishes'))}</span>`;
  return assignments.map(item => `<span class="requirement-pill">${number(item.amount)}× ${escapeHtml(item.req.dishName)}${item.goldMastered ? ' ★' : ''}</span>`).join(' ');
}

function unassignedDishesHtml(plan) {
  if (!plan.unassigned.length) return '';
  return `
    <div class="assignment-warning">
      <strong>${escapeHtml(t('unassignedDishes'))}:</strong>
      ${plan.unassigned.map(item => `<span class="requirement-pill">${number(item.amount)}× ${escapeHtml(item.dishName)}</span>`).join(' ')}
    </div>
  `;
}

function planWarningsHtml(plan) {
  const uniqueWarnings = [...new Set(plan.warnings || [])];
  if (!uniqueWarnings.length) return '';
  return `<div class="assignment-warning">${uniqueWarnings.map(warning => `<p>${escapeHtml(warning)}</p>`).join('')}</div>`;
}

function predictedRewardsHtml(coop, plan) {
  const multiplier = getStatusMultiplier(plan.status);
  if (!multiplier) return `<p class="hint">${escapeHtml(t('notDoable'))}</p>`;

  return `
    <div class="coop-team-reward-list compact-reward-list predicted-reward-list">
      ${plan.members.map(member => {
        if (member.assignedCount <= 0) {
          return `
            <div class="coop-member-reward-item compact-reward-row muted-reward-row">
              <strong>${escapeHtml(member.name)}</strong>
              <span>${escapeHtml(t('noRewardNoContribution'))}</span>
            </div>
          `;
        }
        const reward = getCoopRewardAtLevel(coop, multiplier, member.level);
        const goldPart = reward.gold > 0 ? ` ${rewardAmountHtml('gold', reward.gold)}` : '';
        return `
          <div class="coop-member-reward-item compact-reward-row">
            <strong>${escapeHtml(member.name)}</strong>
            <span class="compact-reward-amounts">${rewardAmountHtml('cash', reward.cash)} ${rewardAmountHtml('xp', reward.xp)}${goldPart}</span>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function assignmentPlanHtml(coop, plan) {
  return `
    <section class="coop-assignment-section">
      <div class="assignment-heading-row">
        <h4>${escapeHtml(t('assignmentPlanTitle'))}</h4>
        <button type="button" class="copy-assignment-button" data-copy-assignment>${escapeHtml(t('copyAssignment'))}</button>
      </div>
      <div class="assignment-list">
        ${plan.members.map(member => `
          <article class="assignment-card">
            <div class="assignment-card-heading">
              <strong>${escapeHtml(member.name)}</strong>
              <span>${escapeHtml(t('chefCookTime'))}: ${escapeHtml(formatDuration(member.estimatedMinutes || 0))}</span>
            </div>
            <div class="assignment-pills">${memberAssignmentsHtml(member)}</div>
          </article>
        `).join('')}
      </div>
      ${unassignedDishesHtml(plan)}
      ${planWarningsHtml(plan)}
    </section>
  `;
}

function assignmentMarkdownLine(member) {
  const assignments = Array.from(member.assignments.values());
  if (!assignments.length) return `- **${member.name}**: ${t('noAssignedDishes')}`;
  const assignmentText = assignments
    .map(item => `${number(item.amount)}× ${item.req.dishName}${item.goldMastered ? ' ★' : ''}`)
    .join(', ');
  const cookTime = formatDuration(member.estimatedMinutes || 0);
  return `- **${member.name}** (${cookTime}): ${assignmentText}`;
}

function buildCoopAssignmentMarkdown(coop, plan) {
  const lines = [
    `## ${coop.title} — Co-Op ${number(coop.coopNumber)}`,
    `Estimated with this team: ${Number.isFinite(plan.estimatedMinutes) ? formatDuration(plan.estimatedMinutes) : '—'}`,
    `Predicted status: ${statusLabel(plan.status)}`,
    '',
    `### ${t('assignmentPlanTitle')}`,
    ...plan.members.map(member => assignmentMarkdownLine(member))
  ];

  if (plan.unassigned.length) {
    lines.push('', `**${t('unassignedDishes')}:**`);
    plan.unassigned.forEach(item => {
      lines.push(`- ${number(item.amount)}× ${item.dishName}`);
    });
  }

  const uniqueWarnings = [...new Set(plan.warnings || [])];
  if (uniqueWarnings.length) {
    lines.push('', '**Warnings:**');
    uniqueWarnings.forEach(warning => lines.push(`- ${warning}`));
  }

  return lines.join('\n');
}

async function copyTextToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);
  textarea.select();
  const ok = document.execCommand('copy');
  document.body.removeChild(textarea);
  if (!ok) throw new Error('copy failed');
}

async function copyCurrentCoopAssignment(button) {
  const preview = document.getElementById('coopPlanPreview');
  const coopNumber = Number(preview?.getAttribute('data-current-coop-number') || 0);
  const coop = allCoopRecords.find(item => Number(item.coopNumber) === coopNumber);
  if (!coop) return;

  const plan = buildCoopAssignmentPlan(coop, getSelectedCoopTeam());
  const originalText = button.textContent;

  try {
    await copyTextToClipboard(buildCoopAssignmentMarkdown(coop, plan));
    button.textContent = t('assignmentCopied');
    button.classList.add('copied');
  } catch (error) {
    button.textContent = t('assignmentCopyFailed');
  }

  setTimeout(() => {
    button.textContent = originalText || t('copyAssignment');
    button.classList.remove('copied');
  }, 1800);
}

function clearCoopPlanPreview() {
  const container = document.getElementById('coopPlanPreview');
  if (!container) return;
  container.className = 'coop-plan-preview empty-coop-plan';
  container.textContent = t('noCoopSelected');
}

function renderCoopPlanner() {
  const body = document.getElementById('coopListBody');
  if (!body) return;

  const search = normalizeSearch(document.getElementById('coopSearch')?.value || '');
  const records = allCoopRecords.filter(coop => {
    if (!search) return true;
    const haystack = [
      coop.coopNumber,
      coop.title,
      coop.shortDescription,
      coop.longDescription,
      coop.requirements.map(req => req.dishName).join(' ')
    ].join(' ');
    return normalizeSearch(haystack).includes(search);
  });

  if (!records.length) {
    body.innerHTML = emptyRow(6, t('noCoopsAvailable'));
    return;
  }

  body.innerHTML = records.map(coop => coopRowHtml(coop)).join('');
}

function restoreLastCoopPlanPreview() {
  const coopNumber = Math.max(0, Math.floor(Number(userData.selectedCoopNumber || 0)));
  if (!coopNumber) {
    clearCoopPlanPreview();
    return;
  }

  const exists = allCoopRecords.some(item => Number(item.coopNumber) === coopNumber);
  if (!exists) {
    userData.selectedCoopNumber = 0;
    saveUserData();
    clearCoopPlanPreview();
    return;
  }

  renderCoopPlanPreview(coopNumber, false);
}

function getCoopRewardAtLevel(coop, multiplier = 4, levelOverride = null) {
  const playerLevel = clampNumber(Number(levelOverride ?? userData.level ?? 1), 0, 999);
  return {
    cash: Number(coop.rewardCash || 0) * multiplier,
    xp: Math.trunc(Number(coop.baseXp || 0) * (playerLevel / 3) * multiplier),
    gold: multiplier >= 4 ? Number(coop.rewardGold || 0) : 0,
    playerLevel
  };
}

function coopDurationStackHtml(coop) {
  return `
    <div class="duration-stack">
      <strong>${escapeHtml(coop.durationText)}</strong>
      <small>${escapeHtml(formatDuration(coop.goldDeadline))} (${escapeHtml(String(t('gold')).toLowerCase())})</small>
    </div>
  `;
}

function rewardIconHtml(type) {
  return assetIconHtml(type, 'reward-icon');
}

function rewardAmountHtml(type, value) {
  return `<span class="reward-amount reward-${escapeHtml(type)}">${rewardIconHtml(type)}<span>${number(value)}</span></span>`;
}

function coopRewardTierPillHtml(label, reward, className = '') {
  const goldPart = reward.gold > 0 ? rewardAmountHtml('gold', reward.gold) : '';
  return `
    <div class="coop-reward-pill ${escapeHtml(className)}">
      <strong>${escapeHtml(label)}</strong>
      <span>${rewardAmountHtml('cash', reward.cash)}</span>
      <span>${rewardAmountHtml('xp', reward.xp)}</span>
      ${goldPart ? `<span>${goldPart}</span>` : ''}
    </div>
  `;
}

function coopRewardDetailsHtml(coop, levelOverride = null) {
  const goldReward = getCoopRewardAtLevel(coop, 4, levelOverride);
  const silverReward = getCoopRewardAtLevel(coop, 2, levelOverride);
  const bronzeReward = getCoopRewardAtLevel(coop, 1, levelOverride);
  return `
    <div class="coop-reward-cell coop-reward-pills">
      ${coopRewardTierPillHtml(t('gold'), goldReward, 'gold-tier')}
      ${coopRewardTierPillHtml(t('silver'), silverReward, 'silver-tier')}
      ${coopRewardTierPillHtml(t('bronze'), bronzeReward, 'bronze-tier')}
    </div>
  `;
}

function coopMaxRewardHtml(coop) {
  return coopRewardDetailsHtml(coop);
}

function coopTeamPreviewHtml(coop) {
  const team = getSelectedCoopTeam();
  const members = getValidCoopTeamMembers(team);

  if (!members.length) {
    return `
      <section class="coop-team-preview-section coop-team-compact-section">
        <h4>${escapeHtml(t('selectedTeam'))}</h4>
        <p>${escapeHtml(t('noTeamMembers'))}</p>
      </section>
    `;
  }

  const plan = buildCoopAssignmentPlan(coop, team);
  const countClass = `team-count-${Math.min(members.length, MAX_COOP_MEMBERS)}`;

  const memberRows = plan.members.map(member => `
    <div class="coop-team-summary-item compact-team-card">
      <strong class="compact-chef-name">${escapeHtml(member.name)}${member.useMyMasteries ? ' ★' : ''}</strong>
      <span class="compact-chef-meta">${escapeHtml(t('level'))} ${number(member.level)} · ${number(member.stoves)} ${escapeHtml(t('stoves'))}</span>
      <div class="compact-chef-workload">${workloadSelectHtml(member)}</div>
    </div>
  `).join('');

  return `
    <section class="coop-team-preview-section coop-team-compact-section">
      <h4>${escapeHtml(t('selectedTeam'))}: ${escapeHtml(team.name)}</h4>
      <div class="coop-team-compact-grid final-plan-grid">
        <div class="coop-team-compact-column selected-team-column">
          <div class="coop-team-summary-list compact-card-grid ${escapeHtml(countClass)}">${memberRows}</div>
          <div class="reset-workloads-row">
            <button type="button" class="reset-workloads-button" data-reset-workloads>${escapeHtml(t('resetWorkloads'))}</button>
          </div>
        </div>
        <div class="coop-team-compact-column plan-summary-column">
          <div class="plan-status-card ${escapeHtml(statusClass(plan.status))}">
            <span>${escapeHtml(t('estimatedWithTeam'))}</span>
            <strong>${Number.isFinite(plan.estimatedMinutes) ? escapeHtml(formatDuration(plan.estimatedMinutes)) : '—'}</strong>
            <small>${escapeHtml(t('predictedStatus'))}: ${escapeHtml(statusLabel(plan.status))}</small>
          </div>
          <h5>${escapeHtml(t('predictedRewards'))}</h5>
          ${predictedRewardsHtml(coop, plan)}
        </div>
      </div>
      ${assignmentPlanHtml(coop, plan)}
    </section>
  `;
}

function coopRowHtml(coop) {
  return `
    <tr>
      <td>${coopIconHtml(coop)}</td>
      <td class="coop-title-cell">
        <strong>${escapeHtml(coop.title)}</strong>
        <span>Co-Op ${number(coop.coopNumber)}</span>
        ${coop.shortDescription ? `<small>${escapeHtml(coop.shortDescription)}</small>` : ''}
      </td>
      <td>${coopDurationStackHtml(coop)}</td>
      <td>${coopMaxRewardHtml(coop)}</td>
      <td class="requirements-cell coop-requirements-cell">${coopRequirementPillsHtml(coop.requirements)}</td>
      <td><button type="button" class="plan-button" data-coop-number="${number(coop.coopNumber)}">${escapeHtml(t('planCoop'))}</button></td>
    </tr>
  `;
}

function renderCoopPlanPreview(coopNumber, shouldScroll = true) {
  const container = document.getElementById('coopPlanPreview');
  if (!container) return;

  const coop = allCoopRecords.find(item => Number(item.coopNumber) === Number(coopNumber));
  if (!coop) {
    container.className = 'coop-plan-preview empty-coop-plan';
    container.setAttribute('data-i18n', 'noCoopSelected');
    container.textContent = t('noCoopSelected');
    return;
  }

  const playerLevel = Number(userData.level || 1);

  userData.selectedCoopNumber = Number(coop.coopNumber || coopNumber);
  saveUserData();

  container.className = 'coop-plan-preview';
  container.setAttribute('data-current-coop-number', String(coopNumber));
  container.removeAttribute('data-i18n');
  container.innerHTML = `
    <article class="coop-plan-card">
      <div class="coop-plan-heading">
        ${coopIconHtml(coop, 'large')}
        <div>
          <p class="eyebrow">Co-Op ${number(coop.coopNumber)}</p>
          <h3>${escapeHtml(coop.title)}</h3>
          ${coop.longDescription ? `<p>${escapeHtml(coop.longDescription)}</p>` : ''}
        </div>
      </div>
      <div class="coop-stat-grid">
        <div><strong>${escapeHtml(t('duration'))}</strong><span>${escapeHtml(coop.durationText)}</span></div>
        <div><strong>${escapeHtml(t('goldDeadline'))}</strong><span>${escapeHtml(formatDuration(coop.goldDeadline))}</span></div>
        <div><strong>${escapeHtml(t('silverDeadline'))}</strong><span>${escapeHtml(formatDuration(coop.silverDeadline))}</span></div>
        <div><strong>${escapeHtml(t('minimumDishLevel'))}</strong><span>${number(coop.minDishLevel)}</span></div>
        <div><strong>${escapeHtml(t('totalStoveHours'))}</strong><span>${escapeHtml(formatDuration(coop.totalStoveMinutes))}</span></div>
      </div>
      <div class="coop-detail-grid">
        <section>
          <h4>${escapeHtml(t('rewardDetails'))}</h4>
          ${coopRewardDetailsHtml(coop)}
          <small>${escapeHtml(t('rewardEstimateAtYourLevel'))}: ${number(playerLevel)}</small>
        </section>
        <section>
          <h4>${escapeHtml(t('coopRequirements'))}</h4>
          <div class="coop-requirement-list">${coopRequirementListHtml(coop.requirements)}</div>
        </section>
        ${coopTeamPreviewHtml(coop)}
      </div>
    </article>
  `;

  if (shouldScroll) container.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function coopIconHtml(coop, size = 'normal') {
  const className = size === 'large' ? 'coop-icon coop-icon-large' : 'coop-icon';
  const coopNumber = Number(coop.coopNumber || 0);
  const primarySrc = `./coopicons/${coopNumber}.png`;
  const fallbackSrc = `${PATHS.coopIconBase}${coopNumber}.png`;
  const fallbackMarkup = '&lt;span class=&quot;missing-img coop-missing-icon&quot;&gt;Co-Op&lt;/span&gt;';
  return `<img src="${escapeHtml(primarySrc)}" data-fallback-src="${escapeHtml(fallbackSrc)}" alt="${escapeHtml(coop.title)}" class="${className}" loading="lazy" onerror="if(!this.dataset.triedFallback && this.dataset.fallbackSrc && this.dataset.fallbackSrc !== this.src){this.dataset.triedFallback='1';this.src=this.dataset.fallbackSrc;}else{this.outerHTML='${fallbackMarkup}';}">`;
}

function coopRequirementPillsHtml(requirements) {
  if (!requirements.length) return '—';
  return requirements.map(req => {
    return `<span class="requirement-pill">${number(req.amount)}× ${escapeHtml(req.dishName)}</span>`;
  }).join(' ');
}

function coopRequirementListHtml(requirements) {
  if (!requirements.length) return '<p>—</p>';
  return requirements.map(req => `
    <div class="coop-requirement-item">
      ${req.dish ? imageHtml(req.dish) : '<span class="missing-img">?</span>'}
      <div>
        <strong>${number(req.amount)}× ${escapeHtml(req.dishName)}</strong>
        <span>${escapeHtml(t('level'))} ${number(req.dish?.level || 0)} · ${escapeHtml(req.dish?.durationText || '')}</span>
      </div>
    </div>
  `).join('');
}


function getMyTimeMatchingRecords() {
  if (!allDishRecords.length) return { matches: [], bestCandidates: [], windowInfo: myTimeSettingsToWindow(userData.myTime) };
  const settings = readMyTimeSettingsFromInputs();
  userData.myTime = settings;
  const windowInfo = myTimeSettingsToWindow(settings);
  if (windowInfo.target <= 0 || windowInfo.max <= 0) return { matches: [], bestCandidates: [], windowInfo };

  const playerLevel = clampNumber(Number(settings.playerLevel || userData.level || 1), 0, 999);
  const records = settings.useMasteries
    ? allDishRecords.map(applyMasteryToRecord)
    : allDishRecords.map(record => ({ ...record }));

  const matches = records
    .filter(record => record.level <= playerLevel)
    .filter(record => Number(record.duration || 0) >= windowInfo.min && Number(record.duration || 0) <= windowInfo.max);

  const bestCandidates = matches.filter(record => {
    if (record.dishType === 'Special') return false;
    if (record.dishType === 'Holiday') return isHolidayDishActive(record.dishKey, new Date());
    return true;
  });

  matches.sort((a, b) => {
    if (Number(a.level || 0) !== Number(b.level || 0)) return Number(a.level || 0) - Number(b.level || 0);
    if (Number(a.duration || 0) !== Number(b.duration || 0)) return Number(a.duration || 0) - Number(b.duration || 0);
    return a.dishName.localeCompare(b.dishName);
  });

  return { matches, bestCandidates, windowInfo };
}

function renderMyTime() {
  const bestBody = document.getElementById('myTimeBestBody');
  const allBody = document.getElementById('myTimeAllBody');
  if (!bestBody || !allBody) return;
  updateMyTimeWindowSummary();

  const { matches, bestCandidates, windowInfo } = getMyTimeMatchingRecords();
  if (windowInfo.target <= 0) {
    bestBody.innerHTML = emptyRow(9, t('myTimeNoWindow'));
    allBody.innerHTML = emptyRow(8, t('myTimeNoWindow'));
    return;
  }

  const bestItems = [
    [t('bestSummaryXpMin'), findBestDish(bestCandidates, record => record.xpPerMin), 'best-xp-1'],
    [t('bestSummaryRawXp'), findBestDish(bestCandidates, record => record.xp), 'best-xp-3'],
    [t('bestSummaryProfitMin'), findBestDish(bestCandidates, record => record.profitPerMin), 'best-profit-1'],
    [t('bestSummaryRawProfit'), findBestDish(bestCandidates, record => record.profit), 'best-profit-3'],
    [t('bestSummaryPortionMin'), findBestDish(bestCandidates, record => record.servingsPerMin), 'best-portions-1'],
    [t('bestSummaryRawPortion'), findBestDish(bestCandidates, record => record.servings), 'best-portions-3']
  ].filter(item => item[1]);

  bestBody.innerHTML = bestItems.length
    ? bestItems.map(([label, record, rowClass]) => summaryRowHtml(label, record, rowClass)).join('')
    : emptyRow(9, t('noTimeMatches'));

  allBody.innerHTML = matches.length
    ? matches.map(record => myTimeAllRowHtml(record)).join('')
    : emptyRow(8, t('noTimeMatches'));
}

function myTimeAllRowHtml(record) {
  return `
    <tr class="${categoryClass(record.categoryId)}">
      <td>${imageHtml(record)}</td>
      <td class="dish-name">${fullDishNameHtml(record)}</td>
      <td>${number(record.level)}</td>
      <td>${metricStackHtml('xp', record.xp, record.xpPerMin)}</td>
      <td>${metricStackHtml('cash', record.profit, record.profitPerMin)}</td>
      <td>${portionMetricStackHtml(record.servings, record.servingsPerMin)}</td>
      <td>${escapeHtml(record.durationText)}</td>
      <td>${escapeHtml(record.categoryName)}</td>
    </tr>
  `;
}

function renderFullDishDex() {
  if (!allDishRecords.length) return;
  const body = document.getElementById('fullDishDexBody');
  const sortMode = document.getElementById('fullSortSelect').value;
  const rows = getSortedFullDishDex(sortMode, getFullUseMasteriesSetting());

  if (rows.length === 0) {
    body.innerHTML = emptyRow(11, t('noDishesAvailable'));
    return;
  }

  body.innerHTML = rows.map(record => `
    <tr class="${categoryClass(record.categoryId)}">
      <td>${imageHtml(record)}</td>
      <td class="dish-name">${fullDishNameHtml(record)}</td>
      <td>${number(record.level)}</td>
      <td>${metricStackHtml('xp', record.xp, record.xpPerMin)}</td>
      <td>${metricStackHtml('cash', record.profit, record.profitPerMin)}</td>
      <td>${portionMetricStackHtml(record.servings, record.servingsPerMin)}</td>
      <td>${escapeHtml(record.durationText)}</td>
      <td>${valueWithIconHtml('cash', record.ingredientCost)}</td>
      <td>${valueWithIconHtml('cash', record.revenue)}</td>
      <td>${escapeHtml(record.categoryName)}</td>
      <td class="requirements-cell">${escapeHtml(record.requirements)}</td>
    </tr>
  `).join('');
}

function renderMasteries() {
  const body = document.getElementById('masteriesBody');
  if (!body || !allDishRecords.length) return;

  const viewMode = getMasteryViewMode();
  const search = normalizeSearch(document.getElementById('masterySearch').value);
  const filteredRecords = getCookbookOrderedRecords(allDishRecords).filter(record => {
    if (!search) return true;
    return normalizeSearch(record.dishName).includes(search) || normalizeSearch(record.dishKey).includes(search);
  });

  const tableWrap = document.getElementById('masteryTableWrap');
  const cookbookWrap = document.getElementById('masteriesCookbook');
  const cookbookControls = document.getElementById('masteryBookControls');

  if (viewMode === 'cookbook') {
    if (tableWrap) tableWrap.classList.add('hidden');
    if (cookbookWrap) cookbookWrap.classList.remove('hidden');
    if (cookbookControls) cookbookControls.classList.remove('hidden');
    renderMasteriesCookbook(filteredRecords);
    return;
  }

  if (tableWrap) tableWrap.classList.remove('hidden');
  if (cookbookWrap) cookbookWrap.classList.add('hidden');
  if (cookbookControls) cookbookControls.classList.add('hidden');

  const records = viewMode === 'horizontal'
    ? getHorizontalReaderRecords(filteredRecords)
    : filteredRecords;

  if (records.length === 0) {
    body.innerHTML = emptyRow(5, t('noMasteryRows'));
    return;
  }

  body.innerHTML = records.map(record => {
    return `
      <tr>
        <td>${imageHtml(record)}</td>
        <td class="dish-name">${escapeHtml(record.dishName)}</td>
        <td>${masteryStarsHtml(record)}</td>
        <td class="effects-cell">${masteryEffectsHtml(record)}</td>
        <td>${number(record.level)}</td>
      </tr>
    `;
  }).join('');
}

function renderMasteriesCookbook(records) {
  const container = document.getElementById('masteriesCookbook');
  const pageStatus = document.getElementById('masteryBookPageStatus');
  const prevButton = document.getElementById('masteryBookPrev');
  const nextButton = document.getElementById('masteryBookNext');

  if (!container) return;

  if (records.length === 0) {
    container.innerHTML = `<div class="empty">${escapeHtml(t('noMasteryRows'))}</div>`;
    if (pageStatus) pageStatus.textContent = '';
    if (prevButton) prevButton.disabled = true;
    if (nextButton) nextButton.disabled = true;
    return;
  }

  const totalPages = Math.max(1, Math.ceil(records.length / MASTERY_PAGE_SIZE));
  masteryCookbookPage = Math.min(Math.max(0, masteryCookbookPage), totalPages - 1);

  const start = masteryCookbookPage * MASTERY_PAGE_SIZE;
  const pageRecords = records.slice(start, start + MASTERY_PAGE_SIZE);

  container.innerHTML = `
    <div class="cookbook-spread">
      ${pageRecords.map((record, index) => masteryCookbookCardHtml(record, index)).join('')}
    </div>
  `;

  if (pageStatus) {
    pageStatus.textContent = `${t('masteryBookPage')} ${number(masteryCookbookPage + 1)} / ${number(totalPages)}`;
  }
  if (prevButton) prevButton.disabled = masteryCookbookPage <= 0;
  if (nextButton) nextButton.disabled = masteryCookbookPage >= totalPages - 1;
}

function masteryCookbookCardHtml(record, index) {
  const positionClass = ['book-slot-left-top', 'book-slot-left-bottom', 'book-slot-right-top', 'book-slot-right-bottom'][index] || '';

  return `
    <article class="cookbook-dish-card ${positionClass}">
      <div class="cookbook-dish-main">
        <div>${imageHtml(record)}</div>
        <div>
          <h3>${escapeHtml(record.dishName)}</h3>
          <p>${t('level')} ${number(record.level)}</p>
        </div>
      </div>
      <div class="cookbook-stars">${masteryStarsHtml(record)}</div>
      <div class="cookbook-effects">${masteryEffectsHtml(record)}</div>
    </article>
  `;
}

function getMasteryViewMode() {
  const select = document.getElementById('masteryViewMode');
  const value = select ? select.value : 'vertical';
  return ['vertical', 'horizontal', 'cookbook'].includes(value) ? value : 'vertical';
}

function getCookbookOrderedRecords(records) {
  return [...records].sort(standardDishSort);
}

function getHorizontalReaderRecords(records) {
  const out = [];
  for (let index = 0; index < records.length; index += MASTERY_PAGE_SIZE) {
    const chunk = records.slice(index, index + MASTERY_PAGE_SIZE);
    [0, 2, 1, 3].forEach(chunkIndex => {
      if (chunk[chunkIndex]) out.push(chunk[chunkIndex]);
    });
  }
  return out;
}

function masteryStarsHtml(record) {
  const level = getMasteryLevel(record.dishId);
  return `
    <div class="mastery-stars" aria-label="${escapeHtml(t('mastery'))}">
      ${starButtonHtml(record.dishId, 1, 'bronze', level)}
      ${starButtonHtml(record.dishId, 2, 'silver', level)}
      ${starButtonHtml(record.dishId, 3, 'gold', level)}
    </div>
  `;
}

function starButtonHtml(dishId, starLevel, colorClass, currentLevel) {
  const filled = currentLevel >= starLevel;
  return `
    <button
      type="button"
      class="star-button ${colorClass} ${filled ? 'filled' : ''}"
      data-dish-id="${escapeHtml(dishId)}"
      data-mastery-level="${starLevel}"
      title="${escapeHtml(starTitle(starLevel))}"
    >${filled ? '★' : '☆'}</button>
  `;
}

function starTitle(level) {
  if (level === 1) return t('bronze');
  if (level === 2) return t('silver');
  return t('gold');
}


function masteryStarsReadOnlyHtml(record) {
  const level = getMasteryLevel(record.dishId);
  return `
    <div class="mastery-stars readonly-stars" aria-label="${escapeHtml(t('mastery'))}">
      ${starReadOnlyHtml(1, 'bronze', level)}
      ${starReadOnlyHtml(2, 'silver', level)}
      ${starReadOnlyHtml(3, 'gold', level)}
    </div>
  `;
}

function starReadOnlyHtml(starLevel, colorClass, currentLevel) {
  const filled = currentLevel >= starLevel;
  return `<span class="star-button readonly ${colorClass} ${filled ? 'filled' : ''}">${filled ? '★' : '☆'}</span>`;
}

function masteryEffectsHtml(record) {
  const masteryLevel = getMasteryLevel(record.dishId);
  const bronzeBonus = Math.ceil(record.servings * MASTERY_SERVING_BONUS) - record.servings;
  const silverBonus = Math.ceil(record.xp * MASTERY_XP_BONUS) - record.xp;
  const finalTime = getMasteredDuration(record.duration, 3);
  const savedTime = Math.max(0, record.duration - finalTime);
  const bronzeRequirement = getMasteryCountByLevel(record.dishId, record.duration, 1);
  const silverTotalRequirement = getMasteryCountByLevel(record.dishId, record.duration, 2);
  const goldTotalRequirement = getMasteryCountByLevel(record.dishId, record.duration, 3);
  const silverRequirement = Math.max(0, silverTotalRequirement - bronzeRequirement);
  const goldRequirement = Math.max(0, goldTotalRequirement - silverTotalRequirement);
  const goldTotalText = t('masteryTotalForGold').replace('{0}', number(goldTotalRequirement));

  return `
    <span class="effect-line effect-bronze">★ <span class="effect-name">${escapeHtml(t('bronze'))}${effectCheckHtml(masteryLevel, 1)}</span>: +${number(bronzeBonus)} ${escapeHtml(t('portionsLower'))} <span class="effect-requirement">(${number(bronzeRequirement)} ${escapeHtml(t('dishesRequired'))})</span></span>
    <span class="effect-line effect-silver">★ <span class="effect-name">${escapeHtml(t('silver'))}${effectCheckHtml(masteryLevel, 2)}</span>: +${number(silverBonus)} ${escapeHtml(t('xpUpper'))} <span class="effect-requirement">(${number(silverRequirement)} ${escapeHtml(t('dishesRequired'))})</span></span>
    <span class="effect-line effect-gold">★ <span class="effect-name">${escapeHtml(t('gold'))}${effectCheckHtml(masteryLevel, 3)}</span>: -${escapeHtml(formatDuration(savedTime))}: ${escapeHtml(formatDuration(finalTime))} <span class="effect-requirement">(${number(goldRequirement)} ${escapeHtml(t('dishesRequired'))})</span></span>
    <span class="effect-line effect-total"><span class="effect-name">${escapeHtml(goldTotalText)}</span></span>
  `;
}

function effectCheckHtml(currentLevel, requiredLevel) {
  return currentLevel >= requiredLevel ? ' <span class="effect-check">✓</span>' : '';
}

function getSortedFullDishDex(sortMode, useRegisteredMasteries = true) {
  const rows = useRegisteredMasteries
    ? allDishRecords.map(applyMasteryToRecord)
    : [...allDishRecords];
  const numericSort = (key, direction) => {
    rows.sort((a, b) => {
      const diff = Number(a[key] || 0) - Number(b[key] || 0);
      if (diff !== 0) return direction === 'asc' ? diff : -diff;
      return standardDishSort(a, b);
    });
  };

  switch (sortMode) {
    case 'level-asc': numericSort('level', 'asc'); break;
    case 'level-desc': numericSort('level', 'desc'); break;
    case 'name-asc': rows.sort((a, b) => a.dishName.localeCompare(b.dishName)); break;
    case 'name-desc': rows.sort((a, b) => b.dishName.localeCompare(a.dishName)); break;
    case 'category':
      rows.sort((a, b) => {
        const categoryCompare = a.categoryName.localeCompare(b.categoryName);
        return categoryCompare !== 0 ? categoryCompare : standardDishSort(a, b);
      });
      break;
    case 'duration-asc': numericSort('duration', 'asc'); break;
    case 'duration-desc': numericSort('duration', 'desc'); break;
    case 'profit-asc': numericSort('profit', 'asc'); break;
    case 'profit-desc': numericSort('profit', 'desc'); break;
    case 'xp-asc': numericSort('xp', 'asc'); break;
    case 'xp-desc': numericSort('xp', 'desc'); break;
    case 'profitPerMin-asc': numericSort('profitPerMin', 'asc'); break;
    case 'profitPerMin-desc': numericSort('profitPerMin', 'desc'); break;
    case 'xpPerMin-asc': numericSort('xpPerMin', 'asc'); break;
    case 'xpPerMin-desc': numericSort('xpPerMin', 'desc'); break;
    case 'servings-asc': numericSort('servings', 'asc'); break;
    case 'servings-desc': numericSort('servings', 'desc'); break;
    case 'servingsPerMin-asc': numericSort('servingsPerMin', 'asc'); break;
    case 'servingsPerMin-desc': numericSort('servingsPerMin', 'desc'); break;
    case 'standard':
    default: rows.sort(standardDishSort); break;
  }
  return rows;
}

function standardDishSort(a, b) {
  const orderA = Number.isFinite(Number(a.cookbookSortIndex)) ? Number(a.cookbookSortIndex) : Number(a.sourceIndex || 0);
  const orderB = Number.isFinite(Number(b.cookbookSortIndex)) ? Number(b.cookbookSortIndex) : Number(b.sourceIndex || 0);

  if (orderA !== orderB) return orderA - orderB;
  if (Number(a.dishId || 0) !== Number(b.dishId || 0)) return Number(a.dishId || 0) - Number(b.dishId || 0);
  return a.dishName.localeCompare(b.dishName);
}


function getBaseServings(record) {
  return Number(record.baseServings ?? record.servings ?? 0);
}

function getBaseXp(record) {
  return Number(record.baseXp ?? record.xp ?? 0);
}

function getBaseDuration(record) {
  return Number(record.baseDuration ?? record.duration ?? 0);
}

function as3RoundPositive(value) {
  return Math.floor(Number(value || 0) + 0.5);
}

function getMasteryCountByLevel(dishId, durationMinutes, level) {
  const numericLevel = Number(level || 0);
  if (numericLevel < 1 || numericLevel > 3) return 0;

  const numericDishId = Number(dishId || 0);
  if (numericDishId === 1201) return [0, 120, 600, 1560][numericLevel];
  if (numericDishId === 1204) return [0, 48, 240, 624][numericLevel];

  const duration = Number(durationMinutes || 0);
  if (duration <= 0) return 0;

  const durationHours = duration / 60.0;
  const loc4 = Math.min(24.0, durationHours * Math.ceil(0.5 / durationHours) * 3.0);
  const factor = (loc4 / durationHours) * MASTERY_STOVE_COUNT;

  if (numericLevel === 1) return as3RoundPositive(factor * MASTERY_DAYS_LV1);
  if (numericLevel === 2) return as3RoundPositive(factor * MASTERY_DAYS_LV2);
  return as3RoundPositive(factor * MASTERY_DAYS_LV3);
}

function applyMasteryToRecord(record) {
  const masteryLevel = getMasteryLevel(record.dishId);
  const servings = masteryLevel >= 1 ? Math.ceil(record.servings * MASTERY_SERVING_BONUS) : record.servings;
  const xp = masteryLevel >= 2 ? Math.ceil(record.xp * MASTERY_XP_BONUS) : record.xp;
  const duration = getMasteredDuration(record.duration, masteryLevel);
  const revenue = record.incomePerServing * servings;
  const profit = revenue - record.ingredientCost;

  return {
    ...record,
    baseServings: record.servings,
    baseXp: record.xp,
    baseDuration: record.duration,
    masteryLevel,
    servings,
    xp,
    duration,
    durationText: formatDuration(duration),
    revenue,
    profit,
    xpPerMin: duration > 0 ? xp / duration : 0,
    profitPerMin: duration > 0 ? profit / duration : 0,
    servingsPerMin: duration > 0 ? servings / duration : 0
  };
}

function getMasteredDuration(baseDuration, masteryLevel) {
  if (masteryLevel < 3) return baseDuration;
  return Math.max(MIN_COOKING_TIME, Math.floor(baseDuration * MASTERY_TIME_BONUS));
}

function getMasteryLevel(dishId) {
  const raw = userData.masteries?.[String(dishId)] || 0;
  return clampNumber(Number(raw), 0, 3);
}

function setMasteryLevel(dishId, level) {
  const normalizedLevel = clampNumber(Number(level), 0, 3);
  if (!userData.masteries) userData.masteries = {};

  if (normalizedLevel <= 0) {
    delete userData.masteries[String(dishId)];
  } else {
    userData.masteries[String(dishId)] = normalizedLevel;
  }

  saveUserData();
  renderMasteries();
  renderMyDex();
  renderFullDishDex();
  renderMyTime();
}

function imageHtml(record) {
  const alt = escapeHtml(record.dishName);
  const src = escapeHtml(record.imageUrl);
  return `
    <img
      class="dish-img"
      src="${src}"
      alt="${alt}"
      loading="lazy"
      onerror="this.outerHTML='<div class=&quot;missing-img&quot;>No image</div>'"
    >
  `;
}

function findBestDish(records, scoreFunction, filterFunction) {
  let bestRecord = null;
  let bestScore = -Infinity;
  records.forEach(record => {
    if (filterFunction && !filterFunction(record)) return;
    const score = Number(scoreFunction(record));
    if (!Number.isFinite(score)) return;
    if (score > bestScore) {
      bestScore = score;
      bestRecord = record;
    }
  });
  return bestRecord;
}

function loadUserData() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return normalizeUserData(parsed);
  } catch (error) {
    return normalizeUserData({});
  }
}

function normalizeUserData(raw) {
  const data = raw && typeof raw === 'object' ? raw : {};
  return {
    version: 1,
    chefName: typeof data.chefName === 'string' ? data.chefName : '',
    level: clampNumber(Number(data.level || 1), 0, 999),
    xpNeeded: Math.max(0, Number(data.xpNeeded ?? 1000)),
    availableStoves: Number(data.availableStoves || 0),
    showIngredients: Boolean(data.showIngredients),
    myTime: normalizeMyTimeSettings(data.myTime, clampNumber(Number(data.level || 1), 0, 999)),
    masteries: normalizeMasteries(data.masteries),
    coopTeams: normalizeCoopTeams(data.coopTeams),
    selectedCoopTeamId: typeof data.selectedCoopTeamId === 'string' ? data.selectedCoopTeamId : '',
    selectedCoopNumber: Math.max(0, Math.floor(Number(data.selectedCoopNumber || 0)))
  };
}


function normalizeMyTimeSettings(rawSettings, fallbackLevel = 1) {
  const data = rawSettings && typeof rawSettings === 'object' ? rawSettings : {};
  return {
    playerLevel: clampNumber(Number(data.playerLevel ?? fallbackLevel), 0, 999),
    hours: clampNumber(Number(data.hours ?? 0), 0, 999),
    minutes: clampNumber(Number(data.minutes ?? 0), 0, 59),
    marginPlusHours: clampNumber(Number(data.marginPlusHours ?? 0), 0, 999),
    marginPlusMinutes: clampNumber(Number(data.marginPlusMinutes ?? 0), 0, 59),
    marginMinusHours: clampNumber(Number(data.marginMinusHours ?? 0), 0, 999),
    marginMinusMinutes: clampNumber(Number(data.marginMinusMinutes ?? 0), 0, 59),
    useMasteries: data.useMasteries === undefined ? true : Boolean(data.useMasteries)
  };
}

function normalizeCoopTeams(rawTeams) {
  if (!Array.isArray(rawTeams)) return [];
  const seen = new Set();

  return rawTeams
    .map((team, index) => normalizeCoopTeam(team, index + 1))
    .filter(team => {
      if (!team.id || seen.has(team.id)) return false;
      seen.add(team.id);
      return true;
    })
    .slice(0, MAX_COOP_TEAMS);
}

function normalizeCoopTeam(rawTeam, fallbackNumber = 1) {
  const team = rawTeam && typeof rawTeam === 'object' ? rawTeam : {};
  const id = typeof team.id === 'string' && team.id.trim() ? team.id.trim() : createTeamId();
  const fallbackName = currentLanguage === 'pt' ? `Equipe ${fallbackNumber}` : `Team ${fallbackNumber}`;
  const name = typeof team.name === 'string' && team.name.trim() ? team.name.trim() : fallbackName;
  const rawMembers = Array.isArray(team.members) ? team.members : [];
  const members = Array.from({ length: MAX_COOP_MEMBERS }, (_, index) => normalizeCoopMember(rawMembers[index], index));

  return { id, name, members, useMyMasteriesForChef1: Boolean(team.useMyMasteriesForChef1) };
}

function normalizeCoopMember(rawMember, index = 0) {
  const member = rawMember && typeof rawMember === 'object' ? rawMember : {};
  const levelRaw = member.level === '' || member.level === null || member.level === undefined ? '' : clampNumber(Number(member.level), 0, 999);
  const stovesRaw = member.stoves === '' || member.stoves === null || member.stoves === undefined ? '' : Math.max(0, Number(member.stoves));
  const workload = normalizeCoopWorkload(member.workload);
  const manualCount = member.manualCount === '' || member.manualCount === null || member.manualCount === undefined
    ? ''
    : Math.max(0, Math.floor(Number(member.manualCount || 0)));
  const goldMasteries = normalizeCoopGoldMasteries(member.goldMasteries);
  const manualAssignments = normalizeManualAssignments(member.manualAssignments);

  return {
    name: typeof member.name === 'string' ? member.name : '',
    level: levelRaw,
    stoves: stovesRaw,
    workload,
    manualCount,
    manualAssignments,
    goldMasteries,
    slot: index + 1
  };
}

function createTeamId() {
  return `team_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function normalizeCoopGoldMasteries(rawMasteries) {
  const out = {};
  if (!rawMasteries || typeof rawMasteries !== 'object') return out;
  Object.entries(rawMasteries).forEach(([dishId, value]) => {
    if (value) out[String(dishId)] = true;
  });
  return out;
}

function normalizeManualAssignments(rawAssignments) {
  const out = {};
  if (!rawAssignments || typeof rawAssignments !== 'object') return out;
  Object.entries(rawAssignments).forEach(([dishId, value]) => {
    const amount = Math.max(0, Math.floor(Number(value || 0)));
    if (amount > 0) out[String(dishId)] = amount;
  });
  return out;
}

function renderCoopGoldMasteryEditor() {
  const editor = document.getElementById('coopGoldMasteryEditor');
  if (!editor) return;

  const team = getSelectedCoopTeam();
  if (activeCoopGoldMasteryMemberIndex === null || activeCoopGoldMasteryMemberIndex === undefined || activeCoopGoldMasteryMemberIndex === '') {
    editor.classList.add('hidden');
    editor.innerHTML = '';
    return;
  }

  const index = Number(activeCoopGoldMasteryMemberIndex);
  if (!team || !Number.isFinite(index) || index < 0 || !team.members[index]) {
    editor.classList.add('hidden');
    editor.innerHTML = '';
    return;
  }

  const member = team.members[index];
  const memberName = String(member.name || '').trim() || `${t('chefFallback')} ${index + 1}`;
  const selected = normalizeCoopGoldMasteries(member.goldMasteries);
  const searchTerm = normalizeSearch(coopGoldMasterySearchTerm || '');
  const selectedCount = Object.keys(selected).length;

  const dishRows = allDishRecords
    .filter(record => {
      if (!searchTerm) return true;
      return normalizeSearch(record.dishName).includes(searchTerm) || normalizeSearch(record.internalName).includes(searchTerm);
    })
    .sort(standardDishSort)
    .map(record => {
      const dishId = String(record.dishId);
      const active = Boolean(selected[dishId]);
      return `
        <button type="button" class="gold-mastery-dish-button ${active ? 'active' : ''}" data-toggle-coop-gold-mastery data-member-index="${index}" data-dish-id="${escapeHtml(dishId)}">
          <span>${active ? '★' : '☆'}</span>
          ${escapeHtml(record.dishName)}
        </button>
      `;
    }).join('') || `<p class="hint">${escapeHtml(t('noDishesAvailable'))}</p>`;

  editor.classList.remove('hidden');
  editor.innerHTML = `
    <div class="gold-mastery-editor-card">
      <div class="gold-mastery-editor-heading">
        <div>
          <h3>${escapeHtml(t('goldMasteries'))}: ${escapeHtml(memberName)}</h3>
          <p>${escapeHtml(t('goldMasteriesNote'))}</p>
        </div>
        <button type="button" class="close-editor-button" data-close-gold-mastery-editor>×</button>
      </div>
      <label class="gold-mastery-search-label">
        <span>${escapeHtml(t('searchDishes'))}</span>
        <input data-coop-gold-mastery-search type="search" value="${escapeHtml(coopGoldMasterySearchTerm || '')}" autocomplete="off">
      </label>
      ${index === 0 && team.useMyMasteriesForChef1 ? `<p class="gold-mastery-profile-note">★ ${escapeHtml(t('myMasteriesActive'))}</p>` : ''}
      ${selectedCount ? `<p class="gold-mastery-count">${number(selectedCount)} ${escapeHtml(t('goldMasteries'))}</p>` : `<p class="gold-mastery-count">${escapeHtml(t('noGoldMasteriesSelected'))}</p>`}
      <div class="gold-mastery-dish-grid">${dishRows}</div>
    </div>
  `;
}

function toggleCoopGoldMastery(index, dishId) {
  const team = getSelectedCoopTeam();
  if (!team || !Number.isFinite(index) || !team.members[index]) return;
  const member = team.members[index];
  if (!member.goldMasteries || typeof member.goldMasteries !== 'object') member.goldMasteries = {};
  const key = String(dishId || '');
  if (!key) return;
  if (member.goldMasteries[key]) delete member.goldMasteries[key];
  else member.goldMasteries[key] = true;
  saveUserData();
  renderCoopGoldMasteryEditor();
  refreshCurrentCoopPlanPreview();
  setCoopTeamStatus(t('teamSaved'));
}

function openManualAssignmentEditor(slot) {
  const team = getSelectedCoopTeam();
  if (!team || !Number.isFinite(slot) || !team.members[slot - 1]) return;
  team.members[slot - 1].workload = 'manual';
  if (!team.members[slot - 1].manualAssignments || typeof team.members[slot - 1].manualAssignments !== 'object') {
    team.members[slot - 1].manualAssignments = {};
  }
  activeCoopManualAssignmentMemberSlot = slot;
  saveUserData();
  refreshCurrentCoopPlanPreview();
  renderCoopManualAssignmentEditor();
}

function getCurrentPreviewCoop() {
  const preview = document.getElementById('coopPlanPreview');
  const coopNumber = Number(preview?.getAttribute('data-current-coop-number') || 0);
  return allCoopRecords.find(item => Number(item.coopNumber) === Number(coopNumber)) || null;
}

function renderCoopManualAssignmentEditor() {
  const editor = document.getElementById('coopManualAssignmentEditor');
  if (!editor) return;
  const team = getSelectedCoopTeam();
  const slot = Number(activeCoopManualAssignmentMemberSlot);
  const coop = getCurrentPreviewCoop();

  if (!team || !Number.isFinite(slot) || !team.members[slot - 1]) {
    editor.classList.add('hidden');
    editor.innerHTML = '';
    return;
  }

  const member = team.members[slot - 1];
  const memberName = String(member.name || '').trim() || `${t('chefFallback')} ${slot}`;
  const assignments = normalizeManualAssignments(member.manualAssignments);

  if (!coop) {
    editor.classList.remove('hidden');
    editor.innerHTML = `
      <div class="manual-assignment-card">
        <div class="gold-mastery-editor-heading">
          <div>
            <h3>${escapeHtml(t('manualAssignmentTitle'))}: ${escapeHtml(memberName)}</h3>
            <p>${escapeHtml(t('manualAssignmentUnavailable'))}</p>
          </div>
          <button type="button" class="close-editor-button" data-close-manual-assignment-editor>×</button>
        </div>
      </div>
    `;
    return;
  }

  const rows = (coop.requirements || []).map(req => {
    const dishId = String(req.dishId || req.dish?.dishId || '');
    const amount = Math.min(Number(req.amount || 0), Number(assignments[dishId] || 0));
    const canCook = Number(member.level || 0) >= Number(req.dish?.level || req.level || 0) && Number(member.stoves || 0) > 0;
    return `
      <div class="manual-assignment-row ${canCook ? '' : 'disabled'}">
        <div class="manual-assignment-dish-info">
          ${req.dish ? imageHtml(req.dish) : '<span class="missing-img">?</span>'}
          <div>
            <strong>${escapeHtml(req.dishName)}</strong>
            <span>${number(req.amount)} ${escapeHtml(t('dishesRequired'))} · ${escapeHtml(t('level'))} ${number(req.dish?.level || req.level || 0)}${canCook ? '' : ` · ${escapeHtml(t('cannotCookDish'))}`}</span>
          </div>
        </div>
        <input data-manual-assignment-dish-id="${escapeHtml(dishId)}" data-manual-assignment-member-slot="${number(slot)}" type="number" min="0" max="${number(req.amount)}" step="1" value="${number(amount)}" ${canCook ? '' : 'disabled'}>
      </div>
    `;
  }).join('') || `<p class="hint">${escapeHtml(t('noDishesAvailable'))}</p>`;

  editor.classList.remove('hidden');
  editor.innerHTML = `
    <div class="manual-assignment-card">
      <div class="gold-mastery-editor-heading">
        <div>
          <h3>${escapeHtml(t('manualAssignmentTitle'))}: ${escapeHtml(memberName)}</h3>
          <p>${escapeHtml(t('manualAssignmentNote'))}</p>
        </div>
        <button type="button" class="close-editor-button" data-close-manual-assignment-editor>×</button>
      </div>
      <div class="manual-assignment-list">${rows}</div>
    </div>
  `;
}

function updateManualAssignmentDish(input) {
  const team = getSelectedCoopTeam();
  const slot = Number(input.getAttribute('data-manual-assignment-member-slot'));
  const dishId = String(input.getAttribute('data-manual-assignment-dish-id') || '');
  const coop = getCurrentPreviewCoop();
  if (!team || !Number.isFinite(slot) || !team.members[slot - 1] || !dishId || !coop) return;

  const req = (coop.requirements || []).find(item => String(item.dishId || item.dish?.dishId || '') === dishId);
  const max = Math.max(0, Math.floor(Number(req?.amount || input.max || 0)));
  const value = Math.min(max, Math.max(0, Math.floor(Number(input.value || 0))));
  input.value = value;

  const member = team.members[slot - 1];
  member.workload = 'manual';
  if (!member.manualAssignments || typeof member.manualAssignments !== 'object') member.manualAssignments = {};
  if (value > 0) member.manualAssignments[dishId] = value;
  else delete member.manualAssignments[dishId];
  saveUserData();
  refreshCurrentCoopPlanPreview();
  setCoopTeamStatus(t('manualAssignmentSaved'));
}

function normalizeMasteries(rawMasteries) {
  const out = {};
  if (!rawMasteries || typeof rawMasteries !== 'object') return out;

  Object.entries(rawMasteries).forEach(([dishId, value]) => {
    const level = clampNumber(Number(value), 0, 3);
    if (level > 0) out[String(dishId)] = level;
  });
  return out;
}

function ensureUserDefaults() {
  if (!Number.isFinite(Number(userData.level))) userData.level = 1;
  if (!Number.isFinite(Number(userData.xpNeeded)) || Number(userData.xpNeeded) < 0) {
    userData.xpNeeded = 1000;
  }
  if (!Number.isFinite(Number(userData.availableStoves)) || Number(userData.availableStoves) <= 0) {
    userData.availableStoves = getDefaultStovesForLevel(userData.level);
  }
  userData.myTime = normalizeMyTimeSettings(userData.myTime);
  saveUserData();
}

function ensureCoopTeamDefaults() {
  userData.coopTeams = normalizeCoopTeams(userData.coopTeams);

  if (!userData.coopTeams.length) {
    const team = createDefaultCoopTeam();
    userData.coopTeams.push(team);
    userData.selectedCoopTeamId = team.id;
  }

  if (!userData.selectedCoopTeamId || !userData.coopTeams.some(team => team.id === userData.selectedCoopTeamId)) {
    userData.selectedCoopTeamId = userData.coopTeams[0]?.id || '';
  }

  saveUserData();
}

function createDefaultCoopTeam() {
  const numberSuffix = getNextCoopTeamNumber();
  const profileName = (userData.chefName || '').trim();
  const profileLevel = clampNumber(Number(userData.level || 1), 0, 999);
  const profileStoves = Number(userData.availableStoves || getDefaultStovesForLevel(profileLevel));
  const members = Array.from({ length: MAX_COOP_MEMBERS }, (_, index) => ({
    name: index === 0 ? profileName : '',
    level: index === 0 ? profileLevel : '',
    stoves: index === 0 ? profileStoves : '',
    workload: 'equal',
    manualCount: '',
    manualAssignments: {},
    goldMasteries: {},
    slot: index + 1
  }));

  return {
    id: createTeamId(),
    name: currentLanguage === 'pt' ? `Equipe ${numberSuffix}` : `Team ${numberSuffix}`,
    members,
    useMyMasteriesForChef1: false
  };
}

function getNextCoopTeamNumber() {
  const used = new Set((userData.coopTeams || []).map(team => {
    const match = String(team.name || '').match(/(\d+)$/);
    return match ? Number(match[1]) : 0;
  }));
  let number = 1;
  while (used.has(number)) number += 1;
  return number;
}

function getSelectedCoopTeam() {
  ensureCoopTeamDefaults();
  return userData.coopTeams.find(team => team.id === userData.selectedCoopTeamId) || userData.coopTeams[0];
}

function getValidCoopTeamMembers(team = getSelectedCoopTeam()) {
  if (!team || !Array.isArray(team.members)) return [];
  return team.members
    .map((member, index) => ({
      ...member,
      slot: index + 1,
      name: String(member.name || '').trim() || `${t('chefFallback')} ${index + 1}`,
      level: member.level === '' ? 0 : clampNumber(Number(member.level || 0), 0, 999),
      stoves: member.stoves === '' ? 0 : Math.max(0, Number(member.stoves || 0)),
      workload: normalizeCoopWorkload(member.workload),
      manualCount: member.manualCount === '' ? '' : Math.max(0, Math.floor(Number(member.manualCount || 0))),
      manualAssignments: normalizeManualAssignments(member.manualAssignments),
      goldMasteries: normalizeCoopGoldMasteries(member.goldMasteries)
    }))
    .filter(member => member.level > 0 && member.stoves > 0);
}

function saveUserData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
}

function getDefaultStovesForLevel(level) {
  const numericLevel = clampNumber(Number(level || 1), 0, 999);
  if (levelLimitsByLevel.has(numericLevel)) return Number(levelLimitsByLevel.get(numericLevel).stoves || 3);

  const levels = Array.from(levelLimitsByLevel.keys()).sort((a, b) => a - b);
  let best = null;
  for (const candidate of levels) {
    if (candidate <= numericLevel) best = candidate;
  }
  return best === null ? 3 : Number(levelLimitsByLevel.get(best).stoves || 3);
}

function syncProfileInputs(clearStatus = true) {
  document.getElementById('profileChefName').value = userData.chefName || '';
  document.getElementById('profileLevel').value = Number(userData.level || 1);
  document.getElementById('profileStoves').value = Number(userData.availableStoves || getDefaultStovesForLevel(userData.level));
  if (clearStatus) setProfileStatus('');
}

function syncMyDexInputs(updateStoves = true) {
  document.getElementById('playerLevel').value = Number(userData.level || 1);
  document.getElementById('xpNeeded').value = Math.max(0, Number(userData.xpNeeded ?? 1000));
  if (updateStoves) {
    document.getElementById('stoveCount').value = Number(userData.availableStoves || getDefaultStovesForLevel(userData.level));
  }
  const showIngredientsToggle = document.getElementById('showIngredientsToggle');
  if (showIngredientsToggle) showIngredientsToggle.checked = Boolean(userData.showIngredients);
}

function syncMyTimeInputs(clearSummary = true) {
  userData.myTime = normalizeMyTimeSettings(userData.myTime);
  const settings = userData.myTime;
  const pairs = {
    myTimePlayerLevel: settings.playerLevel || userData.level || 1,
    myTimeHours: settings.hours,
    myTimeMinutes: settings.minutes,
    myTimeMarginPlusHours: settings.marginPlusHours,
    myTimeMarginPlusMinutes: settings.marginPlusMinutes,
    myTimeMarginMinusHours: settings.marginMinusHours,
    myTimeMarginMinusMinutes: settings.marginMinusMinutes
  };

  Object.entries(pairs).forEach(([id, value]) => {
    const input = document.getElementById(id);
    if (input) input.value = Number(value || 0);
  });

  const toggle = document.getElementById('myTimeUseMasteriesToggle');
  if (toggle) toggle.checked = Boolean(settings.useMasteries);
  if (clearSummary) updateMyTimeWindowSummary();
}

function readMyTimeSettingsFromInputs() {
  return normalizeMyTimeSettings({
    playerLevel: Number(document.getElementById('myTimePlayerLevel')?.value || userData.level || 1),
    hours: Number(document.getElementById('myTimeHours')?.value || 0),
    minutes: Number(document.getElementById('myTimeMinutes')?.value || 0),
    marginPlusHours: Number(document.getElementById('myTimeMarginPlusHours')?.value || 0),
    marginPlusMinutes: Number(document.getElementById('myTimeMarginPlusMinutes')?.value || 0),
    marginMinusHours: Number(document.getElementById('myTimeMarginMinusHours')?.value || 0),
    marginMinusMinutes: Number(document.getElementById('myTimeMarginMinusMinutes')?.value || 0),
    useMasteries: Boolean(document.getElementById('myTimeUseMasteriesToggle')?.checked)
  });
}

function handleMyTimeInputChange() {
  userData.myTime = readMyTimeSettingsFromInputs();

  const myTimeLevel = clampNumber(Number(userData.myTime.playerLevel || 1), 0, 999);
  if (myTimeLevel !== Number(userData.level || 1)) {
    userData.level = myTimeLevel;
    userData.availableStoves = getDefaultStovesForLevel(myTimeLevel);
    syncProfileInputs(false);
    syncMyDexInputs(false);
    renderCoopTeamEditor();
    renderCoopPlanner();
  }

  saveUserData();
  updateMyTimeWindowSummary();
  renderMyTime();
  renderMyDex();
}

function clearMyTimeTarget() {
  ['myTimeHours', 'myTimeMinutes'].forEach(id => {
    const input = document.getElementById(id);
    if (input) input.value = 0;
  });
  handleMyTimeInputChange();
}

function clearMyTimeMargin() {
  ['myTimeMarginPlusHours', 'myTimeMarginPlusMinutes', 'myTimeMarginMinusHours', 'myTimeMarginMinusMinutes'].forEach(id => {
    const input = document.getElementById(id);
    if (input) input.value = 0;
  });
  handleMyTimeInputChange();
}

function myTimeSettingsToWindow(settings = readMyTimeSettingsFromInputs()) {
  const target = Number(settings.hours || 0) * 60 + Number(settings.minutes || 0);
  const marginPlus = Number(settings.marginPlusHours || 0) * 60 + Number(settings.marginPlusMinutes || 0);
  const marginMinus = Number(settings.marginMinusHours || 0) * 60 + Number(settings.marginMinusMinutes || 0);
  return {
    target,
    min: Math.max(0, target - marginMinus),
    max: Math.max(0, target + marginPlus),
    useMasteries: Boolean(settings.useMasteries)
  };
}

function updateMyTimeWindowSummary() {
  const element = document.getElementById('myTimeWindowSummary');
  if (!element) return;
  const windowInfo = myTimeSettingsToWindow(userData.myTime || readMyTimeSettingsFromInputs());
  if (windowInfo.target <= 0) {
    element.textContent = t('myTimeNoWindow');
    return;
  }
  element.textContent = t('myTimeWindowLabel')
    .replace('{0}', formatDuration(windowInfo.min))
    .replace('{1}', formatDuration(windowInfo.max));
}

function setProfileStatus(message) {
  const status = document.getElementById('profileSaveStatus');
  if (status) status.textContent = message;
}

function setMasteryStatus(message) {
  const status = document.getElementById('masteryDataStatus');
  if (status) status.textContent = message;
}

function setDataStatus(message) {
  setMasteryStatus(message);
  setProfileStatus(message);
}

function exportUserData() {
  const hasProfile = Boolean((userData.chefName || '').trim());
  const data = hasProfile
    ? {
        version: 1,
        chefName: userData.chefName.trim(),
        level: Number(userData.level || 1),
        xpNeeded: Math.max(0, Number(userData.xpNeeded ?? 1000)),
        availableStoves: Number(userData.availableStoves || getDefaultStovesForLevel(userData.level)),
        showIngredients: Boolean(userData.showIngredients),
        myTime: normalizeMyTimeSettings(userData.myTime),
        masteries: userData.masteries || {},
        coopTeams: normalizeCoopTeams(userData.coopTeams),
        selectedCoopTeamId: userData.selectedCoopTeamId || '',
        selectedCoopNumber: Math.max(0, Math.floor(Number(userData.selectedCoopNumber || 0)))
      }
    : {
        version: 1,
        xpNeeded: Math.max(0, Number(userData.xpNeeded ?? 1000)),
        showIngredients: Boolean(userData.showIngredients),
        myTime: normalizeMyTimeSettings(userData.myTime),
        masteries: userData.masteries || {},
        coopTeams: normalizeCoopTeams(userData.coopTeams),
        selectedCoopTeamId: userData.selectedCoopTeamId || '',
        selectedCoopNumber: Math.max(0, Math.floor(Number(userData.selectedCoopNumber || 0)))
      };

  const filename = hasProfile
    ? `${sanitizeFilename(userData.chefName)}_data.json`
    : 'mastery_data.json';

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  setDataStatus(t('dataDownloaded'));
}

function importUserData(file) {
  const reader = new FileReader();

  reader.onload = () => {
    try {
      const parsed = JSON.parse(String(reader.result || '{}'));
      if (!parsed || typeof parsed !== 'object') throw new Error('Invalid JSON');

      userData.masteries = normalizeMasteries(parsed.masteries);
      if ('xpNeeded' in parsed) {
        userData.xpNeeded = Math.max(0, Number(parsed.xpNeeded || 0));
      }
      if ('showIngredients' in parsed) {
        userData.showIngredients = Boolean(parsed.showIngredients);
      }
      if ('myTime' in parsed) {
        userData.myTime = normalizeMyTimeSettings(parsed.myTime);
      }

      if ('chefName' in parsed || 'level' in parsed || 'availableStoves' in parsed) {
        userData.chefName = typeof parsed.chefName === 'string' ? parsed.chefName : userData.chefName;
        userData.level = clampNumber(Number(parsed.level || userData.level || 1), 0, 999);
        userData.availableStoves = Number(parsed.availableStoves || getDefaultStovesForLevel(userData.level));
      }

      if ('coopTeams' in parsed) {
        userData.coopTeams = normalizeCoopTeams(parsed.coopTeams);
      }
      if ('selectedCoopTeamId' in parsed) {
        userData.selectedCoopTeamId = typeof parsed.selectedCoopTeamId === 'string' ? parsed.selectedCoopTeamId : '';
      }
      if ('selectedCoopNumber' in parsed) {
        userData.selectedCoopNumber = Math.max(0, Math.floor(Number(parsed.selectedCoopNumber || 0)));
      }

      userData.myTime = normalizeMyTimeSettings(userData.myTime, userData.level);
      userData.myTime.playerLevel = userData.level;
      ensureUserDefaults();
      ensureCoopTeamDefaults();
      saveUserData();
      syncProfileInputs(false);
      syncMyDexInputs(true);
      syncMyTimeInputs(false);
      renderCoopTeamEditor();
      renderCoopPlanner();
      restoreLastCoopPlanPreview();
      renderMasteries();
      renderMyDex();
      renderFullDishDex();
      renderMyTime();
      setDataStatus(t('dataLoadedMessage'));
    } catch (error) {
      console.error(error);
      setDataStatus(t('dataLoadError'));
    }
  };

  reader.onerror = () => setDataStatus(t('dataLoadError'));
  reader.readAsText(file);
}

function deleteUserData() {
  if (!window.confirm(t('confirmDelete'))) return;
  localStorage.removeItem(STORAGE_KEY);
  userData = normalizeUserData({});
  ensureUserDefaults();
  ensureCoopTeamDefaults();
  syncProfileInputs(false);
  syncMyDexInputs(true);
  syncMyTimeInputs(false);
  renderCoopTeamEditor();
  renderCoopPlanner();
  restoreLastCoopPlanPreview();
  renderMasteries();
  renderMyDex();
  renderFullDishDex();
  renderMyTime();
  setDataStatus(t('dataDeleted'));
}

async function fetchText(path) {
  const response = await fetch(path, { cache: 'no-store' });
  if (!response.ok) throw new Error(`Could not load ${path} — HTTP ${response.status}`);
  return await response.text();
}

async function fetchFirstWorkingText(paths) {
  const errors = [];
  for (const path of paths) {
    try {
      return await fetchText(path);
    } catch (error) {
      errors.push(path);
    }
  }
  throw new Error('Could not load file. Tried: ' + errors.join(', '));
}

async function fetchFirstWorkingLanguageFile(paths) {
  const errors = [];
  for (const path of paths) {
    try {
      const text = await fetchText(path);
      return { path, text };
    } catch (error) {
      errors.push(path);
    }
  }
  throw new Error('Could not load any language file. Tried: ' + errors.join(', '));
}

function parseLooseXml(text, label) {
  const cleaned = String(text || '').replace(/^\uFEFF/, '').replace(/<\?xml[^>]*\?>/g, '').trim();
  const wrapped = `<root>\n${cleaned}\n</root>`;
  const xml = new DOMParser().parseFromString(wrapped, 'application/xml');
  throwIfParserError(xml, label);
  return xml;
}

function parseNormalOrLooseXml(text, label) {
  const cleaned = String(text || '').replace(/^\uFEFF/, '').trim();
  let xml = new DOMParser().parseFromString(cleaned, 'application/xml');
  if (!xml.getElementsByTagName('parsererror')[0]) return xml;

  xml = new DOMParser().parseFromString(`<root>\n${cleaned}\n</root>`, 'application/xml');
  throwIfParserError(xml, label);
  return xml;
}

function throwIfParserError(xml, label) {
  const parserError = xml.getElementsByTagName('parsererror')[0];
  if (parserError) throw new Error(`XML parser error in ${label}: ${parserError.textContent}`);
}

function buildRecipeNameMap(textNodes) {
  const map = {};
  textNodes.forEach(node => {
    const id = getAttr(node, 'id');
    const name = getAttr(node, 'name');
    if (!id || !name) return;
    const lowerId = id.toLowerCase();
    if (!lowerId.startsWith('recipe_')) return;
    map[lowerId.replace(/^recipe_/, '')] = decodeEntities(name);
  });
  return map;
}

function buildCoopTextMap(textNodes) {
  const map = {};
  textNodes.forEach(node => {
    const id = getAttr(node, 'id');
    const name = getAttr(node, 'name');
    if (!id || !name) return;

    let match = id.match(/^coop_title_(\d+)$/i);
    if (match) {
      map[match[1]] = map[match[1]] || {};
      map[match[1]].title = decodeEntities(name);
      return;
    }

    match = id.match(/^coop_desc_short_(\d+)$/i);
    if (match) {
      map[match[1]] = map[match[1]] || {};
      map[match[1]].shortDescription = decodeEntities(name);
      return;
    }

    match = id.match(/^coop_desc_long_(\d+)$/i);
    if (match) {
      map[match[1]] = map[match[1]] || {};
      map[match[1]].longDescription = decodeEntities(name);
    }
  });
  return map;
}

function buildIngredientNameMap(textNodes) {
  const map = {};
  textNodes.forEach(node => {
    const id = getAttr(node, 'id');
    const name = getAttr(node, 'name');
    if (!id || !name) return;
    const lowerId = id.toLowerCase();
    if (!lowerId.startsWith('ingredient_')) return;
    map[lowerId.replace(/^ingredient_/, '')] = decodeEntities(name);
  });
  return map;
}

function parseCoopRequirements(requirements, dishById) {
  if (!requirements) return [];
  return requirements.split('#').map(part => {
    const [dishId, amount] = part.split('+');
    const dish = dishById.get(String(dishId));
    return {
      dishId: String(dishId || ''),
      amount: Number(amount || 0),
      dish,
      dishName: dish ? dish.dishName : `Dish ${dishId}`
    };
  }).filter(req => req.dishId && Number.isFinite(req.amount) && req.amount > 0);
}

function calculateRequirementCost(requirements, costById) {
  if (!requirements) return 0;
  return requirements.split('#').reduce((total, part) => {
    const pieces = part.split('+');
    const itemId = pieces[0];
    const quantity = Number(pieces[1] || 0);
    const itemCost = Number(costById[itemId] || 0);
    return total + itemCost * quantity;
  }, 0);
}

function formatRequirements(requirements, ingredientNameById) {
  if (!requirements) return '';
  return requirements.split('#').map(part => {
    const pieces = part.split('+');
    const itemId = pieces[0];
    const quantity = Number(pieces[1] || 0);
    const ingredientName = ingredientNameById[itemId] || `Unknown Item ${itemId}`;
    return `${ingredientName} x${quantity}`;
  }).join(', ');
}

function getDishType(dishKey) {
  const key = String(dishKey || '').toLowerCase();
  if (SPECIAL_DISH_KEYS.map(item => item.toLowerCase()).includes(key)) return 'Special';
  if (HOLIDAY_DISH_KEYS.map(item => item.toLowerCase()).includes(key)) return 'Holiday';
  return 'Regular';
}

function dishTypeLabel(type) {
  if (type === 'Special') return t('special');
  if (type === 'Holiday') return t('holiday');
  return t('regular');
}

function fullDishNameHtml(record) {
  const baseName = escapeHtml(record.dishName);
  const tag = fullDishTypeTag(record);
  if (!tag) return baseName;
  return `${baseName} <span class="dish-type-tag">(${escapeHtml(tag)})</span>`;
}

function fullDishTypeTag(record) {
  const key = String(record?.dishKey || '').toLowerCase();
  if (SPECIAL_DISH_KEYS.map(item => item.toLowerCase()).includes(key)) return t('fullTagSpecial');
  if (key === 'christmasturkey') return t('fullTagChristmas');
  if (key === 'easterdish' || key === 'fruitpudding') return t('fullTagEaster');
  return '';
}


function shouldIncludeHolidayDish(dishKey, mode) {
  if (mode === 'Include') return true;
  if (mode === 'Exclude') return false;
  return isHolidayDishActive(dishKey, new Date());
}

function isHolidayDishActive(dishKey, date) {
  const key = String(dishKey || '').toLowerCase();
  const current = stripTime(date);
  const year = current.getFullYear();
  const month = current.getMonth() + 1;
  const day = current.getDate();

  if (key === 'christmasturkey') return month === 12 || (month === 1 && day <= 6);

  if (key === 'easterdish' || key === 'fruitpudding') {
    const easter = calculateEasterDate(year);
    const start = addDays(easter, -14);
    const end = addDays(easter, 7);
    return current >= start && current <= end;
  }

  return false;
}

function calculateEasterDate(year) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return stripTime(new Date(year, month - 1, day));
}

function stripTime(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return stripTime(result);
}

function formatDuration(totalMinutes) {
  const minutesNumber = Number(totalMinutes || 0);
  if (minutesNumber === 0.5) return currentLanguage === 'pt' ? '30 s' : '30 sec';
  const roundedMinutes = Math.round(minutesNumber);
  if (roundedMinutes <= 0) return '0 min';
  const hours = Math.floor(roundedMinutes / 60);
  const minutes = roundedMinutes % 60;
  if (hours === 0) return `${minutes} min`;
  if (minutes === 0) return `${hours} h`;
  return `${hours} h ${minutes} min`;
}

function prettyName(key) {
  return String(key || '').replace(/([a-z])([A-Z])/g, '$1 $2').replace(/_/g, ' ').trim();
}

function categoryClass(categoryId) {
  const classes = {
    '0': 'category-dessert',
    '1': 'category-main',
    '2': 'category-soup',
    '3': 'category-salad',
    '4': 'category-vegetarian',
    '5': 'category-snack'
  };
  return classes[String(categoryId)] || '';
}

function getAttr(node, name) {
  return node.getAttribute(name) || '';
}

function decodeEntities(text) {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = String(text || '');
  return textarea.value;
}

function number(value) {
  return Number(value || 0).toLocaleString(currentLanguage === 'pt' ? 'pt-BR' : 'en-US');
}

function decimal(value) {
  return Number(value || 0).toLocaleString(currentLanguage === 'pt' ? 'pt-BR' : 'en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function clampNumber(value, min, max) {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function emptyRow(colspan, text) {
  return `
    <tr>
      <td colspan="${colspan}">
        <div class="empty">${escapeHtml(text)}</div>
      </td>
    </tr>
  `;
}

function setStatus(message, type) {
  const status = document.getElementById('loadStatus');
  status.textContent = message;
  status.className = type || '';
}

function sanitizeFilename(name) {
  return String(name || 'chef')
    .trim()
    .replace(/[^a-z0-9_-]+/gi, '_')
    .replace(/^_+|_+$/g, '') || 'chef';
}

function normalizeSearch(value) {
  return String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}
