'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Games',
      [
        {
          gamename: 'Counter strike 2',
          genre: 'Shooter',
          description: 'Более двух десятилетий Counter-Strike служит примером первоклассной соревновательной игры, путь развития которой определяют миллионы игроков со всего мира. Теперь пришло время нового этапа — Counter-Strike 2.',
          image: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/730/header.jpg?t=1729703045',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          gamename: 'Dota 2',
          genre: 'Moba',
          description: 'Ежедневно миллионы игроков по всему миру сражаются от лица одного из более сотни героев Dota 2,. Благодаря регулярным обновлениям игра живёт своей жизнью: геймплей, возможности и герои постоянно преображаются.',
          image:
            'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota2_social.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          gamename: 'Minecraft',
          genre: 'Sandbox',
          description: 'Minecraft — это открытый мир из кубических блоков, где игроки могут свободно строить и исследовать выдуманные миры. Здесь нет продуманного сценария или реалистичной графики, но есть большое пространство для фантазии.',
          image:
            'https://www.nintendo.com/eu/media/images/10_share_images/games_15/nintendo_switch_4/2x1_NSwitch_Minecraft_image1280w.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          gamename: 'GTA V',
          genre: 'Action',
          description: 'Grand Theft Auto V для PC позволяет игрокам исследовать знаменитый мир Лос-Сантоса и округа Блэйн в разрешении до 4k и выше с частотой 60 кадров в секунду.',
          image:
            'https://www.film.ru/sites/default/files/filefield_paths/71d4d17edcd49703a5ea446cc0e588e6-65cb13331c4fd.jpeg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          gamename: 'Battlefield™ 1',
          genre: 'Shooter',
          description: 'Вступайте в игровое сообщество Battlefield и откройте для себя зарю мировых войн в командных сетевых боях или в увлекательной одиночной кампании.',
          image:
            'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1238840/capsule_616x353.jpg?t=1730828840',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          gamename: 'PUBG',
          genre: 'Shooter',
          description: 'Играйте В PUBG: BATTLEGROUNDS бесплатно. Высаживайтесь в стратегически важных местах, добывайте оружие и припасы и постарайтесь выжить и остаться последней командой на одном из многочисленных полей боя.',
          image:
            'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/578080/94ddc32dcf085fa01408102441e1a4d298b32f66/capsule_616x353.jpg?t=1736389084',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          gamename: 'EA SPORTS FC 25',
          genre: 'Simulator',
          description: 'EA SPORTS FC™ 25 открывает больше возможностей побеждать за клуб. Играйте с друзьями в ваших любимых режимах в новом Rush 5 на 5. Ведите клуб к победе с FC IQ, предоставляющим больше тактического контроля',
          image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQREa1DcTTX97sO0q-ylgo9P55axa_RlaXqTA&s',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          gamename: 'ARMA 3',
          genre: 'Shooter',
          description: 'Испытайте вкус боевых действий в массовой военной игре. C более чем 20 видами техники и 40 видами оружия, различными режимами игры и безграничными возможностями создания контента, вы получаете наилучший реализм и разнообразие в Arma 3.',
          image:
            'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/107410/capsule_616x353.jpg?t=1734677868',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          gamename: 'Team Fortress 2',
          genre: 'Shooter',
          description: 'Девять принципиально различающихся классов дают простор для любых тактик и способностей. В игру постоянно добавляются новые игровые режимы, карты, снаряжение и, самое главное, шляпы!',
          image:
            'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/440/capsule_616x353.jpg?t=1729702978',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          gamename: 'Apex Legends™',
          genre: 'Shooter',
          description: 'Apex Legends — удостоенный наградами бесплатный геройский шутер от Respawn Entertainment. Освойте все тонкости игры за легендарных персонажей, число которых продолжает расти, и используйте их мощные умения в стратегии своего отряда.',
          image:
            'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1172470/ffbb3e6e82ceb4b3fa219d2e207c98b566a0a33e/capsule_616x353.jpg?t=1734541502',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          gamename: 'Chained Together',
          genre: 'Simulator',
          description: 'Из глубин ада, взбирайтесь, прикованными к цепи, с друзьями через разнообразные миры. В одиночку или в кооперативе, попытайтесь достичь вершины и узнать, что вас там ждет...',
          image:
            'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2567870/capsule_616x353.jpg?t=1732288374',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          gamename: 'Phasmophobia',
          genre: 'Simulator',
          description: 'В Phasmophobia игроки принимают на себя роли охотников за привидениями, исследующих тот или иной дом в поисках паранормальной активности.',
          image:
            'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/739630/capsule_616x353.jpg?t=1727019976',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          gamename: 'FAR CRY 6',
          genre: 'Shooter',
          description: 'Отправляйтесь в адреналиновый мир современного революционного сопротивления: живописные пейзажи, жаркие перестрелки и множество уникальных особенностей геймплея. Пора вступить в борьбу!',
          image:
            'https://cdn1.epicgames.com/b4565296c22549e4830c13bc7506642d/offer/TETRA_PREORDER_STANDARD%20EDITION_EPIC_Store_Landscape_2560x1440-2560x1440-827a9d1823ad230a0ea5a2efc7936370.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          gamename: 'Magicka 2',
          genre: 'Adventure',
          description: 'Игрок принимает на себя роль волшебника, который хочет остановить злого колдуна, желающего превратить мир в царство хаоса.',
          image:
            'https://mmo13.ru/images/big/games/2/1037.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          gamename: 'Rust',
          genre: 'Sandbox',
          description: 'Rust — это многопользовательская компьютерная игра, в которой игроки сражаются друг с другом в суровом открытом мире. В игре присутствуют такие опасности, как радиоактивное излучение и дикие животные, однако главная угроза исходит от других игроков',
          image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZdQxXSBk1fySRiFQrjGtFtK7vp6C0qrOfFQ&s',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          gamename: 'Terraria',
          genre: 'Sandbox',
          description: 'Копайте, сражайтесь, исследуйте, стройте! Нет ничего невозможного в этой насыщенной событиями приключенческой игре. Также доступен комплект для четверых!',
          image:
            'https://cdn.titotu.io/images/games/terraria-io-997x560.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          gamename: 'Left 4 Dead 2',
          genre: 'Shooter',
          description: 'Настоящий зомби-апокалипсис Left 4 Dead 2 (L4D2) — это долгожданный сиквел к обладательнице многих наград Left 4 Dead — лучшей кооперативной игре 2008 года.',
          image:
            'https://game-rezone.com/wp-content/uploads/2024/08/l4d2-2-1024x618.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          gamename: 'Red Dead Redemption 2',
          genre: 'Sandbox',
          description: 'Игра RDR2, получившая более 175 наград и 250 высших оценок от игровых изданий, – это грандиозная история о судьбе бандита Артура Моргана и банды Ван дер Линде, бегущих от закона через всю Америку на заре современной эпохи.',
          image:
            'https://cdn1.epicgames.com/b30b6d1b4dfd4dcc93b5490be5e094e5/offer/RDR2476298253_Epic_Games_Wishlist_RDR2_2560x1440_V01-2560x1440-2a9ebe1f7ee202102555be202d5632ec.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          gamename: 'Among Us',
          genre: 'Simulator',
          description: 'Локальная и сетевая игра для компании от 4 до 15 игроков о командной работе и предательстве... в космосе!',
          image:
            'https://cdn1.epicgames.com/salesEvent/salesEvent/amoguslandscape_2560x1440-3fac17e8bb45d81ec9b2c24655758075',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          gamename: 'Valheim',
          genre: 'Survival',
          description: 'Игра в жанре выживание, в которой вам предстоит исследовать огромный фэнтезийный мир, пропитанный скандинавской мифологией и культурой викингов.',
          image:
            'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/892970/capsule_616x353.jpg?t=1732095031',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          gamename: 'Dont starve together',
          genre: 'Survival',
          description: 'Идея игры заключается в выживании посреди враждебного мира. Персонаж просыпается в лесу, c этого момента игроку предстоит исследовать мир, состоящий из нескольких биомов, попутно собирая различные ресурсы.',
          image:
            'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/322330/capsule_616x353.jpg?t=1736195686',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          gamename: 'It Takes Two',
          genre: 'Adventure',
          description: 'Отправьтесь в самое безумное путешествие в жизни в игре It Takes Two. Пригласите друга присоединиться бесплатно благодаря версии для друга*, радостно преодолевая многочисленные испытания.',
          image:
            'https://cdn1.epicgames.com/offer/8ae7b3c0f490471b967ce26cc2f6e0e6/EGS_ItTakesTwo_Hazelight_S1_2560x1440-3ca0f21dd4d9ce4416e2d8e2a2178906_2560x1440-3ca0f21dd4d9ce4416e2d8e2a2178906',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          gamename: 'The Forest',
          genre: 'Survival',
          description: 'The Forest - это мрачная Sandbox-игра про выживание в ночном лесу, полном монстров. Игроки попадают на остров в результате авиакатастрофы, после чего узнают, что на острове они не одиноки - там же живет племя туземцев-каннибалов.',
          image:
            'https://upload.wikimedia.org/wikipedia/ru/9/93/Theforest.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          gamename: 'Destiny 2',
          genre: 'Shooter',
          description: 'Destiny 2 – это экшен-MMO в едином развивающемся мире, к которому вы с друзьями можете присоединиться где и когда угодно, абсолютно бесплатно.',
          image:
            'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1085660/header_russian.jpg?t=1734467041',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          gamename: 'Raft',
          genre: 'Survival',
          description: 'Raft - это игра на выживание, разработанная Redbeet Interactive и изданная Axolot Games. Собирайте мусор, чтобы выжить, расширяйте свой плот и остерегайтесь опасностей океана!',
          image:
            'https://upload.wikimedia.org/wikipedia/ru/f/f7/Raft.jpeg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          gamename: 'War Thunder',
          genre: 'Simulator',
          description: 'War Thunder – самая масштабная онлайн-игра, посвященная боевой технике самых разных войн и конфликтов – с начала XX века и до наших дней. Авиация, наземные силы и флот сражаются вместе в одном бою.',
          image:
            'https://warthunder.ru/i/opengraph-wtland.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          gamename: 'Call of Duty®: Warzone™',
          genre: 'Shooter',
          description: 'Добро пожаловать в Call of Duty®: Warzone™ - на бесплатную арену для массовых сражений. Наслаждайтесь захватывающими режимами и новыми игровыми возможностями на картах Area 99, Urzikstan и Rebirth Island.',
          image:
            'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1962663/header.jpg?t=1731603761',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          username: 'Pupkin',
          email: 'pupkin@mail.ru',
          password: await bcrypt.hash('123', 10),
          isAdmin: false,
          image:
            'https://sun9-76.userapi.com/impg/dPh9H9X7wsg75fVMMyLr17EOGtrai95PPWxANg/lyqhn-TDeMs.jpg?size=434x594&quality=95&sign=505c99546ee2a1068f17a1fbe8d2fbe8&type=album',
          info: 'Люблю стратегические игры — Civilization VI, Total War: Warhammer. Важно планировать, думать наперед, тактика решает всё. Иногда расслабляюсь в Stardew Valley — идеальная отдушина после напряженных баталий.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'Kate',
          email: 'kate@mail.ru',
          password: await bcrypt.hash('123', 10),
          isAdmin: false,
          image:
            'https://sun9-77.userapi.com/impg/c0geUGbdRKvfXI8La8LKMpv0iF67HxPeysfcOQ/DhiGxeHrvTY.jpg?size=426x572&quality=95&sign=98841349e9443a96f3a2c428773d7f15&type=album',
          info: 'Я фанатка РПГ, особенно The Witcher 3 и Dragon Age. Обожаю глубокий сюжет и проработанных персонажей. Недавно начала играть в Genshin Impact, затянуло атмосферой и исследованиями мира.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'Azamat',
          email: 'azamat@mail.ru',
          password: await bcrypt.hash('123', 10),
          isAdmin: false,
          image:
            'https://sun9-60.userapi.com/impg/GNpf1BBgn0LQDyRQFK6UUZs69tRQBgLwKZ7eOA/N6oXEMgDIcw.jpg?size=415x569&quality=95&sign=ccd5b15ae7cb4b0003a66af963c06ad8&type=album',
          info: 'Шутеры — моя стихия! Call of Duty, Counter-Strike 2 — играю на соревновательном уровне. Когда нужен перерыв, запускаю Rocket League. Быстрое мышление и командная работа — ключ к успеху.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'admin',
          email: 'admin@mail.ru',
          password: await bcrypt.hash('admin', 10),
          isAdmin: true,
          image:
            'https://sun9-45.userapi.com/impg/qxpDLlvhDGOXge3iaTMSiw1_iCDOPIhpUuuWdQ/I2yrnJ0TjAw.jpg?size=439x599&quality=95&sign=5a6ebe3d931a3fe3916a13fb6ef5d121&type=album',

          info: 'Обожаю экшен и открытые миры. GTA V и Assassin’s Creed Odyssey — мои фавориты. Чувство свободы и адреналина — то, что делает их особенными. Мечтаю стать разработчиком игр.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'lisarus',
          email: 'admin@mail.ru',
          password: await bcrypt.hash('123', 10),
          isAdmin: true,
          image:
            'https://sun9-45.userapi.com/impg/qxpDLlvhDGOXge3iaTMSiw1_iCDOPIhpUuuWdQ/I2yrnJ0TjAw.jpg?size=439x599&quality=95&sign=5a6ebe3d931a3fe3916a13fb6ef5d121&type=album',
          info: 'Играю в симуляторы, такие как The Sims 4 и Cities: Skylines. Люблю творить: строить города или развивать персонажей. Иногда погружаюсь в Life is Strange — ради эмоций и интересных историй.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'Anton',
          email: 'anton@mail.ru',
          password: await bcrypt.hash('123', 10),
          isAdmin: false,
          image:
            'Anton.jpg',
          info: 'Люблю стратегические игры — Civilization VI, Total War: Warhammer. Важно планировать, думать наперед, тактика решает всё. Иногда расслабляюсь в Stardew Valley — идеальная отдушина после напряженных баталий.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'Denis',
          email: 'denis@mail.ru',
          password: await bcrypt.hash('123', 10),
          isAdmin: false,
          image:
            'Denis.jpg',
          info: 'Шутеры — моя стихия! Call of Duty, Counter-Strike 2 — играю на соревновательном уровне. Когда нужен перерыв, запускаю Rocket League. Быстрое мышление и командная работа — ключ к успеху.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'Grisha',
          email: 'grisha@mail.ru',
          password: await bcrypt.hash('123', 10),
          isAdmin: false,
          image:
            'Grisha.jpg',
          info: 'GTA V и Assassin’s Creed Odyssey — мои фавориты. Чувство свободы и адреналина — то, что делает их особенными. Мечтаю стать разработчиком игр.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'Sveta',
          email: 'sveta@mail.ru',
          password: await bcrypt.hash('123', 10),
          isAdmin: false,
          image:
            'Sveta.jpg',
          info: 'Я фанатка РПГ, особенно The Witcher 3 и Dragon Age. Обожаю глубокий сюжет и проработанных персонажей. Недавно начала играть в Genshin Impact, затянуло атмосферой и исследованиями мира.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'Gosha',
          email: 'goshaa@mail.ru',
          password: await bcrypt.hash('123', 10),
          isAdmin: false,
          image:
            'https://i.pinimg.com/736x/cc/cc/4d/cccc4d3c17d97e05226c10c30d8d7689.jpg',
          info: 'GTA V и Assassin’s Creed Odyssey — мои фавориты. Чувство свободы и адреналина — то, что делает их особенными. Мечтаю стать разработчиком игр.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'Vanya',
          email: 'vanya@mail.ru',
          password: await bcrypt.hash('123', 10),
          isAdmin: false,
          image:
            'https://cs2.livemaster.ru/storage/53/ac/0951ec173f5363d16f13bf0e3dzp--dizajn-i-reklama-risuyu-arty-otkrytki-avatarki-na-zakaz.jpg',
          info: 'GTA V и Assassin’s Creed Odyssey — мои фавориты. Чувство свободы и адреналина — то, что делает их особенными. Мечтаю стать разработчиком игр.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'Limon',
          email: 'limon@mail.ru',
          password: await bcrypt.hash('123', 10),
          isAdmin: false,
          image:
            'https://forum-ru-cdn.warthunder.com/optimized/3X/a/f/af62d76a2d92797df0711e6a94d319490936f3a1_2_1000x1000.jpeg',
          info: 'GTA V и Assassin’s Creed Odyssey — мои фавориты. Чувство свободы и адреналина — то, что делает их особенными. Мечтаю стать разработчиком игр.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'Cheburek',
          email: 'cheburek@mail.ru',
          password: await bcrypt.hash('123', 10),
          isAdmin: false,
          image:
            'https://funny.klev.club/smeh/uploads/posts/2024-05/funny-klev-club-7ved-p-smeshnie-kartinki-avatarki-net-21.jpg',
          info: 'Я фанатка РПГ, особенно The Witcher 3 и Dragon Age. Обожаю глубокий сюжет и проработанных персонажей. Недавно начала играть в Genshin Impact, затянуло атмосферой и исследованиями мира.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'Misha',
          email: 'misha@mail.ru',
          password: await bcrypt.hash('123', 10),
          isAdmin: false,
          image:
            'https://pm1.aminoapps.com/7758/98339294c78f2696230c0b51921d2ebb0b6a3af9r1-640-640v2_uhq.jpg',
          info: 'GTA V и Assassin’s Creed Odyssey — мои фавориты. Чувство свободы и адреналина — то, что делает их особенными. Мечтаю стать разработчиком игр.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'SkibidiVoin',
          email: 'skibidi@mail.ru',
          password: await bcrypt.hash('123', 10),
          isAdmin: false,
          image:
            'https://shapka-youtube.ru/wp-content/uploads/2024/07/kartinka-na-avatarki-so-lvom.jpg',
          info: 'GTA V и Assassin’s Creed Odyssey — мои фавориты. Чувство свободы и адреналина — то, что делает их особенными. Мечтаю стать разработчиком игр.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'Olga',
          email: 'olga@mail.ru',
          password: await bcrypt.hash('123', 10),
          isAdmin: false,
          image:
            'https://kartinka-kartinki.ru/wp-content/uploads/2023/06/smeshnye-avatarki-13.jpg',
          info: 'GTA V и Assassin’s Creed Odyssey — мои фавориты. Чувство свободы и адреналина — то, что делает их особенными. Мечтаю стать разработчиком игр.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'Alucard',
          email: 'drakula@mail.ru',
          password: await bcrypt.hash('123', 10),
          isAdmin: false,
          image:
            'https://www.hse.ru/data/2014/12/10/1104832511/1drakulafacti.jpg',
          info: 'GTA V и Assassin’s Creed Odyssey — мои фавориты. Чувство свободы и адреналина — то, что делает их особенными. Мечтаю стать разработчиком игр.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
    await queryInterface.bulkInsert(
      'UserGames',
      [
        {
          userId: 4,
          gameId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 4,
          gameId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 4,
          gameId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 4,
          gameId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          gameId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          gameId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          gameId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {userId: 6, gameId: 1, createdAt: new Date(), updatedAt: new Date(), },
        {userId: 6, gameId: 12, createdAt: new Date(), updatedAt: new Date(), },
        {userId: 6, gameId: 6, createdAt: new Date(), updatedAt: new Date(), },
        {userId: 6, gameId: 8, createdAt: new Date(), updatedAt: new Date(), },
        {userId: 6, gameId: 20, createdAt: new Date(), updatedAt: new Date(), },
        {userId: 6, gameId: 3, createdAt: new Date(), updatedAt: new Date(), },
        {userId: 6, gameId: 17, createdAt: new Date(), updatedAt: new Date(), },
        {userId: 6, gameId: 10, createdAt: new Date(), updatedAt: new Date(), },
        {userId: 7, gameId: 12, createdAt: new Date(), updatedAt: new Date(), },
        {userId: 7, gameId: 17, createdAt: new Date(), updatedAt: new Date(), },
        {userId: 7, gameId: 15, createdAt: new Date(), updatedAt: new Date(), },
        {userId: 7, gameId: 11, createdAt: new Date(), updatedAt: new Date(), },
        {userId: 7, gameId: 1, createdAt: new Date(), updatedAt: new Date(), },
        {userId: 7, gameId: 18, createdAt: new Date(), updatedAt: new Date(), },
        {userId: 7, gameId: 3, createdAt: new Date(), updatedAt: new Date(), },
        {userId: 7, gameId: 9, createdAt: new Date(), updatedAt: new Date(), },
        {userId: 8, gameId: 1, createdAt: new Date(), updatedAt: new Date(), },
        {userId: 8, gameId: 11, createdAt: new Date(), updatedAt: new Date(), },
        {userId: 8, gameId: 23, createdAt: new Date(), updatedAt: new Date(), },
        {userId: 8, gameId: 6, createdAt: new Date(), updatedAt: new Date(), },
        {userId: 8, gameId: 21, createdAt: new Date(), updatedAt: new Date(), },
        {userId: 8, gameId: 5, createdAt: new Date(), updatedAt: new Date(), },
        {userId: 8, gameId: 17, createdAt: new Date(), updatedAt: new Date(), },
        {userId: 8, gameId: 25, createdAt: new Date(), updatedAt: new Date(), },
        {userId: 8, gameId: 10, createdAt: new Date(), updatedAt: new Date(), },
        {userId: 9, gameId: 11, createdAt: new Date(), updatedAt: new Date(), },
        {userId: 9, gameId: 1, createdAt: new Date(), updatedAt: new Date(), },
        {userId: 9, gameId: 15, createdAt: new Date(), updatedAt: new Date(), },
        {userId: 9, gameId: 21, createdAt: new Date(), updatedAt: new Date(), },
        {userId: 9, gameId: 8, createdAt: new Date(), updatedAt: new Date(), },
      ],
      {},
    );
    await queryInterface.bulkInsert(
      'Parties',
      [
        {
          ownerId: 4,
          gameId: 1,
          description: 'У нас строгие возрастные ограничения, канал только для лиц старше 19 лет. Если проходишь требования, то добро пожаловать!)',
          language: 'russian',
          age: 19,
          maxmembers: 5,
          private: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ownerId: 1,
          gameId: 5,
          description: 'У нас строгие возрастные ограничения, канал только для лиц старше 19 лет. Если проходишь требования, то добро пожаловать!)',
          language: 'russian',
          age: 19,
          maxmembers: 5,
          private: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ownerId: 2,
          gameId: 5,
          description: 'У нас строгие возрастные ограничения, канал только для лиц старше 19 лет. Если проходишь требования, то добро пожаловать!)',
          language: 'russian',
          age: 19,
          maxmembers: 5,
          private: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ownerId: 3,
          gameId: 5,
          description: 'У нас строгие возрастные ограничения, канал только для лиц старше 19 лет. Если проходишь требования, то добро пожаловать!)',
          language: 'russian',
          age: 19,
          maxmembers: 4,
          private: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ownerId: 4,
          gameId: 5,
          description: 'У нас строгие возрастные ограничения, канал только для лиц старше 19 лет. Если проходишь требования, то добро пожаловать!)',
          language: 'russian',
          age: 19,
          maxmembers: 5,
          private: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ownerId: 1,
          gameId: 5,
          description: 'У нас строгие возрастные ограничения, канал только для лиц старше 19 лет. Если проходишь требования, то добро пожаловать!)',
          language: 'russian',
          age: 19,
          maxmembers: 5,
          private: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ownerId: 3,
          gameId: 5,
          description: 'У нас строгие возрастные ограничения, канал только для лиц старше 19 лет. Если проходишь требования, то добро пожаловать!)',
          language: 'russian',
          age: 19,
          maxmembers: 6,
          private: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ownerId: 6,
          gameId: 5,
          description: 'Мы самая крутая команда мечты. Попасть к нам в группу это значит гаранитровать себе ухпех. Добро пожаловать путник и замечательного тебе настроения!)',
          language: 'rus',
          age: 20,
          maxmembers: 5,
          private: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );

    await queryInterface.bulkInsert(
      'Partymembers',
      [
        {
          memberId: 1,
          partyId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          memberId: 2,
          partyId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          memberId: 3,
          partyId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          memberId: 4,
          partyId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          memberId: 7,
          partyId: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          memberId: 8,
          partyId: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          memberId: 9,
          partyId:8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          memberId: 10,
          partyId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          memberId: 11,
          partyId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          memberId: 12,
          partyId: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          memberId: 3,
          partyId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          memberId: 13,
          partyId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          memberId: 14,
          partyId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          memberId: 15,
          partyId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          memberId: 16,
          partyId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          memberId: 17,
          partyId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );

    await queryInterface.bulkInsert(
      'Messages',
      [
        {
          text: "Всем привет!",
          authorId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          text: "Здарова! Как жизнь?",
          authorId: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          text: "Привет!",
          authorId: 13,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          text: "Ребята, всем привет!",
          authorId: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          text: "Салют, Гриша, щас как поиграем) После выпускного конечно же)",
          authorId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          text: "Я если что первый раз буду в такое играть",
          authorId: 9,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          text: "Не переживай, тут так же легко, как и кодить",
          authorId: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          text: "Спасибо, успокоил!😂😂",
          authorId: 9,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    )
      await queryInterface.bulkInsert(
        'PartyMessages',
        [
          {
            partyId: 2,
            messageId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            partyId: 2,
            messageId: 2,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            partyId: 2,
            messageId: 3,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            partyId: 8,
            messageId: 4,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            partyId: 8,
            messageId: 5,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            partyId: 8,
            messageId: 6,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            partyId: 8,
            messageId: 7,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            partyId: 8,
            messageId: 8,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
      {},
    );
    await queryInterface.bulkInsert(
      'PartyRequests',
      [
        {
          partyId: 8,
          userId: 13,
          accepted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('People', null, {});
  },
};
