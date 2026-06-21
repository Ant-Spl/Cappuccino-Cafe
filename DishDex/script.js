// DishDex/script.js

const PATHS = {
  cafeItems: '../CafeItems.xml',
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
    backButton: '← Back',
    personalRecommendations: 'Personal recommendations',
    myDexSettings: 'MyDex Settings',
    playerLevel: 'Player Level',
    xpNeeded: 'XP Needed',
    availableStoves: 'Available Stoves',
    holidayMode: 'Holiday Mode',
    exclude: 'Exclude',
    include: 'Include',
    auto: 'Auto',
    myDexHint: 'Insert your data for personalized recommendations.',
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
    metricXpMin: 'XP/min',
    metricProfitMin: 'profit/min',
    metricPortionMin: 'portion/min',
    activePlan: 'Active-time plan',
    fastPlan: 'Fast-time plan',
    shortPlan: 'Short-time plan',
    mediumPlan: 'Medium-time plan',
    longPlan: 'Long-time plan',
    veryLongPlan: 'Very-long time plan',
    dayOffPlan: 'Day-off plan',
    activeNote: 'Best XP/min for 10 minutes or less.',
    fastNote: 'Best XP/min between 11 minutes and 1 hour.',
    shortNote: 'Best XP/min between 1 h 1 min and 3 h.',
    mediumNote: 'Best XP/min between 3 h 1 min and 6 h.',
    longNote: 'Best XP/min between 6 h 1 min and 12 h.',
    veryLongNote: 'Best XP/min between 12 h 1 min and 23 h.',
    dayOffNote: 'Best XP/min for 23 h 1 min or more.',
    sortStandard: 'Standard (level lowest to highest)',
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
    sortServingsPerMinDesc: 'Portions/min: high to low'
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
    backButton: '← Voltar',
    personalRecommendations: 'Recomendações pessoais',
    myDexSettings: 'Configurações do MyDex',
    playerLevel: 'Nível do jogador',
    xpNeeded: 'XP necessário',
    availableStoves: 'Fogões disponíveis',
    holidayMode: 'Modo feriado',
    exclude: 'Excluir',
    include: 'Incluir',
    auto: 'Auto',
    myDexHint: 'Insira seus dados para recomendações personalizadas.',
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
    metricXpMin: 'XP/min',
    metricProfitMin: 'lucro/min',
    metricPortionMin: 'porção/min',
    activePlan: 'Plano ativo',
    fastPlan: 'Plano rápido',
    shortPlan: 'Plano curto',
    mediumPlan: 'Plano médio',
    longPlan: 'Plano longo',
    veryLongPlan: 'Plano muito longo',
    dayOffPlan: 'Plano de folga',
    activeNote: 'Melhor XP/min para 10 minutos ou menos.',
    fastNote: 'Melhor XP/min entre 11 minutos e 1 hora.',
    shortNote: 'Melhor XP/min entre 1 h 1 min e 3 h.',
    mediumNote: 'Melhor XP/min entre 3 h 1 min e 6 h.',
    longNote: 'Melhor XP/min entre 6 h 1 min e 12 h.',
    veryLongNote: 'Melhor XP/min entre 12 h 1 min e 23 h.',
    dayOffNote: 'Melhor XP/min para 23 h 1 min ou mais.',
    sortStandard: 'Padrão (nível menor para maior)',
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
    sortServingsPerMinDesc: 'Porções/min: maior para menor'
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
let currentLanguage = 'en';

document.addEventListener('DOMContentLoaded', main);

async function main() {
  try {
    setupTheme();
    setupLanguage();
    setupNavigation();

    applyUiLanguage();

    setStatus(t('loadingXml'), 'ok');

    allDishRecords = await loadDishRecords(currentLanguage);

    setStatus(t('dataLoaded'), 'ok');
    updateDataSummary();

    bindInputs();
    renderMyDex();
    renderFullDishDex();

  } catch (error) {
    console.error(error);

    setStatus('Could not load Café data.', 'bad');

    document.getElementById('dataSummary').textContent =
      String(error.message || error);
  }
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

    try {
      setStatus(t('loadingXml'), 'ok');
      document.getElementById('dataSummary').textContent = '';

      allDishRecords = await loadDishRecords(currentLanguage);

      setStatus(t('dataLoaded'), 'ok');
      updateDataSummary();

      renderMyDex();
      renderFullDishDex();

    } catch (error) {
      console.error(error);
      setStatus('Could not load Café data.', 'bad');
      document.getElementById('dataSummary').textContent = String(error.message || error);
    }
  });
}

function detectBrowserLanguage() {
  const language = String(navigator.language || navigator.userLanguage || '').toLowerCase();

  return language.startsWith('pt') ? 'pt' : 'en';
}

function setupNavigation() {
  document.getElementById('openMyDex').addEventListener('click', () => {
    showScreen('myDexScreen');
    renderMyDex();
  });

  document.getElementById('openFullDishDex').addEventListener('click', () => {
    showScreen('fullDishDexScreen');
    renderFullDishDex();
  });

  document.querySelectorAll('[data-back]').forEach(button => {
    button.addEventListener('click', () => {
      showScreen('welcomeScreen');
    });
  });

  document.getElementById('fullSortSelect').addEventListener('change', renderFullDishDex);
}

function applyUiLanguage() {
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');

    element.textContent = t(key);
  });

  populateSortSelect();
}

function populateSortSelect() {
  const select = document.getElementById('fullSortSelect');

  if (!select) return;

  const previousValue = select.value || 'standard';

  select.innerHTML = SORT_OPTIONS.map(option => {
    const value = option[0];
    const labelKey = option[1];

    return `<option value="${escapeHtml(value)}">${escapeHtml(t(labelKey))}</option>`;
  }).join('');

  const hasPreviousValue = SORT_OPTIONS.some(option => option[0] === previousValue);

  select.value = hasPreviousValue ? previousValue : 'standard';
}

function t(key) {
  return I18N[currentLanguage]?.[key] || I18N.en[key] || key;
}

function updateDataSummary() {
  document.getElementById('dataSummary').textContent =
    `${allDishRecords.length} ${t('dishesReady')}`;
}

function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.add('hidden');
  });

  document.getElementById(screenId).classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function getTimeBuckets() {
  return [
    {
      key: 'active',
      recommendationLabel: t('bestActive'),
      planLabel: t('activePlan'),
      note: t('activeNote'),
      matches: record => record.duration <= 10
    },
    {
      key: 'fast',
      recommendationLabel: t('bestFast'),
      planLabel: t('fastPlan'),
      note: t('fastNote'),
      matches: record => record.duration >= 11 && record.duration <= 60
    },
    {
      key: 'short',
      recommendationLabel: t('bestShort'),
      planLabel: t('shortPlan'),
      note: t('shortNote'),
      matches: record => record.duration >= 61 && record.duration <= 180
    },
    {
      key: 'medium',
      recommendationLabel: t('bestMedium'),
      planLabel: t('mediumPlan'),
      note: t('mediumNote'),
      matches: record => record.duration >= 181 && record.duration <= 360
    },
    {
      key: 'long',
      recommendationLabel: t('bestLong'),
      planLabel: t('longPlan'),
      note: t('longNote'),
      matches: record => record.duration >= 361 && record.duration <= 720
    },
    {
      key: 'veryLong',
      recommendationLabel: t('bestVeryLong'),
      planLabel: t('veryLongPlan'),
      note: t('veryLongNote'),
      matches: record => record.duration >= 721 && record.duration <= 1380
    },
    {
      key: 'dayOff',
      recommendationLabel: t('bestDayOff'),
      planLabel: t('dayOffPlan'),
      note: t('dayOffNote'),
      matches: record => record.duration >= 1381
    }
  ];
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

    ingredientNameById[id] =
      ingredientNameByKey[ingredientKey.toLowerCase()] ||
      prettyName(ingredientKey);
  });

  const records = dishNodes.map(node => {
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
      dishKey,
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

  records.sort(standardDishSort);

  return records;
}

function getCategoryName(categoryId) {
  return CATEGORY_NAMES[currentLanguage]?.[String(categoryId)] ||
    CATEGORY_NAMES.en[String(categoryId)] ||
    String(categoryId);
}

function bindInputs() {
  ['playerLevel', 'xpNeeded', 'stoveCount', 'holidayMode'].forEach(id => {
    const element = document.getElementById(id);

    element.addEventListener('input', renderMyDex);
    element.addEventListener('change', renderMyDex);
  });
}

function renderMyDex() {
  if (!allDishRecords.length) return;

  const settings = getSettings();

  const availableDishes = allDishRecords.filter(record => {
    return record.level <= settings.playerLevel;
  });

  const regularCandidates = availableDishes.filter(record => {
    if (record.dishType === 'Special') return false;

    if (record.dishType === 'Holiday') {
      return shouldIncludeHolidayDish(record.dishKey, settings.holidayMode);
    }

    return true;
  });

  const specialDishes = availableDishes.filter(record => {
    return record.dishType === 'Special';
  });

  const holidayDishes = availableDishes.filter(record => {
    return record.dishType === 'Holiday';
  });

  renderBestXp(buildBucketRecommendations(
    regularCandidates,
    'metricXpMin',
    record => record.xpPerMin,
    'xp'
  ));

  renderBestProfit(buildBucketRecommendations(
    regularCandidates,
    'metricProfitMin',
    record => record.profitPerMin,
    'profit'
  ));

  renderBestPortions(buildBucketRecommendations(
    regularCandidates,
    'metricPortionMin',
    record => record.servingsPerMin,
    'portions'
  ));

  renderPlans(settings, buildXpPlans(regularCandidates));

  renderDishCards('specialDishesBody', specialDishes, 'Special');
  renderDishCards('holidayDishesBody', holidayDishes, 'Holiday');
}

function buildBucketRecommendations(records, metricLabelKey, scoreFunction, sectionKey) {
  return getTimeBuckets().map((bucket, index) => {
    return [
      `${bucket.recommendationLabel} ${t(metricLabelKey)}`,
      findBestDish(records, scoreFunction, bucket.matches),
      `best-${sectionKey}-${index + 1}`
    ];
  });
}

function buildXpPlans(records) {
  return getTimeBuckets().map(bucket => {
    return [
      bucket.planLabel,
      findBestDish(records, record => record.xpPerMin, bucket.matches),
      bucket.note,
      `row-${bucket.key}`
    ];
  });
}

function getSettings() {
  return {
    playerLevel: clampNumber(Number(document.getElementById('playerLevel').value || 0), 0, 999),
    xpNeeded: Math.max(0, Number(document.getElementById('xpNeeded').value || 0)),
    stoveCount: Math.max(1, Number(document.getElementById('stoveCount').value || 1)),
    holidayMode: document.getElementById('holidayMode').value || 'Exclude'
  };
}

function renderBestXp(items) {
  const body = document.getElementById('bestXpBody');
  const validItems = items.filter(item => item[1]);

  if (validItems.length === 0) {
    body.innerHTML = emptyRow(8, t('noXpRecommendations'));
    return;
  }

  body.innerHTML = validItems.map(item => {
    const label = item[0];
    const record = item[1];
    const rowClass = item[2];

    return `
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
    `;
  }).join('');
}

function renderBestProfit(items) {
  const body = document.getElementById('bestProfitBody');
  const validItems = items.filter(item => item[1]);

  if (validItems.length === 0) {
    body.innerHTML = emptyRow(8, t('noProfitRecommendations'));
    return;
  }

  body.innerHTML = validItems.map(item => {
    const label = item[0];
    const record = item[1];
    const rowClass = item[2];

    return `
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
    `;
  }).join('');
}

function renderBestPortions(items) {
  const body = document.getElementById('bestPortionsBody');
  const validItems = items.filter(item => item[1]);

  if (validItems.length === 0) {
    body.innerHTML = emptyRow(8, t('noPortionRecommendations'));
    return;
  }

  body.innerHTML = validItems.map(item => {
    const label = item[0];
    const record = item[1];
    const rowClass = item[2];

    return `
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
    `;
  }).join('');
}

function renderPlans(settings, planItems) {
  const body = document.getElementById('xpPlansBody');

  body.innerHTML = planItems.map(item => {
    const planName = item[0];
    const record = item[1];
    const note = item[2];
    const rowClass = item[3];

    if (!record || settings.xpNeeded <= 0) {
      return `
        <tr class="${rowClass}">
          <td></td>
          <td>${escapeHtml(planName)}</td>
          <td class="dish-name">${t('noAvailableDish')}</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
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
    container.innerHTML =
      `<div class="empty">${escapeHtml(t('noDishesAvailable'))}</div>`;
    return;
  }

  container.innerHTML = records.map(record => {
    let typeLabel = dishTypeLabel(fallbackType);

    if (fallbackType === 'Holiday') {
      typeLabel = isHolidayDishActive(record.dishKey, new Date())
        ? t('holidayActive')
        : t('holidayInactive');
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

  body.innerHTML = rows.map(record => {
    return `
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
    `;
  }).join('');
}

function getSortedFullDishDex(sortMode) {
  const rows = [...allDishRecords];

  const numericSort = (key, direction) => {
    rows.sort((a, b) => {
      const diff = Number(a[key] || 0) - Number(b[key] || 0);

      if (diff !== 0) {
        return direction === 'asc' ? diff : -diff;
      }

      return standardDishSort(a, b);
    });
  };

  switch (sortMode) {
    case 'level-asc':
      numericSort('level', 'asc');
      break;

    case 'level-desc':
      numericSort('level', 'desc');
      break;

    case 'name-asc':
      rows.sort((a, b) => a.dishName.localeCompare(b.dishName));
      break;

    case 'name-desc':
      rows.sort((a, b) => b.dishName.localeCompare(a.dishName));
      break;

    case 'category':
      rows.sort((a, b) => {
        const categoryCompare = a.categoryName.localeCompare(b.categoryName);

        if (categoryCompare !== 0) return categoryCompare;

        return standardDishSort(a, b);
      });
      break;

    case 'duration-asc':
      numericSort('duration', 'asc');
      break;

    case 'duration-desc':
      numericSort('duration', 'desc');
      break;

    case 'profit-asc':
      numericSort('profit', 'asc');
      break;

    case 'profit-desc':
      numericSort('profit', 'desc');
      break;

    case 'xp-asc':
      numericSort('xp', 'asc');
      break;

    case 'xp-desc':
      numericSort('xp', 'desc');
      break;

    case 'profitPerMin-asc':
      numericSort('profitPerMin', 'asc');
      break;

    case 'profitPerMin-desc':
      numericSort('profitPerMin', 'desc');
      break;

    case 'xpPerMin-asc':
      numericSort('xpPerMin', 'asc');
      break;

    case 'xpPerMin-desc':
      numericSort('xpPerMin', 'desc');
      break;

    case 'servings-asc':
      numericSort('servings', 'asc');
      break;

    case 'servings-desc':
      numericSort('servings', 'desc');
      break;

    case 'servingsPerMin-asc':
      numericSort('servingsPerMin', 'asc');
      break;

    case 'servingsPerMin-desc':
      numericSort('servingsPerMin', 'desc');
      break;

    case 'standard':
    default:
      rows.sort(standardDishSort);
      break;
  }

  return rows;
}

function standardDishSort(a, b) {
  if (a.level !== b.level) return a.level - b.level;

  return a.dishName.localeCompare(b.dishName);
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

async function fetchText(path) {
  const response = await fetch(path, {
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error(`Could not load ${path} — HTTP ${response.status}`);
  }

  return await response.text();
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
  const cleaned = String(text || '')
    .replace(/^\uFEFF/, '')
    .replace(/<\?xml[^>]*\?>/g, '')
    .trim();

  const wrapped = `<root>\n${cleaned}\n</root>`;
  const xml = new DOMParser().parseFromString(wrapped, 'application/xml');

  throwIfParserError(xml, label);

  return xml;
}

function parseNormalOrLooseXml(text, label) {
  const cleaned = String(text || '')
    .replace(/^\uFEFF/, '')
    .trim();

  let xml = new DOMParser().parseFromString(cleaned, 'application/xml');

  if (!xml.getElementsByTagName('parsererror')[0]) {
    return xml;
  }

  xml = new DOMParser().parseFromString(`<root>\n${cleaned}\n</root>`, 'application/xml');

  throwIfParserError(xml, label);

  return xml;
}

function throwIfParserError(xml, label) {
  const parserError = xml.getElementsByTagName('parsererror')[0];

  if (parserError) {
    throw new Error(`XML parser error in ${label}: ${parserError.textContent}`);
  }
}

function buildRecipeNameMap(textNodes) {
  const map = {};

  textNodes.forEach(node => {
    const id = getAttr(node, 'id');
    const name = getAttr(node, 'name');

    if (!id || !name) return;

    const lowerId = id.toLowerCase();

    if (!lowerId.startsWith('recipe_')) return;

    const dishKeyLower = lowerId.replace(/^recipe_/, '');
    map[dishKeyLower] = decodeEntities(name);
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

    const ingredientKeyLower = lowerId.replace(/^ingredient_/, '');
    map[ingredientKeyLower] = decodeEntities(name);
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

  return requirements
    .split('#')
    .map(part => {
      const pieces = part.split('+');
      const itemId = pieces[0];
      const quantity = Number(pieces[1] || 0);
      const ingredientName = ingredientNameById[itemId] || `Unknown Item ${itemId}`;

      return `${ingredientName} x${quantity}`;
    })
    .join(', ');
}

function getDishType(dishKey) {
  const key = String(dishKey || '').toLowerCase();

  if (SPECIAL_DISH_KEYS.map(item => item.toLowerCase()).includes(key)) {
    return 'Special';
  }

  if (HOLIDAY_DISH_KEYS.map(item => item.toLowerCase()).includes(key)) {
    return 'Holiday';
  }

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

  if (key === 'christmasturkey') {
    return month === 12 || (month === 1 && day <= 6);
  }

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
  const roundedMinutes = Math.round(Number(totalMinutes || 0));

  if (roundedMinutes <= 0) return '0 min';

  const hours = Math.floor(roundedMinutes / 60);
  const minutes = roundedMinutes % 60;

  if (currentLanguage === 'pt') {
    if (hours === 0) return `${minutes} min`;
    if (minutes === 0) return `${hours} h`;

    return `${hours} h ${minutes} min`;
  }

  if (hours === 0) return `${minutes} min`;
  if (minutes === 0) return `${hours} h`;

  return `${hours} h ${minutes} min`;
}

function prettyName(key) {
  return String(key || '')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/_/g, ' ')
    .trim();
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
