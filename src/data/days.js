import {
	addCider,
	addMedicine,
	changeHealth,
	changePears,
	changeWine,
	removeMedicine,
} from '../store/actions';

export const gameDays = [
	// day 1
	{
		stages: [
			{
				id: 'start',
				type: 'story',
				slides: [
					{ text: 'Привет, герой' },
					{ text: 'Ледяные гномы напали на королевство Котогавия' },
					{ text: 'Они украли казну и принцессу' },
					{ text: 'Спаси нас, пожалуйста' },
				],
			},
			{
				id: 'tree',
				type: 'tree',
			},
			{
				id: 'country',
				type: 'story',
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
		ending: 'sleeping',
	},

	// day 2
	{
		stages: [
			{
				id: 'morning',
				type: 'story',
				slides: [
					{ text: 'Утром герой проснулся' },
					{
						text: 'И на него напали крысы',
						finishText: 'Защищаться',
					},
				],
			},
			{
				id: 'fight',
				type: 'fight',
			},
			{
				id: 'afterFight1',
				type: 'story',
				checkDayData: (dayData) => dayData.fight === 'win',
				slides: [{ text: 'Победив крыс, герой продолжил свой путь' }],
			},
			{
				id: 'afterFight2',
				type: 'story',
				check: (dayData) => dayData.fight === 'lose',
				slides: [
					{
						text: 'Сбежав от крыс, герой продолжил свой путь',
					},
				],
			},
			{
				id: 'tree',
				type: 'tree',
			},
			{
				id: 'evening',
				type: 'story',
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
				id: 'morning',
				type: 'story',
				slides: [{ text: 'На следующий день герой снова шел' }],
			},
			{
				id: 'tree',
				type: 'tree',
			},
			{
				id: 'oldman',
				type: 'story',
				slides: [
					{
						text: 'Недалеко от дерева герой встретил старого мужчину',
					},
					{ text: 'Тот попросил у него грушу, чтобы поесть' },
				],
			},
			{
				id: 'choice',
				type: 'choice',
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
				id: 'agree',
				checkDayData: (dayData) => dayData.choice === 'agree',
				type: 'story',
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
				id: 'deny',
				checkDayData: (dayData) => dayData.choice === 'deny',
				type: 'story',
				slides: [{ text: 'старик расстроился и ушел' }],
			},
			{
				id: 'insect',
				type: 'story',
				slides: [
					{ text: 'герой шел-шел' },
					{ text: 'и вдруг почувствовал сильнейший укус' },
					{ text: 'это было страшная гигантская божья коровка' },
					{ text: 'его рука опухла' },
					{ text: 'нужно что-то делать' },
				],
			},
			{
				id: 'bite',
				type: 'choice',
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
				id: 'evening',
				type: 'story',
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
				id: 'morning',
				type: 'story',
				slides: [{ text: 'утро 4 дня' }],
			},
			{
				id: 'tree',
				type: 'tree',
			},
			{
				id: 'forest',
				type: 'story',
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
				id: 'puzzle',
				type: 'puzzle',
        magic: 'fire'
			},
			{
				id: 'evening',
				type: 'story',
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
				id: 'dwarfs',
				type: 'story',
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
				id: 'fight',
				type: 'fight',
        magic: 'fire'
			},
			{
				id: 'road',
				type: 'story',
				slides: [{ text: 'Герой продолжил путь' }],
			},
			{
				id: 'tree',
				type: 'tree',
			},
			{
				id: 'evening',
				type: 'story',
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
				id: 'gopher',
				type: 'story',
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
				id: 'choice',
				type: 'choice',
				text: 'Пойти за сусликом?',
				options: [
					{ id: 'agree', text: 'Пойти' },
					{ id: 'deny', text: 'Не пойти' },
				],
			},
			{
				id: 'deny',
				checkDayData: (dayData) => dayData.choice === 'deny',
				type: 'story',
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
				id: 'burrow',
				checkDayData: (dayData) => dayData.choice === 'agree',
				type: 'story',
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
				id: 'fight',
				checkDayData: (dayData) => dayData.choice === 'agree',
				type: 'fight',
			},
			{
				id: 'evening',
				checkDayData: (dayData) => dayData.choice === 'agree',
				type: 'story',
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
				id: 'morning',
				type: 'story',
				slides: [
					{
						text: 'наконец спустя несколько дней герой выбрался из Синего леса',
					},
				],
			},
			{
				id: 'tree',
				type: 'tree',
			},
			{
				id: 'kajit',
				type: 'story',
				slides: [
					{ text: 'по пути герой  встретил подозрительного каджита' },
					{ text: 'Он предложил ему купить сидр за несколько груш ' },
				],
			},
			{
				id: 'choice',
				type: 'choice',
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
				id: 'cider',
				checkDayData: (dayData) => dayData.choice === 'agree',
				type: 'story',
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
				id: 'robbery',
				checkDayData: (dayData) => dayData.choice === 'deny',
				type: 'story',
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
				id: 'city',
				type: 'story',
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
        id: 'magic',
        type: 'choice',

      }
		],
		ending: 'sleeping',
	},
];
