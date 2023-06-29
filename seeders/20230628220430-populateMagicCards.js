'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const cards = [
      {
        name: 'Exemplar of Strength',
        manaCost: '{1}{G}',
        type: 'Creature - Human Warrior',
        rarity: 'Common',
        color: 'Green',
        collectionId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
        {
          name: 'Dungeon Crawler',
          manaCost: '{1}{B}',
          type: 'Creature - Goblin Rogue',
          rarity: 'Common',
          color: 'Black',
          collectionId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Bard Class',
          manaCost: '{1}{U}',
          type: 'Enchantment - Class',
          rarity: 'Uncommon',
          color: 'Blue',
          collectionId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Cave of the Frost Dragon',
          manaCost: '',
          type: 'Land',
          rarity: 'Rare',
          color: 'Colorless',
          collectionId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Minimus Containment',
          manaCost: '{1}{W}',
          type: 'Enchantment',
          rarity: 'Uncommon',
          color: 'White',
          collectionId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'You Find a Cursed Idol',
          manaCost: '{2}{R}',
          type: 'Enchantment',
          rarity: 'Rare',
          color: 'Red',
          collectionId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Fly',
          manaCost: '{G}',
          type: 'Sorcery - Adventure',
          rarity: 'Common',
          color: 'Green',
          collectionId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Delina, Wild Mage',
          manaCost: '{2}{R}{R}',
          type: 'Legendary Creature - Elf Shaman',
          rarity: 'Rare',
          color: 'Red',
          collectionId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'You See a Pair of Goblins',
          manaCost: '{1}{R}',
          type: 'Sorcery - Adventure',
          rarity: 'Common',
          color: 'Red',
          collectionId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Portable Hole',
          manaCost: '{W}',
          type: 'Artifact',
          rarity: 'Uncommon',
          color: 'Colorless',
          collectionId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Wandering Troubadour',
          manaCost: '{1}{W}',
          type: 'Creature - Human Bard',
          rarity: 'Common',
          color: 'White',
          collectionId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Book of Vile Darkness',
          manaCost: '{B}{B}{B}',
          type: 'Legendary Artifact',
          rarity: 'Mythic',
          color: 'Colorless',
          collectionId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Gloom Stalker',
          manaCost: '{1}{B}',
          type: 'Creature - Human Ranger',
          rarity: 'Uncommon',
          color: 'Black',
          collectionId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        }
    ];

    await queryInterface.bulkInsert('MagicCards', cards, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('MagicCards', null, {});
  }
};
