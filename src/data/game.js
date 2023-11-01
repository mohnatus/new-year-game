import { ENEMIES } from '../constants/enemies';
import { MAGIC } from '../constants/magic';
import { OBSTACLES } from '../constants/obstacles';
import { TALES } from '../constants/tales';
import {
	crossroad,
	fight,
	going,
	heroGoes,
	heroPrepareToGo,
	heroPrepareToSleep,
	obstacle,
	sleeping,
	tale,
	tree,
} from './utils';

export const days = [
	{
		// 1
		stages: [
			tale(TALES.start),
			heroGoes(),
			tree('common'),
			heroGoes(),
			tale(TALES.country1), // останавливается на ночлег в деревне
		],
		ending: sleeping(),
	},

	{
		// 2
		stages: [
			tale(TALES.rats), // нападение крыс
			fight(ENEMIES.rats),
			heroPrepareToGo(),
			heroGoes(),
			tree(),
			heroPrepareToSleep(),
		],
		ending: sleeping(),
	},

	{
		// 3
		stages: [
			heroPrepareToGo(),
			heroGoes(),
			tree(),
			tale(TALES.oldman), // дед просит грушу, дает лекарство
			heroGoes(),
			tale(TALES.insect), // нападает насекомое
		],
		ending: going(),
	},

	{
		// 4
		stages: [
			heroGoes(),
			tree(),
			heroGoes(),
			obstacle(OBSTACLES.river), // препятствие река - загадка 
			heroGoes(),
		],
		ending: going(),
	},

	{
		// 5
		stages: [
			heroGoes(),
			fight(ENEMIES.enemy1), // нападение врагов
			heroGoes(),
			tree(),
			heroPrepareToSleep(),
		],
		ending: sleeping(),
	},

	{
		// 6
		stages: [
			heroPrepareToGo(),
			heroGoes(),
			tale(TALES.power), // корзинка с грушами
			obstacle(OBSTACLES.obstacle1, 'power'), // преодоление препятствия с использованием силы
		],
		ending: going(),
	},

	{
		// 7
		stages: [
			heroGoes(),
			tree(),
			tale(TALES.kajit), // встреча с каджитом - сидр или украдет грушу
		],
		ending: going(),
	},

	{
		// 8
		stages: [
			heroPrepareToGo(),
			heroGoes(),
			tree(),
			obstacle(OBSTACLES.obstacle2), // препятствие - загадка + MAGIC.air
			heroPrepareToSleep(),
		],
		ending: sleeping(),
	},

	{
		// 9
		stages: [
			heroPrepareToGo(),
			tree(),
			heroGoes(),
			fight(ENEMIES.enemy2, 'power'), // сражение с использованием силы
			heroGoes(),
		],
		ending: going(),
	},

	{
		// 10
		stages: [
			heroGoes(),
			fight(ENEMIES.enemy3, 'gun'), // сражение с использованием ружья
			heroGoes(),
			tree(),
			heroPrepareToSleep(),
		],
		ending: sleeping(),
	},

	{
		// 11
		stages: [
			heroGoes(),
			tale(TALES.animal), // животное, поможет с препятствием
			heroGoes(),
			obstacle(OBSTACLES.obstacle3, 'help'), // препятствие с использованием помощи или потеря груш
			heroGoes(),
		],
		ending: going(),
	},

	{
		// 12
		stages: [
			tale(TALES.country2), // герой добрался до деревни, где его накормили
			// диалог с местным колдуном, получение заклинания MAGIC.fair
		],
		ending: sleeping(),
	},

	{
		// 13
		stages: [
			heroPrepareToGo(),
			tree('power'), // грушевое дерево + сила
			heroGoes(),
		],
		ending: going(),
	},

	{
		// 14
		stages: [
			heroGoes(),
			fight(ENEMIES.enemy4), // нападение
			heroGoes(),
			tree(),
			heroGoes(),
		],
		ending: going()
	},

	{
		// 15
		stages: [
			heroGoes(),
			tale(TALES.farmer), // встреча с фермером, за помощь - питомец
		],
		ending: sleeping()
	},

	{
		// 16
		stages: [
			crossroad(MAGIC.water), // развилка: заклинание воды, золото, груши
		],
		ending: going()
	},

	{
		//17
		stages: [
			heroGoes(),
			tree(),
			obstacle(OBSTACLES.obstacle4), // препятствие - загадка
			heroPrepareToSleep(),
		],
		ending: sleeping()
	},

	{
		// 18
		stages: [
			tree(),
			crossroad(MAGIC.air), // развилка: заклинание воздуха, золото, груши
		],
		ending: going()
	},

	{
		// 19
		stages: [
			tale(TALES.country3), // герой приходит в деревню, последнюю перед территорией врага
			// разговор с местным колдуном, возможность получить MAGIC.ground
		],
		ending: sleeping()
	},

	{
		// 20
		stages: [
			heroPrepareToGo(),
			tale(TALES.border), // герой на границе вражеской территории (развилка)
		],
		ending: going()
	},

	{
		// 21
		stages: [
			fight(ENEMIES.dwarfs1), // нападение ледяных гномов
			tale(TALES.money1), // герой находит часть казны - варианты спасения
		],
		ending: going()
	},

	{
		// 22
		stages: [
			obstacle(OBSTACLES.obstacle5), // препятствие, загадка
			tale(TALES.money2), // герой находит часть казны - варианты спасения
		],
		ending: going()
	},

	{
		// 23
		stages: [
			obstacle(OBSTACLES.obstacle6), // препятствие, загадка
			tale(TALES.money3), // герой находит часть казны - варианты спасения
		],
		ending: sleeping()
	},

	{
		// 24
		stages: [
			tale(TALES.dwarf), // герой встречает дворфа ???
		],
		ending: going()
	},

	{
		// 25
		stages: [
			obstacle(OBSTACLES.castle), // герой попадает в замок
			fight(ENEMIES.dwarfs2), // на него нападают гномы
			heroGoes()
		],
		ending: going()
	},

	{
		// 26
		stages: [
			tale(TALES.princess1)
		],
		ending: going()
	},

	{
		// 27
		stages: [
			tale(TALES.princess2)
		],
		ending: going()
	},

	{
		// 28
		stages: [
			tale(TALES.princess3)
		],
		ending: going()
	},

	{
		// 29
		stages: [
			tale(TALES.princess1)
		],
		ending: going()
	},

	{
		// 30
		stages: [
			tale(TALES.boss)
		],
		ending: going()
	},

	{
		// 31
		stages: [
			tale(TALES.finish)
		],
		ending: sleeping()
	}
];
