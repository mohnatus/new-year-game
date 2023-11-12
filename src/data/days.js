import {
	changeCider,
	addMedicine,
	applyPower,
	buyArmor,
	changeGold,
	changeHealth,
	changeMagic,
	changePears,
	changeWine,
	fillHealth,
	loseHealth,
	removeMedicine,
	applyPet,
} from '../store/actions';
import { AIR, FIRE, GROUND, WATER } from '../constants/magic';
import { STATUS } from '../constants/fight';

export const STORY = 'stage/story';
export const TREE = 'stage/tree';
export const FIGHT = 'stage/fight';
export const CHOICE = 'stage/choice';
export const PUZZLE = 'stage/puzzle';
export const SLEEPING = 'stage/sleeping';
export const ENEMY = 'stage/enemy';

const AGREE = 'option/agree';
const DENY = 'option/deny';

/**
 * белки воздушные - урон от земли
 * суслики земляные - урон от воздуха
 * утки водные - урон от огня
 * лисы огненные - урон от воды
 *
 * лесные гномы земляные - урон от воздуха
 * ледяные гномы водные - урон от огня
 * горные гномы воздушные - урон от земли
 * вулканические гномы огненные - урон от воды
 */

export const gameDays = [
	// 1 day - 14 dec
	{
		stages: [
			{
				type: STORY,
				bg: 'kingdom',
				slides: [
					{ text: 'Привет, герой' },
					{ text: 'Ледяные гномы напали на королевство Котогавия' },
					{ text: 'Они украли казну и принцессу' },
					{ text: 'Спаси нас, пожалуйста' },
				],
			},
			{
				type: STORY,
				bg: 'road',
				slides: [{ text: 'Герой отправился в путь' }],
			},
			{
				type: TREE,
			},
			{
				type: STORY,
				bg: 'road',
				slides: [{ text: 'Герой продолжил свой путь' }],
			},
			{
				type: STORY,
				bg: 'country',
				slides: [
					{ text: 'Он увидел деревню' },
					{ text: 'тут его накормили и дали вино' },
					{
						text: 'вино можно поменять на вкусяшки',
						nextText: 'Получить вино',
						action: changeWine(1),
					},
					{ text: 'Остановился на ночлег' },
				],
			},
		],
		ending: SLEEPING,
	},

	// 2 day - 15 dec
	{
		stages: [
			{
				type: STORY,
				bg: 'country',
				slides: [
					{ text: 'Утром герой проснулся от странного шороха' },
					{
						text: 'И на него напали крысы',
						finishText: 'Защищаться',
					},
				],
			},
			{
				id: 'ratsFight',
				type: FIGHT,
			},
			{
				type: STORY,
				checkState: (state) => state.stages.ratsFight === STATUS.win,
				bg: 'country',
				slides: [{ text: 'Победив крыс, герой продолжил свой путь' }],
			},
			{
				type: STORY,
				checkState: (state) => state.stages.ratsFight === STATUS.lose,
				bg: 'country',
				slides: [
					{
						text: 'Сбежав от крыс, герой продолжил свой путь',
					},
				],
			},
			{
				type: STORY,
				bg: 'road',
				slides: [
					{
						text: 'Он шел и шел, пока не наткнулся на грушевое дерево',
					},
				],
			},
			{
				type: TREE,
			},
			{
				type: STORY,
				bg: 'road',
				slides: [
					{ text: 'Подкрепившись, герой продолжил свой путь. ' },
					{ text: 'И шел до позднего вечера' },
				],
			},
		],
	},

	// 3 day - 16 dec
	{
		stages: [
			{
				type: STORY,
				bg: 'road',
				slides: [
					{ text: 'На следующий день герой снова шел' },
					{ text: 'Он увидел грушевое дерево' },
				],
			},
			{
				type: TREE,
			},
			{
				type: STORY,
				bg: 'oldman',
				slides: [
					{
						text: 'Недалеко от дерева герой встретил старого мужчину',
					},
					{ text: 'Тот попросил у него грушу, чтобы поесть' },
				],
			},
			{
				id: 'oldman',
				type: CHOICE,
				bg: 'oldman',
				text: 'Дай грушу, пожалуйста',
				options: [
					{
						id: AGREE,
						text: 'Дать грушу',
						action: changePears(1),
						checkState: (state) => state.pears > 0,
					},
					{ id: DENY, text: 'Не давать' },
				],
			},
			{
				checkState: (state) => state.stages.oldman === AGREE,
				type: STORY,
				bg: 'oldman',
				slides: [
					{ text: 'спасибо за помощь' },
					{
						text: 'держи противоядие от укусов гигантских божьих коровок',
						nextText: 'Взять',
						action: addMedicine(),
					},
				],
			},
			{
				checkState: (state) => state.stages.oldman === DENY,
				type: STORY,
				bg: 'oldman',
				slides: [{ text: 'старик расстроился и ушел' }],
			},
			{
				type: STORY,
				bg: 'road',
				slides: [
					{ text: 'герой шел-шел' },
					{ text: 'и вдруг почувствовал сильнейший укус' },
				],
			},
			{
				type: STORY,
				bg: 'insect',
				slides: [
					{ text: 'это было страшная гигантская божья коровка' },
					{ text: 'его рука опухла' },
				],
			},
			{
				id: 'insect',
				type: CHOICE,
				bg: 'insect',
				text: 'Нужно что-то сделать',
				options: [
					{
						id: 'medicine',
						text: 'Принять лекарство',
						checkState: (state) => state.medicine,
						action: removeMedicine(),
					},
					{
						id: 'lose',
						text: 'Потерять здоровье',
						action: changeHealth(-1),
					},
				],
			},
			{
				type: STORY,
				bg: 'road',
				slides: [
					{ text: 'немного отдохнув, герой снова собрался в путь' },
					{ text: 'Герой шел до позднего вечера' },
				],
			},
		],
	},

	// 17 dec
	{
		stages: [
			{
				type: STORY,
				slides: [{ text: 'утро 4 дня' }],
			},
			{
				type: TREE,
			},
			{
				type: STORY,
				slides: [
					{ text: 'Герой зашел в синий лес' },
					{
						text: 'Герой шел-шел через лес и наткнулся на непреодолимую стену из колючек',
					},
					{ text: 'Рядом стоял Леший' },
					{
						text: 'Чтобы пройти дальше, герой должен решить загадку',
					},
				],
			},
			{
				id: 'blueForestPuzzle',
				type: PUZZLE,
				magic: FIRE,
			},
			{
				type: STORY,
				slides: [
					{ text: 'Преодолев препятствие, герой продолжил путь' },
					{ text: 'И шел спокойно по лесу до самого вечера' },
				],
			},
		],
	},

	// 18 dec
	{
		stages: [
			{
				type: STORY,
				slides: [
					{ text: 'Утром герой проснулся от шума' },
					{ text: 'Его окружила толпа маленьких лесных гномов' },
					{
						text: 'Они были намного меньше своих ледяных собратьев, но такие же вредные',
					},
					{ text: 'Они напали на героя' },
				],
			},
			{
				id: 'forestDwarfsFight',
				type: FIGHT,
				magic: AIR,
			},
			{
				type: STORY,
				slides: [{ text: 'Герой продолжил путь' }],
			},
			{
				type: TREE,
			},
			{
				type: STORY,
				slides: [
					{ text: 'Остаток дня прошел спокойно' },
					{ text: 'Герой остановился на ночлег в лесу' },
				],
			},
		],
		engind: 'sleeping',
	},

	// 19 dec
	{
		stages: [
			{
				type: STORY,
				slides: [
					{ text: 'Утром герой наткнулся на грушевого суслика' },
					{ text: 'Он знал, что эти звери любят груши' },
					{
						text: 'Они собирают их и делают большие запасы в своих норах',
					},
					{
						text: 'Но также он знал, что грушевые суслики очень агрессивны и часто нападают стаями',
					},
				],
			},
			{
				id: 'gopher',
				type: CHOICE,
				text: 'Пойти за сусликом?',
				options: [
					{ id: AGREE, text: 'Пойти' },
					{ id: DENY, text: 'Не пойти' },
				],
			},
			{
				checkState: (state) => state.stages.gopher === DENY,
				type: STORY,
				slides: [
					{ text: 'Благоразумный герой решил не рисковать' },
					{ text: 'Весь день он спокойно брел по лесу' },
					{
						text: 'По пути он нашел потерянную бутылку вина',
						nextText: 'Подобрать',
						action: changeWine(1),
					},
					{ text: 'А потом устроился на ночлег' },
				],
			},
			{
				checkState: (state) => state.stages.gopher === AGREE,
				type: STORY,
				slides: [
					{
						text: 'герой нашел нору сусликов, а в ней кучу груш ',
						nextText: 'Забрать',
						action: changePears(7),
					},
					{
						text: 'но когда он вышел наружу, его уже поджидала стая злых сусликов',
					},
					{
						text: 'герой поел, чтобы быть полным сил',
						nextText: 'Восстановить силы',
						action: fillHealth(),
					},
				],
			},
			{
				id: 'gopherFight',
				checkState: (state) => state.stages.gopher === AGREE,
				type: FIGHT,
				magic: WATER,
			},
			{
				id: 'evening',
				checkState: (state) => state.stages.gopher === AGREE,
				type: STORY,
				slides: [
					{
						text: 'герой поспешил убраться подальше от логова сусликов',
					},
					{ text: 'он очень устал и устроился на ночлег в лесу' },
				],
			},
		],
		ending: 'sleeping',
	},

	// 20 dec
	{
		stages: [
			{
				type: STORY,
				slides: [
					{
						text: 'наконец спустя несколько дней герой выбрался из Синего леса',
					},
				],
			},
			{
				type: TREE,
			},
			{
				type: STORY,
				slides: [
					{ text: 'по пути герой  встретил подозрительного каджита' },
					{ text: 'Он предложил ему купить сидр за несколько груш ' },
				],
			},
			{
				id: 'kajit',
				type: CHOICE,
				text: 'Купишь сидр?',
				options: [
					{
						id: AGREE,
						text: 'Купить',
						checkState: (state) => state.pears >= 3,
						action: changePears(3),
					},
					{ id: DENY, text: 'Не покупать' },
				],
			},
			{
				checkState: (state) => state.stages.kajit === AGREE,
				type: STORY,
				slides: [
					{
						text: 'Каджит отдал герою сидр',
						nextText: 'Забрать сидр',
						action: changeCider(1),
					},
					{ text: 'герой пошел дальше' },
				],
			},
			{
				checkState: (state) => state.stages.kajit === DENY,
				type: STORY,
				slides: [
					{ text: 'Каджит выглядел расстроенным' },
					{
						text: 'герой продолжил свой путь, но скоро обнаружил, что у него пропали груши',
						nextText: 'Проклятый вор!',
						action: changePears(-1),
					},
					{
						text: 'герой очень расстроился и пошел дальше расстроенный',
					},
				],
			},
		],
	},

	// 21 dec
	{
		stages: [
			{
				type: STORY,
				slides: [
					{
						text: 'На следующий день герой пришел в большой город Котявск',
					},
					{ text: 'Он знал, что здесь много воров и мошенников' },
					{
						text: 'Первым делом герой пошел к местному волшебнику, чтобы пополнить свой запас заклинаний',
					},
				],
			},
			{
				id: 'wizard',
				type: CHOICE,
				text: '1 золотой за заклинание, деньги вперед',
				options: [
					{
						id: AGREE,
						text: 'Заплатить',
						checkState: (state) => state.gold >= 1,
						action: changeGold(-1),
					},
					{ id: DENY, text: 'Отказаться' },
				],
			},
			{
				id: 'wizardMagic',
				checkState: (state) => state.stages.wizard === AGREE,
				type: CHOICE,
				text: 'Какое заклинание взять',
				options: [
					{ id: 'fire', text: 'огонь', action: changeMagic(FIRE, 1) },
					{
						id: 'water',
						text: 'вода',
						action: changeMagic(WATER, 1),
					},
					{ id: 'air', text: 'воздух', action: changeMagic(AIR, 1) },
					{
						id: 'ground',
						text: 'земля',
						action: changeMagic(GROUND, 1),
					},
					{ id: 'refund', text: 'отказаться', action: changeGold(1) },
				],
			},
			{
				id: 'question',
				type: CHOICE,
				text: 'Задать вопрос волшебнику',
				options: [
					{ id: 'hotels', text: 'Какой отель лучше выбрать?' },
					{ id: 'magics', text: 'Расскажи больше о магии' },
				],
			},
			{
				checkState: (state) => state.stages.question === 'hotels',
				type: STORY,
				slides: [{ text: 'Волшебник рассказал про местные отели' }],
			},
			{
				checkState: (state) => state.stages.question === 'magics',
				type: STORY,
				slides: [{ text: 'Волшебник рассказал про магию' }],
			},
			{
				id: 'question2',
				type: CHOICE,
				text: 'Задать вопрос волшебнику',
				options: [
					{
						id: 'hotels',
						text: 'Какой отель лучше выбрать?',
						checkState: (state) =>
							state.stages.question === 'magics',
					},
					{
						id: 'magics',
						text: 'Расскажи больше о магии',
						checkState: (state) =>
							state.stages.question === 'hotels',
					},
				],
			},
			{
				checkState: (state) => state.stages.question2 === 'hotels',
				type: STORY,
				slides: [
					{ text: 'Волшебник рассказал про местные отели (кратко)' },
				],
			},
			{
				checkState: (state) => state.stages.question2 === 'magics',
				type: STORY,
				slides: [{ text: 'Волшебник рассказал про магию (кратко)' }],
			},
			{
				type: STORY,
				slides: [
					{ text: 'После волшебника герой пошел искать гостиницу' },
				],
			},
			{
				id: 'hotel',
				type: CHOICE,
				text: 'Выбрать гостиницу',
				options: [
					{
						id: 'rats',
						text: 'Крысиная',
						action: changeMagic(GROUND, 1),
					},
					{
						id: 'gophers',
						text: 'Сусликовая',
						action: changeMagic(AIR, 1),
					},
					{
						id: 'cats',
						text: 'Кошачья',
						action: changeMagic(WATER, 1),
					},
					{
						id: 'elephants',
						text: 'Слоновья',
						action: changeMagic(FIRE, 1),
					},
				],
			},
			{
				type: STORY,
				slides: [
					{
						text: 'Выбрав гостиницу герой сразу лег спать и проспал всю ночь',
					},
				],
			},
		],
		ending: SLEEPING,
	},

	// 22 dec
	{
		stages: [
			{
				type: STORY,
				slides: [
					{
						text: 'Утром герой подкрепился и отправился в путь',
						nextText: 'Восстановить силы',
						action: fillHealth(),
					},
					{
						text: 'Прежде чем он вышел, хозяин гостиницы предложил ему купить броню',
					},
				],
			},
			{
				type: CHOICE,
				img: 'armor',
				options: [
					{
						id: 'armor1',
						text: 'Купить тяжелую за 2 золотых',
						checkState: (state) => state.gold >= 2,
						action: buyArmor(2, 2),
					},
					{
						id: 'armor1',
						text: 'Купить легкую за 1 золотой',
						checkState: (state) => state.gold >= 1,
						action: buyArmor(1, 1),
					},
					{ id: DENY, text: 'Не покупать' },
				],
			},
			{
				type: STORY,
				slides: [
					{ text: 'Он шел-шел, пока не дошел до бурной реки' },
					{ text: 'Моста нет, брода нет, никак не перейти' },
				],
			},
			{
				id: 'river',
				type: CHOICE,
				text: 'Что делать?',
				options: [
					{
						id: 'power',
						text: 'Использовать силу',
						checkState: (state) => state.power,
						action: applyPower(),
					},
					{
						id: 'water',
						text: 'Использовать магию воды',
						checkState: (state) => state.magic[WATER] > 0,
						action: changeMagic(WATER, -1),
					},
					{
						id: 'air',
						text: 'Использовать магию воздуха',
						checkState: (state) => state.magic[AIR] > 0,
						action: changeMagic(AIR, -1),
					},
					{
						id: 'ground',
						text: 'Использовать магию земли',
						checkState: (state) => state.magic[GROUND] > 0,
						action: changeMagic(GROUND, -1),
					},
					{
						id: 'none',
						text: 'Попытаться пройти',
					},
				],
			},
			{
				type: STORY,
				checkState: (state) => state.stages.river === 'power',
				slides: [{ text: 'Герой легко переплыл реку' }],
			},
			{
				type: STORY,
				checkState: (state) => state.stages.river === 'air',
				slides: [{ text: 'Герой легко перелетел реку' }],
			},
			{
				type: STORY,
				checkState: (state) => state.stages.river === 'water',
				slides: [{ text: 'Герой заморозил реку и легко перешел' }],
			},
			{
				type: STORY,
				checkState: (state) => state.stages.river === 'ground',
				slides: [
					{
						text: 'Герой свалил большое дерево и сделал из него мост',
					},
				],
			},
			{
				type: STORY,
				checkState: (state) => state.stages.river === 'none',
				slides: [
					{
						text: 'Герой с трудом переплыл реку',
						nextText: 'И очень устал',
						action: loseHealth(),
					},
				],
			},
			{
				type: STORY,
				slides: [
					{
						text: 'На другой стороне герой нашел золото',
						nextText: 'Взять',
						action: changeGold(1),
					},
					{ text: 'герой пошел дальше' },
				],
			},
			{
				type: TREE,
			},
			{
				type: STORY,
				slides: [
					{
						text: 'Герой шел до самого вечера и устроился на ночлег в придорожной гостинице',
					},
				],
			},
		],
		ending: SLEEPING,
	},

	// 23 dec
	{
		stages: [
			{
				type: STORY,
				slides: [{ text: 'герой шел и наткнулся на горящий дом' }],
			},
			{
				id: 'fire',
				type: CHOICE,
				text: 'Что делать?',
				options: [
					{
						id: 'water',
						text: 'Использовать магию воды',
						checkState: (state) => state.magic[WATER] > 0,
						action: changeMagic(WATER, 1),
					},
					{
						id: 'fire',
						text: 'Использовать магию огня',
						checkState: (state) => state.magic[FIRE] > 0,
						action: changeMagic(FIRE, 1),
					},
					{
						id: 'ground',
						text: 'Использовать магию земли',
						checkState: (state) => state.magic[GROUND] > 0,
						action: changeMagic(GROUND, 1),
					},
					{
						id: 'power',
						text: 'Использовать силу',
						checkState: (state) => state.power,
						action: applyPower(),
					},
					{
						id: 'none',
						text: 'Ничего не делать',
					},
				],
			},
			{
				type: STORY,
				checkState: (state) => state.stages.fire === 'water',
				slides: [
					{ text: 'герой смог потушить дом, но залил его водой' },
					{
						text: 'благодарные жители отблагодарили его золотом',
						nextText: 'Принять',
						action: changeGold(1),
					},
				],
			},
			{
				type: STORY,
				checkState: (state) => state.stages.fire === 'ground',
				slides: [
					{ text: 'герой смог потушить дом, но засыпал его землей' },
					{
						text: 'благодарные жители отблагодарили его золотом',
						nextText: 'Принять',
						action: changeGold(1),
					},
				],
			},
			{
				type: STORY,
				checkState: (state) => state.stages.fire === 'fire',
				slides: [
					{ text: 'герой успокоил огонь, дом почти не пострадал' },
					{
						text: 'благодарные жители отблагодарили его золотом',
						nextText: 'Принять',
						action: changeGold(2),
					},
				],
			},
			{
				type: STORY,
				checkState: (state) => state.stages.fire === 'power',
				slides: [
					{ text: 'герой смог вынести жителей, дом сгорел' },
					{
						text: 'благодарные жители отблагодарили его вином',
						nextText: 'Принять',
						action: changeWine(1),
					},
				],
			},
			{
				type: STORY,
				checkState: (state) => state.stages.fire === 'none',
				slides: [
					{ text: 'герой ничего не смог сделать' },
					{
						text: 'жителям удалось спастись, но дом полностью сгореел',
					},
				],
			},
			{
				type: STORY,
				slides: [
					{ text: 'герой шел-шел и дошел до небольшой деревушки' },
					{
						text: 'местные не хотели пускать его, потому что думали, что он ледяной гном',
					},
					{ text: 'герою пришлось пройти проверку' },
				],
			},
			{
				id: 'countryPuzzle',
				type: PUZZLE,
				magic: AIR,
			},
			{
				type: STORY,
				slides: [
					{
						text: 'герой устроился на ночлег',
					},
				],
			},
		],
		ending: SLEEPING,
	},

	// 24 dec
	{
		stages: [
			{
				type: STORY,
				slides: [
					{ text: 'В деревне нашелся волшебник' },
					{ text: 'герой решил купить заклинание' },
				],
			},
			{
				id: 'countryWizard',
				type: CHOICE,
				text: 'заклинание стоит 2 золотых, деньги вперед',
				options: [
					{
						id: AGREE,
						text: 'Заплатить',
						checkState: (state) => state.gold >= 2,
						action: changeGold(-2),
					},
					{ id: DENY, text: 'Отказаться' },
				],
			},
			{
				id: 'countryMagic',
				checkState: (state) => state.stages.countryWizard === AGREE,
				type: CHOICE,
				text: 'выбрать заклинание',
				options: [
					{
						id: 'water',
						text: 'Вода',
						action: changeMagic(WATER, 1),
					},
					{
						id: 'ground',
						text: 'Земля',
						action: changeMagic(GROUND, 1),
					},
					{ id: 'air', text: 'Воздух', action: changeMagic(AIR, 1) },
					{ id: 'fire', text: 'Огонь', action: changeMagic(FIRE, 1) },
					{
						id: 'none',
						text: 'Верните деньги',
						action: changeGold(2),
					},
				],
			},
			{
				type: STORY,
				slides: [
					{
						text: 'не успел герой закончить разговор с волшебником, как на деревню напали',
					},
					{ text: 'небольшой отряд белок-убийц атаковал деревню ' },
				],
			},
			{
				id: 'squirrelsFight',
				type: FIGHT,
				magic: GROUND,
			},
			{
				type: STORY,
				slides: [
					{ text: 'герой понял, какая ужасная ситуация в стране' },
					{ text: 'и поспешил выполнить свою миссию' },
				],
			},
		],
	},

	// 25 dec
	{
		stages: [
			{
				type: STORY,
				slides: [
					{
						text: 'На следующее утро герой продолжил путь',
						nextText: 'Восстановить силы',
						action: fillHealth(),
					},
					{
						text: 'Он приближается к территории врага - стране ледяных гномов',
					},
					{
						text: 'Это негостеприимная тундровая местность, покрытая пролесками и кустами',
					},
				],
			},
			{
				type: TREE,
			},
			{
				type: STORY,
				slides: [
					{
						text: 'Герой прошел некоторое расстояние и наткнулся на королевского оленя',
					},
				],
			},
			{
				id: 'deer',
				type: CHOICE,
				text: 'Что сделать?',
				options: [
					{
						id: AGREE,
						text: 'Угостить оленя грушей',
						checkState: (state) => state.pears >= 1,
						action: changePears(-1),
					},
					{ id: DENY, text: 'Не трогать оленя' },
				],
			},
			{
				checkState: (state) => state.stages.deer === AGREE,
				type: STORY,
				slides: [
					{ text: 'Олень принял угощение' },
					{
						text: 'Герой продолжил путь, а животное последовало за ним, в нескольких шагах позади',
					},
				],
			},
			{
				type: STORY,
				slides: [
					{
						text: 'герой подошел к глубокой расщелине, за которой начиналась территория ледяных гномов',
					},
				],
			},
			{
				id: 'hole',
				type: CHOICE,
				text: 'Что делать?',
				options: [
					{
						id: 'deer',
						text: 'Перескочить верхом на олене',
						checkState: (state) => state.stages.deer === AGREE,
					},
					{
						id: 'air',
						text: 'Использовать магию воздуха',
						checkState: (state) => state.magic[AIR] >= 1,
						action: changeMagic(AIR, -1),
					},
					{
						id: 'brain',
						text: 'Раскинуть мозгами',
					},
					{
						id: 'walk',
						text: 'Искать пути обхода',
					},
				],
			},
			{
				checkState: (state) => state.stages.hole === 'brain',
				type: PUZZLE,
			},
			{
				checkState: (state) => state.stages.hole === 'wall',
				type: STORY,
				slides: [
					{
						text: 'Герой долго шел и очень устал',
						action: loseHealth(),
					},
				],
			},
		],
	},

	// 26 dec
	{
		stages: [
			{
				type: STORY,
				slides: [
					{
						text: 'Перед ним стоял гигантский лесной гном с огромной булавой',
					},
				],
			},
			{
				type: ENEMY,
				lives: 20,
				shot: 2,
				options: [
					{
						id: 'power',
						text: 'Силой',
						checkState: (state) => state.power,
						damage: (state) => 2 + state.armor,
						action: applyPower(),
						description: (state) =>
							state.armor
								? 'Броня усилила удар'
								: 'Герой нанес сильный удар',
					},
					{
						id: 'fire',
						text: 'Магией огня',
						checkState: (state) => state.magic[FIRE] >= 1,
						damage: 1,
						action: changeMagic(FIRE, -1),
						description: 'Вы нанесли урон',
					},
					{
						id: 'ground',
						text: 'Магией земли',
						checkState: (state) => state.magic[GROUND] >= 1,
						damage: 0,
						action: changeMagic(GROUND, -1),
						description: 'Лесной гном не боится земли',
					},
					{
						id: 'air',
						text: 'Магией воздуха',
						checkState: (state) => state.magic[AIR] >= 1,
						damage: 4,
						action: changeMagic(AIR, -1),
						description:
							'Лесной гном боится воздуха, правильный выбор',
					},
					{
						id: 'water',
						text: 'Магией воды',
						checkState: (state) => state.magic[WATER] >= 1,
						damage: 1,
						action: changeMagic(WATER, -1),
						description: 'Вы нанесли урон',
					},
					{
						id: 'pears',
						text: 'Закидать грушами',
						checkState: (state) => state.pears >= 5,
						damage: 5,
						action: changePears(5),
						description: 'Груши - универсальный предмет',
					},
					{
						id: 'cider',
						text: 'Напоить сидром',
						checkState: (state) => state.cider > 0,
						damage: 20,
						action: changeCider(-1),
						description: 'Напившись сидра враг уснул',
					},
					{
						id: 'pet',
						text: 'Натравить питомца',
						checkState: (state) => state.pet,
						damage: 10,
						action: applyPet(),
						description:
							'Ваш питомец наносит урон врагу. Питомец устал',
					},
					{
						id: 'gold',
						text: 'Подкупить золотом',
						checkState: (state) => state.gold >= 5,
						damage: 20,
						action: changeGold(-5),
						description: 'Вам удалось подкупить врага',
					},
					{
						id: 'brain',
						text: 'Перехитрить',
						puzzle: true,
						damage: 20,
						description: 'Вам удалось перехитрить врага',
					},
				],
			},
		],
	},

	// 27 dec
	{
		stages: [
			{
				type: STORY,
				slides: [
					{
						text: 'Герой пробирался по замку и наткнулся на ловушку',
					},
				],
			},
			{
				type: PUZZLE,
			},
		],
	},

	// 28 dec
	{
		stages: [
			{
				type: STORY,
				slides: [
					{
						text: 'Перед ним стоял гигантский вулканический гном с огромной булавой',
					},
				],
			},
			{
				type: ENEMY,
				lives: 20,
				shot: 2,
				options: [
					{
						id: 'power',
						text: 'Силой',
						checkState: (state) => state.power,
						damage: (state) => 2 + state.armor,
						action: applyPower(),
						description: (state) =>
							state.armor
								? 'Броня усилила удар'
								: 'Герой нанес сильный удар',
					},
					{
						id: 'fire',
						text: 'Магией огня',
						checkState: (state) => state.magic[FIRE] >= 1,
						damage: 0,
						action: changeMagic(FIRE, -1),
						description: 'Вулканический гном не боится огня',
					},
					{
						id: 'ground',
						text: 'Магией земли',
						checkState: (state) => state.magic[GROUND] >= 1,
						damage: 1,
						action: changeMagic(GROUND, -1),
						description: 'Вы нанесли урон',
					},
					{
						id: 'air',
						text: 'Магией воздуха',
						checkState: (state) => state.magic[AIR] >= 1,
						damage: 1,
						action: changeMagic(AIR, -1),
						description: 'Вы нанесли урон',
					},
					{
						id: 'water',
						text: 'Магией воды',
						checkState: (state) => state.magic[WATER] >= 1,
						damage: 4,
						action: changeMagic(WATER, -1),
						description:
							'Вулканический гном боится воды, правильный выбор',
					},
					{
						id: 'pears',
						text: 'Закидать грушами',
						checkState: (state) => state.pears >= 5,
						damage: 5,
						action: changePears(5),
						description: 'Груши - универсальный предмет',
					},
					{
						id: 'cider',
						text: 'Напоить сидром',
						checkState: (state) => state.cider > 0,
						damage: 20,
						action: changeCider(-1),
						description: 'Напившись сидра враг уснул',
					},
					{
						id: 'pet',
						text: 'Натравить питомца',
						checkState: (state) => state.pet,
						damage: 10,
						action: applyPet(),
						description:
							'Ваш питомец наносит урон врагу. Питомец устал',
					},
					{
						id: 'gold',
						text: 'Подкупить золотом',
						checkState: (state) => state.gold >= 5,
						damage: 20,
						action: changeGold(-5),
						description: 'Вам удалось подкупить врага',
					},
					{
						id: 'brain',
						text: 'Перехитрить',
						puzzle: true,
						damage: 20,
						description: 'Вам удалось перехитрить врага',
					},
				],
			},
		],
	},

	// 29 dec
	{
		stages: [
			{
				type: STORY,
				slides: [
					{ text: 'Герой пробирался по замку' },
					{ text: 'Вдруг на него напала стая злобных белок' },
				],
			},
			{
				type: FIGHT,
				magic: GROUND,
			},
		],
	},

	// 30 dec
	{
		stages: [
			{
				type: STORY,
				slides: [
					{
						text: 'Перед ним стоял гигантский ледяной гном с огромной булавой',
					},
				],
			},
			{
				type: ENEMY,
				lives: 20,
				shot: 2,
				options: [
					{
						id: 'power',
						text: 'Силой',
						checkState: (state) => state.power,
						damage: (state) => 2 + state.armor,
						action: applyPower(),
						description: (state) =>
							state.armor
								? 'Броня усилила удар'
								: 'Герой нанес сильный удар',
					},
					{
						id: 'fire',
						text: 'Магией огня',
						checkState: (state) => state.magic[FIRE] >= 1,
						damage: 4,
						action: changeMagic(FIRE, -1),
						description:
							'Лдяной гном  боится огня, правильный выбор',
					},
					{
						id: 'ground',
						text: 'Магией земли',
						checkState: (state) => state.magic[GROUND] >= 1,
						damage: 1,
						action: changeMagic(GROUND, -1),
						description: 'Вы нанесли урон',
					},
					{
						id: 'air',
						text: 'Магией воздуха',
						checkState: (state) => state.magic[AIR] >= 1,
						damage: 1,
						action: changeMagic(AIR, -1),
						description: 'Вы нанесли урон',
					},
					{
						id: 'water',
						text: 'Магией воды',
						checkState: (state) => state.magic[WATER] >= 1,
						damage: 0,
						action: changeMagic(WATER, -1),
						description: 'Ледяной гном не боится воды',
					},
					{
						id: 'pears',
						text: 'Закидать грушами',
						checkState: (state) => state.pears >= 5,
						damage: 5,
						action: changePears(5),
						description: 'Груши - универсальный предмет',
					},
					{
						id: 'cider',
						text: 'Напоить сидром',
						checkState: (state) => state.cider > 0,
						damage: 20,
						action: changeCider(-1),
						description: 'Напившись сидра враг уснул',
					},
					{
						id: 'pet',
						text: 'Натравить питомца',
						checkState: (state) => state.pet && !state.petUsed,
						damage: 10,
						action: applyPet(),
						description:
							'Ваш питомец наносит урон врагу. Питомец устал',
					},
					{
						id: 'gold',
						text: 'Подкупить золотом',
						checkState: (state) => state.gold >= 5,
						damage: 20,
						action: changeGold(-5),
						description: 'Вам удалось подкупить врага',
					},

					{
						id: 'brain',
						text: 'Перехитрить',
						puzzle: true,
						damage: 20,
						description: 'Вам удалось перехитрить врага',
					},
				],
			},
		],
	},

	// 31 dec
	{
		stages: [
			{
				type: STORY,
				slides: [{ text: 'Объяснить все' }],
			},
		],
	},
];
