import { changePears, changeWine } from '../store/actions';

export const stories = {
	// day 1
	intro: [
		{ text: 'Привет, герой' },
		{ text: 'Ледяные гномы напали на королевство Котогавия' },
		{ text: 'Они украли казну и принцессу' },
		{ text: 'Спаси нас, пожалуйста' },
	],
	// грушевое дерево
	country1: [
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

	// day 2
	country2: [
		{ text: 'Утром герой проснулся' },
		{ text: 'И на него напали крысы', finishText: 'Защищаться' },
	],
	// атака крыс
	road21: [{ text: 'Разобравшись с крысами, герой продолжил свой путь' }],
	// грушевое дерево
	road22: [
		{ text: 'Подкрепившись, герой продолжил свой путь. ' },
		{ text: 'И шел до позднего вечера' },
	],

	// day 3
	morning3: [{ text: 'На следующий день герой снова шел' }],
	// грушевое дерево
	oldman: [
		{ text: 'Недалеко от дерева герой встретил старого мужчину' },
		{ text: 'Тот попросил у него грушу, чтобы поесть' },
	],
	// старик (дает противоядие в обмен на грушу)
	oldmanAgree: [
		{ text: 'спасибо за помощь' },
		{ text: 'держи противоядие от укусов гигантских божьих коровок' },
	],
	oldmanDeny: [{ text: 'старик расстроился и ушел' }],
	insect: [
		{ text: 'герой шел-шел' },
		{ text: 'и вдруг почувствовал сильнейший укус' },
		{ text: 'это было страшная гигантская божья коровка' },
		{ text: 'его рука опухла' },
		{ text: 'нужно что-то делать' },
		// использовать противоядие или потерять здоровье
	],
	evening3: [
		{ text: 'немного отдохнув, герой снова собрался в путь' },
		{ text: 'Герой шел до позднего вечера' },
	],

	// day 4
	morning4: [{ text: 'утро 4 дня' }],
	// грушевое дерево
	forest: [
		{ text: 'Герой зашел в синий лес' },
		{
			text: 'Герой шел-шел через лес и наткнулся на непреодолимую стену из колючек',
		},
		{ text: 'Рядом стоял Леший' },
		{ text: 'Чтобы пройти дальше, герой должен решить загадку' },
	],
	evening4: [
		{ text: 'Преодолев препятствие, герой продолжил путь' },
		{ text: 'И шел спокойно по лесу до самого вечера' },
	],

	// day 5
	forestDwarfs: [
		{ text: 'Утром герой проснулся от шума' },
		{ text: 'Его окружила толпа маленьких лесных гномов' },
		{
			text: 'Они были намного меньше своих ледяных собратьев, но такие же вредные',
		},
		{ text: 'Они напали на героя' },
	],
	// атака лесных гномов
	afterForestDwarfs: [{ text: 'Герой продолжил путь' }],
	// грушевое дерево
	evening5: [
		{ text: 'Остаток дня прошел спокойно' },
		{ text: 'Герой остановился на ночлег в лесу' },
	],

	// day 6
	gopher: [
		{ text: 'Утром герой наткнулся на грушевого суслика' },
		{ text: 'Он знал, что эти звери любят груши' },
		{ text: 'Они собирают их и делают большие запасы в своих норах' },
		{
			text: 'Но также он знал, что грушевые суслики очень агрессивны и часто нападают стаями',
		},
	],
	gophersBurrow: [
		{
			text: 'герой нашел нору сусликов, а в ней кучу груш ',
			nextText: 'Забрать',
			action: changePears(7),
		},
		{
			text: 'но когда он вышел наружу, его уже поджидала стая злых сусликов',
		},
	],
	// атака грушевых сусликов
	evening6: [
		{ text: 'герой поспешил убраться подальше от логова сусликов' },
		{ text: 'он очень устал и устроился на ночлег в лесу' },
	],

	// day 7
	morning7: [
		{
			text: 'наконец спустя несколько дней герой выбрался из Черного леса',
		},
	],
	// грушевое дерево
	kajit: [{ text: 'по пути герой  встретил подозрительного каджита' }],
	// каджит (продаст сидр или ограбит)
	kajitCider: [{ text: 'Каджит отдал герою сидр и спокойно пошел дальше' }],
	kajitRobbery: [
		{ text: 'Каджит выглядел расстроенным' },
		{
			text: 'герой продолжил свой путь, но скоро обнаружил, что у него пропали груши',
			nextText: 'Проклятый вор!',
			action: changePears(-1),
		},
		{ text: 'герой очень расстроился и пошел дальше расстроенный' },
	],

	// day 8


	// day 9

	// day 10

	// day 11

	// day 12

	// day 13

	// day 14

	// day 15

	// day 16

	// day 17

	// day 18

	// day 19

	// day 20

	// day 21

	// day 22

	// day 23

	// day 24

	// day 25

	// day 26

	// day 27

	// day 28

	// day 29

	// day 30

	// day 31
};
