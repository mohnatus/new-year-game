import {
	addCider,
	addMedicine,
	changeGold,
	changeHealth,
	changeMagic,
	changePears,
	changeWine,
	removeMedicine,
} from '../store/actions';
import { AIR, FIRE, GROUND, WATER } from './magic';

export const STORY = 'stage/story';
export const TREE = 'stage/tree';
export const FIGHT = 'stage/fight';
export const CHOICE = 'stage/choice';
export const PUZZLE = 'stage/puzzle';
export const SLEEPING = 'stage/sleeping';

export const gameDays = [
	// day 1
	{
		stages: [
			{
				type: STORY,
				slides: [
					{ text: 'Привет, герой' },
					{ text: 'Ледяные гномы напали на королевство Котогавия' },
					{ text: 'Они украли казну и принцессу' },
					{ text: 'Спаси нас, пожалуйста' },
				],
			},
			{
				type: TREE,
			},
			{
				type: STORY,
				slides: [
					{ text: 'Герой продолжил свой путь' },
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

	// day 2
	{
		stages: [
			{
				type: STORY,
				slides: [
					{ text: 'Утром герой проснулся' },
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
				checkState: (state) => state.stages.ratsFight === 'win',
				slides: [{ text: 'Победив крыс, герой продолжил свой путь' }],
			},
			{
				type: STORY,
				checkState: (state) => state.stages.ratsFight === 'lose',
				slides: [
					{
						text: 'Сбежав от крыс, герой продолжил свой путь',
					},
				],
			},
			{
				type: TREE,
			},
			{
				type: STORY,
				slides: [
					{ text: 'Подкрепившись, герой продолжил свой путь. ' },
					{ text: 'И шел до позднего вечера' },
				],
			},
		],
	},

	// day 3
	{
		stages: [
			{
				type: STORY,
				slides: [{ text: 'На следующий день герой снова шел' }],
			},
			{
				type: TREE,
			},
			{
				type: STORY,
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
				text: 'Дай грушу, пожалуйста',
				options: [
					{
						id: 'agree',
						text: 'Дать грушу',
						action: changePears(1),
						checkState: (state) => state.pears > 0,
					},
					{ id: 'deny', text: 'Не давать' },
				],
			},
			{
				checkState: (state) => state.oldman === 'agree',
				type: STORY,
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
				checkState: (state) => state.choice === 'deny',
				type: STORY,
				slides: [{ text: 'старик расстроился и ушел' }],
			},
			{
				type: STORY,
				slides: [
					{ text: 'герой шел-шел' },
					{ text: 'и вдруг почувствовал сильнейший укус' },
					{ text: 'это было страшная гигантская божья коровка' },
					{ text: 'его рука опухла' },
					{ text: 'нужно что-то делать' },
				],
			},
			{
				id: 'insect',
				type: CHOICE,
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
				slides: [
					{ text: 'немного отдохнув, герой снова собрался в путь' },
					{ text: 'Герой шел до позднего вечера' },
				],
			},
		],
	},

	// day 4
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

	// day 5
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
				id: 'dwarfsFight',
				type: FIGHT,
				magic: FIRE,
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

	// day 6
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
					{ id: 'agree', text: 'Пойти' },
					{ id: 'deny', text: 'Не пойти' },
				],
			},
			{
				checkState: (state) => state.gopher === 'deny',
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
				checkState: (state) => state.gopher === 'agree',
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
				],
			},
			{
				id: 'gopherFight',
				checkState: (state) => state.gopher === 'agree',
				type: FIGHT,
			},
			{
				id: 'evening',
				checkState: (state) => state.gopher === 'agree',
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

	// day 7
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
						id: 'agree',
						text: 'Купить',
						checkState: (state) => state.pears >= 3,
						action: changePears(3),
					},
					{ id: 'deny', text: 'Не покупать' },
				],
			},
			{
				checkState: (state) => state.kajit === 'agree',
				type: STORY,
				slides: [
					{
						text: 'Каджит отдал герою сидр',
						nextText: 'Забрать сидр',
						action: addCider(),
					},
					{ text: 'герой пошел дальше' },
				],
			},
			{
				checkState: (state) => state.kajit === 'deny',
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

	// day 8
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
						id: 'agree',
						text: 'Заплатить',
						checkState: (state) => state.gold >= 1,
						action: changeGold(-1),
					},
					{ id: 'deny', text: 'Отказаться' },
				],
			},
			{
				id: 'wizardMagic',
				checkState: state => state.wizard === 'agree',
				type: CHOICE,
				text: 'Какое заклинание взять',
				options: [
					{ id: 'fire', text: 'огонь', action: changeMagic(FIRE, 1) },
					{ id: 'water', text: 'вода', action: changeMagic(WATER, 1) },
					{ id: 'air', text: 'воздух', action: changeMagic(AIR, 1) },
					{ id: 'ground', text: 'земля', action: changeMagic(GROUND, 1) },
					{ id: 'refund', text: 'отказаться', action: changeGold(1) }
				],
			},

			{
				checkState: state => state.wizardMagic !== 'refund',
				type: STORY,

			},
			{
				id: 'hotel',
				type: STORY,
				slides: [
					{ text: 'После волшебника герой пошел искать гостиницу'}
				]
			}
		],
		ending: 'sleeping',
	},
];
