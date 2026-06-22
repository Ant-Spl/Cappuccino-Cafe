// DishDex/script.js

const PATHS = {
  cafeItems: '../CafeItems.xml',
  levelLimits: [
    '../CafeLevelXp.xml',
    '../CafeLevelXP.xml',
    '../CafeLevelXp.XML'
  ],
  languageFiles: {
    en: [
      '../langs/Cafe_en.xml',
      '../langs/cafe_en.xml',
      '../Cafe_en.xml'
    ],
    pt: [
      '../langs/Cafe_pt.xml',
      '../langs/cafe_pt.xml',
      '../Cafe_pt.xml'
    ]
  },
  imageBase: '../dishimages/'
};

const STORAGE_KEY = 'dishDexUserDataV1';
const MASTERY_VIEW_STORAGE_KEY = 'dishDexMasteryViewMode';
const MASTERY_PAGE_SIZE = 4;
const MASTERY_DAYS_LV1 = 1;
const MASTERY_DAYS_LV2 = 5;
const MASTERY_DAYS_LV3 = 13;
const MASTERY_STOVE_COUNT = 4;
const MASTERY_SERVING_BONUS = 1.05;
const MASTERY_XP_BONUS = 1.05;
const MASTERY_TIME_BONUS = 0.70;
const MIN_COOKING_TIME = 0.5;

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
    myProfileTitle: 'My Profile',
    myProfileDescription: 'Save your chef name, level and default stove count.',
    myMasteriesTitle: 'My Masteries',
    myMasteriesDescription: 'Register your dish mastery stars and apply them to MyDex.',
    backButton: '← Back',
    personalRecommendations: 'Personal recommendations',
    myDexSettings: 'MyDex Settings',
    playerLevel: 'Player Level',
    xpNeeded: 'XP Needed',
    availableStoves: 'Available Stoves',
    holidayMode: 'Include holiday foods?',
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
    currentMastery: 'Current Mastery',
    recommendedStar: 'Recommended Star',
    benefit: 'Benefit',
    requirement: 'Requirement',
    noRecommendedMasteries: 'No mastery recommendations available for this level/settings.',
    alreadyMasteredBest: 'You already mastered the best dish for this! Nice!',
    dishesRequired: 'dishes required',
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
    sortDurationAsc: 'Time: low to high',
    sortDurationDesc: 'Time: high to low',
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
    confirmDelete: 'Are you sure? This will delete your saved profile and masteries.',
    dataDeleted: 'Saved profile and masteries deleted.',
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
    myProfileTitle: 'Meu Perfil',
    myProfileDescription: 'Salve o nome do chef, nível e quantidade padrão de fogões.',
    myMasteriesTitle: 'Minhas Estrelas',
    myMasteriesDescription: 'Registre as estrelas dos pratos e aplique os bônus no MyDex.',
    backButton: '← Voltar',
    personalRecommendations: 'Recomendações pessoais',
    myDexSettings: 'Configurações do MyDex',
    playerLevel: 'Nível do jogador',
    xpNeeded: 'XP necessário',
    availableStoves: 'Fogões disponíveis',
    holidayMode: 'Incluir comidas de feriado?',
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
    currentMastery: 'Estrelas atuais',
    recommendedStar: 'Estrela recomendada',
    benefit: 'Benefício',
    requirement: 'Requisito',
    noRecommendedMasteries: 'Nenhuma recomendação de estrela disponível para este nível/configuração.',
    alreadyMasteredBest: 'Você já dominou o melhor prato para isso! Boa!',
    dishesRequired: 'pratos necessários',
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
    sortDurationAsc: 'Tempo: menor para maior',
    sortDurationDesc: 'Tempo: maior para menor',
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
    confirmDelete: 'Tem certeza? Isso apagará seu perfil e suas estrelas salvas.',
    dataDeleted: 'Perfil e estrelas salvos foram apagados.',
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
let levelLimitsByLevel = new Map();
let currentLanguage = 'en';
let userData = loadUserData();
let masteryCookbookPage = 0;

document.addEventListener('DOMContentLoaded', main);

async function main() {
  try {
    setupTimeBackground();
    setupTheme();
    setupLanguage();
    setupNavigation();
    setupDataActions();
    applyUiLanguage();

    setStatus(t('loadingXml'), 'ok');

    levelLimitsByLevel = await loadLevelLimits();
    ensureUserDefaults();
    syncProfileInputs();
    syncMyDexInputs();

    allDishRecords = await loadDishRecords(currentLanguage);

    setStatus(t('dataLoaded'), 'ok');
    updateDataSummary();

    bindInputs();
    renderMyDex();
    renderFullDishDex();
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

  currentLanguage = savedLanguage || detectBrowserLanguage();
  select.value = currentLanguage;
  document.documentElement.lang = currentLanguage === 'pt' ? 'pt-BR' : 'en';

  select.addEventListener('change', async () => {
    currentLanguage = select.value;
    localStorage.setItem('dishDexLanguage', currentLanguage);
    document.documentElement.lang = currentLanguage === 'pt' ? 'pt-BR' : 'en';
    applyUiLanguage();
    syncSearchPlaceholder();

    try {
      setStatus(t('loadingXml'), 'ok');
      document.getElementById('dataSummary').textContent = '';
      allDishRecords = await loadDishRecords(currentLanguage);
      setStatus(t('dataLoaded'), 'ok');
      updateDataSummary();
      syncProfileInputs();
      syncMyDexInputs(false);
      renderMyDex();
      renderFullDishDex();
      renderMasteries();
    } catch (error) {
      console.error(error);
      setStatus(t('couldNotLoadData'), 'bad');
      document.getElementById('dataSummary').textContent = String(error.message || error);
    }
  });
}

function detectBrowserLanguage() {
  const language = String(navigator.language || navigator.userLanguage || '').toLowerCase();
  return language.startsWith('pt') ? 'pt' : 'en';
}

const SCREEN_HASHES = {
  welcomeScreen: 'home',
  myDexScreen: 'mydex',
  fullDishDexScreen: 'fulldishdex',
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
  document.getElementById('loadDataButton').addEventListener('click', () => {
    document.getElementById('dataFileInput').click();
  });

  document.getElementById('dataFileInput').addEventListener('change', event => {
    const file = event.target.files && event.target.files[0];
    if (file) importUserData(file);
    event.target.value = '';
  });

  document.getElementById('downloadDataButton').addEventListener('click', exportUserData);
  document.getElementById('deleteDataButton').addEventListener('click', deleteUserData);
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
  return I18N[currentLanguage]?.[key] || I18N.en[key] || key;
}

function updateDataSummary() {
  document.getElementById('dataSummary').textContent = `${allDishRecords.length} ${t('dishesReady')}`;
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

function getCategoryName(categoryId) {
  return CATEGORY_NAMES[currentLanguage]?.[String(categoryId)] || CATEGORY_NAMES.en[String(categoryId)] || String(categoryId);
}

function bindInputs() {
  ['playerLevel', 'xpNeeded', 'stoveCount', 'holidayMode'].forEach(id => {
    const element = document.getElementById(id);
    element.addEventListener('input', handleMyDexInputChange);
    element.addEventListener('change', handleMyDexInputChange);
  });

  document.getElementById('profileChefName').addEventListener('input', handleProfileInputChange);
  document.getElementById('profileLevel').addEventListener('input', handleProfileLevelChange);
  document.getElementById('profileStoves').addEventListener('input', handleProfileInputChange);
}

function handleMyDexInputChange() {
  userData.level = clampNumber(Number(document.getElementById('playerLevel').value || 1), 0, 999);
  userData.availableStoves = Math.max(1, Number(document.getElementById('stoveCount').value || 1));
  saveUserData();
  syncProfileInputs(false);
  renderMyDex();
}

function handleProfileLevelChange() {
  const level = clampNumber(Number(document.getElementById('profileLevel').value || 1), 0, 999);
  userData.level = level;
  userData.availableStoves = getDefaultStovesForLevel(level);
  saveUserData();
  syncProfileInputs(false);
  syncMyDexInputs(false);
  setProfileStatus(t('profileSaved'));
  renderMyDex();
}

function handleProfileInputChange() {
  userData.chefName = document.getElementById('profileChefName').value.trim();
  userData.level = clampNumber(Number(document.getElementById('profileLevel').value || 1), 0, 999);
  userData.availableStoves = Math.max(1, Number(document.getElementById('profileStoves').value || 1));
  saveUserData();
  syncMyDexInputs(false);
  setProfileStatus(t('profileSaved'));
  renderMyDex();
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
    body.innerHTML = emptyRow(12, t('noDishesAvailable'));
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

function summaryRowHtml(label, record, rowClass) {
  return `
    <tr class="${rowClass}">
      <td>${imageHtml(record)}</td>
      <td>${escapeHtml(label)}</td>
      <td class="dish-name">${escapeHtml(record.dishName)}</td>
      <td>${number(record.level)}</td>
      <td>${number(record.xp)}</td>
      <td>${decimal(record.xpPerMin)}</td>
      <td>${number(record.profit)}</td>
      <td>${decimal(record.profitPerMin)}</td>
      <td>${number(record.servings)}</td>
      <td>${decimal(record.servingsPerMin)}</td>
      <td>${escapeHtml(record.durationText)}</td>
      <td>${escapeHtml(record.categoryName)}</td>
    </tr>
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
    holidayMode: document.getElementById('holidayMode').value || 'Auto'
  };
}

function renderBestXp(items) {
  const body = document.getElementById('bestXpBody');
  const validItems = items.filter(item => item[1]);
  if (validItems.length === 0) {
    body.innerHTML = emptyRow(8, t('noXpRecommendations'));
    return;
  }
  body.innerHTML = validItems.map(([label, record, rowClass]) => `
    <tr class="${rowClass}">
      <td>${imageHtml(record)}</td>
      <td>${escapeHtml(label)}</td>
      <td class="dish-name">${escapeHtml(record.dishName)}</td>
      <td>${number(record.level)}</td>
      <td>${number(record.xp)}</td>
      <td>${decimal(record.xpPerMin)}</td>
      <td>${escapeHtml(record.durationText)}</td>
      <td>${escapeHtml(record.categoryName)}</td>
    </tr>
  `).join('');
}

function renderBestProfit(items) {
  const body = document.getElementById('bestProfitBody');
  const validItems = items.filter(item => item[1]);
  if (validItems.length === 0) {
    body.innerHTML = emptyRow(8, t('noProfitRecommendations'));
    return;
  }
  body.innerHTML = validItems.map(([label, record, rowClass]) => `
    <tr class="${rowClass}">
      <td>${imageHtml(record)}</td>
      <td>${escapeHtml(label)}</td>
      <td class="dish-name">${escapeHtml(record.dishName)}</td>
      <td>${number(record.level)}</td>
      <td>${number(record.profit)}</td>
      <td>${decimal(record.profitPerMin)}</td>
      <td>${escapeHtml(record.durationText)}</td>
      <td>${escapeHtml(record.categoryName)}</td>
    </tr>
  `).join('');
}

function renderBestPortions(items) {
  const body = document.getElementById('bestPortionsBody');
  const validItems = items.filter(item => item[1]);
  if (validItems.length === 0) {
    body.innerHTML = emptyRow(8, t('noPortionRecommendations'));
    return;
  }
  body.innerHTML = validItems.map(([label, record, rowClass]) => `
    <tr class="${rowClass}">
      <td>${imageHtml(record)}</td>
      <td>${escapeHtml(label)}</td>
      <td class="dish-name">${escapeHtml(record.dishName)}</td>
      <td>${number(record.level)}</td>
      <td>${number(record.servings)}</td>
      <td>${decimal(record.servingsPerMin)}</td>
      <td>${escapeHtml(record.durationText)}</td>
      <td>${escapeHtml(record.categoryName)}</td>
    </tr>
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
        <td>${number(record.xp)}</td>
        <td>${escapeHtml(record.durationText)}</td>
        <td>${number(dishesNeeded)}</td>
        <td>${number(batchesNeeded)}</td>
        <td>${escapeHtml(totalCookTime)}</td>
        <td>${number(settings.stoveCount)}</td>
        <td class="note-cell">${escapeHtml(note)}</td>
      </tr>
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
    return `
      <article class="dish-card">
        <div>${imageHtml(record)}</div>
        <div>
          <h3>${escapeHtml(record.dishName)}</h3>
          <p>${escapeHtml(typeLabel)} · ${t('level')} ${number(record.level)} · ${number(record.xp)} XP · ${escapeHtml(record.durationText)}</p>
          <p>${number(record.profit)} ${t('profitLower')} · ${decimal(record.xpPerMin)} XP/min</p>
        </div>
      </article>
    `;
  }).join('');
}

function renderFullDishDex() {
  if (!allDishRecords.length) return;
  const body = document.getElementById('fullDishDexBody');
  const sortMode = document.getElementById('fullSortSelect').value;
  const rows = getSortedFullDishDex(sortMode);

  if (rows.length === 0) {
    body.innerHTML = emptyRow(15, t('noDishesAvailable'));
    return;
  }

  body.innerHTML = rows.map(record => `
    <tr class="${categoryClass(record.categoryId)}">
      <td>${imageHtml(record)}</td>
      <td class="dish-name">${escapeHtml(record.dishName)}</td>
      <td>${number(record.level)}</td>
      <td>${number(record.xp)}</td>
      <td>${decimal(record.xpPerMin)}</td>
      <td>${number(record.profit)}</td>
      <td>${decimal(record.profitPerMin)}</td>
      <td>${number(record.servings)}</td>
      <td>${decimal(record.servingsPerMin)}</td>
      <td>${escapeHtml(record.durationText)}</td>
      <td>${number(record.ingredientCost)}</td>
      <td>${number(record.revenue)}</td>
      <td>${escapeHtml(record.categoryName)}</td>
      <td class="requirements-cell">${escapeHtml(record.requirements)}</td>
      <td>${escapeHtml(dishTypeLabel(record.dishType))}</td>
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

  return `
    <span class="effect-line effect-bronze">★ <span class="effect-name">${escapeHtml(t('bronze'))}${effectCheckHtml(masteryLevel, 1)}</span>: +${number(bronzeBonus)} ${escapeHtml(t('portionsLower'))} <span class="effect-requirement">(${number(getMasteryCountByLevel(record.dishId, record.duration, 1))} ${escapeHtml(t('dishesRequired'))})</span></span>
    <span class="effect-line effect-silver">★ <span class="effect-name">${escapeHtml(t('silver'))}${effectCheckHtml(masteryLevel, 2)}</span>: +${number(silverBonus)} ${escapeHtml(t('xpUpper'))} <span class="effect-requirement">(${number(getMasteryCountByLevel(record.dishId, record.duration, 2))} ${escapeHtml(t('dishesRequired'))})</span></span>
    <span class="effect-line effect-gold">★ <span class="effect-name">${escapeHtml(t('gold'))}${effectCheckHtml(masteryLevel, 3)}</span>: -${escapeHtml(formatDuration(savedTime))}: ${escapeHtml(formatDuration(finalTime))} <span class="effect-requirement">(${number(getMasteryCountByLevel(record.dishId, record.duration, 3))} ${escapeHtml(t('dishesRequired'))})</span></span>
  `;
}

function effectCheckHtml(currentLevel, requiredLevel) {
  return currentLevel >= requiredLevel ? ' <span class="effect-check">✓</span>' : '';
}

function getSortedFullDishDex(sortMode) {
  const rows = [...allDishRecords];
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
    availableStoves: Number(data.availableStoves || 0),
    masteries: normalizeMasteries(data.masteries)
  };
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
  if (!Number.isFinite(Number(userData.availableStoves)) || Number(userData.availableStoves) <= 0) {
    userData.availableStoves = getDefaultStovesForLevel(userData.level);
  }
  saveUserData();
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
  if (updateStoves) {
    document.getElementById('stoveCount').value = Number(userData.availableStoves || getDefaultStovesForLevel(userData.level));
  }
}

function setProfileStatus(message) {
  const status = document.getElementById('profileSaveStatus');
  if (status) status.textContent = message;
}

function setMasteryStatus(message) {
  const status = document.getElementById('masteryDataStatus');
  if (status) status.textContent = message;
}

function exportUserData() {
  const hasProfile = Boolean((userData.chefName || '').trim());
  const data = hasProfile
    ? {
        version: 1,
        chefName: userData.chefName.trim(),
        level: Number(userData.level || 1),
        availableStoves: Number(userData.availableStoves || getDefaultStovesForLevel(userData.level)),
        masteries: userData.masteries || {}
      }
    : {
        version: 1,
        masteries: userData.masteries || {}
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
  setMasteryStatus(t('dataDownloaded'));
}

function importUserData(file) {
  const reader = new FileReader();

  reader.onload = () => {
    try {
      const parsed = JSON.parse(String(reader.result || '{}'));
      if (!parsed || typeof parsed !== 'object') throw new Error('Invalid JSON');

      userData.masteries = normalizeMasteries(parsed.masteries);

      if ('chefName' in parsed || 'level' in parsed || 'availableStoves' in parsed) {
        userData.chefName = typeof parsed.chefName === 'string' ? parsed.chefName : userData.chefName;
        userData.level = clampNumber(Number(parsed.level || userData.level || 1), 0, 999);
        userData.availableStoves = Number(parsed.availableStoves || getDefaultStovesForLevel(userData.level));
      }

      ensureUserDefaults();
      saveUserData();
      syncProfileInputs(false);
      syncMyDexInputs(true);
      renderMasteries();
      renderMyDex();
      setMasteryStatus(t('dataLoadedMessage'));
    } catch (error) {
      console.error(error);
      setMasteryStatus(t('dataLoadError'));
    }
  };

  reader.onerror = () => setMasteryStatus(t('dataLoadError'));
  reader.readAsText(file);
}

function deleteUserData() {
  if (!window.confirm(t('confirmDelete'))) return;
  localStorage.removeItem(STORAGE_KEY);
  userData = normalizeUserData({});
  ensureUserDefaults();
  syncProfileInputs(false);
  syncMyDexInputs(true);
  renderMasteries();
  renderMyDex();
  setMasteryStatus(t('dataDeleted'));
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
