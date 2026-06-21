// DishDex/script.js

const PATHS = {
  cafeItems: '../CafeItems.xml',
  languageFiles: [
    '../langs/Cafe_en.xml',
    '../langs/cafe_en.xml',
    '../Cafe_en.xml'
  ],
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
  '0': 'Dessert',
  '1': 'Main Dish',
  '2': 'Soup',
  '3': 'Salad',
  '4': 'Vegetarian',
  '5': 'Snack'
};

let allDishRecords = [];

document.addEventListener('DOMContentLoaded', main);

async function main() {
  try {
    setStatus('Loading Café XML...', 'ok');

    allDishRecords = await loadDishRecords();

    setStatus('Café data loaded!', 'ok');

    document.getElementById('dataSummary').textContent =
      `${allDishRecords.length} dishes ready`;

    bindInputs();
    renderMyDex();

  } catch (error) {
    console.error(error);

    setStatus('Could not load Café data.', 'bad');

    document.getElementById('dataSummary').textContent =
      String(error.message || error);
  }
}

async function loadDishRecords() {
  const cafeItemsText = await fetchText(PATHS.cafeItems);
  const cafeItemsXml = parseLooseXml(cafeItemsText, 'CafeItems.xml');

  const languageResult = await fetchFirstWorkingLanguageFile(PATHS.languageFiles);
  const cafeEnXml = parseNormalOrLooseXml(languageResult.text, 'Cafe language XML');

  const wodNodes = Array.from(cafeItemsXml.getElementsByTagName('wod'));
  const dishNodes = wodNodes.filter(node => getAttr(node, 'g') === 'Dish');
  const ingredientNodes = wodNodes.filter(node => getAttr(node, 'g') === 'Ingredient');

  const textNodes = Array.from(cafeEnXml.getElementsByTagName('text'));

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
      categoryName: CATEGORY_NAMES[String(categoryId)] || categoryId,
      requirements: formatRequirements(requirements, ingredientNameById),
      dishType: getDishType(dishKey),
      imageUrl: PATHS.imageBase + dishKey + '.png'
    };
  });

  records.sort((a, b) => {
    if (a.level !== b.level) return a.level - b.level;
    return a.dishName.localeCompare(b.dishName);
  });

  return records;
}

function bindInputs() {
  ['playerLevel', 'xpNeeded', 'stoveCount', 'holidayMode'].forEach(id => {
    const element = document.getElementById(id);

    element.addEventListener('input', renderMyDex);
    element.addEventListener('change', renderMyDex);
  });
}

function renderMyDex() {
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

  const bestXpPerMin = findBestDish(regularCandidates, record => record.xpPerMin);

  const bestFastXpPerMin = findBestDish(
    regularCandidates,
    record => record.xpPerMin,
    record => record.duration < 60
  );

  const bestRawXp = findBestDish(regularCandidates, record => record.xp);

  const bestProfitPerMin = findBestDish(regularCandidates, record => record.profitPerMin);

  const bestFastProfitPerMin = findBestDish(
    regularCandidates,
    record => record.profitPerMin,
    record => record.duration < 60
  );

  const bestRawProfit = findBestDish(regularCandidates, record => record.profit);

  const bestPortionPerMin = findBestDish(regularCandidates, record => record.servingsPerMin);

  const bestFastPortionPerMin = findBestDish(
    regularCandidates,
    record => record.servingsPerMin,
    record => record.duration < 60
  );

  const bestRawPortion = findBestDish(regularCandidates, record => record.servings);

  const bestLongRawXp = findBestDish(
    regularCandidates,
    record => record.xp,
    record => record.duration >= 480
  );

  renderBestXp([
    ['Best XP/min', bestXpPerMin],
    ['Best fast XP/min', bestFastXpPerMin],
    ['Best raw XP', bestRawXp]
  ]);

  renderBestProfit([
    ['Best profit/min', bestProfitPerMin],
    ['Best fast profit/min', bestFastProfitPerMin],
    ['Best raw profit', bestRawProfit]
  ]);

  renderBestPortions([
    ['Best portion/min', bestPortionPerMin],
    ['Best fast portion/min', bestFastPortionPerMin],
    ['Raw best portion', bestRawPortion]
  ]);

  renderPlans(settings, [
    ['Short-Time Plan', bestFastXpPerMin, 'Best XP/min under 1 hour.', 'row-short'],
    ['Long-Time Plan', bestLongRawXp, 'Best raw XP for 8h or more.', 'row-long']
  ]);

  renderDishCards('specialDishesBody', specialDishes, 'Special');
  renderDishCards('holidayDishesBody', holidayDishes, 'Holiday');

  renderAvailableDishes(regularCandidates, specialDishes, holidayDishes);
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
    body.innerHTML = emptyRow(8, 'No XP recommendations available for this level/settings.');
    return;
  }

  body.innerHTML = validItems.map(item => {
    const label = item[0];
    const record = item[1];

    return `
      <tr class="${categoryClass(record.categoryId)}">
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
    body.innerHTML = emptyRow(8, 'No profit recommendations available for this level/settings.');
    return;
  }

  body.innerHTML = validItems.map(item => {
    const label = item[0];
    const record = item[1];

    return `
      <tr class="${categoryClass(record.categoryId)}">
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
    body.innerHTML = emptyRow(8, 'No portion recommendations available for this level/settings.');
    return;
  }

  body.innerHTML = validItems.map(item => {
    const label = item[0];
    const record = item[1];

    return `
      <tr class="${categoryClass(record.categoryId)}">
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
          <td class="dish-name">No available dish</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>${number(settings.stoveCount)}</td>
          <td class="note-cell">${settings.xpNeeded <= 0 ? 'Set XP Needed above 0.' : 'No dish matches this plan.'}</td>
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
      '<div class="empty">No dishes from this section are available at your level.</div>';
    return;
  }

  container.innerHTML = records.map(record => {
    let typeLabel = fallbackType;

    if (fallbackType === 'Holiday') {
      typeLabel = isHolidayDishActive(record.dishKey, new Date())
        ? 'Holiday: Active'
        : 'Holiday: Inactive';
    }

    return `
      <article class="dish-card">
        <div>${imageHtml(record)}</div>
        <div>
          <h3>${escapeHtml(record.dishName)}</h3>
          <p>${escapeHtml(typeLabel)} · Level ${number(record.level)} · ${number(record.xp)} XP · ${escapeHtml(record.durationText)}</p>
          <p>${number(record.profit)} profit · ${decimal(record.xpPerMin)} XP/min</p>
        </div>
      </article>
    `;
  }).join('');
}

function renderAvailableDishes(regularCandidates, specialDishes, holidayDishes) {
  const body = document.getElementById('availableDishBody');

  const unique = new Map();

  [...regularCandidates, ...specialDishes, ...holidayDishes].forEach(record => {
    unique.set(record.dishKey, record);
  });

  const rows = Array.from(unique.values()).sort((a, b) => {
    if (a.level !== b.level) return a.level - b.level;
    return a.dishName.localeCompare(b.dishName);
  });

  if (rows.length === 0) {
    body.innerHTML = emptyRow(10, 'No dishes available.');
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
        <td>${escapeHtml(record.durationText)}</td>
        <td>${escapeHtml(record.categoryName)}</td>
        <td>${escapeHtml(record.dishType)}</td>
      </tr>
    `;
  }).join('');
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
  return Number(value || 0).toLocaleString('en-US');
}

function decimal(value) {
  return Number(value || 0).toFixed(2);
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
